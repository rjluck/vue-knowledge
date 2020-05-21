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



## 购物车全选










