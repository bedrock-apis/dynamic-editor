import { ExtensionContext, ExtensionOptionalParameters, editor } from "@minecraft/server-editor-bindings";
import { IPacket, NativeEvent, UNIQUE_SYMBOL, core } from "../../core/index";
import { EditorExtension } from "./EditorExtension";
import { Player } from "@minecraft/server";
import { EditorControlManager } from "./EditorControlManager";
import { Action } from "./EditorActions";
import { PlayerDisplayManager } from "./EditorDisplayManager";
//@ts-ignore
import { globalContextRef } from "./EditorExtension";

const CONTEXT_MANAGERS = new WeakMap();
export const CONTEXT_BY_EXTENSION = new WeakMap<any,EditorContextManager>();
const POST = Player.prototype.postClientMessage;
export class EditorContextManager{
    readonly context;
    readonly display;
    readonly player;
    readonly cursor;
    readonly transactionManager;
    readonly selectionManager;
    readonly clipboardManager;
    readonly controlManager;
    readonly extension;
    readonly onInitializeEvent = new NativeEvent<[this]>();
    readonly onReadyEvent = new NativeEvent<[this]>();
    readonly onShutdownEvent = new NativeEvent<[this]>();
    readonly actionManager = new Map<string,Action>();
    get isReady(): boolean {return this.display?.isReady??false;}

    private _eventReadyMethod: any;
    /**@param {ExtensionContext} context  */
    constructor(context: ExtensionContext, that: new () => EditorExtension){
        if(CONTEXT_MANAGERS.has(context)) return CONTEXT_MANAGERS.get(context);
        CONTEXT_MANAGERS.set(context,this);
        this.context = context;
        this.display = new PlayerDisplayManager(context.player);
        this.transactionManager = context.transactionManager;
        this.selectionManager = context.selectionManager;
        this.clipboardManager = context.clipboardManager;
        this.player = context.player;
        this.cursor = context.cursor;
        core.isNativeCall = true;
        this.controlManager = new EditorControlManager(this);
        this._eventReadyMethod = this.display.onClientReady.subscribe(()=>this.onReadyEvent.trigger(this));
        globalContextRef.context = this;
        try {
            this.extension = new that();
        } catch (error) {
            globalContextRef.context = null;
            core.isNativeCall = false;
            throw error;
        }
        globalContextRef.context = null;
        core.isNativeCall = false;
        CONTEXT_BY_EXTENSION.set(this.extension,this);
        this.onInitializeEvent.trigger(this);
    }
    shutdown(){
        this.display?.onClientReady.unsubscribe(this._eventReadyMethod);
        this.onShutdownEvent.trigger(this);
    }
    static Shutdown(context: ExtensionContext){
        const that = CONTEXT_MANAGERS.get(context);
        that?.shutdown();
    }
    post(packet: IPacket){
        const d = this.display;
        POST.call(this.player,packet.id,JSON.stringify(packet.data,(k,v)=>{
            if(typeof v?.[UNIQUE_SYMBOL] === "function") return v?.[UNIQUE_SYMBOL]?.(d,this);
            return v;
        }));
    }

}

EditorExtension.Registry = function(extensionName: string){
    if(typeof this !== 'function') throw new TypeError("Bound to 'this' is not a function.");
    //@ts-ignore
    this.extensionName = (extensionName??this.extensionName)??this.name;
    if(typeof this.extensionName !== 'string') throw new ReferenceError("Extension name required.");
    registerExtension_Internal(this.extensionName,this,this.metadata??{});
    return this;
}
export function registerExtension_Internal(extensionName: string, that: any, metadata: ExtensionOptionalParameters){
    editor.registerExtension_Internal(extensionName,
        (context)=>{new EditorContextManager(context,that);},
        (context)=>{EditorContextManager.Shutdown(context);},
        metadata??{}
    );
}