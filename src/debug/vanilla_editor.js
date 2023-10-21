import { ActionTypes, InputModifier, KeyboardKey, registerEditorExtension } from "@minecraft/server-editor";
import { CursorControlMode } from "@minecraft/server-editor-bindings";

registerEditorExtension("sus",(uiSession)=>{

    const a = uiSession.actionManager.createAction({actionType:ActionTypes.MouseRayCastAction,onExecute:(data,properties)=>{}});
    const b = uiSession.actionManager.createAction({actionType:ActionTypes.MouseRayCastAction,onExecute:(data,properties)=>{}});
    const tool = uiSession.toolRail.addTool({});
    tool.registerKeyBinding(a,KeyboardKey.KEY_I,InputModifier.Any);
    tool.registerMouseButtonBinding(b);
    tool.registerMouseDragBinding(b);
    tool.registerMouseWheelBinding(b);
    const s = uiSession.createPropertyPane({titleAltText:"Sus"});
    s.addBool({a:true},"a")
    tool.bindPropertyPane(s);
},()=>{
});