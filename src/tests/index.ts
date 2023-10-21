import { system } from "@minecraft/server";
import { BuildInPane, ConvertingProperty, Destination, EditorExtension, ExtensionReadyEvent, NumberProperty, StatusBarItem, StatusBarItemAlignment } from "dynamic-editor";

class MyExtension extends EditorExtension{
    Initialiaze(){
        const myStatusBar = new StatusBarItem()
        .setAlignmentt(StatusBarItemAlignment.Left)
        .setText("Some text")
        .setSize("Some Text".length * 1.25);


        //basic type by type binding
        myStatusBar.setProperty("enabled",myStatusBar.getProperty("visible"));
        //bind size property depending on current text property and its length
        myStatusBar.setProperty("size", new ConvertingProperty(myStatusBar.getProperty("text"),(value)=>value.length * 1.25));
        //bind size element value to another text element value
        StatusBarItem.BindProperty(myStatusBar, "size",myStatusBar,"text",(text)=>text?.length??0);

        system.runTimeout(()=>myStatusBar.text = "Other Text",60);
        this.statusBar.addItem(myStatusBar);
    }
    Ready(extension: this): void {
        this.redirectTo(Destination.PauseScreen);
        this.setBuildInPaneVisibility(BuildInPane.UISettings);
    }
}
MyExtension.registry();

class AutoSizeStatusBarItem extends StatusBarItem{
    constructor(){
        super();
        //bind size property depending on current text property and its length
        this.setProperty("size", new ConvertingProperty(this.getProperty("text"),(value)=>value.length * 1.25));
    }
}