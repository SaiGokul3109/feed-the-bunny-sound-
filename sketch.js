const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var fruit,rope;
var fruit_con;
var fruit_con2;

var bg_img;
var food;
var rabbit;
var bunny;
var button,blower;

var blink,eat,sad;

var mute_btn;
var bg_sound;
var cut_sound;
var eat_sound;
var sad_sound;
var air;

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');

  bg_sound = loadSound('sound1.mp3');
  sad_sound = loadSound('sad.wav');
  cut_sound = loadSound('rope_cut.mp3');
  eat_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');

  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");

  blink.playing=true;
  eat.playing=true;
  sad.playing=true;
  eat.looping=false;
  sad.looping=false;
}

function setup() 
{
  createCanvas(500,700);
  frameRate(80);

  bg_sound.play();
  bg_sound.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,680,600,20);

  button=createImg("cut_btn.png");
  button.position(230,30);
  button.size(50,50);
  button.mouseClicked(drop);

  blower=createImg("balloon.png");
  blower.position(10,250);
  blower.size(100,100);
  blower.mouseClicked(airblow);
  
  mute_btn=createImg("mute.png");
  mute_btn.position(450,20);
  mute_btn.size(50,50);
  mute_btn.mouseClicked(mute);

  blink.frameDelay=20;
  eat.frameDelay=20;
  sad.frameDelay=20;

  rope = new Rope(7,{x:245,y:30});
  ground = new Ground(200,690,600,20);

  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);


  bunny = createSprite(420,620,100,100);
  //bunny.addImage(rabbit);
  bunny.scale=0.2
  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation("blinking");

  fruit_con = new Link(rope,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  //imageMode(CENTER);
  
}

function draw() 
{
  background(51);

  image(bg_img,0,0,490,690);
  push();
  imageMode(CENTER);
  if(fruit!=null){
  
  image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();
  rope.show();
  Engine.update(engine);
  ground.show();

  drawSprites();

  if(collide(fruit,bunny)==true){
    bunny.changeAnimation('eating');
    eat_sound.play();
  }
  if(fruit!=null && fruit.position.y>=650){
    bunny.changeAnimation('crying');
    bg_sound.stop();
    sad_sound.play();
    fruit = null;
  }
   
}
function drop(){
  cut_sound.play();
  fruit_con.detach();
  rope.break();
  fruit_con=null;

}

function collide(body,sprite) { 
  if(body!=null) { 
    var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y); 
    if(d<=80) { 
      World.remove(engine.world,fruit); 
      fruit = null; 
      return true; } 
      else{ 
        return false; 
      } 
    } 
  }
  function keyPressed() { 
    if(keyCode==LEFT_ARROW) { 
      airblow(); 
    } 
  }

  function airblow() { 
    Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.01,y:0}); 
    air.play(); 
  }
  function mute() { 
    if(bg_sound.isPlaying()) {
       bg_sound.stop();
       } 
       else{
          bg_sound.play(); 
        } 
      }