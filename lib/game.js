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
    // $('img.yin-yang')[0].className = 'yin-yang-spinning';
    this.leftDfsBuilder.drawMaze(this.ctxLeft);
    this.rightDfsBuilder.drawMaze(this.ctxRight);
  }

  // $('img.yin-yang')[0].className = 'yin-yang-spinning';
      // $('img.yin-yang-spinning')[0].className = 'yin-yang';

}

export default Game;
