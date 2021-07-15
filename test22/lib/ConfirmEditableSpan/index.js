import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Ellipsis from '../Ellipsis';
import styled from 'styled-components';

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var classnames = createCommonjsModule(function (module) {
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg) && arg.length) {
				var inner = classNames.apply(null, arg);
				if (inner) {
					classes.push(inner);
				}
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if ( module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else {
		window.classNames = classNames;
	}
}());
});

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  width: 100%;\n  height: 24px;\n  line-height: 22px;\n  overflow: hidden;\n  border-top: 1px solid transparent;\n  border-bottom: 1px solid transparent;\n\n  &.is-editing {\n    width: 100%;\n    display: flex;\n    align-items: stretch;\n    border-bottom: 1px solid #f55d54;\n\n    textarea {\n      resize: none;\n      border: none;\n      outline: none;\n      width: 100%;\n      height: 100%;\n      background: transparent;\n      color: #525e71;\n      white-space: nowrap;\n      overflow: hidden;\n\n      &::selection {\n        background: color(#f55d54 a(0.2));\n      }\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
/**
 * chrome bug: 此处textarea调用focus会导致整个页面错乱,
 * 需要使用一系列hack定位来避免此异常, 很不稳定
 * 解决: 不focus 直接select必须使用left和top对该元素进行定位, 否则将在focus时使页面错乱
 */
// TODO: 代码优化

var StyledEditableSpan = styled.div(_templateObject());

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

var ConfirmEditableSpan = /*#__PURE__*/function (_PureComponent) {
  _inherits(ConfirmEditableSpan, _PureComponent);

  var _super = _createSuper(ConfirmEditableSpan);

  function ConfirmEditableSpan(props) {
    var _this;

    _classCallCheck(this, ConfirmEditableSpan);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "handleChange", function (value) {
      return _this.setState({
        value: value
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleBlur", function () {
      if (_this.state.value === '') {
        _this.setState({
          value: _this.initialValue
        });
      }

      _this.props.onConfirm(_this.state.value);
    });

    _this.state = {
      value: props.value
    };
    _this.initialValue = props.value;
    return _this;
  }

  _createClass(ConfirmEditableSpan, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          isEditing = _this$props.isEditing,
          className = _this$props.className,
          isShowToolTips = _this$props.isShowToolTips;
      var value = this.state.value;
      return /*#__PURE__*/React.createElement(EditableSpan, {
        value: value,
        className: className,
        editing: isEditing,
        onBlur: this.handleBlur,
        onChange: this.handleChange,
        isShowToolTips: isShowToolTips
      });
    }
  }]);

  return ConfirmEditableSpan;
}(PureComponent);

_defineProperty(ConfirmEditableSpan, "propTypes", {
  value: PropTypes.string,
  className: PropTypes.string,
  isEditing: PropTypes.bool,
  onConfirm: PropTypes.func,
  isShowToolTips: PropTypes.bool
});

_defineProperty(ConfirmEditableSpan, "defaultProps", {
  isShowToolTips: false
});

var EditableSpan = /*#__PURE__*/function (_PureComponent2) {
  _inherits(EditableSpan, _PureComponent2);

  var _super2 = _createSuper(EditableSpan);

  function EditableSpan() {
    var _this2;

    _classCallCheck(this, EditableSpan);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this2 = _super2.call.apply(_super2, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this2), "setElementRef", function (ref) {
      return _this2.textarea = ref;
    });

    _defineProperty(_assertThisInitialized(_this2), "handleFocus", function () {
      _this2.props.onFocus();
    });

    _defineProperty(_assertThisInitialized(_this2), "handleChange", function (e) {
      var onChange = _this2.props.onChange;
      var value = e.target.value;
      onChange(value);
    });

    _defineProperty(_assertThisInitialized(_this2), "handleBlur", function () {
      _this2.props.onBlur();
    });

    _defineProperty(_assertThisInitialized(_this2), "handleKeyDown", function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();

        _this2.handleBlur();
      } else if (e.key === 'Escape') {
        _this2.props.onChange(_this2.cacheValue);

        _this2.cacheValue = null;

        _this2.handleBlur();
      }
    });

    return _this2;
  }

  _createClass(EditableSpan, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // 新创建的页面直接select
      if (this.props.editing) {
        this.cacheValue = this.props.value;
        this.textarea.select();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      // 如果是首次进入编辑状态, focus + select
      if (!prevProps.editing && this.props.editing) {
        /**
         * chrome bug: 此处focus然后select textarea将导致界面布局异常
         * 解决: 跳过focus()直接select()
         */
        this.cacheValue = this.props.value;
        this.textarea.select();
      }
    }
  }, {
    key: "handleStopPropagation",
    value: function handleStopPropagation(e) {
      e.stopPropagation();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          editing = _this$props2.editing,
          value = _this$props2.value,
          className = _this$props2.className,
          isShowToolTips = _this$props2.isShowToolTips;
      return editing ? /*#__PURE__*/React.createElement(StyledEditableSpan, {
        className: classnames('is-editing', className),
        onClick: this.handleStopPropagation
      }, /*#__PURE__*/React.createElement("textarea", {
        ref: this.setElementRef,
        value: value,
        onFocus: this.handleFocus,
        onChange: this.handleChange,
        onBlur: this.handleBlur,
        onKeyDown: this.handleKeyDown
      })) : /*#__PURE__*/React.createElement(StyledEditableSpan, {
        className: className
      }, isShowToolTips ? /*#__PURE__*/React.createElement(Ellipsis, {
        arrowed: false
      }, value) : value);
    }
  }]);

  return EditableSpan;
}(PureComponent);

_defineProperty(EditableSpan, "propTypes", {
  editing: PropTypes.bool,
  value: PropTypes.string,
  className: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  isShowToolTips: PropTypes.bool
});

_defineProperty(EditableSpan, "defaultProps", {
  onFocus: function onFocus() {},
  onChange: function onChange() {},
  isShowToolTips: false
});

export default ConfirmEditableSpan;
