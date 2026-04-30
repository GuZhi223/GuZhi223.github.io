# Tasks

- [x] Task 1: 在 appState 中新增触控追踪字段
  - [x] 添加 `touchStartX: 0`、`touchStartY: 0`、`touchStartTime: 0`、`touchIsTap: false`
  - [x] 在 `resetReading()` 和 `continueSpread()` 中重置这些字段

- [x] Task 2: 重写 canvas 指针事件监听器，实现点击手势识别
  - [x] `pointerdown`: 记录起始坐标和时间，设 `touchIsTap = true`，不再直接抽卡
  - [x] `pointermove`: 保持原有 `updatePointerSelection(clientX)` 逻辑；增加移动距离检测，超过 15px 则 `touchIsTap = false`
  - [x] `pointerup`: 判断 `touchIsTap && 按压时长 < 500ms && manualMode && started && !drawn && !shuffling`，满足则触发 `pulseDeck()` + `drawSelectedCard()`

- [x] Task 3: 验证手机端交互体验
  - [x] 滑动操作不触发抽卡
  - [x] 短按点击正常抽卡
  - [x] 长按不触发抽卡

# Task Dependencies
- Task 2 依赖 Task 1（需要 appState 字段）
- Task 3 依赖 Task 2
