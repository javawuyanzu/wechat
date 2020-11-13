import { StringHashMap } from "@sdcsoft/comms";
import { BaseField, CtlField, SysRunField } from "../Fields/Fields";
import { Element } from "../Element/Element";
export declare class SdcSoftDevice2 {
    private power;
    private media;
    private status;
    private run;
    private bj;
    private jb;
    private wd;
    private yl;
    private ll;
    private kg;
    private sz;
    private sb;
    private ds;
    private _focus;
    private ctl;
    private atMap;
    constructor();
    set Status(status: BaseField | null);
    get Status(): BaseField | null;
    set Run(run: SysRunField | null);
    get Run(): SysRunField | null;
    get Power(): number;
    set Power(v: number);
    set Media(v: number);
    get Media(): number;
    get BaoJing(): any[];
    get JiBen(): any[];
    get WenDu(): any[];
    get YaLi(): any[];
    get LiuLiang(): any[];
    get KaiGuan(): any[];
    get SheZhi(): any[];
    get SheBei(): any[];
    get DingShi(): any[];
    get Focus(): any[];
    AddKongZhiGroup(group: string): CtlField[];
    AddKongZhiItem(group: string, ctlItem: CtlField): void;
    get KongZhi(): StringHashMap<CtlField[]>;
    get AtMap(): StringHashMap<any>;
    /**
    * 获取炉子元素信息
    * @returns AElement
    */
    getStoveElements(): Element[];
    /**
    * 获取泵元素集合
    */
    getBeng(): Element[];
    /**
     * 获取风扇元素集合
     */
    getFan(): Element[];
}
