# Tasks

- [x] Task 1: 创建拼豆图纸生成器页面 `projects/perler-bead/index.html`
  - [x] SubTask 1.1: 搭建页面结构与样式——`<head>` 配置（charset、viewport、title、favicon、Font Awesome CDN）、CSS 变量、全局重置、清新简洁的卡片式布局，包含顶部标题、上传区域、参数面板、图纸预览区和颜色统计栏
  - [x] SubTask 1.2: 实现图片上传组件——支持点击选择和拖拽上传（JPG/PNG/GIF），用 FileReader 读取后在隐藏 Canvas 上绘制原图
  - [x] SubTask 1.3: 实现参数设置 UI——图纸高度输入框/滑块（10-100，默认 32）、保持原图比例开关、颜色数量选择（8/12/16/20/24/32，默认 16）、"生成拼豆图纸"按钮
  - [x] SubTask 1.4: 内置拼豆色板数据——约 50-60 种常见拼豆色（含色号名称和 RGB 值），实现 RGB 欧氏距离的颜色匹配函数，将每个像素映射到最近色号
  - [x] SubTask 1.5: 实现像素化处理流程——根据高度参数和保持比例设置计算宽高网格尺寸，对 Canvas 缩放取平均色，对每个格子执行颜色映射，生成二维结果数组
  - [x] SubTask 1.6: 用 Canvas 渲染拼豆图纸——每个单元格填充对应拼豆颜色，可选绘制网格线和色号文字，支持鼠标滚轮缩放和平移浏览
  - [x] SubTask 1.7: 实现颜色统计面板——遍历结果数组统计各色号使用数量，在底部以列表展示色块、色号和颗数
  - [x] SubTask 1.8: 实现导出功能——将当前图纸 Canvas 导出为 PNG（含网格线和色号）并触发下载
  - [x] SubTask 1.9: 整体交互打磨——参数变更后点击生成按钮触发处理、加载提示、移动端响应式适配、确保所有处理在浏览器本地完成

- [x] Task 2: 在主页添加入口卡片
  - [x] SubTask 2.1: 在 `index.html` 的"一些分享"works-grid 中新增拼豆图纸生成器的工作卡片，包含图标、标题"拼豆图纸生成器"、描述、技术标签和链接 `projects/perler-bead/index.html`，风格与其他卡片一致

# Task Dependencies
- Task 2 depends on Task 1（需要先有目标页面才能添加入口链接）
