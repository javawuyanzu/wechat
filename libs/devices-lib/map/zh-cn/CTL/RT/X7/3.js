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
    __extends(Map_CTL_RT_X7_3, _super);
    function Map_CTL_RT_X7_3() {
        var _this = _super.call(this) || this;
        _this.addPoint(new meta_1.DeviceField("de_jishuibeng_shoudong/zidong_", 49, 2, "给水泵", 1, X7_1.Map_CTL_RT_X7.coms_auto));
        _this.addPoint(new meta_1.OpenCloseField("oc_jixiandishuiweidianji", 5, 2, "极限低水位电极", 0, X7_1.Map_CTL_RT_X7.coms_open_close));
        _this.addPoint(new meta_1.OpenCloseField("oc_dishuiweidianji", 5, 2, "低水位电极", 1, X7_1.Map_CTL_RT_X7.coms_open_close));
        _this.addPoint(new meta_1.OpenCloseField("oc_gaoshuiweidianji", 5, 2, "高水位电极", 2, X7_1.Map_CTL_RT_X7.coms_open_close));
        _this.addPoint(new meta_1.OpenCloseField("oc_gaoshuiweibaojing", 5, 2, "高水位报警", 3, X7_1.Map_CTL_RT_X7.coms_open_close));
        _this.addPoint(new meta_1.OpenCloseField("oc_ranqiyalidibaojing", 5, 2, "燃气压力低报警", 4, X7_1.Map_CTL_RT_X7.coms_open_close));
        _this.addPoint(new meta_1.OpenCloseField("oc_ranqixieloubaojing", 5, 2, "燃气泄漏报警", 5, X7_1.Map_CTL_RT_X7.coms_open_close));
        _this.addPoint(new meta_1.OpenCloseField("oc_chaoyabaojing", 5, 2, "超压报警", 6, X7_1.Map_CTL_RT_X7.coms_open_close));
        _this.addPoint(new meta_1.OpenCloseField("oc_ranshaoqiguzhang", 5, 2, "燃烧器故障", 7, X7_1.Map_CTL_RT_X7.coms_open_close));
        _this.addPoint(new meta_1.DeviceField(X7_2.CTL_RT_X7.KEY_POINT_RAN_SHAO_QI_KONGZHI, 9, 2, "燃烧器", 0, X7_1.Map_CTL_RT_X7.coms_open_close));
        _this.addPoint(new meta_1.OpenCloseField(X7_2.CTL_RT_X7.KEY_POINT_RAN_SHAO_QI_STATUS, 9, 2, "燃烧器负荷调节", 1, X7_1.Map_CTL_RT_X7.coms_open_close));
        _this.addPoint(new meta_1.DeviceField(X7_2.CTL_RT_X7.KEY_POINT_Add_SHUI_BENG_1, 9, 2, "给水泵控制", 2, X7_1.Map_CTL_RT_X7.coms_open_close));
        _this.addPoint(new meta_1.OpenCloseField("oc_baojingzhuangtaishuchu", 9, 2, "报警状态输出", 5, X7_1.Map_CTL_RT_X7.coms_open_close));
        _this.addPoint(new meta_1.MockField("mo_zhengqiyali", 13, 2, "蒸汽压力", "mPa", 100));
        _this.addPoint(new meta_1.MockField("mo_paiyanwendu", 15, 2, "排烟温度", "℃"));
        _this.addPoint(new meta_1.ExceptionField("ex_paiyanwenduchuangganqiguzhang", 45, 2, "排烟温度传感器故障", 0));
        _this.addPoint(new meta_1.ExceptionField("ex_paiyanwendugaobaojing", 45, 2, "排烟温度高报警", 1));
        _this.addPoint(new meta_1.ExceptionField("ex_jixiandishuiweibaojing", 45, 2, "极限低水位报警 ", 2));
        _this.addPoint(new meta_1.ExceptionField("ex_gaoshuiweibaojing", 45, 2, "高水位报警", 3));
        _this.addPoint(new meta_1.ExceptionField("ex_shuiweichuanganqiguzhang", 45, 2, "水位传感器故障 ", 4));
        _this.addPoint(new meta_1.ExceptionField("ex_chaoyabaojing", 45, 2, "超压报警", 5));
        _this.addPoint(new meta_1.ExceptionField("ex_ranshaoqiguzhang", 45, 2, "燃烧器故障", 6));
        _this.addPoint(new meta_1.ExceptionField("ex_qingfuweiranshaoqi", 45, 2, "请复位燃烧器 ", 7));
        _this.addPoint(new meta_1.ExceptionField("ex_xitongguzhang", 45, 2, "系统故障", 8));
        _this.addPoint(new meta_1.ExceptionField("ex_cunchuqiguzhang", 45, 2, "存储器故障", 9));
        _this.addPoint(new meta_1.ExceptionField("ex_zhengqiyalichuangganqiguzhang", 45, 2, "蒸汽压力传感器故障", 10));
        _this.addPoint(new meta_1.ExceptionField("ex_ranqiyalidibaojing", 45, 2, "燃气压力低报警", 11));
        _this.addPoint(new meta_1.ExceptionField("ex_ranqixieloubaojing", 45, 2, "燃气泄漏报警", 12));
        return _this;
    }
    return Map_CTL_RT_X7_3;
}(X7_1.Map_CTL_RT_X7));
