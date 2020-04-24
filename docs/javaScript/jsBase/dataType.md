# 数据类型

[[toc]]

## 数据类型简介

### 1.为什么需要数据类型

在计算机，不同的数据所需占用的存储空间是不同的，为了便于把数据分成所需内存大小不同的数据，充分利用存储空间，于是定义了不同的数据类型。

### 2.变量的数据类型

变量是用来存储值的所在处，它们有名字和数据类型。变量的数据类型决定了如何将代表这些值的位存储到计算机的内存中**JavaScript是一种弱类型或者说动态语言。**这意味着不用提前声明变量的类型，在程序运行过程中，类型会被自动确定(根据等号右边的值来确定的)。
```js
var age = 8; //数字类型
var name = 'hhh'; //字符串类型
```
在代码运行时，变量的数据类型是由JS引擎根据=右边变量值的数据类型来判断的，运行完毕之后，变量就确定了数据类型

JavaScript拥有动态类型，同时也意味着相同的变量可用作不同的类型。
```js
var r = 8; //数字类型
r = 'hhh'; //字符串类型
```



## 数据类型的分类

JS把数据类型分为两类：

- 简单数据类型(Number、String、Boolean、Undefined、Null)

简单数据类型 | 说明 | 默认值
---|--- |---
Number | 数字型，包含 整型值和浮点值（小数），如21、0.21 | 0
String | 字符串类型，如"李四",注意js里面,字符串都推荐使用单引号 | false
Boolean | 布尔值类型,如true,false,等价于1和0 | ""
Undefined | var a;声明了变量a但是没有赋值，此时a=undefined | undefined
Null | var a = null;声明了变量a为空值 | null

- 复杂数据类型(Object)

### 1.Number

**(1)数字型进制**

最常见的进制有二进制、八进制、十进制、十六进制
```js
//1.八进制数字序列范围：0~7(逢8进1)
//程序里面数字前面加0 表示八进制
var num1 = 07; //对应十进制的7
var num2 = 012; //对应十进制的10
var num3 = 010; //对应十进制的8
//2.十六进制数字序列范围：0~9以及A~F(逢16进1)
//程序里面数字前面加0x 表示十六进制
var num = 0x9 //对应十进制的9
var num = 0xA //对应十进制的10
```
**(2)数字型范围**

JavaScript中数值的最大值和最小值

```js
console.log(Number.MAX_VALUE);//数值型的最大值  1.7976931348623157e+308
console.log(Number.MIN_VALUE);//数值型的最小值  5e-324
```
**(3)数字型三个特殊值**
- Infinity,无穷大，大于任何数值
- -Infinity，代表无穷小，小于任何数值
- NaN, Not a number,代表一个非数值

```js
alert(Infinity); //Infinity
alert(-Infinity); //-Infinity
alert(NaN); //NaN
console.log('www'-100); //NaN
```

**(4)isNaN**

`isNaN()`这个方法用来判断非数字,返回false则为数字，返回true则不是数字
```js
console.log(isNaN(12));//false
```

### 2.String

**(1)JS中推荐使用单引号**

字符串型可以是引号中的任意文本，其语法为双引号和单引号。

**(2)字符串转义符**

类似HTML里面的特殊字符,字符串中也有特殊字符，我们称之为转义符。
转义符都是\开头的，常用的转义符及其说明如下：

转义符 | 解释说明 
---|--- 
\n | 换行符，n是newline的意思
\\ | 斜杠\
\' | ' 单引号
\" | ” 双引号 
\b | 空格，b是blank的意思
\t | tab缩进 

**(3)字符串长度**

字符串是由若干字符组成的，这些字符的数量就是字符串的长度。通过字符串的length属性可以获取整个字符串的长度。
```js
let str ='my name';
console.log(str.length); //7
```

**(4)字符串拼接**

- 多个字符串之间可以使用`+`进行拼接，其拼接方式为`字符串+任何类型 = 拼接之后的新字符串`
- 拼接前会把字符串相加的任何类型转成字符串，再拼接成一个新的字符串。
```js
console.log('沙漠' + '骆驼'); //沙漠骆驼 
```


### 3.Boolean & Undefined & Null

undefined和数字相加最后的结果是NaN

null和数字相加得到的结果是数字

undefined、null和字符串相加保持拼接状态
```js
var aa; //undefined
console.log('你好'+aa); //你好undefined
console.log(11+aa); //NaN
console.log(true+aa); //NaN
var nu = null;
console.log('你好'+nu); //你好null
console.log(11+nu); //11
console.log(true+nu); //1
```


## 获取变量数据类型

### 1.获取检测变量的数据类型 typeof

```js
var num = 10;
console.log(typeof num); //number
var str = 'pink';
console.log(typeof str); //string
var flag = true;
console.log(typeof flag); //boolean
var nu = undefined;
console.log(typeof nu); //undefined
var timer = null;
console.log(typeof timer); //object
```

### 2.字面量

字面量是在源代码中一个固定值的表示法，通俗来说，就是字面量表示如何表达这个值。
- 数字字面量：8,9,10
- 字符串字面量：'程序比人更靠谱'
- 布尔字面量：true，false


## 数据类型转换

### 定义

使用表单、`prompt`获取过来的数据默认是字符串类型的，此时就不能直接简单的进行加减运算，而需要转换变量的数据类型。通俗来说，就是**把一种数据类型的变量转换为另外一种数据类型**。

### 转换方式

- 转换为字符串类型

方式 | 说明 | 案例
---|--- |---
toString() | 转成字符串 | var num = 1; alert(num.toString())
String() 强制转换 | 转成字符串 | var num = 1;alert(String(num))
加号拼接字符串 | 和字符串拼接的结果都是字符串 | var num = 1; alert(num+'')

> toString() 和 String() 使用方式不一样

> 加号拼接字符串转换方式，为隐士转换。推荐。

- 转换为数字型

方式 | 说明 | 案例
---|--- |---
parseInt(string)函数 | 将string类型转换为整数数值型 | parseInt('78')
parseFloat(string)函数 | 将string类型转换为浮点数数值型 | parseFloat('78.21')
Number() 强制转换函数 | 将string类型转换为数值型 | Number('222')
js隐式转换(- * /) | 利用算术运算隐式转换为数值型 |'12'-0

```js
console.log(parseInt('3.14')); //3
console.log(parseInt('120pxww')); //120 会去掉这个px单位
console.log(parseFloat('3.14')); //3.14
console.log(parseFloat('120px')); //120 会去掉这个px单位

var str = '123';
console.log(Number(str)); //123

console.log('12'-0); //12
console.log('12'-'6'); //6
console.log('6'*1); //6
```

- 转换为布尔型

方式 | 说明 | 案例
---|--- |---
Boolean()函数 | 其他类型转成布尔值 | Boolean('true')

- 代表**空、否定的值**会被转换为false,如：`0、NaN、null、undefined`
- 其余值都会转换为true

```js
console.log(Boolean('')); //false
console.log(Boolean(0)); //false
console.log(Boolean(NaN)); //false
console.log(Boolean(null)); //false
console.log(Boolean(undefined)); //false
console.log(Boolean('小白')); //true
console.log(Boolean(12)); //true
```



