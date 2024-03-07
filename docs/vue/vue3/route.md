# 路由

[[toc]]

## 概念


### 对路由的理解
SPA（single page web application）  单页面应用，即只有一个`.html`文件

- 路由（route）就是一组`key-value`的对应关系
- 多个路由，需要经过路由器（router）的管理
- Vue3中要使用`vue-router`的最新版本，目前是4版本
  
安装路由
```
yarn add vue-router
```
### 基本切换效果
路由配置文件代码如下：

router/index.ts
```ts
// 第一步：引入createRouter
import { createRouter, createWebHistory } from "vue-router";
// 引入一个个可能要呈现的组件
import Home from "@/components/Home.vue";
import News from "@/components/News.vue";
import About from "@/components/About.vue";

// 第二步：创建路由器
const router = createRouter({
    history: createWebHistory(), // 路由器的工作模式
    routes: [
        {
            path: '/home',
            component: Home
        },
        {
            path: '/news',
            component: News
        },
        {
            path: '/about',
            component: About
        }
    ]
})

// 第三步：交出去
export default router;
```

main.ts
```ts
// 引入 createApp 用于创建应用
import { createApp } from 'vue'

// 引入App根组件
import App from './App.vue'
// 引入路由器
import router from './router'

// 创建一个应用
const app = createApp(App)
// 使用路由器
app.use(router)
// 挂载整个应用到app容器中
app.mount('#app')
```

App.vue
```html

<template>
<div class="app">
   <h2 class="title">Vue测试</h2>
   <!-- 导航区 -->
   <div class="navigate">
    <!-- <a href="" class="active">首页</a>
    <a href="">新闻</a>
    <a href="">关于</a> -->
    <RouterLink to="/home" active-class="active">首页</RouterLink>
    <RouterLink to="/news" active-class="active">新闻</RouterLink>
    <RouterLink to="/about" active-class="active">关于</RouterLink>
   </div>
   <!-- 展示区 -->
   <div class="main-content">
        此处以后需要展示各种组件
        <RouterView></RouterView>
   </div>
</div>
</template>
<script lang="ts" setup name="App">
   import { RouterView,RouterLink } from 'vue-router'

</script>
<style>
.title{
    text-align: center;
    word-spacing: 5px;
    margin:30px 0;
    height:70px;
    line-height: 70px;
    background-color:pink;
    border-radius: 10px;
    box-shadow: 0 0 2px;
    font-size:30px;
}
.navigate{
    display: flex;
    justify-content: space-around;
    margin:0 100px;
}

.navigate a{
    display:block;
    text-align: center;
    width:90px;
    background-color:gray;
    text-decoration: none;
    color: white;
    font-size: 18px;
    letter-spacing: 5px;
}
.navigate a.active{
    background-color: #749677;
    color:#fff;
    font-weight:900;
    text-shadow:0 0 1px black;
    font-family:微软雅黑
}
.main-content{
    margin:0 auto;
    margin-top:30px;
    border-radius:10px;
    width:90%;
    height:400px;
    border:1px solid;
}
</style>
```

### 两个注意点
- 路由组件通常存放在`pages`或`views`文件夹，一般组件通常存放在`components`文件夹。
  - 路由组件：靠路由的规则渲染出来的
  - 一般组件：亲手写标签写出来的
- 通过点击导航，视觉效果上“消失”了的路由组件，默认是被卸载掉的，需要的时候再去挂载。



### to的两种写法

（1）to的字符串写法
```html
<router-link active-class="active" to="/home">主页</router-link>
```
（2）to的对象写法

(2.1) 非命名路由
```html
<router-link active-class="active" :to="{path:'/home'}">主页</router-link>
```

(2.2) 命名路由
```html
<router-link active-class="active"  to="{name:'xinwen'}">主页</router-link>
```

## 路由器的工作模式

> 大多数使用history模式
> 后台管理多数用hash
> tOC的多数用history

### history模式

- Vue2：`mode:'history'`
- Vue3：`history:createWebHistory()`
- React:`<BrowserRouter/>`

优点：`URL`更加美观，不带有`#`，更接近传统的网站`URL`。

缺点：后期项目上线，需要服务端配合处理路径问题，否则刷新会有404错误。

```js
const router = createRouter({
    history:createWebHistory(),  // history模式
})
```

注意：若是nginx服务器,需要配置try_files
```js
server{
    location / {
        try_files $uri $uri/ /index.html
    }
}
```

### hash模式

优点：兼容性更好，因为不需要服务器处理路径。

缺点：`URL`带有`#`不太美观，且在`SEO`优化方面相对较差。

```js
const router = createRouter({
    history:createWebHashHistory(), //hash模式
})
```

## 路由种类

### 命名路由

作用：可以简化路由跳转及传参

给路由规则命名：
```ts
// 创建一个路由器，并暴露出去

// 第一步：引入createRouter
import { createRouter, createWebHistory } from "vue-router";
// 引入一个个可能要呈现的组件
import Home from "@/pages/Home.vue";
import News from "@/pages/News.vue";
import About from "@/pages/About.vue";

// 第二步：创建路由器
const router = createRouter({
    history: createWebHistory(), // 路由器的工作模式
    routes: [
        {
            name: 'zhuye',
            path: '/home',
            component: Home
        },
        {
            name: 'xinwen',
            path: '/news',
            component: News
        },
        {
            name: 'guanyu',
            path: '/about',
            component: About
        }
    ]
})

// 第三步：交出去
export default router;
```

路由跳转可写成：
```html
<router-link active-class="active"  to="{name:'xinwen'}">主页</router-link>
```



### 嵌套路由

- 通过`children`设置子级

```js
// 第二步：创建路由器
const router = createRouter({
    history: createWebHistory(), // 路由器的工作模式
    routes: [
        {
            name: 'zhuye',
            path: '/home',
            component: Home
        },
        {
            name: 'xinwen',
            path: '/news',
            component: News,
            children: [
                {
                    path: 'detail', // 子级路由不需要写/
                    component: Detail,
                }
            ]
        },
        {
            name: 'guanyu',
            path: '/about',
            component: About
        }
    ]
})
```

News.vue
```html
<template>
  <div class="news">
    <ul>
      <li
        v-for="item in newsList"
        :key="item.id"
      >
        <router-link to="/news/detail">{{item.title}}</router-link>
      </li>
    </ul>
    <!-- 详情 -->
    <div class="news-content">
      <RouterView></RouterView>
    </div>
  </div>
</template>
<script setup lang="ts" name="News">
import { reactive } from 'vue';
import { RouterView } from 'vue-router';

const newsList = reactive([
  { id: 'asdf01', title: '很好的食物', content: '西蓝花' },
  { id: 'asdf02', title: '如何一夜暴富', content: '学习' },
  { id: 'asdf03', title: '好消息', content: '明天放假' },
  { id: 'asdf04', title: '震惊', content: '成功了' }
]);
</script>
<style scoped>
.news {
  display: inline-block;
}

.news-content {
  display: inline-block;
}
</style>
```


## 路由传参

### query

#### 传递参数

（1）写法1：to的字符串写法
```html
<router-link :to="`/news/detail?id=${item.id}&title=${item.title}&content=${item.content}`">{{item.title}}</router-link>
```


> vue模板中不能使用模板字符串问题:
> 只需在属性前面加`：`，然后将模板字符串放在`“”`中即可。

（2）写法2：to的对象写法
```html
<!-- 通过path跳转 -->
<router-link :to="{
  path:'/news/detail',
  query:{
    id:item.id,
    title:item.title,
    content:item.content,
  }
}">{{item.title}}</router-link>
```

```html
<!-- 通过name跳转 -->
<router-link :to="{
  name:'xiang',
  query:{
    id:item.id,
    title:item.title,
    content:item.content,
  }
}">{{item.title}}</router-link>
```

#### 接收参数
```html
<template>
  <ul class="news-list">
    <!-- <li>编号：{{route.query.id}}</li>
    <li>标题：{{route.query.title}}</li>
    <li>内容：{{route.query.content}}</li>-->

    <li>编号：{{query.id}}</li>
    <li>标题：{{query.title}}</li>
    <li>内容：{{query.content}}</li>
  </ul>
</template>
<script setup lang="ts" >
import { useRoute } from 'vue-router';
import { toRefs } from 'vue';
let route = useRoute();
console.log('route: ', route.query); // 参数就在这里
// 注意：从响应式身上直接解构属性，那个属性至此就失去响应式了，如下
// let { query} = route

// 所以，需要用到toRefs
let { query } = toRefs(route);
</script>
```

### params









