{
	function Sensor(x, y, angle, bacteriumRadius) {
		this.angle = angle;
		this.bacteriumRadius = bacteriumRadius;

		this.initShape(x, y);
	}

	Sensor.prototype.initShape = function(x, y) {
		this.shape = new createjs.Shape();
		stage.addChild(this.shape);

		this.shape.x = x;
		this.shape.y = y;
	}

	Sensor.prototype.update = function(x, y) {
		this.shape.x = x;
		this.shape.y = y;

		this.draw();
	}

	Sensor.prototype.draw = function() {
		this.shape.graphics.clear();

		this.shape.graphics
		.setStrokeStyle(1)
		.beginStroke('rgba(0, 0, 0, 0.2)')
		.moveTo(Math.cos(this.angle) * this.bacteriumRadius, Math.sin(this.angle) * this.bacteriumRadius)
		.lineTo(Math.cos(this.angle) * this.bacteriumRadius * 4, Math.sin(this.angle) * this.bacteriumRadius * 4)
	}

	Sensor.prototype.destroy = function() {
		stage.removeChild(this.shape);
	}

}

console.log('Loaded: entities/Sensor.js');
