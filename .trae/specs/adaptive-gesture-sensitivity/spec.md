# 手势自适应灵敏度 Spec

## Why
当前左右滑动交互使用固定的死区阈值（移动端 0.024 / 桌面端 0.014）和平滑增益（0.32 / 0.08），无法根据用户手部与屏幕的实际距离动态调节灵敏度。用户手靠近屏幕时需要更灵敏的响应，远离屏幕时需要更稳定（迟钝）的响应，以减少误触并提升交互自然度。

核心发现：`getPalmCenter()` 已计算 `palm.z`（深度值），但在 `onHandResults()` 中**完全未使用**。MediaPipe 的 z 坐标表示手部相对摄像头的深度——越接近 0 表示手越靠近屏幕，越负值表示手越远离屏幕。

## What Changes
- 新增 `palm.z` 深度值采集与归一化算法，将 MediaPipe z 坐标映射为 0–1 的"接近度"（proximity）
- 新增非线性映射函数，将接近度转换为灵敏度倍率（power 曲线，近处增长快、远处趋平）
- 修改滑动处理逻辑：死区和增益均乘以灵敏度倍率，实现距离相关的动态调节
- 新增速度追踪：计算手部水平移动速度，速度越快灵敏度越高，实现"快速挥手"更灵敏的体验
- 新增灵敏度平滑过渡，使用指数移动平均避免突变
- 新增 `gestureConfig` 参数配置对象，集中管理所有可调参数

## Impact
- Affected specs: 无（本次为手势系统内部优化）
- Affected code: `index.html` — JS（`getPalmCenter()` 增加归一化、`onHandResults()` 修改灵敏度逻辑、新增 `gestureConfig` 对象、新增 `computeSensitivity()` 函数）、appState（新增 depth/sensitivity 相关字段）

## ADDED Requirements

### Requirement: 深度检测与归一化
系统 SHALL 从 `palm.z` 计算手部接近度（proximity），值域 0（最远）到 1（最近）。

#### Scenario: 手靠近屏幕
- **WHEN** 用户手部靠近屏幕（palm.z ≈ 0 或正值）
- **THEN** proximity 值接近 1.0

#### Scenario: 手远离屏幕
- **WHEN** 用户手部远离屏幕（palm.z ≈ -0.15 或更负）
- **THEN** proximity 值接近 0.0

#### Scenario: 无手部检测
- **WHEN** MediaPipe 未检测到手部
- **THEN** proximity 保持上一次的平滑值，不突变为 0

### Requirement: 非线性灵敏度映射
系统 SHALL 使用 power 曲线将 proximity 映射为灵敏度倍率（sensitivityMultiplier），值域由 `minSensitivity`（约 0.3）到 `maxSensitivity`（约 2.0）。

#### Scenario: 手非常靠近屏幕
- **WHEN** proximity > 0.8
- **THEN** sensitivityMultiplier ≈ 1.5–2.0，滑动响应极为灵敏

#### Scenario: 手在中等距离
- **WHEN** proximity ≈ 0.4–0.6
- **THEN** sensitivityMultiplier ≈ 0.8–1.2，接近默认灵敏度

#### Scenario: 手远离屏幕
- **WHEN** proximity < 0.2
- **THEN** sensitivityMultiplier ≈ 0.3–0.5，大幅降低灵敏度，仅响应大幅度滑动

### Requirement: 速度感知增强
系统 SHALL 追踪手部水平移动速度，并将速度纳入灵敏度计算，实现快速移动时灵敏度提升。

#### Scenario: 快速挥手
- **WHEN** 手部水平移动速度 > 1.5（归一化单位/秒）
- **THEN** 额外灵敏度增益 ×1.0–×1.5

#### Scenario: 缓慢移动
- **WHEN** 手部水平移动速度 < 0.3
- **THEN** 无额外速度增益，仅使用距离灵敏度

### Requirement: 灵敏度平滑过渡
系统 SHALL 对最终灵敏度倍率应用指数移动平均（EMA），避免灵敏度突变导致交互抖动。

#### Scenario: 距离快速变化
- **WHEN** 用户手部从远处快速移近
- **THEN** 灵敏度在约 300ms 内平滑过渡到目标值，不会突然跳变

### Requirement: 动态死区与增益
系统 SHALL 基于灵敏度倍率动态调整死区阈值和移动增益。

#### Scenario: 高灵敏度模式
- **WHEN** sensitivityMultiplier = 2.0
- **THEN** 有效死区 = baseDeadZone / 2.0，有效增益 = baseGain × 2.0

#### Scenario: 低灵敏度模式
- **WHEN** sensitivityMultiplier = 0.4
- **THEN** 有效死区 = baseDeadZone / 0.4，有效增益 = baseGain × 0.4

### Requirement: 可配置参数接口
系统 SHALL 提供 `gestureConfig` 对象集中管理所有可调参数，允许后续根据用户反馈微调。

#### Scenario: 参数可访问
- **WHEN** 开发者在控制台输入 `window.__gestureConfig`
- **THEN** 返回包含所有手势灵敏度参数的对象，可实时修改

## MODIFIED Requirements

### Requirement: onHandResults 滑动处理
`onHandResults()` 中的滑动处理逻辑 SHALL 使用动态灵敏度替代固定死区和增益。

#### Scenario: 使用距离自适应灵敏度
- **WHEN** 手部坐标变化触发滑动检测
- **THEN** 死区和增益均由 `computeSensitivity()` 的结果动态决定，而非使用固定常量

### Requirement: appState 扩展
`appState` SHALL 新增以下字段用于自适应灵敏度系统：
- `handZ`: 当前手部深度值（经平滑处理）
- `handVelocityX`: 手部水平移动速度
- `handPrevX`: 上一帧手部 x 坐标（用于速度计算）
- `handLastMoveTime`: 上一次有效移动的时间戳
- `smoothedSensitivity`: 当前平滑后的灵敏度倍率

## REMOVED Requirements
无
