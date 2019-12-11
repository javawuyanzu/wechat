
const app = getApp()
Page({
  data: {
    openid: '',
    wxEnterpriseName:'',
    content:null,
    sole: false,
    canIUse: true,
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
    wx.request({
      //获取openid接口   
      url: 'https://apis.sdcsoft.com.cn/wechat/employee/getSoldPermissions',
      data: {
        openid: app.globalData.openid,
      },
      method: 'GET',
      success: function (res) {
        if (res.data == 0) {
          that.setData({
            sole: true
          })
        }
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
    wx.request({
      //获取openid接口   
      url: 'https://apis.sdcsoft.com.cn/wechat/user/find/openId',
      data: {
        openId: app.globalData.openid,
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        if (res.data.code == 0) {
          var list = res.data.data
          if (list.length > 0) {
            for (var i in list) {
              if (list[i].unionId != null) {
                that.setData({
                  canIUse: false
                })
              }
            }
          }
        }
      }
    })
  }
})
