import { EditorInputContext, IPacket, InputModifier, KeyboardKey, NoConstructor, PublicEvent, ServerUXEventType, StatusBarItemAlignment, TriggerEvent, core } from "dynamic-editor/core/index";
import { BooleanProperty, NumberProperty, StringProperty, VisualElement } from "./General";
import { StatusBarAlignmentProperty } from "./Properties";
import { ControlBindedAction, NoArgsPayload } from "../Editor/EditorActions";
import { FakeUpdatable, INIT_FLAG, PacketBuilder, PostUIPacket, REMOVE_FLAG, ServerUXEventPacket, UPDATE_FLAG } from "../Packets";
import { ACTION_RETURNER, ElementConstruction, ElementExtendable, ElementPropertyType, IActionLike, IContentElement, IObjectType, OBJECT_TYPE } from "./Base";
import { PlayerDisplayManager } from "../Editor/EditorDisplayManager";
import { MouseInputActionsEvent } from "./Actions";

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
export class AutoSizeStatusBarItem extends StatusBarItem{
    constructor(){
        super();
        //bind size property depending on current text property and its length
        StatusBarItem.BindProperty(this,"size",this,"text",n=>(n?.length??0)*1.25);
    }
}
export class MenuItem<SubProperties extends ElementExtendable = {}> extends VisualElement<{displayStringLocId:StringProperty,name:StringProperty} & SubProperties> implements IContentElement{
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
    getMainPacketData(flags?: number | undefined): any {
        const object = super.getMainPacketData(flags);
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
        if(!this._isChanging) TriggerEvent(this.onUpdate,this);
        return this;
    }
    addActionHandler(handler: (param: NoArgsPayload)=>void){
        this.onActionExecute.subscribe(handler);
        return this;
    }
    addKeyboardTrigger(keyButton: KeyboardKey, modifier: InputModifier = InputModifier.Any){
        this._triggers.add({keyButton,modifier});
        TriggerEvent(this.onInit,new FakeUpdatable(PacketBuilder.BindKeyInputActionToContext(this._action,EditorInputContext.GlobalToolMode,keyButton,modifier)));
        return this;
    }
    clearKeyboardTriggers(){
        TriggerEvent(this.onDispose,new FakeUpdatable(PacketBuilder.UnbindInputActionToContext(this._action,EditorInputContext.GlobalToolMode)));
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
        this._handlers.set(item,item.onUpdate.subscribe((e: any)=>TriggerEvent(this.onUpdate,e)))
        TriggerEvent(this.onUpdate,this);
        TriggerEvent(this.onInit, item);
        return this;
    }
    removeMenuItem(item: MenuItem<any>){
        if(item._parent !== this as any) throw new Error("This menu item is not one of this menu options.");
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
export interface IUnkownTool{
    readonly id: string
} 
export const TOOL_OBJECT_TYPE = Symbol("Tool");
export class Tool extends VisualElement<{icon:StringProperty,titleString:StringProperty,titleStringLocId:StringProperty,descriptionString:StringProperty,descriptionStringLocId:StringProperty}> implements IObjectType{
    protected packetConstructor: new (data: any) => ServerUXEventPacket = PostUIPacket;
    protected readonly PACKET_TYPES: { [key: number]: number | null; } = {
        [INIT_FLAG]: ServerUXEventType.CreateTool,
        [UPDATE_FLAG]: ServerUXEventType.CreateTool,
        [REMOVE_FLAG]: ServerUXEventType.ReleaseTool
    };
    readonly [OBJECT_TYPE]: symbol = TOOL_OBJECT_TYPE;
    readonly onActivationStateChange: PublicEvent<[{isSelected: boolean, tool: Tool}]> = new PublicEvent;
    readonly onMouseInteract = new MouseInputActionsEvent(this);
    readonly isActivePropertyGetter = new BooleanProperty(false);
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
        this.isActivePropertyGetter = new BooleanProperty(false);
        this.onActivationStateChange.subscribe(e=>(e.isSelected != this.isActivePropertyGetter.getValue())?this.isActivePropertyGetter.setValue(e.isSelected):null);
        this.onMouseInteract.onInit.subscribe((...p)=>TriggerEvent(this.onInit,...p));
        this.onMouseInteract.onUpdate.subscribe((...p)=>TriggerEvent(this.onUpdate,...p));
        this.onMouseInteract.onDispose.subscribe((...p)=>TriggerEvent(this.onDispose,...p));
    }
    get icon():string{return this.getPropertyValue("icon")??"";}
    set icon(v:string){this.setPropertyValue("icon",v);}
    get title():string{return this.getPropertyValue("titleString")??"";}
    set title(v:string){this.setPropertyValue("titleString",v);}
    get description():string{return this.getPropertyValue("descriptionString")??"";}
    set description(v:string){this.setPropertyValue("descriptionString",v);}
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
    getMainPacketData(flags?: number | undefined) {
        const data = super.getMainPacketData(flags);
        data.tooltipData = {
            descriptionString:this.propertyBag["descriptionString"],
            descriptionStringLocId:this.propertyBag["descriptionStringLocId"],
            titleString:this.propertyBag["titleString"],
            titleStringLocId:this.propertyBag["titleStringLocId"]
        };
        return data;
    }
    *displayInitPackets(): Generator<IPacket, any, unknown> {
        console.warn("INIT");
        yield * super.displayInitPackets();
        yield * this.onMouseInteract.displayInitPackets();   
    }
    *displayDisposePackets(){
        console.warn("DISPOSE");
        yield * this.onMouseInteract.displayDisposePackets();
        yield * super.displayDisposePackets();
    }
}
export const KNOWN_TOOLS = new WeakSet();
export class ToolBar extends VisualElement<{}>{
    protected readonly PACKET_TYPES = { 
        [UPDATE_FLAG]: ServerUXEventType.SetActiveTool,
        [REMOVE_FLAG]: ServerUXEventType.ReleaseToolRail,
        [INIT_FLAG]: ServerUXEventType.SetActiveTool
    };
    protected readonly _eventHandler = new Map<Tool,any>(); 
    protected activeTool: any = null;
    get toolsCount(){return this._eventHandler.size;}
    private constructor(display: PlayerDisplayManager){
        if(!core.isNativeCall) throw new ReferenceError(NoConstructor + ToolBar.name);
        display.onToolAtivate.subscribe(({tool})=>{this.activeTool = tool;});
        super({});
    }
    setActiveTool(item: Tool | null){
        this.activeTool = item;
        TriggerEvent(this.onUpdate,this);
    }
    getActiveTool(): Tool | IUnkownTool | null{
        return this.activeTool;
    }
    *getTools(){for (const K of this._eventHandler.keys()) yield K;}
    addTool(item: Tool){
        if(item[OBJECT_TYPE] !== TOOL_OBJECT_TYPE) throw new TypeError("Object is not type of Tool.");
        if(this._eventHandler.has(item)) return true;
        if(KNOWN_TOOLS.has(item)) throw new ReferenceError("This tool is already used by different person.");
        TriggerEvent(this.onInit,item);
        const method = item.onUpdate.subscribe((e)=>TriggerEvent(this.onUpdate,e));
        this._eventHandler.set(item,method);
        KNOWN_TOOLS.add(item);
        return true;
    }
    removeTool(item: Tool){
        if(item[OBJECT_TYPE] !== TOOL_OBJECT_TYPE) throw new TypeError("Object is not type of Tool.");
        if(!this._eventHandler.has(item)) return false;
        TriggerEvent(this.onDispose,item);
        item.onUpdate.unsubscribe(this._eventHandler.get(item));
        this._eventHandler.delete(item);
        KNOWN_TOOLS.delete(item);
        return true;
    }
    hasTool(item: any){return this._eventHandler.has(item);}
    getMainPacketData(flags?: number | undefined) {
        const data = super.getMainPacketData(flags);
        if(this.activeTool === null) data.selectedOptionId = "";
        else if(this.activeTool[OBJECT_TYPE] === TOOL_OBJECT_TYPE) data.selectedOptionId = this.activeTool;
        else data.selectedOptionId = this.activeTool.id;
        return data;
    }
    /**@private */
    *displayInitPackets(): Generator<IPacket, any, unknown> {
        yield * super.displayInitPackets();  
        for (const item of this._eventHandler.keys()) yield * item.displayInitPackets();
    }
    /**@private */
    *displayDisposePackets(): Generator<IPacket, any, unknown> {
        for (const item of this._eventHandler.keys()){
            item.onUpdate.unsubscribe(this._eventHandler.get(item));
            yield * item.displayDisposePackets();
        }
        this._eventHandler.clear();
        yield * super.displayDisposePackets();
    }
    /**@deprecated This value could be desynced by other addons, you shouldn't depend on this feature */
    get isEnabled(): NonNullable<boolean | null> {
        return super.isEnabled;
    }
    /**@deprecated */
    set isEnabled(v: NonNullable<boolean | null>) {
        super.isEnabled = v;
    }
    /**@deprecated This value could be desynced by other addons, you shouldn't depend on this feature */
    get isVisible(): NonNullable<boolean | null> {
        return super.isVisible;
    }
    /**@deprecated */
    set isVisible(v: NonNullable<boolean | null>) {
        super.isVisible = v;
    }
    /**@deprecated This value could be desynced by other addons, you shouldn't depend on this feature */
    getProperty<T extends "visible" | "enabled">(propertyName: T): ({ visible: BooleanProperty; enabled: BooleanProperty; })[T] {
        return super.getProperty(propertyName);
    }
    /**@deprecated This value could be desynced by other addons, you can set, but you should not depend on returned information */
    //
    getPropertyValue<T extends "visible" | "enabled", V extends ({ visible: BooleanProperty; enabled: BooleanProperty; })[T]>(propertyName: T): ElementPropertyType<V> {
        return super.getPropertyValue(propertyName);
    }
    /**@deprecated This value could be desynced by other addons, you shouldn't depend on this feature */
    setProperty<T extends "visible" | "enabled">(propertyName: T, property: { visible: BooleanProperty; enabled: BooleanProperty; }[T]): this {
        return super.setProperty(propertyName,property);
    }
    /**@deprecated This value could be desynced by other addons, you shouldn't depend on this feature */
    setPropertyValue<T extends "visible" | "enabled">(propertyName: T, value: ElementPropertyType<{ visible: BooleanProperty; enabled: BooleanProperty; }[T]>): this {
        return super.setPropertyValue(propertyName,value);
    }
    /**@deprecated This value could be desynced by other addons, you shouldn't depend on this feature */
    setEnable(enable: boolean): this {
        return super.setEnable(enable);
    }
    /**@deprecated This value could be desynced by other addons, you shouldn't depend on this feature */
    setVisibility(visible: boolean): this {
        return super.setVisibility(visible);
    }
}