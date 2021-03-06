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
    __extends(Map_PLC_RanMeiZhengQi, _super);
    function Map_PLC_RanMeiZhengQi() {
        var _this = _super.call(this) || this;
        _this.addPoint(new CountField_1.CountField(BaseDevice_1.PLC.KEY_POINT_Add_SHUI_BENG, "Water Feeding Pump"));
        _this.addPoint(new CountField_1.CountField(BaseDevice_1.PLC.KEY_POINT_CHU_YANG_BENG, "De-aerator Water Pump"));
        _this.addPoint(new CountField_1.CountField(BaseDevice_1.PLC.KEY_POINT_GU_FENG_FAN, "FD Fan"));
        _this.addPoint(new CountField_1.CountField(BaseDevice_1.PLC.KEY_POINT_YIN_FENG_FAN, "ID Fan"));
        _this.addPoint(new CountField_1.CountField(BaseDevice_1.PLC.KEY_POINT_LU_PAI_FAN, "Chain Grate"));
        _this.addPoint(new CountField_1.CountField(BaseDevice_1.PLC.KEY_POINT_CHU_ZHA_FAN, "Slag Remover"));
        _this.addPoint(new meta_2.BaseInfoField(SdcSoftDevice_1.SdcSoftDevice.KEY_POINT_RUN_HOURS, 9, 2, "Running Hours", "Hours"));
        _this.addPoint(new meta_2.BaseInfoField(SdcSoftDevice_1.SdcSoftDevice.KEY_POINT_RUN_DAYS, 11, 2, "Running Days", "Days"));
        _this.addPoint(new meta_2.BaseInfoField(SdcSoftDevice_1.SdcSoftDevice.KEY_POINT_SYSTEM_STATUS, 13, 2, "System State", '', BaseMap_1.Map_PLC.coms_status));
        _this.addPoint(new FixedValueField_1.FixedValueField(SdcSoftDevice_1.SdcSoftDevice.KEY_POINT_POWER, "Fuel", 2, Map_PLC_RanMeiZhengQi.coms_power));
        _this.addPoint(new FixedValueField_1.FixedValueField(SdcSoftDevice_1.SdcSoftDevice.KEY_POINT_MEDIA, "Medium", 1, Map_PLC_RanMeiZhengQi.coms_media));
        _this.addPoint(new meta_2.BaseInfoField("ba_shuiweizhuangtai", 19, 2, "Water Level State", '', Map_PLC_RanMeiZhengQi.coms_level));
        _this.addPoint(new meta_2.BaseInfoField("ba_ranshaoqizhuangtai", 21, 2, "Burner State", '', BaseMap_1.Map_PLC.coms_ranshaoqi_status));
        _this.addPoint(new meta_1.MockField("mo_zhengqiyali", 35, 4, "Steam Pressure", "MPa"));
        _this.addPoint(new meta_1.MockField("mo_guoluyewei", 39, 4, "Boiler Water Level", "mm"));
        _this.addPoint(new meta_1.MockField("mo_zhengqishunshiliuliang", 43, 4, "Steam Instantaneous Flow Rate", "T/h"));
        _this.addPoint(new meta_1.MockField("mo_bushuishunshiliuliang", 47, 4, "Make-up Water Instantaneous Flow Rate", "m³/h"));
        _this.addPoint(new meta_1.MockField("mo_lutangwendu", 51, 4, "Furnace Temperature", "℃"));
        _this.addPoint(new meta_1.MockField("mo_lutangyali", 55, 4, "Furnace Pressure", "Pa"));
        _this.addPoint(new meta_1.MockField("mo_shengmeiqijinkouyanwen", 59, 4, "Economizer Inlet Flus Gas Temperature", "℃"));
        _this.addPoint(new meta_1.MockField("mo_zuizhongpaiyanwendu", 63, 4, "Discharged Flus Gas Temperature", "℃"));
        _this.addPoint(new meta_1.MockField("mo_zhengqileijiliuliang", 67, 4, "Steam  Integrated Flow Rate", "T"));
        _this.addPoint(new meta_1.MockField("mo_bushuileijiliuliang", 71, 4, "Make-up Integrated Flow Rate", "m³"));
        _this.addPoint(new meta_1.MockField("mo_shengmeiqijinshuiwendu", 75, 4, "Economizer Inlet Water Temperature", "℃"));
        _this.addPoint(new meta_1.MockField("mo_shengmeiqichushuiwendu", 79, 4, "Economizer Outlet Water Temperature", "℃"));
        _this.addPoint(new meta_1.MockField("mo_bushuiwendu", 83, 4, "Make-up Water Temperature", "℃"));
        _this.addPoint(new meta_1.MockField("mo_paiyanyali", 87, 4, "Discharged Flue Gas Pressure", "Pa"));
        _this.addPoint(new meta_1.MockField("mo_addshuibengpinlvfankui", 91, 4, "Water Feeding Pump Frequency Feedback", "Hz"));
        _this.addPoint(new meta_1.MockField("mo_yinfengjipinlvfankui", 95, 4, "ID Fan Frequency Feedback", "Hz"));
        _this.addPoint(new meta_1.MockField("mo_gufengjipinlvfankui", 99, 4, "FD Fan Frequency Feedback", "Hz"));
        _this.addPoint(new meta_1.MockField("mo_ruanshuixiangyewei", 103, 4, "Soft Water Tank Water Level", "%"));
        _this.addPoint(new meta_1.MockField("mo_guorezhengqiyali", 107, 4, "Super-heated Steam Pressure", "MPa"));
        _this.addPoint(new meta_1.MockField("mo_chuyangqiyewei", 111, 4, "De-aerator Water Level", "%"));
        _this.addPoint(new meta_1.MockField("mo_guoreqichukouyanwen", 115, 4, "Super-heater Outlet Flue Gas Temperature", "℃"));
        _this.addPoint(new meta_1.MockField("mo_guoreqizhengqiwendu", 119, 4, "Super-heater Steam Temperature", "℃"));
        _this.addPoint(new meta_1.MockField("mo_baohezhengqiwendu", 123, 4, "Saturated Steam Temperature", "℃"));
        _this.addPoint(new meta_1.MockField("mo_yureqijinyanwendu", 127, 4, "Ai Pre-heater Inlet Flue Gas Temperature", "℃"));
        _this.addPoint(new meta_1.MockField("mo_yureqijinyanyali", 131, 4, "Air Pre-heater Inlet Flue Gas Pressure", "Pa"));
        _this.addPoint(new meta_1.MockField("mo_chuyangqiwendu", 135, 4, "De-aerator Temperature", "℃"));
        _this.addPoint(new meta_1.MockField("mo_chuyangqiyali", 139, 4, "De-aerator Pressure", "KPa"));
        _this.addPoint(new meta_1.MockField("mo_chuyangbengpinlvfankui", 143, 4, "De-aerator Water Pump Frequency Feedback", "Hz"));
        _this.addPoint(new meta_1.MockField("mo_bushuidiandongfafankui", 147, 4, "Make-up Electric Valve Feedback", "%"));
        _this.addPoint(new meta_1.MockField("mo_jianwenshuidiandongfafankui", 151, 4, "Attemperating Water Electric Valve Feedback", "%"));
        _this.addPoint(new meta_1.MockField("mo_chuyangjiarediandongfafankui", 155, 4, "De-aerator Heating Electric Valve Feedback", "%"));
        _this.addPoint(new meta_1.MockField("mo_zhaoqiyali", 159, 4, "Biogas Pressure", "kPa"));
        _this.addPoint(new meta_1.MockField("mo_lutangchukouyanwen", 163, 4, "Furnace Outlet Flue Gas Temperature", "℃"));
        _this.addPoint(new meta_1.MockField("mo_kongyuqichukouyanwen", 167, 4, "Air Pre-heater Outlet Flue Gas Temperature", "℃"));
        _this.addPoint(new meta_1.MockField("mo_shengmeiqichukouyanwen", 171, 4, "Economizer Outlet Flus Gas Temperature", "℃"));
        _this.addPoint(new meta_1.SettingField("se_qiluyalisheding", 248, 4, "Boiler Start Pressure Setting", "MPa"));
        _this.addPoint(new meta_1.SettingField("se_mubiaoyalisheding", 252, 4, "Boiler target Pressure Setting", "MPa"));
        _this.addPoint(new meta_1.SettingField("se_tingluyalisheding", 256, 4, "Bolier Shutdown Pressure Setting", "MPa"));
        _this.addPoint(new meta_1.SettingField("se_chaoyabaojingyalisheding", 260, 4, "Over-pressure Alarm Pressure Setting", "MPa"));
        _this.addPoint(new meta_1.SettingField("se_paiyanchaowenbaojing", 264, 4, "Flue Gas Over-temperature Alarm", "℃"));
        _this.addPoint(new meta_1.SettingField("se_guolushuiweimubiaosheding", 268, 4, "Boiler Water Level Setting", "mm"));
        _this.addPoint(new meta_1.SettingField("se_guolushuiweijigaobaojingsheding", 272, 4, "Boiler Extrem Water Level Alarm Setting", "mm"));
        _this.addPoint(new meta_1.SettingField("se_guolutingbengshuiweisheding", 276, 4, "Boiler Water Pump Shutdown Water Level Setting", "mm"));
        _this.addPoint(new meta_1.SettingField("se_guoluqibengshuiweisheding", 280, 4, "Boiler Water Pump Start Water Level Setting", "mm"));
        _this.addPoint(new meta_1.SettingField("se_guolushuiweijidibaojingsheding", 284, 4, "Boiler Extrem Low Water Level Alarm Setting", "mm"));
        _this.addPoint(new meta_1.SettingField("se_guolushuiweishoudonggeisu", 288, 4, "Manual Boiler Water Level Feeding", "%"));
        _this.addPoint(new meta_1.DeviceField("de_yinfeng_auto", 368, 2, "ID Fan Manual/ Automatic", BaseMap_1.Map_PLC.coms_atuo));
        _this.addPoint(new meta_1.DeviceField(BaseDevice_1.PLC.KEY_POINT_YIN_FENG_FAN_1, 370, 2, "ID Fan Start/ Stop", Map_PLC_RanMeiZhengQi.coms_start_stop));
        _this.addPoint(new meta_1.DeviceField("de_gufeng_auto", 372, 2, "FD Fan Manual/ Automatic", BaseMap_1.Map_PLC.coms_atuo));
        _this.addPoint(new meta_1.DeviceField(BaseDevice_1.PLC.KEY_POINT_GU_FENG_FAN_1, 374, 2, "FD Fan Start/ Stop", Map_PLC_RanMeiZhengQi.coms_start_stop));
        _this.addPoint(new meta_1.DeviceField("de_lupai_auto", 376, 2, "Chain Grate Manual/Automatic", BaseMap_1.Map_PLC.coms_atuo));
        _this.addPoint(new meta_1.DeviceField(BaseDevice_1.PLC.KEY_POINT_LU_PAI_FAN_1, 378, 2, "Chain Grate Start/Stop", Map_PLC_RanMeiZhengQi.coms_start_stop));
        _this.addPoint(new meta_1.DeviceField("de_chuzha_auto", 380, 2, "Slag Removing Manual/Automatic", BaseMap_1.Map_PLC.coms_atuo));
        _this.addPoint(new meta_1.DeviceField(BaseDevice_1.PLC.KEY_POINT_CHU_ZHA_FAN_1, 382, 2, "Slag Removing Start/Stop", Map_PLC_RanMeiZhengQi.coms_start_stop));
        _this.addPoint(new meta_1.DeviceField("de_1_addshuibeng_auto", 384, 2, "1#Water Feeding Pump Manual/Automatic", BaseMap_1.Map_PLC.coms_atuo));
        _this.addPoint(new meta_1.DeviceField(BaseDevice_1.PLC.KEY_POINT_Add_SHUI_BENG_1, 386, 2, "1#Water Feeding Pump Start/Stop", Map_PLC_RanMeiZhengQi.coms_start_stop));
        _this.addPoint(new meta_1.DeviceField("de_2_addshuibeng_auto", 388, 2, "2#Water Feeding Pump Manual/Automatic", BaseMap_1.Map_PLC.coms_atuo));
        _this.addPoint(new meta_1.DeviceField(BaseDevice_1.PLC.KEY_POINT_Add_SHUI_BENG_2, 390, 2, "2#Water Feeding Pump Start/Stop", Map_PLC_RanMeiZhengQi.coms_start_stop));
        _this.addPoint(new meta_1.DeviceField("de_1_chuyangbeng_auto", 392, 2, "1#De-aerator Water Pump Manual/Automatic", BaseMap_1.Map_PLC.coms_atuo));
        _this.addPoint(new meta_1.DeviceField(BaseDevice_1.PLC.KEY_POINT_CHU_YANG_BENG_1, 394, 2, "1#De-aerator Water Pump Start/Stop", Map_PLC_RanMeiZhengQi.coms_start_stop));
        _this.addPoint(new meta_1.DeviceField("de_2_chuyangbeng_auto", 396, 2, "2#De-aerator Water Pump Manual/Automatic", BaseMap_1.Map_PLC.coms_atuo));
        _this.addPoint(new meta_1.DeviceField(BaseDevice_1.PLC.KEY_POINT_CHU_YANG_BENG_2, 398, 2, "2#De-aerator Water Pump Start/Stop", Map_PLC_RanMeiZhengQi.coms_start_stop));
        _this.addPoint(new meta_1.ExceptionField("ex_shuiweijidibaojing_shedingzhi", 448, 2, "Extrem Low Water Level( Setting Value)", 0));
        _this.addPoint(new meta_1.ExceptionField("ex_shuiweijigaobaojing_shedingzhi", 448, 2, "Extrem High Water Level Alarm( Setting Value)", 1));
        _this.addPoint(new meta_1.ExceptionField("ex_chaoyabaojing_yalikaiguan", 448, 2, "Over-pressure Alarm( Pressure Switch)", 2));
        _this.addPoint(new meta_1.ExceptionField("ex_chaoyabaojing_shedingzhi", 448, 2, "Over-pressure Alarm(Setting Value)", 3));
        _this.addPoint(new meta_1.ExceptionField("ex_paiyanchaowenbaojing", 448, 2, "Flue Gas Over-temperature Alarm", 4));
        _this.addPoint(new meta_1.ExceptionField("ex_ruanshuixiangqueshuibaojing", 448, 2, "Soft Water Tank Water Shortage Alarm", 5));
        _this.addPoint(new meta_1.ExceptionField("ex_shuidianjiluojicuobaojing", 448, 2, "Water Electrode Logic Failure Alarm", 6));
        _this.addPoint(new meta_1.ExceptionField("ex_yalibiansongqiguzhangbaojing", 448, 2, "Pressure Transmitter Failure Alarm", 7));
        _this.addPoint(new meta_1.ExceptionField("ex_yinfengjibianpinqiguzhang", 448, 2, "ID Fan Frequency Converter Failure", 8));
        _this.addPoint(new meta_1.ExceptionField("ex_gufengjibianpinqiguzhang", 448, 2, "FD Fan Frequency Converter Failure", 9));
        _this.addPoint(new meta_1.ExceptionField("ex_lupaibianpinqiguzhang", 448, 2, "Chain Grate Frequency Converter Failure", 10));
        _this.addPoint(new meta_1.ExceptionField("ex_chuzhabianpinqiguzhang", 448, 2, "Slag Remover Frequency Converter Failure", 11));
        _this.addPoint(new meta_1.ExceptionField("ex_jishuibianpinqiguzhang", 448, 2, "Water Feeding Pump Frequency Converter Failure", 12));
        _this.addPoint(new meta_1.ExceptionField("ex_shuiweiweidibaojing", 448, 2, "Dangerous Low Water Level Alarm (Electrode)", 13));
        _this.addPoint(new meta_1.ExceptionField("ex_shuiweijidibaojing_dianji", 448, 2, "Extrem Low Water Level( Electrode)", 14));
        _this.addPoint(new meta_1.ExceptionField("ex_shuiweijigaobaojing_dianji", 448, 2, "Extrem High Water Level Alarm( Setting Value)", 15));
        _this.addPoint(new meta_1.ExceptionField("ex_shuiweibiansongqiguzhangbaojing", 450, 2, "Water level Transmitter Failure Alarm", 8));
        _this.addPoint(new meta_1.ExceptionField("ex_paiyanwenduchuanganqiguzhangbaojing", 450, 2, "Flue Gas Temperature Sensor Failure Alarm", 9));
        _this.addPoint(new meta_1.ExceptionField("ex_chuyangqiqueshuibaojing", 450, 2, "De-aerator Water Shortage Alarm", 10));
        _this.addPoint(new meta_1.ExceptionField("ex_chuyangqigaoshuiweibaojing", 450, 2, "High De-aerator Water Level Alarm", 11));
        return _this;
    }
    return Map_PLC_RanMeiZhengQi;
}(BaseMap_1.Map_PLC));
