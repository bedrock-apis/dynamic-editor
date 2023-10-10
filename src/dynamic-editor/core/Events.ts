import { core } from "./Base";
import { NoConstructor } from "./Errors";

/**
 * Represents an event signal.
 * @template - The types of the arguments passed to the event handlers.
 */
type EventType<R extends any[]> = NativeEvent<R> | PublicEvent<R>;
const sessions = new WeakMap<NativeEvent<any> | PublicEvent<any>,Set<(...params: any)=>void>>();
export class NativeEvent<args extends any[]>{
    constructor(){sessions.set(this,new Set());}
    /**
     * Triggers the event signal.
     * @param params - The arguments to pass to the event handlers.
     * @returns A promise that resolves with the number of successful event handlers.
     */
    async trigger(...params: args) {
        if(sessions.has(this)){
            const promises: Promise<unknown>[] = [];
            sessions.get(this)?.forEach((method)=>{
                promises.push((async ()=>method(...params))().catch(e=>console.error(e,e.stack)));
            });
            await Promise.all(promises);
        }
    }
    /**
     * Subscribes to the event signal.
     * @template  k - The type of the event handler function.
     * @param method - The event handler function to subscribe.
     * @returns The subscribed event handler function.
     */
    subscribe<M extends (...params: args)=>void>(method: M): M {
        const t = typeof method;
        if(t !== "function") throw new TypeError(`Expected a function, but got ${t}.`);
        if(sessions.has(this)) {
            const set: Set<any> = sessions.get(this) as any;
            if(!set.has(method)) set.add(method);
        }
        return method;
    }

    /**
     * Unsubscribes from the event signal.
     * @template k - The type of the event handler function.
     * @param method - The event handler function to unsubscribe.
     * @returns The unsubscribed event handler function.
     */
    unsubscribe<M extends (...params: args)=>void>(method: M): M {
        const t = typeof method;
        if(t !== "function") throw new TypeError(`Expected a function, but got ${t}.`);
        if(sessions.has(this)) sessions.get(this)?.delete(method);
        return method;
    }
}
export async function TriggerEvent<R extends any[]>(event: NativeEvent<R> | PublicEvent<R>,...params: R){
    if(sessions.has(event)){
        const promises: Promise<unknown>[] = [];
        sessions.get(event)?.forEach((method)=>{
            promises.push((async ()=>method(...params as any))().catch(e=>console.error(e,e.stack)));
        });
        await Promise.all(promises);
    }
}
/**@public */
export class PublicEvent<args extends any[]>{
    protected constructor(){
        if(!core.isNativeCall) throw new TypeError(NoConstructor + new.target.name);
        sessions.set(this,new Set());
    }

    /**
     * Subscribes to the event signal.
     * @template  k - The type of the event handler function.
     * @param method - The event handler function to subscribe.
     * @returns The subscribed event handler function.
     */
    subscribe<M extends (...params: args)=>void>(method: M): M {
        const t = typeof method;
        if(t !== "function") throw new TypeError(`Expected a function, but got ${t}.`);
        if(sessions.has(this)) {
            const set: Set<any> = sessions.get(this) as any;
            if(!set.has(method)) set.add(method);
        }
        return method;
    }

    /**
     * Unsubscribes from the event signal.
     * @template k - The type of the event handler function.
     * @param method - The event handler function to unsubscribe.
     * @returns The unsubscribed event handler function.
     */
    unsubscribe<M extends (...params: args)=>void>(method: M): M {
        const t = typeof method;
        if(t !== "function") throw new TypeError(`Expected a function, but got ${t}.`);
        if(sessions.has(this)) sessions.get(this)?.delete(method);
        return method;
    }
}