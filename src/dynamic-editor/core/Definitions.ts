/**@public */
export enum RedirectDestination {
    Documentation = 1,
    Feedback = 2,
    PauseScreen = 3
}
export declare enum EditorInputContext {
    GlobalEditor = 'global.editor',
    GlobalToolMode = 'global.toolMode',
    Viewport = 'local.toolMode.viewport',
}
/**@public */
export enum BuildInPane {
    UISettings = 1,
    WelcomePage = 2,
    LogPanel = 3
}
export enum ActionType {
    NoArgsAction = "NoArgsAction",
    MouseRayCastAction = "MouseRayCastAction"
};
export enum InternalInputTypes {
    ButtonDown = 1,
    ButtonUp = 2,
    WheelDown = 3,
    WheelUo = 4,
    DragStart = 5,
    Draging = 6,
    DragStop = 7,
}
export enum InternalInteractionTypes {
    LeftButton = 1,
    MiddleButton = 2,
    Scroll = 4 
}
export enum MouseAction {
    Button = 1,
    Wheel = 2,
    Drag = 3
}
export enum InputDivice {
    KeyBoard = 1,
    Mouse = 2
};
export enum InputModifier {
    Unused = 0,
    None = 1,
    Alt = 2,
    Control = 4,
    Shift = 8,
    Any = 15,
}
export enum StatusBarItemAlignment{
    Right = 0,
    Left = 1
}
////////////////////////////////////////////////////////////
/////////////////////////////////// POST
////////////////////////////////////////////////////////////
export enum ServerUXEventType {
    UpdatePropertyPane = 1, 
    ReleasePropertyPane = 2,
    UpdateItemMenu = 3, //[parentId] name: string, enabled, visible, displayStringLocId, shortcut
    ReleaseItemMenu = 4,
    UpdateStatusBarItem = 5, //aligment: 0, size: number, id: uuid, enabled: boolien, visible: boolien, text: string
    ReleaseStatusBarItem = 6,
    CreateTool = 7,  //id: uuid, enabled: boolien, visible: boolien, icon: "", toolTipData:{titleString,descriptionString , ..LocId}
    ReleaseTool = 8,
    SetActiveTool = 9,
    ReleaseToolRail = 10,
    BindUIEvent = 11, //controlId actionId
    UnbindUIEvent = 12,
    RedirectToDestination = 15,
    UpdateBuildInPanes = 18
}
export enum ServerActionEventType {
    CreateAction = 1, //actionType: ActionTypes, id: actionId
    ReleaseAction = 2
}
export enum ServerInputBindingEventType {
    KeyActionBinding = 1, //inputDivice: InputDivices-1, contextId: toolId | global.editor ..., actionId: actionId, [ mouseAction: MouseActions ]
    MouseActionBinding = 2, //inputDivice: InputDivices-2, contextId: toolId | global.editor..., actionId: actionId, [modifier: InputModifier] [button: number] [inputType: ]
    UnregistryBinding = 3 //inputDivice: InputDivices-2-1, contextId: toolId | global.editor ..., actionId: actionId
}
export enum PostEventId {
    "Editor::ServerUXEvents" = "Editor::ServerUXEvents",
    "Editor::ServerInputBindingEvents" = "Editor::ServerInputBindingEvents",
    "Editor::ServerActionEvents" = "Editor::ServerActionEvents",
};
export enum PostEventName {
    "ServerUXEvents" = PostEventId["Editor::ServerUXEvents"],
    "ServerActionEvents" = PostEventId["Editor::ServerActionEvents"],
    "ServerInputBindingEvents" = PostEventId["Editor::ServerInputBindingEvents"]
}
export const PostEventEnum = {
    [PostEventId["Editor::ServerUXEvents"]]: ServerUXEventType,
    [PostEventId["Editor::ServerInputBindingEvents"]]: ServerInputBindingEventType,
    [PostEventId["Editor::ServerActionEvents"]]: ServerActionEventType,
}



////////////////////////////////////////////////////////////
/////////////////////////////////// RECEIVE
////////////////////////////////////////////////////////////

export enum ReceiveActionEventType {
    ActionExecuted = 1
};
export enum ReceiveLifecycleEventType {
    PlayerReady = 1
};
export enum ReceiveUXEventType {
    ProperyChanged = 1,
    ToolActivate = 2,
    PaneVisisbilityChanged = 3,
    PaneModeChanged = 4
};
export enum ReceiveEventId {
    "Editor::ClientLifecycle" = "Editor::ClientLifecycle",
    "Editor::ClientUXEvents" = "Editor::ClientUXEvents",
    "Editor::ClientActionEvents" = "Editor::ClientActionEvents"
};
export enum ReceiveEventName {
    ClientLifecycle = ReceiveEventId["Editor::ClientLifecycle"],
    ClientUXEvents = ReceiveEventId["Editor::ClientUXEvents"],
    ClientActionEvents =  ReceiveEventId["Editor::ClientActionEvents"]
};
export const ReceiveEventEnum = {
    [ReceiveEventId["Editor::ClientActionEvents"]]: ReceiveActionEventType,
    [ReceiveEventId["Editor::ClientLifecycle"]]: ReceiveLifecycleEventType,
    [ReceiveEventId["Editor::ClientUXEvents"]]: ReceiveUXEventType,
}