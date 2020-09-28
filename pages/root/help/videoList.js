// pages/help/videoList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      title:"",
      engTitle:"",
      videoList:[],
      wechat: [
        { id: 1, title: "安卓手机如何进入小程序", src: "m0972edodds"},
        { id: 2,title: "苹果手机如何进入小程序", src: "v0972igu4o9"},
        { id: 3, title: "如何添加锅炉", src: "h0972xuqyzb" },
        { id: 4, title: "如何进行锅炉管理", src: "f0972zhc1ef" },
        { id: 5,title: "如何进行系统设置", src: "h09722ubph1" },
      ],
      boilermanage: [
        { id: 1,title: "锅炉厂管理系统锅炉信息", src: "c0972ct99j0" },
        { id: 2,title: "锅炉厂管理系统客户管理", src: "j0972ekfgwv" },
        { id: 3,title: "锅炉厂管理系统配置", src: "g0972e6jke2" },
        { id: 4, title: "锅炉厂管理系统人员管理", src: "s09724kqeq1" },
        { id: 5, title: "锅炉厂管理系统维保功能", src: "z09720tgf31" },
        { id: 6,title: "锅炉管理系统安装", src: "d0972672lj6" },
        { id: 7, title: "锅炉管理系统大数据", src: "l0972e6hew2" },
        { id: 8,title: "锅炉管理系统监控功能", src: "e0972drfiu0" },
      ],
      wechatcustomer: [
        { id: 1,title: "微信锅炉厂操作", src: "o3156vz1qan" },
        { id: 2,title: "微信锅炉厂注册", src: "w3156tpak5t" }
      ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     var that=this 
    if(options.title=='wechat'){
      that.setData({
        title:"微信小程序视频讲解",
        engTitle:"WeChat Video Help",
        videoList:that.data.wechat
      })
    }else if(options.title=='wechatcustomer'){
      that.setData({
        title:"微信小程序锅炉厂管理视频讲解",
        engTitle:"WeChat Customer Video Help",
        videoList:that.data.wechatcustomer
      })
    }else{
      that.setData({
        title:"锅炉厂系统视频讲解",
        engTitle:"Boiler Video Help",
        videoList:that.data.boilermanage
      })
    }
  },

})