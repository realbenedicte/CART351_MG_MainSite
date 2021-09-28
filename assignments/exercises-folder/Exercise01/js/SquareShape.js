//the square class

class SquareShape {

  constructor(x, y, context, color, speedX, speedY) {
    this.setPoints(x, y);
    this.localCanvasContext = context;
    this.fillColor = color;
    this.speedX = speedX;
    this.speedY = 0;

  }
  //method to display the square using the HTML 5 canvas API
  display() {
    this.localCanvasContext.fillStyle = this.fillColor;
    this.localCanvasContext.fillRect(this.x1, this.y1, 20, 20);
  }

  //method to update the points ...
  setPoints(x, y) {
    this.x1 = x;
    this.y1 = y;
  }

  update() {
    let newX = this.x1 + this.speedX;
    let newY = this.y1 + this.speedY;
    //set the points
    this.setPoints(newX, newY);
  }

  checkBounds(localCanvas) {
    if (this.x1 > localCanvas.width || this.x1 < 0) {
      this.speedX = this.speedX * -1;
      this.y1 = Math.floor(Math.random() * localCanvas.height);
      this.x1 = Math.floor(Math.random() * localCanvas.width);
      console.log("bounds");
    }

    if (this.y1 > localCanvas.height || this.y1 < 0) {
      this.speedY = this.speedY * -1;
    }
  }
}
