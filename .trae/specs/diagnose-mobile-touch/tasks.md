# Tasks

- [x] Task 1: 创建触摸输入诊断测试页基础结构
  - [x] 1.1: 创建 `projects/particles/touch-test.html`，包含全屏 Canvas 绘制区和数据面板
  - [x] 1.2: 实现深色背景 + 响应式布局，适配移动端全屏使用
  - [x] 1.3: 添加顶部标题栏和简要使用说明

- [x] Task 2: 实现原始触摸数据采集
  - [x] 2.1: 监听 pointerdown/pointermove/pointerup 事件，记录 timestamp、clientX、clientY、pointerType
  - [x] 2.2: 维护一个滑动数据数组（最近 200 个采样点），自动滚动
  - [x] 2.3: 计算每帧真实 delta（像素）和时间间隔（ms）

- [x] Task 3: 实现瞬时速度和统计计算
  - [x] 3.1: 基于原始数据计算瞬时速度（像素/秒），使用 3 点移动平均平滑噪声
  - [x] 3.2: 计算统计面板数据：平均采样率、平均速度、最大速度、滑动总距离
  - [x] 3.3: 计算惯性衰减：记录 pointerup 后的速度衰减曲线

- [x] Task 4: 实现 Canvas 实时图表绘制
  - [x] 4.1: 绘制 X 坐标随时间变化的曲线图（原始输入用绿色）
  - [x] 4.2: 绘制速度随时间变化的曲线图
  - [x] 4.3: 绘制 delta 随时间变化的条形图（正值右移，负值左移）
  - [x] 4.4: 添加滑动方向指示器（箭头或圆点跟踪手指）

- [x] Task 5: 实现当前插值链模拟对比
  - [x] 5.1: 在测试页中模拟 appState.handTargetX 的更新逻辑（`(x - targetX) * 0.7`）
  - [x] 5.2: 模拟 appState.handX 的插值跟踪（`(targetX - handX) * 0.45`）
  - [x] 5.3: 在同一个图表上用不同颜色绘制原始输入 vs 模拟插值结果
  - [x] 5.4: 实时显示两者之间的延迟差（帧数/毫秒）

- [x] Task 6: 实现数据面板 UI
  - [x] 6.1: 浮动数据面板显示：当前坐标、速度、采样间隔、方向
  - [x] 6.2: 统计区域显示：平均采样率、最大速度、滑动距离、惯性持续时间
  - [x] 6.3: 添加"清空数据"和"导出 CSV"按钮

- [x] Task 7: 移动端适配和性能优化
  - [x] 7.1: 确保触摸事件不触发浏览器默认滚动/缩放（touch-action: none）
  - [x] 7.2: Canvas 使用 requestAnimationFrame 节流绘制，避免过度渲染
  - [x] 7.3: 在 iOS Safari 和 Android Chrome 上测试基本功能

# Task Dependencies
- Task 2 依赖 Task 1（需要页面结构）
- Task 3 依赖 Task 2（需要原始数据）
- Task 4 依赖 Task 2 和 Task 3（需要数据和计算结果来绘制）
- Task 5 依赖 Task 2（需要原始数据作为模拟输入）
- Task 6 依赖 Task 3 和 Task 4（需要计算结果和图表）
- Task 7 依赖 Task 1-6（全面完成后做适配检查）
