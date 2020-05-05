# BOM

[[toc]]

## BOM 概述

### 1.什么是BOM

`BOM(Browser Object Model)`即**浏览器对象模型**,它提供了独立于内容而与**浏览器窗口进行交互的对象**,其核心对象是`window`。

`BOM`由一系列相关的对象构成,并且每个对象都提供了很多方法与属性。

`BOM`缺乏标准,`JavaScript`语法的标准化组织是`ECMA`,`DOM`的标准化组织是`W3C`，`BOM`最初是`Netscape`浏览器标准的一部分。

**DOM**

- 文档对象模型
- `DOM`就是把文档当做一个对象来看待
- `DOM`的顶级对象是`document`
- `DOM`主要学习的是操作页面元素
- `DOM`是`W3CA`标准规范

**BOM**

- 浏览器对象模型
- 把浏览器当做一个对象来看待
- `BOM`的顶级对象是`window`
- `BOM`学习的是浏览器窗口交互的一些对象
- `BOM`是浏览器厂商在各自浏览器上定义的,兼容性较差

### 2.BOM的构成

`BOM`比`DOM`更大,它包含`DOM`

![image](/javaScript/window.png)

**window对象是浏览器的顶级对象**,它具有双重角色。

- 它是`JS`访问浏览器窗口的一个接口
- 它是一个全局对象。定义在全局作用域中的变量、函数都会变成`window`对象的属性和方法。在调用的时候可以省略`window`,比如`alert()`、`prompt()`都属于`window`对象方法。

> 注意:window下的一个特殊属性window.name



## window 对象的常见事件

### 1.窗口加载事件

```js
window.onload = function(){}

//或者

window.addEventListener('load',function(){})
```

`window.onload`是窗口(页面)加载事件,当文档内容完全加载完成会触发该事件(包括图像、脚本文件、css文件等),就调用的处理函数。

**注意:**

- 有了`window.onload`就可以把`JS`代码写到页面元素的上方,因为`onload`是等页面内容全部加载完毕,再去执行处理函数。
- `window.onload`传统注册事件方式只能写一次,如果有多个,会以最后一个`window.onload`为准
- 如果使用`addEventListener`则没有限制

eg:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script>
        // window.onload = function () {
        //     var btn = document.querySelector('button');
        //     btn.addEventListener('click', function () {
        //         alert('点击我')
        //     })
        // }
        window.addEventListener('load',function(){
            
        })
    </script>
</head>
<body>
    <button>点击</button>
</body>
</html>
```

```js
document.addEventListener('DOMContentLoaded',function(){})
```

- `DOMContentLoaded`事件触发时,仅当`DOM`加载完成,不包括样式表，图片，flash等。
- IE9以上才支持
- 如果页面的图片很多的话,从用户访问到`onload`触发可能需要较长的时间，交互效果就不能实现，必然影响用户的体验,此时用`DOMContentLoaded`事件比较合适。


### 2.调整窗口大小事件

```js
window.onresize = function(){}

window.addEventListener("resize",function(){})
```

`window.onresize`是调整窗口大小加载事件,当触发时就调用的处理函数。

**注意:**

- 只要窗口大小发生像素变化,就会触发这个事件。
- 我们经常利用这个事件完成响应式布局。`window.innerWidth`当前屏幕的宽度

eg:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        div {
            width: 100px;
            height: 100px;
            background: pink;
        }
    </style>
</head>
<body>
    <script>
        window.addEventListener('load', function () {
            var div = document.querySelector('div');
            window.addEventListener('resize', function () {
                console.log('变化')
                console.log('width', window.innerWidth)
                if (window.innerWidth <= 800) {
                    div.style.display = 'none';
                } else {
                    div.style.display = 'block';
                }
            })
        })

    </script>
    <div>2222222222</div>
</body>
</html>
```


## 定时器

### 1.两种定时器

`window`对象给我们提供了2个非常好用的方法-**定时器**

- setTimeout()
- setInterval()

### 2.setTimeout()

`window.setTimeout(调用函数,[延迟的毫秒数])`

`setTimeout()`方法用于设置一个定时器,该定时器在定时器到期后执行调用函数

`setTimeout()`这个调用函数我们也称为**回调函数callback**

普通函数是按照代码顺序直接调用的。而这个函数，需要等待时间,时间到了才去调用这个函数，因此称为回调函数。

**注意**

- `window`可以省略
- 这个调用函数可以直接写函数,或者写函数名或者采取字符串`'函数名()'`三种形式,第三种不推荐。
- 延迟的毫秒数省略默认是0,如果写,必须是毫秒
- 因为定时器可能有很多,所以我们经常给定时器赋值一个标识符

### 3.停止setTimeout()定时器

`window.clearTimeout(timeoutID)`

`clearTimeout()` 方法取消了先前通过调用`setTimeout()`建立的定时器。

**注意**

- `window`可以省略
- 里面的参数就是定时器的标识符

eg:
```html
<body>
    <button>点击停止定时器</button>
    <script>
        var btn = document.querySelector('button');
        var timer = setTimeout(function () {
            console.log('爆炸了')
        }, 5000)

        btn.addEventListener('click', function () {
            clearTimeout(timer)
        })
    </script>
</body>
```


### 4.setInterval() 定时器

`window.setInterval(回调函数,[间隔的毫秒数])`

`setInterval()`方法重复调用一个函数,每隔这个时间,就去调用一次回调函数。

**注意:**

- window可以省略
- 这个调用函数可以直接写函数,或者写函数名或者采取字符串`函数名()`三种形式。
- 间隔的毫秒数省略默认是0,如果写，必须是毫秒,表示每间隔多少毫秒就自动调用这个函数。

```js
setInterval(function(){
    console.log('每隔1秒输出一次')
},1000)
```

### 5.停止setInterval() 定时器

`window.clearInterval(intervalID)`

`clearInterval()`方法取消了先前通过调用`setInterval()`建立的定时器。

**注意**

- `window`可以省略
- 里面的参数就是定时器的标识符

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <button class="begin">开启定时器</button>
    <button class="stop">停止定时器</button>
    <script>
        var begin = document.querySelector('.begin');
        var stop = document.querySelector('.stop');
        var timer = null;
        begin.addEventListener('click', function () {
            timer = setInterval(function () {
                console.log('你好吗?')
            }, 1000)
        })

        stop.addEventListener('click', function () {
            clearInterval(timer)
        })
    </script>
</body>
</html>
```

## this指向问题

`this`的指向在函数定义的时候是确定不了的,只有函数执行的时候才能确定`this`到底指向谁,一般情况下`this`的最终指向的是那个调用它的对象。


- 全局作用域或者普通函数中this指向全局对象`window`(注意定时器里面的this指向window)

```js
function fn(){
    console.log(this);
}

//window.fn();
fn();
```

- 方法调用中谁调用`this`指向谁

```js
var o = {
    sayHi:function(){
        console.log(this);//this指向的是o
    }
}

o.sayHi();
```

- 构造函数中`this`指向构造函数的实例

```js
function Fun(){
    console.log(this);//this指向是gun
}

var fun = new Fun();
```


## JS 执行机制

### 1.JS是单线程

`JavaScript`语言的一大特点是单线程,也就是说,**同一个时间只能做一件事**。这是因为`JavaScript`这门脚本语言诞生的使命---`JavaScript`是为了处理页面中用户的交互，以及操作`DOM`而诞生的。比如我们对某个`DOM`元素进行添加和删除操作,不能同时进行。应该先进行添加,之后再删除。


单线程就意味着,所有任务需要排队,前一个任务结束,才会执行后一个任务,这样导致的问题就是:如果JS执行的时间过长,这样就会造成页面的渲染不连贯，导致页面渲染加载堵塞的感觉。

**以下代码执行的结果是什么?**
```js
console.log(1);

setTimeout(function(){
    console.log(3)
},1000);

console.log(2);
```
> 123


### 2.同步和异步

为了解决这个问题,利用多核`CPU`的计算能力,`HTML5`提出`Web Worker`标准,允许`JavaScript`脚本创建多个线程。于是，`JS`中出现了**同步**和**异步**

#### 同步

前一个任务结束再执行后一个任务,程序的执行顺序与任务的排列顺序是一致的、同步的。比如做饭的同步做法:我们要烧水煮饭,等水开了(10分钟),再去切菜，炒菜。

#### 异步

在做一件事的时候,因为这件事会花费很长时间,在做这件事的同时,你还可以去处理其他事情。比如做饭的异步做法:我们在烧水的同时,利用这10分钟,去切菜，炒菜。

他们的本质区别:这条流水线上各个流程的执行顺序不同。


**以下代码执行的结果是什么?**
```js
console.log(1);

setTimeout(function(){
    console.log(3)
},0);

console.log(2);
```
> 123

#### 同步任务

同步任务都在主线程上执行,形成一个**执行栈**

#### 异步任务

`JS`的异步是通过回调函数实现的。

一般而言,异步任务有以下三种类型:

- 普通事件,如`click、resize`等
- 资源价值,如`load、error`等
- 定时器,包括`setInterval、setTimeout`等

异步任务相关回调函数添加到任务队列中(任务队列也称为消息队列)


### 3.JS执行机制

- 先执行**执行栈中的同步任务**
- 异步任务(回调函数)放入任务队列中
- 一旦执行栈中的所有同步任务执行完毕,系统就会按次序读取任务队列中的异步任务,于是被读取的异步任务结束等待状态,进入执行栈,开始执行。


**以下代码执行的结果是什么?**
```js
console.log(1);
document.onClick = function(){
    console.log('click');
}
console.log(2);
setTimeout(function(){
    console.log(3)
},3000);

```
> 123


由于主线程不断的重复获得任务、执行任务、再获取任务、再执行，这种机制被称为**事件循环(event loop)**

![image](/javaScript/execute.png)


## location 对象

### 1.什么是location对象

`window`对象给我们提供了一个`location`属性用于获取或设置窗体的`URL`,并且可以用于解析`URL`,因为这个属性返回的是一个对象,所以我们将这个属性也称为**location对象**

### 2.URL

统一资源定位符(Uniform Resource Locator,URL)是互联网上标准资源的地址。互联网上的每个文件都有一个唯一的URL,它包含的信息指出文件的位置以及浏览器应该怎么处理它。

URL的一般语法格式为:
```
protocol://host[:port]/path/[?query]#fragment

http://www.itcast.cn/index.html?name=andy&age=18#link
```

组成 | 说明
---|---
protocol | 通信协议  常用http、ftp、maito等
host | 主机(域名) www.itcast.cn
port | 端口号 可选,省略时使用方案的默认端口,如http的默认端口为80
path | 路径  由  零或多个'/'符号隔开的字符串,一般用来表示主机上的一个目录或文件地址
query | 参数  以键值对的形式通过 & 符号分隔开来
fragment| 片段  #后面内容 常见于链接 锚点



### 3.location对象的属性

location对象属性 | 返回值
---|---
location.href | 获取或者设置整个URL
location.host | 返回主机(域名) www.itcast.cn
location.port | 返回端口号,如果未写返回空字符串
location.pathname | 返回路径
location.search | 返回参数 
location.hash| 返回片段 #后面内容  常见于链接 锚点


### 4.location对象的方法

location对象方法 | 返回值
---|---
location.assign() | 跟`href`一样,可以跳转页面(也称为重定向页面)
location.replace() | 替换当前页面,因为不记录历史,所以不能后退页面
location.reload() | 重新加载页面,相当于刷新按钮或者F5,如果参数为`true`强制刷新`ctrl+F5`

```html
<body>
    <button>点击</button>
    <script>
        var btn = document.querySelector('button');
        btn.addEventListener('click', function () {
            //记录浏览历史,所以可以实现后退功能
            //location.assign('http://www.baidu.com')
            //不记录历史,所以不能后退页面
            //location.replace('http://www.baidu.com')
            location.reload();
        })
    </script>
</body>
```



## navigator 对象

`navigator`对象包含有关浏览器的信息,它有很多属性,我们常用的是`userAgent`,该属性可以返回由客户机发送服务器的`user-agent`头部的值。

判断用户哪个终端打开页面,实现跳转
```js
  //判断用户哪个终端打开页面,实现跳转
        if (navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile| BlackBerry | IEMobile | MQQBrowser | JUC | Fennec | wOSBrowser| BrowserNG | WebOS | Symbian | WindowsPhone) /i)) {
            // window.location.href = "https://www.bilibili.com/video/BV1HJ41147DG?p=285";//手机
            window.location.href = "";//手机
        } else {
            // window.location.href = "https://www.baidu.com/";
            window.location.href = "";//电脑
        }
```




## history 对象

`window`对象给我们提供了一个`history`对象,与浏览器历史记录进行交互.该对象包含用户(在浏览器窗口中)访问过的`URL`

history对象方法 | 作用
---|---
back() | 可以后退功能
forward() | 前进功能
go(参数) | 前进后退功能,参数如果是1,前进一个页面,如果是-1后退1个页面

```html
/*index*/
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <a href="test1.html">点我去列表页</a>
    <button>前进</button>
    <script>
        var btn = document.querySelector('button');
        btn.addEventListener('click', function () {
            // history.forward();
            history.go(1);//前进一步
        })
    </script>
</body>

</html>
```

```html
/*list*/
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <a href="test.html">点我去首页</a>
    <button>后退</button>
    <script>
        var btn = document.querySelector('button');
        btn.addEventListener('click', function () {
            //history.back();
            history.go(-1)
        })
    </script>
</body>

</html>
```