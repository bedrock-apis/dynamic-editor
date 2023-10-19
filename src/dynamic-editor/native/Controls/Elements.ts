import { ServerUXEventType } from "dynamic-editor/core";
import { BooleanProperty, Element, NumberProperty, StringProperty } from "./GeneralUI";
import { StatusBarAlignmentProperty } from "./Properties";

export class StatusBarItem extends Element<{visible:BooleanProperty,size:NumberProperty,enabled:BooleanProperty,text:StringProperty,alignment:StatusBarAlignmentProperty}>{
    constructor(){
        super({
            alignment: new StatusBarAlignmentProperty(0),
            enabled: new BooleanProperty(true),
            visible: new BooleanProperty(true),
            text: new StringProperty(""),
            size: new NumberProperty(0)
        });
    }
    protected readonly REMOVE_TYPE = ServerUXEventType.ReleaseStatusBarItem;
    protected readonly UPDATE_TYPE = ServerUXEventType.UpdateStatusBarItem;
}
export {};