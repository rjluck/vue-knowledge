# DOM

[[toc]]

## DOM 简介

### 什么是DOM

文档对象模型(Document Object Model,简称DOM),是W3C组织推荐的处理可扩展标记语言(HTML或者XML)的标准编程接口。

W3C已经定义了一系列的DOM接口,通过这些DOM接口可以改变网页的内容、结构和样式。

- 对于`JavaScript`,为了能够使`JavaScript`操作`HTML`,`JavaScript`就有了一套自己的`DOM`编程接口。
- 对于`HTML`,`DOM`使得`HTML`形成一棵dom树,包含文档、元素、节点。


> 我们获取过来的DOM元素是一个对象(object)，所以称为文档对象模型

关于dom操作,我们主要针对元素的操作。主要有创建、增、删、改、查、属性操作、事件操作。

### DOM树

![image](/javaScript/DOM.png)

- 文档:一个页面就是一个文档,`DOM`中使用`document`表示
- 元素:页面中的所有标签都是元素,`DOM`中使用`element`表示
- 节点:网页中的所有内容都是节点(标签、属性、文本、注释等),`DOM`中使用`node`表示

**DOM把以上内容都看做是对象**



## 获取元素


获取页面中的元素可以使用以下几种方式:

- 根据ID获取
- 根据标签名获取
- 通过HTML5新增的方法获取（IE9以上才支持）
- 特殊元素获取

### 根据ID获取

使用`getElementById()`方法可以获取带有`ID`元素的对象

>document.getElementById('id名')

```html
<body>
    <div id="time">2020-04-20</div>
    <script>
    //1.因为我们文档页面从上往下加载,所以得现有标签,所以我们script写到标签的下面
    //2.参数 id 是大小写敏感的字符串
    //3.返回的是一个元素对象
    var time = document.getElementById('time');
    console.log(time);//<div id="time">2020-04-20</div>
    console.log(typeof time);//object
    //4.console.dir 打印我们返回的元素对象,更好的查看里面的属性和方法
    console.dir(time);
    </script>
</body>
```

### 根据标签名获取

使用`getElementsByTagName()`方法可以返回带有指定标签名的对象的集合。

>document.getElementsByTagName('标签名')

```html
<body>
    <ul id="nav">
        <li>知否知否1</li>
        <li>知否知否2</li>
        <li>知否知否3</li>
        <li>知否知否4</li>  
    </ul>
    <script>
    //1.返回的是 获取过来元素对象的集合 以伪数组的形式存储的
    var lis = document.getElementsByTagName('li');
    console.log(lis);//
    console.log(lis[0]);// <li>知否知否1</li>
    //2.采取遍历的方式可以依次打印里面的元素对象
    for(var i = 0;i<lis.length;i++>){
        console.log(lis[i])
    }
    //3.element.getElementsByTagName() 可以得到这个元素里面的某些标签
    var nav = document.getElementById('nav');//这个获得nav元素
    var NavLis = nav.getElementsByTagName('li');
    </script>
</body>
```


### 通过HTML5新增的方法获取（IE9以上才支持）

#### 1.通过类名获取

```js
document.getElementsByClassName('类名');//根据类名称返回元素对象集合
```

eg:
```html
<body>
    <div class="box">2020-04-20</div>
    <div class="box">2020-04-21</div>
    <script>
    var boxs = document.getElementsByClassName('box');
    </script>
</body>
```

#### 2.通过任何选择器获取

```js
document.querySelector('选择器');//根据指定选择器返回第一个元素对象
```

eg:
```html
<body>
    <div class="box">盒子1</div>
    <div class="box">盒子2</div>
    
    <div id="nav">
        <ul>
            <li>首页</li>
            <li>产品</li>
        </ul>
    </div>
    <script>
    var firstBox = document.querySelector('.box');
    console.log(firstBox);//  <div class="box">盒子1</div>
    var nav = document.querySelector('#nav');
    console.log(nav);
    var li = document.querySelector('li');
    console.log(li);//<li>首页</li>
    </script>
</body>
```

#### 3.通过任何选择器获取所以符合的元素

```js
document.querySelectorAll('选择器');//根据指定选择器返回所有元素对象集合
```

eg:
```html
<body>
    <div class="box">盒子1</div>
    <div class="box">盒子2</div>

    <script>
    var allBox = document.querySelectorAll('.box');
    console.log(allBox);// 
     var lis = document.querySelectorAll('li');
    console.log(lis)
    </script>
</body>
```
### 获取特殊元素(body,html)

#### 1.获取body元素

```js
document.body  //返回body元素对象
```

eg:
```html
<body>
    <script>
    var bodyEle = document.body;
    console.log(bodyEle);// 
    console.dir(bodyEle);// 
    </script>
</body>
```

#### 2.获取html元素

```js
document.documentElement //返回html元素对象
```

eg:
```html
<body>
    <script>
    var htmlEle = document.documentElement;
    console.log(htmlEle);// 
    console.dir(htmlEle);// 
    </script>
</body>
```






## 事件基础

`JavaScript`使我们有能力创建动态页面，而事件是可以被`JavaScript`侦测到的行为。

简单理解:触发---响应机制

网页中的每个元素都可以产生某些可以触发`JavaScript`的事件。


### 事件组成(事件三要素)

- 事件源:事件被触发的对象
- 事件类型:如何触发，什么事件，比如鼠标点击(onClick)还是鼠标经过等
- 事件处理程序:通过一个函数赋值的方式完成

```js
var btn = document.getElementById('btn');

btn.onclick = function(){

}
```


### 执行事件的步骤

- 1.获取事件源
- 2.注册事件(绑定事件)
- 3.添加事件处理程序(采取函数赋值形式)

### 常见的鼠标事件

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


## 操作元素

`JavaScript`的`DOM`操作可以改变网页内容、结构和样式,我们可以利用`DOM`操作元素来改变元素里面的内容、属性等。注意以下都是属性

### 改变元素内容

从起始位置到终止位置的内容,但它去除html标签,同时空格和换行也会去掉

不识别html标签,去除空格和换行

非标准
```js
element.innerText
```

eg:
```js
var btn = document.querySelector('button');
var div = document.querySelector('div');

btn.onclick = function(){
    div.innerText = '<strong>现在是</strong> 2020';
}
```

起始位置到终止位置的全部内容,包括htm标签，同时保留空格和换行

识别html标签，保留空格和换行

W3C推荐
```js
element.innerHTML
```

eg:
```js
var div = document.querySelector('div');
div.innerText = '<strong>现在是</strong> 2020';
```



### 常见元素的属性操作

- innerText、innerHTML 改变元素内容
- src、href
- id、alt、title

eg:
```html
<body>
    <button id="liu">刘</button>
    <button id="zhang">张</button>
    <img src="liu.jpg" alt="" title="liu">

    <script>
        //修改元素属性src
        var liu = document.getElementById('liu');
        var zhang = document.getElementById('zhang');
        var img = document.querySelect('img');

        zhang.onclick = function(){
            img.src = 'zzz.jpg';
            img.title = 'zzz';
        }
        liu.onclick = function(){
            img.src = 'liu.jpg';
            img.title = 'liu';
        }
    </script>
</body>
```

### 表单元素的属性操作

利用`DOM`可以操作如下表单元素的属性:

```
type、value、checked、selected、disabled
```

eg:
```html
<body>
    <button>按钮</button>
    <input type="text" value="输入内容">
    <script>
        //1.获取元素
        var btn = document.querySelect('button');
        var input = document.querySelect('input');

        btn.onclick = function(){
            input.value = '被点击了';
            btn.disabled = true;//按钮禁用
            //等同于
            //this.disabled = true;//this指向的是事件函数的调用者 btn
        }
    </script>
</body>
```

### 样式属性操作

我们可以通过`JS`修改元素的大小、颜色、位置等样式。

#### 1.行内样式操作

> element.style  

- JS里面的样式采取驼峰命名法,比如`fontSize、backgroundColor`
- JS修改`style`样式操作,产生的是行内样式,css权重比较高
- 推荐样式比较少或者功能简单的情况下使用

eg:
```html
<body>
    <div></div>
    <script>
        var div = document.querySelector('div');
        div.onclick = function(){
            //div.style 里面的属性采取驼峰命名法
            this.style.backgroundColor = 'purple';
            this.style.width = '250px';
        }
    </script>
</body>
```

eg:循环精灵图背景
```html
<body>
    <div>
        <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
    </div>
    <script>
        //背景精灵图是有规律的排列的
        var lis = document.querySelectAll(li);
        for(var i = 0; i< lis.length;i++){
            lis[i].style.backgroundPosition = '0 -'+ index + 'px';
        }
    </script>
</body>
```

eg:显示隐藏文本框内容
```html
<head>
    <style>
        input{
            color:#999;
        }
    </style>
</head>
<body>
   <input type="text" value="手机">
    <script>
        var text = document.querySelectAll('input');
        text.onfocus = function(){
            //得到焦点
            if(this.value === '手机'){
                this.value = '';
            }
            //获得焦点需要把文本框里面的文字颜色变黑
            this.style.color = '#333';
        }
          text.onblur = function(){
            //失去焦点
            if(this.value === ''){
                this.value = '手机';
            }
             this.style.color = '#999';
        }
    </script>
</body>
```


#### 2.类名样式操作

> element.className

- 适合于样式较多或者功能复杂的情况
- `class`因为是个保留字,因此使用`className`来操作元素类名属性
- `className` 会直接更改元素的类名,会覆盖原先的类名。

eg:
```html
<head>
    <style>
        .change{
            background-color:purple;
            color:#fff;
            font-size:25px;
            margin-top:100px;
        }
    </style>
</head>
<body>
    <div></div>
    <script>
        var div = document.querySelector('div');
        div.onclick = function(){
            //div.style 里面的属性采取驼峰命名法
            // this.style.backgroundColor = 'purple';
            // this.style.colr = '#fff';
            //更改当前元素的类名
            //this.className = 'change';
            //如果想要保留原先的类名,我们可以这么做
            this.className = 'first change';
        }
    </script>
</body>
```

eg:密码框格式提示错误警告
```html
<head>
    <style>
        .message{
            display:inline-block;
            font-size:12px;
            color:#999;
            background:url(images/mess.png) no-repeat left center;
            padding-left:20px;
        }
        .wrong{
            color:red;
            background-image:url(images/wrong.png);
        }
        .right{
            color:green;
             background-image:url(images/right.png);
        }
    </style>
</head>
<body>
    <div>
        <input type="password" class="ipt">
        <p class="message">请输入6~16位密码</p>
    </div>
    <script>
        var ipt = document.querySelector('.ipt');
        var message = document.querySelect('.message');
        //失去焦点
        ipt.onblur = function(){
           //根据表单里面值的长度 ipt.value.length
           if(this.value.length < 6 || this.value.length > 16){
               console.log('错误');
               message.className = 'message wrong';
               message.innerHTML = '您输入的位数不对,要求6~16位';
           }else{
               message.className = 'message right';
               message.innerHTML = '您输入的正确';
           }
        }
    </script>
</body>
```

### 自定义属性操作

#### 1.获取属性值

- `element.属性`  获取属性值
- `element.getAttribute('属性')` 获取属性值

**区别**

- `element.属性`  获取内置属性值(元素本身自带的属性)
- `element.getAttribute('属性')`主要获得自定义的属性(标准),我们程序员自己添加的属性称为自定义属性

```html
<body>
    <div id="demo" index="1"></div>
    <script>
        var div = document.getElementById('demo');
        console.log(div.id);//demo
        console(div.getAttribute('id'));//demo
        console(div.getAttribute('index'));//1
    </script>
</body>
```

#### 2.设置属性值

- `element.属性 = 值` 设置内置属性值
- `element.setAttribute('属性','值')`;

**区别**

- `element.属性 = 值`  设置内置属性值(元素本身自带的属性)
- `element.setAttribute('属性','值')`主要设置自定义的属性(标准)

```html
<body>
    <div id="demo" index="1" class="nav"></div>
    <script>
        var div = document.getElementById('demo');
        div.id = 'test';
        div.className = 'navs';//class特殊，这里面写的是className
        div.setAattribute('index', 2)
        div.setAttribute('class', 'footer');//class特殊，这里面写的就是class,不是className
    </script>
</body>
```

#### 3.移除属性

- `element.removeAttribute('属性')`

```html
<body>
    <div id="demo" index="1" class="nav"></div>
    <script>
        var div = document.getElementById('demo');
        div.removeAttribute('class');
    </script>
</body>
```

### H5自定义属性

自定义属性目的:是为了保存并使用数据,有些数据可以保存到页面中而不用保存到数据库中。

自定义属性获取是通过`getAttribute('属性')`获取,但是有些自定义属性很容易引起歧义,不容易判断是元素内置属性还是自定义属性。

H5给我们新增了自定义属性:

#### 1.设置H5自定义属性

H5规定自定义属性`data-`开头做为属性名并且赋值。

eg:
```html
<div data-index="1"></div>
```
或者使用JS设置
```js
element.setAttribute('data-index',2)
```

#### 2.获取H5自定义属性

- 兼容性获取 `element.getAttribute('data-index')`
- H5新增`element.dataset.index` 或者 `element.dataset[index]`  ie11才开始支持

```html
<div data-index="1" data-list-name='2'></div>
<script>
    var div = document.querySelect('div');
    //dataset 是一个集合里面存放了所有以 data开头的自定义属性
    console.log(div.dataset.index);//1
    console.log(div.dataset['index']);//1

    //如果自定义属性里面有多个-链接的单词,我们获取的时候采取 驼峰命名法
    console.log(div.dataset.listName);//2
</script>
```



## 节点操作

### 1.为什么学习节点操作

获取元素通常使用两种方式:

**1.利用DOM提供的方法获取元素**

- document.getElementById()
- document.getElementsByTagName()
- document.querySelector 等
- 逻辑性不强、繁琐

**2.利用节点层级关系获取元素**

- 利用父子兄弟节点关系获取元素
- 逻辑性强,但是兼容性稍差

### 2.节点概述

网页中的所有内容都是节点(标签、属性、文本、注释等),在DOM中,节点使用node来表示。

HTML DOM树中的所有节点均可以通过JavaScript进行访问,所有HTML元素(节点)均可被修改，也可以创建或删除。

一般地,节点至少拥有`nodeType`(节点类型)、`nodeName`(节点名称)和`nodeValue`(节点值)这三个基本属性。

- 元素节点 nodeType 为 1
- 属性节点 nodeType 为 2
- 文本节点 nodeType 为 3 (文本节点包含文字、空格、换行等)

> 注意：实际开发中,节点操作主要操作的是元素节点

### 3.节点层级

利用DOM树可以把节点划分为不同的层级关系,常见的是**父子兄弟关系**。

#### (1)父级节点 `node.parentNode`

- 得到的是离元素**最近的一个父级节点**,
- 如果找不到父节点就返回为 null

```html
<body>
    <div class="par">
        <div class="box">
            <span class="small">xx</span>
        </div>
     </div>
    <script>
        var small = document.querySelector('.small');
        var box = small.parentNode;//box
        var par = small.parentNode.parentNode;//par
    </script>
</body>
```

#### (2)子节点 `parentNode.childNodes`(标准)

- 返回包含指定节点的子节点的集合,该集合为及时更新的集合
- 注意：返回值里面包含了所有的子节点,包含元素节点、文本节点等等
- 如果只想要获得里面的元素节点,则需要专门处理,所以我们一般不提倡使用`childNodes`

```js
var ul = document.querySelector('ul');
for(var i = 0;i< ul.childNodes.length;i++){
    if(ul.childNodes[i].nodeType == 1){
        // ul.childNodes[i] 是元素节点
        console.log(ul.childNodes[i]);
    }
}
```


#### (3)子节点 `parentNode.children`(非标准)

- 是一个只读属性,返回所有的子元素节点。**它只返回元素节点,其余节点不返回**
- 虽然`children`是一个非标准,但是得到了各个浏览器的支持,因此我们可以放心使用。

eg:
```html
<body>
    <ul>
        <li></li>
        <li></li>
        <li></li>
    </ul>
    <script>
        var ul = document.querySelector('ul');
        //包含 元素节点 文本节点等等
        console.log(ul.childNodes);
        console.log(ul.children);
    </script>
</body>
```

#### (4)第一个子节点 `parentNode.firstChild`

- 返回第一个子节点,找不到则返回null。同样，也是包含所有的节点

#### (5)最后一个子节点 `parentNode.lastChild`

- 返回最后一个子节点,找不到则返回null。同样，也是包含所有的节点

#### (6)第一个子节点 `parentNode.firstElementChild`

- 返回第一个子元素节点,找不到则返回null
- 注意:该方法 IE9以上才支持

#### (7)第一个子节点 `parentNode.lastElementChild`

- 返回最后一个子元素节点,找不到则返回null
- 注意:该方法 IE9以上才支持

#### (8) 实际开发

- 实际开发的写法，既没有兼容性问题又返回第一个子元素

```html
<body>
    <ul>
        <li></li>
        <li></li>
        <li></li>
    </ul>
    <script>
        var ul = document.querySelector('ul');
        console.log(ul.children[0]);
        console.log(ul.children[ul.children.length-1]);
    </script>
</body>
```

#### (10) 兄弟节点 `node.nextSibling`

- 返回当前元素的下一个兄弟节点,找不到则返回null。同样，也是包含所有的节点。

#### (11) 兄弟节点 `node.previousSibling`

- 返回当前元素的上一个兄弟节点,找不到则返回null。同样，也是包含所有的节点。

eg:
```html
<body>
    <div>我是div</div>
    <span>我是span</span>
    <script>
        var div = document.querySelector('div');
        console.log(div.nextSibling);//#text
        console.log(div.previousSibling);//#text
    </script>
</body>
```

#### (12) 兄弟节点 `node.nextElementSibling`

- 返回当前元素的下一个兄弟元素节点,找不到则返回null。
- 注意:该方法 IE9以上才支持

#### (13) 兄弟节点 `node.previousElementSibling`

- 返回当前元素的上一个兄弟元素节点,找不到则返回null。
- 注意:该方法 IE9以上才支持

**兄弟节点如何解决兼容性问题?**

答:自己封装一个兼容性的函数。

```js
function getNextElementSibling(element){
    var el = element;
    while(el = el.nextSibling){
        if(el.nodeType === 1){
            return el;
        }
    }
    return null;
}
```



### 4.创建节点

`document.createElement('tagName')`

该方法创建由`tagName`指定的`HTML`元素。因为这些元素原先不存在,是根据我们的需求动态生成的，所以我们也称为**动态创建元素节点**。


### 5.添加节点

`node.appendChild(child)`

该方法将一个节点添加到指定父节点的子节点列表**末尾**。类似于`css`里面的`after`伪元素。

`node.insertBefore(child,指定元素)`

该方法将一个节点添加到父节点的指定子节点**前面**。类似于`css`里面的`before`伪元素。

eg:
```html
<body>
    <ul></ul>
    <script>
        var ul = document.querySelector('ul');
        var li = document.createElement('li');//创建
        ul.appendChild(li);//添加

        var lili = document.createElement('li');
        ul.insertBefore(lili, ul.children[0]);
    </script>
</body>
```


### 6.复制节点(克隆节点)

`node.cloneNode()`

- 该方法返回调用该方法的节点的下一个副本,也称为克隆节点/拷贝节点。
- 如果括号参数为空或者为`false`,则是浅拷贝，即只克隆复制节点本身，不克隆里面的子节点。
- 如果括号参数为`true`，则是深拷贝,会复制节点本身以及里面所有的子节点。

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
    <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
    </ul>
    <script>
        var ul = document.querySelector('ul');
        var lili = ul.children[0].cloneNode(true);
        ul.appendChild(lili)
    </script>
</body>

</html>
```

### 7.三种动态创建元素的区别

- document.write()
- document.innerHTML
- document.createElement()

**区别**
- document.write 是直接将内容写入页面的内容流,**但是文档流执行完毕,则它会导致页面全部重绘**
```js
var btn = document.querySelector('button');
btn.onclick = function(){
    document.write('<div>111</div>')
}
```
```js
window.onload = function(){
    document.write('<div>111</div>')
}
```
- innerHTML 是将内容写入某个`DOM`节点,不会导致页面全部重绘
- innerHTML 创建多个元素效率更高(不要拼接字符串(3109)，采取数组形式拼接(6))，结构稍微复杂。
```js
var inner = document.querySelector('.inner');
for(var i = 0;i<100;i++){
    inner.innerHTML = '<a href="javascript:;">百度</a>'
}
```

```js
var inner = document.querySelector('.inner');
var arr = [];
for(var i = 0;i<100;i++){
     arr.push('<a href="javascript:;">百度</a>')
}
inner.innerHTML = arr.join('')
```

- createElement() 创建多个元素效率稍微低一点点(17),但是结构更清晰
```js
var ceate = document.querySelector('.ceate');
for(var i = 0;i<100;i++){
    var a = document.createElement('a');
    create.appendChild(a);
}
```


**document.write()**
```js
document.write('<div></div>')
```

**document.innerHTML**
```js
var inner = document.querySelector('.inner');
inner.innerHTML = '<a href="javascript:;">百度</a>'
```

**document.createElement()**
```js
var ceate = document.querySelector('.ceate');
var a = document.createElement('a');
create.appendChild(a);
```

> 总结:不同浏览器下,innerHTML 效率要比 createElement 高
