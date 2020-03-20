//index.js
//获取应用实例
var util = require('../../utils/util.js')
var app= getApp()
Page({
  data: {
     orders:[],
  },
  //事件处理函数
  // bindViewTap: function() {
  //   wx.navigateTo({
  //     url: '../demo/demo?orderId='+
  //   })
  // },
  status:function (id) {
    var statusJson = {};
    var x = "";

    switch(id) {
    case 0:
    x = "待支付";
    break;
    case 1:
    x = "已付款";
    break;
  }
  statusJson.x = x;
return statusJson;
},
  onLoad: function () {
    var that = this;
    wx.request({
      url: 'https://apis.sdcsoft.com.cn/webapi/wechat/JinRong_Order/list',
      method: "GET",
      data: {
        openId: app.globalData.openid,
      },

      success: function (res) {
        for(let i=0; i<res.data.data.length;i++){
          that.setData({
            ['orders[' + i + '].id']: res.data.data[i].id,
            ['orders['+i+'].total']: res.data.data[i].total,
            ['orders[' + i + '].paymentAmount']: res.data.data[i].paymentAmount,
            ['orders[' + i + '].discount']: res.data.data[i].discount,
            ['orders[' + i + '].wechatOrderId']: res.data.data[i].wechatOrderId,
            ['orders[' + i + '].unionId']: res.data.data[i].unionId,
            ['orders[' + i + '].payforDate']: util.formatTime(new Date(res.data.data[i].payforDate)),
            ['orders[' + i + '].createDate']: util.formatTime(new Date(res.data.data[i].createDate)),
            ['orders[' + i + '].status']: that.status(res.data.data[i].status).x,
          })
        }
       
            }
    })
    // this.setData({
    //    orders:[
    //   {
    //     total:200,
    //     paymentAmount:150,
    //     discount: '满50减20',
    //     payforDate: util.formatTime(new Date()),
    //     createDate: util.formatTime(new Date()),
    //     status: 
    //   },
    // ]
    // })
  }
})
