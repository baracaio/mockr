class Transformations 
{
    
    setFigure(figure)
    {
        this.figure = figure;
    }

    doTranslation(click)
    {
        let x;
        let y;
        let t = new point(click.x - figure[0].x, click.y - figure[0].y);

        for (let i = 0; i < figure.length; i++) {
            x = (1 * figure[i].x) + (0 * figure[i].y) + (t.x * 1);
            y = (0 * figure[i].x) + (1 * figure[i].y) + (t.y * 1);
            figure[i] = new point(x, y);            
        }
        return figure;
    }
    
    doRotation(click, degree)
    {
        let rad = (Math.PI * degree) / 180;
        let sin = Math.sin(rad);
        let cos = Math.cos(rad);
        let x;
        let y;
    
        for (let i = 0; i < figure.length; i++)
        {
            x = cos * figure[i].x + (-sin * figure[i].y) + click.x * (1 - cos) + click.y * sin;
            y = sin * figure[i].x + cos * figure[i].y + click.y * (1 - cos) - click.x * sin;
            figure[i] = new point(x, y);
        }
        return figure;
    }
    
    doDilatation(click, sX, sY)
    {
        let x;
        let y;
        for (let i = 0; i < figure.length; i++)
        {
            x = (sX * figure[i].x + 0 * figure[i].y + click.x * (1 - sX));
            y = (0 * figure[i].x + sY * figure[i].y + click.y * (1 - sY));
            figure[i] = new point(x, y);
        }
        return figure;
    }
}