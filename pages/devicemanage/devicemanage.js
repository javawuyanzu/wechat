// pages/devicemanage/devicemanage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    enterpriseList:[],
    enterpriseIndex:-1,
    enterpriseId:-1,
    customerList:[],
    customerIndex:-1,
    customerId:-1,
    lastDeviceNo:"",
    codeList:[],
    codeIndex:-1,
    code:"",
    startNo:"",
    endNo:"",
  },
  submit() {
    var that=this
    
    if(that.data.startNo==""||that.data.endNo==""){
      wx.showToast({
        title: "所开编号不能为空",
        icon: 'none',
        duration: 5000
      });
      return
    }
    var startNo=that.data.startNo
    var endNo=that.data.endNo
    if(startNo.length<5){
      var num =5-startNo.length
      var prefix="";
      for(var i =0;i<num;i++){
        prefix+="0"
      }
    }
    startNo=that.data.code+prefix+startNo
    if(endNo.length<5){
      var num =5-endNo.length
      var prefix="";
      for(var i =0;i<num;i++){
        prefix+="0"
      }
    }
    endNo=that.data.code+prefix+endNo

    
     startNo=Number(startNo)-1
     endNo=Number(endNo)
    var deviceList=[]
    var length=endNo-startNo
    for(var i =0;i<length;i++){
      startNo++
      deviceList.push({
        deviceNo:"0"+startNo.toString(),
        deviceSuffix:"0"+startNo.toString(),
        deviceType:"CTL_NJZJ_IPK2",
        enterpriseId:that.data.enterpriseId,
        subType:"CTL_NJZJ_IPK2",
      })
    }
    wx.request({
      url: 'https://apis.sdcsoft.com.cn/webapi/datacenter/core/device/create/wechat',
      method: "POST",
      data: {
        deviceList:JSON.stringify(deviceList),
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
      },
      success: function (res) {
        console.log(res)
        if(res.data.code==0){
          wx.showToast({
            title: "success",
            icon: 'success',
            duration: 5000
          });
        }
      }
    })
  },
  
  inputStartNo(e) {
    var that=this
    that.setData({
      startNo:e.detail.value
    })
  },
  inputEndNo(e) {
    var that=this
    that.setData({
      endNo:e.detail.value
    })
  },
  
  bindCodeChange: function (e) {
    var that=this
    var index =e.detail.value
    that.setData({
      code:that.data.codeList[index].code,
      lastDeviceNo:that.data.codeList[index].lastDeviceNo,
      codeIndex:index
    });
    
  },
  bindCustomerChange: function (e) {
    var that=this
    var index =e.detail.value
    var customerId=that.data.customerList[index].id
    that.setData({
      customerId:customerId,
      customerIndex:index
    });
    wx.request({
      url: 'https://apis.sdcsoft.com.cn/webapi/datacenter/core/enterprise/customer/prefix/list',
      method: "GET",
      data: {
        enterpriseCustomerId:customerId,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data.data)
       that.setData({
        codeList:res.data.data
      });
      }
    })
  },
  bindEnterpriseChange: function (e) {
    var that=this
    var index =e.detail.value
    var enterpriseId=that.data.enterpriseList[index].id
    that.setData({
      enterpriseId:enterpriseId,
      enterpriseIndex:index
    });
    wx.request({
      url: 'https://apis.sdcsoft.com.cn/webapi/datacenter/core/enterprise/customer/list',
      method: "GET",
      data: {
        enterpriseId:enterpriseId,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
       that.setData({
        customerList:res.data.data
      });
      }
    })
  },
  onLoad: function (options) {
    var that =this
    wx.request({
      url: 'https://apis.sdcsoft.com.cn/account/datamanage/login',
      method: "POST",
      data: {
        loginId:"18888281821",
        password:"123456"
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
       wx.request({
        url: 'https://apis.sdcsoft.com.cn/webapi/datacenter/core/enterprise/list',
        method: "GET",
        data: {
        },
        success: function (res) {
         that.setData({
          enterpriseList:res.data.data
         })
        }
      })
      }
    })
  },

 
})