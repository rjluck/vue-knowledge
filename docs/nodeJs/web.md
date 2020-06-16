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

## 案例-发表留言

