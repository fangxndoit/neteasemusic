// pages/hostSinger/hostSinger.js
Page({
  data:{
    hotsong: [],
    inputValue: '',
    hidden: false,
    searchlist: [],
    imgsrc: ''

  },
  bindKeyInput: function(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  addsong: function () {
    this.setData({
      hidden: false
    })
  },
  tosearch: function () {
    var that = this
    console.log(that.data.inputValue)
    that.setData({
      hidden: true
    })
    wx.request({
      url: 'https://api.imjad.cn/cloudmusic/?type=search&s='+ that.data.inputValue,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        console.log("search：")
        console.log(res)
        that.setData({
          searchlist:　res.data.result.songs
        })
        console.log(that.data.searchlist)
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  goSong: function (event) {
    var index = event.currentTarget.dataset.index
    var songid = event.currentTarget.dataset.songid
    var name = event.currentTarget.dataset.name
    var singer = event.currentTarget.dataset.singer
    var img = event.currentTarget.dataset.img
    var pic = event.currentTarget.dataset.pic
    var picsrc = img+'==/'+pic+'.jpg'
    console.log("热门曲的坐标："+index)
    console.log("传的数据ID "+ songid)
    console.log("歌名 "+ name)
    console.log("作者 "+ singer)
    console.log("src:"+img)
    console.log("pic:"+pic)
    
    wx.navigateTo({
      url: '../songDetail/songDetail?songid='+songid+'&name='+name+'&singer='+singer+'&src='+img+'&pic='+pic+'&id='+1+'&index='+index
    })
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    wx.request({
      url: 'https://api.imjad.cn/cloudmusic/?type=search&s=%E7%83%AD%E9%97%A8',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        console.log(res)
        that.setData({
          hotsong:　res.data.result.songs
        })
        console.log(that.data.hotsong)
        
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})