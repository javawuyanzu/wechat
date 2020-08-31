Page({

  /**
   * 页面的初始数据
   */
  data: {
    beng:[]
  },
  onSave(e){
    let beng = e.detail.value
    //console.log(beng)
    var pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];  //上一个页面
    if (beng && beng.length > 0) {
      prevPage.setMapAtBeng({ i: this.data.index, v: beng })
    }
    else{
      prevPage.setMapAtBeng({ i: this.data.index, v: null })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];  //上一个页面
    let info = prevPage.getMapAtBeng()
    if (info.beng) {
      this.setData({ index: info.i, beng: info.beng })
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