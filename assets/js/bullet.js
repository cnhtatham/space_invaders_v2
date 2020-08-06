class Bullet {
    constructor() {
        this.width = bulletWidth;
        this.height = bulletHeight;
        this.active = false;
        this.xpos;
        this.ypos;
    }


    shoot(xpos, ypos) {
        this.xpos = xpos;
        this.ypos = ypos;
        this.active = true;
    }

    reset() {
        this.active = false
    }

    show() {
        if (this.active) {
            image(bullet1_sprite, this.xpos, this.ypos, this.width, this.height);
            this.moveUp();
        }
    }


    moveUp() {
        if (this.ypos >= 0) {
            this.ypos -= bulletSpeed;
        } else {
            this.active = false;
        }
    }
}

class InvaderBullet {
    constructor() {
        this.xpos;
        this.ypos;
        this.active = false;
        this.image = invaderbullet1_sprite
        this.width = invaderBulletWidth;
        this.height = invaderBulletHeight;
    }

    moveDown() {
        if (this.ypos <= canvasHeight) {
            this.ypos += invaderBulletSpeed;
        } else {
            this.active = false;
        }
    }

    show() {
        if (this.active) {
            image(this.image, this.xpos, this.ypos, this.width, this.height);
            this.moveDown()
        }
    }
}