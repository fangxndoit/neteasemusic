Page({
  onReady: function (e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')
  },
  data:{
    id: '',
    songid: '',
    name: '',
    singer: '',
    pic: '',
    src: '',
    picsrc: '',
    songdetail: [],
    playing: true,
    playtime: '00:00',
    duration: '00:00',
    percent: 1,
    openlist: true,
    allsong: [],
    index: '',
    second: 0,
    lyric: true,
    songLyic: ''
  },
  changesong: function () {
    var that = this
    wx.request({
      url: 'https://api.imjad.cn/cloudmusic/?type=lyric&id='+that.data.songid,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        console.log(res)
        that.setData({
          songLyic: res.data.lrc.lyric
        })
        console.log(that.data.songLyic)
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  openlyric: function () {
    var that = this
    if(that.data.openlist === false){
      that.setData({
      
      openlist: true
    })
    }else{
      that.setData({
      lyric: false
    })
    }
    
  },
  closelyric: function () {
     var that = this
    that.setData({
      lyric: true
    })
  },
  //下一首
  tonext: function (event) {
    var that = this  
       
    console.log("下一首，真有趣，你得到了下标:"+that.data.index)
    if(that.data.index>=that.data.allsong.length-1){
       that.setData({
         index: -1
       })
    }
       
    console.log("让我看看你的全部歌曲数据：")
    console.log(that.data.allsong)
    console.log("开始执行下一曲了")
    console.log(that.data.allsong[that.data.index+1].id)
    that.setData({
      songid: that.data.allsong[that.data.index+1].id,
      name: that.data.allsong[that.data.index+1].name,
      singer:that.data.allsong[that.data.index+1].ar[0].name,
      picsrc: that.data.allsong[that.data.index+1].al.picUrl,
    })
    that.changesong();
    wx.request({
      url: 'https://musicapi.duapp.com/api.php?type=url&id='+that.data.allsong[that.data.index+1].id,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/json'
      }, // 设置请求的 header
      success: function(res){
        // success
        console.log(res)
        that.setData({ 
          songdetail: res.data.data[0],
          playing: true
        })
        wx.playBackgroundAudio({   
          dataUrl: that.data.songdetail.url,
          title: that.data.name
       })
      },
    })
    that.data.index+=1
    
  },
  //上一首
  toforen: function () {
    var that = this
    that.changesong();
    if(that.data.index<=0){
      that.setData({
        index: that.data.allsong.length
      })
    }
    console.log("上一首，真有趣，你得到了下标:"+that.data.index-1)
    
    console.log(that.data.allsong[that.data.index-1].id)
    that.setData({
      songid: that.data.allsong[that.data.index-1].id,
      name: that.data.allsong[that.data.index-1].name,
      singer:that.data.allsong[that.data.index-1].ar[0].name,
      picsrc: that.data.allsong[that.data.index-1].al.picUrl,
    })
    that.changesong();
    wx.request({
      url: 'https://musicapi.duapp.com/api.php?type=url&id='+that.data.allsong[that.data.index-1].id,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/json'
      }, // 设置请求的 header
      success: function(res){
        // success
        console.log(res)
        that.setData({ 
          songdetail: res.data.data[0],
          playing: true
        })
        wx.playBackgroundAudio({   
          dataUrl: that.data.songdetail.url,
          title: that.data.name
       })
      },
    })
    that.data.index-=1
  },
  open: function () {
    this.setData({
      openlist: false
    })
    console.log("打开列表")
  },
  close: function () {
    console.log("我希望这是我想要的id："+this.data.songid)
    this.setData({
      openlist: true
    })
  },
  playingsong: function (event) {
    var that = this
    var index = event.currentTarget.dataset.index
    var songid = event.currentTarget.dataset.songid
    var name = event.currentTarget.dataset.name
    var singer = event.currentTarget.dataset.singer
    var picsrc = event.currentTarget.dataset.picsrc
    
    console.log("你会发现，你现在播放的下标是"+ index)
    console.log("这里是歌单要点击传的数据")
    console.log("传的数据ID "+ songid)
    console.log("歌名 "+ name)
    console.log("作者 "+ singer)
    console.log("图片 "+ picsrc)

    that.setData({
      songid: songid,
      name: name,
      singer:singer,
      picsrc: picsrc,
      index: index
    })

    wx.request({
      url: 'https://musicapi.duapp.com/api.php?type=url&id='+songid,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/json'
      }, // 设置请求的 header
      success: function(res){
        // success
        console.log(res)
        that.setData({ 
          songdetail: res.data.data[0]
        })
        console.log(that.data.songdetail.url)
        console.log(that.data.name)
        console.log("picsrc: "+that.data.picsrc)
        wx.playBackgroundAudio({
     //播放地址
     dataUrl: that.data.songdetail.url,
     //title 音乐名字
     title: that.data.name
   })
      },
      fail: function() {
        // fail
        console.log("失败")
      },
      complete: function() {
        // complete
      }
    })

  },
  playingtoggle: function () {
    var that = this
    console.log("::"+that.data.playing)
    if (that.data.playing) {
      console.log("-:"+that.data.playing)
      console.log("暂停播放") 
      that.setData({
        playing: false
      })
      wx.pauseBackgroundAudio();
    }else{
      console.log("+:"+that.data.playing)
      console.log("继续播放") 
      that.setData({
        playing: true
      })
      wx.playBackgroundAudio();
    }
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    
    var that = this
    var listindex = options.index
    var id = options.id
    var songId = options.songid
    var name = options.name
    var singer = options.singer
    
    var pic = options.pic
    var src = options.src
    console.log("歌单id："+id)
    console.log("这是歌曲的ID吧："+songId)
    
    that.setData({
      songid: songId,
      name: name,
      singer:singer,
      index: parseInt(listindex),
      picsrc: src+'==/'+pic+'.jpg',
      
    })
    console.log("这是我从列表取到的坐标，试试看看："+that.data.index)
    console.log(that.data.songid)
    wx.request({
      url: 'https://musicapi.duapp.com/api.php?type=url&id='+songId,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/json'
      }, // 设置请求的 header
      success: function(res){
        // success
        console.log(res)
        that.setData({ 
          songdetail: res.data.data[0]
        })
        
        console.log("音乐播放地址"+that.data.songdetail.url)
        console.log(that.data.name)
        console.log("picsrc: "+that.data.picsrc)
    wx.playBackgroundAudio({
       //播放地址
       dataUrl: that.data.songdetail.url,
       //title 音乐名字
       title: that.data.name
    });
    

  },
      fail: function() {
        // fail
        console.log("失败")
      },
      complete: function() {
        // complete
      }
    })

    //获取全部歌曲
    wx.request({
      url: 'https://api.imjad.cn/cloudmusic/?type=playlist&id=' + id,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        console.log(res)
        that.setData({
          allsong: res.data.playlist.tracks
        })
        console.log("这里是全部歌曲")
        console.log(that.data.allsong)
        
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
    wx.request({
      url: 'https://api.imjad.cn/cloudmusic/?type=lyric&id='+this.data.songid,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        console.log(res)
        that.setData({
          songLyic: res.data.lrc.lyric
        })
        console.log(that.data.songLyic)
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
    wx.onBackgroundAudioStop(function(){
      console.log(that.data.songid)
      that.tonext();
      that.changesong();     
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