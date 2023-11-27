export function ReleaseCache(constructor: any,cache: any): boolean
export function GetPublicInstance(cache: any): any
export function RegisterClass<T,N extends {new (...any: any): T}>(classConstructor: N): Manager<T,any>
export function CreateInstance<T>(constructor: {new (): T} | any,cache: any, proto?: T): T
export function CreateClass<T,TN extends {new (...any: any): T}, PN extends {new (...any: any): any} = {}>(name: string, properties?: T, func?: TN, extending?: PN): {constructor: {new(): (PN extends {new (...any: any): infer P}?P:string) & T}, manager: Manager<T, any>};
class Manager<A,B>{
    readonly getCache: (that: A)=>T;
    readonly setCache: (that: A, it: T)=>void;
    readonly hasCache: (that: A)=>boolean;
    readonly cache: WeakMap<A,B>;
}