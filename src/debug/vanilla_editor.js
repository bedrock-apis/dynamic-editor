import { registerEditorExtension } from "@minecraft/server-editor";

registerEditorExtension("sus",(uiSession)=>{
    const action = uiSession.actionManager.createAction({actionType:ActionTypes.NoArgsAction,onExecute:(data,properties)=>{
        console.warn("Action");
    }});
    const menu = uiSession.createMenu({name:"Menu Options"});
    menu.addItem({name:"Sub Menu"},action)

},()=>{});