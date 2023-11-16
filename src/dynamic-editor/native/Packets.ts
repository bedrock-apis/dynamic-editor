import { BuildInPane, IDENTITY_SYMBOL, IIdentityPacket, IPacket, IUniqueObject, Packet, PostEventId, PublicEvent, RedirectDestination, ServerUXEventType, UNIQUE_SYMBOL } from "dynamic-editor/core/index";
export const ACTION_IDENTITY_SYMBOL = Symbol("ACTION_IDENTITY");
export class ServerUXEventPacket extends Packet{
    constructor(data: any){
        super(PostEventId["Editor::ServerUXEvents"],data);
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
    [IDENTITY_SYMBOL] = ACTION_IDENTITY_SYMBOL;
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
    static BindActionToControlPacket(action: IUniqueObject, control: IUniqueObject){
        return new ServerUXEventPacket({
            type:ServerUXEventType.BindUIEvent,
            actionId:action,
            controlId:control
        });
    }
    static UnbindActionToControlPacket(action: IUniqueObject, control: IUniqueObject){
        return new ServerUXEventPacket({
            type:ServerUXEventType.UnbindUIEvent,
            actionId:action,
            controlId:control
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
    [UNIQUE_SYMBOL]: true = true;
    protected getMainPacketData(flags?: number) {
        const data = super.getMainPacketData(flags);
        data.id = this;
        return data;
    }
}
export class Displayable extends UniquePostable<ServerUXEventPacket>{
    protected readonly packetConstructor: new (data: any) => ServerUXEventPacket = ServerUXEventPacket;
    readonly onUpdate = new PublicEvent<[Displayable]>; //Keep displayble bc its not always a "this" reference
    readonly onInit = new PublicEvent<[Displayable]>;
    readonly onDispose = new PublicEvent<[Displayable]>;
    *displayInitPackets(): Generator<IPacket>{ yield * this.getPackets(INIT_FLAG);}
    *displayUpdatePackets(): Generator<IPacket>{ yield * this.getPackets(UPDATE_FLAG);}
    *displayDisposePackets(): Generator<IPacket>{yield * this.getPackets(REMOVE_FLAG);}
}