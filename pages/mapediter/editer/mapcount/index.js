Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: null,
    action: null,
    vm: [],
    count: {},
    counts: null
  },
  setName(e) {
    let count = this.data.count
    count.name = e.detail.value
    this.setData({ count: count })
  },
  onTypChange(e) {
    let count = this.data.count
    count.typ = e.detail.value
    this.setData({ count: count })
  },
  onVmChange(e) {
    console.log(e.detail.value)
    let count = this.data.count
    count.v = e.detail.value.index
    this.setData({ count: count })
  },
  onFgChange(e) {
    //this.setData({ fg: e.detail.value })
    let count = this.data.count
    count.fg = e.detail.value
    console.log(count)
    this.setData({ count: count })
    this.pickerfn.changeFg(e.detail.value)
  },
  onFnChange(e) {
    //this.setData({ fg: e.detail.value })
    let count = this.data.count
    count.fn = e.detail.value
    this.setData({ count: count })
  },
  setFocus(e) {
    let count = this.data.count
    count.focus = parseInt(e.detail.value)
    this.setData({ count: count })
  },
  adapterCount() {
    let count = this.data.count
    count.fn = count.fg + '-' + count.fn
    delete count.fg
    count.vm = this.data.vm[count.vm]
    count.v = 0
    count.vstr = ''
    return count
  },
  modifyCount() {
    if (Object.keys(this.data.count).length >= 6) {
      let i = this.data.action
      let count = this.adapterCount()
      let counts = this.data.counts ? this.data.counts : []
      console.log(counts.length)
      if (counts.length > i) {
        counts.splice(i, 1, count)
      }
      else{
        counts.push(count)
      }
      this.setData({ counts: counts, count: {}, action: null })
      this.save()
    }
  },
  createCount() {
    if (Object.keys(this.data.count).length >= 5) {
      let count = this.adapterCount()
      let counts = this.data.counts ? this.data.counts : []
      counts.push(count)
      this.setData({ counts: counts, count: {}, action: null })
      this.save()
    }
    else {
      wx.showToast({
        title: '计算项不完整，无法添加！',
      })
    }
  },
  add() {
    if (null != this.data.action) {
      //修改操作
      this.modifyCount()
    }
    else {
      //新建操作
      this.createCount()
    }
  },
  modify(e) {
    let counts = this.data.counts
    let count = counts[e.currentTarget.dataset.index]
    for (let i = 0; i < this.data.vm.length; i++) {
      if (this.data.vm[i] === count.vm) {
        count.vm = i
        break;
      }
    }
    let fs = count.fn.split('-')
    count.fg = fs[0]
    count.fn = fs[1]
    this.pickerfn.changeFg( count.fg)
    this.setData({ count: count, action: e.currentTarget.dataset.index })
  },
  sub(e) {
    let counts = this.data.counts
    let index = e.currentTarget.dataset.index
    counts.splice(index, 1)
    this.setData({ counts: counts })
    this.save()
  },
  save() {
    let counts = null
    if (this.data.counts && this.data.counts.length > 0) {
      counts = this.data.counts
    }
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];  //上一个页面
    prevPage.setMapCount({ i: this.data.index, v: counts })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];  //上一个页面
    let info = prevPage.getMapCount()
    this.setData({ index: info.i })
    console.log(info)
    if (info.vm) {
      this.setData({ vm: Object.keys(info.vm) })
    }
    if (info.count) {
      
      this.setData({ counts: info.count })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.pickerfn = this.selectComponent('#pickerfn')
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