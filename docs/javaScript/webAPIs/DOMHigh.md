# DOM事件高级

[[toc]]

## 注册事件(绑定事件)

### 1.注册事件概述

给元素添加事件，称为**注册事件**或者**绑定事件**。

注册事件有两种方式:**传统注册方式** 和 **方法监听注册方式**。

传统注册方式

- 利用`on`开头的事件`onclick`
- `<button onclick="alert()"></button>`
- `btn.onclick = function(){}`
- 特点:注册事件的**唯一性**
- 同一个元素同一个事件只能设置一个处理函数,最后注册的处理函数将会覆盖前面注册的处理函数

方法监听注册方式

- `w3c`标准推荐方式
- `addEventListener()` 是一个方法
- `IE9`之前不支持此方法,可使用`attachEvent()`代替
- 特点:同一个元素同一个事件可以注册多个监听事件
- 按注册顺序依次执行

### 2.addEventListener事件监听方式

`eventTarget.addEventListener(type,listener,[useCapture])`

该方法将指定的监听器注册到`eventTarget`(目标对象)上,当该对象触发指定的事件时，就会执行事件处理函数。

该方法接收三个参数:

- type:事件类型字符串,比如`click`、`mouseover`,注意这里不要带`on`
- listener：事件处理函数,事件发生时,会调用该监听函数
- useCapture:可选参数,是一个布尔值,默认是`false`

eg：
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <button>监听</button>
    <script>
        var btn = document.querySelector('button');
        //事件侦听注册事件 
        //1.addEventListener 里面的事件类型是字符串,必定加引号,而且不带on
        //2. 同一个元素同一个事件可以注册多个监听事件
        btn.addEventListener('click', function () {
            alert('222')
        })
        btn.addEventListener('click', function () {
            alert('333')
        })
    </script>
</body>
</html>
```


### 3.attachEvent 事件监听方式

`eventTarget.attachEvent(eventNameWithOn,callback)`

> 非标准:该特性是非标准的,请尽量不要在生产环境中使用它

该方法将指定的监听器注册到`eventTarget`(目标对象)上,当该对象触发指定的事件时，指定的回调函数就会被执行。

该方法接收两个参数:

- eventNameWithOn:事件类型字符串,比如`onclick`、`onmouseover`,这里要带`on`
- callback:事件处理函数,当目标触发事件时回调函数被调用

```html
<body>
    <button>监听</button>
    <script>
        var btn = document.querySelector('button');
        //事件侦听注册事件 
        //1.attachEvent ie9以前的版本才支持,其他浏览器及ie9以上的都不支持 
        btn.attachEvent('onclick', function () {
            alert('222')
        })
        btn.addEventListener('onclick', function () {
            alert('333')
        })
    </script>
</body>
```

### 4.注册事件兼容性解决方案

兼容性处理的原则:首先照顾大多数浏览器,再处理特殊浏览器

```js
  function addEventListener(element, eventName, fn) {
            //判断当前浏览器是否支持 addEventListener 方法
            if (element.addEventListener) {
                element.addEventListener(eventName, fn);//第三个参数,默认是false
            } else if (element.attachEvent) {
                element.attachEvent('on' + eventName, fn);
            } else {
                //相当于 element.onclick = fn;
                element['on' + eventName] = fn;
            }
        }
```









## 删除事件(解绑事件)

## DOM事件流

## 事件对象

## 阻止事件冒泡

## 事件委托(代理、委派)

## 常用的鼠标事件

## 常用的键盘事件

