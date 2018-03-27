/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/entry.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/bfsMazeSolver.js":
/*!******************************!*\
  !*** ./lib/bfsMazeSolver.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n\nclass bfsMazeSolver {\n  constructor(grid, lineLength, side) {\n\n    this.grid = grid;\n    this.lineLength = lineLength;\n    this.side = side;\n    // this.counter = 0;\n    this.solveMaze = this.solveMaze.bind(this);\n    this.solvePath = this.solvePath.bind(this);\n    this.drawPath = this.drawPath.bind(this);\n    this.scoreDOM = document.getElementsByClassName('score')[0];\n    // this.clearGridAndRedrawPath = this.clearGridAndRedrawPath.bind(this);\n  }\n\n  solveMaze() {\n    const rootNode = this.grid.returnRoot();\n    const endNode = this.grid.returnEnd();\n    let queue = [rootNode];\n    while (queue.length > 0) {\n      let currNode = queue.shift();\n      if (currNode == endNode) {\n\n        return currNode;\n      }\n      queue = queue.concat(currNode.children);\n    }\n  }\n\n  solvePath() {\n    const ancestry = [this.grid.returnEnd()];\n    let node = this.grid.returnEnd();\n    node.chosen = true;\n    while (!(node.parent === 'root')) {\n      node = node.parent;\n      node.chosen = true;\n      ancestry.unshift(node);\n    }\n    return ancestry;\n  }\n\n  drawPath(ctx) {\n    const ancestry = this.solvePath();\n    let endCount = ancestry.length;\n    let counter = 0;\n    this.solveValue = 0;\n    let valueSpan = $(`span.${this.side}-value`)[0];\n    valueSpan.className = `${this.side}-value-active`;\n    var drawSolve = setInterval(() => {\n      if (counter === endCount) {\n        if (this.side === 'right') {\n          this.grid.blankGridRight();\n        } else {\n          this.grid.blankGrid();\n        }\n        clearInterval(drawSolve);\n      }\n      let node = ancestry[counter];\n      node.drawRedPath(ctx, this.lineLength, ancestry.length);\n      this.solveValue = this.solveValue + node.value;\n      valueSpan.textContent = `Value = ${this.solveValue}`;\n      counter++;\n      // debugger\n      // ctx.fillStyle = 'red';\n      // ctx.fillRect((node.x * this.lineLength)+5, (node.y * this.lineLength)+5, this.lineLength-5, this.lineLength-5);\n    }, 0);\n    // ancestry.forEach((node) => {\n    //   ctx.fillStyle = 'red';\n    //   ctx.fillRect(node.x * lineLength, node.y * lineLength, lineLength, lineLength);\n    // });\n  }\n\n  // clearGridAndRedrawPath(ctx, ancestry) {\n  //   this.grid.blankGrid();\n  //   // ancestry.forEach((node) =>{\n  //   //   node.drawRedPath(ctx, this.lineLength, ancestry.length)\n  //   // });\n  // }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (bfsMazeSolver);\n\n//# sourceURL=webpack:///./lib/bfsMazeSolver.js?");

/***/ }),

/***/ "./lib/dfsBuildMaze.js":
/*!*****************************!*\
  !*** ./lib/dfsBuildMaze.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _bfsMazeSolver__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bfsMazeSolver */ \"./lib/bfsMazeSolver.js\");\n\n\nclass dfsBuildMaze {\n  constructor(grid, lineLength, side) {\n    this.grid = grid;\n    this.gridSize = this.grid.size;\n    this.array = this.grid.array;\n    this.lineLength = lineLength;\n    this.findGridRoot.bind(this)(); // gets root of grid and stores it in this.root\n    this.stack = [this.root];\n    this.currNode = this.root;\n    this.lastNode = this.root;\n    this.inBackTrace = false; // to know when backtracing through maze\n    this.side = side; //left grid or right grid? for dissappearing grid angle animation\n\n    this.doneDrawing = this.doneDrawing.bind(this);\n    this.drawMaze = this.drawMaze.bind(this);\n    this.setWallsAndParent = this.setWallsAndParent.bind(this);\n    this.candidateNeighbors = this.candidateNeighbors.bind(this);\n    this.checkNeighborWalls = this.checkNeighborWalls.bind(this);\n    this.mazeCreateNavigator = this.mazeCreateNavigator.bind(this);\n    this.randomCandidateNeighbor = this.randomCandidateNeighbor.bind(this);\n  }\n\n  doneDrawing() {\n    let bool = 0;\n    this.array.forEach(array => array.forEach(node => {\n      if (!node.visited) {\n        bool++;\n      }\n    }));\n    return 0 === bool;\n  }\n\n  mazeCreateNavigator(ctx) {\n    this.stack.push(this.currNode);\n    this.currNode.visited = true;\n    // ctx.fillStyle = 'green';\n    // ctx.fillRect(this.currNode.x * this.lineLength, this.currNode.y * this.lineLength, this.lineLength, this.lineLength);\n  }\n\n  randomCandidateNeighbor() {\n    return this.candidateNeighbors(this.currNode)[Math.floor(Math.random() * this.candidateNeighbors(this.currNode).length)];\n  }\n\n  drawMaze(ctx) {\n    const that = this;\n\n    // $('img.yin-yang')[0].className = 'yin-yang-spinning';\n    var interv = setInterval(() => {\n\n      // ctx.clearRect(this.lastNode.x * this.lineLength, this.lastNode.y * this.lineLength, this.lineLength, this.lineLength);\n      if (this.doneDrawing()) {\n        const bfsSolver = new _bfsMazeSolver__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.grid, this.lineLength, this.side);\n        bfsSolver.drawPath(ctx);\n        clearInterval(interv);\n      }\n      this.mazeCreateNavigator(ctx);\n      this.setWallsAndParent(ctx);\n      this.lastNode = this.currNode;\n      if (this.candidateNeighbors(this.currNode).length > 0) {\n        this.currNode = this.randomCandidateNeighbor();\n        this.inBackTrace = false;\n      } else {\n        if (this.stack[this.stack.length - 1] === this.currNode) {\n          this.stack.pop();\n        }\n        this.currNode = this.stack.pop();\n        this.inBackTrace = true;\n      }\n    }, 0);\n    this.mazeCreateNavigator(ctx);\n    this.currNode = this.randomCandidateNeighbor();\n    // const promise = new Promise(function(resolve, reject) {\n    //   clearInterval = resolve;\n    // });\n    // return promise;\n  }\n\n  checkNeighborWalls(node) {\n    // THIS IDX IS WRONG NEED IDX FROM NEIGHBORS\n    this.neighborsInsideGrid(node).forEach(coords => {\n      let idx = this.getIndex(node.neighbors, coords);\n      if (!this.array[coords[1]][coords[0]].walls[(idx + 2) % 4]) {\n        node.walls[idx] = false;\n      }\n    });\n  }\n\n  getIndex(arr, coord) {\n    for (var i = 0; i < arr.length; i++) {\n      if (arr[i][0] === coord[0] && arr[i][1] === coord[1]) {\n        return i;\n      }\n    }\n  }\n\n  setWallsAndParent(ctx) {\n    let wallIdx = this.getIndex(this.lastNode.neighbors, this.currNode.coords);\n    // set wall boolean values of last node\n    this.lastNode.walls[wallIdx] = false;\n    this.checkNeighborWalls(this.lastNode);\n    // draw prev blue square with walls\n    this.lastNode.fillBlue(ctx, this.lineLength);\n    this.lastNode.drawWalls(ctx, this.lineLength);\n    let currNodeWallIdx = (wallIdx + 2) % 4; // if lastnodes free wall was top, currNode's is bottom, etc.\n    this.currNode.walls[currNodeWallIdx] = false;\n    if (!this.inBackTrace) {\n      // make current node the child of last node\n      this.lastNode.children.push(this.currNode);\n      // set current node's parent to last node\n      this.currNode.parent = this.lastNode;\n    };\n  }\n\n  findGridRoot() {\n    this.grid.array.map(array => {\n      return array.map(node => {\n        if (node.parent === 'root') {\n          this.root = node;\n        }\n      });\n    });\n  }\n\n  candidateNeighbors(node) {\n    const cand = [];\n    this.neighborsInsideGrid(node).forEach(pos => {\n      let node = this.array[pos[1]][pos[0]];\n      if (!node.visited) {\n        cand.push(node);\n      }\n    });\n    // if (cand.length === 0) {\n    //   this.neighborsInsideGrid(node).forEach((pos) => {\n    //     let node = this.array[pos[1]][pos[0]];\n    //     cand.push(node);\n    //   });\n    // }\n    return cand;\n  }\n\n  neighborsInsideGrid(node) {\n    const validNeighbors = [];\n    node.neighbors.forEach(pos => {\n      if (pos[0] >= 0 && pos[0] <= this.gridSize - 1 && pos[1] >= 0 && pos[1] <= this.gridSize - 1) {\n        validNeighbors.push(pos);\n      }\n    });\n    return validNeighbors;\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (dfsBuildMaze);\n\n//# sourceURL=webpack:///./lib/dfsBuildMaze.js?");

/***/ }),

/***/ "./lib/entry.js":
/*!**********************!*\
  !*** ./lib/entry.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _grid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./grid */ \"./lib/grid.js\");\n/* harmony import */ var _dfsBuildMaze__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dfsBuildMaze */ \"./lib/dfsBuildMaze.js\");\n/* harmony import */ var _bfsMazeSolver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bfsMazeSolver */ \"./lib/bfsMazeSolver.js\");\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./game */ \"./lib/game.js\");\n\n// import DrawGridUtil from './util/draw_grid_util';\n\n\n\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  const canvasLeft = document.getElementsByTagName(\"canvas\")[0];\n  const canvasRight = document.getElementsByTagName(\"canvas\")[1];\n  canvasLeft.width = 464;\n  canvasLeft.height = 464;\n  canvasRight.width = 464;\n  canvasRight.height = 464;\n  const ctxLeft = canvasLeft.getContext(\"2d\");\n  const ctxRight = canvasRight.getContext(\"2d\");\n\n  const leftGrid = new _grid__WEBPACK_IMPORTED_MODULE_0__[\"default\"]([0, 28], [28, 0], 29, ctxLeft, 16);\n  leftGrid.populateGrid();\n  const rightGrid = new _grid__WEBPACK_IMPORTED_MODULE_0__[\"default\"]([28, 28], [0, 0], 29, ctxRight, 16);\n  rightGrid.populateGrid();\n  leftGrid.drawGrid(16);\n  rightGrid.drawGrid(16);\n  const leftDfsBuilder = new _dfsBuildMaze__WEBPACK_IMPORTED_MODULE_1__[\"default\"](leftGrid, 16, 'left');\n  // leftDfsBuilder.drawMaze(ctxLeft);\n  //\n  const rightDfsBuilder = new _dfsBuildMaze__WEBPACK_IMPORTED_MODULE_1__[\"default\"](rightGrid, 16, 'right');\n  // rightDfsBuilder.drawMaze(ctxRight);\n  const game = new _game__WEBPACK_IMPORTED_MODULE_3__[\"default\"](leftGrid, rightGrid, leftDfsBuilder, rightDfsBuilder, ctxLeft, ctxRight);\n  // debugger\n  game.play();\n\n  // DrawGridUtil(ctxLeft, leftGrid, 16);\n  // DrawGridUtil(ctxRight, rightGrid, 16);\n\n  // ctxLeft.fillStyle = 'blue';\n  // ctxLeft.fillRect(0, 448, 8, 8);\n\n  // ctxLeft.fillStyle = 'blue';\n  // ctxLeft.fillRect(0, 147, 12, 6);\n  // ctxLeft.fillRect(0, 0, 6, 6);\n  // ctxLeft.fillRect(294, 147, 12, 6);\n  //\n  // ctxRight.beginPath();\n  // ctxRight.moveTo(0, 0);\n  // ctxRight.lineTo(425, 425);\n  // ctxRight.strokeStyle = \"red\";\n  // ctxRight.stroke();\n});\n\n//# sourceURL=webpack:///./lib/entry.js?");

/***/ }),

/***/ "./lib/game.js":
/*!*********************!*\
  !*** ./lib/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _bfsMazeSolver__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bfsMazeSolver */ \"./lib/bfsMazeSolver.js\");\n\n\nclass Game {\n  constructor(leftGrid, rightGrid, leftDfsBuilder, rightDfsBuilder, ctxLeft, ctxRight) {\n    this.leftGrid = leftGrid;\n    this.rightGrid = rightGrid;\n    this.leftDfsBuilder = leftDfsBuilder;\n    this.rightDfsBuilder = rightDfsBuilder;\n    this.ctxLeft = ctxLeft;\n    this.ctxRight = ctxRight;\n    this.bank = 500;\n    this.scoreDOM = document.getElementsByClassName('score')[0];\n    this.play = this.play.bind(this);\n  }\n\n  play() {\n    // debugger\n    $('img.yin-yang-img')[0].className = 'yin-yang-begin-spin';\n    $('div.yin-yang-div')[0].className = 'yin-yang-div-fast-spin';\n    const left = () => this.leftDfsBuilder.drawMaze(this.ctxLeft);\n    const right = () => this.rightDfsBuilder.drawMaze(this.ctxRight);\n    left();\n    right();\n    // left().then(() => $('img.yin-yang-spinning')[0].className = 'yin-yang-spinning-slower');\n    // const that = this;\n    // const promise = new Promise(function(resolve, reject) {\n    //   // if (that.leftDfsBuilder.doneDrawing() && that.rightDfsBuilder.doneDrawing()) {\n    //\n    //     resolve();\n    //   // }\n    // });\n\n    // Promise.all([left, right]).then($('img.yin-yang-img')[0].className = 'yin-yang-spinning-slower');\n    // const leftBuild = () => {\n    //   this.leftDfsBuilder.drawMaze(this.ctxLeft);\n    //   if (this.leftDfsBuilder.doneDrawing()) {\n    //     $('img.yin-yang-spinning')[0].className = 'yin-yang-spinning-slower';\n    //   }\n    // };\n    // leftBuild();\n  }\n\n  // $('img.yin-yang')[0].className = 'yin-yang-spinning';\n  // $('img.yin-yang-spinning')[0].className = 'yin-yang';\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Game);\n\n//# sourceURL=webpack:///./lib/game.js?");

/***/ }),

/***/ "./lib/grid.js":
/*!*********************!*\
  !*** ./lib/grid.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node */ \"./lib/node.js\");\n\n\nclass Grid {\n  constructor(root_pos, end_pos, size, ctx, lineLength) {\n    this.array = [...Array(size)].map(i => Array(size));\n    this.size = size;\n    this.populateGrid = this.populateGrid.bind(this);\n    this.root_pos = root_pos;\n    this.end_pos = end_pos;\n    this.ctx = ctx;\n    this.lineLength = lineLength;\n    this.returnRoot = this.returnRoot.bind(this);\n    this.returnEnd = this.returnEnd.bind(this);\n    this.drawGrid = this.drawGrid.bind(this);\n    this.blankGrid = this.blankGrid.bind(this);\n    this.blankGridRight = this.blankGridRight.bind(this);\n    this.neighborsInsideGrid = this.neighborsInsideGrid.bind(this);\n    this.ensureChosenNeighborsWallsStayUpOnClear = this.ensureChosenNeighborsWallsStayUpOnClear.bind(this);\n  }\n\n  populateGrid() {\n    // debugger\n    for (var i = 0; i < this.array.length; i++) {\n      for (var j = 0; j < this.array[i].length; j++) {\n        this.array[i][j] = new _node__WEBPACK_IMPORTED_MODULE_0__[\"default\"]([j, i], null);\n      }\n    }\n    // debugger\n    this.array[this.root_pos[1]][this.root_pos[0]].parent = 'root';\n  }\n\n  drawGrid() {\n    this.array.map(row => row.map(node => node.drawNode(this.ctx, this.lineLength)));\n  }\n\n  ensureChosenNeighborsWallsStayUpOnClear(node) {\n    node.walls = [false, false, false, false];\n    this.neighborsInsideGrid(node).forEach(pos => {\n      if (this.array[pos[1]][pos[0]].chosen) {\n        let wallIdx = this.getIndex(node.neighbors, pos);\n        node.walls[wallIdx] = true;\n      }\n    });\n    node.drawWalls(this.ctx, this.lineLength);\n  }\n\n  blankGrid() {\n    // this.ctx.clearRect(0, 0, this.lineLength * this.size, this.lineLength * this.size);\n    // this.drawGrid();\n    let x = 0;\n    let y = 28;\n    let descending = false;\n    var fadeAwayBlue = setInterval(() => {\n      if (descending === false && x > 28) {\n        clearInterval(fadeAwayBlue);\n      }\n      if (descending) {\n        // debugger\n        for (var psuedoX = x; psuedoX < 29; psuedoX++, y++) {\n          let node = this.array[y][psuedoX];\n          if (!node.chosen) {\n            this.ctx.clearRect(psuedoX * this.lineLength, y * this.lineLength, this.lineLength, this.lineLength);\n            node.drawNode(this.ctx, this.lineLength);\n            this.ensureChosenNeighborsWallsStayUpOnClear(node);\n          }\n        }\n      } else {\n        for (var psuedoY = y; psuedoY < 29; psuedoY++, x++) {\n          let node = this.array[psuedoY][x];\n          if (!node.chosen) {\n            this.ctx.clearRect(x * this.lineLength, psuedoY * this.lineLength, this.lineLength, this.lineLength);\n            node.drawNode(this.ctx, this.lineLength);\n            this.ensureChosenNeighborsWallsStayUpOnClear(node);\n          }\n          if (psuedoY === x && x === 28) {\n            x = -1;\n            descending = true;\n          }\n        }\n      }\n      if (descending) {\n        x++;\n        y = 0;\n      } else {\n        x = 0;\n        y--;\n      }\n    }, 20);\n  }\n\n  blankGridRight() {\n    let y = this.size - 1;\n    let descending = false;\n    let x = this.size - 1;\n    // debugger\n    var gridRight = setInterval(() => {\n      if (descending && x < 0) {\n        clearInterval(gridRight);\n      }\n      if (!descending) {\n        // debugger\n        x = this.size - 1;\n        for (var psuedoY = y; psuedoY < this.size; psuedoY++, x--) {\n          let node = this.array[psuedoY][x];\n          if (!node.chosen) {\n            this.ctx.clearRect(x * this.lineLength, psuedoY * this.lineLength, this.lineLength, this.lineLength);\n            node.drawNode(this.ctx, this.lineLength);\n            this.ensureChosenNeighborsWallsStayUpOnClear(node);\n          }\n          if (x == 0 && psuedoY == this.size - 1) {\n            descending = true;\n            x = this.size - 1;\n          }\n        }\n        y--;\n      } else {\n        y = 0;\n        for (var psuedoX = x; psuedoX >= 0; psuedoX--, y++) {\n          let node = this.array[y][psuedoX];\n          if (!node.chosen) {\n            this.ctx.clearRect(psuedoX * this.lineLength, y * this.lineLength, this.lineLength, this.lineLength);\n            node.drawNode(this.ctx, this.lineLength);\n            this.ensureChosenNeighborsWallsStayUpOnClear(node);\n          }\n        }\n        x--;\n      }\n    }, 20);\n    //\n    // [3, 3]\n    // [3, 2], [2, 3]\n    // [3, 1], [2, 2], [1, 3]\n    // [3, 0], [2, 1], [1, 2], [0, 3]\n    // [2, 0], [1, 1], [0, 2]\n    // [1, 0], [0, 1]\n  }\n\n  getIndex(arr, coord) {\n    for (var i = 0; i < arr.length; i++) {\n      if (arr[i][0] === coord[0] && arr[i][1] === coord[1]) {\n        return i;\n      }\n    }\n  }\n\n  neighborsInsideGrid(node) {\n    const validNeighbors = [];\n    node.neighbors.forEach(pos => {\n      if (pos[0] >= 0 && pos[0] <= this.size - 1 && pos[1] >= 0 && pos[1] <= this.size - 1) {\n        validNeighbors.push(pos);\n      }\n    });\n    return validNeighbors;\n  }\n\n  returnRoot() {\n    return this.array[this.root_pos[1]][this.root_pos[0]];\n  }\n\n  returnEnd() {\n    return this.array[this.end_pos[1]][this.end_pos[0]];\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Grid);\n\n//# sourceURL=webpack:///./lib/grid.js?");

/***/ }),

/***/ "./lib/node.js":
/*!*********************!*\
  !*** ./lib/node.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _util_draw_grid_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/draw_grid_util */ \"./lib/util/draw_grid_util.js\");\n\n\nclass Node {\n  constructor(coords, parent) {\n    this.coords = coords;\n    this.parent = parent;\n    this.children = [];\n    this.x = coords[0];\n    this.y = coords[1];\n    this.visited = false;\n    this.value = Math.floor(Math.random() * 5) * 10;\n    this.maxValue = 50;\n    this.chosen = false;\n    this.neighbors = [[this.x, this.y - 1], [this.x + 1, this.y], [this.x, this.y + 1], [this.x - 1, this.y]];\n    this.drawNode = this.drawNode.bind(this);\n    this.drawLine = this.drawLine.bind(this);\n    this.walls = [true, true, true, true];\n    this.drawWalls = this.drawWalls.bind(this);\n    this.drawRedPath = this.drawRedPath.bind(this);\n    this.fillBlue = this.fillBlue.bind(this);\n  }\n\n  distance() {\n    if (this.parent) {\n      if (this.parent === 'root') {\n        return 0;\n      } else {\n        return this.parent.distance() + 1;\n      }\n    } else {\n      return nil;\n    }\n  }\n\n  drawNode(ctx, lineLength) {\n    let a = this.x * lineLength;\n    let b = this.y * lineLength;\n    // top line\n    this.drawLine(a, b, a + lineLength, b, ctx);\n    // right line\n    this.drawLine(a + lineLength, b, a + lineLength, b + lineLength, ctx);\n    // bottom line\n    this.drawLine(a + lineLength, b + lineLength, a, b + lineLength, ctx);\n    //left line\n    this.drawLine(a, b + lineLength, a, b, ctx);\n    // ctx.strokeRect(this.x * lineLength, this.y * lineLength, lineLength, lineLength);\n  }\n\n  drawWalls(ctx, lineLength) {\n    this.visited = true;\n    let a = this.x * lineLength;\n    let b = this.y * lineLength;\n    if (this.walls[0]) {\n      this.drawWallLine(a, b, a + lineLength, b, ctx);\n    }\n    if (this.walls[1]) {\n      this.drawWallLine(a + lineLength, b, a + lineLength, b + lineLength, ctx);\n    }\n    if (this.walls[2]) {\n      this.drawWallLine(a + lineLength, b + lineLength, a, b + lineLength, ctx);\n    }\n    if (this.walls[3]) {\n      this.drawWallLine(a, b + lineLength, a, b, ctx);\n    }\n  }\n\n  fillBlue(ctx, lineLength) {\n    let fraction1 = 1 - this.value / this.maxValue * 0.3;\n    let fraction = 228 - this.value / this.maxValue * 150;\n    let r = 50 - this.value / this.maxValue * 50;\n    let g = 29 + fraction * 62;\n    let b = 89 + fraction * 140;\n    // ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${fraction})`;\n    ctx.clearRect(this.x * lineLength, this.y * lineLength, lineLength, lineLength);\n    ctx.fillStyle = `rgba(0, 20, ${fraction}, 1)`;\n    // 18\t29\t89\n    // 59\t91\t230\n    ctx.fillRect(this.x * lineLength, this.y * lineLength, lineLength, lineLength);\n  }\n\n  drawRedPath(ctx, lineLength, lineageLength) {\n    let a = this.x * lineLength;\n    let b = this.y * lineLength;\n    let opacity = (lineageLength - this.distance()) / lineageLength;\n    ctx.fillStyle = 'black';\n    ctx.fillRect(this.x * lineLength, this.y * lineLength, lineLength, lineLength);\n    ctx.fillStyle = `rgba(170, 5, 20, ${opacity})`;\n    ctx.fillRect(this.x * lineLength, this.y * lineLength, lineLength, lineLength);\n    if (this.walls[0]) {\n      this.drawWallLine(a, b - 1, a + lineLength, b - 1, ctx);\n    }\n    if (this.walls[1]) {\n      this.drawWallLine(a + lineLength + 1, b, a + lineLength + 1, b + lineLength, ctx);\n    }\n    if (this.walls[2]) {\n      this.drawWallLine(a + lineLength, b + lineLength - 1, a, b + lineLength - 1, ctx);\n    }\n    if (this.walls[3]) {\n      this.drawWallLine(a - 1, b + lineLength, a - 1, b, ctx);\n    }\n  }\n\n  drawWallLine(a, b, c, d, ctx) {\n    ctx.beginPath();\n    ctx.moveTo(a, b);\n    ctx.lineTo(c, d);\n    ctx.strokeStyle = 'rgb(60, 179, 50)';\n    ctx.lineWidth = 2;\n    ctx.stroke();\n  }\n\n  drawLine(a, b, c, d, ctx) {\n    ctx.beginPath();\n    ctx.moveTo(a, b);\n    ctx.lineTo(c, d);\n    ctx.strokeStyle = 'rgba(75,\t55,\t23, 1)';\n    ctx.lineWidth = 1;\n    ctx.stroke();\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Node);\n\n// manual draw line in this.drawNode\n\n// ctx.beginPath();\n// ctx.moveTo(a, b);\n// ctx.lineTo(a + lineLength, b);\n// ctx.strokeStyle = 'rgba(75,\t55,\t23, 1)';\n// ctx.lineWidth = 1;\n// ctx.stroke();\n//\n// ctx.beginPath();\n// ctx.moveTo(a, b);\n// ctx.lineTo(a + lineLength, b);\n// ctx.strokeStyle = 'rgba(75,\t55,\t23, 1)';\n// ctx.lineWidth = 1;\n// ctx.stroke();\n//\n// ctx.beginPath();\n// ctx.moveTo(a + lineLength, b);\n// ctx.lineTo(a + lineLength, b + lineLength);\n// ctx.strokeStyle = 'rgba(75,\t55,\t23, 1)';\n// ctx.lineWidth = 1;\n// ctx.stroke();\n//\n// ctx.beginPath();\n// ctx.moveTo(a, b + lineLength);\n// ctx.lineTo(a + lineLength, b + lineLength);\n// ctx.strokeStyle = 'rgba(75,\t55,\t23, 1)';\n// ctx.lineWidth = 1;\n// ctx.stroke();\n\n//# sourceURL=webpack:///./lib/node.js?");

/***/ }),

/***/ "./lib/util/draw_grid_util.js":
/*!************************************!*\
  !*** ./lib/util/draw_grid_util.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n\n\nconst DrawGridUtil = (ctx, grid, lineLength) => {\n  // debugger\n  grid.array.map(row => {\n    row.map(node => {\n      ctx.strokeStyle = 'rgb(75,\t55,\t23)';\n      ctx.lineWidth = 0.5;\n      return ctx.strokeRect(node.x * lineLength, node.y * lineLength, lineLength, lineLength);\n    });\n  });\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (DrawGridUtil);\n\n//# sourceURL=webpack:///./lib/util/draw_grid_util.js?");

/***/ })

/******/ });