/**
 * webpack基于node运行的
 */

//引入插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')


module.exports = {
    entry: "./src/index.ts",//入口文件
    output: {//指定项目编译完的输出文件
        filename: 'main.js',//
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],//文件后缀，自动解析文件拓展,当引入文件的时候不需要写后缀.js,.ts等。
    },
    module: {
        rules: [{
            test: /\.tsx?$/,//匹配后缀为ts或tsx文件
            use: 'ts-loader',//使用ts-loader解析 npm install ts-loader -D
            exclude: /node_modules/ //排除一些文件,即不去处理node_modules下的文件
        }]
    },
    devtool: process.env.NODE_ENV === 'production' ? false : 'inline-source-map',//开启了 inline-source-map ，无论是源文件是什么都能够查找得到，毕竟我要定位代码是哪个地方出错了 。
    devServer: {
        contentBase: './dist',////设置服务器访问的基本目录,本地开发环境运行时，基于哪个文件夹作为根目录运行的
        stats: 'errors-only',//webpack启动后在控制台的打印信息，当参数是 errors-only时，有错误的时候控制台才会打印信息
        compress: false,//不启动压缩
        host: 'localhost',//服务器的ip地址
        open: true,  //自动打开页面
        port: '8089'//端口
    },
    plugins: [//插件
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['./dist'] //在build之前清理掉之前打包生成的文件
        }),
        new HtmlWebpackPlugin({
            template: './src/template/index.html'//编译时使用那个html文件作为模板
        })
    ]
}