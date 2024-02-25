import { 
    EditorExtension,
    EditorPane,
    ButtonPaneElement,
    NumberPaneElement,
    Tool,
    NumberProperty,
    ButtonVariant,
    BooleanPaneElement
} from "dynamic-editor";


export class PaneByPane extends EditorExtension{
    async Initialize(){
        const baseSizeProperty = new NumberProperty(20); //This property is created manualy but we can use property created by NumberPaneElement constructor as well

        const pane1 = new EditorPane("Pane 1").setVisibility(false); // Invisible by defualt 

        pane1.addElement( //adding slidebar number element
            new NumberPaneElement("Number item", true)
            .setMinMaxValues(20,50)
            .setProperty("value", baseSizeProperty) //Assign Property
        );

        
        const showHide = new BooleanPaneElement("Show/Hide");
        pane1.addElement(showHide);
        



        const pane2 = new EditorPane("The Pane2").setVisibility(false); // Invisible by defualt
        pane2.setProperty("width", baseSizeProperty); //Set property of width



        const button = new ButtonPaneElement("Some Button").addClickHandler(this.buttonHandler);

        //Bind title to button variane property, this binding is not sharing of same property it uses on propertyChange
        button.getProperty("variant").createPropertyBinder(pane1.getProperty("titleAltText"), (e)=>"Current variant: " + e);
        
        //Set button visibility depending on show/hide property
        button.setProperty("visible", showHide.getProperty("value"));



        pane2.addElement(button).addElement(new ButtonPaneElement("Second Button", this.buttonHandler));


        
        const tool = new Tool("textures/items/apple","PaneByPane","Description");
        tool.bindVisibleElements(pane1, pane2); //Bind panes visisbility to specific tool, thats why they are invisible by defualt

        this.toolView.addTool(tool);
        this.toolView.addEditorPanes(pane1, pane2);
    }
    buttonHandler(sender: ButtonPaneElement){
        console.warn("Hello World from button");
        const variants = Object.keys(ButtonVariant) as ButtonVariant[];
        sender.setVariant(variants[Math.floor(Math.random() * variants.length)]); //Change a variant on click
    }
}