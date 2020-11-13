Page({

  /**
   * 页面的初始数据
   */
  data: {
    typs: ['字节', '整数', '浮点数', '长整数'],
    endians: [],
    action: null,
    point: {},
  },
  initEndians(typ) {
    let endians = this.data.endians
    let point = this.data.point

    if (0 == typ) {
      endians = ['A']
      point.endina = 0
    } else if (1 == typ) {
      endians = ['AB', 'BA']
      point.endina = 0
    }
    else {
      endians = ['AB CD', 'DC BA', 'CD AB']
      point.endina = 0
    }

    this.setData({ point: point, endianindex: 0 })
    return endians
  },
  onTypChange(e) {
    let point = this.data.point
    point.typ = parseInt(e.detail.value)
    let endians = this.initEndians(point.typ)
    this.setData({ point: point, endians: endians, typindex: e.detail.value })
  },
  onEndianChange(e) {
    let point = this.data.point
    let v = parseInt(e.detail.value)
    point.endina = v
    this.setData({ point: point, endianindex: v })
  },
  setMask(e) {
    let point = this.data.point
    point.mask = parseInt(e.detail.value)
    this.setData({ point: point })
  },
  setAddr(e) {
    let point = this.data.point
    point.addr = e.detail.value
    this.setData({ point: point })
  },
  save() {
    if (Object.keys(this.data.point).length >= 3) {
      let point = this.data.point
      console.log(point)
      let pages = getCurrentPages();
      let prevPage = pages[pages.length - 2];  //上一个页面
      prevPage.savePoint({ v: point })
      wx.navigateBack({//返回
        delta: 1
      })
    }
    else {
      wx.showToast({
        title: '点位信息设置不完整！',
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];  //上一个页面
    let info = prevPage.getPoint()
    console.log(info)
    if (info.point) {//创建操作
      let point = info.point
      point.addr = info.addr
      let endians = this.initEndians(point.typ)
      this.setData({ point: point, typindex: point.typ, endians: endians, endianindex: point.endina })
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