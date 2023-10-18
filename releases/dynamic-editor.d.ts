import { Player } from '@minecraft/server';

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
declare enum RedirectDestination {
	Documentation = 1,
	Feedback = 2,
	PauseScreen = 3
}
/**@public */
export declare enum BuildInPane {
	UISettings = 1,
	WelcomePage = 2,
	LogPanel = 3
}
/**@public */
export interface ExtensionOptionalParameters {
	description?: string;
	notes?: string;
}
declare class EventData {
	constructor();
}
declare class ContextEventData extends EventData {
	readonly player: Player;
	constructor(player: Player);
}
declare class ExtensionEventData<T extends EditorExtension> extends ContextEventData {
	readonly extension: T;
	constructor(extension: T);
}
/**@beta */
export declare class ExtensionInitializeEventData<T extends EditorExtension> extends ExtensionEventData<T> {
}
/**@beta */
export declare class ExtensionReadyEventData<T extends EditorExtension> extends ExtensionEventData<T> {
}
/**@beta */
export declare class ExtensionShutdownEventData<T extends EditorExtension> extends ExtensionEventData<T> {
}
/**@beta */
export declare class ExtensionInitializeEvent<T extends EditorExtension> extends PublicEvent<[
	ExtensionInitializeEventData<T>
]> {
}
/**@beta */
export declare class ExtensionReadyEvent<T extends EditorExtension> extends PublicEvent<[
	ExtensionReadyEventData<T>
]> {
}
/**@beta */
export declare class ExtensionShutdownEvent<T extends EditorExtension> extends PublicEvent<[
	ExtensionShutdownEventData<T>
]> {
}
/**@public */
export abstract class EditorExtension {
	readonly player: Player;
	readonly onInitialize: ExtensionInitializeEvent<this>;
	readonly onReady: ExtensionReadyEvent<this>;
	readonly onShutdown: ExtensionShutdownEvent<this>;
	protected constructor();
	static readonly extensionName?: string;
	static readonly metadata?: ExtensionOptionalParameters;
	static registry<T extends typeof EditorExtension>(this: T, extensionName?: string): T;
	abstract Initialiaze?(extension: this): void;
	abstract Ready?(extension: this): void;
	abstract Shutdown?(extension: this): void;
	abstract Initialiaze?(this: this, extension: this): void;
	abstract Ready?(this: this, extension: this): void;
	abstract Shutdown?(this: this, extension: this): void;
}
export declare const Destination: typeof RedirectDestination;

export {};

