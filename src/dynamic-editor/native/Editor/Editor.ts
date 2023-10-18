export class Editor{
    readonly events;
    constructor(){
        this.events = new EditorEvents();
    }
}
export class EditorEvents{
    constructor(){}
}
export const editor = new Editor();