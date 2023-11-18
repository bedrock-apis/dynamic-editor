import { ActionTypes, EditorInputContext, InputModifier, KeyboardKey, registerEditorExtension } from "@minecraft/server-editor";

registerEditorExtension("sus",(uiSession)=>{
    /*system.runTimeout(()=>{
        const player = uiSession.extensionContext.player;
        player.postClientMessage(PostEventId["Editor::ServerUXEvents"],JSON.stringify({type:ServerUXEventType.SetActiveTool,visible:true,enabled:true,selectedOptionId:"bbbhfjakshdfkjh"}));
    },50);*/

    /*
    const action = uiSession.actionManager.createAction({actionType:ActionTypes.NoArgsAction,onExecute:(data,properties)=>{
        console.warn("Action");
    }});
    uiSession.inputManager.registerKeyBinding(EditorInputContext.GlobalToolMode,action,KeyboardKey.KEY_M,InputModifier.Any);*/
    /*const menu = uiSession.createMenu({name:"Menu Options"});
    menu.addItem({name:"Sub Menu"},action)*/

},()=>{}); 