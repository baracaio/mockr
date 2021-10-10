/**
 * 
 * Draws a line between the start point and the end point.
 * 
 * @param {x coordinate of the starting point} startX 
 * @param {y coordinate of the starting point} startY 
 * @param {x coordinate of the endpoint} endX 
 * @param {y coordinate of the endpoint} endY 
 * @param {line color} color 
 * @param {canvas context} ctx
 */
function drawLineByCoordinates(startX, startY, endX, endY, color, ctx) {
    // Calcula os parametros da equacao da reta y = mx + b
    var m = (endY - startY) / (endX - startX);
    var b = startY - m * startX;

    // Se o x do ponto inicial for igual ao x do ponto final, a reta é vertical (m infinito)
    if (startX == endX) {
        if (startY > endY) {
            for (var y = startY; endY < y; y--) {
                ctx.fillStyle = color;
                ctx.fillRect(startX, y, 1.5, 1.5);
            }
        }
        else {
            for (var y = startY; y < endY; y++) {
                ctx.fillStyle = color;
                ctx.fillRect(startX, y, 1.5, 1.5);
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
                ctx.fillStyle = color;
                ctx.fillRect(x, y, 1.5, 1.5);
            }
        }
        else // Incrementa o x
        {
            var y;
            for (var x = startX; x < endX; x++) {
                y = (m * x + b);
                ctx.fillStyle = color;
                ctx.fillRect(x, y, 1.5, 1.5);
            }
        }
    }
}

/**
 * 
 * Draws a line between the start point and the end point.
 * 
 * @param {starting point} start 
 * @param {ending point} end 
 * @param {line color} color 
 * @param {canvas context} ctx
 */
function drawLineByPoints(start, end, color, ctx) {
    // Calcula os parametros da equacao da reta y = mx + b
    var m = (end.y - start.y) / (end.x - start.x);
    var b = start.y - m * start.x;

    // Se o x do ponto inicial for igual ao x do ponto final, a reta é vertical (m infinito)
    if (start.x == end.x) {
        if (start.y > end.y) {
            for (var y = start.y; end.y < y; y--) {
                ctx.fillStyle = color;
                ctx.fillRect(start.x, y, 1.5, 1.5);
            }
        }
        else {
            for (var y = start.y; y < end.y; y++) {
                ctx.fillStyle = color;
                ctx.fillRect(start.x, y, 1.5, 1.5);
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
                ctx.fillStyle = color;
                ctx.fillRect(x, y, 1.5, 1.5);
            }
        }
        else // Incrementa o x
        {
            var y;
            for (var x = start.x; x < end.x; x++) {
                y = (m * x + b);
                ctx.fillStyle = color;
                ctx.fillRect(x, y, 1.5, 1.5);
            }
        }
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
 * @param {line color} color 
 * @param {canvas context} ctx 
 */
function drawBresenhamLine(x1, y1, x2, y2, color, ctx) {
    x1 |= 0;
    y1 |= 0;
    x2 |= 0;
    y2 |= 0;

    var dx = x2 - x1;
    dy = y2 - y1;

    var sx = (dx > 0) - (dx < 0);
    sy = (dy > 0) - (dy < 0);

    dx *= sx;
    dy *= sy;

    ctx.fillStyle = color;
    ctx.fillRect(x1, y1, 1.5, 1.5);

    if (!(dx || dy)) {
        return;
    }

    var d = 0;
    var x = x1;
    var y = y1;
    var v;

    if (dy < dx) {
        for (v = 0 | (dy << 15) / dx * sy; x ^ x2; x += sx, d &= 32767) {
            ctx.fillRect(x, y += (d += v) >> 15, 1.5, 1.5);
        }
    } else {
        for (v = 0 | (dx << 15) / dy * sx; y ^ y2; y += sy, d &= 32767) {
            ctx.fillRect(x += (d += v) >> 15, y, 1.5, 1.5);
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
 * @param {circle color} color 
 * @param {canvas context} ctx 
 */
function drawCircle(originX, originY, radius, color, ctx) {
    for (var i = 0; i < 720; i++) {
        var x = originX + Math.cos(i) * radius;
        var y = originY + Math.sin(i) * radius;

        ctx.fillStyle = color;
        ctx.fillRect(x, y, 1.5, 1.5);
    }
}

/**
 * 
 * Draw the Bezier curve with all the strings.
 * 
 * @param {first anchor point} p0 
 * @param {control point} p1 
 * @param {second anchor point} p2 
 * @param {line color} color 
 * @param {canvas context} ctx 
 */
async function drawBezierStrings(p0, p1, p2, color, ctx) {
    for (var t = 0; t <= 1; t += 0.02) {

        var firstControlPoint = new point();
        var secondControlPoint = new point();

        firstControlPoint.x = p0.x + (p1.x - p0.x) * t;
        firstControlPoint.y = p0.y + (p1.y - p0.y) * t;

        secondControlPoint.x = p1.x + (p2.x - p1.x) * t;
        secondControlPoint.y = p1.y + (p2.y - p1.y) * t;

        drawBresenhamLine(firstControlPoint.x, firstControlPoint.y,
            secondControlPoint.x, secondControlPoint.y,
            color, ctx);
        
        sleep(300);
    }
}

/**
 * 
 * Draw the Bezier curve, without the strings. Only the final curve.
 * 
 * @param {first anchor point} p0 
 * @param {control point} p1  
 * @param {second anchor point} p2 
 * @param {line color} color  
 * @param {canvas context} ctx  
 */
function drawQuadraticBezierCurve(p0, p1, p2, color, ctx) {
    var resultantPoint;
    for (let t = 0; t <= 1; t += 0.001) {
        resultantPoint = new point();
        resultantPoint.x = Math.pow(1 - t, 2) * p0.x + (1 - t) * 2 * t * p1.x + t * t * p2.x;
        resultantPoint.y = Math.pow(1 - t, 2) * p0.y + (1 - t) * 2 * t * p1.y + t * t * p2.y;

        ctx.fillStyle = color;
        ctx.fillRect(resultantPoint.x, resultantPoint.y, 1.5, 1.5);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}