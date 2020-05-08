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

`TouchEvent`是

`touchstart`、`touchmove`、`touchend`三个事件都会各自有事件对象。


## 移动端常见特效
## 移动端常用开发插件
## 移动端常用开发框架