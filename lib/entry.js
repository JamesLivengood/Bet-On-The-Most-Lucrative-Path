import Grid from './grid';
import DrawGridUtil from './util/draw_grid_util';
import dfsBuildMaze from './dfsBuildMaze';

document.addEventListener("DOMContentLoaded", () => {
  const canvasLeft = document.getElementsByTagName("canvas")[0];
  const canvasRight = document.getElementsByTagName("canvas")[1];
  canvasLeft.width = 464;
  canvasLeft.height = 464;
  canvasRight.width = 464;
  canvasRight.height = 464;
  const ctxLeft = canvasLeft.getContext("2d");
  const ctxRight = canvasRight.getContext("2d");

  // debugger
  const leftGrid = new Grid([28, 0]);
  leftGrid.populateGrid();
  const rightGrid = new Grid([28, 28]);
  rightGrid.populateGrid();
  DrawGridUtil(ctxLeft, leftGrid);
  DrawGridUtil(ctxRight, rightGrid);

  // ctxLeft.fillStyle = 'blue';
  // ctxLeft.fillRect(0, 448, 8, 8);

  // ctxLeft.fillStyle = 'blue';
  // ctxLeft.fillRect(0, 147, 12, 6);
  // ctxLeft.fillRect(0, 0, 6, 6);
  // ctxLeft.fillRect(294, 147, 12, 6);
  //
  // ctxRight.beginPath();
  // ctxRight.moveTo(0, 0);
  // ctxRight.lineTo(425, 425);
  // ctxRight.strokeStyle = "red";
  // ctxRight.stroke();
});
