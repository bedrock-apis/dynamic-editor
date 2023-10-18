import { Player } from "@minecraft/server";
import { PublicEvent } from "../core/index";
import { EditorExtension } from "./Editor/EditorExtension";

/**@beta */
export class EventData{constructor(){}}
/**@beta */
export class ContextEventData extends EventData{
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
/**@beta */
export class ExtensionReadyEventData<T extends EditorExtension> extends ExtensionEventData<T>{};
/**@beta */
export class ExtensionShutdownEventData<T extends EditorExtension> extends ExtensionEventData<T>{};

/**@beta */
export class ExtensionInitializeEvent<T extends EditorExtension> extends PublicEvent<[ExtensionInitializeEventData<T>]>{};
/**@beta */
export class ExtensionReadyEvent<T extends EditorExtension> extends PublicEvent<[ExtensionReadyEventData<T>]>{};
/**@beta */
export class ExtensionShutdownEvent<T extends EditorExtension> extends PublicEvent<[ExtensionShutdownEventData<T>]>{};