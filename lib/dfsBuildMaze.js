
class dfsBuildMaze {
  constructor(grid, lineLength) {
    this.grid = grid;
    this.array = this.grid.array;
    this.lineLength = lineLength;
    this.findGridRoot.bind(this)();
    this.doneDrawing = this.doneDrawing.bind(this);
    this.drawMaze = this.drawMaze.bind(this);
  }

  doneDrawing() {
    let bool = 0;
    this.array.forEach(array =>
      array.forEach(node => {
        // debugger
        if (!node.parent) {
          bool++;
        }
    }
    ));
    return 0 === bool;
  }

  drawMaze(ctx) {
    let currNode = this.root;
    ctx.fillStyle = 'green';

      ctx.fillRect(currNode.x * this.lineLength, currNode.y * this.lineLength, this.lineLength, this.lineLength);
      setInterval(()=> {
        currNode = currNode.candidates()[Math.floor(Math.random() * currNode.candidates.length)];
        ctx.fillStyle = 'green';
      },500);
    // for (this.doneDrawing == false) {
    // }
  }

  findGridRoot() {
    this.grid.array.map((array) =>
      { return array.map((node) => {
      if (node.parent === 'root')
          {this.root = node;}
      });
    });
  }

}

export default dfsBuildMaze;
