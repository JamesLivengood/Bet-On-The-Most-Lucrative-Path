import bfsMazeSolver from './bfsMazeSolver';


class Game {
  constructor(leftGrid, rightGrid, leftDfsBuilder, rightDfsBuilder, ctxLeft, ctxRight) {
    this.leftGrid = leftGrid;
    this.rightGrid = rightGrid;
    this.leftDfsBuilder = leftDfsBuilder;
    this.rightDfsBuilder = rightDfsBuilder;
    this.ctxLeft = ctxLeft;
    this.ctxRight = ctxRight;
    this.bank = 500;
    this.scoreDOM = document.getElementsByClassName('score')[0];
    this.play = this.play.bind(this);
  }



  play() {
    // debugger
    $('img.yin-yang-img')[0].className = 'yin-yang-begin-spin';
    $('div.yin-yang-div')[0].className = 'yin-yang-div-fast-spin';
    const left = () => this.leftDfsBuilder.drawMaze(this.ctxLeft);
    const right = () => this.rightDfsBuilder.drawMaze(this.ctxRight);
    // left();
    // right();
//     this.leftDfsBuilder.drawMaze(this.ctxLeft);
// this.rightDfsBuilder.drawMaze(this.ctxRight);


    left().then(() => {
      // const $yinYang = $('img.yin-yang-begin-spin')[0].detach();
      // debugger
      $('div.yin-yang-div-fast-spin')[0].className = 'yin-yang-div-slow-spin';
    });
    // const that = this;
    // const promise = new Promise(function(resolve, reject) {
    //   // if (that.leftDfsBuilder.doneDrawing() && that.rightDfsBuilder.doneDrawing()) {
    //
    //     resolve();
    //   // }
    // });

    // Promise.all([left(), right()]).then(() => $('div.yin-yang-div-fast-spin')[0].className = 'yin-yang-div-slow-spin');
    // const leftBuild = () => {
    //   this.leftDfsBuilder.drawMaze(this.ctxLeft);
    //   if (this.leftDfsBuilder.doneDrawing()) {
    //     $('img.yin-yang-spinning')[0].className = 'yin-yang-spinning-slower';
    //   }
    // };
    // leftBuild();
  }

  // $('img.yin-yang')[0].className = 'yin-yang-spinning';
      // $('img.yin-yang-spinning')[0].className = 'yin-yang';

}

export default Game;
