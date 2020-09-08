//logs.js
const util = require('../../utils/util.js')
const app = getApp()

Page({
  data: {
    title:null,
    customer: {
      address: null,
      city: "泰安市",
      customerNo: null,
      district: "泰山区",
      id: null,
      name: null,
      orgId: null,
      phone: null,
      province: "山东省",
    },
    customItem: '全部'
  },
 
  
 
  onLoad: function (options) {
    if (options.title=="编辑"){
      wx.setNavigationBarTitle({
        title: '编辑客户' 
      })
      let customer = JSON.parse(options.customer);
      this.setData({
        customer: customer,
        title:options.title
      })
    }else{
      wx.setNavigationBarTitle({
        title: '添加客户' 
      })
    }
    if (options.title == "售出") {
      let productList = JSON.parse(options.productList);
      this.setData({
        productList: productList,
        title: options.title
      })
    }
  },
 
  userNameInput(e) {
    this.setData({
      "customer.name": e.detail.value
    })
  },
  phoneInput(e) {
    this.setData({
      "customer.phone": e.detail.value
    })
  },
  addressInput(e) {
    this.setData({
      "customer.address": e.detail.value,
      "customer.orgId": app.globalData.customer.orgId,
    })
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      "customer.province": e.detail.value[0],
      "customer.city": e.detail.value[1],
      "customer.district": e.detail.value[2],
     
    })
  },
  
  quenyButton1: function (e) {
    let that = this
    if(that.data.title=="编辑"){
      wx.request({
        //获取openid接口   
        url: 'https://apis.sdcsoft.com.cn/webapi/boilermanage/customer/modify',

        data: that.data.customer,
        method: 'post',
        success: function (data) {
          wx.navigateBack({
            
          })
        }
      })
    }else{
      wx.request({
        //获取openid接口   
        url: 'https://apis.sdcsoft.com.cn/webapi/boilermanage/customer/create',

        data: that.data.customer,
        method: 'post',
        success: function (data) {
          if (that.data.title == "售出") {
            let productList = JSON.stringify(that.data.productList)
            wx.navigateBack({
            
            })
          }else{
            wx.navigateBack({
            
            })
          }
         
        }
      })
    }
   
  },

})
