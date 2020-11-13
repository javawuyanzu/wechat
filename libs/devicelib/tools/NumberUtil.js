"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberUtil = void 0;
var NumberUtil = /** @class */ (function () {
    function NumberUtil() {
    }
    NumberUtil.StringtoNumbers = function (str) {
        var numbers = [];
        if (null != str && str.length != 0) {
            var len = str.length / 2;
            for (var i = 0; i < len; i++) {
                numbers.push(parseInt(str.substr(i * 2, 2), 16));
            }
        }
        return numbers;
    };
    NumberUtil.NumberToString = function (x, stringType, length) {
        if (stringType === void 0) { stringType = 10; }
        if (length === void 0) { length = 10; }
        var str = x.toString(stringType);
        for (var i = str.length; i < length; i++) {
            str = ('0' + str);
        }
        return str;
    };
    return NumberUtil;
}());
exports.NumberUtil = NumberUtil;
