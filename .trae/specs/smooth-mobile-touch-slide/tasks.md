# Tasks

- [x] Task 1: 扩展 gestureConfig 和 appState 新增触控平滑参数
  - [x] 1.1: 在 `gestureConfig` 中新增 `touchHandEase: 0.45`、`touchCameraEase: 0.08`、`inertiaDecay: 0.92`、`inertiaMinSpeed: 0.001`
  - [x] 1.2: 在 `appState` 中新增 `touchVelocityX: 0`、`inertiaActive: false`、`lastPointerUpTime: 0`
  - [x] 1.3: 在 `resetReading()` 和 `continueSpread()` 中重置上述新字段

- [x] Task 2: 实现惯性/动量滑动逻辑
  - [x] 2.1: 在 `pointermove` 事件中计算水平滑动速度（归一化坐标/秒），存入 `appState.touchVelocityX`
  - [x] 2.2: 在 `pointerup` 事件中，若 `touchVelocityX` 超过阈值，设 `inertiaActive = true`
  - [x] 2.3: 在 `renderLoop` 中当 `inertiaActive === true` 且无新触摸时，按 `inertiaDecay` 衰减 `touchVelocityX`，并持续更新 `handTargetX`
  - [x] 2.4: 当 `touchVelocityX` 低于 `inertiaMinSpeed` 时停止惯性（`inertiaActive = false`）
  - [x] 2.5: 新触摸开始时（`pointerdown`）立即停止惯性

- [x] Task 3: renderLoop 中条件化插值系数
  - [x] 3.1: `handX` 插值在 `appState.manualMode` 时使用 `gestureConfig.touchHandEase`（0.45），否则使用原有值（0.14 或 gestureLite 的 0.1）
  - [x] 3.2: 相机跟随插值在 `appState.manualMode` 时使用 `gestureConfig.touchCameraEase`（0.08），否则使用原有值（0.035）

- [x] Task 4: 触控模式下提升 Y 轴和倾斜响应
  - [x] 4.1: `handTargetY` 插值系数在触控模式下从 0.4 提升到 0.6
  - [x] 4.2: `targetDeckTilt` 在触控模式下系数从 0.5 提升到 0.65

- [x] Task 5: 暴露调试接口
  - [x] 5.1: 更新 `window.__gestureState` 返回新增的 `touchVelocityX`、`inertiaActive` 字段
  - [x] 5.2: 确认 `window.__gestureConfig` 包含新增参数

# Task Dependencies
- Task 2 依赖 Task 1（需要新字段）
- Task 3 独立于 Task 2，可并行
- Task 4 独立，可与 Task 2/3 并行
- Task 5 依赖 Task 1-4
