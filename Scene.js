{
	var bacteria = [];

	function Scene() {
		createStats();

		spawnBacterium(canvas.width / 2, canvas.height / 2);
	}

	Scene.prototype.update = function() {
		updateStats();

		for (i in bacteria)
			bacteria[i].update();
	}


	/*
	* Spawner
	*/

	function spawnBacterium(x, y) {
		bacteria.push(new Bacterium(x, y));
	}


	/*
	* Stats
	*/

	var statsText;

	function createStats() {
		statsText = new createjs.Text("Loading...", '18px Montserrat', '#000');

		statsText.x = 10;
		statsText.y = 10;

		stage.addChild(statsText);
	}

	function updateStats() {
		statsText.text = 'FPS: ' + Math.round(createjs.Ticker.getMeasuredFPS());

		stage.setChildIndex(statsText, stage.numChildren - 1);
	}

}

console.log('Loaded: Scene.js');
