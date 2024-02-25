import { BuildInPane, core, NoConstructor, ObjectBoundNotExist, RedirectDestination, TriggerEvent } from "../../core/index";
import { 
    ExtensionInitializeEvent, ExtensionInitializeEventData, 
    ExtensionReadyEvent, ExtensionReadyEventData, 
    ExtensionShutdownEvent, ExtensionShutdownEventData, PlayerModeChangeEvent, PlayerModeChangeEventData } from "../Events";
import { RedirectToDestinationPacket, UpdateBuildInPanePacket } from "../Packets";
import { CONTEXT_BY_EXTENSION, EditorContextManager } from "./EditorContext";

export const globalContextRef = {
    context:null
};
/**@public */
export class EditorExtension{
    Shutdown(){};
    Ready(){};
    Initialize(){};
    onInitialize = new ExtensionInitializeEvent();
    onReady = new ExtensionReadyEvent();
    onShutdown = new ExtensionShutdownEvent();
    onPlayerModeChange = new PlayerModeChangeEvent();
    constructor(){
        if((!core.isNativeCall) || (!globalContextRef.context)) throw new TypeError(NoConstructor + new.target.name);
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
            (async ()=>await this.Initialize?.(this))().catch(er=>console.error(er,er?.stack));
            TriggerEvent(onInitializeEvent,new ExtensionInitializeEventData(this));
        });
        context.onReadyEvent.subscribe(()=>{
            (async ()=>await this.Ready?.(this))().catch(er=>console.error(er,er?.stack));
            TriggerEvent(this.onReady,new ExtensionReadyEventData(this));
        });
        context.onShutdownEvent.subscribe(()=>{
            TriggerEvent(this.onShutdown,new ExtensionShutdownEventData(this));
            (async ()=>await this.Shutdown?.(this))().catch(er=>console.error(er,er?.stack));
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
        if(!CONTEXT_BY_EXTENSION.has(this)) throw new ReferenceError(ObjectBoundNotExist);
        return CONTEXT_BY_EXTENSION.get(this).player.dimension;
    }
    get hoveredBlockLocation(){
        if(!CONTEXT_BY_EXTENSION.has(this)) throw new ReferenceError(ObjectBoundNotExist);
        return CONTEXT_BY_EXTENSION.get(this).cursor.getPosition();
    }
    redirectTo(destination){
        if(!CONTEXT_BY_EXTENSION.has(this)) throw new ReferenceError(ObjectBoundNotExist);
        if(!(destination in RedirectDestination)) throw new TypeError("Unknow Destination: " + destination);
        if(typeof destination === "string") destination = RedirectDestination[destination];
        CONTEXT_BY_EXTENSION.get(this).post(new RedirectToDestinationPacket(destination));
        return this;
    }
    setBuildInPaneVisibility(pane, visible = true){
        if(!CONTEXT_BY_EXTENSION.has(this)) throw new ReferenceError(ObjectBoundNotExist);
        if(!(pane in BuildInPane)) throw new TypeError("Unknow pane: " + pane);
        if(typeof pane === "string") destination = BuildInPane[pane];
        CONTEXT_BY_EXTENSION.get(this).post(new UpdateBuildInPanePacket(pane,!!visible));
        return this;
    }
    setCursorProperties(cursorProperties){
        if(!CONTEXT_BY_EXTENSION.has(this)) throw new ReferenceError(ObjectBoundNotExist);
        CONTEXT_BY_EXTENSION.get(this).cursor.setProperties(cursorProperties);
        return this;
    }
    getCursorProperties(){
        if(!CONTEXT_BY_EXTENSION.has(this)) throw new ReferenceError(ObjectBoundNotExist);
        return CONTEXT_BY_EXTENSION.get(this).cursor.getProperties();
    }
}