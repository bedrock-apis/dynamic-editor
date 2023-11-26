import { IPacket, NoConstructor, ServerUXEventType, TriggerEvent, core } from "dynamic-editor/core";
import { EditorControlManager } from "../Editor/EditorControlManager";
import { Displayable, INIT_FLAG, REMOVE_FLAG, ServerUXEventPacket, UPDATE_FLAG } from "../Packets";
import { IUnkownTool, MenuItem, StatusBarItem, TOOL_OBJECT_TYPE, Tool } from "./Elements";
import { OBJECT_TYPE } from "./Base";
import { EditorPane } from "./Panes";

const VALID_ITEM: unique symbol = Symbol("VALID_ITEM");
const VALID_MENU_ITEM: unique symbol = Symbol("VALID_MENU_ITEM");
const VALID_STATUS_ITEM: unique symbol = Symbol("VALID_STATUS_ITEM");
const VALID_TOOL_ITEM: unique symbol = Symbol("VALID_TOOL_ITEM");
const VALID_PANE_ITEM: unique symbol = Symbol("VALID_PANE_ITEM");
//@ts-ignore
MenuItem.prototype[VALID_ITEM] = VALID_MENU_ITEM;
//@ts-ignore
StatusBarItem.prototype[VALID_ITEM] = VALID_STATUS_ITEM;
//@ts-ignore
Tool.prototype[VALID_ITEM] = VALID_TOOL_ITEM;
//@ts-ignore 
EditorPane.prototype[VALID_ITEM] = VALID_PANE_ITEM;
export const KNOWN_TOOLS = new WeakSet();
export class ToolView extends Displayable<IPacket>{
    protected readonly PACKET_TYPES = { 
        [UPDATE_FLAG]: ServerUXEventType.SetActiveTool,
        [REMOVE_FLAG]: ServerUXEventType.ReleaseToolRail,
        [INIT_FLAG]: ServerUXEventType.SetActiveTool
    };
    protected readonly _MenuItemEvenHandler = new Map<MenuItem<any>,any>;
    protected readonly _StatusItemEvenHandler = new Map<StatusBarItem,any>;
    protected readonly _ToolEvenHandler = new Map<Tool,any>;
    protected readonly _EditorPaneEvenHandler = new Map<EditorPane,any>;
    protected readonly _manager;
    protected _visible = true;
    protected _enabled = true;
    protected _activeTool: any = null;
    get registeredTools(){return this._ToolEvenHandler.size;}
    get registeredMenuItems(){return this._MenuItemEvenHandler.size;}
    get registeredStatusBarItems(){return this._StatusItemEvenHandler.size;}
    get registeredEditorPanes(){return this._EditorPaneEvenHandler.size;}
    protected constructor(manager: EditorControlManager){
        if(!core.isNativeCall) throw new ReferenceError(NoConstructor + ToolView.name);
        super(ServerUXEventPacket);
        this._manager = manager;
        manager.context.display?.onToolAtivate.subscribe(({tool})=>{console.warn("t");this._activeTool = tool;});
    }
    protected _registry(item: EditorPane | MenuItem | StatusBarItem | Tool, map: Map<any,any>){
        TriggerEvent(this.onUpdate,item,INIT_FLAG);
        const method = item.onUpdate.subscribe((...e)=>TriggerEvent(this.onUpdate,...e));
        map.set(item,method);
        return true;
    }
    protected _unregistry(item:  EditorPane | MenuItem | StatusBarItem | Tool, map: Map<any,any>){
        if(map.has(item)) {
            TriggerEvent(this.onUpdate,item,REMOVE_FLAG);
            item.onUpdate.unsubscribe(map.get(item));
            map.delete(item);
            return true;
        };
        return false;
    }
    addEditorPanes(...panes: EditorPane[]){
        for (const p of panes) this.addEditorPane(p);
        return this;
    }
    addTools(...tools: Tool[]){
        for (const p of tools) this.addTool(p);
        return this;
    }
    addMenuItems(...items:  MenuItem<any>[]){
        for (const p of items) this.addMenuItem(p);
        return this;
    }
    addStatusBarItems(...items:  StatusBarItem[]){
        for (const p of items) this.addStatusBarItem(p);
        return this;
    }
    setActiveTool(item: Tool | null){
        this._activeTool = item;
        TriggerEvent(this.onUpdate,this,UPDATE_FLAG);
    }
    getActiveTool(): Tool | IUnkownTool | null{
        return this._activeTool;
    }
    addMenuItem(item: MenuItem<any>){
        if(this._MenuItemEvenHandler.has(item)) return true;
        if((item as any)?.[VALID_ITEM] !== VALID_MENU_ITEM) throw new TypeError("Item is not type of MenuItem");
        if(typeof item._parent === "object") throw new ReferenceError("This item is already assigned as menu option");
        const hasBefore = this._MenuItemEvenHandler.has(item);
        if(this._registry(item, this._MenuItemEvenHandler) && !hasBefore){
            item._parent = (item._parent??0) + 1;
            return true;
        }
        return hasBefore;
    }
    addStatusBarItem(item: StatusBarItem){
        if(this._StatusItemEvenHandler.has(item)) return true;
        if((item as any)?.[VALID_ITEM] !== VALID_STATUS_ITEM) throw new TypeError("Item is not type of StatusBarItem");
        return this._registry(item, this._StatusItemEvenHandler);
    }
    addTool(item: Tool){
        if(this._ToolEvenHandler.has(item)) return true;
        if((item as any)?.[VALID_ITEM] !== VALID_TOOL_ITEM) throw new TypeError("Item is not type of Tool");
        if(KNOWN_TOOLS.has(item)) throw new ReferenceError("This tool is already used by different person.");
        KNOWN_TOOLS.add(item);
        return this._registry(item, this._ToolEvenHandler);
    }
    addEditorPane(item: EditorPane){
        if(this._EditorPaneEvenHandler.has(item)) return true;
        if((item as any)?.[VALID_ITEM] !== VALID_PANE_ITEM) throw new TypeError("Item is not type of EditorPane");
        if(typeof (item as any)._parentPane === "object") throw new TypeError("This Pane is already registred or used as subpane.");
        (item as any)._parentPane = null;
        return this._registry(item, this._EditorPaneEvenHandler);
    }
    removeItem(item:  MenuItem<any> | StatusBarItem | Tool | EditorPane){
        const m = (item as any)?.[VALID_ITEM];
        if(!m) return false;
        switch(m){
            case VALID_MENU_ITEM:
                if(this._unregistry(item,this._MenuItemEvenHandler)){
                    let i = item as any;
                    i._parent--;
                    if(i._parent <= 0) i._parent = undefined;
                    return true;
                }
                return false;
            case VALID_STATUS_ITEM: return this._unregistry(item,this._StatusItemEvenHandler);
            case VALID_TOOL_ITEM: 
                if(this._ToolEvenHandler.has(item as Tool)) KNOWN_TOOLS.delete(item);
                return this._unregistry(item,this._ToolEvenHandler);
            case VALID_PANE_ITEM:
                if(this._EditorPaneEvenHandler.has(item as EditorPane)) (item as any)._parentPane = undefined;
                return this._unregistry(item, this._EditorPaneEvenHandler);
            default: return false;
        }
    }
    clearAll(){
        for (const c of this.getStatusBarItems()) this.removeItem(c);
        for (const c of this.getMenuItems()) this.removeItem(c);
        for (const c of this.getEditorPanes()) this.removeItem(c);
        for (const c of this.getTools()) this.removeItem(c);
    }
    hasTool(item: any){return this._ToolEvenHandler.has(item);}
    hasMenuItem(item: any){return this._MenuItemEvenHandler.has(item);}
    hasEditorPane(item: any){return this._EditorPaneEvenHandler.has(item);}
    hasStatusBarItem(item: any){return this._StatusItemEvenHandler.has(item);}
    getMenuItems(){return this._MenuItemEvenHandler.keys();}
    getStatusBarItems(){return this._StatusItemEvenHandler.keys();}
    getTools(){return this._ToolEvenHandler.keys();}
    getEditorPanes(){return this._EditorPaneEvenHandler.keys();}
    /**@deprecated This is feature is incomplete, it can be set but could be desynced by other addons */
    setToolBarVisibility(visibility: boolean){
        this._visible = visibility;
        TriggerEvent(this.onUpdate,this,UPDATE_FLAG);
        return this;
    }
    /**@deprecated This is feature is incomplete, it can be set but could be desynced by other addons */
    setToolBarMode(enabled: boolean){
        this._enabled = enabled;
        TriggerEvent(this.onUpdate,this,UPDATE_FLAG);
        return this;
    }
    /**@deprecated Internal function */
    *displayInitPackets(){
        yield * super.displayInitPackets();
        for (const key of this._StatusItemEvenHandler.keys()) yield * key.displayInitPackets();
        for (const key of this._MenuItemEvenHandler.keys()) yield * key.displayInitPackets();
        for (const key of this._ToolEvenHandler.keys()) yield * key.displayInitPackets();
        for (const key of this._EditorPaneEvenHandler.keys()) yield * key.displayInitPackets();
    }
    /**@deprecated Internal function */
    *displayDisposePackets(){
        for (const key of this._ToolEvenHandler.keys()) {
            key.onUpdate.unsubscribe(this._ToolEvenHandler.get(key));
            yield * key.displayDisposePackets();
        }
        for (const key of this._MenuItemEvenHandler.keys()) {
            key.onUpdate.unsubscribe(this._MenuItemEvenHandler.get(key));
            yield * key.displayDisposePackets();
        }
        for (const key of this._StatusItemEvenHandler.keys()) {
            key.onUpdate.unsubscribe(this._StatusItemEvenHandler.get(key));
            yield * key.displayDisposePackets();
        }
        for (const key of this._EditorPaneEvenHandler.keys()) {
            key.onUpdate.unsubscribe(this._EditorPaneEvenHandler.get(key));
            yield * key.displayDisposePackets();
        }
        this._ToolEvenHandler.clear();
        this._MenuItemEvenHandler.clear();
        this._StatusItemEvenHandler.clear();
        this._EditorPaneEvenHandler.clear();
        yield * super.displayDisposePackets();
    }
    protected getMainPacketData(flags?: number | undefined) {
        const data = {visible:this._visible,enabled:this._enabled} as any;
        if(this._activeTool === null) data.selectedOptionId = "";
        else if(this._activeTool[OBJECT_TYPE] === TOOL_OBJECT_TYPE) data.selectedOptionId = this._activeTool;
        else data.selectedOptionId = this._activeTool.id;
        return data;
    }
}