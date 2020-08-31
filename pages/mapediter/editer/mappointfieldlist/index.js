const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    key: null,
    index: null,
    fields: [],
    action: null
  },
  goadd() {
    this.setData({ action: null, index: null })
    wx.navigateTo({
      url: '../mappointfieldmodify/index'
    })
  },
  gomodify(e) {
    console.log(e.currentTarget.dataset.index)
    this.setData({ action: 1, index: e.currentTarget.dataset.index })
    wx.navigateTo({
      url: '../mappointfieldmodify/index'
    })
  },
  sub(e) {
    let index = e.currentTarget.dataset.index
    let fields = this.data.fields
    fields.splice(index, 1)
    console.log(fields)
    this.setData({ fields: fields })
    this.save()
  },
  getField() {
    if (!this.data.action) {
      return { field: null }
    }
    else {
      return { field: this.data.fields[this.data.index] }
    }
  },
  saveField(e) {
    let field = e.v
    let index = this.data.index
    let fields = this.data.fields
    if (this.data.action) {
      fields[index] = field
    }
    else {
      console.log(fields)
      fields.push(field)
    }
    console.log(fields)
    this.setData({ fields: fields, action: null, index: null })
    this.save()
  },
  save() {
    let editpage = app.globalData.editpage
    editpage.setMapPointFields({ key: this.data.key, fields: this.data.fields })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let editpage = app.globalData.editpage
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];  //上一个页面
    let key = prevPage.getKey()
    console.log(key)
    let info = editpage.getMapPointFields(key)

    console.log(info)
    this.setData({ key: key, fields: info.fields })
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