# Express(第三方Web开发框架)

##  简介

原生的`http`在某些方面表现不足以应对我们的开发需求，所以我们就需要使用框架来加快我们的开发效率，框架的目的就是提高效率，让代码高度统一。

在`Node`中，有很多`Web`开发框架。如`express`等。

官网：http://expressjs.com/

作者tj: https://github.com/tj


安装：
- 生成`package.json`文件  `npm init`
- 安装`express`  `npm install express --save`


## Hello World

- public
  - js
    - main.js
  - img
    -main.jpg
- static
  - main.css
- app.js
- package.json

```js
//app.js

/**
 * 1.安装
 * 2.引包
 */
var express = require('express');

//3.创建服务器应用程序，也就是原来的http.createServer
var app = express();

//公开指定目录,即静态资源文件
//只要这样做了，你就可以直接通过 /public/xx 的方式访问 public目录中的所有资源了
app.use('/public/', express.static('./public/'))
app.use('/static/', express.static('./static/'))


//当服务器收到get请求 / 的时候，执行回调处理函数
app.get('/', function (req, res) {
    //在Express 中可以直接 通过req.query 来获取查询字符串参数
    console.log(req.query);
    // res.write('hello world');
    // res.end()’
    res.send('hello express');
})


app.get('/about', function (req, res) {
    res.send('关于我')
})

app.get('/pinglun', function (req, res) {
    console.log(req.query);
    //在 Express中使用模板引擎，有更好的方式：res.render('文件名'，{模板对象})
    //可以查看 art-template 官方文档：如何让art-template 结合 Express 来使用。https://aui.github.io/art-template/zh-cn/index.html
})

//相当于 server.listen
app.listen(3000, function () {
    console.log('app is running at port 3000');
})

//content-type 转义
```

## 基本路由

路由器：

- 请求方法
- 请求路径
- 请求处理函数

get:
```js
//当以Get方法请求 /about 的时候，执行对应的处理函数
app.get('/about', function (req, res) {
    res.send('hello world')
})
```

post:
```js
//当以POST方法请求 /about 的时候，执行对应的处理函数
app.post('/about', function (req, res) {
    res.send('get a post request')
})
```




## 静态资源服务

```js
//将资源公开
//当以 /public/ 开头的时候。去 ./public/ 目录查找对应的资源

//方式1 
//两个参数都写,常用，该方式更容易辨识，推荐
// 如: /public/js/main.js 
app.use('/public/', express.static('./public/'))
app.use('/static/', express.static('./static/'))
app.use('/static/', express.static(path.join(__dirname,'./static/')))


//方式2
//当省略第一个参数的时候，则可以通过 省略 /public 的方式来访问,直接访问里面文件的具体路径,
// 如: /js/main.js 
//这种方式的好处可以省略 /public
app.use(express.static('./public/'))

//方式3 
//当第一个参数和第二个参数url不一致的时候,可以通过 第一个参数/第二个参数里面文件的具体路径
// 如: /a/js/main.js , a相当于 public 的别名
app.use('/a/', express.static('./public/'))

```




## 模块标识中的"/" 和  文件操作路径中的"/" 

- 模块加载中，相对路径 `./`不可省略
- 文件操作中的相对路径可以省略 `./`



- code
  - data
    - a.txt
  - a.js

```js
//模块加载中，相对路径 ./不可省略
var fs = require('fs');

//文件操作中的相对路径可以省略 ./,也代表当前目录
//  /代表当前文件所在磁盘根目录
fs.readFile('data/a.txt',function(err,data){
    if(err){
        return console.log('读取失败')
    }
    console.log(data.toString())
})

```

## 修改完代码自动重启

这里可以使用一个第三方命名工具 `nodemon`来帮我们解决频繁修改代码重启服务的问题。

`nodemon`是一个基于`Node.js` 开发的第三方命令行工具，我们使用的时候需要独立安装。

- 全局安装： `npm install --global nodemon`
- 使用： 启动服务由`node app.js` 改为 `nodemon app.js`
- 只要是通过`nodemon` 启动的服务，它会监视你的文件变化，当文件发生变化的时候，自动启动服务器。
- 检查是否安装成功 `nodemon --version`

> 所有需要 --global 全局安装的包都可以在任意目录执行


## 在Express中配置使用`art-template`模板引擎

- [art-template-GitHub仓库]:https://github.com/aui/art-template
- [art-template官方文档]:https://aui.github.io/art-template/zh-cn/index.html

安装：
```js
npm install --save art-template
npm install --save express-art-template
```

配置：
```js
app.engine('art', require('express-art-template'));
```

使用：
```js
app.get('/',function(req,res){
  //express 默认会去项目中views目录中找index.html
  res.render('index.html',{
    title:'helllo'
  })
})
```

如果想要修改默认的 views目录，则可以

- 第一个参数必须是 `views`
- 第二个参数是 目录路径
```js
//注意:第一个
app.set('views', '目录路径')
```








