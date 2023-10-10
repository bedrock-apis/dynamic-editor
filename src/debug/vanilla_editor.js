import { registerEditorExtension } from "@minecraft/server-editor";

registerEditorExtension("sus",(uiSession)=>{
    console.warn("Debug: Extension Init");
},()=>{
    console.warn("Debug: Extension Shutdow");
});