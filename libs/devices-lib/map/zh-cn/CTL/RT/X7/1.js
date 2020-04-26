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
var X7_2 = require("../../../../../devices/CTL/RT/X7");
module.exports = /** @class */ (function (_super) {
    __extends(Map_CTL_RT_X7_1, _super);
    function Map_CTL_RT_X7_1() {
        var _this = _super.call(this) || this;
        _this.addPoint(new meta_1.DeviceField("de_jishuibeng_shoudong/zidong_", 49, 2, "给水泵", 1, X7_1.Map_CTL_RT_X7.coms_auto));
        _this.addPoint(new meta_1.DeviceField("de_jishuibeng_zhu/bei_", 49, 2, "给水泵", 0, X7_1.Map_CTL_RT_X7.coms_master));
        _this.addPoint(new meta_1.DeviceField("de_jienengbeng_zidong/shoudong_", 49, 2, "节能泵", 3, X7_1.Map_CTL_RT_X7.coms_auto));
        _this.addPoint(new meta_1.DeviceField("de_jienengbeng_zhu/bei_", 49, 2, "节能泵", 2, X7_1.Map_CTL_RT_X7.coms_master));
        _this.addPoint(new meta_1.OpenCloseField("oc_jixiandishuiwei", 5, 2, "极限低水位", 0, X7_1.Map_CTL_RT_X7.coms_open_close));
        _this.addPoint(new meta_1.OpenCloseField("oc_chaoyabaojing", 5, 2, "超压报警", 6, X7_1.Map_CTL_RT_X7.coms_open_close));
        _this.addPoint(new meta_1.OpenCloseField("oc_ranshaoqiguzhang", 5, 2, "燃烧器故障", 7, X7_1.Map_CTL_RT_X7.coms_open_close));
        _this.addPoint(new meta_1.DeviceField(X7_2.CTL_RT_X7.KEY_POINT_RAN_SHAO_QI_KONGZHI, 9, 2, "燃烧器", 0, X7_1.Map_CTL_RT_X7.coms_open_close));
        _this.addPoint(new meta_1.OpenCloseField("oc_ranshaoqidahuo", 9, 2, "燃烧器大火", 1, X7_1.Map_CTL_RT_X7.coms_open_close));
        _this.addPoint(new meta_1.DeviceField(X7_2.CTL_RT_X7.KEY_POINT_PAI_WU_FA_1, 9, 2, "排污阀", 2, X7_1.Map_CTL_RT_X7.coms_open_close));
        _this.addPoint(new meta_1.DeviceField(X7_2.CTL_RT_X7.KEY_POINT_LENG_NING_BENG_1, 9, 2, "节能泵", 3, X7_1.Map_CTL_RT_X7.coms_open_close));
        _this.addPoint(new meta_1.DeviceField(X7_2.CTL_RT_X7.KEY_POINT_Add_SHUI_BENG_1, 9, 2, "给水泵", 4, X7_1.Map_CTL_RT_X7.coms_open_close));
        _this.addPoint(new meta_1.OpenCloseField("oc_baojingzhuangtaishuchu", 9, 2, "报警状态输出", 5, X7_1.Map_CTL_RT_X7.coms_open_close));
        _this.addPoint(new meta_1.MockField("mo_zhengqiyali", 13, 2, "蒸汽压力", "mPa", 100));
        _this.addPoint(new meta_1.ExceptionField("ex_jixiandishuiweibao", 45, 2, "极限低水位报警", 0));
        _this.addPoint(new meta_1.ExceptionField("ex_gaoshuiweibaojing", 45, 2, "高水位报警", 1));
        _this.addPoint(new meta_1.OpenCloseField("oc_dishuiwei", 5, 2, "低水位", 1, Map_CTL_RT_X7_1.coms_open_close));
        _this.addPoint(new meta_1.OpenCloseField("oc_gaoshuiwei", 5, 2, "高水位", 2, Map_CTL_RT_X7_1.coms_open_close));
        _this.addPoint(new meta_1.OpenCloseField("oc_gaoshuiweibaojing", 5, 2, "高水位报警", 3, Map_CTL_RT_X7_1.coms_open_close));
        _this.addPoint(new meta_1.MockField("mo_paiyanwendu", 15, 2, "排烟温度", "℃"));
        _this.addPoint(new meta_1.MockField("mo_guoluchukouyanwen", 17, 2, "锅炉出口烟温", "℃"));
        _this.addPoint(new meta_1.MockField("mo_jienengqishuiwen", 19, 2, "节能器水温", "℃"));
        _this.addPoint(new meta_1.MockField("mo_lengningpaiyanwendu", 21, 2, "冷凝排烟温度", "℃"));
        _this.addPoint(new meta_1.ExceptionField("ex_shuiweichuanganqiguzhang", 45, 2, "水位传感器故障", 2));
        _this.addPoint(new meta_1.ExceptionField("ex_chaoyabaojing", 45, 2, "超压报警 ", 3));
        _this.addPoint(new meta_1.ExceptionField("ex_ranshaoqiguzhangbaojing", 45, 2, "燃烧器故障报警", 4));
        _this.addPoint(new meta_1.ExceptionField("ex_xitongguzhang", 45, 2, "系统故障 ", 5));
        _this.addPoint(new meta_1.ExceptionField("ex_cunchuqiguzhang", 45, 2, "存储器故障", 6));
        _this.addPoint(new meta_1.ExceptionField("ex_paiyanwendugaobaojing", 45, 2, "排烟温度高报警", 7));
        _this.addPoint(new meta_1.ExceptionField("ex_qingfuweiranshaoqi", 45, 2, "请复位燃烧器 ", 8));
        _this.addPoint(new meta_1.ExceptionField("ex_qingshoudongqidongpaiwufa", 45, 2, "请手动启动排污阀", 9));
        _this.addPoint(new meta_1.ExceptionField("ex_A1tongxinguzhang", 45, 2, "A1通信故障", 10));
        _this.addPoint(new meta_1.ExceptionField("ex_zhengqiyalichuanganqiguzhang", 45, 2, "蒸汽压力传感器故障", 11));
        return _this;
    }
    return Map_CTL_RT_X7_1;
}(X7_1.Map_CTL_RT_X7));
