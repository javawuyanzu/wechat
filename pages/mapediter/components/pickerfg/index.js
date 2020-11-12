import { DeviceAdapter } from '../../../../libs/devicelib/index.js';
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
    options: DeviceAdapter.FnGroups
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindPickerChange(e) {
      this.setData({ index: e.detail.value })
      // this.triggerEvent("onChange", { value: {index:e.detail.value, name: this.properties.options[e.detail.value] } })
      this.triggerEvent("onChange", { value: e.detail.value })
    }
  }
})
