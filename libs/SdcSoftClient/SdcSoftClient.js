"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SdcSoftClient = void 0;
var SdcSoftClient = /** @class */ (function () {
    function SdcSoftClient(mqtt, url, port, username, password, openId) {
        this.client = null;
        //private status = SdcSoftClient.Connection_Status_Closed
        this.msgListenerMap = {};
        this.errCallBack = function (err) {
            console.log(err);
        };
        this.connectCallBack = function (packet) {
            console.log('connect...');
        };
        this.offlineCallBack = function (connection) {
            console.log('offline...');
            //this.client?.reconnect()
        };
        this.closeCallBack = function (connection) {
            console.log('close...');
        };
        this.msgCallBack = function (topic, payload, packet) {
            console.log('message...');
        };
        this.options = {
            keepalive: 60 * 3,
            clientId: '',
            protocolId: 'MQTT',
            protocolVersion: 4,
            clean: true,
            reconnectPeriod: 1000,
            connectTimeout: 30 * 1000,
            username: '',
            password: '',
            rejectUnauthorized: false
        };
        this.mqtt = null;
        this.path = '';
        this.mqtt = mqtt;
        this.path = url + (port ? (port.length > 0 ? (':' + port) : '') : '');
        this.options.username = username;
        this.options.password = password;
        this.options.clientId = openId;
    }
    Object.defineProperty(SdcSoftClient.prototype, "OnError", {
        set: function (fn) {
            this.errCallBack = fn;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SdcSoftClient.prototype, "OnConnect", {
        set: function (fn) {
            this.connectCallBack = fn;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SdcSoftClient.prototype, "OnOffine", {
        set: function (fn) {
            this.offlineCallBack = fn;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SdcSoftClient.prototype, "OnClose", {
        set: function (fn) {
            this.closeCallBack = fn;
        },
        enumerable: false,
        configurable: true
    });
    SdcSoftClient.prototype.Connect = function () {
        var _this = this;
        this.client = this.mqtt.connect(this.path + '/mqtt', this.options);
        this.client.on("connect", function (packet) {
            if (_this.connectCallBack) {
                _this.connectCallBack(packet);
            }
            else {
                console.log('connect...');
            }
            //this.status = SdcSoftClient.Connection_Status_Opened
        });
        this.client.on('error', function (error) {
            if (_this.errCallBack) {
                _this.errCallBack(error);
            }
            else {
                console.log(error);
            }
        });
        this.client.on('disconnect', function () {
            console.log('disconnect...');
        });
        this.client.on('close', function () {
            if (_this.closeCallBack) {
                _this.closeCallBack(_this.client);
            }
            else {
                console.log('close...');
            }
        });
        this.client.on('offline', function () {
            if (_this.offlineCallBack) {
                _this.offlineCallBack(_this.client);
            }
            else {
                console.log('offline...');
            }
        });
        this.client.on("message", (function (topic, payload, packet) {
            //将topic的长度-01/001/00001的长度，即要截取的设备编号的起始下标索引
            var index = topic.length - 12;
            //截取01/001/00001设备编号
            var deviceNo = topic.substr(index);
            //判断'/'是否位于2号索引位置，如果true说明是订阅的设备信息，否则非订阅设备信息
            if (2 == deviceNo.indexOf('/')) {
                //将设备tipic中的'/'替换掉
                deviceNo = deviceNo.replace(new RegExp('/', "gm"), '');
                var fn = _this.msgListenerMap[deviceNo];
                if (fn) {
                    fn(deviceNo, payload, packet);
                }
                else {
                    _this.msgCallBack(deviceNo, payload, packet);
                }
            }
            else {
                console.log('received message from ' + topic);
            }
        }));
    };
    SdcSoftClient.prototype.Close = function () {
        if (this.client) {
            this.client.end();
        }
    };
    SdcSoftClient.prototype.initMessageListener = function (suffix, prefix) {
        var _this = this;
        if (prefix === void 0) { prefix = '/sdcsoft.com.cn/msg/'; }
        return new Promise(function (resolve, reject) {
            var _a;
            (_a = _this.client) === null || _a === void 0 ? void 0 : _a.subscribe(prefix + suffix, { qos: 0 }, function (err, granted) {
                if (!err) {
                    resolve(true);
                }
                else {
                    reject(err);
                }
            });
        });
    };
    SdcSoftClient.prototype.deInitMessageListener = function (suffix, prefix) {
        var _this = this;
        if (prefix === void 0) { prefix = '/sdcsoft.com.cn/msg/'; }
        return new Promise(function (resolve, reject) {
            var _a;
            (_a = _this.client) === null || _a === void 0 ? void 0 : _a.unsubscribe(prefix + suffix, function (err) {
                if (!err) {
                    resolve(true);
                }
                else {
                    reject(err);
                }
            });
        });
    };
    SdcSoftClient.prototype.addMessageListener = function (deviceNo, fn, prefix) {
        if (prefix === void 0) { prefix = '/sdcsoft.com.cn/msg/'; }
        return __awaiter(this, void 0, void 0, function () {
            var suffix, result, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.client) return [3 /*break*/, 4];
                        suffix = '';
                        if (!(null != deviceNo)) return [3 /*break*/, 2];
                        this.msgListenerMap[deviceNo] = fn;
                        suffix = deviceNo.substr(0, 2) + '/' + deviceNo.substr(2, 3) + '/' + deviceNo.substr(5);
                        return [4 /*yield*/, this.initMessageListener(suffix, prefix)];
                    case 1:
                        result = _a.sent();
                        if (!result) {
                            this.msgListenerMap[deviceNo] = null;
                        }
                        return [2 /*return*/, result];
                    case 2:
                        suffix = '#';
                        return [4 /*yield*/, this.initMessageListener(suffix, prefix)];
                    case 3:
                        result = _a.sent();
                        this.msgCallBack = fn;
                        return [2 /*return*/, result];
                    case 4: throw 'SdcSoftClient not connect to the remote server.';
                }
            });
        });
    };
    SdcSoftClient.prototype.removeMessageListener = function (deviceNo, prefix) {
        if (prefix === void 0) { prefix = '/sdcsoft.com.cn/msg/'; }
        return __awaiter(this, void 0, void 0, function () {
            var suffix, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.client) return [3 /*break*/, 2];
                        suffix = '#';
                        if (null != deviceNo) {
                            suffix = deviceNo.substr(0, 2) + '/' + deviceNo.substr(2, 3) + '/' + deviceNo.substr(5);
                        }
                        return [4 /*yield*/, this.deInitMessageListener(suffix, prefix)];
                    case 1:
                        result = _a.sent();
                        if (result && null != deviceNo) {
                            this.msgListenerMap[deviceNo] = null;
                            delete this.msgListenerMap[deviceNo];
                        }
                        return [2 /*return*/, result];
                    case 2: throw 'SdcSoftClient not connect to the remote server.';
                }
            });
        });
    };
    SdcSoftClient.Connection_Status_Closed = 0;
    SdcSoftClient.Connection_Status_Opened = 1;
    return SdcSoftClient;
}());
exports.SdcSoftClient = SdcSoftClient;
