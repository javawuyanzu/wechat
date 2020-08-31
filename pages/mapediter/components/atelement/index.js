Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    elements: Array
  },

  /**
   * 组件的初始数据
   */
  data: {
    name: null,
    amount: null,
    elements: []
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

    setName(e) {
      this.setData({ name: e.detail.value })
    },
    setAmount(e) {
      this.setData({ amount: e.detail.value })
    },
    add() {
      //console.log(this.data.name+'-'+this.data.amount)
      if (this.data.name && this.data.amount > 0) {
        let es = this.data.elements
        console.log(es)
        es.push({ name: this.data.name, amount: parseInt(this.data.amount), v: 0 })
        this.setData({ elements: es, name: null, amount: null })
        this.save()
      }
    },
    sub(e) {
      let es = this.data.elements
      let index = e.currentTarget.dataset.index
      es.splice(index, 1)
      this.setData({ elements: es })
      this.save()
    },
    save() {
      let es = this.data.elements
      let elements = null
      if (es.length > 0) {
        elements = es
      }
      this.triggerEvent("onSave", { value: elements })
    }
  }
})
