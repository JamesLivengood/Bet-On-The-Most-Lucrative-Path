import Node from './node';

class Grid {
  constructor(root_pos) {
    this.array = [...Array(29)].map(i => Array(29));
    this.populateGrid = this.populateGrid.bind(this);
    this.root_pos = root_pos;
  }

  populateGrid() {
    // debugger
    for (var i = 0; i < this.array.length; i++) {
      for (var j = 0; j < this.array[i].length; j++) {
        this.array[i][j] = new Node([j, i], null);
      }
    }
    this.array[this.root_pos[0]][this.root_pos[1]].parent = 'root';
  }
}

export default Grid;
