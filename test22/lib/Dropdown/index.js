import isBoolean from 'lodash/isBoolean';
import isEqual from 'lodash/isEqual';
import React, { isValidElement, cloneElement, PureComponent, createRef } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import EventListener, { withOptions } from 'react-event-listener';
import { trimList, preparePortal, $, preventScrollingPropagation, SVG } from '../util';
import styled from 'styled-components';

var MARGIN = 9;
/**
 * Position menu according to where its opener is and return
 * corresponding information.
 *
 * @param {Object}
 *  @prop {Element} $opener
 *  @prop {Element} $menuBase
 *  @prop {String} [menuX="left"]
 *  @prop {String} [menuY="bottom"]
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
      _ref$menuX = _ref.menuX,
      _ref$menuY = _ref.menuY,
      menuY = _ref$menuY === void 0 ? 'bottom' : _ref$menuY,
      _ref$menuBaseStyle = _ref.menuBaseStyle,
      menuBaseStyle = _ref$menuBaseStyle === void 0 ? {} : _ref$menuBaseStyle,
      _ref$inflexible = _ref.inflexible,
      inflexible = _ref$inflexible === void 0 ? false : _ref$inflexible,
      _ref$shouldSetMaxHeig = _ref.shouldSetMaxHeight,
      shouldSetMaxHeight = _ref$shouldSetMaxHeig === void 0 ? false : _ref$shouldSetMaxHeig;
  if (!$opener || !$menuBase) return;
  var $menu = $menuBase.querySelector('*');
  var result = {
    styleFor$menuBase: {},
    styleFor$menu: {}
  };

  var setStyleFor$menuBase = function setStyleFor$menuBase(style) {
    return Object.assign(result.styleFor$menuBase, style);
  };

  var setStyleFor$menu = function setStyleFor$menu(style) {
    return Object.assign(result.styleFor$menu, style);
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
  var maxY = hOf$win - 10; // Point deciding the position for the menu:

  var ratio = menuY === 'top' ? 1 / 3 : 2 / 3;
  var decidingPoint = hOf$win * ratio; // Y middle line of the $opener:

  var midOf$opener = top + hOf$opener / 2;
  var bottomOf$opener = top + hOf$opener; // Slide downward:

  if ((inflexible && menuY === 'bottom' || !inflexible && decidingPoint >= midOf$opener) && bottomOf$opener + hOf$menu + MARGIN < hOf$win) {
    result.isDownward = true; // If the height of the menu is taller than that of space downward:

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
  return result;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  position: fixed;\n  z-index: 1100;\n  pointer-events: none;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  position: absolute;\n  margin: 0.25em 0;\n  width: -moz-fit-content;\n  width: -webkit-fit-content;\n  width: fit-content;\n  min-width: 7em;\n  font-size: 12px;\n  filter: drop-shadow(0 2px 10px rgba(39,54,78,0.12)) drop-shadow(4px 12px 40px rgba(39,54,78,0.12));\n  pointer-events: none;\n  opacity: 0;\n  transition: 0.2s ease-in-out;\n  transition-property: transform, opacity;\n  transform-origin: 50% 0;\n  transform: scale(0.9);\n  &.is-open {\n    pointer-events: initial;\n    opacity: 1;\n    transform: scale(1);\n  }\n  &.x-left {\n    left: 0;\n  }\n  &.x-right {\n    left: initial;\n    right: 0;\n  }\n  &.x-center {\n    left: 50%;\n    transform: scale(0.9) translateX(-50%);\n    &.is-open {\n    transform: scale(1) translateX(-50%);\n    }\n  }\n\n  &.is-downward {\n    top: 100%;\n    bottom: initial;\n  }\n  &.is-upward {\n    top: initial;\n    bottom: 100%;\n  }\n  &.arrowed {\n    margin-top: 0.75em;\n    margin-bottom: 0.75em;\n    &.x-left.x-arrow-based {\n      left: 50%;\n      margin-left: -14px;\n    }\n    &.x-right.x-arrow-based {\n      left: initial;\n      right: 50%;\n      margin-right: -14px;\n    }\n  }\n  .arrow {\n    position: absolute;\n    top: 0;\n    left: calc(50% - 0.5em);\n    width: 1em;\n    height: 0.375em;\n    font-size: 14px;\n    line-height: 0;\n    fill: currentColor;\n    fill-rule: evenodd;\n    color: #fff;\n    svg {\n      position: absolute;\n      width: auto;\n      height: 5px;\n      transform: translateY(-100%);\n    }\n  }\n\n  &.dark .arrow {\n    color: rgba(30, 41, 46, .9);\n  }\n\n  &.x-left .arrow {\n    left: 0.5em;\n    right: initial;\n  }\n  &.x-right .arrow {\n    left: initial;\n    right: 0.5em;\n  }\n  &.is-upward .arrow {\n    transform: rotate(180deg);\n    top: initial;\n    bottom: 0;\n  }\n\n  .content {\n    padding: 0.75em 0.5em;\n    min-height: 32px;\n    background-color: #fff;\n    border-radius: 4px;\n  }\n  &.dark .content {\n    background-color: rgba(30, 41, 46, .9);\n    color: #fff;\n  }\n\n  ul.MenuList {\n    margin: 0;\n    padding: 0;\n    list-style: none;\n    text-align: center;\n    color: #5b6b73;\n    li {\n      line-height: 32px;\n      border-radius: 2px;\n      cursor: pointer;\n      &:not(.is-disabled):hover {\n        background-color: #f6f7f8;\n      }\n      &.is-active {\n        color: #298df8;\n      }\n      &.is-disabled {\n        cursor: not-allowed;\n        opacity: 0.5;\n      }\n    }\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  &.is-disabled {\n    opacity: 0.5;\n    > button {\n      cursor: not-allowed;\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
var StyledDropDown = styled.label(_templateObject());
var StyledDropDownMenu = styled.div(_templateObject2());
var StyledDropDownBase = styled.div(_templateObject3());

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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
var MENU_ROOT_ID = 'IBOT_DROPDOWN_MENU_ROOT';
var $menuRoot = document.getElementById(MENU_ROOT_ID) || Object.assign(document.createElement('div'), {
  id: MENU_ROOT_ID
});
var $body = document.body;

if (!$body.contains($menuRoot)) {
  $body.appendChild($menuRoot);
}

var Dropdown = /*#__PURE__*/function (_PureComponent) {
  _inherits(Dropdown, _PureComponent);

  var _super = _createSuper(Dropdown);

  function Dropdown() {
    var _this;

    _classCallCheck(this, Dropdown);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      prevProps: _this.props,
      isOpen: _this.props.isOpen,
      $opener: null,
      currentMenuListItemIdx: _this.props.currentMenuListItemIdx
    });

    _defineProperty(_assertThisInitialized(_this), "leaveTimeoutList", []);

    _defineProperty(_assertThisInitialized(_this), "toggle", function (willBeOpen) {
      return _this.setState({
        isOpen: isBoolean(willBeOpen) ? willBeOpen : !_this.state.isOpen
      });
    });

    _defineProperty(_assertThisInitialized(_this), "open", function () {
      return _this.toggle(true);
    });

    _defineProperty(_assertThisInitialized(_this), "close", function () {
      return _this.toggle(false);
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseEnter", function () {
      var shouldOpenOnHover = _this.props.shouldOpenOnHover;
      if (!shouldOpenOnHover) return;
      clearTimeout(_this.closeTimeout);
      Object.assign(_assertThisInitialized(_this), {
        hoverTimeout: setTimeout(_this.open, _this.props.hoverDelay)
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseLeave", function () {
      var shouldOpenOnHover = _this.props.shouldOpenOnHover;

      if (shouldOpenOnHover) {
        clearTimeout(_this.hoverTimeout);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseMove", function (_ref) {
      var clientX = _ref.clientX,
          clientY = _ref.clientY;
      var _this$props = _this.props,
          shouldOpenOnHover = _this$props.shouldOpenOnHover,
          hoverDelay = _this$props.hoverDelay,
          hoverCloseDelay = _this$props.hoverCloseDelay;
      var $opener = _this.state.$opener;
      if (!shouldOpenOnHover) return;
      clearTimeout(_this.hoverTimeout);
      var $on = document.elementFromPoint(clientX, clientY);
      var isOutsideOpener = !$opener.contains($on);
      var isOutsideMenu = !$on.closest('.DropdownMenu');

      if (!isOutsideMenu) {
        _this.leaveTimeoutList.map(clearTimeout);

        Object.assign(_assertThisInitialized(_this), {
          leaveTimeoutList: []
        });
      } else if (isOutsideOpener && isOutsideMenu) {
        _this.leaveTimeoutList.push(setTimeout(_this.close, hoverCloseDelay !== undefined ? hoverCloseDelay : Math.max(hoverDelay, 300)));
      }
    });

    _defineProperty(_assertThisInitialized(_this), "set$opener", function ($opener) {
      return _this.setState({
        $opener: $opener
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onSelect", function (_ref2) {
      var currentTarget = _ref2.currentTarget;
      var _this$props2 = _this.props,
          menuList = _this$props2.menuList,
          onSelect = _this$props2.onSelect,
          shouldCloseOnSelect = _this$props2.shouldCloseOnSelect;
      if (typeof onSelect !== 'function') return;
      var idx = currentTarget.dataset.idx;
      var item = menuList[idx];
      var value = typeof item === 'string' ? item : item && item.value;
      onSelect(idx, value);

      _this.setState({
        currentMenuListItemIdx: idx
      });

      if (shouldCloseOnSelect) {
        _this.close();
      }
    });

    return _this;
  }

  _createClass(Dropdown, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(_, _ref3) {
      var wasOpen = _ref3.isOpen;
      var _this$props3 = this.props,
          onOpen = _this$props3.onOpen,
          onClose = _this$props3.onClose,
          onToggle = _this$props3.onToggle;
      var isOpen = this.state.isOpen;

      if (wasOpen !== isOpen) {
        if (isOpen) {
          onOpen();
          onToggle(true);
        } else {
          onClose();
          onToggle(false);
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          className = _this$props4.className,
          opener = _this$props4.opener,
          openerType = _this$props4.openerType,
          openerClassName = _this$props4.openerClassName,
          shouldCloseOnClickOutside = _this$props4.shouldCloseOnClickOutside;
      var _this$state = this.state,
          isOpen = _this$state.isOpen,
          $opener = _this$state.$opener,
          currentMenuListItemIdx = _this$state.currentMenuListItemIdx;
      var isDisabled = this.props.isDisabled || this.props.disabled;
      var klass = trimList(['Dropdown', isOpen && 'is-open', isDisabled && 'is-disabled', className]);
      var openerAttr = {
        onClick: this.toggle,
        onMouseEnter: this.onMouseEnter,
        onMouseLeave: this.onMouseLeave,
        disabled: isDisabled,
        className: openerClassName
      };
      return /*#__PURE__*/React.createElement(StyledDropDown, {
        ref: this.set$opener,
        className: klass
      }, openerType !== 'button' && /*#__PURE__*/isValidElement(opener) ? /*#__PURE__*/cloneElement(opener, openerAttr) : /*#__PURE__*/React.createElement("button", _extends({
        type: "button"
      }, openerAttr), opener), /*#__PURE__*/React.createElement(DropdownMenu, _extends({}, this.props, {
        isOpen: isOpen,
        $opener: $opener,
        onSelect: this.onSelect,
        onClose: this.close,
        shouldCloseOnClickOutside: shouldCloseOnClickOutside,
        currentMenuListItemIdx: currentMenuListItemIdx
      })), isOpen && /*#__PURE__*/React.createElement(EventListener, {
        target: document,
        onMouseMove: this.onMouseMove
      }));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, _ref4) {
      var prevProps = _ref4.prevProps,
          isOpen = _ref4.isOpen;

      if (!isEqual(props, prevProps)) {
        if (isBoolean(props.isOpen)) {
          return {
            prevProps: props,
            isOpen: props.isOpen
          };
        }

        return {
          prevProps: props
        };
      }

      return null;
    }
  }]);

  return Dropdown;
}(PureComponent);

_defineProperty(Dropdown, "positionMenu", positionMenu);

_defineProperty(Dropdown, "propTypes", {
  isOpen: PropTypes.bool,
  mode: PropTypes.oneOf(['light', 'dark']),
  opener: PropTypes.node,
  openerType: PropTypes.oneOf(['button', 'custom']),
  className: PropTypes.string,
  portalClassName: PropTypes.string,
  menuBaseClassName: PropTypes.string,
  openerClassName: PropTypes.string,
  menuClassName: PropTypes.string,
  menuBaseStyle: PropTypes.shape({
    top: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number
  }),
  menu: PropTypes.node,
  menuList: PropTypes.arrayOf(PropTypes.oneOfType([// Regular options:
  PropTypes.node, PropTypes.shape({
    label: PropTypes.node,
    value: PropTypes.any,
    isDisabled: PropTypes.bool
  })])),
  currentMenuListItemIdx: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  shouldPreventScrollingPropagation: PropTypes.bool,
  shouldOpenOnHover: PropTypes.bool,
  shouldCloseOnClickOutside: PropTypes.bool,
  hoverDelay: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  hoverCloseDelay: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  arrowed: PropTypes.bool,
  inflexible: PropTypes.bool,
  menuX: PropTypes.oneOf(['left', 'center', 'right']),
  menuY: PropTypes.oneOf(['top', 'bottom']),
  menuBasedX: PropTypes.bool,
  isDisabled: PropTypes.bool,
  disabled: PropTypes.bool,
  onSelect: PropTypes.func,
  shouldCloseOnSelect: PropTypes.bool,
  onOpen: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired
});

_defineProperty(Dropdown, "defaultProps", {
  arrowed: false,
  openerType: 'button',
  mode: 'light',
  shouldPreventScrollingPropagation: true,
  shouldCloseOnSelect: true,
  shouldOpenOnHover: false,
  shouldCloseOnClickOutside: true,
  hoverDelay: 200,
  menuX: 'center',
  menuY: 'bottom',
  inflexible: false,
  menuBasedX: false,
  onOpen: function onOpen() {
    return null;
  },
  onClose: function onClose() {
    return null;
  },
  onToggle: function onToggle() {
    return null;
  }
});

var DropdownMenu = /*#__PURE__*/function (_PureComponent2) {
  _inherits(DropdownMenu, _PureComponent2);

  var _super2 = _createSuper(DropdownMenu);

  function DropdownMenu() {
    var _this2;

    _classCallCheck(this, DropdownMenu);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this2 = _super2.call.apply(_super2, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this2), "state", {
      isDownward: _this2.props.position === 'bottom'
    });

    _defineProperty(_assertThisInitialized(_this2), "portal", preparePortal($menuRoot, trimList(['DropdownMenuPortal', _this2.props.portalClassName])));

    _defineProperty(_assertThisInitialized(_this2), "menuBaseRef", /*#__PURE__*/createRef());

    _defineProperty(_assertThisInitialized(_this2), "onResizeWindow", function () {
      return _this2.props.isOpen && _this2.position();
    });

    _defineProperty(_assertThisInitialized(_this2), "onClickOutside", function (_ref5) {
      var target = _ref5.target;
      var _this2$props = _this2.props,
          $opener = _this2$props.$opener,
          onClose = _this2$props.onClose,
          shouldCloseOnClickOutside = _this2$props.shouldCloseOnClickOutside;
      if (!shouldCloseOnClickOutside) return;
      var isOutsideMenu = !$menuRoot.contains(target);
      var closestLabel = target.closest('label');
      var isOwnLabel = closestLabel && closestLabel.contains($opener);
      var hasSelectMenuOpen = !!$('.SelectMenu.is-open');

      if (isOutsideMenu && !isOwnLabel && !hasSelectMenuOpen) {
        onClose();
      }
    });

    _defineProperty(_assertThisInitialized(_this2), "position", function () {
      var _this2$props2 = _this2.props,
          $opener = _this2$props2.$opener,
          menuX = _this2$props2.menuX,
          menuY = _this2$props2.menuY,
          menuBaseStyle = _this2$props2.menuBaseStyle,
          inflexible = _this2$props2.inflexible;

      var _assertThisInitialize = _assertThisInitialized(_this2),
          $menuBase = _assertThisInitialize.menuBaseRef.current;

      var _positionMenu = positionMenu({
        $menuBase: $menuBase,
        $opener: $opener,
        menuX: menuX,
        menuY: menuY,
        menuBaseStyle: menuBaseStyle,
        inflexible: inflexible
      }),
          isDownward = _positionMenu.isDownward;

      _this2.setState({
        isDownward: isDownward
      });
    });

    return _this2;
  }

  _createClass(DropdownMenu, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props5 = this.props,
          isOpen = _this$props5.isOpen,
          shouldPreventScrollingPropagation = _this$props5.shouldPreventScrollingPropagation;
      var $menuBase = this.menuBaseRef.current;

      if (isOpen) {
        setTimeout(this.position);
      }

      if (shouldPreventScrollingPropagation) {
        preventScrollingPropagation($('.content', $menuBase));
      }

      window.addEventListener('resize', this.onResizeWindow);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(_ref6) {
      var wasOpen = _ref6.isOpen;
      var isOpen = this.props.isOpen; // Set up the position of the <DropdownMenu> once opened:

      if (!wasOpen && isOpen) {
        this.position();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.portal) this.portal.remove();
      window.removeEventListener('resize', this.onResizeWindow);
    }
  }, {
    key: "render",
    value: function render() {
      var portal = this.portal,
          menu = this.menu;
      return /*#__PURE__*/createPortal(menu, portal);
    }
  }, {
    key: "menu",
    get: function get() {
      var _this$props6 = this.props,
          isOpen = _this$props6.isOpen,
          mode = _this$props6.mode,
          menuBaseClassName = _this$props6.menuBaseClassName,
          menuClassName = _this$props6.menuClassName,
          menu = _this$props6.menu,
          menuList = _this$props6.menuList,
          arrowed = _this$props6.arrowed,
          menuX = _this$props6.menuX,
          menuY = _this$props6.menuY,
          menuBasedX = _this$props6.menuBasedX,
          currentMenuListItemIdx = _this$props6.currentMenuListItemIdx,
          onSelect = _this$props6.onSelect;
      var isDownward = this.state.isDownward;
      var klass = trimList(['DropdownMenu', mode, isOpen && 'is-open', isDownward ? 'is-downward' : 'is-upward', "x-".concat(menuX), arrowed && "arrowed ".concat(menuBasedX ? 'x-menu-based' : 'x-arrow-based'), menuClassName]);
      return /*#__PURE__*/React.createElement(StyledDropDownBase, {
        ref: this.menuBaseRef,
        className: trimList(['DropdownMenuBase', menuBaseClassName])
      }, /*#__PURE__*/React.createElement(StyledDropDownMenu, {
        className: klass
      }, arrowed && /*#__PURE__*/React.createElement("span", {
        className: "arrow",
        dangerouslySetInnerHTML: {
          __html: SVG.DROPDOWN_ARROW
        }
      }), /*#__PURE__*/React.createElement("div", {
        className: "content"
      }, menuList ? /*#__PURE__*/React.createElement("ul", {
        className: "MenuList"
      }, menuList.map(function (it, idx) {
        return /*#__PURE__*/React.createElement("li", {
          key: idx,
          role: "option",
          "data-idx": idx,
          className: trimList([it.isDisabled && 'is-disabled', idx === Number(currentMenuListItemIdx) && 'is-active']),
          onClick: it.isDisabled ? undefined : onSelect
        }, it.label || it);
      })) : menu), isOpen && /*#__PURE__*/React.createElement(EventListener, {
        target: document,
        onClick: this.onClickOutside
      }), isOpen && /*#__PURE__*/React.createElement(EventListener, {
        target: document,
        onScroll: withOptions(this.position, {
          capture: true
        })
      })));
    }
  }]);

  return DropdownMenu;
}(PureComponent);

_defineProperty(DropdownMenu, "propTypes", _objectSpread(_objectSpread({}, Dropdown.propTypes), {}, {
  isOpen: PropTypes.bool,
  $opener: PropTypes.instanceOf(Element),
  onSelect: PropTypes.func,
  onClose: PropTypes.func
}));

export default Dropdown;
export { positionMenu };
