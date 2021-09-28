//main script

//Canvas Constants
const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 500;

//array for the squares
let squareArray = [];
const NUM_SQUARE = 100;
//array for colors! (Shades of grey)
const shapeColors = ["#E0E0E0", "#C0C0C0", "#A0A0A0"];

//CirclePaths
var circle1 = { centerX: 250, centerY: 250, radius: 125, angle: 0 };
var circle2 = { centerX: 250, centerY: 250, radius: 50, angle: 0 };
var circle3 = { centerX: 250, centerY: 250, radius: 200, angle: 0 };

window.onload = function () {
  // get canvas 1
  let canvas1 = document.getElementById("maximeCanvas");
  canvas1.width = CANVAS_WIDTH;
  canvas1.height = CANVAS_WIDTH;
  let context = canvas1.getContext("2d");
  // get canvas 2
  let canvas2 = document.getElementById("maximeCanvas2");
  canvas2.width = CANVAS_WIDTH;
  canvas2.height = CANVAS_WIDTH;
  let context2 = canvas2.getContext("2d");

  console.log(squareArray[3]);

  document
    .getElementById("overlay")
    .addEventListener("click", function (event) {
      //display canvases
      canvas1.style.display = "inline-block";
      canvas2.style.display = "inline-block";
      //create circle 1
      let oneCircle = new CircleShape(
        0, //posx
        0, //posy
        context2, //pick canvas
        shapeColors[Math.floor(Math.random() * shapeColors.length)], //color
        Math.random() * 0.1 + 0.02,
        circle1 //random speed,
      );

      //create circle 2
      let twoCircle = new CircleShape(
        0, //posx
        0, //posy
        context2, //pick canvas
        shapeColors[Math.floor(Math.random() * shapeColors.length)], //color
        Math.random() * 0.1 + 0.02,
        circle2 //random speed,
      );

      //create circle 3
      let threeCircle = new CircleShape(
        0, //posx
        0, //posy
        context2, //pick canvas
        shapeColors[Math.floor(Math.random() * shapeColors.length)], //color
        Math.random() * 0.1 + 0.02,
        circle3 //random speed,
      );

      //create squares
      for (let i = 0; i < NUM_SQUARE; i++) {
        squareArray.push(
          new SquareShape(
            Math.floor(Math.random() * canvas1.width), //random x1
            Math.floor(Math.random() * canvas1.height), //random y1
            context, //canvas1
            shapeColors[Math.floor(Math.random() * shapeColors.length)], //random color of square from array
            Math.floor(Math.random() * 3 + 1)
          ) //random speed
        );
      }

      requestAnimationFrame(animate);

      function animate() {
        //repaint canvases
        context.clearRect(0, 0, canvas1.width, canvas1.height);
        context2.clearRect(0, 0, canvas2.width, canvas2.height);
        //display and update circles
        oneCircle.update();
        oneCircle.display();
        twoCircle.update();
        twoCircle.display();
        threeCircle.update();
        threeCircle.display();
        //display, update, checkbounds of squares
        for (let i = 0; i < NUM_SQUARE; i++) {
          squareArray[i].update();
          squareArray[i].checkBounds(canvas1);
          squareArray[i].display();
        }
        requestAnimationFrame(animate);
      }
      // var div = document.getElementById("overlay");
      // div.remove(); //ater clicking remove the click me div
    });
};
