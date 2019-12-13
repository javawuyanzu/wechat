const app = getApp();
var openid='';
import {
  Wechat_DeviceAdapter
} from '/libs/devices-lib/index.js'
var deviceAdapter = Wechat_DeviceAdapter.setLang('zh-cn');


import mqtt from '/libs/mqtt/mqtt.js'
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
        url: 'https://apis.sdcsoft.com.cn/webapi/wechat/onlineRecord/create',
        data: {
          minutes: min,
          beginDatetime: beginDatetime,
          endDatetime: endDatetime,
          openId: openid
        },
        method: 'post',
        success: function (res) {
          console.log(res)
        }
      })
    }
  },
  conmqtt: function () {
    var that = this
    return new Promise(function (resolve, reject) {
      wx.login({
        success: function (res) {
          wx.request({
            //获取openid接口  
            url: 'https://apis.sdcsoft.com.cn/wechat/device/getopenid',
            data: {
              js_code: res.code,
            },
            method: 'GET',
            success: function (res) {
              openid = res.data.openid.substr(0, 10) + '_' + res.data.openid.substr(res.data.openid.length - 8, res.data.openid.length)
              var options = {
                keepalive: 30,
                clientId: openid,
                protocolId: 'MQTT',
                protocolVersion: 4,
                clean: true,
                reconnectPeriod: 1000,
                connectTimeout: 30 * 1000,
                rejectUnauthorized: false
              }
              var client = mqtt.connect('wxs://rancher.sdcsoft.com.cn:443/mqtt', options);
             
              that.globalData.client = client
              console.log(that.globalData.client)
              client.on('error', function (err) {
                console.log(err)
                client.end()
              });
              client.on('connect', function () {
                console.log('client connected:' + options.clientId)
                resolve("200")
              })
              client.on('packetsend', function (packet) {
                //console.log(packet)
              })
              client.on('close', function (e) {
                console.log(e)
                console.log(options.clientId + ' disconnected');
                client.reconnect();
              })
              client.on('message', function (topic, message, packet) {
                for (var i in that.globalData.callBack) {
                  if (that.globalData.callBack[i]) {
                    that.globalData.callBack[i](topic, message);
                  }
                }
              })
            }
          })
        }
      })
 
    })
  },
  chooseMenu: function (num) {
    var that=this;
    var list = that.globalData.menuList
    if (num==2){
      list.push(that.globalData.content.detail_exceptionMenu)
    }
    if (num == 3) {
      list.push(that.globalData.content.detail_reportMenu)
    }
    if (num == 4) {
      list.push(that.globalData.content.detail_controlMenu)
    }
    if (num == 5) {
      list.push(that.globalData.content.detail_smsMenu)
    }
    that.globalData.menuList=list
  },
  onLaunch: function () {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        if (res.language === 'zh') {
          that.globalData.lang = 'zh-cn'
          that.globalData.deviceAdapter = Wechat_DeviceAdapter.setLang("zh-cn");
          var chinese = require("./utils/Chinses.js")
          that.globalData.menuList = chinese.Content.detail_navbar
          that.globalData.content = chinese.Content
        }
        if (res.language === 'en') {
          that.globalData.lang = 'en-us'
          that.globalData.deviceAdapter = Wechat_DeviceAdapter.setLang('en-us')
          var english = require("./utils/English.js")
          that.globalData.menuList = english.Content.detail_navbar
          that.globalData.content = english.Content
        }
      }
    })
    wx.login({
      success: function (res) {
        wx.request({
          //获取openid接口  
          url: 'https://apis.sdcsoft.com.cn/wechat/device/getopenid',
          data: {
            js_code: res.code,
          },
          method: 'GET',
          success: function (res) {
            openid = res.data.openid.substr(0, 10) + '_' + res.data.openid.substr(res.data.openid.length - 8, res.data.openid.length)
            that.globalData.openid = openid
            wx.request({
              //获取openid接口  
              url: 'https://apis.sdcsoft.com.cn/webapi/wechat/RoleResource/list',
              data: {
                openId: openid,
              },
              method: 'GET',
              success: function (res) {
                if(res.data.code==0&res.data.data.length>0){
                  var currentTime = new Date();
                  currentTime = currentTime.getFullYear() + '-' + (currentTime.getMonth() + 1) + '-' + currentTime.getDate() + '-' + currentTime.getHours() + ':' + currentTime.getMinutes() + ':' + currentTime.getSeconds(); 
                  var list=res.data.data
                  console.log(res)
                  for(var i =0;i<list.length;i++){
                    if (currentTime < list[i].dueTime){
                      that.chooseMenu(list[i].resId)
                    }
                  }

                }
              }
            })
          }
        })
      }
    })
    const storage = wx.getStorageInfoSync()
    if (storage.keys.length == 0) {
      wx.setStorageSync('deviceList', [])
      wx.setStorageSync('errorList', [])
      wx.setStorageSync('time', 30)
      wx.setStorageSync('warningType', 1)
      wx.setStorageSync('wxEnterpriseName', '')
      wx.setStorageSync('cachedVersion', 1.0)
    }
    
   

  },
  globalData: {
    deviceAdapter: deviceAdapter,
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
    menuList:[],
    content: null,
  },
})