# 握拳阻尼感与动效增强 Spec

## Why
当前握拳手势识别后，手部位置追踪的灵敏度没有变化——`computeSensitivity()` 仅考虑深度（palmZ）和手速，与握拳状态无关。用户在握拳聚焦期间，手部轻微晃动仍会导致高亮牌快速切换，容易误选。此外，握拳确认时的动效（`pulseDeck()` 仅做缩放弹跳 + 灯光闪烁 + 低频音效）反馈层次不足，缺乏"聚焦锁定"的仪式感。

## What Changes
- 在 `onHandResults()` 中检测握拳状态，握拳时对灵敏度施加阻尼因子，大幅降低手部移动对牌堆高亮的影响
- 阻尼因子通过 EMA 平滑过渡，避免灵敏度突变导致交互断层
- 松开手势后阻尼因子平滑恢复至 1.0，恢复灵敏响应
- 增强 `pulseDeck()` 动效：加入光圈冲击波扩散、屏幕边缘辉光脉冲、阶段指示器闪烁动画
- 在握拳持续期间增加粒子向心收缩的视觉加强，以及牌堆上方"聚焦光环"的持续提示
- 新增 `gestureConfig.fistDamping` 等参数，支持外部调试

## Impact
- Affected specs: `adaptive-gesture-sensitivity`（在其灵敏度管线中叠加握拳阻尼）
- Affected code: `index.html` — JS（`onHandResults()`、`updateGestureState()`、`pulseDeck()`、`intensifyParticles()`、`gestureConfig`）、CSS（新增 `.fist-vignette` 屏幕边缘辉光样式）

## ADDED Requirements

### Requirement: 握拳灵敏度阻尼
系统 SHALL 在握拳状态（`gesturePhase === "fistSeen"` 或 `gesture === "fist"`）下，对灵敏度施加阻尼因子，降低手部位置追踪的响应速度。

#### Scenario: 握拳聚焦期间
- **WHEN** 用户手势被识别为握拳（`gesturePhase === "fistSeen"`）
- **THEN** 有效灵敏度 SHALL 乘以 `fistDamping` 因子（默认 0.12），使得：
  - `effectiveDeadZone = baseDeadZone / (sensitivity * currentDamping)`
  - `effectiveGain = baseGain * sensitivity * currentDamping`
- **AND** 阻尼因子 SHALL 通过 EMA 从当前值平滑过渡到目标值（约 200ms 内完成），避免突变

#### Scenario: 松开手势恢复
- **WHEN** 用户从握拳状态松开（`gesturePhase` 离开 `"fistSeen"`）
- **THEN** 阻尼因子 SHALL 从当前值通过 EMA 平滑恢复至 1.0（约 400ms 内完成）
- **AND** 灵敏度随之平滑恢复到正常水平

#### Scenario: 无握拳状态
- **WHEN** 手势为非握拳（open / neutral / opening）
- **THEN** 阻尼因子 SHALL 保持 1.0，不影响现有灵敏度计算

### Requirement: 握拳确认动效增强
系统 SHALL 在握拳识别成功时播放增强版确认动效，提供更丰富的视觉反馈。

#### Scenario: 握拳首次识别（pulseDeck 增强）
- **WHEN** `gesturePhase` 从 `"openSeen"` 切换到 `"fistSeen"`
- **THEN** 系统 SHALL 在现有 `pulseDeck()` 基础上追加以下效果：
  - 光圈冲击波：一个金色半透明圆环从牌堆中心向外扩散（半径从 0 扩展到 400px，约 0.6 秒），透明度从 0.4 衰减到 0
  - 屏幕边缘辉光脉冲：在 `.video-wrap` 或全局覆盖层上添加一圈径向辉光，由内向外扩散后消退（约 0.8 秒）
  - 阶段指示器"聚焦"标签闪烁：`.phase[data-phase="fistSeen"]` 元素在激活时做一次 scale 脉冲动画（1.0 → 1.15 → 1.0）

### Requirement: 握拳持续视觉提示
系统 SHALL 在握拳持续期间（`gesturePhase === "fistSeen"` 且手势仍为 `"fist"`）提供持续的视觉反馈，提示用户当前处于阻尼/聚焦模式。

#### Scenario: 握拳持续状态
- **WHEN** 用户持续握拳超过 0.5 秒
- **THEN** 系统 SHALL 显示以下持续效果：
  - 牌堆上方出现一个半透明聚焦光环（CSS `.fist-focus-ring`），缓慢旋转并呼吸脉动
  - 粒子向心收缩速度加快（`intensifyParticles()` 中的收缩系数从 0.96 加速到 0.93）

#### Scenario: 松开后视觉效果消失
- **WHEN** 用户松开握拳
- **THEN** 聚焦光环 SHALL 在 0.3 秒内淡出消失，粒子恢复常规运动模式

### Requirement: 持续握拳旋转速度调整
系统 SHALL 在握拳阻尼生效期间，降低牌堆微旋转速度以匹配阻尼感。

#### Scenario: 阻尼状态下的微旋转
- **WHEN** 握拳持续且阻尼因子 < 0.5
- **THEN** `targetDeckRotation` 的每帧增量 SHALL 从 0.012 降低到 0.004（降低至 1/3）

## MODIFIED Requirements

### Requirement: onHandResults 灵敏度管线
`onHandResults()` 中的灵敏度应用逻辑 SHALL 在计算 `effectiveDeadZone` 和 `effectiveGain` 时叠加当前阻尼因子。

### Requirement: gestureConfig 扩展
`gestureConfig` 对象 SHALL 新增以下参数：
- `fistDamping`: 握拳时的灵敏度阻尼因子（默认 0.12）
- `dampingAttack`: 阻尼生效的 EMA 平滑系数（默认 0.15，约 200ms 过渡）
- `dampingRelease`: 阻尼释放的 EMA 平滑系数（默认 0.07，约 400ms 恢复）
- `dampingRecoverySpeed`: 从握拳恢复时阻尼因子的目标值（固定 1.0）

### Requirement: appState 扩展
`appState` SHALL 新增以下字段：
- `currentDamping`: 当前阻尼因子值（初始 1.0）
- `fistFocusRingVisible`: 聚焦光环是否显示

### Requirement: updateGestureState 阶段转换
`updateGestureState()` 中从 `"openSeen"` 转到 `"fistSeen"` 时， SHALL 将 `appState.currentDamping` 的目标值设为 `gestureConfig.fistDamping`；离开 `"fistSeen"` 阶段时， SHALL 将目标值恢复为 1.0。

## REMOVED Requirements
无

## Constraints
- 不修改 `classifyGesture()` 手势分类逻辑
- 不修改 `smoothGesture()` 平滑投票逻辑（其中已有的 `openNeed` 降低逻辑保持不变）
- 不修改 `drawSelectedCard()` 抽卡执行逻辑
- 不修改 `generateShareImage` / `generateSpreadShareImage` 分享功能
- 阻尼效果仅影响手部位置追踪（handTargetX），不影响手势分类本身
- 所有新增视觉效果通过 CSS/Canvas/GSAP 实现，不引入外部资源
