const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    text: '', //按钮文字
    currentTime: 61, //倒计时
    disabled: false, //按钮是否禁用
    phone: '', //获取到的手机栏中的值
    realName:'',
    verificationCode: '',
    code: '',
    newChanges: '',
    newChangesAgain: '',
    state: '',
    handleEName:'',
    content: null,
  },
  onShow: function () {
    var that = this
    if (app.globalData.lang === 'zh-cn') {
      var chinese = require("../../utils/Chinses.js")
      that.setData({
        content: chinese.Content,
          text: chinese.Content.register_getcode
      })
    }
    if (app.globalData.lang === 'en-us') {
      var english = require("../../utils/English.js")
      that.setData({
        content: english.Content,
        text: english.Content.register_getcode
      })
    }
    wx.setNavigationBarTitle({
      title: that.data.content.register_title
    })
  },
  onLoad: function (options) {
    var that = this
    that.setData({
      openid: options.openid
    })   
  },
  /**
    * 获取验证码
    */
  return_home: function (e) {
    wx.navigateTo({
      url: '/pages/login/login',
    })

  },
  handleInputPhone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  handleVerificationCode: function (e) {
    this.setData({
      code: e.detail.value
    })
  },
  handleNewChanges: function (e) {
    this.setData({
      newChanges: e.detail.value
    })
  },
  handleNewChangesAgain: function (e) {
    this.setData({
     newChangesAgain: e.detail.value
    })
  },
  handleRealName: function (e) {
    var that=this
    this.setData({
      realName: e.detail.value
    })
  },
  handleEName: function (e) {
    var that = this
    this.setData({
      handleEName: e.detail.value
    })
  },
  doGetCode: function () {
    var that = this;
    that.setData({
      disabled: true, //只要点击了按钮就让按钮禁用 （避免正常情况下多次触发定时器事件）
      color: '#ccc',
    })

    var phone = that.data.phone;
    var currentTime = that.data.currentTime //把手机号跟倒计时值变例成js值
    var warn = null; //warn为当手机号为空或格式不正确时提示用户的文字，默认为空
    if (phone == '') {
      warn = that.data.content.register_pleasephone;
    } else if (phone.trim().length != 11 || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(phone)) {
      warn = that.data.content.register_falsephone;
    } 
    else {
      wx.request({
        url: 'https://app.weixin.sdcsoft.cn/getSsm',
        method: "GET",
        data: {
          number: that.data.phone
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log(res.data)
          that.setData({
            verificationCode: res.data.validate
          })
          wx.showToast({
            title: that.data.content.register_sendmsg,
            icon: 'none',
            duration: 2000
          });
          //设置一分钟的倒计时
          var interval = setInterval(function () {
            currentTime--; //每执行一次让倒计时秒数减一
            that.setData({
              text: currentTime + 's', //按钮文字变成倒计时对应秒数

            })
            //如果当秒数小于等于0时 停止计时器 且按钮文字变成重新发送 且按钮变成可用状态 倒计时的秒数也要恢复成默认秒数 即让获取验证码的按钮恢复到初始化状态只改变按钮文字
            if (currentTime <= 0) {
              clearInterval(interval)
              that.setData({
                text: that.data.content.register_resend,
                currentTime: 61,
                disabled: false,
                color: '#1AAD19'
              })
            }
          }, 1000);
        }
      })
    };
    //判断 当提示错误信息文字不为空 即手机号输入有问题时提示用户错误信息 并且提示完之后一定要让按钮为可用状态 因为点击按钮时设置了只要点击了按钮就让按钮禁用的情况
    if (warn != null) {
      wx.showModal({
        title: that.data.content.register_prompt,
        content: warn
      })
      that.setData({
        disabled: false,
        color: '#1AAD19'
      })
      return;
    }
  },
  submit: function (e) {
    var that = this
    if (this.data.phone == '') {
      wx.showToast({
        title: that.data.content.register_plphone,
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (this.data.code == '') {
      wx.showToast({
        title: that.data.content.register_plcode,
        icon: 'none',
        duration: 2000
      })
      return
    } 
    if (this.data.realName == '') {
      wx.showToast({
        title: that.data.content.register_plname,
        icon: 'none',
        duration: 2000
      })
      return
    } 
    else if (this.data.code != this.data.verificationCode) {
      wx.showToast({
        title: that.data.content.register_falsecode,
        icon: 'none',
        duration: 2000
      })
      return
    }
    else if (this.data.newChanges == '') {
      wx.showToast({
        title: that.data.content.register_plpw,
        icon: 'none',
        duration: 2000
      })
      return
    } else if (this.data.newChangesAgain != this.data.newChanges) {
      wx.showToast({
        title: that.data.content.register_twopw,
        icon: 'none',
        duration: 2000
      })
      return
    } else {
      var that = this
      var phone = that.data.phone;
      wx.request({
        url: 'https://app.weixin.sdcsoft.cn/saveEmployee',
        method: "GET",
        data: {
          validate: that.data.code,
          password: that.data.newChanges, 
          realName: that.data.realName,
          mobile: that.data.phone,
          openid: that.data.openid, 
          wxEnterpriseName: that.data.handleEName
        },
        header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
        success: function (res) {
          if (res.data=="该用户已存在"){
            wx.showToast({
              icon: 'none',
              title: that.data.content.register_existuser,
              duration: 2000
            })
          }
          if (res.data == "注册成功") {
            wx.showToast({
              title: that.data.content.register_zhucesuccess,
              duration: 2000,
              success(res) {
                wx.navigateTo({
                  url: "/pages/operation/operation",
                })
              }
            })
            wx.setStorage({
              key: 'wxEnterpriseName',
              data: that.data.handleEName
            })
          }
        }
      })
     
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  }
})