// pages/mapediter/components/powermedia.js
Component({
  // externalClasses:[
  //   "weui-form","weui-form__control-area","weui-cells__group weui-cells__group_form","weui-cells","weui-cells_form","weui-cell", "weui-cell_active","weui-cell__hd","weui-input"
  // ],
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    options: Array,
    title: String,
    index: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    vstr: null
  },
  pageLifetimes: {
    show: function () {
      // 页面被展示

    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    setVstr(e) {
      this.setData({ vstr: e.detail.value })
      this.triggerEvent("onSetVstr", { value: e.detail.value })
    },
    save() {

    },
    bindPickerChange(e) {
      this.setData({ index: parseInt(e.detail.value) })
      this.triggerEvent("onPickerChange", { value: parseInt(e.detail.value),name:this.properties.options[this.data.index]})
    }
  }
})
