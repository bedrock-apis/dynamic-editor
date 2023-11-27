import { CursorTargetMode, DropdownPaneElement, EditorExtension, MouseAction, PermutationPickerPane, Tool,editor } from "./dynamic-editor";

class MyNewExtension extends EditorExtension{
    warperTool = new Tool();
    permutationPane = new PermutationPickerPane("Some title").setVisibility(false).addElement(
        new DropdownPaneElement("Mode",Object.keys(CursorTargetMode))
    );
    _subscribed = undefined;
    Initialize(){
        console.warn("Test");
        this.warperTool.bindVisibleElements(this.permutationPane);
        this._subscribed = this.warperTool.onMouseDrag.subscribe(m=>{
            m.block?.setPermutation(this.selectedPermutation);
        },MouseAction.ButtonClick);
        this.toolView.addEditorPane(this.permutationPane);
        this.toolView.addTools(this.warperTool);
        editor.isSimulationPaused = true;
        throw "Ahoj";
        console.warn(editor.isSimulationPaused);
    }
    get selectedPermutation(){return this.permutationPane.blockPermutation;}
}
MyNewExtension.registry();