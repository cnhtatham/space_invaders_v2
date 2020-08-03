class Invaders {
    constructor() {
        this.xpos = 30;
        this.ypos = 30;
        this.direction = 'right';
        this.width = invaderWidth;
        this.height = invaderHeight;
        this.matrix;
        this.images = invader_sprites;
        this.rows = [];
        this._leftMostInvader = 0
        this._rightMostInvader = invaderRowLength;
        this.createRows();
    }

    set leftMostInvader(position) {
        if (position > this.leftMostInvader) {
            this._leftMostInvader = position;
        }
    }

    get leftMostInvader() {
        return this._leftMostInvader
    }

    set rightMostInvader(position) {
        if (position < this.rightMostInvader) {
            this._rightMostInvader = position;
        }
    }

    get rightMostInvader() {
        return this._rightMostInvader
    }

    createRows() {
        for (let i = 0; i < invaderRowCount; i++) {
            this.rows.push(
                new InvaderRow(
                    random(this.images),
                    this.xpos,
                    this.ypos + i * (this.height + invaderYpadding)
                )
            )
        }
    }

    getLeftMostInvader() {
        let l = [];
        for (let i = 0; i < invaderRowCount; i++) {
            l.push(this.rows[i].getLeftMostInvader());
        }
        this.leftMostInvader = Math.min(...l);
    }

    getRightMostInvader() {
        let r = [];
        for (let i = invaderRowCount - 1; i >= 0; i--) {
            r.push(this.rows[i].getRightMostInvader());
        }
        this.rightMostInvader = Math.max(...r);
    }

    changeDirection() {
        if (this.direction === 'right') {
            this.direction = 'left';
        } else {
            this.direction = 'right';
        }
    }

    moveInvaders() {
        if (this.direction === 'right') {
            this.getRightMostInvader();
            if (this.rows[0].row[this.rightMostInvader].topRight >= canvasWidth) {
                this.direction = 'left'
            }
        } else {
            this.getLeftMostInvader();
            if (this.rows[0].row[this.leftMostInvader].xpos <= 0) {
                this.direction = 'right'
            }
        }
        for (let i = 0; i < invaderRowCount; i++) {
            this.rows[i].moveInvaders(this.direction)
        }
    }

    kill(row, column) {
        this.rows[row].row[column].alive = false;
    }


    show() {
        for (let i = 0; i < this.rows.length; i++) {
            this.rows[i].show()
        }
        this.moveInvaders();
    }
}

class InvaderRow {
    constructor(image, startingXpos, startingYpos) {
        this.image = image;
        this.xpos = startingXpos;
        this.ypos = startingYpos;
        this.row = [];
        this.createRow();
    }

    createRow() {
        for (let j = 0; j < invaderRowLength; j++) {
            this.row.push(
                new Invader(
                    this.image,
                    this.xpos + j * (invaderWidth + invaderXpadding),
                    this.ypos
                )
            )
        }
    }

    moveInvaders(direction) {
        for (let j = 0; j < this.row.length; j++) {
            this.row[j].moveInvader(direction);
        }
    }


    getLeftMostInvader() {
        for (let j = 0; j < this.row.length; j++) {
            if (this.row[j].alive) {
                return j
            }
        }
        return this.row.length
    }

    getRightMostInvader() {
        let r = []
        for (let j = this.row.length - 1; j >= 0; j--) {
            if (this.row[j].alive) {
                return j
            }
        }
        return 0
    }

    show() {
        for (let j = 0; j < this.row.length; j++) {
            this.row[j].show()
        }
    }
}

class Invader {
    constructor(image, xpos, ypos) {
        this.image = image;
        this.xpos = xpos;
        this.ypos = ypos;
        this.width = invaderWidth;
        this.height = invaderHeight;
        this.alive = true;
        this.currentDirection = 'right';
    }

    get topRight() {
        return this.xpos + this.width;
    }

    moveInvader(direction) {

        if (direction !== this.currentDirection) {
            this.currentDirection = direction;
            this.ypos += this.height;
            return
        }

        if (this.currentDirection == 'right') {
            this.xpos += invaderSpeed;
        } else {
            this.xpos -= invaderSpeed;
        }
    }

    show() {
        if (this.alive) {
            image(this.image, this.xpos, this.ypos, this.width, this.height);
        }
    }
}