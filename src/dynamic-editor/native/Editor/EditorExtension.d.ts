import { ClipboardItem, ClipboardManager, Cursor, CursorProperties, ExtensionOptionalParameters, PlaytestManager, Selection, SelectionManager, SettingsManager, TransactionManager } from "@minecraft/server-editor-bindings";
import { ExtensionInitializeEvent, ExtensionReadyEvent, ExtensionShutdownEvent, PlayerModeChangeEvent } from "../Events";
import { MenuBarControl, StatusBarControl, ToolBar, ToolView } from "../Controls";
import { BuildInPane, RedirectDestination } from "dynamic-editor/core";
import { EditorContextManager } from "./EditorContext";
import { Dimension, Player, Vector3 } from "@minecraft/server";
/**@public */
export interface EditorExtension {
    /**Fired for extension initialization.*/
    Initialize?(extension: this): void
    /**Fired for extension, when ready.*/
    Ready?(extension: this):void
    /**Fired for extension, when shutting down.*/
    Shutdown?(extension: this): void
}
export abstract class EditorExtension{
    /**Returns a player of this extension instance*/
    readonly player: Player;
    /**Returns a player's dimension*/
    readonly dimension: Dimension;
    /**Returns current hoverd block location, cursor ray cast*/
    readonly hoveredBlockLocation: Vector3;
    /**Fired for extension initialization.*/
    readonly onInitialize: ExtensionInitializeEvent<this>;
    /**Fired for extension, when ready.*/
    readonly onReady: ExtensionReadyEvent<this>;
    /**Fired for extension, when shutting down.*/
    readonly onShutdown: ExtensionShutdownEvent<this>;
    /**Fired when player switches modes.*/
    readonly onPlayerModeChange: PlayerModeChangeEvent<this>;
    /**Main object for registering menus, panes, tools, status bar items.*/
    readonly toolView: ToolView;

    readonly settings: SettingsManager;
    /**ClipboardManager known from native editor APIs.*/
    readonly clipboardManager: ClipboardManager;
    /**TransactionManager known from native editor APIs.*/
    readonly transactionManager: TransactionManager;
    /**SelectionManager known from native editor APIs.*/
    readonly selectionManager: SelectionManager;
    /**SelectionManager known from native editor APIs.*/
    readonly playtestManager: PlaytestManager;
    /**Selection known from native editor APIs.*/
    readonly mainSelection: Selection;
    /**ClipboardItem known from native editor APIs.*/
    readonly mainClipboard: ClipboardItem;
    /**Cursor known from native editor APIs.*/
    readonly cursor: Cursor;
    
    /**Constructor is called under specific conditions you can invoke it your self.
     * @throws {ReferenceError}
    */
    protected constructor();
    /**The registration extension name*/
    static readonly extensionName?: string;
    /**The registration metadata*/
    static readonly metadata?: ExtensionOptionalParameters;
    /**The registration, making a extension alive!*/
    static Registry(extensionName?: string): void;
    /**Redirection to hardcoded destinations*/
    redirectTo(destination: RedirectDestination): this;
    /**Changing visibility of hardcoded client Panes*/
    setBuildInPaneVisibility(pane: BuildInPane, visible?: boolean): this;
    /**Changes cursor properties*/
    setCursorProperties(cursorProperties: CursorProperties): this;
    /**Returns cursor properties*/
    getCursorProperties(): CursorProperties;

}