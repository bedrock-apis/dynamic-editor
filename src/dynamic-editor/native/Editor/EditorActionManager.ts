import { ActionType, InternalInputTypes, InternalInteractionTypes, MouseAction, NativeEvent, ServerActionEventType } from "dynamic-editor/core";
import { UniquePostable } from "../Controls/index";
import { Player, Vector3 } from "@minecraft/server";

export const PayloadLoaders = new Map<ActionType, typeof PayloadLoader>();
export class Action extends UniquePostable{
    protected readonly REMOVE_TYPE = ServerActionEventType.ReleaseAction;
    protected readonly UPDATE_TYPE = ServerActionEventType.CreateAction;
}
export class PayloadLoader{
    readonly type: ActionType;
    readonly player;
    readonly dimension;
    constructor(player: Player, data: any){
        this.player = player;
        this.dimension = player.dimension;
        this.type = data.type as ActionType;
    }
}
export class NoArgsPayload extends PayloadLoader{}
export class MouseRayCastPayload extends PayloadLoader{
    readonly location: Vector3;
    readonly direction: Vector3;
    readonly blockLocation: Vector3;
    readonly rayHit: boolean;
    readonly actionType: InternalInteractionTypes;
    readonly hasCtrlModifier: boolean;
    readonly hasAltModifier: boolean;
    readonly hasShiftModifier: boolean;
    readonly inputType: InternalInputTypes;
    //@ts-ignore
    readonly get block(){return this.dimension.getBlock(this.blockLocation); }
    constructor(player: Player, data: any){
        super(player, data);
        const {location,direction,cursorBlockLocation,rayHit} = data.mouseRay;
        const {mouseAction,modifiers:{alt,ctrl,shift},inputType} = data.mouseProps;
        this.location = location;
        this.direction = direction;
        this.blockLocation = cursorBlockLocation;
        this.rayHit = rayHit;
        this.hasCtrlModifier = ctrl;
        this.hasAltModifier = alt;
        this.hasShiftModifier = shift;
        this.actionType = mouseAction as InternalInteractionTypes;
        this.inputType = inputType as InternalInputTypes;
    }
}
PayloadLoaders.set(ActionType.NoArgsAction,NoArgsPayload);
PayloadLoaders.set(ActionType.MouseRayCastAction,MouseRayCastPayload);