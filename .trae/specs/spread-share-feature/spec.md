# 三牌阵分享功能 Spec

## Why
当前分享功能仅支持单张塔罗牌（`generateShareImage(tarot)`），在"过去·现在·未来"三牌阵模式下没有分享入口。用户完成三牌阵解读后，无法将完整的牌阵布局、三张牌的内容与整体解读以可视化图片方式保存或分享。

## What Changes
- 新增 `generateSpreadShareImage(drawnCards, userQuestion)` 函数，生成三牌阵专属分享图（1080×1920 Canvas）
- 在三牌阵结果界面（`showSpreadResult()`）添加"✦ 分享牌阵"按钮
- 复用现有分享预览弹窗（`showSharePreview`）和保存逻辑
- 三牌阵分享图包含：星空背景、用户问题、三张牌的缩小牌面（含符号）、位置标签、牌名、正/逆位、释义、整体总结、品牌信息

## Impact
- Affected specs: `beautify-share-image`（复用其星空背景绘制逻辑）
- Affected code: `index.html` 中的 `generateShareImage`（L3634-3891）、`showSpreadResult()`（L4087-4152）、`updateSpreadButtons()`（L3984-4033）、`showSharePreview`（L3910-3914）

## ADDED Requirements

### Requirement: 三牌阵分享图生成
系统 SHALL 提供 `generateSpreadShareImage(drawnCards, userQuestion)` 函数，生成 1080×1920 像素的三牌阵分享图片。

#### Scenario: 完整三牌阵分享
- **WHEN** 用户完成三张牌抽取并查看解读结果
- **THEN** 系统 SHALL 生成包含以下元素的分享图片：
  - 星空背景（复用现有星云/星场绘制逻辑）
  - 顶部品牌标题 "TAROT · 星门塔罗"
  - 用户问题（如有，带引号装饰）
  - 三张牌横向排列区域，每张牌包含：
    - 缩小的牌面符号（调用 `arcanaGlyphs[name]` 绘制）
    - 双层圆环装饰
    - 位置标签（"过去"、"现在"、"未来"）
    - 牌名（粗体）
    - 正/逆位标识（正位金色 ▲，逆位粉色 ▼）
    - 释义文字（自动换行）
  - 三张牌之间使用竖向装饰线分隔
  - 底部整体总结区域（综合三张牌的关键词）
  - 底部装饰线 + 品牌名 + 日期

#### Scenario: 单张牌分享兼容
- **WHEN** 用户仅抽取了一张牌
- **THEN** 系统 SHALL 仍使用现有的 `generateShareImage(tarot)` 函数，不受本次修改影响

### Requirement: 三牌阵分享按钮
系统 SHALL 在三牌阵结果界面添加分享入口按钮。

#### Scenario: 三牌阵结果展示时显示分享按钮
- **WHEN** `showSpreadResult()` 渲染三牌阵结果（`drawn.length >= 2`）
- **THEN** SHALL 在操作按钮区域（`#spreadActions` 或结果面板底部）显示"✦ 分享牌阵"按钮

#### Scenario: 点击分享按钮
- **WHEN** 用户点击"分享牌阵"按钮
- **THEN** SHALL 调用 `generateSpreadShareImage(appState.drawnCards, appState.userQuestion)` 生成图片，然后调用 `showSharePreview(canvas)` 显示预览弹窗

### Requirement: 分享图牌面渲染
系统 SHALL 在三牌阵分享图中为每张牌绘制简化版牌面符号。

#### Scenario: 牌面符号绘制
- **WHEN** 三牌阵分享图被渲染
- **THEN** 每张牌 SHALL 在一个约 200×260px 的矩形区域内绘制：
  - 深色圆角矩形底板（模拟牌面）
  - `arcanaGlyphs[name]` 绘制的牌面符号（居中，约 120px 尺寸）
  - 双层圆环装饰
  - 逆位时符号区域旋转 180°

### Requirement: 分享图整体排版
系统 SHALL 确保三牌阵分享图的排版适配移动端竖屏浏览。

#### Scenario: 竖屏适配
- **WHEN** 分享图被生成
- **THEN** 图片 SHALL 为 1080×1920 像素（9:16 竖屏比例），所有文字和元素 SHALL 在 360px 宽度下清晰可读

#### Scenario: 信息完整性
- **WHEN** 分享图被查看
- **THEN** SHALL 包含完整信息：用户问题 + 三张牌的位置/名称/正逆位/释义 + 整体视觉装饰

## MODIFIED Requirements

### Requirement: showSpreadResult 按钮逻辑
原有的 `showSpreadResult()` 函数 SHALL 被修改，在三牌阵（`drawn.length >= 2`）的结果展示中追加分享按钮的创建逻辑。

## REMOVED Requirements
无

## Constraints
- 不修改现有的 `generateShareImage(tarot)` 单牌分享函数
- 不修改 `drawCardBack()` 或 `drawTarotFace()` 卡牌渲染逻辑
- 不修改分享预览弹窗（`showSharePreview`）的 HTML/CSS 结构
- 不引入外部图片资源，所有图形通过 Canvas 2D API 程序化绘制
- 保持现有单牌分享按钮逻辑（`count === 1` 条件）不变
- 保持 `appState.drawnCards` 数据结构不变
