{
	var bacteria = [];
	var substances = [];

	function Scene() {
		createStats();

		for (var i = 0; i < 500; i++)
			spawnSubstance();

		spawnBacterium(canvas.width / 2, canvas.height / 2);

		stage.addEventListener("stagemousedown", function(event) {
			spawnBacterium(event.stageX, event.stageY);
		});
	}

	var BACTERIA_TABLE_FPS = 25;

	Scene.prototype.update = function() {
		updateStats();

		for (i in bacteria)
			bacteria[i].update();

		for (i in substances)
			substances[i].update();

		if (randomBetween(0, 100) < 20)
			spawnSubstance();
	}

	/*
	* Spawner
	*/

	function spawnBacterium(x, y) {
		bacteria.push(new Bacterium(x, y));

		updateBacteriaTable();
	}

	function spawnBacterium(x, y, dna) {
		bacteria.push(new Bacterium(x, y, dna));

		updateBacteriaTable();
	}

	function spawnSubstance() {
		substances.push(new Substance());
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
		var text = "";
		text += '        Click anywhere to spawn a bacterium.\n\n';
		text += 'FPS: ' + Math.round(createjs.Ticker.getMeasuredFPS());

		statsText.text = text;

		stage.setChildIndex(statsText, stage.numChildren - 1);
	}

}

console.log('Loaded: Scene.js');
