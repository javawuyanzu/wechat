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
    __extends(Map_PLC_RanYouZhengQi, _super);
    function Map_PLC_RanYouZhengQi() {
        var _this = _super.call(this) || this;
        _this.addPoint(new CountField_1.CountField(BaseDevice_1.PLC.KEY_POINT_Add_SHUI_BENG, '补水泵'));
        _this.addPoint(new CountField_1.CountField(BaseDevice_1.PLC.KEY_POINT_JIE_NENG_BENG, '节能泵'));
        _this.addPoint(new CountField_1.CountField(BaseDevice_1.PLC.KEY_POINT_CHU_YANG_BENG, '除氧泵'));
        _this.addPoint(new CountField_1.CountField(BaseDevice_1.PLC.KEY_POINT_ZHAO_QI_FAN, '沼气风机'));
        _this.addPoint(new meta_1.BaseInfoField(SdcSoftDevice_1.SdcSoftDevice.KEY_POINT_RUN_HOURS, 9, 2, '运行小时数', '时'));
        _this.addPoint(new meta_1.BaseInfoField(SdcSoftDevice_1.SdcSoftDevice.KEY_POINT_RUN_DAYS, 11, 2, '运行天数', '天'));
        _this.addPoint(new meta_1.BaseInfoField(SdcSoftDevice_1.SdcSoftDevice.KEY_POINT_SYSTEM_STATUS, 13, 2, '系统状态', '', BaseMap_1.Map_PLC.coms_status));
        _this.addPoint(new FixedValueField_1.FixedValueField(SdcSoftDevice_1.SdcSoftDevice.KEY_POINT_POWER, '燃料', 0, Map_PLC_RanYouZhengQi.coms_power));
        _this.addPoint(new FixedValueField_1.FixedValueField(SdcSoftDevice_1.SdcSoftDevice.KEY_POINT_MEDIA, '介质', 1, Map_PLC_RanYouZhengQi.coms_media));
        _this.addPoint(new meta_1.BaseInfoField('ba_shuiweizhuangtai', 19, 2, '水位状态', '', Map_PLC_RanYouZhengQi.coms_level));
        _this.addPoint(new meta_1.BaseInfoField('ba_ranshaoqizhuangtai', 21, 2, '燃烧器状态', '', BaseMap_1.Map_PLC.coms_ranshaoqi_status));
        _this.addPoint(new meta_1.MockField(gfrm_1.GroupFieldsRelationalMapping.KEY_MOCK_ZhengQiYaLi, 35, 4, '蒸汽压力', 'MPa'));
        _this.addPoint(new meta_1.MockField('mo_guorezhengqiyali', 39, 4, '过热蒸汽压力', 'MPa'));
        _this.addPoint(new meta_1.MockField('mo_zhengqiwendu', 43, 4, '蒸汽温度', '℃'));
        _this.addPoint(new meta_1.MockField('mo_guorezhengqiwendu', 47, 4, '过热蒸汽温度', '℃'));
        _this.addPoint(new meta_1.MockField('mo_guolushuiwei', 51, 4, '锅炉水位', ''));
        _this.addPoint(new meta_1.MockField('mo_zhengqishunshiliuliang', 55, 4, '蒸汽瞬时流量', 'm³/h'));
        _this.addPoint(new meta_1.MockField('mo_bushuishunshiliuliang', 59, 4, '补水瞬时流量', 'm³/h'));
        _this.addPoint(new meta_1.MockField('mo_lutangwendu', 63, 4, '炉膛温度', '℃'));
        _this.addPoint(new meta_1.MockField('mo_lutangyali', 67, 4, '炉膛压力', 'kPa'));
        _this.addPoint(new meta_1.MockField('mo_lengningqijinkouyanwen', 71, 4, '冷凝器进口烟温', '℃'));
        _this.addPoint(new meta_1.MockField('mo_lengningqijinkouyanya', 75, 4, '冷凝器进口烟压', 'kPa'));
        _this.addPoint(new meta_1.MockField('mo_jienengqijinkouyanwen', 79, 4, '节能器进口烟温', '℃'));
        _this.addPoint(new meta_1.MockField('mo_jienengqijinkouyanya', 83, 4, '节能器进口烟压', 'kPa'));
        _this.addPoint(new meta_1.MockField('mo_zhengqileijiliuliang', 87, 4, '蒸汽累计流量', 'm³/h'));
        _this.addPoint(new meta_1.MockField('mo_bushuileijiliuliang', 91, 4, '补水累计流量', 'm³/h'));
        _this.addPoint(new meta_1.MockField('mo_kongyuqijinyanwendu', 95, 4, '空预器进烟温度', '℃'));
        _this.addPoint(new meta_1.MockField('mo_kongyuqijinyanyali', 99, 4, '空预器进烟压力', 'kPa'));
        _this.addPoint(new meta_1.MockField(gfrm_1.GroupFieldsRelationalMapping.KEY_MOCK_PaiYanWenDu, 103, 4, '排烟温度', '℃'));
        _this.addPoint(new meta_1.MockField('mo_zuizhongpaiyanyali', 107, 4, '最终排烟压力', 'kPa'));
        _this.addPoint(new meta_1.MockField('mo_lengningqijinshuiwendu', 111, 4, '冷凝器进水温度', '℃'));
        _this.addPoint(new meta_1.MockField('mo_lengningqichushuiwendu', 115, 4, '冷凝器出水温度', '℃'));
        _this.addPoint(new meta_1.MockField('mo_jienengqijinshuiwendu', 119, 4, '节能器进水温度', '℃'));
        _this.addPoint(new meta_1.MockField('mo_jienengqichushuiwendu', 123, 4, '节能器出水温度', '℃'));
        _this.addPoint(new meta_1.MockField('mo_lengningqichushuiyali', 127, 4, '冷凝器出水压力', 'MPa'));
        _this.addPoint(new meta_1.MockField('mo_jienengqichushuiyali', 131, 4, '节能器出水压力', 'MPa'));
        _this.addPoint(new meta_1.MockField('mo_addshuibengpinlüfankui', 135, 4, '补水泵频率反馈', ''));
        _this.addPoint(new meta_1.MockField('mo_ruanshuixiangyewei', 139, 4, '软水箱液位', 'mm'));
        _this.addPoint(new meta_1.MockField('mo_chuyangqiyewei', 143, 4, '除氧器液位', 'mm'));
        _this.addPoint(new meta_1.MockField('mo_chuyangqiwendu', 147, 4, '除氧器温度', '℃'));
        _this.addPoint(new meta_1.MockField('mo_bushuidiandongfafankui', 151, 4, '补水电动阀反馈', ''));
        _this.addPoint(new meta_1.MockField('mo_guoreqijiangwendiandongfafankui', 155, 4, '过热器降温电动阀反馈', ''));
        _this.addPoint(new meta_1.MockField('mo_zhufengjipinlüfankui', 159, 4, '主风机频率反馈', ''));
        _this.addPoint(new meta_1.MockField('mo_xunhuanfengjipinlüfankui', 163, 4, '循环风机频率反馈', ''));
        _this.addPoint(new meta_1.MockField('mo_kongyuqijinfengwendu', 167, 4, '空预器进风温度', '℃'));
        _this.addPoint(new meta_1.MockField('mo_kongyuqijinfengyali', 171, 4, '空预器进风压力', 'kPa'));
        _this.addPoint(new meta_1.MockField('mo_kongyuqichufengwendu', 175, 4, '空预器出风温度', '℃'));
        _this.addPoint(new meta_1.MockField('mo_kongyuqichufengyali', 179, 4, '空预器出风压力', 'kPa'));
        _this.addPoint(new meta_1.MockField('mo_zhaoqiyali', 183, 4, '沼气压力', 'KPa'));
        _this.addPoint(new meta_1.MockField('mo_zhaoqishunshiliuliang', 187, 4, '沼气瞬时流量', 'm³/h'));
        _this.addPoint(new meta_1.MockField('mo_zhaoqileijiliuliang', 191, 4, '沼气累计流量', 'm³/h'));
        _this.addPoint(new meta_1.MockField('mo_zhaoqifengjipinlvfankui', 195, 4, '沼气风机频率反馈', 'Hz'));
        //2019.11.30河南仁泰临时新增
        _this.addPoint(new meta_1.MockField('mo_chuyangqibushuifafankui', 199, 4, '除氧器补水阀反馈频率', '%'));
        _this.addPoint(new meta_1.MockField('mo_chuyangqijiarefafankui', 203, 4, '除氧器加热阀反馈频率', '%'));
        //
        _this.addPoint(new meta_1.SettingField('se_qiluyalisheding', 248, 4, '启炉压力设定', 'MPa'));
        _this.addPoint(new meta_1.SettingField('se_mubiaoyalisheding', 252, 4, '目标压力设定', 'MPa'));
        _this.addPoint(new meta_1.SettingField('se_tingluyalisheding', 256, 4, '停炉压力设定', 'MPa'));
        _this.addPoint(new meta_1.SettingField('se_chaoyabaojingyalisheding', 260, 4, '超压报警压力设定', 'MPa'));
        _this.addPoint(new meta_1.SettingField('se_paiyanchaowenbaojing', 264, 4, '排烟超温报警', '℃'));
        _this.addPoint(new meta_1.SettingField('se_guolushuiweimubiaosheding', 268, 4, '锅炉水位目标设定', '%'));
        _this.addPoint(new meta_1.SettingField('se_guolushuiweijigaobaojingsheding', 272, 4, '锅炉水位极高报警设定', '%'));
        _this.addPoint(new meta_1.SettingField('se_guolushuiweijidibaojingsheding', 276, 4, '锅炉水位极低报警设定', '%'));
        _this.addPoint(new meta_1.SettingField('se_addshuibengshoudongpinlüsheding', 280, 4, '给水泵手动频率设定', 'Hz'));
        _this.addPoint(new meta_1.SettingField('se_chuyangqibushuimubiaosheding', 284, 4, '除氧器补水目标设定', 'mm'));
        _this.addPoint(new meta_1.SettingField('se_chuyangqijigaobaojingsheding', 288, 4, '除氧器极高报警设定', 'mm'));
        _this.addPoint(new meta_1.SettingField('se_chuyangqitingbengyeweisheding', 292, 4, '除氧器停泵液位设定', 'mm'));
        _this.addPoint(new meta_1.SettingField('se_chuyangqiqibengyeweisheding', 296, 4, '除氧器启泵液位设定', 'mm'));
        _this.addPoint(new meta_1.SettingField('se_chuyangqijidibaojingsheding', 300, 4, '除氧器极低报警设定', 'mm'));
        _this.addPoint(new meta_1.SettingField('se_chuyangqibushuishoudonggeisu', 304, 4, '除氧器补水手动给速', 'Hz'));
        _this.addPoint(new meta_1.SettingField('se_zhaoqiyalimubiaosheding', 308, 4, '沼气压力目标设定', 'KPa'));
        //2019.11.30河南仁泰临时新增
        _this.addPoint(new meta_1.SettingField('se_chuyangqibushuifasheding', 312, 4, '除氧器补水阀手动设定', '%'));
        _this.addPoint(new meta_1.SettingField('se_chuyangqijiarefasheding', 316, 4, '除氧器加热阀手动设定', '%'));
        _this.addPoint(new meta_1.SettingField('se_chuyangqijiarefamubiaosheding', 320, 4, '除氧器加热阀目标设定', '%'));
        //
        _this.addPoint(new meta_1.DeviceField('de_1_addshuibeng_auto', 368, 2, '1#补水泵', BaseMap_1.Map_PLC.coms_atuo));
        _this.addPoint(new meta_1.DeviceField(BaseDevice_1.PLC.KEY_POINT_Add_SHUI_BENG_1, 370, 2, '1#补水泵', Map_PLC_RanYouZhengQi.coms_start_stop));
        _this.addPoint(new meta_1.DeviceField('de_2_addshuibeng_auto', 372, 2, '2#补水泵', BaseMap_1.Map_PLC.coms_atuo));
        _this.addPoint(new meta_1.DeviceField(BaseDevice_1.PLC.KEY_POINT_Add_SHUI_BENG_2, 374, 2, '2#补水泵', Map_PLC_RanYouZhengQi.coms_start_stop));
        _this.addPoint(new meta_1.DeviceField('de_1_jienengbeng_auto', 376, 2, '1#节能泵', BaseMap_1.Map_PLC.coms_atuo));
        _this.addPoint(new meta_1.DeviceField(BaseDevice_1.PLC.KEY_POINT_JIE_NENG_BENG_1, 378, 2, '1#节能泵', Map_PLC_RanYouZhengQi.coms_start_stop));
        _this.addPoint(new meta_1.DeviceField('de_2_jienengbeng_auto', 380, 2, '2#节能泵', BaseMap_1.Map_PLC.coms_atuo));
        _this.addPoint(new meta_1.DeviceField(BaseDevice_1.PLC.KEY_POINT_JIE_NENG_BENG_2, 382, 2, '2#节能泵', Map_PLC_RanYouZhengQi.coms_start_stop));
        _this.addPoint(new meta_1.DeviceField('de_1_chuyangbeng_auto', 384, 2, '1#除氧泵', BaseMap_1.Map_PLC.coms_atuo));
        _this.addPoint(new meta_1.DeviceField(BaseDevice_1.PLC.KEY_POINT_CHU_YANG_BENG_1, 386, 2, '1#除氧泵', Map_PLC_RanYouZhengQi.coms_start_stop));
        _this.addPoint(new meta_1.DeviceField('de_2_chuyangbeng_auto', 388, 2, '2#除氧泵', BaseMap_1.Map_PLC.coms_atuo));
        _this.addPoint(new meta_1.DeviceField(BaseDevice_1.PLC.KEY_POINT_CHU_YANG_BENG_2, 390, 2, '2#除氧泵', Map_PLC_RanYouZhengQi.coms_start_stop));
        _this.addPoint(new meta_1.DeviceField('de_baojingshuchuzhishi', 392, 2, '报警输出指示', Map_PLC_RanYouZhengQi.coms_open_close));
        _this.addPoint(new meta_1.DeviceField('de_1_zhaoqifengji_auto', 394, 2, '1#沼气风机', BaseMap_1.Map_PLC.coms_atuo));
        _this.addPoint(new meta_1.DeviceField(BaseDevice_1.PLC.KEY_POINT_ZHAO_QI_FAN_1, 396, 2, '1#沼气风机', Map_PLC_RanYouZhengQi.coms_start_stop));
        _this.addPoint(new meta_1.DeviceField('de_2_zhaoqifengji_auto', 398, 2, '2#沼气风机', BaseMap_1.Map_PLC.coms_atuo));
        _this.addPoint(new meta_1.DeviceField(BaseDevice_1.PLC.KEY_POINT_ZHAO_QI_FAN_2, 400, 2, '2#沼气风机', Map_PLC_RanYouZhengQi.coms_start_stop));
        //2019.11.30河南仁泰临时新增
        _this.addPoint(new meta_1.DeviceField('de_chuyangqibushuifa_auto', 402, 2, '除氧器补水阀', BaseMap_1.Map_PLC.coms_atuo));
        _this.addPoint(new meta_1.DeviceField('de_chuyangqijiereifa_auto', 404, 2, '除氧器加热阀', BaseMap_1.Map_PLC.coms_atuo));
        _this.addPoint(new meta_1.DeviceField('de_lianpaidiancifa_auto', 406, 2, '联排电磁阀', BaseMap_1.Map_PLC.coms_atuo));
        _this.addPoint(new meta_1.DeviceField('de_lianpaidiancifa_start_stop', 408, 2, '联排电磁阀', BaseMap_1.Map_PLC.coms_start_stop));
        //
        _this.addPoint(new meta_1.ExceptionField(gfrm_1.GroupFieldsRelationalMapping.KEY_Expt_ChaoYa, 448, 2, '超压报警（压力开关）', 0), 'ex_chaoyabaojingyalikaiguan');
        _this.addPoint(new meta_1.ExceptionField(gfrm_1.GroupFieldsRelationalMapping.KEY_Expt_ChaoYa, 448, 2, '超压报警（设定值）', 1), 'ex_chaoyabaojingshedingzhi');
        _this.addPoint(new meta_1.ExceptionField(gfrm_1.GroupFieldsRelationalMapping.KEY_Expt_PaiYanWenDuChaoGao, 448, 2, '排烟超温报警', 2));
        _this.addPoint(new meta_1.ExceptionField('ex_ruanshuixiangqueshuibaojing', 448, 2, '软水箱缺水报警', 3));
        _this.addPoint(new meta_1.ExceptionField('ex_shuidianjiluojicuobaojing', 448, 2, '水电极逻辑错报警', 4));
        _this.addPoint(new meta_1.ExceptionField('ex_yalibiansongqiguzhangbaojing', 448, 2, '压力变送器故障报警', 5));
        _this.addPoint(new meta_1.ExceptionField('ex_shuiweibiansongqiguzhangbaojing', 448, 2, '水位变送器故障报警', 6));
        _this.addPoint(new meta_1.ExceptionField('ex_paiyanwenduchuanganqiguzhangbaojing', 448, 2, '排烟温度传感器故障报警', 7));
        _this.addPoint(new meta_1.ExceptionField('ex_ranshaoqiguzhang', 448, 2, '燃烧器故障', 8, meta_1.ExceptionField.Exception_Error));
        _this.addPoint(new meta_1.ExceptionField(gfrm_1.GroupFieldsRelationalMapping.KEY_Expt_RanQiXieLou, 448, 2, '燃气泄漏', 9, meta_1.ExceptionField.Exception_Error));
        _this.addPoint(new meta_1.ExceptionField('ex_ranqiyaliyichang', 448, 2, '燃气压力异常', 10, meta_1.ExceptionField.Exception_Error));
        _this.addPoint(new meta_1.ExceptionField('ex_shuiweiweidibaojingdianji', 448, 2, '水位危低报警（电极）', 11, meta_1.ExceptionField.Exception_Error));
        _this.addPoint(new meta_1.ExceptionField(gfrm_1.GroupFieldsRelationalMapping.KEY_Expt_JiXianDiShuiWei, 448, 2, '水位极低报警（电极）', 12, meta_1.ExceptionField.Exception_Error), 'ex_shuiweijidibaojingdianji');
        _this.addPoint(new meta_1.ExceptionField(gfrm_1.GroupFieldsRelationalMapping.KEY_Expt_JiXianGaoShuiWei, 448, 2, '水位极高报警（电极）', 13), 'ex_shuiweijigaobaojingdianji');
        _this.addPoint(new meta_1.ExceptionField(gfrm_1.GroupFieldsRelationalMapping.KEY_Expt_JiXianDiShuiWei, 448, 2, '水位极低报警（设定值）', 14), 'ex_shuiweijidibaojingshedingzhi');
        _this.addPoint(new meta_1.ExceptionField(gfrm_1.GroupFieldsRelationalMapping.KEY_Expt_JiXianGaoShuiWei, 448, 2, '水位极高报警（设定值）', 15), 'ex_shuiweijigaobaojingshedingzhi');
        _this.addPoint(new meta_1.ExceptionField('ex_addshuibeng1guzhang', 450, 2, '给水泵1故障', 0));
        _this.addPoint(new meta_1.ExceptionField('ex_addshuibeng2guzhang', 450, 2, '给水泵2故障', 1));
        _this.addPoint(new meta_1.ExceptionField('ex_zhaoqifengjibianpinqiguzhang', 450, 2, '沼气风机变频器故障', 2));
        _this.addPoint(new meta_1.ExceptionField('ex_chuyangqiqueshuibaojing', 450, 2, '除氧器缺水报警', 8));
        _this.addPoint(new meta_1.ExceptionField('ex_chuyangqigaoshuiweibaojing', 450, 2, '除氧器高水位报警', 9));
        _this.addPoint(new meta_1.ExceptionField('ex_addshuibengbianpinqiguzhang', 450, 2, '给水泵变频器故障', 10));
        _this.addPoint(new meta_1.ExceptionField('ex_chuyangbengbianpinqiguzhang', 450, 2, '除氧泵变频器故障', 11));
        _this.addPoint(new meta_1.ExceptionField('ex_zhufengjibianpinqiguzhang', 450, 2, '主风机变频器故障', 12));
        _this.addPoint(new meta_1.ExceptionField('ex_xunhuanfengjibianpinqiguzhang', 450, 2, '循环风机变频器故障', 13));
        _this.addPoint(new meta_1.ExceptionField('ex_jienengbeng1guzhang', 450, 2, '节能泵1故障', 14));
        _this.addPoint(new meta_1.ExceptionField('ex_jienengbeng2guzhang', 450, 2, '节能泵2故障', 15));
        return _this;
    }
    return Map_PLC_RanYouZhengQi;
}(BaseMap_1.Map_PLC));
