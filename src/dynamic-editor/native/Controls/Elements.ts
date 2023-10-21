import { ServerUXEventType, StatusBarItemAlignment } from "dynamic-editor/core";
import { BaseControl, BooleanProperty, Element, NumberProperty, StringProperty, VisualElement } from "./GeneralUI";
import { StatusBarAlignmentProperty } from "./Properties";

export class StatusBarItem extends VisualElement<{size:NumberProperty,text:StringProperty,alignment:StatusBarAlignmentProperty}>{
    constructor(){
        super({
            alignment: new StatusBarAlignmentProperty(0),
            text: new StringProperty(""),
            size: new NumberProperty(0)
        });
    }
    get alignment(){return this.getPropertyValue("alignment")??StatusBarItemAlignment.Right;}
    set alignment(v){ this.setPropertyValue("alignment",v)}
    get text(){return this.getPropertyValue("text")??"";}
    set text(v){ this.setPropertyValue("text",v)}
    get size(){return this.getPropertyValue("size")??0;}
    set size(v){ this.setPropertyValue("size",v)}
    setText(text: string){
        this.setPropertyValue("text",text);
        return this;
    }
    setSize(size: number){
        this.setPropertyValue("size",size);
        return this;
    }
    setAlignmentt(alignment: StatusBarItemAlignment){
        this.setPropertyValue("alignment",alignment);
        return this;
    }
    protected readonly REMOVE_TYPE = ServerUXEventType.ReleaseStatusBarItem;
    protected readonly UPDATE_TYPE = ServerUXEventType.UpdateStatusBarItem;
}
export {};