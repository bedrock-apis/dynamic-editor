import * as _00 from '@minecraft/common';
import * as _10 from '@minecraft/server';
export enum ClipboardMirrorAxis {None = "None", X = "X", XZ = "XZ", Z = "Z"}
export enum ClipboardRotation {None = "None", Rotate180 = "Rotate180", Rotate270 = "Rotate270", Rotate90 = "Rotate90"}
export enum CursorControlMode {Fixed = 3, Keyboard = 0, KeyboardAndMouse = 2, Mouse = 1}
export enum CursorTargetMode {Block = 0, Face = 1}
export enum EditorMode {Crosshair = "Crosshair", Tool = "Tool"}
export enum GraphicsSettingsProperty {ShowInvisibleBlocks = "ShowInvisibleBlocks"}
export enum PlaytestSessionResult {EditorSystemFailure = 7, InvalidLevelId = 8, InvalidSessionHandle = 1, OK = 0, PlayerNotFound = 9, ResponseTimeout = 10, SessionInfoNotFound = 2, TooManyPlayers = 3, UnspecifiedError = 11, UnsupportedScenario = 6, WorldExportBusy = 5, WorldExportFailed = 4}
export class ClipboardItem { private constructor(); readonly isEmpty: boolean; clear(): void; getPredictedWriteAsCompoundBlockVolume(location: _10.Vector3, options?: ClipboardWriteOptions): _10.CompoundBlockVolume; getPredictedWriteAsSelection(location: _10.Vector3, options?: ClipboardWriteOptions): Selection; getSize(): _10.Vector3; readFromSelection(selection: Selection): void; readFromWorld(from: _10.Vector3, to: _10.Vector3): void; writeToWorld(location: _10.Vector3, options?: ClipboardWriteOptions): boolean}
export class ClipboardManager { private constructor(); readonly clipboard: ClipboardItem; create(): ClipboardItem}
export class Cursor { private constructor(); readonly faceDirection: number; readonly isVisible: boolean; getPosition(): _10.Vector3; getProperties(): CursorProperties; hide(): void; moveBy(offset: _10.Vector3): _10.Vector3; resetToDefaultState(): void; setProperties(properties: CursorProperties): void; show(): void}
export class Extension { private constructor()}
export class ExtensionContext { private constructor(); readonly afterEvents: ExtensionContextAfterEvents; readonly clipboardManager: ClipboardManager; readonly cursor: Cursor; readonly extensionName: string; readonly player: _10.Player; readonly playtest: PlaytestManager; readonly selectionManager: SelectionManager; readonly settings: SettingsManager; readonly transactionManager: TransactionManager}
export class ExtensionContextAfterEvents { private constructor(); readonly modeChange: ModeChangeAfterEventSignal}
export class GraphicsSettings { private constructor(); get(property: GraphicsSettingsProperty): boolean | number | string; getAll(): Record<string,boolean | number | string>; set(property: GraphicsSettingsProperty, value: boolean | number | string): void; setAll(properties: Record<string,boolean | number | string>): void}
export class Logger { private constructor(); debug(message: string, properties?: LogProperties): void; error(message: string, properties?: LogProperties): void; info(message: string, properties?: LogProperties): void; warning(message: string, properties?: LogProperties): void}
export class MinecraftEditor { private constructor(); readonly log: Logger; readonly simulation: SimulationState; registerExtension_Internal(extensionName: string, activationFunction: (arg0: ExtensionContext)=>void, shutdownFunction: (arg0: ExtensionContext)=>void, options?: ExtensionOptionalParameters): Extension}
export class ModeChangeAfterEvent { private constructor(); readonly mode: EditorMode}
export class ModeChangeAfterEventSignal { private constructor(); subscribe(callback: (arg0: ModeChangeAfterEvent)=>void): (arg0: ModeChangeAfterEvent)=>void; unsubscribe(callback: (arg0: ModeChangeAfterEvent)=>void): void}
export class PlaytestManager { private constructor(); beginPlaytest(options: PlaytestGameOptions): Promise<PlaytestSessionResult>; getPlaytestSessionAvailability(): PlaytestSessionResult}
export class Selection { private constructor(); readonly isEmpty: boolean; visible: boolean; clear(): void; getBlockLocationIterator(): _10.BlockLocationIterator; getBoundingBox(): _10.BoundingBox; getFillColor(): _10.RGBA; getOutlineColor(): _10.RGBA; getVolumeOrigin(): _10.Vector3; moveBy(delta: _10.Vector3): _10.Vector3; moveTo(location: _10.Vector3): _10.Vector3; peekLastVolume(forceRelativity?: _10.CompoundBlockVolumePositionRelativity): _10.CompoundBlockVolumeItem; popVolume(): void; pushVolume(item: _10.CompoundBlockVolumeItem): void; set(other: _10.CompoundBlockVolume | Selection): void; setFillColor(color: _10.RGBA): void; setOutlineColor(color: _10.RGBA): void}
export class SelectionManager { private constructor(); readonly selection: Selection; create(): Selection}
export class SettingsManager { private constructor(); readonly graphics: GraphicsSettings}
export class SimulationState { private constructor(); isPaused(): boolean; setPaused(isPaused: boolean): void}
export class TransactionManager { private constructor(); commitOpenTransaction(): boolean; commitTrackedChanges(): number; discardOpenTransaction(): boolean; discardTrackedChanges(): number; openTransaction(name: string): boolean; redo(): void; redoSize(): number; trackBlockChangeArea(from: _10.Vector3, to: _10.Vector3): boolean; trackBlockChangeCompoundBlockVolume(compoundBlockVolume: _10.CompoundBlockVolume): boolean; trackBlockChangeList(locations: _10.Vector3[]): boolean; trackBlockChangeSelection(selection: Selection): boolean; undo(): void; undoSize(): number}
export interface ClipboardWriteOptions {anchor?: _10.Vector3, mirror?: ClipboardMirrorAxis, offset?: _10.Vector3, rotation?: ClipboardRotation}
export interface CursorProperties {controlMode?: CursorControlMode, fixedModeDistance?: number, outlineColor?: _10.RGBA, targetMode?: CursorTargetMode, visible?: boolean}
export interface ExtensionOptionalParameters {description?: string, notes?: string}
export interface LogProperties {player?: _10.Player, tags?: string[]}
export interface PlaytestGameOptions {alwaysDay?: boolean, difficulty?: _10.Difficulty, disableWeather?: boolean, gameMode?: _10.GameMode, showCoordinates?: boolean, spawnPosition?: _10.Vector3, timeOfDay?: number}
export const editor: MinecraftEditor;