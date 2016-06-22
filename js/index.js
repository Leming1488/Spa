var SpaShell =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _spa = __webpack_require__(1);
	
	var _spa2 = _interopRequireDefault(_spa);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var spa = function () {
	  var initModule = function initModule(container) {
	    _spa2.default.initModule(container);
	  };
	  return { initModule: initModule };
	}();
	
	document.addEventListener('DOMContentLoaded', function () {
	  var container = document.querySelector('.main-spa');
	  spa.initModule(container);
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var spaShell = function () {
	  var CONFIG_MAP = {
	    main_html: '<div class="spa-shell-head">\n      <div class="spa-shell-head-logo"></div>\n      <div class="spa-shell-head-acct"></div>\n      <div class="spa-shell-head-search"></div>\n    </div>\n    <div class="spa-shell-main">\n      <div class="spa-shell-main-nav"></div>\n      <div class="spa-shell-main-content"></div>\n    </div>\n    <div class="spa-shell-foot"></div>\n    <div class="spa-shell-chat"></div>\n    <div class="spa-shell-modal"></div>',
	    chat_extend_time: 250,
	    chat_retract_time: 300,
	    chat_extend_height: 450,
	    chat_retract_height: 15,
	    chat_extend_title: 'Щелкните, чтобы свернуть',
	    chat_retract_title: 'Щелкните, чтобы раскрыть',
	    anchor_schema_map: {
	      chat: {
	        open: true,
	        closed: true
	      }
	    }
	  };
	
	  var state_map = {
	    container: null,
	    is_chat_retracted: true,
	    anchor_map: {}
	  };
	
	  var element_map = {};
	
	  var refresh_element_map = function refresh_element_map() {
	    var container = state_map.container;
	
	    element_map = {
	      container: container,
	      chat: container.querySelector('.spa-shell-chat')
	    };
	  };
	
	  var do_animate = function do_animate(options) {
	    var start = performance.now();
	    requestAnimationFrame(function do_animate(time) {
	      var timeFraction = (time - start) / options.duration;
	      if (timeFraction > 1) timeFraction = 1;
	      var progress = options.timing(timeFraction);
	      options.draw(progress);
	      if (timeFraction < 1) {
	        requestAnimationFrame(do_animate);
	      }
	    });
	  };
	
	  var toggleChat = function toggleChat(do_extend, callback) {
	
	    var px_chat_ht = element_map.chat.clientHeight;
	    var is_open = px_chat_ht === CONFIG_MAP.chat_extend_height;
	    var is_closed = px_chat_ht === CONFIG_MAP.chat_retract_height;
	    var is_sliding = !is_open && !is_closed;
	
	    if (is_sliding) return false;
	
	    if (do_extend) {
	
	      do_animate({
	        duration: CONFIG_MAP.chat_extend_time,
	        timing: function timing(timeFraction) {
	          return timeFraction;
	        },
	        draw: function draw(progress) {
	          element_map.chat.style.height = progress * CONFIG_MAP.chat_extend_height + 'px';
	        }
	      });
	      element_map.chat.title = '' + CONFIG_MAP.chat_extend_title;
	      state_map.is_chat_retracted = false;
	      return true;
	    };
	
	    do_animate({
	      duration: CONFIG_MAP.chat_retract_time,
	      timing: function timing(timeFraction) {
	        return timeFraction;
	      },
	      draw: function draw(progress) {
	        element_map.chat.style.height = progress * CONFIG_MAP.chat_retract_height + 'px';
	      }
	    });
	    element_map.chat.title = '' + CONFIG_MAP.chat_retract_title;
	    state_map.is_chat_retracted = true;
	    return true;
	  };
	
	  var _onClickChat = function _onClickChat(event) {
	    if (toggleChat(state_map.is_chat_retracted)) {
	      history.replaceState('chat: ' + (state_map.is_chat_retracted ? 'closed' : 'open'), document.title, window.location.pathname);
	    };
	  };
	
	  var initModule = function initModule(container) {
	    state_map.container = container;
	    state_map.container.insertAdjacentHTML('beforeEnd', CONFIG_MAP.main_html);
	    refresh_element_map();
	    state_map.is_chat_retracted = true;
	    element_map.chat.title = '' + CONFIG_MAP.chat_retract_title;
	    element_map.chat.addEventListener('click', _onClickChat);
	    window.addEventListener('popstate', function (event) {
	      state_map.anchor_map = event.state;
	    });
	  };
	
	  return { initModule: initModule };
	}();
	
	exports.default = spaShell;

/***/ }
/******/ ]);
//# sourceMappingURL=index.js.map