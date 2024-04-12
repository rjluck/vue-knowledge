# API

[[toc]]


小程序开发框架提供丰富的微信原生API，可以方便的调起微信提供的能力。例如：获取用户信息、微信登录、微信支付等，**小程序提供的API几乎都挂载在wx对象下**，例如：`wx.request()`、`wx.setStorage()`等，**wx对象实际上就是小程序的宿主环境微信所提供的全局对象**，类似于浏览器提供的`window`对象。



## 分类

小程序API的3大分类
- **事件监听API**
  - 特点：以`on`开头，用来监听某些事件的触发
  - 举例：`wx.onWindowResize(function callback)`监听窗口尺寸变化的事件
- **同步API**
  - 特点1：以`Sync`结尾的API都是同步API
  - 特点2：同步API的执行结果，可以通过函数返回值直接获取，如果执行出错会抛出异常
  - 举例：`wx.setStorageSync('key','value')`向本地存储中写入内容
- **异步API**
  - 特点1：类似于`jQuery`中的`$ajax(options)`函数，需要通过`success`、`fail`、`complete`接收调用的结果
  - 特点2：通常都接收一个`object`类型的参数，例如：`wx.request({})`
  - 举例：`wx.request()`发起网络数据请求，通过`success`回调函数接收数据。




异步API支持`callback` & `Promise` 两种调用方式：
- 当接口参数`Object`对象中不包含`success`/`fail`/`complete` 时将默认返回`Promise`
- 部分接口如`request`/`uploadFile`本身就有返回值，因此不支持`Promise`风格的调用方式，它们的`promisify`需要开发者自行封装。



## 发起网络请求

发起网络请求获取服务器的数据，需要使用`wx.request()`接口API

**`wx.request()`请求的域名必须在微信公众平台进行配置**,如果使用`wx.request()`请求未配置的域名，在控制台会有相应的报错。
- 开发设置 -> 配置服务器域名


跳过域名的校验的开发：
- 在微信开发者工具中，点击【详情】按钮，切换到本地详情，将**不校验合法域名、web-view(业务域名)、TLS版本以及HTTPS证书**勾选上。
- 在真机上，需要点击胶囊区域的【分析】按钮，在弹框中选择【开发调试】，重启小程序后即可。
![image](/imgs/applet/wx/wx178.png)








```js
// pages/profile/profile.js
Page({
    // 获取数据
    getData(){
        wx.request({
          // 接口地址   
          url: 'https://api.uomg.com/api/rand.qinghua?format=json',
          // 请求方式
          method:'GET',
          // 请求参数
          data:{},
          // 请求头
          header:{},
          // API调用成功后执行的回调
          success:(res)=>{
            console.log(res);
          },
          // API调用失败后执行的回调
          fail:(err)=>{
            console.log(err);
          },
          // API调用成功或失败 都执行的回调
          complete:(res)=>{
            console.log(res);
          },
        })
    }
})
```



## 界面交互API

小程序提供了一些用于界面交互的API,例如：`loading`提示框、消息提示框、模态对话框等API。

### （1）loading提示框

loading提示框长配合网络请求来使用，用于增加用户体验，对应的API有两个：
- `wx.showLoading()`显示loading提示框
- `wx.hideLoading()`关闭loading提示框

```js
// pages/profile/profile.js
Page({
    // 获取数据
    getData(){
        wx.showLoading({
            // 用来显示提示内容，提示的内容不会自动换行，因为在同一行展示，多出来的内容就会被隐藏。
            title:'数据正在加载中...',
            // 是否显示透明蒙层，防止触摸穿透
            mask:true
        });


        wx.request({
          // 接口地址   
          url: 'https://api.uomg.com/api/rand.qinghua?format=json',
          // 请求方式
          method:'GET',
          // 请求参数
          data:{},
          // 请求头
          header:{},
          // API调用成功后执行的回调
          success:(res)=>{
            console.log(res);
          },
          // API调用失败后执行的回调
          fail:(err)=>{
            console.log(err);
          },
          // API调用成功或失败 都执行的回调
          complete:(res)=>{
            console.log(res);
            wx.hideLoading()
          },
        })
    }
})

```




### （2）模态对话框

`wx.showModal()`：模态对话框，常用于询问用户是否执行一些操作

例如：询问用户是否退出登录、是否删除该商品 等。






### （3）消息提示框

`wx.showToast()`：消息提示框，根据用户的某些操作来告知操作的结果

例如：退出成功给用户提示、提示删除成功 等。

```js

async delHandler(){
  const {confirm} = wx.showModal({
    title:'提示',
    content:'是否删除该商品？'
  })

  if(confirm){
    // 点击确定
    wx.showToast({
      title:'删除成功',
      icon:'none',
      duration:2000
    })
  }else{
    // 点击取消
    wx.showToast({
      title:'取消删除',
      icon:'error',
      duration:2000
    })
  }
}
```






## 本地存储

小程序本地存储是指在小程序中使用API将数据存储在用户的设备上，以便小程序运行时和下次启动时快速地读取这些数据。


小程序本地存储：
- 同步API
  - 存储：`wx.setStorageSync()`
  - 获取：`wx.getStorageSync()`
  - 删除：`wx.removeStorageSync()`
  - 清空：`wx.clearStorageSync()`
- 异步API
  - 存储：`wx.setStorage()`
  - 获取：`wx.getStorage()`
  - 删除：`wx.removeStorage()`
  - 清空：`wx.clearStorage()`


> 注意事项：对象类型的数据，可以直接进行存储获取，无需使用`JSON.stringify()`、`JSON.parse()`转换。


```js
// pages/profile/profile.js
Page({
    setStorage(){
        // 第一个参数：本地存储中指定的key
        // 第二个参数：需要存储的数据
        wx.setStorageSync('num',1)
        wx.setStorageSync('obj',{name:'Tom',age:18})
    },
    getStorage(){
        // 从本地存储中获取指定key的内容
        const num = wx.getStorageSync('num')
        const obj = wx.getStorageSync('obj')
        console.log(num);
        console.log(obj);
    },
    removeStorage(){
        // 从本地移除指定key的数据内容
        wx.removeStorageSync('num')
    },
    clearStorage(){
        // 清空本地存储的全部数据
        wx.clearStorageSync()
    }
})
```

```js
// pages/profile/profile.js
Page({
    setStorage(){
        wx.setStorage({
          key:'num',
          data:1
        })
        wx.setStorage({
            key:'obj',
            data:{name:'Tom',age:18}
        })
    },
    getStorage(){
        // 从本地存储中获取指定key的内容
        const {data} = await wx.getStorage({
            key:'num'
        })
        console.log(data);
    },
    removeStorage(){
        // 从本地移除指定key的数据内容
        wx.removeStorage({
          key: 'num',
        })
    },
    clearStorage(){
        // 清空本地存储的全部数据
         wx.clearStorage()
    }
})
```



## 路由与通信


在小程序中实现页面的跳转，有两种方式：
- 声明式导航：`navigator`组件
- 编程式导航：使用小程序提供的`API`


编程式导航API的属性
- `wx.navigateTo()`：保留当前页面，跳转到应用内的某个页面，但是不能跳转到`tabBar`页面。
- `wx.redirectTo()`：关闭（销毁）当前页面，跳转到应用内的某个页面，但是不能跳转到`tabBar`页面。
- `wx.switchTab()`：跳转到`tabBar`页面（不能跳转到非`tabBar`页面），路径后不能带参数。
- `wx.reLaunch()`：关闭所有页面，打开到应用内的某个页面（包含`tabBar`页面 和 非`tabBar`页面）。
- `wx.navigateBack()`：关闭当前页面，返回上一页面或多级页面，默认是返回上一页面。


路径后可以带参数，参数与路径之间使用`?`分隔，参数键与参数值用`=`连接，不同参数用`&`分隔，例如：`path?key=value&key2=value2`，参数需要在跳转到的页面的 **`onLoad`钩子函数** 中通过形参进行接收。

pages/profile/profile.wxml
```html
<button size="mini" plain type="warn" bind:tap="navigateTo">navigateTo</button>
<button size="mini" plain type="primary" bind:tap="redirectTo">redirectTo</button>
<button size="mini" plain type="warn" bind:tap="switchTab">switchTab</button>
<button size="mini" plain type="primary" bind:tap="reLaunch">reLaunch</button>
```

pages/profile/profile.js
```js
// pages/profile/profile.js
Page({
    navigateTo(){
        // 保留当前页面，跳转到应用内的某个页面，但是不能跳转到`tabBar`页面
        wx.navigateTo({
            url:'/pages/list/list?id=1&name=Tom'
        })
    },
    redirectTo(){
        // 关闭（销毁）当前页面，跳转到应用内的某个页面，但是不能跳转到`tabBar`页面
        wx.redirectTo({
            url:'/pages/list/list?id=1&name=Tom'
        })
    },
    switchTab(){
        // 跳转到`tabBar`页面（不能跳转到非`tabBar`页面），路径后不能带参数
        wx.switchTab({
            url:'/pages/cate/cate'
        })
    },
    reLaunch(){
       // 关闭所有页面，打开到应用内的某个页面（包含`tabBar`页面 和 非`tabBar`页面）
        wx.reLaunch({
            // url:'/pages/cate/cate'
            url:'/pages/list/list?id=1&name=Tom'
        })
    }
})

```


pages/list/list.wxml
```html
<button size="mini" plain type="primary" bind:tap="navigateBack">navigateBack</button>
```



pages/list/list.js
```js
Page({
  navigateBack(){
    // wx.navigateBack()  // 默认返回上一级页面

    // 返回前2级页面
    wx.navigateBack({
      delta:2
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // ？传过来的参数，通过options 形参接收
    console.log('options',options)
  },
}）

```






## 页面处理函数


### 上拉加载更多

上拉加载时小程序中常见的一种加载方式，当用户滑动页面到底部时，会自动加载更多的内容，以便用户继续浏览小程序中实现上拉加载的方式：
- 在`app.json`或者`page.json`中配置距离页面底部距离：`onReachBottomDistance`;默认`50px`。
- 在`页面.js`中定义`onReachBottom`事件监听用户上拉加载。


产品需求：当用户上拉，需要数字进行累加，每次累加3个数字。例如目前是[1,2,3],累加后是[1,2,3,4,5,6],再次累加后是[1,2,3,4,5,6,7,8,9],以此类推。

思路：获取目前数组中最后一项n，n+1，n+2，n+3

pages/market/market.json
```json
{
  "usingComponents": {},
  "onReachBottomDistance": 100
}
```

pages/market/market.wxml
```html
<view wx:for="{{ numList }}" wx:key="*this">{{item}}</view>
```

pages/market/market.js
```js
Page({
    data:{
        numList:[1,2,3]
    },
   /**
   * 页面上拉触底事件的处理函数
   */
    onReachBottom() {
        console.log('监听用户上拉加载')
        wx.showLoading({
          title: '数据加载中...',
        })

        setTimeout(()=>{
            let numList = this.data.numList.slice(-1)
            let arr = [numList[0]+1,numList[0]+2,numList[0]+3]
            this.setData({
                numList:[...this.data.numList,...arr]
            })

            wx.hideLoading()
        },1500)
       
    }
})
```

pages/market/market.scss
```scss
page{
    height: 1000px;
    view{
        height:400rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        &:nth-child(odd){
            background-color: skyblue;
        }
        &:nth-child(even){
            background-color: lightpink;
        }
    }
}
```














### 下拉刷新


下拉刷新时小程序中常见的一种刷新方式，当用户下拉页面时，页面会自动刷新，以便用户获取最新的内容。


小程序中实现下拉刷新的方式：
- 在`app.json`或者`page.json`中开启允许下拉（`enablePullDownRefresh:true`），同时可以配置窗口、`loading`样式等。
- 在`页面.js`中定义`onPullDownRefresh`事件监听用户下拉刷新。



产品需求：当用户上拉加载更多以后，如果用户进行了下拉刷新，需要将数据进行重置。





pages/market/market.json
```json
{
  "usingComponents": {},
  "onReachBottomDistance": 100,
  "enablePullDownRefresh": true,
  "backgroundColor": "#efefef",
  "backgroundTextStyle": "light"
}
```


pages/market/market.wxml
```html
<view wx:for="{{ numList }}" wx:key="*this">{{item}}</view>
```

pages/market/market.js
```js
Page({
    data:{
        numList:[1,2,3]
    },
   /**
   * 页面上拉触底事件的处理函数
   */
    onReachBottom() {
        console.log('监听用户上拉加载')
        wx.showLoading({
          title: '数据加载中...',
        })

        setTimeout(()=>{
            let numList = this.data.numList.slice(-1)
            let arr = [numList[0]+1,numList[0]+2,numList[0]+3]
            this.setData({
                numList:[...this.data.numList,...arr]
            })

            wx.hideLoading()
        },1500) 
    },
  /**
   * 监听下拉刷新
   */
    onPullDownRefresh(){
        console.log('监听下拉刷新')
        this.setData({
            numList:[1,2,3]
        })

        //坑：在下拉刷新以后，loading效果有可能自己不会弹回去
        if(this.data.numList.length ===3){
            wx.stopPullDownRefresh() // 停止loading
        }
    }
})
```







## 增强scroll-view


使用`scroll-view`实现上拉加载更多和下拉刷新功能。



pages/profile/profile.wxml
```html
<scroll-view 
  scroll-y 
  class="scroll-y"
  lower-threshold="100"
  bindscrolltolower="getMore"
  enable-back-to-top


  refresher-enabled
  refresher-default-style="black"
  refresher-background="#f7f7f8"
  bindrefresherrefresh="refreshHandler"
  refresher-triggered="{{isTriggered}}"
>
    <view wx:for="{{ numList }}" wx:key="*this">{{item}}</view>
</scroll-view>
```


pages/profile/profile.js
```js
Page({
    data:{
        numList:[1,2,3],
        isTriggered:false // 允许自动弹回
    },
    // scroll-view 上拉加载更多事件的事件处理函数
    getMore(){
        console.log('监听用户上拉加载')
        wx.showLoading({
          title: '数据加载中...',
        })

        setTimeout(()=>{
            let numList = this.data.numList.slice(-1)
            let arr = [numList[0]+1,numList[0]+2,numList[0]+3]
            this.setData({
                numList:[...this.data.numList,...arr]
            })

            wx.hideLoading()
        },1500)
    },
    //
    refreshHandler(){
        console.log('监听下拉刷新')
        this.setData({
            numList:[1,2,3],
            isTriggered:false
        })

    }
})
```














## API Promise化

### 基于回调函数的异步API的缺点

默认情况下，小程序官方提供的异步API都是基于回调函数实现的，例如，网络请求的API需要按照如下的方式调用：
![image](/imgs/applet/wx/wx163.png)

缺点：容易造成回调地狱的问题，代码的可读性、维护性差。


### API Promise化
API Promise化，指的是通过额外的配置，将官方提供的。基于回调函数的异步API，升级改造基于Promise的异步API，从而提高代码的可读性、维护性，避免回调地狱的问题。

#### 实现API Promise化

在小程序中，实现API Promise化主要依赖于`miniprogram-api-promise`这个第三方的npm包。
- 安装：`npm install --save miniprogram-api-promise@1.0.4`
- 使用：
```js
// 在小程序入口文件中（app.js），只需要调用一次promisifyAll()方法
// 即可实现异步API的 Promise化
import { promisifyAll } from 'miniprogram-api-promise'

const wxp = wx.p = {}
//promisifyAll all wx's api
promisifyAll(wx,wxp)
```


#### 调用Promise化之后的异步API
![image](/imgs/applet/wx/wx164.png)



## 框架接口getApp()

在小程序中，可以通过`getApp()`方法获取到小程序全局唯一的App实例。因此，在`App()`方法中添加全局共享的数据、方法，从而实现页面、组件的数据传值。


app.js
```js
App({
  // 全局共享的数据
  globalData:{
      token:''
  },
  // 全局共享的方法
  setToken(token){
    // 如果想获取token,可以使用 this 的方式进行获取
    // this.globalData.token
    this.globalData.token = token
  },
})
```


profile.html
```html
<button type="primary" plain bind:tap="login">登录</button>
```

profile.js
```js

// getApp() 用来获取全局的唯一的App 实例
const appInstance = getApp()

Page({
     login(){
        console.log('appInstance',appInstance)
        appInstance.setToken('dddddddddddddffffff')
        console.log('appInstance',appInstance.globalData.token)
    }
})
```


> 注意事项：
> - 不要在`App()`方法中使用`getApp()`,使用`this`就可以拿到`app`实例
> - 通过`getApp()`获取实例之后，不要私自调用生命周期函数



## 页面间通信 eventChannel

如果一个页面通过`wx.navigateTo`打开一个新页面，这两个页面将建议一条数据通道。

- 在`wx.navigateTo`的`success`回调中通过`EventChannel`对象发射事件
- 被打开的页面可以通过`this.getOpenerEventChannel()`方法来获得一个`EventChannel`对象，进行监听、发射事件
- `wx.navigateTo`方法中可以定义`events`配置项接收被打开页面发射的事件
![image](/imgs/applet/wx/wx192.png)

index.html
```html
<button type="warn" plain bind:tap="handler">跳转到列表页面</button>
```

index.js
```js
Page({
    handler(){
        wx.navigateTo({
          url: '/pages/list/list',
          events:{
            // key:被打开页面通过eventChannel发射的事件
            // value：回调函数，为事件添加一个监听器，获取到被打开页面传递给当前页面的数据
            currentevent:(res)=>{
               console.log('3333',res)  // {age: 18}
            }
          },
          success(res){
              console.log('res',res)
            //   通过success 回调函数的形参，可以获取`eventChannel`对象
            //  `eventChannel`对象提供了emit方法，可以发射事件，同时携带参数
            res.eventChannel.emit('myevent',{name:'Tom'})
          }
        })
    }
})
```


list.js
```js
Page({
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // console.log('options',options)

    // 通过`this.getOpenerEventChannel()`方法
    const EventChannel = this.getOpenerEventChannel()

    // 通过EventChannel 提供的 on 方法监听页面发射的自定义事件
    EventChannel.on('myevent',(res)=>{
        console.log('2222',res) // {name: "Tom"}
    })

    // 通过EventChannel 提供的 emit 方法，也可以向上一级页面传递数据
    EventChannel.emit('currentevent',{age:18})
  }
})
```


## 组件通信-事件总线


随着项目功能的增加，业务逻辑也会变得很复杂，一个页面可能是由多个组件进行构成，并且这些组件之间需要进行数据的传递。这时候如果使用之前学习的组件传值方式进行数据的传递，就会比较麻烦

![image](/imgs/applet/wx/wx193.png)


事件总线是对发布-订阅模式的一种实现，是一种集中式事件处理机制，允许不同的组件之间进行彼此通信，常用于两个非父子关系组件和兄弟组件之间通讯。我们可以借助第三方的 发布订阅 JS 包，来实现事件总线的功能，[`PubSubJs`](https://github.com/mroderick/PubSubJS)


父组件 pages/list/list..wxml
```html
<view class="parent">
    <view class="title">f父组件，子组件a 和 子组件b 是兄弟关系</view>

    <view class="container">
        <custom01></custom01>
        <custom02></custom02>
    </view>
</view>
```

 父组件  pages/list/list.wxss
 ```scss
 .parent{
    background-color: pink;
    padding:20rpx;
}
 ```

子组件a  components/custom01/custom01.wxml
```html
<view class="child1">
    <text>子组件a</text>
    <button bind:tap="sendData">传递数据给兄弟</button>
</view>
```



子组件a  components/custom01/custom01.js
```js
import PubSub from 'pubsub-js'
Component({
  /**
   * 组件的初始数据
   */
  data: {
    name:'Tom'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    sendData(){
        /**
         * publish 发布、发射自定义事件
         * 1.自定义事件的名称
         * 2.需要传递的数据
         */
        PubSub.publish('myevent',this.data.name)
    }
  }
})
```

子组件b  components/custom02/custom02.wxml
```html
<view class="child2">
    <text>子组件b</text>
    <text>兄弟组件a 传过来的值：{{name}}</text>
</view>
```


子组件b components/custom02/custom02.js
```js
import PubSub from 'pubsub-js'
Component({
  /**
   * 组件的初始数据
   */
  data: {
    name:''
  },
  lifetimes:{
    attached(){
        // subscribe 订阅、监听自定义的事件
        // 1.需要订阅、监听的事件名称
        // 2.回调函数，回调函数有两个参数：
        //  - msg:自定义事件的名称
        //  - data:传递过来的数据
        PubSub.subscribe('myevent',(msg,data)=>{
            console.log('msg',msg);
            console.log('data',data);
            this.setData({
                name:data
            })
        })
    }
  }
})
```




## 自定义导航栏

小程序默认的导航栏与`APP`一样都位于顶部固定位置。但是默认导航栏可能会影响小程序的整体风格，且无法满足特定的设计需求，这时候就需要自定义导航栏。

- 在`app.json`或者`page.json`中，配置`navigationStyle`属性为`custom`,即可自定义导航栏。
- 在设置以后，就会移除默认的导航栏，只保留右上角胶囊按钮。


![image](/imgs/applet/wx/wx194.png)











