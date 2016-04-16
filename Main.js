{
	function init() {
		initCreateJS();

		include('Utilities.js', function() {
			include('entities/Bacterium.js', 'entities/Substance.js', 'Scene.js', function() { main(); });
		});
	}

	var canvas;
	var stage;

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

	function updateBacteriaTable() {
		$('#bacteriaTable > tbody:last-child').empty();

		var numItemsToPrint = Math.min(bacteria.length, 10);

		for (var i = 0; i < numItemsToPrint; i++) {
			var htmlStr = '';

			htmlStr += '<tr>';
			htmlStr += '<th scope="row">' + bacteria[bacteria.length - 1 - i].id + '</th>';
			htmlStr += '<td>' + bacteria[bacteria.length - 1 - i].dna.join('') + '</td>';
			htmlStr += '</tr>';

			$('#bacteriaTable > tbody:last-child').append(htmlStr);
		}

		$('#tableFooter').text('Showing ' + numItemsToPrint + ' of ' + bacteria.length);
	}

}

console.log('Loaded: Main.js');
