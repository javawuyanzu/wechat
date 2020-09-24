"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SdcSoftDevice2 = void 0;
var comms_1 = require("@sdcsoft/comms");
var Element_1 = require("../Element/Element");
var DeviceAdapter2_1 = require("../Adapter/DeviceAdapter2");
var SdcSoftDevice2 = /** @class */ (function () {
    //countmap集合
    //private countMap: StringHashMap<any> = new StringHashMap();
    function SdcSoftDevice2() {
        this.power = -1;
        this.media = -1;
        this.status = null;
        this.run = null;
        //解析出来的点位信息，这些对象才是前端需要的呈现的对象
        this.bj = []; //报警
        this.jb = []; //基本
        this.wd = []; //温度
        this.yl = []; //压力
        this.ll = []; //流量
        this.kg = []; //开关
        this.sz = []; //设置
        this.sb = []; //设备
        this.ds = []; //定时 
        this._focus = []; //关注信息
        this.ctl = new comms_1.StringHashMap(); //控制命令
        //atmap集合
        //private atMap: StringHashMap<StringHashMap<any>> = new StringHashMap();
        this.atMap = new comms_1.StringHashMap();
    }
    Object.defineProperty(SdcSoftDevice2.prototype, "Status", {
        get: function () {
            if (this.status) {
                return this.status;
            }
            return { name: '', v: 0, vstr: '' };
        },
        set: function (status) {
            this.status = status;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SdcSoftDevice2.prototype, "Run", {
        get: function () {
            if (this.run) {
                return this.run;
            }
            return null;
        },
        set: function (run) {
            this.run = run;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SdcSoftDevice2.prototype, "Power", {
        get: function () {
            return this.power;
        },
        set: function (v) {
            this.power = v;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SdcSoftDevice2.prototype, "Media", {
        get: function () {
            return this.media;
        },
        set: function (v) {
            this.media = v;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SdcSoftDevice2.prototype, "BaoJing", {
        get: function () {
            return this.bj;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SdcSoftDevice2.prototype, "JiBen", {
        get: function () {
            return this.jb;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SdcSoftDevice2.prototype, "WenDu", {
        get: function () {
            return this.wd;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SdcSoftDevice2.prototype, "YaLi", {
        get: function () {
            return this.yl;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SdcSoftDevice2.prototype, "LiuLiang", {
        get: function () {
            return this.ll;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SdcSoftDevice2.prototype, "KaiGuan", {
        get: function () {
            return this.kg;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SdcSoftDevice2.prototype, "SheZhi", {
        get: function () {
            return this.sz;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SdcSoftDevice2.prototype, "SheBei", {
        get: function () {
            return this.sb;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SdcSoftDevice2.prototype, "DingShi", {
        get: function () {
            return this.ds;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SdcSoftDevice2.prototype, "Focus", {
        get: function () {
            return this._focus;
        },
        enumerable: false,
        configurable: true
    });
    SdcSoftDevice2.prototype.AddKongZhiItem = function (group, ctlItem) {
        if (!this.ctl.containsKey(group)) {
            this.ctl.addItem(group, []);
        }
        this.ctl.getItem(group).push(ctlItem);
    };
    Object.defineProperty(SdcSoftDevice2.prototype, "KongZhi", {
        get: function () {
            return this.ctl;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SdcSoftDevice2.prototype, "AtMap", {
        get: function () {
            return this.atMap;
        },
        enumerable: false,
        configurable: true
    });
    /**
    * 获取炉子元素信息
    * @returns AElement
    */
    SdcSoftDevice2.prototype.getStoveElements = function () {
        var elements = [];
        var group = this.atMap.getItem(DeviceAdapter2_1.DeviceAdapter2.Formate_Field_AT_Class_Fire);
        for (var i = 0; i < group.length; i++) {
            var el = new Element_1.Element();
            el.Title = group[i].name;
            el.Prefix = Element_1.Element.Prefix_Stove;
            el.SetValues(Element_1.Element.Index_A_Power, this.power, this.media, group[i].v, 0);
            el.Amount = group[i].amount;
            elements.push(el);
        }
        return elements;
    };
    /**
    * 获取泵元素集合
    */
    SdcSoftDevice2.prototype.getBeng = function () {
        var elements = [];
        var group = this.atMap.getItem(DeviceAdapter2_1.DeviceAdapter2.Formate_Field_AT_Class_Beng);
        console.log('-----------aaaaaa-------------');
        console.log(this.atMap);
        console.log('------------aaaaaa------------');
        for (var i = 0; i < group.length; i++) {
            var el = new Element_1.Element();
            el.Title = group[i].name;
            el.Prefix = Element_1.Element.Prefix_Beng;
            el.SetValues(Element_1.Element.Index_Beng_Count, group[i].amount, group[i].v);
            el.Amount = group[i].amount;
            elements.push(el);
        }
        return elements;
    };
    /**
     * 获取风扇元素集合
     */
    SdcSoftDevice2.prototype.getFan = function () {
        var elements = [];
        var group = this.atMap.getItem(DeviceAdapter2_1.DeviceAdapter2.Formate_Field_AT_Class_Fan);
        for (var i = 0; i < group.length; i++) {
            var el = new Element_1.Element();
            el.Title = group[i].name;
            el.Prefix = Element_1.Element.Prefix_Fan;
            el.SetValues(Element_1.Element.Index_Fan_Count, group[i].amount, group[i].v);
            el.Amount = group[i].amount;
            elements.push(el);
        }
        return elements;
    };
    return SdcSoftDevice2;
}());
exports.SdcSoftDevice2 = SdcSoftDevice2;
