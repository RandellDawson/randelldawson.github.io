function moveMole() {
  clearInterval(timerId);
  timerId = null;
  squares[molePosition].classList.remove("mole");
  let randomSquare = squares[Math.floor(Math.random() * squares.length)];
  // to not show mole in the same square
  if (randomSquare.id == molePosition) {
    while (randomSquare.id == molePosition) {
      randomSquare = squares[Math.floor(Math.random() * squares.length)];
    }
  }
  randomSquare.addEventListener("mousedown", mousedown);
  randomSquare.classList.add("mole");

  molePosition = randomSquare.id;
  timerId = setTimeout(moveMole, 1000);
}
function mousedown(event) {
  const currentSquare = event.target;
  if (currentSquare.id == molePosition) {
    score.textContent = ++result;
    currentSquare.removeEventListener("mousedown", mousedown);
    currentSquare.classList.remove("mole");
    currentSquare.classList.add("mole-hit");
    setTimeout(() => {
      currentSquare.classList.remove("mole-hit");
    }, 75);
  }
}
function countDown() {
  currentTimeLeft--;
  timeLeft.textContent = currentTimeLeft;
  if (currentTimeLeft == 0) {
    squares.forEach((square) => {
      square.removeEventListener("mousedown", mousedown);
    });
    clearInterval(counterTimeId);
    clearInterval(timerId);
    alert("Game Over and your score is: " + result);
  }
}

function startGame() {
  result = 0;
  molePosition = 0;
  currentTimeLeft = GAME_SESSION;
  score.textContent = result;
  timeLeft.textContent = currentTimeLeft;
  clearInterval(counterTimeId);
  clearInterval(timerId);
  counterTimeId = setInterval(countDown, 1000);
  timerId = null;
  squares.forEach(square => {
    square.removeEventListener("mousedown", mousedown);
    square.classList.remove("mole");
    square.classList.remove("mole-hit");
  });
  setTimeout(moveMole, 1000);
}

const  GAME_SESSION = 60;
let result, molePosition, currentTimeLeft, counterTimeId, timerId;

const squares = document.querySelectorAll(".square");
const timeLeft = document.getElementById("time-left");
const score = document.getElementById("score");
const start = document.getElementById("start-reset");

start.addEventListener("click", startGame);

