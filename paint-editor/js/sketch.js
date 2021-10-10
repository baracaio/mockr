class Sketch {
    constructor(canvasId, context) {

        if (context != '2d') context = '2d';

        this.canvasId = canvasId;
        this.canvas = document.querySelector(canvasId);
        this.context = this.canvas.getContext(context);
    }

    /**
     * Sets canvas
     */
    setup() {
        this.canvas.height = window.innerHeight;
        this.canvas.width = window.innerWidth;
    }

    /**
     * Set canvas' fillStyle with color
     * 
     * @param {string} color 
     */
    setColor(color) {
        this.context.fillStyle = color;
    }

    /**
     * Get canvas width
     * @returns float
     */
    getCanvasWidth() {
        return this.canvas.width;
    }

    /**
     * Get canvas height
     * @returns float
     */
    getCanvasHeight() {
        return this.canvas.height;
    }

    /**
     * Prints a dot on screen
     * 
     * @param {integer x coordinate} x
     * @param {integer y coordinate} y
     * @param {width of the dot} width
     * @param {height of the dot} height
     */
    dot(x, y, width, height) {
        this.context.fillRect(x, y, width, height);
    }

    /**
     * 
     * Draws a line between the start point and the end point.
     * 
     * @param {starting point} start 
     * @param {ending point} end 
     */
    drawLineByPoints(start, end) {
        // Calcula os parametros da equacao da reta y = mx + b
        var m = (end.y - start.y) / (end.x - start.x);
        var b = start.y - m * start.x;

        // Se o x do ponto inicial for igual ao x do ponto final, a reta é vertical (m infinito)
        if (start.x == end.x) {
            if (start.y > end.y) {
                for (var y = start.y; end.y < y; y--) {
                    this.dot(start.x, y, 1.5, 1.5);
                }
            }
            else {
                for (var y = start.y; y < end.y; y++) {
                    this.dot(start.x, y, 1.5, 1.5);
                }
            }
        }
        else // A reta nao é vertical, calcula e desenha normalmente
        {
            if (start.x > end.x) // Decrementa o x
            {
                var y;
                for (var x = start.x; end.x < x; x--) {
                    y = (m * x + b);
                    this.dot(x, y, 1.5, 1.5);
                }
            }
            else // Incrementa o x
            {
                var y;
                for (var x = start.x; x < end.x; x++) {
                    y = (m * x + b);
                    this.dot(x, y, 1.5, 1.5);
                }
            }
        }
    }

    /**
     * 
     * Draws a line between the start point and the end point.
     * 
     * @param {x coordinate of the starting point} startX 
     * @param {y coordinate of the starting point} startY 
     * @param {x coordinate of the endpoint} endX 
     * @param {y coordinate of the endpoint} endY 
     */
    drawLineByCoordinates(startX, startY, endX, endY, color) {
        // Calcula os parametros da equacao da reta y = mx + b
        var m = (endY - startY) / (endX - startX);
        var b = startY - m * startX;

        this.sketch.setColor(color);
        // Se o x do ponto inicial for igual ao x do ponto final, a reta é vertical (m infinito)
        if (startX == endX) {
            if (startY > endY) {
                for (var y = startY; endY < y; y--) {
                    this.dot(startX, y, 1.5, 1.5);
                }
            }
            else {
                for (var y = startY; y < endY; y++) {
                    this.dot(startX, y, 1.5, 1.5);
                }
            }
        }
        else // A reta nao é vertical, calcula e desenha normalmente
        {
            if (startX > endX) // Decrementa o x
            {
                var y;
                for (var x = startX; endX < x; x--) {
                    y = (m * x + b);
                    this.dot(x, y, 1.5, 1.5);
                }
            }
            else // Incrementa o x
            {
                var y;
                for (var x = startX; x < endX; x++) {
                    y = (m * x + b);
                    this.dot(x, y, 1.5, 1.5);
                }
            }
        }
    }

    /**
     * 
     * Draws a circle.
     * 
     * @param {x coordinate of the circle's origin} originX 
     * @param {y coordinate of the circle's origin} originY 
     * @param {circle's radius} radius 
     */
    drawCircle(originX, originY, radius) {
        for (var i = 0; i < 720; i++) {
            var x = originX + Math.cos(i) * radius;
            var y = originY + Math.sin(i) * radius;

            this.dot(x, y, 1.5, 1.5);
        }
    }

    /**
     * 
     * Draws a line between the start point and the end point
     * using Bresenham's line algorithm.
     * 
     * @param {x coordinate of the starting point} x1 
     * @param {y coordinate of the starting point} y1 
     * @param {x coordinate of the endpoint} x2 
     * @param {y coordinate of the endpoint} y2 
     */
    drawBresenhamLine(x1, y1, x2, y2) {
        x1 |= 0;
        y1 |= 0;
        x2 |= 0;
        y2 |= 0;

        var dx = x2 - x1;
        var dy = y2 - y1;

        var sx = (dx > 0) - (dx < 0);
        var sy = (dy > 0) - (dy < 0);

        dx *= sx;
        dy *= sy;


        this.dot(x1, y1, 1.5, 1.5);

        if (!(dx || dy)) {
            return;
        }

        var d = 0;
        var x = x1;
        var y = y1;
        var v;

        if (dy < dx) {
            for (v = 0 | (dy << 15) / dx * sy; x ^ x2; x += sx, d &= 32767) {
                this.dot(x, y += (d += v) >> 15, 1.5, 1.5);
            }
        } else {
            for (v = 0 | (dx << 15) / dy * sx; y ^ y2; y += sy, d &= 32767) {
                this.dot(x += (d += v) >> 15, y, 1.5, 1.5);
            }
        }
    }

    drawTriangle(p1, p2, p3) {
        this.drawBresenhamLine(p1.x, p1.y, p2.x, p2.y);
        this.drawBresenhamLine(p2.x, p2.y, p3.x, p3.y);
        this.drawBresenhamLine(p3.x, p3.y, p1.x, p1.y);
    }

    drawRectangle(p1, p2) {
        let p3 = new point(p2.x, p1.y);
        let p4 = new point(p1.x, p2.y);

        this.drawBresenhamLine(p1.x, p1.y, p3.x, p3.y);
        this.drawBresenhamLine(p3.x, p3.y, p2.x, p2.y);
        this.drawBresenhamLine(p2.x, p2.y, p4.x, p4.y);
        this.drawBresenhamLine(p4.x, p4.y, p1.x, p1.y);
    }
}