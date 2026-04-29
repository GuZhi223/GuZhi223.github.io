# Checklist

- [x] `gestureConfig` 对象存在且包含所有可调参数（depthMin/depthMax/powerExponent/minSensitivity/maxSensitivity/sensitivitySmoothing/velocityGain/velocityThreshold/maxVelocityBonus）
- [x] `appState` 包含 handZ、handVelocityX、handPrevX、handLastMoveTime、smoothedSensitivity 字段
- [x] `computeSensitivity(palmZ, speed)` 函数实现了深度归一化，将 palm.z 映射到 0–1 proximity
- [x] `computeSensitivity()` 使用 power 曲线（exponent 0.55）进行非线性映射
- [x] `computeSensitivity()` 包含速度增益逻辑（velocityGain * 速度比值）
- [x] `computeSensitivity()` 使用 EMA 平滑输出（smoothing 0.12），避免突变
- [x] `onHandResults()` 调用 `computeSensitivity(palm.z, handVelocityX)` 获取灵敏度倍率
- [x] 死区阈值动态缩放：`effectiveDeadZone = baseDeadZone / sensitivityMultiplier`
- [x] 移动增益动态缩放：`effectiveGain = baseGain * sensitivityMultiplier`
- [x] `handPrevX` 和 `handLastMoveTime` 在每帧正确更新
- [x] 无手部检测时 `smoothedSensitivity` 不突变（EMA 自然保持上一次值）
- [x] `resetReading()` 和 `continueSpread()` 均重置所有新增 appState 字段
- [x] `window.__gestureConfig` 暴露配置对象，可在控制台访问和修改
- [x] 手势张开/握拳/抽卡流程不受灵敏度系统影响，正常运行
