const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [],
    index: 0,
    content: null,
  },
  bindPickerChange: function (e) {
    var that = this
    wx.setStorage({
      key: 'userType',
      data: e.detail.value
    })
    wx.showToast({
      title: that.data.content.warningType_updatesuccess,
      icon: 'success',
      duration: 2000,
      success(res) {
        wx.switchTab({
          url: '../deviceList/deviceList'
        })
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var userType = 0
    wx.getStorage({
      key: 'userType',
      success(res) {
        that.setData({
          index: res.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    if (app.globalData.lang === 'zh-cn') {
      var chinese = require("../../utils/Chinses.js")
      that.setData({
        array: ["锅炉监控", "锅炉维保"],
        content: chinese.Content
      })
    }
    if (app.globalData.lang === 'en-us') {
      var english = require("../../utils/English.js")
      that.setData({
        array: ["Monitoring of the boiler", "Maintenance of the boiler"],
        content: english.Content
      })
    }
    wx.setNavigationBarTitle({
      title: that.data.content.userType_title
    })
  },
})