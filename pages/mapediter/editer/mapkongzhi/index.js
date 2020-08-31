Page({

  /**
   * 页面的初始数据
   */
  data: {
    tags: ['线圈', '保持寄存器'],
    modes: [],
    action: null,
    kongzhi: {},
    index: null,
    kongzhis: null
  },
  initModes(typ) {
    let modes = this.data.modes
    if (typ) {
      modes = ['整数', '浮点数', '长整数']
    } else {
      modes = ['字节']
    }
    return modes
  },
  onTagChange(e) {
    let kz = this.data.kongzhi
    kz.typ = parseInt(e.detail.value)
    let modes = this.initModes(kz.typ)
    this.setData({ kongzhi: kz, modes: modes, tagindex: e.detail.value })
  },
  onModeChange(e) {
    let kz = this.data.kongzhi
    let v = parseInt(e.detail.value)
    if (kz.typ) {
      kz.mode = v + 1
    }
    else {
      kz.mode = v
    }
    this.setData({ kongzhi: kz, modeindex: v })
  },
  setName(e) {
    let kz = this.data.kongzhi
    kz.name = e.detail.value
    this.setData({ kongzhi: kz })
  },
  setAddr(e) {
    let kz = this.data.kongzhi
    kz.addr = e.detail.value
    this.setData({ kongzhi: kz })
  },
  setGroup(e) {
    let kz = this.data.kongzhi
    kz.group = e.detail.value
    this.setData({ kongzhi: kz })
  },
  setDesc(e) {
    let kz = this.data.kongzhi
    kz.desc = e.detail.value
    this.setData({ kongzhi: kz })
  },
  modifyKongZhi() {
    if (Object.keys(this.data.kongzhi).length >= 5) {
      let i = this.data.action
      let kongzhi = this.data.kongzhi
      let kongzhis = this.data.kongzhis ? this.data.kongzhis : []
      console.log(kongzhis.length)
      if (kongzhis.length > i) {
        kongzhis.splice(i, 1, kongzhi)
      }
      else {
        kongzhis.push(kongzhi)
      }
      this.setData({ kongzhis: kongzhis, kongzhi: {}, action: null, tagindex: null, modeindex: null })
      this.save()
    }
  },
  createKongZhi() {
    if (Object.keys(this.data.kongzhi).length >= 5) {
      let kongzhi = this.data.kongzhi
      let kongzhis = this.data.kongzhis ? this.data.kongzhis : []
      kongzhis.push(kongzhi)
      this.setData({ kongzhis: kongzhis, kongzhi: {}, action: null, tagindex: null, modeindex: null })
      this.save()
    }
    else {
      wx.showToast({
        title: '控制点不完整，无法添加！',
      })
    }
  },
  add() {
    if (null != this.data.action) {
      //修改操作
      this.modifyKongZhi()
    }
    else {
      //新建操作
      this.createKongZhi()
    }
  },
  modify(e) {
    let kongzhis = this.data.kongzhis
    let kongzhi = kongzhis[e.currentTarget.dataset.index]
    let modes = this.initModes(kongzhi.typ)
    let modeindex = kongzhi.mode
    if(kongzhi.typ){
      modeindex--
    }
    console.log(kongzhi)
    this.setData({ kongzhi: kongzhi, action: e.currentTarget.dataset.index, modes: modes, tagindex: kongzhi.typ, modeindex: modeindex })
  },
  sub(e) {
    let kongzhis = this.data.kongzhis
    let index = e.currentTarget.dataset.index
    kongzhis.splice(index, 1)
    this.setData({ kongzhis: kongzhis })
    this.save()
  },
  save() {
    let kongzhis = null
    if (this.data.kongzhis && this.data.kongzhis.length > 0) {
      kongzhis = this.data.kongzhis
    }
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];  //上一个页面
    prevPage.setMapKongZhi({ i: this.data.index, v: kongzhis })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];  //上一个页面
    let info = prevPage.getMapKongZhi()
    this.setData({ index: info.i })
    console.log(info)
    if (info.kongzhi) {
      this.setData({ kongzhis: info.kongzhi })
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