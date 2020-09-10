const util = require('../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuShow: false,
    index1: null,
    show1: false,
    index2: null,
    show2: false,
    index3: null,
    show3: false,
    title: null,
    selectData: [],
    productType: [],
    fuelList: [],
    mediuList: [],
    product: {
      orgId:null,
      id:null,
      boilerNo: "",
      boilerName:null,
      serviceEndDate:null,
      serviceCycle:null,
      mark:null,
      saleDate: null,
      controllerNo: "",
      customerName: "",
      productCategoryId: null,
      tonnageNum: "",
      media: null,
      power: null,
      createDateTime:null,
      editDateTime: null,
      userId: app.globalData.customer.userId,
      isSell: null,
      productCategoryName: null,
      roleIdArray: {roleId:null,roleName:null,},
    
    },
  
   productList:[],
    productCategoryList: [],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    var DATE = util.formatTime(new Date());
    var date = DATE.substring(0, 10);
    that.setData({
      "product.serviceEndDate":date
    })
    if (options.title=="编辑"){
      wx.setNavigationBarTitle({
        title: '编辑锅炉' 
      })
      let product = JSON.parse(options.product);
      that.setData({
        product: product,
        index1: options.index1,
        index2: options.index2,
        index3: options.index3,
        title: options.title
      })
     
    }else{
      wx.setNavigationBarTitle({
        title: '添加锅炉' 
      })
    }
    wx.request({
      //获取openid接口   
      url: 'https://apis.sdcsoft.com.cn/webapi/boilermanage/productcategory/list',
      method: 'get',
      success: function (res) {
        that.setData({
          productCategoryList: res.data.data,
        })
        wx.request({
          //获取openid接口   
          url: 'https://apis.sdcsoft.com.cn/webapi/boilermanage/product/search?pageNum=1&pageSize=100',
          data: that.data.product,
          method: 'post',
          success: function (data) {
            that.setData({
              productList: data.data.data.list,
            })
          }
        })
      }
    })
    wx.request({
      //获取openid接口   
      url: 'https://apis.sdcsoft.com.cn/webapi/boilermanage/productcategory/list',

      method: 'get',
      success: function (res) {
        let arr = res.data.data
        let arr1 = { name: "请选择" }
        arr.push(arr1)
        if(that.data.index1==null){
          that.setData({
            productType: arr,
            index1: arr.length - 1
          })
        }else{
          that.setData({
            productType: arr,
          })
        }
       
      }
    })
    wx.request({
      //获取openid接口   
      url: 'https://apis.sdcsoft.com.cn/webapi/boilermanage/dictionaryvalue/list',
      data: {
        type: "fuel"
      },
      method: 'get',
      success: function (res) {
        let arr = res.data.data
        let arr1 = { label: "请选择" }
        arr.push(arr1)
        if(that.data.index2==null){
          that.setData({
            fuelList: arr,
            index2: arr.length - 1
          })
        }else{
          that.setData({
            fuelList: arr,
          })
        }
       
      }
    })
    wx.request({
      //获取openid接口   
      url: 'https://apis.sdcsoft.com.cn/webapi/boilermanage/dictionaryvalue/list',
      data: {
        type: "medium"
      },
      method: 'get',
      success: function (res) {
        let arr = res.data.data
        let arr1 = { label: "请选择" }
        arr.push(arr1)
        if (that.data.index3 == null) {
          that.setData({
            mediuList: arr,
            index3: arr.length - 1
          })
        } else {
          that.setData({
            mediuList: arr,
          })
        }
      }
    })

  },
  selectTap1() {
    this.setData({
      show1: !this.data.show1
    });
  },
  selectTap2() {
    this.setData({
      show2: !this.data.show2
    });
  },
  selectTap3() {
    this.setData({
      show3: !this.data.show3
    });
  },
  // 点击下拉列表
  optionTap1(e) {
    let arr = []
    let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    if (e.currentTarget.dataset.bean.name == "请选择") {
      wx.showToast({
        title: '请选择设备类型',
        icon: 'none',
        duration: 1500
      })
    } else {
      this.setData({
        "product.productCategoryId": e.currentTarget.dataset.bean.id,
        index1: Index,
        show1: !this.data.show1
      });
    }
  },
  optionTap2(e) {
    let arr = []
    let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    if (e.currentTarget.dataset.bean.label == "请选择") {
      wx.showToast({
        title: '请选择燃料',
        icon: 'none',
        duration: 1500
      })
    } else {
      this.setData({
        "product.power": e.currentTarget.dataset.bean.value,
        index2: Index,
        show2: !this.data.show2
      });
    }
  },
  optionTap3(e) {
    let arr = []
    let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    if (e.currentTarget.dataset.bean.label == "请选择") {
      wx.showToast({
        title: '请选择介质',
        icon: 'none',
        duration: 1500
      })
    } else {
      this.setData({
        "product.media": e.currentTarget.dataset.bean.value,
        index3: Index,
        show3: !this.data.show3
      });
    }
  },
  menuItemClick:function(e){
    if (e.detail.iteminfo.id==1){
      this.setData({
        menuShow: true,
      })
    }
   
  },
  boilerNoInput:function(e){
    let that = this
    that.setData({
      "product.boilerNo": e.detail.value,
    })
  },
  controllerNoInput: function (e) {
    let that = this
    that.setData({
      "product.controllerNo": e.detail.value,
    })
  },
  addDevice:function(){
    let that=this
    wx.scanCode({
      success(res) {
        that.setData({
          "product.controllerNo":res.result,
        })
       
      }
    })
  },
  
  tonnageNumInput: function (e) {
    let that = this
    that.setData({
      "product.tonnageNum": e.detail.value,
    })
  },
  serviceCycleInput: function (e) {
    let that = this
    that.setData({
      "product.serviceCycle": e.detail.value,
    })
  },
  boilerNameInput: function (e) {
    let that = this
    that.setData({
      "product.boilerName": e.detail.value,
    })
  },
  bindDateChange: function (e) {
    let that = this
    that.setData({
      "product.serviceEndDate": e.detail.value,
    })
  },
  markInput: function (e) {
    console.log(e.detail.value)
    let that = this
    that.setData({
      "product.mark": e.detail.value,
    })
  },
  quenyButton1:function(){
    let that = this
    if(that.data.title=="编辑"){
      that.setData({
        "product.roleIdArray.roleId": app.globalData.customer.roleId,
        "product.roleIdArray.roleName": app.globalData.customer.roleName,
        "product.editDateTime": util.formatTime(new Date()),
        "product.boilerName": null,
        "product.serviceEndDate": null,
        "product.mark": null,
        "product.serviceCycle": null,
      })
      wx.request({
        //获取openid接口   
        url: 'https://apis.sdcsoft.com.cn/webapi/boilermanage/product/modify',
        data: that.data.product,
        method: 'post',
        success: function (data) {
          wx.navigateBack({
            
          })
        }
      })
    }else{
     
      that.setData({
        "product.userId": app.globalData.customer.userId,
        "product.roleIdArray.roleId": app.globalData.customer.roleId,
        "product.roleIdArray.roleName": app.globalData.customer.roleName,
        "product.isSell": 0,
        "product.orgId": app.globalData.customer.orgId,
        "product.createDateTime": util.formatTime(new Date()),
        "product.editDateTime": util.formatTime(new Date()),
        "product.boilerName": null,
        "product.serviceEndDate": null,
        "product.mark": null,
        "product.serviceCycle": null,
      })
      wx.request({
        //获取openid接口   
        url: 'https://apis.sdcsoft.com.cn/webapi/boilermanage/product/create',
        data: that.data.product,
        method: 'post',
        success: function (data) {
          wx.navigateBack({
            
          })
        }
      })
    }
   
  },
})
