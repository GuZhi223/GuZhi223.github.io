# Checklist

- [x] `gestureConfig` 包含 `touchHandEase`、`touchCameraEase`、`inertiaDecay`、`inertiaMinSpeed` 参数
- [x] `appState` 包含 `touchVelocityX`、`inertiaActive`、`lastPointerUpTime` 字段
- [x] `resetReading()` 和 `continueSpread()` 正确重置所有新增字段
- [x] `pointermove` 中计算滑动速度并更新 `touchVelocityX`
- [x] `pointerup` 中当速度足够时激活惯性（`inertiaActive = true`）
- [x] `pointerdown` 中立即停止惯性
- [x] `renderLoop` 中惯性激活时按衰减系数持续更新 `handTargetX`
- [x] 惯性速度低于阈值时自动停止
- [x] 触控模式下 `handX` 插值系数为 0.45（非触控模式保持原有值）
- [x] 触控模式下相机跟随系数为 0.08（非触控模式保持原有值）
- [x] 触控模式下 Y 轴响应从 0.4 提升到 0.6
- [x] 触控模式下倾斜响应从 0.5 提升到 0.65
- [x] `window.__gestureConfig` 和 `window.__getGestureState` 包含新增参数和字段
- [x] 手势模式（非手动）的交互行为不受影响
- [x] 快速滑动松手后牌堆有明显的惯性滑行效果
- [x] 缓慢滑动松手后牌堆几乎立即停止
- [x] 惯性过程中触摸屏幕能立即接管控制
