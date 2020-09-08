const util = require('../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: null,
    index: 0,
    show: false,
    user: {
      employeeId: null,
      id: null,
      listResource: null,
      mark: "",
      orgId: null,
      roleId: null,
      roleName: "",
      userName: "",
    },
    invCode:null,
    roleList:[],
    role:{
      id: null,
      roleName: "",
      userId: null
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    if(options.title=="编辑"){
      wx.setNavigationBarTitle({
        title: '编辑员工' 
      })
    }else{
      wx.setNavigationBarTitle({
        title: '职务管理' 
      })
    }
      let user = JSON.parse(options.user);
      that.setData({
        user: user,
        title: options.title
      })
      wx.request({
        //获取openid接口   
        url: 'https://apis.sdcsoft.com.cn/webapi/boilermanage/role/list',
        data: {
          pageNum: 1,
          pageSize: 100
        },
        method: 'get',
        success: function (res) {
          that.setData({
            roleList: res.data.data.list,
          })
        }
      })
   
  },
  selectTap() {
    this.setData({
      show: !this.data.show
    });
  },
  
  optionTap(e) {
    let arr = []

    let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    this.setData({
      "role.id": e.currentTarget.dataset.bean.id,
      "role.roleName": e.currentTarget.dataset.bean.roleName,
      "role.userId": this.data.user.id,
      index: Index,
      show: !this.data.show
    });

  },
  userNameInput(e) {
    this.setData({
      "user.userName": e.detail.value
    })
  },
  markInput(e) {
    this.setData({
      "user.mark": e.detail.value
    })
  },
  quenyButton1(){
    let that=this
    wx.request({
      //获取openid接口   
      url: 'https://apis.sdcsoft.com.cn/webapi/boilermanage/user/modify',
      data: that.data.user,
      method: 'post',
      success: function (res) {
        wx.navigateBack({
            
        })
      }
    })
  },
  quenyButton() {
    let that = this
    wx.request({
      //获取openid接口   
      url: 'https://apis.sdcsoft.com.cn/webapi/boilermanage/user/role/modify?userId=' + that.data.user.id,
      data: that.data.role,
      method: 'post',
      success: function (res) {
        wx.navigateBack({
            
        })
      }
    })
  },
})
