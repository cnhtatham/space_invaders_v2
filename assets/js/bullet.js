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

