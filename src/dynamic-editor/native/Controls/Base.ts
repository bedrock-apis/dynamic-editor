import { IUniqueObject, NoConstructor, TriggerEvent, UNIQUE_SYMBOL, core } from "../../core/index";
import { Action } from "../Editor/EditorActions";
import { EditorControlManager } from "../Editor/EditorControlManager";
import { PropertyValueChangeEvent, PropertyValueChangeEventData, ValueChangeEvent, ValueChangeEventData } from "../Events";
import { Displayable, ServerUXEventPacket } from "../Packets";

export type ElementExtendable = {[key: string]: ElementProperty<any>};
export type ElementConstruction<PropertyRecord> = {[K in keyof PropertyRecord]: {property: PropertyRecord[K],isFake?: boolean}}
export type ElementPropertyType<T> = T extends ElementProperty<infer A>?A:never;
export const NULL_TYPE: unique symbol = Symbol("NULL");
export const OBJECT_TYPE: unique symbol = Symbol("SYMBOL_TYPE");
export const ACTION_RETURNER: unique symbol = Symbol("ACTION_RETURNER");

export interface IContentElement extends Element<any>{
    setContent(content: string): this;
}
export interface IObjectType{
    readonly [OBJECT_TYPE]: symbol
}
export interface IActionLike{
    readonly [ACTION_RETURNER]: Action<any>;
}


export class Property<T>{
    static readonly UNIQUE_TYPE: symbol = NULL_TYPE;
    static readonly EXPECTED_VALUE_TYPE?: string = undefined;
    /**@private*/
    readonly _type?: symbol;
    /**@private*/
    readonly _expectedType?: string;
    readonly onValueChange = new ValueChangeEvent<T>;
    protected constructor(){this._type = new.target.UNIQUE_TYPE; this._expectedType = new.target.EXPECTED_VALUE_TYPE;};
}
export class ElementProperty<T> extends Property<T>{
    /**@private*/
    value: T | null;
    protected readonly defualtValue: T | null;
    protected readonly _typeOf: string;
    protected readonly _bindedSetters = new WeakMap<ElementProperty<T>,(...params: any)=>any>();
    protected constructor(defaultValue: T | null){
        super();
        this._typeOf = typeof defaultValue;
        this.value = defaultValue;
        this.defualtValue = defaultValue;
    }
    removeSetterBinding(propertyGetter: ElementProperty<T>){
        if(!this._bindedSetters.has(propertyGetter)) return this;
        const m = this._bindedSetters.get(propertyGetter);
        propertyGetter.onValueChange.unsubscribe(m as any);
        this._bindedSetters.delete(propertyGetter);
        return this;
    }
    addSetterBinding(propertyGetter: ElementProperty<T>){
        if(this._bindedSetters.has(propertyGetter)) return this;
        const m = propertyGetter.onValueChange.subscribe((e)=>this.setValue(e.newValue));
        this._bindedSetters.set(propertyGetter,m);
        return this;
    }
    protected isValidType(v: any){return typeof v === this._typeOf;}
    setValue(value: T){
        if(!this.isValidType(value)) throw new TypeError("Invalid value type: '" + value + "' expected " + (this._expectedType??this._typeOf) );
        this.value = value;
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
    readonly method: (value: any)=>any
    constructor(targetElement: Element<T>, targetPropertyName: keyof T, sourceElement: Element<S>, sourcePropertyName: keyof S, method: (data: any)=>any){
        this.method = method;
        this.targetElement = targetElement;
        this.targetPropertyName = targetPropertyName;
        this.sourceElement = sourceElement;
        this.sourcePropertyName = sourcePropertyName;
    }
}
export class Element<PropertyRecord extends ElementExtendable = {}> extends Displayable<ServerUXEventPacket> implements IUniqueObject{
    [UNIQUE_SYMBOL]: true = true;
    static BindProperty<L extends ElementExtendable, P extends ElementExtendable, K extends keyof L, K2 extends keyof P>(targetElement: Element<P>, targetPropertyName: K2,sourceElement: Element<L>, sourcePropertyName: K,convertor?:(value: ElementPropertyType<L[K]>)=>ElementPropertyType<P[K2]>){
        const method = sourceElement.onPropertyValueChange.subscribe(({newValue, propertyName})=>{
            if(propertyName === sourcePropertyName) targetElement.setPropertyValue(targetPropertyName, convertor?.(newValue)??newValue as any);
        });

        return new BindedSource(targetElement,targetPropertyName,sourceElement,sourcePropertyName,method as any);
    }
    static UnbindProperty<L extends ElementExtendable, P extends ElementExtendable>(bindedSource: BindedSource<L,P>){
        bindedSource.sourceElement.onPropertyValueChange.unsubscribe(bindedSource.method);
        return null;
    }
    readonly onPropertyValueChange = new PropertyValueChangeEvent<PropertyRecord,this>;
    protected readonly propertyBag: PropertyRecord;
    protected readonly _isFakes: Map<keyof PropertyRecord,boolean>;
    protected _isChanging = false;
    private readonly _methods;
    private readonly _properties;
    protected constructor(properties: ElementConstruction<PropertyRecord>){
        super(ServerUXEventPacket);
        this._methods = new WeakMap();
        this._properties = new WeakMap();
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
    getPropertyValue<T extends keyof PropertyRecord, V extends PropertyRecord[T]>(propertyName: T): ElementPropertyType<V> {return this.propertyBag[propertyName].getValue();}
    setProperty<T extends keyof PropertyRecord>(propertyName: T, property: PropertyRecord[T]): this{
        if(!this.hasProperty(propertyName as string)) throw new ReferenceError("Unknow property: " + (propertyName as string));
        const prop = this.propertyBag[propertyName];
        if(property._type != prop._type) throw new TypeError("Can't assign '" + property._type?.description + "' type to type of '" + prop._type?.description + "'");
        prop.onValueChange.unsubscribe(this._methods.get(prop));
        this._methods.delete(prop);
        if(!this._methods.has(property)){ 
            const method = property.onValueChange.subscribe(e=>this._TriggerPropertyChange(this,e.newValue,propertyName,e.oldValue,property));
            this._methods.set(property,method);
        }

        this.propertyBag[propertyName] = property;
        if(prop.value !== property.value) {
            this._TriggerPropertyChange(this,property.value,propertyName,prop.value,property);
        }
        return this;
    }    
    setPropertyValue<T extends keyof PropertyRecord>(propertyName: T, value: ElementPropertyType<PropertyRecord[T]>): this{
        this.propertyBag[propertyName].setValue(value);
        return this;
    }
    getMainPacketData(flags?: number): any {
        const data = super.getMainPacketData(flags) as any;
        for (const key of this.getPropertyNames()) if(!this._isFakes.get(key as string)) data[key] = this.propertyBag[key];
        return data;
    }
    protected _TriggerPropertyChange<T extends keyof PropertyRecord>(el: Element<PropertyRecord>,nV: ElementPropertyType<PropertyRecord[T]>,pN: T,oV: ElementPropertyType<PropertyRecord[T]>,p:PropertyRecord[T]){
        const baseChanging = this._isChanging;
        this._isChanging = true;
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
export class BaseControl<T extends Displayable<any>> extends Displayable<ServerUXEventPacket>{
    protected readonly _eventHandler = new Map<T,any>;
    protected readonly _manager;
    protected readonly _instanceConstructor;
    protected _isDisposed = false;
    get isDisposed(){return this._isDisposed;}
    get elementsCount(){return this._eventHandler.size;}
    protected constructor(manager: EditorControlManager, instanceOf: (new ()=>T) | (()=>T)){
        if(!core.isNativeCall) throw new ReferenceError(NoConstructor + BaseControl.name);
        super(ServerUXEventPacket);
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