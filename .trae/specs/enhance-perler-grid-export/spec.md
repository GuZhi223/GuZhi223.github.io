# 拼豆图纸网格线与导出优化 Spec

## Why
当前拼豆图纸的网格线只有一种粗细，不便于按 5×5 区域定位；导出图片时缺少各色号的用量信息，需要额外对照页面上的统计表。

## What Changes
- 修改 `projects/perler-bead/index.html` 中的 `renderPattern()` 和 `exportPNG()` 方法
- 无 **BREAKING** 变更

## Impact
- Affected specs: add-perler-bead-pattern（增强网格渲染和导出）
- Affected code: `projects/perler-bead/index.html`

## MODIFIED Requirements

### Requirement: 网格线分层显示
系统 SHALL 在图纸 Canvas 上绘制两层网格线：
- **细线**：每个豆子之间的分隔线（现有行为，由网格线开关控制）
- **粗线**：每 5×5 格子区域用较粗较深的线条分隔，帮助定位和计数（始终显示，不受网格线开关控制）

#### Scenario: 查看带分层网格线的图纸
- **WHEN** 用户生成图纸并开启网格线
- **THEN** 每个豆子之间有细线分隔，同时每 5 行和 5 列有粗线分隔

#### Scenario: 关闭网格线后仍有 5×5 粗线
- **WHEN** 用户关闭网格线开关
- **THEN** 细线消失，但 5×5 粗线仍然保留，方便定位

### Requirement: 导出图片附带色号用量清单
系统 SHALL 在导出的 PNG 图片底部追加一个颜色用量清单区域，列出每个使用的色号对应的色块、色号和数量。

#### Scenario: 导出含用量清单的图片
- **WHEN** 用户点击"导出 PNG"按钮
- **THEN** 下载的 PNG 图片底部包含颜色用量列表，每个颜色一行，显示色块 + 色号 + 数量

## ADDED Requirements
无

## REMOVED Requirements
无
