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
Object.defineProperty(exports, "__esModule", { value: true });
var SdcSoftDevice_1 = require("../../SdcSoftDevice");
var Element_1 = require("../../../entities/Element");
var Collections_1 = require("../../../entities/Collections");
var gfrm_1 = require("@sdcsoft/gfrm");
var IP = /** @class */ (function (_super) {
    __extends(IP, _super);
    function IP() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IP.prototype.handleByteField = function (field, bytes) {
        switch (field.getBytesLength()) {
            case 0:
            case 2:
                //if (field.haveValue(bytes[field.getStartIndex() + 1], bytes[field.getStartIndex()])) {
                if (field.haveValue(bytes[field.getStartIndex() + 1], bytes[field.getStartIndex()])) {
                    this.addField(field);
                }
                break;
            default:
                if (field.haveValue(bytes[field.getStartIndex() + 1], bytes[field.getStartIndex()])) {
                    this.addField(field);
                }
                break;
        }
    };
    IP.prototype.getDeviceFocusFields = function () {
        var map = this.getBaseInfoFields();
        //先将所有设备的加入组数移除
        var jiarezucount = map.getItem(IP.KEY_POINT_JIA_RE_ZU);
        var list = new Collections_1.List();
        list.push(map.getItem(SdcSoftDevice_1.SdcSoftDevice.KEY_POINT_RUN_DAYS));
        list.push(map.getItem(SdcSoftDevice_1.SdcSoftDevice.KEY_POINT_RUN_HOURS));
        if (this.power == SdcSoftDevice_1.Power.Dian) {
            var f = this.getDeviceFields().getItem('de_jiarezu');
            jiarezucount.setValue(f.getValue() & 0x7F);
            //计算投入的加入组数，并为电炉添加该点位
            list.push(jiarezucount);
            if (this.media == SdcSoftDevice_1.Media.ReShui) {
                var map2 = this.getMockFields();
                map2.each(function (k, v) {
                    if (v.getName() == gfrm_1.GroupFieldsRelationalMapping.KEY_MOCK_ChuKouWenDu) {
                        list.push(v);
                        return;
                    }
                    if (v.getName() == gfrm_1.GroupFieldsRelationalMapping.KEY_MOCK_HuiLiuWenDu) {
                        list.push(v);
                        return;
                    }
                });
                list.push(map.getItem('ba_shuixiangshuiweizhuangtai'));
                list.push(map.getItem('ba_guolushuiweizhuangtai'));
            }
            else if (this.media == SdcSoftDevice_1.Media.DaoReYou) {
            }
            else if (this.media == SdcSoftDevice_1.Media.ReFeng) {
            }
            else if (this.media == SdcSoftDevice_1.Media.ZhengQi) {
                list.push(map.getItem('ba_guolushuiweizhuangtai'));
                var item = map.getItem('ba_guoluyalizhuangtai');
                if (item) {
                    list.push(item);
                }
                else {
                    var map2 = this.getMockFields();
                    list.push(map2.getItem(gfrm_1.GroupFieldsRelationalMapping.KEY_MOCK_ZhengQiYaLi));
                }
            }
            else if (this.media == SdcSoftDevice_1.Media.ZhenKong) {
            }
        }
        else if (this.power == SdcSoftDevice_1.Power.Mei) {
            map.remove(IP.KEY_POINT_JIA_RE_ZU);
            if (this.media == SdcSoftDevice_1.Media.ReShui) {
                var map2 = this.getMockFields();
                list.push(map2.getItem(gfrm_1.GroupFieldsRelationalMapping.KEY_MOCK_PaiYanWenDu));
                map2.each(function (k, v) {
                    if (v.getName() == gfrm_1.GroupFieldsRelationalMapping.KEY_MOCK_ChuKouWenDu) {
                        list.push(v);
                        return;
                    }
                    if (v.getName() == gfrm_1.GroupFieldsRelationalMapping.KEY_MOCK_HuiLiuWenDu) {
                        list.push(v);
                        return;
                    }
                });
                // list.push(map2.getItem('mo_chukouwendu'))
                // list.push(map2.getItem('mo_rukouwendu'))
                var item = map.getItem('ba_guoluyalizhuangtai');
                if (item) {
                    list.push(item);
                }
                else {
                    list.push(map2.getItem(gfrm_1.GroupFieldsRelationalMapping.KEY_MOCK_ZhengQiYaLi));
                }
            }
            else if (this.media == SdcSoftDevice_1.Media.DaoReYou) {
                var map2 = this.getMockFields();
                list.push(map2.getItem(gfrm_1.GroupFieldsRelationalMapping.KEY_MOCK_PaiYanWenDu));
                map2.each(function (k, v) {
                    if (v.getName() == gfrm_1.GroupFieldsRelationalMapping.KEY_MOCK_ChuKouWenDu) {
                        list.push(v);
                        return;
                    }
                    if (v.getName() == gfrm_1.GroupFieldsRelationalMapping.KEY_MOCK_HuiLiuWenDu) {
                        list.push(v);
                        return;
                    }
                });
                var item = map.getItem('ba_guoluyalizhuangtai');
                if (item) {
                    list.push(item);
                }
                else {
                    list.push(map2.getItem(gfrm_1.GroupFieldsRelationalMapping.KEY_MOCK_ZhengQiYaLi));
                }
            }
            else if (this.media == SdcSoftDevice_1.Media.ReFeng) {
            }
            else if (this.media == SdcSoftDevice_1.Media.ZhengQi) {
                var map2 = this.getMockFields();
                var item = map.getItem('ba_guoluyalizhuangtai');
                if (item) {
                    list.push(item);
                }
                else {
                    list.push(map2.getItem(gfrm_1.GroupFieldsRelationalMapping.KEY_MOCK_ZhengQiYaLi));
                }
                list.push(map2.getItem(gfrm_1.GroupFieldsRelationalMapping.KEY_MOCK_PaiYanWenDu));
                list.push(map.getItem('ba_guolushuiweizhuangtai'));
            }
            else if (this.media == SdcSoftDevice_1.Media.ZhenKong) {
            }
        }
        else if (this.power == SdcSoftDevice_1.Power.ShengWuZhi) {
            map.remove(IP.KEY_POINT_JIA_RE_ZU);
            if (this.media == SdcSoftDevice_1.Media.ReShui) {
            }
            else if (this.media == SdcSoftDevice_1.Media.DaoReYou) {
            }
            else if (this.media == SdcSoftDevice_1.Media.ReFeng) {
            }
            else if (this.media == SdcSoftDevice_1.Media.ZhengQi) {
            }
            else if (this.media == SdcSoftDevice_1.Media.ZhenKong) {
            }
        }
        else if (this.power == SdcSoftDevice_1.Power.YouQi) {
            map.remove(IP.KEY_POINT_JIA_RE_ZU);
            var map2 = this.getMockFields();
            if (this.media == SdcSoftDevice_1.Media.ReShui) {
                list.push(map2.getItem(gfrm_1.GroupFieldsRelationalMapping.KEY_MOCK_PaiYanWenDu));
                map2.each(function (k, v) {
                    if (v.getName() == gfrm_1.GroupFieldsRelationalMapping.KEY_MOCK_ChuKouWenDu) {
                        list.push(v);
                        return;
                    }
                    if (v.getName() == gfrm_1.GroupFieldsRelationalMapping.KEY_MOCK_HuiLiuWenDu) {
                        list.push(v);
                        return;
                    }
                });
                list.push(map.getItem('ba_guolushuiweizhuangtai'));
                list.push(map.getItem('ba_shuixiangshuiweizhuangtai'));
            }
            else if (this.media == SdcSoftDevice_1.Media.DaoReYou) {
                list.push(map2.getItem(gfrm_1.GroupFieldsRelationalMapping.KEY_MOCK_PaiYanWenDu));
                map2.each(function (k, v) {
                    if (v.getName() == gfrm_1.GroupFieldsRelationalMapping.KEY_MOCK_ChuKouWenDu) {
                        list.push(v);
                        return;
                    }
                    if (v.getName() == gfrm_1.GroupFieldsRelationalMapping.KEY_MOCK_HuiLiuWenDu) {
                        list.push(v);
                        return;
                    }
                });
            }
            else if (this.media == SdcSoftDevice_1.Media.ReFeng) {
                var map3 = this.getDeviceFields();
                list.push(map2.getItem(gfrm_1.GroupFieldsRelationalMapping.KEY_MOCK_PaiYanWenDu));
                map2.each(function (k, v) {
                    if (v.getName() == gfrm_1.GroupFieldsRelationalMapping.KEY_MOCK_ChuKouWenDu) {
                        list.push(v);
                        return;
                    }
                    if (v.getName() == gfrm_1.GroupFieldsRelationalMapping.KEY_MOCK_HuiLiuWenDu) {
                        list.push(v);
                        return;
                    }
                });
                list.push(map3.getItem('de_ranshaoqi'));
                list.push(map3.getItem('de_yinfengji'));
            }
            else if (this.media == SdcSoftDevice_1.Media.ZhengQi) {
                list.push(map.getItem('ba_guolushuiweizhuangtai'));
                list.push(map2.getItem(gfrm_1.GroupFieldsRelationalMapping.KEY_MOCK_PaiYanWenDu));
                var item = map.getItem('ba_guoluyalizhuangtai');
                if (item) {
                    list.push(item);
                }
                else {
                    list.push(map2.getItem('mo_zhengqiyali'));
                }
            }
            else if (this.media == SdcSoftDevice_1.Media.ZhenKong) {
                list.push(map2.getItem(gfrm_1.GroupFieldsRelationalMapping.KEY_MOCK_PaiYanWenDu));
                map2.each(function (k, v) {
                    if (v.getName() == gfrm_1.GroupFieldsRelationalMapping.KEY_MOCK_ChuKouWenDu) {
                        list.push(v);
                        return;
                    }
                    if (v.getName() == gfrm_1.GroupFieldsRelationalMapping.KEY_MOCK_HuiLiuWenDu) {
                        list.push(v);
                        return;
                    }
                });
                list.push(map.getItem('ba_guolushuiweizhuangtai'));
                var item = map.getItem('ba_guoluyalizhuangtai');
                if (item) {
                    list.push(item);
                }
                else {
                    list.push(map2.getItem(gfrm_1.GroupFieldsRelationalMapping.KEY_MOCK_ZhengQiYaLi));
                }
            }
        }
        return list.toArray();
    };
    IP.prototype.getPowerInfo = function () {
        if (this.power == SdcSoftDevice_1.Power.Dian) {
            // console.log('电')
            return this.getDeviceFields().getItem('de_jiarezu').getValue() > 0 ? 1 : 0;
        }
        else if (this.power == SdcSoftDevice_1.Power.Mei) {
            // console.log('煤')
            // return this.getDeviceFields().getItem(IP.KEY_POINT_YIN_FENG_JI).getValue() > 0x7F ? 1 : 0
            return this.getDeviceFields().getItem(IP.KEY_POINT_YIN_FENG_JI).getValue() > 0 ? 1 : 0;
        }
        else if (this.power == SdcSoftDevice_1.Power.ShengWuZhi) {
            // console.log('生')
            // return this.getDeviceFields().getItem(IP.KEY_POINT_YIN_FENG_JI).getValue() > 0x7F ? 1 : 0
            return this.getDeviceFields().getItem(IP.KEY_POINT_YIN_FENG_JI).getValue() > 0 ? 1 : 0;
        }
        else if (this.power == 4) { //余热炉
            return 0;
        }
        console.log('油');
        var v = this.getDeviceFields().getItem(IP.KEY_POINT_RAN_SHAO_QI).getValue(); // > 0x7F ? 1 : 0
        return v;
    };
    IP.prototype.getBeng = function () {
        return this.getElements(IP.Device_Suffix_Beng, Element_1.Element.Prefix_Beng, Element_1.Element.Index_Beng_Count);
    };
    IP.prototype.getFan = function () {
        return this.getElements(IP.Device_Suffix_Fan, Element_1.Element.Prefix_Fan, Element_1.Element.Index_Fan_Count);
    };
    IP.prototype.getElements = function (deviceSuffix, elementPrefix, valueIndex) {
        var list = [];
        this.getDeviceFields().each(function (key, value) {
            if (value.getName().indexOf(deviceSuffix) > -1) {
                var element = new Element_1.Element();
                element.setTitle(value.getTitle());
                element.setPrefix(elementPrefix);
                // let v = value.getValue() & 0x80
                // if (0x80 == v) {
                //     element.SetValues(valueIndex, 1, 1)
                // } else {
                //     element.SetValues(valueIndex, 1, 0)
                // }
                element.SetValues(valueIndex, 1, value.getValue());
                list.push(element);
            }
        });
        return list;
    };
    IP.Device_Suffix_Beng = '_beng';
    IP.Device_Suffix_Fan = '_fan';
    IP.KEY_POINT_RAN_SHAO_QI = 'de_ranshaoqi';
    IP.KEY_POINT_YIN_FENG_JI = 'de_yinfengji_fan';
    return IP;
}(SdcSoftDevice_1.SdcSoftDevice));
exports.IP = IP;
