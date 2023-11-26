import { ButtonVariant, StatusBarItemAlignment } from "dynamic-editor/core";
import { StringProperty, NumberProperty } from "./General";
import { Vector3 } from "@minecraft/server";
import { ElementProperty } from "./Base";

export interface IDropdownItem{
    displayAltText?: string,
    displayStringId?: string
}
export class StatusBarAlignmentProperty extends NumberProperty<0|1>{
    constructor(alignment?: StatusBarItemAlignment){ super(alignment??StatusBarItemAlignment.Right); }
    isValidType(v: any): boolean {return v in StatusBarItemAlignment;}
}
export class ButtonVariantProperty extends StringProperty<ButtonVariant>{
    static defaultValue = ButtonVariant.primary;
    constructor(variant?: ButtonVariant){ super(variant??ButtonVariant.primary); }
    isValidType(v: any): boolean {return v in ButtonVariant;}
}
export class Vector3Property extends ElementProperty<Vector3>{
    constructor(def?: Vector3){
        super(def??{x:0,y:0,z:0});
    }
    isValidType(v: any): boolean {
        return typeof v.x === "number" && typeof v.y === "number" && typeof v.z === "number";
    }
}
export class ArrayProperty<K> extends ElementProperty<K[]>{
    constructor(array?: K[]){
        super(array??[]);
    }
    isValidType(v: any): boolean {
        return Array.isArray(v);
    }
}
export class DropdownItemsMapingProperty extends ArrayProperty<IDropdownItem>{
    constructor(array?: IDropdownItem[]){
        super(array??[]);
    }
}