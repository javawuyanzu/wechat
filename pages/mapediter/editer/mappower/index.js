// pages/mapediter/editer/mappower/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    powers: [
      '油气',
      '电',
      '煤',
      '生物质',
      '余热',
      '换热器'
    ],
    index: null,
    pv: null,
    vstr: null,
    name:''
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
    this.setData({ pv: e.detail.value,name:e.detail.name })
  },
  save() {
    var pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];  //上一个页面
    // console.log('-------------')
    // console.log(this.data.vstr)
    if('' !== this.data.vstr && null != this.data.vstr){
      prevPage.setMapPower({
        i: this.data.index, power: {
          name: 'power',
          vstr: this.data.vstr,
          v: this.data.pv
        }
      })
    }
    else{
      prevPage.setMapPower({
        i: this.data.index, power: {
          name: '燃料',
          vstr: this.data.powers[this.data.pv],
          v: this.data.pv
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
    let info = prevPage.getMapPower()
    console.log(info)
    this.setData({ index: info.i, pv:info.power.v , vstr: info.power.vstr ? info.power.vstr : '' })
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