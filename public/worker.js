/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/worker.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/worker.js":
/*!**********************!*\
  !*** ./js/worker.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var cacheName = "app-cache-v1.5.2";
var filesToCache = ["./", "./main.js", "./media/Kyoukasho.subset.kana.woff2", "./media/hiragana.min.svg", "./media/katakana.min.svg"];

self.addEventListener("install", function (event) {
  event.waitUntil(caches.open(cacheName).then(function (cache) {
    return cache.addAll(filesToCache);
  }).then(function () {
    return self.skipWaiting();
  }).catch(function (error) {
    console.log("Installation failed: ", error);
  }));
});

self.addEventListener("activate", function (event) {
  event.waitUntil(caches.keys().then(function (keyList) {
    return Promise.all(keyList.map(function (key) {
      if (key !== cacheName) {
        return caches.delete(key);
      }
    }));
  }).catch(console.log));
  return self.clients.claim();
});

self.addEventListener("fetch", function (event) {
  event.respondWith(caches.match(event.request).then(function (response) {
    return response || fetch(event.request).then(function (response) {
      return caches.open(cacheName).then(function (cache) {
        cache.put(event.request, response.clone());
        return response;
      });
    });
  }));
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vanMvd29ya2VyLmpzIl0sIm5hbWVzIjpbImNhY2hlTmFtZSIsImZpbGVzVG9DYWNoZSIsInNlbGYiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJ3YWl0VW50aWwiLCJjYWNoZXMiLCJvcGVuIiwidGhlbiIsImNhY2hlIiwiYWRkQWxsIiwic2tpcFdhaXRpbmciLCJjYXRjaCIsImNvbnNvbGUiLCJsb2ciLCJlcnJvciIsImtleXMiLCJQcm9taXNlIiwiYWxsIiwia2V5TGlzdCIsIm1hcCIsImtleSIsImRlbGV0ZSIsImNsaWVudHMiLCJjbGFpbSIsInJlc3BvbmRXaXRoIiwibWF0Y2giLCJyZXF1ZXN0IiwicmVzcG9uc2UiLCJmZXRjaCIsInB1dCIsImNsb25lIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDbkVBLElBQU1BLFlBQVksa0JBQWxCO0FBQ0EsSUFBTUMsZUFBZSxDQUNuQixJQURtQixFQUVuQixXQUZtQixFQUduQixxQ0FIbUIsRUFJbkIsMEJBSm1CLEVBS25CLDBCQUxtQixDQUFyQjs7QUFRQUMsS0FBS0MsZ0JBQUwsQ0FBc0IsU0FBdEIsRUFBaUMsaUJBQVM7QUFDeENDLFFBQU1DLFNBQU4sQ0FDRUMsT0FBT0MsSUFBUCxDQUFZUCxTQUFaLEVBQ0NRLElBREQsQ0FDTTtBQUFBLFdBQVNDLE1BQU1DLE1BQU4sQ0FBYVQsWUFBYixDQUFUO0FBQUEsR0FETixFQUVDTyxJQUZELENBRU07QUFBQSxXQUFNTixLQUFLUyxXQUFMLEVBQU47QUFBQSxHQUZOLEVBR0NDLEtBSEQsQ0FHTyxpQkFBUztBQUNkQyxZQUFRQyxHQUFSLENBQVksdUJBQVosRUFBcUNDLEtBQXJDO0FBQ0QsR0FMRCxDQURGO0FBUUQsQ0FURDs7QUFXQWIsS0FBS0MsZ0JBQUwsQ0FBc0IsVUFBdEIsRUFBa0MsaUJBQVM7QUFDekNDLFFBQU1DLFNBQU4sQ0FDRUMsT0FBT1UsSUFBUCxHQUNDUixJQURELENBQ007QUFBQSxXQUNKUyxRQUFRQyxHQUFSLENBQVlDLFFBQVFDLEdBQVIsQ0FBWSxlQUFPO0FBQzdCLFVBQUdDLFFBQVFyQixTQUFYLEVBQXNCO0FBQ3BCLGVBQU9NLE9BQU9nQixNQUFQLENBQWNELEdBQWQsQ0FBUDtBQUNEO0FBQ0YsS0FKVyxDQUFaLENBREk7QUFBQSxHQUROLEVBT0VULEtBUEYsQ0FPUUMsUUFBUUMsR0FQaEIsQ0FERjtBQVVBLFNBQU9aLEtBQUtxQixPQUFMLENBQWFDLEtBQWIsRUFBUDtBQUNELENBWkQ7O0FBY0F0QixLQUFLQyxnQkFBTCxDQUFzQixPQUF0QixFQUErQixpQkFBUztBQUN0Q0MsUUFBTXFCLFdBQU4sQ0FDRW5CLE9BQU9vQixLQUFQLENBQWF0QixNQUFNdUIsT0FBbkIsRUFDQ25CLElBREQsQ0FDTTtBQUFBLFdBQVlvQixZQUFZQyxNQUFNekIsTUFBTXVCLE9BQVosRUFBcUJuQixJQUFyQixDQUEwQjtBQUFBLGFBQ3RERixPQUFPQyxJQUFQLENBQVlQLFNBQVosRUFBdUJRLElBQXZCLENBQTRCLGlCQUFTO0FBQ25DQyxjQUFNcUIsR0FBTixDQUFVMUIsTUFBTXVCLE9BQWhCLEVBQXlCQyxTQUFTRyxLQUFULEVBQXpCO0FBQ0EsZUFBT0gsUUFBUDtBQUNELE9BSEQsQ0FEc0Q7QUFBQSxLQUExQixDQUF4QjtBQUFBLEdBRE4sQ0FERjtBQVNELENBVkQsRSIsImZpbGUiOiJ3b3JrZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9qcy93b3JrZXIuanNcIik7XG4iLCJjb25zdCBjYWNoZU5hbWUgPSBcImFwcC1jYWNoZS12MS41LjJcIjtcbmNvbnN0IGZpbGVzVG9DYWNoZSA9IFtcbiAgXCIuL1wiLCBcbiAgXCIuL21haW4uanNcIixcbiAgXCIuL21lZGlhL0t5b3VrYXNoby5zdWJzZXQua2FuYS53b2ZmMlwiLFxuICBcIi4vbWVkaWEvaGlyYWdhbmEubWluLnN2Z1wiLFxuICBcIi4vbWVkaWEva2F0YWthbmEubWluLnN2Z1wiLFxuXTtcblxuc2VsZi5hZGRFdmVudExpc3RlbmVyKFwiaW5zdGFsbFwiLCBldmVudCA9PiB7XG4gIGV2ZW50LndhaXRVbnRpbChcbiAgICBjYWNoZXMub3BlbihjYWNoZU5hbWUpXG4gICAgLnRoZW4oY2FjaGUgPT4gY2FjaGUuYWRkQWxsKGZpbGVzVG9DYWNoZSkpXG4gICAgLnRoZW4oKCkgPT4gc2VsZi5za2lwV2FpdGluZygpKVxuICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhcIkluc3RhbGxhdGlvbiBmYWlsZWQ6IFwiLCBlcnJvcik7XG4gICAgfSlcbiAgKTtcbn0pO1xuXG5zZWxmLmFkZEV2ZW50TGlzdGVuZXIoXCJhY3RpdmF0ZVwiLCBldmVudCA9PiB7XG4gIGV2ZW50LndhaXRVbnRpbChcbiAgICBjYWNoZXMua2V5cygpXG4gICAgLnRoZW4oa2V5TGlzdCA9PiBcbiAgICAgIFByb21pc2UuYWxsKGtleUxpc3QubWFwKGtleSA9PiB7XG4gICAgICAgIGlmKGtleSAhPT0gY2FjaGVOYW1lKSB7XG4gICAgICAgICAgcmV0dXJuIGNhY2hlcy5kZWxldGUoa2V5KTtcbiAgICAgICAgfVxuICAgICAgfSkpXG4gICAgKS5jYXRjaChjb25zb2xlLmxvZylcbiAgKTtcbiAgcmV0dXJuIHNlbGYuY2xpZW50cy5jbGFpbSgpO1xufSk7XG5cbnNlbGYuYWRkRXZlbnRMaXN0ZW5lcihcImZldGNoXCIsIGV2ZW50ID0+IHtcbiAgZXZlbnQucmVzcG9uZFdpdGgoXG4gICAgY2FjaGVzLm1hdGNoKGV2ZW50LnJlcXVlc3QpXG4gICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UgfHwgZmV0Y2goZXZlbnQucmVxdWVzdCkudGhlbihyZXNwb25zZSA9PiBcbiAgICAgIGNhY2hlcy5vcGVuKGNhY2hlTmFtZSkudGhlbihjYWNoZSA9PiB7XG4gICAgICAgIGNhY2hlLnB1dChldmVudC5yZXF1ZXN0LCByZXNwb25zZS5jbG9uZSgpKTtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgfSlcbiAgICApKVxuICApO1xufSk7XG4iXSwic291cmNlUm9vdCI6IiJ9