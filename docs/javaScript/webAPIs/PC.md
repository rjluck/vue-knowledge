# PC端网页特效

[[toc]]

## 元素偏移量 offset 系列


### 1.offset 概述

`offset`翻译过来就是偏移量,我们使用`offset`系列相关属性可以动态的得到该元素的位置(偏移)、大小等。

- 获得元素距离带有定位父元素的位置
- 获得元素自身的大小(宽度高度)
- 注意:返回的数值都不带单位

#### offset系列常用属性

offset系列属性 | 作用
---|---
element.offsetParent | 返回作为该元素带有定位的父级元素,如果父级元素都没有定位则返回body
element.offsetTop | 返回元素相对带有定位父元素上方的偏移
element.offsetLeft | 返回元素相对带有定位父元素左边框的偏移
element.offsetLeft | 返回元素相对带有定位父元素左边框的偏移
element.offsetWidth | 返回元素自身包括padding、边框、内容区的宽度,返回数值不带单位
element.offsetHeight | 返回元素自身包括padding、边框、内容区的高度,返回数值不带单位

eg:
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

        .father {
            width: 200px;
            height: 200px;
            background-color: pink;
            margin: 100px;
            position: relative;
        }

        .son {
            width: 100px;
            height: 100px;
            background-color: blue;
            margin-left: 45px;
        }

        .w {
            width: 200px;
            height: 200px;
            background-color: skyblue;
            margin: 0 auto 200px;
            padding: 10px;
            border: 15px solid red;
        }
    </style>
</head>

<body>
    <div class="father">
        <div class="son"></div>
    </div>
    <div class="w"></div>
    <script>
        //offset系列
        var father = document.querySelector('.father');
        console.log(father.offsetTop);//100
        console.log(father.offsetLeft);//100
        //它以带有定位的父亲为准,如果没有父亲或者父亲元素没有定位，则已body为准
        var son = document.querySelector('.son');
        console.log(son.offsetTop);//100(父级元素无定位时)  0(父级元素有定位时)
        console.log(son.offsetLeft);//145(父级元素无定位时)  45(父级元素有定位时)

        //可以得到元素的大小  宽度和高度  包含padding + border + width
        var w = document.querySelector('.w');
        console.log(w.offsetWidth);//250
        console.log(w.offsetHeight);//250

        //返回带有定位的父亲 否则返回的是body
        console.log(son.offsetParent);//返回带有定位的父亲 否则返回的是body
        console.log(son.parentNode);//返回父亲,是最近一级的父亲,不管父亲有没有定位
    </script>
</body>

</html>
```


### 2.offset 与 style 区别

#### offset

- `offset`可以得到任意样式表中的样式值
- `offset`系列获得的数值是没有单位的
- `offsetWidth`包含`padding+border+width`
- `offsetWidth`等属性是只读属性,只能获取不能赋值
- 所以,我们想要获取元素大小位置,用`offset`更合适

#### style

- `style`只能得到行内样式表中的样式值
- `style.width`获得的是带有单位的字符串
- `style.width`获得不包含`padding`和`border`的值
- `style.width`是可读写属性,可以获取也可以赋值
- 所以,我们想要给元素更改值,则需要用`style`改变



## 元素可视区 client 系列

`client`翻译过来就是客户端,我们使用`client`系列的相关属性来获取元素可视区的相关信息。通过`client`系列的相关属性可以动态的得到该元素边框大小、元素大小等。


client系列属性 | 作用
---|---
element.clientTop | 返回元素上边框大小
element.clientLeft | 返回元素左边框大小
element.clientWidth | 返回自身包括padding、内容区的宽度,不含边框,返回数值不带单位
element.clientHeight | 返回自身包括padding、内容区的高度,不含边框,返回数值不带单位

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
            width: 200px;
            height: 200px;
            background-color: pink;
            border: 10px solid red;
        }
    </style>
</head>

<body>
    <div></div>
    <script>
        //client 宽度 和offsetWidth 最大的区别是 不包含边框
        var div = document.querySelector('div');
        console.log(div.clientWidth);//200
    </script>
</body>
</html>
```

## 立即执行函数

立即执行函数:不需要调用,立马能够自己执行的函数

主要作用:创建一个独立的作用域,在里面创建的变量都是局部变量,避免了命名冲突问题

两种写法:

- `(function(){})()`
- `(function(){}())`

参数传递

```js
(function (a) {
    console.log(1);
    console.log(a);//2
})(2); //第二个小括号可以看做是调用函数

(function (b) {
    console.log(b);//66
}(66));
```

立即执行函数可以写名字
```js
(function sum(b) {
    console.log(b);//66
}(66));
```

## 元素滚动 scroll 系列

`scroll`翻译过来就是滚动的,我们使用`scroll`系列的相关属性可以动态的得到该元素的大小、滚动距离等。

scroll系列属性 | 作用
---|---
element.scrollTop | 返回被卷去的上侧距离,返回数值不带单位
element.scrollLeft | 返回被卷去的左侧距离,返回数值不带单位
element.scrollWidth | 返回自身实际的宽度,不含边框,返回数值不带单位
element.scrollHeight | 返回自身实际的的高度,不含边框,返回数值不带单位

> 若内容超出盒子大小，则取到的值为内容实际的大小值

![image](/javaScript/scroll.png)


### 页面被卷去头部兼容性解决方案

需要注意的是，页面被卷去的头部，有兼容性问题，因此被卷去的头部通常有如下几种写法：


- 声明了DTD,使用`document.documentElement.scrollTop`
- 未声明DTD,使用`document.body.scrollTop`
- 新方法`window.pageYOffset`和`window.pageXOffset`,`IE9`开始支持

> DTD指的就是<!DOCTYPE html>

```js
function getScroll(){
    return {
        left:window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0,
        top:window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
    }
}

//使用的时候 getScroll().left
```


## 三大系列总结

三大系列大小对比 | 作用
---|---
element.offsetWidth | 返回自身包括`padding`、边框、内容区的宽度,返回数值不带单位
element.clientWidth |返回自身包括`padding`,内容区的宽度,不含边框,返回数值不带单位
element.scrollWidth | 返回自身实际的宽度,不含边框,返回数值不带单位

![image](/javaScript/compare.png)


主要用法:

- `offset`系列经常用于获得元素位置`offsetLeft``offsetTop`
- `client`经常用于获取元素大小`clientWidth``clientHeight`
- `scroll`经常用于获取滚动距离`scrollTop``scrollLeft`
- 注意页面滚动的距离通过`window.pageXOffset`获得


## mouseenter和mouseover的区别


- 当鼠标移动到元素上时就会触发`mouseenter`事件
- 类似`mouseover`,它们两者之间的差别是
- `mouseover`鼠标经过自身盒子会触发,经过子盒子还会触发。`mouseenter`只会经过自身盒子触发。
- 之所以这样,就是因为`mouseenter`不会冒泡
- 跟`mouseenter`搭配鼠标离开`mouseleave`同样不会冒泡





## 动画函数封装


### 1.动画实现原理

核心原理:通过定时器`setInterval()`不断移动盒子位置

实现步骤:

- 获得盒子当前位置
- 让盒子在当前位置加上1个移动距离
- 利用定时器不断重复这个操作
- 加一个结束定时器的条件
- 注意此元素需要添加定位,才能使用`element.style.left`

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
        var timer = setInterval(() => {
            if (div.offsetLeft >= 400) {
                clearInterval(timer);
            }
            div.style.left = div.offsetLeft + 1 + 'px';
        }, 30);

    </script>
</body>

</html>
```

### 2.动画函数简单封装

注意函数需要传递两个参数，**动画对象**和**移动到的距离**


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

        span {
            position: absolute;
            display: block;
            width: 150px;
            height: 150px;
            background-color: purple;
        }
    </style>
</head>

<body>
    <div></div>
    <span></span>
    <script>
        //简单动画函数封装
        function animate(obj, target) {
            var timer = setInterval(() => {
                if (obj.offsetLeft >= target) {
                    clearInterval(timer);
                }
                obj.style.left = obj.offsetLeft + 1 + 'px';
            }, 30);
        }

        var div = document.querySelector('div');
        var span = document.querySelector('span');

        animate(div, 100);
        animate(span, 100);
    </script>
</body>

</html>
```

### 3.动画函数给不同元素记录不同定时器

如果多个元素都使用这个动画函数,每次都要`var`声明定时器。我们可以给不同的元素使用不同的定时器(自己专门用自己的定时器)

核心原理:利用`JS`是一门动态语言,可以很方便的给当前对象添加属性

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

        span {
            position: absolute;
            display: block;
            width: 150px;
            height: 150px;
            background-color: purple;
        }
    </style>
</head>

<body>
    <button>按钮</button>
    <div></div>
    <span></span>
    <script>
        //给不同的元素指定了不同的定时器
        function animate(obj, target) {
            //当我们不断的点击按钮,这个元素的速度会越来越快,因为开启了太多的定时器
            //解决方案就是,让我们元素只有一个定时器执行
            //先清除以前的定时器,只保留当前的一个定时器执行
            clearInterval(obj.timer);
            obj.timer = setInterval(() => {
                if (obj.offsetLeft >= target) {
                    clearInterval(obj.timer);
                }
                obj.style.left = obj.offsetLeft + 1 + 'px';
            }, 30);
        }

        var div = document.querySelector('div');
        var span = document.querySelector('span');
        var btn = document.querySelector('button');

        animate(div, 100);
        btn.addEventListener('click', function () {
            animate(span, 100);
        })

    </script>
</body>

</html>
```

### 4.缓慢动画原理

缓慢动画就是让元素运动速度有所变化,最常见的是让速度慢慢停下来。

思路:

- 让盒子每次移动的距离慢慢变小,速度就会慢慢落下来
- 核心算法:缓慢动画公式`(目标值 - 现在的位置)/10(目标值 - 现在的位置)/10`,作为每次移动的距离步长
- 停止的条件:让当前盒子位置等于目标位置就停止定时器
- 注意步长值需要取整

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

        span {
            position: absolute;
            display: block;
            width: 150px;
            height: 150px;
            background-color: purple;
        }
    </style>
</head>
<body>
    <button>按钮</button>
    <div></div>
    <span></span>
    <script>
        function animate(obj, target) {
            clearInterval(obj.timer);
            obj.timer = setInterval(() => {
                //步长值写到定时器的里面 (目标值 - 现在的位置)/10
                //把我们步长值改为整数,不要出现小数问题
                var step = Math.ceil((target - obj.offsetLeft) / 10);
                if (obj.offsetLeft == target) {
                    clearInterval(obj.timer);
                }
                //每次
                obj.style.left = obj.offsetLeft + step + 'px';
            }, 30);
        }

        var div = document.querySelector('div');
        var span = document.querySelector('span');
        var btn = document.querySelector('button');

        animate(div, 300);
        btn.addEventListener('click', function () {
            animate(span, 300);
        })

    </script>
</body>

</html>
```


### 5.动画函数多个目标值之间移动

- 可以让动画函数从800移到500
- 当我们点击按钮时，判断步长是正值还是负值
- 如果是正值,则步长往大了取整
- 如果是负值,则步长往小了取整

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

        span {
            position: absolute;
            display: block;
            width: 150px;
            height: 150px;
            background-color: purple;
        }
    </style>
</head>

<body>
    <button class="btn500">按钮到500</button>
    <button class="btn800">按钮到800</button>
    <div></div>
    <span></span>
    <script>
        function animate(obj, target) {
            clearInterval(obj.timer);
            obj.timer = setInterval(() => {
                //步长值写到定时器的里面 (目标值 - 现在的位置)/10

                var step = (target - obj.offsetLeft) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step)

                if (obj.offsetLeft == target) {
                    clearInterval(obj.timer);
                }
                //每次
                obj.style.left = obj.offsetLeft + step + 'px';
            }, 30);
        }

        var div = document.querySelector('div');
        var span = document.querySelector('span');
        var btn500 = document.querySelector('.btn500');
        var btn800 = document.querySelector('.btn800');
        btn500.addEventListener('click', function () {
            animate(span, 500);
        })
        btn800.addEventListener('click', function () {
            animate(span, 800);
        })
    </script>
</body>

</html>
```


### 6.动画函数添加回调函数

回调函数原理:函数可以作为一个参数.将这个函数作为参数传到另一个函数里面,当那个函数执行完毕之后,再执行传进去的这个函数,这个过程就叫做回调。

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

        span {
            position: absolute;
            display: block;
            width: 150px;
            height: 150px;
            background-color: purple;
        }
    </style>
</head>

<body>
    <button class="btn500">按钮到500</button>
    <button class="btn800">按钮到800</button>
    <div></div>
    <span></span>
    <script>
        function animate(obj, target, callback) {
            //callback = function(){}
            clearInterval(obj.timer);
            obj.timer = setInterval(() => {
                //步长值写到定时器的里面 (目标值 - 现在的位置)/10

                var step = (target - obj.offsetLeft) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step)

                if (obj.offsetLeft == target) {
                    clearInterval(obj.timer);
                    //回调函数写到定时器结束里面
                    if (callback) {
                        callback();
                    }
                }
                //每次
                obj.style.left = obj.offsetLeft + step + 'px';
            }, 30);
        }

        var div = document.querySelector('div');
        var span = document.querySelector('span');
        var btn500 = document.querySelector('.btn500');
        var btn800 = document.querySelector('.btn800');
        btn500.addEventListener('click', function () {
            animate(span, 500);
        })
        btn800.addEventListener('click', function () {
            animate(span, 800, function () {
                span.style.backgroundColor = 'red';
            });
        })
    </script>
</body>

</html>
```

### 7.动画函数封装到单独JS文件里面

因为以后经常使用这个动画函数,可以单独封装到一个JS文件里面,使用的时候用这个JS文件即可

```js
// animate.js
 function animate(obj, target, callback) {
            //callback = function(){}
            clearInterval(obj.timer);
            obj.timer = setInterval(() => {
                //步长值写到定时器的里面 (目标值 - 现在的位置)/10

                var step = (target - obj.offsetLeft) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step)

                if (obj.offsetLeft == target) {
                    clearInterval(obj.timer);
                    //回调函数写到定时器结束里面
                    if (callback) {
                        callback();
                    }
                }
                //每次
                obj.style.left = obj.offsetLeft + step + 'px';
            }, 30);
}
```

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="./animate.js"></script>
    <style>
        * {
            padding: 0;
            margin: 0;
        }

        .sliderbar {
            width: 40px;
            height: 40px;
            background-color: pink;
            position: relative;
            left: 1000px;
        }

        span {
            position: absolute;
            text-align: center;
            color: #fff;
        }

        .con {
            width: 200px;
            height: 40px;
            background-color: purple;
            position: absolute;
            z-index: -1;
        }
    </style>
</head>

<body>
    <div class="sliderbar">
        <span>←</span>
        <div class="con">问题反馈</div>
    </div>

    <script>
        //当我们鼠标经过sliderbar 就会让 con这个盒子滑动到左侧
        //当我们鼠标离开sliderbar 就会让 con这个盒子滑动到右侧

        var sliderbar = document.querySelector('.sliderbar');
        var con = document.querySelector('.con');

        sliderbar.addEventListener('mouseenter', function () {
            animate(con, -160, function () {
                sliderbar.children[0].innerHTML = '→'
            })
        })

        sliderbar.addEventListener('mouseleave', function () {
            animate(con, 0, function () {
                sliderbar.children[0].innerHTML = '←'
            })
        })
    </script>
</body>

</html>
```





















## 常见网页特效案例

- 网页轮播图

### 1.节流阀

防止轮播图按钮连续点击造成播放过快。

节流阀目的:当上一个函数动画内容执行完毕,再去执行下一个函数动画,让事件无法连续触发。

核心思路：利用回调函数,添加一个变量来控制,锁住函数和解锁函数。

- 开始设置一个变量`var flag = true`
- `if(flag){flag = false; do something}` 关闭水龙头
- 利用回调函数,动画执行完毕,`flag = true` 打开水龙头