{
	Bacterium.ID = 0;
	Bacterium.MAX_ROT = 5;
	Bacterium.RADIUS = 30;
	Bacterium.STROKE = 2;

	function Bacterium(x, y) {
		this.id = ++Bacterium.ID;
		this.dna = '10010';
		this.life = 100;

		var rotation = randomBetween(0, 360);
		this.heading = new Victor(Math.cos(deg2rad(rotation)), Math.sin(deg2rad(rotation)));

		this.initShape(x, y);
	}

	Bacterium.prototype.initShape = function(x, y) {
		this.shape = new createjs.Shape();

		this.shape.x = x;
		this.shape.y = y;

		this.shape.graphics
		.setStrokeStyle(Bacterium.STROKE,"round")
		.beginStroke('black')
		.beginFill('rgba(230, 230, 230, 0.7)')
		.drawCircle(0, 0, Bacterium.RADIUS);

		this.shape.snapToPixel = true;
		this.shape.cache(-Bacterium.RADIUS - Bacterium.STROKE / 2, -Bacterium.RADIUS - Bacterium.STROKE / 2, 2 * Bacterium.RADIUS + Bacterium.STROKE, 2 * Bacterium.RADIUS + Bacterium.STROKE);

		stage.addChild(this.shape);
	}

	Bacterium.prototype.update = function() {
		this.heading.rotateDeg(randomBetween(-Bacterium.MAX_ROT, Bacterium.MAX_ROT));

		this.shape.x = (this.shape.x + this.heading.x).mod(canvas.width);
		this.shape.y = (this.shape.y + this.heading.y).mod(canvas.height);

		this.updateLife();
	}

	Bacterium.prototype.updateLife = function() {
		this.life -= 1;

		if (this.life <= 0) {
			stage.removeChild(this.shape);

			bacteria.splice(bacteria.indexOf(this), 1);
		}
	}

}

console.log('Loaded: entities/Bacterium.js');
