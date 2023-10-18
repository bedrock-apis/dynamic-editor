import { ClientReadyEvent } from "./PublicEvents";

/**@public*/
export class Editor{
    private constructor();
    readonly events: EditorEvents
}
/**@public */
export class EditorEvents{
    private constructor();
    readonly clientReady: ClientReadyEvent
}