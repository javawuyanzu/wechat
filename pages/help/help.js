Page({
  data: {
    start: "微信小程序视频讲解",
    slist: [
      { id: 0, name: "微信小程序视频讲解" },
      { id: 1, name: "锅炉厂系统视频讲解" },
    ],
    wechat: [
      { title: "安卓手机如何进入微信小程序", src: "http://www.sdcsoft.com.cn/app/gl/media/wechat/android.mp4"},
      { title: "苹果手机如何进入微信小程序", src: "http://www.sdcsoft.com.cn/app/gl/media/wechat/apple.mp4"},
      { title: "如何添加设备", src: "http://www.sdcsoft.com.cn/app/gl/media/wechat/add.mp4" },
      { title: "如何进行设备管理", src: "http://www.sdcsoft.com.cn/app/gl/media/wechat/devicemanage.mp4" },
      { title: "如何进行系统设置", src: "http://www.sdcsoft.com.cn/app/gl/media/wechat/setting.mp4" },
    ],
    boilermanage: [
      { title: "锅炉厂管理系统锅炉信息", src: "http://www.sdcsoft.com.cn/app/gl/media/boilermanage/glc_glxx.mp4" },
      { title: "锅炉厂管理系统客户管理", src: "http://www.sdcsoft.com.cn/app/gl/media/boilermanage/glc_khgl.mp4" },
      { title: "锅炉厂管理系统配置", src: "http://www.sdcsoft.com.cn/app/gl/media/boilermanage/glc_pz.mp4" },
      { title: "锅炉厂管理系统人员管理", src: "http://www.sdcsoft.com.cn/app/gl/media/boilermanage/glc_rygl.mp4" },
      { title: "锅炉厂管理系统维保功能", src: "http://www.sdcsoft.com.cn/app/gl/media/boilermanage/glc_wbxx.mp4" },
      { title: "锅炉管理系统安装", src: "http://www.sdcsoft.com.cn/app/gl/media/boilermanage/glc_anz.mp4" },
      { title: "锅炉管理系统大数据", src: "http://www.sdcsoft.com.cn/app/gl/media/boilermanage/glc_dsj.mp4" },
      { title: "锅炉管理系统监控功能", src: "http://www.sdcsoft.com.cn/app/gl/media/boilermanage/glc_jkgn.mp4" },
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
