
var FrameManager = function(fps) {
	this.interaction = new Interaction();
	this.renderer = new Renderer();
	this.env = new Environment(800,this.interaction,this.renderer);
	this.renderer.setEnvironment(this.env);
	this.timeBuffer = 0;
	this.lastTime = 0;
	this.simTicks = 1000/fps;
	this.simSeconds = this.simTicks / 1000;
	this.frameCall = $.proxy(this.frame,this);
}

FrameManager.prototype.changeFps = function(fps){
	this.simTicks = 1000/fps;
	this.simSeconds = this.simTicks / 1000;
}

FrameManager.prototype.start = function(){
	this.anim = requestAnimationFrame(this.frameCall);	
}

FrameManager.prototype.stop = function(){
	cancelAnimationFrame(this.anim);	
}
	
FrameManager.prototype.frame = function(){
	var now = Date.now();
	var ticks = now - this.lastTime;
	this.lastTime = now;
	if(ticks > 100) {
		ticks = 0;
	}
	this.timeBuffer+=ticks;
	if(this.timeBuffer >= this.simTicks) {
		while(this.timeBuffer >= this.simTicks) {
			this.env.tick(this.simSeconds);
			this.timeBuffer -= this.simTicks;
		}
		this.renderer.render(ticks/1000);
	}
	requestAnimationFrame(this.frameCall);
}