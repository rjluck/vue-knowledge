# 初始webpack

[[toc]]

## 什么是webpack

- `webpack`是一个模块打包器
- 在webpack中会将前端的所有资源文件（`js/json/css/img/less/...`）都作为模块处理
- 它将根据模块的依赖关系进行分析，生成对应的资源
- V4官网：https://v4.webpack.js.org/

### 五个核心概念

- 【入口`entry`】：指示`webpack`应该使用哪个模块，来作为构建其内部依赖图的开始
- 【输出`output`】：在哪里输出文件，以及如何命名这些文件
- 【`loader`】：处理那些非`JavaScript`文件（`webpack`自身只能解析`JavaScript`和`json`）
- 【插件`plugins`】：执行范围更广的任务，从打包到优化都可以实现
- 【模式`model`】：有生产模式`production`和开发模式`development`


### 对loader的理解

- `webpack`本身只能处理`js/json`模块，如果要加载其他类型的文件（模块），就需要使用对应的`loader`。
- 它本身是一个函数，接收源文件作为参数，返回转换的结果。
- `loader`一般以`xxx-loader`的方式命名，`xxx`代表了这个`loader`要做的转换功能，比如`css-loader`
- `loader`对源文件进行预处理，生成浏览器可以执行的普通文件

> loader 有的是官方出的，有的是民间出的，所以有时会有版本冲突问题

常见的loader
- `url-loader`
  - 安装：`npm install url-loader -S` `npm install file-loader -S`
  - 背景：网站上有很多小图标，对于过去的处理方式，为了节省连接处（导致网站加载速度变慢），使用精灵图方式，合成一张图，使用起来不方便。此时可以使用将图片打包到js文件中的方式。
  - 用处：当图片文件大小，小于指定值时，会转化为DataURL（base64）形式。
eg:
```js
// webpack.config.js
const path = require('path');
module.exports = {
    entry: './src/js/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'output.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 211192
                        }
                    }
                ]
            }
        ]
    }
}
```

```js
//app.js
import img1 from '../img/img1.jpg'
import img2 from '../img/img2.png'
```

- `babel-loader`
  - 官网：https://www.webpackjs.com/loaders/babel-loader/#root
  - 安装：`npm install -D babel-loader @babel/core @babel/preset-env webpack`
  - 用处：将`ES6/ES7`的代码来转换成我们普通浏览器能运行的`ES5`的代码
eg:
```js
const path = require('path');
module.exports = {
    entry: './src/js/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'output.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 211192
                        }
                    }
                ]
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    }
                }
            }
        ]
    }
}
```

- `@babel/plugin-transform-react-jsx`
  - 官网：https://www.npmjs.com/package/@babel/plugin-transform-react-jsx
  - 安装：`npm install --save-dev @babel/plugin-transform-react-jsx`
  - 用处：支持react的jsx语法，通常和`react-dom`一起使用，安装`npm install --save-dev react-dom`
eg:
```js
const path = require('path');
module.exports = {
    entry: './src/js/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'output.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 211192
                        }
                    }
                ]
            },
            {
                test: /\.(m?js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-react-jsx']
                    }
                }
            }
        ]
    }
}


```




- `sass-loader`
  - 官网：https://www.webpackjs.com/loaders/sass-loader/
  - 安装：`npm install sass-loader node-sass -D` `npm install css-loader style-loader`
  - 用处：`scss/sass`文件都可以通过`sass-loader`进行处理

eg:

入口文件app.js中引入样式文件
```js
import '../css/test.scss'
```

test.scss
```scss
$color:#fff;

body{
    background-color: $color;
}
```


```js
// webpack.config.js
const path = require('path');
module.exports = {
    entry: './src/js/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'output.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 211192
                        }
                    }
                ]
            },
            {
                test: /\.(m?js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-react-jsx']
                    }
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // 将 JS 字符串生成为 style 节点
                    'style-loader',
                    // 将 CSS 转化成 CommonJS 模块
                    'css-loader',
                    // 将 Sass 编译成 CSS
                    'sass-loader',
                ],
            },
        ]
    }
}
```



### 对plugins的理解
- 官网：https://www.webpackjs.com/concepts/plugins/
- 插件可以完成一些`loader`不能完成的功能
- `Webpack` 提供很多开箱即用的 插件（https://www.webpackjs.com/plugins/）。


重要的plugin
- (1)`MiniCssExtractPlugin`
    - 官网:https://www.webpackjs.com/plugins/mini-css-extract-plugin
    - 作用：本插件会将 CSS 提取到单独的文件中，为每个包含 CSS 的 JS 文件创建一个 CSS 文件，并且支持 CSS 和 SourceMaps 的按需加载。

eg:
```js
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: './src/js/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'output.bundle.js'
    },
    plugins: [new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
    })],
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 211192
                        }
                    }
                ]
            },
            {
                test: /\.(m?js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-react-jsx']
                    }
                }
            },
            // {
            //     test: /\.s[ac]ss$/i,
            //     use: [
            //         // 将 JS 字符串生成为 style 节点
            //         'style-loader',
            //         // 将 CSS 转化成 CommonJS 模块
            //         'css-loader',
            //         // 将 Sass 编译成 CSS
            //         'sass-loader',
            //     ],
            // },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // process.env.NODE_ENV !== 'production'?'style-loader':MiniCssExtractPlugin.loader
                    MiniCssExtractPlugin.loader,
                    // 将 CSS 转化成 CommonJS 模块
                    'css-loader',
                    // 将 Sass 编译成 CSS
                    'sass-loader',
                ],
            },
        ]
    }
}
```


- (2)`DefinePlugin`
    - 官网：https://www.webpackjs.com/plugins/define-plugin#root
    - 作用：DefinePlugin 允许在 编译时 将你代码中的变量替换为其他值或表达式。这在需要根据开发模式与生产模式进行不同的操作时，非常有用。

eg:
```js
 new webpack.DefinePlugin({
    SERVICE_URL: JSON.stringify('https://dev.example.com'),
 })
```

在DefinePlugin中定义的变量，其他文件可直接使用该变量，如SERVICE_URL

eg:
```js
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack')

module.exports = {
    entry: './src/js/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'output.bundle.js'
    },
    // mode:'development'
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new webpack.DefinePlugin({
            SERVICE_URL: JSON.stringify('https://dev.example.com'),
        })
    ],
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 211192
                        }
                    }
                ]
            },
            {
                test: /\.(m?js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'], // 规则
                        plugins: ['@babel/plugin-transform-react-jsx']
                    }
                }
            },
            // {
            //     test: /\.s[ac]ss$/i,
            //     use: [
            //         // 将 JS 字符串生成为 style 节点
            //         'style-loader',
            //         // 将 CSS 转化成 CommonJS 模块
            //         'css-loader',
            //         // 将 Sass 编译成 CSS
            //         'sass-loader',
            //     ],
            // },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // process.env.NODE_ENV !== 'production'?'style-loader':MiniCssExtractPlugin.loader
                    MiniCssExtractPlugin.loader,
                    // 将 CSS 转化成 CommonJS 模块
                    'css-loader',
                    // 将 Sass 编译成 CSS
                    'sass-loader',
                ],
            },
        ]
    }
}
```


- (3)`HtmlWebpackPlugin`
    - 官网：https://www.webpackjs.com/plugins/html-webpack-plugin/#root
    - 作用：由于js文件不能在独立运行，所以使用`HtmlWebpackPlugin`帮我们生成html文件。HtmlWebpackPlugin 简化了 HTML 文件的创建，以便为你的 webpack 包提供服务。

eg:使用配置
```js
 // new HtmlWebpackPlugin()
    new HtmlWebpackPlugin({
        title: 'Good Morning Dalian',
        filename: 'index.html', // 输出文件
        template: 'template.html'// 输入文件
    })
```

```js
 // new HtmlWebpackPlugin()
    new HtmlWebpackPlugin({
        title: 'Good Morning Dalian',
        filename: './ass/index.html', // 输出文件
        template: 'template.html'// 输入文件
    })
```

eg:完整文件
```js
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/js/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'output.bundle.js'
    },
    // mode:'development'
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new webpack.DefinePlugin({
            SERVICE_URL: JSON.stringify('https://dev.example.com'),
        }),
        // new HtmlWebpackPlugin()
        new HtmlWebpackPlugin({
            title: 'Good Morning Dalian',
            filename: 'index.html', // 输出文件
            template: 'template.html'// 输入文件
        })
    ],
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 211192
                        }
                    }
                ]
            },
            {
                test: /\.(m?js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'], // 规则
                        plugins: ['@babel/plugin-transform-react-jsx']
                    }
                }
            },
            // {
            //     test: /\.s[ac]ss$/i,
            //     use: [
            //         // 将 JS 字符串生成为 style 节点
            //         'style-loader',
            //         // 将 CSS 转化成 CommonJS 模块
            //         'css-loader',
            //         // 将 Sass 编译成 CSS
            //         'sass-loader',
            //     ],
            // },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // process.env.NODE_ENV !== 'production'?'style-loader':MiniCssExtractPlugin.loader
                    MiniCssExtractPlugin.loader,
                    // 将 CSS 转化成 CommonJS 模块
                    'css-loader',
                    // 将 Sass 编译成 CSS
                    'sass-loader',
                ],
            },
        ]
    }
}
```


- (4)`DevServer`
    - 官网：https://www.webpackjs.com/configuration/dev-server/#root
    - 作用：webpack-dev-server 可用于快速开发应用程序。即热替换/热更新。

eg:
```js
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,// 是否压缩
        port: 9000,
        // hot: true
    },
```

eg:完整文件
```js
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/js/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'output.bundle.js'
    },
    devServer: {
        // static: {
        //     directory: path.join(__dirname, 'dist'), // 要同output的path
        // },
        contentBase: path.join(__dirname, "dist"),
        compress: true,// 是否压缩
        port: 9000,
        // hot: true
    },
    // mode:'development'
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new webpack.DefinePlugin({
            SERVICE_URL: JSON.stringify('https://dev.example.com'),
        }),
        // new HtmlWebpackPlugin()
        new HtmlWebpackPlugin({
            title: 'Good Morning Dalian',
            filename: 'index.html', // 输出文件
            template: 'template.html'// 输入文件
        })
    ],
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 211192
                        }
                    }
                ]
            },
            {
                test: /\.(m?js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'], // 规则
                        plugins: ['@babel/plugin-transform-react-jsx']
                    }
                }
            },
            // {
            //     test: /\.s[ac]ss$/i,
            //     use: [
            //         // 将 JS 字符串生成为 style 节点
            //         'style-loader',
            //         // 将 CSS 转化成 CommonJS 模块
            //         'css-loader',
            //         // 将 Sass 编译成 CSS
            //         'sass-loader',
            //     ],
            // },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // process.env.NODE_ENV !== 'production'?'style-loader':MiniCssExtractPlugin.loader
                    MiniCssExtractPlugin.loader,
                    // 将 CSS 转化成 CommonJS 模块
                    'css-loader',
                    // 将 Sass 编译成 CSS
                    'sass-loader',
                ],
            },
        ]
    }
}
```


### 配置文件 
`webpack.config.js`用于存储webpack配置信息


单个入口文件
```js
const path = require('path');
module.exports={
  entry:'./input.js',
  output:{
    path:path.resolve(__dirname,'dist'),
    filename:'output.bundle.js'
  }
}
```

多个入口文件
```js
const path = require('path');
module.exports={
  entry:{
    home:'./home.js',
    about:'./about.js',
    other:'./other.js'
  },
  output:{
    path:path.resolve(__dirname,'dist'),
    filename:'[name].bundle.js'
  },
}
```

模式不必在命令行里面写，可以写在配置文件中
```js
const path = require('path');
module.exports={
  entry:{
    home:'./home.js',
    about:'./about.js',
    other:'./other.js'
  },
  output:{
    path:path.resolve(__dirname,'dist'),
    filename:'[name].bundle.js'
  },
  mode:"development"
}
```



> babel将ES6语法转为ES5语法，ES6模块化转为Commonjs（但是，Promise babel不支持）,但是浏览器还不支持，所以还需借助Browserify翻译。Browserify 能翻译CommonJs代码，在浏览器上运行。
>
> 现在有了webpack，webpack仅仅将ES6模块化转为浏览器认识的语法，其他ES6语法没有转。


### webpack4新特性
#### mode属性
`webpack`需要设置`mode`属性，可以是`development`或`production`。例如：`webpack --mode development`


`webpack`针对开发者模式提供的特性：
- 浏览器调试工具
- 注释、开发阶段的详细错误日志和提示
- 快速和优化的增量构建机制

`webpack`针对生产模式提供的特性：
- 开启所有的优化代码
- 更小的`bundle`大小
- 去除掉只在开发阶段运行的代码
- `Scope hosting`和`Tree-shaking`


#### 插件和优化
webpack4删除了`CommonsChunkPlugin`插件，它使用内置API `optimization.splitChunks`和`optimization.runtimeChunk`,这意味着`webpack`会默认为你生成共享的代码块。

其他插件的变化
- `NoEmitOnErrorsPlugin`废弃 --> 使用`optimization.noEmitOnErrors`替代
- `ModuleConcatenationPlugin`废弃 --> 使用`optimization.concatenateModules`替代
- `NamedModulesPlugin`废弃 --> 使用`optimization.namedModules`替代
- `uglifyjs-webpack-plugin`升级到了`v1.0`版本 --- 加密丑化js代码的



#### 开箱即用WebAssembly

`WebAssembly(wasm)`会带来运行时性能的大幅度提升，由于在社区的热度，`webpack4`对它做了开箱即用的支持。你可以直接对本地的`wasm`模块进行`import`或者`export`操作，也可以通过编写`loaders`来直接`import C++`、`C`或者`Rust`。

`WebAssembly(wasm)`可以认为是js性能方面的一个补充

#### 支持多种模块类型

共5种
- `javascript/auto`:在`webpack3`里，默认开启对所有模块系统的支持，包括`CommonJS`、`AMD`、`ESM（ES6模块化）`。
- `javascript/esm`:只支持WSM这种静态模块。
- `javascript/dynamic`:只支持`CommonJS`和`AMD`这种动态模块。
- `json`:只支持`JSON`数据，可以通过`require`和`import`来使用。
- `webassembly/experimental`:只支持`wasm`模块，目前处于试验阶段。 


#### 0CJS

0CJS的含义是0配置，`webpack4`受`Parcel`打包工具启发，尽肯能的让开发中运行项目成本变低。为了做到0配置，`webpack4`不再强制需要`webpack.config.js`作为打包的入口配置文件了，它默认的入口为`./src/`和默认出口`./dist`,对于小项目而言是福音。


#### 新的插件系统
`webpack4`对插件系统进行了不少修改，提供了针对插件和钩子的新API。变化如下：
- 所有的`hook`由`hooks`对象统一管理，它将所有的`hook`作为可扩展的类属性。
- 当添加插件时，必须提供一个插件名称。
- 开发插件时，可以选择`sync/callback/promise`作为插件类型。
- 可以通过`this.hooks = { myHooks:new SyncHook(...)}`来注册`hook`了。


> 注意点：当使用webpack4时，确保使用Node.js的版本>=8.9.4。因为webpack4使用了很多JS新语法，它们在新版本的v8里经过了优化。




## 开启项目

### 项目准备

- 初始化项目
    - 使用`npm init`或`yarn init`生成一个`package.json`文件
- 安装webpack
    - `npm install webpack@4 webpack-cli@3 -g`  全局安装，作为指令使用
    - `npm install webpack@4 webpack-cli@3 -D ` 当前项目下安装，作为本地依赖使用

> webpack与webpack-cli版本对应
> webpack1  此时无webpack-cli
> webpack2  webpack-cli1
> webpack3  webpack-cli2
> webpack4  webpack-cli3
> webpack5  webpack-cli4

- 检验webpack是否安装成功
    - 全局安装后，通过`webpack -v`检测
    - 当前项目下安装后，通过`./node_modules/.bin/webpack -v`检测

> 一般不要去安装全局，因为不是所有项目 webpack 都是一个版本，要是启动两个以上的项目的话由于版本不一样肯定会遇到项目无法启动的问题，所以还是在本项目中去安装比较好。
> 删除全局安装的 webpack 命令如下：`npm uninstall webpack webpack-cli -g`


注意：`--save`、`--save-dev`、`-S`、`-D`的区别
- `--save`等同于`-S` ,安装包信息将加入到`dependencies`（生产阶段的依赖,也就是项目运行时的依赖，就是程序上线后仍然需要依赖）
- `--save-dev` 等同于`-D`,安装包信息将加入到`devDependencies`（开发阶段的依赖，就是我们在开发过程中需要的依赖，只在开发阶段起作用）



### 具体项目
- 创建主页面
  - `src/index.html`
- 在全局安装webpack模式下的打包命令（开发）
  - `webpack ./src/js/app.js -o ./build/js/app.js --mode=development`
  - 功能：webpack能够打包js和json文件，并且能将ES6的模块语法转换成浏览器能识别的语法
-  在全局安装webpack模式下的打包命令（生产）
  - `webpack ./src/js/app.js -o ./build/js/app.js --mode=production`
  - 功能：在开发配置功能上加上了一个压缩代码的功能
- `index.html`页面中引入：`build/js/app.js`
- 结论
  - `webpack`能偶编译打包`js`和`json`文件
  - 能将`ES6`的模块化语法转换成浏览器能够识别的语法
  - 能压缩代码
- 缺点
  - 不能编译打包`css、img`等文件。
  - 不能将js的ES6基本语法转化为ES5以下语法，所以需要使用`loader`
- 改善：使用`webpack`配置文件解决，自定义功能




>webpack ./src/js/app.js -o ./build/js/app.js
>必须写mode,不然有警告
>webpack ./src/js/app.js -o ./build/js/app.js --mode=development
> mode是webpack4提供的模式，之前都是单独用loader处理


- `app.js`是`webpack`的入口，所有文件（`js、json、css、less`等）都需要在这里引入使用



在ES6模块化规范中，如果引入的是json文件，ES6模块化会自动做默认暴露。
eg:
```js
import jsonDada from '../json/test.json'
```


在ES6模块化规范中,引入CSS的写法
eg:
```js
import '../css/demo.css'
```



### package.json参考
```json
{
  "name": "demo1",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack-dev-server",
    "build": "webpack --mode production",
    "build:dev": "webpack --mode development"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "file-loader": "^6.2.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "url-loader": "^4.1.1",
    "webpack-cli": "^3.3.12"
  },
  "devDependencies": {
    "@babel/core": "^7.21.8",
    "@babel/plugin-transform-react-jsx": "^7.21.5",
    "@babel/preset-env": "^7.21.5",
    "babel-loader": "^8.3.0",
    "css-loader": "^0.28.11",
    "html-webpack-plugin": "^4.5.0",
    "less-loader": "^11.1.2",
    "mini-css-extract-plugin": "^0.9.0",
    "node-sass": "^4.9.4",
    "sass-loader": "^7.1.0",
    "style-loader": "^0.20.3",
    "webpack": "^4.29.0",
    "webpack-dev-server": "3.11.0"
  }
}
```


### 升级webpack架构思路
- 先升级webpack
- 其次升级webpack-dev-server@latest -D,因为webpack与webpack-dev-server几乎同步
- 再根据报错，升级对应的插件

css相关loader
- style-loader
- css-loader
- postcss-loader


> @latest 当前已发布的最新版本
> @next 还没有真正对外发布，但是已经开发完的版本
> eg:`npm install extract-text-webpack-plugin@latest -D`  `npm install extract-text-webpack-plugin@next -D`



> 在命令行执行脚本，会去path路径里面去找
> 在package.json中启动的时候，会去node_modules中去找