# Tasks

- [x] Task 1: 修改 appState 和 gestureConfig
  - [x] 1.1: 添加 `touchStartRotation`、`touchStartClientX`、`rotationVelocity` 字段到 appState
  - [x] 1.2: 添加 `rotationGain: 0.005`（每像素旋转弧度）、`inertiaFriction: 0.95`、`inertiaMinSpeed: 0.05` 到 gestureConfig
  - [x] 1.3: 保留 handX 用于 camera 位置计算，但删除 active touch 期间的插值更新

- [x] Task 2: 重写 pointerdown 事件处理
  - [x] 2.1: 记录 `touchStartRotation = appState.deckRotation`
  - [x] 2.2: 记录 `touchStartClientX = e.clientX`
  - [x] 2.3: 停止惯性 `inertiaActive = false`，重置 `rotationVelocity = 0`
  - [x] 2.4: 保持 tap 检测逻辑不变

- [x] Task 3: 重写 pointermove 事件处理
  - [x] 3.1: 计算像素 delta：`clientX - touchStartClientX`
  - [x] 3.2: 直接设置 `deckRotation = touchStartRotation + deltaX * rotationGain`（无插值）
  - [x] 3.3: 同时更新 `targetDeckRotation`（供 layoutCards 使用）
  - [x] 3.4: 计算旋转速度：`rotationVelocity` 使用 50% 指数移动平均
  - [x] 3.5: 保留 deadzone 和 tap 检测逻辑
  - [x] 3.6: 保留 Y 轴 updatePointerSelection（tilt 保持不变）

- [x] Task 4: 重写 pointerup 事件处理
  - [x] 4.1: 如果是 tap 且满足条件，执行 drawSelectedCard（保持不变）
  - [x] 4.2: 如果不是 tap 且 rotationVelocity 超过阈值，启动惯性 `inertiaActive = true`
  - [x] 4.3: 速度低于阈值时直接清零

- [x] Task 5: 重写 renderLoop 中的触摸/惯性逻辑
  - [x] 5.1: 删除 active touch 期间的 handX/handTargetX/rawTouchX 插值代码
  - [x] 5.2: 将惯性逻辑改为直接作用于 deckRotation：`deckRotation += rotationVelocity * dt; rotationVelocity *= friction`
  - [x] 5.3: 保留 handX 用于 camera position，但从 deckRotation 反推：`handX = 0.5 - deckRotation / (Math.PI * 2.15)`
  - [x] 5.4: 保留 targetDeckTilt 和 deckGroup.rotation.z 的更新
  - [x] 5.5: 保留 layoutCards(dt)、animateParticles、updateMagicCircle 调用
  - [x] 5.6: 手势模式保留 targetDeckRotation = (0.5 - handTargetX) * PI * 2.15

- [x] Task 6: 处理特殊情况
  - [x] 6.1: 确保 shuffle 动画期间不响应触摸旋转
  - [x] 6.2: 确保卡片已抽取后（drawn=true）不响应
  - [x] 6.3: 确保非 manualMode 时不使用新逻辑

- [x] Task 7: 验证高亮卡片更新
  - [x] 7.1: 拖拽旋转时确认 highlightedIndex 正确跟随（layoutCards 中已有 mod 运算）
  - [x] 7.2: 松手后惯性旋转时确认高亮持续更新

# Task Dependencies
- Task 2 依赖 Task 1（需要新字段）
- Task 3 依赖 Task 2（pointerdown 设置起始值）
- Task 4 依赖 Task 3（需要速度数据）
- Task 5 依赖 Task 1-4（需要所有事件处理就绪）
- Task 6 依赖 Task 5（在 renderLoop 中加入条件判断）
- Task 7 依赖 Task 5-6（需要完整流程才能验证）
