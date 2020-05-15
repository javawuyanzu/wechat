Page({
  data: {
    
    start: "微信小程序视频讲解",
    slist: [
      { id: 0, name: "微信小程序视频讲解" },
      { id: 1, name: "锅炉厂系统视频讲解" },
    ],
    wechat: [
      { id: 1, title: "安卓手机如何进入小程序", src: "http://www.sdcsoft.com.cn/app/gl/media/wechat/android.mp4"},
      { id: 2,title: "苹果手机如何进入小程序", src: "http://www.sdcsoft.com.cn/app/gl/media/wechat/apple.mp4"},
      { id: 3, title: "如何添加锅炉", src: "http://www.sdcsoft.com.cn/app/gl/media/wechat/add.mp4" },
      { id: 4, title: "如何进行锅炉管理", src: "http://www.sdcsoft.com.cn/app/gl/media/wechat/devicemanage.mp4" },
      { id: 5,title: "如何进行系统设置", src: "http://www.sdcsoft.com.cn/app/gl/media/wechat/setting.mp4" },
      { id: 6, title: "收费服务介绍", src: "http://www.sdcsoft.com.cn/app/gl/media/wechat/service.mp4" },
      { id: 7, title: "如何购买收费服务", src: "http://www.sdcsoft.com.cn/app/gl/media/wechat/servicepay.mp4" },
    ],
    boilermanage: [
      { id: 1,title: "锅炉厂管理系统锅炉信息", src: "http://www.sdcsoft.com.cn/app/gl/media/boilermanage/glc_glxx.mp4" },
      { id: 2,title: "锅炉厂管理系统客户管理", src: "http://www.sdcsoft.com.cn/app/gl/media/boilermanage/glc_khgl.mp4" },
      { id: 3,title: "锅炉厂管理系统配置", src: "http://www.sdcsoft.com.cn/app/gl/media/boilermanage/glc_pz.mp4" },
      { id: 4, title: "锅炉厂管理系统人员管理", src: "http://www.sdcsoft.com.cn/app/gl/media/boilermanage/glc_rygl.mp4" },
      { id: 5, title: "锅炉厂管理系统维保功能", src: "http://www.sdcsoft.com.cn/app/gl/media/boilermanage/glc_wbxx.mp4" },
      { id: 6,title: "锅炉管理系统安装", src: "http://www.sdcsoft.com.cn/app/gl/media/boilermanage/glc_anz.mp4" },
      { id: 7, title: "锅炉管理系统大数据", src: "http://www.sdcsoft.com.cn/app/gl/media/boilermanage/glc_dsj.mp4" },
      { id: 8,title: "锅炉管理系统监控功能", src: "http://www.sdcsoft.com.cn/app/gl/media/boilermanage/glc_jkgn.mp4" },
    ],
    isstart: false,
    index:0,
    openimg: "../../images/xia.png",
    offimg: "../../images/shang.png"
  },
  opens: function (e) {
    switch (e.currentTarget.dataset.item) {
      case "1":
        if (this.data.isstart) {
          this.setData({
            isstart: false,
          });
        }
        else {
          this.setData({
            isstart: true,
          });
        }
        break;
    }
  },
  calling1: function () {
    wx.makePhoneCall({
      phoneNumber: '18254809623',
    })
  },
  calling2: function () {
    wx.makePhoneCall({
      phoneNumber: '18888281821',
    })
  },
  calling3: function () {
    wx.makePhoneCall({
      phoneNumber: '15153872106',
    })
  },
  getLocation: function () {
    wx.openLocation({
      latitude: 36.15,
      longitude: 117.12,
      name: "山东简洁软件有限公司",
      address: "山东省泰安市泰山区田园大街中段",
      scale: 28
    })
  },
  toVideo: function (e) {
    wx.navigateTo({
      url: "/pages/video/video?title=" + e.currentTarget.dataset.title + "&src=" + e.currentTarget.dataset.src,
    })
    
  },
  onclicks1: function (e) {

    var index = e.currentTarget.dataset.index;
    let name = this.data.slist[index].name;
    this.setData({
      index: index,
      isstart: false,
      start: this.data.slist[index].name,
    })
  }
})
