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
eval("__webpack_require__.r(__webpack_exports__);\n\nclass bfsMazeSolver {\n  constructor(grid, lineLength) {\n\n    this.grid = grid;\n    this.lineLength = lineLength;\n    this.solveMaze = this.solveMaze.bind(this);\n    this.solvePath = this.solvePath.bind(this);\n    // debugger\n    // this.solvePath();\n  }\n\n  solveMaze() {\n    const rootNode = this.grid.returnRoot;\n    const endNode = this.grid.returnEnd;\n    const queue = [rootNode];\n    while (queue.length > 0) {\n      currNode = queue.shift();\n      if (currNode == endNode) {\n        return currNode;\n      }\n      queue.concat(currNode.children);\n    }\n  }\n\n  solvePath() {\n    // debugger\n    const ancestry = [this.grid.returnEnd()];\n    let node = this.grid.returnEnd();\n    while (!(node.parent === 'root')) {\n      // debugger\n      node = node.parent;\n      ancestry.unshift(node);\n    }\n    ancestry.unshift(this.grid.returnRoot());\n    return ancestry;\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (bfsMazeSolver);\n\n//# sourceURL=webpack:///./lib/bfsMazeSolver.js?");

/***/ }),

/***/ "./lib/dfsBuildMaze.js":
/*!*****************************!*\
  !*** ./lib/dfsBuildMaze.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _bfsMazeSolver__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bfsMazeSolver */ \"./lib/bfsMazeSolver.js\");\n\n\nclass dfsBuildMaze {\n  constructor(grid, lineLength) {\n    this.grid = grid;\n    this.gridSize = this.grid.size;\n    this.array = this.grid.array;\n    this.lineLength = lineLength;\n    this.findGridRoot.bind(this)();\n    this.stack = [this.root];\n    // this.workingStack = [this.root];\n    this.currNode = this.root;\n    this.lastNode = this.root; // {x: this.root.x, y: this.root.y, parent: 'root'};\n    this.doneDrawing = this.doneDrawing.bind(this);\n    this.drawMaze = this.drawMaze.bind(this);\n    this.setWalls = this.setWalls.bind(this);\n    this.candidateNeighbors = this.candidateNeighbors.bind(this);\n    this.checkNeighborWalls = this.checkNeighborWalls.bind(this);\n  }\n\n  doneDrawing() {\n    let bool = 0;\n    this.array.forEach(array => array.forEach(node => {\n      if (!node.visited) {\n        bool++;\n      }\n    }));\n    return 0 === bool;\n  }\n\n  drawMaze(ctx) {\n    this.root.visited = true; // set root to visited\n    ctx.fillStyle = 'green'; // begin green maze creating square\n    ctx.fillRect(this.currNode.x * this.lineLength, this.currNode.y * this.lineLength, this.lineLength, this.lineLength);\n    // push a random neighbor onto the BACK of the back-track safety stack\n    this.stack.push(this.candidateNeighbors(this.currNode)[Math.floor(Math.random() * this.candidateNeighbors(this.currNode).length)]);\n    // push the random neighbor pushed onto the back of the stack onto the FRONT of the workign stack\n    this.currNode = this.stack[this.stack.length - 1];\n    // debugger\n    //workingstack[0] is current node, stack[-1] is also current node\n    //this.lastNode is root by default\n\n    var interv = setInterval(() => {\n      // ctx.clearRect(this.lastNode.x * this.lineLength, this.lastNode.y * this.lineLength, this.lineLength, this.lineLength);\n      if (this.doneDrawing()) {\n        // debugger\n        new _bfsMazeSolver__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.grid, 16);\n        clearInterval(interv);\n        // bfsSolver.solvePath();\n      }\n      // debugger\n      this.currNode.visited = true;\n      ctx.fillStyle = 'green';\n      // make current node temporarily green\n      // debugger\n      ctx.fillRect(this.currNode.x * this.lineLength, this.currNode.y * this.lineLength, this.lineLength, this.lineLength);\n      // let wallIdx = this.lastNode.neighbors.indexOf(this.currNode.coords);\n      let wallIdx = this.getIndex(this.lastNode.neighbors, this.currNode.coords);\n      // set walls of last node\n      this.lastNode.walls[wallIdx] = false;\n      this.checkNeighborWalls(this.lastNode);\n      // draw prev blue square with walls\n      this.lastNode.drawWalls(ctx, this.lineLength);\n      // ctx.fillStyle = 'blue';\n      // ctx.fillRect(this.lastNode.x * this.lineLength, this.lastNode.y * this.lineLength, this.lineLength, this.lineLength);\n\n      let currNodeWallIdx = (wallIdx + 2) % 4; // if lastnodes free wall was top, currNode's is bottom, etc.\n      this.currNode.walls[currNodeWallIdx] = false;\n      // make current node the child of last node\n      this.lastNode.children.push(this.currNode);\n      // set current node's parent to last node\n      this.currNode.parent = this.lastNode;\n\n      this.lastNode = this.currNode;\n      if (this.candidateNeighbors(this.currNode).length > 0) {\n        // debugger\n        this.stack.push(this.candidateNeighbors(this.currNode)[Math.floor(Math.random() * this.candidateNeighbors(this.currNode).length)]);\n        this.currNode = this.stack[this.stack.length - 1];\n      } else {\n        // debugger\n        //get rid of last which is currNode\n        if (this.stack[this.stack.length - 1] === this.currNode) {\n          this.stack.pop();\n        }\n        this.currNode = this.stack.pop();\n      }\n      // debugger\n    }, 0.25);\n  }\n\n  checkNeighborWalls(node) {\n\n    this.neighborsInsideGrid(node).forEach((coords, idx) => {\n      // debugger\n      if (!this.array[coords[1]][coords[0]].walls[(idx + 2) % 4]) {\n        node.walls[idx] = false;\n      }\n    });\n  }\n\n  getIndex(arr, coord) {\n    for (var i = 0; i < arr.length; i++) {\n      if (arr[i][0] === coord[0] && arr[i][1] === coord[1]) {\n        return i;\n      }\n    }\n  }\n\n  setWalls(node) {}\n\n  findGridRoot() {\n    this.grid.array.map(array => {\n      return array.map(node => {\n        if (node.parent === 'root') {\n          this.root = node;\n        }\n      });\n    });\n  }\n\n  candidateNeighbors(node) {\n    const cand = [];\n    this.neighborsInsideGrid(node).forEach(pos => {\n      let node = this.array[pos[1]][pos[0]];\n      if (!node.visited) {\n        cand.push(node);\n      }\n    });\n    // if (cand.length === 0) {\n    //   this.neighborsInsideGrid(node).forEach((pos) => {\n    //     let node = this.array[pos[1]][pos[0]];\n    //     cand.push(node);\n    //   });\n    // }\n    return cand;\n  }\n\n  neighborsInsideGrid(node) {\n    const validNeighbors = [];\n    node.neighbors.forEach(pos => {\n      if (pos[0] >= 0 && pos[0] <= this.gridSize - 1 && pos[1] >= 0 && pos[1] <= this.gridSize - 1) {\n        validNeighbors.push(pos);\n      }\n    });\n    return validNeighbors;\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (dfsBuildMaze);\n\n//# sourceURL=webpack:///./lib/dfsBuildMaze.js?");

/***/ }),

/***/ "./lib/entry.js":
/*!**********************!*\
  !*** ./lib/entry.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _grid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./grid */ \"./lib/grid.js\");\n/* harmony import */ var _dfsBuildMaze__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dfsBuildMaze */ \"./lib/dfsBuildMaze.js\");\n/* harmony import */ var _bfsMazeSolver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bfsMazeSolver */ \"./lib/bfsMazeSolver.js\");\n\n// import DrawGridUtil from './util/draw_grid_util';\n\n\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  const canvasLeft = document.getElementsByTagName(\"canvas\")[0];\n  const canvasRight = document.getElementsByTagName(\"canvas\")[1];\n  canvasLeft.width = 464;\n  canvasLeft.height = 464;\n  canvasRight.width = 464;\n  canvasRight.height = 464;\n  const ctxLeft = canvasLeft.getContext(\"2d\");\n  const ctxRight = canvasRight.getContext(\"2d\");\n\n  const leftGrid = new _grid__WEBPACK_IMPORTED_MODULE_0__[\"default\"]([0, 28], [28, 0], 29);\n  leftGrid.populateGrid();\n  const rightGrid = new _grid__WEBPACK_IMPORTED_MODULE_0__[\"default\"]([28, 28], [0, 0], 29);\n  rightGrid.populateGrid();\n  leftGrid.drawGrid(ctxLeft, 16);\n  rightGrid.drawGrid(ctxRight, 16);\n  // debugger\n  const leftDfsBuilder = new _dfsBuildMaze__WEBPACK_IMPORTED_MODULE_1__[\"default\"](leftGrid, 16);\n  leftDfsBuilder.drawMaze(ctxLeft);\n  const rightDfsBuilder = new _dfsBuildMaze__WEBPACK_IMPORTED_MODULE_1__[\"default\"](rightGrid, 16);\n  // rightDfsBuilder.drawMaze(ctxRight);\n  const leftDfsSolver = new _bfsMazeSolver__WEBPACK_IMPORTED_MODULE_2__[\"default\"](leftGrid, 16);\n\n  // DrawGridUtil(ctxLeft, leftGrid, 16);\n  // DrawGridUtil(ctxRight, rightGrid, 16);\n\n  // ctxLeft.fillStyle = 'blue';\n  // ctxLeft.fillRect(0, 448, 8, 8);\n\n  // ctxLeft.fillStyle = 'blue';\n  // ctxLeft.fillRect(0, 147, 12, 6);\n  // ctxLeft.fillRect(0, 0, 6, 6);\n  // ctxLeft.fillRect(294, 147, 12, 6);\n  //\n  // ctxRight.beginPath();\n  // ctxRight.moveTo(0, 0);\n  // ctxRight.lineTo(425, 425);\n  // ctxRight.strokeStyle = \"red\";\n  // ctxRight.stroke();\n});\n\n//# sourceURL=webpack:///./lib/entry.js?");

/***/ }),

/***/ "./lib/grid.js":
/*!*********************!*\
  !*** ./lib/grid.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node */ \"./lib/node.js\");\n\n\nclass Grid {\n  constructor(root_pos, end_pos, size) {\n    this.array = [...Array(size)].map(i => Array(size));\n    this.size = size;\n    this.populateGrid = this.populateGrid.bind(this);\n    this.root_pos = root_pos;\n    this.end_pos = end_pos;\n    this.returnRoot = this.returnRoot.bind(this);\n    this.returnEnd = this.returnEnd.bind(this);\n  }\n\n  populateGrid() {\n    // debugger\n    for (var i = 0; i < this.array.length; i++) {\n      for (var j = 0; j < this.array[i].length; j++) {\n        this.array[i][j] = new _node__WEBPACK_IMPORTED_MODULE_0__[\"default\"]([j, i], null);\n      }\n    }\n    // debugger\n    this.array[this.root_pos[1]][this.root_pos[0]].parent = 'root';\n  }\n\n  drawGrid(ctx, lineLength) {\n    this.array.map(row => row.map(node => node.drawNode(ctx, lineLength)));\n  }\n\n  returnRoot() {\n    return this.array[this.root_pos[1]][this.root_pos[0]];\n  }\n\n  returnEnd() {\n    return this.array[this.end_pos[1]][this.end_pos[0]];\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Grid);\n\n//# sourceURL=webpack:///./lib/grid.js?");

/***/ }),

/***/ "./lib/node.js":
/*!*********************!*\
  !*** ./lib/node.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _util_draw_grid_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/draw_grid_util */ \"./lib/util/draw_grid_util.js\");\n\n\nclass Node {\n  constructor(coords, parent) {\n    this.coords = coords;\n    this.parent = parent;\n    this.children = [];\n    this.x = coords[0];\n    this.y = coords[1];\n    this.visited = false;\n    this.value = Math.floor(Math.random() * 5) * 10;\n    this.neighbors = [[this.x, this.y - 1], [this.x + 1, this.y], [this.x, this.y + 1], [this.x - 1, this.y]];\n    this.drawNode = this.drawNode.bind(this);\n    this.drawLine = this.drawLine.bind(this);\n    this.walls = [true, true, true, true];\n    this.drawWalls = this.drawWalls.bind(this);\n  }\n\n  distance() {\n    if (this.parent) {\n      if (this.parent === 'root') {\n        return 0;\n      } else {\n        return this.parent.distance() + 1;\n      }\n    } else {\n      return nil;\n    }\n  }\n\n  drawNode(ctx, lineLength) {\n    let a = this.x * lineLength;\n    let b = this.y * lineLength;\n    // top line\n    this.drawLine(a, b, a + lineLength, b, ctx);\n    // right line\n    this.drawLine(a + lineLength, b, a + lineLength, b + lineLength, ctx);\n    // bottom line\n    this.drawLine(a + lineLength, b + lineLength, a, b + lineLength, ctx);\n    //left line\n    this.drawLine(a, b + lineLength, a, b, ctx);\n    // ctx.strokeRect(this.x * lineLength, this.y * lineLength, lineLength, lineLength);\n  }\n\n  drawWalls(ctx, lineLength) {\n    let a = this.x * lineLength;\n    let b = this.y * lineLength;\n    if (this.walls[0]) {\n      this.drawWallLine(a, b, a + lineLength, b, ctx);\n    }\n    if (this.walls[1]) {\n      this.drawWallLine(a + lineLength, b, a + lineLength, b + lineLength, ctx);\n    }\n    if (this.walls[2]) {\n      this.drawWallLine(a + lineLength, b + lineLength, a, b + lineLength, ctx);\n    }\n    if (this.walls[3]) {\n      this.drawWallLine(a, b + lineLength, a, b, ctx);\n    }\n    ctx.fillStyle = 'blue';\n    ctx.fillRect(this.x * lineLength, this.y * lineLength, lineLength, lineLength);\n  }\n\n  drawWallLine(a, b, c, d, ctx) {\n    ctx.beginPath();\n    ctx.moveTo(a, b);\n    ctx.lineTo(c, d);\n    ctx.strokeStyle = 'green';\n    ctx.lineWidth = 3;\n    ctx.stroke();\n  }\n\n  drawLine(a, b, c, d, ctx) {\n    ctx.beginPath();\n    ctx.moveTo(a, b);\n    ctx.lineTo(c, d);\n    ctx.strokeStyle = 'rgba(75,\t55,\t23, 1)';\n    ctx.lineWidth = 1;\n    ctx.stroke();\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Node);\n\n// manual draw line in this.drawNode\n\n// ctx.beginPath();\n// ctx.moveTo(a, b);\n// ctx.lineTo(a + lineLength, b);\n// ctx.strokeStyle = 'rgba(75,\t55,\t23, 1)';\n// ctx.lineWidth = 1;\n// ctx.stroke();\n//\n// ctx.beginPath();\n// ctx.moveTo(a, b);\n// ctx.lineTo(a + lineLength, b);\n// ctx.strokeStyle = 'rgba(75,\t55,\t23, 1)';\n// ctx.lineWidth = 1;\n// ctx.stroke();\n//\n// ctx.beginPath();\n// ctx.moveTo(a + lineLength, b);\n// ctx.lineTo(a + lineLength, b + lineLength);\n// ctx.strokeStyle = 'rgba(75,\t55,\t23, 1)';\n// ctx.lineWidth = 1;\n// ctx.stroke();\n//\n// ctx.beginPath();\n// ctx.moveTo(a, b + lineLength);\n// ctx.lineTo(a + lineLength, b + lineLength);\n// ctx.strokeStyle = 'rgba(75,\t55,\t23, 1)';\n// ctx.lineWidth = 1;\n// ctx.stroke();\n\n//# sourceURL=webpack:///./lib/node.js?");

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