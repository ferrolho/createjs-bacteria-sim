{
	var STROKE_THICKNESS = 5;
	var RADIUS = 30;
	var MAX_ROT = 5;

	function Bacterium(x, y) {
		var rotation = randomBetween(0, 360);
		this.heading = new Victor(Math.cos(deg2rad(rotation)), Math.sin(deg2rad(rotation)));

		this.initShape(x, y);
	}

	Bacterium.prototype.initShape = function(x, y) {
		this.shape = new createjs.Shape();

		this.shape.x = x;
		this.shape.y = y;

		this.shape.graphics
		.beginFill('silver')
		.setStrokeStyle(STROKE_THICKNESS,"round")
		.beginStroke('black')
		.drawCircle(0, 0, RADIUS);

		this.shape.cache(-RADIUS - STROKE_THICKNESS / 2, -RADIUS - STROKE_THICKNESS / 2, 2 * RADIUS + STROKE_THICKNESS, 2 * RADIUS + STROKE_THICKNESS);
		this.shape.snapToPixel = true;

		stage.addChild(this.shape);
	}

	Bacterium.prototype.update = function() {
		this.heading.rotateDeg(randomBetween(-MAX_ROT, MAX_ROT));

		this.shape.x = (this.shape.x + this.heading.x).mod(canvas.width);
		this.shape.y = (this.shape.y + this.heading.y).mod(canvas.height);
	}

}

console.log('Loaded: entities/Boid.js');
