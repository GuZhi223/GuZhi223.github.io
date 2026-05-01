# Tasks

- [x] Task 1: 初始化速度光线系统 — 创建 `speedLines` 模块（geometry + material + mesh），128条预分配短线段，AdditiveBlending 淡金色材质，初始 invisible，添加到 scene
  - [x] SubTask 1.1: 创建 `speedLinesGeo`（BufferGeometry，position 属性 128×2×3）
  - [x] SubTask 1.2: 创建 `speedLinesMat`（LineBasicMaterial，color 0xf1d68a，transparent，opacity 0，AdditiveBlending）
  - [x] SubTask 1.3: 将 speedLines mesh 添加到 scene，在 init 函数中完成

- [x] Task 2: 实现速度光线渲染逻辑 — 在 renderLoop 中根据 `rotationVelocity` 实时更新光线位置、数量、亮度
  - [x] SubTask 2.1: 根据 `Math.abs(rotationVelocity)` 计算活跃光线数量（8~32）和目标 opacity
  - [x] SubTask 2.2: 每条光线从牌堆中心 (0, 0.35, 0) 沿 XZ 平面放射方向延伸，长度与速度成正比
  - [x] SubTask 2.3: 速度低于 0.1 时 opacity 衰减到 0，速度高于 0.3 时 opacity 目标 0.6
  - [x] SubTask 2.4: 更新 position buffer 和 drawRange

- [x] Task 3: 初始化指尖能量拖尾系统 — 创建 `fingerTrail` 模块（Points，200个预分配粒子），AdditiveBlending
  - [x] SubTask 3.1: 创建 `fingerTrailGeo`（BufferGeometry，position + customColor + alpha 属性，200 粒子）
  - [x] SubTask 3.2: 创建 `fingerTrailMat`（ShaderMaterial，支持透明度渐变）
  - [x] SubTask 3.3: 将 fingerTrail mesh 添加到 scene

- [x] Task 4: 实现指尖拖尾粒子发射与更新 — pointermove 中发射粒子，renderLoop 中更新生命周期
  - [x] SubTask 4.1: pointermove（touchDeadzonePassed）时将触摸位置转为 NDC，再通过 raycaster 反投影到 y=0 平面得到世界坐标，写入下一个空闲粒子槽位
  - [x] SubTask 4.2: 每个粒子记录 spawnTime，renderLoop 中计算 age = now - spawnTime，alpha = 1 - age/0.6
  - [x] SubTask 4.3: 粒子颜色从 `highlightedCardColor` 初始值逐渐淡化
  - [x] SubTask 4.4: age > 0.6 秒后标记为可重用

- [x] Task 5: 实现选卡能量爆发特效 — 在 drawSelectedCard 中触发3D冲击波 + 能量柱 + 屏幕边缘脉冲
  - [x] SubTask 5.1: 创建 `shockwaveGeo`（RingGeometry 0.1/0.15, 64段）+ `shockwaveMat`（MeshBasicMaterial, 金色, transparent, AdditiveBlending），添加到选中卡片位置
  - [x] SubTask 5.2: renderLoop 中更新 shockwave scale（0→4，0.6秒）和 opacity（0.8→0），完成后移除
  - [x] SubTask 5.3: 创建 `energyBurstGeo`（BufferGeometry, 60 粒子）+ material（金色 Points），初始化向上速度（带重力衰减），生命周期 1 秒
  - [x] SubTask 5.4: drawSelectedCard 中追加 CSS 金色 vignette 脉冲

- [x] Task 6: 实现牌堆能量涟漪系统 — 持续旋转时周期性发射扩散光环
  - [x] SubTask 6.1: 创建 `ripplePool`（RingGeometry × 5，对象池复用），材质半透明淡金色 AdditiveBlending
  - [x] SubTask 6.2: renderLoop 中每 0.6 秒（旋转中）从 pool 取一个 ring 放置在 (0, 0.35, 0)
  - [x] SubTask 6.3: ring 的 scale 随时间增长（0→5，1.5秒），opacity 衰减（0.3→0），完成后回收到 pool
  - [x] SubTask 6.4: 停止旋转时不再发射新 ripple，已有 ripple 完成生命周期后自然消散

- [x] Task 7: 性能调优与验证 — 确保所有新特效在移动端 60fps 流畅运行
  - [x] SubTask 7.1: 检查新增 geometry/material 的 drawCall 数量（固定3 + 临时最多6 = 9个额外drawCall，可接受）
  - [x] SubTask 7.2: 所有粒子系统使用 BufferGeometry + Float32Array 预分配，避免 GC
  - [x] SubTask 7.3: 性能优化：缓存 raycaster 对象、colorKeys 缓存、needsUpdate 守卫

# Task Dependencies
- Task 2 依赖 Task 1 ✅
- Task 4 依赖 Task 3 ✅
- Task 5 独立 ✅
- Task 6 独立 ✅
- Task 7 依赖 Task 1-6 全部完成 ✅
- Task 1、3、5、6 可并行启动 ✅
