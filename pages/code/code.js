// pages/code/code.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  copyCalUrl:function(){
    let calUrl = 'https://github.com/puppyer/miniprogram_calculator/tree/master'
    wx.showModal({
      title: '计算器Github地址',
      content: calUrl,
      cancelText:'已查看',
      cancelColor:'#b6b2b2',
      confirmText:'复制',
      success:(res)=>{
        if(res.confirm){
          wx.setClipboardData({
            data: calUrl,
            success(res) {
              wx.getClipboardData({
                success(res) {
                  console.log(res.data) // data
                }
              })
            }
          })
        }
      }
    }) 
  },
  copyVedioUrl:function(){
    wx.showToast({
      title: '敬请期待...',
    })
  },
  copyAudioUrl: function () {
    wx.showToast({
      title: '敬请期待...',
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (e) {

  }
})