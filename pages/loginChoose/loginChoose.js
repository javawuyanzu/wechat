const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    text: '', //按钮文字
    currentTime: 61, //倒计时
    disabled: false, //按钮是否禁用
    phone: '', //获取到的手机栏中的值
    realName: '',
    verificationCode: '',
    code: '',
    newChanges: '',
    newChangesAgain: '',
    state: '',
    handleEName: '',
    content: null,
    lang: false,
    inputValue: '',
    quhao: '',
    openid: '',
    bindSource: []//绑定到页面的数据，根据用户输入动态变化
  },
 
  onShow: function () {
    var that = this
    if (app.globalData.lang === 'zh-cn') {
      var chinese = require("../../utils/Chinses.js")
      that.setData({
        content: chinese.Content,
        text: chinese.Content.register_getcode
      })
    }
    if (app.globalData.lang === 'en-us') {
      var english = require("../../utils/English.js")
      that.setData({
        content: english.Content,
        text: english.Content.register_getcode,
        lang: true
      })
    }
    wx.setNavigationBarTitle({
      title: that.data.content.login_title
    })
  },
  onLoad: function (options) {
    var that = this
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
          }
        })
      }
    })
  },
 

  register: function (e) {
    var that=this
    wx.navigateTo({
      url: "/pages/register/register?openid=" + that.data.openid,
    })
  },
  submit: function () {
    wx.navigateTo({
      url: '/pages/login/login'
    })
  },
})