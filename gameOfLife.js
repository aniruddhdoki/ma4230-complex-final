class GameOfLife {
  constructor(cellSize, canvas, deadColor, liveColor) {
    // define the length of the side of each square cell, in pixels
    this.cellSize = cellSize;
    // number of rows
    this.cellsPerColumn = Math.floor(canvas.width / this.cellSize);
    // number of columns
    this.cellsPerRow = Math.floor(canvas.height / this.cellSize);
    // hold the state of the current generation
    this.currentGeneration = [];
    // hold the state of the previous generation
    this.previousGeneration = [];
    // define the color of the dead cells
    this.deadColor = deadColor;
    // define the color of the living cells
    this.liveColor = this.liveColor;
  }

  // initialize field with a 2d array filled with dead cells (0)
  initializeField() {
    for (let i = 0; i < this.cellsPerRow; i++) {
      this.currentGeneration[i] = [];
      for (let j = 0; j < cellsPerColumn.length; j++) {
        this.currentGeneration[i][j] = 0;
      }
    }
    this.previousGeneration = this.currentGeneration;
  }

  // generate seed for the field
  seed() {
    for (let i = 0; i < this.cellsPerRow; i++) {
      for (let j = 0; j < this.cellsPerColumn; j++) {
        this.currentGeneration[i][j] = Math.random() > 0.5 ? 1 : 0;
      }
    }
  }

  // colorize the cells based on the state (1 is alive, 0 is dead)
  colorize() {
    for (let i = 0; i < this.cellsPerRow; i++) {
      for (let j = 0; j < this.cellsPerColumn; j++) {
        var color;
        this.currentGeneration[i][j] == 1
          ? (color = this.liveColor)
          : (color = this.deadColor);
        ctx.fillStyle = color;
        ctx.fillRect(
          j * this.cellSize,
          i * this.cellSize,
          this.cellSize,
          this.cellSize
        );
      }
    }
  }

  // make the current generation the previous generation
  lifeCycle() {
    for (let i = 0; i < this.cellsPerRow; i++) {
      for (let j = 0; j < this.cellsPerColumn; j++) {
        this.previousGeneration = this.updateCellValues(i, j);
      }
    }
    this.currentGeneration = this.previousGeneration;
  }

  // count the neighbors of a cell to see how many are dead or alive
  checkNeighbors(i, j) {
    var neighbors = 0;
    for (x = i - 1; x <= i + 1; x++) {
      for (y = j - 1; y <= j + 1; y++) {
        x !== i && y !== j
          ? (neighbors += this.checkNeighborsHelper(x, y))
          : null;
      }
    }
    return neighbors;
  }

  // helper function to handle index exceptions
  checkNeighborsHelper(i, j) {
    try {
      return this.currentGeneration[i][j];
    } catch {
      return 0;
    }
  }

  // update the value of a cell based on the number of neighbors
  updateCellValues(i, j) {
    const neighbors = this.checkNeighbors(i, j);
    if (neighbors > 3 || neighbors < 2) {
      return 0;
    } else if (this.currentGeneration[i][j] === 0 && neighbors === 3) {
      return 1;
    } else {
      return this.currentGeneration[i][j];
    }
  }
}
