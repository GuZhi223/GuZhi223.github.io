# Checklist

## 引流内容清理

- [x] 所有 demo HTML 中不存在迅雷网盘链接 (`pan.xunlei.com`)
- [x] 所有 demo HTML 中不存在 UC 网盘链接 (`drive.uc.cn`)
- [x] 所有 demo HTML 中不存在 QQ 群引流链接 (`jq.qq.com`)
- [x] 所有 demo HTML 中不存在 360ab.cn 微信跳转脚本 (`mp-jump.js`)
- [x] 所有 demo HTML 中不存在 360ab.cn CSS 引用 (`common.css`)
- [x] 所有 demo HTML 中不存在 360ab.cn 域名文字推广
- [x] 所有 demo HTML 中不存在百度统计追踪代码 (`_hmt`)

## 目录结构规范

- [x] `demos/` 下所有子目录均为 `kebab-case` 英文命名
- [x] `demos/` 下无中文、空格、特殊字符（`》` 等）目录名
- [x] 无深层嵌套（最多 1 层：`目录/文件`），GitHub 解压遗留 `-main` 层已扁平化
- [x] 无同名子目录嵌套
- [x] 每个 demo 目录的 HTML 入口文件为 `index.html`（如有多文件，主文件为 `index.html`）

## 导航页风格统一

- [x] `projects/love-gallery/index.html` 使用深色背景 (`#080b16`)
- [x] 页面包含浮动渐变光球 (orb) 背景动画
- [x] 卡片使用毛玻璃效果 (glass effect)
- [x] 使用 Font Awesome 图标
- [x] CSS 变量系统与根目录一致 (`--glass`, `--blur`, `--radius` 等)
- [x] 搜索栏功能正常且样式适配深色主题
- [x] 返回主页按钮、计数器、footer 均保持功能
- [x] 所有 demo 卡片链接指向新目录路径
- [x] 每个卡片有简洁的中文描述文本
- [x] 页面视觉风格与根目录 `index.html` 整体一致
