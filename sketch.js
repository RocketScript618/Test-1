const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

var engine;
var world;

var tower,towerImage;

var cannon;

var backImage;

var ammo = [];

var fleet = [];

var boatAnimation = [];
var boatSpritedata, boatSpritesheet;

function preload() {
  backImage = loadImage("background.gif");
  towerImage = loadImage("tower.png");

  boatSpritedata = loadJSON("boat.json");
  boatSpritesheet = loadImage("boat.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  engine = Engine.create();
  world = engine.world;

  var boatFrames = boatSpritedata.frames;
  for(var i = 0; i < boatFrames; i++){
    var pos = boatFrames[i].position;
    var img = boatSpritesheet.get(pos.x,pos.y, pos.w, pos.h);

    boatAnimation.push(img);
  }

  angle = -PI/4;

  tower = new Tower(160,height-300,180,310);
  cannon = new Cannon(200,height-520,150,75,angle);

  rectMode(CENTER);
}

function draw() {
  background("black");

  image(backImage,0,0,width,height);

  Engine.update(engine);

  for(var i = 0; i<ammo.length; i++){
    showCannonBalls(ammo[i],i);
  }

  tower.display();
  cannon.display();

  spawn();
}

function showCannonBalls(ball,index){
  ball.display();
}

function keyReleased(){
  if(keyCode==ENTER){
    ammo[ammo.length-1].shoot();
  }
}

function keyPressed(){
  if(keyCode==ENTER){
    var cball = new CBall(cannon.x+25,cannon.y-50,80);
    ammo.push(cball);
  }
}

function spawn(){
  if(fleet.length > 0){
    if(fleet.length < 4 && fleet[fleet.length-1].body.position.x < width-300){

    var positions = [-40,-60,-70,-20];

    var position = random(positions);

    var boats = new Boat(width,height-100,200,200,position,boatAnimation);

    fleet.push(boats);

    }
    for(var i = 0; i<fleet.length;i++){
      Matter.Body.setVelocity(fleet[i].body,{x:-10,y:0});
  
      fleet[i].display();
      fleet[i].animate();
    }
  }
  else{
    var boats = new Boat(width,height-100,200,200,position,boatAnimation);

    fleet.push(boats);
  }
}
