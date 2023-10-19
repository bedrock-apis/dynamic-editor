import * as _00 from '@minecraft/server';
import { Player } from '@minecraft/server';

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
export declare enum StatusBarItemAlignment {
	Right = 0,
	Left = 1
}
declare enum ServerUXEventType {
	UpdatePropertyPane = 1,
	ReleasePropertyPane = 2,
	UpdateItemMenu = 3,
	ReleaseItemMenu = 4,
	UpdateStatusBarItem = 5,
	ReleaseStatusBarItem = 6,
	CreateTool = 7,
	ReleaseTool = 8,
	SetActiveTool = 9,
	ReleaseToolRail = 10,
	BindUIEvent = 11,
	UnbindUIEvent = 12,
	RedirectToDestination = 15,
	UpdateBuildInPanes = 18
}
declare enum PostEventId {
	"Editor::ServerUXEvents" = "Editor::ServerUXEvents",
	"Editor::ServerInputBindingEvents" = "Editor::ServerInputBindingEvents",
	"Editor::ServerActionEvents" = "Editor::ServerActionEvents"
}
declare enum ReceiveEventId {
	"Editor::ClientLifecycle" = "Editor::ClientLifecycle",
	"Editor::ClientUXEvents" = "Editor::ClientUXEvents",
	"Editor::ClientActionEvents" = "Editor::ClientActionEvents"
}
declare class Packet {
	readonly data: PacketData;
	readonly id: PostEventId | ReceiveEventId;
	constructor(id: PostEventId | ReceiveEventId, data: PacketData);
	getMessage(): string;
	setType(type: number): this;
}
declare class ServerUXEventPacket extends Packet {
	constructor(data: PacketData);
}
export interface PacketData {
	type?: number;
	[key: string]: any;
}
declare enum ClipboardMirrorAxis {
	None = "None",
	X = "X",
	XZ = "XZ",
	Z = "Z"
}
declare enum ClipboardRotation {
	None = "None",
	Rotate180 = "Rotate180",
	Rotate270 = "Rotate270",
	Rotate90 = "Rotate90"
}
declare enum CursorControlMode {
	Fixed = 3,
	Keyboard = 0,
	KeyboardAndMouse = 2,
	Mouse = 1
}
declare enum CursorTargetMode {
	Block = 0,
	Face = 1
}
declare class ClipboardItem {
	private constructor();
	readonly isEmpty: number;
	clear(): void;
	getPredictedWriteAsCompoundBlockVolume(location: _00.Vector3, options?: ClipboardWriteOptions): _00.CompoundBlockVolume;
	getPredictedWriteAsSelection(location: _00.Vector3, options?: ClipboardWriteOptions): Selection;
	getSize(): _00.Vector3;
	readFromSelection(selection: Selection): void;
	readFromWorld(from: _00.Vector3, to: _00.Vector3): void;
	writeToWorld(location: _00.Vector3, options?: ClipboardWriteOptions): number;
}
declare class ClipboardManager {
	private constructor();
	readonly clipboard: ClipboardItem;
	create(): ClipboardItem;
}
declare class Cursor {
	private constructor();
	readonly faceDirection: number;
	readonly isVisible: number;
	getPosition(): _00.Vector3;
	getProperties(): CursorProperties;
	hide(): void;
	moveBy(offset: _00.Vector3): _00.Vector3;
	resetToDefaultState(): void;
	setProperties(properties: CursorProperties): void;
	show(): void;
}
declare class ExtensionContext {
	private constructor();
	readonly clipboardManager: ClipboardManager;
	readonly cursor: Cursor;
	readonly extensionName: string;
	readonly player: _00.Player;
	readonly selectionManager: SelectionManager;
	readonly transactionManager: TransactionManager;
}
declare class Selection {
	private constructor();
	readonly isEmpty: number;
	visible: number;
	clear(): void;
	getBlockLocationIterator(): _00.BlockLocationIterator;
	getBoundingBox(): _00.BoundingBox;
	getFillColor(): _00.RGBA;
	getOutlineColor(): _00.RGBA;
	getVolumeOrigin(): _00.Vector3;
	moveBy(delta: _00.Vector3): _00.Vector3;
	moveTo(location: _00.Vector3): _00.Vector3;
	peekLastVolume(forceRelativity?: _00.CompoundBlockVolumePositionRelativity): _00.CompoundBlockVolumeItem;
	popVolume(): void;
	pushVolume(item: _00.CompoundBlockVolumeItem): void;
	set(other: _00.CompoundBlockVolume | Selection): void;
	setFillColor(color: _00.RGBA): void;
	setOutlineColor(color: _00.RGBA): void;
}
declare class SelectionManager {
	private constructor();
	readonly selection: Selection;
	create(): Selection;
}
declare class TransactionManager {
	private constructor();
	commitOpenTransaction(): number;
	commitTrackedChanges(): number;
	discardOpenTransaction(): number;
	discardTrackedChanges(): number;
	openTransaction(name: string): number;
	redo(): void;
	redoSize(): number;
	trackBlockChangeArea(from: _00.Vector3, to: _00.Vector3): number;
	trackBlockChangeCompoundBlockVolume(compoundBlockVolume: _00.CompoundBlockVolume): number;
	trackBlockChangeList(locations: _00.Vector3[]): number;
	trackBlockChangeSelection(selection: Selection): number;
	undo(): void;
	undoSize(): number;
}
/**@alpha */
export interface ClipboardWriteOptions {
	anchor?: _00.Vector3;
	mirror?: ClipboardMirrorAxis;
	offset?: _00.Vector3;
	rotation?: ClipboardRotation;
}
/**@alpha */
export interface CursorProperties {
	controlMode?: CursorControlMode;
	fixedModeDistance?: number;
	outlineColor?: _00.RGBA;
	targetMode?: CursorTargetMode;
	visible?: number;
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
declare class EditorContextManager {
	readonly context: ExtensionContext | undefined;
	readonly player: Player | undefined;
	readonly transactionManager: TransactionManager | undefined;
	readonly selectionManager: SelectionManager | undefined;
	readonly controlManager: EditorControlManager | undefined;
	readonly extension: EditorExtension | undefined;
	readonly onInitialiazeEvent: NativeEvent<[
		this
	]>;
	readonly onReadyEvent: NativeEvent<[
		this
	]>;
	readonly onShutdownEvent: NativeEvent<[
		this
	]>;
	readonly onToolSelected: NativeEvent<any[]>;
	readonly onActionExecuted: NativeEvent<any[]>;
	readonly onPanePropertyChanged: NativeEvent<any[]>;
	readonly onPaneVisibilityChanged: NativeEvent<any[]>;
	isReady: boolean;
	/**@param {ExtensionContext} context  */
	constructor(context: ExtensionContext, that: new () => any);
	shutdown(): void;
	static Shutdown(context: ExtensionContext): void;
	post(packet: Packet): void;
}
declare class EditorControlManager {
	readonly context: EditorContextManager;
	readonly changes: Set<Control<any>>;
	readonly statusBar: StatusBarControl;
	get isReady(): boolean;
	set isReady(v: boolean);
	constructor(context: EditorContextManager);
	setUpdate(): number | true | undefined;
	private _ready?;
	private task;
	private build;
}
declare class Postable {
	protected readonly REMOVE_TYPE: number | null;
	protected readonly UPDATE_TYPE: number | null;
	getData(flags?: number): PacketData;
	getPackets(flags: number): Generator<ServerUXEventPacket, void, unknown>;
}
declare class UniquePostable extends Postable {
	readonly id: string;
	getData(flags?: number): PacketData;
}
declare class Property<EventType extends any[]> {
	static readonly UNIQUE_TYPE: symbol;
	static readonly EXPECTED_VALUE_TYPE?: string;
	protected readonly _type?: symbol;
	protected readonly _expectedType?: string;
	readonly onValueChange: PublicEvent<EventType>;
	protected constructor();
}
declare class ElemenentProperty<T> extends Property<[
	{
		oldValue: T;
		newValue: T;
	}
]> {
	protected readonly value: T | null;
	protected readonly defualtValue?: T;
	protected readonly typeOf: string;
	protected constructor(defaultValue: T);
	protected isValidType(v: any): boolean;
	protected getType(v: T): T;
	setValue(value: T | null): this;
	getValue(): T;
	toJSON(): T;
	valueOf(): T;
}
export declare class StringProperty extends ElemenentProperty<string> {
	static readonly UNIQUE_TYPE: symbol;
	constructor(value?: string);
}
export declare class NumberProperty extends ElemenentProperty<number> {
	static readonly UNIQUE_TYPE: symbol;
	constructor(value?: number);
}
export declare class BooleanProperty extends ElemenentProperty<boolean> {
	static readonly UNIQUE_TYPE: symbol;
	constructor(value?: boolean);
}
declare class CustomProperty<validValues extends any[]> extends ElemenentProperty<validValues[number]> {
	protected constructor(value?: validValues[number]);
}
export declare class BindedProperty<T, Control extends ElemenentProperty<any>> extends ElemenentProperty<T> {
	readonly type: symbol;
	readonly bindProperty: Control;
	constructor(property: Control, ongoingConverter: (data: Control extends ElemenentProperty<infer A> ? A : never, property: Control) => T, as_unique_type: symbol);
	setValue(): never;
}
declare class Element<PropertyRecord extends {
	[key: string]: ElemenentProperty<any>;
} = {}> extends UniquePostable {
	readonly onPropertyValueChange: PublicEvent<[
		{
			element: Element<PropertyRecord>;
			propertyName: keyof PropertyRecord;
			property: PropertyRecord[keyof PropertyRecord];
			oldValue: PropertyRecord[keyof PropertyRecord]["value"];
			newValue: PropertyRecord[keyof PropertyRecord]["value"];
		}
	]>;
	private readonly propertyBag;
	private readonly _methods;
	protected constructor(properties: PropertyRecord);
	getPropertyNames(): (keyof PropertyRecord)[];
	hasProperty<T extends string>(propertyName: T): boolean;
	getProperty<T extends keyof PropertyRecord>(propertyName: T): PropertyRecord[T];
	getPropertyValue<T extends keyof PropertyRecord, V extends PropertyRecord[T]>(propertyName: T): V["value"];
	setProperty<T extends keyof PropertyRecord>(propertyName: T, property: PropertyRecord[T]): this;
	setPropertyValue<T extends keyof PropertyRecord>(propertyName: T, value: PropertyRecord[T]["value"]): this;
	getData(flags?: number): PacketData;
}
declare class Control<T extends Element<any>> extends Postable {
	protected readonly onControlUpdate: NativeEvent<[
		Control<T>,
		T,
		number
	]>;
	protected readonly _additions: Set<T>;
	protected readonly _deletions: Set<T>;
	protected readonly _manager: EditorControlManager;
	protected readonly _eventHandler: Map<T, any>;
	protected readonly _instanceConstructor: (new () => T) | (() => T);
	protected _isDisposed: boolean;
	readonly get isDisposed(): boolean;
	readonly get elementsLength(): number;
	protected constructor(manager: EditorControlManager, instanceOf: (new () => T) | (() => T));
	private _onChange;
	addItem(item: T): boolean;
	removeItem(item: T): boolean;
	getItems(): Generator<T, void, unknown>;
	hasItem(item: any): boolean;
	getPackets(): Generator<ServerUXEventPacket, void, unknown>;
	dispose(): void;
	protected _pushChanges(): void;
}
export declare class StatusBarAlignmentProperty extends CustomProperty<[
	StatusBarItemAlignment
]> {
	static readonly UNIQUE_TYPE: symbol;
	static readonly EXPECTED_VALUE_TYPE = "StatusBarItemAlignment";
	constructor(alignment?: StatusBarItemAlignment);
	protected isValidType(v: any): boolean;
	protected getType(v: StatusBarItemAlignment): StatusBarItemAlignment;
}
export declare class StatusBarItem extends Element<{
	visible: BooleanProperty;
	size: NumberProperty;
	enabled: BooleanProperty;
	text: StringProperty;
	alignment: StatusBarAlignmentProperty;
}> {
	constructor();
	protected readonly REMOVE_TYPE = ServerUXEventType.ReleaseStatusBarItem;
	protected readonly UPDATE_TYPE = ServerUXEventType.UpdateStatusBarItem;
}
declare class StatusBarControl extends Control<StatusBarItem> {
	constructor(manager: EditorControlManager);
}
/**@public */
export abstract class EditorExtension {
	readonly player: Player;
	readonly onInitialize: ExtensionInitializeEvent<this>;
	readonly onReady: ExtensionReadyEvent<this>;
	readonly onShutdown: ExtensionShutdownEvent<this>;
	readonly statusBar: StatusBarControl;
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

