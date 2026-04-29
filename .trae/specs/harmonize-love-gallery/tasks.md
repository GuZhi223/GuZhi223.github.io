# Tasks

- [x] Task 1: 清理 demo HTML 中的引流内容
  - [x] SubTask 1.1: 移除 13 个文件中的迅雷网盘链接 (`pan.xunlei.com`)，包括相关 `<a>` 标签及提取码文字
  - [x] SubTask 1.2: 移除 13 个文件中的 UC 网盘链接 (`drive.uc.cn`)，包括相关 `<a>` 标签
  - [x] SubTask 1.3: 移除 `lovedouble 粒子双爱心/粒子双爱心.html` 中的 QQ 群引流链接 (`jq.qq.com`)
  - [x] SubTask 1.4: 移除 9 个文件中的 360ab.cn 微信跳转脚本 (`mp-jump.js` 的 `document.writeln` 调用)
  - [x] SubTask 1.5: 移除 9 个文件中的 360ab.cn CSS 引用 (`common.css`)
  - [x] SubTask 1.6: 移除 `跳动爱心代码.html` 中嵌入的 360ab.cn 域名文字推广
  - [x] SubTask 1.7: 移除 9 个文件中的百度统计追踪代码 (`_hmt` 相关)

- [x] Task 2: 扁平化深层嵌套目录
  - [x] SubTask 2.1: `1  第1种爱心...` — 将嵌套子目录 `第1种爱心loveCodewithName...` 内容提升到根，HTML 文件重命名为 `index.html`
  - [x] SubTask 2.2: `4  第4种缩放...` — 将嵌套子目录内容提升到根，`index.html` 保留，`不带名字的动态缩放爱心效果.html` 保留
  - [x] SubTask 2.3: `Love-on-Valentines-Day...` — 将 `Love-on-Valentines-Day-main/` 内容提升到根
  - [x] SubTask 2.4: `rose2-玫瑰花浪漫至死不渝` — 将 `rose2-main/` 内容提升到根
  - [x] SubTask 2.5: `爱心告白文字代码` — 将 `ValentinesDay-master/` 内容提升到根
  - [x] SubTask 2.6: `爱情表白信` — 将 `4/` 子目录内容提升到根

- [x] Task 3: 重命名全部 48 个 demos 子目录为 kebab-case 英文
  - 旧名 → 新名 映射表：
    1. `1  第1种爱心可以改名字的爱心代码` → `name-heart`
    2. `10   满屏都是爱你的心》` → `fullscreen-love-heart`
    3. `12 情侣纪念日代码` → `anniversary`
    4. `13 爱心发射` → `heart-shoot`
    5. `4  第4种缩放带名字动态爱心代码` → `scale-heart-with-name`
    6. `5 满屏文字爱心代码` → `fullscreen-text-heart`
    7. `5 满屏文字爱心代码 - i love you 英文` → `fullscreen-i-love-you`
    8. `5 满屏文字爱心固定 iloveyoufullfixed 固定` → `fullscreen-i-love-you-fixed`
    9. `68种语言说爱你代码文件 直接QQ浏览器打开看效果` → `love-68-languages`
    10. `8  表白文案红色爱心代码8` → `confession-red-heart`
    11. `9   红蓝线条爱心跳动` → `red-blue-line-heartbeat`
    12. `Dinosaur_in_love  恋爱的恐龙` → `dinosaur-in-love`
    13. `Love-on-Valentines-Day 情人节表白代码` → `valentines-day`
    14. `boysendlove 小人发射爱心biu` → `boy-shoot-hearts`
    15. `kiss 浪漫表白亲吻` → `romantic-kiss`
    16. `love11 心跳爱心网页版` → `heartbeat-3d`
    17. `love12 爱心名字用方框重点标记` → `heart-name-highlight`
    18. `loveamazing  爱心文字掉落炫酷黑客效果` → `matrix-heart-rain`
    19. `lovedouble  粒子双爱心` → `particle-double-heart`
    20. `loveyverytime每次遇见你都心跳加速` → `heartbeat-every-time`
    21. `lovefulltxt 字幕雨爱心` → `subtitle-rain-heart`
    22. `lovered-红色爱心变幻钻石` → `red-heart-to-diamond`
    23. `rose  浪漫玫瑰花` → `romantic-rose`
    24. `rose2-玫瑰花浪漫至死不渝` → `romantic-rose-2`
    25. `together粒子我们在一起吧` → `particle-together`
    26. `动态爱心-2` → `dynamic-heart-2`
    27. `动态爱心-5` → `dynamic-heart-3`
    28. `动态爱心-6` → `dynamic-heart-4`
    29. `律动爱心` → `rhythm-heart`
    30. `心电爱心` → `ecg-heart`
    31. `旋转爱心` → `rotating-heart`
    32. `李峋爱心 背景爱心飘动` → `li-xun-floating-hearts`
    33. `李峋爱心代码原始版` → `li-xun-original`
    34. `烟花爱心` → `firework-heart`
    35. `爱心代码初始版` → `heart-original`
    36. `爱心告白文字代码` → `confession-text-heart`
    37. `爱心流星雨背景_超好看` → `heart-meteor-shower`
    38. `爱情表白信` → `love-letter`
    39. `璀璨爱心` → `brilliant-heart`
    40. `白色爱心` → `white-heart`
    41. `粉色光环爱心` → `pink-halo-heart`
    42. `粉色旋转爱心` → `pink-rotating-heart`
    43. `红色爱心 i love you` → `red-i-love-you`
    44. `蓝色变化钻石爱心` → `blue-morphing-diamond`
    45. `蓝色粒子爱心` → `blue-particle-heart`
    46. `蓝色钻石爱心` → `blue-diamond-heart`
    47. `跳动爱心代码` → `beating-heart`
    48. `魔方爱心和文字` → `rubiks-heart`

- [x] Task 4: 重写 `projects/love-gallery/index.html` 为深色毛玻璃风格
  - [x] SubTask 4.1: 将页面整体改为深色背景 + 浮动光球 + glass 卡片风格（复用根目录 CSS 变量系统）
  - [x] SubTask 4.2: 重新设计搜索栏、计数器、返回按钮为深色主题适配
  - [x] SubTask 4.3: 卡片网格采用 `work-card` 风格，附带渐变边框悬浮效果
  - [x] SubTask 4.4: 更新所有 demo 卡片链接为新目录名路径
  - [x] SubTask 4.5: 添加 back-to-top 按钮和滚动动效（reveal 动画）
  - [x] SubTask 4.6: 为每个卡片添加简洁的中文描述文本（从原目录名提取含义）

- [x] Task 5: 验证
  - [x] SubTask 5.1: 检查所有 48 个 demo 链接在新路径下可访问
  - [x] SubTask 5.2: 检查所有 demo HTML 中不再包含任何引流内容
  - [x] SubTask 5.3: 检查 love-gallery 页面的视觉风格与根目录一致
  - [x] SubTask 5.4: 检查 demos 目录结构整洁、命名规范

# Task Dependencies

- Task 2（扁平化） 依赖于 Task 1（先清理引流内容，再移动文件）
- Task 3（重命名目录）依赖于 Task 2（扁平化后再重命名）
- Task 4（重写导航页）依赖于 Task 3（需要知道最终目录名来更新链接）
- Task 5（验证）依赖于 Task 1-4 全部完成
