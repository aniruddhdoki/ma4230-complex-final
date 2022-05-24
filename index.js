// const game = new GameOfLife(5, )

window.onload = () => {
  // const canvas = document.getElementById("field");
  // const ctx = canvas.getContext("2d");

  const game = new GameOfLife(5, 1000, 1000, "#000000", "#ffffff", "field");
  game.setUp();
  window.setInterval(() => {
    game.run();
  }, 5000);
};
