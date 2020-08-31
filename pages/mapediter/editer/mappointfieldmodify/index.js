const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    maths: ['加', '减', '取余', '除'],
    tparts: ['天数据', '小时数据', '天与小时数据'],
    field: {
      typ: null,
      input: {},
      kz: {}
    },
    extyp: ["普通报警", "短信报警", "电话报警", "电话+短信报警"],
    action: null,
    counts: [],
    vm: [],
    point: {},
  },
  setGroup(e) {
    let field = this.data.field
    if (!field.kz) {
      field.kz = {}
    }
    if (e.detail.value && '' !== e.detail.value) {
      field.kz.group = parseInt(e.detail.value)
    }
    else {
      delete field.kz.group
    }
    this.setData({ field: field })
  },
  setDesc(e) {
    let field = this.data.field
    if (!field.kz.group) {
      wx.showToast({
        title: '控制组不能为空哦！'
      })
    }
    else {
      if (e.detail.value && '' !== e.detail.value) {
        field.kz.desc = e.detail.value
      }
      else {
        delete field.kz.desc
      }
    }
    this.setData({ field: field })
  },
  onTypChange(e) {
    let field = this.data.field
    field.typ = parseInt(e.detail.value)
    this.setData({ field: field })
  },
  setName(e) {
    let field = this.data.field
    field.name = e.detail.value
    this.setData({ field: field })
  },
  setUnit(e) {
    let field = this.data.field
    field.unit = e.detail.value
    this.setData({ field: field })
  },
  setBit(e) {
    let field = this.data.field
    let v = e.detail.value
    try {
      field.bit = parseInt(e.detail.value)
      this.setData({ field: field })
    }
    catch (ex) {
      wx.showToast({
        title: 'bit位无效！',
      })
    }
  },
  onTPartChange(e) {
    let field = this.data.field
    field.part = parseInt(e.detail.value.index)
    this.setData({ field: field })
    console.log(e.detail.value)
  },
  getMath(m) {
    if (0 == m) {
      return 'add'
    }
    else if (1 == m) {
      return 'sub'
    }
    else if (2 == m) {
      return 'mod'
    }
    else {
      return 'div'
    }
  },
  getMathIndex(m) {
    if ('add' == m) {
      return 0
    }
    else if ('sub' == m) {
      return 1
    }
    else if ('mod' == m) {
      return 2
    }
    else if ('div' == m) {
      return 3
    }
    else {
      return null
    }
  },
  bindExTypChange: function (e) {
    let field = this.data.field
    field.level = e.detail.value
    this.setData({ field: field })
  },
  mathChange(e) {
    let field = this.data.field
    field.mathindex = e.detail.value
    field.mat = this.getMath(e.detail.value)
    console.log(field.mat)
    this.setData({ field: field })
  },
  setNumber(e) {
    if (this.data.field.mat) {
      let field = this.data.field
      try {
        field.number = parseInt(e.detail.value)
        this.setData({ field: field })
      }
      catch (ex) {
        wx.showToast({
          title: ' 运算数无效！',
        })
      }
    }
    else {
      wx.showToast({
        title: '请先选择运行！',
      })
    }

  },
  onVmChange(e) {
    let field = this.data.field
    field.vm = e.detail.value.name
    field.vmindex = e.detail.value.index
    this.setData({ field: field })
  },
  onCountChange(e) {
    console.log(e.detail.value)
    let field = this.data.field
    field.reftyp = 'count'
    field.refindex = parseInt(e.detail.value)
    this.setData({ field: field })
  },
  onFireChange(e) {
    let field = this.data.field
    field.reftyp = 'at'
    field.refgroup = 'fire'
    console.log(e.detail.value)
    field.refindex = parseInt(e.detail.value)
    field.fire = field.refindex
    this.setData({ field: field })
  },
  fireCtlChange(e) {
    let field = this.data.field
    if ('at' === field.reftyp && 'fire' === field.refgroup) {
      let flag = e.detail.value.length > 0 ? true : false
      if (flag) {
        field.ctl = true
      }
      else {
        delete field.ctl
      }
      this.setData({ field: field })
    }
    else {
      field.ctl = false
      this.setData({ field: field })
      wx.showToast({
        title: '请先设置炉子动画！',
      })
    }
  },
  systatusChange(e) {
    let field = this.data.field
      let flag = e.detail.value.length > 0 ? true : false
      if (flag) {
        field.systatus = true
      }
      else {
        delete field.systatus
      }
      this.setData({ field: field })
  
  },
  onBengChange(e) {
    let field = this.data.field
    field.reftyp = 'beng'
    field.refindex = parseInt(e.detail.value)
    field.beng = field.refindex
    this.setData({ field: field })
  },
  onFanChange(e) {
    let field = this.data.field
    field.reftyp = 'fan'
    field.refindex = parseInt(e.detail.value)
    field.fan = field.refindex
    this.setData({ field: field })
  },
  setMin(e) {
    let field = this.data.field
    try {
      let min = parseInt(e.detail.value)
      field.input.min = min
      this.setData({ field: field })
    }
    catch (ex) {
      wx.showToast({
        title: '下限输入无效！',
      })
    }
  },
  setMax(e) {
    let field = this.data.field
    try {
      let max = parseInt(e.detail.value)
      field.input.max = max
      this.setData({ field: field })
    }
    catch (ex) {
      wx.showToast({
        title: '上限输入无效！',
      })
    }
  },
  save() {
    let field = this.data.field
    if (!field.name || field.name.length < 1) {
      wx.showToast({
        title: '名称不能为空！',
      })
      return
    }
    if (null == field.typ) {
      wx.showToast({
        title: '归属未设置！',
      })
      return
    }
    if (field.mat && null == field.number) {
      wx.showToast({
        title: '运算数未设置！',
      })
      return
    }
    if (field.hasOwnProperty('fire')) {
      delete field.fire
    }
    if (field.hasOwnProperty('beng')) {
      delete field.beng
    }
    if (field.hasOwnProperty('fan')) {
      delete field.fan
    }
    if (field.mathindex) {
      delete field.mathindex
    }
    if(field.input!=null){
      if (Object.keys(field.input) < 2) {
        delete field.input
      }
    }
    if(field.kz!=null){
      if (Object.keys(field.kz) < 1) {
        delete field.kz
      }
  }
    if (field.vmindex) {
      delete field.vmindex
    }
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];  //上一个页面
    prevPage.saveField({ v: field })
    wx.navigateBack({//返回
      delta: 1
    })
  },
  setFocus(e) {
    let field = this.data.field
    field.focus = parseInt(e.detail.value)
    this.setData({ field: field })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let editpage = app.globalData.editpage
    let vc = editpage.getMapCount()
    let vms = Object.keys(vc.vm)
    let ats = editpage.getAtElements()
    let counts = []
    if(vc.count!="undefined"& vc.count!=undefined){
      for(let i = 0; i < vc.count.length; i++){
        counts[i] = vc.count[i].name
      }
    }
    this.setData({ counts: vc.count, vm: vms, fires: ats.fire, bengs: ats.beng, fans: ats.fan })
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];  //上一个页面
    let info = prevPage.getField()
    console.log(info)
    if (info.field) {
      let field = info.field
      let mation = this.getMathIndex(field.mat)
      if (null != mation) {
        field.mathindex = mation
      }
      if ('count' === field.reftyp) {
        field.count = info.field.refindex
      }
      else if ('at' === field.reftyp) {
        if ('fire' === field.refgroup) {
          field.fire = field.refindex
        }
        else if ('beng' === field.refgroup) {
          field.beng = field.refindex
        }
        else if ('fan' == field.refgroup) {
          field.fan = field.refindex
        }
      }

      if (field.vm) {
        for (let i = 0; i < vms.length; i++) {
          if (field.vm === vms[i]) {
            field.vmindex = i
            break
          }
        }
      }
      this.setData({ field: field })
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