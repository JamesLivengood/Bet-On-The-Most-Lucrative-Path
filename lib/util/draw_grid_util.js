

const DrawGridUtil = (ctx, grid) => {
  // debugger
  grid.array.map((row) => {
    row.map((node) => {
      ctx.strokeStyle = 'rgb(75,	55,	23)';
      ctx.lineWidth=0.5;
      return(
        ctx.strokeRect(node.x * 16, node.y * 16, 16, 16)
      );
    });
  });
};

export default DrawGridUtil;
