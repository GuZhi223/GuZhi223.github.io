# 卡面系统性重绘 Spec

## Why
当前卡池中 22 张大阿尔卡纳牌的卡面（正面）视觉质量远低于卡背设计水准。卡背采用紫金双色主题、多层装饰几何与辉光效果，而卡面仅使用单一棕色 `rgba(132,82,22,...)` 绘制无渐变、无阴影的简单几何图形，导致翻牌后视觉落差明显，整体美术品质不一致。

## What Changes
- 将卡面色彩体系从单色棕色升级为与卡背一致的紫金双色调体系
- 为所有 22 个 `arcanaGlyphs` 图形函数添加渐变填充、辉光效果和多层视觉深度
- 增强 `drawTarotFace()` 卡面模板的边框、分隔线、文字排版与装饰细节
- 为每张牌引入主题性辅助色（accent color），提升辨识度与视觉吸引力
- 添加 Glyph 区域背景纹理（同心光环/曼陀罗），使中心区域更有层次感

## Impact
- Affected specs: 无前置 spec 依赖
- Affected code: `index.html` 中的 `arcanaGlyphs`（L1462-2008）、`defaultGlyph`（L2010-2028）、`drawTarotFace()`（L2232-2313）、`makeRoundedCardTexture()`（L2055-2086）

## ADDED Requirements

### Requirement: 统一紫金色彩体系
系统 SHALL 将卡面绘制色从单色棕色迁移到紫金双色调体系，与卡背（`drawCardBack`）视觉风格统一。

#### Scenario: 色彩一致性
- **WHEN** 任意一张大阿尔卡纳牌正面被渲染
- **THEN** 卡面 SHALL 使用金色 `rgba(241,214,138,...)` 与紫色 `rgba(183,140,255,...)` 作为主色调，取代当前的纯棕色

#### Scenario: 保留可读性
- **WHEN** 卡面文字（名称、释义、罗马数字）被渲染
- **THEN** 文字 SHALL 保持足够的对比度以确保在浅色背景上清晰可读

### Requirement: 每张牌的主题辅助色
系统 SHALL 为每张大阿尔卡纳牌分配一个独特的主题辅助色（accent color），用于该牌图形的高光、辉光或装饰元素。

#### Scenario: 22 张牌各有特色
- **WHEN** 22 张牌的图形被绘制
- **THEN** 每张牌 SHALL 拥有至少一个独特的辅助色，与其他牌可区分

### Requirement: 图形渐变与辉光效果
系统 SHALL 为 `arcanaGlyphs` 中的图形添加 Canvas 渐变填充（`createLinearGradient` / `createRadialGradient`）和辉光效果（`shadowBlur` / `shadowColor`）。

#### Scenario: 视觉深度
- **WHEN** 任意图形被绘制
- **THEN** 图形 SHALL 至少包含一个渐变填充或辉光效果，呈现视觉层次感

### Requirement: Glyph 区域背景装饰
系统 SHALL 在 `drawTarotFace()` 的 Glyph 圆形区域内添加背景装饰纹理，取代当前的纯辐射线。

#### Scenario: 中心区域层次
- **WHEN** 卡面中心 Glyph 区域被渲染
- **THEN** SHALL 包含至少 2 层装饰元素（如光环环、微型曼陀罗点阵、渐变光晕等）

### Requirement: 卡面模板视觉增强
系统 SHALL 增强 `drawTarotFace()` 的整体模板设计，包括边框、分隔线和文字排版。

#### Scenario: 边框升级
- **WHEN** 卡面边框被绘制
- **THEN** SHALL 使用渐变色边框（紫金过渡）取代当前的纯色棕色边框

#### Scenario: 分隔线升级
- **WHEN** 名称下方和释义上方的分隔线被绘制
- **THEN** SHALL 使用带装饰端点的渐变线取代当前的纯色细线

#### Scenario: 底部装饰升级
- **WHEN** 卡面底部星星符号被绘制
- **THEN** SHALL 增强为带有辉光效果的装饰性图案

## MODIFIED Requirements

### Requirement: drawTarotFace 模板重绘
原有的 `drawTarotFace()` 函数 SHALL 被重写以实现上述所有视觉增强。函数签名保持不变 `(ctx, tarot, cardIndex, isReversed)`，不改变调用方式。

### Requirement: arcanaGlyphs 图形重绘
`arcanaGlyphs` 对象中的所有 22 个图形函数 SHALL 被重写，保持相同的函数签名 `(ctx, cx, cy, s)`，不改变外部调用方式。

### Requirement: defaultGlyph 降级图形更新
`defaultGlyph` SHALL 被更新以匹配新的紫金色彩体系，确保未知牌型的降级显示也具有高品质视觉效果。

## REMOVED Requirements
无

## Constraints
- 不修改 `makeRoundedCardTexture()` 的基础流程（渐变背景 + 类型分发）
- 不修改 `drawCardBack()` 卡背设计
- 不修改 `arcanaGlyphs` / `defaultGlyph` 的函数签名
- 不引入外部图片资源，所有图形必须通过 Canvas 2D API 程序化绘制
- 保持逆位（isReversed）旋转逻辑不变
- 保持卡面文字内容（名称、释义）不变
