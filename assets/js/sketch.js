//Global Variables
let ship1_sprite;
let bullet1_sprite;
let invader1_sprite;
let invader2_sprite;
let invader3_sprite;
let invader_sprites;
let invaderbullet1_sprite
let player;
let bullet;
let invaders;
let invaderBullet;
let gameFont;
let gameState = 'play'
let gameOverMMButton;
let gameOverRetryButton;


// General Config Options

//Player config options
let playerSpeed = 5;
let playerWidth = 100;
let playerHeight = 100;
let playerStartX = 450;
let playerStarty = 650;


//player bullet config options
let bulletSpeed = 8;
let bulletWidth = 20;
let bulletHeight = 100;


//invader bullet config options
let invaderBulletSpeed = 7;
let invaderBulletWidth = 20;
let invaderBulletHeight = 20;


//invader options
let invaderSpeed = 3;
let invaderWidth = 50;
let invaderHeight = 30;
let invaderRowCount = 5;
let invaderRowLength = 10;
let invaderXpadding = 10;
let invaderYpadding = 10;
let invaderStartingXpos = 30;
let invaderStartingYpos = 30;


//canvas options
let canvasWidth = 1000;
let canvasHeight = 750;

let gameOverButtonWidth = 400;
let gameOverButtonHeight = 100;


//Preload function loads all image assets, executes before setup function
function preload() {
  ship1_sprite = loadImage('assets/images/SF01.png');
  bullet1_sprite = loadImage('assets/images/bullet1.png');
  invader1_sprite = loadImage('assets/images/invader1.png');
  invader2_sprite = loadImage('assets/images/invader2.png');
  invader3_sprite = loadImage('assets/images/invader3.png');
  invaderbullet1_sprite = loadImage('assets/images/invaderbullet1.png');
  invader_sprites = [invader1_sprite, invader2_sprite, invader3_sprite]

  gameFont = loadFont('assets/fonts/Pixeboy.ttf')
}


//Setup the sketch by creating the canvas element an instanciating each class
function setup() {
  createCanvas(canvasWidth, canvasHeight);
  player = new Ship(playerWidth, playerHeight);
  bullet = new Bullet();
  invaders = new Invaders();
  invaderBullet = new InvaderBullet();
  gameOverMMButton = new MenuButton(
    canvasWidth*0.05,
    canvasHeight/2,
    gameOverButtonWidth,
    gameOverButtonHeight,
    'MAIN MENU'
  )
  gameOverRetryButton = new MenuButton(
    canvasWidth*0.55,
    canvasHeight/2,
    gameOverButtonWidth,
    gameOverButtonHeight,
    'RETRY'
  )

  textFont(gameFont, 30);
}

//Main Game loop, runs at 60fps
function draw() {
  background(0);
  if (gameState === 'play') {
    player.show();
    bullet.show();
    invaders.show();
    invaderBullet.show()
    detectCollisions();
  } else if (gameState == 'main-menu') {

  } else if (gameState == 'game-over') {
    drawGameOver()
  }
}


//Function to register spacebar press to shoot
function keyPressed() {
  if (key === ' ') {
    player.shoot();
  }
}

function restartPlayMode() {
  player.lives = 3;
  bullet.active = false;
  invaderBullet.active = false;
  invaders.reset();
  gameState = 'play';
}

//function which detects for any pixel overlap in the player bullet and each invader
//kills the relevant invader if there is one
function bulletInvaderCollision() {
  let inv;
  if (!bullet.active) {
    return;
  }
  for (let i = 0; i < invaders.rows.length; i++) {
    for (let j = 0; j < invaderRowLength; j++) {
      inv = invaders.rows[i].row[j]
      if (!inv.alive) {
        continue;
      }
      if (collideRectRect(
          bullet.xpos,
          bullet.ypos,
          bullet.width,
          bullet.height,
          inv.xpos,
          inv.ypos,
          inv.width,
          inv.height,
        )) {
        invaders.kill(i, j);
        bullet.reset();
        break;
      }
    }
  }
}


//Function that detects for any pixel overlap between the invader bullets and the player
//Kills the player if there is one
function invaderBulletShipCollision() {
  if (collideRectRect(
      invaderBullet.xpos,
      invaderBullet.ypos,
      invaderBullet.width,
      invaderBullet.height,
      player.xpos,
      player.ypos,
      player.width,
      player.height
    )) {
    player.kill();
  }
}

function drawGameOver() {
  fill(255)
  textAlign(CENTER, CENTER)
  textSize(150)
  text('GAME OVER', canvasWidth / 2, canvasHeight / 4)

  gameOverMMButton.show();
  gameOverRetryButton.show();
  
}


function mouseClicked() {
  if (gameState = 'game-over') {
    if (gameOverRetryButton.mouseWithinRect) {
      restartPlayMode()
    }
  }
}



function detectCollisions() {
  bulletInvaderCollision()
  invaderBulletShipCollision()
}
 