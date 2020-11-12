const app = getApp();
let deviceMap = new Map()
let client =null
import req from '../../../utils/Request.js'
import mqtt from '../../../libs/mqtt.js'
import { SdcSoftClient } from '../../../libs/index.js'

Page({
  data: {
    imgList: [],
    errorOldList: [],
    errorNewList: [],
    opend: '',
    ifName: false,
    lock: false,
    updateLock: false,
    ifstyle: false,
    ifdelete: false,
    deviceTitle: '',
    deviceNo: '',
    timer: '',
    timerStates: true,
    content: null,
    mqttif: false,
    userType: null,
    version: null,
    ifversion: false,
  },
   mqttConn: function () {
    return new Promise(function (resolve, reject) {
      wx.login({
        success: function (res) {
          wx.showLoading({title: '正在加载…'})
          wx.request({
            //获取openid接口  
            url: 'https://apis.sdcsoft.com.cn/wechat/device/getopenid',
            data: {
              js_code: res.code,
            },
            method: 'GET',
            success: function (res) {
              var openId = res.data.openid
              console.log(openId)
              client = new SdcSoftClient(mqtt, "wxs://skt.sdcsoft.cn", "8084", 'sdcsoft.com.cn', '80201288@qq.com', openId)
              app.globalData.client = client
              app.globalData.openId = openId
              //添加客户端错误事件响应
              client.OnError = function (err) {
                console.log(err)
              }
              //添加连接成功的事件响应操作
              client.OnConnect = function (pt) {
                wx.hideLoading()
                resolve("200")
              }
              //添加掉线事件响应
              client.OnOffine = function (connect) {
                console.log('连接断开')
                //重新连接
                connect.Connect()
              }
              //添加手动断线事件响应
              client.OnClose = function (connect) {
                console.log('关闭连接')
                //重新连接
                connect.Connect()
              }
              client.Connect()
            
            }
          })
        }
      })

    })
  },

  longTap: function (e) {
    var that = this;
    that.setData({
      ifName: true,
      lock: true,
      deviceNo: e.currentTarget.dataset.id,
      timerStates: false,
    })
  },
  closeTap: function (e) {
    var that = this;
    that.setData({
      ifName: false,
      lock: false,
      timerStates: true,
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
    var device = deviceMap.get(deviceNo)
    var newFrame = e.currentTarget.dataset.newframe
    var dataMapId = e.currentTarget.dataset.datamapid
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
      timerStates: true,
    })
  },
  yesdelete: function (e) {
    var that = this
    var deviceList = []
    var client = app.globalData.client;
    client.removeMessageListener(that.data.deviceNo).then(function(){
      console.log("0233333333"+'取消成功！')
      })
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
              timerStates: true,
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
              timerStates: true,
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
              timerStates: true,
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
              timerStates: true,
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
      timerStates: true,
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
  updateData: function (e) {
    var that = this;
    wx.showLoading({
      title: 'Loading',
    })
    that.updateList().then(function () {
      that.mqttInit()
      that.setData({
        updateLock: true
      })
    })
      
  },
  updateList: function (e) {
    return new Promise(function (resolve, reject) {
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
                  if (res.data.data.length == 0) {
                    return;
                  } else {
                    var deviceList = res.data.data
                    for(var i in deviceList){
                      var deviceNo =deviceList[i].deviceNo
                      req.get('https://apis.sdcsoft.com.cn/webapi/output/decoder/decode', {
                  deviceNo: deviceNo,
                    }, {
                      'content-type': 'application/x-www-form-urlencoded'
                    }).then(res => {
                      var dataMapId=null;
                      if (res.data.data.deviceDataMapCn) {
                        dataMapId = res.data.data.deviceDataMapCn;
                      } 
                      if (res.data.data.deviceDataMapEn) {
                        dataMapId = res.data.data.deviceDataMapEn;
                      } 
                      var device={dataMapId:dataMapId,deviceNo:res.data.data.deviceSuffix};
                    
                      return device
                    }).then(device => {
                      if (device.dataMapId!=null) {
                        req.get('https://apis.sdcsoft.com.cn/wechat/DeviceDataMap/get', {id:device.dataMapId}, {
                          'content-type': 'application/x-www-form-urlencoded'
                        }).then(res => {
                          let map= JSON.parse(res.data.data.deviceDataMap)
                          let addr = JSON.parse(res.data.data.pointIndexMap)
                          
                            for(var k in deviceList){
                              if(deviceList[k].deviceNo==device.deviceNo){
                                deviceList.splice(k,1)
                                deviceList.push({
                                  map: map,
                                  addr: addr,
                                  dataMapId: device.dataMapId,
                                  deviceNo: device.deviceNo,
                                  deviceName: '',
                                  imgStyle: 0
                                });
                                wx.setStorage({
                                  key: 'deviceList',
                                  data: deviceList,
                                  success: function (res) {
                                    resolve(deviceList)
                                  }
                                })
                              }
                            }
                        })
                      }
                    })
          
                    }
                    wx.hideLoading();
                  }
                }
              })
            }
          })
        }
      })
    })
  },

  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'deviceList',
      fail(res) {
        console.log(res)
      },
      success(res) {
        var httplist = res.data
        if (res.data.length == 0) {
          that.updateData()
          console.log("123")
        } else {
          var ilist = []
          for (var i in httplist) {
            ilist.push({
              title: httplist[i].deviceNo,
              runstate: "未连接",
              deviceNo: httplist[i].deviceNo,
              imgStyle: 0,
              simTitle: ""
            })
          }
          that.setData({
            imgList: ilist
          })
          wx.getStorage({
            key: 'version',
            success(res) {
             var version= res.data
              wx.request({
                url: 'https://apis.sdcsoft.com.cn/wechat/iccid/version',
                method: "Get",
                data: {
                },
                success: function (res) {
                  console.log(res)
                    if(res.data!=version){
                      wx.showToast({
                        title: '当前小程序版本为：'+version+"，请更新至最新版本："+res.data,
                        icon: 'none',
                        duration: 5000,
                        mask: true
                      })
                    }
                 
                }
              })
              if (res.data != "2.6.0") {
                that.setData({
                  ifversion: true,
                  updateLock: true,
                  version: "2.6.0"
                })
                wx.setStorageSync('version', "2.6.0")
                that.updateData()
              }else{
                that.mqttInit()
              }
            },
            fail(res) {
              wx.setStorageSync('version', "2.6.0")
              that.setData({
                ifversion: true,
                version: "2.6.0"
              })
            },
          })
       
        }
      }
    })
    that.errorLing();


    wx.getStorage({
      key: 'roleType',
      success(res) {
        if (res.data == 1) {
          wx.switchTab({
            url: '../deviceList/deviceList'
          })
        }
        if (res.data == 2) {
          wx.navigateTo({
            url: '../../customer/pages/index/index'
          })
        }
      },
      fail(res) {
        wx.setStorageSync('roleType', "1")
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

    if(that.data.updateLock){
      that.mqttInit()
    }
    
    // wx.getStorage({
    //   key: 'deviceList',
    //   success(res) {
    //     var mqttlist = res.data
    //     getApp().conmqtt().then(function () {
    //       let client = app.globalData.client;
    //       for (var i = 0; i < mqttlist.length; i++) {
    //         var deviceNo=mqttlist[i].deviceNo
    //         client.addMessageListener(deviceNo, (deviceno, msg) => {
    //          that.getdata(deviceno,msg,mqttlist)
    //         })
    //       }
    //     })
    //   }
    // })
    wx.getStorage({
      key: 'deviceList',
      success(res) {
        var list = res.data
        console.log(list.length)
       
        that.getSimStatus(list, 0)
      }
    })
    wx.getStorage({
      key: 'roleType',
      success(res) {
        if (res.data != 1) {
          wx.setStorageSync('roleType', 1)
        }
      },
      fail(res) {
        wx.setStorageSync('roleType', "1")
      },
    })
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
    that.setData({
      timerStates: true
    })
 


  },
 
  mqttInit:function (){
    var that= this
   
   if(client){
    wx.getStorage({
      key: 'deviceList',
      success(res) {
        var mqttlist = res.data
        console.log(mqttlist)
        for (var i = 0; i < mqttlist.length; i++) {
          var deviceNo=mqttlist[i].deviceNo
          client.addMessageListener(deviceNo, (deviceno, msg) => {
           that.getdata(deviceno,msg,mqttlist)
          }).then(function(){
                console.log(deviceNo+'监听成功！')
            })
        }
      }
    })
   }else{
    that.mqttConn().then(function () {
      wx.getStorage({
        key: 'deviceList',
        success(res) {
          var mqttlist = res.data
          console.log("888",mqttlist)
          for (var i = 0; i < mqttlist.length; i++) {
            var deviceNo=mqttlist[i].deviceNo
            client.addMessageListener(deviceNo, (deviceno, msg) => {
             that.getdata(deviceno,msg,mqttlist)
            }).then(function(){
                  console.log(deviceNo+'监听成功！')
              })
          }
        }
      })
    })
   }
   
   
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
  getdata(deviceNo,bytes,mqttlist) {
    var that = this
    let map = null
    let addr = null
    var runday = ''
    var jiarezu = ''
    var dataMapId= ''
    var simTitle = ''
    var deviceno = deviceNo
    var title1 = ''
    var runstate1 = ''
    var src1 = ''
    var errcount1 = 0
    for (var i = 0; i < mqttlist.length; i++) {
      if (mqttlist[i].deviceNo === deviceNo) {
         map = mqttlist[i].map
         addr = mqttlist[i].addr
         dataMapId= mqttlist[i].dataMapId
         var imgstyle1 = mqttlist[i].imgStyle
         if (mqttlist[i].deviceName == '' || mqttlist[i].deviceName == null) {
          title1 = mqttlist[i].deviceNo
        } else {
          title1 = mqttlist[i].deviceName + "-" + mqttlist[ilist].deviceNo
        }
      }
    }
  
      try {
          app.globalData.adapter.Init(map, addr)
          console.log(new Uint8Array(bytes))
          app.globalData.adapter.handlerData(new Uint8Array(bytes))
          let device = app.globalData.adapter.Device
        
          deviceMap.set(deviceNo,device)
          console.log(device)
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

          if (device.Run != null) {
            if (device.Run.name != "") {
              runday = device.Run.name + ":" + device.Run.vstr
            }
          }
        
          if (device.status) {
            runstate1 = "-" + device.status.vstr
          }
          console.log(device.getStoveElements())
          if (device.getStoveElements().length > 0) {
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
                ilist[i].runstate = runstate1
                ilist[i].imgStyle = imgstyle1
                ilist[i].errcount = errcount1
                ilist[i].src = src1
                ilist[i].mock1 = mock11
                ilist[i].mock2 = mock22
                ilist[i].runday = runday
                ilist[i].lang = app.globalData.lang
                ilist[i].jiarezu = jiarezu
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
              runstate: "-" + runstate1,
              deviceNo: deviceno,
              imgStyle: imgstyle1,
              errcount: errcount1,
              src: src1,
              mock1: mock11,
              mock2: mock22,
              runday:runday,
              lang: app.globalData.lang,
              jiarezu: jiarezu,
              simTitle: simTitle,
              dataMapId: dataMapId
            })
            that.setData({
              imgList: ilist
            })
          }
      } catch (e) {
        console.log(e)
        var ilist = that.data.imgList
          if (that.finddevice(ilist, deviceno)) {
            for (var i = 0; i < ilist.length; i++) {
              if (ilist[i].deviceNo === deviceno) {
                if (ilist[i].runstate != "-Error") {
                  ilist[i].deviceNo = deviceno
                  ilist[i].title = deviceno
                  ilist[i].runstate = "-" + "Error"
                  ilist[i].error = 1
                  ilist[i].mock1 = ''
                  ilist[i].mock2 = ''
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
      }
  },


})