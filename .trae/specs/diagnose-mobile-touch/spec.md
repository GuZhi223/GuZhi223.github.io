# 移动端滑动手感诊断与优化 Spec

## Why
3D 塔罗牌项目经过多轮触控优化（死区、惯性、插值系数调整），移动端滑动手感仍然"很奇怪"。核心原因是多层插值链（handTargetX 0.7 → handX 0.45 → camera 0.08）导致手指位置与牌堆位置之间存在非线性、速度依赖的延迟，且速度计算基于已平滑的中间值而非原始输入，惯性速度与实际手指速度不匹配。

需要先创建一个独立的触摸输入诊断测试页，采集并可视化真实用户的滑动原始数据（坐标、速度、加速度、频率），再基于数据制定优化方案。

## What Changes
- 创建独立的触摸输入诊断测试网页 `projects/particles/touch-test.html`
- 测试页实时采集并可视化：原始触摸坐标、每帧 delta、瞬时速度、滑动方向、采样频率
- 测试页对比展示：原始输入 vs 模拟当前项目中的三层插值链输出
- 基于诊断数据，后续再制定具体的滑动优化方案

## Impact
- Affected specs: smooth-mobile-touch-slide、improve-touch-slide-recognition、adaptive-gesture-sensitivity（诊断可能揭示需要进一步调整的参数）
- Affected code: 新增 `projects/particles/touch-test.html`，后续可能修改 `projects/particles/index.html` 中的触控逻辑

## ADDED Requirements

### Requirement: 触摸输入诊断测试页
系统 SHALL 提供一个独立的触摸输入诊断测试页，用于采集和可视化移动端用户的真实滑动输入数据。

#### Scenario: 打开测试页
- **WHEN** 用户在手机浏览器中打开 touch-test.html
- **THEN** 显示全屏可交互区域，用户可以在上面自由滑动

#### Scenario: 实时数据可视化
- **WHEN** 用户在测试页上滑动手指
- **THEN** 实时显示以下数据：
  - 原始触摸 X/Y 坐标随时间变化的曲线
  - 每帧 X 方向 delta（像素）
  - 瞬时速度（像素/秒）
  - 当前采样间隔（ms）
  - 滑动方向指示

#### Scenario: 插值链对比
- **WHEN** 用户滑动时
- **THEN** 同时绘制两条曲线：原始输入位置 vs 模拟三层插值后的位置，直观展示延迟差异

#### Scenario: 数据统计面板
- **WHEN** 用户滑动一段距离后
- **THEN** 显示统计信息：平均采样率、平均速度、最大速度、滑动距离、惯性衰减时间

### Requirement: 触摸数据采集
系统 SHALL 采集 pointer 事件的完整原始数据用于后续分析。

#### Scenario: pointermove 采集
- **WHEN** 系统收到 pointermove 事件
- **THEN** 记录 timestamp、clientX、clientY、pointerType

#### Scenario: 速度计算
- **WHEN** 连续两个 pointermove 事件到达
- **THEN** 计算真实的时间间隔和位移，得出瞬时速度（而非基于平滑值）

### Requirement: 模拟当前插值链
系统 SHALL 在测试页中模拟当前项目的三层插值逻辑，用于对比原始输入的延迟。

#### Scenario: 模拟 handTargetX 更新
- **WHEN** 新的触摸位置到达
- **THEN** 用 `handTargetX += (x - handTargetX) * 0.7` 更新模拟的 targetX

#### Scenario: 模拟 handX 跟踪
- **WHEN** 每帧更新
- **THEN** 用 `handX += (handTargetX - handX) * 0.45` 更新模拟的 handX

#### Scenario: 可视化对比
- **WHEN** 绘制图表
- **THEN** 绿色线表示原始输入，红色线表示模拟插值后的值，差异一目了然

## MODIFIED Requirements
无

## REMOVED Requirements
无
