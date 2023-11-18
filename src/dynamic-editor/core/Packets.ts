import { PostEventId, ReceiveEventId } from "./Definitions";

export const UNIQUE_SYMBOL: unique symbol = Symbol("UNIQUE");
export const IDENTITY_SYMBOL: unique symbol = Symbol("IDENTITY_SYMBOL");
export const IDENTITY_DATA: unique symbol = Symbol("IDENTITY_DATA");


export interface IPacket{
    readonly id: string;
    readonly data: any;
}
export interface IUniqueObject{
    [UNIQUE_SYMBOL]: boolean
}
export interface IIdentityPacket extends IPacket{
    [IDENTITY_SYMBOL]: symbol
    [IDENTITY_DATA]: any
}
export interface IPacketCommand extends IPacket{
    readonly commandId: symbol;
}
export class Packet implements IPacket{
    readonly data;
    readonly id;
    constructor(id: PostEventId | ReceiveEventId, data: any){
        this.id = id;
        this.data = data;
    }
    setType(type: number){
        this.data.type = type;
        return this;
    }
    isCommand(): this is IPacketCommand { return "commandId" in this; };
}