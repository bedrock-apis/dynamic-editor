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
export class ElemenentProperty<T> extends Property<[{oldValue: T, newValue: T}]>{
    protected readonly value: T | null;
    protected readonly defualtValue?: T
    protected readonly typeOf: string;
    protected constructor(defaultValue: T){
        super();
        this.typeOf = typeof defaultValue;
        this.value = defaultValue;
        this.defualtValue = defaultValue;
    }
    protected isValidType(v: any){return typeof v === this.typeOf;}
    protected getType(v: T): T{return v;}
    setValue(value: T | null){
        if(!this.isValidType(value)) throw new TypeError("Invalid value type: '" + value + "' expected " + (this._expectedType??this.typeOf) );
        //@ts-ignore
        this.value = this.getType(value);
        TriggerEvent(this.onValueChange,{oldValue:this.value??this.defualtValue as T,newValue:value});
        return this;
    }
    getValue(): T{return this.value??this.defualtValue as T;}
    toJSON(){return this.getValue();}
    valueOf(){return this.getValue();}
}
export class StringProperty extends ElemenentProperty<string>{
    static readonly UNIQUE_TYPE: symbol = Symbol("StringProperty");
    constructor(value?: string){ super(value??"");}
}
export class NumberProperty extends ElemenentProperty<number>{
    static readonly UNIQUE_TYPE: symbol = Symbol("NumberProperty");
    constructor(value?: number){ super(value??0); }
}
export class BooleanProperty extends ElemenentProperty<boolean>{
    static readonly UNIQUE_TYPE: symbol = Symbol("BooleanProperty");
    constructor(value?: boolean){super(value??false);}
}
export class CustomProperty<validValues extends any[]> extends ElemenentProperty<validValues[number]>{
    protected constructor(value?: validValues[number]){super(value??false);}
}
export class BindedProperty<T,Control extends ElemenentProperty<any>> extends ElemenentProperty<T>{
    readonly type: symbol;
    readonly bindProperty;
    constructor(property: Control, ongoingConverter: (data: Control extends ElemenentProperty<infer A>?A:never, property: Control)=>T, as_unique_type: symbol){
        //@ts-ignore
        super(ongoingConverter(property.value,property));
        this.type = as_unique_type;
        this.bindProperty = property;
        property.onValueChange.subscribe((e)=>{
            const newValue = ongoingConverter(e.newValue, property);
            TriggerEvent(this.onValueChange,{oldValue:this.value??this.defualtValue as T,newValue:newValue});
            //@ts-ignore
            this.value = newValue;
        });
    }
    setValue(): never{
        throw new TypeError("Binded property cann't be modified.");
    }
}
export class Element<PropertyRecord extends {[key: string]: ElemenentProperty<any>} = {}> extends UniquePostable{
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
export class Control<T extends Element<any>> extends Postable{
    protected readonly onControlUpdate;
    protected readonly _additions;
    protected readonly _deletions;
    protected readonly _manager;
    protected readonly _eventHandler;
    protected readonly _instanceConstructor;
    protected _isDisposed = false;
    //@ts-ignore
    readonly get isDisposed(){return this._isDisposed;}
    //@ts-ignore
    readonly get elementsLength(){return this._eventHandler.size;}
    protected constructor(manager: EditorControlManager, instanceOf: (new ()=>T) | (()=>T)){
        if(!core.isNativeCall) throw new ReferenceError(NoConstructor + Control.name);
        super();
        this._instanceConstructor = instanceOf;
        this.onControlUpdate = new NativeEvent<[Control<T>,T,number]>;
        this._manager = manager;
        this._eventHandler = new Map<T, any>;
        this._additions = new Set<T>;
        this._deletions = new Set<T>;
    }
    private _onChange(element: T){
        if(!this._deletions.has(element)){
            this._additions.add(element);
            this.onControlUpdate.trigger(this,element,UPDATE_FLAG);
            this._pushChanges();
        }
    }
    addItem(item: T){
        if(this._isDisposed) throw new ReferenceError("You can't manipulate with disposed elements.");
        if(!(item instanceof this._instanceConstructor)) return false;
        if(this._eventHandler.has(item)) return true;
        const method = item.onPropertyValueChange.subscribe(()=>this._onChange(item));
        this._eventHandler.set(item, method);
        this._additions.add(item);
        this._deletions.delete(item);
        this.onControlUpdate.trigger(this,item,UPDATE_FLAG);
        this._pushChanges();
        return true;
    }
    removeItem(item: T){
        if(this._isDisposed) throw new ReferenceError("You can't manipulate with disposed elements.");
        if(!(item instanceof this._instanceConstructor)) return false;
        if(this._eventHandler.has(item)) {
            const method = this._eventHandler.get(item);
            item.onPropertyValueChange.unsubscribe(method);
            this._additions.delete(item);
            this._deletions.add(item);
            this.onControlUpdate.trigger(this,item,REMOVE_FLAG);
            this._pushChanges();
            return true;
        };
        return false;
    }
    *getItems(){if(this._isDisposed) throw new ReferenceError("You can't manipulate with disposed elements.");for (const item of this._eventHandler.keys()) yield item;}
    hasItem(item: any){if(this._isDisposed) throw new ReferenceError("You can't manipulate with disposed elements.");return this._eventHandler.has(item);}
    *getPackets(){
        if(this._isDisposed) throw new ReferenceError("You can't manipulate with disposed elements.");
        for (const control of this._additions) yield * control.getPackets(UPDATE_FLAG);
        for (const control of this._deletions) yield * control.getPackets(REMOVE_FLAG);
    }
    dispose(){
        this._isDisposed = true;
        for (const key of this._eventHandler.keys()) key.onPropertyValueChange.unsubscribe(this._eventHandler.get(key));
        this._deletions.clear();
        this._additions.clear();
        this._eventHandler.clear();
    }
    protected _pushChanges(){
        this._manager.changes.add(this);
        this._manager.setUpdate();
    }
}