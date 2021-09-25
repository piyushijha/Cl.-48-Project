var spaceShip, spaceShipImg;
var meteor, meteorImg;
var meteor2, meteor2Img;
var earth, earthImg;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload() {
  bg = loadImage("space.jpg")
  spaceShipImg = loadImage("spaceShip.png")
  meteorImg = loadImage("meteor.png")
  meteor2Img = loadImage("meteor2.png")
  earthImg = loadImage("earth.png");
  
}

function setup() {
  createCanvas(800, 400);
  spaceShip = createSprite(700, 100, 50, 50);
  spaceShip.addImage("spaceShip", spaceShipImg);
  spaceShip.scale = 0.7;
  //spaceShip.debug = true;
  spaceShip.setCollider("rectangle", 0, 0, 130, 100);

  
  meteorGroup = new Group();

  earth = createSprite(180, 270, 50, 50);
  earth.addImage("spaceShip", earthImg);
  earth.scale = 0.4;
  earth.debug = false;


}


function draw() {
  background(bg);
    //image(instructions, 0, 380, 210, 240);
    if (spaceShip.isTouching(earth)) {
      textSize(45)
      fill(0)
      stroke(255);
      textFont("Calibri");
      text("YOU WIN!",650, 350);
    }

    if (gameState === PLAY) {
      if (keyDown(RIGHT_ARROW)) {
        spaceShip.x += 2;
    }

    if (keyDown(LEFT_ARROW)) {
      spaceShip.x -= 2;
    }

    if (keyDown(UP_ARROW)) {
      spaceShip.y -= 2;
    }

    if (keyDown(DOWN_ARROW)) {
      spaceShip.y += 2;
    }

    spawnMeteor();



    if (meteorGroup.isTouching(spaceShip)) {
      gameState = END;
    }

  }

  else if (gameState === END) {
    meteorGroup.setVelocityXEach(0);
    meteorGroup.setLifetimeEach(-1);

    textSize(45)
    fill(0)
    stroke(255)
    textFont("Calibri")
    text("YOU LOSE!", 650, 300)


  }




  drawSprites();
}

function spawnMeteor() {
  if (frameCount % 80 === 0) {
    meteor = createSprite(600, 100, 50, 50);
    meteor.addImage("meteor", meteorImg);
    meteor.depth = spaceShip.depth;
    meteor.depth -= 1;
    meteor.scale = 0.29;
    meteor.velocityX = -3;
    meteor.lifetime = 1000;
    // meteor.debug = true;
    meteor.setCollider("rectangle", 0, 40, 220, 150);


    meteor2 = createSprite(100, 160, 50, 50);
    meteor2.addImage("meteor2", meteor2Img);
    meteor2.depth = spaceShip.depth;
    meteor2.depth -= 1;
    meteor2.scale = 0.29;
    meteor2.velocityX = 2;
    meteor2.lifetime = 290;
    //meteor2.debug = true;
    meteor2.setCollider("rectangle", 0, 40, 220, 100);


    meteorGroup.add(meteor);
    meteorGroup.add(meteor2);

  }
}

