class Ship {
    constructor(height, width) {
        this.height = height;
        this.width = width;
        this.xpos = 450;
        this.ypos = 650;
        this.lives = 3;
    }

    get topRight() {
        return this.xpos +this.width
    }

    get topMiddle() {
        return this.xpos + this.width/2
    }

    show() {
        image(ship1_sprite, this.xpos, this.ypos, this.width, this.height)
        if (keyIsDown(LEFT_ARROW)) {
            this.moveLeft()
          } else if (keyIsDown(RIGHT_ARROW)) {
            this.moveRight()
          }
    }

    shoot() {
        if (!bullet.active) {
            bullet.shoot(this.topMiddle - bulletWidth/2, this.ypos - bulletHeight/2)
        }
    }

    moveLeft() {
        if (this.xpos >= 0) { 
        this.xpos -= playerSpeed
        }
    }

    moveRight() {
        if (this.topRight <= canvasWidth)
        this.xpos += playerSpeed
    }

    kill () {
        this.xpos = playerStartX;
        this.lives -= 1
        invaderBullet.active = false;
        if (this.lives <= 0) {
            gameState = 'game-over'
        }
    }
}