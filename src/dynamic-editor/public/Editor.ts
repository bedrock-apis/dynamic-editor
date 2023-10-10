import { NoConstructor, core } from "../core/index";
import { EditorEvents } from "./Events";

/**@public */
export class Editor{
    readonly events: EditorEvents;
    private constructor(){
        if(!core.isNativeCall) throw new TypeError(NoConstructor + Editor.name);
        core.isNativeCall = true;
        //@ts-ignore
        this.events = new EditorEvents()
        core.isNativeCall = false;
    }
}
/**@public */
//@ts-ignore
core.isNativeCall = true;
/**@public */
//@ts-ignore
export const editor: Editor = new Editor();
core.isNativeCall = false;