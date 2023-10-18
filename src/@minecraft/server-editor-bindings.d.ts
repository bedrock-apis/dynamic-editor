import * as _00 from '@minecraft/server';
/**@alpha */
export enum ClipboardMirrorAxis {None = "None", X = "X", XZ = "XZ", Z = "Z"}
/**@alpha */
export enum ClipboardRotation {None = "None", Rotate180 = "Rotate180", Rotate270 = "Rotate270", Rotate90 = "Rotate90"}
/**@alpha */
export enum CursorControlMode {Fixed = 3, Keyboard = 0, KeyboardAndMouse = 2, Mouse = 1}
/**@alpha */
export enum CursorTargetMode {Block = 0, Face = 1}
/**@alpha */
export class ClipboardItem { private constructor(); readonly isEmpty: number; clear(): void; getPredictedWriteAsCompoundBlockVolume(location: _00.Vector3, options?: ClipboardWriteOptions): _00.CompoundBlockVolume; getPredictedWriteAsSelection(location: _00.Vector3, options?: ClipboardWriteOptions): Selection; getSize(): _00.Vector3; readFromSelection(selection: Selection): void; readFromWorld(from: _00.Vector3, to: _00.Vector3): void; writeToWorld(location: _00.Vector3, options?: ClipboardWriteOptions): number}
/**@alpha */
export class ClipboardManager { private constructor(); readonly clipboard: ClipboardItem; create(): ClipboardItem}
/**@alpha */
export class Cursor { private constructor(); readonly faceDirection: number; readonly isVisible: number; getPosition(): _00.Vector3; getProperties(): CursorProperties; hide(): void; moveBy(offset: _00.Vector3): _00.Vector3; resetToDefaultState(): void; setProperties(properties: CursorProperties): void; show(): void}
/**@alpha */
export class Extension { private constructor()}
/**@alpha */
export class ExtensionContext { private constructor(); readonly clipboardManager: ClipboardManager; readonly cursor: Cursor; readonly extensionName: string; readonly player: _00.Player; readonly selectionManager: SelectionManager; readonly transactionManager: TransactionManager}
/**@alpha */
export class Logger { private constructor(); debug(message: string, properties?: LogProperties): void; error(message: string, properties?: LogProperties): void; info(message: string, properties?: LogProperties): void; warning(message: string, properties?: LogProperties): void}
/**@alpha */
export class MinecraftEditor { private constructor(); readonly log: Logger; registerExtension_Internal(extensionName: string, activationFunction: (arg0: ExtensionContext)=>void, shutdownFunction: (arg0: ExtensionContext)=>void, options?: ExtensionOptionalParameters): Extension}
/**@alpha */
export class Selection { private constructor(); readonly isEmpty: number; visible: number; clear(): void; getBlockLocationIterator(): _00.BlockLocationIterator; getBoundingBox(): _00.BoundingBox; getFillColor(): _00.RGBA; getOutlineColor(): _00.RGBA; getVolumeOrigin(): _00.Vector3; moveBy(delta: _00.Vector3): _00.Vector3; moveTo(location: _00.Vector3): _00.Vector3; peekLastVolume(forceRelativity?: _00.CompoundBlockVolumePositionRelativity): _00.CompoundBlockVolumeItem; popVolume(): void; pushVolume(item: _00.CompoundBlockVolumeItem): void; set(other: _00.CompoundBlockVolume | Selection): void; setFillColor(color: _00.RGBA): void; setOutlineColor(color: _00.RGBA): void}
/**@alpha */
export class SelectionManager { private constructor(); readonly selection: Selection; create(): Selection}
/**@alpha */
export class TransactionManager { private constructor(); commitOpenTransaction(): number; commitTrackedChanges(): number; discardOpenTransaction(): number; discardTrackedChanges(): number; openTransaction(name: string): number; redo(): void; redoSize(): number; trackBlockChangeArea(from: _00.Vector3, to: _00.Vector3): number; trackBlockChangeCompoundBlockVolume(compoundBlockVolume: _00.CompoundBlockVolume): number; trackBlockChangeList(locations: _00.Vector3[]): number; trackBlockChangeSelection(selection: Selection): number; undo(): void; undoSize(): number}
/**@alpha */
export interface ClipboardWriteOptions {anchor?: _00.Vector3, mirror?: ClipboardMirrorAxis, offset?: _00.Vector3, rotation?: ClipboardRotation}
/**@alpha */
export interface CursorProperties {controlMode?: CursorControlMode, fixedModeDistance?: number, outlineColor?: _00.RGBA, targetMode?: CursorTargetMode, visible?: number}
/**@public */
export interface ExtensionOptionalParameters {description?: string, notes?: string}
/**@alpha */
export interface LogProperties {player?: _00.Player, tags?: string[]}
/**@alpha */
export const editor: MinecraftEditor;