# 初识Vue

[[toc]]

## 版本说明

目前被大众所使用的有版本vue2和vue3

vue2经典版本：4年，70+更新

![image](/imgs/vue/development.png)

## 定义

一套用于`构建用户界面`的`渐进式`JavaScript框架。

- 构建用户界面：数据 => 界面
- 渐进式：Vue可以自底向上逐层的应用
  - 简单应用：只需一个轻量小巧的核心库（100k）
  - 复杂应用：可以引入各式各样的的Vue插件
  
## 特点
- 采用`组件化`模式，提高代码复用率、且让代码更好维护。
- 声明式编码，让编码人员无需直接操作dom，提高开发效率。

![image](/imgs/vue/codeType.png)

- 使用虚拟DOM + 优秀的Diff算法，尽量复用DOM节点。
![image](/imgs/vue/diff1.png)
![image](/imgs/vue/diff2.png)
![image](/imgs/vue/diff3.png)

## 学习vue之前需要掌握的JavaScript基础知识
- ES6语法规范
- ES6模块化
- 包管理器
- 原型、原型链
- 数组常用方法
- axios
- promise

## vue学习模块
- vue基础
- vue-cli
- vue-router
- vuex
- element-ui
- vue3


## 其他
- VSCode的Live Server插件说明
选中其打开页面，该插件就会在本机5500端口上开了一台内置的小服务器，并且把整个工程的所有文件作为这台服务器的根资源去使用