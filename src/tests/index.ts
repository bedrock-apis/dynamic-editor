import { 
    EditorExtension,
    EditorPane,
    ButtonPaneElement,
    NumberPaneElement,
    Tool,
    KeyboardKey,
    InputModifier
} from "dynamic-editor";
import { PaneByPane } from "./between_panes";
import { AutoSizeBarExtension } from "./auto_size_bar";
import { Ctrl_T } from "./key_board_binding";


class MyExtension extends EditorExtension{
    properties: {
        numberP:number
    }= {} as any;
    async Initialize(){
        const pane = new EditorPane("Non empty").setVisibility(true);
        pane.addElement(new NumberPaneElement("Number item"), "numberP");
        pane.addElement(new NumberPaneElement("Number item", true).setMinMaxValues(5,20), "numberP");
        const button = new ButtonPaneElement("Some Button").addClickHandler(()=>console.warn(this.properties.numberP++));
        pane.addElement(button)
        pane.propertyDictionaryProperties["numberP"].onValueChange.subscribe((e)=>{
            pane.setTitle("Test: " + e.newValue);
            button.setTitle("Content: " + e.newValue / 4);
            console.warn("Change");
        })
        console.warn("Hello");
        const tool = new Tool("textures/items/apple","Title","Description");
        tool.onKeyboardKeyPress.subscribe((e)=>{
            console.warn("Key pressed");
        },KeyboardKey.KEY_T, InputModifier.Control);
        this.toolView.addTool(tool);
        tool.bindVisibleElements(pane);
        this.properties = pane.propertyDictionary as any;
        this.toolView.addEditorPanes(pane);
    }
}

PaneByPane.Registry();
AutoSizeBarExtension.Registry();
Ctrl_T.Registry();