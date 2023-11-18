import { Player } from "@minecraft/server";
import { PublicEvent } from "../core/index";
import { EditorExtension } from "./Editor/EditorExtension";
import { EditorMode } from "@minecraft/server-editor-bindings";
import { Element, ElementExtendable, ElementPropertyType, Property } from "./Controls";

/**@beta */
export class EditorEventData{constructor(){}}
export class EditorEvent<T> extends PublicEvent<[T]>{};
/**@beta */
export class ContextEventData extends EditorEventData{
    readonly player;
    constructor(player: Player){
        super();
        this.player = player;
    }
}
/**@beta */
export class ExtensionEventData<T extends EditorExtension> extends ContextEventData{
    readonly extension: T;
    constructor(extension: T){
        super(extension.player);
        this.extension = extension;
    }
};
/**@beta */
export class ExtensionInitializeEventData<T extends EditorExtension> extends ExtensionEventData<T>{};
export class ExtensionReadyEventData<T extends EditorExtension> extends ExtensionEventData<T>{};
export class ExtensionShutdownEventData<T extends EditorExtension> extends ExtensionEventData<T>{};

export class PlayerModeChangeEventData<T extends EditorExtension> extends ExtensionEventData<T>{
    readonly mode;
    constructor(extension: T, mode: EditorMode){
        super(extension);
        this.mode = mode;
    }
};
export class PropertyValueChangeEventData<P extends ElementExtendable, E extends Element<P>,N extends keyof P = keyof P> extends EditorEventData{
    readonly element: E;
    readonly propertyName: keyof P;
    readonly property: P[keyof P];
    readonly oldValue: ElementPropertyType<P[keyof P]>
    readonly newValue: ElementPropertyType<P[keyof P]>
    constructor(element: E, propertyName: N, property: P[N], oldValue:ElementPropertyType<P[keyof P]>, newValue:ElementPropertyType<P[keyof P]>){
        super();
        this.element = element;
        this.propertyName = propertyName;
        this.property = property;
        this.oldValue = oldValue;
        this.newValue = newValue;
    }
}
export class ValueChangeEventData<T> extends EditorEventData{
    readonly oldValue: T;
    readonly newValue: T;
    constructor(oV: T,nV: T){
        super();
        this.oldValue = oV;
        this.newValue = nV;
    }
}
export class ValueChangeEvent<T> extends EditorEvent<ValueChangeEventData<T>>{}

export class PropertyValueChangeEvent<P extends ElementExtendable, E extends Element<P>> extends EditorEvent<PropertyValueChangeEventData<P,E>>{}

export class ExtensionEvent<E extends EditorExtension,T extends ExtensionEventData<E>> extends EditorEvent<T>{};

export class ExtensionInitializeEvent<T extends EditorExtension> extends ExtensionEvent<T,ExtensionInitializeEventData<T>>{};
export class ExtensionReadyEvent<T extends EditorExtension> extends ExtensionEvent<T,ExtensionReadyEventData<T>>{};
export class ExtensionShutdownEvent<T extends EditorExtension> extends ExtensionEvent<T,ExtensionShutdownEventData<T>>{};

export class PlayerModeChangeEvent<T extends EditorExtension> extends ExtensionEvent<T,PlayerModeChangeEventData<T>>{};
