(() => {
  "use strict";

  const STORAGE_KEY = "chinaHistoryReviewProgress_v2";
  const API_STORAGE_KEY = "chinaHistoryLLMConfig_v1";
  const LLM_MAX_TOKENS = 10000;
  const questions = Array.isArray(window.QUESTION_BANK) ? window.QUESTION_BANK : [];
  const statusLabels = {
    unlearned: "未学习",
    mastered: "已掌握",
    uncertain: "模糊",
    wrong: "错题"
  };

  const $ = (id) => document.getElementById(id);
  const els = {
    progressPercent: $("progressPercent"), progressBar: $("progressBar"), lastStudy: $("lastStudy"),
    totalCount: $("totalCount"), unlearnedCount: $("unlearnedCount"), masteredCount: $("masteredCount"),
    uncertainCount: $("uncertainCount"), wrongCount: $("wrongCount"), chapterSelect: $("chapterSelect"),
    modeSelect: $("modeSelect"), searchInput: $("searchInput"), randomBtn: $("randomBtn"),
    emptyState: $("emptyState"), questionCard: $("questionCard"), chapterBadge: $("chapterBadge"),
    typeBadge: $("typeBadge"), positionText: $("positionText"), questionText: $("questionText"),
    userAnswer: $("userAnswer"), wordCount: $("wordCount"), clearAnswerBtn: $("clearAnswerBtn"),
    showAnswerBtn: $("showAnswerBtn"), referenceAnswer: $("referenceAnswer"), answerText: $("answerText"),
    keywordWrap: $("keywordWrap"), prevBtn: $("prevBtn"), nextBtn: $("nextBtn"),
    questionListBtn: $("questionListBtn"), questionDialog: $("questionDialog"), closeDialogBtn: $("closeDialogBtn"),
    questionList: $("questionList"), exportBtn: $("exportBtn"), importInput: $("importInput"), resetBtn: $("resetBtn"),
    installBtn: $("installBtn"), toast: $("toast"),
    deconstructPanel: $("deconstructPanel"), deconstructToggle: $("deconstructToggle"),
    deconstructContent: $("deconstructContent"), deconstructBreakdown: $("deconstructBreakdown"),
    deconstructPoints: $("deconstructPoints"), deconstructTrap: $("deconstructTrap"),
    deconstructTrapText: $("deconstructTrapText"), deconstructRelated: $("deconstructRelated"),
    startAnswerBtn: $("startAnswerBtn"),
    remediatePanel: $("remediatePanel"), remediateOffline: $("remediateOffline"),
    remediateLLM: $("remediateLLM"), remediateHint: $("remediateHint"),
    llmDiagnosis: $("llmDiagnosis"), llmHintBtn: $("llmHintBtn"), llmHint: $("llmHint"),
    retryAnswerBtn: $("retryAnswerBtn"),
    apiBaseUrl: $("apiBaseUrl"), apiKey: $("apiKey"), apiModel: $("apiModel"),
    saveApiBtn: $("saveApiBtn"), testApiBtn: $("testApiBtn"), clearApiBtn: $("clearApiBtn"), apiStatus: $("apiStatus")
  };

  const defaultState = () => ({
    version: 1,
    currentQuestionId: questions[0]?.id ?? null,
    chapter: "all",
    mode: "all",
    search: "",
    questionStates: {},
    lastStudyAt: null
  });

  let state = loadState();
  let filteredQuestions = [];
  let currentIndex = 0;
  let deferredInstallPrompt = null;
  let saveTimer = null;

  function normalizeState(raw) {
    const base = defaultState();
    if (!raw || typeof raw !== "object") return base;
    const questionStates = raw.questionStates && typeof raw.questionStates === "object" ? raw.questionStates : {};
    const defaults = defaultQuestionState();
    for (const id of Object.keys(questionStates)) {
      questionStates[id] = { ...defaults, ...questionStates[id] };
    }
    return { ...base, ...raw, questionStates };
  }

  function loadState() {
    try {
      return normalizeState(JSON.parse(localStorage.getItem(STORAGE_KEY)));
    } catch (error) {
      console.warn("进度读取失败", error);
      return defaultState();
    }
  }

  function saveState(options = {}) {
    const config = typeof options === "boolean" ? { immediate: options } : options;
    const immediate = Boolean(config.immediate);
    if (config.studyActivity) state.lastStudyAt = new Date().toISOString();
    const commit = () => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      updateStats();
    };
    if (immediate) {
      clearTimeout(saveTimer);
      commit();
    } else {
      clearTimeout(saveTimer);
      saveTimer = setTimeout(commit, 180);
    }
  }

  function defaultQuestionState() {
    return {
      status: "unlearned", userAnswer: "", answerVisible: false, reviewCount: 0, lastReviewedAt: null,
      stage: "deconstruct", deconstructSeen: false,
      srDueAt: null, srInterval: 0, srEaseFactor: 2.5, remediationCount: 0
    };
  }

  function getQuestionState(id, create = true) {
    if (!state.questionStates[id]) {
      if (!create) return defaultQuestionState();
      state.questionStates[id] = defaultQuestionState();
    }
    return state.questionStates[id];
  }

  function initChapterOptions() {
    const chapters = [...new Set(questions.map(q => q.chapter))];
    els.chapterSelect.innerHTML = `<option value="all">全部章节</option>` + chapters.map(c => `<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`).join("");
    if (["all", ...chapters].includes(state.chapter)) els.chapterSelect.value = state.chapter;
    else state.chapter = "all";
  }

  function applyFilters(preferredId = state.currentQuestionId, persist = true) {
    const chapter = els.chapterSelect.value;
    const mode = els.modeSelect.value;
    const search = els.searchInput.value.trim().toLowerCase();
    state.chapter = chapter;
    state.mode = mode;
    state.search = els.searchInput.value;

    filteredQuestions = questions.filter(q => {
      const qs = getQuestionState(q.id, false);
      const chapterMatch = chapter === "all" || q.chapter === chapter;
      let modeMatch = true;
      if (mode === "remediation") {
        const now = new Date().toISOString();
        modeMatch = (qs.status === "wrong" || qs.status === "uncertain") && (!qs.srDueAt || qs.srDueAt <= now);
      } else if (mode !== "all" && mode !== "random") {
        modeMatch = qs.status === mode;
      }
      const haystack = `${q.question} ${q.answer} ${q.keywords.join(" ")}`.toLowerCase();
      return chapterMatch && modeMatch && (!search || haystack.includes(search));
    });

    if (mode === "random" && filteredQuestions.length > 1) shuffle(filteredQuestions);

    const matchedIndex = filteredQuestions.findIndex(q => q.id === preferredId);
    currentIndex = matchedIndex >= 0 ? matchedIndex : 0;
    renderCurrent();
    if (persist) saveState();
  }

  function renderCurrent() {
    const q = filteredQuestions[currentIndex];
    const hasQuestion = Boolean(q);
    els.emptyState.classList.toggle("hidden", hasQuestion);
    els.questionCard.classList.toggle("hidden", !hasQuestion);
    if (!q) {
      updateStats();
      return;
    }

    state.currentQuestionId = q.id;
    const qs = getQuestionState(q.id, false);
    els.chapterBadge.textContent = q.chapter;
    els.typeBadge.textContent = q.type;
    els.positionText.textContent = `${currentIndex + 1} / ${filteredQuestions.length} · 总第 ${q.id} 题`;
    els.questionText.textContent = q.question;
    els.userAnswer.value = qs.userAnswer || "";
    updateWordCount();
    els.answerText.textContent = q.answer;
    els.keywordWrap.innerHTML = q.keywords.map(k => `<span class="keyword">${escapeHtml(k)}</span>`).join("");
    els.referenceAnswer.classList.toggle("hidden", !qs.answerVisible);
    els.showAnswerBtn.textContent = qs.answerVisible ? "收起参考答案" : "展开参考答案";
    document.querySelectorAll(".rating").forEach(btn => btn.classList.toggle("active", btn.dataset.status === qs.status));
    els.prevBtn.disabled = filteredQuestions.length <= 1;
    els.nextBtn.disabled = filteredQuestions.length <= 1;
    updateStageRail(qs);
    renderDeconstruct(q);
    if (qs.answerVisible) renderKeywordDiff(q);
    showRemediation(q);
    updateStats();
  }

  function updateStats() {
    const counts = { unlearned: 0, mastered: 0, uncertain: 0, wrong: 0 };
    questions.forEach(q => {
      const status = state.questionStates[q.id]?.status || "unlearned";
      counts[status] = (counts[status] || 0) + 1;
    });
    const learned = questions.length - counts.unlearned;
    const percent = questions.length ? Math.round((counts.mastered / questions.length) * 100) : 0;
    els.progressPercent.textContent = `${percent}%`;
    els.progressBar.style.width = `${percent}%`;
    els.totalCount.textContent = questions.length;
    els.unlearnedCount.textContent = counts.unlearned;
    els.masteredCount.textContent = counts.mastered;
    els.uncertainCount.textContent = counts.uncertain;
    els.wrongCount.textContent = counts.wrong;
    els.lastStudy.textContent = state.lastStudyAt ? `已学习 ${learned} 题 · ${formatTime(state.lastStudyAt)}` : "尚未开始";
    document.querySelectorAll(".stat").forEach(btn => btn.classList.toggle("active", btn.dataset.mode === els.modeSelect.value));
  }

  function go(delta) {
    if (!filteredQuestions.length) return;
    currentIndex = (currentIndex + delta + filteredQuestions.length) % filteredQuestions.length;
    renderCurrent();
    saveState({ immediate: true });
    window.scrollTo({ top: els.questionCard.offsetTop - 86, behavior: "smooth" });
  }

  function setStatus(status) {
    const q = filteredQuestions[currentIndex];
    if (!q) return;
    const qs = getQuestionState(q.id);
    qs.status = status;
    qs.reviewCount = (qs.reviewCount || 0) + 1;
    qs.lastReviewedAt = new Date().toISOString();
    if (status === "mastered") {
      qs.stage = "deconstruct";
      calculateSR(qs, 3);
    } else if (status === "wrong" || status === "uncertain") {
      qs.stage = "remediate";
      calculateSR(qs, status === "wrong" ? 0 : 1);
      qs.remediationCount = (qs.remediationCount || 0) + 1;
    } else if (status === "unlearned") {
      qs.stage = "deconstruct";
      qs.srDueAt = null;
    }
    saveState({ immediate: true, studyActivity: true });
    renderCurrent();
    showToast(`已标记为${statusLabels[status]}`);

    if (["wrong", "uncertain", "mastered"].includes(els.modeSelect.value) && status !== els.modeSelect.value) {
      applyFilters();
    }
  }

  function renderQuestionList() {
    els.questionList.innerHTML = filteredQuestions.map((q, index) => {
      const status = getQuestionState(q.id, false).status;
      return `<button type="button" class="question-list-item ${index === currentIndex ? "current" : ""}" data-id="${q.id}">
        <span class="question-number">${q.id}</span>
        <span>${escapeHtml(q.question)}</span>
        <span class="question-status">${statusLabels[status]}</span>
      </button>`;
    }).join("");
    els.questionList.querySelectorAll("button").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = Number(btn.dataset.id);
        const index = filteredQuestions.findIndex(q => q.id === id);
        if (index >= 0) currentIndex = index;
        els.questionDialog.close();
        renderCurrent();
        saveState({ immediate: true });
      });
    });
  }

  function exportProgress() {
    const payload = {
      app: "中国近代史答题式复习",
      exportedAt: new Date().toISOString(),
      questionCount: questions.length,
      state
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `中国近代史复习进度_${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showToast("进度已导出");
  }

  async function importProgress(file) {
    if (!file) return;
    try {
      const parsed = JSON.parse(await file.text());
      const imported = parsed.state || parsed;
      state = normalizeState(imported);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      els.chapterSelect.value = state.chapter || "all";
      els.modeSelect.value = state.mode || "all";
      els.searchInput.value = state.search || "";
      applyFilters(state.currentQuestionId);
      showToast("进度导入成功");
    } catch (error) {
      alert("导入失败：文件不是有效的复习进度备份。\n" + error.message);
    } finally {
      els.importInput.value = "";
    }
  }

  function resetProgress() {
    if (!confirm("确定清空所有作答、掌握标记和学习进度吗？此操作无法撤销。")) return;
    state = defaultState();
    localStorage.removeItem(STORAGE_KEY);
    els.chapterSelect.value = "all";
    els.modeSelect.value = "all";
    els.searchInput.value = "";
    applyFilters(state.currentQuestionId, false);
    showToast("全部进度已重置");
  }

  function updateWordCount() {
    const count = els.userAnswer.value.replace(/\s/g, "").length;
    els.wordCount.textContent = `${count} 字`;
  }

  function randomQuestion() {
    if (!filteredQuestions.length) return;
    const oldIndex = currentIndex;
    if (filteredQuestions.length > 1) {
      do currentIndex = Math.floor(Math.random() * filteredQuestions.length);
      while (currentIndex === oldIndex);
    }
    renderCurrent();
    saveState({ immediate: true });
  }

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[c]));
  }

  function formatTime(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return new Intl.DateTimeFormat("zh-CN", { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" }).format(date);
  }

  let toastTimer;
  function showToast(message) {
    els.toast.textContent = message;
    els.toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => els.toast.classList.remove("show"), 1600);
  }

  function updateStageRail(qs) {
    const stages = ["deconstruct", "answer", "check", "remediate"];
    const stageEls = document.querySelectorAll(".stage-step");
    stageEls.forEach((el, i) => {
      el.classList.toggle("is-current", stages[i] === qs.stage);
      el.classList.toggle("is-complete", stages.indexOf(qs.stage) > i);
      el.classList.toggle("is-remedial", stages[i] === "remediate" && qs.stage === "remediate");
    });
  }

  function calculateSR(qs, quality) {
    let { srInterval, srEaseFactor } = qs;
    if (quality < 2) {
      srInterval = 0.1;
    } else {
      if (srInterval === 0) srInterval = 1;
      else if (srInterval < 1) srInterval = 6;
      else srInterval = Math.round(srInterval * srEaseFactor);
    }
    qs.srEaseFactor = Math.max(1.3, srEaseFactor + (0.1 - (3 - quality) * (0.08 + (3 - quality) * 0.02)));
    qs.srInterval = srInterval;
    qs.srDueAt = new Date(Date.now() + srInterval * 3600000).toISOString();
  }

  function renderDeconstruct(q) {
    if (!q.analysis) {
      els.deconstructPanel.classList.add("hidden");
      return;
    }
    els.deconstructPanel.classList.remove("hidden");
    els.deconstructBreakdown.textContent = q.analysis.breakdown;
    els.deconstructPoints.innerHTML = q.analysis.points.map(p => `<li>${escapeHtml(p)}</li>`).join("");
    if (q.analysis.trap) {
      els.deconstructTrap.classList.remove("hidden");
      els.deconstructTrapText.textContent = q.analysis.trap;
    } else {
      els.deconstructTrap.classList.add("hidden");
    }
    if (q.analysis.relatedIds && q.analysis.relatedIds.length) {
      els.deconstructRelated.innerHTML = q.analysis.relatedIds.map(id => {
        const rq = questions.find(x => x.id === id);
        return rq ? `<button class="related-link" data-id="${id}">${id}. ${escapeHtml(rq.question.slice(0, 25))}…</button>` : "";
      }).join("");
      els.deconstructRelated.querySelectorAll(".related-link").forEach(btn => {
        btn.addEventListener("click", () => {
          const id = Number(btn.dataset.id);
          const idx = filteredQuestions.findIndex(x => x.id === id);
          if (idx >= 0) { currentIndex = idx; renderCurrent(); saveState({ immediate: true }); }
        });
      });
    } else {
      els.deconstructRelated.innerHTML = "";
    }
    const qs = getQuestionState(q.id, false);
    els.deconstructContent.classList.add("hidden");
  }

  function renderKeywordDiff(q) {
    const qs = getQuestionState(q.id, false);
    if (!qs.userAnswer || !q.keywords.length) return;
    const userLower = qs.userAnswer.toLowerCase();
    els.keywordWrap.innerHTML = q.keywords.map(k => {
      const hit = userLower.includes(k.toLowerCase());
      return `<span class="keyword ${hit ? "keyword-hit" : "keyword-miss"}">${escapeHtml(k)}</span>`;
    }).join("");
  }

  function getOfflineRemediationHint(q, errorType) {
    if (q.analysis && q.analysis.remediation && q.analysis.remediation[errorType]) {
      return q.analysis.remediation[errorType];
    }
    const qs = getQuestionState(q.id, false);
    const userLower = (qs.userAnswer || "").toLowerCase();
    const missing = q.keywords.filter(k => !userLower.includes(k.toLowerCase()));
    if (missing.length) return `你的作答中缺少以下关键词：${missing.join("、")}。试着围绕这些要点重新组织答案。`;
    return (q.analysis && q.analysis.trap) || "请对照参考答案重新审题，注意答题结构。";
  }

  function showRemediation(q) {
    const qs = getQuestionState(q.id, false);
    if (qs.stage !== "remediate") {
      els.remediatePanel.classList.add("hidden");
      return;
    }
    els.remediatePanel.classList.remove("hidden");
    if (isApiAvailable()) {
      els.remediateOffline.classList.add("hidden");
      els.remediateLLM.classList.remove("hidden");
      els.llmHint.classList.add("hidden");
      renderLLMDiagnosis(q);
    } else {
      els.remediateLLM.classList.add("hidden");
      els.remediateOffline.classList.remove("hidden");
      els.remediateHint.classList.add("hidden");
    }
  }

  async function renderLLMDiagnosis(q) {
    const qs = getQuestionState(q.id, false);
    els.llmDiagnosis.innerHTML = '<p class="muted">AI 正在分析你的作答…</p>';
    try {
      const diagnosis = await callLLM(
        "你是一位中国近代史考试辅导老师。分析学生作答与参考答案的差异，用中文指出具体错误类型和缺失要点。",
        `题目：${q.question}\n\n学生作答：${qs.userAnswer}\n\n参考答案：${q.answer}\n\n请简要指出：1)错误类型（遗漏要点/事实错误/逻辑不清）2)具体缺失或错误之处。限100字内。`
      );
      els.llmDiagnosis.innerHTML = `<div class="llm-result">${escapeHtml(diagnosis)}</div>`;
    } catch (e) {
      els.llmDiagnosis.innerHTML = '<p class="muted">AI 分析失败，请手动选择错误类型。</p>';
      els.remediateOffline.classList.remove("hidden");
    }
  }

  async function getLLMRemediationHint(q) {
    const qs = getQuestionState(q.id, false);
    els.llmHint.classList.remove("hidden");
    els.llmHint.innerHTML = '<p class="muted">生成针对性提示中…</p>';
    try {
      const hint = await callLLM(
        "你是一位中国近代史考试辅导老师。根据学生的具体错误，给出有针对性的学习提示和记忆方法。不要直接给完整答案。",
        `题目：${q.question}\n学生作答：${qs.userAnswer}\n参考答案：${q.answer}\n关键词：${q.keywords.join("、")}\n\n请给出针对性的学习提示，帮助学生理解自己错在哪里、如何纠正。限150字内。`
      );
      els.llmHint.innerHTML = `<div class="llm-result">${escapeHtml(hint)}</div>`;
    } catch (e) {
      els.llmHint.innerHTML = '<p class="muted">提示生成失败，请参考上方分析自行复习。</p>';
    }
  }

  function loadApiConfig() {
    try { return JSON.parse(localStorage.getItem(API_STORAGE_KEY)) || {}; } catch { return {}; }
  }

  function saveApiConfig(config) {
    localStorage.setItem(API_STORAGE_KEY, JSON.stringify(config));
  }

  function getApiConfig() {
    const cfg = loadApiConfig();
    return { baseUrl: cfg.baseUrl || "https://api.openai.com/v1", key: cfg.key || "", model: cfg.model || "gpt-4o-mini" };
  }

  function isApiAvailable() {
    return Boolean(getApiConfig().key);
  }

  async function callLLM(systemPrompt, userPrompt) {
    const cfg = getApiConfig();
    if (!cfg.key) throw new Error("NO_API_KEY");
    try {
      const response = await fetch(`${cfg.baseUrl}/chat/completions`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${cfg.key}` },
        body: JSON.stringify({
          model: cfg.model,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt }
          ],
          temperature: 0.3,
          max_tokens: LLM_MAX_TOKENS
        })
      });
      if (!response.ok) throw new Error(formatApiError(response.status));
      const data = await response.json();
      const content = data?.choices?.[0]?.message?.content?.trim();
      if (!content) throw new Error("模型没有返回正文，请重试。");
      return content;
    } catch (error) {
      if (error.name === "TypeError") throw new Error("网络请求失败，请检查 API 地址或网络。");
      throw error;
    }
  }

  function formatApiError(status) {
    if (status === 401 || status === 403) return "密钥无效或没有权限。";
    if (status === 404) return "API 地址或模型不存在。";
    if (status === 429) return "请求过于频繁或额度受限。";
    return `API 请求失败（${status}）。`;
  }

  function bindEvents() {
    els.chapterSelect.addEventListener("change", () => applyFilters());
    els.modeSelect.addEventListener("change", () => applyFilters());
    els.searchInput.addEventListener("input", () => applyFilters());
    els.randomBtn.addEventListener("click", randomQuestion);
    els.prevBtn.addEventListener("click", () => go(-1));
    els.nextBtn.addEventListener("click", () => go(1));
    els.userAnswer.addEventListener("input", () => {
      const q = filteredQuestions[currentIndex];
      if (!q) return;
      getQuestionState(q.id).userAnswer = els.userAnswer.value;
      updateWordCount();
      saveState({ studyActivity: true });
    });
    els.clearAnswerBtn.addEventListener("click", () => {
      const q = filteredQuestions[currentIndex];
      if (!q || !els.userAnswer.value) return;
      if (!confirm("清空本题已经输入的内容？")) return;
      els.userAnswer.value = "";
      getQuestionState(q.id).userAnswer = "";
      updateWordCount();
      saveState({ immediate: true, studyActivity: true });
    });
    els.showAnswerBtn.addEventListener("click", () => {
      const q = filteredQuestions[currentIndex];
      if (!q) return;
      const qs = getQuestionState(q.id);
      qs.answerVisible = !qs.answerVisible;
      if (qs.answerVisible && qs.stage === "answer") qs.stage = "check";
      renderCurrent();
      saveState({ immediate: true, studyActivity: true });
    });
    document.querySelectorAll(".rating").forEach(btn => btn.addEventListener("click", () => setStatus(btn.dataset.status)));
    document.querySelectorAll(".stat").forEach(btn => btn.addEventListener("click", () => {
      els.modeSelect.value = btn.dataset.mode;
      applyFilters();
    }));
    els.questionListBtn.addEventListener("click", () => {
      renderQuestionList();
      if (typeof els.questionDialog.showModal === "function") els.questionDialog.showModal();
    });
    els.closeDialogBtn.addEventListener("click", () => els.questionDialog.close());
    els.exportBtn.addEventListener("click", exportProgress);
    els.importInput.addEventListener("change", event => importProgress(event.target.files[0]));
    els.resetBtn.addEventListener("click", resetProgress);

    window.addEventListener("beforeinstallprompt", event => {
      event.preventDefault();
      deferredInstallPrompt = event;
      els.installBtn.classList.remove("hidden");
    });
    els.installBtn.addEventListener("click", async () => {
      if (!deferredInstallPrompt) {
        showToast("请用浏览器菜单选择“添加到主屏幕”");
        return;
      }
      deferredInstallPrompt.prompt();
      await deferredInstallPrompt.userChoice;
      deferredInstallPrompt = null;
      els.installBtn.classList.add("hidden");
    });
    window.addEventListener("appinstalled", () => {
      els.installBtn.classList.add("hidden");
      showToast("已安装到桌面");
    });

    els.deconstructToggle.addEventListener("click", () => {
      const visible = !els.deconstructContent.classList.contains("hidden");
      els.deconstructContent.classList.toggle("hidden", visible);
    });

    els.startAnswerBtn.addEventListener("click", () => {
      const q = filteredQuestions[currentIndex];
      if (!q) return;
      const qs = getQuestionState(q.id);
      qs.stage = "answer";
      qs.deconstructSeen = true;
      saveState({ immediate: true, studyActivity: true });
      renderCurrent();
      els.userAnswer.focus();
    });

    els.retryAnswerBtn.addEventListener("click", () => {
      const q = filteredQuestions[currentIndex];
      if (!q) return;
      const qs = getQuestionState(q.id);
      qs.stage = "answer";
      qs.userAnswer = "";
      qs.answerVisible = false;
      saveState({ immediate: true, studyActivity: true });
      renderCurrent();
      els.userAnswer.focus();
    });

    document.querySelectorAll(".error-type-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const q = filteredQuestions[currentIndex];
        if (!q) return;
        document.querySelectorAll(".error-type-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const hint = getOfflineRemediationHint(q, btn.dataset.type);
        els.remediateHint.textContent = hint;
        els.remediateHint.classList.remove("hidden");
      });
    });

    if (els.llmHintBtn) {
      els.llmHintBtn.addEventListener("click", () => {
        const q = filteredQuestions[currentIndex];
        if (q) getLLMRemediationHint(q);
      });
    }

    if (els.saveApiBtn) {
      els.saveApiBtn.addEventListener("click", () => {
        saveApiConfig({ baseUrl: els.apiBaseUrl.value, key: els.apiKey.value, model: els.apiModel.value });
        els.apiStatus.textContent = "设置已保存";
        setTimeout(() => { if (els.apiStatus) els.apiStatus.textContent = ""; }, 2000);
      });
    }

    if (els.testApiBtn) {
      els.testApiBtn.addEventListener("click", async () => {
        els.apiStatus.textContent = "测试中…";
        try {
          await callLLM("用一句话回复'连接成功'。", "测试");
          els.apiStatus.textContent = "连接成功";
        } catch (e) {
          els.apiStatus.textContent = "连接失败：" + e.message;
        }
      });
    }

    if (els.clearApiBtn) {
      els.clearApiBtn.addEventListener("click", () => {
        localStorage.removeItem(API_STORAGE_KEY);
        if (els.apiKey) els.apiKey.value = "";
        els.apiStatus.textContent = "已清除";
        setTimeout(() => { if (els.apiStatus) els.apiStatus.textContent = ""; }, 2000);
      });
    }
  }

  async function registerServiceWorker() {
    if (!("serviceWorker" in navigator)) return;
    try {
      await navigator.serviceWorker.register("service-worker.js");
    } catch (error) {
      console.warn("离线缓存注册失败。通过 HTTPS 或 localhost 打开后即可启用。", error);
    }
  }

  function init() {
    initChapterOptions();
    const validModes = ["all", "unlearned", "mastered", "uncertain", "wrong", "random", "remediation"];
    els.modeSelect.value = validModes.includes(state.mode) ? state.mode : "all";
    els.searchInput.value = state.search || "";
    const apiCfg = getApiConfig();
    if (els.apiBaseUrl) els.apiBaseUrl.value = apiCfg.baseUrl;
    if (els.apiKey) els.apiKey.value = apiCfg.key;
    if (els.apiModel) els.apiModel.value = apiCfg.model;
    bindEvents();
    applyFilters(state.currentQuestionId, false);
    registerServiceWorker();
  }

  init();
})();
