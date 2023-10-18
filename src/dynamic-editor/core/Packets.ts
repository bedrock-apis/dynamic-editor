import { PostEventId, ReceiveEventId, ServerUXEventType, RedirectDestination, BuildInPane } from "./Definitions";

export class PacketManager{
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
}

export class Packet{
    readonly data;
    readonly id;
    constructor(id: PostEventId | ReceiveEventId, data: PacketData){
        this.id = id;
        this.data = data;
    }
    getMessage(){return JSON.stringify(this.data);}
    setType(type: number){
        this.data.type = type;
        return this;
    }
}
export class ServerUXEventPacket extends Packet{constructor(data: PacketData){super(PostEventId["Editor::ServerUXEvents"],data);}}
export class ServerActionEventPacket extends Packet{constructor(data: PacketData){super(PostEventId["Editor::ServerActionEvents"],data);}}
export class ServerInputBindingEventPacket extends Packet{constructor(data: PacketData){super(PostEventId["Editor::ServerInputBindingEvents"],data);}}
export class RedirectToDestinationPacket extends ServerUXEventPacket{constructor(destination: RedirectDestination){super({type:ServerUXEventType.RedirectToDestination,destination:destination});}}
export class UpdateBuildInPanePacket extends ServerUXEventPacket{constructor(panelId: BuildInPane,visible: boolean){super({type:ServerUXEventType.UpdateBuildInPanes,panel:panelId,visible});}}
export interface PacketData{
    type?: number,
    [key: string]: any
}