
class bfsMazeSolver {
  constructor(grid, lineLength) {

    this.grid = grid;
    this.lineLength = lineLength;
    this.solveMaze = this.solveMaze.bind(this);
    this.solvePath = this.solvePath.bind(this);
    // debugger
    // this.solvePath();
  }

  solveMaze() {
    const rootNode = this.grid.returnRoot;
    const endNode = this.grid.returnEnd;
    const queue = [rootNode];
    while (queue.length > 0) {
      currNode = queue.shift();
      if (currNode == endNode) {
        return currNode;
      }
      queue.concat(currNode.children);
    }
  }

  solvePath() {
    // debugger
    const ancestry = [this.grid.returnEnd()];
    let node = this.grid.returnEnd();
    while (!(node.parent === 'root')) {
      // debugger
      node = node.parent;
      ancestry.unshift(node);
    }
    ancestry.unshift(this.grid.returnRoot());
    return ancestry;
  }
}


export default bfsMazeSolver;
