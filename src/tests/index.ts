import { system } from "@minecraft/server";
import { 
    EditorExtension,
    MenuActionItem,
    MenuOptionsItem
} from "dynamic-editor";

class MyExtension extends EditorExtension{
    Initialiaze(){

        const a = new MenuActionItem("Sub Action")
        // wrapping the onActionExecute.subscribe(...), cus builder syntax
        .addActionHandler(()=>console.warn("Action"))


        // more complex menu initialization
        const menuOptions = new MenuOptionsItem("Main")
        .addMenuItem(new MenuOptionsItem("Sub options")
            .addMenuItem(new MenuActionItem("Sub Action")
                .addActionHandler(()=>console.warn("Action2"))
                .setContent("Sub sub Action Long Name")
                .setCheckmarkEnabled(true).setChecked(true)
            )
        ).addMenuItem(a);
        
        // subscribe to action
        a.onActionExecute.subscribe(()=>{});
        // displaying and handling contents via menu bar
        this.menuBar.addItem(menuOptions);
        
        
        // testing dynamic features!
        system.runTimeout(()=>a.setChecked(true),120);
    }
}
MyExtension.registry();

class SubExtension extends EditorExtension{
    static extensionName = "My Extension Name";
    Initialiaze(extension: this): void {
        //code for initialization, constrution functionality
    }
    Ready(extension: this): void {
        //code triggered when player is ready to display an UI
    }
    Shutdown(extension: this): void {
        //code for shuttingdown a extension
    }
}