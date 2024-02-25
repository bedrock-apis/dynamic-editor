import { ActionType, ButtonVariant, IPacket, InternalPaneElementTypes, PublicEvent, TriggerEvent } from "dynamic-editor/core";
import { ContentPaneElement, ValuePaneElement } from "./Panes";
import { BooleanProperty, NumberProperty, StringProperty } from "./General";
import { ArrayProperty, ButtonVariantProperty, DropdownItemsMapingProperty, Vector3Property } from "./Properties";
import { ElementProperty } from "./Base";
import { Vector3 } from "@minecraft/server";
import { INIT_FLAG, PacketBuilder, REMOVE_FLAG } from "../Packets";
import { Action } from "../Editor/index";

export class DividerPaneElement extends ValuePaneElement<InternalPaneElementTypes.Divider,{},BooleanProperty>{
    constructor(){
        super({
            value:{property:new BooleanProperty(),isFake:true}
        },InternalPaneElementTypes.Divider);
        this.setProperty("value",this.getProperty("visible"));
    }
}
export class BooleanPaneElement extends ValuePaneElement<InternalPaneElementTypes.Boolean,{displayAsToggleSwitch: BooleanProperty},BooleanProperty>{
    constructor(title: string){
        super({
            displayAsToggleSwitch:{property: new BooleanProperty(false), isFake:true},
            value:{property:new BooleanProperty(false)}
        },InternalPaneElementTypes.Boolean);
        this.setPropertyValue("titleAltText",title);
    }
    protected getMainPacketDataItemOptions(flags: number, packets: IPacket[]) {
        const data = super.getMainPacketDataItemOptions(flags, packets);
        data.displayAsToggleSwitch = this.propertyBag["displayAsToggleSwitch"].property.value;
        return data;
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
    readonly onButtonClick = new PublicEvent<[this]>();
    constructor(label: string, callback?: (sender: ButtonPaneElement)=>void){
        const a = new ButtonVariantProperty();
        super({
            variant: {property:a,isFake:true},
        },InternalPaneElementTypes.Button);
        this.setPropertyValue("titleAltText",label);
        this._action.onActionExecute.subscribe(e=>TriggerEvent(this.onButtonClick, this));
        if(callback) this.onButtonClick.subscribe(callback);
    }
    setVariant(variant: ButtonVariant){
        this.setPropertyValue("variant", variant);
        return this;
    }
    protected getMainPacketDataItemOptions(flags: number, packets: IPacket[]){
        const data = super.getMainPacketDataItemOptions(flags, packets);
        data.variant = this.propertyBag["variant"].property.value;
        return data;
    }
    /**@deprecated Internal method */
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
    addClickHandler(method: (e: this)=>void){
        this.onButtonClick.subscribe(method);
        return this;
    }
    removeClickHandler(method: (e: this)=>void){
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
    /**
     * You should use this method just once, this pane element is not fully dynamic as other ones
     * @param array The array of elements
     * @returns 
     */
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