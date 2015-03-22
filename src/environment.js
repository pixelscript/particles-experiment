var Environment = function (num,interaction,renderer) {
	function getRandomInt(min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	function getRandomArbitrary(min, max) {
	    return Math.random() * (max - min) + min;
	}

	var cars = this.cars = [];
	for (var i=0; i<num; i++) {
		var p = new Point(getRandomArbitrary(0,renderer.width),getRandomArbitrary(0,renderer.height),getRandomArbitrary(0,renderer.height));
		var x = 0;
		while(x==0) {
			x = getRandomArbitrary(-300,300);
		}
		var y = 0;
		while(y==0) {
			y = getRandomArbitrary(-300,300);
		}
		var z = 0;
		while(z==0) {
			z = getRandomArbitrary(-300,300);
		}
		var v = new Vector(new Point(x,y,z));
		cars.push(new Car(p,v,interaction,renderer));
	}
}

Environment.prototype.tick = function(t) {
	var cars = this.cars;
	for (var i=0;i<cars.length;i++) {
		cars[i].tick(t);
	}
}

Environment.prototype.render = function(renderer) {
	var cars = this.cars;
	for (var i=0;i<cars.length;i++) {
		cars[i].render(renderer);
	}
}