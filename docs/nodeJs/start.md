#   Node.js起步

[[toc]]

## 安装环境

- 查看当前Node环境版本号  `node --version` 简写 `node -v`
- 下载：http://nodejs.cn/download/
- 安装
- 确认Node环境是否安装成功
- 环境变量

## 使用Node执行js脚本文件

- 创建编写`javaScript`脚本文件
- 打开终端，定位到脚本文件所在目录
- 输入`node 文件名`执行对应的文件

> 注意,文件名不要使用`node.js`来命名。

eg:

helloworld.js
```js
var foo = 'bar';
console.log('foo', foo)
```

`node 00-helloworld.js`

foo bar


## Node.js作用

- 解析执行`javaScript`
- 读写文件
- `http`

```js
/*
在Node中,采用ECMAScript进行编码
没有BOM和DOM
在浏览器中的javaScript不一样
所以下面的输出报错
*/

console.log(window);
console.log(document);
```

浏览器中的javaScript是没有文件操作的能力的

但是Node中的javaScript具有文件操作的能力

### 1.读文件

```js
//00-hellowold.js
hello 
```
```txt
//test.txt
hello world 
```

```js
//fs是file-system的简写，就是文件系统的意思

//在Node中如果想要进行文件操作,就必须引入fs这个核心模块
//在fs这个核心模块中,就提供了所有文件操作相关的API
//例如：fs.readFile 就是用来读取文件的

//1.使用 require 方法加载 fs 核心模块
var fs = require('fs');

//2.读取文件
//第一个参数就是要读取的文件路径
//第二个参数是一个回调函数
//如果读取失败，data就是null;error就是错误对象
//如果读取成功，data就是读到的数据，error就是null
fs.readFile('./00-helloworld.js', function (error, data) {
    console.log('error: ', error);// null
    console.log('data: ', data);// <Buffer 63 6f 6e 73 6f 6c 65 2e 6c 6f 67 28 27 31 31 31 31 31 31 27 29>
    //文件中存储的其实都是二进制数据0 1
    //这里为什么看到的不是0和1呢?原因是二进制转为16进制了，但是无论是二进制还是16进制，人类都不认识，所以我们可以通过toString方法把其转为我们认识的字符
    console.log('data: ', data.toString());//hello
})

fs.readFile('./test.txt', function (error, data) {
    if(error){
        console.log('读取文件失败了')
        return;
    }
    console.log('error: ', error);// null
    console.log('data: ', data);// <Buffer 63 6f 6e 73 6f 6c 65 2e 6c 6f 67 28 27 31 31 31 31 31 31 27 29>
    //文件中存储的其实都是二进制数据0 1
    //这里为什么看到的不是0和1呢?原因是二进制转为16进制了，但是无论是二进制还是16进制，人类都不认识，所以我们可以通过toString方法把其转为我们认识的字符
    console.log('data: ', data.toString());//hello world
})
```


### 2.写文件

```js
//1.使用 require 方法加载 fs 核心模块
var fs = require('fs');

//2.写文件
//第一个参数：文件路径
//第二个参数: 文件内容
//第三个参数: 回调函数
//  error 成功error为null  失败error为错误对象
fs.writeFile('./hello.md', '大家好', function (error) {
    if (error) {
       console.log('文件写入失败了');
        return;
    }
})
```

### 3.http

我们可以使用`Node`非常轻松的构建一个Web服务器

在`Node`中专门提供了一个核心模块:`http`

`http`这个模块的职责就是帮助你创建编写服务器的

#### 最简单的http服务
```js
//1.加载http模块
var http = require('http');

//2.使用http.createServer() 方法创建一个Web服务器

//返回一个Server实例
var server = http.createServer();

//3.注册request请求事件
//当客户端请求过来,就会自动触发服务器的request请求事件，然后执行第二个参数，回调处理函数
server.on('request', function () {
    console.log('收到客户端的请求了')
})

//4.绑定端口号，启动服务器
server.listen(3000, function () {
    console.log('服务器启动成功了,可以通过http://loacalhost:3000/ 来进行访问')
})
```

![image](/imgs/nodeJs/http1.png)


#### request请求事件参数说明

当客户端请求过来,就会自动触发服务器的request请求事件，然后执行第二个参数，回调处理函数

request 请求事件处理函数,需要接收两个参数:

- request请求对象，请求对象可以用来获取客户端的一些请求信息,例如请求路径
- response响应对象，响应对象可以用来给客户端发送响应信息

eg:
```js

var http = require('http');
var server = http.createServer();

server.on('request', function (request, response) {
    console.log('收到客户端的请求了')
    console.log('请求路径是', request.url)
    //response 对象有一个方法：write可以用来给客户端发送响应数据
    //write 可以使用多次,但是最后一定要使用end来结束响应,否则客户端会一直等待。
    response.write('hello');
    response.write('nodejs');
    response.end();//告诉客户端，我的话说完了，可以呈递给用户了

    //由于现在我们的服务器的能力还非常的弱,无论是什么请求,都只能响应hello nodejs
    //思考：
    //我希望当请求不同的路径的时候响应不同的结果
    /**
     * 例如：
     * / index
     * /login 登录
     * /register 注册
     * /haha 哈哈哈
     */
});


//绑定端口号，启动服务器
server.listen(3000, function () {
    console.log('服务器启动成功了,可以通过http://loacalhost:3000/ 来进行访问')
})
```


#### 根据不同的请求路径返回不同的数据

根据不同的请求路径发送不同的相应结果

- 获取请求路径，`req.url` 获取到的是端口号之后的那一部分路径，也就是说所有的`url`都是以 `/ `开头的
- 判断路径处理响应

```js

var http = require('http');
//1.创建server
var server = http.createServer();

//2.监听request请求事件,设置请求处理函数
server.on('request', function (req, res) {
    console.log('收到客户端的请求了')
    console.log('请求路径是', req.url)
    // res.write('hello');
    // res.write('nodejs');
    // res.end();//告诉客户端，我的话说完了，可以呈递给用户了

    //上面的方式比较麻烦,推荐使用更简单的方式，直接end
    // res.end('hello');

    //根据不同的请求路径发送不同的相应结果
    var url = req.url;
    // if (url === '/') {
    //     res.end('index page');
    // } else if (url === '/login') {
    //     res.end('login page');
    // } else {
    //     res.end('404 page');
    // }

    var products = [{
        name: '苹果',
        price: 100,
    }, {
        name: '香蕉',
        price: 100
    }]

    //相应内容只能是字符串或者二进制数据
    if (url === '/products') {
        //数组转字符串
        res.end(JSON.stringify(products))
    }

});


//3.绑定端口号，启动服务器
server.listen(3000, function () {
    console.log('服务器启动成功了,可以通过http://loacalhost:3000/ 来进行访问')
})
```


