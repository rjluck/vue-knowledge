# BOM案例

[[toc]]

## 5秒后自动关闭的广告

- 核心思路:5秒之后,就把这个广告隐藏起来
- 用定时器`setTimeout`

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

</head>

<body>
    <img src="images/1.jpg" alt="" class="ad">
    <script>
        var ad = document.querySelector('.ad');
        setTimeout(function () {
            ad.style.display = 'none'
        }, 5000)
    </script>

</body>

</html>
```

## 倒计时

- 这个倒计时是不断变化的,因此需要定时器来自动变化(setInterval)
- 三个黑色盒子里面分别存放时分秒
- 三个黑色盒子利用innerHTML 放入计算的小时分钟秒数
- 第一次执行也是间隔毫秒数,因此刚刷新页面会有空白
- 最好哦采取封装函数的方式,这样可以先调用一次这个函数,防止刚开始刷新页面有空白问题

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        span {
            width: 100px;
            height: 100px;
            background: #000;
            color: #fff;
        }
    </style>
</head>
<body>
    <div>
        <span class="hour">1</span>
        <span class="minute">2</span>
        <span class="second">3</span>
    </div>
    <script>
        var hour = document.querySelector('.hour');
        var minute = document.querySelector('.minute');
        var second = document.querySelector('.second');
        var inputTime = +new Date('2020-4-29 18:00:00');//返回的是用户输入时间总的毫秒数
        countDown();//先调用一次这个函数,防止第一次刷新页面有空白
        //开启定时器
        setInterval(countDown, 1000)
        function countDown(time) {
            var nowTime = +new Date(); //返回的是当前时间总的毫秒数
            var times = (inputTime - nowTime) / 1000; //times剩余时间总的秒数
            var h = parseInt(times / 60 / 60 % 24);//时
            h = h < 10 ? '0' + h : h;
            hour.innerHTML = h;
            var m = parseInt(times / 60 % 60);//分
            m = m < 10 ? '0' + m : m;
            minute.innerHTML = m;
            var s = parseInt(times % 60);//秒
            s = s < 10 ? '0' + s : s;
            second.innerHTML = s;
        }

    </script>
</body>
</html>
```

## 发送短信

点击按钮后,该按钮60s之内不能再次点击,防止重复发送短信

- 按钮点击之后,会禁用`disabled`为`true`
- 同时按钮里面的内容会变化,注意`button`里面的内容通过`innerHTML`修改
- 里面秒数是有变化的,因此需要用到定时器
- 定义一个变量,在定时器里面,不断递减
- 如果变量为0说明到了时间,我们需要停止定时器,并且复原按钮初始状态

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    手机号码: <input type="number"> <button>发送</button>
    <script>
        var btn = document.querySelector('button');
        var time = 10;
        btn.addEventListener('click', function () {
            btn.disabled = true;
            var timer = setInterval(function () {
                if (time == 0) {
                    clearInterval(timer);
                    btn.disabled = false;
                    btn.innerHTML = '发送';
                    time = 10;
                } else {
                    btn.innerHTML = '还剩下' + time + '秒';
                    time--;
                }

            }, 1000)

        })
    </script>
</body>

</html>
```


## 5秒钟后自动跳转页面

- 利用定时器做倒计时效果
- 时间到了,就跳转页面。使用location.href

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <button>点击</button>
    <div></div>
    <script>
        var btn = document.querySelector('button');
        var div = document.querySelector('div');
        // btn.addEventListener('click', function () {
        //     console.log(location.href);
        //     location.href = 'https://www.baidu.com/'
        // })
        var timer = 5;
        setInterval(function () {
            if (timer == 0) {
                location.href = 'https://www.baidu.com/'
            }
            div.innerHTML = '您将在' + timer + '秒钟之后跳转到首页'
            timer--;
        }, 1000)
    </script>
</body>

</html>
```



## 获取URL参数数据

- 主要练习数据在不同页面中传递
- 第一个登录页面,里面有提交表单,`action`提交到`index.html`页面
- 第二个页面,可以使用第一个页面的参数,这样实现了一个数据不同页面之间传递的效果
- 第二个页面之所以可以使用第一个页面的数据,是利用了`URL`里面的`location.search`参数
- 在第二个页面中,需要把这个参数提取
- 第一步去掉`?`利用`substr`
- 第二步 利用`=`分割键和值 `split('=')`

```html
/*login.html*/
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <form action="index.html">
        用户名:<input type="text" name="username" />
        <input type="submit" value="登录">
    </form>
</body>

</html>
```

```html
/*index.html*/
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <div></div>
    <script>
        console.log(location.search);//?username=1111
        //1.先去掉?  substr('起始的位置',截取几个字符)
        var params = location.search.substr(1);//username=1111
        //2.利用=把字符串分割为数组 split('=');
        var arr = params.split('=');//["username","1111"]
        //3.把数据写入div中
        var div = document.querySelector('div');
        div.innerHTML = arr[1] + '欢迎您';
    </script>
</body>

</html>
```






