const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    prefix:0,
    prefixarray: [],
    deviceNo:0,
    deviceType:0,
    statesarray: [],
    status: 0,
    typearray: [],
    type:"",
    powerarray: [],
    power: 0,
    mediaarray: [],
    media: 0,
    sim:"",
    commarray: ["DTU","Wifi"],
    comm:0,
    ctlTypeList:[],
    plcTypeList:[],
    datamapList:[],
    datamapId:0,
    datamapName:"请选择",
    canctlarray: ["不可控", "可控"],
    canctl: 0,
    datamaptyparray: ["中文", "英文"],
    datamaptyp: 0,
    deviceDataMaparray: ["否", "是"],
    deviceDataMap: 0,
    iccid:""
  },
  bindsim: function (e) {
    this.setData({
      sim: e.detail.value
    })
  },
  formSubmit: function (e) {
    var that= this
    var cnId="";
    var enId="";
      if(that.data.datamaptyp==0){
        cnId=that.data.datamapId
        enId=""
      }else{
        enId=that.data.datamapId
        cnId=""
      }
    if (that.data.comm==0){
      if (typeof (that.data.sim) == "undefined" || that.data.sim == that.data.iccid) {
        wx.showToast({
          title: "请补全Sim卡号",
          icon: 'none',
          duration: 2000
        })
        return
      }
      wx.request({
        url: 'https://apis.sdcsoft.com.cn/wechat/device/modify',
        data: {
          deviceNo: that.data.deviceNo,
          status: that.data.status,
          prefix: that.data.prefix,
          deviceType: that.data.type,
          power: that.data.power,
          media: that.data.media,
          iMEI: that.data.sim,
          cnId: cnId,
          enId:enId,
          isCanCtl: that.data.canctl,
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        },
        method: 'GET',
        success: function (res) {
          console.log(res)
          if(res.data.code==0){
            wx.showToast({
              title: '修改成功',
              icon: 'success',
              duration: 2000,
              success(res) {
                wx.switchTab({
                  url: '../index/index'
                })
              }
            });
          }else{
            wx.showToast({
              title: 'Sim卡号不存在，请联系管理员',
              icon: 'none',
              duration: 2000
            });
          }
        }
      })
    }else{
      wx.request({
        url: 'https://apis.sdcsoft.com.cn/wechat/device/modify',
        data: {
          deviceNo: that.data.deviceNo,
          status: that.data.status,
          prefix: that.data.prefix,
          deviceType: that.data.type,
          power: that.data.power,
          media: that.data.media,
          enId: enId,
          cnId: cnId,
          isCanCtl: that.data.canctl,
          iMEI: "",
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        },
        method: 'GET',
        success: function (res) {
          console.log(res)
          wx.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 2000,
            success(res) {
              wx.switchTab({
                url: '../index/index'
              })
            }
          });
        }
      })
    }
  
  },
  bindPickerChange_comm: function (e) {
    var that = this
    that.setData({
      comm: e.detail.value,
    })
  },
  bindPickerChange_canctl: function (e) {
    var that = this
    that.setData({
      canctl: e.detail.value,
    })
  },
  bindPickerChange_DataMap: function (e) {
    var that = this
    that.setData({
      datamapId: that.data.datamapList[e.detail.value].id,
      datamapName:that.data.datamapList[e.detail.value].title
    })
  },
  bindPickerChange_DataMapTyp: function (e) {
    var that = this
    that.setData({
      datamaptyp: e.detail.value,
    })
  },
  bindPickerChange_deviceDataMap: function (e) {
    var that = this
    that.setData({
      deviceDataMap: e.detail.value,
    })
  },
  bindPickerChange_prefix: function (e) {
    var that = this
    that.setData({
      prefix: e.detail.value,
    })
    if (e.detail.value==1) {
      that.setData({
        typearray: that.data.ctlTypeList,
      })
    }
    if (e.detail.value == 2) {
      that.setData({
        typearray: that.data.plcTypeList,
      })
    }
  },
  bindPickerChange_status: function (e) {
    var that = this
    that.setData({
      status:e.detail.value,
    })
  },
  bindPickerChange_power: function (e) {
    var that = this
    that.setData({
      power: e.detail.value,
    })
  },
  bindPickerChange_media: function (e) {
    var that = this
    that.setData({
      media: e.detail.value,
    })
    if(e.detail.value==0||e.detail.value){
      that.setData({
        canctl:1
      })
    }
  },
  bindPickerChange_deviceType: function (e) {
    var that = this
    that.setData({
      type: that.data.typearray[e.detail.value],
      deviceType: e.detail.value,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    wx.request({
      url: 'https://apis.sdcsoft.com.cn/wechat/device/type/list',
      data: {
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
      },
      method: 'GET',
      success: function (res) {
        var list=[]
        for (var i in res.data.data){
          list.push(res.data.data[i].deviceType)
        }
        wx.request({
          url: 'https://apis.sdcsoft.com.cn/wechat/device/getsuffix',
          data: {
            deviceNo: options.deviceNo
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
          },
          method: 'GET',
          success: function (res) {
            console.log(res)
            var datamapId=null;
            if(res.data.data.deviceDataMapCn!=null){
              datamapId=res.data.data.deviceDataMapCn
            }else{
              datamapId=res.data.data.deviceDataMapEn
            }
            var datamapList=[]
            wx.request({
              url: 'https://apis.sdcsoft.com.cn/wechat/DeviceDataMap/search/author',
              method: "Get",
              data: {
                author: app.globalData.openid,
              },
              success: function (res) {
                var list=res.data.data
                for(var i in list){
                  console.log(datamapId)
                  if(datamapId!=null){
                    if(datamapId==list[i].id){
                      that.setData({
                        datamapName:list[i].title
                      })
                    }
                  }
                  datamapList.push({id:list[i].id,title:list[i].title})
                }
                that.setData({
                  datamapList:datamapList
                })
              }
            })
            if (res.data.data.canCtl){
              that.setData({
                canctl: 1
              })
            }else{
              that.setData({
                canctl: 0
              })
            }
            if (res.data.data.deviceDataMapCn!=null) {
              that.setData({
                datamaptyp: 0
              })
            } else {
              that.setData({
                datamaptyp: 1
              })
            }
            if (res.data.data.newFrame) {
              that.setData({
                deviceDataMap: 1,
              })
            } else {
              that.setData({
                deviceDataMap: 0
              })
            }
            var simtemp=""
            if (res.data.data.iMEI == null || res.data.data.iMEI =='null' || res.data.data.iMEI =='0'){
              simtemp = that.data.iccid
              that.setData({
                comm:1
              })
            }else{
              simtemp = res.data.data.iMEI
              that.setData({
                comm:0
              })
            }

            var plcTypeList=[]
            var ctlTypeList = []
            
            for (var i in list) {
              if (list[i].substr(0, 3) == 'PLC') {
                plcTypeList.push(list[i])
              }
              if (list[i].substr(0, 3) == 'CTL') {
                ctlTypeList.push(list[i])
              }
            }
            var deviceType=0
            if (res.data.data.devicePrefix==1){
              that.setData({
                deviceType: ctlTypeList.indexOf(res.data.data.deviceType),
                typearray: ctlTypeList
              })
            }
            if (res.data.data.devicePrefix == 2) {
              that.setData({
                deviceType: plcTypeList.indexOf(res.data.data.deviceType),
                typearray: plcTypeList
              })
            }
            that.setData({
              plcTypeList: plcTypeList,
              ctlTypeList: ctlTypeList,
              deviceNo: options.deviceNo,
              type: res.data.data.deviceType,
              prefix: res.data.data.devicePrefix,
              status: res.data.data.status,
              power: res.data.data.power,
              media: res.data.data.media,
              statesarray: ["未销售", "已销售"],
              prefixarray: ["","控制器", "PLC"],
              powerarray: ["油气", "电", "煤", "生物质"],
              mediaarray: ["热水", "蒸汽", "导热油", "热风", "真空"],
              sim: simtemp
            })
           
           
          }
        })
      }
    })
    wx.request({
      url: 'https://apis.sdcsoft.com.cn/wechat/iccid/get',
      method: "Get",
      data: {
      },
      success: function (res) {
        
        that.setData({
          iccid:res.data
        })
      }
    })
  },
})