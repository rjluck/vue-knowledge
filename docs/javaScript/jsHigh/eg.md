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