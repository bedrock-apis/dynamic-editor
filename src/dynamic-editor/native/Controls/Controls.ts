import { EditorControlManager } from "../Editor/EditorControlManager";
import { MenuItem, StatusBarItem } from "./Elements";
import { Control } from "./General";

export class StatusBarControl extends Control<StatusBarItem>{
    protected constructor(manager: EditorControlManager){super(manager, StatusBarItem);}
}
export class MenuBarControl extends Control<MenuItem<any>>{
    protected constructor(manager: EditorControlManager){super(manager, MenuItem as any);}
    addItem(item: MenuItem<any>): boolean {
        if(typeof item._parent === "object") throw new ReferenceError("This item is already assigned as menu option");
        const hasBefore = super.hasItem(item);
        if(super.addItem(item) && !hasBefore){
            item._parent = (item._parent??0) + 1;
            return true;
        }
        return hasBefore;
    }
    removeItem(item: MenuItem<any>): boolean {
        if(super.removeItem(item)){
            item._parent--;
            if(item._parent <= 0) item._parent = undefined;
            return true;
        }
        return false;
    }
}