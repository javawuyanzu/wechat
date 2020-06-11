Page({
  data: {
    minaList: [
      {
        "id": 1,
        "name": "PLC燃油蒸汽",
        "desc": "PLC燃油蒸汽通用点位表",
        "useName": "刘祥明",
      },
      {
        "id": 2,
        "name": "PLC燃煤蒸汽",
        "desc": "济南诚达特制点位表",
        "useName": "刘增强",
      }
    ]
  },
 
  use: function (e) {
    // url: "/pages/deviceDetail/deviceDetail?deviceNo=" + deviceNo
    wx.navigateTo({
      url: "/pages/dataMap/dataMap",
    })

  }
})