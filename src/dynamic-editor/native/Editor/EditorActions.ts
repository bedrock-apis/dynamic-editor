import { 
    ActionType, EditorInputContext, IPacket, IUniqueObject, InputModifier, MouseInteractionType,
    MouseInteractions, KeyboardKey, MouseAction, PublicEvent,
    ServerActionEventType, TriggerEvent, UNIQUE_SYMBOL 
} from "dynamic-editor/core/index";
import { Player, Vector3 } from "@minecraft/server";
import { INIT_FLAG, IUpdateable, PacketBuilder,REMOVE_FLAG, ServerActionEventPacket, UPDATE_FLAG, UniquePostable } from "../Packets";
import { ACTION_RETURNER, IActionLike } from "../Controls/index";
import { PlayerDisplayManager } from "./EditorDisplayManager";


export class Action<AType extends ActionType = ActionType.NoArgsAction> extends UniquePostable<ServerActionEventPacket> implements IActionLike, IUpdateable{
    protected packetConstructor: new (data: any) => ServerActionEventPacket = ServerActionEventPacket;
    [UNIQUE_SYMBOL](d: PlayerDisplayManager){
        return d.addReverses(this, "action-");
    }
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
    get [ACTION_RETURNER](){return this};
    protected getMainPacketData(flags: number, packets: IPacket[]): any {
        const data = super.getMainPacketData(flags, packets);
        data.actionType = this.actionType;
        return data;
    }
    execute(payload: AType extends ActionType.MouseRayCastAction?MouseRayCastPayload:NoArgsPayload){
        TriggerEvent(this.onActionExecute,payload);
    }
    *displayInitPackets(): Generator<IPacket,any,any>{ yield * super.getPackets(INIT_FLAG); }
    *displayDisposePackets(): Generator<IPacket>{ yield * super.getPackets(REMOVE_FLAG);}
    *displayUpdatePackets(): Generator<IPacket>{yield * super.getPackets(UPDATE_FLAG);}
}
export class ControlBindedAction extends Action<ActionType.NoArgsAction>{
    readonly control;
    constructor(control: IUniqueObject){
        super(ActionType.NoArgsAction);
        this.control = control;
    }
    *displayInitPackets(){
        yield* super.displayInitPackets();
        yield PacketBuilder.BindActionToControl(this,this.control);
    }
    *displayDisposePackets(){
        yield PacketBuilder.UnbindActionToControl(this,this.control);
        yield* super.displayDisposePackets();
    }
}
export class KeyInputAction extends Action<ActionType.NoArgsAction>{
    readonly context;
    readonly button;
    readonly inputModifier;
    constructor(context: IUniqueObject | EditorInputContext,button: KeyboardKey,inputModifier: InputModifier){
        super(ActionType.NoArgsAction);
        this.context = context;
        this.button = button;
        this.inputModifier = inputModifier;
    }
    *displayInitPackets(){
        yield* super.displayInitPackets();
        yield PacketBuilder.BindKeyInputActionToContext(this,this.context,this.button,this.inputModifier);
    }
    *displayDisposePackets(){
        yield PacketBuilder.UnbindInputActionToContext(this,this.context);
        yield* super.displayDisposePackets();
    }
}
export class MouseInputAction extends Action<ActionType.MouseRayCastAction>{
    readonly context;
    readonly mouseAction;
    constructor(context: IUniqueObject, mouseAction: MouseAction){
        super(ActionType.MouseRayCastAction);
        this.context = context;
        this.mouseAction = mouseAction;
    }
    *displayInitPackets(){
        yield* super.displayInitPackets();
        yield PacketBuilder.BindMouseInputActionToContext(this,this.context,this.mouseAction);
    }
    *displayDisposePackets(){
        yield PacketBuilder.UnbindInputActionToContext(this,this.context);
        yield* super.displayDisposePackets();
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
    readonly actionType: MouseInteractions;
    readonly hasCtrlModifier: boolean;
    readonly hasAltModifier: boolean;
    readonly hasShiftModifier: boolean;
    readonly inputType: MouseInteractionType;
    get block(){return this.dimension.getBlock(this.blockLocation); }
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
        this.actionType = mouseAction as MouseInteractions;
        this.inputType = inputType as MouseInteractionType;
    }
}
export const PayloadLoaders = new Map<ActionType, typeof PayloadLoader>();
PayloadLoaders.set(ActionType.NoArgsAction,NoArgsPayload);
PayloadLoaders.set(ActionType.MouseRayCastAction,MouseRayCastPayload);