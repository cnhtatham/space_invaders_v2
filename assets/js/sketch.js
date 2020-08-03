let ship1_sprite;
let bullet1_sprite;
let invader1_sprite;
let invader2_sprite;
let invader3_sprite;
let invader_sprites;
let player;
let bullet;
let invaders;


// General Config Options
let playerSpeed = 5;
let playerWidth = 100;
let playerHeight = 100;

let bulletSpeed = 8;
let bulletWidth = 20;
let bulletHeight = 100;

let invaderSpeed = 3;
let invaderWidth = 50;
let invaderHeight = 30;
let invaderRowCount = 5;
let invaderRowLength = 10;
let invaderXpadding = 10;
let invaderYpadding = 10;


let canvasWidth = 1000;
let canvasHeight = 750;

function preload() {
  ship1_sprite = loadImage('assets/images/SF01.png');
  bullet1_sprite = loadImage('assets/images/bullet1.png');
  invader1_sprite = loadImage('assets/images/invader1.png');
  invader2_sprite = loadImage('assets/images/invader2.png');
  invader3_sprite = loadImage('assets/images/invader3.png');
  invader_sprites = [invader1_sprite, invader2_sprite, invader3_sprite]
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  player = new Ship(playerWidth, playerHeight);
  bullet = new Bullet();
  invaders = new Invaders();
}


function draw() {
  background(0);
  player.show();
  bullet.show();
  invaders.show();
  detectCollisions();
}

function keyPressed() {
  if (key === ' ') {
    player.shoot();
  }
}


function bulletInvaderCollision() {
  let inv;
  if (!bullet.active) {
    return;
  }
  for (let i = 0; i < invaderRowCount; i++) {
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
          invaders.kill(i,j)
          bullet.reset()
      }
    }
  }
}


function detectCollisions() {
  bulletInvaderCollision()
}