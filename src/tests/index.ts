import { 
    EditorExtension,
    Tool,
    MouseAction
} from "dynamic-editor";
class MyExtension extends EditorExtension{
    readonly m: any;
    Initialize(){
        const tool = new Tool("","Title");
        tool.onMouseInteract.subscribe((p)=>{
            console.warn(JSON.stringify(p.blockLocation));
        },MouseAction.ButtonClick);
        /*
        const menu = new MenuOptionsItem("Options")
        .addMenuItem(new MenuActionItem("MyMenu").addActionHandler(()=>console.warn("action")).addKeyboardTrigger(KeyboardKey.KEY_M).clearKeyboardTriggers())
        .setVisibility(false);
        const statusBar = new AutoSizeStatusBarItem().setContent(" RandomContent");

        menu.getProperty("visible").addSetterBinding(tool.isActivePropertyGetter);
        statusBar.getProperty("visible").addSetterBinding(tool.isActivePropertyGetter);

        this.toolBar.addTool(tool);
        this.menuBar.addItem(menu);
        //system.runTimeout(()=>tool.setVisibility(false),60);
        this.statusBar.addItem(statusBar);
        */
        this.toolBar.addTool(tool);
    }
}
MyExtension.registry();