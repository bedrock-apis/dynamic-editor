import { Trigger } from "@minecraft/server";
import {PacketData, PublicEvent, ServerUXEventPacket, TriggerEvent} from "../../core/index";

export const UPDATE_FLAG = 1;
export const REMOVE_FLAG = 2;
export const NULL_TYPE: unique symbol = Symbol("NULL");
export class Postable{
    REMOVE_TYPE: number | null = null;
    UPDATE_TYPE: number | null = null;
    getData(flags = 0): PacketData {return {type:((flags & REMOVE_FLAG) === REMOVE_FLAG?this.REMOVE_TYPE:this.UPDATE_TYPE) as number};}
    *getPackets(flags: number){ yield new ServerUXEventPacket(this.getData(flags));}
}
export class Changeable<EventType extends any[]>{
    readonly onChange = new PublicEvent<EventType>;
    protected constructor(){};
}
export class Property<EventType extends any[]>{
    static readonly UNIQUE_TYPE: symbol = NULL_TYPE;
    readonly type: symbol;
    readonly onValueChange = new PublicEvent<EventType>;
    protected constructor(){ this.type = new.target.UNIQUE_TYPE;};
}
export class ControlProperty<T, isNullable extends boolean = false> extends Property<[{oldValue?: T, newValue: T}]>{
    readonly value: isNullable extends true?T | null: T;
    readonly isNullable: boolean
    readonly defualtValue?: T
    protected constructor(defaultValue: T, isNullable?: isNullable){
        super();
        //@ts-ignore
        this.value = isNullable?null:defaultValue;
        this.isNullable = isNullable??false;
        if(isNullable) this.defualtValue = defaultValue;
    }
    setValue(value: T){
        //@ts-ignore
        this.value = value;
        TriggerEvent(this.onValueChange,{oldValue:this.value??this.defualtValue,newValue:value});
        return this;
    }
    getValue(): T{return this.value??this.defualtValue as T;}
    toJSON(){return this.value;}
    valueOf(){return this.value;}
}
export class StringProperty<isNullable extends boolean> extends ControlProperty<string, isNullable>{
    static readonly UNIQUE_TYPE: symbol = Symbol("StringProperty");
    constructor(value?: string, isNullable?: isNullable){
        super(value??"", isNullable);
    }
}
export class NumberProperty<isNullable extends boolean> extends ControlProperty<number, isNullable>{
    static readonly UNIQUE_TYPE: symbol = Symbol("NumberProperty");
    constructor(value?: number, isNullable?: isNullable){
        super(value??0, isNullable);
    }
}
export class BooleanProperty<isNullable extends boolean> extends ControlProperty<boolean, isNullable>{
    static readonly UNIQUE_TYPE: symbol = Symbol("BooleanProperty");
    constructor(value?: boolean, isNullable?: isNullable){
        super(value??false, isNullable);
    }
}
export class Element<PropertyRecord extends {[key: string]: ControlProperty<any,boolean>}> extends Postable{
    //@ts-ignore
    readonly onChange = new PublicEvent<[{element: this, propertyName: keyof PropertyRecord, property: PropertyRecord[keyof PropertyRecord],oldValue:PropertyRecord[keyof PropertyRecord]["value"],newValue:PropertyRecord[keyof PropertyRecord]["value"]}]>;
    readonly propertyBag: PropertyRecord
    protected constructor(properties: PropertyRecord){
        super();
        this.propertyBag = properties;
    }
    getPropertyNames(): (keyof PropertyRecord)[]{
        return [...Object.getOwnPropertyNames(this.propertyBag)];
    }
    hasProperty<T extends string>(propertyName: T): boolean { return propertyName in this.propertyBag;}
    getProperty<T extends keyof PropertyRecord>(propertyName: T): PropertyRecord[T]{return this.propertyBag[propertyName];}
    getPropertyValue<T extends keyof PropertyRecord, V extends PropertyRecord[T]>(propertyName: T): V["value"] {return this.propertyBag[propertyName].getValue();}
    setProperty<T extends keyof PropertyRecord>(propertyName: T, property: PropertyRecord[T]): this{

        return this;
    }    
    setPropertyValue<T extends keyof PropertyRecord>(propertyName: T, value: PropertyRecord[T]["value"]): this{
        this.propertyBag[propertyName].setValue(value);
        return this;
    }
}