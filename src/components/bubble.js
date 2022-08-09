export class Bubble extends PIXI.Container {
    constructor(coords, color = 0xffffff) {
        super();
        this.coords = coords

        this.isEmpty = false

        this.vx = 0
        this.vy = 0

        this.sprite = new PIXI.Sprite.from('../res/img/sphere.png')
        this.sprite.anchor.set(0.5)
        this.sprite.tint = color
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
    getColor(){
        return this.sprite.tint
    }
    tint(color){

        this.sprite.tint = color
    }
    empty(bool){
        this.isEmpty = bool
        this.alpha = this.isEmpty ? 0.1 : 1
    }
    reboundX(){
        this.vx *= -1
    }
    reboundY(){
        this.vy *= -1
    }
    stop(){
        this.vx = 0
        this.vy = 0
    }
    getAroundCoords(){

       let i = this.coords[0]
       let j = this.coords[1]

        if (j % 2 === 0){
            const line1 = [[i-1,j-1], [i, j-1]].filter(cord => cord[0] >=0 && cord[1] >=0 && cord[0] <= 9)
            const line2 = [[i-1, j],[i,j], [i+1, j]].filter(cord => cord[0] >=0 && cord[1] >=0 && cord[0] <= 10)
            const line3 = [ [i-1, j+1], [i, j+1]].filter(cord => cord[0] >=0 && cord[1] >=0 && cord[0] <= 9)
            return [...line1, ...line2, ...line3]
        } else {
            const line1 = [[i, j-1], [i+1, j-1]].filter(cord => cord[0] >=0 && cord[1] >=0 && cord[0] <= 10)
            const line2 = [[i-1, j],[i,j], [i+1, j]].filter(cord => cord[0] >=0 && cord[1] >=0 && cord[0] <= 9)
            const line3 = [[i, j+1], [i+1, j+1]].filter(cord => cord[0] >=0 && cord[1] >=0 && cord[0] <= 10)
            return [...line1, ...line2, ...line3]
        }

    }
    isNear(ballX, ballY) {
        let aroundArr = this.getAroundCoords().filter(coords => coords[0] === ballX && coords[1] === ballY)

        return aroundArr.length === 1
    }

}
