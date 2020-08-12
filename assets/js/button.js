class MenuButton {
    constructor(xpos, ypos, width, height, text) {
        this.xpos = xpos;
        this.ypos = ypos;
        this.width = width;
        this.height = height;
        this.text = text;
        
        this.hoverColor = 100;
        this.fillColor = 0;
    }

    get mouseWithinRect() {
        if(this.xpos <= mouseX && mouseX <= this.xpos + this.width && this.ypos <= mouseY && mouseY <= this.ypos + this.height) {
            return true
        } else {
            return false
        }
    }
    

    get textColor() {
        if(this.mouseWithinRect) {
            return this.hoverColor
        } else {
            return this.fillColor
        }
    }

    show() {
        fill(255);
        rect(this.xpos, this.ypos, this.width, this.height);

        fill(this.textColor)
        textAlign(CENTER, CENTER)
        textSize(100)
        text(this.text, this.xpos + this.width / 2, this.ypos + this.height / 2)
    }
}