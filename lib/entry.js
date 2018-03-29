import Grid from './grid';
import dfsBuildMaze from './dfsBuildMaze';
import bfsMazeSolver from './bfsMazeSolver';
import Game from './game';

document.addEventListener("DOMContentLoaded", () => {
  // const canvasLeft = document.getElementsByTagName("canvas")[0];
  // const canvasRight = document.getElementsByTagName("canvas")[1];
  // canvasLeft.width = 464;
  // canvasLeft.height = 464;
  // canvasRight.width = 464;
  // canvasRight.height = 464;
  // const ctxLeft = canvasLeft.getContext("2d");
  // const ctxRight = canvasRight.getContext("2d");
  // const leftGrid = new Grid([0, 28], [28, 0], 29, ctxLeft, 16);
  // leftGrid.populateGrid();
  // const rightGrid = new Grid([28, 28], [0, 0], 29, ctxRight, 16);
  // rightGrid.populateGrid();
  // leftGrid.drawGrid(16);
  // rightGrid.drawGrid(16);
  // const leftDfsBuilder = new dfsBuildMaze(leftGrid, 16, 'left');
  // const rightDfsBuilder = new dfsBuildMaze(rightGrid, 16, 'right');
  // const game = new Game(leftGrid, rightGrid, leftDfsBuilder, rightDfsBuilder, ctxLeft, ctxRight);
  new Game().setup();


  // DrawGridUtil(ctxLeft, leftGrid, 16);
  // DrawGridUtil(ctxRight, rightGrid, 16);

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



  window.intervPromise = () => {
    return new Promise(function(resolve, reject) {
      let counter = 0;
      const timer = setInterval(() => {
        if (counter > 10) {
          clearInterval(timer);
          resolve();
        }
        console.log(`${counter}`);
        counter++;
      }, 500);
    });
  };

});
