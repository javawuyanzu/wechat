const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    a1src: '../../images/shezhi.png',
    a2src: '../../images/shezhi.png',
    a3src: '../../images/shezhi.png',
    a4src: '../../images/shezhi.png',
    mediaDialog:false,
    fixfieldsDialog:false,
    atmapDialog:false,
    countmapDialog:false,
    valuemapDialog:false,
    dingshiDialog:false,
    dataMapDialogOpen:false,
    ctliDialog:false,
    medias: [],
    mediaIndex: 0,
    powers: [],
    powerIndex: 0,
    ctlgroup: ["系统启停", "参数设置", "设备启停", "定时设置"],
    fires: ["电或余热", "一段火（比例调节）", "两段火"],
    bengs: ["补水泵", "循环泵", "给水泵", "一次循环泵", "二次循环泵", "注油泵","电动阀","冷凝泵","节能泵"],
    bengsIndex:0,
    fans: ["鼓风机", "引风机","出渣机","上煤机","上料机"],
    fanIndex:0,
    time: "12:00",
    showIndex:0,
    countIndex:-1,
    kongzhiIndex:-1,
    share:1,
    valuemapList:[],
    datamap:{},
    atmapList:[],
    elementList:[],
    title:"",
    currentIndex:40001,
    ifctl:["不可控","可控"],
    ctlindex:0,
    ifinput:["不使用","使用"],
    "input":{},
    inputIndex:0,
    ctltyp:["线圈","寄存器"],
    mode:["开关","整数","浮点数","长整数"],
    no:"",
    "power": { "typ": 1, "name": "燃料", "v": 0, "vstr": "油气" },
    "media": { "typ": 1, "name": "介质", "v": 0, "vstr": "热水" },
    "sysrun": { "name": "系统运行时间", "vstr": ""},
    "fixfields":[
    ],
    "atmap": {
      "fire": [
      ],
      "beng": [
      ],
      "fan": [
      ]
    },
    "valuemap": {
          },
    "dingshi": [
    ],
    "countmap": [
      // { "typ": 1, "name": "压力状态", "focus": 2, "v": 0, "vm": "djdyl", "vstr": "", "fn": "0-0","multiIndex": [0, 0] },
      // { "typ": 1, "name": "水位", "focus": 3, "v": 0, "vm": "level", "vstr": "", "fn": "0-0","multiIndex": [0, 0] }
    ],
    FnGroups : [
              "算术运算",
              "时间运算"
    ],
    Fns:[[
              { "title": "累加", "desc": "详细介绍信息", "fn": function (a, b) { return a + b; } },
              { "title": "除10", "desc": "详细介绍信息", "fn": function (v) { return v / 10; } },
              { "title": "除100", "desc": "详细介绍信息", "fn": function (v) { return v / 100; } },
              { "title": "除1000", "desc": "详细介绍信息", "fn": function (v) { return v / 1000; } }
          ], [
              { "title": "时分合并", "desc": "详细介绍信息", "fn": function (h, m) { return h * 60 + m; } },
              { "title": "时分拆解", "desc": "详细介绍信息", "fn": function (a) { return [a / 60, a % 60]; } }
          ]],
    "kongzhi": [],
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad: function (options) {
   var that=this
   var mediaarray=[]
   var powerarray=[]
   for(var i in app.globalData.mediaArray){
    mediaarray.push(app.globalData.mediaArray[i])
   }
   for(var i in app.globalData.powerArray){
    powerarray.push(app.globalData.powerArray[i])
   }
  that.setData({
    medias:mediaarray,
    powers:powerarray,
  })
  if(typeof(options.data)!="undefined"){
    var datamap=JSON.parse(options.data)
    
    var countmap=datamap.countmap
    for(var i in countmap){
      var fn=countmap[i].fn
      countmap[i].multiIndex= fn.split("-")
    }
    var kongzhi=datamap.kongzhi
    for(var i in kongzhi){
      var fn=kongzhi[i].fn
      kongzhi[i].multiIndex= fn.split("-")
    }
    var typ="";
    if(typeof(options.saveAs)=="undefined"){
      typ="edit"
    }
    that.setData({
      datamapId :options.id,
      status:typ,
      title:options.title,
      atmap:datamap.atmap,
      countmap:countmap,
      datamap:datamap.datamap,
      dingshi:datamap.dingshi,
      fixfields:datamap.fixfields,
      kongzhi:kongzhi,
      media:datamap.media,
      power:datamap.power,
      sysrun:datamap.sysrun,
      valuemap:datamap.valuemap,
    })
  }
  },
  kongzhipanel: function (e) {
    if (e.currentTarget.dataset.index != this.data.kongzhiIndex) {
      this.setData({
        kongzhiIndex: e.currentTarget.dataset.index
      })
    } else {
      this.setData({
        kongzhiIndex: -1
      })
    }
  },
  countpanel: function (e) {
    if (e.currentTarget.dataset.index != this.data.countIndex) {
      this.setData({
        countIndex: e.currentTarget.dataset.index
      })
    } else {
      this.setData({
        countIndex: -1
      })
    }
  },
  panel: function (e) {
    if (e.currentTarget.dataset.index != this.data.showIndex) {
      this.setData({
        showIndex: e.currentTarget.dataset.index
      })
    } else {
      this.setData({
        showIndex: 0
      })
    }
  },
  deletePoint: function (e) {
    var that= this
    var datamap =that.data.datamap
    var key=e.currentTarget.dataset.key
    delete datamap[key]
    that.setData({
      datamap:datamap
    })
  },
  todataDetail: function (e) {
    console.log(getCurrentPages().length)
    var that= this
    var datamap =that.data.datamap
    var key=e.currentTarget.dataset.key
    if(typeof(key) === "undefined"){
      key=that.data.currentIndex
    }
    wx.navigateTo({
      url: "/pages/dataDetail/dataDetail?data=" + JSON.stringify(datamap[key])+"&currentIndex="+key,
    })
  },
  editPoint: function (e) {
    var that=this
    var json ={}
    var kongzhi=that.data.kongzhi
    var countmap=that.data.countmap
    var datamap=that.data.datamap
    var title=that.data.title
    var share=that.data.share
    if(title==""){
      wx.showToast({
        title: "请输入协议名称",
        icon: 'none',
        duration: 5000
      });
      that.setData({
        dataMapDialog:true
      })
      return
      
    }
    if(JSON.stringify(datamap) == '{}'){
      wx.showToast({
        title: "当前未录入点位",
        icon: 'none',
        duration: 5000
      });
      return
    }
    for(var i in kongzhi){
      delete kongzhi[i].multiIndex
    }
    for(var k in countmap){
      delete countmap[k].multiIndex
    }
    for(var k in datamap){
      var fs=datamap[k].fields
      if(datamap[k].mask==""){
        delete datamap[k].mask
      }
      for(var j in fs){
        delete fs[j].checkboxItems
      }
     
    }
    if(JSON.stringify(that.data.input)!="{}"){
      json["input"]=that.data.input
    }
    if(that.data.no!=""){
      json["no"]=that.data.no
    }
    console.log(json)
    json["countmap"]=countmap
    json["kongzhi"]=kongzhi
    json["valuemap"]=that.data.valuemap
    json["atmap"]=that.data.atmap
    json["dingshi"]=that.data.dingshi
    json["power"]=that.data.power
    json["media"]=that.data.media
    json["sysrun"]=that.data.sysrun
    json["fixfields"]=that.data.fixfields
    json["datamap"]=datamap
    var deviceDataMap=JSON.stringify(json)
    wx.request({
      url: 'https://apis.sdcsoft.com.cn/wechat/DeviceDataMap/modify/map',
      method: "POST",
      data: {
        id:Number(that.data.datamapId),
        dataMap: deviceDataMap,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        if(res.data.code==0){
          wx.showToast({
            title: "修改成功",
            icon: 'success',
            duration: 5000
          });
          wx.navigateTo({
            url: "/pages/dataMapList/dataMapList",
          })
        }else{
          wx.showToast({
            title: "修改失败",
            icon: 'success',
            duration: 5000
          });
        }
      }
    })
  },
  savePoint: function (e) {
    var that=this
    var json ={}
    var kongzhi=that.data.kongzhi
    var countmap=that.data.countmap
    var datamap=that.data.datamap
    var title=that.data.title
    var share=that.data.share
    if(title==""){
      wx.showToast({
        title: "请输入协议名称",
        icon: 'none',
        duration: 5000
      });
      that.setData({
        dataMapDialog:true
      })
      return
      
    }
    if(JSON.stringify(datamap) == '{}'){
      wx.showToast({
        title: "当前未录入点位",
        icon: 'none',
        duration: 5000
      });
      return
    }
    for(var i in kongzhi){
      delete kongzhi[i].multiIndex
    }
    for(var k in countmap){
      delete countmap[k].multiIndex
    }
    for(var k in datamap){
      var fs=datamap[k].fields
      if(datamap[k].mask==""){
        delete datamap[k].mask
      }
      for(var j in fs){
        delete fs[j].checkboxItems
      }
    }
    if(JSON.stringify(that.data.input)!="{}"){
      json["input"]=that.data.input
    }
    if(that.data.no!=""){
      json["no"]=that.data.no
    }
    json["countmap"]=countmap
    json["kongzhi"]=kongzhi
    json["valuemap"]=that.data.valuemap
    json["atmap"]=that.data.atmap
    json["dingshi"]=that.data.dingshi
    json["power"]=that.data.power
    json["media"]=that.data.media
    json["sysrun"]=that.data.sysrun
    json["fixfields"]=that.data.fixfields
    json["datamap"]=datamap
    var deviceDataMap=JSON.stringify(json)
    wx.request({
      url: 'https://apis.sdcsoft.com.cn/wechat/DeviceDataMap/create',
      method: "POST",
      data: {
        title: title,
        deviceDataMap: deviceDataMap,
        status: 1,
        author: app.globalData.openid,
        share: share,
        deviceDataLength:0
      },
      success: function (res) {
        wx.showToast({
          title: "上传成功",
          icon: 'success',
          duration: 5000
        });
      }
    })
  },
 
// saveCurrent: function () {
//   var that=this
//   var datamap=that.data.datamap
  
//   var currentPoint =that.data.currentPoint
//   datamap[that.data.currentIndex]=currentPoint
  
//   var fields=currentPoint.fields
//    for(var i in fields ){
//     if(fields[i].ctl){
//       delete fields[i].ctl.multiIndex
//       delete fields[i].checkboxItems
//     }
//    }
//   that.setData({
//     datamap:datamap
//   });
  
// },
// pointAddr: function (e) {
//   var that=this
//   var index =e.detail.value
//   var datamap=that.data.datamap
//   var currentPoint = datamap[index]
//   if(currentPoint){
//     var fields=currentPoint.fields
    
//     if(currentPoint.typ==5){
//       checkboxItems.push(
//         {name: '是否对燃烧器起到控制作用', value: '6'}
//       )
//               
//     }
//    for(var i in fields ){
//       var checkboxItems=[
//               {name: '可控', value: '0'},
//               {name: '关注点', value: '1'},
//               {name: '数值映射', value: '2'},
//               {name: '关联动画元素', value: '3'},
//               {name: '关联计算点位', value: '4'},
//               {name: '简单运算（加减乘除）', value: '5'},
//         ]
//       if(fields[i].ctl){
//        var fn=fields[i].ctl.fn
//         fn=fields[i].ctl.multiIndex= fn.split("-")
//         if(currentPoint.typ==5){
//           checkboxItems[6].checked=true
//         }else{
//           checkboxItems[0].checked=true
//         }
//       }
//        if(fields[i].focus){
//         checkboxItems[1].checked=true
//        }
//        if(fields[i].vm){
//         checkboxItems[2].checked=true
//        }
      
//        if(fields[i].reftyp=='at'){
//         checkboxItems[3].checked=true
//        }
//        if(fields[i].reftyp=='count'){
//         checkboxItems[4].checked=true
//        }
//        if(fields[i].mat){
//         checkboxItems[5].checked=true
//        }
//        fields[i].checkboxItems=checkboxItems
//    }
//   }else{
//     currentPoint= {
//       "mask": 0xffffffff,
//       "typ": 1,
//       "fields": [],
//     }
//   }
//   that.setData({
//     currentPoint:currentPoint,
//     currentIndex:index,
//   });
// },
sysrunName: function (e) {
  var that=this
  var sysrun=that.data.sysrun
  sysrun.name=e.detail.value
  that.setData({
    sysrun:sysrun
  });
  },
  
 
dataTitle: function (e) {
  var that=this
  var index =e.detail.value
  that.setData({
    title:index
  });
  },
dataOpenCloseNum: function (e) {
  var that=this
  var key=e.currentTarget.dataset.key
  var index =e.detail.value
  
  var currentPoint =that.data.currentPoint
  if(index!=1&index!=''){
    currentPoint.fields[key].number= index
  }
  if(index==1){
    delete currentPoint.fields[key].number
  }
  that.setData({
    currentPoint:currentPoint
  });
},
bindTimeTypChange: function (e) {
  var that=this
  var key=e.currentTarget.dataset.key
  var index =e.detail.value
  
  var currentPoint =that.data.currentPoint

  currentPoint.fields[key].index= index
  that.setData({
    currentPoint:currentPoint
  });
},
bindPartTypChange: function (e) {
  var that=this
  var key=e.currentTarget.dataset.key
  var index =e.detail.value
  
  var currentPoint =that.data.currentPoint

  currentPoint.fields[key].part= index
  that.setData({
    currentPoint:currentPoint
  });
},



  dataOpenCloseName: function (e) {
  var that=this
  var key=e.currentTarget.dataset.key
  var index =e.detail.value
  var currentPoint =that.data.currentPoint
  currentPoint.fields[key].name=index
  that.setData({
    currentPoint:currentPoint
  });
  },
  dataTimeName: function (e) {
    var that=this
    var key=e.currentTarget.dataset.key
    var index =e.detail.value
    
    var currentPoint =that.data.currentPoint
    currentPoint.fields[key].name=index
    
    that.setData({
      currentPoint:currentPoint
    });
  },


  
 

  
  
  removecountmap: function (e) {
    var that=this
    var key=e.currentTarget.dataset.key
    var countmap= that.data.countmap
    countmap.splice(key,1)
    that.setData({
      countmap:countmap,
    });
  },
  checkboxChangeshare: function (e) {
    var that=this
   var share=0;
    if(e.detail.value.length==0){
      share=1
     }
     that.setData({
      share:share
    });
    wx.request({
      url: 'https://apis.sdcsoft.com.cn/wechat/DeviceDataMap/modify/share',
      method: "POST",
      data: {
        id:Number(that.data.datamapId),
        share:Number(share)
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        if(res.data.code==0){
          wx.showToast({
            title: "修改成功",
            icon: 'success',
            duration: 5000
          });
         
        }else{
          wx.showToast({
            title: "修改失败",
            icon: 'success',
            duration: 5000
          });
        }
      }
    })
  },
  checkboxChange: function (e) {
    var that=this
    var key=e.currentTarget.dataset.key
    var countmap= that.data.countmap
    var focusCount=that.data.focusCount
    if(e.detail.value.length!=0){
     countmap[key].focus=focusCount
     focusCount++
    }else{
      delete countmap[key].focus
    }
    that.setData({
      countmap:countmap,
      focusCount:focusCount
    });
  },
  countmapzhi: function (e) {
    var that=this
    var key=e.currentTarget.dataset.key
    var countmap= that.data.countmap
    countmap.splice(key,1)
    that.setData({
      countmap:countmap,
    });
  },
  bindPickerCountmapFnDa: function (e) {
    var that=this
    var key=e.currentTarget.dataset.key
    var index =e.detail.value
    
    var countmap =that.data.countmap
  
    countmap[key].multiIndex= [index,0]
    that.setData({
      countmap:countmap
    });
  },
  bindPickerCountmapFnXiao: function (e) {
    var that=this
    var key=e.currentTarget.dataset.key
    var index =e.detail.value
    
    var countmap =that.data.countmap
  
    countmap[key].multiIndex[1]= index
    countmap[key].fn= ""+countmap[key].multiIndex[0]+"-"+countmap[key].multiIndex[1]+""
    that.setData({
      countmap:countmap,
    });
  },
  countmapName: function (e) {
    var that=this
    var key=e.currentTarget.dataset.key
    var index =e.detail.value
    
    var countmap =that.data.countmap
  
    countmap[key].name= index
    that.setData({
      countmap:countmap,
    });
  },
  bindPickerCountmapVm: function (e) {
    var that=this
    var key=e.currentTarget.dataset.key
    var index =e.detail.value
    
    var countmap =that.data.countmap
  
    countmap[key].vm= that.data.valuemapList[index]
    that.setData({
      countmap:countmap,
    });
  },
  addCountmap: function (e) {
    var that=this
    var countmap= that.data.countmap
    countmap.push( { "typ": 1, "name": "", "v": 0, "vm": "选择映射", "vstr": "", "fn": "0-0" ,"multiIndex": [0, 0]})
    that.setData({
      countmap:countmap,
    });
  },
  countmapDialogClose: function() {
    this.setData({
      countmapDialog: false,
    });
},
countmapDialogOpen() {
    var that=this
    var valuemap=that.data.valuemap
    var valuemapList=[]
    for(var i in valuemap){
      valuemapList.push(i)
    }
    that.setData({
      valuemapList:valuemapList,
        countmapDialog: true
      });
  },
  
  kongzhiName: function (e) {
    var that=this
    var key=e.currentTarget.dataset.key
    var index =e.detail.value
    
    var kongzhi =that.data.kongzhi
  
    kongzhi[key].name= index
    that.setData({
      kongzhi:kongzhi,
    });
  },
  kongzhiAddr: function (e) {
    var that=this
    var key=e.currentTarget.dataset.key
    var index =e.detail.value
    
    var kongzhi =that.data.kongzhi
  
    kongzhi[key].addr= index
    that.setData({
      kongzhi:kongzhi,
    });
  },
  kongzhiMax: function (e) {
    var that=this
    var key=e.currentTarget.dataset.key
    var index =e.detail.value
    
    var kongzhi =that.data.kongzhi
  
    kongzhi[key].max= index
    that.setData({
      kongzhi:kongzhi,
    });
  },
  kongzhiMin: function (e) {
    var that=this
    var key=e.currentTarget.dataset.key
    var index =e.detail.value
    
    var kongzhi =that.data.kongzhi
  
    kongzhi[key].min= index
    that.setData({
      kongzhi:kongzhi,
    });
  },
  removekongzhi: function (e) {
    var that=this
    var key=e.currentTarget.dataset.key
    var kongzhi= that.data.kongzhi
    kongzhi.splice(key,1)
    that.setData({
      kongzhi:kongzhi,
    });
  },
  bindPickerKongzhitype: function (e) {
    var that=this
    var key=e.currentTarget.dataset.key
    var index =e.detail.value
    var kongzhi =that.data.kongzhi
  
    kongzhi[key].group= index
    that.setData({
      kongzhi:kongzhi
    });
  },
  bindPickerKongzhiMode: function (e) {
    var that=this
    var key=e.currentTarget.dataset.key
    var index =e.detail.value
    var kongzhi =that.data.kongzhi
  
    kongzhi[key].mode= index
    that.setData({
      kongzhi:kongzhi
    });
  },
  bindPickerKongzhityp: function (e) {
    var that=this
    var key=e.currentTarget.dataset.key
    var index =e.detail.value
    var kongzhi =that.data.kongzhi
  
    kongzhi[key].typ= index
    that.setData({
      kongzhi:kongzhi
    });
  },
  inputDescription: function (e) {
    var that=this
    var key=e.currentTarget.dataset.key
    var index =e.detail.value
    var kongzhi =that.data.kongzhi
    kongzhi[key].desc= index
    that.setData({
      kongzhi:kongzhi
    });
  },
  bindPickerKongzhiFnDa: function (e) {
    var that=this
    var key=e.currentTarget.dataset.key
    var index =e.detail.valuemapDialogOpen
    var kongzhi =that.data.kongzhi
    kongzhi[key].multiIndex= [index,0]
    that.setData({
      kongzhi:kongzhi
    });
  },
  bindPickerKongzhiFnXiao: function (e) {
    var that=this
    var key=e.currentTarget.dataset.key
    var index =e.detail.value
    
    var kongzhi =that.data.kongzhi
  
    kongzhi[key].multiIndex[1]= index
    kongzhi[key].fn= ""+kongzhi[key].multiIndex[0]+"-"+kongzhi[key].multiIndex[1]+""
    that.setData({
      kongzhi:kongzhi,
    });
  },
  addCtl: function (e) {
    var that=this
    var kongzhi= that.data.kongzhi
    kongzhi.push( {
      "name": "",
      "typ":0,
      "mode":0,
      "addr": "",
      "group": 1,
      "multiIndex": [0, 0],
  })
    that.setData({
      kongzhi:kongzhi,
    });
  },
  ctliDialogClose: function() {
    this.setData({
      ctliDialog: false,
    });
},
  dataMapDialogOpen() {
      this.setData({
        dataMapDialog: true
      });
  },
  dataMapDialogClose: function() {
    this.setData({
      dataMapDialog: false,
    });
},
  ctliDialogOpen() {
      this.setData({
        ctliDialog: true
      });
  },
  fixfieldsDialogClose: function() {
    this.setData({
      fixfieldsDialog: false,
    });
},
  fixfieldsDialogOpen() {
      this.setData({
        fixfieldsDialog: true
      });
  },
  dingshiName: function (e) {
    var that=this
    var key=e.currentTarget.dataset.key
    var dingshi= that.data.dingshi
    
    console.log(e.detail.value)
    dingshi[key].name=e.detail.value.replace(/\s+/g, '')

    that.setData({
      dingshi:dingshi,
    });
  },
  removedingshi: function (e) {
    var that=this
    var key=e.currentTarget.dataset.key
    var dingshi= that.data.dingshi
    dingshi.splice(key,1)
    that.setData({
      dingshi:dingshi,
    });
  },
  adddingshi: function (e) {
    var that=this
    var dingshi= that.data.dingshi
    var num =dingshi.length+1
    dingshi.push( { "name": "定时"+num},)
    that.setData({
      dingshi:dingshi,
    });
  },
 
  dingshiDialogClose: function() {
    this.setData({
      dingshiDialog: false,
    });
},
dingshiDialogOpen() {
      this.setData({
        dingshiDialog: true
      });
  },
  removeValuemapDaLei: function (e) {
    var that=this
    var key=e.currentTarget.dataset.key
    var valuemap =that.data.valuemap

    delete valuemap[key]
    that.setData({
      "valuemap":valuemap,
    });
  },
  removeValuemapXiaoLei: function (e) {
    var that=this
    var key=e.currentTarget.dataset.key
    var key1=e.currentTarget.dataset.key1
    var valuemap =that.data.valuemap
    var xiaolei=valuemap[key1]
    delete xiaolei[key]
    that.setData({
      "valuemap":valuemap,
    });
  },
  valuemapXiaoLeiV: function (e) {
    var that=this
    var key=e.currentTarget.dataset.key
    var key1=e.currentTarget.dataset.key1
    var valuemap =that.data.valuemap
    var xiaolei=valuemap[key1]
    xiaolei[key]=e.detail.value
    that.setData({
      "valuemap":valuemap,
    });
  },
  valuemapXiaoLeiName: function (e) {
    var that=this
    var key=e.currentTarget.dataset.key
    var key1=e.currentTarget.dataset.key1
    var valuemap =that.data.valuemap
    var xiaolei=valuemap[key1]
    var v=xiaolei[key]
    delete xiaolei[key]
    xiaolei[e.detail.value]=v
    that.setData({
      "valuemap":valuemap,
    });
  },
  addValuemapXiaoLei: function (e) {
    var that=this
    var key=e.currentTarget.dataset.key
    var valuemap =that.data.valuemap
    var xiaolei=valuemap[key]
    var count="";
   
    console.log(count)
    var b=""
    xiaolei[count]=b
    that.setData({
      "valuemap":valuemap,
    });
  },
  ValuemapDaLei: function (e) {
    var that=this
    var key=e.currentTarget.dataset.key
    var valuemap =that.data.valuemap
    var list=valuemap[key]
    delete valuemap[key]
    valuemap[e.detail.value]=list
    that.setData({
      "valuemap":valuemap,
    });
  },
  addValuemapDaLei() {
    var that=this
    var valuemap =that.data.valuemap
    var b={}
    var key=""
    valuemap[key]=b
    that.setData({
      "valuemap":valuemap,
    });
},
  valuemapDialogClose: function() {
    this.setData({
      valuemapDialog: false,
    });
},
valuemapDialogOpen() {
      this.setData({
        valuemapDialog: true
      });
  },
  mediaDialogClose: function() {
    this.setData({
      mediaDialog: false,
    });
},
  mediaDialogOpen() {
      this.setData({
        mediaDialog: true
      });
  },
  addBase() {
    var that=this
    var fixfields =that.data.fixfields
    var b={ "typ": 1, "name": "", "v": 0,"vstr":"" }
    fixfields.push(b)
    that.setData({
      "fixfields":fixfields,
    });
},
baseName: function (e) {
  var that=this
  var key=e.currentTarget.dataset.key
  var fixfields =that.data.fixfields
  fixfields[key].name= e.detail.value
  that.setData({
    "fixfields":fixfields,
  });
},
baseV: function (e) {
  var that=this
  var key=e.currentTarget.dataset.key
  var fixfields =that.data.fixfields
  fixfields[key].v= e.detail.value
  that.setData({
    "fixfields":fixfields,
  });
},
baseVstr: function (e) {
  var that=this
  var key=e.currentTarget.dataset.key
  var fixfields =that.data.fixfields
  fixfields[key].vstr= e.detail.value
  that.setData({
    "fixfields":fixfields,
  });
},
removeBase: function (e) {
  var that=this
  var key=e.currentTarget.dataset.key
  var fixfields =that.data.fixfields
  fixfields.splice(key,1)
  that.setData({
    fixfields:fixfields,
  });
},
  mediaName(e) {
    var that=this
    var media=that.data.media
    media.vstr=e.detail.value
    that.setData({
      media:media,
    })
  },
  powerName(e) {
    var that=this
    var power=that.data.power
    power.vstr=e.detail.value
    that.setData({
      power:power
    })
  },
  bindInputChange(e) {
    var that=this
    var inputIndex=Number(e.detail.value)
    that.setData({
      inputIndex:inputIndex,
    })
    if(inputIndex==1){
      that.setData({
        input:{"min":0,"max":0}
      })
    }else{
      that.setData({
        input:{}
      })
    }
  },
  bindCtlChange(e) {
    var that=this
    var ctlindex=Number(e.detail.value)
    that.setData({
      ctlindex:ctlindex,
    })
  },
  inputMax(e) {
    var that=this
    var input=that.data.input
    input.max=Number(e.detail.value)
    that.setData({
      input:input
    })
  },
  inputMin(e) {
    var that=this
    var input=that.data.input
    input.min=Number(e.detail.value)
    that.setData({
      input:input
    })
  },
  ctlNo(e) {
    var that=this
    that.setData({
      no:e.detail.value,
    })
  },
  bindMediaChange(e) {
    var that=this
    var media=that.data.media
    media.v=Number(e.detail.value)
    media.vstr=that.data.medias[e.detail.value]
    that.setData({
      media:media,
    })
  },
  bindPowersChange(e) {
    var that=this
    var power=that.data.power
    power.v=Number(e.detail.value)
    power.vstr=that.data.powers[e.detail.value]
    
    that.setData({
      power:power
    })
  },
  atmapDialogDialogClose: function() {
    this.setData({
      atmapDialog: false,
    });
},
  atmapDialogDialogOpen() {
      this.setData({
        atmapDialog: true
      });
  },
  addFire() {
    var that=this
    var atmap =that.data.atmap
    var fire =atmap.fire
    var count=Object.keys(fire).length+1
    var rsq={ "name": "", "amount": 0, "typ": 0, "v": 0, "stop": true }
    rsq.name="燃烧器"+count

    fire.push(rsq)
    that.setData({
      atmap:atmap,
    });
},
removeFire: function (e) {
  var that=this
  var key=e.currentTarget.dataset.key
  var atmap =that.data.atmap
  var fire =atmap.fire
  fire.splice(key,1)
  that.setData({
    atmap:atmap,
  });
},
bindPickerFire: function (e) {
  var that=this
  var key=e.currentTarget.dataset.key
  var atmap =that.data.atmap
  var fire =atmap.fire
  fire[key].typ= e.detail.value
  that.setData({
    atmap:atmap,
  });
},

bindPickerBeng: function (e) {
  var that=this
  var key=e.currentTarget.dataset.key
  var index =e.detail.value
  var name=that.data.bengs[index]
  var atmap =that.data.atmap
  var beng =atmap.beng
  beng[key].name= name
  that.setData({
    atmap:atmap,
  });
},

addBeng() {
  var that=this
  var atmap =that.data.atmap
  var beng =atmap.beng
  var b={ "name": "", "amount": 1, "v": 0 }
  beng.push(b)
  that.setData({
    atmap:atmap,
  });
},
bengName: function (e) {
  var that=this
  var key=e.currentTarget.dataset.key
  var atmap =that.data.atmap
  var beng =atmap.beng
  beng[key].name= e.detail.value
  that.setData({
    atmap:atmap,
  });
},
bengCount: function (e) {
  var that=this
  var key=e.currentTarget.dataset.key
  var atmap =that.data.atmap
  var beng =atmap.beng
  beng[key].amount= Number(e.detail.value)
  that.setData({
    atmap:atmap,
  });
},
removeBeng: function (e) {
  var that=this
  var key=e.currentTarget.dataset.key
  var atmap =that.data.atmap
  var beng =atmap.beng
  beng.splice(key,1)
  that.setData({
    atmap:atmap,
  });
},

bindPickerFan: function (e) {
  var that=this
  var key=e.currentTarget.dataset.key
  var index =e.detail.value
  var name=that.data.fans[index]
  var atmap =that.data.atmap
  var fan =atmap.fan
  fan[key].name= name
  that.setData({
    atmap:atmap,
  });
},
addFan() {
  var that=this
  var atmap =that.data.atmap
  var fan =atmap.fan
  var f={ "name": "", "amount": 0, "v": 0 }
  fan.push(f)
  that.setData({
    atmap:atmap,
  });
},
fanName: function (e) {
  var that=this
  var key=e.currentTarget.dataset.key
  var atmap =that.data.atmap
  var fan =atmap.fan
  fan[key].name= e.detail.value
  that.setData({
    atmap:atmap,
  });
},
fanCount: function (e) {
  var that=this
  var key=e.currentTarget.dataset.key
  var atmap =that.data.atmap
  var fan =atmap.fan
  fan[key].amount= Number(e.detail.value)
  that.setData({
    atmap:atmap,
  });
},
removeFan: function (e) {
  var that=this
  var key=e.currentTarget.dataset.key
  var atmap =that.data.atmap
  var fan =atmap.fan
  fan.splice(key,1)

  that.setData({
    atmap:atmap,
  });
},

})