import { ClipboardManager, ExtensionOptionalParameters } from "@minecraft/server-editor-bindings";
import { ExtensionInitializeEvent, ExtensionReadyEvent, ExtensionShutdownEvent, PlayerModeChangeEvent } from "../Events";
import { MenuBarControl, StatusBarControl, ToolBar } from "../Controls";
import { BuildInPane, RedirectDestination } from "dynamic-editor/core";
import { EditorContextManager } from "./EditorContext";
/**@public */
export interface EditorExtension {
    Initialize?(extension: this): void
    Ready?(extension: this):void
    Shutdown?(extension: this): void
}
export abstract class EditorExtension{
    readonly player: Player;
    readonly onInitialize: ExtensionInitializeEvent<this>;
    readonly onReady: ExtensionReadyEvent<this>;
    readonly onShutdown: ExtensionShutdownEvent<this>;
    readonly onPlayerModeChange: PlayerModeChangeEvent<this>;

    readonly statusBar: StatusBarControl;
    readonly menuBar: MenuBarControl;
    readonly toolBar: ToolBar;

    readonly clipboard: ClipboardManager

    protected constructor();
    static readonly extensionName?: string;
    static readonly metadata?: ExtensionOptionalParameters;
    static registry(extensionName?: string): void;
    redirectTo(destination: RedirectDestination): void
    setBuildInPaneVisibility(pane: BuildInPane, visible?: boolean): void
}