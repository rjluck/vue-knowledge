var http = require('http');
var fs = require('fs');
var template = require('art-template')
var url = require('url');

//为了方便的统一这些静态资源,所以我们约定把所有的静态资源都存放在 public 目录中
//哪些资源能被用户访问,哪些资源不能被用户访问,现在就可以通过代码来进行非常灵活的应用

//public 整个public目录中的资源都允许被访问


//假数据
var comments = [
    {
        name: '测试1',
        message: '今天天气不错',
        dateTime: '2020-6-29',
    },
    {
        name: '测试2',
        message: '今天天气不错',
        dateTime: '2020-6-29',
    }
]

/** 
 * /pinglun?name=111&message=211111
 * 对于这种表单提交的请求路径，由于其中具有用户动态填写的内容
 * 所以不可能通过去判断完整的url路径来处理这个请求
 * 结论：对于我们来讲，其实只需要判定，如果你的请求路径是 /pinglun 的时候，
 * 那我就认为提交表单的请求过来了
 * 
*/

//创建服务器，简写方式
http
    .createServer(function (req, res) {
        //使用 url.parse 方法将路径解析为一个方便操作的对象,第二个参数为true,表示直接将查询字符串转为一个对象
        //(通过 query属性来访问的)
        var parseObj = url.parse(req.url, true);
        var pathname = parseObj.pathname;
        // res.end('hello')
        // var url = req.url;
        if (pathname === '/') {
            fs.readFile('./views/index.html', function (err, data) {
                if (err) {
                    return res.end('404 Not FOund')
                }
                //模板引擎渲染
                var htmlStr = template.render(data.toString(), {
                    comments: comments
                })
                res.end(htmlStr)
            })
        } else if (pathname.indexOf('/public/') === 0) {
            //统一处理：
            //如果请求路径是以 /public/ 开头的，则认为要获取public中的某个资源，所以我们就直接可以把请求路径当作文件路径来直接进行读取
            console.log(pathname);
            fs.readFile('.' + pathname, function (err, data) {
                if (err) {
                    return res.end('404 Not FOund')
                }
                res.end(data)
            })
        } else if (pathname == '/post') {
            fs.readFile('./views/post.html', function (err, data) {
                if (err) {
                    return res.end('404 Not FOund')
                }
                res.end(data)
            })
        } else if (pathname === '/pinglun') {
            //注意：这个时候无论 /pinglun?xxx 之后是什么，都不用担心，因为 pathname 不包含?之后的内容
            //一次请求对应一次响应，响应结束
            console.log('收到表单请求', parseObj.query);
            // res.end(JSON.stringify(parseObj.query))

            //接下来
            //1.获取表单提交的数据 parseObj.query
            //2.将当前时间日期添加到数据对象中，然后存储到数组中
            //3.让用户重定向跳转到首页 /
            //    当用户重新请求 / 的时候,数组中的数据已经发生变化了，所以用户看到的页面
            var comment = parseObj.query;
            comment.dateTime = '2020-07024 17:19:00';
            comments.push(comment);
            //服务端这个时候已经将数据存储好了，接下来就是让用户重新请求 / 首页，就可以看到最新的留言
            //如何通过服务器让客户端重定向?
            //1.状态码设置为302，临时重定向   statusCode
            //2.在响应头中通过Location告诉客户端往哪重定向  setHeader
            //如果客户端发现收到服务器的响应的状态码是 302就会自动去响应头中找Location,然后对该地址发起新的请求
            //所以就能看到客户端自动跳转了
            res.statusCode = 302;
            res.setHeader('Location', '/');
            res.end();//结束响应
        } else {
            //其他的都处理成 404 找不到
            fs.readFile('./views/404.html', function (err, data) {
                if (err) {
                    return res.end('404 Not FOund')
                }
                res.end(data)
            })
        }
    })
    .listen(3000, function () {
        console.log('running...')
    });