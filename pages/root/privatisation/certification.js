//index.js
//获取应用实例
const app = getApp()
const util = require('../../..//utils/util.js')
Page({
  data: {
    timeText: '获取验证码', //倒计时 
    timeNum:'',
    seconds: "", 
    timer: '' ,
    name: '',
    unionId:"",
    verificationCode:null,
    yanzheng:null,
    referralCode:"",
    phone: '',
    empower:true,
    deviceNo:"",
    getCode: false
  },
  //事件处理函数
  onLoad: function (options) { 
    var that = this
    that.setData({
      deviceNo:options.deviceNo
    })
  },

  getNewCode: function () {
    let that=this
    if (!(/^1[34578]\d{9}$/.test(that.data.phone))) {
      wx.showToast({
        title: '手机号有误',
        icon: 'none',
        duration: 2000
      })
    
  } 
   else if(that.data.phone==""||that.data.phone==null){
       wx.showToast({
                        title:  "请输入手机号",
                        icon:  'none',
                        duration:  2000
                    });
    }else{
      wx.request({
                  url:  'https://apis.sdcsoft.com.cn/wechat/user/reg/sms/zh',
                  method:  "GET",
                  data:  {
                    number:that.data.phone
                  },
                  header:  {
                      'content-type':  'application/x-www-form-urlencoded'
                  },
                  success:  function  (res)  {
                      if  (res.data.code == 1) {
                          wx.showToast({
                              title:  "发送失败",
                              icon:  'none',
                              duration:  2000
                          });
                      } else {
                          that.setData({
                              verificationCode:  res.data.data
                          })
                          wx.showToast({
                              title:  "短信验证码已发送",
                              icon:  'none',
                              duration:  2000
                          });
                      }
                  }
              })
      
      // 开始倒计时
      that.setData({ 
        getCode: true,
        seconds: 60,
        timer: setInterval(function(){
          let seconds = that.data.seconds
          that.setData({ seconds: seconds - 1 })
          if (that.data.seconds == 0) {
            // 读秒结束 清空计时器
            clearInterval(that.data.timer)
            that.setData({
              getCode: false,
              seconds: "",
            })
          }
        }, 1000)
      })
    }
  },
  nameInput: function (e) {
    let that = this
    that.setData({
      name: e.detail.value,
    })
  },
  referralCodeInput: function (e) {
    let that = this
    that.setData({
      referralCode: e.detail.value,
    })
  },
  loginPhone: function (e) {
    let phone = e.detail.value;
   
      this.setData({
        phone: phone
      })
    
  },
  yanZhengInput: function (e) {
   
    var that = this;
    var yanzheng = e.detail.value;
    that.setData({
      yanzheng: yanzheng,
    })
   
  },
  addButton:function(){
   let that=this
    if (that.data.yanzheng == that.data.verificationCode) {
      wx.request({
        //获取openid接口   
        url: 'https://apis.sdcsoft.com.cn/wechat/privatisation/certification',
        data: {
          code: that.data.referralCode,
          openId: app.globalData.openid,
          userName: that.data.name,
          deviceNo:that.data.deviceNo,
          mobile: that.data.phone
        },
        method: 'get',
        success: function (data) {
         console.log(data)
         if(data.data.code==1){
          wx.showToast({
            title: data.data.msg,
            icon: 'none',
            duration: 2000
          })
         }else{
          wx.showToast({
            title: '认证成功',
            icon: 'success',
            duration: 2000
          })
           wx.navigateBack({//返回
            delta: 1
          })
         }
        
        }
      })
      } else {
      wx.showToast({
        title: '输入验证码有误',
        icon: 'none',
        duration: 2000
      })
      }
  }
})
