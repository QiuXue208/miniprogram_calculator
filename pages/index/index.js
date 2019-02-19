//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    // userInfo: {},
    // hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  navToCalc: function(e) {
    wx.navigateTo({
      url: '../calculate/calculate'
    })
  },
  onLoad: function () {
    console.log('监听页面加载')
  },
})
