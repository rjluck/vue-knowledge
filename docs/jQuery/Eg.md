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
            background-color: greenyellow;
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
            <div class="cart-item check-cart-item">
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
                <div class="p-sum">￥100</div>
                <div class="p-action"><a href="javascript:;">删除</a></div>
            </div>
            <div class="cart-item check-cart-item">
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
                <div class="p-sum">￥100</div>
                <div class="p-action"><a href="javascript:;">删除</a></div>
            </div>
            <div class="cart-item check-cart-item">
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
                <div class="p-sum">￥100</div>
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
                <a href="javascript:;" class="clear-all">清理购物车</a>
            </div>
            <div class="toolbar-right">
                <div class="amount-sum">已经选<em>1</em>件商品</div>
                <div class="price-sum">总价:<em>￥100</em></div>
                <div class="btn-area">去结算</div>
            </div>
        </div>
    </div>
    <script>
        $(function () {
            //1.全选 全不选功能模块
            //就是把全选按钮(checkall)的状态赋值给 三个小的input(j-checkbox)
            $(".checkall").change(function () {
                $(".j-checkbox,.checkall").prop("checked", $(this).prop("checked"))
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
            })

            //5.用户修改文本框的值   计算  小计模块
            $(".itxt").change(function () {
                var n = $(this).val();
                var p = $(this).parents(".p-num").siblings(".p-price").text().substr(1);
                var price = (p * n).toFixed(2);//保留2位小数
                //小计模块赋值
                $(this).parents(".p-num").siblings(".p-sum").text("￥" + price)
            })
        })
    </script>
</body>
</html>
```