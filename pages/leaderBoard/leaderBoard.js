// pages/leaderBoard/leaderBoard.js
Page({
  data:{
    second: 0
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    countdown(this);
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
function countdown(that) {
 var second = that.data.second
 if (second == 1000) {
  // console.log("Time Out...");
  that.setData({
   second: "Time Out..."
  });
  return ;
 }
 var time = setTimeout(function(){
  that.setData({
   second: second + 1
  });
  countdown(that);
 }
 ,1000)
}