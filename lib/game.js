import Grid from './grid';
import dfsBuildMaze from './dfsBuildMaze';
import bfsMazeSolver from './bfsMazeSolver';
import Firestore from './firestore';

class Game {
  constructor(leftGrid, rightGrid, leftDfsBuilder, rightDfsBuilder, ctxLeft, ctxRight) {
    this.leftGrid = leftGrid;
    this.rightGrid = rightGrid;
    this.leftDfsBuilder = leftDfsBuilder;
    this.rightDfsBuilder = rightDfsBuilder;
    this.ctxLeft = ctxLeft;
    this.ctxRight = ctxRight;
    this.canvasLeft = null;
    this.canvasRight = null;
    this.bank = 10000;
    this.scoreDOM = document.getElementsByClassName('score')[0];
    this.firestore = new Firestore();
    this.play = this.play.bind(this);
    this.paused = true;
    this.stillPlaying = true;
    this.selectSide = this.selectSide.bind(this);
    this.calculateBetResult = this.calculateBetResult.bind(this);
    this.startGame = this.startGame.bind(this);
    this.setup = this.setup.bind(this);
    this.sendScore = this.sendScore.bind(this);
    $('button.buy-out-button').on('click', ()=>this.sendScore());
  }

  sendScore() {
    const data = {
      name: 'swagmaster',
      score: this.bank,
    };
    this.firestore.pushScore(data);
    this.stillPlaying = false;
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

  selectSide(e) {
    if (e.target.className === 'left-button active' || e.target.className === 'left-button active selected') {
      if (this.betChoice === 'left') {
        this.betChoice = null;
      } else {
      this.betChoice = 'left';
      }
    } else if (e.target.className === 'right-button active' || e.target.className === 'right-button active selected') {
      if (this.betChoice === 'right') {
        this.betChoice = null;
      } else {
      this.betChoice = 'right';
      }
    }
    if (this.betChoice === 'left') {
      $('button.left-button').addClass('selected');
      $('button.right-button')[0].className = 'right-button active';
    } else if (this.betChoice === 'right') {
      $('button.right-button').addClass('selected');
      $('button.left-button')[0].className = 'left-button active';
    } else if (this.betChoice === null) {
      $('button.left-button')[0].className = 'left-button active';
      $('button.right-button')[0].className = 'right-button active';
    }
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async calculateBetResult() {
    $('strong.scale-holder').addClass('scales');
    $('p.left-scale')[0].innerHTML = this.leftBfsSolver.solveValue;
    $('p.right-scale')[0].innerHTML = this.rightBfsSolver.solveValue;
    // $( "p.left-scale" )[0].fadeTo( "slow", 0.33 );
    // $('div.full-scale-div').addClass('scales');
    if (!(this.betChoice)) {
      this.newBank = this.bank - 1000;
    } else if (this.betChoice === 'left') {
      this.newBank = this.bank + (this.leftBfsSolver.solveValue - this.rightBfsSolver.solveValue);
    } else if (this.betChoice === 'right') {
      this.newBank = this.bank + (this.rightBfsSolver.solveValue - this.leftBfsSolver.solveValue);
    }
    const $score = $('span.score')[0];
    await this.sleep(3000);
    return new Promise((resolve, reject) => {
      var interv = setInterval(()=> {
        if (this.bank === this.newBank) {
          clearInterval(interv);
          resolve();
        }
        $score.innerHTML = this.bank + '  <img src="./images/single_blue_hundred.jpg">';
        this.bank+=10*(Math.sign(this.newBank-this.bank));
      }, 0);
    });
  }

  async setup() {
    this.canvasLeft = document.getElementsByTagName("canvas")[0];
    this.canvasRight = document.getElementsByTagName("canvas")[1];
    this.canvasLeft.width = 464;
    this.canvasLeft.height = 464;
    this.canvasRight.width = 464;
    this.canvasRight.height = 464;
    this.ctxLeft = this.canvasLeft.getContext("2d");
    this.ctxRight = this.canvasRight.getContext("2d");
    this.play();
  }

  async play() {
    this.leftGrid = new Grid([0, 28], [28, 0], 29, this.ctxLeft, 16);
    this.leftGrid.populateGrid();
    this.rightGrid = new Grid([28, 28], [0, 0], 29, this.ctxRight, 16);
    this.rightGrid.populateGrid();
    this.leftGrid.drawGrid(16);
    this.rightGrid.drawGrid(16);
      // this.leftGrid = new Grid([0, 28], [28, 0], 29, this.ctxLeft, 16);
      // this.leftGrid.populateGrid();
      // this.rightGrid = new Grid([28, 28], [0, 0], 29, this.ctxRight, 16);
      // this.rightGrid.populateGrid();
      // this.leftGrid.drawGrid(16);
      // this.rightGrid.drawGrid(16);
      $('img.yin-yang-img').on('click', this.startGame);
      // this.leftDfsBuilder = new dfsBuildMaze(this.leftGrid, 16, 'left');
      // this.rightDfsBuilder = new dfsBuildMaze(this.rightGrid, 16, 'right');
      // $('img.yin-yang-img').addClass('pulse');
      // $('div.yin-yang-div')[0].className = 'yin-yang-div-fast-spin';
      // await this.sleep(2500);
      // const left = () => this.leftDfsBuilder.drawMaze(this.ctxLeft);
      // const right = () => this.rightDfsBuilder.drawMaze(this.ctxRight);
      //
      // await Promise.all([left(), right()]);
      // $('button.left-button').on('click', this.selectSide);
      // $('button.left-button').addClass('active');
      // $('button.right-button').on('click', this.selectSide);
      // $('button.right-button').addClass('active');
      // await this.countdownTimer();
      // this.leftBfsSolver = new bfsMazeSolver(this.leftGrid, 16, 'left');
      // this.rightBfsSolver = new bfsMazeSolver(this.rightGrid, 16, 'right');
      // await $('button.left-button').off();
      // $('button.left-button').removeClass('active');
      // $('button.right-button').off();
      // $('button.right-button').removeClass('active');
      // await Promise.all([this.leftBfsSolver.drawPath(this.ctxLeft), this.rightBfsSolver.drawPath(this.ctxRight)]);
      // await this.sleep(2000);
      // await this.calculateBetResult();
      // await this.sleep(3000);
      // $('strong.scale-holder').removeClass('scales');
      // $('div.yin-yang-div-slow-spin')[0].className = 'yin-yang-div';
      // $('img.yin-yang-img').removeClass('pulse');
      // $(`span.right-value-active`)[0].className = 'right-value';
      // $(`span.left-value-active`)[0].className = 'left-value';
      // this.leftGrid.fullyBlankGridRight();
      // this.rightGrid.fullyBlankGrid();
      // $('span.right-value')[0].innerHTML = 'Value = 0';
      // $('span.left-value')[0].innerHTML = 'Value = 0';
      // $('button.right-button')[0].className = 'right-button';
      // $('button.left-button')[0].className = 'left-button';
  }

  async startGame() {
    if (this.paused) {
      this.paused = false;
    while (this.stillPlaying) {
      this.leftGrid = new Grid([0, 28], [28, 0], 29, this.ctxLeft, 16);
      this.leftGrid.populateGrid();
      this.rightGrid = new Grid([28, 28], [0, 0], 29, this.ctxRight, 16);
      this.rightGrid.populateGrid();
      this.leftGrid.drawGrid(16);
      this.rightGrid.drawGrid(16);
      this.leftDfsBuilder = new dfsBuildMaze(this.leftGrid, 16, 'left');
      this.rightDfsBuilder = new dfsBuildMaze(this.rightGrid, 16, 'right');
      $('img.yin-yang-img').addClass('pulse');
      $('div.yin-yang-div')[0].className = 'yin-yang-div-fast-spin';
      await this.sleep(2500);
      const left = () => this.leftDfsBuilder.drawMaze(this.ctxLeft);
      const right = () => this.rightDfsBuilder.drawMaze(this.ctxRight);

      await Promise.all([left(), right()]);
      $('button.left-button').on('click', this.selectSide);
      $('button.left-button').addClass('active');
      $('button.right-button').on('click', this.selectSide);
      $('button.right-button').addClass('active');
      await this.countdownTimer();
      this.leftBfsSolver = new bfsMazeSolver(this.leftGrid, 16, 'left');
      this.rightBfsSolver = new bfsMazeSolver(this.rightGrid, 16, 'right');
      await $('button.left-button').off();
      $('button.left-button').removeClass('active');
      $('button.right-button').off();
      $('button.right-button').removeClass('active');
      await Promise.all([this.leftBfsSolver.drawPath(this.ctxLeft), this.rightBfsSolver.drawPath(this.ctxRight)]);
      $('div.yin-yang-div-slow-spin')[0].className = 'yin-yang-div';
      await this.sleep(2000);
      await this.calculateBetResult();
      await this.sleep(3000);
      $('strong.scale-holder').removeClass('scales');
      $('img.yin-yang-img').removeClass('pulse');
      $(`span.right-value-active`)[0].className = 'right-value';
      $(`span.left-value-active`)[0].className = 'left-value';
      this.leftGrid.fullyBlankGridRight();
      this.rightGrid.fullyBlankGrid();
      $('span.right-value')[0].innerHTML = 'Value = 0';
      $('span.left-value')[0].innerHTML = 'Value = 0';
      $('button.right-button')[0].className = 'right-button';
      $('button.left-button')[0].className = 'left-button';
      this.play();
    }
    }
  }
  // $('div.yin-yang-div-fast-spin')[0].className = 'yin-yang-div-slow-spin';

}

export default Game;
