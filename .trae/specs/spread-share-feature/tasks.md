# Tasks

- [x] Task 1: 实现 `generateSpreadShareImage(drawnCards, userQuestion)` 函数
  - 在 `generateShareImage(tarot)` 函数之后（约 L3891 后）新增 `generateSpreadShareImage` 函数
  - 画布尺寸 1080×1920，复用现有星空背景绘制逻辑（渐变底色 + 4 层星云 + 3 层星场）
  - 绘制顶部区域：装饰边框（复用现有四角 L 形 + 双层矩形边框）、品牌标题 "TAROT · 星门塔罗"、用户问题文本（带「」引号装饰）
  - 绘制三张牌横向排列区域（Y 约 320~1380）：
    - 三列等宽布局，每列宽 320px，居中分布
    - 每张牌：深色圆角矩形底板（约 240×330）、`arcanaGlyphs[name]` 绘制的牌面符号（约 110px 居中）、双层圆环装饰、逆位时符号区域旋转 180°
    - 三张牌之间用竖向装饰渐变线分隔
    - 每张牌下方：位置标签（"过去"/"现在"/"未来"，11px 小字）、牌名（36px 粗体）、正/逆位标识（正位金色 ▲ / 逆位粉色 ▼）、释义文字（24px，使用 `wrapText` 自动换行，最多 5 行）
  - 绘制整体总结区域（Y 约 1440~1600）：
    - 装饰分隔线 + 菱形点缀
    - 标题 "牌阵解读"
    - 从 `buildReading()` 提取三张牌的关键词，合并为一行展示
    - 底部一句话综合建议
  - 绘制底部品牌区域（复用现有装饰线 + 菱形 + "星门塔罗" + 日期）
  - 返回 canvas

- [x] Task 2: 在三牌阵结果界面添加分享按钮
  - 修改 `showSpreadResult()` 函数（L4087-4152），在 `drawn.length >= 2` 分支中
  - 在 `#spreadResult` div 创建并填充 HTML 之后，创建一个按钮容器 div
  - 添加 "✦ 分享牌阵" 按钮（class `btn btn-ghost`）
  - 按钮点击事件：调用 `generateSpreadShareImage(appState.drawnCards, appState.userQuestion)` 生成 canvas，再调用 `showSharePreview(canvas)` 显示预览
  - 按钮容器插入到 `spreadDiv` 之后、`restartBtn` 之前

- [x] Task 3: 验证与调试
  - 在浏览器中测试三牌阵完整流程：输入问题 → 抽三张牌 → 查看解读 → 点击分享牌阵
  - 验证分享预览弹窗正确显示生成的图片
  - 验证保存图片功能正常（点击保存按钮可下载图片）
  - 验证单张牌分享功能不受影响
  - 检查图片中三张牌的符号渲染、文字排版、逆位旋转是否正确
  - 检查移动端竖屏下图片的可读性

# Task Dependencies

- Task 2 依赖 Task 1（需要 `generateSpreadShareImage` 函数存在）
- Task 3 依赖 Task 1 和 Task 2
