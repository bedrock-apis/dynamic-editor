import { IPacket, InternalPaneElementTypes, ServerUXEventType, TriggerEvent, UNIQUE_SYMBOL, UUID } from "dynamic-editor/core";
import { BooleanProperty, ModingElement, NumberProperty, RenderingElement, StringProperty } from "./General";
import { Displayable, INIT_FLAG, REMOVE_FLAG, UPDATE_FLAG } from "../Packets";
import { ElementConstruction, ElementExtendable, ElementProperty, ElementPropertyType } from "./Base";
import { PlayerDisplayManager } from "../Editor/EditorDisplayManager";
import { ValueChangeEvent, ValueChangeEventData } from "../Events";

const PROPERTY_DICTIONARY_HANDLER: ProxyHandler<EditorPane<any>> = {
    getPrototypeOf(t){return Object.prototype;},
    setPrototypeOf(t){return false;},
    isExtensible(t){return false;},
    preventExtensions(target) {return true;},
    //@ts-ignore
    ownKeys(t){return [...t._paneElementPropertiesMap.keys()];},
    //@ts-ignore
    get(t,p){return t._paneElementPropertiesMap.has(p)?t._paneElementPropertiesMap.get(p as any).getValue():Object.prototype[p];},
    set(t,p,n){
        //@ts-ignore
        t._paneElementPropertiesMap.get(p as any).setValue(n);
        return true;
    },
    //@ts-ignore
    has(t, p) {return t._paneElementPropertiesMap.has(p) || (p in Object.prototype);},
    deleteProperty(){return false},
    defineProperty(){return false},
    //@ts-ignore
    getOwnPropertyDescriptor(t,p){return t._paneElementPropertiesMap.has(p)?{configurable:false,enumerable:true,writable:false,value:t._paneElementPropertiesMap.get(p)?.getValue?.()}:undefined;}
}

export interface IPaneElement<T extends ValuePaneElement<any,any,any>> extends Displayable<any>{
    getSelfElement(): T;
}
export interface IGetPaneElement<T extends ElementProperty<any>, K extends ValuePaneElement<any,any,any> = any> extends IPaneElement<K>{
    getPaneProperty(): T;
    setPaneProperty(p: T): this;
    canAssignPaneProperty(p: any): boolean
}
export class PaneElement<T extends InternalPaneElementTypes,PropertyRecord extends ElementExtendable = {}> extends ModingElement<PropertyRecord> implements IPaneElement<ValuePaneElement<T,PropertyRecord,any>>{
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
    /**@deprecated Internal method */
    getMainPacketData(flags: number, packets: IPacket[]) {
        const data = super.getMainPacketData(flags,packets);
        data.paneId = flags === REMOVE_FLAG?this.lastPaneId:this.paneId;
        this._lastPaneId = undefined;
        data.property = "";
        data.typeName = this.typeName;
        data.propertyItemOptions = this.getMainPacketDataItemOptions(flags,packets);
        return data;
    }
    getSelfElement(): ValuePaneElement<T, PropertyRecord, any> {return this as any;}
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
export class ValuePaneElement<T extends InternalPaneElementTypes, PropertyRecord extends ElementExtendable, P extends ElementProperty<any>> extends ContentPaneElement<T,{value:P} & PropertyRecord> implements IGetPaneElement<P>{
    protected constructor(properties: ElementConstruction<PropertyRecord & {value: P}>,typeName: T){
        super({
            ...properties
        } as any,typeName);
        this.typeName = typeName;
    }
    getPaneProperty(): P {return this.getProperty("value");}
    setPaneProperty(p: P): this { this.setProperty("value", p as any); return this;}
    canAssignPaneProperty(p: any): boolean {return this.canAssignToProperty("value",p);}
    protected readonly _propertyKey = "p-" + UUID.generate();
    readonly onUserInputValue = new ValueChangeEvent<ElementPropertyType<P>>; 
    get value():ElementPropertyType<P> {return this.getPropertyValue("value");}
    set value(v: ElementPropertyType<P>){ this.setPropertyValue("value",v);}
    setValue(value: ElementPropertyType<P>){
        this.setPropertyValue("value",value);
        return this;
    }
    getValue(): ElementPropertyType<P>{
        return this.getPropertyValue("value");
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
export class EditorPane<T extends {[key: string]: any} = {}> extends RenderingElement<{collapsed: BooleanProperty, titleAltText: StringProperty, titleStringId: StringProperty, width:NumberProperty}> implements IPaneElement<any>{
    protected PACKET_TYPES = {
        [REMOVE_FLAG]: ServerUXEventType.ReleasePropertyPane,
        [INIT_FLAG]: ServerUXEventType.UpdatePropertyPane,
        [UPDATE_FLAG]: ServerUXEventType.UpdatePropertyPane
    };
    [UNIQUE_SYMBOL](d: PlayerDisplayManager){return d.addReverses(this,"pane-");}
    protected _parentPane: any;
    protected readonly _paneElementHandler = new Map<IPaneElement<any>,{element:PaneElement<any,any>,propertyName?:string,method:any,prop:any}>();
    protected readonly _paneElementPropertiesMap = new Map<string,ElementProperty<any>>;
    protected readonly _properties = new Map<string,ValuePaneElement<any,any,any>>();
    protected readonly _currentElement: SubPaneElement;
    protected readonly _propertyDictionary: {[key: string]: any};
    get elementsCount(){return this._paneElementHandler.size;}
    get propertyDictionary(){return this._propertyDictionary;}
    get propertyDictionaryProperties(): {[key: string]: ElementProperty<any>}{
        const obj = {} as any;
        for (const [k,v] of this._paneElementPropertiesMap.entries()) {
            obj[k] = v;
        }
        return obj;
    }
    constructor(title?: string){
        const t = new StringProperty(title??"");
        super({
            collapsed:{property: new BooleanProperty(false)},
            titleAltText:{property: t},
            titleStringId:{property: t},
            width:{property: new NumberProperty(30.05)}
        });
        //@ts-ignore
        this._currentElement = new SubPaneElement(this);
        this._propertyDictionary = new Proxy(this, PROPERTY_DICTIONARY_HANDLER) as any;
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
    /**
     * 
     * @param e Element to add
     * @param key if specified than elements value is wrapped to propertyDictionary of this pane
     * @returns this
     */
    addElement<K extends string, L extends ValuePaneElement<any, any, S>, S extends ElementProperty<J>, J extends any>(e: IPaneElement<L>, key?: K): this & EditorPane<T & {[N in K]: J}>{
        if(this._paneElementHandler.has(e)) return this;
        if(typeof e.getSelfElement !== "function") throw new TypeError("getSelfElement must be a function.");
        const element = e.getSelfElement();
        if(!(element instanceof PaneElement)) throw new TypeError("returned element is not instance of PaneElement.");
        //@ts-ignore
        if(element.paneId === this) return this;
        //@ts-ignore
        if(typeof element.paneId === "object") throw new TypeError("This element is owned but different pane");        
        if(typeof key === "string" && ((key?.length??0) > 0)){
            if(!element.hasProperty("value")) null;
            else if(this._paneElementPropertiesMap.has(key)){
                const canAssign = element.getOriginalPropertyConstructor("value").CanAssign(this._paneElementPropertiesMap.get(key) as any);
                if(!canAssign) throw new TypeError("This element can not be assigned to '" + key + "' key.");
                element.setProperty("value", this._paneElementPropertiesMap.get(key));
            }
            else{
                this._paneElementPropertiesMap.set(key, element.getProperty("value"));
            }
        }
        const method = element.onUpdate.subscribe((...e)=>TriggerEvent(this.onUpdate,...e));
        TriggerEvent(this.onUpdate,element,INIT_FLAG);
        const prop = (element as any)._propertyKey as any; 
        if(prop) this._properties.set(prop,element as any);
        this._paneElementHandler.set(e,{element,method,prop,propertyName:key});

        //@ts-ignore
        element.paneId = this; 
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
        // if(flags === INIT_FLAG) Now is required for every visibility update sends whole content as well, idk why mojang made this change?
        data.propertyItems = this._getPropertyItems(flags, packets);
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