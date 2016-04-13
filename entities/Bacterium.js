{
	Bacterium.ID = 0;
	Bacterium.MAX_ROT = 5;
	Bacterium.RADIUS = 30;
	Bacterium.STROKE = 2;

	function Bacterium(x, y) {
		this.id = ++Bacterium.ID;
		this.life = 100;

		this.dna = '';
		for (var i = 0; i < Substance.Type.length; i++)
			this.dna += randomBetween(0, 2);

		var rotation = randomBetween(0, 360);
		this.heading = new Victor(Math.cos(deg2rad(rotation)), Math.sin(deg2rad(rotation)));

		this.initShape(x, y);
		this.initLabel();
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

	Bacterium.prototype.initLabel = function() {
		this.label = new createjs.Text(this.id, '18px Montserrat', 'black');
		this.label.textAlign = 'center';
		this.label.textBaseline = 'middle';

		this.label.x = this.shape.x;
		this.label.y = this.shape.y;

		stage.addChild(this.label);
	}

	Bacterium.prototype.update = function() {
		this.heading.rotateDeg(randomBetween(-Bacterium.MAX_ROT, Bacterium.MAX_ROT));

		this.shape.x = (this.shape.x + this.heading.x).mod(canvas.width);
		this.shape.y = (this.shape.y + this.heading.y).mod(canvas.height);

		this.label.x = this.shape.x;
		this.label.y = this.shape.y;

		this.consumeSubstances();

		this.updateLife();
	}

	Bacterium.prototype.consumeSubstances = function() {
		for (i in substances) {
			if (this.contains(substances[i].shape.x, substances[i].shape.y)) {
				this.life += this.canProcess(substances[i]) ? 10 : -10;

				substances[i].reposition();
			}
		}
	}

	Bacterium.prototype.contains = function(x, y) {
		if (x < this.shape.x - Bacterium.RADIUS || this.shape.x + Bacterium.RADIUS < x ||
			y < this.shape.y - Bacterium.RADIUS || this.shape.y + Bacterium.RADIUS < y)
			return false;

		return distance(this.shape.x, this.shape.y, x, y) < Bacterium.RADIUS;
	}

	Bacterium.prototype.canProcess = function(substance) {
		return this.dna[substance.type] == 1;
	}

	Bacterium.prototype.updateLife = function() {
		this.life -= 0.1;

		if (this.life <= 0) {
			stage.removeChild(this.shape);
			stage.removeChild(this.label);

			bacteria.splice(bacteria.indexOf(this), 1);
		} else if (this.life > 100) {
			this.life = 100;
		}
	}

}

console.log('Loaded: entities/Bacterium.js');
