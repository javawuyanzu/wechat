Page({

  /**
   * 页面的初始数据
   */
  data: {
    input: {
      max: null,
      min: null
    },
    open: 0,
    index: null
  },
  setMax(e) {
    let input = this.data.input
    input.max = parseInt(e.detail.value)
    this.setData({ input: input })
  },
  setMin(e) {
    let input = this.data.input
    console.log(this.data)
    input.min = parseInt(e.detail.value)
    this.setData({ input: input })
  },
  checkboxChange(e) {
    let open = e.detail.value.length > 0 ? 1 : 0
    this.setData({ open: open })
  },
  save() {
    if (this.data.open && (this.data.input.max <= this.data.input.min)) {
      wx.showToast({
        title: '测量范围输入错误！',
        icon: 'none',
        mask: true,
        duration: 2000
      })
      return
    }
    var pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];  //上一个页面
    if (this.data.open) {
      prevPage.setMapInput({ i: this.data.index, v: this.data.input })
    }
    else {
      prevPage.setMapInput({ i: this.data.index, v: null })
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
    let info = prevPage.getMapInput()
    if (info.input) {
      this.setData({ index: info.i, open: 1, input: info.input })
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