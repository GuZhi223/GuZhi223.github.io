# 手机端触控滑动流畅性优化 Spec

## Why
手机端触控滑动选牌虽然已有死区和基础插值，但体验仍"僵硬"——三层插值链（handTargetX 0.7 → handX 0.2 → camera 0.035）叠加导致手指移动与牌堆响应之间存在明显滞后；手指抬起后牌堆瞬间停止，缺乏惯性，操作感生硬不自然。

## What Changes
- 提升手动/触控模式下 `handX` 的插值系数（0.2 → 0.45），压缩 handTargetX 到 handX 的延迟
- 提升相机跟随系数（0.035 → 0.08），让相机更快跟上牌堆偏移
- 添加**惯性/动量**系统：手指离开屏幕后，基于最后的滑动速度继续运动并逐渐衰减
- 为触控模式下的 `handTargetY` 和 `targetDeckTilt` 提升响应系数
- 在 `gestureConfig` 中新增触控相关可调参数，便于调优

## Impact
- Affected specs: improve-touch-slide-recognition（在已有优化基础上进一步提升）
- Affected code: `projects/particles/index.html` — `renderLoop`、`updatePointerSelection`、pointer 事件监听器、`appState`、`gestureConfig`

## ADDED Requirements

### Requirement: 触控模式下提升插值响应系数
系统 SHALL 在手动/触控模式下使用更高的插值系数，减少手指位置与牌堆位置之间的滞后。

#### Scenario: 手指移动牌堆即时跟随
- **WHEN** 用户在触控模式下滑动手指
- **THEN** handX 与 handTargetX 的差距在 2-3 帧内缩小到可忽略范围（而非当前的 5-8 帧）

### Requirement: 惯性/动量滑动
系统 SHALL 在手指离开屏幕后，基于最后的滑动速度继续驱动牌堆运动，并以指数衰减逐渐停止。

#### Scenario: 快速滑动后松手
- **WHEN** 用户快速向左滑动后松手
- **THEN** 牌堆继续向左旋转，速度按约 0.92/帧 的系数衰减，在 0.5-1 秒内自然停止

#### Scenario: 缓慢滑动后松手
- **WHEN** 用户缓慢滑动后松手
- **THEN** 牌堆几乎立即停止（因速度很小，衰减后接近零）

#### Scenario: 惯性期间新的触摸
- **WHEN** 牌堆正在惯性运动时用户再次触摸屏幕
- **THEN** 立即停止惯性，切换为手指直接控制

### Requirement: 触控模式相机跟随加速
系统 SHALL 在手动/触控模式下提升相机的跟随系数。

#### Scenario: 牌堆偏移后相机快速跟上
- **WHEN** 用户滑动导致牌堆向左偏移
- **THEN** 相机在 0.3-0.5 秒内跟上新的偏移位置（而非当前的 1.5-2 秒）

## MODIFIED Requirements

### Requirement: appState 扩展
`appState` SHALL 新增以下字段：
- `touchVelocityX: 0` — 触控滑动的水平速度（归一化坐标/秒）
- `inertiaActive: false` — 是否正在惯性衰减
- `lastPointerUpTime: 0` — 上次 pointerup 时间戳

### Requirement: gestureConfig 扩展
`gestureConfig` SHALL 新增以下参数：
- `touchHandEase: 0.45` — 触控模式下 handX 插值系数
- `touchCameraEase: 0.08` — 触控模式下相机跟随系数
- `inertiaDecay: 0.92` — 惯性每帧衰减系数
- `inertiaMinSpeed: 0.001` — 惯性停止阈值

### Requirement: renderLoop 条件化插值
`renderLoop` 中 `handX` 插值系数 SHALL 根据 `appState.manualMode` 选择不同值：
- 手势模式保持原有 0.14
- 手动/触控模式使用 `gestureConfig.touchHandEase`

### Requirement: renderLoop 条件化相机跟随
`renderLoop` 中相机跟随系数 SHALL 根据 `appState.manualMode` 选择不同值：
- 手势模式保持原有 0.035
- 手动/触控模式使用 `gestureConfig.touchCameraEase`

## REMOVED Requirements
无
