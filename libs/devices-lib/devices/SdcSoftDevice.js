"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DeviceFieldForUI_1 = require("../meta/DeviceFieldForUI");
var Element_1 = require("../entities/Element");
var comms_1 = require("@sdcsoft/comms");
var ByteField_1 = require("../meta/ByteField");
var map_1 = require("../map/map");
var Media;
(function (Media) {
    Media[Media["ReShui"] = 0] = "ReShui";
    Media[Media["ZhengQi"] = 1] = "ZhengQi";
    Media[Media["DaoReYou"] = 2] = "DaoReYou";
    Media[Media["ReFeng"] = 3] = "ReFeng";
    Media[Media["ZhenKong"] = 4] = "ZhenKong";
})(Media = exports.Media || (exports.Media = {}));
var Power;
(function (Power) {
    Power[Power["YouQi"] = 0] = "YouQi";
    Power[Power["Dian"] = 1] = "Dian";
    Power[Power["Mei"] = 2] = "Mei";
    Power[Power["ShengWuZhi"] = 3] = "ShengWuZhi";
    Power[Power["YuRe"] = 30] = "YuRe";
})(Power = exports.Power || (exports.Power = {}));
var SdcSoftDevice = /** @class */ (function () {
    function SdcSoftDevice() {
        this.fieldMap = new comms_1.StringHashMap();
        this.commandMap = new comms_1.StringHashMap();
        this.modbusNo = 1;
        this.BYTE_ARRAY_LENGTH = 0;
        this.power = SdcSoftDevice.POWER_MEDIA_VALUE_NULL;
        this.media = SdcSoftDevice.POWER_MEDIA_VALUE_NULL;
        this.deviceNo = '';
        this.warningMsg = '';
        /**
         * 设置设备类型信息
         */
        this.typeName = '';
        this.fieldMap.addItem(comms_1.GroupKeys.KEY_BASE, new comms_1.StringHashMap());
        this.fieldMap.addItem(comms_1.GroupKeys.KEY_EXCEPTION, new comms_1.StringHashMap());
        this.fieldMap.addItem(comms_1.GroupKeys.KEY_MOCK, new comms_1.StringHashMap());
        this.fieldMap.addItem(comms_1.GroupKeys.KEY_SETTING, new comms_1.StringHashMap());
        this.fieldMap.addItem(comms_1.GroupKeys.KEY_DEVICE, new comms_1.StringHashMap());
        this.fieldMap.addItem(comms_1.GroupKeys.KEY_WEEK, new comms_1.StringHashMap());
        this.fieldMap.addItem(comms_1.GroupKeys.KEY_START_STOP, new comms_1.StringHashMap());
        this.fieldMap.addItem(comms_1.GroupKeys.KEY_OPEN_CLOSE, new comms_1.StringHashMap());
        this.fieldMap.addItem(map_1.map.KEY_Count_Fields, new comms_1.StringHashMap());
    }
    SdcSoftDevice.prototype.setModbusNo = function (no) {
        this.modbusNo = no;
    };
    SdcSoftDevice.prototype.initCommandsMapKeys = function (map) {
        this.commandMap = map;
    };
    SdcSoftDevice.prototype.setPower = function (power) {
        this.power = power;
    };
    SdcSoftDevice.prototype.setMedia = function (media) {
        this.media = media;
    };
    SdcSoftDevice.prototype.setDeviceNo = function (deviceNo) {
        this.deviceNo = deviceNo;
    };
    SdcSoftDevice.prototype.getFieldsMap = function (groupKey) {
        return this.fieldMap.getItem(groupKey);
    };
    SdcSoftDevice.prototype.getBaseInfoFields = function () {
        return this.getFieldsMap(comms_1.GroupKeys.KEY_BASE);
    };
    SdcSoftDevice.prototype.getDeviceFields = function () {
        return this.getFieldsMap(comms_1.GroupKeys.KEY_DEVICE);
    };
    SdcSoftDevice.prototype.getExceptionFields = function () {
        return this.getFieldsMap(comms_1.GroupKeys.KEY_EXCEPTION);
    };
    SdcSoftDevice.prototype.getMockFields = function () {
        return this.getFieldsMap(comms_1.GroupKeys.KEY_MOCK);
    };
    SdcSoftDevice.prototype.getSettingFields = function () {
        return this.getFieldsMap(comms_1.GroupKeys.KEY_SETTING);
    };
    SdcSoftDevice.prototype.getStartStopFields = function () {
        return this.getFieldsMap(comms_1.GroupKeys.KEY_START_STOP);
    };
    SdcSoftDevice.prototype.getOpenCloseFields = function () {
        return this.getFieldsMap(comms_1.GroupKeys.KEY_OPEN_CLOSE);
    };
    SdcSoftDevice.prototype.getCountFields = function () {
        return this.getFieldsMap(map_1.map.KEY_Count_Fields);
    };
    SdcSoftDevice.prototype.getExceptionCount = function () {
        return this.getExceptionFields().count;
    };
    SdcSoftDevice.prototype.getDeviceStatus = function () {
        return this.getBaseInfoFields().getItem(SdcSoftDevice.KEY_POINT_SYSTEM_STATUS);
    };
    SdcSoftDevice.prototype.addCommand = function (cmdGroupKey, cmd) {
        if (this.commandMap.containsKey(cmdGroupKey)) {
            this.commandMap.getItem(cmdGroupKey).push(cmd);
        }
        else {
            var value = [cmd];
            this.commandMap.addItem(cmdGroupKey, value);
        }
    };
    SdcSoftDevice.prototype.addUIField = function (field) {
        if (null == field)
            return;
        var key = field.getKey();
        if (this.fieldMap.containsKey(key)) {
            this.fieldMap.getItem(key).addItem(field.getName(), field);
        }
    };
    SdcSoftDevice.prototype.addField = function (field) {
        if (field instanceof ByteField_1.ByteField) {
            //需要剔除纯控制程序点位
            var ui = field.getDeviceFieldForUI();
            if (ui) {
                this.addUIField(ui);
            }
            //处理保护执行命令的点位
            var cmd = field.getCommand();
            if (cmd) {
                this.addCommand(field.getCommandGroupKey(), cmd);
            }
            return;
        }
        if (field instanceof DeviceFieldForUI_1.DeviceFieldForUI) {
            this.addUIField(field);
        }
    };
    SdcSoftDevice.prototype.removeField = function (groupKey, fieldName) {
        this.fieldMap.getItem(groupKey).remove(fieldName);
    };
    /**
     * 获取炉子元素信息
     * @returns AElement
     */
    SdcSoftDevice.prototype.getStoveElement = function () {
        var element = new Element_1.Element();
        element.setPrefix(Element_1.Element.Prefix_Stove);
        element.setTitle('锅炉');
        element.SetValues(Element_1.Element.Index_A_Power, this.power, this.media, this.getPowerInfo(), SdcSoftDevice.Style_Horizontal);
        return element;
    };
    SdcSoftDevice.prototype.validateFalse = function (bytesLength) {
        //console.log(''+this.BYTE_ARRAY_LENGTH+'-'+bytesLength)
        return this.BYTE_ARRAY_LENGTH != bytesLength;
    };
    SdcSoftDevice.prototype.getCommands = function () {
        var _this = this;
        this.commandMap.each(function (key, value) {
            for (var index in value) {
                value[index].setModbusNo(_this.modbusNo);
            }
        });
        return this.commandMap;
    };
    /**
     * 获取设备的子类型命令
     */
    SdcSoftDevice.prototype.getSubDeviceType = function () {
        return SdcSoftDevice.NO_SUB_DEVICE_TYPE;
    };
    SdcSoftDevice.prototype.setTypeName = function (typeName) {
        this.typeName = typeName;
    };
    /**
     * 获取设备类型信息
     */
    SdcSoftDevice.prototype.getTypeName = function () {
        return this.typeName;
    };
    SdcSoftDevice.prototype.handleCommandFields = function (commandsGroup) {
        var _this = this;
        commandsGroup.each(function (key, values) {
            values.forEach(function (v) {
                _this.addCommand(key, v);
            });
        });
        commandsGroup.clear();
    };
    SdcSoftDevice.POWER_MEDIA_VALUE_NULL = -1;
    SdcSoftDevice.KEY_POINT_SYSTEM_STATUS = 'o_system_status';
    SdcSoftDevice.KEY_POINT_POWER = 'o_power';
    SdcSoftDevice.KEY_POINT_MEDIA = 'o_media';
    SdcSoftDevice.KEY_POINT_RUN_LIFE = 'ba_yunxingshijian';
    SdcSoftDevice.KEY_POINT_RUN_DAYS = 'ba_yunxingtianshu';
    SdcSoftDevice.KEY_POINT_RUN_HOURS = 'ba_yunxingxiaoshishu';
    SdcSoftDevice.KEY_POINT_JIA_RE_ZU = 'jia_re_zu_count';
    SdcSoftDevice.Style_Horizontal = 0;
    SdcSoftDevice.Style_Vertical = 1;
    /*
    设备类型由用户确认时执行的逻辑
     子类型映射map
  
    private subTypes = new StringHashMap<string>()


    getDeviceType(): string {
        return ''
    }
 
    setSubTypes(map:StringHashMap<string>):void{
        this.subTypes = map
    }
    
    /
     * 根据子类型展示名称获取子类型名称
     * @param key 子类型展示名称
     
    getSubDeviceType(key: string): string {
        return this.subTypes.getItem(key)
    }
    
     * 获取子类型展示名称列表
     
    getSubTypesNameArray() {
        return this.subTypes.Keys
    }
    
     * 获取设备的警告信息
     
    getWarningMsg(){
        return this.warningMsg
    }
    
     * 设置设备的警告信息
     
    setWarningMsg(msg:string){
        this.warningMsg = msg
    }
    */
    /**
     * 自动确认设备类型的逻辑
     */
    /**
     * 无子类型的标识
     */
    SdcSoftDevice.NO_SUB_DEVICE_TYPE = '-1';
    return SdcSoftDevice;
}());
exports.SdcSoftDevice = SdcSoftDevice;
