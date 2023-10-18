import { NewKeyword, NoConstructor, ObjectBoundNotExist, core } from "./Base";

const $native_functions = new WeakSet();
const toString = Function.prototype.toString;
const call = Function.prototype.call.bind(Function.prototype.call);
const FuncProto = Function.prototype;
const ObjProto = Object.prototype;
$native_functions.add(Function.prototype.toString = function(){
    if($native_functions.has(this)) return `function ${this.name}() {\n    [native code]\n}`;
    return call(toString,this);
});

const constructors = new WeakMap();
const PUBLIC_CACHES = new WeakMap();
export function ReleaseCache(constructor,cache){
    const k = PUBLIC_CACHES.get(cache);
    PUBLIC_CACHES.delete(cache);
    return constructors.get(constructor)?.cache?.delete?.(k)??false;
}
export function GetPublicInstance(cache){ return PUBLIC_CACHES.get(cache); }
function IsRegistered(func){return constructors.has(func) || func === FuncProto;}
function CreateMethodFunction(name,func,manager){
    const f = function (){
        try {
            const cache = manager.getCache(this);
            if(!cache) throw new ReferenceError(ObjectBoundNotExist);
            return call(func,this,cache,...arguments);
        } catch (error) {throw new error.constructor(error.message);}
    };
    $native_functions.add(f);
    if(typeof name === "string")  Object.defineProperty(f,"name",{value:name,configurable:true,enumerable:true,writable:false});
    return f;
}
function CreateGetterFunction(name,func,manager){
    const f = function (){
        try {
            const cache = manager.getCache(this);
            if(!cache) return undefined;
            return call(func,this,cache,...arguments);
        } catch (error) {throw new error.constructor(error.message);}
    };
    $native_functions.add(f);
    if(typeof name === "string") Object.defineProperty(f,"name",{value:name,configurable:true,enumerable:true,writable:false});
    return f;
}
class Manager{
    constructor(){
        this.cache = new WeakMap();
        this.getCache = (that)=>this.cache.get(that);
        this.hasCache = (that)=>this.cache.has(that);
        this.setCache = (that,it)=>this.cache.set(that,it);
    }
}
export function RegisterClass(classConstructor){
    if(IsRegistered(classConstructor)) return constructors.get(classConstructor);
    if(!IsRegistered(Object.getPrototypeOf(classConstructor))) throw new ReferenceError("Parent class is not registred.");
    const m = new Manager();
    constructors.set(classConstructor,m);
    return m;
}
export function CreateInstance(constructor,cache, proto = constructor.prototype){
    if(!IsRegistered(constructor)) throw new ReferenceError("Constructor is not registered.");
    let con = constructor;
    const instance = Object.create(proto);
    while(con != FuncProto & con != null & con!= ObjProto){
        const m = constructors.get(con);
        m.setCache(instance,cache);
        con = Object.getPrototypeOf(con);
    }
    PUBLIC_CACHES.set(cache,instance);
    return instance;
}
export function CreateClass(name,properties,func, extending = FuncProto){
    properties = properties??{};
    func = func??=function (){
        if(!new.target) throw new TypeError(NewKeyword);
        if(!core.isNativeCall) throw new ReferenceError(NoConstructor + name);
    }
    Object.defineProperty(func,"name",{value:name,configurable:true,enumerable:true,writable:false});
    Object.setPrototypeOf(func,extending);
    Object.setPrototypeOf(func.prototype,extending.prototype??ObjProto);
    $native_functions.add(func);
    const manager = RegisterClass(func);
    const proto = func.prototype;
    Object.setPrototypeOf(properties,manager);
    for (const key of Object.getOwnPropertyNames(properties)) {
        const {value,get,set,enumerable,configurable,writable} = Object.getOwnPropertyDescriptor(properties,key);
        if(typeof value === "function"){
            Object.defineProperty(proto,key,{value:CreateMethodFunction(key,value,manager),enumerable,configurable,writable});
        } else if(get || set) Object.defineProperty(proto,key,{get:typeof get === "function"?CreateGetterFunction(key,get,manager):undefined,set:typeof set === "function"?CreateMethodFunction(key,set,manager):undefined,enumerable,configurable});
    }
    for (const key of Object.getOwnPropertySymbols(properties)) {
        const {value,get,set,enumerable,configurable,writable} = Object.getOwnPropertyDescriptor(properties,key);
        if(typeof value === "function"){
            Object.defineProperty(proto,key,{value:CreateMethodFunction(key,value,manager),enumerable,configurable,writable});
        } else if(get || set) Object.defineProperty(proto,key,{get:typeof get === "function"?CreateGetterFunction(key,get,manager):undefined,set:typeof set === "function"?CreateMethodFunction(key,set,manager):undefined,enumerable,configurable});
    }
    return {constructor: func, manager};
}