
const app = getApp()
Page({
  data: {
    openid: '',
    wxEnterpriseName:'',
    content:null,
    sole: false,
  },
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 0
        })
      }
    }
  },
  error: function () {
    wx.navigateTo({
      url: '../reports/reports'
    })
  },
  //事件处理函数
  tologin: function () {
    wx.redirectTo({
      url: '../login/login'
    })
  },
  tolist: function () {
    wx.redirectTo({
      url: '/pages/deviceList/deviceList'
    })
  },
  onLoad: function () {
    var that = this;
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
            var openid = res.data.openid;//获取到的openid  
            that.setData({
              openid: res.data.openid.substr(0, 10) + '********' + res.data.openid.substr(res.data.openid.length - 8, res.data.openid.length)
            })
            wx.request({
              //获取openid接口   
              url: 'https://apis.sdcsoft.com.cn/wechat/employee/getSoldPermissions',
              data: {
                openid: that.data.openid,
              },
              method: 'GET',
              success: function (res) {
                console.log(res)
                if (res.data == 0) {
                  that.setData({
                    sole: true
                  })
                } 
              }
            })
          }
        })
      }
    })
    wx.getStorage({
      key: 'wxEnterpriseName',
      success(res) {
        that.setData({
          wxEnterpriseName: res.data
        })
      }
    })
   
  },
  onShow: function () {
    var that =this
    if (app.globalData.lang === 'zh-cn') {
      var chinese = require("../../utils/Chinses.js")
      that.setData({
        content: chinese.Content
      })
    }
    if (app.globalData.lang === 'en-us') {
      var english = require("../../utils/English.js")
      that.setData({
        content: english.Content
      })
    }
  }
})
