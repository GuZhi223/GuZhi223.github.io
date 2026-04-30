# Holistic Project Improvement Spec

## Why
整个站点从主页到子页面存在一系列跨页面的共性问题：CDN 在国内不可靠、关键页面缺少 `<!DOCTYPE html>`、favicon 全站缺失、`.gitignore` 不完善、以及个别页面有扩展注入/混淆代码残留。逐一修复能显著提升站点的可靠性和专业度。

## What Changes
- 修复 `love-gallery/index.html` 缺失的 `<!DOCTYPE html>`
- 将全站 `cdnjs.cloudflare.com` 的 Font Awesome 替换为 `cdn.bootcdn.net`
- 将 halloween 页面的 Google Fonts 替换为国内可用的字体源
- 为所有缺少 favicon 的页面添加统一 favicon 引用
- 完善 `.gitignore`，加入常见的 OS/IDE 忽略项
- 清理 `assignments/index.html` 中的硬编码绝对 URL
- 移除 halloween 页面的 jsjiami.com 混淆代码，恢复可读源码（若无法恢复则保留现状并记录）

## Impact
- Affected specs: 全站 HTML 文件、`.gitignore`
- Affected code: `projects/love-gallery/index.html`、`projects/halloween/index.html`、`projects/particles/index.html`、`projects/nutrition/index.html`、`assignments/index.html`、`.gitignore`

## MODIFIED Requirements

### Requirement: HTML 文档类型
系统 SHALL 为所有 HTML 文件包含 `<!DOCTYPE html>` 声明。

#### Scenario: love-gallery 缺失 DOCTYPE
- **WHEN** 用户访问 `projects/love-gallery/index.html`
- **THEN** 浏览器以标准模式渲染（已有 DOCTYPE）

### Requirement: Font Awesome CDN 可用性
系统 SHALL 使用国内可达的 CDN 源提供 Font Awesome 图标库。

#### Scenario: 替换 cdnjs 为 bootcdn
- **WHEN** 页面包含 Font Awesome CDN 链接
- **THEN** CDN 地址为 `https://cdn.bootcdn.net/ajax/libs/font-awesome/6.4.0/css/all.min.css`
- **AND** 不再引用 `cdnjs.cloudflare.com`

### Requirement: Google Fonts 国内可达
系统 SHALL 为 Google Fonts 提供国内可用的替代方案。

#### Scenario: halloween 页面字体
- **WHEN** 用户访问 `projects/halloween/index.html`
- **THEN** Noto Sans SC 字体通过国内可达的方式加载（fonts.loli.net 或 fontsource 自托管）
- **AND** 保持 fallback 字体链不变

### Requirement: 全站 Favicon
系统 SHALL 为所有页面提供 favicon 引用。

#### Scenario: 添加 favicon link
- **WHEN** 任何页面的 `<head>` 中没有 `<link rel="icon">`
- **THEN** 添加 `<link rel="icon" href="/favicon.ico" type="image/x-icon">` 或合适的引用路径

### Requirement: .gitignore 完善
系统 SHALL 在 `.gitignore` 中包含常见 OS 和 IDE 生成文件的忽略规则。

#### Scenario: 添加标准忽略项
- **WHEN** 开发者在 macOS/Windows/Linux 或 VS Code/IDEA 环境中工作
- **THEN** `.DS_Store`、`Thumbs.db`、`.idea/`、`.vscode/` 等文件不会被提交

### Requirement: 内部链接使用相对路径
系统 SHALL 对站内页面引用使用相对路径，不使用硬编码绝对 URL。

#### Scenario: assignments 中的自引用
- **WHEN** `assignments/index.html` 中有链接指向 `https://guzhi223.github.io/index.html`
- **THEN** 替换为 `../index.html` 相对路径

## REMOVED Requirements

### Requirement: jsjiami.com 混淆代码
**Reason**: halloween 页面的 JS 代码经过 jsjiami.com v7 混淆，完全不可读，不利于维护和审计。若能获取到未混淆的原始源码则替换；若无法获取则保留现状，仅记录此问题。
**Migration**: 检查是否有原始未混淆的源码备份，如有则替换。如无，保持现状并在后续迭代中逐步重写。
