import isBoolean from 'lodash/isBoolean';
import compact from 'lodash/compact';
import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';
import { isValidElement } from 'react';

var INPUT_ARROW = "<svg width=\"6\" height=\"4\" viewBox=\"0 0 6 4\"><path d=\"M3 0l3 4H0\"></path></svg>";
var DROPDOWN_ARROW = "<svg viewBox=\"0 0 8 3\"><path d=\"M4.654.233L8 3H0L3.383.23c.37-.303.902-.302 1.27.003z\" /></svg>";
var GUIDE_ARROW = "<svg width=\"27\" height=\"8\"><path d=\"M15.069 6.66a3.27 3.27 0 0 1-3.13 0L0 0h27.008l-11.94 6.66z\" /></svg>";
var CLOSE_FILLED = "<svg width=\"16\" height=\"16\"><path d=\"M8 6.945L6.218 5.163a.688.688 0 0 0-.973.972l1.783 1.782L5.245 9.7a.688.688 0 0 0 .973.972L8 8.89l1.782 1.782a.688.688 0 0 0 .973-.972L8.972 7.917l1.783-1.782a.688.688 0 0 0-.973-.972L8 6.945zm-5.185 6.24a7.333 7.333 0 1 1 10.37-10.37 7.333 7.333 0 0 1-10.37 10.37z\"/></svg>";

var svg = /*#__PURE__*/Object.freeze({
  __proto__: null,
  INPUT_ARROW: INPUT_ARROW,
  DROPDOWN_ARROW: DROPDOWN_ARROW,
  GUIDE_ARROW: GUIDE_ARROW,
  CLOSE_FILLED: CLOSE_FILLED
});

var I18N = {
  sharingMenu: {
    shareAccess: {
      'zh-CN': '分享权限',
      'en': 'Share Permission',
      'mockitt-en': 'Share Permission'
    },
    "public": {
      'zh-CN': '已开启公开分享，所有人可见',
      'en': 'Anyone with the link can view',
      'mockitt-en': 'Anyone with the link can view'
    },
    optionPublic: {
      'zh-CN': '所有人可见',
      'en': ' Anyone with the link',
      'mockitt-en': 'Anyone with the link'
    },
    restricted: {
      'zh-CN': '已开启公开分享，仅企业成员可见',
      'en': 'Only team member can view',
      'mockitt-en': 'Only team member can view'
    },
    optionRestricted: {
      'zh-CN': '仅企业成员可见',
      'en': 'Member only',
      'mockitt-en': 'Member only'
    },
    "private": {
      'zh-CN': '已开启公开分享，可凭密码访问',
      'en': 'People can view with the password',
      'mockitt-en': 'People can view with the password'
    },
    optionPrivate: {
      'zh-CN': '可凭密码访问',
      'en': 'Password',
      'mockitt-en': 'Password'
    },
    copy: {
      'zh-CN': '复制',
      'en': 'Copy',
      'mockitt-en': 'Copy'
    },
    access: {
      'zh-CN': '访问权限',
      'en': 'Access',
      'mockitt-en': 'Access'
    },
    savePassword: {
      'zh-CN': '保存密码',
      'en': 'Save Password',
      'mockitt-en': 'Save Password'
    },
    emptyPassword: {
      'zh-CN': '密码不得为空',
      'en': 'Please set a password',
      'mockitt-en': 'Please set a password'
    },
    setPasswordSuccess: {
      'zh-CN': '密码设置成功',
      'en': 'Password set successfully',
      'mockitt-en': 'Password set successfully'
    },
    reset: {
      'zh-CN': '重置',
      'en': 'Reset',
      'mockitt-en': 'Reset'
    },
    resetTips: {
      'zh-CN': '重置后，旧的链接将不能访问',
      'en': 'The link will be invalid after resetting',
      'mockitt-en': 'The link will be invalid after resetting'
    },
    tips: {
      'zh-CN': '您分享配置已更新，请复制新的分享链接',
      'en': 'Your sharing setting is updated. Please copy the new sharing link.',
      'mockitt-en': 'Your sharing setting is updated. Please copy the new sharing link.'
    },
    next: {
      'zh-CN': '继续',
      'en': 'Reset',
      'mockitt-en': 'Reset'
    },
    cancel: {
      'zh-CN': '取消',
      'en': 'Cancel',
      'mockitt-en': 'Cancel'
    }
  },
  errorPage: {
    title_404: {
      'zh-CN': '对不起，找不到您要的项目。',
      'en': 'Sorry, we cannot find your project.',
      'mockitt-en': 'Sorry, we cannot find your project.'
    },
    desc_404: {
      'zh-CN': '有可能是您拼错了网址，或项目链接已被重置或删除。请联系项目所有者解决。',
      'en': 'he link is invalid by resetting or deleting. Please contact the project owner for help.',
      'mockitt-en': 'he link is invalid by resetting or deleting. Please contact the project owner for help.'
    },
    title_403: {
      'zh-CN': '对不起，访问受限。',
      'en': 'Sorry, you have no access to the project.',
      'mockitt-en': 'Sorry, you have no access to the project.'
    },
    desc_403: {
      'zh-CN': '该项目仅企业成员可见，请联系企业管理员添加您为企业成员或者修改项目分享权限为「所有人可查看」',
      'en': 'The project is viewed by team member only, please contact admin to add you as a team member or change the access to "Anyone with the link"',
      'mockitt-en': 'The project is viewed by team member only, please contact admin to add you as a team member or change the access to "Anyone with the link"'
    },
    title_401: {
      'zh-CN': '对不起，访问受限',
      'en': 'Sorry, you have no access to the project.',
      'mockitt-en': 'Sorry, you have no access to the project.'
    },
    desc_401: {
      'zh-CN': '您的登录已失效, 请刷新页面或重新登入。',
      'en': 'Your login is invalid',
      'mockitt-en': 'Your login is invalid'
    },
    back: {
      'zh-CN': '返回墨刀首页',
      'en': 'Back to Homepage',
      'mockitt-en': 'Back to Homepage'
    },
    getSupport: {
      'zh-CN': '获取支持',
      'en': 'Need Help',
      'mockitt-en': 'Need Help'
    }
  }
};

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
var EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z0-9-]{2,63}$/i;
var IBOT = {
  OPEN_MODAL_STACK: []
};
function checkModalIndexInStack(modal) {
  return IBOT.OPEN_MODAL_STACK.indexOf(modal);
}
function checkNoOpenModalInStack() {
  var OPEN_MODAL_STACK = IBOT.OPEN_MODAL_STACK;
  return OPEN_MODAL_STACK.length === 0 || OPEN_MODAL_STACK.every(function (modal) {
    return !modal.state.isOpen;
  });
}
function addModalToStack(modal) {
  return Object.assign(IBOT, {
    OPEN_MODAL_STACK: [modal].concat(_toConsumableArray(IBOT.OPEN_MODAL_STACK))
  });
}
function deleteModalFromStack(modal) {
  return Object.assign(IBOT, {
    OPEN_MODAL_STACK: IBOT.OPEN_MODAL_STACK.filter(function (it) {
      return it !== modal;
    })
  });
}
function trimList(list) {
  return compact(list).join(' ');
}
function getOtherProps(_ref, props) {
  var _ref$propTypes = _ref.propTypes,
      propTypes = _ref$propTypes === void 0 ? {} : _ref$propTypes;
  var propKeyList = Object.keys(propTypes);
  return Object.entries(props).reduce(function (result, _ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
        key = _ref3[0],
        val = _ref3[1];

    return !propKeyList.includes(key) ? Object.assign(result, _defineProperty({}, key, val)) : result;
  }, {});
}
function $(selector) {
  var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  return context.querySelector(selector);
}
function $$(selector) {
  var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  return Array.from(context.querySelectorAll(selector));
}
function preparePortal($root, className) {
  var $portal = Object.assign(document.createElement('div'), {
    className: className
  });
  $root.appendChild($portal);
  return $portal;
}
function preventScrollingPropagation($elmt) {
  if (!$elmt || !($elmt instanceof Element)) return;
  $elmt.addEventListener('wheel', function (e) {
    var scrollTop = $elmt.scrollTop,
        scrollHeight = $elmt.scrollHeight;

    var _$elmt$getBoundingCli = $elmt.getBoundingClientRect(),
        height = _$elmt$getBoundingCli.height;

    var delta = e.deltaY * -1;
    var isUp = delta > 0;

    var prevent = function prevent() {
      e.stopPropagation();
      e.preventDefault();
      return false;
    }; // Scrolling down, but this will take us past the bottom.


    if (!isUp && -delta > scrollHeight - height - scrollTop) {
      $elmt.scrollTop = scrollHeight;
      return prevent(); // Scrolling up, but this will take us past the top.
    } else if (isUp && delta > scrollTop) {
      $elmt.scrollTop = 0;
      return prevent();
    }
  });
}
function toggleGlobalScroll(expected) {
  var $root = document.documentElement;
  var $body = document.body;
  var $content = $('.ContentRoot');
  var _window = window,
      vw = _window.innerWidth,
      scrollX = _window.scrollX,
      scrollY = _window.scrollY;
  var is = isBoolean(expected) ? expected : $body.classList.toggle('is-content-fixed');

  if (isBoolean(expected)) {
    $body.classList[expected ? 'add' : 'remove']('is-content-fixed');
  }

  if (!$content) return is;

  if (is) {
    $content.style.left = "-".concat(scrollX, "px");
    $content.style.top = "-".concat(scrollY, "px");
    window.scrollTo(Math.max(($root.scrollWidth - vw) / 2, 0), 0);
  } else {
    window.scrollTo(Math.abs(parseInt($content.style.left, 10)), Math.abs(parseInt($content.style.top, 10)));
  }

  return is;
}
function getOptionLabel(it, optionLabelProp) {
  return isString(it) || isNumber(it) || /*#__PURE__*/isValidElement(it) ? it : it[optionLabelProp || 'label' || 'value'] ? it[optionLabelProp || 'label' || 'value'] : undefined;
}
function getOptionValue(it) {
  return isString(it) || isNumber(it) ? String(it) : it.value || it.label ? String(it.value || it.label) : undefined;
}
function convertValueListToSet(valueList) {
  return new Set(Array.from(valueList || []).map(String));
}
function checkOptionByValue(it, value) {
  return !!value && getOptionValue(it) === String(value);
}
function checkOptionByValueList(it, valueList) {
  return convertValueListToSet(valueList).has(getOptionValue(it));
}
function setNumberValue(value) {
  return value !== '' && isNumber(Number(value)) ? Number(value) : '';
}

export { $, $$, EMAIL_REGEX, I18N, svg as SVG, addModalToStack, checkModalIndexInStack, checkNoOpenModalInStack, checkOptionByValue, checkOptionByValueList, convertValueListToSet, deleteModalFromStack, getOptionLabel, getOptionValue, getOtherProps, preparePortal, preventScrollingPropagation, setNumberValue, toggleGlobalScroll, trimList };
