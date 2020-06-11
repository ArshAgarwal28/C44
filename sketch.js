//Variables required for level 1
var houseStarter;
var mask, maskAnim;
var sanitizer, sanitizerAnim;
var door, doorAnim;
var lifeCount=2;
var mousePos;

//Variables required for level 2
var player, playerAnim;
var playerY = 270, changeVal = 90;
var track, track2, trackAnim;
var vaccine, vaccineAnim, vaccineGrp, collectAudio, vaccineCount=0;
var vaccineDisp;
var virus=null, virusAnim, virusHealth = 100, virusXSpeed = .25;
var heightVal;
var xVelocity = -5;
var score = 0;

function preload() {
  //Loading all image/animation for level 1
  houseStarter = loadImage("sprites/Level1Spr/startHouse.jpg");
  maskAnim = loadImage("sprites/Level1Spr/faceMask.png");
  sanitizerAnim = loadImage("sprites/Level1Spr/sanitizer.png");
  doorAnim = loadImage("sprites/Level1Spr/door.png")
  //Loading all image/animation for level 2
  trackAnim = loadImage("sprites/Level2Spr/track.png");
  playerAnim = loadAnimation("sprites/Level2Spr/RunnerAnim/RunMan1.png", "sprites/Level2Spr/RunnerAnim/RunMan2.png",
                             "sprites/Level2Spr/RunnerAnim/RunMan3.png","sprites/Level2Spr/RunnerAnim/RunMan4.png",
                             "sprites/Level2Spr/RunnerAnim/RunMan5.png", "sprites/Level2Spr/RunnerAnim/RunMan6.png",
                             "sprites/Level2Spr/RunnerAnim/RunMan7.png","sprites/Level2Spr/RunnerAnim/RunMan8.png");
  vaccineAnim = loadImage("sprites/Level2Spr/VaccineIMG.png");
  collectAudio = loadSound("sprites/Level2Spr/collectAudio.mp3");
  virusAnim = loadImage("sprites/Level2Spr/virusAI.png")
}

function setup(){
  createCanvas(1200, 600);

  //Main function for creating the whole of level 2
  //setupLevel1();

  //Main function for creating the whole of level 2
  setupLevel2();
}

function draw() {
  background("white");

  //Main function for running the whole of level 2
  //drawLevel1();
  //console.log(lifeCount)

  //Main function for running the whole of level 2
  drawLevel2();


  drawSprites();
}

//Functions for level 1
function mouseClicked() {
  if (mouseButton === LEFT) {
    if (mask != null) {
      if (mousePos.isTouching(mask)) {
        lifeCount += 1;
        mask.visible = false;
        mask = null;
      }
    }

    if (sanitizer != null) {
        if (mousePos.isTouching(sanitizer)) {
          lifeCount += 1;
          sanitizer.visible = false;
          sanitizer = null;
      }
    }
  }


}

//Main setup function for level 1
function setupLevel1() {
  //Making mask
  mask = createSprite(685, 250, 10, 10);
  mask.scale = .5;
  mask.addImage(maskAnim);
  mask.setCollider("rectangle", 0, 0, 110, 125);

  //Making rectangle around mouse;
  mousePos = createSprite(mouseX, mouseY, 5, 5);
  mousePos.visible = false;

  //Making sanitizer
  sanitizer = createSprite(700, 345, 10, 10);
  sanitizer.scale = .5;
  sanitizer.addImage(sanitizerAnim);

  //Making door for going out of house
  door = createSprite(852, 298, 10, 10);
  door.scale = .2015;
  door.addImage(doorAnim);
}
// Main draw function for level 1
function drawLevel1() {
  mousePos.x = mouseX;
  mousePos.y = mouseY;

  mouseHover(mask, .5, "mask", .1);
  mouseHover(sanitizer, .5, "sanitizer", .1);
  mouseHover(door, .2015, "door", .015);
}

function mouseHover(item, scaling, name, scaleAdd) {
  if (item != null) {
    if (mousePos.isTouching(item)) {
      item.scale = scaling + scaleAdd;
      fill("red");
      textSize(25)
      text("Are you sure you want to use the " + name + "?", 350, 25);
    } else {
      item.scale = scaling;
    }
  }
}


//Functions for level 2
//Function related to road and speed/score
function trackReset() {
  if (track.x + 700 < 0) {
    //noLoop();
    track.x = track2.x + 1385;
  }

  if (track2.x + 700 < 0) {
    track2.x = track.x + 1395;
  }
}
function scoreIncr() {
  score += .5;
}
function speedIncr() {
  if (frameCount % 125 === 0 && frameCount > 0) {
    xVelocity -= 1;
  }
}

//Functions related to vaccine
function spawnVacc() {
  if (frameCount % 40 === 0) {
    var randVal = Math.round(random(0, 4));

    //Giving properties to vaccine sprite
    vaccine = createSprite(displayWidth, heightVal[randVal] + 35, 10, 10);
    vaccine.addImage(vaccineAnim);
    vaccine.scale = .14;
    vaccine.setCollider("rectangle", 0, 0, 500, 512);

    //Adding vaccine to vaccine group
    vaccineGrp.add(vaccine);
  }
}
function vaccineColl() {
  for (var i = 0; i < vaccineGrp.length; i++) {
    if (player.isTouching(vaccineGrp.get(i))) {
      collectAudio.play();
      vaccineGrp.get(i).destroy();
      vaccineCount++;
      
      if (virus != null) {
        virusXSpeed -= 0.015;
        virusHealth -= 10;
      }
    }
  }
}
function destroyVacc() {
  for (var i = 0; i < vaccineGrp.length; i++) {
    if (vaccineGrp.get(i).x < 0) {
      vaccineGrp.get(i).destroy();
    }
  }
}
function displayVaccCount() {
  fill("blue")
  textSize(40);
  text(" = " + vaccineCount, vaccineDisp.x + 30, vaccineDisp.y + 15);
}

//Main setup function for level 2
function setupLevel2() {
  //Making two tracks for smooth illusion
  track = createSprite(displayWidth / 2.5, displayHeight / 3 + 50, 50, 50);
  track.scale = 0.85;
  track.addImage(trackAnim);

  track2 = createSprite(track.x + 1395, displayHeight / 3 + 50, 50, 50);
  track2.scale = 0.85;
  track2.addImage(trackAnim);

  //Making player sprite
  player = createSprite(displayWidth / 6, playerY, 50, 50);
  player.addAnimation("p1Anim", playerAnim);
  player.scale = 0.55;
  player.setCollider("rectangle", 0, 55, 130, 125);
  //player.debug = true;

  vaccineDisp = createSprite(displayWidth - 300, 40, 10, 10);
  vaccineDisp.addImage(vaccineAnim);
  vaccineDisp.scale = .14;
  vaccineDisp.setCollider("rectangle", 0, 0, 500, 512);

  //Making list of all y position for random generation of obstacles
  heightVal = [playerY - (changeVal * 2), playerY - changeVal, playerY, playerY + changeVal, playerY + (2 * changeVal)];

  //Creating group for vaccine
  vaccineGrp = createGroup();

  //Calling scoreIncr function every .2 Seconds
  setInterval(scoreIncr, 200);
}

// Main draw function for level 2
function drawLevel2() {
  //Infinite Road Illusion
  track.velocityX = xVelocity;
  track2.velocityX = xVelocity;

  //Giving speed and lifetime to vaccines in vaccineGrp
  vaccineGrp.setVelocityEach(xVelocity, 0);

  console.log(virusHealth)

  //Calling functions
  trackReset();
  speedIncr();

  spawnVacc();
  vaccineColl();
  destroyVacc();
  displayVaccCount();

  spawnVirus();
  virusKill();
  updateVirusSpeed();
  virusCollide();
}

//General function
function keyReleased() {
  if (keyCode === UP_ARROW) {
    if (playerY > heightVal[0]) {
      playerY -= changeVal;
      while (player.y >  playerY) {
        player.y -= 0.5;
        if (virus != null ) {
          virus.y -= 0.5;
        }
      }
    }
  }

  if (keyCode === DOWN_ARROW) {
    if (playerY < heightVal[4]) {
      playerY += changeVal;
      while (player.y < playerY) {
        player.y += 0.5;
        if (virus != null) {
          virus.y += 0.5;
        }
      }
    }
  }
}

//Functions related to virus
function spawnVirus() {
  if (frameCount % 100 === 0 && virus === null) {

    //Giving properties to vaccine sprite
    virus = createSprite(0, player.y + 35, 10, 10);
    virus.addImage(virusAnim);
    virus.scale = 0.8;
    virus.velocityX = virusXSpeed;
    virus.setCollider("rectangle", 0, 0, 110, 100)
  }
}
function virusKill() {
  if (virusHealth === 0) {
    virus.visible = false;
    virus = null;
    virusHealth = 100;
    virusXSpeed = 0.25;
  }
}
function updateVirusSpeed() {
  if (virus != null) {
    virus.velocityX = virusXSpeed;
  }
}
function virusCollide() {
  if (virus != null) {
    if (virus.isTouching(player)) {
      virus.visible = false;
      vaccineCount -= 5;
      virus = null;
    }
  }
}


//To use gif Image -
/*gifSee = createImg("sprites/Level1Spr/endScene.gif"); //In function preload()
gifSee.position(0, 0); // In function draw()
*/
