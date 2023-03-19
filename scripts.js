const gameboard = (() => {
  let grid = Array.from(Array(3), () => new Array(3).fill(""));
  let xCount = 0;
  let oCount = 0;
  const minMoves = Math.min(grid.length, grid[0].length);

  const checkWinner = (row, column, marker) => {
    const numColumns = grid[0].length;
    const numRows = grid.length;
    const diagSize = Math.min(numRows, numColumns);

    /// check in row
    let rowCount = 0;
    for (let i = 0; i < numColumns; i += 1) {
      if (i !== column) {
        if (grid[row][i] === marker) {
          rowCount += 1;
        }
      }
    }
    if (rowCount === 2) {
      return true;
    }

    /// check in col
    let colCount = 0;
    for (let i = 0; i < numRows; i += 1) {
      if (i !== row) {
        if (grid[i][column] === marker) {
          colCount += 1;
        }
      }
    }
    if (colCount === 2) {
      return true;
    }

    /// check on diagonal
    let diagCount = 0;
    for (let i = 0; i < diagSize; i += 1) {
      if (i !== row) {
        if (grid[i][i] === marker) {
          diagCount += 1;
        }
      }
    }
    if (diagCount === 2) {
      return true;
    }

    return false;
  };

  /// returns true if valid winning move, false otherwise
  const placeX = (row, column) => {
    if (!grid[row][column] && column < grid[0].length && row < grid.length) {
      /// if a marker has not been previously placed and row/col not out of bounds
      grid[row][column] = "X";
      xCount += 1;

      if (xCount >= minMoves) {
        return checkWinner(row, column, "X");
      }
    }
    return false;
  };

  /// returns true if valid winning move, false otherwise
  const placeO = (row, column) => {
    if (!grid[row][column] && column < grid[0].length && row < grid.length) {
      /// if a marker has not been previously placed and row/col not out of bounds
      grid[row][column] = "O";
      oCount += 1;

      if (oCount >= minMoves) {
        return checkWinner(row, column, "X");
      }
    }
    return false;
  };

  const reset = () => {
    grid = grid.map((row) => row.map(() => ""));
  };

  const isFull = () => xCount + oCount === grid.length * grid[0].length;
  return { placeX, placeO, reset, isFull };
})();
