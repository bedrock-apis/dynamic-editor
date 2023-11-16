import { BuildInPane, core, NoConstructor, ObjectBoundNotExist, RedirectDestination, TriggerEvent } from "../../core/index";
import { 
    ExtensionInitializeEvent, ExtensionInitializeEventData, 
    ExtensionReadyEvent, ExtensionReadyEventData, 
    ExtensionShutdownEvent, ExtensionShutdownEventData, PlayerModeChangeEvent, PlayerModeChangeEventData } from "../Events";
import { RedirectToDestinationPacket, UpdateBuildInPanePacket } from "../Packets";
import { CONTEXT_BY_EXTENSION } from "./EditorContext";

/**@public */
export class EditorExtension{
    Shutdown(){};
    Ready(){};
    Initialize(){};
    onInitialize = new ExtensionInitializeEvent();
    onReady = new ExtensionReadyEvent();
    onShutdown = new ExtensionShutdownEvent();
    onPlayerModeChange = new PlayerModeChangeEvent();
    /**@param {import("./EditorContext").EditorContextManager} context  */
    constructor(context, that = EditorExtension){
        if(!core.isNativeCall) throw new TypeError(NoConstructor + EditorExtension.name);
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
        if(!CONTEXT_BY_EXTENSION.has(this)) throw new ReferenceError(ObjectBoundNotExist);
        if(!(destination in RedirectDestination)) throw new TypeError("Unknow Destination: " + destination);
        if(typeof destination === "string") destination = RedirectDestination[destination];
        CONTEXT_BY_EXTENSION.get(this).post(new RedirectToDestinationPacket(destination));
    }
    setBuildInPaneVisibility(pane, visible = true){
        if(!CONTEXT_BY_EXTENSION.has(this)) throw new ReferenceError(ObjectBoundNotExist);
        if(!(pane in BuildInPane)) throw new TypeError("Unknow pane: " + pane);
        if(typeof pane === "string") destination = BuildInPane[pane];
        CONTEXT_BY_EXTENSION.get(this).post(new UpdateBuildInPanePacket(pane,!!visible));
    }
}