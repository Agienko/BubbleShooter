import {Bubble} from "./bubble.js";
import {CANVAS_HEIGHT, CANVAS_WIDTH} from "../constants/constants.js";

export class BubbleGun {
constructor(stage, descriptor, resources) {
    this.stage = stage
    this.cos = 0
    console.log(resources.arrow.texture)
    this.arrow = new PIXI.Sprite(resources.arrow.texture)
    this.arrow.scale.set(0.13, 0.05)
    this.arrow.anchor.set(0, 0.5)
    this.arrow.position.set(CANVAS_WIDTH/2, CANVAS_HEIGHT)
    this.arrow.alpha = 0.7
    this.arrow.rotation = -Math.PI/2
    this.stage.addChild(this.arrow)

    // this.projectile = new Bubble()
    // this.projectile.position.set(CANVAS_WIDTH/2, CANVAS_HEIGHT)
    // this.stage.addChild(this.projectile)

    }
    follow(x,y){
        let deltaX = CANVAS_WIDTH/2 - x
        let deltaY = Math.sqrt((CANVAS_HEIGHT - y) ** 2 + deltaX ** 2)
        this.cos = deltaX/deltaY
        this.arrow.rotation = -Math.acos(-this.cos)
    }

    fire(velocity){
        let randomColor = [0x1614e9, 0x0dc70d,0xde1322,0xe8e21b][Math.floor(Math.random()*4)]
        const bubble = new Bubble([], randomColor)
        bubble.vx = velocity * this.cos
        bubble.vy = velocity * this.getSin()
        bubble.position.set(CANVAS_WIDTH/2, CANVAS_HEIGHT)
        this.stage.addChild(bubble)
        return bubble
    }
    getSin(){
    return (1 - this.cos ** 2) ** 0.5
    }
}


