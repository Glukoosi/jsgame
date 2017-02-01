var p, v, h, scores;

function setup() {

	var canvas = createCanvas(720, 720);
	canvas.parent("sketch-holder");
	
	cc = color(209, 109, 66);

	startgame();	
}

function draw() {
	background(51);
	kpress();
	drop();
	touch();

	//Updates player
	p.update();
	p.show();

	// Draw scrores
	textSize(32);
	textAlign(LEFT);
	text(scores, 10, 30);

}

function startgame() {

	scores = 0;	

	//player Cube
	p = new Cube(50, 255, width/2 - 50, height - 50, 0, 0);
	//bad Cubes
	v = new Cube(50, 1, random(0,width - 50), random(-150, -50), 0, 5);
	v2 = new Cube (50, 1, random(0,width - 50), random(-150, -50), 0, 5);
	//good Cube
	h = new Cube(50, cc, random(0,width - 50), random(-150, -50), 0, 5);

}

function touch() {
	//Calculates distance between blocks

	var vp = dist(p.x + p.size/2,
		 p.y + p.size/2,
		 v.x + v.size/2,
		 v.y + v.size/2);

	var vp2 = dist(p.x + p.size/2,
		 p.y + p.size/2,
		 v2.x + v2.size/2,
		 v2.y + v2.size/2);

	var hp = dist(p.x + p.size/2,
		 p.y + p.size/2,
		 h.x + h.size/2,
		 h.y + h.size/2);

	if (vp < p.size || vp2 < p.size){
		end();
	}
	if (hp < p.size){
		h.x = random(0, width - 50);
		h.y = random(-50, -150);
		h.yspeed += random (0.5);
		scores++	
	}
}

function drop() {
	//Updates dropping objects and respawns them.	

	v.update();
	v.show();
	
	v2.update();
	v2.show();

	h.update();
	h.show();
	if(h.y === height){
		h.y = 0;
		h.yspeed += random (0.5);

		h.x = random(width - h.size);
	}
	if(v.y === height){
		v.y = 0;
		v.yspeed += random (0.5);

		v.x = random(width - v.size);
	}
	if(v2.y === height){
		v2.y = 0;
		v2.yspeed += random (0.5);

		v2.x = random(width - v2.size);
	}
}

function kpress() {
	//Tracks keyboards and touchs

	if (keyIsDown(LEFT_ARROW) || keyIsDown(65) ||
			ptouchX < width/2 && touchIsDown == true &&
			p.freeze == 0) {
		p.dir(-10, 0);
	} else if (keyIsDown(RIGHT_ARROW)|| keyIsDown(68) ||
			ptouchX > width/2 && touchIsDown ==true &&
			p.freeze == 0) {
		p.dir(10, 0);
	} else if (keyIsDown(32)) {
		startgame();
	} else {
		p.dir(0, 0);
	} 
}

function touchStarted() {
	//restart game with touchscreen
	if(p.freeze == 1){
		startgame();
	}
}

function end() {
	//End screen

	v.yspeed = 0;
	v2.yspeed = 0;
	h.yspeed = 0;
	p.xspeed = 0;
	p.freeze = 1;

	fill(255);
	textSize(32);
	text("Hävisit pelin", width/2.6, height/2);
}

function Cube(size, color, x, y, xspeed, yspeed) {
	this.size = size;
	this.color = color;
	this.x = x;
	this.y = y;
	this.xspeed = xspeed;
	this.yspeed = yspeed;
	this.freeze = 0;
	
	this.dir = function(x, y){

		if(this.freeze === 0){
			this.xspeed = x;
			this.yspeed = y;
		}
	}

	this.update = function() {
		this.x = this.x + this.xspeed;
		this.y = this.y + this.yspeed;

		this.x = constrain(this.x, 0, width-this.size);
		this.y = constrain(this.y, -150, height);
	}

	this.show = function() {
		fill(color);
		rect(this.x, this.y, this.size, this.size);
	}
}
