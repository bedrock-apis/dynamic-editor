import * as _00 from '@minecraft/common';
import * as _10 from '@minecraft/server';
import { BlockPermutation, BlockType, Dimension, Player, Vector3 } from '@minecraft/server';

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
/**@public */
export declare enum RedirectDestination {
	Documentation = 1,
	Feedback = 2,
	PauseScreen = 3
}
declare enum EditorInputContext {
	GlobalEditor = "global.editor",
	GlobalToolMode = "global.toolMode",
	Viewport = "local.toolMode.viewport"
}
/**@public */
export declare enum BuildInPane {
	UISettings = 1,
	WelcomePage = 2,
	LogPanel = 3
}
declare enum InternalPaneElementTypes {
	"String" = "editorUI:String",
	"Number" = "editorUI:Number",
	"Boolean" = "editorUI:Boolean",
	"Button" = "editorUI:Action",
	"Vector3" = "editorUI:Vec3",
	"Dropdown" = "editorUI:Dropdown",
	"BlockPicker" = "editorUI:BlockPicker",
	"Divider" = "editorUI:Divider",
	"SubPane" = "editorUI:SubPane"
}
export declare enum ButtonVariant {
	"secondary" = "secondary",
	"primary" = "primary",
	"destructive" = "destructive",
	"hero" = "hero"
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
export declare enum MouseAction {
	ButtonClick = 1,
	Wheel = 2,
	Drag = 3
}
declare enum InputModifier {
	Unused = 0,
	None = 1,
	Alt = 2,
	Control = 4,
	Shift = 8,
	Any = 15
}
/**
 * Keyboard key from @minecarft/server-editor
 */
export declare enum KeyboardKey {
	BACKSPACE = 8,
	TAB = 9,
	ENTER = 13,
	SHIFT = 16,
	CTRL = 17,
	ALT = 18,
	CAPS_LOCK = 20,
	ESCAPE = 27,
	SPACE = 32,
	PAGE_UP = 33,
	PAGE_DOWN = 34,
	END = 35,
	HOME = 36,
	LEFT = 37,
	UP = 38,
	RIGHT = 39,
	DOWN = 40,
	PRINT_SCREEN = 44,
	INSERT = 45,
	DELETE = 46,
	KEY_0 = 48,
	KEY_1 = 49,
	KEY_2 = 50,
	KEY_3 = 51,
	KEY_4 = 52,
	KEY_5 = 53,
	KEY_6 = 54,
	KEY_7 = 55,
	KEY_8 = 56,
	KEY_9 = 57,
	KEY_A = 65,
	KEY_B = 66,
	KEY_C = 67,
	KEY_D = 68,
	KEY_E = 69,
	KEY_F = 70,
	KEY_G = 71,
	KEY_H = 72,
	KEY_I = 73,
	KEY_J = 74,
	KEY_K = 75,
	KEY_L = 76,
	KEY_M = 77,
	KEY_N = 78,
	KEY_O = 79,
	KEY_P = 80,
	KEY_Q = 81,
	KEY_R = 82,
	KEY_S = 83,
	KEY_T = 84,
	KEY_U = 85,
	KEY_V = 86,
	KEY_W = 87,
	KEY_X = 88,
	KEY_Y = 89,
	KEY_Z = 90,
	NUMPAD_0 = 96,
	NUMPAD_1 = 97,
	NUMPAD_2 = 98,
	NUMPAD_3 = 99,
	NUMPAD_4 = 100,
	NUMPAD_5 = 101,
	NUMPAD_6 = 102,
	NUMPAD_7 = 103,
	NUMPAD_8 = 104,
	NUMPAD_9 = 105,
	NUMPAD_MULTIPLY = 106,
	NUMPAD_ADD = 107,
	NUMPAD_SEPARATOR = 108,
	NUMPAD_SUBTRACT = 109,
	NUMPAD_DECIMAL = 110,
	NUMPAD_DIVIDE = 111,
	F1 = 112,
	F2 = 113,
	F3 = 114,
	F4 = 115,
	F5 = 116,
	F6 = 117,
	F7 = 118,
	F8 = 119,
	F9 = 120,
	F10 = 121,
	F11 = 122,
	F12 = 123,
	COMMA = 188,
	PERIOD = 190,
	SLASH = 191,
	BACK_QUOTE = 192,
	BRACKET_OPEN = 219,
	BACK_SLASH = 220,
	BRACKET_CLOSE = 221,
	QUOTE = 222
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
	UpdatePaneControl = 13,
	ReleasePaneControl = 14,
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
declare class ServerUXEventPacket extends Packet {
	constructor(data: any);
}
declare class ServerActionEventPacket extends Packet {
	constructor(data: any);
}
declare abstract class Postable<K extends IPacket> {
	protected abstract readonly packetConstructor: new (data: any) => K;
	protected readonly PACKET_TYPES: {
		[key: number]: number | null;
	};
	protected getMainPacketData(flags: number, packets: IPacket[]): any;
	protected getMainPacket(flags: number, packets: IPacket[]): K;
	protected getPackets(flags: number): Generator<IPacket, any, any>;
}
declare abstract class UniquePostable<K extends IPacket> extends Postable<K> implements IUniqueObject {
	[UNIQUE_SYMBOL](d: PlayerDisplayManager): string | undefined;
	protected getMainPacketData(flags: number, packets: IPacket[]): any;
}
/**@deprecated internal methods */
export interface IUpdateable {
	/**@deprecated internal methods */
	displayInitPackets(): Generator<IPacket>;
	/**@deprecated internal methods */
	displayUpdatePackets(): Generator<IPacket>;
	/**@deprecated internal methods */
	displayDisposePackets(): Generator<IPacket>;
}
declare class Displayable<T extends IPacket> extends UniquePostable<T> implements IUpdateable {
	protected readonly packetConstructor: new (data: any) => T;
	constructor(constuct: new (data: any) => T);
	/**@deprecated internal methods */
	readonly onUpdate: PublicEvent<[
		IUpdateable,
		number
	]>;
	/**@deprecated internal methods */
	displayInitPackets(): Generator<IPacket>;
	/**@deprecated internal methods */
	displayUpdatePackets(): Generator<IPacket>;
	/**@deprecated internal methods */
	displayDisposePackets(): Generator<IPacket>;
}
declare class Action<AType extends ActionType = ActionType.NoArgsAction> extends UniquePostable<ServerActionEventPacket> implements IActionLike, IUpdateable {
	protected packetConstructor: new (data: any) => ServerActionEventPacket;
	[UNIQUE_SYMBOL](d: PlayerDisplayManager): string;
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
	get [ACTION_RETURNER](): this;
	protected getMainPacketData(flags: number, packets: IPacket[]): any;
	execute(payload: AType extends ActionType.MouseRayCastAction ? MouseRayCastPayload : NoArgsPayload): void;
	displayInitPackets(): Generator<IPacket, any, any>;
	displayDisposePackets(): Generator<IPacket>;
	displayUpdatePackets(): Generator<IPacket>;
}
declare class ControlBindedAction extends Action<ActionType.NoArgsAction> {
	readonly control: IUniqueObject;
	constructor(control: IUniqueObject);
	displayInitPackets(): Generator<IPacket, void, any>;
	displayDisposePackets(): Generator<IPacket, void, unknown>;
}
declare class KeyInputAction extends Action<ActionType.NoArgsAction> {
	readonly context: IUniqueObject | EditorInputContext;
	readonly button: KeyboardKey;
	readonly inputModifier: InputModifier;
	constructor(context: IUniqueObject | EditorInputContext, button: KeyboardKey, inputModifier: InputModifier);
	displayInitPackets(): Generator<IPacket, void, any>;
	displayDisposePackets(): Generator<IPacket, void, unknown>;
}
declare class MouseInputAction extends Action<ActionType.MouseRayCastAction> {
	readonly context: IUniqueObject;
	readonly mouseAction: MouseAction;
	constructor(context: IUniqueObject, mouseAction: MouseAction);
	displayInitPackets(): Generator<IPacket, void, any>;
	displayDisposePackets(): Generator<IPacket, void, unknown>;
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
	get block(): import("@minecraft/server").Block | undefined;
	constructor(player: Player, data: any);
}
export enum ClipboardMirrorAxis {
	None = "None",
	X = "X",
	XZ = "XZ",
	Z = "Z"
}
export enum ClipboardRotation {
	None = "None",
	Rotate180 = "Rotate180",
	Rotate270 = "Rotate270",
	Rotate90 = "Rotate90"
}
export enum CursorControlMode {
	Fixed = 3,
	Keyboard = 0,
	KeyboardAndMouse = 2,
	Mouse = 1
}
export enum CursorTargetMode {
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
export class ClipboardItem {
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
export class ClipboardManager {
	private constructor();
	readonly clipboard: ClipboardItem;
	create(): ClipboardItem;
}
export class Cursor {
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
export class Selection {
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
export class SelectionManager {
	private constructor();
	readonly selection: Selection;
	create(): Selection;
}
declare class SettingsManager {
	private constructor();
	readonly graphics: GraphicsSettings;
}
export class TransactionManager {
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
declare class EditorControlManager {
	readonly context: EditorContextManager;
	readonly changes: Map<IUpdateable, Set<any>>;
	readonly toolView: ToolView;
	get isReady(): boolean;
	set isReady(v: boolean);
	constructor(context: EditorContextManager);
	whenUpdate(control: IUpdateable, flag: number): void;
	setUpdate(): number | true | undefined;
	private _ready?;
	private task;
	private build;
	private resolvePackets;
	private packetMethods;
}
declare class EditorContextManager {
	readonly context: ExtensionContext | undefined;
	readonly display: PlayerDisplayManager | undefined;
	readonly player: Player | undefined;
	readonly cursor: Cursor | undefined;
	readonly transactionManager: TransactionManager | undefined;
	readonly selectionManager: SelectionManager | undefined;
	readonly clipboardManager: ClipboardManager | undefined;
	readonly controlManager: EditorControlManager | undefined;
	readonly extension: EditorExtension | undefined;
	readonly onInitializeEvent: NativeEvent<[
		this
	]>;
	readonly onReadyEvent: NativeEvent<[
		this
	]>;
	readonly onShutdownEvent: NativeEvent<[
		this
	]>;
	readonly actionManager: Map<string, Action<ActionType.NoArgsAction>>;
	get isReady(): boolean;
	private _eventReadyMethod;
	/**@param {ExtensionContext} context  */
	constructor(context: ExtensionContext, that: new () => EditorExtension);
	shutdown(): void;
	static Shutdown(context: ExtensionContext): void;
	post(packet: IPacket): void;
}
/**@public */
export interface EditorExtension {
	/**Fired for extension initialization.*/
	Initialize?(extension: this): void;
	/**Fired for extension, when ready.*/
	Ready?(extension: this): void;
	/**Fired for extension, when shutting down.*/
	Shutdown?(extension: this): void;
}
export abstract class EditorExtension {
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
	/**ClipboardManager known from native editor APIs.*/
	readonly clipboardManager: ClipboardManager;
	/**TransactionManager known from native editor APIs.*/
	readonly transactionManager: TransactionManager;
	/**SelectionManager known from native editor APIs.*/
	readonly selectionManager: SelectionManager;
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
	static registry(extensionName?: string): void;
	/**Redirection to hardcoded destinations*/
	redirectTo(destination: RedirectDestination): this;
	/**Changing visibility of hardcoded client Panes*/
	setBuildInPaneVisibility(pane: BuildInPane, visible?: boolean): this;
	/**Changes cursor properties*/
	setCursorProperties(cursorProperties: CursorProperties): this;
	/**Returns cursor properties*/
	getCursorProperties(): CursorProperties;
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
	readonly oldValue: ElementPropertyType<P[keyof P]>;
	readonly newValue: ElementPropertyType<P[keyof P]>;
	constructor(element: E, propertyName: N, property: P[N], oldValue: ElementPropertyType<P[keyof P]>, newValue: ElementPropertyType<P[keyof P]>);
}
export declare class ValueChangeEventData<T> extends EditorEventData {
	readonly oldValue: T;
	newValue: T;
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
export type ElementExtendable = {
	[key: string]: ElementProperty<any>;
};
export type ElementConstruction<PropertyRecord extends ElementExtendable> = {
	[K in keyof PropertyRecord]: {
		property: PropertyRecord[K];
		isFake?: boolean;
		construct?: new (...any: any[]) => PropertyRecord[K];
	};
};
export type ElementPropertyType<T> = T extends ElementProperty<infer A> ? A : never;
declare const OBJECT_TYPE: unique symbol;
declare const ACTION_RETURNER: unique symbol;
export interface IContentElement extends Element<any> {
	setContent(content: string): this;
}
export interface IObjectType {
	readonly [OBJECT_TYPE]: symbol;
}
export interface IActionLike {
	readonly [ACTION_RETURNER]: Action<any>;
}
declare class Property<T> {
	readonly onValueChange: ValueChangeEvent<T>;
	/**@deprecated @private Be care full this assignment doesn't update the property*/
	readonly _onValueChange: PublicEvent<[
		{
			newValue: T;
			oldValue: T;
		}
	]>;
	/**@deprecated Be care full this assignment doesn't update the property*/
	value: T;
	protected constructedWith: new (...any: any) => this;
	protected constructor(n: T);
	isValidType(v: any): boolean;
	static canAssign(p: Property<any>): boolean;
	setValue(value: T): this;
	addOnValueChangeHandler(a: Parameters<ValueChangeEvent<T>["subscribe"]>[0]): this;
	removeOnValueChangeHandler(a: Parameters<ValueChangeEvent<T>["subscribe"]>[0]): this;
}
declare class ElementProperty<T> extends Property<T> {
	createPropertyBinder<K, EP extends ElementProperty<K>>(elemetPropertySetter: EP, converter: (v: T, source: this, target: ElementProperty<K>) => K, updateValue?: boolean): EP;
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
	constructor(targetElement: Element<T>, targetPropertyName: keyof T, sourceElement: Element<S>, sourcePropertyName: keyof S, method: (data: any) => any);
}
export declare class Element<PropertyRecord extends ElementExtendable = {}> extends Displayable<ServerUXEventPacket> implements IUniqueObject {
	static BindProperty<L extends ElementExtendable, P extends ElementExtendable, K extends keyof L, K2 extends keyof P>(sourceElement: Element<P>, sourcePropertyName: K2, targetElement: Element<L>, targetPropertyName: K, convertor?: (value: ElementPropertyType<P[K2]>) => ElementPropertyType<L[K]>): BindedSource<P, L>;
	static UnbindProperty<L extends ElementExtendable, P extends ElementExtendable>(bindedSource: BindedSource<L, P>): null;
	[UNIQUE_SYMBOL](d: PlayerDisplayManager): string | undefined;
	readonly onPropertyValueChange: PropertyValueChangeEvent<PropertyRecord, this>;
	protected readonly _proxyProperties: any;
	protected readonly _proxyValues: any;
	protected readonly propertyBag: {
		[K in keyof PropertyRecord]: {
			property: PropertyRecord[K];
			construct: typeof Property & {
				new (...any: any[]): PropertyRecord[K];
			};
		};
	};
	protected readonly _isFakes: Map<keyof PropertyRecord, boolean>;
	protected _isChanging: boolean;
	private readonly _methods;
	protected constructor(properties: ElementConstruction<PropertyRecord>);
	readonly get proxyProperties(): PropertyRecord;
	readonly get proxyValues(): {
		[K in keyof PropertyRecord]: ElementPropertyType<PropertyRecord[K]>;
	};
	getPropertyNames(): (keyof PropertyRecord)[];
	hasProperty<T extends string>(propertyName: T): boolean;
	getProperty<T extends keyof PropertyRecord>(propertyName: T): PropertyRecord[T];
	getPropertyValue<T extends keyof PropertyRecord, V extends PropertyRecord[T]>(propertyName: T): ElementPropertyType<V>;
	setProperty<T extends keyof PropertyRecord>(propertyName: T, property: PropertyRecord[T]): this;
	setProperties(propertyRecord: {
		[K in keyof PropertyRecord]?: PropertyRecord[K];
	}): this;
	getProperties(): {
		[K in keyof PropertyRecord]?: PropertyRecord[K];
	};
	setPropertyValue<T extends keyof PropertyRecord>(propertyName: T, value: ElementPropertyType<PropertyRecord[T]>): this;
	protected getMainPacketData(flags: number, packets: IPacket[]): any;
	protected _TriggerPropertyChange<T extends keyof PropertyRecord>(el: Element<PropertyRecord>, nV: ElementPropertyType<PropertyRecord[T]>, pN: T, oV: ElementPropertyType<PropertyRecord[T]>, p: PropertyRecord[T]): void;
	protected _setPropertyRealness<T extends keyof PropertyRecord>(key: T, isReal: boolean): this;
	protected _getPropertyRealness<T extends keyof PropertyRecord>(key: T): boolean;
	protected _isPropertyReal<T extends keyof PropertyRecord>(key: T): boolean;
}
declare class TypeOfProperty<T> extends ElementProperty<T> {
	static _typeof: "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function";
	isValidType(v: any): boolean;
}
export declare class StringProperty<T extends string = string> extends TypeOfProperty<T> {
	static _typeof: "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function";
	constructor(v?: string);
}
export declare class NumberProperty<T extends number = number> extends TypeOfProperty<T> {
	static _typeof: "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function";
	constructor(v?: number);
}
export declare class BooleanProperty<T extends boolean = boolean> extends TypeOfProperty<T> {
	static _typeof: "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function";
	constructor(v?: boolean);
}
declare class RenderingElement<PropertyRecord extends ElementExtendable> extends Element<{
	visible: BooleanProperty;
} & PropertyRecord> {
	protected constructor(properties: ElementConstruction<PropertyRecord>);
	get isVisible(): boolean;
	set isVisible(v: boolean);
	setVisibility(visible: boolean): this;
}
declare class ModingElement<PropertyRecord extends ElementExtendable> extends RenderingElement<{
	enable: BooleanProperty;
} & PropertyRecord> {
	protected constructor(properties: ElementConstruction<PropertyRecord>);
	get isEnabled(): boolean;
	set isEnabled(v: boolean);
	setEnable(enable: boolean): this;
}
declare class ModedElement<PropertyRecord extends ElementExtendable> extends RenderingElement<{
	enabled: BooleanProperty;
} & PropertyRecord> {
	protected constructor(properties: ElementConstruction<PropertyRecord>);
	get isEnabled(): boolean;
	set isEnabled(v: boolean);
	setEnable(enable: boolean): this;
}
declare class ActionBasedEvent<T extends KeyInputAction | MouseInputAction, C extends IUniqueObject | EditorInputContext> extends Displayable<ServerUXEventPacket> {
	protected constructor(contextId: C);
	protected readonly _context: C;
	protected readonly _actions: Map<any, {
		action: T;
		ma: any;
	}>;
	protected _subUpdate(a: T): void;
	protected _unsubUpdate(a: T): void;
	displayInitPackets(): Generator<IPacket, void, any>;
	displayDisposePackets(): Generator<IPacket, void, unknown>;
}
export interface IDropdownItem {
	displayAltText?: string;
	displayStringId?: string;
}
export declare class StatusBarAlignmentProperty extends NumberProperty<0 | 1> {
	constructor(alignment?: StatusBarItemAlignment);
	isValidType(v: any): boolean;
}
export declare class ButtonVariantProperty extends StringProperty<ButtonVariant> {
	static defaultValue: ButtonVariant;
	constructor(variant?: ButtonVariant);
	isValidType(v: any): boolean;
}
export declare class Vector3Property extends ElementProperty<Vector3> {
	constructor(def?: Vector3);
	isValidType(v: any): boolean;
}
declare class ArrayProperty<K> extends ElementProperty<K[]> {
	constructor(array?: K[]);
	isValidType(v: any): boolean;
}
export declare class DropdownItemsMapingProperty extends ArrayProperty<IDropdownItem> {
	constructor(array?: IDropdownItem[]);
}
declare class MouseInputActionsEvent extends ActionBasedEvent<MouseInputAction, IUniqueObject> {
	constructor(conextId: IUniqueObject);
	subscribe<M extends (payload: MouseRayCastPayload) => void>(m: M, mouseAction: MouseAction): M;
	unsubscribe<M extends (payload: MouseRayCastPayload) => void>(m: M): M;
}
export interface IPaneElement<T extends PaneElement<any, any>> extends Displayable<any> {
	getSelfElement(): T;
}
declare class PaneElement<T extends InternalPaneElementTypes, PropertyRecord extends ElementExtendable = {}> extends ModingElement<PropertyRecord> implements IPaneElement<PaneElement<T, PropertyRecord>> {
	protected PACKET_TYPES: {
		0: ServerUXEventType;
		1: ServerUXEventType;
		2: ServerUXEventType;
	};
	protected _paneId: any;
	protected _lastPaneId: any;
	protected get paneId(): any;
	protected set paneId(v: any);
	protected get lastPaneId(): any;
	protected set lastPaneId(v: any);
	protected typeName: T;
	protected propertyItemOptions: any;
	protected constructor(properties: ElementConstruction<PropertyRecord>, typeName: T);
	protected getMainPacketDataItemOptions(flags: number, packets: IPacket[]): any;
	getMainPacketData(flags: number, packets: IPacket[]): any;
	getSelfElement(): PaneElement<T, PropertyRecord>;
}
declare class ContentPaneElement<T extends InternalPaneElementTypes, PropertyRecord extends ElementExtendable> extends PaneElement<T, {
	titleAltText: StringProperty;
	titleStringId: StringProperty;
} & PropertyRecord> {
	protected constructor(properties: ElementConstruction<PropertyRecord>, typeName: T);
	get title(): string;
	set title(v: string);
	setTitle(title: string): this;
	protected getMainPacketDataItemOptions(flags: number, packets: IPacket[]): any;
}
declare class ValuePaneElement<T extends InternalPaneElementTypes, PropertyRecord extends ElementExtendable, P extends ElementProperty<any>> extends ContentPaneElement<T, {
	value: P;
} & PropertyRecord> {
	protected constructor(properties: ElementConstruction<PropertyRecord & {
		value: P;
	}>, typeName: T);
	protected readonly _propertyKey: string;
	readonly onUserInputValue: ValueChangeEvent<ElementPropertyType<P>>;
	get value(): ElementPropertyType<P>;
	set value(v: ElementPropertyType<P>);
	setValue(value: ElementPropertyType<P>): this;
	getValueProperty(): P;
	getMainPacketData(flags: number, packets: IPacket[]): any;
	protected _setValue(newValue: any): void;
}
declare class SubPaneElement extends PaneElement<InternalPaneElementTypes.SubPane, {}> {
	protected readonly pane: EditorPane;
	protected constructor(pane: EditorPane);
	protected get paneId(): any;
	protected set paneId(v: any);
	protected get lastPaneId(): any;
	protected set lastPaneId(v: any);
	protected getMainPacketDataItemOptions(flags: number, packets: IPacket[]): any;
}
export declare class EditorPane extends RenderingElement<{
	collapsed: BooleanProperty;
	titleAltText: StringProperty;
	width: NumberProperty;
}> implements IPaneElement<any> {
	protected PACKET_TYPES: {
		0: ServerUXEventType;
		1: ServerUXEventType;
		2: ServerUXEventType;
	};
	[UNIQUE_SYMBOL](d: PlayerDisplayManager): string;
	protected _parentPane: any;
	protected readonly _paneElementHandler: Map<IPaneElement<any>, {
		element: IPaneElement<any>;
		method: any;
		prop: any;
	}>;
	protected readonly _properties: Map<string, ValuePaneElement<any, any, any>>;
	protected readonly _currentElement: SubPaneElement;
	get elementCount(): number;
	constructor(title?: string);
	get width(): number;
	set width(v: number);
	setWidth(n: number): this;
	get title(): string;
	set title(v: string);
	setTitle(title: string): this;
	get isCollapsed(): boolean;
	set isCollapsed(v: boolean);
	setCollapsed(isCollapsed: boolean): this;
	getElements(): IterableIterator<IPaneElement<any>>;
	addElement(e: IPaneElement<any>): this;
	addElements(...elements: IPaneElement<any>[]): this;
	removeElement(e: IPaneElement<any>): boolean;
	protected getMainPacketData(flags: number, packets: IPacket[]): any;
	protected _getPropertyItems(flag: number, packets: IPacket[]): any[];
	getSelfElement(): any;
}
export declare class DividerPaneElement extends PaneElement<InternalPaneElementTypes.Divider> {
	constructor();
}
export declare class BooleanPaneElement extends ValuePaneElement<InternalPaneElementTypes.Boolean, {}, BooleanProperty> {
	constructor(title: string);
}
export declare class StringPaneElement extends ValuePaneElement<InternalPaneElementTypes.String, {}, StringProperty> {
	constructor(title: string);
}
export declare class NumberPaneElement extends ValuePaneElement<InternalPaneElementTypes.Number, {
	min: NumberProperty;
	max: NumberProperty;
	showSlider: BooleanProperty;
}, NumberProperty> {
	constructor(title: string, showSlider?: boolean);
	setMaxValue(max: number): this;
	setMinValue(max: number): this;
	setMinMaxValues(min: number, max: number): this;
	setShowSlider(show: boolean): this;
	get maxValue(): number;
	set maxValue(v: number);
	get minValue(): number;
	set minValue(v: number);
	get showSlider(): boolean;
	set showSlider(v: boolean);
	protected getMainPacketDataItemOptions(flags: number, packets: IPacket[]): any;
}
export declare class ButtonPaneElement extends ContentPaneElement<InternalPaneElementTypes.Button, {
	variant: ButtonVariantProperty;
}> {
	protected _action: Action<ActionType.NoArgsAction>;
	readonly onButtonClick: PublicEvent<[
		NoArgsPayload
	]>;
	constructor(label: string);
	protected getMainPacketDataItemOptions(flags: number, packets: IPacket[]): any;
	getMainPacketData(flags: number, packets: IPacket[]): any;
	addClickHandler(method: () => void): this;
	removeClickHandler(method: () => void): this;
}
export declare class VectorPaneElement extends ValuePaneElement<InternalPaneElementTypes.Vector3, {
	min: Vector3Property;
	max: Vector3Property;
}, Vector3Property> {
	constructor(title: string);
	setMaxValue(max: Vector3): this;
	setMinValue(max: Vector3): this;
	get maxValue(): Vector3;
	set maxValue(v: Vector3);
	get minValue(): Vector3;
	set minValue(v: Vector3);
	protected getMainPacketDataItemOptions(flags: number, packets: IPacket[]): any;
}
export declare class DropdownPaneElement<T extends any[]> extends ValuePaneElement<InternalPaneElementTypes.Dropdown, {
	dropdownItems: DropdownItemsMapingProperty;
}, NumberProperty> {
	protected _options: T;
	protected _propertyGetter: ElementProperty<T[number] | undefined>;
	constructor(title: string, array?: T);
	get selectedValue(): T[number];
	get selectedValuePropertyGetter(): ElementProperty<T[number] | undefined>;
	setDropdownItems(array: T): this;
	static MapDropDownItems(array: any[]): {
		dropdownItems: {
			displayAltText: string;
			value: number;
		}[];
		options: any[];
	};
	protected getMainPacketDataItemOptions(flags: number, packets: IPacket[]): any;
}
export declare class BlockPickerPaneElement extends ValuePaneElement<InternalPaneElementTypes.BlockPicker, {
	allowedBlocks: ArrayProperty<string>;
}, StringProperty> {
	constructor(title: string);
	protected getMainPacketDataItemOptions(flags: number, packets: IPacket[]): any;
}
export declare class StatusBarItem extends ModedElement<{
	size: NumberProperty;
	text: StringProperty;
	alignment: StatusBarAlignmentProperty;
}> implements IContentElement {
	protected readonly PACKET_TYPES: {
		2: ServerUXEventType;
		0: ServerUXEventType;
		1: ServerUXEventType;
	};
	constructor(content?: string);
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
declare class MenuItem<SubProperties extends ElementExtendable = {}> extends ModedElement<{
	displayStringLocId: StringProperty;
	name: StringProperty;
} & SubProperties> implements IContentElement {
	/**@private*/
	_parent: any;
	protected readonly PACKET_TYPES: {
		2: ServerUXEventType;
		0: ServerUXEventType;
		1: ServerUXEventType;
	};
	protected constructor(properties: ElementConstruction<SubProperties>, content: string);
	get content(): string;
	set content(v: string);
	setContent(displayText: string): this;
	getMainPacketData(flags: number, packets: IPacket[]): any;
}
export declare class MenuActionItem extends MenuItem<{
	checked: BooleanProperty;
}> implements IActionLike {
	protected readonly _action: ControlBindedAction;
	readonly onActionExecute: PublicEvent<[
		NoArgsPayload
	]>;
	protected readonly _triggers: Set<any>;
	constructor(content?: string);
	get [ACTION_RETURNER](): ControlBindedAction;
	get checkmarkEnabled(): boolean;
	set checkmarkEnabled(v: boolean);
	get checked(): boolean;
	set checked(v: boolean);
	setChecked(isChecked: boolean): this;
	setCheckmarkEnabled(enabled: boolean): this;
	addActionHandler(handler: (param: NoArgsPayload) => void): this;
	addKeyboardTrigger(keyButton: KeyboardKey, modifier?: InputModifier): this;
	clearKeyboardTriggers(): this;
	displayInitPackets(): Generator<IPacket, void, any>;
	displayDisposePackets(): Generator<IPacket, void, unknown>;
}
export declare class MenuOptionsItem extends MenuItem<{}> {
	constructor(content?: string);
	protected readonly _handlers: Map<MenuItem<any>, any>;
	get elementsLength(): number;
	addMenuItem(item: MenuItem<any>): this;
	removeMenuItem(item: MenuItem<any>): this;
	getMenuItems(): Generator<MenuItem<any>, void, unknown>;
	hasMenuItem(item: MenuItem<any>): boolean;
	displayInitPackets(): Generator<IPacket, void, unknown>;
	displayDisposePackets(): Generator<IPacket, void, unknown>;
}
export interface IUnkownTool {
	readonly id: string;
}
export declare class Tool extends ModedElement<{
	icon: StringProperty;
	titleString: StringProperty;
	titleStringLocId: StringProperty;
	descriptionString: StringProperty;
	descriptionStringLocId: StringProperty;
}> implements IObjectType {
	protected packetConstructor: new (data: any) => ServerUXEventPacket;
	protected _propertyBindings: WeakMap<WeakKey, any>;
	protected readonly PACKET_TYPES: {
		[key: number]: number | null;
	};
	[UNIQUE_SYMBOL](d: PlayerDisplayManager): string;
	readonly [OBJECT_TYPE]: symbol;
	readonly onActivationStateChange: PublicEvent<[
		{
			isSelected: boolean;
			tool: Tool;
		}
	]>;
	readonly onMouseInteract: MouseInputActionsEvent;
	readonly isActivePropertyGetter: BooleanProperty<boolean>;
	constructor(icon?: string, title?: string, description?: string);
	get icon(): string;
	set icon(v: string);
	get title(): string;
	set title(v: string);
	get description(): string;
	set description(v: string);
	setIcon(icon: string): this;
	/**@author ConMaster2112 */
	setTitle(text: string): this;
	/**@deprecated This state of tool doesn't really do anything, but maybe in future its going to do.*/
	setEnable(enable: boolean): this;
	/**@deprecated This state of tool doesn't really do anything, but maybe in future its going to do.*/
	setVisibility(visible: boolean): this;
	setDescription(text: string): this;
	bindPropertyPanes(...panes: EditorPane[]): this;
	unbindPropertyPanes(...panes: EditorPane[]): this;
	getMainPacketData(flags: number, packets: IPacket[]): any;
	displayInitPackets(): Generator<IPacket, void, any>;
	displayDisposePackets(): Generator<IPacket, void, unknown>;
}
export declare class ToolView extends Displayable<IPacket> {
	protected readonly PACKET_TYPES: {
		2: ServerUXEventType;
		0: ServerUXEventType;
		1: ServerUXEventType;
	};
	protected readonly _MenuItemEvenHandler: Map<MenuItem<any>, any>;
	protected readonly _StatusItemEvenHandler: Map<StatusBarItem, any>;
	protected readonly _ToolEvenHandler: Map<Tool, any>;
	protected readonly _EditorPaneEvenHandler: Map<EditorPane, any>;
	protected readonly _manager: EditorControlManager;
	protected _visible: boolean;
	protected _enabled: boolean;
	protected _activeTool: any;
	get registeredTools(): number;
	get registeredMenuItems(): number;
	get registeredStatusBarItems(): number;
	get registeredEditorPanes(): number;
	protected constructor(manager: EditorControlManager);
	protected _registry(item: EditorPane | MenuItem | StatusBarItem | Tool, map: Map<any, any>): boolean;
	protected _unregistry(item: EditorPane | MenuItem | StatusBarItem | Tool, map: Map<any, any>): boolean;
	addEditorPanes(...panes: EditorPane[]): this;
	addTools(...tools: Tool[]): this;
	addMenuItems(...items: MenuItem<any>[]): this;
	addStatusBarItems(...items: StatusBarItem[]): this;
	setActiveTool(item: Tool | null): void;
	getActiveTool(): Tool | IUnkownTool | null;
	addMenuItem(item: MenuItem<any>): boolean;
	addStatusBarItem(item: StatusBarItem): boolean;
	addTool(item: Tool): boolean;
	addEditorPane(item: EditorPane): boolean;
	removeItem(item: MenuItem<any> | StatusBarItem | Tool | EditorPane): boolean;
	clearAll(): void;
	hasTool(item: any): boolean;
	hasMenuItem(item: any): boolean;
	hasEditorPane(item: any): boolean;
	hasStatusBarItem(item: any): boolean;
	getMenuItems(): IterableIterator<MenuItem<any>>;
	getStatusBarItems(): IterableIterator<StatusBarItem>;
	getTools(): IterableIterator<Tool>;
	getEditorPanes(): IterableIterator<EditorPane>;
	/**@deprecated This is feature is incomplete, it can be set but could be desynced by other addons */
	setToolBarVisibility(visibility: boolean): this;
	/**@deprecated This is feature is incomplete, it can be set but could be desynced by other addons */
	setToolBarMode(enabled: boolean): this;
	/**@deprecated Internal function */
	displayInitPackets(): Generator<IPacket, void, any>;
	/**@deprecated Internal function */
	displayDisposePackets(): Generator<IPacket, void, unknown>;
	protected getMainPacketData(flags?: number | undefined): any;
}
export declare class AutoSizeStatusBarItem extends StatusBarItem {
	constructor(content?: string);
}
export declare class BlockTypePickerPaneElement extends BlockPickerPaneElement {
	constructor(title: string);
	get selectedBlockType(): BlockType;
	get selectedBlockPermutation(): BlockPermutation;
}
export declare class PermutationPickerPane extends EditorPane {
	readonly blockTypePicker: BlockTypePickerPaneElement;
	protected readonly pane: EditorPane;
	protected permutation: BlockPermutation;
	get blockPermutation(): BlockPermutation;
	constructor(title: string);
}
declare class PlayerDisplayManager {
	static hasDisplayManager(player: Player): boolean;
	static getDisplayManager(player: Player): any;
	readonly activeTool: IUnkownTool | null;
	readonly player: Player;
	readonly uniques: WeakMap<any, string>;
	readonly reverses: Map<string, any>;
	readonly isReady: boolean;
	readonly onClientReady: NativeEvent<[
		{
			player: Player;
			display: PlayerDisplayManager;
		}
	]>;
	readonly onToolAtivate: NativeEvent<[
		{
			player: Player;
			display: PlayerDisplayManager;
			tool: Tool | IUnkownTool | null;
			lastTool: Tool | IUnkownTool | null;
		}
	]>;
	lastTool: Tool | IUnkownTool | null;
	constructor(player: Player);
	addReverses(reverse: any, as?: string): string;
	getReverses(uuid: string): any;
	hasReverses(uuid: string): boolean;
	removeReveres(uuid: string): boolean;
	hasUnique(obj: any): string | undefined;
	setUnique(obj: any, uuid: string): WeakMap<any, string>;
	getUnique(obj: any): string | undefined;
	openCreateUnique(obj: any, as?: string): string | undefined;
}
declare const UNIQUE_SYMBOL: unique symbol;
export interface IPacket {
	readonly id: string;
	readonly data: any;
}
export interface IUniqueObject {
	[UNIQUE_SYMBOL](display: PlayerDisplayManager, context: EditorContextManager): any;
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

export {};

