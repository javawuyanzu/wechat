// pages/mapediter/editer/mapshare/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typs: ['只有天数据', '只有小时数据', '同时含有天、小时数据'],
    open: 0,
    sysrun: {
      name: '系统运行时间',
      typ: null,
      vstr: ''
    }
  },
  checkboxChange(e) {
    let open = e.detail.value.length > 0 ? 1 : 0
    this.setData({ open: open })
  },
  onTypChange(e) {
    let sys = this.data.sysrun
    sys.typ = parseInt(e.detail.value)
    this.setData({ sysrun: sys, tindex: sys.typ })
  },
  setName(e) {
    let name = e.detail.value
    if ('' !== name && null != name) {
      let run = this.data.sysrun
      run.name = name
      this.setData({ sysrun: run })
    }
  },
  save() {
    var pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];  //上一个页面
    if (this.data.open) {
      prevPage.setMapSysRun({ i: this.data.index, v: this.data.sysrun })
    }
    else {
      prevPage.setMapSysRun({ i: this.data.index, v: null })
    }
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
    let info = prevPage.getMapSysRun()
    if (info.sysrun) {
      this.setData({ index: info.i, open: 1, sysrun: info.sysrun })
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