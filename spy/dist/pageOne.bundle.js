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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getChartSize(el) {
  var width = .9 * parseInt(el.style('width'));
  var height = .7 * parseInt(width * 7 / 9);

  return [width, height];
}

var AxisX = function (_React$Component) {
  _inherits(AxisX, _React$Component);

  function AxisX() {
    _classCallCheck(this, AxisX);

    return _possibleConstructorReturn(this, (AxisX.__proto__ || Object.getPrototypeOf(AxisX)).apply(this, arguments));
  }

  _createClass(AxisX, [{
    key: "render",
    value: function render() {

      var data = this.props.data;
      var margin = this.props.margin;
      var height = this.props.height - margin.top - margin.bottom;
      var width = this.props.width - margin.left - margin.right;

      var x = d3.time.scale().range([0, width]);

      var xAxis = d3.svg.axis().scale(x).orient("bottom");

      x.domain(d3.extent(data, function (d) {
        return d.date;
      }));

      d3.select(".x").attr("transform", "translate(0," + height + ")").call(xAxis).append("text").attr("transform", "translate(" + width / 2 + " ," + (height + margin.bottom) + ")").attr("x", 6).attr("dx", ".71em").style("text-anchor", "middle").text("Date");
      return React.createElement("g", { className: "x axis" });
    }
  }]);

  return AxisX;
}(React.Component);

;

var AxisY = function (_React$Component2) {
  _inherits(AxisY, _React$Component2);

  function AxisY() {
    _classCallCheck(this, AxisY);

    return _possibleConstructorReturn(this, (AxisY.__proto__ || Object.getPrototypeOf(AxisY)).apply(this, arguments));
  }

  _createClass(AxisY, [{
    key: "render",
    value: function render() {
      var data = this.props.data;
      var margin = this.props.margin;
      var height = this.props.height - margin.top - margin.bottom;
      var width = this.props.width - margin.left - margin.right;

      var y = d3.scale.linear().range([height, 0]);

      var yAxis = d3.svg.axis().scale(y).orient("left");

      y.domain([0, d3.max(data, function (d) {
        return d.close;
      })]);

      d3.select(".y").call(yAxis).append("text").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style("text-anchor", "end").text("Price ($)");

      return React.createElement("g", { className: "y axis" });
    }
  }]);

  return AxisY;
}(React.Component);

;

var Line = function (_React$Component3) {
  _inherits(Line, _React$Component3);

  function Line() {
    _classCallCheck(this, Line);

    return _possibleConstructorReturn(this, (Line.__proto__ || Object.getPrototypeOf(Line)).apply(this, arguments));
  }

  _createClass(Line, [{
    key: "render",
    value: function render() {
      var data = this.props.data;
      var margin = this.props.margin;
      var height = this.props.height - margin.top - margin.bottom;
      var width = this.props.width - margin.left - margin.right;

      var x = d3.time.scale().range([0, width]);

      var y = d3.scale.linear().range([height, 0]);

      var line = d3.svg.line().x(function (d) {
        return x(d.date);
      }).y(function (d) {
        return y(d.close);
      });

      data.forEach(function (d) {
        x.domain(d3.extent(data, function (d) {
          return d.date;
        }));
        y.domain([0, d3.max(data, function (d) {
          return d.close;
        })]);
      });

      var newline = line(data);
      console.log(newline);

      return React.createElement("path", { className: "line", d: newline });
    }
  }]);

  return Line;
}(React.Component);

;

var Chart = function (_React$Component4) {
  _inherits(Chart, _React$Component4);

  function Chart(props) {
    _classCallCheck(this, Chart);

    var _this5 = _possibleConstructorReturn(this, (Chart.__proto__ || Object.getPrototypeOf(Chart)).call(this, props));

    _this5.state = {
      chartWidth: 0,
      chartHeight: 0,
      x: NaN,
      y: NaN,
      data: [],
      margin: {} };

    return _this5;
  }

  _createClass(Chart, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var container = d3.select("#graphic");

      var margin = { top: 20, right: 20, bottom: 30, left: 50 };

      var chartWidth = getChartSize(container)[0];
      var chartHeight = getChartSize(container)[1];

      var _this = this;

      var formatDate = d3.time.format("%Y-%m-%d");

      function type(d) {
        d.date = formatDate.parse(d.date);
        d.close = +d.close;
        return d;
      }

      d3.tsv("stk.tsv", type, function (error, data) {
        if (error) throw error;

        _this.setState({
          chartWidth: chartWidth,
          chartHeight: chartHeight,
          data: data,
          margin: margin
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var width = this.state.chartWidth;
      var height = this.state.chartHeight;
      var margin = this.state.margin;
      var data = this.state.data;
      return React.createElement(
        "div",
        { id: "chart" },
        React.createElement(
          "svg",
          { height: height, width: width },
          React.createElement(
            "g",
            { transform: "translate(50,20)" },
            React.createElement(AxisX, { width: width, height: height, margin: margin, data: data }),
            React.createElement(AxisY, { width: width, height: height, margin: margin, data: data }),
            React.createElement(Line, { width: width, height: height, margin: margin, data: data })
          )
        )
      );
    }
  }]);

  return Chart;
}(React.Component);

;

ReactDOM.render(React.createElement(Chart, null), document.getElementById('graphic'));

/***/ })
/******/ ]);