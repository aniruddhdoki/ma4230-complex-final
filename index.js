document.onload = () => {
  console.log("document has loaded");
  const game = new GameOfLife(5, 1000, 1000, "#000000", "#ffffff", "field");
  console.log(game);
  console.log("game of life class constructed");
  game.setUp();
  window.setInterval(() => {
    game.run();
  }, 5000);
};
