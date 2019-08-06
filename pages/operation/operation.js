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
                      },
                      fail:function(res){
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
                        deviceType:deviceType,
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
        console.log(client)
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
    var that=this
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
            console.log(res)
            var openid = res.data.openid;//获取到的openid  
            that.setData({
              openid: res.data.openid.substr(0, 10) + '********' + res.data.openid.substr(res.data.openid.length - 8, res.data.openid.length)
            })
            wx.request({
              //获取openid接口   
              url: 'https://apis.sdcsoft.com.cn/wechat/employee/getwx',
              data: {
                openid: that.data.openid,
              },
              method: 'GET',
              success: function (res) {
                console.log(res)
                if (res.data.code == 1) {
                  that.tologin();
                }
              }
            })
          }
        })
      }
    })
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

                console.log(deviceNo)
                if (deviceNo.substr(0, 2) === '20') {
                  console.log("00222")
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
                }else{
                  console.log("11222")
                  wx.request({
                    //获取openid接口   
                    url: 'https://apis.sdcsoft.com.cn/webapi/wechat/store/create',
                    data: {
                      openId: that.data.openid,
                      deviceNo: deviceNo,
                      deviceType: deviceType,
                      deviceName: null,
                      imgStyle:0
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
          }
        })
    }
  }
})