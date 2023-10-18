import { ExtensionOptionalParameters } from "@minecraft/server-editor-bindings";
import { ExtensionInitializeEvent, ExtensionReadyEvent, ExtensionShutdownEvent } from "../Events";
/**@public */
export class EditorExtension{
    readonly player: Player;
    readonly onInitialize: ExtensionInitializeEvent<this>;
    readonly onReady: ExtensionReadyEvent<this>;
    readonly onShutdown: ExtensionShutdownEvent<this>;
    protected constructor();
    static abstract extensionName?: string;
    static abstract metadata?: ExtensionOptionalParameters;
    static registry<T extends typeof EditorExtension>(this: T, extensionName?: string): T;
    abstract Initialiaze?(extension: this): void
    abstract Ready?(extension: this):void
    abstract Shutdown?(extension: this): void
    abstract Initialiaze?: ((this: this,extension: this)=>void) | undefined
    abstract Ready?: ((this: this,extension: this)=>void) | undefined
    abstract Shutdown?: ((this: this,extension: this)=>void) | undefined
    Initialiaze?(extension: this): void
    Ready?(extension: this):void
    Shutdown?(extension: this): void
    Initialiaze?: ((this: this,extension: this)=>void) | undefined
    Ready?: ((this: this,extension: this)=>void) | undefined
    Shutdown?: ((this: this,extension: this)=>void) | undefined
}