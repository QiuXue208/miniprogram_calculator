# miniprogram_calculator

## 介绍

####  学习文档

小程序开发文档 ： https://developers.weixin.qq.com/miniprogram/dev/index.html

####  项目使用

1. 通过 git clone 下载到本地
2. 在开发者工具中打开即可运行

开发者工具地址 ：https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html

####  说明

* 用户输入情况处理 ：
以下为处理用户输入的一些特殊情况
  1. 如果用户输入为 7 = ，那么输出为7
  2. 如果用户输入 7 * = , 7 + = , 7 / = , 7 % = , 7 - = ,那么输出都为7
  3. 如果用户输入为 + 7 = , - 7 =  ,那么输出依次为 7 , -7
  4. 如果用户输入为 * 7 = , / 7 = , % 7 = ,那么输出为 ‘错误’
  5. 如果用户 直接输入 = ，那么 输出为 ‘错误’
  6. 如果输出屏为错误，用户只能再输入数字、回退符号和清空符号
  7. 如过点击 = 号后，结果将显示到下排，上排将显示用户输入的一串待计算的数字和运算符
  8. 如果还未运算出结果，那么点击回退符将删除一个符号
9. 如果已经得出运算结果，这时再点击回退符，那么上排将不显示，下排将显示结果前的一串待计算的数字和运算符

* 运算逻辑
  1. 将用户输入的一串待计算的数字和运算符记录下来，比如 str = 13 + 2 * 8 / 4 % 2 - 52
  2. 提取这一串字符串中的数字和符号保存到两个数组中 sign = ['+' , '*' , '/' , '%' , '-'] , number = [ '13' , '2' , '8' , '4' , '2' , '52']
  3. 循坏。依次比较sign数组的前两个符号的优先级，分为以下两种情况
    * 如果第一个运算符优先级高或者优先级一样 ，就计算number[0]和number[1]的值，这时就删除sign[0]和number[0]、number[1]，并将number[0]和number[1]的插入到number[0]的位置；
    * 否则，就计算number[1]和number[2]的值，并删除sign[1]和number[1]、number[2]，并将number[1]和number[2]的结果插入到number[1]的位置
4. 以str字符串为例，来看看计算流程 
  sign = ['+' , '*' , '/' , '%' , '-']  ,  number = [ '13' , '2' , '8' , '4' , '2' , '52']
  * 第一次比较：*的优先级更大，则2*8=16 , sign = ['+' , '/' , '%' , '-'] ,  number = [ '13' , 16 , '4' , '2' , '52']
  * 第二次比较： /的优先级更大，则16/4=4 , sign = ['+'  , '%' , '-']  ,  number = [ '13' , '4' , '2' , '52']
  * 第三次比较： %的优先级更大，则4%2=0 , sign = ['+'  , '-'] , number = [ '13' , '0' , '52']
  * 第四次比较： 优先级一样，则13+0=13 , sign = [ '-' ] , number = [ '13' , '52']
  * 最后一步，计算 13-52=-39
