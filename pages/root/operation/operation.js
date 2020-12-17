const app = getApp();
import req from '../../../utils/Request.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    openid: '',
    content: null,
    inputValue: '',
    privatisation: false,
    deviceNo: null,
  },
  certification: function () {
    var that = this;
    wx.navigateTo({
      url: "../privatisation/certification?deviceNo=" + this.data.deviceNo,
    })
    that.setData({
      privatisation: false
    })
  },
  cancelPrivatisation: function () {
    var that = this;
    that.setData({
      privatisation: false
    })
  },
  refusedEmpower: function () {
    var that = this;
    that.setData({
      empower: false
    })
  },
  bindGetUserInfo: function (e) {
    var that = this
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.login({
            success: function (res) {
              var code = res.code;
              if (code) {
                wx.getUserInfo({
                  success: function (res) {
                    wx.request({
                      url: 'https://apis.sdcsoft.com.cn/wechat/user/saveEmployee',
                      method: "GET",
                      data: {
                        realName: res.userInfo.nickName,
                        openid: app.globalData.openid,
                      },
                      header: {
                        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                      },
                      success: function (res) {
                        console.log(res)
                        that.setData({
                          empower: false
                        })
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
  addDeviceRecord: function (deviceNo) {
    var that = this
    wx.request({
      //获取openid接口  
      url: 'https://apis.sdcsoft.com.cn/wechat/userAddDeviceHistory/create',
      data: {
        deviceNo: deviceNo,
        openId: app.globalData.openid,
        bindTime: new Date()
      },
      method: 'post',
      success: function (res) {
        console.log(res)
      }
    })
  },
  onShow: function () {
    var that = this
    if (app.globalData.lang === 'zh-cn') {
      var chinese = require("../../../utils/Chinses.js")
      that.setData({
        content: chinese.Content
      })
    }
    if (app.globalData.lang === 'en-us') {
      var english = require("../../../utils/English.js")
      that.setData({
        content: english.Content
      })
    }
    wx.setNavigationBarTitle({
      title: that.data.content.operation_title
    })
  },
  addDevice: function (deviceList, deviceNo, deviceType, newFrame, dataMapId) {
    var that = this
    wx.request({
      //获取openid接口   
      url: 'https://apis.sdcsoft.com.cn/wechat/privatisation/find/deviceNo',
      data: {
        deviceNo: deviceNo,
      },
      method: 'GET',
      success: function (res) {
        var list = res.data.data
        var b = false
        if(list.length==0){
          b = true
        }
        for(var i in list){
          if(list[i].openId==app.globalData.openid){
            b=true
          }
        }
        if(!b){
         that.setData({
          deviceNo:deviceNo,
          privatisation:true
         })
          return
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
              wx.request({
                url: 'https://apis.sdcsoft.com.cn/wechat/DeviceDataMap/get',
                data: {
                  id: dataMapId,
                },
                method: 'GET',
                header: {
                  "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
                },
                success: function (res) {
                  let map;
                  let addr;
                  if (newFrame) {
                    map = JSON.parse(res.data.data.deviceDataMap)
                    addr = JSON.parse(res.data.data.pointIndexMap)
                  }
                  deviceList.push({
                    map: map,
                    addr: addr,
                    dataMapId: dataMapId,
                    newFrame: newFrame,
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
                  req.get('https://apis.sdcsoft.com.cn/wechat/userAddDeviceHistory/find/deviceNo/openId', {
                    openId: app.globalData.openid, deviceNo: deviceNo,
                  }, {
                    'content-type': 'application/x-www-form-urlencoded'
                  }).then(res => {
                    var date;
                    if (res.data.data.length != 0) {
                      date = new Date(res.data.data[0].bindTime);
                      date.setFullYear(date.getFullYear() + 1);
                      date.setDate(date.getDate() - 1);
                    } else {
                      date = new Date().setFullYear((new Date().getFullYear() + 1))
                      that.addDeviceRecord(deviceNo)
                    }
                    return date
                  }).then(date => {
                    if (date > new Date()) {
                      req.get('https://apis.sdcsoft.com.cn/wechat/Resource_Product/Resource/list', {}, {
                        'content-type': 'application/x-www-form-urlencoded'
                      }).then(res => {
                        var list = res.data.data
                        var resList = []
                        for (var i in list) {
                          if (list[i].id != 6) {
                            resList.push({
                              openId: app.globalData.openid,
                              resId: list[i].id,
                              deviceNo: deviceNo,
                              dueTime: date,
                            })
                          }
                        }
                        req.post('https://apis.sdcsoft.com.cn/wechat/RoleResource/newUser/create/many', {role_ResourceList:JSON.stringify(resList)}, {
                        'content-type': 'application/x-www-form-urlencoded'
                      }).then(res => {
                        wx.switchTab({
                          url: '../deviceList/deviceList'
                        })
                        that.setData({
                          inputValue: ""
                        })
                      })
                      })
                    }
                  })
    
                }
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
              wx.request({
                url: 'https://apis.sdcsoft.com.cn/wechat/DeviceDataMap/get',
                data: {
                  id: dataMapId,
                },
                method: 'GET',
                header: {
                  "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
                },
                success: function (res) {
                  let map;
                  let addr;
                  if (newFrame) {
                    map = JSON.parse(res.data.data.deviceDataMap)
                    addr = JSON.parse(res.data.data.pointIndexMap)
                  }
                  deviceList.push({
                    map: map,
                    addr: addr,
                    dataMapId: dataMapId,
                    newFrame: newFrame,
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
    
                  req.get('https://apis.sdcsoft.com.cn/wechat/userAddDeviceHistory/find/deviceNo/openId', {
                    openId: app.globalData.openid, deviceNo: deviceNo,
                  }, {
                    'content-type': 'application/x-www-form-urlencoded'
                  }).then(res => {
                    var date;
                    if (res.data.data.length != 0) {
                      date = new Date(res.data.data[0].bindTime);
                      date.setFullYear(date.getFullYear() + 1);
                      date.setDate(date.getDate() - 1);
                    } else {
                      date = new Date().setFullYear((new Date().getFullYear() + 1))
                      that.addDeviceRecord(deviceNo)
                    }
                    return date
                  }).then(date => {
                    if (date > new Date()) {
                      req.get('https://apis.sdcsoft.com.cn/wechat/Resource_Product/Resource/list', {}, {
                        'content-type': 'application/x-www-form-urlencoded'
                      }).then(res => {
                        var list = res.data.data
                        var resList = []
                        for (var i in list) {
                          if (list[i].status ==0) {
                            resList.push({
                              openId: app.globalData.openid,
                              resId: list[i].id,
                              deviceNo: deviceNo,
                              dueTime: date,
                            })
                          }
                        }
                        var smsList = []
                        smsList.push({
                          deviceNo: deviceNo,
                          range: 12,
                          rangeType: 2,
                          amount: 1,
                          openId: app.globalData.openid,
                        })
                        req.post('https://apis.sdcsoft.com.cn/wechat/Relation_DeviceSmsMap/create/many', {deviceSmsMapList:JSON.stringify(smsList)}, {
                        'content-type': 'application/x-www-form-urlencoded'
                        })
                        req.post('https://apis.sdcsoft.com.cn/wechat/RoleResource/newUser/create/many', {role_ResourceList:JSON.stringify(resList)}, {
                        'content-type': 'application/x-www-form-urlencoded'
                      }).then(res => {
                        wx.switchTab({
                          url: '../deviceList/deviceList'
                        })
                        that.setData({
                          inputValue: ""
                        })
                      })
                      })
                    }
                  })
                }
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
    })
  

  },
  scanCode: function (e) {
    var that = this
    var deviceNo;
    wx.scanCode({
      success: (res) => {
        console.log(res)
        if (res.result.indexOf('?') > 0) {
          deviceNo = res.result.substr(res.result.length - 10, res.result.length);
        } else {
          deviceNo = res.result;
        }
        var deviceList = []
        wx.request({
          url: 'https://apis.sdcsoft.com.cn/webapi/output/decoder/decode',
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
            console.log(deviceNo)
            deviceNo = res.data.data.deviceSuffix
            var deviceType = res.data.data.deviceType;
            var newFrame = res.data.data.newFrame;
            var dataMapId
            if (res.data.data.deviceDataMapCn) {
              dataMapId = res.data.data.deviceDataMapCn;
            } else {
              dataMapId = 1
            }
            wx.getStorage({
              key: 'deviceList',
              fail(res) {
                var deviceList = []
                that.addDevice(deviceList, deviceNo, deviceType, newFrame, dataMapId)
              },
              success(res) {
                deviceList = res.data;
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
                wx.request({
                  //获取openid接口   
                  url: 'https://apis.sdcsoft.com.cn/wechat/showDeviceStore/list',
                  data: {
                    openId: app.globalData.openid,
                  },
                  method: 'GET',
                  success: function (res) {
                    var count=res.data.data.length
                    var max=10
                    wx.request({
                      //获取openid接口   
                      url: 'https://apis.sdcsoft.com.cn/wechat/employee/getSoldPermissions',
                      data: {
                        openid: app.globalData.openid,
                      },
                      method: 'GET',
                      success: function (res) {
                        if (res.data == 0) {
                          max=50
                        }
                        console.log(max)
                        if (count > max) {
                          wx.showToast({
                            title: "添加设备数量不能超过"+max+"台",
                            icon: 'none',
                            duration: 2000
                          });
                          return;
                        }
                        that.addDevice(deviceList, deviceNo, deviceType, newFrame, dataMapId)
                      }
                    })
                   
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
    if (client == null) {
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
    } else {
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

  tologin: function () {
    wx.redirectTo({
      url: '../loginChoose/loginChoose'
    })
  },

  /**
   *  表单功能
   */
  formSubmit: function (e) {
    var that = this;
    var formData = e.detail.value; //获取表数据
    if (formData.deviceNo == null || formData.deviceNo == '') {
      wx.showToast({
        title: that.data.content.operation_pleasedeviceno,
        icon: 'none',
        duration: 2000
      });
    } else {

      var deviceNo = formData.deviceNo
      var deviceList = []
      wx.request({
        url: 'https://apis.sdcsoft.com.cn/webapi/output/decoder/decode',
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
          var newFrame = res.data.data.newFrame;
          var dataMapId
          if (res.data.data.deviceDataMapCn) {
            dataMapId = res.data.data.deviceDataMapCn;
          } else {
            dataMapId = 1
          }
          wx.getStorage({
            key: 'deviceList',
            fail(res) {
              var deviceList = []
              that.addDevice(deviceList, deviceNo, deviceType, newFrame, dataMapId)
            },
            success(res) {
              deviceList = res.data;
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
              wx.request({
                //获取openid接口   
                url: 'https://apis.sdcsoft.com.cn/wechat/showDeviceStore/list',
                data: {
                  openId: app.globalData.openid,
                },
                method: 'GET',
                success: function (res) {
                  var count=res.data.data.length
                  var max=10
                  wx.request({
                    //获取openid接口   
                    url: 'https://apis.sdcsoft.com.cn/wechat/employee/getSoldPermissions',
                    data: {
                      openid: app.globalData.openid,
                    },
                    method: 'GET',
                    success: function (res) {
                      if (res.data == 0) {
                        max=50
                      }
                      console.log(max)
                      if (count > max) {
                        wx.showToast({
                          title: "添加设备数量不能超过"+max+"台",
                          icon: 'none',
                          duration: 2000
                        });
                        return;
                      }
                      that.addDevice(deviceList, deviceNo, deviceType, newFrame, dataMapId)
                    }
                  })
                 
                }
              })

            }
          })
        }
      })
    }
  }
})


