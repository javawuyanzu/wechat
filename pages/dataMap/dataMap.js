// pages/dataMap/dataMap.js
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
    medias: ["热水", "蒸汽", "导热油", "热风", "真空"],
    mediaIndex: 0,
    powers: ["油气", "电", "煤", "生物质", "余热"],
    powerIndex: 0,
    "fixfields":{
      "power": { "typ": 1, "name": "燃料", "v": 0 },
      "media": { "typ": 1, "name": "介质", "v": 0 }
    },
    atmapDialog:false,
    "atmap": {
      "fire": { 
    },
      "beng": {},
      "fan": {}
    },
    fires: ["电或余热", "一段火", "两段火"],
    bengs: ["补水泵", "循环泵"],
    bengsIndex:0,
    fans: ["鼓风机", "引风机","出渣机","炉排"],
    fanIndex:0,
    valuemapDialog:false,
    dingshiDialog:false,
    "valuemap": {
      "fire": {
          "0": "关",
          "1": "小火",
          "2": "大火"
      }
      ,
      "level": {
          "0": "缺水",
          "1": "低位",
          "2": "中位",
          "3": "高位",
          "4": "超高"
      },
      "djdyl": {
          "0": "低压",
          "1": "中压",
          "2": "高压",
          "3": "错误"
      }
    },
    "dingshi": [
      { "name": "定时1", "h": "", "m": "" },
      { "name": "定时2", "h": "12", "m": "02" }
    ],
    time: "12:00",
    startIndex:40001,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad: function (options) {
   var that=this
   
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
    dingshi.push( { "name": "定时"+num, "h": "", "m": "" },)
    that.setData({
      dingshi:dingshi,
    });
  },
  bindTimeChange: function (e) {
    var that=this
    var key=e.currentTarget.dataset.key
    var time =e.detail.value
    var dingshi= that.data.dingshi
 
     var timelist=time.split(":")
     dingshi[key].h=timelist[0]
     dingshi[key].m=timelist[1]
    this.setData({
      dingshi: dingshi
    })
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
    var count=Object.keys(xiaolei).length+1
    var b=""
    var key=count
    xiaolei[key]=b
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
    var count=Object.keys(valuemap).length+1
    var b={}
    var key="大类名称"+count
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
    var count=Object.keys(fixfields).length+1
    var b={ "typ": 1, "name": "", "v": 0 }
    var key="base"+count
    fixfields[key]=b
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
removeBase: function (e) {
  var that=this
  var key=e.currentTarget.dataset.key
  var fixfields =that.data.fixfields
  delete fixfields[key]
  that.setData({
    fixfields:fixfields,
  });
},
  bindMediaChange(e) {
    var that=this
    var fixfields=that.data.fixfields
    fixfields.media.v=e.detail.value
    that.setData({
      fixfields:fixfields
    })
  },
  bindPowersChange(e) {
    var that=this
    var fixfields=that.data.fixfields
    fixfields.power.v=e.detail.value
    that.setData({
      fixfields:fixfields
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
    var key="rsq"+count
    rsq.name="燃烧器"+count
    fire[key]=rsq
    that.setData({
      atmap:atmap,
    });
},
removeFire: function (e) {
  var that=this
  var key=e.currentTarget.dataset.key
  var atmap =that.data.atmap
  var fire =atmap.fire
  delete fire[key]
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
  var count=Object.keys(beng).length+1
  var b={ "name": "", "amount": 0, "v": 0 }
  var key="beng"+count
  beng[key]=b
  that.setData({
    atmap:atmap,
  });
},
bengCount: function (e) {
  var that=this
  var key=e.currentTarget.dataset.key
  var atmap =that.data.atmap
  var beng =atmap.beng
  beng[key].amount= e.detail.value
  that.setData({
    atmap:atmap,
  });
},
removeBeng: function (e) {
  var that=this
  var key=e.currentTarget.dataset.key
  var atmap =that.data.atmap
  var beng =atmap.beng
  delete beng[key]
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
  var count=Object.keys(fan).length+1
  var f={ "name": "", "amount": 0, "v": 0 }
  var key="fan"+count
  fan[key]=f
  that.setData({
    atmap:atmap,
  });
},
fanCount: function (e) {
  var that=this
  var key=e.currentTarget.dataset.key
  var atmap =that.data.atmap
  var fan =atmap.fan
  fan[key].amount= e.detail.value
  that.setData({
    atmap:atmap,
  });
},
removeFan: function (e) {
  var that=this
  var key=e.currentTarget.dataset.key
  var atmap =that.data.atmap
  var fan =atmap.fan
  delete fan[key]
  that.setData({
    atmap:atmap,
  });
},

})