import { BaseControl, Element, ElementConstruction, ElementExtendable, ElementProperty, IContentElement } from "./Base";

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
export class VisualElement<PropertyRecord extends ElementExtendable = {}> extends Element<{visible: BooleanProperty,enabled: BooleanProperty} & PropertyRecord>{
    protected constructor(properties: ElementConstruction<PropertyRecord>){
        //@ts-ignore
        super({
            enabled:{property:new BooleanProperty(true)},
            visible:{property:new BooleanProperty(true)},
            ...properties
        });
    }
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
export class Control<T extends Element<any>> extends BaseControl<T>{}