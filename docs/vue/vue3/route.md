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


#### 传递参数

（1）写法1：to的字符串写法
```html
<router-link :to="`/news/detail/${item.id}/${item.title}/${item.content}`">{{item.title}}</router-link>
```

（2）写法2：to的对象写法

```html
<!-- 通过name跳转 -->
<router-link :to="{
  name:'xiang',
  params:{
    id:item.id,
    title:item.title,
    content:item.content,
  }
}">{{item.title}}</router-link>
```

> 注意：
> - 传递params参数时，若使用to的对象写法，必须使用name配置项，不能用path。
> - 传递params参数时，需要提前在路由规则中定位。
> - 传递params参数时， 不能传属性值为数组的数据

如下就会报错
```html
<router-link :to="{
  name:'xiang',
  params:{
        list:[1,2,3]
  }
}">{{item.title}}</router-link>
```

index.ts  路由占位
```ts
// 创建一个路由器，并暴露出去

// 第一步：引入createRouter
import { createRouter, createWebHistory } from "vue-router";
// 引入一个个可能要呈现的组件
import Home from "@/pages/Home.vue";
import News from "@/pages/News.vue";
import About from "@/pages/About.vue";
import Detail from "@/pages/Detail.vue";

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
                    name: 'xiang',
                    path: 'detail/:id/:title/:content', // 子级路由不需要写/,params传参必须在此处占位
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

// 第三步：交出去
export default router;
```

当参数可传可不传的时候，占位时在参数后面加`?`即可
```js
 path: 'detail/:id/:title?/:content?', // params传参必须在此处占位
```


#### 接收参数
```html
<template>
  <ul class="news-list">
    <!-- <li>编号：{{route.params.id}}</li>
    <li>标题：{{route.params.title}}</li>
    <li>内容：{{route.params.content}}</li>-->

    <li>编号：{{params.id}}</li>
    <li>标题：{{params.title}}</li>
    <li>内容：{{params.content}}</li>
  </ul>
</template>
<script setup lang="ts" >
import { useRoute } from 'vue-router';
import { toRefs } from 'vue';
let route = useRoute();
console.log('route: ', route.params);
// 注意：从响应式身上直接解构属性，那个属性至此就失去响应式了，如下
// let { params} = route

// 所以，需要用到toRefs
let { params } = toRefs(route);
</script>
```


## 路由的props配置

作用：让路由组件更方便的收到参数（可以将路由参数作为`props`传给组件）

### 布尔值写法
```js
        {
            name: 'xinwen',
            path: '/news',
            component: News,
            children: [
                {
                    name: 'xiang',
                    path: 'detail/:id/:title/:content?', // 子级路由不需要写/,params传参必须在此处占位
                    component: Detail,
                    // 第一种写法：布尔值写法，将路由收到的所有params参数作为props传递给路由组件
                    props: true   // 只能和params打配合
                }
            ]
        },
```

### 函数写法
```js
        {
            name: 'xinwen',
            path: '/news',
            component: News,
            children: [
                {
                    name: 'xiang',
                    path: 'detail/:id/:title/:content?', // 子级路由不需要写/,params传参必须在此处占位
                    component: Detail,
                    // 第二种写法：函数写法，可以自己决定将什么作为props给路由组件
                    props(route) {
                        // return{
                        //     x:1
                        // }
                        return route.query
                    }
                }
            ]
        },
```


### 对象写法
```js
        {
            name: 'xinwen',
            path: '/news',
            component: News,
            children: [
                {
                    name: 'xiang',
                    path: 'detail/:id/:title/:content?', // 子级路由不需要写/,params传参必须在此处占位
                    component: Detail,
                    // 第三种写法：对象写法，可以自己决定将什么作为props给路由组件
                    // 用的比较少，因为是写死的
                    props:{
                        id:'100',
                        content:'内容'
                    }
                }
            ]
        },
```




注意：

- 不写props，相当于：
```
<Detail/>
```

- 写上props，相当于：
```
<Detail id=?? title=?? content=??/>
```


路由组件 Detail.vue 接收
```html
<template>
  <ul class="news-list">
    <li>编号：{{id}}</li>
    <li>标题：{{title}}</li>
    <li>内容：{{content}}</li>
  </ul>
</template>
<script setup lang="ts" >
defineProps(['id', 'title', 'content']);
</script>
<style scoped>
li {
  list-style: none;
}
</style>
```


## 路由的replace属性

- 作用：控制路由跳转时操作浏览器历史记录的模式。
- 浏览器的历史记录有两种写入方式：分别为`push`和`replace`
  - `push`是追加历史记录（默认值）
  - `replace`是替换当前记录
- 开启`replace`模式(只需要在`router-link`标签上写上属性`replace`)
```html
<RouterLink replace></RouterLink>
```



## 编程时导航

- 编程式路由导航：脱离`<RouterLink>`实现路由跳转
- 路由组件的两个重要的属性：`$route`和`$router`变成了两个`hooks`


> 编程式写法`push`或`replace`同`<RouterLink>`上的`to`属性写法一致

### 字符串写法
```ts
import {useRoute,useRouter} from 'vue-router'

const useRouter = useRouter()

// 编程式
useRouter.push('/news')
```


### 对象写法
```ts
import {useRoute,useRouter} from 'vue-router'

const useRouter = useRouter()

// 编程式
useRouter.push({
  name:'xiang',
  query:{
    id:'xxxx'
  }
})
```


## 重定向

一级路由规则最后加上
```ts
{
  path:'/',
  redirect:'/home'
}
```









