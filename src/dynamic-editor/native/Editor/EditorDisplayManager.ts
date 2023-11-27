import { Player } from "@minecraft/server";
import { NativeEvent, TriggerEvent, UUID } from "dynamic-editor/core/index";
import { Action } from "./EditorActions";
import { IUnkownTool, OBJECT_TYPE, TOOL_OBJECT_TYPE, Tool } from "../Controls/index";

const DISPLAY_MANAGERS = new WeakMap();
export class PlayerDisplayManager{
    //internal
    static hasDisplayManager(player: Player){return DISPLAY_MANAGERS.has(player);}
    //internal
    static getDisplayManager(player: Player){return DISPLAY_MANAGERS.get(player);}
    //@ts-ignore
    readonly activeTool: IUnkownTool | null;
    //@ts-ignore
    readonly player: Player;
    readonly uniques: WeakMap<any, string> = new WeakMap();
    readonly reverses = new Map<string,any>();
    readonly isReady: boolean = false;
    readonly onClientReady = new NativeEvent<[{player: Player,display: PlayerDisplayManager}]>();
    readonly onToolAtivate = new NativeEvent<[{player: Player,display: PlayerDisplayManager, tool: Tool | IUnkownTool | null,lastTool: Tool | IUnkownTool | null}]>
    lastTool: Tool | IUnkownTool | null = null;
    constructor(player: Player){
        if(DISPLAY_MANAGERS.has(player)) return DISPLAY_MANAGERS.get(player);
        DISPLAY_MANAGERS.set(player,this);
        this.player = player;
        this.onClientReady.subscribe(()=>{
            //@ts-ignore
            this.isReady = true;
        });
        this.onToolAtivate.subscribe(({tool,lastTool})=>{
            if((lastTool as any)?.[OBJECT_TYPE] === TOOL_OBJECT_TYPE && tool !== lastTool) TriggerEvent((lastTool as Tool).onActivationStateChange,{tool:lastTool as Tool,isSelected:false});
            if((tool as any)?.[OBJECT_TYPE] === TOOL_OBJECT_TYPE) TriggerEvent((tool as Tool).onActivationStateChange,{tool:tool as Tool,isSelected:true});
        });
    }
    addReverses(reverse: any,as = ""){
        let uuid = this.getUnique(reverse)??(as + UUID.generate());
        if(!this.reverses.has(uuid)) this.reverses.set(uuid,reverse);
        this.setUnique(reverse,uuid);
        return uuid;
    }
    getReverses(uuid: string){return this.reverses.get(uuid);}
    hasReverses(uuid: string){return this.reverses.has(uuid);}
    removeReveres(uuid: string){return this.reverses.delete(uuid);}
    hasUnique(obj: any){return this.uniques.get(obj);}
    setUnique(obj: any, uuid: string){return this.uniques.set(obj,uuid)}
    getUnique(obj: any){return this.uniques.get(obj);}
    openCreateUnique(obj: any,as = ""){
        if(this.uniques.has(obj)) return this.uniques.get(obj);
        else{
            const uid = (as + UUID.generate());
            this.uniques.set(obj,uid);
            return uid;
        }
    }
}