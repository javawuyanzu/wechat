var CODE = ''
const app = getApp();
Page({
  data: {
    userName: '',
    password: '',
    openid: '',
    content: null,
  },
  onShow: function () {
    var that = this
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
    wx.setNavigationBarTitle({
      title: that.data.content.login_title
    })
  },
  onLoad: function (options) {
    var that=this
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
      url: "/pages/register/register?openid="+that.data.openid,
    })
  }, 
  forgotPw: function(e) {
    wx.navigateTo({
      url: "/pages/forgotPw/forgotPw",
    })
  }, 
  // 获取输入账号 
  userNameInput: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },
  tolist: function () {
    wx.redirectTo({
      url: '/pages/operation/operation'
    })
  },
  // 获取输入密码 
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },

  // 登录 
  login: function () {
    var that = this;
    if (this.data.userName.length == 0 || this.data.password.length == 0) {
      wx.showToast({
        title: that.data.content.login_nouser,
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.login({
        success: function (res) {
          CODE = res.code;//code  
        }
      })
      wx.request({
        url: 'https://app.weixin.sdcsoft.cn/wxlogin',
        data: {
          userName: this.data.userName,
          password: this.data.password,
          openid: this.data.openid
        },
        success: function (res) {
          if (res.data.code == 0) {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2000
            })
          } else if (res.data.code == 1) {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2000
            })
          } else if (res.data.code == 2) {
            wx.showToast({
              title: res.data.msg,
              icon: 'success',
              duration: 2000
            })
            that.tolist();
          }
          wx.request({
            //获取openid接口  
            url: 'https://app.weixin.sdcsoft.cn/employee/findEmployee',
            data: {
              mobile: that.data.userName,
            },
            method: 'GET',
            success: function (res) {
              wx.setStorage({
                key: 'wxEnterpriseName',
                data: res.data.wxEnterpriseName
              })
            }
          })
          // wx.request({
          //   url: 'https://app.weixin.sdcsoft.cn/employee/addCreateTime',
          //   method: "GET",
          //   data: {
          //     mobile: that.data.userName,
          //   },
          //   header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
          //   success: function (res) {
          //   }
          // })
        }
      })
     
    }
  }
})