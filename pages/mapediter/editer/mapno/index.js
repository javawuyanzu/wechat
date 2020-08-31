Page({

  /**
   * 页面的初始数据
   */
  data: {
    open: 0,
    no: null,
    index: null
  },
  setNo(e) {
    this.setData({ no: e.detail.value })
  },
  checkboxChange(e) {
    let open = e.detail.value.length > 0 ? 1 : 0
    this.setData({ open: open })
  },
  save() {
    var pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];  //上一个页面
    if (this.data.open) {
      prevPage.setMapNo({ i: this.data.index, v: this.data.no })
    }
    else {
      prevPage.setMapNo({ i: this.data.index, v: null })
    }
    wx.navigateBack({
      delta: 1
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //this.setData({ name: options.data, index: options.index })
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];  //上一个页面
    let info = prevPage.getMapNo()
    if (info.no) {
      this.setData({ index: info.i, open: 1, no: info.no })
    }
    else {
      this.setData({ index: info.i })
    }
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