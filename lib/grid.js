import Node from './node';

class Grid {
  constructor(root_pos, end_pos, size, ctx, lineLength) {
    this.array = [...Array(size)].map(i => Array(size));
    this.size = size;
    this.populateGrid = this.populateGrid.bind(this);
    this.root_pos = root_pos;
    this.end_pos = end_pos;
    this.ctx = ctx;
    this.lineLength = lineLength
    this.returnRoot = this.returnRoot.bind(this);
    this.returnEnd = this.returnEnd.bind(this);
    this.drawGrid = this.drawGrid.bind(this);
    this.blankGrid = this.blankGrid.bind(this);
    this.fullyBlankGrid = this.fullyBlankGrid.bind(this);
    this.fullyBlankGridRight = this.fullyBlankGridRight.bind(this);
    this.blankGridRight = this.blankGridRight.bind(this);
    this.neighborsInsideGrid = this.neighborsInsideGrid.bind(this);
    this.ensureChosenNeighborsWallsStayUpOnClear = this.ensureChosenNeighborsWallsStayUpOnClear.bind(this);
  }

  populateGrid() {
    // debugger
    for (var i = 0; i < this.array.length; i++) {
      for (var j = 0; j < this.array[i].length; j++) {
        this.array[i][j] = new Node([j, i], null);
      }
    }
    // debugger
    this.array[this.root_pos[1]][this.root_pos[0]].parent = 'root';
  }

  drawGrid() {
    this.array.map((row) =>
      row.map((node) =>
        node.drawNode(this.ctx, this.lineLength)
      )
    );
    // debugger
    // this.ctx.fillStyle = 'rgba(75,	55,	23, 1)';
    // this.ctx.fillText("start", 16*this.root_pos[0], 16*this.root_pos[1]+12);
    this.returnRoot().fillBlue(this.ctx, this.lineLength, 'green');
    this.returnEnd().fillBlue(this.ctx, this.lineLength, 'green');
  }

  ensureChosenNeighborsWallsStayUpOnClear(node) {
      node.walls = [false, false, false, false];
      this.neighborsInsideGrid(node).forEach((pos) => {
        if (this.array[pos[1]][pos[0]].chosen) {
          let wallIdx = this.getIndex(node.neighbors, pos);
          node.walls[wallIdx] = true;
        }
      });
      node.drawWalls(this.ctx, this.lineLength);
  }

  blankGrid() {
    // this.ctx.clearRect(0, 0, this.lineLength * this.size, this.lineLength * this.size);
    // this.drawGrid();
    let x = 0;
    let y = 28;
    let descending = false;
    var fadeAwayBlue = setInterval(()=> {
      if (descending === false && x > 28) {
        clearInterval(fadeAwayBlue);
      }
      if (descending){
        // debugger
        for (var psuedoX = x; psuedoX < 29; psuedoX++, y++) {
          let node = this.array[y][psuedoX];
          if (!(node.chosen)) {
            this.ctx.clearRect(psuedoX*this.lineLength, y*this.lineLength, this.lineLength, this.lineLength);
            node.drawNode(this.ctx, this.lineLength);
            this.ensureChosenNeighborsWallsStayUpOnClear(node);
          }
        }
      } else {
        for (var psuedoY = y; psuedoY < 29; psuedoY++, x++) {
          let node = this.array[psuedoY][x];
          if (!(node.chosen)) {
            this.ctx.clearRect(x*this.lineLength, psuedoY*this.lineLength, this.lineLength, this.lineLength);
            node.drawNode(this.ctx, this.lineLength);
            this.ensureChosenNeighborsWallsStayUpOnClear(node);
          }
          if (psuedoY === x && x === 28) {
            x = -1;
            descending = true;
          }
        }
      }
      if (descending) {
        x++;
        y = 0;
      } else {
      x = 0;
      y--;
      }
    }, 20);


  }

  blankGridRight() {
    let y = this.size-1;
    let descending = false;
    let x = this.size-1;
    // debugger
    var gridRight = setInterval(() => {
      if (descending && x < 0) {
        clearInterval(gridRight);
      }
      if (!(descending)){
        // debugger
        x = this.size-1;
        for (var psuedoY = y; psuedoY < this.size; psuedoY++, x--) {
          let node = this.array[psuedoY][x];
          if (!(node.chosen)) {
            this.ctx.clearRect(x*this.lineLength, psuedoY*this.lineLength, this.lineLength, this.lineLength);
            node.drawNode(this.ctx, this.lineLength);
            this.ensureChosenNeighborsWallsStayUpOnClear(node);
          }
          if (x == 0 && psuedoY == this.size-1) {
            descending = true;
            x = this.size-1;
          }
        }
        y--;
      } else {
          y = 0;
          for (var psuedoX = x; psuedoX >= 0; psuedoX--, y++) {
            let node = this.array[y][psuedoX];
            if (!(node.chosen)) {
              this.ctx.clearRect(psuedoX*this.lineLength, y*this.lineLength, this.lineLength, this.lineLength);
              node.drawNode(this.ctx, this.lineLength);
              this.ensureChosenNeighborsWallsStayUpOnClear(node);
            }
          }
          x--;
      }
    }, 20);
  }

  getIndex(arr, coord) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i][0] === coord[0] && arr[i][1] === coord[1]) {
        return i;
      }
    }
  }

  neighborsInsideGrid(node) {
    const validNeighbors = [];
    node.neighbors.forEach((pos) => {
      if (pos[0] >= 0 && pos[0] <= this.size-1 && pos[1] >= 0 && pos[1] <= this.size-1) {
        validNeighbors.push(pos);
      }
    });
    return validNeighbors;
  }

  returnRoot() {
    return this.array[this.root_pos[1]][this.root_pos[0]];
  }

  returnEnd() {
    return this.array[this.end_pos[1]][this.end_pos[0]];
  }

  fullyBlankGrid() {
    // this.ctx.clearRect(0, 0, this.lineLength * this.size, this.lineLength * this.size);
    // this.drawGrid();
    let x = 0;
    let y = 28;
    let descending = false;
    var fadeAwayBlue = setInterval(()=> {
      if (descending === false && x > 28) {
        clearInterval(fadeAwayBlue);
      }
      if (descending){
        for (var psuedoX = x; psuedoX < 29; psuedoX++, y++) {
          let node = this.array[y][psuedoX];
          this.ctx.clearRect(psuedoX*this.lineLength, y*this.lineLength, this.lineLength, this.lineLength);
          node.drawNode(this.ctx, this.lineLength);
        }
      } else {
        for (var psuedoY = y; psuedoY < 29; psuedoY++, x++) {
          let node = this.array[psuedoY][x];
          this.ctx.clearRect(x*this.lineLength, psuedoY*this.lineLength, this.lineLength, this.lineLength);
          node.drawNode(this.ctx, this.lineLength);
          if (psuedoY === x && x === 28) {
            x = -1;
            descending = true;
          }
        }
      }
      if (descending) {
        x++;
        y = 0;
      } else {
      x = 0;
      y--;
      }
    }, 20);
  }

  fullyBlankGridRight() {
    let y = this.size-1;
    let descending = false;
    let x = this.size-1;
    // debugger
    var gridRight = setInterval(() => {
      if (descending && x < 0) {
        clearInterval(gridRight);
      }
      if (!(descending)){
        // debugger
        x = this.size-1;
        for (var psuedoY = y; psuedoY < this.size; psuedoY++, x--) {
          let node = this.array[psuedoY][x];
          this.ctx.clearRect(x*this.lineLength, psuedoY*this.lineLength, this.lineLength, this.lineLength);
          node.drawNode(this.ctx, this.lineLength);
          if (x == 0 && psuedoY == this.size-1) {
            descending = true;
            x = this.size-1;
          }
        }
        y--;
      } else {
          y = 0;
          for (var psuedoX = x; psuedoX >= 0; psuedoX--, y++) {
            let node = this.array[y][psuedoX];
            this.ctx.clearRect(psuedoX*this.lineLength, y*this.lineLength, this.lineLength, this.lineLength);
            node.drawNode(this.ctx, this.lineLength);
          }
          x--;
      }
    }, 20);
  }


}

export default Grid;
