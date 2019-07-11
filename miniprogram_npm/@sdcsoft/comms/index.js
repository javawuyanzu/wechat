module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = { exports: {} }; __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); if(typeof m.exports === "object") { Object.keys(m.exports).forEach(function(k) { __MODS__[modId].m.exports[k] = m.exports[k]; }); if(m.exports.__esModule) Object.defineProperty(__MODS__[modId].m.exports, "__esModule", { value: true }); } else { __MODS__[modId].m.exports = m.exports; } } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1561605157190, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var Collections_1 = require("./Collections");
exports.StringHashMap = Collections_1.StringHashMap;
exports.StringSet = Collections_1.StringSet;
var StaticKeys_1 = require("./StaticKeys");
exports.GroupKeys = StaticKeys_1.GroupKeys;

}, function(modId) {var map = {"./Collections":1561605157191,"./StaticKeys":1561605157192}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1561605157191, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var StringHashMap = /** @class */ (function () {
    function StringHashMap() {
        this.map = {};
    }
    StringHashMap.prototype.addItem = function (key, value) {
        this.map[key] = value;
    };
    StringHashMap.prototype.getItem = function (key) {
        return this.map[key];
    };
    Object.defineProperty(StringHashMap.prototype, "count", {
        get: function () {
            var i = 0;
            this.each(function () {
                i++;
            });
            return i;
        },
        enumerable: true,
        configurable: true
    });
    StringHashMap.prototype.each = function (func) {
        for (var key in this.map) {
            func(key, this.map[key]);
        }
    };
    StringHashMap.prototype.containsKey = function (key) {
        return this.map[key] ? true : false;
    };
    StringHashMap.prototype.remove = function (key) {
        delete this.map[key];
    };
    StringHashMap.prototype.clear = function () {
        this.map = {};
    };
    return StringHashMap;
}());
exports.StringHashMap = StringHashMap;
var StringSet = /** @class */ (function () {
    function StringSet() {
        this.map = new StringHashMap();
    }
    StringSet.prototype.add = function (item) {
        this.map.addItem(item, item);
    };
    StringSet.prototype.remove = function (item) {
        this.map.remove(item);
    };
    StringSet.prototype.has = function (item) {
        return this.map.containsKey(item);
    };
    StringSet.prototype.clear = function () {
        this.map = new StringHashMap();
    };
    return StringSet;
}());
exports.StringSet = StringSet;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1561605157192, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var GroupKeys = /** @class */ (function () {
    function GroupKeys() {
    }
    GroupKeys.KEY_BASE = 'baseInfo';
    GroupKeys.KEY_RUN = 'runInfo';
    GroupKeys.KEY_EXCEPTION = 'exceptionInfo';
    GroupKeys.KEY_MOCK = 'mockInfo';
    GroupKeys.KEY_SETTING = 'settingInfo';
    GroupKeys.KEY_START_STOP = 'startStopInfo';
    GroupKeys.KEY_DEVICE = 'deviceInfo';
    GroupKeys.KEY_OPEN_CLOSE = 'openclose';
    return GroupKeys;
}());
exports.GroupKeys = GroupKeys;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1561605157190);
})()
//# sourceMappingURL=index.js.map