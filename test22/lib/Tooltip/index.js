import React, { isValidElement, PureComponent } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import isString from 'lodash/isString';
import isArray from 'lodash/isArray';
import isEqual from 'lodash/isEqual';
import isObject from 'lodash/isObject';
import { trimList, getOtherProps, $, SVG } from '../util';
import styled from 'styled-components';

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  &.TipBase {\n    position: fixed;\n    z-index: 1200;\n    pointer-events: none;\n  }\n  .Tip {\n    position: absolute;\n    padding: 0.33em 0.5em;\n    font-size: 12px;\n    line-height: 1.4;\n    pointer-events: none;\n    speak: none;\n    transition-property: opacity, transform;\n    transition-duration: 0.15s;\n    user-select: none;\n    filter: opacity(0.8);\n    &.arrowed {\n      padding: 0.33em 0.75em;\n    }\n    & > .arrow {\n      position: absolute;\n      z-index: 10;\n      display: block;\n      font-size: 14px;\n      line-height: 0;\n      svg {\n        width: 1em;\n        height: 0.375em;\n        fill: #415058;\n      }\n    }\n    &:not(.is-open) {\n      opacity: 0 !important;\n    }\n    &.is-open {\n      opacity: 1;\n    }\n    &.on-top {\n      left: 50%;\n      bottom: 100%;\n      transform: translate(-50%, -10%);\n      &.arrowed {\n        margin-bottom: 0.25em;\n      }\n      &.is-open {\n        transform: translate(-50%);\n      }\n    }\n    &.on-bottom {\n      left: 50%;\n      top: 100%;\n      transform: translate(-50%, 10%);\n      &.arrowed {\n        margin-top: 0.25em;\n      }\n      &.is-open {\n        transform: translate(-50%);\n      }\n    }\n    &.on-left {\n      right: 100%;\n      top: 50%;\n      transform: translate(-10%, -50%);\n      &.is-open {\n        transform: translate(0, -50%);\n      }\n    }\n    &.on-right {\n      left: 100%;\n      top: 50%;\n      transform: translate(10%, -50%);\n      &.is-open {\n        transform: translate(0, -50%);\n      }\n    }\n    &.on-top > .arrow {\n      left: 50%;\n      bottom: 0;\n      transform: translateX(-50%);\n      &.on-top > .arrow svg {\n        transform: rotate(180deg);\n      }\n    }\n    &.on-bottom > .arrow {\n      top: 0;\n      left: 50%;\n      transform: translateX(-50%);\n    }\n    &.on-right > .arrow {\n      top: 50%;\n      left: 0;\n      font-size: 16px;\n      transform: translateY(-50%);\n      svg {\n        transform: rotate(-90deg);\n      }\n    }\n    &.on-left > .arrow {\n      top: 50%;\n      right: 0;\n      font-size: 16px;\n      transform: translateY(-50%);\n      svg {\n        transform: rotate(90deg);\n      }\n    }\n    > .content {\n      position: relative;\n      z-index: 20;\n      padding: 0.5em;\n      width: -moz-max-content;\n      width: max-content;\n      min-width: 3em;\n      max-width: 20em;\n      min-height: 2em;\n      background-color: #415058;\n      -webkit-backdrop-filter: blur(2px);\n      backdrop-filter: blur(2px);\n      border-radius: 2px;\n      color: #fff;\n    }\n  }\n  .CoreTip {\n    filter: opacity(0.9);\n    > .arrow svg {\n      fill: #1e292e;\n    }\n    > .content {\n      padding: 0.5em 0.75em;\n      background-color: #1e292e;\n      border-radius: 4px;\n      box-shadow: 0 2px 8px 0 rgba(0,0,0,0.15);\n    }\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  div.Tooltip {\n    width: -moz-fit-content;\n    width: -webkit-fit-content;\n    width: fit-content;\n  }\n  &.Ellipsis {\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    display: inline-block;\n    max-width: 100%;\n    vertical-align: bottom;\n    &.isnt-truncated {\n      display: inline;\n      max-width: initial !important;\n    }\n    &.is-truncated:before {\n      content: '';\n      display: block;\n    }\n    &[data-type=user],\n    &[data-type=id] {\n      max-width: 10em;\n    }\n    &[data-type=email] {\n      max-width: 12em;\n    }\n    &[data-type=org] {\n      max-width: 15em;\n    }\n    &[data-type=team] {\n      max-width: 10em;\n    }\n    &[data-type=app] {\n      max-width: 15em;\n    }\n    &[data-type=widget] {\n      max-width: 12em;\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
var StyledToolTipSpan = styled.span(_templateObject());
var StyledToolTip = styled.div(_templateObject2());

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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
var EVENT_NAME_LIST = ['hover', 'click'];
var TIP_ROOT_ID = 'IBOT_TOOLTIP_ROOT';
var $tipRoot = document.getElementById(TIP_ROOT_ID) || Object.assign(document.createElement('div'), {
  id: TIP_ROOT_ID
});
var $body = document.body;

if (!$body.contains($tipRoot)) {
  $body.appendChild($tipRoot);
}

function parseContent(content) {
  var eventName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'hover';
  return isString(content) || isArray(content) || /*#__PURE__*/isValidElement(content) ? content : EVENT_NAME_LIST.includes(eventName) && isObject(content) ? content[eventName] || content.hover : null;
}

var Tooltip = /*#__PURE__*/function (_PureComponent) {
  _inherits(Tooltip, _PureComponent);

  var _super = _createSuper(Tooltip);

  function Tooltip() {
    var _this;

    _classCallCheck(this, Tooltip);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      isOpen: false,
      isClicked: false,
      $text: null
    });

    _defineProperty(_assertThisInitialized(_this), "ref", /*#__PURE__*/React.createRef());

    _defineProperty(_assertThisInitialized(_this), "onClick", function (e) {
      _this.setState({
        isOpen: !!parseContent(_this.props.content, 'click'),
        isClicked: true
      });

      e.persist();

      _this.props.onClick(e);
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseEnter", function () {
      return Object.assign(_assertThisInitialized(_this), {
        hoverTimeout: setTimeout(function () {
          return _this.setState({
            isOpen: !!parseContent(_this.props.content, 'hover')
          }, _this.props.onMouseEnter);
        }, _this.props.delay)
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseLeave", function () {
      clearTimeout(_this.hoverTimeout);

      _this.setState({
        isOpen: false,
        isClicked: false
      }, _this.props.onMouseLeave);
    });

    return _this;
  }

  _createClass(Tooltip, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.setRef(this.ref.current);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(_, _ref) {
      var _this2 = this;

      var wasOpen = _ref.isOpen;
      var duration = this.props.duration;
      var isOpen = this.state.isOpen;

      if (duration > 0 && !wasOpen && isOpen) {
        this.timeout = setTimeout(function () {
          return _this2.setState({
            isOpen: false
          });
        }, duration);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearTimeout(this.timeout);
      clearTimeout(this.hoverTimeout);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          theme = _this$props.theme,
          position = _this$props.position,
          inflexible = _this$props.inflexible,
          arrowed = _this$props.arrowed,
          className = _this$props.className,
          tipClassName = _this$props.tipClassName,
          content = _this$props.content,
          html = _this$props.html,
          children = _this$props.children;
      var _this$state = this.state,
          isOpen = _this$state.isOpen,
          isClicked = _this$state.isClicked;
      var klass = trimList(['Tooltip', className, isOpen ? 'is-open' : '', isClicked ? 'is-clicked' : '']);
      var eventName = isClicked ? 'click' : 'hover';
      return /*#__PURE__*/React.createElement(StyledToolTipSpan, _extends({
        ref: this.ref,
        className: klass,
        onMouseEnter: this.onMouseEnter,
        onClick: this.onClick,
        onMouseLeave: this.onMouseLeave
      }, getOtherProps(this.constructor, this.props)), /*#__PURE__*/React.createElement(React.Fragment, null, html ? /*#__PURE__*/React.createElement("span", {
        dangerouslySetInnerHTML: {
          __html: html
        }
      }) : children, /*#__PURE__*/React.createElement(Tip, {
        $text: this.ref.current,
        isOpen: isOpen,
        className: tipClassName,
        eventName: eventName,
        theme: theme,
        position: position,
        inflexible: inflexible,
        arrowed: arrowed
      }, parseContent(content, eventName))));
    }
  }]);

  return Tooltip;
}(PureComponent);

_defineProperty(Tooltip, "propTypes", {
  theme: PropTypes.oneOf(['core', 'plain']),
  position: PropTypes.oneOf(['top', 'right', 'bottom', 'left']).isRequired,
  arrowed: PropTypes.bool,
  inflexible: PropTypes.bool,
  className: PropTypes.string,
  tipClassName: PropTypes.string,
  content: PropTypes.oneOfType([PropTypes.node, PropTypes.shape(EVENT_NAME_LIST.reduce(function (res, n) {
    return Object.assign(res, _defineProperty({}, n, PropTypes.node));
  }, {}))]),
  onMouseEnter: PropTypes.func,
  onClick: PropTypes.func,
  onMouseLeave: PropTypes.func,
  delay: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  duration: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  children: PropTypes.node,
  html: PropTypes.string,
  setRef: PropTypes.func
});

_defineProperty(Tooltip, "defaultProps", {
  theme: 'plain',
  position: 'right',
  arrowed: true,
  inflexible: false,
  delay: 200,
  className: '',
  tipClassName: '',
  setRef: function setRef() {
    return null;
  },
  onClick: function onClick() {
    return null;
  }
});

var Tip = /*#__PURE__*/function (_PureComponent2) {
  _inherits(Tip, _PureComponent2);

  var _super2 = _createSuper(Tip);

  function Tip() {
    var _this3;

    _classCallCheck(this, Tip);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this3 = _super2.call.apply(_super2, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this3), "state", {
      prevProps: _this3.props,
      isOpen: _this3.props.isOpen,
      position: _this3.props.position
    });

    _defineProperty(_assertThisInitialized(_this3), "ref", /*#__PURE__*/React.createRef());

    _defineProperty(_assertThisInitialized(_this3), "position", function () {
      var _this3$props = _this3.props,
          $text = _this3$props.$text,
          position = _this3$props.position,
          inflexible = _this3$props.inflexible;

      var _assertThisInitialize = _assertThisInitialized(_this3),
          $tipBase = _assertThisInitialize.$tipBase,
          $tip = _assertThisInitialize.$tip;

      if (!$text || !$tipBase || !$tip) return;
      var flexible = !inflexible;
      var minX = 10,
          minY = 10;
      var maxX = window.innerWidth - 10,
          maxY = window.innerHeight - 10;

      var _$text$getBoundingCli = $text.getBoundingClientRect(),
          top = _$text$getBoundingCli.top,
          right = _$text$getBoundingCli.right,
          bottom = _$text$getBoundingCli.bottom,
          left = _$text$getBoundingCli.left;

      var wOf$text = $text.offsetWidth,
          hOf$text = $text.offsetHeight;
      var wOf$tip = $tip.offsetWidth,
          hOf$tip = $tip.offsetHeight;
      var midXOf$text = left + wOf$text / 2;
      var midYOf$text = top + hOf$text / 2;
      var baseStyle = {};
      var tipStyle = {};

      var setStyleForBase = function setStyleForBase(src) {
        return Object.assign(baseStyle, src);
      };

      var setStyleForTip = function setStyleForTip(src) {
        return Object.assign(tipStyle, src);
      };

      setStyleForBase({
        top: "".concat(top, "px"),
        left: "".concat(left, "px"),
        width: "".concat(wOf$text, "px"),
        height: "".concat(hOf$text, "px")
      }); // Main-axis position adjustment:

      if (flexible) {
        if (position === 'top' && top - hOf$tip < minY) {
          _this3.setState({
            position: 'bottom'
          });
        } else if (position === 'bottom' && bottom + hOf$tip > maxY) {
          _this3.setState({
            position: 'top'
          });
        } else if (position === 'left' && left - wOf$tip < minX) {
          _this3.setState({
            position: 'right'
          });
        } else if (position === 'right' && right + wOf$tip > maxX) {
          _this3.setState({
            position: 'left'
          });
        }
      } // Cross-axis position adjustment:


      switch (position) {
        case 'top':
        case 'bottom':
          {
            var most = (wOf$tip - 18) / 2 + 6;
            var adjustment = // No enough space to the left:
            midXOf$text - wOf$tip / 2 < 10 ? Math.min(wOf$tip / 2 - midXOf$text - 6, most) // No enough space to the right:
            : midXOf$text + wOf$tip / 2 > maxX ? Math.max(-(wOf$tip / 2 - (maxX + 10 - midXOf$text)) + 6, -most) : 0;

            if (adjustment !== 0) {
              setStyleForTip({
                transform: "translateX(".concat(adjustment, "px)")
              });
            }

            break;
          }

        case 'left':
        case 'right':
          {
            var _most = (hOf$tip - 18) / 2 - 6;

            var _adjustment = hOf$tip > 50 && ( // No enough space to the top:
            midYOf$text - 5 <= maxY / 2 && midYOf$text - hOf$tip / 2 < 10 ? Math.min(hOf$tip / 2 - midYOf$text - 6, _most) // No enough space to the bottom:
            : midYOf$text - 5 > maxY / 2 && midYOf$text + hOf$tip / 2 > maxY ? Math.max(-(hOf$tip / 2 - (maxY + 10 - midYOf$text)), -_most) : 0);

            if (_adjustment !== 0) {
              setStyleForTip({
                transform: "translateY(".concat(_adjustment, "px)")
              });
            }

            break;
          }
      }

      Object.assign($tipBase.style, baseStyle);
      Object.assign($('.content', $tip).style, tipStyle);
      $tip.classList.add('is-open');
    });

    _defineProperty(_assertThisInitialized(_this3), "onTransitionEnd", function () {
      var isOpen = _this3.props.isOpen;

      if (isOpen) {
        _this3.$tip.classList.add('is-open');
      } else {
        _this3.setState({
          isOpen: false
        });
      }
    });

    return _this3;
  }

  _createClass(Tip, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(_ref2) {
      var wasOpen = _ref2.isOpen;
      var isOpen = this.props.isOpen;

      if (!wasOpen && isOpen) {
        this.position();
      } else if (wasOpen && !isOpen) {
        if (this.$tip) {
          this.$tip.classList.remove('is-open');
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/createPortal(this.tip, $tipRoot);
    }
  }, {
    key: "$tipBase",
    get: function get() {
      return this.ref.current;
    }
  }, {
    key: "$tip",
    get: function get() {
      return this.$tipBase && $('.Tip', this.$tipBase);
    }
  }, {
    key: "tip",
    get: function get() {
      var _this$props2 = this.props,
          className = _this$props2.className,
          theme = _this$props2.theme,
          inflexible = _this$props2.inflexible,
          arrowed = _this$props2.arrowed,
          children = _this$props2.children;
      var _this$state2 = this.state,
          isOpen = _this$state2.isOpen,
          position = _this$state2.position;
      var klass = trimList([theme === 'core' ? 'Tip CoreTip' : 'Tip', className, "on-".concat(position), inflexible && 'inflexible', arrowed && 'arrowed']);
      return isOpen && /*#__PURE__*/React.createElement(StyledToolTip, {
        className: "TipBase",
        ref: this.ref
      }, /*#__PURE__*/React.createElement("div", {
        className: klass,
        onTransitionEnd: this.onTransitionEnd
      }, arrowed && /*#__PURE__*/React.createElement("div", {
        className: "arrow",
        dangerouslySetInnerHTML: {
          __html: SVG.DROPDOWN_ARROW
        }
      }), /*#__PURE__*/React.createElement("div", {
        className: "content"
      }, children))) // <div className="TipBase" ref={this.ref}>
      //   <div
      //     className={klass}
      //     onTransitionEnd={this.onTransitionEnd}
      //   >
      //     { arrowed && (
      //       <div
      //         className="arrow"
      //         dangerouslySetInnerHTML={{ __html: SVG.DROPDOWN_ARROW }}
      //       />
      //     )}
      //
      //     <div className="content">{children}</div>
      //   </div>
      // </div>
      ;
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, _ref3) {
      var prevProps = _ref3.prevProps;

      if (!isEqual(prevProps, props)) {
        return {
          prevProps: props,
          isOpen: props.isOpen,
          position: props.position
        };
      }

      return null;
    }
  }]);

  return Tip;
}(PureComponent);

_defineProperty(Tip, "propTypes", {
  isOpen: PropTypes.bool,
  className: PropTypes.string,
  eventName: PropTypes.oneOf(EVENT_NAME_LIST),
  $text: PropTypes.instanceOf(Element),
  theme: PropTypes.oneOf(['plain', 'core']),
  position: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  inflexible: PropTypes.bool,
  arrowed: PropTypes.bool,
  children: PropTypes.node
});

export default Tooltip;
