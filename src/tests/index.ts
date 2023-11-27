import { Difficulty, Direction } from "@minecraft/server";
import { 
    EditorExtension,
    EditorPane,
    ButtonPaneElement,
    DropdownPaneElement
} from "dynamic-editor";


class MyExtension extends EditorExtension{
    async Initialize(){
        const pane = new EditorPane();
        const dropdown = new DropdownPaneElement("Dropdown items").setDropdownItems(Object.keys(Direction));
        pane.addElements(dropdown,new ButtonPaneElement("Change to difficulty").addClickHandler(()=>dropdown.setDropdownItems(Object.keys(Difficulty))));
        this.toolView.addEditorPanes(pane);
    }
}
MyExtension.Registry();