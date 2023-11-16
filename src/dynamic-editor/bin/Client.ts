import { Player, world } from "@minecraft/server";
import { IPacket } from "../core/index";

export const READY_CLIENTS = new WeakSet();
export const PLAYER_CLIENTS = new WeakMap();
const POST = Player.prototype.postClientMessage;
export class Client{
    //@ts-ignore
    readonly player: Player;
    //@ts-ignore
    readonly id: string;
    //@ts-ignore
    readonly name: string;
    //@ts-ignore
    isReady: boolean;
    constructor(player: Player){
        if(PLAYER_CLIENTS.has(player)) return PLAYER_CLIENTS.get(player);
        this.player = player;
        this.id = player.id;
        this.name = player.name;
        this.isReady = false;
    }
    post(packet: IPacket){POST.call(this.player,packet.id,JSON.stringify(packet.data));}
}
world.afterEvents.playerSpawn.subscribe(e=>{
    if(e.initialSpawn){
        const client = new Client(e.player);
        PLAYER_CLIENTS.set(e.player,client);
    }
});
world.beforeEvents.playerLeave.subscribe(e=>READY_CLIENTS.delete(PLAYER_CLIENTS.get(e.player)));

/*
export const PublicClient = CreateClass("Client",{
    get name(): string{return super.getCache(this).name;},
    get id(): string{return super.getCache(this).id;},
    get player(): Player{return super.getCache(this).player;},
    get isReady(){return super.getCache(this).isReady;}
}).constructor as unknown as typeof C;*/