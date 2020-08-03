const app = getApp();
Page({
  data: {
    mapList: [],
    openid:null
  },
  onShow: function (options) {
    var that=this
    that.setData({
      openid:app.globalData.openid
    })
    wx.request({
      url: 'https://apis.sdcsoft.com.cn/wechat/DeviceDataMap/search/author',
      method: "Get",
      data: {
        author: app.globalData.openid,
      },
      success: function (res) {
        var list=res.data.data
        var mapList=[]
        for(var i in list){
          mapList.push({id:list[i].id,title:list[i].title,createDatetime:list[i].createDatetime,share:list[i].share,deviceDataMap:list[i].deviceDataMap,author:list[i].author})
        }
        that.setData({
          mapList:mapList
        })
      }
    })
   },
   toedit: function (e) {
    var data=e.currentTarget.dataset.key
    
    wx.navigateTo({
      url: "/pages/dataMap/dataMap?data="+data+"&title="+e.currentTarget.dataset.title+"&id="+e.currentTarget.dataset.id,
    })
  },
  saveAs: function (e) {
    var data=e.currentTarget.dataset.key
    wx.navigateTo({
      url: "/pages/dataMap/dataMap?data="+data+"&title="+e.currentTarget.dataset.title+"&id="+e.currentTarget.dataset.id+"&saveAs=saveAs",
    })
  },
  add: function (e) {
    wx.navigateTo({
      url: "/pages/dataMap/dataMap",
    })
  }
})