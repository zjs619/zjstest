import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Tooltip from '../Tooltip';
import { trimList } from '../util';
import styled from 'styled-components';

function _templateObject() {
  var data = _taggedTemplateLiteral([void 0], ["\n  &.Punctuation {\n    display: inline-flex;\n    display: inline-flex;\n    &.isnt-truncated {\n      display: inline;\n    }\n    &.with-period {\n      &:after {\n        content: '. ';\n      }\n      &:lang(zh):after {\n        content: '\\3002';\n      }\n    }\n    &.with-comma {\n      &:after {\n        content: ', ';\n      }\n      &:lang(zh):after {\n        content: '\\FF0C';\n      }\n    }\n    &.with-question-mark:after {\n      &:after {\n        content: '? ';\n      }\n      &:lang(zh):after {\n        content: '\\FF1F';\n      }\n\n    }\n    &.with-quote {\n      &:before {\n        content: '\\201C';\n      }\n      &:after {\n        content: '\\201D';\n      }\n      &.with-period:after {\n        content: '\\201D. ';\n      }\n      &.with-comma:after {\n        content: '\\201D, ';\n      }\n      &.with-question-mark:after {\n        content: '\\201D? ';\n      }\n      &:lang(zh):before {\n        content: '\\300C';\n      }\n      &:lang(zh):after {\n        content: '\\300D';\n      }\n      &.with-period:lang(zh):after {\n        content: '\\300D\\3002';\n      }\n      &.with-comma:lang(zh):after {\n        content: '\\300D\\FF0C';\n      }\n      &.with-question-mark:lang(zh):after {\n        content: '\\300D\\FF1F';\n      }\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
var StyledEllipsis = styled.span(_templateObject());

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Ellipsis = /*#__PURE__*/function (_PureComponent) {
  _inherits(Ellipsis, _PureComponent);

  var _super = _createSuper(Ellipsis);

  function Ellipsis() {
    var _this;

    _classCallCheck(this, Ellipsis);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      isTruncated: false,
      isDetected: false
    });

    _defineProperty(_assertThisInitialized(_this), "set$ellipsis", function ($ellipsis) {
      return Object.assign(_assertThisInitialized(_this), {
        $ellipsis: $ellipsis
      });
    });

    _defineProperty(_assertThisInitialized(_this), "detectTruncation", function () {
      var $e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.$ellipsis;
      return $e.offsetWidth < $e.scrollWidth;
    });

    return _this;
  }

  _createClass(Ellipsis, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      return this.setState({
        isDetected: true,
        isTruncated: this.detectTruncation()
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(_ref) {
      var prevChildren = _ref.children,
          prevHTML = _ref.html;
      var _this$props = this.props,
          children = _this$props.children,
          html = _this$props.html;
      var isDetected = this.state.isDetected;

      if (prevChildren !== children || prevHTML !== html) {
        return this.setState({
          isDetected: false
        });
      }

      if (!isDetected) {
        return this.setState({
          isDetected: true,
          isTruncated: this.detectTruncation()
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          className = _this$props2.className,
          to = _this$props2.to,
          type = _this$props2.type,
          max = _this$props2.max,
          display = _this$props2.display,
          lang = _this$props2.lang,
          theme = _this$props2.theme,
          noTooltip = _this$props2.noTooltip,
          withTooltip = _this$props2.withTooltip,
          withQuote = _this$props2.withQuote,
          withPeriod = _this$props2.withPeriod,
          withComma = _this$props2.withComma,
          withQuestionMark = _this$props2.withQuestionMark,
          children = _this$props2.children,
          html = _this$props2.html,
          others = _objectWithoutProperties(_this$props2, ["className", "to", "type", "max", "display", "lang", "theme", "noTooltip", "withTooltip", "withQuote", "withPeriod", "withComma", "withQuestionMark", "children", "html"]);

      var _this$state = this.state,
          isTruncated = _this$state.isTruncated,
          isDetected = _this$state.isDetected;
      var contentProp = html ? {
        dangerouslySetInnerHTML: {
          __html: html
        }
      } : {
        children: children
      };
      var truncationClassName = isDetected && (isTruncated ? 'is-truncated' : 'isnt-truncated');

      var tooltipProps = _objectSpread({
        type: to ? 'link' : 'inline',
        theme: theme,
        className: trimList(['Ellipsis', truncationClassName, className, (withQuote || withPeriod || withComma || withQuestionMark) && 'Punctuation', withQuote && 'with-quote', withPeriod && 'with-period', withComma && 'with-comma', withQuestionMark && 'with-question-mark']),
        href: to,
        'data-type': type,
        'data-max': max,
        style: {
          display: display,
          maxWidth: isFinite(max) ? "".concat(max, "em") : max
        },
        content: (withTooltip || isTruncated && !noTooltip) && /*#__PURE__*/React.createElement("div", _extends({
          lang: lang,
          className: "EllipsisTip"
        }, contentProp)),
        html: html,
        children: children,
        setRef: this.set$ellipsis
      }, others);

      var tooltip = /*#__PURE__*/React.createElement(Tooltip, tooltipProps);
      return withQuote || withPeriod || withComma || withQuestionMark ? /*#__PURE__*/React.createElement(StyledEllipsis, {
        className: trimList(['Punctuation', withQuote && 'with-quote', withPeriod && 'with-period', withComma && 'with-comma', withQuestionMark && 'with-question-mark', truncationClassName])
      }, tooltip) : tooltip;
    }
  }]);

  return Ellipsis;
}(PureComponent);

_defineProperty(Ellipsis, "propTypes", {
  className: PropTypes.string,
  theme: PropTypes.oneOf(['core', 'plain']),
  type: PropTypes.oneOf(['user', 'id', 'email', 'org', 'team', 'app', 'widget']),
  max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  display: PropTypes.oneOf(['inline-block', 'block']),
  lang: PropTypes.string,
  to: PropTypes.string,
  children: PropTypes.node,
  html: PropTypes.string,
  noTooltip: PropTypes.bool,
  withTooltip: PropTypes.bool,
  withQuote: PropTypes.bool,
  withComma: PropTypes.bool,
  withPeriod: PropTypes.bool,
  withQuestionMark: PropTypes.bool
});

_defineProperty(Ellipsis, "defaultProps", {
  lang: 'en',
  theme: 'core'
});

export default Ellipsis;
