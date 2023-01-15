# HTML5进阶

[[toc]]

## HTML元素分类

根据css显示分类，HTML元素被分为三种类型:块状元素，内联元素，可变元素

### 块状元素（block element）

- 块状元素在网页中就是以块的形式显示，所谓块状就是元素显示为矩形区域，常用的块状元素包块div,dl,dt,dd,ol,ul,(h1-h6),p,form,hr,table,tr,td,hr等；
- 默认情况下，块状元素都会占据一行，通俗地说，两个相邻块状元素不会出现并列显示的现象；默认情况下，块状元素会按顺序自上而下排列。
- 块状元素都可以定义自己的宽度和高度。
- 块状元素一般都作为其他元素的容器，它可以容纳其它内联元素和其它块状元素。
- 我们可以把这种容器比喻为一个盒子。

> width不写 默认100%

**块元素(block element) 集合**
　　◎ address - 地址 <br/>
　　◎ blockquote - 块引用  <br/>
　　◎ center - 局中对齐块  <br/>
　　◎ dir - 目录列表 <br/>
　　◎ div - 常用块级容易，也是css layout的主要标签 <br/>
　　◎ dl - 定义列表 <br/>
　　◎ fieldset - form控制组 <br/>
　　◎ form - 交互表单 <br/>
　　◎ h1 - 大标题 <br/>
　　◎ h2 - 副标题 <br/>
　　◎ h3 - 3级标题 <br/>
　　◎ h4 - 4级标题 <br/>
　　◎ h5 - 5级标题 <br/>
　　◎ h6 - 6级标题 <br/>
　　◎ hr - 水平分隔线 <br/>
　　◎ isindex - input prompt <br/>
　　◎ menu - 菜单列表 <br/>
　　◎ noframes - frames可选内容，（对于不支持frame的浏览器显示此区块内容 <br/>
　　◎ noscript - 可选脚本内容（对于不支持script的浏览器显示此内容） <br/>
　　◎ ol - 排序表单 <br/>
　　◎ p - 段落 <br/>
　　◎ pre - 格式化文本 <br/>
　　◎ table - 表格 <br/>
　　◎ ul - 非排序列表 <br/>


### 内联元素（inline element）(也叫 行内元素、行间元素、内嵌元素)

- 常见的内联元素如：a,span,i,em,strong,b，img，input,br等
- 内联元素的表现形式是始终以行内逐个进行显示；
- 内联元素没有自己的形状，不能定义它的宽和高,它显示的宽度、高度只能根据所包含内容的高度和宽度来确定，它的最小内容单元也会呈现矩形形状；
- 内联元素也会遵循盒模型基本规则，如可以定义padding,border,margin,background等属性，但个别属性不能正确显示;

**内联元素(inline element) 集合**
　　◎ a - 锚点 <br/>
       ◎ abbr - 缩写  <br/>
　　◎ acronym - 首字  <br/>
　　◎ b - 粗体(不推荐)  <br/>
　　◎ bdo - bidi override <br/>
　　◎ big - 大字体 <br/>
　　◎ br - 换行 <br/>
　　◎ cite - 引用 <br/>
　　◎ code - 计算机代码(在引用源码的时候需要) <br/>
　　◎ dfn - 定义字段  <br/>
　　◎ em - 强调 <br/>
　　◎ font - 字体设定(不推荐)  <br/>
　　◎ i - 斜体 <br/>
　　◎ img - 图片 <br/>
　　◎ input - 输入框 <br/>
　　◎ kbd - 定义键盘文本 <br/>
　　◎ label - 表格标签 <br/>
　　◎ q - 短引用 <br/>
　　◎ s - 中划线(不推荐) <br/>
　　◎ samp - 定义范例计算机代码 <br/>
　　◎ select - 项目选择 <br/>
　　◎ small - 小字体文本 <br/>
　　◎ span - 常用内联容器，定义文本内区块 <br/>
　　◎ strike - 中划线 <br/>
　　◎ strong - 粗体强调 <br/>
　　◎ sub - 下标 <br/>
　　◎ sup - 上标<br/>
　　◎ textarea - 多行文本输入框 <br/>
　　◎ tt - 电传文本 <br/>
　　◎ u - 下划线 <br/>
　　◎ var - 定义变量 <br/>


### 可变元素

需要根据上下文关系确定该元素是块元素或者内联元素。

**可变元素集合**
    ◎ applet - java applet  <br/>
　　◎ button - 按钮  <br/>
　　◎ del - 删除文本  <br/>
　　◎ iframe - inline frame  <br/>
　　◎ ins - 插入的文本  <br/>
　　◎ map - 图片区块(map)  <br/>
　　◎ object - object对象  <br/>
　　◎ script - 客户端脚本 <br/>
　　




## 元素类型的转换

++内联元素添加浮动，就相当于将其转为块级元素了,即相当于给该元素添加了`display:block`的属性++

++盒子模型可通过`display`属性来改变默认的显示类型++


### display属性与属性值	(18个属性值)

- 属性值：block/inline/inline-block/none/list-item/table-cell
- 作用：该属性设置或检索对象元素应该生成的盒模型的类型。
- 说明：各属性值的作用

属性值| 说明
---|---
block | 块状显示：类似在元素后面添加换行符，也就是说其他元素不能在其后面并列显示
inline | 内联显示：在元素后面删除换行符，多个元素可以在一行内并列显示。
inline-block | 行内块元素显示：元素的内容以块状显示，行内的其他元素显示在同一行。
list-item | 将元素转换成列表。li的默认类型
table-cell | 单元格类型显示，table默认的display属性值
none | 此元素不会被显示


注意：

**两个特殊的内联元素 img/input**




## 置换元素

在之前的谈`HTML`中的块级元素和内联元素中了解到了内联元素一般是不能设置宽高的，但是也有特殊，比如`img`是内联元素，但可以设置宽高，这肯定让不少人迷惑。这样我们就要引入`HTML`中置换元素的概念。


### 置换元素定义

页面中的显示内容由属性决定，即浏览器根据元素的标签和属性，来决定元素的具体显示内容。


例如：浏览器会根据`<img>`标签的`src`属性的值来读取图片信息并显示出来，而如果查看`html`代码，则看不到图片的实际内容；`<input>`标签的`type`属性来决定是显示输入框，还是单选按钮等。


```html
<img src=""/>   
<input type="text"/>
```
- `img`的显示内容由`src`属性决定
- `input`的显示内容由`type`属性决定


所以`img`和`input`是置换元素，默认`display:inline-block`，所以默认情况下可以设置宽高


### 不可替换元素

`html`的大多数元素是不可替换元素，即其内容直接表现给用户端（如浏览器）


浮动和`inline-block`的区别
- 显示上的区别：`inline-block`会把回车识别为空格
- 是否在标准流：`float`脱离标准流了，`text-align:center` 就不起作用了



**注意：**

- 大部分块元素`display`属性值默认为`block`，其中列表的默认值为`list-item`。
- 大部分内联元素的`display`属性值默认为`inline`,其中`img`,`input`，默认为`inline-block`。
- `table`元素的`display`属性值默认是 `table-cell` 



## 锚链接

- 定义：是网页制作中超级链接的一种，又叫命名锚记。命名锚记像一个迅速定位器一样是一种页面内的超级链接，运用相当普遍。
- 用法：`name`名  或 `#id`名
- 命名锚点链接的应用：
 - 命名锚点的作用：在同一页面内的不同位置进行跳转。
 - 给元素定义命名锚记名：语法：`<标记   id="命名锚记名">    </标记>`
 - 命名锚记连接

语法：<a href="#命名锚记名称"></a>

```html
<a href="#one">星期一</a>
<a name="one"></a>
```

```html
<a href="#id"></a>
<标签 id=“id”></标签>
```

说明：
- a标签才可以用name属性
- 其他标签，如div就要用id属性


```html
<div id="one"></div>
```

## 表单

表单的作用：用来收集用户的信息的

表单的组成：==表单域、表单控件、提示信息==

### 1.表单域
```html
<form name="" method="" action="index.html"></form>
```

- `name` 表单域的名字
- `action` 提交信息的去向，目标地址的`URL`
- `method` 设置提交请求的方式，`get`或`post`，默认是`get`


**get和post区别：**

- get：  url = baseURL + "?username=" + name + "&age=" + age;
- post： 仍然使用基本的URL，将参数信息放在请求实体中发送。

1. `get`是从服务器上获取数据，post是向服务器传送数据。
2. `get`是把参数数据队列加到提交表单的`action`属性所指的`URL`中，值和表单内各个字段一一对应，在`URL`中可以看到。
   `post`是通过`HTTP post`机制，将表单内各个字段与其内容放置在`HTML header`内一起传送到`action`属性所指的`URL`地址,用户看不到这个过程。
3. `get`传送的数据量较小，不能大于`2KB`。
   `post`传送的数据量较大，一般被默认为不受限制。
4. `get`安全性非常低，`post`安全性较高。
   `get`执行效率比`Post`效率高。
5. `get`可分享链接，`post`不可复制链接进行分享；


### 2.表单控件

**1)文本框**
```html
<input type="text" value="默认值"/>
```

**2)密码框**

```html
<input type="password" />
<input type="password" placeholder="密码" />
```

placeholder  占位符

注意：placehoder和value不能同时存在，同时则显示value的值

**3)单选框/单选按钮**

```html
<input type="radio" name="ral" />
<input type="radio" name="ral" />
<input type="radio" name="ral" checked="checked" />(默认选中)
```
