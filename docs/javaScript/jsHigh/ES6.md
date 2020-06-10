# ES6

[[toc]]

## ES6简介

### 1.什么是ES6

`ES`的全称是`ECMAScript`,它是由`ECMA`国际标准化组织,制定的一项**脚本语言的标准化规范**

年份 | 版本
---|---
2015年6月 | ES2015
2016年6月 | ES2016
2017年6月 | ES2017
2018年6月 | ES2018
... | ...


### 2.为什么使用ES6

每一次标准的诞生都意味着语言的完整,功能的加强。`JavaScript`语言本身也有一些令人不满意的地方。


## let

### 1.let特性

`ES6`新增用于声明变量的关键字。

- `let`声明的变量只在所处于的块级有效(`{}`大括号中的作用域)

eg:
```js
if (true) {
    var a = 10;
}
console.log('a: ', a);//10
```

```js
if (true) {
    let a = 10;
}
console.log('a: ', a);//a is not defined
```

> 注意：使用let关键字声明的变量才具有块级作用域，使用var声明的的变量不具有块级作用域


- 防止循环变量变成全局变量

eg：
```js
for (var i = 0; i < 3; i++) {

}
console.log('i: ', i);//3
```

eg:
```js
for (let i = 0; i < 3; i++) {

}
console.log('i: ', i);//i is not defined
```

- 不存在变量提升

ES6之前可以先使用变量，再声明，不规范。使用`let`关键字必须先声明再使用。

eg:
```js
console.log('b', b);//undefined
var b = 20;
```

eg：
```js
console.log('a', a);//Cannot access 'a' before initialization
let a = 20;
```


- 存在暂时性死区

在块级作用域里面声明的变量不受外界影响,和这个块级整体绑定。

eg:
```js
var num = 10;
if (true) {
    console.log('num: ', num);//Cannot access 'num' before initialization
    let num = 20;
}
```

eg：
```js
var num = 10;
if (true) {
    console.log('num: ', num);//10
    var num = 20;
    console.log('num: ', num);//20
}
```


### 2.let经典面试题

#### 题目1
```js
var arr = [];
for (var i = 0; i < 2; i++) {
    arr[i] = function () {
        console.log(i)
    }
}
arr[0]();//2
arr[1]();//2
```

此题关键点在于:变量`i`是全局的,函数执行时输出的都是全局作用域下的值。

#### 题目2

`let`具有块级作用域

```js
let arr = [];
for (let i = 0; i < 2; i++) {
    arr[i] = function () {
        console.log(i)
    }
}
arr[0]();//0
arr[1]();//1
```

此题关键点在于:每次循环都会产生一个块级作用域,每个块级作用域终的变量都是不同的，函数执行的输出的是自己上一级(循环产生的块级作用域)作用域下的`i`值。


## const

作用:声明常量,常量就是指(内存地址)不能变化的量。

### 1.const特性

- 具有块级作用域

eg：
```js
if (true) {
    const a = 10;
}
console.log('a: ', a);// a is not defined
```

eg：
```js
if (true) {
    const a = 10;
    console.log('a: ', a);//10
    if (true) {
        const a = 20;
        console.log('a: ', a);//20
    }
}
console.log('a: ', a);// a is not defined
```

- `const`声明常量必须赋值

eg：
```js
const pI;//Missing initializer in const declaration
```

- 常量赋值后，值不能修改

eg:
```js
const pI = 3.14;
pI = 100;//Assignment to constant variable.
```

eg:
```js
const ary = [100, 200];
ary[0] = 'a';
ary[1] = 'b';
//对于复杂数据类型,其内部的值是可以更改的，但是内存地址是不可改的
//没有改变ary内存地址
console.log('ary: ', ary);//["a", "b"]
//改变了ary内存地址，所以报错
ary = ['a', 'b'];//Assignment to constant variable.
```

## let、const、var的区别

- 使用`var`声明的变量,其作用域为**该语句所在的函数内，且存在变量提升现象**
- 使用`let`声明的变量,其作用域为**该语句所在的代码块内，不存在变量提升现象**
- 使用`const`声明的常量,在后面出现的代码中**不能再修改该常量的值**

var | let | const
---|--- |---
函数级作用域 | 块级作用域 | 块级作用域
变量提升 | 不存在变量提升 | 不存在变量提升
值可更改 | 值不可更改 | 值不可更改


## 解构赋值

`ES6`中允许从数组中提取值,按照对应的位置，对变量赋值。对象也可以实现解构。

### 1.数组解构


eg：
```js
let [a, b, c] = [1, 2, 3];
console.log('a: ', a);//1
console.log('b: ', b);//2
console.log('c: ', c);//3
```

如果解构不成功,变量的值为`undefined`

eg：
```js
let [foo] = [];
console.log('foo: ', foo);//undefined
let [bar1, foo1] = [1];
console.log('bar1: ', bar1);//1
console.log(' foo1: ', foo1);//undefined
```

### 2.对象解构

#### 写法1

对象解构允许我们使用变量的名字匹配对象的属性,匹配成功，将对象属性的值赋值给变量

eg:
```js
let person = { name: 'aaa', age: 18 };
let { name, age } = person;
console.log('name: ', name);//aaa
console.log('age: ', age);//18
```

#### 写法2

eg:
```js
let person = { name: 'aaa', age: 18 };
let { name: myName, age: myAge } = person;//myName和myAge属于别名
console.log('myName: ', myName);//aaa
console.log('myAge: ', myAge);//18
```

## 箭头函数

### 1.基本用法

`ES6`中新增的定义函数的方式

格式:
`()=>{}`

`const fn = ()=>{}`


eg：
```js
//箭头函数是用来简化函数定义语法的
const fn = () => {
    console.log(123);
}

fn();//123
```


**函数体重只有一句代码,切代码的执行结果就是返回值，可以省略大括号。**

传统函数定义方式
```js
function sum(num1,num2){
    return num1+num2
}
```

箭头函数的定义方式
```js
const sum = (num1+num2)=>num1+num2
```

**在箭头函数中,如果形参只有一个，形参外侧的小括号也是可以省略的。**

```js
const fn = (v) => {
    console.log(v);
}
fn(20);//20
```

可以简写为

```js
const fn = v => {
    console.log(v);
}
fn(20);//20
```

### 2.箭头函数this

箭头函数不绑定`this`关键字,箭头函数中的`this`,指的是**函数定义位置的上下文this**

eg：
```
const obj = { name: '张三' };
function fn() {
    console.log(this);//{ name: '张三' }
    //箭头函数被定义在了fn函数中，所以箭头函数中的this指向fn中的this
    return () => {
        console.log(this);//{ name: '张三' }
    }
}

const resFn = fn.call(obj);
resFn();
```

### 3.箭头函数面试题

```js
var obj = {
    age: 20,
    //此箭头函数定义在了obj对象里,obj对象不能产生作用域,所以说箭头函数被定义在了全局作用域下
    //调用say方法的时候,this指向的是window,而window对象下没有age,所以undefined
    say: () => {
        console.log(this.age);//undefined
    }
}
obj.say();
```

```js
var age = 18;
var obj = {
    age: 20,
    //此箭头函数定义在了obj对象里,obj对象不能产生作用域,所以说箭头函数被定义在了全局作用域下
    //调用say方法的时候,this指向的是window
    say: () => {
        console.log(this.age);//18
    }
}
obj.say();
```


## 剩余参数


### 1. 剩余参数定义

ES6之前我们通常会使用函数内部的`arguments`,但是箭头函数中使用不了`arguments`。

剩余参数语法允许我们将一个不定数量的参数表示为一个数组。

eg：
```js
function sum(first, ...args) {
    console.log('first: ', first);//10
    console.log('args: ', args);// [20, 30]
}

sum(10, 20, 30);
```

eg:求和
```js
const sum = (...args) => {
    let total = 0;
    // args.forEach((item) => {
    //     total += item;
    // })
    args.forEach(item => total += item);
    return total;
}

sum(10, 20, 30);
console.log('sum(10, 20, 30): ', sum(10, 20, 30));//60
```

### 2. 剩余参数与结构配合使用

剩余参数与结构配合使用

eg:
```js
let students = ['aaa', 'bbb', 'ccc'];
let [s1, ...s2] = students;
console.log('s1: ', s1);//aaa
console.log('s2: ', s2);//["bbb", "ccc"]
```


## 扩展运算符

### 1.Array的扩展方法

#### 扩展运算符

扩展运算符(展开语法)

扩展运算符可以将数组或者对象用逗号分割的参数序列。

```js
let ary = [1, 2, 3];
console.log('...ary: ', ...ary);//1 2 3
//...ary  1, 2, 3
//console.log输出来的没有逗号的原因是,会被当成方法的参数分隔符
console.log(1, 2, 3);//1 2 3
```

#### 扩展运算符的应用

扩展运算符可以应用于**合并数组**

**方法1**

```js
let ary1 = [1, 2, 3];
let ary2 = [4, 5, 6];
let ary3 = [...ary1, ...ary2];
console.log('ary3: ', ary3);// [1, 2, 3, 4, 5, 6]
```

**方法2**

```js
let ary1 = [1, 2, 3];
let ary2 = [4, 5, 6];
ary1.push(...ary2)
console.log('ary1', ary1);// [1, 2, 3, 4, 5, 6]
```


扩展运算符可以应用于**将类数组(伪数组)或可遍历对象转换为真正的数组**

```js
let oDivs = document.getElementsByTagName("div");
console.log('oDivs: ', oDivs);//伪数组
oDivs = [...oDivs]
console.log('oDivs: ', oDivs);//真正的数组
```

将伪数组转换为真正的数组就可以调用数组对象下面的方法了

eg:
```js
oDivs.push('a');
console.log('oDivs: ', oDivs);
```

#### 构造函数方法 Array.from()

**将类数组(伪数组)或可遍历对象转换为真正的数组**

eg:
```js
let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
}
console.log('arrayLike: ', arrayLike);
let arr2 = Array.from(arrayLike)
console.log('arr2: ', arr2);//["a", "b", "c"]
```

该方法还可以接收第二个参数,作用类似于数组的`map`方法,用来对每个元素进行处理,将处理后的值放入返回的数组。

eg:
```js
let arrayLike = {
    '0': 1,
    '1': 2,
    '2': 2,
    length: 3
}
console.log('arrayLike: ', arrayLike);
let arr2 = Array.from(arrayLike)
console.log('arr2: ', arr2);// [1, 2, 2]
// let newArr = Array.from(arrayLike,(item)=>{
//     return item*2
// })
//简写
let newArr = Array.from(arrayLike, item => item * 2)
console.log('newArr: ', newArr);//[2, 4, 4]
```


#### 实例方法 find()

用于找出第一个符合条件的数组成员,如果没有找到,返回`undefined`

eg：
```js
let ary = [{
    id: 1,
    name: 'aaa'
}, {
    id: 2,
    name: 'bbb'
}, {
    id: 2,
    name: 'ccc'
}]

let target = ary.find((item, index) => item.id == 2);
console.log('target: ', target);//{id: 2, name: "bbb"}
let target1 = ary.find((item, index) => item.id == 3);
console.log('target1: ', target1);//undefined
```



#### 实例方法 findIndex()

用于找出第一个符合条件的数组成员的位置,如果没找到返回`-1`

eg：
```js
let ary = [1, 5, 10, 15];
let index = ary.findIndex((value, index) => value > 5)
console.log('index: ', index);//2
```

#### 实例方法 includes()

表示某个数组是否包含给定的值,返回布尔值。

eg：
```js
[1, 2, 3].includes(2);//true
console.log('[1, 2, 3].includes(2): ', [1, 2, 3].includes(2));
[1, 2, 3].includes(5);//false
console.log('[1, 2, 3].includes(5): ', [1, 2, 3].includes(5));
```



### 2.String的扩展方法

#### 模板字符串

`ES6`新增的创建字符串的方式,使用反引号``定义。

```js
let name = `aaa` ;
```

模板字符串中可以**解析变量**

```js
let name = `aaa`;
let sayHello = `hello,my name is ${name}`
```

模板字符串中可以**换行**

```js
let result = {
    name: 'aaa',
    age: 18,
    sex: '女'
}

let html = `<div>
    <span>${result.name}</span>
    <span>${result.age}</span>
    <span>${result.sex}</span>
</div>`
```

模板字符串中可以**调用函数**

```js
const sayHello = function () {
    return `我怎么这么好看`
}

let greet = `${sayHello()}哈哈哈哈哈`
console.log('greet: ', greet);//我怎么这么好看哈哈哈哈哈
```


#### 实例方法 startsWith() 和 endsWith()

- `startsWith()`表示参数字符串是否在原字符串的头部,返回布尔值
- `endsWith()`表示参数字符串是否在原字符串的尾部,返回布尔值

```js
let str = 'Hello world';
str.startsWith('Hello');//true
str.endsWith('!');//false
str.endsWith('d');//true
```

#### 实例方法 repeat()

`repeat()`方法表示将原字符串重复`n`次,返回一个新字符串。

```js
'x'.repeat(3);//xx
'hello'.repeat(2);//hellohello
```



## set数据结构

`ES6`提供了新的数据结构`Set`，它类似于数组，但是成员的值都是唯一的,没有重复的值。


可适用于电商平台搜索历史关键字的存储。


`Set`本身是一个构造函数,用来生成`Set`数据结构

```js
const s = new Set();
```

### 1.基本语法

`Set`函数可以接收一个数组作为参数,用来初始化。

```js
const set = new Set([1, 2, 3])
console.log('set: ', set);
console.log('set.size: ', set.size);//3,代表存储了3个值
```

`Set`函数可以自动去重

```js
const set = new Set(["a","a","b","b"])
console.log('set: ', set);
console.log('set.size: ', set.size);//2,自动去重
```

此特性可用于数组去重
```js
const set = new Set(["a", "a", "b", "b"])
const ary = [...set]
console.log('ary: ', ary);// ["a", "b"]
```



### 2.实例方法

- `add(value)`:添加某个值,返回`Set`结构本身。
- `delete(value)`:删除某个值,返回一个布尔值,表示删除是否成功。
- `has(value)`:返回一个布尔值,表示该值是否为`Set`的成员。
- `clear()`:清除所有成员,没有返回值。

eg:
```js
const s = new Set();
console.log('s : ', s);
s.add(1).add(2).add(3);//向set结构中添加值
console.log('s : ', s);//Set(3) {1, 2, 3}
s.delete(2)
console.log('s : ', s);//Set(2) {1,3}
s.has(1);//
console.log(s.has(1));//true
s.clear();
console.log('s : ', s);//Set(0) {}
```


### 3.遍历

`Set`结构的实例与数组一样,也拥有`forEach`方法,用于对每个成员执行某种操作，没有返回值。

```js
s.forEach(value = > console.log(value))
```










