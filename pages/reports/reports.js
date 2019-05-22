var wxCharts = require('../../utils/wxcharts.js');
var lineChart = null;
var startPos = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
   list:[],
  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    wx.getStorage({
      key: 'deviceList',
      success(res) {
        console.log(res.data)
        that.setData({
          list: res.data
        })
      }
    })
  },

})