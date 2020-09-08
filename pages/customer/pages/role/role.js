const util = require('../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: null,
    roleList:[],
    menulist: [
      {
        "pageUrl": "boiler-modeladd",
        "id": "1",
        "url": "../../../images/customer/add.png",
        "title": "添加",
      },

    ],
    mainmodel: {
      "url": "../../../images/customer/home.png",
      "title": "菜单",
    },
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    let that=this
    wx.request({
      //获取openid接口   
      url: 'https://apis.sdcsoft.com.cn/webapi/boilermanage/role/list',
      data: {
         pageNum:1, pageSize:100,
      },
      method: 'get',
      success: function (res) {
        that.setData({
          roleList: res.data.data.list,
        })
      }
    })
  },
  menuItemClick: function (e) {

    if (e.detail.iteminfo.id == 1) {
      wx.navigateTo({
        url: '../roleedit/roleedit?title=添加',
      })
    }

  },
  Click1:function(e){
    let that =this
    let role = JSON.stringify(e.currentTarget.dataset.bean)   
   
    wx.showActionSheet({
      itemList: ['编辑',' 分配权限' ,'删除'],
      success(res) {
        if (res.tapIndex == 0) {
          wx.navigateTo({
            url: '../roleedit/roleedit?role=' + role+'&title=编辑',
          })
        } 
        if (res.tapIndex == 1) {
          wx.navigateTo({
            url: '../roleallocation/roleallocation?roleId=' + e.currentTarget.dataset.bean.id + '&title=分配权限',
          })
         
        }
        if (res.tapIndex == 2) {
          wx.showModal({
            title: '提示',
            content: '确定要删除吗？',
            success: function (sm) {
              if (sm.confirm) {
                wx.request({
                  url: 'https://apis.sdcsoft.com.cn/webapi/boilermanage/role/remove',
                  header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                  },
                  data: {
                    roleId: e.currentTarget.dataset.bean.id,
                  },
                  method: 'post',
                  success: function (data) {
                    if (data.data.code == 0) {
                      wx.showToast({
                        title: '删除成功',
                        icon: 'success',
                        duration: 2000
                      })
                     that.onShow()
                    } else {
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
