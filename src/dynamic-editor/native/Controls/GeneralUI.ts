import {NativeEvent, NoConstructor, PacketData, PublicEvent, ServerUXEventPacket, TriggerEvent, UUID, core} from "../../core/index";
import { EditorControlManager } from "../Editor/EditorControlManager";

export const UPDATE_FLAG = 1;
export const REMOVE_FLAG = 2;
export const NULL_TYPE: unique symbol = Symbol("NULL");
export class Postable{
    protected readonly REMOVE_TYPE: number | null = null;
    protected readonly UPDATE_TYPE: number | null = null;
    getData(flags = 0): PacketData {return {type:((flags & REMOVE_FLAG) === REMOVE_FLAG?this.REMOVE_TYPE:this.UPDATE_TYPE) as number};}
    *getPackets(flags: number){ yield new ServerUXEventPacket(this.getData(flags));}
}
export class UniquePostable extends Postable{
    readonly id = UUID.generate();
    getData(flags?: number): PacketData {
        const data = super.getData(flags);
        data.id = this.id;
        return data;
    }
}
export class Changeable<EventType extends any[]>{
    readonly onChange = new PublicEvent<EventType>;
    protected constructor(){};
}
export class Property<EventType extends any[]>{
    static readonly UNIQUE_TYPE: symbol = NULL_TYPE;
    static readonly EXPECTED_VALUE_TYPE?: string = undefined;
    protected readonly _type?: symbol;
    protected readonly _expectedType?: string;
    readonly onValueChange = new PublicEvent<EventType>;
    protected constructor(){ this._type = new.target.UNIQUE_TYPE; this._expectedType = new.target.EXPECTED_VALUE_TYPE;};
}
export class ElementProperty<T> extends Property<[{oldValue: T, newValue: T}]>{
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
    setValue(value: T | null){
        if(!this.isValidType(value)) throw new TypeError("Invalid value type: '" + value + "' expected " + (this._expectedType??this._typeOf) );
        //@ts-ignore
        this.value = this.getType(value);
        TriggerEvent(this.onValueChange,{oldValue:this.value??this.defualtValue as T,newValue:value});
        return this;
    }
    getValue(): T{return this.value??this.defualtValue as T;}
    toJSON(){return this.getValue();}
    valueOf(){return this.getValue();}
}
export class StringProperty extends ElementProperty<string>{
    static readonly UNIQUE_TYPE: symbol = Symbol("StringProperty");
    constructor(value?: string){ super(value??"");}
}
export class NumberProperty extends ElementProperty<number>{
    static readonly UNIQUE_TYPE: symbol = Symbol("NumberProperty");
    constructor(value?: number){ super(value??0); }
}
export class BooleanProperty extends ElementProperty<boolean>{
    static readonly UNIQUE_TYPE: symbol = Symbol("BooleanProperty");
    constructor(value?: boolean){super(value??false);}
}
export class CustomProperty<validValues extends any[]> extends ElementProperty<validValues[number]>{
    protected constructor(value?: validValues[number]){super(value??false);}
}
export class ConvertingProperty<T,J> extends ElementProperty<J>{
    constructor(sourceProperty: ElementProperty<T>, convenrter: (value: T)=>J, UNIQUE_TYPE?: symbol){
        super(convenrter(sourceProperty.getValue()));
        sourceProperty.onValueChange.subscribe(({newValue})=>{super.setValue(convenrter(newValue));});
        //@ts-ignore
        this._type = UNIQUE_TYPE;
    }
    setValue(value: J | null): never {
        throw new ReferenceError("You can not set binded property.");
    }
}
export type ElementExtendable = {[key: string]: ElementProperty<any>};
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
export class Element<PropertyRecord extends ElementExtendable = {}> extends UniquePostable{
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
    readonly onPropertyValueChange = new PublicEvent<[{element: Element<PropertyRecord>, propertyName: keyof PropertyRecord, property: PropertyRecord[keyof PropertyRecord],oldValue:PropertyRecord[keyof PropertyRecord]["value"],newValue:PropertyRecord[keyof PropertyRecord]["value"]}]>;
    private readonly propertyBag: PropertyRecord
    private readonly _methods;
    protected constructor(properties: PropertyRecord){
        super();
        this._methods = new WeakMap();
        const bag = {} as any;
        for (const propertyName of Object.getOwnPropertyNames(properties)) {
            const prop = properties[propertyName];
            bag[propertyName] = prop;
            const method = prop.onValueChange.subscribe(e=>{
                //@ts-ignore
                TriggerEvent(this.onPropertyValueChange,{
                    element:this,
                    newValue: e.newValue,
                    propertyName: propertyName,
                    oldValue: e.oldValue,
                    property: prop
                });
            })
            this._methods.set(prop,method);
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
        if(property._type != prop._type) throw new TypeError("Can't assign '" + property._type.description + "' type to type of '" + prop._type?.description + "'");
        prop.onValueChange.unsubscribe(this._methods.get(prop));
        this._methods.delete(prop);
        const method = property.onValueChange.subscribe(e=>{
            //@ts-ignore
            TriggerEvent(this.onPropertyValueChange,{
                element: this,
                newValue: e.newValue,
                propertyName: propertyName,
                oldValue: e.oldValue,
                property: property
            });
        })
        this._methods.set(property,method);

        this.propertyBag[propertyName] = property;
        //@ts-ignore
        if(prop.value !== property.value) {
            TriggerEvent(this.onPropertyValueChange,{
                element:this,
                //@ts-ignore
                newValue: property.value,
                propertyName: propertyName,
                //@ts-ignore
                oldValue: prop.value,
                property: property
            });
        }
        return this;
    }    
    //@ts-ignore
    setPropertyValue<T extends keyof PropertyRecord>(propertyName: T, value: PropertyRecord[T]["value"]): this{
        this.propertyBag[propertyName].setValue(value);
        return this;
    }
    getData(flags?: number): PacketData {
        const data = super.getData(flags) as any;
        for (const key of this.getPropertyNames()) data[key] = this.propertyBag[key];
        return data;
    }
}
export class VisualElement<PropertyRecord extends ElementExtendable = {}> extends Element<PropertyRecord & {visible: BooleanProperty,enabled: BooleanProperty}>{
    protected constructor(properties: PropertyRecord){super({enabled:new BooleanProperty(true),visible: new BooleanProperty(true),...properties});}
    get isVisible(){return this.getPropertyValue("visible")??false;}
    set isVisible(v){this.setPropertyValue("visible",v);}
    get isEnabled(){return this.getPropertyValue("enabled")??false;}
    set isEnabled(v){this.setPropertyValue("enabled",v);}
    setVisibility(visible: boolean){
        this.setPropertyValue("visible",visible);
        return this;
    }
    setEnable(enable: boolean){
        this.setPropertyValue("enabled",enable);
        return this;
    }
}
export class BaseControl<T extends Postable> extends Postable{
    protected readonly onControlUpdate;
    protected readonly _additions;
    protected readonly _deletions;
    protected readonly _manager;
    protected readonly _instanceConstructor;
    protected _isDisposed = false;
    protected readonly _elements;
    //@ts-ignore
    readonly get isDisposed(){return this._isDisposed;}
    //@ts-ignore
    readonly get elementsLength(){return this._elements.size;}
    protected constructor(manager: EditorControlManager, instanceOf: (new ()=>T) | (()=>T)){
        if(!core.isNativeCall) throw new ReferenceError(NoConstructor + BaseControl.name);
        super();
        this._instanceConstructor = instanceOf;
        this.onControlUpdate = new NativeEvent<[BaseControl<T>,T,number]>;
        this._manager = manager;
        this._elements = new Set<T>;
        this._additions = new Set<T>;
        this._deletions = new Set<T>;
    }
    addItem(item: T){
        if(this._isDisposed) throw new ReferenceError("You can't manipulate with disposed elements.");
        if(!(item instanceof this._instanceConstructor)) return false;
        if(this._elements.has(item)) return true;
        this._additions.add(item);
        this._deletions.delete(item);
        this.onControlUpdate.trigger(this,item,UPDATE_FLAG);
        this._pushChanges();
        return true;
    }
    removeItem(item: T){
        if(this._isDisposed) throw new ReferenceError("You can't manipulate with disposed elements.");
        if(!(item instanceof this._instanceConstructor)) return false;
        if(this._elements.has(item)) {
            this._additions.delete(item);
            this._deletions.add(item);
            this.onControlUpdate.trigger(this,item,REMOVE_FLAG);
            this._pushChanges();
            return true;
        };
        return false;
    }
    *getItems(){if(this._isDisposed) throw new ReferenceError("You can't manipulate with disposed elements."); for (const item of this._elements) yield item;}
    hasItem(item: any){if(this._isDisposed) throw new ReferenceError("You can't manipulate with disposed elements.");return this._elements.has(item);}
    *getPackets(){
        if(this._isDisposed) throw new ReferenceError("You can't manipulate with disposed elements.");
        for (const control of this._additions) yield * control.getPackets(UPDATE_FLAG);
        for (const control of this._deletions) yield * control.getPackets(REMOVE_FLAG);
    }
    dispose(){
        this._isDisposed = true;
        this._deletions.clear();
        this._additions.clear();
    }
    protected _pushChanges(){
        this._manager.changes.add(this);
        this._manager.setUpdate();
    }
}
export class Control<T extends Element<any>> extends BaseControl<T>{
    protected readonly _eventHandler;
    protected constructor(manager: EditorControlManager, instanceOf: (new ()=>T) | (()=>T)){
        super(manager, instanceOf);
        this._eventHandler = new WeakMap<T, any>;
        /*BaseControl*/
    }
    addItem(item: T): boolean {
        if(super.addItem(item)){
            const method = item.onPropertyValueChange.subscribe(()=>this._onChange(item));
            this._eventHandler.set(item,method);
            return true;
        }
        return false;
    }
    removeItem(item: T): boolean {
        if(super.removeItem(item)){
            item.onPropertyValueChange.unsubscribe(this._eventHandler.get(item));
            return true;
        }
        return false;
    }
    dispose(){
        for (const key of this._elements) key.onPropertyValueChange.unsubscribe(this._eventHandler.get(key));
        return super.dispose();
    }
    private _onChange(element: T){
        if(!this._deletions.has(element)){
            this._additions.add(element);
            this.onControlUpdate.trigger(this,element,UPDATE_FLAG);
            this._pushChanges();
        }
    }
}