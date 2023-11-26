import { ButtonPaneElement, CursorControlMode, CursorTargetMode, DropdownPaneElement, EditorExtension, MouseAction, PermutationPickerPane, Tool } from "./dynamic-editor";

class MyNewExtension extends EditorExtension{
    warperTool = new Tool();
    permutationPane = new PermutationPickerPane("Some title").setVisibility(false).addElement(
        new DropdownPaneElement("Mode",[Object.keys(CursorTargetMode)]).on
    );
    _subscribed = undefined;
    Initialize(){
        console.warn("Test");
        this.warperTool.bindPropertyPanes(this.permutationPane);
        this._subscribed = this.warperTool.onMouseInteract.subscribe(m=>{
            m.block?.setPermutation(this.selectedPermutation);
        },MouseAction.ButtonClick);
        this.toolView.addEditorPane(this.permutationPane);
        this.toolView.addTools(this.warperTool);
    }
    get selectedPermutation(){return this.permutationPane.blockPermutation;}
}
MyNewExtension.registry();