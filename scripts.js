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

    /// check on downwards diag
    let diagCount = 0;
    for (let i = 0; i < diagSize; i += 1) {
      if (grid[i][i] === marker) {
        diagCount += 1;
      }
    }
    if (diagCount === 3) {
      return true;
    }

    /// check on upwards diag
    diagCount = 0;
    for (let i = 0; i < diagSize; i += 1) {
      if (grid[i][diagSize - i - 1] === marker) {
        diagCount += 1;
      }
    }
    if (diagCount === 3) {
      return true;
    }

    return false;
  };

  /// returns true if valid winning move, false otherwise
  const placeX = (row, column) => {
    let winner = false;
    let validMove = false;
    if (!grid[row][column] && column < grid[0].length && row < grid.length) {
      /// if a marker has not been previously placed and row/col not out of bounds
      grid[row][column] = "X";
      xCount += 1;
      validMove = true;

      if (xCount >= minMoves) {
        winner = checkWinner(row, column, "X");
      }
    }
    return { turnWinner: winner, isValid: validMove };
  };

  /// returns true if valid winning move, false otherwise
  const placeO = (row, column) => {
    let winner = false;
    let validMove = false;
    if (!grid[row][column] && column < grid[0].length && row < grid.length) {
      /// if a marker has not been previously placed and row/col not out of bounds
      grid[row][column] = "O";
      oCount += 1;
      validMove = true;

      if (oCount >= minMoves) {
        winner = checkWinner(row, column, "O");
      }
    }
    return { turnWinner: winner, isValid: validMove };
  };

  const reset = () => {
    grid = grid.map((row) => row.map(() => ""));
  };

  const isFull = () => xCount + oCount === grid.length * grid[0].length;

  const getBoard = () => grid;
  return { placeX, placeO, reset, isFull, getBoard };
})();

const game = (() => {
  let currentTurn = "X";
  let winner = null;

  const xMove = (row, col) => {
    const moveInfo = gameboard.placeX(row, col);
    if (moveInfo.isValid) {
      if (moveInfo.turnWinner) {
        winner = "X";
      }
      currentTurn = "O";
    }
    return moveInfo.isValid;
  };

  const oMove = (row, col) => {
    const moveInfo = gameboard.placeO(row, col);
    if (moveInfo.isValid) {
      if (moveInfo.turnWinner) {
        winner = "O";
      }
      currentTurn = "X";
    }
    return moveInfo.isValid;
  };

  const getMove = () => currentTurn;

  const makeCurrentMove = (row, col) => {
    if (winner == null) {
      if (currentTurn === "X") {
        return xMove(row, col);
      }
      return oMove(row, col);
    }
    return false;
  };

  const reset = () => {
    winner = null;
    currentTurn = "X";
    gameboard.reset();
  };

  const getWinner = () => winner;

  return { xMove, oMove, getWinner, makeCurrentMove, reset, getMove };
})();

const display = (() => {
  const gridSquares = document.querySelectorAll(".gridsquare");
  const resetButton = document.querySelector(".reset");

  gridSquares.forEach((gridSquare) => {
    gridSquare.addEventListener("click", () => {
      if (
        game.makeCurrentMove(
          parseInt(gridSquare.getAttribute("data-row"), 10),
          parseInt(gridSquare.getAttribute("data-col"), 10)
        )
      ) {
        gridSquare.textContent = game.getMove() === "X" ? "O" : "X";
      }
    });
  });

  resetButton.addEventListener("click", () => {
    gridSquares.forEach((gridSquare) => {
      gridSquare.textContent = "";
    });
    game.reset();
  });
})();
