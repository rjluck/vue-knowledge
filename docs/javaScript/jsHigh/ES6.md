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



### 2.
