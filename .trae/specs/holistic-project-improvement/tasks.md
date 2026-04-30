# Tasks

- [x] Task 1: 修复 love-gallery 缺失的 DOCTYPE
  - [x] SubTask 1.1: 在 `projects/love-gallery/index.html` 第一行添加 `<!DOCTYPE html>`

- [x] Task 2: 替换全站 Font Awesome CDN 为国内镜像
  - [x] SubTask 2.1: 将 `assignments/index.html` 中的 `cdnjs.cloudflare.com` 替换为 `cdn.bootcdn.net`
  - [x] SubTask 2.2: 将 `projects/love-gallery/index.html` 中的 `cdnjs.cloudflare.com` 替换为 `cdn.bootcdn.net`
  - [x] SubTask 2.3: 将 `projects/nutrition/index.html` 中的 `cdnjs.cloudflare.com` 替换为 `cdn.bootcdn.net`

- [x] Task 3: 替换 halloween 页面的 Google Fonts 为国内可达源
  - [x] SubTask 3.1: 实际检查发现 halloween 页面未引用 Google Fonts（使用 `Microsoft YaHei` 系统字体），无需修改

- [x] Task 4: 为全站添加 favicon
  - [x] SubTask 4.1: 为 `index.html`（主页）添加 favicon link
  - [x] SubTask 4.2: 为 `assignments/index.html` 添加 favicon link
  - [x] SubTask 4.3: 为 `projects/love-gallery/index.html` 添加 favicon link
  - [x] SubTask 4.4: 为 `projects/nutrition/index.html` 添加 favicon link
  - [x] SubTask 4.5: 为 `projects/particles/index.html` 添加 favicon link
  - [x] SubTask 4.6: 为 `projects/halloween/index.html` 添加 favicon link
  - [x] SubTask 4.7: 为 `projects/love/index.html` 添加 favicon link

- [x] Task 5: 完善 .gitignore
  - [x] SubTask 5.1: 向 `.gitignore` 添加 macOS、Windows、Linux 常见忽略项（.DS_Store、Thumbs.db、Desktop.ini 等）
  - [x] SubTask 5.2: 向 `.gitignore` 添加 IDE 常见忽略项（.vscode/、.idea/ 等）

- [x] Task 6: 修复 assignments 中的硬编码绝对 URL
  - [x] SubTask 6.1: 将 `assignments/index.html` 中 `https://guzhi223.github.io/index.html` 替换为 `../index.html`

# Task Dependencies
- 无相互依赖，所有 Task 可并行执行
