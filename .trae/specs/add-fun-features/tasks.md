# Tasks

- [x] Task 1: 实现正逆位机制
  - [x] SubTask 1.1: 扩展 tarotDeck 数据结构，为每张牌添加 `reversed` 字段（逆位关键词），并在 `pickTarot()` 中随机判定正逆位
  - [x] SubTask 1.2: 修改 `drawSelectedCard()` 翻转动画，逆位时多翻半圈（`y: Math.PI * 3`），正面纹理上下颠倒
  - [x] SubTask 1.3: 修改 `showResult()` 显示正/逆位标签（⬆ 正位 / ⬇ 逆位），并使用对应关键词

- [x] Task 2: 实现手绘魔法阵特效
  - [x] SubTask 2.1: 在握拳状态下手掌位置轨迹记录（圆形检测算法），计算画圈速度和方向
  - [x] SubTask 2.2: 当检测到连续画圈时，在 3D 场景中生成粒子环形排列（~60 个粒子组成同心圆），跟随画圈方向旋转
  - [x] SubTask 2.3: 松手或停圈后，魔法阵粒子向外散射并消散，回归正常粒子运动

- [x] Task 3: 实现三张牌阵模式
  - [x] SubTask 3.1: 修改 `showResult()` 在结果面板底部添加"再抽一张"按钮（最多抽至 3 张），点击后调用 `resetReading()` 但保留已抽牌结果
  - [x] SubTask 3.2: 维护已抽牌数组 `appState.drawnCards`，每次抽牌后追加到数组
  - [x] SubTask 3.3: 当抽满 3 张或用户点击"查看解读"时，改为三栏布局展示"过去/现在/未来"，每栏显示牌名、正逆位、关键词

- [x] Task 4: 实现 Web Audio 音效系统
  - [x] SubTask 4.1: 创建 AudioContext 和音效合成函数（嗡鸣音、上升扫频音、脉冲音、环境音）
  - [x] SubTask 4.2: 在 `pulseDeck()` 中播放握拳嗡鸣音，在 `drawSelectedCard()` 翻转时播放上升扫频音
  - [x] SubTask 4.3: 在 `startPerception()` 成功后启动环境嗡鸣循环（极低音量 ~55Hz），在 `resetReading()` 时停止

# Task Dependencies
- Task 2 依赖 Task 1（魔法阵效果需在正逆位判定后才能触发更酷的视觉反馈，但代码上无硬依赖，可并行开发）
- Task 3 依赖 Task 1（三张牌阵需要正逆位数据）
- Task 4 独立于其他任务，可并行开发
