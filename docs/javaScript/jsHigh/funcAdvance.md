# 函数进阶

[[toc]]

## 函数的定义和调用

### 1.函数的定义方式

- 函数声明方式 `function`关键字(命名函数)
- 函数表达式(匿名函数)
- `new Function()`

`var fn = new Function('参数1','参数2'...,'函数体')`

- `Function`里面参数都必须是字符串格式
- 第三种方式执行效率低，也不方便书写，因此较少使用
- 所有函数都是`Function`的实例（对象）
- 函数也属于对象

通过第三种定义函数的方式,我们可以得出,所有函数实际上都是`Function`函数的实例，因为我们可以通过`new  Function()`来创建实例。


函数原型三角关系：
![image](/javaScript/function.png)

```js
//函数的定义方式

//1.自定义函数(命名函数)
function fn() {

}


//2.函数表达式(匿名函数)
var fun = function () {

}

//3.利用 new Function('参数1','参数2','函数体')
var f = new Function('a', 'b', 'console.log(a+b)');
f(1, 2);//3

console.dir(f);//里面有__proto__,所以是对象
console.log(f instanceof Object); //true
```


### 2.函数的调用方式

1.普通函数

```js
function fn() {
    console.log('人生巅峰');

}
fn();
fn.call();
```

2.对象的方法

```js
var o = {
    sayHi: function () {
        console.log('人生巅峰');
    }
}

o.sayHi();
```

3.构造函数

```js
function Star() {

}

new Star();
```

4.绑定事件函数

```js
btn.onclick = function () {
    //点击了按钮就可以调用这个
};
```

5.定时器函数

```js
setInterval(function () {
    //定时器自动1秒钟调用一次
}, 1000)
```

6.立即执行函数

```js
(function () {
    console.log('人生巅峰');
    //立即执行函数，自动调用
})()
```



## this

### 1.函数内this的指向

这些`this`的指向,是当我们调用函数的时候确定的。调用方法的不同决定了`this`的指向不同

一般指向我么的调用者

调用方式 | this指向
---|---
普通函数调用 | window
构造函数调用 | 实例对象,原型对象里面的方法也指向实例对象
对象方法调用 | 该方法所属对象
事件绑定方法 | 绑定事件对象
定时器函数 | window
立即执行函数 | window

eg:
```js
//函数的调用方式
//1.普通函数,this指向对象window
function fn() {
    console.log('this', this);//Window 
}
// fn();
// fn.call();
window.fn();

//2.对象的方法,this指向对象o
var o = {
    sayHi: function () {
        console.log('this', this);//o
    }
}

o.sayHi();

//3.构造函数,this指向ldh这个实例对象
function Star() {
    console.log('this', this);//ldh
}
//原型对象里面的this指向的也是ldh这个实例对象
Star.prototype.sing = function () {
    console.log('this', this);//ldh
}
var ldh = new Star();


//4.绑定事件函数,this指向函数调用者btn
btn.onclick = function () {
    //点击了按钮就可以调用这个
    console.log('this', this);//btn
};

//5.定时器函数,this指向对象window
window.setInterval(function () {
    //定时器自动1秒钟调用一次
    console.log('this', this);//window
}, 1000)

//6.立即执行函数,this指向对象window
(function () {
    console.log('人生巅峰');
    //立即执行函数，自动调用
    console.log('this', this);//window
})()
```


### 2.改变函数内部this的指向

`JavaScript`为我们专门提供了一些函数方法来帮我们更优雅的处理函数内部`this`的指向问题,常用的有`bind()`、`call()`、`apply()`三种方法。

#### call方法

`call()`方法调用一个对象。简单理解为调用函数的方式,但是它可以改变函数的`this`指向。

`fun.call(thisArg,arg1,arg2,...)`

eg：
```js
var o = {
    name: 'andy'
}

function fn(a, b) {
    console.log(this);
    console.log(a + b);//3
}
// fn.call();//window
// fn.call(o);//o
fn.call(o, 1, 2);//o
```


call的主要作用可以实现继承。

eg：
```js
function Father(name, age, sex) {
    this.name = name;
    this.age = age;
    this.sex = sex;
}

function Son(name, age, sex) {
    Father.call(this, name, age, sex)
}

var son = new Son('刘德华', 18, '男')
console.log('son: ', son);
```


#### apply方法

`apply()`方法调用一个函数。简单理解为调用函数的方式,但是它可以改变函数的`this`指向。

`fun.apply(thisArg,[argsArray])`

- `thisArg`:在`fun`函数运行时指定的`this`值
- `argsArray`:传递的值,必须包含在数组里面
- 返回值就是函数的返回值,因为它就是调用函数


eg：
```js
var o = {
    name: 'andy'
}

function fn(arr) {
    console.log(this);
    console.log(arr);//pink
}
// fn.apply();//window
fn.apply(o, ['pink']);//o
// fn.apply(o, 1, 2);//o


  fn(arr, arr1) {
    console.log(this);
    console.log(arr, arr1);//black  yellow
}
// fn.apply();//window
fn.apply(o, ['black', 'yellow', 'green']);//o
```

apply的主要应用：比如我们可以利用apply借助于数学内置对象求最大值

```js
var arr = [1, 6, 7, 2];
// var max = Math.max.apply(null, arr);
var max = Math.max.apply(Math, arr);
console.log('max: ', max);//7
```


#### bind方法

`bind()`方法不会调用函数。但是能改变函数内部`this`指向

`fun.bind(thisArg,arg1,arg2,...)`

- `thisArg`:在`fun`函数运行时指定的`this`值
- `arg1,arg2...`:传递的其他参数
- 返回由指定的`this`值和初始化参数改造的**原函数的拷贝**

eg：
```js
var o = {
    name: 'andy'
}

function fn(a, b) {
    console.log(this);
    console.log(a + b);//3
}
var f = fn.bind(o, 1, 2);//o
console.log('f: ', f);//该函数的this就指向了o
f();
```


如果有的函数我们不需要立即调用,但是又想改变这个函数内部的this指向此时用bind

eg：应用场景:我们有一个按钮,当我们点击了之后,就禁用这个按钮,3秒钟之后开启这个按钮

```html
<body>
    <button>发送</button>
    <script>
        var btn = document.querySelector("button")
        btn.onclick = function () {
            this.disabled = true;//这个this指向的是btn这个按钮
            // var that = this;//方式1：指针修正,声明变量
            setTimeout(function () {//方式2：指针修正，定时器外面绑定bind,调整指针指向btn
                //定时器函数里面的this指向window对象
                // that.disabled = false;
                this.disabled = false;
            }.bind(this), 3000)
        }
    </script>
</body>
```


#### call、apply、bind 总结


**相同点**

- 都可以改变函数内部的`this`指向


**区别**

- `call`和`apply`会调用函数,并且改变函数内部的`this`指向
- `call`和`apply`传递的参数不一样,`call`传递参数`aru1,aru2...`形式,`apply`必须数组形式`[arg]`
- `bind`不会调用函数,可以改变函数内部`this`指向


**主要应用场景**

- `call`经常做继承
- `apply`经常和数组有关系,比如借助于数学对象实现数组最大值最小值
- `bind`不调用函数,但是还想改变`this`指向.比如改变定时器内部的`this`指向





## 严格模式

### 1.什么是严格模式

`JavaScript`除了提供正常模式外,还提供了**严格模式(strict mode)**。ES5的严格模式是采用具有限制性`JavaScript`变体的一种方式,即在严格的条件下运行`JS`代码

严格模式在IE10以上版本的浏览器才会被支持,旧版本浏览器中会被忽略

严格模式对正常的`JavaScript`语义做了一些更改

- 消除了`JavaScript`语法的一些不合理、不严谨之处,减少了一些怪异行为
- 消除代码运行的一些不安全之处,保证代码运行的安全
- 提高编译器效率,增加运行速度
- 禁用了在`ECMAScript`的未来版本中可能会定义的一些语法,为未来新版本的`JavaScript`做好铺垫。比如一些保留字：`class,enum,export,extends,import,super`不能做变量名


### 2.开启严格模式

严格模式可以应用到**整个脚本**或**个别函数中**。因此在使用时,我们可以将严格模式分为**为脚本开启严格模式**和**为函数开启严格模式**两种情况。

#### 为脚本开启严格模式

为整个脚本文件开启严格模式,需要在所有的语句之前放一个特定语句`'use strict'`或`"use strict"`

```html
<!-- 为整个脚本(script标签)开启严格模式 -->
<script>
    'use strict';
    //下面js代码就会按照严格模式执行
</script>
```

有的`script`基本是严格模式,有的`script`脚本是正常模式,这样不利于文件合并,所以将整个脚本文件放在一个立即执行的匿名函数之中。这样独立创建一个作用域而不影响其他`script`脚本文件。


```html
<!-- 为整个脚本(script标签)开启严格模式 -->
<script>
    (function () {
        'use strict';
        //下面js代码就会按照严格模式执行    
    })()
</script>
```



#### 为函数开启严格模式

要给某个函数开启严格模式,需要把`'use strict'`或`"use strict"`声明放在函数体所有语句之前。

```html
<!-- 为某个函数开启严格模式 -->
<script>
    // 此时只是给fn函数开启严格模式
    function fn() {
        'use strict';
        //下面js代码就会按照严格模式执行
    }

    function fun() {
        //按照普通模式执行
    }
</script>
```


### 3.严格模式中的变化

严格模式对`JavaScript`的语法和行为,都做了一些改变。

#### 变量规定

- 在严格模式中,如果一个变量没有声明就赋值,默认是全局变量。严格模式禁止这种写法，变量都必须先声明,然后再使用。
```html
<script>
    'use strict';
    num = 10;
    console.log('num: ', num);//报错
</script>
```
- 严禁删除已经声明的变量。例如，`delete x;`语法是错误的。
```html
<script>
    'use strict';
    num = 10;
    delete num;//报错
</script>
```

#### 严格模式下this指向问题

- 以前在全局作用域函数中的`this`指向`window`对象。
- 严格模式下全局作用域函数中的`this`是`undefined`。
- 以前构造函数不加`new`也可以调用，当成普通函数,`this`指向全局对象。
- 严格模式下,如果构造函数不加`new`调用,`this`会报错。
- `new`实例化的构造函数指向创建的对象实例。

普通模式:
```js
function Star() {
    this.sex = '女'
}

Star();
console.log(window.sex);//女
```
严格模式:
```js
'use strict';
function Star() {
    this.sex = '女'
}

var lll = new Star();
console.log(lll.sex);//女
```

- 定时器`this`还是指向`window`。
- 事件、对象还是指向调用者

严格模式:
```js
'use strict';
setTimeout(function () {
    console.log(this);//window
}, 2000)
```


#### 函数变化

- 函数不能有重名的参数

普通模式:
```js
function fn(a, a) {
    console.log(a + a);//8
}
fn(2, 4);
```

严格模式:
```js
 'use strict';
function fn(a, a) {
    console.log(a + a);//报错
}
fn(2, 4);
```

- 函数必须声明在顶层。新版本的`JavaScript`会引入块级作用域(ES6中引入)。为了与新版本接轨,不允许在非函数的代码块内声明函数。

eg:
```html
<script>
'use strict';
if (true) {
    function fn() { }///语法错误
    fn()
}

for (var i; i < 10; i++) {
    function fn() { }///语法错误
    fn()
}

function bbb() {
    function fn() { }///合法
    fn()
}
</script>
```

==更多严格模式参考:==

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode








## 高阶函数

**高阶函数**是对其他函数进行操作的函数,它**接收函数作为参数**或**将函数作为返回值输出**。


```js
function fn(callback) {
    callback && callback()
}
fn(function () {
    alert('hi');
})
//此时fn就是高阶函数
```

```js
function fn() {
    return function () { }
}
fn();
//此时fn就是高阶函数
```

函数也是一种数据类型,同样可以作为参数,传递给另外一个参数使用。最典型的就是作为回调函数。


eg：
```html
<body>
    <div></div>
    <script>
        function fn(a, b, callback) {
            console.log(a + b);
            callback && callback()
        }
        fn(1, 2, function () {
            console.log('最后');
        });
        //此时fn就是高阶函数

        $("div").animate({ left: 500 }, function () {
            $("div").css("backgroundColor", "purple")
        })
    </script>
</body>
```





## 闭包

### 1.变量作用域

变量根据作用域的不同分为两种:**全局变量**、**局部变量**

- 函数内部可以使用全局变量
- 函数外部不可以使用局部变量
- 当函数执行完毕,本作用域内的局部变量会销毁

### 2.什么是闭包

**闭包(closure)**指有权==访问==另一个函数作用域中==变量==的**函数**。 ------ JavaScript高级程序设计

简单理解就是,一个作用域可以访问另外一个函数内部的局部变量。

eg:
```js
//fun这个函数作用域访问了另外一个函数fn里面的局部变量num,此时就产生了闭包。
//变量所在的这个函数fn就是闭包函数
function fn() {
    var num = 10;
    function fun() {
        console.log(num);//10
    }
    fun();
}
fn();
```

eg:
```js
function fn() {
    var num = 10;
    // function fun() {
    //     console.log(num);//10
    // }
    // return fun;
    return function () {
        console.log(num);//10
    }
}

var f = fn();
console.log('f: ', f);
f();
//类似于
/*
var f = function fun() {
    console.log(num);
}
*/
```

在浏览器中查看闭包

![image](/javaScript/closure.png)


**闭包的主要作用**：延伸了变量的作用范围



### 3.思考题

#### 1.

```js
var name = 'rxj'
var object = {
    name: 'my object',
    getNameFun: function () {
        return function () {
            return this.name;
        }
    }
}

console.log(object.getNameFun()());//rxj
```

解析
```js
//解析
var f = object.getNameFun();
//类似于
/*
var f = function () {
            return this.name;
        }
*/
f();

//相当于
/*
(function(){
    return this.name;
})()
//即立即函数this指向window
*/

//没有闭包的产生
```


#### 2.

```js
var name = 'rxj'
var object = {
    name: 'my object',
    getNameFun: function () {
        var that = this;
        return function () {
            return that.name;
        }
    }
}

console.log(object.getNameFun()());//my object
```

解析
```js
//解析
var f = object.getNameFun();
//类似于
/*
var f = function () {
            return that.name;
        }
*/
f();
//此时有闭包的产生
```


### 4.闭包总结

#### 闭包是什么?

闭包是一个函数(一个作用域可以访问另外一个函数的局部变量)

#### 闭包的作用是什么

延伸变量的作用范围








## 递归

### 1.什么是递归

如果一个**函数在内部可以调用其本身**,那么这个函数就是**递归函数**。

简单理解，函数内部自己调用自己，这个函数就是递归函数。

递归函数的作用和循环效果一样。

由于递归很容易发生"栈溢出"错误(stack overflow),所以**必须要加退出条件`return`**

eg：
```js
var num = 1;
function fn() {
    console.log('打印6句话');
    if (num == 6) {
        return;//递归里面必须加退出条件
    }
    num++;
    fn();
}

fn();
```


### 2.利用递归求数学题

#### (1) 求1*2*3...*n 阶乘

利用递归函数求1~n的阶乘

```js
function fn(n) {
    if (n == 1) {
        return 1;
    }
    if (n > 1) {
        return n * fn(n - 1)
    }
}
fn(3);
console.log('fn(3): ', fn(3));//6
console.log('fn(4): ', fn(4));//24
```

#### (2) 求斐波那契数列

利用递归函数求斐波那契数列(兔子序列)  1、1、2、3、5、8、13、21...

前两项相加的和为第三项

用户输入一个数字n就可以求出,这个数字对应的兔子序列值

如果用户输入1，结果为1，如果用户输入4，结果为3

```js
//我们只需要知道用户输入的n的前面两项(n-1  n-2)就可以计算出n对应的序列值
function fb(n) {
    if (n === 1 || n === 2) {
        return 1;
    }
    return fb(n - 1) + fb(n - 2)
}
fb(3);
console.log('fb(3): ', fb(3));//2
console.log('fb(6): ', fb(6));//8
```


#### (3) 根据id返回对应的数据对象

```js
var data = [{
    id: 1,
    name: '家电',
    goods: [{
        id: 11,
        gname: '冰箱',
        goods: [{
            id: 111,
            gname: '海尔'
        }]
    }, {
        id: 12,
        gname: '洗衣机'
    }]
}, {
    id: 2,
    name: '服饰'
}]

//我们想要输入id号，就可以返回的数据对象

//利用forEach去遍历里面的每一个对象
function getID(json, id) {
    var o = {}
    json.forEach(function (item) {
        if (item.id == id) {
            console.log('item: ', item);
            o = item;
            return item;
        } else if (item.goods && item.goods.length) {
            //得到里层数据
            o = getID(item.goods, id)
        }
    })
    return o;
}
console.log(getID(data, 1));
console.log(getID(data, 11));
console.log(getID(data, 111));
```


### 3.浅拷贝和深拷贝

- 浅拷贝只是拷贝一层,更深层次对象级别的只拷贝引用
- 深拷贝拷贝多层,每一级别的数据都会拷贝
- `Object.assign(target,...sources)` ES6新增方法可以浅拷贝

浅拷贝:
```js
var obj = {
    id: 1,
    name: 'andy',
    msg: {
        age: 18
    }
}
console.log('obj: ', obj);


var o = {};
//浅拷贝:方式1
// for (var k in obj) {
//     //k 是属性名 obj[k] 属性值
//     o[k] = obj[k];
// }
// //浅拷贝把深层次的数据地址拷贝给新对象了，所以新对象改变，原对象也变了
// console.log('o', o);
// o.msg.age = 20;


//浅拷贝:方式2
Object.assign(o, obj);
console.log('o', o);
o.msg.age = 20;
```

深拷贝:
```js
var obj = {
    id: 1,
    name: 'andy',
    msg: {
        age: 18
    },
    color: ['red', 'pink']
}
console.log('obj: ', obj);


var o = {};
//深拷贝:封装函数
function deepCopy(newObj, oldObj) {
    for (var k in oldObj) {
        //判断我们的属性值属于哪种数据类型
        //1.获取属性值 oldObj[k]
        var item = oldObj[k];
        //Array也属于Object，所以先判断Array
        //2.判断这个值是否是数组
        if (item instanceof Array) {
            newObj[k] = [];
            deepCopy(newObj[k], item);
        } else if (item instanceof Object) {
            //3.判断这个值是否是对象
            newObj[k] = {};
            deepCopy(newObj[k], item);
        } else {
            //4.判断这个值是否是简单数据类型
            newObj[k] = item;
        }
    }
}

deepCopy(o, obj)
console.log('o: ', o);
o.msg.age = 20;
```