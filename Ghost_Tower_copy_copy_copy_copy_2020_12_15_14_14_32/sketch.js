var tower,towerimage;
var door, doorGroup, doorimage;
var climber,climberGroup,climberimage;
var ghost, ghostimage;
var block,blockGroup;
var spooky;
var gameState = "play";
function preload(){
  towerimage = loadImage("tower.png");
  doorimage = loadImage("door.png");
  climberimage = loadImage("climber.png");
  ghostimage = loadImage("ghost-standing.png")
  spooky = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  
  spooky.loop();
  
  tower = createSprite(300,300);
  tower.addImage(towerimage);
  // tower.velocityY = 1;
  
  ghost = createSprite(200,200);
  ghost.addImage(ghostimage);
  ghost.scale = 0.3;
  
  doorGroup = createGroup();
  climberGroup = createGroup();
  blockGroup = createGroup();
 
}
  

function draw(){
  camera.y = ghost.y ;

  if(gameState === "play"){
  
  if(tower.y > 600){
    tower.y = 300;
  }
  if(keyDown("space")){
     ghost.velocityY = -5;
  }
  if(keyDown("left")){
    ghost.x = ghost.x - 3;
  }
  if(keyDown("right")){
    ghost.x = ghost.x + 3;
  }                  
  if(ghost.isTouching(blockGroup) || ghost.y > 600){
    ghost.destroy();
    gameState = "end";
  }
  ghost.velocityY = ghost.velocityY + 0.5;
    
  if(ghost.isTouching(climberGroup)){
    ghost.velocityY = 0;
  }
  if(ghost.y  > 250){
    ghost.y = 200;
  }
  doors();
  
  drawSprites();
  }
  if(gameState === "end"){
    fill ("yellow");
    textSize(30);
    text("GAME OVER",  200,280)
  }
}
function doors(){
  if(frameCount % 240 === 0){
    door = createSprite(Math.round(random(120,400)),-50);
    door.addImage(doorimage);
    door.velocityY = 1;
    
    door.lifetime = 650;
    doorGroup.add(door);
    
    door.depth = ghost.depth;
    ghost.depth+=1;
    
    climber = createSprite(door.x,10);
    climber.addImage(climberimage);
    climber.velocityY = 1;
    
    climber.lifetime = 600;
    climberGroup.add(climber);
    
     
    block = createSprite(door.x,15,climber.width,2);
    block.velocityY = 1;
    
    block.lifetime = 600;
    blockGroup.add(block);
    block.visible = false;
 }
}
