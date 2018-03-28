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

  countdownTimer() {
    const that = this;
    return new Promise(function(resolve, reject) {
      that.leftDfsBuilder.setWallsAndParent(that.ctxLeft);
      that.rightDfsBuilder.setWallsAndParent(that.ctxRight);
      // $('img.yin-yang-begin-spin').attr('id', 'swag');
      $('div.yin-yang-div-fast-spin')[0].className = 'yin-yang-div-slow-spin';
      let $countdown = $('p.countdown')[0];
      $('p.countdown').attr('id', 'pulse');
      let count = 10;
      var interval = setInterval(() => {
        if (count < 0) {
          clearInterval(interval);
          count ='';
          resolve();
        }
        $countdown.innerHTML = count;
        // $countdown.fadeIn(500);

        // $countdown.animate({
        //     left: '250px',
        //     height: '+=150px',
        //     width: '+=150px'
        // });

        count--;
      }, 1000);
    });
  }

  play() {
    $('img.yin-yang-img')[0].className = 'yin-yang-begin-spin';
    $('div.yin-yang-div')[0].className = 'yin-yang-div-fast-spin';
    const left = () => this.leftDfsBuilder.drawMaze(this.ctxLeft);
    const right = () => this.rightDfsBuilder.drawMaze(this.ctxRight);

    Promise.all([left(), right()])
      .then(()=> { this.countdownTimer()
      .then(()=>{
        const leftBfsSolver = new bfsMazeSolver(this.leftGrid, 16, 'left');
        const rightBfsSolver = new bfsMazeSolver(this.rightGrid, 16, 'right');
        leftBfsSolver.drawPath(this.ctxLeft);
        rightBfsSolver.drawPath(this.ctxRight);
      });
    });
  }

  // $('div.yin-yang-div-fast-spin')[0].className = 'yin-yang-div-slow-spin';

}

export default Game;

// .then(()=>{
//   const bfsSolver = new bfsMazeSolver(this.leftGrid, leftDfsBuilder.lineLength, leftDfsBuilder.side);
//   bfsSolver.drawPath(this.ctxLeft);
//   $('img.yin-yang-begin-spin')[0].className = 'yin-yang-begin-slow-spin';
//   $('div.yin-yang-div-fast-spin')[0].className = 'yin-yang-div-slow-spin';
//     });
// this.rightDfsBuilder.drawMaze(this.ctxRight);

// const taskResolution = (fnc1, fnc2, period) => {
//   return new Promise((resolve, reject) => {
//     const interval = setInterval(() => {
//       debugger
//       if (fnc1() && fnc2()) {
//         clearInterval(interval);
//         resolve('complete');
//       }
//     }, period);
//   });
// };
//
// taskResolution(this.leftDfsBuilder.doneDrawing, this.rightDfsBuilder.doneDrawing, 100).then(()=>console.log('swag'));

// const waitForIt = () => {
//   while(!(this.leftDfsBuilder.done) || !(this.rightDfsBuilder.done)) {
//     setTimeout(console.log('a'), 100);
//   }
//   $('div.yin-yang-div-fast-spin')[0].className = 'yin-yang-div-slow-spin';
// };
// waitForIt();
// const that = this;
// const leftPromise = () => {return new Promise(function(resolve, reject) {
//     that.leftDfsBuilder.drawMaze(that.ctxLeft);
//     if (that.leftDfsBuilder.done) {
//       resolve();
//     }
//   });
// };

// leftPromise().then(()=>$('div.yin-yang-div-fast-spin')[0].className = 'yin-yang-div-slow-spin');

// const left = () => this.leftDfsBuilder.drawMaze(this.ctxLeft);
// const that = this;

// const right = () => this.rightDfsBuilder.drawMaze(this.ctxRight);
// left();
// right();
//     this.leftDfsBuilder.drawMaze(this.ctxLeft);
// this.rightDfsBuilder.drawMaze(this.ctxRight);


// leftPromise().then(() => {
  //   // const $yinYang = $('img.yin-yang-begin-spin').detach;
  //   // $yinYang[0].className = '.yin-yang-begin-slow-spin';
  //   // debugger
  //   // $('img.yin-yang-begin-spin')[0].className = 'yin-yang-begin-slow-spin';
  //   $('div.yin-yang-div-fast-spin')[0].className = 'yin-yang-div-slow-spin';
  //   // $yinYang.appendTo('.yin-yang-div-slow-spin');
  // });
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


// $('img.yin-yang')[0].className = 'yin-yang-spinning';
// $('img.yin-yang-spinning')[0].className = 'yin-yang';
