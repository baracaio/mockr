canvas.addEventListener('click', clickEvent);

const sketch = new Sketch('#canvas', '2d');
const transform = new Transformations();
sketch.setup();
sketch.setColor('red');

const p0 = new point(600, 300);
const p1 = new point(p0.x, p0.y - 200);
const p2 = new point(p0.x + 300, p0.y);

var figure = [p0, p1, p2];

transform.setFigure(figure);

sketch.drawTriangle(figure[0], figure[1], figure[2]);

function clickEvent(event)
{
  var rect = canvas.getBoundingClientRect();
  var x = event.clientX - rect.left;
  var y = event.clientY - rect.top;
  var clickedPoint = new point(x, y);

  var radioAnswer = getRadioAnswer();

  switch (radioAnswer) 
  {
    case 'translation':
      figure = transform.doTranslation(clickedPoint);
      sketch.eraseCanvas();
      sketch.drawTriangle(figure[0], figure[1], figure[2]);
      break;

    case 'rotation':
      let degree = window.prompt('Em quantos graus deseja rotacionar a figura?');
      if (degree >= -360 && degree <= 360)
      {
        figure = transform.doRotation(clickedPoint, degree);
        sketch.eraseCanvas();
        sketch.drawTriangle(figure[0], figure[1], figure[2]);
      }
      break;

    case 'dilatation':
      let sX = window.prompt('Fator de escala de x:');
      let sY = window.prompt('Fator de escala de y:');
      figure = transform.doDilatation(clickedPoint, sX, sY);
      sketch.eraseCanvas();
      sketch.drawTriangle(figure[0], figure[1], figure[2]);
      break;
  }
}

function getRadioAnswer()
{
  if (document.getElementById('translation').checked)
  {
    return 'translation';
  }
  if (document.getElementById('rotation').checked)
  {
    return 'rotation';
  }
  if (document.getElementById('dilatation').checked)
  {
    return 'dilatation';
  }
}