import { system } from "@minecraft/server";
import { EditorContextManager } from "./EditorContext";
import { BaseControl, Control, StatusBarControl } from "../Controls/index";
import { NoConstructor, core } from "dynamic-editor/core";

export class EditorControlManager{
    readonly context;
    readonly changes: Set<BaseControl<any>>;
    readonly statusBar;
    get isReady(){return this._ready??this.context.isReady;}
    set isReady(v){this._ready = v;}
    constructor(context: EditorContextManager){
        if(!core.isNativeCall) throw new ReferenceError(NoConstructor + EditorControlManager.name);
        this.context = context;
        this.changes = new Set<Control<any>>();
        this.context.onReadyEvent.subscribe(()=>this.build());
        this.context.onShutdownEvent.subscribe(()=>{
            this.isReady = false;
            if(typeof this.task === "number") system.clearRun(this.task);
            this.task = null;

            //Dispose all controls on when shutdown
            this.statusBar.dispose();
            //@ts-ignore
            this.statusBar = null;
        })
        this.task = null;
        this.statusBar = new StatusBarControl(this);
    }
    setUpdate(){ if(this.isReady && this.task === null) return (this.task = system.run(()=>this.build())) || true;}

    private _ready?: boolean
    private task: any
    private build(){
        this.task = null;
        const context = this.context;
        for (const control of this.changes) {
            for (const packet of control.getPackets()) context.post(packet);
        }
    }
}