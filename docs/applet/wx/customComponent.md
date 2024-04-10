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

## 完善复选框
 点击文本也会选中或取消，通过`label`标签包裹实现



```html
<!--components/custom-checkbox/custom-checkbox.wxml-->
<view class="custom-checkbox-container">
    <view class="custom-checkbox-box  {{position==='right'?'right':'left'}}">
        <label class="custom-label">
          <checkbox class="custom-checkbox" checked="{{ isChecked }}" bind:tap="updateChecked"/>
          
          <view>
              <text>{{label}}</text>
          </view>
        </label>
    </view>
</view>
```

```css
/* components/custom-checkbox/custom-checkbox.wxss */
.custom-checkbox-container{
    display: inline-block;
}
.custom-checkbox-box .custom-label{
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

默认情况下，自定义组件的样式只受自身`wxss`的影响，但是有时候我们需要组件使用者的样式能够影响到组件，这时候就需要指定特殊的样式隔离选项`stylelsolation`,选择它支持一下取值：
- `isolated`:表示启用样式隔离，在自定义组件内外，使用`class`指定的样式将不会相互影响（一般情况下的默认值）
- `apply-shared`:表示页面`wxss`样式将影响到自定义组件，但自定义组件`wxss`中指定的样式不会影响页面
- `shared`:表示页面`wxss`样式将影响到自定义组件，自定义组件`wxss`中指定的样式也会影响页面和其他设置了`apply-shared`或`shared`的自定义组件。

```js
// isolated:开启样式隔离，默认值
// 在默认情况下，自定义组价和组件使用者如果存在相同的类名，类名不会相互影响

// apply-shared:组件使用者（页面的wxss样式）能够影响到自定义组件
// 但是自定义组件的样式不会影响组件使用者（页面的wxss样式）

// shared:组件使用者（页面的wxss样式）能够影响到自定义组件
// 自定义组件的样式也会影响组件使用者（页面的wxss样式）
// 和其他使用了`apply-share 以及 share 属性的自定义组件`

Component({
    options:{
        styleIsolation:'isolated'
    }
})
```


**eg：修改复选框样式**

需求：

复选框组件是公共组件，以后需要在多个页面或者需要在多个项目中进行使用。
所以，需要先给复选框组件准备，设置一些默认样式，
如果在其他页面或者其他项目中使用的时候，发现样式不符合产品需求，可以进行修改，对默认的样式进行修改。


组件样式文件
```scss
/*1.需要给复选框设置默认样式*/
// 需要先找到小程序给复选框提供的类名，通过小程序给提供的类名修改才可以
// 需要先打开小程序开发文档，找到复选框文档，审查元素，进行查找


// 注意：在自定义组件中，不能直接修改复选框样式,如果需要进行修改，需要设置  styleIsolation:'shared'
// shared：修改其他页面的样式，组件使用者的样式，以及其他使用了 share 以及 apply-share 的组件
// 这时候，不是想要的结果
// 需求是：只想影响当前组件，可以添加命名空间


// 复选框没有选中时的默认样式
.custom-checkbox .wx-checkbox-input{
    width:24rpx !important;
    height:24rpx !important;
    border-radius: 50% !important;
    border: 1px solid #fda007 !important;
    margin-top:-6rpx;
}

// 复选框选中时的默认样式
.custom-checkbox .wx-checkbox-input-checked{
   background-color: #fda007 !important;
}

// 复选框选中时 √ 的样式
.custom-checkbox .wx-checkbox-input.wx-checkbox-input-checked:before{
    font-size: 22rpx;
    color:#fff;
}

```


页面样式文件
```scss
/*2.组件使用者能够修改默认样式*/
.custom .custom-checkbox .wx-checkbox-input{
    border:1px solid lightgreen !important
}
```







## observers

数据监听器（`observers`）主要用于监听和响应任何属性（`properties`）和数据（`data`）的变化，当数据发生变化时就会触发对应回调函数，从而方便开发者进行业务逻辑的处理。


在组件中如果需要进行数据监听，需要使用`observers`字段。

```js
// components/custom-checkbox/custom-checkbox.js
Component({
    data: {
      isChecked:false,
      num:2,
      obj:{
        name:'dd'
      },
      arr:[1,2,3,4]
    },
    properties:{
        label:{
            type:String,
            value:''
        }
    },
    observers:{
        // key 需要监听的数据
        // value：就是一个回调函数，形参：最新的数据
        num:function(newValue){
            console.log(newValue)
        }

        // 简写
        // num(newValue){
        //     console.log(newValue)
        // }

        // 同时监听多个数据
        'isChecked,num':function(newIsChecked,newNum){
            console.log('newIsChecked',newIsChecked);
            console.log('newNum',newNum);
        }

        // 支持监听属性以及内部数据的变化
        'obj.name':function(newName){
            console.log('newName',newName);
        },
        'arr[1]':function(newItem){
            console.log('newItem',newItem);
        }

        // 监听对象中所有属性的变化，使用通配符**
        'obj.**':function(newObj){
            console.log('newObj',newObj);
        },

        // 监听 properties
        label:function(newLabel){
            // 只要组件使用者传递了数据，这时候在监听器中就能获取传递的数据。也就是说，监听器立即执行了。

        }
    },
    methods:{
        updateData(){
            this.$setData({
                num:this.data.num+1,
                'obj.name':'jerry',
                'arr[1]':66,
                label:'最新的标题'
            })
        }
    }
})
```

> 注意：
> - 监听 `data`:数据变化才会执行
> - 监听 `properties`:立即执行







## 组件通信

### 父传子

父组件如果需要向子组件传递数据，只需要两个步骤：
- 在父组件`WXML`中使用数据绑定的方式向子组件传递动态数据
- 子组件内部使用 `properties` 接收父组件传递过来的数据即可


父组件wxml
```html
<view class="custom">
    <custom-checkbox label="我已阅读并同意 用户协议" position="left"/>
</view>
```

子组件js
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


### 子传父


子组件如果需要向父组件传递数据，可以通过小程序提供的事件系统实现，可以传递任意数据。
- 自定义组件内部使用`triggerEvent`方法发射一个自定义的事件，同时可以携带数据。
- 自定义组件标签上通过`bind方法监听`发射的事件，同时绑定事件处理函数，在事件处理函数中通过事件对象获取传递的数据。


子组件js
```js
// 第一个参数：自定义事件名
// 第二个参数：携带的数据
this.triggerEvent('myEvent',this.data.mum)
```

父组件wxml
```html
<view class="custom">
    <custom-checkbox bind:myEvent="getData"/>
</view>
```

父组件js
```js
Page({
    getData(event){
        // 获取传递的数据  event.detail
    }
})
```



### 获取组件实例

父组件可以通过`this.selectComponent`方法，获取子组件实例对象，这样就可以直接访问子组件的任意数据和方法。

`this.selectComponent`方法在调用时需要传入一个匹配选择器`selector`


父组件wxml
```html
<view class="custom">
    <custom-checkbox class="child" id="child"/>
    <button type="primary" bindtap="getChild">获取子组件实例对象</button>
</view>
```

子组件js
```js
Page({
    getChild(){
        // 获取到实例对象以后，就能获取子组件所有的数据
        // const res =  this.selectComponent('.child')
        const res =  this.selectComponent('#child')
        console.log(res)
    }
})
```






## 组件生命周期


### 组件生命周期
组件的生命周期：指的是组件自身的一些钩子函数，这些函数在特定的时间节点时被自动触发。

组件的生命周期函数需要在`lifetimes`字段内进行声明。


组件的生命周期函数有5个：
- **`created`** ：组件实例创建完毕
  - `created`钩子函数中不能调用 `setData`
  - 可以在`created`钩子函数中添加一些自定义属性,通过`this`的方式进行添加
- **`attached`**：组件初始化完毕，模板解析完成，已经把组件挂载到页面上以后执行
  - 一般页面中的交互会在 `attached` 钩子函数中进行实现，比如`setData`
- `ready`：组件渲染完成
- `moved`
- **`detached`**：组件被销毁触发执行

![image](/imgs/applet/wx/wx180.png)


> 注意事项：
> - `created` 钩子函数中不能调用 `setData`

```js
// components/custom-checkbox/custom-checkbox.js
Component({
    data:{
        num:0
    },
    lifetimes:{
        created(){
            console.log('组件 created')
            this.test='自定义属性'
        },
        attached(){
            console.log('组件 attached')
            console.log('test',this.test)
            this.setData({
                num:1
            })
        },
        detached(){
            console.log('组件 detached')
        }
    }
})
```


### 组件所在页面的生命周期

组件还有一些特殊的生命周期，这类生命周期和组件没有很强的关联。


主要用于组件内部监听父组件的展示、隐藏状态，从而方便组件内部执行一些业务逻辑的处理


组件所在页面的生命周期有4个：
- **`show`**：监听组件所在的页面展示（后台切前台）状态
- **`hide`**：监听组件所在的页面隐藏（前台切后台，点击tabBar切换）状态
- `resize`
- `routeDone`


组件所在页面的生命周期函数需要在`pageLifetimes`字段内进行声明。


![image](/imgs/applet/wx/wx181.png)


```js
// components/custom-checkbox/custom-checkbox.js
Component({
    data:{
        num:0
    },
    // 组件生命周期声明对象
    lifetimes:{
        created(){
            console.log('组件 created')
            this.test='自定义属性'
        },
        attached(){
            console.log('组件 attached')
            console.log('test',this.test)
            this.setData({
                num:1
            })
        },
        detached(){
            console.log('组件 detached')
        }
    },
    // 组件所在页面生命周期声明对象
    pageLifetimes:{
        show(){
            console.log('组件所在的页面展示')
        },
        hide(){
            console.log('组件所在的页面隐藏')
        }
    }
})
```


### 总结小程序生命周期

一个小程序完整的生命周期由**应用生命周期**、**页面生命周期** 和 **组件生命周期** 三部分组成。

> 问题1：小程序冷启动，钩子函数的执行顺序？

onLaunch（App） -->  onShow (App) --> created（Component） --> attached（Component） --> onLoad（Page） --> onShow（Page）--> ready（Component） --> onReady（Page）

![image](/imgs/applet/wx/wx182.png)

> 问题2：保留当前页面，进入下一个页面，钩子函数的执行顺序？

onHide（Page）--> 进入新页面 --> onLoad（Page） --> ...


> 问题3：销毁当前页面，进入下一个页面，钩子函数的执行顺序？

onUnload（Page）  --> detached（Component）--> 进入新页面 --> onLoad（Page）--> ...

![image](/imgs/applet/wx/wx183.png)

> 问题4：小程序热启动，钩子函数的执行顺序？

onShow（App） -->  onShow（Page）

![image](/imgs/applet/wx/wx183.png)


## 使用Component构造页面

`Component`方法用于创建自定义组件

小程序页面也可以视为自定义组件，因此页面也可以使用`Component`进行创建，从而实现复杂页面的逻辑开发。


**为什么需要使用Component方法进行构造页面**

`Component`方法功能比`Page`方法强大很多,比如 `Component` 有数据监听器，`Page`就没有。


**注意事项**
- 要求对应 `.json` 文件中必须包含 `usingComponents` 字段
- 页面使用`Component`构造器创建，需要定义与普通组件一样的字段和实例方法
- 页面Page中的一些生命周期方法（如 `onLoad()` 等以`on`开头的方法），在`Component`中药写在`methods`属性中才能生效
- 组件的属性`properties`可以用于接收页面的参数，在`onLoad()`中可以通过`this.data`拿到对应的页面参数


pages/detail/detail.js
```js
// <!--pages/detail/detail.js-->
// 小程序页面也可以使用 Component 方法进行构造
/**
 * 注意事项：
 * 1.要求 .json 文件中必须包含 usingComponents 字段
 * 2.里面的配置项需要和 Component 中的配置项保持一致
 * 3.页面中Page方法有一些钩子函数、事件监听方法，这些钩子函数和事件监听方法，必须放在methods中
 * 4.组件的属性 properties 也可以接受页面的参数，在onLoad钩子函数中可以通过 `this.data`进行获取
 */
Component({
    properties:{
        id:String,
        title:String
    },
    data:{

    },
    methods:{
        onLoad(options){
           console.log('页面加载')
        }
    }
})
```




## 组件复用机制behaviors


小程序的`behaviors` 方法是一种代码复用的方式，可以将一些通用的逻辑和方法提取出来，然后在多个组件中复用，从而减少代码冗余，提高代码的可维护性。


如果需要 `behavior` 复用代码，需要使用`Behavior()`方法，每个`behavior`可以包含一组属性、数据、生命周期函数和方法。组件引用它时，它的属性、数据和方法会被合并到组件中，生命周期函数也会在对应时机被调用。


> behavior 类似 Vue 中的 mixins

behavior.js
```js
const behavior = Behavior({
    properties:{
        label:{
            type:String,
            value:''
        }
    },
    data:{
        name:'wer'
    },
    lifetimes:{
        attached(){

        }
    }
})

export default behavior;
```

组件.js
```js
import  behavior from './behavior' ; // 引入

Component({
    behaviors:[behavior] // 注册
})


```


> 在以后开发中，使用`behaviors`进行代码复用的时候，组件和`behaviors`可能存在相同的字段。
> - 如果存在相同的`properties`,就近原则，使用组件内部的数据
> - 如果存在相同的`data`,若是有同名的数据字段且是对象类型，属性会进行合并；其余情况，就近原则，使用组件内部的数据
> - 如果存在相同的`methods`,就近原则，使用组件内部的数据
> - 如果存在相同的`生命周期函数`,都会被调用，先执行`behaviors`中的，再执行组件内部的生命周期函数




## 外部样式类

默认情况下，组件和组件使用者之间如果存在相同的类名，不会相互影响，组件使用者如果想修改组件的样式，需要就解除样式隔离，但是解除样式隔离以后，在极端情况下，会产生样式冲突、CSS嵌套太深等问题，从而给我们的开发带来一定的麻烦。


外部样式类：在使用组件时，组件使用者可以给组件传入`CSS`类名，通过传入的类名修改组件的样式。

如果需要使用外部样式类修改组件的样式，在`Component`中需要用`externalClasses`定义若干个外部样式类。

组件.js
```js
Component({
    // 接收组件使用者传递给组件的样式类
    externalClasses:['extend-class']
})
```


组件.wxml
```html
<view class="extend-class">样式</view>
```



使用者detail.wxml
```html
<custom09 extend-class="my-class"></custom09>
```

使用者detail.wxss
```scss
.my-class{
    color:red
}
```

> 在同一个节点上，如果存在外部样式类 和 普通的样式类，两个类的优先级是未定义的，建议：在使用外部样式类的时候，样式需要通过`! important` 添加权重。


```html
<view class="extend-class box">样式</view>
```

> 注意：如果 `styleIsolation` 属性值是 `shared`，这时候 `externalClasses`选项会失效