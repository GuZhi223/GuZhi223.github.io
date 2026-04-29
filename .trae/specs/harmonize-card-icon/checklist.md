# Checklist

- [x] `.result-card-icon` 使用 `border-radius: 16px`（方形倒角），不再是圆形
- [x] 图标容器四个角显示 L 形金色装饰线，与 `.intro-card` 的边框装饰手法一致
- [x] `cardIconPulse` 动画仅使用金色系光晕（无紫色色相）
- [x] 图标内部前景层：罗马数字（numeral）字号 18px、font-weight 800、金色
- [x] 图标内部背景层：emoji 符号（symbol）字号 44px、opacity 0.12、绝对定位居中
- [x] `drawSelectedCard()` 生成的 innerHTML 包含 numeral + symbol 两个 span
- [x] 移动端图标缩小为 72×72px，numeral 16px，symbol 36px，圆角 14px
- [x] `resetReading()` 正确清除 cardIcon 内容
- [x] 三张牌阵（spread）模式下 cardIcon 和新增元素正确隐藏
- [x] 22 张大阿卡纳的 emoji 符号在新布局下均可辨识，视觉密度差异已缓解
