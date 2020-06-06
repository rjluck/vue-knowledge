# 案例

[[toc]]

## 面向对象版Tab栏切换

功能需求

- 点击tab栏,可以切换效果
- 点击`+`号,可以添加tab页和内容项
- 点击`x`号,可以删除当前tab页和内容项
- 双击tab项文字或者内容项文字,可以修改里面的文字内容

抽取对象:Tab对象

- 该对象具有切换功能
- 该对象具有添加功能
- 该对象具有删除功能
- 该对象具有修改功能

添加功能

- 点击`+`可以实现添加新的选项卡和内容
- 第一步:创建新的选项卡`li`和新的内容`section`
- 第二步:把创建的两个元素追加到对应的父元素中
- 以前的做法:动态创建元素`createElement`,但是元素里面的内容较多,需要`innerHTML`赋值在`appendChild`追加到父元素里面。
- 现在的高级做法:利用`insertAdjacentHTML()`可以直接把字符串格式元素添加到父元素中
- `appendChild`不支持追加字符串的子元素,`insertAdjacentHTML`支持追加字符串的元素

删除功能

- 点击`x`可以删除当前的`li`选项卡和当前的`section`
- `x`是没有索引号的,但是它的父亲`li`有索引号,这个索引号正是我们所要的索引号
- 所以核心思路是:点击`x`号可以删除这个索引号对应的`li`和`section`


编辑功能

- 双击选项卡`li`或者`section`里面的文字,可以实现修改功能
- 双击事件是 `ondblclick`
- 如果双击文字,会默认选定文字,此时需要双击禁止选中文字

```js
window.getSelection ? window.getSelection().removeAllRanges():document.section.empty()
```

- 核心思路:双击文字的时候,在里面生成一个文本框,当失去焦点或者按下回车然后把文本框输入的值赋给原先的元素即可。

eg:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="./css/tab.css">
</head>
<body>
    <main>
        <h4>xxxx动态标签页</h4>
        <div class="tabsbox" id="tab">
            <!-- tab标签 -->
            <nav class="firstnav">
                <ul>
                    <li class="liactive"><span>测试1</span><span class="del">x</span></li>
                    <li><span>测试2</span><span class="del">x</span></li>
                    <li><span>测试3</span><span class="del">x</span></li>
                </ul>
                <div class="tabadd">
                    <span>+</span>
                </div>
            </nav>

            <!-- tab内容 -->
            <div class="tabscon">
                <section class="conactive">测试1111</section>
                <section>测试22222</section>
                <section>测试3333</section>
            </div>
        </div>
    </main>
    <script src="./js/tab.js"></script>
</body>
</html>
```
```css
*{
    padding:0;
    margin:0
}

li{
    list-style: none;
}

main {
    width:600px;
    margin:100px auto;
}

main h4{
    height: 45px;
    line-height: 45px;
}

main #tab .firstnav{
    height: 45px;
    line-height: 45px;
    display:flex;
    border:1px solid #ccc;
}


.firstnav input {
    width:60px;
}
.tabscon input,section {
    width:100%;
    height:100%;
}
main #tab ul{
    flex:3
}

main #tab ul li{
    float:left;
    height:100%;
    border-right:1px solid #ccc;
    position: relative;
    padding: 0 5px 0 5px ;
}
main #tab .tabadd{
    width:20px;
    height:20px;
    text-align: center;
    margin: 10px 10px 0  0;
    line-height: 20px;
    border:1px solid #ccc;
}

.del{
    width:15px;
    height:15px;
    line-height: 15px;
    text-align: center;
    background-color:#000;
    color:#fff;
    font-size: 12px;
    position: absolute;
    right:0;
    top:0;
    border-radius: 0 0 5px 6px;
}

main #tab ul  .liactive{
    border-bottom:1px solid #fff;
}

.tabscon{
    border: 1px solid #ccc;
    border-top: 0px;
    height:400px;
}
.tabscon section{
    display: none;
}

.tabscon .conactive{
    display: block;
}
```

```js

var that;
class Tab {
    constructor(id) {
        that = this;
        //获取元素
        this.main = document.querySelector(id);
        this.add = this.main.querySelector('.tabadd');
        this.ul = this.main.querySelector('.firstnav ul:first-child');
        this.tabscon = this.main.querySelector('.tabscon');
        this.init();
    }

    //0.初始化 让相关的元素绑定事件
    init() {
        this.updateNode();
        //addTab添加绑定
        this.add.onclick = this.addTab;
        //li循环绑定
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].index = i;
            // this.lis[i].onclick = function () {
            //     // console.log(this.index);
            // }
            this.lis[i].onclick = this.toggleTab;
            this.dels[i].onclick = this.removeTab;
            this.spans[i].ondblclick = this.editTab;
            this.sections[i].ondblclick = this.editTab;
        }
    }

    //1.切换
    toggleTab() {
        console.log(this.index);
        that.clearClass();
        this.className = 'liactive';
        that.sections[this.index].className = 'conactive'
    }

    //2.添加
    addTab() {
        var random = Math.random();
        that.clearClass();//清除所有样式
        var li = ` <li class="liactive"><span>新选项卡</span><span class="del">x</span></li>`
        var section = `<section class="conactive">测试${random}</section>`
        that.ul.insertAdjacentHTML('beforeend', li);
        that.tabscon.insertAdjacentHTML('beforeend', section);
        that.init();
    }

    //3.删除
    removeTab(e) {
        e.stopPropagation();//阻止冒泡,防止触发li的切换点击事件
        var index = this.parentNode.index;
        console.log('index : ', index);
        //根据索引号删除对应的li和section
        that.lis[index].remove();//remove方法可以直接删除指定元素
        that.sections[index].remove();
        that.init();
        //当我们删除的不是选中状态的li的时候,原来的选中状态li保持不变
        if (document.querySelector(".liactive")) return;
        //当我们删除了选中状态的这个li的时候,让它的前一个li处于选中状态
        index--;
        //click()  手动调用我们的点击事件,不需要鼠标触发
        that.lis[index] && that.lis[index].click();
    }

    //4.修改
    editTab() {
        //双击禁止选中文字
        window.getSelection ? window.getSelection().removeAllRanges() : document.section.empty();
        //
        this.innerHTML = `<input type="text" value=${this.innerHTML} />`
        //文本框文字处于选中状态
        var input = this.children[0];
        input.select();
        //当我们离开文本框就把文本框里面的值给span
        input.onblur = function () {
            this.parentNode.innerHTML = this.value;
        }
        //按下回车也可以把文本框里面的值给span
        input.onkeyup = function (e) {
            if (e.keyCode == 13) {
                //手动调用表单失去焦点事件,不需要鼠标离开操作
                this.blur();//不用加on
            }
        }
    }

    //5.清除样式
    clearClass() {
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].className = '';
            this.sections[i].className = '';
        }
    }

    //6.获取所有小li section
    updateNode() {
        this.lis = this.main.querySelectorAll('li');
        this.sections = this.main.querySelectorAll('section');
        this.dels = this.main.querySelectorAll('.del');
        this.spans = this.main.querySelectorAll('.firstnav li span:first-child');
    }
}

new Tab("#tab");

```



## 查询商品

- 把数据渲染到页面中(`forEach`)
- 根据价格显示数据(`filter`)
- 根据商品名称显示数据

eg：
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .search {
            width: 600px;
            margin: 0 auto;
        }

        .search input {
            width: 50px;
        }

        table {
            margin: 0 auto;
        }

        table {
            border-right: 1px solid #804040;
            border-bottom: 1px solid #804040;
            border-collapse: collapse;
            margin-top: 10px;
        }

        table td,
        th {
            border-left: 1px solid #804040;
            border-top: 1px solid #804040;
            width: 100px;
        }
    </style>
</head>

<body>
    <div class="search">
        按照价格查询:<input type="text" class="start"> - <input type="text" class="end">
        <button class="search_price">搜索</button>
        按照商品名称查询: <input type="text" class="product">
        <button class="search_pro">查询</button>
    </div>
    <table>
        <thead>
            <tr>
                <th>id</th>
                <th>产品名称</th>
                <th>价格</th>
            </tr>
        </thead>
        <tbody>
            <!-- <tr>
                <td>1</td>
                <td>小米</td>
                <td>1000</td>
            </tr>
            <tr>
                <td>2</td>
                <td>小米</td>
                <td>1000</td>
            </tr> -->
        </tbody>
    </table>


    <script>
        //利用ES5新增数组方法操作数据
        var data = [{
            id: 1,
            name: '小米',
            price: 1000
        }, {
            id: 2,
            name: 'oppo',
            price: 999
        }, {
            id: 3,
            name: '荣耀',
            price: 2900
        }, {
            id: 4,
            name: '华为',
            price: 3900
        }]

        //1.获取相应的元素
        var tbody = document.querySelector("tbody");
        var search_price = document.querySelector('.search_price');
        var start = document.querySelector('.start');
        var end = document.querySelector('.end');
        var search_pro = document.querySelector('.search_pro');
        var product = document.querySelector('.product');

        //2.把数据渲染到页面中
        setData(data);
        function setData(mydata) {
            //先清空原来tbody里面的数据
            tbody.innerHTML = '';
            mydata.forEach(function (val) {
                var tr = document.createElement('tr');
                tr.innerHTML = `<td>${val.id}</td><td>${val.name}</td><td>${val.price}</td>`
                tbody.appendChild(tr);
            })
        }


        //3.根据价格查询商品
        //当我们点击了按钮,就可以根据我们的商品价格去筛选数组里面的对象
        search_price.addEventListener('click', function () {
            var newData = data.filter(function (val) {
                return val.price >= start.value && val.price <= end.value;
            })
            console.log('newData: ', newData);
            setData(newData)
        })


        //4.根据商品名称查找商品
        //如果查询数组唯一的元素,用some方法更合适,因为它找到这个元素就不再进行循环,效率更高
        search_pro.addEventListener('click', function () {
            var arr = [];
            data.some(function (val) {
                if (val.name == product.value) {
                    console.log(val);
                    arr.push(val)
                    return true;//return 后面必须写true
                }

            })
            console.log('arr: ', arr);
            setData(arr)
        })
    </script>
</body>

</html>
```


## 闭包案例-循环注册点击事件

点击li输出当前li的索引号

补充知识点:

异步任务主要有3种

- 定时器中的回调函数
- 事件中的回调函数
- axios中的回调函数

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <ul class="nav">
        <li>榴莲</li>
        <li>臭豆腐</li>
        <li>蒜泥</li>
        <li>芒果</li>
    </ul>
    <script>
        //闭包应用-点击li输出当前li的索引号

        //方式1：利用动态添加属性的方式
        var lis = document.querySelector('.nav').querySelectorAll("li");
        //for循环是同步任务
        for (var i = 0; i < lis.length; i++) {
            lis[i].index = i;
            lis[i].onclick = function () {
                //点击调用函数时异步任务
                // console.log(i);//4  
                console.log(this.index);//0 1 2 3
            }
        }


        //方式2:利用闭包的方式得到当前小li的索引号
        //立即执行函数也称为小闭包,因为立即执行函数里面的任何一个函数都可以使用它的i这个变量
        for (var i = 0; i < lis.length; i++) {
            //利用for循环创建4个立即执行函数
            (function (i) {
                lis[i].onclick = function () {
                    console.log(i);//0 1 2 3  
                }
            })(i)
        }
    </script>
</body>
</html>
```


## 闭包案例-循环中的setTimeout()

3秒钟之后,打印所有li元素的内容

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <ul class="nav">
        <li>榴莲</li>
        <li>臭豆腐</li>
        <li>蒜泥</li>
        <li>芒果</li>
    </ul>
    <script>
        //闭包应用-3秒钟之后,打印所有li元素的内容
        var lis = document.querySelector('.nav').querySelectorAll("li");

        //for循环是同步任务
        for (var i = 0; i < lis.length; i++) {
            (function (i) {
                setTimeout(function () {
                    //异步任务
                    lis[i].innerHTML
                    console.log('lis[i].innerHTML: ', lis[i].innerHTML);
                }, 3000)
            })(i)
        }
    </script>
</body>

</html>
```


## 闭包案例-计算打车价格

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
    <script>
        //闭包应用-计算打车价格
        //打车起步价13(3公里内),之后每多1公里增加5块钱,用户输入公里数就可以计算打车价格
        //如果有拥堵情况,总价格多收取10块钱拥堵费

        var car = (function () {
            var start = 13;//起步价
            var total = 0;//总价
            return {
                //正常的总价
                price: function (n) {
                    if (n <= 3) {
                        total = start
                    } else {
                        total = start + (n - 3) * 5
                    }
                    return total;
                },

                //拥堵之后的费用
                yd: function (flag) {
                    return flag ? total + 10 : total;
                }
            }
        })();

        car.price(5);
        car.yd(true);//拥堵

        console.log('car.price(5): ', car.price(5));//23
        console.log('car.yd(true): ', car.yd(true));//33
        console.log('car.price(1): ', car.price(1));//13
        console.log('car.yd(false): ', car.yd(false));//13
    </script>
</body>
</html>
```












