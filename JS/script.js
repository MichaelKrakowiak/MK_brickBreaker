// Variables

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

//Déplacements
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;

//Caractéristiques de la balle
const ballRadius = 10;

//Raquette
const paddleHeight = 10;
const paddleWidth = 75;
let = paddleX = (canvas.width - paddleHeight) / 2;
let rightPressed = false;
let leftPressed = false;

//Briques 

const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;


let bricks = [];
for (let column = 0; column < brickColumnCount ; column ++){
  bricks[column]= [];
  for (let row = 0; row < brickRowCount; row ++){
    bricks[column][row] = {x: 0, y: 0, status: 1}
  }
  console.log(bricks)
};

// Functions

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "purple";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawBricks(){
  for (let column = 0; column < brickColumnCount; column ++) {
    for (let row = 0; row < brickRowCount; row ++) {
      if (bricks[column][row].status == 1) {
        let brickX = column * (brickWidth + brickPadding) + brickOffsetLeft;
        let brickY = row * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[column][row].x = brickX;
        bricks[column][row].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
};

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  drawBricks();
  collisionDetection();

  x += dx;
  y += dy;

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  };

  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
     dy = -dy;
    } else {
      alert('GAME OVER');
      document.location.reload()
      clearInterval(interval) // Permet de mettre fin à la partie et de rafraichir la page 
    }
  };

  if (rightPressed) {
    paddleX += 7;
    if (paddleX + paddleWidth > canvas.width) {
      paddleX = canvas.width - paddleWidth;
    }
  } else if (leftPressed) {
    paddleX -= 7;
    if (paddleX < 0) {
      paddleX = 0;
    }
  }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = true;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = false;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = false;
  }
}

function collisionDetection() {
  for (let column = 0; column < brickColumnCount; column ++){
    for (let row = 0; row < brickRowCount; row ++){
      let brick = bricks[column][row];
      if (brick.status == 1) {
        if (x > brick.x && x < brick.x + brickWidth && y > brick.y && y < brick.y + brickHeight) {
          dy = -dy;
          brick.status = 0;
        }
      }
    }
  }
};

let interval = setInterval(draw, 10);
