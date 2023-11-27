import {CreateClass} from "../core/APIBuilder";

const {constructor: Client} = CreateClass("Client",{
    get player(){return super.getCache(this).player;},
    get name(){return super.getCache(this).name;},
    get id(){return super.getCache(this).id;},
    get isReady(){return super.getCache(this).isReady;}
});


export {Client};