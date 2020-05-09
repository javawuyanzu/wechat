"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var X7_1 = require("../X7");
var meta_1 = require("../../../../../meta/RT/meta");
module.exports = /** @class */ (function (_super) {
    __extends(Map_CTL_RT_X7_3, _super);
    function Map_CTL_RT_X7_3() {
        var _this = _super.call(this) || this;
        _this.addPoint(new meta_1.OpenCloseField("oc_bianpinqiguzhang", 5, 2, "变频器故障", 1, Map_CTL_RT_X7_3.coms_open_close));
        _this.addPoint(new meta_1.MockField("mo_qipaoshuiwei", 15, 2, "气泡水位", "mm", 10));
        _this.addPoint(new meta_1.MockField("mo_paiyanwendu", 17, 2, "排烟温度", "℃"));
        _this.addPoint(new meta_1.MockField("mo_guoluchukouyanwen", 19, 2, "锅炉出口烟温", "℃"));
        _this.addPoint(new meta_1.MockField("mo_jienengqishuiwen", 21, 2, "节能器水温", "℃"));
        _this.addPoint(new meta_1.MockField("mo_lengningpaiyanwendu", 23, 2, "冷凝排烟温度", "℃"));
        _this.addPoint(new meta_1.ExceptionField("ex_chaoyabaojing", 45, 2, "超压报警 ", 2, meta_1.ExceptionField.Exception_Error));
        _this.addPoint(new meta_1.ExceptionField("ex_ranshaoqiguzhangbaojing", 45, 2, "燃烧器故障报警", 3, meta_1.ExceptionField.Exception_Error));
        _this.addPoint(new meta_1.ExceptionField("ex_xitongguzhang", 45, 2, "系统故障 ", 4, meta_1.ExceptionField.Exception_Error));
        _this.addPoint(new meta_1.ExceptionField("ex_cunchuqiguzhang", 45, 2, "存储器故障", 5));
        _this.addPoint(new meta_1.ExceptionField("ex_paiyanwendugaobaojing", 45, 2, "排烟温度高报警", 6, meta_1.ExceptionField.Exception_Error));
        _this.addPoint(new meta_1.ExceptionField("ex_qingfuweiranshaoqi", 45, 2, "请复位燃烧器 ", 7));
        _this.addPoint(new meta_1.ExceptionField("ex_zhengqiyalichuanganqiguzhang", 45, 2, "蒸汽压力传感器故障", 8));
        _this.addPoint(new meta_1.ExceptionField("ex_bianpinqiguzhang", 45, 2, "变频器故障", 9));
        _this.addPoint(new meta_1.ExceptionField("ex_qingshoudongqidongpaiwufa", 45, 2, "请手动启动排污阀", 10));
        _this.addPoint(new meta_1.ExceptionField("ex_A1tongxinguzhang", 45, 2, "A1通信故障", 11));
        _this.addPoint(new meta_1.ExceptionField("ex_qipaoshuiweichuanganqiguzhang", 45, 2, "气泡水位传感器故障", 12));
        return _this;
    }
    return Map_CTL_RT_X7_3;
}(X7_1.Map_CTL_RT_X7));
