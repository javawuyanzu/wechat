
const app = getApp();
var wxCharts = require('../../utils/wxcharts.js');
var lineChart = null;
var startPos = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
   list:[],
   manage:false,
  },
  startdebug: function () {
    wx.setEnableDebug({
      enableDebug: true
    })
  },
  enddebug: function () {
    wx.setEnableDebug({
      enableDebug: false
    })
  },
  tomanage: function () {
    wx.navigateTo({
      url: "/pages/devicemanage/devicemanage",
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    var that=this
    wx.getStorage({
      key: 'deviceList',
      success(res) {
        that.setData({
          list: res.data
        })
      }
    })
    if(app.globalData.openid=="oskc75AGW__mvhn2UVc" ||app.globalData.openid=="oskc75CFkX_1NT1BqBk"||app.globalData.openid=="oskc75LNTq_aBLLq9Mo"){
      that.setData({
        manage:true
      })
    }
   
  },
})