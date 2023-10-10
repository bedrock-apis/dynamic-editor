/**@public */
export declare enum BuildInPane {
    UISettings = 1,
    WelcomePage = 2,
    LogPanel = 3
}

/* Excluded from this release type: ClientReadyEvent */

/* Excluded from this release type: ClientReadyEventData */

/**@public */
export declare enum Destination {
    Documentation = 1,
    Feedback = 2,
    PauseScreen = 3
}

/**@public */
export declare class Editor {
    readonly events: EditorEvents;
    private constructor();
}

/**@public */
export declare const editor: Editor;

/**@public */
export declare class EditorEvents {
    /* Excluded from this release type: clientReady */
    private constructor();
}

/**@public */
export declare class PublicEvent<args extends any[]> {
    protected constructor();
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

export { }
