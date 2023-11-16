import { StatusBarItemAlignment } from "dynamic-editor/core";
import { CustomProperty } from "./General";

export class StatusBarAlignmentProperty extends CustomProperty<[StatusBarItemAlignment]>{
    static readonly UNIQUE_TYPE: symbol = Symbol("StatusBarAlignmentProperty");
    static readonly EXPECTED_VALUE_TYPE = "StatusBarItemAlignment"; 
    constructor(alignment: StatusBarItemAlignment = StatusBarItemAlignment.Right){ super(alignment); }
    protected isValidType(v: any): boolean {return v in StatusBarItemAlignment;}
    protected getType(v: StatusBarItemAlignment) {return (typeof v === "string"?StatusBarItemAlignment[v]:v) as StatusBarItemAlignment;}
}