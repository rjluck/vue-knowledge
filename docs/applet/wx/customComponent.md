# 自定义组件

[[toc]]


小程序目前已经支持组件化开发，可以将页面中的功能模块抽取成自定义组件，以便在不同的页面中重复使用；

也可以将复杂的页面拆分成多个低耦合的模块，有助于代码维护。


开发中常见的组件有两种：
- 公共组件：将页面内的功能模块抽取成自定义组件，以便在不同的页面中重复使用。
- 页面组件：将复杂的页面拆分成多个低耦合的模块，有助于代码维护。

建议：一个组件一个文件夹
- 如果是公共组件，建议放在项目根目录的`components`文件夹中
- 如果是页面组件，建议放在对应页面的目录下


## 创建-注册-使用组件

### 创建

![image](/imgs/applet/wx/wx179.png)


### 注册
开发中常见的组件主要分为**公共组件** 和 **页面组件** 两种，因此注册组件的方式也分为两种：
- 全局注册：在`app.json`文件中配置`usingComponents`进行注册，注册后可以在任意页面使用。
- 局部注册：在`页面.json`文件中配置`usingComponents`进行注册，注册后只能在当前页面使用。


在`usingComponents`中进行组件注册时，需要提供自定义组件的组件名 和 自定义组件文件路径。
```json
  "usingComponents": {
      "custom-checkbox":"./components/custom-checkbox/custom-checkbox"
  }
```

### 使用



将组件注册好以后，直接将 自定义组件的组件名 当成 组件标签名 使用即可。

```html
<custom-checkbox/>
```


## 数据和方法

组件数据和方法需要在 `组件.js`的`Component`方法中进行定义，`Component`创建自定义组件。
- `data`：定义组件的内部数据
- `methods`：在组件中事件处理程序需要写到`methods`中才可以

```js
// components/custom-checkbox/custom-checkbox.js
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


## properties


Properties 是指组件的对外属性，主要用来接收组件使用者传递给组件内部的数据，和`data`一同用于组件的模板渲染。

```html
<!-- label 文本显示的内容 -->
<!-- position 控制文本显示的位置 -->
<custom-checkbox label="我已阅读并同意 用户协议" position="right"/>
```



如果需要接收传递的属性，有两种方式：全写、简写
- 简写
```js
    label:String
```
-全写
```js
    label:{
        // type 组件使用者传递的数据类型
        // 数据类型：String、Number、Boolean、Object、Array
        // 也可以设置为 null,表示不限制类型
        type:String,
        value:''
    }
```




> 注意事项：
> - 在JS中可以访问和获取 properties 中的数据，但是一般情况下，不建议修改，因为会造成数据流的混乱。
> - 设置属性类型需要使用`type`属性，属性类型是必填项，`value`属性为默认值。
> - 属性类型可以为`String`、`Number`、`Boolean`、`Object`、`Array`,也可以设置为 `null`表示不限制类型。


```js
// components/custom-checkbox/custom-checkbox.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    // label:String,
    label:{
        // type 组件使用者传递的数据类型
        // 数据类型：String、Number、Boolean、Object、Array
        // 也可以设置为 null,表示不限制类型
        type:String,
        valeu:''
    },
    position:{
        type:String,
        value:'right'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isChecked:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    updateChecked(){
        this.setData({
            isChecked:!this.data.isChecked,
            label:'在组件内部也可以修改properties中的数据'
        })

        // 获取properties
        console.log('label',this.properties.label);
    }
  }
})
```

```html
<!--components/custom-checkbox/custom-checkbox.wxml-->
<view class="custom-checkbox-container">
    <view class="custom-checkbox-box  {{position==='right'?'right':'left'}}">
        <checkbox class="custom-checkbox" checked="{{ isChecked }}" bind:tap="updateChecked"/>
        
        <view>
            <text>{{label}}</text>
        </view>
    </view>
</view>
```

```scss
/* components/custom-checkbox/custom-checkbox.wxss */
.custom-checkbox-container{
    display: inline-block;
}
.custom-checkbox-box{
    display: flex;
    align-items: center;
}

.custom-checkbox-box.left{
    flex-direction: row-reverse;
}
.custom-checkbox-box.right{
    flex-direction: row;
}

.custom-checkbox{
    margin-left: 10rpx;
}
```




## 插槽slot

在使用基础组件时，可以在组件中间写子节点，从而将子节点的内容展示到页面中，自定义组价也可以接收子节点。

只不过在组件模板中需要定义`<slot/>` 节点，用于承载组件中间的子节点。

默认情况下，一个组价的`wxml`中只能有一个`slot`(默认插槽)。需要使用多个`slot`时，可以在组件`js`中声明启用，同时需要给`slot`添加`name`属性来区分不同的`slot`(具名插槽)。然后给子节点内容添加`slot`属性，属性值是对应`slot`的`name`名称，从而将内容插入到对应的`slot`中。
```js
Component({
    options:{
        // multipleSlots 选项用于启用多 slot 支持。
        multipleSlots:true
    }
})
```

```html
<view>
    <slot name="slot-right"> </slot>
</view>
```


```html
<custom01>
    <text slot="slot-right"> 测试多插槽 </text>
<custom01>
```


## 组件样式

### 注意事项

自定义组件拥有自己的`wxss`样式，组件`wxss`文件的样式，默认只对当前组件生效。

编写组件样式时，需要注意以下几点：
- `app.wxss`或页面的`wxss`中使用了标签名（`view`）选择器（或一些其他特殊选择器）来直接指定样式。
  **这些选择器会影响到页面和全部组件，通常情况下这是不推荐的做法**。
- 组件和引用组件的页面不能使用id选择器（`#a`）、属性选择器（`[a]`）和标签名选择器，请改用 **class选择器**。

不允许
```css
text{
  color:red
}

#content{
 color:red
}

[id=content]{
 color:red
}
```


允许
```css
.content{
 color:red
}
```



- 组件和引用组件的页面中使用后代选择器（`.a .b`）在一些极端情况下会有非预期的表现，如遇,请避免使用。
```css
.parent .son{
   color:red 
}
```
- 子元素选择器（`.a>.b`）只能用于`view`组件与其子节点之间，用于其他组件可能导致非预期的情况。
```css
.content > .label{
    color:red
}
```
- 继承样式，如`font`、`color`,会从组件外继承到组件内。
- 除继承样式外，全局中的样式、组件所在页面的样式对自定义组件无效（除非更改组件样式隔离选项）





### 样式隔离

默认情况下，自定义组件的样式只受自身`wxss`的影响，但是有时候我们需要组件使用者的样式能够影响到






















