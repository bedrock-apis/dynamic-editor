import { EditorExtension } from "dynamic-editor";

class MyExtension extends EditorExtension{
    Initialiaze(){
        console.warn("Initialize");
        this.onShutdown.subscribe((e)=>console.warn("Event On Shutdown"));
    }
    Ready(){
        console.warn("Ready!");
    }
    Shutdown(){
        console.warn("Shutdown");
    }
}
MyExtension.registry();