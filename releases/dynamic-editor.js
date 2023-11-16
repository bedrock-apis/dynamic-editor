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
  xv: () => (/* reexport */ BooleanProperty),
  uf: () => (/* reexport */ BuildInPane),
  Os: () => (/* reexport */ ConvertingProperty),
  o6: () => (/* reexport */ Destination),
  MC: () => (/* reexport */ EditorExtension),
  je: () => (/* reexport */ server_editor_bindings_namespaceObject.EditorMode),
  W_: () => (/* reexport */ Element),
  et: () => (/* reexport */ ExtensionInitializeEvent),
  V2: () => (/* reexport */ ExtensionInitializeEventData),
  hV: () => (/* reexport */ ExtensionReadyEvent),
  CS: () => (/* reexport */ ExtensionReadyEventData),
  CG: () => (/* reexport */ ExtensionShutdownEvent),
  _4: () => (/* reexport */ ExtensionShutdownEventData),
  MK: () => (/* reexport */ MenuActionItem),
  hd: () => (/* reexport */ MenuOptionsItem),
  Y6: () => (/* reexport */ NumberProperty),
  $W: () => (/* reexport */ PlayerModeChangeEvent),
  uY: () => (/* reexport */ PlayerModeChangeEventData),
  V7: () => (/* reexport */ StatusBarAlignmentProperty),
  wl: () => (/* reexport */ StatusBarItem),
  se: () => (/* reexport */ StatusBarItemAlignment),
  h_: () => (/* reexport */ StringProperty),
  My: () => (/* reexport */ ValueChangeEvent),
  xC: () => (/* reexport */ ValueChangeEventData)
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
/**@public */
var BuildInPane;
(function (BuildInPane) {
    BuildInPane[BuildInPane["UISettings"] = 1] = "UISettings";
    BuildInPane[BuildInPane["WelcomePage"] = 2] = "WelcomePage";
    BuildInPane[BuildInPane["LogPanel"] = 3] = "LogPanel";
})(BuildInPane || (BuildInPane = {}));
var ActionType;
(function (ActionType) {
    ActionType["NoArgsAction"] = "NoArgsAction";
    ActionType["MouseRayCastAction"] = "MouseRayCastAction";
})(ActionType || (ActionType = {}));
;
var InternalInputTypes;
(function (InternalInputTypes) {
    InternalInputTypes[InternalInputTypes["ButtonDown"] = 1] = "ButtonDown";
    InternalInputTypes[InternalInputTypes["ButtonUp"] = 2] = "ButtonUp";
    InternalInputTypes[InternalInputTypes["WheelDown"] = 3] = "WheelDown";
    InternalInputTypes[InternalInputTypes["WheelUo"] = 4] = "WheelUo";
    InternalInputTypes[InternalInputTypes["DragStart"] = 5] = "DragStart";
    InternalInputTypes[InternalInputTypes["Draging"] = 6] = "Draging";
    InternalInputTypes[InternalInputTypes["DragStop"] = 7] = "DragStop";
})(InternalInputTypes || (InternalInputTypes = {}));
var InternalInteractionTypes;
(function (InternalInteractionTypes) {
    InternalInteractionTypes[InternalInteractionTypes["LeftButton"] = 1] = "LeftButton";
    InternalInteractionTypes[InternalInteractionTypes["MiddleButton"] = 2] = "MiddleButton";
    InternalInteractionTypes[InternalInteractionTypes["Scroll"] = 4] = "Scroll";
})(InternalInteractionTypes || (InternalInteractionTypes = {}));
var MouseAction;
(function (MouseAction) {
    MouseAction[MouseAction["Button"] = 1] = "Button";
    MouseAction[MouseAction["Wheel"] = 2] = "Wheel";
    MouseAction[MouseAction["Drag"] = 3] = "Drag";
})(MouseAction || (MouseAction = {}));
var InputDivice;
(function (InputDivice) {
    InputDivice[InputDivice["KeyBoard"] = 1] = "KeyBoard";
    InputDivice[InputDivice["Mouse"] = 2] = "Mouse";
})(InputDivice || (InputDivice = {}));
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
const IDENTITY_SYMBOL = Symbol("UNIQUE");
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






;// CONCATENATED MODULE: ./src/dynamic-editor/native/Editor/Editor.ts
class Editor {
    events;
    constructor() {
        this.events = new EditorEvents();
    }
}
class EditorEvents {
    constructor() { }
}
const editor = new Editor();

;// CONCATENATED MODULE: external "@minecraft/server-editor-bindings"
var x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var y = x => () => x
const server_editor_bindings_namespaceObject = x({ ["EditorMode"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_editor_bindings_e2bf1028__.EditorMode, ["editor"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_editor_bindings_e2bf1028__.editor });
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
    //@ts-ignore
    oldValue;
    //@ts-ignore
    newValue;
    //@ts-ignore
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
class PostActionPacket extends ServerActionEventPacket {
    [IDENTITY_SYMBOL] = ACTION_IDENTITY_SYMBOL;
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
    static BindActionToControlPacket(action, control) {
        return new ServerUXEventPacket({
            type: ServerUXEventType.BindUIEvent,
            actionId: action,
            controlId: control
        });
    }
    static UnbindActionToControlPacket(action, control) {
        return new ServerUXEventPacket({
            type: ServerUXEventType.UnbindUIEvent,
            actionId: action,
            controlId: control
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
    getMainPacketData(flags = 0) { return { type: this.PACKET_TYPES[flags] }; }
    getMainPacket(flags = 0) { return new this.packetConstructor(this.getMainPacketData(flags)); }
    *getPackets(flags) { yield this.getMainPacket(flags); }
}
class UniquePostable extends Postable {
    [UNIQUE_SYMBOL] = true;
    getMainPacketData(flags) {
        const data = super.getMainPacketData(flags);
        data.id = this;
        return data;
    }
}
class Displayable extends UniquePostable {
    packetConstructor = ServerUXEventPacket;
    onUpdate = new PublicEvent; //Keep displayble bc its not always a "this" reference
    onInit = new PublicEvent;
    onDispose = new PublicEvent;
    *displayInitPackets() { yield* this.getPackets(INIT_FLAG); }
    *displayUpdatePackets() { yield* this.getPackets(UPDATE_FLAG); }
    *displayDisposePackets() { yield* this.getPackets(REMOVE_FLAG); }
}

;// CONCATENATED MODULE: ./src/dynamic-editor/native/Editor/EditorExtension.js





/**@public */
class EditorExtension{
    Shutdown(){};
    Ready(){};
    Initialize(){};
    onInitialize = new ExtensionInitializeEvent();
    onReady = new ExtensionReadyEvent();
    onShutdown = new ExtensionShutdownEvent();
    onPlayerModeChange = new PlayerModeChangeEvent();
    /**@param {import("./EditorContext").EditorContextManager} context  */
    constructor(context, that = EditorExtension){
        if(!Base_core.isNativeCall) throw new TypeError(Base_NoConstructor + EditorExtension.name);
        this.player = context.player;
        this.statusBar = context.controlManager.statusBar;
        this.menuBar = context.controlManager.menuBar;
        this.clipboard = context.clipboardManager;
        context.onInitializeEvent.subscribe(()=>{
            try {
                this.Initialize?.(this.public);
            } catch (error) {console.error(error,error.stack);}
            TriggerEvent(this.onInitialize,new ExtensionInitializeEventData(this));
        });
        context.onReadyEvent.subscribe(()=>{
            try {
                this.Ready?.(this.public);
            } catch (error) {console.error(error,error.stack);}
            TriggerEvent(this.onReady,new ExtensionReadyEventData(this));
        });
        context.onShutdownEvent.subscribe(()=>{
            TriggerEvent(this.onShutdown,new ExtensionShutdownEventData(this));
            try {
                this.Shutdown?.(this.public);
            } catch (error) {console.error(error,error.stack);}
        });
        context.context.afterEvents.modeChange.subscribe(e=>TriggerEvent(this.onPlayerModeChange,new PlayerModeChangeEventData(this,e.mode)));
        Object.setPrototypeOf(this,that.prototype??EditorExtension.prototype);
    }
    redirectTo(destination){
        if(!CONTEXT_BY_EXTENSION.has(this)) throw new ReferenceError(Base_ObjectBoundNotExist);
        if(!(destination in RedirectDestination)) throw new TypeError("Unknow Destination: " + destination);
        if(typeof destination === "string") destination = RedirectDestination[destination];
        CONTEXT_BY_EXTENSION.get(this).post(new RedirectToDestinationPacket(destination));
    }
    setBuildInPaneVisibility(pane, visible = true){
        if(!CONTEXT_BY_EXTENSION.has(this)) throw new ReferenceError(Base_ObjectBoundNotExist);
        if(!(pane in BuildInPane)) throw new TypeError("Unknow pane: " + pane);
        if(typeof pane === "string") destination = BuildInPane[pane];
        CONTEXT_BY_EXTENSION.get(this).post(new UpdateBuildInPanePacket(pane,!!visible));
    }
}
;// CONCATENATED MODULE: external "@minecraft/server"
var server_x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var server_y = x => () => x
const server_namespaceObject = server_x({ ["Player"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.Player, ["system"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.system, ["world"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.world });
;// CONCATENATED MODULE: ./src/dynamic-editor/native/Controls/Base.ts



const NULL_TYPE = Symbol("NULL");
class Property {
    static UNIQUE_TYPE = NULL_TYPE;
    static EXPECTED_VALUE_TYPE = undefined;
    _type;
    _expectedType;
    onValueChange = new ValueChangeEvent;
    constructor() { this._type = new.target.UNIQUE_TYPE; this._expectedType = new.target.EXPECTED_VALUE_TYPE; }
    ;
}
class ElementProperty extends Property {
    value;
    defualtValue;
    _typeOf;
    constructor(defaultValue) {
        super();
        this._typeOf = typeof defaultValue;
        this.value = defaultValue;
        this.defualtValue = defaultValue;
    }
    isValidType(v) { return typeof v === this._typeOf; }
    getType(v) { return v; }
    setValue(value) {
        if (!this.isValidType(value))
            throw new TypeError("Invalid value type: '" + value + "' expected " + (this._expectedType ?? this._typeOf));
        //@ts-ignore
        this.value = this.getType(value);
        TriggerEvent(this.onValueChange, new ValueChangeEventData(this.value ?? this.defualtValue, value));
        return this;
    }
    getValue() { return this.value ?? this.defualtValue; }
    toJSON() { return this.getValue(); }
    valueOf() { return this.getValue(); }
}
class BindedSource {
    targetElement;
    targetPropertyName;
    sourceElement;
    sourcePropertyName;
    //@ts-ignore
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
    [UNIQUE_SYMBOL] = true;
    //@ts-ignore
    static BindProperty(targetElement, targetPropertyName, sourceElement, sourcePropertyName, convertor) {
        const method = sourceElement.onPropertyValueChange.subscribe(({ newValue, propertyName }) => {
            if (propertyName === sourcePropertyName)
                targetElement.setPropertyValue(targetPropertyName, convertor?.(newValue) ?? newValue);
        });
        //@ts-ignore
        return new BindedSource(targetElement, targetPropertyName, sourceElement, sourcePropertyName, method);
    }
    static UnbindProperty(bindedSource) {
        bindedSource.sourceElement.onPropertyValueChange.unsubscribe(bindedSource.method);
        return null;
    }
    //@ts-ignore
    onPropertyValueChange = new PropertyValueChangeEvent;
    propertyBag;
    _isFakes;
    _isChanging = false;
    _methods;
    constructor(properties) {
        super();
        this._methods = new WeakMap();
        this._isFakes = new Map();
        const bag = {};
        for (const propertyName of Object.getOwnPropertyNames(properties)) {
            const { property, isFake } = properties[propertyName];
            bag[propertyName] = property;
            this._isFakes.set(propertyName, isFake ?? false);
            const method = property.onValueChange.subscribe(e => this._TriggerPropertyChange(this, e.newValue, propertyName, e.oldValue, property));
            this._methods.set(property, method);
        }
        this.propertyBag = bag;
    }
    getPropertyNames() {
        return [...Object.getOwnPropertyNames(this.propertyBag)];
    }
    hasProperty(propertyName) { return propertyName in this.propertyBag; }
    getProperty(propertyName) { return this.propertyBag[propertyName]; }
    //@ts-ignore
    getPropertyValue(propertyName) { return this.propertyBag[propertyName].getValue(); }
    setProperty(propertyName, property) {
        if (!this.hasProperty(propertyName))
            throw new ReferenceError("Unknow property: " + propertyName);
        const prop = this.propertyBag[propertyName];
        //@ts-ignore
        if (property._type != prop._type)
            throw new TypeError("Can't assign '" + property._type?.description + "' type to type of '" + prop._type?.description + "'");
        prop.onValueChange.unsubscribe(this._methods.get(prop));
        this._methods.delete(prop);
        const method = property.onValueChange.subscribe(e => this._TriggerPropertyChange(this, e.newValue, propertyName, e.oldValue, property));
        this._methods.set(property, method);
        this.propertyBag[propertyName] = property;
        //@ts-ignore
        if (prop.value !== property.value) {
            //@ts-ignore
            this._TriggerPropertyChange(this, property.value, propertyName, prop.value, property);
        }
        return this;
    }
    //@ts-ignore
    setPropertyValue(propertyName, value) {
        this.propertyBag[propertyName].setValue(value);
        return this;
    }
    getMainPacketData(flags) {
        const data = super.getMainPacketData(flags);
        for (const key of this.getPropertyNames())
            if (!this._isFakes.get(key))
                data[key] = this.propertyBag[key];
        return data;
    }
    //@ts-ignore
    _TriggerPropertyChange(el, nV, pN, oV, p) {
        const baseChanging = this._isChanging;
        this._isChanging = true;
        //@ts-ignore
        TriggerEvent(this.onPropertyValueChange, new PropertyValueChangeEventData(this, pN, p, oV, nV));
        this._isChanging = baseChanging;
        if (!this._isChanging)
            TriggerEvent(this.onUpdate, this);
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
class BaseControl extends Displayable {
    _eventHandler = new Map;
    _manager;
    _instanceConstructor;
    _isDisposed = false;
    //@ts-ignore
    get isDisposed() { return this._isDisposed; }
    //@ts-ignore
    get elementsCount() { return this._elements.size; }
    constructor(manager, instanceOf) {
        if (!Base_core.isNativeCall)
            throw new ReferenceError(Base_NoConstructor + BaseControl.name);
        super();
        this._instanceConstructor = instanceOf;
        this._manager = manager;
    }
    addItem(item) {
        if (this._isDisposed)
            throw new ReferenceError("You can't manipulate with disposed elements.");
        if (!(item instanceof this._instanceConstructor))
            return false;
        if (this._eventHandler.has(item))
            return true;
        TriggerEvent(this.onUpdate, this);
        TriggerEvent(this.onInit, item);
        const method = item.onUpdate.subscribe((e) => TriggerEvent(this.onUpdate, e));
        this._eventHandler.set(item, method);
        return true;
    }
    removeItem(item) {
        if (this._isDisposed)
            throw new ReferenceError("You can't manipulate with disposed elements.");
        if (!(item instanceof this._instanceConstructor))
            return false;
        if (this._eventHandler.has(item)) {
            TriggerEvent(this.onUpdate, this);
            TriggerEvent(this.onDispose, item);
            item.onUpdate.unsubscribe(this._eventHandler.get(item));
            return true;
        }
        ;
        return false;
    }
    *getItems() { if (this._isDisposed)
        throw new ReferenceError("You can't manipulate with disposed elements."); for (const item of this._eventHandler.keys())
        yield item; }
    hasItem(item) { if (this._isDisposed)
        throw new ReferenceError("You can't manipulate with disposed elements."); return this._eventHandler.has(item); }
    *displayInitPackets() {
        for (const key of this._eventHandler.keys()) {
            yield* key.displayInitPackets();
        }
    }
    *displayDisposePackets() {
        this._isDisposed = true;
        for (const key of this._eventHandler.keys()) {
            key.onUpdate.unsubscribe(this._eventHandler.get(key));
            yield* key.displayDisposePackets();
        }
        this._eventHandler.clear();
    }
}

;// CONCATENATED MODULE: ./src/dynamic-editor/native/Controls/General.ts

class StringProperty extends ElementProperty {
    static UNIQUE_TYPE = Symbol("StringProperty");
    constructor(value) { super(value ?? ""); }
}
class NumberProperty extends ElementProperty {
    static UNIQUE_TYPE = Symbol("NumberProperty");
    constructor(value) { super(value ?? 0); }
}
class BooleanProperty extends ElementProperty {
    static UNIQUE_TYPE = Symbol("BooleanProperty");
    constructor(value) { super(value ?? false); }
}
class CustomProperty extends ElementProperty {
    constructor(value) { super(value ?? false); }
}
class ConvertingProperty extends ElementProperty {
    constructor(sourceProperty, convenrter, UNIQUE_TYPE) {
        super(convenrter(sourceProperty.getValue()));
        sourceProperty.onValueChange.subscribe(({ newValue }) => { super.setValue(convenrter(newValue)); });
        //@ts-ignore
        this._type = UNIQUE_TYPE;
    }
    setValue(value) {
        throw new ReferenceError("You can not set binded property.");
    }
}
class VisualElement extends Element {
    constructor(properties) {
        //@ts-ignore
        super({
            enabled: { property: new BooleanProperty(true) },
            visible: { property: new BooleanProperty(true) },
            ...properties
        });
    }
    get isVisible() { return this.getPropertyValue("visible") ?? false; }
    set isVisible(v) { this.setPropertyValue("visible", v); }
    get isEnabled() { return this.getPropertyValue("enabled") ?? false; }
    set isEnabled(v) { this.setPropertyValue("enabled", v); }
    setVisibility(visible) {
        this.setPropertyValue("visible", visible);
        return this;
    }
    setEnable(enable) {
        this.setPropertyValue("enabled", enable);
        return this;
    }
}
class Control extends BaseControl {
}

;// CONCATENATED MODULE: ./src/dynamic-editor/core.ts


;// CONCATENATED MODULE: ./src/dynamic-editor/native/Controls/Properties.ts


class StatusBarAlignmentProperty extends CustomProperty {
    static UNIQUE_TYPE = Symbol("StatusBarAlignmentProperty");
    static EXPECTED_VALUE_TYPE = "StatusBarItemAlignment";
    constructor(alignment = StatusBarItemAlignment.Right) { super(alignment); }
    isValidType(v) { return v in StatusBarItemAlignment; }
    getType(v) { return (typeof v === "string" ? StatusBarItemAlignment[v] : v); }
}

;// CONCATENATED MODULE: ./src/dynamic-editor/native/Editor/EditorActions.ts


class Action extends UniquePostable {
    packetConstructor = PostActionPacket;
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
    getMainPacketData(flags) {
        const data = super.getMainPacketData(flags);
        data.actionType = this.actionType;
        return data;
    }
    execute(payload) {
        TriggerEvent(this.onActionExecute, payload);
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
    //@ts-ignore
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

;// CONCATENATED MODULE: ./src/dynamic-editor/native/Controls/Elements.ts





class StatusBarItem extends VisualElement {
    PACKET_TYPES = {
        [UPDATE_FLAG]: ServerUXEventType.UpdateStatusBarItem,
        [REMOVE_FLAG]: ServerUXEventType.ReleaseStatusBarItem,
        [INIT_FLAG]: ServerUXEventType.UpdateStatusBarItem
    };
    constructor() {
        super({
            alignment: { property: new StatusBarAlignmentProperty(0) },
            text: { property: new StringProperty("") },
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
class AutoSizeStatusBarItem extends StatusBarItem {
    constructor() {
        super();
        //bind size property depending on current text property and its length
        StatusBarItem.BindProperty(this, "size", this, "text", n => (n?.length ?? 0) * 1.25);
    }
}
class MenuItem extends VisualElement {
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
    getMainPacketData(flags) {
        const object = super.getMainPacketData(flags);
        if (typeof this._parent === "object")
            object.parentId = this._parent;
        object.shortcut = ""; //unknown usage from vanilla editor
        return object;
    }
}
class MenuActionItem extends MenuItem {
    _action = new Action(ActionType.NoArgsAction);
    onActionExecute;
    constructor(content = "") {
        super({
            checked: { property: new BooleanProperty(false), isFake: true }
        }, content);
        this.onActionExecute = this._action.onActionExecute;
    }
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
            TriggerEvent(this.onUpdate, this);
        return this;
    }
    addActionHandler(handler) {
        this.onActionExecute.subscribe(handler);
        return this;
    }
    *displayInitPackets() {
        //@ts-ignore
        yield* this._action.getPackets(INIT_FLAG);
        yield* super.displayInitPackets();
        yield PacketBuilder.BindActionToControlPacket(this._action, this);
    }
    *displayDisposePackets() {
        yield PacketBuilder.UnbindActionToControlPacket(this._action, this);
        //@ts-ignore
        yield* this._action.getPackets(REMOVE_FLAG);
        yield* super.displayDisposePackets();
    }
}
class MenuOptionsItem extends MenuItem {
    constructor(content = "") { super({}, content); }
    _handlers = new Map;
    //@ts-ignore
    get elementsLength() { return this._menuItems.size; }
    addMenuItem(item) {
        //@ts-ignore
        if (item._parent === this)
            return this;
        //@ts-ignore
        if (item._parent !== undefined)
            throw new Error("This menu item is already assigned to MenuBar or a MenuBarOptions");
        //@ts-ignore
        item._parent = this;
        this._handlers.set(item, item.onUpdate.subscribe((e) => TriggerEvent(this.onUpdate, e)));
        TriggerEvent(this.onUpdate, this);
        TriggerEvent(this.onInit, item);
        return this;
    }
    removeMenuItem(item) {
        //@ts-ignore
        if (item._parent !== this)
            throw new Error("This menu item is not one of this menu options.");
        //@ts-ignore
        item._parent = undefined;
        item.onUpdate.unsubscribe(this._handlers.get(item));
        this._handlers.delete(item);
        TriggerEvent(this.onUpdate, this);
        TriggerEvent(this.onDispose, item);
        return this;
    }
    *getMenuItems() { for (const e of this._handlers.keys())
        yield e; }
    hasMenuItem(item) { return this._handlers.has(item); }
    *displayInitPackets() {
        yield* super.displayInitPackets();
        for (const a of this._handlers.keys())
            yield* a.displayInitPackets();
    }
    *displayDisposePackets() {
        yield* super.displayDisposePackets();
        for (const a of this._handlers.keys())
            yield* a.displayDisposePackets();
    }
}

;// CONCATENATED MODULE: ./src/dynamic-editor/native/Controls/Controls.ts


class StatusBarControl extends Control {
    constructor(manager) { super(manager, StatusBarItem); }
}
class MenuBarControl extends Control {
    constructor(manager) { super(manager, MenuItem); }
    addItem(item) {
        //@ts-ignore
        if (typeof item._parent === "object")
            throw new ReferenceError("This item is already assigned as menu option");
        const hasBefore = super.hasItem(item);
        if (super.addItem(item) && !hasBefore) {
            //@ts-ignore
            item._parent = (item._parent ?? 0) + 1;
            return true;
        }
        return hasBefore;
    }
    removeItem(item) {
        if (super.removeItem(item)) {
            //@ts-ignore
            item._parent--;
            //@ts-ignore
            if (item._parent <= 0)
                item._parent = undefined;
            return true;
        }
        return false;
    }
}

;// CONCATENATED MODULE: ./src/dynamic-editor/native/Controls/index.ts






;// CONCATENATED MODULE: ./src/dynamic-editor/native/Editor/EditorControlManager.ts




class EditorControlManager {
    context;
    changes;
    statusBar;
    menuBar;
    get isReady() { return this._ready ?? this.context.isReady; }
    set isReady(v) { this._ready = v; }
    constructor(context) {
        if (!Base_core.isNativeCall)
            throw new ReferenceError(Base_NoConstructor + EditorControlManager.name);
        this.context = context;
        this.changes = new Map();
        this.context.onReadyEvent.subscribe(async () => {
            this.resolvePackets(this.statusBar.displayInitPackets());
            this.resolvePackets(this.menuBar.displayInitPackets());
            this.statusBar.onUpdate.subscribe(e => this.whenUpdate(e, UPDATE_FLAG));
            this.menuBar.onUpdate.subscribe(e => this.whenUpdate(e, UPDATE_FLAG));
            this.statusBar.onInit.subscribe(e => this.whenUpdate(e, INIT_FLAG));
            this.menuBar.onInit.subscribe(e => this.whenUpdate(e, INIT_FLAG));
            this.statusBar.onDispose.subscribe(e => this.whenUpdate(e, REMOVE_FLAG));
            this.menuBar.onDispose.subscribe(e => this.whenUpdate(e, REMOVE_FLAG));
        });
        this.context.onShutdownEvent.subscribe(() => {
            this.isReady = false;
            if (typeof this.task === "number")
                server_namespaceObject.system.clearRun(this.task);
            this.task = null;
            //Dispose all controls on shutdown
            for (const disposePackets of this.statusBar.displayDisposePackets())
                null; //do nothing bc player session is already ending
            for (const disposePackets of this.menuBar.displayDisposePackets())
                null; //do nothing bc player session is already ending
            //@ts-ignore
            this.statusBar = null;
            //@ts-ignore
            this.menuBar = null;
        });
        this.task = null;
        //@ts-ignore
        this.statusBar = new StatusBarControl(this);
        //@ts-ignore
        this.menuBar = new MenuBarControl(this);
    }
    whenUpdate(control, flag) {
        const getFlag = this.changes.get(control);
        if ((getFlag === REMOVE_FLAG || getFlag === INIT_FLAG) && flag === UPDATE_FLAG)
            return;
        this.changes.set(control, flag);
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
            this.resolvePackets(k[m[v]]());
        }
    }
    resolvePackets(packets) {
        const context = this.context;
        let currentData = packets.next();
        while (!currentData.done) {
            let giveParam = undefined;
            const packet = currentData.value;
            //@ts-ignore
            if (packet[IDENTITY_SYMBOL])
                giveParam = this.packetResolvers[packet[IDENTITY_SYMBOL]](this, context, packet);
            else
                context.post(packet);
            currentData = packets.next(giveParam);
        }
    }
    packetMethods = {
        [UPDATE_FLAG]: "displayUpdatePackets",
        [REMOVE_FLAG]: "displayDisposePackets",
        [INIT_FLAG]: "displayInitPackets"
    };
    packetResolvers = {
        [ACTION_IDENTITY_SYMBOL](controlManager, context, packet) {
            context.display?.setRegisterAction(packet.data.id);
            context.post(packet);
        }
    };
}

;// CONCATENATED MODULE: ./src/dynamic-editor/native/Editor/EditorDisplayManager.ts

const DISPLAY_MANAGERS = new WeakMap();
class PlayerDisplayManager {
    static hasDisplayManager(player) { return DISPLAY_MANAGERS.has(player); }
    static getDisplayManager(player) { return DISPLAY_MANAGERS.get(player); }
    //@ts-ignore
    player;
    uniques = new WeakMap();
    isReady = false;
    onClientReady = new NativeEvent();
    actions = new Map();
    constructor(player) {
        if (DISPLAY_MANAGERS.has(player))
            return DISPLAY_MANAGERS.get(player);
        DISPLAY_MANAGERS.set(player, this);
        this.player = player;
        this.onClientReady.subscribe(() => {
            //@ts-ignore
            this.isReady = true;
        });
    }
    setRegisterAction(action) {
        let uuid = this.getUnique(action) ?? UUID.generate();
        if (!this.actions.has(uuid))
            this.actions.set(uuid, action);
        this.setUnique(action, uuid);
        return uuid;
    }
    getRegisteredAction(uuid) { return this.actions.get(uuid); }
    hasRegisteredAction(uuid) { return this.actions.has(uuid); }
    hasUnique(obj) { return this.uniques.get(obj); }
    setUnique(obj, uuid) { return this.uniques.set(obj, uuid); }
    getUnique(obj) { return this.uniques.get(obj); }
    openCreateUnique(obj) {
        if (this.uniques.has(obj))
            return this.uniques.get(obj);
        else {
            const uid = UUID.generate();
            this.uniques.set(obj, uid);
            return uid;
        }
    }
}

;// CONCATENATED MODULE: ./src/dynamic-editor/native/Editor/EditorContext.ts






const CONTEXT_MANAGERS = new WeakMap();
const CONTEXT_BY_EXTENSION = new WeakMap();
const POST = server_namespaceObject.Player.prototype.postClientMessage;
class EditorContextManager {
    context;
    display;
    player;
    transactionManager;
    selectionManager;
    clipboardManager;
    controlManager;
    extension;
    onInitializeEvent = new NativeEvent();
    onReadyEvent = new NativeEvent();
    onShutdownEvent = new NativeEvent();
    actionManager = new Map();
    //@ts-ignore
    get isReady() { return this.display?.isReady; }
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
        Base_core.isNativeCall = true;
        this.controlManager = new EditorControlManager(this);
        this._eventReadyMethod = this.display.onClientReady.subscribe(() => this.onReadyEvent.trigger(this));
        //@ts-ignore
        this.extension = (new EditorExtension(this, that));
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
        POST.call(this.player, packet.id, JSON.stringify(packet.data, (k, v) => {
            if (typeof v === "object" && UNIQUE_SYMBOL in v)
                return this.display?.openCreateUnique(v);
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
            if (!display.isReady)
                display.onClientReady.trigger({ player, display });
            if (!display.hasRegisteredAction(actionId))
                return;
            TriggerEvent(display.getRegisteredAction(actionId)?.onActionExecute, new (PayloadLoaders.get(message.payload.type))(player, message.payload));
        }
    }
    [ReceiveEventId["Editor::ClientUXEvents"]](id, message, player) {
        console.warn(`§8No handler implementation for §r§l${id}§r§7  -->  §r§l${message.type} §r§8[${ReceiveEventEnum[id][message.type]}]`);
    }
}
const editorEventManager = new EditorEventManager();

;// CONCATENATED MODULE: ./src/dynamic-editor/native/Editor/index.ts





;// CONCATENATED MODULE: ./src/dynamic-editor/index.ts


const Destination = RedirectDestination;





;// CONCATENATED MODULE: ./src/dynamic-editor.ts


var __webpack_exports__AutoSizeStatusBarItem = __webpack_exports__.pF;
var __webpack_exports__BindedSource = __webpack_exports__.mj;
var __webpack_exports__BooleanProperty = __webpack_exports__.xv;
var __webpack_exports__BuildInPane = __webpack_exports__.uf;
var __webpack_exports__ConvertingProperty = __webpack_exports__.Os;
var __webpack_exports__Destination = __webpack_exports__.o6;
var __webpack_exports__EditorExtension = __webpack_exports__.MC;
var __webpack_exports__EditorMode = __webpack_exports__.je;
var __webpack_exports__Element = __webpack_exports__.W_;
var __webpack_exports__ExtensionInitializeEvent = __webpack_exports__.et;
var __webpack_exports__ExtensionInitializeEventData = __webpack_exports__.V2;
var __webpack_exports__ExtensionReadyEvent = __webpack_exports__.hV;
var __webpack_exports__ExtensionReadyEventData = __webpack_exports__.CS;
var __webpack_exports__ExtensionShutdownEvent = __webpack_exports__.CG;
var __webpack_exports__ExtensionShutdownEventData = __webpack_exports__._4;
var __webpack_exports__MenuActionItem = __webpack_exports__.MK;
var __webpack_exports__MenuOptionsItem = __webpack_exports__.hd;
var __webpack_exports__NumberProperty = __webpack_exports__.Y6;
var __webpack_exports__PlayerModeChangeEvent = __webpack_exports__.$W;
var __webpack_exports__PlayerModeChangeEventData = __webpack_exports__.uY;
var __webpack_exports__StatusBarAlignmentProperty = __webpack_exports__.V7;
var __webpack_exports__StatusBarItem = __webpack_exports__.wl;
var __webpack_exports__StatusBarItemAlignment = __webpack_exports__.se;
var __webpack_exports__StringProperty = __webpack_exports__.h_;
var __webpack_exports__ValueChangeEvent = __webpack_exports__.My;
var __webpack_exports__ValueChangeEventData = __webpack_exports__.xC;
export { __webpack_exports__AutoSizeStatusBarItem as AutoSizeStatusBarItem, __webpack_exports__BindedSource as BindedSource, __webpack_exports__BooleanProperty as BooleanProperty, __webpack_exports__BuildInPane as BuildInPane, __webpack_exports__ConvertingProperty as ConvertingProperty, __webpack_exports__Destination as Destination, __webpack_exports__EditorExtension as EditorExtension, __webpack_exports__EditorMode as EditorMode, __webpack_exports__Element as Element, __webpack_exports__ExtensionInitializeEvent as ExtensionInitializeEvent, __webpack_exports__ExtensionInitializeEventData as ExtensionInitializeEventData, __webpack_exports__ExtensionReadyEvent as ExtensionReadyEvent, __webpack_exports__ExtensionReadyEventData as ExtensionReadyEventData, __webpack_exports__ExtensionShutdownEvent as ExtensionShutdownEvent, __webpack_exports__ExtensionShutdownEventData as ExtensionShutdownEventData, __webpack_exports__MenuActionItem as MenuActionItem, __webpack_exports__MenuOptionsItem as MenuOptionsItem, __webpack_exports__NumberProperty as NumberProperty, __webpack_exports__PlayerModeChangeEvent as PlayerModeChangeEvent, __webpack_exports__PlayerModeChangeEventData as PlayerModeChangeEventData, __webpack_exports__StatusBarAlignmentProperty as StatusBarAlignmentProperty, __webpack_exports__StatusBarItem as StatusBarItem, __webpack_exports__StatusBarItemAlignment as StatusBarItemAlignment, __webpack_exports__StringProperty as StringProperty, __webpack_exports__ValueChangeEvent as ValueChangeEvent, __webpack_exports__ValueChangeEventData as ValueChangeEventData };
