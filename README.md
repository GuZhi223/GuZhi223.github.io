# 钢的学习页 | GuZhi223.github.io

我的个人主页和数字试验田。

站点地址：[https://guzhi223.github.io](https://guzhi223.github.io)

大一计科在读，一边学 C/C++、数据结构和 Git，一边把能跑起来、能复盘、也许对别人有点用的东西收拾到这里。它不是包装得很完整的产品站，更多是学习过程的真实记录。

## 页面总览

主入口 [index.html](index.html) 采用毛玻璃（glassmorphism）风格设计，包含四个板块：关于我、一些分享、开源库、传送门。

### 一些分享

| 路径 | 说明 | 主要技术 |
|------|------|----------|
| [projects/particles/](projects/particles/) | 星门塔罗 \| 3D 手势抽牌：输入问题后用「张开手 → 握拳 → 张开手」的手势在 3D 牌阵中抽取塔罗牌 | Three.js、MediaPipe Hands |
| [trust/](trust/) | 《信任的进化》中文网页复活版——Nicky Case 博弈论互动游戏的本地化部署与移动端适配 | PIXI.js、Howler.js |
| [projects/nutrition/](projects/nutrition/) | 减脂期饮食与营养素计算器：根据生活化减脂理论，输入性别、体重和运动量即可估算每日碳水、蛋白质和脂肪目标 | 原生 JS（OOP） |
| [projects/love-gallery/](projects/love-gallery/) | 爱心展示合集：从互联网收集的约 50 个"低脂"爱心 HTML 页面，已清理无关推广入口 | HTML / CSS / JS |
| [projects/halloween/](projects/halloween/) | 万圣节弹窗彩蛋：模拟 Windows 风格弹窗逐个弹出祝福语，手机和电脑自适应爱心大小 | 原生 JS |
| [projects/love/](projects/love/) | 节日礼物页：点击按钮后排版爱心阵列并播放背景音乐 | 原生 JS |
| [projects/perler-bead/](projects/perler-bead/) | 拼豆图纸生成器：上传图片自动生成拼豆/串珠像素图纸，支持缩放、拖拽和导出 | 原生 JS、Canvas |
| [projects/mouse-test/](projects/mouse-test/) | 鼠标灵敏度测试：记录鼠标移动轨迹和速度，生成可视化热力图，适合测试鼠标 DPI 和灵敏度设置 | Canvas、原生 JS |
| [assignments/](assignments/) | 电子作业思路分享：课程作业展示入口及外部文档链接，附宝宝级喂饭教程 | HTML |

### 开源项目

主页里展示了我目前比较想让人看到的几个仓库：

- [hnjingsai_help](https://github.com/GuZhi223/hnjingsai_help) — 针对 `henanjingsai.cn` 的油猴脚本，顺手整理了约 244 道题的题库。
- [chaoxing-GUI-Helper](https://github.com/GuZhi223/chaoxing-GUI-Helper) — 学习通/超星自动化流程的图形化启动器，2.0 版用 Flet + MVVM + EventBus 重构。
- [ono](https://github.com/GuZhi223/ono) — fork 来学习的 QQNT Xposed 模块，用于阅读 Android 模块结构和 Hook 思路。

## 技术栈

```
HTML / CSS / JavaScript
GitHub Pages 静态部署
Three.js · MediaPipe Hands · PIXI.js
Font Awesome (CDN)
```

没有构建流程，没有必须安装的依赖。所有页面直接作为静态 HTML 运行。

## 目录结构

```
.
├── index.html                        # 主页入口（毛玻璃风格）
├── assignments/
│   └── index.html                    # 课程作业归档页
├── trust/
│   ├── index.html                    # 信任的进化（游戏主入口）
│   ├── words.html                    # 游戏内文本
│   ├── js/                           # 游戏核心逻辑、模拟、幻灯片
│   ├── css/                          # 样式与字体
│   ├── assets/                       # 图片、音效、UI 资源
│   ├── peeps/                        # 角色立绘
│   └── notes/                        # 脚注
├── projects/
│   ├── particles/                    # 星门塔罗（3D 手势抽牌）
│   ├── nutrition/                    # 营养素计算器
│   ├── love-gallery/                 # 爱心展示合集
│   │   └── demos/                    #   约 50 个子目录（网络收集）
│   ├── halloween/                    # 万圣节弹窗彩蛋
│   ├── love/                         # 节日礼物页
│   ├── perler-bead/                  # 拼豆图纸生成器
│   └── mouse-test/                   # 鼠标灵敏度测试
```

## 关于 AI / Vibe Coding

仓库里有不少内容是 AI 辅助完成的。很多页面从"我想要一个东西"开始，一点点试、改、调、部署出来。

它们有些地方还粗糙，有些代码带着明显的学习痕迹，但确实记录了我怎么把一个想法从 idea 推到能打开、能交互、能继续迭代。AI 对我来说更像代码搭档——帮我拆需求、读仓库、改页面、查问题、补适配。

## 联系

- GitHub：[@GuZhi223](https://github.com/GuZhi223)
- 主页：[https://guzhi223.github.io](https://guzhi223.github.io)

GO WORK.
