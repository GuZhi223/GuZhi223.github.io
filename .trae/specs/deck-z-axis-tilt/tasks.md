# Tasks

- [x] Task 1: 在 appState 中新增 handTargetY 和 targetDeckTilt 字段
  - [x] 添加 `handTargetY: 0.5`、`targetDeckTilt: 0`
  - [x] 在 `resetReading()` 和 `continueSpread()` 中重置

- [x] Task 2: 手势追踪模式添加 Y 轴追踪
  - [x] 在 `onHandResults()` 中将 `palm.y` 平滑更新到 `handTargetY`
  - [x] 计算 `targetDeckTilt = (0.5 - handTargetY) * 0.5`（范围 ±0.25 弧度）

- [x] Task 3: 触控模式添加 Y 轴追踪
  - [x] 修改 `updatePointerSelection(clientX, clientY)` 接受 clientY 参数
  - [x] 从 clientY 计算 `handTargetY`，归一化到 0~1
  - [x] 计算 `targetDeckTilt`

- [x] Task 4: 渲染循环应用 Z 轴旋转
  - [x] 将 `targetDeckTilt` 平滑插值后应用到 `deckGroup.rotation.z`
  - [x] 保留原有 X 轴呼吸动画

- [x] Task 5: 优化触控滑动丝滑度
  - [x] `updatePointerSelection` 中 `handTargetX` 插值系数从 0.55 提高到 0.7
  - [x] 手动模式下 `handEase` 从 0.14 提高到 0.2

# Task Dependencies
- Task 2、3 依赖 Task 1
- Task 4 依赖 Task 2、3
- Task 5 独立
