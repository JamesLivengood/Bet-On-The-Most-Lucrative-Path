
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
    const ancestry = this.solvePath();
    let endCount = ancestry.length;
    let counter = 0;
    this.solveValue = 0;
    let valueSpan = $(`span.${this.side}-value`)[0];
    // debugger
    valueSpan.className = `${this.side}-value-active`;
    var drawSolve = setInterval(() => {
      if (counter >= endCount-1) {
        clearInterval(drawSolve);
        if (this.side === 'right') {
          this.grid.blankGridRight();
        } else {
          this.grid.blankGrid();
        }
      }
      let node = ancestry[counter];
      node.drawRedPath(ctx, this.lineLength, ancestry.length);
      this.solveValue = this.solveValue + node.value;
      valueSpan.textContent = `Value = ${this.solveValue}`;
      counter++;
      // debugger
      // ctx.fillStyle = 'red';
      // ctx.fillRect((node.x * this.lineLength)+5, (node.y * this.lineLength)+5, this.lineLength-5, this.lineLength-5);
    }, 10);
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
