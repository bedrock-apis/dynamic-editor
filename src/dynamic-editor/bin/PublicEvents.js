import {CreateClass} from "../core/APIBuilder";

const {constructor: PublicEvent} = CreateClass("PublicEvent",{
    subscribe(cache,method){return cache.subscribe(method);},
    unsubscribe(cache,method){return cache.unsubscribe(method);}
});
const {constructor: ClientReadyEvent} = CreateClass("ClientReadyEvent",{},null,PublicEvent);

export {PublicEvent,ClientReadyEvent};