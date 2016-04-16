{
	function Bacterium(x, y, dna) {
		this.id = ++Bacterium.ID;

		if (dna != null) {
			this.life = 50;

			this.dna = dna;
			console.log('Generating offspring: ' + this.dna)
		} else {
			this.life = 100;

			this.dna = '';
			for (var i = 0; i < Substance.TYPES; i++)
				this.dna += randomBetween(0, 2);
		}

		var rotation = randomBetween(0, 360);
		this.heading = new Victor(Math.cos(deg2rad(rotation)), Math.sin(deg2rad(rotation)));

		this.initShape(x, y);
		this.initLabel();
	}

	Bacterium.ID = 0;
	Bacterium.MAX_ROT = 5;
	Bacterium.RADIUS = 30;
	Bacterium.STROKE = 2;

	Bacterium.prototype.initShape = function(x, y) {
		this.shape = new createjs.Shape();

		this.shape.x = x;
		this.shape.y = y;

		this.draw();

		stage.addChild(this.shape);
	}

	Bacterium.prototype.draw = function() {
		this.shape.graphics.clear();

		// bacteria

		this.shape.graphics
		.setStrokeStyle(Bacterium.STROKE)
		.beginStroke('silver')
		.beginFill('rgba(230, 230, 230, 0.7)')
		.drawCircle(0, 0, Bacterium.RADIUS);

		// life bar

		var arcLength = 2 * Math.PI * this.life / 100;

		this.shape.graphics
		.setStrokeStyle(Bacterium.STROKE)
		.beginStroke('green')
		.beginFill('transparent')
		.arc(0, 0, Bacterium.RADIUS, - Math.PI / 2, - Math.PI / 2 - arcLength, true);
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

		this.draw();

		this.label.x = this.shape.x;
		this.label.y = this.shape.y;

		this.consumeSubstances();
		this.reproduce();
		this.updateLife();
	}

	Bacterium.prototype.consumeSubstances = function() {
		for (i in substances) {
			if (this.eats(substances[i])) {
				if (this.contains(substances[i].shape.x, substances[i].shape.y)) {
					this.life += substances[i].isPoisonous() ? -10 : 10;

					substances[i].reposition();
				}
			}
		}
	}

	Bacterium.prototype.eats = function(substance) {
		return this.dna[substance.type] == 1;
	}

	Bacterium.prototype.contains = function(x, y) {
		if (x < this.shape.x - Bacterium.RADIUS || this.shape.x + Bacterium.RADIUS < x ||
			y < this.shape.y - Bacterium.RADIUS || this.shape.y + Bacterium.RADIUS < y)
			return false;

		return distance(this.shape.x, this.shape.y, x, y) < Bacterium.RADIUS;
	}

	Bacterium.prototype.reproduce = function() {
		if (this.life > 70) {
			for (i in bacteria) {
				var other = bacteria[i];

				if (this == other)
					continue;

				if (other.life > 70) {
					if (distance(this.shape.x, this.shape.y, other.shape.x, other.shape.y) < Bacterium.RADIUS * 2) {
						this.life -= 40;
						other.life -= 40;

						var newDna = '';
						for (var i = 0; i < this.dna.length; i++)
							newDna += randomBetween(0, 2) == 0 ? this.dna[i] : other.dna[i];

						console.log(this.dna + ' + ' + other.dna + ' => ' + newDna)

						spawnBacterium((this.shape.x + other.shape.x) / 2, (this.shape.y + other.shape.y) / 2, newDna);
					}
				}
			}
		}
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
