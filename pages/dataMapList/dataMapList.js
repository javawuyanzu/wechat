const app = getApp();
Page({
  data: {
    index: null,
    mapList: [],
    openid: null
  },
  onShow: function (options) {
    var that = this
    that.setData({
      openid: app.globalData.openid
    })
    wx.request({
      url: 'https://apis.sdcsoft.com.cn/wechat/DeviceDataMap/search/author',
      method: "Get",
      data: {
        author: app.globalData.openid,
      },
      success: function (res) {
        var list = res.data.data
        var mapList = []
        for (var i in list) {
          mapList.push({ id: list[i].id, title: list[i].title, createDatetime: list[i].createDatetime, share: list[i].share, deviceDataMap: list[i].deviceDataMap, author: list[i].author })
        }
        that.setData({
          mapList: mapList
        })
      }
    })
  },
  getMap() {
    if (null != this.data.index) {
      let index = this.data.index
      return { map: JSON.parse(this.data.mapList[index].deviceDataMap) }
    } else {
      return { map: null }
    }
  },
  toedit: function (e) {
    this.setData({ index: e.currentTarget.dataset.index })
    wx.navigateTo({
      url: "/pages/mapediter/editer/editer?datamapId="+e.currentTarget.dataset.id
    })
  },
  add: function (e) {
    this.setData({ index: null })
    wx.navigateTo({
      url: "/pages/mapediter/editer/editer"
    })
  },
  saveAs: function (e) {
    this.setData({ index: e.currentTarget.dataset.index })
    wx.navigateTo({
      url: "/pages/mapediter/editer/editer"
    })
  },
})