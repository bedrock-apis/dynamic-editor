import { Player } from "@minecraft/server";
import { NativeEvent, UUID } from "dynamic-editor/core";
import { Action } from "./EditorActions";

const DISPLAY_MANAGERS = new WeakMap();
export class PlayerDisplayManager{
    static hasDisplayManager(player: Player){return DISPLAY_MANAGERS.has(player);}
    static getDisplayManager(player: Player){return DISPLAY_MANAGERS.get(player);}
    //@ts-ignore
    readonly player: Player;
    readonly uniques: WeakMap<any, string> = new WeakMap();
    readonly isReady: boolean = false;
    readonly onClientReady = new NativeEvent<[{player: Player,display: PlayerDisplayManager}]>();
    readonly actions: Map<string, Action> = new Map();
    constructor(player: Player){
        if(DISPLAY_MANAGERS.has(player)) return DISPLAY_MANAGERS.get(player);
        DISPLAY_MANAGERS.set(player,this);
        this.player = player;
        this.onClientReady.subscribe(()=>{
            //@ts-ignore
            this.isReady = true;
        });
    }
    setRegisterAction(action: Action){
        let uuid = this.getUnique(action)??UUID.generate();
        if(!this.actions.has(uuid)) this.actions.set(uuid,action);
        this.setUnique(action,uuid);
        return uuid;
    }
    getRegisteredAction(uuid: string){return this.actions.get(uuid);}
    hasRegisteredAction(uuid: string){return this.actions.has(uuid);}
    hasUnique(obj: any){return this.uniques.get(obj);}
    setUnique(obj: any, uuid: string){return this.uniques.set(obj,uuid)}
    getUnique(obj: any){return this.uniques.get(obj);}
    openCreateUnique(obj: any){
        if(this.uniques.has(obj)) return this.uniques.get(obj);
        else{
            const uid = UUID.generate();
            this.uniques.set(obj,uid);
            return uid;
        }
    }
}