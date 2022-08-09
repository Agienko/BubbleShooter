import {Bubble} from "./bubble.js";

const app = new PIXI.Application({width: 770, height: 1100, backgroundColor: 0x608CD5})
root.appendChild(app.view)


for (let i = 0; i < 11 ; i++){
    for(let j = 0; j < 17; j++){
        let randomColor = [0x1614e9, 0x0dc70d,0xde1322,0xe8e21b][Math.floor(Math.random()*4)]
        const bubble = new Bubble([i, j], randomColor)
        if(j % 2 && i === 10) continue
        if( j > 9) {
            bubble.empty(true)
            bubble.tint(0xffffff)
        }
        bubble.x = (j % 2 ? 70 : 35) + i * 70,
        bubble.y = 35 + j * Math.sqrt(70 ** 2 - 35 ** 2)
        app.stage.addChild(bubble)
    }
}


let arrow = new PIXI.Sprite.from('./res/arrow.png')
arrow.scale.set(0.13, 0.05)
arrow.anchor.set(0, 0.5)
arrow.position.set(app.screen.width/2, app.screen.height)
arrow.alpha = 0.5
app.stage.addChild(arrow)


let gun = new Bubble()
gun.position.set(app.screen.width/2, app.screen.height)
app.stage.addChild(gun)


let cos = 0
root.firstChild.addEventListener('pointermove', (e)=>{

    let deltaX = app.screen.width/2 - e.offsetX
    let deltaY = Math.sqrt((app.screen.height - e.offsetY) ** 2 + deltaX ** 2)
     cos = deltaX/deltaY

    arrow.rotation = -Math.acos(-cos)

})

const vx = 10
const bubbles = []

app.ticker.add(delta =>{
    bubbles.forEach(bubble => {
        bubble.y -= bubble.vy
        bubble.x -= bubble.vx

        if(bubble.x - bubble.radius < 0 || bubble.x + bubble.radius > app.screen.width) bubble.reboundX()

    })



})






document.addEventListener('pointerup', ()=>{
    const bubble = new Bubble(0x0dc70d)
    bubble.vx = vx * cos
    bubble.vy = vx * (1 - cos ** 2) ** 0.5
    bubble.position.set(app.screen.width/2, app.screen.height)
    bubbles.push(bubble)
    app.stage.addChild(bubble)


})
