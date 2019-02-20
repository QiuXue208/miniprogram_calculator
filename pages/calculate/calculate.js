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
    calcSign: ['%', '×', '÷', '+', '-'],
    number: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    resultSign:'=',
    // 点击的值
    clickValue:'',
    showValue:'',
    // 计算结果
    result:'',
    // '=' 前的一串数字和计算符
    resultStr:'',
    // 是否清空显示框
    clear:false,
    // 是否显示结果
    showResult:false,
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
      showValue: this.data.showValue + e.target.id,
    })
    this.dealUserInput()
  },
  //用户点击的是否是calcSign数组里的符号
  isSign:function(sign){
    if(this.data.calcSign.indexOf(sign) === -1){
      return false
    }else{
      return true
    }
  },
  // 用户点击的是否是数字
  isNumber:function(sign){
    if (this.data.number.indexOf(sign) === -1) {
      return false
    }else{
      return true
    }
  },
  isPrioritySign:function(sign){
    if(this.data.calcSign.slice(0,3).indexOf(sign) === -1){
      return false 
    }else{
      return true
    }
  },
  dealUserInput:function(){
    let clickValue = this.data.clickValue
    let showValue = this.data.showValue
    let length = showValue.length
    // 倒数第二个显示的字符
    let lastButOne = showValue.slice(-2,-1)
    let first = showValue.slice(0,1)

    if (clickValue === 'C') {
      this.setData({
        showValue: '',
        resultStr:''
      })
    } else if (clickValue === '←') {
      this.setData({
        showValue: showValue.slice(0,length - 2)
      })
    }else if(this.isSign(lastButOne)&&this.isSign(clickValue)){
      this.setData({
        showValue: showValue.slice(0, length - 2) + clickValue
      })
    }else if (this.isSign(lastButOne) && clickValue === '='){ 
      // 如果用户点击了类似 234+= 的情况，那么呈现的结果为234
      this.setData({
        showValue:showValue.slice(0,length -2),
        resultStr:showValue.slice(0,length-1),
        result: showValue.slice(0, length - 2),
        showResult:true,
        clear:true
      })
    }else if(this.data.clear){
      this.setData({
        showValue:'' + clickValue,
        result:'',
        clear:false
      })
    } else if ((lastButOne === '' || (length === 2 && this.isSign(lastButOne))) && clickValue === '=') {
      // 如果一开始就点=，则报错
      // 如果showValue长度为2，第一个为计算符号，第二个为=号，也报错
      this.setData({
        showValue: '错误'
      })
    } else if (showValue.slice(0, length - 1) === '错误') {
      // 如果显示屏上显示错误时，点击再次时按重新输入来算
      this.setData({
        showValue: '' + clickValue
      })
    } else if(this.isPrioritySign(first) && clickValue === '='){
      //如果第一个 是计算符 * / % ，那么最后计算的结果将报错
      this.setData({
        showValue:'错误'
      })
    }else if(clickValue === '='){
      //如果用户点击了=号就开始计算

    }
  },
  calculate:function(str){

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})