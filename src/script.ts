import * as game from "./game.js";

let matrix = game.makeMatrix(40, 40, () => Math.random() < 0.5 ? game.Cell.On : game.Cell.Off);

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

generateGrid(matrix);