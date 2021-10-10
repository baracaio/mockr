import {sketch} from "./components/sketch";
import {transformer} from "./components/transformer";
import {fractal} from "./components/fractal";

export const mockr = {
    sketch: null,
    fractal: null,
    transformer: null,

    startUp: (canvasId, contextWrapper) => {
        this.sketch = sketch;
        this.sketch.setup(canvasId, contextWrapper)

        this.fractal = fractal
        this.transformer = transformer
    },

    cleanUp: () => {
        this.sketch.cleanUp()
    }
}