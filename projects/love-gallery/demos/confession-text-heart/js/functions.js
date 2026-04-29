var $window = $(window), gardenCtx, gardenCanvas, $garden, garden;
var clientWidth = $(window).width();
var clientHeight = $(window).height();
$(function () {
    $("#loveheart").click(function () {
        $(".messages").fadeIn(5000, function () {
            $(".letter").each(function (i) {
                $(this).delay(i * 1000).fadeIn(1000);
            });
            setTimeout(showTexts, 5000);
        });
    });
    setTimeout(showTexts, 2000);
    function showTexts() {
        showTextWithDelay('.zxx_text_0', 0);
        showTextWithDelay('.zxx_text', 22000);
        showTextWithDelay('.zxx_text_01', 31000);
        showTextWithDelay('.zxx_text_02', 40000);
        showTextWithDelay('.zxx_text_03', 49000);
        setInterval(function () {
            showTextWithDelay('.zxx_text_0', 0);
            showTextWithDelay('.zxx_text', 22000);
            showTextWithDelay('.zxx_text_01', 31000);
            showTextWithDelay('.zxx_text_02', 40000);
            showTextWithDelay('.zxx_text_03', 49000);
        }, 58000);
    }
    function showTextWithDelay(selector, delay) {
        setTimeout(function () {
            var $el = $(selector);
            $el.css({ "display": "block", "position": "absolute", "top": "50%", "left": "50%", "transform": "translate(-50%, -50%)" });
            $el.find("p").each(function (i) {
                $(this).css({ "animation-delay": (i * 1) + "s" });
            });
            $el.fadeIn(2000);
            setTimeout(function () {
                $el.fadeOut(2000, function () {
                    $(this).hide();
                });
            }, 18000);
        }, delay);
    }
    setupStars();
    var $canvas = $("#canvas");
    $canvas.attr("width", $(window).width()).attr("height", $(window).height());
    var ctx = $canvas[0].getContext("2d");
    ctx.moveTo(0, 0);
    ctx.fillStyle = 'rgba(255,105,180,0.8)';
    ctx.strokeStyle = 'rgba(255,105,180,0.8)';
    ctx.lineWidth = 1;
    var gardenCanvas = $garden[0];
    gardenCanvas.width = $garden.width();
    gardenCanvas.height = $garden.height();
    gardenCtx = gardenCanvas.getContext("2d");
    gardenCtx.globalCompositeOperation = "lighter";
    garden = new Garden(gardenCtx, gardenCanvas);
    $("#loveheart").click(function () {
        if (!flowerTextsVisible) {
            $(".messages").fadeIn(5000);
            flowerTextsVisible = true;
        } else {
            $(".messages").fadeOut();
            flowerTextsVisible = false;
        }
    });
    renderHeart();
    setInterval(renderHeart, 500);
});
function renderHeart() {
    var r = getFrameR();
    var count = 60;
    var pathList = [];
    for (var i = 0; i < count; i++) {
        var t = i / count * 2 * Math.PI;
        var x = 16 * Math.pow(Math.sin(t), 3);
        var y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * (clientWidth <= 480 ? 0.4 : 0.6);
        x *= (clientWidth <= 480 ? 0.3 : 0.45);
        x += clientWidth / 2;
        y += clientHeight * 0.45;
        pathList.push({ x: x, y: y });
    }
    if (flowerTextsVisible) {
        if (pathList.length > 0) {
            garden.createRandomBloom(Math.floor(clientWidth * 0.084571429) + pathList[getR(0, 10)].x, Math.floor(clientHeight * 0.27) + pathList[getR(0, 10)].y);
        }
        if (pathList.length > 0) {
            garden.createRandomBloom(Math.floor(clientWidth * 0.912571429) + pathList[getR(0, 10)].x, Math.floor(clientHeight * 0.27) + pathList[getR(0, 10)].y);
        }
    }
    garden.render();
    if (pathList.length > 0) {
        garden.createRandomBloom(pathList[getR(0, pathList.length - 1)].x, pathList[getR(0, pathList.length - 1)].y);
    }
}
function getR(a, b) {
    var c = Math.floor(Math.random() * (b - a + 1)) + a;
    return c;
}
function getFrameR() {
    var t = 0.1;
    var n = window.performance.now ? window.performance.now() : (new Date).getTime();
    var i = Math.floor(n / 1000) + 1;
    t = t * (1 + 0.1 * Math.sin(i * 0.5));
    return t;
}
function setupStars() {
    var body = document.body;
    var starCount = 300;
    var oFrag = document.createDocumentFragment();
    for (var i = 0; i < starCount; i++) {
        var star = document.createElement("div");
        star.className = "star";
        star.style.top = randomDistance(0, clientHeight) + "px";
        star.style.left = randomDistance(0, clientWidth) + "px";
        oFrag.appendChild(star);
    }
    body.appendChild(oFrag);
}
function randomDistance(max, min) {
    var value = Math.random() * (max - min) + min;
    return value;
}
function isTimeToSpread() {
    return new Date().getTime() % 4 === 0;
}