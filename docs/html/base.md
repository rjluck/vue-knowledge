# HTML5

[[toc]]

## HTML5发展历史


浏览器支持情况：不同的浏览器显示的效果可能不一样。因为HTML5没有一个统一的标准，不同的浏览器解析是不一样的，现在还处于一个推广的阶段，但是大部分的是一样的。


- `HTML`指的是 超文本标记语言（Hyper Text Markup Language）
- `XHTML` 指的是 可扩展超文本标记语言 （Extensible Hyper Text Markup Language）


![image](/imgs/html/video.png)


- XHTML并没有引入任何新标签或属性，唯一的区别是语法，XHTML有着更严格的语法(比如：不允许大写字母，标签必须闭合等严格规范)
- XHTML2不向前兼容，乃至不兼容之前的HTML。它是一种全新的语言，赤条条来去无牵挂，这是一场灾祸。
- WHATWG（网页超文本应用技术工作小组） 是一个以推动网络 HTML5标准为目的而成立的组织。在2004年成立。
- HTML5指的是HTML的第5次重大修改（第5个版本）

2004年提出草案，2008年正式发布。




## HTML5特点

### 1.基本骨架更简单


```html
<!doctype html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>    
</body>
</html>
```


### 2.语法更宽松

**元素可以省略结束标签**
- 空元素可省略结束反斜杠的元素：`br`、`hr`、`img`、`input`、`link`、`mata`
- 可以省略结束标签的元素：`colgroup`、`dt`、`dd`、`li`、`optgroup`、`p`、`thead`、`tbody`、`tfoot`、`tr`、`td`、`th`
- 可以全部省略标签的元素：`html`、`head`、`body`、`tbody`


**不区分大小写**    
`<em></Em>`合法


**属性值中只要不包含受限字符（>、=或空格）就可以不加引号**


**只有属性名没有属性值也可以**   

`checked`


**引用外部样式或者js时，type属性可省略**

语法的宽松不是好事，只会带来混乱，推荐遵循以下书写规则
- 包含可选的`html`、`head`、`body`元素有助于将页面内容与其他页面信息分离
- 双标记书写结束标记
- 标签全部小写输入轻松，不会让人触目惊心
- 为属性加引号没有引号的话，一个无效字符就会破坏整个页面




### 3.标签的语义化

语义化的好处：
- 去掉或者丢失样式的时候能够让页面呈现出清晰的结构
- 搜索引擎优化：搜索引擎能够更好的理解你的站点，搜索者查询就越容易与你的内容匹配，因而你的网站列在搜索结果中的可能性就越大；
- 无障碍性，方便其他设备解析（如屏幕阅读器、盲人阅读器、移动设备）渲染网页，让任何人都能无障碍的访问页面；
- 便于团队开发和维护，语义化更具可读性，是下一步网页的重要动向，遵循W3C标准的团队都遵循这个标准，可以减少差异化。
- 未来的功能，如果正确使用语义元素，就能够创建更清晰的页面结构，能够适应未来浏览器和web编辑工具的发展趋势。


新增标签：
- `<header> `头标签：表示页面中一个内容区块或者整个页面的标题 
- `<nav>` 导航标签：表示页面中导航链接的部分
- `<section>` 章节、页眉、栏目：表示一段专题性的内容，一般会带有标题。应用的典型场景有文章的章节、标签对话框中的标签页、或者论文中有编号的部分。
- `<article>`文章标签：表示页面中的一块与上下文不相关的独立内容，譬如博客中的一篇文章或者报纸中的一篇文章
- `<aside>` 侧边栏：Aside表示acticle元素的内容之外的，与article元素的内容相关的辅助信息。
- `<footer>`页脚：表示整个页面或者页面中的一个内容区块的脚注。一般来说，他会包含创作者的姓名、创作日期以及创作者联系信息。
- `<main>`主要内容：主要用于标识网页的主要内容，比如一个网页除了页眉页脚和侧边栏以外的主体部分就可以用main标签包裹。
不能在article,aside,footer,header或者nav中包含main，因为main元素的使命是页面的主要内容，而不是文章的主要内容，换句话说，也就是一个页面只能有一个main标签。
- `<figure>`表示一段独立的内：一般表示文档主体流内容中的一个独立单元。
  - 使用figcaption元素为figure元素添加标题。
  - figure是一种元素的组合，带有可选标题。用来表示网页上一块独立的内容。
  - figcaption表示 figure 的标题。
  - 从属于figure，并且figure中只能放置一个figcaption

```html
<figure>
    <img  src = "" >
    <figcaption>标题</figcaption>
</figure>
```
- `<video>`标记定义一个视频
```html
<video src="movie.ogg" controls="controls">
您的浏览器不支持 video 标签。
</video>
```

属性| 值|描述
---|---|---
autoplay | autoplay| 如果出现该属性，则视频在就绪后马上播放。
controls | controls| 如果出现该属性，则向用户显示控件，比如播放按钮。
loop | loop| 如果出现该属性，则当媒介文件完成播放后再次开始播放。
src | url| 要播放的视频的 URL。

video一共支持三种格式： Ogg、MPEG4、WebM。但这三种格式对于浏览器的兼容性却各不同。

Internet Explorer 8 以及更早的版本不支持` <video>` 标签。

![image](/imgs/html/video.png)

- `<audio>`标记定义一个音频

```html
<audio src="someaudio.wav">
    您的浏览器不支持 audio 标签。
</audio>
```

属性| 值|描述
---|---|---
autoplay | autoplay| 如果出现该属性，则视频在就绪后马上播放。
controls | controls| 如果出现该属性，则向用户显示控件，比如播放按钮。
loop | loop| 如果出现该属性，则当媒介文件完成播放后再次开始播放。
src | url| 要播放的视频的 URL。

![image](/imgs/html/audio.png)

- `<source>` 标记定义媒体资源，即音视频
```html
<audio controls>
      <source src="horse.ogg"   type="audio/ogg">
      <source src="horse.mp3"   type="audio/mpeg">
       您的浏览器不支持 audio 标签。
</audio>
```

- `<hgroup></hgroup>`用来表明标题的集合：如果有主标题、副标题，可以使用这个来包裹一下，一般比较常见的就是网站的标题和网站描述（HTML 5.1中废除）
```html
<hgroup>
    <h1></h1>
</hgroup>
```
- `<dialog></dialog>`标记定义一个对话框：目前只有 Chrome 和 Safari 6 支持 `<dialog>` 标签
- `<embed>`标记定义外部的可交互的内容或插件。比如 flash。
```html
<embed src="helloworld.swf" />
```

- `<mark></mark>`高亮显示文字，一个比较典型的应用就是在搜索结果中向用户高亮显示搜索关键词。
可设置背景色和字体颜色。
- `<canvas></canvas>`表示图形，比如图标和其他图像。这个元素本身没有行为，仅提供一块画布，但它把一个绘图API展现给客户端js，以使脚本能够把想绘制的东西绘制到这块画布上。
```html
<canvas id=“myCanvas” width=“200” height=“200”></canvas>
```

- `details`和`summary`折叠框：把折叠的区块放在details标签中，把标题放在summary标签中。
目前只有chrome浏览器支持，用户单击标题会把完整的内容显示出来，不支持的则上来就会显示所有内容，用户也不能把内容折叠起来。

```html
<details>
  <summary>明天下午考试</summary>
  <p>考察**知识点，时间5:30</p>
  <p>哈哈哈</p>
</details>
```

- 改良的`ol`
  - 可以自定义编号 `start`（取值只能为数值）   
  - 可以按编号反向排序 `reversed`（从你开始的值倒数，字母没有负数，会用数字代替）  

例：
```html
<ol start=3>
    <li>aaaa</li>
    <li>aaaa</li>
    <li>aaaa</li>
</ol>
```

![image](/imgs/html/ol.png)




### 4.浏览器的兼容（怎样让老浏览器兼容新标签）

#### 为语义元素添加样式

浏览器在遇到不认识的元素时，会把他们当成内联元素。

CSS样式中添加一条“超级规则”：

```css
<style>
       article, aside, canvas, details, figcaption, figure,
        footer, header, menu, nav, section, summary
        {
            display: block;
        }
</style>
```

#### 使用HTML5“垫片”

对于较早版本的`IE`，还要面临一个挑战：他们会拒绝给无法识别的元素应用样式。可以通过js创建元素，骗过IE，让他识别外来元素。

```html
<!--[if lt IE 9]>
<script type="text/javascript">
      document.creatElement(“header”);
</script>
<![endif]-->
```

==拓展：==

识别浏览器的特殊注释

```html
<!--[if IE]> 所有的IE可识别 <![endif]-->
<!--[if IE 6]> 仅IE6可识别 <![endif]-->
<!--[if lt IE 6]> IE6以及IE6以下版本可识别 <![endif]-->
<!--[if IE 7]> 仅IE7可识别 <![endif]-->
<!--[if lt IE 7]> IE7以及IE7以下版本可识别 <![endif]-->
<!--[if gt IE 7]> IE7以上版本可识别 <![endif]-->
<!--[if IE 8]> 仅IE8可识别 <![endif]-->
<!--[if IE 9]> 仅IE9可识别 <![endif]-->
less  than
great  than
```


#### 用框架的方法，用到条件注释加JS代码实现

代码如下:
```html
<!--[if lt IE 9]>
    <script src="html5shiv.js"></script>
<![endif]-->
```

直接加入这一句代码就可实现兼容问题，关于条件注意中的是判断是否小于IE9以下浏览器，如果是就执行这段JS代码 ，如果不是，就忽略掉。至于JS中的链接直接打开进去看看就知道了，也是一大段的代码。

- 引用网址：http://html5shim.googlecode.com/svn/trunk/html5.js
- 下载网址：http://tinyurl.com/the-shiv






### 5.构建更好的Web表单

#### 新的属性
- 通过占位符文本添加提示`placeholder`占位符通常用作示例值，用来表示值的格式，不要用它代替字段的描述或说明。
- 焦点：挑选正确的起点`autofocus`打开浏览器，直接自动获取焦点

#### 表单验证
- 验证必填表单不能为空 `required`（必填）
- 使用正则表达式 `pattern=“[A-Z]{3}-[0-9]{3}”`点击提交按钮后进行验证，只要发现一个无效值就会停下来，不再验证其他字段，用户纠正了错误后，点击提交按钮，进行第二次验证。

> 现成的正则表达式：http://regexlib.com/

> 想要成为正则表达式高手，可以看《精通正则表达式》（Jeffery Friedl著，O’Reilly英文版；余晟译，电子工业出版社中文版）

> 邮箱：^\w+@[a-zA-Z_]+\.[a-zA-Z]{2,3}$
> 生日：^([0-9]{0,2})-([0-9]{0,2})-([0-9]{0,4})$    日-月-年（25-09-98）


- 禁用`HTML5`自带的表单验证
  - `novalidate`当提交表单时不对表单数据（输入）进行验证
```html
<form name="" method="get"  novalidate></form>
```



#### 新的输入控件
- `email`：专门用来输入email地址的文本框,如果该文本框中内容不是email地址格式的，则不允许提交。
但它不检查email地址是否存在。提交时可以为空，除非加上了required属性。
具有multiple属性，它允许在该文本框中输入一串以逗号分隔的email地址。
- `tel`：电话号码有很多种模式，有的只包含数字，有的还会有空格、短横线、加号和圆括号，真是因为有这么多的差异，所以没有要求浏览器验证电话号码。目前电话控件的唯一用途是在移动端定制虚拟键盘。
- `url`：专门用来输入URL地址（指的是http://........）的文本框。如果该文本框中内容不是URL地址格式的，则不允许提交。   
例：
```html
<input name=‘url’ type=‘url’  value=“http://www.baidu.com”>
```

- `number`：专门用来输入数字的文本框。
在提交时会检查其中的内容是否为数字，具有min、max、step的属性。
例：
```html
<input  name=“number1”  type=“number”  value=“25”  min=“最小”  max=“最大”  step=“间隔，不写默认为1” />
```

- `range`滑动条：是用来只允许输入一段范围内数值的文本框，它具有min属性与max属性，及step属性，可以指定每次拖动的步幅。在浏览器中你看不到对应的数值，如果你想看到，就必须借助JavaScript响应滑动条的变化事件（onChange）;
例：
```html
<input type="range" min="10" max="100" step="5" value="2" id="range" onchange="text.value = range.value"><input type="text" id="text">
```

- `date pickers` (date, month, week, time, datetime, datetime-local)
拥有多个可供选取日期和时间的新输入类型。
 - date - 选取日、月、年
 - month - 选取月、年
 - week - 选取周和年 （手机端支持不好）
 - time - 选取时间（小时和分钟）
 - datetime-local - 选取时间、日、月、年（本地时间）

- `Color`  （手机端支持不好）：用来选取颜色。
- `search` 搜索框：输入内容后右侧会有一个×，可以点击取消，除此之外与text文本框别无差异，但search的值是有特定语义的，可以让浏览器或者辅助上网软件知道它是干什么用的。



#### 新增的元素

- `output`（了解）：定义不同类型的输出，如计算结果的输出，或脚本的输出。
注：必须从属于某个表单。即，必须将它书写在表单内部，或对它添加form属性。

```html
<form oninput="out.value = parseInt(txt1.value) + parseInt(txt2.value)">
    <input type="text" id="txt1">
    <input type="text" id="txt2">
    <output name="out"></output>
</form>注：oninput 事件在用户输入时触发。
```

- `Datalist`：提供一个事先定义好的列表，通过id与input的list关联，当在input内输入时就会有自动搜索的功能，用户将会看见一个下拉列表供其选择。(手机端支持不好)
```html
<p>浏览器版本：<input list="words"></p>
<datalist id="words">
  <option value="浏览器">
  <option value="Firefox">
  <option value="Chrome">
  <option value="Opera">
  <option value="Safari">
  <option value="Sogou">
  <option value="Maxthon">
</datalist>
```


## HTML5基本

### 1.web标准的概念及组成

web标准不是某一个标准，而是一系列标准的集合。

==网页主要由三部分组成：结构、表现和行为。==
- 结构化标准语言主要包括`HTML`（超文本标记语言hyper text markup language）和`XML`(可扩展标记语言，主要用于传输数据)
- 表现标准语言主要包括`css`
- 行为标准语言主要包括文档对象模型`DOM`、`ECMAScript`等

![image](/imgs/html/web.png)


W3C(World wide Web Consortium)万维网联盟，创建于1994年是web技术领域最具权威和影响力的国际中立性技术标准机构。

- `W3C`制定的结构和表现的标准。 
- `ECMA(`欧洲电脑厂商联合会)制定的行为标准。


### 2.HTML基本结构和语法

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset = "utf-8">
	<title></title>
</head>
<body>

</body>
</html>
```

- `<!DOCTYPE html>` 文档类型声明头，告诉浏览器当前文件是`html`，在不同版本里是不一样的
- `utf-8` 字符编码，错误页面可能会导致乱码
- `<title></title>` 页面标题  
- `<body></body>` 网页主体 

> 标签的格式
> 双标签：<标签 属性="属性值"></标签>
> 单标签：<标签 属性="属性值"/>

### 3.html具体标签内容



#### (1)标题、段落和文本（有语义）

标题h1~h6（有语义）
```html
<h1>一级标题</h1>
<h2>二级标题</h2>
<h3>三级标题</h3>
<h4>四级标题</h4>
<h5>五级标题</h5>
<h6>六级标题</h6>
```

段落 p （有语义）
```html
<p></p>
```


文本
```html
&nbsp; 空格
<br/>  换行
<hr/>  分割水平线
<b></b>  加粗（单纯加粗）
<strong></strong> 加粗（强调突出）
<i></i>  倾斜
<em></em>  倾斜（常用）
```


兼容性不是很好，每个浏览器对它的解析是不一样的


#### (2)列表-有语义

- 无序列表
```html
<ul>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
</ul>
```
ul里只能放li,其他标签可以放在li里

```html
<ul>
    <li>
        <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
    </li>
    <li></li>
    <li></li>
    <li></li>
</ul>
```

ul标签上的相关属性

属性|属性值|默认
---|:--:|:---:
type|circle(空心圆)/square(实心方块)/disc(实心圆)/none|dist



```html
<ul type="disc">
    <li></li>
    <li></li>
    <li></li>
    <li></li>
</ul>
```


- 有序列表
```html
<ol>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
</ol>
```


> 有序列表和无序列表可以相互嵌套

```html
<ol>
    <li>
        <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
    </li>
    <li></li>
    <li></li>
    <li></li>
</ol>
``` 

ol标签上的相关属性

属性|属性值|默认
---|:--:|---:
type|a/A/I/i/1|1
start|数字，如3,2|1

```html
<ol type="a" start="3">
    <li></li>
    <li></li>
    <li></li>
    <li></li>
</ol>
```


- 自定义列表
  - 一个dl里只能有一个dt,但是可以有多个dd，同时自定义列表里也可以嵌套有序、无序列表
  - 自定义列表多数应用于图文混排，图片放在dt里，文字放在dd里。
```html
<dl>
    <dt>标题</dt>
    <dd>内容</dd>
</dl>
```



#### (3)插入图片-有语义

```html
<img/>
```

属性|属性值|说明
---|:--:|---:
src|—|图片路径
width|数字|图片宽度
height|数字|图片高度
title|-|鼠标移上的提示信息
alt|-|当图片路径找不到，会显示替换文本

```html
<img src=" img.jpg" width="100" title="嘻嘻嘻" alt="替换文本"/>
```

>理解相对路径和绝对路径

>只写width或height属性会等比缩放，一起写就会变形，最好只写一个


#### (4)超链接-有语义

```html
<a></a>
```

属性|属性值|说明
---|:--:|---:
href|—|跳转路径
name|-|定义书签
title|-|提示文本
target|_blank(新窗口打开)、_self(当前窗口打开)|页面打开方式

```html
<a href="list.html" target="_blank">跳转到列表页</a>
```



>若跳转路径不确定，可以写 `#` 代替，表示空链接
```html
<a href="#">跳转到列表页</a>
```

>其他应用（邮箱跳转、文件下载、定义书签）,文件下载最好是压缩包

```html
<a href="mailto:1085879662@qq.com">邮箱跳转</a>
<a href="zzz.rar">文件下载</a>
```

eg：定义书签
```html
<a href="#one">跳转到one</a>

<a name="one">跳转到one</a>
```



#### (5)表格table-有语义

``` html
<table>
    <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
</table>
```


属性|属性值|说明
---|:---:|:---:
border|数字|边框宽度
width|数字|宽度,可应用于table和td标签上
height|数字|高度,可应用于table和td标签上
cellspacing|数字|单元格之间的间隙
cellpadding|数字|边框与内容之间的间距
bgcolor|red……|背景色,可应用于table和td标签上
align|right/left/center|水平对齐方式,可应用于table和td标签上
colspan|数字|列合并,用于td标签上
rowspan|数字|行合并,用于td标签上



```html
<table  border="1" width="200" height="300" cellspacing="0" cellpadding="0">
    <tr>
        <td></td>
        <td></td>
        <td bgcolor="red"></td>
        <td align="right"></td>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
</table>
```

++合并单元格++


1)列合并
```html
<table>
    <tr>
        <td colspan="2">1</td>
    </tr>
    <tr>
        <td>3</td>
        <td>4</td>
    </tr>
</table>
```

2)行合并
```html
<table>
    <tr>
        <td rowspan="2">1</td>
        <td>2</td>
    </tr>
    <tr>    
        <td>4</td>
    </tr>
</table>
```



***练习*：**

![image](/imgs/html/table.png)
```html
<table border="1" cellspacing="0" cellpadding="0" width="400" height="200">
    <tr>
    	<td width="80" align="center">表式编号</td>
        <td colspan="3" align="center"></td>
    </tr>
    <tr>
        <td width="80" align="center">修改状态</td>
        <td width="40" align="center"></td>
        <td width="40" align="center">版本</td>
        <td width="40" align="center"></td>
    </tr>
</table>
```



#### (6)div-无语义
- 实现页面布局,默认独占一行（行内元素）
```html
<div></div>
```



#### (7)span-无语义
- 控制某个字节，不会独占一行（内联元素）

```html
<span></span>
```


#### (8)表单相关元素
- 用来收集用户的信息的。

1)表单框

```html
<form method="get">  </form>
```

属性|属性值|说明
---|:---:|:---:
method|get/post|提交方式,默认是get


2)文本框
```html
<input type="text" value="默认值" name="zhanghao"/>
```



3)密码框
```html
<input type="password" name="password"/>
```

4)提交按钮
```html
<input type="submit" value="按钮内容" />
```


5)单选框/单选按钮

```html
<input type="radio" name="ral" />
<input type="radio" name="ral" />
<input type="radio" name="ral" />
```

注意：单选必须添加相同的name属性及属性值

6)复选框/复选按钮

```html
<input type="checkbox" name="like" />
<input type="checkbox" name="like" /> 
```

注意:当属性值与属性名相同时，属性值可以省略不写



7)重置按钮

```html
<input type="reset" value="按钮内容" />
```


## HTML注释方式

```html
<!-- html注释 -->
```
