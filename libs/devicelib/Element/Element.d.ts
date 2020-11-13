export declare class Element {
    static readonly Prefix_Stove = "a";
    static readonly Prefix_Beng = "b";
    static readonly Prefix_Fan = "c";
    static readonly Index_A_Power = 0;
    static readonly Index_A_Media = 1;
    static readonly Index_A_Status = 2;
    static readonly Index_A_Style = 3;
    static readonly Index_Beng_Count = 0;
    static readonly Index_Beng_Status = 1;
    static readonly Index_Fan_Count = 0;
    static readonly Index_Fan_Status = 1;
    protected values: number[];
    private title;
    private prefix;
    private amount;
    get Amount(): number;
    set Amount(amount: number);
    getTitle(): string;
    set Title(title: string);
    get Prefix(): string;
    set Prefix(prefix: string);
    ClearValues(): void;
    SetValues(index: number, ...data: number[]): void;
    getElementPrefixAndValuesString(spacerString?: string): string;
}
