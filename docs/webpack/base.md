# 初始webpack

[[toc]]

## 什么是webpack

- `webpack`是一个模块打包器
- 在webpack中会将前端的所有资源文件（`js/json/css/img/less/...`）都作为模块处理
- 它将根据模块的依赖关系进行分析，生成对应的资源

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

> loader 有的是官方出的，有的是民间出的，所以有时会有版本冲突问题

### 对plugins的理解
- 插件可以完成一些loader不能完成的功能


### 配置文件 
`webpack.config.js`用于存储webpack配置信息



> babel将ES6语法转为ES5语法，ES6模块化转为Commonjs（但是，Promise babel不支持）,但是浏览器还不支持，所以还需借助Browserify翻译。Browserify 能翻译CommonJs代码，在浏览器上运行。
>
> 现在有了webpack，webpack仅仅将ES6模块化转为Commonjs，其他ES6语法没有转成ES5语法

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
  - 不能将js的ES6




>webpack ./src/js/app.js -o ./build/js/app.js
>必须写mode,不然有警告
>webpack ./src/js/app.js -o ./build/js/app.js --mode=development
> mode是webpack4提供的模式，之前都是单独用loader处理


- `app.js`是`webpack`的入口，所有文件（`js、json、css、less`等）都需要在这里引入使用



在ES6模块化规范中，如果引入的是json文件，ES6模块化会自动做默认暴露。