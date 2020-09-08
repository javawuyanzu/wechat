const util = require('../../utils/util.js')
const app = getApp()
Page({

  data: {
    listResource:[],
    arrayList:{},
    resource: [],
   roleList:[],
   menuList:[],
   show:true,
   roleId:null
  },
  onShow:function(){
    let that = this
    wx.getStorage({
      key: 'listResource',
      success (res) {
        if(res.data){
          that.setData({
            listResource: res.data,
          })
        }
      }
    })
  },
  onLoad: function (options) {
    let that = this
    if (options.title=="职务"){
      let listResource = JSON.parse(options.listResource);
      console.log(listResource)
      that.setData({
        listResource: listResource,
        roleId: options.roleId
      })
      
    }else{
      wx.request({
       
        url: 'https://apis.sdcsoft.com.cn/account/wechat/customer/login',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          openId: app.globalData.customer.openId,
        },
        method: 'post',
        success: function (res) {
          wx.request({
            //获取openid接口   
            url: 'https://apis.sdcsoft.com.cn/webapi/boilermanage/user/info',
            data: {
              employeeId: res.data.data.id,
            },
            method: 'get',
            success: function (data) {
              that.setData({
                resource: data.data.data.listResource
              })
              wx.request({
                //获取openid接口   
                url: 'https://apis.sdcsoft.com.cn/webapi/boilermanage/resource/role',
                data: {
                  roleId: options.roleId
                },
                method: 'get',
                success: function (res) {
                  that.setData({
                    roleList: res.data.data,
                    roleId: options.roleId
                  })
                  let arr1 = []
                  let arr2 = []
                  let arr3 = []
                  let arr = that.data.resource

                  for (let j = 0; j < arr.length; j++) {
                    for (let i = 0; i < that.data.roleList.length; i++) {
                      if (that.data.roleList[i].id == arr[j].id) {

                        arr[j].checked = true
                      }

                    }
                    if (arr[j].pId == 0) {
                      arr1.push(arr[j])
                      arr3.push(arr[j].id)
                    }
                  }
                  for (let j = 0; j < arr1.length; j++) {
                    let arr2 = []
                    for (let i = 0; i < arr.length; i++) {
                      if (arr[i].pId == arr1[j].id) {

                        arr2.push(arr[i])
                      }
                    }
                    arr1[j].menuschild = arr2
                  }
                  console.log(arr1)
                  that.setData({
                    listResource: arr1,
                  })
                }
              })
            }
          })
        }
      })
    }
  },
  
  checkboxChange(e) {
    if (e.currentTarget.dataset.bean.menuschild.length>0){
      let menuschild = JSON.stringify(e.currentTarget.dataset.bean.menuschild)
      let listResource = JSON.stringify(this.data.listResource)
      wx.navigateTo({
        url: '../roleallocationchild/roleallocationchild?menuschild=' + menuschild + '&roleId=' + this.data.roleId + '&listResource=' + listResource + "&id=" + e.currentTarget.dataset.bean.id
      })
    }else{
      let child = []
      child.push(e.currentTarget.dataset.bean)
      let menuschild = JSON.stringify(child)
      let listResource = JSON.stringify(this.data.listResource)
      wx.navigateTo({
        url: '../roleallocationchild/roleallocationchild?menuschild=' + menuschild + '&roleId=' + this.data.roleId + '&listResource=' + listResource + "&id=" + e.currentTarget.dataset.bean.id
      })
    }
    
  },
  quenyButton1:function(){
    let arr=[]
for(let i=0;i<this.data.listResource.length;i++){
  let arr2 = {}
  if (this.data.listResource[i].menuschild.length>0){
    if (this.data.listResource[i].checked == true){
      arr2.resId = this.data.listResource[i].id
      arr2.roleId = this.data.roleId
      arr.push(arr2)
   }
    for (let j = 0; j < this.data.listResource[i].menuschild.length; j++) {
      let arr1 = {}
      if (this.data.listResource[i].menuschild[j].checked ==true) {
       
        arr1.resId = this.data.listResource[i].menuschild[j].id
        arr1.roleId = this.data.roleId
        arr.push(arr1)
      }
     
    }
  }
   else{
    if (this.data.listResource[i].checked == true) {
      arr2.resId = this.data.listResource[i].id
      arr2.roleId = this.data.roleId
      arr.push(arr2)
     }
     
   }
}
let that=this

    wx.request({
      //获取openid接口   
      url: 'https://apis.sdcsoft.com.cn/webapi/boilermanage/role/resource/map?roleId=' + that.data.roleId,
      data: arr,
      method: 'post',
      success: function (res) {
        wx.setStorage({
          key: "listResource",
          data: null
        })
        wx.navigateBack({
            
        })
      }
    })
  },
  
})
