//logs.js
const util = require('../../utils/util.js')
const app = getApp()

Page({
  data: {
    productList:[],
    productCategoryList: [],
    serviceCycle:""
  },
  onLoad: function (options) {
      let product = JSON.parse(options.product);
     
      let arr=[]
      arr.push(product)
      this.setData({
        productList: arr,
      })
      let that=this
      wx.request({
        //获取openid接口   
        url: 'https://apis.sdcsoft.com.cn/webapi/boilermanage/productcategory/list',
        method: 'get',
        success: function (res) {
          that.setData({
            productCategoryList: res.data.data,
          })
        }
        })
  },
})
