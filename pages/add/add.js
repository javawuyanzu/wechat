// scan.js
// 移动动画
let animation = wx.createAnimation({});
// 提示音
let innerAudioContext = wx.createInnerAudioContext()
innerAudioContext.src = '/images/beep.mp3'
const app = getApp();
Page({
  data: {
    content:null,
  },
  onLoad: function () {
    var that=this
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
  },
  onShow() {
    this.donghua()
  },
  toAdd: function (e) {
    wx.navigateTo({
      url: "../operation/operation"
    })
   
  },
  donghua() {
    var that = this;
    // 控制向上还是向下移动
    let m = true

    setInterval(function () {
      if (m) {
        animation.translateY(250).step({ duration: 3000 })
        m = !m;
      } else {
        animation.translateY(-10).step({ duration: 3000 })
        m = !m;
      }

      that.setData({
        animation: animation.export()
      })
    }.bind(this), 3000)
  },
  scancode(e) {
    var that = this
  
    // 提示音
    innerAudioContext.play()
    // 校验扫描结果，并处理
    let result = e.detail.result
    if (result.indexOf('?') > 0) {
      var deviceNo = result.substr(result.length - 10, result.length);
    } else {
      var deviceNo = result;
    }
    var deviceList = []
    var type = ''
    wx.getStorage({
      key: 'deviceList',
      success(res) {
        deviceList = res.data;
        wx.request({
          url: 'https://apis.sdcsoft.com.cn/webapi/output/decoder',
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
            var deviceType = res.data.data.deviceType;
            if (res.data.code == 2) {
              that.setData({
                empower: true
              })
              return
            }

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

            if (deviceNo.substr(0, 2) === '20') {
              wx.request({
                //获取openid接口   
                url: 'https://apis.sdcsoft.com.cn/wechat/showDeviceStore/create',
                data: {
                  openId: app.globalData.openid,
                  deviceNo: deviceNo,
                  deviceType: deviceType,
                  deviceName: null,
                  imgStyle: 0
                },
                method: 'POST',
                success: function (res) {
                  console.log(res)
                  deviceList.push({
                    deviceNo: deviceNo,
                    deviceName: "",
                    deviceType: deviceType,
                    imgStyle: 0,
                    mqttName: "/Msg/" + deviceNo.substr(0, 2) + "/" + deviceNo.substr(2, 3) + "/" + deviceNo.substr(5, 5)
                  });
                  that.subTopic("/Msg/" + deviceNo.substr(0, 2) + "/" + deviceNo.substr(2, 3) + "/" + deviceNo.substr(5, 5))
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
                  wx.request({
                    url: 'https://apis.sdcsoft.com.cn/wechat/user/find/openId',
                    method: 'POST',
                    data: {
                      openId: app.globalData.openid,
                    },
                    header: {
                      'content-type': 'application/x-www-form-urlencoded'
                    },
                    success: function (res) {
                      var creatDate = res.data.data.createDatetime
                      let dateA = new Date();
                      let dateB = new Date(creatDate);
                      if ((dateA.setHours(0, 0, 0, 0) == dateB.setHours(0, 0, 0, 0))) {
                        wx.request({
                          url: 'https://apis.sdcsoft.com.cn/wechat/Resource_Product/Resource/list',
                          method: "GET",
                          data: {},
                          header: {
                            'content-type': 'application/x-www-form-urlencoded'
                          },
                          success: function (res) {
                            var list = res.data.data
                            var resList = []
                            for (var i in list) {
                              if (list[i].id != 6 & list[i].id != 5) {
                                resList.push({
                                  openId: app.globalData.openid,
                                  resId: list[i].id,
                                  deviceNo: deviceNo,
                                  range: 1,
                                  rangeType: 2,
                                  amount: 1,
                                })
                              }
                            }
                            wx.request({
                              url: 'https://apis.sdcsoft.com.cn/wechat/RoleResource/find/deviceNo/openId',
                              method: "GET",
                              data: {
                                deviceNo: deviceNo,
                                openId: app.globalData.openid,
                              },
                              header: {
                                'content-type': 'application/x-www-form-urlencoded'
                              },
                              success: function (res) {
                                if (!res.data.data.length > 0) {
                                  wx.request({
                                    url: 'https://apis.sdcsoft.com.cn/wechat/RoleResource/create/many',
                                    method: "POST",
                                    data: {
                                      role_ResourceList: JSON.stringify(resList)
                                    },
                                    header: {
                                      'content-type': 'application/x-www-form-urlencoded'
                                    },
                                    success: function (res) {
                                      console.log(res)
                                    }
                                  })
                                }
                              }
                            })

                          }
                        })

                      }
                    },
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
                url: 'https://apis.sdcsoft.com.cn/wechat/showDeviceStore/create',
                data: {
                  openId: app.globalData.openid,
                  deviceNo: deviceNo,
                  deviceType: deviceType,
                  deviceName: null,
                  imgStyle: 0
                },
                method: 'POST',
                success: function (res) {
                  console.log(res)
                  deviceList.push({
                    deviceNo: deviceNo,
                    deviceName: '',
                    deviceType: deviceType,
                    imgStyle: 0
                  });
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
                  wx.request({
                    url: 'https://apis.sdcsoft.com.cn/wechat/user/find/openId',
                    method: 'POST',
                    data: {
                      openId: app.globalData.openid,
                    },
                    header: {
                      'content-type': 'application/x-www-form-urlencoded'
                    },
                    success: function (res) {
                      var creatDate = res.data.data.createDatetime
                      let dateA = new Date();
                      let dateB = new Date(creatDate);
                      if ((dateA.setHours(0, 0, 0, 0) == dateB.setHours(0, 0, 0, 0))) {
                        wx.request({
                          url: 'https://apis.sdcsoft.com.cn/wechat/Resource_Product/Resource/list',
                          method: "GET",
                          data: {},
                          header: {
                            'content-type': 'application/x-www-form-urlencoded'
                          },
                          success: function (res) {
                            var list = res.data.data
                            var resList = []
                            for (var i in list) {
                              if (list[i].id != 6 & list[i].id != 5) {
                                resList.push({
                                  openId: app.globalData.openid,
                                  resId: list[i].id,
                                  deviceNo: deviceNo,
                                  range: 1,
                                  rangeType: 2,
                                  amount: 1,
                                })
                              }
                            }

                            wx.request({
                              url: 'https://apis.sdcsoft.com.cn/wechat/RoleResource/find/deviceNo/openId',
                              method: "GET",
                              data: {
                                deviceNo: deviceNo,
                                openId: app.globalData.openid,
                              },
                              header: {
                                'content-type': 'application/x-www-form-urlencoded'
                              },
                              success: function (res) {
                                if (!res.data.data.length > 0) {
                                  wx.request({
                                    url: 'https://apis.sdcsoft.com.cn/wechat/RoleResource/create/many',
                                    method: "POST",
                                    data: {
                                      role_ResourceList: JSON.stringify(resList)
                                    },
                                    header: {
                                      'content-type': 'application/x-www-form-urlencoded'
                                    },
                                    success: function (res) {
                                      console.log(res)
                                    }
                                  })
                                }
                              }
                            })

                          }
                        })

                      }
                    },
                  })
                  wx.switchTab({
                    url: '../deviceList/deviceList'
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
            that.addDeviceRecord(deviceNo)
          }
        })
      }
    })
  }
})

