Page({
  data: {
  },
  copyText: function (e) {
    wx.setClipboardData({
      data: "http://www.sdcsoft.com.cn/app/gl/gl.apk",
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功'
            })
          }
        })
      }
    })
  },
})
