import Grid from './grid';
import dfsBuildWithTree from './dfsBuildWithTree';
import bfsMazeSolver from './bfsMazeSolver';
import dfsBuildMaze from './dfsBuildMaze';

const howItWorks = () => {
  const slowCanvas = document.getElementsByClassName("slow-canvas")[0];
  // const slowCanvas.width = 464-80;
  // const slowCanvas.height = 464-80;
  slowCanvas.width = 464-127;
  slowCanvas.height = 464-127;
  const ctxSlow = slowCanvas.getContext("2d");
  // const slowGrid = new Grid([0, 11], [11, 0], 12, const ctxSlow, 32);
  const slowGrid = new Grid([0, 6], [6, 0], 7, ctxSlow, 48);
  slowGrid.populateGrid();
  slowGrid.drawGrid(12);
  const slowDfsBuilder = new dfsBuildWithTree(slowGrid, 48, 'left');
  slowDfsBuilder.speed = 200;
  slowDfsBuilder.drawMaze(ctxSlow);






  const semiFast = document.getElementsByClassName('semi-fast-canvas')[0];
  semiFast.width = 464;
  semiFast.height = 464;
  const ctxSemiFast = semiFast.getContext("2d");
  const semiFastGrid = new Grid([0, 28], [28, 0], 29, ctxSemiFast, 16);
  semiFastGrid.populateGrid();
  semiFastGrid.drawGrid(16);
  const semiFastDfsBuilder = new dfsBuildMaze(semiFastGrid, 16, 'left');
  semiFastDfsBuilder.speed = 150;
  semiFastDfsBuilder.drawMaze(ctxSemiFast);
}

export default howItWorks;
