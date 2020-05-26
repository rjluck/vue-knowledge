# jQuery案例

[[toc]]

## 新浪下拉菜单

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

        li {
            list-style: none;
        }

        .nav {
            margin: 100px 100px;
            width: 300px;
        }

        .nav>li {
            position: relative;
            float: left;
            width: 50px;
            text-align: center;

        }

        .nav>li>a {
            display: inline-block;
            width: 100%;
            height: 100%;
            line-height: 41px;
            color: #333;
            text-decoration: none;
        }

        .nav>li>a:hover {
            background-color: #eee;
        }

        .nav ul {
            display: none;
            position: absolute;
            width: 100%;
            border-left: 1px solid #FECC5B;
            border-right: 1px solid #FECC5B;
        }

        .nav ul li {
            border-bottom: 1px solid #FECC5B;
        }

        .nav ul li:hover {
            background-color: #ccc;
        }
    </style>
</head>

<body>
    <ul class="nav">
        <li>
            <a href="javascript:;">微博</a>
            <ul>
                <li><a href="javascript:;">私信</a></li>
                <li><a href="javascript:;">评论</a></li>
                <li><a href="javascript:;">@我</a></li>
            </ul>
        </li>
        <li>
            <a href="javascript:;">微博</a>
            <ul>
                <li><a href="javascript:;">私信</a></li>
                <li><a href="javascript:;">评论</a></li>
                <li><a href="javascript:;">@我</a></li>
            </ul>
        </li>
        <li>
            <a href="javascript:;">微博</a>
            <ul>
                <li><a href="javascript:;">私信</a></li>
                <li><a href="javascript:;">评论</a></li>
                <li><a href="javascript:;">@我</a></li>
            </ul>
        </li>
    </ul>
    <script>
        $(function () {
            //鼠标经过
            $(".nav>li").mouseover(function () {
                //$(this) 是jQuery 当前元素，this不要加引号
                //show() 显示元素
                $(this).children("ul").show();
            });

            //鼠标离开
            $(".nav>li").mouseout(function () {
                //$(this) 是jQuery 当前元素，this不要加引号
                //hide() 隐藏元素
                $(this).children("ul").hide();
            });
        })
    </script>
</body>

</html>
```


## 淘宝服饰精品

- 核心原理:鼠标经过左侧盒子某个小li,就让内容区盒子相应图片显示,其余图片隐藏
- 需要得到当前小li的索引号,就可以显示对应索引号的图片
- jQuery得到当前元素索引号`$(this).index()`
- 中间对应的图片,可以通过`eq(index)`方法去选择
- 显示元素`show()`  隐藏元素`hide()`

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

        .wrapper {
            width: 350px;
            background-color: red;
            height: 250px;
        }

        #left {
            width: 150px;
            height: 250px;
            background-color: pink;
            float: left;
        }

        #left li {
            height: 40px;
            line-height: 40px;
            text-align: center;
        }

        #content {
            width: 200px;
            height: 250px;
            background-color: greenyellow;
            float: left;
        }
    </style>
</head>

<body>
    <div class="wrapper">
        <ul id="left">
            <li><a href="#">女靴</a></li>
            <li><a href="#">雪地靴</a></li>
            <li><a href="#">冬裙</a></li>
            <li><a href="#">毛衣</a></li>
            <li><a href="#">棉服</a></li>
            <li><a href="#">羽绒服</a></li>
        </ul>
        <div id="content">
            <div>
                <a href="javascript:;"><img src="./images/1.jpg" alt="" width="200" height="250"></a>
            </div>
            <div>
                <a href="javascript:;"><img src="./images/2.jpg" alt="" width="200" height="250"></a>
            </div>
            <div>
                <a href="javascript:;"><img src="./images/3.jpg" alt="" width="200" height="250"></a>
            </div>
            <div>
                <a href="javascript:;"><img src="./images/4.jpg" alt="" width="200" height="250"></a>
            </div>
            <div>
                <a href="javascript:;"><img src="./images/1.jpg" alt="" width="200" height="250"></a>
            </div>
            <div>
                <a href="javascript:;"><img src="./images/2.jpg" alt="" width="200" height="250"></a>
            </div>
        </div>
    </div>
    <script>
        $(function () {
            $("#content div").hide();
            $("#content div").eq(0).show();
            //鼠标经过左侧li
            $("#left li").mouseover(function () {
                //得到当前小li的索引号
                var index = $(this).index();
                console.log(index);
                //让我们左侧盒子相应索引号的图片显示出来就好了
                $("#content div").eq(index).show();
                //让其余的图片隐藏
                $("#content div").eq(index).siblings().hide();
            })
        })
    </script>
</body>

</html>
```



## Tab栏切换

- 点击上部的`li`,当前`li`添加`current`类,其余兄弟移除类。
- 点击的同时，得到li的索引号
- 让下部里面相应索引号的`item`显示,其余的`item`隐藏

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
            list-style: none;
        }

        .tab {
            width: 600px;
            margin: 100px auto;
        }

        .tab_list {
            height: 39px;
            background-color: #ccc;
        }

        .tab_list li {
            float: left;
            height: 39px;
            line-height: 39px;
            padding: 0 20px;
            text-align: center;
            cursor: pointer;
        }

        .tab_list .current {
            background-color: #c81623;
            color: #fff;
        }

        .item {
            display: none;
        }
    </style>
</head>

<body>
    <div class="tab">
        <div class="tab_list">
            <ul>
                <li class="current">商品介绍</li>
                <li>规格与包装</li>
                <li>售后保障</li>
                <li>商品评价</li>
                <li>手机社区</li>
            </ul>
        </div>
        <div class="tab_con">
            <div class="item" style="display:block;">商品介绍模板内容</div>
            <div class="item">规格与包装模板内容</div>
            <div class="item">售后保障模板内容</div>
            <div class="item">商品评价模板内容</div>
            <div class="item">手机社区模板内容</div>
        </div>
    </div>
    <script>
        $(function () {
            $(".tab_list li").click(function () {
                //1.点击上部的li,当前li添加current类,其余兄弟移除类
                $(this).addClass("current").siblings().removeClass("current");//链式编程操作
                //2.点击的同时，得到当前li的索引号
                var index = $(this).index();
                //3.让下部里面的相应索引号的item显示
                $(".tab_con .item").eq(index).show().siblings().hide();
            })
        })
    </script>
</body>

</html>
```

## 简洁版滑动下拉菜单

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

        li {
            list-style: none;
        }

        .nav {
            margin: 100px 100px;
            width: 300px;
        }

        .nav>li {
            position: relative;
            float: left;
            width: 50px;
            text-align: center;

        }

        .nav>li>a {
            display: inline-block;
            width: 100%;
            height: 100%;
            line-height: 41px;
            color: #333;
            text-decoration: none;
        }

        .nav>li>a:hover {
            background-color: #eee;
        }

        .nav ul {
            display: none;
            position: absolute;
            width: 100%;
            border-left: 1px solid #FECC5B;
            border-right: 1px solid #FECC5B;
        }

        .nav ul li {
            border-bottom: 1px solid #FECC5B;
        }

        .nav ul li:hover {
            background-color: #ccc;
        }
    </style>
</head>

<body>
    <ul class="nav">
        <li>
            <a href="javascript:;">微博</a>
            <ul>
                <li><a href="javascript:;">私信</a></li>
                <li><a href="javascript:;">评论</a></li>
                <li><a href="javascript:;">@我</a></li>
            </ul>
        </li>
        <li>
            <a href="javascript:;">微博</a>
            <ul>
                <li><a href="javascript:;">私信</a></li>
                <li><a href="javascript:;">评论</a></li>
                <li><a href="javascript:;">@我</a></li>
            </ul>
        </li>
        <li>
            <a href="javascript:;">微博</a>
            <ul>
                <li><a href="javascript:;">私信</a></li>
                <li><a href="javascript:;">评论</a></li>
                <li><a href="javascript:;">@我</a></li>
            </ul>
        </li>
    </ul>
    <script>
        $(function () {
            //鼠标经过
            // $(".nav>li").mouseover(function () {
            //     //$(this) 是jQuery 当前元素，this不要加引号
            //     $(this).children("ul").slideDown(200);
            // });

            //鼠标离开
            // $(".nav>li").mouseout(function () {
            //     //$(this) 是jQuery 当前元素，this不要加引号
            //     $(this).children("ul").slideUp(200);
            // });

            //1.事件切换 hover 就是鼠标经过和离开的复合写法
            // $(".nav>li").hover(function () {
            //     $(this).children("ul").slideDown(200);
            // }, function () {
            //     $(this).children("ul").slideUp(200);
            // })

            //2.事件切换 hover 如果只写一个函数,那么鼠标经过和离开都会触发这个函数
            $(".nav>li").hover(function () {
                $(this).children("ul").stop().slideToggle();
            })
        })
    </script>
</body>
</html>
```

## 简洁版透明度修改

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="js/jquery.min.js"></script>
    <style>
        * {
            padding: 0;
            margin: 0;
        }

        .wrap {
            width: 600px;
            height: 400px;
            background-color: greenyellow;
            margin: 100px auto;
        }

        .wrap ul li {
            list-style: none;
            width: 198px;
            height: 198px;
            border: 1px solid #ccc;
            float: left;
        }

        .wrap ul li img {
            width: 100%;
            height: 100%;
        }
    </style>
    <script>
        $(function () {

            $(".wrap li").hover(function () {
                //鼠标进入的时候,其他的li标签透明度0.5
                $(this).siblings().stop().fadeTo(400, 0.5)
            }, function () {
                //鼠标离开,其他li透明度改为1
                $(this).siblings().stop().fadeTo(400, 1)
            })
        })
    </script>
</head>
<body>
    <div class="wrap">
        <ul>
            <li><a href="#"><img src="./images/1.jpg" alt=""></a></li>
            <li><a href="#"><img src="./images/2.jpg" alt=""></a></li>
            <li><a href="#"><img src="./images/3.jpg" alt=""></a></li>
            <li><a href="#"><img src="./images/1.jpg" alt=""></a></li>
            <li><a href="#"><img src="./images/1.jpg" alt=""></a></li>
            <li><a href="#"><img src="./images/1.jpg" alt=""></a></li>
        </ul>
    </div>
</body>
</html>
```

## 王者荣耀手风琴效果

- 鼠标经过某个小li有两步操作
- 当前小li宽度变为200px,同时里面的小图片淡出,大图片淡入
- 其余兄弟小li宽度变为69px，小图片淡入,大图片淡出

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="js/jquery.min.js"></script>
    <style>
        * {
            padding: 0;
            margin: 0;
        }

        li {
            list-style: none;
        }

        .king {
            height: 100px;
            width: 520px;
            margin: 0 auto;
            border: 1px solid #ccc;
        }

        .king ul {
            height: 100%;
        }

        .king ul li {
            height: 100%;
            width: 100px;
            position: relative;
            float: left;
            border: 2px solid #ccc;
        }

        .king li.current {
            width: 200px;
        }

        .king li.current .bigImg {
            display: block;
        }

        .king li.current .smallImg {
            display: none;
        }

        .bigImg {
            width: 200px;
            height: 100px;
            border-radius: 5px;
            display: none;
        }

        .smallImg {
            width: 100px;
            height: 100px;
            position: absolute;
            top: 0;
            left: 0;
            border-radius: 5px;
        }
    </style>
    <script>
        $(function () {
            $(".king li").mouseenter(function () {
                $(this).stop().animate({ width: 200 }).find(".smallImg").stop().fadeOut().siblings(".bigImg").stop().fadeIn();
                $(this).siblings().stop().animate({ width: 100 }).find(".smallImg").stop().fadeIn().siblings(".bigImg").stop().fadeOut()
            })
        })
    </script>
</head>
<body>
    <div class="king">
        <ul>
            <li class="current">
                <a href="#">
                    <img class="bigImg" src="./images/2.jpg" alt="">
                    <img class="smallImg" src="./images/2.jpg" alt="">
                </a>
            </li>
            <li>
                <a href="#">
                    <img class="bigImg" src="./images/1.jpg" alt="">
                    <img class="smallImg" src="./images/1.jpg" alt="">
                </a>
            </li>
            <li>
                <a href="#">
                    <img class="bigImg" src="./images/3.jpg" alt="">
                    <img class="smallImg" src="./images/3.jpg" alt="">
                </a>
            </li>
            <li>
                <a href="#">
                    <img class="bigImg" src="./images/4.jpg" alt="">
                    <img class="smallImg" src="./images/4.jpg" alt="">
                </a>
            </li>
        </ul>
    </div>
</body>
</html>
```


## 购物车

### 购物车全选

- 全选思路:里面3个小的复选框按钮(`j-checkbox`)选中状态(`checked`)跟着全选按钮(`checkall`)走。
- 因为`checked`是复选框的固有属性,此时我们需要利用`prop()`方法获取和设置该属性。
- 把全选按钮状态赋值给3小复选框就可以了
- 当我们每次点击小的复选框按钮，就来判断:
- 如果小复选框被选中的个数等于3就应该把全选按钮选上,否则全选按钮不选
- `:checked`选择器   `:checked`查找被选中的表单元素


### 增减商品数量

- 核心思路:首先声明一个变量,当我们点击`+`号,就让这个值`++`，然后赋值给文本框
- 注意1：只能增加本商品的数量,就是当前`+`号的兄弟文本框的值
- 修改表单的值是`val()`方法
- 注意2：这个变量初始值应该是这个文本框的值，在这个值的基础上`++`。要获取表单的值。
- 减号思路同理,但是如果文本框的值是1,就不能再减了

### 修改商品小计

- 核心思路:每次点击`+`号或者`-`号,根据文本框的值乘以当前商品的价格 就是 商品的小计
- 注意1：只能增加本商品的小计,就是当前商品的小计模块
- 修改普通元素的内容是`text()`方法
- 注意2:当前商品的价格,要把`￥`符号去掉再乘  截取字符串`substr(1)`
- `parnets('选择器')`可以返回指定祖先元素
- 最后计算的结果如果想要保留2位小数 通过`toFixed(2)`方法
- 用户也可以直接修改表单里面的值,同样要计算小计.用表单`change`事件
- 用最新的表单内的值 乘以 单价即可，但是还是当前商品小计


### 计算总计和总额

- 核心思路:把所有文本框里面的值相加就是总计数量。总额同理。
- 文本框里面的值不相同，如果想要相加需要`each`遍历，声明一个变量,相加即可
- 点击`+`号`-`号,会改变总计和总额,如果用户修改了文本框里面的值同样会改变总计和总额
- 因此，可以封装一个函数求总额的，以上2个操作调用这个函数即可
- 注意：总计是文本框里面的值相加用`val()`,总额是普通元素的内容用`text()`
- 要注意普通元素里面的内容要去掉`￥`并且转换为数字型才能相加


### 删除商品模块

- 核心思路:把商品`remove()`删除元素即可
- 有3个地方需要删除:1.商品后面的删除按钮 2.删除选中的商品 3.清理购物车
- 商品后面的删除按钮:一定是删除当前的商品，所以从`$(this)`出发


### 选中商品添加背景

- 核心思路:选中的商品添加背景,不选中移除背景即可
- 全选按钮点击:如果全选是选中的,则所有的商品添加背景,否则移除背景
- 小的复选框点击:如果是选中状态,则当前商品添加背景,否则移除背景
- 这个背景,可以通过类名修改,添加类和删除类



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
        * {
            padding: 0;
            margin: 0;
        }

        a {
            text-decoration: none;
        }

        .cart-thead {
            width: 100%;
            height: 45px;
            background-color: #ddd;
        }

        .cart-thead div {
            display: inline-block;
            height: 45px;
            line-height: 45px;
            text-align: center;
        }

        .cart-thead .t-checkbox,
        .t-price,
        .t-sum {
            width: 10%;
        }

        .cart-thead .t-goods {
            width: 40%;
        }

        .cart-thead .t-num,
        .t-action {
            width: 13%;
        }

        /*  */
        .cart-item-list .cart-item {
            width: 100%;
            height: 100px;
            /* background-color: greenyellow; */
            padding-top: 10px;
            border-bottom: 1px solid #ccc;
        }

        .cart-item-list .cart-item div {
            display: inline-block;
            text-align: center;
        }

        .cart-item-list .cart-item .p-checkbox,
        .p-price,
        .p-sum {
            width: 10%;
        }

        .cart-item-list .cart-item .p-goods {
            width: 40%;
        }

        .cart-item-list .cart-item .p-num,
        .p-action {
            width: 13%;
        }

        .itxt {
            width: 9%;
        }

        /*  */
        .cart-floatbar {
            height: 45px;
            background-color: #ddd;
        }

        .cart-floatbar div {
            display: inline-block;
            text-align: center;
        }

        .cart-floatbar .select-all {
            width: 10%;
        }

        .cart-floatbar .operation {
            width: 25%;
            margin-right: 20%;
        }

        .cart-floatbar .toolbar-right {
            width: 42%;

        }

        .cart-floatbar .operation a {
            margin-right: 3%;
        }

        .toolbar-right div {
            margin-right: 2%;
        }

        .toolbar-right .btn-area {
            width: 30%;
            background-color: red;
        }

        /* 背景颜色 */
        .check-cart-item {
            background-color: pink;
        }
    </style>

</head>

<body>
    <div class="cart-wrap">
        <!-- 头部全选框 -->
        <div class="cart-thead">
            <div class="t-checkbox">
                <input type="checkbox" class="checkall">全选
            </div>
            <div class="t-goods">商品</div>
            <div class="t-price">单价</div>
            <div class="t-num">数量</div>
            <div class="t-sum">小计</div>
            <div class="t-action">操作</div>
        </div>
        <!-- 商品详细模块 -->
        <div class="cart-item-list">
            <div class="cart-item">
                <div class="p-checkbox">
                    <input type="checkbox" name="" id="" class="j-checkbox">
                </div>
                <div class="p-goods">
                    <div class="p-img">
                        <img src="" alt="">
                    </div>
                    <div class="p-msg">xxxxxxxxxxxxxxxxx</div>
                </div>
                <div class="p-price">￥12.20</div>
                <div class="p-num">
                    <div class="quantity-form">
                        <a href="javascript:;" class="decrement">-</a>
                        <input type="text" class="itxt" value="1">
                        <a href="javascript:;" class="increment">+</a>
                    </div>
                </div>
                <div class="p-sum">￥12.20</div>
                <div class="p-action"><a href="javascript:;">删除</a></div>
            </div>
            <div class="cart-item">
                <div class="p-checkbox">
                    <input type="checkbox" name="" id="" class="j-checkbox">
                </div>
                <div class="p-goods">
                    <div class="p-img">
                        <img src="" alt="">
                    </div>
                    <div class="p-msg">xxxxxxxxxxxxxxxxx</div>
                </div>
                <div class="p-price">￥12.22</div>
                <div class="p-num">
                    <div class="quantity-form">
                        <a href="javascript:;" class="decrement">-</a>
                        <input type="text" class="itxt" value="1">
                        <a href="javascript:;" class="increment">+</a>
                    </div>
                </div>
                <div class="p-sum">￥12.22</div>
                <div class="p-action"><a href="javascript:;">删除</a></div>
            </div>
            <div class="cart-item">
                <div class="p-checkbox">
                    <input type="checkbox" name="" id="" class="j-checkbox">
                </div>
                <div class="p-goods">
                    <div class="p-img">
                        <img src="" alt="">
                    </div>
                    <div class="p-msg">xxxxxxxxxxxxxxxxx</div>
                </div>
                <div class="p-price">￥12.22</div>
                <div class="p-num">
                    <div class="quantity-form">
                        <a href="javascript:;" class="decrement">-</a>
                        <input type="text" class="itxt" value="1">
                        <a href="javascript:;" class="increment">+</a>
                    </div>
                </div>
                <div class="p-sum">￥12.22</div>
                <div class="p-action"><a href="javascript:;">删除</a></div>
            </div>
        </div>

        <!-- 结算模块 -->
        <div class="cart-floatbar">
            <div class="select-all">
                <input type="checkbox" class="checkall">全选
            </div>
            <div class="operation">
                <a href="javascript:;" class="remove-batch">删除选中的商品</a>
                <a href="javascript:;" class="clear-all">清空购物车</a>
            </div>
            <div class="toolbar-right">
                <div class="amount-sum">已经选<em>0</em>件商品</div>
                <div class="price-sum">总价:<em>￥0</em></div>
                <div class="btn-area">去结算</div>
            </div>
        </div>
    </div>
    <script>
        $(function () {
            getSum();
            //1.全选 全不选功能模块
            //就是把全选按钮(checkall)的状态赋值给 三个小的input(j-checkbox)
            $(".checkall").change(function () {
                $(".j-checkbox,.checkall").prop("checked", $(this).prop("checked"));
                //8.添加背景色
                console.log('$(this).prop("checked")', $(this).prop("checked"))
                if ($(this).prop("checked")) {
                    $(".cart-item").addClass("check-cart-item");
                } else {
                    $(".cart-item").removeClass("check-cart-item");
                }
            })

            //2.反全选
            $(".j-checkbox").change(function () {
                console.log('aaa', $(".j-checkbox:checked").length);
                console.log('aaa', $(".j-checkbox").length);
                if ($(".j-checkbox:checked").length == $(".j-checkbox").length) {
                    $(".checkall").prop("checked", true);
                } else {
                    $(".checkall").prop("checked", false);
                }

                //8.添加背景色
                if ($(this).prop("checked")) {
                    $(this).parents(".cart-item").addClass("check-cart-item");
                } else {
                    $(this).parents(".cart-item").removeClass("check-cart-item");
                }
            })

            //3.增减商品数量模块
            //首先声明一个变量，当我们点击+号，就让这个值++,然后赋值给文本框
            $(".increment").click(function () {
                var n = $(this).siblings('.itxt').val();
                n++;
                $(this).siblings('.itxt').val(n);
                //4.计算小计模块
                //当前商品的单价
                var p = $(this).parent().parent().siblings(".p-price").text();
                p = p.substr(1);
                var price = (p * n).toFixed(2);//保留2位小数
                //小计模块赋值
                $(this).parent().parent().siblings(".p-sum").text("￥" + price)
                getSum();
            })

            $(".decrement").click(function () {
                var n = $(this).siblings('.itxt').val();
                if (n == 1) {
                    return false;
                }
                n--;
                $(this).siblings('.itxt').val(n);
                //4.计算小计模块
                //当前商品的单价
                // var p = $(this).parent().parent().siblings(".p-price").text();
                var p = $(this).parents(".p-num").siblings(".p-price").text();
                p = p.substr(1);
                var price = (p * n).toFixed(2);//保留2位小数
                //小计模块赋值
                $(this).parents(".p-num").siblings(".p-sum").text("￥" + price)
                getSum();
            })

            //5.用户修改文本框的值   计算  小计模块
            $(".itxt").change(function () {
                var n = $(this).val();
                var p = $(this).parents(".p-num").siblings(".p-price").text().substr(1);
                var price = (p * n).toFixed(2);//保留2位小数
                //小计模块赋值
                $(this).parents(".p-num").siblings(".p-sum").text("￥" + price)
                getSum();
            })

            //6.计算总计和总额模块
            function getSum() {
                var count = 0;
                var money = 0;
                $(".itxt").each(function (i, ele) {
                    count += parseInt($(ele).val());
                })
                $(".amount-sum em").text(count);
                $(".p-sum").each(function (i, ele) {
                    money += parseFloat($(ele).text().substr(1));
                })
                $(".price-sum em").text("￥" + money.toFixed(2));
            }

            //7.删除商品模块
            //(1) 商品后面的删除按钮
            $(".p-action a").click(function () {
                $(this).parents(".cart-item").remove();
                getSum();
            })
            //(2) 删除选中的商品
            $(".remove-batch").click(function () {
                // $(".j-checkbox").each(function (i, domEle) {
                //     console.log('domEle', $(domEle).prop("checked"))
                // })
                $(".j-checkbox:checked").parents(".cart-item").remove();
                getSum();
            })
            //(3) 清空购物车 删除全部商品
            $(".clear-all").click(function () {
                $(".cart-item").remove();
                getSum();
            })
        })
    </script>
</body>
</html>
```

## 发布微博

- 点击发布按钮,动态创建一个`li`,放入文本框的内容和删除按钮,并且添加到`ul`中
- 点击删除按钮,可以删除当前的微博留言

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
        .box {
            width: 600px;
            border: 1px solid #ccc;
            margin: 100px auto;
            padding: 30px 30px;
        }

        li {
            display: none;
            border-bottom: 1px solid #ccc;
        }
    </style>
</head>
<body>
    <div class="box" id="weibo">
        <span>发布微博</span>
        <textarea name="" id="" cols="60" rows="10" class="txt"></textarea>
        <button class="btn">发布</button>
        <ul></ul>
    </div>
    <script>
        $(function () {
            //1.点击发布按钮
            $(".btn").on('click', function () {
                var li = $("<li></li>");
                li.html($(".txt").val() + "<a href='javascript:;'>删除</a>");
                $("ul").prepend(li);
                li.slideDown();
                $(".txt").val("");
            })

            //2.点击删除
            $("ul").on('click', 'a', function () {
                $(this).parent().slideUp(function () {
                    $(this).remove();
                });
            })
        })
    </script>
</body>
</html>
```



## 综合案例 toDoList

www.todolist.cn

- 文本框里面输入内容,按下回车，就可以生成待办事项
- 点击待办事项复选框,就可以把当前数据添加到已完成事项里面
- 点击已完成事项复选框,就可以把当前数据添加到待办事项里面
- 但是本页面内容刷新不会丢失

- 刷新页面不会丢失数据,因此需要用到本地存储`localStorage`
- 核心思路:不管按下回车,还是点击复选框,都是把本地存储的数据加载到页面中,这样保证刷新关闭不会丢失数据
- 存储的数据格式:`var todolist = [{title:'xxx',done:false}]`
- 注意点1:本地存储`localStorage`里面只能存储字符串格式,因此需要把对象转换为字符串`JSON.stringify(data)`
- 注意点2：获取本地存储数据,需要把里面的字符串转换为对象格式`JSON.parse()`我们才能使用里面的数据。

### 按下回车把新数据添加到本地存储里面

- 切记:页面中的数据,都要从本地存储里面获取,这样刷新页面不会丢失数据，所以先把数据保存到本地存储里面
- 利用事件对象`keyCode`判断用户按下回车键(13)
- 声明一个数组,保存数据
- 先要读取本地存储原来的数据(声明函数`getData()`),放到这个数组里面。
- 之后把最新从表单获取过来的数据，追加到数组里面
- 最后把数组存储给本地存储(声明函数`saveData()`)

### 本地存储数据渲染加载到页面

- 因为后面也会经常渲染加载操作,所以声明一个函数`load`,方便后面调用
- 先要读取本地存储数据。(数据不要忘记转换为对象格式)
- 之后遍历这个数据(`$.eacn()`),有几条数据,就生成几个小`li`到`ol`
- 每次渲染之前,先把原先里面`ol`的内容清空,然后渲染加载最新的数据

### 删除

- 点击里面的`a`标签,不是删除的`li`,而是删除本地存储对应的数据
- 核心原理:先获取本地存储数据,删除对应的数据,保存给本地存储,重新渲染列表`li`
- 我们可以给链接自定义属性，记录当前的索引号
- 根据这个索引号删除相关的数据--- 数组`splice(i,1)`方法
- 存储修改后的数据,然后存储给本地存储
- 重新渲染加载数据列表
- 因为`a`是动态创建的,我们使用`on`方法绑定事件


### 正在进行和已完成选项操作

- 当我们点击了小的复选框,修改本地存储数据,再重新渲染数据列表
- 点击之后,获取本地存储数据
- 修改对应数据属性`done`为当前复选框的`checked`状态
- 之后保存数据到本地存储
- 重新渲染加载数据列表
- `load`加载函数里面,新增一个条件,如果当前数据的`done`为`true`就是已完成的,就把列表渲染加载到`ul`里面。
- 如果当前数据的`done`为`false`就是待办事项,就把列表渲染加载到`ol`里面

### 统计正在进行和已完成个数

- 在我们`load`函数里面操作
- 声明两个变量:`todoCount`待办个数,`doneCount`已完成个数


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

        header {
            height: 45px;
            background-color: #333;
        }

        section {
            width: 50%;
            margin: 0 auto;
        }

        header section {
            width: 50%;
            height: 45px;
            line-height: 45px;
            background-color: #333;
            margin: 0 auto;
            color: #fff;
        }

        header section label {
            color: #fff;
            font-size: 16px;
            margin-right: 100px;
        }

        header section input {
            width: 30%;
            border: none;
            border: 1px solid #ccc;
            border-radius: 2px;
        }

        li {
            list-style: none;
            border: 1px solid #ccc;
            border-left: 5px solid green;
            height: 30px;
            line-height: 30px;
            padding: 0 10px;
            margin-top: 10px;
        }

        li p {
            display: inline-block;
        }

        li a {
            float: right;
        }

        a {
            text-decoration: none;
        }

        footer {
            margin: 0 auto;
            width: 15%;
            font-size: 12px;
            margin-top: 20px;
        }
    </style>
    <script>
        $(function () {
            //本地存储里面只能存储字符串的数据格式,把我们的数组对象转换为字符串格式  JSON.stringify()
            //location.setItem('todo',JSON.stringify(data))
            //获取本地存储的数据,我们需要把里面的字符串数据转换为  对象格式 JSON.parse()
            //location.getItem('todo',JSON.parse(data))  
            load();
            //按下回车  把完整数据  存储到本地存储里面
            $("#title").on('keydown', function (event) {
                if (event.keyCode === 13) {
                    if ($(this).val() === '') {
                        alert('请输入您要的操作')
                    } else {
                        //按下了回车键
                        //读取本地原来的数据
                        var local = getData();
                        console.log('local: ', local);
                        local.push({ title: $(this).val(), done: false }); //添加新数据到local
                        saveData(local);//存储到本地
                        load();//渲染
                        $(this).val("");
                    }

                }
            })

            //读取本地原来的数据
            function getData() {
                var data = localStorage.getItem("todolist");
                if (data !== null) {
                    return JSON.parse(data)
                } else {
                    return [];
                }
            }

            //保存本地数据
            function saveData(data) {
                var data = localStorage.setItem("todolist", JSON.stringify(data));
            }

            //渲染加载数据
            function load() {
                var data = getData();
                var todoCount = 0;
                var doneCount = 0;
                $("ol").empty();//遍历之前先清空
                $("ul").empty();//遍历之前先清空
                $.each(data, function (i, n) {
                    if (n.done) {
                        doneCount++;
                        $("ul").prepend(`<li><input type='checkbox' checked/><p>${n.title}</p><a href='javascript:;'  id=${i}>删除</a></li>`)
                    } else {
                        todoCount++
                        $("ol").prepend(`<li><input type='checkbox'/><p>${n.title}</p><a href='javascript:;'  id=${i}>删除</a></li>`)
                    }

                })

                $("#todocount").text(todoCount);
                $("#donecount").text(doneCount);
            }

            //3.删除操作
            $("ol,ul").on('click', 'a', function () {
                var data = getData();
                var index = $(this).attr("id");
                data.splice(index, 1);
                saveData(data);
                load();
            });

            //4.正在进行和已完成操作
            $("ol,ul").on("click", "input", function () {
                var data = getData();
                var index = $(this).siblings("a").attr("id");
                data[index].done = $(this).prop("checked");
                saveData(data);
                load();
            })
        })
    </script>
</head>
<body>
    <header>
        <section>
            <label for="title">ToDoList</label>
            <input type="text" id="title" name="title" placeholder="添加ToDo">
        </section>
    </header>
    <section>
        <h2>正在进行 <span id="todocount"></span></h2>
        <ol id="todolist" class="demo-box">
            <li>
                <input type="checkbox" name="" id="">
                <p>111</p>
                <a href="#">删除</a>
            </li>
        </ol>
        <h2>已经完成 <span id="donecount"></span></h2>
        <ul id="donelist">
            <li>
                <input type="checkbox" name="" id="">
                <p>111</p>
                <a href="#">删除</a>
            </li>
        </ul>
    </section>
    <footer>
        CopyRight &copy; 2020 todolist.cn
    </footer>
</body>
</html>
```



## 品优购电梯导航

- 但我们滚动到  某个模块，就让电梯导航显示出来
- 点击电梯导航页面可以滚动到相应内容区域
- 核心算法:因为电梯导航模块和内容区模块是一一对应的
- 当我们点击电梯导航某个小模块,就可以拿到当前小模块的索引号
- 就可以把`animate`要移动的距离求出来:当前索引号内容区模块它的`offset().top`
- 然后执行动画即可


- 但我们点击电梯导航某个小`li`，当前小`li`添加`current`类,兄弟移除类名
- 当我们页面滚动到内容区域某个模块,左侧电梯导航,相对应的小`li`模块,也会添加`current`类,兄弟移除`current`类
- 触发的事件是页面滚动,因此这个功能要写到页面滚动事件里面
- 需要用到`each`,遍历内容区域大模块。`each`里面能拿到内容区域每一个模块元素和索引号
- 判断条件：被卷去的头部大于等于 内容区域里面每个模块的`offset().top`

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

        .fixedtool {
            position: fixed;
            width: 8%;
            top: 100px;
            left: 1%;
            /* margin-left: -776px; */
            background-color: pink;
            display: none;
        }

        .fixedtool li {
            height: 32px;
            line-height: 32px;
            text-align: center;
            font-size: 12px;
            border-bottom: 1px solid #ccc;
            list-style: none;
        }

        .nav1 {
            margin-left: 10%;
            height: 300px;
            background-color: red;
        }

        .nav2 {
            margin-left: 10%;
            height: 300px;
            background-color: violet;
        }

        .nav3 {
            margin-left: 10%;
            height: 300px;
            background-color: green;
        }

        .nav4 {
            margin-left: 10%;
            height: 300px;
            background-color: gray;
        }

        .nav5 {
            margin-left: 10%;
            height: 300px;
            background-color: yellowgreen;
        }

        .nav6 {
            margin-left: 10%;
            height: 300px;
            background-color: orange;
        }

        .container {
            width: 200px;
            height: 2000px;
            background-color: yellow;
        }

        .current {
            background-color: orangered;
        }
    </style>
    <script src="./js/jquery.min.js"></script>
</head>

<body>
    <!-- 固定电梯导航 -->
    <div class="fixedtool">
        <ul>
            <li class="current">家用电器1</li>
            <li>手机通讯2</li>
            <li>家用电器3</li>
            <li>手机通讯4</li>
            <li>手机通讯5</li>
            <li>家用电器6</li>
        </ul>
    </div>
    <div class="floor">
        <div class="nav1">nav1</div>
        <div class="nav2">nav2</div>
        <div class="nav3">nav3</div>
        <div class="nav4">nav4</div>
        <div class="nav5">nav5</div>
        <div class="nav6">nav6</div>
    </div>

    <div class="container"></div>
    <!--  -->
    <script>
        $(function () {
            //当我们点击了小li  此时不需要执行 页面滚动事件里面的li的背景选择
            //节流阀  互斥锁
            var flag = true;
            //1.显示隐藏电梯导航
            var toolTop = $(".nav1").offset().top;
            toggleTool();
            function toggleTool() {
                if ($(document).scrollTop() >= toolTop) {
                    $(".fixedtool").fadeIn();
                } else {
                    $(".fixedtool").fadeOut();
                }
            }

            $(window).scroll(function () {
                toggleTool();
                //3.页面滚动到某个区域,左侧电梯导航小li相应添加和删除current类名
                if (flag) {
                    $(".floor div").each(function (i, ele) {
                        if ($(document).scrollTop() >= $(ele).offset().top) {
                            console.log(i);
                            $(".fixedtool li").eq(i).addClass("current").siblings().removeClass();
                        }
                    })
                }
            })

            //2.点击电梯导航 页面可以滚动到相应内容区域
            $(".fixedtool li").click(function () {
                flag = false;
                //选出对应索引号的内容区的盒子,计算它的offset().top()
                var current = $(".floor div").eq($(this).index()).offset().top;
                //页面动画滚动效果
                $("body,html").stop().animate({
                    scrollTop: current
                }, function () {
                    flag = true;
                });

                //点击之后,让当前小li添加current类名,兄弟移除current类名
                $(this).addClass("current").siblings().removeClass();
            })
        })
    </script>
</body>

</html>
```








