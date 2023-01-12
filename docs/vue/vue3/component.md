# 新的组件

[[toc]]

## Fragment

- 在vue2中：组件必须有一个根标签
- 在vue3中：组件可以没有根标签，内部会将多个标签包含在一个`Fragment`虚拟元素中
- 好处：减少标签层级，减少内存占用


## Teleport

- `Teleport`是一种能够将我们的组件html结构移动到指定位置的技术。

```js
 <teleport to="移动位置">

 </teleport>
```

eg：
```vue
<template>
  <div>
    <button @click="isShow = true">点我弹个窗</button>
    <!--<teleport to="#app"> -->
    <teleport to="body">
     <div  v-if="isShow" class="mask">
       <div class="dialog">
        <h3>我是一个弹窗</h3>
        <h4>,,,,,,,</h4>
         <button @click="isShow = false">关闭弹窗</button>
      </div>
     </div>
    </teleport>
  </div>
</template>
<script>
import {ref}  from 'vue'
export default{
  name:'Dialog',
  setup(){
    let isShow = ref(false);

    return{
      isShow
    }
  }
}
</script>
<style>
.mask{
  position:absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;
  background-color:rgba(0,0,0,0.5)
}
.dialog{
  position:absolute;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
  width:300px;
  height:300px;
  text-align:center;
  background-color:green;
  
}
</style>
```




## Suspense

> 该组件处于试验阶段

- 等待异步组件时渲染一些后备内容，获得更好的用户体验
- 使用步骤：
  - 引入异步组件
  ```js
  import {defineAsyncComponent} from 'vue'
  const child = defineAsyncComponent(()=>import('./components/Child.vue'))
  ```
  - 使用`Suspense`包裹组件。并配置好`default`和`fallback`
  - `Suspense`通过插槽实现的
  ```vue
<template>
  <div class="app">
    <h3>我是App组件</h3>
    <Suspense>
      <template v-slot:default>
        <Child/>
      </template>
      <template v-slot:fallback>
        <h3>加载中...</h3>
      </template>
    </Suspense> 
  </div>
</template>
  ```

eg:异步组件

异步组件加载会有抖动，所以出现了`Suspense`
```vue
<template>
  <div class="app">
    <h3>我是App组件</h3>
    <Child/> 
  </div>
</template>
<script>
  // import Child from './components/Child' // 静态引入
  import {defineAsyncComponent} from 'vue'; // 定义一个异步组件
  // 动态引入(异步引入)
  const Child = defineAsyncComponent(()=>import('./components/Child'))
  export default {
    name:'App',
    components:{Child}
  }
</script>
  ```


  当父组件用异步组件引入的，子组件setup可以返回promise对象,让子组件等一等加载
```vue
<template>
  <div class="child">
    <h3>我是Child组件</h3>
    {{sum}}
  </div>
</template>
<script>
  import {ref} from 'vue'; // 定义一个异步组件
  export default {
    name:'Child',

    // 方式1
    setup(){
      let sum = ref(0);
      return new Promise((resolve,reject)=>{
        setTimeout(()=>{
          resolve(sum)
        },3000)
      })
    }

    // 方式2
    async setup(){
      let sum = ref(0);
      let p =  new Promise((resolve,reject)=>{
        setTimeout(()=>{
          resolve(sum)
        },3000)
      })

      return await p
    }
  }
</script>
```