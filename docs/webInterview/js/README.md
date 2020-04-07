# JavaScript面试题

[[toc]]

## 安装插件 (左侧栏第五个按钮)

js面试题
、、、、、、、、、、、、、、
1.请解释弹出值，并解释为什么？
```js
alert(a);
a();
var a = 3;
/*
var a ;
console.log(a);
var a =3
*/
function a(){
    alert(10)
}
alert(a);
a = 6;
a();
```
变量提升  函数提升

函数提升优于变量提升

变量的赋值会覆盖函数
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