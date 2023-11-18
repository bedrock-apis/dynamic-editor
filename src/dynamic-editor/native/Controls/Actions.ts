import { EditorInputContext, IUniqueObject, InputModifier, KeyboardKey, MouseAction } from "dynamic-editor/core/index";
import { KeyInputAction, MouseInputAction, MouseRayCastPayload, NoArgsPayload } from "../Editor/EditorActions";
import { ActionBasedEvent } from "./General";

export class KeyInputActionsEvent extends ActionBasedEvent<KeyInputAction,IUniqueObject | EditorInputContext>{
    constructor(conextId: IUniqueObject | EditorInputContext){super(conextId);}
    subscribe<M extends (payload: NoArgsPayload, key: KeyboardKey, inputModifier: InputModifier) => void>(m: M, keyButton: KeyboardKey, inputModifier: InputModifier = InputModifier.Any): M {
        if(this._actions.has(m)) return m;
        const action = new KeyInputAction(this._context,keyButton,inputModifier);
        const mA = action.onActionExecute.subscribe((payload)=>{
            m(payload,keyButton,inputModifier);
        });
        this._actions.set(m,{action,ma:mA});
        super._subUpdate(action);
        return m;
    }
    unsubscribe<M extends (payload: NoArgsPayload, key: KeyboardKey, inputModifier: InputModifier) => void>(m: M): M {
        if(!this._actions.has(m)) return m;
        const {action,ma} = this._actions.get(m) as any;
        action.onActionExecute.unsubscribe(ma);
        this._actions.delete(m);
        super._unsubUpdate(action);
        return m;
    }
}
export class MouseInputActionsEvent extends ActionBasedEvent<MouseInputAction,IUniqueObject>{
    constructor(conextId: IUniqueObject){super(conextId);}
    subscribe<M extends (payload: MouseRayCastPayload) => void>(m: M, mouseAction: MouseAction): M {
        if(this._actions.has(m)) return m;
        const action = new MouseInputAction(this._context,mouseAction);
        const mA = action.onActionExecute.subscribe((payload)=>{
            m(payload);
        });
        this._actions.set(m,{action,ma:mA});
        super._subUpdate(action);
        return m;
    }
    unsubscribe<M extends (payload: MouseRayCastPayload) => void>(m: M): M {
        if(!this._actions.has(m)) return m;
        const {action,ma} = this._actions.get(m) as any;
        action.onActionExecute.unsubscribe(ma);
        this._actions.delete(m);
        super._unsubUpdate(action);
        return m;
    }
}