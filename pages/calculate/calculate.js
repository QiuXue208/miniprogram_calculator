// pages/calculate/calculate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用于显示到界面
    datas:{
      rowFir: ['C','←','%','+'],
      rowSec:['9','8','7','-'],
      rowThi: ['6', '5', '4','×'],
      rowFou: ['3', '2', '1','÷'],
      rowFiv:['0','.','=']
    },
    calcSign: ['%', '+', '-', '×', '÷'],
    number: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    resultSign:'=',
    clickValue:'',
    showValue:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  // 点击时改变显示的值
  userClick:function(e){
    this.setData({
      clickValue: e.target.id,
      showValue: this.data.showValue + e.target.id
    })
    this.dealInput()
  },
  dealInput:function(){
    // 变量
    let clickValue = this.data.clickValue
    let showValue = this.data.showValue
    let length = showValue.length
    // 倒数第二个显示的
    let lastButOne = showValue.slice(-2,-1)

    // 条件判断
    if (clickValue === 'C') {
      // 清除键
      this.setData({
        showValue: ''
      })
    } else if (clickValue === '←') {
      // 退回一格
      this.setData({
        showValue: showValue.slice(0,length - 2)
      })
    } else if ((lastButOne === '%' || lastButOne === '+' || lastButOne === '-' || lastButOne === '×' || lastButOne === '÷') && (clickValue === '+' || clickValue === '-' || clickValue === '×' || clickValue === '÷' || clickValue === '%')){
      //如果连续点计算符号键，则显示第二个计算符   
      this.setData({
        showValue:showValue.slice(0,length -2) + clickValue
      })
    } else if ((lastButOne === '' || (length === 2 &&( lastButOne === '%' || lastButOne === '+' || lastButOne === '-' || lastButOne === '×' || lastButOne === '÷'))) && clickValue === '=') {
      // 如果一开始就点=，则报错
      // 如果showValue长度为2，第一个为计算符号，第二个为=号，也报错
      this.setData({
        showValue:'错误'
      })
    }else if(showValue.slice(0,length-1) === '错误'){
      // 如果显示屏上显示错误时，点击再次时按重新输入来算
      this.setData({
        showValue: '' + clickValue
      })
    } else if ((lastButOne === '%' || lastButOne === '+' || lastButOne === '-' || lastButOne === '×' || lastButOne === '÷')&& clickValue === '='){
      this.setData({
        showValue:showValue.slice(0,length -2)
      })
    }
  },
  calculate:function(){

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})