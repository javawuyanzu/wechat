
const app = getApp()
Page({
  data: {
    ifdelete:false,
    id:null
  },
  onShow: function () {
    var that =this
    wx.request({
      //获取openid接口   
      url: 'https://apis.sdcsoft.com.cn/wechat/privatisation/find/buyersOpenId',
      data: {
        buyersOpenId: app.globalData.openid,
      },
      method: 'GET',
      success: function (res) {
        var list = res.data.data
        var plist=[]
        for(var i in list){
          if(list[i].openId!=app.globalData.openid){
            plist.push(list[i])
          }
        }
        that.setData({
          list:plist
        })
      }
    })
  },
  yesdelete: function (e) {
    var that =this
    wx.request({
      //获取openid接口   
      url: 'https://apis.sdcsoft.com.cn/wechat/privatisation/reset',
      data: {
        id: this.data.id,
      },
      method: 'GET',
      success: function (res) {
        console.log(res)
        wx.request({
          //获取openid接口   
          url: 'https://apis.sdcsoft.com.cn/wechat/privatisation/find/buyersOpenId',
          data: {
            buyersOpenId: app.globalData.openid,
          },
          method: 'GET',
          success: function (res) {
            var list = res.data.data
            var plist=[]
            for(var i in list){
              if(list[i].openId!=app.globalData.openid){
                plist.push(list[i])
              }
            }
            that.setData({
              list:plist,
              ifdelete:false
            })
            wx.showToast({
              title: '删除成功'
            })
          }
        })
      }
    })
  },
  nodelete: function (e) {
    this.setData({
      ifdelete:false
    })
  },
  delete: function (e) {
    this.setData({
      id:e.currentTarget.dataset.id,
      ifdelete:true
    })
  },
  copyText: function (e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.openid,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功'
            })
          }
        })
      }
    })
  },
})
