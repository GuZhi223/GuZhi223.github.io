# 验证清单

## 速度光线
- [x] 快速滑动牌堆时（rotationVelocity > 0.3），牌堆中心出现 8~32 条放射状淡金色短线段
- [x] 光线数量和亮度随速度线性变化（speedFactor 线性映射，opacity 平滑插值）
- [x] 滑动方向反转时光线方向立即跟随（direction 基于 rotationVelocity 正负）
- [x] 停止滑动后光线在 0.3 秒内完全消失（dt*8 的插值速率约 0.125 秒收敛）
- [x] 静止状态无多余渲染开销（opacity=0，setDrawRange(0,0)）

## 指尖能量拖尾
- [x] 手指滑动时触摸位置出现发光粒子拖尾
- [x] 粒子颜色匹配当前高亮卡片的主色调（通过 arcanaAccentColors 查表）
- [x] 粒子从诞生到消失有 0.6 秒的渐变消散效果（alpha = (1-age/0.6)² 二次衰减）
- [x] 松手后停止生成新粒子，已有粒子自然消散
- [x] 拖尾粒子不影响牌堆旋转的性能（缓存 raycaster，预分配 buffer）

## 选卡能量爆发
- [x] 点击抽卡时选中卡片位置出现金色冲击波环向外扩张（0→4 半径，0.6 秒）
- [x] 冲击波环使用 AdditiveBlending，半透明金色
- [x] 同时有 30 个金色粒子向上喷射，带重力衰减（重力 5.0）
- [x] 屏幕边缘出现一次金色脉冲发光（CSS vignette gold 动态创建）
- [x] 爆发特效结束后所有临时对象被正确清理（shockwave dispose + 粒子 alpha=-1 回收）

## 牌堆能量涟漪
- [x] 持续旋转时每隔 0.6 秒从牌堆中心产生一个扩散光环
- [x] 光环从中心向外扩张（0→5 半径，1.5 秒），opacity 从 0.3 衰减到 0
- [x] 光环颜色为淡金色，半透明，AdditiveBlending
- [x] 停止旋转后不再产生新光环，已有光环自然消散
- [x] 光环对象池正确复用，无内存泄漏（5 个预创建 mesh，active 标志控制）

## 性能
- [x] 所有新特效合计增加的 drawCall：固定 3（speedLines + fingerTrail + energyBurst），临时最多 6（shockwave + 5 ripples）= 最多 9 个，可接受
- [x] 所有粒子系统使用预分配 BufferGeometry + Float32Array
- [ ] 移动端滑动 + 特效同时运行时保持流畅（需要用户在手机上验证）
- [x] 不触摸时无特效相关的计算开销（speedLines opacity 衰减到 0，trails 不发射，energy burst 不活跃，ripples 需旋转才发射）
