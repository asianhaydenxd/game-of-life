/* Conway's Game of Life is played out on a matrix of on and off cells.

 * On each iteration, each cell would switch or not switch under the
 * following conditions:

 * If the cell is alive, it must have 2 or 3 live neighbors to stay
 * alive, otherwise it dies.
 * 
 * If the cell is dead, it must have exactly 3 live neighbors to spring
 * to life, otherwise it stays dead.
 */

// Each cell of the matrix is
enum Cell { Off, On }

// A matrix is a 2D array of slots
type Matrix = Array<Array<Cell>>;

// Create a blank matrix
export function makeMatrix(width: number, height: number): Matrix {
    // Instantiate an array of columns of cells
    let array = new Array<Array<Cell>>(width);

    // Instantiate the array's columns of cells
    for (let i: number = 0; i < width; i++) {
        array[i] = Array<Cell>(height);

        // Instantiate the columns' cells
        for (let j: number = 0; j < height; j++) {
            array[i][j] = Cell.Off;
        }
    }

    return array
}