Page({
  /**
   * 页面的初始数据
   */
  data: {
    index: null,
    element: {
      typ: null,
      name: null,
      vstr: null
    },
    elements: []
  },
  onTypChange(e) {
    let element = this.data.element
    element.typ = e.detail.value
    this.setData({ element: element })
  },
  setName(e) {
    let element = this.data.element
    element.name = e.detail.value
    this.setData({ element: element })
  },
  setVStr(e) {
    let element = this.data.element
    element.vstr = e.detail.value
    this.setData({ element: element })
  },
  add() {
    console.log(this.data.element)
    if (this.data.element.typ != null &&
      null != this.data.element.name &&
      null != this.data.element.vstr &&
      this.data.element.name.length &&
      this.data.element.vstr.length
    ) {
      let es = this.data.elements
      es.push(this.data.element)
      this.setData({ elements: es })
      this.save()
    }
    else{
      wx.showToast({
        title: '静态值不完整！',
      })
    }


  },
  sub(e) {
    let es = this.data.elements
    let index = e.currentTarget.dataset.index
    es.splice(index, 1)
    this.setData({ elements: es })
    this.save()
  },
  save(){
    let es = this.data.elements
    let fixs = null
    if (es.length > 0) {
      fixs = es
    }
    var pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];  //上一个页面
    prevPage.setMapFix({ i: this.data.index, v: fixs })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];  //上一个页面
    let info = prevPage.getMapFix()
    console.log(info)
    if (info.fixs) {
      this.setData({ index: info.i, elements: info.fixs })
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