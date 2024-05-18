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
  noLoop(); // Initialize the canvas and pause the loop
  let canvas = createCanvas(400, 400);
  frameRate(10);

  // Initialize the snake's position
  for (let i = 0; i < len; i++) {
    cX.push(30 - i * 10);
    cY.push(20);
  }

  generateFood();

  // Create a button to start the game
  let button = createButton("Start!");
  button.mousePressed(resetGame); // Use mousePressed to attach the function
  button.size(100, 50);
  button.position(10, 420);
  button.style("font-family", "Comic Sans MS");
  button.style("font-size", "28px");
}

function resetGame() {
  // Reset the snake's position, length, and direction
  cX = [];
  cY = [];
  len = 1;
  directionIndex = 0;

  for (let i = 0; i < len; i++) {
    cX.push(30 - i * 10);
    cY.push(20);
  }

  generateFood(); // Generate a new food position

  loop(); // Start the loop
}

function keyPressed() {
  // Update the direction based on key presses
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
    cY[i] = constrain(cY[i], 0, height - diameter);
    circle(cX[i], cY[i], diameter);
  }

  crossOver();
}

function eatFood() {
  len++;
  cX.push(cX[len - 1] + xDirectionArray[directionIndex] * diameter);
  cY.push(cY[len - 1] + yDirectionArray[directionIndex] * diameter);
  generateFood();
}

function generateFood() {
  let validLocation = false;
  while (!validLocation) {
    foodX = Math.floor(Math.random() * (width - diameter) / diameter) * diameter;
    foodY = Math.floor(Math.random() * (height - diameter) / diameter) * diameter;
    validLocation = true;
    for (let i = 0; i < len; i++) {
      if (dist(foodX, foodY, cX[i], cY[i]) < diameter) {
        validLocation = false;
        break;
      }
    }
  }
}

function crossOver() {
  if (len > 1) {
    for (let i = 1; i < len; i++) {
      if (cX[0] === cX[i] && cY[0] === cY[i]) {
        console.log('Game Over');
        noLoop();
      }
    }
  }
}

function draw() {
  background("black");
  caterpillar();
  fill("red");
  circle(foodX, foodY, diameter);
}
