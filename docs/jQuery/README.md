
#   JQuery

[[toc]]

## JQuery概述


### 1.JavaScript库

仓库:可以把很多东西放到这个仓库里面。找东西只需要到仓库里面查找就可以了。

JavaScript库:即library，是一个封装好的特定的集合(方法和函数)。从封装一大堆函数的角度理解库，就是再这个库中，封装了很多预先定义好的函数在里面，比如动画`animate`、`hide`、`show`,比如获取元素等。

简单理解:就是JS文件,里面对我们原生js代码进行了封装,存放到里面。这样我们可以快速高效使用这些封装好的功能了。

比如`jQuery`,就是为了快速方便的操作`DOM`，里面基本都是函数(方法)。

**常见的JavaScript**库

- jQuery
- Prototype
- YUI
- Dojo
- Ext JS
- 移动端的zepto

这些库都是对原生`JavaSript`的封装,内部都是用JavaScript实现的,我们主要学习的是jQuery。


### 2.jQuery的概念

`jQuery`是一个快速、简洁的`JavaScript`库,其设计的宗旨是"write Less,Do More",即倡导写更少的代码做更多的事情。

`j`就是`JavaScript`,`Query`查询,意思是查询js,把`js`中的`DOM`操作做了封装,我们介意快速的查询使用里面的功能。


`jQuery`封装了`JavaScript`常用的功能代码,优化了`DOM`操作、事件处理、动画设计和`Ajax`交互。


`jQuery`出现的目的是加快前端人员的开发速度,我们可以非常方便的调用和使用它,从而提高开发效率。

**优点**

- 轻量级。核心文件才几十kb,不会影响页面加载速度
- 跨浏览器兼容。基本兼容了现在主流的浏览器
- 链式编程、隐式迭代
- 对事件、样式、动画支持,大大简化了DOM操作
- 支持插件扩展开发。有着丰富的第三方的插件。例如:树形菜单、日期控件、轮播图等
- 免费，开源


## jQuery基本使用

### 1.jQuery基本使用

官网地址:https://jquery.com/

版本:

- 1x:兼容 IE678等低版本浏览器,官网不再更新维护
- 2x:不兼容 IE678等低版本浏览器,官网不再更新维护
- 3x:不兼容 IE678等低版本浏览器,是官方主要更新维护的版本

各个版本的下载地址:http://code.jquery.com/

### 2.jQuery使用步骤

- 引入jQuery文件
- 使用即可


### 3.jQuery的入口函数


方式1:
```js
$(function () {
    //...此处是页面DOM加载完成的入口
});
```

方式2:
```js
$(document).ready(function () {
    //...此处是页面DOM加载完成的入口
})
```

等着`DOM`结构渲染完毕即可执行内部代码,不必等到所有外部资源加载完成，JQuery帮我们完成了封装。

等同于原生JS中的`DOMContentLoaded`事件

不同于原生JS中的`load`事件等页面文档、外部的js文件、`CSS`文件、图片加载完毕才执行内部代码。

推荐使用方式1


### 4.jQuery的顶级对象 $

`$`是`jQuery`的别称,在代码中可以使用`jQuery`代替`$`,但是一般为了方便,通常都直接使用`$`

`$`是`jQuery`的顶级对象,相当于原生`JavaScript`中的`window`。把元素利用`$`包装成`jQuery`对象,就可以调用`jQuery`方法。

eg：
```html
<body>
    <script>
        // $(function () {
        //     $('div').hide();
        // });
        jQuery(function () {
            jQuery('div').hide();
        });
    </script>
    <div></div>
</body>
```

### 5.jQuery对象和DOM对象

- 用原生js获取过来的对象就是DOM对象
- 用jQuery方式获取过来的对象就是jQuery对象
- jQuery对象本质:利用`$`对`DOM`对象包装后产生的对象(伪数组形式存储)
- jQuery对象只能使用jQuery方法,DOM对象则使用原生JavaScript属性和方法

```html
<body>
    <div>111</div>
    <script>
        //1.DOM对象:用原生js获取过来的对象就是DOM对象
        var myDiv = document.querySelector('div');
        console.dir('myDiv', myDiv);
        console.log('myDiv', myDiv);

        //2.jQuery对象:用jQuery方式获取过来的对象就是jQuery对象
        $('div');
        console.dir($('div'))

        //3.jQuery对象只能使用jQuery方法,DOM对象则使用原生JavaScript属性和方法
        //myDiv.style.display = 'none';
        //myDiv.hide();  //myDiv是原生对象，不能使用jQuery对象属性和方法
        //$('div').style.display = 'none';//$('div')是jQuery对象,不能使用原生的属性和方法
    </script>
</body>
```

DOM对象和jQuery对象之间是可以相互转换的










