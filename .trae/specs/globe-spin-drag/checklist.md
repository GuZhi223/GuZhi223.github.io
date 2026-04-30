# Checklist

- [x] pointerdown 记录 touchStartRotation 和 touchStartClientX
- [x] pointerdown 停止进行中的惯性
- [x] 拖拽中 deckRotation = startRotation + pixelDelta × gain，无任何插值
- [x] 拖拽中牌堆旋转与手指移动 1:1 对应，无感知延迟
- [x] 松手后牌堆继续旋转，速度基于最后拖拽速度
- [x] 惯性旋转自然减速至停止（摩擦力模型）
- [x] 缓慢拖拽后松手，牌堆不产生多余转动
- [x] 快速甩动后松手，牌堆继续旋转约 1-2 秒
- [x] 旋转过程中高亮卡片正确跟随
- [x] Y 轴 tilt（上下倾斜）保持原有行为不变
- [x] camera 位置跟随 deckRotation 正确移动
- [x] shuffle 期间触摸不干扰动画
- [x] 卡片抽取后（drawn）不响应旋转
- [x] tap 检测（快速点击抽取牌）功能正常
- [x] 非 manualMode（手势模式）行为不受影响
