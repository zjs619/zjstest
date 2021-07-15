import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { I18N } from '../util';
import styled from 'styled-components';

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  position: absolute;\n  top: 22%;\n  left: 50%;\n  width: 500px;\n  margin-left: -250px;\n  text-align: center;\n  color: #666;\n\n  .logo {\n    margin: 0 auto 30px;\n    height: 120px;\n    \n    img {\n      width: 220px;\n    }\n  }\n\n  .action {\n    margin-top: 30px;\n\n    a {\n      display: inline-block;\n      margin: 0 10px;\n      padding: 5px 10px;\n      text-decoration: none;\n      color: #f55d54;\n    }\n\n    a:hover {\n      color: #f12216;\n    }\n  }\n\n  //@media only screen and (max-device-width: 1024px) and (orientation: portrait) {\n  //  #content {\n  //    position: absolute;\n  //    margin: 0;\n  //    top: 47%;\n  //    left: 50%;\n  //    width: auto;\n  //    transform: translate(-50%, -50%) scale(1.8);\n  //  }\n  //}\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
var StyledErrorPage = styled.div(_templateObject());

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

var ErrorPage = /*#__PURE__*/function (_PureComponent) {
  _inherits(ErrorPage, _PureComponent);

  var _super = _createSuper(ErrorPage);

  function ErrorPage() {
    _classCallCheck(this, ErrorPage);

    return _super.apply(this, arguments);
  }

  _createClass(ErrorPage, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          preset = _this$props.preset,
          locale = _this$props.locale,
          title = _this$props.title,
          desc = _this$props.desc;
      var titleContent = title || I18N.errorPage["title_".concat(preset)][locale];
      var descContent = desc || I18N.errorPage["desc_".concat(preset)][locale];
      return /*#__PURE__*/React.createElement(StyledErrorPage, {
        id: "content"
      }, /*#__PURE__*/React.createElement("div", {
        className: "logo"
      }, /*#__PURE__*/React.createElement("a", {
        href: "/"
      }, /*#__PURE__*/React.createElement("img", {
        src: "https://modao.cc/images/logo-full.png"
      }))), /*#__PURE__*/React.createElement("h3", null, titleContent), /*#__PURE__*/React.createElement("p", null, descContent), /*#__PURE__*/React.createElement("div", {
        className: "action"
      }, /*#__PURE__*/React.createElement("a", {
        href: "/"
      }, I18N.errorPage.back[locale]), "|", /*#__PURE__*/React.createElement("a", {
        href: "mailto:support@mockingbot.com"
      }, I18N.errorPage.getSupport[locale])));
    }
  }]);

  return ErrorPage;
}(PureComponent);

_defineProperty(ErrorPage, "propTypes", {
  title: PropTypes.string,
  desc: PropTypes.string,
  preset: PropTypes.oneOf([403, 404, 401]),
  locale: PropTypes.oneOf(['zh-CN', 'en'])
});

_defineProperty(ErrorPage, "defaultProps", {
  locale: 'zh-CN'
});

export default ErrorPage;
