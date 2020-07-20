
#   Node.js简介

[[toc]]

## 为什么要学习Node.js

- 企业需求
    - 具有服务端开发经验更号
    - front-end 前端
    - back-end 后端
    - 全栈开发工程师
    - 基本的网站开发能力
        - 服务端
        - 前端
        - 运维部属

学习node.js的目的就是帮助大家打开Web后台服务器。

只有了解服务端才能更好的配合服务端开发人员进行协同开发。


## Node.js简介

`Node.js` 是一个开源与跨平台的 `JavaScript` **运行时环境**。

`Node.js`在浏览器外运行 V8 JavaScript 引擎（Google Chrome 的内核）。

- 不是一门语言,不是库，不是框架
- 是`JavaScript` **运行时环境**

简单说，`Node.js`可以解析和执行`JavaScript`代码。以前只有浏览器可以解析执行`JavaScript`代码，也就是说现在的`JavaScript`代码可以完全脱离浏览器来运行，归功于`Node.js`。

### 1.浏览器中的`JavaScript`

- ECMAScript
- DOM
- BOM

### 2.`Node.js`中的`JavaScript`

- 有ECMAScript
- 没有BOM和DOM
- 在`Node.js`中这个`javaScript`执行环境为`javaScript`提供了一些服务器级别的`API`
    - 例如文件的读写
    - 网络服务的构建
    - 网络通信
    - http服务器

### 3.`Node.js`中的特性

- 事件驱动
- 非堵塞I/O模型(异步)
- 轻量和高校

### 4.`Node.js`包管理

- npm 是世界上最大的开源生态系统
- 绝大多数JavaScript相关的包都存放在npm上，这样做的目的是为了让开发人员更方便的去下载使用
- npm install jquery

### 5.构建与Chrome的V8引擎之上

- 代码只是具有特定格式的字符串
- 引擎可以认识它，帮你解析和执行
- Google Chrome的V8引擎是目前公认的解析执行JavaScript代码最快的
- Node.js的作者把Google Chrome中的V8引擎移植出来，开发了一个独立的JavaScript运行时环境


## Node.js能做什么

- Web服务器后台
- 命令行工具
    - npm(node)
    - git(c语言)
    - hexo(node)
    - ...
- 对于前端工程师来讲,接触最多的是它命令行工具
    - 自己写的很少,主要是用别人第三方的
    - webpack
    - gulp
    - npm



## Node.js一些资源

- 《深入浅出Node.js》
- 《Node.js权威指南》
- JavaScript标准参考教程(alpha):http://javascript.ruanyifeng.com/
- Node入门:http://www.nodebeginner.org/index-zh-cn.html
- 官方API文档:https://nodejs.org/dist/latest-v6.x/docs/api
- 中文文档：http://www.nodeclass.com/api/node.html
- CNODE社区:http://cnodejs.org
- 代码规范[JavaScript Standard Style]https://standardjs.com/
