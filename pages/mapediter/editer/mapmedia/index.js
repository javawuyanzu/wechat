Page({

  /**
   * 页面的初始数据
   */
  data: {
    medias: [
      '热水',
      '蒸汽',
      '导热油',
      '热风',
      '真空'
    ],
    index: null,
    mv: null,
    vstr: null,
    name: ''
  },

  onSetVstr(e) {
    if ('' !== e.detail.value && null != e.detail.value) {
      this.setData({ vstr: e.detail.value })
    }
    else {
      this.setData({ vstr: null })
    }
  },
  onPickerChange(e) {
    this.setData({ mv: e.detail.value, name: e.detail.name })
  },
  save() {
    var pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];  //上一个页面
    if ('' !== this.data.vstr && null != this.data.vstr) {
      prevPage.setMapMedia({
        i: this.data.index, media: {
          name: 'medium',
          vstr: this.data.vstr,
          v: this.data.mv
        }
      })
    }
    else {
      prevPage.setMapMedia({
        i: this.data.index, media: {
          name: '介质',
          vstr: this.data.medias[this.data.mv],
          v: this.data.mv
        }
      })
    }

    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];  //上一个页面
    let info = prevPage.getMapMedia()
    this.setData({ index: info.i, mv: info.media.v , vstr: info.media.vstr ? info.media.vstr : '' })
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