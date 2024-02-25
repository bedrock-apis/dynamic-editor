import { EditorExtension, InputModifier, KeyboardKey, Tool } from "dynamic-editor";

export class Ctrl_T extends EditorExtension{
    async Initialize(){
        const tool = new Tool("textures/items/apple","Lmao","Ctrl + T");
        tool.onKeyboardKeyPress.subscribe((e)=>{
            console.warn("Key pressed");
        },KeyboardKey.KEY_T, InputModifier.Control);
        this.toolView.addTool(tool);
    }
}
