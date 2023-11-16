import { 
    EditorExtension,
    MenuActionItem,
    MenuOptionsItem
} from "dynamic-editor";

class MyExtension extends EditorExtension{
    Initialiaze(){
        const menuOptions = new MenuOptionsItem("Main")
        .addMenuItem(new MenuActionItem("Sub options")
            .addActionHandler(()=>console.warn("Action2"))
        );


        this.menuBar.addItem(menuOptions);
    }
}
MyExtension.registry();