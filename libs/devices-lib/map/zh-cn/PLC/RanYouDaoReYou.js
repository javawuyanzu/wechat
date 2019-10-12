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
var BaseMap_1 = require("./BaseMap");
var BaseDevice_1 = require("../../../devices/PLC/BaseDevice");
var CountField_1 = require("../../../meta/CountField");
var meta_1 = require("../../../meta/PLC/meta");
var SdcSoftDevice_1 = require("../../../devices/SdcSoftDevice");
var FixedValueField_1 = require("../../../meta/FixedValueField");
var gfrm_1 = require("@sdcsoft/gfrm");
module.exports = /** @class */ (function (_super) {
    __extends(Map_PLC_RanYouDaoReYou, _super);
    function Map_PLC_RanYouDaoReYou() {
        var _this = _super.call(this) || this;
        _this.addPoint(new CountField_1.CountField(BaseDevice_1.PLC.KEY_POINT_ZHU_YOU_BENG, '注油泵'));
        _this.addPoint(new CountField_1.CountField(BaseDevice_1.PLC.KEY_POINT_XUN_HUAN_BENG, '循环泵'));
        _this.addPoint(new meta_1.BaseInfoField(SdcSoftDevice_1.SdcSoftDevice.KEY_POINT_RUN_HOURS, 9, 2, '运行小时数', '时'));
        _this.addPoint(new meta_1.BaseInfoField(SdcSoftDevice_1.SdcSoftDevice.KEY_POINT_RUN_DAYS, 11, 2, '运行天数', '天'));
        _this.addPoint(new meta_1.BaseInfoField(SdcSoftDevice_1.SdcSoftDevice.KEY_POINT_SYSTEM_STATUS, 13, 2, '系统状态', '', BaseMap_1.Map_PLC.coms_status));
        _this.addPoint(new FixedValueField_1.FixedValueField(SdcSoftDevice_1.SdcSoftDevice.KEY_POINT_POWER, '燃料', 0, Map_PLC_RanYouDaoReYou.coms_power));
        _this.addPoint(new FixedValueField_1.FixedValueField(SdcSoftDevice_1.SdcSoftDevice.KEY_POINT_MEDIA, '介质', 2, Map_PLC_RanYouDaoReYou.coms_media));
        _this.addPoint(new meta_1.BaseInfoField('ba_shuiweizhuangtai', 19, 2, '水位状态', '', Map_PLC_RanYouDaoReYou.coms_level));
        _this.addPoint(new meta_1.BaseInfoField('ba_ranshaoqizhuangtai', 21, 2, '燃烧器状态', '', BaseMap_1.Map_PLC.coms_ranshaoqi_status));
        _this.addPoint(new meta_1.MockField(gfrm_1.GroupFieldsRelationalMapping.KEY_MOCK_HuiLiuWenDu, 35, 4, '进口温度', '℃'));
        _this.addPoint(new meta_1.MockField(gfrm_1.GroupFieldsRelationalMapping.KEY_MOCK_ChuKouWenDu, 39, 4, '出口温度', '℃'));
        _this.addPoint(new meta_1.MockField('mo_gaoweiyoucaowendu', 43, 4, '高位油槽温度', '℃'));
        _this.addPoint(new meta_1.MockField(gfrm_1.GroupFieldsRelationalMapping.KEY_MOCK_PaiYanWenDu, 47, 4, '排烟温度', '℃'));
        _this.addPoint(new meta_1.MockField('mo_lutangwendu', 51, 4, '炉膛温度', '℃'));
        _this.addPoint(new meta_1.MockField('mo_lutangchukouwendu', 55, 4, '炉膛出口温度', '℃'));
        _this.addPoint(new meta_1.MockField('mo_kongyuqianwendu', 59, 4, '空预前温度', '℃'));
        _this.addPoint(new meta_1.MockField('mo_kongyuhouwendu', 63, 4, '空预后温度', '℃'));
        _this.addPoint(new meta_1.MockField('mo_jinkouyali', 67, 4, '进口压力', 'MPa'));
        _this.addPoint(new meta_1.MockField('mo_chukouyali', 71, 4, '出口压力', 'MPa'));
        _this.addPoint(new meta_1.MockField('mo_danqiyali', 75, 4, '氮气压力', 'kPa'));
        _this.addPoint(new meta_1.MockField('mo_lutangyali', 79, 4, '炉膛压力', 'kPa'));
        _this.addPoint(new meta_1.MockField('mo_gaoweiyoucaowei', 83, 4, '高位槽油位', '%'));
        _this.addPoint(new meta_1.MockField('mo_chuyouguanyouwei', 87, 4, '储油罐油位', '%'));
        _this.addPoint(new meta_1.MockField('mo_liuliangceliang', 91, 4, '流量测量', 'm³/h'));
        _this.addPoint(new meta_1.MockField('mo_diandongtiaojiefashuchu', 95, 4, '电动调节阀输出', '%'));
        _this.addPoint(new meta_1.MockField('mo_bianpinqipinlvshuchu', 99, 4, '变频器频率输出', 'Hz'));
        _this.addPoint(new meta_1.SettingField('se_chukouwenduqiluwendusheding', 111, 4, '出口温度起炉温度设定', '℃', 0, Map_PLC_RanYouDaoReYou.Commands_Key_Parameters_Setting, '0036', 0, 400));
        _this.addPoint(new meta_1.SettingField('se_chukouwendubitiaowendusheding', 115, 4, '出口温度比调温度设定', '℃', 0, Map_PLC_RanYouDaoReYou.Commands_Key_Parameters_Setting, '0038', 0, 400));
        _this.addPoint(new meta_1.SettingField('se_chukouwendutingluwendusheding', 119, 4, '出口温度停炉温度设定', '℃', 0, Map_PLC_RanYouDaoReYou.Commands_Key_Parameters_Setting, '003A', 0, 400));
        _this.addPoint(new meta_1.SettingField('se_chukouwenduchaogaobaojingwendusheding', 123, 4, '出口温度超高报警温度设定', '℃', 0, Map_PLC_RanYouDaoReYou.Commands_Key_Parameters_Setting, '003C', 0, 400));
        _this.addPoint(new meta_1.SettingField('se_paiyanwenduchaogaobaojingsheding', 127, 4, '排烟温度超高报警设定', '℃', 0, Map_PLC_RanYouDaoReYou.Commands_Key_Parameters_Setting, '003E', 0, 400));
        _this.addPoint(new meta_1.SettingField('se_gaoweicaoyouweidisheding', 131, 4, '高位槽油位低设定', '%', 0, Map_PLC_RanYouDaoReYou.Commands_Key_Parameters_Setting, '0040', 0, 100));
        _this.addPoint(new meta_1.SettingField('se_gaoweicaoyouweigaosheding', 135, 4, '高位槽油位高设定', '%', 0, Map_PLC_RanYouDaoReYou.Commands_Key_Parameters_Setting, '0042', 0, 100));
        _this.addPoint(new meta_1.SettingField('se_anquanyouwensheding', 139, 4, '安全油温设定', '℃', 0, Map_PLC_RanYouDaoReYou.Commands_Key_Parameters_Setting, '0044', 0, 400));
        _this.addPoint(new meta_1.SettingField('se_fengjiqidongshijiansheding', 143, 4, '风机启动时间设定', 'S', 0, Map_PLC_RanYouDaoReYou.Commands_Key_Parameters_Setting, '0046', 0, 60));
        _this.addPoint(new meta_1.SettingField('se_fengjiqidongpinlvsheding', 147, 4, '风机启动频率设定', 'Hz', 0, Map_PLC_RanYouDaoReYou.Commands_Key_Parameters_Setting, '0048', 0, 50));
        _this.addPoint(new meta_1.SettingField('se_fengjiyunxingpinlvsheding', 151, 4, '风机运行频率设定', 'Hz', 0, Map_PLC_RanYouDaoReYou.Commands_Key_Parameters_Setting, '004A', 0, 50));
        _this.addPoint(new meta_1.SettingField('se_jinchukouyachagaobaojingsheding', 155, 4, '进出口压差高报警设定', 'MPa', 0, Map_PLC_RanYouDaoReYou.Commands_Key_Parameters_Setting, '004C', 0, 2.5));
        _this.addPoint(new meta_1.SettingField('se_jinchukouyachadibaojingsheding', 159, 4, '进出口压差低报警设定', 'MPa', 0, Map_PLC_RanYouDaoReYou.Commands_Key_Parameters_Setting, '004E', 0, 2.5));
        _this.addPoint(new meta_1.SettingField('se_liuliangxiaxianbaojing', 163, 4, '流量下限报警', 'm³/h', 0, Map_PLC_RanYouDaoReYou.Commands_Key_Parameters_Setting, '0050', 0, 100));
        _this.addPoint(new meta_1.SettingField('se_liuliangjidibaojing', 167, 4, '流量极低报警', 'm³/h', 0, Map_PLC_RanYouDaoReYou.Commands_Key_Parameters_Setting, '0052', 0, 100));
        _this.addPoint(new meta_1.SettingField('se_danqiyalidisheding', 171, 4, '氮气压力低设定', 'kPa', 0, Map_PLC_RanYouDaoReYou.Commands_Key_Parameters_Setting, '0054', 0, 160));
        _this.addPoint(new meta_1.SettingField('se_danqiyaligaosheding', 175, 4, '氮气压力高设定', 'kPa', 0, Map_PLC_RanYouDaoReYou.Commands_Key_Parameters_Setting, '0056', 0, 160));
        _this.addPoint(new meta_1.SettingField('se_diandongfashoudongkaidusheding', 179, 4, '电动阀手动开度设定', '%', 0, Map_PLC_RanYouDaoReYou.Commands_Key_Parameters_Setting, '0058', 0, 100));
        _this.addPoint(new meta_1.DeviceField('de_1_xunhuanbeng_auto', 203, 2, '1#循环泵', BaseMap_1.Map_PLC.coms_atuo));
        _this.addPoint(new meta_1.DeviceField(BaseDevice_1.PLC.KEY_POINT_XUN_HUAN_BENG_1, 205, 2, '1#循环泵', Map_PLC_RanYouDaoReYou.coms_start_stop));
        _this.addPoint(new meta_1.DeviceField('de_2_xunhuanbeng_auto', 207, 2, '2#循环泵', BaseMap_1.Map_PLC.coms_atuo));
        _this.addPoint(new meta_1.DeviceField(BaseDevice_1.PLC.KEY_POINT_XUN_HUAN_BENG_2, 209, 2, '2#循环泵', Map_PLC_RanYouDaoReYou.coms_start_stop));
        _this.addPoint(new meta_1.DeviceField('de_3_xunhuanbeng_auto', 211, 2, '3#循环泵', BaseMap_1.Map_PLC.coms_atuo));
        _this.addPoint(new meta_1.DeviceField(BaseDevice_1.PLC.KEY_POINT_XUN_HUAN_BENG_3, 213, 2, '3#循环泵', Map_PLC_RanYouDaoReYou.coms_start_stop));
        _this.addPoint(new meta_1.DeviceField('de_zhuyoubeng_auto', 215, 2, '注油泵', BaseMap_1.Map_PLC.coms_atuo));
        _this.addPoint(new meta_1.DeviceField(BaseDevice_1.PLC.KEY_POINT_ZHU_YOU_BENG_1, 217, 2, '注油泵', Map_PLC_RanYouDaoReYou.coms_start_stop));
        _this.addPoint(new meta_1.ExceptionField('ex_ranshaoqiguzhang', 229, 2, '燃烧器故障', 8));
        _this.addPoint(new meta_1.ExceptionField(gfrm_1.GroupFieldsRelationalMapping.KEY_Expt_RanQiXieLou, 229, 2, '燃气泄漏', 9));
        _this.addPoint(new meta_1.ExceptionField('ex_ranqiyaliyichang', 229, 2, '燃气压力异常', 10));
        _this.addPoint(new meta_1.ExceptionField('ex_fengjiguzhang', 229, 2, '风机故障', 11));
        _this.addPoint(new meta_1.ExceptionField('ex_1_xunhuanbengguzhang', 229, 2, '1#循环泵故障', 12));
        _this.addPoint(new meta_1.ExceptionField('ex_2_xunhuanbengguzhang', 229, 2, '2#循环泵故障', 13));
        _this.addPoint(new meta_1.ExceptionField('ex_3_xunhuanbengguzhang', 229, 2, '3#循环泵故障', 14));
        _this.addPoint(new meta_1.ExceptionField('ex_zhuyoubengguzhang', 229, 2, '注油泵故障', 15));
        _this.addPoint(new meta_1.ExceptionField('ex_jinchukouyachachaogao', 229, 2, '进出口压差超高', 0));
        _this.addPoint(new meta_1.ExceptionField('ex_jinchukouyachachaodi', 229, 2, '进出口压差超低', 1));
        _this.addPoint(new meta_1.ExceptionField(gfrm_1.GroupFieldsRelationalMapping.KEY_Expt_PaiYanWenDuChaoGao, 229, 2, '排烟温度超高', 2));
        _this.addPoint(new meta_1.ExceptionField(gfrm_1.GroupFieldsRelationalMapping.KEY_Expt_ChuKouWenDuChaoGao, 229, 2, '出口温度超高', 3));
        _this.addPoint(new meta_1.ExceptionField('ex_liuliangxiaxianbaojing', 229, 2, '流量下限报警', 4));
        _this.addPoint(new meta_1.ExceptionField('ex_liuliangjidibaojing', 229, 2, '流量极低报警', 5));
        _this.addPoint(new meta_1.ExceptionField(gfrm_1.GroupFieldsRelationalMapping.KEY_Expt_QueYou, 229, 2, '缺油报警（浮球）', 6), 'ex_queyoubaojingfuqiu');
        _this.addPoint(new meta_1.ExceptionField('ex_chuyouwenduchuanganqibaojing', 229, 2, '出油温度传感器故障', 7));
        _this.addPoint(new meta_1.ExceptionField('ex_huiyouwenduchuanganqibaojing', 231, 2, '回油温度传感器故障', 8));
        _this.addPoint(new meta_1.ExceptionField('ex_paiyanwenduchuanganqiguzhang', 231, 2, '排烟温度传感器故障', 9));
        _this.addPoint(new meta_1.ExceptionField('ex_xunhuanbengliansuoguzhang', 231, 2, '循环泵连锁故障', 10));
        _this.addPoint(new meta_1.ExceptionField('ex_wendushedingcuowuguzhang', 231, 2, '温度设定错误故障', 11));
        _this.addPoint(new meta_1.ExceptionField('ex_gaoweiyoucaoyouweidibaojing', 231, 2, '高位油槽油位低报警', 12));
        _this.addPoint(new meta_1.ExceptionField('ex_gaoweiyoucaoyouweigaobaojing', 231, 2, '高位油槽油位高报警', 13));
        _this.addPoint(new meta_1.ExceptionField('ex_1_zhiguanchaowenbaojing', 231, 2, '1#支管超温报警', 14));
        _this.addPoint(new meta_1.ExceptionField('ex_2_zhiguanchaowenbaojing', 231, 2, '2#支管超温报警', 15));
        _this.addPoint(new meta_1.ExceptionField('ex_3_zhiguanchaowenbaojing', 231, 2, '3#支管超温报警', 0));
        _this.addPoint(new meta_1.ExceptionField('ex_4_zhiguanchaowenbaojing', 231, 2, '4#支管超温报警', 1));
        _this.addPoint(new meta_1.ExceptionField('ex_5_zhiguanchaowenbaojing', 231, 2, '5#支管超温报警', 2));
        _this.addPoint(new meta_1.ExceptionField('ex_6_zhiguanchaowenbaojing', 231, 2, '6#支管超温报警', 3));
        _this.addPoint(new meta_1.ExceptionField('ex_7_zhiguanchaowenbaojing', 231, 2, '7#支管超温报警', 4));
        _this.addPoint(new meta_1.ExceptionField('ex_8_zhiguanchaowenbaojing', 231, 2, '8#支管超温报警', 5));
        _this.addPoint(new meta_1.ExceptionField('ex_9_zhiguanchaowenbaojing', 231, 2, '9#支管超温报警', 6));
        _this.addPoint(new meta_1.ExceptionField('ex_10_zhiguanchaowenbaojing', 231, 2, '10#支管超温报警', 7));
        _this.addPoint(new meta_1.ExceptionField('ex_plcguzhangbaojing', 233, 2, 'PLC故障报警', 8));
        return _this;
    }
    return Map_PLC_RanYouDaoReYou;
}(BaseMap_1.Map_PLC));
