#   jQuery常用API

[[toc]]

## jQuery选择器

### 1.基本选择器

原生JS获取元素方式很多,复杂,而且兼容性情况不一致，因此`jQuery`给我们做了封装，使获取元素统一标准。

语法格式:`$("选择器")`

里面选择器直接写CSS选择器即可,但是要加引号。

名称 | 用法 | 描述
---|---|---
ID选择器 | $("#id") | 获取指定ID的元素
全选选择器 | $("*") | 匹配所有元素
类选择器 | $(".class") | 获取同一类class的元素
类选择器 | $(".class") | 获取同一类class的元素
标签选择器 | $("div") | 获取同一标签的所有元素
并集选择器 | $("div,p,li") | 获取多个元素
交集选择器 | $("li.current") | 交集元素

### 2.层级选择器

名称 | 用法 | 描述
---|---|---
子代选择器 | $("ul>li") | 使用>号，获取亲儿子层级的元素;注意，并不会获取孙子层级的元素
后代选择器 | $("ul li") | 使用空格,代表后代选择器,获取ul下的所有li元素,包括孙子等


### 3.隐式迭代(重点)

遍历内部DOM元素(伪数组形式存储)的过程就叫做隐式迭代。

简单理解:给匹配到的所有元素进行循环遍历，执行相应的方法,而不用我们再进行循环，简化我们的操作，方便我们调用。

eg:
```html
<body>
    <div>111</div>
    <div>111</div>
    <div>111</div>
    <div>111</div>
    <div>111</div>
    <script>
        $("div").css("background", "pink");
        //隐式迭代就是把匹配的所有元素内部进行遍历循环,给每一个元素添加css这个方法
    </script>
</body>
```

### 4.筛选选择器

语法 | 用法 | 描述
---|---|---
:first | $("li:first") | 获取第一个li元素
:last | $("li:last") | 获取最后一个li元素
:eq(index) | $("li:eq(2)") | 获取到的li元素中，选择索引号为2的元素,索引号index从0开始
:odd | $("li:odd") | 获取到的li元素中，选择索引号为奇数的元素
:even | $("li:even") | 获取到的li元素中，选择索引号为偶数的元素

eg：
```js
  $(function () {
            $("ul li:first").css("color", red)
            $("ul li:eq(2)").css("color", blue)
            $("ul li:odd").css("color", yellow)
            $("ul li:even").css("color", pink)
})
```


### 5.筛选方法(重点)

语法 | 用法 | 说明
---|---|---
parent() | $("li").parent() | 查找父级
children(selector) | $("ul").children("li") | 相当于$("ul>li"),最近一级(亲儿子)
find(selector) | $("ul").find("li") | 相当于$("ul li"),后代选择器
siblings(selector) | $(".first").siblings("li") | 查找兄弟节点,不包括自己本身
nextAll([expr]) | $(".first").nextAll() | 查找当前元素之后所有的同辈元素
prevAll([expr]) | $(".last").prevAll() | 查找当前元素之前所有的同辈元素
hasClass(class) | $("div").hasClass("protected") | 检查当前的元素是否含有某个特定的类,如果有，则返回true
eq(index) | $("li").eq(2) | 相当于$("li:eq(2)"),index从0开始


eg:
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <div class="current"></div>
    <div></div>
    <ol>
        <li>111</li>
        <li class="item">111</li>
        <li>1111</li>
        <li>111</li>
    </ol>
    <script>
        $(function () {
            //1.查找兄弟元素
            $("ol .item").siblings("li").css("color", "red");
            //2.第n个元素
            //(1)利用选择器的方式选择
            $("ol li:eq(2)").css("color", "blue");
            //(2)利用选择方法的方式选择--推荐
            $("ol li").eq(2).css("color", "blue");

            //3.判断是否有某个类名
            $("div:first").hasClass("current");//true
            $("div:last").hasClass("current");//false
        })
    </script>
</body>

</html>
```


### 6.排他思想

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="./js/jquery.min.js"></script>
</head>

<body>
    <button>按钮</button>
    <button>按钮</button>
    <button>按钮</button>
    <button>按钮</button>
    <button>按钮</button>
    <button>按钮</button>
    <button>按钮</button>
    <script>
        $(function () {
            //隐式迭代,给所有的按钮都绑定了点击事件
            $("button").click(function () {
                //当前元素变化背景颜色
                $(this).css("background", "pink")
                //其余的兄弟去掉背景颜色  隐式迭代
                $(this).siblings("button").css("background", "")
            })
        })
    </script>
</body>

</html>
```




## jQuery样式操作

### 1.操作CSS方法

jQuery可以使用css方法来修改简单元素样式;也可以操作类,修改多个样式。

1.参数只写属性名,则是返回属性值

```js
$(this).css("color")
```

2.参数是**属性名**,**属性值**,**逗号分隔**,是设置一组样式，**属性必须加引号**,值如果是数字可以不用跟单位和引号

```
$(this).css("color","red")
```

3.参数可以是对象形式,方便设置多组样式。属性名和属性值用冒号隔开，属性可以不用加引号，

如果是复合属性则必须采取驼峰命名法，如果值不是数字，需要加引号
```js
$(this).css({"color":"white","fontSize":"20px"})
```

### 2.设置类样式方法

作用等同于以前的`classList`,可以操作类样式,注意操作类里面的参数不要加点。

#### (1)添加类

```js
$('div').addClass("current");
```


#### (2)删除类

```js
$('div').removeClass("current");
```

#### (3)切换类

```js
$('div').toggleClass("current");
```

eg:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="./js/jquery.min.js"></script>
    <style>
        * {
            padding: 0;
            margin: 0;
        }

        a {
            text-decoration: none;
        }

        li {
            list-style: none;
        }

        .current {
            background-color: red;
        }

        div {
            height: 100px;
            width: 100px;
            background-color: greenyellow;
            transition: all 0.5s;
        }

        .removeborder {
            border: 5px solid #ccc;
        }

        .rotate {
            transform: rotate(360deg);
        }
    </style>
</head>

<body>
    <div class="removeborder"></div>
    <script>
        $(function () {
            $("div").click(function () {
                $(this).addClass("current"); //添加类
                $(this).removeClass("removeborder"); //删除类
                $(this).toggleClass("rotate"); //切换类
            })
        })
    </script>
</body>
</html>
```

### 3.类操作与className区别

原生JS中className会覆盖元素原先里面的类名。

```html
<body>
    <div class="one"></div>
    <script>
        var one = document.querySelector(".one");
        one.className = "two";
    </script>
</body>
```

`jQuery`里面类操作只是对指定类进行操作,不影响原先的类名.

```html
<body>
    <div class="one"></div>
    <script>
        $(".one").addClass('two');//addClass追加类名,不影响以前的类名
        $(".one").removeClass('one');//removeClass删除指定类名,不影响其他的类名
    </script>
</body>
```




## jQuery效果

`jQuery`给我们封装了很多动画效果,最常见的如下:

显示隐藏

- show()
- hide()
- toggle()

滑动

- slideDown()
- slideUp()
- slideToggle()

淡入淡出

- fadeIn()
- fadeOut()
- fadeToggle()
- fadeTo()

自定义动画

- animate()

### 1.显示隐藏效果

#### 显示语法规范

`show([speed],[easing],[fn])`


#### 隐藏语法规范

`hide([speed],[easing],[fn])`


#### 切换语法规范

`toggle([speed],[easing],[fn])`


#### 显示/隐藏/切换参数

- 参数都可以省略,无动画直接显示
- `speed`:三种预定速度之一的字符串(`show`,`normal`,`fast`)或表示动画时长的毫秒数值(如:1000)
- `easing`:(Optional)用来指定切换效果,默认是`swing`,可用参数`linear`。
- `fn`:回调函数,在动画完成时执行函数,每个函数执行一次

eg：
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="js/jquery.min.js"></script>
    <style>
        div {
            height: 100px;
            width: 100px;
            background-color: greenyellow;
        }
    </style>
</head>

<body>
    <button>显示</button>
    <button>隐藏</button>
    <button>切换</button>
    <div></div>
    <script>
        $(function () {
            //
            $("button").eq(0).click(function () {
                $("div").show(1000, function () {
                    alert(1)
                })
            })
            $("button").eq(1).click(function () {
                //$("div").hide("fast")
                $("div").hide(1000, function () {
                    alert(1)
                })
            })
            $("button").eq(2).click(function () {
                $("div").toggle(1000)
            })
        })
    </script>
</body>
</html>
```

> 一般情况下，我们都不加参数直接显示隐藏就可以了



### 2.滑动效果

#### 下滑效果语法规范

`slideDown([speed],[easing],[fn])`

#### 上滑效果语法规范

`slideUp([speed],[easing],[fn])`


#### 滑动切换效果语法规范

`slideToggle([speed],[easing],[fn])`


#### 下滑/上滑/滑动切换效果语法规范

- 参数都可以省略
- `speed`:三种预定速度之一的字符串(`show`,`normal`,`fast`)或表示动画时长的毫秒数值(如:1000)
- `easing`:(Optional)用来指定切换效果,默认是`swing`,可用参数`linear`。
- `fn`:回调函数,在动画完成时执行函数,每个函数执行一次

eg:
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="js/jquery.min.js"></script>
    <style>
        div {
            height: 200px;
            width: 100px;
            background-color: greenyellow;
        }
    </style>
</head>

<body>
    <button>下拉滑动</button>
    <button>上拉滑动</button>
    <button>切换滑动</button>
    <div></div>
    <script>
        $(function () {
            $("button").eq(0).click(function () {
                $("div").slideDown();//下滑
            })
            $("button").eq(1).click(function () {
                $("div").slideUp();//上拉
            })
            $("button").eq(2).click(function () {
                $("div").slideToggle(500);//滑动切换
            })
        })
    </script>
</body>
</html>
```


### 3.事件切换

`hover([over],out)`

- `over`:鼠标移到元素上要触发的函数(相当于`mouseenter`)
- `out`:鼠标移出元素要触发的函数(相当于`mouseleave`)






## jQuery属性操作
## jQuery文本属性值
## jQuery元素操作
## jQuery尺寸、位置操作