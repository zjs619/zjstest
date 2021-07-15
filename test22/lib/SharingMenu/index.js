import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Dropdown from '../Dropdown';
import { I18N } from '../util';
import Loading from '../Loading';
import styled, { createGlobalStyle } from 'styled-components';
import WorkSpaceSelect from '../WorkSpaceSelect';
import compact from 'lodash/compact';

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var clipboard = createCommonjsModule(function (module, exports) {
/*!
 * clipboard.js v2.0.6
 * https://clipboardjs.com/
 * 
 * Licensed MIT © Zeno Rocha
 */
(function webpackUniversalModuleDefinition(root, factory) {
	module.exports = factory();
})(commonjsGlobal, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

function select(element) {
    var selectedText;

    if (element.nodeName === 'SELECT') {
        element.focus();

        selectedText = element.value;
    }
    else if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA') {
        var isReadOnly = element.hasAttribute('readonly');

        if (!isReadOnly) {
            element.setAttribute('readonly', '');
        }

        element.select();
        element.setSelectionRange(0, element.value.length);

        if (!isReadOnly) {
            element.removeAttribute('readonly');
        }

        selectedText = element.value;
    }
    else {
        if (element.hasAttribute('contenteditable')) {
            element.focus();
        }

        var selection = window.getSelection();
        var range = document.createRange();

        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);

        selectedText = selection.toString();
    }

    return selectedText;
}

module.exports = select;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

function E () {
  // Keep this empty so it's easier to inherit from
  // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
}

E.prototype = {
  on: function (name, callback, ctx) {
    var e = this.e || (this.e = {});

    (e[name] || (e[name] = [])).push({
      fn: callback,
      ctx: ctx
    });

    return this;
  },

  once: function (name, callback, ctx) {
    var self = this;
    function listener () {
      self.off(name, listener);
      callback.apply(ctx, arguments);
    }
    listener._ = callback;
    return this.on(name, listener, ctx);
  },

  emit: function (name) {
    var data = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i = 0;
    var len = evtArr.length;

    for (i; i < len; i++) {
      evtArr[i].fn.apply(evtArr[i].ctx, data);
    }

    return this;
  },

  off: function (name, callback) {
    var e = this.e || (this.e = {});
    var evts = e[name];
    var liveEvents = [];

    if (evts && callback) {
      for (var i = 0, len = evts.length; i < len; i++) {
        if (evts[i].fn !== callback && evts[i].fn._ !== callback)
          liveEvents.push(evts[i]);
      }
    }

    // Remove event from queue to prevent memory leak
    // Suggested by https://github.com/lazd
    // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

    (liveEvents.length)
      ? e[name] = liveEvents
      : delete e[name];

    return this;
  }
};

module.exports = E;
module.exports.TinyEmitter = E;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var is = __webpack_require__(3);
var delegate = __webpack_require__(4);

/**
 * Validates all params and calls the right
 * listener function based on its target type.
 *
 * @param {String|HTMLElement|HTMLCollection|NodeList} target
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listen(target, type, callback) {
    if (!target && !type && !callback) {
        throw new Error('Missing required arguments');
    }

    if (!is.string(type)) {
        throw new TypeError('Second argument must be a String');
    }

    if (!is.fn(callback)) {
        throw new TypeError('Third argument must be a Function');
    }

    if (is.node(target)) {
        return listenNode(target, type, callback);
    }
    else if (is.nodeList(target)) {
        return listenNodeList(target, type, callback);
    }
    else if (is.string(target)) {
        return listenSelector(target, type, callback);
    }
    else {
        throw new TypeError('First argument must be a String, HTMLElement, HTMLCollection, or NodeList');
    }
}

/**
 * Adds an event listener to a HTML element
 * and returns a remove listener function.
 *
 * @param {HTMLElement} node
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listenNode(node, type, callback) {
    node.addEventListener(type, callback);

    return {
        destroy: function() {
            node.removeEventListener(type, callback);
        }
    }
}

/**
 * Add an event listener to a list of HTML elements
 * and returns a remove listener function.
 *
 * @param {NodeList|HTMLCollection} nodeList
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listenNodeList(nodeList, type, callback) {
    Array.prototype.forEach.call(nodeList, function(node) {
        node.addEventListener(type, callback);
    });

    return {
        destroy: function() {
            Array.prototype.forEach.call(nodeList, function(node) {
                node.removeEventListener(type, callback);
            });
        }
    }
}

/**
 * Add an event listener to a selector
 * and returns a remove listener function.
 *
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listenSelector(selector, type, callback) {
    return delegate(document.body, selector, type, callback);
}

module.exports = listen;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

/**
 * Check if argument is a HTML element.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.node = function(value) {
    return value !== undefined
        && value instanceof HTMLElement
        && value.nodeType === 1;
};

/**
 * Check if argument is a list of HTML elements.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.nodeList = function(value) {
    var type = Object.prototype.toString.call(value);

    return value !== undefined
        && (type === '[object NodeList]' || type === '[object HTMLCollection]')
        && ('length' in value)
        && (value.length === 0 || exports.node(value[0]));
};

/**
 * Check if argument is a string.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.string = function(value) {
    return typeof value === 'string'
        || value instanceof String;
};

/**
 * Check if argument is a function.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.fn = function(value) {
    var type = Object.prototype.toString.call(value);

    return type === '[object Function]';
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var closest = __webpack_require__(5);

/**
 * Delegates event to a selector.
 *
 * @param {Element} element
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @param {Boolean} useCapture
 * @return {Object}
 */
function _delegate(element, selector, type, callback, useCapture) {
    var listenerFn = listener.apply(this, arguments);

    element.addEventListener(type, listenerFn, useCapture);

    return {
        destroy: function() {
            element.removeEventListener(type, listenerFn, useCapture);
        }
    }
}

/**
 * Delegates event to a selector.
 *
 * @param {Element|String|Array} [elements]
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @param {Boolean} useCapture
 * @return {Object}
 */
function delegate(elements, selector, type, callback, useCapture) {
    // Handle the regular Element usage
    if (typeof elements.addEventListener === 'function') {
        return _delegate.apply(null, arguments);
    }

    // Handle Element-less usage, it defaults to global delegation
    if (typeof type === 'function') {
        // Use `document` as the first parameter, then apply arguments
        // This is a short way to .unshift `arguments` without running into deoptimizations
        return _delegate.bind(null, document).apply(null, arguments);
    }

    // Handle Selector-based usage
    if (typeof elements === 'string') {
        elements = document.querySelectorAll(elements);
    }

    // Handle Array-like based usage
    return Array.prototype.map.call(elements, function (element) {
        return _delegate(element, selector, type, callback, useCapture);
    });
}

/**
 * Finds closest match and invokes callback.
 *
 * @param {Element} element
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @return {Function}
 */
function listener(element, selector, type, callback) {
    return function(e) {
        e.delegateTarget = closest(e.target, selector);

        if (e.delegateTarget) {
            callback.call(element, e);
        }
    }
}

module.exports = delegate;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

var DOCUMENT_NODE_TYPE = 9;

/**
 * A polyfill for Element.matches()
 */
if (typeof Element !== 'undefined' && !Element.prototype.matches) {
    var proto = Element.prototype;

    proto.matches = proto.matchesSelector ||
                    proto.mozMatchesSelector ||
                    proto.msMatchesSelector ||
                    proto.oMatchesSelector ||
                    proto.webkitMatchesSelector;
}

/**
 * Finds the closest parent that matches a selector.
 *
 * @param {Element} element
 * @param {String} selector
 * @return {Function}
 */
function closest (element, selector) {
    while (element && element.nodeType !== DOCUMENT_NODE_TYPE) {
        if (typeof element.matches === 'function' &&
            element.matches(selector)) {
          return element;
        }
        element = element.parentNode;
    }
}

module.exports = closest;


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/select/src/select.js
var src_select = __webpack_require__(0);
var select_default = /*#__PURE__*/__webpack_require__.n(src_select);

// CONCATENATED MODULE: ./src/clipboard-action.js
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



/**
 * Inner class which performs selection from either `text` or `target`
 * properties and then executes copy or cut operations.
 */

var clipboard_action_ClipboardAction = function () {
    /**
     * @param {Object} options
     */
    function ClipboardAction(options) {
        _classCallCheck(this, ClipboardAction);

        this.resolveOptions(options);
        this.initSelection();
    }

    /**
     * Defines base properties passed from constructor.
     * @param {Object} options
     */


    _createClass(ClipboardAction, [{
        key: 'resolveOptions',
        value: function resolveOptions() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            this.action = options.action;
            this.container = options.container;
            this.emitter = options.emitter;
            this.target = options.target;
            this.text = options.text;
            this.trigger = options.trigger;

            this.selectedText = '';
        }

        /**
         * Decides which selection strategy is going to be applied based
         * on the existence of `text` and `target` properties.
         */

    }, {
        key: 'initSelection',
        value: function initSelection() {
            if (this.text) {
                this.selectFake();
            } else if (this.target) {
                this.selectTarget();
            }
        }

        /**
         * Creates a fake textarea element, sets its value from `text` property,
         * and makes a selection on it.
         */

    }, {
        key: 'selectFake',
        value: function selectFake() {
            var _this = this;

            var isRTL = document.documentElement.getAttribute('dir') == 'rtl';

            this.removeFake();

            this.fakeHandlerCallback = function () {
                return _this.removeFake();
            };
            this.fakeHandler = this.container.addEventListener('click', this.fakeHandlerCallback) || true;

            this.fakeElem = document.createElement('textarea');
            // Prevent zooming on iOS
            this.fakeElem.style.fontSize = '12pt';
            // Reset box model
            this.fakeElem.style.border = '0';
            this.fakeElem.style.padding = '0';
            this.fakeElem.style.margin = '0';
            // Move element out of screen horizontally
            this.fakeElem.style.position = 'absolute';
            this.fakeElem.style[isRTL ? 'right' : 'left'] = '-9999px';
            // Move element to the same position vertically
            var yPosition = window.pageYOffset || document.documentElement.scrollTop;
            this.fakeElem.style.top = yPosition + 'px';

            this.fakeElem.setAttribute('readonly', '');
            this.fakeElem.value = this.text;

            this.container.appendChild(this.fakeElem);

            this.selectedText = select_default()(this.fakeElem);
            this.copyText();
        }

        /**
         * Only removes the fake element after another click event, that way
         * a user can hit `Ctrl+C` to copy because selection still exists.
         */

    }, {
        key: 'removeFake',
        value: function removeFake() {
            if (this.fakeHandler) {
                this.container.removeEventListener('click', this.fakeHandlerCallback);
                this.fakeHandler = null;
                this.fakeHandlerCallback = null;
            }

            if (this.fakeElem) {
                this.container.removeChild(this.fakeElem);
                this.fakeElem = null;
            }
        }

        /**
         * Selects the content from element passed on `target` property.
         */

    }, {
        key: 'selectTarget',
        value: function selectTarget() {
            this.selectedText = select_default()(this.target);
            this.copyText();
        }

        /**
         * Executes the copy operation based on the current selection.
         */

    }, {
        key: 'copyText',
        value: function copyText() {
            var succeeded = void 0;

            try {
                succeeded = document.execCommand(this.action);
            } catch (err) {
                succeeded = false;
            }

            this.handleResult(succeeded);
        }

        /**
         * Fires an event based on the copy operation result.
         * @param {Boolean} succeeded
         */

    }, {
        key: 'handleResult',
        value: function handleResult(succeeded) {
            this.emitter.emit(succeeded ? 'success' : 'error', {
                action: this.action,
                text: this.selectedText,
                trigger: this.trigger,
                clearSelection: this.clearSelection.bind(this)
            });
        }

        /**
         * Moves focus away from `target` and back to the trigger, removes current selection.
         */

    }, {
        key: 'clearSelection',
        value: function clearSelection() {
            if (this.trigger) {
                this.trigger.focus();
            }
            document.activeElement.blur();
            window.getSelection().removeAllRanges();
        }

        /**
         * Sets the `action` to be performed which can be either 'copy' or 'cut'.
         * @param {String} action
         */

    }, {
        key: 'destroy',


        /**
         * Destroy lifecycle.
         */
        value: function destroy() {
            this.removeFake();
        }
    }, {
        key: 'action',
        set: function set() {
            var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'copy';

            this._action = action;

            if (this._action !== 'copy' && this._action !== 'cut') {
                throw new Error('Invalid "action" value, use either "copy" or "cut"');
            }
        }

        /**
         * Gets the `action` property.
         * @return {String}
         */
        ,
        get: function get() {
            return this._action;
        }

        /**
         * Sets the `target` property using an element
         * that will be have its content copied.
         * @param {Element} target
         */

    }, {
        key: 'target',
        set: function set(target) {
            if (target !== undefined) {
                if (target && (typeof target === 'undefined' ? 'undefined' : _typeof(target)) === 'object' && target.nodeType === 1) {
                    if (this.action === 'copy' && target.hasAttribute('disabled')) {
                        throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
                    }

                    if (this.action === 'cut' && (target.hasAttribute('readonly') || target.hasAttribute('disabled'))) {
                        throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');
                    }

                    this._target = target;
                } else {
                    throw new Error('Invalid "target" value, use a valid Element');
                }
            }
        }

        /**
         * Gets the `target` property.
         * @return {String|HTMLElement}
         */
        ,
        get: function get() {
            return this._target;
        }
    }]);

    return ClipboardAction;
}();

/* harmony default export */ var clipboard_action = (clipboard_action_ClipboardAction);
// EXTERNAL MODULE: ./node_modules/tiny-emitter/index.js
var tiny_emitter = __webpack_require__(1);
var tiny_emitter_default = /*#__PURE__*/__webpack_require__.n(tiny_emitter);

// EXTERNAL MODULE: ./node_modules/good-listener/src/listen.js
var listen = __webpack_require__(2);
var listen_default = /*#__PURE__*/__webpack_require__.n(listen);

// CONCATENATED MODULE: ./src/clipboard.js
var clipboard_typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var clipboard_createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function clipboard_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





/**
 * Base class which takes one or more elements, adds event listeners to them,
 * and instantiates a new `ClipboardAction` on each click.
 */

var clipboard_Clipboard = function (_Emitter) {
    _inherits(Clipboard, _Emitter);

    /**
     * @param {String|HTMLElement|HTMLCollection|NodeList} trigger
     * @param {Object} options
     */
    function Clipboard(trigger, options) {
        clipboard_classCallCheck(this, Clipboard);

        var _this = _possibleConstructorReturn(this, (Clipboard.__proto__ || Object.getPrototypeOf(Clipboard)).call(this));

        _this.resolveOptions(options);
        _this.listenClick(trigger);
        return _this;
    }

    /**
     * Defines if attributes would be resolved using internal setter functions
     * or custom functions that were passed in the constructor.
     * @param {Object} options
     */


    clipboard_createClass(Clipboard, [{
        key: 'resolveOptions',
        value: function resolveOptions() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            this.action = typeof options.action === 'function' ? options.action : this.defaultAction;
            this.target = typeof options.target === 'function' ? options.target : this.defaultTarget;
            this.text = typeof options.text === 'function' ? options.text : this.defaultText;
            this.container = clipboard_typeof(options.container) === 'object' ? options.container : document.body;
        }

        /**
         * Adds a click event listener to the passed trigger.
         * @param {String|HTMLElement|HTMLCollection|NodeList} trigger
         */

    }, {
        key: 'listenClick',
        value: function listenClick(trigger) {
            var _this2 = this;

            this.listener = listen_default()(trigger, 'click', function (e) {
                return _this2.onClick(e);
            });
        }

        /**
         * Defines a new `ClipboardAction` on each click event.
         * @param {Event} e
         */

    }, {
        key: 'onClick',
        value: function onClick(e) {
            var trigger = e.delegateTarget || e.currentTarget;

            if (this.clipboardAction) {
                this.clipboardAction = null;
            }

            this.clipboardAction = new clipboard_action({
                action: this.action(trigger),
                target: this.target(trigger),
                text: this.text(trigger),
                container: this.container,
                trigger: trigger,
                emitter: this
            });
        }

        /**
         * Default `action` lookup function.
         * @param {Element} trigger
         */

    }, {
        key: 'defaultAction',
        value: function defaultAction(trigger) {
            return getAttributeValue('action', trigger);
        }

        /**
         * Default `target` lookup function.
         * @param {Element} trigger
         */

    }, {
        key: 'defaultTarget',
        value: function defaultTarget(trigger) {
            var selector = getAttributeValue('target', trigger);

            if (selector) {
                return document.querySelector(selector);
            }
        }

        /**
         * Returns the support of the given action, or all actions if no action is
         * given.
         * @param {String} [action]
         */

    }, {
        key: 'defaultText',


        /**
         * Default `text` lookup function.
         * @param {Element} trigger
         */
        value: function defaultText(trigger) {
            return getAttributeValue('text', trigger);
        }

        /**
         * Destroy lifecycle.
         */

    }, {
        key: 'destroy',
        value: function destroy() {
            this.listener.destroy();

            if (this.clipboardAction) {
                this.clipboardAction.destroy();
                this.clipboardAction = null;
            }
        }
    }], [{
        key: 'isSupported',
        value: function isSupported() {
            var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ['copy', 'cut'];

            var actions = typeof action === 'string' ? [action] : action;
            var support = !!document.queryCommandSupported;

            actions.forEach(function (action) {
                support = support && !!document.queryCommandSupported(action);
            });

            return support;
        }
    }]);

    return Clipboard;
}(tiny_emitter_default.a);

/**
 * Helper function to retrieve attribute value.
 * @param {String} suffix
 * @param {Element} element
 */


function getAttributeValue(suffix, element) {
    var attribute = 'data-clipboard-' + suffix;

    if (!element.hasAttribute(attribute)) {
        return;
    }

    return element.getAttribute(attribute);
}

/* harmony default export */ var clipboard = __webpack_exports__["default"] = (clipboard_Clipboard);

/***/ })
/******/ ])["default"];
});
});

var Clipboard = unwrapExports(clipboard);

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

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  #IBOT_DROPDOWN_MENU_ROOT {\n\n    .DesignDropdownMenuBase {\n      .menu-wrapper {\n        padding: 24px;\n      }\n\n      header {\n        border-bottom: none;\n      }\n    }\n\n    .updating-app-token-confirmation {\n      margin-top: 12px;\n\n      &:not(.is-open) {\n        transform: translate(-50%, 5%);\n      }\n\n      &.is-upward:not(.is-open) {\n        transform: translate(-50%, -5%);\n      }\n\n      &.is-open {\n        transform: translate(-50%, 0);\n      }\n\n      .content {\n        padding: 16px;\n        width: 245px;\n        height: 80px;\n        border-radius: 4px;\n      }\n\n      p {\n        margin: 0;\n        line-height: 18px;\n      }\n\n      .footer {\n        display: flex;\n        justify-content: flex-end;\n        margin-top: 18px;\n        height: 18px;\n\n        button {\n          transition: all 0.15s ease-out;\n          font-size: 12px;\n\n          &:hover {\n            color: #c8cdd1;\n          }\n\n          &:not(:last-child) {\n            margin-right: 12px;\n          }\n        }\n      }\n    }\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  width: 354px;\n\n  .header-first-line {\n    font-size: 14px;\n    color: #333;\n    line-height: 14px;\n  }\n\n  .header-second-line {\n    font-size: 12px;\n    color: #999;\n    line-height: 12px;\n    margin: 8px 0 0 0;\n  }\n\n  .access-url {\n    display: flex;\n    justify-content: space-between;\n    margin-top: 21px;\n    position: relative;\n    \n    .tips {\n      display: none;\n    }\n\n    &.update-tips{\n      .tips {\n        display: inline-block;\n        position: absolute;\n        bottom: 0;\n        font-size: 12px;\n        color: #f02e2e;\n        line-height: 14px;\n        \n        &.zh-CN {\n          bottom: 10px;\n        }\n      }\n    }\n  }\n\n  .access-rights {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    font-size: 14px;\n    height: 14px;\n    color: #333;\n\n    .WorkspaceSelect {\n      margin-right: -10px;\n      font-size: 14px;\n\n      .btn-wp {\n        justify-content: space-between;\n\n        &:not(.is-toolbar):hover {\n          background: #f3f4f5;\n        }\n\n        .caret {\n          margin-left: 0;\n        }\n\n        button {\n          font-size: 14px;\n          color: #333;\n        }\n      }\n    }\n  }\n\n  .pwd-input {\n    display: flex;\n    align-items: center;\n    margin-top: 14px;\n\n    .html-input {\n      background: #f3f4f5;\n      border: 1px solid #e6e6e6;\n      border-radius: 2px;\n      font-size: 14px;\n      color: #333;\n      height: 30px;\n      width: 67px;\n      padding: 0 8px;\n    }\n\n    .change-pwd-btn {\n      font-size: 14px;\n      color: #298df8;\n      text-align: right;\n      margin-left: 16px;\n      cursor: pointer;\n    }\n  }\n\n  .html-url-input {\n    height: 40px;\n    width: 271px;\n    display: flex;\n    background-color: #fff;\n    border: 1px solid #e8e8e8;\n    color: #415058;\n    border-radius: 4px;\n    margin-bottom: 30px;\n\n    input {\n      padding: 13px 6px 13px 16px;\n      width: 210px;\n      color: #415058;\n      white-space: nowrap;\n      overflow: hidden;\n      background: #f3f4f5;\n    }\n\n    &.read-only {\n      margin-bottom: 0;\n\n      input {\n        width: 100%;\n      }\n    }\n\n    label {\n      width: 60px;\n      text-align: center;\n      cursor: pointer;\n\n      button {\n        border-radius: 0 4px 4px 0;\n        height: 100%;\n        width: 100%;\n      }\n\n      .close-button {\n        font-size: 14px;\n        color: #333;\n      }\n    }\n\n    .html-button {\n      position: relative;\n      padding: 0 26px;\n      height: 100%;\n      font-size: 12px;\n      background-color: #fcfcfc;\n\n      .state {\n        position: absolute;\n        left: 0;\n        top: 0;\n        display: flex;\n        justify-content: center;\n        align-items: center;\n        width: 100%;\n        height: 100%;\n        transition: all 0.15s ease-out;\n      }\n\n      .state-1 {\n        opacity: 0;\n        transform: translateY(-50%);\n      }\n\n      &.is-state-1 .state-0 {\n        opacity: 0;\n        transform: translateY(50%);\n      }\n\n      &.is-state-1 .state-1 {\n        opacity: 1;\n        transform: none;\n      }\n\n      .loading {\n        width: 16px;\n        height: 16px;\n      }\n    }\n  }\n\n  .url-copy-button {\n    position: relative;\n    background: #298df8;\n    border-radius: 4px;\n    height: 40px;\n    width: 60px;\n    color: #fff;\n\n    .red-dot::after {\n      content: '';\n      position: absolute;\n      top: -3px;\n      right: -3px;\n      background: #f02e2e;\n      border: 1px solid #fff;\n      height: 10px;\n      width: 10px;\n      border-radius: 50%;\n    }\n\n    .state {\n      position: absolute;\n      left: 0;\n      top: 0;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      width: 100%;\n      height: 100%;\n      transition: all 0.15s ease-out;\n    }\n\n    .state-1 {\n      opacity: 0;\n      transform: translateY(-50%);\n    }\n\n    &.is-state-1 .state-0 {\n      opacity: 0;\n      transform: translateY(50%);\n    }\n\n    &.is-state-1 .state-1 {\n      opacity: 1;\n      transform: none;\n    }\n  }\n\n  .url-action {\n    width: 100%;\n    height: 36px;\n    display: flex;\n    justify-content: space-between;\n\n    .html-input {\n      padding-left: 11px;\n      flex: 1;\n    }\n  }\n\n  .checked-icon {\n    transform: scale(1.5);\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  svg g g:first-child g path:last-child {\n    stroke: rgb(237, 237, 237);\n  }\n\n  svg g g:last-child g path:last-child {\n    stroke: rgb(200, 205, 208);\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
var ThemeLoading = styled(Loading)(_templateObject());
var StyledSharingMenu = styled.div(_templateObject2());
var StyledUpdatingAppTokenConfirmationGlobalStyle = createGlobalStyle(_templateObject3());

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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

var HtmlUrlInput = /*#__PURE__*/function (_PureComponent) {
  _inherits(HtmlUrlInput, _PureComponent);

  var _super = _createSuper(HtmlUrlInput);

  function HtmlUrlInput(props) {
    var _this;

    _classCallCheck(this, HtmlUrlInput);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "handleUpdateAppToken", /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {
        var handleTrack, onUpdateAppToken;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                handleTrack = _this.props.handleTrack;

                _this.onToggle(false);

                onUpdateAppToken = _this.props.onUpdateAppToken;

                _this.setState({
                  isUpdatingAppToken: true
                });

                _context.next = 6;
                return new Promise(function (resolve) {
                  return setTimeout(resolve, 500);
                });

              case 6:
                onUpdateAppToken();

                _this.setState({
                  isUpdatingAppToken: false
                });

                handleTrack && handleTrack('click_Reset');

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "onToggle", function (isOpen) {
      return _this.setState({
        isOpen: isOpen
      });
    });

    _this.state = {
      isUpdatingAppToken: false,
      isOpen: false
    };
    return _this;
  }

  _createClass(HtmlUrlInput, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          value = _this$props.value,
          readOnly = _this$props.readOnly,
          handleTrack = _this$props.handleTrack,
          locale = _this$props.locale;
      var _this$state = this.state,
          isUpdatingAppToken = _this$state.isUpdatingAppToken,
          isOpen = _this$state.isOpen;
      return /*#__PURE__*/React.createElement("div", {
        className: classnames('html-url-input', {
          'read-only': readOnly
        })
      }, /*#__PURE__*/React.createElement("input", {
        type: "text",
        id: "sharing-url",
        readOnly: true,
        className: "html-input",
        value: value,
        onDoubleClick: function onDoubleClick() {
          return handleTrack && handleTrack('click_URL');
        }
      }), !readOnly && /*#__PURE__*/React.createElement(Dropdown, {
        mode: "dark",
        openerType: "custom",
        x: 170,
        y: 32,
        isOpen: isOpen,
        onToggle: this.onToggle,
        menuClassName: "updating-app-token-confirmation",
        openerClassName: "html-button is-state-".concat(Number(isUpdatingAppToken)),
        opener: /*#__PURE__*/React.createElement("button", {
          type: "button"
        }, /*#__PURE__*/React.createElement("span", {
          className: "state state-0 close-button"
        }, I18N.sharingMenu.reset[locale]), /*#__PURE__*/React.createElement("span", {
          className: "state state-1"
        }, isUpdatingAppToken && /*#__PURE__*/React.createElement(ThemeLoading, {
          className: "loading"
        }))),
        menu: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", null, I18N.sharingMenu.resetTips[locale]), /*#__PURE__*/React.createElement("div", {
          className: "footer"
        }, /*#__PURE__*/React.createElement("button", {
          onClick: this.handleUpdateAppToken
        }, I18N.sharingMenu.next[locale]), /*#__PURE__*/React.createElement("button", {
          onClick: function onClick() {
            _this2.onToggle(false);
          }
        }, I18N.sharingMenu.cancel[locale])))
      }));
    }
  }]);

  return HtmlUrlInput;
}(PureComponent);

_defineProperty(HtmlUrlInput, "propTypes", {
  readOnly: PropTypes.bool,
  value: PropTypes.string,
  onUpdateAppToken: PropTypes.func,
  handleTrack: PropTypes.func,
  locale: PropTypes.oneOf(['zh-CN', 'en'])
});

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty$1(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty$1(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep$1(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator$1(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep$1(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep$1(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
// const PROTOTYPE = 'prototype'

var DESIGNDRAFT = 'design-draft';
var FLOWCHART = 'flow-chart';
var MIND_MAP = 'mind-map';

var getSharingUrl = function getSharingUrl(accessToken, type, cid) {
  if (type === DESIGNDRAFT) {
    return "".concat(location.origin, "/sigma/design/").concat(cid);
  } else if (type === FLOWCHART) {
    return "".concat(location.origin, "/flow/").concat(accessToken);
  } else if (type === MIND_MAP) {
    return "".concat(location.origin, "/mind/share/").concat(accessToken);
  }
};

var getAccessList = function getAccessList(isOrgProject, locale) {
  return compact([{
    value: 'public',
    label: I18N.sharingMenu.optionPublic[locale],
    accessLabel: I18N.sharingMenu["public"][locale]
  }, isOrgProject && {
    value: 'restricted',
    label: I18N.sharingMenu.optionRestricted[locale],
    accessLabel: I18N.sharingMenu.restricted[locale]
  }, {
    value: 'private',
    label: I18N.sharingMenu.optionPrivate[locale],
    accessLabel: I18N.sharingMenu["private"][locale]
  }]);
};

var createErrorWithPayload = function createErrorWithPayload(message, payload) {
  var error = new Error(message);
  Object.assign(error, payload);
  return error;
};

var fetchPutJSON = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator$1( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url, bodyObject) {
    var result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetch(url, {
              method: 'PUT',
              credentials: 'same-origin',
              headers: {
                'content-type': 'application/json'
              },
              body: JSON.stringify(bodyObject)
            });

          case 2:
            result = _context.sent;

            if (result.ok) {
              _context.next = 17;
              break;
            }

            _context.t0 = createErrorWithPayload;
            _context.t1 = "[fetchPutJSON] failed with ".concat(result.status, ": ").concat(url);
            _context.t2 = _objectSpread;
            _context.t3 = _objectSpread;
            _context.t4 = {};
            _context.next = 11;
            return result.json();

          case 11:
            _context.t5 = _context.sent;
            _context.t6 = (0, _context.t3)(_context.t4, _context.t5);
            _context.t7 = {};
            _context.t8 = {
              status: result.status
            };
            _context.t9 = (0, _context.t2)(_context.t6, _context.t7, _context.t8);
            throw (0, _context.t0)(_context.t1, _context.t9);

          case 17:
            return _context.abrupt("return", result.json());

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function fetchPutJSON(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var getRandomCid = function getRandomCid(prefix) {
  return "".concat(prefix || '').concat(Date.now().toString(36)).concat(Math.random().toString(36).slice(2, 8));
};

function _typeof$1(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$1 = function _typeof(obj) { return typeof obj; }; } else { _typeof$1 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$1(obj); }

function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties$1(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass$1(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$1(Constructor.prototype, protoProps); if (staticProps) _defineProperties$1(Constructor, staticProps); return Constructor; }

function _inherits$1(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf$1(subClass, superClass); }

function _setPrototypeOf$1(o, p) { _setPrototypeOf$1 = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$1(o, p); }

function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf$1(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$1(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$1(this, result); }; }

function _possibleConstructorReturn$1(self, call) { if (call && (_typeof$1(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$1(self); }

function _assertThisInitialized$1(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf$1(o) { _getPrototypeOf$1 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$1(o); }

function _defineProperty$2(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var CHECKED = /*#__PURE__*/React.createElement("svg", {
  width: "8",
  height: "6",
  className: "checked-icon",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("g", {
  transform: "translate(-2 -3)",
  fill: "none",
  fillRule: "evenodd"
}, /*#__PURE__*/React.createElement("rect", {
  width: "12",
  height: "12",
  rx: "1.867"
}), /*#__PURE__*/React.createElement("path", {
  d: "M2.4 5.883a.64.64 0 00.194.471l1.949 1.903c.129.129.29.193.48.193a.643.643 0 00.473-.193l4.01-3.93a.627.627 0 00.202-.468.614.614 0 00-.201-.465.667.667 0 00-.479-.194.667.667 0 00-.479.194l-3.526 3.46-1.472-1.441a.667.667 0 00-.479-.194.667.667 0 00-.478.194.64.64 0 00-.194.47z",
  fill: "#F2F4F5"
})));

var SharingMenu = /*#__PURE__*/function (_PureComponent) {
  _inherits$1(SharingMenu, _PureComponent);

  var _super = _createSuper$1(SharingMenu);

  function SharingMenu(props) {
    var _this;

    _classCallCheck$1(this, SharingMenu);

    _this = _super.call(this, props);

    _defineProperty$2(_assertThisInitialized$1(_this), "handleUpdateProject", function (_ref) {
      var name = _ref.name,
          value = _ref.value;
      var project = _this.props.project;
      project[name] = value;

      if (name === 'password' && project.access !== 'private') {
        project.access = 'private';
      }

      if (project.cid) {
        fetchPutJSON("/api/web/v3/project_upper/project_basics/".concat(project.cid), project)["catch"](console.error);
      }
    });

    _defineProperty$2(_assertThisInitialized$1(_this), "handleUpdateAccessToken", function () {
      var newToken = getRandomCid();

      _this.handleUpdateProject({
        name: 'access_token',
        value: newToken
      });

      _this.setState({
        isUpdatingAppToken: true
      });
    });

    _defineProperty$2(_assertThisInitialized$1(_this), "handleCopyURL", function () {
      var handleTrack = _this.props.handleTrack;

      _this.setState({
        isURLCopied: true,
        isUpdatingAppToken: false
      });

      handleTrack && handleTrack('click_CopyURL');
      clearTimeout(_this.copyURLTimeout);
      _this.copyURLTimeout = setTimeout(function () {
        return _this.setState({
          isURLCopied: false
        });
      }, 3000);
    });

    _defineProperty$2(_assertThisInitialized$1(_this), "handleChangeSelect", function (value) {
      var _this$props = _this.props,
          showNoticeTip = _this$props.showNoticeTip,
          locale = _this$props.locale;
      var accessPwd = _this.state.accessPwd;

      _this.setState({
        shareAccess: value
      });

      if (value === 'public') {
        showNoticeTip(I18N.sharingMenu["public"][locale]);

        _this.handleUpdateProject({
          name: 'access',
          value: value
        });
      } else if (value === 'restricted') {
        showNoticeTip(I18N.sharingMenu.restricted[locale]);

        _this.handleUpdateProject({
          name: 'access',
          value: value
        });
      } else if (value === 'private') {
        accessPwd !== '' && _this.handleUpdateProject({
          name: 'password',
          value: accessPwd
        });
        showNoticeTip(I18N.sharingMenu["private"][locale]);
      }
    });

    _defineProperty$2(_assertThisInitialized$1(_this), "handleChangePwd", function (e) {
      _this.setState({
        accessPwd: e.target.value
      });
    });

    _defineProperty$2(_assertThisInitialized$1(_this), "handleSavePwd", function () {
      var _this$props2 = _this.props,
          showNoticeTip = _this$props2.showNoticeTip,
          locale = _this$props2.locale;
      var accessPwd = _this.state.accessPwd;

      if (!accessPwd || !accessPwd.length) {
        showNoticeTip(I18N.sharingMenu.emptyPassword[locale], 'warning');
      } else {
        _this.handleUpdateProject({
          name: 'password',
          value: accessPwd
        });

        showNoticeTip(I18N.sharingMenu.setPasswordSuccess[locale]);
      }
    });

    _this.state = {
      isURLCopied: false,
      isUpdatingAppToken: false,
      accessPwd: props.project.password,
      shareAccess: props.project.access === 'private' && !props.project.password ? 'public' : props.project.access
    };
    return _this;
  }

  _createClass$1(SharingMenu, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.clipboard = new Clipboard('#preview-copy-btn');
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.clipboard = null;
    }
  }, {
    key: "render",
    value: function render() {
      var _optionList$find;

      var _this$props3 = this.props,
          project = _this$props3.project,
          userId = _this$props3.userId,
          handleTrack = _this$props3.handleTrack,
          locale = _this$props3.locale;
      var _this$state = this.state,
          isURLCopied = _this$state.isURLCopied,
          accessPwd = _this$state.accessPwd,
          shareAccess = _this$state.shareAccess,
          isUpdatingAppToken = _this$state.isUpdatingAppToken;
      var accesses = project.accesses,
          accessToken = project.access_token,
          isOrgProject = project.is_org_project,
          type = project.type,
          cid = project.cid;
      var showPwdInput = shareAccess === 'private';
      var canEdit = accesses[userId] === 'project_owner' || accesses[userId] === 'project_member';
      var sharingUrl = getSharingUrl(accessToken, type, cid);
      var optionList = getAccessList(isOrgProject, locale);
      var accessLabel = (_optionList$find = optionList.find(function (i) {
        return i.value === shareAccess;
      })) === null || _optionList$find === void 0 ? void 0 : _optionList$find.accessLabel;
      return /*#__PURE__*/React.createElement(StyledSharingMenu, {
        className: "share-url-action"
      }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        className: "header-first-line"
      }, I18N.sharingMenu.shareAccess[locale]), locale !== 'mockitt-en' && /*#__PURE__*/React.createElement("div", {
        className: "header-second-line"
      }, accessLabel)), /*#__PURE__*/React.createElement("div", {
        className: classnames('access-url', {
          'update-tips': isUpdatingAppToken
        })
      }, /*#__PURE__*/React.createElement(HtmlUrlInput, {
        readOnly: type === DESIGNDRAFT ? true : !canEdit,
        value: sharingUrl || '',
        onUpdateAppToken: this.handleUpdateAccessToken,
        handleTrack: handleTrack,
        locale: locale
      }), /*#__PURE__*/React.createElement("button", {
        id: "preview-copy-btn",
        type: "button",
        className: classnames('copy', 'url-copy-button', "is-state-".concat(Number(isURLCopied))),
        onClick: this.handleCopyURL,
        "data-clipboard-target": "#sharing-url"
      }, /*#__PURE__*/React.createElement("span", {
        className: classnames('state state-0', {
          'red-dot': isUpdatingAppToken
        })
      }, I18N.sharingMenu.copy[locale]), /*#__PURE__*/React.createElement("div", {
        className: "state state-1"
      }, CHECKED)), /*#__PURE__*/React.createElement("span", {
        className: classnames('tips', locale === 'zh-CN' ? 'zh-CN' : '')
      }, I18N.sharingMenu.tips[locale])), canEdit && /*#__PURE__*/React.createElement("div", {
        className: "access-rights"
      }, /*#__PURE__*/React.createElement("p", null, I18N.sharingMenu.access[locale]), /*#__PURE__*/React.createElement(WorkSpaceSelect, {
        optionList: optionList,
        value: shareAccess,
        onChange: this.handleChangeSelect
      })), canEdit && showPwdInput && /*#__PURE__*/React.createElement("div", {
        className: "pwd-input"
      }, /*#__PURE__*/React.createElement("input", {
        type: "text",
        className: "html-input",
        value: accessPwd,
        onChange: this.handleChangePwd
      }), /*#__PURE__*/React.createElement("p", {
        className: "change-pwd-btn",
        onClick: this.handleSavePwd
      }, I18N.sharingMenu.savePassword[locale])), this.props.footer, /*#__PURE__*/React.createElement(StyledUpdatingAppTokenConfirmationGlobalStyle, null));
    }
  }]);

  return SharingMenu;
}(PureComponent);

_defineProperty$2(SharingMenu, "propTypes", {
  userId: PropTypes.number,
  project: PropTypes.object,
  showNoticeTip: PropTypes.func,
  handleTrack: PropTypes.func,
  footer: PropTypes.any,
  locale: PropTypes.oneOf(['zh-CN', 'en'])
});

_defineProperty$2(SharingMenu, "defaultProps", {
  locale: 'zh-CN'
});

export default SharingMenu;
