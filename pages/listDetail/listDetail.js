// pages/leaderBoard/leaderBoard.js
Page({
  data:{
    id: '',
    name: '',
    avatarUrl: '',
    nickname: '',
    headimgsrc: '',
    imgsrc: '',
    playlist: [],
    color: '#000',
    songId: ''
  },
  redfont: function (event) {
    var songid = event.currentTarget.dataset.songid
    console.log("传的数据ID "+ songid) 
  },
  listgoSong: function () {
    console.log("告诉我，你看到了什么")
    console.log(this.data.playlist)
    var index = 0
    var songid = this.data.playlist[0].id
    var name = this.data.playlist[0].name
    var singer = this.data.playlist[0].ar[0].name
    var img = this.data.playlist[0].al.picUrl
    var pic = this.data.playlist[0].al.pic
    var picsrc = img+'==/'+pic+'.jpg'
    wx.navigateTo({
      url: '../songDetail/songDetail?songid='+songid+'&name='+name+'&singer='+singer+'&src='+img+'&pic='+pic+'&id='+this.data.id+'&index='+0
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
    
    console.log("传的数据ID "+ songid)
    console.log("歌名 "+ name)
    console.log("作者 "+ singer)
    console.log("全部歌曲数据")
    console.log(this.data.playlist)
    wx.navigateTo({
      url: '../songDetail/songDetail?songid='+songid+'&name='+name+'&singer='+singer+'&src='+img+'&pic='+pic+'&id='+this.data.id+'&index='+index
    })
  },
  blackfont: function () {
    this.setData({
      color: '#000'
    })
    console.log("我变黑了")
  },
  onLoad:function(options){
    var that = this
    // 页面初始化 options为页面跳转所带来的参数
    var id = options.id
    var name = options.name
    var avatarUrl = options.avatarUrl
    var nickname = options.nickname
    var avatarImgIdStr = options.avatarImgIdStr
    var coverimg = options.coverimg
    var coverimgid = options.coverimgid
    
    console.log(id)
    console.log(name)
    console.log(avatarUrl)
    console.log(nickname)
    console.log(avatarImgIdStr)
    console.log(coverimgid)
    console.log(coverimg)
    that.setData({
      id: id,
      name: name,
      avatarUrl: avatarUrl,
      nickname: nickname,
      avatarImgIdStr: avatarImgIdStr,
      headimgsrc: avatarUrl+'==/'+avatarImgIdStr+'.jpg',
      imgsrc: coverimg+'==/'+coverimgid+'.jpg'
    })
    console.log(id)
    wx.request({
      url: 'https://api.imjad.cn/cloudmusic/?type=playlist&id=' + id,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        console.log(res)
        that.setData({
          playlist: res.data.playlist.tracks
        })
        console.log(that.data.playlist)
        
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