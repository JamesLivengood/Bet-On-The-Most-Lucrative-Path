

document.addEventListener("DOMContentLoaded", () => {
  const canvasLeft = document.getElementsByTagName("canvas")[0];
  const canvasRight = document.getElementsByTagName("canvas")[1];
  canvasLeft.width = 450;
  canvasLeft.height = 450;
  canvasRight.width = 450;
  canvasRight.height = 450;
  const ctxLeft = canvasLeft.getContext("2d");
  const ctxRight = canvasRight.getContext("2d");

  ctxLeft.fillRect(0, 147, 12, 6);
  ctxLeft.fillRect(0, 0, 6, 6);
  ctxLeft.fillRect(294, 147, 12, 6);
  // const game = new Game();
  // new GameView(game, ctx).start();
});
