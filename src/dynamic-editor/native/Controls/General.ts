import { KeyInputAction, MouseInputAction } from "../Editor/EditorActions";
import { Displayable,  INIT_FLAG,  REMOVE_FLAG,  ServerUXEventPacket, UPDATE_FLAG } from "../Packets";
import { Element, ElementConstruction, ElementExtendable, ElementProperty, IObjectType, OBJECT_TYPE } from "./Base";
import { EditorInputContext, IUniqueObject, TriggerEvent } from "dynamic-editor/core/index";

export class TypeOfProperty<T> extends ElementProperty<T>{
    static _typeof = typeof undefined;
    isValidType(v: any): boolean {
        //@ts-ignore
        return typeof v === this.constructedWith._typeof;
    }
}
export class StringProperty<T extends string = string> extends TypeOfProperty<T>{
    static _typeof = typeof "";
    constructor(v?: string){super((v??"") as T);}
}
export class NumberProperty<T extends number = number> extends TypeOfProperty<T>{
    static _typeof = typeof 0;
    constructor(v?: number){super((v??0) as T);}
}
export class BooleanProperty<T extends boolean = boolean> extends TypeOfProperty<T>{
    static _typeof = typeof false;
    constructor(v?: boolean){super((v??false) as T);}
}
export class RenderingElement<PropertyRecord extends ElementExtendable> extends Element<{visible: BooleanProperty} & PropertyRecord>{
    protected constructor(properties: ElementConstruction<PropertyRecord>){
        //@ts-ignore
        super({
            visible:{property:new BooleanProperty(true)},
            ...properties
        });
    }
    get isVisible(): boolean{return this.getPropertyValue("visible")??false;}
    set isVisible(v: boolean){this.setPropertyValue("visible",v as any);}
    setVisibility(visible: boolean){
        this.setPropertyValue("visible",visible as any);
        return this;
    }
}
export class ModingElement<PropertyRecord extends ElementExtendable> extends RenderingElement<{enable: BooleanProperty} & PropertyRecord>{
    protected constructor(properties: ElementConstruction<PropertyRecord>){
        //@ts-ignore
        super({
            enable:{property:new BooleanProperty(true)},
            ...properties
        });
    }
    get isEnabled(): boolean{return this.getPropertyValue("enable")??false;}
    set isEnabled(v: boolean){this.setPropertyValue("enable",v as any);}
    setEnable(enable: boolean){
        this.setPropertyValue("enable",enable as any);
        return this;
    }
}
export class ModedElement<PropertyRecord extends ElementExtendable> extends RenderingElement<{enabled: BooleanProperty} & PropertyRecord>{
    protected constructor(properties: ElementConstruction<PropertyRecord>){
        //@ts-ignore
        super({
            enabled:{property:new BooleanProperty(true)},
            ...properties
        });
    }
    get isEnabled(): boolean{return this.getPropertyValue("enabled")??false;}
    set isEnabled(v: boolean){this.setPropertyValue("enabled",v as any);}
    setEnable(enable: boolean){
        this.setPropertyValue("enabled",enable as any);
        return this;
    }
}
export class ActionBasedEvent<T extends KeyInputAction | MouseInputAction,C extends IUniqueObject | EditorInputContext> extends Displayable<ServerUXEventPacket>{
    protected constructor(contextId:C){
        super(ServerUXEventPacket);
        this._context = contextId;
    }
    protected readonly _context;
    protected readonly _actions = new Map<any,{action: T, ma: any}>();
    protected _subUpdate(a: T): void{
        TriggerEvent(this.onUpdate,a,INIT_FLAG);
        TriggerEvent(this.onUpdate,this,UPDATE_FLAG);
    }
    protected _unsubUpdate(a: T): void{
        TriggerEvent(this.onUpdate,this,UPDATE_FLAG);
        TriggerEvent(this.onUpdate, a, REMOVE_FLAG);
    }
    /**@deprecated Internal method */
    *displayInitPackets(){
        for (const {action} of this._actions.values()) yield * action.displayInitPackets();
    }
    /**@deprecated Internal method */
    *displayDisposePackets(){
        for (const {action} of this._actions.values()) yield * action.displayDisposePackets();
    }
}