//about.js
//获取应用实例
var app = getApp()
Page({
  data: {
    logosrc: '../../images/orderlog.png',
    adrimg: '../../images/ditu.png',
    clockimg: '../../images/shijian.png',
    phoneimg: '../../images/dianhua.png',
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000
  },
  calling1: function () {
    wx.makePhoneCall({
      phoneNumber: '18254809623',
    })
  },
  calling2: function () {
    wx.makePhoneCall({
      phoneNumber: '18888281821',
    })
  },
  calling3: function () {
    wx.makePhoneCall({
      phoneNumber: '15153872106',
    })
  },
  getLocation: function () {
    wx.openLocation({
      latitude: 36.15,
      longitude: 117.12,
      name: "山东简洁软件有限公司",
      address: "山东省泰安市泰山区田园大街中段",
      scale: 28
    })
  },
  
})