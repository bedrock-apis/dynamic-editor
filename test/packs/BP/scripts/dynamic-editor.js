/*! This file was automatically generated. */
import * as __WEBPACK_EXTERNAL_MODULE__minecraft_server_editor_bindings_e2bf1028__ from "@minecraft/server-editor-bindings";
import * as __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__ from "@minecraft/server";
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
  pF: () => (/* reexport */ AutoSizeStatusBarItem),
  mj: () => (/* reexport */ BindedSource),
  n_: () => (/* reexport */ BlockPickerPaneElement),
  rz: () => (/* reexport */ BlockTypePickerPaneElement),
  d_: () => (/* reexport */ BooleanPaneElement),
  xv: () => (/* reexport */ BooleanProperty),
  uf: () => (/* reexport */ BuildInPane),
  LN: () => (/* reexport */ ButtonPaneElement),
  Wu: () => (/* reexport */ ButtonVariant),
  wF: () => (/* reexport */ ButtonVariantProperty),
  xf: () => (/* reexport */ server_editor_bindings_namespaceObject.ClipboardItem),
  UD: () => (/* reexport */ server_editor_bindings_namespaceObject.ClipboardManager),
  Sd: () => (/* reexport */ server_editor_bindings_namespaceObject.ClipboardMirrorAxis),
  mS: () => (/* reexport */ server_editor_bindings_namespaceObject.ClipboardRotation),
  CF: () => (/* reexport */ server_editor_bindings_namespaceObject.Cursor),
  TN: () => (/* reexport */ server_editor_bindings_namespaceObject.CursorControlMode),
  zI: () => (/* reexport */ server_editor_bindings_namespaceObject.CursorTargetMode),
  Jh: () => (/* reexport */ DividerPaneElement),
  ct: () => (/* reexport */ DropdownItemsMapingProperty),
  Aw: () => (/* reexport */ DropdownPaneElement),
  ML: () => (/* reexport */ Editor),
  Wi: () => (/* reexport */ EditorEvents),
  MC: () => (/* reexport */ EditorExtension),
  je: () => (/* reexport */ server_editor_bindings_namespaceObject.EditorMode),
  J4: () => (/* reexport */ EditorPane),
  W_: () => (/* reexport */ Element),
  et: () => (/* reexport */ ExtensionInitializeEvent),
  V2: () => (/* reexport */ ExtensionInitializeEventData),
  hV: () => (/* reexport */ ExtensionReadyEvent),
  CS: () => (/* reexport */ ExtensionReadyEventData),
  CG: () => (/* reexport */ ExtensionShutdownEvent),
  _4: () => (/* reexport */ ExtensionShutdownEventData),
  kZ: () => (/* reexport */ server_editor_bindings_namespaceObject.GraphicsSettings),
  fT: () => (/* reexport */ server_editor_bindings_namespaceObject.GraphicsSettingsProperty),
  P3: () => (/* reexport */ InputModifier),
  u8: () => (/* reexport */ KeyboardKey),
  Yd: () => (/* reexport */ server_editor_bindings_namespaceObject.Logger),
  MK: () => (/* reexport */ MenuActionItem),
  hd: () => (/* reexport */ MenuOptionsItem),
  oX: () => (/* reexport */ MouseAction),
  V1: () => (/* reexport */ MouseInteractionType),
  Y2: () => (/* reexport */ MouseInteractions),
  VW: () => (/* reexport */ NumberPaneElement),
  Y6: () => (/* reexport */ NumberProperty),
  SY: () => (/* reexport */ PermutationPickerPane),
  $W: () => (/* reexport */ PlayerModeChangeEvent),
  uY: () => (/* reexport */ PlayerModeChangeEventData),
  uG: () => (/* reexport */ server_editor_bindings_namespaceObject.PlaytestManager),
  YY: () => (/* reexport */ server_editor_bindings_namespaceObject.PlaytestSessionResult),
  Pw: () => (/* reexport */ RedirectDestination),
  Y1: () => (/* reexport */ server_editor_bindings_namespaceObject.Selection),
  ZE: () => (/* reexport */ server_editor_bindings_namespaceObject.SelectionManager),
  pz: () => (/* reexport */ server_editor_bindings_namespaceObject.SettingsManager),
  BH: () => (/* reexport */ server_editor_bindings_namespaceObject.SimulationState),
  V7: () => (/* reexport */ StatusBarAlignmentProperty),
  wl: () => (/* reexport */ StatusBarItem),
  se: () => (/* reexport */ StatusBarItemAlignment),
  er: () => (/* reexport */ StringPaneElement),
  h_: () => (/* reexport */ StringProperty),
  UA: () => (/* reexport */ Tool),
  v5: () => (/* reexport */ ToolView),
  wt: () => (/* reexport */ server_editor_bindings_namespaceObject.TransactionManager),
  My: () => (/* reexport */ ValueChangeEvent),
  xC: () => (/* reexport */ ValueChangeEventData),
  G7: () => (/* reexport */ Vector3Property),
  Bk: () => (/* reexport */ VectorPaneElement),
  j6: () => (/* reexport */ editor)
});

;// CONCATENATED MODULE: ./src/dynamic-editor/core/Events.ts
/**
 * Represents an event signal.
 * - The types of the arguments passed to the event handlers.
 */
const sessions = new WeakMap();
class NativeEvent {
    constructor() { sessions.set(this, new Set()); }
    /**
     * Triggers the event signal.
     * @param params - The arguments to pass to the event handlers.
     * @returns A promise that resolves with the number of successful event handlers.
     */
    async trigger(...params) {
        if (sessions.has(this)) {
            const promises = [];
            sessions.get(this)?.forEach((method) => {
                promises.push((async () => method(...params))().catch(e => console.error(e, e.stack)));
            });
            await Promise.all(promises);
        }
    }
    /**
     * Subscribes to the event signal.
     * @template  k - The type of the event handler function.
     * @param method - The event handler function to subscribe.
     * @returns The subscribed event handler function.
     */
    subscribe(method) {
        const t = typeof method;
        if (t !== "function")
            throw new TypeError(`Expected a function, but got ${t}.`);
        if (sessions.has(this)) {
            const set = sessions.get(this);
            if (!set.has(method))
                set.add(method);
        }
        return method;
    }
    /**
     * Unsubscribes from the event signal.
     * @template k - The type of the event handler function.
     * @param method - The event handler function to unsubscribe.
     * @returns The unsubscribed event handler function.
     */
    unsubscribe(method) {
        const t = typeof method;
        if (t !== "function")
            throw new TypeError(`Expected a function, but got ${t}.`);
        if (sessions.has(this))
            sessions.get(this)?.delete(method);
        return method;
    }
}
async function TriggerEvent(event, ...params) {
    if (sessions.has(event)) {
        const promises = [];
        sessions.get(event)?.forEach((method) => {
            promises.push((async () => method(...params))().catch(e => console.error(e, e.stack)));
        });
        await Promise.all(promises);
    }
}
/**@public */
class PublicEvent {
    constructor() { sessions.set(this, new Set()); }
    /**
     * Subscribes to the event signal.
     * @template  k - The type of the event handler function.
     * @param method - The event handler function to subscribe.
     * @returns The subscribed event handler function.
     */
    subscribe(method) {
        const t = typeof method;
        if (t !== "function")
            throw new TypeError(`Expected a function, but got ${t}.`);
        if (sessions.has(this)) {
            const set = sessions.get(this);
            if (!set.has(method))
                set.add(method);
        }
        return method;
    }
    /**
     * Unsubscribes from the event signal.
     * @template k - The type of the event handler function.
     * @param method - The event handler function to unsubscribe.
     * @returns The unsubscribed event handler function.
     */
    unsubscribe(method) {
        const t = typeof method;
        if (t !== "function")
            throw new TypeError(`Expected a function, but got ${t}.`);
        if (sessions.has(this))
            sessions.get(this)?.delete(method);
        return method;
    }
}

;// CONCATENATED MODULE: ./src/dynamic-editor/core/Base.ts
/////////////////////////////////////
///// Errors
/////////////////////////////////////
const Base_TypeError = globalThis.TypeError;
const Base_ReferenceError = globalThis.ReferenceError;
const random = Math.random;
const floor = Math.floor;
const Base_NewKeyword = "must be called with new";
const Base_ObjectBoundNotExist = "Native object bound to prototype does not exist.";
const Base_NoConstructor = `No constructor for native class `;
const NoPrivileges = (/* unused pure expression or super */ null && (`Native function [$] does not have required privileges.`));
/*
export const NewKeyword = ()=>new TypeError("must be called with new");
export const ObjectBoundNotExist = ()=>new ReferenceError("Native object bound to prototype does not exist.");
export const NoConstructor = (name)=>new ReferenceError(`No constructor for native class '${name}'`);
export const NoPrivileges = (id)=>new ReferenceError(`Native function [${id}] does not have required privileges.`);*/
class UUID {
    static generate(timestamp = Date.now()) {
        const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            let r = (timestamp + random() * 16) % 16 | 0;
            timestamp = floor(timestamp / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }
}
class Core {
    isNativeCall = false;
}
const Base_core = new Core();

;// CONCATENATED MODULE: ./src/dynamic-editor/core/Definitions.ts
/**@public */
var RedirectDestination;
(function (RedirectDestination) {
    RedirectDestination[RedirectDestination["Documentation"] = 1] = "Documentation";
    RedirectDestination[RedirectDestination["Feedback"] = 2] = "Feedback";
    RedirectDestination[RedirectDestination["PauseScreen"] = 3] = "PauseScreen";
})(RedirectDestination || (RedirectDestination = {}));
var EditorInputContext;
(function (EditorInputContext) {
    EditorInputContext["GlobalEditor"] = "global.editor";
    EditorInputContext["GlobalToolMode"] = "global.toolMode";
    EditorInputContext["Viewport"] = "local.toolMode.viewport";
})(EditorInputContext || (EditorInputContext = {}));
/**@public */
var BuildInPane;
(function (BuildInPane) {
    BuildInPane[BuildInPane["UISettings"] = 1] = "UISettings";
    BuildInPane[BuildInPane["WelcomePage"] = 2] = "WelcomePage";
    BuildInPane[BuildInPane["LogPanel"] = 3] = "LogPanel";
})(BuildInPane || (BuildInPane = {}));
var InternalPaneElementTypes;
(function (InternalPaneElementTypes) {
    InternalPaneElementTypes["String"] = "editorUI:String";
    InternalPaneElementTypes["Number"] = "editorUI:Number";
    InternalPaneElementTypes["Boolean"] = "editorUI:Boolean";
    InternalPaneElementTypes["Button"] = "editorUI:Action";
    InternalPaneElementTypes["Vector3"] = "editorUI:Vec3";
    InternalPaneElementTypes["Dropdown"] = "editorUI:Dropdown";
    InternalPaneElementTypes["BlockPicker"] = "editorUI:BlockPicker";
    InternalPaneElementTypes["Divider"] = "editorUI:Divider";
    InternalPaneElementTypes["SubPane"] = "editorUI:SubPane";
})(InternalPaneElementTypes || (InternalPaneElementTypes = {}));
var ButtonVariant;
(function (ButtonVariant) {
    ButtonVariant["secondary"] = "secondary";
    ButtonVariant["primary"] = "primary";
    ButtonVariant["destructive"] = "destructive";
    ButtonVariant["hero"] = "hero";
})(ButtonVariant || (ButtonVariant = {}));
var ActionType;
(function (ActionType) {
    ActionType["NoArgsAction"] = "NoArgsAction";
    ActionType["MouseRayCastAction"] = "MouseRayCastAction";
})(ActionType || (ActionType = {}));
;
var MouseInteractionType;
(function (MouseInteractionType) {
    MouseInteractionType[MouseInteractionType["ButtonDown"] = 1] = "ButtonDown";
    MouseInteractionType[MouseInteractionType["ButtonUp"] = 2] = "ButtonUp";
    MouseInteractionType[MouseInteractionType["WheelDown"] = 3] = "WheelDown";
    MouseInteractionType[MouseInteractionType["WheelUp"] = 4] = "WheelUp";
    MouseInteractionType[MouseInteractionType["DragStart"] = 5] = "DragStart";
    MouseInteractionType[MouseInteractionType["Draging"] = 6] = "Draging";
    MouseInteractionType[MouseInteractionType["DragStop"] = 7] = "DragStop";
})(MouseInteractionType || (MouseInteractionType = {}));
var MouseInteractions;
(function (MouseInteractions) {
    MouseInteractions[MouseInteractions["LeftButton"] = 1] = "LeftButton";
    MouseInteractions[MouseInteractions["MiddleButton"] = 2] = "MiddleButton";
    MouseInteractions[MouseInteractions["Scroll"] = 4] = "Scroll";
})(MouseInteractions || (MouseInteractions = {}));
var MouseAction;
(function (MouseAction) {
    MouseAction[MouseAction["ButtonClick"] = 1] = "ButtonClick";
    MouseAction[MouseAction["Wheel"] = 2] = "Wheel";
    MouseAction[MouseAction["Drag"] = 3] = "Drag";
})(MouseAction || (MouseAction = {}));
var InputDevice;
(function (InputDevice) {
    InputDevice[InputDevice["KeyBoard"] = 1] = "KeyBoard";
    InputDevice[InputDevice["Mouse"] = 2] = "Mouse";
})(InputDevice || (InputDevice = {}));
;
var InputModifier;
(function (InputModifier) {
    InputModifier[InputModifier["Unused"] = 0] = "Unused";
    InputModifier[InputModifier["None"] = 1] = "None";
    InputModifier[InputModifier["Alt"] = 2] = "Alt";
    InputModifier[InputModifier["Control"] = 4] = "Control";
    InputModifier[InputModifier["Shift"] = 8] = "Shift";
    InputModifier[InputModifier["Any"] = 15] = "Any";
})(InputModifier || (InputModifier = {}));
/**
 * Keyboard key from @minecarft/server-editor
 */
var KeyboardKey;
(function (KeyboardKey) {
    KeyboardKey[KeyboardKey["BACKSPACE"] = 8] = "BACKSPACE";
    KeyboardKey[KeyboardKey["TAB"] = 9] = "TAB";
    KeyboardKey[KeyboardKey["ENTER"] = 13] = "ENTER";
    KeyboardKey[KeyboardKey["SHIFT"] = 16] = "SHIFT";
    KeyboardKey[KeyboardKey["CTRL"] = 17] = "CTRL";
    KeyboardKey[KeyboardKey["ALT"] = 18] = "ALT";
    KeyboardKey[KeyboardKey["CAPS_LOCK"] = 20] = "CAPS_LOCK";
    KeyboardKey[KeyboardKey["ESCAPE"] = 27] = "ESCAPE";
    KeyboardKey[KeyboardKey["SPACE"] = 32] = "SPACE";
    KeyboardKey[KeyboardKey["PAGE_UP"] = 33] = "PAGE_UP";
    KeyboardKey[KeyboardKey["PAGE_DOWN"] = 34] = "PAGE_DOWN";
    KeyboardKey[KeyboardKey["END"] = 35] = "END";
    KeyboardKey[KeyboardKey["HOME"] = 36] = "HOME";
    KeyboardKey[KeyboardKey["LEFT"] = 37] = "LEFT";
    KeyboardKey[KeyboardKey["UP"] = 38] = "UP";
    KeyboardKey[KeyboardKey["RIGHT"] = 39] = "RIGHT";
    KeyboardKey[KeyboardKey["DOWN"] = 40] = "DOWN";
    KeyboardKey[KeyboardKey["PRINT_SCREEN"] = 44] = "PRINT_SCREEN";
    KeyboardKey[KeyboardKey["INSERT"] = 45] = "INSERT";
    KeyboardKey[KeyboardKey["DELETE"] = 46] = "DELETE";
    KeyboardKey[KeyboardKey["KEY_0"] = 48] = "KEY_0";
    KeyboardKey[KeyboardKey["KEY_1"] = 49] = "KEY_1";
    KeyboardKey[KeyboardKey["KEY_2"] = 50] = "KEY_2";
    KeyboardKey[KeyboardKey["KEY_3"] = 51] = "KEY_3";
    KeyboardKey[KeyboardKey["KEY_4"] = 52] = "KEY_4";
    KeyboardKey[KeyboardKey["KEY_5"] = 53] = "KEY_5";
    KeyboardKey[KeyboardKey["KEY_6"] = 54] = "KEY_6";
    KeyboardKey[KeyboardKey["KEY_7"] = 55] = "KEY_7";
    KeyboardKey[KeyboardKey["KEY_8"] = 56] = "KEY_8";
    KeyboardKey[KeyboardKey["KEY_9"] = 57] = "KEY_9";
    KeyboardKey[KeyboardKey["KEY_A"] = 65] = "KEY_A";
    KeyboardKey[KeyboardKey["KEY_B"] = 66] = "KEY_B";
    KeyboardKey[KeyboardKey["KEY_C"] = 67] = "KEY_C";
    KeyboardKey[KeyboardKey["KEY_D"] = 68] = "KEY_D";
    KeyboardKey[KeyboardKey["KEY_E"] = 69] = "KEY_E";
    KeyboardKey[KeyboardKey["KEY_F"] = 70] = "KEY_F";
    KeyboardKey[KeyboardKey["KEY_G"] = 71] = "KEY_G";
    KeyboardKey[KeyboardKey["KEY_H"] = 72] = "KEY_H";
    KeyboardKey[KeyboardKey["KEY_I"] = 73] = "KEY_I";
    KeyboardKey[KeyboardKey["KEY_J"] = 74] = "KEY_J";
    KeyboardKey[KeyboardKey["KEY_K"] = 75] = "KEY_K";
    KeyboardKey[KeyboardKey["KEY_L"] = 76] = "KEY_L";
    KeyboardKey[KeyboardKey["KEY_M"] = 77] = "KEY_M";
    KeyboardKey[KeyboardKey["KEY_N"] = 78] = "KEY_N";
    KeyboardKey[KeyboardKey["KEY_O"] = 79] = "KEY_O";
    KeyboardKey[KeyboardKey["KEY_P"] = 80] = "KEY_P";
    KeyboardKey[KeyboardKey["KEY_Q"] = 81] = "KEY_Q";
    KeyboardKey[KeyboardKey["KEY_R"] = 82] = "KEY_R";
    KeyboardKey[KeyboardKey["KEY_S"] = 83] = "KEY_S";
    KeyboardKey[KeyboardKey["KEY_T"] = 84] = "KEY_T";
    KeyboardKey[KeyboardKey["KEY_U"] = 85] = "KEY_U";
    KeyboardKey[KeyboardKey["KEY_V"] = 86] = "KEY_V";
    KeyboardKey[KeyboardKey["KEY_W"] = 87] = "KEY_W";
    KeyboardKey[KeyboardKey["KEY_X"] = 88] = "KEY_X";
    KeyboardKey[KeyboardKey["KEY_Y"] = 89] = "KEY_Y";
    KeyboardKey[KeyboardKey["KEY_Z"] = 90] = "KEY_Z";
    KeyboardKey[KeyboardKey["NUMPAD_0"] = 96] = "NUMPAD_0";
    KeyboardKey[KeyboardKey["NUMPAD_1"] = 97] = "NUMPAD_1";
    KeyboardKey[KeyboardKey["NUMPAD_2"] = 98] = "NUMPAD_2";
    KeyboardKey[KeyboardKey["NUMPAD_3"] = 99] = "NUMPAD_3";
    KeyboardKey[KeyboardKey["NUMPAD_4"] = 100] = "NUMPAD_4";
    KeyboardKey[KeyboardKey["NUMPAD_5"] = 101] = "NUMPAD_5";
    KeyboardKey[KeyboardKey["NUMPAD_6"] = 102] = "NUMPAD_6";
    KeyboardKey[KeyboardKey["NUMPAD_7"] = 103] = "NUMPAD_7";
    KeyboardKey[KeyboardKey["NUMPAD_8"] = 104] = "NUMPAD_8";
    KeyboardKey[KeyboardKey["NUMPAD_9"] = 105] = "NUMPAD_9";
    KeyboardKey[KeyboardKey["NUMPAD_MULTIPLY"] = 106] = "NUMPAD_MULTIPLY";
    KeyboardKey[KeyboardKey["NUMPAD_ADD"] = 107] = "NUMPAD_ADD";
    KeyboardKey[KeyboardKey["NUMPAD_SEPARATOR"] = 108] = "NUMPAD_SEPARATOR";
    KeyboardKey[KeyboardKey["NUMPAD_SUBTRACT"] = 109] = "NUMPAD_SUBTRACT";
    KeyboardKey[KeyboardKey["NUMPAD_DECIMAL"] = 110] = "NUMPAD_DECIMAL";
    KeyboardKey[KeyboardKey["NUMPAD_DIVIDE"] = 111] = "NUMPAD_DIVIDE";
    KeyboardKey[KeyboardKey["F1"] = 112] = "F1";
    KeyboardKey[KeyboardKey["F2"] = 113] = "F2";
    KeyboardKey[KeyboardKey["F3"] = 114] = "F3";
    KeyboardKey[KeyboardKey["F4"] = 115] = "F4";
    KeyboardKey[KeyboardKey["F5"] = 116] = "F5";
    KeyboardKey[KeyboardKey["F6"] = 117] = "F6";
    KeyboardKey[KeyboardKey["F7"] = 118] = "F7";
    KeyboardKey[KeyboardKey["F8"] = 119] = "F8";
    KeyboardKey[KeyboardKey["F9"] = 120] = "F9";
    KeyboardKey[KeyboardKey["F10"] = 121] = "F10";
    KeyboardKey[KeyboardKey["F11"] = 122] = "F11";
    KeyboardKey[KeyboardKey["F12"] = 123] = "F12";
    KeyboardKey[KeyboardKey["COMMA"] = 188] = "COMMA";
    KeyboardKey[KeyboardKey["PERIOD"] = 190] = "PERIOD";
    KeyboardKey[KeyboardKey["SLASH"] = 191] = "SLASH";
    KeyboardKey[KeyboardKey["BACK_QUOTE"] = 192] = "BACK_QUOTE";
    KeyboardKey[KeyboardKey["BRACKET_OPEN"] = 219] = "BRACKET_OPEN";
    KeyboardKey[KeyboardKey["BACK_SLASH"] = 220] = "BACK_SLASH";
    KeyboardKey[KeyboardKey["BRACKET_CLOSE"] = 221] = "BRACKET_CLOSE";
    KeyboardKey[KeyboardKey["QUOTE"] = 222] = "QUOTE";
})(KeyboardKey || (KeyboardKey = {}));
var StatusBarItemAlignment;
(function (StatusBarItemAlignment) {
    StatusBarItemAlignment[StatusBarItemAlignment["Right"] = 0] = "Right";
    StatusBarItemAlignment[StatusBarItemAlignment["Left"] = 1] = "Left";
})(StatusBarItemAlignment || (StatusBarItemAlignment = {}));
////////////////////////////////////////////////////////////
/////////////////////////////////// POST
////////////////////////////////////////////////////////////
var ServerUXEventType;
(function (ServerUXEventType) {
    ServerUXEventType[ServerUXEventType["UpdatePropertyPane"] = 1] = "UpdatePropertyPane";
    ServerUXEventType[ServerUXEventType["ReleasePropertyPane"] = 2] = "ReleasePropertyPane";
    ServerUXEventType[ServerUXEventType["UpdateItemMenu"] = 3] = "UpdateItemMenu";
    ServerUXEventType[ServerUXEventType["ReleaseItemMenu"] = 4] = "ReleaseItemMenu";
    ServerUXEventType[ServerUXEventType["UpdateStatusBarItem"] = 5] = "UpdateStatusBarItem";
    ServerUXEventType[ServerUXEventType["ReleaseStatusBarItem"] = 6] = "ReleaseStatusBarItem";
    ServerUXEventType[ServerUXEventType["CreateTool"] = 7] = "CreateTool";
    ServerUXEventType[ServerUXEventType["ReleaseTool"] = 8] = "ReleaseTool";
    ServerUXEventType[ServerUXEventType["SetActiveTool"] = 9] = "SetActiveTool";
    ServerUXEventType[ServerUXEventType["ReleaseToolRail"] = 10] = "ReleaseToolRail";
    ServerUXEventType[ServerUXEventType["BindUIEvent"] = 11] = "BindUIEvent";
    ServerUXEventType[ServerUXEventType["UnbindUIEvent"] = 12] = "UnbindUIEvent";
    ServerUXEventType[ServerUXEventType["UpdatePaneControl"] = 13] = "UpdatePaneControl";
    ServerUXEventType[ServerUXEventType["ReleasePaneControl"] = 14] = "ReleasePaneControl";
    ServerUXEventType[ServerUXEventType["RedirectToDestination"] = 15] = "RedirectToDestination";
    ServerUXEventType[ServerUXEventType["UpdateBuildInPanes"] = 18] = "UpdateBuildInPanes";
})(ServerUXEventType || (ServerUXEventType = {}));
var ServerActionEventType;
(function (ServerActionEventType) {
    ServerActionEventType[ServerActionEventType["CreateAction"] = 1] = "CreateAction";
    ServerActionEventType[ServerActionEventType["ReleaseAction"] = 2] = "ReleaseAction";
})(ServerActionEventType || (ServerActionEventType = {}));
var ServerInputBindingEventType;
(function (ServerInputBindingEventType) {
    ServerInputBindingEventType[ServerInputBindingEventType["KeyActionBinding"] = 1] = "KeyActionBinding";
    ServerInputBindingEventType[ServerInputBindingEventType["MouseActionBinding"] = 2] = "MouseActionBinding";
    ServerInputBindingEventType[ServerInputBindingEventType["UnregistryBinding"] = 3] = "UnregistryBinding"; //inputDivice: InputDivices-2-1, contextId: toolId | global.editor ..., actionId: actionId
})(ServerInputBindingEventType || (ServerInputBindingEventType = {}));
var PostEventId;
(function (PostEventId) {
    PostEventId["Editor::ServerUXEvents"] = "Editor::ServerUXEvents";
    PostEventId["Editor::ServerInputBindingEvents"] = "Editor::ServerInputBindingEvents";
    PostEventId["Editor::ServerActionEvents"] = "Editor::ServerActionEvents";
})(PostEventId || (PostEventId = {}));
;
var PostEventName;
(function (PostEventName) {
    PostEventName["ServerUXEvents"] = "Editor::ServerUXEvents";
    PostEventName["ServerActionEvents"] = "Editor::ServerActionEvents";
    PostEventName["ServerInputBindingEvents"] = "Editor::ServerInputBindingEvents";
})(PostEventName || (PostEventName = {}));
const PostEventEnum = {
    [PostEventId["Editor::ServerUXEvents"]]: ServerUXEventType,
    [PostEventId["Editor::ServerInputBindingEvents"]]: ServerInputBindingEventType,
    [PostEventId["Editor::ServerActionEvents"]]: ServerActionEventType,
};
////////////////////////////////////////////////////////////
/////////////////////////////////// RECEIVE
////////////////////////////////////////////////////////////
var ReceiveActionEventType;
(function (ReceiveActionEventType) {
    ReceiveActionEventType[ReceiveActionEventType["ActionExecuted"] = 1] = "ActionExecuted";
})(ReceiveActionEventType || (ReceiveActionEventType = {}));
;
var ReceiveLifecycleEventType;
(function (ReceiveLifecycleEventType) {
    ReceiveLifecycleEventType[ReceiveLifecycleEventType["PlayerReady"] = 1] = "PlayerReady";
})(ReceiveLifecycleEventType || (ReceiveLifecycleEventType = {}));
;
var ReceiveUXEventType;
(function (ReceiveUXEventType) {
    ReceiveUXEventType[ReceiveUXEventType["ProperyChanged"] = 1] = "ProperyChanged";
    ReceiveUXEventType[ReceiveUXEventType["ToolActivate"] = 2] = "ToolActivate";
    ReceiveUXEventType[ReceiveUXEventType["PaneVisisbilityChanged"] = 3] = "PaneVisisbilityChanged";
    ReceiveUXEventType[ReceiveUXEventType["PaneModeChanged"] = 4] = "PaneModeChanged";
})(ReceiveUXEventType || (ReceiveUXEventType = {}));
;
var ReceiveEventId;
(function (ReceiveEventId) {
    ReceiveEventId["Editor::ClientLifecycle"] = "Editor::ClientLifecycle";
    ReceiveEventId["Editor::ClientUXEvents"] = "Editor::ClientUXEvents";
    ReceiveEventId["Editor::ClientActionEvents"] = "Editor::ClientActionEvents";
})(ReceiveEventId || (ReceiveEventId = {}));
;
var ReceiveEventName;
(function (ReceiveEventName) {
    ReceiveEventName["ClientLifecycle"] = "Editor::ClientLifecycle";
    ReceiveEventName["ClientUXEvents"] = "Editor::ClientUXEvents";
    ReceiveEventName["ClientActionEvents"] = "Editor::ClientActionEvents";
})(ReceiveEventName || (ReceiveEventName = {}));
;
const ReceiveEventEnum = {
    [ReceiveEventId["Editor::ClientActionEvents"]]: ReceiveActionEventType,
    [ReceiveEventId["Editor::ClientLifecycle"]]: ReceiveLifecycleEventType,
    [ReceiveEventId["Editor::ClientUXEvents"]]: ReceiveUXEventType,
};

;// CONCATENATED MODULE: ./src/dynamic-editor/core/APIBuilder.js


const $native_functions = new WeakSet();
const APIBuilder_toString = Function.prototype.toString;
const call = Function.prototype.call.bind(Function.prototype.call);
const FuncProto = Function.prototype;
const ObjProto = Object.prototype;
$native_functions.add(Function.prototype.toString = function(){
    if($native_functions.has(this)) return `function ${this.name}() {\n    [native code]\n}`;
    return call(APIBuilder_toString,this);
});

const constructors = new WeakMap();
const PUBLIC_CACHES = new WeakMap();
function ReleaseCache(constructor,cache){
    const k = PUBLIC_CACHES.get(cache);
    PUBLIC_CACHES.delete(cache);
    return constructors.get(constructor)?.cache?.delete?.(k)??false;
}
function GetPublicInstance(cache){ return PUBLIC_CACHES.get(cache); }
function IsRegistered(func){return constructors.has(func) || func === FuncProto;}
function CreateMethodFunction(name,func,manager){
    const f = function (){
        try {
            const cache = manager.getCache(this);
            if(!cache) throw new ReferenceError(ObjectBoundNotExist);
            return call(func,this,cache,...arguments);
        } catch (error) {throw new error.constructor(error.message);}
    };
    $native_functions.add(f);
    if(typeof name === "string")  Object.defineProperty(f,"name",{value:name,configurable:true,enumerable:true,writable:false});
    return f;
}
function CreateGetterFunction(name,func,manager){
    const f = function (){
        try {
            const cache = manager.getCache(this);
            if(!cache) return undefined;
            return call(func,this,cache,...arguments);
        } catch (error) {throw new error.constructor(error.message);}
    };
    $native_functions.add(f);
    if(typeof name === "string") Object.defineProperty(f,"name",{value:name,configurable:true,enumerable:true,writable:false});
    return f;
}
class Manager{
    constructor(){
        this.cache = new WeakMap();
        this.getCache = (that)=>this.cache.get(that);
        this.hasCache = (that)=>this.cache.has(that);
        this.setCache = (that,it)=>this.cache.set(that,it);
    }
}
function RegisterClass(classConstructor){
    if(IsRegistered(classConstructor)) return constructors.get(classConstructor);
    if(!IsRegistered(Object.getPrototypeOf(classConstructor))) throw new ReferenceError("Parent class is not registred.");
    const m = new Manager();
    constructors.set(classConstructor,m);
    return m;
}
function CreateInstance(constructor,cache, proto = constructor.prototype){
    if(!IsRegistered(constructor)) throw new ReferenceError("Constructor is not registered.");
    let con = constructor;
    const instance = Object.create(proto);
    while(con != FuncProto & con != null & con!= ObjProto){
        const m = constructors.get(con);
        m.setCache(instance,cache);
        con = Object.getPrototypeOf(con);
    }
    PUBLIC_CACHES.set(cache,instance);
    return instance;
}
function CreateClass(name,properties,func, extending = FuncProto){
    properties = properties??{};
    func = func??=function (){
        if(!new.target) throw new TypeError(NewKeyword);
        if(!core.isNativeCall) throw new ReferenceError(NoConstructor + name);
    }
    Object.defineProperty(func,"name",{value:name,configurable:true,enumerable:true,writable:false});
    Object.setPrototypeOf(func,extending);
    Object.setPrototypeOf(func.prototype,extending.prototype??ObjProto);
    $native_functions.add(func);
    const manager = RegisterClass(func);
    const proto = func.prototype;
    Object.setPrototypeOf(properties,manager);
    for (const key of Object.getOwnPropertyNames(properties)) {
        const {value,get,set,enumerable,configurable,writable} = Object.getOwnPropertyDescriptor(properties,key);
        if(typeof value === "function"){
            Object.defineProperty(proto,key,{value:CreateMethodFunction(key,value,manager),enumerable,configurable,writable});
        } else if(get || set) Object.defineProperty(proto,key,{get:typeof get === "function"?CreateGetterFunction(key,get,manager):undefined,set:typeof set === "function"?CreateMethodFunction(key,set,manager):undefined,enumerable,configurable});
    }
    for (const key of Object.getOwnPropertySymbols(properties)) {
        const {value,get,set,enumerable,configurable,writable} = Object.getOwnPropertyDescriptor(properties,key);
        if(typeof value === "function"){
            Object.defineProperty(proto,key,{value:CreateMethodFunction(key,value,manager),enumerable,configurable,writable});
        } else if(get || set) Object.defineProperty(proto,key,{get:typeof get === "function"?CreateGetterFunction(key,get,manager):undefined,set:typeof set === "function"?CreateMethodFunction(key,set,manager):undefined,enumerable,configurable});
    }
    return {constructor: func, manager};
}
;// CONCATENATED MODULE: ./src/dynamic-editor/core/Packets.ts
const UNIQUE_SYMBOL = Symbol("UNIQUE");
const IDENTITY_SYMBOL = Symbol("IDENTITY_SYMBOL");
const IDENTITY_DATA = Symbol("IDENTITY_DATA");
class Packet {
    data;
    id;
    constructor(id, data) {
        this.id = id;
        this.data = data;
    }
    setType(type) {
        this.data.type = type;
        return this;
    }
    isCommand() { return "commandId" in this; }
    ;
}

;// CONCATENATED MODULE: ./src/dynamic-editor/core/index.ts






;// CONCATENATED MODULE: external "@minecraft/server-editor-bindings"
var x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var y = x => () => x
const server_editor_bindings_namespaceObject = x({ ["ClipboardItem"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_editor_bindings_e2bf1028__.ClipboardItem, ["ClipboardManager"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_editor_bindings_e2bf1028__.ClipboardManager, ["ClipboardMirrorAxis"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_editor_bindings_e2bf1028__.ClipboardMirrorAxis, ["ClipboardRotation"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_editor_bindings_e2bf1028__.ClipboardRotation, ["Cursor"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_editor_bindings_e2bf1028__.Cursor, ["CursorControlMode"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_editor_bindings_e2bf1028__.CursorControlMode, ["CursorTargetMode"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_editor_bindings_e2bf1028__.CursorTargetMode, ["EditorMode"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_editor_bindings_e2bf1028__.EditorMode, ["GraphicsSettings"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_editor_bindings_e2bf1028__.GraphicsSettings, ["GraphicsSettingsProperty"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_editor_bindings_e2bf1028__.GraphicsSettingsProperty, ["Logger"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_editor_bindings_e2bf1028__.Logger, ["PlaytestManager"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_editor_bindings_e2bf1028__.PlaytestManager, ["PlaytestSessionResult"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_editor_bindings_e2bf1028__.PlaytestSessionResult, ["Selection"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_editor_bindings_e2bf1028__.Selection, ["SelectionManager"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_editor_bindings_e2bf1028__.SelectionManager, ["SettingsManager"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_editor_bindings_e2bf1028__.SettingsManager, ["SimulationState"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_editor_bindings_e2bf1028__.SimulationState, ["TransactionManager"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_editor_bindings_e2bf1028__.TransactionManager, ["editor"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_editor_bindings_e2bf1028__.editor });
;// CONCATENATED MODULE: ./src/dynamic-editor/native/Editor/Editor.ts

class Editor {
    events;
    get isSimulationPaused() { return server_editor_bindings_namespaceObject.editor.simulation.isPaused(); }
    set isSimulationPaused(v) { server_editor_bindings_namespaceObject.editor.simulation.setPaused(v); }
    //@ts-ignore
    get logger() { return server_editor_bindings_namespaceObject.editor.log; }
    ;
    constructor() {
        this.events = new EditorEvents();
    }
}
class EditorEvents {
    constructor() { }
}
const editor = new Editor();

;// CONCATENATED MODULE: ./src/dynamic-editor/native/Events.ts

/**@beta */
class EditorEventData {
    constructor() { }
}
class EditorEvent extends PublicEvent {
}
;
/**@beta */
class ContextEventData extends EditorEventData {
    player;
    constructor(player) {
        super();
        this.player = player;
    }
}
/**@beta */
class ExtensionEventData extends ContextEventData {
    extension;
    constructor(extension) {
        super(extension.player);
        this.extension = extension;
    }
}
;
/**@beta */
class ExtensionInitializeEventData extends ExtensionEventData {
}
;
class ExtensionReadyEventData extends ExtensionEventData {
}
;
class ExtensionShutdownEventData extends ExtensionEventData {
}
;
class PlayerModeChangeEventData extends ExtensionEventData {
    mode;
    constructor(extension, mode) {
        super(extension);
        this.mode = mode;
    }
}
;
class PropertyValueChangeEventData extends EditorEventData {
    element;
    propertyName;
    property;
    oldValue;
    newValue;
    constructor(element, propertyName, property, oldValue, newValue) {
        super();
        this.element = element;
        this.propertyName = propertyName;
        this.property = property;
        this.oldValue = oldValue;
        this.newValue = newValue;
    }
}
class ValueChangeEventData extends EditorEventData {
    oldValue;
    newValue;
    constructor(oV, nV) {
        super();
        this.oldValue = oV;
        this.newValue = nV;
    }
}
class ValueChangeEvent extends EditorEvent {
}
class PropertyValueChangeEvent extends EditorEvent {
}
class ExtensionEvent extends EditorEvent {
}
;
class ExtensionInitializeEvent extends ExtensionEvent {
}
;
class ExtensionReadyEvent extends ExtensionEvent {
}
;
class ExtensionShutdownEvent extends ExtensionEvent {
}
;
class PlayerModeChangeEvent extends ExtensionEvent {
}
;

;// CONCATENATED MODULE: ./src/dynamic-editor/native/Packets.ts

const ACTION_IDENTITY_SYMBOL = Symbol("ACTION_IDENTITY");
class ServerUXEventPacket extends Packet {
    constructor(data) {
        super(PostEventId["Editor::ServerUXEvents"], data);
    }
}
class ServerInputBindingsEventPacket extends Packet {
    constructor(data) {
        super(PostEventId["Editor::ServerInputBindingEvents"], data);
    }
}
class RedirectToDestinationPacket extends ServerUXEventPacket {
    constructor(destination) { super({ type: ServerUXEventType.RedirectToDestination, destination: destination }); }
}
class UpdateBuildInPanePacket extends ServerUXEventPacket {
    constructor(panelId, visible) { super({ type: ServerUXEventType.UpdateBuildInPanes, panel: panelId, visible }); }
}
class ServerActionEventPacket extends Packet {
    constructor(data) {
        super(PostEventId["Editor::ServerActionEvents"], data);
    }
}
class PacketBuilder {
    static GetRedirectToDestinationPacket(destination) {
        if (!(destination in RedirectDestination))
            throw new ReferenceError("Invalid destination!");
        //@ts-ignore
        return new RedirectToDestinationPacket(typeof destination === 'number' ? destination : RedirectDestination[destination]);
    }
    static GetUpdateBuildInPanePacket(pane, visible = true) {
        if (!(pane in BuildInPane))
            throw new ReferenceError("Invalid build in pane id!");
        if (typeof visible !== 'boolean')
            throw new TypeError("Visibility must be a true/false");
        //@ts-ignore
        return new UpdateBuildInPanePacket(typeof pane === 'number' ? pane : BuildInPane[pane], visible);
    }
    static BindActionToControl(action, control) {
        return new ServerUXEventPacket({
            type: ServerUXEventType.BindUIEvent,
            actionId: action,
            controlId: control
        });
    }
    static UnbindActionToControl(action, control) {
        return new ServerUXEventPacket({
            type: ServerUXEventType.UnbindUIEvent,
            actionId: action,
            controlId: control
        });
    }
    static BindKeyInputActionToContext(action, contextId, button, modifier) {
        return new ServerInputBindingsEventPacket({
            type: ServerInputBindingEventType.KeyActionBinding,
            actionId: action,
            contextId: contextId,
            inputDevice: InputDevice.KeyBoard,
            inputType: 1,
            button,
            modifier
        });
    }
    static BindMouseInputActionToContext(action, contextId, mouseAction) {
        return new ServerInputBindingsEventPacket({
            type: ServerInputBindingEventType.MouseActionBinding,
            actionId: action,
            contextId: contextId,
            inputDevice: InputDevice.Mouse,
            mouseAction
        });
    }
    static UnbindInputActionToContext(action, contextId) {
        return new ServerInputBindingsEventPacket({
            type: ServerUXEventType.UnbindUIEvent,
            actionId: action,
            contextId
        });
    }
}
const UPDATE_FLAG = 2;
const INIT_FLAG = 1;
const REMOVE_FLAG = 0;
class Postable {
    PACKET_TYPES = {
        [UPDATE_FLAG]: null,
        [REMOVE_FLAG]: null,
        [INIT_FLAG]: null
    };
    getMainPacketData(flags, packets) { return {}; }
    getMainPacket(flags, packets) {
        const data = this.getMainPacketData(flags, packets);
        data.type = this.PACKET_TYPES[flags];
        return new this.packetConstructor(data);
    }
    *getPackets(flags) { const p = []; yield this.getMainPacket(flags, p); yield* p; }
}
class UniquePostable extends Postable {
    [UNIQUE_SYMBOL](d) { return d.openCreateUnique(this); }
    getMainPacketData(flags, packets) {
        const data = super.getMainPacketData(flags, packets);
        data.id = this;
        return data;
    }
}
class Displayable extends UniquePostable {
    packetConstructor;
    constructor(constuct) {
        super();
        this.packetConstructor = constuct;
    }
    /**@deprecated internal methods */
    onUpdate = new PublicEvent; //Keep displayble bc its not always a "this" reference
    /**@deprecated internal methods */
    *displayInitPackets() { yield* this.getPackets(INIT_FLAG); }
    /**@deprecated internal methods */
    *displayUpdatePackets() { yield* this.getPackets(UPDATE_FLAG); }
    /**@deprecated internal methods */
    *displayDisposePackets() { yield* this.getPackets(REMOVE_FLAG); }
}
class FakeUpdatable {
    packet;
    constructor(packet) {
        this.packet = packet;
    }
    /**@deprecated internal methods */
    *displayInitPackets() { yield this.packet; }
    ;
    /**@deprecated internal methods */
    *displayUpdatePackets() { yield this.packet; }
    ;
    /**@deprecated internal methods */
    *displayDisposePackets() { yield this.packet; }
    ;
}

;// CONCATENATED MODULE: ./src/dynamic-editor/native/Editor/EditorExtension.js





const globalContextRef = {
    context:null
};
/**@public */
class EditorExtension{
    Shutdown(){};
    Ready(){};
    Initialize(){};
    onInitialize = new ExtensionInitializeEvent();
    onReady = new ExtensionReadyEvent();
    onShutdown = new ExtensionShutdownEvent();
    onPlayerModeChange = new PlayerModeChangeEvent();
    constructor(){
        if((!Base_core.isNativeCall) || (!globalContextRef.context)) throw new TypeError(Base_NoConstructor + new.target.name);
        /**@type {EditorContextManager} */
        const context = globalContextRef.context;
        const onInitializeEvent = new ExtensionInitializeEvent();
        const onReadyEvent = new ExtensionReadyEvent();
        const onShutdownEvent = new ExtensionShutdownEvent();
        const onPlayerModeChangeEvent = new PlayerModeChangeEvent();
        this.clipboardManager = context.clipboardManager;
        this.transactionManager = context.transactionManager;
        this.selectionManager = context.selectionManager;
        this.playtestManager = context.context.playtest;
        this.mainSelection = context.selectionManager.selection;
        this.mainClipboard = context.clipboardManager.clipboard;
        this.cursor = context.context.cursor;
        this.settings = context.context.settings;
        context.context.cursor
        context.onInitializeEvent.subscribe(()=>{
            (async ()=>this.Initialize?.(this))().catch(er=>console.warn(er,er?.stack));
            TriggerEvent(onInitializeEvent,new ExtensionInitializeEventData(this));
        });
        context.onReadyEvent.subscribe(()=>{
            (async ()=>this.Ready?.(this))().catch(er=>console.warn(er,er?.stack));
            TriggerEvent(this.onReady,new ExtensionReadyEventData(this));
        });
        context.onShutdownEvent.subscribe(()=>{
            TriggerEvent(this.onShutdown,new ExtensionShutdownEventData(this));
            (async ()=>this.Shutdown?.(this))().catch(er=>console.warn(er,er?.stack));
        });
        context.context.afterEvents.modeChange.subscribe(e=>TriggerEvent(onPlayerModeChangeEvent,new PlayerModeChangeEventData(this,e.mode)));
        this.player = context.player;
        this.toolView = context.controlManager.toolView;
        this.clipboard = context.clipboardManager;
        this.onInitialize = onInitializeEvent;
        this.onReady = onReadyEvent;
        this.onShutdown = onShutdownEvent;
        this.onPlayerModeChange = onPlayerModeChangeEvent;
    }
    
    get dimension(){
        if(!CONTEXT_BY_EXTENSION.has(this)) throw new ReferenceError(Base_ObjectBoundNotExist);
        return CONTEXT_BY_EXTENSION.get(this).player.dimension;
    }
    get hoveredBlockLocation(){
        if(!CONTEXT_BY_EXTENSION.has(this)) throw new ReferenceError(Base_ObjectBoundNotExist);
        return CONTEXT_BY_EXTENSION.get(this).cursor.getPosition();
    }
    redirectTo(destination){
        if(!CONTEXT_BY_EXTENSION.has(this)) throw new ReferenceError(Base_ObjectBoundNotExist);
        if(!(destination in RedirectDestination)) throw new TypeError("Unknow Destination: " + destination);
        if(typeof destination === "string") destination = RedirectDestination[destination];
        CONTEXT_BY_EXTENSION.get(this).post(new RedirectToDestinationPacket(destination));
        return this;
    }
    setBuildInPaneVisibility(pane, visible = true){
        if(!CONTEXT_BY_EXTENSION.has(this)) throw new ReferenceError(Base_ObjectBoundNotExist);
        if(!(pane in BuildInPane)) throw new TypeError("Unknow pane: " + pane);
        if(typeof pane === "string") destination = BuildInPane[pane];
        CONTEXT_BY_EXTENSION.get(this).post(new UpdateBuildInPanePacket(pane,!!visible));
        return this;
    }
    setCursorProperties(cursorProperties){
        if(!CONTEXT_BY_EXTENSION.has(this)) throw new ReferenceError(Base_ObjectBoundNotExist);
        CONTEXT_BY_EXTENSION.get(this).cursor.setProperties(cursorProperties);
        return this;
    }
    getCursorProperties(){
        if(!CONTEXT_BY_EXTENSION.has(this)) throw new ReferenceError(Base_ObjectBoundNotExist);
        return CONTEXT_BY_EXTENSION.get(this).cursor.getProperties();
    }
}
;// CONCATENATED MODULE: external "@minecraft/server"
var server_x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var server_y = x => () => x
const server_namespaceObject = server_x({ ["BlockPermutation"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.BlockPermutation, ["BlockStates"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.BlockStates, ["BlockTypes"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.BlockTypes, ["Player"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.Player, ["system"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.system, ["world"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.world });
;// CONCATENATED MODULE: ./src/dynamic-editor/native/Controls/Base.ts



const _hasOwn = Function.prototype.call.bind(Object.prototype.hasOwnProperty);
const NULL_TYPE = Symbol("NULL");
const OBJECT_TYPE = Symbol("SYMBOL_TYPE");
const ACTION_RETURNER = Symbol("ACTION_RETURNER");
const PROPERTY_PROXY_HANDLER = {
    getPrototypeOf(t) { return Object.prototype; },
    setPrototypeOf(t) { return false; },
    isExtensible(t) { return false; },
    preventExtensions(target) { return true; },
    //@ts-ignore
    ownKeys(t) { return Object.getOwnPropertyNames(t.propertyBag); },
    //@ts-ignore
    get(t, p) { return _hasOwn(t.propertyBag, p) ? t.getProperty(p) : Object.prototype[p]; },
    set(t, p, n) { t.setProperty(p, n); return true; },
    //@ts-ignore
    has(t, p) { return _hasOwn(t.propertyBag, p); },
    deleteProperty() { return false; },
    defineProperty() { return false; },
    //@ts-ignore
    getOwnPropertyDescriptor(t, p) { return _hasOwn(t.propertyBag, p) ? { configurable: false, enumerable: true, writable: false, value: t.getProperty(p) } : undefined; }
};
const PROPERTY_VALUE_PROXY_HANDLER = {
    getPrototypeOf(t) { return Object.prototype; },
    setPrototypeOf(t) { return false; },
    isExtensible(t) { return false; },
    preventExtensions(target) { return true; },
    //@ts-ignore
    ownKeys(t) { return Object.getOwnPropertyNames(t.propertyBag); },
    //@ts-ignore
    get(t, p) { return _hasOwn(t.propertyBag, p) ? t.getPropertyValue(p) : Object.prototype[p]; },
    set(t, p, n) { t.setPropertyValue(p, n); return true; },
    //@ts-ignore
    has(t, p) { return _hasOwn(t.propertyBag, p); },
    deleteProperty() { return false; },
    defineProperty() { return false; },
    //@ts-ignore
    getOwnPropertyDescriptor(t, p) { return _hasOwn(t.propertyBag, p) ? { configurable: false, enumerable: true, writable: false, value: t.getPropertyValue(p) } : undefined; }
};
class Property {
    onValueChange = new ValueChangeEvent;
    /**@deprecated @private Be care full this assignment doesn't update the property*/
    _onValueChange = new PublicEvent();
    /**@deprecated Be care full this assignment doesn't update the property*/
    value;
    constructedWith;
    constructor(n) { this.value = n; this.constructedWith = new.target; }
    ;
    isValidType(v) { return true; }
    static canAssign(p) { return p instanceof this; }
    ;
    setValue(value) {
        if (!this.isValidType(value))
            throw new TypeError("Invalid value type: '" + value + "'");
        const a = new ValueChangeEventData(this.value, value);
        TriggerEvent(this.onValueChange, a);
        if (value !== a.newValue && !this.isValidType(a.newValue))
            throw new TypeError("Invalid value type: '" + value + "'");
        this.value = a.newValue;
        TriggerEvent(this._onValueChange, a);
        return this;
    }
    addOnValueChangeHandler(a) {
        this.onValueChange.subscribe(a);
        return this;
    }
    removeOnValueChangeHandler(a) {
        this.onValueChange.unsubscribe(a);
        return this;
    }
}
class ElementProperty extends Property {
    createPropertyBinder(elemetPropertySetter, converter, updateValue = false) {
        this._onValueChange.subscribe(e => elemetPropertySetter.setValue(converter?.(e.newValue, this, elemetPropertySetter) ?? e.newValue));
        if (updateValue)
            elemetPropertySetter.setValue(converter?.(this.value, this, elemetPropertySetter) ?? this.value);
        return elemetPropertySetter;
    }
    getValue() { return this.value; }
    toJSON() { return this.getValue(); }
    valueOf() { return this.getValue(); }
}
class BindedSource {
    targetElement;
    targetPropertyName;
    sourceElement;
    sourcePropertyName;
    method;
    constructor(targetElement, targetPropertyName, sourceElement, sourcePropertyName, method) {
        this.method = method;
        this.targetElement = targetElement;
        this.targetPropertyName = targetPropertyName;
        this.sourceElement = sourceElement;
        this.sourcePropertyName = sourcePropertyName;
    }
}
class Element extends Displayable {
    static BindProperty(sourceElement, sourcePropertyName, targetElement, targetPropertyName, convertor) {
        const method = sourceElement.onPropertyValueChange.subscribe(({ newValue, propertyName }) => {
            if (propertyName === sourcePropertyName)
                targetElement.setPropertyValue(targetPropertyName, convertor?.(newValue) ?? newValue);
        });
        return new BindedSource(targetElement, targetPropertyName, sourceElement, sourcePropertyName, method);
    }
    static UnbindProperty(bindedSource) {
        bindedSource.sourceElement.onPropertyValueChange.unsubscribe(bindedSource.method);
        return null;
    }
    [UNIQUE_SYMBOL](d) { return d.openCreateUnique(this, "control-"); }
    onPropertyValueChange = new PropertyValueChangeEvent;
    _proxyProperties;
    _proxyValues;
    propertyBag;
    _isFakes;
    _isChanging = false;
    _methods;
    constructor(properties) {
        super(ServerUXEventPacket);
        this._methods = new WeakMap();
        this._isFakes = new Map();
        const bag = {};
        for (const propertyName of Object.getOwnPropertyNames(properties)) {
            const { property, isFake, construct } = properties[propertyName];
            bag[propertyName] = { property, construct: construct ?? property.constructor };
            this._isFakes.set(propertyName, isFake ?? false);
            const method = property._onValueChange.subscribe(e => this._TriggerPropertyChange(this, e.newValue, propertyName, e.oldValue, property));
            this._methods.set(property, method);
        }
        this.propertyBag = bag;
        this._proxyProperties = new Proxy(this, PROPERTY_PROXY_HANDLER);
        this._proxyValues = new Proxy(this, PROPERTY_VALUE_PROXY_HANDLER);
    }
    //@ts-ignore
    get proxyProperties() { return this._proxyProperties; }
    //@ts-ignore
    get proxyValues() { return this._proxyValues; }
    getPropertyNames() {
        return [...Object.getOwnPropertyNames(this.propertyBag)];
    }
    hasProperty(propertyName) { return propertyName in this.propertyBag; }
    getProperty(propertyName) { return this.propertyBag[propertyName].property; }
    getPropertyValue(propertyName) { return this.propertyBag[propertyName].property.getValue(); }
    setProperty(propertyName, property) {
        if (!this.hasProperty(propertyName))
            throw new ReferenceError("Unknow property: " + propertyName);
        const p = this.propertyBag[propertyName];
        const prop = p.property;
        if (!p.construct.canAssign(property))
            throw new TypeError("Can't assign '" + property.constructor.name + "' type to type of '" + p.construct.name + "'");
        prop._onValueChange.unsubscribe(this._methods.get(prop));
        this._methods.delete(prop);
        if (!this._methods.has(property)) {
            const method = property._onValueChange.subscribe(e => this._TriggerPropertyChange(this, e.newValue, propertyName, e.oldValue, property));
            this._methods.set(property, method);
        }
        p.property = property;
        if (prop.value !== property.value) {
            this._TriggerPropertyChange(this, property.value, propertyName, prop.value, property);
        }
        return this;
    }
    setProperties(propertyRecord) {
        for (const k of Object.getOwnPropertyNames(propertyRecord))
            if (this.hasProperty(k) && propertyRecord[k])
                this.setProperty(k, propertyRecord[k]);
        return this;
    }
    getProperties() { return { ...this.proxyProperties }; }
    setPropertyValue(propertyName, value) {
        this.propertyBag[propertyName].property.setValue(value);
        return this;
    }
    getMainPacketData(flags, packets) {
        const data = super.getMainPacketData(flags, packets);
        for (const key of this.getPropertyNames())
            if (!this._isFakes.get(key))
                data[key] = this.propertyBag[key].property.getValue();
        return data;
    }
    _TriggerPropertyChange(el, nV, pN, oV, p) {
        const baseChanging = this._isChanging;
        this._isChanging = true;
        TriggerEvent(this.onPropertyValueChange, new PropertyValueChangeEventData(this, pN, p, oV, nV));
        this._isChanging = baseChanging;
        if (!this._isChanging)
            TriggerEvent(this.onUpdate, this, UPDATE_FLAG);
    }
    _setPropertyRealness(key, isReal) {
        this._isFakes.set(key, !isReal);
        return this;
    }
    _getPropertyRealness(key) {
        return !this._isFakes.get(key);
    }
    _isPropertyReal(key) {
        return this._isFakes.get(key) !== true;
    }
}

;// CONCATENATED MODULE: ./src/dynamic-editor/native/Controls/General.ts



class TypeOfProperty extends ElementProperty {
    static _typeof = typeof undefined;
    isValidType(v) {
        //@ts-ignore
        return typeof v === this.constructedWith._typeof;
    }
}
class StringProperty extends TypeOfProperty {
    static _typeof = typeof "";
    constructor(v) { super((v ?? "")); }
}
class NumberProperty extends TypeOfProperty {
    static _typeof = typeof 0;
    constructor(v) { super((v ?? 0)); }
}
class BooleanProperty extends TypeOfProperty {
    static _typeof = typeof false;
    constructor(v) { super((v ?? false)); }
}
class RenderingElement extends Element {
    constructor(properties) {
        //@ts-ignore
        super({
            visible: { property: new BooleanProperty(true) },
            ...properties
        });
    }
    get isVisible() { return this.getPropertyValue("visible") ?? false; }
    set isVisible(v) { this.setPropertyValue("visible", v); }
    setVisibility(visible) {
        this.setPropertyValue("visible", visible);
        return this;
    }
}
class ModingElement extends RenderingElement {
    constructor(properties) {
        //@ts-ignore
        super({
            enable: { property: new BooleanProperty(true) },
            ...properties
        });
    }
    get isEnabled() { return this.getPropertyValue("enable") ?? false; }
    set isEnabled(v) { this.setPropertyValue("enable", v); }
    setEnable(enable) {
        this.setPropertyValue("enable", enable);
        return this;
    }
}
class ModedElement extends RenderingElement {
    constructor(properties) {
        //@ts-ignore
        super({
            enabled: { property: new BooleanProperty(true) },
            ...properties
        });
    }
    get isEnabled() { return this.getPropertyValue("enabled") ?? false; }
    set isEnabled(v) { this.setPropertyValue("enabled", v); }
    setEnable(enable) {
        this.setPropertyValue("enabled", enable);
        return this;
    }
}
class ActionBasedEvent extends Displayable {
    constructor(contextId) {
        super(ServerUXEventPacket);
        this._context = contextId;
    }
    _context;
    _actions = new Map();
    _subUpdate(a) {
        TriggerEvent(this.onUpdate, a, INIT_FLAG);
        TriggerEvent(this.onUpdate, this, UPDATE_FLAG);
    }
    _unsubUpdate(a) {
        TriggerEvent(this.onUpdate, this, UPDATE_FLAG);
        TriggerEvent(this.onUpdate, a, REMOVE_FLAG);
    }
    /**@deprecated Internal method */
    *displayInitPackets() {
        for (const { action } of this._actions.values())
            yield* action.displayInitPackets();
    }
    /**@deprecated Internal method */
    *displayDisposePackets() {
        for (const { action } of this._actions.values())
            yield* action.displayDisposePackets();
    }
}

;// CONCATENATED MODULE: ./src/dynamic-editor/core.ts


;// CONCATENATED MODULE: ./src/dynamic-editor/native/Controls/Properties.ts



class StatusBarAlignmentProperty extends NumberProperty {
    constructor(alignment) { super(alignment ?? StatusBarItemAlignment.Right); }
    isValidType(v) { return v in StatusBarItemAlignment; }
}
class ButtonVariantProperty extends StringProperty {
    static defaultValue = ButtonVariant.primary;
    constructor(variant) { super(variant ?? ButtonVariant.primary); }
    isValidType(v) { return v in ButtonVariant; }
}
class Vector3Property extends ElementProperty {
    constructor(def) {
        super(def ?? { x: 0, y: 0, z: 0 });
    }
    isValidType(v) {
        return typeof v.x === "number" && typeof v.y === "number" && typeof v.z === "number";
    }
}
class ArrayProperty extends ElementProperty {
    constructor(array) {
        super(array ?? []);
    }
    isValidType(v) {
        return Array.isArray(v);
    }
}
class DropdownItemsMapingProperty extends ArrayProperty {
    constructor(array) {
        super(array ?? []);
    }
}

;// CONCATENATED MODULE: ./src/dynamic-editor/native/Editor/EditorActions.ts



class Action extends UniquePostable {
    packetConstructor = ServerActionEventPacket;
    [UNIQUE_SYMBOL](d) {
        return d.addReverses(this, "action-");
    }
    PACKET_TYPES = {
        [UPDATE_FLAG]: ServerActionEventType.CreateAction,
        [INIT_FLAG]: ServerActionEventType.CreateAction,
        [REMOVE_FLAG]: ServerActionEventType.ReleaseAction,
    };
    actionType;
    onActionExecute = new PublicEvent;
    constructor(type) {
        super();
        this.actionType = type;
    }
    get [ACTION_RETURNER]() { return this; }
    ;
    getMainPacketData(flags, packets) {
        const data = super.getMainPacketData(flags, packets);
        data.actionType = this.actionType;
        return data;
    }
    execute(payload) {
        TriggerEvent(this.onActionExecute, payload);
    }
    *displayInitPackets() { yield* super.getPackets(INIT_FLAG); }
    *displayDisposePackets() { yield* super.getPackets(REMOVE_FLAG); }
    *displayUpdatePackets() { yield* super.getPackets(UPDATE_FLAG); }
}
class ControlBindedAction extends Action {
    control;
    constructor(control) {
        super(ActionType.NoArgsAction);
        this.control = control;
    }
    *displayInitPackets() {
        yield* super.displayInitPackets();
        yield PacketBuilder.BindActionToControl(this, this.control);
    }
    *displayDisposePackets() {
        yield PacketBuilder.UnbindActionToControl(this, this.control);
        yield* super.displayDisposePackets();
    }
}
class KeyInputAction extends Action {
    context;
    button;
    inputModifier;
    constructor(context, button, inputModifier) {
        super(ActionType.NoArgsAction);
        this.context = context;
        this.button = button;
        this.inputModifier = inputModifier;
    }
    *displayInitPackets() {
        yield* super.displayInitPackets();
        yield PacketBuilder.BindKeyInputActionToContext(this, this.context, this.button, this.inputModifier);
    }
    *displayDisposePackets() {
        yield PacketBuilder.UnbindInputActionToContext(this, this.context);
        yield* super.displayDisposePackets();
    }
}
class MouseInputAction extends Action {
    context;
    mouseAction;
    constructor(context, mouseAction) {
        super(ActionType.MouseRayCastAction);
        this.context = context;
        this.mouseAction = mouseAction;
    }
    *displayInitPackets() {
        yield* super.displayInitPackets();
        yield PacketBuilder.BindMouseInputActionToContext(this, this.context, this.mouseAction);
    }
    *displayDisposePackets() {
        yield PacketBuilder.UnbindInputActionToContext(this, this.context);
        yield* super.displayDisposePackets();
    }
}
class PayloadLoader {
    type;
    player;
    dimension;
    constructor(player, data) {
        this.player = player;
        this.dimension = player.dimension;
        this.type = data.type;
    }
}
class NoArgsPayload extends PayloadLoader {
}
class MouseRayCastPayload extends PayloadLoader {
    location;
    direction;
    blockLocation;
    rayHit;
    actionType;
    hasCtrlModifier;
    hasAltModifier;
    hasShiftModifier;
    inputType;
    get block() { return this.dimension.getBlock(this.blockLocation); }
    constructor(player, data) {
        super(player, data);
        const { location, direction, cursorBlockLocation, rayHit } = data.mouseRay;
        const { mouseAction, modifiers: { alt, ctrl, shift }, inputType } = data.mouseProps;
        this.location = location;
        this.direction = direction;
        this.blockLocation = cursorBlockLocation;
        this.rayHit = rayHit;
        this.hasCtrlModifier = ctrl;
        this.hasAltModifier = alt;
        this.hasShiftModifier = shift;
        this.actionType = mouseAction;
        this.inputType = inputType;
    }
}
const PayloadLoaders = new Map();
PayloadLoaders.set(ActionType.NoArgsAction, NoArgsPayload);
PayloadLoaders.set(ActionType.MouseRayCastAction, MouseRayCastPayload);

;// CONCATENATED MODULE: ./src/dynamic-editor/native/Controls/Actions.ts



class KeyInputActionsEvent extends ActionBasedEvent {
    constructor(conextId) { super(conextId); }
    subscribe(m, keyButton, inputModifier = InputModifier.Any) {
        if (this._actions.has(m))
            return m;
        const action = new KeyInputAction(this._context, keyButton, inputModifier);
        const mA = action.onActionExecute.subscribe((payload) => {
            m(payload, keyButton, inputModifier);
        });
        this._actions.set(m, { action, ma: mA });
        super._subUpdate(action);
        return m;
    }
    unsubscribe(m) {
        if (!this._actions.has(m))
            return m;
        const { action, ma } = this._actions.get(m);
        action.onActionExecute.unsubscribe(ma);
        this._actions.delete(m);
        super._unsubUpdate(action);
        return m;
    }
}
class MouseInputActionsEvent extends ActionBasedEvent {
    constructor(conextId) { super(conextId); }
    subscribe(m, mouseAction) {
        if (this._actions.has(m))
            return m;
        const action = new MouseInputAction(this._context, mouseAction);
        const mA = action.onActionExecute.subscribe((payload) => {
            m(payload);
        });
        this._actions.set(m, { action, ma: mA });
        super._subUpdate(action);
        return m;
    }
    unsubscribe(m) {
        if (!this._actions.has(m))
            return m;
        const { action, ma } = this._actions.get(m);
        action.onActionExecute.unsubscribe(ma);
        this._actions.delete(m);
        super._unsubUpdate(action);
        return m;
    }
}
class MouseClickEvent extends MouseInputActionsEvent {
    subscribe(m) {
        return super.subscribe(m, MouseAction.ButtonClick);
    }
}
class MouseDragEvent extends MouseInputActionsEvent {
    subscribe(m) {
        return super.subscribe(m, MouseAction.Drag);
    }
}
class MouseWheelEvent extends MouseInputActionsEvent {
    subscribe(m) {
        return super.subscribe(m, MouseAction.Wheel);
    }
}

;// CONCATENATED MODULE: ./src/dynamic-editor/native/Controls/Elements.ts







class StatusBarItem extends ModedElement {
    PACKET_TYPES = {
        [UPDATE_FLAG]: ServerUXEventType.UpdateStatusBarItem,
        [REMOVE_FLAG]: ServerUXEventType.ReleaseStatusBarItem,
        [INIT_FLAG]: ServerUXEventType.UpdateStatusBarItem
    };
    constructor(content) {
        super({
            alignment: { property: new StatusBarAlignmentProperty(0) },
            text: { property: new StringProperty(content ?? "") },
            size: { property: new NumberProperty(0) }
        });
    }
    get alignment() { return this.getPropertyValue("alignment") ?? StatusBarItemAlignment.Right; }
    set alignment(v) { this.setPropertyValue("alignment", v); }
    get content() { return this.getPropertyValue("text") ?? ""; }
    set content(v) { this.setPropertyValue("text", v); }
    get size() { return this.getPropertyValue("size") ?? 0; }
    set size(v) { this.setPropertyValue("size", v); }
    setContent(text) {
        this.setPropertyValue("text", text);
        return this;
    }
    setSize(size) {
        this.setPropertyValue("size", size);
        return this;
    }
    setAlignment(alignment) {
        this.setPropertyValue("alignment", alignment);
        return this;
    }
}
class MenuItem extends ModedElement {
    /**@private*/
    _parent = undefined;
    PACKET_TYPES = {
        [UPDATE_FLAG]: ServerUXEventType.UpdateItemMenu,
        [REMOVE_FLAG]: ServerUXEventType.ReleaseItemMenu,
        [INIT_FLAG]: ServerUXEventType.UpdateItemMenu
    };
    constructor(properties, content) {
        const sameProperty = { property: new StringProperty("") };
        super({
            name: sameProperty,
            displayStringLocId: sameProperty,
            ...properties
        });
        this.setContent(content);
    }
    get content() { return this.getPropertyValue("name") ?? ""; }
    set content(v) { this.setPropertyValue("name", v); }
    setContent(displayText) {
        this.setPropertyValue("name", displayText);
        return this;
    }
    /**@deprecated Internal method */
    getMainPacketData(flags, packets) {
        const object = super.getMainPacketData(flags, packets);
        if (typeof this._parent === "object")
            object.parentId = this._parent;
        object.shortcut = ""; //unknown usage from vanilla editor
        return object;
    }
}
class MenuActionItem extends MenuItem {
    _action = new ControlBindedAction(this);
    onActionExecute;
    _triggers = new Set;
    constructor(content = "") {
        super({
            checked: { property: new BooleanProperty(false), isFake: true }
        }, content);
        this.onActionExecute = this._action.onActionExecute;
    }
    get [ACTION_RETURNER]() { return this._action; }
    get checkmarkEnabled() { return this._getPropertyRealness("checked"); }
    set checkmarkEnabled(v) { this.setCheckmarkEnabled(v); }
    get checked() { return this.getPropertyValue("checked") ?? false; }
    set checked(v) { this.setPropertyValue("checked", v); }
    setChecked(isChecked) {
        this.setPropertyValue("checked", isChecked);
        return this;
    }
    setCheckmarkEnabled(enabled) {
        if (enabled === this._isPropertyReal("checked"))
            return this;
        this._setPropertyRealness("checked", enabled);
        if (!this._isChanging)
            TriggerEvent(this.onUpdate, this, UPDATE_FLAG);
        return this;
    }
    addActionHandler(handler) {
        this.onActionExecute.subscribe(handler);
        return this;
    }
    addKeyboardTrigger(keyButton, modifier = InputModifier.Any) {
        this._triggers.add({ keyButton, modifier });
        TriggerEvent(this.onUpdate, new FakeUpdatable(PacketBuilder.BindKeyInputActionToContext(this._action, EditorInputContext.GlobalToolMode, keyButton, modifier)), INIT_FLAG);
        return this;
    }
    clearKeyboardTriggers() {
        TriggerEvent(this.onUpdate, new FakeUpdatable(PacketBuilder.UnbindInputActionToContext(this._action, EditorInputContext.GlobalToolMode)), REMOVE_FLAG);
        this._triggers.clear();
        return this;
    }
    *displayInitPackets() {
        yield* super.displayInitPackets();
        yield* this._action.displayInitPackets();
        for (const { keyButton, modifier } of this._triggers)
            yield PacketBuilder.BindKeyInputActionToContext(this._action, EditorInputContext.GlobalToolMode, keyButton, modifier);
    }
    *displayDisposePackets() {
        yield* this._action.displayDisposePackets();
        yield* super.displayDisposePackets();
    }
}
class MenuOptionsItem extends MenuItem {
    constructor(content = "") { super({}, content); }
    _handlers = new Map;
    get elementsLength() { return this._handlers.size; }
    addMenuItem(item) {
        if (item._parent === this)
            return this;
        if (item._parent !== undefined)
            throw new Error("This menu item is already assigned to MenuBar or a MenuBarOptions");
        item._parent = this;
        this._handlers.set(item, item.onUpdate.subscribe((...a) => TriggerEvent(this.onUpdate, ...a)));
        TriggerEvent(this.onUpdate, this, UPDATE_FLAG);
        TriggerEvent(this.onUpdate, item, INIT_FLAG);
        return this;
    }
    removeMenuItem(item) {
        if (item._parent !== this)
            throw new Error("This menu item is not one of this menu options.");
        item._parent = undefined;
        item.onUpdate.unsubscribe(this._handlers.get(item));
        this._handlers.delete(item);
        TriggerEvent(this.onUpdate, this, UPDATE_FLAG);
        TriggerEvent(this.onUpdate, item, REMOVE_FLAG);
        return this;
    }
    *getMenuItems() { for (const e of this._handlers.keys())
        yield e; }
    hasMenuItem(item) { return this._handlers.has(item); }
    /**@deprecated Internal method */
    *displayInitPackets() {
        yield* super.displayInitPackets();
        for (const a of this._handlers.keys())
            yield* a.displayInitPackets();
    }
    /**@deprecated Internal method */
    *displayDisposePackets() {
        yield* super.displayDisposePackets();
        for (const a of this._handlers.keys())
            yield* a.displayDisposePackets();
    }
}
const TOOL_OBJECT_TYPE = Symbol("Tool");
class Tool extends ModedElement {
    packetConstructor = ServerUXEventPacket;
    _propertyBindings = new WeakMap();
    _isActive = false;
    PACKET_TYPES = {
        [INIT_FLAG]: ServerUXEventType.CreateTool,
        [UPDATE_FLAG]: ServerUXEventType.CreateTool,
        [REMOVE_FLAG]: ServerUXEventType.ReleaseTool
    };
    [UNIQUE_SYMBOL](d) { return d.addReverses(this, "tool-"); }
    [OBJECT_TYPE] = TOOL_OBJECT_TYPE;
    onActivationStateChange = new PublicEvent;
    onMouseDrag = new MouseDragEvent(this);
    onMouseClick = new MouseClickEvent(this);
    onMouseWheel = new MouseWheelEvent(this);
    onKeyboardKeyPress = new KeyInputActionsEvent(this);
    isActivePropertyGetter = new BooleanProperty(false);
    constructor(icon, title, description) {
        const tSP = new StringProperty(title ?? "");
        const dSP = new StringProperty(description ?? "");
        super({
            icon: { property: new StringProperty(icon ?? "") },
            descriptionString: { property: dSP, isFake: true },
            descriptionStringLocId: { property: dSP, isFake: true },
            titleString: { property: tSP, isFake: true },
            titleStringLocId: { property: tSP, isFake: true },
        });
        this.onActivationStateChange.subscribe(e => {
            this._isActive = e.isSelected;
            (e.isSelected != this.isActivePropertyGetter.getValue()) ? this.isActivePropertyGetter.setValue(e.isSelected) : null;
        });
        this.onMouseClick.onUpdate.subscribe((...p) => TriggerEvent(this.onUpdate, ...p));
        this.onMouseDrag.onUpdate.subscribe((...p) => TriggerEvent(this.onUpdate, ...p));
        this.onMouseWheel.onUpdate.subscribe((...p) => TriggerEvent(this.onUpdate, ...p));
        this.onKeyboardKeyPress.onUpdate.subscribe((...p) => TriggerEvent(this.onUpdate, ...p));
    }
    get icon() { return this.getPropertyValue("icon") ?? ""; }
    set icon(v) { this.setPropertyValue("icon", v); }
    get title() { return this.getPropertyValue("titleString") ?? ""; }
    set title(v) { this.setPropertyValue("titleString", v); }
    get description() { return this.getPropertyValue("descriptionString") ?? ""; }
    set description(v) { this.setPropertyValue("descriptionString", v); }
    get isActivated() { return this._isActive; }
    setIcon(icon) {
        this.setPropertyValue("icon", icon);
        return this;
    }
    /**@author ConMaster2112 */
    setTitle(text) {
        this.setPropertyValue("titleString", text);
        return this;
    }
    /**@deprecated This state of tool doesn't really do anything, but maybe in future its going to do.*/
    setEnable(enable) {
        return super.setEnable(enable);
    }
    /**@deprecated This state of tool doesn't really do anything, but maybe in future its going to do.*/
    setVisibility(visible) {
        return super.setVisibility(visible);
    }
    setDescription(text) {
        this.setPropertyValue("descriptionString", text);
        return this;
    }
    bindVisibleElements(...elements) {
        for (const pane of elements) {
            if (this._propertyBindings.has(pane))
                continue;
            const method = this.isActivePropertyGetter.onValueChange.subscribe(e => {
                pane.setPropertyValue("visible", e.newValue);
            });
            pane.setPropertyValue("visible", this.isActivated);
            this._propertyBindings.set(pane, method);
        }
        return this;
    }
    unbindVisibleElements(...elements) {
        for (const pane of elements) {
            if (!this._propertyBindings.has(pane))
                continue;
            const method = this._propertyBindings.get(pane);
            this.isActivePropertyGetter.onValueChange.unsubscribe(method);
            this._propertyBindings.delete(pane);
        }
        return this;
    }
    /**@deprecated Internal method */
    getMainPacketData(flags, packets) {
        const data = super.getMainPacketData(flags, packets);
        data.tooltipData = {
            descriptionString: this.propertyBag["descriptionString"],
            descriptionStringLocId: this.propertyBag["descriptionStringLocId"],
            titleString: this.propertyBag["titleString"],
            titleStringLocId: this.propertyBag["titleStringLocId"]
        };
        return data;
    }
    /**@deprecated Internal method */
    *displayInitPackets() {
        yield* super.displayInitPackets();
        yield* this.onMouseClick.displayInitPackets();
        yield* this.onMouseDrag.displayInitPackets();
        yield* this.onMouseWheel.displayInitPackets();
        yield* this.onKeyboardKeyPress.displayInitPackets();
    }
    /**@deprecated Internal method */
    *displayDisposePackets() {
        yield* this.onKeyboardKeyPress.displayDisposePackets();
        yield* this.onMouseWheel.displayInitPackets();
        yield* this.onMouseDrag.displayInitPackets();
        yield* this.onMouseClick.displayInitPackets();
        yield* super.displayDisposePackets();
    }
}

;// CONCATENATED MODULE: ./src/dynamic-editor/native/Controls/Panes.ts







class PaneElement extends ModingElement {
    PACKET_TYPES = {
        [REMOVE_FLAG]: ServerUXEventType.ReleasePaneControl,
        [INIT_FLAG]: ServerUXEventType.UpdatePaneControl,
        [UPDATE_FLAG]: ServerUXEventType.UpdatePaneControl
    };
    _paneId;
    _lastPaneId;
    get paneId() { return this._paneId; }
    ;
    set paneId(v) { this._paneId = v; }
    ;
    get lastPaneId() { return this._lastPaneId; }
    ;
    set lastPaneId(v) { this._lastPaneId = v; }
    ;
    typeName;
    propertyItemOptions;
    constructor(properties, typeName) {
        super(properties);
        this.typeName = typeName;
    }
    getMainPacketDataItemOptions(flags, packets) {
        return {};
    }
    getMainPacketData(flags, packets) {
        const data = super.getMainPacketData(flags, packets);
        data.paneId = flags === REMOVE_FLAG ? this.lastPaneId : this.paneId;
        this._lastPaneId = undefined;
        data.property = "";
        data.typeName = this.typeName;
        data.propertyItemOptions = this.getMainPacketDataItemOptions(flags, packets);
        return data;
    }
    getSelfElement() { return this; }
}
class ContentPaneElement extends PaneElement {
    constructor(properties, typeName) {
        const a = new StringProperty("");
        super({
            titleAltText: { property: a, isFake: true },
            titleStringId: { property: a, isFake: true },
            ...properties
        }, typeName);
        this.typeName = typeName;
    }
    get title() { return this.getPropertyValue("titleAltText") ?? ""; }
    set title(v) { this.setPropertyValue("titleAltText", (v ?? "")); }
    setTitle(title) {
        this.setPropertyValue("titleAltText", (title ?? ""));
        return this;
    }
    getMainPacketDataItemOptions(flags, packets) {
        const data = super.getMainPacketDataItemOptions(flags, packets);
        data.titleAltText = this.propertyBag["titleAltText"].property.value;
        data.titleStringId = this.propertyBag["titleStringId"].property.value;
        return data;
    }
}
class ValuePaneElement extends ContentPaneElement {
    constructor(properties, typeName) {
        super({
            ...properties
        }, typeName);
        this.typeName = typeName;
    }
    _propertyKey = "p-" + UUID.generate();
    onUserInputValue = new ValueChangeEvent;
    get value() { return this.getPropertyValue("value"); }
    set value(v) { this.setPropertyValue("value", v); }
    setValue(value) {
        this.setPropertyValue("value", value);
        return this;
    }
    getValueProperty() { return this.getProperty("value"); }
    getMainPacketData(flags, packets) {
        const data = super.getMainPacketData(flags, packets);
        data.property = this._propertyKey;
        return data;
    }
    _setValue(newValue) {
        const p = this.getProperty("value");
        const a = new ValueChangeEventData(p.value, newValue);
        TriggerEvent(this.onUserInputValue, a);
        if (!p.isValidType(a.newValue))
            throw console.warn("Invalid maped value.", new Error().stack);
        //newValue not p.newValue, if you modify a value you have to update its view so keep a newValue as comparator
        if (newValue !== p.value)
            p.setValue(newValue);
    }
}
class SubPaneElement extends PaneElement {
    pane;
    constructor(pane) {
        //@ts-ignore
        if (pane._parentPane)
            throw new ReferenceError("This Pane is already handled");
        super({}, InternalPaneElementTypes.SubPane);
        this.pane = pane;
        //@ts-ignore
        this.onUpdate = pane.onUpdate;
    }
    //@ts-ignore
    get paneId() { return this.pane._parentPane; }
    //@ts-ignore
    set paneId(v) { this.pane._parentPane = v; }
    //@ts-ignore
    get lastPaneId() { return this.pane._lastPaneId; }
    //@ts-ignore
    set lastPaneId(v) { this.pane._lastPaneId = v; }
    getMainPacketDataItemOptions(flags, packets) {
        return {
            //@ts-ignore
            pane: this.pane.getMainPacketData(flags, packets)
        };
    }
}
class EditorPane extends RenderingElement {
    PACKET_TYPES = {
        [REMOVE_FLAG]: ServerUXEventType.ReleasePropertyPane,
        [INIT_FLAG]: ServerUXEventType.UpdatePropertyPane,
        [UPDATE_FLAG]: ServerUXEventType.UpdatePropertyPane
    };
    [UNIQUE_SYMBOL](d) { return d.addReverses(this, "pane-"); }
    _parentPane;
    _paneElementHandler = new Map();
    _properties = new Map();
    _currentElement;
    get elementCount() { return this._paneElementHandler.size; }
    constructor(title) {
        super({
            collapsed: { property: new BooleanProperty(false) },
            titleAltText: { property: new StringProperty(title ?? "") },
            width: { property: new NumberProperty(30.05) }
        });
        //@ts-ignore
        this._currentElement = new SubPaneElement(this);
    }
    get width() { return this.getPropertyValue("width") ?? 0; }
    set width(v) { this.setPropertyValue("width", (v ?? 50)); }
    setWidth(n) {
        this.setPropertyValue("width", n);
        return this;
    }
    get title() { return this.getPropertyValue("titleAltText") ?? ""; }
    set title(v) { this.setPropertyValue("titleAltText", (v ?? "")); }
    setTitle(title) {
        this.setPropertyValue("titleAltText", (title ?? ""));
        return this;
    }
    get isCollapsed() { return this.getPropertyValue("collapsed") ?? false; }
    set isCollapsed(v) { this.setPropertyValue("collapsed", (v ?? "")); }
    setCollapsed(isCollapsed) {
        this.setPropertyValue("collapsed", (isCollapsed ?? false));
        return this;
    }
    getElements() { return this._paneElementHandler.keys(); }
    addElement(e) {
        if (this._paneElementHandler.has(e))
            return this;
        if (typeof e.getSelfElement !== "function")
            throw new TypeError("getSelfElement must be a function.");
        const element = e.getSelfElement();
        if (!(element instanceof PaneElement))
            throw new TypeError("returned element is not instance of PaneElement.");
        //@ts-ignore
        if (element.paneId === this)
            return this;
        //@ts-ignore
        if (typeof element.paneId === "object")
            throw new TypeError("This element is owned but different pane");
        const method = element.onUpdate.subscribe((...e) => TriggerEvent(this.onUpdate, ...e));
        TriggerEvent(this.onUpdate, element, INIT_FLAG);
        const prop = element._propertyKey;
        if (prop)
            this._properties.set(prop, element);
        this._paneElementHandler.set(e, { element, method, prop });
        //@ts-ignore
        element.paneId = this;
        return this;
    }
    addElements(...elements) {
        for (const e of elements)
            this.addElement(e);
        return this;
    }
    removeElement(e) {
        if (!this._paneElementHandler.has(e))
            return false;
        const { element, method, prop } = this._paneElementHandler.get(e);
        if (prop)
            this._properties.delete(prop);
        element.onUpdate.unsubscribe(method);
        TriggerEvent(this.onUpdate, element, REMOVE_FLAG);
        this._paneElementHandler.delete(e);
        //@ts-ignore
        element.paneId = undefined;
        element.lastPaneId = this;
        return true;
    }
    getMainPacketData(flags, packets) {
        const data = super.getMainPacketData(flags, packets);
        if (flags === INIT_FLAG)
            data.propertyItems = this._getPropertyItems(INIT_FLAG, packets);
        if (flags === REMOVE_FLAG) {
            //@ts-ignore
            data.parentPaneId = this._lastPaneId;
            //@ts-ignore
            delete this._lastPaneId;
        }
        else if (this._parentPane)
            data.parentPaneId = this._parentPane;
        return data;
    }
    _getPropertyItems(flag, packets) {
        const array = [];
        for (const { element } of this._paneElementHandler.values())
            //@ts-ignore
            array.push(element.getMainPacketData(flag, packets));
        return array;
    }
    getSelfElement() { return this._currentElement; }
}
class DividerPaneElement extends PaneElement {
    constructor() {
        super({}, InternalPaneElementTypes.Divider);
    }
}
class BooleanPaneElement extends ValuePaneElement {
    constructor(title) {
        super({
            value: { property: new BooleanProperty(false) }
        }, InternalPaneElementTypes.Boolean);
        this.setPropertyValue("titleAltText", title);
    }
}
class StringPaneElement extends ValuePaneElement {
    constructor(title) {
        super({
            value: { property: new StringProperty("") }
        }, InternalPaneElementTypes.String);
        this.setPropertyValue("titleAltText", title);
    }
}
class NumberPaneElement extends ValuePaneElement {
    constructor(title, showSlider = false) {
        super({
            value: { property: new NumberProperty(0) },
            max: { property: new NumberProperty(Number.MAX_SAFE_INTEGER), isFake: true },
            min: { property: new NumberProperty(Number.MIN_SAFE_INTEGER), isFake: true },
            showSlider: { property: new BooleanProperty(false), isFake: true }
        }, InternalPaneElementTypes.Number);
        this.setTitle(title);
        this.setShowSlider(showSlider);
    }
    setMaxValue(max) {
        this.setPropertyValue("max", max);
        return this;
    }
    setMinValue(max) {
        this.setPropertyValue("min", max);
        return this;
    }
    setMinMaxValues(min, max) {
        this.setMinValue(min);
        return this.setMaxValue(max);
    }
    setShowSlider(show) {
        this.setPropertyValue("showSlider", show);
        return this;
    }
    get maxValue() { return this.getPropertyValue("max") ?? Number.MAX_SAFE_INTEGER; }
    set maxValue(v) { this.setPropertyValue("max", v ?? Number.MAX_SAFE_INTEGER); }
    get minValue() { return this.getPropertyValue("min") ?? Number.MIN_SAFE_INTEGER; }
    set minValue(v) { this.setPropertyValue("min", v ?? Number.MIN_SAFE_INTEGER); }
    get showSlider() { return this.getPropertyValue("showSlider") ?? false; }
    set showSlider(v) { this.setPropertyValue("showSlider", v ?? false); }
    getMainPacketDataItemOptions(flags, packets) {
        const data = super.getMainPacketDataItemOptions(flags, packets);
        data.max = this.propertyBag["max"].property.value;
        data.min = this.propertyBag["min"].property.value;
        data.showSlider = this.propertyBag["showSlider"].property.value;
        return data;
    }
}
class ButtonPaneElement extends ContentPaneElement {
    _action = new Action(ActionType.NoArgsAction);
    onButtonClick = this._action.onActionExecute;
    constructor(label) {
        super({
            variant: { property: new ButtonVariantProperty(), isFake: true }
        }, InternalPaneElementTypes.Button);
        this.setPropertyValue("titleAltText", label);
    }
    getMainPacketDataItemOptions(flags, packets) {
        const data = super.getMainPacketDataItemOptions(flags, packets);
        data.variant = this.propertyBag["variant"].property.value;
        return data;
    }
    getMainPacketData(flags, packets) {
        if (flags === INIT_FLAG) {
            packets.push(...this._action.displayInitPackets());
            packets.push(PacketBuilder.BindActionToControl(this._action, this));
        }
        else if (flags === REMOVE_FLAG) {
            packets.push(PacketBuilder.UnbindActionToControl(this._action, this));
            packets.push(...this._action.displayDisposePackets());
        }
        return super.getMainPacketData(flags, packets);
    }
    addClickHandler(method) {
        this.onButtonClick.subscribe(method);
        return this;
    }
    removeClickHandler(method) {
        this.onButtonClick.unsubscribe(method);
        return this;
    }
}
class VectorPaneElement extends ValuePaneElement {
    constructor(title) {
        super({
            value: { property: new Vector3Property({ x: 0, y: 0, z: 0 }) },
            max: { property: new Vector3Property({ x: Number.MAX_SAFE_INTEGER, y: Number.MAX_SAFE_INTEGER, z: Number.MAX_SAFE_INTEGER }), isFake: true },
            min: { property: new Vector3Property({ x: Number.MIN_SAFE_INTEGER, y: Number.MIN_SAFE_INTEGER, z: Number.MIN_SAFE_INTEGER }), isFake: true },
        }, InternalPaneElementTypes.Vector3);
        this.setPropertyValue("titleAltText", title);
    }
    setMaxValue(max) {
        this.setPropertyValue("max", max);
        return this;
    }
    setMinValue(max) {
        this.setPropertyValue("min", max);
        return this;
    }
    get maxValue() { return this.getPropertyValue("max"); }
    set maxValue(v) { this.setPropertyValue("max", v); }
    get minValue() { return this.getPropertyValue("min"); }
    set minValue(v) { this.setPropertyValue("min", v); }
    getMainPacketDataItemOptions(flags, packets) {
        const data = super.getMainPacketDataItemOptions(flags, packets);
        const { x: maxX, y: maxY, z: maxZ } = this.propertyBag["max"].property.value;
        const { x: minX, y: minY, z: minZ } = this.propertyBag["min"].property.value;
        Object.assign(data, { maxX, maxY, maxZ, minX, minY, minZ });
        return data;
    }
}
class DropdownPaneElement extends ValuePaneElement {
    _options = [];
    _propertyGetter;
    constructor(title, array) {
        super({
            value: { property: new NumberProperty(0) },
            dropdownItems: { property: new DropdownItemsMapingProperty(), isFake: true }
        }, InternalPaneElementTypes.Dropdown);
        this.setPropertyValue("titleAltText", title);
        //@ts-ignore
        this._propertyGetter = new ElementProperty(undefined);
        this.onPropertyValueChange.subscribe(({ propertyName, newValue }) => { if (propertyName === "value")
            this._propertyGetter.setValue(this._options[newValue]); });
        this.setDropdownItems(array ?? []);
    }
    get selectedValue() { return this._options[this.value]; }
    get selectedValuePropertyGetter() { return this._propertyGetter; }
    setDropdownItems(array) {
        const { dropdownItems, options } = DropdownPaneElement.MapDropDownItems(array);
        this.setPropertyValue("dropdownItems", dropdownItems);
        if (this.value >= array.length)
            this.value = 0;
        this._options = options;
        return this;
    }
    static MapDropDownItems(array) {
        const options = new Array(array.length);
        const dropdownItems = [];
        for (let index = 0; index < array.length; index++) {
            const element = options[index] = array[index];
            dropdownItems.push({ displayAltText: "" + element, value: index });
        }
        return { dropdownItems, options };
    }
    getMainPacketDataItemOptions(flags, packets) {
        const data = super.getMainPacketDataItemOptions(flags, packets);
        data.dropdownItems = this.getPropertyValue("dropdownItems");
        if (data.dropdownItems.length < 1)
            delete data.dropdownItems;
        return data;
    }
}
class BlockPickerPaneElement extends ValuePaneElement {
    constructor(title) {
        super({
            value: { property: new StringProperty("stone") },
            allowedBlocks: { property: new ArrayProperty(["stone", "water", "dirt", "your_sos"]), isFake: true }
        }, InternalPaneElementTypes.BlockPicker);
        this.setPropertyValue("titleAltText", title);
    }
    getMainPacketDataItemOptions(flags, packets) {
        const data = super.getMainPacketDataItemOptions(flags, packets);
        data.allowedBlocks = this.getPropertyValue("allowedBlocks");
        return data;
    }
}

;// CONCATENATED MODULE: ./src/dynamic-editor/native/Controls/ToolView.ts





const VALID_ITEM = Symbol("VALID_ITEM");
const VALID_MENU_ITEM = Symbol("VALID_MENU_ITEM");
const VALID_STATUS_ITEM = Symbol("VALID_STATUS_ITEM");
const VALID_TOOL_ITEM = Symbol("VALID_TOOL_ITEM");
const VALID_PANE_ITEM = Symbol("VALID_PANE_ITEM");
//@ts-ignore
MenuItem.prototype[VALID_ITEM] = VALID_MENU_ITEM;
//@ts-ignore
StatusBarItem.prototype[VALID_ITEM] = VALID_STATUS_ITEM;
//@ts-ignore
Tool.prototype[VALID_ITEM] = VALID_TOOL_ITEM;
//@ts-ignore 
EditorPane.prototype[VALID_ITEM] = VALID_PANE_ITEM;
const KNOWN_TOOLS = new WeakSet();
class ToolView extends Displayable {
    PACKET_TYPES = {
        [UPDATE_FLAG]: ServerUXEventType.SetActiveTool,
        [REMOVE_FLAG]: ServerUXEventType.ReleaseToolRail,
        [INIT_FLAG]: ServerUXEventType.SetActiveTool
    };
    _MenuItemEvenHandler = new Map;
    _StatusItemEvenHandler = new Map;
    _ToolEvenHandler = new Map;
    _EditorPaneEvenHandler = new Map;
    _manager;
    _visible = true;
    _enabled = true;
    _activeTool = null;
    get registeredTools() { return this._ToolEvenHandler.size; }
    get registeredMenuItems() { return this._MenuItemEvenHandler.size; }
    get registeredStatusBarItems() { return this._StatusItemEvenHandler.size; }
    get registeredEditorPanes() { return this._EditorPaneEvenHandler.size; }
    constructor(manager) {
        if (!Base_core.isNativeCall)
            throw new ReferenceError(Base_NoConstructor + ToolView.name);
        super(ServerUXEventPacket);
        this._manager = manager;
        manager.context.display?.onToolAtivate.subscribe(({ tool }) => { console.warn("t"); this._activeTool = tool; });
    }
    _registry(item, map) {
        TriggerEvent(this.onUpdate, item, INIT_FLAG);
        const method = item.onUpdate.subscribe((...e) => TriggerEvent(this.onUpdate, ...e));
        map.set(item, method);
        return true;
    }
    _unregistry(item, map) {
        if (map.has(item)) {
            TriggerEvent(this.onUpdate, item, REMOVE_FLAG);
            item.onUpdate.unsubscribe(map.get(item));
            map.delete(item);
            return true;
        }
        ;
        return false;
    }
    addEditorPanes(...panes) {
        for (const p of panes)
            this.addEditorPane(p);
        return this;
    }
    addTools(...tools) {
        for (const p of tools)
            this.addTool(p);
        return this;
    }
    addMenuItems(...items) {
        for (const p of items)
            this.addMenuItem(p);
        return this;
    }
    addStatusBarItems(...items) {
        for (const p of items)
            this.addStatusBarItem(p);
        return this;
    }
    setActiveTool(item) {
        this._activeTool = item;
        TriggerEvent(this.onUpdate, this, UPDATE_FLAG);
    }
    getActiveTool() {
        return this._activeTool;
    }
    addMenuItem(item) {
        if (this._MenuItemEvenHandler.has(item))
            return true;
        if (item?.[VALID_ITEM] !== VALID_MENU_ITEM)
            throw new TypeError("Item is not type of MenuItem");
        if (typeof item._parent === "object")
            throw new ReferenceError("This item is already assigned as menu option");
        const hasBefore = this._MenuItemEvenHandler.has(item);
        if (this._registry(item, this._MenuItemEvenHandler) && !hasBefore) {
            item._parent = (item._parent ?? 0) + 1;
            return true;
        }
        return hasBefore;
    }
    addStatusBarItem(item) {
        if (this._StatusItemEvenHandler.has(item))
            return true;
        if (item?.[VALID_ITEM] !== VALID_STATUS_ITEM)
            throw new TypeError("Item is not type of StatusBarItem");
        return this._registry(item, this._StatusItemEvenHandler);
    }
    addTool(item) {
        if (this._ToolEvenHandler.has(item))
            return true;
        if (item?.[VALID_ITEM] !== VALID_TOOL_ITEM)
            throw new TypeError("Item is not type of Tool");
        if (KNOWN_TOOLS.has(item))
            throw new ReferenceError("This tool is already used by different person.");
        KNOWN_TOOLS.add(item);
        return this._registry(item, this._ToolEvenHandler);
    }
    addEditorPane(item) {
        if (this._EditorPaneEvenHandler.has(item))
            return true;
        if (item?.[VALID_ITEM] !== VALID_PANE_ITEM)
            throw new TypeError("Item is not type of EditorPane");
        if (typeof item._parentPane === "object")
            throw new TypeError("This Pane is already registred or used as subpane.");
        item._parentPane = null;
        return this._registry(item, this._EditorPaneEvenHandler);
    }
    removeItem(item) {
        const m = item?.[VALID_ITEM];
        if (!m)
            return false;
        switch (m) {
            case VALID_MENU_ITEM:
                if (this._unregistry(item, this._MenuItemEvenHandler)) {
                    let i = item;
                    i._parent--;
                    if (i._parent <= 0)
                        i._parent = undefined;
                    return true;
                }
                return false;
            case VALID_STATUS_ITEM: return this._unregistry(item, this._StatusItemEvenHandler);
            case VALID_TOOL_ITEM:
                if (this._ToolEvenHandler.has(item))
                    KNOWN_TOOLS.delete(item);
                return this._unregistry(item, this._ToolEvenHandler);
            case VALID_PANE_ITEM:
                if (this._EditorPaneEvenHandler.has(item))
                    item._parentPane = undefined;
                return this._unregistry(item, this._EditorPaneEvenHandler);
            default: return false;
        }
    }
    clearAll() {
        for (const c of this.getStatusBarItems())
            this.removeItem(c);
        for (const c of this.getMenuItems())
            this.removeItem(c);
        for (const c of this.getEditorPanes())
            this.removeItem(c);
        for (const c of this.getTools())
            this.removeItem(c);
    }
    hasTool(item) { return this._ToolEvenHandler.has(item); }
    hasMenuItem(item) { return this._MenuItemEvenHandler.has(item); }
    hasEditorPane(item) { return this._EditorPaneEvenHandler.has(item); }
    hasStatusBarItem(item) { return this._StatusItemEvenHandler.has(item); }
    getMenuItems() { return this._MenuItemEvenHandler.keys(); }
    getStatusBarItems() { return this._StatusItemEvenHandler.keys(); }
    getTools() { return this._ToolEvenHandler.keys(); }
    getEditorPanes() { return this._EditorPaneEvenHandler.keys(); }
    /**@deprecated This is feature is incomplete, it can be set but could be desynced by other addons */
    setToolBarVisibility(visibility) {
        this._visible = visibility;
        TriggerEvent(this.onUpdate, this, UPDATE_FLAG);
        return this;
    }
    /**@deprecated This is feature is incomplete, it can be set but could be desynced by other addons */
    setToolBarMode(enabled) {
        this._enabled = enabled;
        TriggerEvent(this.onUpdate, this, UPDATE_FLAG);
        return this;
    }
    /**@deprecated Internal function */
    *displayInitPackets() {
        yield* super.displayInitPackets();
        for (const key of this._StatusItemEvenHandler.keys())
            yield* key.displayInitPackets();
        for (const key of this._MenuItemEvenHandler.keys())
            yield* key.displayInitPackets();
        for (const key of this._ToolEvenHandler.keys())
            yield* key.displayInitPackets();
        for (const key of this._EditorPaneEvenHandler.keys())
            yield* key.displayInitPackets();
    }
    /**@deprecated Internal function */
    *displayDisposePackets() {
        for (const key of this._ToolEvenHandler.keys()) {
            key.onUpdate.unsubscribe(this._ToolEvenHandler.get(key));
            yield* key.displayDisposePackets();
        }
        for (const key of this._MenuItemEvenHandler.keys()) {
            key.onUpdate.unsubscribe(this._MenuItemEvenHandler.get(key));
            yield* key.displayDisposePackets();
        }
        for (const key of this._StatusItemEvenHandler.keys()) {
            key.onUpdate.unsubscribe(this._StatusItemEvenHandler.get(key));
            yield* key.displayDisposePackets();
        }
        for (const key of this._EditorPaneEvenHandler.keys()) {
            key.onUpdate.unsubscribe(this._EditorPaneEvenHandler.get(key));
            yield* key.displayDisposePackets();
        }
        this._ToolEvenHandler.clear();
        this._MenuItemEvenHandler.clear();
        this._StatusItemEvenHandler.clear();
        this._EditorPaneEvenHandler.clear();
        yield* super.displayDisposePackets();
    }
    /**@deprecated Internal method */
    getMainPacketData(flags) {
        const data = { visible: this._visible, enabled: this._enabled };
        if (this._activeTool === null)
            data.selectedOptionId = "";
        else if (this._activeTool[OBJECT_TYPE] === TOOL_OBJECT_TYPE)
            data.selectedOptionId = this._activeTool;
        else
            data.selectedOptionId = this._activeTool.id;
        return data;
    }
}

;// CONCATENATED MODULE: ./src/dynamic-editor/native/Controls/FeatureElements.ts



class AutoSizeStatusBarItem extends StatusBarItem {
    constructor(content) {
        super(content);
        //bind size property depending on current text property and its length
        StatusBarItem.BindProperty(this, "text", this, "size", n => (n?.length ?? 0) * 1.25);
        this.setPropertyValue("text", content ?? "");
    }
}
class BlockTypePickerPaneElement extends BlockPickerPaneElement {
    constructor(title) {
        super(title ?? "");
        this.setPropertyValue("allowedBlocks", server_namespaceObject.BlockTypes.getAll().map(({ id }) => id.startsWith("minecraft:") ? id.substring(10) : id));
    }
    get selectedBlockType() { return server_namespaceObject.BlockTypes.get(this.value) ?? server_namespaceObject.BlockTypes.get("air"); }
    get selectedBlockPermutation() { return server_namespaceObject.BlockPermutation.resolve(this.value) ?? server_namespaceObject.BlockPermutation.resolve("air"); }
}
class PermutationPickerPane extends EditorPane {
    blockTypePicker = new BlockTypePickerPaneElement("Type");
    pane = new EditorPane("Permutation");
    permutation = server_namespaceObject.BlockPermutation.resolve("air");
    get blockPermutation() { return this.permutation; }
    ;
    constructor(title) {
        super(title ?? "Permutation Picker");
        this.blockTypePicker.setValue("air");
        this.blockTypePicker.onPropertyValueChange.subscribe(({ newValue, propertyName }) => {
            if (propertyName === "value") {
                this.permutation = server_namespaceObject.BlockPermutation.resolve(newValue);
                const states = this.permutation.getAllStates();
                for (const e of this.pane.getElements())
                    this.pane.removeElement(e);
                for (const n of Object.getOwnPropertyNames(states)) {
                    const vs = server_namespaceObject.BlockStates.get(n)?.validValues;
                    const a = new DropdownPaneElement(n, vs);
                    a.onUserInputValue.subscribe(e => {
                        this.permutation = this.permutation.withState(n, vs[e.newValue]);
                    });
                    this.pane.addElement(a);
                }
            }
        });
        this.addElements(this.blockTypePicker, this.pane);
    }
}

;// CONCATENATED MODULE: ./src/dynamic-editor/native/Controls/index.ts









;// CONCATENATED MODULE: ./src/dynamic-editor/native/Editor/EditorControlManager.ts




class EditorControlManager {
    context;
    changes;
    toolView;
    get isReady() { return this._ready ?? this.context.isReady; }
    set isReady(v) { this._ready = v; }
    constructor(context) {
        if (!Base_core.isNativeCall)
            throw new ReferenceError(Base_NoConstructor + EditorControlManager.name);
        this.context = context;
        this.changes = new Map();
        this.context.onReadyEvent.subscribe(async () => {
            this.resolvePackets(this.toolView.displayInitPackets());
            this.toolView.onUpdate.subscribe((e, flag) => this.whenUpdate(e, flag));
        });
        this.context.onShutdownEvent.subscribe(() => {
            this.isReady = false;
            if (typeof this.task === "number")
                server_namespaceObject.system.clearRun(this.task);
            this.task = null;
            //Dispose all controls on shutdown
            for (const disposePackets of this.toolView.displayDisposePackets())
                null; //do nothing bc player session is already ending
            //@ts-ignore
            this.toolView = null;
        });
        this.task = null;
        //@ts-ignore
        this.toolView = new ToolView(this.context);
    }
    whenUpdate(control, flag) {
        const s = this.changes.get(control) ?? new Set;
        s.add(flag);
        this.changes.set(control, s);
        this.setUpdate();
    }
    setUpdate() { if (this.isReady && this.task === null)
        return (this.task = server_namespaceObject.system.run(() => this.build())) || true; }
    _ready;
    task;
    build() {
        this.task = null;
        const m = this.packetMethods;
        for (const [k, v] of this.changes.entries()) {
            //@ts-ignore
            for (const f of v)
                this.resolvePackets(k[m[f]]());
        }
        this.changes.clear();
    }
    resolvePackets(packets) {
        const context = this.context;
        let currentData = packets.next();
        while (!currentData.done) {
            let giveParam = undefined;
            const packet = currentData.value;
            context.post(packet);
            currentData = packets.next(giveParam);
        }
    }
    packetMethods = {
        [UPDATE_FLAG]: "displayUpdatePackets",
        [REMOVE_FLAG]: "displayDisposePackets",
        [INIT_FLAG]: "displayInitPackets"
    };
}

;// CONCATENATED MODULE: ./src/dynamic-editor/native/Editor/EditorDisplayManager.ts


const DISPLAY_MANAGERS = new WeakMap();
class PlayerDisplayManager {
    static hasDisplayManager(player) { return DISPLAY_MANAGERS.has(player); }
    static getDisplayManager(player) { return DISPLAY_MANAGERS.get(player); }
    //@ts-ignore
    activeTool;
    //@ts-ignore
    player;
    uniques = new WeakMap();
    reverses = new Map();
    isReady = false;
    onClientReady = new NativeEvent();
    onToolAtivate = new NativeEvent;
    lastTool = null;
    constructor(player) {
        if (DISPLAY_MANAGERS.has(player))
            return DISPLAY_MANAGERS.get(player);
        DISPLAY_MANAGERS.set(player, this);
        this.player = player;
        this.onClientReady.subscribe(() => {
            //@ts-ignore
            this.isReady = true;
        });
        this.onToolAtivate.subscribe(({ tool, lastTool }) => {
            if (lastTool?.[OBJECT_TYPE] === TOOL_OBJECT_TYPE && tool !== lastTool)
                TriggerEvent(lastTool.onActivationStateChange, { tool: lastTool, isSelected: false });
            if (tool?.[OBJECT_TYPE] === TOOL_OBJECT_TYPE)
                TriggerEvent(tool.onActivationStateChange, { tool: tool, isSelected: true });
        });
    }
    addReverses(reverse, as = "") {
        let uuid = this.getUnique(reverse) ?? (as + UUID.generate());
        if (!this.reverses.has(uuid))
            this.reverses.set(uuid, reverse);
        this.setUnique(reverse, uuid);
        return uuid;
    }
    getReverses(uuid) { return this.reverses.get(uuid); }
    hasReverses(uuid) { return this.reverses.has(uuid); }
    removeReveres(uuid) { return this.reverses.delete(uuid); }
    hasUnique(obj) { return this.uniques.get(obj); }
    setUnique(obj, uuid) { return this.uniques.set(obj, uuid); }
    getUnique(obj) { return this.uniques.get(obj); }
    openCreateUnique(obj, as = "") {
        if (this.uniques.has(obj))
            return this.uniques.get(obj);
        else {
            const uid = (as + UUID.generate());
            this.uniques.set(obj, uid);
            return uid;
        }
    }
}

;// CONCATENATED MODULE: ./src/dynamic-editor/native/Editor/EditorContext.ts






//@ts-ignore

const CONTEXT_MANAGERS = new WeakMap();
const CONTEXT_BY_EXTENSION = new WeakMap();
const POST = server_namespaceObject.Player.prototype.postClientMessage;
class EditorContextManager {
    context;
    display;
    player;
    cursor;
    transactionManager;
    selectionManager;
    clipboardManager;
    controlManager;
    extension;
    onInitializeEvent = new NativeEvent();
    onReadyEvent = new NativeEvent();
    onShutdownEvent = new NativeEvent();
    actionManager = new Map();
    get isReady() { return this.display?.isReady ?? false; }
    _eventReadyMethod;
    /**@param {ExtensionContext} context  */
    constructor(context, that) {
        if (CONTEXT_MANAGERS.has(context))
            return CONTEXT_MANAGERS.get(context);
        CONTEXT_MANAGERS.set(context, this);
        this.context = context;
        this.display = new PlayerDisplayManager(context.player);
        this.transactionManager = context.transactionManager;
        this.selectionManager = context.selectionManager;
        this.clipboardManager = context.clipboardManager;
        this.player = context.player;
        this.cursor = context.cursor;
        Base_core.isNativeCall = true;
        this.controlManager = new EditorControlManager(this);
        this._eventReadyMethod = this.display.onClientReady.subscribe(() => this.onReadyEvent.trigger(this));
        globalContextRef.context = this;
        try {
            this.extension = new that();
        }
        catch (error) {
            globalContextRef.context = null;
            Base_core.isNativeCall = false;
            throw error;
        }
        globalContextRef.context = null;
        Base_core.isNativeCall = false;
        CONTEXT_BY_EXTENSION.set(this.extension, this);
        this.onInitializeEvent.trigger(this);
    }
    shutdown() {
        this.display?.onClientReady.unsubscribe(this._eventReadyMethod);
        this.onShutdownEvent.trigger(this);
    }
    static Shutdown(context) {
        const that = CONTEXT_MANAGERS.get(context);
        that?.shutdown();
    }
    post(packet) {
        const d = this.display;
        POST.call(this.player, packet.id, JSON.stringify(packet.data, (k, v) => {
            if (typeof v?.[UNIQUE_SYMBOL] === "function")
                return v?.[UNIQUE_SYMBOL]?.(d, this);
            return v;
        }));
    }
}
EditorExtension.registry = function (extensionName) {
    if (typeof this !== 'function')
        throw new TypeError("Bound to 'this' is not a function.");
    //@ts-ignore
    this.extensionName = (extensionName ?? this.extensionName) ?? this.name;
    if (typeof this.extensionName !== 'string')
        throw new ReferenceError("Extension name required.");
    registerExtension_Internal(this.extensionName, this, this.metadata ?? {});
    return this;
};
function registerExtension_Internal(extensionName, that, metadata) {
    server_editor_bindings_namespaceObject.editor.registerExtension_Internal(extensionName, (context) => { new EditorContextManager(context, that); }, (context) => { EditorContextManager.Shutdown(context); }, metadata ?? {});
}

;// CONCATENATED MODULE: ./src/dynamic-editor/native/Editor/EditorEventManager.ts




class EditorEventManager {
    constructor() {
        server_namespaceObject.world.afterEvents.messageReceive.subscribe(({ id, message, player }) => {
            if (!(id in ReceiveEventId))
                return;
            this.resolver(id, JSON.parse(message), player);
        });
    }
    resolver(id, message, player) {
        //@ts-ignore
        this[id](id, message, player);
    }
    [ReceiveEventId["Editor::ClientLifecycle"]](id, message, player) {
        if (message?.type === ReceiveLifecycleEventType.PlayerReady) {
            const display = new PlayerDisplayManager(player);
            display.onClientReady.trigger({ player, display });
        }
    }
    [ReceiveEventId["Editor::ClientActionEvents"]](id, message, player) {
        if (message?.type === ReceiveActionEventType.ActionExecuted) {
            const actionId = message.id;
            const display = new PlayerDisplayManager(player);
            if (!display.hasReverses(actionId))
                return;
            TriggerEvent(display.getReverses(actionId)?.onActionExecute, new (PayloadLoaders.get(message.payload.type))(player, message.payload));
        }
    }
    [ReceiveEventId["Editor::ClientUXEvents"]](id, message, player) {
        if (!(message.type in this.uxEventsResolver)) {
            console.warn(`§8No handler implementation for §r§l${id}§r§7  -->  §r§l${message.type} §r§8[${ReceiveEventEnum[id][message.type]}]\n`, JSON.stringify(message));
        }
        else
            this.uxEventsResolver[message.type](id, message, new PlayerDisplayManager(player));
    }
    uxEventsResolver = {
        [ReceiveUXEventType.ToolActivate](id, message, display) {
            let tool;
            if (message.id === "")
                tool = null;
            else if (!display.hasReverses(message.id))
                tool = { id: message.id };
            else
                tool = display.getReverses(message.id);
            display.onToolAtivate.trigger({ player: display.player, display, lastTool: display.lastTool, tool: tool });
            display.lastTool = tool;
        },
        [ReceiveUXEventType.PaneModeChanged](id, message, display) {
            const mId = message.id;
            if (display.hasReverses(mId)) {
                const r = display.getReverses(mId);
                r.setCollapsed(message.collapsed);
            }
        },
        [ReceiveUXEventType.PaneVisisbilityChanged](id, message, display) {
            const mId = message.id;
            if (display.hasReverses(mId)) {
                const r = display.getReverses(mId);
                r.setVisibility(message.visibility);
            }
        },
        [ReceiveUXEventType.ProperyChanged](id, message, display) {
            const { paneId, property, newValue } = message;
            if (display.hasReverses(paneId)) {
                const r = display.getReverses(paneId);
                //@ts-ignore
                if (r._properties.has(property)) {
                    //@ts-ignore
                    const a = r._properties.get(property);
                    //@ts-ignore
                    a._setValue(newValue);
                }
            }
        }
    };
}
const editorEventManager = new EditorEventManager();

;// CONCATENATED MODULE: ./src/dynamic-editor/native/Editor/index.ts





;// CONCATENATED MODULE: ./src/dynamic-editor/index.ts






;// CONCATENATED MODULE: ./src/dynamic-editor.ts


var __webpack_exports__AutoSizeStatusBarItem = __webpack_exports__.pF;
var __webpack_exports__BindedSource = __webpack_exports__.mj;
var __webpack_exports__BlockPickerPaneElement = __webpack_exports__.n_;
var __webpack_exports__BlockTypePickerPaneElement = __webpack_exports__.rz;
var __webpack_exports__BooleanPaneElement = __webpack_exports__.d_;
var __webpack_exports__BooleanProperty = __webpack_exports__.xv;
var __webpack_exports__BuildInPane = __webpack_exports__.uf;
var __webpack_exports__ButtonPaneElement = __webpack_exports__.LN;
var __webpack_exports__ButtonVariant = __webpack_exports__.Wu;
var __webpack_exports__ButtonVariantProperty = __webpack_exports__.wF;
var __webpack_exports__ClipboardItem = __webpack_exports__.xf;
var __webpack_exports__ClipboardManager = __webpack_exports__.UD;
var __webpack_exports__ClipboardMirrorAxis = __webpack_exports__.Sd;
var __webpack_exports__ClipboardRotation = __webpack_exports__.mS;
var __webpack_exports__Cursor = __webpack_exports__.CF;
var __webpack_exports__CursorControlMode = __webpack_exports__.TN;
var __webpack_exports__CursorTargetMode = __webpack_exports__.zI;
var __webpack_exports__DividerPaneElement = __webpack_exports__.Jh;
var __webpack_exports__DropdownItemsMapingProperty = __webpack_exports__.ct;
var __webpack_exports__DropdownPaneElement = __webpack_exports__.Aw;
var __webpack_exports__Editor = __webpack_exports__.ML;
var __webpack_exports__EditorEvents = __webpack_exports__.Wi;
var __webpack_exports__EditorExtension = __webpack_exports__.MC;
var __webpack_exports__EditorMode = __webpack_exports__.je;
var __webpack_exports__EditorPane = __webpack_exports__.J4;
var __webpack_exports__Element = __webpack_exports__.W_;
var __webpack_exports__ExtensionInitializeEvent = __webpack_exports__.et;
var __webpack_exports__ExtensionInitializeEventData = __webpack_exports__.V2;
var __webpack_exports__ExtensionReadyEvent = __webpack_exports__.hV;
var __webpack_exports__ExtensionReadyEventData = __webpack_exports__.CS;
var __webpack_exports__ExtensionShutdownEvent = __webpack_exports__.CG;
var __webpack_exports__ExtensionShutdownEventData = __webpack_exports__._4;
var __webpack_exports__GraphicsSettings = __webpack_exports__.kZ;
var __webpack_exports__GraphicsSettingsProperty = __webpack_exports__.fT;
var __webpack_exports__InputModifier = __webpack_exports__.P3;
var __webpack_exports__KeyboardKey = __webpack_exports__.u8;
var __webpack_exports__Logger = __webpack_exports__.Yd;
var __webpack_exports__MenuActionItem = __webpack_exports__.MK;
var __webpack_exports__MenuOptionsItem = __webpack_exports__.hd;
var __webpack_exports__MouseAction = __webpack_exports__.oX;
var __webpack_exports__MouseInteractionType = __webpack_exports__.V1;
var __webpack_exports__MouseInteractions = __webpack_exports__.Y2;
var __webpack_exports__NumberPaneElement = __webpack_exports__.VW;
var __webpack_exports__NumberProperty = __webpack_exports__.Y6;
var __webpack_exports__PermutationPickerPane = __webpack_exports__.SY;
var __webpack_exports__PlayerModeChangeEvent = __webpack_exports__.$W;
var __webpack_exports__PlayerModeChangeEventData = __webpack_exports__.uY;
var __webpack_exports__PlaytestManager = __webpack_exports__.uG;
var __webpack_exports__PlaytestSessionResult = __webpack_exports__.YY;
var __webpack_exports__RedirectDestination = __webpack_exports__.Pw;
var __webpack_exports__Selection = __webpack_exports__.Y1;
var __webpack_exports__SelectionManager = __webpack_exports__.ZE;
var __webpack_exports__SettingsManager = __webpack_exports__.pz;
var __webpack_exports__SimulationState = __webpack_exports__.BH;
var __webpack_exports__StatusBarAlignmentProperty = __webpack_exports__.V7;
var __webpack_exports__StatusBarItem = __webpack_exports__.wl;
var __webpack_exports__StatusBarItemAlignment = __webpack_exports__.se;
var __webpack_exports__StringPaneElement = __webpack_exports__.er;
var __webpack_exports__StringProperty = __webpack_exports__.h_;
var __webpack_exports__Tool = __webpack_exports__.UA;
var __webpack_exports__ToolView = __webpack_exports__.v5;
var __webpack_exports__TransactionManager = __webpack_exports__.wt;
var __webpack_exports__ValueChangeEvent = __webpack_exports__.My;
var __webpack_exports__ValueChangeEventData = __webpack_exports__.xC;
var __webpack_exports__Vector3Property = __webpack_exports__.G7;
var __webpack_exports__VectorPaneElement = __webpack_exports__.Bk;
var __webpack_exports__editor = __webpack_exports__.j6;
export { __webpack_exports__AutoSizeStatusBarItem as AutoSizeStatusBarItem, __webpack_exports__BindedSource as BindedSource, __webpack_exports__BlockPickerPaneElement as BlockPickerPaneElement, __webpack_exports__BlockTypePickerPaneElement as BlockTypePickerPaneElement, __webpack_exports__BooleanPaneElement as BooleanPaneElement, __webpack_exports__BooleanProperty as BooleanProperty, __webpack_exports__BuildInPane as BuildInPane, __webpack_exports__ButtonPaneElement as ButtonPaneElement, __webpack_exports__ButtonVariant as ButtonVariant, __webpack_exports__ButtonVariantProperty as ButtonVariantProperty, __webpack_exports__ClipboardItem as ClipboardItem, __webpack_exports__ClipboardManager as ClipboardManager, __webpack_exports__ClipboardMirrorAxis as ClipboardMirrorAxis, __webpack_exports__ClipboardRotation as ClipboardRotation, __webpack_exports__Cursor as Cursor, __webpack_exports__CursorControlMode as CursorControlMode, __webpack_exports__CursorTargetMode as CursorTargetMode, __webpack_exports__DividerPaneElement as DividerPaneElement, __webpack_exports__DropdownItemsMapingProperty as DropdownItemsMapingProperty, __webpack_exports__DropdownPaneElement as DropdownPaneElement, __webpack_exports__Editor as Editor, __webpack_exports__EditorEvents as EditorEvents, __webpack_exports__EditorExtension as EditorExtension, __webpack_exports__EditorMode as EditorMode, __webpack_exports__EditorPane as EditorPane, __webpack_exports__Element as Element, __webpack_exports__ExtensionInitializeEvent as ExtensionInitializeEvent, __webpack_exports__ExtensionInitializeEventData as ExtensionInitializeEventData, __webpack_exports__ExtensionReadyEvent as ExtensionReadyEvent, __webpack_exports__ExtensionReadyEventData as ExtensionReadyEventData, __webpack_exports__ExtensionShutdownEvent as ExtensionShutdownEvent, __webpack_exports__ExtensionShutdownEventData as ExtensionShutdownEventData, __webpack_exports__GraphicsSettings as GraphicsSettings, __webpack_exports__GraphicsSettingsProperty as GraphicsSettingsProperty, __webpack_exports__InputModifier as InputModifier, __webpack_exports__KeyboardKey as KeyboardKey, __webpack_exports__Logger as Logger, __webpack_exports__MenuActionItem as MenuActionItem, __webpack_exports__MenuOptionsItem as MenuOptionsItem, __webpack_exports__MouseAction as MouseAction, __webpack_exports__MouseInteractionType as MouseInteractionType, __webpack_exports__MouseInteractions as MouseInteractions, __webpack_exports__NumberPaneElement as NumberPaneElement, __webpack_exports__NumberProperty as NumberProperty, __webpack_exports__PermutationPickerPane as PermutationPickerPane, __webpack_exports__PlayerModeChangeEvent as PlayerModeChangeEvent, __webpack_exports__PlayerModeChangeEventData as PlayerModeChangeEventData, __webpack_exports__PlaytestManager as PlaytestManager, __webpack_exports__PlaytestSessionResult as PlaytestSessionResult, __webpack_exports__RedirectDestination as RedirectDestination, __webpack_exports__Selection as Selection, __webpack_exports__SelectionManager as SelectionManager, __webpack_exports__SettingsManager as SettingsManager, __webpack_exports__SimulationState as SimulationState, __webpack_exports__StatusBarAlignmentProperty as StatusBarAlignmentProperty, __webpack_exports__StatusBarItem as StatusBarItem, __webpack_exports__StatusBarItemAlignment as StatusBarItemAlignment, __webpack_exports__StringPaneElement as StringPaneElement, __webpack_exports__StringProperty as StringProperty, __webpack_exports__Tool as Tool, __webpack_exports__ToolView as ToolView, __webpack_exports__TransactionManager as TransactionManager, __webpack_exports__ValueChangeEvent as ValueChangeEvent, __webpack_exports__ValueChangeEventData as ValueChangeEventData, __webpack_exports__Vector3Property as Vector3Property, __webpack_exports__VectorPaneElement as VectorPaneElement, __webpack_exports__editor as editor };
