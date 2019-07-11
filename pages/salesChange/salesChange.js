// pages/salesChange/salesChange.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    deviceNo:0,
    enterpriseName:"",
    array: [],
    index: 0,
  },
  bindPickerChange: function (e) {
    var that = this
    console.log(e.detail.value)
    wx.request({
      url: 'http://127.0.0.1:8080/device/updateDeviceSaleStates',
      data: {
        deviceNo:that.data.deviceNo,
        states: e.detail.value
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    wx.request({
      url: 'http://127.0.0.1:8080/device/getDeviceSaleStates',
      data: {
        deviceNo: options.deviceNo
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
      },
      method: 'GET',
      success: function (res) {
        console.log(res)
        that.setData({
          deviceNo: options.deviceNo,
          enterpriseName: res.data.msg,
          index: res.data.code,
          array: ["未销售", "已销售"],
        })
       
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },



})