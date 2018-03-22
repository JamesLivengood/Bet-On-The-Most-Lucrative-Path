import DrawGridUtil from './util/draw_grid_util';

class Node {
  constructor(coords, parent) {
    this.coords = coords;
    this.parent = parent;
    this.x = coords[0];
    this.y = coords[1];
    this.drawNode = this.drawNode.bind(this);
    this.drawLine = this.drawLine.bind(this);
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
