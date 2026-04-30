# 移动端触控滑动识别逻辑优化 Spec

## Why
当前触控滑动存在两个核心问题：(1) 无死区——手指微小抖动就触发牌位移动，点击时牌组也在晃动；(2) 三层插值叠加（handTargetX 0.7 → handX 0.2 → layoutCards lerp），导致滑动极度迟钝，与手指位置严重脱节。

## What Changes
- 新增滑动死区：`pointerdown` 后手指移动超过 8px 才开始更新 `handTargetX`/`handTargetY`，避免点击时牌组抖动
- 减少插值层级：手动/触控模式下 `layoutCards()` 中 `deckRotation` 直接赋值 `targetDeckRotation`，消除二次插值延迟
- 添加 `setPointerCapture` 确保手指滑出 canvas 边界后仍能接收事件
- `pointerup` 时释放捕获并重置滑动状态

## Impact
- Affected specs: mobile-touch-tap-gesture（在已有点击识别基础上增强）
- Affected code: `index.html` — appState 新增字段、canvas 事件监听器、`updatePointerSelection()`、`layoutCards()`

## ADDED Requirements

### Requirement: 滑动死区
系统 SHALL 在 `pointerdown` 后设置 8px 死区，手指移动距离未超过死区前不更新牌位目标。

#### Scenario: 手指微动不触发牌位变化
- **WHEN** 用户手指按下后微小移动（< 8px）
- **THEN** `handTargetX` 和 `handTargetY` 保持不变，牌组不产生任何位移或倾斜

#### Scenario: 超过死区开始响应
- **WHEN** 手指移动距离超过 8px
- **THEN** 开始正常追踪手指位置更新 `handTargetX` 和/或 `handTargetY`

### Requirement: 减少插值层级
系统 SHALL 在手动/触控模式下跳过 `layoutCards()` 中 `deckRotation` 的二次插值。

#### Scenario: 触控滑动即时响应
- **WHEN** 用户滑动手指更新 `handTargetX`
- **THEN** 牌组旋转跟手，无明显延迟

### Requirement: Pointer Capture
系统 SHALL 在 `pointerdown` 时调用 `setPointerCapture`，`pointerup` 时释放。

#### Scenario: 手指滑出 canvas
- **WHEN** 用户手指从 canvas 边界滑出
- **THEN** 仍能继续接收 `pointermove` 和 `pointerup` 事件

## MODIFIED Requirements

### Requirement: appState 扩展
`appState` SHALL 新增以下字段：
- `touchDeadzonePassed: false` — 是否已通过死区

### Requirement: layoutCards 行为修改
`layoutCards()` 中 `deckRotation` 插值 SHALL 在 `appState.manualMode === true` 时跳过，直接赋值 `targetDeckRotation`。

## REMOVED Requirements
无
