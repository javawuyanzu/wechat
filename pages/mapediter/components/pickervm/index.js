Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: null,
    options: Array
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindPickerChange(e) {
      this.setData({ index: e.detail.value })
      this.triggerEvent("onChange", {
        value:
        {
          name: this.properties.options[e.detail.value],
          index: e.detail.value
        }
      })
      console.log(e.detail.value,this.properties.options[e.detail.value])
    }
  }
})
