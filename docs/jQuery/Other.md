#   jQuery其他方法

[[toc]]

## jQuery拷贝对象

如果想要把某个对象拷贝(合并)给另外一个对象使用,此时可以使用`$.extend()`方法。

语法:

`$.extend([deep],target,object1,[objectN])`

- `deep`:如果设为`true`为深拷贝,默认为`false`浅拷贝
- `target`:要拷贝的目标对象
- `object1`:待拷贝到第一个对象的对象
- `objectN`:待拷贝到第N个对象的对象
- 浅拷贝是把被拷贝的对象**复杂数据类型种的地址**拷贝给目标对象,修改目标对象**会影响**被拷贝对象
- 深拷贝,前面加`true`,完全克隆(拷贝的对象,而不是地址),修改目标对象不会影响被拷贝对象。

eg：
```html
<body>
    <div></div>
    <script>
        $(function () {
            var targetObj = {};
            var obj = {
                id: 1,
                name: 'andy',
                msg: {
                    age: 18
                }
            };

            //1.浅拷贝把原来对象里面的复杂数据类型地址拷贝给目标对象
            // $.extend(targetObj, obj);
            // console.log(targetObj);//{id；1，name:'andy'}
            // targetObj.msg.age = 20;
            // console.log('targetObj', targetObj)
            // console.log('obj', obj)

            //2.深拷贝把里面的数据完全复制一份给目标对象,如果里面有不冲突的属性,会合到一起
            $.extend(true, targetObj, obj);
            targetObj.msg.age = 20;
            console.log('targetObj', targetObj)
            console.log('obj', obj)
        })
    </script>
</body>
```


## 多库共存


**问题概述**

`jQuery`使用`$`作为标识符,随着`jQuery`的流行，其他`js`库也会用这`$`作为标识符，这样一起使用会引起冲突。

**客观需求**

需要一个解决方案,让`jQuery`和其他的`js`库不存在冲突,可以同时存在，这就叫做多库共存。 

**jQuery解决方案**

- 把里面的`$`符号统一改为`jQuery`。比如`jQuery("div")`
- `jQuery`变量规定新的名称：`$.noConflict()`  `var xx = $.Conflict()`

eg:
```html
<body>
    <div></div>
    <span></span>
    <script>
        $(function () {
            function $(ele) {
                return document.querySelector(ele);
            }
            $("div");
            console.log('$("div")', $("div"));

            //$.each();//报错
            //方式1 如果$ 符号冲突  我们就使用 jQuery 
            jQuery.each();

            //方式2 让jQuery  释放对$ 控制权 让自己决定
            //var suibian = $.noConflict();
            var suibian = jQuery.noConflict();
            suibian("span");
            console.log('suibian("span")', suibian("span"));
            suibian.each();
        })
    </script>
</body>
```




## jQuery插件

`jQuery`功能比较有限,想要更复杂的特效效果,可以借助于`jQuery`插件完成。

注意:这些插件也是依赖于`jQuery`来完成的，所以必须要引入`jQuery`文件，因此也称为`jQuery`插件。

**jQuery插件常用的网站**

- `jQuery`插件库:http://www.jq22.com/
- `jQuery`之家:http://www.htmleaf.com/


**jQuery插件使用步骤**

- 引入相关文件。(`jQuery`文件和插件文件)
- 复制相关`html`、`css`、`js`(调用插件)

**jQuery插件演示**

- 瀑布流
- 图片懒加载(图片使用延迟加载在可提高网页下载速度。它也能帮助减轻服务器负载)

当们页面滑动到可视区域,再显示图片。

我们使用`jQuery`插件库`EasyLazyload`。注意，此时的`js`引入文件和`js`调用必须写到`DOM`元素(图片)最后面。

- 全屏滚动(`fullpage.js`)

github:https://github.com/alvarotrigo/fullPage.js

中文翻译网站:http://www.dowebok.com/demo/2014/77/


- `Bootstrap JS`插件

`bootstrap`框架也是依赖于`jQuery`开发的,因此里面的`js`插件使用,也必须引入`jQuery`文件

- 引入bootstrap.min.css
- 引入jquery.min.js
- 引入bootstrap.min.js