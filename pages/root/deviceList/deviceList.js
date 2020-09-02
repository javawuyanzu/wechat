const app = getApp();
let map = new Map()

Page({
  data: {
    imgList: [],
    errorOldList: [],
    errorNewList: [],
    opend: '',
    ifName: false,
    lock: false,
    ifstyle: false,
    ifdelete: false,
    deviceTitle: '',
    deviceNo: '',
    timer: '',
    timerStates: true,
    content: null,
    devices: map,
    mqttif: false,
    userType: null,
    version: null,
    ifversion: false,
  },
  onHide: function () {
    var that = this
    that.setData({
      timerStates: false
    })
  },
  timer: function () {
    var that = this
    wx.getStorage({
      key: 'time',
      success(res) {

        that.setData({
          timer: setInterval(function () {
            if (that.data.timerStates) {
              that.httptimer()
            }
          }, 10000)
        })
      }
    })
  },

  httptimer: function () {
    var that = this
    wx.getStorage({
      key: 'deviceList',
      fail(res) {
        console.log(res)
      },
      success(res) {
        var httplist = res.data
        if (res.data.length == 0) {
          wx.showLoading({
            title: 'Loading',
          })
          wx.login({
            success: function (res) {
              wx.request({
                //获取openid接口  
                url: 'https://apis.sdcsoft.com.cn/wechat/device/getopenid',
                data: {
                  js_code: res.code,
                },
                method: 'GET',
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                success: function (res) {
                  var openid = res.data.openid.substr(0, 10) + '_' + res.data.openid.substr(res.data.openid.length - 8, res.data.openid.length)

                  wx.request({
                    //获取openid接口   
                    url: 'https://apis.sdcsoft.com.cn/wechat/showDeviceStore/list',
                    data: {
                      openId: openid,
                    },
                    method: 'GET',
                    success: function (res) {
                      console.log(res)
                      wx.hideLoading();
                      if (res.data.data.length == 0) {
                        return;
                      } else {
                        var templist = res.data.data
                        for (var i = 0; i < templist.length; i++) {
                          if (templist[i].mqttName != null) {
                            templist.splice(i, 1);
                            continue
                          }
                          httplist.push({
                            deviceNo: templist[i].deviceNo,
                            deviceName: templist[i].deviceName,
                            deviceType: templist[i].deviceType,
                            imgStyle: templist[i].imgStyle
                          });
                        }
                        that.getdata(httplist, 0);
                        wx.setStorageSync('deviceList', httplist)
                        wx.setStorageSync('cachedVersion', 1.0)
                        wx.hideLoading();
                      }
                    }
                  })
                }
              })
            }
          })
        } else {
          for (var i = 0; i < httplist.length; i++) {
            if (typeof (httplist[i].mqttName) != "undefined") {
              httplist.splice(i, 1);
            }
          }
          that.getdata(httplist, 0);
        }
      }
    })
    that.errorLing();
  },
  longTap: function (e) {
    var that = this;
    that.setData({
      ifName: true,
      lock: true,
      deviceNo: e.currentTarget.dataset.id,
    })
  },
  closeTap: function (e) {
    var that = this;
    that.setData({
      ifName: false,
      lock: false,
    })
  },
  closeStyle: function (e) {
    var that = this;
    that.setData({
      ifstyle: false,
      lock: false,
    })
  },
  handleTap: function (e) {
    var deviceNo = e.currentTarget.dataset.id
    var imgstyle = e.currentTarget.dataset.imgstyle
    var control = e.currentTarget.dataset.control
    var title = e.currentTarget.dataset.title
    var type = e.currentTarget.dataset.type
    var jiarezu = e.currentTarget.dataset.jiarezu
    var device = map.get(deviceNo)
    var newFrame = e.currentTarget.dataset.newframe
    var dataMapId = e.currentTarget.dataset.datamapid
    //var device = this.data.devices.get(deviceNo)
    app.globalData.device = device
    //检查锁
    if (this.data.lock) {
      return;
    } else {
      wx.navigateTo({
        url: "/pages/root/deviceDetail/deviceDetail?deviceNo=" + deviceNo + "&imgstyle=" + imgstyle + "&control=" + control + "&title=" + title + "&type=" + type + "&jiarezu=" + jiarezu + "&newFrame=" + newFrame + "&dataMapId=" + dataMapId,
      })
    }
  },
  runstate: function (e) {
    console.log("14516155")
  },
  rename: function (e) {
    var that = this;
    that.setData({
      ifrename: true,
      ifName: false,
    })
  },
  toRepair: function (e) {
    console.log(this.data.deviceNo)
    wx.navigateTo({
      url: "/pages/repair/repair?deviceNo=" + this.data.deviceNo,
    })
    this.setData({
      ifName: false
    })
  },
  toPay: function (e) {
    console.log(e.currentTarget.dataset.deviceno)
    wx.navigateTo({
      url: "../../payMenu/payMenu?deviceNo=" + e.currentTarget.dataset.deviceno
    })
    this.setData({
      ifName: false
    })
  },
  deleteDevice: function (e) {
    var that = this;
    that.setData({
      ifdelete: true,
      ifName: false,
    })
  },
  nodelete: function (e) {
    var that = this;
    that.setData({
      ifdelete: false,
      lock: false,
    })
  },
  yesdelete: function (e) {
    var that = this
    var deviceList = []
    wx.getStorage({
      key: 'deviceList',
      success(res) {
        deviceList = res.data
        for (var i = 0; i < deviceList.length; i++) {
          if (deviceList[i].deviceNo === that.data.deviceNo) {
            if (deviceList[i].deviceNo.substr(0, 2) === '20') {
              that.unSubTopic(deviceList[i].mqttName)
            }

            deviceList.splice(i, 1);
            break;
          }
        }
        for (var i = 0; i < that.data.imgList.length; i++) {
          if (that.data.imgList[i].deviceNo === that.data.deviceNo) {
            that.data.imgList.splice(i, 1);
            break;
          }
        }
        that.setData({
          imgList: that.data.imgList,
          lock: false,
        });


        wx.setStorage({
          key: 'deviceList',
          data: deviceList,
        })
        wx.request({
          //获取openid接口   
          url: 'https://apis.sdcsoft.com.cn/wechat/showDeviceStore/remove',
          data: {
            openId: app.globalData.openid,
            deviceNo: that.data.deviceNo
          },
          method: 'GET',
          success: function (res) {
            console.log(res)
          }
        })
        wx.request({
          //获取openid接口   
          url: 'https://apis.sdcsoft.com.cn/wechat/RoleResource/remove',
          data: {
            openId: app.globalData.openid,
            deviceNo: that.data.deviceNo
          },
          method: 'GET',
          success: function (res) {
            wx.request({
              //获取openid接口   
              url: 'https://apis.sdcsoft.com.cn/wechat/Relation_DeviceSmsMap/remove',
              data: {
                openId: app.globalData.openid,
                deviceNo: that.data.deviceNo
              },
              method: 'GET',
              success: function (res) {
                console.log(res)
              }
            })
          }
        })
        wx.showToast({
          title: that.data.content.list_deletesuccess,
          icon: 'success',
          duration: 2000,
          success(res) {

            that.setData({
              ifdelete: false,
            })
          }
        });
      }
    })
  },
  imgstyle: function (e) {
    var that = this;
    that.setData({
      ifstyle: true,
      ifName: false,
    })
  },
  dName: function (e) {

    this.setData({
      deviceTitle: e.detail.value
    })
  },
  renameconfirm: function (e) {
    var that = this
    var length = parseInt(that.data.deviceTitle.length);
    if (length > 10) {
      wx.showToast({
        title: '设备昵称不得超过十个字',
        icon: 'none',
        duration: 2000,
        mask: true
      })
      return;
    }
    var deviceList = []
    wx.getStorage({
      key: 'deviceList',
      success(res) {
        var imglist = that.data.imgList
        for (var i = 0; i < imglist.length; i++) {
          if (imglist[i].deviceNo === that.data.deviceNo) {
            imglist[i].title = that.data.deviceTitle + "——" + imglist[i].deviceNo
            break
          }
        }
        that.setData({
          imgList: imglist
        })
        deviceList = res.data
        for (var i = 0; i < deviceList.length; i++) {
          if (deviceList[i].deviceNo === that.data.deviceNo) {
            deviceList[i].deviceName = that.data.deviceTitle
            wx.request({
              //获取openid接口   
              url: 'https://apis.sdcsoft.com.cn/wechat/showDeviceStore/modify',
              data: {
                openId: app.globalData.openid,
                deviceNo: that.data.deviceNo,
                deviceType: deviceList[i].deviceType,
                mqttName: deviceList[i].mqttName,
                deviceName: that.data.deviceTitle,
                imgStyle: deviceList[i].imgStyle
              },
              method: 'POST',
              success: function (res) {
              }
            })
            break
          }
        }
        wx.setStorage({
          key: 'deviceList',
          data: deviceList,
          success(res) {
            that.setData({
              ifrename: false,
              lock: false,
            })
          }
        })
        wx.showToast({
          title: that.data.content.list_updatesuccess,
          icon: 'success',
          duration: 2000,
          success(res) {
            that.setData({
              ifstyle: false,
            })
          }
        });
      }
    })
  },
  listyle: function (e) {
    var that = this
    var deviceList = []
    wx.showLoading({
      title: that.data.content.list_refresh,
    })
    wx.getStorage({
      key: 'deviceList',
      success(res) {
        var imglist = that.data.imgList
        for (var i = 0; i < imglist.length; i++) {
          if (imglist[i].deviceNo === that.data.deviceNo) {
            imglist[i].imgStyle = 1
            imglist[i].src = imglist[i].src.substr(0, 67) + "1" + '.gif'
            var ilist = that.data.imgList
          }
        }
        that.setData({
          imgList: imglist
        })
        deviceList = res.data
        for (var i = 0; i < deviceList.length; i++) {
          if (deviceList[i].deviceNo === that.data.deviceNo) {
            deviceList[i].imgStyle = 1
          }
        }
        wx.setStorage({
          key: 'deviceList',
          data: deviceList,
        })
        wx.showToast({
          title: that.data.content.list_updatesuccess,
          icon: 'success',
          duration: 2000,
          success(res) {
            that.setData({
              ifstyle: false,
              lock: false,
            })
          }
        });
      }
    })
  },
  wostyle: function (e) {
    var that = this
    var deviceList = []

    wx.getStorage({
      key: 'deviceList',
      success(res) {
        var imglist = that.data.imgList
        for (var i = 0; i < imglist.length; i++) {
          if (imglist[i].deviceNo === that.data.deviceNo) {
            imglist[i].imgStyle = 0
            imglist[i].src = imglist[i].src.substr(0, 67) + "0" + '.gif'
          }
        }
        that.setData({
          imgList: imglist
        })

        deviceList = res.data
        for (var i = 0; i < deviceList.length; i++) {
          if (deviceList[i].deviceNo === that.data.deviceNo) {
            deviceList[i].imgStyle = 0
          }
        }

        wx.setStorage({
          key: 'deviceList',
          data: deviceList,
        })
        wx.showToast({
          title: that.data.content.list_updatesuccess,
          icon: 'success',
          duration: 2000,
          success(res) {
            that.setData({
              ifstyle: false,
              lock: false,
            })
          }
        });
      }
    })
  },
  renamecance: function (e) {
    var that = this;
    that.setData({
      ifrename: false,
      lock: false,
    })
  },
  versionHidden: function (e) {
    var that = this;
    that.setData({
      ifversion: false,
    })
  },
  updateDevice: function (e) {
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
            var openid = res.data.openid.substr(0, 10) + '_' + res.data.openid.substr(res.data.openid.length - 8, res.data.openid.length)
            wx.request({
              //获取openid接口 
              url: 'https://apis.sdcsoft.com.cn/webapi/wechat/devicestore/check/openId',
              data: {
                openId: openid,
              },
              method: 'GET',
              header: {
                "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
              },
              success: function (res) {
                if (res.data.code == 1) {
                  wx.getStorage({
                    key: 'deviceList',
                    success(res) {
                      var list = res.data
                      for (var i = 0; i < list.length; i++) {
                        list[i].openId = openid
                        list[i].deviceName = null
                      }
                      if (list.length > 0) {
                        wx.request({
                          //获取openid接口   
                          url: 'https://apis.sdcsoft.com.cn/wechat/showDeviceStore/create/many',
                          data: {
                            storeList: JSON.stringify(list).replace(/imgstyle/g, "imgStyle"),
                          },
                          method: 'POST',
                          header: {
                            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
                          },
                          success: function (res) {
                          }
                        })
                      }
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
  onLoad: function (options) {
    
    var that = this;
    var ilist = that.data.imgList
    wx.getStorage({
      key: 'deviceList',
      success(res) {
        var list = res.data
        for (var i in list) {
          ilist.push({
            title: list[i].deviceNo,
            runstate: that.data.content.list_runstate,
            deviceNo: list[i].deviceNo,
            imgStyle: 0,
            simTitle: ""
          })
        }
        that.setData({
          imgList: ilist
        })
        for (var i in list) {
          var dataMapId = list[i].dataMapId
          if (list[i].newFrame) {
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
                let map = JSON.parse(res.data.data.deviceDataMap);
                let addr = JSON.parse(res.data.data.pointIndexMap);
                list[i].map = map
                list[i].addr = addr
                wx.setStorage({
                  key: 'deviceList',
                  data: list
                })
              }
            })
          }
        }

      }
    })
    wx.getStorage({
      key: 'version',
      success(res) {
        if (res.data != "2.5.0") {
          that.setData({
            ifversion: true,
            version: "2.5.0"
          })
          wx.setStorageSync('version', "2.5.0")
        }
      },
      fail(res) {
        wx.setStorageSync('version', "2.5.0")
        that.setData({
          ifversion: true,
          version: "2.5.0"
        })
      },
    })
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
            console.log(res.data.openid)
            var openid = res.data.openid.substr(0, 10) + '_' + res.data.openid.substr(res.data.openid.length - 8, res.data.openid.length)
            app.globalData.openid = openid

            wx.request({
              //获取openid接口 
              url: 'https://apis.sdcsoft.com.cn/wechat/user/wxShow/check/openId',
              data: {
                openId: openid
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              method: 'POST',
              success: function (res) {
                if (res.data.code == 1) {
                  wx.request({
                    url: 'https://apis.sdcsoft.com.cn/wechat/user/saveEmployee',
                    method: "GET",
                    data: {
                      realName: openid,
                      openid: openid,
                    },
                    header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
                    success: function (res) {
                      console.log(res)
                      that.setData({
                        empower: false
                      })
                    }
                  })
                }
              }
            })


          }
        })
      }
    })



    // getApp().conmqtt().then(function () {
    //   //that.subTopic("/Msg/20/000/00001")

    //   app.globalData.client.publish("/CTL/20/000/00001", "123123", function (err) {
    //     //console.log(err)
    //     if (!err) {
    //       wx.showToast({
    //         title: '发布成功',
    //         icon: 'success',
    //         duration: 1000,
    //         mask: true
    //       })
    //     }
    //     else {
    //       wx.showToast({
    //         title: '发布失败',
    //         icon: 'error',
    //         duration: 1000,
    //         mask: true
    //       })
    //     }
    //   })
    // })

    that.updateDevice();
    if (app.globalData.lang === 'zh-cn') {
      var chinese = require("../../../utils/Chinses.js")
      that.setData({
        content: chinese.Content
      })

      wx.setTabBarItem({
        index: 0,
        text: '主页',
        iconPath: 'images/tab_activity.png',
        selectedIconPath: 'images/tab_activity_selected.png'
      }),
        wx.setTabBarItem({
          index: 1,
          text: '我的',
          iconPath: 'images/tab_home.png',
          selectedIconPath: 'images/tab_home_selected.png'
        }),
        wx.setTabBarItem({
          index: 2,
          text: '添加',
          iconPath: 'images/add.png',
          selectedIconPath: 'images/add_select.png'
        })
    }
    if (app.globalData.lang === 'en-us') {
      var english = require("../../../utils/English.js")
      that.setData({
        content: english.Content
      })

      wx.setTabBarItem({
        index: 0,
        text: 'Devices',
        iconPath: 'images/tab_activity.png',
        selectedIconPath: 'images/tab_activity_selected.png'
      }),
        wx.setTabBarItem({
          index: 1,
          text: 'Home',
          iconPath: 'images/tab_home.png',
          selectedIconPath: 'images/tab_home_selected.png'
        }),
        wx.setTabBarItem({
          index: 2,
          text: 'Add',
          iconPath: 'images/add.png',
          selectedIconPath: 'images/add_select.png'
        })
    }
    wx.setNavigationBarTitle({
      title: that.data.content.list_title
    })
    wx.getStorage({
      key: 'deviceList',
      success(res) {
        var httplist = res.data
        var imglist = []
        for (var i = 0; i < httplist.length; i++) {
          if (typeof (httplist[i].mqttName) != "undefined") {
            getApp().conmqtt().then(function () {
              wx.getStorage({
                key: 'deviceList',
                success(res) {
                  var mqttlist = res.data
                  for (var i = 0; i < mqttlist.length; i++) {

                    if (typeof (mqttlist[i].mqttName) != "undefined") {
                      that.subTopic(mqttlist[i].mqttName)
                    }
                  }
                }
              })
            })
          }
        }
      }
    })
    that.timer();
    app.globalData.callBack[0] = function (t, m) {
      //console.log('列表页收到数据：' + t + ':=' + m);
      that.getmqttdata(t, m)
    }
  },
  tologin: function () {
    wx.redirectTo({
      url: '../loginChoose/loginChoose'
    })
  },

  subTopic: function (topic) {
    var client = app.globalData.client;
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
  },
  unSubTopic: function (topic) {
    var client = app.globalData.client;
    if (client != null) {
      client.unsubscribe(topic, function (err) {
        if (!err) {
          console.log('取消订阅成功' + topic)
        } else {
          console.log('取消订阅失败' + topic)
        }
      })
      //var bf = new ArrayBuffer(2);
      //client.publish('/RPT/01/001',bf)
    } else {
      wx.showToast({
        title: '连接失败，请稍后再试',
        icon: 'waring',
        duration: 1000,
        mask: true
      })
    }
  },
  finddevice: function (list, deviceNo) {
    for (var i = 0; i < list.length; i++) {
      if (list[i].deviceNo === deviceNo) {
        return true;
      }
    }
    return false;
  },
  findx: function (list, ex) {
    for (var i = 0; i < list.length; i++) {
      if (list[i].title === ex.title) {
        return true;
      }
    }
    return false;
  },
  errorLing: function () {
    var that = this
    for (var i = 0; i < that.data.errorOldList.length; i++) {
      if (!that.findx(that.data.errorNewList, that.data.errorOldList[i])) {
        that.data.errorOldList.splice(i, 1);
        break;
      }
    }
    if (that.data.errorNewList.length > that.data.errorOldList.length) {
      wx.getStorage({
        key: 'warningType',
        success(res) {
          if (res.data == 1) {
            wx.vibrateLong()
          } else if (res.data == 2) {
            const innerAudioContext = wx.createInnerAudioContext(); //新建一个createInnerAudioContext;
            innerAudioContext.autoplay = true; //音频自动播放设置
            innerAudioContext.src = 'http://www.sdcsoft.com.cn/app/gl/error.mp3'; //链接到音频的地址
            innerAudioContext.onPlay(() => { }); //播放音效
            innerAudioContext.onError((res) => { //打印错误
              console.log(res.errMsg); //错误信息
              console.log(res.errCode); //错误码
            })
          } else if (res.data == 3) {
            wx.vibrateLong()
            const innerAudioContext = wx.createInnerAudioContext(); //新建一个createInnerAudioContext(;
            innerAudioContext.autoplay = true; //音频自动播放设置
            innerAudioContext.src = 'http://www.sdcsoft.com.cn/app/gl/error.mp3'; //链接到音频的地址
            innerAudioContext.onPlay(() => { }); //播放音效
            innerAudioContext.onError((res) => { //打印错误
              console.log(res.errMsg); //错误信息
              console.log(res.errCode); //错误码
            })
          }
        }
      })

    }
    that.setData({
      errorOldList: that.data.errorNewList,
      errorNewList: []
    })
  },
  onShow: function () {
    var that = this
    wx.getStorage({
      key: 'userType',
      fail(res) {
        wx.setStorageSync('userType', 0)
        that.setData({
          userType: 0
        })
      },
      success(res) {
        that.setData({
          userType: res.data
        })
      }
    })
    that.httptimer()
    that.setData({
      timerStates: true
    })
    wx.getStorage({
      key: 'deviceList',
      success(res) {
        var list = res.data
        that.getSimStatus(list, 0)
      }
    })


  },
  getSimStatus(deviceNos, index) {

    var that = this;
    if (index == deviceNos.length) {
      return;
    }
    var deviceNo = deviceNos[index].deviceNo
    wx.request({
      url: 'https://apis.sdcsoft.com.cn/wechat/device/getsuffix',
      data: {
        deviceNo: deviceNo,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
      },
      method: 'GET',
      success: function (res) {
        var iMEI = res.data.data.iMEI
        if (res.data.data.iMEI != null) {
          wx.request({
            url: 'https://apis.sdcsoft.com.cn/wechat/smsPaymentRecords/list/deviceNo',
            data: {
              deviceNo: deviceNo,
            },
            header: {
              "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
            },
            method: 'GET',
            success: function (res) {
              if (res.data.data != null) {
                var list = that.data.imgList
                for (var i = 0; i < list.length; i++) {
                  if (list[i].deviceNo == deviceNo) {
                    list[i].simTitle = "物联卡到期时间:" + res.data.data.dueTime.substr(0, 10)
                  }
                }
                that.setData({
                  imgList: list
                })
              } else {
                wx.request({
                  url: 'https://apis.sdcsoft.com.cn/wechat/Sim/iMEI',
                  data: {
                    iMEI: iMEI,
                  },
                  header: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
                  },
                  method: 'GET',
                  success: function (res) {
                    var list = that.data.imgList

                    for (var i = 0; i < list.length; i++) {
                      if (list[i].deviceNo == deviceNo) {
                        if (res.data.state == '00') {
                          list[i].simTitle = "物联卡状态:正常"
                        }
                        if (res.data.state == '01') {
                          list[i].simTitle = "物联卡状态:代缴费"
                        }
                        if (res.data.state == '02') {
                          list[i].simTitle = "物联卡状态:欠费"
                        }
                        if (res.data.state == '03') {
                          list[i].simTitle = "物联卡状态:停机"
                        }
                        if (res.data.state == '04') {
                          list[i].simTitle = "物联卡状态:销号"
                        }
                      }
                    }
                    that.setData({
                      imgList: list
                    })
                  }
                })
              }

            }
          })
        }
      }
    })



    index++
    that.getSimStatus(deviceNos, index)
  },
  getDeviceFromBytes(deviceNo, deviceType, data) {
    var that = this;
    console.log(data)
    let d = app.globalData.deviceAdapter.getSdcSoftDevice(deviceType, new Uint8Array(data))
    map.set(deviceNo, d)
    return d
  },
  getdata(deviceNos, index) {
    var that = this
    if (index == deviceNos.length) {
      return;
    }
    var newFrame = ''

    if (deviceNos[index].newFrame) {
      newFrame = deviceNos[index].newFrame
    } else {
      newFrame = false
    }
    let map = deviceNos[index].map
    let addr = deviceNos[index].addr
    var runstate = ''
    var title = ''
    var deviceNo = ''
    var src = ''
    var mock1 = ''
    var mock2 = ''
    var mock3 = ''
    var errcount = ''
    var imgstyle = ''
    var runday = ''
    var jiarezu = ''
    var control = ''
    var type = ''
    var lang = ''
    var simTitle = ''
    var deviceno = deviceNos[index].deviceNo
    var dataMapId = deviceNos[index].dataMapId
    if (typeof (deviceNos[index].mqttName) == "undefined" || deviceNos[index].mqttName == null) {
      var title1 = ''
      var deviceType = deviceNos[index].deviceType
      var runstate1 = ''
      var src1 = ''
      var errcount1 = 0
      if (deviceNos[index].deviceName == '' || deviceNos[index].deviceName == null) {
        title1 = deviceNos[index].deviceNo
      } else {
        title1 = deviceNos[index].deviceName + "-" + deviceNos[index].deviceNo
      }
      var imgstyle1 = deviceNos[index].imgStyle

      wx.getStorage({
        key: 'deviceList',
        success(res) {
          var deviceList = res.data

          wx.request({
            url: 'https://apis.sdcsoft.com.cn/webapi/output/device/get',
            data: {
              deviceNo: deviceno,
            },
            method: 'GET',
            header: {
              "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
            },
            responseType: 'arraybuffer',
            success: function (res) {
              if (res.data == null || res.data.byteLength == 0) {
                var ilist = that.data.imgList
                if (that.finddevice(ilist, deviceno)) {
                  for (var i = 0; i < ilist.length; i++) {
                    if (ilist[i].deviceNo === deviceno) {
                      ilist[i].deviceNo = deviceno
                      ilist[i].title = title1
                      ilist[i].runstate = that.data.content.list_runstate
                      ilist[i].imgStyle = imgstyle1
                      ilist[i].errcount = errcount1
                      ilist[i].src = src1
                      ilist[i].mock1 = ""
                      ilist[i].mock2 = ""
                      simTitle: simTitle
                      that.setData({
                        imgList: ilist
                      })
                      break;
                    }
                  }
                } else {
                  ilist.push({
                    title: deviceno,
                    runstate: that.data.content.list_runstate,
                    deviceNo: deviceno,
                    imgStyle: imgstyle1,
                    simTitle: simTitle
                  })
                  that.setData({
                    imgList: ilist
                  })
                }
              } else {
                var bytes = res.data
                try {
                  if (newFrame) {
                    app.globalData.adapter.Init(map, addr)
                    console.log(new Uint8Array(bytes))
                    app.globalData.adapter.handlerData(new Uint8Array(bytes))
                    let device = app.globalData.adapter.Device
                    var errorList = []
                    for (var index in device.BaoJing) {
                      errorList.push({
                        deviceNo: deviceno,
                        title: device.BaoJing[index].name
                      })
                    }
                    errcount1 = errorList.length,
                    that.setData({
                      errorNewList: that.data.errorNewList.concat(errorList)
                    })
                    var mock11 = ''
                    var mock22 = ''
                    for (var index in device.Focus) {
                      if (mock11 === "") {
                        mock11 = device.Focus[index].name + ":" + device.Focus[index].vstr
                        continue;
                      }
                      if (mock22 === "") {
                        mock22 = device.Focus[index].name + ":" + device.Focus[index].vstr
                        break;
                      }
                    }
                    if (device.Run.name!="") {
                     
                      runday = device.Run.name + ":" + device.Run.vstr
                    }
                    console.log(device.status)
                    if (device.status) {
                      runstate1 = "-"+ device.status.vstr
                    }
                    if(device.getStoveElements().length>0){
                      var el = device.getStoveElements()[0].values
                      var stove = device.getStoveElements()[0].prefix
                      for (var i in el) {
                        if (el[i] != -1) {
                          stove = stove + "-" + el[i]
                        }
                      }
                    
                        src1 = 'http://www.sdcsoft.com.cn/app/gl/animation/animation/stove/' + stove.substr(0, 7) + "-" + imgstyle1 + '.gif'
                    }
                    var ilist = that.data.imgList
                    if (that.finddevice(ilist, deviceno)) {
                      for (var i = 0; i < ilist.length; i++) {
                        if (ilist[i].deviceNo === deviceno) {
                          ilist[i].deviceNo = deviceno
                          ilist[i].title = title1
                          ilist[i].runstate =runstate1
                          ilist[i].imgStyle = imgstyle1
                          ilist[i].errcount = errcount1
                          ilist[i].src = src1
                          ilist[i].mock1 = mock11
                          ilist[i].mock2 = mock22
                          ilist[i].runday = runday
                          ilist[i].type = deviceType
                          ilist[i].lang = app.globalData.lang
                          ilist[i].jiarezu = jiarezu
                          ilist[i].newFrame = newFrame
                          ilist[i].dataMapId = dataMapId
                          simTitle: simTitle
                          that.setData({
                            imgList: ilist
                          })
                          break;
                        }
                      }
                    } else {
                      ilist.push({
                        title: title1,
                        runstate:"-"+ runstate1,
                        deviceNo: deviceno,
                        imgStyle: imgstyle1,
                        errcount: errcount1,
                        src: src1,
                        mock1: mock11,
                        mock2: mock22,
                        runday: day + hour,
                        type: deviceType,
                        lang: app.globalData.lang,
                        jiarezu: jiarezu,
                        simTitle: simTitle,
                        newFrame: newFrame,
                        dataMapId: dataMapId
                      })
                      that.setData({
                        imgList: ilist
                      })
                    }

                  } else {
                    let data = that.getDeviceFromBytes(deviceno, deviceType, res.data)
                    //data.setModbusNo 设置Modbus站号 默认1 1-255
                    if (data.getTypeName() != deviceType) {
                      wx.request({
                        //获取openid接口   
                        url: 'https://apis.sdcsoft.com.cn/wechat/device/modify/type',
                        data: {
                          suffix: deviceno,
                          deviceType: deviceType,
                          subType: data.getTypeName(),
                        },
                        method: 'GET',
                        success: function (res) {
                          deviceType = data.getTypeName()
                        }
                      })
                    }
                    var errorList = []
                    for (var index in data.getExceptionFields().map) {
                      errorList.push({
                        deviceNo: deviceNo,
                        title: data.getExceptionFields().map[index].title
                      })
                    }
                    that.setData({
                      errorNewList: that.data.errorNewList.concat(errorList)
                    })
                    var day = ''
                    var hour = ''
                    var jiarezu1 = ''
                    var mock11 = ''
                    var mock22 = ''
                    for (var index in data.getDeviceFocusFields()) {
                      if (data.getDeviceFocusFields()[index].name === "jia_re_zu_count") {
                        jiarezu1 = data.getDeviceFocusFields()[index].value
                      }
                      if (data.getDeviceFocusFields()[index].name === "ba_yunxingtianshu") {
                        day = data.getDeviceFocusFields()[index].valueString
                      }
                      if (data.getDeviceFocusFields()[index].name === "ba_yunxingxiaoshishu") {
                        hour = data.getDeviceFocusFields()[index].valueString
                      }
                    }
                    for (var index in data.getBaseInfoFields().map) {
                      if (data.getBaseInfoFields().map[index].name === "o_system_status") {
                        runstate1 = data.getBaseInfoFields().map[index].valueString

                      }

                    }
                    for (var index in data.getMockFields().map) {
                      if (mock11 === "") {
                        mock11 = data.getMockFields().map[index].title + ":" + data.getMockFields().map[index].valueString
                        continue;
                      }
                      if (mock22 === "") {
                        mock22 = data.getMockFields().map[index].title + ":" + data.getMockFields().map[index].valueString
                        break;
                      }
                    }
                    errcount1 = errorList.length,
                      src1 = 'http://www.sdcsoft.com.cn/app/gl/animation/animation/stove/' + data.getStoveElement().getElementPrefixAndValuesString().substr(0, 8) + imgstyle1 + data.getStoveElement().getElementPrefixAndValuesString().substr(9, 2) + '.gif'
                    var ilist = that.data.imgList
                    if (that.finddevice(ilist, deviceno)) {
                      for (var i = 0; i < ilist.length; i++) {
                        if (ilist[i].deviceNo === deviceno) {
                          ilist[i].deviceNo = deviceno
                          ilist[i].title = title1
                          ilist[i].runstate ="-"+ runstate1
                          ilist[i].imgStyle = imgstyle1
                          ilist[i].errcount = errcount1
                          ilist[i].src = src1
                          ilist[i].mock1 = mock11
                          ilist[i].mock2 = mock22
                          ilist[i].runday = "运行时间：" + day + hour
                          ilist[i].type = deviceType
                          ilist[i].lang = app.globalData.lang
                          ilist[i].jiarezu = jiarezu1
                          ilist[i].newFrame = newFrame
                          ilist[i].dataMapId = dataMapId
                          simTitle: simTitle
                          that.setData({
                            imgList: ilist
                          })
                          break;
                        }
                      }
                    } else {
                      ilist.push({
                        title: title1,
                        runstate:"-"+ runstate1,
                        deviceNo: deviceno,
                        imgStyle: imgstyle1,
                        errcount: errcount1,
                        src: src1,
                        mock1: mock11,
                        mock2: mock22,
                        runday: day + hour,
                        type: deviceType,
                        lang: app.globalData.lang,
                        jiarezu: jiarezu1,
                        simTitle: simTitle,
                        newFrame: newFrame,
                        dataMapId: dataMapId
                      })
                      that.setData({
                        imgList: ilist
                      })
                    }
                  }
                } catch (e) {
                  console.log(e)
                  wx.request({
                    url: 'https://apis.sdcsoft.com.cn/wechat/device/getsuffix',
                    data: {
                      deviceNo: deviceno,
                    },
                    header: {
                      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
                    },
                    method: 'GET',
                    success: function (res) {
                      console.log(res)
                      var newFrame = res.data.data.newFrame;
                      if (!newFrame) {
                        var ilist = that.data.imgList
                        if (that.finddevice(ilist, deviceno)) {
                          for (var i = 0; i < ilist.length; i++) {
                            if (ilist[i].deviceNo === deviceno) {
                              if (ilist[i].runstate != "-Error") {
                                ilist[i].deviceNo = deviceno
                                ilist[i].title = deviceno
                                ilist[i].runstate = "Error"
                                ilist[i].error = 1
                                that.setData({
                                  imgList: ilist
                                })
                                wx.showModal({
                                  title: that.data.content.list_prompt,
                                  content: that.data.content.list_error1 + deviceno + that.data.content.list_error2,
                                  success(res) { }
                                })
                              }
                              break;
                            }
                          }
                        } else {
                          var ilist = that.data.imgList
                          ilist.push({
                            title: deviceno,
                            runstate:"-"+ "Error",
                            deviceNo: deviceno,
                            lang: app.globalData.lang
                          })
                        }
                        that.setData({
                          imgList: ilist
                        })
                        return
                      }
                      try {
                        var dataMapId;
                        if (res.data.data.deviceDataMapCn) {
                          dataMapId = res.data.data.deviceDataMapCn
                        } else {
                          dataMapId = res.data.data.deviceDataMapEn
                        }
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
                            console.log(res)
                            let map = JSON.parse(res.data.data.deviceDataMap)
                            let addr = JSON.parse(res.data.data.pointIndexMap)
                            wx.getStorage({
                              key: 'deviceList',
                              success(res) {
                                deviceList = res.data;
                                for (var i in deviceList) {
                                  if (deviceList[i].deviceNo == deviceno) {
                                    deviceList[i].map = map,
                                      deviceList[i].addr = addr,
                                      deviceList[i].dataMapId = dataMapId,
                                      deviceList[i].newFrame = newFrame,
                                      deviceList[i].deviceNo = deviceno,
                                      deviceList[i].deviceName = '',
                                      deviceList[i].deviceType = "",
                                      deviceList[i].imgStyle = 0
                                  }
                                }
                                wx.setStorage({
                                  key: 'deviceList',
                                  data: deviceList,
                                  success: function (res) {
                                  }
                                })
                              }
                            })
                          }
                        })
                      } catch (error) {
                        console.log(error)
                        var ilist = that.data.imgList
                        if (that.finddevice(ilist, deviceno)) {
                          for (var i = 0; i < ilist.length; i++) {
                            if (ilist[i].deviceNo === deviceno) {
                              if (ilist[i].runstate != "-Error") {
                                ilist[i].deviceNo = deviceno
                                ilist[i].title = deviceno
                                ilist[i].runstate = "-"+"Error"
                                ilist[i].error = 1
                                that.setData({
                                  imgList: ilist
                                })
                                wx.showModal({
                                  title: that.data.content.list_prompt,
                                  content: that.data.content.list_error1 + deviceno + that.data.content.list_error2,
                                  success(res) { }
                                })
                              }
                              break;
                            }
                          }
                        } else {
                          var ilist = that.data.imgList
                          ilist.push({
                            title: deviceno,
                            runstate: "-Error",
                            deviceNo: deviceno,
                            lang: app.globalData.lang
                          })
                        }
                        that.setData({
                          imgList: ilist
                        })
                        return
                      }

                    }
                  })
                }
              }
            }
          })
        }
      })
    }
    index++
    that.getdata(deviceNos, index)
  },
  getmqttdata(deviceNo, byte) {
    var that = this;
    var runstate1 = ''
    var title = ''
    var src1 = ''
    var mock1 = ''
    var mock2 = ''
    var errcount1 = ''
    var imgstyle = ''
    var runday = ''
    var jiarezu = ''
    var control = ''
    var type = ''
    var title1 = ''
    var imgstyle1 = 0
    var deviceType = ''
    wx.getStorage({
      key: 'deviceList',
      success(res) {
        var deviceList = res.data
        for (var i = 0; i < deviceList.length; i++) {
          if (deviceList[i].mqttName === deviceNo) {
            deviceType = deviceList[i].deviceType
            deviceNo = deviceList[i].deviceNo

            if (deviceList[i].deviceName === '') {
              title1 = deviceList[i].deviceNo
            } else {
              title1 = deviceNos[index].deviceName + "-" + deviceNos[index].deviceNo
            }
            break;
          }
        }
        try {
          var databyte = new Uint8Array(byte)
          let data = that.getDeviceFromBytes(deviceNo, deviceType, databyte);
          //console.log(data)
          // data.getMockFields().each((key, value) => {
          //   console.log('title:=' + value.getTitle() + ' value:=' + value.getValueString());
          // });
          if (data == null) {
            title1: title1,
              runstate1 = that.data.content.list_runstate,
              deviceNo = deviceNo,
              imgstyle = 0,
              errcount1 = 0,
              src1 = '',
              mock1 = ''
            // if (byte.length > 5) {
            //   wx.showToast({
            //     title: deviceNo + '号设备，数据异常',
            //     icon: 'none',
            //     duration: 2000
            //   })
            // }

          }
          else {
            var errorList = []
            for (var index in data.getExceptionFields().map) {
              errorList.push({
                deviceNo: deviceNo,
                title: data.getExceptionFields().map[index].title
              })
            }
            that.setData({
              errorNewList: that.data.errorNewList.concat(errorList)
            })
            var day = ''
            var hour = ''
            var jiarezu1 = ''
            var mock11 = ''
            var mock22 = ''
            for (var index in data.getBaseInfoFields().map) {
              if (data.getBaseInfoFields().map[index].name === "o_system_status") {
                runstate1 = data.getBaseInfoFields().map[index].valueString
              }
            }

            for (var index in data.getDeviceFocusFields()) {
              if (data.getDeviceFocusFields()[index].name === "jia_re_zu_count") {
                jiarezu1 = data.getDeviceFocusFields()[index].value
              }
              if (data.getDeviceFocusFields()[index].name === "ba_yunxingtianshu") {
                day = data.getDeviceFocusFields()[index].valueString
              }
              if (data.getDeviceFocusFields()[index].name === "ba_yunxingxiaoshishu") {
                hour = data.getDeviceFocusFields()[index].valueString
              }
            }

            for (var index in data.getMockFields().map) {
              if (mock11 === "") {
                mock11 = data.getMockFields().map[index].title + ":" + data.getMockFields().map[index].valueString
                continue;
              }
              if (mock22 === "") {
                mock22 = data.getMockFields().map[index].title + ":" + data.getMockFields().map[index].valueString
                break;
              }
            }
            errcount1 = errorList.length,
              src1 = 'http://www.sdcsoft.com.cn/app/gl/animation/animation/stove/' + data.getStoveElement().getElementPrefixAndValuesString().substr(0, 8) + imgstyle1 + data.getStoveElement().getElementPrefixAndValuesString().substr(9, 2) + '.gif'

          }
          var ilist = that.data.imgList
          if (that.finddevice(ilist, deviceNo)) {
            for (var i = 0; i < ilist.length; i++) {
              if (ilist[i].deviceNo === deviceNo) {
                ilist[i].deviceNo = deviceNo
                ilist[i].title = title1
                ilist[i].runstate = runstate1
                ilist[i].imgStyle = imgstyle1
                ilist[i].errcount = errcount1
                ilist[i].src = src1
                ilist[i].mock1 = mock11
                ilist[i].mock2 = mock22
                ilist[i].runday = day + hour
                ilist[i].type = deviceType
                ilist[i].lang = app.globalData.lang
                ilist[i].jiarezu = jiarezu1
                that.setData({
                  imgList: ilist
                })
                break;
              }
            }
          } else {
            ilist.push({
              title: title1,
              runstate: runstate1,
              deviceNo: deviceNo,
              imgStyle: imgstyle1,
              errcount: errcount1,
              src: src1,
              mock1: mock11,
              mock2: mock22,
              runday: day + hour,
              type: deviceType,
              lang: app.globalData.lang,
              jiarezu: jiarezu1
            })
            that.setData({
              imgList: ilist
            })
          }
        } catch (e) {
          console.log(e)
          var ilist = that.data.imgList
          if (that.finddevice(ilist, deviceNo)) {
            for (var i = 0; i < ilist.length; i++) {
              if (ilist[i].deviceNo === deviceNo) {
                ilist[i].deviceNo = deviceNo
                ilist[i].title = deviceNo
                ilist[i].runstate = "Error"
                that.setData({
                  imgList: ilist
                })
                wx.showModal({
                  title: that.data.content.list_prompt,
                  content: that.data.content.list_error1 + deviceNo + that.data.content.list_error2,
                  success(res) { }
                })
                break;
              }
            }
          } else {
            var ilist = that.data.imgList
            ilist.push({
              title: deviceNo,
              runstate: "Error",
              deviceNo: deviceNo,
              lang: app.globalData.lang
            })
          }
          that.setData({
            imgList: ilist
          })

        }
      }
    })
  },

})