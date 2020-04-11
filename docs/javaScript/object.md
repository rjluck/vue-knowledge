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

```js
console.log(Math.PI);//一个属性 圆周率
console.log(Math.max(1,99,3));//99
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

### 日期对象
### 数组对象
### 字符串对象





