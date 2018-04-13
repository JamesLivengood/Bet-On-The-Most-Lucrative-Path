import DrawGridUtil from './util/draw_grid_util';

class Node {
  constructor(coords, parent) {
    this.coords = coords;
    this.parent = parent;
    this.children = [];
    this.x = coords[0];
    this.y = coords[1];
    this.visited = false;
    this.value = Math.floor(Math.random()*5) * 10;
    this.maxValue = 50;
    this.chosen = false;
    this.neighbors = [
      [this.x, this.y - 1],
      [this.x + 1, this.y],
      [this.x, this.y + 1],
      [this.x - 1, this.y],
    ];
    this.drawNode = this.drawNode.bind(this);
    this.drawLine = this.drawLine.bind(this);
    this.walls = [true, true, true, true];
    this.drawWalls = this.drawWalls.bind(this);
    this.drawRedPath = this.drawRedPath.bind(this);
    this.fillBlue = this.fillBlue.bind(this);
  }


  distance() {
    if (this.parent) {
      if (this.parent === 'root') {
        return 0;
      } else {
      return this.parent.distance() + 1;
      }
    } else {
      return nil;
    }
  }

  drawNode(ctx, lineLength) {
    let a = this.x * lineLength;
    let b = this.y * lineLength;
    // top line
    this.drawLine(a, b, a+lineLength, b, ctx);
    // right line
    this.drawLine(a + lineLength, b, a + lineLength, b + lineLength, ctx);
    // bottom line
    this.drawLine(a + lineLength, b + lineLength, a, b + lineLength, ctx);
    //left line
    this.drawLine(a, b + lineLength, a, b, ctx);
    // ctx.strokeRect(this.x * lineLength, this.y * lineLength, lineLength, lineLength);
  }


  drawWalls(ctx, lineLength) {
    this.visited = true;
    let a = this.x * lineLength;
    let b = this.y * lineLength;
    if (this.walls[0]) {
      this.drawWallLine(a-(lineLength/16), b, a+lineLength+(lineLength/16), b, ctx, lineLength);
    }
    if (this.walls[1]) {
      this.drawWallLine(a + lineLength, b-(lineLength/16), a + lineLength, b + lineLength+(lineLength/16), ctx, lineLength);
    }
    if (this.walls[2]) {
      this.drawWallLine(a + lineLength+(lineLength/16), b + lineLength, a-(lineLength/16), b + lineLength, ctx, lineLength);
    }
    if (this.walls[3]) {
      this.drawWallLine(a, b + lineLength+(lineLength/16), a, b-(lineLength/16), ctx, lineLength);
    }
  }

  fillBlue(ctx, lineLength, color = null) {
    let fraction1 = 1 - (this.value / this.maxValue)*0.3;
    let fraction = 228 - ((this.value / this.maxValue) * 200);
    // debugger
    let r = (this.value/this.maxValue)*20;
    let g = 29 + (fraction * 62);
    let b = 89 + (fraction * 140);
    // ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${fraction})`;
    ctx.clearRect(this.x * lineLength, this.y * lineLength, lineLength, lineLength);
    ctx.fillStyle = color || `rgba(0, 20, ${fraction}, 1)`;
    // ctx.fillStyle = `rgba(${r}, ${20+r}, ${fraction}, 1)`;
    // 18	29	89
    // 59	91	230
    ctx.fillRect(this.x * lineLength, this.y * lineLength, lineLength, lineLength);
  }

  drawRedPath(ctx, lineLength, lineageLength) {
    let a = this.x * lineLength;
    let b = this.y * lineLength;
    let opacity = (lineageLength - this.distance())/lineageLength;
    ctx.fillStyle = 'black';
    ctx.fillRect(this.x * lineLength, this.y * lineLength, lineLength, lineLength);
    ctx.fillStyle = `rgba(170, 5, 20, ${opacity})`;
    ctx.fillRect(this.x * lineLength, this.y * lineLength, lineLength, lineLength);
    if (this.walls[0]) {
      this.drawWallLine(a, b-1, a+lineLength, b-1, ctx);
    }
    if (this.walls[1]) {
      this.drawWallLine(a + lineLength + 1, b, a + lineLength + 1, b + lineLength, ctx);
    }
    if (this.walls[2]) {
      this.drawWallLine(a + lineLength, b + lineLength - 1, a, b + lineLength - 1, ctx);
    }
    if (this.walls[3]) {
      this.drawWallLine(a-1, b + lineLength, a-1, b, ctx);
    }
  }

  drawWallLine(a, b, c, d, ctx, lineLength) {
    ctx.beginPath();
    ctx.moveTo(a, b);
    ctx.lineTo(c, d);
    ctx.strokeStyle = 'rgb(60, 179, 50)';
    ctx.lineWidth = lineLength / 8;
    ctx.stroke();
  }

  drawLine(a, b, c, d, ctx) {
    ctx.beginPath();
    ctx.moveTo(a, b);
    ctx.lineTo(c, d);
    ctx.strokeStyle = 'rgba(75,	55,	23, 1)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }

}

export default Node;



// manual draw line in this.drawNode

// ctx.beginPath();
// ctx.moveTo(a, b);
// ctx.lineTo(a + lineLength, b);
// ctx.strokeStyle = 'rgba(75,	55,	23, 1)';
// ctx.lineWidth = 1;
// ctx.stroke();
//
// ctx.beginPath();
// ctx.moveTo(a, b);
// ctx.lineTo(a + lineLength, b);
// ctx.strokeStyle = 'rgba(75,	55,	23, 1)';
// ctx.lineWidth = 1;
// ctx.stroke();
//
// ctx.beginPath();
// ctx.moveTo(a + lineLength, b);
// ctx.lineTo(a + lineLength, b + lineLength);
// ctx.strokeStyle = 'rgba(75,	55,	23, 1)';
// ctx.lineWidth = 1;
// ctx.stroke();
//
// ctx.beginPath();
// ctx.moveTo(a, b + lineLength);
// ctx.lineTo(a + lineLength, b + lineLength);
// ctx.strokeStyle = 'rgba(75,	55,	23, 1)';
// ctx.lineWidth = 1;
// ctx.stroke();
