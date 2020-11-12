//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    title:null,
    menuShow:false,
    index: 0,
    show: false,
    customerName:"",
    selectData: [],
    customerList: [],
    customer:{
      address: null,
      city: null,
      customerNo: null,
      district: null,
      id: null,
      name: null,
      orgId: null,
      phone: null,
      province: null,
    },
    menulist: [
      {
        "id": "1",
        "url": "../../../images/customer/select.png",
        "title": "搜索",
      },
      {
        "pageUrl": "boiler-customeradd",
        "id": "2",
        "url": "../../../images/customer/add.png",
        "title": "添加",
      },

    ],
    mainmodel: {
      "url": "../../../images/customer/home.png",
      "title": "菜单",
    }
  },
  onShow: function () {
    let that=this
    wx.request({
      //获取openid接口   
      url: 'https://apis.sdcsoft.com.cn/webapi/boilermanage/customer/list',
      data: {
        pageNum: 1,
        pageSize: 100,
      },
      method: 'get',
      success: function (res) {
        that.setData({
          customerList: res.data.data.list
        })
      }
    })
    wx.request({
      //获取openid接口   
      url: 'https://apis.sdcsoft.com.cn/webapi/boilermanage/customer/list',
      data: {
        pageNum: 1,
        pageSize: 1000
      },
      method: 'get',
      success: function (res) {
        let arr = res.data.data.list
        let arr1 = { name: "全部" }
        arr.push(arr1)
        that.setData({
          selectData: arr,
          index: arr.length - 1
        })
      }
    })
  },
  closeButton:function(){
    this.setData({
      menuShow: false,
    })
  },
  menuItemClick: function (e) {
    if (e.detail.iteminfo.id == 1) {
      this.setData({
        menuShow: true,
      })
    }
    if (e.detail.iteminfo.id == 2) {
      wx.navigateTo({
        url: '../boiler-customeradd/boiler-customeradd?title=添加'
      })
    }

  },
  selectTap() {
    this.setData({
      show: !this.data.show
    });
  },
  optionTap(e) {
    let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
      this.setData({
       customerName: e.currentTarget.dataset.bean.name,
        index: Index,
        show: !this.data.show
      });
  },
  
  quenyButton1: function (e) {
    let that = this
    console.log(that.data.customerName)
    if(that.data.customerName=="全部"||that.data.customerName==""){
      wx.request({
        //获取openid接口   
        url: 'https://apis.sdcsoft.com.cn/webapi/boilermanage/customer/list',
        data: {
          pageNum: 1,
          pageSize: 100,
        },
        method: 'get',
        success: function (res) {
          that.setData({
            customerList: res.data.data.list,
            menuShow: false,
          })
        }
      })
    }else{
      wx.request({
        //获取openid接口   
        url: 'https://apis.sdcsoft.com.cn/webapi/boilermanage/customer/search',
        data: {
          name: that.data.customerName,
        },
        method: 'get',
        success: function (res) {
          that.setData({
            customerList: res.data.data,
            menuShow: false,
          })
        }
      })
    }
   
  },
  
  Click1: function (e) {
    let that=this
    let customer = JSON.stringify(e.currentTarget.dataset.bean)   
    wx.showActionSheet({
      itemList: ['编辑', '删除'],
      success(res) {
        if (res.tapIndex==0){
          wx.navigateTo({
            url: '../boiler-customeradd/boiler-customeradd?title=编辑&customer=' + customer,
          })
        }
        if (res.tapIndex == 1) {
          wx.showModal({
            title: '提示',
            content: '确定要删除吗？',
            success: function (sm) {
              if (sm.confirm) {
                wx.request({
                  url: 'https://apis.sdcsoft.com.cn/webapi/boilermanage/customer/remove',
                  header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                  },
                  data: {
                    id: e.currentTarget.dataset.bean.id,
                  },
                  method: 'post',
                  success: function (data) { 
                    if (data.data.code==0){
                      wx.showToast({
                        title: '删除成功',
                        icon: 'success',
                        duration: 2000
                      })
                      that.onShow();
                    }else{
                      wx.showToast({
                        title: data.data.msg,
                        icon: 'none',
                        duration: 2000
                      })
                    }
                   
                  },
                })
                } else if (sm.cancel) {
                  wx.showToast({
                    title: '已取消',
                    icon: 'success',
                    duration: 2000
                  })
                }
              }
            })
       
        }
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },
})
