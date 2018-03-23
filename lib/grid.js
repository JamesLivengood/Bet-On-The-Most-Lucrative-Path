import Node from './node';

class Grid {
  constructor(root_pos, end_pos, size) {
    this.array = [...Array(size)].map(i => Array(size));
    this.size = size;
    this.populateGrid = this.populateGrid.bind(this);
    this.root_pos = root_pos;
    this.end_pos = end_pos;
    this.returnRoot = this.returnRoot.bind(this);
    this.returnEnd = this.returnEnd.bind(this);
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

  drawGrid(ctx, lineLength) {
    this.array.map((row) =>
      row.map((node) =>
        node.drawNode(ctx, lineLength)
      )
    );
  }

  returnRoot() {
    return this.array[this.root_pos[1]][this.root_pos[0]];
  }

  returnEnd() {
    return this.array[this.end_pos[1]][this.end_pos[0]];
  }

}

export default Grid;
