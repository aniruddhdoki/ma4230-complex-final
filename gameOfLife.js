class GameOfLife {
  constructor(cellSize, height, width, deadColor, liveColor, canvasid, seedProbability) {
    console.log("game of life class constructor called");
    // define the length of the side of each square cell, in pixels
    this.cellSize = cellSize;
    // number of rows
    this.cellsPerColumn = Math.floor(width / this.cellSize);
    // number of columns
    this.cellsPerRow = Math.floor(height / this.cellSize);
    // hold the state of the current generation
    this.currentGeneration = [];
    // hold the state of the previous generation
    this.previousGeneration = [];
    // define the color of the dead cells
    this.deadColor = deadColor;
    // define the color of the living cells
    this.liveColor = liveColor;
    // id of the canvas
    this.canvasid = canvasid;
    // live/dead probability
    this.seedProbability = seedProbability;
    console.log("game of life class constructor completed");
  }

  // initialize field with a 2d array filled with dead cells (0)
  initializeField() {
    for (let i = 0; i < this.cellsPerRow; i++) {
      this.currentGeneration[i] = [];
      for (let j = 0; j < this.cellsPerColumn; j++) {
        this.currentGeneration[i][j] = 0;
      }
    }
    this.previousGeneration = this.currentGeneration;
  }

  // generate seed for the field
  seed() {
    for (let i = 0; i < this.cellsPerRow; i++) {
      for (let j = 0; j < this.cellsPerColumn; j++) {
        this.currentGeneration[i][j] = Math.random() > this.seedProbability ? 1 : 0;
      }
    }
  }

  // colorize the cells based on the state (1 is alive, 0 is dead)
  colorize() {
    const canvas = document.getElementById(this.canvasid);
    const ctx = canvas.getContext("2d");

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

  // count the neighbors of a cell to see how many are dead or alive
  checkNeighbors(i, j) {
    var neighbors = 0;
    neighbors += this.checkNeighborsHelper(i - 1, j - 1);
    neighbors += this.checkNeighborsHelper(i - 1, j);
    neighbors += this.checkNeighborsHelper(i - 1, j + 1);
    neighbors += this.checkNeighborsHelper(i, j - 1);
    neighbors += this.checkNeighborsHelper(i, j + 1);
    neighbors += this.checkNeighborsHelper(i + 1, j - 1);
    neighbors += this.checkNeighborsHelper(i + 1, j);
    neighbors += this.checkNeighborsHelper(i + 1, j + 1);
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

  // make the current generation the previous generation
  lifeCycle() {
    console.log("lifeCycle() entered");
    for (let i = 0; i < this.cellsPerRow; i++) {
      for (let j = 0; j < this.cellsPerColumn; j++) {
        this.previousGeneration[i][j] = this.updateCellValues(i, j);
        console.log(
          `current cell: (${i}, ${j})\n value: ${this.previousGeneration[i][j]}`
        );
      }
    }
    // console.log(this.previousGeneration)
    this.currentGeneration = this.previousGeneration;
  }

  // setup the field
  setUp() {
    this.initializeField();
  }

  run() {
    this.lifeCycle();
    this.colorize();
  }
}
