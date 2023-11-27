import { system } from "@minecraft/server";
import { ActionTypes, registerEditorExtension } from "@minecraft/server-editor";

registerEditorExtension("sus",(uiSession)=>{/*
    const action = uiSession.actionManager.createAction({actionType:ActionTypes.NoArgsAction,onExecute:(data,properties)=>{
        console.warn("Action")
    }});*//*
    const p = uiSession.createPropertyPane({titleAltText:"Some text",width:50});
    const pane = p.createPropertyPane({titleAltText:"sus",width:36});
    pane.addBlockPicker({p:"water"},"p",{titleAltText:"block",allowedBlocks:["Random Text"]});
    //pane.addDropdown({b:"ssus"},"b",{titleAltText:"bool",dropdownItems:[{displayAltText:"lol",displayStringId:"sos",value:"ssus"}]});
    //pane.addVector3({s:uiSession.extensionContext.player.location},"s",{titleAltText:"",minX:-9999,minY:-9999,minZ:-9999,maxX:9999,maxY:9999,maxZ:9999});
    p.show();/*
    system.runTimeout(()=>{
        const player = uiSession.extensionContext.player;
        player.postClientMessage(PostEventId["Editor::ServerUXEvents"],JSON.stringify({type:13,paneId:pane.id,visible:true,enable:true,id:UUID.generate(),typeName:InternalPaneElementTypes.Divider}));
    },50);
    /*
    uiSession.inputManager.registerKeyBinding(EditorInputContext.GlobalToolMode,action,KeyboardKey.KEY_M,InputModifier.Any);*/
    /*const menu = uiSession.createMenu({name:"Menu Options"});
    menu.addItem({name:"Sub Menu"},action)*/

},()=>{}); 