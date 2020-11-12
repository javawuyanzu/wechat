const util = require('../../utils/util.js')
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    key:"XLLBZ-E5ARW-HUORQ-RE4OO-N3WIO-T6BW4",
    menuShow:false,
    index: 0,
    conent:"",
    show: false,
    title: null,
    selectData: [],
    markersList:[],
    repairDate:"",
    markers: [],
    marker: [],
    productList:{},
    arr:{},
    date:null,
    product: {
      city:"",
      district:"",
      id: null,
      latitude:null ,
     longitude: null,
      saleDate: null,
      customerName: "",
      customerId: "",
      editDateTime: null,
      isSell: null,
      province: "",
      street: ""
    },
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow:function(){
    let that=this
   
    wx.request({
      //获取openid接口   
      url: 'https://apis.sdcsoft.com.cn/webapi/enterprise/customer/list',
      data: {
        pageNum: 1,
        pageSize: 1000
      },
      method: 'get',
      success: function (res) {
        that.setData({
          selectData: res.data.data.list,
        })
        if (that.data.arr.isSell == 1) {
          let index=""
          for (let i = 0; i < that.data.selectData.length;i++) {
            if (that.data.arr.customerId == that.data.selectData[i].id){
             index=i
}
          }
         
  //  实例化API核心类
  // var demo = new QQMapWX({
  //  key: that.data.key
  // });
  // // 调用接口
  // demo.reverseGeocoder({
  //  location: {
  //   latitude: that.data.arr.latitude,
  //   longitude: that.data.arr.longitude
  //  },
  //  coord_type: 3, //baidu经纬度
  //  success: function(res) {
  //   var latitude = res.result.ad_info.location.lat;
  //   var longitude = res.result.ad_info.location.lng;
  //   console.log(that.data.arr.latitude)
  //   console.log(latitude)
  //   var markers = [{
  //    iconPath: "../../images/customer/map.png",
  //    longitude: longitude,
  //    latitude: latitude,
  //    id: 1,
  //    width: 30,
  //    height: 30,
  //   }]
  //   that.setData({
  //     productList: that.data.arr,
  //     markers:markers,
  //     index: index,
  //     repairDate: that.data.arr.saleDate,
  //     conent: that.data.arr.street,
     
  //   })
  
  //  },
  // });  
  let location=that.bMapToQQMap(that.data.arr.longitude,that.data.arr.latitude)
  console.log(location)
  var markers = [{
    iconPath: "../../images/customer/map.png",
    longitude: location[0],
    latitude: location[1],
    id: 1,
    width: 30,
    height: 30,
   }]
   that.setData({
     productList: that.data.arr,
     markers:markers,
     index: index,
     repairDate: that.data.arr.saleDate,
     conent: that.data.arr.street,
    
   })
        } else {
        
          that.setData({
            productList: that.data.arr,
            "product.id": that.data.arr.id,
            "product.isSell": 1,
            repairDate: that.data.date,
          })
        }
      }
    })
  },
  onLoad: function (options) {
    var DATE = util.formatTime(new Date());
    var date = DATE.substring(0, 10);
    let product = JSON.parse(options.product);
   this.setData({
     arr:product,
     product:product,
     date:date
   })
  },
  
  regionchange(e) {
   
  },
  qqMapToBMap:function (lng, lat) {

    if (lng == null || lng == '' || lat == null || lat == '')
        return [lng, lat];

    var x_pi = 3.14159265358979324;
    var x = parseFloat(lng);
    var y = parseFloat(lat);
    var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
    var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
    var lng = (z * Math.cos(theta) + 0.0065).toFixed(5);
    var lat = (z * Math.sin(theta) + 0.006).toFixed(5);
    return [lng, lat];

},
bMapToQQMap:function (lng, lat) {

  if (lng == null || lng == '' || lat == null || lat == '')
      return [lng, lat];

  var x_pi = 3.14159265358979324;
  var x = parseFloat(lng) - 0.0065;
  var y = parseFloat(lat) - 0.006;
  var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
  var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
  var lng = (z * Math.cos(theta)).toFixed(7);
  var lat = (z * Math.sin(theta)).toFixed(7);

  return [lng, lat];

},
  bindrepairDateChange: function (e) {
    this.setData({
      repairDate: e.detail.value,
    })
  },
  conentInput(e) {
    this.setData({
      conent: e.detail.value
    })
  },
  getLocation:function(e){
    let that=this
wx.request({
            url: 'https://apis.map.qq.com/ws/geocoder/v1/?location='+e.detail.latitude+','+e.detail.longitude+'&key='+this.data.key,
             success: function (result) {
   
  let arr1=[{
    height: 30,
      iconPath: "../../images/customer/map.png",
    id: 1,
      latitude: e.detail.latitude,
      longitude: e.detail.longitude,
     width: 30,
      city: result.data.result.address_component.city,
      district:result.data.result.address_component.district,
      province: result.data.result.address_component.province,

    }]
    
    that.setData({
      markers: arr1,
      "product.longitude": result.data.result.location.lng,
      "product.latitude": result.data.result.location.lat,
      "product.street": result.data.result.address,
      "product.province": result.data.result.address_component.province,
      "product.district":result.data.result.address_component.district,
      "product.city": result.data.result.address_component.city,
      conent:result.data.result.address
    })
   
            }
          })
  },
  addcustomer:function(){
    let productList = JSON.stringify(this.data.productList)   
    wx.navigateTo({
      url: '../boiler-customeradd/boiler-customeradd?title=售出&productList=' + productList
    })
  },

  queryaddress: function (e) {
    this.setData({
      markers: e,
      "product.longitude": e[0].longitude,
      "product.latitude": e[0].latitude,
      "product.street": e[0].province + e[0].city + e[0].district,
      "product.province": e[0].province,
      "product.district": e[0].district,
      "product.city": e[0].city,
    })
  },
  atuoGetLocation(e) {
    let that = this
     qqmapsdk = new QQMapWX({
      key: that.data.key // 必填
    });
    let arr = []
    let arr1={}
    qqmapsdk.geocoder({
      address: e.detail.value,   
      complete: res => {
        arr1={
        height: 30,
          iconPath: "../../images/customer/map.png",
        id: 1,
          latitude: res.result.location.lat,
          longitude: res.result.location.lng,
         width: 30,
          city: res.result.address_components.city,
          district: res.result.address_components.district,
          province: res.result.address_components.province,

        }
        arr.push(arr1)
        that.queryaddress(arr)
      } 
        });
    },
  
  sell: function () {
    if (this.data.product.customerName == null || this.data.product.customerName==""){
      this.setData({
        "product.customerId": this.data.selectData[0].id,
        "product.customerName": this.data.selectData[0].name,
      });
   }
   let location=this.qqMapToBMap(this.data.product.longitude,this.data.product.latitude)
   this.setData({
    "product.editDateTime": util.formatTime(new Date()),
    "product.id": this.data.arr.id,
    "product.isSell": 1,
    "product.saleDate": this.data.repairDate,
    "product.longitude": location[0],
    "product.latitude": location[1],
  });
  
    let that=this
    wx.request({
      //获取openid接口   
      url: 'https://apis.sdcsoft.com.cn/webapi/enterprise/product/sell',
      data:that.data.product ,
      method: 'post',
      success: function (res) {
        if (res.data.code == 0) {
          wx.showToast({
            title: '售出成功',
            icon: 'success',
            duration: 2000
          })
          wx.navigateBack({
            
          })
          }
      }
    })
  },

  selectTap() {
    this.setData({
      show: !this.data.show
    });
  },
 
  // 点击下拉列表
  optionTap(e) {
    let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    this.setData({
      "product.customerId": e.currentTarget.dataset.bean.id,
      "product.customerName": e.currentTarget.dataset.bean.name,
      index: Index,
      show: !this.data.show
    });
  },
  markertap(e) {
   
  },
  controltap(e) {
   
  }
  
})
