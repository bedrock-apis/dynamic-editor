import { ExtensionOptionalParameters } from "@minecraft/server-editor-bindings";
import { ExtensionInitializeEvent, ExtensionReadyEvent, ExtensionShutdownEvent } from "../Events";
import { StatusBarControl } from "../Controls";
/**@public */
export abstract class EditorExtension{
    readonly player: Player;
    readonly onInitialize: ExtensionInitializeEvent<this>;
    readonly onReady: ExtensionReadyEvent<this>;
    readonly onShutdown: ExtensionShutdownEvent<this>;
    readonly statusBar: StatusBarControl
    protected constructor();
    static readonly extensionName?: string;
    static readonly metadata?: ExtensionOptionalParameters;
    static registry<T extends typeof EditorExtension>(this: T, extensionName?: string): T;
    abstract Initialiaze?(extension: this): void
    abstract Ready?(extension: this):void
    abstract Shutdown?(extension: this): void
    abstract Initialiaze?(this: this,extension: this): void
    abstract Ready?(this: this,extension: this): void
    abstract Shutdown?(this: this,extension: this): void
}