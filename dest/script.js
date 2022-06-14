var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b, _c;
import * as game from "./game.js";
const width = 40;
const height = 40;
const generationMethod = () => Math.random() < 0.5 ? game.Cell.On : game.Cell.Off;
const generateMatrix = () => game.makeMatrix(width, height, generationMethod);
let matrix = generateMatrix(); // Starting matrix
let playing = false; // Has the play button been pressed?
// Generate the grid to be displayed on the site upon loading
generateGrid(matrix);
// When the Play button is clicked, the matrix should start iterating on its own.
// When the Pause button is clicked, the matrix's iteration is halted.
(_a = document.getElementById("pause")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    playing = !playing;
    document.getElementById("pause").innerHTML = playing ? "Pause" : "Play";
    playLoop();
});
// When the Restart button is clicked, it should reset the matrix to an original random state.
(_b = document.getElementById("refresh")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
    matrix = generateMatrix();
    generateGrid(matrix);
});
// When the Next Generation button is clicked, it should take the matrix to the next generation.
(_c = document.getElementById("nextgen")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => {
    matrix = game.iterateMatrix(matrix);
    generateGrid(matrix);
});
// Repeatedly update the grid until it is no longer in play
function playLoop() {
    return __awaiter(this, void 0, void 0, function* () {
        // Get slider setting for play speed
        const slider = () => parseInt(document.getElementById("speed").value);
        // From 0 to 500 ms (half a second)
        const rate = () => 500 - (5 * slider()); // Multiplied by 5 because the original slider value is 0-100, so 100*5=500
        while (playing) {
            generateGrid(matrix);
            matrix = game.iterateMatrix(matrix);
            yield new Promise(resolve => setTimeout(resolve, rate()));
        }
    });
}
function generateGrid(matrix) {
    const grid = document.getElementById("grid");
    while (grid === null || grid === void 0 ? void 0 : grid.firstChild) {
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
            // When a cell is clicked, it will switch its cell state
            cell.addEventListener("click", function () {
                if (!playing) {
                    if (this.className == "cell onstate0")
                        this.className = "cell onstate1";
                    else if (this.className == "cell onstate1")
                        this.className = "cell onstate0";
                }
            });
            row.appendChild(cell);
        }
        grid === null || grid === void 0 ? void 0 : grid.appendChild(row);
    }
    return grid;
}
