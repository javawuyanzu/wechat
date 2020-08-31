// pages/mapediter/editer/mapatfire/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    types: [
      '无火',
      '一段火',
      '二段火'
    ],
    index: null,
    typ: null,
    fire: []
  },
  bindPickerChange(e) {
    this.setData({ typ: e.detail.value })
  },
  add() {
    if (this.data.typ) {
      let fire = this.data.fire
      fire.push({ name: '炉子', typ: this.data.typ, amount: 1, v: 0 })
      this.setData({ fire: fire, typ: null })
      this.save()
    }
  },
  sub(e) {
    let fire = this.data.fire
    let index = e.currentTarget.dataset.index
    fire.splice(index, 1)
    this.setData({ fire: fire, typ: null })
    this.save()
  },
  save() {
    let fire = this.data.fire
    let fires = null
    if (fire.length > 0) {
      fires = fire
    }
    var pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];  //上一个页面
    prevPage.setMapAtFire({ i: this.data.index, v: fires })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];  //上一个页面
    let info = prevPage.getMapAtFire()
    // console.log('mmmmmmmm')
    // console.log(info.fire)
    if (info.fire) {
      this.setData({ index: info.i, fire: info.fire })
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