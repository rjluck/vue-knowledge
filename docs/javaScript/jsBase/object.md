# 对象

[[toc]]

## 定义

在`JavaScript`中,对象是一组无序的相关属性和方法的集合，所有的事物都是对象，例如字符串、数值、数组、函数等。

对象是由**属性**和**方法**组成的。

- 属性:事物的**特征**，在对象中用**属性**来表示(常用名词)
- 方法:事物的**行为**，在对象中用**方法**来表示(常用动词)

### 为什么需要对象

保存一个值时，可以使用**变量**，保存多个值(一组值)时，可以使用数组。如果要保存一个人的完整信息呢?

JS中的对象表达结构更清晰，更强大。


## 创建对象的三种方式

在`JavaScript`中，现阶段我们可以采用三种方式创建对象(Object):

- 利用**字面量**创建对象

对象字面量:就是花括号`{}`里面包含了表达这个具体事物(对象)的属性和方法。

(1)里面的属性或者方法我们采取**键值对**的形式 **键** 属性名: **值**:属性值

(2)多个属性或者方法中间用`,`隔开

(3)方法冒号后面跟的是一个匿名函数
```js
var obj = {}

var obj1 = {
    username:'哈哈哈哈',
    age:18,
    sex:'女',
    sayHi:function(){
        console.log('hi~')
    }
}
```

### 对象的调用

(1)调用对象的属性方式1：**对象名.属性名**

(2)调用对象的属性方式2：**对象名['属性名']**

(2)调用对象的方法：**对象名.方法名()**
```js
var obj = {
    username:'哈哈哈哈',
    age:18,
    sex:'女',
    sayHi:function(){
        console.log('hi~')
    }
}
console.log(obj.username);//哈哈哈哈
console.log(obj['age']);//18
obj.sayHi();
```

### 变量、属性、函数、方法的区别

- 变量:单独声明赋值,单独存在
- 属性:对象里面的变量称为属性,不需要声明,用来描述该对象的特征
- 函数:单独存在的,通过"函数名()"的方式就可以调用
- 方法:对象里面的函数称为方法,方法不需要声明,使用"对象.方法名()"的方式就可以调用,方法用来描述该对象的行为和功能。

变量和属性是相同的，他们都是用来存储数据的
```js
var num = 10;
var obj ={
    age:18
}
```

函数和方法都是实现某种功能
```js
var num = 10;
var obj ={
    age:18,
    fn:function(){//方法

    }
}
obj.fn();

function fn(){ //函数
        
}

fn();
```

- 利用**new Object**创建对象

(1)利用`=`赋值的方法，添加对象的属性和方法

(2)每个属性和方法之间用`;`隔开
```js
var obj = new Object();//创建了一个空的对象

obj.username = '李四';
obj.age = 18;
obj.sex = '男';
obj.sayHi = function(){
    console.log('hi~')
}
```

- 利用**构造函数**创建对象

就是因为前面两种创建方式，一次只能创建一个对象。

避免代码冗余，我们可以利用函数的方法，重复这些相同的代码。我们就把这个函数称为**构造函数**。

构造函数就是把我们对象里面一些相同的属性和方法抽象处理封装到函数里面

>构造函数里面封装的是对象,普通函数封装的是普通代码

### 构造函数

是一种特殊的函数,主要用来初始化对象，即为对象成员变量赋初始值，它总与`new`运算符一起使用。我们可以把对象中一些公共的属性和方法抽取出来，然后封装到这个函数里面。

语法结构:
```js
function 构造函数名(){
    this.属性 = 值;
    this.方法 = function(){

    }
}

new 构造函数名();//调用构造函数
```

(1)构造函数名字首字母要大写

(2)构造函数不需要`return`就可以返回结果

(3)调用构造函数，必须使用`new`

(4)属性和方法前必须添加`this`



eg:
```js
function Star(name,age,sex){
    this.name = name;
    this.age = age;
    this.sex = sex;
    this.sing = function(sang){
        console.log(sang);
    }
}

var ldh = new Star('刘德华',18,'男');//调用构造函数，返回的是一个对象
console.log(typeof ldh);//object
console.log(ldh.name);//刘德华      
console.log(ldh['age']);//18
ldh.sing('冰雨');//冰雨


var zxy = new Star('张学友',19,'男');//调用构造函数，返回的是一个对象
console.log(typeof zxy);//object
console.log(zxy.name);//张学友      
console.log(zxy['age']);//19
```


### 构造函数和对象

- 构造函数，如`Stars()`,抽象了对象的公共部分,封装到了函数里面,它泛指某一大类(`class`)

- 创建对象,如`new Stars()`,特指某一个,通过`new`关键字创建对象的过程我们也称为对象实例化



## new 关键字执行过程

(1) `new`构造函数可以在内存中创建了一个空的对象

(2) `this`就会指向刚才创建的空对象

(3) 执行构造函数里面的代码,给这个空对象添加属性和方法

(4) 返回这个对象


## 遍历对象


`for...in`语句用于对数组或者对象的属性进行循环操作。

语法格式:
```js
for(变量 in 对象){

}
```

eg:
```js
var obj = {
    name:'嘻小佳',
    age:18,
    sex:'女'
}

for(var k in obj){
    console.log(k);//k 变量 得到的是属性名 name age sex
    console.log(obj[k]);//obj[k] 得到的是 属性值
}
```

注意:

(1) 我们使用 `for in`里面的变量，通常用`k`或者`key`



## 内置对象

- `JavaScript`中的对象分为3种:自定义对象、内置对象、浏览器对象
- 前面两种对象是JS基础内容,属于ECMAScript;第三个浏览器对象属于我们JS独有的，JS API讲解。
- **内置对象**就是指JS语言自带的一些对象,这些对象供开发者使用，并提供了一些常用的或是最基本的而必要的功能(属性和方法)
- 内置对象最大的优点就是帮助我们快速开发
- JS提供了多个内置对象:Math、Date、Array、String等


### 查文档

学习一个内置对象的使用，只要学会其常用成员的使用即可，可以通过查文档学习，可以通过MDN/W3C来查询。

MDN: 

https://developer.mozilla.org/zh-CN/

https://developer.mozilla.org/zh-CN/docs/Web/HTTP


### Math对象

Math对象,不是一个构造函数,所以我们不需要`new`来调用,而是直接使用里面的属性和方法即可。


- Math.PI  圆周率
- Math.floor() 向下取整
- Math.ceil()  向上取整
- Math.round() 四舍五入,就近取整
- Math.abs()  绝对值
- Math.max()  最大值
- Math.min()  最小值
- Math.random()  随机数方法

```js
console.log(Math.PI);//一个属性 圆周率
console.log(Math.max(1,99,3));//99
console.log(Math.abs(1));//1
console.log(Math.floor(1.1));//1
console.log(Math.floor(1.9));//1
console.log(Math.ceil(1.1));//2
console.log(Math.ceil(1.9));//2

//Math.round 其它数字都是4舍5入,但是.5特殊,往大了取
console.log(Math.round(-1.5));//-1
console.log(Math.round(1.1));//1
console.log(Math.round(1.5));//2
console.log(Math.round(-1.1));//-1

//Math.random()
console.log(Math.random());
//我们想要得到两个数之间的随机整数,并且包含这两个整数
function getRandom(min,max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
console.log(getRandom(1,10));//1到10之间且包含1和10的随机整数

//随机点名
var arr  = ['张三','李四','王五']
console.log(arr[getRandom(0,arr.length - 1)])
```

eg:利用对象封装自己的数学对象,里面有PI最大值和最小值
```js
var myMath = {
    PI:3.141592653,
    max:function(){
        var max = arguments[0];
        for(var i = 1;i < arguments.length; i++){
            if(arguments[i] > max){
                max = arguments[i];
            }
        }
        return max
    },
     min:function(){
        var min = arguments[0];
        for(var i = 1;i < arguments.length; i++){
            if(arguments[i] <  min){
                min = arguments[i];
            }
        }
        return min
    }
}

console.log(myMath.PI);
console.log(myMath.max(1,5,9));//9
console.log(myMath.min(1,5,9));//1
```

eg:
```js
function getRandom(min,max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
var random  = getRandom(1,10);
while(true){
    var num = prompt('你来猜? 输入1~10之间的一个数字');
    if(num > random){
        alert('猜大了')
    }else if(num < random){
         alert('猜小了')
    }else{
         alert('猜对了');
         break;//退出整个循环结束程序
    }
}
```


### 日期对象

`Date()` 日期对象，是一个构造函数,必须使用`new`来调用创建日期对象

```js
var arr = new Array();//创建一个数组对象
var obj = new Object();//创建了一个对象实例

//使用Date
/*
1.如果没有参数,返回当前系统的当前时间
2.参数的常用写法  (1)数字型 2019,10,1  (2)字符串型 '2019-10-01 8:8:8'或'2019/5/1'
*/
var date = new Date();//获取当前时间
console.log(date);//当前日期

var date1 = new Date(2019,10,1);
console.log(date1);// 返回的是11月  不是 10月

var date2 = new Date('2019-10-1 8:8:8');
console.log(date2);//返回的是10月
```

- `Date`对象和`Math`对象不一样,他是一个构造函数,所以我们需要实例化后才能使用
- `Date`实例用来处理日期和时间

**日期格式化**

方法名 | 说明 | 代码
---|---|---
getFullYear() | 获取当年 | dObj.getFullYear()
getMonth() | 获取当月(0-11) | dObj.getMonth() 
getDate() | 获取当天日期 | dObj.getDate() 
getDay() | 获取星期几(周日0 到周六6) | dObj.getDay() 
getHours() | 获取当前小时 | dObj.getHours() 
getMinutes() | 获取当前分钟 | dObj.getMinutes() 
getSeconds() | 获取当前秒钟 | dObj.getSeconds() 

```js
//格式化日期 年月日
var date = new Date();
console.log(date.getFullYear());//返回当前日期的年 2020
console.log(date.getMonth() + 1);//返回当前日期的月份 
console.log(date.getDate());//返回当前日期的日
console.log(date.getDay());//返回当前是周几，周日返回的是0哦

var year = date.getFullYear();
var month = date.getMonth();
var dates = date.getDate();
var arr = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六']
var day = date.getDay();
console.log('今天是' + year + '年' + month + '月' + dates + '日' + arr[day])
```

```js
//格式化日期 时分秒
var date = new Date();
console.log(date.getHours());//返回当前 时
console.log(date.getMinutes());//返回当前 分钟
console.log(date.getSeconds());//返回当前 秒数

//要求封装一个函数返回当前的时分秒
function getTime(){
    var time = new Date();
    var h = time.getHours();
    h = h  < 10 ? '0'+ h :h;
    var m = time.getMinutes();
    m = m  < 10 ? '0'+ m :m;
    var s = time.getSeconds();
    s = s  < 10 ? '0'+ s :s;
    return h + ':' + m + ':' + s
}
console.log(getTime())
```

**获取日期的总的毫秒形式**

`Date`对象是基于1970年1月1日(世界标准时间)起的毫秒数。

计算机起始时间从1970年开始。

获取`Date`总的毫秒数(时间戳),不是当前时间的毫秒数，而是距离1970年1月1日过了多少毫秒。

- 方式1:通过 `valueOf()`
- 方式2:通过 `getTime()`
- 方式3:通过 `+`
- 方式4:通过 `Date.now()`
```js
var date = new Date();

console.log(date.valueOf());
console.log(date.getTime());
//简单的写法，也是最常用的写法
var date1 = +new Date();//+new Date()  返回的就是总的毫秒数
console.log(date1)
//H5 新增的 获得总的毫秒数
console.log(Date.now())
```

eg:倒计时

核心算法:

- 输入的时间减去现在时间就是剩余的时间，即倒计时。但是不能拿着时分秒相减，比如05分减去25分，结果会是负数。
- 用时间戳来做。用户输入时间总的毫秒数减去现在时间总的毫秒数，得到的就是剩余时间的毫秒数。
- 把剩余时间总的毫秒数转换为天、时、分、秒(时间戳转换为时分秒)

转换公式：

- d = parseInt(总秒数/60/60/24); //计算天数
- h = parseInt(总秒数/60/60%24);//计算小时
- m = parseInt(总秒数/60%60);//计算分钟
- s = parseInt(总秒数%60);//计算当前秒数

eg:
```js
function countDown(time){
    var nowTime = +new Date(); //返回的是当前时间总的毫秒数
    var inputTime = +new Date(time);//返回的是用户输入时间总的毫秒数
    var times = (inputTime - nowTime)/1000; //times剩余时间总的秒数

    var d = parseInt(times/60/60/24);//天
    d = d < 10? '0'+ d :d;
    var h = parseInt(times/60/60%24);//时
    h = h < 10? '0'+ h :h;
    var m = parseInt(times/60%60);//分
    m = m < 10? '0'+ m :m;
    var s = parseInt(times%60);//秒
    s = s < 10? '0'+ s :s;
    return d + '天' + h + '时' + m + '分' + s + '秒'
}

console.log(countDown('2020-5-1 18:00:00'))
```


### 数组对象

#### 1.创建数组对象的两种方式

- 字面量方式
```js
var arr = [1,2,3]
console.log(arr[0]);//1
```
- new Array()
```js
var arr1 = new Array(2);//这个2 表示数组的长度为2 里面有2个空的数组元素
console.log(arr1)

var arr2 = new Array(2,3);//等价于 [2,3]
console.log(arr2);//[2,3]
```

#### 2.检测是否为数组

- instanceof 运算符
```js
var arr = [];
var obj = {};
console.log(arr instanceof Array);//true
console.log(obj instanceof Array);//false
```

- Array.isArray(参数)   H5新增的方法  ie9以上支持
```js
var arr = [];
var obj = {};
console.log(Array.isArray(arr));//true
console.log(Array.isArray(obj));//false
```
#### 3.添加删除数组元素的方法

方法 | 说明 | 返回值
---|---|---
push(参数1...) | 末尾添加一个或多个元素,注意修改原数组 | 返回新数组的长度
pop() | 删除数组最后一个元素,把数组长度减1,无参数,修改原数组 | 返回它删除的元素的值
unshift(参数1...) | 向数组开头添加一个或多个元素,注意修改原数组 | 返回新数组的长度
shift() | 删除数组第一个元素,把数组长度减1,无参数,修改原数组 | 返回它删除的元素的值

```js
var arr = [1,2,3];
arr.push(4,'pink')
console.log(arr.push(4,'pink'));//5
console.log(arr);//[1,2,3,4,'pink']
```
```js
var arr = [1,2,3];
arr.unshift('red')
console.log(arr.unshift('red'));//4
console.log(arr);//['red',1,2,3']
```
```js
var arr = [1,2,3];
arr.pop()
console.log(arr.pop());//3
console.log(arr);//[1,2]
```

```js
var arr = [1,2,3];
arr.shift()
console.log(arr.shift());//1
console.log(arr);//[2,3]
```

#### 4.数组排序

方法 | 说明 | 是否修改原数组
---|---|---
reverse() | 颠倒数组中元素的顺序 | 该方法会改变原来的数组,返回新数组
sort() | 对数组的元素进行排序 | 该方法会改变原来的数组,返回新数组

翻转数组
```js
var arr = ['pink','red','blue']
arr.reverse()
console.log(arr);//['blue','red','pink']
```

数组排序(冒泡排序)

个位数好用，多位数需要传参

```js
var arr = [3,4,7,1];
arr.sort();
console.log(arr);//[1,3,4,7]

var arr1 = [13,4,77,1,7];
arr1.sort();
console.log(arr1);//[1,13,4,7,77]


var arr2 = [13,4,77,1,7];
arr2.sort(function(a,b){
    return a - b;//升序的顺序排列
    //return b - a;//降序的顺序排列
});
console.log(arr2);//[1,4,7,13,77]
```

#### 5.数组索引方法

方法 | 说明 | 返回值
---|---|---
indexOf() | 数组中查找给定元素的第一个索引 | 如果存在返回索引号,如果不存在,则返回-1
lastIndexOf() | 在数组中的最后一个的索引 | 如果存在返回索引号,如果不存在,则返回-1

```js
var arr = ['red','green','blue','pink'];
console.log(arr.indexOf('blue'));//2
//只返回第一个满足条件的索引号
var arr = ['red','green','blue','pink','blue'];
console.log(arr.indexOf('blue'));//2
console.log(arr.indexOf('black'));//-1
```

```js
var arr = ['red','green','blue','pink'];
console.log(arr.lastIndexOf('blue'));//2
//只返回最后一个满足条件的索引号
var arr = ['red','green','blue','pink','blue'];
console.log(arr.lastIndexOf('blue'));//4
console.log(arr.lastIndexOf('black'));//-1
```

eg:数组去重(重点案例)

要求去除数组`['c','a','z','a','x','a','x','c','b']`中重复的元素。

核心算法:我们遍历旧数组,然后拿着旧数组元素去查询新数组，如果该元素不在新数组中，则添加。否则不添加。

利用新数组`indexOf(数组元素)`，如果返回是`-1`就说明新数组里面没有该元素。

旧数组`['c','a','z','a','x','a','x','c','b']`

新数组`[]`

```js
//封装一个去重的函数  unique 
function unique(arr){
    var newArr = [];
    for(var i = 0; i<arr.length;i++){
        if(newArr.indexOf(arr[i]) === -1){
            newArr.push(arr[i])
        }
    }
    return newArr;
}

var demp = unique(['c','a','z','a','x','a','x','c','b']);//['c','a','z','x','b']
```

#### 6.数组转换为字符串

方法 | 说明 | 返回值
---|---|---
toString() | 把数组转换成字符串,逗号分隔每一项 | 返回一个字符串
join('分隔符') | 方法用于把数组中的所有元素转换为一个字符串 | 返回一个字符串

```js
//toString() 将数组转换为字符串
var arr = [1,2,3];
console.log(arr.toString());//1,2,3
```
```js
//join(分隔符) 将数组转换为字符串
var arr = ['green','blue','pink'];
console.log(arr.join());//green,blue,pink
console.log(arr.join('-'));//green-blue-pink
```

#### 6.数组其它方法

方法 | 说明 | 返回值
---|---|---
concat() | 连接两个或多个数组 | 返回一个新的数组
slice() | 数组截取slice(begin,end) | 返回被截取项目的新数组
splice() | 数组删除splice(第几个开始,要删除的个数) | 返回被删除项目的新数组,注意，这个会影响到原数组

> slice() 和 splice() 目的基本相同，建议重点看下splice()






### 字符串对象

#### 1.基本包装类型

```js
var  str = 'andy';
console.log(str.length);
```
对象才有属性和方法,复杂数据类型才有属性和方法

简单数据类型为什么会有`length`属性呢?

为了方便操作基本数据类型,JavaScript还提供了三个特殊的引用类型:

- String
- Number
- Boolean

基本包装类型:就是把简单数据类型包装称为了复杂数据类型,这样基本数据类型就有了属性和方法。

其执行过程：
```js
//1.生成临时变量,把简单类型包装为复杂数据类型
var temp = new String('andy');
//2.赋值给我们声明的字符变量
str = temp;
//3.销毁临时变量
temp = null;
```

#### 2.字符串的不可变

指的是里面的值不可变,虽然看上去可以改变内容,但其实是地址变了,内存中新开辟了一个内存空间。

```js
var str = 'abc';
str = 'hello';
/*
1.当重新给str赋值的时候,常量'abc'不会被修改,依然在内存中
2.重新给字符串赋值,会重新在内存中开辟空间,这个特点就是字符串的不可变
3.由于字符串的不可变,在大量拼接字符串的时候会有效率问题
*/

var str = '';
for(var i = 0; i< 100000;i++){
    str += i;
}
console.log(str);//这个结果需要花费大量时间来显示,因为需要不断开辟新的空间
```

#### 3.根据字符串返回位置 

字符串所有的方法,都不会修改字符串本身(字符串是不可变的),操作完成会返回一个新的字符串。

方法 | 说明 
---|---
indexOf('要查找的字符',开始的位置) | 返回指定内容在原字符串中的位置，如果找不到就返回-1,开始的位置是index索引号
lastIndexOf() | 从后往前找，只找第一个匹配的

```js
var str = '又是开心的一天';
console.log(str.indexOf('开'));//2
```

eg:返回字符位置

查找字符串'abcoefoxyozzopp'中所有o出现的位置以及次数

```js
var str = "abcoefoxyozzopp";
var index = str.indexOf('o');
var num = 0;
console.log(index);

while(index !== -1){
    console.log(index);
    num++;
    index = str.indexOf('o',index+1)
}
console.log('o出现的次数是:',+ num);//4
```

#### 3.根据位置返回字符串(重点) 

方法 | 说明 | 使用
---|--- |---
charAt(index) | 返回指定位置的字符(index字符串的索引号) | str.charAt(0)
charCodeAt(index) | 获取指定位置处字符的ASCII码(index索引号) | str.charCodeAt(0)
str[index] | 获取指定位置处字符 | HTML5,IE8+支持和charAt()等效

charAt
```js
var str = 'andy';
console.log(str.charAt(3));//y
//遍历所有的字符
for(var i = 0;i < str.length;i++){
    console.log(str.charAt(i));
}
```

charCodeAt

返回相应索引号字符ASCII值，目的就是判断用户按下了哪个键
```js
var str = 'andy';
console.log(str.charCodeAt(0));//97
```

str[index]
```js
var str = 'andy';
console.log(str[0]);//a
```

eg:返回字符位置

判断一个字符串'abcoefoxyozzopp'中出现次数最多的字符,并统计其次数。
```js
var str = 'abcoefoxyozzopp';
var o = {};
for(var i = 0; i < str.length; i++){
    var chars = str.charAt(i);//chars是字符串的每一个字符
    if(o[chars]){
        o[chars]++;
    }else{
       o[chars] = 1; 
    }
}

//遍历对象
var max = 0;
var ch = '';
for(var k in o){
    //k得到的是属性名
    //o[k] 得到的是属性值
    if(o[k] > max){
        max = o[k];
        ch = k;
    }
}
console.log(max)
console.log('最多的字符是:'+ch)
```

#### 4.字符串操作方法(重点) 

方法 | 说明 
---|---
concat(str1,str2,str3...) | 用于连接两个或多个字符串。拼接字符串，等效于`+`,`+`更常用
substr(start,length) | 从`start`位置开始(索引号),`length`取的个数
slice(start,end) | 从`start`位置开始,截取到`end`位置,`end`取不到
substring(start,end) | 从`start`位置开始,截取到`end`位置,`end`取不到,基本和`slice`相同,但是不接受负值。

concat
```js
var str = 'andy';
console.log(str.concat('red'));//andyred
```

substr(start,length)
```js
var str = 'andy';
console.log(str.substr(0,2));//an
```


#### 5.字符串其它方法

- replace('被替换的字符','替换为的字符')
```js
var str = 'andy';
//a替换为b
console.log(str.replace('a','b'));//bndy

var str1 = 'andyandy';
//a替换为b,只会替换第一个字符
console.log(str1.replace('a','b'));//bndyandy
```

eg:有一个字符串`'abcoefoxyozzopp'`,要求把里面所有的`o`替换为`*`。

```js
var str = 'abcoefoxyozzopp';
while(str.indexOf('o') !== -1){
    str = str.replace('o','*');
}
console.log(str);//abc*ef*xy*zz*pp
```

- split('分隔符') 字符串转换为数组
```js
var str = 'red,pink,blue';
console.log(str.split(','));//['red','pink','blue']
var str1 = 'red&pink&blue';
console.log(str1.split('&'));//['red','pink','blue']
```

> join 把数组转为字符串

- toUpperCase()   转换大写

- toLowerCase()   转换小写
