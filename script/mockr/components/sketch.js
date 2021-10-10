export const sketch = {
    canvas: null,

    context: null,

    color: '#000',

    width: 1.5,

    height: 1.5,

    setup: (canvasId, contextWrapper) => {
        this.canvas = document.querySelector(canvasId);
        this.context = this.canvas.getContext(contextWrapper);
    },

    /**
     * Clear drawings on canvas
     */
    cleanUp: () => {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },

    /**
     * Resize canvas size to fit screen
     *
     * @param canvasId
     * @param offset
     */
    fitCanvasToScreen: (canvasId, offset) => {
        let canvas = document.querySelector(canvasId);
        if (!offset) offset = 0;

        canvas.height = document.innerHeight - offset;
        canvas.width = document.innerWidth;
    },

    /**
     * Set stroke color
     *
     * @param newColor
     */
    setColor: (newColor) => {
        this.color = newColor;
    },

    /**
     * Change line thickness
     * @param newSize
     */
    setLineSize: (newSize) => {
        this.width = newSize;
        this.height = newSize;
    },

    /**
     * Paints a point
     * @param coordinate
     */
    dot: (coordinate) => {
        this.context.fillStyle = this.color;
        this.context.fillRect(coordinate.x, coordinate.y, this.width, this.height)
    },

    /**
     * Paints a circle from the origin
     *
     * @param origin
     * @param radius
     */
    circle: (origin, radius) => {
        for (let i = 0; i < 360; i++) {
            let x = origin.x + Math.cos(i) * radius;
            let y = origin.y + Math.sin(i) * radius;

            this.dot(x, y, 1.5, 1.5);
        }
    },

    /**
     * Paints a line between two points
     * @param point1
     * @param point2
     */
    line: (point1, point2) => {
        point1.x |= 0;
        point1.y |= 0;
        point2.x |= 0;
        point2.y |= 0;

        let dx = point2.x - point1.x;
        let dy = point2.y - point1.y;

        let sx = (dx > 0) - (dx < 0);
        let sy = (dy > 0) - (dy < 0);

        dx *= sx;
        dy *= sy;


        this.dot(point1.x, point1.y);

        if (!(dx || dy)) {
            return;
        }

        let d = 0;
        let x = point1.x;
        let y = point1.y;
        let v;

        if (dy < dx) {
            for (v = 0 | (dy << 15) / dx * sy; x ^ point2.x; x += sx, d &= 32767) {
                this.dot(x, y += (d += v) >> 15, 1.5, 1.5);
            }
        } else {
            for (v = 0 | (dx << 15) / dy * sx; y ^ point2.y; y += sy, d &= 32767) {
                this.dot(x += (d += v) >> 15, y, 1.5, 1.5);
            }
        }
    }
}