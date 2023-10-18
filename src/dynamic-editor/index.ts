/*
import { Editor } from "./public_bin/Editor";

export { Editor, EditorEvents } from "./public_bin/Editor";
export { ClientReadyEvent } from "./public_bin/PublicEvents";*/
export { BuildInPane, RedirectDestination as Destination } from "./core/index";
export { EditorExtension } from "./native/Editor/index";
export { 
    ExtensionInitializeEvent, ExtensionInitializeEventData,
    ExtensionReadyEvent, ExtensionReadyEventData,
    ExtensionShutdownEvent, ExtensionShutdownEventData
} from "./native/Events";
/*
export const editor: Editor = CreateInstance(Editor,e);*/