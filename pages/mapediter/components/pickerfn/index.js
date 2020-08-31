import { DeviceAdapter } from '../../../../libs/datamap/index.js';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: null
  },

  /**
   * 组件的初始数据
   */
  data: {
    fns: null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindPickerChange(e) {
      this.setData({ index: parseInt(e.detail.value) })
      // this.triggerEvent("onChange", { value: { index: e.detail.value, name: this.data.fns[e.detail.value] } })
      this.triggerEvent("onChange", { value: e.detail.value })
    },
    changeFg(e) {
      let fns = []
      //console.log(e)
      for (let k in DeviceAdapter.Fns[e]) {
        fns.push(DeviceAdapter.Fns[e][k].title)
      }
      //console.log(fns)
      this.setData({ index: null, fns: fns })
    }
  },
  pageLifetimes: {
    show: function () {
      // 页面被展示

    }
  },
})
