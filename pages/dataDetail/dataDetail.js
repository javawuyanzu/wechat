const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    types: ["报警", "基本信息", "温度", "压力", "流量", "开关", "设置", "设备", "定时"],
    pointtyp: ["字节", "整型", "浮点型", "长整型"],
    currentIndex: 40001,
    pointTypindex: 1,
    currentPoint: {
      "mask": "",
      "typ": 1,
      "endina":0,
      "fields": [],
    },
    showIndex: -1,
    ctlgroup: ["系统启停", "参数设置", "设备启停", "定时设置"],
    focusCount: 0,
    easyOperation: ["add", "sub", "div", "mod"],
    extyp: ["普通报警", "短信报警", "电话报警", "电话+短信报警"],
    parttyp: ["请选择", "小时", "分钟", "小时+分钟"],
    timetyp: ["请选择", "天", "小时"],
    endina:[],
    FnGroups: [
      "算术运算",
      "时间运算"
    ],
    Fns: [[
      { "title": "累加", "desc": "详细介绍信息", "fn": function (a, b) { return a + b; } },
      { "title": "除10", "desc": "详细介绍信息", "fn": function (v) { return v / 10; } },
      { "title": "除100", "desc": "详细介绍信息", "fn": function (v) { return v / 100; } },
      { "title": "除1000", "desc": "详细介绍信息", "fn": function (v) { return v / 1000; } }
    ], [
      { "title": "时分合并", "desc": "详细介绍信息", "fn": function (h, m) { return h * 60 + m; } },
      { "title": "时分拆解", "desc": "详细介绍信息", "fn": function (a) { return [a / 60, a % 60]; } }
    ]],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var endina=app.globalData.endina
    that.setData({
      endina:endina,
      currentIndex: options.currentIndex
    })
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];  //上一个页面
    var atmap = prevPage.data.atmap
    var valuemap = prevPage.data.valuemap
    var countmap = prevPage.data.countmap
    var dingshi = prevPage.data.dingshi
    that.setData({
      atmap: atmap,
      valuemap: valuemap,
      countmap: countmap,
      dingshi: dingshi,
    })
    if (options.data != "undefined") {
      console.log(options.data)
      var currentPoint = JSON.parse(options.data)
      if (currentPoint) {
        var fields = currentPoint.fields
        if (currentPoint.fields.length != 0) {
          that.setData({
            pointTypindex: currentPoint.fields["0"].typ
          })
        }
        

        for (var i in fields) {
          var checkboxItems = [
            { name: '可控', value: '0' },
            { name: '关注点', value: '1' },
            { name: '数值映射', value: '2' },
            { name: '关联动画元素', value: '3' },
            { name: '关联计算点位', value: '4' },
            { name: '简单运算（加减乘除）', value: '5' },
            { name: '是否对燃烧器起到控制作用', value: '6' },
            { name: '是否为系统状态', value: '7' },
            { name: '是否为系统运行时间', value: '8' },
          ]
          if (fields[i].ctl) {
            if(typeof(fields[i].ctl)!="boolean"){
              var fn = fields[i].ctl.fn
              fn = fields[i].ctl.multiIndex = fn.split("-")
              if (currentPoint.typ == 5) {
                checkboxItems[6].checked = true
              } else {
                checkboxItems[0].checked = true
              }
            }
          }
          if (fields[i].focus) {
            checkboxItems[1].checked = true
          }
          
          if (fields[i].systatus) {
            checkboxItems[7].checked = true
          }
        
          if (fields[i].vm) {
            checkboxItems[2].checked = true
          }
          if (fields[i].reftyp == 'at') {
            checkboxItems[3].checked = true
            var elementList = atmap[fields[i].refgroup]
            that.setData({
              elementList:elementList
            })
          }
          if (fields[i].reftyp == 'count') {
            checkboxItems[4].checked = true
          }
          if (fields[i].mat) {
            checkboxItems[5].checked = true
          }
          fields[i].checkboxItems = checkboxItems
        }
      } else {
        currentPoint = {
          "mask": "",
          "typ": 1,
          "endina":0,
          "fields": [],
        }
      }

      that.setData({
        currentPoint: currentPoint
      })
    }
   
  },
  bindExTypChange: function (e) {
    var that = this
    var key = e.currentTarget.dataset.key
    var index = e.detail.value
    var currentPoint = that.data.currentPoint
    currentPoint.fields[key].level = index
    that.setData({
      currentPoint: currentPoint
    });
  },
  bindDataTypChange: function (e) {
    var that = this

    var index = e.detail.value
    var currentPoint = that.data.currentPoint
    currentPoint.endina = index
    that.setData({
      currentPoint: currentPoint
    });
  },
  panel: function (e) {
    if (e.currentTarget.dataset.index != this.data.showIndex) {
      this.setData({
        showIndex: e.currentTarget.dataset.index
      })
    } else {
      this.setData({
        showIndex: -1
      })
    }
  },
  deletebit: function (e) {
    var that = this
    var currentPoint = that.data.currentPoint
    var fields = currentPoint.fields
    var key = e.currentTarget.dataset.key
    fields.splice(key, 1)
    that.setData({
      currentPoint: currentPoint
    })
  },
  addPoint: function (e) {
    var that = this
    var currentPoint = that.data.currentPoint
    var pointTypindex = that.data.pointTypindex
    if (pointTypindex == 1 || pointTypindex == 2 || pointTypindex == 3 || pointTypindex == 4 || pointTypindex == 6 || pointTypindex == 7) {
        currentPoint.fields.push({
          "typ": pointTypindex, "name": that.data.currentIndex, "unit": "", "checkboxItems": [
            { name: '是否为系统运行时间', value: '8' },
            { name: '是否为系统状态', value: '7' },
            { name: '可控', value: '0' },
            { name: '关注点', value: '1' },
            { name: '数值映射', value: '2' },
            { name: '关联动画元素', value: '3' },
            { name: '关联计算点位', value: '4' },
            { name: '简单运算（加减乘除）', value: '5' },
          ]
        })
    }
    if (pointTypindex == 0) {
        currentPoint.fields.push({
          "typ": pointTypindex, "name": that.data.currentIndex, "level": 0, "checkboxItems": [
            { name: '可控', value: '0' },
            { name: '关注点', value: '1' },
            { name: '数值映射', value: '2' },
            { name: '关联动画元素', value: '3' },
            { name: '关联计算点位', value: '4' },
            { name: '简单运算（加减乘除）', value: '5' },
          ]
        })
    }
    if (pointTypindex == 5) {
        currentPoint.fields.push({
          "typ": pointTypindex, "name": that.data.currentIndex, "checkboxItems": [
            { name: '可控', value: '0' },
            { name: '关注点', value: '1' },
            { name: '数值映射', value: '2' },
            { name: '关联动画元素', value: '3' },
            { name: '关联计算点位', value: '4' },
            { name: '简单运算（加减乘除）', value: '5' },
            { name: '是否对燃烧器起到控制作用', value: '6' },
          ]
        })
    }
    if (pointTypindex == 8) {
      currentPoint.fields.push({
        "typ": pointTypindex, "name": that.data.currentIndex, "index": 0, "part": 1, "checkboxItems": [
          { name: '可控', value: '0' },
          { name: '关注点', value: '1' },
          { name: '数值映射', value: '2' },
          { name: '关联动画元素', value: '3' },
          { name: '关联计算点位', value: '4' },
          { name: '简单运算（加减乘除）', value: '5' },
        ]
      })
    }

    that.setData({
      currentPoint: currentPoint,
    });
  },
  dataaddr: function (e) {
    var that = this
    that.setData({
      currentIndex: e.detail.value
    });
  },
  bindPickerDataKongzhiFnDa: function (e) {
    var that = this
    var key = e.currentTarget.dataset.key
    var index = e.detail.value

    var currentPoint = that.data.currentPoint

    currentPoint.fields[key].ctl.multiIndex = [index, 0]
    that.setData({
      currentPoint: currentPoint
    });
  },
  bindPickerDataKongzhiFnXiao: function (e) {
    var that = this
    var key = e.currentTarget.dataset.key
    var index = e.detail.value

    var currentPoint = that.data.currentPoint

    currentPoint.fields[key].ctl.multiIndex[1] = index
    currentPoint.fields[key].ctl.fn = "" + currentPoint.fields[key].ctl.multiIndex[0] + "-" + currentPoint.fields[key].ctl.multiIndex[1] + ""
    that.setData({
      currentPoint: currentPoint,
    });
  },
  dataBit: function (e) {
    var that = this
    var key = e.currentTarget.dataset.key
    var index = e.detail.value
    var currentPoint = that.data.currentPoint
    currentPoint.fields[key].bit = index
    that.setData({
      currentPoint: currentPoint
    });
  },
  checkboxMenuChange: function (e) {
    var that = this
    var currentPoint = that.data.currentPoint
    var key = e.currentTarget.dataset.key
    var list = e.detail.value

    if (list.indexOf("0") != -1) {
      if (currentPoint.fields[key].ctl) {
      } else {
        currentPoint.fields[key].ctl = {
          "no": "",
          "addr": "",
          "min": "",
          "max": "",
          "fn": "",
          "group": 1,
          "multiIndex": [0, 0],
        }
      }
    } else {
      delete currentPoint.fields[key].ctl
    }
    if (list.indexOf("1") != -1) {
      if (currentPoint.fields[key].focus) {
      } else {
        currentPoint.fields[key].focus = that.data.focusCount + 1
        that.setData({
          focusCount: that.data.focusCount + 1
        })
      }
    } else {
      delete currentPoint.fields[key].focus

    }
    if (list.indexOf("2") != -1) {
      if (currentPoint.fields[key].vm) {
      } else {
        var valuemapList = []
        for (var i in that.data.valuemap) {
          valuemapList.push(i)
        }
        valuemapList.push("新增")
        currentPoint.fields[key].vm = ""
        that.setData({
          valuemapList: valuemapList
        })
      }
    } else {
      delete currentPoint.fields[key].vm

    }
    if (list.indexOf("3") != -1) {
      if (currentPoint.fields[key].reftyp) {
      } else {
        currentPoint.fields[key].reftyp = "at"
        currentPoint.fields[key].refgroup = "选择动画元素"
        currentPoint.fields[key].refindex = 0
        var atmap = that.data.atmap
        var atmapList = []
        for (var i in atmap) {
          atmapList.push(i)
        }
        that.setData({
          atmapList: atmapList
        })
      }
    } else {
      if (list.indexOf("4") == -1) {
        delete currentPoint.fields[key].reftyp
        delete currentPoint.fields[key].refgroup
        delete currentPoint.fields[key].refindex
      }
    }
    if (list.indexOf("4") != -1) {
      if (currentPoint.fields[key].reftyp) {
      } else {
        currentPoint.fields[key].reftyp = "count"
        currentPoint.fields[key].refindex = 0
      }
    } else {
      if (list.indexOf("3") == -1) {
        delete currentPoint.fields[key].reftyp
        delete currentPoint.fields[key].refindex
      }
    }
    if (list.indexOf("5") != -1) {
      if (currentPoint.fields[key].mat) {
      } else {
        currentPoint.fields[key].mat = '请选择'
        currentPoint.fields[key].number = 0
      }
    } else {
      delete currentPoint.fields[key].mat
      delete currentPoint.fields[key].number
    }
    if (list.indexOf("6") != -1) {
      if (currentPoint.fields[key].ctl) {
      } else {
        currentPoint.fields[key].ctl = true
      }
    } else {
      if (list.indexOf("0") == -1) {
        delete currentPoint.fields[key].ctl
      }
    }
    if (list.indexOf("7") != -1) {
      currentPoint.fields[key].systatus = true
    } else {
      if (list.indexOf("7") == -1) {
        delete currentPoint.fields[key].systatus
      }
    }
    if (list.indexOf("8") != -1) {
      currentPoint.fields[key].sysrun = true
    } else {
      if (list.indexOf("8") == -1) {
        delete currentPoint.fields[key].sysrun
      }
    }
    var checkboxItems = that.data.currentPoint.fields[key].checkboxItems, values = e.detail.value;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].checked = false;
      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItems[i].value == values[j]) {
          checkboxItems[i].checked = true;
          break;
        }
      }
    }
    this.setData({
      currentPoint: currentPoint
    });
  },
  removeValuemapDaLei: function (e) {
    var that = this
    var key = e.currentTarget.dataset.key
    var valuemap = that.data.valuemap

    delete valuemap[key]
    that.setData({
      "valuemap": valuemap,
    });
  },
  removeValuemapXiaoLei: function (e) {
    var that = this
    var key = e.currentTarget.dataset.key
    var key1 = e.currentTarget.dataset.key1
    var valuemap = that.data.valuemap
    var xiaolei = valuemap[key1]
    delete xiaolei[key]
    that.setData({
      "valuemap": valuemap,
    });
  },
  valuemapXiaoLeiV: function (e) {
    var that = this
    var key = e.currentTarget.dataset.key
    var key1 = e.currentTarget.dataset.key1
    var valuemap = that.data.valuemap
    var xiaolei = valuemap[key1]
    xiaolei[key] = e.detail.value
    that.setData({
      "valuemap": valuemap,
    });
  },
  valuemapXiaoLeiName: function (e) {
    var that = this
    var key = e.currentTarget.dataset.key
    var key1 = e.currentTarget.dataset.key1
    var valuemap = that.data.valuemap
    var xiaolei = valuemap[key1]
    var v = xiaolei[key]
    delete xiaolei[key]
    xiaolei[e.detail.value] = v
    that.setData({
      "valuemap": valuemap,
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
    var that = this
    var key = e.currentTarget.dataset.key
    var valuemap = that.data.valuemap
    var list = valuemap[key]
    delete valuemap[key]
    valuemap[e.detail.value] = list
    that.setData({
      "valuemap": valuemap,
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
  valuemapDialogClose: function () {
    this.setData({
      valuemapDialog: false,
    });
  },

  dataName: function (e) {
    var that = this
    var key = e.currentTarget.dataset.key
    var index = e.detail.value
    var currentPoint = that.data.currentPoint
    currentPoint.fields[key].name = index

    that.setData({
      currentPoint: currentPoint
    });
  },
  dataUnit: function (e) {
    var that = this
    var key = e.currentTarget.dataset.key
    var index = e.detail.value

    var currentPoint = that.data.currentPoint
    currentPoint.fields[key].unit = index

    that.setData({
      currentPoint: currentPoint
    });
  },
  datakongzhiNo: function (e) {
    var that = this
    var key = e.currentTarget.dataset.key
    var index = e.detail.value

    var currentPoint = that.data.currentPoint
    currentPoint.fields[key].ctl.no = index

    that.setData({
      currentPoint: currentPoint
    });
  },
  datakongzhiaddr: function (e) {
    var that = this
    var key = e.currentTarget.dataset.key
    var index = e.detail.value

    var currentPoint = that.data.currentPoint
    currentPoint.fields[key].ctl.addr = index

    that.setData({
      currentPoint: currentPoint
    });
  },
  dataExName: function (e) {
    var that = this
    var key = e.currentTarget.dataset.key
    var index = e.detail.value

    var currentPoint = that.data.currentPoint
    currentPoint.fields[key].name = index

    that.setData({
      currentPoint: currentPoint
    });
  },
  bindPickerCtlGroup: function (e) {
    var that = this
    var key = e.currentTarget.dataset.key
    var index = e.detail.value
    var currentPoint = that.data.currentPoint
    currentPoint.fields[key].ctl.group = index
    that.setData({
      currentPoint: currentPoint
    });
  },
  datakongzhiMax: function (e) {
    var that = this
    var key = e.currentTarget.dataset.key
    var index = e.detail.value

    var currentPoint = that.data.currentPoint
    currentPoint.fields[key].ctl.max = index

    that.setData({
      currentPoint: currentPoint
    });
  },
  datakongzhiMin: function (e) {
    var that = this
    var key = e.currentTarget.dataset.key
    var index = e.detail.value

    var currentPoint = that.data.currentPoint
    currentPoint.fields[key].ctl.min = index

    that.setData({
      currentPoint: currentPoint
    });
  },
  valuemapDialogClose: function () {
    this.setData({
      valuemapDialog: false,
    });
  },
  bindPickerVm: function (e) {
    var that = this
    var key = e.currentTarget.dataset.key
    var index = e.detail.value

    var currentPoint = that.data.currentPoint
    if (that.data.valuemapList[index] == "新增") {
      that.setData({
        valuemapDialog: true
      });
      return
    }
    currentPoint.fields[key].vm = that.data.valuemapList[index]
    that.setData({
      currentPoint: currentPoint
    });
  },
  bindPickerTime: function (e) {
    var that = this
    var key = e.currentTarget.dataset.key
    var index = e.detail.value

    var currentPoint = that.data.currentPoint
    currentPoint.fields[key].part = index

    that.setData({
      currentPoint: currentPoint
    });
  },
  bindPickerEasyOperation: function (e) {
    var that = this
    var key = e.currentTarget.dataset.key
    var index = e.detail.value

    var currentPoint = that.data.currentPoint
    currentPoint.fields[key].mat = that.data.easyOperation[index]

    that.setData({
      currentPoint: currentPoint
    });
  },
  countMapValues: function (e) {
    var that = this
    var key = e.currentTarget.dataset.key
    var index = e.detail.value

    var currentPoint = that.data.currentPoint
    currentPoint.fields[key].number = index

    that.setData({
      currentPoint: currentPoint
    });
  },
  bindPickerCountmap: function (e) {
    var that = this
    var key = e.currentTarget.dataset.key
    var index = e.detail.value

    var currentPoint = that.data.currentPoint
    currentPoint.fields[key].refindex = index

    that.setData({
      currentPoint: currentPoint
    });
  },
  bindPickerAtmap: function (e) {
    var that = this
    var key = e.currentTarget.dataset.key
    var index = e.detail.value

    var currentPoint = that.data.currentPoint
    currentPoint.fields[key].refgroup = that.data.atmapList[index]
    currentPoint.fields[key].refindex = 0
    var elementList = that.data.atmap[that.data.atmapList[index]]

    that.setData({
      elementList: elementList,
      currentPoint: currentPoint
    });
  },
  bindPickerElement: function (e) {
    var that = this
    var key = e.currentTarget.dataset.key
    var index = e.detail.value

    var currentPoint = that.data.currentPoint
    currentPoint.fields[key].refindex = index

    that.setData({
      currentPoint: currentPoint
    });
  },
  invalidValues: function (e) {
    var that = this
    var currentPoint = that.data.currentPoint
    currentPoint.mask = e.detail.value
    that.setData({
      currentPoint: currentPoint,
    });
  },
  bindNumTypChange: function (e) {
    var that = this
    var index = e.detail.value

    var currentPoint = that.data.currentPoint
    currentPoint.typ = index
    if (index != 0) {
      var f = currentPoint.fields
      for (var i in f) {
        delete f[i].bit
      }
    }
    that.setData({
      currentPoint: currentPoint
    });
  },
  bindPointTypChange: function (e) {
    var that = this
    var index = e.detail.value
    var currentPoint = that.data.currentPoint
    var felds = currentPoint.fields
    for (var i in felds) {
      felds[i].typ = index
    }

    that.setData({
      pointTypindex: index,
      currentPoint: currentPoint
    });
  },
  /**
   * 生命周期函数--监听页面卸载
   * 
   * 自动保存点位
   */
  onUnload: function () {
    var that = this
    var currentPoint = that.data.currentPoint
    var currentIndex = that.data.currentIndex
    var fields = currentPoint.fields
    for (var i in fields) {
      if (fields[i].ctl) {
        delete fields[i].ctl.multiIndex
        delete fields[i].checkboxItems
      }
    }
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];  //上一个页面
    var datamap = prevPage.data.datamap
    datamap[currentIndex] = currentPoint

    if (currentPoint.typ == 2) {
      currentIndex = Number(currentIndex) + 2
    } else {
      currentIndex = Number(currentIndex) + 1
    }
    prevPage.setData({
      datamap: datamap,
      currentIndex: currentIndex
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})