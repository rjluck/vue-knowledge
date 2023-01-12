
# 初识vue3

[[toc]]

## Vue3简介

- 2020年9月18日，Vue.js发布不3.0版本，代号：One Piece（海贼王）
- 耗时2年多，2600+次提交、30+个RFC(请求修改意见稿)、600+次PR(拉取请求)、99位贡献者
- github上的tag地址：https://github.com/vuejs/core/tree/v3.0.0


## Vue3带来了什么

### 性能的提升
- 打包大小减少41%
- 初次渲染快55%，更新渲染快133%
- 内存减少54%
- ......


### 源码的升级
- 使用`Proxy`代替`defineProperty`实现响应式
- 重写虚拟`DOM`的实现和`Tree-Shaking`
- ......


### 拥抱TypeScript
- Vue3可以更好的支持TypeScript



### 新的特性
- Composition API（组合API）
    - setup 配置
    - ref 与 reactive
    - watch 与 watchEffect
    - provide 与 inject
    - ......
- 新的内置组件
    - Fragment
    - Teleport
    - Suspense
- 其他改变
    - 新的生命周期钩子
    - data选项应始终被声明为一个函数
    - 移除keyCode支持作为v-on的修饰符,即移除写法`@key-up.13``
    - ......


## 创建Vue3工程

### 使用vue-cli创建

官方文档：https://cli.vuejs.org/guide/installation.html
```js
// 查看 @vue/cli 版本，确保@vue/cli版本在4.5.0以上
vue --version
// or
vue -V

// 安装或者升级你的 @vue-cli
npm install -g @vue-cli
// OR
yarn global upgrade --latest @vue/cli

// 创建
vue create hello-world

// 启动
cd hello-world
npm run serve
```

### 使用vite创建
官方文档：https://cn.vitejs.dev/guide/#scaffolding-your-first-vite-project

vite官网：https://vitejs.cn/

什么是vite?
- 新一代前端构建工具。（来挑战webpack了）
- 构建工具grunt->gulp->webpack

优势如下：
- 开发环境中，无需打包操作，可快速的冷启动。
- 轻量快速的热重载（HMR）。
- 真正的按需编译，不再等待整个应用编译完成。
  
传统构建与vite构建对比图


![image](/imgs/vue3/vite1.png)

```js
// 创建工程
npm create vite@latest

// 启动
npm install
npm run dev
```

### 分析vue-cli工程结构

入口文件src/main.js
```js
// 引入的不再是vue构造函数，引入的是一个名为createApp的工厂函数
// vue2写法 import Vue from 'vue'
import { createApp } from 'vue'
import App from './App.vue'

// vue2写法
// const vm = new Vue({
//   render:h => h(App)
// })
// vm..$mount('#app')
// 简写
// new Vue({
//   render:h => h(App)
// }).$mount('#app')



//创建应用实例对象-app(类似于之前Vue2中的vm,但是app比vm更轻)
const app = createApp(App)
app.mount('#app');//挂载
// 简写
// createApp(App).mount('#app')
```

src/App.vue
```vue
<template>
  <!-- Vue3组件中的模板结构可以没有根标签 -->
  <img alt="vue logo" src="./assets/logo.png"/>
  <HelloWorld msg="Welocome to your Vue.js App"/>
<template>
```

## 安装开发者工具

chrome网上商店