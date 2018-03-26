
class bfsMazeSolver {
  constructor(grid, lineLength, side) {

    this.grid = grid;
    this.lineLength = lineLength;
    this.side = side;
    // this.counter = 0;
    this.solveMaze = this.solveMaze.bind(this);
    this.solvePath = this.solvePath.bind(this);
    this.drawPath = this.drawPath.bind(this);
    this.scoreDOM = document.getElementsByClassName('score')[0];
    // this.clearGridAndRedrawPath = this.clearGridAndRedrawPath.bind(this);
  }

  solveMaze() {
    const rootNode = this.grid.returnRoot();
    const endNode = this.grid.returnEnd();
    let queue = [rootNode];
    while (queue.length > 0) {
      let currNode = queue.shift();
      if (currNode == endNode) {

        return currNode;
      }
      queue = queue.concat(currNode.children);
    }
  }

  solvePath() {
    const ancestry = [this.grid.returnEnd()];
    let node = this.grid.returnEnd();
    node.chosen = true;
    while (!(node.parent === 'root')) {
      node = node.parent;
      node.chosen = true;
      ancestry.unshift(node);
    }
    return ancestry;
  }

  drawPath(ctx) {
    // debugger
    const ancestry = this.solvePath();
    let endCount = ancestry.length;
    let counter = 0;
    var drawSolve = setInterval(() => {
      // debugger
      if (counter === endCount) {
        // this.clearGridAndRedrawPath(ctx, ancestry);
        if (this.side === 'right') {
          this.grid.blankGridRight();
        } else {
          this.grid.blankGrid();
        }
        clearInterval(drawSolve);
      }
      let node = ancestry[counter];
      // debugger
      node.drawRedPath(ctx, this.lineLength, ancestry.length);
      counter++;
      // debugger
      // ctx.fillStyle = 'red';
      // ctx.fillRect((node.x * this.lineLength)+5, (node.y * this.lineLength)+5, this.lineLength-5, this.lineLength-5);
    }, 0);
    // ancestry.forEach((node) => {
    //   ctx.fillStyle = 'red';
    //   ctx.fillRect(node.x * lineLength, node.y * lineLength, lineLength, lineLength);
    // });

  }

  // clearGridAndRedrawPath(ctx, ancestry) {
  //   this.grid.blankGrid();
  //   // ancestry.forEach((node) =>{
  //   //   node.drawRedPath(ctx, this.lineLength, ancestry.length)
  //   // });
  // }

}


export default bfsMazeSolver;
