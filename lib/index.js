"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var rvhRegex = /(\d+(\.\d*)?)rvh\s*$/;

var Div100vh =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Div100vh, _React$Component);

  function Div100vh() {
    var _this;

    _classCallCheck(this, Div100vh);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Div100vh).call(this));
    _this.myRef = _react.default.createRef();
    _this.computeRvhStyles = _this.computeRvhStyles.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  } // On window resize, recalculate any rvh unit style properties


  _createClass(Div100vh, [{
    key: "computeRvhStyles",
    value: function computeRvhStyles() {
      var node = this.myRef.current;
      var rvhPropertyFound = false;
      Object.entries(this.props.style || {}).forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            property = _ref2[0],
            rawValue = _ref2[1];

        var match = rvhRegex.exec(rawValue);

        if (match != null) {
          rvhPropertyFound = true; // Guarantee that this only runs for numbers

          var extractedValue = parseFloat(match[0]);
          node.style[property] = extractedValue / 100 * window.innerHeight + 'px';
        }
      }); // Default to height 100vh if no rvh found in style

      if (!rvhPropertyFound) {
        node.style.height = window.innerHeight + 'px';
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var resizeDelay = this.props.resizeDelay;
      this.computeRvhStyles();
      window.addEventListener('resize', resizeDelay && function () {
        return setTimeout(_this2.computeRvhStyles, resizeDelay);
      } || this.computeRvhStyles);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.computeRvhStyles);
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement("div", _extends({
        ref: this.myRef
      }, this.props));
    }
  }]);

  return Div100vh;
}(_react.default.Component);

Div100vh.propTypes = {
  resizeDelay: _propTypes.default.number,
  style: _propTypes.default.objectOf(_propTypes.default.string)
};
var _default = Div100vh;
exports.default = _default;