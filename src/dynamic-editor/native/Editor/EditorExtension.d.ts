import { ExtensionOptionalParameters } from "@minecraft/server-editor-bindings";
import { ExtensionInitializeEvent, ExtensionReadyEvent, ExtensionShutdownEvent } from "../Events";
import { StatusBarControl } from "../Controls";
import { BuildInPane, RedirectDestination as Destination } from "dynamic-editor/core";
import { EditorContextManager } from "./EditorContext";
/**@public */
export interface EditorExtension {
    Initialiaze(extension: this): void
    Ready(extension: this):void
    Shutdown(extension: this): void
}
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
    redirectTo(destination: Destination): void
    setBuildInPaneVisibility(pane: BuildInPane, visible?: boolean): void
}