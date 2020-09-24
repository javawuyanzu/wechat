const app = getApp();
var wxCharts = require('../../../utils/wxcharts.js');
var lineChart = null;
var startPos = null;
import {
  DateUtil
} from '@sdcsoft/utils'

import {
  GroupKeys
} from '@sdcsoft/comms'
var gfrm = require('@sdcsoft/gfrm');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    date: '00:00',
    exRecord: false,
    imgstyle: '',
    deviceNo: '',
    src: '',
    errorList: [],
    baseInfoMap: [],
    mockInfoMap: [],
    exceptionInfoMap: [],
    deviceInfoMap: [],
    settingInfoMap: [],
    weeksettingMap: [],
    startstoptimeMap: [],
    switchquantityMap: [],
    bengAnimationList: [],
    fanAnimationList: [],
    fireList:[],
    bengList: [],
    fanList: [],
    runInfoMoList: [],
    timer: '',
    timerStates: true,
    // 展开折叠
    selectedFlag: [false, false, false, false, false, false, false, false, false],
    navbar: [],
    currentTab: 0,
    control: false,
    havedata: true,
    report: false,
    ifedit: false,
    placeholder: '',
    controlList: [],
    showList: [],
    inputmin: 0,
    inputmax: 0,
    inputvalue: 0,
    inputValue: '',
    index: -1,
    mockKey:"",
    index1: -1,
    zuotian: "",
    qiantian: "",
    daqiantian: "",
    tian: -1,
    deviceType: '',
    systemStateCategories: ["2018-0405", "2018-0405"],
    systemStateData: [1, 2],
    mockList: [],
    mock1: null,
    mock1Name: "",
    zuotianList: [],
    qiantianList: [],
    daqiantianList: [],
    content: null,
    lang: '',
    jiarezu: null,
    mqttname: "",
    runinfoMenu: -1,
    payMenu: -1,
    exceptionMenu: -1,
    reportMenu: -1,
    controlMenu: -1,
    smsMenu: -1,
    deviceword: -1,
    baseNavbar: [],
    media: -1,
    deviceSmsMapDueTime: "",
    deviceSmsMapDueMoble: null,
    deviceSmsMapId: 0,
    downloadFile: [
    ],
    mockType:"",
  },
  savefiles(e) {
    var that = this
    const fileName = e.currentTarget.dataset.file;   //获取页面要下载的文件名
    const url = e.currentTarget.dataset.url;
    const idx = e.currentTarget.dataset.idx;
    let $this = this;
    var fileType = fileName.substr(fileName.indexOf('.') + 1, fileName.length)
    wx.showLoading({
      title: "正在下载...",
    })
    wx.downloadFile({
      url: url,
      success: (res) => {
        var filePath = res.tempFilePath;
        let manager = wx.getFileSystemManager();  //获取全局唯一的文件管理器
        //判断目录是否存在
        manager.access({
          path: `${wx.env.USER_DATA_PATH}/download`,
          success: (res) => {
            console.log('已存在path对应目录', res)
            //保存文件之前查看是否存在此文件  
            manager.access({
              path: `${wx.env.USER_DATA_PATH}/download/${fileName}`,
              success(res) {
                wx.openDocument({
                  filePath: `${wx.env.USER_DATA_PATH}/download/${fileName}`,
                  fileType: fileType,
                  success: (res) => {
                    wx.hideLoading()
                    console.log('读取成功', res)
                  },
                  fail: (err) => {
                    console.log('读取失败', err)
                  }
                })
                return false;
              },
              fail(err) {
                console.log('不存在此文件')
                var downloadFile = that.data.downloadFile
                downloadFile[idx].path = `${wx.env.USER_DATA_PATH}/download/${fileName}`
                that.setData({
                  downloadFile: downloadFile
                })

                manager.saveFile({
                  tempFilePath: filePath,     //filePath为保存到本地的临时路径
                  filePath: `${wx.env.USER_DATA_PATH}/download/${fileName}`,
                  success: (res) => {
                    wx.openDocument({
                      filePath: `${wx.env.USER_DATA_PATH}/download/${fileName}`,
                      fileType: fileType,
                      success: (res) => {
                        wx.hideLoading()
                        console.log('读取成功', res)
                      },
                      fail: (err) => {
                        console.log('读取失败', err)
                      }
                    })
                  },
                  fail: (err) => {
                    console.log(err)
                  }
                })
              }
            })
          },
          fail: (err) => {
            console.log(err, '本地缓存为空')
            //创建保存文件的目录
            manager.mkdir({
              dirPath: `${wx.env.USER_DATA_PATH}/download`,
              recursive: false,
              success: (res) => {
                //将临时文件保存到目录  /download
                var downloadFile = that.data.downloadFile
                downloadFile[idx].path = `${wx.env.USER_DATA_PATH}/download/${fileName}`
                that.setData({
                  downloadFile: downloadFile
                })

                manager.saveFile({
                  tempFilePath: filePath,
                  filePath: `${wx.env.USER_DATA_PATH}/download/${fileName}`,
                  success: (res) => {
                    wx.openDocument({
                      filePath: `${wx.env.USER_DATA_PATH}/download/${fileName}`,
                      fileType: fileType,
                      success: (res) => {
                        wx.hideLoading()
                        console.log('读取成功', res)
                      },
                      fail: (err) => {
                        console.log('读取失败', err)
                      }
                    })
                  },
                  fail: (err) => {
                    console.log(err)
                  }
                })
              },
              fail: (err) => {
                console.log(err,)
              }
            })
          }
        })
      },
      fail: (err) => {
        console.log(err, "下载失败")
      }
    })
  },

  switchChange: function (e) {
    var that = this
    var state = -1;
    if (e.detail.value) {
      state = 2
    } else {
      state = 1
    }
    let cList = []
    cList = that.data.controlList
    let temp = cList[e.currentTarget.dataset.index][e.currentTarget.dataset.index1];
    temp.setValue(state)
    that.setData({
      controlList: cList,
      'inputValue': ''
    })
  },

  inputMoble: function (e) {
    var that = this
    that.setData({
      deviceSmsMapDueMoble: e.detail.value
    });
  },
  editData: function (e) {
    var that = this;
    that.setData({
      ifedit: true,
      index: e.currentTarget.dataset.index,
      index1: e.currentTarget.dataset.index1,
      inputmin: e.currentTarget.dataset.min,
      inputmax: e.currentTarget.dataset.max,
      placeholder: that.data.content.detail_pl1 + e.currentTarget.dataset.min + '-' + e.currentTarget.dataset.max + that.data.content.detail_pl2,
    })
  },
  cancel: function (e) {
    var that = this;
    that.setData({
      ifedit: false,
      'inputValue': ''
    })
  },
  dName: function (e) {
    var that = this;
    this.setData({
      inputvalue: e.detail.value
    })
  },
  confirm: function (e) {
    var that = this;
    if (that.data.inputmax < that.data.inputvalue || that.data.inputmin > that.data.inputvalue) {
      wx.showToast({
        title: that.data.content.detail_pl1 + that.data.inputmin + '-' + that.data.inputmax + that.data.content.detail_pl2,
        icon: 'none',
        duration: 2000
      })
    } else {
      let cList = []
      cList = that.data.controlList
      //console.log(cList)
      let temp = cList[that.data.index][that.data.index1];

      temp.setValue(parseFloat(that.data.inputvalue))
      // cList[index].splice(that.data.index, 1);
      // cList[index].push(temp)
      that.setData({
        controlList: cList,
        ifedit: false,
        'inputValue': ''
      })
    }

  },
  editMoble: function () {
    var that = this
    if (that.data.deviceSmsMapDueMoble == null) {
      wx.showToast({
        title: "手机号不能为空",
        icon: 'none',
        duration: 2000
      });
      return
    }
    wx.request({
      url: 'https://apis.sdcsoft.com.cn/wechat/Relation_DeviceSmsMap/modify',
      method: "POST",
      data: {
        employeeMobile: that.data.deviceSmsMapDueMoble,
        id: that.data.deviceSmsMapId,
      },
      success: function (res) {
        console.log(res)
        if (res.statusCode) {
          wx.showToast({
            title: that.data.content.detail_zhixing,
            icon: 'success',
            duration: 2000
          });
        }
      }
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  str2ab: function (str) {
    var buf = new ArrayBuffer(str.length * 2)
    var bufView = new Uint16Array(buf)
    for (let i = 0; i < str.length; i++) {
      bufView[i] = str.charCodeAt(i)
    }
    return bufView;
  },
  //提交
  formSubmit: function (e) {
    var that = this
    let str = ''
    for (var i in that.data.controlList) {
      for (var commmd in that.data.controlList[i]) {
        str += that.data.controlList[i][commmd].getCommandString();
      }
    }
    
    if (that.data.media != 0 & that.data.media != 3) {
      wx.showToast({
        title: '当前锅炉类型不支持远程控制',
        icon: 'error',
        duration: 1000,
        mask: true
      })
      return
    }
    if (str != '') {
      if (that.data.deviceNo.substr(0, 2) == '20') {
        var strlist = [];
        var n = 2;
        for (var i = 0, l = str.length; i < l / n; i++) {
          var a = str.slice(n * i, n * (i + 1));
          strlist.push(a)
        }

        var strarray = new Uint8Array(strlist.length);
        for (let i = 0; i < strlist.length; i++) {
          strarray[i] = parseInt(strlist[i], 16)
        }

        var client = app.globalData.client;
        if (client.connected != null & client.connected) {
          var cmdName = "/Ctl/" + that.data.mqttname.substr(5, 16)
          console.log(str)
          client.publish(cmdName, str, function (err) {

            if (!err) {
              wx.showToast({
                title: '发布成功',
                icon: 'success',
                duration: 1000,
                mask: true
              })
            } else {
              wx.showToast({
                title: '发布失败',
                icon: 'error',
                duration: 1000,
                mask: true
              })
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
      } else {
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
                wx.request({
                  url: 'https://apis.sdcsoft.com.cn/wechat/device/sendcmd',
                  method: "GET",
                  data: {
                    command: str,
                    deviceSuffix: that.data.deviceNo,
                    userId: res.data.openid.substr(0, 10) + '_' + res.data.openid.substr(res.data.openid.length - 8, res.data.openid.length),
                  },
                  header: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
                  },
                  success: function (res) {
                    if (res.statusCode) {
                      wx.showToast({
                        title: that.data.content.detail_zhixing,
                        icon: 'success',
                        duration: 2000
                      });
                    }
                  }
                })
              }
            })

          }
        })
      }
      that.setData({
        currentTab: 0,
        timerStates: true,
      })

    }
    //console.log(that.data.controlList)
    console.log(str)
  },

  navbarTap: function (e) {
    var that = this
    that.setData({
      currentTab: e.currentTarget.dataset.idx
    })
    var menuName = e.currentTarget.dataset.name
    if (menuName == that.data.content.detail_controlMenu) {
      that.setData({
        timerStates: false,
      })
    }
    if (menuName == that.data.content.detail_runinfoMenu) {
      that.setData({
        timerStates: true,
      })
    }

    if (menuName == that.data.content.detail_reportMenu) {
      that.getreportdatabyday(that.data.mock1)
    }
    if (menuName == that.data.content.detail_deviceword) {
      wx.request({
        //获取openid接口  
        url: 'https://apis.sdcsoft.com.cn/webapi/docs/device',
        data: {
          deviceNo: that.data.deviceNo,
        },
        method: 'GET',
        success: function (res) {

          var list = res.data.data
          console.log(list)
          var files = []
          for (var i in list) {
            files.push({ file: list[i].fileName, path: "", url: "https://docs.sdcsoft.com.cn/gl/devices/" + that.data.deviceNo + "/" + list[i].fileName })
          }
          that.setData({
            downloadFile: files
          })
        }
      })
    }

    // if (menuName == that.data.content.detail_payMenu) {
    //   that.setData({
    //     currentTab: e.currentTarget.dataset.idx - 1
    //   })
    //   wx.navigateTo({
    //     url: '../payMenu/payMenu?deviceNo=' + that.data.deviceNo
    //   })
    // }
  },
  onHide: function () {
    app.globalData.callBack[1] = null
    this.setData({
      timerStates: false
    })
  },
  onUnload: function () {
    app.globalData.callBack[1] = null
    this.setData({
      timerStates: false
    })

  },
  chooseMenu: function (num) {
    var that = this;
    var list = that.data.baseNavbar
    if (num == 2) {
      list.push(that.data.content.detail_exceptionMenu)
      that.setData({
        exRecord: true
      })
    }
    if (num == 3) {
      list.push(that.data.content.detail_reportMenu)
    }
    if (num == 4) {
      list.push(that.data.content.detail_controlMenu)
    }
    if (num == 5) {
      list.push(that.data.content.detail_smsMenu)
    }

    if (num == 7) {
      list.push(that.data.content.detail_deviceword)
    }
    that.setData({
      navbar: list
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.showLoading({
      title: "loading...",
    })
    if (app.globalData.lang === 'zh-cn') {
      var chinese = require("../../../utils/Chinses.js")
      that.setData({
        content: chinese.Content,
        lang: 'zh-cn',
        baseNavbar: ['基本']
      })
    }
    if (app.globalData.lang === 'en-us') {
      var english = require("../../../utils/English.js")
      that.setData({
        content: english.Content,
        lang: 'en-us',
        baseNavbar: ['Run information']
      })
    }
    if (app.globalData.lang === 'en-us') {
      wx.request({
        //获取openid接口  
        url: 'https://apis.sdcsoft.com.cn/wechat/RoleResource/list',
        data: {
          openId: "guowai",
        },
        method: 'GET',
        success: function (res) {
          if (res.data.code == 0 & res.data.data.length > 0) {
            var list = res.data.data
            for (var i = 0; i < list.length; i++) {
              that.chooseMenu(list[i].resId)
            }
          } else {
            that.setData({
              navbar: that.data.baseNavbar
            })

          }
          var munuList = that.data.navbar
          for (var i in munuList) {
            var munu = munuList[i]
            if (munu == that.data.content.detail_runinfoMenu) {
              that.setData({
                runinfoMenu: i,
              })
            }
            if (munu == that.data.content.detail_payMenu) {
              that.setData({
                payMenu: i
              })
            }
            if (munu == that.data.content.detail_exceptionMenu) {
              that.setData({
                exceptionMenu: i
              })
            }
            if (munu == that.data.content.detail_reportMenu) {
              that.setData({
                reportMenu: i
              })
            }
            if (munu == that.data.content.detail_controlMenu) {
              that.setData({
                controlMenu: i,
              })
            }
            if (munu == that.data.content.detail_smsMenu) {
              that.setData({
                smsMenu: i
              })
            }

            if (munu == that.data.content.deviceword) {
              that.setData({
                deviceword: i
              })
            }
          }

        }
      })
    } else {
      wx.request({
        //获取openid接口  
        url: 'https://apis.sdcsoft.com.cn/wechat/RoleResource/find/deviceNo/openId',
        data: {
          deviceNo: options.deviceNo,
          openId: app.globalData.openid,
        },
        method: 'GET',
        success: function (res) {
          if (res.data.code == 0 & res.data.data.length > 0) {
            var currentTime = new Date();
            var list = res.data.data
            for (var i = 0; i < list.length; i++) {
              var dt = list[i].dueTime
              var format = dt.replace(/-/g, '/')
              var dt = new Date(Date.parse(format))
              if (currentTime < dt) {
                that.chooseMenu(list[i].resId)
              } else {
                wx.request({
                  //获取openid接口  
                  url: 'https://apis.sdcsoft.com.cn/wechat/RoleResource/wechat/remove',
                  data: {
                    id: list[i].id,
                  },
                  method: 'GET',
                  success: function (res) {
                    console.log(res)
                  }
                })
              }

            }
          } else {
            that.setData({
              navbar: that.data.baseNavbar
            })
            // if (that.data.navbar.length == 2) {
            //   that.setData({
            //     isHidden: true
            //   })
            // }
          }
          var munuList = that.data.navbar
          for (var i in munuList) {
            var munu = munuList[i]
            if (munu == that.data.content.detail_runinfoMenu) {
              that.setData({
                runinfoMenu: i,
              })
            }
            if (munu == that.data.content.detail_payMenu) {
              that.setData({
                payMenu: i
              })
            }
            if (munu == that.data.content.detail_exceptionMenu) {
              that.setData({
                exceptionMenu: i
              })
            }
            if (munu == that.data.content.detail_reportMenu) {
              that.setData({
                reportMenu: i
              })
            }
            if (munu == that.data.content.detail_controlMenu) {
              that.setData({
                controlMenu: i,
              })
            }
            if (munu == that.data.content.detail_smsMenu) {
              that.setData({
                smsMenu: i
              })
            }

            if (munu == that.data.content.detail_deviceword) {
              console.log(i)
              that.setData({
                deviceword: i
              })
            }
          }
        }
      })
    }
    wx.request({
      //获取openid接口  
      url: 'https://apis.sdcsoft.com.cn/wechat/Relation_DeviceSmsMap/find/deviceNo/openId',
      data: {
        deviceNo: options.deviceNo,
        openId: app.globalData.openid
      },
      method: 'GET',
      success: function (res) {
        console.log(res)
        that.setData({
          deviceSmsMapDueTime: res.data.data.dueTime.substr(0, 10),
          deviceSmsMapDueMoble: res.data.data.employeeMobile,
          deviceSmsMapId: res.data.data.id
        })
      }
    })
    if (options.newFrame == "true") {
      that.setData({
        detail_base: "基本信息",
        detail_wendu: "温度",
        detail_ex: "报警",
        detail_yali: "压力",
        detail_liuliang: "流量",
        detail_kaiguan: "开关",
        detail_shezhi: "设置",
        detail_shebei: "设备",
        detail_dingshi: "定时",
      })
    } else {
      var keylist = GroupKeys.getKeys();
      that.setData({
        detail_base: GroupKeys.getTitle(keylist[0]),
        detail_mock: GroupKeys.getTitle(keylist[1]),
        detail_ex: GroupKeys.getTitle(keylist[2]),
        detail_deviceinfo: GroupKeys.getTitle(keylist[3]),
        detail_deviceparameters: GroupKeys.getTitle(keylist[4]),
        detail_weeksetting: GroupKeys.getTitle(keylist[5]),
        detail_startstoptime: GroupKeys.getTitle(keylist[6]),
        detail_switchquantity: GroupKeys.getTitle(keylist[7]),
      })
    }
    that.setData({
      deviceNo: options.deviceNo,
      imgstyle: options.imgstyle,
      jiarezu: options.jiarezu,
      deviceType: options.type,
      dataMapId: options.dataMapId,
      newFrame: options.newFrame,
      zuotian: that.getDateStr(null, -1),
      qiantian: that.getDateStr(null, -2),
      daqiantian: that.getDateStr(null, -3)
    })
    if (!that.data.exRecord) {
      wx.getStorage({
        key: 'errorList',
        success(res) {
          var elist = []

          for (var i = 0; i < res.data.length; i++) {
            if (res.data[i].deviceNo == that.data.deviceNo) {
              elist.push(res.data[i])
            }
          }
          that.setData({
            errorList: elist
          })
        }
      })
    }
    wx.setNavigationBarTitle({
      title: options.title
    })
    if (options.deviceNo.substr(0, 2) != '20') {
      that.timer();
    } else {
      that.setData({
        mqttname: "/Msg/" + options.deviceNo.substr(0, 2) + "/" + options.deviceNo.substr(2, 3) + "/" + options.deviceNo.substr(5, 5)
      })
      that.dataparse(app.globalData.device)
      app.globalData.callBack[1] = function (t, m) {
        console.log(that.data.mqttname)
        if (that.data.mqttname == t) {
          // console.log('详情页收到数据：' + t + ':=' + m);
          let data = app.globalData.deviceAdapter.getSdcSoftDevice(that.data.deviceType, new Uint8Array(m))
          console.log(data)
          that.dataparse(data, options.deviceNo)

        }

      }
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
  dataparse: function (data, deviceNo) {
    var that = this
    var errorList = []
    var clist = data.getCommands().map
    var media = -1
    for (var index in data.getBaseInfoFields().map) {
      if (data.getBaseInfoFields().map[index].name === "o_media") {
        media = data.getBaseInfoFields().map[index].value
      }
    }

    // if (media == 0 || media == 1) {
    //   that.setData({
    //     control: true,
    //   })
    // }
    if (JSON.stringify(clist) != '{}') {
      that.setData({
        controlList: clist,
        control: true,
      })
    }

    var myDate = new Date();
    for (var index in data.getExceptionFields().map) {
      errorList.push({
        deviceNo: deviceNo,
        title: data.getExceptionFields().map[index].title,
        date: myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate() + '-' + myDate.getHours() + ':' + myDate.getMinutes() + ':' + myDate.getSeconds(),
        states: that.data.content.detail_nochuli
      })
    }
    if (that.data.exRecord) {
      that.getException(errorList);
    }
    var imgstyle1 = that.data.imgstyle
    var keylist = GroupKeys.getKeys();

    var baseInfoMap = []
    for (let i in data.getBaseInfoFields().map) {
      baseInfoMap.push(data.getBaseInfoFields().map[i]);
    }
    var mockInfoMap = []
    for (let i in data.getMockFields().map) {
      if (data.getMockFields().map[i]) {
        mockInfoMap.push(data.getMockFields().map[i]);
      }
    }
    var settingInfoMap = []
    for (let i in data.getSettingFields().map) {
      if (data.getSettingFields().map[i]) {
        settingInfoMap.push(data.getSettingFields().map[i]);
      }

    }
    var deviceInfoMap = []
    for (let i in data.getDeviceFields().map) {
      if (data.getDeviceFields().map[i]) {
        deviceInfoMap.push(data.getDeviceFields().map[i]);
      }
    }
    var weeksettingMap = []
    for (let i in data.getFieldsMap(keylist[5]).map) {
      if (data.getFieldsMap(keylist[5]).map[i]) {
        weeksettingMap.push(data.getFieldsMap(keylist[5]).map[i]);
      }
    }
    var startstoptimeMap = []
    for (let i in data.getFieldsMap(keylist[6]).map) {
      if (data.getFieldsMap(keylist[6]).map[i]) {
        startstoptimeMap.push(data.getFieldsMap(keylist[6]).map[i]);
      }
    }
    var switchquantityMap = []
    for (let i in data.getFieldsMap(keylist[7]).map) {
      if (data.getFieldsMap(keylist[7]).map[i]) {
        switchquantityMap.push(data.getFieldsMap(keylist[7]).map[i]);
      }
    }
    that.setData({
      src: 'http://www.sdcsoft.com.cn/app/gl/animation/animation/stove/' + data.getStoveElement().getElementPrefixAndValuesString().substr(0, 8) + imgstyle1 + data.getStoveElement().getElementPrefixAndValuesString().substr(9, 2) + '.gif',
      bengAnimationList: data.getBeng(),
      exceptionInfoMap: data.getExceptionFields().map,
      fanAnimationList: data.getFan(),
      baseInfoMap: baseInfoMap,
      mockInfoMap: mockInfoMap,
      settingInfoMap: settingInfoMap,
      deviceInfoMap: deviceInfoMap,
      weeksettingMap: weeksettingMap,
      startstoptimeMap: startstoptimeMap,
      switchquantityMap: switchquantityMap,
    })
    wx.hideLoading()
    for (var i = 0; i < that.data.bengAnimationList.length; i++) {
      console.log()
      var src = 'bengList[' + i + '].src'
      var title = 'bengList[' + i + '].title'

      that.setData({
        [title]: that.data.bengAnimationList[i].getTitle(),
        [src]: 'http://www.sdcsoft.com.cn/app/gl/animation/animation/beng/' + that.data.bengAnimationList[i].getElementPrefixAndValuesString() + '.gif'
      })
    }

    for (var i = 0; i < that.data.fanAnimationList.length; i++) {
      var src = 'fanList[' + i + '].src'
      var title = 'fanList[' + i + '].title'
      that.setData({
        [title]: that.data.fanAnimationList[i].getTitle(),
        [src]: 'http://www.sdcsoft.com.cn/app/gl/animation/animation/fan/' + that.data.fanAnimationList[i].getElementPrefixAndValuesString() + '.gif'
      })
    }
  },
  // 展开折叠选择  
  changeToggle: function (e) {

    var index = e.currentTarget.dataset.index;
    if (this.data.selectedFlag[index]) {
      this.data.selectedFlag[index] = false;
    } else {
      this.data.selectedFlag[index] = true;
    }
    this.setData({
      selectedFlag: this.data.selectedFlag,
    })

  },
  bindChange: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  onShow: function () {
    var that = this;
    var type = that.data.deviceType
    var deviceNo = that.data.deviceNo
    if (deviceNo.substr(0, 2) != '20') {
      wx.request({
        //获取openid接口    
        url: 'https://apis.sdcsoft.com.cn/webapi/output/device/get',
        data: {
          deviceNo: deviceNo,
        },
        method: 'GET',
        header: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        },
        responseType: 'arraybuffer',
        success: function (res) {
          var bytes = res.data
          console.log(that.data.newFrame)
          if (that.data.newFrame == "true") {
            wx.request({
              url: 'https://apis.sdcsoft.com.cn/wechat/DeviceDataMap/get',
              data: {
                id: that.data.dataMapId,
              },
              method: 'GET',
              header: {
                "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
              },
              success: function (res) {
                let map = JSON.parse(res.data.data.deviceDataMap)
                let addr = JSON.parse(res.data.data.pointIndexMap)
                wx.getStorage({
                  key: 'deviceList',
                  success(res) {
                    var list = res.data
                    for (var i in list) {
                      if(deviceNo==list[i].deviceNo){
                        list[i].map = map
                        list[i].addr = addr
                      }
                    }
                    wx.setStorage({
                      key: 'deviceList',
                      data: list
                    })
                  }
                })
                app.globalData.adapter.Init(map, addr)
                app.globalData.adapter.handlerData(new Uint8Array(bytes))
                let device = app.globalData.adapter.Device
                var clist=device.KongZhi.map
                if (JSON.stringify(clist) != '{}') {
                  that.setData({
                    controlList: clist,
                    control: true,
                  })
                }
                 console.log(clist)
              //     device.KongZhi.each((k,v)=>{
              //         console.log(k)
              //         console.log(v)
              //     })

                var errorList = []
                var myDate = new Date();
                if (device.bj.length > 0) {
                  for (var index in device.bj) {
                    errorList.push({
                      deviceNo: deviceNo,
                      title: device.bj[index].name,
                      date: myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate() + '-' + myDate.getHours() + ':' + myDate.getMinutes() + ':' + myDate.getSeconds(),
                      states: that.data.content.detail_nochuli
                    })
                  }
                  if (that.data.exRecord) {
                    that.getException(errorList);
                  }
                }
                
                console.log(device.getStoveElements()) 
                var imgstyle1 = that.data.imgstyle
                if (device.getStoveElements().length > 0&device.getStoveElements().length ==1) {
                  var el = device.getStoveElements()[0].values
                  var stove = device.getStoveElements()[0].prefix
                  for (var i in el) {
                    if (el[i] != -1) {
                      stove = stove + "-" + el[i]
                    }
                  }
                  that.setData({
                    src: 'http://www.sdcsoft.com.cn/app/gl/animation/animation/stove/' + stove.substr(0, 7) + "-" + imgstyle1 + '.gif',
                  })
                }else{
                  var elements=device.getStoveElements()
                  var fireList=[]
                  for (var k in elements) {
                    var el =elements[k].values
                    var stove = elements[k].prefix
                    for (var i in el) {
                      if (el[i] != -1) {
                        stove = stove + "-" + el[i]
                      }
                    }
                    fireList.push({title:elements[k].title,  src: 'http://www.sdcsoft.com.cn/app/gl/animation/animation/stove/' + stove.substr(0, 7) + "-" + imgstyle1 + '.gif'})
                  }
                  that.setData({
                    fireList: fireList,
                  })
                
                }
                for (var i in device.jb) {
                  if (device.jb[i].name == "介质") {
                    that.setData({
                      media: device.jb[i].v
                    })
                  }
                }
                
                that.setData({
                  bengAnimationList: device.getBeng(),
                  fanAnimationList: device.getFan(),
                  baseInfoMap: device.jb,
                  wenduMap: device.wd,
                  exMap: device.bj,
                  yaliMap: device.yl,
                  liuliangMap: device.ll,
                  kaiguanMap: device.kg,
                  shebeiMap: device.sb,
                  shezhiMap: device.sz,
                  dingshiMap: device.ds,
                })
                wx.hideLoading()
                if (that.data.mock1 == null) {
                  var runInfoMoList = []
                  for (var wd in that.data.wenduMap) {
                    runInfoMoList.push({
                      name: that.data.wenduMap[wd].name,
                      title: that.data.wenduMap[wd].name,
                      type: "wd",
                    })
                  }
                  for (var yl in that.data.yaliMap) {
                    runInfoMoList.push({
                      name: that.data.yaliMap[yl].name,
                      title: that.data.yaliMap[yl].name,
                      type: "yl",
                    })
                  }
                  for (var ll in that.data.liuliangMap) {
                    runInfoMoList.push({
                      name: that.data.liuliangMap[ll].name,
                      title: that.data.liuliangMap[ll].name,
                      type: "ll",
                    })
                  }
                if (runInfoMoList.length > 0) {
                  that.setData({
                    report: true,
                    runInfoMoList: runInfoMoList,
                    mock1: runInfoMoList[0].name,
                    mock1Name: runInfoMoList[0].title,
                    mockType:runInfoMoList[0].type
                  })
                }
              }
                for (var i = 0; i < that.data.bengAnimationList.length; i++) {
                  var src = 'bengList[' + i + '].src'
                  var title = 'bengList[' + i + '].title'
                  that.setData({
                    [title]: that.data.bengAnimationList[i].title,
                    [src]: 'http://www.sdcsoft.com.cn/app/gl/animation/animation/beng/' + that.data.bengAnimationList[i].getElementPrefixAndValuesString() + '.gif'
                  })
                }

                for (var i = 0; i < that.data.fanAnimationList.length; i++) {
                  var src = 'fanList[' + i + '].src'
                  var title = 'fanList[' + i + '].title'
                  that.setData({
                    [title]: that.data.fanAnimationList[i].title,
                    [src]: 'http://www.sdcsoft.com.cn/app/gl/animation/animation/fan/' + that.data.fanAnimationList[i].getElementPrefixAndValuesString() + '.gif'
                  })
                }
              }
            })
          
          } else {
            var errorList = []
            let data = app.globalData.deviceAdapter.getSdcSoftDevice(that.data.deviceType, new Uint8Array(res.data))
            var clist = data.getCommands().map
            data.getDeviceFocusFields()
            var media = -1
            for (var index in data.getBaseInfoFields().map) {
              if (data.getBaseInfoFields().map[index].name === "o_media") {
                media = data.getBaseInfoFields().map[index].value
              }
            }

            that.setData({
              media: media
            })
            if (JSON.stringify(clist) != '{}') {
              that.setData({
                controlList: clist,
                control: true,
              })
            }
            var myDate = new Date();
            for (var index in data.getExceptionFields().map) {
              errorList.push({
                deviceNo: deviceNo,
                title: data.getExceptionFields().map[index].title,
                date: myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate() + '-' + myDate.getHours() + ':' + myDate.getMinutes() + ':' + myDate.getSeconds(),
                states: that.data.content.detail_nochuli
              })
            }

            if (that.data.exRecord) {
              that.getException(errorList);
            }
            var imgstyle1 = that.data.imgstyle
            console.log(that.data.mock1 == null)
            if (that.data.mock1 == null) {

              var gf = new gfrm.GroupFieldsRelationalMapping;
              var moMap = gf.groupMap.getItem("mockInfo")["map"]["map"]
              var runInfoMoList = []
              for (var index in data.getMockFields().map) {
                for (var mo in moMap) {
                  if (moMap[mo] == data.getMockFields().map[index].name) {
                    runInfoMoList.push({
                      name: moMap[mo],
                      title: data.getMockFields().map[index].title
                    })
                  }
                }
              }


              if (runInfoMoList.length > 0) {
                that.setData({
                  report: true,
                  runInfoMoList: runInfoMoList,
                  mock1: runInfoMoList[0].name,
                  mockKey: runInfoMoList[0].name,
                  mock1Name: runInfoMoList[0].title
                })
              }

            }
            var keylist = GroupKeys.getKeys();
            var baseInfoMap = []
            for (let i in data.getBaseInfoFields().map) {
              baseInfoMap.push(data.getBaseInfoFields().map[i]);
            }
            var mockInfoMap = []
            for (let i in data.getMockFields().map) {
              if (data.getMockFields().map[i]) {
                mockInfoMap.push(data.getMockFields().map[i]);
              }
            }
            var settingInfoMap = []
            for (let i in data.getSettingFields().map) {
              if (data.getSettingFields().map[i]) {
                settingInfoMap.push(data.getSettingFields().map[i]);
              }
            }
            var deviceInfoMap = []
            for (let i in data.getDeviceFields().map) {
              if (data.getDeviceFields().map[i]) {
                deviceInfoMap.push(data.getDeviceFields().map[i]);
              }
            }
            var weeksettingMap = []
            for (let i in data.getFieldsMap(keylist[5]).map) {
              if (data.getFieldsMap(keylist[5]).map[i]) {
                weeksettingMap.push(data.getFieldsMap(keylist[5]).map[i]);
              }
            }
            var startstoptimeMap = []
            for (let i in data.getFieldsMap(keylist[6]).map) {
              if (data.getFieldsMap(keylist[6]).map[i]) {
                startstoptimeMap.push(data.getFieldsMap(keylist[6]).map[i]);
              }
            }
            var switchquantityMap = []
            for (let i in data.getFieldsMap(keylist[7]).map) {
              if (data.getFieldsMap(keylist[7]).map[i]) {
                switchquantityMap.push(data.getFieldsMap(keylist[7]).map[i]);
              }
            }
            that.setData({
              src: 'http://www.sdcsoft.com.cn/app/gl/animation/animation/stove/' + data.getStoveElement().getElementPrefixAndValuesString().substr(0, 8) + imgstyle1 + data.getStoveElement().getElementPrefixAndValuesString().substr(9, 2) + '.gif',
              bengAnimationList: data.getBeng(),
              exceptionInfoMap: data.getExceptionFields().map,
              fanAnimationList: data.getFan(),
              baseInfoMap: baseInfoMap,
              mockInfoMap: mockInfoMap,
              settingInfoMap: settingInfoMap,
              deviceInfoMap: deviceInfoMap,
              weeksettingMap: weeksettingMap,
              startstoptimeMap: startstoptimeMap,
              switchquantityMap: switchquantityMap,
            })
            wx.hideLoading()
            for (var i = 0; i < that.data.bengAnimationList.length; i++) {
              var src = 'bengList[' + i + '].src'
              var title = 'bengList[' + i + '].title'
              that.setData({
                [title]: that.data.bengAnimationList[i].title,
                [src]: 'http://www.sdcsoft.com.cn/app/gl/animation/animation/beng/' + that.data.bengAnimationList[i].getElementPrefixAndValuesString() + '.gif'
              })
            }

            for (var i = 0; i < that.data.fanAnimationList.length; i++) {
              var src = 'fanList[' + i + '].src'
              var title = 'fanList[' + i + '].title'
              that.setData({
                [title]: that.data.fanAnimationList[i].title,
                [src]: 'http://www.sdcsoft.com.cn/app/gl/animation/animation/fan/' + that.data.fanAnimationList[i].getElementPrefixAndValuesString() + '.gif'
              })
            }
          }

        }
      })
    } else {
      wx.hideLoading()
    }
  },
  timer: function () {
    var that = this
    wx.getStorage({
      key: 'time',
      success(res) {
        that.setData({
          timer: setInterval(function () {
            if (that.data.timerStates) {
              console.log("timerStates")
              that.onShow()
            }
          }, 10 * 1000)
        })
      }
    })
  },
  getException: function (errorList) {
    var that = this
    var deviceNo = that.data.deviceNo
    // 没有异常 
    if (errorList.length == 0) {
      wx.getStorage({
        key: 'errorList',
        success(res) {
          if (res.data.length > 0) {
            var eList = res.data
            for (var i = 0; i < eList.length; i++) {
              if (eList[i].deviceNo == deviceNo) {
                eList[i].states = that.data.content.detail_treated
              }
            }
            wx.setStorage({
              key: 'errorList',
              data: eList
            })
          }
        }
      })
    } else {
      wx.getStorage({
        key: 'errorList',
        success(res) {
          var oldList = res.data
          if (oldList.length > 0) {
            for (var k = 0; k < oldList.length; k++) {
              if (oldList[k].deviceNo == deviceNo && oldList[k].states == that.data.content.detail_nochuli) {
                if (that.findx(errorList, oldList[k])) {
                  oldList.push({
                    deviceNo: oldList[k].deviceNo,
                    title: oldList[k].title,
                    date: oldList[k].date,
                    states: that.data.content.detail_treated
                  })
                  oldList.splice(k, 1);
                  wx.setStorage({
                    key: 'errorList',
                    data: oldList
                  })
                }
                for (var i = 0; i < errorList.length; i++) {
                  if (errorList[i].title == oldList[k].title && errorList[i].states == oldList[k].states) {
                    errorList.splice(i, 1);
                    break;
                  } else if (errorList[i].title == oldList[k].title && oldList[k].states == that.data.content.detail_treated) {
                    oldList.push({
                      deviceNo: errorList[i].deviceNo,
                      title: errorList[i].title,
                      date: errorList[i].date,
                      states: that.data.content.detail_nochuli
                    })
                    wx.getStorage({
                      key: 'warningType',
                      success(res) {
                        console.log(22)
                        if (res.data == 1) {
                          wx.vibrateLong()
                        } else if (app.globalData.warningType == 2) {
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
                    errorList.splice(i, 1);
                    break;
                  }
                }
              }
            }
            for (var i = 0; i < errorList.length; i++) {
              oldList.push({
                deviceNo: errorList[i].deviceNo,
                title: errorList[i].title,
                date: errorList[i].date,
                states: that.data.content.detail_nochuli
              })
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
            wx.setStorage({
              key: 'errorList',
              data: oldList
            })
          } else if (oldList.length == 0) {
            wx.setStorage({
              key: 'errorList',
              data: errorList
            })
          }
          wx.getStorage({
            key: 'errorList',
            success(res) {
              var elist = []

              for (var i = 0; i < res.data.length; i++) {
                if (res.data[i].deviceNo == that.data.deviceNo) {
                  elist.push(res.data[i])
                }
              }
              that.setData({
                errorList: elist
              })
            }
          })
        }
      })
    }
  },
  findx: function (list, ex) {
    for (var i = 0; i < list.length; i++) {
      if (list[i].title === ex.title) {
        return false;
      }
    }
    return true;
  },
  //wxchart
  getreportdatabykey: function (key) {
    var that = this
    if (that.data.tian == -1) {
      var beginDate = that.getDateStr(null, -1)
    }
    if (that.data.tian == -2) {
      var beginDate = that.getDateStr(null, -2)
    }
    if (that.data.tian == -3) {
      var beginDate = that.getDateStr(null, -3)
    }
    var endDate = that.getDateStr(beginDate, 1)
    
    if(that.data.newFrame=='true'){
      wx.request({
        url: 'https://apis.sdcsoft.com.cn/webapi/report/newframe/customer/wechat/mock',
        data: {
          key: key,
          begintime: beginDate,
          endtime: endDate,
          deviceNo: that.data.deviceNo,
          type:that.data.mockType,
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        },
        method: 'GET',
        success: function (res) {
          console.log(res)
          if (res.data.code == 0) {
            that.setData({
              havedata: true
            })
            var systemStateCategories = []
            var systemStateData = res.data.data.data
            var detelist = res.data.data.date
            for (var d in detelist) {
              systemStateCategories.push(DateUtil.dateFormat(new Date(detelist[d]), "yyyy-MM-dd HH:mm:ss"))
            }
  
            if (systemStateData.length > 0) {
              var windowWidth = 320;
              try {
                var res = wx.getSystemInfoSync();
                windowWidth = res.windowWidth;
              } catch (e) {
                console.error('getSystemInfoSync failed!');
              }
              lineChart = new wxCharts({
                canvasId: 'mockLine',
                type: 'line',
                categories: systemStateCategories,
                animation: false,
                series: [{
                  name: that.data.mock1Name,
                  data: systemStateData,
                  format: function (val, name) {
                    var fomatFloat = parseFloat(val);
                    return fomatFloat.toFixed(2);
                  }
                }],
                xAxis: {
                  disableGrid: false
                },
                yAxis: {
                  title: that.data.content.detail_y,
                  format: function (val) {
                    return val.toFixed(2);
                  },
                  min: 0
                },
                width: windowWidth,
                height: 200,
                dataLabel: true,
                dataPointShape: true,
                enableScroll: true,
                extra: {
                  lineStyle: 'curve'
                }
              });
            }
          } else {
            wx.showToast({
              title: "此设备在" + beginDate + "未开机",
              icon: 'none',
              duration: 5000
            });
            that.setData({
              havedata: false
            })
          }
        }
      })
    }else{
      console.log("321")
      wx.request({
        url: 'https://apis.sdcsoft.com.cn/webapi/report/device/wechat/mock',
        data: {
          key: key,
          begintime: beginDate,
          endtime: endDate,
          deviceNo: that.data.deviceNo
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        },
        method: 'GET',
        success: function (res) {
          if (res.data.code == 0) {
            that.setData({
              havedata: true
            })
            var systemStateCategories = []
            var systemStateData = res.data.data.data[0]
            var detelist = res.data.data.date
            for (var d in detelist) {
              systemStateCategories.push(DateUtil.dateFormat(new Date(DateUtil.stringToDate(detelist[d]).getTime() - 8 * 60 * 60 * 1000), "yyyy-MM-dd HH:mm:ss"))
            }
  
            if (systemStateData.length > 0) {
              var windowWidth = 320;
              try {
                var res = wx.getSystemInfoSync();
                windowWidth = res.windowWidth;
              } catch (e) {
                console.error('getSystemInfoSync failed!');
              }
  
              lineChart = new wxCharts({
                canvasId: 'mockLine',
                type: 'line',
                categories: systemStateCategories,
                animation: false,
                series: [{
                  name: that.data.mock1Name,
                  data: systemStateData,
                  format: function (val, name) {
                    var fomatFloat = parseFloat(val);
                    return fomatFloat.toFixed(2);
                  }
                }],
                xAxis: {
                  disableGrid: false
                },
                yAxis: {
                  title: that.data.content.detail_y,
                  format: function (val) {
                    return val.toFixed(2);
                  },
                  min: 0
                },
                width: windowWidth,
                height: 200,
                dataLabel: true,
                dataPointShape: true,
                enableScroll: true,
                extra: {
                  lineStyle: 'curve'
                }
              });
            }
          } else {
            wx.showToast({
              title: "此设备在" + beginDate + "未开机",
              icon: 'none',
              duration: 5000
            });
            that.setData({
              havedata: false
            })
          }
        }
      })
    }
  },
  getreportdatabyday: function (key) {
    var that = this
    if (that.data.tian == -1) {
      var beginDate = that.getDateStr(null, -1)
    }
    if (that.data.tian == -2) {
      var beginDate = that.getDateStr(null, -2)
    }
    if (that.data.tian == -3) {
      var beginDate = that.getDateStr(null, -3)
    }
    var endDate = that.getDateStr(beginDate, 1)
    if(that.data.newFrame=='true'){
      wx.request({
        url: 'https://apis.sdcsoft.com.cn/webapi/report/newframe/customer/wechat/mock',
        data: {
          key: key,
          begintime: beginDate,
          endtime: endDate,
          deviceNo: that.data.deviceNo,
          type:that.data.mockType,
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        },
        method: 'GET',
        success: function (res) {
          console.log(res)
          if (res.data.code == 0) {
            that.setData({
              havedata: true
            })
            var systemStateCategories = []
            var systemStateData = res.data.data.data
            var detelist = res.data.data.date
            for (var d in detelist) {
              systemStateCategories.push(DateUtil.dateFormat(new Date(detelist[d]), "yyyy-MM-dd HH:mm:ss"))
            }
            if (systemStateData.length > 0) {
              var windowWidth = 320;
              try {
                var res = wx.getSystemInfoSync();
                windowWidth = res.windowWidth;
              } catch (e) {
                console.error('getSystemInfoSync failed!');
              }
              lineChart = new wxCharts({
                canvasId: 'mockLine',
                type: 'line',
                categories: systemStateCategories,
                animation: false,
                series: [{
                  name: that.data.mock1Name,
                  data: systemStateData,
                  format: function (val, name) {
                    var fomatFloat = parseFloat(val);
                    return fomatFloat.toFixed(2);
                  }
                }],
                xAxis: {
                  disableGrid: false
                },
                yAxis: {
                  title: that.data.content.detail_y,
                  format: function (val) {
                    return val.toFixed(2);
                  },
                  min: 0
                },
                width: windowWidth,
                height: 200,
                dataLabel: true,
                dataPointShape: true,
                enableScroll: true,
                extra: {
                  lineStyle: 'curve'
                }
              });
            }
          } else {
            wx.showToast({
              title: "此设备在" + beginDate + "未开机",
              icon: 'none',
              duration: 5000
            });
            that.setData({
              havedata: false
            })
          }
        }
      })
    }else{
      console.log("123")
      wx.request({
        url: 'https://apis.sdcsoft.com.cn/webapi/report/device/wechat/mock',
        data: {
          key: key,
          begintime: beginDate,
          endtime: endDate,
          deviceNo: that.data.deviceNo
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        },
        method: 'GET',
        success: function (res) {
          console.log(res)
          if (res.data.code == 0) {
            that.setData({
              havedata: true
            })
            var systemStateCategories = []
            var systemStateData = res.data.data.data[0]
            var detelist = res.data.data.date
            for (var d in detelist) {
              systemStateCategories.push(DateUtil.dateFormat(new Date(DateUtil.stringToDate(detelist[d]).getTime() - 8 * 60 * 60 * 1000), "yyyy-MM-dd HH:mm:ss"))
            }
  
            if (systemStateData.length > 0) {
              var windowWidth = 320;
              try {
                var res = wx.getSystemInfoSync();
                windowWidth = res.windowWidth;
              } catch (e) {
                console.error('getSystemInfoSync failed!');
              }
  
              lineChart = new wxCharts({
                canvasId: 'mockLine',
                type: 'line',
                categories: systemStateCategories,
                animation: false,
                series: [{
                  name: that.data.mock1Name,
                  data: systemStateData,
                  format: function (val, name) {
                    var fomatFloat = parseFloat(val);
                    return fomatFloat.toFixed(2);
                  }
                }],
                xAxis: {
                  disableGrid: false
                },
                yAxis: {
                  title: that.data.content.detail_y,
                  format: function (val) {
                    return val.toFixed(2);
                  },
                  min: 0
                },
                width: windowWidth,
                height: 200,
                dataLabel: true,
                dataPointShape: true,
                enableScroll: true,
                extra: {
                  lineStyle: 'curve'
                }
              });
            }
          } else {
            wx.showToast({
              title: "此设备在" + beginDate + "未开机",
              icon: 'none',
              duration: 5000
            });
            that.setData({
              havedata: false
            })
          }
        }
      })
    }


  },
  radiochange: function (res) {
    console.log(res.detail.value)
    var that = this
    var runInfoMoList = that.data.runInfoMoList
    for (var i in runInfoMoList) {
      if (runInfoMoList[i].name == res.detail.value) {
        that.setData({
          mock1: runInfoMoList[i].title,
          mock1Name: runInfoMoList[i].title,
          mockType:runInfoMoList[i].type,
          mockKey:runInfoMoList[i].name
        })
      }
    }
    that.getreportdatabykey(res.detail.value)
  },
  getDatefmt: function getDateStr(today) {
    var dd;
    dd = new Date(today);
    dd.setDate(dd.getDate()); //获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1; //获取当前月份的日期 
    var d = dd.getDate();
    if (m < 10) {
      m = '0' + m;
    };
    if (d < 10) {
      d = '0' + d;
    };

    var h = dd.getHours();
    var m = dd.getMinutes();
    if (h < 10) {
      h = "0" + h;
    }
    if (m < 10) {
      m = "0" + m;
    }
    return y + "-" + m + "-" + d + " " + h + ':' + m;
  },
  getDateStr: function getDateStr(today, addDayCount) {
    var dd;
    if (today) {
      dd = new Date(today);
    } else {
      dd = new Date();
    }
    dd.setDate(dd.getDate() + addDayCount); //获取AddDayCount天后的日期

    var y = dd.getFullYear();
    var m = dd.getMonth() + 1; //获取当前月份的日期 
    var d = dd.getDate();
    if (m < 10) {
      m = '0' + m;
    };
    if (d < 10) {
      d = '0' + d;
    };
    return y + "-" + m + "-" + d;
  },
  choosedata: function (e) {
    var that = this
    that.setData({
      tian: e.currentTarget.dataset.tian,
    })
    that.getreportdatabyday(that.data.mock1)
  },
  //wxchart  方法 
  touchHandler: function (e) {
    lineChart.scrollStart(e);
  },
  moveHandler: function (e) {
    lineChart.scroll(e);
  },
  touchEndHandler: function (e) {
    lineChart.scrollEnd(e);
    lineChart.showToolTip(e, {
      format: function (item, category) {
        return category + ' ' + item.name + ':' + item.data
      }
    });
  },
})