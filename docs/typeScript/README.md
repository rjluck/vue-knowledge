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