/**@public */
export enum RedirectDestination {
    Documentation = 1,
    Feedback = 2,
    PauseScreen = 3
}
export enum EditorInputContext {
    GlobalEditor = 'global.editor',
    GlobalToolMode = 'global.toolMode',
    Viewport = 'local.toolMode.viewport'
}
/**@public */
export enum BuildInPane {
    UISettings = 1,
    WelcomePage = 2,
    LogPanel = 3
}
export enum InternalPaneElementTypes {
    "String" = "editorUI:String",
    "Number" = "editorUI:Number",
    "Boolean" = "editorUI:Boolean",
    "Button" = "editorUI:Action",
    "Vector3" = "editorUI:Vec3",
    "Dropdown" = "editorUI:Dropdown",
    "BlockPicker" = "editorUI:BlockPicker",
    "Divider" = "editorUI:Divider",
    "SubPane" = "editorUI:SubPane"
}
export enum ButtonVariant {
    'secondary'='secondary',
    'primary'='primary',
    'destructive'='destructive',
    'hero'='hero'
}
export enum ActionType {
    NoArgsAction = "NoArgsAction",
    MouseRayCastAction = "MouseRayCastAction"
};
export enum MouseInteractionType {
    ButtonDown = 1,
    ButtonUp = 2,
    WheelDown = 3,
    WheelUp = 4,
    DragStart = 5,
    Draging = 6,
    DragStop = 7,
}
export enum MouseInteractions {
    LeftButton = 1,
    MiddleButton = 2,
    Scroll = 4 
}
export enum MouseAction {
    ButtonClick = 1,
    Wheel = 2,
    Drag = 3
}
export enum InputDevice {
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
/**
 * Keyboard key from @minecarft/server-editor
 */
export enum KeyboardKey {
    BACKSPACE = 8,
    TAB = 9,
    ENTER = 13,
    SHIFT = 16,
    CTRL = 17,
    ALT = 18,
    CAPS_LOCK = 20,
    ESCAPE = 27,
    SPACE = 32,
    PAGE_UP = 33,
    PAGE_DOWN = 34,
    END = 35,
    HOME = 36,
    LEFT = 37,
    UP = 38,
    RIGHT = 39,
    DOWN = 40,
    PRINT_SCREEN = 44,
    INSERT = 45,
    DELETE = 46,
    KEY_0 = 48,
    KEY_1 = 49,
    KEY_2 = 50,
    KEY_3 = 51,
    KEY_4 = 52,
    KEY_5 = 53,
    KEY_6 = 54,
    KEY_7 = 55,
    KEY_8 = 56,
    KEY_9 = 57,
    KEY_A = 65,
    KEY_B = 66,
    KEY_C = 67,
    KEY_D = 68,
    KEY_E = 69,
    KEY_F = 70,
    KEY_G = 71,
    KEY_H = 72,
    KEY_I = 73,
    KEY_J = 74,
    KEY_K = 75,
    KEY_L = 76,
    KEY_M = 77,
    KEY_N = 78,
    KEY_O = 79,
    KEY_P = 80,
    KEY_Q = 81,
    KEY_R = 82,
    KEY_S = 83,
    KEY_T = 84,
    KEY_U = 85,
    KEY_V = 86,
    KEY_W = 87,
    KEY_X = 88,
    KEY_Y = 89,
    KEY_Z = 90,
    NUMPAD_0 = 96,
    NUMPAD_1 = 97,
    NUMPAD_2 = 98,
    NUMPAD_3 = 99,
    NUMPAD_4 = 100,
    NUMPAD_5 = 101,
    NUMPAD_6 = 102,
    NUMPAD_7 = 103,
    NUMPAD_8 = 104,
    NUMPAD_9 = 105,
    NUMPAD_MULTIPLY = 106,
    NUMPAD_ADD = 107,
    NUMPAD_SEPARATOR = 108,
    NUMPAD_SUBTRACT = 109,
    NUMPAD_DECIMAL = 110,
    NUMPAD_DIVIDE = 111,
    F1 = 112,
    F2 = 113,
    F3 = 114,
    F4 = 115,
    F5 = 116,
    F6 = 117,
    F7 = 118,
    F8 = 119,
    F9 = 120,
    F10 = 121,
    F11 = 122,
    F12 = 123,
    COMMA = 188,
    PERIOD = 190,
    SLASH = 191,
    BACK_QUOTE = 192,
    BRACKET_OPEN = 219,
    BACK_SLASH = 220,
    BRACKET_CLOSE = 221,
    QUOTE = 222,
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
    UnbindUIEvent = 12, //lol
    UpdatePaneControl = 13, //paneId, id, ...
    ReleasePaneControl = 14,
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