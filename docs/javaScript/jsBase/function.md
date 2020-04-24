# 函数

[[toc]]

## 定义

函数就是封装了一段**可被重复调用执行的代码块**。通过此代码可以实现大量代码的重复使用。

```js
function getSum(num1,num2){
    var sum = 0;
    for(var i = num1;i<=num2;i++){
        sum += i;
    }
    console.log(sum)
}

getSum(1,100)
```

## 函数的使用

`function`是声明函数的关键字，必须小写。

- 声明函数

语法结构：
```js
function 函数名() {
    //函数体
}
```

eg:
```js
function sayHi(){
    console.log('hi~~')
}
```
- 调用函数

`函数名()`

eg:
```js
sayHi()
```
> 声明函数本身并不会执行代码，只有调用函数时才会执行函数体代码。

**函数的封装**

函数的封装是把一个或者多个功能通过**函数的方式封装起来**，对外只提供一个简单的函数接口。

简单理解：封装类似于将电脑配件整合组装到机箱中(类似快递打包)


## 函数的参数

### 1.形参和实参

在**声明函数时**，可以在函数名称后面的小括号中添加一些参数，这些参数被称为**形参**，而在**调用该函数时**，同样也需要传递相应的参数，这些参数被称为**实参**。

语法结构：
```js
function 函数名(形参1,形参2...){

}

函数名(实参1,实参2...)
```
eg:
```js
function cook(aru){
    console.log(aru)
}
cook('蛋包饭')
```

参数的作用：在函数内部某些值不能固定，我们可以通过参数在调用函数时传递不同的值进去。

eg:利用函数求任意两个数之间的和
```js
function getSum(start,end){
    var sum = 0;
    for(var i = start; i<= end;i++){
        sum += i;
    }
    console.log(sum)
}

getSum(1,100);//5050
```
### 2.形参和实参个数不匹配问题

```js
function getSum(num1,num2){
    console.log(num1 + num2)
}
//1.如果实参的个数和形参的个数一致，则正常输出结果
getSum(1,2);//3
//2.如果实参的个数多余形参的个数,会取到形参的个数
getSum(1,2,3);//3
//3.如果实参的个数小于形参的个数,多余的形参定义为undefined
getSum(1);//NaN
```

> 在JS中，形参的默认值是undefined

## 函数的返回值

### 1.return 返回值

格式：
```js
function 函数名(){
    return 需要返回的结果
}

函数名();
```

- 函数只是实现某种功能，最终的结果需要返回给函数的调用者，通过 return实现
```js
function getResult(){
    return 666;
}
getResult(); //666
```

eg：利用函数 求两个数的最大值
```js
function getMax(num1,num2){
    // if(num1>num2){
    //     return num1;
    // }else{
    //     return num2;
    // }
    return num1 > num2?num1:num2;
}
console.log(getMax(3,67));//70
```

eg：求任意数组中的最大值
```js
function getArrayMax(arr){
    var max = arr[0];
    for(var i =1;i <= arr.length; i++){
        if(arr[i] >max){
            max = arr[i]
        }
    }
    return max;
}
console.log(getArrayMax([1,2,66]));//66
```
### 2.return 终止函数

`return`语句之后的代码不被执行。

```js
function getSum(num1,num2){
    return num1+num2;//return 后面的代码不会被执行
    alert('我是不会被执行的哦！')
}

console.log(getSum(1,2))
```

`return`只能返回一个值。如果用逗号隔开多个值，以最后一个为准。
```js
function fn(num1,num2){
    return num1,num2;
}

console.log(fn(1,2));//2
```

### 3.函数没有return 返回 undefined
```js
function fn(){

}

console.log(fn());//undefined
```

函数都是有返回值的

- 如果有`return`则返回`return`后面的值
- 如果没有`return`则返回`undefined`


### 4.break,continue,return的区别

- break:结束当前的循环体(如for、while)
- continue:跳出本次循环，继续执行下次循环(如for、while)
- return:不仅可以退出循环，还能够返回`return`语句中的值，同时还可以结束当前的函数体内的代码




## arguments的使用

当我们不确定有多少个参数传递的时候，可以用`arguments`来获取。在JavaScript中，`arguments`实际上它是当前函数的一个**内置对象**。所有函数都内置了一个`arguments`对象，`arguments`对象中**存储了传递的所有实参**。

```js
function fn(){
    console.log(arguments);//伪数组[1,2,3],里面存储了所有传递过来的实参
    console.log(arguments.length);//3
    console.log(arguments[2]);//3
    //我们可以按照数组的方式遍历arguments
    for(var i = 0; i< arguments.length; i++){
        console.log(arguments[i]);
    }
}
fn(1,2,3)
```

> 只有函数才有arguments对象，而且是每个函数都内置好了arguments

**伪数组**：并不是真正意义上的数组

- 具有数组的`length`属性
- 按照索引的方式进行存储的
- 它没有真正数组的一些方法 pop、push等


eg:利用函数求任意个数的最大值
```js
function getMax(){
    var max = arguments[0];
     for(var i = 0; i< arguments.length; i++){
       if(arguments[i] > max){
           max = arguments[i];
       }
    }
    return max;
}
console.log(getMax(1,2,3));//3
console.log(getMax(1,2,3,4,5));//5
console.log(getMax(1,2,3,444,6,77));//444
```


## 数组案例

eg:利用函数翻转任意数组 reverse 翻转
```js
function reverse(arr){
    var newArr = [];
    for(var i = arr.length-1; i>=0;i--){
        newArr[newArr.length] = arr[i]
    }
    return newArr;
}

var arr1 = reverse([1,2,3]);
console.log(arr1);//[3,2,1]
```

eg:利用函数封装方式，对数组排序--冒泡排序
```js
function sort(arr){
    for(var i = 0; i<arr.length-1;i++){
        for(var j = 0; j<arr.length-i-1;j++){
            if(arr[j] > arr[j+1]){
                var temp = arr[j];
                arr[j] = arr[j+1]；
                arr[j+1] = temp;
            }
        }
    }
    return arr;
}

var arr1 = sort([1,4,2,9]);
console.log(arr1);//[1,2,4,9]
```

eg:函数相互调用
```js
function fn1(){
    fn2()
}

function fn2(){
   
}

fn1();
```

## 函数的两种声明方式

- 利用函数关键字自定义函数(命名函数)
```js
function fn(){

}
fn();
```
- 函数表达式(匿名函数)
```js
var 变量名 = function(){}

var fun = function(aru){
    console.log('我是函数表达式')
    cosnole.log(aru);//xxxx
}
fun();
fun('xxxx')
//(1)fun是变量名，不是函数名
//(2)函数表达式声明方式跟声明变量差不多，只不过变量里面存的是值，而函数式表达式里面存的是函数
//(3)函数表达式也可以进行传递参数
```