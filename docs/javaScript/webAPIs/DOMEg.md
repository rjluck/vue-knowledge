# DOM案例

[[toc]]

## 排他思想

如果有同一组元素，我们想要某一个元素实现某种样式，需要用到循环的排他思想算法：

- 所有元素全部清除样式(干掉其他人)
- 给当前元素设置样式(留下我自己)

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <button>按钮1</button>
    <button>按钮2</button>
    <button>按钮3</button>
    <button>按钮4</button>
    <button>按钮5</button>
    <script>
        var btns = document.getElementsByTagName('button');
        for (var i = 0; i < btns.length; i++) {
            btns[i].onclick = function () {
                //1.去掉所有按钮背景颜色
                for (var j = 0; j < btns.length; j++) {
                    btns[j].style.backgroundColor = ''
                }
                //2.当前的按钮添加颜色
                this.style.backgroundColor = 'pink';
            }
        }
    </script>
</body>

</html>
```

## 百度换肤

- 给一组元素注册事件
- 给4个小图片利用循环注册点击事件
- 核心算法:把当前图片的src路径取过来，给body做为背景即可

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        body {
            height: 100%;
            width: 100%;
            background: url(images/1.jpg) repeat center top;
        }

        li {
            list-style: none;
        }

        .baidu {
            overflow: hidden;
            margin: 100px auto;
            width: 410px;
            height: 100px;
            background-color: #000;
        }

        .baidu li {
            width: 100px;
            height: 100px;
            float: left;
            cursor: pointer;
            margin: 0 1px;
        }

        .baidu li img {
            width: 100%;
        }
    </style>
</head>

<body>
    <ul class="baidu">
        <li><img src="images/1.jpg" alt=""></li>
        <li><img src="images/2.jpg" alt=""></li>
        <li><img src="images/3.jpg" alt=""></li>
        <li><img src="images/4.jpg" alt=""></li>
    </ul>
    <script>
        var imgs = document.querySelector('.baidu').querySelectorAll('img');
        for (var i = 0; i < imgs.length; i++) {
            imgs[i].onclick = function () {
                document.body.style.backgroundImage = 'url(' + this.src + ')'
            }
        }
    </script>
</body>

</html>
```

## 表格隔行变色

- 用到鼠标事件:鼠标经过 onmouseover  鼠标离开 onmouseout
- 核心思路:鼠标经过当前行，当前的行变背景色,鼠标离开去掉当前的背景色
- 注意:第一行(thead里面的行)不需要变换颜色,因此我们获得是tbody里面的行



```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        table {
            width: 800px;
            margin: 100px auto;
            text-align: center;
            font-size: 14px;
            border-collapse: collapse;
        }

        thead tr {
            height: 30px;
            background: skyblue;
        }

        tbody tr {
            height: 30px;
        }

        tbody td {
            color: blue;
            border-bottom: 1px solid #d7d7d7;
            font-size: 12px;
        }

        .bg {
            background-color: pink;
        }
    </style>
</head>

<body>
    <table>
        <thead>
            <tr>
                <th>代码</th>
                <th>编号</th>
                <th>名称</th>
                <th>单位</th>
                <th>年龄</th>
                <th>工资</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>111</td>
                <td>222</td>
                <td>333</td>
                <td>444</td>
                <td>555</td>
                <td>666</td>
            </tr>
            <tr>
                <td>111</td>
                <td>222</td>
                <td>333</td>
                <td>444</td>
                <td>555</td>
                <td>666</td>
            </tr>
            <tr>
                <td>111</td>
                <td>222</td>
                <td>333</td>
                <td>444</td>
                <td>555</td>
                <td>666</td>
            </tr>
            <tr>
                <td>111</td>
                <td>222</td>
                <td>333</td>
                <td>444</td>
                <td>555</td>
                <td>666</td>
            </tr>
        </tbody>
    </table>
    <script>
        var trs = document.querySelector('tbody').querySelectorAll('tr');
        for (var i = 0; i < trs.length; i++) {
            trs[i].onmouseover = function () {
                this.className = 'bg';
            }
            trs[i].onmouseout = function () {
                this.className = '';
            }
        }
    </script>
</body>

</html>
```


## 表单全选取消全选案例

- 全选和取消全选做法:让下面所有复选框的`checked`属性(选中状态)跟随全选按钮即可
- 下面复选框需要全部选中,上面全选才能选中做法:给下面所有复选框绑定点击事件,每次点击，都要循环查看下面所有的复选框是否有没选中的,如果有一个没选中的,上面全选就不选中。

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        table {
            width: 800px;
            margin: 100px auto;
            text-align: center;
            font-size: 14px;
            border-collapse: collapse;
        }

        thead tr {
            height: 30px;
            background: skyblue;
        }

        tbody tr {
            height: 30px;
        }

        tbody td {
            color: blue;
            border-bottom: 1px solid #d7d7d7;
            font-size: 12px;
        }

        .bg {
            background-color: pink;
        }
    </style>
</head>

<body>
    <table>
        <thead>
            <tr>
                <th>
                    <input type="checkbox" id="j_cbAll">
                </th>
                <th>商品</th>
                <th>价钱</th>
            </tr>
        </thead>
        <tbody id="j_tb">
            <tr>
                <td>
                    <input type="checkbox">
                </td>
                <td>222</td>
                <td>333</td>
            </tr>
            <tr>
                <td>
                    <input type="checkbox">
                </td>
                <td>111</td>
                <td>222</td>
            </tr>
            <tr>
                <td>
                    <input type="checkbox">
                </td>
                <td>111</td>
                <td>222</td>
            </tr>
        </tbody>
    </table>
    <script>
        var j_cbAll = document.getElementById('j_cbAll');
        var j_tbs = document.getElementById('j_tb').getElementsByTagName('input')
        //全选按钮控制下面
        j_cbAll.onclick = function () {
            //this.checked 可以得到当前复选框选中状态
            for (var i = 0; i < j_tbs.length; i++) {
                j_tbs[i].checked = this.checked
            }
        }
        //下面控制全选
        for (var i = 0; i < j_tbs.length; i++) {
            j_tbs[i].onclick = function () {
                let flag = true;//控制全选按钮是否选中
                for (var j = 0; j < j_tbs.length; j++) {
                    if (!j_tbs[j].checked) {
                        flag = false;
                        break;//退出for循环,这样可以提高效率
                    }
                }
                j_cbAll.checked = flag;
            }
        }
    </script>
</body>

</html>
```

## tab栏切换(重点案例)

- Tab栏切换有两个大的模块
- 点击某一个模块选项卡,当前这一个底色会是红色,其余不变(排他思想)修改类名的方式

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
        var tab_list = document.querySelector('.tab_list')
        var lis = tab_list.querySelectorAll('li');
        var items = document.querySelectorAll('.item');
        for (let i = 0; i < lis.length; i++) {
            lis[i].onclick = function () {
                for (var j = 0; j < lis.length; j++) {
                    lis[j].className = '';
                    if (items[j].style.display) items[j].style.display = 'none';
                }
                // this.className = 'current';
                this.setAttribute('class', 'current');
                console.log(i);
                items[i].style.display = 'block';
            }
        }
    </script>
</body>

</html>
```

## 下拉菜单

- 导航栏里面的li都要有鼠标经过效果，所以要循环注册鼠标事件
- 核心原理:当鼠标经过li里面的第二个孩子ul显示,当鼠标离开，则ul隐藏

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
            <a href="#">微博</a>
            <ul>
                <li>私信</li>
                <li>评论</li>
                <li>@我</li>
            </ul>
        </li>
        <li>
            <a href="#">微博</a>
            <ul>
                <li>私信</li>
                <li>评论</li>
                <li>@我</li>
            </ul>
        </li>
        <li>
            <a href="#">微博</a>
            <ul>
                <li>私信</li>
                <li>评论</li>
                <li>@我</li>
            </ul>
        </li>
    </ul>
    <script>
        var nav = document.querySelector('.nav');
        var lis = nav.children;
        for (var i = 0; i < lis.length; i++) {
            lis[i].onmouseover = function () {
                this.children[1].style.display = 'block';
            }
            lis[i].onmouseout = function () {
                this.children[1].style.display = 'none';
            }
        }
    </script>
</body>

</html>
```


## 简单版本发布/删除留言案例

- 核心思路:点击按你之后,就动态创建一个`li`,添加到`ul`里面
- 创建`li`的同时,把文本域里面的值通过`li.innerHTML`赋值给`li`
- 如果想要新的留言后面显示就用`appendChild`,如果想要前面显示就用`insertBefore`
- 当我们把文本域里面的值赋值给li的时候,多添加一个删除链接
- 需要把所有的链接获取过来,当我们点击当前的链接的时候,删除当前链接所在的`li`
- 阻止链接跳转需要添加`javascript:void(0)` 或者 `javascript:;`

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        ul {
            margin-top: 50px;
        }

        li {
            width: 300px;
            padding: 5px;
            background-color: wheat;
            color: red;
            font-size: 14px;
            margin: 15px 0;
        }

        li a {
            float: right;
        }
    </style>
</head>

<body>
    <textarea name="" id="" cols="30" rows="10">122</textarea>
    <button>发布</button>
    <ul>

    </ul>
    <script>
        var textarea = document.querySelector('textarea');
        var btn = document.querySelector('button');
        var ul = document.querySelector('ul');

        btn.onclick = function () {
            if (textarea.value == '') {
                alert('您没有输入内容');
                return false;
            } else {
                var li = document.createElement('li');
                li.innerHTML = textarea.value + "<a href='javascript:;'>删除</a>";
                //ul.appendChild(li);//添加
                ul.insertBefore(li, ul.children[0]);
                //删除
                var as = document.querySelectorAll('a');
                for (var i = 0; i < as.length; i++) {
                    as[i].onclick = function () {
                        ul.removeChild(this.parentNode);
                    }
                }
            }

        }
    </script>
</body>

</html>
```

## 动态生成表格

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        table {
            width: 500px;
            margin: 100px auto;
            border-collapse: collapse;
            text-align: center;
        }

        td,
        th {
            border: 1px solid #333;
        }

        thead tr {
            height: 40px;
            background-color: #ccc;
        }
    </style>
</head>

<body>
    <table cellspacing="0">
        <thead>
            <tr>
                <th>姓名</th>
                <th>科目</th>
                <th>成绩</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>嘻嘻嘻</td>
                <td>js</td>
                <td>100</td>
                <td><a href="javaScript:;">删除</a></td>
            </tr>
        </tbody>

    </table>
    <script>
        //1.准备假数据
        var datas = [
            {
                name: 'xxx',
                subject: 'js',
                score: 100
            },
            {
                name: '111',
                subject: 'js',
                score: 98
            },
            {
                name: '222',
                subject: 'js',
                score: 90
            }
        ]

        //往tbody里面放行
        var tbody = document.querySelector('tbody');
        for (var i = 0; i < datas.length; i++) {
            //1.创建tr
            var tr = document.createElement('tr');
            tbody.appendChild(tr);
            //2.行里面创建td,取决于每个对象里面有几个属性
            for (var k in datas[i]) {
                var td = document.createElement('td');
                td.innerHTML = datas[i][k];
                tr.appendChild(td)
            }
            //3.创建操作单元格
            var td = document.createElement('td');
            td.innerHTML = '<a href="javascript:;">删除</a>';
            tr.appendChild(td);
        }
        //4.删除操作 开始
        var as = document.querySelectorAll('a');
        for (var i = 0; i < as.length; i++) {
            as[i].onclick = function () {
                //node.removeChild(child)
                //this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode)
                tbody.removeChild(this.parentNode.parentNode)
            }
        }
    </script>
</body>

</html>
```


## 跟随鼠标的天使

- 鼠标不断的移动,使用鼠标移动事件:`mousemove`
- 在页面中移动,给`document`注册事件
- 图片要移动距离,而且不占位置,我们使用绝对定位即可
- 核心原理:每次鼠标移动,我们都会获得最新的鼠标坐标,把这个x和y坐标作为图片的top和left值就可以移动图片

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        img {
            position: absolute;
            width: 100px;
            height: 100px;
        }
    </style>
</head>

<body>
    <img src="images/1.jpg" alt="">
    <script>
        var pic = document.querySelector('img');
        document.addEventListener('mousemove', function (e) {
            console.log(1, pic.width)
            var x = e.pageX;
            var y = e.pageY;
            //千万不要忘记给left和top添加px单位
            pic.style.left = x - (pic.width / 2) + 'px';
            pic.style.top = y - (pic.height / 2) + 'px';
        })
    </script>
</body>

</html>
```

## 模拟京东按键输入内容

当我们按下`s`键,光标就定位到搜索框

- 核心思路:检测用户是否按下了`s`键,如果按下`s`键,就把光标定位到搜索框里面
- 使用键盘事件对象里面的`keyCode`判断用户按下的是否是`s`键
- 搜索框获得焦点:使用`js`里面的`focus()`方法

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        img {
            position: absolute;
            width: 100px;
            height: 100px;
        }
    </style>
</head>

<body>
    <input type="text">
    <script>
        var search = document.querySelector('input');
        document.addEventListener('keyup', function (e) {
            console.log(e.keyCode);
            if (e.keyCode === 83) {
                search.focus();
            }
        })
    </script>
</body>

</html>
```


## 模拟京东快递单号查询

要求:当我们在文本框中输入内容时,文本框上面自动显示大字号的内容

- 快递单号输入内容时,上面的大号字体盒子(con)显示(这里面的字号更大)
- 表单检测用户输入:给表单添加键盘事件
- 同时把快递单号里面的值(value)获取过来赋值给con盒子(innerText)做为内容
- 如果快递单号里面内容为空,则隐藏大号字体盒子(con)盒子
- 失去焦点，就隐藏这个con盒子

> 注意:keydown 和 keypress 在文本框里面的特点:他们两个事件触发的时候,文字还没有落入文本框中

> keyup事件触发的时候,文字已经落入文本框里面了

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .search {
            position: relative;
            width: 178px;
            margin: 100px;
        }

        .con {
            display: none;
            position: absolute;
            top: -40px;
            width: 171px;
            border: 1px solid #ccc;
            box-shadow: 0 2px 4px rgba(0, 0, 0, .2);
            padding: 5px 0;
            font-size: 18px;
            line-height: 20px;
            color: #333;
        }
    </style>
</head>

<body>
    <div class="search">
        <div class="con">123</div>
        <input type="text" placeholder="请输入您的快递单号" class="jd">
    </div>

    <script>
        var con = document.querySelector('.con');
        var jd_input = document.querySelector('.jd');
        jd_input.addEventListener('keyup', function () {
            console.log('输入内容啦')
            if (this.value == '') {
                con.style.display = 'none';
            } else {
                con.style.display = 'block';
                con.innerText = this.value;
            }

        })

        //失去焦点,就隐藏这个con盒子
        jd_input.addEventListener('blur', function () {
            con.style.display = 'none';
        })
        //获得焦点,就显示这个con盒子
        jd_input.addEventListener('focus', function () {
            if (this.value !== '') con.style.display = 'block';
        })
    </script>
</body>

</html>
```






