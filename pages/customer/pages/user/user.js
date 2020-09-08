const util = require('../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: null,
    userList:[],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    let that=this
    wx.request({
      //获取openid接口   
      url: 'https://apis.sdcsoft.com.cn/webapi/boilermanage/user/list',
      data: {
         pageNum:1, pageSize:100,
      },
      method: 'get',
      success: function (res) {
        that.setData({
          userList: res.data.data.list,
        })
      }
    })
  },
 
  

  Click1:function(e){
    let that =this
    let user = JSON.stringify(e.currentTarget.dataset.bean)   
   
    wx.showActionSheet({
      itemList: ['编辑',' 职务管理' ,'删除'],
      success(res) {
        if (res.tapIndex == 0) {
          wx.navigateTo({
            url: '../useredit/useredit?user=' + user+'&title=编辑',
          })
        }
        if (res.tapIndex == 1) {
          console.log(e.currentTarget.dataset.bean)
          if (e.currentTarget.dataset.bean.roleId==1){
            wx.showToast({
              title: "无法对系统管理员进行操作",
              icon: 'none',
              duration: 2000
            })
          }else{
            wx.navigateTo({
              url: '../useredit/useredit?user=' + user + '&title=职务管理',
            })
          }
         
        }
        if (res.tapIndex == 2) {
          wx.showModal({
            title: '提示',
            content: '确定要删除吗？',
            success: function (sm) {
              if (sm.confirm) {
                wx.request({
                  url: 'https://apis.sdcsoft.com.cn/webapi/boilermanage/user/remove',
                  header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                  },
                  data: {
                    id: e.currentTarget.dataset.bean.id,
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
