import { Client } from "./Client";

/**@beta */
export class PublicEvent<args extends any[]> {
    private constructor();
    /**
     * Subscribes to the event signal.
     * @template  k - The type of the event handler function.
     * @param method - The event handler function to subscribe.
     * @returns The subscribed event handler function.
     */
    subscribe<M extends (...params: args)=>void>(method: M): M
    /**
     * Unsubscribes from the event signal.
     * @template k - The type of the event handler function.
     * @param method - The event handler function to unsubscribe.
     * @returns The unsubscribed event handler function.
     */
    unsubscribe<M extends (...params: args)=>void>(method: M): M
}
/**@beta */
//@ts-ignore
export class ClientReadyEvent extends PublicEvent<[{readonly client: Client}]>{
    private constructor();
}