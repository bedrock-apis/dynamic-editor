import { Player, world } from "@minecraft/server";
import { ReceiveEventId, NativeEvent, ReceiveLifecycleEventType, ReceiveEventEnum } from "../../core/index";

export class EditorEventManager{
    readonly onClientReady = new NativeEvent<[{player: Player}]>();
    constructor(){
        world.afterEvents.messageReceive.subscribe(({id,message,player})=>{
            if(!(id in ReceiveEventId)) return;
            this.resolver(id as ReceiveEventId,JSON.parse(message),player);
        });
    }
    resolver(id: ReceiveEventId, message: {[key: string]: any}, player: Player){
        //@ts-ignore
        this[id](id,message,player);
    }
    [ReceiveEventId["Editor::ClientLifecycle"]](id: typeof ReceiveEventId["Editor::ClientLifecycle"], message: {[key: string]: any}, player: Player){
        if(message?.type === ReceiveLifecycleEventType.PlayerReady) this.onClientReady.trigger({player});
    }
    [ReceiveEventId["Editor::ClientActionEvents"]](id: typeof ReceiveEventId["Editor::ClientActionEvents"], message: {[key: string]: any}, player: Player){
        console.warn(`§8No handler implementation for §r§l${id}§r§7  -->  §r§l${message.type} §r§8[${ReceiveEventEnum[id][message.type]}]`);
    }
    [ReceiveEventId["Editor::ClientUXEvents"]](id: typeof ReceiveEventId["Editor::ClientUXEvents"], message: {[key: string]: any}, player: Player){
        console.warn(`§8No handler implementation for §r§l${id}§r§7  -->  §r§l${message.type} §r§8[${ReceiveEventEnum[id][message.type]}]`);
    }
}
export const editorEventManager = new EditorEventManager();