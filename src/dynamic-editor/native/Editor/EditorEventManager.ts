import { Player, world } from "@minecraft/server";
import { ReceiveEventId, ReceiveLifecycleEventType, ReceiveEventEnum, ReceiveActionEventType, TriggerEvent, PublicEvent, ReceiveUXEventType } from "../../core/index";
import { PayloadLoader, PayloadLoaders } from "./EditorActions";
import { PlayerDisplayManager } from "./EditorDisplayManager";
import { EditorPane, IUnkownTool } from "../Controls";

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
            display.onClientReady.trigger({player,display});
        }
    }
    [ReceiveEventId["Editor::ClientActionEvents"]](id: typeof ReceiveEventId["Editor::ClientActionEvents"], message: {[key: string]: any}, player: Player){
        if(message?.type === ReceiveActionEventType.ActionExecuted){
            const actionId = message.id;
            const display = new PlayerDisplayManager(player);
            if(!display.hasReverses(actionId)) return;
            TriggerEvent(
                display.getReverses(actionId)?.onActionExecute as PublicEvent<any>,
                new (PayloadLoaders.get(message.payload.type) as typeof PayloadLoader)(player,message.payload)
            );
        }
    }
    [ReceiveEventId["Editor::ClientUXEvents"]](id: typeof ReceiveEventId["Editor::ClientUXEvents"], message: {[key: string]: any}, player: Player){
        if(!(message.type in this.uxEventsResolver)) {
            console.warn(`§8No handler implementation for §r§l${id}§r§7  -->  §r§l${message.type} §r§8[${ReceiveEventEnum[id][message.type]}]\n`,JSON.stringify(message));
        }
        else this.uxEventsResolver[message.type](id,message,new PlayerDisplayManager(player));
    }
    uxEventsResolver: {[key: number]: (id: string,message:any,display:PlayerDisplayManager)=>void} =  {
        [ReceiveUXEventType.ToolActivate](id,message,display){
            let tool;
            if(message.id === "") tool = null;
            else if(!display.hasReverses(message.id)) tool = {id:message.id} as IUnkownTool;
            else tool = display.getReverses(message.id);
            display.onToolAtivate.trigger({player:display.player,display,lastTool:display.lastTool,tool:tool});
            display.lastTool = tool;
        },
        [ReceiveUXEventType.PaneModeChanged](id,message,display){
            const mId = message.id;
            if(display.hasReverses(mId)){
                const r = display.getReverses(mId) as EditorPane;
                r.setCollapsed(message.collapsed);
            }
        },
        [ReceiveUXEventType.PaneVisisbilityChanged](id,message,display){
            const mId = message.id;
            if(display.hasReverses(mId)){
                const r = display.getReverses(mId) as EditorPane;
                r.setVisibility(message.visibility);
            }
        },
        [ReceiveUXEventType.ProperyChanged](id,message,display){
            const {paneId,property,newValue} = message;
            if(display.hasReverses(paneId)){
                const r = display.getReverses(paneId) as EditorPane;
                //@ts-ignore
                if(r._properties.has(property)){
                    //@ts-ignore
                    const a = r._properties.get(property);
                    //@ts-ignore
                    a._setValue(newValue);
                }
            }
        }
    };
}
export const editorEventManager = new EditorEventManager();