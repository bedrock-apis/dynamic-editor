import { 
    ActionType, InternalInputTypes,
    InternalInteractionTypes, PublicEvent,
    ServerActionEventType, TriggerEvent 
} from "dynamic-editor/core";
import { Player, Vector3 } from "@minecraft/server";
import { INIT_FLAG, PostActionPacket, REMOVE_FLAG, UPDATE_FLAG, UniquePostable } from "../Packets";


export class Action<AType extends ActionType = ActionType.NoArgsAction> extends UniquePostable<PostActionPacket>{
    packetConstructor: new (data: any) => PostActionPacket = PostActionPacket;
    protected readonly PACKET_TYPES = {
        [UPDATE_FLAG]: ServerActionEventType.CreateAction,
        [INIT_FLAG]: ServerActionEventType.CreateAction,
        [REMOVE_FLAG]: ServerActionEventType.ReleaseAction,
    };
    readonly actionType;
    readonly onActionExecute = new PublicEvent<[AType extends ActionType.MouseRayCastAction?MouseRayCastPayload:NoArgsPayload]>;
    constructor(type: AType){
        super();
        this.actionType = type;
    }
    protected getMainPacketData(flags?: number | undefined): any {
        const data = super.getMainPacketData(flags);
        data.actionType = this.actionType;
        return data;
    }
    execute(payload: AType extends ActionType.MouseRayCastAction?MouseRayCastPayload:NoArgsPayload){
        TriggerEvent(this.onActionExecute,payload);
    }
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
export const PayloadLoaders = new Map<ActionType, typeof PayloadLoader>();
PayloadLoaders.set(ActionType.NoArgsAction,NoArgsPayload);
PayloadLoaders.set(ActionType.MouseRayCastAction,MouseRayCastPayload);