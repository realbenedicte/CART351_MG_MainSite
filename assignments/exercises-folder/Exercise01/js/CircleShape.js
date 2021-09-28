//the circle class
//got some movement help with this: https://www.oreilly.com/library/view/html5-canvas/9781449308032/ch05.html
class CircleShape {

  constructor(x, y, context2, color, speed, path) {
    this.setPoints(x, y);
    this.localCanvasContext = context2;
    this.fillColor = color;
    this.speed = speed;
    this.path = path;
  }
  //method to display the square using the HTML 5 canvas API
  display() {
    this.localCanvasContext.fillStyle = this.fillColor;
    this.localCanvasContext.beginPath();
    this.localCanvasContext.arc(this.x1,this.y1,15,0,Math.PI*2,true);
    this.localCanvasContext.closePath();
    this.localCanvasContext.fill();
  }

  //method to update the points
  setPoints(x, y) {
    this.x1 = x;
    this.y1 = y;
  }

  update() {
    let newX = this.path.centerX + Math.cos(this.path.angle) * this.path.radius;
    let newY= this.path.centerY + Math.sin(this.path.angle) * this.path.radius;
    this.path.angle += this.speed;
    //set the points
    this.setPoints(newX, newY);
  }

}
