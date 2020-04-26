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
var RT_1 = require("../RT");
var gfrm_1 = require("@sdcsoft/gfrm");
module.exports = /** @class */ (function (_super) {
    __extends(CTL_RT_E3_DRS, _super);
    function CTL_RT_E3_DRS() {
        var _this = _super.call(this) || this;
        _this.BYTE_ARRAY_LENGTH = 57;
        return _this;
    }
    CTL_RT_E3_DRS.prototype.addFocusFields = function (list) {
        _super.prototype.addFocusFields.call(this, list);
        var x = this.getCountFields();
        var field = this.getCountFields().getItem(RT_1.CTL_RT.KEY_POINT_JIA_RE_ZU);
        field.setValue(this.getJiaReZuCount());
        list.push(field);
        var map = this.getMockFields();
        list.push(map.getItem(gfrm_1.GroupFieldsRelationalMapping.KEY_MOCK_ChuKouWenDu));
        list.push(map.getItem(gfrm_1.GroupFieldsRelationalMapping.KEY_MOCK_HuiLiuWenDu));
    };
    CTL_RT_E3_DRS.prototype.getPowerInfo = function () {
        return 0;
    };
    CTL_RT_E3_DRS.prototype.getJiaReZuCount = function () {
        var count = 0;
        var map = this.getOpenCloseFields();
        map.each(function (k, v) {
            if (k.startsWith('oc_jiarezu')) {
                count += v.getValue();
            }
        });
        return count;
    };
    return CTL_RT_E3_DRS;
}(RT_1.CTL_RT));
