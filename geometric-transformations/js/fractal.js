class Fractal {
    constructor(sketch) {
        this.sketch = sketch;
    }

    async bezier(point0, point1, point2, color) {
        this.sketch.setColor(color);
        for (var t = 0; t <= 1; t += 0.02) {
            var firstControlPoint = new point();
            var secondControlPoint = new point();
    
            firstControlPoint.x = point0.x + (point1.x - point0.x) * t;
            firstControlPoint.y = point0.y + (point1.y - point0.y) * t;
    
            secondControlPoint.x = point1.x + (point2.x - point1.x) * t;
            secondControlPoint.y = point1.y + (point2.y - point1.y) * t;
    
            this.sketch.drawBresenhamLine(firstControlPoint.x, firstControlPoint.y,
                secondControlPoint.x, secondControlPoint.y);
        
            
            await this.sleep(100);
        }
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}