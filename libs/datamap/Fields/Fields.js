"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CtlField = exports.CtlItem = void 0;
var NumberUtil_1 = require("../tools/NumberUtil");
var CRC16Util_1 = require("../tools/CRC16Util");
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
    }
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
    Object.defineProperty(CtlItem.prototype, "Value", {
        get: function () {
            return this.v;
        },
        set: function (v) {
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
        this.v = 0;
        this.action = '03';
        this.addr = '00';
        this.typ = 0;
        this.no = 1;
    }
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
            var bit = this.ctls[i].bit;
            if (null != bit) {
                this.ctls[i].v = this.v & (1 << bit);
                continue;
            }
            this.ctls[i].v = this.v;
        }
        return this.ctls;
    };
    Object.defineProperty(CtlField.prototype, "Command", {
        get: function () {
            if (this.ctls.length == 1) {
                //通过desc进行fn功能描述，让用户自己进行计算输入
                if (CtlField.CTL_TYPE_BYTE == this.typ) {
                    var baseStr = '';
                    if (this.ctls[0].v > 0) {
                        baseStr = NumberUtil_1.NumberUtil.NumberToString(this.no, 16, 2) + this.action + this.addr + 'FF00';
                    }
                    else {
                        baseStr = NumberUtil_1.NumberUtil.NumberToString(this.no, 16, 2) + this.action + this.addr + '0000';
                    }
                    var data = CtlField.toNumbers(baseStr);
                    return baseStr + CRC16Util_1.CRC16Util.getCrc(CRC16Util_1.CRC16Util.calcCrc16(data, 0, data.length)) + '0000000000';
                }
                else if (CtlField.CTL_TYPE_UINT == this.typ) { //如果是整数
                    var baseStr = NumberUtil_1.NumberUtil.NumberToString(this.no, 16, 2) + this.action + this.addr + NumberUtil_1.NumberUtil.NumberToString(this.ctls[0].v, 16, 4);
                    var data = CtlField.toNumbers(baseStr);
                    return baseStr + CRC16Util_1.CRC16Util.getCrc(CRC16Util_1.CRC16Util.calcCrc16(data, 0, data.length)) + '0000000000';
                }
                else if (CtlField.CTL_TYPE_FLOAT == this.typ) { //如果是浮点数
                    var view = new DataView(new ArrayBuffer(4));
                    view.setFloat32(0, this.ctls[0].v, false);
                    var valueString = NumberUtil_1.NumberUtil.NumberToString(view.getUint8(0), 16, 2) +
                        NumberUtil_1.NumberUtil.NumberToString(view.getUint8(1), 16, 2) +
                        NumberUtil_1.NumberUtil.NumberToString(view.getUint8(2), 16, 2) +
                        NumberUtil_1.NumberUtil.NumberToString(view.getUint8(3), 16, 2);
                    var baseStr = NumberUtil_1.NumberUtil.NumberToString(this.no, 16, 2) + this.action + this.addr + '000204' + valueString;
                    var data = CtlField.toNumbers(baseStr);
                    return baseStr + CRC16Util_1.CRC16Util.getCrc(CRC16Util_1.CRC16Util.calcCrc16(data, 0, data.length));
                }
                else { //如果是长整数
                    var baseStr = NumberUtil_1.NumberUtil.NumberToString(this.no, 16, 2) + this.action + this.addr + '000204' + NumberUtil_1.NumberUtil.NumberToString(this.ctls[0].v, 16, 8);
                    var data = CtlField.toNumbers(baseStr);
                    return baseStr + CRC16Util_1.CRC16Util.getCrc(CRC16Util_1.CRC16Util.calcCrc16(data, 0, data.length));
                }
            }
            else if (this.ctls.length > 1) {
                //此时肯定为整数
                var v = 0;
                for (var i in this.ctls) {
                    var bit = this.ctls[i].bit;
                    if (null != bit) {
                        if (this.ctls[i].v) {
                            v = this.v | (1 << bit);
                        }
                        else {
                            v = this.v & (~(0xffff & (1 << bit)));
                        }
                    }
                }
                var baseStr = NumberUtil_1.NumberUtil.NumberToString(this.no, 16, 2) + this.action + this.addr + NumberUtil_1.NumberUtil.NumberToString(this.ctls[0].v, 16, 4);
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
    CtlField.CTL_TYPE_BYTE = 0;
    CtlField.CTL_TYPE_UINT = 1;
    CtlField.CTL_TYPE_FLOAT = 2;
    CtlField.CTL_TYPE_LONG = 3;
    CtlField.CTL_ACTION_COI = '05';
    CtlField.CTL_ACTION_REG = '06';
    CtlField.CTL_ACTION_REG_2 = '10';
    return CtlField;
}());
exports.CtlField = CtlField;
//锅炉上线的确定
//微信使用频率
