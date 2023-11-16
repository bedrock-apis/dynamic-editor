import { Player, world } from "@minecraft/server";
import { ReceiveEventId, ReceiveLifecycleEventType, ReceiveEventEnum, ReceiveActionEventType, TriggerEvent, PublicEvent } from "../../core/index";
import { PayloadLoader, PayloadLoaders } from "./EditorActions";
import { PlayerDisplayManager } from "./EditorDisplayManager";

export class EditorEventManager{
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
        if(message?.type === ReceiveLifecycleEventType.PlayerReady){
            const display = new PlayerDisplayManager(player);
            if(!display.isReady) display.onClientReady.trigger({player,display});
        }
    }
    [ReceiveEventId["Editor::ClientActionEvents"]](id: typeof ReceiveEventId["Editor::ClientActionEvents"], message: {[key: string]: any}, player: Player){
        if(message?.type === ReceiveActionEventType.ActionExecuted){
            const actionId = message.id;
            const display = new PlayerDisplayManager(player);
            if(!display.isReady) display.onClientReady.trigger({player,display});
            if(!display.hasRegisteredAction(actionId)) return;
            TriggerEvent(
                display.getRegisteredAction(actionId)?.onActionExecute as PublicEvent<any>,
                new (PayloadLoaders.get(message.payload.type) as typeof PayloadLoader)(player,message.payload)
            );
        }
    }
    [ReceiveEventId["Editor::ClientUXEvents"]](id: typeof ReceiveEventId["Editor::ClientUXEvents"], message: {[key: string]: any}, player: Player){
        console.warn(`§8No handler implementation for §r§l${id}§r§7  -->  §r§l${message.type} §r§8[${ReceiveEventEnum[id][message.type]}]`);
    }
}
export const editorEventManager = new EditorEventManager();