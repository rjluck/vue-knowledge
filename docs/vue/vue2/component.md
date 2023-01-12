# 组件

[[toc]]

## 定义

![image](/imgs/vue/component1.png)
![image](/imgs/vue/component2.png)

解决引入混乱的问题，所以出现了【js模块化】技术，但是只在js层面。
同样的思想，即出现了组件。

### 模块与组件

模块
- 理解：向外提供特定功能的js程序，一般就是一个js文件。
- 为什么出现：js文件很多很复杂。
- 作用：复用js、简化js的编写，提高js运行效率。

组件
- 理解：实现应用中局部功能代码（js/html/css）和资源（mp3、mp4、ttf、zip）的集合。
- 为什么出现：一个界面功能很复杂。
- 作用：复用编码，简化项目编码，提高运行效率


### 模块化与组件化

模块化
- 当应用中的js都以模块来编写的，那这个应用就是一个模块化应用。


组件化
- 当应用中的功能都是多组件的方式来编写的，那这个应用就是一个组件化应用。


## 非单文件组件

一个文件中包含有n个组件。


Vue中使用组件的三大步骤
- 定义组件（创建组件）
- 注册组件
- 使用组件（写组件标签）

如何定义一个组件
使用Vue.extend(options)创建，其中options和new Vue(options)时传入的那个options几乎一样，但区别如下：
- el不要写。因为最终所有的组件都要经过一个vm的管理器，由vm中的el决定服务哪个容器。
- data必须写成函数。因为避免组件被复用时，数据存在引用关系。

备注：使用template可以配置组件结构。


如何注册组件？
- 局部注册：靠new Vue的时候传入components选项
- 全局注册：靠Vue.component('组件名',组件)





```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8"/>
    <title></title>
    <!-- 引入vue -->
  </head>
  <body>
    <div id="root">
      <hello></hello>
      <hr/>
      <h1>{{h1}}</h1>
      <hr/>
      <xuexiao></xuexiao>
      <hr/>
      <xuesheng></xuesheng>
    </div>


    <div id="root2">
      <hello></hello>
    </div>
    <script type="text/javascript"> 

      // 第一步：创建school组件
      const school = Vue.extend({
        //  el:"#root", //组件定义时，一定不要写el配置项，因为最终所有的组件都要被一个vm管理，由vm决定服务于哪个容器。
        template:`
          <div>
            <h2>学校名称：{{schoolName}}</h2>
            <h2>学校地址：{{adress}}</h2>
          </div>
        `,
        data(){
          return{
            schoolName:'xxx',
            adress:'xxxxx',
          }
        }
      })

      // 第一步：创建student组件
      const student = Vue.extend({
          template:`
          <div>
            <h2>学生姓名：{{studentName}}</h2>
            <h2>学生年龄：{{age}}</h2>
          </div>
        `,
        data(){
          return{
            studentName:'cc',
            age:18
          }
        }
      })


      // 第一步：创建hello组件
      const hello = Vue.extend({
          template:`
          <div>
            <h2>你好啊！{{name}}</h2>
          </div>
        `,
        data(){
          return{
            name:'Tom',
          }
        }
      })


      // 第二步：注册组件(全局注册)
      Vue.component('hello',hello)

      // 创建vm
      const vm = new Vue({
        el:"#root", 
        //  第二步：注册组件（局部注册）
        components:{
          xuexiao:school,
          xuesheng:student
        },
        data:{
          msg:'你好'
        }
      })


      // 创建vm
      const vm = new Vue({
        el:"#root2", 
        data:{
          msg:'你好'
        }
      })
    </script>
  </body>
</html>
```





### 组件的注意点

关于组件名
- 一个单词组成
  - 第一种写法（首字母小写）：school
  - 第二种写法（首字母大写）：School
- 多个单词组成
  - 第一种写法（kebab-case命名）：my-school
  - 第二种写法（CamelCase命名）：MySchool（需要Vue脚手架支持）
- 备注
  - 组件名尽可能回避HTML中已有的元素名称。例如：h2、H2都不行。
  - 可以使用name配置的项指定组件在开发者工具中呈现的名字。


关于组件标签
- 第一种写法：`<school></school>`
- 第二种写法：`<school/>`
- 备注：不使用脚手架时，`<school/>`会导致后续组件不能渲染。

一个简写方式
`const school = Vue.extend(options)` 可简写为 `const school = options`


### 组件的嵌套



```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8"/>
    <title></title>
    <!-- 引入vue -->
  </head>
  <body>
    <div id="root">
      <school></school>
    </div>
    <script type="text/javascript"> 

      // 第一步：创建student组件
      const student = Vue.extend({
        name:'student',
        template:`
          <div>
            <h2>学生姓名：{{name}}</h2>
            <h2>学生年龄：{{age}}</h2>
          </div>
        `,
        data(){
          return{
            name:'cc',
            age:18
          }
        }
      })

      // 第一步：创建school组件
      const school = Vue.extend({
        name:'school',
        template:`
          <div>
            <h2>学校名称：{{schoolName}}</h2>
            <h2>学校地址：{{adress}}</h2>
            <student></student>
          </div>
        `,
        data(){
          return{
            schoolName:'xxx',
            adress:'xxxxx',
          }
        },
        components:{
          student
        }
      })




      // 第一步：创建hello组件
      const hello = Vue.extend({
          template:`
          <div>
            <h2>你好啊！{{name}}</h2>
          </div>
        `,
        data(){
          return{
            name:'Tom',
          }
        }
      })

      // 创建vm
      const vm = new Vue({
        el:"#root", 
        //  第二步：注册组件（局部注册）
        components:{
          school
        },
        data:{
          msg:'你好'
        }
      })

    </script>
  </body>
</html>
```


### VueComponent

- school组件本质是一个名为VueComponent的构造函数，且不是程序员定义的，是Vue.extend生成的。
- 我们只需要写`<school/>`或 `<school></school>`,Vue解析时会帮我们创建school组件的实例对象。即Vue帮我们执行的`new VueComponent(options)`。
- 特别注意：每次调用`Vue.extend`,返回的都是一个全新的`VueComponent`
- 关于this指向
  - 组件配置中：data函数、methods中的函数、watch中的函数、computed中的函数，他们的this均是【VueComponent实例对象】
  - `new Vue()`配置中：data函数、methods中的函数、watch中的函数、computed中的函数，他们的this均是【Vue实例对象】
- `VueComponent`的实例对象，以后简称`vc`（也可称之为组件实例对象）。
- `Vue`实例对象，以后简称`vm`。


### 一个重要的内置关系

- 内置关系：`VueComponent.prototype.__proto__ === Vue.prototype`
- 为什么要有这个关系：让组件实例对象(vc) 可以访问到Vue原型上的属性、方法。

![image](/imgs/vue/component3.png)

铺垫
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8"/>
    <title></title>
    <!-- 引入vue -->
  </head>
  <body>
    <div id="root">
    </div>
    <script type="text/javascript"> 

      // 定义一个构造函数
      function Demo(){
        this.a = 1;
        this.b = 2;
      }

      // 创建一个Demo的实例对象
      const d = new Demo();

      console.log(Demo.prototype);// 显示原型属性
      console.log(d.__proto__);//隐式原型属性

      // 以上两个均指向了 原型对象
      console.log(Demo.prototype === d.__proto__);// true

      // 通过显示原型属性操作 原型对象，追加一个x属性，值为99
      Demo.protorype.x =99; //这条线放东西

      console.log(d.__proto__.x);//99
      console.log(d.x);//99
    </script>
  </body>
</html>
```

验证
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8"/>
    <title></title>
    <!-- 引入vue -->
  </head>
  <body>
    <div id="root">
    </div>
    <script type="text/javascript"> 
      const school = Vue.extend({
        name:'school',
        template:`
          <div>
            <h2>学校名称：{{schoolName}}</h2>
            <h2>学校地址：{{adress}}</h2>
            <student></student>
          </div>
        `,
        data(){
          return{
            schoolName:'xxx',
            adress:'xxxxx',
          }
        },
        components:{
          student
        }
      })

      
      // 创建vm
      const vm = new Vue({
        el:"#root", 
        components:{
          school
        },
        data:{
          msg:'你好'
        }
      })

      console.log(school.prototype.__proto__ === Vue.prototype);// true
    </script>
  </body>
</html>
```


## 单文件组件

一个文件中只包含有一个组件。文件后缀为`.vue`。

```vue
// school.vue
<template>
  <!-- 组件的结构  -->
  <div>
    <h2>学校名称：{{schoolName}}</h2>
    <h2>学校地址：{{adress}}</h2>
  </div>
</template>

<script>
  // 组件交互的代码
  // export default Vue.extend({
  //   data(){
  //     return{
  //       schoolName:'xxx',
  //       adress:'xxxxx',
  //     }
  //   },
  // })

  // 省略Vue.extend写法
  export default{
    name:'School',
    data(){
      return{
        schoolName:'xxx',
        adress:'xxxxx',
      }
    },
  }
</script>

<style>
  /*组件的样式*/
</style>
```


ES6模块化
统一暴露 export     引入 import {sss} from sss
默认暴露 export default    引入 import xxx from xxxx  - vue中一般用这个

浏览器不能直接支持ES6模块化语法


## Vue脚手架

Vue CLI(command line interface)

- Vue脚手架是Vue官方提供的标准化开发工具（开发平台）。
- 官方文档：https://cli.vuejs.org/zh


备注

- 如出现下载缓慢请配置npm淘宝镜像`npm config set registry https://registry.npm.taobao.org`
  - `npm config set registry https://registry.npm.taobao.org`，切换国内镜像，使用淘宝镜像。
  - `npm config get registry`，查看当前镜像使用的地址，返回成功，则代表设置成功。
- Vue脚手架隐藏了所有`webpack`相关的配置，若想查看具体的`webpack`配置，请执行`vue inspect > output.js`。该命令作用就是将脚手架默认配置整理成js文件供查看

> babel作用：ES6转ES5的



### 分析脚手架结构

- `src/main.js`：该文件是整个项目的入口文件。
![image](/imgs/vue/cli1.png)
![image](/imgs/vue/cli2.png)
- `src/assets`:放静态资源
- `src/components`:放组件
- `public/index.html`:
![image](/imgs/vue/cli3.png)

### render函数
关于不同版本的Vue
- `vue.js`与`vue.runtime.xxx.js`的区别
  - `vue.js`是完整版的`vue`，包含：核心功能+模板解析器。
  - `vue.runtime.xxx.js`是运行版的vue,只包含：核心功能，没有模板解析器。
- 因为`vue.runtime.xxx.js`没有模板解析器，所以不能使用`template`配置项，需要使用render函数接收到的`createElement`函数去指定具体内容。

```js
new Vue({
  el:"#app",
  // render(createElement){
  //   console.log(typeof createElement);// function
  //   return createElement('h1','你好啊')
  // }

  // 以上简写
  // render:h=> h('h1','你好啊')
  render:h=> h(App)

  // template:`<h1>你好啊</h1>`,
  // components:{App}
})
```

> vue包主要包含：vue核心+模板解析器，其中模板解析器占vue.js的1/3的体积，所以出现精简版，以避免打包体积过大。
带有runtime的都是运行式vue，即不带模板打包器，精简一些代码。
![image](/imgs/vue/cli4.png)


> 标签类型的`<template></template>`,脚手架用了`vue-template-compiler`插件来解析。
`vue-template-compiler`专门用来解析.vue文件中的`<template></template>`


### 修改默认配置

新建一个vue.config.js文件，在其中增加配置。
```js
module.exports={
  lintOnSave:false,// 关闭语法检查
  pages:{
    index:{
      // 入口
      entry:'src/main.js'
    }
  }
}
```

为啥该文件用的是commonJs的`module.exports`暴露?
因为vue最终会把这个文件输送给webpack,进行合并，webpack基于的是Nodejs，而Nodejs采用的模块化是CommonJs

eslint
jslint
jshint

### ref属性

- 被用来给元素或子组件注册引用信息（id的替代者）。
- 应用在html标签上获取的是真实DOM元素，应用在组件标签上获取的是组件实例对象（vc）。
- 使用方式：
  - 打标识：`<h1 ref="ttt"></h1>` 或 `<School ref="com"/>`
  - 获取:`this.$refs.xxx`

```vue
<template>
  <!-- 组件的结构  -->
  <div>
    <h1 v-text="msg" id="title" ref="ttt"></h1>
    <button @click="showDOM">点我输出上方dom元素</button>

    <School ref="com"/>
  </div>
</template>

<script>
  import School from './components/School'
  export default{
    name:'App',
    components:{School}
    data(){
      return{
        msg:'xxx',
      }
    },
    methods:{
      showDOM(){
        // 原生获取方式
        console.log(document.getElementById('title'))

        // vue中获取方式
        console.log(this.$refs.ttt);// 获取的是真实DOM元素

        // refs用在组件上，获取的就是组件实例对象
        console.log(this.$refs.com)
      }
    }
  }
</script>

```

### props配置

- 功能：让组件接收外部传过来的数据。
- 传递数据
```html
<Demo name="xxx"/>
```
- 接收数据:
  - 方式1：简单声明接收
```js
props:['name','age','sex']
```
  - 方式2：接收的同时对数据进行类型限制
```js
props:{
  name:String,
  age:Number,
  sex:String
}
```
  - 方式3：接收的同时对数据进行类型限制+默认值的指定+必要性的限制
```js
props:{
  name:{
    type:String,
    require:true // 是否必传
  },
  age:{
    type:Number,
    default:99 // 默认值
  },
  sex:{
    type:String
    require:true // 是否必传
  }
}
```
- 备注：props是只读的，Vue底层会监测你对props的修改，如果进行了修改，就会发出警告。若业务需求确实需要修改，那么请复制props的内容到data中一份，然后去修改data中的数据。


### mixin混入

- 功能：可以把多个组件共用的配置提取成一个混入对象。
- 使用方式：
  - 第一步定义混合，例如：
  ```js
  {
    data(){...},
    methods:{...}
  }
  ```
  - 第二步使用混合，例如：
  ```js
  // 全局混入
  Vue.mixin(xxx)

  // 局部混入
  mixins:['xxx']
  ```
局部混合
```js
// mixin.js
export const hunhe = {
  methods:{
    show(){
      //
    }
  }
}
```

```js
import {hunhe} from '../mixin'

export default{
  name:'School',
  mixins:[hunhe],// 局部混合
  data(){
    return{
      name:'xxx'
    }
  }
}
```

全局混合
```js
// main.js
import {hunhe} from '../mixin'
Vue.mixin(hunhe)

new Vue({
  el:"#app",
  render:h=>h(App)
})
```


### 插件
- 功能：用于增强Vue。
- 本质：包含`install`方法的一个对象，`install`的第一个参数是Vue，第二个以后的参数是插件使用者传递的数据。
- 定义插件：
```js
// plugin.js
const obj={
  install(Vue,x,y){
    // 可以接收到第一个参数：Vue的构造函数
    // x  1
    // y  2

    // 定义过滤器
    Vue.filter('mySlice',function(){

    })

    //定义全局指令
    Vue.directive('fbind',{})

    // 定义混入
    Vue.mixin({})

    // 给Vue原型上添加一个方法
    Vue.prototype.hello = ()=>{console.log('444')}
  }
}

export default obj;
```

```js
// main.js

// 引入插件
import plugins from './plugin.js';

// 应用插件
Vue.use(plugins,1,2)

new Vue({
  el:"#app",
  render:h=>h(App)
})
```


### scoped样式

- 作用：让样式在局部生效，防止冲突。
- 写法：
```html
<style scoped lang="css">

</style>
```

![image](/imgs/vue/scoped1.png)


```html
<style scoped lang="less">

</style>
```
脚手架不支持`less`,所以需要安装`less-loader`，注意版本问题。`npm i less-loader`


查看某个包的所有版本
`npm view webpack versions`



## 组件的自定义事件

- 一种组件间通信的方式，适用于 子组件 ===> 父组件。
- 使用场景：A是父组件，B是子组件，B想给A传数据，那么就要在A中给B绑定自定义事件（事件的回调在A中）。
- 绑定自定义事件：
  - 第一种方式：在父组件中`<Demo @testFun="demo"/>` 或 `<Demo v-on:testFun="demo"/>`
  - 第二种方式：在父组件中：
  ```js
  <Demo ref="demo"></Demo>

  mounted(){
    this.$refs.demo.$on('testFun',this.demo)
  }
  ```
  - 若想让自定义事件只能触发一次，可以使用`once`修饰符，或`$once`方法。
- 触发自定义事件：`this.$emit('testFun',参数)`
- 解绑自定义事件：`this.$emit('testFun')`
- 组件上也可以绑定原生DOM事件，需要使用`native`修饰符。
- 注意：通过`this.$refs.xxx.$on('testFun',回调)`绑定自定义事件时，回调要么配置在`methods`中，要么用箭头函数，否则this指向会出问题。

```html
<!-- app.vue -->
<template>
    <div class="app">
      <h1>{{msg}}</h1>
      <!-- 通过父组件给子组件传递函数类型的props实现：子给父传递数据 -->
      <School :getSchoolName="getSchoolName"/>

      <!-- 通过父组件给子组件绑定一个自定义事件实现：子给父传递数据 -->
      <Student v-on:testFun="demoFun" @test2Fun="demo2Fun"/>
      <!-- 只有第一次触发生效 -->
      <!-- <Student v-on:testFun.once="demoFun"/> -->
      <!-- 自定义组件通过.native调用原生事件 -->
      <Student v-on:testFun="demoFun" @click.native="clickFun"/>

      <!-- 通过父组件给子组件添加ref属性实现：子给父传递数据 -->
      <!-- 该方法更灵活 -->
      <!-- <Student ref="student"/> -->

    </div>
</template>
<script type="text/javascript"> 
  import Student from './components/Student'
  import School from './components/School'
  export default{
    name:'App',
    components:{
      School,
      Student
    },
    mounted(){
      this.$refs.student.$on('testFun',this.getSchoolName)

      // 绑定自定义事件：只有第一次触发生效
      // this.$refs.student.$once('testFun',this.getSchoolName) 


      // this.$refs.student.$on('testFun',()=>{
      //   //
      // })

    },
    data(){
      return{
        mag:'测试'
      }
    },
    methods:{
      getSchoolName(name){
        console.log('APP收到的学校名',name)
      },
      demoFun(name,...params){ // 如果参数过多，可以用...接收
        console.log('demo被调用了',name)
      },
    }
  }
</script>
```


```html
<!-- school.vue -->
<template>
    <div>
     
    </div>
</template>
<script type="text/javascript"> 
  export default{
    name:'School',
    data(){
      return{
        name:'学校名字'
      }
    },
    methods:{
      this.getSchoolName(this.name)
    }
  }
</script>
```

```html
<!-- student.vue -->
<template>
    <div>
      <button @click="sendStudentName">把学生名给app</button>
      <button @click="unbind">解绑testFun事件</button>
    </div>
</template>
<script type="text/javascript"> 
  export default{
    name:'student',
    data(){
      return{
        name:'小佳'
      }
    },
    methods:{
     sendStudentName(){
      this.$emit('testFun',this.name)
      this.$emit('test2Fun')
     },
     unbind(){
      this.$off('testFun');// 只适用于解绑一个自定义事件

      // 解绑多个自定义事件
      //  this.$off(['testFun','test2Fun'])

      // 解绑所有自定义事件
      // this.$off()
     },
     death(){
       this.$destroy();// 销毁了当前Student组件的实例，销毁后所有Student实例的自定义事件全都不奏效。
     }
    }
  }
</script>
```


## 全局事件总线

全局事件总线（GlobalEventBus）
- 一种组件间的通信方式，试用于任意组件间通信。
- 安装全局事件总线：
```js
new Vue({
  ...
  beforeCreate(){
    Vue.prototype.$bus = this;// 安装全局事件总线，$bus就是当前应用的vm
  },
  ...
})
```
- 使用事件总线：
  - 接收数据：A组件想接收数据，则在A组件中给$bus绑定自定义事件，事件的回调留在A组件自身。
```js
mounted(){
  this.$bus.$on('xxxx',this.demo)
},
methods:{
  demo(data){
    .....
  }
}

```
  - 提供数据：
  ```js
  this.$bus.$emit('xxxx',数据)
  ```
- 最好在beforeDestroy钩子中，用`$off`去解绑当前组件所用到的事件。


![image](/imgs/vue/bus1.png)

方式1:(借助vc)
```js
// main.js
import Vue from 'vue';
import App from './App.vue';

const demo = Vue.extend({});// demo  VueComponent
const d = new Demo();// d  vc
Vue.prototype.$bus = d;

const vm = new Vue({
  el:"#app",
  render:h=>h(App)
})
```

方式2:(标准写法：安装全局事件总线)
```js
// main.js
import Vue from 'vue';
import App from './App.vue';

const vm = new Vue({
  el:"#app",
  render:h=>h(App),
  beforeCreate(){
    Vue.prototype.$bus = this;
  }
})
```


```html
<!-- app.vue -->
<template>
    <div class="app">
      <h1>{{msg}}</h1>
      <School/>
      <Student/>
    </div>
</template>
<script type="text/javascript"> 
  import Student from './components/Student'
  import School from './components/School'
  export default{
    name:'App',
    components:{
      School,
      Student
    },
    data(){
      return{
        mag:'测试'
      }
    },
    methods:{
     
    }
  }
</script>
```


```html
<!-- school.vue -->
<template>
    <div>
     1111
    </div>
</template>
<script type="text/javascript"> 
  export default{
    name:'School',
    data(){
      return{
        name:'学校名字'
      }
    },
    mounted(){
      console.log('this.$bus',this.$bus)
      this.$bus.$on('hello',(data)=>{
        console.log('我是school组件,收到了数据data',data)
      })
    },
    beforeDestroy(){
      this.$bus.$off('hello');// 用完一定要解绑hello事件
    },
    methods:{
     
    }
  }
</script>
```

```html
<!-- student.vue -->
<template>
    <div>
      <button @click="sendStudentName">把学生名给school组件</button>
    </div>
</template>
<script type="text/javascript"> 
  export default{
    name:'student',
    data(){
      return{
        name:'小佳'
      }
    },
    methods:{
      sendStudentName(){
        this.$bus.$emit('hello',this.name)
      }
    }
  }
</script>
```


## 消息订阅与发布(pubsub)

订阅消息：消息名
发布消息：消息内容

- 一种组件间通信的方式，适用于任意组件间通信。
- 使用步骤：
  - 安装pubsub-js `npm i pubsub-js`
  - 引入`import pubsub from 'pubsub-js'`
  - 接收数据：A组件想接收数据，则在A组件中订阅消息，订阅的回调留在A组件自身。
  ```js
  mounted(){
    this.pid = pubsub.subscribe('xxx',this.demo);// 订阅消息
  },
  methods:{
    demo(){...}
  }
  ```
  - 提供数据：`pubsub.publish('xxx',数据)`
  - 最好在`beforeDestroy`钩子中，用`pubsub.unsubscribe(pid)`去取消订阅。

> 消息订阅与发布的第三方库有很多，这里采用第三方库`pubsub-js`,可以结合任何框架使用。



```html
<!-- school.vue -->
<template>
    <div>
     1111
    </div>
</template>
<script type="text/javascript"> 
  import pubsub from 'pubsub-js'
  export default{
    name:'School',
    data(){
      return{
        name:'学校名字'
      }
    },
    mounted(){
      // this.$bus.$on('hello',(data)=>{
      //   console.log('我是school组件,收到了数据data',data)
      // })

      // 订阅消息
      this.pubId = pubsub.subscribe('hello',(msgName,data)=>{
        console.log('有人发布了hello消息，hello消息的回调执行了',data)
      })
    },
    beforeDestroy(){
      // this.$bus.$off('hello');// 用完一定要解绑hello事件

      // 通过id取消订阅
      pubsub.unsubscribe(this.pubId)
    },
    methods:{
     
    }
  }
</script>
```


```html
<!-- student.vue -->
<template>
    <div>
      <button @click="sendStudentName">把学生名给school组件</button>
    </div>
</template>
<script type="text/javascript"> 
  import pubsub from 'pubsub-js'
  export default{
    name:'student',
    data(){
      return{
        name:'小佳'
      }
    },
    methods:{
      sendStudentName(){
        // this.$bus.$emit('hello',this.name)

        // 发布消息
        pubsub.publish('hello',this.name)
      }
    }
  }
</script>
```

## $nextTick

- 语法：`this.$nextTick(()=>{})`
- 作用：在下一次DOM更新结束后执行其指定的回调（DOM节点更新完毕后执行）。
- 什么时候用：当改变数据后，要基于更新后的新DOM进行某些操作时，要在nextTick所指定的回调函数中执行。


## Vue封装的过渡与动画

- 作用：在插入、更新或移除DOM元素时，在合适的时候给元素添加样式类名。
- 图示：
![image](/imgs/vue/animate1.png)
- 写法
  - 1.准备好样式
    - 元素进入的样式
      - `v-enter`：进入的起点
      - `v-enter-active`：进入过程中
      - `v-enter-to`：进入的终点
    - 元素离开的样式
      - `v-leave`：离开的起点
      - `v-leave-active`：离开过程中
      - `v-leave-to`：离开的终点
  - 2.使用`<transition>`包裹要过度的元素，并配置name属性
  - 3.备注：若有多个元素要过度，则需要使用`<transition-group>`,且每个元素都要指定key值。
### 动画
```html
<!-- app.vue -->
<template>
    <div>
        <Test/>
    </div>
</template>
<script type="text/javascript"> 
  import Test from './components/Test.vue'
  export default{
    name:'test',
    data(){
      return{
        
      }
    }
  }
</script>
```

不用vue封装的可以自己定义class实现
```html
<!-- Test.vue -->
<template>
    <div>
      <button @click="isShow = !isShow">显示/隐藏</button>
      不用vue封装的可以自己定义class实现 -->
      <h1 v-show="isShow" class="go">你好啊</h1>
    </div>
</template>
<script type="text/javascript"> 
  export default{
    name:'Test',
    data(){
      return{
        isShow:true
      }
    }
  }
</script>
<style scoped>
h1{
  background:red
}

.come{
  animation:testxx 1s;
}

.go{
  animation:testxx 1s reverse;
}

@keyframes testxx{
  from{
    transform:translateX(-100%)
  }to{
    transform:translateX(0px)
  }
}
</style>
```

利用vue封装的transition
1）无名字
```html
<!-- Test.vue -->
<template>
    <div>
      <button @click="isShow = !isShow">显示/隐藏</button>
      <transition>
          <h1 v-show="isShow">你好啊</h1>
      </transition>
    </div>
</template>
<script type="text/javascript"> 
  export default{
    name:'Test',
    data(){
      return{
        isShow:true
      }
    }
  }
</script>
<style scoped>
h1{
  background:red
}

.v-enter-active{
  animation:testxx 1s linear;
}

.v-leave-active{
  animation:testxx 1s linear reverse;
}

@keyframes testxx{
  from{
    transform:translateX(-100%)
  }to{
    transform:translateX(0px)
  }
}
</style>
```

1）有名字
```html
<!-- Test.vue -->
<template>
    <div>
      <button @click="isShow = !isShow">显示/隐藏</button>
      <transition name="rrr" appear>
          <h1 v-show="isShow">你好啊</h1>
      </transition>
    </div>
</template>
<script type="text/javascript"> 
  export default{
    name:'Test',
    data(){
      return{
        isShow:true
      }
    }
  }
</script>
<style scoped>
h1{
  background:red
}

.rrr-enter-active{
  animation:testxx 1s linear;
}

.rrr-leave-active{
  animation:testxx 1s linear reverse;
}

@keyframes testxx{
  from{
    transform:translateX(-100%)
  }to{
    transform:translateX(0px)
  }
}
</style>
```


### 过渡

单个元素过渡
```html
<!-- Test.vue -->
<template>
    <div>
      <button @click="isShow = !isShow">显示/隐藏</button>
      <transition name="rrr" appear>
          <h1 v-show="isShow">你好啊</h1>
      </transition>
    </div>
</template>
<script type="text/javascript"> 
  export default{
    name:'Test',
    data(){
      return{
        isShow:true
      }
    }
  }
</script>
<style scoped>
h1{
  background:red;
  /* transition:0.5s linear; */
}


/* 进入的起点，离开的终点 */
.rrr-enter,.rrr-leave-to{
  transform:translateX(-100%)
}

/* 过程中 */
.rrr-enter-active,.rrr-leave-active{
  transition:0.5s linear;
}

/* 进入的终点，离开的起点 */
.rrr-enter-to,.rrr-leave{
 transform:translateX(0)
}

</style>
```


多个元素过渡
```html
<!-- Test.vue -->
<template>
    <div>
      <button @click="isShow = !isShow">显示/隐藏</button>
      <transition-group name="rrr" appear>
          <h1 v-show="isShow" key="1">你好啊</h1>
          <h1 v-show="isShow" key="2">对对对</h1>
      </transition-group>
    </div>
</template>
<script type="text/javascript"> 
  export default{
    name:'Test',
    data(){
      return{
        isShow:true
      }
    }
  }
</script>
<style scoped>
h1{
  background:red;
  /* transition:0.5s linear; */
}


/* 进入的起点，离开的终点 */
.rrr-enter,.rrr-leave-to{
  transform:translateX(-100%)
}

/* 过程中 */
.rrr-enter-active,.rrr-leave-active{
  transition:0.5s linear;
}

/* 进入的终点，离开的起点 */
.rrr-enter-to,.rrr-leave{
 transform:translateX(0)
}

</style>
```

### 集成第三方动画
animate.css

github:https://github.com/animate-css/animate.css

- 安装`npm install animate.css --save` or `yarn add animate.css`
- 引入`import animate.css`
- 使用
```html
<template>
  <div>
    <transition-group
    name="animate__animated animate__abounce" 
    appear
    enter-active-class="animate__swing"
    enter-active-class="animate__backOutUp"
    >
        <h1 v-show="isShow" key="1">你好啊</h1>
        <h1 v-show="isShow" key="2">对对对</h1>
    </transition-group>
  </div>
</template>
```


## 插槽
- 作用：让父组件可以向子组件指定位置插入html结构，也是一种组件间通信的方式，适用于 父组件 ===> 子组件。
- 分类：默认插槽、具名插槽、作用域插槽。
- 使用方式：

### 默认插槽
```html
<!-- 父组件中： -->
<Category>
  <div>html结构</div>
</Category>

<!-- 子组件中： -->
<template>
  <div>
    <!-- 定义插槽 -->
    <slot>我是默认值，当使用者没有传递具体结构时，我会出现</slot>
  </div>
</template>
```

### 具名插槽
```html
<!-- 父组件中： -->
<Category>
  <template slot='center'>
    <div>html结构1</div>
  </template>


  <!-- 2.6.x新写法 -->
  <!-- v-slot仅仅适用于 template 标签 -->
  <template v-slot:footer>
     <div>html结构2</div>
  </template>
</Category>

<!-- 子组件中： -->
<template>
  <div>
    <!-- 定义插槽 -->
   <slot name="center"></slot>
   <slot name="footer"></slot>
  </div>
</template>
```


### 作用域插槽

- 理解：数据在组件的自身，但根据数据生成的结构需要组件的使用者来决定。（games数据在Category组件中，但使用数据所遍历出来的结构由App组件决定）
- 具体编码：
```html
<!-- 父组件中 -->
<Category>
   <!-- 写法一 -->
  <template scope="scopeData">
  <!-- scopeData就是插槽传进来的数据 -->
  <ul>
    <li v-for="g in scopeData.games" :Key="g">{{g}}</li>
  <ul>
  </template>

  <!-- 写法二 -->
<template slot-scope="scopeData">
  <!-- test就是插槽传进来的数据 -->
  <ul>
    <li></li>
  <ul>
</template>
</Category>


<!-- 子组件中 -->
<!-- 将参数传给插槽的使用者 -->
<slot :games="games"></slot>

games:[]
```

