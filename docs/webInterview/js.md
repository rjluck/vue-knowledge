# JavaScript面试题

[[toc]]

## 题目
```js
console.log(a);//undefined
a();//10
var a =3;
function a(){
    console.log(10)
}
cosnole.log(a)//3
a= 6;
a();//报错,not a  function

//执行顺序
var a;
var a = function(){consoel.log(10)};
console.log(a);
a=3;
console.log(a);//a=3
a=6; //a是变量
a();//报错
```

考察：变量提升  函数提升

知识点：
> - 函数提升优于变量提升
> - 变量的赋值会覆盖函数


## 题目2
```js
var a = [], b = [];

console.log(a==b);

控制台的打印结果是什么？
```

答案：false

解析：

原始值的比较是值的比较：
- 它们的值相等时它们就相等（==）。
- 它们的值和类型都相等时它们就恒等（===）。

对象的比较是引用的比较
- 即使两个对象包含同样的属性和值，它们也是不相等的。
- 即使两个数组各索引元素完全相等，它们也是不相等的

eg:
```js
var o = {x:1}, p = {x:1};
o == p                               // => false: 两个单独的对象永不相等
var a = [], b = [];          
a == b                               // => false: 两个单独的数组永不相等
var c=0,d=0; 
c==d                                 // => true
```

我们通常将对象称为引用类型，以此来和JavaScript的基本类型区分开来。对象值都是引用（reference），对象的比较均是引用的比较，当且仅当它们引用同一个基对象时，它们才相等.

eg:
```js
var a = []; // 定义一个引用空数组的变量a
var b = a;   // 变量b引用同一个数组
a === b       // => true:a和b引用同一个数组，因此它们相等
```

## 题目3
