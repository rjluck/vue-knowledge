# API

[[toc]]


## 分类

小程序API的3大分类
- 事件监听API
  - 特点：以`on`开头，用来监听某些事件的触发
  - 举例：`wx.onWindowResize(function callback)`监听窗口尺寸变化的事件
- 同步API
  - 特点1：以`Sync`结尾的API都是同步API
  - 特点2：同步API的执行结果，可以通过函数返回值直接获取，如果执行出错会抛出异常
  - 举例：`wx.setStorageSync('key','value')`向本地存储中写入内容
- 异步API
  - 特点：类似于`jQuery`中的`$ajax(options)`函数，需要通过`success`、`fail`、`complete`接收调用的结果
  - 举例：`wx.request()`发起网络数据请求，通过`success`回调函数接收数据。


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



