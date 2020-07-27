"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Endian = void 0;
var Endian = /** @class */ (function () {
    function Endian() {
    }
    Endian.Info = function () {
        /**
         * 数据结构说明
         * 【 外层数组元素索引顺序与点位数据类型对应 0字节型数据 1整型数据 2浮点型数据 3长整型数据
         * 【】内层数组元素值为微信上面显示的数据格式选项，元素索引与  0大端模式 1小端模式 2混合模式 对应
         * 】
         * */
        return [
            ["auto"],
            ["A B", "B A"],
            ["A B C D", "D C B A", "CD AB"],
            ["A B C D", "D C B A", "CD AB"],
        ];
    };
    Endian.HandleBytes = function (endianType) {
        var bytes = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            bytes[_i - 1] = arguments[_i];
        }
        var num = 0;
        if (0 == endianType) {
            for (var i = 0; i < bytes.length; i++) {
                num = num << 8 | bytes[i];
            }
        }
        else if (1 == endianType) {
            for (var i = bytes.length; i >= 0; i--) {
                num = num << 8 | bytes[i];
            }
        }
        else if (2 == endianType) {
            if (bytes.length == 4) {
                num = (bytes[2] << 24 | bytes[3] << 16) | (bytes[0] << 8 | bytes[1]);
            }
        }
        return num;
    };
    /**
     * 0 大端模式
     * 1 小段模式
     * 2 混合模式
     * Endian
     * 0   大端模式
     * 整数
     * A B 0 大端模式
     * B A 1 小端模式
     * 浮点数/长整数
     * A B C D 0大端模式
     * D C B A 1小段模式
     * C D A B 2混合模式
     *
     */
    Endian.Big = 0; // 大端
    Endian.Little = 1; //小端
    Endian.Mixins = 2; //混合
    return Endian;
}());
exports.Endian = Endian;
