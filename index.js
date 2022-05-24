// document.onload = () => {
//   console.log("document has loaded");
//   const game = new GameOfLife(5, 1000, 1000, "#000000", "#ffffff", "field");
//   console.log(game);
//   console.log("game of life class constructed");
//   game.setUp();
//   window.setInterval(() => {
//     game.run();
//   }, 5000);
// };

const canvas = document.querySelector("#field");
const ctx = canvas.getContext("2d");

const game = new GameOfLife(10, 1000, 1000, "#000000", "#ffffff", "field", 0.9);
game.setUp();
window.onload = () => {
  console.log("window loaded");
  document.querySelector("#start").addEventListener("click", () => {
    console.log("game started");
    game.seed();
    game.colorize();
    window.setInterval(() => {
      game.run();
    }, 1000);
  });
  document.querySelector("#stop").addEventListener("click", () => {
    console.log("game stopped");
    game.setUp();
  });
};
