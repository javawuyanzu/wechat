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
var EN_US_1 = require("../EN_US");
var Map_PLC = /** @class */ (function (_super) {
    __extends(Map_PLC, _super);
    function Map_PLC() {
        return _super.call(this) || this;
    }
    Map_PLC.Commands_Key_Parameters_Setting = "参数设置";
    Map_PLC.Commands_Key_System_Ctl = "系统控制";
    Map_PLC.coms_status = {
        0: "Standby",
        1: "Working",
        2: "Alarm",
    };
    Map_PLC.coms_atuo = {
        0: "Automatic",
        1: "Manual",
    };
    Map_PLC.coms_ranshaoqi_status = {
        0: "Stop",
        1: "Working",
        2: "Big Fire"
    };
    return Map_PLC;
}(EN_US_1.Map_EN_US));
exports.Map_PLC = Map_PLC;
