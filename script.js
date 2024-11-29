const cells = document.querySelectorAll(".cell");
const statusDisplay = document.getElementById("status");
const resetButton = document.getElementById("reset-btn");

let currentPlayer = "X";
let gameState = Array(9).fill("");

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const checkWinner = () => {
  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (
      gameState[a] &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    ) {
      statusDisplay.textContent = `Player ${currentPlayer} wins!`;
      cells.forEach((cell) => cell.classList.add("taken"));
      return true;
    }
  }
  if (!gameState.includes("")) {
    statusDisplay.textContent = "It's a draw!";
    return true;
  }
  return false;
};

const handleCellClick = (event) => {
  const cell = event.target;
  const index = cell.getAttribute("data-index");

  if (gameState[index] !== "" || cell.classList.contains("taken")) return;

  gameState[index] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWinner()) return;

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
};

const resetGame = () => {
  gameState.fill("");
  currentPlayer = "X";
  statusDisplay.textContent = "Player X's turn";
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("taken");
  });
};

cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);
statusDisplay.textContent = "Player X's turn";
