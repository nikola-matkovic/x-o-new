let gridSize = parseInt(prompt("Enter grid size", 3));

document.documentElement.style.setProperty("--n", gridSize);

const container = document.querySelector(".container");
container.innerHTML = Array(gridSize * gridSize)
    .fill("<div></div>")
    .join("");

const places = [...container.querySelectorAll("div")];
let current = "";
let grid = [];

places.forEach((place, index) => {
    const column = index % gridSize;
    const row = Math.floor(index / gridSize);

    place.addEventListener("click", () => handleClick(row, column, index));
});

const checkForDraw = () => grid.flat().every((e) => e === "X" || e === "O");

const checkArray = (arr) =>
    arr.every((e) => e === "O") || arr.every((e) => e === "X");

function handleClick(x, y, i) {
    if (grid[x][y] !== 0) return;

    places[i].innerHTML = `<div class="${current}"> ${current} </div>`;
    grid[x][y] = current;

    if (checkForWin()) return endGame("win");
    if (checkForDraw()) return endGame("draw");

    current = current === "X" ? "O" : "X";
}

function checkForWin() {
    for (let i = 0; i < gridSize; i++) {
        if (checkArray(grid[i])) return true;
        if (checkArray(grid.map((arr) => arr[i]))) return true;
    }

    let d1 = grid.map((row, i) => row[i]);
    let d2 = grid.map((row, i) => row[gridSize - 1 - i]);

    return checkArray(d1) || checkArray(d2);
}

function endGame(status) {
    status === "win" && alert(`Player ${current} just won the game`);
    status === "draw" && alert("draw");

    restart();
}

function restart() {
    current = "X";
    grid = Array(gridSize)
        .fill("0")
        .map(() => Array(gridSize).fill(0));

    places.forEach((place) => (place.innerHTML = ""));
}

restart();
