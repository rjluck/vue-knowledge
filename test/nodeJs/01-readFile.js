//1.使用 require 方法加载 fs 核心模块
var fs = require('fs');

//2.写文件
//第一个参数：文件路径
//第二个参数: 文件内容
//第三个参数: 回调函数
//  error 成功error为null  失败error为错误对象
fs.writeFile('./hello.md', '大家好', function (error) {
    console.log('文件写入成功');
    if (error) {
        console.log('读取文件失败了')
        return;
    }
})