const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: null,
    points: {},
    action: null,
    key: null
  },

  goadd() {
    this.setData({ action: null, key: null })
    wx.navigateTo({
      url: '../mappointmodify/index'
    })
  },
  gomodify(e) {
    console.log(e.currentTarget.dataset.index)
    this.setData({ action: 1, key: e.currentTarget.dataset.index })
    wx.navigateTo({
      url: '../mappointmodify/index'
    })
  },
  gofieldlist(e) {
    this.setData({ action: 1, key: e.currentTarget.dataset.index })
    wx.navigateTo({
      url: '../mappointfieldlist/index'
    })
  },
  getKey() {
    return this.data.key
  },
  // getFields() {
  //   return { key: this.data.key,fields: this.data.points[this.data.key].fields }
  // },
  // setPointFields(e) {
  //   let fields = e.v
  //   let points = this.data.points
  //   points[this.data.key].fields = fields
  //   this.setData({points:points})
  //   this.save(4)
  // },
  sub(e) {
    let key = e.currentTarget.dataset.index
    let points = this.data.points
    delete points[key]
    this.setData({ points: points })
    this.save()
  },
  getPoint() {
    if (!this.data.action) {
      return { point: null }
    }
    else {
      return { point: this.data.points[this.data.key], addr: this.data.key }
    }
  },
  savePoint(e) {
    let point = e.v
    let key = point.addr
    delete point.addr
    let points = this.data.points
    points[key] = point
    console.log(points)
    this.setData({ points: points })
    this.save()
  },
  save() {
    let editpage = app.globalData.editpage
    let points = this.data.points
    editpage.setMapPoints({ i: this.data.index, v: points })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let editpage = app.globalData.editpage
    let info = editpage.getMapPoints()
    this.setData({ index: info.i ,points: info.points })
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