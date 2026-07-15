# 钢的数字试验田 | GuZhi223.github.io

个人主页和静态作品归档站。

站点地址：[https://guzhi223.github.io](https://guzhi223.github.io)

这里记录我在计科大一阶段做出来、能打开、能交互、也能继续迭代的小项目。新主页使用 React 管理内容，旧作品仍然保留为独立静态页面。

## 技术栈

- React + Vite + TypeScript
- 原生 CSS、CSS Variables、浅色/深色主题
- lucide-react 图标
- GitHub Pages Actions 部署
- CloudBase Hosting 同步部署
- 旧作品继续使用原生 HTML / CSS / JavaScript、Three.js、MediaPipe、PIXI.js 等

## 本地开发

```bash
npm ci
npm run dev
```

## 构建和检查

```bash
npm run typecheck
npm run lint
npm run build
npm run check:dist
```

`npm run build` 会先执行 TypeScript 检查，再由 Vite 构建 React 主页，最后运行 `scripts/copy-static.mjs`，把旧的 `projects/` 和 `assignments/` 完整复制到 `dist/`。

## 部署

`.github/workflows/deploy-pages.yml` 使用 GitHub 官方 Pages Actions：

1. checkout
2. 安装 `.nvmrc` 指定的 Node LTS
3. `npm ci`
4. `npm run build`
5. `npm run check:dist`
6. 上传并部署 `dist`

如果仓库 Pages 设置仍是 “Deploy from branch”，需要在 GitHub 仓库设置中手动切换为 “GitHub Actions”。

`.github/workflows/deploy-cloudbase.yml` 会在 GitHub Actions 中重新构建站点，并把 `dist/` 上传到腾讯云 CloudBase Hosting 的 `/guzhi223` 目录。这个 workflow 需要仓库 Secrets 中存在 `TENCENTCLOUD_SECRET_ID` 和 `TENCENTCLOUD_SECRET_KEY`。

## 目录结构

```text
.
├── index.html
├── package.json
├── vite.config.ts
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── components/
│   ├── data/
│   ├── styles/
│   └── types/
├── public/
│   ├── favicon.svg
│   ├── og-cover.svg
│   ├── robots.txt
│   ├── sitemap.xml
│   └── images/
├── scripts/
│   ├── copy-static.mjs
│   └── check-dist-links.mjs
├── projects/
├── assignments/
└── docs/
```

## 在线作品

| 路径 | 类型 | 说明 |
|------|------|------|
| [projects/particles/](projects/particles/) | 原创互动实验 | 星门塔罗 / 3D 手势抽牌，Three.js + MediaPipe Hands |
| [projects/douluo-wheel/](projects/douluo-wheel/) | 原创互动实验 | 斗罗大陆主题自动转盘游戏（v4 原版） |
| [projects/douluo-wheel/v5/](projects/douluo-wheel/v5/) | 原创互动实验 | 斗罗大陆主题结构化转盘成长游戏（Vue 3 / TypeScript / Vite） |
| [projects/perler-bead/](projects/perler-bead/) | 原创工具 | 上传图片生成拼豆像素网格，支持导出 |
| [projects/nutrition/](projects/nutrition/) | 原创工具 | 根据基础信息估算每日营养素目标 |
| [projects/trust/](projects/trust/) | 汉化 / 本地化 | 《信任的进化》中文网页复活版 |
| [projects/china-history-review/](projects/china-history-review/) | 课程工具 | 中国近代史答题式复习 PWA |
| [projects/data-structure-quiz/](projects/data-structure-quiz/) | 课程工具 | 数据结构六套模拟卷交互答题页 |
| [projects/love-gallery/](projects/love-gallery/) | 整理 | 爱心展示合集导航页 |
| [projects/halloween/](projects/halloween/) | 原创互动实验 | 万圣节弹窗彩蛋 |
| [projects/love/](projects/love/) | 原创互动实验 | 节日礼物页 |
| [projects/mouse-test/mouse-test.html](projects/mouse-test/mouse-test.html) | 原创工具 | 鼠标轨迹和速度测试 |
| [assignments/](assignments/) | 课程归档 | 作业与思路归档 |

## 开源项目

主页中精选展示：

- [JumpMaster](https://github.com/GuZhi223/JumpMaster)：Android、Kotlin、Jetpack Compose、图像识别。
- [chaoxing-GUI-Helper](https://github.com/GuZhi223/chaoxing-GUI-Helper)：Python、Flet、MVVM、EventBus。
- [星门塔罗 / 3D 手势塔罗](projects/particles/)：Three.js、MediaPipe、摄像头交互。

更多仓库在 `src/data/projects.ts` 中维护。

## 如何新增主页项目

1. 在 `src/data/projects.ts` 或 `src/data/works.ts` 添加数据。
2. 如果有图片，放到 `public/images/projects/`。
3. 本地运行 `npm run typecheck` 和 `npm run build`。

## 如何新增独立静态作品

1. 在 `projects/新目录/` 中放置完整静态文件，入口建议是 `index.html`。
2. 所有资源尽量使用相对路径，方便复制到 `dist/projects/新目录/` 后继续运行。
3. 在 `src/data/works.ts` 添加入口数据。
4. 运行 `npm run build && npm run check:dist`。

## 关于 AI / Vibe Coding

仓库里有不少内容是 AI 辅助完成的。AI 会帮我拆需求、读仓库、改页面、查问题、补适配，但项目要解决什么、哪里需要调试、哪些表达适合公开，仍然由我自己判断。

这些页面不假装完美，它们更像学习过程的记录：从一个想法开始，先做成能打开的东西，再继续修结构、修体验、修文档。

## 联系

- GitHub：[@GuZhi223](https://github.com/GuZhi223)
- Email：`lbwwdg@vip.qq.com`

GO WORK.
