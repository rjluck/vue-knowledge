# 移动端特效案例

[[toc]]

## 移动端轮播图

移动端轮播图功能基本和PC端一致

可以自动播放图片

- 开启定时器
- 移动端移动,可以使用`translate`移动
- 想要图片优雅的移动,请添加过渡效果
- 无缝滚动
- 注意：我们判断条件是要等到图片滚动完毕再去判断,就是过渡完成后判断
- 此时需要添加检测过渡完成事件 `transitionend`
- 判断条件:如果索引号等于3说明走到最后一张图片,此时索引号要复原为0
- 此时图片,去掉过渡效果,然后移动
- 如果索引号小于0,说明是倒着走,索引号等于2
- 此时图片去掉过渡效果，然后移动



小圆点跟随变化效果

- 把`ol`里面`li`带有`current`类名的选出来去掉类名`remove`
- 让当前索引号的小`li`加上`current` 加类名`add`


手指可以拖动播放轮播图 

- 本质上就是ul跟随手指移动,简单说就说移动端拖动元素
- 触摸元素`touchstart`：获取手指初始坐标
- 移动手指`touchmove`：计算手指的滑动距离,并且移动盒子
- 离开手指`touchend`: 根据滑动的距离分不同的情况
- 如果移动距离小于某个像素,就回弹原来的位置
- 如果移动距离大于某个像素就向下一张滑动

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

        li {
            list-style: none;
        }

        .box {
            position: relative;
            padding-top: 44px;
            width: 100%;
            height: 300px;
            background-color: pink;
            overflow: hidden;
        }

        .box ul {
            /* 清除浮动 */
            overflow: hidden;
            width: 500%;
            margin-left: -100%;
        }

        .box ul li {
            width: 20%;
            height: 300px;
            float: left;
        }

        .box ul li img {
            height: 300px;
            width: 100%;
        }

        .box ol {
            position: absolute;
            bottom: 5px;
            right: 5px;
            margin: 0;
        }

        .box ol li {
            display: inline-block;
            width: 5px;
            height: 5px;
            background-color: #000;
            border-radius: 2px;
            transition: all .3s;
        }

        .box ol li.current {
            width: 15px;
        }
    </style>
    <script src="./test.js"></script>
</head>

<body>
    <div class="box">
        <ul>
            <!-- 手动拖拽1会显示1前面的图片，所以在1前加了3 -->
            <li><img src="./images/3.jpg" alt=""></li>
            <!--  -->
            <li><img src="./images/1.jpg" alt=""></li>
            <li><img src="./images/2.jpg" alt=""></li>
            <li><img src="./images/3.jpg" alt=""></li>
            <!-- 为了无缝链接在末尾加了1 -->
            <li><img src="./images/1.jpg" alt=""></li>
        </ul>
        <!-- 小圆点 -->
        <ol>
            <li class="current"></li>
            <li></li>
            <li></li>
        </ol>
    </div>
    <script>

    </script>
</body>

</html>
```

```js
// test.js
window.addEventListener('load', function () {
    console.log('1111')
    var box = document.querySelector('.box');
    var ul = box.children[0];
    var w = box.offsetWidth;
    var ol = box.children[1];


    //1.利用定时器自动轮播图片
    var index = 0;
    var timer = setInterval(function () {
        index++;
        var translatex = -index * w;
        ul.style.transition = 'all .3s';//过渡
        ul.style.transform = 'translateX(' + translatex + 'px)';

    }, 2000);

    //等着我们过渡完成之后,再去判断,监听过渡完成的事件 transitionend
    ul.addEventListener('transitionend', function () {
        //过渡结束完执行，开始无缝滚动
        if (index >= 3) {
            index = 0;
            ul.style.transition = 'none';//去掉过渡效果,这样让我们的ul快速的跳到目标位置
            //利用最新的索引号乘以宽度 去滚动图片
            var translatex = -index * w;
            ul.style.transform = 'translateX(' + translatex + 'px)';
        } else if (index < 0) {
            index = 2;
            ul.style.transition = 'none';//去掉过渡效果,这样让我们的ul快速的跳到目标位置
            //利用最新的索引号乘以宽度 去滚动图片
            var translatex = -index * w;
            ul.style.transform = 'translateX(' + translatex + 'px)';
        }
        //2.小圆点跟随变化
        //把ol里面li带有current 类名的选出来去掉类名 remove
        ol.querySelector('li.current').classList.remove('current');
        //让当前索引号的小li加上current add
        ol.children[index].classList.add('current');
    })


    //3.手指滑动轮播图
    var startX = 0;//获取手指初始坐标
    var moveX = 0;//手指移动距离
    var flag = false;//严禁操作，触摸未移动就离开DOM

    ul.addEventListener('touchstart', function (e) {
        startX = e.targetTouches[0].pageX;
        clearInterval(timer);
    })

    ul.addEventListener('touchmove', function (e) {
        moveX = e.targetTouches[0].pageX - startX;

        //移动盒子：盒子原来的位置 + 手指移动的距离
        var translatex = -index * w + moveX;
        //手指拖动的时候,不需要动画效果，所以取消过渡效果
        ul.style.transition = 'none';//过渡
        ul.style.transform = 'translateX(' + translatex + 'px)';
        flag = true;
        e.preventDefault();//阻止滚动屏幕的行为

    })

    //手指离开  根据移动距离去判断是回弹还是播放下一张
    ul.addEventListener('touchend', function (e) {
        if (flag) {
            //(1) 如果移动距离大于50px 我们就播放上一张或者下一张
            if (Math.abs(moveX) > 50) {
                //如果右滑 moveX是正值 播放上一张
                if (moveX > 0) {
                    index--;
                } else {
                    //如果左滑 moveX是负值 播放下一张
                    index++;
                }
                var translatex = -index * w;
                ul.style.transition = 'all .3s';//过渡
                ul.style.transform = 'translateX(' + translatex + 'px)';
            } else {
                //(2) 如果移动距离小于50px 我们就回弹    
                var translatex = -index * w;
                ul.style.transition = 'all .3s';//过渡
                ul.style.transform = 'translateX(' + translatex + 'px)';
            }
        }



        //手指离开重新开启定时器
        clearInterval(timer);
        timer = setInterval(function () {
            index++;
            var translatex = -index * w;
            ul.style.transition = 'all .3s';//过渡
            ul.style.transform = 'translateX(' + translatex + 'px)';

        }, 2000);


    })
})
```


## 返回顶部

当页面滚动到某个地方,就显示，否则隐藏,点击可以返回顶部

案例分析

- 滚动某个地方显示
- 事件:`scroll`页面滚动事件
- 如果被卷去的头部`window.pageYOffset`大于某个数值
- 点击,`window.scroll(0,0)`返回顶部


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

        li {
            list-style: none;
        }

        .nav {
            height: 200px;
            width: 100%;
            background-color: pink;
            overflow: auto;
        }

        .box2 {
            height: 1000px;
            width: 100%;
            background-color: greenyellow;
            overflow: auto;
        }



        .goBack {
            display: none;
            position: fixed;
            bottom: 50px;
            right: 20px;
            width: 38px;
            height: 40px;
            background-color: purple;
            color: #fff;
            text-align: center;
        }
    </style>
    <script src="./test.js"></script>
</head>

<body>
    <!-- 返回顶部模块 -->
    <div class="goBack">返回顶部</div>
    <div class="nav">
    </div>
    <div class="box2">
    </div>
</body>

</html>
```

```js
// test.js
window.addEventListener('load', function () {

    var goBack = document.querySelector('.goBack');
    var box2 = document.querySelector('.box2');
    window.addEventListener('scroll', function (e) {
        if (window.pageYOffset >= box2.offsetTop) {
            goBack.style.display = 'block';
        } else {
            goBack.style.display = 'none';
        }
    })

    goBack.addEventListener('click', function () {
        window.scroll(0, 0)
    })
})
```


## 移动端视频插件 zy.media.js 练习

H5给我们提供了video标签,但是浏览器的支持情况不同。

```html
<video src="mov.mp4" controls></video>
```

不同的视频格式文件，我们可以通过source解决。

但是外观样式,还有暂停,播放，全屏等功能我们只能自己写代码解决。

这个时候我们可以使用插件方式来制作。

https://github.com/ireaderlab/zyMedia














