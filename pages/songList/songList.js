// pages/songList/songList.js
Page({
  data:{
    playList: []
  },
  goListDetail: function (event) {
    var id = event.currentTarget.dataset.id
    var name = event.currentTarget.dataset.name
    var coverimg = event.currentTarget.dataset.coverimg
    var coverimgid = event.currentTarget.dataset.coverimgid
    var avatarUrl = event.currentTarget.dataset.creator.avatarUrl
    var nickname = event.currentTarget.dataset.creator.nickname
    var avatarImgIdStr = event.currentTarget.dataset.creator.avatarImgIdStr
    
    console.log(coverimg)
    console.log(coverimgid)
    console.log(id)
    console.log(name)
    console.log(avatarUrl)
    console.log(nickname)
    console.log(avatarImgIdStr)
    wx.navigateTo({
      url: '../listDetail/listDetail?id='+id+'&name='+name+'&avatarUrl='+avatarUrl+'&nickname='+nickname+'&avatarImgIdStr='+avatarImgIdStr+'&coverimg='+coverimg+'&coverimgid='+coverimgid
    })
  },
  onLoad:function(options){
    var that = this
    // 页面初始化 options为页面跳转所带来的参数
    wx.request({
      url: 'https://musicapi.duapp.com/api.php?type=topPlayList&cat=all',
      
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/json'
      }, // 设置请求的 header
      success: function(res){   
        // success
        console.log(res)
        that.setData({
          playList: res.data.playlists
        })
        console.log(that.data.playList)
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