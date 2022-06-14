import * as game from "./game.js";

const width = 40;
const height = 40;
const generationMethod = () => Math.random() < 0.5 ? game.Cell.On : game.Cell.Off
const generateMatrix = () => game.makeMatrix(width, height, generationMethod);

let matrix = generateMatrix(); // Starting matrix
let playing: boolean = false; // Has the play button been pressed?

// Generate the grid to be displayed on the site upon loading
generateGrid(matrix);

// When the Play button is clicked, the matrix should start iterating on its own.
// When the Pause button is clicked, the matrix's iteration is halted.
document.getElementById("pause")?.addEventListener("click", () => {
    playing = !playing;
    document.getElementById("pause")!.innerHTML = playing ? "Pause" : "Play";
    playLoop();
});

// When the Restart button is clicked, it should reset the matrix to an original random state.
document.getElementById("refresh")?.addEventListener("click", () => {
    matrix = generateMatrix();
    generateGrid(matrix);
});

// When the Next Generation button is clicked, it should take the matrix to the next generation.
document.getElementById("nextgen")?.addEventListener("click", () => {
    matrix = game.iterateMatrix(matrix);
    generateGrid(matrix);
});

// Repeatedly update the grid until it is no longer in play
async function playLoop() {
    // Get slider setting for play speed
    const slider = () => parseInt((<HTMLInputElement>document.getElementById("speed")).value)

    // From 0 to 500 ms (half a second)
    const rate = () => 500 - (5 * slider()) // Multiplied by 5 because the original slider value is 0-100, so 100*5=500

    while (playing) {
        generateGrid(matrix);
        matrix = game.iterateMatrix(matrix);
        await new Promise(resolve => setTimeout(resolve, rate()));
    }
}


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
