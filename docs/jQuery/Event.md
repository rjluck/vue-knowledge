#   jQuery事件

[[toc]]

## jQuery事件注册

### 单个事件注册

语法:`element.事件(function(){})`

示例:
```js
$("div").click(function(){ 事件处理程序})
```

其他事件和原生基本一致

比如：

- `mouseover`
- `mouseout`
- `blur`
- `focus`
- `change`
- `keydown`
- `keyup`
- `resize`
- `scroll`
- 等

eg:
```html
<body>
    <div></div>
    <script>
        $(function () {
            //1.单个事件注册
            $("div").click(function () {
                $(this).css("background", "red")
            })
            $("div").mouseenter(function () {
                $(this).css("background", "pink")
            })
        })
    </script>
</body>
```


## jQuery事件处理

### 1.事件处理 on() 绑定事件

`on()`方法在匹配元素上绑定一个或多个事件的事件处理函数。

**语法**

`element.on(events,[selector],fn)`

- `events`:一个或多个用空格分隔的事件类型,如`click`或`keydown`。
- `selector`:元素的子元素选择器
- `fn`:回调函数，即绑定在元素身上的倾听函数


**on() 方法优势**

- 可以绑定多个事件,多个处理事件处理程序

```js
    $("div").on({
        mouseover:function(){},
        mouseout:function(){},
        click:function(){}
    })
```
如果事件处理程序相同
```js
    $("div").on("mouseover mouseout",function(){

    })
```

eg:
```js
            $("div").on({
                mouseenter: function () {
                    $(this).css("background", "pink")
                },
                click: function () {
                    $(this).css("background", "red")
                },
                mouseleave: function () {
                    $(this).css("background", "yellow")
                }
            })

            $("div").on("mouseenter mouseleave", function () {
                $(this).toggleClass("current");
            })
```


- 可以事件委派操作。事件委派的定义就是，把原来加给子元素身上的事件绑定在父元素身上,就是把事件委派给父元素。

```js
$(function () {
    $("ul").on("click", "li", function () {
        alert(111)
    })
})
```

在此之前有`bind(),live(),delegate()`等方法来处理事件绑定或者事件委派,最新版本请用`on`代替。

eg:
```html
<body>
    <ul>
        <li>好孩子</li>
        <li>好孩子</li>
        <li>好孩子</li>
        <li>好孩子</li>
        <li>好孩子</li>
    </ul>
    <script>
        $(function () {
            //$("ul li").click();//每一个li都绑定就麻烦了
            //事件绑定在ul上，触发是li,事件冒泡到ul
            $("ul").on("click", "li", function () {
                alert(111)
            })
        })
    </script>
</body>
```

- 动态创建的元素,`click()`没有办法绑定事件,`on()`可以给动态生成的元素绑定事件。

eg:
```html
<body>
    <ul>
        <li>好孩子</li>
        <li>好孩子</li>
        <li>好孩子</li>
        <li>好孩子</li>
        <li>好孩子</li>
    </ul>
    <ol>

    </ol>
    <script>
        $(function () {
            //方式1点击li不会弹出
            // $("ol li").click(function () {
            //     alert(1)
            // })

            //方式2点击li可以弹出,即on可以给未来动态创建的元素绑定事件
            $("ol").on("click", "li", function () {
                alert(11)
            })
            var li = $("<li>后来的</li>");
            $("ol").append(li);
        })
    </script>
</body>
```


### 2.事件处理 off() 解绑事件

`off()`方法可以移除通过`on()`方法添加的事件处理程序。

- `$("p").off()` 解绑p元素所有事件处理程序
- `$("p").off("click")` 解绑p元素上面的点击事件,后面的ffo是侦听函数名
- `$("ul").off("click","li")`  解绑事件委托

> 如果有的事件只想触发一次,可以使用`one()`来绑定事件

`one()`,语法同`on()`,但是只能触发一次

eg:
```html
<body>
    <div></div>
    <ul>
        <li>111</li>
        <li>111</li>
        <li>111</li>
    </ul>
    <p>哈哈哈哈哈哈哈哈哈哈哈哈或</p>
    <script>
        $(function () {
            $("div").on({
                click: function () {
                    console.log("点击了")
                },
                mouseover: function () {
                    console.log("经过了")
                }
            })

            $("ul").on("click", "li", function () {
                alert(1)
            })
            //1.事件解绑 off 
            //$("div").off();//这个是解除了div身上的所有事件
            $("div").off("click");//这个是解除了div身上的点击事件
            $("ul").off("click", "li");//解除事件委托

            //2.one(),语法同on,但是只能触发一次
            $("p").one('click', function () {
                alert(22)
            })
        })
    </script>
</body>
```


### 3.自动触发事件 trigger()

有些事件希望自动触发,比如轮播图自动播放功能跟点击右侧按钮一致。可以利用定时器自动触发右侧按钮点击事件，不必鼠标点击触发。

- `element.click()`  第一种简写形式
- `element.trigger("type")` 第二种触发模式
- `element.triggerHandler("type")`  第三种自动触发模式,不同于前两种的是不会触发元素默认行为

eg:
```html
<body>
    <div></div>
    <input type="text">
    <script>
        $(function () {
            $("div").on("click", function () {
                alert(1111)
            })

            //1.自动触发事件
            // $("div").click();
            // $("div").trigger("click")
            $("div").triggerHandler("click");
            $("input").on("focus", function () {
                $(this).val("你好吗?")
            })

            $("input").triggerHandler("focus");
        })
    </script>
</body>
```






## jQuery事件对象


事件被触发,就会有事件对象的产生。

`element.on(events,[selector],function(event){})`

- 阻止默认行为:`event.preventDefault()` 或者 `return false`
- 阻止冒泡:`event.stopPropagation()`

eg:
```html
<body>
    <div></div>
    <script>
        $(function () {
            $(document).on("click", function (event) {
                // console.log("事件对象", event)
                console.log(点击了document);
            })

            $("div").on("click", function (event) {
                // console.log("事件对象", event)
                console.log(点击了div);
                event.stopPropagation();
            })
        })
    </script>
</body>
```