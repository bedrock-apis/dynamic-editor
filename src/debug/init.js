//@ts-nocheck
import { World, world, Player } from "@minecraft/server";
import {ReceiveEventId,ReceiveEventEnum, ReceiveEventName} from "../dynamic-editor/core/Definitions";

world.afterEvents.messageReceive.subscribe(({message,id,player})=>{
    if(!id.startsWith("Editor::")) return;
    if(!(id in ReceiveEventId)) return console.warn("Unknow Client Event: " + id);
    const data = JSON.parse(message);
    if(!(data.type in ReceiveEventEnum[id])) {
        console.warn(`Unknow Client ${ReceiveEventName[id]} type: ` + data.type);
        console.warn(id,message);
    }
});
const post = Player.prototype.postClientMessage;
const broadcast = World.prototype.broadcastClientMessage;
Player.prototype.postClientMessage = function(id,message){
    if(!id.startsWith("Editor::")) return;
    //if(!(id in PostEventIds)) return console.warn("Unknow Post Event: " + id);
    const data = JSON.parse(message);
    console.warn(id,message.length > 3000?message.substring(0,3000) + " ...":message);
    /*if(!(data.type in PostEventIdTypes[id])) {
        console.warn(`Unknow Post ${PostEventNames[id]} type: ` + data.type);
    }*/
    post.call(this,id,message);
}
World.prototype.broadcastClientMessage = function(id,value){
    console.warn("Broadcast Message: ", id,value,"World");
    broadcast.call(this,id,value);
}