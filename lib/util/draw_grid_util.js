

const DrawGridUtil = (ctx, grid, lineLength) => {
  // debugger
  grid.array.map((row) => {
    row.map((node) => {
      ctx.strokeStyle = 'rgb(75,	55,	23)';
      ctx.lineWidth=0.5;
      return(
        ctx.strokeRect(node.x * lineLength, node.y * lineLength, lineLength, lineLength)
      );
    });
  });
};

export default DrawGridUtil;
