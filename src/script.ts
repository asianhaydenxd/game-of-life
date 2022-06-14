import * as game from "./game.js";

let matrix = game.makeMatrix(5, 5, () => Math.random() < 0.5 ? game.Cell.On : game.Cell.Off);

function generateGrid(matrix: game.Matrix) {
    const grid = document.getElementById("grid")

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
}

generateGrid(matrix);