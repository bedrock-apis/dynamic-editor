import * as _00 from '@minecraft/server';
import { Player } from '@minecraft/server';

/**@public */
export declare enum BuildInPane {
    UISettings = 1,
    WelcomePage = 2,
    LogPanel = 3
}

/* Excluded from this release type: ClipboardItem_2 */

/* Excluded from this release type: ClipboardManager */

/* Excluded from this release type: ClipboardMirrorAxis */

/* Excluded from this release type: ClipboardRotation */

/* Excluded from this release type: ClipboardWriteOptions */

/**@beta */
declare class ContextEventData extends EventData {
    readonly player: Player;
    constructor(player: Player);
}

/* Excluded from this release type: Cursor */

/* Excluded from this release type: CursorControlMode */

/* Excluded from this release type: CursorProperties */

/* Excluded from this release type: CursorTargetMode */

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

/* Excluded from this release type: ExtensionContext */

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

/* Excluded from this release type: Selection_2 */

/* Excluded from this release type: SelectionManager */

/* Excluded from this release type: TransactionManager */

export { }
