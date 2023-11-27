import { EditorInputContext, IPacket, InputModifier, KeyboardKey, PublicEvent, ServerUXEventType, StatusBarItemAlignment, TriggerEvent, UNIQUE_SYMBOL } from "dynamic-editor/core/index";
import { BooleanProperty, NumberProperty, StringProperty, ModedElement, RenderingElement } from "./General";
import { StatusBarAlignmentProperty } from "./Properties";
import { ControlBindedAction, NoArgsPayload } from "../Editor/EditorActions";
import { FakeUpdatable, INIT_FLAG, PacketBuilder, REMOVE_FLAG, ServerUXEventPacket, UPDATE_FLAG } from "../Packets";
import { ACTION_RETURNER, Element, ElementConstruction, ElementExtendable, ElementProperty, IActionLike, IContentElement, IObjectType, OBJECT_TYPE } from "./Base";
import { KeyInputActionsEvent, MouseClickEvent, MouseDragEvent, MouseInputActionsEvent, MouseWheelEvent } from "./Actions";
import { PlayerDisplayManager } from "../Editor/EditorDisplayManager";

export class StatusBarItem extends ModedElement<{size:NumberProperty,text:StringProperty,alignment:StatusBarAlignmentProperty}> implements IContentElement{
    protected readonly PACKET_TYPES = { 
        [UPDATE_FLAG]: ServerUXEventType.UpdateStatusBarItem,
        [REMOVE_FLAG]: ServerUXEventType.ReleaseStatusBarItem,
        [INIT_FLAG]: ServerUXEventType.UpdateStatusBarItem
    };
    constructor(content?: string){
        super({
            alignment:{property:new StatusBarAlignmentProperty(0)},
            text:{property:new StringProperty(content??"")},
            size:{property: new NumberProperty(0)}
        });
    }
    get alignment(): StatusBarItemAlignment{return this.getPropertyValue("alignment")??StatusBarItemAlignment.Right;}
    set alignment(v: StatusBarItemAlignment){ this.setPropertyValue("alignment",v)}
    get content(): string{return this.getPropertyValue("text")??"";}
    set content(v: string){ this.setPropertyValue("text",v)}
    get size(): number{return this.getPropertyValue("size")??0;}
    set size(v: number){ this.setPropertyValue("size",v)}
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
export class MenuItem<SubProperties extends ElementExtendable = {}> extends ModedElement<{displayStringLocId:StringProperty,name:StringProperty} & SubProperties> implements IContentElement{
    /**@private*/
    _parent: any = undefined;
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
    get content(): string{return this.getPropertyValue("name")??"";}
    set content(v: string){ this.setPropertyValue("name",v as any)}
    setContent(displayText: string){
        this.setPropertyValue("name",displayText as any);
        return this;
    }
    /**@deprecated Internal method */
    getMainPacketData(flags: number, packets: IPacket[]): any {
        const object = super.getMainPacketData(flags,packets);
        if(typeof this._parent === "object") object.parentId = this._parent;
        object.shortcut = ""; //unknown usage from vanilla editor
        return object;
    }
}
export class MenuActionItem extends MenuItem<{checked:BooleanProperty}> implements IActionLike{
    protected readonly _action = new ControlBindedAction(this);
    readonly onActionExecute: PublicEvent<[NoArgsPayload]>;
    protected readonly _triggers = new Set<any>;
    constructor(content: string = ""){
        super({
            checked:{property:new BooleanProperty(false),isFake:true}
        },content);
        this.onActionExecute = this._action.onActionExecute;
    }
    get [ACTION_RETURNER](){return this._action;}
    get checkmarkEnabled(): boolean{return this._getPropertyRealness("checked");}
    set checkmarkEnabled(v: boolean){this.setCheckmarkEnabled(v);}
    get checked(): boolean{return this.getPropertyValue("checked")??false;}
    set checked(v: boolean){ this.setPropertyValue("checked",v)}
    setChecked(isChecked: boolean){
        this.setPropertyValue("checked",isChecked);
        return this;
    }
    setCheckmarkEnabled(enabled: boolean){
        if(enabled === this._isPropertyReal("checked")) return this;
        this._setPropertyRealness("checked",enabled);
        if(!this._isChanging) TriggerEvent(this.onUpdate,this,UPDATE_FLAG);
        return this;
    }
    addActionHandler(handler: (param: NoArgsPayload)=>void){
        this.onActionExecute.subscribe(handler);
        return this;
    }
    addKeyboardTrigger(keyButton: KeyboardKey, modifier: InputModifier = InputModifier.Any){
        this._triggers.add({keyButton,modifier});
        TriggerEvent(this.onUpdate,new FakeUpdatable(PacketBuilder.BindKeyInputActionToContext(this._action,EditorInputContext.GlobalToolMode,keyButton,modifier)),INIT_FLAG);
        return this;
    }
    clearKeyboardTriggers(){
        TriggerEvent(this.onUpdate,new FakeUpdatable(PacketBuilder.UnbindInputActionToContext(this._action,EditorInputContext.GlobalToolMode)),REMOVE_FLAG);
        this._triggers.clear();
        return this;
    }
    *displayInitPackets(){
        yield * super.displayInitPackets();
        yield * this._action.displayInitPackets();
        for (const {keyButton,modifier} of this._triggers) yield PacketBuilder.BindKeyInputActionToContext(this._action,EditorInputContext.GlobalToolMode,keyButton,modifier);
    }
    *displayDisposePackets(){
        yield * this._action.displayDisposePackets();
        yield * super.displayDisposePackets();
    }
}
export class MenuOptionsItem extends MenuItem<{}>{
    constructor(content: string = ""){super({},content);}
    protected readonly _handlers = new Map<MenuItem<any>,any>;
    get elementsLength(){return this._handlers.size;}
    addMenuItem(item: MenuItem<any>){
        if(item._parent === this) return this;
        if(item._parent !== undefined) throw new Error("This menu item is already assigned to MenuBar or a MenuBarOptions");
        item._parent = this;
        this._handlers.set(item,item.onUpdate.subscribe((...a: any)=>TriggerEvent(this.onUpdate,...a)))
        TriggerEvent(this.onUpdate,this,UPDATE_FLAG);
        TriggerEvent(this.onUpdate, item, INIT_FLAG);
        return this;
    }
    removeMenuItem(item: MenuItem<any>){
        if(item._parent !== this as any) throw new Error("This menu item is not one of this menu options.");
        item._parent = undefined;
        item.onUpdate.unsubscribe(this._handlers.get(item));
        this._handlers.delete(item);
        TriggerEvent(this.onUpdate,this,UPDATE_FLAG);
        TriggerEvent(this.onUpdate,item,REMOVE_FLAG);
        return this;
    }
    *getMenuItems(){for (const e of this._handlers.keys()) yield e;}
    hasMenuItem(item: MenuItem<any>){return this._handlers.has(item);}
    /**@deprecated Internal method */
    *displayInitPackets(){
        yield * super.displayInitPackets();
        for (const a of this._handlers.keys()) yield * a.displayInitPackets();
    }
    /**@deprecated Internal method */
    *displayDisposePackets(){
        yield * super.displayDisposePackets();
        for (const a of this._handlers.keys()) yield * a.displayDisposePackets();
    }
}
export interface IUnkownTool{
    readonly id: string
} 
export const TOOL_OBJECT_TYPE = Symbol("Tool");
export class Tool extends ModedElement<{icon:StringProperty,titleString:StringProperty,titleStringLocId:StringProperty,descriptionString:StringProperty,descriptionStringLocId:StringProperty}> implements IObjectType{
    protected packetConstructor: new (data: any) => ServerUXEventPacket = ServerUXEventPacket;
    protected _propertyBindings = new WeakMap();
    protected _isActive = false;
    protected readonly PACKET_TYPES: { [key: number]: number | null; } = {
        [INIT_FLAG]: ServerUXEventType.CreateTool,
        [UPDATE_FLAG]: ServerUXEventType.CreateTool,
        [REMOVE_FLAG]: ServerUXEventType.ReleaseTool
    };
    [UNIQUE_SYMBOL](d: PlayerDisplayManager){return d.addReverses(this,"tool-");}
    readonly [OBJECT_TYPE]: symbol = TOOL_OBJECT_TYPE;
    readonly onActivationStateChange: PublicEvent<[{isSelected: boolean, tool: Tool}]> = new PublicEvent;
    readonly onMouseDrag = new MouseDragEvent(this);
    readonly onMouseClick = new MouseClickEvent(this);
    readonly onMouseWheel = new MouseWheelEvent(this);
    readonly onKeyboardKeyPress = new KeyInputActionsEvent(this);
    readonly isActivePropertyGetter = new BooleanProperty<boolean>(false);
    constructor(icon?: string, title?: string, description?:string){
        const tSP = new StringProperty(title??"");
        const dSP = new StringProperty(description??"");
        super({
            icon:{property:new StringProperty(icon??"")},
            descriptionString:{property:dSP,isFake:true},
            descriptionStringLocId:{property:dSP,isFake:true},
            titleString:{property:tSP,isFake:true},
            titleStringLocId:{property:tSP,isFake:true},
        });
        this.onActivationStateChange.subscribe(e=>{
            this._isActive = e.isSelected;
            (e.isSelected != this.isActivePropertyGetter.getValue())?this.isActivePropertyGetter.setValue(e.isSelected):null;
        });
        this.onMouseClick.onUpdate.subscribe((...p)=>TriggerEvent(this.onUpdate,...p));
        this.onMouseDrag.onUpdate.subscribe((...p)=>TriggerEvent(this.onUpdate,...p));
        this.onMouseWheel.onUpdate.subscribe((...p)=>TriggerEvent(this.onUpdate,...p));
        this.onKeyboardKeyPress.onUpdate.subscribe((...p)=>TriggerEvent(this.onUpdate,...p));
    }
    get icon():string{return this.getPropertyValue("icon")??"";}
    set icon(v:string){this.setPropertyValue("icon",v);}
    get title():string{return this.getPropertyValue("titleString")??"";}
    set title(v:string){this.setPropertyValue("titleString",v);}
    get description():string{return this.getPropertyValue("descriptionString")??"";}
    set description(v:string){this.setPropertyValue("descriptionString",v);}
    get isActivated(): boolean{return this._isActive;}
    setIcon(icon: string){
        this.setPropertyValue("icon",icon);
        return this;
    }
    /**@author ConMaster2112 */
    setTitle(text: string){
        this.setPropertyValue("titleString",text);
        return this;
    }
    /**@deprecated This state of tool doesn't really do anything, but maybe in future its going to do.*/
    setEnable(enable: boolean): this {
        return super.setEnable(enable);
    }
    /**@deprecated This state of tool doesn't really do anything, but maybe in future its going to do.*/
    setVisibility(visible: boolean): this {
        return super.setVisibility(visible);
    }
    setDescription(text: string){
        this.setPropertyValue("descriptionString",text);
        return this;
    }
    bindVisibleElements(...elements: RenderingElement<any>[]){
        for (const pane of elements) {
            if(this._propertyBindings.has(pane)) continue;
            const method = this.isActivePropertyGetter.onValueChange.subscribe(e=>{
                pane.setPropertyValue("visible", e.newValue);
            });
            pane.setPropertyValue("visible",this.isActivated);
            this._propertyBindings.set(pane,method);
        }
        return this;
    }
    unbindVisibleElements(...elements: RenderingElement<any>[]){
        for (const pane of elements) {
            if(!this._propertyBindings.has(pane)) continue;
            const method = this._propertyBindings.get(pane);
            this.isActivePropertyGetter.onValueChange.unsubscribe(method);
            this._propertyBindings.delete(pane);
        }
        return this;
    }
    /**@deprecated Internal method */
    getMainPacketData(flags: number, packets: IPacket[]) {
        const data = super.getMainPacketData(flags, packets);
        data.tooltipData = {
            descriptionString:this.propertyBag["descriptionString"],
            descriptionStringLocId:this.propertyBag["descriptionStringLocId"],
            titleString:this.propertyBag["titleString"],
            titleStringLocId:this.propertyBag["titleStringLocId"]
        };
        return data;
    }
    /**@deprecated Internal method */
    *displayInitPackets(){
        yield * super.displayInitPackets();
        yield * this.onMouseClick.displayInitPackets();   
        yield * this.onMouseDrag.displayInitPackets();   
        yield * this.onMouseWheel.displayInitPackets();   
        yield * this.onKeyboardKeyPress.displayInitPackets();
    }
    /**@deprecated Internal method */
    *displayDisposePackets(){
        yield * this.onKeyboardKeyPress.displayDisposePackets();
        yield * this.onMouseWheel.displayInitPackets();
        yield * this.onMouseDrag.displayInitPackets();
        yield * this.onMouseClick.displayInitPackets();
        yield * super.displayDisposePackets();
    }
}
