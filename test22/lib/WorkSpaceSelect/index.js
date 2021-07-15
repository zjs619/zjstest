import React, { isValidElement, PureComponent, createRef } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import EventListener from 'react-event-listener';
import get from 'lodash/get';
import isArray from 'lodash/isArray';
import isEqual from 'lodash/isEqual';
import isElement from 'lodash/isElement';
import Ellipsis from '../Ellipsis';
import { $, preparePortal, trimList, preventScrollingPropagation } from '../util';
import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';
import styled from 'styled-components';

var MARGIN = 9;
/**
 * Position menu according to where its opener is and return
 * corresponding information.
 *
 * @param {Object}
 *  @prop {Element} $opener
 *  @prop {Element} $menuBase
 *  @prop {Object} [menuBaseStyle={}]
 *  @prop {String} [inflexible=false]
 *  @prop {Boolean} [shouldSetMaxHeight=false]
 *  @prop {Number [decidingPoint]
 *@return {Object}
 *  @prop {Object} style
 *  @prop {Boolean} isDownward
 */

function positionMenu(_ref) {
  var $opener = _ref.$opener,
      $menuBase = _ref.$menuBase,
      _ref$menuBaseStyle = _ref.menuBaseStyle,
      menuBaseStyle = _ref$menuBaseStyle === void 0 ? {} : _ref$menuBaseStyle,
      _ref$inflexible = _ref.inflexible,
      _ref$shouldSetMaxHeig = _ref.shouldSetMaxHeight,
      shouldSetMaxHeight = _ref$shouldSetMaxHeig === void 0 ? false : _ref$shouldSetMaxHeig,
      $menuContainer = _ref.$menuContainer,
      $fontTip = _ref.$fontTip;
  if (!$opener || !$menuBase) return;
  var $menu = $menuBase.querySelector('*');
  var $current = $('li[role=option].is-active', $menu) || $('li[role=option]', $menu) || $('li[role=empty-msg]', $menu);
  var $activeItemRect = $current.getBoundingClientRect();
  var $menuRect = $menu.getBoundingClientRect();
  var result = {
    styleFor$menuBase: {},
    styleFor$menu: {},
    styleFor$menuContainer: {},
    styleFor$fontTip: {}
  };

  var setStyleFor$menuBase = function setStyleFor$menuBase(style) {
    return Object.assign(result.styleFor$menuBase, style);
  };

  var setStyleFor$menu = function setStyleFor$menu(style) {
    return Object.assign(result.styleFor$menu, style);
  };

  var setStyleFor$menuContainer = function setStyleFor$menuContainer(style) {
    return Object.assign(result.styleFor$menuContainer, style);
  };

  var setStyleFor$fontTip = function setStyleFor$fontTip(style) {
    return Object.assign(result.styleFor$fontTip, style);
  };

  var wOf$menu = $menu.offsetWidth,
      hOf$menu = $menu.offsetHeight;
  var wOf$opener = menuBaseStyle.width || $opener.offsetWidth;
  var hOf$opener = menuBaseStyle.height || $opener.offsetHeight;
  var rect = $opener.getBoundingClientRect();

  var _Object$assign = Object.assign({
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    left: rect.left
  }, menuBaseStyle),
      top = _Object$assign.top,
      right = _Object$assign.right,
      bottom = _Object$assign.bottom,
      left = _Object$assign.left; // Copy positioning info of $opener to $menuBase:


  setStyleFor$menuBase({
    top: "".concat(top, "px"),
    left: "".concat(left, "px"),
    width: "".concat(wOf$opener, "px"),
    height: "".concat(hOf$opener, "px")
  });
  var _window = window,
      hOf$win = _window.innerHeight;
  var minY = 10;
  var maxY = hOf$win - 10;
  var bottomOf$opener = top + hOf$opener;
  var adjustMenuTop = 0;
  var scroolMove = 0;
  var moveValue = ($activeItemRect.top - $menuRect.top) / 0.8;

  if (checkActiveTargetVisible($menuRect, $activeItemRect)) {
    adjustMenuTop = -moveValue;
  } else {
    scroolMove = $activeItemRect.bottom / 0.8 - $menuRect.bottom / 0.8;
    adjustMenuTop = -moveValue + scroolMove;
  }

  var $fontTipHeight = 0;

  if ($fontTip) {
    $fontTipHeight = $fontTip.getBoundingClientRect().height;
  } // Slide downward:


  if (bottomOf$opener + hOf$menu + MARGIN + adjustMenuTop + $fontTipHeight < hOf$win) {
    result.isDownward = true;

    if (checkActiveTargetVisible($menuRect, $activeItemRect)) {
      setStyleFor$menuContainer({
        top: "".concat(adjustMenuTop, "px")
      });

      if ($fontTip) {
        setStyleFor$fontTip({
          top: "".concat(adjustMenuTop + $menuRect.height / 0.8, "px"),
          width: "".concat($menuRect.width / 0.8, "px")
        });
      }
    } else {
      setStyleFor$menuContainer({
        top: "".concat(adjustMenuTop, "px")
      });
      $menuContainer.scrollTop = scroolMove;

      if ($fontTip) {
        setStyleFor$fontTip({
          top: "".concat(adjustMenuTop + $menuRect.height / 0.8, "px"),
          width: "".concat($menuRect.width / 0.8, "px")
        });
      }
    } // If the height of the menu is taller than that of space downward:


    if (shouldSetMaxHeight && bottom + hOf$menu > maxY) {
      setStyleFor$menu({
        maxHeight: "".concat(maxY - bottom, "px")
      });
    } // Slide upward:

  } else {
    result.isDownward = false; // If the height of the menu is taller than that of space upward:

    if (shouldSetMaxHeight && top - hOf$menu < minY) {
      setStyleFor$menu({
        maxHeight: "".concat(top - minY, "px")
      });
    }
  }

  Object.assign($menuBase.style, result.styleFor$menuBase);
  Object.assign($menu.style, result.styleFor$menu);
  Object.assign($menuContainer.style, result.styleFor$menuContainer);

  if ($fontTip) {
    Object.assign($fontTip.style, result.styleFor$fontTip);
  }

  return result;
}
function getOptionLabel(it) {
  return isString(it) || isNumber(it) || /*#__PURE__*/isValidElement(it) ? it : it.label || it.value ? it.label || it.value : undefined;
}
function getOptionValue(it) {
  return isString(it) || isNumber(it) ? String(it) : it.value || it.label ? String(it.value || it.label) : undefined;
}
function checkOptionByValue(it, value) {
  return !!value && getOptionValue(it) === String(value);
}
var INPUT_ARROW = "<svg width=\"10\" height=\"10\" ><path d=\"M5 5.255l1.87-2.043a.623.623 0 0 1 .936 0 .77.77 0 0 1 0 1.022L5.468 6.788a.623.623 0 0 1-.936 0L2.194 4.234a.77.77 0 0 1 0-1.022.623.623 0 0 1 .935 0L5 5.255z\" /></svg>";

function checkActiveTargetVisible($menuRect, $activeItemRect) {
  return $activeItemRect.top / 0.8 >= $menuRect.top / 0.8 && $activeItemRect.bottom / 0.8 <= $menuRect.bottom / 0.8;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  position: fixed;\n  pointer-events: none;\n  z-index: 1100;\n\n  .WorkspaceSelectMenu {\n    position: absolute;\n    padding: 0;\n    display: block;\n    max-width: 20em;\n    min-width: 100%;\n    min-height: 30px;\n    max-height: 300px;\n    overflow-x: hidden;\n    overflow-y: auto;\n    list-style: none;\n    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);\n    color: #fff;\n    border-radius: 2px;\n    background-color: #1f292e;\n    pointer-events: all;\n    /* transition: 0.2s ease-out; */\n    transition-property: transform, opacity;\n    transform-origin: 50% 0;\n    margin: 0;\n\n    &::-webkit-scrollbar {\n      display: block;\n      width: 4px;\n      height: 4px;\n    }\n\n    &::-webkit-scrollbar-thumb {\n      background-color: #DEDEE4;\n      border-radius: 2px;\n    }\n\n    &::-webkit-scrollbar-track {\n      background-color: rgba(#fff, 0.5);\n    }\n\n    &.is-empty {\n      width: fit-content;\n    }\n\n    &:not(.is-open) {\n      opacity: 0;\n      transform: scale(0.8);\n    }\n\n    &.is-downward {\n      top: 100%;\n      bottom: initial;\n    }\n\n    &.is-upward {\n      transform-origin: 50% 100%;\n      top: initial;\n      bottom: 100%;\n    }\n\n    &.is-open {\n      opacity: 1;\n      pointer-events: initial;\n    }\n\n    .SelectOption {\n      display: flex;\n      align-items: center;\n      height: 28px;\n      line-height: 28px;\n      cursor: pointer;\n\n      & > .Ellipsis {\n        padding: 0 16px;\n      }\n\n      &.is-disabled {\n        cursor: not-allowed;\n        opacity: 0.5;\n      }\n\n      &.is-active {\n        background-color: #415058;\n        color: #fff;\n      }\n\n      &:not(.empty-msg):not(.is-disabled):not(.is-active):hover {\n        background-color: #298df8;\n        color: #fff;\n      }\n\n      &.empty-msg {\n        padding: 0 0.5em;\n        color: #8d9ea6;\n        cursor: not-allowed;\n      }\n    }\n\n    &.cant-select .SelectOption {\n      cursor: default;\n    }\n\n    .SelectGroup {\n      .divider {\n        height: 1px;\n        margin: 4px 16px;\n        background: #7d8694;\n      }\n\n      & > .title {\n        font-size: 12px;\n        padding: 0 8px 0 16px;\n        width: 100%;\n        height: 30px;\n        line-height: 30px;\n        color: #8d9ea7;\n\n        span {\n          display: block;\n        }\n      }\n\n      & > ul {\n        margin: 0;\n        padding: 0;\n      }\n    }\n  }\n\n  .font-select-menu-tip {\n    position: absolute;\n    margin-top: -1px;\n    padding: 8px 16px;\n    font-size: 10px;\n    box-shadow: 0 2px 10px 0 rgba(39, 54, 78, 0.08), 4px 12px 40px 0 rgba(39, 54, 78, 0.1);\n    color: #fff;\n    background-color: #1f292e;\n    border-radius: 0 0 2px 2px;\n    pointer-events: auto;\n    transition: opacity 0.2s ease-in;\n    /* transition-property: transform, opacity;\n    transform-origin: 50% 0; */\n\n    .font-link {\n      color: #fff;\n      margin-left: 10px;\n      text-decoration: underline;\n    }\n\n    &:not(.is-show) {\n      opacity: 0;\n    }\n\n    &.is-show {\n      opacity: 1;\n      color: rgba(255, 255, 255, 1);\n    }\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  max-width: 100%;\n  min-width: 3em;\n  height: 28px;\n  font-size: 12px;\n  color: #5b6b73;\n  cursor: pointer;\n\n  button {\n    display: block;\n    height: 100%;\n    color: #1f292e;\n    text-align: start;\n    cursor: inherit;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n  }\n\n  .caret {\n    padding: 0 0.5em;\n    color: #7d8694;\n    height: 100%;\n    display: inline-flex;\n    align-items: center;\n\n    svg {\n      width: 10px;\n      height: 10px;\n      fill: currentColor;\n      transition: transform 0.2s ease-out;\n    }\n  }\n\n  & {\n    padding-left: 5px;\n    border: 1px solid transparent;\n    border-radius: 2px;\n  }\n\n  &.is-open {\n    border-color: #1e98ea;\n\n    .caret {\n      margin-left: auto;\n      visibility: visible;\n\n      svg {\n        transform: rotate(180deg);\n      }\n    }\n  }\n\n  &:not(.is-disabled):not(.readonly):hover {\n    border-color: #ededed;\n\n    .caret {\n      margin-left: auto;\n      visibility: visible;\n    }\n  }\n\n  &.is-disabled {\n    cursor: not-allowed;\n    opacity: 0.6;\n  }\n\n  &.readonly {\n    cursor: default;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
var StyledSelect = styled.label(_templateObject());
var StyledSelectMenu = styled.div(_templateObject2());

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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
var MENU_ROOT_ID = 'IBOT_SELECT_MENU_ROOT';
var $menuRoot = document.getElementById(MENU_ROOT_ID) || Object.assign(document.createElement('div'), {
  id: MENU_ROOT_ID
});
var $body = document.body;

if (!$body.contains($menuRoot)) {
  $body.appendChild($menuRoot);
}

var WorkSpaceSelect = /*#__PURE__*/function (_PureComponent) {
  _inherits(WorkSpaceSelect, _PureComponent);

  var _super = _createSuper(WorkSpaceSelect);

  function WorkSpaceSelect() {
    var _this;

    _classCallCheck(this, WorkSpaceSelect);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      isOpen: false,
      prevProps: _this.props,
      value: _this.props.value
    });

    _defineProperty(_assertThisInitialized(_this), "set$select", function ($select) {
      return _this.setState({
        $select: $select
      });
    });

    _defineProperty(_assertThisInitialized(_this), "open", function () {
      return _this.setState({
        isOpen: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "close", function () {
      return _this.setState({
        isOpen: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "toggle", function () {
      return _this.setState({
        isOpen: !_this.state.isOpen
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onResizeWindow", function () {
      return _this.state.isOpen && _this.close();
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function (value) {
      return _this.setState({
        value: value
      }, function () {
        _this.close();

        _this.props.onChange(value, _this.props.attr);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onSelect", function (_ref) {
      var $opt = _ref.currentTarget;
      var value = _this.props.value;

      var _assertThisInitialize = _assertThisInitialized(_this),
          canSelect = _assertThisInitialize.canSelect;

      return _this.onChange(canSelect ? $opt.dataset.value : value);
    });

    return _this;
  }

  _createClass(WorkSpaceSelect, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      window.addEventListener('resize', this.onResizeWindow);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          size = _this$props.size,
          unstyled = _this$props.unstyled,
          className = _this$props.className,
          isFontSelectMenu = _this$props.isFontSelectMenu,
          onMouseEnter = _this$props.onMouseEnter,
          onMouseLeave = _this$props.onMouseLeave;
      var _this$state = this.state,
          isOpen = _this$state.isOpen,
          $select = _this$state.$select,
          value = _this$state.value;
      var isDisabled = this.isDisabled,
          readOnly = this.readOnly,
          canSelect = this.canSelect;
      var klass = trimList(['WorkspaceSelect', size, unstyled && 'unstyled', className, isOpen && 'is-open', isDisabled && 'is-disabled', readOnly && 'readonly']);
      return /*#__PURE__*/React.createElement(StyledSelect, {
        className: klass,
        role: "listbox",
        ref: this.set$select
      }, /*#__PURE__*/React.createElement("button", {
        onClick: this.toggle,
        disabled: isDisabled
      }, this.displayText), /*#__PURE__*/React.createElement("span", {
        className: "caret",
        dangerouslySetInnerHTML: {
          __html: INPUT_ARROW
        }
      }), isOpen && /*#__PURE__*/React.createElement(SelectMenu, _extends({
        isOpen: isOpen
      }, this.props, {
        value: value,
        $select: $select,
        canSelect: canSelect,
        onChange: this.onSelect,
        onMouseEnter: onMouseEnter,
        onMouseLeave: onMouseLeave,
        onClose: this.close
      })));
    }
  }, {
    key: "isDisabled",
    get: function get() {
      var _this$props2 = this.props,
          isDisabled = _this$props2.isDisabled,
          disabled = _this$props2.disabled;
      return isDisabled || disabled;
    }
  }, {
    key: "readOnly",
    get: function get() {
      return this.props.readOnly;
    }
  }, {
    key: "canSelect",
    get: function get() {
      var isDisabled = this.isDisabled,
          readOnly = this.readOnly;
      return !isDisabled && !readOnly;
    }
  }, {
    key: "displayText",
    get: function get() {
      var _this$props3 = this.props,
          optionList = _this$props3.optionList,
          placeholder = _this$props3.placeholder;
      var value = this.state.value;
      var group = optionList.find(function (g) {
        return isArray(g) && g.slice(0).some(function (o) {
          return checkOptionByValue(o, value);
        });
      });
      var option = (group || optionList).find(function (o) {
        return !isArray(o) && checkOptionByValue(o, value);
      });
      return option ? getOptionLabel(option) : placeholder;
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, _ref2) {
      var prevProps = _ref2.prevProps,
          value = _ref2.value;

      if (!isEqual(prevProps, props)) {
        return {
          prevProps: props,
          value: props.value
        };
      }

      return null;
    }
  }]);

  return WorkSpaceSelect;
}(PureComponent);

_defineProperty(WorkSpaceSelect, "propTypes", {
  size: PropTypes.oneOf(['regular', 'small']),
  theme: PropTypes.oneOf(['core', 'plain']),
  menuTheme: PropTypes.oneOf(['core', 'plain', 'check']),
  unstyled: PropTypes.bool,
  className: PropTypes.string,
  menuClassName: PropTypes.string,
  placeholder: PropTypes.string,
  optionList: PropTypes.arrayOf(PropTypes.oneOfType([// Regular options:
  PropTypes.node, PropTypes.shape({
    label: PropTypes.node,
    value: PropTypes.any,
    isDisabled: PropTypes.bool
  }), // Option groups:
  PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.node, PropTypes.shape({
    label: PropTypes.node,
    value: PropTypes.any,
    isDisabled: PropTypes.bool
  })]))])).isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  isDisabled: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func
});

_defineProperty(WorkSpaceSelect, "defaultProps", {
  size: 'regular',
  theme: 'plain',
  menuTheme: 'plain',
  className: '',
  menuClassName: '',
  placeholder: 'Choose one…',
  emptyMsg: 'Nothing to display…',
  optionList: [],
  isDisabled: false,
  onChange: function onChange() {
    return null;
  },
  onMouseEnter: function onMouseEnter() {
    return null;
  },
  onMouseLeave: function onMouseLeave() {
    return null;
  }
});
var SelectMenu = /*#__PURE__*/function (_PureComponent2) {
  _inherits(SelectMenu, _PureComponent2);

  var _super2 = _createSuper(SelectMenu);

  function SelectMenu() {
    var _this2;

    _classCallCheck(this, SelectMenu);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this2 = _super2.call.apply(_super2, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this2), "state", {
      isDownward: true
    });

    _defineProperty(_assertThisInitialized(_this2), "portal", preparePortal($menuRoot, 'SelectMenuPortal'));

    _defineProperty(_assertThisInitialized(_this2), "menuBaseRef", /*#__PURE__*/createRef());

    _defineProperty(_assertThisInitialized(_this2), "menuContainerRef", /*#__PURE__*/createRef());

    _defineProperty(_assertThisInitialized(_this2), "position", function (e) {
      var $select = _this2.props.$select;

      var _assertThisInitialize2 = _assertThisInitialized(_this2),
          $menuBase = _assertThisInitialize2.menuBaseRef.current,
          $menuContainer = _assertThisInitialize2.menuContainerRef.current;

      if (e) {
        var $target = get(e, 'target');
        if ($target && isElement($target) && $target.matches('.WorkspaceSelectMenu')) return;
      }

      var _positionMenu = positionMenu({
        $menuBase: $menuBase,
        $opener: $select,
        shouldSetMaxHeight: false,
        $menuContainer: $menuContainer
      }),
          isDownward = _positionMenu.isDownward;

      _this2.setState({
        isDownward: isDownward,
        isTransform: true
      });
    });

    _defineProperty(_assertThisInitialized(_this2), "onChange", function (e) {
      var onChange = _this2.props.onChange;
      var isDownward = _this2.state.isDownward;
      var $opt = e.currentTarget;
      var $menuBase = $opt.closest('.WorkspaceSelectMenu');

      if (!$opt || !$menuBase) {
        return _this2.onlose();
      }

      var _$opt$getBoundingClie = $opt.getBoundingClientRect(),
          topOf$opt = _$opt$getBoundingClie.top,
          bottomOf$opt = _$opt$getBoundingClie.bottom;

      var _$menuBase$getBoundin = $menuBase.getBoundingClientRect(),
          topOf$menuBase = _$menuBase$getBoundin.top,
          bottomOf$menuBase = _$menuBase$getBoundin.bottom;

      if ( // eslint-disable-next-line no-mixed-operators
      isDownward && topOf$opt >= topOf$menuBase || // eslint-disable-next-line no-mixed-operators
      !isDownward && bottomOf$opt <= bottomOf$menuBase) {
        if ($opt.classList.contains('title')) return;
        return onChange(e);
      }

      return _this2.onClose();
    });

    _defineProperty(_assertThisInitialized(_this2), "onClose", function () {
      var onClose = _this2.props.onClose;
      onClose();
    });

    _defineProperty(_assertThisInitialized(_this2), "onClickOutside", function (_ref3) {
      var target = _ref3.target;
      var $select = _this2.props.$select;
      var isOutsideMenu = !$menuRoot.contains(target);
      var closestLabel = target.closest('label');
      var isOwnLabel = closestLabel && closestLabel.contains($select);

      if (isOutsideMenu && !isOwnLabel) {
        _this2.onClose();
      }
    });

    return _this2;
  }

  _createClass(SelectMenu, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var $menuBase = this.menuBaseRef.current;
      preventScrollingPropagation($('.WorkspaceSelectMenu', $menuBase));
      this.position();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.portal) this.portal.remove();
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/createPortal(this.menu, this.portal);
    }
  }, {
    key: "menu",
    get: function get() {
      var _this3 = this;

      var _this$props4 = this.props,
          isOpen = _this$props4.isOpen,
          isDisabled = _this$props4.isDisabled,
          menuTheme = _this$props4.menuTheme,
          menuClassName = _this$props4.menuClassName,
          optionList = _this$props4.optionList,
          emptyMsg = _this$props4.emptyMsg,
          value = _this$props4.value,
          canSelect = _this$props4.canSelect,
          onMouseEnter = _this$props4.onMouseEnter,
          onMouseLeave = _this$props4.onMouseLeave;
      var _this$state2 = this.state,
          isDownward = _this$state2.isDownward,
          isTransform = _this$state2.isTransform;
      var isEmpty = optionList.length === 0;
      var klass = trimList(['WorkspaceSelectMenu', menuClassName, isTransform && 'is-open', isDownward ? 'is-downward' : 'is-upward', isDisabled && 'is-disabled', isEmpty && 'is-empty', canSelect ? 'can-select' : 'cant-select']);
      return /*#__PURE__*/React.createElement(StyledSelectMenu, {
        ref: this.menuBaseRef
      }, /*#__PURE__*/React.createElement("ul", {
        className: klass,
        ref: this.menuContainerRef
      }, isEmpty ? /*#__PURE__*/React.createElement("li", {
        className: "SelectOption empty-msg",
        role: "empty-msg"
      }, emptyMsg) : optionList.map(function (option, idx) {
        return isArray(option) ? /*#__PURE__*/React.createElement(Group, {
          key: idx,
          menuTheme: menuTheme,
          optionList: option,
          value: value,
          onChange: _this3.onChange,
          onMouseEnter: onMouseEnter,
          onMouseLeave: onMouseLeave
        }) : /*#__PURE__*/React.createElement(Option, {
          key: idx,
          menuTheme: menuTheme,
          isActive: checkOptionByValue(option, value),
          option: option,
          isDisabled: option.isDisabled,
          onChange: _this3.onChange,
          onMouseEnter: onMouseEnter,
          onMouseLeave: onMouseLeave
        });
      })), isOpen && /*#__PURE__*/React.createElement(EventListener, {
        target: document,
        onClick: this.onClickOutside
      }));
    }
  }]);

  return SelectMenu;
}(PureComponent);

_defineProperty(SelectMenu, "propTypes", _objectSpread(_objectSpread({}, WorkSpaceSelect.propTypes), {}, {
  isOpen: PropTypes.bool,
  canSelect: PropTypes.bool,
  onChange: PropTypes.func,
  onClose: PropTypes.func,
  $select: PropTypes.instanceOf(Element)
}));

_defineProperty(SelectMenu, "defaultProps", {
  isOpen: false,
  isTransform: false
});

function Group(_ref4) {
  var value = _ref4.value,
      _ref4$optionList = _toArray(_ref4.optionList),
      title = _ref4$optionList[0],
      optionList = _ref4$optionList.slice(1),
      menuTheme = _ref4.menuTheme,
      onChange = _ref4.onChange,
      onMouseEnter = _ref4.onMouseEnter,
      onMouseLeave = _ref4.onMouseLeave;

  return /*#__PURE__*/React.createElement("li", {
    className: "SelectGroup"
  }, title === 'HIDDELINE' ? null : title === 'DIVIDER' ? /*#__PURE__*/React.createElement("div", {
    className: "divider"
  }) : /*#__PURE__*/React.createElement(Ellipsis, {
    className: "title",
    onClick: onChange
  }, title), /*#__PURE__*/React.createElement("ul", null, optionList.map(function (option, idx) {
    return /*#__PURE__*/React.createElement(Option, {
      key: idx,
      menuTheme: menuTheme,
      option: option,
      isActive: checkOptionByValue(option, value),
      isDisabled: option.isDisabled,
      onChange: onChange,
      onMouseEnter: onMouseEnter,
      onMouseLeave: onMouseLeave
    });
  })));
}
Group.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  optionList: PropTypes.array,
  onChange: PropTypes.func,
  menuTheme: PropTypes.string,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func
};
function Option(_ref5) {
  var option = _ref5.option,
      isActive = _ref5.isActive,
      isDisabled = _ref5.isDisabled,
      menuTheme = _ref5.menuTheme,
      onChange = _ref5.onChange,
      onMouseEnter = _ref5.onMouseEnter,
      onMouseLeave = _ref5.onMouseLeave;
  var className = trimList(['SelectOption', isActive && 'is-active', isDisabled && 'is-disabled']);
  var label = getOptionLabel(option);
  var value = getOptionValue(option);
  return /*#__PURE__*/React.createElement("li", {
    role: "option",
    "data-value": value,
    className: className,
    onClick: isDisabled ? undefined : onChange,
    onMouseEnter: onMouseEnter,
    onMouseLeave: onMouseLeave
  }, /*#__PURE__*/React.createElement(Ellipsis, null, label));
}
Option.propTypes = {
  isActive: PropTypes.bool,
  option: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),
  isDisabled: PropTypes.bool,
  menuTheme: PropTypes.string,
  onChange: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func
};

export default WorkSpaceSelect;
export { $menuRoot, Group, Option, SelectMenu };
