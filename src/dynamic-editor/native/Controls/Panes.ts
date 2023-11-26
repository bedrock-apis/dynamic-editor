import { ActionType, IPacket, InternalPaneElementTypes, PublicEvent, ServerUXEventType, TriggerEvent, UNIQUE_SYMBOL, UUID } from "dynamic-editor/core";
import { BooleanProperty, ModingElement, NumberProperty, RenderingElement, StringProperty } from "./General";
import { Displayable, INIT_FLAG, PacketBuilder, REMOVE_FLAG, UPDATE_FLAG } from "../Packets";
import { ElementConstruction, ElementExtendable, ElementProperty, ElementPropertyType } from "./Base";
import { PlayerDisplayManager } from "../Editor/EditorDisplayManager";
import { Action } from "../Editor/EditorActions";
import { ArrayProperty, ButtonVariantProperty, DropdownItemsMapingProperty, Vector3Property } from "./Properties";
import { Vector3 } from "@minecraft/server";
import { ValueChangeEvent, ValueChangeEventData } from "../Events";

export interface IPaneElement<T extends PaneElement<any,any>> extends Displayable<any>{
    getSelfElement(): T;
}
export class PaneElement<T extends InternalPaneElementTypes,PropertyRecord extends ElementExtendable = {}> extends ModingElement<PropertyRecord> implements IPaneElement<PaneElement<T,PropertyRecord>>{
    protected PACKET_TYPES = {
        [REMOVE_FLAG]: ServerUXEventType.ReleasePaneControl,
        [INIT_FLAG]: ServerUXEventType.UpdatePaneControl,
        [UPDATE_FLAG]: ServerUXEventType.UpdatePaneControl
    }; 
    protected _paneId: any;
    protected _lastPaneId: any;
    protected get paneId(){return this._paneId};
    protected set paneId(v){this._paneId = v;};
    protected get lastPaneId(){return this._lastPaneId};
    protected set lastPaneId(v){this._lastPaneId = v;};
    protected typeName: T;
    protected propertyItemOptions: any;
    protected constructor(properties: ElementConstruction<PropertyRecord>,typeName: T){
        super(properties);
        this.typeName = typeName;
    }
    protected getMainPacketDataItemOptions(flags: number, packets: IPacket[]){
        return {} as any;
    }
    getMainPacketData(flags: number, packets: IPacket[]) {
        const data = super.getMainPacketData(flags,packets);
        data.paneId = flags === REMOVE_FLAG?this.lastPaneId:this.paneId;
        this._lastPaneId = undefined;
        data.property = "";
        data.typeName = this.typeName;
        data.propertyItemOptions = this.getMainPacketDataItemOptions(flags,packets);
        return data;
    }
    getSelfElement(): PaneElement<T, PropertyRecord> {return this;}
}
export class ContentPaneElement<T extends InternalPaneElementTypes, PropertyRecord extends ElementExtendable> extends PaneElement<T,{titleAltText:StringProperty,titleStringId:StringProperty} & PropertyRecord>{
    protected constructor(properties: ElementConstruction<PropertyRecord>,typeName: T){
        const a = new StringProperty("");
        super({
            titleAltText:{property:a,isFake:true},
            titleStringId:{property:a,isFake:true},
            ...properties
        } as any,typeName);
        this.typeName = typeName;
    }
    get title():string {return this.getPropertyValue("titleAltText")??"";}
    set title(v: string){ this.setPropertyValue("titleAltText",(v??"") as any);}
    setTitle(title: string){
        this.setPropertyValue("titleAltText",(title??"") as any);
        return this;
    }
    protected getMainPacketDataItemOptions(flags: number, packets: IPacket[]){
        const data = super.getMainPacketDataItemOptions(flags,packets);
        data.titleAltText = this.propertyBag["titleAltText"].property.value;
        data.titleStringId = this.propertyBag["titleStringId"].property.value;
        return data;
    }
}
export class ValuePaneElement<T extends InternalPaneElementTypes, PropertyRecord extends ElementExtendable, P extends ElementProperty<any>> extends ContentPaneElement<T,{value:P} & PropertyRecord>{
    protected constructor(properties: ElementConstruction<PropertyRecord & {value: P}>,typeName: T){
        super({
            ...properties
        } as any,typeName);
        this.typeName = typeName;
    }
    protected readonly _propertyKey = "p-" + UUID.generate();
    readonly onUserInputValue = new ValueChangeEvent<ElementPropertyType<P>>; 
    get value():ElementPropertyType<P> {return this.getPropertyValue("value");}
    set value(v: ElementPropertyType<P>){ this.setPropertyValue("value",v);}
    setValue(value: ElementPropertyType<P>){
        this.setPropertyValue("value",value);
        return this;
    }
    getValueProperty(): P{return this.getProperty("value");}
    getMainPacketData(flags: number, packets: IPacket[]) {
        const data = super.getMainPacketData(flags, packets);
        data.property = this._propertyKey;
        return data;
    }
    protected _setValue(newValue: any){
        const p = this.getProperty("value");
        const a = new ValueChangeEventData(p.value,newValue);
        TriggerEvent(this.onUserInputValue,a);
        if(!p.isValidType(a.newValue)) throw console.warn("Invalid maped value.",new Error().stack);
        //newValue not p.newValue, if you modify a value you have to update its view so keep a newValue as comparator
        if(newValue !== p.value) p.setValue(newValue);
    }
}
class SubPaneElement extends PaneElement<InternalPaneElementTypes.SubPane,{}>{
    protected readonly pane;
    protected constructor(pane: EditorPane){
        //@ts-ignore
        if(pane._parentPane) throw new ReferenceError("This Pane is already handled");
        super({},InternalPaneElementTypes.SubPane);
        this.pane = pane;
        //@ts-ignore
        this.onUpdate = pane.onUpdate;
    }
    //@ts-ignore
    protected get paneId(): any {return this.pane._parentPane;}
    //@ts-ignore
    protected set paneId(v: any) {  this.pane._parentPane = v; }
    //@ts-ignore
    protected get lastPaneId(): any {return this.pane._lastPaneId;}
    //@ts-ignore
    protected set lastPaneId(v: any) {  this.pane._lastPaneId = v; }
    protected getMainPacketDataItemOptions(flags: number, packets: IPacket[]): any{
        return {
            //@ts-ignore
            pane:this.pane.getMainPacketData(flags, packets)
        };
    }
}
export class EditorPane extends RenderingElement<{collapsed: BooleanProperty, titleAltText: StringProperty,width:NumberProperty}> implements IPaneElement<any>{
    protected PACKET_TYPES = {
        [REMOVE_FLAG]: ServerUXEventType.ReleasePropertyPane,
        [INIT_FLAG]: ServerUXEventType.UpdatePropertyPane,
        [UPDATE_FLAG]: ServerUXEventType.UpdatePropertyPane
    };
    [UNIQUE_SYMBOL](d: PlayerDisplayManager){return d.addReverses(this,"pane-");}
    protected _parentPane: any;
    protected readonly _paneElementHandler = new Map<IPaneElement<any>,{element:IPaneElement<any>,method:any,prop:any}>();
    protected readonly _properties = new Map<string,ValuePaneElement<any,any,any>>();
    protected readonly _currentElement: SubPaneElement;
    get elementCount(){return this._paneElementHandler.size;}
    constructor(title?: string){
        super({
            collapsed:{property: new BooleanProperty(false)},
            titleAltText:{property: new StringProperty(title??"")},
            width:{property: new NumberProperty(30.05)}
        });
        //@ts-ignore
        this._currentElement = new SubPaneElement(this);
    }
    get width():number {return this.getPropertyValue("width")??0;}
    set width(v: number){ this.setPropertyValue("width",(v??50) as any);}
    setWidth(n: number){
        this.setPropertyValue("width",n);
        return this;
    }
    get title():string {return this.getPropertyValue("titleAltText")??"";}
    set title(v: string){ this.setPropertyValue("titleAltText",(v??"") as any);}
    setTitle(title: string){
        this.setPropertyValue("titleAltText",(title??"") as any);
        return this;
    }
    get isCollapsed():boolean {return this.getPropertyValue("collapsed")??false;}
    set isCollapsed(v: boolean){ this.setPropertyValue("collapsed",(v??"") as any);}
    setCollapsed(isCollapsed: boolean){
        this.setPropertyValue("collapsed",(isCollapsed??false) as any);
        return this;
    }
    getElements(){return this._paneElementHandler.keys();}
    addElement(e: IPaneElement<any>){
        if(this._paneElementHandler.has(e)) return this;
        if(typeof e.getSelfElement !== "function") throw new TypeError("getSelfElement must be a function.");
        const element = e.getSelfElement();
        if(!(element instanceof PaneElement)) throw new TypeError("returned element is not instance of PaneElement.");
        //@ts-ignore
        if(element.paneId === this) return this;
        //@ts-ignore
        if(typeof element.paneId === "object") throw new TypeError("This element is owned but different pane");
        const method = element.onUpdate.subscribe((...e)=>TriggerEvent(this.onUpdate,...e));
        TriggerEvent(this.onUpdate,element,INIT_FLAG);
        const prop = (element as any)._propertyKey as any;
        if(prop) this._properties.set(prop,element as any);
        this._paneElementHandler.set(e,{element,method,prop});
        //@ts-ignore
        element.paneId = this;
        return this;
    }
    addElements(...elements: IPaneElement<any>[]){
        for (const e of elements) this.addElement(e);
        return this;
    }
    removeElement(e: IPaneElement<any>){
        if(!this._paneElementHandler.has(e)) return false;
        const {element,method,prop} = this._paneElementHandler.get(e) as any;
        if(prop) this._properties.delete(prop);
        element.onUpdate.unsubscribe(method);
        TriggerEvent(this.onUpdate,element,REMOVE_FLAG);
        this._paneElementHandler.delete(e);
        //@ts-ignore
        element.paneId = undefined;
        element.lastPaneId = this;
        return true;
    }
    protected getMainPacketData(flags: number, packets: IPacket[]) {
        const data = super.getMainPacketData(flags, packets);
        if(flags === INIT_FLAG) data.propertyItems = this._getPropertyItems(INIT_FLAG, packets);
        if(flags === REMOVE_FLAG) {
            //@ts-ignore
            data.parentPaneId = this._lastPaneId;
            //@ts-ignore
            delete this._lastPaneId;
        } else if(this._parentPane) data.parentPaneId = this._parentPane;
        return data;
    }
    protected _getPropertyItems(flag: number, packets: IPacket[]){
        const array = [];
        for (const {element} of this._paneElementHandler.values()) 
            //@ts-ignore
            array.push(element.getMainPacketData(flag, packets))
        return array;
    }
    getSelfElement(): any{return this._currentElement;}
}




export class DividerPaneElement extends PaneElement<InternalPaneElementTypes.Divider>{
    constructor(){
        super({},InternalPaneElementTypes.Divider);
    }
}
export class BooleanPaneElement extends ValuePaneElement<InternalPaneElementTypes.Boolean,{},BooleanProperty>{
    constructor(title: string){
        super({
            value:{property:new BooleanProperty(false)}
        },InternalPaneElementTypes.Boolean);
        this.setPropertyValue("titleAltText",title);
    }
}
export class StringPaneElement extends ValuePaneElement<InternalPaneElementTypes.String,{},StringProperty>{
    constructor(title: string){
        super({
            value:{property:new StringProperty("")}
        },InternalPaneElementTypes.String);
        this.setPropertyValue("titleAltText",title);
    }
}
export class NumberPaneElement extends ValuePaneElement<InternalPaneElementTypes.Number,{min:NumberProperty,max:NumberProperty,showSlider:BooleanProperty},NumberProperty>{
    constructor(title: string, showSlider: boolean = false){
        super({
            value:{property:new NumberProperty(0)},
            max:{property:new NumberProperty(Number.MAX_SAFE_INTEGER),isFake:true},
            min:{property:new NumberProperty(Number.MIN_SAFE_INTEGER),isFake:true},
            showSlider:{property:new BooleanProperty(false),isFake:true}
        },InternalPaneElementTypes.Number);
        this.setTitle(title);
        this.setShowSlider(showSlider);
    }
    setMaxValue(max: number){
        this.setPropertyValue("max",max);
        return this;
    }
    setMinValue(max: number){
        this.setPropertyValue("min",max);
        return this;
    }
    setMinMaxValues(min: number,max: number){
        this.setMinValue(min);
        return this.setMaxValue(max);
    }
    setShowSlider(show: boolean){
        this.setPropertyValue("showSlider",show);
        return this;
    }
    get maxValue(){return this.getPropertyValue("max")??Number.MAX_SAFE_INTEGER;}
    set maxValue(v){this.setPropertyValue("max",v??Number.MAX_SAFE_INTEGER);}
    get minValue(){return this.getPropertyValue("min")??Number.MIN_SAFE_INTEGER;}
    set minValue(v){this.setPropertyValue("min",v??Number.MIN_SAFE_INTEGER);}
    get showSlider(){return this.getPropertyValue("showSlider")??false;}
    set showSlider(v){this.setPropertyValue("showSlider",v??false);}

    protected getMainPacketDataItemOptions(flags: number, packets: IPacket[]){
        const data = super.getMainPacketDataItemOptions(flags, packets);
        data.max = this.propertyBag["max"].property.value;
        data.min = this.propertyBag["min"].property.value;
        data.showSlider  = this.propertyBag["showSlider"].property.value;
        return data;
    }
}
export class ButtonPaneElement extends ContentPaneElement<InternalPaneElementTypes.Button,{variant:ButtonVariantProperty}>{
    protected _action = new Action(ActionType.NoArgsAction);
    readonly onButtonClick = this._action.onActionExecute;
    constructor(label: string){
        super({
            variant: {property:new ButtonVariantProperty(),isFake:true}
        },InternalPaneElementTypes.Button);
        this.setPropertyValue("titleAltText",label);
    }
    protected getMainPacketDataItemOptions(flags: number, packets: IPacket[]){
        const data = super.getMainPacketDataItemOptions(flags, packets);
        data.variant = this.propertyBag["variant"].property.value;
        return data;
    }
    getMainPacketData(flags: number, packets: IPacket[]) {
        if(flags === INIT_FLAG) {
            packets.push(...this._action.displayInitPackets());
            packets.push(PacketBuilder.BindActionToControl(this._action,this));
        } else if (flags === REMOVE_FLAG) {
            packets.push(PacketBuilder.UnbindActionToControl(this._action,this));
            packets.push(...this._action.displayDisposePackets());
        }
        return super.getMainPacketData(flags,packets);
    }
    addClickHandler(method: ()=>void){
        this.onButtonClick.subscribe(method);
        return this;
    }
    removeClickHandler(method: ()=>void){
        this.onButtonClick.unsubscribe(method);
        return this;
    }
}
export class VectorPaneElement extends ValuePaneElement<InternalPaneElementTypes.Vector3,{min:Vector3Property,max:Vector3Property},Vector3Property>{
    constructor(title: string){
        super({
            value:{property:new Vector3Property({x:0,y:0,z:0})},
            max:{property:new Vector3Property({x:Number.MAX_SAFE_INTEGER,y:Number.MAX_SAFE_INTEGER,z:Number.MAX_SAFE_INTEGER}),isFake:true},
            min:{property:new Vector3Property({x:Number.MIN_SAFE_INTEGER,y:Number.MIN_SAFE_INTEGER,z:Number.MIN_SAFE_INTEGER}),isFake:true},
        },InternalPaneElementTypes.Vector3);
        this.setPropertyValue("titleAltText",title);
    }
    setMaxValue(max: Vector3){
        this.setPropertyValue("max",max);
        return this;
    }
    setMinValue(max: Vector3){
        this.setPropertyValue("min",max);
        return this;
    }
    get maxValue(){return this.getPropertyValue("max");}
    set maxValue(v){this.setPropertyValue("max",v);}
    get minValue(){return this.getPropertyValue("min");}
    set minValue(v){this.setPropertyValue("min",v);}
    protected getMainPacketDataItemOptions(flags: number, packets: IPacket[]){
        const data = super.getMainPacketDataItemOptions(flags, packets);
        const {x:maxX,y:maxY,z:maxZ} = this.propertyBag["max"].property.value as Vector3;
        const {x:minX,y:minY,z:minZ} = this.propertyBag["min"].property.value as Vector3;
        Object.assign(data,{maxX,maxY,maxZ,minX,minY,minZ});
        return data;
    }
}
export class DropdownPaneElement<T extends any[]> extends ValuePaneElement<InternalPaneElementTypes.Dropdown,{dropdownItems:DropdownItemsMapingProperty},NumberProperty>{
    protected _options: T = [] as any as T;
    protected _propertyGetter: ElementProperty<T[number] | undefined>;
    constructor(title: string, array?: T){
        super({
            value:{property:new NumberProperty(0)},
            dropdownItems:{property: new DropdownItemsMapingProperty(),isFake:true}
        },InternalPaneElementTypes.Dropdown);
        this.setPropertyValue("titleAltText",title);
        //@ts-ignore
        this._propertyGetter = new ElementProperty(undefined);
        this.onPropertyValueChange.subscribe(({propertyName,newValue})=>{if(propertyName === "value") this._propertyGetter.setValue(this._options[newValue as number])});
        this.setDropdownItems(array??[] as any);
    }
    get selectedValue(): T[number]{return this._options[this.value];}
    get selectedValuePropertyGetter(){return this._propertyGetter;}
    setDropdownItems(array: T){
        const {dropdownItems,options} = DropdownPaneElement.MapDropDownItems(array);
        this.setPropertyValue("dropdownItems",dropdownItems);
        if(this.value >= array.length) this.value = 0;
        this._options = options as any;
        return this;
    }
    static MapDropDownItems(array: any[]){
        const options = new Array(array.length);
        const dropdownItems = [];
        for (let index = 0; index < array.length; index++) {
            const element = options[index] = array[index];
            dropdownItems.push({displayAltText:"" + element,value:index});
        }
        return {dropdownItems,options};
    }
    protected getMainPacketDataItemOptions(flags: number, packets: IPacket[]){
        const data = super.getMainPacketDataItemOptions(flags, packets);
        data.dropdownItems = this.getPropertyValue("dropdownItems");
        if(data.dropdownItems.length < 1) delete data.dropdownItems;
        return data;
    }
}

export class BlockPickerPaneElement extends ValuePaneElement<InternalPaneElementTypes.BlockPicker,{allowedBlocks: ArrayProperty<string>},StringProperty>{
    constructor(title: string){
        super({
            value:{property:new StringProperty("stone")},
            allowedBlocks:{property:new ArrayProperty(["stone","water","dirt","your_sos"]),isFake:true}
        },InternalPaneElementTypes.BlockPicker);
        this.setPropertyValue("titleAltText",title);
    }
    protected getMainPacketDataItemOptions(flags: number, packets: IPacket[]){
        const data = super.getMainPacketDataItemOptions(flags, packets);
        data.allowedBlocks = this.getPropertyValue("allowedBlocks");
        return data;
    }
}