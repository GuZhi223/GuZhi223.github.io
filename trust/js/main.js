var slideshow, slideSelect;

Ticker.framerate=60;
Ticker.paused=true;

document.addEventListener('DOMContentLoaded', function(){

	Q.all([
		Loader.loadAssets(Loader.manifestPreload),
		Words.convert("words.html")
	]).then(function(){

		document.body.removeChild($("#preloader"));
		$("#main").style.display = "block";
		$("#footer").style.display = "block";

		slideshow = new Slideshow({
			dom: $("#slideshow"),
			slides: SLIDES
		});

		slideSelect = new SlideSelect({
			dom: $("#select"),
			slides: SLIDES
		});
		slideSelect.dom.style.display = "none";
		subscribe("start/game", function(){
			slideSelect.dom.style.display = "block";
			$("#translations").style.display = "none";
			publish("slideshow/next");
		});

		var _soundIsOn = true;
		$("#sound").onclick = function(){
			_soundIsOn = !_soundIsOn;
			Howler.mute(!_soundIsOn);
			$("#sound").setAttribute("sound", _soundIsOn?"on":"off");
		};

		Loader.loadAssets(
			Loader.manifest,
			function(){
				publish("preloader/done");
			},
			function(ratio){
				publish("preloader/progress", [ratio]);
			}
		);

		slideshow.nextSlide();

	});

});
