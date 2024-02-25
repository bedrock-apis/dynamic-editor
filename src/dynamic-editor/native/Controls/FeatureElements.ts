import { BlockPermutation, BlockStates, BlockType, BlockTypes } from "@minecraft/server";
import { StatusBarItem } from "./Elements";
import { EditorPane } from "./Panes";
import { BlockPickerPaneElement, DropdownPaneElement } from "./PaneElements";

export class AutoSizeStatusBarItem extends StatusBarItem{
    constructor(content?: string, textSizeMultiplier: number = 1.2){
        super(content);
        //bind size property depending on current text property and its length
        StatusBarItem.BindProperty(this,"text",this,"size",n=>(n?.length??0)*textSizeMultiplier);
        this.setPropertyValue("text",content??"");
    }
}
export class BlockTypePickerPaneElement extends BlockPickerPaneElement{
    constructor(title: string){
        super(title??"");
        this.setPropertyValue("allowedBlocks",BlockTypes.getAll().map(({id})=>id.startsWith("minecraft:")?id.substring(10):id));
    }
    get selectedBlockType(): BlockType {return BlockTypes.get(this.value)??BlockTypes.get("air") as any;}
    get selectedBlockPermutation(){return BlockPermutation.resolve(this.value)??BlockPermutation.resolve("air");}
}
export class PermutationPickerPane extends EditorPane{
    readonly blockTypePicker = new BlockTypePickerPaneElement("Type");
    protected readonly pane = new EditorPane("Permutation");
    protected permutation = BlockPermutation.resolve("air");
    get blockPermutation(){return this.permutation;};
    constructor(title: string){
        super(title??"Permutation Picker");
        this.blockTypePicker.setValue("grass");
        this.blockTypePicker.onPropertyValueChange.subscribe(({newValue,propertyName})=>{
            if(propertyName === "value"){
                this.permutation = BlockPermutation.resolve(newValue as string);
                const states = this.permutation.getAllStates();
                for (const e of this.pane.getElements()) this.pane.removeElement(e);
                for (const n of Object.getOwnPropertyNames(states)) {
                    const vs = BlockStates.get(n)?.validValues as any;
                    const a = new DropdownPaneElement(n,vs);
                    a.onUserInputValue.subscribe(e=>{
                        this.permutation = this.permutation.withState(n,vs[e.newValue] as any)
                    });
                    this.pane.addElement(a);
                }
            }
        });
        console.warn("Permutation picker");
        this.addElement(this.blockTypePicker).addElement(this.pane);
    }
}