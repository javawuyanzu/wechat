
const app = getApp()
Page({
  data: {
    openid: '',
    wxEnterpriseName:'',
    content:null,
    sole: false,
    canIUse: false,
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
              openid: res.data.openid.substr(0, 10) + '_' + res.data.openid.substr(res.data.openid.length - 8, res.data.openid.length)
            })
            wx.request({
              //获取openid接口   
              url: 'https://apis.sdcsoft.com.cn/wechat/check/openId',
              data: {
                openId: res.data.openid.substr(0, 10) + '_' + res.data.openid.substr(res.data.openid.length - 8, res.data.openid.length)
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              method: 'POST',
              success: function (res) {
                console.log(res)
                if (res.data.code == 1 & res.data.code!="5") {
                  that.setData({
                    canIUse:true
                  })
                }
              }
            })
            wx.request({
              //获取openid接口   
              url: 'https://apis.sdcsoft.com.cn/wechat/employee/getSoldPermissions',
              data: {
                openid: that.data.openid,
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
  bindGetUserInfo: function (e) {
    var that = this
    wx.getSetting({
      success: res => {
        console.log(res.authSetting['scope.userInfo'])
        if (res.authSetting['scope.userInfo']) {
          wx.login({
            success: function (res) {
              var code = res.code;//登录凭证
              if (code) {
                //2、调用获取用户信息接口
                wx.getUserInfo({
                  success: function (res) {
                    //3.请求自己的服务器，解密用户信息 获取unionId等加密信息
                    wx.request({
                      url: 'https://apis.sdcsoft.com.cn/wechat/device/getUnionId',
                      method: 'get',
                      header: {
                        'content-type': 'application/x-www-form-urlencoded'
                      },
                      data: { encryptedData: res.encryptedData, iv: res.iv, code: code },
                      success: function (data) {
                        var unionId = data.data.data.unionId
                        app.globalData.unionId = unionId
                        wx.request({
                          url: 'https://apis.sdcsoft.com.cn/wechat/modify/unionId',
                          method: 'post',
                          header: {
                            'content-type': 'application/x-www-form-urlencoded'
                          },
                          data: { openId: app.globalData.openid, unionId:unionId},
                          success: function (data) {
                            that.setData({
                              canIUse:false
                            })
                          },
                        })
                      },
                      fail: function () {
                        console.log('系统错误')
                      }
                    })
                  },
                  fail: function () {
                    console.log('获取用户信息失败')
                  }
                })

              } else {
                console.log('获取用户登录态失败！' + r.errMsg)
              }
            },
            fail: function () {
              console.log('登陆失败')
            }
          })

        } else {
          console.log('获取用户信息失败')
        }

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
