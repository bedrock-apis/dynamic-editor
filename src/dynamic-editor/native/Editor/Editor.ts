import { Logger, editor as d } from "@minecraft/server-editor-bindings";

export class Editor{
    readonly events;
    get isSimulationPaused(){return d.simulation.isPaused();}
    set isSimulationPaused(v: boolean){ d.simulation.setPaused(v);}
    //@ts-ignore
    readonly get logger(): Logger{return d.log};
    constructor(){
        this.events = new EditorEvents();
    }
}
export class EditorEvents{
    constructor(){}
}
export const editor = new Editor();