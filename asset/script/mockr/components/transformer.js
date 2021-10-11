export const transformer = {
    sketch: null,

    setup: (sketch) => {
        this.sketch = sketch;
        return this
    },

    cleanUp: () => {
        this.sketch.cleanUp()
    }
}