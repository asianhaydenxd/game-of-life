/* Conway's Game of Life is played out on a matrix of on and off cells.

 * On each iteration, each cell would switch or not switch under the
 * following conditions:

 * If the cell is alive, it must have 2 or 3 live neighbors to stay
 * alive, otherwise it dies.
 * 
 * If the cell is dead, it must have exactly 3 live neighbors to spring
 * to life, otherwise it stays dead.
 */

// Each cell of the matrix is either off or on
export enum Cell { Off, On }

// A matrix is a 2D array of slots
export type Matrix = Array<Array<Cell>>;

// Create a blank matrix
export function makeMatrix(width: number, height: number, generate: () => Cell): Matrix {
    // Instantiate an array of columns of cells
    let array = new Array<Array<Cell>>(width);

    // Instantiate the array's columns of cells
    for (let i: number = 0; i < width; i++) {
        array[i] = Array<Cell>(height);

        // Instantiate the columns' cells
        for (let j: number = 0; j < height; j++) {
            array[i][j] = generate();
        }
    }

    return array;
}

// Count the number of live neighbors around a coordinate on a matrix
export function getLiveNeighbors(x: number, y: number, matrix: Matrix): number {
    let count: number = 0;
    
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i + x < 0 || matrix.length    <= i + x) continue;
            if (j + y < 0 || matrix[0].length <= j + y) continue;
            if (i == 0 && j == 0) continue;

            if (matrix[x+i][y+j] == Cell.On) count++;
        }
    }
    
    return count;
}

// Return the matrix after a generation
export function iterateMatrix(matrix: Matrix): Matrix {
    let newMatrix = makeMatrix(matrix.length, matrix[0].length, () => Cell.Off);

    // Iterate through every cell
    for (let x = 0; x < matrix.length; x++) {
        for (let y = 0; y < matrix[x].length; y++) {
            const liveNeighbors = getLiveNeighbors(x, y, matrix)

            if (
                (matrix[x][y] == Cell.On  && (liveNeighbors == 2 || liveNeighbors == 3)) ||
                (matrix[x][y] == Cell.Off && liveNeighbors == 3)
            ) {
                newMatrix[x][y] = Cell.On;
            } else {
                newMatrix[x][y] = Cell.Off;
            }
        }
    }

    return newMatrix;
}
