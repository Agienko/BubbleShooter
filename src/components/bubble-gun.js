import {Bubble} from "./bubble.js";
import {CANVAS_HEIGHT, CANVAS_WIDTH} from "../constants/constants.js";

export class BubbleGun {
constructor(stage, descriptor, resources) {
    this.stage = stage
    this.cos = 0

    this.arrow = new PIXI.Sprite(resources.arrow.texture)
    this.arrow.scale.set(0.15, 0.05)
    this.arrow.anchor.set(0.15, 0.5)
    this.arrow.position.set(CANVAS_WIDTH/2, CANVAS_HEIGHT)
    this.arrow.alpha = 0.7
    this.arrow.rotation = -Math.PI/2
    this.stage.addChild(this.arrow)

    this.createProjectile()


    }
    createProjectile(){
        let randomColor = [0x1614e9, 0x0dc70d,0xde1322,0xe8e21b][Math.floor(Math.random()*4)]
        this.projectile = new Bubble([], randomColor)
        this.projectile.position.set(CANVAS_WIDTH/2, CANVAS_HEIGHT)
        this.stage.addChild(this.projectile)

    }
    follow(x,y){
        let deltaX = CANVAS_WIDTH/2 - x
        let deltaY = Math.sqrt((CANVAS_HEIGHT - y) ** 2 + deltaX ** 2)
        this.cos = deltaX/deltaY
        this.arrow.rotation = -Math.acos(-this.cos)
    }

    fire(velocity){
        this.projectile.vx = velocity * this.cos
        this.projectile.vy = velocity * this.getSin()
        return this.projectile
    }
    getSin(){
    return (1 - this.cos ** 2) ** 0.5
    }
}


