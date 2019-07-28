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
    timerStates: true ,
    content: null,
    devices: map,
    mqttif: false,
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
          }, res.data * 1000)
        })
      }
    })
  }, 
  httptimer:function(){
    var that=this
    wx.getStorage({
      key: 'deviceList',
      success(res) { 
        if (res.data.length == 0) {
          // wx.showToast({
          //   title: that.data.content.list_listnull,
          //   icon: 'none',
          //   duration: 2000
          // })
          return;
        }
        var httplist = res.data
        var imglist = []
        for (var i = 0; i < httplist.length; i++) {
          if (httplist[i].type == 2) {
            httplist.splice(i, 1);
          }
        }
        that.getdata(httplist, 0);
      }
    })
    that.errorLing();
  },
  onHide: function () {
  },
  longTap: function (e) {
    var that = this;
    that.setData({
      ifName: true,
      lock: true,
      deviceNo: e.currentTarget.dataset.id
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
    var device = map.get(deviceNo)
    //var device = this.data.devices.get(deviceNo)
    app.globalData.device = device
    //检查锁
    if (this.data.lock) {
      return;
    } else {
      wx.navigateTo({
        url: "/pages/deviceDetail/deviceDetail?deviceNo=" + deviceNo + "&imgstyle=" + imgstyle + "&control=" + control + "&title=" + title + "&type=" + type,
      })
    }
  },
  rename: function (e) {
    var that = this;
    that.setData({
      ifrename: true,
      ifName: false,
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
            // that.unSubTopic(deviceList[i].mqttName)
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
    var deviceList = []
    
    wx.getStorage({
      key: 'deviceList',
      success(res) {
        deviceList = res.data
        for (var i = 0; i < deviceList.length; i++) {
          if (deviceList[i].deviceNo === that.data.deviceNo) {
            deviceList.push({
              deviceNo: deviceList[i].deviceNo,
              deviceName: that.data.deviceTitle,
              deviceType: deviceList[i].deviceType,
              imgstyle: deviceList[i].imgstyle
            })
            deviceList.splice(i, 1);
            break;
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
            that.onLoad();
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
        deviceList = res.data

        wx.hideLoading()
        for (var i = 0; i < deviceList.length; i++) {
          if (deviceList[i].deviceNo === that.data.deviceNo) {
            deviceList.push({
              deviceNo: deviceList[i].deviceNo,
              deviceName: deviceList[i].deviceName,
              deviceType: deviceList[i].deviceType,
              imgstyle: 1
            });
            deviceList.splice(i, 1);
            break;
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
    wx.showLoading({
      title: that.data.content.list_refresh,
    })
    wx.getStorage({
      key: 'deviceList',
      success(res) {
        deviceList = res.data
        wx.hideLoading()
        for (var i = 0; i < deviceList.length; i++) {
          if (deviceList[i].deviceNo === that.data.deviceNo) {
            deviceList.push({
              deviceNo: deviceList[i].deviceNo,
              deviceName: deviceList[i].deviceName,
              deviceType: deviceList[i].deviceType,
              imgstyle: 0
            });
            deviceList.splice(i, 1);
            break;
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

  onLoad: function (options) {
    var that = this;
    if (app.globalData.lang === 'zh-cn') {
      var chinese = require("../../utils/Chinses.js")
      that.setData({
        content: chinese.Content
      })
      wx.setTabBarItem({
        index: 0,
        text: '设备',
        iconPath: 'images/tab_activity.png',
        selectedIconPath: 'images/tab_activity_selected.png'
      }),
        wx.setTabBarItem({
          index: 1,
          text: '主页',
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
      var english = require("../../utils/English.js")
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
        var ifmqtt=false
        for (var i = 0; i < httplist.length; i++) {
          if (httplist[i].type==2){
            ifmqtt=true
          }
          imglist.push({ title: httplist[i].deviceNo, runstate: that.data.content.list_runstate, deviceNo: httplist[i].deviceNo, imgstyle: 0, errcount: 0, src: '', runday: '', type: '', lang: app.globalData.lang, jiarezu: 0 })
        }
        that.setData({
          imgList: imglist,
          mqttif: ifmqtt
        })
      }
    })
    that.timer(); 
    that.httptimer()
    app.globalData.callBack[0] = function (t, m) {
      console.log('列表页收到数据：' + t + ':=' + m);
      that.getmqttdata(t, m)
    }
    if(that.data.mqttif){
      getApp().conmqtt().then(function () {
        wx.getStorage({
          key: 'deviceList',
          success(res) {
            var mqttlist = res.data
            for (var i = 0; i < mqttlist.length; i++) {
              if (mqttlist[i].type == 2) {
                that.subTopic(mqttlist[i].mqttName)
              }
            }
          }
        })
      })
    }
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
    if (client.connected) {
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
    that.httptimer()
    that.setData({
      timerStates: true
    })
  }, 
  getDeviceFromBytes(deviceNo,deviceType,data){
    var that = this;
    let d = app.globalData.deviceAdapter.getSdcSoftDevice(deviceType, new Uint8Array(data))
    map.set(deviceNo,d)
    return d
  },
  getdata(deviceNos, index) {
    var that = this;
    if (index == deviceNos.length) {
      return;
    }
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
    var deviceno = deviceNos[index].deviceNo
    if (deviceNos[index].type==1) {
      var title1 = ''
      var deviceType = ''
      var runstate1 = ''
      var src1 = ''
      var errcount1 = 0
      if (deviceNos[index].deviceName == '') {
        title1 = deviceNos[index].deviceNo
      } else {
        title1 = deviceNos[index].deviceName
      }
      var imgstyle1 = deviceNos[index].imgstyle
      wx.getStorage({
        key: 'deviceList',
        success(res) {
          var deviceList = res.data
          for (var i = 0; i < deviceList.length; i++) {
            if (deviceList[i].deviceNo === deviceno) {
              deviceType = deviceList[i].deviceType
              break;
            }
          }
          wx.request({
            url: 'https://apis.sdcsoft.com.cn/wechat/device/getdata',
            data: {
              deviceNo: deviceno,
            },
            method: 'GET',
            header: {
              "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
            },
            responseType: 'arraybuffer',
            success: function (res) {
              if (res.data.byteLength == 0) {
                var ilist = that.data.imgList
                if (that.finddevice(ilist, deviceno)) {
                  for (var i = 0; i < ilist.length; i++) {
                    if (ilist[i].deviceNo === deviceno) {
                      ilist[i].deviceNo = deviceno
                      ilist[i].title = deviceno
                      ilist[i].runstate = that.data.content.list_runstate
                      ilist[i].imgstyle = imgstyle1
                      ilist[i].errcount = errcount1
                      ilist[i].src = src1
                      ilist[i].mock1 = ""
                      ilist[i].mock2 = ""
                      that.setData({
                        imgList: ilist
                      })
                      break;
                    }
                  }
                }else{
                  ilist.push({ title: deviceno, runstate: that.data.content.list_runstate, deviceNo: deviceno, imgstyle: imgstyle1})
                  that.setData({
                    imgList: ilist
                  })
                }
              }
              else {
                try { 
                  let data = that.getDeviceFromBytes(deviceno, deviceType, res.data)
                  console.log(data)
                  if (data.getTypeName() == deviceType) {
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
                        jiarezu1 = data.getDeviceFocusFields()[index].valueString
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
                    var ilist = that.data.imgList
                    if (that.finddevice(ilist, deviceno)) {
                      for (var i = 0; i < ilist.length; i++) {
                        if (ilist[i].deviceNo === deviceno) {
                          ilist[i].deviceNo = deviceno
                          ilist[i].title = title1
                          ilist[i].runstate = runstate1
                          ilist[i].imgstyle = imgstyle1
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
                      ilist.push({ title: title1, runstate: runstate1, deviceNo: deviceno, imgstyle: imgstyle1, errcount: errcount1, src: src1, mock1: mock11, mock2: mock22, runday: day + hour, type: deviceType, lang: app.globalData.lang, jiarezu: jiarezu1 })
                      that.setData({
                        imgList: ilist
                      })
                    }
                  }
                  
                } catch (e) {
                  console.log(e)
                  var ilist = that.data.imgList
                  if (that.finddevice(ilist, deviceno)) {
                    for (var i = 0; i < ilist.length; i++) {
                      if (ilist[i].deviceNo === deviceno) {
                        if (ilist[i].runstate != "Error") {
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
                            success(res) {
                            }
                          })
                        }
                        break;
                      }
                    }
                  }else{
                    var ilist = that.data.imgList
                    ilist.push({ title: deviceno, runstate: "Error", deviceNo: deviceno, lang: app.globalData.lang })
                  }
                  that.setData({
                    imgList: ilist
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
            imgstyle1 = deviceList[i].imgstyle
            deviceNo = deviceList[i].deviceNo
            if (deviceList[i].deviceName === '') {
              title1 = deviceList[i].deviceNo
            } else {
              title1 = deviceList[i].deviceName
            }
            break;
          }
        }
        try{
          var databyte = new Uint8Array(byte)
          let data = that.getDeviceFromBytes(deviceNo, deviceType, databyte)
          console.log(data);
          // data.getMockFields().each((key, value) => {
          //   console.log('title:=' + value.getTitle() + ' value:=' + value.getValueString());
          // });
          if (data == null) {
            title1: deviceNo,
              runstate1 = that.data.content.list_runstate,
              deviceNo = deviceNo,
              imgstyle = 0,
              errcount1 = 0,
              src1 = '',
              mock1 = ''
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
                jiarezu1 = data.getDeviceFocusFields()[index].valueString
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
                ilist[i].imgstyle = imgstyle1
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
            ilist.push({ title: title1, runstate: runstate1, deviceNo: deviceNo, imgstyle: imgstyle1, errcount: errcount1, src: src1, mock1: mock11, mock2: mock22, runday: day + hour, type: deviceType, lang: app.globalData.lang, jiarezu: jiarezu1 })
            that.setData({
              imgList: ilist
            })
          }
        } catch(e) {
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
                  content: that.data.content.list_error1 + deviceno + that.data.content.list_error2,
                  success(res) {
                  }
                })
                break;
              }
            }
          } else {
            var ilist = that.data.imgList
            ilist.push({ title: deviceNo, runstate: "Error", deviceNo: deviceNo, lang: app.globalData.lang })
          }
          that.setData({
            imgList: ilist
          })
          
          }
      }
    })
  },
  // onShow: function () {
  //   var that = this
  //   that.errorLing();
  //   wx.getStorage({
  //     key: 'deviceList',
  //     success(res) {
  //       if (res.data.length == 0) {
  //         wx.showToast({
  //           title: '设备列表为空！请在主页添加设备',
  //           icon: 'none',
  //           duration: 2000
  //         })
  //         return;
  //       } else {
  //         app.connmqtt();
  //         var deviceList = res.data
  //         var client = app.globalData.client;
  //         console.log("555")
  //         // for (var i = 0; i < deviceList.length; i++) {
  //         //   that.subTopic(deviceList[i].mqttName)
  //         // }
  //         if (client == null) {
  //           wx.showLoading({
  //             title: '正在获取...',
  //           })
  //           var timeOut = setTimeout(function () {
  //             for (var i = 0; i < deviceList.length; i++) {
  //               that.subTopic(deviceList[i].mqttName)
  //             }
  //             wx.navigateBack()
  //             wx.hideLoading()
  //           }, 8000)
  //         }
  //       }
  //     }
  //   })
  //   app.globalData.callBack[0] = function (t, m) {
  //     console.log('列表页收到数据：' + t + ':=' + m);
  //     that.getdata(t.substr(5, 2) + t.substr(8, 3) + t.substr(12, 5), m)
  //   }
  // },
  // getdata(deviceNos, index) {
  //   console.log(deviceNos)
  //   var that = this;
  //   if (index == deviceNos.length) {
  //     return;
  //   }
  //   var runstate = 'imgList[' + index + '].runstate'
  //   var title = 'imgList[' + index + '].title'
  //   var deviceNo = 'imgList[' + index + '].deviceNo'
  //   var src = 'imgList[' + index + '].src'
  //   var mock1 = 'imgList[' + index + '].mock1'
  //   var mock2 = 'imgList[' + index + '].mock2'
  //   var mock3 = 'imgList[' + index + '].mock3'
  //   var errcount = 'imgList[' + index + '].errcount'
  //   var imgstyle = 'imgList[' + index + '].imgstyle'
  //   var runday = 'imgList[' + index + '].runday'
  //   var jiarezu = 'imgList[' + index + '].jiarezu'
  //   var control = 'imgList[' + index + '].control'
  //   var type = 'imgList[' + index + '].type'
  //   var lang = 'imgList[' + index + '].lang'
  //   var deviceno = deviceNos[index].deviceNo
  //   if (deviceNos[index].type == 1) {
  //     var title1 = ''
  //     var deviceType = ''
  //     var runstate1 = ''
  //     var src1 = ''
  //     var errcount1 = ''
  //     if (deviceNos[index].deviceName == '') {
  //       title1 = deviceNos[index].deviceNo
  //     } else {
  //       title1 = deviceNos[index].deviceName
  //     }
  //     var imgstyle1 = deviceNos[index].imgstyle
  //     wx.getStorage({
  //       key: 'deviceList',
  //       success(res) {
  //         var deviceList = res.data
  //         for (var i = 0; i < deviceList.length; i++) {
  //           if (deviceList[i].deviceNo === deviceno) {
  //             deviceType = deviceList[i].deviceType
  //             break;
  //           }
  //         }
  //         wx.request({
  //           url: 'https://app.weixin.sdcsoft.cn/device/getdata',
  //           data: {
  //             deviceNo: deviceno,
  //           },
  //           method: 'GET',
  //           header: {
  //             "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
  //           },
  //           responseType: 'arraybuffer',
  //           success: function (res) {
  //             if (res.data.byteLength == 0) {
  //               that.setData({
  //                 [title]: deviceno,
  //                 [runstate]: that.data.content.list_runstate,
  //                 [deviceNo]: deviceno,
  //                 [imgstyle]: imgstyle1,
  //                 [errcount]: errcount1,
  //                 [src]: ''
  //               })
  //               return
  //             }
  //             else {
  //               let data = that.getDeviceFromBytes(deviceno, deviceType, res.data)
  //               var errorList = []
  //               for (var index in data.getExceptionFields().map) {
  //                 errorList.push({
  //                   deviceNo: deviceNo,
  //                   title: data.getExceptionFields().map[index].title
  //                 })
  //               }
  //               that.setData({
  //                 errorNewList: that.data.errorNewList.concat(errorList)
  //               })
  //               var day = ''
  //               var hour = ''
  //               var jiarezu1 = ''
  //               var mock11 = ''
  //               var mock22 = ''
  //               for (var index in data.getBaseInfoFields().map) {
  //                 if (data.getBaseInfoFields().map[index].name === "o_system_status") {
  //                   runstate1 = data.getBaseInfoFields().map[index].valueString
  //                 }
  //               }

  //               for (var index in data.getDeviceFocusFields()) {
  //                 if (data.getDeviceFocusFields()[index].name === "jia_re_zu_count") {
  //                   jiarezu1 = data.getDeviceFocusFields()[index].valueString
  //                 }
  //                 if (data.getDeviceFocusFields()[index].name === "ba_yunxingtianshu") {
  //                   day = data.getDeviceFocusFields()[index].valueString
  //                 }
  //                 if (data.getDeviceFocusFields()[index].name === "ba_yunxingxiaoshishu") {
  //                   hour = data.getDeviceFocusFields()[index].valueString
  //                 }
  //               }

  //               for (var index in data.getMockFields().map) {
  //                 if (mock11 === "") {
  //                   mock11 = data.getMockFields().map[index].title + ":" + data.getMockFields().map[index].valueString
  //                   continue;
  //                 }
  //                 if (mock22 === "") {
  //                   mock22 = data.getMockFields().map[index].title + ":" + data.getMockFields().map[index].valueString
  //                   break;
  //                 }
  //               }
  //               errcount1 = errorList.length,
  //                 src1 = 'http://www.sdcsoft.com.cn/app/gl/animation/animation/stove/' + data.getStoveElement().getElementPrefixAndValuesString().substr(0, 8) + imgstyle1 + data.getStoveElement().getElementPrefixAndValuesString().substr(9, 2) + '.gif'
  //             }

  //             that.setData({
  //               [lang]: app.globalData.lang,
  //               [jiarezu]: jiarezu1,
  //               [title]: title1,
  //               [runstate]: runstate1,
  //               [deviceNo]: deviceno,
  //               [imgstyle]: imgstyle1,
  //               [errcount]: errcount1,
  //               [src]: src1,
  //               [mock1]: mock11,
  //               [mock2]: mock22,
  //               [runday]: day + hour,
  //               [type]: deviceType
  //             })
  //           }
  //         })
  //       }
  //     })

  //   }
  //   index++
  //   that.getdata(deviceNos, index)
  // }, 
})