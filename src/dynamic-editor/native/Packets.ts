import { 
    BuildInPane, IDENTITY_DATA, IDENTITY_SYMBOL, IIdentityPacket, IPacket, 
    IUniqueObject, InputDevice, InputModifier, KeyboardKey, MouseAction, Packet,
    PostEventId, PublicEvent, RedirectDestination, ServerInputBindingEventType, 
    ServerUXEventType, UNIQUE_SYMBOL, EditorInputContext
} from "dynamic-editor/core/index";
export const ACTION_IDENTITY_SYMBOL = Symbol("ACTION_IDENTITY");
export class ServerUXEventPacket extends Packet{
    constructor(data: any){
        super(PostEventId["Editor::ServerUXEvents"],data);
    }
}
export class ServerInputBindingsEventPacket extends Packet{
    constructor(data: any){
        super(PostEventId["Editor::ServerInputBindingEvents"],data);
    }
}
export class RedirectToDestinationPacket extends ServerUXEventPacket{
    constructor(destination: RedirectDestination){super({type:ServerUXEventType.RedirectToDestination,destination:destination});}
}
export class UpdateBuildInPanePacket extends ServerUXEventPacket{
    constructor(panelId: BuildInPane,visible: boolean){super({type:ServerUXEventType.UpdateBuildInPanes,panel:panelId,visible});}
}
export class ServerActionEventPacket extends Packet{
    constructor(data: any){
        super(PostEventId["Editor::ServerActionEvents"],data);
    }
}
export class PostActionPacket extends ServerActionEventPacket implements IIdentityPacket {
    [IDENTITY_SYMBOL] = IDENTITY_SYMBOL;
    get [IDENTITY_DATA](){return this.data.id;}
}
export class PostUIPacket extends ServerUXEventPacket implements IIdentityPacket{
    [IDENTITY_SYMBOL] = IDENTITY_SYMBOL;
    get [IDENTITY_DATA](){return this.data.id;}
}
export class PacketBuilder{
    static GetRedirectToDestinationPacket(destination: RedirectDestination){
        if(!(destination in RedirectDestination)) throw new ReferenceError("Invalid destination!");
        //@ts-ignore
        return new RedirectToDestinationPacket(typeof destination === 'number'?destination:RedirectDestination[destination]);
    }
    static GetUpdateBuildInPanePacket(pane: BuildInPane, visible = true){
        if(!(pane in BuildInPane)) throw new ReferenceError("Invalid build in pane id!");
        if(typeof visible !== 'boolean') throw new TypeError("Visibility must be a true/false");
        //@ts-ignore
        return new UpdateBuildInPanePacket(typeof pane === 'number'?pane:BuildInPane[pane],visible);
    }
    static BindActionToControl(action: IUniqueObject, control: IUniqueObject){
        return new ServerUXEventPacket({
            type:ServerUXEventType.BindUIEvent,
            actionId:action,
            controlId:control
        });
    }
    static UnbindActionToControl(action: IUniqueObject, control: IUniqueObject){
        return new ServerUXEventPacket({
            type:ServerUXEventType.UnbindUIEvent,
            actionId:action,
            controlId:control
        });
    }
    static BindKeyInputActionToContext(action: IUniqueObject, contextId: IUniqueObject | EditorInputContext, button: KeyboardKey, modifier: InputModifier){
        return new ServerInputBindingsEventPacket({
            type:ServerInputBindingEventType.KeyActionBinding,
            actionId:action,
            contextId:contextId,
            inputDevice: InputDevice.KeyBoard,
            inputType:1,
            button,
            modifier
        });
    }
    static BindMouseInputActionToContext(action: IUniqueObject, contextId: IUniqueObject | EditorInputContext, mouseAction: MouseAction){
        return new ServerInputBindingsEventPacket({
            type:ServerInputBindingEventType.MouseActionBinding,
            actionId:action,
            contextId:contextId,
            inputDevice: InputDevice.Mouse,
            mouseAction
        });
    }
    static UnbindInputActionToContext(action: IUniqueObject, contextId: IUniqueObject | EditorInputContext,){
        return new ServerInputBindingsEventPacket({
            type:ServerUXEventType.UnbindUIEvent,
            actionId:action,
            contextId
        });
    }
}
export const UPDATE_FLAG = 2;
export const INIT_FLAG = 1;
export const REMOVE_FLAG = 0;
export abstract class Postable<K extends IPacket>{
    protected abstract readonly packetConstructor: new (data: any)=>K;
    protected readonly PACKET_TYPES: {[key: number]: number | null} = {
        [UPDATE_FLAG]: null,
        [REMOVE_FLAG]: null,
        [INIT_FLAG]: null
    }
    protected getMainPacketData(flags = 0):any {return {type:this.PACKET_TYPES[flags] as number};}
    protected getMainPacket(flags = 0): K{return new this.packetConstructor(this.getMainPacketData(flags));}
    protected *getPackets(flags: number): Generator<IPacket>{ yield this.getMainPacket(flags);}
}
export abstract class UniquePostable<K extends IPacket> extends Postable<K> implements IUniqueObject{
    [UNIQUE_SYMBOL]: boolean = true;
    protected getMainPacketData(flags?: number) {
        const data = super.getMainPacketData(flags);
        data.id = this;
        return data;
    }
}
export interface IUpdateable{
    displayInitPackets(): Generator<IPacket>;
    displayUpdatePackets(): Generator<IPacket>;
    displayDisposePackets(): Generator<IPacket>;
}
export class Displayable<T extends IPacket> extends UniquePostable<T> implements IUpdateable{
    protected readonly packetConstructor: new (data: any) => T;
    constructor(constuct: new (data: any)=>T){
        super();
        this.packetConstructor = constuct;
    }
    readonly onUpdate = new PublicEvent<[IUpdateable]>; //Keep displayble bc its not always a "this" reference
    readonly onInit = new PublicEvent<[IUpdateable]>;
    readonly onDispose = new PublicEvent<[IUpdateable]>;
    *displayInitPackets(): Generator<IPacket>{ yield * this.getPackets(INIT_FLAG);}
    *displayUpdatePackets(): Generator<IPacket>{ yield * this.getPackets(UPDATE_FLAG);}
    *displayDisposePackets(): Generator<IPacket>{yield * this.getPackets(REMOVE_FLAG);}
}
export class FakeUpdatable implements IUpdateable{
    packet: IPacket;
    constructor(packet: IPacket){
        this.packet = packet;
    }
    *displayInitPackets(): Generator<IPacket>{yield this.packet};
    *displayUpdatePackets(): Generator<IPacket>{yield this.packet};
    *displayDisposePackets(): Generator<IPacket>{yield this.packet};
}