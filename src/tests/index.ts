import { system } from "@minecraft/server";
import { EditorExtension, StatusBarItem, StatusBarItemAlignment } from "dynamic-editor";

const myStatusBar = new StatusBarItem();
myStatusBar.setPropertyValue("text", "My Text");
myStatusBar.setPropertyValue("size", 15);
class MyExtension extends EditorExtension{
    Initialiaze(){
        console.warn("Initialize");
        this.onShutdown.subscribe((e)=>console.warn("Event On Shutdown"));
        this.statusBar.addItem(myStatusBar);
    }
    Ready(){
        console.warn("Ready! " + this.statusBar.elementsLength);
        system.runTimeout(()=>{
            for (const i of this.statusBar.getItems()) {
                this.statusBar.removeItem(i);
            }
        },60);
    }
    Shutdown(){
        console.warn("Shutdown");
    }
}
MyExtension.registry();