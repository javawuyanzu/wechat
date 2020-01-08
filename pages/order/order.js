//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    menus:null,
    // 统计商品数量和价格
    orderCount: {
      num: 0,
      money: 0
    },
    bottomFlag: false,
    // 提交的订单
    orders: true,
    items: [],
    content: null,
  },
  // 点击对应菜单添加按钮
  del: function (event) {
    let that = this;
    let id = event.target.dataset.id;
    let index = event.target.dataset.index;
    let param = this.data.items[index];
    if (param.count > 0) {
      param.count--; // 每点一次减少1
    } else {
      param.count = 0; // 最低为0
    }
    // 改变添加按钮的状态
    this.data.items.splice(index, 1, param);
    that.setData({
      items: this.data.items
    });
    let money = 0;
    let num = 0;
    // 将已经确定总价格和数量求和
    this.data.items.forEach(item => {
      money += item.price * item.count;
      num += item.count;
    });
    let orderCount = {
      num,
      money
    }
    // 设置显示对应的总数和全部价钱
    this.setData({
      orderCount
    });
  },
  // 点击对应菜单添加按钮
  add: function (event) {
    let that = this;
    let id = event.target.dataset.id;
    let index = event.target.dataset.index;
    let param = this.data.items[index];
    let subOrders = []; // 购物单列表存储数据
    param.count++; // 每点一次增加1
    // 改变添加按钮的状态
    this.data.items.splice(index, 1, param);
    that.setData({
      items: this.data.items
    });
    let money = 0;
    let num = 0;
    // 将已经确定总价格和数量求和
    this.data.items.forEach(item => {
      money += item.price * item.count;
      num += item.count;
    });
    let orderCount = {
      num,
      money
    }
    // 设置显示对应的总数和全部价钱
    this.setData({
      orderCount
    });
  },
  // 点击结账按钮
  pay: function () {
    let that = this;
    let str = '选中' + that.data.orderCount.num + '件商品，共' + that.data.orderCount.money + '元，是否要支付？'
    wx.showModal({
      title: '提示',
      content: str,
      success: function (res) {
        // 至少选中一个商品才能支付
        if (that.data.orderCount.num !== 0) {
          if (res.confirm) {
            wx.getStorage({
              key: 'orders',
              success: function (res) {
                var list = res.data
                var resList = []
                for(var i in list){
                  resList.push({ openId: list[i].openId, resId: list[i].resId, dueTime: that.getDateStr(list[i].dueTime) ,})
                }
                
                wx.request({
                  url: 'https://apis.sdcsoft.com.cn/webapi/wechat/RoleResource/create/many',
                  method: "POST",
                  data: {
                    role_ResourceList: JSON.stringify(resList)
                  },
                  header: {
                    'content-type': 'application/x-www-form-urlencoded'
                  },
                  success: function (res) {
                    wx.request({
                      //获取openid接口  
                      url: 'https://apis.sdcsoft.com.cn/webapi/wechat/RoleResource/list',
                      data: {
                        openId: app.globalData.openid,
                      },
                      method: 'GET',
                      success: function (res) {
                        if (res.data.code == 0 & res.data.data.length > 0) {
                          var currentTime = new Date();
                          var list = res.data.data
                          for (var i = 0; i < list.length; i++) {
                            if (currentTime < new Date(Date.parse(list[i].dueTime))) {
                              that.chooseMenu(list[i].resId)
                            }
                          }
                        }
                      }
                    })
                    wx.showToast({
                      title: '购买成功',
                      icon: 'success', 
                      duration: 2000
                    })
                    wx.switchTab({
                      url: '../deviceList/deviceList'
                    })
                  }
                })
                wx.setStorage({
                  key: "orders",
                  data: []
                });
              },
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
  chooseMenu: function (num) {
    var that = this;
    var list = that.data.menus
   console.log(list)
    if (num == 2) {
      list.push(that.data.content.detail_exceptionMenu)
    }
    if (num == 3) {
      list.push(that.data.content.detail_reportMenu)
    }
    if (num == 4) {
      list.push(that.data.content.detail_controlMenu)
    }
    if (num == 5) {
      list.push(that.data.content.detail_smsMenu)
    }
    app.globalData.menuList = list
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
  onLoad: function () {
    let that = this;
    if (app.globalData.lang === 'zh-cn') {
      var chinese = require("../../utils/Chinses.js")
      that.setData({
        content: chinese.Content,
        menus:['基本', '购买']
      })
    }
    if (app.globalData.lang === 'en-us') {
      var english = require("../../utils/English.js")
      that.setData({
        content: english.Content,
        menus:['Run information', 'Purchasing service']
      })
    }
    // 取出订单传过来的数据
    wx.getStorage({
      key: 'orders',
      success: function (res) {
        that.setData({
          items: res.data
        });
        // 价格统计汇总
        let money = 0;
        let num = 0;
        res.data.forEach(item => {
          money += (item.price * item.count); // 总价格求和
          num += item.count
        });
        let orderCount = {
          num,
          money
        }
        // 设置显示对应的总数和全部价钱
        that.setData({
          orderCount
        });
      }
    })
  }
})