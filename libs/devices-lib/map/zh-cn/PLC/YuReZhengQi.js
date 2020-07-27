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
    __extends(Map_PLC_YuReZhengQi, _super);
    function Map_PLC_YuReZhengQi() {
        var _this = _super.call(this) || this;
        _this.addPoint(new CountField_1.CountField(BaseDevice_1.PLC.KEY_POINT_Add_SHUI_BENG, '给水泵'));
        _this.addPoint(new CountField_1.CountField(BaseDevice_1.PLC.KEY_POINT_CHU_YANG_BENG, '除氧泵'));
        _this.addPoint(new meta_1.BaseInfoField(SdcSoftDevice_1.SdcSoftDevice.KEY_POINT_RUN_HOURS, 9, 2, '运行小时数', '时'));
        _this.addPoint(new meta_1.BaseInfoField(SdcSoftDevice_1.SdcSoftDevice.KEY_POINT_RUN_DAYS, 11, 2, '运行天数', '天'));
        _this.addPoint(new meta_1.BaseInfoField(SdcSoftDevice_1.SdcSoftDevice.KEY_POINT_SYSTEM_STATUS, 13, 2, '系统状态', '', BaseMap_1.Map_PLC.coms_status));
        _this.addPoint(new FixedValueField_1.FixedValueField(SdcSoftDevice_1.SdcSoftDevice.KEY_POINT_POWER, '燃料', 30, Map_PLC_YuReZhengQi.coms_power));
        _this.addPoint(new FixedValueField_1.FixedValueField(SdcSoftDevice_1.SdcSoftDevice.KEY_POINT_MEDIA, '介质', 1, Map_PLC_YuReZhengQi.coms_media));
        _this.addPoint(new meta_1.BaseInfoField('ba_shuiweizhuangtai', 19, 2, '水位状态', '', Map_PLC_YuReZhengQi.coms_level));
        _this.addPoint(new meta_1.BaseInfoField('ba_ranshaoqizhuangtai', 21, 2, '燃烧器状态', '', BaseMap_1.Map_PLC.coms_ranshaoqi_status));
        _this.addPoint(new meta_1.MockField(gfrm_1.GroupFieldsRelationalMapping.KEY_MOCK_ZhengQiYaLi, 35, 4, '蒸汽压力', 'MPa'));
        _this.addPoint(new meta_1.MockField('mo_zhengqiwendu', 39, 4, '蒸汽温度', '℃'));
        _this.addPoint(new meta_1.MockField('mo_guolushuiwei', 43, 4, '锅炉水位', 'mm'));
        _this.addPoint(new meta_1.MockField('mo_zhengqishunshiliuliang', 47, 4, '蒸汽瞬时流量', 'T/H'));
        _this.addPoint(new meta_1.MockField('mo_bushuishunshiliuliang', 51, 4, '补水瞬时流量', 'm³/h'));
        _this.addPoint(new meta_1.MockField('mo_zhengqileijiliuliang', 55, 4, '蒸汽累计流量', 'T'));
        _this.addPoint(new meta_1.MockField('mo_bushuileijiliuliang', 59, 4, '补水累计流量', 'm³'));
        _this.addPoint(new meta_1.MockField('mo_jinyanwendu', 63, 4, '进烟温度', '℃'));
        _this.addPoint(new meta_1.MockField('mo_jinyanyali', 67, 4, '进烟压力', 'Kpa'));
        _this.addPoint(new meta_1.MockField('mo_chuyanwendu', 71, 4, '出烟温度', '℃'));
        _this.addPoint(new meta_1.MockField('mo_chuyanyali', 75, 4, '出烟压力', 'Kpa'));
        _this.addPoint(new meta_1.MockField('mo_bushuiwendu', 79, 4, '补水温度', '℃'));
        _this.addPoint(new meta_1.MockField('mo_bushuiyali', 83, 4, '补水压力', 'Mpa'));
        _this.addPoint(new meta_1.MockField('mo_bushuibengpinlvfankui', 87, 4, '补水泵频率反馈', 'Hz'));
        _this.addPoint(new meta_1.MockField('mo_chushuibengpinlvfankui', 91, 4, '除水泵频率反馈', 'Hz'));
        _this.addPoint(new meta_1.MockField('mo_ruanshuixiangyewei', 95, 4, '软水箱液位', 'cm'));
        _this.addPoint(new meta_1.MockField('mo_chuyangqiyewei', 99, 4, '除氧器液位', 'cm'));
        _this.addPoint(new meta_1.MockField('mo_chuyangqiwendu', 103, 4, '除氧器温度', '℃'));
        _this.addPoint(new meta_1.MockField('mo_chuyangqiyali', 107, 4, '除氧器压力', 'KPa'));
        _this.addPoint(new meta_1.MockField('mo_bushuidiandongfafankui', 111, 4, '补水电动阀反馈', '%'));
        _this.addPoint(new meta_1.MockField('mo_chuyangbushuidiandongfafankui', 115, 4, '除氧补水电动阀反馈', '%'));
        _this.addPoint(new meta_1.MockField('mo_chuyangzhengqidiandongfafankui', 119, 4, '除氧蒸汽电动阀反馈', '%'));
        _this.addPoint(new meta_1.MockField('mo_jinyandiandongfafankui', 123, 4, '进烟电动阀反馈', '%'));
        _this.addPoint(new meta_1.MockField('mo_chuyandiandongfafankui', 127, 4, '出烟电动阀反馈', '%'));
        _this.addPoint(new meta_1.MockField('mo_guoluzhuzhengqitiaojiefafankui', 131, 4, '锅炉主蒸汽调节阀反馈', '%'));
        _this.addPoint(new meta_1.MockField('mo_shigufangshuidiandongfafankui', 135, 4, '事故放水电动阀反馈', '%'));
        _this.addPoint(new meta_1.MockField('mo_jinjipaiqidiandongfafankui', 139, 4, '紧急排气电动阀反馈', '%'));
        _this.addPoint(new meta_1.MockField(gfrm_1.GroupFieldsRelationalMapping.KEY_MOCK_PaiYanWenDu, 143, 4, '排烟温度', '℃'));
        _this.addPoint(new meta_1.SettingField('se_chaoyabaojingyalisheding', 248, 4, '超压报警压力设定', 'MPa'));
        _this.addPoint(new meta_1.SettingField('se_guolushuiweimubiaosheding', 252, 4, '锅炉水位目标设定', 'mm'));
        _this.addPoint(new meta_1.SettingField('se_guolushuiweijigaobaojingsheding', 256, 4, '锅炉水位极高报警设定', 'mm'));
        _this.addPoint(new meta_1.SettingField('se_guolushuiweigaosheding', 260, 4, '锅炉水位高设定', 'mm'));
        _this.addPoint(new meta_1.SettingField('se_guolushuiweidisheding', 264, 4, '锅炉水位低设定', 'mm'));
        _this.addPoint(new meta_1.SettingField('se_guolushuiweijidibaojingsheding', 268, 4, '锅炉水位极低报警设定', 'mm'));
        _this.addPoint(new meta_1.SettingField('se_jishuibengshoudongpinlvsheding', 272, 4, '给水泵手动频率设定', 'Hz'));
        _this.addPoint(new meta_1.SettingField('se_chuyangqibushuimubiaosheding', 276, 4, '除氧器补水目标设定', 'mm'));
        _this.addPoint(new meta_1.SettingField('se_chuyangqishuiweijigaobaojingsheding', 280, 4, '除氧器水位极高报警设定', 'CM'));
        _this.addPoint(new meta_1.SettingField('se_chuyangqitingbengyeweisheding', 284, 4, '除氧器停泵液位设定', 'CM'));
        _this.addPoint(new meta_1.SettingField('se_chuyangqiqibengyeweisheding', 288, 4, '除氧器启泵液位设定', 'CM'));
        _this.addPoint(new meta_1.SettingField('se_chuyangqijidibaojingsheding', 292, 4, '除氧器极低报警设定', 'CM'));
        _this.addPoint(new meta_1.SettingField('se_chuyangqibushuishoudonggeisu', 296, 4, '除氧器补水手动给定', '%'));
        _this.addPoint(new meta_1.SettingField('se_jinyandiandongfageiding', 300, 4, '进烟电动阀给定', '%'));
        _this.addPoint(new meta_1.SettingField('se_chuyandiandongfageiding', 304, 4, '出烟电动阀给定', '%'));
        _this.addPoint(new meta_1.SettingField('se_chuyangqizhengqishoudongjiding', 308, 4, '除氧器蒸汽手动给定', '%'));
        _this.addPoint(new meta_1.SettingField('se_chuyangqiwendumubiaojiding', 312, 4, '除氧器温度目标给定', '℃'));
        _this.addPoint(new meta_1.SettingField('se_ruanshuixiangqueshuibaojingsheding', 316, 4, '软水箱缺水报警设定', '%'));
        _this.addPoint(new meta_1.SettingField('se_paiyanchaowenbaojingsheding', 320, 4, '排烟超温报警设定', '℃'));
        _this.addPoint(new meta_1.DeviceField('de_1_addshuibeng_auto', 368, 2, '1#给水泵', BaseMap_1.Map_PLC.coms_atuo));
        _this.addPoint(new meta_1.DeviceField(BaseDevice_1.PLC.KEY_POINT_Add_SHUI_BENG_1, 370, 2, '1#给水泵', Map_PLC_YuReZhengQi.coms_start_stop));
        _this.addPoint(new meta_1.DeviceField('de_2_addshuibeng_auto', 372, 2, '2#给水泵', BaseMap_1.Map_PLC.coms_atuo));
        _this.addPoint(new meta_1.DeviceField(BaseDevice_1.PLC.KEY_POINT_Add_SHUI_BENG_2, 374, 2, '2#给水泵', Map_PLC_YuReZhengQi.coms_start_stop));
        _this.addPoint(new meta_1.DeviceField('de_1_chuyangbeng_auto', 376, 2, '1#除氧泵', BaseMap_1.Map_PLC.coms_atuo));
        _this.addPoint(new meta_1.DeviceField(BaseDevice_1.PLC.KEY_POINT_CHU_YANG_BENG_1, 378, 2, '1#除氧泵', Map_PLC_YuReZhengQi.coms_start_stop));
        _this.addPoint(new meta_1.DeviceField('de_2_chuyangbeng_auto', 380, 2, '2#除氧泵', BaseMap_1.Map_PLC.coms_atuo));
        _this.addPoint(new meta_1.DeviceField(BaseDevice_1.PLC.KEY_POINT_CHU_YANG_BENG_2, 382, 2, '2#除氧泵', Map_PLC_YuReZhengQi.coms_start_stop));
        _this.addPoint(new meta_1.DeviceField('de_baojingshuchuzhishi', 384, 2, '报警输出指示', Map_PLC_YuReZhengQi.coms_open_close));
        _this.addPoint(new meta_1.ExceptionField('ex_shuiweiweidibaojingdianji', 448, 2, '水位危低报警（电极）', 8, meta_1.ExceptionField.Exception_Error));
        _this.addPoint(new meta_1.ExceptionField(gfrm_1.GroupFieldsRelationalMapping.KEY_Expt_JiXianDiShuiWei, 448, 2, '水位极低报警（电极）', 9, meta_1.ExceptionField.Exception_Error), 'ex_shuiweijidibaojingdianji');
        _this.addPoint(new meta_1.ExceptionField(gfrm_1.GroupFieldsRelationalMapping.KEY_Expt_JiXianGaoShuiWei, 448, 2, '水位极高报警（电极）', 10), 'ex_shuiweijigaobaojingdianji');
        _this.addPoint(new meta_1.ExceptionField(gfrm_1.GroupFieldsRelationalMapping.KEY_Expt_JiXianDiShuiWei, 448, 2, '水位极低报警（设定值）', 11), 'ex_shuiweijidibaojingshedingzhi');
        _this.addPoint(new meta_1.ExceptionField(gfrm_1.GroupFieldsRelationalMapping.KEY_Expt_JiXianGaoShuiWei, 448, 2, '水位极高报警（设定值）', 12), 'ex_shuiweijigaobaojingshedingzhi');
        _this.addPoint(new meta_1.ExceptionField(gfrm_1.GroupFieldsRelationalMapping.KEY_Expt_ChaoYa, 448, 2, '超压报警（压力开关）', 13, meta_1.ExceptionField.Exception_Error), 'ex_chaoyabaojingyalikaiguan');
        _this.addPoint(new meta_1.ExceptionField(gfrm_1.GroupFieldsRelationalMapping.KEY_Expt_ChaoYa, 448, 2, '超压报警（设定值）', 14, meta_1.ExceptionField.Exception_Error), 'ex_chaoyabaojingshedingzhi');
        _this.addPoint(new meta_1.ExceptionField(gfrm_1.GroupFieldsRelationalMapping.KEY_Expt_PaiYanWenDuChaoGao, 448, 2, '排烟超温报警', 15));
        _this.addPoint(new meta_1.ExceptionField('ex_ruanshuixiangqueshuibaojing', 448, 2, '软水箱缺水报警', 0));
        _this.addPoint(new meta_1.ExceptionField('ex_shuidianjiluojicuobaojing', 448, 2, '水电极逻辑错报警', 1));
        _this.addPoint(new meta_1.ExceptionField('ex_yalibiansongqiguzhangbaojing', 448, 2, '压力变送器故障报警', 2));
        _this.addPoint(new meta_1.ExceptionField('ex_shuiweibiansongqiguzhangbaojing', 448, 2, '水位变送器故障报警', 3));
        _this.addPoint(new meta_1.ExceptionField('ex_paiyanwenduchuanganqiguzhangbaojing', 448, 2, '排烟温度传感器故障报警', 4));
        _this.addPoint(new meta_1.ExceptionField('ex_chuyangqiqueshuibaojing', 448, 2, '除氧器缺水报警', 5));
        _this.addPoint(new meta_1.ExceptionField('ex_chuyangqigaoshuiweibaojing', 448, 2, '除氧器高水位报警', 6));
        _this.addPoint(new meta_1.ExceptionField('ex_addshuibengbianpinqiguzhang', 448, 2, '给水泵变频器故障', 7));
        _this.addPoint(new meta_1.ExceptionField('ex_chuyangbengbianpinqiguzhang', 448, 2, '除氧泵变频器故障', 8));
        _this.addPoint(new meta_1.ExceptionField('ex_bushuibeng1guzhang', 450, 2, '补水泵1故障', 8));
        _this.addPoint(new meta_1.ExceptionField('ex_bushuibeng2guzhang', 450, 2, '补水泵2故障', 9));
        _this.addPoint(new meta_1.ExceptionField('ex_chuyangbeng1guzhang', 450, 2, '除氧泵1故障', 10));
        _this.addPoint(new meta_1.ExceptionField('ex_chuyangbeng2guzhang', 450, 2, '除氧泵2故障', 11));
        return _this;
    }
    return Map_PLC_YuReZhengQi;
}(BaseMap_1.Map_PLC));
