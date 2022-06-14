import * as game from "./game.js";

const width = 40;
const height = 40;
const generationMethod = () => Math.random() < 0.5 ? game.Cell.On : game.Cell.Off
const generateMatrix = () => game.makeMatrix(width, height, generationMethod);

let matrix = generateMatrix();
let playing: boolean = false;

generateGrid(matrix);

document.getElementById("pause")?.addEventListener("click", () => {
    playing = !playing;

    document.getElementById("pause")!.innerHTML = playing ? "Pause" : "Play";

    generateWait(100);
});

document.getElementById("refresh")?.addEventListener("click", () => {
    matrix = game.makeMatrix(width, height, () => Math.random() < 0.5 ? game.Cell.On : game.Cell.Off);
    generateGrid(matrix);
});

document.getElementById("nextgen")?.addEventListener("click", () => {
    matrix = game.iterateMatrix(matrix);
    generateGrid(matrix);
});

function generateGrid(matrix: game.Matrix): HTMLElement | null {
    const grid = document.getElementById("grid")

    while (grid?.firstChild) {
        grid.removeChild(grid.firstChild);
    }

    // Generate row and cell divs within grid
    // Number of rows is the same as the length of a column
    for (let i = 0; i < matrix[0].length; i++) {
        const row = document.createElement("div");
        row.className = "row";

        for (let j = 0; j < matrix.length; j++) {
            const cell = document.createElement("div");
            cell.className = `cell onstate${matrix[j][i]}`;
            cell.id = `coords ${j},${i}`;
            
            row.appendChild(cell);
        }

        grid?.appendChild(row);
    }

    return grid;
}

async function generateWait(ms: number) {
    while (playing) {
        generateGrid(matrix);
        matrix = game.iterateMatrix(matrix);
        await new Promise(resolve => setTimeout(resolve, ms));
    }
}
