# PC端网页特效案例

[[toc]]

## 获取鼠标在盒子内的坐标

- 我们在盒子内点击,想要得到鼠标距离盒子左右的距离
- 首先得到鼠标在页面中的坐标(e.pageX,e.pageY)
- 其次得到盒子在页面中的距离(box.offsetLeft,box.offsetTop)
- 用鼠标距离页面的坐标减去盒子在页面中的距离,得到鼠标在盒子内的坐标
- 如果想要移动一下鼠标,就要获取最新的坐标,使用鼠标移动事件`mousemove`

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

        .box {
            width: 200px;
            height: 200px;
            background-color: skyblue;
        }
    </style>
</head>

<body>

    <div class="box"></div>
    <script>
        var box = document.querySelector('.box');
        box.addEventListener('click', function (e) {
            console.log(e.pageX)
            console.log(e.pageY)
            console.log(box.offsetLeft);
            console.log(box.offsetTop);
            var x = e.pageX - this.offsetLeft;
            var y = e.pageY - this.offsetTop;
            this.innerHTML = 'x坐标是' + x + 'y坐标是' + y;
        })
    </script>
</body>

</html>
```


## 模态框拖拽

弹出框,我们也称为模态框

- 点击弹出层,会弹出模态框,并且显示灰色半透明的这遮挡层
- 点击关闭按钮,可以关闭模态框,并且同时关闭灰色半透明遮挡层
- 鼠标放到模态框最上面一行,可以按住鼠标拖拽模态框在页面中移动
- 鼠标松开,可以停止拖拽模态框移动

案例分析

- 点击弹出层,模态框和遮挡层就会显示出来`display:block`
- 点击关闭按钮,模态框和遮挡层就会隐藏起来`display:none`
- 在页面中拖拽的原理:鼠标按下并且移动,之后松开鼠标
- 触发事件是鼠标按下`mousedown`，鼠标移动`mousemove`,鼠标松开`mouseup`
- 拖拽过程:鼠标移动过程中,获得最新的值赋值给模态框的`left`和`top`值,这样模态框就可以跟着鼠标走了
- 鼠标按下触发的事件源是最上面一行,就是`id`为`title`
- 鼠标的坐标减去鼠标在盒子内的坐标，才是模态框真正的位置
- 鼠标按下,我们要得到鼠标在盒子的坐标
- 鼠标移动,就让模态框的坐标设置为:鼠标坐标减去盒子坐标即可，注意移动事件写到按下事件里面
- 鼠标松开,就停止拖拽,就是可以让鼠标移动事件解除

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

        .login {
            display: none;
            width: 512px;
            height: 280px;
            position: fixed;
            border: #ebebeb solid 1px;
            left: 50%;
            top: 50%;
            background-color: #fff;
            box-shadow: 0px 0px 20px #ddd;
            z-index: 9999;
            transform: translate(-50%, -50%);
        }

        .login-title {
            width: 100%;
            margin: 10px 0px 0px 0px;
            text-align: center;
            line-height: 40px;
            height: 40px;
            font-size: 18px;
            position: relative;
        }

        a {
            text-decoration: none;
            color: #000;
        }

        .login-bg {
            display: none;
            width: 100%;
            height: 100%;
            position: fixed;
            top: 0px;
            left: 0px;
            background: rgba(0, 0, 0, .3)
        }

        .login-title {
            width: 100%;
            margin: 10px 0px 0px 0px;
            text-align: center;
            line-height: 40px;
            height: 40px;
            font-size: 18px;
            position: relative;
            cursor: move;
        }

        .login-input-content {
            margin-top: 20px;
        }

        .login-button {
            width: 50%;
            margin: 30px auto 0px auto;
            line-height: 40px;
            font-size: 14px;
            border: #ebebeb 1px solid;
            text-align: center;
        }

        .login-button a {
            display: block;
        }

        .login-input input.list-input {
            float: left;
            line-height: 35px;
            height: 35px;
            width: 350px;
            border: #ebebeb 1px solid;
            text-indent: 5px;
        }

        .login-input {
            overflow: hidden;
            margin: 0px 0px 20px 0px;
        }

        .login-input label {
            float: left;
            width: 90px;
            padding-right: 10px;
            text-align: right;
            line-height: 35px;
            height: 35px;
            font-size: 14px;
        }

        .login-title span {
            position: absolute;
            font-size: 12px;
            right: -20px;
            top: -30px;
            background-color: #fff;
            border: #ebebeb solid 1px;
            width: 40px;
            height: 40px;
            border-radius: 20px;
        }
    </style>
</head>

<body>
    <div class="login-header"><a id="link" href="javascript:;">点击,弹出登录框</a></div>
    <!--  -->
    <div id="login" class="login">
        <div id="title" class="login-title">登录会员
            <span><a id="closeBtn" href="javascript:;" class="close-login">关闭</a></span>
        </div>
        <div class="login-input-content">
            <div class="login-input">
                <label>用户名:</label>
                <input type="text" placeholder="请输入用户名" name="info[username]" id="username" class="list-input">
            </div>
            <div class="login-input">
                <label>登录密码:</label>
                <input type="password" placeholder="请输入登录密码" name="info[password]" id="password" class="list-input">
            </div>
        </div>
        <div id="loginBtn" class="login-button"><a href="javascript:;" id="login-button-submit">登录会员</a></div>
    </div>
    <!-- 遮盖层 -->
    <div id="bg" class="login-bg"></div>
    <script>
        var login = document.querySelector('.login');
        var mask = document.querySelector('.login-bg');
        var link = document.querySelector('#link');
        var closeBtn = document.querySelector('#closeBtn');
        var title = document.querySelector('#title');
        console.log('title', title)
        link.addEventListener('click', function () {
            mask.style.display = 'block';
            login.style.display = 'block';
        })

        closeBtn.addEventListener('click', function () {
            mask.style.display = 'none';
            login.style.display = 'none';
        })
        //开始拖拽
        //(1)当我们鼠标按下,就获得鼠标在盒子内的坐标
        title.addEventListener('mousedown', function (e) {
            var x = e.pageX - login.offsetLeft;//鼠标在盒子内的x坐标
            var y = e.pageY - login.offsetTop;//鼠标在盒子内的y坐标
            function move(e) {
                login.style.left = e.pageX - x + 'px';
                login.style.top = e.pageY - y + 'px';
            }
            //鼠标移动时候,把鼠标在页面中的坐标 减去 鼠标在盒子中的坐标 就是模态框的left和top值
            document.addEventListener('mousemove', move)

            //鼠标弹起,就让鼠标移动事件移除
            document.addEventListener('mouseup', function () {
                console.log('11111')
                document.removeEventListener('mousemove', move)
            })
        })
    </script>
</body>

</html>
```

## 仿京东放大镜

- 整个案例可以分为三个功能模块
- 鼠标经过小图片盒子,遮挡层和大图片盒子显示,离开隐藏2个盒子功能
- 遮挡层跟随鼠标功能
- 移动遮挡层,大图片跟随移动功能

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .small {
            width: 200px;
            height: 200px;
            border: #ccc 1px solid;
            position: relative;
        }

        .small img {
            width: 100%;
            height: 100%;
        }

        .small .mask {
            width: 100px;
            height: 100px;
            background-color: #000;
            opacity: 0.2;
            position: absolute;
            top: 0;
            left: 0;
            cursor: move;
            display: none;
        }

        .big {
            height: 400px;
            width: 400px;
            border: 1px solid #ccc;
            position: absolute;
            top: 0px;
            left: 210px;
            z-index: 999;
            display: none;
            overflow: hidden;
        }

        .big img {
            position: absolute;
            top: 0;
            left: 0;
        }
    </style>
</head>

<body>
    <div class="small">
        <img src="./images/1.jpg" alt="">
        <div class="mask"></div>
    </div>
    <div class="big">
        <img src="./images/1.jpg" alt="" class="bigImg">
    </div>
    <script>
        var small = document.querySelector('.small');
        var mask = document.querySelector('.mask');
        var big = document.querySelector('.big');
        //鼠标经过
        small.addEventListener('mouseover', function () {
            mask.style.display = 'block';
            big.style.display = 'block';
        })

        //鼠标离开
        small.addEventListener('mouseout', function () {
            mask.style.display = 'none';
            big.style.display = 'none';
        })

        //鼠标移动
        small.addEventListener('mousemove', function (e) {
            //（1）先计算鼠标在盒子中的坐标
            var x = e.pageX - this.offsetLeft;
            var y = e.pageY - this.offsetTop;
            //(2) 减去mask高度的一半 宽度的一半
            //(3)在小盒子内移动
            var maskX = x - mask.offsetWidth / 2;
            var maskY = y - mask.offsetHeight / 2;

            // //(3)在小盒子内移动
            if (maskX <= 0) {
                maskX = 0;
            } else if (maskX >= small.offsetWidth - mask.offsetWidth) {
                maskX = small.offsetWidth - mask.offsetWidth;
            }

            if (maskY <= 0) {
                maskY = 0;
            } else if (maskY >= small.offsetHeight - mask.offsetHeight) {
                maskY = small.offsetHeight - mask.offsetHeight;
            }
            mask.style.left = maskX + 'px';
            mask.style.top = maskY + 'px';
            //大图片的移动距离 = 遮挡层移动的距离 * 大图片最大移动距离 / 遮挡层的最大移动距离
            var maskMaxW = small.offsetWidth - mask.offsetWidth;//遮挡层的最大移动距离
            var maskMaxH = small.offsetHeight - mask.offsetHeight;//遮挡层的最大移动距离
            var bigIMg = document.querySelector('.bigImg');
            var bigMaxW = bigIMg.offsetWidth - big.offsetWidth;//大图片最大x移动距离 
            var bigMaxH = bigIMg.offsetHeight - big.offsetHeight;//大图片最大y移动距离 
            var bigX = maskX * bigMaxW / maskMaxW; //大图片的移动距离X
            var bigY = maskY * bigMaxH / maskMaxH;//大图片的移动距离Y

            bigIMg.style.left = -bigX + 'px';
            bigIMg.style.top = -bigY + 'px';
        })
    </script>
</body>

</html>
```


## 淘宝flexible.js源码分析

知识点补充:
```js
window.addEventListener('load', function (e) {
})
```
下面3种情况都会刷新页面会触发`load`事件

- `a`标签的超链接
- `F5`或者刷新按钮(强制刷新)
- 前进或后退按钮

但是,火狐中有个特点,有个“往返缓存”,这个缓存中不仅保留着页面数据,还保存了`DOM`和`JavaScript`的状态,实际上是将整个页面都保存在了内存里。

所以此时后退按钮不能刷新页面

此时，可以使用`pageshow`事件来触发,这个事件在页面显示时触发,无论页面是否来自缓存。在重新加载页面中,`pageshow`会在`load`事件触发后触发;根据事件对象中的`persisted`来判断是否是缓存中的页面触发的`pageshow`事件,注意这个事件给`window`添加。

```js
(function (window, document) {
            //获取的html的根元素
            var docEl = document.documentElement;
            //dpr 物理像素比
            var dpr = window.devicePixelRatio || 1;//移动端是2 PC端是1
            console.log(' window.devicePixelRatio', window.devicePixelRatio)
            //设置body的字体大小
            function setBodyFontSize() {
                //如果页面中有body这个元素,就设置body的字体大小
                if (document.body) {
                    document.body.style.fontSize = (12 * dpr) + 'px';
                } else {
                    //如果页面中没有body这个元素,则等着我们页面主要的DOM元素加载完毕再去设置body的字体大小
                    document.addEventListener('DOMContentLoaded', setBodyFontSize)
                }
            }
            setBodyFontSize();

            //set 1rem = viewWidth/10 设置html元素文字的大小
            //将屏幕宽度划分10个等份,每个等份就是1rem的大小
            function setRemUnit() {
                var rem = docEl.clientWidth / 10;
                docEl.style.fontSize = rem + 'px'
            }
            setRemUnit();

            //reset rem unit on page resize
            //当我们页面尺寸大小发生变化的时候,要重新设置下rem
            window.addEventListener('resize', setRemUnit);
            //pageshow 是我们重新加载页面触发的事件
            window.addEventListener('pageshow', function (e) {
                //e.persisted 返回的是true,就是说如果这个页面是从缓存取过来的页面,也需要重新计算一下rem的大小
                if (e.persisted) {//persisted来判断是否是缓存中的页面触发的
                    setRemUnit();
                }
            })

            //detect 0.5px supports 
            //有些移动端的浏览器不支持0.5像素的写法
            if (dpr >= 2) {
                var fakeBody = document.createElement('body');
                var testElement = document.createElement('div');
                testElement.style.border = '.5px solid transparent';
                fakeBody.appendChild(testElement);
                docEl.appendChild(fakeBody);
                if (testElement.offsetHeight === 1) {
                    docEl.classList.add('hairlines')
                }
                docEl.removeChild(fakeBody);
            }
        })(window, document)
```


## 仿淘宝固定右侧侧边栏

- 原先侧边栏是绝对定位
- 当页面滚动到一定位置,侧边栏改为固定定位
- 页面继续滚动,回让返回顶部显示出来

案例分析：

- 需要用到页面滚动事件`scroll`,因为是页面滚动,所以事件源是`document`
- 滚动到某个位置,就是判断页面被卷上去的上部值
- 页面被卷去的头部:可以通过`window.pageYOffset`获得,如果是被卷去的左侧`window.pageXOffset`
- 注意:元素被卷去的头部是element.scrollTop,如果是页面被卷去的头部则是`window.pageYOffset`

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .w {
            width: 1200px;
            margin: 10px auto;
        }

        .slider-bar {
            position: absolute;
            left: 50%;
            top: 300px;
            margin-left: 600px;
            width: 45px;
            height: 130px;
            background-color: pink;

        }

        .header {
            height: 150px;
            background-color: violet;
        }

        .banner {
            height: 250px;
            background-color: teal;
        }

        .main {
            height: 1000px;
            background-color: yellowgreen;
        }

        span {
            position: absolute;
            bottom: 0;
            display: none;
        }
    </style>
</head>

<body>
    <div class="slider-bar">
        <span class="goBack">返回顶部</span>
    </div>
    <div class="header w">头部区域</div>
    <div class="banner w">banner区域</div>
    <div class="main w">主体部分</div>
    <script>
        var sliderbar = document.querySelector('.slider-bar');
        var banner = document.querySelector('.banner');
        var bannerTop = banner.offsetTop;//就是被卷去头部的大小

        var sliderbarTop = sliderbar.offsetTop - bannerTop;//侧边栏固定定位之后应该变化的值

        var main = document.querySelector('.main');
        var goBack = document.querySelector('.goBack');
        var mainTop = main.offsetTop;

        document.addEventListener('scroll', function () {
            //window.pageYOffset页面被卷去的头部
            console.log(window.pageYOffset);
            //当我们页面被卷去的头部大于等于了 bannerTop 此时 侧边栏就要改为固定定位
            if (window.pageYOffset >= bannerTop) {
                sliderbar.style.position = 'fixed';
                sliderbar.style.top = sliderbarTop + 'px';
            } else {
                sliderbar.style.position = 'absolute';
                sliderbar.style.top = 300 + 'px';
            }

            //
            if (window.pageYOffset >= mainTop) {
                goBack.style.display = 'block';
            } else {
                goBack.style.display = 'none';
            }
        })

    </script>
</body>

</html>
```

