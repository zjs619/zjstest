import React, { PureComponent } from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import { preparePortal, trimList, $ } from '../util';
import styled, { createGlobalStyle } from 'styled-components';
import SVG from '../svg';

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  .ModalPortal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    z-index: 1050;\n    padding: 3rem 1.5rem;\n    width: 100vw;\n    min-width: 64rem;\n    height: auto;\n    min-height: 100vh;\n  }\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n  height: 60px;\n  margin-top: 0;\n  line-height: 1;\n  background: #F7F7F7;\n  padding-right: 16px;\n  bottom: 0;\n  width: 100%;\n  font-family: PingFangSC-Regular,serif;\n\n  & .cancel-btn {\n    padding: 0px 1em;\n    min-width: 5.25rem;\n    height: 32px;\n    border-radius: 2px;\n    font-size: 14px;\n    text-align: center;\n    line-height: 22px;\n    background: #fff;\n    border: 1px solid #c8cdd0;\n    color: #415058;\n    margin-right: 10px;\n    cursor: pointer;\n    transition: all 0.2s ease-out 0s;\n    &:hover{\n      background-color: #8d9ea7;\n      border: 1px solid #7d8694;\n      color: #fff;\n    }\n  }\n\n  & .confirm-btn {\n    background: #ff6161;\n    border-radius: 2px;\n    font-size: 14px;\n    color: #fff;\n    text-align: center;\n    line-height: 22px;\n    height: 32px;\n    min-width: 7rem;\n    margin-right: 0.5em;\n    padding: 0px 1em;\n    cursor: pointer;\n    transition: all 0.2s ease-out 0s;\n    border-color: transparent;\n    &:hover{\n      background-color: #e04c4c;\n    }\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  position: relative;\n  margin: 15vh auto 3rem;\n  height: -moz-fit-content;\n  height: -webkit-fit-content;\n  height: fit-content;\n  min-height: 9.5rem;\n  width: 31.25rem;\n  font-size: 0.875rem;\n  background-color: #fff;\n  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.1);\n  border-radius: 1px;\n  color: #5b6b73;\n  cursor: initial;\n  transition: all 0.2s ease-out;\n\n  &.is-v-centered {\n    margin: 3rem auto;\n  }\n\n  &.fade-enter, &.fade-appear{\n    opacity: 0;\n    transform: translateY(-50vh);\n  }\n\n  &.fade-exit-active {\n    opacity: 0;\n    transform: translateY(-50vh);\n  }\n\n  .header {\n    position: relative;\n    display: flex;\n    align-items: center;\n    height: 60px;\n    background: #FFFFFF;\n    border-bottom: 1px solid #E8E8E8;\n    padding: 0 1.5em;\n\n    .close-btn {\n      margin-left: auto;\n      font-size: 1em;\n      color: #8d9ea7;\n      transition: all 0.2s ease-in;\n      &:hover {\n        color: #415058;;\n        transition-delay: 0.1s;\n      }\n    }\n  }\n\n  .content {\n    padding: 30px 20px 35px;\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  width: 100vw;\n  height: 100vh;\n  transition: all 0.2s ease-out;\n  background-color: rgba(0, 0, 0, 0.4);\n\n  .mask-enter {\n    opacity: 0;\n  }\n\n  .mask-exit-active {\n    opacity: 0;\n  }\n\n  \n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
var StyledMask = styled.div(_templateObject());
var StyledModal = styled.div(_templateObject2());
var StyledFooter = styled.footer(_templateObject3());
var StyledPortal = createGlobalStyle(_templateObject4());

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
var MODAL_PORTAL_CLASS = 'ModalPortal';
var MODAL_ROOT_ID = 'IBOT_MODAL_ROOT';
var $body = document.body;
var $modalRoot = document.getElementById(MODAL_ROOT_ID) || Object.assign(document.createElement('div'), {
  id: MODAL_ROOT_ID
});

if (!$body.contains($modalRoot)) {
  $body.appendChild($modalRoot);
}

var stopPropagation = function stopPropagation(e) {
  return e.stopPropagation();
};

var Modal = /*#__PURE__*/function (_PureComponent) {
  _inherits(Modal, _PureComponent);

  var _super = _createSuper(Modal);

  function Modal() {
    var _this;

    _classCallCheck(this, Modal);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "portal", preparePortal($modalRoot, trimList([MODAL_PORTAL_CLASS, _this.props.portalClassName])));

    _defineProperty(_assertThisInitialized(_this), "close", function () {
      var _this$props = _this.props,
          onClose = _this$props.onClose,
          timeout = _this$props.timeout;
      onClose();
      setTimeout(function () {
        return _this.portal.remove();
      }, timeout);
    });

    _defineProperty(_assertThisInitialized(_this), "open", function () {
      var _this$props2 = _this.props,
          isOpen = _this$props2.isOpen,
          onOpen = _this$props2.onOpen;

      if (isOpen) {
        onOpen();
        $modalRoot.appendChild(_this.portal);
      } // // Reassign Y position of the modal:


      _this.positionY();
    });

    _defineProperty(_assertThisInitialized(_this), "onConfirm", function () {
      var _this$props3 = _this.props,
          onConfirm = _this$props3.onConfirm,
          shouldCloseOnAction = _this$props3.shouldCloseOnAction,
          isConfirmDisabled = _this$props3.isConfirmDisabled;

      if (typeof onConfirm === 'function' && !isConfirmDisabled) {
        onConfirm();
      }

      if (shouldCloseOnAction) {
        _this.close();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onCancel", function () {
      var _this$props4 = _this.props,
          onCancel = _this$props4.onCancel,
          shouldCloseOnAction = _this$props4.shouldCloseOnAction,
          isCancelDisabled = _this$props4.isCancelDisabled;

      if (typeof onCancel === 'function' && !isCancelDisabled) {
        onCancel();
      }

      if (shouldCloseOnAction) {
        _this.close();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "positionY", function () {
      return setTimeout(function () {
        var $modal = $('.TransitionModal', _this.portal);
        if (!$modal) return;
        var _window = window,
            vh = _window.innerHeight;
        var h = $modal.offsetHeight;
        var action = vh <= h || (vh - h) / 2 < vh * 0.2 ? 'add' : 'remove';
        $modal.classList[action]('is-v-centered');
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onClickMask", function (e) {
      stopPropagation(e);
      var onClose = _this.props.onClose;

      if (onClose) {
        _this.close();
      }
    });

    return _this;
  }

  _createClass(Modal, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var isOpen = this.props.isOpen;
      if (isOpen) this.open();
      window.addEventListener('resize', this.positionY);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(_ref) {
      var wasOpen = _ref.isOpen;
      var isOpen = this.props.isOpen;

      if (!wasOpen && isOpen) {
        this.open();
      } else if (wasOpen && !isOpen) {
        this.close();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.portal) this.portal.remove();
      window.removeEventListener('resize', this.positionY);
    }
  }, {
    key: "renderModalDOM",
    value: function renderModalDOM() {
      var _this$props5 = this.props,
          children = _this$props5.children,
          isOpen = _this$props5.isOpen,
          timeout = _this$props5.timeout,
          className = _this$props5.className,
          maskClassName = _this$props5.maskClassName,
          title = _this$props5.title,
          canClose = _this$props5.canClose,
          isCancelDisabled = _this$props5.isCancelDisabled,
          cancelText = _this$props5.cancelText,
          canCloseOnClickMask = _this$props5.canCloseOnClickMask,
          isConfirmDisabled = _this$props5.isConfirmDisabled,
          confirmText = _this$props5.confirmText,
          onConfirm = _this$props5.onConfirm,
          onCancel = _this$props5.onCancel;
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(StyledPortal, null), /*#__PURE__*/React.createElement(CSSTransition, {
        "in": isOpen,
        classNames: "mask",
        timeout: timeout,
        unmountOnExit: true
      }, /*#__PURE__*/React.createElement(StyledMask, {
        className: trimList(['TransitionModalMask', maskClassName]),
        onClick: canCloseOnClickMask ? this.onClickMask : null
      })), /*#__PURE__*/React.createElement(CSSTransition, {
        "in": isOpen,
        classNames: "fade",
        timeout: timeout,
        unmountOnExit: true,
        appear: true
      }, /*#__PURE__*/React.createElement(StyledModal, {
        className: trimList(['TransitionModal', className]),
        onClick: stopPropagation
      }, /*#__PURE__*/React.createElement("header", {
        className: "header"
      }, title, canClose && /*#__PURE__*/React.createElement("button", {
        className: "close-btn",
        onClick: this.close
      }, /*#__PURE__*/React.createElement(SVG, {
        name: "times",
        label: "Close the Modal"
      }))), /*#__PURE__*/React.createElement("div", {
        className: "content"
      }, children), /*#__PURE__*/React.createElement(StyledFooter, null, onCancel && /*#__PURE__*/React.createElement("button", {
        className: "cancel-btn",
        onClick: this.onCancel,
        disabled: isCancelDisabled
      }, cancelText), onConfirm && /*#__PURE__*/React.createElement("button", {
        className: "confirm-btn",
        onClick: this.onConfirm,
        disabled: isConfirmDisabled
      }, confirmText)))));
    }
  }, {
    key: "render",
    value: function render() {
      var isOpen = this.props.isOpen;
      return isOpen && /*#__PURE__*/createPortal(this.renderModalDOM(), this.portal);
    }
  }]);

  return Modal;
}(PureComponent);

_defineProperty(Modal, "propTypes", {
  isOpen: PropTypes.bool,
  children: PropTypes.node,
  timeout: PropTypes.number,
  title: PropTypes.node,
  className: PropTypes.string,
  maskClassName: PropTypes.string,
  portalClassName: PropTypes.string,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  onToggle: PropTypes.func,
  canClose: PropTypes.bool,
  canCloseOnClickMask: PropTypes.bool,
  shouldCloseOnAction: PropTypes.bool,
  canCloseOnEsc: PropTypes.bool,
  canConfirmOnEnter: PropTypes.bool,
  confirmText: PropTypes.string,
  onConfirm: PropTypes.func,
  isConfirmDisabled: PropTypes.bool,
  cancelText: PropTypes.string,
  onCancel: PropTypes.func,
  isCancelDisabled: PropTypes.bool
});

_defineProperty(Modal, "defaultProps", {
  isOpen: false,
  timeout: 200,
  maskClassName: '',
  portalClassName: '',
  className: '',
  onOpen: function onOpen() {
    return null;
  },
  onClose: function onClose() {
    return null;
  },
  onToggle: function onToggle() {
    return null;
  },
  canClose: true,
  canCloseOnClickMask: true,
  shouldCloseOnAction: true,
  canCloseOnEsc: true,
  canConfirmOnEnter: true,
  cancelText: '取消',
  confirmText: '确认删除'
});

export default Modal;
