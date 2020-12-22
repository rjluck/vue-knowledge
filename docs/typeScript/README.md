#   TypeScript简介

[[toc]]

## 简介

TypeScript是微软推出的一门语言 

TypeScript是JavaScript的一个超集，主要提供了**类型系统**和**对ES6的支持**，它由Microsoft开发，代码开源于GitHub上。

其包含ES567，新增了类型系统和完整的面向对象

- 编译型的语言
- 强类型的语言
- 真正面向对象的语言

typescript  就是比 javascript  更 java的script

#### 为何选择TypeScript
- TypeScript增加了代码的可读性和可维护性
- TypeScript非常包容
- TypeScript拥有活跃的社区


## 安装

命令行运行如下命令，全局安装 TypeScript：

```bash
npm install -g typescript
```

安装完成后，在控制台运行如下命令，检查安装是否成功(3.x)：

```bash
tsc -V 
```

## 使用

定义hello.ts文件
```
function sayHello(person: string) {
    return 'Hello, ' + person;
}

let user = 'Tom';
console.log(sayHello(user));
```
编译文件 tsc hello.ts

这时候会生成一个编译好的文件 hello.js：
```
function sayHello(person) {
    return 'Hello, ' + person;
}
var user = 'Tom';
console.log(sayHello(user));
```

> 约定文件以.ts为后缀，编写react时，以.tsx为后缀

> 主流IDE中都支持TS，包括代码不全、接口提示、跳转定义、重构

> typescript作用：负责将ts代码转为浏览器、nodejs识别的js代码

#### 推荐一个工具：ts-node

作用：自动帮助我们将ts代码转换为js代码，并将其在nodejs中执行

安装：
```bash
npm install -g ts-node
```

使用：
```bash
ts-node ts文件名
```

## 搭建开发环境

- 使用npm初始化项目

自己编辑参数
```
npm init
```


npm默认参数
```
npm init -y
```


- 全局安装部分依赖
  
```
npm install typescript tslint -g
```
- 使用tsc初始化配置

```
tsc --init
```

- 配置webpack

webpack4 亮点：很多东西不需要配置
```
npm install webpack webpack-cli webpack-dev-server -D


```


补充

- "start": "ww" //start指令不同于其他，不需要npm run 指令，直接npm start 即可
- "start": "cross-env NODE_ENV=develoption webpack-dev-server --config ./build/webpack.config.js"
- "start": "cross-env NODE_ENV=develoption webpack serve --open Chrome.exe --config ./build/webpack.config.js"
- 添加开发和打包命令

webpack打包编译typescript的
```
npm install ts-loader -D
```

通过js在平台设置不同的环境变量的工具,方便传参
```
npm install cross-env -D
```

清理指定的文件夹
```
npm install clear-webpack-plugin -D
```

指定编译模板html文件
```
npm install html-webpack-plugin -D
```

"webpack": "^4.29.6",
"webpack-cli": "^3.2.3",
"webpack-dev-server": "^3.2.1"