import * as _00 from '@minecraft/server';
import { Player } from '@minecraft/server';

/**@public */
export declare enum BuildInPane {
    UISettings = 1,
    WelcomePage = 2,
    LogPanel = 3
}

/**@alpha */
declare class ClipboardItem_2 { private constructor(); readonly isEmpty: number; clear(): void; getPredictedWriteAsCompoundBlockVolume(location: _00.Vector3, options?: ClipboardWriteOptions): _00.CompoundBlockVolume; getPredictedWriteAsSelection(location: _00.Vector3, options?: ClipboardWriteOptions): Selection_2; getSize(): _00.Vector3; readFromSelection(selection: Selection_2): void; readFromWorld(from: _00.Vector3, to: _00.Vector3): void; writeToWorld(location: _00.Vector3, options?: ClipboardWriteOptions): number}

/**@alpha */
declare class ClipboardManager { private constructor(); readonly clipboard: ClipboardItem_2; create(): ClipboardItem_2}

/**@alpha */
declare enum ClipboardMirrorAxis {None = "None", X = "X", XZ = "XZ", Z = "Z"}

/**@alpha */
declare enum ClipboardRotation {None = "None", Rotate180 = "Rotate180", Rotate270 = "Rotate270", Rotate90 = "Rotate90"}

/**@alpha */
declare interface ClipboardWriteOptions {anchor?: _00.Vector3, mirror?: ClipboardMirrorAxis, offset?: _00.Vector3, rotation?: ClipboardRotation}

/**@beta */
declare class ContextEventData extends EventData {
    readonly player: Player;
    constructor(player: Player);
}

/**@alpha */
declare class Cursor { private constructor(); readonly faceDirection: number; readonly isVisible: number; getPosition(): _00.Vector3; getProperties(): CursorProperties; hide(): void; moveBy(offset: _00.Vector3): _00.Vector3; resetToDefaultState(): void; setProperties(properties: CursorProperties): void; show(): void}

/**@alpha */
declare enum CursorControlMode {Fixed = 3, Keyboard = 0, KeyboardAndMouse = 2, Mouse = 1}

/**@alpha */
declare interface CursorProperties {controlMode?: CursorControlMode, fixedModeDistance?: number, outlineColor?: _00.RGBA, targetMode?: CursorTargetMode, visible?: number}

/**@alpha */
declare enum CursorTargetMode {Block = 0, Face = 1}

/**@public */
export declare enum Destination {
    Documentation = 1,
    Feedback = 2,
    PauseScreen = 3
}

declare class EditorContextManager {
    readonly context: ExtensionContext | undefined;
    readonly player: Player | undefined;
    readonly transactionManager: TransactionManager | undefined;
    readonly selectionManager: SelectionManager | undefined;
    readonly extension: EditorExtension | undefined;
    readonly onInitialiazeEvent: NativeEvent<[this]>;
    readonly onReadyEvent: NativeEvent<[this]>;
    readonly onShutdownEvent: NativeEvent<[this]>;
    readonly onToolSelected: NativeEvent<any[]>;
    readonly onActionExecuted: NativeEvent<any[]>;
    readonly onPanePropertyChanged: NativeEvent<any[]>;
    readonly onPaneVisibilityChanged: NativeEvent<any[]>;
    isValid: boolean;
    isReady: boolean;
    /**@param {ExtensionContext} context  */
    constructor(context: ExtensionContext, that: new () => any);
    shutdown(): void;
    static Shutdown(context: ExtensionContext): void;
}

/**@public */
export declare class EditorExtension {
    /**@param {import("./EditorContext").EditorContextManager} context  */
    constructor(context: EditorContextManager, that?: typeof EditorExtension);
    Shutdown(): void;
    Ready(): void;
    Initialize(): void;
    onInitialize: ExtensionInitializeEvent<EditorExtension>;
    onReady: ExtensionReadyEvent<EditorExtension>;
    onShutdown: ExtensionShutdownEvent<EditorExtension>;
    player: Player | undefined;
    client: any;
}

/**@beta */
declare class EventData {
    constructor();
}

/**@alpha */
declare class ExtensionContext { private constructor(); readonly clipboardManager: ClipboardManager; readonly cursor: Cursor; readonly extensionName: string; readonly player: _00.Player; readonly selectionManager: SelectionManager; readonly transactionManager: TransactionManager}

/**@beta */
declare class ExtensionEventData<T extends EditorExtension> extends ContextEventData {
    readonly extension: T;
    constructor(extension: T);
}

/**@beta */
export declare class ExtensionInitializeEvent<T extends EditorExtension> extends PublicEvent<[ExtensionInitializeEventData<T>]> {
}

/**@beta */
export declare class ExtensionInitializeEventData<T extends EditorExtension> extends ExtensionEventData<T> {
}

/**@beta */
export declare class ExtensionReadyEvent<T extends EditorExtension> extends PublicEvent<[ExtensionReadyEventData<T>]> {
}

/**@beta */
export declare class ExtensionReadyEventData<T extends EditorExtension> extends ExtensionEventData<T> {
}

/**@beta */
export declare class ExtensionShutdownEvent<T extends EditorExtension> extends PublicEvent<[ExtensionShutdownEventData<T>]> {
}

/**@beta */
export declare class ExtensionShutdownEventData<T extends EditorExtension> extends ExtensionEventData<T> {
}

declare class NativeEvent<args extends any[]> {
    constructor();
    /**
     * Triggers the event signal.
     * @param params - The arguments to pass to the event handlers.
     * @returns A promise that resolves with the number of successful event handlers.
     */
    trigger(...params: args): Promise<void>;
    /**
     * Subscribes to the event signal.
     * @template  k - The type of the event handler function.
     * @param method - The event handler function to subscribe.
     * @returns The subscribed event handler function.
     */
    subscribe<M extends (...params: args) => void>(method: M): M;
    /**
     * Unsubscribes from the event signal.
     * @template k - The type of the event handler function.
     * @param method - The event handler function to unsubscribe.
     * @returns The unsubscribed event handler function.
     */
    unsubscribe<M extends (...params: args) => void>(method: M): M;
}

/**@public */
declare class PublicEvent<args extends any[]> {
    constructor();
    /**
     * Subscribes to the event signal.
     * @template  k - The type of the event handler function.
     * @param method - The event handler function to subscribe.
     * @returns The subscribed event handler function.
     */
    subscribe<M extends (...params: args) => void>(method: M): M;
    /**
     * Unsubscribes from the event signal.
     * @template k - The type of the event handler function.
     * @param method - The event handler function to unsubscribe.
     * @returns The unsubscribed event handler function.
     */
    unsubscribe<M extends (...params: args) => void>(method: M): M;
}

/**@alpha */
declare class Selection_2 { private constructor(); readonly isEmpty: number; visible: number; clear(): void; getBlockLocationIterator(): _00.BlockLocationIterator; getBoundingBox(): _00.BoundingBox; getFillColor(): _00.RGBA; getOutlineColor(): _00.RGBA; getVolumeOrigin(): _00.Vector3; moveBy(delta: _00.Vector3): _00.Vector3; moveTo(location: _00.Vector3): _00.Vector3; peekLastVolume(forceRelativity?: _00.CompoundBlockVolumePositionRelativity): _00.CompoundBlockVolumeItem; popVolume(): void; pushVolume(item: _00.CompoundBlockVolumeItem): void; set(other: _00.CompoundBlockVolume | Selection_2): void; setFillColor(color: _00.RGBA): void; setOutlineColor(color: _00.RGBA): void}

/**@alpha */
declare class SelectionManager { private constructor(); readonly selection: Selection_2; create(): Selection_2}

/**@alpha */
declare class TransactionManager { private constructor(); commitOpenTransaction(): number; commitTrackedChanges(): number; discardOpenTransaction(): number; discardTrackedChanges(): number; openTransaction(name: string): number; redo(): void; redoSize(): number; trackBlockChangeArea(from: _00.Vector3, to: _00.Vector3): number; trackBlockChangeCompoundBlockVolume(compoundBlockVolume: _00.CompoundBlockVolume): number; trackBlockChangeList(locations: _00.Vector3[]): number; trackBlockChangeSelection(selection: Selection_2): number; undo(): void; undoSize(): number}

export { }
