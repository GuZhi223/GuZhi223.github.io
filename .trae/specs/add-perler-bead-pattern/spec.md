# 拼豆图纸生成器 Spec

## Why
用户希望在项目主页中新增一个"拼豆图纸生成器"页面。参考 xiaoana.cn 和萌萌拼豆等在线工具，将上传的图片转换为拼豆色板对应的像素网格图纸，方便拼豆手工爱好者直接使用。作为一个纯静态 HTML 页面，所有处理在浏览器本地完成。

## What Changes
- 在 `projects/perler-bead/` 目录下新增一个独立的静态 HTML 页面 `index.html`
- 在主页 `index.html` 的"一些分享"区域新增对应的入口卡片
- 无 **BREAKING** 变更

## Impact
- Affected specs: 无（全新功能）
- Affected code:
  - `projects/perler-bead/index.html`（新建）
  - `index.html`（新增入口卡片）

## ADDED Requirements

### Requirement: 图片上传
系统 SHALL 提供图片上传区域，支持点击选择和拖拽上传，接受 JPG/PNG/GIF 格式。

#### Scenario: 上传图片
- **WHEN** 用户点击上传区域或拖拽图片到上传区域
- **THEN** 系统读取图片并在预览区显示原图

### Requirement: 参数设置
系统 SHALL 提供以下可调参数：
- 图纸高度（纵向珠子数量，范围 10-100，默认 32，建议 24-64）
- 保持原图比例开关（开启时宽度自动按比例计算）
- 颜色数量限制（8/12/16/20/24/32，默认 16，建议 8-20）

#### Scenario: 调节珠子数量
- **WHEN** 用户修改图纸高度
- **THEN** 宽度按原图比例自动计算（若开启保持比例）

### Requirement: 拼豆色板与颜色映射
系统 SHALL 内置一套拼豆色板数据（约 50-60 种常见色，含色号和 RGB 值），将每个像素映射到最接近的拼豆颜色。

#### Scenario: 自动颜色映射
- **WHEN** 点击"生成拼豆图纸"按钮后
- **THEN** 每个网格单元格自动填充为最接近的拼豆颜色

### Requirement: 图案网格展示
系统 SHALL 用 Canvas 渲染拼豆图纸网格，每个单元格带有颜色填充和可选的色号标注。

#### Scenario: 查看完整图案
- **WHEN** 图片完成处理
- **THEN** 用户看到一个完整的彩色网格图，格子内可显示色号数字

### Requirement: 网格线与色号显示控制
系统 SHALL 提供网格线开关和色号标注开关。

#### Scenario: 切换显示选项
- **WHEN** 用户关闭网格线或色号标注
- **THEN** 图纸实时更新，移除对应显示元素

### Requirement: 颜色统计
系统 SHALL 统计图案中各颜色的使用数量，以列表形式展示色块、色号和颗数。

#### Scenario: 查看颜色用量
- **WHEN** 图案生成后
- **THEN** 页面底部展示每种颜色对应的色块、色号和珠子数量

### Requirement: 图案导出
系统 SHALL 允许用户将生成的拼豆图案导出为 PNG 图片。

#### Scenario: 导出图案
- **WHEN** 用户点击"导出图案"按钮
- **THEN** 系统将当前网格图案下载为 PNG 文件

### Requirement: 主入口卡片
主页 SHALL 在"一些分享"区域新增一张卡片，链接到拼豆图纸生成器页面。

#### Scenario: 从主页导航
- **WHEN** 用户在主页点击拼豆图纸卡片
- **THEN** 跳转到 `projects/perler-bead/index.html`

## MODIFIED Requirements
无

## REMOVED Requirements
无
