# 信任的进化网页版复活版

这是《The Evolution of Trust》的中文网页复活版，用于在现代浏览器和手机浏览器中重新游玩。

当前版本以“最快能玩”为目标：保留原玩法、原美术风格、原交互流程、原 credits 和 license，只做 GitHub Pages 子目录部署、资源路径、基础移动端和现代浏览器兼容修复。

## 原作来源

Nicky Case / The Evolution of Trust  
https://github.com/ncase/trust

## 中文版本来源

本目录主要基于简体中文版本整理：  
https://github.com/zhuoyan/trust-zh-CN

## 当前部署路径

https://guzhi223.github.io/trust/

## 本地运行方式

请在仓库根目录运行静态服务器：

```bash
python -m http.server 5173
```

然后打开：

```text
http://localhost:5173/trust/
```

不要直接双击 `index.html` 打开，因为 `file://` 可能导致 `words.html` 或其他资源加载失败。

## 本次整理说明

- 保留中文文本与原始项目结构。
- 将游戏作为 `GuZhi223.github.io/trust/` 子页面部署，不覆盖根目录首页。
- 为 `index.html` 添加移动端 viewport。
- 增加移动端舞台缩放脚本，避免 960x540 固定画布在手机上严重溢出。
- 音频资源加载失败时不再阻断主流程预加载。
- 保留原项目 credits、音效来源、开源库来源和授权说明。

---

!["The Evolution of Trust"](https://i.imgur.com/kde760y.png)

#	本项目为[http://ncase.me/trust/](http://ncase.me/trust/)的非官方简体中文版，地址为[http://sekai.co/trust/](http://sekai.co/trust/)

本作品 *信任的进化* （译名参考罗伯特·阿克塞尔罗德的《合作的进化》）属于公共领域，多亏了现有的知识共享许可和开源的资源，才能顺利地诞生！本项目用到的全部音乐、音效、以及代码列举如下：

**音乐：** "Bleu" by Komiku (CC Zero). [在 Free Music Archive 上下载他们的整张专辑](http://freemusicarchive.org/music/Komiku/Its_time_for_adventure_/)

**音效：**

* [Coin insert](https://freesound.org/people/bassmosphere/sounds/384700/) by bassmosphere (CC Zero)
* [Coin get!](https://freesound.org/people/plasterbrain/sounds/242857/) by plasterbrain (CC Zero)
* [Evil Laugh](https://freesound.org/people/JohnsonBrandEditing/sounds/173933/) by JohnsonBrandEditing (CC Zero)
* [Slot machine](https://freesound.org/people/lukaso/sounds/69689/) by lukaso (CC Sampling+)
* [Drumroll](https://freesound.org/people/adriann/sounds/191718/) by adriann (CC Zero)
* [click plink pop boop bonk](https://freesound.org/people/Owdeo/sounds/116653/) by Owdeo (CC BY-NC)
* [Swoosh](https://freesound.org/people/aglinder/sounds/264468/) by aglinder (CC Zero)
* [Squeaky Toy](https://freesound.org/people/survivalzombie/sounds/240015/) by survivalzombie (CC Zero)
* [Thump](https://freesound.org/people/Brokenphono/sounds/344149/) by Brokenphono (CC Zero)
* [Fart](https://freesound.org/people/DSISStudios/sounds/241000/) by DSISStudios (CC Zero)

**开源代码库：**

* [PIXI.js](http://www.pixijs.com/) 用于渲染图像
* [Howler.js](https://howlerjs.com/) 用于声音
* [Tween.js](http://www.createjs.com/tweenjs) 用于动画补间(感谢 V2EX 的 @geelaw 指正翻译)
* [Balloon.css](https://kazzkiq.github.io/balloon.css/) 用于弹窗显示工具小提示
* [Q](https://github.com/kriskowal/q/) 用于 promises
* [MinPubSub](https://github.com/daniellmb/MinPubSub) 用于发布和订阅
* [Pegasus](https://github.com/typicode/pegasus) 用于……我懒得不想写自己的 XHR

**字体：** [Futura Handwritten](http://www.dafont.com/futurahandwritten.font) by Bill Snyder

#	How-To: Translate this thang!

**[IMPORTANT:
BEFORE YOU DECIDE TO MAKE A TRANSLATION, CHECK THE "ISSUES" TAB ABOVE,
TO SEE IF SOMEONE ELSE IS ALREADY WORKING ON IT.
If so, maybe you can collaborate!
And if no one else is, PLEASE CREATE A NEW ISSUE in this repo
so that others know you're working on it!]**

Translations done so far:
[Chinese (Simplified)](https://sekai.co/trust/),
[Chinese (Taiwan)](https://audreyt.github.io/trust-zh-TW/),
[Brazilian Portuguese](https://brunolemos.github.io/trust/),
[French](https://ayowel.github.io/trust/),
[Spain Spanish](https://ccamara.github.io/trust/),
[Russian](https://notdotteam.github.io/trust/),
[German](https://jkoelling.github.io/trust/),
[Italian](https://lvdt.github.io/trust/),
[Turkish](https://osaatcioglu.github.io/trust),
[Polish](https://sin.github.io/trust/),
[Vietnamese](https://nghiatt90.github.io/trust-vn/),
[Greek](https://lightspot21.github.io/trust/),
[Persian/Farsi](https://hamed.github.io/trust/),
[Hungarian](http://ncase.me/trust-hu/),
[Catalan](https://fbricart.github.io/trust/),
[Arabic](https://mudaraljundi.github.io/trust/),
[Bulgarian](http://ncase.me/trust-bg/),
[Korean](https://osori.github.io/trust-ko/),
[Romanian](https://github.com/enFactorial/trust)

**Step 1)** Fork or download this repo    
(if you're forking it, be sure to make sure *your* repo is on a branch called `gh-pages`, so that GitHub can automatically generate a webpage for it!)

**Step 2)** Translate the following files:

`index.html` -- The title & social sharing text (a few words)    
`words.html` -- All the words for the interactive itself (~3,300 words)    
(optional) `notes/index.html` -- The footnotes (~1,100 words)    
(optional) `peeps/index.html` -- The full credits (a few words)

**Step 3)** Remember to test your translation! You can test things locally using [http-server](https://www.npmjs.com/package/http-server) or [MAMP](https://www.mamp.info/en/).

**Step 4)** Email me with a link to your forked repo / the translated files, at `N {{at}} NCASE {{dot}} ME` There may be a few things here and there we need to fix! (also, if you run into any issues, please email me as well! I may take a while to respond since I'm away the next couple weeks)

**Step 5)** Wait for me to stop being busy and/or lazy and actually link your translated version from the main English version

**Step 6)** Party! 🎉

#	"许可协议"

[Creative Commons Zero](https://github.com/ncase/trust/blob/gh-pages/LICENSE): 本协议适用于对于公共领域的无私奉献，从根本上来说，您可以做任何事！欢迎署名，我不会对您追究任何法律责任。
