import {CANVAS_BG_COLOR, CANVAS_HEIGHT, CANVAS_WIDTH} from "./src/constants/constants.js";
import {loader} from "./src/loader/loader.js";
import {descriptor} from "./descriptor/descriptor.js";
import {Game} from "./src/game/game.js";

export const app = new PIXI.Application({
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
    backgroundColor: CANVAS_BG_COLOR
})

loader.load((_, resources) =>{
    document.body.style.opacity = 1
    const game = new Game(app.stage, descriptor, resources)

})

root.appendChild(app.view)





