const boxes = document.querySelectorAll(".box");
const player = document.querySelector(".player");
const newGame = document.querySelector("button");
let currentPlayer;
let gameGrid;
const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function init() {
  currentPlayer = "x";
  gameGrid = ["", "", "", "", "", "", "", "", ""];
  boxes.forEach((box) => {
    box.innerText = "";
    box.style.pointerEvents = "all";
  });
  newGame.classList.remove("active");
}

function swapTurn() {
  if (currentPlayer == "x") {
    currentPlayer = "o";
  } else {
    currentPlayer = "x";
  }
  player.innerText = `Current Player - ${currentPlayer}`;
}

function handleEvent(index) {
  if (gameGrid[index] === "") {
    boxes[index].style.pointerEvents = "none";
    boxes[index].innerText = currentPlayer.toUpperCase();
    gameGrid[index] = currentPlayer;
    console.log(gameGrid);
    swapTurn();
    checkGameOver();
  }
}
function checkGameOver() {
  let result = "";
  winningPositions.forEach((positions) => {
    if (
      (gameGrid[positions[0]] !== "" ||
        gameGrid[positions[1]] !== "" ||
        gameGrid[positions[2]] !== "") &&
      gameGrid[positions[0]] === gameGrid[positions[1]] &&
      gameGrid[positions[0]] === gameGrid[positions[2]]
    ) {
      if (gameGrid[positions[0]] == "x") {
        result = "x";
      } else {
        result = "O";
      }
      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      });
      boxes[positions[0]].classList.add("win");
      boxes[positions[1]].classList.add("win");
      boxes[positions[2]].classList.add("win");
    }
  });
  // we have a winner
  if (result !== "") {
    player.innerText = `Winner - ${result}`;
    newGame.classList.add("active");
    return;
  }
  // check for board filled
  let boardFilled = true;
  gameGrid.forEach((box) => {
    if (box == "") boardFilled = false;
  });
  if (boardFilled) {
    player.innerText = `Game Tied`;
    newGame.classList.add("active");
    return;
  }
}

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleEvent(index);
  });
});

newGame.addEventListener("click", () => {
  init();
});
init();
