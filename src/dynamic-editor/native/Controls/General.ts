import { KeyInputAction, MouseInputAction } from "../Editor/EditorActions";
import { Displayable,  ServerUXEventPacket } from "../Packets";
import { BaseControl, Element, ElementConstruction, ElementExtendable, ElementProperty, IObjectType, OBJECT_TYPE } from "./Base";
import { EditorInputContext, IUniqueObject, TriggerEvent } from "dynamic-editor/core/index";

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
export class ConvertingProperty<J,T=any> extends ElementProperty<J>{
    constructor(sourceProperty: ElementProperty<J>, converter: (value: J)=>J);
    constructor(sourceProperty: ElementProperty<T>, convenrter: (value: T)=>J, UNIQUE_TYPE?: symbol){
        super(convenrter(sourceProperty.getValue()));
        sourceProperty.onValueChange.subscribe(({newValue})=>{super.setValue(convenrter(newValue));});
        //@ts-ignores
        this._type = UNIQUE_TYPE;
    }
    setValue(value: J | null): never {
        throw new ReferenceError("You can not set binded property.");
    }
}

export class ObjectProperty<T extends IObjectType> extends ElementProperty<T>{
    constructor(defualt: T | null,OBJ_TYPE?: symbol){
        super(defualt);
        //@ts-ignore
        this._type = OBJ_TYPE??defualt?.[OBJECT_TYPE];
    }
    protected isValidType(v: any): boolean {
        return v[OBJECT_TYPE] === this._type;
    }
}
export class VisualElement<PropertyRecord extends ElementExtendable> extends Element<{visible: BooleanProperty, enabled: BooleanProperty} & PropertyRecord>{
    protected constructor(properties: ElementConstruction<PropertyRecord>){
        //@ts-ignore
        super({
            enabled:{property:new BooleanProperty(true)},
            visible:{property:new BooleanProperty(true)},
            ...properties
        });
    }
    get isVisible(): boolean{return this.getPropertyValue("visible")??false;}
    set isVisible(v: boolean){this.setPropertyValue("visible",v as any);}
    get isEnabled(): boolean{return this.getPropertyValue("enabled")??false;}
    set isEnabled(v: boolean){this.setPropertyValue("enabled",v as any);}
    setVisibility(visible: boolean){
        this.setPropertyValue("visible",visible as any);
        return this;
    }
    setEnable(enable: boolean){
        this.setPropertyValue("enabled",enable as any);
        return this;
    }
}
export class Control<T extends Element<any>> extends BaseControl<T>{}
export class ActionBasedEvent<T extends KeyInputAction | MouseInputAction,C extends IUniqueObject | EditorInputContext> extends Displayable<ServerUXEventPacket>{
    protected constructor(contextId:C){
        super(ServerUXEventPacket);
        this._context = contextId;
    }
    protected readonly _context;
    protected readonly _actions = new Map<any,{action: T, ma: any}>();
    protected _subUpdate(a: T): void{
        TriggerEvent(this.onInit,a);
        TriggerEvent(this.onUpdate,this);
    }
    protected _unsubUpdate(a: T): void{
        TriggerEvent(this.onUpdate,this);
        TriggerEvent(this.onDispose, a);
    }
    *displayInitPackets(){
        for (const {action} of this._actions.values()) yield * action.displayInitPackets();
    }
    *displayDisposePackets(){
        for (const {action} of this._actions.values()) yield * action.displayDisposePackets();
    }
}