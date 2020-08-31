// pages/mapediter/editer/mapshare/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    share: 1,
    index: null
  },
  checkboxChange(e) {
    let share = e.detail.value.length > 0 ? 0 : 1
    console.log(share)
    this.setData({ share: share })
  },
  save() {
    var pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];  //上一个页面
    console.log(this.data.share)
    prevPage.setMapShare({i:this.data.index, v:this.data.share})
    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];  //上一个页面
    let info = prevPage.getMapShare()
    console.log(info.share )
    this.setData({ index: info.i, share: info.share })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})