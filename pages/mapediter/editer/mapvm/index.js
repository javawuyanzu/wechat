// pages/mapediter/editer/pagevmlist/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: null,
    key: null,
    value: null,
    list: {},
    vma: {},
    vm: {}
  },
  setName(e) {
    let name = this.data.name
    name = e.detail.value
    this.setData({ name: name })
  },
  setKey(e) {
    let key = this.data.key
    key = e.detail.value
    this.setData({ key: key })
  },
  setValue(e) {
    let value = this.data.value
    value = e.detail.value
    this.setData({ value: value })
  },
  addlist() {
    let ls = this.data.list
    if (this.data.key && this.data.key.length && this.data.value && this.data.value.length) {
      ls[this.data.key+''] = this.data.value
      console.log(ls)
      this.setData({ key: null, value: null, list: ls })
    }
  },
  create() {
    let vm = this.data.vm
    if(this.data.key!=null& this.data.key!=null){
      this.addlist()
    }
    if (Object.keys(this.data.list).length > 0) {
      vm[this.data.name] = this.data.list
      let vma = this.initVma(vm)
      this.save()
      this.setData({
        list: {}, vm: vm, vma: vma,name:""
      })
     
    }
  },
  sublist(e) {
    let ls = this.data.list
    delete ls[e.currentTarget.dataset.key]
    this.setData({ list: ls })
  },
  subvm(e) {
    let vm = this.data.vm
    delete vm[e.currentTarget.dataset.key]
    let vma = this.initVma(vm)
    this.setData({ vm: vm, vma: vma })
    this.save()
  },
  save() {
    let vms = null
    if (Object.keys(this.data.vm).length > 0) {
      vms = this.data.vm
    }
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];  //上一个页面
    prevPage.setMapVm({ i: this.data.index, v: vms })
  },
  initVma(vm) {
    let vma = {}
    for (let key in vm) {
      vma[key] = []
      for (let j in vm[key]) {
        vma[key].push(j + '->' + vm[key][j])
      }
    }
    return vma
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];  //上一个页面
    let info = prevPage.getMapVm()
    let vma = this.initVma(info.vm)
    this.setData({ index: info.i, vm: info.vm, vma: vma })
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