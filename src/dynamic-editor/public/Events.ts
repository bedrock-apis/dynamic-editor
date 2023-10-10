import { NoConstructor, PublicEvent, core, TriggerEvent } from "../core/index";
import {clientReady} from "../private/Events";
/**@beta */
export interface ClientReadyEventData{
    readonly client: string
}

/**@beta */
export class ClientReadyEvent extends PublicEvent<[ClientReadyEventData]>{
    private constructor(){
        super();
        clientReady.subscribe(({client})=>TriggerEvent(this,{client}));
    }
}



/**@public */
export class EditorEvents{
    /**@beta */
    readonly clientReady: ClientReadyEvent;
    private constructor(){
        if(!core.isNativeCall) throw new TypeError(NoConstructor + EditorEvents.name);
        //@ts-ignore
        this.clientReady = new ClientReadyEvent();
    }
}