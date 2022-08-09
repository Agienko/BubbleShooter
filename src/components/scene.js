import {Bubble} from "./bubble.js";

export class Scene  extends PIXI.Container{
    constructor(stage, descriptor, resources) {
        super();

        this.create()
        stage.addChild(this)
    }
    create(){
        for (let i = 0; i < 11 ; i++){
            for(let j = 0; j < 17; j++){
                let randomColor = [0x1614e9, 0x0dc70d,0xde1322,0xe8e21b][Math.floor(Math.random()*4)]
                const bubble = new Bubble([i, j], randomColor)
                if(j % 2 && i === 10) continue
                if( j > 9) {
                    bubble.empty(true)
                    bubble.tint(0xffffff)
                }
                bubble.x = (j % 2 ? 70 : 35) + i * 70
                bubble.y = 35 + j * Math.sqrt(70 ** 2 - 35 ** 2)
                this.addChild(bubble)
            }
        }
    }
    find(x, y){
        return this.children.filter(bubble => bubble.coords[0] === x && bubble.coords[1] === y)[0]
    }
}
