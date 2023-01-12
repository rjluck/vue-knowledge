# 路由

[[toc]]


## SPA

SPA（single page web application）单页面应用

- 单页面Web应用（single page web application）
- 整个应用只有一个完整的页面。
- 点击页面中的导航链接不会刷新页面，只会做页面的局部更新。
- 数据需要通过ajax请求获取。


## vue-router的理解
vue的一个插件库，专门用来实现SPA应用。



## 路由定义
- 路由 route
- 路由器 router
- 路由就是一组key-value的对应关系，多个路由需要经过路由器的管理。
- 路由分类
  - 后端路由
    - 1）理解：value是function，用于处理客户端提交的请求。
    - 2）工作过程：服务器接收到一个请求时，根据请求路径找到匹配的函数来处理请求，返回响应数据。
  - 前端路由
    - 1）理解：value是component，用于展示页面内容。
    - 2）工作过程：当浏览器的路径改变时，对应的组件就会显示。


## 基本使用
- 安装`npm i vue-router`（vue2使用vue-router3,vue3使用vue-router4）
- main.js中引入vue-router
- 引入vue-router之后，new Vue实例的时候可以传入router配置项
```js
// main.js
import Vue from 'vue'
import App from './App.vue'
// 引入
import VueRouter from 'vue-router'
// 使用插件`Vue.use()`
Vue.use(VueRouter)

// 引入路由器
import router from './router/index.js'

new Vue({
  el:"#app",
  render:h=>h(App),
  router:router
})
```
> 2022年7月以后，vue-router的默认版本也变为了4版本。


- 编写router配置项：
router/index.js（该文件专门用于创建整个应用的路由器）
```js
import VueRouter from 'vue-router'

// 引入组件
import About from '../components/About';
import Home from '../components/Home';

// 创建一个路由器实例
const router = new VueRouter({
  routes:[
    {
      path:'/about',
      component:About
    },
    {
      path:'/home',
      component:Home
    }
  ]
})

export default router;
```

- 实现切换（`active-class`可配置高亮样式）
```html
<!-- 原始html中我们使用a标签实现页面跳转 -->
<!-- <a href="./about.html">About</a>
<a href="./home.html">Home</a> -->

<!-- Vue中借助router-link标签实现路由的切换 -->
<!-- 路由模式 -->
<router-link to="/about" active-class="active">About</router-link>
<router-link to="/home" active-class="active">Home</router-link>


<!-- 指定组件的呈现位置，即展示路由对应的内容 -->
<router-view></router-view>
```

几个注意点
- 路由组件通常存放在`pages`文件夹，一般组件通常存放在`components`文件夹。
- 通过切换，“隐藏”了的路由组件，默认是被销毁的，需要的时候再去挂载。
- 每个组件都有自己的`$route`属性，里面存储着自己的路由信息。
- 整个应用只有一个`router`,可以通过组件的`$router`属性获取到。


## 嵌套路由
- 编写路由规则,使用`children`配置项：
router/index.js（该文件专门用于创建整个应用的路由器）
```js
import VueRouter from 'vue-router'

// 引入组件
import About from '../components/About';
import Home from '../components/Home';
import News from '../components/News';
import Message from '../components/Message';
// 创建一个路由器实例
const router = new VueRouter({
  routes:[
    {
      path:'/about',
      component:About
    },
    {
      path:'/home',
      component:Home,
      children:[ // 通过children配置子集路由
        {
          path:'news', // 此处一定不要写 /news
          component:News
        },
        {
          path:'message', // 此处一定不要写 /message
          component:Message
        },
      ]
    }
  ]
})

export default router;
```

- 跳转要写完整路径
```html
<!-- Vue中借助router-link标签实现路由的切换 -->
<!-- 路由模式 -->
<router-link to="/home/message" active-class="active">Message</router-link>
<router-link to="/home/news" active-class="active">News</router-link>


<!-- 指定组件的呈现位置，即展示路由对应的内容 -->
<router-view></router-view>
```

## 命名路由
- 作用：可以简化路由的跳转。
- 编写路由规则,使用`children`配置项：
router/index.js（该文件专门用于创建整个应用的路由器）
```js
import VueRouter from 'vue-router'

// 引入组件
import About from '../components/About';
import Home from '../components/Home';
import News from '../components/News';
import Message from '../components/Message';
// 创建一个路由器实例
const router = new VueRouter({
  routes:[
    {
      name:'guanyu', // 给路由命名
      path:'/about',
      component:About
    },
    {
      path:'/home',
      component:Home,
      children:[ // 通过children配置子集路由
        {
          path:'news', // 此处一定不要写 /news
          component:News
        },
        {
          name:'xinxi',
          path:'message', // 此处一定不要写 /message
          component:Message
        },
      ]
    }
  ]
})

export default router;
```

- 通过命名路由跳转
```html
<!-- Vue中借助router-link标签实现路由的切换 -->
<!-- 路由模式 -->
<router-link :to="{name:'xinxi'}" active-class="active">Message</router-link>
<router-link :to="{name:'guanyu'}" active-class="active">About</router-link>


<!-- 指定组件的呈现位置，即展示路由对应的内容 -->
<router-view></router-view>
```

## 路由传参

### query传参

- 传递参数
```html
<!-- 跳转路由并携带query参数，to的字符串写法 -->
<router-link :to="`/home/message/deail?id=${id}&title=${title}`" active-class="active">Message</router-link>


<!-- 跳转路由并携带query参数，to的对象写法 -->
<router-link 
  :to="{
    path:'/home/message/deail',
    query:{
      id:'',
      title:''
    }
  }" 
  active-class="active">
  Message
</router-link>
```
- 接收参数`this.$route.query`
```js
// detail组件中接收参数
export default{
  name:'Detail',
  mounted(){
    this.$route.query
  }
}
```


### params传参

- 配置路由，声明接收params参数。
```js
export default new VueRouter({
    routes:[
        {
            name:'guanyu',
            path:'/about',
            component:About
        },
        {
            path:'/home',
            component:Home,
            children:[
                {
                   path:'news',
                   component:News   
                },
                {
                   path:'message',
                   component:Message,   
                   children:[
                       {
                        name:'xiangqing',
                        path:'detail/:id/:title',
                        component:Detail 
                       },
                   ]
                }
            ]
        }
    ]
})
```

- 传递参数
```html
<!-- 跳转路由并携带params参数，to的字符串写法 -->
<router-link :to="`/home/message/detail/${m.id}/${m.title}`">{{m.title}}</router-link>


<!-- 跳转路由并携带params参数，to的对象写法 -->
<router-link :to="{
    name:'xiangqing',
    params:{
        id:m.id,
        title:m.title
    }
}">
    {{m.title}}
    </router-link>
```


- 接收参数
```js
    this.$route.params.id
    this.$route.params.title
```

> 特别注意：路由携带params参数时，若使用to的对象写法，即不能使用path配置项，必须使用name配置！





## 路由的props配置

- 作用：让路由组件更方便的收到参数。

```js
export default new VueRouter({
    routes:[
        {
            name:'guanyu',
            path:'/about',
            component:About
        },
        {
            path:'/home',
            component:Home,
            children:[
                {
                   path:'news',
                   component:News   
                },
                {
                   path:'message',
                   component:Message,   
                   children:[
                       {
                        name:'xiangqing',
                        // path:'detail/:id/:title',
                        path:'detail',
                        component:Detail,
                        // props的第一种写法,值为对象,该对象中的所有key-value都会以props的形式传给Detail组件
                        // props:{a:1,b:'hhh'},

                        // props的第二种写法,值为布尔值,若布尔值为真，就会把该路由组件接收到的所有params参数，以props的形式给Detail组件。
                        // props:true,

                        // props的第三种写法,值为函数
                        // props:function(){}
                        props($route){
                           return {id:$route.query.id,title:$route.query.title} 
                        }

                        // 解构赋值
                        // props({query}){
                        //    return {id:query.id,title:query.title} 
                        // }

                        // 解构赋值的连续写法
                        // props({query:{id,title}}){
                        //    return {id:id,title:title} 
                        // }
                       },
                   ]
                }
            ]
        }
    ]
})
```

                       
props的第一种写法,组件中以props的形式接收
```js
export default{
    props:['a','b']
}
```

props的第二/三种写法,组件中以props的形式接收
```js
export default{
    props:['id','title']
}
```


## router-link的replace属性

- 作用：控制路由跳转时操作浏览器历史记录的模式。
- 浏览器的历史记录有两种写入方式
  - `push`，追加历史记录，浏览器可以前进后退，路由跳转时候默认为`push`。
  - `replace`，替换当前记录，浏览器不可前进后退。
- 如何开启`replace`模式：
```html
<!-- 开启replace属性 -->
<router-link replace></router-link>
```






## 编程式路由导航

- 作用：不借助`<router-link>`实现路由跳转，让路由跳转更加灵活。
- $router的几个API：`push`、`replace`、`back`、`forward`、`go`。
路由跳转-push模式
```js
this.$router.push({
    name:'xiangqing',
    query:{
      id:''
    }
})
```

路由跳转-replace模式
```js
this.$router.replace({
    name:'xiangqing',
    query:{
      id:''
    }
})
```

路由回退
```js
this.$router.back()
```

路由前进
```js
this.$router.forward()
```

路由前进/后退
```js
this.$router.go(-2);// 后退2步
this.$router.go(3);// 前进3步
```




## 缓存路由组件

- 作用：让不展示的路由组件保持挂摘，不被销毁。

```html
<!-- 全部缓存 -->
<keep-alive>
    <router-view></router-view>
</keep-alive>
```

```html
<!-- 只缓存include中有的 -->
<!-- include所包含的名字，指的的组件名字 name:'News' -->

<!-- 缓存一个路由组件 -->
<keep-alive include="News">
    <router-view></router-view>
</keep-alive>

<!-- 缓存多个路由组件 -->
<keep-alive :include="['News','Message']">
    <router-view></router-view>
</keep-alive>
```



## 路由组件的生命周期

路由组件所独有的两个钩子，用于捕获路由组件的激活状态。
- `activated` 路由组件被激活时触发。
- `deactivated` 路由组件失活时触发。

```js
export default{
    activated(){
        //组件被激活
    },
    deactivated(){
        //组件失活了
    }
}
```


## 路由守卫
- 作用：对路由进行权限控制。
- 分类：全局守卫、独享守卫、组件内守卫

### 全局路由守卫

- `beforeEach`
- `afterEach`
  
```js
const router =  new VueRouter({
    routes:[
        {
            name:'guanyu',
            path:'/about',
            component:About,
            meta:{
                isAuth:false,
                title:'关于'
            }
        },
        {
            path:'/home',
            component:Home,
            children:[
                {
                   path:'news',
                   component:News,
                   meta:{
                     isAuth:true,
                     title:'新闻'
                   } 
                },
                {
                   path:'message',
                   component:Message,   
                   children:[
                       {
                        name:'xiangqing',
                        // path:'detail/:id/:title',
                        path:'detail',
                        component:Detail,
                        props($route){
                           return {id:$route.query.id,title:$route.query.title} 
                        }
                       },
                   ]
                }
            ]
        }
    ]
})


// 增加路由守卫

// 全局前置路由守卫：初始化的时候被调用、每次路由切换前被调用
router.beforeEach((to,from,next)=>{
    // if(to.path ==='/home/news' || to.path === '/home/message'){
    if(to.meta.isAuth){
        if(localStorage.getItem('school') === 'ccc'){
            next()
        }else{
            console.log('学习名不对，无权查看')
        }
    }else{
        next();// 放行
    }    
})


// 全局后置路由守卫：初始化的时候被调用、每次路由切换后被调用
router.afterEach((to,from)=>{
    document.title = to.meta.title || '系统'
})

export default router;
```


### 独享路由守卫

- `beforeEnter`

> 注意：独享路由守卫只有beforeEnter,没有afterEnter
```js
const router =  new VueRouter({
    routes:[
        {
            name:'guanyu',
            path:'/about',
            component:About,
            meta:{
                isAuth:false,
                title:'关于'
            }
        },
        {
            path:'/home',
            component:Home,
            children:[
                {
                   path:'news',
                   component:News,
                   meta:{
                     isAuth:true,
                     title:'新闻'
                   },
                   beforeEnter:(to,from,next)=>{
                      if(to.meta.isAuth){
                          if(localStorage.getItem('school') === 'ccc'){
                             next()
                            }else{
                                console.log('学习名不对，无权查看')
                            }
                      }else{
                          next();// 放行
                      }  
                   }
                },
                {
                   path:'message',
                   component:Message,   
                   children:[
                       {
                        name:'xiangqing',
                        // path:'detail/:id/:title',
                        path:'detail',
                        component:Detail,
                        props($route){
                           return {id:$route.query.id,title:$route.query.title} 
                        }
                       },
                   ]
                }
            ]
        }
    ]
})

// 全局后置路由守卫：初始化的时候被调用、每次路由切换后被调用
router.afterEach((to,from)=>{
    document.title = to.meta.title || '系统'
})

export default router;
```


### 组件内路由守卫

- `beforeRouteEnter` 通过路由规则，进入该组件时被调用。
- `beforeRouteLeave` 通过路由规则，离开该组件时被调用。

```js
export default {
    name:'About',
    mounted(){
        //
    },
    beforeRouteEnter(to,from,next){
        if(to.meta.isAuth){
            if(localStorage.getItem('school') === 'ccc'){
               next()
              }else{
                  console.log('学习名不对，无权查看')
              }
          }else{
              next();// 放行
          }  
    },
    beforeRouteLeave(to,from,next){
        //
        next()
    }
}
```









## 路由器的两种工作模式

- 对于一个url来说，什么是hash值？答：`#`及其后面的内容就是hash值。
- hash值不会包含在HTTP请求中，即：hash值不会带给服务器。

### hash模式
- 地址中永远带着`#`号，不美观。
- 若以后将地址通过第三方手机`app`分享，若`app`校验严格，则地址会被标记为不合法。
- 兼容性较好。
  
### history模式
- 地址干净，美观。
- 兼容性和`hash`模式相比略差。
- 应用部署上线时需要后端人员支持，解决刷新页面服务器404的问题。

```js
const router =  new VueRouter({
    mode:'history',// 路由模式
    routes:[
        {
            name:'guanyu',
            path:'/about',
            component:About,
            meta:{
                isAuth:false,
                title:'关于'
            }
        },
        {
            path:'/home',
            component:Home,
            children:[
                {
                   path:'news',
                   component:News,
                   meta:{
                     isAuth:true,
                     title:'新闻'
                   },
                   beforeEnter:(to,from,next)=>{
                      if(to.meta.isAuth){
                          if(localStorage.getItem('school') === 'ccc'){
                             next()
                            }else{
                                console.log('学习名不对，无权查看')
                            }
                      }else{
                          next();// 放行
                      }  
                   }
                },
                {
                   path:'message',
                   component:Message,   
                   children:[
                       {
                        name:'xiangqing',
                        // path:'detail/:id/:title',
                        path:'detail',
                        component:Detail,
                        props($route){
                           return {id:$route.query.id,title:$route.query.title} 
                        }
                       },
                   ]
                }
            ]
        }
    ]
})

// 全局后置路由守卫：初始化的时候被调用、每次路由切换后被调用
router.afterEach((to,from)=>{
    document.title = to.meta.title || '系统'
})

export default router;
```






## node-express

- `npm init`
- `npm i express`
- 编写`server.js`
```js
// 微型服务器
const express = require('express');
const app = express();

// 访问静态文件
app.use(express.static(__dirname+'/static'))

app.get('/person',(req,res)=>{
    // 函数体
    res.send({
        name:'tom',
        age:18
    })
});

app.listen(5005,(err)=>{
    if(!err) console.log('服务器启动成功了！')
})
```
- 启动服务器`node server.js`
- 浏览器访问`localhost:5005/person`
- 新建文件夹`static`，将静态文件放到该文件夹下
- 重新启动服务器，即可访问静态资源`localhost:5005/index.html`
  
`npm i connect-history-api-fallback`
  nodejs中解决刷新404问题

```js
// 微型服务器
const express = require('express');
const history = require('connect-history-api-fallback');

const app = express();

app.use(history);// 应用中间件
// 访问静态文件
app.use(express.static(__dirname+'/static'))

app.get('/person',(req,res)=>{
    // 函数体
    res.send({
        name:'tom',
        age:18
    })
});

app.listen(5005,(err)=>{
    if(!err) console.log('服务器启动成功了！')
})
```


## Vue UI组件库

### 移动端常用UI组件库

- `Vant` https://youzan.github.io/vant
- `Cube UI` https://didi.github.io.cube-ui
- `Mint UI` https://mint-ui.github.io
- `Nut UI` 京东的

### PC端常用UI组件库

- `Element UI` https://element.eleme.cn
- `IView UI` https://www.iviewui.com
- `Ant Design Vue`  https://2x.antdv.com/