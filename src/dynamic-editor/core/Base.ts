/////////////////////////////////////
///// Errors
/////////////////////////////////////
const TypeError = globalThis.TypeError;
const ReferenceError = globalThis.ReferenceError;
const random = Math.random;
const floor = Math.floor;/*
export const NewKeyword = ()=>new TypeError("must be called with new");
export const ObjectBoundNotExist = ()=>new ReferenceError("Native object bound to prototype does not exist.");
export const NoConstructor = (name)=>new ReferenceError(`No constructor for native class '${name}'`);
export const NoPrivileges = (id)=>new ReferenceError(`Native function [${id}] does not have required privileges.`);*/
export class UUID{
    static generate(timestamp =  Date.now()){
        const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) =>{
          let r = (timestamp + random() * 16) % 16 | 0;
          timestamp = floor(timestamp / 16);
          return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }
}
class Core {
  isNativeCall: boolean = false
}
export const core = new Core();