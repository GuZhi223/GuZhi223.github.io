# React 主页迁移审查记录

## 当前目录结构

- 根目录：`index.html`、`README.md`、`favicon.svg`、`.nojekyll`、`.github/`、`projects/`、`assignments/`。
- 现有额外根文件：`心理测评系统.html`、`mimo-test.json`、`CLAUDE.md`，以及本地未跟踪的 `AGENTS.md`、`figma-style-*.png`、`index-opensource-preview.html`、`output/`。
- `.github/workflows/deploy-cloudbase.yml` 已存在，用于 CloudBase Hosting，不属于本次 GitHub Pages 工作流。
- `projects/` 下现有作品：`particles`、`trust`、`perler-bead`、`china-history-review`、`data-structure-quiz`、`love-gallery`、`nutrition`、`halloween`、`love`、`mouse-test`。
- `assignments/index.html` 是课程作业归档入口。

## 必须保留的 URL

- `/`
- `/projects/particles/`
- `/projects/trust/`
- `/projects/perler-bead/`
- `/projects/china-history-review/`
- `/projects/data-structure-quiz/`
- `/projects/love-gallery/`
- `/projects/nutrition/`
- `/projects/halloween/`
- `/projects/love/`
- `/projects/mouse-test/mouse-test.html`
- `/assignments/`

## 特殊资源和路径风险

- `projects/china-history-review/` 包含 `manifest.json` 和 `service-worker.js`，入口用相对路径注册，复制目录时必须保持原结构。
- `projects/trust/` 包含大量相对资源、音频、图片、字体和自定义加载清单；其 `README` 与页面元信息里还有旧的 `/trust/` 公开地址描述，但当前仓库真实路径是 `/projects/trust/`。
- `projects/love-gallery/` 有大量嵌套 demo、音频、图片、字体和中文文件名，复制脚本需要保留深层目录。
- `projects/particles/` 使用摄像头、Three.js 与 MediaPipe，要求 HTTPS 或 localhost；路径保持原样即可。
- 根目录 `.nojekyll` 需要进入构建产物，避免 GitHub Pages 忽略下划线文件。
- `output/`、`figma-style-*.png`、`index-opensource-preview.html` 是本地未跟踪预览/输出文件，不应进入生产构建。

## 迁移策略

1. React 只接管根目录主页，旧 `projects/` 与 `assignments/` 保持原位，不重写为 React。
2. 使用 Vite 生成 `dist/` 后，运行 `scripts/copy-static.mjs` 将旧静态目录完整复制到 `dist/projects/` 与 `dist/assignments/`。
3. 主页内容集中到 `src/data/`，组件只负责渲染，方便继续维护。
4. 线上部署使用 GitHub Pages Actions；CloudBase workflow 保留并改为上传构建后的 `dist/`。
5. GitHub Pages 使用根路径 `/` 构建；CloudBase 因部署在 `/guzhi223` 目录，workflow 会设置 `VITE_BASE_PATH=/guzhi223/`，让首页资源和旧作品入口在腾讯云子路径下也能正确加载。
6. 构建后用 `scripts/check-dist-links.mjs` 检查核心旧 URL、主页数据链接、图片、`/undefined`、开发地址和 `src/` 泄漏。

## 需要复制到构建产物的目录和文件

- `projects/`
- `assignments/`
- 根目录 `.nojekyll`
- `public/` 内的 `favicon.svg`、`og-cover.svg`、`robots.txt`、`sitemap.xml` 和主页图片资源由 Vite 自动复制。

## 不进入构建产物的内容

- `.git/`
- `node_modules/`
- `src/`
- `dist/`
- `.github/`
- `.claude/`
- `.trae/`
- `output/`
- 本地预览图和临时 HTML
