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


## 动画函数封装
## 常见网页特效案例