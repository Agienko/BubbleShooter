import {Scene} from "../components/scene.js";
import {BubbleGun} from "../components/bubble-gun.js";
import {collision} from "../collision/collision.js";
import {app} from "../../app.js";

export class Game{
    constructor(stage, descriptor, resources) {
        this.stage = stage
        this.descriptor = descriptor
        this.resources = resources

        this.velocity = 15
        this.flag = false

        this.scene = new Scene(stage, descriptor, resources)
        this.bubbleGun = new BubbleGun(stage, descriptor, resources)
        this.inMove = new PIXI.Container()
        this.stage.addChild(this.inMove)

        this.init()
    }
    init(){
        root.addEventListener('pointerup', ()=>{
            this.flag = false
            this.inMove.addChild(this.bubbleGun.fire(this.velocity))
        })
        const canvas = root.firstChild
        canvas.addEventListener('pointermove', (e)=>{
            this.bubbleGun.follow(e.offsetX, e.offsetY)
        })

        this.ticker()

    }

    ticker(){
        app.ticker.add(delta =>{
            this.inMove.children.forEach(movingBall => {
                movingBall.y -= movingBall.vy
                movingBall.x -= movingBall.vx


                if(movingBall.x - movingBall.radius < 0
                    || movingBall.x + movingBall.radius > app.screen.width) movingBall.reboundX()

                this.scene.children.forEach(place =>{
                    if(!this.flag && !place.isEmpty && collision(place.mask, movingBall.mask)) {
                        movingBall.stop()
                        this.flag = true
                        let currentI
                        if(movingBall.x - place.x >= 0 && place.coords[1] % 2 !== 0){currentI = place.coords[0] + 1; console.log(+1)}
                        if(movingBall.x - place.x < 0 && place.coords[1] % 2 !== 0){currentI = place.coords[0] ; console.log(0)}
                        if(movingBall.x - place.x >= 0 && place.coords[1] % 2 === 0){currentI = place.coords[0] ; console.log(0)}
                        if(movingBall.x - place.x < 0 && place.coords[1] % 2 === 0){currentI = place.coords[0] -1; console.log(-1)}
                        let currentJ = place.coords[1] + 1

                        let current = this.scene.find(currentI, currentJ)
                        current.empty(false)
                        current.tint(movingBall.getColor())
                        this.inMove.removeChildren()
                        movingBall.destroy()
                    }
                })
            })
        })
    }
}






