Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: null,
    name: null,
    dingshis: []
  },
  setName(e) {
    this.setData({ name: e.detail.value })
  },

  add() {
    console.log(this.data.name)
    if (this.data.name) {
      let es = this.data.dingshis
      es.push({ name: this.data.name, h: '', m: '' })
      this.setData({ dingshis: es, name: null })
      this.save()
    }
  },
  sub(e) {
    let es = this.data.dingshis
    let index = e.currentTarget.dataset.index
    es.splice(index, 1)
    this.setData({ dingshis: es })
    this.save()
  },
  save() {
    let es = this.data.dingshis
    let dingshis = null
    if (es.length > 0) {
      dingshis = es
    }
    var pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];  //上一个页面
    prevPage.setMapDingShi({ i: this.data.index, v: dingshis })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];  //上一个页面
    let info = prevPage.getMapDingShi()
    console.log(info)
    if (info.dingshi) {
      this.setData({ index: info.i, dingshis: info.dingshi })
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