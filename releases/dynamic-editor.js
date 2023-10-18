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
  uf: () => (/* reexport */ Definitions_BuildInPane),
  o6: () => (/* reexport */ Definitions_RedirectDestination),
  MC: () => (/* reexport */ EditorExtension),
  et: () => (/* reexport */ ExtensionInitializeEvent),
  V2: () => (/* reexport */ ExtensionInitializeEventData),
  hV: () => (/* reexport */ ExtensionReadyEvent),
  CS: () => (/* reexport */ ExtensionReadyEventData),
  CG: () => (/* reexport */ ExtensionShutdownEvent),
  _4: () => (/* reexport */ ExtensionShutdownEventData)
});

;// CONCATENATED MODULE: ./.bin/dynamic-editor/core/Events.js
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

;// CONCATENATED MODULE: ./.bin/dynamic-editor/core/Base.js
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

;// CONCATENATED MODULE: ./.bin/dynamic-editor/core/Definitions.js
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

;// CONCATENATED MODULE: ./.bin/dynamic-editor/core/APIBuilder.js

const $native_functions = new WeakSet();
const APIBuilder_toString = Function.prototype.toString;
const call = Function.prototype.call.bind(Function.prototype.call);
const FuncProto = Function.prototype;
const ObjProto = Object.prototype;
$native_functions.add(Function.prototype.toString = function () {
    if ($native_functions.has(this))
        return `function ${this.name}() {\n    [native code]\n}`;
    return call(APIBuilder_toString, this);
});
const constructors = new WeakMap();
const PUBLIC_CACHES = new WeakMap();
function ReleaseCache(constructor, cache) {
    const k = PUBLIC_CACHES.get(cache);
    PUBLIC_CACHES.delete(cache);
    return constructors.get(constructor)?.cache?.delete?.(k) ?? false;
}
function GetPublicInstance(cache) { return PUBLIC_CACHES.get(cache); }
function IsRegistered(func) { return constructors.has(func) || func === FuncProto; }
function CreateMethodFunction(name, func, manager) {
    const f = function () {
        try {
            const cache = manager.getCache(this);
            if (!cache)
                throw new ReferenceError(ObjectBoundNotExist);
            return call(func, this, cache, ...arguments);
        }
        catch (error) {
            throw new error.constructor(error.message);
        }
    };
    $native_functions.add(f);
    if (typeof name === "string")
        Object.defineProperty(f, "name", { value: name, configurable: true, enumerable: true, writable: false });
    return f;
}
function CreateGetterFunction(name, func, manager) {
    const f = function () {
        try {
            const cache = manager.getCache(this);
            if (!cache)
                return undefined;
            return call(func, this, cache, ...arguments);
        }
        catch (error) {
            throw new error.constructor(error.message);
        }
    };
    $native_functions.add(f);
    if (typeof name === "string")
        Object.defineProperty(f, "name", { value: name, configurable: true, enumerable: true, writable: false });
    return f;
}
class Manager {
    constructor() {
        this.cache = new WeakMap();
        this.getCache = (that) => this.cache.get(that);
        this.hasCache = (that) => this.cache.has(that);
        this.setCache = (that, it) => this.cache.set(that, it);
    }
}
function RegisterClass(classConstructor) {
    if (IsRegistered(classConstructor))
        return constructors.get(classConstructor);
    if (!IsRegistered(Object.getPrototypeOf(classConstructor)))
        throw new ReferenceError("Parent class is not registred.");
    const m = new Manager();
    constructors.set(classConstructor, m);
    return m;
}
function CreateInstance(constructor, cache, proto = constructor.prototype) {
    if (!IsRegistered(constructor))
        throw new ReferenceError("Constructor is not registered.");
    let con = constructor;
    const instance = Object.create(proto);
    while (con != FuncProto & con != null & con != ObjProto) {
        const m = constructors.get(con);
        m.setCache(instance, cache);
        con = Object.getPrototypeOf(con);
    }
    PUBLIC_CACHES.set(cache, instance);
    return instance;
}
function CreateClass(name, properties, func, extending = FuncProto) {
    properties = properties ?? {};
    func = func ??= function () {
        if (!new.target)
            throw new TypeError(NewKeyword);
        if (!core.isNativeCall)
            throw new ReferenceError(NoConstructor + name);
    };
    Object.defineProperty(func, "name", { value: name, configurable: true, enumerable: true, writable: false });
    Object.setPrototypeOf(func, extending);
    Object.setPrototypeOf(func.prototype, extending.prototype ?? ObjProto);
    $native_functions.add(func);
    const manager = RegisterClass(func);
    const proto = func.prototype;
    Object.setPrototypeOf(properties, manager);
    for (const key of Object.getOwnPropertyNames(properties)) {
        const { value, get, set, enumerable, configurable, writable } = Object.getOwnPropertyDescriptor(properties, key);
        if (typeof value === "function") {
            Object.defineProperty(proto, key, { value: CreateMethodFunction(key, value, manager), enumerable, configurable, writable });
        }
        else if (get || set)
            Object.defineProperty(proto, key, { get: typeof get === "function" ? CreateGetterFunction(key, get, manager) : undefined, set: typeof set === "function" ? CreateMethodFunction(key, set, manager) : undefined, enumerable, configurable });
    }
    for (const key of Object.getOwnPropertySymbols(properties)) {
        const { value, get, set, enumerable, configurable, writable } = Object.getOwnPropertyDescriptor(properties, key);
        if (typeof value === "function") {
            Object.defineProperty(proto, key, { value: CreateMethodFunction(key, value, manager), enumerable, configurable, writable });
        }
        else if (get || set)
            Object.defineProperty(proto, key, { get: typeof get === "function" ? CreateGetterFunction(key, get, manager) : undefined, set: typeof set === "function" ? CreateMethodFunction(key, set, manager) : undefined, enumerable, configurable });
    }
    return { constructor: func, manager };
}

;// CONCATENATED MODULE: ./.bin/dynamic-editor/core/Packets.js

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
class ServerUXEventPacket extends (/* unused pure expression or super */ null && (Packet)) {
    constructor(data) { super(PostEventId["Editor::ServerUXEvents"], data); }
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

;// CONCATENATED MODULE: ./.bin/dynamic-editor/core/index.js






;// CONCATENATED MODULE: ./.bin/dynamic-editor/native/Editor/Editor.js
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

;// CONCATENATED MODULE: ./.bin/dynamic-editor/native/Events.js

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
class ExtensionInitializeEvent extends PublicEvent {
}
;
/**@beta */
class ExtensionReadyEvent extends PublicEvent {
}
;
/**@beta */
class ExtensionShutdownEvent extends PublicEvent {
}
;

;// CONCATENATED MODULE: ./.bin/dynamic-editor/native/Editor/EditorExtension.js


/**@public */
class EditorExtension {
    Shutdown() { }
    ;
    Ready() { }
    ;
    Initialize() { }
    ;
    onInitialize = new ExtensionInitializeEvent();
    onReady = new ExtensionReadyEvent();
    onShutdown = new ExtensionShutdownEvent();
    /**@param {import("./EditorContext").EditorContextManager} context  */
    constructor(context, that = EditorExtension) {
        if (!Base_core.isNativeCall)
            throw new TypeError(Base_NoConstructor + EditorExtension.name);
        this.player = context.player;
        this.client = context.client;
        context.onInitialiazeEvent.subscribe(() => {
            try {
                this.Initialiaze?.(this.public);
            }
            catch (error) {
                console.error(error, error.stack);
            }
            TriggerEvent(this.onInitialize, new ExtensionInitializeEventData(this));
        });
        context.onReadyEvent.subscribe(() => {
            try {
                this.Ready?.(this.public);
            }
            catch (error) {
                console.error(error, error.stack);
            }
            TriggerEvent(this.onReady, new ExtensionReadyEventData(this));
        });
        context.onShutdownEvent.subscribe(() => {
            TriggerEvent(this.onShutdown, new ExtensionShutdownEventData(this));
            try {
                this.Shutdown?.(this.public);
            }
            catch (error) {
                console.error(error, error.stack);
            }
        });
        Object.setPrototypeOf(this, that.prototype ?? EditorExtension.prototype);
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
const server_namespaceObject = server_x({ ["world"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.world });
;// CONCATENATED MODULE: ./.bin/dynamic-editor/native/Editor/EditorEventManager.js


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

;// CONCATENATED MODULE: ./.bin/dynamic-editor/native/Editor/EditorContext.js




const CONTEXT_MANAGERS = new WeakMap();
class EditorContextManager {
    context;
    player;
    transactionManager;
    selectionManager;
    extension;
    onInitialiazeEvent = new NativeEvent();
    onReadyEvent = new NativeEvent();
    onShutdownEvent = new NativeEvent();
    onToolSelected = new NativeEvent();
    onActionExecuted = new NativeEvent();
    onPanePropertyChanged = new NativeEvent();
    onPaneVisibilityChanged = new NativeEvent();
    isValid = true;
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
            if (player === this.player)
                this.onReadyEvent.trigger(this);
        });
        Base_core.isNativeCall = true;
        //@ts-ignore
        this.extension = (new EditorExtension(this, that));
        Base_core.isNativeCall = false;
        this.onInitialiazeEvent.trigger(this);
    }
    shutdown() {
        this.onShutdownEvent.trigger(this);
        this.isValid = false;
    }
    static Shutdown(context) {
        const that = CONTEXT_MANAGERS.get(context);
        that?.shutdown();
    }
}
EditorExtension.registry = function (extensionName) {
    if (typeof this !== 'function')
        throw new TypeError("Bound to 'this' is not a function.");
    this.extensionName = (extensionName ?? this.extensionName) ?? this.name;
    if (typeof this.extensionName !== 'string')
        throw new ReferenceError("Extension name required.");
    registerExtension_Internal(this.extensionName, this, this.metadata ?? {});
    return this;
};
function registerExtension_Internal(extensionName, that, metadata) {
    server_editor_bindings_namespaceObject.editor.registerExtension_Internal(extensionName, (context) => { new EditorContextManager(context, that); }, (context) => { EditorContextManager.Shutdown(context); }, metadata ?? {});
}

;// CONCATENATED MODULE: ./.bin/dynamic-editor/native/Editor/index.js





;// CONCATENATED MODULE: ./.bin/dynamic-editor/index.js
/*
import { Editor } from "./public_bin/Editor";

export { Editor, EditorEvents } from "./public_bin/Editor";
export { ClientReadyEvent } from "./public_bin/PublicEvents";*/



/*
export const editor: Editor = CreateInstance(Editor,e);*/ 

;// CONCATENATED MODULE: ./.bin/dynamic-editor.js


var __webpack_exports__BuildInPane = __webpack_exports__.uf;
var __webpack_exports__Destination = __webpack_exports__.o6;
var __webpack_exports__EditorExtension = __webpack_exports__.MC;
var __webpack_exports__ExtensionInitializeEvent = __webpack_exports__.et;
var __webpack_exports__ExtensionInitializeEventData = __webpack_exports__.V2;
var __webpack_exports__ExtensionReadyEvent = __webpack_exports__.hV;
var __webpack_exports__ExtensionReadyEventData = __webpack_exports__.CS;
var __webpack_exports__ExtensionShutdownEvent = __webpack_exports__.CG;
var __webpack_exports__ExtensionShutdownEventData = __webpack_exports__._4;
export { __webpack_exports__BuildInPane as BuildInPane, __webpack_exports__Destination as Destination, __webpack_exports__EditorExtension as EditorExtension, __webpack_exports__ExtensionInitializeEvent as ExtensionInitializeEvent, __webpack_exports__ExtensionInitializeEventData as ExtensionInitializeEventData, __webpack_exports__ExtensionReadyEvent as ExtensionReadyEvent, __webpack_exports__ExtensionReadyEventData as ExtensionReadyEventData, __webpack_exports__ExtensionShutdownEvent as ExtensionShutdownEvent, __webpack_exports__ExtensionShutdownEventData as ExtensionShutdownEventData };
