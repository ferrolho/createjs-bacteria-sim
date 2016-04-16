{
	function Substance() {
		this.speed = randomBetweenFloats(0, 1);
		this.type = randomBetween(0, Substance.TYPES);

		var headingDeg = randomBetween(0, 360);
		this.heading = new Victor(Math.cos(deg2rad(headingDeg)), Math.sin(deg2rad(headingDeg)));

		this.rotation = randomBetween(-2, 2);

		this.initShape();
	}

	Substance.RADIUS = 8;
	Substance.TYPES = 5;

	Substance.POISONOUS = [];
	for (var i = 0; i < Substance.TYPES; i++)
		Substance.POISONOUS.push(false);

	$('input:checkbox').change(function() {
		var type = $(this).val();
		Substance.POISONOUS[type] = !Substance.POISONOUS[type];
	});

	Substance.prototype.initShape = function() {
		this.shape = new createjs.Shape();

		this.shape.x = randomBetween(0, canvas.width);
		this.shape.y = randomBetween(0, canvas.height);

		switch (this.type) {
			case 0:
			this.shape.graphics.beginFill('rgba(200, 200, 0, 0.5)');
			break;

			case 1:
			this.shape.graphics.beginFill('rgba(0, 140, 0, 0.5)');
			break;

			case 2:
			this.shape.graphics.beginFill('rgba(200, 0, 0, 0.5)');
			break;

			case 3:
			this.shape.graphics.beginFill('rgba(200, 0, 200, 0.5)');
			break;

			case 4:
			this.shape.graphics.beginFill('rgba(0, 0, 200, 0.5)');
			break;

			default:
			this.shape.graphics.beginFill('rgba(100, 100, 100, 0.5)');
			break;
		}

		if (this.type == 0)
			this.shape.graphics.drawCircle(0, 0, Substance.RADIUS);
		else
			this.shape.graphics.drawPolyStar(0, 0, Substance.RADIUS, this.type + 2, 0, -90);

		this.shape.snapToPixel = true;
		this.shape.cache(-Substance.RADIUS, -Substance.RADIUS, 2 * Substance.RADIUS, 2 * Substance.RADIUS);

		stage.addChild(this.shape);
	}

	Substance.prototype.update = function() {
		this.shape.rotation += this.rotation;

		this.shape.x = (this.shape.x + this.heading.x * this.speed).mod(canvas.width);
		this.shape.y = (this.shape.y + this.heading.y * this.speed).mod(canvas.height);
	}

	Substance.prototype.isPoisonous = function() {
		return Substance.POISONOUS[this.type];
	}

	Substance.prototype.delete = function() {
		stage.removeChild(this.shape);

		substances.splice(substances.indexOf(this), 1);
	}

}

console.log('Loaded: entities/Substance.js');
