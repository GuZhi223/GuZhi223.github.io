# 爱心展示合集风格统一 + 目录重整 + 引流清理

## Why

`projects/love-gallery/` 的导航页采用浅粉色主题，与根目录 `index.html` 的深色毛玻璃（glassmorphism）风格完全割裂，视觉体验不统一。`demos/` 下 48 个目录命名风格混乱（中英混杂、空格不一、特殊字符、深层嵌套），维护困难。部分从互联网收集的爱心 HTML 中仍残留迅雷/UC 网盘链接、QQ 群引流、360ab.cn 微信跳转脚本、百度统计追踪等推广内容，需要清理。

## What Changes

- **风格统一**：将 `projects/love-gallery/index.html` 重写为与根目录 `index.html` 一致的深色毛玻璃风格，保留搜索和导航功能
- **目录重整**：将 `demos/` 下 48 个目录统一重命名为简洁的 `kebab-case` 英文标识（如 `heartbeat-love`、`particle-double-heart`），同时消除深层嵌套（GitHub 解压遗留的 `-main` 层和同名子目录层）；同步更新 `index.html` 中的所有链接路径
- **引流清理**：从所有 demo HTML 文件中移除以下推广内容：
  - 迅雷网盘链接 (`pan.xunlei.com`) — 13 个文件
  - UC 网盘链接 (`drive.uc.cn`) — 13 个文件
  - QQ 群引流链接 (`jq.qq.com`) — 1 个文件
  - 360ab.cn 微信跳转脚本 (`mp-jump.js`) — 9 个文件
  - 360ab.cn CSS 引用 (`common.css`) — 9 个文件
  - 360ab.cn 域名文字推广 — 1 个文件
  - 百度统计追踪代码 (`_hmt`) — 9 个文件

## Impact

- Affected specs: 无已有 spec 受影响
- Affected code:
  - `projects/love-gallery/index.html` — 完全重写样式
  - `projects/love-gallery/demos/` — 全部 48 个子目录重命名 + 嵌套扁平化
  - 45+ 个 demo HTML 文件 — 移除引流内容

## ADDED Requirements

### Requirement: 统一导航页视觉风格

`projects/love-gallery/index.html` SHALL 采用与根目录 `index.html` 一致的深色毛玻璃设计语言，包括：
- 深色背景 (`#080b16`)
- 浮动渐变光球 (orb) 背景动画
- 玻璃态卡片 (glass effect) 展示各 demo
- Font Awesome 图标
- CSS 变量系统 (`--glass`, `--blur`, `--radius` 等)
- 搜索栏保持功能不变，样式适配深色主题
- 返回主页按钮、页数统计、footer 等保持功能

#### Scenario: 用户从主页进入爱心合集页
- **WHEN** 用户点击根目录页面中"爱心展示合集"卡片
- **THEN** 打开的页面呈现深色毛玻璃风格，与主页视觉语言一致

#### Scenario: 用户搜索 demo
- **WHEN** 用户在搜索框输入关键词
- **THEN** 网格即时过滤，计数器更新，搜索功能与重写前一致

### Requirement: 目录命名规范化

`demos/` 下所有子目录 SHALL 使用简洁的 `kebab-case` 英文命名，规则如下：
- 全小写，单词间用 `-` 连接
- 不含中文、空格、特殊字符（如 `》`）
- 每个目录下的 HTML 入口文件统一为 `index.html`（如有多个 HTML，保留主文件为 `index.html`，其余保持原名）
- 消除不必要的嵌套层级：
  - GitHub 解压遗留的 `-main` 层级 → 扁平化，将内容提升到父目录
  - 与父目录同名的子目录 → 扁平化
  - 嵌套超过 1 层的 → 提升到 1 层

#### Scenario: 文件系统浏览
- **WHEN** 开发者浏览 `demos/` 目录
- **THEN** 所有子目录均为 `kebab-case` 英文，最多嵌套 1 层（目录/文件），结构清晰

### Requirement: 引流内容清理

所有 demo HTML 文件 SHALL NOT 包含以下推广/引流内容：
- 网盘下载链接（迅雷、UC 等）
- QQ 群/微信群引流链接
- 第三方微信跳转脚本（如 `360ab.cn/mp-jump.js`）
- 第三方平台 CSS 依赖（如 `360ab.cn/common.css`）
- 百度统计等流量追踪代码
- 嵌入在文字内容中的第三方域名推广

#### Scenario: 清理后的页面
- **WHEN** 用户打开任意 demo 页面
- **THEN** 页面中不存在任何网盘链接、QQ 群入口、微信跳转脚本、流量统计代码或第三方域名推广

## REMOVED Requirements

### Requirement: 旧的浅粉色导航页
**Reason**: 视觉风格与主页不统一，需替换为深色毛玻璃风格
**Migration**: 全新重写，功能（搜索、导航）保持一致

### Requirement: 原始混乱目录结构
**Reason**: 命名不规范、嵌套过深，维护困难
**Migration**: 全部重命名为 kebab-case 英文并扁平化，同步更新导航页链接
