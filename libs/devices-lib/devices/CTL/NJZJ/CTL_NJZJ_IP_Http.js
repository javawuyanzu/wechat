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
var CTL_NJZJ_1 = require("./CTL_NJZJ");
var IP_Http = /** @class */ (function (_super) {
    __extends(IP_Http, _super);
    function IP_Http() {
        var _this = _super.call(this) || this;
        _this.BYTE_ARRAY_LENGTH = 1024;
        return _this;
    }
    IP_Http.prototype.handleDeviceNo = function () {
    };
    return IP_Http;
}(CTL_NJZJ_1.IP));
exports.IP_Http = IP_Http;
