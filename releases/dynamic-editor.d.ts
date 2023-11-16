import * as _00 from '@minecraft/common';
import * as _10 from '@minecraft/server';
import { Player, Vector3 } from '@minecraft/server';

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
declare enum ActionType {
	NoArgsAction = "NoArgsAction",
	MouseRayCastAction = "MouseRayCastAction"
}
declare enum InternalInputTypes {
	ButtonDown = 1,
	ButtonUp = 2,
	WheelDown = 3,
	WheelUo = 4,
	DragStart = 5,
	Draging = 6,
	DragStop = 7
}
declare enum InternalInteractionTypes {
	LeftButton = 1,
	MiddleButton = 2,
	Scroll = 4
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
declare enum ServerActionEventType {
	CreateAction = 1,
	ReleaseAction = 2
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
declare const UNIQUE_SYMBOL: unique symbol;
declare const IDENTITY_SYMBOL: unique symbol;
export interface IPacket {
	readonly id: string;
	readonly data: any;
}
export interface IUniqueObject {
	[UNIQUE_SYMBOL]: boolean;
}
export interface IIdentityPacket extends IPacket {
	[IDENTITY_SYMBOL]: symbol;
}
export interface IPacketCommand extends IPacket {
	readonly commandId: symbol;
}
declare class Packet implements IPacket {
	readonly data: any;
	readonly id: PostEventId | ReceiveEventId;
	constructor(id: PostEventId | ReceiveEventId, data: any);
	setType(type: number): this;
	isCommand(): this is IPacketCommand;
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
export enum EditorMode {
	Crosshair = "Crosshair",
	Tool = "Tool"
}
declare enum GraphicsSettingsProperty {
	ShowInvisibleBlocks = "ShowInvisibleBlocks"
}
declare enum PlaytestSessionResult {
	EditorSystemFailure = 7,
	InvalidLevelId = 8,
	InvalidSessionHandle = 1,
	OK = 0,
	PlayerNotFound = 9,
	ResponseTimeout = 10,
	SessionInfoNotFound = 2,
	TooManyPlayers = 3,
	UnspecifiedError = 11,
	UnsupportedScenario = 6,
	WorldExportBusy = 5,
	WorldExportFailed = 4
}
declare class ClipboardItem {
	private constructor();
	readonly isEmpty: number;
	clear(): void;
	getPredictedWriteAsCompoundBlockVolume(location: _10.Vector3, options?: ClipboardWriteOptions): _10.CompoundBlockVolume;
	getPredictedWriteAsSelection(location: _10.Vector3, options?: ClipboardWriteOptions): Selection;
	getSize(): _10.Vector3;
	readFromSelection(selection: Selection): void;
	readFromWorld(from: _10.Vector3, to: _10.Vector3): void;
	writeToWorld(location: _10.Vector3, options?: ClipboardWriteOptions): number;
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
	getPosition(): _10.Vector3;
	getProperties(): CursorProperties;
	hide(): void;
	moveBy(offset: _10.Vector3): _10.Vector3;
	resetToDefaultState(): void;
	setProperties(properties: CursorProperties): void;
	show(): void;
}
declare class ExtensionContext {
	private constructor();
	readonly afterEvents: ExtensionContextAfterEvents;
	readonly clipboardManager: ClipboardManager;
	readonly cursor: Cursor;
	readonly extensionName: string;
	readonly player: _10.Player;
	readonly playtest: PlaytestManager;
	readonly selectionManager: SelectionManager;
	readonly settings: SettingsManager;
	readonly transactionManager: TransactionManager;
}
declare class ExtensionContextAfterEvents {
	private constructor();
	readonly modeChange: ModeChangeAfterEventSignal;
}
declare class GraphicsSettings {
	private constructor();
	get(property: GraphicsSettingsProperty): number | number | string;
	getAll(): Record<string, number | number | string>;
	set(property: GraphicsSettingsProperty, value: number | number | string): void;
	setAll(properties: Record<string, number | number | string>): void;
}
declare class ModeChangeAfterEvent {
	private constructor();
	readonly mode: EditorMode;
}
declare class ModeChangeAfterEventSignal {
	private constructor();
	subscribe(callback: (arg0: ModeChangeAfterEvent) => void): (arg0: ModeChangeAfterEvent) => void;
	unsubscribe(callback: (arg0: ModeChangeAfterEvent) => void): void;
}
declare class PlaytestManager {
	private constructor();
	beginPlaytest(options: PlaytestGameOptions): Promise<PlaytestSessionResult>;
	getPlaytestSessionAvailability(): PlaytestSessionResult;
}
declare class Selection {
	private constructor();
	readonly isEmpty: number;
	visible: number;
	clear(): void;
	getBlockLocationIterator(): _10.BlockLocationIterator;
	getBoundingBox(): _10.BoundingBox;
	getFillColor(): _10.RGBA;
	getOutlineColor(): _10.RGBA;
	getVolumeOrigin(): _10.Vector3;
	moveBy(delta: _10.Vector3): _10.Vector3;
	moveTo(location: _10.Vector3): _10.Vector3;
	peekLastVolume(forceRelativity?: _10.CompoundBlockVolumePositionRelativity): _10.CompoundBlockVolumeItem;
	popVolume(): void;
	pushVolume(item: _10.CompoundBlockVolumeItem): void;
	set(other: _10.CompoundBlockVolume | Selection): void;
	setFillColor(color: _10.RGBA): void;
	setOutlineColor(color: _10.RGBA): void;
}
declare class SelectionManager {
	private constructor();
	readonly selection: Selection;
	create(): Selection;
}
declare class SettingsManager {
	private constructor();
	readonly graphics: GraphicsSettings;
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
	trackBlockChangeArea(from: _10.Vector3, to: _10.Vector3): number;
	trackBlockChangeCompoundBlockVolume(compoundBlockVolume: _10.CompoundBlockVolume): number;
	trackBlockChangeList(locations: _10.Vector3[]): number;
	trackBlockChangeSelection(selection: Selection): number;
	undo(): void;
	undoSize(): number;
}
export interface ClipboardWriteOptions {
	anchor?: _10.Vector3;
	mirror?: ClipboardMirrorAxis;
	offset?: _10.Vector3;
	rotation?: ClipboardRotation;
}
export interface CursorProperties {
	controlMode?: CursorControlMode;
	fixedModeDistance?: number;
	outlineColor?: _10.RGBA;
	targetMode?: CursorTargetMode;
	visible?: number;
}
export interface ExtensionOptionalParameters {
	description?: string;
	notes?: string;
}
export interface PlaytestGameOptions {
	alwaysDay?: number;
	difficulty?: _10.Difficulty;
	disableWeather?: number;
	gameMode?: _10.GameMode;
	showCoordinates?: number;
	spawnPosition?: _10.Vector3;
	timeOfDay?: number;
}
declare class ServerUXEventPacket extends Packet {
	constructor(data: any);
}
declare class ServerActionEventPacket extends Packet {
	constructor(data: any);
}
declare class PostActionPacket extends ServerActionEventPacket implements IIdentityPacket {
	[IDENTITY_SYMBOL]: symbol;
}
declare abstract class Postable<K extends IPacket> {
	protected abstract readonly packetConstructor: new (data: any) => K;
	protected readonly PACKET_TYPES: {
		[key: number]: number | null;
	};
	protected getMainPacketData(flags?: number): any;
	protected getMainPacket(flags?: number): K;
	protected getPackets(flags: number): Generator<IPacket>;
}
declare abstract class UniquePostable<K extends IPacket> extends Postable<K> implements IUniqueObject {
	[UNIQUE_SYMBOL]: true;
	protected getMainPacketData(flags?: number): any;
}
declare class Displayable extends UniquePostable<ServerUXEventPacket> {
	protected readonly packetConstructor: new (data: any) => ServerUXEventPacket;
	readonly onUpdate: PublicEvent<[
		Displayable
	]>;
	readonly onInit: PublicEvent<[
		Displayable
	]>;
	readonly onDispose: PublicEvent<[
		Displayable
	]>;
	displayInitPackets(): Generator<IPacket>;
	displayUpdatePackets(): Generator<IPacket>;
	displayDisposePackets(): Generator<IPacket>;
}
declare class EditorControlManager {
	readonly context: EditorContextManager;
	readonly changes: Map<Displayable, number>;
	readonly statusBar: StatusBarControl;
	readonly menuBar: MenuBarControl;
	get isReady(): boolean;
	set isReady(v: boolean);
	constructor(context: EditorContextManager);
	whenUpdate(control: Displayable, flag: number): void;
	setUpdate(): number | true | undefined;
	private _ready?;
	private task;
	private build;
	private resolvePackets;
	private packetMethods;
	private packetResolvers;
}
export type ElementExtendable = {
	[key: string]: ElementProperty<any>;
};
export type ElementConstruction<PropertyRecord> = {
	[K in keyof PropertyRecord]: {
		property: PropertyRecord[K];
		isFake?: boolean;
	};
};
export interface IContentElement extends Element<any> {
	setContent(content: string): this;
}
declare class Property<T> {
	static readonly UNIQUE_TYPE: symbol;
	static readonly EXPECTED_VALUE_TYPE?: string;
	protected readonly _type?: symbol;
	protected readonly _expectedType?: string;
	readonly onValueChange: ValueChangeEvent<T>;
	protected constructor();
}
declare class ElementProperty<T> extends Property<T> {
	protected readonly value: T | null;
	protected readonly defualtValue?: T;
	protected readonly _typeOf: string;
	protected constructor(defaultValue: T);
	protected isValidType(v: any): boolean;
	protected getType(v: T): T;
	setValue(value: T): this;
	getValue(): T;
	toJSON(): T;
	valueOf(): T;
}
export declare class BindedSource<S extends ElementExtendable, T extends ElementExtendable> {
	readonly targetElement: Element<T>;
	readonly targetPropertyName: keyof T;
	readonly sourceElement: Element<S>;
	readonly sourcePropertyName: keyof S;
	readonly method: (value: any) => any;
	private constructor();
}
export declare class Element<PropertyRecord extends ElementExtendable = {}> extends Displayable implements IUniqueObject {
	[UNIQUE_SYMBOL]: true;
	static BindProperty<L extends ElementExtendable, P extends ElementExtendable, K extends keyof L, K2 extends keyof P>(targetElement: Element<P>, targetPropertyName: K2, sourceElement: Element<L>, sourcePropertyName: K, convertor?: (value: L[K]["value"]) => P[K2]["value"]): any;
	static UnbindProperty<L extends ElementExtendable, P extends ElementExtendable>(bindedSource: BindedSource<L, P>): null;
	readonly onPropertyValueChange: PropertyValueChangeEvent<PropertyRecord, this>;
	protected readonly propertyBag: PropertyRecord;
	protected readonly _isFakes: Map<keyof PropertyRecord, boolean>;
	protected _isChanging: boolean;
	private readonly _methods;
	protected constructor(properties: ElementConstruction<PropertyRecord>);
	getPropertyNames(): (keyof PropertyRecord)[];
	hasProperty<T extends string>(propertyName: T): boolean;
	getProperty<T extends keyof PropertyRecord>(propertyName: T): PropertyRecord[T];
	getPropertyValue<T extends keyof PropertyRecord, V extends PropertyRecord[T]>(propertyName: T): V["value"];
	setProperty<T extends keyof PropertyRecord>(propertyName: T, property: PropertyRecord[T]): this;
	setPropertyValue<T extends keyof PropertyRecord>(propertyName: T, value: PropertyRecord[T]["value"]): this;
	getMainPacketData(flags?: number): any;
	protected _TriggerPropertyChange<T extends keyof PropertyRecord>(el: Element<PropertyRecord>, nV: PropertyRecord[T]["value"], pN: T, oV: PropertyRecord[T]["value"], p: PropertyRecord[T]): void;
	protected _setPropertyRealness<T extends keyof PropertyRecord>(key: T, isReal: boolean): this;
	protected _getPropertyRealness<T extends keyof PropertyRecord>(key: T): boolean;
	protected _isPropertyReal<T extends keyof PropertyRecord>(key: T): boolean;
}
declare class BaseControl<T extends Displayable> extends Displayable {
	protected readonly _eventHandler: Map<T, any>;
	protected readonly _manager: EditorControlManager;
	protected readonly _instanceConstructor: (new () => T) | (() => T);
	protected _isDisposed: boolean;
	readonly get isDisposed(): boolean;
	readonly get elementsCount(): any;
	protected constructor(manager: EditorControlManager, instanceOf: (new () => T) | (() => T));
	addItem(item: T): boolean;
	removeItem(item: T): boolean;
	getItems(): Generator<T, void, unknown>;
	hasItem(item: any): boolean;
	displayInitPackets(): Generator<IPacket, void, unknown>;
	displayDisposePackets(): Generator<IPacket, void, unknown>;
}
export declare class StringProperty extends ElementProperty<string> {
	static readonly UNIQUE_TYPE: symbol;
	constructor(value?: string);
}
export declare class NumberProperty extends ElementProperty<number> {
	static readonly UNIQUE_TYPE: symbol;
	constructor(value?: number);
}
export declare class BooleanProperty extends ElementProperty<boolean> {
	static readonly UNIQUE_TYPE: symbol;
	constructor(value?: boolean);
}
declare class CustomProperty<validValues extends any[]> extends ElementProperty<validValues[number]> {
	protected constructor(value?: validValues[number]);
}
export declare class ConvertingProperty<T, J> extends ElementProperty<J> {
	constructor(sourceProperty: ElementProperty<T>, convenrter: (value: T) => J, UNIQUE_TYPE?: symbol);
	setValue(value: J | null): never;
}
declare class VisualElement<PropertyRecord extends ElementExtendable = {}> extends Element<{
	visible: BooleanProperty;
	enabled: BooleanProperty;
} & PropertyRecord> {
	protected constructor(properties: ElementConstruction<PropertyRecord>);
	get isVisible(): false | NonNullable<({
		visible: BooleanProperty;
		enabled: BooleanProperty;
	} & PropertyRecord)["visible"]["value"]>;
	set isVisible(v: boolean | NonNullable<({
		visible: BooleanProperty;
		enabled: BooleanProperty;
	} & PropertyRecord)["visible"]["value"]>);
	get isEnabled(): false | NonNullable<({
		visible: BooleanProperty;
		enabled: BooleanProperty;
	} & PropertyRecord)["enabled"]["value"]>;
	set isEnabled(v: boolean | NonNullable<({
		visible: BooleanProperty;
		enabled: BooleanProperty;
	} & PropertyRecord)["enabled"]["value"]>);
	setVisibility(visible: boolean): this;
	setEnable(enable: boolean): this;
}
declare class Control<T extends Element<any>> extends BaseControl<T> {
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
declare class Action<AType extends ActionType = ActionType.NoArgsAction> extends UniquePostable<PostActionPacket> {
	packetConstructor: new (data: any) => PostActionPacket;
	protected readonly PACKET_TYPES: {
		2: ServerActionEventType;
		1: ServerActionEventType;
		0: ServerActionEventType;
	};
	readonly actionType: AType;
	readonly onActionExecute: PublicEvent<[
		AType extends ActionType.MouseRayCastAction ? MouseRayCastPayload : NoArgsPayload
	]>;
	constructor(type: AType);
	protected getMainPacketData(flags?: number | undefined): any;
	execute(payload: AType extends ActionType.MouseRayCastAction ? MouseRayCastPayload : NoArgsPayload): void;
}
declare class PayloadLoader {
	readonly type: ActionType;
	readonly player: Player;
	readonly dimension: import("@minecraft/server").Dimension;
	constructor(player: Player, data: any);
}
declare class NoArgsPayload extends PayloadLoader {
}
declare class MouseRayCastPayload extends PayloadLoader {
	readonly location: Vector3;
	readonly direction: Vector3;
	readonly blockLocation: Vector3;
	readonly rayHit: boolean;
	readonly actionType: InternalInteractionTypes;
	readonly hasCtrlModifier: boolean;
	readonly hasAltModifier: boolean;
	readonly hasShiftModifier: boolean;
	readonly inputType: InternalInputTypes;
	readonly get block(): import("@minecraft/server").Block | undefined;
	constructor(player: Player, data: any);
}
export declare class StatusBarItem extends VisualElement<{
	size: NumberProperty;
	text: StringProperty;
	alignment: StatusBarAlignmentProperty;
}> implements IContentElement {
	protected readonly PACKET_TYPES: {
		2: ServerUXEventType;
		0: ServerUXEventType;
		1: ServerUXEventType;
	};
	constructor();
	get alignment(): StatusBarItemAlignment;
	set alignment(v: StatusBarItemAlignment);
	get content(): string;
	set content(v: string);
	get size(): number;
	set size(v: number);
	setContent(text: string): this;
	setSize(size: number): this;
	setAlignment(alignment: StatusBarItemAlignment): this;
}
export declare class AutoSizeStatusBarItem extends StatusBarItem {
	constructor();
}
declare class MenuItem<SubProperties extends ElementExtendable = {}> extends VisualElement<{
	displayStringLocId: StringProperty;
	name: StringProperty;
} & SubProperties> implements IContentElement {
	protected readonly _parent: undefined;
	protected readonly PACKET_TYPES: {
		2: ServerUXEventType;
		0: ServerUXEventType;
		1: ServerUXEventType;
	};
	protected constructor(properties: ElementConstruction<SubProperties>, content: string);
	get content(): "" | NonNullable<({
		visible: BooleanProperty;
		enabled: BooleanProperty;
	} & {
		displayStringLocId: StringProperty;
		name: StringProperty;
	} & SubProperties)["name"]["value"]>;
	set content(v: string | NonNullable<({
		visible: BooleanProperty;
		enabled: BooleanProperty;
	} & {
		displayStringLocId: StringProperty;
		name: StringProperty;
	} & SubProperties)["name"]["value"]>);
	setContent(displayText: string): this;
	getMainPacketData(flags?: number | undefined): any;
}
export declare class MenuActionItem extends MenuItem<{
	checked: BooleanProperty;
}> {
	protected readonly _action: Action<ActionType.NoArgsAction>;
	readonly onActionExecute: PublicEvent<[
		NoArgsPayload
	]>;
	constructor(content?: string);
	get checkmarkEnabled(): boolean;
	set checkmarkEnabled(v: boolean);
	get checked(): boolean;
	set checked(v: boolean);
	setChecked(isChecked: boolean): this;
	setCheckmarkEnabled(enabled: boolean): this;
	addActionHandler(handler: (param: NoArgsPayload) => void): this;
	displayInitPackets(): Generator<IPacket, void, unknown>;
	displayDisposePackets(): Generator<IPacket, void, unknown>;
}
export declare class MenuOptionsItem extends MenuItem<{}> {
	constructor(content?: string);
	protected readonly _handlers: Map<MenuItem<any>, any>;
	readonly get elementsLength(): any;
	addMenuItem(item: MenuItem<any>): this;
	removeMenuItem(item: MenuItem<any>): this;
	getMenuItems(): Generator<MenuItem<any>, void, unknown>;
	hasMenuItem(item: MenuItem<any>): boolean;
	displayInitPackets(): Generator<IPacket, void, unknown>;
	displayDisposePackets(): Generator<IPacket, void, unknown>;
}
declare class StatusBarControl extends Control<StatusBarItem> {
	protected constructor(manager: EditorControlManager);
}
declare class MenuBarControl extends Control<MenuItem<any>> {
	protected constructor(manager: EditorControlManager);
	addItem(item: MenuItem): boolean;
	removeItem(item: MenuItem): boolean;
}
declare class EditorEventData {
	constructor();
}
declare class EditorEvent<T> extends PublicEvent<[
	T
]> {
}
declare class ContextEventData extends EditorEventData {
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
export declare class ExtensionReadyEventData<T extends EditorExtension> extends ExtensionEventData<T> {
}
export declare class ExtensionShutdownEventData<T extends EditorExtension> extends ExtensionEventData<T> {
}
export declare class PlayerModeChangeEventData<T extends EditorExtension> extends ExtensionEventData<T> {
	readonly mode: EditorMode;
	constructor(extension: T, mode: EditorMode);
}
declare class PropertyValueChangeEventData<P extends ElementExtendable, E extends Element<P>, N extends keyof P = keyof P> extends EditorEventData {
	readonly element: E;
	readonly propertyName: keyof P;
	readonly property: P[keyof P];
	readonly oldValue: P[keyof P]["value"];
	readonly newValue: P[keyof P]["value"];
	constructor(element: E, propertyName: N, property: P[N], oldValue: P[N]["value"], newValue: P[N]["value"]);
}
export declare class ValueChangeEventData<T> extends EditorEventData {
	readonly oldValue: T;
	readonly newValue: T;
	constructor(oV: T, nV: T);
}
export declare class ValueChangeEvent<T> extends EditorEvent<ValueChangeEventData<T>> {
}
declare class PropertyValueChangeEvent<P extends ElementExtendable, E extends Element<P>> extends EditorEvent<PropertyValueChangeEventData<P, E>> {
}
declare class ExtensionEvent<E extends EditorExtension, T extends ExtensionEventData<E>> extends EditorEvent<T> {
}
export declare class ExtensionInitializeEvent<T extends EditorExtension> extends ExtensionEvent<T, ExtensionInitializeEventData<T>> {
}
export declare class ExtensionReadyEvent<T extends EditorExtension> extends ExtensionEvent<T, ExtensionReadyEventData<T>> {
}
export declare class ExtensionShutdownEvent<T extends EditorExtension> extends ExtensionEvent<T, ExtensionShutdownEventData<T>> {
}
export declare class PlayerModeChangeEvent<T extends EditorExtension> extends ExtensionEvent<T, PlayerModeChangeEventData<T>> {
}
/**@public */
export interface EditorExtension {
	Initialiaze?(extension: this): void;
	Ready?(extension: this): void;
	Shutdown?(extension: this): void;
}
export abstract class EditorExtension {
	readonly player: Player;
	readonly onInitialize: ExtensionInitializeEvent<this>;
	readonly onReady: ExtensionReadyEvent<this>;
	readonly onShutdown: ExtensionShutdownEvent<this>;
	readonly onPlayerModeChange: PlayerModeChangeEvent<this>;
	readonly statusBar: StatusBarControl;
	readonly menuBar: MenuBarControl;
	readonly clipboard: ClipboardManager;
	protected constructor();
	static readonly extensionName?: string;
	static readonly metadata?: ExtensionOptionalParameters;
	static registry(extensionName?: string): T;
	redirectTo(destination: Destination): void;
	setBuildInPaneVisibility(pane: BuildInPane, visible?: boolean): void;
}
declare class PlayerDisplayManager {
	static hasDisplayManager(player: Player): boolean;
	static getDisplayManager(player: Player): any;
	readonly player: Player;
	readonly uniques: WeakMap<any, string>;
	readonly isReady: boolean;
	readonly onClientReady: NativeEvent<[
		{
			player: Player;
			display: PlayerDisplayManager;
		}
	]>;
	readonly actions: Map<string, Action>;
	constructor(player: Player);
	setRegisterAction(action: Action): string;
	getRegisteredAction(uuid: string): Action<ActionType.NoArgsAction> | undefined;
	hasRegisteredAction(uuid: string): boolean;
	hasUnique(obj: any): string | undefined;
	setUnique(obj: any, uuid: string): WeakMap<any, string>;
	getUnique(obj: any): string | undefined;
	openCreateUnique(obj: any): string | undefined;
}
declare class EditorContextManager {
	readonly context: ExtensionContext | undefined;
	readonly display: PlayerDisplayManager | undefined;
	readonly player: Player | undefined;
	readonly transactionManager: TransactionManager | undefined;
	readonly selectionManager: SelectionManager | undefined;
	readonly clipboardManager: ClipboardManager | undefined;
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
	readonly actionManager: Map<string, Action<ActionType.NoArgsAction>>;
	readonly get isReady(): boolean;
	private _eventReadyMethod;
	/**@param {ExtensionContext} context  */
	constructor(context: ExtensionContext, that: new () => any);
	shutdown(): void;
	static Shutdown(context: ExtensionContext): void;
	post(packet: IPacket): void;
}
export declare const Destination: typeof RedirectDestination;

export {};

