//logs.js
const util = require('../../utils/util.js')
const app = getApp()

Page({
  data: {
    deviceNo:null,
    auliliaryList: {
      amountOfUser: null,
      brandName: null,
      id: null,
      modelName: null,
      partCategoryId: null,
      partSubCategoryId: null,
      productId: null,
      remarks: null,
      supplier: null
    },
    product: {
      orgId: null,
      id: null,
      boilerNo: "",
      saleDate: null,
      controllerNo: "",
      customerName: "",
      productCategoryId: null,
      tonnageNum: "",
      media: null,
      power: null,
      createDateTime: null,
      editDateTime: null,
      userId: app.globalData.customer.userId,
      isSell: null,
      productCategoryName: null,
      roleIdArray: { roleId: null, roleName: null },
    },
   
  },
  onLoad: function (options) {
  },
 
  nameInput(e) {
    this.setData({
      deviceNo: e.detail.value,
      
    })
  },
  quenyButton1: function (e) {
    let that = this
    wx.request({
      //获取openid接口   
      url:  'https://apis.sdcsoft.com.cn/webapi/output/decoder/decode',
                data:  {
                  deviceNo: that.data.deviceNo,
                },
                header:  {
                    "Content-Type":  "application/x-www-form-urlencoded;charset=utf-8"
                },
                method:  'GET',
      success: function (data) {
       
        wx.request({
          //获取openid接口   
          url: 'https://apis.sdcsoft.com.cn/webapi/boilermanage/productcategory/list',
          method: 'get',
          success: function (res) {
            that.setData({
              "product.userId": app.globalData.customer.userId,
              "product.controllerNo": data.data.data.deviceSuffix,
              "product.productCategoryId": res.data.data[0].id,
              "product.createDateTime": util.formatTime(new Date()),
              "product.isSell": 0,
              "product.orgId": app.globalData.customer.orgId,
              "product.roleIdArray.roleId": app.globalData.customer.roleId,
              "product.roleIdArray.roleName": app.globalData.customer.roleName,
            })
            wx.request({
              //获取openid接口   
              url: 'https://apis.sdcsoft.com.cn/webapi/boilermanage/product/create',
              data: that.data.product,
              method: 'post',
              success: function (resport) {
               
                that.setData({
                  "auliliaryList.modelName": data.data.data.deviceType,
                  "auliliaryList.brandName": "",
                  "auliliaryList.amountOfUser": 1,
                  "auliliaryList.partCategoryId": 41,
                  "auliliaryList.partSubCategoryId": 5,
                  "auliliaryList.productId": resport.data.data,
                  "auliliaryList.remarks": "",
                  "auliliaryList.supplier": ""
                })
                let arr=[]
                arr.push(that.data.auliliaryList)
                wx.request({
                  //获取openid接口   
                  url: 'https://apis.sdcsoft.com.cn/webapi/boilermanage/productpartinfo/create',
                  data: arr,
                  method: 'post',
                  success: function (data) {
                    wx.showToast({
                      title: '添加成功',
                      icon: 'none',
                      duration: 1500
                    })
                  }
                })
              }
            })
          }
        })
      }
    })
   
  },
  addDevice:function(){
    let that=this
    wx.scanCode({
      success(res) {
        let deviceNo = res.result
        wx.request({
          //获取openid接口   
          url:  'https://apis.sdcsoft.com.cn/webapi/output/decoder/decode',
                    data:  {
                      deviceNo: deviceNo,
                    },
                    header:  {
                        "Content-Type":  "application/x-www-form-urlencoded;charset=utf-8"
                    },
                    method:  'GET',
          success: function (data) {
           
            wx.request({
              //获取openid接口   
              url: 'https://apis.sdcsoft.com.cn/webapi/boilermanage/productcategory/list',
              method: 'get',
              success: function (res) {
                that.setData({
                  "product.userId": app.globalData.customer.userId,
                  "product.controllerNo": data.data.data.deviceSuffix,
                  "product.productCategoryId": res.data.data[0].id,
                  "product.createDateTime": util.formatTime(new Date()),
                  "product.isSell": 0,
                  "product.orgId": app.globalData.customer.orgId,
                  "product.roleIdArray.roleId": app.globalData.customer.roleId,
                  "product.roleIdArray.roleName": app.globalData.customer.roleName,
                })
                wx.request({
                  //获取openid接口   
                  url: 'https://apis.sdcsoft.com.cn/webapi/boilermanage/product/create',
                  data: that.data.product,
                  method: 'post',
                  success: function (resport) {
                   
                    that.setData({
                      "auliliaryList.modelName": data.data.data.deviceType,
                      "auliliaryList.brandName": "",
                      "auliliaryList.amountOfUser": 1,
                      "auliliaryList.partCategoryId": 41,
                      "auliliaryList.partSubCategoryId": 5,
                      "auliliaryList.productId": resport.data.data,
                      "auliliaryList.remarks": "",
                      "auliliaryList.supplier": ""
                    })
                    let arr=[]
                    arr.push(that.data.auliliaryList)
                    wx.request({
                      //获取openid接口   
                      url: 'https://apis.sdcsoft.com.cn/webapi/boilermanage/productpartinfo/create',
                      data: arr,
                      method: 'post',
                      success: function (data) {
                        wx.showToast({
                          title: '添加成功',
                          icon: 'none',
                          duration: 1500
                        })
                       
                      }
                    })
                  }
                })
              }
            })
          }
        })
       
      }
    })
  }

})
