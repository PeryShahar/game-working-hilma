var goal = document.querySelector('.goal');
var ball = document.getElementById('ball');
var ballPositionX = 0;
var ballPositionY = 0;
var speed = 4;
var move;
let life = 100;
const score = document.getElementById('points');
let points = 0;
var instructionsIcon = document.getElementById('instructions-icon');
var instructions = document.getElementById('instructions');
var iReturn = document.getElementById('return');
var div = document.getElementById('all');

document.getElementById('life-left').style.width = life + '%';

ball.style.display = 'none';

instructionsIcon.addEventListener('click', function () {
  instructions.style.display = 'flex';
});

iReturn.addEventListener('click', function () {
  instructions.style.display = 'none';
});

window.addEventListener('keydown', moveBallX);

function moveBallX(e) {
  if (e.code !== 'Space') return;
  move = setInterval(moveX, 7);
  window.removeEventListener('keydown', moveBallX);
  window.addEventListener('keydown', stopX);
  ballPositionX = 0;
  ballPositionY = ((window.innerHeight / 100) * 85) / 2 - 15;
  ball.style.top = ballPositionY + 'px';
}

function moveBallY(e) {
  if (e.code !== 'Space') return;
  move = setInterval(moveY, 7);
  window.removeEventListener('keydown', moveBallY);
  window.addEventListener('keydown', stopY);
  ballPositionY = 0;
  ballPositionX = window.innerWidth / 2 - 15;
  ball.style.left = ballPositionX + 'px';
}

function moveX() {
  ball.style.display = 'block';
  if (ballPositionX < 0 || ballPositionX > window.innerWidth - 30) {
    speed = -speed;
  }
  ballPositionX += speed;
  ball.style.left = ballPositionX + 'px';
}

function moveY() {
  if (ballPositionY < 0 || ballPositionY > window.innerHeight - 30) {
    speed = -speed;
  }
  ballPositionY += speed;
  ball.style.top = ballPositionY + 'px';
}

function stopX(e) {
  if (e.code !== 'Space') return;
  if (
    ballPositionX < window.innerWidth / 2 - 100 ||
    ballPositionX > window.innerWidth / 2 + 100
  ) {
    life -= 10;
    document.getElementById('life-left').style.width = life + '%';
    if (life === 0) {
      gameOver();
      return;
    }
  } else {
    speed = Math.abs(speed);
    speed++;
    points++;
    score.textContent = points;
  }
  clearInterval(move);
  window.removeEventListener('keydown', stopX);
  window.addEventListener('keydown', moveBallY);
}

function stopY(e) {
  if (e.code !== 'Space') return;
  if (
    ballPositionY < ((window.innerHeight / 100) * 85) / 2 - 100 ||
    ballPositionY > ((window.innerHeight / 100) * 85) / 2 + 100
  ) {
    life -= 10;
    document.getElementById('life-left').style.width = life + '%';
    if (life === 0) {
      gameOver();
      return;
    }
  } else {
    speed = Math.abs(speed);
    speed++;
    points++;
    score.innerHTML = points;
  }
  clearInterval(move);
  window.removeEventListener('keydown', stopY);
  window.addEventListener('keydown', moveBallX);
}

function gameOver() {
  clearInterval(move);
  goal.classList += 'game-over';
  goal.innerHTML = 'GAME<br>OVER';
  ball.style.display = 'none';
  setTimeout(function () {
    location.reload();
  }, 3000);
}
