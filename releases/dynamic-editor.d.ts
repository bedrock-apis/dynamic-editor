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
declare enum MouseAction {
	Button = 1,
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
declare const IDENTITY_DATA: unique symbol;
export interface IPacket {
	readonly id: string;
	readonly data: any;
}
export interface IUniqueObject {
	[UNIQUE_SYMBOL]: boolean;
}
export interface IIdentityPacket extends IPacket {
	[IDENTITY_SYMBOL]: symbol;
	[IDENTITY_DATA]: any;
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
	get [IDENTITY_DATA](): any;
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
	[UNIQUE_SYMBOL]: boolean;
	protected getMainPacketData(flags?: number): any;
}
export interface IUpdateable {
	displayInitPackets(): Generator<IPacket>;
	displayUpdatePackets(): Generator<IPacket>;
	displayDisposePackets(): Generator<IPacket>;
}
declare class Displayable<T extends IPacket> extends UniquePostable<T> implements IUpdateable {
	protected readonly packetConstructor: new (data: any) => T;
	constructor(constuct: new (data: any) => T);
	readonly onUpdate: PublicEvent<[
		IUpdateable
	]>;
	readonly onInit: PublicEvent<[
		IUpdateable
	]>;
	readonly onDispose: PublicEvent<[
		IUpdateable
	]>;
	displayInitPackets(): Generator<IPacket>;
	displayUpdatePackets(): Generator<IPacket>;
	displayDisposePackets(): Generator<IPacket>;
}
declare class Action<AType extends ActionType = ActionType.NoArgsAction> extends UniquePostable<PostActionPacket> implements IActionLike, IUpdateable {
	protected packetConstructor: new (data: any) => PostActionPacket;
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
	protected getMainPacketData(flags?: number | undefined): any;
	execute(payload: AType extends ActionType.MouseRayCastAction ? MouseRayCastPayload : NoArgsPayload): void;
	displayInitPackets(): Generator<IPacket>;
	displayDisposePackets(): Generator<IPacket>;
	displayUpdatePackets(): Generator<IPacket>;
}
declare class ControlBindedAction extends Action<ActionType.NoArgsAction> {
	readonly control: IUniqueObject;
	constructor(control: IUniqueObject);
	displayInitPackets(): Generator<IPacket, void, unknown>;
	displayDisposePackets(): Generator<IPacket, void, unknown>;
}
declare class KeyInputAction extends Action<ActionType.NoArgsAction> {
	readonly context: IUniqueObject | EditorInputContext;
	readonly button: KeyboardKey;
	readonly inputModifier: InputModifier;
	constructor(context: IUniqueObject | EditorInputContext, button: KeyboardKey, inputModifier: InputModifier);
	displayInitPackets(): Generator<IPacket, void, unknown>;
	displayDisposePackets(): Generator<IPacket, void, unknown>;
}
declare class MouseInputAction extends Action<ActionType.MouseRayCastAction> {
	readonly context: IUniqueObject;
	readonly mouseAction: MouseAction;
	constructor(context: IUniqueObject, mouseAction: MouseAction);
	displayInitPackets(): Generator<IPacket, void, unknown>;
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
declare class EditorControlManager {
	readonly context: EditorContextManager;
	readonly changes: Map<IUpdateable, number>;
	readonly statusBar: StatusBarControl;
	readonly menuBar: MenuBarControl;
	readonly toolBar: ToolBar;
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
	static readonly UNIQUE_TYPE: symbol;
	static readonly EXPECTED_VALUE_TYPE?: string;
	/**@private*/
	readonly _type?: symbol;
	/**@private*/
	readonly _expectedType?: string;
	readonly onValueChange: ValueChangeEvent<T>;
	protected constructor();
}
declare class ElementProperty<T> extends Property<T> {
	/**@private*/
	value: T | null;
	protected readonly defualtValue: T | null;
	protected readonly _typeOf: string;
	protected readonly _bindedSetters: WeakMap<ElementProperty<T>, (...params: any) => any>;
	protected constructor(defaultValue: T | null);
	removeSetterBinding(propertyGetter: ElementProperty<T>): this;
	addSetterBinding(propertyGetter: ElementProperty<T>): this;
	protected isValidType(v: any): boolean;
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
	constructor(targetElement: Element<T>, targetPropertyName: keyof T, sourceElement: Element<S>, sourcePropertyName: keyof S, method: (data: any) => any);
}
export declare class Element<PropertyRecord extends ElementExtendable = {}> extends Displayable<ServerUXEventPacket> implements IUniqueObject {
	[UNIQUE_SYMBOL]: true;
	static BindProperty<L extends ElementExtendable, P extends ElementExtendable, K extends keyof L, K2 extends keyof P>(targetElement: Element<P>, targetPropertyName: K2, sourceElement: Element<L>, sourcePropertyName: K, convertor?: (value: ElementPropertyType<L[K]>) => ElementPropertyType<P[K2]>): BindedSource<L, P>;
	static UnbindProperty<L extends ElementExtendable, P extends ElementExtendable>(bindedSource: BindedSource<L, P>): null;
	readonly onPropertyValueChange: PropertyValueChangeEvent<PropertyRecord, this>;
	protected readonly propertyBag: PropertyRecord;
	protected readonly _isFakes: Map<keyof PropertyRecord, boolean>;
	protected _isChanging: boolean;
	private readonly _methods;
	private readonly _properties;
	protected constructor(properties: ElementConstruction<PropertyRecord>);
	getPropertyNames(): (keyof PropertyRecord)[];
	hasProperty<T extends string>(propertyName: T): boolean;
	getProperty<T extends keyof PropertyRecord>(propertyName: T): PropertyRecord[T];
	getPropertyValue<T extends keyof PropertyRecord, V extends PropertyRecord[T]>(propertyName: T): ElementPropertyType<V>;
	setProperty<T extends keyof PropertyRecord>(propertyName: T, property: PropertyRecord[T]): this;
	setPropertyValue<T extends keyof PropertyRecord>(propertyName: T, value: ElementPropertyType<PropertyRecord[T]>): this;
	getMainPacketData(flags?: number): any;
	protected _TriggerPropertyChange<T extends keyof PropertyRecord>(el: Element<PropertyRecord>, nV: ElementPropertyType<PropertyRecord[T]>, pN: T, oV: ElementPropertyType<PropertyRecord[T]>, p: PropertyRecord[T]): void;
	protected _setPropertyRealness<T extends keyof PropertyRecord>(key: T, isReal: boolean): this;
	protected _getPropertyRealness<T extends keyof PropertyRecord>(key: T): boolean;
	protected _isPropertyReal<T extends keyof PropertyRecord>(key: T): boolean;
}
declare class BaseControl<T extends Displayable<any>> extends Displayable<ServerUXEventPacket> {
	protected readonly _eventHandler: Map<T, any>;
	protected readonly _manager: EditorControlManager;
	protected readonly _instanceConstructor: (new () => T) | (() => T);
	protected _isDisposed: boolean;
	get isDisposed(): boolean;
	get elementsCount(): number;
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
export declare class ConvertingProperty<J, T = any> extends ElementProperty<J> {
	constructor(sourceProperty: ElementProperty<J>, converter: (value: J) => J);
	setValue(value: J | null): never;
}
declare class VisualElement<PropertyRecord extends ElementExtendable> extends Element<{
	visible: BooleanProperty;
	enabled: BooleanProperty;
} & PropertyRecord> {
	protected constructor(properties: ElementConstruction<PropertyRecord>);
	get isVisible(): boolean;
	set isVisible(v: boolean);
	get isEnabled(): boolean;
	set isEnabled(v: boolean);
	setVisibility(visible: boolean): this;
	setEnable(enable: boolean): this;
}
declare class Control<T extends Element<any>> extends BaseControl<T> {
}
declare class ActionBasedEvent<T extends KeyInputAction | MouseInputAction, C extends IUniqueObject | EditorInputContext> extends Displayable<ServerUXEventPacket> {
	protected constructor(contextId: C);
	protected readonly _context: C;
	protected readonly _actions: WeakMap<any, {
		action: T;
		ma: any;
	}>;
	protected _subUpdate(a: T): void;
	protected _unsubUpdate(a: T): void;
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
declare class MouseInputActionsEvent extends ActionBasedEvent<MouseInputAction, IUniqueObject> {
	constructor(conextId: IUniqueObject);
	subscribe<M extends (payload: MouseRayCastPayload) => void>(m: M, mouseAction: MouseAction): M;
	unsubscribe<M extends (payload: MouseRayCastPayload) => void>(m: M): M;
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
	getMainPacketData(flags?: number | undefined): any;
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
	displayInitPackets(): Generator<IPacket, void, unknown>;
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
export declare class Tool extends VisualElement<{
	icon: StringProperty;
	titleString: StringProperty;
	titleStringLocId: StringProperty;
	descriptionString: StringProperty;
	descriptionStringLocId: StringProperty;
}> implements IObjectType {
	protected packetConstructor: new (data: any) => ServerUXEventPacket;
	protected readonly PACKET_TYPES: {
		[key: number]: number | null;
	};
	readonly [OBJECT_TYPE]: symbol;
	readonly onActivationStateChange: PublicEvent<[
		{
			isSelected: boolean;
			tool: Tool;
		}
	]>;
	readonly onMouseInteract: MouseInputActionsEvent;
	readonly isActivePropertyGetter: BooleanProperty;
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
	getMainPacketData(flags?: number | undefined): any;
}
declare class ToolBar extends VisualElement<{}> {
	protected readonly PACKET_TYPES: {
		2: ServerUXEventType;
		0: ServerUXEventType;
		1: ServerUXEventType;
	};
	protected readonly _eventHandler: Map<Tool, any>;
	protected activeTool: any;
	get toolsCount(): number;
	private constructor();
	setActiveTool(item: Tool | null): void;
	getActiveTool(): Tool | IUnkownTool | null;
	getTools(): Generator<Tool, void, unknown>;
	addTool(item: Tool): boolean;
	removeTool(item: Tool): boolean;
	hasTool(item: any): boolean;
	getMainPacketData(flags?: number | undefined): any;
	/**@private */
	displayInitPackets(): Generator<IPacket, any, unknown>;
	/**@private */
	displayDisposePackets(): Generator<IPacket, any, unknown>;
	/**@deprecated This value could be desynced by other addons, you shouldn't depend on this feature */
	get isEnabled(): NonNullable<boolean | null>;
	/**@deprecated */
	set isEnabled(v: NonNullable<boolean | null>);
	/**@deprecated This value could be desynced by other addons, you shouldn't depend on this feature */
	get isVisible(): NonNullable<boolean | null>;
	/**@deprecated */
	set isVisible(v: NonNullable<boolean | null>);
	/**@deprecated This value could be desynced by other addons, you shouldn't depend on this feature */
	getProperty<T extends "visible" | "enabled">(propertyName: T): ({
		visible: BooleanProperty;
		enabled: BooleanProperty;
	})[T];
	/**@deprecated This value could be desynced by other addons, you can set, but you should not depend on returned information */
	getPropertyValue<T extends "visible" | "enabled", V extends ({
		visible: BooleanProperty;
		enabled: BooleanProperty;
	})[T]>(propertyName: T): ElementPropertyType<V>;
	/**@deprecated This value could be desynced by other addons, you shouldn't depend on this feature */
	setProperty<T extends "visible" | "enabled">(propertyName: T, property: {
		visible: BooleanProperty;
		enabled: BooleanProperty;
	}[T]): this;
	/**@deprecated This value could be desynced by other addons, you shouldn't depend on this feature */
	setPropertyValue<T extends "visible" | "enabled">(propertyName: T, value: ElementPropertyType<{
		visible: BooleanProperty;
		enabled: BooleanProperty;
	}[T]>): this;
	/**@deprecated This value could be desynced by other addons, you shouldn't depend on this feature */
	setEnable(enable: boolean): this;
	/**@deprecated This value could be desynced by other addons, you shouldn't depend on this feature */
	setVisibility(visible: boolean): this;
}
declare class StatusBarControl extends Control<StatusBarItem> {
	protected constructor(manager: EditorControlManager);
}
declare class MenuBarControl extends Control<MenuItem<any>> {
	protected constructor(manager: EditorControlManager);
	addItem(item: MenuItem<any>): boolean;
	removeItem(item: MenuItem<any>): boolean;
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
	Initialize?(extension: this): void;
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
	readonly toolBar: ToolBar;
	readonly clipboard: ClipboardManager;
	protected constructor();
	static readonly extensionName?: string;
	static readonly metadata?: ExtensionOptionalParameters;
	static registry(extensionName?: string): void;
	redirectTo(destination: RedirectDestination): void;
	setBuildInPaneVisibility(pane: BuildInPane, visible?: boolean): void;
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
	setRegisterAction(action: Action): string;
	getRegisteredAction(uuid: string): any;
	hasRegisteredAction(uuid: string): boolean;
	addReverses(reverse: any): string;
	getReverses(uuid: string): any;
	hasReverses(uuid: string): boolean;
	removeReveres(uuid: string): boolean;
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
	constructor(context: ExtensionContext, that: new () => any);
	shutdown(): void;
	static Shutdown(context: ExtensionContext): void;
	post(packet: IPacket): void;
}

export {};

