// pages/salesChange/salesChange.js
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
    type:""
  },
  formSubmit: function (e) {
    var that= this
    console.log(that.data.type)
    console.log(that.data.status)
    
    wx.request({
      url: 'http://127.0.0.1:8080/wechat/device/modifydevice',
      data: {
        deviceNo: that.data.deviceNo,
        status: that.data.status,
        prefix: that.data.prefix,
        deviceType: that.data.type,
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
            wx.navigateTo({
              url: '../soldUpdate/soldUpdate'
            })
          }
        });

      }
    })
  },
  bindPickerChange_prefix: function (e) {
    var that = this
    console.log(e.detail.value)
    that.setData({
      prefix: e.detail.value,
    })
  },
  bindPickerChange_status: function (e) {
    var that = this
    console.log(e.detail.value)
    that.setData({
      status:e.detail.value,
    })
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
      url: 'http://127.0.0.1:8080/wechat/device/gettypelist',
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
        that.setData({
          typearray: list
        })
        wx.request({
          url: 'http://127.0.0.1:8080/wechat/device/getsuffix',
          data: {
            deviceNo: options.deviceNo
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
          },
          method: 'GET',
          success: function (res) {
            that.setData({
              deviceNo: options.deviceNo,
              type: res.data.data.deviceType,
              deviceType: that.data.typearray.indexOf(res.data.data.deviceType),
              prefix: res.data.data.devicePrefix,
              status: res.data.data.status,
              statesarray: ["未销售", "已销售"],
              prefixarray: ["","控制器", "PLC"],
            })
          }
        })
      }
    })
  },
 



})