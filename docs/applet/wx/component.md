# 组件

[[toc]]


小程序中的组件也是由宿主环境提供的，开发者可以基于组件快速搭建出漂亮的页面结构。官方把小程序的组件分为了9大类，分别是：
- **视图容器**
- **基础内容**
- **表单组件**
- **导航组件**
- 媒体组件
- map地图组件
- canvas画布组件
- 开放能力
- 无障碍访问


## 常用的视图容器组件

**（1）`view`**
- 普通视图区域
- 类似于HTML中的div,是一个块级元素
- 常用来实现页面的布局效果

基本使用：

实现如图的flex横向布局效果
![image](/imgs/applet/wx/wx17.png)


**（2）`scroll-view`**
- 可滚动的视图区域
- 常用来实现滚动列表效果


基本使用：

实现如图的纵向滚动效果
![image](/imgs/applet/wx/wx18.png)


**（3）`swiper`和`swiper-item`**
- 轮播图容器组件和轮播图item组件


基本使用：

实现如图的轮播图效果
![image](/imgs/applet/wx/wx19.png)


swiper组件的常用属性
![image](/imgs/applet/wx/wx20.png)




## 常用的基础内容组件

**（1）`text`**
- 文本组件
- 类似于`HTML`中的`span`标签，是一个行内元素


基本使用：

通过text组件的`selectable`属性，实现长按选中文本内容的效果：
![image](/imgs/applet/wx/wx21.png)


**（2）`rich-text`**
- 富文本组件
- 支持把`HTML`字符串渲染为`WXML`结构

基本使用：

通过rich-text组件的`nodes`属性，把HTML字符串渲染为对应的UI结构：
![image](/imgs/applet/wx/wx22.png)




## 其它常用组件

**（1）`button`**
- 按钮组件
- 功能比`HTML`中的`button`按钮丰富
- 通过`open-type`属性可以调用微信提供的各种功能（客服、转发、获取用户授权、获取用户信息等）

基本使用：
![image](/imgs/applet/wx/wx23.png)



**（2）`image`**
- 图片组件
- `image`组件默认宽度约300px、高度约240px

基本使用：
![image](/imgs/applet/wx/wx24.png)


> image组件的mode属性用来指定图片的**裁剪**和**缩放**，常用的`mode`属性值如下：
![image](/imgs/applet/wx/wx25.png)


eg:
```wxml
<image src="/images/1.png" mode="aspectFit"></image>
```

**（3）`navigator`**
- 页面导航组件
- 类似于`HTML`中的`a`链接


## 字体图标


## 自定义小程序组件


### 创建组件
- 在项目的根目录中，鼠标右键，创建`components`->`test`文件夹
- 在新建的`components`->`test`文件夹上，鼠标右键，点击“新建`Component`”
- 键入组件的名称之后回车，会自动生成组件对应的4个文件，后缀名分别为`.js`,`.json`,`.wxml`，`wxss`

> 注意：为了保证目录结构的清晰，建议把不同的组件，存放到单独目录中，例如：
![image](/imgs/applet/wx/wx118.png)


### 引用组件

#### 局部引用组件
在页面的`.json`配置文件中引用组件的方式，叫做“局部引用”。示例代码如下：
![image](/imgs/applet/wx/wx119.png)



#### 全局引用组件
在`app.json`全局配置文件中引用组件的方式，叫做“全局引用”。示例代码如下：
![image](/imgs/applet/wx/wx120.png)




### 组件和页面的区别

从表面来看，组件和页面都是由`.js`、`.json`、`.wxml`和`.wxss`这四个文件组成的。但是，组件和页面的`.js`与`.json`文件有明显的不同：
- 组件的`.json`文件中需要声明`"Component":true`属性
- 组件的`.js`文件中调用的是`Component()`函数，页面调用的是`Page()`函数
- 组件的事件处理函数需要定义到`methods`节点中，页面中只需要定义到和`data`平级的位置

```js
// components/test/test.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
```


### 自定义组件样式


#### 组件样式隔离
默认情况下，自定义组件的样式只对当前组件生效，不会影响到组件之外的UI结构，如图所示：
- 组件A的样式不会影响组件C的样式
- 组件A的样式不会影响小程序页面的样式
- 小程序的页面样式不会影响组件A和组件C的样式

![image](/imgs/applet/wx/wx121.png)

好处：
- 防止外界的样式影响组件内部的样式
- 防止组件的样式破坏外界的样式


注意点：
- `app.wxss`中的全局样式对组件无效
- 只有`class`选择器会有样式隔离效果，id选择器、属性选择器、标签选择器不受样式隔离的影响

> 建议：在组件和引用组件的页面中建议使用`class`选择器，不要使用id、属性、标签选择器！


修改组件的样式隔离选项：
默认情况下，自定义组件的样式隔离特性能够防止组件内外样式互相干扰的问题。但有时，我们希望在外界能够控制组件内部的样式，此时，可以通过`styleIsolation`修改组件的样式隔离选项，用法如下：
![image](/imgs/applet/wx/wx122.png)


styleIsolation的可选值
![image](/imgs/applet/wx/wx123.png)




### 数据、方法和属性


#### data数据
小程序组件中，用于组件模板渲染的私有数据，需要定义到`data`节点，示例如下：
![image](/imgs/applet/wx/wx124.png)


#### methods方法
小程序组件中，事件处理函数和自定义方法需要定义到`methods`节点中，示例代码如下：
![image](/imgs/applet/wx/wx125.png)


#### properties属性
小程序组件中，`properties`是组件的对外属性，用来接收外界传递到组件中的数据，示例代码如下：
![image](/imgs/applet/wx/wx126.png)


> 组件中读取传过来的属性`this.properties.max`


#### data和properties的区别
在小程序的组件中，`properties`属性和`data`的数据用法相同，它们都是**可读可写**的，只不过：
- `data`更倾向于存储组件的私有数据
- `properties`更倾向于外界传递到组件中的数据
![image](/imgs/applet/wx/wx127.png)


#### 使用setData修改properties的值
由于`data`数据和`properties`属性在本质上没有任何区别，因此`properties`属性的值也可以用于页面渲染或使用`setData`为`properties`中的属性重新赋值，示例代码如下：
![image](/imgs/applet/wx/wx128.png)




### 数据监听器

数据监听器用于监听和响应任何属性和数据字段的变化，从而执行特定的操作。它的作用类似于`vue`中的`watch`。在小程序组件中，数据监听器的基本语法格式如下：
![image](/imgs/applet/wx/wx129.png)

#### 基本用法
![image](/imgs/applet/wx/wx130.png)

![image](/imgs/applet/wx/wx131.png)


#### 监听对象属性的变化
数据监听器支持监听对象中单个或多个属性的变化，示例语法如下：
![image](/imgs/applet/wx/wx132.png)

> 注意`this.setData`用法也可以如下
```js
this.setData({
  'obj.a':2
})
```


![image](/imgs/applet/wx/wx133.png)
如果某个对象中需要被监听的属性太多，为了方便，可以使用**通配符`**`**来监听对象中所有属性的变化，示例代码如下：

![image](/imgs/applet/wx/wx134.png)




### 纯数据字段

#### 定义

概念：纯数据字段指的的是那些不用于界面渲染的data字段

应用场景：例如有些情况下，某些data中的字段既不会展示在界面上，也不会传递给其他组件，仅仅在当前组件内部使用。带有这种特性的data字段适合被设置为纯数据字段。


好处：纯数据字段有助于提升页面更新的性能


#### 使用规则
在`Component`构造器的`options`节点中，指定`pureDataPattern`为一个正则表达式，字段名符合这个正则表达式的字段将成为纯数据字段，示例代码如下：
![image](/imgs/applet/wx/wx135.png)



### 组件的生命周期

#### 组件全部的生命周期函数

小程序组件可用的全部生命周期如下表所示：
![image](/imgs/applet/wx/wx136.png)


#### 组件主要的生命周期函数
在小程序组件中，最重要的生命周期函数有3个，分别是`created`、`attached`、`detached`。它们各自的特点如下：
- `created`：组件实例刚创建好的时候，会触发
  - 此时还不能调用`setData`
  - 通常在这个生命周期函数中，只应该用于给组件的`this`添加一些自定义是属性字段
- `attached`：在组件完全初始化完毕、进入页面节点树以后，会触发
  - 此时，`this.data`已被初始化完毕
  - 这个生命周期很有用，绝大多数初始化的工作可以在这个时机进行（例如发请求获取初始数据）
- `detached`：在组件离开页面节点树后，会触发
  - 退出一个页面时，会触发页面内每个自定义组件的`detached`生命周期函数
  - 此时适合做一些清理性质的工作


#### lifetimes节点

在小程序组件中，生命周期函数可以直接定义在`Component`构造器的第一级参数中，可以在`lifetimes`字段内进行声明（这是推荐的方式，其优先级最高）。示例代码如下：
![image](/imgs/applet/wx/wx137.png)



#### 组件所在页面的生命周期

有时，**自定义组件的行为依赖于页面状态的变化**，此时就需要用到组件所在页面的生命周期。

在自定义组件中，组件所在页面的生命周期函数有如下3个，分别是：
![image](/imgs/applet/wx/wx138.png)


#### pageLifetimes节点
组件所在页面的生命周期函数，需要定义在`pageLifetimes`节点中，示例代码如下：
![image](/imgs/applet/wx/wx139.png)


![image](/imgs/applet/wx/wx140.png)



### 插槽

在自定义组件的`wxml`结构中，可以提供一个`<slot>`节点（插槽），用于承载组件使用者提供的`wxml`结构。
![image](/imgs/applet/wx/wx141.png)

#### 单个插槽
在小程序中，默认每个自定义组件中只允许使用一个`<slot/>`进行暂未，这种个数上的限制叫做单个插槽。
![image](/imgs/applet/wx/wx142.png)


#### 启用多个插槽
在小程序的自定义组件中，需要使用多个`<slot>`插槽时，可以在组件的`.js`文件中，通过如下方式进行启用。示例代码如下：
![image](/imgs/applet/wx/wx143.png)


#### 定义多个插槽
可以在组件的`.wxml`中使用多个`<slot>`标签，以不同的`name`来区分不同的插槽。示例代码如下：
![image](/imgs/applet/wx/wx144.png)

#### 使用多个插槽
在使用带有多个插槽的自定义组件时，需要用`slot`属性来将节点插入到不同的`<slot>`中。示例代码如下：
![image](/imgs/applet/wx/wx145.png)





### 父子组件之间的通信

父子组件之间通信的3种方式

#### 属性绑定
- 用于**父组件向子组件**的指定属性设置数据，仅能设置`JSON`兼容的数据

父组件示例代码如下：
![image](/imgs/applet/wx/wx146.png)

子组件在`properties`节点中声明对应的属性并使用。示例代码如下：
![image](/imgs/applet/wx/wx147.png)



#### 事件绑定
- 用于**子组件向父组件**传递数据，可以传递任意数据
  - 在父组件的`js`中，定义一个函数，这个函数即将通过自定义事件的形式，传递给子组件
  - 在父组件的`wxml`中，通过自定义事件的形式，将步骤1中定义的函数引用，传递给子组件
  - 在子组件的`js`中，通过调用`this.triggerEvent('自定义事件名称',{/*参数对象*/})`，将数据发送到父组件
  - 在父组件的`js`中，通过`e.detail`获取到子组件传递过来的数据

示例代码：
![image](/imgs/applet/wx/wx148.png)
![image](/imgs/applet/wx/wx149.png)
![image](/imgs/applet/wx/wx150.png)
![image](/imgs/applet/wx/wx151.png)

#### 获取组件实例
- 父组件还可以通过`this.selectComponent()`获取子组件实例对象
- 这样就可以直接访问子组件的任意数据和方法

可在父组件里调用`this.selectComponent("id或class选择器")`，获取子组件的实例对象，从而直接访问子组件的任意数据和方法。调用时需要传入一个**选择器**，例如`this.selectComponent(".my-component")`
![image](/imgs/applet/wx/wx152.png)



### behaviors

#### 定义

`behaviors`是小程序中，用于实现组件间代码共享的特性，类似于`Vue.js`中的`mixins`
![image](/imgs/applet/wx/wx153.png)


#### 工作方式

每个`behaviors`可以包含一组**属性、数据、生命周期函数和方法**。组件引用它时，它的属性、数据和方法会被合并到组件中。

每个组件可以引用多个`behavior`,`behavior`也可以引用其它`behavior`



#### 创建behavior
调用`Behavior(Object Object)`方法即可创建一个共享的`behavior`实例对象，供所有的组件使用：
![image](/imgs/applet/wx/wx154.png)
![image](/imgs/applet/wx/wx155.png)


#### 导入并使用behavior
在组件中，使用`require()`方法导入需要的`behavior`,挂载后即可访问`behavior`中的数据或方法，示例代码如下：
![image](/imgs/applet/wx/wx156.png)
![image](/imgs/applet/wx/wx157.png)


#### behavior中所有可用的节点
![image](/imgs/applet/wx/wx158.png)


#### 同名字段的覆盖和组合规则
组件和它引用的`behavior`中可以包含同名的字段，此时可以参考如下3种同名时的处理规则：
- 同名的数据字段（data）
- 同名的属性（properties）或方法（methods）
- 同名的生命周期函数

官网说明：https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/behaviors.html




## 全局数据共享

全局数据共享（又叫做：状态管理）是为了解决组件之间数据共享的问题。

开发中常用的全局数据共享方案有：`Vuex`、`Redux`、`Mobx`等。
![image](/imgs/applet/wx/wx165.png)


在小程序中，可使用`mobx-miniprogram`配合`mobx-miniprogram-bindings`实现全局数据共享。其中：
- `mobx-miniprogram`用来创建`Store`实例对象
- `mobx-miniprogram-bindings`用来把`Store`中的共享数据或方法，绑定到组件或页面中使用

### 安装MobX相关的包
在项目中运行如下的命令，安装MobX相关的包：`npm install --save mobx-miniprogram  mobx-miniprogram-bindings`

> 注意：MobX相关的包安装完毕之后，记得删除`miniprogram_npm`目录后，重新构建npm


### 创建MobX的Store实例
![image](/imgs/applet/wx/wx165.png)


### 将Store中的成员绑定到页面中
![image](/imgs/applet/wx/wx167.png)


### 在页面上使用Store中的成员
![image](/imgs/applet/wx/wx168.png)


### 将Store中的成员绑定到组件中
![image](/imgs/applet/wx/wx169.png)

注意：

fields对象中的key为映射的名字，value为Store中的名字
```js
fields:{
  numA:'numA'
}
```

### 在组件中使用Store中的成员
![image](/imgs/applet/wx/wx170.png)




## 自定义tabBar

官网：https://developers.weixin.qq.com/miniprogram/dev/framework/ability/custom-tabbar.html