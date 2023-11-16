import { ActionTypes, EditorInputContext, InputModifier, KeyboardKey, registerEditorExtension, editor } from "@minecraft/server-editor";
import {ExtensionContext, GraphicsSettingsProperty} from "@minecraft/server-editor-bindings";
registerEditorExtension("sus",(uiSession)=>{    /*
    const a = uiSession.actionManager.createAction({actionType:ActionTypes.NoArgsAction,onExecute:(data,properties)=>{
        console.warn("Action");
    }});*/
    /**@type {ExtensionContext} */
    const context = uiSession.extensionContext;
    context.afterEvents.modeChange.subscribe((e)=>{console.warn(e.mode)});
/*
    const b = uiSession.createMenu({name:"Menu",displayStringId:"Id"});
    b.addItem({name:"Sus"},a);
    uiSession.inputManager.registerKeyBinding(EditorInputContext.GlobalEditor,a,KeyboardKey.KEY_P,InputModifier.Any)
    uiSession.inputManager.registerKeyBinding(EditorInputContext.GlobalEditor,a,KeyboardKey.BACKSPACE,InputModifier.None)
    /*
    const pane = uiSession.createPropertyPane({titleAltText:"some Title"});
    const pane1 = pane.createPropertyPane({titleAltText:"Sub pane"});
    pane1.addBool({},"sus",{titleAltText:"Some text"});
    pane.show();*/

},()=>{

});