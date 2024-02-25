import { system } from "@minecraft/server";
import { ActionTypes, registerEditorExtension } from "@minecraft/server-editor";


registerEditorExtension("sus",
    (uiSession)=>{
        const a = uiSession.toolRail.addTool({displayStringId:"Lol"});
        const n = uiSession.createPropertyPane({titleAltText:"l"});
        a.bindPropertyPane(n);
        const data = {
            "asus":false,
            "asdas":true,
        };
        n.addBool(data,"asus", {displayAsToggleSwitch: true,titleAltText:"Hehe"});
        n.addBool(data,"asdas", {displayAsToggleSwitch: false,titleAltText:"Hihi"});
        console.warn("test");
    },
    ()=>{}
);