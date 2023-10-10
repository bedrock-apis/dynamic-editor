import * as __WEBPACK_EXTERNAL_MODULE__minecraft_server_editor_bindings_e2bf1028__ from "@minecraft/server-editor-bindings";
/******/ // The require scope
/******/ var __webpack_require__ = {};
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  j: () => (/* reexport */ server_editor_bindings_namespaceObject.editor)
});

;// CONCATENATED MODULE: external "@minecraft/server-editor-bindings"
var x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var y = x => () => x
const server_editor_bindings_namespaceObject = x({ ["editor"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_editor_bindings_e2bf1028__.editor });
;// CONCATENATED MODULE: ./.bin/dynamic-editor/index.js

console.warn("exported editor.");

;// CONCATENATED MODULE: ./.bin/dynamic-editor.js


var __webpack_exports__editor = __webpack_exports__.j;
export { __webpack_exports__editor as editor };
