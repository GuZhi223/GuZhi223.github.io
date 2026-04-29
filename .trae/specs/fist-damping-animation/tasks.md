# Tasks

- [x] Task 1: 扩展 `gestureConfig` 和 `appState` 字段
  - [x] SubTask 1.1: 在 `gestureConfig` 中新增 `fistDamping: 0.12`、`dampingAttack: 0.15`、`dampingRelease: 0.07`
  - [x] SubTask 1.2: 在 `appState` 中新增 `currentDamping: 1.0`、`dampingTarget: 1.0`、`fistFocusRingVisible: false`
  - [x] SubTask 1.3: 在 `resetReading()` 和 `continueSpread()` 中重置 `currentDamping` 为 1.0、`dampingTarget` 为 1.0、`fistFocusRingVisible` 为 false

- [x] Task 2: 实现握拳阻尼灵敏度计算逻辑
  - [x] SubTask 2.1: 在 `updateGestureState()` 中，进入 `fistSeen` 阶段时设置 `appState.dampingTarget = gestureConfig.fistDamping`，离开时设为 1.0
  - [x] SubTask 2.2: 在 `onHandResults()` 中，每帧根据 `dampingTarget` 和当前 `currentDamping` 进行 EMA 平滑：选择 `dampingAttack` 或 `dampingRelease` 系数
  - [x] SubTask 2.3: 修改 `effectiveDeadZone` 和 `effectiveGain` 计算，叠加 `appState.currentDamping`

- [x] Task 3: 增强 `pulseDeck()` 握拳确认动效
  - [x] SubTask 3.1: 在 `pulseDeck()` 中新增光圈冲击波效果：创建一个 div 元素，使用 GSAP 动画从半径 0 扩展到 800px，金色边框 0.4→0 透明度，约 0.6s
  - [x] SubTask 3.2: 新增屏幕边缘辉光脉冲：使用径向渐变覆盖层，从中心向外脉冲扩散，约 0.3s yoyo 消退
  - [x] SubTask 3.3: 为阶段指示器"聚焦"标签添加 scale 脉冲动画（GSAP 1.0→1.15 yoyo）

- [x] Task 4: 实现握拳持续视觉提示
  - [x] SubTask 4.1: 在 HTML 中添加 `.fist-focus-ring` DOM 元素（默认 `display: none`），CSS 设置金色半透明圆环、缓慢旋转动画和呼吸脉动
  - [x] SubTask 4.2: 在 `updateGestureState()` 的 `fistSeen` + `fist` 持续分支中，握拳超过 0.5s 后显示聚焦光环，松开后淡出隐藏
  - [x] SubTask 4.3: 在 `intensifyParticles()` 中，当 `currentDamping < 0.5` 时将粒子收缩系数从 0.96 加速到 0.93
  - [x] SubTask 4.4: 调整 `updateGestureState()` 中持续握拳的 `targetDeckRotation` 增量，阻尼状态下从 0.012 降至 0.004

- [x] Task 5: 验证与调试
  - [x] SubTask 5.1: 确认握拳后手部轻微移动不再导致牌堆高亮快速切换
  - [x] SubTask 5.2: 确认松开手后灵敏度平滑恢复（约 400ms），无卡顿感
  - [x] SubTask 5.3: 确认 `pulseDeck` 增强动效（光圈、辉光、阶段标签脉冲）正常播放
  - [x] SubTask 5.4: 确认聚焦光环在握拳持续 0.5s 后显示，松开后淡出
  - [x] SubTask 5.5: 确认粒子在握拳阻尼状态下收缩更快
  - [x] SubTask 5.6: 确认 `resetReading` 和 `continueSpread` 正确重置所有新状态
  - [x] SubTask 5.7: 确认非握拳状态下所有灵敏度行为与改动前完全一致

# Task Dependencies

- Task 2 依赖 Task 1（需要新的 config 和 state 字段）
- Task 3 可与 Task 2 并行（视觉效果独立于灵敏度逻辑）
- Task 4 依赖 Task 1（需要 `currentDamping` 状态判断）
- Task 5 依赖 Task 1-4 全部完成
