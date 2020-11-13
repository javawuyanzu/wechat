const app = getApp();
var openid='';
import './vendor/weapp-cookie/index'


import { DeviceAdapter, ComValueMap,Endian} from '/libs/devicelib/index.js';
let adapter = new DeviceAdapter()
App({
  data: {},
  onShow: function () {
    this.globalData.startTime = new Date()
  },
  onHide: function () {
    this.globalData.endTime = new Date()
    var total =  (this.globalData.endTime - this.globalData.startTime) / 1000
    var day = parseInt(total / (24 * 60 * 60));
    var afterDay = total - day * 24 * 60 * 60;//取得算出天数后剩余的秒数
    var hour = parseInt(afterDay / (60 * 60));
    var afterHour = total - day * 24 * 60 * 60 - hour * 60 * 60;//取得算出小时数后剩余的秒数
    var min = parseInt(afterHour / 60);
    if (min>3){
      var beginDatetime = new Date(this.globalData.startTime)
      beginDatetime = beginDatetime.getFullYear() + '-' + (beginDatetime.getMonth() + 1) + '-' + beginDatetime.getDate() + ' ' + beginDatetime.getHours() + ':' + beginDatetime.getMinutes() + ':' + beginDatetime.getSeconds()
      var endDatetime = new Date(this.globalData.endTime)
      endDatetime = endDatetime.getFullYear() + '-' + (endDatetime.getMonth() + 1) + '-' + endDatetime.getDate() + ' ' + endDatetime.getHours() + ':' + endDatetime.getMinutes() + ':' + endDatetime.getSeconds()
      wx.request({
        //获取openid接口  
        url: 'https://apis.sdcsoft.com.cn/wechat/onlineRecord/create',
        data: {
          minutes: min,
          beginDatetime: beginDatetime,
          endDatetime: endDatetime,
          openId: this.globalData.openid
        },
        method: 'post',
        success: function (res) {
          console.log(res)
        }
      })
    }
  },

 
  onLaunch: function () {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        if (res.language === 'zh') {
          that.globalData.lang = 'zh-cn'
          var chinese = require("./utils/Chinses.js")
          
          that.globalData.content = chinese.Content
        }
        if (res.language === 'en') {
          that.globalData.lang = 'en-us'
          var english = require("./utils/English.js")
         
          that.globalData.content = english.Content
        }
      }
    })
    const storage = wx.getStorageInfoSync()
    if (storage.keys.length == 1) {
      wx.setStorageSync('deviceList', [])
      wx.setStorageSync('errorList', [])
      wx.setStorageSync('time', 30)
      wx.setStorageSync('warningType', 1)
      wx.setStorageSync('wxEnterpriseName', '')
      wx.setStorageSync('cachedVersion', 1.0)
      wx.setStorageSync('orders', [])
      wx.setStorageSync('userType', 0)
      wx.setStorageSync('version', "2.5.0")
      wx.setStorageSync('roleType',1)
    }
  },
  globalData: {
    endina:Endian.Info(),
    powerArray:ComValueMap.power,
    mediaArray:ComValueMap.media,
    adapter:adapter,
    lang: 'zh-cn',
    client: null,
    callBack: [null, null],
    userInfo: null,
    openid: null,
    unionId:null,
    startTime: null,
    endTime: null,
    bytedata:[],
    device:null,
    content: null,
    editpage:null,
    customer:{
      orgId: null,
      employeeId: null,
      userName: null,
      userId: null,
      openId: null,
      roleId: null,
      roleName: null,
      listResource: []
    }
  },
})