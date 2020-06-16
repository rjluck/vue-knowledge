
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