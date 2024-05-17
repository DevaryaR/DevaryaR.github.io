let xDirectionArray = [1, 0, -1, 0];
let yDirectionArray = [0, 1, 0, -1];
let directionIndex = 0;

let cX = [];
let cY = [];
let len = 1;
let diameter = 10;

let foodX;
let foodY;

function setup() {
  noLoop();
  let canvas = createCanvas(400, 400);
  canvas.parent('p5-container'); // Attach the canvas to the container div
  frameRate(10);
  song = loadSound("snake.mp4");
  bell = loadSound("Bell.mp4");

  for (let i = 0; i < len; i++) {
    cX.push(30 - i * 10);
    cY.push(20);
  }

  generateFood();

  button = createButton("start!");
  button.mouseClicked(strt);
  button.size(100, 50);
  button.position(10, 420);
  button.style("font-family", "Comic Sans MS");
  button.style("font-size", "28px");
  
   //up button
 button = createButton("U");
 button.mouseClicked(upButton);
 button.size(80, 50);
 button.position(230, 420);
 button.style("font-family", "Comic Sans MS");
 button.style("font-size", "28px");
 //down button
 button = createButton("D");
 button.mouseClicked(downButton);
 button.size(80, 50);
 button.position(230, 520);
 button.style("font-family", "Comic Sans MS");
 button.style("font-size", "28px");
 //left button
 button = createButton("L");
 button.mouseClicked(leftButton);
 button.size(80, 50);
 button.position(150, 470);
 button.style("font-family", "Comic Sans MS");
 button.style("font-size", "28px");
 //right button
 button = createButton("R");
 button.mouseClicked(rightButton);
 button.size(80, 50);
 button.position(310, 470);
 button.style("font-family", "Comic Sans MS");
 button.style("font-size", "28px");
}
function strt() {
  loop();
  song.play();
}
function rightButton() {
 if (directionIndex != 2) {
 directionIndex = 0;
 }
}
function leftButton() {
 if (directionIndex != 0) {
 directionIndex = 2;
 }
}
function upButton() {
 if (directionIndex != 1) {
 directionIndex = 3;
 }
}
function downButton() {
 if (directionIndex != 3) {
 directionIndex = 1;
 }
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW && directionIndex !== 2) {
    directionIndex = 0;
  } else if (keyCode === DOWN_ARROW && directionIndex !== 3) {
    directionIndex = 1;
  } else if (keyCode === LEFT_ARROW && directionIndex !== 0) {
    directionIndex = 2;
  } else if (keyCode === UP_ARROW && directionIndex !== 1) {
    directionIndex = 3;
  }
}

function caterpillar() {
  for (let i = len - 1; i > 0; i--) {
    cX[i] = cX[i - 1];
    cY[i] = cY[i - 1];
  }
  cX[0] += xDirectionArray[directionIndex] * diameter;
  cY[0] += yDirectionArray[directionIndex] * diameter;

  if (dist(cX[0], cY[0], foodX, foodY) < diameter) {
    eatFood();
  }

  for (let i = 0; i < len; i++) {
    fill("green");
    cX[i] = constrain(cX[i], 0, width - diameter);
    cY[i] = constrain(cX[i], 0, height - diameter);
    circle(cX[i], cY[i], diameter);
  }
}

function crossOver() {
 //note that I have ensured that if you are on the edge you’re still ok
 if (cX[0] > 5 && cX[0] < 395 && cY[0] >5 && cY[0] < 395 && len > 1) {
 for (let i = 1; i < len; i++) {
 if (cX[0] == cX[i] && cY[0] == cY[i]) {
   console.log(success)
 noLoop();
 }
 }
 } //edge if
} //crossover

function eatFood() {
  len++;
  // Add new segment in the opposite direction of current movement
  var newCX = cX[len - 2] - xDirectionArray[directionIndex] * diameter;
  var newCY = cY[len - 2] - yDirectionArray[directionIndex] * diameter;
  cX.push(newCX);
  cY.push(newCY);
  generateFood();
  bell.play();
}
function generateFood() {
  let validLocation = false;
  while (!validLocation) {
    foodX =
      Math.floor((Math.random() * (width - diameter)) / diameter) * diameter;
    foodY =
      Math.floor((Math.random() * (height - diameter)) / diameter) * diameter;
    validLocation = true;
    for (let i = 0; i < len; i++) {
      if (dist(foodX, foodY, cX[i], cY[i]) < diameter) {
        validLocation = false;
        break;
      }
    }
  }
}

function draw() {
  background("black");
  caterpillar();
  crossOver();
  fill("red");
  circle(foodX, foodY, diameter);
}
