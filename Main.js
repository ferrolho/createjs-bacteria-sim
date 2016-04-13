{
	var canvas;
	var stage;

	function init() {
		initCreateJS();

		include('Utilities.js', function() {
			include('entities/Bacterium.js', 'entities/Substance.js', 'Scene.js', function() { main(); });
		});
	}

	function initCreateJS() {
		// resize event listener
		window.addEventListener('resize', resize, false);

		// create a new stage and point it at our canvas:
		canvas = document.getElementById('canvas');
		stage = new createjs.Stage(canvas);
	}

	var FPS = 60;

	function main() {
		resize();

		var scene = new Scene();

		// Ticker
		createjs.Ticker.setFPS(FPS);
		createjs.Ticker.addEventListener('tick', tick);

		function tick(event) {
			scene.update();

			// draw the updates to stage:
			stage.update(event);
		}
	}

	var MD_SCREEN_MIN_WIDTH = 992;

	function resize() {
		canvas.width = (window.innerWidth < MD_SCREEN_MIN_WIDTH) ? window.innerWidth : Math.floor(window.innerWidth * 2 / 3);
		canvas.height = window.innerHeight - 15;

		console.log('Resizing canvas to: ' + canvas.width + 'x' + canvas.height);
	}

}

console.log('Loaded: Main.js');
