# Web服务器开发

## ip地址和端口号概念

所有联网的程序都需要进行网络通信

计算机中只有一个物理网卡，而且同一个局域网中,网卡的地址必须是唯一的。

网卡是通过唯一的ip地址来进行定位的。

- `ip`地址用来定位计算机
- 端口号用来定位具体的应用程序
- 一切需要联网通信的软件都会占用一个端口号。所有需要联网通信的软件都必须具有端口号，才可以进行通信。
- 端口号的范围从`0~65536`之间
- 在计算机中有一些默认端口号,最后不要去使用
    - 例如http服务的80
- 我们在开发过程中使用一些简单好记的就可以了，例如3000、5000等没什么含义。
- 同一台机器，可以同时开启多个服务,但一定要确保不同服务占用的端口号不一致。

eg:
```js
var http = require('http');
//1.创建server
var server = http.createServer();
//2.监听request请求事件,设置请求处理函数
server.on('request', function (req, res) {
    console.log('收到客户端的请求了')
    console.log('请求我的客户端的端口号是', req.socket.remotePort);
    console.log('请求我的客户端的地址是', req.socket.remoteAddress);
});


//3.绑定端口号，启动服务器
server.listen(3000, function () {
    console.log('服务器启动成功了,可以通过http://loacalhost:3000/ 来进行访问')
})
```

## 响应内容类型Content-Type

- 在服务端默认发送的数据，其实是`utf8`编码的内容，但是浏览器不知道你是utf8编码的内容
- 浏览器在不知道服务器响应内容的编码的情况下会按照当前操作系统默认编码去解析
- 中文操作系统默认是 `gdk`,所以乱码。
- 解决方法就是正确的告诉浏览器我给你发的内容是什么编码的
- 在`http`协议中,`Content-Type` 就是用来告知对方，我给你发送的数据内容是什么类型
- 对于文本类型的数据,最好都加上编码`charset=utf-8`,目的是为了防止中文解析乱码问题
- 参考网址:http://tool.oschina.net/   
- 参考网址:https://tool.oschina.net/commons

eg：

```js
var http = require('http');
//1.创建server
var server = http.createServer();

//2.监听request请求事件,设置请求处理函数
server.on('request', function (req, res) {
    console.log('收到客户端的请求了')
    console.log('请求路径是', req.url)
    // res.end('hello 世界');
    //解决方法就是正确的告诉浏览器我给你发的内容是什么编码的
    //在http协议中,Content-Type 就是用来告知对方，我给你发送的数据内容是什么类型
    // res.setHeader('Content-Type', 'text/plain;charset=utf-8');//普通文本类型
    // res.end('hello 世界');

    var url = req.url;
    if (url == '/plain') {
        res.setHeader('Content-Type', 'text/plain;charset=utf-8');//text/plain普通文本类型
        res.end('hello 世界');
    } else if (url == '/html') {
        res.setHeader('Content-Type', 'text/html;charset=utf-8');//text/html   html文本类型
        res.end('<p>hello html <a href="#">点我</a></p>')
    }

});


//3.绑定端口号，启动服务器
server.listen(3000, function () {
    console.log('服务器启动成功了,可以通过http://loacalhost:3000/ 来进行访问')
})
```


## 发送文件中的数据

- 不同的资源对应的`Content-Type`是不一样的
- 图片不需要指定编码
- 一般只为字符数据才指定编码

通过网络发送文件
- 发送的并不是文件,本质上来讲发送的是文件的内容
- 当浏览器收到服务器响应内容之后,就会根据你的`Content-Type`进行对应的解析处理

eg：

http.js

```js
var http = require('http');
var fs = require('fs');

//1.创建server
var server = http.createServer();
//2.监听request请求事件,设置请求处理函数
server.on('request', function (req, res) {
    var url = req.url;
    //url:统一资源定位符
    //一个url最终 其实是要对应到一个资源的
    //index.html
    if (url == '/') {
        //方式1(不适用)
        // res.end(`<!DOCTYPE html>
        // <html lang="en">
        // <head>
        //     <meta charset="UTF-8">
        //     <meta name="viewport" content="width=device-width, initial-scale=1.0">
        //     <title>Document</title>
        // </head>
        // <body>
        //     <h1>首页</h1>
        // </body>
        // </html>`)

        //方式2
        //我们要发送的还是在文件中的内容
        fs.readFile('./resource/index.html', function (err, data) {
            if (err) {
                res.setHeader('Content-Type', 'text/plain;charset=utf-8');
                res.end('文件读取失败,请稍后重试！')
            } else {
                //data默认是二进制数据,可以通过 toString转为字符串
                //res.end() 支持两种数据类型,一种是二进制,一种是字符串
                res.setHeader('Content-Type', 'text/html;charset=utf-8');
                res.end(data);

            }
        })
    } else if (url === '/img') {
        fs.readFile('./resource/img.jpg', function (err, data) {
            if (err) {
                res.setHeader('Content-Type', 'text/plain;charset=utf-8');
                res.end('文件读取失败,请稍后重试！')
            } else {
                //图片就不需要指定编码了,因为我们常说的编码一般值的是:字符编码
                res.setHeader('Content-Type', 'image/jpeg');
                res.end(data);
            }
        })
    }
});

//3.绑定端口号，启动服务器
server.listen(3000, function () {
    console.log('服务器启动成功了,可以通过http://loacalhost:3000/ 来进行访问')
})
```

> 除了 Content-Type 可以用来指定编码,也可以在 HTML 页面中通过 meta元数据来声明当前文本的编码格式，浏览器也会识别它。

```html
 <meta charset="UTF-8">
```

eg：简单的类似于Apache 服务软件

eg:
```js
var http = require('http');
var fs = require('fs');

//1.创建server
var server = http.createServer();
var wwwDir = './www'
//2.监听request请求事件,设置请求处理函数
server.on('request', function (req, res) {
    var url = req.url;
    var filePath = '/index.html';
    console.log('url: ', url);
    if (url !== '/') {
        filePath = url
    }

    fs.readFile(wwwDir + filePath, function (err, data) {
        if (err) {
            //return有两个作用 1.方法返回值  2.阻止代码继续往后执行
            return res.end('404');
        }
        res.end(data)
    })
    //Apache 服务软件,默认有一个 www 目录,所有存放在 www目录中的资源都可以通过网址来浏览
    //127.0.0.1:80/index.html
});


//3.绑定端口号，启动服务器
server.listen(3000, function () {
    console.log('服务器启动成功了,可以通过http://loacalhost:3000/ 来进行访问')
})
```

## 读取文件目录

- 如何得到目录列表中的文件名和目录名 `fs.readdir`
- 如何将得到的文件名和目录名替换你到 `xxx.html`中,通过模板引擎
    - `xxx.html`中，需要替换的位置预留一个特殊的标记(就像以前使用模板引擎的标记一样)
    - 根据`files`生成需要的HTML内容


eg:
```js
var http = require('http');
var fs = require('fs');

//1.创建server
var server = http.createServer();
var wwwDir = './www'
//2.监听request请求事件,设置请求处理函数
server.on('request', function (req, res) {
    var url = req.url;
    var filePath = '/index.html';
    fs.readFile(wwwDir + filePath, function (err, data) {
        if (err) {
            return res.end('404');
        }
        //1.读取目录
        fs.readdir(wwwDir, function (err, files) {
            if (err) {
                return console.log('目录不存在')
            }
            console.log(files);//[ 'a.txt', 'apple', 'index.html' ]
            //生成需要替换的内容
            var content = '';
            files.forEach(function (item) {
                content += `
                <tr>
                <td>${item}</td>
                <td></td>
                <td></td>
            </tr>
                `
            });

            //替换
            data = data.toString();
            data = data.replace('^_^', content);//就是普通的字符串解析替换，浏览器看到的效果就不一样了
            res.end(data);//发送解析替换后的响应数据
        })

        // res.end(data)
    })
});

//3.绑定端口号，启动服务器
server.listen(3000, function () {
    console.log('服务器启动成功了,可以通过http://loacalhost:3000/ 来进行访问')
})
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <table>
        <thead>
            <tr>名称</tr>
            <tr>大小</tr>
            <tr>修改日期</tr>
        </thead>
        <tbody>
            <tr>
                <td>^_^</td>
                <td></td>
                <td></td>
            </tr>
        </tbody>
    </table>
</body>
</html>
```



## 请求对象 Request




## 响应对象 Response

## 在 Node 中使用模块引擎

### 1.art-template 模板字符串

- 不仅可以在浏览器中使用,也可以在node中使用
- 安装：`npm install art-template`
- 强调:模板引擎不关心你的字符串内容,只关心自己能认识的模板标记语法。例如`{{}}`

html中使用`art-template`模板引擎

eg:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <!-- 引入js文件 -->
    <script src="./template-web.js"></script>
    <script type="text/template" id="tpl">
        大家好，我叫 {{ name }}
        我今年 {{ age }}岁
        我喜欢: {{each hobbies}} {{ $value }} {{/each}}
    </script>
    <script>
        var ret = template('tpl', {
            name: 'Jack',
            age: 18,
            hobbies: [
                '吃', '睡', '玩'
            ]
        })
        console.log(ret)
    </script>
</body>
</html>
```

在Node中使用`art-template`模板引擎

- 模板引擎最早就是诞生于服务器领域,后来才发展到了前端
- 安装
- 在需要使用的文件模块中加载`art-template`
    - 只需要使用`require`方法加载就可以了`require('art-template')`
- 查文档,使用模板引起的api
    - github:https://github.com/aui/art-template
    - 官网：https://aui.github.io/art-template/zh-cn/docs/installation.html


eg：
```js
var template = require('art-template');

var ret = template.render('hello {{name}}', {
    name: 'Jack'
})

console.log(ret);//hello Jack
```





## 统一处理静态资源





## 服务端渲染

### 含义

- 说白了就是在服务端使用模板引擎
- 模板引擎最早诞生于服务端,后来才发展到了前端

### 服务端渲染和客户端渲染的的区别

- 客户端渲染不利于 `SEO`搜索引擎优化
- 服务端渲染是可以被爬虫抓取到的,客户端一部渲染是很难被爬虫抓取到的
- 所以你会发现真正的网站既不是纯异步,也不是纯服务端渲染出来的
- 是两者结合来做的
- 例如京东的商品就采用的是服务端渲染,目的是为了`SEO`搜索引擎优化
- 而它的商品评论列表为了用户体验,而且不需要`SEO`优化，所以采用客户端渲染





## 案例-发表留言



