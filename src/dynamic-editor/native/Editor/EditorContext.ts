import { ExtensionContext, ExtensionOptionalParameters, editor } from "@minecraft/server-editor-bindings";
import { NativeEvent, Packet, core } from "../../core/index";
import { EditorExtension } from "./EditorExtension";
import { editorEventManager } from "./EditorEventManager";
import { Player } from "@minecraft/server";

const CONTEXT_MANAGERS = new WeakMap();
const POST = Player.prototype.postClientMessage;
export class EditorContextManager{
    readonly context;
    readonly player;
    readonly transactionManager;
    readonly selectionManager;
    readonly extension;
    readonly onInitialiazeEvent = new NativeEvent<[this]>();
    readonly onReadyEvent = new NativeEvent<[this]>();
    readonly onShutdownEvent = new NativeEvent<[this]>();
    readonly onToolSelected = new NativeEvent();
    readonly onActionExecuted = new NativeEvent();
    readonly onPanePropertyChanged = new NativeEvent();
    readonly onPaneVisibilityChanged = new NativeEvent();
    isReady = true;
    /**@param {ExtensionContext} context  */
    constructor(context: ExtensionContext,that: new () => any){
        if(CONTEXT_MANAGERS.has(context)) return CONTEXT_MANAGERS.get(context);
        CONTEXT_MANAGERS.set(context,this);
        this.context = context;
        this.transactionManager = context.transactionManager;
        this.selectionManager = context.selectionManager;
        this.player = context.player;
        editorEventManager.onClientReady.subscribe(({player})=>{
            if(player === this.player) {
                this.isReady = true;
                this.onReadyEvent.trigger(this);
            }
        });
        core.isNativeCall = true;
        //@ts-ignore
        this.extension = (new EditorExtension(this,that)) as EditorExtension;
        core.isNativeCall = false;
        this.onInitialiazeEvent.trigger(this);
    }
    shutdown(){
        this.onShutdownEvent.trigger(this);
        this.isReady = false;
    }
    static Shutdown(context: ExtensionContext){
        const that = CONTEXT_MANAGERS.get(context);
        that?.shutdown();
    }
    post(packet: Packet){POST.call(this.player,packet.id,packet.getMessage());}
}

EditorExtension.registry = function (extensionName: string){
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