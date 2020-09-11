//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js')
Page({
  data: {
    show:false,
    menusInfo: [],
    listResource: [],
    hasUserInfo: false,
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
  //事件处理函数
  onLoad: function () {
    wx.getStorage({
            key: 'roleType',
            success(res) {
              if (res.data !=2) {
                wx.setStorageSync('roleType',2)
              }
            },
            fail(res) {
              wx.setStorageSync('roleType', "2")
            },
          })
    let that=this
            wx.request({
              //获取openid接口   
              url: 'https://apis.sdcsoft.com.cn/account/wechat/customer/login',
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              data: {
                openId: app.globalData.customer.openId,
              },
              method: 'post',
              success: function (res) {
                app.globalData.customer.userName = res.data.data.realName
                app.globalData.customer.userId = res.data.data.id
               
                wx.request({
                  //获取openid接口   
                  url: 'https://apis.sdcsoft.com.cn/webapi/boilermanage/user/info',
                  data: {
                    employeeId:res.data.data.id,
                  },
                  method: 'get',
                  success: function (data) {
                    app.globalData.customer.orgId = data.data.data.orgId
                    
                    app.globalData.customer.roleName = data.data.data.roleName
                    app.globalData.customer.roleId = data.data.data.roleId
                    app.globalData.customer.listResource = data.data.data.listResource
                    let list = []
                    list = data.data.data.listResource
                    for (let i = 0; i < list.length; i++) {
                      if (list[i].id == 37 || list[i].pId == 37 || list[i].id == 48 || list[i].pId == 48 || list[i].id == 42) {
                        list[i].show1 == false
                      }
                      else {
                        list[i].show1 = true
                      }

                    }
                    that.setData({
                      listResource: list
                    })
                    let arr = []
                    for (let i = 0; i < that.data.listResource.length; i++) {
                      if (that.data.listResource[i].pId == 0) {
                        arr.push(that.data.listResource[i])
                      }
                    }

                    for (let j = 0; j < arr.length; j++) {
                      let arr1 = []
                      for (let i = 0; i < that.data.listResource.length; i++) {
                        if (that.data.listResource[i].pId == arr[j].id) {
                          arr1.push(that.data.listResource[i])
                        }
                      }
                      arr[j].menuschild = arr1
                    }
                    let arr3 = { id: 0, hidden: true, show1: true, resName: "控制器/控制柜" }
                    let arr4 = { pId: 2,hidden: 0,resName: "获取邀请码",url:"invcode", show1: true }
                   
                    for (let j = 0; j < arr.length; j++) {
                    
                      if (arr[j].pageUrl != null && arr[j].menuschild != null) {
                        arr[j].hidden = true
                      }
                      if (arr[j].id == 2 ) {
                        arr[j].menuschild.push(arr4)
                      }
                    }
                    if(app.globalData.customer.roleId!=null&&app.globalData.customer.roleId!=0){
                      arr.push(arr3)
                    }
                   
                    let temp;
                    for (let i = 0; i < arr.length; i++) {
                      for (let j = i + 1; j < arr.length; j++) {
                        if (arr[i].id > arr[j].id) {
                          temp = arr[i];
                          arr[i] = arr[j];
                          arr[j] = temp;
                        }
                      }
                    }
                    that.setData({
                      menusInfo: arr
                    })
                    if(that.data.menusInfo.length==0){
                      that.setData({
                        show: true
                      })
                    }else{
                      that.setData({
                        show: false
                      })
                    }
                  }
                })
              }
            })
  },
  menus: function(e) {
    console.log(e.currentTarget.dataset.bean)
    if(e.currentTarget.dataset.bean.resName=="获取邀请码"){
      console.log(1111)
      let that=this
      wx.request({
        //获取openid接口   
        url: 'https://apis.sdcsoft.com.cn/webapi/boilermanage/user/invcode/create',
        data: {
          openId: app.globalData.customer.openId,
  
        },
        method: 'get',
        success: function (res) {
          wx.setClipboardData({
            data: res.data.data,
            success (res) {
              wx.hideToast();
              wx.showToast({
                title: '邀请码已复制',
                icon: 'none',
                duration: 1500
              })
            }
          })
        }
      })
    }else{
      let arr=[]
      arr = this.data.menusInfo
      if (e.currentTarget.dataset.bean.show==true){
        if (e.currentTarget.dataset.bean.hidden==true){
          for (let i = 0; i < arr.length; i++) {
            if (e.currentTarget.dataset.bean.id == arr[i].id) {
              arr[i].hidden = false
            }
          }
        }else{
          for (let i = 0; i < arr.length; i++) {
            if (e.currentTarget.dataset.bean.id == arr[i].id) {
              arr[i].hidden = true
            }
          }
        }
     }else{
        let url = e.currentTarget.dataset.bean.url
        wx.navigateTo({
          url: '../' + url + '/' + url +''　　// 页面 A
        })
     }
      this.setData({
        menusInfo: arr
      })
    }
  
  },
  addDevice:function(){
    let that=this
    wx.navigateTo({
      url: '../boileradd/boileradd'　　// 页面 A
    })
  }
})
