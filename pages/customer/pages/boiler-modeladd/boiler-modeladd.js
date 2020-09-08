//logs.js
const util = require('../../utils/util.js')
const app = getApp()

Page({
  data: {
    title:null,
    productList:{},
    productcategory: {
      id: "",
       name: "",
      orgId: null,
      sort: 0,
    },
  },
  onLoad: function (options) {
  
    if (options.title=="编辑"){
      wx.setNavigationBarTitle({
        title: '编辑型号' 
      })
      let productcategory = JSON.parse(options.productcategory);
      this.setData({
        productcategory: productcategory,
        title:options.title
      })
    }else{
      wx.setNavigationBarTitle({
        title: '添加型号' 
      })
    }
   
    
  },
 
  nameInput(e) {
    this.setData({
      "productcategory.name": e.detail.value,
      "productcategory.orgId": app.globalData.customer.orgId
    })
  },
  quenyButton1: function (e) {
    let that = this
    if(that.data.title=="编辑"){
      wx.request({
        //获取openid接口   
        url: 'https://apis.sdcsoft.com.cn/webapi/boilermanage/productcategory/modify',

        data: that.data.productcategory,
        method: 'post',
        success: function (data) {
          wx.navigateBack({
            
          })
        }
      })
    }else{
      wx.request({
        //获取openid接口   
        url: 'https://apis.sdcsoft.com.cn/webapi/boilermanage/productcategory/create',

        data: that.data.productcategory,
        method: 'post',
        success: function (data) {
          wx.navigateBack({
            
          })
        }
      })
    }
   
  },

})
