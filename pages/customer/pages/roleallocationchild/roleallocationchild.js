const util = require('../../utils/util.js')
const app = getApp()
Page({

  data: {
   resIdList:[],
   resId:null,
    menuschild:[],
    listResource:[],
   roleId:null,
   id:null
  },
  onLoad: function (options) {
    let menuschild = JSON.parse(options.menuschild);
    let listResource = JSON.parse(options.listResource);
   
    this.setData({
      menuschild: menuschild,
      roleId: options.roleId,
      listResource: listResource,
      id:options.id
    })
  },
  checkboxChange(e) {

    this.setData({
      resIdList: e.detail.value,
      resId:1,
    })
    let arr = this.data.listResource
    for(let i=0;i<arr.length;i++){
      if (arr[i].id == this.data.id){
        if (arr[i].menuschild.length != 0){
          if (this.data.resId == 1){
            arr[i].checked = false
            for (let j = 0; j < arr[i].menuschild.length; j++) {
              arr[i].menuschild[j].checked = false
             
                for (let z = 0; z < this.data.resIdList.length; z++) {
                  if (arr[i].menuschild[j].id == this.data.resIdList[z]) {
                    arr[i].menuschild[j].checked = true
                    arr[i].checked = true
                  }
                }
            }
          }
         
        }else{
         if(this.data.resId==1){
           if (this.data.resIdList.length > 0) {
             for (let z = 0; z < this.data.resIdList.length; z++) {
               if (arr[i].id == this.data.resIdList[z]) {
                 console.log(arr[i].id)
                 arr[i].checked = true
               }
             }
           } else {
             arr[i].checked = false
           }
         }
        }
       
      }
      
    }
    wx.setStorage({
      key: "listResource",
      data: arr
    })
console.log(arr)

  },
  quenyButton1:function(){
    let arr = this.data.listResource
for(let i=0;i<arr.length;i++){
  if (arr[i].id == this.data.id){
    if (arr[i].menuschild.length != 0){
      if (this.data.resId == 1){
        arr[i].checked = false
        for (let j = 0; j < arr[i].menuschild.length; j++) {
          arr[i].menuschild[j].checked = false
         
            for (let z = 0; z < this.data.resIdList.length; z++) {
              if (arr[i].menuschild[j].id == this.data.resIdList[z]) {
                arr[i].menuschild[j].checked = true
                arr[i].checked = true
              }
            }
        }
      }
     
    }else{
     if(this.data.resId==1){
       if (this.data.resIdList.length > 0) {
         for (let z = 0; z < this.data.resIdList.length; z++) {
           if (arr[i].id == this.data.resIdList[z]) {
             console.log(arr[i].id)
             arr[i].checked = true
           }
         }
       } else {
         arr[i].checked = false
       }
     }
    }
   
  }
  
}
console.log(arr)
    let listResource = JSON.stringify(arr)
    let resIdList = JSON.stringify(this.data.resIdList)
    wx.navigateTo({
      url: '../roleallocation/roleallocation?title=职务&roleId=' + this.data.roleId + '&listResource=' + listResource + "&resIdList=" + resIdList
    })
  },
})
