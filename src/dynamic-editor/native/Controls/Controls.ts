import { EditorControlManager } from "../Editor/EditorControlManager";
import { StatusBarItem } from "./Elements";
import { Control } from "./GeneralUI";

export class StatusBarControl extends Control<StatusBarItem>{
    constructor(manager: EditorControlManager){super(manager, StatusBarItem);}
}