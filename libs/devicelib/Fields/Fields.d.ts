export declare const POINT_TYPE_BYTE = 0;
export declare const POINT_TYPE_UINT = 1;
export declare const POINT_TYPE_FLOAT = 2;
export declare const POINT_TYPE_LONG = 3;
export declare const POINT_TYPE_STRING = 4;
export interface BaseField {
    name: string;
    v: number;
    vstr: string;
}
export interface SysRunField extends BaseField {
    typ: number;
}
export declare class CtlItem {
    private name;
    private min;
    private max;
    private group;
    fn: Function | null;
    private v;
    private desc;
    private bit;
    private unit;
    private flag;
    set Flag(flag: boolean);
    get Flag(): boolean;
    set Unit(unit: string);
    get Unit(): string;
    set Bit(bit: number | null);
    get Bit(): number | null;
    set Description(desc: string);
    get Description(): string;
    set Name(name: string);
    get Name(): string;
    set Max(max: number);
    get Max(): number;
    set Min(min: number);
    get Min(): number;
    set Group(group: number);
    get Group(): number;
    set Fnc(fn: Function | null);
    setValue(v: number): void;
    set Value(v: number);
    get Value(): number;
}
export declare class CtlField {
    static readonly CTL_ACTION_COI = "05";
    static readonly CTL_ACTION_REG = "06";
    static readonly CTL_ACTION_REG_2 = "10";
    ctls: CtlItem[];
    endian: number;
    set Endian(v: number);
    get Endian(): number;
    v: number;
    set Value(v: number);
    get Value(): number;
    action: string;
    set Action(action: string);
    get Action(): string;
    addr: string;
    set Address(addr: string);
    get Address(): string;
    typ: number;
    set Typ(typ: number);
    get Typ(): number;
    no: number;
    set No(no: number);
    get No(): number;
    addCtlItem(ctlItem: CtlItem): void;
    getCtlItems(): CtlItem[];
    get Command(): string;
    static hexStringToBytes(str: string): Uint8Array | null;
    static toNumbers(str: string): number[];
    static intToBytes4(n: number): ArrayBuffer;
}
