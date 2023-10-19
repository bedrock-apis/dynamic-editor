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
  sj: () => (/* reexport */ BindedProperty),
  xv: () => (/* reexport */ BooleanProperty),
  uf: () => (/* reexport */ Definitions_BuildInPane),
  o6: () => (/* reexport */ Destination),
  MC: () => (/* reexport */ EditorExtension),
  et: () => (/* reexport */ ExtensionInitializeEvent),
  V2: () => (/* reexport */ ExtensionInitializeEventData),
  hV: () => (/* reexport */ ExtensionReadyEvent),
  CS: () => (/* reexport */ ExtensionReadyEventData),
  CG: () => (/* reexport */ ExtensionShutdownEvent),
  _4: () => (/* reexport */ ExtensionShutdownEventData),
  Y6: () => (/* reexport */ NumberProperty),
  V7: () => (/* reexport */ StatusBarAlignmentProperty),
  wl: () => (/* reexport */ StatusBarItem),
  se: () => (/* reexport */ StatusBarItemAlignment),
  h_: () => (/* reexport */ StringProperty)
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
class Events_PublicEvent {
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
var Definitions_RedirectDestination;
(function (RedirectDestination) {
    RedirectDestination[RedirectDestination["Documentation"] = 1] = "Documentation";
    RedirectDestination[RedirectDestination["Feedback"] = 2] = "Feedback";
    RedirectDestination[RedirectDestination["PauseScreen"] = 3] = "PauseScreen";
})(Definitions_RedirectDestination || (Definitions_RedirectDestination = {}));
/**@public */
var Definitions_BuildInPane;
(function (BuildInPane) {
    BuildInPane[BuildInPane["UISettings"] = 1] = "UISettings";
    BuildInPane[BuildInPane["WelcomePage"] = 2] = "WelcomePage";
    BuildInPane[BuildInPane["LogPanel"] = 3] = "LogPanel";
})(Definitions_BuildInPane || (Definitions_BuildInPane = {}));
var ActionType;
(function (ActionType) {
    ActionType["NoArgsAction"] = "NoArgsAction";
    ActionType["MouseRayCastAction"] = "MouseRayCastAction";
})(ActionType || (ActionType = {}));
;
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
var Definitions_ServerUXEventType;
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
})(Definitions_ServerUXEventType || (Definitions_ServerUXEventType = {}));
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
var Definitions_PostEventId;
(function (PostEventId) {
    PostEventId["Editor::ServerUXEvents"] = "Editor::ServerUXEvents";
    PostEventId["Editor::ServerInputBindingEvents"] = "Editor::ServerInputBindingEvents";
    PostEventId["Editor::ServerActionEvents"] = "Editor::ServerActionEvents";
})(Definitions_PostEventId || (Definitions_PostEventId = {}));
;
var PostEventName;
(function (PostEventName) {
    PostEventName["ServerUXEvents"] = "Editor::ServerUXEvents";
    PostEventName["ServerActionEvents"] = "Editor::ServerActionEvents";
    PostEventName["ServerInputBindingEvents"] = "Editor::ServerInputBindingEvents";
})(PostEventName || (PostEventName = {}));
const PostEventEnum = {
    [Definitions_PostEventId["Editor::ServerUXEvents"]]: Definitions_ServerUXEventType,
    [Definitions_PostEventId["Editor::ServerInputBindingEvents"]]: ServerInputBindingEventType,
    [Definitions_PostEventId["Editor::ServerActionEvents"]]: ServerActionEventType,
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

class PacketManager {
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
}
class Packet {
    data;
    id;
    constructor(id, data) {
        this.id = id;
        this.data = data;
    }
    getMessage() { return JSON.stringify(this.data); }
    setType(type) {
        this.data.type = type;
        return this;
    }
}
class ServerUXEventPacket extends Packet {
    constructor(data) { super(Definitions_PostEventId["Editor::ServerUXEvents"], data); }
}
class ServerActionEventPacket extends (/* unused pure expression or super */ null && (Packet)) {
    constructor(data) { super(PostEventId["Editor::ServerActionEvents"], data); }
}
class ServerInputBindingEventPacket extends (/* unused pure expression or super */ null && (Packet)) {
    constructor(data) { super(PostEventId["Editor::ServerInputBindingEvents"], data); }
}
class RedirectToDestinationPacket extends (/* unused pure expression or super */ null && (ServerUXEventPacket)) {
    constructor(destination) { super({ type: ServerUXEventType.RedirectToDestination, destination: destination }); }
}
class UpdateBuildInPanePacket extends (/* unused pure expression or super */ null && (ServerUXEventPacket)) {
    constructor(panelId, visible) { super({ type: ServerUXEventType.UpdateBuildInPanes, panel: panelId, visible }); }
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

;// CONCATENATED MODULE: ./src/dynamic-editor/native/Events.ts

/**@beta */
class EventData {
    constructor() { }
}
/**@beta */
class ContextEventData extends EventData {
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
/**@beta */
class ExtensionReadyEventData extends ExtensionEventData {
}
;
/**@beta */
class ExtensionShutdownEventData extends ExtensionEventData {
}
;
/**@beta */
class ExtensionInitializeEvent extends Events_PublicEvent {
}
;
/**@beta */
class ExtensionReadyEvent extends Events_PublicEvent {
}
;
/**@beta */
class ExtensionShutdownEvent extends Events_PublicEvent {
}
;

;// CONCATENATED MODULE: ./src/dynamic-editor/native/Editor/EditorExtension.js



/**@public */
class EditorExtension{   
    Shutdown(){};
    Ready(){};
    Initialize(){};
    onInitialize = new ExtensionInitializeEvent();
    onReady = new ExtensionReadyEvent();
    onShutdown = new ExtensionShutdownEvent();
    /**@param {import("./EditorContext").EditorContextManager} context  */
    constructor(context, that = EditorExtension){
        if(!Base_core.isNativeCall) throw new TypeError(Base_NoConstructor + EditorExtension.name);
        this.player = context.player;
        this.client = context.client;
        this.statusBar = context.controlManager.statusBar;
        context.onInitialiazeEvent.subscribe(()=>{
            try {
                this.Initialiaze?.(this.public);
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
        Object.setPrototypeOf(this,that.prototype??EditorExtension.prototype);
    }
}
/*
export const PublicEditorExtension = CreateClass("EditorExtension",{
    Shutdown(){},
    Ready(){},
    Initialize(){},
    get player(): Player{return super.getCache(this).player;},
    get client(){return GetPublicInstance(super.getCache(this).context.client);}
}).constructor as unknown as typeof EX;*/
;// CONCATENATED MODULE: external "@minecraft/server-editor-bindings"
var x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var y = x => () => x
const server_editor_bindings_namespaceObject = x({ ["editor"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_editor_bindings_e2bf1028__.editor });
;// CONCATENATED MODULE: external "@minecraft/server"
var server_x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var server_y = x => () => x
const server_namespaceObject = server_x({ ["Player"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.Player, ["system"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.system, ["world"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.world });
;// CONCATENATED MODULE: ./src/dynamic-editor/native/Editor/EditorEventManager.ts


class EditorEventManager {
    onClientReady = new NativeEvent();
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
        if (message?.type === ReceiveLifecycleEventType.PlayerReady)
            this.onClientReady.trigger({ player });
    }
    [ReceiveEventId["Editor::ClientActionEvents"]](id, message, player) {
        console.warn(`§8No handler implementation for §r§l${id}§r§7  -->  §r§l${message.type} §r§8[${ReceiveEventEnum[id][message.type]}]`);
    }
    [ReceiveEventId["Editor::ClientUXEvents"]](id, message, player) {
        console.warn(`§8No handler implementation for §r§l${id}§r§7  -->  §r§l${message.type} §r§8[${ReceiveEventEnum[id][message.type]}]`);
    }
}
const editorEventManager = new EditorEventManager();

;// CONCATENATED MODULE: ./src/dynamic-editor/native/Controls/GeneralUI.ts

const UPDATE_FLAG = 1;
const REMOVE_FLAG = 2;
const NULL_TYPE = Symbol("NULL");
class Postable {
    REMOVE_TYPE = null;
    UPDATE_TYPE = null;
    getData(flags = 0) { return { type: ((flags & REMOVE_FLAG) === REMOVE_FLAG ? this.REMOVE_TYPE : this.UPDATE_TYPE) }; }
    *getPackets(flags) { yield new ServerUXEventPacket(this.getData(flags)); }
}
class UniquePostable extends Postable {
    id = UUID.generate();
    getData(flags) {
        const data = super.getData(flags);
        data.id = this.id;
        return data;
    }
}
class Changeable {
    onChange = new PublicEvent;
    constructor() { }
    ;
}
class Property {
    static UNIQUE_TYPE = NULL_TYPE;
    static EXPECTED_VALUE_TYPE = undefined;
    _type;
    _expectedType;
    onValueChange = new Events_PublicEvent;
    constructor() { this._type = new.target.UNIQUE_TYPE; this._expectedType = new.target.EXPECTED_VALUE_TYPE; }
    ;
}
class ElemenentProperty extends Property {
    value;
    defualtValue;
    typeOf;
    constructor(defaultValue) {
        super();
        this.typeOf = typeof defaultValue;
        this.value = defaultValue;
        this.defualtValue = defaultValue;
    }
    isValidType(v) { return typeof v === this.typeOf; }
    getType(v) { return v; }
    setValue(value) {
        if (!this.isValidType(value))
            throw new TypeError("Invalid value type: '" + value + "' expected " + (this._expectedType ?? this.typeOf));
        //@ts-ignore
        this.value = this.getType(value);
        TriggerEvent(this.onValueChange, { oldValue: this.value ?? this.defualtValue, newValue: value });
        return this;
    }
    getValue() { return this.value ?? this.defualtValue; }
    toJSON() { return this.getValue(); }
    valueOf() { return this.getValue(); }
}
class StringProperty extends ElemenentProperty {
    static UNIQUE_TYPE = Symbol("StringProperty");
    constructor(value) { super(value ?? ""); }
}
class NumberProperty extends ElemenentProperty {
    static UNIQUE_TYPE = Symbol("NumberProperty");
    constructor(value) { super(value ?? 0); }
}
class BooleanProperty extends ElemenentProperty {
    static UNIQUE_TYPE = Symbol("BooleanProperty");
    constructor(value) { super(value ?? false); }
}
class CustomProperty extends ElemenentProperty {
    constructor(value) { super(value ?? false); }
}
class BindedProperty extends ElemenentProperty {
    type;
    bindProperty;
    constructor(property, ongoingConverter, as_unique_type) {
        //@ts-ignore
        super(ongoingConverter(property.value, property));
        this.type = as_unique_type;
        this.bindProperty = property;
        property.onValueChange.subscribe((e) => {
            const newValue = ongoingConverter(e.newValue, property);
            TriggerEvent(this.onValueChange, { oldValue: this.value ?? this.defualtValue, newValue: newValue });
            //@ts-ignore
            this.value = newValue;
        });
    }
    setValue() {
        throw new TypeError("Binded property cann't be modified.");
    }
}
class Element extends UniquePostable {
    //@ts-ignore
    onPropertyValueChange = new Events_PublicEvent;
    propertyBag;
    _methods;
    constructor(properties) {
        super();
        this._methods = new WeakMap();
        const bag = {};
        for (const propertyName of Object.getOwnPropertyNames(properties)) {
            const prop = properties[propertyName];
            bag[propertyName] = prop;
            const method = prop.onValueChange.subscribe(e => {
                //@ts-ignore
                TriggerEvent(this.onPropertyValueChange, {
                    element: this,
                    newValue: e.newValue,
                    propertyName: propertyName,
                    oldValue: e.oldValue,
                    property: prop
                });
            });
            this._methods.set(prop, method);
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
            throw new TypeError("Can't assign '" + property._type.description + "' type to type of '" + prop._type?.description + "'");
        prop.onValueChange.unsubscribe(this._methods.get(prop));
        this._methods.delete(prop);
        const method = property.onValueChange.subscribe(e => {
            //@ts-ignore
            TriggerEvent(this.onPropertyValueChange, {
                element: this,
                newValue: e.newValue,
                propertyName: propertyName,
                oldValue: e.oldValue,
                property: property
            });
        });
        this._methods.set(property, method);
        this.propertyBag[propertyName] = property;
        return this;
    }
    //@ts-ignore
    setPropertyValue(propertyName, value) {
        this.propertyBag[propertyName].setValue(value);
        return this;
    }
    getData(flags) {
        const data = super.getData(flags);
        for (const key of this.getPropertyNames())
            data[key] = this.propertyBag[key];
        return data;
    }
}
class Control extends Postable {
    onControlUpdate;
    _additions;
    _deletions;
    _manager;
    _eventHandler;
    _instanceConstructor;
    _isDisposed = false;
    //@ts-ignore
    get isDisposed() { return this._isDisposed; }
    //@ts-ignore
    get elementsLength() { return this._eventHandler.size; }
    constructor(manager, instanceOf) {
        if (!Base_core.isNativeCall)
            throw new ReferenceError(Base_NoConstructor + Control.name);
        super();
        this._instanceConstructor = instanceOf;
        this.onControlUpdate = new NativeEvent;
        this._manager = manager;
        this._eventHandler = new Map;
        this._additions = new Set;
        this._deletions = new Set;
    }
    _onChange(element) {
        if (!this._deletions.has(element)) {
            this._additions.add(element);
            this.onControlUpdate.trigger(this, element, UPDATE_FLAG);
            this._pushChanges();
        }
    }
    addItem(item) {
        if (this._isDisposed)
            throw new ReferenceError("You can't manipulate with disposed elements.");
        if (!(item instanceof this._instanceConstructor))
            return false;
        if (this._eventHandler.has(item))
            return true;
        const method = item.onPropertyValueChange.subscribe(() => this._onChange(item));
        this._eventHandler.set(item, method);
        this._additions.add(item);
        this._deletions.delete(item);
        this.onControlUpdate.trigger(this, item, UPDATE_FLAG);
        this._pushChanges();
        return true;
    }
    removeItem(item) {
        if (this._isDisposed)
            throw new ReferenceError("You can't manipulate with disposed elements.");
        if (!(item instanceof this._instanceConstructor))
            return false;
        if (this._eventHandler.has(item)) {
            const method = this._eventHandler.get(item);
            item.onPropertyValueChange.unsubscribe(method);
            this._additions.delete(item);
            this._deletions.add(item);
            this.onControlUpdate.trigger(this, item, REMOVE_FLAG);
            this._pushChanges();
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
    *getPackets() {
        if (this._isDisposed)
            throw new ReferenceError("You can't manipulate with disposed elements.");
        for (const control of this._additions)
            yield* control.getPackets(UPDATE_FLAG);
        for (const control of this._deletions)
            yield* control.getPackets(REMOVE_FLAG);
    }
    dispose() {
        this._isDisposed = true;
        for (const key of this._eventHandler.keys())
            key.onPropertyValueChange.unsubscribe(this._eventHandler.get(key));
        this._deletions.clear();
        this._additions.clear();
        this._eventHandler.clear();
    }
    _pushChanges() {
        this._manager.changes.add(this);
        this._manager.setUpdate();
    }
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

;// CONCATENATED MODULE: ./src/dynamic-editor/native/Controls/Elements.ts



class StatusBarItem extends Element {
    constructor() {
        super({
            alignment: new StatusBarAlignmentProperty(0),
            enabled: new BooleanProperty(true),
            visible: new BooleanProperty(true),
            text: new StringProperty(""),
            size: new NumberProperty(0)
        });
    }
    REMOVE_TYPE = Definitions_ServerUXEventType.ReleaseStatusBarItem;
    UPDATE_TYPE = Definitions_ServerUXEventType.UpdateStatusBarItem;
}

;// CONCATENATED MODULE: ./src/dynamic-editor/native/Controls/Controls.ts


class StatusBarControl extends Control {
    constructor(manager) { super(manager, StatusBarItem); }
}

;// CONCATENATED MODULE: ./src/dynamic-editor/native/Controls/index.ts





;// CONCATENATED MODULE: ./src/dynamic-editor/native/Editor/EditorControlManager.ts



class EditorControlManager {
    context;
    changes;
    statusBar;
    get isReady() { return this._ready ?? this.context.isReady; }
    set isReady(v) { this._ready = v; }
    constructor(context) {
        if (!Base_core.isNativeCall)
            throw new ReferenceError(Base_NoConstructor + EditorControlManager.name);
        this.context = context;
        this.changes = new Set();
        this.context.onReadyEvent.subscribe(() => this.build());
        this.context.onShutdownEvent.subscribe(() => {
            this.isReady = false;
            if (typeof this.task === "number")
                server_namespaceObject.system.clearRun(this.task);
            this.task = null;
            //Dispose all controls on when shutdown
            this.statusBar.dispose();
            //@ts-ignore
            this.statusBar = null;
        });
        this.task = null;
        this.statusBar = new StatusBarControl(this);
    }
    setUpdate() { if (this.isReady && this.task === null)
        return (this.task = server_namespaceObject.system.run(() => this.build())) || true; }
    _ready;
    task;
    build() {
        this.task = null;
        const context = this.context;
        for (const control of this.changes) {
            for (const packet of control.getPackets())
                context.post(packet);
        }
    }
}

;// CONCATENATED MODULE: ./src/dynamic-editor/native/Editor/EditorContext.ts






const CONTEXT_MANAGERS = new WeakMap();
const POST = server_namespaceObject.Player.prototype.postClientMessage;
class EditorContextManager {
    context;
    player;
    transactionManager;
    selectionManager;
    controlManager;
    extension;
    onInitialiazeEvent = new NativeEvent();
    onReadyEvent = new NativeEvent();
    onShutdownEvent = new NativeEvent();
    onToolSelected = new NativeEvent();
    onActionExecuted = new NativeEvent();
    onPanePropertyChanged = new NativeEvent();
    onPaneVisibilityChanged = new NativeEvent();
    isReady = false;
    /**@param {ExtensionContext} context  */
    constructor(context, that) {
        if (CONTEXT_MANAGERS.has(context))
            return CONTEXT_MANAGERS.get(context);
        CONTEXT_MANAGERS.set(context, this);
        this.context = context;
        this.transactionManager = context.transactionManager;
        this.selectionManager = context.selectionManager;
        this.player = context.player;
        editorEventManager.onClientReady.subscribe(({ player }) => {
            if (player === this.player) {
                this.isReady = true;
                this.onReadyEvent.trigger(this);
            }
        });
        Base_core.isNativeCall = true;
        this.controlManager = new EditorControlManager(this);
        //@ts-ignore
        this.extension = (new EditorExtension(this, that));
        Base_core.isNativeCall = false;
        this.onInitialiazeEvent.trigger(this);
    }
    shutdown() {
        this.onShutdownEvent.trigger(this);
        this.isReady = false;
    }
    static Shutdown(context) {
        const that = CONTEXT_MANAGERS.get(context);
        that?.shutdown();
    }
    post(packet) { POST.call(this.player, packet.id, packet.getMessage()); }
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

;// CONCATENATED MODULE: ./src/dynamic-editor/native/Editor/index.ts





;// CONCATENATED MODULE: ./src/dynamic-editor/index.ts
/*
import { Editor } from "./public_bin/Editor";

export { Editor, EditorEvents } from "./public_bin/Editor";
export { ClientReadyEvent } from "./public_bin/PublicEvents";*/


const Destination = Definitions_RedirectDestination;



/*
export const editor: Editor = CreateInstance(Editor,e);*/ 

;// CONCATENATED MODULE: ./src/dynamic-editor.ts


var __webpack_exports__BindedProperty = __webpack_exports__.sj;
var __webpack_exports__BooleanProperty = __webpack_exports__.xv;
var __webpack_exports__BuildInPane = __webpack_exports__.uf;
var __webpack_exports__Destination = __webpack_exports__.o6;
var __webpack_exports__EditorExtension = __webpack_exports__.MC;
var __webpack_exports__ExtensionInitializeEvent = __webpack_exports__.et;
var __webpack_exports__ExtensionInitializeEventData = __webpack_exports__.V2;
var __webpack_exports__ExtensionReadyEvent = __webpack_exports__.hV;
var __webpack_exports__ExtensionReadyEventData = __webpack_exports__.CS;
var __webpack_exports__ExtensionShutdownEvent = __webpack_exports__.CG;
var __webpack_exports__ExtensionShutdownEventData = __webpack_exports__._4;
var __webpack_exports__NumberProperty = __webpack_exports__.Y6;
var __webpack_exports__StatusBarAlignmentProperty = __webpack_exports__.V7;
var __webpack_exports__StatusBarItem = __webpack_exports__.wl;
var __webpack_exports__StatusBarItemAlignment = __webpack_exports__.se;
var __webpack_exports__StringProperty = __webpack_exports__.h_;
export { __webpack_exports__BindedProperty as BindedProperty, __webpack_exports__BooleanProperty as BooleanProperty, __webpack_exports__BuildInPane as BuildInPane, __webpack_exports__Destination as Destination, __webpack_exports__EditorExtension as EditorExtension, __webpack_exports__ExtensionInitializeEvent as ExtensionInitializeEvent, __webpack_exports__ExtensionInitializeEventData as ExtensionInitializeEventData, __webpack_exports__ExtensionReadyEvent as ExtensionReadyEvent, __webpack_exports__ExtensionReadyEventData as ExtensionReadyEventData, __webpack_exports__ExtensionShutdownEvent as ExtensionShutdownEvent, __webpack_exports__ExtensionShutdownEventData as ExtensionShutdownEventData, __webpack_exports__NumberProperty as NumberProperty, __webpack_exports__StatusBarAlignmentProperty as StatusBarAlignmentProperty, __webpack_exports__StatusBarItem as StatusBarItem, __webpack_exports__StatusBarItemAlignment as StatusBarItemAlignment, __webpack_exports__StringProperty as StringProperty };
