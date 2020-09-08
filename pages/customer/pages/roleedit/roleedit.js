const util = require('../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: null,
    role:{
      id: null,
      orgId: null,
      roleDesc: "",
     roleName: "",
     roleResourceList: null
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this
    if (options.title=="编辑"){
      wx.setNavigationBarTitle({
        title: '编辑职务' 
      })
      let role = JSON.parse(options.role);
      that.setData({
        role: role,
        title: options.title
      })
    }else{
      wx.setNavigationBarTitle({
        title: '添加职务' 
      })
    }
    
    that.setData({
      title: options.title,
      "role.orgId": app.globalData.customer.orgId
    })
  },
  roleNameInput(e) {
    this.setData({
      "role.roleName": e.detail.value
    })
  },
  roleDescInput(e) {
    this.setData({
      "role.roleDesc": e.detail.value
    })
  },
  quenyButton1(){
    let that=this
    if(that.data.title=="编辑"){
      wx.request({
        //获取openid接口   
        url: 'https://apis.sdcsoft.com.cn/webapi/boilermanage/role/modify',
        data: that.data.role,
        method: 'post',
        success: function (res) {
          wx.navigateBack({
            
          })
        }
      })
    }else{
      wx.request({
        //获取openid接口   
        url: 'https://apis.sdcsoft.com.cn/webapi/boilermanage/role/create',
        data: that.data.role,
        method: 'post',
        success: function (res) {
          wx.navigateBack({
            
          })
        }
      })
    }
   
  },
})
