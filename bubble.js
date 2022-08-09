export class Bubble extends PIXI.Container {
    constructor(coords, color = 0xffffff) {
        super();
        this.coords = coords
        this.color = color
        this.isEmpty = false

        this.vx = 0
        this.vy = 0
        
        this.sprite = new PIXI.Sprite.from('./res/sphere.png')
        this.sprite.anchor.set(0.5)
        this.sprite.width = 70
        this.sprite.height = 70
        this.radius = this.sprite.width/2


        this.mask = new PIXI.Graphics()
        this.mask.lineStyle(0); // draw a circle, set the lineStyle to zero so the circle doesn't have an outline
        this.mask.beginFill(0xffffff, 1);
        this.mask.drawCircle(0, 0, 34);
        this.mask.endFill();

        this.sprite.mask =  this.mask

        this.tint(color)

        this.alpha = this.isEmpty ? 0.4 : 1

        this.addChild(this.sprite, this.mask)
    }
    tint(color){
        this.sprite.tint = color
    }
    empty(bool){
        this.isEmpty = bool
        this.alpha = this.isEmpty ? 0.4 : 1
    }
    reboundX(){
        this.vx *= -1
    }
    reboundY(){
        this.vy *= -1
    }
}
