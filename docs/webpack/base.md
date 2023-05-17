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


