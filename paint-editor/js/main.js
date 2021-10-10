canvas.addEventListener('click', clickEvent);
canvas.addEventListener("dblclick", doubleClickEvent);

const sketch = new Sketch('#canvas', '2d');
sketch.setup();
sketch.setColor('red');

var dot = [];
var line = [];
var triangle = [];
var rectangle = [];
var polygon = [];

function clickEvent(event) {
  var rect = canvas.getBoundingClientRect();
  var x = event.clientX - rect.left;
  var y = event.clientY - rect.top;

  var radioAnswer = getRadioAnswer();

  switch (radioAnswer) {
    case 'dot':
      dot.push(new point(x, y));
      let last = dot[dot.length - 1];
      sketch.dot(last.x, last.y, 1.5, 1.5);
      break;
    case 'line':
      line.push(new point(x, y));
      if (line.length != 0 && line.length % 2 == 0) {
        let lineLast = line[line.length - 1];
        let linePenult = line[line.length - 2];
        sketch.drawBresenhamLine(linePenult.x, linePenult.y, lineLast.x, lineLast.y);
      }
      break;
    case 'triangle':
      triangle.push(new point(x, y));
      if (triangle.length != 0 && triangle.length % 3 == 0) {
        let triangLast = triangle[triangle.length - 1];
        let triangPenult = triangle[triangle.length - 2];
        let triangAntipenult = triangle[triangle.length - 3];
        sketch.drawTriangle(triangAntipenult, triangPenult, triangLast);
      }
      break;
    case 'rectangle':
      rectangle.push(new point(x, y));
      if (rectangle.length != 0 && rectangle.length % 2 == 0) {
        let rectLast = rectangle[rectangle.length - 1];
        let rectPenult = rectangle[rectangle.length - 2];
        sketch.drawRectangle(rectPenult, rectLast);
      }
      break;
    case 'polygon':
      polygon.push(new point(x, y));
      let i = 0;
      if (polygon.length != 0 && polygon.length >= 2) {
        sketch.drawBresenhamLine(polygon[polygon.length - 1].x, polygon[polygon.length - 1].y, polygon[polygon.length - 2].x, polygon[polygon.length - 2].y);
      }
      break;
  }
}

function doubleClickEvent(event) {
  var rect = canvas.getBoundingClientRect();
  var x = event.clientX - rect.left;
  var y = event.clientY - rect.top;

  polygon.push(new point(x, y));
  let polyLast = polygon[polygon.length - 1];
  sketch.drawBresenhamLine(polyLast.x, polyLast.y, polygon[0].x, polygon[0].y);
}

function getRadioAnswer() {
  if (document.getElementById('dot').checked) {
    return 'dot';
  }
  if (document.getElementById('line').checked) {
    return 'line';
  }
  if (document.getElementById('triangle').checked) {
    return 'triangle';
  }
  if (document.getElementById('rectangle').checked) {
    return 'rectangle';
  }
  if (document.getElementById('polygon').checked) {
    return 'polygon';
  }
}