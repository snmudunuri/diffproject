let currentPlayer = 0;

let player1Selection = [];
let player2Selection = [];
let points1 = 0;
let points2 = 0;
let winnerCombination = new Array();
let input = prompt("Choose the matrix you want to play", "3 OR 4 OR 5");

while (input < 3 || input > 5) {
  input = prompt("Please choose valid matrix", "3 OR 4 OR 5");
}

let n = parseInt(input);
function loadAnswers() {
  winnerCombination = [];
  let answersSet = new Array();
  let current = 0;

  for (let i = 1; i <= n * n; i++) {
    answersSet.push(i);
    if (answersSet.length == n) {
      winnerCombination.push(answersSet);
      answersSet = [];
    }
  }

  for (let i = 1; i <= n; i++) {
    answersSet.push(i);
    current = i;

    for (let j = 1; j < n; j++) {
      answersSet.push(current + n);
      current = current + n;
    }

    if (answersSet.length == n) {
      winnerCombination.push(answersSet);
      answersSet = [];
    }
  }

  for (let i = 1; i <= n * n; i++) {
    for (let j = 1; j <= n * n; j++) {
      if (i - j == 0) {
        answersSet.push(i);
        current = i;
        for (let r = 1; r < n; r++) {
          answersSet.push(current + n + 1);
          current = current + n + 1;
        }
        if (answersSet.length == n) {
          winnerCombination.push(answersSet);
        }
      }
    }
    if (answersSet.length == n) {
      answersSet = [];
      break;
    }
  }

  for (let i = 1; i <= n * n; i++) {
    for (let j = 1; j <= n * n; j++) {
      if (i + j == n + 1) {
        answersSet.push(j);
        current = j;
        for (let r = 1; r < n; r++) {
          answersSet.push(current + n - 1);
          current = current + n - 1;
        }
        if (answersSet.length == n) {
          winnerCombination.push(answersSet);
        }
      }
    }
    if (answersSet.length == n) {
      answersSet = [];
      break;
    }
  }
}

function gameBoard() {
  loadAnswers();
  let colCount = 1;
  const parentNode = document.getElementById("game");
  while (parentNode.hasChildNodes()) {
    parentNode.removeChild(parentNode.firstChild);
  }

  for (let i = 0; i < n; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < n; j++) {
      const col = document.createElement("td");
      col.id = colCount;
      row.appendChild(col);
      colCount++;
    }
    parentNode.appendChild(row);
  }

  let assign = function(e) {
    if (currentPlayer == 0) {
      this.textContent = "0";

      this.removeEventListener("click", assign);
      player1Selection.push(this.id);
      player1Selection.sort();
    } else {
      this.textContent = "X";

      this.removeEventListener("click", assign);
      player2Selection.push(this.id);
      player2Selection.sort();
    }

    if (winnerCheck()) {
      if (currentPlayer == 0) {
        points1++;
        alert("Player 1 wins!!");
      } else {
        points2++;
        alert("Player 2 wins!!");
      }
      document.getElementById("player1").innerHTML = points1;
      document.getElementById("player2").innerHTML = points2;
      reset();
    } else if (player1Selection.length == Math.floor((n * n) / 2) + 1) {
      alert("It's a draw!!");
      reset();
    } else if (player2Selection.length == (n * n) / 2) {
      alert("It's a draw!!");
      reset();
    } else {
      if (currentPlayer == 0) {
        currentPlayer = 1;
      } else {
        currentPlayer = 0;
      }
    }
  };
  for (let i = 1; i < colCount; i++) {
    const colId = document.getElementById(i);
    colId.addEventListener("click", assign);
  }
}

function winnerCheck() {
  let playerSelection = new Array();
  let playerWon = false;

  if (currentPlayer == 0) {
    playerSelection = player1Selection;
  } else {
    playerSelection = player2Selection;
  }

  if (playerSelection.length >= n) {
    for (let i = 0; i < winnerCombination.length; i++) {
      let set = winnerCombination[i];
      let foundSet = true;

      for (let r = 0; r < set.length; r++) {
        let winCount = 0;

        for (let j = 0; j < playerSelection.length; j++) {
          if (set[r] == playerSelection[j]) {
            winCount++;
            break;
          }
        }
        if (winCount == 0) {
          foundSet = false;
          break;
        }
      }

      if (foundSet == true) {
        playerWon = true;
        break;
      }
    }
  }
  return playerWon;
}

function reset() {
  currentPlayer = 0;
  player1Selection = new Array();
  player2Selection = new Array();
  gameBoard();
}

function restart() {
  currentPlayer = 0;
  player1Selection = new Array();
  player2Selection = new Array();
  points1 = 0;
  points2 = 0;
  document.getElementById("player1").innerHTML = points1;
  document.getElementById("player2").innerHTML = points2;
  gameBoard();
}

window.addEventListener("load", gameBoard);

const restartButton = document.getElementById("restart");
const refreshButton = document.getElementById("refresh");
restartButton.addEventListener("click", restart);
refreshButton.addEventListener("click", e => {
  location.reload(true);
});
