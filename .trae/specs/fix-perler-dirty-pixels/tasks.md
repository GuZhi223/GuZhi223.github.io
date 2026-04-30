# Tasks

- [x] Task 1: 禁用像素化时的图像平滑
  - [x] SubTask 1.1: 在 `pixelate()` 方法中，`drawImage` 之前设置 `tmpCtx.imageSmoothingEnabled = false`，使浏览器使用最近邻插值缩放图片

- [x] Task 2: 新增邻域投票清洗后处理
  - [x] SubTask 2.1: 在 `mapColors()` 返回前，新增 `cleanNoise(result)` 调用
  - [x] SubTask 2.2: 实现 `cleanNoise(patternData)` 方法——遍历每个格子，统计其 8 邻域中每种色号的出现次数，若当前格子的色号在邻居中出现次数为 0（完全孤立），则替换为邻居中出现次数最多的色号；执行 2 轮以确保效果

# Task Dependencies
- Task 1 和 Task 2 相互独立，可并行实现
