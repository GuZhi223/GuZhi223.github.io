# 地球仪式旋转拖拽 Spec

## Why
当前牌堆滑动使用**绝对位置映射**（手指在屏幕 0.3 → 牌堆转到对应角度），配合插值平滑（0.75 ease）。这导致：手指与牌堆之间存在不可避免的延迟、快速拖拽时牌堆"追不上"手指、松手后惯性不自然。用户期望的是"拨弄地球仪"的物理手感——手指拖多少牌堆转多少，松手后自然减速。

## What Changes
- **BREAKING**: 彻底改变触摸→旋转的映射模型：从绝对位置映射改为**相对拖拽量映射**
- active touch 期间删除所有插值（handX、handTargetX、rawTouchX 等中间变量），deckRotation 直接 = startRotation + pixelDelta × gain
- pointerdown 记录触摸瞬间的 deckRotation 作为起始旋转
- pointermove 用原始像素位移 × 旋转增益 直接累加到 deckRotation
- 保留惯性系统但改为基于旋转速度（rad/s），使用摩擦力衰减模型
- highlightedIndex 通过 deckRotation 模运算自动正确（已有逻辑）
- Y 轴 tilt 保持不变（位置映射 + 插值）

## Impact
- Affected specs: diagnose-mobile-touch、smooth-mobile-touch-slide
- Affected code: `projects/particles/index.html` 中的 pointerdown/move/up 事件、renderLoop 中的手部追踪和惯性逻辑、appState 和 gestureConfig 字段

## ADDED Requirements

### Requirement: 相对拖拽旋转
系统 SHALL 使用相对拖拽量映射旋转，而非绝对位置映射。

#### Scenario: 触摸开始
- **WHEN** 用户在牌堆区域按下手指
- **THEN** 记录当前 deckRotation 作为 touchStartRotation，停止任何进行中的惯性

#### Scenario: 拖拽中
- **WHEN** 用户移动手指（deltaX 像素）
- **THEN** deckRotation = touchStartRotation + deltaX * ROTATION_GAIN，无需插值

#### Scenario: 松手
- **WHEN** 用户抬起手指
- **THEN** 基于最近几帧的拖拽速度启动惯性旋转

### Requirement: 物理惯性
系统 SHALL 在松手后基于拖拽速度继续旋转，使用摩擦力自然减速。

#### Scenario: 快速甩动
- **WHEN** 用户快速向左甩并松手
- **THEN** 牌堆继续向左旋转，速度按摩擦系数每帧衰减，自然减速至停止

#### Scenario: 缓慢拖拽后松手
- **WHEN** 用户缓慢拖拽后松手
- **THEN** 牌堆几乎不动（速度低于阈值，惯性不触发）

### Requirement: 高亮卡片正确更新
系统 SHALL 在旋转过程中正确更新高亮卡片。

#### Scenario: 拖拽旋转时高亮跟随
- **WHEN** 用户拖拽牌堆旋转
- **THEN** 最前面的卡片自动更新为当前旋转角度对应的位置

## MODIFIED Requirements

### Requirement: pointerdown 事件处理
修改为记录 touchStartRotation 和 touchStartDeckY，停止惯性。

### Requirement: pointermove 事件处理
修改为计算像素 delta，直接更新 deckRotation，计算旋转速度。

### Requirement: renderLoop 手部追踪
删除 active touch 期间的 handX/handTargetX 插值逻辑。保留惯性更新（改为作用于 deckRotation）。保留 Y 轴 tilt 和 camera 跟踪。

## REMOVED Requirements

### Requirement: handX/rawTouchX 绝对位置追踪
**Reason**: 改为相对拖拽量映射，不再需要绝对位置追踪变量
**Migration**: handX 仅用于 camera position 计算，由 deckRotation 反推
