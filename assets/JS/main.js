const playerText = document.getElementById("playerText");
const restartBtn = document.getElementById("restartBtn");
const startBtn = document.getElementById("startBtn");
const playerXInput = document.getElementById("playerX");
const playerOInput = document.getElementById("playerO");
const boxes = Array.from(document.getElementsByClassName("box"));
const winningIndicator = getComputedStyle(document.body).getPropertyValue(
  "--winning-blocks"
);
const xPointsText = document.getElementById("x-points");
const oPointsText = document.getElementById("o-points");
const rankingTableBody = document.querySelector("#ranking-table tbody");

const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = X_TEXT;
let spaces = Array(9).fill(null);
let playerX, playerO;

const startGame = () => {
  boxes.forEach((box) => box.addEventListener("click", boxClicked));
};

function boxClicked(e) {
  const id = e.target.id;

  if (!spaces[id] && !playerHasWon()) {
    spaces[id] = currentPlayer;
    e.target.innerText = currentPlayer;

    if (playerHasWon()) {
      // playerText.innerText = `${currentPlayer} Ganhou!`;
      const winningBlocks = playerHasWon();
      winningBlocks.map(
        (box) => (boxes[box].style.backgroundColor = winningIndicator)
      );
      addPointsToWinner();
      updateRanking();
    } else if (isDraw()) {
      // playerText.innerText = "Empate!";
    }

    currentPlayer = currentPlayer === X_TEXT ? O_TEXT : X_TEXT;
  }
}

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function playerHasWon() {
  for (const combo of winningCombos) {
    const [a, b, c] = combo;

    if (spaces[a] && spaces[a] === spaces[b] && spaces[a] === spaces[c]) {
      return combo;
    }
  }
  return false;
}

function isDraw() {
  for (let i = 0; i < spaces.length; i++) {
    if (spaces[i] === null) return false;
  }
  return true;
}

function addPointsToWinner() {
  if (currentPlayer === X_TEXT) {
    xPointsText.innerText = Number(xPointsText.innerText) + 1;
    updatePlayerScore(playerX);
  } else {
    oPointsText.innerText = Number(oPointsText.innerText) + 1;
    updatePlayerScore(playerO);
  }
}

function updatePlayerScore(player) {
  let players = JSON.parse(localStorage.getItem("players")) || [];
  let playerObj = players.find(p => p.name === player);

  if (playerObj) {
    playerObj.wins += 1;
  } else {
    players.push({ name: player, wins: 1 });
  }

  localStorage.setItem("players", JSON.stringify(players));
}

function updateRanking() {
  let players = JSON.parse(localStorage.getItem("players")) || [];
  players.sort((a, b) => b.wins - a.wins);

  rankingTableBody.innerHTML = "";
  players.forEach(player => {
    let row = rankingTableBody.insertRow();
    let nameCell = row.insertCell(0);
    let winsCell = row.insertCell(1);
    nameCell.textContent = player.name;
    winsCell.textContent = player.wins;
  });
}

restartBtn.addEventListener("click", restart);

function restart() {
  spaces.fill(null);

  boxes.forEach((box) => {
    box.innerText = "";
    box.style.backgroundColor = "";
  });

  // playerText.innerText = "Tic Tac Toe";

  currentPlayer = currentPlayer === X_TEXT ? O_TEXT : X_TEXT;
}

startBtn.addEventListener("click", () => {
  playerX = playerXInput.value;
  playerO = playerOInput.value;

  if (playerX && playerO) {
    document.getElementById("player-setup").style.display = "none";
    startGame();
  } else {
    alert("Por favor, insira os nomes dos jogadores.");
  }
});

document.addEventListener("DOMContentLoaded", updateRanking);

startGame();
