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

### 1.删除事件的方式

**传统注册方式**

`eventTarget.onclick = null`

eg:
```js
var divs = document.querySelectorAll('div');
divs[0].onclick = function(){
    alert(11);
    divs[0].onclick = null;
}
```

**方法监听注册方式**

`eventTarget.removeEventListener(type,listener,[useCapture])`

eg:
```js
var divs = document.querySelectorAll('div');
divs[0].addEventListener('click',fn);//里面的fn 不需要调用加小括号

function fn(){
    alert(22);  
    divs[0].removeEventListener('click',fn)
}
```

`eventTarget.detachEvent(eventNameWithOn,callback)`

eg:
```js
var divs = document.querySelectorAll('div');
divs[0].attachEvent('click',fn);//里面的fn 不需要调用加小括号

function fn(){
    alert(22);  
    divs[0].detachEvent('click',fn)
}
```


### 2.删除事件兼容性解决方案

```js
        function removeEventListener(element, eventName, fn) {
            //判断当前浏览器是否支持 removeEventListener 方法
            if (element.removeEventListener) {
                element.removeEventListener(eventName, fn);//第三个参数,默认是false
            } else if (element.detachEvent) {
                element.detachEvent('on' + eventName, fn);
            } else {
                element['on' + eventName] = null;
            }
        }
```


## DOM事件流

**事件流**描述的是从页面中接收事件的顺序。

**事件**发生时会在元素节点之间按照待定的顺序传播,这个**传播过程**即**DOM事件流**。

![image](/javaScript/flow.png)

DOM事件流分为3个阶段:

- 捕获阶段
- 当前目标阶段
- 冒泡阶段

**事件冒泡**:IE最早提出,事件开始时由最具体的元素接收,然后逐级向上传播到DOM最顶层节点的过程

**事件捕获**:网景最早提出,由DOM最顶层节点开始,然后逐级向下传播到最具体的元素接收的过程。

![image](/javaScript/flow2.png)


事件发生时会在元素节点之间按照待定的顺序传播,这个**传播过程**即**DOM事件流**。

注意：

- JS代码中只能执行捕获或者冒泡其中的一个阶段
- `onclick`和`attachEvent`只能得到冒泡阶段
- `addEventListener(type,listener,[useCapture])`第三个参数如果是`true`,表示在事件捕获阶段调用事件处理程序;如果是`false`(不写默认就是`false`),表示在事件冒泡阶段调用事件处理程序。
- 事件开发中我们很少使用事件捕获,我们更关注事件冒泡。
- 有些事件是没有冒泡的,比如`onblur、onfocus、onmouseenter、onmouseleave`
- 事件冒泡有时候会带来麻烦,有时候又会帮助很巧妙的做某些事件。

eg:
```html
<body>
    <div class="father">
        <div class="son"></div>
    </div>
    <script>
        //第三个参数为true则是处于捕获阶段
        // var son = document.querySelector('.son');
        // son.addEventListener('click', function () {
        //     alert('son')
        // }, true)
        // var father = document.querySelector('.father');
        // father.addEventListener('click', function () {
        //     alert('father')
        // }, true)

        //第三个参数为false则是处于冒泡阶段
        var son = document.querySelector('.son');
        son.addEventListener('click', function () {
            alert('son')
        }, false)
        var father = document.querySelector('.father');
        father.addEventListener('click', function () {
            alert('father')
        }, false)
        document.addEventListener('click', function () {
            alert('document')
        }, false)

    </script>
</body>
```

## 事件对象

### 1.定义
```js
      /*
        1.event 就是一个事件对象
        2.事件对象只有有了事件才会存在,它是系统给我们自动创建的,不需要我们传递参数
        3.事件对象 是我们事件的一系列相关数据的集合,跟事件相关的,比如鼠标点击里面就包含了
        鼠标的相关信息,鼠标坐标的等。如果是键盘事件里面就包含键盘事件的信息,比如判断用户按下了哪个键
        4.这个事件对象我们可以自己命名,比如 event、evt、e
        5.事件对象也有兼容性问题  ie678  通过window.event
        */
        var div = document.querySelector('div');
        div.onclick = function (e) {
            //兼容性写法
            e = e || window.event;
            console.log('event', e)

        }

        div.addEventListener('click', function (event) {

        })
```

`event`对象代表事件的状态,比如键盘按键的状态、鼠标的位置、鼠标按键的状态

简单理解:事件发生后,跟事件相关的一系列信息数据的集合都放到这个对象里面,这个对象就是事件对象`event`,它有很多属性和方法。

这个`event`是个形参,系统帮我们设定为事件对象,不需要传递实参过去。

当我们注册事件时,`event`对象就会被系统自动创建,并依次传递给事件监听器(事件处理函数)


### 2.事件对象的兼容性方案

事件对象本身的获取存在兼容性问题:

- 标准浏览器中是浏览器给方法传递的参数,只需要定义形参`e`就可以获取到
- 在`IE6~8`中，浏览器不会给方法传递参数,如果需要的话,需要到`window.event`中获取查找

**解决:**

`e = e || window.event`


### 3.事件对象的常见属性和方法

事件对象属性方法 | 说明
---|---
e.target | 返回**触发**事件的对象  **标准**
e.srcElement | 返回**触发**事件的对象  **非标准 ie6~8使用**
e.type | 返回事件的类型，比如`click、mouseover` 不带`on`
e.cancelBubble | 该属性阻止冒泡 **非标准 ie6~8使用**
e.returnValue | 该属性阻止默认事件(默认行为) **非标准 ie6~8使用** 比如不让链接跳转
e.preventDefault() | 该方法阻止默认事件(默认行为) **标准** 比如不让链接跳转
e.stopPropagation() | 阻止冒泡 **标准**

eg：
```js
var div = document.querySelector('div');
    div.onclick = function (e) {
        //兼容性写法
        e = e || window.event;
        console.log('event', e)
        var target = e.target || e.srcElement;
    }
```

> 了解：跟this有个非常相似的属性 e.currentTarget  ie678不认识

eg:
```js
var a = document.querySelector('a');

    a.addEventListener('click',function(e){
        e.preventDefault(); //dom 标准写法
    })

    a.onclick = function (e) {
        //兼容性写法
        e = e || window.event;
        //普通浏览器
        //e.preventDefault();//阻止默认事件  方法

        //低版本浏览器 ie678
        //e.returnValue;//属性

        //我们可以利用return false 也能阻止默认行为,没有兼容性问题
        //特点：return 后面的代码不执行了,而且只限制于传统的注册方式
        return false;
    }

```


## 阻止事件冒泡

### 1.阻止事件冒泡的两种方式

事件冒泡:开始时由最具体的元素接收,然后逐级向上传播到DOM最顶层节点。

事件冒泡本身的特性,会带来坏处，也会带来好处，需要我们灵活掌握。

**阻止事件冒泡**

- 标准写法:利用事件对象里面的`stopPropagation()` 方法

```js
 e.stopPropagation()
```
- 非标准写法:IE6~8 利用事件对象`cancelBubble`属性

eg:
```html
<body>
    <div class="father">
        <div class="son"></div>
    </div>
    <script>
        var son = document.querySelector('.son');
        son.addEventListener('click', function (e) {
            alert('son')
            e.stopPropagation();//阻止冒泡
            e.cancelBubble = true;//阻止冒泡
        }, false)
        var father = document.querySelector('.father');
        father.addEventListener('click', function () {
            alert('father')
        }, false)
        document.addEventListener('click', function () {
            alert('document')
        }, false)

    </script>
</body>
```

### 2.阻止事件冒泡的兼容性解决方案

```js
if(e && e.stopPropagation){
    e.stopPropagation();
}else{
    window.event.cancelBubble = true;
}
```





## 事件委托(代理、委派)

事件冒泡本身的特性,会带来坏处,也会**带来好处**,需要我么灵活掌握。

咱们班有100个学生,快递员有100个快速,如果一个个的送花费时间较长。同时每个学生领取的时候,也需要排队领取,也花费时间较长，如何?

**事件委托**

事件委托也称为事件代理,在`jQuery`里面称为事件委派。

**事件委托的原理**

不是每个子节点单独设置事件监听器,而是事件监听器设置在其父节点上,然后利用冒泡原理相应设置每个子节点。

eg:
```html
<ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
    </ul>
```

以上案例:给`ul`注册点击事件,然后利用事件对象的`target`来找到当前点击的`li`,因为点击`li`,事件会冒泡到`ul`上，`ul`有注册事件,就会触发事件监听器。


**事件委托的作用**

我们只操作了一次`DOM`,提高了程序的性能。

```js
var ul = document.querySelector('ul');
ul.addEventListener('click',function(e){
    alert('111')
    e.target.style.backgroundColor = 'pink';
})
```




## 常用的鼠标事件

### 1.常用的鼠标事件

鼠标事件 | 触发条件
---|---
onclick | 鼠标点击左键触发
onmouseover | 鼠标经过触发
onmouseout | 鼠标离开触发
onfocus | 获得鼠标焦点触发
onblur | 失去鼠标焦点触发
onmousemove | 鼠标移动触发
onmouseup | 鼠标弹起触发
onmousedown | 鼠标按下触发


**1.禁止鼠标右键菜单**

`contextmenu`主要控制应该何时显示上下文菜单,主要用于程序员取消默认的上下文菜单

```js
document.addEventListener('contextmenu',function(e){
    e.preventDefault();
})
```

**2.禁止鼠标选中**

`selectstart`开始选中,主要用于禁止选中

```js
document.addEventListener('selectstart',function(e){
    e.preventDefault();
})
```

### 2.鼠标事件对象

`event`对象代表事件的状态,跟事件相关的一系列信息的集合。

目前主要用鼠标事件对象`MouseEvent`和键盘事件对象`keyboardEvent`


鼠标事件对象 | 说明
---|---
e.clientX | 返回鼠标相对于浏览器窗口可视区的X坐标
e.clientY | 返回鼠标相对于浏览器窗口可视区的Y坐标
e.pageX | 返回鼠标相对于文档页面的X坐标 IE9+ 支持
e.pageY | 返回鼠标相对于文档页面的Y坐标 IE9+ 支持
e.screenX | 返回鼠标相对于电脑屏幕的X坐标
e.screenY | 返回鼠标相对于电脑屏幕的Y坐标


## 常用的键盘事件

事件除了使用鼠标触发,还可以使用键盘触发

### 1.常用的键盘事件

键盘事件 | 触发条件
---|---
onkeyup | 某个键盘按键被松开时触发
onkeydown | 某个键盘按键被按下时触发
onkeypress | 某个键盘按键被按下时触发,但是它不识别功能健，比如`ctrl`、`shift`、箭头等。

**注意：**

- 如果使用`addEventListener`不需要加`on`
- `onkeypress`和前面两个的区别是，它不识别功能键,比如箭头，shift等
- 三个事件的执行顺序 keydown -- keypress -- keyup

eg:
```html
<body>
    <script>
        document.addEventListener('keydown', function () {
            console.log('按下')
        })
        document.addEventListener('keyup', function () {
            console.log('弹起')
        })
        document.addEventListener('keypress', function () {
            console.log('按下press')
        })
    </script>
</body>
```

### 2.键盘事件对象


键盘事件对象属性 | 说明
---|---
keyCode | 返回该键的ASCII值

**注意:**

- `onkeydown和onkeyup` 得到的ASCII值不区分字母大小写,比如`a`和`A`得到的ASCII值都是65
- `onkeypress` 得到的ASCII值区分字母大小写,比如`a`得到97,`A`得到65
- 在我们实际开发中,我们更多的使用`keydown`和`keyup`,它能识别所有的键(包括功能键)
- `keypress`不识别功能键,但是`keyCode`属性能区分大小写,返回不同的ASCII值

eg:
```html
<body>
    <script>
        document.addEventListener('keyup', function (e) {
            console.log('弹起', e);
            console.log(e.keyCode);
        })
    </script>
</body>
```






