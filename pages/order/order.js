//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    menus: null,
    // 统计商品数量和价格
    count: 0,
    discount: null,
    bottomFlag: false,
    // 提交的订单
    orders: true,
    items: [],
    content: null,
    outTradeNo:null,
  },

  wxpay: function (param) {
    let that = this;
    wx.requestPayment({
      timeStamp: param.timeStamp,
      nonceStr: param.nonceStr,
      package: param.package,
      signType: param.signType,
      paySign: param.paySign,
      success: function (res) {

        console.log(res)
        wx.navigateBack({
          delta:3, // 回退前 delta(默认为1) 页面
          success: function (res) {
            that.createOrderAndItem()
            wx.showToast({
              title: '支付成功',
              icon: 'success',
              duration: 2000
            })
           
          },
          fail: function () {
            // fail

          },
          complete: function () {
            // complete
          }
        })
       
      },
      fail: function (res) {
        console.log("支付失败")
        // wx.setStorage({
        //   key: "orders",
        //   data: []
        // });
        wx.navigateBack({
          delta: 2, // 回退前 delta(默认为1) 页面
          success: function (res) {
            wx.showToast({
              title: '支付失败',
              icon: 'success',
              duration: 2000
            })
          },
          fail: function () {
            // fail

          },
          complete: function () {
            // complete
          }
        })

        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  pay: function () {
    let that = this;
    let str = '选中' + that.data.count + '件商品，共' + that.data.discount.paymentAmount + '元，是否要支付？'
    wx.showModal({
      title: '提示',
      content: str,
      success: function (res) {
        // 至少选中一个商品才能支付
        if (that.data.count !== 0) {
          if (res.confirm) {
            wx.login({
              success: function (res) {
                wx.request({
                  //获取openid接口  
                  url: 'https://apis.sdcsoft.com.cn/wechat/device/getopenid',
                  data: {
                    js_code: res.code,
                  },
                  method: 'GET',
                  header: {
                    'content-type': 'application/x-www-form-urlencoded'
                  },
                  success: function (res) {
                    var openid = res.data.openid.substr(0, 10) + '_' + res.data.openid.substr(res.data.openid.length - 8, res.data.openid.length)
                    var openidmax = res.data.openid
                    wx.request({
                      url: 'https://apis.sdcsoft.com.cn/wechat/JinRong_Order/create',
                      method: "POST",
                      data: {
                        status: 0,
                        wechatOrderId: "temp",
                        openId: openid,
                        discount: that.data.discount.discount,
                        total: that.data.discount.total,
                        paymentAmount: that.data.discount.paymentAmount,
                      },
                      success: function (res) {
                        console.log(res)
                        var orderId = res.data.data.id
                        that.setData({
                          outTradeNo:res.data.data.outTradeNo
                        })
                        wx.getStorage({
                          key: 'orders',
                          success: function (res) {
                            var list = res.data
                            var itemList = []
                            for (var i in list) {
                              itemList.push({
                                orderId: orderId,
                                resourceId: list[i].resourceId,
                                resourceName: list[i].resourceName,
                                range: list[i].range,
                                price: list[i].price,
                                amount: list[i].amount,
                                deviceNo: list[i].deviceNo,
                                rangeType: list[i].rangeType,
                                mobile: list[i].employeeMobile,
                                marker: ""
                              })
                            }
                            wx.request({
                              url: 'https://apis.sdcsoft.com.cn/wechat/JinRong_OrderItem/wx/create/many',
                              method: "POST",
                              data: {
                                jinRong_OrderItemList: JSON.stringify(itemList)
                              },
                              header: {
                                'content-type': 'application/x-www-form-urlencoded'
                              },
                              success: function (res) {
                                console.log(res.data)
                                wx.request({
                                  url: 'https://apis.sdcsoft.com.cn/wechat/PayOrder/createPayOrder',
                                  method: 'POST',
                                  data: {
                                    money: that.data.discount.paymentAmount*100,
                                    openId: openidmax,
                                    orderNo: that.data.outTradeNo
                                  },
                                  header: {
                                    'content-type': 'application/x-www-form-urlencoded'
                                  },
                                  success: function (res) {
                                    var pay = res.data.data
                                    console.log(pay)
                                    //发起支付
                                    var timeStamp = pay.timeStamp;
                                    var packages = pay.package;
                                    var paySign = pay.paySign;
                                    var nonceStr = pay.nonceStr;
                                    var param = { "timeStamp": timeStamp, "package": packages, "paySign": paySign, "signType": "MD5", "nonceStr": nonceStr };
                                    that.wxpay(param)
                                  },
                                })
                             

                              }
                            })


                          
                          },
                        })
                      }
                    })
                  }
                })
              }
            })


          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        } else {
          wx.showToast({
            title: '您未选中任何商品',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },
  createOrderAndItem: function () {
    let that = this;
    wx.getStorage({
      key: 'orders',
      success: function (res) {
        var list = res.data
        var resList = []
        var smsList = []
        for (var i in list) {
          if (list[i].resourceId==5){
            smsList.push({
              employeeMobile: list[i].employeeMobile,
              deviceNo: list[i].deviceNo,
              range: list[i].range,
              rangeType: list[i].rangeType,
              amount: list[i].amount,
            })
          } else if (list[i].resourceId == 6){
            wx.request({
              url: 'https://apis.sdcsoft.com.cn/wechat/smsPaymentRecords/create',
              method: "POST",
              data: {
                openId: app.globalData.openid,
                deviceNo: list[i].deviceNo,
                iMEI: list[i].iMEI
              },
              success: function (res) {
                console.log(res)
              }
            })
           
          }else{
            resList.push({
              openId: app.globalData.openid,
              resId: list[i].resourceId,
              deviceNo: list[i].deviceNo,
              range: list[i].range,
              rangeType: list[i].rangeType,
              amount: list[i].amount,
            })
           
          }
          
        }
       
        wx.request({
          url: 'https://apis.sdcsoft.com.cn/wechat/Relation_DeviceSmsMap/create/many',
          method: "POST",
          data: {
            deviceSmsMapList: JSON.stringify(smsList)
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            console.log(res)
          }
        })
        wx.request({
          url: 'https://apis.sdcsoft.com.cn/wechat/RoleResource/create/many',
          method: "POST",
          data: {
            role_ResourceList: JSON.stringify(resList)
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            wx.showToast({
              title: '购买成功',
              icon: 'success',
              duration: 2000
            })
            // wx.setStorage({
            //   key: "orders",
            //   data: []
            // });
            // wx.switchTab({
            //   url: '../deviceList/deviceList'
            // })
          }
        })

      },
    })

  },
  getDateStr: function getDateStr(addDayCount) {
    var dd = new Date();;

    dd.setDate(dd.getDate() + addDayCount); //获取AddDayCount天后的日期

    var y = dd.getFullYear();
    var m = dd.getMonth() + 1; //获取当前月份的日期 
    var d = dd.getDate();
    if (m < 10) {
      m = '0' + m;
    };
    if (d < 10) {
      d = '0' + d;
    };
    var h = dd.getHours();
    var mm = dd.getMinutes();
    if (h < 10) {
      h = "0" + h;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    return y + "-" + m + "-" + d + " " + h + ':' + mm;
  },
  onLoad: function (options) {
    let that = this;
    if (app.globalData.lang === 'zh-cn') {
      var chinese = require("../../utils/Chinses.js")
      that.setData({
        content: chinese.Content,
        menus: ['基本', '购买']
      })
    }
    if (app.globalData.lang === 'en-us') {
      var english = require("../../utils/English.js")
      that.setData({
        content: english.Content,
        menus: ['Run information', 'Purchasing service']
      })
    }
    wx.request({
      //获取openid接口  
      url: 'https://apis.sdcsoft.com.cn/wechat/DiscountStrategy/discount',
      data: {
        total: options.money,
      },
      method: 'GET',
      success: function (res) {
        console.log(res)
        var celue;
        if (res.data.data.discount != null) {
          celue = res.data.data.discount
        } else {
          celue = " "
        }
        var discount = {

          discount: celue,
          total: res.data.data.total,
          paymentAmount: res.data.data.paymentAmount,
        }
        that.setData({
          discount: discount
        })
      }
    })
    // 取出订单传过来的数据
    wx.getStorage({
      key: 'orders',
      success: function (res) {
        that.setData({
          items: res.data
        });
        // 价格统计汇总
        let num = 0;
        res.data.forEach(item => {
          num += item.amount
        });

        // 设置显示对应的总数和全部价钱
        that.setData({
          count: num
        });
      }
    })
  }
})