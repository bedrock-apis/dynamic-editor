import { IPacket, IUniqueObject, PublicEvent, TriggerEvent, UNIQUE_SYMBOL } from "../../core/index";
import { Action } from "../Editor/EditorActions";
import { PlayerDisplayManager } from "../Editor/EditorDisplayManager";
import { PropertyValueChangeEvent, PropertyValueChangeEventData, ValueChangeEvent, ValueChangeEventData } from "../Events";
import { Displayable, ServerUXEventPacket, UPDATE_FLAG } from "../Packets";

export type ElementExtendable = {[key: string]: ElementProperty<any>};
export type ElementConstruction<PropertyRecord extends ElementExtendable> = {[K in keyof PropertyRecord]: {property: PropertyRecord[K],isFake?: boolean,construct?: new (...any: any[])=>PropertyRecord[K]}}
export type ElementPropertyType<T> = T extends ElementProperty<infer A>?A:never;
const _hasOwn = Function.prototype.call.bind(Object.prototype.hasOwnProperty);
export const NULL_TYPE: unique symbol = Symbol("NULL");
export const OBJECT_TYPE: unique symbol = Symbol("SYMBOL_TYPE");
export const ACTION_RETURNER: unique symbol = Symbol("ACTION_RETURNER");
export const PROPERTY_PROXY_HANDLER: ProxyHandler<Element<any>> = {
    getPrototypeOf(t){return Object.prototype;},
    setPrototypeOf(t){return false;},
    isExtensible(t){return false;},
    preventExtensions(target) {return true;},
    //@ts-ignore
    ownKeys(t){return Object.getOwnPropertyNames(t.propertyBag);},
    //@ts-ignore
    get(t,p){return _hasOwn(t.propertyBag,p)?t.getProperty(p as any):Object.prototype[p];},
    set(t,p,n){t.setProperty(p as any,n as any);return true;},
    //@ts-ignore
    has(t, p) {return _hasOwn(t.propertyBag,p);},
    deleteProperty(){return false},
    defineProperty(){return false},
    //@ts-ignore
    getOwnPropertyDescriptor(t,p){return _hasOwn(t.propertyBag,p)?{configurable:false,enumerable:true,writable:false,value:t.getProperty(p as any)}:undefined;}
}
export const PROPERTY_VALUE_PROXY_HANDLER: ProxyHandler<Element<any>> = {
    getPrototypeOf(t){return Object.prototype;},
    setPrototypeOf(t){return false;},
    isExtensible(t){return false;},
    preventExtensions(target) {return true;},
    //@ts-ignore
    ownKeys(t){return Object.getOwnPropertyNames(t.propertyBag);},
    //@ts-ignore
    get(t,p){return _hasOwn(t.propertyBag,p)?t.getPropertyValue(p as any):Object.prototype[p];},
    set(t,p,n){t.setPropertyValue(p as any,n as any);return true;},
    //@ts-ignore
    has(t, p) {return _hasOwn(t.propertyBag,p);},
    deleteProperty(){return false},
    defineProperty(){return false},
    //@ts-ignore
    getOwnPropertyDescriptor(t,p){return _hasOwn(t.propertyBag,p)?{configurable:false,enumerable:true,writable:false,value:t.getPropertyValue(p as any)}:undefined;}
}

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
    readonly onValueChange = new ValueChangeEvent<T>;
    /**@deprecated @private Be care full this assignment doesn't update the property*/
    readonly _onValueChange = new PublicEvent<[{newValue: T, oldValue:T}]>();
    /**@deprecated Be care full this assignment doesn't update the property*/
    value: T;
    protected constructedWith: new (...any: any)=>this;
    protected constructor(n: T){this.value = n; this.constructedWith = new.target as any;};
    isValidType(v: any){ return true;}
    static canAssign(p: Property<any>): boolean {return p instanceof this};
    setValue(value: T){
        if(!this.isValidType(value)) throw new TypeError("Invalid value type: '" + value + "'");
        const a = new ValueChangeEventData(this.value,value);
        TriggerEvent(this.onValueChange,a);
        if(value !== a.newValue && !this.isValidType(a.newValue)) throw new TypeError("Invalid value type: '" + value + "'");
        this.value = a.newValue;
        TriggerEvent(this._onValueChange,a);
        return this;
    }
    addOnValueChangeHandler(a: Parameters<ValueChangeEvent<T>["subscribe"]>[0]){
        this.onValueChange.subscribe(a);
        return this;
    }
    removeOnValueChangeHandler(a: Parameters<ValueChangeEvent<T>["subscribe"]>[0]){
        this.onValueChange.unsubscribe(a);
        return this;
    }
}
export class ElementProperty<T> extends Property<T>{
    createPropertyBinder<K, EP extends ElementProperty<K>>(elemetPropertySetter: EP, converter: (v: T, source: this, target: ElementProperty<K>)=>K, updateValue: boolean = false){
        this._onValueChange.subscribe(e=>elemetPropertySetter.setValue(converter?.(e.newValue,this,elemetPropertySetter)??e.newValue as any));
        if(updateValue) elemetPropertySetter.setValue(converter?.(this.value,this,elemetPropertySetter)??this.value as any);
        return elemetPropertySetter;
    }
    getValue(): T{return this.value;}
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
    static BindProperty<L extends ElementExtendable, P extends ElementExtendable, K extends keyof L, K2 extends keyof P>(sourceElement: Element<P>, sourcePropertyName: K2, targetElement: Element<L>, targetPropertyName: K,convertor?:(value: ElementPropertyType<P[K2]>)=>ElementPropertyType<L[K]>){
        const method = sourceElement.onPropertyValueChange.subscribe(({newValue, propertyName})=>{
            if(propertyName === sourcePropertyName) targetElement.setPropertyValue(targetPropertyName, convertor?.(newValue)??newValue as any);
        });
        return new BindedSource(targetElement,targetPropertyName,sourceElement,sourcePropertyName,method as any);
    }
    static UnbindProperty<L extends ElementExtendable, P extends ElementExtendable>(bindedSource: BindedSource<L,P>){
        bindedSource.sourceElement.onPropertyValueChange.unsubscribe(bindedSource.method);
        return null;
    }
    [UNIQUE_SYMBOL](d: PlayerDisplayManager){return d.openCreateUnique(this,"control-");}
    readonly onPropertyValueChange: PropertyValueChangeEvent<PropertyRecord,this> = new PropertyValueChangeEvent<PropertyRecord,this>;
    protected readonly _proxyProperties: any;
    protected readonly _proxyValues: any;
    protected readonly propertyBag: { [K in keyof PropertyRecord]: {property: PropertyRecord[K],construct: typeof Property & {new (...any: any[]): PropertyRecord[K]}}};
    protected readonly _isFakes: Map<keyof PropertyRecord,boolean>;
    protected _isChanging = false;
    private readonly _methods;
    protected constructor(properties: ElementConstruction<PropertyRecord>){
        super(ServerUXEventPacket);
        this._methods = new WeakMap();
        this._isFakes = new Map();
        const bag = {} as any;
        for (const propertyName of Object.getOwnPropertyNames(properties)) {
            const {property,isFake,construct} = properties[propertyName];
            bag[propertyName] = {property,construct:construct??property.constructor};
            this._isFakes.set(propertyName,isFake??false);
            const method = property._onValueChange.subscribe(e=>this._TriggerPropertyChange(this,e.newValue,propertyName,e.oldValue,property))
            this._methods.set(property,method);
        }
        this.propertyBag = bag as any;
        this._proxyProperties = new Proxy(this,PROPERTY_PROXY_HANDLER);
        this._proxyValues = new Proxy(this,PROPERTY_VALUE_PROXY_HANDLER);
    }
    //@ts-ignore
    readonly get proxyProperties(): PropertyRecord { return this._proxyProperties;}
    //@ts-ignore
    readonly get proxyValues(): {[K in keyof PropertyRecord]:ElementPropertyType<PropertyRecord[K]>} { return this._proxyValues;}
    getPropertyNames(): (keyof PropertyRecord)[]{
        return [...Object.getOwnPropertyNames(this.propertyBag)];
    }
    hasProperty<T extends string>(propertyName: T): boolean { return propertyName in this.propertyBag;}
    getProperty<T extends keyof PropertyRecord>(propertyName: T): PropertyRecord[T]{return this.propertyBag[propertyName].property;}
    getPropertyValue<T extends keyof PropertyRecord, V extends PropertyRecord[T]>(propertyName: T): ElementPropertyType<V> {return this.propertyBag[propertyName].property.getValue();}
    setProperty<T extends keyof PropertyRecord>(propertyName: T, property: PropertyRecord[T]): this{
        if(!this.hasProperty(propertyName as string)) throw new ReferenceError("Unknow property: " + (propertyName as string));
        const p = this.propertyBag[propertyName];
        const prop = p.property;
        if(!p.construct.canAssign(property)) throw new TypeError("Can't assign '" + property.constructor.name + "' type to type of '" + p.construct.name + "'");
        prop._onValueChange.unsubscribe(this._methods.get(prop));
        this._methods.delete(prop);
        if(!this._methods.has(property)){ 
            const method = property._onValueChange.subscribe(e=>this._TriggerPropertyChange(this,e.newValue,propertyName,e.oldValue,property));
            this._methods.set(property,method);
        }

        p.property = property;
        if(prop.value !== property.value) {
            this._TriggerPropertyChange(this,property.value,propertyName,prop.value,property);
        }
        return this;
    }
    setProperties(propertyRecord: {[K in keyof PropertyRecord]?: PropertyRecord[K]}){
        for(const k of Object.getOwnPropertyNames(propertyRecord)) if(this.hasProperty(k) && propertyRecord[k]) this.setProperty(k,propertyRecord[k] as any);
        return this;
    }
    getProperties(): {[K in keyof PropertyRecord]?: PropertyRecord[K]}{return {...this.proxyProperties};}
    setPropertyValue<T extends keyof PropertyRecord>(propertyName: T, value: ElementPropertyType<PropertyRecord[T]>): this{
        this.propertyBag[propertyName].property.setValue(value);
        return this;
    }
    protected getMainPacketData(flags: number, packets: IPacket[]) {
        const data = super.getMainPacketData(flags, packets);
        for (const key of this.getPropertyNames()) if(!this._isFakes.get(key as string)) data[key] = this.propertyBag[key].property.getValue();
        return data;
    }
    protected _TriggerPropertyChange<T extends keyof PropertyRecord>(el: Element<PropertyRecord>,nV: ElementPropertyType<PropertyRecord[T]>,pN: T,oV: ElementPropertyType<PropertyRecord[T]>,p:PropertyRecord[T]){
        const baseChanging = this._isChanging;
        this._isChanging = true;
        TriggerEvent(this.onPropertyValueChange,new PropertyValueChangeEventData(this,pN,p,oV,nV));
        this._isChanging = baseChanging;
        if(!this._isChanging) TriggerEvent(this.onUpdate,this,UPDATE_FLAG);
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