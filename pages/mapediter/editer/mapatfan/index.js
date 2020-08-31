Page({

  /**
   * 页面的初始数据
   */
  data: {
    fan:[]
  },
  onSave(e){
    let fan = e.detail.value
    //console.log(fan)
    var pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];  //上一个页面
    if (fan && fan.length > 0) {
      prevPage.setMapAtFan({ i: this.data.index, v: fan })
    }
    else{
      prevPage.setMapAtFan({ i: this.data.index, v: null })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];  //上一个页面
    let info = prevPage.getMapAtFan()
    if (info.fan) {
      this.setData({ index: info.i, fan: info.fan })
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