# Tasks

- [x] Task 1: 修改 renderPattern() 实现 5×5 粗网格线
  - [x] SubTask 1.1: 在 renderPattern() 中，保持现有细线逻辑不变（由 showGrid 控制），新增 5×5 粗网格线绘制——当 x % 5 === 0 或 y % 5 === 0 时，用更粗的线宽（约 1.5px）和更深的颜色（rgba(0,0,0,0.35)）绘制
  - [x] SubTask 1.2: 确认 5×5 粗线不受 showGrid 开关控制，始终显示

- [x] Task 2: 修改 exportPNG() 在底部追加颜色用量清单
  - [x] SubTask 2.1: 在 exportPNG() 中，将 Canvas 总高度扩展，在图纸区域下方预留空白区域用于绘制颜色用量表
  - [x] SubTask 2.2: 在底部绘制颜色用量清单——遍历 usedColors，每行绘制色块、色号、颜色名称和数量
  - [x] SubTask 2.3: 确保导出图片包含完整信息：标题 + 图纸（含 5×5 粗线）+ 颜色用量清单

# Task Dependencies
- Task 1 和 Task 2 相互独立，可并行实现
