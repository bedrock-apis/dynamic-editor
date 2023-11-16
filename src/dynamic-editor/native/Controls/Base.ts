import { IUniqueObject, NoConstructor, PublicEvent, TriggerEvent, UNIQUE_SYMBOL, core } from "../../core/index";
import { EditorControlManager } from "../Editor/EditorControlManager";
import { PropertyValueChangeEvent, PropertyValueChangeEventData, ValueChangeEvent, ValueChangeEventData } from "../Events";
import { Displayable } from "../Packets";

export type ElementExtendable = {[key: string]: ElementProperty<any>};
export type ElementConstruction<PropertyRecord> = {[K in keyof PropertyRecord]: {property: PropertyRecord[K],isFake?: boolean}}
export const NULL_TYPE: unique symbol = Symbol("NULL");


export interface IContentElement extends Element<any>{
    setContent(content: string): this;
}


export class Property<T>{
    static readonly UNIQUE_TYPE: symbol = NULL_TYPE;
    static readonly EXPECTED_VALUE_TYPE?: string = undefined;
    protected readonly _type?: symbol;
    protected readonly _expectedType?: string;
    readonly onValueChange = new ValueChangeEvent<T>;
    protected constructor(){this._type = new.target.UNIQUE_TYPE; this._expectedType = new.target.EXPECTED_VALUE_TYPE;};
}
export class ElementProperty<T> extends Property<T>{
    protected readonly value: T | null;
    protected readonly defualtValue?: T
    protected readonly _typeOf: string;
    protected constructor(defaultValue: T){
        super();
        this._typeOf = typeof defaultValue;
        this.value = defaultValue;
        this.defualtValue = defaultValue;
    }
    protected isValidType(v: any){return typeof v === this._typeOf;}
    protected getType(v: T): T{return v;}
    setValue(value: T){
        if(!this.isValidType(value)) throw new TypeError("Invalid value type: '" + value + "' expected " + (this._expectedType??this._typeOf) );
        //@ts-ignore
        this.value = this.getType(value);
        TriggerEvent(this.onValueChange,new ValueChangeEventData(this.value??this.defualtValue as T,value));
        return this;
    }
    getValue(): T{return this.value??this.defualtValue as T;}
    toJSON(){return this.getValue();}
    valueOf(){return this.getValue();}
}

export class BindedSource<S extends ElementExtendable, T extends ElementExtendable>{
    readonly targetElement: Element<T>;
    readonly targetPropertyName: keyof T;
    readonly sourceElement: Element<S>;
    readonly sourcePropertyName: keyof S;
    //@ts-ignore
    readonly method: (value: any)=>any
    private constructor(targetElement: Element<T>, targetPropertyName: keyof T, sourceElement: Element<S>, sourcePropertyName: keyof S, method: (data: any)=>any){
        this.method = method;
        this.targetElement = targetElement;
        this.targetPropertyName = targetPropertyName;
        this.sourceElement = sourceElement;
        this.sourcePropertyName = sourcePropertyName;
    }
}
export class Element<PropertyRecord extends ElementExtendable = {}> extends Displayable implements IUniqueObject{
    [UNIQUE_SYMBOL]: true = true;
    //@ts-ignore
    static BindProperty<L extends ElementExtendable, P extends ElementExtendable, K extends keyof L, K2 extends keyof P>(targetElement: Element<P>, targetPropertyName: K2,sourceElement: Element<L>, sourcePropertyName: K,convertor?:(value: L[K]["value"])=>P[K2]["value"]){
        const method = sourceElement.onPropertyValueChange.subscribe(({newValue, propertyName})=>{
            if(propertyName === sourcePropertyName) targetElement.setPropertyValue(targetPropertyName, convertor?.(newValue)??newValue);
        });
        //@ts-ignore
        return new BindedSource(targetElement,targetPropertyName,sourceElement,sourcePropertyName,method as any);
    }
    static UnbindProperty<L extends ElementExtendable, P extends ElementExtendable>(bindedSource: BindedSource<L,P>){
        bindedSource.sourceElement.onPropertyValueChange.unsubscribe(bindedSource.method);
        return null;
    }
    //@ts-ignore
    readonly onPropertyValueChange = new PropertyValueChangeEvent<PropertyRecord,this>;
    protected readonly propertyBag: PropertyRecord;
    protected readonly _isFakes: Map<keyof PropertyRecord,boolean>;
    protected _isChanging = false;
    private readonly _methods;
    protected constructor(properties: ElementConstruction<PropertyRecord>){
        super();
        this._methods = new WeakMap();
        this._isFakes = new Map();
        const bag = {} as any;
        for (const propertyName of Object.getOwnPropertyNames(properties)) {
            const {property,isFake} = properties[propertyName];
            bag[propertyName] = property;
            this._isFakes.set(propertyName,isFake??false);
            const method = property.onValueChange.subscribe(e=>this._TriggerPropertyChange(this,e.newValue,propertyName,e.oldValue,property))
            this._methods.set(property,method);
        }
        this.propertyBag = bag as any;
    }
    getPropertyNames(): (keyof PropertyRecord)[]{
        return [...Object.getOwnPropertyNames(this.propertyBag)];
    }
    hasProperty<T extends string>(propertyName: T): boolean { return propertyName in this.propertyBag;}
    getProperty<T extends keyof PropertyRecord>(propertyName: T): PropertyRecord[T]{return this.propertyBag[propertyName];}
    //@ts-ignore
    getPropertyValue<T extends keyof PropertyRecord, V extends PropertyRecord[T]>(propertyName: T): V["value"] {return this.propertyBag[propertyName].getValue();}
    setProperty<T extends keyof PropertyRecord>(propertyName: T, property: PropertyRecord[T]): this{
        if(!this.hasProperty(propertyName as string)) throw new ReferenceError("Unknow property: " + (propertyName as string));
        const prop = this.propertyBag[propertyName];
        //@ts-ignore
        if(property._type != prop._type) throw new TypeError("Can't assign '" + property._type?.description + "' type to type of '" + prop._type?.description + "'");
        prop.onValueChange.unsubscribe(this._methods.get(prop));
        this._methods.delete(prop);
        const method = property.onValueChange.subscribe(e=>this._TriggerPropertyChange(this,e.newValue,propertyName,e.oldValue,property))
        this._methods.set(property,method);

        this.propertyBag[propertyName] = property;
        //@ts-ignore
        if(prop.value !== property.value) {
            //@ts-ignore
            this._TriggerPropertyChange(this,property.value,propertyName,prop.value,property);
        }
        return this;
    }    
    //@ts-ignore
    setPropertyValue<T extends keyof PropertyRecord>(propertyName: T, value: PropertyRecord[T]["value"]): this{
        this.propertyBag[propertyName].setValue(value);
        return this;
    }
    getMainPacketData(flags?: number): any {
        const data = super.getMainPacketData(flags) as any;
        for (const key of this.getPropertyNames()) if(!this._isFakes.get(key as string)) data[key] = this.propertyBag[key];
        return data;
    }
    //@ts-ignore
    protected _TriggerPropertyChange<T extends keyof PropertyRecord>(el: Element<PropertyRecord>,nV:PropertyRecord[T]["value"],pN: T,oV:PropertyRecord[T]["value"],p:PropertyRecord[T]){
        const baseChanging = this._isChanging;
        this._isChanging = true;
        //@ts-ignore
        TriggerEvent(this.onPropertyValueChange,new PropertyValueChangeEventData(this,pN,p,oV,nV));
        this._isChanging = baseChanging;
        if(!this._isChanging) TriggerEvent(this.onUpdate,this);
    }
    protected _setPropertyRealness<T extends keyof PropertyRecord>(key: T, isReal: boolean){
        this._isFakes.set(key,!isReal);
        return this;
    }
    protected _getPropertyRealness<T extends keyof PropertyRecord>(key: T){
        return !this._isFakes.get(key);
    }
    protected _isPropertyReal<T extends keyof PropertyRecord>(key: T){
        return this._isFakes.get(key) !== true;
    }
}
export class BaseControl<T extends Displayable> extends Displayable{
    protected readonly _eventHandler = new Map<T,any>;
    protected readonly _manager;
    protected readonly _instanceConstructor;
    protected _isDisposed = false;
    //@ts-ignore
    readonly get isDisposed(){return this._isDisposed;}
    //@ts-ignore
    readonly get elementsCount(){return this._elements.size;}
    protected constructor(manager: EditorControlManager, instanceOf: (new ()=>T) | (()=>T)){
        if(!core.isNativeCall) throw new ReferenceError(NoConstructor + BaseControl.name);
        super();
        this._instanceConstructor = instanceOf;
        this._manager = manager;
    }
    addItem(item: T){
        if(this._isDisposed) throw new ReferenceError("You can't manipulate with disposed elements.");
        if(!(item instanceof this._instanceConstructor)) return false;
        if(this._eventHandler.has(item)) return true;
        TriggerEvent(this.onUpdate,this);
        TriggerEvent(this.onInit,item);
        const method = item.onUpdate.subscribe((e)=>TriggerEvent(this.onUpdate,e));
        this._eventHandler.set(item,method);
        return true;
    }
    removeItem(item: T){
        if(this._isDisposed) throw new ReferenceError("You can't manipulate with disposed elements.");
        if(!(item instanceof this._instanceConstructor)) return false;
        if(this._eventHandler.has(item)) {
            TriggerEvent(this.onUpdate,this);
            TriggerEvent(this.onDispose,item);
            item.onUpdate.unsubscribe(this._eventHandler.get(item));
            return true;
        };
        return false;
    }
    *getItems(){if(this._isDisposed) throw new ReferenceError("You can't manipulate with disposed elements."); for (const item of this._eventHandler.keys()) yield item;}
    hasItem(item: any){if(this._isDisposed) throw new ReferenceError("You can't manipulate with disposed elements.");return this._eventHandler.has(item);}
    *displayInitPackets(){
        for (const key of this._eventHandler.keys()) {
            yield * key.displayInitPackets();
        }
    }
    *displayDisposePackets(){
        this._isDisposed = true;
        for (const key of this._eventHandler.keys()) {
            key.onUpdate.unsubscribe(this._eventHandler.get(key));
            yield * key.displayDisposePackets();
        }
        this._eventHandler.clear();
    }
}