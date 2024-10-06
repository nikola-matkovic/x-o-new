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

function handleClick(x, y, i) {
    if (grid[x][y] !== 0) return;

    places[i].innerHTML = `<div class="${current}"> ${current} </div>`;

    grid[x][y] = current;

    console.log(grid);

    if (checkForWin()) return endGame("win");
    if (checkForDraw()) return endGame("draw");

    current = current === "X" ? "O" : "X";
}

function checkForWin() {
    let results = [];

    for (let i = 0; i < gridSize; i++) results.push(checkArray(grid[i])); // X

    for (let i = 0; i < gridSize; i++)
        results.push(checkArray(grid.map((arr) => arr[i]))); // Y

    let d1 = []; // Diagonal
    let d2 = []; // Diagonal
    for (let i = 0; i < gridSize; i++) {
        d1.push(grid[i][i]);
        d2.push(grid[i][gridSize - 1 - i]);
    }

    results.push(checkArray(d1));
    results.push(checkArray(d2));

    return results.some((result) => result === true);
}

function checkArray(arr) {
    return arr.every((e) => e === "O") || arr.every((e) => e === "X");
}

function endGame(status) {
    status === "win"
        ? alert(`Player ${current} just won the game`)
        : alert("draw");

    restart();
}

function restart() {
    current = "X";
    grid = Array(gridSize)
        .fill("0")
        .map(() => Array(gridSize).fill(0));

    places.forEach((place) => (place.innerHTML = ""));
}

function checkForDraw() {
    return grid.flat().every((e) => e === "X" || e === "O");
}

restart();
