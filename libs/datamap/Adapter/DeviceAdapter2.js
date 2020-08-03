"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceAdapter2 = void 0;
var comms_1 = require("@sdcsoft/comms");
var SdcSoftDevice2_1 = require("../Device/SdcSoftDevice2");
var Fields_1 = require("../Fields/Fields");
var ComValueMap_1 = require("../CommValueMap/ComValueMap");
var Endian_1 = require("../Endian/Endian");
var NumberUtil_1 = require("../tools/NumberUtil");
var DeviceAdapter2 = /** @class */ (function () {
    function DeviceAdapter2() {
        //字节地址映射要在添加dtu命令时生成
        this.addrMap = {};
        //记录设备数据是否为NULL
        this.isNUll = false;
        //countmap集合
        this.countMap = [];
        //设备站号
        this.deviceNo = -1;
        //输入量程
        this.input = null;
        //
        this.atMapCount = new comms_1.StringHashMap();
        /**
         * 转为handleKongZhiField，创建的全局变量
         * 为了处理单点多位的控制情况
         */
        this.mCtlField = null;
        this.count = 0;
        this.valueMap = new comms_1.StringHashMap();
        this.countMap = [];
        this.device = new SdcSoftDevice2_1.SdcSoftDevice2();
    }
    DeviceAdapter2.prototype.KongZhiPoints = function () {
        if (this.deviceNo < 0) {
            return;
        }
        for (var key in this.formate[DeviceAdapter2.Formate_Key_KongZhi]) {
            var ctl = this.formate[DeviceAdapter2.Formate_Key_KongZhi][key];
            var type = ctl[DeviceAdapter2.Formate_Field_Option_Type];
            var group = ctl[DeviceAdapter2.Formate_Field_Option_Ctl_Group];
            if (DeviceAdapter2.CTL_TAG_CLC == type) { //如果是线圈控制
                var ctlField = new Fields_1.CtlField();
                ctlField.No = this.deviceNo;
                ctlField.Typ = Fields_1.CtlField.CTL_TYPE_BYTE;
                ctlField.Address = ctl[DeviceAdapter2.Formate_Field_Option_Ctl_Addr];
                ctlField.Action = Fields_1.CtlField.CTL_ACTION_COI;
                var ctlItem = new Fields_1.CtlItem();
                ctlItem.Name = ctl[DeviceAdapter2.Formate_Field_Option_Name];
                ctlItem.Description = ctl.hasOwnProperty(DeviceAdapter2.Formate_Field_Option_Description) ? ctl[DeviceAdapter2.Formate_Field_Option_Description] : '';
                ctlField.Value = 0;
                ctlField.addCtlItem(ctlItem);
                this.device.KongZhi.getItem(group).push(ctlField);
            }
            else if (DeviceAdapter2.CTL_TAG_REG == type) { //如果是寄存器控制
                var ctlField = new Fields_1.CtlField();
                ctlField.No = this.deviceNo;
                ctlField.Address = ctl[DeviceAdapter2.Formate_Field_Option_Ctl_Addr];
                if (ctl.hasOwnProperty(DeviceAdapter2.Formate_Field_Option_Ctl_Mode)) {
                    var mode = ctl[DeviceAdapter2.Formate_Field_Option_Ctl_Mode];
                    ctlField.Typ = mode;
                    if (mode > Fields_1.CtlField.CTL_TYPE_UINT) {
                        ctlField.Action = Fields_1.CtlField.CTL_ACTION_REG_2;
                    }
                    else {
                        ctlField.Action = Fields_1.CtlField.CTL_ACTION_REG;
                    }
                    var ctlItem_1 = new Fields_1.CtlItem();
                    ctlItem_1.Name = ctl[DeviceAdapter2.Formate_Field_Option_Name];
                    ctlItem_1.Description = ctl.hasOwnProperty(DeviceAdapter2.Formate_Field_Option_Description) ? ctl[DeviceAdapter2.Formate_Field_Option_Description] : '';
                    ctlField.Value = 0;
                    ctlField.addCtlItem(ctlItem_1);
                    this.device.KongZhi.getItem(group).push(ctlField);
                }
                else {
                    throw '控制点：' + ctl[DeviceAdapter2.Formate_Field_Option_Name] + ' 未明确数据类型';
                }
                ctlField.Action = Fields_1.CtlField.CTL_ACTION_COI;
                var ctlItem = new Fields_1.CtlItem();
                ctlItem.Name = ctl[DeviceAdapter2.Formate_Field_Option_Name];
                ctlItem.Description = ctl.hasOwnProperty(DeviceAdapter2.Formate_Field_Option_Description) ? ctl[DeviceAdapter2.Formate_Field_Option_Description] : '';
                ctlField.Value = 0;
                ctlField.addCtlItem(ctlItem);
                this.device.KongZhi.getItem(group).push(ctlField);
            }
            else {
                continue;
            }
        }
    };
    DeviceAdapter2.prototype.AtMapPoints = function () {
        for (var _i = 0, _a = Object.keys(this.formate[DeviceAdapter2.Formate_Key_AtMap]); _i < _a.length; _i++) {
            var key2 = _a[_i];
            var atemt = this.formate[DeviceAdapter2.Formate_Key_AtMap][key2];
            var group = [];
            if (DeviceAdapter2.Formate_Field_AT_Class_Fire == key2) { //如果是燃烧器
                for (var key3 = 0; key3 < atemt.length; key3++) {
                    var atemtfield = atemt[key3];
                    var element = {
                        "name": atemtfield[DeviceAdapter2.Formate_Field_Option_Name],
                        "typ": atemtfield[DeviceAdapter2.Formate_Field_Option_Type],
                        "amount": atemtfield[DeviceAdapter2.Formate_Field_Option_Amount],
                        "v": atemtfield[DeviceAdapter2.Formate_Field_Option_Value]
                    };
                    group.push(element);
                }
            }
            else { //如果是泵
                for (var key3 = 0; key3 < atemt.length; key3++) {
                    var atemtfield = atemt[key3];
                    var element = {
                        "name": atemtfield[DeviceAdapter2.Formate_Field_Option_Name],
                        "amount": atemtfield[DeviceAdapter2.Formate_Field_Option_Amount],
                        "v": atemtfield[DeviceAdapter2.Formate_Field_Option_Value]
                    };
                    group.push(element);
                    // 记录泵/风机动画 已经处理的设备个数，应该处理的个数与设备amount是对应的
                    // 通过该值来自动计算元素动画的各设备启停情况
                    this.atMapCount.addItem(element.name, 0);
                }
            }
            this.device.AtMap.addItem(key2, group);
        }
    };
    DeviceAdapter2.prototype.Init = function (formate, addrMap) {
        this.formate = formate;
        this.addrMap = addrMap;
        this.countMap = [];
    };
    DeviceAdapter2.prototype.Init2 = function () {
        this.deviceNo = 0; //清理站号
        this.device = new SdcSoftDevice2_1.SdcSoftDevice2();
        this.valueMap.clear();
        this.atMapCount.clear();
        this.input = null;
        //生成固定解析结构
        for (var _i = 0, _a = Object.keys(this.formate); _i < _a.length; _i++) {
            var key = _a[_i];
            if (this.formate.hasOwnProperty(key)) {
                if (DeviceAdapter2.Formate_Key_Input == key) {
                    this.input = {
                        min: this.formate[key]["min"],
                        max: this.formate[key]["max"]
                    };
                }
                else if (DeviceAdapter2.Formate_Key_No == key) {
                    this.deviceNo = this.formate[key];
                }
                else if (DeviceAdapter2.Formate_Key_Power == key) {
                    var power = this.formate[key];
                    this.device.JiBen.push(power);
                    this.device.Power = power[DeviceAdapter2.Formate_Field_Option_Value];
                }
                else if (DeviceAdapter2.Formate_Key_Media == key) {
                    var media = this.formate[key];
                    this.device.JiBen.push(media);
                    this.device.Media = media[DeviceAdapter2.Formate_Field_Option_Value];
                }
                else if (DeviceAdapter2.Formate_Key_ValueMap == key) {
                    for (var _b = 0, _c = Object.keys(this.formate[key]); _b < _c.length; _b++) {
                        var key2 = _c[_b];
                        if (this.formate[key].hasOwnProperty(key2)) {
                            this.valueMap.addItem(key2, new comms_1.StringHashMap(this.formate[key][key2]));
                        }
                    }
                }
                else if (DeviceAdapter2.Formate_Key_AtMap == key) {
                    this.AtMapPoints();
                }
                else if (DeviceAdapter2.Formate_Key_DingShi == key) {
                    for (var key2 in this.formate[key]) {
                        this.device.DingShi.push(this.formate[key][key2]);
                    }
                }
                else if (DeviceAdapter2.Formate_Key_KongZhi == key) {
                    this.KongZhiPoints();
                }
                else if (DeviceAdapter2.Formate_Key_FixFields == key) {
                    for (var key2 = 0; key2 < this.formate[key].length; key2++) {
                        var fix = this.formate[key][key2];
                        this.device.JiBen.push(fix);
                    }
                }
                else if (DeviceAdapter2.Formate_Key_CountMap == key) {
                    for (var key2 = 0; key2 < this.formate[key].length; key2++) {
                        var count = this.formate[key][key2];
                        this.countMap.push(count);
                    }
                }
            }
        }
    };
    DeviceAdapter2.prototype.mathAction = function (action, v, bn) {
        var result = v;
        switch (action) {
            case 'div':
                if (0 != bn) {
                    result = Math.floor((v / bn) * 100) / 100;
                }
                else {
                    throw { msg: "除" + v + "操作无效！" };
                }
                break;
            case 'mod':
                if (0 != bn) {
                    result = v % bn;
                }
                else {
                    throw { msg: "对 0 取余操作无效！" };
                }
                break;
            case 'add':
                result = v + bn;
                break;
            case 'sub':
                result = v - bn;
                break;
        }
        return result;
    };
    DeviceAdapter2.prototype.handleMathActionProperty = function (v, field, item) {
        item.v = v;
        if (field.hasOwnProperty(DeviceAdapter2.Formate_Field_Option_MathAction)) {
            try {
                var result = this.mathAction(field[DeviceAdapter2.Formate_Field_Option_MathAction], v, field[DeviceAdapter2.Formate_Field_Option_Number]).toString();
                if (field.hasOwnProperty(DeviceAdapter2.Formate_Field_Option_Unit)) {
                    result += field[DeviceAdapter2.Formate_Field_Option_Unit];
                }
                item.vstr = result;
            }
            catch (error) {
                throw { msg: field[DeviceAdapter2.Formate_Field_Option_Name] + error.msg };
            }
        }
        else {
            if (field.hasOwnProperty(DeviceAdapter2.Formate_Field_Option_Unit)) {
                item.vstr = v.toString() + field[DeviceAdapter2.Formate_Field_Option_Unit];
                return;
            }
            item.vstr = v.toString();
        }
    };
    /**
     * 处理数值映射
     * @param field
     * @param item
     * @return
     * true成功处理数值映射，此时无需进行数学运算分析。
     * false无需进行数值映，射此时应该进行数学运算分析。
     */
    DeviceAdapter2.prototype.handleVMapProperty = function (field, item) {
        if (field.hasOwnProperty(DeviceAdapter2.Formate_Field_Option_ValueMap)) {
            var mapName = field[DeviceAdapter2.Formate_Field_Option_ValueMap];
            //console.log(mapName)
            try {
                if (this.valueMap.containsKey(mapName)) {
                    item.vstr = this.valueMap.getItem(mapName).getItem(item.v.toString());
                    //console.log("a->" + field.name + "->" + this.valueMap.getItem(mapName).getItem(item.v.toString()))
                }
                else {
                    item.vstr = ComValueMap_1.ComValueMap[mapName][item.v];
                    //console.log("b->" + field.name + "->" + ComValueMap[mapName][item.v])
                }
                return true;
            }
            catch (error) {
                throw { msg: field[DeviceAdapter2.Formate_Field_Option_Name] + "的数值映射无效！" };
            }
        }
        return false;
    };
    DeviceAdapter2.prototype.handleCtlProperty = function (field) {
        // if (field.hasOwnProperty(DeviceAdapter2.Formate_Field_Option_Ctl)) {
        //     let ctl = field[DeviceAdapter2.Formate_Field_Option_Ctl]
        //     let group = ctl['group']
        //     if (!this.device.KongZhi.containsKey(group)) {
        //         this.device.KongZhi.addItem(group, [])
        //     }
        //     let fnx: Function | null = null
        //     if (ctl.hasOwnProperty(DeviceAdapter2.Formate_Field_Option_Fn)) {
        //         let fninfos = ctl[DeviceAdapter2.Formate_Field_Option_Fn].split('-')
        //         fnx = DeviceAdapter2.Fns[fninfos[0]][fninfos[1]].fn
        //     }
        //     let obj = {
        //         name: field[DeviceAdapter2.Formate_Field_Option_Name],
        //         no: ctl[DeviceAdapter2.Formate_Key_No],
        //         addr: ctl[DeviceAdapter2.Formate_Field_Option_Ctl_Addr],
        //         min: ctl[DeviceAdapter2.Formate_Field_Option_Ctl_Min],
        //         max: ctl[DeviceAdapter2.Formate_Field_Option_Ctl_Max],
        //         v: field[DeviceAdapter2.Formate_Field_Option_Value],
        //         group: ctl[DeviceAdapter2.Formate_Field_Option_Ctl_Group],
        //         fn: fnx
        //     }
        //     this.device.KongZhi.getItem(group).push(new CtlField(obj))
        // }
    };
    DeviceAdapter2.prototype.handleRefProperty = function (field, item) {
        if (field.hasOwnProperty(DeviceAdapter2.Formate_Field_Option_RefType)) {
            var refType = field[DeviceAdapter2.Formate_Field_Option_RefType];
            var index = field[DeviceAdapter2.Formate_Field_Option_RefIndex];
            switch (refType) {
                case DeviceAdapter2.Formate_Field_Option_RefType_Count:
                    //计算属性处理原理：计算属性计算方式存储在count.fn中
                    //参与该计算属性的formate.field的v如果存在，以v为count.fn的参数
                    //如果不存在，则以对应字节数据的v作为count.fn的参数
                    //count.fn运算的结果存储在计算属性count.v中作为中间结果，并在下个关联的formate.field处理中参与到count.fn的运算
                    var count = this.countMap[index];
                    if (!count) {
                        throw { msg: field[DeviceAdapter2.Formate_Field_Option_Name] + "关联的计算点位无效！" };
                    }
                    var v1 = item.v;
                    var v2 = count[DeviceAdapter2.Formate_Field_Option_Value];
                    if (field.hasOwnProperty(DeviceAdapter2.Formate_Field_Option_Value)) {
                        v1 = field[DeviceAdapter2.Formate_Field_Option_Value];
                    }
                    var fninfos = count[DeviceAdapter2.Formate_Field_Option_Fn].split('-');
                    var fnx = DeviceAdapter2.Fns[fninfos[0]][fninfos[1]].fn;
                    var v = fnx(v1, v2);
                    count[DeviceAdapter2.Formate_Field_Option_Value] = v;
                    if (count.hasOwnProperty(DeviceAdapter2.Formate_Field_Option_ValueMap)) {
                        //获取计算属性对应的map映射，将映射的值保存到formate.count的vstr中
                        count[DeviceAdapter2.Formate_Field_Option_VString] = this.valueMap.getItem(count[DeviceAdapter2.Formate_Field_Option_ValueMap]).getItem(v);
                    }
                    break;
                case DeviceAdapter2.Formate_Field_Option_RefType_At:
                    var refgroup = field[DeviceAdapter2.Formate_Field_Option_RefGroup];
                    var emt = this.device.AtMap.getItem(refgroup)[index];
                    if (!emt) {
                        throw { msg: field[DeviceAdapter2.Formate_Field_Option_Name] + "关联的动画元素无效！" };
                    }
                    if (DeviceAdapter2.Formate_Field_AT_Class_Fire == refgroup) {
                        //
                        var typ = emt[DeviceAdapter2.Formate_Field_Option_Type];
                        if (0 == typ) { //如果是无燃烧器的炉子
                            //计算数量，主要用于电炉投入加热组数量的统计
                            //预热炉不会有点位关联到燃烧器
                            var amount = emt[DeviceAdapter2.Formate_Field_Option_Amount];
                            emt[DeviceAdapter2.Formate_Field_Option_Amount] = amount + item.v;
                            return;
                        }
                        if (field.hasOwnProperty('ctl')) {
                            if (0 == item.v) {
                                emt['stop'] = true;
                                emt[DeviceAdapter2.Formate_Field_Option_Value] = 0;
                            }
                            else {
                                emt['stop'] = false;
                                emt[DeviceAdapter2.Formate_Field_Option_Value] = 1;
                            }
                            return;
                        }
                        if (1 == typ) { //一段火处理完毕
                            if (item.v) {
                                emt[DeviceAdapter2.Formate_Field_Option_Value] = 1;
                            }
                            else {
                                emt[DeviceAdapter2.Formate_Field_Option_Value] = 0;
                            }
                            return;
                        }
                        else if (2 == typ) { //如果是二段火
                            if (!emt['stop'] && item.v) { //如果燃烧器打开
                                emt[DeviceAdapter2.Formate_Field_Option_Value]++; // = field[DeviceAdapter2.Formate_Field_Option_Number]
                            }
                        }
                    }
                    else if (DeviceAdapter2.Formate_Field_AT_Class_Beng == refgroup || DeviceAdapter2.Formate_Field_AT_Class_Fan == refgroup) {
                        //获取对应动画元素已经处理的设备点位数量
                        var count_1 = this.atMapCount.getItem(emt.name);
                        //增加处理数量
                        this.atMapCount.addItem(emt.name, count_1 + 1);
                        if (1 == item.v) {
                            emt[DeviceAdapter2.Formate_Field_Option_Value] |= (item.v << count_1);
                        }
                    }
                    break;
            }
        }
    };
    DeviceAdapter2.prototype.handleFocus = function (field, item) {
        if (field.hasOwnProperty(DeviceAdapter2.Formate_Field_Option_Focus)) {
            this.device.Focus.splice(field[DeviceAdapter2.Formate_Field_Option_Focus], 0, item);
        }
    };
    DeviceAdapter2.prototype.handleExceptionField = function (field, num) {
        var level = field[DeviceAdapter2.Formate_Field_Option_ExecptionLevel];
        var item = { "name": field[DeviceAdapter2.Formate_Field_Option_Name], "v": num, "level": level, "vstr": "" };
        if (field.hasOwnProperty(DeviceAdapter2.Formate_Field_Option_Bit)) {
            //取bit位的值进行验证
            var v = 1 << field[DeviceAdapter2.Formate_Field_Option_Bit];
            //判断位与结果是否与原值v相同，相同则发生异常
            if (v == (num & v)) {
                //记录异常信息
                item.v = 1;
                item.vstr = item.name;
                this.device.BaoJing.push(item);
            }
        }
        else if (field.hasOwnProperty(DeviceAdapter2.Formate_Field_Option_ValueMap)) {
            this.handleVMapProperty(field, item);
            this.device.BaoJing.push(item);
        }
        else {
            if (0 < num) {
                //记录异常信息
                item.vstr = item.name;
                this.device.BaoJing.push(item);
            }
        }
    };
    DeviceAdapter2.prototype.handleBitField = function (field, item) {
        if (field.hasOwnProperty(DeviceAdapter2.Formate_Field_Option_Bit)) {
            //取bit位的值进行验证
            var v = 1 << field[DeviceAdapter2.Formate_Field_Option_Bit];
            //判断位与结果是否与原值v相同
            if (v == (item.v & v)) {
                //记录异常信息
                item.v = 1;
            }
            else {
                item.v = 0;
            }
            this.handleVMapProperty(field, item);
            this.handleRefProperty(field, item);
            return true;
        }
        return false;
    };
    DeviceAdapter2.prototype.handleKaiGuanField = function (field, item) {
        //开关必需包含vm属性
        //开关如果不包含bit位，则将item.v>0的值识别位1
        if (!this.handleBitField(field, item)) {
            if (item.v) {
                item.v = 1;
            }
            else {
                item.v = 0;
            }
            this.handleVMapProperty(field, item);
            this.handleRefProperty(field, item);
        }
    };
    //该方法要在handleVMapProperty方法调用后执行
    DeviceAdapter2.prototype.handleSystemStatusField = function (field, item) {
        if (field.hasOwnProperty(DeviceAdapter2.Formate_Field_Option_System_Status)) {
            if (field[DeviceAdapter2.Formate_Field_Option_System_Status]) {
                //this.handleVMapProperty(field, item)
                this.device.Status = item;
            }
        }
    };
    DeviceAdapter2.prototype.handleSystemRunField = function (field, item, count) {
        if (field.hasOwnProperty(DeviceAdapter2.Formate_Field_Option_System_Run)) {
            if (!field.hasOwnProperty(DeviceAdapter2.Formate_Field_Option_Part)) {
                throw { msg: field.name + "缺少 part 属性" };
            }
            if (field[DeviceAdapter2.Formate_Field_Option_System_Run]) {
                //验证是时间的哪一部分
                var p = field[DeviceAdapter2.Formate_Field_Option_Part];
                //为设备添加系统运行时间
                if (!this.device.Run) {
                    //v -1表示未进行过时间处理
                    this.device.Run = { name: this.formate[DeviceAdapter2.Formate_Key_System_Run].name, vstr: '', v: 0 };
                }
                if (2 == count) //如果单数据中包含2个点，则需要对该点进行运算
                 {
                    if (1 == p) {
                        var ds = Math.floor(item.v / 24);
                        this.device.Run.vstr = ds + field.unit + this.device.Run.vstr;
                        item.v = ds;
                        item.vstr = ds + field.unit;
                    }
                    else {
                        var hs = item.v % 24;
                        this.device.Run.vstr = this.device.Run.vstr + hs + field.unit;
                        item.v = hs;
                        item.vstr = hs + field.unit;
                    }
                    //this.device.Run.v = item.v 
                }
                else {
                    if (1 == p) {
                        this.device.Run.vstr = item.v + field.unit + this.device.Run.vstr;
                    }
                    else {
                        this.device.Run.vstr = this.device.Run.vstr + item.v + field.unit;
                    }
                    //this.device.Run.v = 0
                }
            }
        }
    };
    DeviceAdapter2.prototype.handleInputField = function (field, item) {
        if (field.hasOwnProperty(DeviceAdapter2.Formate_Field_Option_Input)) {
            if (null == this.input) {
                throw '该设备未开启0-20mA测量功能，因此不能对' + field[DeviceAdapter2.Formate_Field_Option_Name] + '进行测量';
            }
            var lmax = field[DeviceAdapter2.Formate_Field_Option_Input][DeviceAdapter2.Formate_Field_Option_Ses_Max];
            var lmin = field[DeviceAdapter2.Formate_Field_Option_Input][DeviceAdapter2.Formate_Field_Option_Ses_Min];
            item.v = Math.floor(((lmax - lmin) * (item.v - this.input.min)) / (this.input.max - this.input.min) * 100) / 100 - lmin;
            item.vstr = item.v + field[DeviceAdapter2.Formate_Field_Option_Unit];
            return true;
        }
        return false;
    };
    DeviceAdapter2.prototype.handleKongZhiField = function (key, field, fieldsCount, ctlTyp, num, value, unit) {
        if (field.hasOwnProperty(DeviceAdapter2.Formate_Field_Option_Ctl)) {
            var keyNum = parseInt(key);
            // 如果是可控点位
            var group = field[DeviceAdapter2.Formate_Key_KongZhi][DeviceAdapter2.Formate_Field_Option_Ctl_Group];
            if (fieldsCount > 1) {
                //如果是单点多可控位
                if (keyNum < 10000) {
                    //多线圈控制
                    this.count++;
                    this.mCtlField = new Fields_1.CtlField();
                    this.mCtlField.No = this.deviceNo;
                    this.mCtlField.Typ = Fields_1.CtlField.CTL_TYPE_BYTE;
                    this.mCtlField.Action = Fields_1.CtlField.CTL_ACTION_COI;
                    this.mCtlField.Value = num;
                    var bit = field[DeviceAdapter2.Formate_Field_Option_Bit];
                    var ctlItem = new Fields_1.CtlItem();
                    ctlItem.Name = field[DeviceAdapter2.Formate_Field_Option_Name];
                    ctlItem.Bit = bit;
                    ctlItem.Value = num & (1 << field[DeviceAdapter2.Formate_Field_Option_Bit]);
                    this.mCtlField.Address = NumberUtil_1.NumberUtil.NumberToString(keyNum - 1 + bit, 16, 4);
                    this.mCtlField.addCtlItem(ctlItem);
                    if (this.count == fieldsCount) {
                        this.device.KongZhi.getItem(group).push(this.mCtlField);
                        this.mCtlField = null;
                        this.count = 0;
                    }
                }
                else if (keyNum > 40000) {
                    //只局限于40000寄存器
                    this.count++;
                    if (null == this.mCtlField) {
                        this.mCtlField = new Fields_1.CtlField();
                        this.mCtlField.No = this.deviceNo;
                        this.mCtlField.Typ = Fields_1.CtlField.CTL_TYPE_UINT;
                        this.mCtlField.Action = Fields_1.CtlField.CTL_ACTION_REG;
                        this.mCtlField.Value = num;
                        var adds = keyNum - 40001;
                        this.mCtlField.Address = NumberUtil_1.NumberUtil.NumberToString(adds, 16, 4);
                    }
                    var ctlItem = new Fields_1.CtlItem();
                    ctlItem.Name = field[DeviceAdapter2.Formate_Field_Option_Name];
                    ctlItem.Bit = field[DeviceAdapter2.Formate_Field_Option_Bit];
                    ctlItem.Description = field[DeviceAdapter2.Formate_Key_KongZhi].hasOwnProperty(DeviceAdapter2.Formate_Field_Option_Description) ? field[DeviceAdapter2.Formate_Key_KongZhi][DeviceAdapter2.Formate_Field_Option_Description] : '';
                    ctlItem.Value = num & (1 << field[DeviceAdapter2.Formate_Field_Option_Bit]);
                    this.mCtlField.addCtlItem(ctlItem);
                    if (this.count == fieldsCount) {
                        this.device.KongZhi.getItem(group).push(this.mCtlField);
                        this.mCtlField = null;
                        this.count = 0;
                    }
                }
            }
            else {
                //单点可控
                if (keyNum < 10000) {
                    var ctlField = new Fields_1.CtlField();
                    ctlField.No = this.deviceNo;
                    ctlField.Typ = Fields_1.CtlField.CTL_TYPE_BYTE;
                    var adds = keyNum - 1;
                    ctlField.Address = NumberUtil_1.NumberUtil.NumberToString(adds, 16, 4);
                    ctlField.Action = Fields_1.CtlField.CTL_ACTION_COI;
                    ctlField.Value = num;
                    var ctlItem = new Fields_1.CtlItem();
                    ctlItem.Name = field[DeviceAdapter2.Formate_Field_Option_Name];
                    ctlItem.Description = field[DeviceAdapter2.Formate_Key_KongZhi].hasOwnProperty(DeviceAdapter2.Formate_Field_Option_Description) ? field[DeviceAdapter2.Formate_Key_KongZhi][DeviceAdapter2.Formate_Field_Option_Description] : '';
                    ctlItem.Value = ctlField.Value;
                    ctlField.addCtlItem(ctlItem);
                    this.device.KongZhi.getItem(group).push(ctlField);
                }
                else {
                    var ctlField = new Fields_1.CtlField();
                    ctlField.No = this.deviceNo;
                    ctlField.Typ = ctlTyp;
                    var adds = keyNum - 40001;
                    ctlField.Address = NumberUtil_1.NumberUtil.NumberToString(adds, 16, 4);
                    if (Fields_1.CtlField.CTL_TYPE_UINT == ctlTyp) {
                        ctlField.Action = Fields_1.CtlField.CTL_ACTION_REG;
                    }
                    else if (Fields_1.CtlField.CTL_TYPE_FLOAT == ctlTyp) {
                        ctlField.Action = Fields_1.CtlField.CTL_ACTION_REG_2;
                    }
                    else if (Fields_1.CtlField.CTL_TYPE_LONG == ctlTyp) {
                        ctlField.Action = Fields_1.CtlField.CTL_ACTION_REG_2;
                    }
                    var ctlItem = new Fields_1.CtlItem();
                    ctlItem.Name = field[DeviceAdapter2.Formate_Field_Option_Name];
                    ctlItem.Description = field[DeviceAdapter2.Formate_Key_KongZhi].hasOwnProperty(DeviceAdapter2.Formate_Field_Option_Description) ? field[DeviceAdapter2.Formate_Key_KongZhi][DeviceAdapter2.Formate_Field_Option_Description] : '';
                    //设置控制点位在UI初始化是显示的数值
                    ctlItem.Value = value;
                    //设置控制点位在UI初始化是显示的单位
                    ctlItem.Unit = unit;
                    ctlField.addCtlItem(ctlItem);
                    this.device.KongZhi.getItem(group).push(ctlField);
                }
            }
        }
    };
    //解析数据
    DeviceAdapter2.prototype.handlerData = function (data) {
        var _this = this;
        if (!data.length) {
            this.isNUll = true;
            return;
        }
        else {
            //清理atMapCount
            this.atMapCount.each(function (k, v) {
                _this.atMapCount.addItem(k, 0);
            });
            this.isNUll = false;
        }
        this.Init2();
        for (var _i = 0, _a = Object.keys(this.formate[DeviceAdapter2.Formate_Key_DataMap]); _i < _a.length; _i++) {
            var key = _a[_i];
            if (this.formate[DeviceAdapter2.Formate_Key_DataMap].hasOwnProperty(key)) {
                //
                //获取当前key所对应的字节索引 如key 40001 对应的字节索引
                var index = this.addrMap[key];
                //取出数据解析点位对象
                var point = this.formate[DeviceAdapter2.Formate_Key_DataMap][key];
                var typ = 1;
                var mask = null;
                var endian = Endian_1.Endian.Big;
                //判断点位类型
                if (point.hasOwnProperty(DeviceAdapter2.Formate_Key_Point_Type)) {
                    typ = point[DeviceAdapter2.Formate_Key_Point_Type];
                }
                //保存大小端选项
                if (point.hasOwnProperty(DeviceAdapter2.Formate_Key_Point_Endina)) {
                    endian = point[DeviceAdapter2.Formate_Key_Point_Endina];
                }
                //判断是否有掩码
                if (point.hasOwnProperty(DeviceAdapter2.Formate_Key_Point_Mask)) {
                    mask = point[DeviceAdapter2.Formate_Key_Point_Mask];
                }
                //获取字节数据
                var num = 0;
                var ctlTyp = -1;
                if (0 == typ) { //字节型数据
                    num = Endian_1.Endian.HandleBytes(endian, data[index]);
                    ctlTyp = Fields_1.CtlField.CTL_TYPE_BYTE;
                }
                else if (1 == typ) {
                    num = Endian_1.Endian.HandleBytes(endian, data[index], data[index + 1]);
                    ctlTyp = Fields_1.CtlField.CTL_TYPE_UINT;
                    if (mask) {
                        if (num == mask) {
                            continue;
                        }
                    }
                }
                else if (2 == typ) {
                    num = Endian_1.Endian.HandleBytes(endian, data[index], data[index + 1], data[index + 2], data[index + 3]);
                    ctlTyp = Fields_1.CtlField.CTL_TYPE_FLOAT;
                    if (mask) {
                        if (num == mask) {
                            continue;
                        }
                    }
                    var dv = new DataView(new ArrayBuffer(4));
                    dv.setInt32(0, num);
                    num = Math.round(dv.getFloat32(0) * 100) / 100;
                }
                else if (3 == typ) {
                    num = Endian_1.Endian.HandleBytes(endian, data[index], data[index + 1], data[index + 2], data[index + 3]);
                    ctlTyp = Fields_1.CtlField.CTL_TYPE_LONG;
                    if (mask) {
                        if (num == mask) {
                            continue;
                        }
                    }
                }
                var fields = point[DeviceAdapter2.Formate_Key_Point_Fields];
                for (var index_1 in fields) {
                    var field = fields[index_1];
                    //首先处理控制点
                    if (DeviceAdapter2.Formate_Type_Exception == field.typ) { //如果是报警
                        this.handleExceptionField(field, num);
                    }
                    else if (DeviceAdapter2.Formate_Type_JiBen == field.typ) { //如果是基本信息
                        var item = { "name": field[DeviceAdapter2.Formate_Field_Option_Name], "v": num, "vstr": '' };
                        if (!this.handleBitField(field, item)) {
                            if (!this.handleVMapProperty(field, item)) {
                                this.handleMathActionProperty(num, field, item);
                            }
                        }
                        this.handleInputField(field, item);
                        this.handleFocus(field, item);
                        if (field.hasOwnProperty(DeviceAdapter2.Formate_Field_Option_System_Run)) {
                            //必需放在this.device.JiBen.push(item)的上一步执行，用来校正handleMathActionProperty造成的点位的vstr内容错误
                            this.handleSystemRunField(field, item, fields.length);
                        }
                        else {
                            this.handleSystemStatusField(field, item);
                        }
                        this.handleKongZhiField(key, field, fields.length, ctlTyp, num, item.v, field[DeviceAdapter2.Formate_Field_Option_Unit]);
                        this.device.JiBen.push(item);
                    }
                    else if (DeviceAdapter2.Formate_Type_WenDu == field.typ) { //如果是温度
                        var item = { "name": field[DeviceAdapter2.Formate_Field_Option_Name], "v": 0, "vstr": '' };
                        this.handleMathActionProperty(num, field, item);
                        this.handleInputField(field, item);
                        this.handleFocus(field, item);
                        this.handleKongZhiField(key, field, fields.length, ctlTyp, num, item.v, field[DeviceAdapter2.Formate_Field_Option_Unit]);
                        this.device.WenDu.push(item);
                    }
                    else if (DeviceAdapter2.Formate_Type_Yali == field.typ) { //如果是压力
                        var item = { "name": field[DeviceAdapter2.Formate_Field_Option_Name], "v": 0, "vstr": '' };
                        this.handleMathActionProperty(num, field, item);
                        this.handleInputField(field, item);
                        this.handleFocus(field, item);
                        this.handleKongZhiField(key, field, fields.length, ctlTyp, num, item.v, field[DeviceAdapter2.Formate_Field_Option_Unit]);
                        this.device.YaLi.push(item);
                    }
                    else if (DeviceAdapter2.Formate_Type_LiuLiang == field.typ) { //如果是流量
                        var item = { "name": field[DeviceAdapter2.Formate_Field_Option_Name], "v": 0, "vstr": '' };
                        this.handleMathActionProperty(num, field, item);
                        this.handleInputField(field, item);
                        this.handleFocus(field, item);
                        this.handleKongZhiField(key, field, fields.length, ctlTyp, num, item.v, field[DeviceAdapter2.Formate_Field_Option_Unit]);
                        this.device.LiuLiang.push(item);
                    }
                    else if (DeviceAdapter2.Formate_Type_KaiGuan == field.typ) { //如果是开关
                        //框架不再提供固定vm，因此要求开关点必需要有vm属性
                        var item = { "name": field[DeviceAdapter2.Formate_Field_Option_Name], "v": num, "vstr": '' };
                        this.handleKaiGuanField(field, item);
                        this.handleKongZhiField(key, field, fields.length, ctlTyp, num, item.v, field[DeviceAdapter2.Formate_Field_Option_Unit]);
                        this.device.KaiGuan.push(item);
                    }
                    else if (DeviceAdapter2.Formate_Type_SheZhi == field.typ) { //如果是设置
                        var item = { "name": field[DeviceAdapter2.Formate_Field_Option_Name], "v": num, "vstr": '' };
                        //console.log("*****************" + field.name + "********************")
                        if (!this.handleBitField(field, item)) {
                            if (!this.handleVMapProperty(field, item)) {
                                this.handleMathActionProperty(num, field, item);
                            }
                        }
                        this.handleKongZhiField(key, field, fields.length, ctlTyp, num, item.v, field[DeviceAdapter2.Formate_Field_Option_Unit]);
                        this.device.SheZhi.push(item);
                        //console.log("*****************" + field.name + "********************")
                        //this.handleCtlProperty(field)
                    }
                    else if (DeviceAdapter2.Formate_Type_SheBei == field.typ) { //如果是设备
                        var item = { "name": field[DeviceAdapter2.Formate_Field_Option_Name], "v": num, "vstr": '' };
                        if (this.handleBitField(field, item)) {
                            this.handleRefProperty(field, item);
                        }
                        else {
                            if (!this.handleVMapProperty(field, item)) {
                                this.handleMathActionProperty(num, field, item);
                            }
                            this.handleRefProperty(field, item);
                        }
                        this.handleKongZhiField(key, field, fields.length, ctlTyp, num, item.v, field[DeviceAdapter2.Formate_Field_Option_Unit]);
                        this.device.SheBei.push(item);
                    }
                    else if (DeviceAdapter2.Formate_Type_DingShi == field.typ) {
                        var idx = field[DeviceAdapter2.Formate_Field_Option_Index];
                        var part = field[DeviceAdapter2.Formate_Field_Option_Part];
                        var item = this.device.DingShi[idx];
                        if (1 == part) {
                            item["h"] = num;
                        }
                        else if (2 == part) {
                            item['m'] = num;
                        }
                        else {
                            item['h'] = Math.floor(num / 60);
                            item['m'] = num % 60;
                        }
                        this.handleKongZhiField(key, field, fields.length, ctlTyp, num, item.v, field[DeviceAdapter2.Formate_Field_Option_Unit]);
                    }
                }
            }
        }
    };
    Object.defineProperty(DeviceAdapter2.prototype, "Device", {
        get: function () {
            var _this = this;
            if (this.isNUll) {
                return null;
            }
            //添加计算点位到基本信息
            this.countMap.forEach(function (v, i) {
                var item = { "name": v[DeviceAdapter2.Formate_Field_Option_Name], "v": v[DeviceAdapter2.Formate_Field_Option_Value], "vstr": v[DeviceAdapter2.Formate_Field_Option_VString] };
                _this.device.JiBen.push(item);
            });
            return this.device;
        },
        enumerable: false,
        configurable: true
    });
    DeviceAdapter2.FnGroups = [
        "算术运算",
        "时间运算"
    ];
    DeviceAdapter2.Fns = [[
            { "title": "累加", "desc": "详细介绍信息", "fn": function (a, b) { return a + b; } },
            { "title": "除10", "desc": "详细介绍信息", "fn": function (v) { return Math.floor(v / 10); } },
            { "title": "除100", "desc": "详细介绍信息", "fn": function (v) { return Math.floor(v / 100); } },
            { "title": "除1000", "desc": "详细介绍信息", "fn": function (v) { return Math.floor(v / 1000); } }
        ], [
            { "title": "时分合并", "desc": "详细介绍信息", "fn": function (h, m) { return h * 60 + m; } },
            { "title": "时分拆解", "desc": "详细介绍信息", "fn": function (a) { return [Math.floor(a / 60), a % 60]; } },
            { "title": "天时拆解", "desc": "详细介绍信息", "fn": function (a) { return [Math.floor(a / 24), a % 24]; } },
        ]];
    //控制目标线圈类型
    DeviceAdapter2.CTL_TAG_CLC = 0;
    //控制目标寄存器类型
    DeviceAdapter2.CTL_TAG_REG = 1;
    DeviceAdapter2.Formate_Type_Exception = 0;
    DeviceAdapter2.Formate_Type_JiBen = 1;
    DeviceAdapter2.Formate_Type_WenDu = 2;
    DeviceAdapter2.Formate_Type_Yali = 3;
    DeviceAdapter2.Formate_Type_LiuLiang = 4;
    DeviceAdapter2.Formate_Type_KaiGuan = 5;
    DeviceAdapter2.Formate_Type_SheZhi = 6;
    DeviceAdapter2.Formate_Type_SheBei = 7;
    DeviceAdapter2.Formate_Type_DingShi = 8;
    DeviceAdapter2.Formate_Key_Action = 'action';
    DeviceAdapter2.Formate_Key_ValueMap = 'valuemap';
    DeviceAdapter2.Formate_Key_AtMap = 'atmap';
    DeviceAdapter2.Formate_Key_DingShi = 'dingshi';
    DeviceAdapter2.Formate_Key_KongZhi = 'kongzhi';
    DeviceAdapter2.Formate_Key_FixFields = 'fixfields';
    DeviceAdapter2.Formate_Key_No = 'no';
    DeviceAdapter2.Formate_Key_Power = 'power';
    DeviceAdapter2.Formate_Key_Media = 'media';
    DeviceAdapter2.Formate_Key_System_Run = 'sysrun';
    DeviceAdapter2.Formate_Key_Input = 'input'; //输入寄存器
    DeviceAdapter2.Formate_Key_CountMap = 'countmap';
    DeviceAdapter2.Formate_Key_DataMap = 'datamap';
    DeviceAdapter2.Formate_Key_Point_Fields = 'fields';
    DeviceAdapter2.Formate_Key_Point_Endina = 'endian';
    DeviceAdapter2.Formate_Key_Point_Mask = 'mask';
    DeviceAdapter2.Formate_Key_Point_Type = 'typ';
    DeviceAdapter2.Formate_Field_AT_Class_Fire = 'fire';
    DeviceAdapter2.Formate_Field_AT_Class_Beng = 'beng';
    DeviceAdapter2.Formate_Field_AT_Class_Fan = 'fan';
    DeviceAdapter2.Formate_Field_Option_System_Status = 'systatus';
    DeviceAdapter2.Formate_Field_Option_System_Run = 'sysrun';
    DeviceAdapter2.Formate_Field_Option_Type = 'typ';
    DeviceAdapter2.Formate_Field_Option_Name = 'name';
    DeviceAdapter2.Formate_Field_Option_Bit = 'bit';
    DeviceAdapter2.Formate_Field_Option_Input = 'input'; //点位输入量程
    DeviceAdapter2.Formate_Field_Option_Ses_Min = 'lmin'; //点位量程最小值
    DeviceAdapter2.Formate_Field_Option_Ses_Max = 'lmax'; //点位量程最大值
    DeviceAdapter2.Formate_Field_Option_Description = 'desc';
    DeviceAdapter2.Formate_Field_Option_Ctl = 'kz';
    DeviceAdapter2.Formate_Field_Option_Ctl_Mode = 'mode';
    DeviceAdapter2.Formate_Field_Option_Ctl_Addr = 'addr';
    DeviceAdapter2.Formate_Field_Option_Ctl_Min = 'min';
    DeviceAdapter2.Formate_Field_Option_Ctl_Max = 'max';
    DeviceAdapter2.Formate_Field_Option_Ctl_Group = 'group';
    DeviceAdapter2.Formate_Field_Option_Ctl_Fn = 'fn';
    DeviceAdapter2.Formate_Field_Option_MathAction = 'mat';
    DeviceAdapter2.Formate_Field_Option_MathAction_Div = 'div';
    DeviceAdapter2.Formate_Field_Option_MathAction_Mod = 'mod';
    DeviceAdapter2.Formate_Field_Option_Number = 'number';
    DeviceAdapter2.Formate_Field_Option_Unit = 'unit';
    DeviceAdapter2.Formate_Field_Option_Focus = 'focus';
    DeviceAdapter2.Formate_Field_Option_ValueMap = 'vm';
    DeviceAdapter2.Formate_Field_Option_ExecptionLevel = 'level';
    DeviceAdapter2.Formate_Field_Option_VString = 'vstr';
    DeviceAdapter2.Formate_Field_Option_RefType = 'reftyp'; //关联类型
    DeviceAdapter2.Formate_Field_Option_RefType_Count = 'count'; //关联到计算点位
    DeviceAdapter2.Formate_Field_Option_RefType_At = 'at'; //关联到动画
    DeviceAdapter2.Formate_Field_Option_RefGroup = 'refgroup'; //关联的元素
    DeviceAdapter2.Formate_Field_Option_RefIndex = 'refindex'; //关联具体动画项目
    DeviceAdapter2.Formate_Field_Option_Fn = 'fn'; //关联的元素
    DeviceAdapter2.Formate_Field_Option_Value = 'v';
    DeviceAdapter2.Formate_Field_Option_Amount = 'amount';
    DeviceAdapter2.Formate_Field_Option_Part = 'part';
    DeviceAdapter2.Formate_Field_Option_Index = 'index';
    return DeviceAdapter2;
}());
exports.DeviceAdapter2 = DeviceAdapter2;
//增加长整数，0，1开始的点位
