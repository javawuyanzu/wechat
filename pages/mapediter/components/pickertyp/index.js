// pages/mapediter/components/typepicker/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index:null
  },

  /**
   * 组件的初始数据
   */
  data: {
    title: '类别',
    options: [
      '报警',
      '基本信息',
      '温度',
      '压力',
      '流量',
      '开关',
      '设置',
      '设备',
      '定时'
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindPickerChange(e) {
      this.setData({ index: e.detail.value })
      // this.triggerEvent("onChange", { value: { index: e.detail.value, name: this.data.options[e.detail.value] } })
      this.triggerEvent("onChange", { value:  e.detail.value })
    }
  }
})
