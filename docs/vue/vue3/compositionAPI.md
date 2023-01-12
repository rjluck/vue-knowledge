
# Composition API

[[toc]]


## 初始setup

- 理解：`vue3`中的一个新的配置，值为一个函数。
- `setup`是所有`Composition API（组合API）`“表演的舞台”。
- 组件中所用到的：数据、方法等等，均要配置在`setup`中。
- `setup`函数的两种返回值：
  - 若返回一个对象，则对象中的属性、方法，在模板中均可以直接使用（重点关注）。
  - 若返回一个渲染函数：则可以自定义渲染内容（了解）。
- 注意点
  - 尽量不要与`vue2`配置混用
    - `vue2`配置(data、methods、computed...)中可以访问到setup中的属性、方法。
    - 但在setup中不能访问到`vue2`配置(data、methods、computed...)。
    - 如果有重名，`setup`优先。
  - `setup`不能是一个`async`函数，因为返回值不再是`return`的对象，而是`promise`，模板看不到`return`对象中的属性。（setup也可以返回一个Promise实例，但是需要Suspense和异步组件的配合）



```vue
<template>
  <h1>我是App组件</h1>
  <h2>姓名{{name}}</h2>
  <h2>年龄{{age}}</h2>
  <button @click="sayHello">说话</button>
</template>
<script>
import {h} from 'vue';
export default{
  name:"App",
  // setup:function(){}
  // 此处只是测试一下setup,暂时不考虑响应式的问题
  setup(){
    // 数据
    let name = '张三';
    let age = 18;

    // 方法
    function sayHello(){
      alert(`我叫${name},我${age}岁了`)
    }

    // 返回一个对象
    // return{
    //   name,
    //   age,
    //   sayHello
    // }

    // 返回一个渲染函数
    return ()=> h('h1','xxxx')
  }
}
</script>
```




## ref函数

把变量丢给ref函数，从而生成引用实现的实例对象，简称引用对象，RefImpl(reference implement) 引用实现。

- 作用：定义一个响应式的数据
- 语法：`const xxx = ref(intValue)`
  - 创建一个包含响应式数据的引用对象（reference对象，简称ref对象）
  - JS中操作数据：`xxx.value`
  - 模板中读取数据：不需要`.value`,直接`<div>{{xxx}}</div>`
- 备注
  - 接收的数据可以是：基本类型，也可以是对象类型。
  - 基本类型的数据：响应式依然是靠`Object.defineProperty()`的`get`和`set`完成的。
  - 对象类型的数据：内部"求助"了Vue3中的一个新函数——`reactive`函数。



```vue
<template>
  <h1>我是App组件</h1>
  <h2>姓名{{name}}</h2>
  <h2>年龄{{age}}</h2>
  <h2>工作种类{{job.type}}</h2>
  <h2>工作薪水{{job.salary}}</h2>
  <button @click="changeInfo">修改人的信息</button>
</template>
<script>
import {ref} from 'vue';
export default{
  name:"App",
  setup(){
    // 响应式数据
    let name = ref('张三');
    let age = ref(18);
    let job = ref({
      type:'前端工程师',
      salary:'30k'
    })

    // 方法
    function changeInfo(){
      console.log(name);// RefImpl{......value } 实例对象,通过Object.defineProperty 实现
      name.value = '李四';
      age.value = 48;

      console.log(job.value);// Proxy{} 实例对象，通过Object.proxy实现
      job.value.type = 'UI设计师'
    }

    // 返回一个对象
    return{
      name,
      age,
      changeInfo
    }
  }
}
</script>
```




## reactive函数

- 作用：定义一个**对象类型**的响应式数据（基本类型别用它，用`ref`函数）
- 语法：`const 代理对象 = reactive(源对象)`接收一个对象（或数组），返回一个**代理对象（Proxy的实例对象，简称Proxy对象）**
- `reactive`定义的响应式数据是“深层次的”。
- 内部基于`ES6`的`Proxy`实现，通过代理对象操作源对象内部数据进行操作。



```vue
<template>
  <h1>我是App组件</h1>
  <h2>姓名{{name}}</h2>
  <h2>年龄{{age}}</h2>
  <h2>工作种类{{job.type}}</h2>
  <h2>工作薪水{{job.salary}}</h2>
  <button @click="changeInfo">修改人的信息</button>
</template>
<script>
import {ref,reactive} from 'vue';
export default{
  name:"App",
  setup(){
    // 响应式数据
    let name = ref('张三');
    let age = ref(18);
    let job = reactive({
      type:'前端工程师',
      salary:'30k'
    })
    let hobby = reactive(['抽烟','喝酒','烫头'])

    // 方法
    function changeInfo(){
      console.log(name);// RefImpl{......value } 实例对象,通过Object.defineProperty 实现
      name.value = '李四';
      age.value = 48;

      console.log(job);// Proxy{} 实例对象，通过Object.proxy实现
      job.type = 'UI设计师'

      hobby[0] = '学习';
    }

    // 返回一个对象
    return{
      name,
      age,
      changeInfo
    }
  }
}
</script>
```





## vue3中的响应式原理

### vue2的响应式

- 实现原理
  - 对象类型：通过`Object.defineProperty()`对属性的读取、修改进行拦截（数据劫持）。
  - 数组类型：通过重写更新数组的一系列方法来实现拦截。（对数组的变更方法进行了包裹）
  ```js
  Object.defineProperty(data,'count',{
    get(){},
    set(){}
  })
  ```
- 存在问题
  - 新增属性、删除属性，界面不会更新。
  - 直接通过下标修改数组，界面不会自动更新。


```js
// 新增属性不识别，用$set
this.$set(this.person,'sex','女')
// 或
Vue.set(this.person,'sex','女')


// 删除属性不识别，用$delete
this.$delete(this.person,'name','www')
// 或
Vue.delete(this.person,'name','www')

// 解决数组下标问题
// this.person.hobby[0] = '逛街'
this.$set(this.person.hobby,0,'逛街')
this.person.hobby.splice(0,1,'逛街')
```


### vue3的响应式

- 实现原理
  - 通过`Proxy(代理)`：拦截对象中任意属性的变化，包括：属性值的读写、属性的添加、属性的删除等。
  - 通过`Reflect(反射)`：对源对象的属性进行操作。
  - MDN文档中描述的`Proxy`与`Reflect`：
    - `Proxy`:https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy
    - `Reflect`:https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect
```js
new Proxy(data,{
  // 拦截读取属性值
  get(target,prop){
    return Reflect.get(target,prop)
  },
  // 拦截设置属性值或添加新属性
  set(target,prop,value){
    return Reflect.set(target,propName,value)
  },
  // 拦截删除属性
  deleteProperty(target,prop){
    return Reflect.deleteProperty(target,propName)
  }
})
```


模拟vue2中实现响应式
```js
// 源数据
let person = {
  name:'张三',
  age:18
}


// 模拟vue2中实现响应式
let p = {}
Object.defineProperty(p,'name',{
  configurable:true,
  get(){
    // 有人读取name时调用
    return person.name
  },
  set(value){
    // 有人修改name时调用
    person.name = value
  }
})
```


模拟vue3中实现响应式
- Proxy 代理对象
- Reflect 反射对象
```js
// 源数据
let person = {
  name:'张三',
  age:18
}


// 模拟vue3中实现响应式
// window.Proxy
const p = new Proxy(person,{
  get(target,propName){
    // target 源数据
    // propName 属性名
    // 有人读取了p身上的某个属性
    // return target[propName]
    return Reflect.get(target,propName)
  },
  set(target,propName,value){
     // 有人新增/修改了p身上的某个属性，我要去更新界面了
    //  target[propName] = value;
     return Reflect.set(target,propName,value)
  },
  deleteProperty(target,propName){
     // 有人删除了p身上的某个属性，我要去更新界面了
    // return delete target[propName]
    return Reflect.deleteProperty(target,propName)
  }
})
```

### window.Reflect 反射对象
```js
let obj = {a:1,b:2}

// 读取a
// 方式1：obj.a
// 方式2：Reflect.get(obj,'a')


// 修改
// 方式1：obj.a = 100
// 方式2：Reflect.set(obj,'a',666)

// 删除
// 方式1：delete obj.a
// 方式2：Reflect.deleteProperty(obj,'a')
```

`ECMA`组织正在尝试将`Object`身上的属性移植到`Reflect`
```js
let obj = {a:1,b:2}

// 1.通过Object.defineProperty操作

// 重复定义。报错
// Object.defineProperty(obj,'c',{
//   get(){
//     return 3
//   }
// })
// Object.defineProperty(obj,'c',{
//   get(){
//     return 4
//   }
// })

// 捕获错误用try catch麻烦
// try{
//   Object.defineProperty(obj,'c',{
//     get(){
//       return 3
//     }
//   })
//   Object.defineProperty(obj,'c',{
//     get(){
//       return 4
//     }
//   })
// }catch(error){
//   console.log(error)
// }


// 2.通过Reflect.defineProperty操作

// 重复定义。不会报错，会通过返回值告诉是否成功。
const x1 = Reflect.defineProperty(obj,'c',{
  get(){
    return 3
  }
})
console.log(x1);// true

const x2 =  Reflect.defineProperty(obj,'c',{
  get(){
    return 4
  }
})
console.log(x2);// false

//捕获错误，直接if即可
if(x2){
  console.log('xxx操作成功')
}else{
  console.log('xxx操作失败')
}
```



## reactive对比ref
- 从定义数据角度对比：
  - ref用来定义：**基本类型数据**。
  - reactive用来定义：**对象（或数组）类型数据**。
  - 备注：ref也可以用来定义**对象（或数组）类型数据**，它内部会自动通过`reactive`转为代理对象。
- 从原理角度对比：
  - `ref`通过`Object.defineProperty()`的`get`与`set`来实现响应式（数据劫持）。
  - `reactive`通过使用`Proxy`来实现响应式（数据劫持），并通过`Reflect`操作源对象内部的数据。
- 从使用角度对比：
  - ref定义的数据：操作数据需要`.value`,读取数据时模板中直接读取不需要`.value`
  - reactive定义的数据：操作数据与读取数据均不需要`.value`




## setup的两个注意点

- setup执行的时机
  - 在`beforeCreate`之前执行一次，`this`是`undefined`。
- setup的参数
  - `props`：值为对象，包含：组件外部传递过来，且组件内部声明接收了的属性。
  - `context`：上下文对象
    - `attrs`:值为对象，包含：组件外部传递过来，但没有在`props`配置中声明的属性，相当于`this.$attrs`。
    - `slots`:收到的插槽内容，相当于vue2中`this.$slots`。
    - `emit`：分发自定义事件的函数，相当于vue2中的`this.$emit`


子组件
```vue
<template>
  <h2>姓名{{person.name}}</h2>
  <h2>年龄{{person.age}}</h2>
  <button @click="test">触发父组件的hello事件</button>
</template>
<script>
import {ref,reactive} from 'vue';
export default{
  name:"Demo",
  props:['msg','school'],
  emits:['hello'], //父组件绑定了hello事件
  setup(props,context){
   // props 父组件传过来的参数
   // context.attrs 等同于vue2中的$attrs,props没有接收的参数会出现在这里
   // context.emit 触发自定义事件

   // constext.slots 等同于vue2中的$slots,插槽的虚拟dom
   let person = reactive({
     name:'张三',
     age:18
   })


   // 方法
   function test(){
     context.emit('hello',222)
   }

   return {
     person,
     test
   }
  }
}
</script>
```

父组件
```vue
<template>
  <Demo @hello="showHelloMsg" msg="你好啊" school="嘻嘻嘻">
    <span>111111</span>
    <!--vue3不推荐写法 slot="qwe">-->
    <template slot="qwe">
      <span>222</span>
    </template>

    <!--vue3推荐写法 v-slot:qwe>-->
    <template v-slot:qwe>
      <span>222</span>
    </template>
  </Demo>
</template>
<script>
import Demo from './components/Demo'
export default{
  name:"App",
  components:{Demo},
  setup(props,context){

  function showHelloMsg(value){
    //
  }
   return {
    showHelloMsg
   }
  }
}
</script>
```






## 计算属性与监视

### computed函数
- 与vue2中computed配置功能一致
- 写法如下：

```vue
<template>
  姓：<input type="text" v-model="person.firstName"/>
  <br/>
  名：<input type="text" v-model="person.lastName"/>
  <br/>
  <span>全名：{{person.fullName}}</span>
</template>
<script>
import {ref,reactive,computed} from 'vue';
export default{
  name:"Demo",
  setup(props,context){

   let person = reactive({
     firstName:'张',
     lastName:'三',
   })

    // 计算属性
    // // 计算属性-简写（没有考虑计算属性被修改的情况）
    // person.fullName = computed(()=>{
    //   return person.firstName + '-' + person.lastName
    // })

    // 计算属性-完整写法（考虑读和写）
    person.fullName = computed({
      get(){
         return person.firstName + '-' + person.lastName
      },
      set(value){
        const nameArr = value.split('-')
        person.firstName = nameArr[0]
        person.lastName = nameArr[1]
      }
    })

   return {
     person
   }
  }
}
</script>
```


###  watch函数

- 与`vue2`中`watch`配置功能一致
- 两个小坑
  - 监视`reactive`定义的响应式数据时：`oldValue`无法正确获取、强制开启的深度监视（`deep`配置失效）
  - 监视`reactive`定义的响应式数据中某个属性时：`deep`配置有效。
```vue
<template>
 <h2>当前求和为：{{sum}}</h2>
 <button @click="sum++">点我+1</button>
 <hr/>

 <h2>当前的信息为：{{msg}}</h2>
 <button @click="msg+='!'">修改信息</button>
 <hr/>

 <h2>姓名：{{person.name}}</h2>
 <h2>年龄：{{person.age}}</h2>
 <h2>薪资：{{person.job.j1.salary}}k</h2>
 <button @click="person.name+='~'">修改姓名</button>
 <button @click="person.age++">增长年龄</button>
 <button @click="person.job.j1.salary++">增长薪资</button>
</template>
<script>
import {ref,reactive,watch} from 'vue';
export default{
  name:"Demo",
  setup(props,context){
    let sum = ref(0)
    let msg = ref('你好啊')
    let person = reactive({
      name:'张三',
      age:18,
      job:{
        j1:{
          salary:20
        }
      }
    })
    //情况一： 监视ref所定义的一个响应式数据
    // watch(sum,(newValue,oldValue)=>{
    //   console.log('sum变了'，newValue,oldValue)
    // })


    // 情况二： 监视ref所定义的多个响应式数据
    // watch([sum,msg],(newValue,oldValue)=>{
    //   // console.log('sum或msg变了'，newValue,oldValue)
    //   // newValue,oldValue 是数组
    // })

    // watch可以通过传递第三个参数添加配置项
    // watch(sum,(newValue,oldValue)=>{
    //     console.log('sum变了'，newValue,oldValue)
    // },{immediate:true,deep:true})


    // 情况三：监视reactive所定义的一个响应式数据全部属性
    // 注意：
    // 1.此处无法正确的获取oldValue
    // 2.强制开启了深度监视（deep配置无效）
    // watch(person.value,(newValue,oldValue)=>{
    //   console.log('person变化了',newValue,oldValue)
    // })


    // 情况四：监视reactive所定义的一个响应式数据中的某个属性
    // watch(()=>person.age,(newValue,oldValue)=>{
    //   console.log('person的age变化了',newValue,oldValue)
    // })


    // 情况五：监视reactive所定义的一个响应式数据中的某些属性
    // watch([()=>person.age,()=>person.name],(newValue,oldValue)=>{
    //   console.log('person的age或person的name变化了',newValue,oldValue)
    // })


    // 特殊情况
    // 此处由于监视的是reactive定义的对象中的某个属性，所以deep配置有效
    watch(()=>person.job,(newValue,oldValue)=>{
      console.log('person的job变化了',newValue,oldValue)
    },{deep:true})


    return {
      sum,
      msg,
      person
    }
  }
}
</script>
```


watch时的value问题
```vue
<template>
 <h2>当前求和为：{{sum}}</h2>
 <button @click="sum++">点我+1</button>
 <hr/>

 <h2>当前的信息为：{{msg}}</h2>
 <button @click="msg+='!'">修改信息</button>
 <hr/>

 <h2>姓名：{{person.name}}</h2>
 <h2>年龄：{{person.age}}</h2>
 <h2>薪资：{{person.job.j1.salary}}k</h2>
 <button @click="person.name+='~'">修改姓名</button>
 <button @click="person.age++">增长年龄</button>
 <button @click="person.job.j1.salary++">增长薪资</button>
</template>
<script>
import {ref,reactive,watch} from 'vue';
export default{
  name:"Demo",
  setup(props,context){
    let sum = ref(0)
    let msg = ref('你好啊')
    let person = ref({
      name:'张三',
      age:18,
      job:{
        j1:{
          salary:20
        }
      }
    })
    //情况一： 监视ref所定义的一个响应式数据
    watch(sum,(newValue,oldValue)=>{
      console.log('sum变了'，newValue,oldValue)
    })


    watch(person,(newValue,oldValue)=>{
      console.log('person变化了',newValue,oldValue)
    },{deep:true})

    // 或
    watch(person.value,(newValue,oldValue)=>{
      console.log('person变化了',newValue,oldValue)
    })



    return {
      sum,
      msg,
      person
    }
  }
}
</script>
```




###  watchEffect函数
- `watch`的套路是：既要指明监视的属性，也要指明监视的回调。
- `watchEffect`的套路是：不用指明监视哪个属性，监视的回调中用到哪个属性，那就监视哪个属性。
- `watchEffect`有点像`computed`
  - 但`computed`注重的计算出来的值（回调函数的返回值），所以必须要写返回值。
  - 而`watchEffect`更注重的是过程（回调函数的函数体），所以不用写返回值。

```vue
<template>
 <h2>当前求和为：{{sum}}</h2>
 <button @click="sum++">点我+1</button>
 <hr/>

 <h2>当前的信息为：{{msg}}</h2>
 <button @click="msg+='!'">修改信息</button>
 <hr/>

 <h2>姓名：{{person.name}}</h2>
 <h2>年龄：{{person.age}}</h2>
 <h2>薪资：{{person.job.j1.salary}}k</h2>
 <button @click="person.name+='~'">修改姓名</button>
 <button @click="person.age++">增长年龄</button>
 <button @click="person.job.j1.salary++">增长薪资</button>
</template>
<script>
import {ref,reactive,watch,watchEffect} from 'vue';
export default{
  name:"Demo",
  setup(props,context){
    let sum = ref(0)
    let msg = ref('你好啊')
    let person = reactive({
      name:'张三',
      age:18,
      job:{
        j1:{
          salary:20
        }
      }
    })

    //watch监视
    // watch(sum,(newValue,oldValue)=>{
    //   console.log('sum变了'，newValue,oldValue)
    // },{immediate:true})

    watchEffect(()=>{
      const x1 = sum.value;
      const x2 = person.job.j1.salary;
      console.log('watchEffect所指定的回调执行了')
    })


    return {
      sum,
      msg,
      person
    }
  }
}
</script>
```





## 生命周期
- `vue3`中可以继续使用`vue2`中的生命周期钩子，但是有两个被更名
  - `beforeDestroy` 改名为 `beforeUnmount`
  - `destroyed` 改名为 `unmounted`
- `vue3`也提供了`Composition API`形式的生命周期钩子，与`vue2`中钩子对应关系如下
  - `beforeCreate` ---> `setup()`
  - `created` ---> `setup()`
  - `beforeMount` ---> `onBeforeMount`
  - `mounted` ---> `onMounted`
  - `beforeUpdate` ---> `onBeforeUpdate`
  - `updated` ---> `onUpdated`
  - `beforeUnmount` ---> `onBeforeUnmount`
  - `unmounted` ---> `onUnmounted`

通过配置项的形式使用生命周期钩子
- 配置项情况 beforeCreate 在 created 之前执行
```vue
<template>
 <h2>当前求和为：{{sum}}</h2>
 <button @click="sum++">点我+1</button>

</template>
<script>
import {ref} from 'vue';
export default{
  name:"Demo",
  setup(){
    let sum = ref(0)

    return {
      sum
    }
  },

  // 通过配置项的形式使用生命周期钩子
  beforeCreate(){
    //
  },
  created(){

  },
  beforeMount(){

  },
  mounted(){

  },
  beforeUpdate(){

  },
  updated(){

  },
  beforeUnmount(){

  },
  unmounted(){

  }
}
</script>
```


通过组合式API的形式使用生命周期钩子
```vue
<template>
 <h2>当前求和为：{{sum}}</h2>
 <button @click="sum++">点我+1</button>

</template>
<script>
import {ref,onBeforeMount,onMounted,onBeforeUpdate,onUpdated,onBeforeUnmount,onUnmounted} from 'vue';
export default{
  name:"Demo",
  setup(){
    let sum = ref(0)

    // 通过组合式API的形式去使用生命周期钩子
    onBeforeMount(()=>{})
    onMounted(()=>{})
    onBeforeUpdate(()=>{})
    onUpdated(()=>{})
    onBeforeUnmount(()=>{
      // 函数体
    })
    onUnmounted(()=>{
      // 函数体
    })


    return {
      sum
    }
  }
}
</script>
```

组合API生命周期可与配置项生命周期一起混用，组合API生命周期执行顺序比配置项的快点。如下：

- 挂载顺序
> setup
> beforeCreate
> created
> onBeforeMount
> beforeMount
> onMounted
> mounted

- 更新顺序
> onBeforeUpdate
> beforeUpdate
> onUpdated
> updated


- 卸载顺序
> onBeforeUnmount
> beforeUnmount
> onUnmounted
> unmounted


## 自定义hooks函数

### 什么是hook?

- 什么是hook?————本质是一个函数，把`setup`函数中使用的`composition API`进行了封装。
- 类似于`vue`中的`mixin`。
- 自定义`hooks`的优势：复用代码，让`setup`中的逻辑更清楚易懂。


原本写法：
```vue
<template>
  <button @click="sum++">点我+1</button>
  <hr/>

  <h2>当前点击时鼠标的坐标为：x:{{point.x}}  y:{{point.y}}</h2>
</template>
<script>
import {ref,reactive,onMounted,onBeforeUnmount} from 'vue';
export default{
  name:'Demo',
  setup(){
    let sum = ref(0)
    let point = reactive({
      x:0,
      y:0
    })

    // 方法
    function savePoint(event){
        point.x = event.pageX
        point.y = event.pageY
    }

    // 挂载完毕
    onMounted(()=>{
      window.addEventListener('click',savePoint
    })

    // 卸载前
    onBeforeUnmount(()=>{
      window.removeEventListener('click',savePoint)
    })

    return{
      sum,
      point
    }
  }
}
</script>
```


hooks写法:
```vue
<template>
  <button @click="sum++">点我+1</button>
  <hr/>

  <h2>当前点击时鼠标的坐标为：x:{{point.x}}  y:{{point.y}}</h2>
</template>
<script>
import {ref} from 'vue';
import usePoint from '../hooks/usePoint';
export default{
  name:'Demo',
  setup(){
    let sum = ref(0)

    let point = usePoint()

    return{
      sum,
      point
    }
  }
}
</script>
```

```js
//hooks/usePoint.js
import {reactive,onMounted,onBeforeUnmount} from 'vue';
function savePoint(){
  // 实现鼠标“打点”
   let point = reactive({
      x:0,
      y:0
    })

    // 方法
    function savePoint(event){
        point.x = event.pageX
        point.y = event.pageY
    }

    // 挂载完毕
    onMounted(()=>{
      window.addEventListener('click',savePoint
    })

    // 卸载前
    onBeforeUnmount(()=>{
      window.removeEventListener('click',savePoint)
    })

    return point;
}

export default savePoint
```





## toRef
- 作用：创建一个`ref`对象，其`value`值指向另一个对象中的某个属性。
- 语法：`const name = toRef(person,'name')`
- 应用：要将响应式对象中的某个属性单独提供给外部使用时。
- 扩展：`toRefs`与`toRef`功能一致，但可以批量创建多个`ref`对象，语法：`toRefs(person)`


不用toRef
```vue
<template>
 <h2>姓名：{{person.name}}</h2>
 <h2>年龄：{{person.age}}</h2>
 <h2>薪资：{{person.job.j1.salary}}k</h2>
 <button @click="person.name+='~'">修改姓名</button>
 <button @click="person.age++">增长年龄</button>
 <button @click="person.job.j1.salary++">增长薪资</button>
</template>
<script>
import {reactive} from 'vue';
export default{
  name:"Demo",
  setup(){
    let person = reactive({
      name:'张三',
      age:18,
      job:{
        j1:{
          salary:20
        }
      }
    })




    return {
      person
    }
  }
}
</script>
```

用toRef
```vue
<template>
 <h2>姓名：{{name}}</h2>
 <h2>年龄：{{age}}</h2>
 <h2>薪资：{{salary}}k</h2>
 <button @click="name+='~'">修改姓名</button>
 <button @click="age++">增长年龄</button>
 <button @click="salary++">增长薪资</button>
</template>
<script>
import {reactive,toRef,toRefs} from 'vue';
export default{
  name:"Demo",
  setup(){
    let person = reactive({
      name:'张三',
      age:18,
      job:{
        j1:{
          salary:20
        }
      }
    })

    // name 为 RefImpl{...value}
    const name = toRef(person,'name')

    return {
      name:toRef(person,'name'),
      age:toRef(person,'age')
      salary:toRef(person.job.j1,'salary')
    }
  }
}
</script>
```

用toRefs
```vue
<template>
 <h2>姓名：{{name}}</h2>
 <h2>年龄：{{age}}</h2>
 <h2>薪资：{{job.j1.salary}}k</h2>
 <button @click="name+='~'">修改姓名</button>
 <button @click="age++">增长年龄</button>
 <button @click="salary++">增长薪资</button>
</template>
<script>
import {reactive,toRef,toRefs} from 'vue';
export default{
  name:"Demo",
  setup(){
    let person = reactive({
      name:'张三',
      age:18,
      job:{
        j1:{
          salary:20
        }
      }
    })

    const x = toRefs(person)

    return {
     ...toRefs(person)
    }
  }
}
</script>
```



## Composition API的优势

### Options API 存在的问题

使用传统的Options API中，新增或修改一个需求，就需要分别在`data`、`methods`、`computed`等里修改。

### Composition API 的优势

我们可以更加优雅的组织我们的代码，函数。让相关功能的代码更加有序的组织在一起。