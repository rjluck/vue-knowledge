#  JavaScript简介
[[toc]]

## 初识JavaScript

### 1.JavaScript历史
- 布兰登·艾奇(Brendan Eich,1961年~)
- 神奇的大哥在1995年利用10天完成JavaScript设计。
- 网景公司最初命名为LiveScript,后来在与Sun合作之后将其改名为JavaScript

### 2.JavaScript是什么
- JavaScript是世界上最流行的语言之一，是一种运行在客户端的脚本语言(Script是脚本的意思)
- 脚本语言：不需要编译，运行过程中由js解释器（js引擎）逐步来进行解释并执行
- 现在也可以基于Node.js技术进行服务器端编程

### 3.JavaScript的作用
- 表单动态校验（密码强度检测）- js产生最初的目的
- 网页特效
- 服务端开发（Node.js）
- 桌面程序（Electron）
- App(Cordova)
- 控制硬件-物联网（Ruff）
- 游戏开发（cocos2d-js）

### 4.HTML/CSS/JS的关系

> HTML/CSS标记语言 -- 描述类语言
- HTML决定网页结构和内容，相当于人的身体
- CSS决定网页呈现给用户的模样

> JS脚本语言 -- 编程类语言
- 实现业务逻辑和页面控制（决定功能），相当于人的各种动作。


### 5.浏览器执行js简介

浏览器分成两部分：**渲染引擎**和**JS引擎**
- 渲染引擎：用来解析HTML与CSS，俗称*内核*，比如chrome浏览器的bink,老版本的webkit
- JS引擎：也成JS解释器。用来读取网页中的JavaScript代码，对其处理后运行，比如Chrome浏览器的v8

浏览器本身并不会执行js代码，而是通过内置的javaScript引擎（解释器）来执行JS代码。JS引擎执行代码时逐步解释每一句源码（转换为机器语言），然后由计算机去执行，所以js语言归为脚本语言，会逐步解释执行。

### 6.JS的组成

- ECMAScript(JavaScript语法)
ECMAScript 是由ECMA国际（原欧洲计算机制造商协会）进行标准化的一门编程语言，这种语言在万维网上应用广泛，它往往被称为JavaScript或JScript,但实际上后两者是ECMAScript
语言的实现和扩展。

ECMAScript包括JavaScript(网景公司)和JScript(微软公司)

ECMAScript规定了JS的编程语法和基础核心知识，是所有浏览器厂商共同遵守的一套JS语法工业标准。

- DOM(页面文档对象模型)
文档对象模型(Document Obj Model,简称DOM),是W3C组织推荐的处理可扩展标记语言的标准编程接口。通过DOM提供的接口可以对页面上的各种元素进行操作(大小、位置、颜色等)

- BOM(浏览器对象模型)
BOM(Browser Object Model,简称BOM)是指浏览器对象模型，它提供了独立于内容的、可以与浏览器窗口进行互动的对象结构。通过BOM可以操作浏览器窗口，比如弹出框、控制浏览器跳转、获取分辨率等。

### 7.JS写法种类

**(1)行内式的js 直接写到元素的内容**
```js
<input type="button" value="点我试试" onclick="alert('11')">
```
- 可以将单行或少量JS代码写在HTML标签的事件属性中(以on开头的属性)
- 在HTML中我们推荐使用双引号,JS中我们推荐使用单引号
- 可读性差，在html中编写js大量代码时，不方便阅读，特殊情况用。

**(2)内嵌式的js**
```js
<script>
    alert('1111')
</script>
```
- 可以将多行JS代码写到`<script>`标签中
- 内嵌JS是学习时常用的方式

**(3)外部引入js**
```js
<script src="xxx.js"></script>
```
- 利于HTML页面代码结构化，把大段js代码独立到HTML页面之外,既美观，也方便文件级别的复用
- 引用外部JS文件的script标签中间不可以写代码
- 适合于js代码量比较大的情况


## JavaScript注释

- 单行注释 `//`   默认快捷键`ctrl + ?`
- 多行注释 `/* */`  默认快捷键 `shift+alt+a`

## JavaScript输入输出语句

为了方便信息的输入输出，JS提供了一些输入输出语句，其常用的语句如下：
方法 | 说明
---|---
alert(msg) | 浏览器弹出警示框
console.log(msg) | 浏览器控制台打印输出消息
prompt(info) | 浏览器弹出输入框，用户可以输入