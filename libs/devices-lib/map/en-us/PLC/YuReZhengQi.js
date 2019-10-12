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
var meta_2 = require("../../../meta/NJZJ/485/meta");
var SdcSoftDevice_1 = require("../../../devices/SdcSoftDevice");
var FixedValueField_1 = require("../../../meta/FixedValueField");
module.exports = /** @class */ (function (_super) {
    __extends(Map_PLC_YuReZhengQi, _super);
    function Map_PLC_YuReZhengQi() {
        var _this = _super.call(this) || this;
        _this.addPoint(new CountField_1.CountField(BaseDevice_1.PLC.KEY_POINT_Add_SHUI_BENG, "Feed water pump"));
        _this.addPoint(new CountField_1.CountField(BaseDevice_1.PLC.KEY_POINT_CHU_YANG_BENG, "Deaeration pump"));
        _this.addPoint(new meta_2.BaseInfoField(SdcSoftDevice_1.SdcSoftDevice.KEY_POINT_RUN_HOURS, 9, 2, "Running Hours", "Hours"));
        _this.addPoint(new meta_2.BaseInfoField(SdcSoftDevice_1.SdcSoftDevice.KEY_POINT_RUN_DAYS, 11, 2, "Running Days", "Days"));
        _this.addPoint(new meta_2.BaseInfoField(SdcSoftDevice_1.SdcSoftDevice.KEY_POINT_SYSTEM_STATUS, 13, 2, "System State", '', BaseMap_1.Map_PLC.coms_status));
        _this.addPoint(new FixedValueField_1.FixedValueField(SdcSoftDevice_1.SdcSoftDevice.KEY_POINT_POWER, "Fuel", 30, Map_PLC_YuReZhengQi.coms_power));
        _this.addPoint(new FixedValueField_1.FixedValueField(SdcSoftDevice_1.SdcSoftDevice.KEY_POINT_MEDIA, "Medium", 1, Map_PLC_YuReZhengQi.coms_media));
        _this.addPoint(new meta_2.BaseInfoField("ba_shuiweizhuangtai", 19, 2, "Water Level State", '', Map_PLC_YuReZhengQi.coms_level));
        _this.addPoint(new meta_2.BaseInfoField("ba_ranshaoqizhuangtai", 21, 2, "Burner State", '', BaseMap_1.Map_PLC.coms_ranshaoqi_status));
        _this.addPoint(new meta_1.MockField("mo_zhengqiyali", 35, 4, "Steam pressure", "MPa"));
        _this.addPoint(new meta_1.MockField("mo_zhengqiwendu", 39, 4, "Steam temperature", "℃"));
        _this.addPoint(new meta_1.MockField("mo_guolushuiwei", 43, 4, "Boiler water level", "mm"));
        _this.addPoint(new meta_1.MockField("mo_zhengqishunshiliuliang", 47, 4, "Instantaneous flow rate of steam", "T/H"));
        _this.addPoint(new meta_1.MockField("mo_bushuishunshiliuliang", 51, 4, "Instantaneous flow rate of replenishment water", "m³/h"));
        _this.addPoint(new meta_1.MockField("mo_zhengqileijiliuliang", 55, 4, "Cumulative steam flow", "T"));
        _this.addPoint(new meta_1.MockField("mo_bushuileijiliuliang", 59, 4, "Cumulative flow rate of recharge", "m³"));
        _this.addPoint(new meta_1.MockField("mo_jinyanwendu", 63, 4, "Inlet temperature", "℃"));
        _this.addPoint(new meta_1.MockField("mo_jinyanyali", 67, 4, "Smoke pressure", "Kpa"));
        _this.addPoint(new meta_1.MockField("mo_chuyanwendu", 71, 4, "Smoke temperature", "℃"));
        _this.addPoint(new meta_1.MockField("mo_chuyanyali", 75, 4, "Smoke pressure", "Kpa"));
        _this.addPoint(new meta_1.MockField("mo_bushuiwendu", 79, 4, "Make-up temperature", "℃"));
        _this.addPoint(new meta_1.MockField("mo_bushuiyali", 83, 4, "Water supplement pressure", "Mpa"));
        _this.addPoint(new meta_1.MockField("mo_bushuibengpinlvfankui", 87, 4, "Frequency Feedback of Supplementary Pump", "Hz"));
        _this.addPoint(new meta_1.MockField("mo_chushuibengpinlvfankui", 91, 4, "Frequency feedback of dewatering pump", "Hz"));
        _this.addPoint(new meta_1.MockField("mo_ruanshuixiangyewei", 95, 4, "Soft water tank level", "cm"));
        _this.addPoint(new meta_1.MockField("mo_chuyangqiyewei", 99, 4, "Deaerator level", "cm"));
        _this.addPoint(new meta_1.MockField("mo_chuyangqiwendu", 103, 4, "Deaerator temperature", "℃"));
        _this.addPoint(new meta_1.MockField("mo_chuyangqiyali", 107, 4, "Deaerator pressure", "KPa"));
        _this.addPoint(new meta_1.MockField("mo_bushuidiandongfafankui", 111, 4, "Feedback of Supplementary Electric Valve", "%"));
        _this.addPoint(new meta_1.MockField("mo_chuyangbushuidiandongfafankui", 115, 4, "Feedback of Electric Valve for Deoxygenation and Supplementary Water", "%"));
        _this.addPoint(new meta_1.MockField("mo_chuyangzhengqidiandongfafankui", 119, 4, "Feedback of Deoxygenated Steam Electric Valve", "%"));
        _this.addPoint(new meta_1.MockField("mo_jinyandiandongfafankui", 123, 4, "Feedback of smoke intake electric valve", "%"));
        _this.addPoint(new meta_1.MockField("mo_chuyandiandongfafankui", 127, 4, "Feedback of smoke discharge electric valve", "%"));
        _this.addPoint(new meta_1.MockField("mo_guoluzhuzhengqitiaojiefafankui", 131, 4, "Feedback of Boiler Main Steam Regulating Valve", "%"));
        _this.addPoint(new meta_1.MockField("mo_shigufangshuidiandongfafankui", 135, 4, "Feedback of Accident Discharge Electric Valve", "%"));
        _this.addPoint(new meta_1.MockField("mo_jinjipaiqidiandongfafankui", 139, 4, "Emergency Exhaust Electric Valve Feedback", "%"));
        _this.addPoint(new meta_1.MockField("mo_panyanwenduxianshi", 143, 4, "Exhaust smoke temperature display", "℃"));
        _this.addPoint(new meta_1.SettingField("se_chaoyabaojingyalisheding", 248, 4, "Overpressure alarm pressure setting", "MPa"));
        _this.addPoint(new meta_1.SettingField("se_guolushuiweimubiaosheding", 252, 4, "Target Setting of Boiler Water Level", "mm"));
        _this.addPoint(new meta_1.SettingField("se_guolushuiweijigaobaojingsheding", 256, 4, "Alarm setting for extremely high water level of boiler", "mm"));
        _this.addPoint(new meta_1.SettingField("se_guolushuiweigaosheding", 260, 4, "Setting of Boiler Water Level Height", "mm"));
        _this.addPoint(new meta_1.SettingField("se_guolushuiweidisheding", 264, 4, "Low Setting of Boiler Water Level", "mm"));
        _this.addPoint(new meta_1.SettingField("se_guolushuiweijidibaojingsheding", 268, 4, "Boiler Water Level Very Low Alarm Setting", "mm"));
        _this.addPoint(new meta_1.SettingField("se_jishuibengshoudongpinlvsheding", 272, 4, "Manual Frequency Setting of Feed Pump", "Hz"));
        _this.addPoint(new meta_1.SettingField("se_chuyangqibushuimubiaosheding", 276, 4, "Target setting of deaerator replenishment", "mm"));
        _this.addPoint(new meta_1.SettingField("se_chuyangqishuiweijigaobaojingsheding", 280, 4, "Alarm Setting for Extremely High Water Level of Deaerator", "CM"));
        _this.addPoint(new meta_1.SettingField("se_chuyangqitingbengyeweisheding", 284, 4, "Deoxygenator Stop Pump Level Setting", "CM"));
        _this.addPoint(new meta_1.SettingField("se_chuyangqiqibengyeweisheding", 288, 4, "Deoxidizer Start-up Level Setting", "CM"));
        _this.addPoint(new meta_1.SettingField("se_chuyangqijidibaojingsheding", 292, 4, "Deaerator Very Low Alarm Settings", "CM"));
        _this.addPoint(new meta_1.SettingField("se_chuyangqibushuishoudonggeisu", 296, 4, "Manual setting of deaerator replenishment", "%"));
        _this.addPoint(new meta_1.SettingField("se_jinyandiandongfageiding", 300, 4, "Given smoke intake electric valve", "%"));
        _this.addPoint(new meta_1.SettingField("se_chuyandiandongfageiding", 304, 4, "Given the Electric Valve for Exhausting Smoke", "%"));
        _this.addPoint(new meta_1.SettingField("se_chuyangqizhengqishoudongjiding", 308, 4, "Deaerator Steam Manual Setting", "%"));
        _this.addPoint(new meta_1.SettingField("se_chuyangqiwendumubiaojiding", 312, 4, "Deaerator temperature target setting", "℃"));
        _this.addPoint(new meta_1.SettingField("se_ruanshuixiangqueshuibaojingsheding", 316, 4, "Water shortage alarm setting for soft water tank", "%"));
        _this.addPoint(new meta_1.SettingField("se_paiyanchaowenbaojingsheding", 320, 4, "Setting of smoke exhaust overtemperature alarm", "℃"));
        _this.addPoint(new meta_1.DeviceField("de_1_addshuibeng_auto", 368, 2, "1#Make-up Pump Manual/Automatic", BaseMap_1.Map_PLC.coms_atuo));
        _this.addPoint(new meta_1.DeviceField(BaseDevice_1.PLC.KEY_POINT_Add_SHUI_BENG_1, 370, 2, "1#Make-up Pump On/Off", Map_PLC_YuReZhengQi.coms_start_stop));
        _this.addPoint(new meta_1.DeviceField("de_2_addshuibeng_auto", 372, 2, "2#Make-up Pump Manual/Automatic", BaseMap_1.Map_PLC.coms_atuo));
        _this.addPoint(new meta_1.DeviceField(BaseDevice_1.PLC.KEY_POINT_Add_SHUI_BENG_2, 374, 2, "2#Make-up Pump On/Off", Map_PLC_YuReZhengQi.coms_start_stop));
        _this.addPoint(new meta_1.DeviceField("de_1_chuyangbeng_auto", 376, 2, "1#Deaeration pump Manual/Automatic ", BaseMap_1.Map_PLC.coms_atuo));
        _this.addPoint(new meta_1.DeviceField(BaseDevice_1.PLC.KEY_POINT_CHU_YANG_BENG_1, 378, 2, "1#Deaeration pump On/Off", Map_PLC_YuReZhengQi.coms_start_stop));
        _this.addPoint(new meta_1.DeviceField("de_2_chuyangbeng_auto", 380, 2, "2#Deaeration pump Manual/Automatic", BaseMap_1.Map_PLC.coms_atuo));
        _this.addPoint(new meta_1.DeviceField(BaseDevice_1.PLC.KEY_POINT_CHU_YANG_BENG_2, 382, 2, "2#Deaeration pump On/Off", Map_PLC_YuReZhengQi.coms_start_stop));
        _this.addPoint(new meta_1.DeviceField("de_baojingshuchuzhishi", 384, 2, "Alarm output indication", Map_PLC_YuReZhengQi.coms_open_close));
        _this.addPoint(new meta_1.ExceptionField("ex_shuiweiweidibaojingdianji", 448, 2, "Alarm (electrode) for dangerous low water level", 8));
        _this.addPoint(new meta_1.ExceptionField("ex_shuiweijidibaojingdianji", 448, 2, "Very Low Water Level Alarm (Electrode)", 9));
        _this.addPoint(new meta_1.ExceptionField("ex_shuiweijigaobaojingdianji", 448, 2, "Alarm (electrode) for extremely high water level", 10));
        _this.addPoint(new meta_1.ExceptionField("ex_shuiweijidibaojingshedingzhi", 448, 2, "Very low water level alarm (set value)", 11));
        _this.addPoint(new meta_1.ExceptionField("ex_shuiweijigaobaojingshedingzhi", 448, 2, "Alarm of extremely high water level (set value)", 12));
        _this.addPoint(new meta_1.ExceptionField("ex_chaoyabaojingyalikaiguan", 448, 2, "Overvoltage alarm (pressure switch)", 13));
        _this.addPoint(new meta_1.ExceptionField("ex_chaoyabaojingshedingzhi", 448, 2, "Overvoltage alarm (set value)", 14));
        _this.addPoint(new meta_1.ExceptionField("ex_paiyanchaowenbaojing", 448, 2, "Exhaust smoke overtemperature alarm", 15));
        _this.addPoint(new meta_1.ExceptionField("ex_ruanshuixiangqueshuibaojing", 448, 2, "Water shortage alarm for soft water tank", 0));
        _this.addPoint(new meta_1.ExceptionField("ex_shuidianjiluojicuobaojing", 448, 2, "Water Electrode Logic Error Alarm", 1));
        _this.addPoint(new meta_1.ExceptionField("ex_yalibiansongqiguzhangbaojing", 448, 2, "Fault Alarm of Pressure Transmitter", 2));
        _this.addPoint(new meta_1.ExceptionField("ex_shuiweibiansongqiguzhangbaojing", 448, 2, "Fault alarm of water level transmitter", 3));
        _this.addPoint(new meta_1.ExceptionField("ex_paiyanwenduchuanganqiguzhangbaojing", 448, 2, "Fault alarm of smoke exhaust temperature sensor", 4));
        _this.addPoint(new meta_1.ExceptionField("ex_chuyangqiqueshuibaojing", 448, 2, "Deaerator water shortage alarm", 5));
        _this.addPoint(new meta_1.ExceptionField("ex_chuyangqigaoshuiweibaojing", 448, 2, "Deaerator High Water Level Alarm", 6));
        _this.addPoint(new meta_1.ExceptionField("ex_addshuibengbianpinqiguzhang", 448, 2, "Fault of Frequency Converter of Feedwater Pump", 7));
        _this.addPoint(new meta_1.ExceptionField("ex_chuyangbengbianpinqiguzhang", 448, 2, "Fault of Deoxygenation Pump Frequency Converter", 8));
        _this.addPoint(new meta_1.ExceptionField("ex_bushuibeng1guzhang", 450, 2, "Failure of Supplementary Pump 1", 8));
        _this.addPoint(new meta_1.ExceptionField("ex_bushuibeng2guzhang", 450, 2, "Failure of Supplementary Pump 2", 9));
        _this.addPoint(new meta_1.ExceptionField("ex_chuyangbeng1guzhang", 450, 2, "Deaerator Pump 1 Fault", 10));
        _this.addPoint(new meta_1.ExceptionField("ex_chuyangbeng2guzhang", 450, 2, "Deoxygenation Pump 2 Failure", 11));
        return _this;
    }
    return Map_PLC_YuReZhengQi;
}(BaseMap_1.Map_PLC));
