# Tasks

- [x] Task 1: 新增 `gestureConfig` 参数配置对象和 `appState` 扩展字段
  - [x] SubTask 1.1: 在 `appState` 定义后新增 `gestureConfig` 常量对象，包含：`depthMin`（z 最小值，约 -0.18）、`depthMax`（z 最大值，约 0.06）、`powerExponent`（映射指数，约 0.55）、`minSensitivity`（最小灵敏度倍率，0.3）、`maxSensitivity`（最大灵敏度倍率，2.0）、`sensitivitySmoothing`（EMA 平滑系数，0.12）、`velocityGain`（速度灵敏度增益系数，0.6）、`velocityThreshold`（速度阈值，0.3）、`maxVelocityBonus`（最大速度额外增益，1.5）
  - [x] SubTask 1.2: 在 `appState` 中新增字段：`handZ: 0`、`handVelocityX: 0`、`handPrevX: 0.5`、`handLastMoveTime: 0`、`smoothedSensitivity: 1.0`
  - [x] SubTask 1.3: 在 `resetReading()` 和 `continueSpread()` 中重置新增的 appState 字段

- [x] Task 2: 新增 `computeSensitivity()` 函数
  - [x] SubTask 2.1: 实现深度归一化：`rawProximity = (palmZ - depthMin) / (depthMax - depthMin)`，clamp 到 [0, 1]
  - [x] SubTask 2.2: 实现非线性映射：`baseMultiplier = minSensitivity + (maxSensitivity - minSensitivity) * pow(rawProximity, powerExponent)`
  - [x] SubTask 2.3: 实现速度增益：检测速度超过阈值时，按 `velocityGain * clamp(speed / velocityThreshold, 0, maxVelocityBonus)` 叠加额外增益
  - [x] SubTask 2.4: 实现 EMA 平滑：`smoothedSensitivity += (rawMultiplier - smoothedSensitivity) * sensitivitySmoothing`
  - [x] SubTask 2.5: 函数返回最终灵敏度倍率

- [x] Task 3: 修改 `onHandResults()` 使用自适应灵敏度
  - [x] SubTask 3.1: 从 `palm.z` 传入 `computeSensitivity()` 计算灵敏度
  - [x] SubTask 3.2: 计算手部水平移动速度：`speed = |mirroredX - handPrevX| / deltaTime`
  - [x] SubTask 3.3: 将固定死区替换为 `effectiveDeadZone = baseDeadZone / sensitivityMultiplier`
  - [x] SubTask 3.4: 将固定增益替换为 `effectiveGain = baseGain * sensitivityMultiplier`
  - [x] SubTask 3.5: 更新 `handPrevX` 和 `handLastMoveTime` 用于下一帧速度计算

- [x] Task 4: 挂载 `gestureConfig` 到 `window` 允许外部调试
  - [x] SubTask 4.1: 在脚本末尾添加 `window.__gestureConfig = gestureConfig`
  - [x] SubTask 4.2: 添加 `window.__getGestureState` 返回当前 handZ、proximity、sensitivity 等调试信息

- [x] Task 5: 验证 — 确认手势交互流程完整
  - [x] SubTask 5.1: 确认无手部检测时 proximity 平滑衰减，不突变
  - [x] SubTask 5.2: 确认手指张开/握拳流程不受灵敏度变化影响（drawSelectedCard 等仍正常触发）
  - [x] SubTask 5.3: 确认 resetReading 和 continueSpread 正确重置所有新状态
  - [x] SubTask 5.4: 确认桌面端和移动端均使用 gestureConfig 中的参数
