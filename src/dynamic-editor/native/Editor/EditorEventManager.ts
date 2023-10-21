import { Player, world } from "@minecraft/server";
import { ReceiveEventId, NativeEvent, ReceiveLifecycleEventType, ReceiveEventEnum, ReceiveActionEventType } from "../../core/index";
import { EditorContextManager } from "./EditorContext";
import { PayloadLoader, PayloadLoaders } from "./EditorActionManager";

export class EditorEventManager{
    readonly onClientReady = new NativeEvent<[{player: Player}]>();
    readonly activeExtensions = new WeakMap<Player,Set<EditorContextManager>>();
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
            this.getContextManagers(player).forEach(e=>e._onReady());
            this.onClientReady.trigger({player});
        }
    }
    [ReceiveEventId["Editor::ClientActionEvents"]](id: typeof ReceiveEventId["Editor::ClientActionEvents"], message: {[key: string]: any}, player: Player){
        if(message?.type === ReceiveActionEventType.ActionExecuted){
            this.getContextManagers(player).forEach(e=>e._onAction(message.id as string,new (PayloadLoaders.get(message.payload.type) as typeof PayloadLoader)(player,message.payload)));
        }
    }
    [ReceiveEventId["Editor::ClientUXEvents"]](id: typeof ReceiveEventId["Editor::ClientUXEvents"], message: {[key: string]: any}, player: Player){
        console.warn(`§8No handler implementation for §r§l${id}§r§7  -->  §r§l${message.type} §r§8[${ReceiveEventEnum[id][message.type]}]`);
    }
    getContextManagers(player: Player){
        return this.activeExtensions.get(player)??new Set();
    }
    registerContextManager(player: Player,context: EditorContextManager){
        if (!this.activeExtensions.has(player as Player)) this.activeExtensions.set(player as Player, new Set());
        const set = this.activeExtensions.get(player as Player) as Set<EditorContextManager>;
        set.add(context);
    }
}
export const editorEventManager = new EditorEventManager();