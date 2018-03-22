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

/***/ "./lib/dfsBuildMaze.js":
/*!*****************************!*\
  !*** ./lib/dfsBuildMaze.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n\nclass dfsBuildMaze {\n  constructor(grid, lineLength) {\n    this.grid = grid;\n    this.array = this.grid.array;\n    this.lineLength = lineLength;\n    this.findGridRoot.bind(this)();\n    this.doneDrawing = this.doneDrawing.bind(this);\n    this.drawMaze = this.drawMaze.bind(this);\n  }\n\n  doneDrawing() {\n    let bool = 0;\n    this.array.forEach(array => array.forEach(node => {\n      // debugger\n      if (!node.parent) {\n        bool++;\n      }\n    }));\n    return 0 === bool;\n  }\n\n  drawMaze(ctx) {\n    let currNode = this.root;\n    ctx.fillStyle = 'green';\n\n    ctx.fillRect(currNode.x * this.lineLength, currNode.y * this.lineLength, this.lineLength, this.lineLength);\n    setInterval(() => {\n      currNode = currNode.candidates()[Math.floor(Math.random() * currNode.candidates.length)];\n      ctx.fillStyle = 'green';\n    }, 500);\n    // for (this.doneDrawing == false) {\n    // }\n  }\n\n  findGridRoot() {\n    this.grid.array.map(array => {\n      return array.map(node => {\n        if (node.parent === 'root') {\n          this.root = node;\n        }\n      });\n    });\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (dfsBuildMaze);\n\n//# sourceURL=webpack:///./lib/dfsBuildMaze.js?");

/***/ }),

/***/ "./lib/entry.js":
/*!**********************!*\
  !*** ./lib/entry.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _grid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./grid */ \"./lib/grid.js\");\n/* harmony import */ var _dfsBuildMaze__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dfsBuildMaze */ \"./lib/dfsBuildMaze.js\");\n\n// import DrawGridUtil from './util/draw_grid_util';\n\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  const canvasLeft = document.getElementsByTagName(\"canvas\")[0];\n  const canvasRight = document.getElementsByTagName(\"canvas\")[1];\n  canvasLeft.width = 464;\n  canvasLeft.height = 464;\n  canvasRight.width = 464;\n  canvasRight.height = 464;\n  const ctxLeft = canvasLeft.getContext(\"2d\");\n  const ctxRight = canvasRight.getContext(\"2d\");\n\n  const leftGrid = new _grid__WEBPACK_IMPORTED_MODULE_0__[\"default\"]([28, 0]);\n  leftGrid.populateGrid();\n  const rightGrid = new _grid__WEBPACK_IMPORTED_MODULE_0__[\"default\"]([28, 28]);\n  rightGrid.populateGrid();\n  leftGrid.drawGrid(ctxLeft, 16);\n  rightGrid.drawGrid(ctxRight, 16);\n  // debugger\n  const leftDfsBuilder = new _dfsBuildMaze__WEBPACK_IMPORTED_MODULE_1__[\"default\"](leftGrid, 16);\n  leftDfsBuilder.drawMaze(ctxLeft);\n\n  // DrawGridUtil(ctxLeft, leftGrid, 16);\n  // DrawGridUtil(ctxRight, rightGrid, 16);\n\n  // ctxLeft.fillStyle = 'blue';\n  // ctxLeft.fillRect(0, 448, 8, 8);\n\n  // ctxLeft.fillStyle = 'blue';\n  // ctxLeft.fillRect(0, 147, 12, 6);\n  // ctxLeft.fillRect(0, 0, 6, 6);\n  // ctxLeft.fillRect(294, 147, 12, 6);\n  //\n  // ctxRight.beginPath();\n  // ctxRight.moveTo(0, 0);\n  // ctxRight.lineTo(425, 425);\n  // ctxRight.strokeStyle = \"red\";\n  // ctxRight.stroke();\n});\n\n//# sourceURL=webpack:///./lib/entry.js?");

/***/ }),

/***/ "./lib/grid.js":
/*!*********************!*\
  !*** ./lib/grid.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node */ \"./lib/node.js\");\n\n\nclass Grid {\n  constructor(root_pos) {\n    this.array = [...Array(29)].map(i => Array(29));\n    this.populateGrid = this.populateGrid.bind(this);\n    this.root_pos = root_pos;\n  }\n\n  populateGrid() {\n    // debugger\n    for (var i = 0; i < this.array.length; i++) {\n      for (var j = 0; j < this.array[i].length; j++) {\n        this.array[i][j] = new _node__WEBPACK_IMPORTED_MODULE_0__[\"default\"]([j, i], null);\n      }\n    }\n    this.array[this.root_pos[0]][this.root_pos[1]].parent = 'root';\n  }\n\n  drawGrid(ctx, lineLength) {\n    this.array.map(row => row.map(node => node.drawNode(ctx, lineLength)));\n  }\n\n  drawDiagonalBackground() {}\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Grid);\n\n//# sourceURL=webpack:///./lib/grid.js?");

/***/ }),

/***/ "./lib/node.js":
/*!*********************!*\
  !*** ./lib/node.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _util_draw_grid_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/draw_grid_util */ \"./lib/util/draw_grid_util.js\");\n\n\nclass Node {\n  constructor(coords, parent) {\n    this.coords = coords;\n    this.parent = parent;\n    this.x = coords[0];\n    this.y = coords[1];\n    this.drawNode = this.drawNode.bind(this);\n    this.drawLine = this.drawLine.bind(this);\n    this.candidates = this.candidates.bind(this);\n  }\n\n  distance() {\n    if (this.parent) {\n      if (this.parent === 'root') {\n        return 0;\n      } else {\n        return this.parent.distance() + 1;\n      }\n    } else {\n      return nil;\n    }\n  }\n\n  drawNode(ctx, lineLength) {\n    let a = this.x * lineLength;\n    let b = this.y * lineLength;\n    // top line\n    this.drawLine(a, b, a + lineLength, b, ctx);\n    // right line\n    this.drawLine(a + lineLength, b, a + lineLength, b + lineLength, ctx);\n    // bottom line\n    this.drawLine(a + lineLength, b + lineLength, a, b + lineLength, ctx);\n    //left line\n    this.drawLine(a, b + lineLength, a, b, ctx);\n\n    // ctx.strokeRect(this.x * lineLength, this.y * lineLength, lineLength, lineLength);\n  }\n\n  drawLine(a, b, c, d, ctx) {\n    ctx.beginPath();\n    ctx.moveTo(a, b);\n    ctx.lineTo(c, d);\n    ctx.strokeStyle = 'rgba(75,\t55,\t23, 1)';\n    ctx.lineWidth = 1;\n    ctx.stroke();\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Node);\n\n// manual draw line in this.drawNode\n\n// ctx.beginPath();\n// ctx.moveTo(a, b);\n// ctx.lineTo(a + lineLength, b);\n// ctx.strokeStyle = 'rgba(75,\t55,\t23, 1)';\n// ctx.lineWidth = 1;\n// ctx.stroke();\n//\n// ctx.beginPath();\n// ctx.moveTo(a, b);\n// ctx.lineTo(a + lineLength, b);\n// ctx.strokeStyle = 'rgba(75,\t55,\t23, 1)';\n// ctx.lineWidth = 1;\n// ctx.stroke();\n//\n// ctx.beginPath();\n// ctx.moveTo(a + lineLength, b);\n// ctx.lineTo(a + lineLength, b + lineLength);\n// ctx.strokeStyle = 'rgba(75,\t55,\t23, 1)';\n// ctx.lineWidth = 1;\n// ctx.stroke();\n//\n// ctx.beginPath();\n// ctx.moveTo(a, b + lineLength);\n// ctx.lineTo(a + lineLength, b + lineLength);\n// ctx.strokeStyle = 'rgba(75,\t55,\t23, 1)';\n// ctx.lineWidth = 1;\n// ctx.stroke();\n\n//# sourceURL=webpack:///./lib/node.js?");

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