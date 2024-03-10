# 语法

[[toc]]


## WXML语法

数据绑定的基本规则
- 在`data`中定义数据
- 在`WXML`中使用数据

### 数据绑定

**在data中定义页面的数据**
在页面对应`.js`文件中，把数据定义到`data`对象中即可：
```js
pages({
  data:{
    info:'init data',// 字符串类似的数据
    msgList:[{msg:'hello'},{msg:'world'}]// 数组类型的数据
  }
})
```


**Mustance语法的格式**
把data中的数据绑定到页面中渲染，使用**Mustance**语法（双大括号）将变量包起来即可。语法格式为
```wxml
<view>{{ 要绑定的数据名称 }}</view>
```


**Mustache语法的应用场景**
Mustache语法的主要应用场景如下：
- 绑定内容
- 绑定属性
- 运算（三元运算、算术运算等）



**动态绑定内容**
![image](/imgs/applet/wx/wx37.png)




**动态绑定属性**
![image](/imgs/applet/wx/wx38.png)


> 注意：`vue`中动态绑定属性用`v-bind`，而小程序中用`{{ }}`动态绑定属性




**三元运算**
![image](/imgs/applet/wx/wx39.png)



**算数运算**
![image](/imgs/applet/wx/wx40.png)



### 事件绑定

#### 什么是事件？

事件是渲染层到逻辑层的通讯方式。通过事件可以将用户在渲染层产生的行为，反馈到逻辑层进行业务的处理。
![image](/imgs/applet/wx/wx41.png)


#### 小程序中常用的事件

![image](/imgs/applet/wx/wx42.png)


#### 事件对象的属性列表
当事件回调触发的时候，会收到一个事件对象`event`,它的详细属性如下表所示：


![image](/imgs/applet/wx/wx43.png)



**target和currentTarget**的区别
-`target`是触发该事件的源头组件
- `currentTarget`则是当前事件所绑定的组件

![image](/imgs/applet/wx/wx44.png)

点击内部的按钮时，点击事件以**冒泡**的方式向外扩散，也会触发外层`view`的`tap`事件处理函数。

此时对于外层`view`来说：
- `e.target`指向的是触发事件的源头组件，因此，`e.target是内部的按钮组件`
- `e.currentTarget`指向的是当前正在触发事件的那个组件，因此，`e.currentTarget`是当前的`view`组件




**bindtap**的语法格式
在小程序中，不存在`HTML`中的`onclick`鼠标点击事件，而是通过`tap事件`来响应用户的触摸行为。
- 通过`bindtap`,可以为组件绑定`tap`触摸事件，语法如下：
![image](/imgs/applet/wx/wx45.png)

- 在页面的`.js`文件中定义对应的事件处理函数，事件参数通过形参event(一般简写成e)来接收：
![image](/imgs/applet/wx/wx46.png)



**bindinput**的语法格式
在小程序中，通过`input事件`来响应文本框的输入事件，语法格式如下：
- 通过`bindinput`,可以为文本框绑定输入事件
![image](/imgs/applet/wx/wx51.png)
- 在页面的`.js`文件中定义事件处理函数
![image](/imgs/applet/wx/wx52.png)





#### 在事件处理函数中为data中的数据赋值

通过调用`this.setData(dataObject)`方法，可以给页面data中的数据重新赋值，示例如下：

![image](/imgs/applet/wx/wx47.png)


#### 实现文本框和data之间的数据同步
实现步骤：
- 定义数据
![image](/imgs/applet/wx/wx53.png)
- 渲染结构
![image](/imgs/applet/wx/wx54.png)
- 美化样式
![image](/imgs/applet/wx/wx55.png)
- 绑定input事件处理函数
![image](/imgs/applet/wx/wx56.png)

### 事件传参

小程序中的事件传参比较特殊，**不能在绑定事件的同时为事件处理函数传递参数**。例如，下面的代码不能正常工作：

vue中会这么写：
![image](/imgs/applet/wx/wx48.png)

注意：小程序中是不可以的

因为小程序会把`bindtap`的属性值，统一当做事件名称来处理，相当于要调用一个名称为`btnHandler(123)`的事件处理函数。

所以，在小程序中，可以为组件提供`data-*`自定义属性传参，其中`*`代表的是参数的名字，示例代码如下：
![image](/imgs/applet/wx/wx49.png)

最终：
- `info`会被解析为**参数的名字**
- 数值`2`会被解析为**参数的值**



在事件处理函数中，通过`event.target.dataset.参数名`即可获取到具体参数的值，示例代码如下：
![image](/imgs/applet/wx/wx50.png)






### 条件渲染

#### wx:if

在小程序中，使用`wx:if="{{condition}}"`来判断是否需要渲染该代码块：
![image](/imgs/applet/wx/wx57.png)
也可用`wx:elif`和`wx:else`来添加`else`判断
![image](/imgs/applet/wx/wx58.png)


#### 结合`<block>`使用`wx:if`
如果要一次性控制多个组件的展示与隐藏，可以使用一个`<block></block>`标签将多个组件包装起来，并在`<block>`标签上使用`wx:if`控制属性，示例如下：
![image](/imgs/applet/wx/wx59.png)

> 注意：`<block>`并不是一个组件，它只是一个包裹性质的容器，不会在页面中做任何渲染。


#### hidden

在小程序中，直接使用`hidden="{{condition}}"`也能控制元素的显示与隐藏：
![image](/imgs/applet/wx/wx60.png)


#### wx:if与hidden对比

（1）运行方式不同
- `wx:if`以**动态创建和移除元素**的方式，控制元素的展示与隐藏
- `hidden`以**切换样式**的方式（`display:none/block`），控制元素的显示与隐藏

（2）使用建议
- 频繁切换时，建议使用`hidden`
- 控制条件复杂时，建议使用`wx:if`搭配`wx:elif`、`wx:else`进行展示与隐藏的切换


### 列表渲染

#### wx:for
通过`wx:for`可以根据指定的数组，循环渲染重复的组件结构，语法示例如下：
![image](/imgs/applet/wx/wx61.png)

默认情况下，当前循环项的**索引**用`index`表示；当前**循环项**用`item`表示。


#### 手动指定索引和当前项的变量名
- 使用`wx:for-index`可以指定**当前循环项的索引**的变量名
- 使用`wx:for-item`可以指定当前项的变量名
![image](/imgs/applet/wx/wx62.png)



#### wx:key的使用
类似于Vue列表渲染中的`:key`,小程序在实现列表渲染时，也建议为渲染出来的列表项指定唯一的`key`值，从而提高渲染啊效率，示例代码如下：

![image](/imgs/applet/wx/wx63.png)





## WXSS样式

WXSS(WeiXin Style Sheets)是一套样式语言，用于美化`WXML`的组件样式，类似于网页开发中的`CSS`

### WXSS和CSS的关系
WXSS具有CSS大部分特性，同时WXSS还对CSS进行了扩充以及修改，以适应微信小程序的开发。

与CSS相比，WXSS扩展的特性有：
- `rpx`尺寸单位
- `@import`样式导入

![image](/imgs/applet/wx/wx64.png)

### rpx


#### 定义
`rpx(responsive pixel)`是微信小程序独有的，用来解决屏适配的尺寸单位。

> 在移动端普通网页适配永达rem，百分比布局等。但是小程序直接用rpx即可


#### 实现原理

rpx的实现原理非常简单：鉴于不同设备屏幕的大小不同，为了实现屏幕的自动适配，`rpx`把所有设备的屏幕，在宽度上**等分为750份**（即：当前屏幕的总宽度为`750rpx`）
- 在较小的设备上，`1rpx`所代表的宽度较小
- 在较大的设备上，`1rpx`所代表的宽度较大


小程序在不同设备上运行的时候，会自动把`rpx`的样式单位换算成对应的像素单位来渲染，从而实现屏幕适配。


#### rpx与px之间的单位换算

在`iphone6`上，屏幕宽度为`375px`,共**750个物理像素**，等分为`750rpx`。则：
- 750rpx = 375px = 750物理像素
- 1rpx = 0.5px = 1物理像素
![image](/imgs/applet/wx/wx65.png)


> 官方建议：开发微信小程序时，设计师可以用iphone6作为视觉稿的标准。
> 开发举例：在iphone6上如果要绘制宽100px,高20px的盒子，换算成rpx单位，宽高分别为200rpx和40rpx


### 样式导入

#### 定义
使用WXSS提供的`@import`语法，可以导入外联的样式表。

#### @import语法格式

`@import`后跟需要导入的外联样式表的**相对路径**，用`;`表示语句结束。示例如下：
![image](/imgs/applet/wx/wx66.png)




### 全局/局部样式

#### 全局样式
定义在`app.wxss`中的样式为全局样式，作用于每一个页面。



#### 局部样式
在`页面的.wxss`文件中定义的样式为局部样式，只作用于当前页面。

注意：
- 当局部样式和全局样式冲突时，根据**就近原则**，局部样式会**覆盖**全局样式
- 当局部样式的**权重大于或等于**全局样式的权重时，才会覆盖全局的样式







## 全局配置


小程序根目录下的`app.json`文件是小程序的全局配置文件。常用的配置项如下：
- `pages`:记录当前小程序所有野蛮的存放路径
- `window`:全局设置小程序窗口的外观：导航栏区域（navigationBar）及背景区域（background）
- `tabBar`:设置小程序底部的tabBar效果
- `style`:是否启用新版组件样式


### 小程序窗口的组成部分

![image](/imgs/applet/wx/wx67.png)


### 了解window节点常用的配置项
![image](/imgs/applet/wx/wx68.png)


（1）设置导航栏的标题
- 设置步骤：`app.json`->`window`->`navigationBarTitleText`
![image](/imgs/applet/wx/wx70.png)
![image](/imgs/applet/wx/wx69.png)



（2）设置导航栏的背景色
- 设置步骤：`app.json`->`window`->`navigationBarBackgroundColor`
![image](/imgs/applet/wx/wx72.png)
![image](/imgs/applet/wx/wx71.png)

> 注意：设置背景要用带有`#`格式的，不能用文本类，如`red`等




（3）设置导航栏的标题颜色
- 设置步骤：`app.json`->`window`->`navigationBarTextStyle`


> 注意：`navigationBarTextStyle`的可选值只有black和white



（4）全局开启下拉刷新功能

概念：下拉刷新是移动端的专有名词，指的是通过手指在屏幕上的下拉滑动操作，从而重新加载页面数据的行为

- 设置步骤：`app.json`->`window`->把`enablePullDownRefresh`的值设置为`true`

> 注意：在`app.json`中启用下拉刷新功能，会作用于每个小程序页面！



（5）设置下拉刷新时窗口的背景色
当全局开启下拉刷新功能之后，默认的窗口背景为白色。如果自定义下拉刷新窗口背景色，设置步骤：
- `app.json`->`window`->为`backgroundColor`指定`16进制`的颜色值`#efefef`。效果如下：
![image](/imgs/applet/wx/wx73.png)
![image](/imgs/applet/wx/wx74.png)




（6）设置下拉刷新时loading的样式

当全局开启下拉刷新功能之后，默认的`loading`样式为白色，如果要更改`loading`样式的效果，设置步骤为`app.json`->`window`->为`backgroundTextStyle`指定`dark`值。效果如下：

![image](/imgs/applet/wx/wx75.png)
![image](/imgs/applet/wx/wx76.png)

> 注意：`backgroundTextStyle`的可选值只有light和dark



（7）设置上拉触底的距离

概念：上拉触底是移动端的专有名词，通过手指在屏幕上的上拉滑动操作，从而加载更多数据的行为。

设置步骤：
- `app.json`->`window`->为`onReachBottomDistance`设置新的数值
![image](/imgs/applet/wx/wx77.png)

> 距离：滚动条距离底部多少的时候开始加载下一页

> 注意：默认距离为50px,如果没有特殊需求，建议使用默认值即可。



### tabBar

tabBar是移动端应用常见的页面效果，用于实现多页面的快速切换。小程序中通常将其分为：
- 底部tabBar
- 顶部tabBar
![image](/imgs/applet/wx/wx78.png)

注意点：
- `tabBar`中只能配置最少2个、最多5个tab页标签
- 当渲染顶部`tabBar`时，不显示icon，只显示文本


#### tabBar的6个组成部分

![image](/imgs/applet/wx/wx79.png)

- `backgroundColor`:`tabBar`的背景色
- `selectedIconPath`:选中时的图片路径
- `selectedColor`:`tab`上文字选中的颜色
- `borderStyle`:`tabBar`上边框的颜色
- `iconPath`:未选中时的图片路径
- `color`:`tab`上文字默认（未选中）的颜色



#### tabBar节点的配置项
![image](/imgs/applet/wx/wx80.png)


**每个tab项的配置选项**
![image](/imgs/applet/wx/wx81.png)



- 打开`app.json`配置文件，和`pages`、`window`平级，新增`tabBar`节点
- `tabBar`节点中，新增`list数组`，这个数组中存放的是每个tab项的配置对象
- 在list数组中，新增每一个tab项的配置对象。对象中包含的属性如下：
  - pagePath【必填】
  - text【必填】
  - iconPath【可选】
  - selectedIconPath【可选】
![image](/imgs/applet/wx/wx82.png)

## 页面配置


### 定义

小程序中，每个页面都有自己的`.json`配置文件，用来对**当前页面**的窗口外观、页面效果等进行配置。

### 页面配置和全局配置的关系

小程序中，`app.json`中的`window`节点，可以全局配置小程序中每个页面的窗口表现。

如果某些小程序页面想要拥有特殊的窗口表现，此时，“页面级别的`.json`配置文件”就可以实现这种需求。

> 注意：当页面配置与全局配置冲突时，根据**就近原则**，最终的效果**以页面配置为准**。

![image](/imgs/applet/wx/wx83.png)


### 页面配置中常用的配置项

![image](/imgs/applet/wx/wx84.png)



## 网络数据请求


### 小程序中网络数据请求的限制

出于安全性方面的考虑，小程序官方对数据接口的请求做出了如下两个限制：
- 只能请求`HTTPS`类型的接口
- 必须将**接口的域名**添加到**信任列表**中
![image](/imgs/applet/wx/wx85.png)


### 配置request合法域名

需求描述：假设在自己的微信小程序中，希望请求`https://www.wscook.cn/`域名下的接口

配置步骤：
- 登录微信小程序管理后台->开发->开发设置->服务器域名->修改request合法域名
![image](/imgs/applet/wx/wx86.png)



注意事项：
- 域名只支持`https`协议
- 域名不能使用`ip`地址或`localhost`
- 域名必须经过`ICP`备案
- 服务器域名一个月内最多可申请5次修改



### 发起GET请求

调用微信小程序提供的`wx.request()`方法，可以发起`GET`数据请求，示例代码如下：

![image](/imgs/applet/wx/wx87.png)


### 发起POST请求

调用微信小程序提供的`wx.request()`方法，可以发起`POST`数据请求，示例代码如下：
![image](/imgs/applet/wx/wx88.png)


### 在页面港加载时请求数据

在很多情况下，我们需要在页面刚加载的时候，自动请求一些初始化的数据。此时需要在页面的`onLoad`事件中调用获取数据的函数，示例代码如下：
![image](/imgs/applet/wx/wx89.png)


### 跳过request合法域名校验

如果后端程序员仅仅提供了`http`协议的接口、暂时没有提供`https`协议的接口。

此时为了不耽误开发的进度，我们可以在微信开发者工具中，临时开启**【开发环境不校验请求域名、TLS版本及HTTPS证书】**选项，跳过`request`合法域名的校验。
![image](/imgs/applet/wx/wx90.png)


> 注意：跳过`request`合法域名校验的选项，仅限在开发与调试阶段使用！


### 关于跨域和Ajax的说明

跨域问题只存在于基于浏览器的Web开发中。由于小程序的宿主环境不是浏览器，而是微信客户端，所以**小程序中不存在跨域的问题**。

`Ajax`技术的核心是依赖于浏览器中的`XMLHttpRequest`这个对象，由于小程序的宿主环境是微信客户端，所以小程序中不能叫做“发起Ajax请求”,而是叫做“**发起网络数据请求**”。





## 视图与逻辑

### 页面导航

#### 什么是页面导航

页面导航指的是**页面之间的相互跳转**。例如。浏览器中实现页面导航的方式有如下两种：
- `<a>链接`
- `location.href`

#### 小程序中实现页面导航的两种方式
##### （1）声明式导航
- 在页面上声明一个`<navigator>`导航组件
- 通过点击`<navigator>`组件实现页面跳转


**导航到tabBar页面**

tabBar页面指的是被配置为tabBar的页面。

在使用`<navigator>`组件跳转到指定的`tabBar`页面时，需要指定`url`属性和`open-type`属性，其中：
- `url`表示要跳转的页面的地址，必须以`/`开头
- `open-type`表示跳转的方式，必须为`switchTab`
![image](/imgs/applet/wx/wx92.png)


**导航到非tabBar页面**
非tabBar页面指的是没有被配置为tabBar的页面。

在使用`<navigator>`组件跳转到普通的`tabBar`页面时，需要指定`url`属性和`open-type`属性，其中：
- `url`表示要跳转的页面的地址，必须以`/`开头
- `open-type`表示跳转的方式，必须为`navigate`
![image](/imgs/applet/wx/wx93.png)



> 注意：为了简便，在导航到非tabBar页面时，`open-type="navigate"`属性可以省略。


**后退导航**

如果要后退到上一页或多级页面，则需要指定`open-type`属性和`delta`属性，其中：
- `open-type`的值必须是`navigateBack`,表示要进行后退导航
- `delta`的值必须是数字，表示要后退的层级
![image](/imgs/applet/wx/wx94.png)


> 注意：为了简便，如果只是后退到上一页面，则可以省略`delta`属性，因为其默认值就是1



##### （2）编程式导航
- 调用小程序的导航API,实现页面的跳转


**导航到tabBar页面**
调用`wx.switchTab(Object Object)`方法，可以跳转到`tabBar`页面。其中`Object`参数对象的属性列表如下：
![image](/imgs/applet/wx/wx95.png)


示例代码如下：
![image](/imgs/applet/wx/wx96.png)




**导航到非tabBar页面**
调用`wx.navigateTo(Object Object)`方法，可以跳转到非`tabBar`页面。其中`Object`参数对象的属性列表如下：
![image](/imgs/applet/wx/wx97.png)


示例代码如下：
![image](/imgs/applet/wx/wx98.png)




**后退导航**
调用`wx.navigateBack(Object Object)`方法，可以返回上一页面或多级页面。其中`Object`参数对象可选的属性列表如下：
![image](/imgs/applet/wx/wx99.png)


示例代码如下：
![image](/imgs/applet/wx/wx100.png)



#### 导航传参
##### （1）声明式导航传参

`navigator`组件的`url`属性用来指定将要跳转到的页面路径。同时，路径的后面还可以携带参数：
- 参数和路径之间使用`?`分隔
- 参数键与参数值用`=`相连
- 不同参数用`&`分隔符

示例代码如下：
![image](/imgs/applet/wx/wx101.png)


##### （2）编程式导航传参

调用`wx.navifateTo(Object Object)`方法跳转页面时，也可以携带参数，代码示例如下：
![image](/imgs/applet/wx/wx102.png)


##### （3）在onLoad中接收导航参数

通过声明式导航传参或编程式导航传参所携带的参数，可以直接在`onLoad事件`中直接获取到，示例代码如下：
![image](/imgs/applet/wx/wx103.png)





### 页面事件

#### 下拉刷新

下拉刷新是移动端的专有名词，指的是通过手指在屏幕上下拉滑动操作，从而重新加载页面数据的行为。

**启用下拉刷新**
启用下拉刷新有两种方式
（1）全局开启下拉刷新
- 在`app.json`的`window`节点中，将`ebablePullDownRefresh`设置为true
（2）局部开启下拉刷新
- 在页面的`.json`配置文件中，将`ebablePullDownRefresh`设置为true

> 实际开发中，推荐使用第2种方式，为需要的页面单独开启下拉刷新的效果。

**配置下拉刷新新窗口的样式**
在全局或页面的`.json`配置文件中，通过`backgroundColor`和`backgroundTextStyle`来配置下拉刷新窗口的样式，其中：
- `backgroundColor`用来配置下拉刷新窗口的背景颜色，仅支持16进制的颜色值
- `backgroundTextStyle`用来配置下拉刷新loading的样式，仅支持`dark`和`light`


**监听页面的下拉刷新事件**
在页面的`.js`文件中，通过`onPullDownRefresh()`函数即可监听当前页面的下拉刷新事件。
![image](/imgs/applet/wx/wx104.png)




**停止下拉刷新的效果**

当处理完下拉刷新后，下拉刷新的loading效果会一直显示，不会主动消失，所以需要手动隐藏`loading`效果。此时，调用`wx.stopPullDownRefresh()`可以停止当前页面的下拉刷新。
![image](/imgs/applet/wx/wx105.png)




#### 上拉触底

上拉触底是移动端的专有名词，通过手指在屏幕上的上拉滑动操作，从而加载更多数据的行为。

**监听页面的上拉触底事件**
在页面的`.js`文件中，通过`onReachBottom()`函数即可监听当前页面的上拉触底事件。
![image](/imgs/applet/wx/wx106.png)

> 注意：需要在`onReachBottom`中做节流处理，上一次请求未完成之前不允许发起额外的请求


**配置上拉触底距离**
上拉触底距离指的是触发上拉触底事件时，滚动条距离页面底部的距离。

可以在全局或页面的`.json`配置文件中，通过`onReachBottomDistance`属性来配置上拉触底的距离。

小程序默认的触底距离是`50px`,在实际开发中，可以根据自己的需求修改这个默认值。



### 生命周期

生命周期（Life Cycle）是指一个对象从创建->运行->销毁的整个阶段，强调的是一个时间段。

我们可以把每个小程序运行的过程，也概括为生命周期：
- 小程序的启动，表示生命周期的开始
- 小程序的关闭，表示生命周期的结束
- 中间小程序运行的过程，就是小程序的生命周期


#### 生命周期分类

在小程序中，生命周期分为两类，分别是：
- 应用生命周期
  - 特指小程序从启动->运行->销毁的过程
- 页面生命周期
  - 特指小程序中，每个页面的加载->渲染->销毁的过程

其中，页面的生命周期范围较小，应用程序的生命周期范围较大，如图：
![image](/imgs/applet/wx/wx109.png)


#### 生命周期函数

生命周期函数：是由小程序框架提供的内置函数，会伴随着生命周期，自动按次序执行。


生命周期函数的作用：允许程序员在特定的时间点，执行某些特定的操作。例如，页面刚加载的时候，可以在`onLoad`生命周期函数中初始化页面的数据。

> 注意：生命周期强调的是时间段，生命周期函数强调的是时间点。



#### 生命周期函数分类

在小程序中，生命周期函数分为两类，分别是：
- 应用生命周期函数
  - 特指小程序从启动->运行->销毁期间依次调用的那些函数
- 页面生命周期函数
  - 特指小程序中，每个页面的加载->渲染->销毁期间依次调用的那些函数




**应用的生命周期函数**
小程序的应用生命周期函数需要在`app.js`中进行声明，示例代码如下：
![image](/imgs/applet/wx/wx110.png)

- `onLaunch`
- `onShow`
- `onHide`



**页面的生命周期函数**
小程序的页面生命周期函数需要在页面的`.js`中进行声明，示例代码如下：
![image](/imgs/applet/wx/wx111.png)

- `onLoad` 监听页面加载，一个页面只调用1次（常用）
- `onShow` 监听页面显示
- `onReady` 监听页面初次渲染完成，一个页面只调用1次（常用）
- `onHide` 监听页面隐藏
- `onUnload` 监听页面呢卸载，一个页面只调用1次






## WXS脚本

WXS(WeiXin Script)是小程序独有的一套脚本语言，结合`WXML`,可以构建出页面的结构。


### wxs的应用场景

`wxml`中无法调用在页面的`.js`中定义的函数，但是，`wxml`中可以调用`wxs`中定义的函数。

因此，小程序中`wxs`典型应用场景就是“过滤器”


### wxs和javaScript的关系
虽然`wxs`的语法类似于`javaScript`,但是`wxs`和`javaScript`是完全不同的两种语言：
- wxs有自己的数据类型
  - number 数字类型
  - string 字符串类型
  - boolean 布尔类型
  - object 对象类型
  - function 函数类型
  - array 数组类型
  - date 日期类型
  - regexp 正则
- wxs不支持类似于ES6及以上的语法格式
  - 不支持：let、const、解构赋值、展开运算符、箭头函数、对象属性简写、etc...
  - 支持：var 定义变量、普通函数等类似于ES5的语法
- wxs遵循`CommonJS`规范
  - module对象
  - require()函数
  - module.exports对象



### wxs的基本语法

#### 内嵌wxs脚本
`wxs`代码可以编写在`wxml`文件中的`<wxs>`标签内，就像`javascript`代码可以编写在`html`文件中的`<script>`标签内一样。

`wxml`文件中的每个`<wxs></wxs>`标签，必须提供`module`属性，用来指定当前`wxs`模块名称，方便在`wxml`中访问模块中的成员。
![image](/imgs/applet/wx/wx112.png)



#### 定义外联的wxs脚本
`wxs`代码还可以编写在以`.wxs`为后缀名的文件内，就像`javascript`代码可以编写在以`.js`为后缀的文件中一样。示例代码如下：
![image](/imgs/applet/wx/wx113.png)


#### 使用外联的wxs脚本
在`wxml`中引入外联的`wxs`脚本时，必须为`<wxs>`标签添加`module`和`src`属性，其中：
- `module`用来指定模块的名称
- `src`用来指定要引入的脚本的路径，且必须是相对路径
![image](/imgs/applet/wx/wx114.png)



### wxs的特点

(1)与javascript不同
为了降低wxs(WeiXin Script)的学习成本，`wxs`语言在设计时大量借鉴了`javascript`的语法。但本质上，`wxs`和`javascript`是完全不同的两种语言！

(2)不能作为组件的事件回调
`wxs`典型的应用场景就是“过滤器”，经常配合`Mustache`语法进行使用，例如：
![image](/imgs/applet/wx/wx115.png)


但是，`wxs`中定义的函数不能作为组件的事件回调函数。例如，下面的用法是错误的：
![image](/imgs/applet/wx/wx116.png)



(3)隔离性
隔离性指的是`wxs`的运行环境和其他`javaScript`代码是隔离的。体现在如下几个方面：
- `wxs`不能调用`js`中定义的函数
- `wxs`不能调用小程序提供的API


(4)性能好
- 在IOS设备上，小程序的WXS会比`javaScript`代码块2~20倍
- 在Android设备上，二者的运行效率无差异

