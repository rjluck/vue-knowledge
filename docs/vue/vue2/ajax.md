
# Vue中的Ajax

[[toc]]

## 配置代理

发送请求的方式
- xhr
```js
new XMLHttpRequest()

xhr.open()
xhr.send()
```
- jQuery
80%封装的是DOM操作
```js
$.get
$.post
```
- axios
  - 用的比较多
- fetch
  - 返回的数据会包两层Promise
  - 兼容性差，IE不可以用


### axios
安装`npm i axios`
引入`import axios from 'axios'`

### 解决跨域

方式1：cors（后端人员配置响应头）

方式2：jsonp
- 巧妙利用script标签上的src属性不受同源策略的影响
- 前后端一起配合才可
- 只能解决get请求的跨域问题
- 开发中用的微乎其微

方式3：代理服务器

![image](/imgs/vue/serve1.png)

### vue-cli如何配置代理

1）配置方式1
在vue.config.js中添加如下配置
```js
// vue.config.js
module.exports = {
  pages:{
    index:{
      // 入口
      entry:'src/main.js'
    }
  },
  lintOnSave:false,//关闭语法检查
  // 开启代理服务器
  devServer:{
    proxy:'http://xxxx:5000'
  }
}
```
说明：
- 优点：配置简单请求资源时直接发给前端（8080）即可。
- 缺点：不能配置多个代理，不能灵活的控制请求是否走代理。
- 工作方式：若按照上述配置代理，当请求了前端不存在的资源时，那么该请求会转发给服务器（优先匹配前端资源）



1）配置方式2
在vue.config.js中添加如下配置
```js
// vue.config.js
module.exports = {
  pages:{
    index:{
      // 入口
      entry:'src/main.js'
    }
  },
  lintOnSave:false,//关闭语法检查
  // 开启代理服务器
  devServer:{
    proxy:{
      '/api':{
        target:'xx',// 代理目标的路径
        pathRewrite:{
          '^api':''
        }
        // ws:true, // 用于支持websocket
        // changeOrigin:true // 用于控制请求头中的host值
      },
      '/foo':{
        target:'http://localhost:9000',
        pathRewrite:{
          '^foo':''
        }
      }
    }
  }
}
```
说明：
- 优点：可以配置多个代理，且可以灵活的控制请求是否走代理。
- 缺点：配置略微繁琐，请求资源时必须加前缀。


## vue项目中常用的2个Ajax库

### axios
通用的Ajax请求库，官方推荐，使用广泛。

### vue-resource
vue插件库，vue1.x使用广泛，官方已经不维护，了解即可。
- 该插件是对xhr的封装
- 安装`npm i vue-resource`
- 引入
```js
// main.js

// 引入插件
import vueResource from 'vue-resource';

// 使用插件
Vue.use(vueResource)
```
- 使用
```js
// 发请求
// $http用法同axios
this.$http.get()
```