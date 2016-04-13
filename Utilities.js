/**
* Returns a random integer number between `min` and `max`.
*/
function randomBetween(min, max) {
	return Math.floor(min + Math.random() * (max - min));
}

function randomBetweenFloats(min, max) {
	return min + Math.random() * (max - min);
}

function deg2rad(deg) {
	return deg * Math.PI / 180.0;
}

function rad2deg(rad) {
	return rad * 180.0 / Math.PI;
}

function distance(x1, y1, x2, y2) {
	return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}

function angleBetweenVectors(vec1, vec2) {
	vec1 = vec1.clone().normalize();
	vec2 = vec2.clone().normalize();

	return rad2deg(Math.acos(vec1.dot(vec2).clamp(-1, 1)));
}

function crossProduct(vec1, vec2) {
	vec1 = vec1.clone().normalize();
	vec2 = vec2.clone().normalize();

	return vec1.cross(vec2);
}

/**
* The JavaScript Modulo Bug
* http://javascript.about.com/od/problemsolving/a/modulobug.htm
*/
Number.prototype.mod = function(n) {
	return ((this % n) + n) % n;
};

/**
* Returns a number whose value is limited to the given range.
*
* Example: limit the output of this computation to between 0 and 255
* (x * 255).clamp(0, 255)
*
* @param {Number} min The lower boundary of the output range
* @param {Number} max The upper boundary of the output range
* @returns A number in the range [min, max]
* @type Number
*/
Number.prototype.clamp = function(min, max) {
	return Math.min(Math.max(this, min), max);
};

console.log('Loaded: Utilities.js');
