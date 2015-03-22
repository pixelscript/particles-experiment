var Car = function (pos,vector,interaction,renderer) {
	this.interaction = interaction;
	this.renderer = renderer;
	this.pos = pos;
	this.originalVector = vector.copy();
	this.vector = vector;
	this.gravity = new Vector(new Point(0,350,0));
}
Car.prototype.tick = function(t){
	this.pos.add(this.vector.copy().scale(t));
	this.vector.add(this.gravity.copy().scale(t));

	
	if(this.pos.x<=0 || this.pos.x>this.renderer.width) {
		this.vector.reverseX();
		this.vector.scaleX(0.5);
	}
	if(this.pos.x<=0) {
		this.pos.x = 0;
	}
	if(this.pos.x>=this.renderer.width) {
		this.pos.x = this.renderer.width;
	}

	if(this.pos.y<=0) {
		this.pos.y = 0;
		if(this.vector.y<0) {
			this.vector.reverseY();	
		}
		this.vector.scaleY(0.5);
	}

	if(this.pos.y>=this.renderer.height) {
		this.pos.x = this.interaction.mouse.x || this.renderer.width/2;
		this.pos.y = this.interaction.mouse.y || this.renderer.height/2;
		this.pos.z = this.renderer.height/2;
		this.vector = this.originalVector.copy();
		if(this.interaction.mouse.vector){
			this.vector.add(this.interaction.mouse.vector.copy().scale(25));
		}
	}
}
Car.prototype.render = function(renderer){
	var context = renderer.context,
		zFactor = this.pos.z/this.renderer.height,
		zFactor2 = 10*zFactor;
	var col = Math.round(zFactor*255);
	if(!this.interaction.mouse.toggle){
		col = 255-col;
	}
	context.fillStyle = 'rgb('+col+','+col+','+col+')';
	context.fillRect(this.pos.x-2, this.pos.y-2, zFactor2,zFactor2);
}