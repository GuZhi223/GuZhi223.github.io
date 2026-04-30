# 手机端触控交互优化 Spec

## Why
当前手机端手动模式下，`pointerdown` 事件直接触发抽卡（`pulseDeck()` + `drawSelectedCard()`），没有任何手势判别机制。用户手指刚碰到屏幕就立即抽卡，无法先滑动浏览牌面再点击选定。这导致手机端基本无法正常使用——触碰即抽卡，没有"选择"的余地。

根本原因：`pointerdown` 不区分"点击"和"滑动"，移动端触摸屏上任何触摸都会触发 `pointerdown`。

## What Changes
- 将 `pointerdown` 直接抽卡改为"点击手势识别"：只有短按且几乎不移动的触摸才触发抽卡
- 新增触控状态追踪：记录 `pointerdown` 时的起始位置和时间，在 `pointerup` 时判断是否为有效点击
- 新增点击判别参数：最大移动距离阈值、最大按压时长阈值
- `pointermove` 期间如果移动距离超过阈值，标记为"拖拽"并取消点击资格
- 在 `pointerup` 时才真正触发抽卡，而非 `pointerdown`

## Impact
- Affected specs: 无（本次为触控交互内部优化）
- Affected code: `index.html` — canvas 事件监听器（L4785-4791）、`appState` 新增触控追踪字段

## ADDED Requirements

### Requirement: 点击手势识别
系统 SHALL 将 `pointerdown` 直接抽卡改为 `pointerup` 条件触发抽卡，仅在判定为"点击手势"时执行抽卡。

#### Scenario: 有效点击（短按不移动）
- **WHEN** 用户在 canvas 上按下手指，移动距离 < 15px，且按压时长 < 500ms 后抬起
- **THEN** 系统判定为有效点击，触发 `pulseDeck()` + `drawSelectedCard()`

#### Scenario: 滑动操作（移动距离过大）
- **WHEN** 用户在 canvas 上按下手指后滑动，移动距离 ≥ 15px
- **THEN** 系统判定为滑动操作，不触发抽卡，仅更新 `handTargetX` 进行牌位选择

#### Scenario: 长按操作（按压时间过长）
- **WHEN** 用户在 canvas 上按下手指超过 500ms 后才抬起，且移动距离 < 15px
- **THEN** 系统判定为长按，不触发抽卡（避免误触）

### Requirement: 触控状态追踪
系统 SHALL 在 `appState` 中新增以下字段追踪触控状态：
- `touchStartX`: pointerdown 时的 clientX 坐标
- `touchStartY`: pointerdown 时的 clientY 坐标
- `touchStartTime`: pointerdown 时的时间戳
- `touchIsTap`: 当前触摸是否仍具备点击资格（移动未超阈值）

#### Scenario: pointerdown 触发
- **WHEN** 用户手指按下 canvas
- **THEN** 记录起始坐标和时间戳，`touchIsTap` 设为 `true`

#### Scenario: pointermove 中移动超限
- **WHEN** 用户手指移动距离超过 15px
- **THEN** `touchIsTap` 设为 `false`，后续 pointerup 不触发抽卡

### Requirement: pointermove 行为不变
`pointermove` 事件 SHALL 继续正常更新 `handTargetX`，不受点击识别逻辑影响。滑动选牌功能不受影响。

#### Scenario: 滑动选牌
- **WHEN** 用户手指在 canvas 上滑动
- **THEN** `updatePointerSelection(clientX)` 正常调用，牌组跟随手指旋转

## MODIFIED Requirements

### Requirement: canvas pointerdown 事件处理
canvas 的 `pointerdown` 事件 SHALL 仅记录触控起始状态，不再直接触发抽卡。抽卡逻辑移至 `pointerup` 事件中，并增加点击手势判别条件。

### Requirement: appState 扩展
`appState` SHALL 新增以下字段用于触控手势识别：
- `touchStartX`: number（初始值 0）
- `touchStartY`: number（初始值 0）
- `touchStartTime`: number（初始值 0）
- `touchIsTap`: boolean（初始值 false）

## REMOVED Requirements
无
