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
    // 存储用户输入的运算符
    signArray:[],
    // 存储运算符所在的下标
    subsArray:[],
    // 存储用户输入的待运算的数字
    numberArray:[],
    // 点击的值
    clickValue:'',
    showValue:'',
    // 计算结果
    result:'',
    // '=' 前的一串数字和计算符
    resultStr:'',
    lastResultStr:'',
    // 是否显示结果
    showResult:false,
  },
  // 点击时改变显示的值
  userClick:function(e){
    // 如果是计算出结果后再点击,那么上排就显示上次得到的结果
    if (this.data.showResult){
        this.setData({
          clickValue: e.target.id,
          showResult: false,
          lastResultStr:this.data.resultStr,
          resultStr: this.data.result,
          showValue: '' + e.target.id,
        })
    } 
    // 如果还没显示结果
    else {
      this.setData({
        clickValue: e.target.id,
        showValue: this.data.showValue + e.target.id,
        showResult: false
      })
    }
    // 如果开始显示错误，那么再次点击后，showValue为点击的值
    if (this.data.showValue.slice(0,2) === '错误') {
      this.setData({
        showValue: '' + this.data.clickValue
      })
    }
    this.dealUserInput()
  },
  //用户点击的是否是运算符
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
  // 是否为具有优先级的符号，包括 * / %
  isPrioritySign:function(sign){
    if(this.data.calcSign.slice(0,3).indexOf(sign) === -1){
      return false 
    }else{
      return true
    }
  },
  // 判断是否是普通的符号 包括 + -
  isOrdinarySign:function(sign){
    if (this.data.calcSign.slice(3, 5).indexOf(sign) === -1){
      return false
    }else{
      return true
    }
  },
  // 判断两个符号是否具有一样的优先级
  isSamePriority:function(signF,signS){
    if ((this.isPrioritySign(signF) && this.isPrioritySign(signS)) || (this.isOrdinarySign(signF)&& this.isOrdinarySign(signS))){
      return true
    }else{
      return false
    }
  },
  // 处理用户输入
  dealUserInput:function(){
    // console.log(this.data.showValue)
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
      // 如果是计算出结果后再点击 ← ，那么上排置为空，下排为上一次的计算字符串
      if(this.data.showValue.slice(0,2) === '错误'){
        this.setData({
          showValue:''
        })
      }else if(this.data.lastResultStr){
        this.setData({
          showValue:'' + this.data.lastResultStr,
          resultStr:'',
          lastResultStr:''
        })
      }else{
        console.log(1)
          this.setData({
          showValue: showValue.slice(0, length - 2)
        })
      }
    }else if(this.isSign(lastButOne)&&this.isSign(clickValue)){
      // 如果用户点击两个连续的运算符，则显示后一个
      this.setData({
        showValue: showValue.slice(0, length - 2) + clickValue
      })
    }else if (length >2 && this.isSign(lastButOne) && clickValue === '='){ 
      console.log(1)
      // 如果用户点击了类似 234+= 的情况，那么呈现的结果为234
      this.setData({
        showValue:showValue.slice(0,length -2),
        resultStr:showValue.slice(0,length-1),
        result: showValue.slice(0, length - 2),
        showResult:true,
      })
    }else if ((length === 1 && clickValue === '=') || (this.isSign(lastButOne) && clickValue === '=') || this.isPrioritySign(first) && clickValue === '=' || (showValue.slice(0,2) === '错误' && clickValue === '=') || (this.data.showResult && clickValue === '=')) {
      // 如果一开始就点=，则报错
      // 如果showValue长度为2，第一个为计算符号，第二个为=号，也报错
      this.setData({
        showValue: '错误',
      })
    }else if(clickValue === '='){
      //如果用户点击了=号就开始计算
      this.calculate(showValue.slice(0,length-1))
      console.log(this.data)
    }
  },
  // 提取用户输入串中的 运算符、数
  extractUserInput:function(str){
    let array = str.split('')
    // 运算符
    let signArray = []
    // 待计算的数
    let numberArray = []
    // 运算符所在的下标,用于提取带计算的数
    let subs = []
    array.forEach((item, index) => {
      if (this.isSign(item)) {
        signArray.push(item)
        subs.push(index)
      }
    })
    subs.forEach((item, index) => {
      if (index === 0) {
        numberArray.push(str.slice(0, item))
      } else if (index < subs.length) {
        numberArray.push(str.slice(subs[index - 1] + 1, item))
      }
    })
    numberArray.push(str.slice(subs[subs.length - 1] + 1, array.length))
    this.setData({
      numberArray:numberArray,
      subsArray:subs,
      signArray:signArray
    })
  },
  judgeAndCal:function(sign,x,y){
    switch(sign){
      case '+':
        return x + y
        break
      case '-':
        return x - y
        break
      case '%':
        return x % y
        break
      case '×':
        return x * y
        break
      case '÷':
        return x / y
        break
    }
  },
  // 计算
  calculate:function(str){
    this.extractUserInput(str)
    let number = this.data.numberArray
    let subs = this.data.subsArray
    let sign = this.data.signArray
    for(let i = sign.length ; i >= 0; i--){
        // 优先级相同 或着 第一个运算符比第二个运算符优先级大  ,那么先计算第一个运算符
        if ((this.isSamePriority(sign[0], sign[1])) || (this.isPrioritySign(sign[0]) && this.isOrdinarySign(sign[1]))) {
          let value = this.judgeAndCal(sign[0], parseFloat(number[0]), parseFloat(number[1]))
          // 删除数组的j开始的两个元素，并插入新的结果
          sign.splice(0, 1)
          number.splice(0, 2)
          number.splice(0, 0, value)
        }
        // 第二个运算符优先级更大 则先计算第二个运算符
        else if (this.isPrioritySign(sign[1]) && this.isOrdinarySign(sign[0])) {
          let value = this.judgeAndCal(sign[1], parseFloat(number[1]), parseFloat(number[2]))
          // 删除数组的j+1开始的两个元素，并插入新的结果
          sign.splice(1, 1)
          number.splice(1, 2)
          number.splice(1, 0, value)
        }
    }
    this.setData({
      result: this.judgeAndCal(sign[0], parseFloat(number[0]), parseFloat(number[1])),
      showResult:true,
      resultStr:this.data.showValue.slice(0,this.data.showValue.length - 1),
      // showValue:''
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})