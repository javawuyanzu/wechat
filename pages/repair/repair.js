var app = getApp()

const plugin = requirePlugin('WechatSI');
//获取全局唯一的语音识别管理器recordRecoManager
const manager = plugin.getRecordRecognitionManager();

Page({

  /**
   * 页面的初始数据
   * navto : 是否去选择分类
   * 
   */
  data: {
    recordState: false, //录音状态f
    title: "",
    description: "",
    imageUrl: [],
    btncolor: "#1AAD19",
    limit: [{
      beyondStyle: "#9494A2",
      current: 0,
      maxlength: 15
    }, {
      beyondStyle: "#9494A2",
      current: 0,
      maxlength: 1000
    }],
    autoload: 1,
    deviceNo:null,
  },
 
  inputDescription: function (e) {
    var v = e.detail.value
    this.data.limit[1].current = v.length
    if (v.length >= 1000) {
      this.data.limit[1].beyondStyle = "red"
    } else {
      this.data.limit[1].beyondStyle = "#9494A2"
    }
    this.setData({
      limit: this.data.limit
    })
  },
  
  
  formsubmit: function (e) {
    var that = this
      var data = e.detail.value
      if (data.description == "") {
        wx.showToast({
          title: '未填写维保信息',
          icon: "none"
        })
      }else if (this.imgupload.data.image.length>5) {
        wx.showToast({
          title: '最多上传五张图片',
          icon: "none"
        })
      }else if (this.imgupload.data.image.length == 0) {
        wx.showToast({
          title: '未添加图片',
          icon: "none"
        })
      } else {
        console.log("deviceNo:" + that.data.deviceNo)
        console.log("latitude:" + that.data.latitude)
        console.log("longitude:" + that.data.longitude)
        console.log("description:" + that.data.description)
        console.log("openid:" + app.globalData.openid)
        //确认发布
        var image = that.imgupload.data.image
        var rs = 0
        wx.showLoading({
          title: '图片上传中',
          success: function () {
            var imgupload = new Array()
            for (var i = 0; i < image.length; i++) {
              wx.uploadFile({
                url: 'http://127.0.0.1:8080/webapi/wechat/Repair/uploadFile',
                filePath: image[i],
                name: 'file',
                header: {
                  "content-type": "multipart/form-data",
                },
                formData: {
                  repairId: "E:/pic/"
                },
                success: function (res) {
                  console.log()
                 
                  if (JSON.parse(res.data).code == 0) {
                    rs++
                    imgupload[rs - 1] = res.data.filePath
                  } else if (JSON.parse(res.data).code == -1) {
                    wx.showToast({
                      title: '图片上传失败',
                      icon: 'none'
                    })
                  }
                  if (rs == image.length) {
                    wx.hideLoading()
                    wx.switchTab({
                      url: '../deviceList/deviceList'
                    })
                  }
                },
                fail: function () {
                  wx.showToast({
                    title: '网络开小差了，请重试',
                    icon: 'none'
                  })
                }

              })
            }
          }
        })

      }
  },
 

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //获取imgupload组件
    this.imgupload = this.selectComponent("#imgupload");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onLoad: function (options) {
    var that=this
    that.initRecord();
    wx.request({
      //获取openid接口   
      url: 'https://apis.sdcsoft.com.cn/wechat/user/find/openId',
      data: {
        openId: app.globalData.openid,
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        if (res.data.code == 0) {
          var list = res.data.data
          if (list.length > 0) {
            for (var i in list) {
              if (list[i].unionId != null) {
                

                
              }
            }
          }
        }
      }
    })
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        var latitude = res.latitude//维度
        var longitude = res.longitude//经度
        that.setData({
          latitude: latitude,
          longitude: longitude,
          deviceNo: options.deviceNo
        })
      }
    })
  },
  conInput: function (e) {
    this.setData({
      content: e.detail.value,
    })
  },
  //识别语音 -- 初始化
  initRecord: function () {
    const that = this;
    // 有新的识别内容返回，则会调用此事件
    manager.onRecognize = function (res) {
      console.log(res)
    }
    // 正常开始录音识别时会调用此事件
    manager.onStart = function (res) {
      console.log("成功开始录音识别", res)
    }
    // 识别错误事件
    manager.onError = function (res) {
      console.error("error msg", res)
    }
    //识别结束事件
    manager.onStop = function (res) {
      // console.log('..............结束录音')
      // console.log('录音临时文件地址 -->' + res.tempFilePath);
      // console.log('录音总时长 -->' + res.duration + 'ms');
      // console.log('文件大小 --> ' + res.fileSize + 'B');
      // console.log('语音内容 --> ' + res.result);
      if (res.result == '') {
        wx.showModal({
          title: '提示',
          content: '听不清楚，请重新说一遍！',
          showCancel: false,
          success: function (res) { }
        })
        return;
      }
      var text = that.data.description + res.result;
      console.log(text.length)
    
      that.data.limit[1].current = text.length

      if (text.length >= 1000) {
        that.data.limit[1].beyondStyle = "red"
      } else {
        that.data.limit[1].beyondStyle = "#9494A2"
      }
      
      that.setData({
        description: text,
        limit: that.data.limit
      })
    }
  },
  //语音  --按住说话
  touchStart: function (e) {
    this.setData({
      recordState: true  //录音状态
    })
    // 语音开始识别
    manager.start({
      lang: 'zh_CN',// 识别的语言，目前支持zh_CN en_US zh_HK sichuanhua
    })
  },
  //语音  --松开结束
  touchEnd: function (e) {
    this.setData({
      recordState: false
    })
    // 语音结束识别
    manager.stop();
  },

})