const app = getApp()
let map = {
    title: '',
    share: 1,
    power: {},
    media: {},
    atmap: {
        fire: [],
        beng: [],
        fan: []
    },
    datamap: {}
}
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [
            {
                id: 'base',
                name: '表信息',
                open: false,
                titles: ['表名称', '共享状态'],
                pages: ['maptitle', 'mapshare']
            },
            {
                id: 'device',
                name: '设备信息',
                open: false,
                pages: ['mappower', 'mapmedia', 'mapno', 'mapinput', 'mapsysrun', 'mapsystate'],
                titles: ['燃料', '介质', '站号', '输入传感器测量范围', '运行时间统计']
            },
            {
                id: 'at',
                name: '设备动画',
                open: false,
                pages: ['mapatfire', 'mapatbeng', 'mapatfan'],
                titles: ['炉子', '水泵', '风机']
            },
            {
                id: 'dingshi',
                name: '设备定时器',
                open: false,
                pages: ['mapdingshi'],
                titles: ['定时器管理']
            },
            {
                id: 'fix',
                name: '设备静态值',
                open: false,
                pages: ['mapfix'],
                titles: ['静态值管理']
            },
            {
                id: 'vm',
                name: '设备数值映射',
                open: false,
                pages: ['mapvm'],
                titles: ['数值映射管理']
            },
            {
                id: 'count',
                name: '设备计算项',
                open: false,
                pages: ['mapcount'],
                titles: ['计算项管理']
            },
            {
                id: 'kongzhi',
                name: '设备独立可控点',
                open: false,
                pages: ['mapkongzhi'],
                titles: ['独立可控点管理']
            },
            {
                id: 'point',
                name: '设备可视点位信息',
                open: false,
                pages: ['mappointlist'],
                titles: ['可视点管理']
            }
        ],
        datamapId:null
    },
    kindToggle: function (e) {
        var id = e.currentTarget.id, list = this.data.list;
        for (var i = 0, len = list.length; i < len; ++i) {
            if (list[i].id == id) {
                list[i].open = !list[i].open
            } else {
                list[i].open = false
            }
        }
        this.setData({
            list: list
        });
    },
    getMapTitle() {
        return { i: 0, title: map.title }
    },
    setMapTitle(e) {
        //console.log(e)
        let list = this.data.list
        let i = e.i
        let v = e.v
        list[0].titles[i] = v
        map.title = v
        this.setData({
            list: list
        })
        console.log(map)
    },
    getMapShare() {
        console.log(map)
        return { i: 1, share: map.share }
    },
    setMapShare(e) {
        let list = this.data.list
        list[0].titles[e.i] = e.v ? '私有' : '共享'
        map.share = e.v
        this.setData({
            list: list
        })
        console.log(map)
    },
    getMapPower() {
        return { i: 0, power: map.power }
    },
    setMapPower(e) {
        console.log(e)
        let ls = this.data.list
        let i = e.i
        let power = e.power
        ls[1].titles[i] = power.vstr
        map.power = power
        this.setData({
            list: ls
        })
        console.log(map)
    },
    getMapMedia() {
        return { i: 1, media: map.media }
    },
    setMapMedia(e) {
        console.log(e)
        let ls = this.data.list
        let i = e.i
        let media = e.media
        ls[1].titles[i] = media.vstr
        map.media = media
        this.setData({
            list: ls
        })
        console.log(map)
    },
    getMapNo() {
        return { i: 2, no: map.no }
    },
    setMapNo(e) {
        console.log(e)
        let ls = this.data.list
        let i = e.i
        let no = e.v
        if (no) {
            ls[1].titles[i] = '站号：' + no
            map.no = parseInt(no)
        }
        else {
            delete map.no
            ls[1].titles[i] = '站号'
        }
        this.setData({
            list: ls
        })
        console.log(map)
    },
    getMapInput() {
        return { i: 3, input: map.input }
    },
    setMapInput(e) {
        console.log(e)
        let ls = this.data.list
        let i = e.i
        let input = e.v
        if (input) {
            ls[1].titles[i] = input.min + '-' + input.max
            map.input = input
        }
        else {
            delete map.input
            ls[1].titles[i] = '传感器测量范围'
        }

        this.setData({
            list: ls
        })
        console.log(map)
    },
    getMapSysRun() {
        console.log(map.sysrun)
        return { i: 4, sysrun: map.sysrun }
    },
    setMapSysRun(e) {
        let ls = this.data.list
        let i = e.i
        let sysrun = e.v
        if (sysrun) {
            ls[1].titles[i] = sysrun.name + '-启用'
            map.sysrun = sysrun
        }
        else {
            delete map.sysrun
            ls[1].titles[i] = '系统运行时间统计'
        }
        this.setData({
            list: ls
        })
        console.log(map)
    },
    getMapAtFire() {
        return { i: 0, fire: map.atmap.fire }
    },
    setMapAtFire(e) {
        let ls = this.data.list
        let i = e.i
        let fires = e.v
        console.log(fires)
        if (fires) {
            map.atmap.fire = fires
            ls[2].titles[i] = '炉子：' + fires.length
        }
        else {
            delete map.atmap.fire
            ls[2].titles[i] = '炉子'
        }
        this.setData({ list: ls })
        console.log(map)
    },
    getMapAtBeng() {
        return { i: 1, beng: map.atmap.beng }
    },
    setMapAtBeng(e) {
        let ls = this.data.list
        let i = e.i
        let beng = e.v
        if (beng) {
            map.atmap.beng = beng
            ls[2].titles[i] = '水泵：' + beng.length
        }
        else {
            delete map.atmap.beng
            ls[2].titles[i] = '水泵'
        }
        this.setData({ list: ls })
        console.log(map)
    },
    getMapAtFan() {
        return { i: 2, fan: map.atmap.fan }
    },
    setMapAtFan(e) {
        let ls = this.data.list
        let i = e.i
        let fan = e.v
        if (fan) {
            map.atmap.fan = fan
            ls[2].titles[i] = '风机：' + fan.length
        }
        else {
            delete map.atmap.fan
            ls[2].titles[i] = '风机'
        }
        this.setData({ list: ls })
        console.log(map)
    },
    getMapDingShi() {
        return { i: 0, dingshi: map.dingshi }
    },
    setMapDingShi(e) {
        let ls = this.data.list
        let i = e.i
        let dingshi = e.v
        if (dingshi) {
            map.dingshi = dingshi
            ls[3].titles[i] = '定时器：' + dingshi.length
        }
        else {
            delete map.dingshi
            ls[3].titles[i] = '定时器'
        }
        this.setData({ list: ls })
        console.log(map)
    },
    getMapFix() {
        return { i: 0, fixs: map.fixfields }
    },
    setMapFix(e) {
        let ls = this.data.list
        let i = e.i
        let fixs = e.v
        if (fixs) {
            map.fixfields = fixs
            ls[4].titles[i] = '静态值：' + fixs.length
        }
        else {
            delete map.fixfields
            ls[4].titles[i] = '设备静态值'
        }
        this.setData({ list: ls })
        console.log(map)
    },
    getMapVm() {
        return { i: 0, vm: map.valuemap ? map.valuemap : {} }
    },
    setMapVm(e) {
        let ls = this.data.list
        let i = e.i
        let vm = e.v
        if (vm) {
            map.valuemap = vm
            ls[5].titles[i] = '数值映射：' + Object.keys(vm).length
        }
        else {
            delete map.valuemap
            ls[5].titles[i] = '数值映射管理'
        }
        this.setData({ list: ls })
        console.log(map)
    },
    getMapCount() {
        return { i: 0, count: map.countmap, vm: map.valuemap ? map.valuemap : {} }
    },
    setMapCount(e) {
        console.log(e)
        let ls = this.data.list
        let i = e.i
        let count = e.v
        if (count) {
            map.countmap = count
            ls[6].titles[i] = '计算项：' + count.length
        }
        else {
            delete map.countmap
            ls[6].titles[i] = '计算项管理'
        }
        this.setData({ list: ls })
        console.log(map)
    },
    getMapKongZhi() {
        return { i: 0, kongzhi: map.kongzhi ? map.kongzhi : [] }
    },
    setMapKongZhi(e) {
        console.log(e)
        let ls = this.data.list
        let i = e.i
        let kongzhi = e.v
        if (kongzhi) {
            map.kongzhi = kongzhi
            ls[7].titles[i] = '可控点' + kongzhi.length
        }
        else {
            delete map.kongzhi
            ls[7].titles[i] = '独立可控点管理'
        }
        this.setData({ list: ls })
        console.log(map)
    },
    getMapPoints() {
        return { i: 0, points: map.datamap }
    },
    setMapPoints(e) {
        console.log(e)
        let ls = this.data.list
        let i = e.i
        let points = e.v
        let len = Object.keys(points).length
        if (len) {
            map.datamap = points
            ls[8].titles[i] = '可视点' + len
        }
        else {
            map.datamap = {}
            ls[8].titles[i] = '可视点管理'
        }
        this.setData({ list: ls })
        console.log(map)
    },
    getMapPointFields(key) {
        console.log(map.datamap)
        return { fields: map.datamap[key].fields ? map.datamap[key].fields : [] }
    },
    setMapPointFields(e) {
        let key = e.key
        map.datamap[key].fields = e.fields
    },
    getAtElements() {
        return { fire: map.atmap.fire, beng: map.atmap.beng, fan: map.atmap.fan }
    },
    savePoint() {
    var that=this
    var deviceDataMap=JSON.stringify(map)
    wx.request({
      url: 'https://apis.sdcsoft.com.cn/wechat/DeviceDataMap/create',
      method: "POST",
      data: {
        title: map.title,
        deviceDataMap: deviceDataMap,
        status: 1,
        author: app.globalData.openid,
        share: map.share,
        deviceDataLength:0
      },
      success: function (res) {
        wx.showToast({
          title: "上传成功",
          icon: 'success',
          duration: 5000
        });
        wx.navigateBack({
            delta: 1
        })
      }
    })
    },
    
    editPoint: function (e) {
        var that=this
        var deviceDataMap=JSON.stringify(map)
        if(that.data.datamapId){
            wx.request({
                url: 'https://apis.sdcsoft.com.cn/wechat/DeviceDataMap/modify/share/title',
                method: "POST",
                data: {
                  id:Number(that.data.datamapId),
                  share:Number(map.share),
                  title:map.title,
                },
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                success: function (res) {
                  console.log(res)
                }
              }) 
        }
        wx.request({
          url: 'https://apis.sdcsoft.com.cn/wechat/DeviceDataMap/modify/map',
          method: "POST",
          data: {
            id:Number(that.data.datamapId),
            dataMap: deviceDataMap,
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            console.log(res)
            if(res.data.code==0){
              wx.showToast({
                title: "修改成功",
                icon: 'success',
                duration: 5000
              });
              wx.navigateBack({
                delta: 1
              })
            }else{
              wx.showToast({
                title: "修改失败",
                icon: 'success',
                duration: 5000
              });
            }
          }
        })
      },
    initPageData(data) {
        let list = this.data.list
        list[0].titles[0] = data.title
        list[0].titles[1] = data.share ? '私有' : '共享'
        list[1].titles[0] = data.power.vstr
        list[1].titles[1] = data.media.vstr
        if (data.no) {
            list[1].titles[2] = data.no
        }
        if (data.input) {
            list[1].titles[3] = data.input.min + '-' + data.input.max
        }
        if (data.sysrun) {
            list[1].titles[4] = '运行时间统计-启用'
        }
        if (data.atmap.fire && data.atmap.fire.length > 0) {
            list[2].titles[0] = '炉子：' + data.atmap.fire.length
        }
        if (data.atmap.beng && data.atmap.beng.length > 0) {
            list[2].titles[1] = '水泵：' + data.atmap.beng.length
        }
        if (data.atmap.fan && data.atmap.fan.length > 0) {
            list[2].titles[2] = '风机：' + data.atmap.fan.length
        }
        if (data.dingshi && data.dingshi.length > 0) {
            list[3].titles[0] = '定时器：' + data.dingshi.length
        }
        if (data.fixfields && data.fixfields.length > 0) {
            list[4].titles[0] = '静态值：' + data.fixfields.length
        }
        if (data.valuemap && Object.keys(data.valuemap).length > 0) {
            list[5].titles[0] = '数值映射：' + Object.keys(data.valuemap).length
        }
        if (data.countmap && data.countmap.length > 0) {
            list[6].titles[0] = '计算项：' + data.countmap.length
        }
        if (data.kongzhi && data.kongzhi.length > 0) {
            list[7].titles[0] = '可控点：' + data.kongzhi.length
        }
        if (data.datamap && Object.keys(data.datamap).length > 0) {
            list[8].titles[0] = '可视点：' +  Object.keys(data.datamap).length
        }
        this.setData({ list: list })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options.datamapId)
        if(options.datamapId){
            this.setData({datamapId:options.datamapId})
        }
        app.globalData.editpage = this
        let pages = getCurrentPages();
        let prevPage = pages[pages.length - 2];  //上一个页面
        let info = prevPage.getMap()
        console.log(info)
        if (null != info.map) {
            map = info.map
            this.initPageData(map)
        }else{
            map ={
                title: '',
                share: 1,
                power: {},
                media: {},
                atmap: {
                    fire: [],
                    beng: [],
                    fan: []
                },
                datamap: {}
            }
        }
        console.log(map)
    },

})