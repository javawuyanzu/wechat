

Page({
  data: {
    downloadFile:[],
  },
  onLoad (query) {
    var that =this
    wx.request({
      //获取openid接口   
      url: 'https://apis.sdcsoft.com.cn/webapi/docs/comms',
      data: {
      },
      method: 'GET',
      success: function (res) {
        console.log(res)
        var list=res.data.data
          var files=[]
          for(var i in list){
            files.push({file:list[i].fileName,path:"",url:"https://docs.sdcsoft.com.cn/docs/comms/"+"/"+list[i].fileName})
          }
          that.setData({
            downloadFile:files
          })
      }
    })
    wx.getSavedFileList({
      success (res) {
        if (res.fileList.length > 0){
          wx.removeSavedFile({
            filePath: res.fileList[0].filePath,
            complete (res) {
            }
          })
        }
      }
     })
  },
  //读取本地缓存文件
  getLocalFiles(manager, $this) {
    manager.readdir({
      dirPath: `${wx.env.USER_DATA_PATH}/download`,
      success: (res) => {
        // console.log('本地文件列表: ', res)
        let downloadFile = [];
        console.log(res.files)
        res.files.forEach((item, index) => {
          downloadFile.push({
            file: item,
            path: `${wx.env.USER_DATA_PATH}/download/` + item,
          })
        })
        $this.setData({
          downloadFile,
        })
      },
      fail: (err) => {
        console.log('本地文件列表读取失败')
      }
    })
  },
  //下载文件
  savefiles(e){
    var that =this
    const fileName = e.currentTarget.dataset.file;   //获取页面要下载的文件名
    var fileType=fileName.substr(fileName.indexOf('.')+1,fileName.length)
    const url = e.currentTarget.dataset.url; 
    const idx = e.currentTarget.dataset.idx; 
    let $this = this;
    wx.showLoading({
      title: "正在下载...",
    })
    wx.downloadFile({
      url:url,   
      success:(res)=> {
        var filePath = res.tempFilePath;
        let manager = wx.getFileSystemManager();  //获取全局唯一的文件管理器
        //判断目录是否存在
        manager.access({
          path: `${wx.env.USER_DATA_PATH}/download`,
          success: (res) => {
             console.log('已存在path对应目录',res)
            //保存文件之前查看是否存在此文件  
            manager.access({
              path: `${wx.env.USER_DATA_PATH}/download/${fileName}`, 
              success(res){
                wx.openDocument({
                  filePath: `${wx.env.USER_DATA_PATH}/download/${fileName}`,
                  fileType: fileType,
                  success:(res)=>{
                    wx.hideLoading()
                    console.log('读取成功',res)
                  },
                  fail:(err)=>{
                    console.log('读取失败',err)
                  }
                })
                return false;
              },
              fail(err){
                  console.log('不存在此文件')
                  var downloadFile=that.data.downloadFile
                  downloadFile[idx].path=`${wx.env.USER_DATA_PATH}/download/${fileName}`
                  that.setData({
                    downloadFile: downloadFile
                  })
                  
                  manager.saveFile({
                    tempFilePath: filePath,     //filePath为保存到本地的临时路径
                    filePath: `${wx.env.USER_DATA_PATH}/download/${fileName}`,
                    success: (res) => {
                      wx.openDocument({
                        filePath: `${wx.env.USER_DATA_PATH}/download/${fileName}`,
                        fileType: fileType,
                        success:(res)=>{
                          wx.hideLoading()
                          console.log('读取成功',res)
                        },
                        fail:(err)=>{
                          console.log('读取失败',err)
                        }
                      })
                    },
                    fail: (err) => {
                      console.log(err)
                    }
                  })
              }
            })
            },
            fail: (err) => {
               console.log(err, '本地缓存为空')
              //创建保存文件的目录
              manager.mkdir({
                dirPath: `${wx.env.USER_DATA_PATH}/download`,
                recursive: false,
                success: (res) => {
                  //将临时文件保存到目录  /download
                  var downloadFile=that.data.downloadFile
                  downloadFile[idx].path=`${wx.env.USER_DATA_PATH}/download/${fileName}`
                  that.setData({
                    downloadFile: downloadFile
                  })
                  
                   manager.saveFile({
                    tempFilePath: filePath,
                    filePath: `${wx.env.USER_DATA_PATH}/download/${fileName}`,
                    success: (res) => {
                      wx.openDocument({
                        filePath: `${wx.env.USER_DATA_PATH}/download/${fileName}`,
                        fileType: fileType,
                        success:(res)=>{
                          wx.hideLoading()
                          console.log('读取成功',res)
                        },
                        fail:(err)=>{
                          console.log('读取失败',err)
                        }
                      })
                    },
                    fail: (err) => {
                      console.log(err)
                    }
                  })
                },
                fail: (err) => {
                  console.log(err,)
                }
              })
            }
        })
      },
      fail:(err)=>{
          console.log(err, "下载失败")
      }
    })
  },
 

});

