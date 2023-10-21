import { ActionType, NativeEvent } from "dynamic-editor/core";
import { EditorControlManager } from "../Editor/EditorControlManager";
import { StatusBarItem } from "./Elements";
import { Control, UniquePostable } from "./GeneralUI";

export class StatusBarControl extends Control<StatusBarItem>{
    constructor(manager: EditorControlManager){super(manager, StatusBarItem);}
}