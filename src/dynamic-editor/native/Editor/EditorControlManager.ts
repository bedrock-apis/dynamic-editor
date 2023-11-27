import { system } from "@minecraft/server";
import { EditorContextManager } from "./EditorContext";
import { ToolView } from "../Controls/index";
import { IPacket, NoConstructor, core } from "dynamic-editor/core";
import { INIT_FLAG, IUpdateable, REMOVE_FLAG, UPDATE_FLAG } from "../Packets";
export class EditorControlManager{
    readonly context;
    readonly changes;
    readonly toolView: ToolView;
    get isReady(){return this._ready??this.context.isReady;}
    set isReady(v){this._ready = v;}
    constructor(context: EditorContextManager){
        if(!core.isNativeCall) throw new ReferenceError(NoConstructor + EditorControlManager.name);
        this.context = context;
        this.changes = new Map<IUpdateable,Set<any>>();
        this.context.onReadyEvent.subscribe(async ()=>{
            this.resolvePackets(this.toolView.displayInitPackets());
            this.toolView.onUpdate.subscribe((e,flag)=>this.whenUpdate(e,flag));
        });
        this.context.onShutdownEvent.subscribe(()=>{
            this.isReady = false;
            if(typeof this.task === "number") system.clearRun(this.task);
            this.task = null;

            //Dispose all controls on shutdown
            for (const disposePackets of this.toolView.displayDisposePackets()) null; //do nothing bc player session is already ending
            //@ts-ignore
            this.toolView = null;
        })
        this.task = null;
        //@ts-ignore
        this.toolView = new ToolView(this.context);
    }
    whenUpdate(control: IUpdateable, flag: number){
        const s = this.changes.get(control)??new Set;
        s.add(flag);
        this.changes.set(control,s);
        this.setUpdate(); 
    }
    setUpdate(){ if(this.isReady && this.task === null) return (this.task = system.run(()=>this.build())) || true;}

    private _ready?: boolean
    private task: any
    private build(){
        this.task = null;
        const m = this.packetMethods;
        for (const [k,v] of this.changes.entries()) {
            //@ts-ignore
            for (const f of v) this.resolvePackets(k[m[f]]());
        }
        this.changes.clear();
    }
    private resolvePackets(packets: Generator<IPacket>){
        const context = this.context;
        let currentData = packets.next();
        while(!currentData.done)
        {
            let giveParam = undefined;
            const packet = currentData.value;
            context.post(packet);
            currentData = packets.next(giveParam);
        }
    }
    private packetMethods = {
        [UPDATE_FLAG]: "displayUpdatePackets",
        [REMOVE_FLAG]: "displayDisposePackets",
        [INIT_FLAG]:"displayInitPackets"
    }
}