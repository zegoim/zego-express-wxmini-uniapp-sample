(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],[
/* 0 */,
/* 1 */
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createPlugin = createPlugin;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 3));
var _uniI18n = __webpack_require__(/*! @dcloudio/uni-i18n */ 4);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var realAtob;

var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
var b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;

if (typeof atob !== 'function') {
  realAtob = function realAtob(str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, '');
    if (!b64re.test(str)) {throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");}

    // Adding the padding if missing, for semplicity
    str += '=='.slice(2 - (str.length & 3));
    var bitmap;var result = '';var r1;var r2;var i = 0;
    for (; i < str.length;) {
      bitmap = b64.indexOf(str.charAt(i++)) << 18 | b64.indexOf(str.charAt(i++)) << 12 |
      (r1 = b64.indexOf(str.charAt(i++))) << 6 | (r2 = b64.indexOf(str.charAt(i++)));

      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) :
      r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) :
      String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
  };
} else {
  // 注意atob只能在全局对象上调用，例如：`const Base64 = {atob};Base64.atob('xxxx')`是错误的用法
  realAtob = atob;
}

function b64DecodeUnicode(str) {
  return decodeURIComponent(realAtob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

function getCurrentUserInfo() {
  var token = wx.getStorageSync('uni_id_token') || '';
  var tokenArr = token.split('.');
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0 };

  }
  var userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error('获取当前用户信息出错，详细错误信息为：' + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1000;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}

function uniIdMixin(Vue) {
  Vue.prototype.uniIDHasRole = function (roleId) {var _getCurrentUserInfo =


    getCurrentUserInfo(),role = _getCurrentUserInfo.role;
    return role.indexOf(roleId) > -1;
  };
  Vue.prototype.uniIDHasPermission = function (permissionId) {var _getCurrentUserInfo2 =


    getCurrentUserInfo(),permission = _getCurrentUserInfo2.permission;
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1;
  };
  Vue.prototype.uniIDTokenValid = function () {var _getCurrentUserInfo3 =


    getCurrentUserInfo(),tokenExpired = _getCurrentUserInfo3.tokenExpired;
    return tokenExpired > Date.now();
  };
}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return new Promise(function (resolve, reject) {
      res.then(function (res) {
        if (res[0]) {
          reject(res[0]);
        } else {
          resolve(res[1]);
        }
      });
    });
  } };


var SYNC_API_RE =
/^\$|Window$|WindowStyle$|sendHostEvent|sendNativeEvent|restoreGlobal|requireGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getLocale|setLocale/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

function getLocale() {
  // 优先使用 $locale
  var app = getApp({
    allowDefault: true });

  if (app && app.$vm) {
    return app.$vm.$locale;
  }
  return wx.getSystemInfoSync().language || 'zh-Hans';
}

function setLocale(locale) {
  var app = getApp();
  if (!app) {
    return false;
  }
  var oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach(function (fn) {return fn({
        locale: locale });});

    return true;
  }
  return false;
}

var onLocaleChangeCallbacks = [];
function onLocaleChange(fn) {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
}

if (typeof global !== 'undefined') {
  global.getLocale = getLocale;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  getLocale: getLocale,
  setLocale: setLocale,
  onLocaleChange: onLocaleChange,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function addUuid(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    addUuid(result);
    addSafeAreaInsets(result);
  } };


var showActionSheet = {
  args: function args(fromArgs) {
    if (typeof fromArgs === 'object') {
      fromArgs.alertText = fromArgs.title;
    }
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo,
  showActionSheet: showActionSheet };

var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  var oldTriggerEvent = mpInstance.triggerEvent;
  var newTriggerEvent = function newTriggerEvent(event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
  try {
    // 京东小程序 triggerEvent 为只读
    mpInstance.triggerEvent = newTriggerEvent;
  } catch (error) {
    mpInstance._triggerEvent = newTriggerEvent;
  }
}

function initHook(name, options, isComponent) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"uniapp-sample","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    // scopedSlotsCompiler auto
    properties.scopedSlotsCompiler = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var messages = {};

var locale;

{
  locale = wx.getSystemInfoSync().language;
}

function initI18nMessages() {
  if (!isEnableLocale()) {
    return;
  }
  var localeKeys = Object.keys(__uniConfig.locales);
  if (localeKeys.length) {
    localeKeys.forEach(function (locale) {
      var curMessages = messages[locale];
      var userMessages = __uniConfig.locales[locale];
      if (curMessages) {
        Object.assign(curMessages, userMessages);
      } else {
        messages[locale] = userMessages;
      }
    });
  }
}

initI18nMessages();

var i18n = (0, _uniI18n.initVueI18n)(
locale,
{});

var t = i18n.t;
var i18nMixin = i18n.mixin = {
  beforeCreate: function beforeCreate() {var _this2 = this;
    var unwatch = i18n.i18n.watchLocale(function () {
      _this2.$forceUpdate();
    });
    this.$once('hook:beforeDestroy', function () {
      unwatch();
    });
  },
  methods: {
    $$t: function $$t(key, values) {
      return t(key, values);
    } } };


var setLocale$1 = i18n.setLocale;
var getLocale$1 = i18n.getLocale;

function initAppLocale(Vue, appVm, locale) {
  var state = Vue.observable({
    locale: locale || i18n.getLocale() });

  var localeWatchers = [];
  appVm.$watchLocale = function (fn) {
    localeWatchers.push(fn);
  };
  Object.defineProperty(appVm, '$locale', {
    get: function get() {
      return state.locale;
    },
    set: function set(v) {
      state.locale = v;
      localeWatchers.forEach(function (watch) {return watch(v);});
    } });

}

function isEnableLocale() {
  return typeof __uniConfig !== 'undefined' && __uniConfig.locales && !!Object.keys(__uniConfig.locales).length;
}

// export function initI18n() {
//   const localeKeys = Object.keys(__uniConfig.locales || {})
//   if (localeKeys.length) {
//     localeKeys.forEach((locale) =>
//       i18n.add(locale, __uniConfig.locales[locale])
//     )
//   }
// }

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function initScopedSlotsParams() {
  var center = {};
  var parents = {};

  _vue.default.prototype.$hasScopedSlotsParams = function (vueId) {
    var has = center[vueId];
    if (!has) {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
    return has;
  };

  _vue.default.prototype.$getScopedSlotsParams = function (vueId, name, key) {
    var data = center[vueId];
    if (data) {
      var object = data[name] || {};
      return key ? object[key] : object;
    } else {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
  };

  _vue.default.prototype.$setScopedSlotsParams = function (name, value) {
    var vueIds = this.$options.propsData.vueId;
    if (vueIds) {
      var vueId = vueIds.split(',')[0];
      var object = center[vueId] = center[vueId] || {};
      object[name] = value;
      if (parents[vueId]) {
        parents[vueId].$forceUpdate();
      }
    }
  };

  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    } });

}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }
  uniIdMixin(_vue.default);

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {// hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initAppLocale(_vue.default, vm, wx.getSystemInfoSync().language || 'zh-Hans');

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  vm.$scope = app;
  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}

function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {args[_key7] = arguments[_key7];}
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {args[_key8] = arguments[_key8];}
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 2)))

/***/ }),
/* 2 */
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 3 */
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2022 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu' || vm.mpHost === 'mp-kuaishou' || vm.mpHost === 'mp-xhs'){//百度、快手、小红书 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue !== pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_NAME":"uniapp-sample","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"uniapp-sample","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"uniapp-sample","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"uniapp-sample","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      (this.$scope['_triggerEvent'] || this.$scope['triggerEvent']).call(this.$scope, event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value);
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value);
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 2)))

/***/ }),
/* 4 */
/*!*************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-i18n/dist/uni-i18n.es.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, global) {Object.defineProperty(exports, "__esModule", { value: true });exports.compileI18nJsonStr = compileI18nJsonStr;exports.hasI18nJson = hasI18nJson;exports.initVueI18n = initVueI18n;exports.isI18nStr = isI18nStr;exports.normalizeLocale = normalizeLocale;exports.parseI18nJson = parseI18nJson;exports.resolveLocale = resolveLocale;exports.isString = exports.LOCALE_ZH_HANT = exports.LOCALE_ZH_HANS = exports.LOCALE_FR = exports.LOCALE_ES = exports.LOCALE_EN = exports.I18n = exports.Formatter = void 0;function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var isArray = Array.isArray;
var isObject = function isObject(val) {return val !== null && typeof val === 'object';};
var defaultDelimiters = ['{', '}'];var
BaseFormatter = /*#__PURE__*/function () {
  function BaseFormatter() {_classCallCheck(this, BaseFormatter);
    this._caches = Object.create(null);
  }_createClass(BaseFormatter, [{ key: "interpolate", value: function interpolate(
    message, values) {var delimiters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultDelimiters;
      if (!values) {
        return [message];
      }
      var tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message, delimiters);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    } }]);return BaseFormatter;}();exports.Formatter = BaseFormatter;

var RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
var RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format, _ref) {var _ref2 = _slicedToArray(_ref, 2),startDelimiter = _ref2[0],endDelimiter = _ref2[1];
  var tokens = [];
  var position = 0;
  var text = '';
  while (position < format.length) {
    var char = format[position++];
    if (char === startDelimiter) {
      if (text) {
        tokens.push({ type: 'text', value: text });
      }
      text = '';
      var sub = '';
      char = format[position++];
      while (char !== undefined && char !== endDelimiter) {
        sub += char;
        char = format[position++];
      }
      var isClosed = char === endDelimiter;
      var type = RE_TOKEN_LIST_VALUE.test(sub) ?
      'list' :
      isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ?
      'named' :
      'unknown';
      tokens.push({ value: sub, type: type });
    }
    //  else if (char === '%') {
    //   // when found rails i18n syntax, skip text capture
    //   if (format[position] !== '{') {
    //     text += char
    //   }
    // }
    else {
        text += char;
      }
  }
  text && tokens.push({ type: 'text', value: text });
  return tokens;
}
function compile(tokens, values) {
  var compiled = [];
  var index = 0;
  var mode = isArray(values) ?
  'list' :
  isObject(values) ?
  'named' :
  'unknown';
  if (mode === 'unknown') {
    return compiled;
  }
  while (index < tokens.length) {
    var token = tokens[index];
    switch (token.type) {
      case 'text':
        compiled.push(token.value);
        break;
      case 'list':
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case 'named':
        if (mode === 'named') {
          compiled.push(values[token.value]);
        } else
        {
          if (true) {
            console.warn("Type of token '".concat(token.type, "' and format of value '").concat(mode, "' don't match!"));
          }
        }
        break;
      case 'unknown':
        if (true) {
          console.warn("Detect 'unknown' type of token!");
        }
        break;}

    index++;
  }
  return compiled;
}

var LOCALE_ZH_HANS = 'zh-Hans';exports.LOCALE_ZH_HANS = LOCALE_ZH_HANS;
var LOCALE_ZH_HANT = 'zh-Hant';exports.LOCALE_ZH_HANT = LOCALE_ZH_HANT;
var LOCALE_EN = 'en';exports.LOCALE_EN = LOCALE_EN;
var LOCALE_FR = 'fr';exports.LOCALE_FR = LOCALE_FR;
var LOCALE_ES = 'es';exports.LOCALE_ES = LOCALE_ES;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = function hasOwn(val, key) {return hasOwnProperty.call(val, key);};
var defaultFormatter = new BaseFormatter();
function include(str, parts) {
  return !!parts.find(function (part) {return str.indexOf(part) !== -1;});
}
function startsWith(str, parts) {
  return parts.find(function (part) {return str.indexOf(part) === 0;});
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}var
I18n = /*#__PURE__*/function () {
  function I18n(_ref3) {var locale = _ref3.locale,fallbackLocale = _ref3.fallbackLocale,messages = _ref3.messages,watcher = _ref3.watcher,formater = _ref3.formater;_classCallCheck(this, I18n);
    this.locale = LOCALE_EN;
    this.fallbackLocale = LOCALE_EN;
    this.message = {};
    this.messages = {};
    this.watchers = [];
    if (fallbackLocale) {
      this.fallbackLocale = fallbackLocale;
    }
    this.formater = formater || defaultFormatter;
    this.messages = messages || {};
    this.setLocale(locale || LOCALE_EN);
    if (watcher) {
      this.watchLocale(watcher);
    }
  }_createClass(I18n, [{ key: "setLocale", value: function setLocale(
    locale) {var _this = this;
      var oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      if (!this.messages[this.locale]) {
        // 可能初始化时不存在
        this.messages[this.locale] = {};
      }
      this.message = this.messages[this.locale];
      // 仅发生变化时，通知
      if (oldLocale !== this.locale) {
        this.watchers.forEach(function (watcher) {
          watcher(_this.locale, oldLocale);
        });
      }
    } }, { key: "getLocale", value: function getLocale()
    {
      return this.locale;
    } }, { key: "watchLocale", value: function watchLocale(
    fn) {var _this2 = this;
      var index = this.watchers.push(fn) - 1;
      return function () {
        _this2.watchers.splice(index, 1);
      };
    } }, { key: "add", value: function add(
    locale, message) {var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var curMessages = this.messages[locale];
      if (curMessages) {
        if (override) {
          Object.assign(curMessages, message);
        } else
        {
          Object.keys(message).forEach(function (key) {
            if (!hasOwn(curMessages, key)) {
              curMessages[key] = message[key];
            }
          });
        }
      } else
      {
        this.messages[locale] = message;
      }
    } }, { key: "f", value: function f(
    message, values, delimiters) {
      return this.formater.interpolate(message, values, delimiters).join('');
    } }, { key: "t", value: function t(
    key, locale, values) {
      var message = this.message;
      if (typeof locale === 'string') {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else
      {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn("Cannot translate the value of keypath ".concat(key, ". Use the value of keypath as default."));
        return key;
      }
      return this.formater.interpolate(message[key], values).join('');
    } }]);return I18n;}();exports.I18n = I18n;


function watchAppLocale(appVm, i18n) {
  // 需要保证 watch 的触发在组件渲染之前
  if (appVm.$watchLocale) {
    // vue2
    appVm.$watchLocale(function (newLocale) {
      i18n.setLocale(newLocale);
    });
  } else
  {
    appVm.$watch(function () {return appVm.$locale;}, function (newLocale) {
      i18n.setLocale(newLocale);
    });
  }
}
function getDefaultLocale() {
  if (typeof uni !== 'undefined' && uni.getLocale) {
    return uni.getLocale();
  }
  // 小程序平台，uni 和 uni-i18n 互相引用，导致访问不到 uni，故在 global 上挂了 getLocale
  if (typeof global !== 'undefined' && global.getLocale) {
    return global.getLocale();
  }
  return LOCALE_EN;
}
function initVueI18n(locale) {var messages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var fallbackLocale = arguments.length > 2 ? arguments[2] : undefined;var watcher = arguments.length > 3 ? arguments[3] : undefined;
  // 兼容旧版本入参
  if (typeof locale !== 'string') {var _ref4 =
    [
    messages,
    locale];locale = _ref4[0];messages = _ref4[1];

  }
  if (typeof locale !== 'string') {
    // 因为小程序平台，uni-i18n 和 uni 互相引用，导致此时访问 uni 时，为 undefined
    locale = getDefaultLocale();
  }
  if (typeof fallbackLocale !== 'string') {
    fallbackLocale =
    typeof __uniConfig !== 'undefined' && __uniConfig.fallbackLocale ||
    LOCALE_EN;
  }
  var i18n = new I18n({
    locale: locale,
    fallbackLocale: fallbackLocale,
    messages: messages,
    watcher: watcher });

  var _t = function t(key, values) {
    if (typeof getApp !== 'function') {
      // app view
      /* eslint-disable no-func-assign */
      _t = function t(key, values) {
        return i18n.t(key, values);
      };
    } else
    {
      var isWatchedAppLocale = false;
      _t = function t(key, values) {
        var appVm = getApp().$vm;
        // 可能$vm还不存在，比如在支付宝小程序中，组件定义较早，在props的default里使用了t()函数（如uni-goods-nav），此时app还未初始化
        // options: {
        // 	type: Array,
        // 	default () {
        // 		return [{
        // 			icon: 'shop',
        // 			text: t("uni-goods-nav.options.shop"),
        // 		}, {
        // 			icon: 'cart',
        // 			text: t("uni-goods-nav.options.cart")
        // 		}]
        // 	}
        // },
        if (appVm) {
          // 触发响应式
          appVm.$locale;
          if (!isWatchedAppLocale) {
            isWatchedAppLocale = true;
            watchAppLocale(appVm, i18n);
          }
        }
        return i18n.t(key, values);
      };
    }
    return _t(key, values);
  };
  return {
    i18n: i18n,
    f: function f(message, values, delimiters) {
      return i18n.f(message, values, delimiters);
    },
    t: function t(key, values) {
      return _t(key, values);
    },
    add: function add(locale, message) {var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      return i18n.add(locale, message, override);
    },
    watch: function watch(fn) {
      return i18n.watchLocale(fn);
    },
    getLocale: function getLocale() {
      return i18n.getLocale();
    },
    setLocale: function setLocale(newLocale) {
      return i18n.setLocale(newLocale);
    } };

}

var isString = function isString(val) {return typeof val === 'string';};exports.isString = isString;
var formater;
function hasI18nJson(jsonObj, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  return walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        return true;
      }
    } else
    {
      return hasI18nJson(value, delimiters);
    }
  });
}
function parseI18nJson(jsonObj, values, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        jsonObj[key] = compileStr(value, values, delimiters);
      }
    } else
    {
      parseI18nJson(value, values, delimiters);
    }
  });
  return jsonObj;
}
function compileI18nJsonStr(jsonStr, _ref5) {var locale = _ref5.locale,locales = _ref5.locales,delimiters = _ref5.delimiters;
  if (!isI18nStr(jsonStr, delimiters)) {
    return jsonStr;
  }
  if (!formater) {
    formater = new BaseFormatter();
  }
  var localeValues = [];
  Object.keys(locales).forEach(function (name) {
    if (name !== locale) {
      localeValues.push({
        locale: name,
        values: locales[name] });

    }
  });
  localeValues.unshift({ locale: locale, values: locales[locale] });
  try {
    return JSON.stringify(compileJsonObj(JSON.parse(jsonStr), localeValues, delimiters), null, 2);
  }
  catch (e) {}
  return jsonStr;
}
function isI18nStr(value, delimiters) {
  return value.indexOf(delimiters[0]) > -1;
}
function compileStr(value, values, delimiters) {
  return formater.interpolate(value, values, delimiters).join('');
}
function compileValue(jsonObj, key, localeValues, delimiters) {
  var value = jsonObj[key];
  if (isString(value)) {
    // 存在国际化
    if (isI18nStr(value, delimiters)) {
      jsonObj[key] = compileStr(value, localeValues[0].values, delimiters);
      if (localeValues.length > 1) {
        // 格式化国际化语言
        var valueLocales = jsonObj[key + 'Locales'] = {};
        localeValues.forEach(function (localValue) {
          valueLocales[localValue.locale] = compileStr(value, localValue.values, delimiters);
        });
      }
    }
  } else
  {
    compileJsonObj(value, localeValues, delimiters);
  }
}
function compileJsonObj(jsonObj, localeValues, delimiters) {
  walkJsonObj(jsonObj, function (jsonObj, key) {
    compileValue(jsonObj, key, localeValues, delimiters);
  });
  return jsonObj;
}
function walkJsonObj(jsonObj, walk) {
  if (isArray(jsonObj)) {
    for (var i = 0; i < jsonObj.length; i++) {
      if (walk(jsonObj, i)) {
        return true;
      }
    }
  } else
  if (isObject(jsonObj)) {
    for (var key in jsonObj) {
      if (walk(jsonObj, key)) {
        return true;
      }
    }
  }
  return false;
}

function resolveLocale(locales) {
  return function (locale) {
    if (!locale) {
      return locale;
    }
    locale = normalizeLocale(locale) || locale;
    return resolveLocaleChain(locale).find(function (locale) {return locales.indexOf(locale) > -1;});
  };
}
function resolveLocaleChain(locale) {
  var chain = [];
  var tokens = locale.split('-');
  while (tokens.length) {
    chain.push(tokens.join('-'));
    tokens.pop();
  }
  return chain;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"], __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 2)))

/***/ }),
/* 5 */
/*!******************************************************!*\
  !*** /Applications/project/uniapp-sample/pages.json ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 12 */
/*!*******************************************************!*\
  !*** /Applications/project/uniapp-sample/common.scss ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */
/*!*********************************************************!*\
  !*** /Applications/project/uniapp-sample/utils/util.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.sharePage = sharePage;exports.format = exports.formatTime = void 0;var formatNumber = function formatNumber(n) {
  var m = n.toString();
  return m[1] ? m : '0' + m;
};


// @ts-ignore
Date.prototype.format = function (fmt) {
  var o = {
    'M+': this.getMonth() + 1, //月份
    'd+': this.getDate(), //日
    'h+': this.getHours(), //小时
    'm+': this.getMinutes(), //分
    's+': this.getSeconds(), //秒
    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
    'S': this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      // @ts-ignore
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
    }
  }
  return fmt;
};

function add0(m) {
  return m < 10 ? '0' + m : m;
}


var formatTime = function formatTime(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':');
};exports.formatTime = formatTime;

var format = function format(timestamp) {
  var time = new Date(timestamp);
  var h = time.getHours();
  var mm = time.getMinutes();
  var s = time.getSeconds();
  return add0(h) + ':' + add0(mm) + ':' + add0(s);
};exports.format = format;

function sharePage(param) {

  var paramArr = [];
  if (param && typeof param == 'object') {
    for (var key in param) {
      paramArr.push(key + '=' + param[key]);
    }
  }


  return {
    title: '即构音视频云',
    path: getCurrentPages().pop().route + '?' + paramArr.join('&'),
    imageUrl: '/resource/share.png' };

}

/***/ }),
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 29);

/***/ }),
/* 29 */
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 30);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),
/* 30 */
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),
/* 31 */
/*!***********************************************************!*\
  !*** /Applications/project/uniapp-sample/utils/common.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports._checkParam = exports.authCheck = exports.stopPlayAll = exports.setPlayUrl = exports.startPush = exports.playAll = exports.initSDK = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 28));
var _zegoExpressEngineMiniprogram = __webpack_require__(/*! zego-express-engine-miniprogram */ 32);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}

var app = getApp();

var zg;

var initSDK = function initSDK(context) {
  if (!_checkParam(app.globalData.zegoAppID, app.globalData.server)) return false;
  /** 初始化SDK，userID 为用户自定义ID，全局唯一 */
  zg = new _zegoExpressEngineMiniprogram.ZegoExpressEngine(app.globalData.zegoAppID, app.globalData.server);

  console.log('version', zg.getVersion());
  zg.setDebugVerbose(false);
  authCheck(context);

  // console.log(this);
  zg.on("roomStreamUpdate", function (roomID, updateType, streamList) {
    debugger;
    console.log("roomStreamUpdate", roomID, updateType, streamList);
    if (updateType === "ADD") {
      context.streamList = streamList;
      playAll(streamList, context);
    } else {
      stopPlayAll(streamList, context);
    }
  });
  // the event is triggered when one join or leave the room
  zg.on("roomUserUpdate", function (roomID, updateType, userList) {
    console.log(
    "roomID: ",
    roomID,
    " updateType: ",
    updateType === "ADD" ? "join" : "leave",
    " userList: ",
    userList);

    var roomUserList = context.roomUserList;
    if (updateType === "DELETE") {
      userList.forEach(function (user) {
        var i = roomUserList.findIndex(function (item) {return item.userID === user.userID;});
        roomUserList.splice(i, 1);
      });
    } else if (updateType === "ADD") {
      userList.forEach(function (user) {
        if (user.userID !== context.userID) {
          roomUserList.push(user);
        }
      });
    }
    context.roomUserList = roomUserList;
  });
  zg.on("roomStateUpdate", function (roomID, state, errorCode, extendedData) {
    console.log("roomStateUpdate", roomID, state, errorCode, extendedData);
    if (state === "DISCONNECTED") {
      context.connectType = 0;
    }
  });
  zg.on("publisherStateUpdate", function (result) {
    console.error("publishStateUpdate", result);
  });
  zg.on("playerStateUpdate", function (result) {
    console.log("playStateUpdate", result);
  });
  zg.on("publishQualityUpdate", function (streamID, publishStats) {
    console.log("publishQualityUpdate", streamID, publishStats);
  });
  zg.on("playQualityUpdate", function (streamID, playStats) {
    console.log("playQualityUpdate", streamID, playStats);
  });
  zg.on("roomOnlineUserCountUpdate", function (roomID, userCount) {
    console.error("roomOnlineUserCountUpdate", roomID, userCount);
  });
  zg.on("recvReliableMessage", function (roomID, userCount, trans_type) {
    console.error("recvReliableMessage", roomID, userCount, trans_type);
  });
  zg.on("tokenWillExpire", function (roomID) {
    console.error("tokenWillExpire", roomID);
  });

  return zg;
};exports.initSDK = initSDK;

var playAll = /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(streamList, context) {var i, _yield$zg$startPlayin, streamID, url;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
            console.log("streamList", streamList);if (!(
            streamList.length === 0)) {_context.next = 4;break;}
            console.log("startPlayingStream, streamList is null");return _context.abrupt("return");case 4:




            i = 0;case 5:if (!(i < streamList.length)) {_context.next = 22;break;}_context.prev = 6;_context.next = 9;return (





              zg.startPlayingStream(
              streamList[i].streamID, {
                sourceType: "BGP" }));case 9:_yield$zg$startPlayin = _context.sent;streamID = _yield$zg$startPlayin.streamID;url = _yield$zg$startPlayin.url;


            console.log("streamID", streamID, url);
            setPlayUrl(streamID, url, context);_context.next = 19;break;case 16:_context.prev = 16;_context.t0 = _context["catch"](6);

            console.error("error", _context.t0);case 19:i++;_context.next = 5;break;case 22:case "end":return _context.stop();}}}, _callee, null, [[6, 16]]);}));return function playAll(_x, _x2) {return _ref.apply(this, arguments);};}();exports.playAll = playAll;




var startPush = /*#__PURE__*/function () {var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2(context, publishOption) {var _yield$zg$startPublis, url;return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.prev = 0;_context2.next = 3;return (


              zg.startPublishingStream(context.pushStreamID, publishOption));case 3:_yield$zg$startPublis = _context2.sent;url = _yield$zg$startPublis.url;
            console.info('startPush', url);
            context.livePusherUrl = url;
            context.livePusher = uni.createLivePusherContext();
            context.livePusher.start();_context2.next = 14;break;case 11:_context2.prev = 11;_context2.t0 = _context2["catch"](0);

            console.error("error", _context2.t0);case 14:case "end":return _context2.stop();}}}, _callee2, null, [[0, 11]]);}));return function startPush(_x3, _x4) {return _ref2.apply(this, arguments);};}();exports.startPush = startPush;



var setPlayUrl = function setPlayUrl(streamID, url, context) {
  if (!url) {
    console.log(">>>[liveroom-room] setPlayUrl, url is null");
    return;
  }
  console.log("setPlayUrl", streamID, url);
  for (var i = 0; i < context.livePlayerList.length; i++) {
    if (
    context.livePlayerList[i]["streamID"] === streamID &&
    context.livePlayerList[i]["url"] === url)
    {
      console.log(
      ">>>[liveroom-room] setPlayUrl, streamID and url are repeated");

      return;
    }
  }

  var streamInfo = {
    streamID: "",
    url: "" };

  var isStreamRepeated = false;

  // 相同 streamID 的源已存在，更新 Url
  for (var _i = 0; _i < context.livePlayerList.length; _i++) {
    if (context.livePlayerList[_i]["streamID"] === streamID) {
      isStreamRepeated = true;
      context.livePlayerList[_i]["url"] = url;
      break;
    }
  }

  // 相同 streamID 的源不存在，创建新 player
  if (!isStreamRepeated) {
    streamInfo["streamID"] = streamID;
    streamInfo["url"] = url;
    streamInfo["playerContext"] = uni.createLivePlayerContext(streamID);
    context.livePlayerList.push(streamInfo);
  }
  app.globalData.livePlayerList = context.livePlayerList;
  context.livePlayerList = context.livePlayerList;
  context.addStreamRefer && context.addStreamRefer();
};exports.setPlayUrl = setPlayUrl;

var stopPlayAll = function stopPlayAll(streamList, context) {
  if (streamList.length === 0) {
    console.log("stopPlayAll, streamList is empty");
    return;
  }
  var playStreamList = context.livePlayerList;
  for (var i = 0; i < streamList.length; i++) {
    var streamID = streamList[i].streamID;
    zg.stopPlayingStream(streamID);
    // 把远程被删除的流从播放的流列表中删除
    for (var j = 0; j < playStreamList.length; j++) {
      if (playStreamList[j]["streamID"] === streamID) {
        playStreamList.splice(j, 1);
        break;
      }
    }
  }
  context.livePlayerList = playStreamList;
};exports.stopPlayAll = stopPlayAll;

var authCheck = /*#__PURE__*/function () {var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3(context) {var result, hasCamera, hasRecord;return _regenerator.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:if (
            zg) {_context3.next = 2;break;}return _context3.abrupt("return");case 2:_context3.next = 4;return (
              zg.checkSystemRequirements());case 4:result = _context3.sent;
            console.log("checkSystemRequirements", result);
            if (result.code === 10001) {
              console.log("result ", result.code);
              uni.showModal({
                title: "提示",
                content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后再试。",
                showCancel: false });

              context.canShow = 0;
            } else if (result.code === 10002) {
              console.log("result ", result.code);
              hasCamera = false;
              hasRecord = false;
              uni.authorize({
                scope: "scope.camera",
                success: function success() {
                  hasCamera = true;
                  context.canShow = hasRecord ? 1 : 0;
                },
                fail: function fail() {
                  hasCamera = false;
                  context.canShow = 0;
                } });


              uni.authorize({
                scope: "scope.record",
                success: function success() {
                  hasRecord = true;
                  context.canShow = hasCamera ? 1 : 0;
                },
                fail: function fail() {
                  hasRecord = false;
                  context.canShow = 0;
                } });

            } else {
              context.canShow = 1;
            }case 7:case "end":return _context3.stop();}}}, _callee3);}));return function authCheck(_x5) {return _ref3.apply(this, arguments);};}();exports.authCheck = authCheck;


var _checkParam = function _checkParam(zegoAppID, server) {
  if (!zegoAppID) {
    uni.showToast({
      title: "\u8BF7\u5728app.js\u4E2D\u63D0\u4F9B\u6B63\u786E\u7684zegoAppID",
      icon: 'none',
      duration: 5000 });

    console.error('未设置正确的zegoAppID');
    return false;
  }
  if (!server) {
    uni.showToast({
      title: "\u8BF7\u5728app.js\u4E2D\u63D0\u4F9B\u6B63\u786E\u7684server",
      icon: 'none',
      duration: 5000 });

    console.error('未设置正确的server');
    return false;
  }
  return true;
};exports._checkParam = _checkParam;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 32 */
/*!******************************************************************************************************************!*\
  !*** /Applications/project/uniapp-sample/node_modules/zego-express-engine-miniprogram/ZegoExpressMiniProgram.js ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function (e, t) {if (true) module.exports = t();else { var o, r; }}("undefined" != typeof self ? self : this, function () {return e = { 165: function _(e, t, r) {"use strict";var _o,s = this && this.__extends || (_o = function o(e, t) {return _o = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (e, t) {e.__proto__ = t;} || function (e, t) {for (var r in t) {Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);}}, _o(e, t);}, function (e, t) {function r() {this.constructor = e;}_o(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r());});Object.defineProperty(t, "__esModule", { value: !0 }), t.ZegoExpressEngine = void 0;var i = r(706),n = r(130),a = function (e) {function t(t, r, o) {var s = this;return i.ZegoExpressWebRTMEngine.version = "2.10.4", (s = e.call(this, t, r, 1) || this).zegoWechatMini = new n.ZegoWechatMini(s.logger, s.dataReport, s.zegoWebRTM), s;}return s(t, e), t.prototype.getNextUrl = function (e) {return this.zegoWechatMini.getNextUrl(e);}, t.prototype.startPlayingStream = function (e, t) {return this.zegoWechatMini.startPlayingStream(e, t);}, t.prototype.stopPlayingStream = function (e) {return this.zegoWechatMini.stopPlayingStream(e);}, t.prototype.updatePlayerNetStatus = function (e, t) {return this.zegoWechatMini.updatePlayerNetStatus(e, t);}, t.prototype.updatePlayerState = function (e, t) {return this.zegoWechatMini.updatePlayerState(e, t);}, t.prototype.updateAudioVolumeNotify = function (e, t) {return this.zegoWechatMini.updateAudioVolumeNotify(e, t);}, t.prototype.checkSystemRequirements = function () {return this.zegoWechatMini.checkSystemRequirements();}, t.prototype.setMixerTaskConfig = function (e) {return this.zegoWechatMini.setMixerTaskConfig(e);}, t.prototype.startPublishingStream = function (e, t) {return this.zegoWechatMini.startPublishingStream(e, t);}, t.prototype.startMixerTask = function (e) {return this.zegoWechatMini.startMixerTask(e);}, t.prototype.stopPublishingStream = function (e) {return this.zegoWechatMini.stopPublishingStream(e);}, t.prototype.addPublishCdnUrl = function (e, t) {return 3 === arguments.length ? this.zegoWechatMini.addPublishCdnUrl(arguments[0], arguments[2]) : this.zegoWechatMini.addPublishCdnUrl(e, t);}, t.prototype.off = function (e, t) {return this.zegoWebRTM.stateCenter.listenerList[e] ? this.zegoWebRTM.off(e, t) : !!this.zegoWechatMini.stateCenter.listenerList[e] && this.zegoWechatMini.off(e, t);}, t.prototype.stopMixerTask = function (e) {return this.zegoWechatMini.stopMixerTask(e);}, t.prototype.on = function (e, t) {return this.zegoWebRTM.stateCenter.listenerList[e] ? this.zegoWebRTM.on(e, t) : !!this.zegoWechatMini.stateCenter.listenerList[e] && this.zegoWechatMini.on(e, t);}, t.prototype.removePublishCdnUrl = function (e, t) {return 3 === arguments.length ? this.zegoWechatMini.removePublishCdnUrl(arguments[0], arguments[2]) : this.zegoWechatMini.removePublishCdnUrl(e, t);}, t.prototype.setStreamExtraInfo = function (e, t) {return this.zegoWechatMini.setStreamExtraInfo(e, t);}, t.prototype.initContext = function (e) {this.zegoWechatMini.initContext(e);}, t.prototype.createPusher = function (e) {return this.zegoWechatMini.createPusher(e);}, t.prototype.getPusherInstance = function () {return this.zegoWechatMini.getPusherInstance();}, t.prototype.getPlayerInstance = function (e, t) {return this.zegoWechatMini.getPlayerInstance(e, t);}, t.prototype.mutePublishStreamVideo = function (e) {this.zegoWechatMini.mutePublishStreamVideo(e);}, t.prototype.mutePublishStreamAudio = function (e) {this.zegoWechatMini.mutePublishStreamAudio(e);}, t.prototype.mutePlayStreamVideo = function (e, t) {this.zegoWechatMini.mutePlayStreamVideo(e, t);}, t.prototype.mutePlayStreamAudio = function (e, t) {this.zegoWechatMini.mutePlayStreamAudio(e, t);}, t.prototype.setPusherAttributes = function (e) {this.zegoWechatMini.setPusherAttributes(e);}, t.prototype.setPlayerAttributes = function (e, t) {this.zegoWechatMini.setPlayerAttributes(e, t);}, t.prototype.getPlayerList = function (e) {return this.zegoWechatMini.getPlayerList(e);}, t;}(i.ZegoExpressWebRTMEngine);t.ZegoExpressEngine = a;}, 89: function _(e, t) {"use strict";var r, o;Object.defineProperty(t, "__esModule", { value: !0 }), t.ZEGO_WECHATMINI_ACTION = t.ZEGO_WEBRTC_ACTION = void 0, (o = t.ZEGO_WEBRTC_ACTION || (t.ZEGO_WEBRTC_ACTION = {})).CONSTRUCTOR = "zc.0", o.CHECK_SUPPORT = "zc.csr", o.CREATE_STREAM = "zc.cs", o.DESTROY_STREAM = "zc.ds", o.START_PUBLISHING_STREAM = "zc.sps.0", o.START_PLAYING_STREAM = "zc.sps.1", o.STOP_PUBLISHING_STREAM = "zc.sps.0.0", o.STOP_PLAYING_STREAM = "zc.sps.1.0", o.ON_STREAM = "zc.os", o.ON_PUSH_STREAM_UPDATE = "zc.opsu", o.ACTIVATE_SEI_INSERT = "zc.asi", o.BIND_WINDOW_LISTENER = "zc.wl", o.MUTE_PUBLISH_STREAM_VIDEO = "zc.mpsv.0", o.MUTE_PUBLISH_STREAM_AUDIO = "zc.mpsa.0", o.MUTE_MIC = "zc.mm", o.MUTE_PLAY_STREAM_VIDEO = "zc.mpsv.1", o.MUTE_PLAY_STREAM_AUDIO = "zc.mpsa.1", o.SET_AUDIO_OUTPUT = "zc.sao", o.SET_CUSTOM_SIGNAL_URL = "zc.scsu", o.SET_TURN_OVER_TCP_ONLY = "zc.stoto", o.SET_VIDEO_CONFIG = "zc.svc", o.SET_AUDIO_CONFIG = "zc.sac", o.REPLACE_TRACK = "zc.rp", o.PRELOAD_EFFECT = "zc.pe.0", o.PLAY_EFFECT = "zc.pe.1", o.PAUSE_EFFECT = "zc.pe.2", o.RESUME_EFFECT = "zc.re", o.STOP_EFFECT = "zc.se", o.UNLOAD_EFFECT = "zc.ue", o.SET_EFFECT_VOLUME = "zc.sev", o.START_MIXING_AUDIO = "zc.sma.0", o.STOP_MIXING_AUDIO = "zc.sma.1", o.MIXING_BUFFER = "zc.mb", o.STOP_MIXING_BUFFER = "zc.smb", o.SET_MIXING_AUDIO_VOLUME = "zc.smav", o.ENABLE_STREAM = "zc.es", o.ENABLE_MIC_ONLY = "zc.emo", o.RDH_ACTIVE = "zc.rdh.a", o.RDH_MAX_TIME = "zc.rdh.m", o.RDH_WEBRTC_URL_RSP = "zc.rdh.hfwur", o.PUBLISH_STATE_HANDLE = "zc.psh.0", o.PLAY_STATE_HANDLE = "zc.psh.1", o.STATECENTER_ACTION_LISTENER = "zc.sc.al", o.SIGNAL_SET_SESSION_INFO = "zc.s.ssi", o.SIGNAL_RESET_CONNECT_TIMER = "zc.s.rct", o.SIGNAL_BIND_WEBSOCKET_HANDLE = "zc.s.bwh", o.SIGNAL_RESET_CHECK_MESSAGE = "zc.s.rcm", o.SIGNAL_UPDATE_TOKEN = "zc.s.ut", o.SIGNAL_SEND_MESSAGE_WITH_CALLBACK = "zc.s.smwc", o.SIGNAL_CONNECT_SERVER = "zc.s.cs.0", o.SIGNAL_START_CONNECT_TIMER = "zc.s.sct", o.SIGNAL_DISCONNECT_SERVER = "zc.s.dc", o.SIGNAL_CREATE_SESSION = "zc.s.cs.1", o.SIGNAL_REMOVE_SESSION = "zc.s.rs", o.SIGNAL_SEND_REMOVE_SESSION = "zc.s.srs", o.SIGNAL_SEND_MESSAGE = "zc.s.sm", o.SIGNAL_HANDLE_RESPOND_DATA = "zc.s.hrd", o.SIGNAL_ADD_SESSION = "zc.s.as", o.SIGNAL_HANDLE_PUSH_DATA = "zc.s.hpd", o.SIGNAL_HANDLE_PUSH_RESET_SESSION_DATA = "zc.s.hprsd", o.SIGNAL_SEND_MEDIA_DESC = "zc.s.smd", o.SIGNAL_SEND_CANDIDATE_INFO = "zc.s.sci", o.SIGNAL_SEND_MEDIA_DESC_ACK = "zc.s.smda", o.SIGNAL_SEND_CANDIDATE_INFO_ACK = "zc.s.scia", o.SIGNAL_SEND_CLOSE_SESSION_ACK = "zc.s.scsa", o.SIGNAL_SEND_RESET_SESSION_ACK = "zc.s.srsa", o.SIGNAL_REGISTER_PUSH_CALLBACK = "zc.s.rpc", o.SIGNAL_CHECK_MESSAGE_TIMEOUT = "zc.s.cmt", o.SIGNAL_SEND_HEARTBEAT = "zc.s.sh", o.SIGNAL_QUALITY_REPORT = "zc.s.qr", o.SIGNAL_SEND_STREAM_STATUS = "zc.s.sss", o.SIGNAL_ACTIVE_PLAY_VIDEO_STREAM = "zc.s.apvs", o.SIGNAL_ACTIVE_PLAY_AUDIO_STREAM = "zc.s.apas", o.SIGNAL_SEND_BROADCAST_STATUS = "zc.s.sbs", o.SIGNAL_SEND_NET_PROBE = "zc.s.snp", o.SIGNAL_SEND_NET_QUALITY_INFO_PUSH_ACK = "zc.s.npa", o.PUBLISHER_START_PUBLISH = "zc.p.0.sp.0", o.PUBLISHER_PUBLISH_SUCCESS = "zc.p.ps", o.PUBLISHER_ON_CREATE_PUBLISH_SESSION_SUCCESS = "zc.p.0.ocpss", o.PUBLISHER_HANDLE_CREATE_SESSION_WITH_SDP = "zc.p.0.hcsws", o.PUBLISHER_ON_CREATE_OFFER_SUCCESS = "zc.p.0.ocos", o.PUBLISHER_ON_SET_LOCAL_DESCRIPTION_SUCCESS = "zc.p.0.oslds", o.PUBLISHER_ON_GET_REMOTE_DESCRIPTION = "zc.p.0.ogrd", o.PUBLISHER_ON_RECV_MEDIA_DESC = "zc.p.0.ormd", o.PUBLISHER_ON_RECV_CANDIDATE_INFO = "zc.p.0.orci.0", o.PUBLISHER_ON_RECV_PUBLISH_EVENT = "zc.p.0.orpe", o.PUBLISHER_ON_RECV_CLIENT_INFO = "zc.p.0.orci.1", o.PUBLISHER_ON_ICE_CANDIDATE = "zc.p.0.oic", o.PUBLISHER_ON_CONNECTION_STATE_CHANGE = "zc.p.0.ocsc", o.PUBLISHER_ON_ICE_CONNECTION_STATE_CHANGE = "zc.p.0.oicsc", o.PUBLISHER_RESET_PUBLISH = "zc.p.0.rp", o.PUBLISHER_SET_PLAYER_QUALITY_TIMER = "zc.p.0.spqt", o.PUBLISHER_UPLOAD_PUBLISH_QUALITY = "zc.p.0.upq", o.PUBLISHER_ON_RECV_RESET_SESSION = "zc.p.0.orrs", o.PUBLISHER_ON_RECV_CLOSE_SESSION = "zc.p.0.orcs", o.PUBLISHER_SEND_CANDIDATE_INFO = "zc.p.0.sci", o.PUBLISHER_STATE_ERROR = "zc.p.0.psr", o.PUBLISHER_STOP_PUBLISH = "zc.p.0.sp.1", o.PUBLISHER_ON_DISCONNECT = "zc.p.0.od", o.PUBLISHER_START_SOUND_LEVEL = "zc.p.0.ssl.0", o.PUBLISHER_STOP_SOUND_LEVEL = "zc.p.0.ssl.1", o.PUBLISHER_PLAY_EFFECT = "zc.p.0.pe.0", o.PUBLISHER_PAUSE_EFFECT = "zc.p.0.pe.1", o.PUBLISHER_RESUME_EFFECT = "zc.p.0.re", o.PUBLISHER_STOP_EFFECT = "zc.p.0.se", o.PUBLISHER_START_MIXING_AUDIO = "zc.p.0.sma.0", o.PUBLISHER_STOP_MIXING_AUDIO = "zc.p.0.sma.1", o.PUBLISHER_MIXING_BUFFER = "zc.p.0.mb", o.PUBLISHER_SET_MIXING_AUDIO_VOLUME = "zc.p.0.smav", o.PUBLISHER_HANDLE_ENC_BITRATE = "zc.p.0.heb", o.PUBLISHER_ON_RECV_NET_QUALITY_INFO = "zc.p.0.nqi", o.PLAYER_START_PLAY = "zc.p.1.sp.0", o.PLAYER_ON_CREATE_PLAY_SESSION_SUCCESS = "zc.p.ocpss.1", o.PLAYER_HANDLE_CREATE_SESSION_WITH_SDP = "zc.p.hcsws.1", o.PLAYER_ON_CREATE_OFFER_SUCCESS = "zc.p.ocos.1", o.PLAYER_ON_SET_LOCAL_DESCRIPTION_SUCCESS = "zc.p.oslds.1", o.PLAYER_ON_RECV_MEDIA_DESC = "zc.p.ormd.1", o.PLAYER_ON_RECV_CANDIDATE_INFO = "zc.p.orci.1", o.PLAYER_ON_RECV_PLAY_EVENT = "zc.p.orpe.1", o.PLAYER_ON_RECV_CLIENT_INFO = "zc.p.orci.1.1", o.PLAYER_ON_ICE_CANDIDATE = "zc.p.oic.1", o.PLAYER_ON_CONNECTION_STATE_CHANGE = "zc.p.ocsc.1", o.PLAYER_ON_ICE_CONNECTION_STATE_CHANGE = "zc.p.oicsc.1", o.PLAYER_RESET_PLAY = "zc.p.rp.1", o.PLAYER_SET_PLAYER_QUALITY_TIMER = "zc.p.spqt.1", o.PLAYER_UPLOAD_PLAYER_QUALITY = "zc.p.upq.1", o.PLAYER_ON_RECV_RESET_SESSION = "zc.p.orrs.1", o.PLAYER_ON_RECV_CLOSE_SESSION = "zc.p.orcs.1", o.PLAYER_ON_RECV_STREAM_STATUS = "zc.p.orss.1", o.PLAYER_ON_GOT_REMOTE_STREAM = "zc.p.ogrs.1", o.PLAYER_SEND_CANDIDATE_INFO = "zc.p.sci.1", o.PLAYER_STATE_ERROR = "zc.p.psr.1", o.PLAYER_STOP_PLAY = "zc.p.1.sp.1", o.PLAYER_ON_DISCONNECT = "zc.p.od.1", o.PLAYER_START_SOUND_LEVEL = "zc.p.ssl.1", o.PLAYER_STOP_SOUND_LEVEL = "zc.p.ssl.1.1", o.PLAYER_ON_RECV_NET_QUALITY_INFO = "zc.p.1.nqi", o.PUBLISH_SET_CAPTURE_VOLUME = "zc.p.scv", o.STREAMHANDLER_MERGE_STREAM_BY_STREAM_SEQ = "zc.sh.msbss", o.STREAMHANDLER_MERGE_STREAM = "zc.sh.ms", o.STREAMHANDLER_PATCH_STREAM_LIST = "zc.sh.psl", (r = t.ZEGO_WECHATMINI_ACTION || (t.ZEGO_WECHATMINI_ACTION = {})).ADD_PUBLISH_CDN_URL = "zw.apcu", r.REMOVE_PUBLISH_CDN_URL = "zw.rpcu", r.STOP_MIXER_TASK = "zw.smt", r.ON_STREAM = "zw.os", r.ON_PUSH_STREAM_UPDATE = "zw.opsu", r.ON_PUBLISH_STATE_UPDATE = "zw.w.opsu", r.ON_PUBLISH_STATE_UPDATE_HANDLE = "zw.w.opsuh", r.WECHATMINI_SETPREFERPLAYSOURCETYPE = "zw.w.sppst.1", r.WECHATMINI_BIND_LISTENER = "zw.w.bl", r.WECHATMINI_DELETE_LISTENER = "zw.w.dl", r.WECHATMINI_UPDATE_PLAYER_STATE = "zw.w.ups", r.WECHATMINI_UPDATE_PLAYER_NET_STATUS = "zw.w.upns", r.WECHATMINI_UPDATE_PLAYER_VOLUME_NOTIFY = "zw.w.upvn", r.WECHATMINI_SET_CUSTOM_SIGNAL_URL = "zw.w.scsu", r.WECHATMINI_GET_NEXT_URL = "zw.w.gnu", r.WECHATMINI_BIND_STREAM_CENTER_HANDLER = "zw.w.bsch", r.WECHATMINI_BIND_RTM_LISTENER = "zw.w.brl", r.PUBLISHMODULE_SET_PREFER_PUBLISH_SOURCE_TYPE = "zw.pu.sppst.0", r.PUBLISHMODULE_START_PUBLISHING_STREAM = "zw.pu.sps.0", r.PUBLISHMODULE_STOP_PUBLISHING_STREAM = "zw.pu.sps.0.0", r.PUBLISHMODULE_FETCH_PUBLISH_STREAM_URL = "zw.pu.fpsu.0", r.PUBLISHMODULE_HANDLE_FETCH_STREAM_PUBLISH_URL_RSP = "zw.pu.hfspur.0", r.PUBLISHMODULE_DO_PUBLISH_STREAM = "zw.pu.dps.0", r.PUBLISHMODULE_UPDATE_STREAM_INFO = "zw.pu.upi", r.PUBLISHMODULE_HANDLE_STREAM_UPDATE_RSP = "zw.pu.hsur", r.PLAYMODULE_START_PLAYING_STREAM = "zw.pl.sps.1", r.PLAYMODULE_STOP_PLAYING_STREAM = "zw.pl.sps.1.0", r.PLAYMODULE_START_PLAYING_STREAM_FROM_CDN = "zw.pl.spsfc", r.PLAYMODULE_START_PLAYING_STREAM_FROM_BGP = "zw.pl.spsfb", r.PLAYMODULE_DO_PLAY_STREAM = "zw.pl.dps", r.PLAYMODULE_FETCH_PLAY_STREAM_URL = "zw.pl.fpsu", r.PLAYMODULE_HANDLE_FETCH_STREAM_URL_RSP = "zw.pl.hfsur", r.STREAMCENTERWECHAT_RESET = "zw.scw.r.0", r.STREAMCENTERWECHAT_START_PUBLISHING_STREAM = "zw.scw.sps.0", r.STREAMCENTERWECHAT_START_PLAYING_STREAM = "zw.scw.sps.1", r.STREAMCENTERWECHAT_START_PLAYER = "zw.scw.sp.0", r.STREAMCENTERWECHAT_ON_STREAM_URL_UPDATE = "zw.scw.opuu.0", r.STREAMCENTERWECHAT_UPDATE_PLAYER_STATE = "zw.scw.ups.0", r.STREAMCENTERWECHAT_UPDATE_PLAYER_NET_STATUS = "zw.scw.upns", r.STREAMCENTERWECHAT_UPDATE_PUBLISHING_STATE = "zw.scw.ups.0.0", r.STREAMCENTERWECHAT_UPDATE_PLAYING_STATE = "zw.scw.ups.1.0", r.STREAMCENTERWECHAT_GET_NEXT_URL = "zw.scw.gnu", r.STREAMCENTERWECHAT_STOP_PUBLISHING_STREAM = "zw.scw.sps.0.0", r.STREAMCENTERWECHAT_STOP_PLAYING_STREAM = "zw.scw.sps.1.0", r.STREAMCENTERWECHAT_STOP_PLAYER = "zw.scw.sp.1", r.STREAMCENTERWECHAT_ON_PLAY_START = "zw.scw.ops.0", r.STREAMCENTERWECHAT_ON_PLAY_STOP = "zw.scw.ops.1", r.STREAMCENTERWECHAT_ON_PLAY_RETRY = "zw.scw.opr", r.PLAYWECHAT_TRY_START_PLAYER = "zw.pw.tsp.0", r.PLAYWECHAT_UPDATE_EVENT = "zw.pw.ue", r.PLAYWECHAT_GET_PLAY_URL = "zw.pw.gpu";}, 325: function _(e, t, r) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.StateCenter = void 0;var o = r(706),s = r(89),i = r(706),n = r(529),a = function () {function e(e, t) {this.logger = e, this.dataReport = t, this.debug = !1, this.testEnvironment = !1, this.pullLimited = !0, this.configOK = !1, this.relateService = [], this.role = 2, this.maxMemberCount = 0, this.roomCreateFlag = 1, this.callbackList = {}, this.publishStreamList = {}, this.streamUrlMap = {}, this.cmdCallback = {}, this.customUrl = [], this.customPlayUrl = [], this.turnOverTcpOnly = !1, this.customSetTcpOrUdp = !1, this.supportUdp = !1, this.audioEffectBuffer = {}, this.audioBitRate = 48e3, this.cdnSeq = 0, this.listenerList = { roomStreamUpdate: [], streamExtraInfoUpdate: [], playerStateUpdate: [], publisherStateUpdate: [], screenSharingEnded: [], publishQualityUpdate: [], playQualityUpdate: [], remoteCameraStatusUpdate: [], remoteMicStatusUpdate: [], soundLevelUpdate: [], capturedSoundLevelUpdate: [], videoDeviceStateChanged: [], audioDeviceStateChanged: [], deviceError: [], _deviceError: [], _remoteCameraStatusUpdate: [], _remoteMicStatusUpdate: [], _streamUpdated: [] }, this.reportList = {}, this.reportSeqList = { startPublish: {}, rePublish: {}, startPlay: {}, rePlay: {}, stopPublish: {}, stopPlay: {} }, this.streamTrigger = {}, this.mixStreamAdvance = {}, this.audioStreamList = {}, this.deviceInfos = null, this.deviceChangeTimer = null, this.deviceStateOut = !1, this.networkState = i.ENUM_NETWORK_STATE.offline, this.streamRetryTime = 300, this.checkList = [], this.anchor_info = { anchor_id: "", anchor_id_name: "", anchor_nick_name: "" }, this.streamConnectTime = 0, this.clientIP = "", this.type = "PUBLIC", this.roomList = [], this.isMultiRoom = !1;}return e.prototype.getRequestId = function () {return this.idName + "-" + i.getSeq();}, e.prototype.getSignalCmdContent = function (e, t, r, o) {var s = { request_id: t, room_id: e, from_userid: this.idName, from_username: this.nickName, to_userid: r };return null != o && (s.result = o), JSON.stringify(s);}, e.prototype.actionListener = function (e) {for (var t = this, r = [], i = 1; i < arguments.length; i++) {r[i - 1] = arguments[i];}if (!["playQualityUpdate", "publishQualityUpdate", "soundLevelUpdate", "capturedSoundLevelUpdate"].includes(e) && this.listenerList[e]) {var a = o.getReportSeq();this.dataReport.newReport(a, n.ZegoRTCLogEvent.kZegoListener.event), this.dataReport.addMsgInfo(a, { listener: e, params: r }), this.dataReport.uploadReport(a);}this.listenerList[e] && this.listenerList[e].forEach(function (o) {try {setTimeout(function () {o.apply(void 0, r);}, 0);} catch (r) {t.logger.error(s.ZEGO_WEBRTC_ACTION.STATECENTER_ACTION_LISTENER + " " + e + " " + r);}});}, e.prototype.getRoomByRoomID = function (e) {return this.roomList.find(function (t) {return t.roomID == e;});}, e.prototype.getPlayRoom = function (e) {return this.roomList.find(function (t) {return !!t.streamList.find(function (t) {return t.stream_id == e;});});}, e;}();t.StateCenter = a;}, 740: function _(e, t) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.ZegoStreamCenter = void 0;t.ZegoStreamCenter = function () {this.publisherList = {}, this.playerList = {};};}, 560: function _(e, t, r) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.StreamHandler = void 0;var o = r(706),s = r(608),i = r(706),n = r(529),a = r(752),l = r(89),u = function () {function e(e, t, r, o, s, i) {this.logger = e, this.stateCenter = t, this.rtm = r, this.dataReport = o, this.streamCenter = s, this.roomID = i, this.minStreamSeq = 0, this.streamSeq = 0, this.streamQuerying = !1, this.streamSeqMergeMap = null, this.streamListHBMergeInterval = 2e3, this.streamListMergeInterval = 5e3;}return e.prototype.setCDNInfo = function (e, t) {e.urlFlv = t.urls_flv instanceof Array ? t.urls_flv[0] : "string" == typeof t.urls_flv ? t.urls_flv : "", e.urlHls = t.urls_m3u8 instanceof Array ? t.urls_m3u8[0] : "string" == typeof t.urls_m3u8 ? t.urls_m3u8 : "", e.urlHttpsFlv = t.urls_https_flv instanceof Array ? t.urls_https_flv[0] : "string" == typeof t.urls_https_flv ? t.urls_https_flv : "", e.urlHttpsHls = t.urls_https_m3u8 instanceof Array ? t.urls_https_m3u8[0] : "string" == typeof t.urls_https_m3u8 ? t.urls_https_m3u8 : "", e.urlRtmp = t.urls_rtmp instanceof Array ? t.urls_rtmp[0] : "string" == typeof t.urls_rtmp ? t.urls_rtmp : "";}, e.prototype.onStreamUpdated = function (e, t, r) {}, e.prototype.onStreamExtraInfoUpdated = function (e, t) {}, e.prototype.handleStreamStart = function (e, t) {this.logger.info("zb.sh.hss call stream update"), this.room = t, e.body ? (this.streamListHBMergeInterval = e.body.stream_list_hb_wait_merge_time || 2e3, this.streamListMergeInterval = e.body.stream_list_push_merge_timeout || 5e3, this.streamQuerying = !1, this.handleFullUpdateStream(e.body.stream_seq, e.body.stream_info || []), this.handleReconnectStream(e.body.stream_info), this.logger.info("zb.sh.hss call end")) : this.logger.error("zb.sh.hss server response wrong");}, e.prototype.onPublishStateUpdate = function (e, t, r) {}, e.prototype.updateStreamInfo = function (e, t, r, i) {var n,l,u,_ = this;if (void 0 === r && (r = ""), this.logger.info("zb.sh.usi call"), "PUBLIC" === this.stateCenter.type) {var d = { stream_id: e, extra_info: r },c = JSON.stringify(d);l = { sub_cmd: t, stream_msg: c, third_token: null === (n = this.room) || void 0 === n ? void 0 : n.token }, u = "stream";} else l = { room_header: { room_id: this.roomID, room_sid: this.rtm.getRoomSid() || "0", room_user_session_id: this.rtm.getRoomSessionID() || "0" }, stream_id: e, extra_info: r, title: "", stream_sid: this.stateCenter.publishStreamList[e].sid }, u = t;var g = this.room;this.room.streamInfoList[e] = {}, this.room.streamInfoList[e].seq = this.rtm.service.sendMessage(u, l, function (e, t) {_.handleStreamUpdateRsp(e);}, function (n, l) {var u = _.room;if (u && !u.isResetRoom && !_.rtm.service.isDisConnect() && n.code && n.code == a.errorCodeList.TIMEOUT.code && u.streamInfoList[e].seq == l) 2001 == t && _.stateCenter.publishStreamList[e] && _.stateCenter.publishStreamList[e].state == o.ENUM_PUBLISH_STREAM_STATE.update_info || 2002 == t ? setTimeout(function () {_.updateStreamInfo(e, t, r, i);}, 0) : i && i(a.errorCodeList.TIMEOUT);else if (n.body && n.body.err_code) {var d = s.ClientUtil.getServerError(n.body.err_code);i && i(d, l), t === o.ENUM_STREAM_SUB_CMD.liveBegin && _.onPublishStateUpdate(o.ENUM_PUBLISH_STATE_UPDATE.error, e, d);}}, void 0, { sessionID: null == g ? void 0 : g.sessionID, roomID: null == g ? void 0 : g.roomID, roomSessionID: null == g ? void 0 : g.roomSessionID }), this.logger.info("zb.sh.usi call success cmd " + t);}, e.prototype.handleStreamUpdateRsp = function (e) {if (this.rtm.service.isDisConnect()) this.logger.error("zb.sh.hsur not login");else if (0 == e.body.err_code) {this.logger.info("zb.sh.hsur stream seq " + this.streamSeq + " server seq " + e.body.stream_seq), "PUBLIC" === this.stateCenter.type ? this.streamSeq = e.body.stream_seq : this.streamSeq++;var t = this.room;if (t) {if ("PUBLIC" === this.stateCenter.type) for (var r = function r(_r) {var i = e.body.stream_info[_r].stream_id,n = s.stateCenter.publishStreamList[i];if (!n) return s.logger.info("hsur.0 stream is not exist"), { value: void 0 };n.state == o.ENUM_PUBLISH_STREAM_STATE.update_info && (n.state = o.ENUM_PUBLISH_STREAM_STATE.publishing, t.streamList.find(function (e) {return e.stream_id == i;}) || t.streamList.push(e.body.stream_info[_r]), s.onPublishStateUpdate(o.ENUM_PUBLISH_STATE_UPDATE.start, i, { code: 0, message: "" })), delete t.streamInfoList[i];}, s = this, i = 0; i < e.body.stream_info.length; i++) {var n = r(i);if ("object" == typeof n) return n.value;} else {var a = e.body.stream_id;this.stateCenter.publishStreamList[a] && this.stateCenter.publishStreamList[a].state == o.ENUM_PUBLISH_STREAM_STATE.update_info && (this.stateCenter.publishStreamList[a].state = o.ENUM_PUBLISH_STREAM_STATE.publishing, this.stateCenter.publishStreamList[a].sid = e.body.stream_sid, this.stateCenter.publishStreamList[a].ver = e.body.stream_ver, t.streamList.find(function (e) {return e.stream_id == a;}) || t.streamList.push({ stream_id: e.body.stream_id, stream_seq: e.body.stream_seq, stream_sid: e.body.stream_sid, stream_ver: e.body.stream_ver, user_id: "", user_name: "" }), this.onPublishStateUpdate(0, a, { code: 0, message: "" })), delete t.streamInfoList[a];}} else this.logger.info("hsur.0 room no found");} else this.logger.error("zb.sh.hsur stream update error " + e.body.err_code);}, e.prototype.handleFetchStreamListRsp = function (e) {this.logger.info("zb.sh.hfslr call"), this.streamQuerying = !1, 0 === e.body.err_code ? this.streamSeq !== e.body.stream_seq ? (this.handleFullUpdateStream(e.body.stream_seq, e.body.stream_info), this.logger.info("zb.sh.hfslr call success")) : this.logger.info("zb.sh.hfslr same seq") : this.logger.info("zb.sh.hfslr server error=", e.body.err_code);}, e.prototype.handleFullUpdateStream = function (e, t) {var r = this;this.logger.info("zb.sh.hfus call"), this.streamSeq = e, this.logger.debug("zb.sh.hfus server seq " + this.streamSeq), s.ClientUtil.mergeStreamList(this.stateCenter.idName, this.room.streamList, t, function (e, t, s) {0 !== e.length && (r.logger.debug("zb.sh.hfus callback addstream"), r.onStreamUpdated(r.roomID, o.ENUM_STREAM_UPDATE_TYPE.added, r.makeCallbackStreamList(e))), 0 !== t.length && (r.logger.debug("zb.sh.hfus callback delstream"), r.onStreamUpdated(r.roomID, o.ENUM_STREAM_UPDATE_TYPE.deleted, r.makeCallbackStreamList(t))), 0 !== s.length && (r.logger.debug("zb.sh.hfus callback updatestream"), r.onStreamExtraInfoUpdated(r.roomID, r.makeCallbackStreamList(s)));}), this.logger.info("zb.sh.hfus call success");}, e.prototype.handlePushStreamUpdateMsg = function (e) {if (this.logger.info("zb.sh.hpsum call"), e.body.stream_info && 0 !== e.body.stream_info.length) {if (e.body.stream_info.length + this.streamSeq !== e.body.stream_seq) return this.logger.info("zb.sh.hpsum call updatestream"), void this.fetchStreamList();switch (this.streamSeq = e.body.stream_seq, e.body.stream_cmd) {case o.ENUM_STREAM_UPDATE_CMD.added:this.handleAddedStreamList(e.body.stream_info);break;case o.ENUM_STREAM_UPDATE_CMD.deleted:this.handleDeletedStreamList(e.body.stream_info);break;case o.ENUM_STREAM_UPDATE_CMD.updated:this.handleUpdatedStreamList(e.body.stream_info);}this.logger.info("zb.sh.hpsum call success");} else this.logger.info("zb.sh.hpsum, emtpy list");}, e.prototype.handlePriPushStreamUpdateMsg = function (e) {if (this.logger.info("zb.sh.hpsum call"), e.body.streams_info && 0 !== e.body.streams_info.length) {if (e.body.streams_info.length + this.streamSeq !== e.body.stream_seq) return this.logger.info("zb.sh.hpsum call updatestream"), void this.mergeStreamByStreamSeq(e.body.stream_cmd, e.body.stream_seq, e.body.streams_info);switch (this.streamSeq = e.body.stream_seq, e.body.stream_cmd) {case o.ENUM_STREAM_UPDATE_CMD_PRI.added:this.handleAddedStreamList(e.body.streams_info);break;case o.ENUM_STREAM_UPDATE_CMD_PRI.deleted:this.handleDeletedStreamList(e.body.streams_info);break;case o.ENUM_STREAM_UPDATE_CMD_PRI.updated:this.handleUpdatedStreamList(e.body.streams_info);}this.logger.info("zb.sh.hpsum call success");} else this.logger.info("zb.sh.hpsum, emtpy list");}, e.prototype.handleAddedStreamList = function (e) {this.logger.debug("zb.sh.hasl call");for (var t, r = [], s = 0; s < e.length; s++) {if (e[s].anchor_id_name != this.stateCenter.idName && e[s].user_id !== this.stateCenter.idName) {t = !1;for (var i = 0; i < this.room.streamList.length; i++) {if (e[s].stream_id === this.room.streamList[i].stream_id) {t = !0;break;}}t || r.push(e[s]);} else this.logger.debug("hdsl.0 have self stream added");}if (0 !== r.length) {this.logger.debug("zb.sh.hasl callback addstream");for (var n = 0; n < r.length; n++) {this.room.streamList.push(r[n]);}this.onStreamUpdated(this.roomID, o.ENUM_STREAM_UPDATE_TYPE.added, this.makeCallbackStreamList(r));}this.logger.info("zb.sh.hasl call success");}, e.prototype.handleDeletedStreamList = function (e) {this.logger.debug("zb.sh.hdsl call");for (var t = [], r = 0; r < e.length; r++) {if (e[r].anchor_id_name != this.stateCenter.idName && e[r].user_id !== this.stateCenter.idName) {for (var s = this.room.streamList.length - 1; s >= 0; s--) {if (e[r].stream_id === this.room.streamList[s].stream_id) {this.room.streamList.splice(s--, 1), t.push(e[r]);break;}}} else this.logger.debug("zb.sh.hdsl have self stream deleted");}0 !== t.length && (this.logger.debug("zb.sh.hdsl callback delstream"), this.onStreamUpdated(this.roomID, o.ENUM_STREAM_UPDATE_TYPE.deleted, this.makeCallbackStreamList(t))), this.logger.info("zb.sh.hdsl call");}, e.prototype.handleUpdatedStreamList = function (e) {this.logger.debug("zb.sh.husl call");for (var t = [], r = 0; r < e.length; r++) {if (e[r].anchor_id_name != this.stateCenter.idName && e[r].user_id !== this.stateCenter.idName) {for (var o = 0; o < this.room.streamList.length; o++) {if (e[r].stream_id === this.room.streamList[o].stream_id) {e[r].extra_info !== this.room.streamList[o].extra_info && (this.room.streamList[o] = e[r], t.push(e[r]));break;}}} else this.logger.debug("hsul.0 have self stream updated");}0 !== t.length && (this.logger.debug("zb.sh.husl callback updatestream"), this.onStreamExtraInfoUpdated(this.roomID, this.makeCallbackStreamList(t))), this.logger.info("zb.sh.husl call success");}, e.prototype.fetchStreamList = function () {if (this.logger.info("zb.sh.fsl call"), this.rtm.service.isDisConnect()) this.logger.info("zb.sh.fsl state error");else if (this.streamQuerying) this.logger.info("zb.sh.fsl already doing");else if (this.streamQuerying = !0, this.logger.debug("zb.sh.fsl send fetch request"), "PUBLIC" === this.stateCenter.type) {var e = { reserve: 0 },t = this.room;this.rtm.service.sendMessage("stream_info", e, this.handleFetchStreamListRsp.bind(this), function (e, t) {}, void 0, { roomID: null == t ? void 0 : t.roomID, sessionID: null == t ? void 0 : t.sessionID, roomSessionID: null == t ? void 0 : t.roomSessionID }), this.logger.info("zb.sh.fsl call success");} else {if (!this.rtm.isLogin(this.roomID)) return void this.logger.info("zb.sh.fsl room state error");e = { room_header: { room_id: this.roomID, room_sid: this.rtm.getRoomSid() || "0", room_user_session_id: this.rtm.getRoomSessionID() || "0" } }, this.rtm.service.sendMessage("zegochat_js.room_info_req", e, this.handleFetchStreamListRsp.bind(this), function (e, t) {});}}, e.prototype.handleReconnectStream = function (e) {this.logger.info("zb.sh.hrs call");var t = this.streamCenter.publisherList,r = this.streamCenter.playerList,s = function s(r) {if (t[r].roomID !== i.roomID) return "continue";if (t[r].publisher.state != o.ENUM_PUBLISH_STATE.publishing || e.find(function (e) {return e.stream_id == r;})) {if (t[r].publisher.state == o.ENUM_PUBLISH_STATE.stop && e.find(function (e) {return e.stream_id == r;})) {n = void 0, n = "PUBLIC" === i.stateCenter.type ? o.ENUM_STREAM_SUB_CMD.liveEnd : o.ENUM_STREAM_CMD_PRI.liveEnd, i.updateStreamInfo(r, n);for (var s = 0; s < i.room.streamList.length; s++) {if (i.room.streamList[s].stream_id == r) {i.room.streamList.splice(s--, 1);break;}}}} else {var n = void 0;n = "PUBLIC" === i.stateCenter.type ? o.ENUM_STREAM_SUB_CMD.liveBegin : o.ENUM_STREAM_CMD_PRI.liveBegin, i.updateStreamInfo(r, n, i.stateCenter.publishStreamList[r].extra_info);}},i = this;for (var n in t) {s(n);}for (var n in t) {t[n].roomID === this.roomID && t[n].isReDispatch && (this.logger.info("zb.sh.hrs " + n + "retry dispatch"), (a = t[n].retryDispatchHandler).stopMaxTime(), a.invalid(), a.initStream(n, t[n].publishOption, !0), a.active(0), t[n].isReDispatch = !1);}for (var n in r) {var a;r[n].roomID === this.roomID && r[n].isReDispatch && (this.logger.info("zb.sh.hrs " + n + "retry dispatch"), (a = r[n].retryDispatchHandler).stopMaxTime(), a.invalid(), a.initStream(n, r[n].playOption, !1), a.active(0), r[n].isReDispatch = !1);}this.logger.info("zb.sh.hrs end");}, e.prototype.makeCallbackStreamList = function (e) {var t = [];if ("PUBLIC" === this.stateCenter.type) {if (e && e.length > 0) for (var r = 0; r < e.length; r++) {var o = { user: { userID: e[r].anchor_id_name, userName: e[r].anchor_nick_name }, extraInfo: e[r].extra_info, streamID: e[r].stream_id, roomID: "", urlFlv: "", urlRtmp: "", urlHls: "", urlHttpsFlv: "", urlHttpsHls: "", streamGID: e[r].stream_gid, closeType: e[r].close_type };this.setCDNInfo(o, e[r]), t.push(o);}} else if (e && e.length > 0) for (r = 0; r < e.length; r++) {o = { user_id: e[r].user_id, user_name: e[r].user_name, stream_id: e[r].stream_id, stream_sid: e[r].stream_sid, extra_info: e[r].extra_info, title: e[r].title, stream_ver: e[r].stream_ver }, t.push(o);}return t;}, e.prototype.updateMixStream = function (e, t, r) {var l,u = this;if (this.logger.info("zb.sh.ums call"), !e.noTaskID && !e.taskID) return this.logger.error("zb.sh.ums no taskId found"), r({ errorCode: n.ZegoRTCLogEvent.kZegoTaskMixStart.error.kTaskIDNullError.code, extendedData: n.ZegoRTCLogEvent.kZegoTaskMixStart.error.kTaskIDNullError.message }), !1;if (!e.noTaskID && "string" != typeof e.taskID) return this.logger.error("zb.rh.lg taskId must be string"), r({ errorCode: n.ZegoRTCLogEvent.kZegoTaskMixStart.error.kParamError.code, extendedData: n.ZegoRTCLogEvent.kZegoTaskMixStart.error.kParamError.message }), !1;if (!e.noTaskID && e.taskID.length > o.MAX_MIX_TASK_ID_LENGTH) return this.logger.error("zb.sh.ums taskId is too long"), r({ errorCode: n.ZegoRTCLogEvent.kZegoTaskMixStart.error.kTaskIDToLongError.code, extendedData: n.ZegoRTCLogEvent.kZegoTaskMixStart.error.kTaskIDToLongError.message }), !1;if (!e.noTaskID && !s.ClientUtil.checkIllegalCharacters(e.taskID)) return this.logger.error("zb.sh.ums task ID contains illegal characters"), r({ errorCode: n.ZegoRTCLogEvent.kZegoTaskMixStart.error.kTaskIDInvalidCharacterError.code, extendedData: n.ZegoRTCLogEvent.kZegoTaskMixStart.error.kTaskIDInvalidCharacterError.message }), !1;if (!e.inputList || 0 == e.inputList.length) return this.logger.error("zb.sh.ums input list wrong"), r({ errorCode: n.ZegoRTCLogEvent.kZegoTaskMixStart.error.kInputListNullError.code, extendedData: n.ZegoRTCLogEvent.kZegoTaskMixStart.error.kInputListNullError.message }), !1;e.inputList.forEach(function (e) {"AUDIO" === e.contentType && (!e.layout && (e.layout = { top: 0, left: 0, bottom: 0, right: 0 }), e.layout.top = 0, e.layout.left = 0, e.layout.bottom = 1, e.layout.right = 1);});for (var _ = e.inputList.every(function (e) {return "AUDIO" === e.contentType;}), d = 0; d < e.inputList.length; d++) {var c = e.inputList[d];if ("object" != typeof c.layout) return this.logger.error("zb.sh.ums input layout must be object"), r({ errorCode: n.ZegoRTCLogEvent.kZegoTaskMixStart.error.kParamError.code, extendedData: n.ZegoRTCLogEvent.kZegoTaskMixStart.error.kParamError.message }), !1;if (!(s.ClientUtil.checkInteger(c.layout.top, !1) && s.ClientUtil.checkInteger(c.layout.bottom, !1) && s.ClientUtil.checkInteger(c.layout.left, !1) && s.ClientUtil.checkInteger(c.layout.right, !1))) return this.logger.error("zb.sh.ums top、left、bottom、right must be integer number"), r({ errorCode: n.ZegoRTCLogEvent.kZegoTaskMixStart.error.kParamError.code, extendedData: n.ZegoRTCLogEvent.kZegoTaskMixStart.error.kParamError.message }), !1;}if (!e.outputList || 0 == e.outputList.length) return this.logger.error("zb.sh.ums no output list found"), r({ errorCode: n.ZegoRTCLogEvent.kZegoTaskMixStart.error.kOutputListNullError.code, extendedData: n.ZegoRTCLogEvent.kZegoTaskMixStart.error.kOutputListNullError.message }), !1;if (e.outputList.some(function (e) {return "string" == typeof e && !s.ClientUtil.isUrl(e) && !s.ClientUtil.checkIllegalCharacters(e) || "object" == typeof e && e.target && !s.ClientUtil.isUrl(e.target) && !s.ClientUtil.checkIllegalCharacters(e.target);})) return this.logger.error("zb.sh.ums stream output target is incorrect"), r({ errorCode: n.ZegoRTCLogEvent.kZegoTaskMixStart.error.kOutputTargetInvalidError.code, extendedData: n.ZegoRTCLogEvent.kZegoTaskMixStart.error.kOutputTargetInvalidError.message }), !1;if (!(_ || e.outputConfig && "object" == typeof e.outputConfig)) return this.logger.error("zb.sh.ums no output config found"), r({ errorCode: n.ZegoRTCLogEvent.kZegoTaskMixStart.error.kOutputNoTargetError.code, extendedData: n.ZegoRTCLogEvent.kZegoTaskMixStart.error.kOutputNoTargetError.message }), !1;if (_ && (void 0 === e.outputConfig && (e.outputConfig = { outputBitrate: 0, outputFPS: 0, outputWidth: 0, outputHeight: 0 }), e.outputConfig.outputBitrate = .001, e.outputConfig.outputFPS = 1, e.outputConfig.outputWidth = 1, e.outputConfig.outputHeight = 1), !(_ || e.outputConfig.outputBitrate && s.ClientUtil.checkInteger(e.outputConfig.outputBitrate))) return this.logger.error("zb.sh.ums bitrate param is required and must be integer number"), r({ errorCode: n.ZegoRTCLogEvent.kZegoTaskMixStart.error.kParamError.code, extendedData: n.ZegoRTCLogEvent.kZegoTaskMixStart.error.kParamError.message }), !1;if (!e.outputConfig.outputFPS || !s.ClientUtil.checkInteger(e.outputConfig.outputFPS)) return this.logger.error("zb.sh.ums fps param is required and must be integer number"), r({ errorCode: n.ZegoRTCLogEvent.kZegoTaskMixStart.error.kParamError.code, extendedData: n.ZegoRTCLogEvent.kZegoTaskMixStart.error.kParamError.message }), !1;if (!e.outputConfig.outputWidth || !s.ClientUtil.checkInteger(e.outputConfig.outputWidth)) return this.logger.error("zb.sh.ums width param is required and must be integer number"), r({ errorCode: n.ZegoRTCLogEvent.kZegoTaskMixStart.error.kParamError.code, extendedData: n.ZegoRTCLogEvent.kZegoTaskMixStart.error.kParamError.message }), !1;if (!e.outputConfig.outputHeight || !s.ClientUtil.checkInteger(e.outputConfig.outputHeight)) return this.logger.error("zb.sh.ums height param is required and must be integer number"), r({ errorCode: n.ZegoRTCLogEvent.kZegoTaskMixStart.error.kParamError.code, extendedData: n.ZegoRTCLogEvent.kZegoTaskMixStart.error.kParamError.message }), !1;if (void 0 !== e.outputConfig.outputAudioCodecID && !s.ClientUtil.checkInteger(e.outputConfig.outputAudioCodecID, !1)) return this.logger.error("zb.sh.ums AudioCodecID param must be integer number"), r({ errorCode: n.ZegoRTCLogEvent.kZegoTaskMixStart.error.kParamError.code, extendedData: n.ZegoRTCLogEvent.kZegoTaskMixStart.error.kParamError.message }), !1;if (void 0 !== e.outputConfig.outputAudioBitrate && !s.ClientUtil.checkInteger(e.outputConfig.outputAudioBitrate)) return this.logger.error("zb.sh.ums AudioBitrate param must be integer number"), r({ errorCode: n.ZegoRTCLogEvent.kZegoTaskMixStart.error.kParamError.code, extendedData: n.ZegoRTCLogEvent.kZegoTaskMixStart.error.kParamError.message }), !1;if (void 0 !== e.outputConfig.outputAudioChannels && !s.ClientUtil.checkInteger(e.outputConfig.outputAudioChannels, !1)) return this.logger.error("zb.sh.ums AudioChannels param must be integer number"), r({ errorCode: n.ZegoRTCLogEvent.kZegoTaskMixStart.error.kParamError.code, extendedData: n.ZegoRTCLogEvent.kZegoTaskMixStart.error.kParamError.message }), !1;var g = 0;e.outputConfig.singleStreamPassThrough && "boolean" == typeof e.outputConfig.singleStreamPassThrough && (g = e.outputConfig.singleStreamPassThrough ? 1 : 0);var h = { task_id: e.taskID, id_name: this.stateCenter.idName, live_channel: this.roomID, appid: this.stateCenter.appid, version: o.PROTO_VERSION, bypass: g },E = this.stateCenter.mixStreamAdvance;E && (E.videoCodec && (h.extra_params = [{ key: "video_encode", value: E.videoCodec }]), E.backgroundColor && (h.output_bg_color = E.backgroundColor), E.backgroundImage && (h.output_bg_image = E.backgroundImage), E.waterMark && (h.watermark = E.waterMark), E.extraParams && (!h.extra_params && (h.extra_params = []), (l = h.extra_params).push.apply(l, E.extraParams)));var p = [];for (d = 0; d < e.inputList.length; d++) {var T = e.inputList[d],m = T.streamID;this.stateCenter.testEnvironment && (m = "zegotest-" + this.stateCenter.appid + "-" + T.streamID), p.push({ stream_id: m, content_control: "AUDIO" === T.contentType ? 1 : 0, rect: { layer: d, top: T.layout.top, left: T.layout.left, bottom: T.layout.bottom, right: T.layout.right } });}h.MixInput = p, s.ClientUtil.actionSuccessCallback("kZegoTaskMixStart" + e.taskID, this.stateCenter.reportList) && s.ClientUtil.actionSuccessCallback("kZegoTaskMixStart" + e.taskID, this.stateCenter.reportList)(i.REPORT_ACTION.addMsgInfo, void 0, { mix_stream_id: n.ZegoRTCLogEvent.kZegoTaskMixStart.mix_stream_id(e.taskID), stream_cnt: n.ZegoRTCLogEvent.kZegoTaskMixStart.stream_cnt(p.length), input_stream_list: n.ZegoRTCLogEvent.kZegoTaskMixStart.input_stream_list(p) });var R = [];e.outputList.forEach(function (t) {var o = {},s = "";if ("string" == typeof t) s = t;else {if ("object" != typeof t || !t.target) return u.logger.error("zb.sh.ums output target required"), r({ errorCode: n.ZegoRTCLogEvent.kZegoTaskMixStart.error.kOutputTargetInvalidError.code, extendedData: n.ZegoRTCLogEvent.kZegoTaskMixStart.error.kOutputTargetInvalidError.message }), !1;s = t.target;}s.startsWith("rtmp://") || s.startsWith("https://") && s.endsWith(".flv") || s.startsWith("https://") && s.endsWith(".m3u8") ? o.mixurl = s : u.stateCenter.testEnvironment ? o.stream_id = "zegotest-" + u.stateCenter.appid + "-" + s : o.stream_id = s, o.bitrate = 1e3 * e.outputConfig.outputBitrate, o.fps = e.outputConfig.outputFPS, o.width = e.outputConfig.outputWidth, o.height = e.outputConfig.outputHeight, e.outputConfig.outputAudioCodecID && (o.audio_enc_id = e.outputConfig.outputAudioCodecID), "vp8" === E.videoCodec ? o.audio_enc_id = 3 : "h264" === E.videoCodec && (o.audio_enc_id = 0), e.outputConfig.outputAudioBitrate && (o.audio_bitrate = 1e3 * e.outputConfig.outputAudioBitrate), e.outputConfig.outputAudioChannels && (o.audio_channel_cnt = e.outputConfig.outputAudioChannels), u.stateCenter.testEnvironment ? o.testenv = 1 : o.testenv = 0, R.push(o);}), h.MixOutput = R, s.ClientUtil.actionSuccessCallback("kZegoTaskMixStart" + e.taskID, this.stateCenter.reportList) && s.ClientUtil.actionSuccessCallback("kZegoTaskMixStart" + e.taskID, this.stateCenter.reportList)(i.REPORT_ACTION.addMsgInfo, void 0, { output_target_list: n.ZegoRTCLogEvent.kZegoTaskMixStart.output_target_list(R) });var S = { channel: "zeus", cmd: "start_mix", req_body: JSON.stringify(h) };return this.logger.debug("zb.sh.ums send command"), this.sendBizChannelRequest(S, function (e, i, n) {u.logger.debug("zb.sh.ums receive message");var a = "zegotest-" + u.stateCenter.appid + "-";if (0 != n.length) {for (var l = JSON.parse(n), _ = [], d = 0; d < l.play.length; d++) {var c = { rtmpURL: "", hlsURL: "", flvURL: "" },g = l.play[d].stream_alias || "";u.stateCenter.testEnvironment && g && g.startsWith(a) && (g = g.slice(a.length)), c.streamID = g, l.play[d].rtmp_url && l.play[d].rtmp_url.length > 0 && (c.rtmpURL = l.play[d].rtmp_url), l.play[d].hls_url && l.play[d].hls_url.length > 0 && (c.hlsURL = l.play[d].hls_url), l.play[d].hdl_url && l.play[d].hdl_url.length > 0 && (c.flvURL = l.play[d].hdl_url), _.push(c);}if (t) {var h = { mixerOutputList: _ };t({ errorCode: 0, extendedData: JSON.stringify(h) });}} else r && r({ errorCode: s.ClientUtil.getServerError(o.MIXSTREAM_ERROR_CODE + 1).code, extendedData: "" });}, function (e, t, o) {if ("number" == typeof e) {u.logger.debug("zb.sh.ums error: " + e);var i = [];if (1000000150 == e && 0 != o.length) for (var l = JSON.parse(o), _ = "zegotest-" + u.stateCenter.appid + "-", d = 0; d < l.non_exist_streams.length; d++) {var c = l.non_exist_streams[d];u.stateCenter.testEnvironment && c.startsWith(_) ? i.push(c.slice(_.length)) : i.push(c);}r && r({ errorCode: s.ClientUtil.getServerError(e).code, extendedData: "" });} else {u.logger.debug("zb.sh.ums error code " + e.code);var g;g = e == a.errorCodeList.TIMEOUT ? n.ZegoRTCLogEvent.kZegoTaskMixStart.error.kRequestError : n.ZegoRTCLogEvent.kZegoTaskMixStart.error.kInternalError, r && r({ errorCode: g.code, extendedData: g.message });}}), !0;}, e.prototype.sendBizChannelRequest = function (e, t, r, o) {var s = this;void 0 === o && (o = !1), e = Object.assign(e, { is_retry_req: o ? 1 : 0 });var i = this.room;this.rtm.service.sendMessage("biz_channel", e, function (e, r) {t(e.header.seq, e.body.cmd, e.body.rsp_body);}, function (o, i) {var n = o.body.err_code,a = o.body.rsp_body;"number" != typeof n || 2002 !== n ? r(n, i, a) : s.sendBizChannelRequest(e, t, r, !0);}, void 0, { roomID: null == i ? void 0 : i.roomID, sessionID: null == i ? void 0 : i.sessionID, roomSessionID: null == i ? void 0 : i.roomSessionID });}, e.prototype.setMixerTaskConfig = function (e) {var t = this;return new Promise(function (r, o) {var a,l = {},u = {};if (e && e.videoCodec) {var _ = e.videoCodec.toLowerCase();if (-1 == ["vp8", "h264"].indexOf(_)) return t.logger.error("zb.sh.ums param videoCode error"), o({ errorCode: n.ZegoRTCLogEvent.kZegoTaskMixConfig.error.kVideoConfigInvalidError.code, extendedData: n.ZegoRTCLogEvent.kZegoTaskMixConfig.error.kVideoConfigInvalidError.message }), !1;l.videoCodec = _, u.video_codec = _;}if (e.backgroundColor) {if (!s.ClientUtil.checkInteger(e.backgroundColor)) return t.logger.error("zb.sh.ums param backgroundColor must be integer number"), o({ errorCode: n.ZegoRTCLogEvent.kZegoTaskMixConfig.error.kParamError.code, extendedData: n.ZegoRTCLogEvent.kZegoTaskMixConfig.error.kParamError.message }), !1;l.backgroundColor = e.backgroundColor, u.background_color = e.backgroundColor;}if (e.backgroundImage) {if ("string" != typeof e.backgroundImage) return t.logger.error("zb.sh.ums param outputBgImage error"), o({ errorCode: n.ZegoRTCLogEvent.kZegoTaskMixConfig.error.kParamError.code, extendedData: n.ZegoRTCLogEvent.kZegoTaskMixConfig.error.kParamError.message }), !1;if (!e.backgroundImage.startsWith("preset-id://") || !e.backgroundImage.endsWith(".jpg") && !e.backgroundImage.endsWith(".png")) return t.logger.error("zb.sh.ums illegal input background image URL"), o({ errorCode: n.ZegoRTCLogEvent.kZegoTaskMixConfig.error.kBackgroundImageUrlInvalidError.code, extendedData: n.ZegoRTCLogEvent.kZegoTaskMixConfig.error.kBackgroundImageUrlInvalidError.message }), !1;l.backgroundImage = e.backgroundImage, u.background_image = e.backgroundImage;}e.waterMark && (l.waterMark = e.waterMark, u.water_mark = e.waterMark), e.extraParams && (l.extraParams || (l.extraParams = []), (a = l.extraParams).push.apply(a, e.extraParams)), t.stateCenter.mixStreamAdvance = l, s.ClientUtil.actionSuccessCallback("kZegoTaskMixConfig", t.stateCenter.reportList) && s.ClientUtil.actionSuccessCallback("kZegoTaskMixConfig", t.stateCenter.reportList)(i.REPORT_ACTION.addMsgInfo, void 0, { config: n.ZegoRTCLogEvent.kZegoTaskMixConfig.config(u) }), r({ errorCode: 0, extendedData: "" });});}, e.prototype.stopMixStream = function (e, t, r, i, l) {var u = this;this.logger.info("zb.sh.sms call");var _ = { id_name: this.stateCenter.idName, live_channel: this.roomID, appid: this.stateCenter.appid, version: o.PROTO_VERSION };"string" == typeof e && (_.task_id = e), null != i ? this.stateCenter.testEnvironment ? _.stream_id = "zegotest-" + this.stateCenter.appid + "-" + i : _.stream_id = i : null != l && (_.mixurl = l);var d = { channel: "zeus", cmd: "stop_mix", req_body: JSON.stringify(_) };return this.sendBizChannelRequest(d, function () {t && t({ errorCode: 0 });}, function (e) {if ("number" == typeof e) r && r({ errorCode: s.ClientUtil.getServerError(o.MIXSTREAM_ERROR_CODE + e).code, extendedData: "" });else {u.logger.error("zb.sh.sms stop mix fail " + JSON.stringify(e));var t;t = e == a.errorCodeList.TIMEOUT ? n.ZegoRTCLogEvent.kZegoTaskMixStop.error.kRequestError : n.ZegoRTCLogEvent.kZegoTaskMixStop.error.kInternalError, r && r({ errorCode: t.code, extendedData: t.message });}}), !0;}, e.prototype.updateStreamExtraInfo = function (e, t, r, s) {if (this.logger.info("zb.sh.usei call"), !this.rtm.isLogin(this.roomID)) return this.logger.info("zb.sh.usei room state error"), void s(a.errorCodeList.NOT_LOGIN);var i;i = "PUBLIC" === this.stateCenter.type ? o.ENUM_STREAM_SUB_CMD.liveUpdate : o.ENUM_STREAM_CMD_PRI.liveUpdate, this.stateCenter.publishStreamList[e] && this.stateCenter.publishStreamList[e].state >= o.ENUM_PUBLISH_STREAM_STATE.update_info ? (this.stateCenter.publishStreamList[e].extra_info = t, this.updateStreamInfo(e, i, t), r({ errorCode: 0 })) : s(n.ZegoRTCLogEvent.kZegoTaskLiveRoomSendStreamExtraInfo.error.kUpdateStreamInfoFailError);}, e.prototype.setStreamExtraInfo = function (e, t, r, o) {this.updateStreamExtraInfo(e, t, r, o);}, e.prototype._publishTarget = function (e, t, r) {var s = this;this.logger.info("zb.sh.ptcall");var i = Math.ceil(new Date().getTime() / 1e3),l = e.streamID;this.stateCenter.testEnvironment && (l = "zegotest-" + this.stateCenter.appid + "-" + e.streamID);var u = { appid: this.stateCenter.appid, biz_type: 0, timestamp: i, seq: this.stateCenter.cdnSeq++, version: 1 * o.PROTO_VERSION, stream_id: l, pushurl: e.pushUrl },_ = { channel: "media", cmd: e.type, req_body: JSON.stringify(u) };this.logger.debug("zb.sh.pt send command"), this.sendBizChannelRequest(_, function (o, i, l) {if (s.logger.info("zb.sh.pt receive message"), 0 != l.length) {var u = JSON.parse(l),_ = u.code,d = u.message;_ && 0 != _ ? (s.logger.error("zb.sh.pt " + e.type + " error code: " + _ + " " + d), r(a.errorCodeList.UNKNOWN_SERVER_ERROR, " cmd: " + e.type + " " + _ + " " + d)) : (s.logger.info("zb.sh.pt " + e.type + " success"), t && t({ errorCode: 0, extendedData: "" }));} else r(n.ZegoRTCLogEvent.kZegoTaskPublishTarget.error.kNoResponseError);}, function (t, o, i) {s.logger.info("zb.sh.pt error: " + t);var a = n.ZegoRTCLogEvent.kZegoTaskPublishTarget.error.kUnknownServerError;2001 == t ? n.ZegoRTCLogEvent.kZegoTaskPublishTarget.error.kInvalidChannelError : 2002 == t && (a = n.ZegoRTCLogEvent.kZegoTaskPublishTarget.error.kBizChannelError), s.logger.error("zb.sh.pt "), r(a, " cmd: " + e.type + " " + t + "   ");});}, e.prototype.patchStreamList = function (e) {var t = this;e.body.stream_seq === this.streamSeq || this.streamSeqMergeMap || (this.logger.info(l.ZEGO_WEBRTC_ACTION.STREAMHANDLER_PATCH_STREAM_LIST + " call update stream " + this.streamSeq + " server " + e.body.stream_seq), this.streamSeqMergeTimer && clearTimeout(this.streamSeqMergeTimer), this.streamSeqMergeTimer = setTimeout(function () {t.handleMergeTimeout();}, this.streamListHBMergeInterval)), this.minStreamSeq = e.body.stream_seq;}, e.prototype.mergeStreamByStreamSeq = function (e, t, r) {var o = this;this.streamSeqMergeMap || (this.logger.warn(l.ZEGO_WEBRTC_ACTION.STREAMHANDLER_MERGE_STREAM_BY_STREAM_SEQ + " new merge stream list " + this.streamSeq + " server " + t), this.streamSeqMergeMap = {}, this.streamSeqMergeTimer && clearTimeout(this.streamSeqMergeTimer), this.streamSeqMergeTimer = setTimeout(function () {o.handleMergeTimeout();}, this.streamListMergeInterval)), this.logger.info(l.ZEGO_WEBRTC_ACTION.STREAMHANDLER_MERGE_STREAM_BY_STREAM_SEQ + " " + this.streamSeqMergeMap + " " + e + " " + t + " " + r), this.streamSeqMergeMap[t] = { cmd: e, streamList: r };}, e.prototype.handleMergeTimeout = function () {if (this.streamSeqMergeMap) {var e = Object.keys(this.streamSeqMergeMap).map(function (e) {return +e;}).sort(function (e, t) {return e - t;});e[e.length - 1] - e[0] + 1 === e.length || e[e.length - 1] >= this.minStreamSeq ? this.mergeStream(e) : (this.streamSeqMergeMap = null, this.fetchStreamList());}}, e.prototype.mergeStream = function (e) {var t = this;this.logger.info(l.ZEGO_WEBRTC_ACTION.STREAMHANDLER_MERGE_STREAM + " merge streamList " + this.streamSeq + " streamSeqList " + e.join(","));var r = e[e.length - 1],s = [];e.forEach(function (e) {if (t.streamSeqMergeMap && t.streamSeqMergeMap[e]) switch (t.streamSeqMergeMap[e].cmd) {case o.ENUM_STREAM_UPDATE_CMD.added:t.streamSeqMergeMap[e].streamList.forEach(function (e) {var t = s.findIndex(function (t) {return t.stream_id == e.stream_id;});-1 !== t && s.splice(t), s.push(e);});break;case o.ENUM_STREAM_UPDATE_CMD.deleted:t.streamSeqMergeMap[e].streamList.forEach(function (e) {var t = s.findIndex(function (t) {return t.stream_id == e.stream_id;});-1 !== t && s.splice(t);});break;case o.ENUM_STREAM_UPDATE_CMD.updated:t.streamSeqMergeMap[e].streamList.forEach(function (e) {var t = s.findIndex(function (t) {return t.stream_id == e.stream_id;});-1 !== t && s.splice(t), s.push(e);});}}), this.streamSeqMergeMap = null, this.logger.info(l.ZEGO_WEBRTC_ACTION.STREAMHANDLER_MERGE_STREAM + " " + s), this.handleFullUpdateStream(r, s);}, e.prototype.reset = function () {this.minStreamSeq = 0, this.streamSeqMergeMap = null, this.streamSeqMergeTimer && (clearTimeout(this.streamSeqMergeTimer), this.streamSeqMergeTimer = void 0), this.streamListHBMergeInterval = 2e3, this.streamListMergeInterval = 5e3;}, e.prototype.getRoomInfo = function () {var e = this;return new Promise(function (t, r) {if (e.rtm.isLogin(e.roomID)) {var o = function o(e, _o2) {if (0 !== e.body.code) r({ errorCode: e.body.code, extendData: e.body.message });else {var s = e.body.streams_info.map(function (e) {return { streamID: e.stream_id, user: { userID: e.user_id, userName: e.user_name }, extraInfo: e.extra_info };});t({ streamList: s });}},s = { room_header: { room_id: e.roomID, room_sid: e.rtm.getRoomSid() || "0", room_user_session_id: e.rtm.getRoomSessionID() || "0" } };e.rtm.service.sendMessage("zegochat_js.room_info_req", s, o, o);} else e.logger.error("zn.rh.gri no enter room");});}, e;}();t.StreamHandler = u;}, 706: function _(e, t, r) {"use strict";var o, s, i, n, a, l, u, _, d, c, g;Object.defineProperty(t, "__esModule", { value: !0 }), t.ZegoExpressWebRTM = t.ZegoDataReport = t.ZegoLogger = t.ZegoExpressWebRTMEngine = t.getReportSeq = t.getSeq = t.QUALITY_CONSTANT = t.QualityGrade = t.REPORT_ACTION = t.ENUM_RETRY_STATE = t.ENUM_PLAY_STATE_UPDATE = t.ENUM_PUBLISH_STATE_UPDATE = t.LinkedList = t.ListNode = t.E_CLIENT_TYPE = t.ENUM_SOURCE_TYPE = t.ENUM_DISPATCH_TYPE = t.ENUM_BROADCASTER_STATUS = t.ENUM_PLAY_SOURCE_TYPE = t.ENUM_PUBLISH_STATE_NEGO = t.ENUM_PUSH_SIGNAL_SUB_CMD = t.ENUM_SIGNAL_SUB_CMD = t.QUALITYLEVEL = t.MIXSTREAM_ERROR_CODE = t.SERVER_ERROR_CODE = t.ENUM_STREAM_UPDATE_CMD_PRI = t.ENUM_STREAM_UPDATE_CMD = t.MINIUM_HEARTBEAT_INTERVAL = t.STREAM_DELETE_REASON = t.ENUM_NETWORK_STATE = t.ENUM_RUN_STATE = t.ENUM_STREAM_UPDATE_TYPE = t.ENUM_STREAM_CMD_PRI = t.ENUM_STREAM_SUB_CMD = t.ENUM_PUBLISH_STREAM_STATE = t.MAX_RETRY_CONNECT_INTERVAL = t.MAX_TRANS_DATA_LENGTH = t.MAX_TRANS_TYPE_LENGTH = t.MAX_MIX_TASK_ID_LENGTH = t.MAX_MESSAGE_LENGTH = t.MAX_ROOM_ID_LENGTH = t.MAX_USER_NAME_LENGTH = t.MAX_USER_ID_LENGTH = t.MAX_STREAM_ID_LENGTH = t.MAX_TRY_HEARTBEAT_COUNT = t.SEND_MSG_TIMEOUT = t.SEND_MSG_RESET = t.MAX_TRY_CONNECT_COUNT = t.ENUM_CONNECT_STATE = t.ENUM_PROBE_STATE = t.ENUM_PLAY_STATE_NEGO = t.ENUM_PLAYER_STATE = t.ENUM_PLAY_STATE = t.ENUM_PUBLISH_STATE = t.ENUM_SCREEM_RESOLUTION_TYPE = t.ENUM_RESOLUTION_TYPE = t.ENUM_SIGNAL_STATE = t.ERROR_CODES = t.sdkErrorList = t.ENUM_REMOTE_TYPE = t.LOG_LEVEL = t.ENUM_LOG_LEVEL = t.ROOMVERSION = t.PROTO_VERSION = void 0, t.PROTO_VERSION = "2.10.4", t.ROOMVERSION = "V1", (g = t.ENUM_LOG_LEVEL || (t.ENUM_LOG_LEVEL = {}))[g.debug = 0] = "debug", g[g.info = 1] = "info", g[g.warn = 2] = "warn", g[g.error = 3] = "error", g[g.report = 99] = "report", g[g.disable = 100] = "disable", t.LOG_LEVEL = { debug: 0, info: 1, warn: 2, error: 3, report: 99, disable: 100 }, (c = t.ENUM_REMOTE_TYPE || (t.ENUM_REMOTE_TYPE = {}))[c.disable = 0] = "disable", c[c.websocket = 1] = "websocket", c[c.https = 2] = "https", t.sdkErrorList = { CLIENT: "Client.", SERVER: "Server.", SUCCESS: { code: "Success", msg: "success." }, PARAM: { code: "Error.Param", msg: "input error." }, HEARTBEAT_TIMEOUT: { code: "Error.Timeout", msg: "heartbeat timeout." }, LOGIN_TIMEOUT: { code: "Error.Timeout", msg: "login timeout." }, SEND_MSG_TIMEOUT: { code: "Error.Timeout", msg: "send customsg timeout." }, RESET_QUEUE: { code: "Error.Timeout", msg: "msg waiting ack is clear when reset." }, LOGIN_DISCONNECT: { code: "Error.Network", msg: "network is broken and login fail." }, KICK_OUT: { code: "Error.Kickout", msg: "kickout reason=" }, UNKNOWN: { code: "Error.Unknown", msg: "unknown error." }, FREQ_LIMITED: { code: "Error.requencyLimited", msg: "Frequency Limited." } }, t.ERROR_CODES = { ROOM_SESSION_ID_ERR: 1000000152, FETCH_TRANS_UNKNOWN_CHANNEL: 1000001108, FETCH_TRANS_UNKNOWN_TYPE: 1000001109, FETCH_TRANS_WRONG_SEQ: 1000001110 }, (d = t.ENUM_SIGNAL_STATE || (t.ENUM_SIGNAL_STATE = {}))[d.disconnected = 0] = "disconnected", d[d.connecting = 1] = "connecting", d[d.connected = 2] = "connected", t.ENUM_RESOLUTION_TYPE = { LOW: { width: 320, height: 240, frameRate: 15, bitRate: 300 }, MEDIUM: { width: 640, height: 480, frameRate: 15, bitRate: 800 }, HIGH: { width: 1280, height: 720, frameRate: 20, bitRate: 1500 } }, t.ENUM_SCREEM_RESOLUTION_TYPE = { LOW: { frameRate: 20, bitRate: 800 }, MEDIUM: { frameRate: 15, bitRate: 1500 }, HIGH: { frameRate: 5, bitRate: 2e3 } }, t.ENUM_PUBLISH_STATE = { start: 0, waitingSessionRsp: 1, waitingOffserRsp: 2, waitingServerAnswer: 3, waitingServerICE: 4, connecting: 5, publishing: 6, stop: 7, didNotStart: 8 }, t.ENUM_PLAY_STATE = { start: 0, waitingSessionRsp: 1, waitingOffserRsp: 2, waitingServerAnswer: 3, waitingServerICE: 4, connecting: 5, playing: 6, stop: 7, didNotStart: 8 }, t.ENUM_PLAYER_STATE = { start: 0, playing: 1, stop: 2 }, t.ENUM_PLAY_STATE_NEGO = { stop: 0, start: 1, waiterAnswer: 2, waitingCandidate: 3, sendCandidate: 4, iceConnected: 5, iceDisconnected: 6 }, t.ENUM_PROBE_STATE = { tryProbe: 0, probed: 2 }, t.ENUM_CONNECT_STATE = { disconnect: 0, connecting: 1, connected: 2 }, t.MAX_TRY_CONNECT_COUNT = 1, t.SEND_MSG_RESET = 2, t.SEND_MSG_TIMEOUT = 1, t.MAX_TRY_HEARTBEAT_COUNT = 5, t.MAX_STREAM_ID_LENGTH = 256, t.MAX_USER_ID_LENGTH = 64, t.MAX_USER_NAME_LENGTH = 256, t.MAX_ROOM_ID_LENGTH = 128, t.MAX_MESSAGE_LENGTH = 1024, t.MAX_MIX_TASK_ID_LENGTH = 256, t.MAX_TRANS_TYPE_LENGTH = 128, t.MAX_TRANS_DATA_LENGTH = 4096, t.MAX_RETRY_CONNECT_INTERVAL = 12, t.ENUM_PUBLISH_STREAM_STATE = { waiting_url: 1, tryPublish: 2, update_info: 3, publishing: 4, stop: 5, retryPublish: 6 }, t.ENUM_STREAM_SUB_CMD = { liveNone: 0, liveBegin: 2001, liveEnd: 2002, liveUpdate: 2003 }, t.ENUM_STREAM_CMD_PRI = { liveBegin: "zegochat_js.room_stream_create_req", liveEnd: "zegochat_js.room_stream_delete_req", liveUpdate: "zegochat_js.room_stream_update_req" }, t.ENUM_STREAM_UPDATE_TYPE = { added: 1, deleted: 0 }, (_ = t.ENUM_RUN_STATE || (t.ENUM_RUN_STATE = {}))[_.logout = 0] = "logout", _[_.trylogin = 1] = "trylogin", _[_.login = 2] = "login", (u = t.ENUM_NETWORK_STATE || (t.ENUM_NETWORK_STATE = {}))[u.offline = 0] = "offline", u[u.online = 1] = "online", t.STREAM_DELETE_REASON = { 0: { code: 1, description: "user_stop_publishing_stream_normal" }, 1: { code: 2, description: "user_heart_beat_timeout" }, 2: { code: 3, description: "user_repeat_login" }, 3: { code: 4, description: "user_kicked_out" }, 4: { code: 5, description: "user_offline" }, 100: { code: 6, description: "remove_by_server" } }, t.MINIUM_HEARTBEAT_INTERVAL = 3e3, t.ENUM_STREAM_UPDATE_CMD = { added: 12001, deleted: 12002, updated: 12003 }, t.ENUM_STREAM_UPDATE_CMD_PRI = { added: 1, updated: 2, deleted: 3 }, t.SERVER_ERROR_CODE = 1e4, t.MIXSTREAM_ERROR_CODE = 1e4, (l = t.QUALITYLEVEL || (t.QUALITYLEVEL = {}))[l.low = 1] = "low", l[l.stantard = 2] = "stantard", l[l.hight = 3] = "hight", l[l.custome = 4] = "custome", t.ENUM_SIGNAL_SUB_CMD = { none: 0, joinLiveRequest: 1001, joinLiveResult: 1002, joinLiveInvite: 1003, joinLiveStop: 1004 }, t.ENUM_PUSH_SIGNAL_SUB_CMD = { none: 0, pushJoinLiveRequest: 11001, pushJoinLiveResult: 11002, pushJoinLiveInvite: 11003, pushJoinLiveStop: 11004 }, t.ENUM_PUBLISH_STATE_NEGO = { stop: 0, start: 1, waiterAnswer: 2, waitingCandidate: 3, sendCandidate: 4, iceConnected: 5, iceDisconnected: 6 }, (a = t.ENUM_PLAY_SOURCE_TYPE || (t.ENUM_PLAY_SOURCE_TYPE = {}))[a.cdn = 0] = "cdn", a[a.ultra = 1] = "ultra", (n = t.ENUM_BROADCASTER_STATUS || (t.ENUM_BROADCASTER_STATUS = {}))[n.stop = 0] = "stop", n[n.start = 1] = "start", (i = t.ENUM_DISPATCH_TYPE || (t.ENUM_DISPATCH_TYPE = {}))[i.cdn = 0] = "cdn", i[i.ultra = 1] = "ultra", i[i.customUrl = 2] = "customUrl", (s = t.ENUM_SOURCE_TYPE || (t.ENUM_SOURCE_TYPE = {}))[s.CDN = 0] = "CDN", s[s.BGP = 1] = "BGP", (o = t.E_CLIENT_TYPE || (t.E_CLIENT_TYPE = {}))[o.ClientType_None = 0] = "ClientType_None", o[o.ClientType_H5 = 1] = "ClientType_H5", o[o.ClientType_SmallPragram = 2] = "ClientType_SmallPragram", o[o.ClientType_Webrtc = 3] = "ClientType_Webrtc";var h = function () {function e(e, t) {void 0 === e && (e = null), void 0 === t && (t = null), this._id = null, this.next = null, this.prev = null, this._id = e, this._data = t;}return Object.defineProperty(e.prototype, "id", { get: function get() {return this._id ? this._id : null;}, set: function set(e) {this._id = e;}, enumerable: !1, configurable: !0 }), Object.defineProperty(e.prototype, "data", { get: function get() {return this._data;}, set: function set(e) {this._data = e;}, enumerable: !1, configurable: !0 }), e.prototype.hasNext = function () {return this.next && this.next.id;}, e.prototype.hasPrev = function () {return this.prev && this.prev.id;}, e;}();t.ListNode = h;var E,p,T = function () {function e() {this.start = new h(), this.end = new h(), this._idCounter = 0, this._numNodes = 0, this.start.next = this.end, this.start.prev = null, this.end.prev = this.start, this.end.next = null;}return e.prototype.insertBefore = function (e, t) {var r = new h(this._idCounter, t);return r.next = e, r.prev = e.prev, e.prev && (e.prev.next = r), e.prev = r, ++this._idCounter, ++this._numNodes, r;}, e.prototype.addLast = function (e) {return this.insertBefore(this.end, e);}, e.prototype.add = function (e) {return this.addLast(e);}, e.prototype.getFirst = function () {return 0 === this._numNodes ? null : this.start.next;}, e.prototype.getLast = function () {return 0 === this._numNodes ? null : this.end.prev;}, e.prototype.size = function () {return this._numNodes;}, e.prototype.getFromFirst = function (e) {var t = 0,r = this.start.next;if (e >= 0) for (; t < e && null !== r;) {r = r.next, ++t;} else r = null;if (null === r) throw "Index out of bounds.";return r;}, e.prototype.get = function (e) {return 0 === e ? this.getFirst() : e === this._numNodes - 1 ? this.getLast() : this.getFromFirst(e);}, e.prototype.remove = function (e) {return e.prev && (e.prev.next = e.next), e.next && (e.next.prev = e.prev), --this._numNodes, e;}, e.prototype.removeFirst = function () {var e = null;return this._numNodes > 0 && this.start.next && (e = this.remove(this.start.next)), e;}, e.prototype.removeLast = function () {var e = null;return this._numNodes > 0 && this.end.prev && (e = this.remove(this.end.prev)), e;}, e.prototype.removeAll = function () {this.start.next = this.end, this.end.prev = this.start, this._numNodes = 0, this._idCounter = 0;}, e.prototype.each = function (e) {for (var t = this.start; t.hasNext();) {e(t = t.next);}}, e.prototype.find = function (e) {for (var t = this.start, r = !1, o = null; t.hasNext() && !r;) {e(t = t.next) && (o = t, r = !0);}return o;}, e.prototype.map = function (e) {for (var t = this.start, r = []; t.hasNext();) {e(t = t.next) && r.push(t);}return r;}, e.prototype.push = function (e) {return this.addLast(e);}, e.prototype.unshift = function (e) {this._numNodes > 0 ? this.insertBefore(this.start.next, e) : this.insertBefore(this.end, e);}, e.prototype.pop = function () {return this.removeLast();}, e.prototype.shift = function () {return this.removeFirst();}, e;}();t.LinkedList = T, t.ENUM_PUBLISH_STATE_UPDATE = { start: 0, error: 1, retry: 2 }, t.ENUM_PLAY_STATE_UPDATE = { start: 0, error: 1, retry: 2, stop: 3 }, t.ENUM_RETRY_STATE = { didNotStart: 0, retrying: 1, finished: 2 }, t.REPORT_ACTION = { eventStart: "eventStart", eventEndWithMsgInfo: "eventEndWithMsgInfo", addEventMsg: "addEventMsg", addEvent: "addEvent", eventEnd: "eventEnd", addMsgInfo: "addMsgInfo" }, (p = t.QualityGrade || (t.QualityGrade = {}))[p.Unknown = -1] = "Unknown", p[p.Excellent = 0] = "Excellent", p[p.Good = 1] = "Good", p[p.Middle = 2] = "Middle", p[p.Poor = 3] = "Poor", p[p.Die = 4] = "Die", (E = t.QUALITY_CONSTANT || (t.QUALITY_CONSTANT = {}))[E.MinQuality = 0] = "MinQuality", E[E.DieQuality = 0] = "DieQuality", E[E.PoorMinQuality = 1] = "PoorMinQuality", E[E.MiddleMinQuality = 30] = "MiddleMinQuality", E[E.GoodMinQuality = 60] = "GoodMinQuality", E[E.ExcellentMinQuality = 85] = "ExcellentMinQuality", E[E.MaxQuality = 100] = "MaxQuality";var m = r(194);Object.defineProperty(t, "getSeq", { enumerable: !0, get: function get() {return m.getSeq;} }), Object.defineProperty(t, "getReportSeq", { enumerable: !0, get: function get() {return m.getReportSeq;} }), Object.defineProperty(t, "ZegoExpressWebRTMEngine", { enumerable: !0, get: function get() {return m.ZegoExpressWebRTMEngine;} }), Object.defineProperty(t, "ZegoLogger", { enumerable: !0, get: function get() {return m.ZegoLogger;} }), Object.defineProperty(t, "ZegoDataReport", { enumerable: !0, get: function get() {return m.ZegoDataReport;} }), Object.defineProperty(t, "ZegoExpressWebRTM", { enumerable: !0, get: function get() {return m.ZegoExpressWebRTM;} });}, 752: function _(e, t) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.errorCodeList = t.innerErrList = void 0, t.innerErrList = { SUCCESS: { code: 0, message: "" }, SEND_MSG_TIMEOUT: { code: "Error.Timeout", message: "send custom message timeout." } }, t.errorCodeList = { NOT_LOGIN: { code: 1000002, message: "not login room" }, STREAMID_TOO_LONG: { code: 1000014, message: "stream ID is too long" }, STREAM_ID_NULL: { code: 1000015, message: "streamID is empty" }, STREAM_ID_INVALID_CHARACTER: { code: 1000016, message: "stream ID contains illegal characters" }, NETWORK_BROKEN: { code: 1000017, message: "network is broken" }, LOCALSTREAM_WRONG: { code: 1000018, message: "local stream wrong" }, GET_SOUND_LEVEL_FAIL: { code: 1000019, message: "get sound level error" }, INPUT_PARAM: { code: 1100001, message: "input parm error." }, TIMEOUT: { code: 1100002, message: "network timeout." }, SOCKET_CLOSE: { code: 1100003, msg: "socket close" }, UNKNOWN_SERVER_ERROR: { code: 1100999, message: "unknown server error" }, INIT_SDK_WRONG: { code: 1101e3, message: "init sdk wrong" }, WX_GET_SETTING_FAIL: { code: 1101001, message: "wx get setting fail" }, USER_ID_NULL: { code: 1002005, message: "user ID is empty" }, USER_ID_INVALID_CHARACTER: { code: 1002006, message: "user ID contains illegal characters" }, USER_ID_TOO_LONG: { code: 1002007, message: "user ID is too long" }, USER_NAME_NULL: { code: 1002008, message: "username is empty" }, USER_NAME_TOO_LONG: { code: 1002010, message: "username is too long" }, ROOM_ID_NULL: { code: 1002011, message: "room ID is empty" }, ROOM_ID_INVALID_CHARACTER: { code: 1002012, message: "room ID contains illegal characters" }, ROOM_ID_TOO_LONG: { code: 1002013, message: "room ID is too long" }, LOGIN_TIMEOUT: { code: 1002031, message: "login timeout" }, ROOM_MAX_USER_COUNT: { code: 1002034, message: "users logging into the room exceeds the maximum number" }, MULTIPLE_LOGIN_KICKOUT: { code: 1002050, message: "kickout may be the same user ID login other" }, ROOM_RETRY_TIMEOUT: { code: 1002053, message: "network is broken and login fail." }, MANUAL_KICKOUT: { code: 1002055, message: "server has sent a signal to kick out" }, ROOM_INNER_ERROR: { code: 1002099, message: "room inner error" }, HEARTBEAT_TIMEOUT: { code: 1102001, message: "heartbeat timeout." }, PARSE_JSON_ERROR: { code: 1102011, message: "parse json error." }, LOGIN_PROCESSING: { code: 1102012, message: "login is processing." }, LIVEROOM_REQUEST_ERROR: { code: 1102013, message: "liveroom request error." }, ZPUSH_REQUEST_FAIL: { code: 1102014, message: "zpush request fail." }, LOGIN_STATE_WRONG: { code: 1102015, message: "user login state is wrong." }, TOKEN_ERROR: { code: 1102016, message: "token error" }, DISPATCH_ERROR: { code: 1102017, message: "dispatch error" }, TOKEN_EXPIRED: { code: 1102018, message: "token expired" }, SUBCMD_ERROR: { code: 1102019, message: "subcmd error." }, ZEGO_AUTH_ERROR: { code: 1102020, message: "zego auth error." }, BIZ_CHANNEL_ERROR: { code: 1102021, message: "biz channel error." }, DISPATCH_TIMEOUT: { code: 1102022, message: "dispatch request timeout" }, CONNECT_FAILED: { code: 1102023, message: "connect signal fail" }, INVALID_CHANNEL: { code: 1102024, message: "invalid channel" }, PUBLISHER_MEDIA_SERVER_FORBID: { code: 1003025, message: "stream is forbided by media server" }, PUBLISHER_EXTRA_INFO_NULL: { code: 1003050, message: "extra info of publishing stream is null" }, PUBLISHER_EXTRA_INFO_TOO_LONG: { code: 1003051, message: "stream extra info is too long" }, PUBLISHER_PARAM: { code: 1103001, message: "input param error" }, PUBLISHER_BROWSER_NOT_SUPPORT: { code: 1103002, message: "browser do not support" }, PUBLISHER_DISPATCH_FAIL: { code: 1103003, message: "dispatch request error" }, PUBLISHER_SCREEN_FAILED: { code: 1103010, message: "screen fail" }, ENUMERATE_DEVICES_FAIL: { code: 1103011, message: "enumerate devices fail" }, PUBLISHER_DISPATCH_REQUEST_FAIL: { code: 1103020, message: "dispatch request fail" }, PUBLISHER_SESSION_REQUEST_FAIL: { code: 1103021, message: "session request fail" }, PUBLISHER_CREATE_OFFER_ERROR: { code: 1103022, message: "create offer error" }, PUBLISHER_SET_LOCAL_DESC_ERROR: { code: 1103023, message: "setLocalDescription error" }, PUBLISHER_MEDIA_DESC_ERROR: { code: 1103024, message: "mediaDesc error" }, PUBLISHER_SET_REMOTE_DESC_ERROR: { code: 1103025, message: "other side offer error" }, PUBLISHER_CANDIDATE_ERROR: { code: 1103026, message: "candidate error" }, PUBLISHER_SESSION_CLOSED: { code: 1103027, message: "server session closed" }, PUBLISHER_MEDIA_CONNECTION_ERROR: { code: 1103028, message: "ice connection error" }, PUBLISHER_CONSTRAINTS_ERROR: { code: 1103029, message: "constraint error" }, PUBLISHER_SERVER_NEGO_TIMEOUT: { code: 1103030, message: "negotiation timeout" }, PUBLISH_NOT_PUBLISH: { code: 1103040, message: "publisher not found" }, PUBLISH_DEVICE_OUT_ERR: { code: 1103041, message: "device change " }, PUBLISH_SCREEN_CANCELED: { code: 1103042, message: "screen canceled" }, PUBLISH_SCREEN_NOT_SUPPORT: { code: 1103043, message: "screen not support" }, PUBLISH_NO_PREVIEW: { code: 1103044, message: "stream is not from zego" }, VIDEO_DEVICE_FALSE: { code: 1103045, message: "video is false" }, AUDIO_DEVICE_FALSE: { code: 1103046, message: "audio is false" }, TRACK_NOT_FOUND: { code: 1103047, message: "track is not found" }, DEVICE_NOT_FOUND: { code: 1103048, message: "device is not found" }, REPEATED_PULL: { code: 1103049, message: "repeated pull same stream" }, PUBLISHER_WEBSOCKET_DISCONNECTED: { code: 1103050, message: "websocket disconnected" }, PUBLISHER_RETRY_TIMEOUT: { code: 1103051, message: "publisher retry timeout" }, PUBLISHER_CDN_PUSH_ERROR: { code: 1103052, message: "publisher cdn push error" }, PUBLISHER_HTTPS_REQUIRED: { code: 1103053, message: "https is required" }, PUBLISHER_NO_PREVIEW: { code: 1103054, message: "no preview" }, PUBLISHER_STREAM_NO_FOUND: { code: 1103055, message: "publish stream no found" }, PUBLISHER_IS_PUBLISHING: { code: 1103056, message: "publish is publishing" }, PUBLISHER_DECODE_AUDIO_FAIL: { code: 1103057, message: "decode audio data fail" }, PUBLISHER_CLIENT_IP_CHANGED: { code: 1103058, message: "client ip changed" }, PUBLISHER_TTL_OVERTIME: { code: 1103059, message: "ttl over time" }, PUBLISHER_SESSION_TIMEOUT: { code: 1103060, message: "session request timeout" }, PUBLISHER_GET_USER_MEDIA_FAIL: { code: 1103061, message: "get media fail" }, PUBLISHER_UPDATE_STREAM_INFO_FAIL: { code: 1103062, message: "update stream info fail" }, PUBLISH_TARGET_NO_RESPONSE: { code: 1103063, message: "publish target no response" }, PLAYER_PARAM: { code: 1104001, message: "input parm error" }, PLAYER_DISPATCH_REQUEST_FAIL: { code: 1104020, message: "dispatch request fail" }, PLAYER_SESSION_REQUEST_FAIL: { code: 1104021, message: "session request fail" }, PLAYER_CREATE_OFFER_ERROR: { code: 1104022, message: "create offer error" }, PLAYER_SET_LOCAL_DESC_ERROR: { code: 1104023, message: "setLocalDescription error" }, PLAYER_MEDIA_DESC_ERROR: { code: 1104024, message: "mediaDesc error" }, PLAYER_SET_REMOTE_DESC_ERROR: { code: 1104025, message: "other side offer error" }, PLAYER_CANDIDATE_ERROR: { code: 1104026, message: "candidate error" }, PLAYER_SESSION_CLOSED: { code: 1104027, message: "server session closed" }, PLAYER_MEDIA_CONNECTION_ERROR: { code: 1104028, message: "ice connection error" }, PLAYER_WEBSOCKET_DISCONNECTED: { code: 1104029, message: "websocket disconnected" }, PLAYER_SERVER_NEGO_TIMEOUT: { code: 1104030, message: "negotiation timeout" }, PLAYER_RETRY_TIMEOUT: { code: 1104031, message: "player retry timeout" }, PLAYER_IS_PLAYING: { code: 1104032, message: "player is playing" }, PLAYER_CLIENT_IP_CHANGED: { code: 1104033, message: "client ip changed" }, PLAYER_TTL_OVERTIME: { code: 1104034, message: "ttl is over time" }, PLAYER_SESSION_RESET: { code: 1104035, message: "reset session push" }, PLAYER_SESSION_TIMEOUT: { code: 1104036, message: "session request timeout" }, PLAYER_PROBE_TIMEOUT: { code: 1104037, message: "probe time out" }, PLAYER_UNSUPPORTED_PROTOCOL: { code: 1104038, message: "resource mode is not supported" }, PLAYER_PLAY_FAILED: { code: 1104039, message: "play fail,check whether the stream is pulled repeatedly or the room already exists" }, MIXER_NO_SERVICES: { code: 1005e3, message: "no mix stream service" }, MIXER_TASK_ID_NULL: { code: 1005001, message: "mixer task is null" }, MIXER_TASK_ID_TOO_LONG: { code: 1005002, message: "task ID is too long" }, MIXER_TASK_ID_INVALID_CHARACTER: { code: 1005003, message: "task ID contains illegal characters" }, MIXER_NO_OUTPUT_TARGET: { code: 1005005, message: "task configuration does not specify output" }, MIXER_OUTPUT_TARGET_INVALID: { code: 1005006, message: "stream output target is incorrect" }, MIXER_START_REQUEST_ERROR: { code: 1005010, message: "start mixer task fail, possibly due to network reasons" }, MIXER_STOP_REQUEST_ERROR: { code: 1005011, message: "stop mixer task fail, possibly due to network reasons" }, MIXER_NOT_OWNER_STOP_MIXER: { code: 1005012, message: " maxed task must be stopped by the start user of the task" }, MIXER_INPUTLIST_NULL: { code: 1005020, message: "Mixed stream task input list is null" }, MIXER_OUTPUTLIST_NULL: { code: 1005021, message: "Mixed stream task output list is null" }, MIXER_VIDEO_CONFIG_INVALID: { code: 1005023, message: "invalid mixed stream task video configuration" }, MIXER_EXCEED_MAX_INPUT_COUNT: { code: 1005025, message: "more than the maximum number of input streams" }, MIXER_INPUT_STREAM_NOT_EXISTS: { code: 1005026, message: "Input stream does not exist" }, MIXER_INPUT_PARAMETERS_ERROR: { code: 1005027, message: "mix stream input parameters are wrong" }, MIXER_EXCEED_MAX_OUTPUT_COUNT: { code: 1005030, message: "more than the maximum number of output streams" }, MIXER_AUTHENTICATION_FAILED: { code: 1005050, message: "mixed stream authentication failed" }, MIXER_WATERMARK_NULL: { code: 1005061, mag: "input watermark is null" }, MIXER_WATERMARK_PARAMETERS_ERROR: { code: 1005062, message: "input watermark parameter is wrong" }, MIXER_WATERMARK_URL_INVALID: { code: 1005063, message: "illegal input watermark URL" }, MIXER_BACKGROUND_IMAGE_URL_INVALID: { code: 1005067, message: "illegal input background image URL" }, MIXER_REPEAT_INPUT: { code: 1005099, message: "mix stream input repeat" }, MIXER_INNER_ERROR: { code: 1005099, message: "mixer internal error" }, DEVICE_ERROR_TYPE_UNPLUGGED: { code: 1006006, message: "the device is unplugged" }, IM_CONTENT_NULL: { code: 1009001, message: "message content is empty" }, IM_CONTENT_TOO_LONG: { code: 1009002, message: "message content is too long" }, IM_SEND_FAILED: { code: 1009010, message: "failed to send message" }, FREQ_LIMITED: { code: 1109001, message: "frequency limited." } };}, 529: function _(e, t, r) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.ZegoWechatLogEvent = t.ZegoRTCLogEvent = void 0;var o = r(752),s = function s(e) {return e;};t.ZegoRTCLogEvent = { kZegoTaskCreateStream: { event: "/sdk/create_stream", error: { kBrowserNotSupportError: o.errorCodeList.PUBLISHER_BROWSER_NOT_SUPPORT, kParamError: o.errorCodeList.PUBLISHER_PARAM, kScreenCancelError: o.errorCodeList.PUBLISH_SCREEN_CANCELED, kScreenFailedError: o.errorCodeList.PUBLISHER_SCREEN_FAILED, kScreenNotSupportError: o.errorCodeList.PUBLISH_SCREEN_NOT_SUPPORT, kHttpsRequiredError: o.errorCodeList.PUBLISHER_HTTPS_REQUIRED, kGetUserMediaError: o.errorCodeList.PUBLISHER_GET_USER_MEDIA_FAIL }, stream_type: s, screen: s, camera: s, custom: s }, kZegoTaskPublishStart: { event: "/sdk/api/publish_request", error: { kPublishParamError: o.errorCodeList.PUBLISHER_PARAM, kPublishNetworkTimeoutError: o.errorCodeList.TIMEOUT, kPublishDispatchTimeoutError: o.errorCodeList.DISPATCH_TIMEOUT, kPublishDispatchError: o.errorCodeList.DISPATCH_ERROR, kPublishNetworkBrokenError: o.errorCodeList.NETWORK_BROKEN, kPublishNoPreviewError: o.errorCodeList.PUBLISH_NO_PREVIEW, kPublishNoLoginError: o.errorCodeList.NOT_LOGIN, kPublishRetryTimeoutError: o.errorCodeList.PUBLISHER_RETRY_TIMEOUT, kMediaServerForbidError: o.errorCodeList.PUBLISHER_MEDIA_SERVER_FORBID, kPublishSessionClosedError: o.errorCodeList.PUBLISHER_SESSION_CLOSED, kPublishNegoTimeoutError: o.errorCodeList.PUBLISHER_SERVER_NEGO_TIMEOUT, kCreateOfferError: o.errorCodeList.PUBLISHER_CREATE_OFFER_ERROR, kSetLocalDescError: o.errorCodeList.PUBLISHER_SET_LOCAL_DESC_ERROR, kSessionTimeoutError: o.errorCodeList.PUBLISHER_SESSION_TIMEOUT, kSessionRequestError: o.errorCodeList.PUBLISHER_SESSION_REQUEST_FAIL, kSetRemoteDescError: o.errorCodeList.PUBLISHER_SET_REMOTE_DESC_ERROR, kMediaConnectionError: o.errorCodeList.PUBLISHER_MEDIA_CONNECTION_ERROR, kWebsocketDisconnectedError: o.errorCodeList.PUBLISHER_WEBSOCKET_DISCONNECTED, kMediaDescError: o.errorCodeList.PUBLISHER_MEDIA_DESC_ERROR, kCandidateError: o.errorCodeList.PUBLISHER_CANDIDATE_ERROR, kIsPublishing: o.errorCodeList.PUBLISHER_IS_PUBLISHING, kClientIPChangedError: o.errorCodeList.PUBLISHER_CLIENT_IP_CHANGED, kTTLOverTimeError: o.errorCodeList.PUBLISHER_TTL_OVERTIME }, publishOption: s, message: s, session_id: s, stream: s, video_en_codec_id: s, cap_w: s, cap_h: s, w: s, h: s, video_en_fps: s, video_en_bps: s, audio_c_channel_count: s, audio_en_bps: s, aec_level: s, ans_level: s, agc: s, traffic_control_min_video_bitrate: s }, kZegoTaskVideoCaptureSize: { event: "/sdk/api/publish_video_c_size", session_id: s, w: s, h: s }, kZegoTaskVideoPlaySize: { event: "/sdk/play_video_size_changed", session_id: s, w: s, h: s }, kZegoTaskRePublish: { event: "/sdk/republish", stream: s }, kZegoTaskPublishStop: { event: "/sdk/stop_publish", error: { kParamError: o.errorCodeList.PUBLISHER_PARAM }, stream: s }, kZegoTaskPlayStart: { event: "/sdk/api/play_request", error: { kStreamIDNullError: o.errorCodeList.STREAM_ID_NULL, kPlayParamError: o.errorCodeList.PLAYER_PARAM, kPlayStreamIDToLongError: o.errorCodeList.STREAMID_TOO_LONG, kPlayStreamIDInvalidCharacterError: o.errorCodeList.STREAM_ID_INVALID_CHARACTER, kPlayNoLoginError: o.errorCodeList.NOT_LOGIN, kPlayRepeatedPullError: o.errorCodeList.REPEATED_PULL, kPlayNetworkTimeoutError: o.errorCodeList.TIMEOUT, kPlayDispatchTimeoutError: o.errorCodeList.DISPATCH_TIMEOUT, kPlayDispatchError: o.errorCodeList.DISPATCH_ERROR, kPlayNetworkBrokenError: o.errorCodeList.NETWORK_BROKEN, kPlayUnsupportedResourceMode: o.errorCodeList.PLAYER_UNSUPPORTED_PROTOCOL, kPlayRetryTimeoutError: o.errorCodeList.PLAYER_RETRY_TIMEOUT, kPlaySessionClosedError: o.errorCodeList.PLAYER_SESSION_CLOSED, kPlaySessionResetError: o.errorCodeList.PLAYER_SESSION_RESET, kPlayNegoTimeoutError: o.errorCodeList.PLAYER_SERVER_NEGO_TIMEOUT, kCreateOfferError: o.errorCodeList.PLAYER_CREATE_OFFER_ERROR, kSetLocalDescError: o.errorCodeList.PLAYER_SET_LOCAL_DESC_ERROR, kSessionRequestError: o.errorCodeList.PLAYER_SESSION_REQUEST_FAIL, kSessionTimeoutError: o.errorCodeList.PLAYER_SESSION_TIMEOUT, kSetRemoteDescError: o.errorCodeList.PLAYER_SET_REMOTE_DESC_ERROR, kMediaConnectionError: o.errorCodeList.PLAYER_MEDIA_CONNECTION_ERROR, kWebsocketDisconnectedError: o.errorCodeList.PLAYER_WEBSOCKET_DISCONNECTED, kCandidateError: o.errorCodeList.PLAYER_CANDIDATE_ERROR, kMediaDescError: o.errorCodeList.PLAYER_MEDIA_DESC_ERROR, kIsPlaying: o.errorCodeList.PLAYER_IS_PLAYING, kClientIPChangedError: o.errorCodeList.PLAYER_CLIENT_IP_CHANGED, kTTLOverTimeError: o.errorCodeList.PLAYER_TTL_OVERTIME, kProbeTimeOutError: o.errorCodeList.PLAYER_PROBE_TIMEOUT }, playOption: s, message: s, session_id: s, stream: s, audio_activate: s, video_activate: s }, kZegoTaskRePlay: { event: "/sdk/replay", stream: s }, kZegoTaskPlayStop: { event: "/sdk/stop_play", error: { kParamError: o.errorCodeList.PUBLISHER_PARAM }, stream: s }, kZegoPlayContentChanged: { event: "/sdk/play_content_changed", session_id: s, video_activate: s, audio_activate: s }, kZegoTaskMixStart: { event: "/mix/start_mix", error: { kParamError: o.errorCodeList.INPUT_PARAM, kTaskIDNullError: o.errorCodeList.MIXER_TASK_ID_NULL, kTaskIDToLongError: o.errorCodeList.MIXER_TASK_ID_TOO_LONG, kTaskIDInvalidCharacterError: o.errorCodeList.MIXER_TASK_ID_INVALID_CHARACTER, kInputListNullError: o.errorCodeList.MIXER_INPUTLIST_NULL, kOutputListNullError: o.errorCodeList.MIXER_OUTPUTLIST_NULL, kOutputTargetInvalidError: o.errorCodeList.MIXER_OUTPUT_TARGET_INVALID, kOutputNoTargetError: o.errorCodeList.MIXER_NO_OUTPUT_TARGET, kRequestError: o.errorCodeList.MIXER_START_REQUEST_ERROR, kInternalError: o.errorCodeList.MIXER_INNER_ERROR, kNoLoginError: o.errorCodeList.NOT_LOGIN }, mix_stream_id: s, stream_cnt: s, input_stream_list: s, output_target_list: s }, kZegoTaskMixStop: { event: "/mix/stop_mix", error: { kParamError: o.errorCodeList.INPUT_PARAM, kTaskIDNullError: o.errorCodeList.MIXER_TASK_ID_NULL, kRequestError: o.errorCodeList.MIXER_STOP_REQUEST_ERROR, kInternalError: o.errorCodeList.MIXER_INNER_ERROR, kNoLoginError: o.errorCodeList.NOT_LOGIN } }, kZegoTaskMixConfig: { event: "/mix/config_mix", error: { kParamError: o.errorCodeList.INPUT_PARAM, kVideoConfigInvalidError: o.errorCodeList.MIXER_VIDEO_CONFIG_INVALID, kBackgroundImageUrlInvalidError: o.errorCodeList.MIXER_BACKGROUND_IMAGE_URL_INVALID, kNoLoginError: o.errorCodeList.NOT_LOGIN }, config: s }, kZegoTaskEnumDevices: { event: "/device/list", error: { kBrowserNotSupportError: o.errorCodeList.PUBLISHER_BROWSER_NOT_SUPPORT, kEnumDevicesError: o.errorCodeList.ENUMERATE_DEVICES_FAIL }, dev_list: s }, kZegoTaskAudioOutput: { event: "/device/audio_capture", error: { kBrowserNotSupportError: o.errorCodeList.PUBLISHER_BROWSER_NOT_SUPPORT, kEnumDevicesError: o.errorCodeList.ENUMERATE_DEVICES_FAIL }, session_id: s, device: s }, kZegoTaskVideoCapture: { event: "/device/video_capture", error: { kBrowserNotSupportError: o.errorCodeList.PUBLISHER_BROWSER_NOT_SUPPORT, kEnumDevicesError: o.errorCodeList.ENUMERATE_DEVICES_FAIL }, session_id: s, device: s }, kZegoTaskDeviceInterrupt: { event: "/device/interrupt", error: { kBrowserNotSupportError: o.errorCodeList.PUBLISHER_BROWSER_NOT_SUPPORT, kEnumDevicesError: o.errorCodeList.ENUMERATE_DEVICES_FAIL }, session_id: s, interrupt: s }, kZegoTaskSetDebug: "/sdk/set_debug", kZegoTaskSetLog: "/sdk/set_log_config", kZegoTaskUseVideoDevice: { event: "/device/api/video_c", error: { kParamError: o.errorCodeList.INPUT_PARAM, kDevicesNoFoundError: o.errorCodeList.DEVICE_NOT_FOUND, kLocalStreamError: o.errorCodeList.LOCALSTREAM_WRONG }, device: s }, kZegoTaskUseAudioDevice: { event: "/device/api/audio_c", error: { kParamError: o.errorCodeList.INPUT_PARAM, kDevicesNoFoundError: o.errorCodeList.DEVICE_NOT_FOUND, kLocalStreamError: o.errorCodeList.LOCALSTREAM_WRONG }, device: s }, kZegoTaskCheckSystemRequirements: { event: "/sdk/check_system", capability: s }, kZegoTaskMutePublishVideo: "/sdk/mute_publish_video", kZegoTaskMutePublishAudio: "/sdk/mute_publish_audio", kZegoTaskMuteMicrophone: "/sdk/mute_microphone", kZegoTaskMutePlayVideo: "/sdk/mute_play_video", kZegoTaskMutePlayAudio: "/sdk/mute_play_audio", kZegoTaskRemoteCameraUpdate: { event: "/sdk/remote_camera_update", stream: s, status: s }, kZegoTaskRemoteMicUpdate: { event: "/sdk/remote_mic_update", stream: s, status: s }, kZegoTaskGetSoundLevel: { event: "/sdk/get_sound_level", error: { kGetSoundLevelError: o.errorCodeList.GET_SOUND_LEVEL_FAIL } }, kZegoTaskStopSoundLevel: "/sdk/stop_sound_level", kZegoTaskAddPublishCdnUrl: { event: "/sdk/add_publish_cdn_url", error: { kParamError: o.errorCodeList.INPUT_PARAM } }, kZegoTaskRemovePublishCdnUrl: { event: "/sdk/remove_publish_cdn_url", error: { kParamError: o.errorCodeList.INPUT_PARAM }, stream: s, target_url: s }, kZegoTaskClearPublishCdnUrl: { event: "/sdk/clear_publish_cdn_url", error: { kParamError: o.errorCodeList.INPUT_PARAM } }, kZegoTaskPublishTarget: { event: "/sdk/publish_target", error: { kParamError: o.errorCodeList.INPUT_PARAM, kPublishStreamNoFoundError: o.errorCodeList.PUBLISHER_STREAM_NO_FOUND, kNoLoginError: o.errorCodeList.NOT_LOGIN, kNoResponseError: o.errorCodeList.PUBLISH_TARGET_NO_RESPONSE, kBizChannelError: o.errorCodeList.BIZ_CHANNEL_ERROR, kInvalidChannelError: o.errorCodeList.INVALID_CHANNEL, kUnknownServerError: o.errorCodeList.UNKNOWN_SERVER_ERROR } }, kZegoTaskDestroyStream: { event: "/sdk/destroy_stream", error: { kLocalStreamError: o.errorCodeList.LOCALSTREAM_WRONG } }, kZegoTaskScreenSharingEnded: "/sdk/screen_share_end", kZegoTaskAudioOutputChanged: { event: "/device/api/audio_output", session_id: s, stream: s, device: s, reason: s }, kZegoEventPublishStat: "/sdk/publish_stat_report", kZegoEventPlayStat: "/sdk/play_stat_report", kZegoSetAudioConfig: { event: "/sdk/set_audio_config", error: { kParamError: o.errorCodeList.INPUT_PARAM } }, kZegoSetVideoConfig: { event: "/sdk/set_video_config", error: { kParamError: o.errorCodeList.INPUT_PARAM, kLocalStreamError: o.errorCodeList.LOCALSTREAM_WRONG } }, kZegoReplaceTrack: { event: "/sdk/replace_track", error: { kParamError: o.errorCodeList.INPUT_PARAM } }, kZegoTaskLiveRoomGetStreamUpdateInfo: { event: "/liveroom/get_stream_update_info", stream_update_type: s, update_stream: s }, kZegoTaskLiveRoomGetStreamExtraInfo: { event: "/liveroom/get_stream_extra_info", update_stream: s }, kZegoTaskLiveRoomSendStreamExtraInfo: { event: "/liveroom/send_stream_extra_info", error: { kParamError: o.errorCodeList.INPUT_PARAM, kExtraInfoNullError: o.errorCodeList.PUBLISHER_EXTRA_INFO_NULL, kNoLoginError: o.errorCodeList.NOT_LOGIN, kPublishStreamNoFoundError: o.errorCodeList.PUBLISHER_STREAM_NO_FOUND, kUpdateStreamInfoFailError: o.errorCodeList.PUBLISHER_UPDATE_STREAM_INFO_FAIL }, stream: s, stream_extra_info: s, room_sid: s }, kZegoTaskPlayDecodeFirstVideoFrame: { event: "/sdk/play_decode_first_video_frame", session_id: s, fft_consumed: s }, kZegoVisibilityChange: { event: "/app/background" }, kZegoSetCaptureVolume: { event: "/sdk/set_capture_volume", error: { kParamError: o.errorCodeList.INPUT_PARAM } }, kZegoListener: { event: "/sdk/listener" }, kZegoNetProbe: { event: "/sdk/net_probe" }, kZegoNetProbeResult: { event: "/sdk/net_probe_result" } }, t.ZegoWechatLogEvent = { kZegoTaskCheckSystemRequirements: { event: "/sdk/check_system", error: { kCheckSystemGetSettingFailError: o.errorCodeList.WX_GET_SETTING_FAIL }, capability: s }, kZegoTaskPublishStart: { event: "/sdk/api/publish_request", error: { kPublishStreamIDNullError: o.errorCodeList.STREAM_ID_NULL, kPublishParamError: o.errorCodeList.PUBLISHER_PARAM, kPublishStreamIDTooLongError: o.errorCodeList.STREAMID_TOO_LONG, kPublishStreamIDInvalidCharacterError: o.errorCodeList.STREAM_ID_INVALID_CHARACTER, kPublishNetworkTimeoutError: o.errorCodeList.TIMEOUT, kPublishDispatchTimeoutError: o.errorCodeList.DISPATCH_TIMEOUT, kPublishDispatchError: o.errorCodeList.DISPATCH_ERROR, kPublishNetworkBrokenError: o.errorCodeList.NETWORK_BROKEN, kPublishNoLoginError: o.errorCodeList.NOT_LOGIN, kPublishRetryTimeoutError: o.errorCodeList.PUBLISHER_RETRY_TIMEOUT, kIsPublishing: o.errorCodeList.PUBLISHER_IS_PUBLISHING }, publishOption: s, stream: s, message: s }, kZegoTaskPlayStart: { event: "/sdk/api/play_request", error: { kPlayStreamIDNullError: o.errorCodeList.STREAM_ID_NULL, kPlayParamError: o.errorCodeList.PLAYER_PARAM, kPlayStreamIDTooLongError: o.errorCodeList.STREAMID_TOO_LONG, kPlayStreamIDInvalidCharacterError: o.errorCodeList.STREAM_ID_INVALID_CHARACTER, kPlayNoLoginError: o.errorCodeList.NOT_LOGIN, kPlayRepeatedPullError: o.errorCodeList.REPEATED_PULL, kPlayNetworkTimeoutError: o.errorCodeList.TIMEOUT, kPlayDispatchTimeoutError: o.errorCodeList.DISPATCH_TIMEOUT, kPlayDispatchError: o.errorCodeList.DISPATCH_ERROR, kPlayNetworkBrokenError: o.errorCodeList.NETWORK_BROKEN, kPlayRetryTimeoutError: o.errorCodeList.PLAYER_RETRY_TIMEOUT, kIsPlaying: o.errorCodeList.PLAYER_IS_PLAYING, kPlayFailed: o.errorCodeList.PLAYER_PLAY_FAILED }, playOption: s, message: s, session_id: s, stream: s, audio_activate: s, video_activate: s }, kZegoEventPublishStat: "/sdk/publish_stat_report", kZegoEventPlayStat: "/sdk/play_stat_report", kZegoTaskRePublish: "/sdk/republish", kZegoTaskRePlay: "/sdk/replay", kZegoTaskPublishStop: { event: "/sdk/stop_publish", error: { kParamError: o.errorCodeList.PUBLISHER_PARAM }, stream: s }, kZegoTaskPlayStop: { event: "/sdk/stop_play", error: { kParamError: o.errorCodeList.PUBLISHER_PARAM }, stream: s }, kZegoTaskLiveRoomGetStreamUpdateInfo: { event: "/liveroom/get_stream_update_info", stream_update_type: s, update_stream: s }, kZegoTaskLiveRoomGetStreamExtraInfo: { event: "/liveroom/get_stream_extra_info", update_stream: s }, kZegoTaskMixStart: { event: "/mix/start_mix", error: { kParamError: o.errorCodeList.INPUT_PARAM, kTaskIDNullError: o.errorCodeList.MIXER_TASK_ID_NULL, kTaskIDToLongError: o.errorCodeList.MIXER_TASK_ID_TOO_LONG, kTaskIDInvalidCharacterError: o.errorCodeList.MIXER_TASK_ID_INVALID_CHARACTER, kInputListNullError: o.errorCodeList.MIXER_INPUTLIST_NULL, kOutputListNullError: o.errorCodeList.MIXER_OUTPUTLIST_NULL, kOutputTargetInvalidError: o.errorCodeList.MIXER_OUTPUT_TARGET_INVALID, kOutputNoTargetError: o.errorCodeList.MIXER_NO_OUTPUT_TARGET, kRequestError: o.errorCodeList.MIXER_START_REQUEST_ERROR, kInternalError: o.errorCodeList.MIXER_INNER_ERROR }, mix_stream_id: s, stream_cnt: s, input_stream_list: s, output_target_list: s }, kZegoTaskMixStop: { event: "/mix/stop_mix", error: { kParamError: o.errorCodeList.INPUT_PARAM, kTaskIDNullError: o.errorCodeList.MIXER_TASK_ID_NULL, kRequestError: o.errorCodeList.MIXER_STOP_REQUEST_ERROR, kInternalError: o.errorCodeList.MIXER_INNER_ERROR } }, kZegoTaskMixConfig: { event: "/mix/config_mix", error: { kParamError: o.errorCodeList.INPUT_PARAM, kVideoConfigInvalidError: o.errorCodeList.MIXER_VIDEO_CONFIG_INVALID, kBackgroundImageUrlInvalidError: o.errorCodeList.MIXER_BACKGROUND_IMAGE_URL_INVALID }, config: s }, kZegoTaskLiveRoomSendStreamExtraInfo: { event: "/liveroom/send_stream_extra_info", error: { kParamError: o.errorCodeList.INPUT_PARAM, kExtraInfoNullError: o.errorCodeList.PUBLISHER_EXTRA_INFO_NULL, kNoLoginError: o.errorCodeList.NOT_LOGIN, kPublishStreamNoFoundError: o.errorCodeList.PUBLISHER_STREAM_NO_FOUND, kUpdateStreamInfoFailError: o.errorCodeList.PUBLISHER_UPDATE_STREAM_INFO_FAIL }, stream: s, stream_extra_info: s, room_sid: s } };}, 608: function _(e, t, r) {"use strict";var o = this && this.__awaiter || function (e, t, r, o) {return new (r || (r = Promise))(function (s, i) {function n(e) {try {l(o.next(e));} catch (e) {i(e);}}function a(e) {try {l(o.throw(e));} catch (e) {i(e);}}function l(e) {var t;e.done ? s(e.value) : (t = e.value, t instanceof r ? t : new r(function (e) {e(t);})).then(n, a);}l((o = o.apply(e, t || [])).next());});},s = this && this.__generator || function (e, t) {var r,o,s,i,n = { label: 0, sent: function sent() {if (1 & s[0]) throw s[1];return s[1];}, trys: [], ops: [] };return i = { next: a(0), throw: a(1), return: a(2) }, "function" == typeof Symbol && (i[Symbol.iterator] = function () {return this;}), i;function a(i) {return function (a) {return function (i) {if (r) throw new TypeError("Generator is already executing.");for (; n;) {try {if (r = 1, o && (s = 2 & i[0] ? o.return : i[0] ? o.throw || ((s = o.return) && s.call(o), 0) : o.next) && !(s = s.call(o, i[1])).done) return s;switch (o = 0, s && (i = [2 & i[0], s.value]), i[0]) {case 0:case 1:s = i;break;case 4:return n.label++, { value: i[1], done: !1 };case 5:n.label++, o = i[1], i = [0];continue;case 7:i = n.ops.pop(), n.trys.pop();continue;default:if (!((s = (s = n.trys).length > 0 && s[s.length - 1]) || 6 !== i[0] && 2 !== i[0])) {n = 0;continue;}if (3 === i[0] && (!s || i[1] > s[0] && i[1] < s[3])) {n.label = i[1];break;}if (6 === i[0] && n.label < s[1]) {n.label = s[1], s = i;break;}if (s && n.label < s[2]) {n.label = s[2], n.ops.push(i);break;}s[2] && n.ops.pop(), n.trys.pop();continue;}i = t.call(e, n);} catch (e) {i = [6, e], o = 0;} finally {r = s = 0;}}if (5 & i[0]) throw i[1];return { value: i[0] ? i[1] : void 0, done: !0 };}([i, a]);};}};Object.defineProperty(t, "__esModule", { value: !0 }), t.ClientUtil = void 0;var i = r(706),n = r(529),a = r(395),l = function () {function e() {}return e.checkIllegalCharacters = function (e) {return /^([0-9a-zA-Z#!$%&()`'+-;<=.>@^_~,\\*])+$/.test(e) && /^[^:/]*$/g.test(e);}, e.isUrl = function (e) {return !!(e.startsWith("rtmp://") || e.startsWith("https://") && e.endsWith(".flv") || e.startsWith("https://") && e.endsWith(".m3u8"));}, e.registerCallback = function (e, t, r) {var o, s;t.success && (o = t.success, r[e + "SuccessCallback"] = o), t.error && (s = t.error, r[e + "ErrorCallback"] = s);}, e.actionErrorCallback = function (e, t) {return t[e + "ErrorCallback"];}, e.actionSuccessCallback = function (e, t) {return t[e + "SuccessCallback"];}, e.logReportCallback = function (t, r, o, s) {e.registerCallback(t, { success: function success(t, s) {for (var i = [], n = 2; n < arguments.length; n++) {i[n - 2] = arguments[n];}e.dataReportEvent(r, o, t, s, i);} }, s);}, e.actionLogReportCallback = function (t, r, o, s, i) {e.actionSuccessCallback(t, r) && e.actionSuccessCallback(t, r)(o, s);}, e.getServerError = function (e) {var t = { 1: "parse json error.", 1001: "login is processing.", 1002: "liveroom request error.", 1003: "zpush connect fail.", 1004: "zpush handshake fail.", 1005: "zpush login fail.", 1006: "user login state is wrong.", 1007: "got no zpush addr", 1008: "token error", 1009: "dispatch error", 1010: "token expired", 1011: "token format error", 2002: "biz channel error", 1e9: "liveroom cmd error, code:" };if (0 === e) return { code: 0, message: "" };var r = { code: 0, message: "liveroom cmd error" };return r.code = e, r.message = e > 1e9 ? t[1e9] + e : t[e] ? t[e] + " code:" + e : "unknown error code:" + e, r;}, e.unregisterCallback = function (e, t) {delete t[e + "SuccessCallback"], delete t[e + "ErrorCallback"];}, e.decodeServerError = function (e, t) {var r = { code: -1, message: "server error" };return e > 1e9 && (r.code = e - 1e9 + 52e6), t && (r.message = t), r;}, e.getLiveRoomError = function (e) {return e > 1e9 ? { 1105: "ROOM_MAX_USER_COUNT", 1012: "PUBLISHER_ERROR_REPETITIVE_PUBLISH_STREAM", 2002: "ROOM_ERROR_AUTHENTICATION_FAILED", 2003: "ROOM_ERROR_LOGIN_TIMEOUT" }[e - 1e9] || "" : { 1: "PARSE_JSON_ERROR", 1001: "LOGIN_PROCESSING", 1002: "LIVEROMM_REQUEST_ERROR", 1003: "ZPUSH_REQUEST_FAIL", 1004: "ZPUSH_REQUEST_FAIL", 1005: "ZPUSH_REQUEST_FAIL", 1006: "LOGIN_STATE_WRONG", 1007: "ZPUSH_REQUEST_FAIL", 1008: "TOKEN_ERROR", 1009: "DIAPATCH_ERROR", 1010: "TOKEN_EXPIRED", 1011: "TOKEN_ERROR", 1012: "SUBCMD_ERROR", 1101: "ZEGO_AUTH_ERROR", 2001: "BIZ_CHANNEL_ERROR", 2002: "BIZ_CHANNEL_ERROR" }[e] || "ROOM_INNER_ERROR";}, e.mixServerError = function (e) {var t = { 1: "MIXER_START_REQUEST_ERROR", 2: "MIXER_START_REQUEST_ERROR", 3: "MIXER_AUTHENTICATION_FAILED", 150: "MIXER_INPUT_STREAM_NOT_EXISTS", 151: "MIXER_START_REQUEST_ERROR", 152: "MIXER_STOP_REQUEST_ERROR", 153: "MIXER_INPUT_PARAMETERS_ERROR", 154: "MIXER_EXCEED_MAX_OUTPUT_COUNT", 155: "MIXER_INPUT_PARAMETERS_ERROR", 156: "MIXER_VIDEO_CONFIG_INVALID", 157: "MIXER_NO_SERVICES", 158: "MIXER_EXCEED_MAX_INPUT_COUNT", 159: "MIXER_START_REQUEST_ERROR", 160: "MIXER_NOT_OWNER_STOPMIXER", 170: "MIXER_WATERMARK_PARAMETERS_ERROR", 171: "MIXER_WATERMARK_NULL", 175: "MIXER_REPEAT_INPUT", 190: "MIXER_START_REQUEST_ERROR" },r = "MIXER_INNER_ERROR";return e > 1e9 && t[e - 1e9] && (r = t[e - 1e9]), r;}, e.getKickoutError = function (e) {var t = {};switch (e) {case 1:case 4:t.code = 63000001, t.message = "zpush multiple login kickout", t.name = "MULTIPLE_LOGIN_KICKOUT";break;case 2:t.code = 63000002, t.message = "zpush manual kickout", t.name = "MANUAL_KICKOUT";break;case 3:t.code = 63000003, t.message = "kickout reason = " + e;break;default:t.code = e, t.message = "kickout reason = " + e;}return t;}, e.dataReportEvent = function (e, t, r, o, s) {switch (r) {case "eventStart":e.eventStart(t, o);break;case "eventEndWithMsgInfo":e.eventEndWithMsgInfo(t, o, s[0]);break;case "addEventMsg":e.addEventMsg(t, o, s[0], s[1]);break;case "addEvent":e.addEvent(t, o);break;case "eventEnd":e.eventEnd(t, o);break;case "addMsgInfo":e.addMsgInfo(t, s[0]);}}, e.isKeepTryLogin = function (e) {switch (e) {case 1002:case 1003:return !0;default:return !1;}}, e.mergeStreamList = function (e, t, r, o) {var s,i = [],n = [],a = [];r || (r = []);for (var l = 0; l < r.length; l++) {if (r[l].anchor_id_name != e && r[l].user_id != e) {s = !1;for (var u = 0; u < t.length; u++) {if (r[l].stream_id === t[u].stream_id) {r[l].extra_info !== t[u].extra_info && a.push(r[l]), s = !0;break;}}s || i.push(r[l]);}}for (var _ = 0; _ < t.length; _++) {s = !1;for (var d = 0; d < r.length; d++) {if (t[_].stream_id === r[d].stream_id) {s = !0;break;}}s || n.push(t[_]);}for (t.splice(0), l = 0; l < r.length; l++) {t.push(r[l]);}o(i, n, a);}, e.checkInteger = function (e, t) {return 0 == t ? "number" == typeof e && e % 1 == 0 && e >= 0 : "number" == typeof e && e % 1 == 0 && e > 0;}, e.checkValidNumber = function (e, t, r) {return t = t || 1, r = r || 1e4, "number" == typeof e && e % 1 == 0 && e >= t && e <= r;}, e.uuid = function (e, t) {var r,o = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),s = [];if (t = t || o.length, e) for (r = 0; r < e; r++) {s[r] = o[0 | Math.random() * t];} else {var i = void 0;for (s[8] = s[13] = s[18] = s[23] = "-", s[14] = "4", r = 0; r < 36; r++) {s[r] || (i = 0 | 16 * Math.random(), s[r] = o[19 == r ? 3 & i | 8 : i]);}}return s.join("");}, e.supportDetection = function (e, t, r, i) {return o(this, void 0, void 0, function () {var o, n, a, l, u, _, d, c;return s(this, function (s) {switch (s.label) {case 0:return o = { webRTC: !1, customCapture: !1, camera: !1, microphone: !1, videoCodec: { H264: !1, H265: !1, VP8: !1, VP9: !1 }, screenSharing: e, errInfo: {} }, i && "screenSharing" === i ? [2, t({ result: e, errInfo: o.errInfo })] : i && "customCapture" !== i || (((n = document.createElement("video")).captureStream || n.mozCaptureStream) && (o.customCapture = !0), "customCapture" !== i) ? (a = navigator && navigator.mediaDevices && navigator.mediaDevices.getUserMedia, l = "https:" !== window.location.protocol && "file:" !== window.location.protocol && -1 == window.location.hostname.indexOf("127.0.0.1") && -1 == window.location.hostname.indexOf("localhost"), i && "camera" !== i && "microphone" !== i ? [3, 9] : a ? l ? (o.camera = !1, console.error("webrtc requires https or localhost"), [3, 9]) : [3, 1] : [3, 9]) : (t({ result: o.customCapture, errInfo: o.errInfo }), [2]);case 1:if (i && "camera" !== i) return [3, 5];s.label = 2;case 2:return s.trys.push([2, 4,, 5]), [4, navigator.mediaDevices.getUserMedia({ video: !0 })];case 3:return (u = s.sent()) && (o.camera = !0) && u.getTracks().forEach(function (e) {return e.stop();}), [3, 5];case 4:return _ = s.sent(), o.errInfo.camera = { name: _.name, message: _.message }, console.error("camera devices detect error: ", _.name, _.message), [3, 5];case 5:if (i && "microphone" !== i) return [3, 9];s.label = 6;case 6:return s.trys.push([6, 8,, 9]), [4, navigator.mediaDevices.getUserMedia({ audio: !0 })];case 7:return (d = s.sent()) && (o.microphone = !0) && d.getTracks().forEach(function (e) {return e.stop();}), [3, 9];case 8:return c = s.sent(), o.errInfo.microphone = { name: c.name, message: c.message }, console.error("microphone devices detect error: ", c.name, c.message), [3, 9];case 9:return "camera" === i || "microphone" === i ? (t({ result: o[i], errInfo: o.errInfo }), [2]) : (this.supportVideoCodeType(function (e, r) {i || (o.videoCodec.H264 = e.H264, o.videoCodec.H265 = e.H265, o.videoCodec.VP8 = e.VP8, o.videoCodec.VP9 = e.VP9, o.webRTC = e.webRTC), r && ("string" == typeof r ? o.errInfo.extendedDate = r : o.errInfo.webRTC = { name: r.name, message: r.message }, console.error("videoCodec detect error: " + r)), t && t(i ? { result: e[i], errInfo: o.errInfo } : o);}, r, i), [2]);}});});}, e.getDevices = function (e, t) {void 0 !== navigator.mediaDevices && void 0 !== navigator.mediaDevices.enumerateDevices ? navigator.mediaDevices.enumerateDevices().then(function (t) {for (var r = [], o = [], s = [], i = 0; i < t.length; i++) {var n = t[i];"audioinput" === n.kind && r.push({ deviceName: n.label, deviceID: n.deviceId }), "audiooutput" === n.kind && o.push({ deviceName: n.label, deviceID: n.deviceId }), "videoinput" === n.kind && s.push({ deviceName: n.label, deviceID: n.deviceId });}e && e({ microphones: r, speakers: o, cameras: s });}).catch(function (e) {console.error("enumerate devices wrong " + e), t && t(n.ZegoRTCLogEvent.kZegoTaskEnumDevices.error.kEnumDevicesError);}) : t && t(n.ZegoRTCLogEvent.kZegoTaskEnumDevices.error.kBrowserNotSupportError);}, e.compareVersion = function (e, t) {e = e.split("."), t = t.split(".");for (var r = Math.max(e.length, t.length); e.length < r;) {e.push("0");}for (; t.length < r;) {t.push("0");}for (var o = 0; o < r; o++) {var s = parseInt(e[o]),i = parseInt(t[o]);if (s > i) return 1;if (s < i) return -1;}return 0;}, e.isSupportLive = function (e, t) {var r = wx.getSystemInfoSync().SDKVersion,o = { code: 0, msg: "" };this.compareVersion(r, "1.7.0") < 0 && (o = { code: 10001, msg: "当前微信版本过低，无法使用相关组件" }, e && e(o)), wx.getSetting({ success: function success(t) {var r = t.authSetting;r["scope.camera"] && r["scope.record"] || (o = { code: 10002, msg: "需要摄像头和录音功能的授权" }), e && e(o);}, fail: function fail(e) {console.error("get setting error", e), t && t(e);} });}, e.supportVideoCodeType = function (e, t, r) {return o(this, void 0, void 0, function () {var o, i, n, l, u, _, d, c, g, h;return s(this, function (s) {switch (s.label) {case 0:return o = { webRTC: !1, H264: !1, VP8: !1, VP9: !1, H265: !1 }, r ? 1 !== t || "VP8" !== r && "H264" !== r ? [3, 2] : [4, (h = new a.CheckModule()).checkSupportByType(r)] : [3, 2];case 1:return "boolean" == typeof (i = s.sent()) ? (o[r] = i, [2, e(o)]) : (o[r] = !1, [2, e(o, i)]);case 2:if ("webRTC" !== r && 1 !== t) return [3, 7];s.label = 3;case 3:return s.trys.push([3, 5,, 6]), [4, new RTCPeerConnection().createOffer({ offerToReceiveAudio: !0, offerToReceiveVideo: !0 })];case 4:return s.sent(), o.webRTC = !0, [3, 6];case 5:return n = s.sent(), e && e(o, n), [3, 6];case 6:if ("webRTC" === r) return [2, e(o)];s.label = 7;case 7:if (1 === t) {for (l = "", _ = [], d = 0, c = u = ["VP8", "H264"]; d < c.length; d++) {g = c[d], h = new a.CheckModule(), _.push(h.checkSupportByType(g));}return Promise.all(_).then(function (t) {t.forEach(function (e, t) {"boolean" == typeof e ? o[u[t]] = !0 : (o[u[t]] = !1, l = e);}), l ? e(o, l) : e(o);}), [2];}try {new RTCPeerConnection().createOffer({ offerToReceiveAudio: !0, offerToReceiveVideo: !0 }).then(function (t) {if (o.webRTC = !0, t && t.sdp) {var s = t.sdp.split("\r\n");if (o.H264 = s.some(function (e) {return e.startsWith("a=rtpmap:") && e.indexOf("H264/") > -1;}), "H264" === r) return e(o);if (o.VP8 = s.some(function (e) {return e.startsWith("a=rtpmap:") && e.indexOf("VP8/") > -1;}), "VP8" === r) return e(o);o.VP9 = s.some(function (e) {return e.startsWith("a=rtpmap:") && e.indexOf("VP9/") > -1;}), o.H265 = s.some(function (e) {return e.startsWith("a=rtpmap:") && e.indexOf("H265/") > -1;}), e && e(o);}});} catch (t) {e && e(o, t);}return [2];}});});}, e.inlineWorker = function (e) {if (Worker && e) {var t = e.toString().trim().match(/^function\s*\w*\s*\([\w\s,]*\)\s*{([\w\W]*?)}$/)[1],r = URL.createObjectURL(new window.Blob([t], { type: "text/javascript" }));return new Worker(r);}return null;}, e.getBrowser = function () {var e = window.navigator.userAgent,t = null != window.ActiveXObject && -1 != e.indexOf("MSIE"),r = -1 != e.indexOf("Firefox"),o = null != window.opr,s = e.indexOf("Chrome") && window.chrome,i = -1 != e.indexOf("Safari") && -1 != e.indexOf("Version");return t ? "IE" : r ? "Firefox" : o ? "Opera" : s ? "Chrome" : i ? "Safari" : "Unkown";}, e.getPublisherStateType = function (e) {return 0 == e || 1 == e ? 0 == e ? "PUBLISHING" : "NO_PUBLISH" : "PUBLISH_REQUESTING";}, e.getPlayerStateType = function (e) {return 0 == e || 1 == e ? 0 == e ? "PLAYING" : "NO_PLAY" : "PLAY_REQUESTING";}, e.getSteamUpdateType = function (e) {return 0 == e ? "DELETE" : "ADD";}, e.checkScreenParams = function (t, r) {if ("object" == typeof t && void 0 !== t.videoQuality && !e.checkInteger(t.videoQuality)) return r(n.ZegoRTCLogEvent.kZegoTaskCreateStream.error.kParamError, " videoQuality must be integer number"), !1;if ("object" == typeof t && 4 === t.videoQuality) {if (void 0 === t.bitRate) return r(n.ZegoRTCLogEvent.kZegoTaskCreateStream.error.kParamError, " bitrate is required when videoQuality is 4"), !1;if (!e.checkInteger(t.bitRate)) return r(n.ZegoRTCLogEvent.kZegoTaskCreateStream.error.kParamError, " bitrate must be integer number"), !1;if (t.bitRate > 10240) return r(n.ZegoRTCLogEvent.kZegoTaskCreateStream.error.kParamError, " bitrate cannot greater than 10 Mbps"), !1;if (void 0 === t.frameRate) return r(n.ZegoRTCLogEvent.kZegoTaskCreateStream.error.kParamError, " frameRate is required when videoQuality is 4"), !1;if (!e.checkInteger(t.frameRate)) return r(n.ZegoRTCLogEvent.kZegoTaskCreateStream.error.kParamError, " frameRate must be integer number"), !1;if (void 0 === t.width) return r(n.ZegoRTCLogEvent.kZegoTaskCreateStream.error.kParamError, " width is required when videoQuality is 4"), !1;if (!e.checkInteger(t.width)) return r(n.ZegoRTCLogEvent.kZegoTaskCreateStream.error.kParamError, " width must be integer number"), !1;if (void 0 === t.height) return r(n.ZegoRTCLogEvent.kZegoTaskCreateStream.error.kParamError, " height is required when videoQuality is 4"), !1;if (!e.checkInteger(t.height)) return r(n.ZegoRTCLogEvent.kZegoTaskCreateStream.error.kParamError, " height must be integer number"), !1;}return !0;}, e.checkCameraParams = function (t, r) {return t.width && e.checkValidNumber(t.width) ? t.height && e.checkValidNumber(t.height) ? t.frameRate && e.checkValidNumber(t.frameRate) ? !(!t.bitRate || !e.checkValidNumber(t.bitRate)) || (r(n.ZegoRTCLogEvent.kZegoTaskCreateStream.error.kParamError, " bitrate must be integer number"), !1) : (r(n.ZegoRTCLogEvent.kZegoTaskCreateStream.error.kParamError, " frameRate must be integer number"), !1) : (r(n.ZegoRTCLogEvent.kZegoTaskCreateStream.error.kParamError, " height must be integer number"), !1) : (r(n.ZegoRTCLogEvent.kZegoTaskCreateStream.error.kParamError, " width must be integer number"), !1);}, e.isParamEmpty = function (e) {return null != e && "" !== e;}, e.isTypeString = function (e) {return "string" == typeof e;}, e.isTooLong = function (e, t) {return !(e.length >= t);}, e.isReDispatch = function (e) {var t = e.message.match(/action:(\d+)/),r = t ? Number(t[1]) : NaN;return [n.ZegoRTCLogEvent.kZegoTaskPlayStart.error.kTTLOverTimeError, n.ZegoRTCLogEvent.kZegoTaskPlayStart.error.kClientIPChangedError, n.ZegoRTCLogEvent.kZegoTaskPublishStart.error.kTTLOverTimeError, n.ZegoRTCLogEvent.kZegoTaskPublishStart.error.kClientIPChangedError].includes(e) || [6].includes(r);}, e.arrAvg = function (e, t, r) {return e.push(t), e.length > r && e.shift(), e.reduce(function (e, t) {return e + t;}) / e.length;}, e.getNetQuality = function (e, t, r) {return void 0 !== r ? .15 * this.calcQualityOfJitter(r) + .85 * Math.min(this.calcQualityOfRtt(e), this.calcQualityOfLostRate(t, !1)) : Math.min(this.calcQualityOfRtt(e), this.calcQualityOfLostRate(t, !0));}, e.calcQualityOfRtt = function (e) {return e < 600 ? 97 - Math.pow(.09 * e, 1.1) : 18 * Math.exp(.002 * (600 - e));}, e.calcQualityOfJitter = function (e) {return e <= 50 ? 98 - Math.pow(e, 1.15) : i.QUALITY_CONSTANT.PoorMinQuality;}, e.calcQualityOfLostRate = function (e, t) {if (t) {var r = e;return r <= 55 ? 99 - Math.pow(.8 * r, 1.18) : i.QUALITY_CONSTANT.PoorMinQuality;}var o = 100 * e;return o <= 40 ? 96 - Math.pow(o, 1.22) : i.QUALITY_CONSTANT.PoorMinQuality;}, e.quality2QualityGrade = function (e) {return i.QualityGrade.Unknown, e >= i.QUALITY_CONSTANT.ExcellentMinQuality ? i.QualityGrade.Excellent : e >= i.QUALITY_CONSTANT.GoodMinQuality ? i.QualityGrade.Good : e >= i.QUALITY_CONSTANT.MiddleMinQuality ? i.QualityGrade.Middle : e >= i.QUALITY_CONSTANT.PoorMinQuality ? i.QualityGrade.Poor : i.QualityGrade.Die;}, e;}();t.ClientUtil = l;}, 767: function _(e, t) {"use strict";var r = this && this.__spreadArrays || function () {for (var e = 0, t = 0, r = arguments.length; t < r; t++) {e += arguments[t].length;}var o = Array(e),s = 0;for (t = 0; t < r; t++) {for (var i = arguments[t], n = 0, a = i.length; n < a; n++, s++) {o[s] = i[n];}}return o;};Object.defineProperty(t, "__esModule", { value: !0 }), t.SdpUtil = void 0;var o = function () {function e() {}return e.zegoSdp = function (e) {var t = e.split("\r\n"),o = [],s = [];t.forEach(function (e) {var t = e.match(/a=rtpmap:(\d+)\s+((H264\/90000)|(opus\/48000\/2))/);t && t[1] && t[2] && ("H264/90000" === t[2] && o.push(t[1]), "opus/48000/2" === t[2] && s.push(t[1]));});var i = [];return t.map(function (e) {var t = !0,n = e.match(/((a=rtcp-fb:)|(a=rtpmap:)|(a=fmtp:))(\d+)/);if (n && n[5] && (r(o, s).some(function (e) {return e == n[5];}) || (t = !1)), e.indexOf("m=video") > -1) {var a = e.split(" ");e = r([a[0], a[1], a[2]], o).join(" ");} else e.indexOf("m=audio") > -1 && (a = e.split(" "), e = r([a[0], a[1], a[2]], s).join(" "));t && i.push(e);}), i.join("\r\n");}, e.getSDPByVideDecodeType = function (e, t) {var o = { str: "", arr: [], obj: { H264: [], H265: [], VP8: [], VP9: [], OHTER: [] } };if (!e.includes("m=video")) return e;var s = /m=video.+/.exec(e)[0];s = s.match(/[\s|\d]+/g)[1].replace(" ", ""), o.str = s, o.arr = o.str.split(" "), o.arr.forEach(function (t) {var r = new RegExp("a=rtpmap:" + t + ".+").exec(e)[0];r.includes("H264") ? o.obj.H264.push(t) : r.includes("H265") ? o.obj.H265.push(t) : r.includes("VP8") ? o.obj.VP8.push(t) : r.includes("VP9") ? o.obj.VP9.push(t) : o.obj.OHTER.push(t);}), o.obj.OHTER.forEach(function (t) {var r = new RegExp("a=fmtp:" + t + ".+apt=(\\d+)").exec(e),s = r && r[1];s && (o.obj.H264.includes(s) ? o.obj.H264.push(t) : o.obj.H265.includes(s) ? o.obj.H265.push(t) : o.obj.VP8.includes(s) ? o.obj.VP8.push(t) : o.obj.VP9.includes(s) && o.obj.VP9.push(t));});var i = [];return "VP9" === t ? i = r(o.obj.H265, o.obj.H264, o.obj.VP8) : "VP8" === t ? i = r(o.obj.H265, o.obj.H264, o.obj.VP9) : "H264" === t ? i = r(o.obj.H265, o.obj.VP8, o.obj.VP9) : "H265" === t && (i = r(o.obj.VP8, o.obj.H264, o.obj.VP9)), i.forEach(function (t) {var r = o.arr.indexOf(t);o.arr.splice(r, 1);var s = new RegExp("a=rtpmap:" + t + ".+\\s\\n", "g"),i = new RegExp("a=rtcp-fb:" + t + ".+\\s\\n", "g"),n = new RegExp("a=fmtp:" + t + ".+\\s\\n", "g");e = (e = (e = e.replace(s, "")).replace(i, "")).replace(n, "");}), e = e.replace(s, o.arr.join(" "));}, e;}();t.SdpUtil = o;}, 395: function _(e, t, r) {"use strict";var o = this && this.__awaiter || function (e, t, r, o) {return new (r || (r = Promise))(function (s, i) {function n(e) {try {l(o.next(e));} catch (e) {i(e);}}function a(e) {try {l(o.throw(e));} catch (e) {i(e);}}function l(e) {var t;e.done ? s(e.value) : (t = e.value, t instanceof r ? t : new r(function (e) {e(t);})).then(n, a);}l((o = o.apply(e, t || [])).next());});},s = this && this.__generator || function (e, t) {var r,o,s,i,n = { label: 0, sent: function sent() {if (1 & s[0]) throw s[1];return s[1];}, trys: [], ops: [] };return i = { next: a(0), throw: a(1), return: a(2) }, "function" == typeof Symbol && (i[Symbol.iterator] = function () {return this;}), i;function a(i) {return function (a) {return function (i) {if (r) throw new TypeError("Generator is already executing.");for (; n;) {try {if (r = 1, o && (s = 2 & i[0] ? o.return : i[0] ? o.throw || ((s = o.return) && s.call(o), 0) : o.next) && !(s = s.call(o, i[1])).done) return s;switch (o = 0, s && (i = [2 & i[0], s.value]), i[0]) {case 0:case 1:s = i;break;case 4:return n.label++, { value: i[1], done: !1 };case 5:n.label++, o = i[1], i = [0];continue;case 7:i = n.ops.pop(), n.trys.pop();continue;default:if (!((s = (s = n.trys).length > 0 && s[s.length - 1]) || 6 !== i[0] && 2 !== i[0])) {n = 0;continue;}if (3 === i[0] && (!s || i[1] > s[0] && i[1] < s[3])) {n.label = i[1];break;}if (6 === i[0] && n.label < s[1]) {n.label = s[1], s = i;break;}if (s && n.label < s[2]) {n.label = s[2], n.ops.push(i);break;}s[2] && n.ops.pop(), n.trys.pop();continue;}i = t.call(e, n);} catch (e) {i = [6, e], o = 0;} finally {r = s = 0;}}if (5 & i[0]) throw i[1];return { value: i[0] ? i[1] : void 0, done: !0 };}([i, a]);};}};Object.defineProperty(t, "__esModule", { value: !0 }), t.CheckModule = void 0;var i = r(767),n = function () {function e() {var e = this;this.iceconnectionstatechangeTimes = 0, this.isCheckAll = !1;var t = document.createElement("canvas");t.getContext("2d").fillStyle = "rgba(255, 255, 255, 0)";try {this.localStream = t.captureStream();} catch (e) {console.error("canvas captureStream error", e);}this.timer = setTimeout(function () {e.resolve("Detection timeout"), e.hangup();}, 5e3);}return e.prototype.checkSupportByType = function (e) {return o(this, void 0, void 0, function () {var t,r,o = this;return s(this, function (s) {switch (s.label) {case 0:return this.checkType = e, t = {}, this.localPc = new RTCPeerConnection(t), this.remotePc = new RTCPeerConnection(t), r = new Promise(function (e) {return o.resolve = e;}), this.localPc.addEventListener("icecandidate", function (e) {return o.onIceCandidate(o.localPc, e);}), this.remotePc.addEventListener("icecandidate", function (e) {return o.onIceCandidate(o.remotePc, e);}), this.remotePc.addEventListener("iceconnectionstatechange", function (t) {"connected" === o.remotePc.iceConnectionState && (o.iceconnectionstatechangeResult = !0), 2 == ++o.iceconnectionstatechangeTimes && o.iceCandidate && (clearTimeout(o.timer), "connected" === o.remotePc.iceConnectionState ? o.resolve(!0) : o.resolve("The browser does not support " + e + " format"), o.hangup());}), this.localStream.getTracks().forEach(function (e) {return o.localPc.addTrack(e, o.localStream);}), [4, this.check(e)];case 1:return s.sent(), [4, r];case 2:return [2, s.sent()];}});});}, e.prototype.check = function (e) {return o(this, void 0, void 0, function () {var t, r;return s(this, function (o) {switch (o.label) {case 0:return o.trys.push([0, 2,, 3]), [4, this.localPc.createOffer({ offerToReceiveAudio: !0, offerToReceiveVideo: !0 })];case 1:return (t = o.sent()).sdp = i.SdpUtil.getSDPByVideDecodeType(t.sdp, e), this.onCreateOfferSuccess(t), [3, 3];case 2:return r = o.sent(), this.onCreateSessionDescriptionError(r), [3, 3];case 3:return [2];}});});}, e.prototype.onCreateOfferSuccess = function (e) {return o(this, void 0, void 0, function () {var t, r, o, i;return s(this, function (s) {switch (s.label) {case 0:return s.trys.push([0, 2,, 3]), [4, this.localPc.setLocalDescription(e)];case 1:return s.sent(), [3, 3];case 2:return t = s.sent(), this.onSetSessionDescriptionError(t), [2];case 3:return s.trys.push([3, 5,, 6]), [4, this.remotePc.setRemoteDescription(e)];case 4:return s.sent(), [3, 6];case 5:return r = s.sent(), this.onSetSessionDescriptionError(r), [2];case 6:return s.trys.push([6, 9,, 10]), [4, this.remotePc.createAnswer()];case 7:return o = s.sent(), [4, this.onCreateAnswerSuccess(o)];case 8:return s.sent(), [3, 10];case 9:return i = s.sent(), this.onCreateSessionDescriptionError(i), [2];case 10:return [2];}});});}, e.prototype.onCreateAnswerSuccess = function (e) {return o(this, void 0, void 0, function () {var t, r;return s(this, function (o) {switch (o.label) {case 0:return o.trys.push([0, 2,, 3]), [4, this.remotePc.setLocalDescription(e)];case 1:return o.sent(), [3, 3];case 2:return t = o.sent(), this.onSetSessionDescriptionError(t), [2];case 3:return o.trys.push([3, 5,, 6]), [4, this.localPc.setRemoteDescription(e)];case 4:return o.sent(), [3, 6];case 5:return r = o.sent(), this.onSetSessionDescriptionError(r), [2];case 6:return [2];}});});}, e.prototype.onIceCandidate = function (e, t) {return o(this, void 0, void 0, function () {var r;return s(this, function (o) {switch (o.label) {case 0:return o.trys.push([0, 2,, 3]), [4, this.getOtherPc(e).addIceCandidate(t.candidate)];case 1:return o.sent(), [3, 3];case 2:return r = o.sent(), console.error(this.checkType, this.getPcName(e) + " addIceCandidate error", r), clearTimeout(this.timer), this.hangup(), this.resolve(r), [3, 3];case 3:return "remotePc" === this.getPcName(e) && t.candidate && (this.iceCandidate = !0), this.iceconnectionstatechangeResult && "localPc" === this.getPcName(e) && (clearTimeout(this.timer), this.hangup(), this.resolve(!0)), [2];}});});}, e.prototype.getOtherPc = function (e) {return e === this.localPc ? this.remotePc : this.localPc;}, e.prototype.getPcName = function (e) {return e === this.localPc ? "localPc" : "remotePc";}, e.prototype.onCreateSessionDescriptionError = function (e) {console.error("Failed to create session description: " + e.toString()), clearTimeout(this.timer), this.hangup(), this.resolve(e);}, e.prototype.onSetSessionDescriptionError = function (e) {console.error("Failed to set session description: " + e.toString()), clearTimeout(this.timer), this.hangup(), this.resolve(e);}, e.prototype.hangup = function () {this.localPc.close(), this.remotePc.close(), this.iceconnectionstatechangeTimes = 0, this.localStream.getTracks().forEach(function (e) {return e.stop();});}, e;}();t.CheckModule = n;}, 130: function _(e, t, r) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.ZegoWechatMini = void 0;var o = r(89),s = r(325),i = r(706),n = r(529),a = r(608),l = r(8),u = r(752),_ = r(935),d = r(557),c = function () {function e(e, t, r, o) {void 0 === o && (o = 1), this.logger = e, this.dataReport = t, this.rtm = r, this.stateCenter = new s.StateCenter(this.logger, this.dataReport), this.stateCenter.clientType = "wxMini", this.stateCenter.type = 3 === o ? "PRIVATE" : "PUBLIC", this.wechatMiniModules = new l.WechatMiniModules(this.logger, this.dataReport, this.stateCenter, this.rtm);}return e.prototype.checkSystemRequirements = function () {return this.wechatMiniModules.checkSystemRequirements();}, e.prototype.getVersion = function () {return i.PROTO_VERSION;}, e.prototype.on = function (e, t) {return this.wechatMiniModules.bindListener(e, t);}, e.prototype.off = function (e, t) {return this.wechatMiniModules.deleteListener(e, t);}, e.prototype.startPublishingStream = function (e, t) {return this.wechatMiniModules.publishModule.startPublishingStream(e, t);}, e.prototype.stopPublishingStream = function (e) {return this.wechatMiniModules.publishModule.stopPublishingStream(e);}, e.prototype.getNextUrl = function (e) {return this.wechatMiniModules.getNextUrl(e);}, e.prototype.setCustomSignalUrl = function (e, t) {if (void 0 === t && (t = !0), this.logger.info(o.ZEGO_WECHATMINI_ACTION.WECHATMINI_SET_CUSTOM_SIGNAL_URL + " call: " + JSON.stringify(e)), !e || 0 == e.length) return this.logger.error(o.ZEGO_WECHATMINI_ACTION.WECHATMINI_SET_CUSTOM_SIGNAL_URL + " param error"), !1;var r = !0;return e.forEach(function (e) {return 0 != e.indexOf("rtmp://") && (r = !1);}), r ? (t ? this.stateCenter.customUrl = e : this.stateCenter.customPlayUrl = e, !0) : (this.logger.error(o.ZEGO_WECHATMINI_ACTION.WECHATMINI_SET_CUSTOM_SIGNAL_URL + " url is not correct"), !1);}, e.prototype.addPublishCdnUrl = function (e, t) {var r;this.logger.info(o.ZEGO_WECHATMINI_ACTION.ADD_PUBLISH_CDN_URL + " call " + e + " " + t);var s = null === (r = this.wechatMiniModules.streamCenter.publisherList[e]) || void 0 === r ? void 0 : r.room;return new Promise(function (r, o) {s.streamHandler._publishTarget({ type: "addpush", streamID: e, pushUrl: t }, r, o);});}, e.prototype.removePublishCdnUrl = function (e, t) {var r;this.logger.info(o.ZEGO_WECHATMINI_ACTION.REMOVE_PUBLISH_CDN_URL + " call " + e + " " + t);var s = null === (r = this.wechatMiniModules.streamCenter.publisherList[e]) || void 0 === r ? void 0 : r.room;return new Promise(function (r, o) {s.streamHandler._publishTarget({ type: "delpush", streamID: e, pushUrl: t }, r, o);});}, e.prototype.startMixerTask = function (e) {var t = this;return new Promise(function (r, o) {e.outputConfig && e.outputConfig.outputFps && (e.outputConfig.outputFPS = e.outputConfig.outputFps);var s = i.getReportSeq();t.dataReport.newReport(s, n.ZegoWechatLogEvent.kZegoTaskMixStart.event), a.ClientUtil.logReportCallback("kZegoTaskMixStart" + e.taskID, t.dataReport, s, t.stateCenter.reportList), t.stateCenter.roomList[0].streamHandler.updateMixStream(e, function (o) {t.dataReport.uploadReport(s), a.ClientUtil.unregisterCallback("kZegoTaskMixStart" + e.taskID, t.stateCenter.reportList), r(o);}, function (r) {var i,n,l,_ = "",d = u.errorCodeList;r.errorCode < 2e9 && r.errorCode > 1e9 ? l = d[_ = a.ClientUtil.mixServerError(r.errorCode)] : r.errorCode < 1e6 && (l = a.ClientUtil.decodeServerError(r.errorCode, r.extendedData), _ = a.ClientUtil.getLiveRoomError(r.errorCode)), l ? t.dataReport.addMsgInfo(s, l) : t.dataReport.addMsgInfo(s, r), t.dataReport.uploadReport(s), a.ClientUtil.unregisterCallback("kZegoTaskMixStart" + e.taskID, t.stateCenter.reportList), _ && (r.errorCode = null === (i = d[_]) || void 0 === i ? void 0 : i.code, r.extendedData = (null === (n = d[_]) || void 0 === n ? void 0 : n.message) || ""), o(r);});});}, e.prototype.setMixerTaskConfig = function (e) {var t = this;return new Promise(function (r, o) {var s = i.getReportSeq();t.dataReport.newReport(s, n.ZegoWechatLogEvent.kZegoTaskMixConfig.event), a.ClientUtil.logReportCallback("kZegoTaskMixConfig", t.dataReport, s, t.stateCenter.reportList), t.stateCenter.roomList[0].streamHandler.setMixerTaskConfig(e).then(function (e) {t.dataReport.uploadReport(s), a.ClientUtil.unregisterCallback("kZegoTaskMixConfig", t.stateCenter.reportList), r(e);}).catch(function (e) {t.dataReport.addMsgInfo(s, e), t.dataReport.uploadReport(s), a.ClientUtil.unregisterCallback("kZegoTaskMixConfig", t.stateCenter.reportList), o(e);});});}, e.prototype.stopMixerTask = function (e) {var t = this;return new Promise(function (r, s) {var l = i.getReportSeq();if (t.dataReport.newReport(l, n.ZegoWechatLogEvent.kZegoTaskMixStop.event), !e || "string" != typeof e || e.length > i.MAX_MIX_TASK_ID_LENGTH || !a.ClientUtil.checkIllegalCharacters(e)) return t.logger.error(o.ZEGO_WECHATMINI_ACTION.STOP_MIXER_TASK + " taskID must be string less 256"), t.dataReport.addMsgInfo(l, { error: n.ZegoWechatLogEvent.kZegoTaskMixStop.error.kParamError.code, message: n.ZegoWechatLogEvent.kZegoTaskMixStop.error.kParamError.message + " param taskID error" }), t.dataReport.uploadReport(l), void s({ errorCode: n.ZegoWechatLogEvent.kZegoTaskMixStop.error.kParamError.code, extendedData: n.ZegoWechatLogEvent.kZegoTaskMixStop.error.kParamError.message + " param taskID error" });t.stateCenter.roomList[0].streamHandler.stopMixStream(e, function (e) {t.dataReport.uploadReport(l), r(e);}, function (e) {var r,o,n,_ = "",d = u.errorCodeList;e.errorCode < 2e9 && e.errorCode > 1e9 ? n = d[_ = a.ClientUtil.mixServerError(e.errorCode - i.MIXSTREAM_ERROR_CODE)] : e.errorCode < 1e6 && (n = a.ClientUtil.decodeServerError(e.errorCode, e.extendedData), _ = a.ClientUtil.getLiveRoomError(e.errorCode)), n ? t.dataReport.addMsgInfo(l, n) : t.dataReport.addMsgInfo(l, e), t.dataReport.uploadReport(l), _ && (e.errorCode = null === (r = d[_]) || void 0 === r ? void 0 : r.code, e.extendedData = (null === (o = d[_]) || void 0 === o ? void 0 : o.message) || ""), s(e);});});}, e.prototype.setStreamExtraInfo = function (e, t) {var r = this;return new Promise(function (o, s) {var a = i.getReportSeq();r.dataReport.newReport(a, n.ZegoWechatLogEvent.kZegoTaskLiveRoomSendStreamExtraInfo.event), r.dataReport.addMsgInfo(a, { stream: n.ZegoWechatLogEvent.kZegoTaskLiveRoomSendStreamExtraInfo.stream(e), stream_extra_info: n.ZegoWechatLogEvent.kZegoTaskLiveRoomSendStreamExtraInfo.stream_extra_info(t) });var l = function l(e, t) {r.logger.error("zb.ssei " + t), r.dataReport.addMsgInfo(a, { error: e.code, message: e.message + " " + t }), r.dataReport.uploadReport(a), s({ errorCode: e.code, extendedData: e.message + " " + t });};if ("string" == typeof e && "" != e) {if ("string" == typeof t && "" != t) {if (r.rtm.service.isDisConnect()) l(n.ZegoWechatLogEvent.kZegoTaskLiveRoomSendStreamExtraInfo.error.kNoLoginError, "not login");else if (r.stateCenter.publishStreamList[e]) {var u = r.wechatMiniModules.streamCenter.getRoomByStreamID(e);u ? (r.dataReport.addMsgInfo(a, { room_sid: n.ZegoWechatLogEvent.kZegoTaskLiveRoomSendStreamExtraInfo.room_sid(u.sessionID) }), u.streamHandler.setStreamExtraInfo(e, t, o, l), r.dataReport.uploadReport(a)) : l(n.ZegoWechatLogEvent.kZegoTaskLiveRoomSendStreamExtraInfo.error.kNoLoginError, "not login");} else l(n.ZegoWechatLogEvent.kZegoTaskLiveRoomSendStreamExtraInfo.error.kPublishStreamNoFoundError, "publish stream no found");} else l(n.ZegoWechatLogEvent.kZegoTaskLiveRoomSendStreamExtraInfo.error.kParamError, "extraInfo must be string and no empty");} else l(n.ZegoWechatLogEvent.kZegoTaskLiveRoomSendStreamExtraInfo.error.kParamError, "streamID must be string and not empty");});}, e.prototype.startPlayingStream = function (e, t) {return this.wechatMiniModules.playModule.startPlayingStream(e, t);}, e.prototype.stopPlayingStream = function (e) {this.wechatMiniModules.playModule.stopPlayingStream(e);}, e.prototype.updatePlayerState = function (e, t) {this.wechatMiniModules.updatePlayerState(e, t);}, e.prototype.updatePlayerNetStatus = function (e, t) {this.wechatMiniModules.updatePlayerNetStatus(e, t);}, e.prototype.updateAudioVolumeNotify = function (e, t) {this.wechatMiniModules.updateAudioVolumeNotify(e, t);}, e.prototype.initContext = function (e) {e.wxContext && (this.wxContext = e.wxContext), e.pushAtr && (this.pushAtr = e.pushAtr), e.playAtr && (this.playAtr = e.playAtr);}, e.prototype.createPusher = function (e) {return this.logger.info("zw.cp call"), this.wxContext && this.wxContext.setData && this.pushAtr ? (this.wechatMiniModules.streamCenter.pusherInstance || (this.wechatMiniModules.streamCenter.pusherInstance = new _.LivePusher(this.wxContext, this.pushAtr, this, e)), this.logger.info("zw.cp call success"), this.wechatMiniModules.streamCenter.pusherInstance) : (this.logger.error("zw.cp init context wrong"), null);}, e.prototype.setPusherAttributes = function (e, t) {var r;this.logger.info("zw.spa.0 call"), this.wechatMiniModules.streamCenter.pusherInstance ? (null === (r = this.wechatMiniModules.streamCenter.pusherInstance) || void 0 === r || r.setPusherAttributes(e, t), this.logger.info("zw.spa.0 call success")) : this.logger.error("zw.spa.0 publisher no found");}, e.prototype.setPlayerAttributes = function (e, t, r) {if (this.logger.info("zw.spa.1 call"), "string" == typeof e && "string" == typeof this.playAtr) {var o = this.wechatMiniModules.streamCenter.livePlayerList.find(function (t) {return t.attributes.id == e;});o ? (o.setPlayerAttributes(t, r), this.logger.info("zw.spa.1 call success")) : this.logger.error("zw.spa.1 player no found");} else this.logger.error("zw.spa.1 stream no found");}, e.prototype.getPusherInstance = function () {return this.wechatMiniModules.streamCenter.pusherInstance ? this.wechatMiniModules.streamCenter.pusherInstance : null;}, e.prototype.getPlayerInstance = function (e, t) {if (this.logger.info("zw.gpi call"), "string" != typeof e || "string" != typeof this.playAtr) return this.logger.error("zw.gpi param error"), null;var r = this.wechatMiniModules.streamCenter.livePlayerList.find(function (t) {return t.attributes.id == e;});return t && (this.wechatMiniModules.streamCenter.playerContextMap[e] = t), r || (r = new d.LivePlayer(this.wxContext, e, this, this.wechatMiniModules.streamCenter.playerContextMap[e]), this.wechatMiniModules.streamCenter.livePlayerList.push(r)), this.setPlayData(), this.logger.info("zw.gpi call success"), r;}, e.prototype.getPlayerList = function (e) {if (this.logger.info("zw.gpl call"), void 0 !== e && "string" != typeof e || "string" != typeof this.playAtr) return this.logger.error("zw.gpl param error"), [];if (e) {var t = this.wechatMiniModules.streamCenter.livePlayerList.find(function (t) {return t.attributes.id == e;});return t ? [t.attributes] : [];}return this.logger.info("zw.gpl call success"), this.wechatMiniModules.streamCenter.livePlayerList.map(function (e) {return e.attributes;});}, e.prototype.mutePublishStreamVideo = function (e) {this.setPusherAttributes({ enableCamera: e });}, e.prototype.mutePublishStreamAudio = function (e) {this.setPusherAttributes({ enableMic: e });}, e.prototype.mutePlayStreamVideo = function (e, t) {this.setPlayerAttributes(e, { muteVideo: t });}, e.prototype.mutePlayStreamAudio = function (e, t) {this.setPlayerAttributes(e, { muteAudio: t });}, e.prototype.setPlayData = function (e) {if (this.logger.info("zw.spd call"), this.wxContext && this.playAtr) {void 0 !== e && "function" != typeof e && this.logger.error("zw.spd callBack is not function");var t = {};t[this.playAtr] = this.wechatMiniModules.streamCenter.livePlayerList.map(function (e) {return e.attributes;}), this.wxContext.setData(t, e), this.logger.info("zw.spd call success");} else this.logger.error("zw.spd init context wrong");}, e;}();t.ZegoWechatMini = c;}, 8: function _(e, t, r) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.WechatMiniModules = void 0;var o = r(706),s = r(300),i = r(560),n = r(80),a = r(168),l = r(706),u = r(529),_ = r(608),d = r(89),c = function () {function e(e, t, r, o) {this.logger = e, this.dataReport = t, this.stateCenter = r, this.rtm = o, this.currentPlaySourceType = l.ENUM_DISPATCH_TYPE.cdn, this.mixStreamList = {}, this.ultraPlaySourceType = "rtmp_v2", this.streamCenter = new s.ZegoStreamCenterWechat(this.logger, this.stateCenter, this.dataReport), this.publishModule = new n.PublishModule(this.logger, this.dataReport, this.stateCenter, this.streamCenter, this.rtm), this.playModule = new a.PlayModule(this.logger, this.dataReport, this.stateCenter, this.streamCenter, this.rtm), this.init();}return e.prototype.init = function () {this.bindRTMListener(), this.bindStreamCenterHandler();}, e.prototype.bindRTMListener = function () {var e = this;this.rtm._on("roomLoginResponse", function (t) {e.logger.info("zc.rlr call " + JSON.stringify(t));var r = t.header.room_id;e.stateCenter.appid = e.rtm.getAppID(), e.stateCenter.idName = e.rtm.getUserID(), e.stateCenter.testEnvironment = e.rtm.isTestEnvironment(), e.stateCenter.isMultiRoom = e.rtm.getMultiRoom();var o = e.rtm.getToken(r),s = e.rtm.getSessionId(r),n = e.rtm.getRoomSessionID(r),a = e.stateCenter.getRoomByRoomID(r);if (!a) {var l = new i.StreamHandler(e.logger, e.stateCenter, e.rtm, e.dataReport, e.streamCenter, r);e.bindStreamHandler(l), a = { roomID: r, streamHandler: l, sessionID: s, roomSessionID: n, token: o, isResetRoom: !1, streamList: [], streamInfoList: [] }, e.stateCenter.roomList.push(a), l.handleStreamStart(t, a);}a.sessionID = s, a.roomSessionID = n, a.token = a.token, e.logger.info("zc.rlr end " + r);}), this.rtm._on("HBResponse", function (t) {var r,o = null === (r = null == t ? void 0 : t.header) || void 0 === r ? void 0 : r.room_id,s = e.stateCenter.getRoomByRoomID(o);null == s || s.streamHandler.patchStreamList(t);}), this.rtm._on("_roomStateUpdate", function (t, r, o, s) {if ("DISCONNECTED" == r) {e.logger.info(d.ZEGO_WECHATMINI_ACTION.WECHATMINI_BIND_RTM_LISTENER + " _roomStateUpdate " + t + " disconnected " + (o ? o + " " : "") + (s || ""));var i = e.stateCenter.getRoomByRoomID(t);if (i) {var n = e.stateCenter.roomList.findIndex(function (e) {return e.roomID == t;});i.isResetRoom = !0, i.streamHandler.reset(), e.streamCenter.reset(t), e.stateCenter.roomList.splice(n, 1);}} else e.logger.info("zc.rsu " + t + " state: " + r);}), this.rtm.service.on("stream", function (t) {var r,o = (null === (r = null == t ? void 0 : t.header) || void 0 === r ? void 0 : r.room_id) || "",s = e.stateCenter.getRoomByRoomID(o);s ? s.streamHandler.handleStreamUpdateRsp(t) : e.logger.error(d.ZEGO_WECHATMINI_ACTION.ON_STREAM + " room no found");}), this.rtm.service.on("push_stream_update", function (t) {var r,o = (null === (r = null == t ? void 0 : t.header) || void 0 === r ? void 0 : r.room_id) || "",s = e.stateCenter.getRoomByRoomID(o);s ? s.streamHandler.handlePushStreamUpdateMsg(t) : e.logger.error(d.ZEGO_WECHATMINI_ACTION.ON_PUSH_STREAM_UPDATE + " room no found");}), this.rtm.service.on("zegochat_js.push_room_stream_update_req", function (t) {var r,o = (null === (r = null == t ? void 0 : t.header) || void 0 === r ? void 0 : r.room_id) || "",s = e.stateCenter.getRoomByRoomID(o);s ? s.streamHandler.handlePriPushStreamUpdateMsg(t) : e.logger.error(d.ZEGO_WECHATMINI_ACTION.ON_STREAM + " room no found");});}, e.prototype.bindStreamHandler = function (e) {var t = this;e.onStreamUpdated = function (e, r, o) {var s = o.map(function (e) {return "PRIVATE" === t.stateCenter.type ? { streamID: e.stream_id, user: { userID: e.user_id, userName: e.user_name }, extraInfo: e.extra_info } : { streamID: e.streamID, user: e.user, extraInfo: e.extraInfo };}),i = l.getReportSeq();if (t.dataReport.newReport(i, u.ZegoWechatLogEvent.kZegoTaskLiveRoomGetStreamUpdateInfo.event), t.dataReport.addMsgInfo(i, { stream_update_type: u.ZegoWechatLogEvent.kZegoTaskLiveRoomGetStreamUpdateInfo.stream_update_type(1 === r ? "added" : "deleted"), update_stream: u.ZegoWechatLogEvent.kZegoTaskLiveRoomGetStreamUpdateInfo.update_stream(o) }), t.dataReport.uploadReport(i), t.stateCenter.actionListener("roomStreamUpdate", e, _.ClientUtil.getSteamUpdateType(r), s), 1 === r) {var n = [];s.forEach(function (e) {e.extraInfo && n.push({ streamID: e.streamID, user: e.user, extraInfo: e.extraInfo });}), n.length > 0 && t.stateCenter.actionListener("streamExtraInfoUpdate", e, n);}}, e.onPublishStateUpdate = function (e, r, o) {t.logger.info(d.ZEGO_WECHATMINI_ACTION.ON_PUBLISH_STATE_UPDATE + " " + r);var s = t.stateCenter.reportSeqList.startPublish[r];t.streamCenter.publishingList[r] && (0 == e || 1 == e) && s && (t.dataReport.eventEndWithMsgInfo(s, "PublishState", { type: e }), 1 == e && t.dataReport.addMsgInfo(s, o), t.dataReport.uploadReport(s), delete t.stateCenter.reportSeqList.startPublish[r]), t.stateCenter.actionListener("publisherStateUpdate", { state: _.ClientUtil.getPublisherStateType(e), streamID: r, errorCode: o.code, extendedData: o.message });}, e.onStreamExtraInfoUpdated = function (e, r) {var o;o = "PUBLIC" === t.stateCenter.type ? r.map(function (e) {return { streamID: e.streamID, user: e.user, extraInfo: e.extraInfo };}) : r.map(function (e) {return { streamID: e.stream_id, user: { userID: e.user_id, userName: e.user_name }, extraInfo: e.extra_info, title: e.title, streamVer: e.stream_ver };});var s = l.getReportSeq();t.dataReport.newReport(s, u.ZegoWechatLogEvent.kZegoTaskLiveRoomGetStreamExtraInfo.event), t.dataReport.addMsgInfo(s, { update_stream: u.ZegoWechatLogEvent.kZegoTaskLiveRoomGetStreamExtraInfo.update_stream(o) }), t.dataReport.uploadReport(s), t.stateCenter.actionListener("streamExtraInfoUpdate", e, o);};}, e.prototype.bindStreamCenterHandler = function () {var e = this;this.streamCenter.onPlayStateUpdate = function (t, r, o) {var s = e.stateCenter.reportSeqList.startPlay[r];e.streamCenter.playingList.find(function (e) {return e.streamID === r;}) && (0 == t || 1 == t) && s && (e.dataReport.eventEndWithMsgInfo(s, "PlayState", { type: t }), 1 == t && o && e.dataReport.addMsgInfo(s, o), e.dataReport.uploadReport(s), delete e.stateCenter.reportSeqList.startPlay[r]), e.stateCenter.actionListener("playerStateUpdate", { state: _.ClientUtil.getPlayerStateType(t), streamID: r, errorCode: o && o.code, extendedData: o && o.message }), 1 === t && (e.streamCenter.playErrorCallBackList[r] && (e.streamCenter.playErrorCallBackList[r](o), delete e.streamCenter.playErrorCallBackList[r]), e.logger.info(d.ZEGO_WECHATMINI_ACTION.WECHATMINI_BIND_STREAM_CENTER_HANDLER + " stop play called by sdk"));}, this.streamCenter.onPublishStateUpdate = function (t, r, o) {e.onPublishStateUpdateHandle(t, r, o);}, this.streamCenter.onPublishQualityUpdate = function (t, r) {e.stateCenter.actionListener("publishQualityUpdate", t, r);}, this.streamCenter.onPlayQualityUpdate = function (t, r) {e.stateCenter.actionListener("playQualityUpdate", t, r);};}, e.prototype.onPublishStateUpdateHandle = function (e, t, r) {var s = this;this.logger.info(d.ZEGO_WECHATMINI_ACTION.ON_PUBLISH_STATE_UPDATE_HANDLE + " call");var i = this.streamCenter.publisherList[t].room;if (i) {if (0 == e) {if (this.stateCenter.publishStreamList[t]) if (this.stateCenter.publishStreamList[t].state != l.ENUM_PUBLISH_STREAM_STATE.tryPublish || i.streamList.find(function (e) {return e.stream_id == t;})) this.stateCenter.publishStreamList[t].state = l.ENUM_PUBLISH_STREAM_STATE.publishing, i.streamHandler.onPublishStateUpdate(e, t, r), this.dataReport.uploadReport(this.stateCenter.reportSeqList.startPublish[t]), delete this.stateCenter.reportSeqList.startPublish[t], _.ClientUtil.unregisterCallback("kZegoTaskPublishStart" + t, this.stateCenter.reportList);else {this.stateCenter.publishStreamList[t].state = l.ENUM_PUBLISH_STREAM_STATE.update_info;var n;n = "PUBLIC" === this.stateCenter.type ? l.ENUM_STREAM_SUB_CMD.liveBegin : o.ENUM_STREAM_CMD_PRI.liveBegin, i.streamHandler.updateStreamInfo(t, n, this.stateCenter.publishStreamList[t].extra_info, function (e) {"PRIVATE" === s.stateCenter.type && s.stateCenter.publishStreamList[t] && s.stateCenter.publishStreamList[t].state == l.ENUM_PUBLISH_STREAM_STATE.update_info && (s.stateCenter.publishStreamList[t].state = l.ENUM_PUBLISH_STREAM_STATE.stop, i.streamHandler.onPublishStateUpdate(1, t, e), s.publishModule.stopPublishingStream(t));}), this.dataReport.uploadReport(this.stateCenter.reportSeqList.startPublish[t]), delete this.stateCenter.reportSeqList.startPublish[t], _.ClientUtil.unregisterCallback("kZegoTaskPublishStart" + t, this.stateCenter.reportList);}} else i.streamHandler.onPublishStateUpdate(e, t, r), 1 == e && (this.logger.info(d.ZEGO_WECHATMINI_ACTION.ON_PUBLISH_STATE_UPDATE_HANDLE + " stop publish called by sdk"), this.publishModule.stopPublishingStream(t));} else this.logger.error("zc.opsuh.0 room not exist");}, e.prototype.bindListener = function (e, t) {return this.logger.info(d.ZEGO_WECHATMINI_ACTION.WECHATMINI_BIND_LISTENER + " call"), this.stateCenter.listenerList[e] ? "function" != typeof t ? (this.logger.error(d.ZEGO_WECHATMINI_ACTION.WECHATMINI_BIND_LISTENER + " listener callBack must be function"), !1) : (-1 == this.stateCenter.listenerList[e].indexOf(t) && this.stateCenter.listenerList[e].push(t), !0) : (this.logger.error(d.ZEGO_WECHATMINI_ACTION.WECHATMINI_BIND_LISTENER + " event " + e + " no found"), !1);}, e.prototype.deleteListener = function (e, t) {if (this.logger.info(d.ZEGO_WECHATMINI_ACTION.WECHATMINI_DELETE_LISTENER + " call"), !this.stateCenter.listenerList[e]) return this.logger.error(d.ZEGO_WECHATMINI_ACTION.WECHATMINI_DELETE_LISTENER + " listener no found"), !1;var r = this.stateCenter.listenerList[e];return t ? r.splice(r.indexOf(t), 1) : this.stateCenter.listenerList[e] = [], !0;}, e.prototype.checkSystemRequirements = function () {var e = this;return new Promise(function (t, r) {var o = l.getReportSeq();e.dataReport.newReport(o, u.ZegoWechatLogEvent.kZegoTaskCheckSystemRequirements.event), _.ClientUtil.isSupportLive(function (r) {e.dataReport.addMsgInfo(o, { check_system: r }), e.dataReport.uploadReport(o), t(r);}, function (t) {e.dataReport.addMsgInfo(o, u.ZegoWechatLogEvent.kZegoTaskCheckSystemRequirements.error.kCheckSystemGetSettingFailError), e.dataReport.uploadReport(o), r(t);});});}, e.prototype.updatePlayerState = function (e, t) {this.logger.info(d.ZEGO_WECHATMINI_ACTION.WECHATMINI_UPDATE_PLAYER_STATE + " call " + e), this.streamCenter.updatePlayerState(e, t);}, e.prototype.updatePlayerNetStatus = function (e, t) {this.logger.info(d.ZEGO_WECHATMINI_ACTION.WECHATMINI_UPDATE_PLAYER_NET_STATUS + " call " + e), this.streamCenter.updatePlayerNetStatus(e, t);}, e.prototype.updateAudioVolumeNotify = function (e, t) {this.logger.info(d.ZEGO_WECHATMINI_ACTION.WECHATMINI_UPDATE_PLAYER_VOLUME_NOTIFY + " call " + e), this.streamCenter.updateAudioVolumeNotify(e, t);}, e.prototype.getNextUrl = function (e) {return "string" != typeof e || "" == e ? (this.logger.error(d.ZEGO_WECHATMINI_ACTION.WECHATMINI_GET_NEXT_URL + " stream ID must be string and not empty"), "") : this.streamCenter.getNextUrl(e);}, e.prototype.setCustomSignalUrl = function (e, t) {if (void 0 === t && (t = !0), this.logger.info(d.ZEGO_WECHATMINI_ACTION.WECHATMINI_SET_CUSTOM_SIGNAL_URL + " call: " + JSON.stringify(e)), !e || 0 == e.length) return this.logger.error(d.ZEGO_WECHATMINI_ACTION.WECHATMINI_SET_CUSTOM_SIGNAL_URL + " param error"), !1;var r = !0;e.forEach(function (e) {return 0 != e.indexOf("rtmp://") && (r = !1);}), r ? t ? this.stateCenter.customUrl = e : this.stateCenter.customPlayUrl = e : this.logger.error(d.ZEGO_WECHATMINI_ACTION.WECHATMINI_SET_CUSTOM_SIGNAL_URL + " url is not correct");}, e;}();t.WechatMiniModules = c;}, 168: function _(e, t, r) {"use strict";var o = this && this.__assign || function () {return o = Object.assign || function (e) {for (var t, r = 1, o = arguments.length; r < o; r++) {for (var s in t = arguments[r]) {Object.prototype.hasOwnProperty.call(t, s) && (e[s] = t[s]);}}return e;}, o.apply(this, arguments);};Object.defineProperty(t, "__esModule", { value: !0 }), t.PlayModule = void 0;var s = r(706),i = r(529),n = r(608),a = r(89),l = function () {function e(e, t, r, o, i) {this.logger = e, this.dataReport = t, this.stateCenter = r, this.streamCenter = o, this.rtm = i, this.mixStreamList = {}, this.preferPlaySourceType = s.ENUM_PLAY_SOURCE_TYPE.ultra, this.ultraPlaySourceType = "rtmp_v2";}return e.prototype.startPlayingStream = function (e, t) {var r = this;return new Promise(function (l, u) {r.logger.info(a.ZEGO_WECHATMINI_ACTION.PLAYMODULE_START_PLAYING_STREAM + " call " + e);var _ = s.getReportSeq();r.stateCenter.reportSeqList.startPlay[e] = _, r.dataReport.newReport(_, i.ZegoWechatLogEvent.kZegoTaskPlayStart.event);var d = function d(t, s) {r.logger.error(a.ZEGO_WECHATMINI_ACTION.PLAYMODULE_START_PLAYING_STREAM + " " + (s || t.message)), r.dataReport.uploadReport(_, void 0, t, s), delete r.stateCenter.reportSeqList.startPlay[e], u(o(o({}, t), { errorCode: t.code, extendedData: t.message + (s ? " " + s : "") }));};if (n.ClientUtil.isParamEmpty(e)) {if (n.ClientUtil.isTypeString(e)) {if (n.ClientUtil.isTooLong(e, s.MAX_STREAM_ID_LENGTH)) {if (n.ClientUtil.checkIllegalCharacters(e)) {if (r.stateCenter.customPlayUrl && 0 != r.stateCenter.customPlayUrl.length) return r.streamCenter.updatePlayingState(e, t ? t.streamParams : void 0, !0) ? (r.streamCenter.playErrorCallBackList[e] = function (e) {d(e);}, r.streamCenter.startPlayingStream(e, r.stateCenter.customPlayUrl, 1)) : void d(i.ZegoWechatLogEvent.kZegoTaskPlayStart.error.kPlayStreamIDInvalidCharacterError, "cannot start play");if (r.rtm.service.isDisConnect()) d(i.ZegoWechatLogEvent.kZegoTaskPlayStart.error.kPlayNoLoginError);else if (r.streamCenter.updatePlayingState(e, t ? t.streamParams : void 0, !0)) {if (r.streamCenter.onPlayStateUpdate(s.ENUM_PLAY_STATE_UPDATE.retry, e, { code: 0, message: "" }), n.ClientUtil.logReportCallback("kZegoTaskPlayStart" + e, r.dataReport, _, r.stateCenter.reportList), r.dataReport.addMsgInfo(_, { stream: i.ZegoWechatLogEvent.kZegoTaskPlayStart.stream(e), playOption: i.ZegoWechatLogEvent.kZegoTaskPlayStart.playOption(t) }), r.streamCenter.playSuccessCallBackList[e] = function (e, t) {n.ClientUtil.actionLogReportCallback("kZegoTaskPlayStart" + e, r.stateCenter.reportList, s.REPORT_ACTION.eventEnd, "get_play_url"), l({ streamID: e, url: t });}, r.streamCenter.playErrorCallBackList[e] = function (t) {n.ClientUtil.actionLogReportCallback("kZegoTaskPlayStart" + e, r.stateCenter.reportList, s.REPORT_ACTION.eventEnd, "get_play_url"), d(t);}, t && t.isMix) return r.mixStreamList[e] = { ultra_url_rtmp: null }, void r.fetchPlayStreamUrl(e, "rtmp_cdn", s.ENUM_DISPATCH_TYPE.cdn);n.ClientUtil.actionLogReportCallback("kZegoTaskPlayStart" + e, r.stateCenter.reportList, s.REPORT_ACTION.eventStart, "get_play_url"), t && "CDN" == t.sourceType || r.preferPlaySourceType === s.ENUM_PLAY_SOURCE_TYPE.cdn ? r.startPlayingStreamFromCDN(e) : r.startPlayingStreamFromBGP(e);} else d(i.ZegoWechatLogEvent.kZegoTaskPlayStart.error.kPlayFailed, "cannot start play");} else d(i.ZegoWechatLogEvent.kZegoTaskPlayStart.error.kPlayFailed);} else d(i.ZegoWechatLogEvent.kZegoTaskPlayStart.error.kPlayStreamIDTooLongError);} else d(i.ZegoWechatLogEvent.kZegoTaskPlayStart.error.kPlayParamError);} else d(i.ZegoWechatLogEvent.kZegoTaskPlayStart.error.kPlayStreamIDNullError);});}, e.prototype.stopPlayingStream = function (e) {this.logger.info(a.ZEGO_WECHATMINI_ACTION.PLAYMODULE_STOP_PLAYING_STREAM + " call " + e);var t = s.getReportSeq();if (this.dataReport.newReport(t, i.ZegoWechatLogEvent.kZegoTaskPlayStop.event), this.dataReport.addMsgInfo(t, { stream_id: e }), "string" != typeof e || "" == e) return this.logger.error(a.ZEGO_WECHATMINI_ACTION.PLAYMODULE_STOP_PLAYING_STREAM + " stream ID must be string and not empty"), this.dataReport.addMsgInfo(t, i.ZegoWechatLogEvent.kZegoTaskPlayStart.error.kPlayParamError), void this.dataReport.uploadReport(t);var r = this.streamCenter.playerList[e];for (var o in r && r.state !== s.ENUM_PLAYER_STATE.stop && this.streamCenter.onPlayStateUpdate(s.ENUM_PLAY_STATE_UPDATE.error, e, { code: 0, message: "" }), this.streamCenter.stopPlayingStream(e), this.stateCenter.streamUrlMap) {if (this.stateCenter.streamUrlMap[o] === e) {delete this.stateCenter.streamUrlMap[o];break;}}this.mixStreamList[e] && delete this.mixStreamList[e], this.dataReport.uploadReport(t), this.logger.info(a.ZEGO_WECHATMINI_ACTION.PLAYMODULE_STOP_PLAYING_STREAM + " call success");}, e.prototype.startPlayingStreamFromCDN = function (e) {this.logger.info(a.ZEGO_WECHATMINI_ACTION.PLAYMODULE_START_PLAYING_STREAM_FROM_CDN + " call " + e);var t = this.stateCenter.getPlayRoom(e) || this.stateCenter.roomList[0];if (t) {for (var r = null, o = 0; o < t.streamList.length; o++) {if (t.streamList[o].stream_id === e) {r = t.streamList[o].urls_rtmp || [];break;}}return !r || r.length <= 0 ? (this.logger.error(a.ZEGO_WECHATMINI_ACTION.PLAYMODULE_START_PLAYING_STREAM_FROM_CDN + " cannot find stream url,Please check if CDN is configured "), this.streamCenter.onPlayStateUpdate(s.ENUM_PLAY_STATE_UPDATE.error, e, i.ZegoWechatLogEvent.kZegoTaskPlayStart.error.kPlayDispatchError), !1) : (this.logger.info(a.ZEGO_WECHATMINI_ACTION.PLAYMODULE_START_PLAYING_STREAM_FROM_CDN + " play stream"), this.doPlayStream(e, r, s.ENUM_DISPATCH_TYPE.cdn));}this.logger.error(a.ZEGO_WECHATMINI_ACTION.PLAYMODULE_START_PLAYING_STREAM_FROM_CDN + " room no found");}, e.prototype.startPlayingStreamFromBGP = function (e) {return this.logger.info(a.ZEGO_WECHATMINI_ACTION.PLAYMODULE_START_PLAYING_STREAM_FROM_BGP + " fetch stream url"), this.fetchPlayStreamUrl(e, this.ultraPlaySourceType, s.ENUM_DISPATCH_TYPE.ultra), !0;}, e.prototype.doPlayStream = function (e, t, r) {return this.logger.info(a.ZEGO_WECHATMINI_ACTION.PLAYMODULE_DO_PLAY_STREAM + " call"), this.streamCenter.startPlayingStream(e, t, r), !0;}, e.prototype.fetchPlayStreamUrl = function (e, t, r) {var o = this;if (this.logger.info(a.ZEGO_WECHATMINI_ACTION.PLAYMODULE_FETCH_PLAY_STREAM_URL + " call " + e), this.rtm.service.isDisConnect()) this.logger.info(a.ZEGO_WECHATMINI_ACTION.PLAYMODULE_FETCH_PLAY_STREAM_URL + " state error");else {var n;this.logger.info(a.ZEGO_WECHATMINI_ACTION.PLAYMODULE_FETCH_PLAY_STREAM_URL + " send fetch request"), n = "PRIVATE" === this.stateCenter.type ? { stream_id: e, dispatch_type: 2, stream_type: 2, an_type: this.rtm.stateCenter.priModules.anType } : { stream_ids: [e], url_type: t };var l = this.rtm.service.sendMessage("PRIVATE" === this.stateCenter.type ? "zegochat_js.stream_dispatch_req" : "stream_url", n, function (e) {o.handleFetchStreamUrlRsp(e, r);}, function (e) {o.stateCenter.streamUrlMap[l] ? o.streamCenter.onPlayStateUpdate(s.ENUM_PLAY_STATE_UPDATE.error, o.stateCenter.streamUrlMap[l], i.ZegoWechatLogEvent.kZegoTaskPlayStart.error.kPlayDispatchError) : o.logger.info(a.ZEGO_WECHATMINI_ACTION.PLAYMODULE_FETCH_PLAY_STREAM_URL + " already stop play");});-1 !== l && (this.stateCenter.streamUrlMap[l] = e, this.streamCenter.playerList[e] && (this.streamCenter.playerList[e].seq = l)), this.logger.info(a.ZEGO_WECHATMINI_ACTION.PLAYMODULE_FETCH_PLAY_STREAM_URL + " call success");}}, e.prototype.handleFetchStreamUrlRsp = function (e, t) {var r;this.logger.info(a.ZEGO_WECHATMINI_ACTION.PLAYMODULE_HANDLE_FETCH_STREAM_URL_RSP + " call ");var o = this.stateCenter.streamUrlMap[e.header.seq];o && delete this.stateCenter.streamUrlMap[e.header.seq];var n = "PUBLIC" === this.stateCenter.type ? e.body.err_code : e.body.code;if (0 !== n) return this.logger.error(a.ZEGO_WECHATMINI_ACTION.PLAYMODULE_HANDLE_FETCH_STREAM_URL_RSP + " server error= " + n), void this.streamCenter.onPlayStateUpdate(s.ENUM_PLAY_STATE_UPDATE.error, o, i.ZegoWechatLogEvent.kZegoTaskPlayStart.error.kPlayDispatchError);var l = "",u = [];if ("PRIVATE" === this.stateCenter.type) {if (e.body.stream_url_info && e.body.stream_url_info.ip_infos.length > 0) {l = e.body.stream_id, u = [];var _ = e.body.stream_url_info.stream_url,d = e.body.stream_url_info.ip_infos,c = /^rtmp:\/\/(.*?)\/.*({.*})/;d.forEach(function (e) {var t = e.ip_address + ":" + e.port,r = _.replace(c.exec(_)[1], t);r = r.replace(c.exec(_)[2], l), u.push(r);});}} else e.body.stream_url_infos && e.body.stream_url_infos.length > 0 && (l = e.body.stream_url_infos[0].stream_id, u = e.body.stream_url_infos[0].urls_ws);var g = !1,h = this.stateCenter.getRoomByRoomID(null === (r = null == e ? void 0 : e.header) || void 0 === r ? void 0 : r.room_id);if (h) {if (e.header.seq === this.streamCenter.playerList[l].seq) {for (var E = 0; E < h.streamList.length; E++) {if (h.streamList[E].stream_id == l) {h.streamList[E].urltra_url_rtmp = u, g = !0;break;}}!g && this.mixStreamList[l] && (this.mixStreamList[l].urltra_url_rtmp = u, t = s.ENUM_DISPATCH_TYPE.cdn, g = !0), g || (this.logger.info(a.ZEGO_WECHATMINI_ACTION.PLAYMODULE_HANDLE_FETCH_STREAM_URL_RSP + "cannot find streamInfo in existing stream list"), h.streamList.push({ stream_id: l, urltra_url_rtmp: u })), this.doPlayStream(l, u, t), this.logger.info(a.ZEGO_WECHATMINI_ACTION.PLAYMODULE_HANDLE_FETCH_STREAM_URL_RSP + " call success");} else this.logger.info(a.ZEGO_WECHATMINI_ACTION.PLAYMODULE_HANDLE_FETCH_STREAM_URL_RSP + " seq is not match, ignore " + l);} else this.logger.error(a.ZEGO_WECHATMINI_ACTION.PLAYMODULE_HANDLE_FETCH_STREAM_URL_RSP + " room no found");}, e.prototype.setPreferPlaySourceType = function (e) {return this.logger.info(a.ZEGO_WECHATMINI_ACTION.WECHATMINI_SETPREFERPLAYSOURCETYPE + " call"), e !== s.ENUM_PLAY_SOURCE_TYPE.cdn && e !== s.ENUM_PLAY_SOURCE_TYPE.ultra ? (this.logger.error(a.ZEGO_WECHATMINI_ACTION.WECHATMINI_SETPREFERPLAYSOURCETYPE + " sourceType can be number 0 or 1, which can be represented auto or ultra"), !1) : (this.preferPlaySourceType = e, this.logger.info(a.ZEGO_WECHATMINI_ACTION.WECHATMINI_SETPREFERPLAYSOURCETYPE + " call success"), !0);}, e;}();t.PlayModule = l;}, 557: function _(e, t) {"use strict";var r = this && this.__awaiter || function (e, t, r, o) {return new (r || (r = Promise))(function (s, i) {function n(e) {try {l(o.next(e));} catch (e) {i(e);}}function a(e) {try {l(o.throw(e));} catch (e) {i(e);}}function l(e) {var t;e.done ? s(e.value) : (t = e.value, t instanceof r ? t : new r(function (e) {e(t);})).then(n, a);}l((o = o.apply(e, t || [])).next());});},o = this && this.__generator || function (e, t) {var r,o,s,i,n = { label: 0, sent: function sent() {if (1 & s[0]) throw s[1];return s[1];}, trys: [], ops: [] };return i = { next: a(0), throw: a(1), return: a(2) }, "function" == typeof Symbol && (i[Symbol.iterator] = function () {return this;}), i;function a(i) {return function (a) {return function (i) {if (r) throw new TypeError("Generator is already executing.");for (; n;) {try {if (r = 1, o && (s = 2 & i[0] ? o.return : i[0] ? o.throw || ((s = o.return) && s.call(o), 0) : o.next) && !(s = s.call(o, i[1])).done) return s;switch (o = 0, s && (i = [2 & i[0], s.value]), i[0]) {case 0:case 1:s = i;break;case 4:return n.label++, { value: i[1], done: !1 };case 5:n.label++, o = i[1], i = [0];continue;case 7:i = n.ops.pop(), n.trys.pop();continue;default:if (!((s = (s = n.trys).length > 0 && s[s.length - 1]) || 6 !== i[0] && 2 !== i[0])) {n = 0;continue;}if (3 === i[0] && (!s || i[1] > s[0] && i[1] < s[3])) {n.label = i[1];break;}if (6 === i[0] && n.label < s[1]) {n.label = s[1], s = i;break;}if (s && n.label < s[2]) {n.label = s[2], n.ops.push(i);break;}s[2] && n.ops.pop(), n.trys.pop();continue;}i = t.call(e, n);} catch (e) {i = [6, e], o = 0;} finally {r = s = 0;}}if (5 & i[0]) throw i[1];return { value: i[0] ? i[1] : void 0, done: !0 };}([i, a]);};}};Object.defineProperty(t, "__esModule", { value: !0 }), t.LivePlayer = void 0;var s = function () {function e(e, t, r, o) {this.wxContext = e, this.streamID = t, this.zegoWechatMini = r, this.attributes = {}, this.isPlaying = !1, this.logger = this.zegoWechatMini.logger, this.attributes.id = t, this.context = wx.createLivePlayerContext(this.attributes.id, o || this.wxContext);}return e.prototype.setPlayerAttributes = function (e, t) {this.logger.info("zw.p.1.spa call " + this.streamID + " " + JSON.stringify(e)), Object.assign(this.attributes, e), this.zegoWechatMini.setPlayData(t), this.logger.info("zw.p.1.spa call success " + this.streamID + " " + JSON.stringify(this.attributes));}, e.prototype.play = function (e) {return r(this, void 0, void 0, function () {var t = this;return o(this, function (s) {return new Promise(function (s, i) {return r(t, void 0, void 0, function () {var t,r,n = this;return o(this, function (o) {switch (o.label) {case 0:return o.trys.push([0, 2,, 3]), [4, this.zegoWechatMini.startPlayingStream(this.streamID, e)];case 1:return t = o.sent().url, this.attributes.url = t, this.isPlaying = !0, this.zegoWechatMini.setPlayData(), this.context.play({ success: function success() {s(!0);}, fail: function fail() {n.logger.error("zw.p.1.p.0 start play fail"), i();} }), [3, 3];case 2:return r = o.sent(), this.logger.error("zw.p.1.p.0 start play catch fail " + JSON.stringify(r)), i(), [3, 3];case 3:return [2];}});});}), [2];});});}, e.prototype.stop = function () {var e = this;this.logger.info("zw.p.1.s call stop " + this.streamID), this.isPlaying || this.logger.info("zw.p.1.s stream is not playing"), this.context && this.context.stop(), this.streamID && (this.zegoWechatMini.stopPlayingStream(this.streamID), this.zegoWechatMini.wechatMiniModules.streamCenter.livePlayerList = this.zegoWechatMini.wechatMiniModules.streamCenter.livePlayerList.filter(function (t) {return t.streamID !== e.streamID;})), this.isPlaying = !1, this.zegoWechatMini.setPlayData(), this.logger.info("zw.p.1.s call success");}, e.prototype.pause = function (e) {this.logger.info("zw.p.1.p.1 pull pause call " + this.streamID);try {this.context.pause(e);} catch (e) {this.logger.error(JSON.stringify(e));}this.logger.info("zw.p.1.p.1 pull pause success");}, e.prototype.resume = function (e) {this.logger.info("zw.p.1.r call " + this.streamID);try {this.context.resume(e);} catch (e) {this.logger.error(JSON.stringify(e));}this.logger.info("zw.p.1.r call success");}, e.prototype.mute = function (e) {this.logger.info("zw.p.1.m mute call " + this.streamID);try {this.context.mute(e);} catch (e) {this.logger.error(JSON.stringify(e));}this.logger.info("zw.p.1.m mute success");}, e.prototype.requestFullScreen = function (e) {this.logger.info("zw.p.1.rfs call " + this.streamID);try {this.context.requestFullScreen(e);} catch (e) {this.logger.error(JSON.stringify(e));}this.logger.info("zw.p.1.rfs call success");}, e.prototype.exitFullScreen = function (e) {this.logger.info("zw.p.1.efs call " + this.streamID);try {this.context.exitFullScreen(e);} catch (e) {this.logger.error(JSON.stringify(e));}this.logger.info("zw.p.1.efs call success");}, e.prototype.requestPictureInPicture = function (e) {this.logger.info("zw.p.1.rpip call " + this.streamID);try {this.context.requestPictureInPicture(e);} catch (e) {this.logger.error(JSON.stringify(e));}this.logger.info("zw.p.1.rpip call success");}, e.prototype.exitPictureInPicture = function (e) {this.logger.info("zw.p.1.epip call " + this.streamID);try {this.context.exitPictureInPicture(e);} catch (e) {this.logger.error(JSON.stringify(e));}this.logger.info("zw.p.1.epip call success");}, e.prototype.snapshot = function (e) {this.logger.info("zw.p.1.ss call " + this.streamID);try {this.context.snapshot(e);} catch (e) {this.logger.error(JSON.stringify(e));}this.logger.info("zw.p.1.ss call success");}, e;}();t.LivePlayer = s;}, 80: function _(e, t, r) {"use strict";var o = this && this.__assign || function () {return o = Object.assign || function (e) {for (var t, r = 1, o = arguments.length; r < o; r++) {for (var s in t = arguments[r]) {Object.prototype.hasOwnProperty.call(t, s) && (e[s] = t[s]);}}return e;}, o.apply(this, arguments);};Object.defineProperty(t, "__esModule", { value: !0 }), t.PublishModule = void 0;var s = r(706),i = r(706),n = r(89),a = r(529),l = r(608),u = function () {function e(e, t, r, o, s) {this.logger = e, this.dataReport = t, this.stateCenter = r, this.streamCenter = o, this.rtm = s, this.preferPublishSourceType = i.ENUM_DISPATCH_TYPE.ultra, this.ultraPlaySourceType = "rtmp_v2";}return e.prototype.startPublishingStream = function (e, t) {var r = this;return new Promise(function (s, u) {r.logger.info(n.ZEGO_WECHATMINI_ACTION.PUBLISHMODULE_START_PUBLISHING_STREAM + " call");var _ = i.getReportSeq();r.stateCenter.reportSeqList.startPublish[e] = _, r.dataReport.newReport(_, a.ZegoWechatLogEvent.kZegoTaskPublishStart.event);var d = function d(t, s) {r.logger.error(n.ZEGO_WECHATMINI_ACTION.PUBLISHMODULE_START_PUBLISHING_STREAM + " " + (s || t.message)), r.dataReport.uploadReport(_, void 0, t, s), delete r.stateCenter.reportSeqList.startPublish[e], u(o(o({}, t), { errorCode: t.code, extendedData: t.message + (s ? " " + s : "") }));};if (l.ClientUtil.isParamEmpty(e)) {if (l.ClientUtil.isTypeString(e)) {if (!l.ClientUtil.isTooLong(e, i.MAX_STREAM_ID_LENGTH)) return d(a.ZegoWechatLogEvent.kZegoTaskPublishStart.error.kPublishStreamIDTooLongError), !1;if (!l.ClientUtil.checkIllegalCharacters(e)) return d(a.ZegoWechatLogEvent.kZegoTaskPublishStart.error.kPublishStreamIDInvalidCharacterError), !1;if (r.stateCenter.isMultiRoom && (!t || "string" != typeof t.roomID || "" == t.roomID)) return d(a.ZegoWechatLogEvent.kZegoTaskPublishStart.error.kPublishParamError, "  roomID is need if set multi room"), !1;var c = (null == t ? void 0 : t.roomID) ? t.roomID : r.stateCenter.roomList[0].roomID,g = r.stateCenter.getRoomByRoomID(c);if (r.dataReport.addMsgInfo(_, { publish_room_id: c }), g) {if (r.stateCenter.customUrl && 0 != r.stateCenter.customUrl.length) return r.stateCenter.publishStreamList[e] = { state: i.ENUM_PUBLISH_STREAM_STATE.waiting_url, extra_info: t && t.extraInfo ? t.extraInfo : null }, r.streamCenter.updatePublishingState(g, e, t && t.streamParams ? t.streamParams : void 0, !0) ? (r.streamCenter.publishSuccessCallBackList[e] = function (e, t) {s({ streamID: e, url: t });}, r.streamCenter.startPublishingStream(e, r.stateCenter.customUrl, 1)) : void d(a.ZegoWechatLogEvent.kZegoTaskPublishStart.error.kIsPublishing, "cannot start publish");if (r.rtm.service.isDisConnect()) d(a.ZegoWechatLogEvent.kZegoTaskPublishStart.error.kPublishNoLoginError);else {if (!r.streamCenter.updatePublishingState(g, e, t && t.streamParams ? t.streamParams : void 0, !0)) return d(a.ZegoWechatLogEvent.kZegoTaskPublishStart.error.kIsPublishing, "cannot start publish"), !1;l.ClientUtil.logReportCallback("kZegoTaskPublishStart" + e, r.dataReport, _, r.stateCenter.reportList), g.streamHandler.onPublishStateUpdate(i.ENUM_PUBLISH_STATE_UPDATE.retry, e, { code: 0, message: "" }), r.dataReport.addMsgInfo(_, { stream: a.ZegoWechatLogEvent.kZegoTaskPublishStart.stream(e), publishOption: a.ZegoWechatLogEvent.kZegoTaskPublishStart.publishOption(t) }), !t || "CDN" != t.sourceType && "BGP" != t.sourceType || r.setPreferPublishSourceType(i.ENUM_SOURCE_TYPE[t.sourceType]), r.stateCenter.publishStreamList[e] = { state: i.ENUM_PUBLISH_STREAM_STATE.waiting_url, extra_info: t && t.extraInfo ? t.extraInfo : null }, r.logger.info(n.ZEGO_WECHATMINI_ACTION.PUBLISHMODULE_START_PUBLISHING_STREAM + " fetch stream url"), l.ClientUtil.actionLogReportCallback("kZegoTaskPublishStart" + e, r.stateCenter.reportList, i.REPORT_ACTION.eventStart, "get_publish_url"), r.streamCenter.publishSuccessCallBackList[e] = function (e, t) {l.ClientUtil.actionLogReportCallback("kZegoTaskPublishStart" + e, r.stateCenter.reportList, i.REPORT_ACTION.eventEnd, "get_publish_url"), s({ streamID: e, url: t });}, r.streamCenter.publishErrorCallBackList[e] = function (e) {d(e);}, r.fetchPublishStreamUrl(e, g);}} else d(a.ZegoWechatLogEvent.kZegoTaskPublishStart.error.kPublishParamError, "room no found");} else d(a.ZegoWechatLogEvent.kZegoTaskPublishStart.error.kPublishParamError);} else d(a.ZegoWechatLogEvent.kZegoTaskPublishStart.error.kPublishStreamIDNullError);});}, e.prototype.setPreferPublishSourceType = function (e, t) {return this.logger.info(n.ZEGO_WECHATMINI_ACTION.PUBLISHMODULE_SET_PREFER_PUBLISH_SOURCE_TYPE + " call"), e !== i.ENUM_DISPATCH_TYPE.cdn && e !== i.ENUM_DISPATCH_TYPE.ultra && e !== i.ENUM_DISPATCH_TYPE.customUrl ? (this.logger.error(n.ZEGO_WECHATMINI_ACTION.PUBLISHMODULE_SET_PREFER_PUBLISH_SOURCE_TYPE + " sourceType only can be number 0 1 2"), !1) : e !== i.ENUM_DISPATCH_TYPE.customUrl || "string" == typeof t && "" != t ? (this.preferPublishSourceType = e, this.customCdnUrl = t, this.logger.info(n.ZEGO_WECHATMINI_ACTION.PUBLISHMODULE_SET_PREFER_PUBLISH_SOURCE_TYPE + " call success"), !0) : (this.logger.error(n.ZEGO_WECHATMINI_ACTION.PUBLISHMODULE_SET_PREFER_PUBLISH_SOURCE_TYPE + " customUrl must be string and not empty"), !1);}, e.prototype.fetchPublishStreamUrl = function (e, t) {var r = this;this.logger.info(n.ZEGO_WECHATMINI_ACTION.PUBLISHMODULE_FETCH_PUBLISH_STREAM_URL + " call"), this.logger.info(n.ZEGO_WECHATMINI_ACTION.PUBLISHMODULE_FETCH_PUBLISH_STREAM_URL + " send fetch publish request");var o,s = "";this.preferPublishSourceType == i.ENUM_DISPATCH_TYPE.cdn ? s = "cdn" : this.preferPublishSourceType == i.ENUM_DISPATCH_TYPE.ultra && (s = "bgp"), o = "PUBLIC" === this.stateCenter.type ? { stream_id: e, url_type: this.ultraPlaySourceType, publish_type: s, header_kvs: [{ key: "grpc-metadata-push", value: this.customCdnUrl || "" }] } : { stream_id: e, dispatch_type: 1, stream_type: 2, an_type: this.rtm.stateCenter.priModules.anType };var l = this.rtm.service.sendMessage("PRIVATE" === this.stateCenter.type ? "zegochat_js.stream_dispatch_req" : "stream_publish", o, function (e) {r.handleFetchStreamPublishUrlRsp(e);}, function (o, s) {r.streamCenter.publishErrorCallBackList[e](a.ZegoWechatLogEvent.kZegoTaskPublishStart.error.kPublishDispatchError), t.streamHandler.onPublishStateUpdate(i.ENUM_PUBLISH_STATE_UPDATE.error, e, a.ZegoWechatLogEvent.kZegoTaskPublishStart.error.kPublishDispatchError), r.streamCenter.stopPublishingStream(e);}, void 0, { sessionID: t.sessionID, roomID: t.roomID, roomSessionID: t.roomSessionID });-1 !== l && (this.stateCenter.streamUrlMap[l] = e), this.logger.info(n.ZEGO_WECHATMINI_ACTION.PUBLISHMODULE_FETCH_PUBLISH_STREAM_URL + " call success");}, e.prototype.handleFetchStreamPublishUrlRsp = function (e) {var t;this.logger.info(n.ZEGO_WECHATMINI_ACTION.PUBLISHMODULE_HANDLE_FETCH_STREAM_PUBLISH_URL_RSP + " call");var r = null === (t = null == e ? void 0 : e.header) || void 0 === t ? void 0 : t.room_id,o = this.stateCenter.getRoomByRoomID(r);if (o) {var s = this.stateCenter.streamUrlMap[e.header.seq];s && delete this.stateCenter.streamUrlMap[e.header.seq];var l = "PUBLIC" === this.stateCenter.type ? e.body.err_code : e.body.code;if (0 !== l) return this.logger.info(n.ZEGO_WECHATMINI_ACTION.PUBLISHMODULE_HANDLE_FETCH_STREAM_PUBLISH_URL_RSP + " server error= " + l), void (this.stateCenter.publishStreamList[s] && (this.logger.error(n.ZEGO_WECHATMINI_ACTION.PUBLISHMODULE_HANDLE_FETCH_STREAM_PUBLISH_URL_RSP + " liveRoom cmd error"), this.streamCenter.publishErrorCallBackList[s](a.ZegoWechatLogEvent.kZegoTaskPublishStart.error.kPublishDispatchError), o.streamHandler.onPublishStateUpdate(i.ENUM_PUBLISH_STATE_UPDATE.error, s, { code: a.ZegoWechatLogEvent.kZegoTaskPublishStart.error.kPublishDispatchError.code, message: "server error= " + l }), this.streamCenter.stopPublishingStream(s)));if (e.body.stream_url_info) {var u = "PUBLIC" === this.stateCenter.type ? e.body.stream_url_info.stream_id : e.body.stream_id,_ = [];if ("PUBLIC" === this.stateCenter.type) _ = e.body.stream_url_info.urls_ws;else {var d = e.body.stream_url_info.stream_url,c = e.body.stream_url_info.ip_infos,g = /^rtmp:\/\/(.*?)\/.*({.*})/;c.forEach(function (e) {var t = e.ip_address + ":" + e.port,r = d.replace(g.exec(d)[1], t);r = r.replace(g.exec(d)[2], u), _.push(r);});}if (!this.stateCenter.publishStreamList[u]) return void this.logger.error(n.ZEGO_WECHATMINI_ACTION.PUBLISHMODULE_HANDLE_FETCH_STREAM_PUBLISH_URL_RSP + " cannot find stream");this.stateCenter.publishStreamList[u].url_rtmp = _, this.stateCenter.publishStreamList[u].state = i.ENUM_PUBLISH_STREAM_STATE.tryPublish, this.doPublishStream(u, _, o);}} else this.logger.error(n.ZEGO_WECHATMINI_ACTION.PUBLISHMODULE_HANDLE_FETCH_STREAM_PUBLISH_URL_RSP + " room no found");}, e.prototype.doPublishStream = function (e, t, r) {return this.logger.info(n.ZEGO_WECHATMINI_ACTION.PUBLISHMODULE_DO_PUBLISH_STREAM + " call " + e + "streamUrl: " + t), !t || t.length <= 0 ? (this.streamCenter.publishErrorCallBackList[e](a.ZegoWechatLogEvent.kZegoTaskPublishStart.error.kPublishDispatchError), r.streamHandler.onPublishStateUpdate(i.ENUM_PUBLISH_STATE_UPDATE.error, e, a.ZegoWechatLogEvent.kZegoTaskPublishStart.error.kPublishDispatchError), !1) : (this.streamCenter.startPublishingStream(e, t, this.preferPublishSourceType), this.logger.info(n.ZEGO_WECHATMINI_ACTION.PUBLISHMODULE_DO_PUBLISH_STREAM + " call success"), !0);}, e.prototype.stopPublishingStream = function (e) {var t = this;this.logger.info(n.ZEGO_WECHATMINI_ACTION.PUBLISHMODULE_STOP_PUBLISHING_STREAM + " call " + e);var r = i.getReportSeq();this.dataReport.newReport(r, a.ZegoWechatLogEvent.kZegoTaskPublishStop.event), this.dataReport.addMsgInfo(r, { stream_id: e });var o = function o(_o3, s) {t.logger.error(n.ZEGO_WECHATMINI_ACTION.PUBLISHMODULE_STOP_PUBLISHING_STREAM + " " + (s || _o3.message)), t.dataReport.uploadReport(r, void 0, _o3, s), delete t.stateCenter.reportSeqList.startPublish[e];};if (!l.ClientUtil.isParamEmpty(e)) return o(a.ZegoWechatLogEvent.kZegoTaskPublishStart.error.kPublishStreamIDNullError), !1;if (!l.ClientUtil.isTypeString(e)) return this.logger.error(n.ZEGO_WECHATMINI_ACTION.PUBLISHMODULE_STOP_PUBLISHING_STREAM + " room no found"), !1;var u = this.streamCenter.publisherList[e],_ = null == u ? void 0 : u.room;if (!_) return o(a.ZegoWechatLogEvent.kZegoTaskPublishStart.error.kPublishParamError, " room no found"), !1;if (u && u.state !== i.ENUM_PLAYER_STATE.stop && _.streamHandler.onPublishStateUpdate(i.ENUM_PUBLISH_STATE_UPDATE.error, e, { code: 0, message: "" }), this.streamCenter.stopPublishingStream(e), this.stateCenter.publishStreamList[e]) {if (this.stateCenter.publishStreamList[e].state >= i.ENUM_PUBLISH_STREAM_STATE.update_info) {var d;d = "PUBLIC" === this.stateCenter.type ? i.ENUM_STREAM_SUB_CMD.liveEnd : s.ENUM_STREAM_CMD_PRI.liveEnd, _.streamHandler.updateStreamInfo(e, d);for (var c = 0; c < _.streamList.length; c++) {if (_.streamList[c].stream_id == e) {_.streamList.splice(c--, 1);break;}}}delete this.stateCenter.publishStreamList[e];}return this.stateCenter.streamUrlMap[e] && delete this.stateCenter.streamUrlMap[e], this.dataReport.uploadReport(r), this.logger.info(n.ZEGO_WECHATMINI_ACTION.PUBLISHMODULE_STOP_PUBLISHING_STREAM + " call success"), !0;}, e;}();t.PublishModule = u;}, 935: function _(e, t) {"use strict";var r = this && this.__awaiter || function (e, t, r, o) {return new (r || (r = Promise))(function (s, i) {function n(e) {try {l(o.next(e));} catch (e) {i(e);}}function a(e) {try {l(o.throw(e));} catch (e) {i(e);}}function l(e) {var t;e.done ? s(e.value) : (t = e.value, t instanceof r ? t : new r(function (e) {e(t);})).then(n, a);}l((o = o.apply(e, t || [])).next());});},o = this && this.__generator || function (e, t) {var r,o,s,i,n = { label: 0, sent: function sent() {if (1 & s[0]) throw s[1];return s[1];}, trys: [], ops: [] };return i = { next: a(0), throw: a(1), return: a(2) }, "function" == typeof Symbol && (i[Symbol.iterator] = function () {return this;}), i;function a(i) {return function (a) {return function (i) {if (r) throw new TypeError("Generator is already executing.");for (; n;) {try {if (r = 1, o && (s = 2 & i[0] ? o.return : i[0] ? o.throw || ((s = o.return) && s.call(o), 0) : o.next) && !(s = s.call(o, i[1])).done) return s;switch (o = 0, s && (i = [2 & i[0], s.value]), i[0]) {case 0:case 1:s = i;break;case 4:return n.label++, { value: i[1], done: !1 };case 5:n.label++, o = i[1], i = [0];continue;case 7:i = n.ops.pop(), n.trys.pop();continue;default:if (!((s = (s = n.trys).length > 0 && s[s.length - 1]) || 6 !== i[0] && 2 !== i[0])) {n = 0;continue;}if (3 === i[0] && (!s || i[1] > s[0] && i[1] < s[3])) {n.label = i[1];break;}if (6 === i[0] && n.label < s[1]) {n.label = s[1], s = i;break;}if (s && n.label < s[2]) {n.label = s[2], n.ops.push(i);break;}s[2] && n.ops.pop(), n.trys.pop();continue;}i = t.call(e, n);} catch (e) {i = [6, e], o = 0;} finally {r = s = 0;}}if (5 & i[0]) throw i[1];return { value: i[0] ? i[1] : void 0, done: !0 };}([i, a]);};}};Object.defineProperty(t, "__esModule", { value: !0 }), t.LivePusher = void 0;var s = function () {function e(e, t, r, o) {this.wxContext = e, this.dataAtr = t, this.zegoWechatMini = r, this.defaultAttributes = { enableCamera: !0, enableMic: !0 }, this.attributes = {}, this.isPublishing = !1, this.logger = this.zegoWechatMini.logger, this.context = wx.createLivePusherContext(), Object.assign(this.attributes, this.defaultAttributes), Object.assign(this.attributes, o);}return e.prototype.setWXData = function (e) {if (this.wxContext && this.dataAtr) {if (void 0 === e || "function" == typeof e) {var t = {};t[this.dataAtr] = this.attributes, this.wxContext.setData(t, e);} else this.logger.info("zw.p.0.swd callBack is not function");} else this.logger.error("zw.p.0.swd context wrong");}, e.prototype.iswxContext = function () {return !!this.wxContext;}, e.prototype.setPusherAttributes = function (e, t) {this.logger.info("zw.p.0.spa call " + JSON.stringify(e)), Object.assign(this.attributes, e), this.setWXData(t), this.logger.info("zw.p.0.spa call success " + JSON.stringify(this.attributes));}, e.prototype.startPreview = function (e) {this.logger.info("zw.p.0.sp.0 call");try {this.context.startPreview(e);} catch (e) {this.logger.error(JSON.stringify(e));}this.logger.info("zw.p.0.sp.0 call success");}, e.prototype.stopPreview = function (e) {this.logger.info("zw.p.0.sp.1 call");try {this.context.stopPreview(e);} catch (e) {this.logger.error(JSON.stringify(e));}this.logger.info("zw.p.0.sp.1 call success");}, e.prototype.start = function (e, t) {var s = this;return new Promise(function (i, n) {return r(s, void 0, void 0, function () {var r,s,a = this;return o(this, function (o) {switch (o.label) {case 0:if ("string" != typeof e) return this.logger.error("zw.p.0.s.0 streamID type error"), [2];this.attributes.id = e, o.label = 1;case 1:return o.trys.push([1, 3,, 4]), [4, this.zegoWechatMini.startPublishingStream(e, t)];case 2:return r = o.sent(), this.attributes.url = r.url, this.isPublishing = !0, this.setWXData(), this.context.start({ success: function success() {a.logger.info("zw.p.0.s.0 publish success"), i();}, fail: function fail(e) {a.logger.error(JSON.stringify(e)), n(e);} }), [3, 4];case 3:return s = o.sent(), this.logger.error("zw.p.0.s.0 " + JSON.stringify(s)), n(s), [3, 4];case 4:return [2];}});});});}, e.prototype.pause = function (e) {this.logger.info("zw.p.0.p call");try {this.context.pause(e);} catch (e) {this.logger.error(JSON.stringify(e));}this.logger.info("zw.p.0.p call success");}, e.prototype.resume = function (e) {this.logger.info("zw.p.0.r call");try {this.context.resume(e);} catch (e) {this.logger.error(JSON.stringify(e));}this.logger.info("zw.p.0.r call success");}, e.prototype.stop = function () {this.logger.info("zw.p.0.s.1 call"), this.attributes.id || this.logger.error("zw.p.0.s.1 publish id no found");try {this.context && this.context.stop(), this.attributes.id && this.zegoWechatMini.stopPublishingStream(this.attributes.id), this.attributes = {}, Object.assign(this.attributes, this.defaultAttributes), this.isPublishing = !1, this.setWXData();} catch (e) {return void this.logger.error(JSON.stringify(e));}this.logger.info("zw.p.0.s.1 call success");}, e.prototype.snapshot = function (e) {this.logger.info("zw.p.0.ss call");try {this.context.snapshot(e);} catch (e) {this.logger.error(JSON.stringify(e));}this.logger.info("zw.p.0.ss call success");}, e.prototype.playBGM = function (e) {this.logger.info("zw.p.0.pb.0 call");try {this.context.playBGM(e);} catch (e) {this.logger.error(JSON.stringify(e));}this.logger.info("zw.p.0.pb.0 call success");}, e.prototype.pauseBGM = function (e) {this.logger.info("zw.p.0.pb.1 call");try {this.context.pauseBGM(e);} catch (e) {this.logger.error(JSON.stringify(e));}this.logger.info("zw.p.0.pb.1 call success");}, e.prototype.resumeBGM = function (e) {this.logger.info("zw.p.0.rb call");try {this.context.resumeBGM(e);} catch (e) {this.logger.error(JSON.stringify(e));}this.logger.info("zw.p.0.rb call success");}, e.prototype.stopBGM = function (e) {this.logger.info("zw.p.0.sb call");try {this.context.stopBGM(e);} catch (e) {this.logger.error(JSON.stringify(e));}this.logger.info("zw.p.0.sb call success");}, e.prototype.setBGMVolume = function (e) {this.logger.info("zw.p.0.sbv call");try {this.context.setBGMVolume(e);} catch (e) {this.logger.error(JSON.stringify(e));}this.logger.info("zw.p.0.sbv call success");}, e.prototype.setMICVolume = function (e) {this.logger.info("zw.p.0.smv call");try {this.context.setMICVolume(e);} catch (e) {this.logger.error(JSON.stringify(e));}this.logger.info("zw.p.0.smv call success");}, e.prototype.switchCamera = function (e) {this.logger.info("zw.p.0.sc call");try {this.context.switchCamera(e);} catch (e) {this.logger.error(JSON.stringify(e));}this.logger.info("zw.p.0.sc call success");}, e.prototype.toggleTorch = function (e) {this.logger.info("zw.p.0.tt call");try {this.context.toggleTorch(e);} catch (e) {this.logger.error(JSON.stringify(e));}this.logger.info("zw.p.0.tt call success");}, e;}();t.LivePusher = s;}, 938: function _(e, t, r) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.ZegoPlayWechat = void 0;var o = r(89),s = r(608),i = r(706),n = r(529),a = function () {function e(e, t, r, o, s, n) {this.logger = e, this.streamId = t, this.streamCenter = r, this.dataReport = o, this.stateCenter = s, this.room = n, this.urls = [], this.tryUrls = [], this.playUrlIndex = 0, this.playUrlTryCount = 0, this.currentUrl = null, this.retryIndex = 0, this.reconnectCount = 0, this.state = i.ENUM_PLAYER_STATE.stop, this.reconnectLimit = 0, this.sourceType = 0, this.playerType = 0, this.playerSeq = 0, this.playerReportSeq = 0, this.publishQualitySeq = 0, this.publishQualityCount = 0, this.publishQulaityMaxCount = 30, this.playQualitySeq = 0, this.playQualityCount = 0, this.playQulaityMaxCount = 30, this.everSuccess = !1, this.pushBegin = !1, this.playBegin = !1, this.playerLogUploadTime = new Date().getTime(), this.seq = -1;}return e.prototype.resetPlayer = function () {this.state = i.ENUM_PLAYER_STATE.stop;}, e.prototype.newPlayer = function () {this.resetPlayer();var e = this.getCurrentPlayerUrl(),t = e;0 != this.params.length && (t = e + "?" + this.params);var r = new Date().getTime();return t = t.indexOf("?") > -1 ? t + "&zgseq=" + r + "&zgdid=" + this.room.sessionID : t + "?zgseq=" + r + "&zgdid=" + this.room.sessionID, e !== this.currentUrl ? (this.currentUrl = e, this.streamCenter.onStreamUrlUpdate(this.streamId, t, this.playerType)) : this.streamCenter.onPlayerRetry(this.streamId, this.playerType), 0 == this.everSuccess ? 0 == this.playerType ? (this.dataReport.eventStart(this.playerReportSeq, "PlayBegin"), this.dataReport.addEventInfo(this.playerReportSeq, "PlayBegin", "url", t), this.tryUrls.push(t)) : (this.dataReport.eventStart(this.playerReportSeq, "PublishBegin"), this.dataReport.addEventInfo(this.playerReportSeq, "PublishBegin", "url", t), this.tryUrls.push(t)) : 0 == this.playerType ? this.dataReport.addEventInfo(this.playerSeq, "PlayRetry", "url", t) : this.dataReport.addEventInfo(this.playerSeq, "PublishRetry", "url", t), this.state = i.ENUM_PLAYER_STATE.start, !0;}, e.prototype.stopPlayer = function () {0 == this.playerType ? this.dataReport.eventEndWithMsg(this.playerReportSeq, "PlayStat", { quality: this.playerInfo }) : (this.dataReport.addEventInfo(this.playerReportSeq, "PublishStat", "quality", this.playerInfo), this.dataReport.eventEndWithMsg(this.playerReportSeq, "PublishStat", { quality: this.playerInfo }));}, e.prototype.tryStartPlayer = function (e) {for (this.logger.info(o.ZEGO_WECHATMINI_ACTION.PLAYWECHAT_TRY_START_PLAYER + " call"); this.playUrlTryCount < this.urls.length;) {if (++this.reconnectCount > this.reconnectLimit) this.playUrlTryCount++, this.playUrlIndex = (this.playUrlIndex + 1) % this.urls.length, this.reconnectCount = 0;else if (this.logger.info(o.ZEGO_WECHATMINI_ACTION.PLAYWECHAT_TRY_START_PLAYER + " index: " + this.playUrlIndex + ", url: " + this.getCurrentPlayerUrl()), this.newPlayer()) break;}if (this.playUrlTryCount >= this.urls.length) {this.logger.info(o.ZEGO_WECHATMINI_ACTION.PLAYWECHAT_TRY_START_PLAYER + " stream: " + this.streamId), this.resetPlayer();var t = "";0 == this.playerType ? t = "PlayEnd" : 1 == this.playerType && (t = "PublishEnd", this.reportQualityStatics());var r = { error: e, reason: "no url to retry" };this.dataReport.addEvent(this.playerSeq, t, r), this.streamCenter.onPlayerStop(this.streamId, this.playerType, e);}}, e.prototype.getPlayerUrl = function () {this.logger.info(o.ZEGO_WECHATMINI_ACTION.PLAYWECHAT_GET_PLAY_URL + " call " + this.streamId);var e = this.urls[++this.retryIndex % this.urls.length],t = e;0 != this.params.length && (t = e + "?" + this.params);var r = new Date().getTime();return t = t.indexOf("?") > -1 ? t + "&zgseq=" + r + "&zgdid=" + this.room.sessionID : t + "?zgseq=" + r + "&zgdid=" + this.room.sessionID, this.tryUrls.push(t), this.logger.info(o.ZEGO_WECHATMINI_ACTION.PLAYWECHAT_GET_PLAY_URL + " call streamId: " + this.streamId + " url: " + t), t;}, e.prototype.shouldRetryPlay = function (e) {var t = e.detail.code;return 3001 == t || 3002 == t || 3003 == t || 3005 == t;}, e.prototype.isPlayFailed = function (e) {var t = e.detail.code;return -2301 == t || 2101 == t || 2102 == t;}, e.prototype.shouldRetryPublish = function (e) {var t = e.detail.code;return 3001 == t || 3002 == t || 3003 == t || 3004 == t || 3005 == t;}, e.prototype.isPublishFailed = function (e) {var t = e.detail.code;return -1301 == t || -1302 == t || -1303 == t || -1304 == t || -1305 == t || -1306 == t || -1307 == t || -1308 == t || -1309 == t || -1310 == t || -1311 == t;}, e.prototype.updateEvent = function (e) {this.logger.info(o.ZEGO_WECHATMINI_ACTION.PLAYWECHAT_UPDATE_EVENT + " " + this.streamId + " state code: " + JSON.stringify(e.detail.code)), 0 == this.playerType ? (this.playBegin || (this.playBegin = !0, s.ClientUtil.actionSuccessCallback("kZegoTaskPlayStart" + this.streamId, this.stateCenter.reportList) && s.ClientUtil.actionSuccessCallback("kZegoTaskPlayStart" + this.streamId, this.stateCenter.reportList)(i.REPORT_ACTION.eventStart, "play_begin")), 2004 == e.detail.code ? (this.everSuccess ? this.dataReport.eventEnd(this.playerReportSeq, "PlayRetry") : (this.everSuccess = !0, this.dataReport.eventStart(this.playerReportSeq, "PlayStat"), s.ClientUtil.actionSuccessCallback("kZegoTaskPlayStart" + this.streamId, this.stateCenter.reportList) && (s.ClientUtil.actionSuccessCallback("kZegoTaskPlayStart" + this.streamId, this.stateCenter.reportList)(i.REPORT_ACTION.addEventMsg, "play_begin", "try_urls", this.tryUrls), s.ClientUtil.actionSuccessCallback("kZegoTaskPlayStart" + this.streamId, this.stateCenter.reportList)(i.REPORT_ACTION.eventEnd, "play_begin"), s.ClientUtil.actionSuccessCallback("kZegoTaskPlayStart" + this.streamId, this.stateCenter.reportList)(i.REPORT_ACTION.eventStart, "play_state"))), this.logger.info(o.ZEGO_WECHATMINI_ACTION.PLAYWECHAT_UPDATE_EVENT + " play suc: " + this.streamId), this.state = i.ENUM_PLAYER_STATE.playing, this.streamCenter.onPlayerStart(this.streamId, this.playerType)) : 2009 == e.detail.code || this.shouldRetryPlay(e) || this.isPlayFailed(e) && (this.logger.info(o.ZEGO_WECHATMINI_ACTION.PLAYWECHAT_UPDATE_EVENT + " play error: " + this.streamId), this.resetPlayer(), e.detail.code, s.ClientUtil.actionSuccessCallback("kZegoTaskPlayStart" + this.streamId, this.stateCenter.reportList) && (s.ClientUtil.actionSuccessCallback("kZegoTaskPlayStart" + this.streamId, this.stateCenter.reportList)(i.REPORT_ACTION.addEventMsg, "play_begin", "error_code", e.detail.code), s.ClientUtil.actionSuccessCallback("kZegoTaskPlayStart" + this.streamId, this.stateCenter.reportList)(i.REPORT_ACTION.addEventMsg, "play_begin", "try_urls", this.tryUrls), s.ClientUtil.actionSuccessCallback("kZegoTaskPlayStart" + this.streamId, this.stateCenter.reportList)(i.REPORT_ACTION.eventEnd, "play_begin"), s.ClientUtil.actionSuccessCallback("kZegoTaskPlayStart" + this.streamId, this.stateCenter.reportList)(i.REPORT_ACTION.addMsgInfo, void 0, {})), this.playBegin = !1, this.streamCenter.onPlayerStop(this.streamId, this.playerType, { code: e.detail.code, msg: "play fail" })), this.everSuccess || this.dataReport.eventEnd(this.playerReportSeq, "PlayBegin")) : 1 == this.playerType && (this.pushBegin || (this.pushBegin = !0, s.ClientUtil.actionSuccessCallback("kZegoTaskPublishStart" + this.streamId, this.stateCenter.reportList) && s.ClientUtil.actionSuccessCallback("kZegoTaskPublishStart" + this.streamId, this.stateCenter.reportList)(i.REPORT_ACTION.eventStart, "push_begin")), 1002 == e.detail.code ? this.handlePublisherSuccess() : this.shouldRetryPublish(e) || this.isPublishFailed(e) && (this.logger.info(o.ZEGO_WECHATMINI_ACTION.PLAYWECHAT_UPDATE_EVENT + " publish error: " + this.streamId), this.resetPlayer(), s.ClientUtil.actionSuccessCallback("kZegoTaskPublishStart" + this.streamId, this.stateCenter.reportList) && (s.ClientUtil.actionSuccessCallback("kZegoTaskPublishStart" + this.streamId, this.stateCenter.reportList)(i.REPORT_ACTION.addEventMsg, "push_begin", "error_code", e.detail.code), s.ClientUtil.actionSuccessCallback("kZegoTaskPublishStart" + this.streamId, this.stateCenter.reportList)(i.REPORT_ACTION.addEventMsg, "push_begin", "try_urls", this.tryUrls), s.ClientUtil.actionSuccessCallback("kZegoTaskPublishStart" + this.streamId, this.stateCenter.reportList)(i.REPORT_ACTION.eventEnd, "push_begin"), s.ClientUtil.actionSuccessCallback("kZegoTaskPublishStart" + this.streamId, this.stateCenter.reportList)(i.REPORT_ACTION.addMsgInfo, void 0, {})), this.pushBegin = !1, this.streamCenter.onPlayerStop(this.streamId, this.playerType, { code: e.detail.code, msg: "publish fail" })), this.everSuccess || this.dataReport.eventEnd(this.playerReportSeq, "PublishBegin"));}, e.prototype.updatePlayerNetStatus = function (e) {var t = { videoBitrate: e.detail.info.videoBitrate, audioBitrate: e.detail.info.audioBitrate, videoFPS: e.detail.info.videoFPS, videoHeight: e.detail.info.videoHeight, videoWidth: e.detail.info.videoWidth, videoGOP: e.detail.info.videoGOP, netSpeed: e.detail.info.netSpeed, netJitter: e.detail.info.netJitter };if (this.playerInfo = t, 1 == this.playerType) {this.everSuccess || "8.0.16" == wx.getSystemInfoSync().version && this.handlePublisherSuccess();var r = { videoBitrate: e.detail.info.videoBitrate, audioBitrate: e.detail.info.audioBitrate, videoFPS: e.detail.info.videoFPS, videoGOP: e.detail.info.videoGOP, netSpeed: e.detail.info.netSpeed, netJitter: e.detail.info.netJitter, videoWidth: e.detail.info.videoWidth, videoHeight: e.detail.info.videoHeight };0 == this.publishQualitySeq && (this.publishQualitySeq = i.getReportSeq(), this.dataReport.newReport(this.publishQualitySeq), this.dataReport.addMsgInfo(this.publishQualitySeq, { stream_id: this.streamId })), this.dataReport.addEvent(this.publishQualitySeq, "PublishQuality", r), this.publishQualityCount += 1, this.publishQualityCount >= this.publishQulaityMaxCount && new Date().getTime() - this.playerLogUploadTime > 45e3 && (this.reportQualityStatics(), this.playerLogUploadTime = new Date().getTime());} else 0 == this.playerType && (r = { videoBitrate: e.detail.info.videoBitrate, audioBitrate: e.detail.info.audioBitrate, videoFPS: e.detail.info.videoFPS, videoGOP: e.detail.info.videoGOP, netSpeed: e.detail.info.netSpeed, netJitter: e.detail.info.netJitter, videoWidth: e.detail.info.videoWidth, videoHeight: e.detail.info.videoHeight }, 0 == this.playQualitySeq && (this.playQualitySeq = i.getReportSeq(), this.dataReport.newReport(this.playQualitySeq), this.dataReport.addMsgInfo(this.playQualitySeq, { stream_id: this.streamId })), this.dataReport.addEvent(this.playQualitySeq, "PlayQuality", r), this.playQualityCount += 1, this.playQualityCount >= this.playQulaityMaxCount && new Date().getTime() - this.playerLogUploadTime > 45e3 && (this.reportPlayQualityStatics(), this.playerLogUploadTime = new Date().getTime()));this.streamCenter.onPlayerQuality(this.streamId, t, this.playerType);}, e.prototype.getCurrentPlayerUrl = function () {return this.urls[this.playUrlIndex % this.urls.length];}, e.prototype.reportQualityStatics = function () {this.dataReport.addMsgInfo(this.publishQualitySeq, { itemtype: "WXPublishStateUpdate" }), this.dataReport.uploadReport(this.publishQualitySeq, n.ZegoWechatLogEvent.kZegoEventPublishStat), this.publishQualityCount = 0, this.publishQualitySeq = 0;}, e.prototype.reportPlayQualityStatics = function () {this.dataReport.addMsgInfo(this.playQualitySeq, { itemtype: "WXPlayStateUpdate" }), this.dataReport.uploadReport(this.playQualitySeq, n.ZegoWechatLogEvent.kZegoEventPlayStat), this.playQualityCount = 0, this.playQualitySeq = 0;}, e.prototype.handlePublisherSuccess = function () {this.everSuccess ? this.dataReport.eventEnd(this.playerReportSeq, "PublishRetry") : (this.everSuccess = !0, this.dataReport.eventStart(this.playerReportSeq, "PublishStat"), s.ClientUtil.actionSuccessCallback("kZegoTaskPublishStart" + this.streamId, this.stateCenter.reportList) && (s.ClientUtil.actionSuccessCallback("kZegoTaskPublishStart" + this.streamId, this.stateCenter.reportList)(i.REPORT_ACTION.addEventMsg, "push_begin", "try_urls", this.tryUrls), s.ClientUtil.actionSuccessCallback("kZegoTaskPublishStart" + this.streamId, this.stateCenter.reportList)(i.REPORT_ACTION.eventEnd, "push_begin"), this.stateCenter.publishStreamList[this.streamId] && this.stateCenter.publishStreamList[this.streamId].state == i.ENUM_PUBLISH_STREAM_STATE.tryPublish && s.ClientUtil.actionSuccessCallback("kZegoTaskPublishStart" + this.streamId, this.stateCenter.reportList)(i.REPORT_ACTION.eventStart, "publish_state"))), this.logger.info(o.ZEGO_WECHATMINI_ACTION.PLAYWECHAT_UPDATE_EVENT + " play suc: " + this.streamId), this.state = i.ENUM_PLAYER_STATE.playing, this.streamCenter.onPlayerStart(this.streamId, this.playerType);}, e;}();t.ZegoPlayWechat = a;}, 300: function _(e, t, r) {"use strict";var _o4,s = this && this.__extends || (_o4 = function o(e, t) {return _o4 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (e, t) {e.__proto__ = t;} || function (e, t) {for (var r in t) {Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);}}, _o4(e, t);}, function (e, t) {function r() {this.constructor = e;}_o4(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r());});Object.defineProperty(t, "__esModule", { value: !0 }), t.ZegoStreamCenterWechat = void 0;var i = r(89),n = r(740),a = r(706),l = r(529),u = r(608),_ = r(938),d = function (e) {function t(t, r, o) {var s = e.call(this) || this;return s.playerList = {}, s.publisherList = {}, s.playerCount = 0, s.playingList = [], s.publishingList = [], s.eventSeq = 0, s.streamEventMap = {}, s.streamReportMap = {}, s.livePlayerList = [], s.playerContextMap = {}, s.publishSuccessCallBackList = {}, s.publishErrorCallBackList = {}, s.playSuccessCallBackList = {}, s.playErrorCallBackList = {}, s.logger = t, s.dataReport = o, s.stateCenter = r, s;}return s(t, e), t.prototype.updatePlayingState = function (e, t, r) {if (this.logger.info(i.ZEGO_WECHATMINI_ACTION.STREAMCENTERWECHAT_UPDATE_PLAYING_STATE + " " + e), null == e) return !1;if (r) {var o = this.playerList[e],s = this.stateCenter.reportSeqList.startPlay[e];if (this.dataReport.eventStart(s, "updatePlayingState"), o) return this.logger.error(i.ZEGO_WECHATMINI_ACTION.STREAMCENTERWECHAT_UPDATE_PLAYING_STATE + " player already exist"), this.dataReport.eventEndWithMsgInfo(s, "updatePlayingState", { message: "player already exist" }), this.dataReport.uploadReport(s, void 0), delete this.stateCenter.reportSeqList.startPlay[e], !1;var n = this.stateCenter.getPlayRoom(e) || this.stateCenter.roomList[0];if (!n) return this.logger.error(i.ZEGO_WECHATMINI_ACTION.STREAMCENTERWECHAT_UPDATE_PLAYING_STATE + " room no found"), !1;this.playerList[e] = new _.ZegoPlayWechat(this.logger, e, this, this.dataReport, this.stateCenter, n);}return this.updateStreamState(e, r, t, this.playingList), r ? (this.streamEventMap[e] = this.stateCenter.reportSeqList.startPlay[e], this.eventSeq += 1, this.streamReportMap[e] = this.eventSeq, this.dataReport.newReport(this.eventSeq), this.dataReport.eventStart(this.eventSeq, "GotPlayInfo")) : this.reportPlayEvent(e), !0;}, t.prototype.updatePublishingState = function (e, t, r, o) {if (void 0 === r && (r = ""), void 0 === o && (o = !1), this.logger.info(i.ZEGO_WECHATMINI_ACTION.STREAMCENTERWECHAT_UPDATE_PUBLISHING_STATE + " " + t), null == t) return !1;if (o) {var s = this.publisherList[t],n = this.stateCenter.reportSeqList.startPublish[t];if (this.dataReport.eventStart(n, "updatePublishingState"), s) return this.logger.error(i.ZEGO_WECHATMINI_ACTION.STREAMCENTERWECHAT_UPDATE_PUBLISHING_STATE + " player already exist"), this.dataReport.eventEndWithMsgInfo(n, "updatePublishingState", { message: "player already exist" }), this.dataReport.uploadReport(n, void 0), delete this.stateCenter.reportSeqList.startPublish[t], !1;this.publisherList[t] = new _.ZegoPlayWechat(this.logger, t, this, this.dataReport, this.stateCenter, e);}return this.updateStreamState(t, o, r, this.publishingList), o ? (this.streamEventMap[t] = this.stateCenter.reportSeqList.startPublish[t], this.eventSeq += 1, this.streamReportMap[t] = this.eventSeq, this.dataReport.newReport(this.eventSeq), this.dataReport.eventStart(this.eventSeq, "GotPublishInfo")) : this.reportPublishEvent(t), !0;}, t.prototype.updateAudioVolumeNotify = function (e, t) {var r, o;this.logger.info(i.ZEGO_WECHATMINI_ACTION.WECHATMINI_UPDATE_PLAYER_VOLUME_NOTIFY + " " + e), null != e && null != (null === (r = null == t ? void 0 : t.detail) || void 0 === r ? void 0 : r.volume) && this.logger.info(i.ZEGO_WECHATMINI_ACTION.WECHATMINI_UPDATE_PLAYER_VOLUME_NOTIFY + " " + e + " volume: " + (null === (o = null == t ? void 0 : t.detail) || void 0 === o ? void 0 : o.volume));}, t.prototype.updateStreamState = function (e, t, r, o) {if (e) if (r && "string" == typeof r || (r = ""), 1 == t) o.push({ streamID: e, params: r });else for (var s = 0; s < o.length; s++) {if (o[s].streamID == e) {o.splice(s--, 1);break;}}}, t.prototype.isPlaying = function () {return 0 != this.playingList.length;}, t.prototype.isPublishing = function () {return 0 != this.publishingList.length;}, t.prototype.startPlayingStream = function (e, t, r) {if (this.logger.info(i.ZEGO_WECHATMINI_ACTION.STREAMCENTERWECHAT_START_PLAYING_STREAM + " call " + e), this.streamEventMap[e]) {var o = "";0 == r ? o = "cdn" : 1 == r && (o = "ultra_src"), u.ClientUtil.actionLogReportCallback("kZegoTaskPlayStart" + e, this.stateCenter.reportList, a.REPORT_ACTION.addEventMsg, "get_play_url", ["type", o]), u.ClientUtil.actionLogReportCallback("kZegoTaskPlayStart" + e, this.stateCenter.reportList, a.REPORT_ACTION.addEventMsg, "get_play_url", ["urls", t]);}var s = this.streamReportMap[e];return s && this.dataReport.eventEndWithMsg(s, "GotPlayInfo", { type: 0 == r ? "cdn" : "ultra_src", urls: t }), this.startPlayer(e, t, r, 0);}, t.prototype.startPlayer = function (e, t, r, o) {var s = this.playerList[e];if (1 == o && (s = this.publisherList[e]), !s) return this.logger.error(i.ZEGO_WECHATMINI_ACTION.STREAMCENTERWECHAT_START_PLAYER + " player don't exist"), !1;var n = [];0 == o ? n = this.playingList : 1 == o && (n = this.publishingList);for (var a = !1, l = "", u = 0; u < n.length; u++) {if (n[u].streamID == e) {a = !0, l = n[u].params;break;}}if (!a) return this.logger.warn(i.ZEGO_WECHATMINI_ACTION.STREAMCENTERWECHAT_START_PLAYER + " should not start"), !1;if (s.urls = t, s.params = l, s.reconnectLimit = this.getReconnectLimit(r), s.dispatchType = r, s.playerType = o, s.playerSeq = this.streamEventMap[e], s.playerReportSeq = this.streamReportMap[e], !s) return this.logger.info(i.ZEGO_WECHATMINI_ACTION.STREAMCENTERWECHAT_START_PLAYER + " new player failed"), !1;++this.playerCount;var _ = s.tryStartPlayer(0);return this.logger.info(i.ZEGO_WECHATMINI_ACTION.STREAMCENTERWECHAT_START_PLAYER + " call result: " + _), !0;}, t.prototype.getNextUrl = function (e) {this.logger.info(i.ZEGO_WECHATMINI_ACTION.STREAMCENTERWECHAT_GET_NEXT_URL + " call " + e);var t,r = this.publisherList[e] || this.playerList[e];if (!r) return this.logger.error(i.ZEGO_WECHATMINI_ACTION.STREAMCENTERWECHAT_GET_NEXT_URL + " player don't exist"), "";this.publishingList.find(function (t) {return t.streamID === e;}) ? (t = !0, this.onPublishStateUpdate(a.ENUM_PUBLISH_STATE_UPDATE.retry, e, { code: 0, message: "" })) : (t = !1, this.onPlayStateUpdate(2, e, { code: 0, message: "" }));var o = r.getPlayerUrl();if (t) {if (!this.stateCenter.reportSeqList.startPublish[e]) {var s = a.getReportSeq();this.stateCenter.reportSeqList.startPublish[e] = s, this.dataReport.newReport(s, l.ZegoWechatLogEvent.kZegoTaskRePublish), r.pushBegin = !1, u.ClientUtil.logReportCallback("kZegoTaskPublishStart" + e, this.dataReport, s, this.stateCenter.reportList);}} else this.stateCenter.reportSeqList.startPlay[e] || (s = a.getReportSeq(), this.stateCenter.reportSeqList.startPlay[e] = s, this.dataReport.newReport(s, l.ZegoWechatLogEvent.kZegoTaskRePlay), r.playBegin = !1, u.ClientUtil.logReportCallback("kZegoTaskPlayStart" + e, this.dataReport, s, this.stateCenter.reportList));return o;}, t.prototype.stopPlayingStream = function (e) {this.logger.info(i.ZEGO_WECHATMINI_ACTION.STREAMCENTERWECHAT_STOP_PLAYING_STREAM + " call " + e), null != e && (this.stopPlayer(e), delete this.streamEventMap[e], delete this.streamReportMap[e], this.updatePlayingState(e));}, t.prototype.stopPlayer = function (e) {this.logger.info(i.ZEGO_WECHATMINI_ACTION.STREAMCENTERWECHAT_STOP_PLAYER + " call " + e);var t = this.playerList[e],r = this.publisherList[e];t || r ? (t && (t.stopPlayer(), delete this.playerList[e]), r && (r.stopPlayer(), delete this.publisherList[e]), --this.playerCount) : this.logger.info(i.ZEGO_WECHATMINI_ACTION.STREAMCENTERWECHAT_STOP_PLAYER + " play not exist " + e), this.logger.info(i.ZEGO_WECHATMINI_ACTION.STREAMCENTERWECHAT_STOP_PLAYER + " call success");}, t.prototype.startPublishingStream = function (e, t, r) {if (this.logger.info(i.ZEGO_WECHATMINI_ACTION.STREAMCENTERWECHAT_START_PUBLISHING_STREAM + " call " + e), this.streamEventMap[e]) {var o = "";0 == r ? o = "cdn" : 1 == r && (o = "ultra_src"), u.ClientUtil.actionLogReportCallback("kZegoTaskPublishStart" + e, this.stateCenter.reportList, a.REPORT_ACTION.addEventMsg, "type", o), u.ClientUtil.actionLogReportCallback("kZegoTaskPublishStart" + e, this.stateCenter.reportList, a.REPORT_ACTION.addEventMsg, "urls", t);}var s = this.streamReportMap[e];return s && this.dataReport.eventEndWithMsg(s, "GotPublishInfo", { type: 0 == r ? "cdn" : "ultra_src", urls: t }), this.startPlayer(e, t, r, 1);}, t.prototype.stopPublishingStream = function (e) {if (this.logger.info(i.ZEGO_WECHATMINI_ACTION.STREAMCENTERWECHAT_STOP_PUBLISHING_STREAM + " call " + e), null != e) {var t = this.publisherList[e].room;this.stopPlayer(e), delete this.streamEventMap[e], delete this.streamReportMap[e], this.updatePublishingState(t, e, "", !1);}}, t.prototype.updatePlayerState = function (e, t) {var r = this.playerList[e],o = this.publisherList[e];r || o ? (r && r.updateEvent(t), o && o.updateEvent(t)) : this.logger.error(i.ZEGO_WECHATMINI_ACTION.STREAMCENTERWECHAT_UPDATE_PLAYER_STATE + " no player " + e), this.logger.info(i.ZEGO_WECHATMINI_ACTION.STREAMCENTERWECHAT_UPDATE_PLAYER_STATE + " updatePlayerEvent success");}, t.prototype.updatePlayerNetStatus = function (e, t) {var r = this.playerList[e],o = this.publisherList[e];r || o ? (r && r.updatePlayerNetStatus(t), o && o.updatePlayerNetStatus(t)) : this.logger.error(i.ZEGO_WECHATMINI_ACTION.STREAMCENTERWECHAT_UPDATE_PLAYER_NET_STATUS + " no player " + e), this.logger.info(i.ZEGO_WECHATMINI_ACTION.STREAMCENTERWECHAT_UPDATE_PLAYER_NET_STATUS + " updatePlayerNetStatus success");}, t.prototype.reset = function (e) {var t, r;for (var o in this.logger.info(i.ZEGO_WECHATMINI_ACTION.STREAMCENTERWECHAT_RESET + " call"), this.publisherList) {(this.publisherList[o].room.roomID == e || !e) && this.stopPublishingStream(o), this.pusherInstance && this.pusherInstance.stop();}this.pusherInstance = void 0;var s = function s(o) {var s = n.playerList[o].room;if (s.roomID != e || !s.streamList.find(function (e) {return e.stream_id == o;}) && 1 != n.stateCenter.roomList.length) {if (s.roomID == e && n.stateCenter.roomList.length > 1) {var i = n.stateCenter.roomList.find(function (t) {return t.roomID !== e;});i ? n.playerList[o].room = i : (null === (r = n.livePlayerList.find(function (e) {return e.attributes.id == o;})) || void 0 === r || r.stop(), n.stopPlayingStream(o));}} else null === (t = n.livePlayerList.find(function (e) {return e.attributes.id == o;})) || void 0 === t || t.stop(), n.stopPlayingStream(o);},n = this;for (var a in this.playerList) {s(a);}this.livePlayerList = [], this.playerContextMap = {}, this.logger.info(i.ZEGO_WECHATMINI_ACTION.STREAMCENTERWECHAT_RESET + " call success");}, t.prototype.reportPublishEvent = function (e, t) {if (this.streamReportMap[e]) {var r = this.streamReportMap[e];this.dataReport.addMsgExt(r, { stream: e, error: t }), this.dataReport.addMsgInfo(r, { itemtype: "WXPublishStream" }), this.dataReport.uploadReport(r, "WXPublishStream"), delete this.streamReportMap[e];}}, t.prototype.reportPlayEvent = function (e, t) {if (this.streamReportMap[e]) {var r = this.streamReportMap[e];this.dataReport.addMsgExt(r, { stream: e, error: t }), this.dataReport.addMsgInfo(r, { itemtype: "WXPlayStream" }), this.dataReport.uploadReport(r, "WXPlayStream"), delete this.streamReportMap[e];}}, t.prototype.onPlayStateUpdate = function (e, t, r) {}, t.prototype.onPlayQualityUpdate = function (e, t) {}, t.prototype.onPublishStateUpdate = function (e, t, r) {}, t.prototype.onPublishQualityUpdate = function (e, t) {}, t.prototype.onPublisherStreamUrlUpdate = function (e, t) {}, t.prototype.onPublisherStreamUrlFail = function (e, t) {}, t.prototype.onPlayerStreamUrlUpdate = function (e, t) {}, t.prototype.getReconnectLimit = function (e) {return 1;}, t.prototype.onPlayerStart = function (e, t) {this.logger.info(i.ZEGO_WECHATMINI_ACTION.STREAMCENTERWECHAT_ON_PLAY_START + " call " + e), 0 == t ? this.onPlayStateUpdate(0, e, { code: 0, message: "" }) : 1 == t && this.onPublishStateUpdate(0, e, { code: 0, message: "" });}, t.prototype.onPlayerStop = function (e, t, r) {this.logger.info(i.ZEGO_WECHATMINI_ACTION.STREAMCENTERWECHAT_ON_PLAY_STOP + " call " + e), 0 == t ? (this.reportPlayEvent(e, r), this.logger.warn(i.ZEGO_WECHATMINI_ACTION.STREAMCENTERWECHAT_ON_PLAY_STOP + " play error"), this.onPlayStateUpdate(1, e, r)) : 1 == t && (this.reportPublishEvent(e, r), this.logger.warn(i.ZEGO_WECHATMINI_ACTION.STREAMCENTERWECHAT_ON_PLAY_STOP + " publish error"), this.onPublishStateUpdate(1, e, r));}, t.prototype.onPlayerRetry = function (e, t) {this.logger.info(i.ZEGO_WECHATMINI_ACTION.STREAMCENTERWECHAT_ON_PLAY_RETRY + " call " + e), 0 == t ? this.onPlayStateUpdate(2, e, { code: 0, message: "" }) : 1 == t && this.onPublishStateUpdate(2, e, { code: 0, message: "" });}, t.prototype.onPlayerQuality = function (e, t, r) {var o = { video: { videoBitrate: t.videoBitrate, videoFPS: t.videoFPS, videoWidth: t.videoWidth, videoHeight: t.videoHeight }, audio: { audioBitrate: t.audioBitrate } };0 == r ? this.onPlayQualityUpdate(e, o) : 1 == r && this.onPublishQualityUpdate(e, o);}, t.prototype.onStreamUrlUpdate = function (e, t, r) {this.logger.info(i.ZEGO_WECHATMINI_ACTION.STREAMCENTERWECHAT_ON_STREAM_URL_UPDATE + " call " + e), 0 == r ? this.playSuccessCallBackList[e](e, t) : this.publishSuccessCallBackList[e](e, t);}, t.prototype.getTotalStreamId = function (e) {return e;}, t.prototype.getRealStreamId = function (e) {return e;}, t.prototype.getRoomByStreamID = function (e) {return this.publisherList[e] ? this.publisherList[e].room : this.playerList[e] ? this.playerList[e].room : void 0;}, t;}(n.ZegoStreamCenter);t.ZegoStreamCenterWechat = d;}, 194: function _(e) {"undefined" != typeof self && self, e.exports = function (e) {var t = {};function r(o) {if (t[o]) return t[o].exports;var s = t[o] = { i: o, l: !1, exports: {} };return e[o].call(s.exports, s, s.exports, r), s.l = !0, s.exports;}return r.m = e, r.c = t, r.d = function (e, t, o) {r.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: o });}, r.r = function (e) {"undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 });}, r.t = function (e, t) {if (1 & t && (e = r(e)), 8 & t) return e;if (4 & t && "object" == typeof e && e && e.__esModule) return e;var o = Object.create(null);if (r.r(o), Object.defineProperty(o, "default", { enumerable: !0, value: e }), 2 & t && "string" != typeof e) for (var s in e) {r.d(o, s, function (t) {return e[t];}.bind(null, s));}return o;}, r.n = function (e) {var t = e && e.__esModule ? function () {return e.default;} : function () {return e;};return r.d(t, "a", t), t;}, r.o = function (e, t) {return Object.prototype.hasOwnProperty.call(e, t);}, r.p = "", r(r.s = 12);}([function (e, t, r) {"use strict";var o;Object.defineProperty(t, "__esModule", { value: !0 }), t.createZegoWebSocket = t.LoggerStateCenter = t.ZegoDataReport = t.ZegoLogger = t.LinkedList = t.ListNode = t.getReportSeq = t.getSeq = t.REPORT_ACTION = t.E_CLIENT_TYPE = t.ENUM_PUSH_SIGNAL_SUB_CMD = t.ENUM_SIGNAL_SUB_CMD = t.SERVER_ERROR_CODE = t.ENUM_STREAM_UPDATE_CMD = t.MINIUM_HEARTBEAT_INTERVAL = t.ENUM_NETWORK_STATE = t.ENUM_RUN_STATE = t.MAX_TRANS_DATA_LENGTH = t.MAX_TRANS_TYPE_LENGTH = t.MAX_MIX_TASK_ID_LENGTH = t.MAX_MESSAGE_LENGTH = t.MAX_ROOM_ID_LENGTH = t.MAX_USER_NAME_LENGTH = t.MAX_USER_ID_LENGTH = t.MAX_STREAM_ID_LENGTH = t.MAX_TRY_HEARTBEAT_COUNT = t.SEND_MSG_TIMEOUT = t.SEND_MSG_RESET = t.MAX_TRY_CONNECT_COUNT = t.ENUM_CONNECT_STATE = t.ENUM_SCREEM_RESOLUTION_TYPE = t.ENUM_RESOLUTION_TYPE = t.ENUM_SIGNAL_STATE = t.ERROR_CODES = t.ENUM_REMOTE_TYPE = t.LOG_LEVEL = t.ENUM_LOG_LEVEL = t.ROOMVERSION = t.PROTO_VERSION = void 0, t.PROTO_VERSION = "1.8.2", t.ROOMVERSION = "V1", function (e) {e[e.debug = 0] = "debug", e[e.info = 1] = "info", e[e.warn = 2] = "warn", e[e.error = 3] = "error", e[e.report = 99] = "report", e[e.disable = 100] = "disable";}(t.ENUM_LOG_LEVEL || (t.ENUM_LOG_LEVEL = {})), t.LOG_LEVEL = { debug: 0, info: 1, warn: 2, error: 3, report: 99, disable: 100 }, function (e) {e[e.disable = 0] = "disable", e[e.websocket = 1] = "websocket", e[e.https = 2] = "https";}(t.ENUM_REMOTE_TYPE || (t.ENUM_REMOTE_TYPE = {})), t.ERROR_CODES = { ROOM_SESSION_ID_ERR: 1000000152, FETCH_TRANS_UNKNOWN_CHANNEL: 1000001108, FETCH_TRANS_UNKNOWN_TYPE: 1000001109, FETCH_TRANS_WRONG_SEQ: 1000001110 }, function (e) {e[e.disconnected = 0] = "disconnected", e[e.connecting = 1] = "connecting", e[e.connected = 2] = "connected";}(t.ENUM_SIGNAL_STATE || (t.ENUM_SIGNAL_STATE = {})), t.ENUM_RESOLUTION_TYPE = { LOW: { width: 320, height: 240, frameRate: 15, bitRate: 300 }, MEDIUM: { width: 640, height: 480, frameRate: 15, bitRate: 800 }, HIGH: { width: 1280, height: 720, frameRate: 20, bitRate: 1500 } }, t.ENUM_SCREEM_RESOLUTION_TYPE = { LOW: { frameRate: 20, bitRate: 800 }, MEDIUM: { frameRate: 15, bitRate: 1200 }, HIGH: { frameRate: 5, bitRate: 2e3 } }, t.ENUM_CONNECT_STATE = { disconnect: 0, connecting: 1, connected: 2 }, t.MAX_TRY_CONNECT_COUNT = 1, t.SEND_MSG_RESET = 2, t.SEND_MSG_TIMEOUT = 1, t.MAX_TRY_HEARTBEAT_COUNT = 5, t.MAX_STREAM_ID_LENGTH = 256, t.MAX_USER_ID_LENGTH = 64, t.MAX_USER_NAME_LENGTH = 256, t.MAX_ROOM_ID_LENGTH = 128, t.MAX_MESSAGE_LENGTH = 1024, t.MAX_MIX_TASK_ID_LENGTH = 256, t.MAX_TRANS_TYPE_LENGTH = 128, t.MAX_TRANS_DATA_LENGTH = 4096, function (e) {e[e.logout = 0] = "logout", e[e.trylogin = 1] = "trylogin", e[e.login = 2] = "login";}(t.ENUM_RUN_STATE || (t.ENUM_RUN_STATE = {})), function (e) {e[e.offline = 0] = "offline", e[e.online = 1] = "online";}(t.ENUM_NETWORK_STATE || (t.ENUM_NETWORK_STATE = {})), t.MINIUM_HEARTBEAT_INTERVAL = 3e3, t.ENUM_STREAM_UPDATE_CMD = { added: 12001, deleted: 12002, updated: 12003 }, t.SERVER_ERROR_CODE = 1e4, t.ENUM_SIGNAL_SUB_CMD = { none: 0, joinLiveRequest: 1001, joinLiveResult: 1002, joinLiveInvite: 1003, joinLiveStop: 1004 }, t.ENUM_PUSH_SIGNAL_SUB_CMD = { none: 0, pushJoinLiveRequest: 11001, pushJoinLiveResult: 11002, pushJoinLiveInvite: 11003, pushJoinLiveStop: 11004 }, function (e) {e[e.ClientType_None = 0] = "ClientType_None", e[e.ClientType_H5 = 1] = "ClientType_H5", e[e.ClientType_SmallProgram = 2] = "ClientType_SmallProgram", e[e.ClientType_Webrtc = 3] = "ClientType_Webrtc";}(t.E_CLIENT_TYPE || (t.E_CLIENT_TYPE = {})), t.REPORT_ACTION = { eventStart: "eventStart", eventEndWithMsgInfo: "eventEndWithMsgInfo", addEventMsg: "addEventMsg", addEvent: "addEvent", eventEnd: "eventEnd", addMsgInfo: "addMsgInfo" }, t.getSeq = (o = 1, function () {return o++;}), t.getReportSeq = function () {var e = 1;return function () {return e++;};}();var s = function () {function e(e, t) {void 0 === e && (e = null), void 0 === t && (t = null), this.next = null, this.prev = null, this._id = e, this._data = t;}return Object.defineProperty(e.prototype, "id", { get: function get() {return this._id ? this._id : null;}, set: function set(e) {this._id = e;}, enumerable: !1, configurable: !0 }), Object.defineProperty(e.prototype, "data", { get: function get() {return this._data;}, set: function set(e) {this._data = e;}, enumerable: !1, configurable: !0 }), e.prototype.hasNext = function () {return this.next && this.next.id;}, e.prototype.hasPrev = function () {return this.prev && this.prev.id;}, e;}();t.ListNode = s;var i = function () {function e() {this.start = new s(), this.end = new s(), this._idCounter = 0, this._numNodes = 0, this.start.next = this.end, this.start.prev = null, this.end.prev = this.start, this.end.next = null;}return e.prototype.insertBefore = function (e, t) {var r = new s(this._idCounter, t);return r.next = e, r.prev = e.prev, e.prev && (e.prev.next = r), e.prev = r, ++this._idCounter, ++this._numNodes, r;}, e.prototype.addLast = function (e) {return this.insertBefore(this.end, e);}, e.prototype.add = function (e) {return this.addLast(e);}, e.prototype.getFirst = function () {return 0 === this._numNodes ? null : this.start.next;}, e.prototype.getLast = function () {return 0 === this._numNodes ? null : this.end.prev;}, e.prototype.size = function () {return this._numNodes;}, e.prototype.getFromFirst = function (e) {var t = 0,r = this.start.next;if (e >= 0) for (; t < e && null !== r;) {r = r.next, ++t;} else r = null;if (null === r) throw "Index out of bounds.";return r;}, e.prototype.get = function (e) {return 0 === e ? this.getFirst() : e === this._numNodes - 1 ? this.getLast() : this.getFromFirst(e);}, e.prototype.remove = function (e) {return e.prev && (e.prev.next = e.next), e.next && (e.next.prev = e.prev), --this._numNodes, e;}, e.prototype.removeFirst = function () {var e = null;return this._numNodes > 0 && this.start.next && (e = this.remove(this.start.next)), e;}, e.prototype.removeLast = function () {var e = null;return this._numNodes > 0 && this.end.prev && (e = this.remove(this.end.prev)), e;}, e.prototype.removeAll = function () {this.start.next = this.end, this.end.prev = this.start, this._numNodes = 0, this._idCounter = 0;}, e.prototype.each = function (e) {for (var t = this.start; t.hasNext();) {e(t = t.next);}}, e.prototype.find = function (e) {for (var t = this.start, r = !1, o = null; t.hasNext() && !r;) {e(t = t.next) && (o = t, r = !0);}return o;}, e.prototype.map = function (e) {for (var t = this.start, r = []; t.hasNext();) {e(t = t.next) && r.push(t);}return r;}, e.prototype.push = function (e) {return this.addLast(e);}, e.prototype.unshift = function (e) {this._numNodes > 0 ? this.insertBefore(this.start.next, e) : this.insertBefore(this.end, e);}, e.prototype.pop = function () {return this.removeLast();}, e.prototype.shift = function () {return this.removeFirst();}, e;}();t.LinkedList = i;var n = r(14);Object.defineProperty(t, "ZegoLogger", { enumerable: !0, get: function get() {return n.ZegoLogger;} }), Object.defineProperty(t, "ZegoDataReport", { enumerable: !0, get: function get() {return n.ZegoDataReport;} }), Object.defineProperty(t, "LoggerStateCenter", { enumerable: !0, get: function get() {return n.LoggerStateCenter;} }), Object.defineProperty(t, "createZegoWebSocket", { enumerable: !0, get: function get() {return n.createZegoWebSocket;} });}, function (e, t, r) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.errorCodeList = void 0, t.errorCodeList = { SERVER: { code: 0, msg: "liverooom cmd error" }, SUCCESS: { code: 0, msg: "success." }, INIT: { code: 2000000001, msg: "init sdk wrong" }, NOT_LOGIN: { code: 1000002, msg: "not login" }, NETWORK_BROKEN: { code: 1000017, msg: "network is broken" }, INPUT_PARAM: { code: 1100001, msg: "input parm error." }, TIMEOUT: { code: 1100002, msg: "network timeout." }, SOCKET_CLOSE: { code: 1100003, msg: "socket close" }, INIT_SDK_WRONG: { code: 1101e3, msg: "init sdk wrong" }, USER_ID_NULL: { code: 1002005, msg: "user ID is empty" }, USER_ID_INVALID_CHARACTER: { code: 1002006, msg: "user ID contains illegal characters" }, USER_ID_TOO_LONG: { code: 1002007, msg: "user ID is too long" }, USER_NAME_NULL: { code: 1002008, msg: "username is empty" }, USER_NAME_TOO_LONG: { code: 1002010, msg: "username is too long" }, ROOM_ID_NULL: { code: 1002011, msg: "room ID is empty" }, ROOM_ID_INVALID_CHARACTER: { code: 1002012, msg: "room ID contains illegal characters" }, ROOM_ID_TOO_LONG: { code: 1002013, msg: "room ID is too long" }, ROOM_NOT_EXIST: { code: 1002014, msg: "room not exist" }, LOGIN_TIMEOUT: { code: 1002031, msg: "login timeout" }, ROOM_MAX_USER_COUNT: { code: 1002034, msg: "users logging into the room exceeds the maximum number" }, MULTIPLE_LOGIN_KICKOUT: { code: 1002050, msg: "kickout may be the same user ID login other" }, ROOM_RETRY_TIMEOUT: { code: 1002053, msg: "network is broken and login fail." }, MANUAL_KICKOUT: { code: 1002055, msg: "server has sent a signal to kick out" }, REPEATEDLY_LOGIN: { code: 1002056, msg: "user repeatedly login" }, REPEATEDLY_ENTER_ROOM: { code: 1002057, msg: "user repeatedly enter room" }, ALREADY_LOGIN: { code: 1002058, msg: "user already logged in" }, ROOM_INNER_ERROR: { code: 1002099, msg: "room inner error" }, HEARTBEAT_TIMEOUT: { code: 1102001, msg: "heartbeat timeout." }, PARSE_JSON_ERROR: { code: 1102011, msg: "parse json error." }, LOGIN_PROCESSING: { code: 1102012, msg: "login is processing." }, LIVEROMM_REQUEST_ERROR: { code: 1102013, msg: "liveroom request error." }, ZPUSH_REQUEST_FAIL: { code: 1102014, msg: "zpush request fail." }, LOGIN_STATE_WRONG: { code: 1102015, msg: "user login state is wrong." }, TOKEN_ERROR: { code: 1102016, msg: "token error" }, DIAPATCH_ERROR: { code: 1102017, msg: "dispatch error" }, TOKEN_EXPIRED: { code: 1102018, msg: "token expired" }, SUBCMD_ERROR: { code: 1102019, msg: "subcmd error." }, ZEGO_AUTH_ERROR: { code: 1102020, msg: "zego auth error." }, BIZ_CHANNEL_ERROR: { code: 1102021, msg: "biz channel error." }, TRANS_FREQUENTLY: { code: 1102022, msg: "trans send frequently" }, IM_CONTENT_NULL: { code: 1009001, msg: "message content is empty" }, IM_CONTENT_TOO_LONG: { code: 1009002, msg: "message content is too long" }, IM_SEND_FAILED: { code: 1009010, msg: "failed to send message" }, FREQ_LIMITED: { code: 1109001, msg: "frequency limited." } };}, function (e, t, r) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.ZEGO_RTM_ACTION = void 0, function (e) {e.ZEGOEXPRESSWEBRTM_CONSTRUCTOR = "zm.0", e.ZEGOEXPRESSWEBRTM_BIND_WINDOW_LISTENER = "zm.wl", e.ZEGOEXPRESSWEBRTM_SET_LOG_CONFIG = "zm.slf", e.ZEGOEXPRESSWEBRTM_SET_DEBUG_VERBOSE = "zm.sdv", e.ZEGOEXPRESSWEBRTM_LOGIN_ROOM = "zm.lg", e.ZEGOEXPRESSWEBRTM_LOGOUT_ROOM = "zm.lo", e.ZEGOEXPRESSWEBRTM_SEND_CUSTOM = "zm.scc", e.ZEGOEXPRESSWEBRTM_SEND_BCM = "zm.sbcm", e.ZEGOEXPRESSWEBRTM_SEND_RLM = "zm.srlm", e.ZEGOEXPRESSWEBRTM_SEND_BRM = "zm.sbrm", e.ZEGOEXPRESSWEBRTM_SEND_RAM = "zm.sram", e.ZEGOEXPRESSWEBRTM_ON = "zm.on", e.ZEGOEXPRESSWEBRTM_OFF = "zm.off", e.ZEGOEXPRESSWEBRTM_RENEWTOKEN = "zm.rntk", e.ZEGOEXPRESSWEBRTM_RESETTOKENTIMER = "zm.rstt", e.ZEGOEXPRESSWEBRTM_ENABLE_MULTI_ROOM = "zm.emr", e.ZEGOEXPRESSWEBRTM_SEND_PB = "zm.spb", e.ZEGOEXPRESSWEBRTM_GET_HEADER = "zm.gh", e.ROOM_LOGIN_ROOM = "zm.rm.lg", e.ROOM_TRY_LOGIN = "zm.rm.tl", e.ROOM_OPEN_HANDLER = "zm.rm.op", e.ROOM_HANDLE_LOGINRSP = "zm.rm.lgr", e.ROOM_CLOSEHANDLER = "zm.rm.clh", e.ROOM_LOGOUT = "zm.rm.lo", e.ROOM_RESET_ROOM = "zm.rm.rr", e.ROOM_DISCONNECT = "zm.rm.dcn", e.ROOM_KICK_OUT = "zm.rm.kco", e.ROOM_STATUS_CALLBACK = "zm.rm.scb", e.ROOM_RESETTOKEN_TIMER = "zm.rm.rst", e.HEARTBEAT_START = "zm.hb.st", e.HEARTBEAT_HEARTBEAT_RSP = "zm.hb.rsp", e.HEARTBEAT_RESET = "zm.hb.rst", e.SERVICE_PUSH = "zm.sv.ps", e.SERVICE_SEND = "zm.sv.sd", e.USER_LOGIN_RSP = "zm.us.lgr", e.USER_FETCH_USER = "zm.us.ftu", e.USER_FETCH_USER_RSP = "zm.us.urp", e.USER_USER_PUSH = "zm.us.uph", e.USER_MERGE_SEQ = "zm.us.mg", e.USER_MERGE_TIMEOUT = "zm.us.mto", e.USER_MERGE = "zm.us.mg", e.USER_HB_PATCH = "zm.us.pt", e.MESSAGE_SEND_RELIABLE = "zm.msg.sdr", e.MESSAGE_FETCH_RELIABLE = "zm.msg.frm", e.MESSAGE_RELIABLE_RSP = "zm.msg.rlr", e.MESSAGE_RELIABLE_PUSH = "zm.msg.rps", e.MESSAGE_SEND_ROOM_MSG = "zm.msg.srm", e.MESSAGE_SEND_CUSTOM_MSG = "zm.msg.scm", e.MESSAGE_SEND_BIG_MSG = "zm.msg.sbm", e.MESSAGE_BIG_MSG_PUSH = "zm.msg.bps", e.MESSAGE_SEND_RELAY_MSG = "zm.msg.slm", e.LIVE_SEND_SIGNAL = "zm.lv.ssg", e.LIVE_RESPOND_JOIN_LIVE = "zm.lv.rjl", e.LIVE_PUSH_SIGNAL = "zm.lv.pss", e.STATE_ACTION = "zm.st.at", e.ZEGOEXPRESSWEBRTM_LOGIN_HALL = "zm.lh", e.ZEGOEXPRESSWEBRTM_LOGOUT_HALL = "zm.loh", e.ZEGOEXPRESSWEBRTM_SEND_CUSTOM_MESSAGE = "zm.scm";}(t.ZEGO_RTM_ACTION || (t.ZEGO_RTM_ACTION = {}));}, function (e, t, r) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.ClientUtil = void 0;var o = r(15),s = r(0),i = r(1),n = function () {function e() {}return e.checkConfigParam = function (e, t, r) {return e && "number" == typeof e && this.checkInteger(e) ? !(!t || "string" != typeof t && !Array.isArray(t) || "" == t) || (r.error("ccp.0 server must be string or string array and not empty"), !1) : (r.error("ccp.0 appid must be positive integer number and not empty"), !1);}, e.checkPriConfigParam = function (e, t, r, o, s) {return e && "number" == typeof e && this.checkInteger(e) ? t && "string" == typeof t ? "object" != typeof r || "string" != typeof r.deviceID ? (s.error("ccp.0 deviceID must be string and not empty"), !1) : 1 === o || 0 === o || (s.error("ccp.0 anType must be 0 or 1"), !1) : (s.error("ccp.0 dispatchServer must be string and not empty"), !1) : (s.error("ccp.0 appid must be positive integer number and not empty"), !1);}, e.checkIllegalCharacters = function (e) {return /^([0-9a-zA-Z#!$%&()`'+-;<=.>@^_~,\\*])+$/.test(e) && /^[^:/]*$/g.test(e);}, e.isUrl = function (e) {return !!(e.startsWith("rtmp://") || e.startsWith("https://") && e.endsWith(".flv") || e.startsWith("https://") && e.endsWith(".m3u8"));}, e.registerCallback = function (e, t, r) {var o, s;t.success && (o = t.success, r[e + "SuccessCallback"] = o), t.error && (s = t.error, r[e + "ErrorCallback"] = s);}, e.actionErrorCallback = function (e, t) {return t[e + "ErrorCallback"];}, e.actionSuccessCallback = function (e, t) {return t[e + "SuccessCallback"];}, e.logReportCallback = function (t, r, o, s) {e.registerCallback(t, { success: function success(t, s) {for (var i = [], n = 2; n < arguments.length; n++) {i[n - 2] = arguments[n];}e.dataReportEvent(r, o, t, s, i);} }, s);}, e.proxyRes = function (t, r, o, s) {return { interResolve: function interResolve(e) {t.uploadReport(r), o(e);}, interReject: function interReject(o, i) {var n;void 0 === i && (i = ""), (n = o.code < 2e9 && o.code > 1e9 ? e.decodeServerError(o.code, o.msg) : { code: o.code, message: o.msg }) && t.addMsgInfo(r, { error: n.code, message: n.message + i }), t.uploadReport(r), s({ errorCode: o.code || o.errorCode });} };}, e.getServerError = function (e) {var t = { 1: "parse json error.", 1001: "login is processing.", 1002: "liveroom request error.", 1003: "zpush connect fail.", 1004: "zpush handshake fail.", 1005: "zpush login fail.", 1006: "user login state is wrong.", 1007: "got no zpush addr", 1008: "token error", 1009: "dispatch error", 1010: "token expired", 1011: "token format error", 2002: "biz channel error", 1e9: "liveroom cmd error, code:" };if (0 === e) return i.errorCodeList.SUCCESS;var r = i.errorCodeList.ROOM_INNER_ERROR;return r.code = e, r.msg = e > 1e9 ? t[1e9] + e : t[e] ? t[e] + " code:" + e : "unknown error code:" + e, r;}, e.unregisterCallback = function (e, t) {delete t[e + "SuccessCallback"], delete t[e + "ErrorCallback"];}, e.decodeServerError = function (e, t) {var r = { code: -1, message: "server error" };return r.code = e > 1e9 ? e - 1e9 + 52e6 : e + 2002e6, t && (r.message = t), r;}, e.getLiveRoomError = function (e) {return e > 1e9 ? { 1105: "ROOM_MAX_USER_COUNT", 1012: "PUBLISHER_ERROR_REPETITIVE_PUBLISH_STREAM", 2002: "ROOM_ERROR_AUTHENTICATION_FAILED", 2003: "ROOM_ERROR_LOGIN_TIMEOUT" }[e - 1e9] || "" : { 1: "PARSE_JSON_ERROR", 1001: "LOGIN_PROCESSING", 1002: "LIVEROMM_REQUEST_ERROR", 1003: "ZPUSH_REQUEST_FAIL", 1004: "ZPUSH_REQUEST_FAIL", 1005: "ZPUSH_REQUEST_FAIL", 1006: "LOGIN_STATE_WRONG", 1007: "ZPUSH_REQUEST_FAIL", 1008: "TOKEN_ERROR", 1009: "DIAPATCH_ERROR", 1010: "TOKEN_EXPIRED", 1011: "TOKEN_ERROR", 1012: "SUBCMD_ERROR", 1101: "ZEGO_AUTH_ERROR", 2001: "BIZ_CHANNEL_ERROR", 2002: "BIZ_CHANNEL_ERROR" }[e] || "ROOM_INNER_ERROR";}, e.getKickoutError = function (e) {var t = { code: e, message: "kickout reason = " + e };switch (e) {case 1:case 4:t.code = 63000001, t.message = "zpush multiple login kickout", t.name = "MULTIPLE_LOGIN_KICKOUT";break;case 2:t.code = 63000002, t.message = "zpush manual kickout", t.name = "MANUAL_KICKOUT";break;case 3:t.code = 63000003, t.message = "kickout reason = " + e;break;default:t.code = e, t.message = "kickout reason = " + e;}return t;}, e.dataReportEvent = function (e, t, r, o, s) {switch (r) {case "eventStart":e.eventStart(t, o);break;case "eventEndWithMsgInfo":e.eventEndWithMsgInfo(t, o, s[0]);break;case "addEventMsg":e.addEventMsg(t, o, s[0], s[1]);break;case "addEvent":e.addEvent(t, o);break;case "eventEnd":e.eventEnd(t, o);break;case "addMsgInfo":e.addMsgInfo(t, s[0]);}}, e.isKeepTryLogin = function (e) {switch (e) {case 1002:case 1003:return !0;default:return !1;}}, e.mergeUserList = function (e, t, r, o) {e.debug("msl.0 call");var s,i = [],n = [];r || (r = []);for (var a = 0; a < r.length; a++) {s = !1;for (var l = 0; l < t.length; l++) {if (r[a].userID === t[l].userID) {s = !0;break;}}s || i.push(r[a]);}for (var u = 0; u < t.length; u++) {s = !1;for (var _ = 0; _ < r.length; _++) {if (t[u].userID === r[_].userID) {s = !0;break;}}s || n.push(t[u]);}for (t.splice(0), a = 0; a < r.length; a++) {t.push(t[a]);}o(i, n), e.debug("msl.0 call success");}, e.checkInteger = function (e, t) {return 0 == t ? "number" == typeof e && e % 1 == 0 && e >= 0 : "number" == typeof e && e % 1 == 0 && e > 0;}, e.checkValidNumber = function (e, t, r) {return t = t || 1, r = r || 1e4, "number" == typeof e && e % 1 == 0 && e >= t && e <= r;}, e.generateRandumNumber = function (e) {return parseInt(Math.random() * (e + 1) + "", 10);}, e.uuid = function (e, t) {var r,o = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),s = [];if (t = t || o.length, e) for (r = 0; r < e; r++) {s[r] = o[0 | Math.random() * t];} else {var i = void 0;for (s[8] = s[13] = s[18] = s[23] = "-", s[14] = "4", r = 0; r < 36; r++) {s[r] || (i = 0 | 16 * Math.random(), s[r] = o[19 == r ? 3 & i | 8 : i]);}}return s.join("");}, e.compareVersion = function (e, t) {e = e.split("."), t = t.split(".");for (var r = Math.max(e.length, t.length); e.length < r;) {e.push("0");}for (; t.length < r;) {t.push("0");}for (var o = 0; o < r; o++) {var s = parseInt(e[o]),i = parseInt(t[o]);if (s > i) return 1;if (s < i) return -1;}return 0;}, e.getBrowser = function () {var e = window.navigator.userAgent,t = null != window.ActiveXObject && -1 != e.indexOf("MSIE"),r = -1 != e.indexOf("Firefox"),o = null != window.opr,s = e.indexOf("Chrome") && window.chrome,i = -1 != e.indexOf("Safari") && -1 != e.indexOf("Version");return t ? "IE" : r ? "Firefox" : o ? "Opera" : s ? "Chrome" : i ? "Safari" : "Unkown";}, e.isTestEnv = function (e) {return -1 != e.indexOf("wss://wssliveroom-test.zego.im/ws") || -1 != e.indexOf("wss://test2-wsliveroom-api.zego.im/ws") || -1 != e.indexOf("wss://wsliveroom-test.zegocloud.com/ws") || -1 != e.indexOf("wss://wsliveroom-test.zego.im/ws") || -1 != e.indexOf("wss://webliveroom-test.zego.im/ws") || -1 != e.indexOf("wss://webliveroom-test-bak.zego.im/ws") || -1 != e.indexOf("wss://webliveroom-hk-test.zegocloud.com/ws") || -1 != e.indexOf("wss://webliveroom-hk-test-bak.zegocloud.com/ws");}, e.getLogLevel = function (e) {return s.LOG_LEVEL[e];}, e.getUint64 = function (e, t, r) {var o = r.getUint32(e, t),s = r.getUint32(e + 4, t),i = t ? o + Math.pow(2, 32) * s : Math.pow(2, 32) * o + s;return Number.isSafeInteger(i) || console.warn(i, "exceeds MAX_SAFE_INTEGER. Precision may be lost"), i;}, e.decodeTokenExpire = function (t) {try {var r,s = Uint8Array.from(o.Base64.base64decode(t), function (e) {return e.charCodeAt(0);}),i = new DataView(s.buffer);return r = "function" == typeof i.getBigInt64 ? i.getBigUint64(0) : e.getUint64(0, !1, i), Number(r > 0 ? r : i.getBigUint64(0, !0));} catch (e) {console.error("token error");}return -1;}, e;}();t.ClientUtil = n;}, function (e, t, r) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.ZegoRTMLogEvent = void 0;var o = r(1),s = function s(e) {return e;};t.ZegoRTMLogEvent = { kZegoTaskInitSetting: { event: "/sdk/init", error: { kInvalidParamError: o.errorCodeList.INPUT_PARAM }, system_info: navigator ? navigator.appVersion : "" }, kZegoTaskSetDebug: { event: "/sdk/set_debug", debug: s }, kZegoTaskSetLog: { event: "/sdk/set_log_config", error: { kInvalidParamError: o.errorCodeList.INPUT_PARAM }, log_level: function log_level(e) {return e;}, remote_log_level: s, log_url: s }, kZegoTaskLoginRoom: { event: "/sdk/login", user_update: s, max_member_count: s, message: s, token: s, error: { ROOM_ID_NULL: o.errorCodeList.ROOM_ID_NULL, INPUT_PARAM: o.errorCodeList.INPUT_PARAM, ROOM_ID_TOO_LONG: o.errorCodeList.ROOM_ID_TOO_LONG, ROOM_ID_INVALID_CHARACTER: o.errorCodeList.ROOM_ID_INVALID_CHARACTER, USER_ID_NULL: o.errorCodeList.USER_ID_NULL, USER_ID_TOO_LONG: o.errorCodeList.USER_ID_TOO_LONG, USER_ID_INVALID_CHARACTER: o.errorCodeList.USER_ID_INVALID_CHARACTER, USER_NAME_NULL: o.errorCodeList.USER_NAME_NULL, USER_NAME_TOO_LONG: o.errorCodeList.USER_NAME_TOO_LONG, REPEATEDLY_LOGIN: o.errorCodeList.REPEATEDLY_LOGIN, LOGIN_TIMEOUT: o.errorCodeList.LOGIN_TIMEOUT, INNER_ERROR: o.errorCodeList.ROOM_INNER_ERROR, NETWORK_BROKEN: o.errorCodeList.NETWORK_BROKEN }, subEvent: { create_socket: { event: "create_socket", server: s, try_cnt: s }, liveroom_login: { event: "liveroom_login", server: s, respond_info: s } } }, kZegoTaskReNewToken: { event: "/sdk/reNewToken", error: { INPUT_PARAM: o.errorCodeList.INPUT_PARAM, NOT_LOGIN: o.errorCodeList.NOT_LOGIN } }, kZegoTaskLogoutRoom: { event: "/sdk/logout", error: { INPUT_PARAM: o.errorCodeList.INPUT_PARAM, ROOM_NOT_EXIST: o.errorCodeList.ROOM_NOT_EXIST } }, kZegoTaskReLoginRoom: { event: "/sdk/relogin", error: { ROOM_ID_NULL: o.errorCodeList.ROOM_ID_NULL, ROOM_DISCONNECT: o.errorCodeList.NETWORK_BROKEN }, subEvent: { create_socket: { event: "create_socket", server: s, try_cnt: s }, liveroom_login: { event: "liveroom_login", server: s, respond_info: s } } }, kZegoTaskLoginHall: { event: "/sdk/login_hall", user_update: s, device_id: s, message: s, token: s, device_type: s, an_type: s, room_flag: s, test_environment: s, error: { INPUT_PARAM: o.errorCodeList.INPUT_PARAM, USER_ID_NULL: o.errorCodeList.USER_ID_NULL, USER_ID_TOO_LONG: o.errorCodeList.USER_ID_TOO_LONG, USER_ID_INVALID_CHARACTER: o.errorCodeList.USER_ID_INVALID_CHARACTER, USER_NAME_NULL: o.errorCodeList.USER_NAME_NULL, USER_NAME_TOO_LONG: o.errorCodeList.USER_NAME_TOO_LONG, REPEATEDLY_LOGIN: o.errorCodeList.REPEATEDLY_LOGIN, LOGIN_TIMEOUT: o.errorCodeList.LOGIN_TIMEOUT, INNER_ERROR: o.errorCodeList.ROOM_INNER_ERROR, NETWORK_BROKEN: o.errorCodeList.NETWORK_BROKEN }, subEvent: { dispatch_connection: { event: "dispatch_connection" }, create_socket: { event: "create_socket", server: s, try_cnt: s }, liveroom_login: { event: "liveroom_login", server: s, respond_info: s } } }, kZegoTaskLogoutHall: { event: "/sdk/logout_hall", error: { INPUT_PARAM: o.errorCodeList.INPUT_PARAM } }, kZegoTaskEnterRoom: { event: "/sdk/enter", role: s, error: { INPUT_PARAM: o.errorCodeList.INPUT_PARAM, ROOM_ID_NULL: o.errorCodeList.ROOM_ID_NULL, ROOM_ID_TOO_LONG: o.errorCodeList.ROOM_ID_TOO_LONG, ROOM_ID_INVALID_CHARACTER: o.errorCodeList.ROOM_ID_INVALID_CHARACTER, NOT_LOGIN: o.errorCodeList.NOT_LOGIN, REPEATEDLY_ENTER_ROOM: o.errorCodeList.REPEATEDLY_ENTER_ROOM } }, kZegoTaskLeaveRoom: { event: "/sdk/leave", error: { INPUT_PARAM: o.errorCodeList.INPUT_PARAM } }, kZegoTaskReLoginHall: { event: "/sdk/relogin", error: { ROOM_ID_NULL: o.errorCodeList.ROOM_ID_NULL, ROOM_DISCONNECT: o.errorCodeList.NETWORK_BROKEN }, subEvent: { create_socket: { event: "create_socket", server: s, try_cnt: s }, liveroom_login: { event: "liveroom_login", server: s, respond_info: s } } }, kZegoTaskKickout: { event: "/sdk/kickout", user_id: s, error: {} }, kZegoTaskRoomKickout: { event: "/sdk/room_kickout", user_id: s, room_id: s, message: s }, kZegoTaskLiveRoomHB: { event: "/liveroom/hb", room_sid: s, error: { NOT_LOGIN: o.errorCodeList.NOT_LOGIN, HB_TIMEOUT: o.errorCodeList.TIMEOUT } }, kZegoTaskLiveSendRoomBigIM: { event: "/liveroom/send_big_room_message", room_sid: s, error: { INPUT_PARAM: o.errorCodeList.INPUT_PARAM, IM_CONTENT_NULL: o.errorCodeList.IM_CONTENT_NULL, IM_CONTENT_TOO_LONG: o.errorCodeList.IM_CONTENT_TOO_LONG, ROOM_NOT_EXIST: o.errorCodeList.ROOM_NOT_EXIST } }, kZegoTaskLiveRoomSendCustomCommand: { event: "/liveroom/send_custom_command", room_sid: s, error: { INPUT_PARAM: o.errorCodeList.INPUT_PARAM, IM_CONTENT_NULL: o.errorCodeList.IM_CONTENT_NULL, IM_CONTENT_TOO_LONG: o.errorCodeList.IM_CONTENT_TOO_LONG, ROOM_NOT_EXIST: o.errorCodeList.ROOM_NOT_EXIST } }, kZegoTaskLiveRoomSendRoomMessage: { event: "/liveroom/send_room_message", room_sid: s, error: { INPUT_PARAM: o.errorCodeList.INPUT_PARAM, IM_CONTENT_NULL: o.errorCodeList.IM_CONTENT_NULL, IM_CONTENT_TOO_LONG: o.errorCodeList.IM_CONTENT_TOO_LONG, ROOM_NOT_EXIST: o.errorCodeList.ROOM_NOT_EXIST } }, kZegoTaskLiveRoomSendReliableMessage: { event: "/liveroom/send_reliable_message", room_sid: s, error: { INPUT_PARAM: o.errorCodeList.INPUT_PARAM, TRANS_FREQUENTLY: o.errorCodeList.TRANS_FREQUENTLY, ROOM_NOT_EXIST: o.errorCodeList.ROOM_NOT_EXIST } }, kZegoTaskLiveGetRoomBigIM: { event: "/liveroom/get_big_room_message" }, kZegoTaskLiveRoomGetRoomMessage: { event: "/liveroom/get_room_message", room_sid: s }, kZegoTaskLiveRoomGetCustomCommand: { event: "/liveroom/get_custom_command" }, kZegoTaskLiveRoomGetUserUpdateInfo: { event: "/liveroom/get_user_update_info", user_update_type: s }, kZegoListener: { event: "/sdk/listener" }, kZegoEnableMultiRoom: { event: "sdk/enable_multi_room", error: { kInvalidParamError: o.errorCodeList.INPUT_PARAM, kAlreadyLoginError: o.errorCodeList.ALREADY_LOGIN } } };}, function (e, t, r) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.TryHandler = void 0;var o = function () {function e(e, t) {this.logger = e, this.stateCenter = t, this.RETRY_MAX_TIME = 300, this.RETRY_START_TIME_INTERVAL = 4, this.RETRY_CONTINUE_COUNT = 2, this.RETRY_MAX_TIME_INTERVAL = 32, this.retryTimer = null, this.maxTimer = null, this.retryStartTime = 0, this.retryActiveCount = 1, this.isOverTime = !1;}return e.prototype.init = function (e, t, r, o) {this.invalid(), this.stopMaxTime(), this.isOverTime = !1, "number" == typeof e && e < 3600 && (this.RETRY_MAX_TIME = e), "number" == typeof t && (this.RETRY_START_TIME_INTERVAL = t), "number" == typeof r && (this.RETRY_CONTINUE_COUNT = r), "number" == typeof o && (this.RETRY_MAX_TIME_INTERVAL = o);}, e.prototype.invalid = function () {this.retryTimer && clearTimeout(this.retryTimer), this.retryTimer = null, this.retryStartTime = 0, this.retryActiveCount = 1;}, e;}();t.TryHandler = o;}, function (e, t, r) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.HeartBeatHandler = void 0;var o = r(0),s = r(3),i = r(1),n = r(2),a = r(4),l = 3,u = function () {function e(e, t, r, o, s) {this.logger = e, this.stateCenter = t, this.dataReport = r, this.service = o, this.room = s, this.tryHeartbeatCount = 0, this.heartbeatTimer = null, this.loginHeartbeatTimer = null, this.initCount = 0;}return e.prototype.init = function (e) {var t,r = this;if ("PRIVATE" == this.stateCenter.type) {t = e.body.hb_interval < o.MINIUM_HEARTBEAT_INTERVAL ? o.MINIUM_HEARTBEAT_INTERVAL : e.body.hb_interval;var s = e.body.hb_timeout || 4e4;l = s / t + 1;} else t = e.body.hearbeat_interval < o.MINIUM_HEARTBEAT_INTERVAL ? o.MINIUM_HEARTBEAT_INTERVAL : e.body.hearbeat_interval;this.tryHeartbeatCount = 0, this.heartbeatTimer && clearTimeout(this.heartbeatTimer), this.loginHeartbeatTimer = setTimeout(function () {r.start(t);}, t), this.initCount++;}, e.prototype.start = function (e) {var t = this;this.logger.info(n.ZEGO_RTM_ACTION.HEARTBEAT_START + " call");var r = o.getReportSeq();if (this.dataReport.newReport(r, a.ZegoRTMLogEvent.kZegoTaskLiveRoomHB.event), this.dataReport.addMsgInfo(r, { room_sid: a.ZegoRTMLogEvent.kZegoTaskLiveRoomHB.room_sid(this.room.sessionID) }), !this.room.isLogin()) return this.logger.error(n.ZEGO_RTM_ACTION.HEARTBEAT_START + " state error"), this.dataReport.addMsgInfo(r, { error: a.ZegoRTMLogEvent.kZegoTaskLiveRoomHB.error.NOT_LOGIN.code, message: a.ZegoRTMLogEvent.kZegoTaskLiveRoomHB.error.NOT_LOGIN.msg }), void this.dataReport.uploadReport(r);if (++this.tryHeartbeatCount > l) return this.logger.error(n.ZEGO_RTM_ACTION.HEARTBEAT_START + " come to try limit"), this.dataReport.addMsgInfo(r, { error: a.ZegoRTMLogEvent.kZegoTaskLiveRoomHB.error.HB_TIMEOUT.code, message: a.ZegoRTMLogEvent.kZegoTaskLiveRoomHB.error.HB_TIMEOUT.msg }), this.dataReport.uploadReport(r), void this.hbLogout(i.errorCodeList.HEARTBEAT_TIMEOUT);var u = function u(e) {var o = "PRIVATE" == t.stateCenter.type ? e.body && e.body.code : e.body && e.body.err_code;if (e.header && e.body) {if (0 !== o) {var n = s.ClientUtil.decodeServerError(e.body.err_code || e.body.code, e.body.err_message || e.body.message);t.dataReport.addMsgInfo(r, { error: n.code, message: n.message + e.body.err_code });}} else t.dataReport.addMsgInfo(r, { error: e.code > 0 ? e.code : i.errorCodeList.ROOM_INNER_ERROR.code, message: e.msg ? e.msg : i.errorCodeList.ROOM_INNER_ERROR });t.dataReport.uploadReport(r), "PRIVATE" == t.stateCenter.type ? t.handlePrivateHeartbeatRsp(e) : t.handleHeartbeatRsp(e);};this.service.heartBeat(u, u, this.room.sessionID, this.room.roomID, this.room.roomSessionID), this.heartbeatInterval = e;var _ = this.heartbeatInterval;this.initCount >= 2 ? (_ = Math.round(Math.random() * (this.heartbeatInterval + 1)), this.initCount = 1) : _ = this.heartbeatInterval, this.heartbeatTimer = setTimeout(function () {t.start(t.heartbeatInterval);}, _), this.logger.info(n.ZEGO_RTM_ACTION.HEARTBEAT_START + " call success");}, e.prototype.handleHeartbeatRsp = function (e) {return e.body && e.body.err_code && 0 !== e.body.err_code ? (this.logger.error(n.ZEGO_RTM_ACTION.HEARTBEAT_HEARTBEAT_RSP + " disconnect, server error=", e.body.err_code), e.body.err_code == o.ERROR_CODES.ROOM_SESSION_ID_ERR ? void this.hbLogout(i.errorCodeList.HEARTBEAT_TIMEOUT) : void this.hbLogout(s.ClientUtil.getServerError(e.body.err_code))) : e.header && e.body ? (this.tryHeartbeatCount = 0, this.heartbeatInterval = e.body.hearbeat_interval, this.heartbeatInterval < o.MINIUM_HEARTBEAT_INTERVAL && (this.heartbeatInterval = o.MINIUM_HEARTBEAT_INTERVAL), this.heartbeatRspNotiFy(e), void this.logger.info(n.ZEGO_RTM_ACTION.HEARTBEAT_HEARTBEAT_RSP + " call success")) : (this.logger.error(n.ZEGO_RTM_ACTION.HEARTBEAT_HEARTBEAT_RSP + " disconnect, error=", JSON.stringify(e)), void this.hbLogout(e));}, e.prototype.handlePrivateHeartbeatRsp = function (e) {if (0 !== e.body.code) return this.logger.error(n.ZEGO_RTM_ACTION.HEARTBEAT_HEARTBEAT_RSP + " disconnect, server error=", e.body.code), e.body.code == o.ERROR_CODES.ROOM_SESSION_ID_ERR ? void this.hbLogout(i.errorCodeList.HEARTBEAT_TIMEOUT) : void this.hbLogout(s.ClientUtil.getServerError(e.body.code));this.tryHeartbeatCount = 0, this.heartbeatInterval = e.body.hb_interval, this.heartbeatInterval < o.MINIUM_HEARTBEAT_INTERVAL && (this.heartbeatInterval = o.MINIUM_HEARTBEAT_INTERVAL), this.heartbeatRspNotiFy(e), this.logger.info(n.ZEGO_RTM_ACTION.HEARTBEAT_HEARTBEAT_RSP + " call success");}, e.prototype.heartbeatRspNotiFy = function (e) {}, e.prototype.hbLogout = function (e) {}, e.prototype.resetHeartbeat = function () {clearTimeout(this.heartbeatTimer), this.heartbeatTimer = null, clearTimeout(this.loginHeartbeatTimer), this.loginHeartbeatTimer = null, this.tryHeartbeatCount = 0, this.initCount = 0, this.logger.info(n.ZEGO_RTM_ACTION.HEARTBEAT_RESET + " call success");}, e;}();t.HeartBeatHandler = u;}, function (e, t, r) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.LiveHandler = void 0;var o = r(0),s = r(2),i = r(3),n = r(1),a = function () {function e(e, t, r, o) {this.logger = e, this.stateCenter = t, this.service = r, this.room = o, this.joinLiveCallbackMap = {}, this.joinLiveRequestMap = {};}return e.prototype.resetLiveHandler = function () {this.joinLiveCallbackMap = {}, this.joinLiveRequestMap = {};}, e.prototype.getSignalCmdContent = function (e, t, r) {var o = { request_id: e, room_id: this.room.roomID, from_userid: this.stateCenter.idName, from_username: this.stateCenter.nickName, to_userid: t };return null != r && (o.result = r), JSON.stringify(o);}, e.prototype.requestJoinLive = function (e, t, r, s) {var i = this.stateCenter.getRequestId(),n = this.getSignalCmdContent(i, e);return null != s && (this.joinLiveCallbackMap[i] = s, this.sendSignalCmd(o.ENUM_SIGNAL_SUB_CMD.joinLiveRequest, n, e, t, r), !0);}, e.prototype.sendSignalCmd = function (e, t, r, o, a) {if (this.room.isLogin()) {var l = { sub_cmd: e, signal_msg: t, dest_id_name: [r] };this.service.sendSignalCmd(l, function (e) {o && o(e.header.seq);}, function (e) {var t = n.errorCodeList.ROOM_INNER_ERROR;if (!e.header || !e.body) return e.code && e.msg && (t = e), void (a && a(t, 0));a && a(i.ClientUtil.getServerError(e.body.err_code), e.header.seq);}, this.room.sessionID, this.room.roomID, this.room.roomSessionID), this.logger.info(s.ZEGO_RTM_ACTION.LIVE_SEND_SIGNAL + " call success" + e);} else this.logger.error(s.ZEGO_RTM_ACTION.LIVE_SEND_SIGNAL + " state error");}, e.prototype.inviteJoinLive = function (e, t, r, s) {var i = this.stateCenter.getRequestId(),n = this.getSignalCmdContent(i, e);return null != s && (this.joinLiveCallbackMap[i] = s, this.sendSignalCmd(o.ENUM_SIGNAL_SUB_CMD.joinLiveInvite, n, e, t, r), !0);}, e.prototype.endJoinLive = function (e, t, r) {var s = this.stateCenter.getRequestId(),i = this.getSignalCmdContent(s, e);return this.sendSignalCmd(o.ENUM_SIGNAL_SUB_CMD.joinLiveStop, i, e, t, r), !0;}, e.prototype.respondJoinLive = function (e, t, r, i) {var n = this.joinLiveRequestMap[e];if (!n) return this.logger.info(s.ZEGO_RTM_ACTION.LIVE_RESPOND_JOIN_LIVE + " no dest id name"), !1;var a = 0;!0 === t && (a = 1);var l = this.getSignalCmdContent(e, n, a);return this.sendSignalCmd(o.ENUM_SIGNAL_SUB_CMD.joinLiveResult, l, n, r, i), delete this.joinLiveRequestMap[e], !0;}, e.prototype.handlePushSignalMsg = function (e) {var t = JSON.parse(e.body.signal_msg);switch (this.logger.info(s.ZEGO_RTM_ACTION.LIVE_PUSH_SIGNAL + " hpsm= ", t), e.body.sub_cmd) {case o.ENUM_PUSH_SIGNAL_SUB_CMD.pushJoinLiveRequest:this.handlePushJoinLiveRequestMsg(t);break;case o.ENUM_PUSH_SIGNAL_SUB_CMD.pushJoinLiveResult:this.handlePushJoinLiveResultMsg(t);break;case o.ENUM_PUSH_SIGNAL_SUB_CMD.pushJoinLiveInvite:this.handlePushJoinLiveInviteMsg(t);break;case o.ENUM_PUSH_SIGNAL_SUB_CMD.pushJoinLiveStop:this.handlePushJoinLiveStopMsg(t);}}, e.prototype.handlePushJoinLiveRequestMsg = function (e) {var t = e.request_id;if ("string" == typeof t) {var r = e.from_userid;"string" == typeof r ? (this.joinLiveRequestMap[t] = r, this.onRecvJoinLiveRequest(t, e.from_userid, e.from_username, e.room_id), this.logger.info(s.ZEGO_RTM_ACTION.LIVE_PUSH_SIGNAL + " onRecvJoinLiveRequest " + r)) : this.logger.error(s.ZEGO_RTM_ACTION.LIVE_PUSH_SIGNAL + " no from user");} else this.logger.error(s.ZEGO_RTM_ACTION.LIVE_PUSH_SIGNAL + " no requestId");}, e.prototype.onRecvJoinLiveRequest = function (e, t, r, o) {this.stateCenter.actionListener("recvJoinLiveRequest", e, t, r, o);}, e.prototype.handlePushJoinLiveInviteMsg = function (e) {var t = e.request_id;if ("string" == typeof t) {var r = e.from_userid;"string" == typeof r ? (this.joinLiveRequestMap[t] = r, this.onRecvInviteJoinLiveRequest(t, e.from_userid, e.from_username, e.room_id), this.logger.info(s.ZEGO_RTM_ACTION.LIVE_PUSH_SIGNAL + " onRecvInviteJoinLiveRequest " + r)) : this.logger.error(s.ZEGO_RTM_ACTION.LIVE_PUSH_SIGNAL + " no from user");} else this.logger.error(s.ZEGO_RTM_ACTION.LIVE_PUSH_SIGNAL + "no requestId");}, e.prototype.onRecvInviteJoinLiveRequest = function (e, t, r, o) {this.stateCenter.actionListener("recvInviteJoinLiveRequest", e, t, r, o);}, e.prototype.handlePushJoinLiveResultMsg = function (e) {var t = e.request_id;if ("string" == typeof t) {var r = e.result;if (null != r) {var o = 1 == r;if (this.joinLiveCallbackMap[t]) {var i = this.joinLiveCallbackMap[t];if (!i) return void this.logger.info(s.ZEGO_RTM_ACTION.LIVE_PUSH_SIGNAL + " no callback");this.logger.info(s.ZEGO_RTM_ACTION.LIVE_PUSH_SIGNAL + " joinLiveRequest/invite result " + o), delete this.joinLiveCallbackMap[t], i(o, e.from_userid, e.from_username);}} else this.logger.info(s.ZEGO_RTM_ACTION.LIVE_PUSH_SIGNAL + " no result");} else this.logger.error(s.ZEGO_RTM_ACTION.LIVE_PUSH_SIGNAL + " no requestId");}, e.prototype.handlePushJoinLiveStopMsg = function (e) {var t = e.request_id;"string" == typeof t ? (this.logger.info(s.ZEGO_RTM_ACTION.LIVE_PUSH_SIGNAL + " onRecvEndJoinLiveCommand " + e.from_userid), this.onRecvEndJoinLiveCommand(t, e.from_userid, e.from_username, e.room_id)) : this.logger.error(s.ZEGO_RTM_ACTION.LIVE_PUSH_SIGNAL + " no requestId");}, e.prototype.onRecvEndJoinLiveCommand = function (e, t, r, o) {this.stateCenter.actionListener("recvEndJoinLiveCommand", e, t, r, o);}, e;}();t.LiveHandler = a;}, function (e, t, r) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.MessageHandler = void 0;var o = r(0),s = r(3),i = r(1),n = r(2),a = r(4),l = function () {function e(e, t, r, o, s) {var i = this;this.logger = e, this.stateCenter = t, this.dataReport = r, this.service = o, this.room = s, this.sendRoomMsgTime = 0, this.sendRoomMsgInterval = 500, this.bigImCallbackMap = {}, this.bigImLastTimeIndex = 0, this.bigIMmessageList = [], this.bigImTimer = null, this.relayTimer = null, this.serverTimeOffset = 0, this.datiTimeWindow = 0, this.bigimTimeWindow = 0, this.isReliable = !1, this.transSeqMap = {}, this.onRecvReliableMessage = function (e) {var t = e.map(function (e) {return { key: e.trans_type, value: e.trans_data, updateUser: { userID: e.trans_idname, userName: e.trans_nickname }, updateTime: e.trans_send_time };});i.stateCenter.actionListener("roomExtraInfoUpdate", i.room.roomID, t), e.forEach(function (e) {i.stateCenter.actionListener("recvReliableMessage", e.trans_type, e.trans_seq, e.trans_data);});}, this.realyMessageList = [];}return e.prototype.loginRsp = function (e) {var t = this;if (null != e.body.ret_timestamp && "string" == typeof e.body.ret_timestamp) {var r = parseFloat(e.body.ret_timestamp);this.serverTimeOffset = 0 == r ? 0 : e.body.ret_timestamp - new Date().getTime();}if (e.body.bigim_time_window && "number" == typeof e.body.bigim_time_window && (this.bigimTimeWindow = e.body.bigim_time_window), e.body.dati_time_window && "number" == typeof e.body.dati_time_window && (this.datiTimeWindow = e.body.dati_time_window), e.body.trans_seqs) for (var o = 0; o < e.body.trans_seqs.length; o++) {var s = e.body.trans_seqs[o].trans_channel,i = e.body.trans_seqs[o].trans_seq_array;(i = i.filter(function (e) {var r = e.trans_type,o = e.trans_seq;return !t.transSeqMap[r] || t.transSeqMap[r].seq < o;})).length > 0 && this.fetchReliableMessage(s, i);}}, e.prototype.sendReliableMessage = function (e, t, r, o) {var l = this;if (this.logger.info(n.ZEGO_RTM_ACTION.MESSAGE_SEND_RELIABLE + " call"), !this.room.isLogin()) return this.logger.error(n.ZEGO_RTM_ACTION.MESSAGE_SEND_RELIABLE + " state error"), void (o && o(i.errorCodeList.NOT_LOGIN));if (this.isReliable) return this.logger.error(n.ZEGO_RTM_ACTION.MESSAGE_SEND_RELIABLE + " send too often"), void o(a.ZegoRTMLogEvent.kZegoTaskLiveRoomSendReliableMessage.error.TRANS_FREQUENTLY);this.transSeqMap[e] || (this.transSeqMap[e] = { seq: 0 });var u = { trans_type: e, trans_data: t, trans_local_seq: this.transSeqMap[e].seq, trans_channel: "clt" };this.isReliable = !0, this.service.sendReliableMessage(u, function (t) {l.transSeqMap[e].seq = t.body.trans_seq, l.logger.info(n.ZEGO_RTM_ACTION.MESSAGE_SEND_RELIABLE + " trans " + e + " seq " + t.body.trans_seq), l.isReliable = !1, r({ seq: t.header.seq, errorCode: 0 });}, function (e) {var t = i.errorCodeList.ROOM_INNER_ERROR;e.body && e.body.err_code ? (t = s.ClientUtil.getServerError(e.body.err_code), l.logger.error(n.ZEGO_RTM_ACTION.MESSAGE_SEND_ROOM_MSG + "  " + t.msg)) : t = e, l.isReliable = !1, o(t);}, this.room.sessionID, this.room.roomID, this.room.roomSessionID);}, e.prototype.fetchReliableMessage = function (e, t) {var r = this,o = { trans_channel: e, fetch_array: t },s = function s(e) {r.handleFetchTransRsp(e);};this.service.fetchReliableMessage(o, s, s, this.room.sessionID, this.room.roomID, this.room.roomSessionID), this.logger.info(n.ZEGO_RTM_ACTION.MESSAGE_FETCH_RELIABLE + " call success");}, e.prototype.handleFetchTransRsp = function (e) {if (e.body && 0 != e.body.err_code) this.logger.error(n.ZEGO_RTM_ACTION.MESSAGE_RELIABLE_RSP + " trans send error " + e.body.err_code);else if (e.header && e.body) {var t = e.body.trans_fetch_results,r = [];if (Array.isArray(t) && t.length > 0) for (var s = 0; s < t.length; s++) {var i = t[s];if (i.err_code !== o.ERROR_CODES.FETCH_TRANS_UNKNOWN_TYPE) {var a = i.trans_type,l = i.trans_seq;i.err_code !== o.ERROR_CODES.FETCH_TRANS_WRONG_SEQ ? (!this.transSeqMap[a] || this.transSeqMap[a].seq < l ? (this.transSeqMap[a] = { seq: l }, r.push(i)) : this.logger.warn(n.ZEGO_RTM_ACTION.MESSAGE_RELIABLE_RSP + " fetch trans seq wrong"), r.length > 0 && this.onRecvReliableMessage(r)) : (this.logger.warn(n.ZEGO_RTM_ACTION.MESSAGE_RELIABLE_RSP + " fetch trans seq is wrong " + i.err_code), this.transSeqMap[a] = { seq: l });} else this.logger.warn(n.ZEGO_RTM_ACTION.MESSAGE_RELIABLE_RSP + " fetch trans unknown type " + i.err_code);}} else this.logger.error(n.ZEGO_RTM_ACTION.MESSAGE_RELIABLE_RSP + " trans send error " + e);}, e.prototype.handlePushTransMsg = function (e) {var t = e.body.trans_type,r = e.body.trans_seq;!this.transSeqMap[t] || this.transSeqMap[t].seq < r ? (this.transSeqMap[t] = { seq: r }, this.onRecvReliableMessage([e.body])) : this.logger.warn(n.ZEGO_RTM_ACTION.MESSAGE_RELIABLE_PUSH + " trans seq wrong"), this.logger.info(n.ZEGO_RTM_ACTION.MESSAGE_RELIABLE_PUSH + " trans " + t + " seq " + r);}, e.prototype.sendRoomMsg = function (e, t, r, o, a, l) {var u = this;if (!this.room.isLogin()) return this.logger.error(n.ZEGO_RTM_ACTION.MESSAGE_SEND_ROOM_MSG + " state error"), l(i.errorCodeList.NOT_LOGIN), !1;var _ = Date.parse(new Date() + "");if (this.sendRoomMsgTime > 0 && this.sendRoomMsgTime + this.sendRoomMsgInterval > _) return this.logger.info(n.ZEGO_RTM_ACTION.MESSAGE_SEND_ROOM_MSG + " freq error"), l && l(i.errorCodeList.FREQ_LIMITED, 0, e, o), !1;this.sendRoomMsgTime = _;var d = "PRIVATE" == this.stateCenter.type ? { room_header: { room_id: this.room.roomID, room_sid: this.room.roomSid || "0", room_user_session_id: this.room.roomSessionID || "0" }, msg_category: e, msg_type: 1, msg_content: o } : { msg_category: e, msg_type: 1, msg_content: o };return this.service.sendRoomMsg(d, function (e) {a({ seq: e.header.seq, errorCode: 0, messageID: e.body.msg_id });}, function (e) {var t,r,o = i.errorCodeList.ROOM_INNER_ERROR;if (!e.header || !e.body) return e.code && e.msg && (o = e), void l({ seq: 0, errorCode: o.code, messageID: 0 });o = (t = [s.ClientUtil.getServerError("PRIVATE" == u.stateCenter.type ? e.body.code : e.body.err_code), e.body.msg_id])[0], r = t[1], u.logger.error(n.ZEGO_RTM_ACTION.MESSAGE_SEND_ROOM_MSG + "  " + o.msg), o == i.errorCodeList.TIMEOUT && (o = i.errorCodeList.IM_SEND_FAILED), l({ seq: e.header.seq, errorCode: o.code, messageID: r });}, this.room.sessionID, this.room.roomID, this.room.roomSessionID), this.logger.info(n.ZEGO_RTM_ACTION.MESSAGE_SEND_ROOM_MSG + "  call success"), !0;}, e.prototype.handlePushRoomMsg = function (e) {var t = this,r = o.getReportSeq();this.dataReport.newReport(r), this.dataReport.addMsgInfo(r, { room_sid: a.ZegoRTMLogEvent.kZegoTaskLiveRoomGetRoomMessage.room_sid(e.header.session_id) });var s = [];"PRIVATE" == this.stateCenter.type ? e.body.chat_data.forEach(function (e) {var o = { fromUser: { userID: e.user_id, userName: e.user_name }, message: e.msg_content, sendTime: e.send_time, messageID: e.msg_id };s.push(o), t.dataReport.addMsgInfo(r, { from_msg_id: e.id_name });}) : e.body.chat_data.forEach(function (e) {var o = { fromUser: { userID: e.id_name, userName: e.nick_name }, message: e.msg_content, sendTime: e.send_time, messageID: e.msg_id };s.push(o), t.dataReport.addMsgInfo(r, { from_msg_id: e.id_name });}), this.dataReport.uploadReport(r, a.ZegoRTMLogEvent.kZegoTaskLiveRoomGetRoomMessage.event), this.stateCenter.actionListener("IMRecvBroadcastMessage", this.room.roomID, s), this.stateCenter.actionListener("_recvRoomMsg", e.body.chat_data, e.body.server_msg_id, e.body.ret_msg_id);}, e.prototype.sendCustomCommand = function (e, t, r, o) {var a = this;if (!this.room.isLogin()) return this.logger.error(n.ZEGO_RTM_ACTION.MESSAGE_SEND_CUSTOM_MSG + " state error"), o(i.errorCodeList.NOT_LOGIN), !1;var l = { from_userid: this.stateCenter.idName, from_username: this.stateCenter.nickName, request_id: this.stateCenter.getRequestId(), custom_content: t || "", room_id: this.room.roomID },u = "PRIVATE" == this.stateCenter.type ? { room_header: { room_id: this.room.roomID, room_sid: this.room.roomSid || "0", room_user_session_id: this.room.roomSessionID || "0" }, request_id: this.stateCenter.getRequestId(), msg: t, destids: e } : { dest_id_name: e, custom_msg: JSON.stringify(l) };return this.service.sendCustomCommand(u, function (e) {r({ seq: e.header.seq, errorCode: 0 });}, function (e) {var t = i.errorCodeList.ROOM_INNER_ERROR;if (!e.header || !e.body) return e.code && e.msg && (t = e), void o({ seq: 0, code: t.code, messageID: 0 });var r,l = s.ClientUtil.getServerError("PRIVATE" == a.stateCenter.type ? e.body.code : e.body.err_code);a.logger.error(n.ZEGO_RTM_ACTION.MESSAGE_SEND_CUSTOM_MSG + " " + l.msg), r = l == i.errorCodeList.TIMEOUT ? i.errorCodeList.IM_SEND_FAILED : l, o({ seq: e.header.seq, errorCode: r.code, code: r.code });}, this.room.sessionID, this.room.roomID, this.room.roomSessionID), this.logger.info(n.ZEGO_RTM_ACTION.MESSAGE_SEND_CUSTOM_MSG + " call success"), !0;}, e.prototype.handlePushCustomMsg = function (e) {var t, r, s, i, n, l;if ("PRIVATE" == this.stateCenter.type) s = (t = [e.body.from_user_id, e.body.from_user_name, this.room.roomID, e.body.msg])[0], i = t[1], n = t[2], l = t[3];else {var u = JSON.parse(e.body.custommsg);s = (r = [u.from_userid, u.from_username, u.room_id, u.custom_content])[0], i = r[1], n = r[2], l = r[3];}var _ = o.getReportSeq();this.dataReport.newReport(_), this.dataReport.uploadReport(_, a.ZegoRTMLogEvent.kZegoTaskLiveRoomGetCustomCommand.event), this.stateCenter.actionListener("IMRecvCustomCommand", n, { userID: s, userName: i }, l);}, e.prototype.sendBigRoomMessage = function (e, t, r, s, a, l) {var u = this;if (!this.room.isLogin()) return this.logger.error(n.ZEGO_RTM_ACTION.MESSAGE_SEND_BIG_MSG + " state error"), void (l && l(i.errorCodeList.NOT_LOGIN));var _ = this.bigimTimeWindow,d = this.serverTimeOffset,c = new Date().getTime() + d,g = o.getSeq().toString();if (this.bigImCallbackMap[g] = { success: a, error: l }, 0 == _) {var h = { msg_category: e, msg_type: 1, msg_content: s, bigmsg_client_id: g };this.sendBigRoomMessageInternal([h], function (e) {u.handleBigImMsgRsp(e);}, function (e) {l && l(e);});} else {var E = Math.floor(c / _);if (this.bigImLastTimeIndex < E && 0 == this.bigIMmessageList.length) {this.bigImLastTimeIndex = E;var p = { msg_category: e, msg_type: 1, msg_content: s, bigmsg_client_id: g };this.sendBigRoomMessageInternal([p], function (e) {u.handleBigImMsgRsp(e);}, function (e) {l && l(e);});} else this.bigIMmessageList.push({ msg_category: e, msg_type: 1, msg_content: s, bigmsg_client_id: g }), 1 == this.bigIMmessageList.length && this.setBigImTimer(d, _);}}, e.prototype.sendBigRoomMessageInternal = function (e, t, r) {var o = { msgs: e };this.service.sendBigRoomMessage(o, function (e) {t(e);}, function (e) {var t = i.errorCodeList.ROOM_INNER_ERROR;e.header && e.body || (e.code && e.msg && (t = e), r(t)), r(t);}, this.room.sessionID, this.room.roomID, this.room.roomSessionID), this.logger.info(n.ZEGO_RTM_ACTION.MESSAGE_SEND_BIG_MSG + " sendBigRoomMessage called");}, e.prototype.handleBigImMsgRsp = function (e) {this.bigimTimeWindow = e.body.bigim_time_window;for (var t = 0; t < e.body.msgs.length; t++) {var r = e.body.msgs[t].bigmsg_client_id,o = e.body.msgs[t].bigmsg_id;if (this.bigImCallbackMap[r]) {var s = this.bigImCallbackMap[r].success;null != s && s({ seq: e.header.seq, errorCode: 0, messageID: o }), delete this.bigImCallbackMap[r];}}}, e.prototype.setBigImTimer = function (e, t) {var r = this,o = t - (new Date().getTime() + e) % t,i = s.ClientUtil.generateRandumNumber(t) + o;this.bigImTimer = setTimeout(function () {r.onBigImTimer();}, i);}, e.prototype.onBigImTimer = function () {var e = this,t = new Date().getTime() + this.serverTimeOffset;this.bigImLastTimeIndex = Math.floor(t / this.bigimTimeWindow);for (var r = [], o = [], s = 0; s < this.bigIMmessageList.length && !(s >= 20); s++) {var i = this.bigIMmessageList[s];r.push({ msg_category: i.msg_category, msg_type: i.msg_type, msg_content: i.msg_content, bigmsg_client_id: i.bigmsg_client_id }), o.push(i.bigmsg_client_id);}this.bigIMmessageList.length > 20 ? this.bigIMmessageList.splice(0, 20) : this.bigIMmessageList = [], this.sendBigRoomMessageInternal(r, function (t) {e.handleBigImMsgRsp(t);}, function (t, r) {for (var s = 0; s < o.length; s++) {var i = o[s],n = e.bigImCallbackMap[i];n && (null != n.error && n.error(t, r), delete e.bigImCallbackMap[i]);}}), this.bigImTimer && clearTimeout(this.bigImTimer), this.bigImTimer = null, this.bigIMmessageList.length > 0 && this.setBigImTimer(this.serverTimeOffset, this.bigimTimeWindow);}, e.prototype.handlePushMergeMsg = function (e) {for (var t = 0; t < e.body.messages.length; t++) {14001 === e.body.messages[t].sub_cmd && this.handlePushBigRooMsg(e.body.messages[t].msg_body);}}, e.prototype.handlePushBigRooMsg = function (e) {var t;try {t = JSON.parse(e);} catch (e) {return void this.logger.warn(n.ZEGO_RTM_ACTION.MESSAGE_BIG_MSG_PUSH + "parse json error");}if (t) {for (var r = t.room_id, o = [], s = 0; s < t.msg_data.length; s++) {var i = t.msg_data[s];i.id_name != this.stateCenter.idName ? o.push({ idName: i.id_name, nickName: i.nick_name, messageId: i.bigmsg_id, category: i.msg_category, type: i.msg_type, content: i.msg_content, time: i.send_time }) : this.logger.info(n.ZEGO_RTM_ACTION.MESSAGE_BIG_MSG_PUSH + " self message");}0 == o.length ? this.logger.info(n.ZEGO_RTM_ACTION.MESSAGE_BIG_MSG_PUSH + " no other pushData except self") : this.onRecvBigRoomMessage(o, r), this.logger.info(n.ZEGO_RTM_ACTION.MESSAGE_BIG_MSG_PUSH + "call success");} else this.logger.warn(n.ZEGO_RTM_ACTION.MESSAGE_BIG_MSG_PUSH + " cann't find message body");}, e.prototype.onRecvBigRoomMessage = function (e, t) {var r = o.getReportSeq();this.dataReport.newReport(r);var s = [];e.forEach(function (e) {var t = { fromUser: { userID: e.idName, userName: e.nickName }, message: e.content, sendTime: e.time, messageID: e.messageId };s.push(t);}), this.dataReport.uploadReport(r, a.ZegoRTMLogEvent.kZegoTaskLiveGetRoomBigIM.event), this.stateCenter.actionListener("IMRecvBarrageMessage", t, s), this.stateCenter.actionListener("_recvBigRoomMessage", e, t);}, e.prototype.resetMessageInfo = function () {this.transSeqMap = {}, this.realyMessageList = [], this.relayTimer && (clearTimeout(this.relayTimer), this.relayTimer = null), this.bigImLastTimeIndex = 0, this.bigIMmessageList = [], this.bigImCallbackMap = {}, this.bigImTimer && (clearTimeout(this.bigImTimer), this.bigImTimer = null), this.serverTimeOffset = 0, this.datiTimeWindow = 0, this.bigimTimeWindow = 0;}, e.prototype.sendRelayMessage = function (e, t, r, o) {var s = this.datiTimeWindow,i = this.serverTimeOffset;s > 0 ? (this.realyMessageList.push({ type: e, data: t, success: r, error: o }), 1 == this.realyMessageList.length && this.setRelayTimer(i, s)) : this.sendRelayMessageInternal(e, t, r, o);}, e.prototype.sendRelayMessageInternal = function (e, t, r, o) {this.logger.info(n.ZEGO_RTM_ACTION.MESSAGE_SEND_RELAY_MSG + " call");var a = { relay_type: e, relay_data: t },l = this.room;this.service.sendRelayMessage(a, function (e) {r && r(e.header.seq, e.body.relay_result);}, function (e) {var t = i.errorCodeList.ROOM_INNER_ERROR;if (!e.header || !e.body) return e.code && e.msg && (t = e), void (o && o(t, 0));o && o(s.ClientUtil.getServerError(e.body.err_code), e.header.seq);}, l.sessionID, l.roomID, l.roomSessionID);}, e.prototype.setRelayTimer = function (e, t) {var r = this,o = 2 * t - (new Date().getTime() + e) % t,i = s.ClientUtil.generateRandumNumber(o);this.logger.info(n.ZEGO_RTM_ACTION.MESSAGE_SEND_RELAY_MSG + " setTimer " + i), this.relayTimer = setTimeout(function () {r.onRelayTimer();}, i);}, e.prototype.onRelayTimer = function () {if (0 != this.realyMessageList.length) {var e = this.realyMessageList[0];this.sendRelayMessageInternal(e.type, e.data, e.success, e.error), this.relayTimer && clearTimeout(this.relayTimer), this.relayTimer = null, this.realyMessageList.splice(0, 1), this.realyMessageList.length > 0 && this.setRelayTimer(this.serverTimeOffset, this.datiTimeWindow);} else this.logger.info(n.ZEGO_RTM_ACTION.MESSAGE_SEND_RELAY_MSG + "  no relay data");}, e.prototype.getRoomChatInfo = function (e, t, r, o) {if (this.logger.debug("zb.mh.grc call"), this.room.isLogin()) {var s = { room_header: { room_id: this.room.roomID, room_sid: this.room.roomSid || "0", room_user_session_id: this.room.roomSessionID || "0" }, msg_id: e, msg_count: t },i = function i(e, t) {if (0 !== e.body.code) o({ errorCode: e.body.code, extendData: e.body.message || "" });else {var s = e.body.msg_data.map(function (e) {return { fromUser: { userID: e.user_id, userName: e.user_name }, message: e.msg_content, sendTime: e.send_time, messageID: e.msg_id };});r({ chatData: s });}};this.service.sendMessage("zegochat_js.room_im_chat_fetch", s, i, i), this.logger.info("zb.mh.grc call success");} else this.logger.error("zb.mh.srm no enter room");}, e;}();t.MessageHandler = l;}, function (e, t, r) {"use strict";var o = this && this.__spreadArrays || function () {for (var e = 0, t = 0, r = arguments.length; t < r; t++) {e += arguments[t].length;}var o = Array(e),s = 0;for (t = 0; t < r; t++) {for (var i = arguments[t], n = 0, a = i.length; n < a; n++, s++) {o[s] = i[n];}}return o;};Object.defineProperty(t, "__esModule", { value: !0 }), t.UserHandler = void 0;var s = r(0),i = r(3),n = r(2),a = r(4),l = function () {function e(e, t, r, o, s) {this.logger = e, this.stateCenter = t, this.dataReport = r, this.service = o, this.room = s, this.userQuerying = !1, this.userTempList = [], this.userSeq = 0, this.minUserSeq = 0, this.userList = [], this.userSeqMergeMap = {}, this.userListInterval = 3e4, this.userListMergeInterval = 5e3, this.anchor_info = { anchor_id: "", anchor_id_name: "", anchor_nick_name: "" };}return e.prototype.loginRsp = function (e, t) {this.anchor_info = e.body.anchor_info || this.anchor_info, this.userListInterval = e.body.userlist_interval || this.userListInterval, this.userListMergeInterval = e.body.userlist_merge_timeout || this.userListMergeInterval, e.body.anchor_info && (this.stateCenter.actionListener("getAnchorInfo", e.body.anchor_info.anchor_id_name, e.body.anchor_info.anchor_nick_name), this.stateCenter.actionListener("_getAnchorInfo", e.body.anchor_info.anchor_id_name, e.body.anchor_info.anchor_nick_name)), e.body.online_count && this.stateCenter.actionListener("roomOnlineUserCountUpdate", this.room.roomID, e.body.online_count), this.logger.info(n.ZEGO_RTM_ACTION.USER_LOGIN_RSP + "  userStateUpdate " + this.stateCenter.userStateUpdate), this.stateCenter.userStateUpdate && this.fetchUserList(t);}, e.prototype.patchUserList = function (e) {var t = this;e.body.server_user_seq !== this.userSeq && this.stateCenter.userStateUpdate && !this.userSeqMergeMap && (this.logger.info(n.ZEGO_RTM_ACTION.USER_HB_PATCH + " call update user " + this.userSeq + " server " + e.body.server_user_seq), this.userSeqMergeTimer && clearTimeout(this.userSeqMergeTimer), this.userSeqMergeTimer = setTimeout(function () {t.handleMergeTimeout();}, this.userListMergeInterval)), this.minUserSeq = e.body.server_user_seq, null != e.body.online_count && 0 != e.body.online_count && this.stateCenter.actionListener("roomOnlineUserCountUpdate", this.room.roomID, e.body.online_count);}, e.prototype.resetUserHandler = function () {this.userQuerying = !1, this.lastUserQueryTime = 0, this.userTempList = [], this.userSeq = 0, this.minUserSeq = 0, this.userList = void 0, this.userSeqMergeMap = {}, this.userSeqMergeTimer = void 0, this.userQueryTimer = void 0, this.userListInterval = 3e4, this.userListMergeInterval = 5e3, this.anchor_info = { anchor_id: "", anchor_id_name: "", anchor_nick_name: "" };}, e.prototype.fetchUserList = function (e) {this.userQuerying ? this.logger.warn(n.ZEGO_RTM_ACTION.USER_FETCH_USER + " is already querying") : (this.userQuerying = !0, this.userTempList = [], this.fetchUserListWithPage(0, e || 0), this.logger.info(n.ZEGO_RTM_ACTION.USER_FETCH_USER + " the first time call"));}, e.prototype.fetchUserListWithPage = function (e, t) {var r = this,o = function o(e) {"PRIVATE" == r.stateCenter.type ? r.handleFetchUserListPrivateRsp(e) : r.handleFetchUserListRsp(e, t);};"PRIVATE" == this.stateCenter.type && (this.room.roomID, this.room.roomSid, this.room.roomSessionID), "V1" === s.ROOMVERSION ? this.service.fetchUserList({ user_index: e, sort_type: 0 }, o, o, this.room.sessionID, this.room.roomID, this.room.roomSessionID) : this.service.fetchUserListV2({ marker: 0 === e ? "" : e + "", mode: 0, limit: 100 }, o, o, this.room.sessionID, this.room.roomID, this.room.roomSessionID);}, e.prototype.handleFetchUserListRsp = function (e, t) {var r = this;if (e.body && 0 != e.body.err_code) return this.userQuerying = !1, this.lastUserQueryTime = Date.now() + this.userListInterval, void this.logger.info(n.ZEGO_RTM_ACTION.USER_FETCH_USER_RSP + " fetch error " + e.body.err_code);if (!e.header || !e.body) return this.userQuerying = !1, this.lastUserQueryTime = Date.now() + this.userListInterval, void this.logger.info(n.ZEGO_RTM_ACTION.USER_FETCH_USER_RSP + " fetch error " + e);if (this.stateCenter.userStateUpdate) {this.userTempList = o(this.userTempList, e.body.user_baseinfos);var a = e.body.ret_user_index;if (a != e.body.server_user_index) return this.logger.info(n.ZEGO_RTM_ACTION.USER_FETCH_USER_RSP + " fetch another page"), void this.fetchUserListWithPage(a + 1, t);this.userSeq = e.body.server_user_seq;for (var l = [], u = [], _ = 0; _ < this.userTempList.length; _++) {var d = { userID: this.userTempList[_].id_name, userName: this.userTempList[_].nick_name, role: this.userTempList[_].role };l.push(d), u.push({ idName: this.userTempList[_].id_name, nickName: this.userTempList[_].nick_name, role: this.userTempList[_].role });}this.stateCenter.actionListener("_getTotalUserList", this.room.roomID, u), t == s.ENUM_RUN_STATE.login ? (this.userList && i.ClientUtil.mergeUserList(this.logger, this.userList, l, function (e, t) {0 !== e.length && r.onUserStateUpdate(r.room.roomID, "ADD", e), 0 !== t.length && r.onUserStateUpdate(r.room.roomID, "DELETE", t);}), this.userList = l) : (this.userList = l, 0 !== l.length && this.onUserStateUpdate(this.room.roomID, "ADD", l)), this.userQuerying = !1, this.lastUserQueryTime = Date.now() + this.userListInterval, this.userTempList = [], this.logger.info(n.ZEGO_RTM_ACTION.USER_FETCH_USER_RSP + " call success user_list " + l + " count " + l.length);}}, e.prototype.handlePushUserStateUpdateMsg = function (e) {if (this.logger.info(n.ZEGO_RTM_ACTION.USER_USER_PUSH + " call"), this.stateCenter.userStateUpdate) {if (this.userSeq !== e.body.user_list_seq) {if (this.userSeq + e.body.user_actions.length === e.body.user_list_seq) {this.userSeq = e.body.user_list_seq;var t,r,o = [];if ("PRIVATE" == this.stateCenter.type) {t = 0, r = 1;for (var s = 0; s < e.body.user_actions.length; s++) {var i = { action: e.body.user_actions[s].action, idName: e.body.user_actions[s].user_id, nickName: e.body.user_actions[s].user_name, role: e.body.user_actions[s].role, loginTime: e.body.user_actions[s].login_time };o.push(i);}} else {for (t = 1, r = 2, s = 0; s < e.body.user_actions.length; s++) {i = { action: e.body.user_actions[s].Action, idName: e.body.user_actions[s].IdName, nickName: e.body.user_actions[s].NickName, role: e.body.user_actions[s].Role, loginTime: e.body.user_actions[s].LoginTime }, o.push(i);}this.stateCenter.actionListener("_userStateUpdate", e.body.room_id, o);}var a = [],l = [];o.forEach(function (e) {e.action == t ? a.push({ userID: e.idName, userName: e.nickName, role: e.role }) : e.action == r && l.push({ userID: e.idName, userName: e.nickName, role: e.role });}), this.userList && (this.userList = this.userList.concat(a).filter(function (e) {return !l.some(function (t) {return t.userID == e.userID;});})), 0 !== a.length && this.onUserStateUpdate(e.body.room_id || e.body.room_pushheader.room_id, "ADD", a), 0 !== l.length && this.onUserStateUpdate(e.body.room_id || e.body.room_pushheader.room_id, "DELETE", l), this.logger.info(n.ZEGO_RTM_ACTION.USER_USER_PUSH + " call success");} else this.mergeUserByUserSeq(e.body.user_list_seq, e.body.user_actions);} else this.logger.warn(n.ZEGO_RTM_ACTION.USER_USER_PUSH + " user_list_seq is the same with local seq");} else this.logger.info(n.ZEGO_RTM_ACTION.USER_USER_PUSH + " userStateUpdate is false");}, e.prototype.onUserStateUpdate = function (e, t, r) {var o = this,i = s.getReportSeq();this.dataReport.newReport(i, a.ZegoRTMLogEvent.kZegoTaskLiveRoomGetUserUpdateInfo.event);var n = r.filter(function (e) {return e.userID !== o.stateCenter.idName;});0 != n.length && ("PRIVATE" !== this.stateCenter.type && (n = n.map(function (e) {return { userID: e.userID, userName: e.userName };})), this.stateCenter.actionListener("roomUserUpdate", e, t, n), this.dataReport.addMsgInfo(i, { user_update_type: "ADD" == t ? a.ZegoRTMLogEvent.kZegoTaskLiveRoomGetUserUpdateInfo.user_update_type("added") : a.ZegoRTMLogEvent.kZegoTaskLiveRoomGetUserUpdateInfo.user_update_type("deleted") }), this.dataReport.uploadReport(i));}, e.prototype.mergeUserByUserSeq = function (e, t) {var r = this;this.userSeqMergeMap || (this.logger.warn(n.ZEGO_RTM_ACTION.USER_MERGE_SEQ + " new merge userlist " + this.userSeq + " server " + e), this.userSeqMergeMap = {}, this.userSeqMergeTimer && clearTimeout(this.userSeqMergeTimer), this.userSeqMergeTimer = setTimeout(function () {r.handleMergeTimeout();}, this.userListMergeInterval)), this.userSeqMergeMap[e] = t, this.logger.warn(n.ZEGO_RTM_ACTION.USER_MERGE_SEQ + "  merge userlist " + this.userSeq + " server " + e + " userlist " + t.length);}, e.prototype.mergeUser = function (e) {var t = this;this.logger.info(n.ZEGO_RTM_ACTION.USER_MERGE + " merge userlist " + this.userSeq + " userSeqList " + e.join(",")), this.userSeq = e[e.length - 1], this.lastUserQueryTime = Date.now() + this.userListInterval;var r = {};e.forEach(function (e) {t.userSeqMergeMap && t.userSeqMergeMap[e].forEach(function (e) {r[e.IdName] = e;});}), this.userSeqMergeMap = null;var o = Object.values(r).map(function (e) {return { action: e.Action, idName: e.IdName, nickName: e.NickName, role: e.Role, loginTime: e.LoginTime ? String(e.LoginTime) : "" };});o.sort(function (e, t) {return e.loginTime.localeCompare(t.loginTime);});var s = [],i = [];o.forEach(function (e) {1 == e.action ? s.push({ userID: e.idName, userName: e.nickName, role: e.role }) : 2 == e.action && i.push({ userID: e.idName, userName: e.nickName, role: e.role });}), this.userList = this.userList && this.userList.concat(s).filter(function (e) {return !i.some(function (t) {return t.userID == e.userID;});}), 0 !== s.length && this.onUserStateUpdate(this.room.roomID, "ADD", s), 0 !== i.length && this.onUserStateUpdate(this.room.roomID, "DELETE", i), this.stateCenter.actionListener("_userStateUpdate", this.room.roomID, o);}, e.prototype.handleMergeTimeout = function () {var e = this,t = Object.keys(this.userSeqMergeMap).map(function (e) {return +e;}).sort(function (e, t) {return e - t;});if (t[t.length - 1] - t[0] + 1 === t.length || t[t.length - 1] >= this.minUserSeq) this.mergeUser(t);else {this.userSeqMergeMap = null;var r = this.lastUserQueryTime - Date.now();this.logger.info(n.ZEGO_RTM_ACTION.USER_MERGE_TIMEOUT + "  fetch merge userlist " + this.userSeq + " userSeqList " + t.join(",") + " wait " + r), r > 0 ? (this.userQueryTimer && clearTimeout(this.userQueryTimer), this.userQueryTimer = setTimeout(function () {e.fetchUserList();}, r)) : this.fetchUserList();}}, e.prototype.loginPrivateRsp = function (e) {this.logger.info(n.ZEGO_RTM_ACTION.USER_FETCH_USER, " userStateUpdate " + this.stateCenter.userStateUpdate), this.stateCenter.userStateUpdate && this.fetchUserList();}, e.prototype.handleFetchUserListPrivateRsp = function (e) {if (this.logger.debug(n.ZEGO_RTM_ACTION.USER_FETCH_USER + " call"), e.body.code && 0 !== e.body.code) return this.userQuerying = !1, void this.logger.info(n.ZEGO_RTM_ACTION.USER_FETCH_USER + " fetch error " + e.body.code + " " + e.body.message);if (this.stateCenter.userStateUpdate) {this.userTempList = o(this.userTempList, e.body.users), this.userSeq = e.body.userlist_seq, this.logger.info(n.ZEGO_RTM_ACTION.USER_FETCH_USER + " set user Seq " + this.userSeq);for (var t = [], r = 0; r < this.userTempList.length; r++) {var s = { userID: this.userTempList[r].user_id, userName: this.userTempList[r].user_name, role: this.userTempList[r].role };t.push(s);}this.userQuerying = !1, this.onUserStateUpdate(this.room.roomID, "ADD", t), this.userTempList = [], this.logger.info(n.ZEGO_RTM_ACTION.USER_FETCH_USER + " call success user_list " + t + " count " + t.length);}}, e;}();t.UserHandler = l;}, function (e, t, r) {"use strict";var o = this && this.__assign || function () {return (o = Object.assign || function (e) {for (var t, r = 1, o = arguments.length; r < o; r++) {for (var s in t = arguments[r]) {Object.prototype.hasOwnProperty.call(t, s) && (e[s] = t[s]);}}return e;}).apply(this, arguments);},s = this && this.__spreadArrays || function () {for (var e = 0, t = 0, r = arguments.length; t < r; t++) {e += arguments[t].length;}var o = Array(e),s = 0;for (t = 0; t < r; t++) {for (var i = arguments[t], n = 0, a = i.length; n < a; n++, s++) {o[s] = i[n];}}return o;};Object.defineProperty(t, "__esModule", { value: !0 }), t.LiveRoomService = void 0;var i = r(0),n = r(11),a = r(2),l = r(1),u = function () {function e(e, t) {this.stateCenter = e, this.logger = t, this.service = new n.ZegoSocketService(this.stateCenter.ENV), this.cmdSeq = 0, this.responseRouters = {};}return e.prototype.checkResponse = function (e) {return e.header.appid !== this.stateCenter.appid || e.header.user_id !== this.stateCenter.userid;}, e.prototype.handleSendCommandMsgRsp = function (e) {var t = this,r = this.service.sendCommandMap[e.header.seq];if (null != r) {var o = r._data;delete this.service.sendCommandMap[e.header.seq], this.service.sendCommandList.remove(r), 0 === e.body.err_code ? setTimeout(function () {o && null != o.success && o.success(e, t.cmdSeq);}, 0) : setTimeout(function () {o && null != o.error && o.error(e, t.cmdSeq);}, 0);}}, e.prototype.onPush = function () {var e = this;this.service.onMessage = function (t) {t instanceof ArrayBuffer ? e.stateCenter.actionListener("_protobufResponse", t) : t.header ? (0 !== t.body.err_code ? t.body.err_message && e.logger.error(a.ZEGO_RTM_ACTION.SERVICE_PUSH + " cmd=" + t.header.cmd + ", err_code=" + t.body.err_code + ", err_message=" + t.body.err_message + " ") : e.logger.info(a.ZEGO_RTM_ACTION.SERVICE_PUSH + " cmd=" + t.header.cmd + ", msg=" + JSON.stringify(t) + " "), ["login", "logout"].indexOf(t.header.cmd) > -1 ? e.handleSendCommandMsgRsp(t) : e.checkResponse(t) ? e.logger.error(a.ZEGO_RTM_ACTION.SERVICE_PUSH + "  check session fail.") : (e.logger.info(a.ZEGO_RTM_ACTION.SERVICE_PUSH + " cmd=" + t.header.cmd + ",function=" + !!e.responseRouters[t.header.cmd]), e.handleSendCommandMsgRsp(t), e.responseRouters[t.header.cmd] && e.responseRouters[t.header.cmd](t, e.cmdSeq))) : e.logger.error(a.ZEGO_RTM_ACTION.SERVICE_PUSH + " msg type error ");};}, e.prototype.handlePushKickout = function (e) {var t, r, o, i;if ((null === (t = null == e ? void 0 : e.body) || void 0 === t ? void 0 : t.protocol) && 1 != (null === (r = null == e ? void 0 : e.body) || void 0 === r ? void 0 : r.protocol)) {var n = null === (o = null == e ? void 0 : e.header) || void 0 === o ? void 0 : o.room_id,l = this.stateCenter.roomModulesList.find(function (e) {return e.roomID == n;});if (!l) return void this.logger.error(a.ZEGO_RTM_ACTION.SERVICE_PUSH + " room no found ignore " + JSON.stringify(null === (i = e.header) || void 0 === i ? void 0 : i.room_id));l.roomHandler.handlePushKickout(e);} else s(this.stateCenter.roomModulesList).forEach(function (t) {return t.roomHandler.handlePushKickout(e, !0);});}, e.prototype.handlePushCustomMsg = function (e) {var t,r = null === (t = null == e ? void 0 : e.header) || void 0 === t ? void 0 : t.room_id,o = this.stateCenter.roomModulesList.find(function (e) {return e.roomID == r;});o ? o.messageHandler.handlePushCustomMsg(e) : this.logger.error(a.ZEGO_RTM_ACTION.SERVICE_PUSH + " room no found ignore " + JSON.stringify(e));}, e.prototype.handlePushRoomMsg = function (e) {var t,r = null === (t = null == e ? void 0 : e.header) || void 0 === t ? void 0 : t.room_id,o = this.stateCenter.roomModulesList.find(function (e) {return e.roomID == r;});o ? o.messageHandler.handlePushRoomMsg(e) : this.logger.error(a.ZEGO_RTM_ACTION.SERVICE_PUSH + " room no found ignore " + JSON.stringify(e));}, e.prototype.handlePushUserStateUpdateMsg = function (e) {var t,r = null === (t = null == e ? void 0 : e.header) || void 0 === t ? void 0 : t.room_id,o = this.stateCenter.roomModulesList.find(function (e) {return e.roomID == r;});o ? o.userHandler.handlePushUserStateUpdateMsg(e) : this.logger.error(a.ZEGO_RTM_ACTION.SERVICE_PUSH + " room no found ignore " + JSON.stringify(e));}, e.prototype.handlePushMergeMsg = function (e) {var t,r = null === (t = null == e ? void 0 : e.header) || void 0 === t ? void 0 : t.room_id,o = this.stateCenter.roomModulesList.find(function (e) {return e.roomID == r;});o ? o.messageHandler.handlePushMergeMsg(e) : this.logger.error(a.ZEGO_RTM_ACTION.SERVICE_PUSH + " room no found ignore " + JSON.stringify(e));}, e.prototype.handlePushTransMsg = function (e) {var t,r = null === (t = null == e ? void 0 : e.header) || void 0 === t ? void 0 : t.room_id,o = this.stateCenter.roomModulesList.find(function (e) {return e.roomID == r;});o ? o.messageHandler.handlePushTransMsg(e) : this.logger.error(a.ZEGO_RTM_ACTION.SERVICE_PUSH + " room no found ignore " + JSON.stringify(e));}, e.prototype.handleBigImMsgRsp = function (e) {var t,r = null === (t = null == e ? void 0 : e.header) || void 0 === t ? void 0 : t.room_id,o = this.stateCenter.roomModulesList.find(function (e) {return e.roomID == r;});o ? o.messageHandler.handleBigImMsgRsp(e) : this.logger.error(a.ZEGO_RTM_ACTION.SERVICE_PUSH + " room no found ignore " + JSON.stringify(e));}, e.prototype.handlePushSignalMsg = function (e) {var t,r = null === (t = null == e ? void 0 : e.header) || void 0 === t ? void 0 : t.room_id,o = this.stateCenter.roomModulesList.find(function (e) {return e.roomID == r;});o ? o.liveHandler.handlePushSignalMsg(e) : this.logger.error(a.ZEGO_RTM_ACTION.SERVICE_PUSH + " room no found ignore " + JSON.stringify(e));}, e.prototype.closeHandler = function (e) {this.service.closeHandler(e);}, e.prototype.openHandler = function (e) {this.service.openHandler(e);}, e.prototype.errorHandler = function (e) {this.service.errorHandler(e);}, e.prototype.getHeader = function (e, t, r, o) {return { Protocol: "V1" === i.ROOMVERSION ? "req" : "req_v2", cmd: e, appid: this.stateCenter.appid, seq: ++this.cmdSeq, user_id: this.stateCenter.userid, session_id: t || "", room_id: r || "", room_session_id: o || "", biz_version: this.stateCenter.bizVersion || "" };}, e.prototype.startCheck = function () {this.service.startCheck();}, e.prototype.stopCheck = function () {this.service.stopCheck();}, e.prototype.isDisConnect = function () {return !this.service || this.service.isDisConnect();}, e.prototype.createSocket = function (e) {var t = this;this.service.createSocket(e), this.responseRouters = o(o({}, this.responseRouters), { push_kickout: function push_kickout(e) {t.handlePushKickout(e);}, push_custommsg: function push_custommsg(e) {t.handlePushCustomMsg(e);}, push_im_chat: function push_im_chat(e) {t.handlePushRoomMsg(e);}, push_userlist_update: function push_userlist_update(e) {t.handlePushUserStateUpdateMsg(e);}, push_merge_message: function push_merge_message(e) {t.handlePushMergeMsg(e);}, push_trans: function push_trans(e) {t.handlePushTransMsg(e);}, push_signal: function push_signal(e) {t.handlePushSignalMsg(e);} });}, e.prototype.closeSocket = function () {this.service.closeSocket();}, e.prototype.sendMessage = function (e, t, r, o, s, i) {var n, u, _;if (this.service.isDisConnect()) return this.logger.error(a.ZEGO_RTM_ACTION.SERVICE_SEND + " socket is disconnect"), o(l.errorCodeList.SOCKET_CLOSE), 0;var d = (null == i ? void 0 : i.roomID) ? i.roomID : null === (n = this.stateCenter.roomModulesList[0]) || void 0 === n ? void 0 : n.roomID,c = (null == i ? void 0 : i.roomSessionID) ? i.roomSessionID : null === (u = this.stateCenter.roomModulesList[0]) || void 0 === u ? void 0 : u.roomSessionID,g = (null == i ? void 0 : i.sessionID) ? i.sessionID : null === (_ = this.stateCenter.roomModulesList[0]) || void 0 === _ ? void 0 : _.sessionID,h = s || this.getHeader(e, g, d, c);return this.logger.info(a.ZEGO_RTM_ACTION.SERVICE_SEND + " sendMsg:" + JSON.stringify({ header: h, body: t })), this.service.sendMessage(h, t, r, o);}, e.prototype.on = function (e, t) {this.responseRouters[e] = t;}, e.prototype.login = function (e, t, r) {var o = this.getHeader(e.isMulti ? "enter" : "login", e.sessionID, e.roomID, e.roomSessionID),s = { id_name: this.stateCenter.idName, nick_name: this.stateCenter.nickName, role: this.stateCenter.role, token: e.token, version: this.stateCenter.sdKVersion, room_name: e.roomID, user_state_flag: this.stateCenter.userStateUpdate ? 1 : 0, room_create_flag: this.stateCenter.roomCreateFlag, client_type: 0 === this.stateCenter.ENV ? i.E_CLIENT_TYPE.ClientType_Webrtc : i.E_CLIENT_TYPE.ClientType_SmallProgram, third_token: e.thirdToken, user_count_limit: this.stateCenter.maxMemberCount, relate_service: this.stateCenter.relateService.join() || "", login_logic: this.stateCenter.isMultiRoom ? 3 : 1 };return this.sendMessage("", s, t, r, o);}, e.prototype.logout = function (e, t, r) {var o = e.isMulti ? "quit" : "logout",s = { reserve: 0 };return "logout" == o && (s.login_logic = this.stateCenter.isMultiRoom ? 3 : 1), this.sendMessage(o, s, t, r, void 0, { sessionID: e.sessionID, roomID: e.roomID, roomSessionID: e.roomSessionID });}, e.prototype.heartBeat = function (e, t, r, o, s) {return this.sendMessage("hb", { reserve: 0 }, e, t, void 0, { sessionID: r, roomID: o, roomSessionID: s });}, e.prototype.fetchUserList = function (e, t, r, o, s, i) {return this.sendMessage("user_list", e, t, r, void 0, { sessionID: o, roomID: s, roomSessionID: i });}, e.prototype.fetchUserListV2 = function (e, t, r, o, s, i) {return this.sendMessage("user_list_v2", e, t, r, void 0, { sessionID: o, roomID: s, roomSessionID: i });}, e.prototype.fetchReliableMessage = function (e, t, r, o, s, i) {return this.sendMessage("trans_fetch", e, t, r, void 0, { sessionID: o, roomID: s, roomSessionID: i });}, e.prototype.sendReliableMessage = function (e, t, r, o, s, i) {return this.sendMessage("trans", e, t, r, void 0, { sessionID: o, roomID: s, roomSessionID: i });}, e.prototype.sendRoomMsg = function (e, t, r, o, s, i) {return this.sendMessage("im_chat", e, t, r, void 0, { sessionID: o, roomID: s, roomSessionID: i });}, e.prototype.sendCustomCommand = function (e, t, r, o, s, i) {return this.sendMessage("custommsg", e, t, r, void 0, { sessionID: o, roomID: s, roomSessionID: i });}, e.prototype.sendBigRoomMessage = function (e, t, r, o, s, i) {return this.sendMessage("bigim_chat", e, t, r, void 0, { sessionID: o, roomID: s, roomSessionID: i });}, e.prototype.sendRelayMessage = function (e, t, r, o, s, i) {return this.sendMessage("relay", e, t, r, void 0, { sessionID: o, roomID: s, roomSessionID: i });}, e.prototype.sendSignalCmd = function (e, t, r, o, s, i) {return this.sendMessage("signal", e, t, r, void 0, { sessionID: o, roomID: s, roomSessionID: i });}, e.prototype.sendPB = function (e) {return this.service.isDisConnect() ? (this.logger.error(a.ZEGO_RTM_ACTION.ZEGOEXPRESSWEBRTM_SEND_PB + " socket is disconnected"), !1) : this.service.sendPB(e);}, e;}();t.LiveRoomService = u;}, function (e, t, r) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.ZegoSocketService = void 0;var o = r(0),s = r(1),i = function () {function e(e) {this.socket = null, this.sendCommandList = new o.LinkedList(), this.sendCommandMap = {}, this.sendDataCheckOnceCount = 100, this.sendDataDropTimeout = 1e4, this.sendDataCheckInterval = 2e3, this.ENV = e;}return e.prototype.createSocket = function (e) {this.socket = o.createZegoWebSocket(e, this.ENV % 2);}, e.prototype.closeSocket = function () {this.socket && (this.socket.onclose = null, this.socket.onerror = null, this.socket.close(), this.socket = null);}, e.prototype.isDisConnect = function () {return !this.socket || 1 !== this.socket.readyState;}, e.prototype.sendMessage = function (e, t, r, o, s) {void 0 === r && (r = null), void 0 === o && (o = null), void 0 === s && (s = { timeOut: 6e3 });var i = { header: e, body: t },n = { data: i, seq: e.seq, deleted: !1, sendTime: Date.parse(new Date() + ""), timeOut: s.timeOut, success: r, error: o },a = this.sendCommandList.push(n);return this.sendCommandMap[n.seq] = a, this.socket && this.socket.send(JSON.stringify(i)), e.seq;}, e.prototype.sendPB = function (e) {return this.socket && this.socket.send(e), !0;}, e.prototype.checkSendMessageList = function (e) {for (var t = e.getFirst(), r = function r() {if (e.remove(t), t && t._data) {var r = t._data.error,o = t._data.seq,i = t._data.data.body.custom_msg;setTimeout(function () {r && r(s.errorCodeList.NOT_LOGIN, o, i);}, 0);}t = e.getFirst();}; null != t;) {r();}}, e.prototype.checkMessageListTimeout = function (e, t) {for (var r = e.getFirst(), o = Date.parse(new Date() + ""), i = 0, n = function n() {if (r._data && r._data.sendTime + r._data.timeOut > o) return "break";if (r._data && delete t[r._data.data.header.seq], e.remove(r), r._data && null == r._data.error || r._data && r._data.sendTime + a.sendDataDropTimeout < o) ;else if (r && r._data) {var n = r._data.error,l = r._data.seq,u = r._data.data.body.custom_msg;setTimeout(function () {n && n(s.errorCodeList.TIMEOUT, l, u);}, 0);}if (++i >= a.sendDataCheckOnceCount) return "break";r = e.getFirst();}, a = this; null != r && "break" !== n();) {;}}, e.prototype.startCheck = function () {var e = this;this.checkMessageListTimeout(this.sendCommandList, this.sendCommandMap), this.sendDataCheckTimer = setTimeout(function () {e.startCheck();}, this.sendDataCheckInterval);}, e.prototype.stopCheck = function () {this.checkSendMessageList(this.sendCommandList), this.sendCommandMap = {}, clearTimeout(this.sendDataCheckTimer);}, e.prototype.openHandler = function (e) {var t = this;this.socket && (this.socket.onopen = function (r) {t.socket.binaryType = "arraybuffer", t.responseHandler(), e(r);});}, e.prototype.responseHandler = function () {var e = this;this.socket && (this.socket.onmessage = function (t) {var r = "string" == typeof t.data ? JSON.parse(t.data) : t.data;e.onMessage(r);});}, e.prototype.closeHandler = function (e) {this.socket && (this.socket.onclose = function (t) {e(t);});}, e.prototype.errorHandler = function (e) {this.socket && (this.socket.onerror = e);}, e.prototype.onMessage = function (e) {}, e;}();t.ZegoSocketService = i;}, function (e, t, r) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.ZegoExpressWebRTM = t.ZegoDataReport = t.ZegoLogger = t.getSeq = t.getReportSeq = t.ZegoExpressWebRTMEngine = void 0;var o = r(13);Object.defineProperty(t, "ZegoExpressWebRTM", { enumerable: !0, get: function get() {return o.ZegoExpressWebRTM;} });var s = r(0),i = function () {function e(t, r, i) {void 0 === i && (i = 0), this.logger = new s.ZegoLogger(i), this.dataReport = new s.ZegoDataReport(this.logger), this.zegoWebRTM = new o.ZegoExpressWebRTM(t, r, this.logger, this.dataReport, e.version, i);}return e.prototype.loginRoom = function (e, t, r, o) {return this.zegoWebRTM.loginRoom(e, t, r, o);}, e.prototype.logoutRoom = function (e) {return this.zegoWebRTM.logoutRoom(e);}, e.prototype.renewToken = function (e, t) {return this.zegoWebRTM.renewToken(e, t);}, e.prototype.sendBarrageMessage = function (e, t) {return this.zegoWebRTM.sendBarrageMessage(e, t);}, e.prototype.sendBroadcastMessage = function (e, t) {return this.zegoWebRTM.sendBroadcastMessage(e, t);}, e.prototype.sendCustomCommand = function (e, t, r) {return this.zegoWebRTM.sendCustomCommand(e, t, r);}, e.prototype.setRoomExtraInfo = function (e, t, r) {return this.zegoWebRTM.setRoomExtraInfo(e, t, r);}, e.prototype.setLogConfig = function (e) {return this.zegoWebRTM.setLogConfig(e);}, e.prototype.setDebugVerbose = function (e) {return this.zegoWebRTM.setDebugVerbose(e);}, e.prototype.on = function (e, t) {return this.zegoWebRTM.on(e, t);}, e.prototype.getVersion = function () {return this.zegoWebRTM.getVersion();}, e.prototype.off = function (e, t) {return this.zegoWebRTM.off(e, t);}, e.prototype.loginHall = function (e, t, r) {return this.zegoWebRTM.loginHall(e, t, r);}, e.prototype.logoutHall = function () {return this.zegoWebRTM.logoutHall();}, e.prototype.enterRoom = function (e, t) {return this.zegoWebRTM.enterRoom(e, t);}, e.prototype.leaveRoom = function () {return this.zegoWebRTM.leaveRoom();}, e.prototype.sendRelayMessage = function (e, t, r, o) {this.zegoWebRTM.sendRelayMessage(e, t, r, o);}, e.prototype.requestJoinLive = function (e, t, r, o) {return this.zegoWebRTM.requestJoinLive(e, t, r, o);}, e.prototype.inviteJoinLive = function (e, t, r, o) {return this.zegoWebRTM.inviteJoinLive(e, t, r, o);}, e.prototype.endJoinLive = function (e, t, r) {return this.zegoWebRTM.endJoinLive(e, t, r);}, e.prototype.respondJoinLive = function (e, t, r, o) {return this.zegoWebRTM.respondJoinLive(e, t, r, o);}, e.prototype.enableMultiRoom = function (e) {return this.zegoWebRTM.enableMultiRoom(e);}, e.version = s.PROTO_VERSION, e;}();t.ZegoExpressWebRTMEngine = i;var n = r(0);Object.defineProperty(t, "getReportSeq", { enumerable: !0, get: function get() {return n.getReportSeq;} }), Object.defineProperty(t, "getSeq", { enumerable: !0, get: function get() {return n.getSeq;} }), Object.defineProperty(t, "ZegoLogger", { enumerable: !0, get: function get() {return n.ZegoLogger;} }), Object.defineProperty(t, "ZegoDataReport", { enumerable: !0, get: function get() {return n.ZegoDataReport;} });}, function (e, t, r) {"use strict";var o = this && this.__awaiter || function (e, t, r, o) {return new (r || (r = Promise))(function (s, i) {function n(e) {try {l(o.next(e));} catch (e) {i(e);}}function a(e) {try {l(o.throw(e));} catch (e) {i(e);}}function l(e) {var t;e.done ? s(e.value) : (t = e.value, t instanceof r ? t : new r(function (e) {e(t);})).then(n, a);}l((o = o.apply(e, t || [])).next());});},s = this && this.__generator || function (e, t) {var r,o,s,i,n = { label: 0, sent: function sent() {if (1 & s[0]) throw s[1];return s[1];}, trys: [], ops: [] };return i = { next: a(0), throw: a(1), return: a(2) }, "function" == typeof Symbol && (i[Symbol.iterator] = function () {return this;}), i;function a(i) {return function (a) {return function (i) {if (r) throw new TypeError("Generator is already executing.");for (; n;) {try {if (r = 1, o && (s = 2 & i[0] ? o.return : i[0] ? o.throw || ((s = o.return) && s.call(o), 0) : o.next) && !(s = s.call(o, i[1])).done) return s;switch (o = 0, s && (i = [2 & i[0], s.value]), i[0]) {case 0:case 1:s = i;break;case 4:return n.label++, { value: i[1], done: !1 };case 5:n.label++, o = i[1], i = [0];continue;case 7:i = n.ops.pop(), n.trys.pop();continue;default:if (!((s = (s = n.trys).length > 0 && s[s.length - 1]) || 6 !== i[0] && 2 !== i[0])) {n = 0;continue;}if (3 === i[0] && (!s || i[1] > s[0] && i[1] < s[3])) {n.label = i[1];break;}if (6 === i[0] && n.label < s[1]) {n.label = s[1], s = i;break;}if (s && n.label < s[2]) {n.label = s[2], n.ops.push(i);break;}s[2] && n.ops.pop(), n.trys.pop();continue;}i = t.call(e, n);} catch (e) {i = [6, e], o = 0;} finally {r = s = 0;}}if (5 & i[0]) throw i[1];return { value: i[0] ? i[1] : void 0, done: !0 };}([i, a]);};}},i = this && this.__spreadArrays || function () {for (var e = 0, t = 0, r = arguments.length; t < r; t++) {e += arguments[t].length;}var o = Array(e),s = 0;for (t = 0; t < r; t++) {for (var i = arguments[t], n = 0, a = i.length; n < a; n++, s++) {o[s] = i[n];}}return o;};Object.defineProperty(t, "__esModule", { value: !0 }), t.ZegoExpressWebRTM = void 0;var n = r(0),a = r(1),l = r(3),u = r(0),_ = r(16),d = r(17),c = r(18),g = r(19),h = r(21),E = r(2),p = r(4),T = r(24),m = r(10),R = r(25),S = function () {function e(e, t, r, o, s, i) {this.logger = r, this.dataReport = o, this.version = s, this.stateCenter = new c.StateCenter(this.logger, this.dataReport), this.stateCenter.ENV = i;var a = u.getReportSeq();if (this.dataReport.newReport(a), (0 == i || 1 == i) && this.setDebug(t), l.ClientUtil.checkConfigParam(e, t, this.logger)) {if (this.stateCenter.appid = e, this.stateCenter.configOK = !0, this.stateCenter.sdKVersion = this.version, 0 == i || 1 == i ? ("string" == typeof t ? (this.stateCenter.server = t, this.stateCenter.serverBak = t) : Array.isArray(t) && t.length > 0 && (this.stateCenter.server = t[0], this.stateCenter.serverBak = t[1] || t[0]), this.service = new m.LiveRoomService(this.stateCenter, this.logger)) : 2 != i && 3 != i || (this.service = new R.LiveRoomPrivateService(this.stateCenter, this.logger), this.module = new h.LiveRoomModules(this.stateCenter, this.logger, this.dataReport, this.service), this.stateCenter.priModules = this.module, this.module.dispatchServer = t, this.stateCenter.type = "PRIVATE"), 0 == i || 2 == i) this.bindWindowListener(), this.logger.info(E.ZEGO_RTM_ACTION.ZEGOEXPRESSWEBRTM_CONSTRUCTOR + "  " + navigator.appVersion), this.stateCenter.networkState = navigator ? navigator.onLine ? n.ENUM_NETWORK_STATE.online : n.ENUM_NETWORK_STATE.offline : n.ENUM_NETWORK_STATE.online, this.dataReport.addMsgInfo(a, { system_info: p.ZegoRTMLogEvent.kZegoTaskInitSetting.system_info });else if (1 == i || 3 == i) {this.bindWxListener();try {var _ = wx.getSystemInfoSync(),d = { brand: _.brand, model: _.model, system: _.system, platform: _.platform, version: _.version, SDKVersion: _.SDKVersion };this.dataReport.addMsgInfo(a, { system_info: d });} catch (e) {this.logger.warn(E.ZEGO_RTM_ACTION.ZEGOEXPRESSWEBRTM_CONSTRUCTOR + " get system info error");}}this.logger.setSessionInfo(this.stateCenter.appid, "", "", "", "", this.version);} else this.logger.error(E.ZEGO_RTM_ACTION.ZEGOEXPRESSWEBRTM_CONSTRUCTOR + " init sdk error"), this.dataReport.addMsgInfo(a, p.ZegoRTMLogEvent.kZegoTaskInitSetting.error.kInvalidParamError);this.dataReport.uploadReport(a, p.ZegoRTMLogEvent.kZegoTaskInitSetting.event);}return Object.defineProperty(e.prototype, "modules", { get: function get() {return { service: this.service };}, enumerable: !1, configurable: !0 }), e.prototype.bindWindowListener = function () {var e = this,t = navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPhone/i),r = l.ClientUtil.getBrowser(),o = t ? "pagehide" : "Firefox" === r ? "beforeunload" : "unload";window.addEventListener(o, function () {e.logger.info(E.ZEGO_RTM_ACTION.ZEGOEXPRESSWEBRTM_BIND_WINDOW_LISTENER + " " + o), "PUBLIC" === e.stateCenter.type ? e.logoutRoom() : (e.leaveRoom(), e.logoutHall()), e.logoutRoom();}), window.addEventListener("offline", function () {e.netOffLineHandle();}), window.addEventListener("online", function () {e.netOnLineHandle();});}, e.prototype.bindWxListener = function () {var e = this;wx.onNetworkStatusChange(function (t) {t.isConnected ? e.netOnLineHandle() : e.netOffLineHandle();});}, e.prototype.netOnLineHandle = function () {var e = this;this.logger.info(E.ZEGO_RTM_ACTION.ZEGOEXPRESSWEBRTM_BIND_WINDOW_LISTENER + "network is online"), this.stateCenter.networkState = n.ENUM_NETWORK_STATE.online, this.stateCenter.roomModulesList.forEach(function (t) {t.roomTryHandler && e.service.isDisConnect() ? t.roomTryHandler.active() : t.roomTryHandler && (t.roomTryHandler.stopMaxTime(), t.roomHandler.roomStateHandle("CONNECTED", { code: 0, msg: "" }));});}, e.prototype.netOffLineHandle = function () {this.logger.info(E.ZEGO_RTM_ACTION.ZEGOEXPRESSWEBRTM_BIND_WINDOW_LISTENER + " network is broken"), this.stateCenter.networkState = n.ENUM_NETWORK_STATE.offline, this.stateCenter.roomModulesList.forEach(function (e) {e.roomTryHandler && (e.roomTryHandler.invalid(), e.roomTryHandler.onactive = function (t, r) {e.roomHandler.disconnectedHandle(r);}, e.roomTryHandler.startMaxTime(), e.roomHandler.roomStateHandle("CONNECTING", a.errorCodeList.NETWORK_BROKEN));});}, e.prototype.setLogConfig = function (e) {this.logger.info(E.ZEGO_RTM_ACTION.ZEGOEXPRESSWEBRTM_SET_LOG_CONFIG + " call");var t = u.getReportSeq();if (this.dataReport.newReport(t), e.logLevel && ["debug", "info", "warn", "error", "report", "disable"].includes(e.logLevel) && (this.logger.setLogLevel(e.logLevel), this.dataReport.addMsgInfo(t, { log_level: p.ZegoRTMLogEvent.kZegoTaskSetLog.log_level(e.logLevel) })), e.remoteLogLevel && ["debug", "info", "warn", "error", "report", "disable"].includes(e.remoteLogLevel) && (this.logger.setRemoteLogLevel(e.remoteLogLevel), this.dataReport.addMsgInfo(t, { remote_log_level: p.ZegoRTMLogEvent.kZegoTaskSetLog.remote_log_level(e.remoteLogLevel) })), "string" == typeof e.logURL && (e.logURL.startsWith("wss://") || e.logURL.startsWith("https://"))) this.logger.setLogServer(e.logURL), this.dataReport.addMsgInfo(t, { log_url: p.ZegoRTMLogEvent.kZegoTaskSetLog.log_url(e.logURL) }), this.dataReport.uploadReport(t, p.ZegoRTMLogEvent.kZegoTaskSetLog.event);else if (e.logURL) return this.logger.error(E.ZEGO_RTM_ACTION.ZEGOEXPRESSWEBRTM_SET_LOG_CONFIG + "log url must be a wss or https url"), this.dataReport.addMsgInfo(t, p.ZegoRTMLogEvent.kZegoTaskSetLog.error.kInvalidParamError), this.dataReport.uploadReport(t, p.ZegoRTMLogEvent.kZegoTaskSetLog.event), !1;return this.logger.info(E.ZEGO_RTM_ACTION.ZEGOEXPRESSWEBRTM_SET_LOG_CONFIG + " call success"), !0;}, e.prototype.setDebugVerbose = function (e) {var t = u.getReportSeq();this.dataReport.newReport(t), "boolean" == typeof e && (this.stateCenter.debug = e, this.stateCenter.debugCustom = !0, this.dataReport.addMsgInfo(t, { debug: p.ZegoRTMLogEvent.kZegoTaskSetDebug.debug(e ? "true" : "false") })), this.dataReport.uploadReport(t, p.ZegoRTMLogEvent.kZegoTaskSetDebug.event), this.logger.info(E.ZEGO_RTM_ACTION.ZEGOEXPRESSWEBRTM_SET_DEBUG_VERBOSE + " call success");}, e.prototype.setDebug = function (e) {"string" == typeof e && e.indexOf("wss") > -1 ? this.stateCenter.debug = l.ClientUtil.isTestEnv(e) : Array.isArray(e) && e.length > 0 && e.every(function (e) {return "string" == typeof e && e.indexOf("wss") > -1;}) ? this.stateCenter.debug = l.ClientUtil.isTestEnv(e[0]) || l.ClientUtil.isTestEnv(e[1]) : this.logger.info(E.ZEGO_RTM_ACTION.ZEGOEXPRESSWEBRTM_CONSTRUCTOR + " server wrong"), this.stateCenter.testEnvironment = this.stateCenter.debug;}, e.prototype.renewToken = function (e, t) {var r,o = this,s = u.getReportSeq();if (this.dataReport.newReport(s), void 0 !== t && ("string" != typeof t || "" == t)) return this.logger.error(E.ZEGO_RTM_ACTION.ZEGOEXPRESSWEBRTM_RENEWTOKEN + " roomID must be string and no empty"), !1;var i = this.getRoomModules(t) || this.stateCenter.roomModulesList[0];return i ? "string" == typeof e && i.roomTryHandler ? (e === i.roomTryHandler.token ? this.logger.info(E.ZEGO_RTM_ACTION.ZEGOEXPRESSWEBRTM_RENEWTOKEN + " token has not changed") : this.stateCenter.configRoomAuth ? this.service.sendMessage("renew_token", { token: e }, function (t) {var r, s;null === (r = i.roomTryHandler) || void 0 === r || r.renewLocalToken(e, null === (s = null == t ? void 0 : t.body) || void 0 === s ? void 0 : s.token_remain_time), o.stateCenter.configCheckToken = !0, o.logger.info(E.ZEGO_RTM_ACTION.ZEGOEXPRESSWEBRTM_RENEWTOKEN + " " + JSON.stringify(t));}, function (t) {var r,s,n = null === (r = null == t ? void 0 : t.body) || void 0 === r ? void 0 : r.err_code;n && 1000002014 === n ? (o.stateCenter.configCheckToken = !1, null === (s = i.roomTryHandler) || void 0 === s || s.renewLocalToken(e), o.logger.warn(E.ZEGO_RTM_ACTION.ZEGOEXPRESSWEBRTM_RENEWTOKEN + " " + JSON.stringify(t))) : o.logger.error(E.ZEGO_RTM_ACTION.ZEGOEXPRESSWEBRTM_RENEWTOKEN + " " + JSON.stringify(t));}, void 0, { sessionID: i.sessionID, roomID: t, roomSessionID: i.roomSessionID }) : null === (r = i.roomTryHandler) || void 0 === r || r.renewLocalToken(e), this.dataReport.uploadReport(s, p.ZegoRTMLogEvent.kZegoTaskReNewToken.event), !0) : "string" != typeof e || i.roomTryHandler ? (this.logger.error(E.ZEGO_RTM_ACTION.ZEGOEXPRESSWEBRTM_RENEWTOKEN + " token must be string and not empty"), this.dataReport.addMsgInfo(s, { error: p.ZegoRTMLogEvent.kZegoTaskReNewToken.error.INPUT_PARAM.code, message: p.ZegoRTMLogEvent.kZegoTaskReNewToken.error.INPUT_PARAM.msg + " param token error" }), this.dataReport.uploadReport(s, p.ZegoRTMLogEvent.kZegoTaskReNewToken.event), !1) : (this.logger.error(E.ZEGO_RTM_ACTION.ZEGOEXPRESSWEBRTM_RENEWTOKEN + " calling must after loginRoom"), this.dataReport.addMsgInfo(s, { error: p.ZegoRTMLogEvent.kZegoTaskReNewToken.error.NOT_LOGIN.code, message: p.ZegoRTMLogEvent.kZegoTaskReNewToken.error.NOT_LOGIN.msg }), this.dataReport.uploadReport(s, p.ZegoRTMLogEvent.kZegoTaskReNewToken.event), !1) : (this.logger.error(E.ZEGO_RTM_ACTION.ZEGOEXPRESSWEBRTM_RENEWTOKEN + " calling must after loginRoom"), this.dataReport.addMsgInfo(s, { error: p.ZegoRTMLogEvent.kZegoTaskReNewToken.error.NOT_LOGIN.code, message: p.ZegoRTMLogEvent.kZegoTaskReNewToken.error.NOT_LOGIN.msg }), this.dataReport.uploadReport(s, p.ZegoRTMLogEvent.kZegoTaskReNewToken.event), !1);}, e.prototype.loginRoom = function (e, t, r, a) {var l = this;return new Promise(function (u, c) {return o(l, void 0, void 0, function () {var o,l,h,T,m,R = this;return s(this, function (s) {switch (s.label) {case 0:return 1 !== this.stateCenter.ENV ? [3, 2] : [4, new Promise(function (e) {wx.getNetworkType({ success: function success(t) {R.stateCenter.networkState = "none" === t.networkType ? n.ENUM_NETWORK_STATE.offline : n.ENUM_NETWORK_STATE.online, e();}, fail: function fail(t) {R.logger.error(E.ZEGO_RTM_ACTION.ZEGOEXPRESSWEBRTM_CONSTRUCTOR + " network " + JSON.stringify(t)), R.stateCenter.networkState = n.ENUM_NETWORK_STATE.online, e();} });})];case 1:s.sent(), s.label = 2;case 2:return o = this.loginReport(u, c, t, a), l = o.interResolve, h = o.interReject, !(a = a || {}).maxMemberCount && (a.maxMemberCount = 0), (T = d.checkParams({ roomID: { order: 0, value: e, rules: [{ name: d.RULE_PARAM_NAME.NOT_EMPTY, error: p.ZegoRTMLogEvent.kZegoTaskLoginRoom.error.ROOM_ID_NULL }, { name: d.RULE_PARAM_NAME.TYPE_STRING, error: p.ZegoRTMLogEvent.kZegoTaskLoginRoom.error.INPUT_PARAM, extMsg: "roomID must be string" }, { name: d.RULE_PARAM_NAME.MAX_LENGTH_128, error: p.ZegoRTMLogEvent.kZegoTaskLoginRoom.error.ROOM_ID_TOO_LONG }, { name: d.RULE_PARAM_NAME.ILLEGAL_CHARACTERS, error: p.ZegoRTMLogEvent.kZegoTaskLoginRoom.error.ROOM_ID_INVALID_CHARACTER }] }, token: { order: 1, value: t, rules: [{ name: d.RULE_PARAM_NAME.NOT_EMPTY, error: p.ZegoRTMLogEvent.kZegoTaskLoginRoom.error.INPUT_PARAM }, { name: d.RULE_PARAM_NAME.TYPE_STRING, error: p.ZegoRTMLogEvent.kZegoTaskLoginRoom.error.INPUT_PARAM }] }, user: { order: 2, value: r, rules: [{ name: d.RULE_PARAM_NAME.NOT_EMPTY, error: p.ZegoRTMLogEvent.kZegoTaskLoginRoom.error.INPUT_PARAM, extMsg: " param user error." }, { name: d.RULE_PARAM_NAME.TYPE_OBJECT, error: p.ZegoRTMLogEvent.kZegoTaskLoginRoom.error.INPUT_PARAM, extMsg: " param user error." }] }, "user.userID": { order: 3, value: r.userID, rules: [{ name: d.RULE_PARAM_NAME.NOT_EMPTY, error: p.ZegoRTMLogEvent.kZegoTaskLoginRoom.error.USER_ID_NULL, extMsg: " param user error." }, { name: d.RULE_PARAM_NAME.TYPE_STRING, error: p.ZegoRTMLogEvent.kZegoTaskLoginRoom.error.INPUT_PARAM, extMsg: " param userID error." }, { name: d.RULE_PARAM_NAME.MAX_LENGTH_100, error: p.ZegoRTMLogEvent.kZegoTaskLoginRoom.error.USER_ID_TOO_LONG }, { name: d.RULE_PARAM_NAME.ILLEGAL_CHARACTERS, error: p.ZegoRTMLogEvent.kZegoTaskLoginRoom.error.USER_ID_INVALID_CHARACTER }] }, "user.userName": { order: 4, value: r.userName, rules: [{ name: d.RULE_PARAM_NAME.TYPE_STRING, error: p.ZegoRTMLogEvent.kZegoTaskLoginRoom.error.INPUT_PARAM, extMsg: " userName must be string." }, { name: d.RULE_PARAM_NAME.MAX_LENGTH_256, error: p.ZegoRTMLogEvent.kZegoTaskLoginRoom.error.USER_NAME_TOO_LONG }] }, config: { order: 5, value: a, rules: [] }, "config.maxMemberCount": { order: 6, value: a.maxMemberCount, rules: [{ name: d.RULE_PARAM_NAME.TYPE_INTEGER, error: p.ZegoRTMLogEvent.kZegoTaskLoginRoom.error.INPUT_PARAM, extMsg: " maxMemberCount must be integer number." }] } }, { action: E.ZEGO_RTM_ACTION.ZEGOEXPRESSWEBRTM_LOGIN_ROOM, logger: this.logger })) !== d.RULE_SUCCESS ? (h(T.error, T.extMsg), [2]) : (m = this.getRoomModules(e)) ? (h(p.ZegoRTMLogEvent.kZegoTaskLoginRoom.error.REPEATEDLY_LOGIN), [2]) : (m = new g.LiveRoomModules(e, this.stateCenter, this.logger, this.dataReport, this.service), this.stateCenter.roomModulesList.length > 0 && 1 == this.stateCenter.isMultiRoom ? m.isMulti = !0 : i(this.stateCenter.roomModulesList).forEach(function (e) {return e.roomHandler.logout();}), this.stateCenter.roomModulesList.push(m), m.roomTryHandler || (m.roomTryHandler = new _.RetryRoomHandler(this.logger, this.stateCenter, m)), m.roomTryHandler.init(this.stateCenter.roomRetryTime), m.roomTryHandler.initRoom(m.roomHandler, e, t, r, this.stateCenter.server, this.stateCenter.serverBak, a), m.roomTryHandler.onactive = function (e, t) {e ? l(e) : h(t);}, m.roomTryHandler.active(!0), this.stateCenter.setMultiRoom = !0, [2]);}});});});}, e.prototype.loginReport = function (e, t, r, o) {var s = this;0 !== this.stateCenter.reportSeqList.login && (this.dataReport.uploadReport(this.stateCenter.reportSeqList.login), this.stateCenter.reportSeqList.login = 0, l.ClientUtil.unregisterCallback(p.ZegoRTMLogEvent.kZegoTaskLoginRoom.event, this.stateCenter.reportList));var i = u.getReportSeq();return this.stateCenter.reportSeqList.login = i, this.dataReport.newReport(i, p.ZegoRTMLogEvent.kZegoTaskLoginRoom.event), "string" == typeof r && this.dataReport.addMsgInfo(i, { token: p.ZegoRTMLogEvent.kZegoTaskLoginRoom.token(r), isMulti: this.stateCenter.isMultiRoom }), o && (o.userUpdate && "boolean" == typeof o.userUpdate && this.dataReport.addMsgInfo(i, { user_update: p.ZegoRTMLogEvent.kZegoTaskLoginRoom.user_update(o.userUpdate + "") }), o.maxMemberCount && "number" == typeof o.maxMemberCount && this.dataReport.addMsgInfo(i, { max_member_count: p.ZegoRTMLogEvent.kZegoTaskLoginRoom.max_member_count(o.maxMemberCount + "") })), l.ClientUtil.logReportCallback(p.ZegoRTMLogEvent.kZegoTaskLoginRoom.event, this.dataReport, i, this.stateCenter.reportList), { interResolve: function interResolve(t) {s.dataReport.uploadReport(i), s.stateCenter.reportSeqList.login = 0, l.ClientUtil.unregisterCallback(p.ZegoRTMLogEvent.kZegoTaskLoginRoom.event, s.stateCenter.reportList), e(t);}, interReject: function interReject(e, r) {var o, n;void 0 === r && (r = ""), e.code < 2e9 && e.code > 1e9 || e.code < 1e6 ? (o = l.ClientUtil.decodeServerError(e.code, e.msg), n = l.ClientUtil.getLiveRoomError(e.code)) : o = { code: e.code, message: e.msg }, o && s.dataReport.addMsgInfo(i, { error: o.code, message: o.message + r }), s.dataReport.uploadReport(i), s.stateCenter.reportSeqList.login = 0, l.ClientUtil.unregisterCallback(p.ZegoRTMLogEvent.kZegoTaskLoginRoom.event, s.stateCenter.reportList), n && a.errorCodeList[n] && (e.code = a.errorCodeList[n].code), e.code && e.msg && "" !== r ? t({ code: e.code, msg: e.msg + r }) : t(e);} };}, e.prototype.logoutRoom = function (e) {var t = u.getReportSeq();if (this.dataReport.newReport(t), this.dataReport.addMsgInfo(t, { roomid: e, isMulti: this.stateCenter.isMultiRoom }), void 0 === e) i(this.stateCenter.roomModulesList).forEach(function (e) {return e.roomHandler.logout(!0);});else {if ("string" != typeof e || "" == e) return this.logger.error(E.ZEGO_RTM_ACTION.ZEGOEXPRESSWEBRTM_LOGOUT_ROOM + " roomID must be string and not empty"), this.dataReport.addMsgInfo(t, { error: p.ZegoRTMLogEvent.kZegoTaskLogoutRoom.error.INPUT_PARAM.code, message: p.ZegoRTMLogEvent.kZegoTaskLogoutRoom.error.INPUT_PARAM.msg + " param roomID error" }), void this.dataReport.uploadReport(t, p.ZegoRTMLogEvent.kZegoTaskLogoutRoom.event);var r = this.getRoomModules(e);r ? (r.roomHandler.logout(), this.dataReport.uploadReport(t, p.ZegoRTMLogEvent.kZegoTaskLogoutRoom.event)) : (this.logger.error(E.ZEGO_RTM_ACTION.ZEGOEXPRESSWEBRTM_LOGOUT_ROOM + " room not exist"), this.dataReport.addMsgInfo(t, { error: p.ZegoRTMLogEvent.kZegoTaskLogoutRoom.error.ROOM_NOT_EXIST.code, message: p.ZegoRTMLogEvent.kZegoTaskLogoutRoom.error.ROOM_NOT_EXIST.msg }), this.dataReport.uploadReport(t, p.ZegoRTMLogEvent.kZegoTaskLogoutRoom.event));}}, e.prototype.loginHall = function (e, t, r) {var i = this;return new Promise(function (a, l) {return o(i, void 0, void 0, function () {var o,i,u,_,d = this;return s(this, function (s) {switch (s.label) {case 0:return 3 !== this.stateCenter.ENV ? [3, 2] : [4, new Promise(function (e) {wx.getNetworkType({ success: function success(t) {d.stateCenter.networkState = "none" === t.networkType ? n.ENUM_NETWORK_STATE.offline : n.ENUM_NETWORK_STATE.online, e();}, fail: function fail(t) {d.logger.error(E.ZEGO_RTM_ACTION.ZEGOEXPRESSWEBRTM_LOGIN_HALL + " network " + JSON.stringify(t)), d.stateCenter.networkState = n.ENUM_NETWORK_STATE.online, e();} });})];case 1:s.sent(), s.label = 2;case 2:return o = this.loginHallReport(a, l, e, r), i = o.interResolve, u = o.interReject, r = r || {}, "string" != typeof e || "" == e ? (this.logger.error(E.ZEGO_RTM_ACTION.ZEGOEXPRESSWEBRTM_LOGIN_HALL + " token format error"), u(p.ZegoRTMLogEvent.kZegoTaskLoginHall.error.INPUT_PARAM, "token format error"), [2]) : "object" != typeof t || "string" != typeof t.userID || "string" != typeof t.userName ? (this.logger.error(E.ZEGO_RTM_ACTION.ZEGOEXPRESSWEBRTM_LOGIN_HALL + " user error"), u(p.ZegoRTMLogEvent.kZegoTaskLoginHall.error.INPUT_PARAM, " user error"), [2]) : "object" != typeof r || "string" != typeof r.deviceID ? (this.logger.error(E.ZEGO_RTM_ACTION.ZEGOEXPRESSWEBRTM_LOGIN_HALL + " deviceID error"), u(p.ZegoRTMLogEvent.kZegoTaskLoginHall.error.INPUT_PARAM, " deviceID error"), [2]) : "object" != typeof r || "string" != typeof r.deviceType ? (this.logger.error(E.ZEGO_RTM_ACTION.ZEGOEXPRESSWEBRTM_LOGIN_HALL + " deviceType error"), u(p.ZegoRTMLogEvent.kZegoTaskLoginHall.error.INPUT_PARAM, " deviceType error"), [2]) : "object" != typeof r || 1 !== r.anType && 0 !== r.anType ? (this.logger.error(E.ZEGO_RTM_ACTION.ZEGOEXPRESSWEBRTM_LOGIN_HALL + " anType error"), u(p.ZegoRTMLogEvent.kZegoTaskLoginHall.error.INPUT_PARAM, " anType error"), [2]) : ((_ = this.module).hallToken = e, _.deviceID = r.deviceID, _.deviceType = r.deviceType, _.anType = r.anType, this.stateCenter.idName = t.userID, this.stateCenter.nickName = t.userName || t.userID, this.logger.info(E.ZEGO_RTM_ACTION.ZEGOEXPRESSWEBRTM_LOGIN_HALL + JSON.stringify(r)), r && "boolean" == typeof r.roomFlag && (r.roomFlag ? _.roomFlag = 1 : _.roomFlag = 0), r && "boolean" == typeof r.testEnvironment && (this.stateCenter.testEnvironment = r.testEnvironment), r && "boolean" == typeof r.userUpdate && (this.stateCenter.userStateUpdate = r.userUpdate), _.hallRunState !== n.ENUM_RUN_STATE.logout && (_.hallHandler.resetHall(), _.hallHandler.hallStateHandle("DISCONNECTED", p.ZegoRTMLogEvent.kZegoTaskLoginHall.error.REPEATEDLY_LOGIN), _.setRoomRunState(n.ENUM_RUN_STATE.logout), _.roomPrivateHandler.resetRoom()), this.dispatchServer(function () {_.retryHallHandler || (_.retryHallHandler = new T.RetryHallHandler(d.logger, d.stateCenter, d.module)), _.retryHallHandler.init(d.stateCenter.roomRetryTime), _.retryHallHandler.initRoom(d.module.hallHandler, t, d.stateCenter.server, r), _.retryHallHandler.onactive = function (e, t) {e ? i(e) : u(t);}, _.retryHallHandler.active(!0);}), [2]);}});});});}, e.prototype.loginHallReport = function (e, t, r, o) {var s = this;0 !== this.stateCenter.reportSeqList.login && (this.dataReport.uploadReport(this.stateCenter.reportSeqList.login), this.stateCenter.reportSeqList.login = 0, l.ClientUtil.unregisterCallback(p.ZegoRTMLogEvent.kZegoTaskLoginHall.event, this.stateCenter.reportList));var i = u.getReportSeq();return this.stateCenter.reportSeqList.login = i, this.dataReport.newReport(i, p.ZegoRTMLogEvent.kZegoTaskLoginHall.event), "string" == typeof r && this.dataReport.addMsgInfo(i, { token: p.ZegoRTMLogEvent.kZegoTaskLoginHall.token(r) }), o && (o.userUpdate && "boolean" == typeof o.userUpdate && this.dataReport.addMsgInfo(i, { user_update: p.ZegoRTMLogEvent.kZegoTaskLoginHall.user_update(o.userUpdate + "") }), o.deviceID && "string" == typeof o.deviceID && this.dataReport.addMsgInfo(i, { user_update: p.ZegoRTMLogEvent.kZegoTaskLoginHall.device_id(o.deviceID) }), o.deviceType && "string" == typeof o.deviceType && this.dataReport.addMsgInfo(i, { user_update: p.ZegoRTMLogEvent.kZegoTaskLoginHall.device_type(o.deviceType) }), o.anType && "number" == typeof o.anType && this.dataReport.addMsgInfo(i, { user_update: p.ZegoRTMLogEvent.kZegoTaskLoginHall.an_type(o.anType + "") }), o.roomFlag && "boolean" == typeof o.roomFlag && this.dataReport.addMsgInfo(i, { user_update: p.ZegoRTMLogEvent.kZegoTaskLoginHall.room_flag(o.roomFlag + "") }), o.testEnvironment && "boolean" == typeof o.testEnvironment && this.dataReport.addMsgInfo(i, { user_update: p.ZegoRTMLogEvent.kZegoTaskLoginHall.test_environment(o.testEnvironment + "") })), l.ClientUtil.logReportCallback(p.ZegoRTMLogEvent.kZegoTaskLoginHall.event, this.dataReport, i, this.stateCenter.reportList), { interResolve: function interResolve(t) {s.dataReport.uploadReport(i), s.stateCenter.reportSeqList.login = 0, l.ClientUtil.unregisterCallback(p.ZegoRTMLogEvent.kZegoTaskLoginHall.event, s.stateCenter.reportList), e(t);}, interReject: function interReject(e, r) {void 0 === r && (r = ""), s.dataReport.addMsgInfo(i, { error: e.code, message: e.msg + r }), s.dataReport.uploadReport(i), s.stateCenter.reportSeqList.login = 0, l.ClientUtil.unregisterCallback(p.ZegoRTMLogEvent.kZegoTaskLoginHall.event, s.stateCenter.reportList), t({ code: e.code, msg: e.msg + r });} };}, e.prototype.logoutHall = function () {var e = u.getReportSeq();this.dataReport.newReport(e), this.module.hallHandler.logout(), this.module.setRoomRunState(n.ENUM_RUN_STATE.logout), this.module.roomPrivateHandler.resetRoom(), this.dataReport.uploadReport(e, p.ZegoRTMLogEvent.kZegoTaskLogoutHall.event);}, e.prototype.enterRoom = function (e, t) {var r = this;return new Promise(function (o, s) {var i = u.getReportSeq();if (r.dataReport.newReport(i), "string" != typeof e || "" == e || ![0, 1].includes(t)) return r.logger.error(E.ZEGO_RTM_ACTION.ZEGOEXPRESSWEBRTM_LOGIN_ROOM + " param error"), void o({ errorCode: p.ZegoRTMLogEvent.kZegoTaskEnterRoom.error.INPUT_PARAM.code, extendedData: p.ZegoRTMLogEvent.kZegoTaskEnterRoom.error.INPUT_PARAM.msg });var a = r.module;if (!a.isLogin()) return r.logger.error(E.ZEGO_RTM_ACTION.ZEGOEXPRESSWEBRTM_LOGIN_ROOM + " no login hall before entering room"), void o({ errorCode: p.ZegoRTMLogEvent.kZegoTaskEnterRoom.error.NOT_LOGIN.code, extendedData: p.ZegoRTMLogEvent.kZegoTaskEnterRoom.error.NOT_LOGIN.msg });a.runRoomState !== n.ENUM_RUN_STATE.logout && (r.logger.info(E.ZEGO_RTM_ACTION.ZEGOEXPRESSWEBRTM_LOGIN_ROOM + " reset"), r.module.roomPrivateHandler.resetRoom(), r.module.roomPrivateHandler.roomStateHandle("DISCONNECTED", p.ZegoRTMLogEvent.kZegoTaskEnterRoom.error.REPEATEDLY_ENTER_ROOM)), a.pri_roomID = e, r.stateCenter.role = t, r.dataReport.addMsgInfo(i, { role: p.ZegoRTMLogEvent.kZegoTaskEnterRoom.role(t + "") }), a.setRoomRunState(n.ENUM_RUN_STATE.trylogin), a.roomPrivateHandler.roomStateHandle("CONNECTING", { code: 0, msg: "" });var l = function l(t, _l) {if (t.body && 0 !== t.body.code || 1100002 == t.code) {a.setRoomRunState(n.ENUM_RUN_STATE.logout);var u = t.body && t.body.code || t.code,_ = t.body && t.body.message || t.msg;a.roomPrivateHandler.roomStateHandle("DISCONNECTED", { code: u, msg: _ }), r.dataReport.addMsgInfo(i, { error: u, message: _ }), r.dataReport.uploadReport(i, p.ZegoRTMLogEvent.kZegoTaskEnterRoom.event), s({ errorCode: u, extendedData: _ });} else a.roomID = e, a.timeStamp = t.header.timeStamp, a.roomSid = t.body.room_header.room_sid, a.roomSessionID = t.body.room_header.room_user_session_id, a.userSeq = t.body.userlist_seq, r.dataReport.uploadReport(i, p.ZegoRTMLogEvent.kZegoTaskEnterRoom.event), a.setRoomRunState(n.ENUM_RUN_STATE.login), a.roomPrivateHandler.roomStateHandle("CONNECTED", { code: 0, msg: "" }), r.module.userHandler.loginPrivateRsp(t), a.roomLoginResponse(t), o({ errorCode: 0, extendedData: "" });};setTimeout(function () {a.roomPrivateHandler.enterRoom(l, l);}, 20);});}, e.prototype.leaveRoom = function () {var e = this;return new Promise(function (t) {var r = u.getReportSeq();e.dataReport.newReport(r), e.module.roomPrivateHandler.roomStateHandle("DISCONNECTED", { code: 0, msg: "" });var o = function o(_o5, s) {0 !== _o5.body.code ? (e.dataReport.addMsgInfo(r, { error: _o5.body.code, message: _o5.body.message }), e.dataReport.uploadReport(r, p.ZegoRTMLogEvent.kZegoTaskLeaveRoom.event), t({ errorCode: _o5.body.code, extendedData: _o5.body.message })) : (e.dataReport.uploadReport(r, p.ZegoRTMLogEvent.kZegoTaskLeaveRoom.event), t({ errorCode: 0, extendedData: "" }));};e.module.roomPrivateHandler.leaveRoom(o, o);});}, e.prototype.sendCustomCommand = function (e, t, r) {var o = this;return new Promise(function (s, i) {o._sendCustomCommand(e, t, r).then(function (e) {s({ errorCode: e.errorCode, extendedData: e.extendedData });}).catch(function (e) {i(e);});});}, e.prototype._sendCustomCommand = function (e, t, r) {var o = this;return new Promise(function (s, i) {var _ = u.getReportSeq();o.dataReport.newReport(_, p.ZegoRTMLogEvent.kZegoTaskLiveRoomSendCustomCommand.event);var d = l.ClientUtil.proxyRes(o.dataReport, _, s, i),c = d.interResolve,g = d.interReject;if ("string" != typeof e || "" == e) return o.logger.error(E.ZEGO_RTM_ACTION.ZEGOEXPRESSWEBRTM_SEND_CUSTOM + " roomid must be string and not empty"), void g(a.errorCodeList.INPUT_PARAM, " param roomID error");if (!(r instanceof Array) || r.find(function (e) {return "string" != typeof e;})) return o.logger.error(E.ZEGO_RTM_ACTION.ZEGOEXPRESSWEBRTM_SEND_CUSTOM + " dstMembers must be string array"), void g(p.ZegoRTMLogEvent.kZegoTaskLiveRoomSendCustomCommand.error.INPUT_PARAM, " param toUserList error");if ("PUBLIC" === o.stateCenter.type && "string" != typeof t && "object" != typeof t) return o.logger.error(E.ZEGO_RTM_ACTION.ZEGOEXPRESSWEBRTM_SEND_CUSTOM + " custom content must be a non empty string or object"), void g(p.ZegoRTMLogEvent.kZegoTaskLiveRoomSendCustomCommand.error.INPUT_PARAM, " param command error");if ("PRIVATE" === o.stateCenter.type && "string" != typeof t) return o.logger.error(E.ZEGO_RTM_ACTION.ZEGOEXPRESSWEBRTM_SEND_CUSTOM + " custom content must be a not empty string"), void g(p.ZegoRTMLogEvent.kZegoTaskLiveRoomSendCustomCommand.error.INPUT_PARAM, " param command error");if ("string" == typeof t && t.length > n.MAX_MESSAGE_LENGTH) return o.logger.error(E.ZEGO_RTM_ACTION.ZEGOEXPRESSWEBRTM_SEND_CUSTOM + " command too long"), void g(p.ZegoRTMLogEvent.kZegoTaskLiveRoomSendCustomCommand.error.IM_CONTENT_TOO_LONG);var h = o.getRoomModules(e);h ? (o.dataReport.addMsgInfo(_, { room_sid: p.ZegoRTMLogEvent.kZegoTaskLiveRoomSendCustomCommand.room_sid(h.sessionID) }), h.messageHandler.sendCustomCommand(r, t, c, g)) : g(p.ZegoRTMLogEvent.kZegoTaskLiveRoomSendCustomCommand.error.ROOM_NOT_EXIST);});}, e.prototype.sendBroadcastMessage = function (e, t) {var r = this;return new Promise(function (o, s) {r._sendBroadcastMessage(e, t).then(function (e) {o({ errorCode: e.errorCode, messageID: e.messageID, extendedData: e.extendedData });}).catch(function (e) {s(e);});});}, e.prototype._sendBroadcastMessage = function (e, t, r, o) {var s = this;return void 0 === r && (r = 1), void 0 === o && (o = 1), new Promise(function (i, a) {var _ = u.getReportSeq();s.dataReport.newReport(_, p.ZegoRTMLogEvent.kZegoTaskLiveRoomSendRoomMessage.event);var d = l.ClientUtil.proxyRes(s.dataReport, _, i, a),c = d.interResolve,g = d.interReject;if ("string" != typeof e || "" == e) return s.logger.error(E.ZEGO_RTM_ACTION.ZEGOEXPRESSWEBRTM_SEND_BCM + " roomid must be string and not empty"), void g(p.ZegoRTMLogEvent.kZegoTaskLiveRoomSendRoomMessage.error.INPUT_PARAM, " param roomID error");if (void 0 === t || "" == t) return s.logger.error(E.ZEGO_RTM_ACTION.ZEGOEXPRESSWEBRTM_SEND_BCM + " message is empty"), void g(p.ZegoRTMLogEvent.kZegoTaskLiveRoomSendRoomMessage.error.IM_CONTENT_NULL);if ("string" != typeof t) return s.logger.error(E.ZEGO_RTM_ACTION.ZEGOEXPRESSWEBRTM_SEND_BCM + " message must be string"), void g(p.ZegoRTMLogEvent.kZegoTaskLiveRoomSendRoomMessage.error.INPUT_PARAM, " param message error");if (t.length > n.MAX_MESSAGE_LENGTH) return s.logger.error(E.ZEGO_RTM_ACTION.ZEGOEXPRESSWEBRTM_SEND_BCM + " message too long"), void g(p.ZegoRTMLogEvent.kZegoTaskLiveRoomSendRoomMessage.error.IM_CONTENT_TOO_LONG);var h = s.getRoomModules(e);h ? (s.dataReport.addMsgInfo(_, { room_sid: p.ZegoRTMLogEvent.kZegoTaskLiveRoomSendRoomMessage.room_sid(h.sessionID) }), h.messageHandler.sendRoomMsg(r, o, e, t, c, g)) : g(p.ZegoRTMLogEvent.kZegoTaskLiveRoomSendRoomMessage.error.ROOM_NOT_EXIST);});}, e.prototype.setRoomExtraInfo = function (e, t, r) {return this._setRoomExtraInfo(e, t, r);}, e.prototype._setRoomExtraInfo = function (e, t, r) {var o = this;return new Promise(function (s, i) {var a = u.getReportSeq();o.dataReport.newReport(a, p.ZegoRTMLogEvent.kZegoTaskLiveRoomSendReliableMessage.event);var _ = l.ClientUtil.proxyRes(o.dataReport, a, s, i),d = _.interResolve,c = _.interReject;if ("string" != typeof e || "" == e) return o.logger.error(E.ZEGO_RTM_ACTION.ZEGOEXPRESSWEBRTM_SEND_BCM + " roomid must be string and not empty"), void c(p.ZegoRTMLogEvent.kZegoTaskLiveRoomSendRoomMessage.error.INPUT_PARAM, " param roomID error");if (!t || "string" != typeof t) return o.logger.error(E.ZEGO_RTM_ACTION.ZEGOEXPRESSWEBRTM_SEND_RLM + " type must be string"), void c({ errorCode: p.ZegoRTMLogEvent.kZegoTaskLiveRoomSendReliableMessage.error.INPUT_PARAM.code });if (t.length > n.MAX_TRANS_TYPE_LENGTH) return o.logger.error(E.ZEGO_RTM_ACTION.ZEGOEXPRESSWEBRTM_SEND_RLM + " type is too long"), void c({ errorCode: p.ZegoRTMLogEvent.kZegoTaskLiveRoomSendReliableMessage.error.INPUT_PARAM.code });if (!r || "string" != typeof r) return o.logger.error(E.ZEGO_RTM_ACTION.ZEGOEXPRESSWEBRTM_SEND_RLM + " data must be string"), void c({ errorCode: p.ZegoRTMLogEvent.kZegoTaskLiveRoomSendReliableMessage.error.INPUT_PARAM.code });if (r.length > n.MAX_TRANS_DATA_LENGTH) return o.logger.error(E.ZEGO_RTM_ACTION.ZEGOEXPRESSWEBRTM_SEND_RLM + " type is too long"), void c({ errorCode: p.ZegoRTMLogEvent.kZegoTaskLiveRoomSendReliableMessage.error.INPUT_PARAM.code });var g = o.getRoomModules(e);g ? (o.dataReport.addMsgInfo(a, { room_sid: p.ZegoRTMLogEvent.kZegoTaskLiveRoomSendReliableMessage.room_sid(g.sessionID) }), g.messageHandler.sendReliableMessage(t, r, d, c)) : c(p.ZegoRTMLogEvent.kZegoTaskLiveRoomSendReliableMessage.error.ROOM_NOT_EXIST);});}, e.prototype.sendBarrageMessage = function (e, t) {var r = this;return new Promise(function (o, s) {r._sendBarrageMessage(e, t).then(function (e) {o({ errorCode: e.errorCode, messageID: e.messageID, extendedData: e.extendedData });}).catch(function (e) {s(e);});});}, e.prototype._sendBarrageMessage = function (e, t, r, o) {var s = this;return void 0 === r && (r = 1), void 0 === o && (o = 1), new Promise(function (i, a) {var _ = u.getReportSeq();s.dataReport.newReport(_, p.ZegoRTMLogEvent.kZegoTaskLiveSendRoomBigIM.event);var d = l.ClientUtil.proxyRes(s.dataReport, _, i, a),c = d.interResolve,g = d.interReject;if ("string" != typeof e || "" == e) return s.logger.error(E.ZEGO_RTM_ACTION.ZEGOEXPRESSWEBRTM_SEND_BRM + "roomid must be string and not empty"), void g(p.ZegoRTMLogEvent.kZegoTaskLiveSendRoomBigIM.error.INPUT_PARAM, " param roomID error");if (void 0 === t || "" == t) return s.logger.error(E.ZEGO_RTM_ACTION.ZEGOEXPRESSWEBRTM_SEND_BRM + " message is empty"), void g(p.ZegoRTMLogEvent.kZegoTaskLiveSendRoomBigIM.error.IM_CONTENT_NULL);if ("string" != typeof t) return s.logger.error(E.ZEGO_RTM_ACTION.ZEGOEXPRESSWEBRTM_SEND_BRM + " message must be string"), void g(p.ZegoRTMLogEvent.kZegoTaskLiveSendRoomBigIM.error.INPUT_PARAM, " param message error");if (t.length > n.MAX_MESSAGE_LENGTH) return s.logger.error(E.ZEGO_RTM_ACTION.ZEGOEXPRESSWEBRTM_SEND_BRM + " message too long"), void g(p.ZegoRTMLogEvent.kZegoTaskLiveSendRoomBigIM.error.IM_CONTENT_TOO_LONG);var h = s.getRoomModules(e);h ? (s.dataReport.addMsgInfo(_, { room_sid: p.ZegoRTMLogEvent.kZegoTaskLiveSendRoomBigIM.room_sid(h.sessionID) }), h.messageHandler.sendBigRoomMessage(r, o, e, t, c, g)) : g(p.ZegoRTMLogEvent.kZegoTaskLiveSendRoomBigIM.error.ROOM_NOT_EXIST);});}, e.prototype.sendRelayMessage = function (e, t, r, o, s) {var i = this.getRoomModules(s) || this.stateCenter.roomModulesList[0];i ? i.messageHandler.sendRelayMessage(e, t, r, o) : o && o(a.errorCodeList.ROOM_NOT_EXIST, 0);}, e.prototype.requestJoinLive = function (e, t, r, o, s) {var i = this.getRoomModules(s) || this.stateCenter.roomModulesList[0];return i ? i.liveHandler.requestJoinLive(e, t, r, o) : (r && r(a.errorCodeList.ROOM_NOT_EXIST, 0), !1);}, e.prototype.inviteJoinLive = function (e, t, r, o, s) {var i = this.getRoomModules(s) || this.stateCenter.roomModulesList[0];return i ? i.liveHandler.inviteJoinLive(e, t, r, o) : (r && r(a.errorCodeList.ROOM_NOT_EXIST, 0), !1);}, e.prototype.endJoinLive = function (e, t, r, o) {var s = this.getRoomModules(o) || this.stateCenter.roomModulesList[0];return s ? s.liveHandler.endJoinLive(e, t, r) : (r && r(a.errorCodeList.ROOM_NOT_EXIST, 0), !1);}, e.prototype.respondJoinLive = function (e, t, r, o, s) {var i = this.getRoomModules(s) || this.stateCenter.roomModulesList[0];return i ? i.liveHandler.respondJoinLive(e, t, r, o) : (o && o(a.errorCodeList.ROOM_NOT_EXIST, 0), !1);}, e.prototype.getVersion = function () {return this.version;}, e.prototype.setSdkBizVersion = function (e) {"string" == typeof e && "" !== e && (this.stateCenter.bizVersion = e);}, e.prototype.setSdkLoginRelateService = function (e) {Array.isArray(e) && e.every(function (e) {return "string" == typeof e;}) && (this.stateCenter.relateService = e);}, e.prototype.on = function (e, t) {return this.stateCenter.listenerList[e] ? "function" != typeof t ? (this.logger.error(E.ZEGO_RTM_ACTION.ZEGOEXPRESSWEBRTM_ON + " listener callBack must be funciton"), !1) : (-1 == this.stateCenter.listenerList[e].indexOf(t) && this.stateCenter.listenerList[e].push(t), !0) : (this.logger.error(E.ZEGO_RTM_ACTION.ZEGOEXPRESSWEBRTM_ON + " event " + e + " no found"), !1);}, e.prototype.off = function (e, t) {if (!this.stateCenter.listenerList[e]) return this.logger.error(E.ZEGO_RTM_ACTION.ZEGOEXPRESSWEBRTM_OFF + " listener no found"), !1;var r = this.stateCenter.listenerList[e];return t ? r.splice(r.indexOf(t), 1) : this.stateCenter.listenerList[e] = [], !0;}, e.prototype._on = function (e, t) {return this.stateCenter.listenerList[e] ? "function" != typeof t ? (this.logger.error(E.ZEGO_RTM_ACTION.ZEGOEXPRESSWEBRTM_ON + " listener callBack must be funciton"), !1) : (-1 == this.stateCenter.listenerList[e].indexOf(t) && this.stateCenter.listenerList[e].push(t), !0) : (this.logger.error(E.ZEGO_RTM_ACTION.ZEGOEXPRESSWEBRTM_ON + " event " + e + " no found"), !1);}, e.prototype._off = function (e, t) {if (!this.stateCenter.listenerList[e]) return this.logger.error(E.ZEGO_RTM_ACTION.ZEGOEXPRESSWEBRTM_OFF + " listener no found"), !1;var r = this.stateCenter.listenerList[e];return t ? r.splice(r.indexOf(t), 1) : this.stateCenter.listenerList[e] = [], !0;}, e.prototype.isTestEnvironment = function () {return this.stateCenter.testEnvironment;}, e.prototype.isLogin = function (e) {var t = this.getRoomModules(e) || this.stateCenter.roomModulesList[0];return !!t && t.isLogin();}, e.prototype.getMultiRoom = function () {return this.stateCenter.isMultiRoom;}, e.prototype.getAppID = function () {return this.stateCenter.appid;}, e.prototype.getUserID = function () {return this.stateCenter.idName;}, e.prototype.getToken = function (e) {return (this.getRoomModules(e) || this.stateCenter.roomModulesList[0]).token;}, e.prototype.getAnType = function () {return this.module.anType;}, e.prototype.getRoomSid = function () {return this.module.roomSid;}, e.prototype.setRoomCreateFlag = function (e) {this.stateCenter.roomCreateFlag = e;}, e.prototype.setRole = function (e) {this.stateCenter.role = e;}, e.prototype.getSessionId = function (e) {var t = this.getRoomModules(e) || this.stateCenter.roomModulesList[0];return t ? t.sessionID : "0";}, e.prototype.getRoomSessionID = function (e) {var t = this.getRoomModules(e) || this.stateCenter.roomModulesList[0];return t ? t.roomSessionID : "0";}, e.prototype.sendPB = function (e) {return e instanceof Uint8Array ? this.service.sendPB(e) : (this.logger.error(E.ZEGO_RTM_ACTION.ZEGOEXPRESSWEBRTM_SEND_PB + " type error"), !1);}, e.prototype.getHeader = function (e) {var t = this.stateCenter.roomModulesList[0];if (t && t.isLogin()) {var r = t.roomID,o = t.sessionID,s = t.roomSessionID;return this.service.getHeader(e, o, r, s);}this.logger.error(E.ZEGO_RTM_ACTION.ZEGOEXPRESSWEBRTM_GET_HEADER + " room no found or no login");}, e.prototype.enableMultiRoom = function (e) {var t = u.getReportSeq();return this.dataReport.newReport(t, p.ZegoRTMLogEvent.kZegoEnableMultiRoom.event), this.dataReport.addMsgInfo(t, { isMulti: e }), "boolean" != typeof e ? (this.logger.error(E.ZEGO_RTM_ACTION.ZEGOEXPRESSWEBRTM_ENABLE_MULTI_ROOM + " param must be boolean"), this.dataReport.uploadReport(t, void 0, p.ZegoRTMLogEvent.kZegoEnableMultiRoom.error.kAlreadyLoginError), !1) : this.stateCenter.roomModulesList.length > 0 || this.stateCenter.setMultiRoom ? (this.logger.error(E.ZEGO_RTM_ACTION.ZEGOEXPRESSWEBRTM_ENABLE_MULTI_ROOM + " multi room can only be set once before first login"), this.dataReport.uploadReport(t, void 0, p.ZegoRTMLogEvent.kZegoEnableMultiRoom.error.kAlreadyLoginError), !1) : (this.dataReport.uploadReport(t), this.stateCenter.isMultiRoom = e, this.stateCenter.setMultiRoom = !0, !0);}, e.prototype.getRoomModules = function (e) {return this.stateCenter.roomModulesList.find(function (t) {return t.roomID == e;});}, e.prototype.dispatchServer = function (e) {var t = this;this.logger.info("zc.hh.dc call");var r = this.dispatchBodyData(),o = this.module.dispatchServer;if (l.ClientUtil.actionSuccessCallback(p.ZegoRTMLogEvent.kZegoTaskLoginHall.event, this.stateCenter.reportList) && l.ClientUtil.actionSuccessCallback(p.ZegoRTMLogEvent.kZegoTaskLoginHall.event, this.stateCenter.reportList)(n.REPORT_ACTION.eventStart, p.ZegoRTMLogEvent.kZegoTaskLoginHall.subEvent.dispatch_connection.event), XMLHttpRequest) {var s = new XMLHttpRequest();s.open("POST", o), s.setRequestHeader("Content-type", "application/json; charset=utf-8"), s.onreadystatechange = function () {if (200 == s.status && 4 == s.readyState && s.responseText && "" !== s.responseText) {var r = JSON.parse(s.responseText);r.server_addrs && 0 !== r.server_addrs.length && (t.stateCenter.server = r.server_addrs[0].replace(":443", ""), t.module.sessionExpire = r.session_expire + "", l.ClientUtil.actionSuccessCallback(p.ZegoRTMLogEvent.kZegoTaskLoginHall.event, t.stateCenter.reportList) && l.ClientUtil.actionSuccessCallback(p.ZegoRTMLogEvent.kZegoTaskLoginHall.event, t.stateCenter.reportList)(n.REPORT_ACTION.eventEndWithMsgInfo, p.ZegoRTMLogEvent.kZegoTaskLoginHall.subEvent.dispatch_connection.event, { server: t.stateCenter.server, session_expire: t.module.sessionExpire }), e && e());}}, s.send(JSON.stringify(r));} else wx.request({ url: o, header: { "Content-Type": "application/json" }, method: "POST", data: JSON.stringify(r), dataType: "json", success: function success(r) {r.data.server_addrs && 0 !== r.data.server_addrs.length && (t.stateCenter.server = r.data.server_addrs[0].replace(":443", ""), t.module.sessionExpire = r.data.session_expire + "", e && e());}, fail: function fail(e) {console.error("send failed " + e.statusCode);} });}, e.prototype.dispatchBodyData = function () {return { seq: 1, timestamp: new Date().getTime, app_id: this.stateCenter.appid, user_id: this.stateCenter.idName, user_name: this.stateCenter.nickName, net_type: 2, device_id: this.module.deviceID, login_token: this.module.hallToken, an_type: this.module.anType };}, e.prototype.getRoomBroadcastMessages = function (e, t) {var r = this;return new Promise(function (o, s) {r.module.messageHandler.getRoomChatInfo(e, t, o, s);});}, e.prototype.sendCustomMessage = function (e, t, r) {var o = this;return new Promise(function (s) {if (e && "string" == typeof e && 0 === e.length) {if (t && "string" == typeof t) {if (r) {if (o.module.isLogin()) {var i = function i(e) {if (e.body.code && 0 !== e.body.code) return o.logger.error(E.ZEGO_RTM_ACTION.ZEGOEXPRESSWEBRTM_SEND_CUSTOM_MESSAGE + " server error=", e.body.code), void s(e);s(e), o.logger.info(E.ZEGO_RTM_ACTION.ZEGOEXPRESSWEBRTM_SEND_CUSTOM_MESSAGE + " call success.");};o.module.service.sendMessage(e, r, i, i);} else o.logger.error(E.ZEGO_RTM_ACTION.ZEGOEXPRESSWEBRTM_SEND_CUSTOM_MESSAGE + " hallState is not login");} else o.logger.error(E.ZEGO_RTM_ACTION.ZEGOEXPRESSWEBRTM_SEND_CUSTOM_MESSAGE + " rsbodyDatapCmd error");} else o.logger.error(E.ZEGO_RTM_ACTION.ZEGOEXPRESSWEBRTM_SEND_CUSTOM_MESSAGE + " rspCmd error");} else o.logger.error(E.ZEGO_RTM_ACTION.ZEGOEXPRESSWEBRTM_SEND_CUSTOM_MESSAGE + " reqCmd error");});}, e.prototype.getQueueSimpleList = function () {var e = this;return new Promise(function (t, r) {e.sendCustomMessage("zegochat_js.queue_list_req", "zegochat_js.queue_list_rsp", {}).then(function (o) {o.body.code && 0 !== o.body.code ? (e.logger.error("zc.gqs.0 get list error, code = " + o.body.code), r({ errorCode: o.body.code, extendData: o.body.message })) : t({ queues: o.body.queues });});});}, e;}();t.ZegoExpressWebRTM = S;}, function (e, t, r) {"undefined" != typeof self && self, e.exports = function (e) {var t = {};function r(o) {if (t[o]) return t[o].exports;var s = t[o] = { i: o, l: !1, exports: {} };return e[o].call(s.exports, s, s.exports, r), s.l = !0, s.exports;}return r.m = e, r.c = t, r.d = function (e, t, o) {r.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: o });}, r.r = function (e) {"undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 });}, r.t = function (e, t) {if (1 & t && (e = r(e)), 8 & t) return e;if (4 & t && "object" == typeof e && e && e.__esModule) return e;var o = Object.create(null);if (r.r(o), Object.defineProperty(o, "default", { enumerable: !0, value: e }), 2 & t && "string" != typeof e) for (var s in e) {r.d(o, s, function (t) {return e[t];}.bind(null, s));}return o;}, r.n = function (e) {var t = e && e.__esModule ? function () {return e.default;} : function () {return e;};return r.d(t, "a", t), t;}, r.o = function (e, t) {return Object.prototype.hasOwnProperty.call(e, t);}, r.p = "", r(r.s = 3);}([function (e, t, r) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.E_CLIENT_TYPE = t.ENUM_LOG_LEVEL = t.ENUM_REMOTE_TYPE = t.ZEGO_ENV = t.ZEGO_BROWSER_TYPE = void 0, function (e) {e[e.IE = 0] = "IE", e[e.FIREFOX = 1] = "FIREFOX", e[e.CHROME = 2] = "CHROME", e[e.SAFARI = 3] = "SAFARI", e[e.OPERA = 4] = "OPERA", e[e.WEIXIN = 5] = "WEIXIN", e[e.WEIXINMINI = 6] = "WEIXINMINI", e[e.UNKOWN = 7] = "UNKOWN";}(t.ZEGO_BROWSER_TYPE || (t.ZEGO_BROWSER_TYPE = {})), function (e) {e[e.BROWSER = 0] = "BROWSER", e[e.WEIXINMINI = 1] = "WEIXINMINI";}(t.ZEGO_ENV || (t.ZEGO_ENV = {})), function (e) {e[e.DISABLE = 0] = "DISABLE", e[e.WEBSOCKET = 1] = "WEBSOCKET", e[e.HTTPS = 2] = "HTTPS";}(t.ENUM_REMOTE_TYPE || (t.ENUM_REMOTE_TYPE = {})), t.ENUM_LOG_LEVEL = { DEBUG: 0, INFO: 1, WARN: 2, ERROR: 3, REPORT: 99, DISABLE: 100, debug: 0, info: 1, warn: 2, error: 3, report: 99, disable: 100 }, function (e) {e[e.ClientType_None = 0] = "ClientType_None", e[e.ClientType_H5 = 1] = "ClientType_H5", e[e.ClientType_SmallPragram = 2] = "ClientType_SmallPragram", e[e.ClientType_Webrtc = 3] = "ClientType_Webrtc";}(t.E_CLIENT_TYPE || (t.E_CLIENT_TYPE = {}));}, function (e, t, r) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.LoggerStateCenter = void 0;var o = function () {function e() {this._testEnvironment = !0, this._ENV = 0, this._debug = !0;}return e.getInstance = function () {return e.instance || (e.instance = new e(), e.instance.init()), e.instance;}, e.prototype.init = function () {}, Object.defineProperty(e.prototype, "testEnvironment", { get: function get() {return this._testEnvironment;}, set: function set(e) {this._testEnvironment = e;}, enumerable: !1, configurable: !0 }), Object.defineProperty(e.prototype, "ENV", { get: function get() {return this._ENV;}, set: function set(e) {this._ENV = e;}, enumerable: !1, configurable: !0 }), Object.defineProperty(e.prototype, "debug", { get: function get() {return this._debug;}, set: function set(e) {this._debug = e;}, enumerable: !1, configurable: !0 }), e.instance = new e(), e;}();t.LoggerStateCenter = o;}, function (e, t, r) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.createZegoWebSocket = t.ZegoWeiXinMiniWebSocket = void 0;var o = r(0),s = function () {function e(e, t) {this.url = e, this.readyState = 3, this._websocket = wx.connectSocket({ url: e }), this.init();}return e.prototype.init = function () {var e = this;this._websocket && (this.readyState = 0, this._websocket.onOpen(function (t) {e.readyState = e._websocket.readyState, "function" == typeof e.onopen && (e.onopen(t), e._websocket.onClose(function (t) {e.readyState = e._websocket.readyState, "function" == typeof e.onclose && e.onclose(t);}), e._websocket.onMessage(function (t) {"function" == typeof e.onmessage && e.onmessage(t);}));}), this._websocket.onError(function (t) {e.readyState = e._websocket.readyState, "function" == typeof e.onerror && e.onerror(t);}));}, e.prototype.onopen = function (e) {}, e.prototype.onerror = function (e) {}, e.prototype.onclose = function (e) {}, e.prototype.onmessage = function (e) {}, e.prototype.send = function (e) {this._websocket && this._websocket.send({ data: e });}, e.prototype.close = function () {this._websocket && this._websocket.close();}, e;}();t.ZegoWeiXinMiniWebSocket = s, t.createZegoWebSocket = function (e, t) {return t % 2 === o.ZEGO_ENV.BROWSER ? new WebSocket(e) : new s(e);};}, function (e, t, r) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.LoggerStateCenter = t.createZegoWebSocket = t.ZegoDataReport = t.ZegoLogger = void 0;var o = r(1);Object.defineProperty(t, "LoggerStateCenter", { enumerable: !0, get: function get() {return o.LoggerStateCenter;} });var s = r(2);Object.defineProperty(t, "createZegoWebSocket", { enumerable: !0, get: function get() {return s.createZegoWebSocket;} });var i = r(4);Object.defineProperty(t, "ZegoDataReport", { enumerable: !0, get: function get() {return i.ZegoDataReport;} });var n = r(5);Object.defineProperty(t, "ZegoLogger", { enumerable: !0, get: function get() {return n.ZegoLogger;} });}, function (e, t, r) {"use strict";var o = this && this.__assign || function () {return (o = Object.assign || function (e) {for (var t, r = 1, o = arguments.length; r < o; r++) {for (var s in t = arguments[r]) {Object.prototype.hasOwnProperty.call(t, s) && (e[s] = t[s]);}}return e;}).apply(this, arguments);};Object.defineProperty(t, "__esModule", { value: !0 }), t.ZegoDataReport = void 0;var s = function () {function e(e) {this.dataStatistics = {}, this.logger = e;}return e.prototype.newReport = function (e, t) {this.dataStatistics[e] = { event_time: Date.now(), time_consumed: 0, seq: e, error: 0, message: "success", event: t, events: [] };}, e.prototype.addMsgExt = function (e, t) {this.dataStatistics[e] ? this.dataStatistics[e].msg_ext = t : console.warn(e + " not exist");}, e.prototype.addMsgInfo = function (e, t) {this.dataStatistics[e] ? Object.assign(this.dataStatistics[e], t) : console.warn(e + " not exist");}, e.prototype.eventStart = function (e, t) {this.dataStatistics[e] ? null != this.dataStatistics[e].events ? this.dataStatistics[e].events.push({ event: t, event_time: Date.now(), time_consumed: 0 }) : this.logger.warn("zd.es.0 no events") : this.logger.warn("zd.es.0 no seq match");}, e.prototype.eventEnd = function (e, t, r) {if (this.dataStatistics[e]) {var o = this.dataStatistics[e].events;if (o && 0 !== o.length) {for (var s = o.length - 1; s >= 0; s--) {if (o[s].event == t && 0 == o[s].time_consumed) {o[s].time_consumed = Date.now() - o[s].event_time;break;}}} else this.logger.info("zd.ee.0 no events");} else this.logger.info("zd.ee.0 no seq match");}, e.prototype.eventEndWithMsg = function (e, t, r) {if (this.dataStatistics[e]) {var s = this.dataStatistics[e].events;if (s) {for (var i = s.length - 1; i >= 0; i--) {if (s[i].event == t && 0 == s[i].time_consumed) {s[i].time_consumed = Date.now() - s[i].event_time, null == s[i].msg_ext && (s[i].msg_ext = {}), s[i].msg_ext = o({}, r);break;}}} else this.logger.warn("zd.ee.0 no events");} else this.logger.warn("zd.ee.0 no seq match");}, e.prototype.eventEndWithMsgInfo = function (e, t, r) {if (this.dataStatistics[e]) {var o = this.dataStatistics[e].events;if (o) {for (var s = o.length - 1; s >= 0; s--) {if (o[s].event == t && 0 == o[s].time_consumed) {o[s].time_consumed = Date.now() - o[s].event_time, Object.assign(o[s], r);break;}}} else this.logger.warn("zd.ee.0 no events");} else this.logger.warn("zd.ee.0 no seq match");}, e.prototype.addEventInfo = function (e, t, r, o) {if (this.dataStatistics[e]) {var s = this.dataStatistics[e].events;if (null != s) {for (var i = s.length - 1; i >= 0; i--) {if (s[i].event == t && null != s[i].time_consumed) {null == s[i].msg_ext ? s[i].msg_ext = {} : s[i].msg_ext && (s[i].msg_ext[r] = o);break;}}} else this.logger.warn("zd.aei.0 no events");} else this.logger.warn("zd.aei.0 no seq match");}, e.prototype.addEventMsg = function (e, t, r, o) {if (this.dataStatistics[e]) {var s = this.dataStatistics[e].events;if (null != s) {for (var i = s.length - 1; i >= 0; i--) {if (s[i].event == t) {s[i][r] = o;break;}}} else this.logger.warn("zd.aem.0 no events");} else this.logger.warn("zd.aem.0 no seq match");}, e.prototype.addEvent = function (e, t, r) {this.dataStatistics[e] ? this.dataStatistics[e].events && (r ? this.dataStatistics[e].events.push({ event: t, event_time: Date.now(), msg_ext: r }) : this.dataStatistics[e].events.push({ event: t, event_time: Date.now() })) : this.logger.warn("zd.ae.0 no seq match");}, e.prototype.uploadReport = function (e, t, r, o) {var s = this.dataStatistics[e];null != s && (t && (s.event = t), s.time_consumed = Date.now() - s.event_time, r && this.addMsgInfo(e, { error: r.code, message: r.message || r.msg + " " + (o || "") }), this.logger.report(s), delete this.dataStatistics[e]);}, e;}();t.ZegoDataReport = s;}, function (e, t, r) {"use strict";var o = this && this.__assign || function () {return (o = Object.assign || function (e) {for (var t, r = 1, o = arguments.length; r < o; r++) {for (var s in t = arguments[r]) {Object.prototype.hasOwnProperty.call(t, s) && (e[s] = t[s]);}}return e;}).apply(this, arguments);};Object.defineProperty(t, "__esModule", { value: !0 }), t.ZegoLogger = void 0;var s = r(0),i = r(2),n = r(1),a = r(6),l = function () {function e(e) {this.logLevel = s.ENUM_LOG_LEVEL.INFO, this.logRemoteLevel = 0, this.websocket = null, this.logUploadTimer = null, this.logUploadInterval = 1e4, this.logCache = [], this.logCacheSend = [], this.logCacheMax = 100, this.existUserID = !1, this.stateCenter = n.LoggerStateCenter.getInstance(), this.env = e;}return e.prototype.setLogLevel = function (e) {var t = s.ENUM_LOG_LEVEL[e];return void 0 !== t && (this.logLevel = t, !0);}, e.prototype.setRemoteLogLevel = function (e) {var t = s.ENUM_LOG_LEVEL[e];return void 0 !== t && (this.logRemoteLevel = t, !0);}, e.prototype.setSessionInfo = function (e, t, r, o, s, i) {this.appid = e, this.roomid = t, this.sessionid = r, this.userid = o, this.userName = s, this.version = i;}, e.prototype.report = function (e) {var t = this.logReportParamList(s.ENUM_LOG_LEVEL.REPORT, e);this.logLevel !== s.ENUM_LOG_LEVEL.DISABLE && this.logLevel <= s.ENUM_LOG_LEVEL.REPORT && console.debug(t), this.RemoteLog(s.ENUM_LOG_LEVEL.REPORT, t, !0);}, e.prototype.debug = function () {for (var e = [], t = 0; t < arguments.length; t++) {e[t] = arguments[t];}var r = this.logParamList(s.ENUM_LOG_LEVEL.DEBUG, e.join(""));this.logLevel !== s.ENUM_LOG_LEVEL.DISABLE && this.logLevel <= s.ENUM_LOG_LEVEL.DEBUG && console.debug(r), this.log(s.ENUM_LOG_LEVEL.DEBUG, r);}, e.prototype.info = function () {for (var e = [], t = 0; t < arguments.length; t++) {e[t] = arguments[t];}var r = this.logParamList(s.ENUM_LOG_LEVEL.INFO, e.join(""));this.logLevel !== s.ENUM_LOG_LEVEL.DISABLE && this.logLevel <= s.ENUM_LOG_LEVEL.INFO && console.info(r), this.log(s.ENUM_LOG_LEVEL.INFO, r);}, e.prototype.warn = function () {for (var e = [], t = 0; t < arguments.length; t++) {e[t] = arguments[t];}var r = this.logParamList(s.ENUM_LOG_LEVEL.WARN, e.join(""));this.logLevel !== s.ENUM_LOG_LEVEL.DISABLE && this.logLevel <= s.ENUM_LOG_LEVEL.WARN && console.warn(r), this.log(s.ENUM_LOG_LEVEL.WARN, r);}, e.prototype.error = function () {for (var e = [], t = 0; t < arguments.length; t++) {e[t] = arguments[t];}var r = this.logParamList(s.ENUM_LOG_LEVEL.ERROR, e.join(""));this.logLevel !== s.ENUM_LOG_LEVEL.DISABLE && this.logLevel <= s.ENUM_LOG_LEVEL.ERROR && (console.error(r), window ? this.stateCenter.debug && window.alert(e.join("").substr(e.join("").indexOf(" ") + 1, 4500)) : wx && this.stateCenter.debug && wx.showModal({ title: "", content: e.join("").substr(e.join("").indexOf(" ") + 1, 4500) })), this.log(s.ENUM_LOG_LEVEL.ERROR, r);}, e.prototype.log = function (e, t) {this.logRemoteLevel !== s.ENUM_LOG_LEVEL.DISABLE && this.logRemoteLevel <= e && this.RemoteLog(e, t);}, e.prototype.setLogServer = function (e) {try {return e.startsWith("wss:") ? (this.logType = s.ENUM_REMOTE_TYPE.WEBSOCKET, this.openWebSocketLogServer(e)) : e.startsWith("https:") ? (this.logType = s.ENUM_REMOTE_TYPE.HTTPS, this.openHttpsLogServer(e)) : this.logType = s.ENUM_REMOTE_TYPE.DISABLE, !0;} catch (e) {return this.error(JSON.stringify(e)), !1;}}, e.prototype.stopLogServer = function () {this.logType == s.ENUM_REMOTE_TYPE.WEBSOCKET ? this.stopWebSocketServer() : this.logType == s.ENUM_REMOTE_TYPE.HTTPS && (this.SendHttpsLog(), this.stopHttpsServer()), this.logType = s.ENUM_REMOTE_TYPE.DISABLE;}, e.prototype.stopWebSocketServer = function () {this.websocket && (this.websocket.onclose = null, this.websocket.onerror = null, this.websocket.close(), this.websocket = null);}, e.prototype.openHttpsLogServer = function (e) {var t = this;this.url = e, e && (this.stopHttpsServer(), this.logUploadTimer || (this.logUploadTimer = setInterval(function () {t.SendHttpsLog();}, this.logUploadInterval)));}, e.prototype.stopHttpsServer = function () {this.logUploadTimer && (clearInterval(this.logUploadTimer), this.logUploadTimer = null);}, e.prototype.RemoteLog = function (e, t, r) {if (void 0 === r && (r = !1), "" != this.url) if (this.logType == s.ENUM_REMOTE_TYPE.WEBSOCKET) this.RemoteWebSocketLog(e, t);else if (this.logType == s.ENUM_REMOTE_TYPE.HTTPS) this.RemoteHttpsLog(e, t, r);else if (this.logLevel !== s.ENUM_LOG_LEVEL.DISABLE && this.logLevel <= e) for (this.logCacheSend.push(t); this.logCacheSend.length > this.logCacheMax;) {this.logCacheSend.shift();}}, e.prototype.RemoteWebSocketLog = function (e, t) {if ("string" == typeof t && t.length > 4e3) console.info("log over maximum, ignore");else if (null == this.websocket || 2 == this.websocket.readyState || 3 == this.websocket.readyState) {var r = this.url;this.url = "", this.setLogServer(r), this.logCacheSend.length < this.logCacheMax && this.logCacheSend.push(t);} else if (0 == this.websocket.readyState) this.logCacheSend.length < this.logCacheMax && this.logCacheSend.push(t);else if (1 == this.websocket.readyState) {if (this.logCacheSend.length > 0) {for (var s = "", i = 0; i < this.logCacheSend.length; i++) {(s + this.logCacheSend[i]).length > 4e3 && (this.websocket.send(s), s = "");var n = JSON.parse(this.logCacheSend[i]);n = o(o({}, n), { userid: n.userid || this.userid, roomid: n.roomid || this.roomid, userName: n.roomid || this.userName }), s = s + JSON.stringify(n) + "\n";}t = s + t, this.logCacheSend = [], this.websocket.send(t);} else this.websocket.send(t);} else console.warn("wrong socket state:" + this.websocket.readyState), this.logCacheSend.length < this.logCacheMax && this.logCacheSend.push(t);}, e.prototype.RemoteHttpsLog = function (e, t, r) {this.logCacheSend.push(t), (this.logCacheSend.length >= this.logCacheMax || !0 === r) && this.SendHttpsLog();}, e.prototype.logParamList = function (e, t) {var r = a.getCurrentTime(),o = [t.substr(0, t.indexOf(" ")) || t, t.substr(t.indexOf(" ") + 1, 4500) || t],s = { time: r, level: e, action: o[0], content: o[1], appid: this.appid, roomid: this.roomid, userid: this.userid, userName: this.userName, sessionid: this.sessionid };return JSON.stringify(s);}, e.prototype.logReportParamList = function (e, t) {var r = a.getCurrentTime();return t = o(o({}, t), { time: r, level: e, console: this.env % 2 === s.ZEGO_ENV.BROWSER ? "rtc" : "xcx", appid: this.appid, room_id: this.roomid, roomid: this.roomid, userid: this.userid, id_name: this.userid, userName: this.userName, sessionid: this.sessionid, sdk_version: this.version, test_environment: this.stateCenter.testEnvironment, version: this.version, event_id: this.appid + "_" + this.userid + "_" + t.event_time + "_" + t.seq }), JSON.stringify(t);}, e.prototype.openWebSocketLogServer = function (e) {if (this.url != e) {if (this.url = e, !e) return;this.stopWebSocketServer(), this.websocket = i.createZegoWebSocket(e, this.env), this.websocket.onopen = function () {}, this.websocket.onclose = function () {for (var e = [], t = 0; t < arguments.length; t++) {e[t] = arguments[t];}console.warn("onclose   websocket error:", e);}, this.websocket.onmessage = function () {}, this.websocket.onerror = function () {for (var e = [], t = 0; t < arguments.length; t++) {e[t] = arguments[t];}console.warn("open log websocket error:", e);};}}, e.prototype.SendHttpsLog = function () {0 != this.logCacheSend.length && (this.env % 2 === s.ZEGO_ENV.BROWSER ? this.SendHttpsLogWeb() : this.SendHttpsLogWeChatMini());}, e.prototype.SendHttpsLogWeb = function () {var e = this,t = this.logCacheSend.join("\n"),r = new XMLHttpRequest();r.onreadystatechange = function () {if (4 == r.readyState) if (200 == r.status) {if (0 == r.responseText.length) return;try {var t = JSON.parse(r.responseText).interval;"number" == typeof t && e.logUploadInterval !== t && (e.timeInterval = t, e.openHttpsLogServer(e.url));} catch (e) {console.log("send result failed " + e);}} else console.log("send failed " + r.status);}, r.open("POST", this.url, !0), 0 == this.env ? r.send(t) : 2 == this.env && (r.setRequestHeader("content-type", "application/json"), r.send(JSON.stringify({ user_id: this.userid, log: t }))), this.logCacheSend = [];}, e.prototype.SendHttpsLogWeChatMini = function () {var e = this;!this.existUserID && this.userid && this.logCacheSend.forEach(function (t) {Array.isArray(t) && t.forEach(function (r, o) {var s = JSON.parse(r);s && "" == JSON.parse(r).userid ? (s.userid = e.userid, s.id_name = e.userid, t[o] = JSON.stringify(s)) : e.existUserID = !0;});});var t = this.logCacheSend.join("\n"),r = 1 == this.env ? t : JSON.stringify({ user_id: this.userid, log: t });wx.request({ url: this.url, data: r, method: "POST", success: function success(t) {if (0 != t.data.length) {var r = t && t.data && t.data.interval;"number" == typeof r && e.logUploadInterval !== r && (e.timeInterval = r, e.openHttpsLogServer(e.url));}}, fail: function fail(e) {console.log("send failed " + e.statusCode);} }), this.logCacheSend = [];}, e;}();t.ZegoLogger = l;}, function (e, t, r) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.getCurrentTime = t.getCurrentEnv = t.getBrowser = void 0;var o = r(0);t.getBrowser = function () {var e = window.navigator.userAgent,t = null != window.ActiveXObject && -1 != e.indexOf("MSIE"),r = -1 != e.indexOf("Firefox"),s = null != window.opr,i = e.indexOf("Chrome") && window.chrome,n = -1 != e.indexOf("Safari") && -1 != e.indexOf("Version"),a = e.toLowerCase().match(/MicroMessenger/i) && "micromessenger" === e.toLowerCase().match(/MicroMessenger/i)[0];return t ? o.ZEGO_BROWSER_TYPE.IE : r ? o.ZEGO_BROWSER_TYPE.FIREFOX : s ? o.ZEGO_BROWSER_TYPE.OPERA : i ? o.ZEGO_BROWSER_TYPE.CHROME : n ? o.ZEGO_BROWSER_TYPE.SAFARI : a ? o.ZEGO_BROWSER_TYPE.WEIXIN : o.ZEGO_BROWSER_TYPE.UNKOWN;}, t.getCurrentEnv = function () {var e = window.navigator.userAgent;return new Promise(function (t) {-1 == e.indexOf("MicroMessage") ? t(o.ZEGO_ENV.BROWSER) : wx.miniProgram.getEnv(function (e) {e.miniprogram;});});};var s = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09"];t.getCurrentTime = function () {var e = new Date();return [e.getFullYear() + "/", (s[e.getMonth() + 1] || e.getMonth() + 1) + "/", (s[e.getDate()] || e.getDate()) + " ", (s[e.getHours()] || e.getHours()) + ":", (s[e.getMinutes()] || e.getMinutes()) + ":", s[e.getSeconds()] || e.getSeconds(), "." + e.getTime() % 1e3].join("");};}]);}, function (e, t, r) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.Base64 = void 0;var o = function () {function e() {}return e.base64encode = function (t) {var r, o, s, i, n, a;for (s = t.length, o = 0, r = ""; o < s;) {if (i = 255 & t.charCodeAt(o++), o == s) {r += e.base64EncodeChars.charAt(i >> 2), r += e.base64EncodeChars.charAt((3 & i) << 4), r += "==";break;}if (n = t.charCodeAt(o++), o == s) {r += e.base64EncodeChars.charAt(i >> 2), r += e.base64EncodeChars.charAt((3 & i) << 4 | (240 & n) >> 4), r += e.base64EncodeChars.charAt((15 & n) << 2), r += "=";break;}a = t.charCodeAt(o++), r += e.base64EncodeChars.charAt(i >> 2), r += e.base64EncodeChars.charAt((3 & i) << 4 | (240 & n) >> 4), r += e.base64EncodeChars.charAt((15 & n) << 2 | (192 & a) >> 6), r += e.base64EncodeChars.charAt(63 & a);}return r;}, e.base64decode = function (t) {var r, o, s, i, n, a, l;for (a = t.length, n = 0, l = ""; n < a;) {do {r = e.base64DecodeChars[255 & t.charCodeAt(n++)];} while (n < a && -1 == r);if (-1 == r) break;do {o = e.base64DecodeChars[255 & t.charCodeAt(n++)];} while (n < a && -1 == o);if (-1 == o) break;l += String.fromCharCode(r << 2 | (48 & o) >> 4);do {if (61 == (s = 255 & t.charCodeAt(n++))) return l;s = e.base64DecodeChars[s];} while (n < a && -1 == s);if (-1 == s) break;l += String.fromCharCode((15 & o) << 4 | (60 & s) >> 2);do {if (61 == (i = 255 & t.charCodeAt(n++))) return l;i = e.base64DecodeChars[i];} while (n < a && -1 == i);if (-1 == i) break;l += String.fromCharCode((3 & s) << 6 | i);}return l;}, e.utf16to8 = function (e) {var t, r, o, s;for (t = "", o = e.length, r = 0; r < o; r++) {(s = e.charCodeAt(r)) >= 1 && s <= 127 ? t += e.charAt(r) : s > 2047 ? (t += String.fromCharCode(224 | s >> 12 & 15), t += String.fromCharCode(128 | s >> 6 & 63), t += String.fromCharCode(128 | s >> 0 & 63)) : (t += String.fromCharCode(192 | s >> 6 & 31), t += String.fromCharCode(128 | s >> 0 & 63));}return t;}, e.utf8to16 = function (e) {var t, r, o, s, i, n;for (t = "", o = e.length, r = 0; r < o;) {switch ((s = e.charCodeAt(r++)) >> 4) {case 0:case 1:case 2:case 3:case 4:case 5:case 6:case 7:t += e.charAt(r - 1);break;case 12:case 13:i = e.charCodeAt(r++), t += String.fromCharCode((31 & s) << 6 | 63 & i);break;case 14:i = e.charCodeAt(r++), n = e.charCodeAt(r++), t += String.fromCharCode((15 & s) << 12 | (63 & i) << 6 | (63 & n) << 0);}}return t;}, e.base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", e.base64DecodeChars = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1], e;}();t.Base64 = o;}, function (e, t, r) {"use strict";var _o6,s = this && this.__extends || (_o6 = function o(e, t) {return (_o6 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (e, t) {e.__proto__ = t;} || function (e, t) {for (var r in t) {Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);}})(e, t);}, function (e, t) {function r() {this.constructor = e;}_o6(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r());});Object.defineProperty(t, "__esModule", { value: !0 }), t.RetryRoomHandler = void 0;var i = r(5),n = r(0),a = r(2),l = r(1),u = r(3),_ = function (e) {function t(t, r, o) {var s = e.call(this, t, r) || this;return s.logger = t, s.stateCenter = r, s.room = o, s.loginRoomCallback = {}, s;}return s(t, e), t.prototype.renewLocalToken = function (e, t) {this.token = e, this.room.token = this.token;var r = new Date().getTime(),o = void 0;t && "number" == typeof t ? o = 1e3 * t : ["03", "04"].includes(e.substring(0, 2)) && (o = 1e3 * u.ClientUtil.decodeTokenExpire(e.substring(2)) - r), o && this.roomHandler.resetTokenTimer(o - this.stateCenter.local_time_deviation), this.stateCenter.actionListener("_tokenRenewed", e, this.room.roomID);}, t.prototype.initRoom = function (e, t, r, o, s, i, n) {this.roomHandler = e, this.roomID = t, this.renewLocalToken(r), this.user = o, this.server = s, this.serverBak = i || s, this.config = n;}, t.prototype.active = function (e) {var t = this;if (this.logger.info(a.ZEGO_RTM_ACTION.ROOM_LOGIN_ROOM + " retry call"), this.roomHandler.setRunState(n.ENUM_RUN_STATE.trylogin), this.room.isMulti && this.room.service.isDisConnect()) this.logger.info(a.ZEGO_RTM_ACTION.ROOM_LOGIN_ROOM + " service is disconnected, multi room stop retry");else if (this.stateCenter.networkState != n.ENUM_NETWORK_STATE.offline) {if (this.retryTimer) this.logger.info(a.ZEGO_RTM_ACTION.ROOM_LOGIN_ROOM + " has actived, ignore");else if (this.isOverTime) this.logger.info(a.ZEGO_RTM_ACTION.ROOM_LOGIN_ROOM + " retry over time, stop retry");else {if (1 == this.retryActiveCount) this.retryActiveInterval = Math.floor(Math.random() * (1 - this.RETRY_START_TIME_INTERVAL) + this.RETRY_START_TIME_INTERVAL);else {var r = Math.pow(2, Math.round(this.retryActiveCount / this.RETRY_CONTINUE_COUNT + 1));this.retryActiveInterval = r > this.RETRY_MAX_TIME_INTERVAL ? this.RETRY_MAX_TIME_INTERVAL : r;}this.retryTimer = setTimeout(function () {t.roomHandler.login(t.retryActiveCount % 2 == 1 ? t.server : t.serverBak, t.roomID, t.token, t.user, t.config, function (e) {t.handleLoginFinish(e);}, function (e, r) {t.handleLoginFinish(!1, e, r);}), t.retryTimer && clearTimeout(t.retryTimer), t.retryTimer = null, t.retryActiveCount++;}, e ? 0 : 1e3 * this.retryActiveInterval);}} else this.logger.info(a.ZEGO_RTM_ACTION.ROOM_LOGIN_ROOM + " network is broken, stop retry");}, t.prototype.startMaxTime = function () {var e = this;this.maxTimer || (this.maxTimer = setTimeout(function () {e.logger.info(a.ZEGO_RTM_ACTION.ROOM_LOGIN_ROOM + " over max time " + e.RETRY_MAX_TIME + "s, stop retry"), e.isOverTime = !0, e.roomHandler.resetRoom(), e.stopMaxTime(), e.invalid(), e.onactive(!1, l.errorCodeList.LOGIN_TIMEOUT), e.loginRoomCallback.fail && (e.loginRoomCallback.fail(l.errorCodeList.LOGIN_TIMEOUT), e.loginRoomCallback.fail = void 0);}, 1e3 * this.RETRY_MAX_TIME));}, t.prototype.stopMaxTime = function () {this.maxTimer && clearTimeout(this.maxTimer), this.maxTimer = null;}, t.prototype.onactive = function (e, t) {}, t.prototype.handleError = function (e, t) {if (this.RETRY_MAX_TIME < 3) return !1;if (t) {var r = e.code + "";return !["1000002002", "1000005030", "1000005035", "1010", "1011", "1013", "1014", "1015", "1016", "1017", "1018", "1019", "1020", "1021", "1023"].includes(r) && (!!["1100040001", "1100040100"].includes(r) || this.room.lastRunState == n.ENUM_RUN_STATE.login && (this.room.sessionID = "", this.invalid(), !0));}return !0;}, t.prototype.setLoginRoomCallback = function (e, t) {this.loginRoomCallback.success = e, this.loginRoomCallback.fail = t;}, t.prototype.handleLoginFinish = function (e, t, r) {t ? this.handleError(t, r) ? (!this.maxTimer && this.startMaxTime(), this.active()) : (this.roomHandler.resetRoom(), this.stopMaxTime(), this.invalid(), this.onactive(e, t), this.loginRoomCallback.fail && (this.loginRoomCallback.fail(t), this.loginRoomCallback.fail = void 0)) : (this.stopMaxTime(), this.invalid(), this.onactive(e, { code: 0, msg: "" }), this.loginRoomCallback.success && (this.loginRoomCallback.success(e), this.loginRoomCallback.fail = void 0));}, t;}(i.TryHandler);t.RetryRoomHandler = _;}, function (e, t, r) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.checkParams = t.RULE_SUCCESS = t.RULE_PARAM_NAME = void 0;var o,s = r(3);!function (e) {e.NOT_EMPTY = "NOT_EMPTY", e.ILLEGAL_CHARACTERS = "ILLEGAL_CHARACTERS", e.TYPE_STRING = "TYPE_STRING", e.TYPE_INTEGER = "TYPE_INTEGER", e.TYPE_OBJECT = "TYPE_OBJECT", e.MAX_LENGTH_10 = "MAX_LENGTH_10", e.MAX_LENGTH_64 = "MAX_LENGTH_64", e.MAX_LENGTH_100 = "MAX_LENGTH_100", e.MAX_LENGTH_128 = "MAX_LENGTH_128", e.MAX_LENGTH_256 = "MAX_LENGTH_256", e.MAX_LENGTH_1024 = "MAX_LENGTH_1024";}(o = t.RULE_PARAM_NAME || (t.RULE_PARAM_NAME = {})), t.RULE_SUCCESS = { error: { code: 0, msg: "suc" } };var i = { NOT_EMPTY: function NOT_EMPTY(e, r, o, s, i) {return void 0 === r || "" === r || null === r ? (s.error(o + " " + e + " is empty"), i) : t.RULE_SUCCESS;}, ILLEGAL_CHARACTERS: function ILLEGAL_CHARACTERS(e, r, o, i, n) {return s.ClientUtil.checkIllegalCharacters(r) ? t.RULE_SUCCESS : (i.error(o + " " + e + " contains illegal characters"), n);}, TYPE_STRING: function TYPE_STRING(e, r, o, s, i) {return "string" != typeof r ? (s.error(o + " " + e + " must be string"), i) : t.RULE_SUCCESS;}, TYPE_INTEGER: function TYPE_INTEGER(e, r, o, i, n) {return s.ClientUtil.checkInteger(r, !1) ? t.RULE_SUCCESS : (i.error(o + " " + e + "  must be integer number"), n);}, TYPE_OBJECT: function TYPE_OBJECT(e, r, o, s, i) {return r && "object" == typeof r ? t.RULE_SUCCESS : (s.error(o + " " + e + "  must be object"), i);}, MAX_LENGTH_10: function MAX_LENGTH_10(e, r, o, s, i) {return r.length > 10 ? (s.error(o + " " + e + " is too long"), i) : t.RULE_SUCCESS;}, MAX_LENGTH_64: function MAX_LENGTH_64(e, r, o, s, i) {return r.length > 64 ? (s.error(o + " " + e + " is too long"), i) : t.RULE_SUCCESS;}, MAX_LENGTH_100: function MAX_LENGTH_100(e, r, o, s, i) {return r.length > 100 ? (s.error(o + " " + e + " is too long"), i) : t.RULE_SUCCESS;}, MAX_LENGTH_128: function MAX_LENGTH_128(e, r, o, s, i) {return r.length > 128 ? (s.error(o + " " + e + " is too long"), i) : t.RULE_SUCCESS;}, MAX_LENGTH_256: function MAX_LENGTH_256(e, r, o, s, i) {return r.length > 256 ? (s.error(o + " " + e + " is too long"), i) : t.RULE_SUCCESS;}, MAX_LENGTH_1024: function MAX_LENGTH_1024(e, r, o, s, i) {return r.length > 1024 ? (s.error(o + " " + e + " is too long"), i) : t.RULE_SUCCESS;} };t.checkParams = function (e, r) {var s = [],n = {};for (var a in e) {n[e[a].order] = e[a], e[a].key = a;}for (var l in n) {s.push(n[l]);}for (var u = 0; u < s.length; u++) {for (var _ = s[u].rules, d = 0; d < _.length; d++) {var c = { key: s[u].key, value: s[u].value, action: r.action, logger: r.logger },g = c.key,h = c.value,E = c.action,p = c.logger,T = _[d].name ? "" + _[d].name : "";if ((void 0 === h && T === o.NOT_EMPTY || void 0 !== h) && i[T]) {var m = i[T](g, h, E, p, _[d]);if (m != t.RULE_SUCCESS) return m;}}}return t.RULE_SUCCESS;};}, function (e, t, r) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.StateCenter = void 0;var o = r(0),s = r(2),i = r(4),n = function () {function e(e, t) {this.logger = e, this.dataReport = t, this._debug = !1, this._testEnvironment = !1, this._env = 0, this.type = "PUBLIC", this.debugCustom = !1, this.configOK = !1, this.role = 2, this.relateService = [], this.maxMemberCount = 0, this.roomCreateFlag = 1, this.local_time_deviation = 0, this.callbackList = {}, this.listenerList = { roomUserUpdate: [], roomOnlineUserCountUpdate: [], getAnchorInfo: [], _getAnchorInfo: [], IMRecvCustomCommand: [], IMRecvBroadcastMessage: [], recvReliableMessage: [], roomExtraInfoUpdate: [], IMRecvBarrageMessage: [], recvJoinLiveRequest: [], recvInviteJoinLiveRequest: [], recvEndJoinLiveCommand: [], roomLoginResponse: [], HBResponse: [], roomStateUpdate: [], _roomStateUpdate: [], _getTotalUserList: [], _userStateUpdate: [], _recvBigRoomMessage: [], _recvRoomMsg: [], _kickout: [], tokenWillExpire: [], hallStateUpdate: [], _hallStateUpdate: [], roomTokenWillExpire: [], _tokenRenewed: [], _protobufResponse: [] }, this.reportList = {}, this.reportSeqList = { login: 0, relogin: 0 }, this.networkState = o.ENUM_NETWORK_STATE.offline, this.roomRetryTime = 300, this.roomModulesList = [], this.isMultiRoom = !1, this.setMultiRoom = !1, this.configRoomAuth = !1, this.configCheckToken = !1, this._sdkVersion = "unknown";}return Object.defineProperty(e.prototype, "debug", { get: function get() {return this._debug;}, set: function set(e) {this._debug = e, o.LoggerStateCenter.getInstance().debug = e;}, enumerable: !1, configurable: !0 }), Object.defineProperty(e.prototype, "testEnvironment", { get: function get() {return this._testEnvironment;}, set: function set(e) {this._testEnvironment = e, o.LoggerStateCenter.getInstance().testEnvironment = e;}, enumerable: !1, configurable: !0 }), Object.defineProperty(e.prototype, "ENV", { get: function get() {return this._env;}, set: function set(e) {this._env = e, o.LoggerStateCenter.getInstance().ENV = e;}, enumerable: !1, configurable: !0 }), Object.defineProperty(e.prototype, "roomid", { get: function get() {return this.roomModulesList[0] ? this.roomModulesList[0].roomID : "";}, enumerable: !1, configurable: !0 }), Object.defineProperty(e.prototype, "serverTimeOffset", { get: function get() {return this.roomModulesList[0] ? this.roomModulesList[0].messageHandler.serverTimeOffset : 0;}, enumerable: !1, configurable: !0 }), e.prototype.getRequestId = function () {return this.idName + "-" + o.getSeq();}, e.prototype.actionListener = function (e) {for (var t = this, r = [], n = 1; n < arguments.length; n++) {r[n - 1] = arguments[n];}if (this.listenerList[e]) {var a = o.getReportSeq();this.dataReport.newReport(a, i.ZegoRTMLogEvent.kZegoListener.event), this.dataReport.addMsgInfo(a, { listener: e, params: r }), this.dataReport.uploadReport(a);}this.listenerList[e] && this.listenerList[e].forEach(function (o) {try {o.apply(void 0, r);} catch (r) {t.logger.error(s.ZEGO_RTM_ACTION.STATE_ACTION + " ", e, " ", JSON.stringify(r));}});}, Object.defineProperty(e.prototype, "sdKVersion", { get: function get() {return this._sdkVersion;}, set: function set(e) {this._sdkVersion = e;}, enumerable: !1, configurable: !0 }), e;}();t.StateCenter = n;}, function (e, t, r) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.LiveRoomModules = void 0;var o = r(0),s = r(6),i = r(7),n = r(8),a = r(20),l = r(9),u = function () {function e(e, t, r, u, _) {this.roomID = e, this.stateCenter = t, this.logger = r, this.dataReport = u, this.service = _, this.runState = o.ENUM_RUN_STATE.logout, this.lastRunState = o.ENUM_RUN_STATE.logout, this.lastRoomState = "DISCONNECTED", this.roomState = "DISCONNECTED", this.roomSessionID = "0", this.sessionID = "0", this.isMulti = !1, this.token = "", this.thirdToken = "", this.roomHandler = new a.RoomHandler(this.logger, this.stateCenter, this.dataReport, this.service, this), this.heartBeatHandler = new s.HeartBeatHandler(this.logger, this.stateCenter, this.dataReport, this.service, this), this.userHandler = new l.UserHandler(this.logger, this.stateCenter, this.dataReport, this.service, this), this.messageHandler = new n.MessageHandler(this.logger, this.stateCenter, this.dataReport, this.service, this), this.liveHandler = new i.LiveHandler(this.logger, this.stateCenter, this.service, this), this.init();}return e.prototype.init = function () {this.bindHeatBeatHandler(), this.bindRoomHandler(), this.bindMessageHandler(), this.bindLiveHandler();}, e.prototype.bindHeatBeatHandler = function () {var e = this;this.heartBeatHandler.hbLogout = function (t) {e.roomHandler.handleHbLogout(t);}, this.heartBeatHandler.heartbeatRspNotiFy = function (t) {e.messageHandler.loginRsp(t), e.userHandler.patchUserList(t), e.HBResponse(t);};}, e.prototype.bindRoomHandler = function () {var e = this;this.roomHandler.loginSuccessCallBack = function (t, r) {e.heartBeatHandler.init(r), e.service.stopCheck(), e.service.startCheck(), e.userHandler.loginRsp(r, t), e.messageHandler.loginRsp(r), e.handleMultiRoom(), e.roomLoginResponse(r);}, this.roomHandler.resetRoomCallBack = function () {e.heartBeatHandler.resetHeartbeat(), e.liveHandler.resetLiveHandler(), e.messageHandler.resetMessageInfo(), e.userHandler.resetUserHandler(), e.service.stopCheck(), e.roomTryHandler && (e.roomTryHandler.invalid(), e.roomTryHandler.stopMaxTime(), e.roomTryHandler = void 0);};}, e.prototype.bindUserHandler = function () {}, e.prototype.bindMessageHandler = function () {}, e.prototype.bindLiveHandler = function () {}, e.prototype.HBResponse = function (e) {this.stateCenter.actionListener("HBResponse", e);}, e.prototype.roomLoginResponse = function (e) {this.stateCenter.actionListener("roomLoginResponse", e);}, e.prototype.handleMultiRoom = function () {this.stateCenter.roomModulesList.forEach(function (e) {e.runState !== o.ENUM_RUN_STATE.login && e.roomTryHandler && 1 == e.isMulti && (e.roomTryHandler.onactive = function (t, r) {r && 0 !== r.code ? e.roomHandler.roomStateHandle("DISCONNECTED", r) : e.roomHandler.roomStateHandle("CONNECTED", r);}, e.roomTryHandler.startMaxTime(), e.roomTryHandler.active());});}, e.prototype.isLogin = function () {return this.runState === o.ENUM_RUN_STATE.login;}, e;}();t.LiveRoomModules = u;}, function (e, t, r) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.RoomHandler = void 0;var o = r(0),s = r(3),i = r(2),n = r(1),a = r(4),l = function () {function e(e, t, r, o, s) {this.logger = e, this.stateCenter = t, this.dataReport = r, this.service = o, this.room = s, this.tryLoginTimer = null, this.tryLoginCount = 0, this.tryLoginInterval = 1e4, this.tokenTimer = null, this.beforeExpire = 30;}return e.prototype.resetTokenTimer = function (e) {var t = this;e = (e = e < 0 ? 0 : e) > 2147483648 ? 2147483648 : e, this.logger.info(i.ZEGO_RTM_ACTION.ROOM_RESETTOKEN_TIMER + "  call: " + e), this.tokenTimer && clearTimeout(this.tokenTimer), this.tokenTimer = setTimeout(function () {t.stateCenter.actionListener("tokenWillExpire", t.room.roomID), t.stateCenter.actionListener("roomTokenWillExpire", t.room.roomID);}, e);}, e.prototype.stopTokenTimer = function () {clearTimeout(this.tokenTimer);}, e.prototype.setRunState = function (e) {this.room.lastRunState = this.room.runState, this.room.runState = e;}, e.prototype.resetTryLogin = function () {this.tryLoginTimer && clearTimeout(this.tryLoginTimer), this.tryLoginTimer = null;}, e.prototype.resetRoom = function (e) {var t = this;if (this.logger.info(i.ZEGO_RTM_ACTION.ROOM_RESET_ROOM + " call"), this.stateCenter.roomModulesList.length > 1 && !e && (this.room.isMulti = !0), this.resetTryLogin(), "0" !== this.room.sessionID && this.room.runState !== o.ENUM_RUN_STATE.logout) {var r = function r(e) {t.handleLogoutRsp(e);};this.service.logout(this.room, r, r);}this.setRunState(o.ENUM_RUN_STATE.logout), this.room.sessionID = "", this.room.roomSessionID = "", this.room.isMulti || (this.stateCenter.userid = "", this.logger.setSessionInfo(this.stateCenter.appid, this.room.roomID, this.room.sessionID, this.stateCenter.idName, this.stateCenter.nickName, this.stateCenter.sdKVersion), this.service.closeSocket()), this.resetRoomCallBack(), this.stateCenter.roomModulesList = this.stateCenter.roomModulesList.filter(function (e) {return e !== t.room;});var s = this.stateCenter.roomModulesList[0];s && (s.isMulti = !1, s.runState !== o.ENUM_RUN_STATE.login && s.roomTryHandler && (s.roomTryHandler.startMaxTime(), s.roomTryHandler.active())), this.logger.info(i.ZEGO_RTM_ACTION.ROOM_RESET_ROOM + " call success");}, e.prototype.resetRoomCallBack = function () {}, e.prototype.loginSuccessCallBack = function (e, t) {}, e.prototype.handlePushKickout = function (e, t) {var r = this;this.logger.info(i.ZEGO_RTM_ACTION.ROOM_KICK_OUT + "  call " + JSON.stringify(e));var l = o.getReportSeq();this.dataReport.newReport(l, a.ZegoRTMLogEvent.kZegoTaskKickout.event), this.dataReport.addMsgInfo(l, { user_id: a.ZegoRTMLogEvent.kZegoTaskKickout.user_id(this.stateCenter.idName) });var u = s.ClientUtil.getKickoutError(e.body.reason);this.dataReport.addMsgInfo(l, { error: u.code, message: u.message }), this.dataReport.uploadReport(l);var _ = this.room.roomTryHandler;if (_) {if (_.onactive = function (e, t) {r.disconnectedHandle(t), r.stateCenter.actionListener("_kickout", t);}, e.body.need_relogin && 1 == e.body.need_relogin) this.room.sessionID = "", _.startMaxTime(), _.active();else {this.resetRoom(t);var d = {};e && e.body.custom_reason ? d.custom_kickout_message = e.body.custom_reason : u.name && n.errorCodeList[u.name] && (d.custom_kickout_message = n.errorCodeList[u.name].msg + " kickout，reason: " + e.body.reason), u.name && n.errorCodeList[u.name] ? this.disconnectedHandle(n.errorCodeList[u.name], JSON.stringify(d)) : this.disconnectedHandle(n.errorCodeList.ROOM_INNER_ERROR, JSON.stringify(d)), this.stateCenter.actionListener("_kickout", { code: n.errorCodeList.MANUAL_KICKOUT.code, msg: n.errorCodeList.MANUAL_KICKOUT.msg + e.body.reason });}} else this.logger.info(i.ZEGO_RTM_ACTION.ROOM_KICK_OUT + " try handler no found");}, e.prototype.handleHbLogout = function (e) {var t = this,r = this.room.roomTryHandler;r && (r.onactive = function (e, r) {t.disconnectedHandle(r);}, [n.errorCodeList.HEARTBEAT_TIMEOUT, n.errorCodeList.SOCKET_CLOSE, n.errorCodeList.TIMEOUT].includes(e) || e.msg.endsWith("1000002001") || e.msg.endsWith("1000000152") ? (r.startMaxTime(), r.active()) : (r.stopMaxTime(), r.invalid(), this.resetRoom(), this.disconnectedHandle(e)));}, e.prototype.onDisconnect = function (e) {var t = this;if (this.logger.error(i.ZEGO_RTM_ACTION.ROOM_DISCONNECT + " " + e.msg), "string" == typeof e.code && "Error.Network" === e.code) this.dataReport.addMsgInfo(this.stateCenter.reportSeqList.relogin, { error: a.ZegoRTMLogEvent.kZegoTaskReLoginRoom.error.ROOM_DISCONNECT.code, message: a.ZegoRTMLogEvent.kZegoTaskReLoginRoom.error.ROOM_DISCONNECT.msg });else if ("number" == typeof e.code) {var r;(r = e.code < 2e9 && e.code > 1e9 || e.code < 1e6 ? s.ClientUtil.decodeServerError(e.code, e.msg) : { code: e.code, message: e.msg }) && this.dataReport.addMsgInfo(this.stateCenter.reportSeqList.relogin, { error: r.code, message: r.message });}this.dataReport.uploadReport(this.stateCenter.reportSeqList.relogin), this.stateCenter.reportSeqList.relogin = 0, s.ClientUtil.unregisterCallback(a.ZegoRTMLogEvent.kZegoTaskReLoginRoom.event, this.stateCenter.reportList);var o = this.room.roomTryHandler;o ? (o.onactive = function (e, r) {r && 0 !== r.code ? t.roomStateHandle("DISCONNECTED", r) : t.roomStateHandle("CONNECTED", r);}, o.startMaxTime(), o.active()) : this.logger.error(i.ZEGO_RTM_ACTION.ROOM_DISCONNECT + " try handler no found");}, e.prototype.onConnecting = function (e) {this.roomStateHandle("CONNECTING", e);}, e.prototype.disconnectedHandle = function (e, t) {e && 0 !== e.code ? (this.stopTokenTimer(), this.roomStateHandle("DISCONNECTED", e, t)) : this.roomStateHandle("CONNECTED", e, t);}, e.prototype.roomStateHandle = function (e, t, r) {this.logger.info(i.ZEGO_RTM_ACTION.ROOM_STATUS_CALLBACK + " " + e + " " + JSON.stringify(t)), this.room.lastRoomState = this.room.roomState, this.room.roomState = e, this.room.roomState !== this.room.lastRoomState && (this.stateCenter.actionListener("roomStateUpdate", this.room.roomID, e, t ? t.code : 0, r), this.stateCenter.actionListener("_roomStateUpdate", this.room.roomID, e, t ? t.code : 0, r));}, e.prototype.login = function (e, t, r, l, u, _, d) {if (this.logger.info(i.ZEGO_RTM_ACTION.ROOM_LOGIN_ROOM + " call:", t, r), !this.room.isMulti && this.logger.setSessionInfo(this.stateCenter.appid, t, "", l.userID, "", this.stateCenter.sdKVersion), u && (u.userUpdate && "boolean" == typeof u.userUpdate && (this.stateCenter.userStateUpdate = u.userUpdate), u.maxMemberCount && "number" == typeof u.maxMemberCount && (this.stateCenter.maxMemberCount = u.maxMemberCount)), !this.stateCenter.configOK) return this.logger.error(i.ZEGO_RTM_ACTION.ROOM_LOGIN_ROOM + " init sdk wrong"), void d(n.errorCodeList.INIT);if (this.room.runState !== o.ENUM_RUN_STATE.trylogin && this.setRunState(o.ENUM_RUN_STATE.trylogin), this.room.roomID = t, this.room.token = r, this.room.thirdToken = r, this.stateCenter.idName = l.userID, this.stateCenter.nickName = l.userName || l.userID, s.ClientUtil.registerCallback("login", { success: _, error: d }, this.stateCenter.callbackList), 0 === this.stateCenter.reportSeqList.login) {var c = o.getReportSeq();this.stateCenter.reportSeqList.relogin = c, this.dataReport.newReport(c, a.ZegoRTMLogEvent.kZegoTaskReLoginRoom.event), this.dataReport.addMsgInfo(c, { server: e }), s.ClientUtil.logReportCallback(a.ZegoRTMLogEvent.kZegoTaskReLoginRoom.event, this.dataReport, c, this.stateCenter.reportList);}this.resetTryLogin(), this.onConnecting({ code: 0, msg: "" }), this.tryLogin(e), this.logger.info(i.ZEGO_RTM_ACTION.ROOM_LOGIN_ROOM + " call success");}, e.prototype.tryLogin = function (e) {var t = this;if (this.room.runState === o.ENUM_RUN_STATE.trylogin) {var r = 0 !== this.stateCenter.reportSeqList.login ? a.ZegoRTMLogEvent.kZegoTaskLoginRoom.event : a.ZegoRTMLogEvent.kZegoTaskReLoginRoom.event;if (this.service.isDisConnect()) try {this.service.closeSocket(), this.logger.debug(i.ZEGO_RTM_ACTION.ROOM_TRY_LOGIN + " new websocket"), s.ClientUtil.actionSuccessCallback(r, this.stateCenter.reportList) && (this.tryLoginCount > 1 && s.ClientUtil.actionSuccessCallback(r, this.stateCenter.reportList)(o.REPORT_ACTION.eventEnd, a.ZegoRTMLogEvent.kZegoTaskLoginRoom.subEvent.create_socket.event), s.ClientUtil.actionSuccessCallback(r, this.stateCenter.reportList)(o.REPORT_ACTION.eventStart, a.ZegoRTMLogEvent.kZegoTaskLoginRoom.subEvent.create_socket.event), s.ClientUtil.actionSuccessCallback(r, this.stateCenter.reportList)(o.REPORT_ACTION.addEventMsg, a.ZegoRTMLogEvent.kZegoTaskLoginRoom.subEvent.create_socket.event, a.ZegoRTMLogEvent.kZegoTaskLoginRoom.subEvent.create_socket.server("server"), e)), this.service.createSocket(e), this.service.openHandler(function () {t.openHandler();}), this.service.closeHandler(function (e) {t.logger.error(i.ZEGO_RTM_ACTION.ROOM_TRY_LOGIN + " close " + JSON.stringify(e.code ? e.code : e)), t.service.closeSocket(), t.closeHandler(e);}), this.service.errorHandler(function (e) {t.logger.error(i.ZEGO_RTM_ACTION.ROOM_TRY_LOGIN + " error " + JSON.stringify(e.code ? e.code : e)), t.service.closeSocket(), t.closeHandler(e);});} catch (e) {this.logger.error(i.ZEGO_RTM_ACTION.ROOM_TRY_LOGIN + "  websocket err:" + JSON.stringify(e));} else {this.logger.info(i.ZEGO_RTM_ACTION.ROOM_TRY_LOGIN + " use current websocket and sent login"), s.ClientUtil.actionSuccessCallback(r, this.stateCenter.reportList) && s.ClientUtil.actionSuccessCallback(r, this.stateCenter.reportList)(o.REPORT_ACTION.eventStart, a.ZegoRTMLogEvent.kZegoTaskLoginRoom.subEvent.liveroom_login.event);var n = function n(e, r) {t.handleLoginRsp(e, r);};this.service.login(this.room, n, n);}this.tryLoginTimer = setTimeout(function () {t.logger.info(i.ZEGO_RTM_ACTION.ROOM_TRY_LOGIN + " over time no response, login timeout"), s.ClientUtil.actionErrorCallback("login", t.stateCenter.callbackList)(a.ZegoRTMLogEvent.kZegoTaskLoginRoom.error.LOGIN_TIMEOUT);}, this.tryLoginInterval), this.logger.info(i.ZEGO_RTM_ACTION.ROOM_TRY_LOGIN + " call success");} else this.logger.error("zb.rh.tl state error");}, e.prototype.openHandler = function () {var e = this;this.logger.info(i.ZEGO_RTM_ACTION.ROOM_OPEN_HANDLER + " websocket.onpen call");var t = 0 !== this.stateCenter.reportSeqList.login ? a.ZegoRTMLogEvent.kZegoTaskLoginRoom.event : a.ZegoRTMLogEvent.kZegoTaskReLoginRoom.event;s.ClientUtil.actionSuccessCallback(t, this.stateCenter.reportList) && s.ClientUtil.actionSuccessCallback(t, this.stateCenter.reportList)(o.REPORT_ACTION.eventEndWithMsgInfo, a.ZegoRTMLogEvent.kZegoTaskLoginRoom.subEvent.create_socket.event, { try_cnt: this.tryLoginCount }), this.service.onPush(), s.ClientUtil.actionSuccessCallback(t, this.stateCenter.reportList) && s.ClientUtil.actionSuccessCallback(t, this.stateCenter.reportList)(o.REPORT_ACTION.eventStart, a.ZegoRTMLogEvent.kZegoTaskLoginRoom.subEvent.liveroom_login.event);var r = function r(t, _r2) {e.handleLoginRsp(t, _r2);};this.service.login(this.room, r, r);}, e.prototype.handleLoginRsp = function (e, t) {var r = 0 !== this.stateCenter.reportSeqList.login ? a.ZegoRTMLogEvent.kZegoTaskLoginRoom.event : a.ZegoRTMLogEvent.kZegoTaskReLoginRoom.event;if (s.ClientUtil.actionSuccessCallback(r, this.stateCenter.reportList) && s.ClientUtil.actionSuccessCallback(r, this.stateCenter.reportList)(o.REPORT_ACTION.eventEndWithMsgInfo, a.ZegoRTMLogEvent.kZegoTaskLoginRoom.subEvent.liveroom_login.event), this.room.runState === o.ENUM_RUN_STATE.trylogin) {if (e.header && e.body) {if (e.header.seq !== t && 0 == this.room.isMulti) return void this.logger.error(i.ZEGO_RTM_ACTION.ROOM_HANDLE_LOGINRSP + " in wrong seq, local=", t + "", ",recv=", e.header.seq);0 !== e.body.err_code ? (this.logger.error(i.ZEGO_RTM_ACTION.ROOM_HANDLE_LOGINRSP + " server error=", e.body.err_code), this.handleLoginFail(e)) : (this.logger.info(i.ZEGO_RTM_ACTION.ROOM_HANDLE_LOGINRSP + " call success."), this.handleLoginSuccess(e));} else this.logger.error(i.ZEGO_RTM_ACTION.ROOM_HANDLE_LOGINRSP + " " + JSON.stringify(e)), this.handleLoginFail(e);} else this.logger.error(i.ZEGO_RTM_ACTION.ROOM_HANDLE_LOGINRSP + " state error");}, e.prototype.handleLoginFail = function (e) {this.resetTryLogin();var t = a.ZegoRTMLogEvent.kZegoTaskLoginRoom.error.INNER_ERROR;e.header && e.body ? t = s.ClientUtil.getServerError(e.body.err_code) : e.code && e.msg && (t = e), s.ClientUtil.actionErrorCallback("login", this.stateCenter.callbackList)(t, !0);}, e.prototype.handleLoginSuccess = function (e) {var t,r = {},i = this.room.lastRunState;this.setRunState(o.ENUM_RUN_STATE.login), this.stateCenter.userid = e.body.user_id, this.room.sessionID = e.body.session_id, this.room.roomSessionID = e.body.room_session_id;var n = null === (t = null == e ? void 0 : e.body) || void 0 === t ? void 0 : t.token_remain_time;if (this.stateCenter.configRoomAuth = n > 0, e.body.ret_timestamp && ["03", "04"].includes(this.room.token.substring(0, 2))) {var l = new Date().getTime(),u = l - e.body.ret_timestamp;this.stateCenter.local_time_deviation = u < 5e3 ? 0 : u;var _ = n > 0 ? 1e3 * n : 1e3 * s.ClientUtil.decodeTokenExpire(this.room.token.substring(2)) - l;this.resetTokenTimer(_ - this.stateCenter.local_time_deviation);}!this.room.isMulti && this.logger.setSessionInfo(this.stateCenter.appid, this.room.roomID, this.room.sessionID, this.stateCenter.idName, this.stateCenter.nickName, this.stateCenter.sdKVersion), e.body.config_info && (this.logger.setRemoteLogLevel(e.body.config_info.log_level), r.log_level = e.body.config_info.log_level, "" == e.body.config_info.log_url || this.logger.url || (this.logger.setLogServer(e.body.config_info.log_url), r.log_url = e.body.config_info.log_url)), e.body.cluster_env && 1 === e.body.cluster_env && (this.stateCenter.testEnvironment = !0, r.test_environment = "true", !this.stateCenter.debugCustom && (this.stateCenter.debug = !0));var d = 0 !== this.stateCenter.reportSeqList.login ? a.ZegoRTMLogEvent.kZegoTaskLoginRoom.event : a.ZegoRTMLogEvent.kZegoTaskReLoginRoom.event;s.ClientUtil.actionSuccessCallback(d, this.stateCenter.reportList) && s.ClientUtil.actionSuccessCallback(d, this.stateCenter.reportList)(o.REPORT_ACTION.addEventMsg, a.ZegoRTMLogEvent.kZegoTaskLoginRoom.subEvent.liveroom_login.event, a.ZegoRTMLogEvent.kZegoTaskLoginRoom.subEvent.liveroom_login.respond_info("respond_info"), r), this.resetTryLogin(), this.loginSuccessCallBack(i, e), s.ClientUtil.actionSuccessCallback("login", this.stateCenter.callbackList) && s.ClientUtil.actionSuccessCallback("login", this.stateCenter.callbackList)(!0), this.roomStateHandle("CONNECTED", { code: 0, msg: "" });}, e.prototype.closeHandler = function (e) {this.logger.error(i.ZEGO_RTM_ACTION.ROOM_CLOSEHANDLER + " room websocket close " + JSON.stringify(e.code ? e.code : e)), this.room.runState !== o.ENUM_RUN_STATE.logout ? this.room.runState === o.ENUM_RUN_STATE.trylogin ? (this.resetTryLogin(), s.ClientUtil.actionErrorCallback("login", this.stateCenter.callbackList)(1006 == e.code ? a.ZegoRTMLogEvent.kZegoTaskLoginRoom.error.LOGIN_TIMEOUT : e)) : this.room.runState === o.ENUM_RUN_STATE.login && (this.logger.info(i.ZEGO_RTM_ACTION.ROOM_CLOSEHANDLER + " is called because of network broken"), this.resetTryLogin(), this.onDisconnect(a.ZegoRTMLogEvent.kZegoTaskLoginRoom.error.NETWORK_BROKEN)) : this.logger.info(i.ZEGO_RTM_ACTION.ROOM_CLOSEHANDLER + " onclose logout flow call websocket.close");}, e.prototype.logout = function (e) {this.logger.info(i.ZEGO_RTM_ACTION.ROOM_LOGOUT + " call"), this.room.runState !== o.ENUM_RUN_STATE.logout ? (this.resetRoom(e), this.roomStateHandle("DISCONNECTED", { code: 0, msg: "" }), this.stopTokenTimer(), this.logger.info(i.ZEGO_RTM_ACTION.ROOM_LOGOUT + " call success")) : this.logger.warn("zb.rh.lo at logout");}, e.prototype.handleLogoutRsp = function (e) {this.logger.info(i.ZEGO_RTM_ACTION.ROOM_LOGOUT + " result=", e.body && e.body.err_code ? e.body.err_code : "-1");}, e;}();t.RoomHandler = l;}, function (e, t, r) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.LiveRoomModules = void 0;var o = r(0),s = r(6),i = r(7),n = r(8),a = r(9),l = r(22),u = r(23),_ = r(1),d = r(4),c = function () {function e(e, t, r, _) {this.stateCenter = e, this.logger = t, this.dataReport = r, this.service = _, this.roomID = "", this.dispatchServer = "", this.deviceID = "", this.deviceType = "", this.anType = 0, this.sessionExpire = "", this.pri_roomID = "", this.roomSid = "0", this.roomFlag = 1, this.timeStamp = 0, this.netType = 2, this.userSeq = 0, this.hallRunState = o.ENUM_RUN_STATE.logout, this.hallToken = "", this.roomSessionID = "", this.lastHallRunState = o.ENUM_RUN_STATE.logout, this.runRoomState = o.ENUM_RUN_STATE.logout, this.lastRunRoomState = o.ENUM_RUN_STATE.logout, this.lastHallState = "DISCONNECTED", this.hallState = "DISCONNECTED", this.lastRoomState = "DISCONNECTED", this.roomState = "DISCONNECTED", this.sessionID = "", this.hallHandler = new l.HallHandler(this.logger, this.stateCenter, this.dataReport, this.service, this), this.roomPrivateHandler = new u.RoomPrivateHandler(this.logger, this.stateCenter, this.dataReport, this.service, this), this.heartBeatHandler = new s.HeartBeatHandler(this.logger, this.stateCenter, this.dataReport, this.service, this.stateCenter.priModules), this.userHandler = new a.UserHandler(this.logger, this.stateCenter, this.dataReport, this.service, this.stateCenter.priModules), this.messageHandler = new n.MessageHandler(this.logger, this.stateCenter, this.dataReport, this.service, this.stateCenter.priModules), this.liveHandler = new i.LiveHandler(this.logger, this.stateCenter, this.service, this.stateCenter.priModules), this.init();}return e.prototype.init = function () {this.bindSocketHandler(), this.bindHeatBeatHandler(), this.bindHallHandler(), this.bindMessageHandler(), this.bindLiveHandler(), this.bindRoomHandler();}, e.prototype.bindSocketHandler = function () {var e = this;this.service.handleHallKickout = function (t) {e.hallHandler.handleHallKickout(t);}, this.service.handlePushKickout = function (t) {e.logger.info("zb.cm.bsh.0  call hpk");var r = o.getReportSeq();e.dataReport.newReport(r, d.ZegoRTMLogEvent.kZegoTaskRoomKickout.event), e.dataReport.addMsgInfo(r, { user_id: d.ZegoRTMLogEvent.kZegoTaskRoomKickout.user_id(e.stateCenter.idName), room_id: d.ZegoRTMLogEvent.kZegoTaskRoomKickout.room_id(e.stateCenter.priModules.roomID) }), e.dataReport.addMsgInfo(r, { error: t.body.reason, message: t.body.message }), e.dataReport.uploadReport(r), e.setRoomRunState(o.ENUM_RUN_STATE.logout), e.roomPrivateHandler.resetRoom();var s = {};t && t.body && (t.body.reason && (s.custom_kickout_message = t.body.message), t.body.reason && (s.reason = t.body.reason)), e.roomPrivateHandler.roomStateHandle("DISCONNECTED", { code: _.errorCodeList.MULTIPLE_LOGIN_KICKOUT.code, msg: s }), e.logger.info("zb.cm.bsh.0  call hpk success");}, this.service.handlePushUserStateUpdateMsg = function (t) {e.userHandler.handlePushUserStateUpdateMsg(t);}, this.service.handlePushTransMsg = function (t) {e.messageHandler.handlePushTransMsg(t);}, this.service.handlePushRoomMsg = function (t) {e.messageHandler.handlePushRoomMsg(t);}, this.service.handlePushCustomMsg = function (t) {e.messageHandler.handlePushCustomMsg(t);}, this.service.handlePushMergeMsg = function (t) {e.messageHandler.handlePushMergeMsg(t);}, this.service.handlePushSignalMsg = function (t) {e.liveHandler.handlePushSignalMsg(t);};}, e.prototype.bindHeatBeatHandler = function () {var e = this;this.heartBeatHandler.hbLogout = function (t) {e.hallHandler.handleHbLogout(t);}, this.heartBeatHandler.heartbeatRspNotiFy = function (t) {e.messageHandler.loginRsp(t), e.HBResponse(t);};}, e.prototype.bindHallHandler = function () {var e = this;this.hallHandler.loginSuccessCallBack = function (t, r) {if (e.heartBeatHandler.init(r), e.service.startCheck(), e.runRoomState === o.ENUM_RUN_STATE.login) {var s = function s(t, r) {0 !== t.body.code ? (e.setRoomRunState(o.ENUM_RUN_STATE.logout), e.roomPrivateHandler.roomStateHandle("DISCONNECTED", { code: t.body.code, msg: t.body.message })) : (e.timeStamp = t.header.timeStamp, e.roomSid = t.body.room_header.room_sid, e.roomSessionID = t.body.room_header.room_user_session_id, e.userSeq = t.body.userlist_seq, e.setRoomRunState(o.ENUM_RUN_STATE.login), e.roomPrivateHandler.roomStateHandle("CONNECTED", { code: 0, msg: "" }), e.userHandler.loginPrivateRsp(t), e.roomLoginResponse(t));};e.roomPrivateHandler.enterRoom(s, s);}}, this.hallHandler.resetRoomCallBack = function () {e.heartBeatHandler.resetHeartbeat(), e.liveHandler.resetLiveHandler(), e.messageHandler.resetMessageInfo(), e.userHandler.resetUserHandler();};}, e.prototype.bindUserHandler = function () {}, e.prototype.bindMessageHandler = function () {}, e.prototype.bindLiveHandler = function () {}, e.prototype.bindRoomHandler = function () {var e = this;this.roomPrivateHandler.resetRoomCallBack = function () {e.liveHandler.resetLiveHandler(), e.messageHandler.resetMessageInfo(), e.userHandler.resetUserHandler();};}, e.prototype.HBResponse = function (e) {this.stateCenter.actionListener("HBResponse", e);}, e.prototype.roomLoginResponse = function (e) {this.stateCenter.actionListener("roomLoginResponse", e);}, e.prototype.setRoomRunState = function (e) {this.roomPrivateHandler.setRoomRunState(e);}, e.prototype.isLogin = function () {return this.hallRunState === o.ENUM_RUN_STATE.login;}, e;}();t.LiveRoomModules = c;}, function (e, t, r) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.HallHandler = void 0;var o = r(0),s = r(3),i = r(0),n = r(2),a = r(1),l = r(4),u = function () {function e(e, t, r, o, s) {this.logger = e, this.stateCenter = t, this.dataReport = r, this.service = o, this.room = s, this.tryLoginTimer = null, this.tryLoginCount = 0, this.tryLoginInterval = 1e4;}return e.prototype.setRunState = function (e) {this.room.lastHallRunState = this.room.hallRunState, this.room.hallRunState = e;}, e.prototype.resetTryLogin = function () {this.tryLoginTimer && clearTimeout(this.tryLoginTimer), this.tryLoginTimer = null;}, e.prototype.resetHall = function () {var e = this;if (this.logger.info(n.ZEGO_RTM_ACTION.ROOM_RESET_ROOM + " call"), this.resetTryLogin(), "0" !== this.room.sessionID && this.room.hallRunState !== o.ENUM_RUN_STATE.logout) {var t = function t(_t) {e.handleLogoutRsp(_t);};this.service.logoutHall(t, t);}this.setRunState(o.ENUM_RUN_STATE.logout), this.stateCenter.userid = "", this.room.sessionID = "", this.room.roomSessionID = "", this.logger.setSessionInfo(this.stateCenter.appid, this.room.roomID, this.room.sessionID, this.stateCenter.idName, this.stateCenter.nickName, this.stateCenter.sdKVersion), this.service.closeSocket(), this.resetRoomCallBack(), this.logger.info(n.ZEGO_RTM_ACTION.ROOM_RESET_ROOM + " call success");}, e.prototype.resetRoomCallBack = function () {}, e.prototype.loginSuccessCallBack = function (e, t) {}, e.prototype.handleHallKickout = function (e) {this.logger.info(n.ZEGO_RTM_ACTION.ROOM_KICK_OUT + "  call " + e);var t = i.getReportSeq();this.dataReport.newReport(t, l.ZegoRTMLogEvent.kZegoTaskKickout.event), this.dataReport.addMsgInfo(t, { user_id: l.ZegoRTMLogEvent.kZegoTaskKickout.user_id(this.stateCenter.idName) });var r = s.ClientUtil.getKickoutError(e.body.reason);this.dataReport.addMsgInfo(t, { error: r.code, message: r.message }), this.dataReport.uploadReport(t), this.resetHall();var o = {};e && e.body && (e.body.reason && (o.custom_kickout_message = e.body.message), e.body.reason && (o.reason = e.body.reason)), this.stateCenter.actionListener("roomStateUpdate", this.room.roomID, "DISCONNECTED", a.errorCodeList.MULTIPLE_LOGIN_KICKOUT.code, o);}, e.prototype.handleHbLogout = function (e) {var t = this,r = this.room.retryHallHandler;r && (r.onactive = function (e, r) {t.disconnectedHandle(r);}, e == a.errorCodeList.HEARTBEAT_TIMEOUT || e.msg.endsWith("1000002001") || e.msg.endsWith("1000000152") ? (r.startMaxTime(), r.active()) : (r.stopMaxTime(), r.invalid(), this.resetHall(), this.disconnectedHandle(e)));}, e.prototype.onDisconnect = function (e) {var t = this;if (this.logger.error(n.ZEGO_RTM_ACTION.ROOM_DISCONNECT + " " + e.msg), "string" == typeof e.code && "Error.Network" === e.code) this.dataReport.addMsgInfo(this.stateCenter.reportSeqList.relogin, { error: l.ZegoRTMLogEvent.kZegoTaskReLoginHall.error.ROOM_DISCONNECT.code, message: l.ZegoRTMLogEvent.kZegoTaskReLoginHall.error.ROOM_DISCONNECT.msg });else if ("number" == typeof e.code) {var r;(r = e.code < 2e9 && e.code > 1e9 || e.code < 1e6 ? s.ClientUtil.decodeServerError(e.code, e.msg) : { code: e.code, message: e.msg }) && this.dataReport.addMsgInfo(this.stateCenter.reportSeqList.relogin, { error: r.code, message: r.message });}this.dataReport.uploadReport(this.stateCenter.reportSeqList.relogin), this.stateCenter.reportSeqList.relogin = 0, s.ClientUtil.unregisterCallback(l.ZegoRTMLogEvent.kZegoTaskReLoginHall.event, this.stateCenter.reportList);var o = this.room.retryHallHandler;o ? (o.onactive = function (e, r) {r ? t.hallStateHandle("DISCONNECTED", r) : t.hallStateHandle("CONNECTED", r);}, o.startMaxTime(), o.active()) : this.logger.error(n.ZEGO_RTM_ACTION.ROOM_DISCONNECT + " try handler no found");}, e.prototype.onConnecting = function (e) {this.hallStateHandle("CONNECTING", e);}, e.prototype.disconnectedHandle = function (e) {e ? this.hallStateHandle("DISCONNECTED", e) : this.hallStateHandle("CONNECTED", e);}, e.prototype.hallStateHandle = function (e, t, r) {this.logger.info(n.ZEGO_RTM_ACTION.ROOM_STATUS_CALLBACK + " " + e + " " + JSON.stringify(t)), this.room.lastHallState = this.room.hallState, this.room.hallState = e, this.room.hallState !== this.room.lastHallState && (this.stateCenter.actionListener("hallStateUpdate", e, t ? t.code : 0, r || ""), this.stateCenter.actionListener("_hallStateUpdate", e, t ? t.code : 0, r || ""), this.stateCenter.actionListener("_roomStateUpdate", this.room.roomID, e, t ? t.code : 0, r));}, e.prototype.loginHall = function (e, t, r, u, _) {if (this.logger.info(n.ZEGO_RTM_ACTION.ROOM_LOGIN_ROOM + " call:"), this.logger.setSessionInfo(this.stateCenter.appid, "", "", t.userID, "", this.stateCenter.sdKVersion), !this.stateCenter.configOK) return this.logger.error(n.ZEGO_RTM_ACTION.ROOM_LOGIN_ROOM + " init sdk wrong"), void _(a.errorCodeList.INIT);if (this.room.hallRunState !== o.ENUM_RUN_STATE.trylogin && this.setRunState(o.ENUM_RUN_STATE.trylogin), this.stateCenter.idName = t.userID, this.stateCenter.nickName = t.userName || t.userID, s.ClientUtil.registerCallback("login", { success: u, error: _ }, this.stateCenter.callbackList), 0 === this.stateCenter.reportSeqList.login) {var d = i.getReportSeq();this.stateCenter.reportSeqList.relogin = d, this.dataReport.newReport(d, l.ZegoRTMLogEvent.kZegoTaskReLoginHall.event), s.ClientUtil.logReportCallback(l.ZegoRTMLogEvent.kZegoTaskReLoginHall.event, this.dataReport, d, this.stateCenter.reportList);}this.resetTryLogin(), this.onConnecting({ code: 0, msg: "" }), this.tryLoginHall(e), this.logger.info(n.ZEGO_RTM_ACTION.ROOM_LOGIN_ROOM + " call success");}, e.prototype.tryLoginHall = function (e) {var t = this;if (this.room.hallRunState === o.ENUM_RUN_STATE.trylogin) {var r = 0 !== this.stateCenter.reportSeqList.login ? l.ZegoRTMLogEvent.kZegoTaskLoginHall.event : l.ZegoRTMLogEvent.kZegoTaskReLoginHall.event;if (this.service.isDisConnect()) try {this.service.closeSocket(), this.logger.debug(n.ZEGO_RTM_ACTION.ROOM_TRY_LOGIN + " new websocket"), s.ClientUtil.actionSuccessCallback(r, this.stateCenter.reportList) && (this.tryLoginCount > 1 && s.ClientUtil.actionSuccessCallback(r, this.stateCenter.reportList)(i.REPORT_ACTION.eventEnd, l.ZegoRTMLogEvent.kZegoTaskLoginHall.subEvent.create_socket.event), s.ClientUtil.actionSuccessCallback(r, this.stateCenter.reportList)(i.REPORT_ACTION.eventStart, l.ZegoRTMLogEvent.kZegoTaskLoginHall.subEvent.create_socket.event), s.ClientUtil.actionSuccessCallback(r, this.stateCenter.reportList)(i.REPORT_ACTION.addEventMsg, l.ZegoRTMLogEvent.kZegoTaskLoginHall.subEvent.create_socket.event, l.ZegoRTMLogEvent.kZegoTaskLoginHall.subEvent.create_socket.server("server"), e)), this.service.createSocket(e), this.service.openHandler(function () {t.openHandler();}), this.service.closeHandler(function (e) {t.logger.error(n.ZEGO_RTM_ACTION.ROOM_TRY_LOGIN + " close " + JSON.stringify(e)), t.service.closeSocket(), t.closeHandler(e);}), this.service.errorHandler(function (e) {t.logger.error(n.ZEGO_RTM_ACTION.ROOM_TRY_LOGIN + " error " + JSON.stringify(e)), t.service.closeSocket(), t.closeHandler(e);});} catch (e) {this.logger.error(n.ZEGO_RTM_ACTION.ROOM_TRY_LOGIN + "  websocket err:" + JSON.stringify(e));} else {this.logger.info(n.ZEGO_RTM_ACTION.ROOM_TRY_LOGIN + " use current websocket and sent login"), s.ClientUtil.actionSuccessCallback(r, this.stateCenter.reportList) && s.ClientUtil.actionSuccessCallback(r, this.stateCenter.reportList)(i.REPORT_ACTION.eventStart, l.ZegoRTMLogEvent.kZegoTaskLoginHall.subEvent.liveroom_login.event);var a = function a(e, r) {t.handleLoginRsp(e, r);};this.service.loginHall(a, a);}this.tryLoginTimer = setTimeout(function () {t.logger.info(n.ZEGO_RTM_ACTION.ROOM_TRY_LOGIN + " over time no response, login timeout"), s.ClientUtil.actionErrorCallback("login", t.stateCenter.callbackList)(l.ZegoRTMLogEvent.kZegoTaskLoginHall.error.LOGIN_TIMEOUT);}, this.tryLoginInterval), this.logger.info(n.ZEGO_RTM_ACTION.ROOM_TRY_LOGIN + " call success");} else this.logger.error("zb.rh.tl state error");}, e.prototype.openHandler = function () {var e = this;this.logger.info(n.ZEGO_RTM_ACTION.ROOM_OPEN_HANDLER + " websocket.onpen call");var t = 0 !== this.stateCenter.reportSeqList.login ? l.ZegoRTMLogEvent.kZegoTaskLoginHall.event : l.ZegoRTMLogEvent.kZegoTaskReLoginHall.event;s.ClientUtil.actionSuccessCallback(t, this.stateCenter.reportList) && s.ClientUtil.actionSuccessCallback(t, this.stateCenter.reportList)(i.REPORT_ACTION.eventEndWithMsgInfo, l.ZegoRTMLogEvent.kZegoTaskLoginHall.subEvent.create_socket.event, { try_cnt: this.tryLoginCount }), this.service.onPush(), s.ClientUtil.actionSuccessCallback(t, this.stateCenter.reportList) && s.ClientUtil.actionSuccessCallback(t, this.stateCenter.reportList)(i.REPORT_ACTION.eventStart, l.ZegoRTMLogEvent.kZegoTaskLoginHall.subEvent.liveroom_login.event);var r = function r(t, _r3) {e.handleLoginRsp(t, _r3);};this.service.loginHall(r, r);}, e.prototype.handleLoginRsp = function (e, t) {var r = 0 !== this.stateCenter.reportSeqList.login ? l.ZegoRTMLogEvent.kZegoTaskLoginHall.event : l.ZegoRTMLogEvent.kZegoTaskReLoginHall.event;if (s.ClientUtil.actionSuccessCallback(r, this.stateCenter.reportList) && s.ClientUtil.actionSuccessCallback(r, this.stateCenter.reportList)(i.REPORT_ACTION.eventEndWithMsgInfo, l.ZegoRTMLogEvent.kZegoTaskLoginHall.subEvent.liveroom_login.event), this.room.hallRunState === o.ENUM_RUN_STATE.trylogin) {if (e.header.seq === t) return 0 !== e.body.code ? (this.logger.error(n.ZEGO_RTM_ACTION.ROOM_HANDLE_LOGINRSP + " server error=", e.body.code), void this.handleLoginFail(e)) : (this.logger.info(n.ZEGO_RTM_ACTION.ROOM_HANDLE_LOGINRSP + " call success."), void this.handleLoginSuccess(e));this.logger.error(n.ZEGO_RTM_ACTION.ROOM_HANDLE_LOGINRSP + " in wrong seq, local=", t + "", ",recv=", e.header.seq);} else this.logger.error(n.ZEGO_RTM_ACTION.ROOM_HANDLE_LOGINRSP + " state error");}, e.prototype.handleLoginFail = function (e) {this.resetTryLogin();var t = { code: e.body.code, msg: e.body.message };s.ClientUtil.actionErrorCallback("login", this.stateCenter.callbackList)(t, !0);}, e.prototype.handleLoginSuccess = function (e) {var t = {},r = this.room.lastHallRunState;this.setRunState(o.ENUM_RUN_STATE.login), this.stateCenter.userid = e.body.user_uid, this.room.sessionID = e.body.session_id, this.room.timeStamp = e.header.timestamp, this.room.roomSessionID = e.body.room_session_id, this.logger.setSessionInfo(this.stateCenter.appid, this.room.roomID, this.room.sessionID, this.stateCenter.idName, this.stateCenter.nickName, this.stateCenter.sdKVersion), e.body.log_sever_addr && "" != e.body.log_sever_addr && this.logger.logRemoteLevel !== o.ENUM_LOG_LEVEL.disable && (this.logger.setLogServer(e.body.log_sever_addr), t.log_url = e.body.log_sever_addr), e.body.cluster_env && 1 === e.body.cluster_env && (this.stateCenter.testEnvironment = !0, t.test_environment = "true", !this.stateCenter.debugCustom && (this.stateCenter.debug = !0));var n = 0 !== this.stateCenter.reportSeqList.login ? l.ZegoRTMLogEvent.kZegoTaskLoginHall.event : l.ZegoRTMLogEvent.kZegoTaskReLoginHall.event;s.ClientUtil.actionSuccessCallback(n, this.stateCenter.reportList) && s.ClientUtil.actionSuccessCallback(n, this.stateCenter.reportList)(i.REPORT_ACTION.addEventMsg, l.ZegoRTMLogEvent.kZegoTaskLoginHall.subEvent.liveroom_login.event, l.ZegoRTMLogEvent.kZegoTaskLoginHall.subEvent.liveroom_login.respond_info("respond_info"), t), this.resetTryLogin(), this.loginSuccessCallBack(r, e), s.ClientUtil.actionSuccessCallback("login", this.stateCenter.callbackList) && s.ClientUtil.actionSuccessCallback("login", this.stateCenter.callbackList)(!0), this.hallStateHandle("CONNECTED", { code: 0, msg: "" });}, e.prototype.closeHandler = function (e) {this.logger.error(n.ZEGO_RTM_ACTION.ROOM_CLOSEHANDLER + " room websocket close " + JSON.stringify(e.code)), this.room.hallRunState !== o.ENUM_RUN_STATE.logout ? this.room.hallRunState === o.ENUM_RUN_STATE.trylogin ? (this.resetTryLogin(), s.ClientUtil.actionErrorCallback("login", this.stateCenter.callbackList)(1006 == e.code ? l.ZegoRTMLogEvent.kZegoTaskLoginHall.error.LOGIN_TIMEOUT : e)) : this.room.hallRunState === o.ENUM_RUN_STATE.login && (this.logger.info(n.ZEGO_RTM_ACTION.ROOM_CLOSEHANDLER + " is called because of network broken"), this.resetTryLogin(), this.onDisconnect(l.ZegoRTMLogEvent.kZegoTaskLoginHall.error.NETWORK_BROKEN)) : this.logger.info(n.ZEGO_RTM_ACTION.ROOM_CLOSEHANDLER + " onclose logout flow call websocket.close");}, e.prototype.logout = function () {this.logger.info(n.ZEGO_RTM_ACTION.ROOM_LOGOUT + " call"), this.room.hallRunState !== o.ENUM_RUN_STATE.logout ? (this.resetHall(), this.hallStateHandle("DISCONNECTED", { code: 0, msg: "" }), this.logger.info(n.ZEGO_RTM_ACTION.ROOM_LOGOUT + " call success")) : this.logger.warn("zb.rh.lo at logout");}, e.prototype.handleLogoutRsp = function (e) {this.logger.info(n.ZEGO_RTM_ACTION.ROOM_LOGOUT + "result=", e.body && e.body.err_code ? e.body.err_code : "");}, e;}();t.HallHandler = u;}, function (e, t, r) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.RoomPrivateHandler = void 0;var o = r(0),s = r(2),i = function () {function e(e, t, r, o, s) {this.logger = e, this.stateCenter = t, this.dataReport = r, this.service = o, this.room = s, this.tryLoginTimer = null, this.tryLoginCount = 0, this.tryLoginInterval = 1e4;}return e.prototype.setRoomRunState = function (e) {this.room.lastRunRoomState = this.room.runRoomState, this.room.runRoomState = e;}, e.prototype.enterRoom = function (e, t) {this.service.enterRoom(e, t);}, e.prototype.leaveRoom = function (e, t) {this.resetRoom(e, t);}, e.prototype.resetRoom = function (e, t) {this.logger.info(s.ZEGO_RTM_ACTION.ROOM_RESET_ROOM + " call");var r = e || function () {},i = t || function () {};this.room.runRoomState !== o.ENUM_RUN_STATE.logout && this.service.leaveRoom(r, i), this.setRoomRunState(o.ENUM_RUN_STATE.logout), this.room.roomSid = "0", this.room.roomSessionID = "0", this.logger.setSessionInfo(this.stateCenter.appid, this.room.roomID, this.room.sessionID, this.stateCenter.idName, this.stateCenter.nickName, this.stateCenter.sdKVersion), this.resetRoomCallBack(), this.logger.info(s.ZEGO_RTM_ACTION.ROOM_RESET_ROOM + " call success");}, e.prototype.resetRoomCallBack = function () {}, e.prototype.loginSuccessCallBack = function (e, t) {}, e.prototype.roomStateHandle = function (e, t, r) {this.logger.info(s.ZEGO_RTM_ACTION.ROOM_STATUS_CALLBACK + " " + e + " " + JSON.stringify(t)), this.room.lastRoomState = this.room.roomState, this.room.roomState = e, this.room.roomState !== this.room.lastRoomState && (this.stateCenter.actionListener("roomStateUpdate", this.room.roomID, e, t ? t.code : 0, r || ""), this.stateCenter.actionListener("_roomStateUpdate", this.room.roomID, e, t ? t.code : 0, r || ""));}, e;}();t.RoomPrivateHandler = i;}, function (e, t, r) {"use strict";var _o7,s = this && this.__extends || (_o7 = function o(e, t) {return (_o7 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (e, t) {e.__proto__ = t;} || function (e, t) {for (var r in t) {Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);}})(e, t);}, function (e, t) {function r() {this.constructor = e;}_o7(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r());});Object.defineProperty(t, "__esModule", { value: !0 }), t.RetryHallHandler = void 0;var i = r(5),n = r(0),a = r(2),l = r(1),u = function (e) {function t(t, r, o) {var s = e.call(this, t, r) || this;return s.logger = t, s.stateCenter = r, s.room = o, s;}return s(t, e), t.prototype.initRoom = function (e, t, r, o) {this.hallHandler = e, this.user = t, this.server = r, this.config = o;}, t.prototype.active = function (e) {var t = this;if (this.logger.info(a.ZEGO_RTM_ACTION.ROOM_LOGIN_ROOM + " retry call"), this.stateCenter.networkState != n.ENUM_NETWORK_STATE.offline) {if (this.retryTimer) this.logger.info(a.ZEGO_RTM_ACTION.ROOM_LOGIN_ROOM + " has actived, ignore");else if (this.isOverTime) this.logger.info(a.ZEGO_RTM_ACTION.ROOM_LOGIN_ROOM + " retry over time, stop retry");else {if (1 == this.retryActiveCount) this.retryActiveInterval = Math.floor(Math.random() * (1 - this.RETRY_START_TIME_INTERVAL) + this.RETRY_START_TIME_INTERVAL);else {var r = Math.pow(2, Math.round(this.retryActiveCount / this.RETRY_CONTINUE_COUNT + 1));this.retryActiveInterval = r > this.RETRY_MAX_TIME_INTERVAL ? this.RETRY_MAX_TIME_INTERVAL : r;}this.retryTimer = setTimeout(function () {t.hallHandler.loginHall(t.server, t.user, t.config, function (e) {t.handleLoginFinish(e);}, function (e, r) {t.handleLoginFinish(!1, e, r);}), t.retryTimer && clearTimeout(t.retryTimer), t.retryTimer = null, t.retryActiveCount++;}, e ? 0 : 1e3 * this.retryActiveInterval);}} else this.logger.info(a.ZEGO_RTM_ACTION.ROOM_LOGIN_ROOM + " network is broken, stop retry");}, t.prototype.startMaxTime = function () {var e = this;this.maxTimer || (this.maxTimer = setTimeout(function () {console.warn("over max time " + e.RETRY_MAX_TIME + "s, stop retry"), e.isOverTime = !0, e.hallHandler.resetHall(), e.stopMaxTime(), e.invalid(), e.onactive(!1, l.errorCodeList.LOGIN_TIMEOUT);}, 1e3 * this.RETRY_MAX_TIME));}, t.prototype.stopMaxTime = function () {this.maxTimer && clearTimeout(this.maxTimer), this.maxTimer = null;}, t.prototype.onactive = function (e, t) {}, t.prototype.handleError = function (e, t) {if (this.RETRY_MAX_TIME < 3) return !1;if (t) {var r = e.code + "";return !["1000002002", "1000005030", "1000005035", "1010", "1011", "1013", "1014", "1015", "1016", "1017", "1018", "1019", "1020", "1021", "1023"].includes(r) && (!!["1100040001", "1100040100"].includes(r) || this.room.lastHallRunState == n.ENUM_RUN_STATE.login && (this.room.sessionID = "", this.invalid(), !0));}return !0;}, t.prototype.handleLoginFinish = function (e, t, r) {t ? this.handleError(t, r) ? (!this.maxTimer && this.startMaxTime(), this.active()) : (this.hallHandler.resetHall(), this.stopMaxTime(), this.invalid(), this.onactive(e, t)) : (this.stopMaxTime(), this.invalid(), this.onactive(e));}, t;}(i.TryHandler);t.RetryHallHandler = u;}, function (e, t, r) {"use strict";var _o8,s = this && this.__extends || (_o8 = function o(e, t) {return (_o8 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (e, t) {e.__proto__ = t;} || function (e, t) {for (var r in t) {Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);}})(e, t);}, function (e, t) {function r() {this.constructor = e;}_o8(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r());});Object.defineProperty(t, "__esModule", { value: !0 }), t.LiveRoomPrivateService = void 0;var i = r(11),n = r(0),a = r(2),l = function (e) {function t(t, r) {var o = e.call(this, t, r) || this;return o.stateCenter = t, o.logger = r, o.service = new i.ZegoSocketService(o.stateCenter.ENV), o.cmdSeq = 0, o.responseRouters = {}, o;}return s(t, e), t.prototype.checkResponse = function (e) {return e.header.app_id !== this.stateCenter.appid || e.header.user_uid !== this.stateCenter.userid || this.stateCenter.priModules.hallRunState !== n.ENUM_RUN_STATE.login;}, t.prototype.handleSendCommandMsgRsp = function (e) {var t = this,r = this.service.sendCommandMap[e.header.seq];if (null != r) {var o = r._data;delete this.service.sendCommandMap[e.header.seq], this.service.sendCommandList.remove(r), 0 === e.body.code ? setTimeout(function () {o && null != o.success && o.success(e, t.cmdSeq);}, 0) : setTimeout(function () {o && null != o.error && o.error(e, t.cmdSeq);}, 0);}}, t.prototype.onPush = function () {var e = this;this.service.onMessage = function (t) {e.logger.info(a.ZEGO_RTM_ACTION.SERVICE_PUSH + " msg=" + JSON.stringify(t) + " "), 0 !== t.body.code && t.body.code && e.logger.error(a.ZEGO_RTM_ACTION.SERVICE_PUSH + " cmd=" + t.header.cmd + ", code=" + t.body.code + ", message=" + t.body.message + " "), ["zegochat_js.user_login_ws_rsp", "zegochat_js.user_logout_rsp"].indexOf(t.header.cmd) > -1 ? e.handleSendCommandMsgRsp(t) : e.stateCenter.priModules.isLogin() ? e.checkResponse(t) ? e.logger.error(a.ZEGO_RTM_ACTION.SERVICE_PUSH + "  check session fail.") : (e.logger.info(a.ZEGO_RTM_ACTION.SERVICE_PUSH + " cmd=" + t.header.cmd + ",function=" + !!e.responseRouters[t.header.cmd]), e.handleSendCommandMsgRsp(t), e.responseRouters[t.header.cmd] && e.responseRouters[t.header.cmd](t, e.cmdSeq)) : e.logger.warn(a.ZEGO_RTM_ACTION.SERVICE_PUSH + "  already logout");};}, t.prototype.handleHallKickout = function (e) {}, t.prototype.handlePushKickout = function (e) {}, t.prototype.handlePushCustomMsg = function (e) {}, t.prototype.handlePushRoomMsg = function (e) {}, t.prototype.handlePushUserStateUpdateMsg = function (e) {}, t.prototype.handlePushMergeMsg = function (e) {}, t.prototype.handlePushTransMsg = function (e) {}, t.prototype.handleBigImMsgRsp = function (e) {}, t.prototype.handlePushSignalMsg = function (e) {}, t.prototype.closeHandler = function (e) {this.service.closeHandler(e);}, t.prototype.openHandler = function (e) {this.service.openHandler(e);}, t.prototype.errorHandler = function (e) {this.service.errorHandler(e);}, t.prototype.getHeader = function (e) {return { cmd: e, seq: ++this.cmdSeq, timestamp: Math.ceil(new Date().getTime() / 1e3) + "", app_id: this.stateCenter.appid, user_uid: this.stateCenter.userid || "0", session_id: this.stateCenter.priModules.sessionID || "0" };}, t.prototype.startCheck = function () {this.service.startCheck();}, t.prototype.stopCheck = function () {this.service.stopCheck();}, t.prototype.isDisConnect = function () {return !this.service || this.service.isDisConnect();}, t.prototype.createSocket = function (e) {var t = this;this.service.createSocket(e), this.responseRouters = { "zegochat_js.push_user_kickout": function zegochat_jsPush_user_kickout(e) {t.handleHallKickout(e);}, "zegochat_js.push_room_kickout": function zegochat_jsPush_room_kickout(e) {t.handlePushKickout(e);}, "zegochat_js.push_room_custommsg_req": function zegochat_jsPush_room_custommsg_req(e) {t.handlePushCustomMsg(e);}, "zegochat_js.push_room_im_chat_req": function zegochat_jsPush_room_im_chat_req(e) {t.handlePushRoomMsg(e);}, "zegochat_js.push_room_userlist_update_req": function zegochat_jsPush_room_userlist_update_req(e) {t.handlePushUserStateUpdateMsg(e);}, push_merge_message: function push_merge_message(e) {t.handlePushMergeMsg(e);}, push_trans: function push_trans(e) {t.handlePushTransMsg(e);}, push_signal: function push_signal(e) {t.handlePushSignalMsg(e);} };}, t.prototype.closeSocket = function () {this.service.closeSocket();}, t.prototype.sendMessage = function (e, t, r, o) {if (this.service.isDisConnect()) return this.logger.info(a.ZEGO_RTM_ACTION.SERVICE_SEND + " socket is disconnect"), 0;var s = this.getHeader(e);return this.logger.info(a.ZEGO_RTM_ACTION.SERVICE_SEND + " sendMsg:" + JSON.stringify({ header: s, body: t })), this.service.sendMessage(s, t, r, o);}, t.prototype.on = function (e, t) {this.responseRouters[e] = t;}, t.prototype.loginHall = function (e, t) {var r = { user_id: this.stateCenter.idName, device_id: this.stateCenter.priModules.deviceID, session_expire: this.stateCenter.priModules.sessionExpire, user_name: this.stateCenter.nickName, device_type: this.stateCenter.priModules.deviceType, net_type: this.stateCenter.priModules.netType, token: this.stateCenter.priModules.hallToken, an_type: this.stateCenter.priModules.anType + "" };this.sendMessage("zegochat_js.user_login_ws_req", r, e, t);}, t.prototype.logoutHall = function (e, t) {var r = { user_id: this.stateCenter.idName || 0 };this.sendMessage("zegochat_js.user_logout_req", r, e, t);}, t.prototype.enterRoom = function (e, t) {var r = { room_header: { room_id: this.stateCenter.priModules.roomID, room_sid: this.stateCenter.priModules.roomSid || "0", room_user_session_id: this.stateCenter.priModules.roomSessionID || "0" }, room_name: "", role: this.stateCenter.role, room_flag: this.stateCenter.priModules.roomFlag };this.sendMessage("zegochat_js.room_enter_req", r, e, t);}, t.prototype.leaveRoom = function (e, t) {var r = { room_header: { room_id: this.stateCenter.priModules.roomID, room_sid: this.stateCenter.priModules.roomSid, room_user_session_id: this.stateCenter.priModules.roomSessionID } };this.sendMessage("zegochat_js.room_quit_req", r, e, t);}, t.prototype.heartBeat = function (e, t) {return this.sendMessage("zegochat_js.user_hb_req", { reserve: 0 }, e, t);}, t.prototype.fetchUserList = function (e, t, r) {return this.sendMessage("zegochat_js.room_userlist_req", e, t, r);}, t.prototype.fetchReliableMessage = function (e, t, r) {return this.sendMessage("trans_fetch", e, t, r);}, t.prototype.sendReliableMessage = function (e, t, r) {return this.sendMessage("trans", e, t, r);}, t.prototype.sendRoomMsg = function (e, t, r) {return this.sendMessage("zegochat_js.room_im_chat", e, t, r);}, t.prototype.sendCustomCommand = function (e, t, r) {return this.sendMessage("zegochat_js.room_custommsg_req", e, t, r);}, t.prototype.sendBigRoomMessage = function (e, t, r) {return this.sendMessage("bigim_chat", e, t, r);}, t.prototype.sendRelayMessage = function (e, t, r) {return this.sendMessage("relay", e, t, r);}, t.prototype.sendSignalCmd = function (e, t, r) {return this.sendMessage("signal", e, t, r);}, t;}(r(10).LiveRoomService);t.LiveRoomPrivateService = l;}]);} }, t = {}, function r(o) {var s = t[o];if (void 0 !== s) return s.exports;var i = t[o] = { exports: {} };return e[o].call(i.exports, i, i.exports, r), i.exports;}(165);var e, t;});

/***/ }),
/* 33 */
/*!*****************************************************************!*\
  !*** /Applications/project/uniapp-sample/mixin/common-mixin.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 28));



var _server = __webpack_require__(/*! ../utils/server */ 34);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}var _getApp$globalData =
getApp().globalData,zegoAppID = _getApp$globalData.zegoAppID,server = _getApp$globalData.server;var _default =

{
  data: function data() {
    return {
      roomID: '001', // 房间ID
      token: '', // 服务端校验token
      pushStreamID: 'xcx-streamID-' + new Date().getTime(), // 推流ID
      livePusherUrl: '', // 推流地址
      livePusher: null, // live-pusher 的 Context，内部只有一个对象
      userID: 'xcx-userID-' + new Date().getTime(), // 用户ID,
      livePlayerList: [],
      connectType: -1, // 房间连接状态：-1为初始状态，1为连接，0断开连接
      canShow: -1,
      handupStop: false,
      role: '',
      roomUserList: [] };

  },
  onHide: function onHide() {
    this.logout();
  },
  onUnload: function onUnload() {
    this.logout();
    uni.offNetworkStatusChange();
  },
  onLoad: function onLoad() {
    // 监听网络状态
    this.onNetworkStatus();
  },
  mounted: function mounted() {var _this = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.next = 2;return (
                (0, _server.getLoginToken)(zegoAppID, _this.userID));case 2:_this.token = _context.sent;case 3:case "end":return _context.stop();}}}, _callee);}))();
  },
  methods: {
    openRoom: function openRoom(e) {var _this2 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2() {var role, result;return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:if (
                _this2.roomID) {_context2.next = 3;break;}
                uni.showModal({
                  title: '提示',
                  content: '请输入房间号',
                  showCancel: false });return _context2.abrupt("return");case 3:



                role = typeof e === 'string' ? e : e.target.dataset && e.target.dataset.role;if (!(
                _this2.connectType !== 1)) {_context2.next = 9;break;}_context2.next = 7;return (

                  _this2._zg.loginRoom(_this2.roomID, _this2.token, {
                    userID: _this2.userID, // userID，需用户自己定义，保证全局唯一，建议设置为业务系统中的用户唯一标识
                    userName: _this2.userID // userName 用户名
                  }, {
                    userUpdate: true // 是否接收用户进出房间的回调，设置为 true 才能接收到房间内其他用户进出房间的回调
                  }));case 7:result = _context2.sent;
                if (result) _this2.connectType = 1;case 9:

                if (role === '1') {
                  _this2.role = role;
                  _this2.startPush();
                }case 10:case "end":return _context2.stop();}}}, _callee2);}))();
    },
    startPush: function startPush(publishOption) {var _this3 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3() {var _yield$_this3$_zg$sta, url;return _regenerator.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:_context3.prev = 0;_context3.next = 3;return (


                  _this3._zg.startPublishingStream(_this3.pushStreamID, publishOption));case 3:_yield$_this3$_zg$sta = _context3.sent;url = _yield$_this3$_zg$sta.url;
                console.info('startPush', url);
                _this3.livePusherUrl = url;
                _this3.livePusher = uni.createLivePusherContext();
                _this3.livePusher.start();_context3.next = 14;break;case 11:_context3.prev = 11;_context3.t0 = _context3["catch"](0);

                console.error("error", _context3.t0);case 14:case "end":return _context3.stop();}}}, _callee3, null, [[0, 11]]);}))();

    },
    stopPush: function stopPush() {
      if (this.livePusherUrl) {
        this.livePusher.stop();
        this.livePusherUrl = '';
        this._zg.stopPublishingStream(this.pushStreamID);
      }
    },
    stopPull: function stopPull() {var _this4 = this;
      if (this.livePlayerList.length) {
        this.livePlayerList.forEach(function (item) {
          _this4._zg.stopPlayingStream(item.streamID);
        });
        this.livePlayerList = [];
      }
      if (this.mixPlayerUrls && this.mixPlayerUrls.length) {
        this.mixPlayerUrls.forEach(function (item) {
          _this4._zg.stopPlayingStream(item.streamID);
        });
        this.mixPlayerUrls = [];
      }
    },
    logout: function logout() {var _this5 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee4() {return _regenerator.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:_context4.prev = 0;

                _this5.stopPush(_this5._zg);
                _this5.stopPull(_this5._zg);
                /** 登出房间 */if (!(
                _this5._zg && _this5.connectType === 1)) {_context4.next = 6;break;}_context4.next = 6;return _this5._zg.logoutRoom(_this5.roomID);case 6:
                _this5.connectType = 0;_context4.next = 12;break;case 9:_context4.prev = 9;_context4.t0 = _context4["catch"](0);

                console.error('error: ', _context4.t0);case 12:case "end":return _context4.stop();}}}, _callee4, null, [[0, 9]]);}))();


    },
    reLogin: function reLogin() {var _this6 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee5() {return _regenerator.default.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:_context5.prev = 0;_context5.next = 3;return (

                  _this6._zg.logoutRoom(_this6.roomID));case 3:
                _this6.connectType = 0;
                _this6.openRoom(_this6.role);_context5.next = 10;break;case 7:_context5.prev = 7;_context5.t0 = _context5["catch"](0);

                console.error('error: ', _context5.t0);case 10:case "end":return _context5.stop();}}}, _callee5, null, [[0, 7]]);}))();

    },
    onNetworkStatus: function onNetworkStatus() {var _this7 = this;
      wx.offNetworkStatusChange();
      uni.onNetworkStatusChange(function (res) {
        if (res.isConnected && _this7.connectType === 1 && _this7._zg) {
          console.warn('data', _this7);
          console.warn('roomID', _this7.roomID);
          _this7.reLogin();

        }
      });
    },
    // live-pusher 绑定推流事件，透传推流事件给 SDK
    onPushStateChange: function onPushStateChange(e) {
      console.error('onPushStateChange', e.detail.code, e.detail.message);
      if (e.detail.code === 5000) {
        this.handupStop = true;
        // this.livePusher && (this.livePusher! as wx.LivePusherContext).stop();
      }
      this._zg.updatePlayerState(this.pushStreamID, e);
    },
    // live-pusher 绑定网络状态事件，透传网络状态事件给 SDK
    onPushNetStateChange: function onPushNetStateChange(e) {
      this._zg.updatePlayerNetStatus(this.pushStreamID, e);
    },
    // live-player 绑定网络状态事件，透传网络状态事件给 SDK
    onPlayNetStateChange: function onPlayNetStateChange(e) {
      this._zg.updatePlayerNetStatus(e.currentTarget.id, e);
    },
    //live-player 绑定拉流事件，透传拉流事件给 SDK
    onPlayStateChange: function onPlayStateChange(e) {
      this._zg.updatePlayerState(e.currentTarget.id, e);
    },
    onPushError: function onPushError(e) {
      console.log('onPushError', e);
    },
    onPlayError: function onPlayError(e) {
      console.log('onPlayError', e);
    },
    onPushAudiovolumenotify: function onPushAudiovolumenotify(e) {
      console.log('onPushAudiovolumenotify', e.detail.volume);
    },
    onPlayAudiovolumenotify: function onPlayAudiovolumenotify(e) {
      console.log('onPlayAudiovolumenotify', e.detail.volume);
    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 34 */
/*!***********************************************************!*\
  !*** /Applications/project/uniapp-sample/utils/server.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.getLoginToken = getLoginToken;function getLoginToken(appID, userID) {var _getApp$globalData =
  getApp().globalData,tokenURL = _getApp$globalData.tokenURL,cgi_token = _getApp$globalData.cgi_token,tokenTestURL = _getApp$globalData.tokenTestURL;
  console.log('>>> get token');
  return new Promise(function (resolve) {
    if (cgi_token) {
      try {
        uni.request({
          url: tokenTestURL,
          data: {
            app_id: appID,
            id_name: userID,
            cgi_token: cgi_token },

          header: {
            'content-type': 'text/plain' },

          success: function success(res) {
            if (res.statusCode === 200) resolve(res.data);
          } });

      } catch (error) {
        console.error('>>> get test token fail: ', error);
        return;
      }
    }
    try {
      var res;
      uni.request({
        url: tokenURL, //该接口由开发者后台自行实现，开发者的 Token 从各自后台获取
        // 请求参数中的appID与userID分别为初始化SDK所填的appID与userID
        data: {
          app_id: appID,
          id_name: userID },

        header: {
          'content-type': 'text/plain' },

        success: function success(res) {
          if (res.statusCode === 200) resolve(res.data);
        } });

    } catch (error) {
      console.error('>>> get token fail: ', error);
      return;
    }
  });

}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */
/*!****************************************************************!*\
  !*** /Applications/project/uniapp-sample/utils/common_zego.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports._checkParam = exports.authCheck = exports.stopPlayAll = exports.setPlayUrl = exports.startPush = exports.playAll = exports.initSDK = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 28));var _zegoExpressEngineMiniprogram = __webpack_require__(/*! zego-express-engine-miniprogram */ 32);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}

var app = getApp();

var zg;

var initSDK = function initSDK(context, pushAtr, playAtr) {
  if (!_checkParam(app.globalData.zegoAppID, app.globalData.server)) return false;
  /** 初始化SDK，userID 为用户自定义ID，全局唯一 */
  zg = new _zegoExpressEngineMiniprogram.ZegoExpressEngine(app.globalData.zegoAppID, app.globalData.server);

  console.log("version", zg.getVersion());
  zg.setDebugVerbose(false);
  authCheck(context);

  zg.initContext({
    wxContext: context,
    pushAtr: pushAtr,
    playAtr: playAtr });


  // console.log(this);
  zg.on("roomStreamUpdate", /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(roomID, updateType, streamList) {var i, zegoPlayerAttr, zegoPlayer;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
              console.error("roomStreamUpdate", roomID, updateType, streamList);if (!(
              updateType === "ADD")) {_context.next = 23;break;}
              i = 0;case 3:if (!(i < streamList.length)) {_context.next = 21;break;}_context.prev = 4;

              // 设置 zego-player 组件属性
              zegoPlayerAttr = {
                componentID: "zego-".concat(streamList[i].streamID),
                playerId: streamList[i].streamID };

              // 添加到组件列表中
              context.zegoPlayerList.push(zegoPlayerAttr);
              // 更新，并渲染组件列表
              context.zegoPlayerList = context.zegoPlayerList;
              // 在zegoPlayerList更新后， 将zg实例传入对应的流id的组件内
              zegoPlayer = context.selectComponent("#".concat(zegoPlayerAttr.componentID));if (
              zegoPlayer) {_context.next = 11;break;}return _context.abrupt("return", uni.showToast({ icon: "none", title: "未能获取到组件节点" }));case 11:_context.next = 13;return (

                zegoPlayer.startPlay(zg, streamList[i].streamID));case 13:_context.next = 18;break;case 15:_context.prev = 15;_context.t0 = _context["catch"](4);

              console.error("playStream error", _context.t0);case 18:i++;_context.next = 3;break;case 21:_context.next = 25;break;case 23:



              streamList.forEach(function (streamItem) {
                zg.getPlayerInstance(streamItem.streamID).stop();
                // 流停止，并且移除对应的组件
                context.zegoPlayerList = context.zegoPlayerList.filter(
                function (comItem) {return streamItem.streamID !== comItem.playerId;});

              });
              context.zegoPlayerList = context.zegoPlayerList;case 25:case "end":return _context.stop();}}}, _callee, null, [[4, 15]]);}));return function (_x, _x2, _x3) {return _ref.apply(this, arguments);};}());


  // the event is triggered when one join or leave the room
  zg.on("roomUserUpdate", function (roomID, updateType, userList) {
    console.log("roomID: ", roomID, " updateType: ", updateType === "ADD" ? "join" : "leave", " userList: ", userList);
    var roomUserList = context.roomUserList;
    if (updateType === "DELETE") {
      userList.forEach(function (user) {
        var i = roomUserList.findIndex(function (item) {return item.userID === user.userID;});
        roomUserList.splice(i, 1);
      });
    } else if (updateType === "ADD") {
      userList.forEach(function (user) {
        if (user.userID !== context.userID) {
          roomUserList.push(user);
        }
      });
    }
    context.roomUserList = roomUserList;
  });
  zg.on("roomStateUpdate", function (roomID, state, errorCode, extendedData) {
    console.warn("roomStateUpdate", roomID, state, errorCode, extendedData);
    if (state === "DISCONNECTED") {
      context.connectType = 0;
    }
  });
  zg.on("publisherStateUpdate", function (result) {
    console.error("publishStateUpdate", result);
  });
  zg.on("playerStateUpdate", function (result) {
    console.log("playStateUpdate", result);
  });
  zg.on("publishQualityUpdate", function (streamID, publishStats) {
    console.log("publishQualityUpdate", streamID, publishStats);
  });
  zg.on("playQualityUpdate", function (streamID, playStats) {
    console.log("playQualityUpdate", streamID, playStats);
  });
  zg.on("roomOnlineUserCountUpdate", function (roomID, userCount) {
    console.error("roomOnlineUserCountUpdate", roomID, userCount);
  });
  zg.on("recvReliableMessage", function (roomID, userCount, trans_type) {
    console.error("recvReliableMessage", roomID, userCount, trans_type);
  });
  zg.on("tokenWillExpire", function (roomID) {
    console.error("tokenWillExpire", roomID);
  });

  return zg;
};exports.initSDK = initSDK;

var playAll = /*#__PURE__*/function () {var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2(streamList, context) {var i, _yield$zg$startPlayin, streamID, url;return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:
            console.log("streamList", streamList);if (!(
            streamList.length === 0)) {_context2.next = 4;break;}
            console.log("startPlayingStream, streamList is null");return _context2.abrupt("return");case 4:




            i = 0;case 5:if (!(i < streamList.length)) {_context2.next = 22;break;}_context2.prev = 6;_context2.next = 9;return (


              zg.startPlayingStream(streamList[i].streamID, {
                sourceType: "BGP" }));case 9:_yield$zg$startPlayin = _context2.sent;streamID = _yield$zg$startPlayin.streamID;url = _yield$zg$startPlayin.url;

            console.log("streamID", streamID, url);
            setPlayUrl(streamID, url, context);_context2.next = 19;break;case 16:_context2.prev = 16;_context2.t0 = _context2["catch"](6);

            console.error("error", _context2.t0);case 19:i++;_context2.next = 5;break;case 22:case "end":return _context2.stop();}}}, _callee2, null, [[6, 16]]);}));return function playAll(_x4, _x5) {return _ref2.apply(this, arguments);};}();exports.playAll = playAll;




var startPush = /*#__PURE__*/function () {var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3(pushStreamID, publishOption, config) {return _regenerator.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:_context3.prev = 0;

            /** 开始推流，返回推流地址 */
            zg.createPusher();
            zg.zegoWechatMini.setPusherAttributes(config);_context3.next = 5;return (
              zg.getPusherInstance().start(pushStreamID, publishOption));case 5:_context3.next = 10;break;case 7:_context3.prev = 7;_context3.t0 = _context3["catch"](0);

            console.error("error", _context3.t0);case 10:case "end":return _context3.stop();}}}, _callee3, null, [[0, 7]]);}));return function startPush(_x6, _x7, _x8) {return _ref3.apply(this, arguments);};}();exports.startPush = startPush;



var setPlayUrl = function setPlayUrl(streamID, url, context) {
  if (!url) {
    console.log(">>>[liveroom-room] setPlayUrl, url is null");
    return;
  }
  console.log("setPlayUrl", streamID, url);
  for (var i = 0; i < context.livePlayerList.length; i++) {
    if (context.livePlayerList[i]["streamID"] === streamID && context.livePlayerList[i]["url"] === url) {
      console.log(">>>[liveroom-room] setPlayUrl, streamID and url are repeated");
      return;
    }
  }

  var streamInfo = {
    streamID: "",
    url: "" };

  var isStreamRepeated = false;

  // 相同 streamID 的源已存在，更新 Url
  for (var _i = 0; _i < context.livePlayerList.length; _i++) {
    if (context.livePlayerList[_i]["streamID"] === streamID) {
      isStreamRepeated = true;
      context.livePlayerList[_i]["url"] = url;
      break;
    }
  }

  // 相同 streamID 的源不存在，创建新 player
  if (!isStreamRepeated) {
    streamInfo["streamID"] = streamID;
    streamInfo["url"] = url;
    streamInfo["playerContext"] = uni.createLivePlayerContext(streamID);
    context.livePlayerList.push(streamInfo);
  }
  app.globalData.livePlayerList = context.livePlayerList;
  context.livePlayerList = context.livePlayerList;
  context.addStreamRefer && context.addStreamRefer();
};exports.setPlayUrl = setPlayUrl;

var stopPlayAll = function stopPlayAll(streamList, context) {
  if (streamList.length === 0) {
    console.log("stopPlayAll, streamList is empty");
    return;
  }
  var playStreamList = context.livePlayerList;
  for (var i = 0; i < streamList.length; i++) {
    var streamID = streamList[i].streamID;
    zg.stopPlayingStream(streamID);
    // 把远程被删除的流从播放的流列表中删除
    for (var j = 0; j < playStreamList.length; j++) {
      if (playStreamList[j]["streamID"] === streamID) {
        playStreamList.splice(j, 1);
        break;
      }
    }
  }
  context.livePlayerList = playStreamList;
};exports.stopPlayAll = stopPlayAll;

var authCheck = /*#__PURE__*/function () {var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee4(context) {var result, hasCamera, hasRecord;return _regenerator.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:if (
            zg) {_context4.next = 2;break;}return _context4.abrupt("return");case 2:_context4.prev = 2;_context4.next = 5;return (


              zg.checkSystemRequirements());case 5:result = _context4.sent;_context4.next = 10;break;case 8:_context4.prev = 8;_context4.t0 = _context4["catch"](2);case 10:



            console.log("checkSystemRequirements", result);
            if (result && result.code === 10001) {
              console.log("result ", result.code);
              uni.showModal({
                title: "提示",
                content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后再试。",
                showCancel: false });

              context.canShow = 0;
            } else if (!result || result.code === 10002) {
              console.log("result ", result && result.code);
              hasCamera = false;
              hasRecord = false;
              uni.authorize({
                scope: "scope.camera",
                success: function success() {
                  hasCamera = true;
                  context.scanShow = hasRecord ? 1 : 0;
                },
                fail: function fail(err) {
                  console.log('授权摄像头失败：', err);
                  hasCamera = false;
                  context.canShow = 0;
                } });


              uni.authorize({
                scope: "scope.record",
                success: function success() {
                  hasRecord = true;
                  context.canShow = hasCamera ? 1 : 0;
                },
                fail: function fail(err) {
                  console.log('获取麦克风失败：', err);
                  hasRecord = false;
                  context.canShow = 0;
                } });

            } else {
              context.canShow = 1;
            }case 12:case "end":return _context4.stop();}}}, _callee4, null, [[2, 8]]);}));return function authCheck(_x9) {return _ref4.apply(this, arguments);};}();exports.authCheck = authCheck;


var _checkParam = function _checkParam(zegoAppID, server) {
  if (!zegoAppID) {
    uni.showToast({
      title: "\u8BF7\u5728app.js\u4E2D\u63D0\u4F9B\u6B63\u786E\u7684zegoAppID",
      icon: "none",
      duration: 5000 });

    console.error("未设置正确的zegoAppID");
    return false;
  }
  if (!server) {
    uni.showToast({
      title: "\u8BF7\u5728app.js\u4E2D\u63D0\u4F9B\u6B63\u786E\u7684server",
      icon: "none",
      duration: 5000 });

    console.error("未设置正确的server");
    return false;
  }
  return true;
};exports._checkParam = _checkParam;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */
/*!********************************************************!*\
  !*** /Applications/project/uniapp-sample/utils/md5.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;!function (n) {"use strict";function d(n, t) {var r = (65535 & n) + (65535 & t);return (n >> 16) + (t >> 16) + (r >> 16) << 16 | 65535 & r;}function f(n, t, r, e, o, u) {return d(function (n, t) {return n << t | n >>> 32 - t;}(d(d(t, n), d(e, u)), o), r);}function l(n, t, r, e, o, u, c) {return f(t & r | ~t & e, n, t, o, u, c);}function g(n, t, r, e, o, u, c) {return f(t & e | r & ~e, n, t, o, u, c);}function v(n, t, r, e, o, u, c) {return f(t ^ r ^ e, n, t, o, u, c);}function m(n, t, r, e, o, u, c) {return f(r ^ (t | ~e), n, t, o, u, c);}function i(n, t) {var r, e, o, u, c;n[t >> 5] |= 128 << t % 32, n[14 + (t + 64 >>> 9 << 4)] = t;var f = 1732584193,i = -271733879,a = -1732584194,h = 271733878;for (r = 0; r < n.length; r += 16) {i = m(i = m(i = m(i = m(i = v(i = v(i = v(i = v(i = g(i = g(i = g(i = g(i = l(i = l(i = l(i = l(o = i, a = l(u = a, h = l(c = h, f = l(e = f, i, a, h, n[r], 7, -680876936), i, a, n[r + 1], 12, -389564586), f, i, n[r + 2], 17, 606105819), h, f, n[r + 3], 22, -1044525330), a = l(a, h = l(h, f = l(f, i, a, h, n[r + 4], 7, -176418897), i, a, n[r + 5], 12, 1200080426), f, i, n[r + 6], 17, -1473231341), h, f, n[r + 7], 22, -45705983), a = l(a, h = l(h, f = l(f, i, a, h, n[r + 8], 7, 1770035416), i, a, n[r + 9], 12, -1958414417), f, i, n[r + 10], 17, -42063), h, f, n[r + 11], 22, -1990404162), a = l(a, h = l(h, f = l(f, i, a, h, n[r + 12], 7, 1804603682), i, a, n[r + 13], 12, -40341101), f, i, n[r + 14], 17, -1502002290), h, f, n[r + 15], 22, 1236535329), a = g(a, h = g(h, f = g(f, i, a, h, n[r + 1], 5, -165796510), i, a, n[r + 6], 9, -1069501632), f, i, n[r + 11], 14, 643717713), h, f, n[r], 20, -373897302), a = g(a, h = g(h, f = g(f, i, a, h, n[r + 5], 5, -701558691), i, a, n[r + 10], 9, 38016083), f, i, n[r + 15], 14, -660478335), h, f, n[r + 4], 20, -405537848), a = g(a, h = g(h, f = g(f, i, a, h, n[r + 9], 5, 568446438), i, a, n[r + 14], 9, -1019803690), f, i, n[r + 3], 14, -187363961), h, f, n[r + 8], 20, 1163531501), a = g(a, h = g(h, f = g(f, i, a, h, n[r + 13], 5, -1444681467), i, a, n[r + 2], 9, -51403784), f, i, n[r + 7], 14, 1735328473), h, f, n[r + 12], 20, -1926607734), a = v(a, h = v(h, f = v(f, i, a, h, n[r + 5], 4, -378558), i, a, n[r + 8], 11, -2022574463), f, i, n[r + 11], 16, 1839030562), h, f, n[r + 14], 23, -35309556), a = v(a, h = v(h, f = v(f, i, a, h, n[r + 1], 4, -1530992060), i, a, n[r + 4], 11, 1272893353), f, i, n[r + 7], 16, -155497632), h, f, n[r + 10], 23, -1094730640), a = v(a, h = v(h, f = v(f, i, a, h, n[r + 13], 4, 681279174), i, a, n[r], 11, -358537222), f, i, n[r + 3], 16, -722521979), h, f, n[r + 6], 23, 76029189), a = v(a, h = v(h, f = v(f, i, a, h, n[r + 9], 4, -640364487), i, a, n[r + 12], 11, -421815835), f, i, n[r + 15], 16, 530742520), h, f, n[r + 2], 23, -995338651), a = m(a, h = m(h, f = m(f, i, a, h, n[r], 6, -198630844), i, a, n[r + 7], 10, 1126891415), f, i, n[r + 14], 15, -1416354905), h, f, n[r + 5], 21, -57434055), a = m(a, h = m(h, f = m(f, i, a, h, n[r + 12], 6, 1700485571), i, a, n[r + 3], 10, -1894986606), f, i, n[r + 10], 15, -1051523), h, f, n[r + 1], 21, -2054922799), a = m(a, h = m(h, f = m(f, i, a, h, n[r + 8], 6, 1873313359), i, a, n[r + 15], 10, -30611744), f, i, n[r + 6], 15, -1560198380), h, f, n[r + 13], 21, 1309151649), a = m(a, h = m(h, f = m(f, i, a, h, n[r + 4], 6, -145523070), i, a, n[r + 11], 10, -1120210379), f, i, n[r + 2], 15, 718787259), h, f, n[r + 9], 21, -343485551), f = d(f, e), i = d(i, o), a = d(a, u), h = d(h, c);}return [f, i, a, h];}function a(n) {var t,r = "",e = 32 * n.length;for (t = 0; t < e; t += 8) {r += String.fromCharCode(n[t >> 5] >>> t % 32 & 255);}return r;}function h(n) {var t,r = [];for (r[(n.length >> 2) - 1] = void 0, t = 0; t < r.length; t += 1) {r[t] = 0;}var e = 8 * n.length;for (t = 0; t < e; t += 8) {r[t >> 5] |= (255 & n.charCodeAt(t / 8)) << t % 32;}return r;}function e(n) {var t,r,e = "0123456789abcdef",o = "";for (r = 0; r < n.length; r += 1) {t = n.charCodeAt(r), o += e.charAt(t >>> 4 & 15) + e.charAt(15 & t);}return o;}function r(n) {return unescape(encodeURIComponent(n));}function o(n) {return function (n) {return a(i(h(n), 8 * n.length));}(r(n));}function u(n, t) {return function (n, t) {var r,e,o = h(n),u = [],c = [];for (u[15] = c[15] = void 0, 16 < o.length && (o = i(o, 8 * n.length)), r = 0; r < 16; r += 1) {u[r] = 909522486 ^ o[r], c[r] = 1549556828 ^ o[r];}return e = i(u.concat(h(t)), 512 + 8 * t.length), a(i(c.concat(e), 640));}(r(n), r(t));}function t(n, t, r) {return t ? r ? u(t, n) : function (n, t) {return e(u(n, t));}(t, n) : r ? o(n) : function (n) {return e(o(n));}(n);} true ? !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {return t;}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined;}(this);

/***/ })
]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map