# 移动端网页特效

[[toc]]

## 触屏事件

### 1.触屏事件概述

移动端浏览器兼容性较好,我们不需要考虑以前的`JS`的兼容性问题,可以放心的使用原生`JS`书写效果,但是移动端也有自己独特的地方。比如**触屏事件touch(也称触摸事件)**,`Android`和`IOS`都有。

`touch`对象代表一个触摸点。触摸点可能是一根手指,也可能时一根触摸笔。触屏事件可相应用户手段(或触控笔)对屏幕或者触控板操作。

常见的触屏事件如下:

触屏touch事件 | 说明
---|---
touchstart | 手指触摸到一个DOM元素时触发
touchmove | 手指在一个DOM元素上滑动时触发
touchend | 手指从一个DOM元素上移开时触发

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
            background-color: pink;
        }
    </style>
</head>

<body>
    <div></div>
    <script>
        var div = document.querySelector('div');
        div.addEventListener('touchstart', function () {
            console.log('手指触碰到DOM元素')
        })

        div.addEventListener('touchmove', function () {
            console.log('移动')
        })

        div.addEventListener('touchend', function () {
            console.log('离开')
        })
    </script>
</body>

</html>
```


### 2.触摸事件对象(TouchEvent)

`TouchEvent`是一类描述手指在触摸平面(触摸屏、触摸板等)的状态变化的事件。这类事件用于描述一个或多个触点,使开发者可以检测触点的移动,触点的增加和减少等等。

`touchstart`、`touchmove`、`touchend`三个事件都会各自有事件对象。

触摸事件对象重点看三个常见对象列表


触摸列表 | 说明
---|---
touches | 正在触摸平面的所有手指的一个列表
targetTouches | 正在触摸当前DOM元素上的手指的一个列表
changedTouches | 手指状态发生了改变的列表,从无到有，从有到无变化


> 当我们手指离开平面的时候,就没有了touches 和 targetTouches 列表，但是会有 changedTouches

因为我们一般都是触摸元素,所以最经常使用的是 targetTouches

eg：
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
            background-color: pink;
        }
    </style>
</head>

<body>
    <div></div>
    <script>
        var div = document.querySelector('div');
        div.addEventListener('touchstart', function (e) {
            console.log('手指触碰到DOM元素', e)
            console.log(e.targetTouches[0]);//就可以得到正在触摸dom的第一根手指相关信息
        })

        div.addEventListener('touchmove', function (e) {
            console.log('移动', e)
        })

        div.addEventListener('touchend', function (e) {
            console.log('离开', e)
        })
    </script>
</body>

</html>
```


### 3.移动端拖动元素

`touchstart`、`touchmove`、`touchend`可以实现拖动元素。

拖动元素需要当前手指的坐标值,我们可以使用`targetTouches[0]`里面的`pageX`和`pageY`

**移动端拖动原理:** 手指移动中,计算出手指移动的距离。然后用盒子原来的位置 + 手指移动的距离

**手指移动的距离:**手指滑动中的位置 减去 手指刚开始触屏的位置


拖动元素三步曲

- 触摸元素`touchstart`: 获取手指初始坐标,同时获得盒子原来的位置
- 移动手指`touchmove`: 计算手指的滑动距离，并且移动盒子
- 离开手指`touchend`: 

> 注意：手指移动也会触发滚动屏幕，所以这里要阻止默认的屏幕滚动e.preventDefault()


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
            position: absolute;
            left: 0;
            width: 100px;
            height: 100px;
            background-color: pink;
        }
    </style>
</head>

<body>
    <div></div>
    <script>
        var div = document.querySelector('div');
        var startX = 0;//获取手指初始坐标
        var startY = 0;
        var x = 0;//获取盒子初始位置
        var y = 0;
        div.addEventListener('touchstart', function (e) {
            startX = e.targetTouches[0].pageX;
            startY = e.targetTouches[0].pageY;
            x = this.offsetLeft;
            y = this.offsetTop;
        })

        div.addEventListener('touchmove', function (e) {
            //计算手指移动距离:手指移动之后的坐标 减去 手指初始的坐标
            var moveX = e.targetTouches[0].pageX - startX;
            var moveY = e.targetTouches[0].pageY - startY;
            //移动盒子
            this.style.left = x + moveX + 'px';
            this.style.top = y + moveY + 'px';
            //阻止屏幕滚动的默认行为
            e.preventDefault();
        })
    </script>
</body>

</html>
```

### 4.classList 属性

`classList`属性是`HTML`新增的一个属性,返回元素的类名。但是`ie10`以上版本支持。

```html
<body>
    <div class="one"></div>
    <script>
        //
        var div = document.querySelector('div');
        console.log(div.calssList);//伪数组形式 div.calssList[0]
    </script>
</body>
```

该属性用于在元素中添加,移除及切换`CSS`类。有以下方法

- 添加类`element.classList.add('类名')`
- 移除类:`element.calssList.remove('类名')`
- 切换类:`element.classList.toggle('类名')`

```html
<head>
    <style>
        .bg{
            background-color:black;
        }
    </style>
</head>
<body>
    <div class="one"></div>
    <button>开关灯</button>
    <script>
        
       var div = document.querySelector('div');
       //添加类名  是在后面追加类名不会覆盖以前的类名
       div.classList.add('two');
       div.classList.remove('one');

       var btn = document.querySelector('button');
       btn.addEventListener('click',function(){
           document.body.classList.toggle('bg');
       })
    </script>
</body>
```








## 移动端常见特效

### 1.移动端轮播图
### 2.返回顶部

#### click延时解决方案

移动端`click`事件会有300ms的延时,原因是移动端屏幕双击会缩放(double tap to zoom)页面。

300ms之内有没有点两下，若没有就当点击事件处理了。但是如果按钮点击之后就让其返回顶部，结果是300ms之后才执行的，页面就会有卡顿现象,即延迟。


解决方案:

1.禁用缩放。浏览器禁用默认的双击缩放行为并且去掉300ms的点击延迟

```html
<meta name="viewport" content="user-scalable=no">
```

2.利用`touch`事件自己封装这个事件解决300ms延迟

原理:

- 当我们手指触摸屏幕,记录当前触摸时间;
- 当我们手指离开屏幕,用离开的时间减去触摸的时间
- 如果时间小于150ms,并且没有滑动过屏幕,那么我们就定义为点击

```js

    //封装tap,解决click  300ms 延时
    function tap(obj, callback) {
        var isMove = false;
        var startTime = 0;//记录触摸时候的时间变量

        obj.addEventListener('touchstart', function (e) {
            startTime = Date.now(); //记录触摸时间
        })
        obj.addEventListener('touchmove', function (e) {
            isMove = true; //看看是否有滑动,有滑动算拖拽，不算点击
        })
        obj.addEventListener('touchend', function (e) {
            if (!isMove && (Date.now() - startTime < 150)) {
                //如果手指触摸和离开时间小于150ms  算点击
                callback && callback();//执行回调函数
            }
            isMove = false;//取反 重置
            startTime = 0;

        })
    }

    //调用
    tap(div, function () {
        //执行代码
    })
```

3.使用插件。 `fastclick`插件解决300ms延迟。

`fastclick.js`官网下载引入即可:
gitbub:https://github.com/ftlabs/fastclick

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        * {
            padding: 0;
            margin: 0;
        }

        div {
            height: 200px;
            width: 100%;
            background-color: pink;
        }
    </style>
    <script src="./fastclick.js"></script>
</head>

<body>
    <div></div>
    <script>
        if ('addEventListener' in document) {//判断document有没有addEventListener这个事件
            document.addEventListener('DOMContentLoaded', function () {//等待页面DOM加载完执行
                FastClick.attach(document.body);
            }, false);
        }

        ///只要引入上面这段代码,页面中所有元素都取消了延时的问题
        var div = document.querySelector('div');
        div.addEventListener('click', function () {
            alert(111)
        })
    </script>
</body>

</html>
```







## 移动端常用开发插件

### 1.fastclick插件

使用 `fastclick`插件解决300ms延迟。

移动端要求的是快速开发,所以我们经常会借助于一些插件来帮助完成操作，那么什么是插件？

JS插件是js文件,它遵循一定规范编写,方便程序展示效果,拥有特定功能且方便调用。如轮播图和瀑布流插件。

**特点**

它一般是为了解决某个问题而专门存在,其功能单一，并且比较小。

我们之前写的`animate.js`也算一个最简单的插件。

gitbub:https://github.com/ftlabs/fastclick


### 2.swiper插件

中文官网：https://www.swiper.com.cn/

- 引入插件相关文件
- 按照规定语法使用



### 3.其他移动端常见插件


**superslide**

http://www.superslide2.com/

**iscroll**

https://github.com/cubiq/iscroll


### 4.插件的使用总结

- 确认插件实现的功能
- 去官网查看使用说明
- 下载插件
- 打开demo实例文件,查看需要引入的相关文件,并且引入
- 复制demo实例文件种地结构html,样式css及js代码






## 移动端常用开发框架


框架,顾名思义就是一套架构,它会基于自身的特点向用户提供一套较为完整的解决方案。框架的控制权在框架本身,使用者要按照框架所规定的某种规范进行开发。

插件一般是为了解决某个问题而专门存在,其功能单一,并且比较小。

前端常用的框架有

- Bootstrap
- Vue
- Angular
- React等

既能开发PC端,也能开发移动端。

前端常用的移动端插件有

- swiper
- superslide
- iscroll等


> 框架:大而全,一整套解决方案

> 插件:小而专一,某个功能的解决方案






















