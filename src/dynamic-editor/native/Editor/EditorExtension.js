import { core, NoConstructor, TriggerEvent } from "../../core/index";
import { 
    ExtensionInitializeEvent, ExtensionInitializeEventData, 
    ExtensionReadyEvent, ExtensionReadyEventData, 
    ExtensionShutdownEvent, ExtensionShutdownEventData } from "../Events";

/**@public */
export class EditorExtension{   
    Shutdown(){};
    Ready(){};
    Initialize(){};
    onInitialize = new ExtensionInitializeEvent();
    onReady = new ExtensionReadyEvent();
    onShutdown = new ExtensionShutdownEvent();
    /**@param {import("./EditorContext").EditorContextManager} context  */
    constructor(context, that = EditorExtension){
        if(!core.isNativeCall) throw new TypeError(NoConstructor + EditorExtension.name);
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