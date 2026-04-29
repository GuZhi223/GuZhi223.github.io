# Tasks

- [x] Task 1: 重写 CSS 样式体系 — 将所有白色卡片样式替换为毛玻璃风格
  - [ ] SubTask 1.1: 重新定义 CSS 变量（`:root`），引入 glassmorphism 色彩体系（半透明背景色、边框色、模糊值、发光色等）
  - [ ] SubTask 1.2: 为 body 添加深色/渐变背景，添加 3-4 个动态流光圆形（`.orb`）并通过 `@keyframes` 实现缓慢漂移动画
  - [ ] SubTask 1.3: 将导航栏改为固定定位的居中胶囊毛玻璃条（`position: fixed` + `backdrop-filter: blur` + 圆角胶囊形）
  - [ ] SubTask 1.4: 将 `.intro`、`.side-note`、`.card`、`.work`、`.contact-box` 统一改为玻璃卡片样式（半透明白色背景 + 模糊 + 细边框 + 大圆角）
  - [ ] SubTask 1.5: 给卡片添加 hover 发光边框 + 微上浮的过渡动画
  - [ ] SubTask 1.6: 将 `.tag` 标签改为玻璃药丸样式
  - [ ] SubTask 1.7: 将 `.button` 按钮改为玻璃风格（半透明 + 模糊），primary 按钮保持蓝色半透明填充
  - [ ] SubTask 1.8: 重写 `footer` 为毛玻璃底栏样式
  - [ ] SubTask 1.9: 调整响应式媒体查询，确保移动端（`860px` 和 `560px` 断点）毛玻璃效果正常

- [x] Task 2: 微调 HTML 结构 — 适配新视觉和交互
  - [ ] SubTask 2.1: 在 `<body>` 中添加动态背景的 `.orbs` 容器和 3-4 个 `.orb` 元素
  - [ ] SubTask 2.2: 将导航栏 `.nav` 包裹在 `.nav-glass` 容器中实现胶囊浮动效果
  - [ ] SubTask 2.3: 为需要滚动入场动画的 section 子元素添加 `.reveal` class

- [x] Task 3: 添加滚动入场动画 JS
  - [ ] SubTask 3.1: 使用 Intersection Observer 监听所有 `.reveal` 元素，进入视口时添加 `.visible` class
  - [ ] SubTask 3.2: 保留原有 `data-copy` 邮箱复制 JS 逻辑不变

- [ ] Task 4: 验证 — 在浏览器中确认所有内容完整、动画正常、响应式适配
  - [ ] SubTask 4.1: 检查所有文本内容（标题、描述、标签、链接地址）与原版一致
  - [ ] SubTask 4.2: 检查所有外链 href 未被破坏
  - [ ] SubTask 4.3: 检查邮件复制功能正常
  - [ ] SubTask 4.4: 检查响应式在 860px 和 560px 断点正常折叠

# Task Dependencies
- Task 2 depends on Task 1（HTML 结构需配合新 CSS）
- Task 3 depends on Task 1
- Task 4 depends on Task 1, 2, 3
