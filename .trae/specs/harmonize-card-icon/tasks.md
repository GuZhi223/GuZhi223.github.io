# Tasks

- [x] Task 1: 重写 `.result-card-icon` CSS 容器样式
  - [x] SubTask 1.1: 将 `.result-card-icon` 从 `border-radius: 50%` 改为 `border-radius: 16px`，宽度/高度保持 88×88px
  - [x] SubTask 1.2: 添加 `.result-card-icon::before` 和 `::after` 实现四角 L 形装饰线（利用渐变边框或 background gradient trick）
  - [x] SubTask 1.3: 将 `cardIconPulse` 动画的紫色光晕统一为纯金色系呼吸光效

- [x] Task 2: 重构图标内部排版（前景 numeral + 背景 symbol）
  - [x] SubTask 2.1: 新增 `.result-card-symbol` 样式：字号 44px、`opacity: 0.12`、绝对定位居中
  - [x] SubTask 2.2: 修改 `.result-card-numeral` 样式：字号提升至 18px、`font-weight: 800`、颜色 `--gold`、相对定位 z-index 提升
  - [x] SubTask 2.3: 将 `.result-card-icon` 改为 `position: relative; overflow: hidden` 以支持内部绝对定位

- [x] Task 3: 更新 JS 中 drawSelectedCard() 的 cardIcon 模板
  - [x] SubTask 3.1: 修改 `drawSelectedCard()` 中 cardIcon.innerHTML 模板为双层结构：`<span class="result-card-numeral">${numeral}</span><span class="result-card-symbol">${sym}</span>`
  - [x] SubTask 3.2: 确保 `showResult()` 中 subtitle 和 brief 元素的显示/隐藏逻辑不受影响

- [x] Task 4: 更新移动端 CSS 适配
  - [x] SubTask 4.1: 在移动端媒体查询中更新 `.result-card-icon` 尺寸为 72×72px、圆角 14px
  - [x] SubTask 4.2: 添加 `.result-card-symbol` 移动端字号 36px
  - [x] SubTask 4.3: 添加 `.result-card-numeral` 移动端字号 16px

- [x] Task 5: 验证 — 在浏览器中检查桌面端和移动端效果
  - [x] SubTask 5.1: 确认 22 张大阿卡纳的 emoji 在新样式下均可辨识
  - [x] SubTask 5.2: 确认 spread（三张牌阵）模式下 cardIcon 隐藏/显示逻辑正常
  - [x] SubTask 5.3: 确认 resetReading 后重新抽牌图标正确重建
