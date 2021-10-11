import {sketch} from "./components/sketch.js";
import {transformer} from "./components/transformer.js";
import {fractal} from "./components/fractal.js";

export const mockr = {
    startUp: (canvasId, contextWrapper) => {
        sketch.setup(canvasId, contextWrapper)
    },

    cleanUp: () => {
        sketch.cleanUp()
    },

    fitCanvas: (offsetElement) => {
        let element = document.querySelector(offsetElement)
        sketch.fitCanvasToScreen(element.clientHeight)
    }


}