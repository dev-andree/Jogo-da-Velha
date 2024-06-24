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
