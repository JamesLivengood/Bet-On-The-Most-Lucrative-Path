import bfsMazeSolver from './bfsMazeSolver';

class dfsBuildMaze {
  constructor(grid, lineLength, side) {
    this.grid = grid;
    this.gridSize = this.grid.size;
    this.array = this.grid.array;
    this.lineLength = lineLength;
    this.findGridRoot.bind(this)(); // gets root of grid and stores it in this.root
    this.stack = [this.root];
    this.currNode = this.root;
    this.lastNode = this.root;
    this.inBackTrace = false; // to know when backtracing through maze
    this.side = side; //left grid or right grid? for dissappearing grid angle animation

    this.doneDrawing = this.doneDrawing.bind(this);
    this.drawMaze = this.drawMaze.bind(this);
    this.setWallsAndParent = this.setWallsAndParent.bind(this);
    this.candidateNeighbors = this.candidateNeighbors.bind(this);
    this.checkNeighborWalls = this.checkNeighborWalls.bind(this);
    this.mazeCreateNavigator = this.mazeCreateNavigator.bind(this);
    this.randomCandidateNeighbor = this.randomCandidateNeighbor.bind(this);
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

  mazeCreateNavigator(ctx) {
    this.stack.push(this.currNode);
    this.currNode.visited = true;
    // ctx.fillStyle = 'green';
    // ctx.fillRect(this.currNode.x * this.lineLength, this.currNode.y * this.lineLength, this.lineLength, this.lineLength);
  }

  randomCandidateNeighbor() {
    return this.candidateNeighbors(this.currNode)[Math.floor(Math.random() * this.candidateNeighbors(this.currNode).length)];
  }

  drawMaze(ctx) {
    this.mazeCreateNavigator(ctx);
    this.currNode = this.randomCandidateNeighbor();
    var interv = setInterval(() => {
      // $('img.yin-yang')[0].className = 'yin-yang-spinning';
      // ctx.clearRect(this.lastNode.x * this.lineLength, this.lastNode.y * this.lineLength, this.lineLength, this.lineLength);
      if (this.doneDrawing()) {
        // bfsSolver.drawPath(ctx, this.lineLength);
        const bfsSolver = new bfsMazeSolver(this.grid, this.lineLength, this.side);
        bfsSolver.drawPath(ctx)
        clearInterval(interv);
        // debugger
      }
      this.mazeCreateNavigator(ctx);
      this.setWallsAndParent(ctx);
      this.lastNode = this.currNode;
      if (this.candidateNeighbors(this.currNode).length > 0) {
        this.currNode = this.randomCandidateNeighbor();
        this.inBackTrace = false;
      } else {
        if (this.stack[this.stack.length-1] === this.currNode) {
          this.stack.pop();
        }
        this.currNode = this.stack.pop();
        this.inBackTrace = true;
      }
    }, 0);

  }

  checkNeighborWalls(node) {
    // THIS IDX IS WRONG NEED IDX FROM NEIGHBORS
    this.neighborsInsideGrid(node).forEach((coords) => {
      let idx = this.getIndex(node.neighbors, coords);
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

  setWallsAndParent(ctx) {
    let wallIdx = this.getIndex(this.lastNode.neighbors, this.currNode.coords);
          // set wall boolean values of last node
    this.lastNode.walls[wallIdx] = false;
    this.checkNeighborWalls(this.lastNode);
          // draw prev blue square with walls
    this.lastNode.fillBlue(ctx, this.lineLength);
    this.lastNode.drawWalls(ctx, this.lineLength);
    let currNodeWallIdx = (wallIdx + 2) % 4; // if lastnodes free wall was top, currNode's is bottom, etc.
    this.currNode.walls[currNodeWallIdx] = false;
    if (!(this.inBackTrace)){
      // make current node the child of last node
      this.lastNode.children.push(this.currNode);
      // set current node's parent to last node
      this.currNode.parent = this.lastNode;
    };
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
