# Tasks

- [x] Task 1: 修复已知 Bug
  - [x] SubTask 1.1: 在 `appState` 对象中添加 `handY: 0` 字段初始化，并在 `onHandResults` 回调中同步赋值 `appState.handY = landmarks[0].y`
  - [x] SubTask 1.2: 在手动模式启动路径中（`startManualMode` 函数 + `manualBtn` click 事件），为 `.video-wrap` 元素设置隐藏（添加 `hidden` class 或 `display:none`），并在 `resetReading()` 中恢复显示

- [x] Task 2: 实现每日一牌功能
  - [x] SubTask 2.1: 编写日期种子哈希函数 `dailyTarotIndex(dateStr)`，输入 `YYYY-MM-DD` 字符串，输出 0-21 的确定性索引；逆位判定基于同一哈希的第二位值
  - [x] SubTask 2.2: 编写 `getDailyCard()` 函数，从 localStorage 读取或生成当日牌结果（缓存 key 为 `dailyCard_YYYY-MM-DD`），包含牌名、正逆位、摘要、关键词、行动建议
  - [x] SubTask 2.3: 在开场弹窗 `.intro-card` 的问题输入区上方，新增"今日塔罗"卡片 DOM 结构（`.daily-card`），包含牌名、正逆位标签、摘要文字、"查看详情"/"开始占卜"两个按钮
  - [x] SubTask 2.4: 编写 `.daily-card` CSS 样式：半透明深色背景、金色边框、圆角16px、与开场弹窗整体风格协调
  - [x] SubTask 2.5: 实现"查看详情"逻辑：点击后展开显示完整关键词和行动建议，按钮文字变为"开始占卜"
  - [x] SubTask 2.6: 实现"开始占卜"逻辑：隐藏 `.daily-card`，正常进入占卜流程（等同于直接点击"手势抽牌"或"直接抽牌"）
  - [x] SubTask 2.7: 在 `showIntro()` 或应用初始化时判断当天是否已显示过每日牌，确保 localStorage 缓存一致性

- [x] Task 3: 实现分享塔罗结果图片功能
  - [x] SubTask 3.1: 在 `showResult()` 的单牌结果面板中，添加"分享"按钮（位于"新牌阵"按钮上方或结果卡片底部区域）
  - [x] SubTask 3.2: 编写 `generateShareImage(tarot)` 函数：创建 1080×1920 Canvas，绘制深色渐变背景 + 星点装饰 + 牌名（大号金色字体）+ 正逆位标识 + 牌义文字 + 用户问题 + 底部品牌文字"星门塔罗"
  - [x] SubTask 3.3: 编写全屏预览层 DOM（`.share-preview`）和 CSS：全屏遮罩 + 居中图片 + "保存图片"/"关闭"按钮
  - [x] SubTask 3.4: 实现"保存图片"逻辑：`canvas.toDataURL("image/png")` 生成下载链接，触发 `<a>` download
  - [x] SubTask 3.5: 确保"分享"按钮仅在单张牌结果时显示，三张牌阵模式下隐藏

- [x] Task 4: 样式微调与响应式适配
  - [x] SubTask 4.1: 为"今日塔罗"卡片添加移动端适配（字体缩小、内边距调整）
  - [x] SubTask 4.2: 为分享预览层添加移动端适配（图片缩放至屏幕宽度以内）
  - [x] SubTask 4.3: 确认新增按钮的交互效果（hover/active）与现有 `.btn` / `.btn-ghost` 体系一致

# Task Dependencies
- Task 1 独立，可最先完成
- Task 2 依赖 Task 1（bug 修复后整体流程更稳定）
- Task 3 独立于 Task 2，可并行开发
- Task 4 依赖 Task 2 和 Task 3（需在功能完成后统一适配）
