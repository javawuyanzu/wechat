import { SdcSoftDevice2 } from '../Device/SdcSoftDevice2';
import { CtlField } from '../Fields/Fields';
export declare class DeviceAdapter2 {
    static readonly FnGroups: string[];
    static readonly Fns: ({
        title: string;
        desc: string;
        fn: (h: number, m: number) => number;
    } | {
        title: string;
        desc: string;
        fn: (a: number) => number[];
    })[][];
    static readonly Power_YouQi = 0;
    static readonly Power_Dian = 1;
    static readonly Power_Mei = 2;
    static readonly Power_ShengWuZhi = 3;
    static readonly Power_YuRe = 4;
    static readonly CTL_TAG_CLC = 0;
    static readonly CTL_TAG_REG = 1;
    static readonly Formate_Type_Exception = 0;
    static readonly Formate_Type_JiBen = 1;
    static readonly Formate_Type_WenDu = 2;
    static readonly Formate_Type_Yali = 3;
    static readonly Formate_Type_LiuLiang = 4;
    static readonly Formate_Type_KaiGuan = 5;
    static readonly Formate_Type_SheZhi = 6;
    static readonly Formate_Type_SheBei = 7;
    static readonly Formate_Type_DingShi = 8;
    static readonly Formate_Key_Action = "action";
    static readonly Formate_Key_ValueMap = "valuemap";
    static readonly Formate_Key_AtMap = "atmap";
    static readonly Formate_Key_DingShi = "dingshi";
    static readonly Formate_Key_KongZhi = "kongzhi";
    static readonly Formate_Key_FixFields = "fixfields";
    static readonly Formate_Key_No = "no";
    static readonly Formate_Key_Power = "power";
    static readonly Formate_Key_Media = "media";
    static readonly Formate_Key_System_Run = "sysrun";
    static readonly Formate_Key_Input = "input";
    static readonly Formate_Key_CountMap = "countmap";
    static readonly Formate_Key_DataMap = "datamap";
    static readonly Formate_Key_Point_Fields = "fields";
    static readonly Formate_Key_Point_Endian = "endina";
    static readonly Formate_Key_Point_Mask = "mask";
    static readonly Formate_Key_Point_Type = "typ";
    static readonly Formate_Field_AT_Class_Fire = "fire";
    static readonly Formate_Field_AT_Class_Beng = "beng";
    static readonly Formate_Field_AT_Class_Fan = "fan";
    static readonly Formate_Field_Option_System_Status = "systatus";
    static readonly Formate_Field_Option_System_Run = "sysrun";
    static readonly Formate_Field_Option_Type = "typ";
    static readonly Formate_Field_Option_Name = "name";
    static readonly Formate_Field_Option_Bit = "bit";
    static readonly Formate_Field_Option_Input = "input";
    static readonly Formate_Field_Option_Ses_Min = "lmin";
    static readonly Formate_Field_Option_Ses_Max = "lmax";
    static readonly Formate_Field_Option_Description = "desc";
    static readonly Formate_Field_Option_Kz = "kz";
    static readonly Formate_Field_Option_Ctl_Mode = "mode";
    static readonly Formate_Field_Option_Ctl_Addr = "addr";
    static readonly Formate_Field_Option_Ctl_Min = "min";
    static readonly Formate_Field_Option_Ctl_Max = "max";
    static readonly Formate_Field_Option_Ctl_Group = "group";
    static readonly Formate_Field_Option_Ctl_Fn = "fn";
    static readonly Formate_Field_Option_MathAction = "mat";
    static readonly Formate_Field_Option_MathAction_Div = "div";
    static readonly Formate_Field_Option_MathAction_Mod = "mod";
    static readonly Formate_Field_Option_Number = "number";
    static readonly Formate_Field_Option_Power = "power";
    static readonly Formate_Field_Option_Media = "media";
    static readonly Formate_Field_Option_Unit = "unit";
    static readonly Formate_Field_Option_Focus = "focus";
    static readonly Formate_Field_Option_ValueMap = "vm";
    static readonly Formate_Field_Option_ExecptionLevel = "level";
    static readonly Formate_Field_Option_VString = "vstr";
    static readonly Formate_Field_Option_RefType = "reftyp";
    static readonly Formate_Field_Option_RefType_Count = "count";
    static readonly Formate_Field_Option_RefType_At = "at";
    static readonly Formate_Field_Option_RefGroup = "refgroup";
    static readonly Formate_Field_Option_RefIndex = "refindex";
    static readonly Formate_Field_Option_Fn = "fn";
    static readonly Formate_Field_Option_Value = "v";
    static readonly Formate_Field_Option_Amount = "amount";
    static readonly Formate_Field_Option_Part = "part";
    static readonly Formate_Field_Option_Index = "index";
    static readonly Formate_Field_Option_Visable = "vs";
    private addrMap;
    private formate;
    private isNUll;
    private valueMap;
    private countMap;
    private deviceNo;
    private input;
    private atMap;
    private atMapCount;
    private device;
    private KongZhiPoints;
    private AtMapPoints;
    Init(formate: any, addrMap: {
        [key: string]: number;
    }): void;
    private Init2;
    constructor();
    private mathAction;
    private handleMathActionProperty;
    /**
     * 处理数值映射
     * @param field
     * @param item
     * @return
     * true成功处理数值映射，此时无需进行数学运算分析。
     * false无需进行数值映，射此时应该进行数学运算分析。
     */
    private handleVMapProperty;
    private handleCtlProperty;
    private handleRefProperty;
    private handleFocus;
    private handleExceptionField;
    private handleBitField;
    private handleKaiGuanField;
    private handleSystemStatusField;
    private handleSystemRunField;
    private handleInputField;
    /**
     * 转为handleKongZhiField，创建的全局变量
     * 为了处理单点多位的控制情况
     */
    mCtlField: CtlField | null;
    count: number;
    private handleKongZhiField;
    handlerData(data: Uint8Array): void;
    get Device(): SdcSoftDevice2 | null;
}
