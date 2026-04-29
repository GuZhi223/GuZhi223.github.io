# 卡牌图标视觉协调性优化 Spec

## Why
当前 `result-card-icon` 存在多项与整体设计系统不协调的问题：圆形图标与全局"方形+倒角"的几何语言冲突；emoji 符号视觉密度不均（♀ 极细 vs ☀ 极粗）；罗马数字与符号的层级关系不清晰；脉冲动画的紫色光晕与面板金色基调不一致。需要通过定向调整使其融入整体设计语言，而非全部重绘。

## What Changes
- 将图标容器从圆形改为方形倒角（与 `result-note` 的 16px 圆角统一），保持神秘学方形-旋转45°的 sigil 设计语言
- 重写图标内部排版：将罗马数字提升为**主标题**（大号、金色），符号降为**装饰性背景层**（半透明、放大），形成明确的视觉层级
- 优化脉冲动画，将紫色光晕统一为金色系呼吸光效，与 `--gold` 色彩系统一致
- 为图标添加角标装饰线（与 `.intro-card::before` 的内边框装饰手法一致），增强仪式感
- 优化 22 个 emoji 在 22px–36px 尺寸下的视觉密度差异，通过 CSS `filter: brightness()` 微调轻量符号的可见度

## Impact
- Affected specs: 无（本次为独立 UI 微调）
- Affected code: `index.html` — CSS（`.result-card-icon`、`.result-card-numeral`、新增 `.result-card-icon-inner`、`.result-card-icon::before/::after`）、JS（`drawSelectedCard()` 中 cardIcon 的 innerHTML 模板）

## ADDED Requirements

### Requirement: 图标容器几何语言统一
系统 SHALL 将 `.result-card-icon` 从 `border-radius: 50%`（圆形）改为 `border-radius: 16px`（方形倒角），与 `.result-note` 保持一致的圆角节奏。

#### Scenario: 桌面端图标容器
- **WHEN** 用户在桌面端（≥900px）查看抽牌结果
- **THEN** 图标容器显示为 88×88px、`border-radius: 16px` 的方形倒角容器，带有内边框装饰（`.intro-card::before` 手法）和金色呼吸光效

#### Scenario: 移动端图标容器
- **WHEN** 用户在移动端（<900px）查看抽牌结果
- **THEN** 图标容器尺寸缩小为 72×72px，圆角保持 14px，内边框间距按比例缩小

### Requirement: 图标内部视觉层级重构
系统 SHALL 将图标内部分为两层：
- **前景层**：罗马数字作为主信息，字号 18px、`font-weight: 800`、金色（`--gold`），居中显示
- **背景层**：arcanaSymbols 的 emoji 符号，字号 44px（桌面）/36px（移动端），`opacity: 0.12` 作为装饰性底纹

#### Scenario: 图标内容结构
- **WHEN** `drawSelectedCard()` 生成 cardIcon 的 innerHTML
- **THEN** HTML 结构为 `<span class="result-card-numeral">III</span><span class="result-card-symbol">♀</span>`，numeral 为前景，symbol 为背景

### Requirement: 脚动脉冲动画色彩统一
系统 SHALL 将 `cardIconPulse` 动画的光晕色从紫色+金色混合改为纯金色系，与设计系统 `--gold` 一致。

#### Scenario: 动画光效
- **WHEN** 图标在结果面板中展示
- **THEN** 脉冲动画在金色范围 `rgba(241,214,138,.08)` → `rgba(241,214,138,.30)` 之间交替，不引入其他色相

### Requirement: 角标装饰线
系统 SHALL 为图标容器添加四个角的 L 形装饰线（与 `.intro-card::before` 的边框装饰手法呼应），使用 `::before` 或额外的 CSS 实现。

#### Scenario: 装饰线显示
- **WHEN** 图标容器渲染
- **THEN** 容器四个角各显示一条 12px 长的金色细线（`border-color: rgba(241,214,138,.4)`），形成角框装饰效果

## MODIFIED Requirements

### Requirement: drawSelectedCard() 图标模板更新
`drawSelectedCard()` 中设置 cardIcon.innerHTML 的逻辑 SHALL 更新为双层结构模板，前景为 numeral，背景为 symbol。

#### Scenario: 模板渲染
- **WHEN** 用户抽牌触发 `drawSelectedCard()`
- **THEN** cardIcon 内部包含两个 span（numeral + symbol），numeral 显示罗马数字，symbol 显示对应大阿卡纳的 emoji

### Requirement: resetReading() 图标重置
`resetReading()` SHALL 清除 cardIcon 的 innerHTML 内容，确保下一次抽牌时图标重新生成。

#### Scenario: 重置后重新抽牌
- **WHEN** 用户点击"新牌阵"触发 `resetReading()`
- **THEN** `resultCardIcon.innerHTML` 被清空，下次抽牌后重新渲染正确的 numeral + symbol

## REMoved Requirements
无
