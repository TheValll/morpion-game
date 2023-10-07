const cells = document.querySelectorAll("[data-cells]");
const text = document.getElementById("gameText");
const reload = document.getElementById("reload");
let scoresOne = document.getElementById("X");
let scoresTwo = document.getElementById("O");
let playerOne = "X";
let playerTwo = "O";
let activePlayer;

let scores = [0, 0];

const winnerConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const checkDraw = () => {
  return [...cells].every((cell) => {
    return cell.innerHTML === playerOne || cell.innerHTML === playerTwo;
  });
};

const checkWin = () => {
  return [...winnerConditions].some((conditions) => {
    return conditions.every((index) => {
      return cells[index].innerHTML === activePlayer;
    });
  });
};

const gameLogic = (e) => {
  e.target.innerHTML = activePlayer;
  e.target.style.color = activePlayer === playerOne ? "green" : "red";
  if (checkDraw()) {
    text.textContent = "Match nul !";
    cells.forEach((cell) => {
      cell.removeEventListener("click", gameLogic, { once: true });
    });
  } else if (checkWin()) {
    text.textContent = `Le joueur ${activePlayer} a gagné !`;
    cells.forEach((cell) => {
      cell.removeEventListener("click", gameLogic, { once: true });
    });

    if (activePlayer === "X") {
      document.body.style.backgroundColor = "green";
      cells.forEach((cell) => {
        cell.style.color = "white";
      });
      scores[0]++;
      scoresOne.textContent = scores[0];
    } else if (activePlayer === "O") {
      document.body.style.backgroundColor = "red";
      cells.forEach((cell) => {
        cell.style.color = "white";
      });
      scores[1]++;
      scoresTwo.textContent = scores[1];
    }
  } else {
    activePlayer = activePlayer === playerOne ? playerTwo : playerOne;
    text.textContent = `Au tour du joueur ${activePlayer} !`;
  }
};

const init = () => {
  activePlayer = playerOne;
  text.textContent = `Au tour du joueur ${activePlayer} !`;
  cells.forEach((cell) => {
    cell.innerHTML = "";
  });
  cells.forEach((cell) => {
    cell.removeEventListener("click", gameLogic, { once: true });
  });
  cells.forEach((cell) => {
    cell.addEventListener("click", gameLogic, { once: true });
  });
  document.body.style.backgroundColor = "rgb(40, 44, 52)";
};

init();

const changeTurn = () => {
  activePlayer =
    activePlayer === playerOne
      ? (activePlayer = playerTwo)
      : (activePlayer = playerOne);
  text.textContent = `Au tour du joueur ${activePlayer} !`;
  cells.forEach((cell) => {
    cell.innerHTML = "";
  });
  cells.forEach((cell) => {
    cell.removeEventListener("click", gameLogic, { once: true });
  });
  cells.forEach((cell) => {
    cell.addEventListener("click", gameLogic, { once: true });
  });
  document.body.style.backgroundColor = "rgb(40, 44, 52)";
};

const restart = () => {
  changeTurn();
};

const gameReset = () => {
  location.reload();
};
