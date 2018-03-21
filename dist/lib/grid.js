
document.addEventListener("DOMContentLoaded", () => {
  const canvasLeft = document.getElementsByTagName("canvas")[0];
  const canvasRight = document.getElementsByTagName("canvas")[1];
  canvasRight.hide();

  const ctxLeft = canvasLeft.getContext("2d");
  const ctxRight = canvasRight.getContext("2d");

  // const game = new Game();
  // new GameView(game, ctx).start();
});
