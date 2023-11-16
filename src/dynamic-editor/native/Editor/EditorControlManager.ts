import { system } from "@minecraft/server";
import { EditorContextManager } from "./EditorContext";
import { MenuBarControl, StatusBarControl } from "../Controls/index";
import { IDENTITY_SYMBOL, IIdentityPacket, IPacket, NoConstructor, core } from "dynamic-editor/core";
import { ACTION_IDENTITY_SYMBOL, Displayable, INIT_FLAG, REMOVE_FLAG, UPDATE_FLAG } from "../Packets";
export class EditorControlManager{
    readonly context;
    readonly changes;
    readonly statusBar: StatusBarControl;
    readonly menuBar: MenuBarControl;
    get isReady(){return this._ready??this.context.isReady;}
    set isReady(v){this._ready = v;}
    constructor(context: EditorContextManager){
        if(!core.isNativeCall) throw new ReferenceError(NoConstructor + EditorControlManager.name);
        this.context = context;
        this.changes = new Map<Displayable,number>();
        this.context.onReadyEvent.subscribe(async ()=>{
            this.resolvePackets(this.statusBar.displayInitPackets());
            this.resolvePackets(this.menuBar.displayInitPackets());
            this.statusBar.onUpdate.subscribe(e=>this.whenUpdate(e,UPDATE_FLAG));
            this.menuBar.onUpdate.subscribe(e=>this.whenUpdate(e,UPDATE_FLAG));
            this.statusBar.onInit.subscribe(e=>this.whenUpdate(e,INIT_FLAG));
            this.menuBar.onInit.subscribe(e=>this.whenUpdate(e,INIT_FLAG));
            this.statusBar.onDispose.subscribe(e=>this.whenUpdate(e,REMOVE_FLAG));
            this.menuBar.onDispose.subscribe(e=>this.whenUpdate(e,REMOVE_FLAG));
        });
        this.context.onShutdownEvent.subscribe(()=>{
            this.isReady = false;
            if(typeof this.task === "number") system.clearRun(this.task);
            this.task = null;

            //Dispose all controls on shutdown
            for (const disposePackets of this.statusBar.displayDisposePackets()) null; //do nothing bc player session is already ending
            for (const disposePackets of this.menuBar.displayDisposePackets()) null; //do nothing bc player session is already ending
            //@ts-ignore
            this.statusBar = null;
            //@ts-ignore
            this.menuBar = null;
        })
        this.task = null;
        //@ts-ignore
        this.statusBar = new StatusBarControl(this);
        //@ts-ignore
        this.menuBar = new MenuBarControl(this);
    }
    whenUpdate(control: Displayable, flag: number){
        const getFlag = this.changes.get(control);
        if((getFlag === REMOVE_FLAG || getFlag === INIT_FLAG) && flag === UPDATE_FLAG) return; 
        this.changes.set(control,flag);
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
            this.resolvePackets(k[m[v]]());
        }
    }
    private resolvePackets(packets: Generator<IPacket>){
        const context = this.context;
        let currentData = packets.next();
        while(!currentData.done)
        {
            let giveParam = undefined;
            const packet = currentData.value;
            //@ts-ignore
            if(packet[IDENTITY_SYMBOL]) giveParam = this.packetResolvers[(packet as any)[IDENTITY_SYMBOL]](this,context,packet as any);
            else context.post(packet);
            currentData = packets.next(giveParam);
        }
    }
    private packetMethods = {
        [UPDATE_FLAG]: "displayUpdatePackets",
        [REMOVE_FLAG]: "displayDisposePackets",
        [INIT_FLAG]:"displayInitPackets"
    }
    private packetResolvers: {[key: symbol]:(controlManager: EditorControlManager, context: EditorContextManager, packet: IIdentityPacket)=>any} = {
        [ACTION_IDENTITY_SYMBOL](controlManager,context,packet){
            context.display?.setRegisterAction(packet.data.id);
            context.post(packet);
        }
    }
}