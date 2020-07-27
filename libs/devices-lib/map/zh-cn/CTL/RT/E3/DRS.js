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
var _a;
"use strict";
var meta_1 = require("../../../../../meta/RT/meta");
var RT_1 = require("../RT");
var CountShowField_1 = require("../../../../../meta/CountShowField");
var gfrm_1 = require("@sdcsoft/gfrm");
var comms_1 = require("@sdcsoft/comms");
var CountField_1 = require("../../../../../meta/CountField");
var RT_2 = require("../../../../../devices/CTL/RT/RT");
var SdcSoftDevice_1 = require("../../../../../devices/SdcSoftDevice");
var FixedValueField_1 = require("../../../../../meta/FixedValueField");
module.exports = (_a = /** @class */ (function (_super) {
        __extends(Map_CTL_RT_E3_DRS, _super);
        function Map_CTL_RT_E3_DRS() {
            var _this = _super.call(this) || this;
            _this.addPoint(new CountField_1.CountField(RT_2.CTL_RT.KEY_POINT_JIA_RE_ZU, "加热组"));
            _this.addPoint(new CountField_1.CountField(RT_2.CTL_RT.KEY_POINT_Add_SHUI_BENG, "补水泵"));
            _this.addPoint(new CountField_1.CountField(RT_2.CTL_RT.KEY_POINT_LENG_NING_BENG, "循环泵"));
            _this.addPoint(new meta_1.BaseInfoField(SdcSoftDevice_1.SdcSoftDevice.KEY_POINT_SYSTEM_STATUS, 3, 2, "控制器状态", '', Map_CTL_RT_E3_DRS.coms_status));
            _this.addPoint(new meta_1.BaseInfoField(SdcSoftDevice_1.SdcSoftDevice.KEY_POINT_RUN_LIFE, 53, 2, "运行时间", "时"));
            _this.addPoint(new CountShowField_1.CountShowField(comms_1.GroupKeys.KEY_BASE, SdcSoftDevice_1.SdcSoftDevice.KEY_POINT_RUN_DAYS, "运行天数", "天"));
            _this.addPoint(new CountShowField_1.CountShowField(comms_1.GroupKeys.KEY_BASE, SdcSoftDevice_1.SdcSoftDevice.KEY_POINT_RUN_HOURS, "运行小时数", "时"));
            _this.addPoint(new FixedValueField_1.FixedValueField(SdcSoftDevice_1.SdcSoftDevice.KEY_POINT_POWER, "燃料类型", 1, RT_1.Map_CTL_RT.coms_power));
            _this.addPoint(new FixedValueField_1.FixedValueField(SdcSoftDevice_1.SdcSoftDevice.KEY_POINT_MEDIA, "介质类型", 0, RT_1.Map_CTL_RT.coms_media));
            _this.addPoint(new meta_1.OpenCloseField("oc_jixiandishuiweidianji", 5, 2, "极限低水位电极", 0, RT_1.Map_CTL_RT.coms_open_close));
            _this.addPoint(new meta_1.OpenCloseField("oc_dishuiweidianji", 5, 2, "低水位电极", 1, RT_1.Map_CTL_RT.coms_open_close));
            _this.addPoint(new meta_1.OpenCloseField("oc_gaoshuiweidianji", 5, 2, "高水位电极", 2, RT_1.Map_CTL_RT.coms_open_close));
            _this.addPoint(new meta_1.OpenCloseField("oc_lubichaowenkaiguan", 5, 2, "炉壁超温开关", 6, RT_1.Map_CTL_RT.coms_open_close));
            _this.addPoint(new meta_1.OpenCloseField("oc_chaoyabaojing", 5, 2, "超压报警", 9, RT_1.Map_CTL_RT.coms_open_close));
            _this.addPoint(new meta_1.OpenCloseField("oc_baojingshuchu", 9, 2, "报警输出", 0, RT_1.Map_CTL_RT.coms_open_close));
            _this.addPoint(new meta_1.DeviceField(RT_2.CTL_RT.KEY_POINT_Add_SHUI_BENG_1, 9, 2, "补水泵", 1, RT_1.Map_CTL_RT.coms_open_close));
            _this.addPoint(new meta_1.DeviceField(RT_2.CTL_RT.KEY_POINT_LENG_NING_BENG_1, 9, 2, "循环泵", 2, RT_1.Map_CTL_RT.coms_open_close));
            _this.addPoint(new meta_1.OpenCloseField("oc_jiarezu1kongzhi", 9, 2, "加热组1控制", 3, RT_1.Map_CTL_RT.coms_open_close));
            _this.addPoint(new meta_1.OpenCloseField("oc_jiarezu2kongzhi", 9, 2, "加热组2控制", 4, RT_1.Map_CTL_RT.coms_open_close));
            _this.addPoint(new meta_1.OpenCloseField("oc_jiarezu3kongzhi", 9, 2, "加热组3控制", 5, RT_1.Map_CTL_RT.coms_open_close));
            _this.addPoint(new meta_1.OpenCloseField("oc_jiarezu4kongzhi", 9, 2, "加热组4控制", 6, RT_1.Map_CTL_RT.coms_open_close));
            _this.addPoint(new meta_1.OpenCloseField("oc_jiarezu5kongzhi", 9, 2, "加热组5控制", 7, RT_1.Map_CTL_RT.coms_open_close));
            _this.addPoint(new meta_1.OpenCloseField("oc_jiarezu6kongzhi", 9, 2, "加热组6控制", 8, RT_1.Map_CTL_RT.coms_open_close));
            _this.addPoint(new meta_1.OpenCloseField("oc_jiarezu7kongzhi", 9, 2, "加热组7控制", 9, RT_1.Map_CTL_RT.coms_open_close));
            _this.addPoint(new meta_1.OpenCloseField("oc_jiarezu8kongzhi", 9, 2, "加热组8控制", 10, RT_1.Map_CTL_RT.coms_open_close));
            _this.addPoint(new meta_1.OpenCloseField("oc_jiarezu9kongzhi", 9, 2, "加热组9控制", 11, RT_1.Map_CTL_RT.coms_open_close));
            _this.addPoint(new meta_1.OpenCloseField("oc_jiarezu10kongzhi", 9, 2, "加热组10控制", 12, RT_1.Map_CTL_RT.coms_open_close));
            _this.addPoint(new meta_1.OpenCloseField("oc_jiarezu11kongzhi", 9, 2, "加热组11控制", 13, RT_1.Map_CTL_RT.coms_open_close));
            _this.addPoint(new meta_1.OpenCloseField("oc_jiarezu12kongzhi", 9, 2, "加热组12控制", 14, RT_1.Map_CTL_RT.coms_open_close));
            _this.addPoint(new meta_1.MockField(gfrm_1.GroupFieldsRelationalMapping.KEY_MOCK_ChuKouWenDu, 13, 2, "出水温度", "℃"));
            _this.addPoint(new meta_1.MockField(gfrm_1.GroupFieldsRelationalMapping.KEY_MOCK_HuiLiuWenDu, 15, 2, "回水温度", "℃"));
            _this.addPoint(new meta_1.ExceptionField("ex_chushuiwenduchuanganqiguzhang", 45, 2, "出水温度传感器故障", 0));
            _this.addPoint(new meta_1.ExceptionField(gfrm_1.GroupFieldsRelationalMapping.KEY_Expt_ChuKouWenDuChaoGao, 45, 2, "出水温度高报警", 1, meta_1.ExceptionField.Exception_Error));
            _this.addPoint(new meta_1.ExceptionField("ex_huishuiwenduchuanganqiguzhang", 45, 2, "回水温度传感器故障", 2));
            _this.addPoint(new meta_1.ExceptionField(gfrm_1.GroupFieldsRelationalMapping.KEY_Expt_JiXianDiShuiWei, 45, 2, "极限低水位报警", 3, meta_1.ExceptionField.Exception_Error));
            _this.addPoint(new meta_1.ExceptionField("ex_shuiweichuanganqiguzhang", 45, 2, "水位传感器故障", 4));
            _this.addPoint(new meta_1.ExceptionField(gfrm_1.GroupFieldsRelationalMapping.KEY_Expt_ChaoYa, 45, 2, "超压报警", 5, meta_1.ExceptionField.Exception_Error));
            _this.addPoint(new meta_1.ExceptionField(gfrm_1.GroupFieldsRelationalMapping.KEY_Expt_LuBiChaoWen, 45, 2, "炉壁超温报警", 6, meta_1.ExceptionField.Exception_Error));
            _this.addPoint(new meta_1.ExceptionField("ex_xitongguzhang", 45, 2, "系统故障", 7, meta_1.ExceptionField.Exception_Error));
            return _this;
        }
        return Map_CTL_RT_E3_DRS;
    }(RT_1.Map_CTL_RT)),
    _a.coms_status = {
        0: '待命',
        1: '报警',
        2: '运行',
        3: '关机'
    },
    _a);
