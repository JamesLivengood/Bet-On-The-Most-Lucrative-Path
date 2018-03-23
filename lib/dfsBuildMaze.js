import bfsMazeSolver from './bfsMazeSolver';

class dfsBuildMaze {
  constructor(grid, lineLength) {
    this.grid = grid;
    this.gridSize = this.grid.size;
    this.array = this.grid.array;
    this.lineLength = lineLength;
    this.findGridRoot.bind(this)();
    this.stack = [this.root];
    // this.workingStack = [this.root];
    this.currNode = this.root;
    this.lastNode = this.root; // {x: this.root.x, y: this.root.y, parent: 'root'};
    this.doneDrawing = this.doneDrawing.bind(this);
    this.drawMaze = this.drawMaze.bind(this);
    this.setWalls = this.setWalls.bind(this);
    this.candidateNeighbors = this.candidateNeighbors.bind(this);
    this.checkNeighborWalls = this.checkNeighborWalls.bind(this);
  }

  doneDrawing() {
    let bool = 0;
    this.array.forEach(array =>
      array.forEach(node => {
        if (!(node.visited)) {
          bool++;
        }
    }
    ));
    return 0 === bool;
  }

  drawMaze(ctx) {
    this.root.visited = true; // set root to visited
    ctx.fillStyle = 'green'; // begin green maze creating square
    ctx.fillRect(this.currNode.x * this.lineLength, this.currNode.y * this.lineLength, this.lineLength, this.lineLength);
    // push a random neighbor onto the BACK of the back-track safety stack
    this.stack.push(this.candidateNeighbors(this.currNode)[Math.floor(Math.random() * this.candidateNeighbors(this.currNode).length)]);
    // push the random neighbor pushed onto the back of the stack onto the FRONT of the workign stack
    this.currNode = (this.stack[this.stack.length-1]);
    // debugger
    //workingstack[0] is current node, stack[-1] is also current node
    //this.lastNode is root by default

    var interv = setInterval(() => {
      // ctx.clearRect(this.lastNode.x * this.lineLength, this.lastNode.y * this.lineLength, this.lineLength, this.lineLength);
      if (this.doneDrawing()) {
        // debugger
        new bfsMazeSolver(this.grid, 16);
        clearInterval(interv);
        // bfsSolver.solvePath();
      }
      // debugger
      this.currNode.visited = true;
      ctx.fillStyle = 'green';
      // make current node temporarily green
      // debugger
      ctx.fillRect(this.currNode.x * this.lineLength, this.currNode.y * this.lineLength, this.lineLength, this.lineLength);
      // let wallIdx = this.lastNode.neighbors.indexOf(this.currNode.coords);
      let wallIdx = this.getIndex(this.lastNode.neighbors, this.currNode.coords);
            // set walls of last node
      this.lastNode.walls[wallIdx] = false;
      this.checkNeighborWalls(this.lastNode);
            // draw prev blue square with walls
      this.lastNode.drawWalls(ctx, this.lineLength);
      // ctx.fillStyle = 'blue';
      // ctx.fillRect(this.lastNode.x * this.lineLength, this.lastNode.y * this.lineLength, this.lineLength, this.lineLength);

      let currNodeWallIdx = (wallIdx + 2) % 4; // if lastnodes free wall was top, currNode's is bottom, etc.
      this.currNode.walls[currNodeWallIdx] = false;
      // make current node the child of last node
      this.lastNode.children.push(this.currNode);
      // set current node's parent to last node
      this.currNode.parent = this.lastNode;

      this.lastNode = this.currNode;
      if (this.candidateNeighbors(this.currNode).length > 0) {
        // debugger
        this.stack.push(this.candidateNeighbors(this.currNode)[Math.floor(Math.random() * this.candidateNeighbors(this.currNode).length)]);
        this.currNode = this.stack[this.stack.length-1];
      } else {
        // debugger
        //get rid of last which is currNode
        if (this.stack[this.stack.length-1] === this.currNode) {
          this.stack.pop();
        }
        this.currNode = this.stack.pop();
      }
      // debugger
    }, 0.25);

  }

  checkNeighborWalls(node) {

    this.neighborsInsideGrid(node).forEach((coords, idx) => {
      // debugger
      if (!this.array[coords[1]][coords[0]].walls[(idx + 2) % 4]) {
        node.walls[idx] = false;
      }
    });
  }

  getIndex(arr, coord) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i][0] === coord[0] && arr[i][1] === coord[1]) {
        return i;
      }
    }
  }

  setWalls(node) {

  }

  findGridRoot() {
    this.grid.array.map((array) =>
      { return array.map((node) => {
      if (node.parent === 'root')
          {this.root = node;}
      });
    });
  }

  candidateNeighbors(node) {
    const cand = [];
    this.neighborsInsideGrid(node).forEach((pos) => {
      let node = this.array[pos[1]][pos[0]];
      if (!(node.visited)) {
        cand.push(node);
      }
    });
    // if (cand.length === 0) {
    //   this.neighborsInsideGrid(node).forEach((pos) => {
    //     let node = this.array[pos[1]][pos[0]];
    //     cand.push(node);
    //   });
    // }
    return cand;
  }

  neighborsInsideGrid(node) {
    const validNeighbors = [];
    node.neighbors.forEach((pos) => {
      if (pos[0] >= 0 && pos[0] <= this.gridSize-1 && pos[1] >= 0 && pos[1] <= this.gridSize-1) {
        validNeighbors.push(pos);
      }
    });
    return validNeighbors;
  }

}

export default dfsBuildMaze;
