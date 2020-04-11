# 预解析

[[toc]]

## 定义

`JavaScript`代码是由浏览器中的`JavaScript`解析器来执行的。`JavaScript`解析器在运行`JavaScript`代码的时候分为两步:**预解析和代码执行**。

预解析：js引擎会把js里面所有的var还有function提升到当前作用域的最前面

代码执行：按照代码书写的顺序从上往下执行

预解析分为：

- 变量预解析(变量提升)

变量提升就是把所有的变量声明提升到当前的作用域最前面,不提升赋值操作。

- 函数预解析(函数提升)

函数提升就是把所有的函数声明提升到当前作用域的最前面，不调用函数。

```js
console.log(num);//num is not defined 
```

```js
console.log(num);//undefined
var num = 10;
/*
var num;
console.log(num);
num = 10;
*/
```

```js
fn();//11
function fn(){
    console.log(11);
}
/*
function fn(){
    console.log(11);
}
fn();
*/
```

```js
fun();// fun is not function
var fun = function(){
     console.log(22);
}
/*
var fun;
fun();
var fun = function(){
     console.log(22);
}
*/
```

eg案例1:结果是?
```js
var num = 10;
fun();
function fun(){
    console.log(num);
    var num = 20;
}

/*
var num;
function fun(){
    var num;
    console.log(num);
    num = 20;
}
num = 10;
fun();
*/
```
undefined


eg案例2:结果是?
```js
var num = 10;
function fun(){
    var num;
    console.log(num);
    num = 20;
    console.log(num);
}
fun();
/*
var num;
function fun(){
    console.log(num);
    var num = 20;
    console.log(num);
}
num = 10;
fun();
*/
```
undefined 20

eg案例3:结果是?
```js
var a = 18;
fun();
function fun(){
    var b = 9;
    console.log(a);
    console.log(b);
    var a = '123';
}

/*
var a;
function fun(){
    var b =9;
    var a;
    console.log(a);
    console.log(b);
    a = '123';
}

a= 18;
fun();
*/
```
undefined 9


eg案例4:结果是?
```js
fun();
console.log(c);
console.log(b);
console.log(a);
function fun(){
    var a = b = c = 9;
    console.log(a);
    console.log(b);
    console.log(c);
}

/*
var a;
function fun(){
    //var a = b = c = 9;
    //相当于 var a = 9; b = 9; c = 9;  b和c直接赋值，没有var声明，当全局变量看
    //集体声明  var a = 9,b = 9,c = 9;
    var a;
    a = b = c = 9;
    console.log(a);//9
    console.log(b);//9
    console.log(c);//9
}

fun();
console.log(c);//9
console.log(b);//9
console.log(a);//a not define
*/
```
9 9 9 9 9 error