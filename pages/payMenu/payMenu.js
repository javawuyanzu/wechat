const app = getApp();
Page({
  data: {
    deviceNo:null,
    'menus': [
    ],
    selectedMenuId: 1,
    total: {
      count: 0,
      money: 0
    },
    chooseDeviceWindow:false,
    chooseExPhone: false,
    deviceList:[],
    chooseProductList:[],
    array: [0],//默认显示一个
    inputVal: [],//所有input的内容,
    smsExResId: null,
    smsExRange: null,
    smsExRangeType: null,
    smsExPrice: null,
  },
  selectMenu: function (event) {
    let data = event.currentTarget.dataset
    this.setData({
      selectedMenuId: data.id
    })
    
  },
  chooseProduct: function (event) {
    var that = this
    var data = event.currentTarget.dataset
    var resId = data.resid
    wx.request({
      url: 'http://127.0.0.1:8080/webapi/wechat/RoleResource/find/deviceNo/openId/resId',
      data: {
        deviceNo: that.data.deviceNo,
        openId:app.globalData.openid,
        resId: resId
      },
      method: 'GET',
      success: function (res) {
        var resList = res.data.data
        if (resList.length>0){
          wx.showToast({
            title: "当前设备该服务未到期，请到期购买",
            icon: 'none',
            duration: 2000
          });
          return
        }else{
          wx.request({
            //获取openid接口  
            url: 'http://127.0.0.1:8080/webapi/wechat/Resource_Product/list/resid',
            data: {
              resId: resId,
            },
            method: 'GET',
            success: function (res) {
              console.log(res)
              var productList = res.data.data
              var chooseProductList=[]
              wx.getStorage({
                key: 'orders',
                success: function (res) {
                  var orderList = res.data
                  for (var i in productList) {
                    var title;
                    if (productList[i].rangeType==2){
                      title = productList[i].price + "元，" + productList[i].range+"个月"
                    }
                    if (productList[i].rangeType==1) {
                      title = productList[i].price + "元，" + productList[i].range + "天"
                    }
                    var index = that.findOrder(orderList, productList[i].range, productList[i].rangeType, productList[i].resourceId, productList[i].price)
                    if (index != -1) {
                      chooseProductList.push({ resId: productList[i].resourceId, resName: productList[i].resourceName, range: productList[i].range, rangeType: productList[i].rangeType, title: title, price: productList[i].price, count: orderList[index].amount })
                    } else {
                      chooseProductList.push({ resId: productList[i].resourceId, resName: productList[i].resourceName, range: productList[i].range, rangeType: productList[i].rangeType, title: title, price: productList[i].price, count: 0 })
                    }
                  }
                  that.setData({
                    chooseDeviceWindow: true,
                    chooseProductList: chooseProductList
                  })

                }
              })
            }
          })  
        }
      }
    }) 
   

  },


  gotoOrder: function () {
    var that=this
    var total = that.data.total
    if (total.count>0){
      wx.navigateTo({ url: '/pages/order/order?count=' + total.count + "&money=" + total.money, }) 
    }
  },

  minusCount: function (event) {
    var that = this
    var data = event.currentTarget.dataset
    var total = that.data.total
    var count = data.count
    var resName = data.name
    var range = data.range
    var rangeType = data.rangetype
    var deviceNo = that.data.deviceNo
    var resId = data.resid
    var price = data.price
    if (count==0){
      return;
   }
  
    wx.getStorage({
      key: 'orders',
      success: function (res) {
        var list = res.data

        if (list.length > 0) {
          
            if (that.findName(list, range, rangeType, resId)) {
              for (var i in list) {
                if (range == list[i].range && rangeType == list[i].rangeType  && resId == list[i].resourceId) {
                  if (list[i].amount==1){
                    list.splice(i, 1);
                    that.chooseProductListremove(range, rangeType, resId, price);
                    break;
                  }else{
                    list[i].amount = list[i].amount - 1
                    that.chooseProductListremove(range, rangeType, resId, price);
                    break;
                  }
                }
            }
          }
        }
      
        wx.setStorage({
          key: "orders",
          data: list,
          success: function (res) {
          }
        });
      },
    })
    total.count -= 1
 
    total.money = that.subtract(total.money, price)
    this.setData({
      'total': total
    })
  },
   // float浮点数加法运算
  accAdd:function (arg1, arg2) {
    var r1, r2, m;
    try {
      r1 = arg1.toString().split(".")[1].length;
    }  
    catch(e) {
      r1 = 0;
    }  
    try {
      r2 = arg2.toString().split(".")[1].length;
    }  
    catch(e) {
      r2 = 0;
    }  
    m = Math.pow(10, Math.max(r1, r2));
    return(arg1 * m + arg2 * m) / m;  
} ,
  // float浮点数减法运算
  subtract:function (arg1, arg2) {
    var r1, r2, m, n;
    try {
      r1 = arg1.toString().split(".")[1].length;
    }  
    catch(e) {
      r1 = 0;
    }  
    try {
      r2 = arg2.toString().split(".")[1].length;
    }  
    catch(e) {
      r2 = 0;
    }  
    m = Math.pow(10, Math.max(r1, r2));
    //last modify by deeka  
    //动态控制精度长度  
    n = (r1 >= r2) ? r1 : r2;
    return((arg1 * m - arg2 * m) / m).toFixed(n);  
},

  addCount: function (event) {
    var that = this
    var data = event.currentTarget.dataset
    
    var total = that.data.total
    var resName = data.name
    var range = data.range
    var rangeType = data.rangetype
    var deviceNo = that.data.deviceNo
    var resId = data.resid
    var price = data.price
    if (resId==5){
      that.setData({
        smsExResId: resId,
        smsExRange: range,
        smsExRangeType: rangeType,
        smsExPrice: price,
      })
    }
    wx.getStorage({
      key: 'orders',
      success: function (res) {
        var list = res.data
        if (list.length > 0) {

          if (that.findName(list, range, rangeType, resId)) {
            for (var i in list) {
              if (range == list[i].range && rangeType == list[i].rangeType  && resId == list[i].resourceId) {
                list[i].amount = list[i].amount + 1
                break;
              }
            }
            that.chooseProductListAdd(range, rangeType, resId, price);
          
      
          } else {
            list.push({ resourceName: resName, resourceId: parseInt(resId), range: range, rangeType: rangeType, deviceNo: deviceNo, price: price, amount: 1 })
            that.chooseProductListAdd(range, rangeType, resId, price);
          }
        } else {
          list.push({ resourceName: resName, resourceId: parseInt(resId), range: range, rangeType: rangeType, deviceNo: deviceNo, price: price, amount: 1 })
          that.chooseProductListAdd(range, rangeType, resId, price);
       
        }
        
        wx.setStorage({
          key: "orders",
          data: list,
          success: function(res){
            that.noBuySame(range, rangeType, resId, price)
          }
        });

      },
    })
    
      total.count += 1
    total.money = that.accAdd(price, total.money) 
      this.setData({
        'total': total
      })
    
  },
  findName: function (list, range, rangeType, resId) {
   
    for (var i in list) {
    
      if (range == list[i].range && rangeType == list[i].rangeType && resId == list[i].resourceId) {
        return true
        break;
      }
    }
    return false
  },
  findOrder: function (list, range, rangeType, resId, price) {
    for (var i in list) {
      if (range == list[i].range && rangeType == list[i].rangeType && resId == list[i].resourceId && price == list[i].price) {
        return i
        break;
      }
    }
    return -1
  },
  findResDevice: function (list, deviceNo, resId) {
    for (var i in list) {
      if (deviceNo == list[i].deviceNo && resId == list[i].resId ) {
        return i
        break;
      }
    }
    return -1
  },
  confirm: function (e) {
    var that = this;
    var reslist = e.currentTarget.dataset.count
    if (that.data.smsExResId==5){
      that.setData({
        chooseExPhone: true,
      })
    }
    that.setData({
      chooseDeviceWindow: false,
    })
  },
  noBuySame: function (range, rangeType, resId, price) {
    var that = this;
    var chooseProductList = that.data.chooseProductList
    for (var i in chooseProductList){
      if (chooseProductList[i].range == range && chooseProductList[i].rangeType == rangeType && chooseProductList[i].resId == resId){
      }else{
        if (chooseProductList[i].count != 0){
          chooseProductList[i].count = 0
          var range1=chooseProductList[i].range
          var rangeType1 = chooseProductList[i].rangeType
          var resId1 = chooseProductList[i].resId
          wx.getStorage({
            key: 'orders',
            success: function (res) {
              var list = res.data
              if (list.length > 0) {
                if (that.findName(list, range1, rangeType1, resId1)) {
                  for (var i in list) {
                    if (range1 == list[i].range && rangeType1 == list[i].rangeType && resId1 == list[i].resourceId) {
                      if (list[i].amount == 1) {
                        list.splice(i, 1);
                        break;
                      } 
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
         
          var total = that.data.total
          total.count -= 1
          total.money = that.subtract(total.money, chooseProductList[i].price)
          this.setData({
            'total': total
          })
          var menus = that.data.menus
          for (var i in menus) {
            if (menus[i].id == resId) {
              var plist = menus[i].productList
              for (var k in plist) {
                if (plist[i].range == range && plist[i].rangeType == rangeType && plist[i].resourceId == resId && plist[i].price == price) {
                } else {
                  plist.splice(i, 1)
                }
              }
              menus[i].productList = plist
            }
          }
          that.setData({
            menus: menus
          })
        }
      }
    }
    that.setData({
      chooseProductList: chooseProductList,
    })
  },
  chooseProductListAdd: function (range, rangeType, resId, price) {
    var that = this;
    var chooseProductList = that.data.chooseProductList
    for (var i in chooseProductList) {
      if (chooseProductList[i].range == range && chooseProductList[i].rangeType == rangeType && chooseProductList[i].resId == resId) {
        chooseProductList[i].count = chooseProductList[i].count + 1
      } 
    }
    var menus = that.data.menus
    for (var i in menus) {
      if (menus[i].id == resId) {
        var order = { resourceId: resId, range: range, rangeType: rangeType, price: price}
        menus[i].productList.push(order)
      }
    }
    that.setData({
      menus: menus,
      chooseProductList: chooseProductList,
    })
  },
  chooseProductListremove: function (range, rangeType, resId, price) {
    var that = this;
    var chooseProductList = that.data.chooseProductList
    for (var i in chooseProductList) {
      if (chooseProductList[i].range == range && chooseProductList[i].rangeType == rangeType && chooseProductList[i].resId == resId) {
        chooseProductList[i].count = chooseProductList[i].count -1
      }
    }
    var menus = that.data.menus
    for (var i in menus) {
      if (menus[i].id == resId) {
        var plist = menus[i].productList
        for (var k in plist){
          if (plist[k].range == range && plist[k].rangeType == rangeType && plist[k].resourceId == resId && plist[k].price == price) {
            plist.splice(k,1)
          }
        }
        menus[i].productList = plist
      }
    }
    that.setData({
      menus: menus,
      chooseProductList: chooseProductList,
    })
  },
  removeOrder: function (event) {
    var that = this
    var data = event.currentTarget.dataset
    
    var range = data.range
    var rangeType = data.rangetype
    var resId = data.resid
    var price = data.price

    var menus = that.data.menus
    for (var i in menus) {
      if (menus[i].id == resId) {
        var plist = menus[i].productList
        for (var k in plist) {
          if (plist[i].range == range && plist[i].rangeType == rangeType && plist[i].resourceId == resId && plist[i].price == price) {
            plist.splice(i, 1)
          }
        }
        menus[i].productList = plist
      }
    }
    that.setData({
      menus: menus,
    })
    wx.getStorage({
      key: 'orders',
      success: function (res) {
        var list = res.data

        if (list.length > 0) {

          if (that.findName(list, range, rangeType, resId)) {
            for (var i in list) {
              if (range == list[i].range && rangeType == list[i].rangeType && resId == list[i].resourceId) {
                if (list[i].amount == 1) {
                  list.splice(i, 1);
                  that.chooseProductListremove(range, rangeType, resId, price);
                  break;
                } else {
                  list[i].amount = list[i].amount - 1
                  that.chooseProductListremove(range, rangeType, resId, price);
                  break;
                }
              }
            }
          }
        }

        wx.setStorage({
          key: "orders",
          data: list,
        });
      },
    })
    var total = that.data.total
    total.count -= 1
    total.money = that.subtract(total.money,price)
    this.setData({
      'total': total
    })
  },
  onUnload: function () {
    // console.log("---")
    // wx.setStorage({
    //   key: "orders",
    //   data: []
    // });
  },
  
 
  onLoad: function (options) {
    var that = this;
    that.setData({
      deviceNo: options.deviceNo
    })
    wx.setStorage({
      key: "orders",
      data: []
    });
    wx.getStorage({
      key: 'orders',
      fail: function (res) {
        wx.setStorage({
          key: "orders",
          data: []
        });
      },
    })
    wx.getStorage({
      key: 'deviceList',
      success(res) {
        that.setData({
          deviceList:res.data
        })
      }
    })
     wx.request({
      //获取openid接口  
       url: 'http://127.0.0.1:8080/webapi/wechat/Resource_Product/Resource/list',
      method: 'GET',
      success: function (res) {
        var result = res.data.data
        
        for (var i in result){
          if (result[i].status==1){
            result.splice(i,1)
          }
          result[i].productList=[]
        }
        that.setData({
          menus: result
        })
      }
    })
    
   
  },
getInputVal: function (e) {
    var nowIdx = e.currentTarget.dataset.idx;//获取当前索引
    var val = e.detail.value;//获取输入的值
    var oldVal = this.data.inputVal;
    var that = this;
    if (!(/^1[34578]\d{9}$/.test(val))) {
      wx.showToast({
        title: '手机号有误',
        icon: 'success',
        duration: 2000
      })
    }else{
      oldVal[nowIdx] = val;//修改对应索引值的内容
      this.setData({
        inputVal: oldVal
      })
    }
  },
  addList: function () {
    var old = this.data.array;
    old.push(1);//这里不管push什么，只要数组长度增加1就行
    this.setData({
      array: old
    })
  },
  delList: function (e) {
    var nowidx = e.currentTarget.dataset.idx;//当前索引
    var oldInputVal = this.data.inputVal;//所有的input值
    var oldarr = this.data.array;//循环内容
    oldarr.splice(nowidx, 1);    //删除当前索引的内容，这样就能删除view了
    oldInputVal.splice(nowidx, 1);//view删除了对应的input值也要删掉
    if (oldarr.length < 1) {
      oldarr = [0]  //如果循环内容长度为0即删完了，必须要留一个默认的。这里oldarr只要是数组并且长度为1，里面的值随便是什么
    }
    this.setData({
      array: oldarr,
      inputVal: oldInputVal
    })
  },
  //用户名和密码输入框事件
    inputChange: function () {
      var that = this;
      for (let i = 0; i < that.data.inputVal.length; i++) {
        if (that.data.inputVal[i] == null) {
          that.data.inputVal.splice(i, 1);
        }
      }
      wx.getStorage({
        key: 'orders',
        success: function (res) {
          var orderlist = res.data
          var index = that.findOrder(orderlist, smsExRange, smsExRangeType, smsExResId, smsExPrice)
          if(index !=-1){
            orderlist.slice(index,1)
            
          }

          for (var i in orderlist){
            if (orderlist[i].resourceId==5){
              console.log(orderlist[i])
            }
          }
        },
      })
      that.setData({
        chooseExPhone:false
      })

    },

})