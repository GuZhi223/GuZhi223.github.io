# iOS 毛玻璃风格重设计 Spec

## Why
当前 index.html 采用传统的白底卡片 + 阴影设计，视觉风格偏保守。用户希望将其改造为 iOS 毛玻璃（Glassmorphism）风格，保留全部现有栏目内容，同时可以大胆调整交互形式和页面层级结构，打造更有视觉冲击力的个人主页。

## What Changes
- **整体视觉重做**：将页面从白色卡片风格切换为深色/渐变背景 + 半透明毛玻璃卡片的 iOS 风格
- **动态背景**：使用 CSS 渐变动画的流动光球（mesh gradient blobs）作为页面底层，营造活的氛围感
- **导航栏重设计**：顶部导航改为固定浮动的毛玻璃胶囊条（glass pill），滚动时自动显示背景模糊
- **Hero 区域重新布局**：保持自我介绍核心内容，采用更沉浸的大字排版，右侧状态卡片改为竖向堆叠的玻璃小卡片
- **"关于站点" 三卡片**：改为横向滚动的玻璃卡片组，带悬浮发光效果
- **"一些分享" 与 "开源库"**：保留原有网格布局但改为全宽玻璃卡片，hover 时发光边框 + 微上浮，标签改为玻璃药丸
- **传送门**：合并为一个大的玻璃面板，联系信息内嵌
- **Footer**：简化为毛玻璃底栏
- **滚动动画**：使用 Intersection Observer 实现元素入场的淡入上滑动画
- **邮件复制功能**：完整保留现有 JS 逻辑不变

## Impact
- Affected specs: 无（单文件改造）
- Affected code: `d:\Code\GuZhi223.github.io\index.html`（CSS 全部重写 + HTML 结构微调，JS 保留）

## ADDED Requirements

### Requirement: Glassmorphism 视觉体系
系统 SHALL 为所有卡片、面板、导航栏应用毛玻璃效果，包括 `backdrop-filter: blur()` + 半透明 `rgba` 背景 + 细微白色边框。

#### Scenario: 卡片视觉呈现
- **WHEN** 页面加载完成
- **THEN** 所有卡片面板呈现半透明磨砂玻璃质感，背景渐变色彩透过卡片隐约可见

### Requirement: 动态流光背景
系统 SHALL 在 body 底层放置多个大尺寸圆形渐变色块，通过 CSS @keyframes 持续缓慢移动，形成流动的 mesh gradient 效果。

#### Scenario: 背景动画运行
- **WHEN** 用户打开页面
- **THEN** 能看到 3-4 个蓝紫粉色的柔和光球在背景中缓慢漂移

### Requirement: 固定浮动导航
系统 SHALL 将导航栏改为固定在视口顶部的居中胶囊形状毛玻璃条。

#### Scenario: 导航可见性
- **WHEN** 用户滚动页面
- **THEN** 导航条始终悬浮在顶部，带半透明背景模糊效果

### Requirement: 滚动入场动画
系统 SHALL 为各 section 内容元素添加基于 Intersection Observer 的入场动画（淡入 + 上移）。

#### Scenario: 首次进入视口
- **WHEN** 某个 section 滚动进入视口
- **THEN** 其子元素以 0.6s ease-out 从下方 30px 位置淡入到目标位置

## MODIFIED Requirements

### Requirement: 保留全部现有文本内容
所有现有栏目的标题、描述文字、标签文字、链接地址、邮箱地址均 SHALL 保持不变。

### Requirement: 保留邮件复制交互
`data-copy` 按钮的 clipboard 复制逻辑 SHALL 完整保留，不作任何修改。

## REMOVED Requirements

### Requirement: 传统白色卡片阴影风格
**Reason**: 被毛玻璃风格替代
**Migration**: 无需迁移，直接替换为 glassmorphism 样式
