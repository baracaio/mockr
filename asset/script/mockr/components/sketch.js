let canvas = null;
let context = null;
let color = '#000';
let width = 1.5;
let height = 1.5;

export const sketch = {
    setup: (canvasId, contextWrapper) => {
        canvas = document.querySelector(canvasId);
        context = canvas.getContext(contextWrapper);
    },

    /**
     * Clear drawings on canvas
     */
    cleanUp: () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
    },

    /**
     * Resize canvas size to fit screen
     *
     * @param offsetH
     * @param offsetW
     */
    fitCanvasToScreen: (offsetH, offsetW) => {
        if (!offsetH) offsetH = 0;
        if (!offsetW) offsetW = 0;

        canvas.height = window.innerHeight - offsetH;
        canvas.width = window.innerWidth - offsetW;
    },

    /**
     * Set stroke color
     *
     * @param newColor
     */
    setColor: (newColor) => {
        color = newColor;
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
        context.fillStyle = color;
        context.fillRect(coordinate.x, coordinate.y, width, height)
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