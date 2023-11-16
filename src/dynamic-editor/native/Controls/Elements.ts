import { ActionType, PublicEvent, ServerUXEventType, StatusBarItemAlignment, TriggerEvent } from "dynamic-editor/core";
import { BooleanProperty, NumberProperty, StringProperty, VisualElement } from "./General";
import { StatusBarAlignmentProperty } from "./Properties";
import { Action, NoArgsPayload } from "../Editor/EditorActions";
import { INIT_FLAG, PacketBuilder, REMOVE_FLAG, UPDATE_FLAG } from "../Packets";
import { ElementConstruction, ElementExtendable, IContentElement } from "./Base";

export class StatusBarItem extends VisualElement<{size:NumberProperty,text:StringProperty,alignment:StatusBarAlignmentProperty}> implements IContentElement{
    protected readonly PACKET_TYPES = { 
        [UPDATE_FLAG]: ServerUXEventType.UpdateStatusBarItem,
        [REMOVE_FLAG]: ServerUXEventType.ReleaseStatusBarItem,
        [INIT_FLAG]: ServerUXEventType.UpdateStatusBarItem
    };
    constructor(){
        super({
            alignment:{property:new StatusBarAlignmentProperty(0)},
            text:{property:new StringProperty("")},
            size:{property: new NumberProperty(0)}
        });
    }
    get alignment(){return this.getPropertyValue("alignment")??StatusBarItemAlignment.Right;}
    set alignment(v){ this.setPropertyValue("alignment",v)}
    get content(){return this.getPropertyValue("text")??"";}
    set content(v){ this.setPropertyValue("text",v)}
    get size(){return this.getPropertyValue("size")??0;}
    set size(v){ this.setPropertyValue("size",v)}
    setContent(text: string){
        this.setPropertyValue("text",text);
        return this;
    }
    setSize(size: number){
        this.setPropertyValue("size",size);
        return this;
    }
    setAlignment(alignment: StatusBarItemAlignment){
        this.setPropertyValue("alignment",alignment);
        return this;
    }
}
export class AutoSizeStatusBarItem extends StatusBarItem{
    constructor(){
        super();
        //bind size property depending on current text property and its length
        StatusBarItem.BindProperty(this,"size",this,"text",n=>(n?.length??0)*1.25);
    }
}
export class MenuItem<SubProperties extends ElementExtendable = {}> extends VisualElement<{displayStringLocId:StringProperty,name:StringProperty} & SubProperties> implements IContentElement{
    protected readonly _parent = undefined;
    protected readonly PACKET_TYPES = { 
        [UPDATE_FLAG]: ServerUXEventType.UpdateItemMenu,
        [REMOVE_FLAG]: ServerUXEventType.ReleaseItemMenu,
        [INIT_FLAG]: ServerUXEventType.UpdateItemMenu
    };
    protected constructor(properties: ElementConstruction<SubProperties>,content: string){
        const sameProperty = {property:new StringProperty("")};
        super({
            name: sameProperty,
            displayStringLocId:sameProperty,
            ...properties
        } as any);
        this.setContent(content);
    }
    get content(){return this.getPropertyValue("name")??"";}
    set content(v){ this.setPropertyValue("name",v)}
    setContent(displayText: string){
        this.setPropertyValue("name",displayText);
        return this;
    }
    getMainPacketData(flags?: number | undefined): any {
        const object = super.getMainPacketData(flags);
        if(typeof this._parent === "object") object.parentId = this._parent;
        object.shortcut = ""; //unknown usage from vanilla editor
        return object;
    }
}
export class MenuActionItem extends MenuItem<{checked:BooleanProperty}>{
    protected readonly _action = new Action(ActionType.NoArgsAction);
    readonly onActionExecute: PublicEvent<[NoArgsPayload]>;
    constructor(content: string = ""){
        super({
            checked:{property:new BooleanProperty(false),isFake:true}
        },content);
        this.onActionExecute = this._action.onActionExecute;
    }
    get checkmarkEnabled(){return this._getPropertyRealness("checked");}
    set checkmarkEnabled(v: boolean){this.setCheckmarkEnabled(v);}
    get checked(){return this.getPropertyValue("checked")??false;}
    set checked(v){ this.setPropertyValue("checked",v)}
    setChecked(isChecked: boolean){
        this.setPropertyValue("checked",isChecked);
        return this;
    }
    setCheckmarkEnabled(enabled: boolean){
        if(enabled === this._isPropertyReal("checked")) return this;
        this._setPropertyRealness("checked",enabled);
        if(!this._isChanging) TriggerEvent(this.onUpdate,this);
        return this;
    }
    addActionHandler(handler: (param: NoArgsPayload)=>void){
        this.onActionExecute.subscribe(handler);
        return this;
    }
    *displayInitPackets(){
        //@ts-ignore
        yield * this._action.getPackets(INIT_FLAG);
        yield * super.displayInitPackets();
        yield PacketBuilder.BindActionToControlPacket(this._action,this);
    }
    *displayDisposePackets(){
        yield PacketBuilder.UnbindActionToControlPacket(this._action,this);
        //@ts-ignore
        yield * this._action.getPackets(REMOVE_FLAG);
        yield * super.displayDisposePackets();
    }
}
export class MenuOptionsItem extends MenuItem<{}>{
    constructor(content: string = ""){super({},content);}
    protected readonly _handlers = new Map<MenuItem<any>,any>;
    //@ts-ignore
    readonly get elementsLength(){return this._menuItems.size;}
    addMenuItem(item: MenuItem<any>){
        //@ts-ignore
        if(item._parent === this) return this;
        //@ts-ignore
        if(item._parent !== undefined) throw new Error("This menu item is already assigned to MenuBar or a MenuBarOptions");
        //@ts-ignore
        item._parent = this;
        this._handlers.set(item,item.onUpdate.subscribe((e: any)=>TriggerEvent(this.onUpdate,e)))
        TriggerEvent(this.onUpdate,this);
        TriggerEvent(this.onInit, item);
        return this;
    }
    removeMenuItem(item: MenuItem<any>){
        //@ts-ignore
        if(item._parent !== this as any) throw new Error("This menu item is not one of this menu options.");
        //@ts-ignore
        item._parent = undefined;
        item.onUpdate.unsubscribe(this._handlers.get(item));
        this._handlers.delete(item);
        TriggerEvent(this.onUpdate,this);
        TriggerEvent(this.onDispose,item);
        return this;
    }
    *getMenuItems(){for (const e of this._handlers.keys()) yield e;}
    hasMenuItem(item: MenuItem<any>){return this._handlers.has(item);}
    *displayInitPackets(){
        yield * super.displayInitPackets();
        for (const a of this._handlers.keys()) yield * a.displayInitPackets();
    }
    *displayDisposePackets(){
        yield * super.displayDisposePackets();
        for (const a of this._handlers.keys()) yield * a.displayDisposePackets();
    }
}
export {};