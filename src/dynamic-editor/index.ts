/*
import { Editor } from "./public_bin/Editor";

export { Editor, EditorEvents } from "./public_bin/Editor";
export { ClientReadyEvent } from "./public_bin/PublicEvents";*/
import { RedirectDestination } from "./core/index";
export {BuildInPane} from "./core/index";
export const Destination: typeof RedirectDestination = RedirectDestination;
export { EditorExtension } from "./native/Editor/index";
export { 
    ExtensionInitializeEvent, ExtensionInitializeEventData,
    ExtensionReadyEvent, ExtensionReadyEventData,
    ExtensionShutdownEvent, ExtensionShutdownEventData
} from "./native/Events";
/*
export const editor: Editor = CreateInstance(Editor,e);*/