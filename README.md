# Conway's Game Of Life
Since we learned about cellular automata, I've been very interested in implementing Conway's Game of Life in a web format. So, I decided to do it for my final project. 

## The Program
This program was implemented using the model-view-controller design pattern. The model, which contains the logic of the program and is the "brain" of the application, is located in the `gameOfLife.js` file. The controller, which coordinates the interaction between the view and model, is located in `index.js`. The view is located in `index.html` and is what is accessed from the browser.

In order to display each generation, we need some way to create a grid of cells. This can be accomplished by utilizing the `<canvas>` element, or by using various javascript development packages such as p5.js or d3.js. In the future, implementing the algorithm with these packages may become useful in expanding the capabilities of the program, however I elected to use the `<canvas>` element for this implementation. The properties of this element were initialized in the `index.js` file.
### Algorithm
The version that I am submitting is based off the rules for a 2d array where each cell has eight neighbors. The ruleset is as follows:

- if a living cell has less than two live neighbors, it dies from underpopulation
- if a living cell with two or three live neighbors lives
- if a live cell has more than three neighbors, it dies from overpopulation
- if a dead cell has three live neighbors, it becomes a live cell through reproduction

An initial seed is required to start off the game of life. This is accomplished by randomly starting cells as dead or alive.

---
## Implementation

### Explanation of `index.js`
- 

###  Explanation of `gameOfLife.js`
- Variables
  - `cellSize` = the length of the side of each square cell in pixels
  - `cellsPerColumn` = the number of columns required to fill the field
  - `cellsPerRow` = the number of rows required to fill the field
  - `currentGeneration` = the 2d array containing the field array of the current generation
  - `previousGeneration` = the 2d array containing the field array the previous generation
  - `deadColor` = the color of the dead cells as a hexcode
  - `liveColor` = the color of the live cells as a hexcode

- Functions
  - `initializeField()` 
    - This function initializes the canvas element with a 2d array filled with dead cells. Using the number of rows required to fill the field, I create a new array for each, and then iterate over each row to fill it with dead cells. Now, each cell in the field can be accessed by indexing `currentGeneration[i][j]`, where `i` and 'j' specify the x & y 'coordinates' of the cell.
  - `seed()`
    - This function generates a random seed for the 2d array on initialization. While I could have implemented this in the `initializeField()` function, I separated it so that I can develop future methods of seed generation in the future that incorporate features such as user interaction.
  - `colorize()`
    - So far, all of the logic that has been created is headless, meaning that there is no graphical output. This function takes the 2d field array and assigns each cell a color to be displayed. Then, the context of the canvas element is accessed and a rectangle is created and filled with the proper coordinates, dimensions, and color
  - `lifeCycle()`
    - This function goes through each of the cell and returns a new state based on the neighbors for a cell, and assigns this value to `previousGeneration`. Once the new state is generated, it becomes the current generation.
  - `checkNeighbors(i, j)`
    - This is a helper function that is used in `updateCellValues(i, j)`, used to count the number of neighbors a cell has. The logic for this function is simple; the eight neighbors of the cell must have their values checked and added to the total.
  - `checkNeighborsHelper(i, j)`
    - This is a helper function that is used in `checkNeighbors(i, j)` used to handle index exceptions. For example, if a cell that is on the edge of the field is being checked, it obviously does not have eight neighbors. So, if a cell that doesn't exist is being checked, it will automatically return 0 to indicate that no neighbor exists.
  - `updateCellValues(i, j)`
    - Taking the coordinates of a cell as the input, this function returns the new state of a cell after counting the number of neighbors each cell has.