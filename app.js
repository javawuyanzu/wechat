const app = getApp();
var openid='';
var deviceAdapter = Wechat_DeviceAdapter.setLang('zh-cn');

import {
  Wechat_DeviceAdapter
} from '/libs/devices-lib/index.js'
import mqtt from '/libs/mqtt/mqtt.min.js'

App({
  data: {},
  onShow: function () {
    console.log("进入小程序...")
    this.globalData.startTime = new Date()
    console.log(this.globalData.startTime)
  },
  onHide: function () {
    console.log("离开小程序...")
    this.globalData.endTime = new Date()
    console.log(this.globalData.endTime)
  },
  conmqtt: function () {
    var that = this
    return new Promise(function (resolve, reject) {
      wx.login({
        success: function (res) {
          wx.request({
            //获取openid接口  
            url: 'https://app.weixin.sdcsoft.cn/device/getopenid',
            data: {
              js_code: res.code,
            },
            method: 'GET',
            success: function (res) {
              openid = res.data.openid.substr(0, 10) + '********' + res.data.openid.substr(res.data.openid.length - 8, res.data.openid.length)
              var options = {
                keepalive: 60,
                clientId: openid,
                protocolId: 'MQTT',
                protocolVersion: 4,
                clean: true,
                reconnectPeriod: 1000,
                connectTimeout: 30 * 1000,
                username: 'test1',
                password: 'test1',
                rejectUnauthorized: false
              }
              var client = mqtt.connect('wxs://mqtt.sdcsoft.com.cn:8084/mqtt', options);
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
  onLaunch: function () {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        if (res.language === 'zh') {
          that.globalData.lang = 'zh-cn'
          that.globalData.deviceAdapter = Wechat_DeviceAdapter.setLang('zh-cn')
        }
        if (res.language === 'en') {
          that.globalData.lang = 'en-us'
          that.globalData.deviceAdapter = Wechat_DeviceAdapter.setLang('zh-cn')
        }
      }
    })
    wx.login({
      success: function (res) {
        wx.request({
          //获取openid接口  
          url: 'https://app.weixin.sdcsoft.cn/device/getopenid',
          data: {
            js_code: res.code,
          },
          method: 'GET',
          success: function (res) {
            openid = res.data.openid.substr(0, 10) + '********' + res.data.openid.substr(res.data.openid.length - 8, res.data.openid.length)
            that.globalData.openid = openid
          }
        })
      }
    })
    wx.getStorageInfo({
      success(res) {
        if (res.keys.length == 0) {
          wx.setStorage({
            key: 'deviceList',
            data: []
          })
          wx.setStorage({
            key: 'errorList',
            data: []
          })
          wx.setStorage({
            key: 'time',
            data: 30
          })
          wx.setStorage({
            key: 'warningType',
            data: 1
          })
          wx.setStorage({
            key: 'wxEnterpriseName',
            data: ""
          })
        }
      }
    })
  },
 
  globalData: {
    deviceAdapter: deviceAdapter,
    lang: 'zh-cn',
    client: null,
    callBack: [null, null],
    userInfo: null,
    openid: null,
    startTime: null,
    endTime: null,
    bytedata:[],
    device:null,
  },
})