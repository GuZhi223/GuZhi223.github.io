# 酷炫交互特效 Spec

## Why
塔罗牌项目已有粒子系统（4600个）、星座线、星空、魔法阵、卡牌发光等视觉效果，但缺少与用户**触摸操作直接绑定**的实时反馈特效。目前快速滑动牌堆时只有牌堆旋转，缺少速度感和能量感；抽卡时只有屏幕闪光和粒子推开，缺少震撼的爆发感。需要增加几个与触摸/旋转/抽卡强绑定的实时特效，让每次交互都有"魔法能量"的视觉反馈。

## What Changes
- **旋转速度光线**：快速旋转牌堆时，从牌堆中心向外发射放射状光线粒子，速度越快光线越密集越亮，静止时消失
- **指尖能量拖尾**：手指滑动时在触摸位置留下发光的能量拖尾粒子，颜色跟随当前高亮卡片的主色调（每张牌有独立配色）
- **选卡能量爆发**：点击抽卡瞬间，选中卡片位置爆发3D冲击波环 + 向上喷射金色能量柱粒子 + 屏幕边缘脉冲发光
- **牌堆旋转能量涟漪**：牌堆旋转时产生周期性半透明光环从中心向外扩散

## Impact
- Affected specs: globe-spin-drag（拖拽旋转）
- Affected code: `projects/particles/index.html` — 粒子系统、渲染循环、touch事件、drawSelectedCard、pulseDeck

## ADDED Requirements

### Requirement: 旋转速度光线
系统 SHALL 在快速旋转牌堆时显示放射状速度光线，增强旋转动感。

#### Scenario: 快速旋转
- **WHEN** rotationVelocity 绝对值超过 0.3 rad/s
- **THEN** 从牌堆中心向外发射放射状短线粒子，数量（8-32条）和长度与速度成正比，颜色为淡金色（0xf1d68a），使用AdditiveBlending

#### Scenario: 减速停止
- **WHEN** rotationVelocity 降到 0.1 rad/s 以下
- **THEN** 光线粒子在 0.3 秒内淡出消散

#### Scenario: 方向变化
- **WHEN** rotationVelocity 方向反转
- **THEN** 光线方向立即跟随新方向

### Requirement: 指尖能量拖尾
系统 SHALL 在手指滑动时显示发光能量拖尾。

#### Scenario: 滑动中
- **WHEN** 用户在牌堆区域拖拽手指（pointermove 且 touchDeadzonePassed）
- **THEN** 在触摸位置（转换为3D世界坐标）生成拖尾粒子，每个粒子有生命周期0.6秒，从当前高亮卡片主色调渐变到透明，使用AdditiveBlending

#### Scenario: 松手
- **WHEN** 用户抬起手指
- **THEN** 停止生成新拖尾粒子，已有粒子在生命周期内自然淡出

### Requirement: 选卡能量爆发
系统 SHALL 在点击抽卡时显示震撼的3D爆发特效。

#### Scenario: 抽卡瞬间
- **WHEN** 用户 tap 触发 drawSelectedCard
- **THEN** 在选中卡片位置同时触发：
  1. 3D冲击波环：一个圆环从中心快速扩张（0→4半径，0.6秒），材质为金色半透明，AdditiveBlending
  2. 能量柱粒子：向上喷射30个金色粒子，初始速度向上，带重力衰减，生命周期1秒
  3. 屏幕边缘脉冲：CSS vignette 从暗色变为金色脉冲一次

### Requirement: 牌堆能量涟漪
系统 SHALL 在牌堆旋转时产生周期性能量涟漪。

#### Scenario: 持续旋转
- **WHEN** 牌堆正在旋转（手动拖拽或惯性，rotationVelocity > 0.1）
- **THEN** 每隔 0.6 秒从牌堆中心（y=0.35）向外扩散一个半透明圆环，扩张半径 0→5（1.5秒），opacity 0.3→0，颜色为淡金色

## MODIFIED Requirements
无

## REMOVED Requirements
无
