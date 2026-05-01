(function(){
	function fitTrustStage(){
		var footerHeight = document.getElementById("footer") ? document.getElementById("footer").offsetHeight : 60;
		var availableWidth = window.innerWidth;
		var availableHeight = Math.max(320, window.innerHeight - footerHeight);
		var scale = Math.min(1, availableWidth / 960, availableHeight / 540);
		document.documentElement.style.setProperty("--trust-scale", scale.toFixed(4));
	}

	window.addEventListener("resize", fitTrustStage);
	window.addEventListener("orientationchange", function(){
		setTimeout(fitTrustStage, 120);
	});
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", fitTrustStage);
	} else {
		fitTrustStage();
	}
})();
