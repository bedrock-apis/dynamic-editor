import { system } from "@minecraft/server";
import { 
    EditorExtension,
    AutoSizeStatusBarItem,
    StatusBarItemAlignment
} from "dynamic-editor";


export class AutoSizeBarExtension extends EditorExtension{
    async Initialize(){
        const a = new AutoSizeStatusBarItem("",1.1).setAlignment(StatusBarItemAlignment.Left);
        system.runInterval(()=>{
            a.setContent("Hello ".repeat(~~(Math.random() * 5)))
        },20);
        this.toolView.addStatusBarItem(a);
    }
}