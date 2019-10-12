const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    openid:'',
    content: null,
    inputValue:'',
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
      title: that.data.content.operation_title
    })
  },
  bindGetUserInfo: function (event) {
    wx.getSetting({
      success: res => {
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

                        var openid = data.data.data.openid.substr(0, 10) + '_' + data.data.data.openid.substr(data.data.data.openid.length - 8, data.data.data.openid.length)
                        var unionId = data.data.data.unionId
                        app.globalData.unionId = unionId
                        wx.request({
                          url: 'https://apis.sdcsoft.com.cn/wechat/check/unionId',//自己的服务接口地址
                          method: 'post',
                          header: {
                            'content-type': 'application/x-www-form-urlencoded'
                          },
                          data: { openid: openid, unionId: unionId },
                          success: function (data) {
                            console.log(data)
                            if (data.data.code == 1) {
                              that.tologin()
                            }

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
  scanCode: function (e) {
    var that = this
    var deviceNo;
    wx.scanCode({
      success: (res) => {
        if (res.result.indexOf('?') > 0){
           deviceNo = res.result.substr(43, 55);
        }else{
          deviceNo = res.result;
        }
        var deviceList = []
        var type = ''
          wx.getStorage({
            key: 'deviceList',
            success(res) {
              deviceList = res.data;
              wx.request({
                url: 'https://apis.sdcsoft.com.cn/wechat/device/getdecode',
                data: {
                  deviceNo: deviceNo,
                },
                header: {
                  "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
                },
                method: 'GET',
                success: function (res) {
                  console.log(res)
                  if (res.data.code != 0) {
                    wx.showToast({
                      title: res.data.msg,
                      icon: 'none',
                      duration: 2000
                    });
                    return;
                  }
                  deviceNo = res.data.data.deviceSuffix
                  for (var i = 0; i < deviceList.length; i++) {
                    if (deviceList[i].deviceNo == deviceNo) {
                      wx.showToast({
                        title: that.data.content.operation_deviceexist,
                        icon: 'none',
                        duration: 2000
                      });
                      return;
                    }
                  }
                  var deviceType = res.data.data.deviceType;
                  wx.request({
                    //获取openid接口   
                    url: 'https://apis.sdcsoft.com.cn/wechat/check/openId',
                    data: {
                      openId: app.globalData.openid
                    },
                    header: {
                      'content-type': 'application/x-www-form-urlencoded'
                    },
                    method: 'POST',
                    success: function (res) {
                      console.log(res)
                      if (res.data.code == 2) {
                        that.tologin()
                      } else {
                        if (deviceNo.substr(0, 2) === '20') {
                          wx.request({
                            //获取openid接口   
                            url: 'https://apis.sdcsoft.com.cn/webapi/wechat/store/create',
                            data: {
                              openId: that.data.openid,
                              deviceNo: deviceNo,
                              deviceType: deviceType,
                              mqttName: "0",
                              deviceName: null,
                              imgStyle: 0
                            },
                            method: 'POST',
                            success: function (res) {
                              deviceList.push({ deviceNo: deviceNo, deviceName: '', deviceType: deviceType, imgStyle: 0, mqttName: "/RPT/" + deviceNo.substr(0, 2) + "/" + deviceNo.substr(2, 3) + "/" + deviceNo.substr(5, 5) });
                              that.subTopic("/RPT/" + deviceNo.substr(0, 2) + "/" + deviceNo.substr(2, 3) + "/" + deviceNo.substr(5, 5))
                              wx.switchTab({
                                url: '../deviceList/deviceList'
                              })
                              that.setData({
                                inputValue: ""
                              })
                            },
                            fail: function (res) {
                              wx.showToast({
                                title: that.data.content.operation_connfail,
                                icon: 'none',
                                duration: 2000
                              });
                            }
                          })
                        } else {

                          wx.request({
                            //获取openid接口   
                            url: 'https://apis.sdcsoft.com.cn/webapi/wechat/store/create',
                            data: {
                              openId: that.data.openid,
                              deviceNo: deviceNo,
                              deviceType: deviceType,
                              mqttName: "0",
                              deviceName: null,
                              imgStyle: 0
                            },
                            method: 'POST',
                            success: function (res) {
                              deviceList.push({ deviceNo: deviceNo, deviceName: '', deviceType: deviceType, imgStyle: 0 });
                              wx.setStorage({
                                key: 'deviceList',
                                data: deviceList,
                                success: function (res) {
                                  wx.showToast({
                                    title: that.data.content.operation_addsuccess,
                                    icon: 'success',
                                    duration: 2000
                                  });
                                }
                              })
                              wx.switchTab({
                                url: '../deviceList/deviceList'
                              })
                              that.setData({
                                inputValue: ""
                              })
                            },
                            fail: function (res) {
                              wx.showToast({
                                title: that.data.content.operation_connfail,
                                icon: 'none',
                                duration: 2000
                              });
                            }
                          })
                        }
                      }
                    }
                  })
                  
                }
              })
            }
          })
      }
    })
  },
  subTopic: function (topic) {
    var client = app.globalData.client;
    if (client==null) {
      getApp().conmqtt().then(function () {
        client = app.globalData.client;
        console.log("---------------------")
        client.subscribe(topic, null, function (err, granted) {
          if (!err) {
            console.log('订阅成功' + topic)
          } else {
            console.log('订阅失败')
          }
        })
      })
    }else{
      if (client.connected != null & client.connected) {
        client.subscribe(topic, null, function (err, granted) {
          if (!err) {
            console.log('订阅成功' + topic)
          } else {
            console.log('订阅失败')
          }
        })
      } else {
        wx.showToast({
          title: '连接失败，请稍后再试',
          icon: 'none',
          duration: 1000,
          mask: true
        })
      }
    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  tologin: function () {
    wx.redirectTo({
      url: '../loginChoose/loginChoose'
    })
  },
 
/**
 *  表单功能
 */
  formSubmit:function(e){
    var that=this;
    var formData=e.detail.value; //获取表数据
    if (formData.deviceNo == null || formData.deviceNo==''){
      wx.showToast({
        title: that.data.content.operation_pleasedeviceno,
        icon: 'none',
        duration: 2000
      });
    }else{
      var deviceList = []
      var type=''
      var deviceNo = formData.deviceNo
        wx.getStorage({
          key: 'deviceList',
          success(res) {
            deviceList = res.data;
            var deviceNo = formData.deviceNo
            wx.request({
              url: 'https://apis.sdcsoft.com.cn/wechat/device/getdecode',
              data: {
                deviceNo: deviceNo,
              },
              header: {
                "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
              },
              method: 'GET',
              success: function (res) {
                console.log(res)
                if (res.data.code != 0) {
                  wx.showToast({
                    title: res.data.msg,
                    icon: 'none',
                    duration: 2000
                  });
                  return;
                }
                deviceNo = res.data.data.deviceSuffix
                for (var i = 0; i < deviceList.length; i++) {
                  if (deviceList[i].deviceNo == deviceNo) {
                    wx.showToast({
                      title: that.data.content.operation_deviceexist,
                      icon: 'none',
                      duration: 2000
                    });
                    return;
                  }
                }
                var deviceType = res.data.data.deviceType;
                  wx.request({
                    //获取openid接口   
                    url: 'https://apis.sdcsoft.com.cn/wechat/check/openId',
                    data: {
                      openId: app.globalData.openid
                    },
                    header: {
                      'content-type': 'application/x-www-form-urlencoded'
                    },
                    method: 'POST',
                    success: function (res) {
                      if (res.data.code == 2) {
                        that.tologin()
                      }else{
                        if (deviceNo.substr(0, 2) === '20') {
                          wx.request({
                            //获取openid接口   
                            url: 'https://apis.sdcsoft.com.cn/webapi/wechat/store/create',
                            data: {
                              openId: that.data.openid,
                              deviceNo: deviceNo,
                              deviceType: deviceType,
                              deviceName: null,
                              imgStyle: 0
                            },
                            method: 'POST',
                            success: function (res) {
                              console.log(res)
                              deviceList.push({ deviceNo: deviceNo, deviceName: "", deviceType: deviceType, imgStyle: 0, mqttName: "/RPT/" + deviceNo.substr(0, 2) + "/" + deviceNo.substr(2, 3) + "/" + deviceNo.substr(5, 5) });
                              that.subTopic("/RPT/" + deviceNo.substr(0, 2) + "/" + deviceNo.substr(2, 3) + "/" + deviceNo.substr(5, 5))
                              wx.setStorage({
                                key: 'deviceList',
                                data: deviceList,
                                success: function (res) {
                                  wx.showToast({
                                    title: that.data.content.operation_addsuccess,
                                    icon: 'success',
                                    duration: 2000
                                  });
                                }
                              })
                              wx.switchTab({
                                url: '../deviceList/deviceList'
                              })
                              that.setData({
                                inputValue: ""
                              })
                            },
                            fail: function (res) {
                              wx.showToast({
                                title: that.data.content.operation_connfail,
                                icon: 'none',
                                duration: 2000
                              });
                            }
                          })
                        } else {
                          wx.request({
                            //获取openid接口   
                            url: 'https://apis.sdcsoft.com.cn/webapi/wechat/store/create',
                            data: {
                              openId: that.data.openid,
                              deviceNo: deviceNo,
                              deviceType: deviceType,
                              deviceName: null,
                              imgStyle: 0
                            },
                            method: 'POST',
                            success: function (res) {
                              deviceList.push({ deviceNo: deviceNo, deviceName: "", deviceType: deviceType, imgStyle: 0 });
                              wx.setStorage({
                                key: 'deviceList',
                                data: deviceList,
                                success: function (res) {
                                  wx.showToast({
                                    title: that.data.content.operation_addsuccess,
                                    icon: 'success',
                                    duration: 2000
                                  });
                                }
                              })
                              wx.switchTab({
                                url: '../deviceList/deviceList'
                              })
                              that.setData({
                                inputValue: ""
                              })
                            },
                            fail: function (res) {
                              wx.showToast({
                                title: that.data.content.operation_connfail,
                                icon: 'none',
                                duration: 2000
                              });
                            }
                          })
                        }
                      }
                    }
                  })
              }
            })
          }
        })
    }
   
  }
})