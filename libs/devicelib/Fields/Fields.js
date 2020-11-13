"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CtlField = exports.CtlItem = exports.POINT_TYPE_STRING = exports.POINT_TYPE_LONG = exports.POINT_TYPE_FLOAT = exports.POINT_TYPE_UINT = exports.POINT_TYPE_BYTE = void 0;
var NumberUtil_1 = require("../tools/NumberUtil");
var CRC16Util_1 = require("../tools/CRC16Util");
var Endian_1 = require("../Endian/Endian");
exports.POINT_TYPE_BYTE = 0;
exports.POINT_TYPE_UINT = 1;
exports.POINT_TYPE_FLOAT = 2;
exports.POINT_TYPE_LONG = 3;
exports.POINT_TYPE_STRING = 4;
var CtlItem = /** @class */ (function () {
    function CtlItem() {
        this.name = '';
        this.min = 0;
        this.max = 0;
        this.group = 1;
        this.fn = null;
        this.v = 0;
        this.desc = '';
        this.bit = null;
        this.unit = '';
        //是否生成控制命令
        this.flag = false;
    }
    Object.defineProperty(CtlItem.prototype, "Flag", {
        get: function () {
            return this.flag;
        },
        set: function (flag) {
            this.flag = flag;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CtlItem.prototype, "Unit", {
        get: function () {
            return this.unit;
        },
        set: function (unit) {
            this.unit = unit;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CtlItem.prototype, "Bit", {
        get: function () {
            return this.bit;
        },
        set: function (bit) {
            this.bit = bit;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CtlItem.prototype, "Description", {
        get: function () {
            return this.desc;
        },
        set: function (desc) {
            this.desc = desc;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CtlItem.prototype, "Name", {
        get: function () {
            return this.name;
        },
        set: function (name) {
            this.name = name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CtlItem.prototype, "Max", {
        get: function () {
            return this.max;
        },
        set: function (max) {
            this.max = max;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CtlItem.prototype, "Min", {
        get: function () {
            return this.min;
        },
        set: function (min) {
            this.min = min;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CtlItem.prototype, "Group", {
        get: function () {
            return this.group;
        },
        set: function (group) {
            this.group = group;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CtlItem.prototype, "Fnc", {
        set: function (fn) {
            this.fn = fn;
        },
        enumerable: false,
        configurable: true
    });
    CtlItem.prototype.setValue = function (v) {
        this.v = v;
    };
    Object.defineProperty(CtlItem.prototype, "Value", {
        get: function () {
            return this.v;
        },
        set: function (v) {
            this.flag = true;
            this.v = v;
        },
        enumerable: false,
        configurable: true
    });
    return CtlItem;
}());
exports.CtlItem = CtlItem;
// export class CtlField {
//     no: string = '01';
//     addr: string = '00';
//     min: number = 0;
//     max: number = 0;
//     group: number = 1;
//     fn: Function | null = null;
//     v: number = 0;
//     desc: string = ''
//     constructor(ctl: any) {
//         this.no = ctl['no'];
//         this.addr = ctl['addr'];
//         this.min = ctl['min'];
//         this.max = ctl['max'];
//         this.group = ctl['group'];
//         this.fn = ctl['fn'];
//         this.v = 0;
//         this.desc = ctl['desc']
//     }
//     setValue(v: number) {
//         if (this.fn) {
//             this.v = this.fn(v)
//             return
//         }
//         this.v = v
//     }
// }
var CtlField = /** @class */ (function () {
    function CtlField() {
        this.ctls = [];
        this.endian = Endian_1.Endian.Big;
        this.v = 0;
        this.action = '03';
        this.addr = '00';
        this.typ = 0;
        this.no = 1;
    }
    Object.defineProperty(CtlField.prototype, "Endian", {
        get: function () {
            return this.endian;
        },
        set: function (v) {
            this.endian = v;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CtlField.prototype, "Value", {
        get: function () {
            return this.v;
        },
        set: function (v) {
            this.v = v;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CtlField.prototype, "Action", {
        get: function () {
            return this.action;
        },
        set: function (action) {
            this.action = action;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CtlField.prototype, "Address", {
        get: function () {
            return this.addr;
        },
        set: function (addr) {
            this.addr = addr;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CtlField.prototype, "Typ", {
        get: function () {
            return this.typ;
        },
        set: function (typ) {
            this.typ = typ;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CtlField.prototype, "No", {
        get: function () {
            return this.no;
        },
        set: function (no) {
            this.no = no;
        },
        enumerable: false,
        configurable: true
    });
    CtlField.prototype.addCtlItem = function (ctlItem) {
        this.ctls.push(ctlItem);
    };
    CtlField.prototype.getCtlItems = function () {
        for (var i in this.ctls) {
            var bit = this.ctls[i].Bit;
            if (null != bit) {
                this.ctls[i].setValue(this.v & (1 << bit));
                continue;
            }
            this.ctls[i].setValue(this.v);
        }
        return this.ctls;
    };
    Object.defineProperty(CtlField.prototype, "Command", {
        get: function () {
            if (this.ctls.length == 1) {
                if (this.ctls[0].Flag) {
                    //通过desc进行fn功能描述，让用户自己进行计算输入
                    if (exports.POINT_TYPE_BYTE == this.typ) {
                        var baseStr = '';
                        if (this.ctls[0].Value > 0) {
                            baseStr = NumberUtil_1.NumberUtil.NumberToString(this.no, 16, 2) + this.action + this.addr + 'FF00';
                        }
                        else {
                            baseStr = NumberUtil_1.NumberUtil.NumberToString(this.no, 16, 2) + this.action + this.addr + '0000';
                        }
                        var data = CtlField.toNumbers(baseStr);
                        return baseStr + CRC16Util_1.CRC16Util.getCrc(CRC16Util_1.CRC16Util.calcCrc16(data, 0, data.length)) + '0000000000';
                    }
                    else if (exports.POINT_TYPE_UINT == this.typ) { //如果是整数
                        var vstr = NumberUtil_1.NumberUtil.NumberToString(this.ctls[0].Value, 16, 4);
                        if (Endian_1.Endian.Little == this.endian) { //如果是小段模式
                            var A = vstr.substr(0, 2);
                            var B = vstr.substr(2, 2);
                            vstr = B + A;
                        }
                        var baseStr = NumberUtil_1.NumberUtil.NumberToString(this.no, 16, 2) + this.action + this.addr + vstr;
                        var data = CtlField.toNumbers(baseStr);
                        return baseStr + CRC16Util_1.CRC16Util.getCrc(CRC16Util_1.CRC16Util.calcCrc16(data, 0, data.length)) + '0000000000';
                    }
                    else if (exports.POINT_TYPE_FLOAT == this.typ) { //如果是浮点数
                        var view = new DataView(new ArrayBuffer(4));
                        view.setFloat32(0, this.ctls[0].Value, false);
                        var A = NumberUtil_1.NumberUtil.NumberToString(view.getUint8(0), 16, 2);
                        var B = NumberUtil_1.NumberUtil.NumberToString(view.getUint8(1), 16, 2);
                        var C = NumberUtil_1.NumberUtil.NumberToString(view.getUint8(2), 16, 2);
                        var D = NumberUtil_1.NumberUtil.NumberToString(view.getUint8(3), 16, 2);
                        var valueString = '';
                        if (Endian_1.Endian.Big == this.endian) {
                            valueString = A + B + C + D;
                        }
                        else if (Endian_1.Endian.Little == this.endian) { //如果是小段模式
                            valueString = D + C + B + A;
                        }
                        else {
                            valueString = C + D + A + B;
                        }
                        var baseStr = NumberUtil_1.NumberUtil.NumberToString(this.no, 16, 2) + this.action + this.addr + '000204' + valueString;
                        var data = CtlField.toNumbers(baseStr);
                        return baseStr + CRC16Util_1.CRC16Util.getCrc(CRC16Util_1.CRC16Util.calcCrc16(data, 0, data.length));
                    }
                    else { //如果是长整数
                        var vstr = NumberUtil_1.NumberUtil.NumberToString(this.ctls[0].Value, 16, 8);
                        var A = vstr.substr(0, 2);
                        var B = vstr.substr(2, 2);
                        var C = vstr.substr(4, 2);
                        var D = vstr.substr(6, 2);
                        if (Endian_1.Endian.Big == this.endian) {
                            vstr = A + B + C + D;
                        }
                        else if (Endian_1.Endian.Little == this.endian) { //如果是小段模式
                            vstr = D + C + B + A;
                        }
                        else {
                            vstr = C + D + A + B;
                        }
                        var baseStr = NumberUtil_1.NumberUtil.NumberToString(this.no, 16, 2) + this.action + this.addr + '000204' + vstr;
                        var data = CtlField.toNumbers(baseStr);
                        return baseStr + CRC16Util_1.CRC16Util.getCrc(CRC16Util_1.CRC16Util.calcCrc16(data, 0, data.length));
                    }
                }
                return '';
            }
            else if (this.ctls.length > 1) {
                //此时肯定为整数
                var v = 0;
                for (var i in this.ctls) {
                    var bit = this.ctls[i].Bit;
                    if (null != bit) {
                        if (this.ctls[i].Value) {
                            v = this.v | (1 << bit);
                        }
                        else {
                            v = this.v & (~(0xffff & (1 << bit)));
                        }
                    }
                }
                var vstr = NumberUtil_1.NumberUtil.NumberToString(this.ctls[0].Value, 16, 4);
                if (Endian_1.Endian.Little == this.endian) { //如果是小段模式
                    var A = vstr.substr(0, 2);
                    var B = vstr.substr(2, 2);
                    vstr = B + A;
                }
                var baseStr = NumberUtil_1.NumberUtil.NumberToString(this.no, 16, 2) + this.action + this.addr + vstr;
                var data = CtlField.toNumbers(baseStr);
                return baseStr + CRC16Util_1.CRC16Util.getCrc(CRC16Util_1.CRC16Util.calcCrc16(data, 0, data.length)) + '0000000000';
            }
            else {
                return '';
            }
        },
        enumerable: false,
        configurable: true
    });
    CtlField.hexStringToBytes = function (str) {
        if (null != str && str.length != 0) {
            var len = str.length / 2;
            var bytes = new ArrayBuffer(len);
            var v = new Uint8Array(bytes);
            for (var i = 0; i < len; i++) {
                v[i] = (parseInt(str.substr(i * 2, 2), 16));
            }
            return v;
        }
        return null;
    };
    CtlField.toNumbers = function (str) {
        var numbers = [];
        if (null != str && str.length != 0) {
            var len = str.length / 2;
            for (var i = 0; i < len; i++) {
                //console.log(str.substr(i * 2, 2))
                numbers.push(parseInt(str.substr(i * 2, 2), 16));
            }
        }
        return numbers;
    };
    CtlField.intToBytes4 = function (n) {
        var b = new ArrayBuffer(4);
        var v = new Uint8Array(b);
        for (var i = 0; i < 4; i++) {
            v[i] = (n >> (24 - i * 8));
        }
        return b;
    };
    CtlField.CTL_ACTION_COI = '05';
    CtlField.CTL_ACTION_REG = '06';
    CtlField.CTL_ACTION_REG_2 = '10';
    return CtlField;
}());
exports.CtlField = CtlField;
//锅炉上线的确定
//微信使用频率
