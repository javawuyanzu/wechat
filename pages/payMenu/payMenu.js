const app = getApp();
Page({
  data: {
    text: "Page main",
    background: [
      {
        color: 'green',
        sort: 1
      },
      {
        color: 'red',
        sort: 2
      },
      {
        color: 'yellow',
        sort: 3
      }
    ],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 3000,
    duration: 1200,
    toView: 'blue',
    'menus': [
      {
        id: 1,
        tag: 'aa',
        resId: '2',
        name: '报警信息',
        icon: '',
        dishs: [
          {
            id: 1,
            time: 30,
            price: 0,
            name: '一个月',
            sales: 12,
            pic: 'dish-9.jpg',
            count: 0
          },
          // {
          //   id: 2,
          //   time: 365,
          //   price: 0,
          //   name: '一年',
          //   sales: 18,
          //   pic: 'dish-10.jpg',
          //   count: 0
          // }
        ]
      },
      {
        id: 2,
        tag: 'bb',
        resId: '3',
        name: '统计报表',
        icon: '',
        dishs: [
          {
            id: 1,
            time: 30,
            price: 0,
            name: '一个月',
            sales: 39,
            pic: 'dish-5.jpg',
            count: 0
          },
          // {
          //   id: 2,
          //   time: 365,
          //   price: 0,
          //   name: '一年',
          //   sales: 23,
          //   pic: 'dish-6.jpg',
          //   count: 0
          // }
        ]
      },
      {
        id: 3,
        tag: 'cc',
        resId: '4',
        name: '管理控制',
        icon: '',
        dishs: [
          {
            id: 1,
            time: 30,
            price: 0,
            name: '一个月',
            sales: 34,
            pic: 'dish-3.jpg',
            count: 0
          },
          // {
          //   id: 2,
          //   time: 365,
          //   price: 0,
          //   name: '一年',
          //   sales: 38,
          //   pic: 'dish-4.jpg',
          //   count: 0
          // }
        ]
      },
      // {
      //   id: 4,
      //   tag: 'dd',
      //   resId: '5',
      //   name: '短信报警',
      //   icon: '',
      //   dishs: [
      //     {
      //       id: 1,
      //       time: 30,
      //       price: 16,
      //       name: '一个月',
      //       sales: 19,
      //       pic: 'dish-7.jpg',
      //       count: 0
      //     },
      //     {
      //       id: 2,
      //       time: 365,
      //       price: 10,
      //       name: '一年',
      //       sales: 12,
      //       pic: 'dish-8.jpg',
      //       count: 0
      //     }
      //   ]
      // }
    ],
    selectedMenuId: 1,
    total: {
      count: 0,
      money: 0
    }
  },
  selectMenu: function (event) {
    let data = event.currentTarget.dataset
    this.setData({
      toView: data.tag,
      selectedMenuId: data.id
    })
    // this.data.toView = 'red'
  },
  addCount: function (event) {
    var that = this
    let data = event.currentTarget.dataset
    let mid = data.mid
    let time = data.time
    let total = this.data.total
    let menus = this.data.menus
    let menu = menus.find(function (v) {
      return v.id == data.cid
    })
    let dish = menu.dishs.find(function (v) {
      return v.id == data.id
    })
    var title = menu.name + dish.name
    wx.getStorage({
      key: 'orders',
      success: function (res) {
        var list = res.data
        console.log(list)
        if (list.length > 0) {
          for (var i in list) {
            if (that.findName(list, title)) {
              // if (title == list[i].name){
              //   list[i].count = list[i].count + 1
              // }
            } else {
              list.push({ name: title, price: dish.price, count: 1, resId: mid, dueTime: time, openId: app.globalData.openid })
            }
          }
        } else {
          list.push({ name: title, price: dish.price, count: 1, resId: mid, dueTime: time, openId: app.globalData.openid })
        }
        wx.setStorage({
          key: "orders",
          data: list
        });
      },
    })
    if (dish.count == 0) {
      dish.count += 1;
      total.count += 1
      total.money += dish.price
      this.setData({
        'menus': menus,
        'total': total
      })
    }
  },
  findName: function (list, name) {
    for (var i in list) {
      if (name == list[i].name) {
        return true
        break;
      }
    }
    return false
  },
  onUnload: function () {
    console.log("---")
    wx.setStorage({
      key: "orders",
      data: []
    });
  },
  minusCount: function (event) {
    let data = event.currentTarget.dataset
    let total = this.data.total
    let menus = this.data.menus
    let menu = menus.find(function (v) {
      return v.id == data.cid
    })
    let dish = menu.dishs.find(function (v) {
      return v.id == data.id
    })
    var title = menu.name + dish.name
    wx.getStorage({
      key: 'orders',
      success: function (res) {
        var list = res.data
        console.log(list)
        if (list.length > 0) {
          for (var i in list) {
            if (title == list[i].name) {
              if (list[i].count == 1) {
                list.splice(i, 1);
              } else {
                list[i].count = list[i].count - 1
              }
            }
          }
        }
        wx.setStorage({
          key: "orders",
          data: list
        });
      },
    })
    if (dish.count <= 0)
      return
    dish.count -= 1;
    total.count -= 1
    total.money -= dish.price
    this.setData({
      'menus': menus,
      'total': total
    })
  },
  onLoad: function (options) {
    var that = this;
    wx.request({
      //获取openid接口  
      url: 'https://apis.sdcsoft.com.cn/webapi/wechat/RoleResource/list',
      data: {
        openId: app.globalData.openid,
      },
      method: 'GET',
      success: function (res) {
        if (res.data.code == 0 & res.data.data.length > 0) {

          var list = res.data.data
          var menu = that.data.menus
          for (var i = 0; i < list.length; i++) {
            for (var k = 0; k < menu.length; k++) {
              if (list[i].resId == menu[k].resId) {
                menu.splice(k, 1);
              }
            }
          }
          that.setData({
            menus: menu
          })
        }
      }
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },

  onScroll: function (e) {
    console.log(e)
  }
})