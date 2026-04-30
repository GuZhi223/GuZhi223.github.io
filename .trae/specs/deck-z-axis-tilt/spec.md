# 手掌上下移动驱动牌组 Z 轴旋转 Spec

## Why
当前牌组只响应手掌左右移动（Y 轴旋转），上下移动完全被忽略。`handY` 虽然已被追踪，但仅用于魔法阵检测，从未驱动牌组倾斜。添加 Z 轴旋转可以让牌组跟随手掌上下移动产生倾斜效果，增加操控的空间感和沉浸感。同时优化触控滑动的丝滑度。

## What Changes
- 新增 `handTargetY` 状态字段，追踪手掌/手指的垂直位置目标
- 新增 `targetDeckTilt` 状态字段，控制牌组 Z 轴倾斜角度
- 手势追踪模式：从 `handY`（palm.y）计算 `handTargetY`
- 触控模式：从 `clientY` 计算 `handTargetY`
- 渲染循环中将 `targetDeckTilt` 应用到 `deckGroup.rotation.z`
- 优化触控滑动丝滑度：提高 `handTargetX` 插值系数和 `handEase` 系数

## Impact
- Affected specs: 无（本次为交互增强）
- Affected code: `index.html` — appState 新增字段、`onHandResults()` 新增 Y 轴追踪、`updatePointerSelection()` 新增 Y 轴追踪、渲染循环新增 Z 轴旋转、`layoutCards()` 中卡片 Z 旋转叠加牌组倾斜

## ADDED Requirements

### Requirement: 手掌上下移动驱动牌组 Z 轴倾斜
系统 SHALL 根据手掌/手指的垂直位置计算牌组 Z 轴倾斜角度，使牌组跟随上下移动产生倾斜效果。

#### Scenario: 手掌上移
- **WHEN** 手掌垂直位置从中间向上移动（palm.y 减小 / clientY 减小）
- **THEN** 牌组 Z 轴正方向倾斜，产生"仰起"的视觉效果

#### Scenario: 手掌下移
- **WHEN** 手掌垂直位置从中间向下移动（palm.y 增大 / clientY 增大）
- **THEN** 牌组 Z 轴负方向倾斜，产生"俯冲"的视觉效果

#### Scenario: 手掌居中
- **WHEN** 手掌垂直位置在画面中间（归一化值 ≈ 0.5）
- **THEN** 牌组 Z 轴倾斜接近 0，保持水平

### Requirement: Z 轴倾斜范围限制
系统 SHALL 将 Z 轴倾斜角度限制在合理范围内，避免过度倾斜导致视觉失真。

#### Scenario: 最大倾斜
- **WHEN** 手掌移动到画面最上方或最下方
- **THEN** Z 轴倾斜角度不超过 ±0.25 弧度（约 ±14°）

### Requirement: 触控模式 Y 轴追踪
系统 SHALL 在触控模式的 `pointermove` 事件中同时追踪 Y 坐标，计算 `handTargetY`。

#### Scenario: 手指上下滑动
- **WHEN** 用户在触控模式下上下滑动
- **THEN** `handTargetY` 随手指 Y 坐标平滑更新，牌组产生 Z 轴倾斜

### Requirement: 触控滑动丝滑度优化
系统 SHALL 提高触控模式下的插值系数，使滑动响应更即时、更丝滑。

#### Scenario: 手指左右滑动响应
- **WHEN** 用户手指左右滑动
- **THEN** `handTargetX` 插值系数从 0.55 提高到 0.7，减少延迟感

#### Scenario: 渲染循环 handEase
- **WHEN** `handX` 跟随 `handTargetX`
- **THEN** 手动模式下 handEase 从 0.14 提高到 0.2，使牌组旋转更跟手

## MODIFIED Requirements

### Requirement: appState 扩展
`appState` SHALL 新增以下字段：
- `handTargetY: 0.5` — 垂直位置目标（归一化 0~1，0.5 为居中）
- `targetDeckTilt: 0` — 牌组 Z 轴目标倾斜角度

### Requirement: onHandResults Y 轴追踪
`onHandResults()` 中 SHALL 将 `palm.y` 平滑更新到 `handTargetY`，并计算 `targetDeckTilt`。

### Requirement: updatePointerSelection 扩展
`updatePointerSelection()` SHALL 接受 `clientY` 参数，同步更新 `handTargetY`。

### Requirement: 渲染循环 Z 轴旋转
渲染循环 SHALL 将 `targetDeckTilt` 平滑插值后应用到 `deckGroup.rotation.z`。

## REMOVED Requirements
无
