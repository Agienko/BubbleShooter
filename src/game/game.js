import {Scene} from "../components/scene.js";
import {BubbleGun} from "../components/bubble-gun.js";
import {collision} from "../collision/collision.js";
import {app} from "../../app.js";
import {CANVAS_WIDTH} from "../constants/constants.js";

export class Game{
    constructor(stage, descriptor, resources) {
        this.stage = stage
        this.descriptor = descriptor
        this.resources = resources

        this.velocity = 20
        this.crashFlag = false

        this.scene = new Scene(stage, descriptor, resources)
        this.bubbleGun = new BubbleGun(stage, descriptor, resources)
        this.inMove = new PIXI.Container()
        this.stage.addChild(this.inMove)

        this.sameColorsArr = new Set()




        this.init()
    }
    init(){
        const root = document.querySelector('#root')
        const canvas = root.firstChild

        root.addEventListener('pointerup', ()=>{
            if(!this.inMove.children.length){

                this.inMove.addChild(this.bubbleGun.fire(this.velocity))
                this.crashFlag = false
            }
        })

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

                    // walls Rebound
                if(movingBall.x - movingBall.radius < 0
                    || movingBall.x + movingBall.radius > CANVAS_WIDTH) movingBall.reboundX()

                this.scene.children.forEach(staticBall =>{
                    if(!this.crashFlag && !staticBall.isEmpty && collision(staticBall.mask, movingBall.mask)) {
                        movingBall.stop()
                        this.crashFlag = true

                        let currentI
                        if(movingBall.x - staticBall.x >= 0 && staticBall.coords[1] % 2 !== 0){currentI = staticBall.coords[0] + 1}
                        if(movingBall.x - staticBall.x < 0 && staticBall.coords[1] % 2 !== 0){currentI = staticBall.coords[0] }
                        if(movingBall.x - staticBall.x >= 0 && staticBall.coords[1] % 2 === 0){currentI = staticBall.coords[0]}
                        if(movingBall.x - staticBall.x < 0 && staticBall.coords[1] % 2 === 0){currentI = staticBall.coords[0] -1}
                        let currentJ = staticBall.coords[1] + 1

                        let current = this.scene.find(currentI, currentJ)
                        current.empty(false)
                        current.tint(movingBall.getColor())
                        this.inMove.removeChildren()
                        movingBall.destroy()
                        this.bubbleGun.createProjectile()



                        //////////////////////////////////////////
                        this.checkSameColors(current)
                        if(this.sameColorsArr.size >= 3){
                            this.sameColorsArr.forEach(i=> i.empty(true))
                        }
                        this.sameColorsArr.clear()

                    } else if(!this.crashFlag && movingBall.y < movingBall.radius){
                        movingBall.stop()
                        this.crashFlag = true
                        let currentI = Math.round((movingBall.x - 35)/CANVAS_WIDTH*11)

                        let current = this.scene.find(currentI, 0)
                        current.empty(false)
                        current.tint(movingBall.getColor())
                        this.inMove.removeChildren()
                        movingBall.destroy()
                        this.bubbleGun.createProjectile()

                        //////////////////////////////////////////
                        this.checkSameColors(current)
                        if(this.sameColorsArr.size >= 3){
                            this.sameColorsArr.forEach(i=> i.empty(true))
                        }
                        this.sameColorsArr.clear()



                    }
                })
            })
        })
    }

    checkSameColors(currentBall){
        let i = currentBall.coords[0]
        let j = currentBall.coords[1]
        let color = currentBall.getColor()

      this.sameColorsArr.add(currentBall)



        if(j % 2 === 0) {
             // четные

            for (let k = 1; ; k++){// по этому ряду
                let checkedBall = this.scene.find(i - k, j)
                if(i-k >= 0 && checkedBall.getColor() === color && !checkedBall.isEmpty){
                    this.sameColorsArr.add(checkedBall)
                } else {
                    break
                }
            }

            for (let k = 1; ; k++){// по этому ряду
                let checkedBall = this.scene.find(i + k, j)
                if(i+k <= 10 && checkedBall.getColor() === color && !checkedBall.isEmpty){
                    this.sameColorsArr.add(checkedBall)
                } else {
                    break
                }
            }



            // ряд выше
            for (let k = 1; ; k++){
                let checkedBall = this.scene.find(i - k,j-1)
                if(i-k >=0 && j-1 >=0  && checkedBall.getColor() === color && !checkedBall.isEmpty ){
                    // this.sameColorsArr.add(checkedBall)
                    this.checkSameColors(checkedBall)
                } else {
                    break
                }
            }


            for (let k = 0; ; k++){
                let checkedBall = this.scene.find(i + k,j-1)
                if(i+k <= 9 && j-1 >=0 && checkedBall.getColor() === color && !checkedBall.isEmpty  ){
                    // this.sameColorsArr.add(checkedBall)
                    this.checkSameColors(checkedBall)
                } else {
                    break
                }
            }





        } else {
                // нечетные

            for (let k = 1; ; k++){// по этому ряду
                let checkedBall = this.scene.find(i - k, j)
                if(i-k >= 0 && checkedBall.getColor() === color && !checkedBall.isEmpty){
                    this.sameColorsArr.add(checkedBall)
                } else {
                    break
                }
            }

            for (let k = 1; ; k++){// по этому ряду
                let checkedBall = this.scene.find(i + k, j)
                if(i+k <= 9 && checkedBall.getColor() === color && !checkedBall.isEmpty){
                    this.sameColorsArr.add(checkedBall)
                } else {
                    break
                }
            }



                // ряд выше
            for (let k = 0; ; k++){//начало с 0
                let checkedBall = this.scene.find(i - k,j-1)
                if(i-k >=0 && j-1 >=0 && checkedBall.getColor() === color && !checkedBall.isEmpty ){
                    // this.sameColorsArr.add(checkedBall)
                    this.checkSameColors(checkedBall)
                } else {
                    break
                }
            }

            for (let k = 1; ; k++){// начало с 1
                let checkedBall = this.scene.find(i + k,j-1)
                if(i+k <= 10 && j-1 >=0 && checkedBall.getColor() === color && !checkedBall.isEmpty ){
                    // this.sameColorsArr.add(checkedBall)
                    this.checkSameColors(checkedBall)
                } else {
                    break
                }
            }







        }
        // if(this.sameColorsArr.size >= 3){
        //     this.sameColorsArr.forEach(i=> i.empty(true))
        // }
        // this.sameColorsArr.clear()



    }
}






