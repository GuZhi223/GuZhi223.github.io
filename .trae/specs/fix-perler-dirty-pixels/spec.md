# 修复拼豆图纸脏像素 Spec

## Why
实测中纯色区域经常出现零星"脏像素"——与周围颜色不一致的孤立色块。原因有两个：①浏览器 drawImage 缩放默认使用双线性插值，导致纯色边界产生过渡色；②颜色映射后没有清理孤立噪声像素。

## What Changes
- 修改 `projects/perler-bead/index.html` 中的 `pixelate()` 方法，禁用图像平滑
- 新增 `cleanNoise()` 后处理方法，消除孤立脏像素
- 无 **BREAKING** 变更

## Impact
- Affected specs: add-perler-bead-pattern（质量优化）
- Affected code: `projects/perler-bead/index.html`（pixelate 和 mapColors 方法）

## MODIFIED Requirements

### Requirement: 像素化时禁用图像平滑
系统 SHALL 在缩放图片时将 Canvas 的 `imageSmoothingEnabled` 设为 `false`，避免浏览器双线性插值产生的颜色混合。

#### Scenario: 缩放时颜色不混合
- **WHEN** 图片被缩小到网格尺寸
- **THEN** 每个区域精确取平均色，不与相邻区域产生过渡混合色

### Requirement: 消除孤立脏像素
系统 SHALL 在颜色映射后执行邻域投票清洗：对于每个格子，如果其周围 8 个邻居中没有一个与它颜色相同，则将其替换为邻居中出现次数最多的颜色。该清洗应执行 2 轮以确保效果。

#### Scenario: 纯色区域无杂色
- **WHEN** 图片中有大面积纯色区域
- **THEN** 生成的图纸该区域全部为同一拼豆色号，不出现零星杂色

## ADDED Requirements
无

## REMOVED Requirements
无
