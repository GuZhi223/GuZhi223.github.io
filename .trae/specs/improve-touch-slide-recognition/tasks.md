# Tasks

- [x] Task 1: appState 新增 touchDeadzonePassed 字段
  - [x] 添加 `touchDeadzonePassed: false`
  - [x] 在 `resetReading()` 和 `continueSpread()` 中重置

- [x] Task 2: 重写 canvas 事件监听器实现死区和 Pointer Capture
  - [x] `pointerdown`: 记录起始坐标、设 `touchDeadzonePassed = false`、调用 `setPointerCapture`
  - [x] `pointermove`: 死区内（< 8px）仅检查 tap 阈值（15px），不调用 `updatePointerSelection`；超过 8px 后设 `touchDeadzonePassed = true` 并开始正常调用 `updatePointerSelection`
  - [x] `pointerup`: 重置 `touchDeadzonePassed`、`touchIsTap`

- [x] Task 3: 减少手动模式下 `layoutCards()` 的插值层级
  - [x] 手动模式下 `deckRotation` 直接赋值 `targetDeckRotation`，跳过 lerp

# Task Dependencies
- Task 2 依赖 Task 1
- Task 3 独立
