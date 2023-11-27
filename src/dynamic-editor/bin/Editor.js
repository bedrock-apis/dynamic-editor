import {CreateClass} from "../core/APIBuilder";

const {constructor: Editor} = CreateClass("Editor",{
    get events(){return super.getCache(this)._public_events;}
});
const {constructor: EditorEvents} = CreateClass("EditorEvents",{
    get clientReady(){return super.getCache(this)._public_clientReady;}
});
export {Editor, EditorEvents};
