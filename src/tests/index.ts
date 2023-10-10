import { editor } from "dynamic-editor";
import { TriggerEvent } from "dynamic-editor/core/index";

editor.events.clientReady.subscribe((a)=>{
    console.warn("test: " + a.client);
});
TriggerEvent(editor.events.clientReady,{client:"TEST PARAM"});
console.warn("Lol");