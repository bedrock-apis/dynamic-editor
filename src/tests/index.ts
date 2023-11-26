import { BlockPermutation, BlockStates, Difficulty, Direction, system } from "@minecraft/server";
import { GraphicsSettingsProperty } from "@minecraft/server-editor-bindings";
import { 
    EditorExtension,
    EditorPane,
    StringPaneElement,
    NumberPaneElement,
    StringProperty,
    NumberProperty,
    Element,
    ToolView,
    AutoSizeStatusBarItem,
    BooleanProperty,
    StatusBarItem,
    Tool,
    BlockTypePickerPaneElement,
    ButtonPaneElement,
    DropdownPaneElement,
    BooleanPaneElement,
    PermutationPickerPane,
    RedirectDestination,
    KeyboardKey,
    InputModifier,
    MouseAction,
    MouseInteractions,
    MouseInteractionType,
    CursorControlMode,
    CursorTargetMode,
    StatusBarItemAlignment
} from "dynamic-editor";


class MyExtension extends EditorExtension{
    async Initialize(){
        const pane = new EditorPane();
        const dropdown = new DropdownPaneElement("Dropdown items").setDropdownItems(Object.keys(Direction));
        pane.addElements(dropdown,new ButtonPaneElement("Change to difficulty").addClickHandler(()=>dropdown.setDropdownItems(Object.keys(Difficulty))));
        this.toolView.addEditorPanes(pane);
    }
}
MyExtension.registry();
/*
class PermutationPickerPane extends EditorPane{
    protected readonly blockTypePicker = new BlockTypePickerPaneElement("Type");
    protected readonly pane = new EditorPane("Permutation");
    protected permutation = BlockPermutation.resolve("air");
    get blockPermutation(){return this.permutation;};
    constructor(title: string){
        super(title??"Permutation Picker");
        this.blockTypePicker.setValue("air");
        this.blockTypePicker.onPropertyValueChange.subscribe(({newValue,propertyName})=>{
            if(propertyName === "value"){
                this.permutation = BlockPermutation.resolve(newValue as string);
                const states = this.permutation.getAllStates();
                for (const e of this.pane.getElements()) this.pane.removeElement(e);
                for (const n of Object.getOwnPropertyNames(states)) {
                    const vs = BlockStates.get(n)?.validValues as any;
                    const a = new DropdownPaneElement(n,vs);
                    a.onUserInputValue.subscribe(e=>{
                        console.warn(n,vs[e.newValue]);
                        this.permutation = this.permutation.withState(n,vs[e.newValue] as any)
                    });
                    this.pane.addElement(a);
                }
            }
        });
        this.addElements(this.blockTypePicker,this.pane);
    }
}
*/


function delay(num: number){
    return new Promise(res=>system.runTimeout(res as any,num));
}
/*
class MyPane extends EditorPaneElement{
    constructor(ins?: StringPaneElement){
        super();
        const input = ins??new StringPaneElement("Input");
        this.addElements(
            input, 
            new ButtonPaneElement("Submit").addClickHandler(()=>{
                this.setVisibility(false);
                this.removeElement(input);
                console.warn(input.proxyValues.value);
            })
        )
        this.setVisibility(true);
    }
}*/