# 新的组件

[[toc]]

## Fragment

- 在vue2中：组件必须有一个根标签
- 在vue3中：组件可以没有根标签，内部会将多个标签包含在一个`Fragment`虚拟元素中
- 好处：减少标签层级，减少内存占用


## Teleport

- `Teleport`是一种能够将我们的**组件`html`结构** 移动到指定位置的技术。

```js
 <teleport to="移动位置">

 </teleport>
```

- `to`里面对应的值可以是元素标签，也可以是元素选择器class或id。
```js
 <teleport to="#app">

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



eg：

App.vue
```html
<template>
  <div class="outer">
    <h2>我是App组件</h2>

    <Modal/>
  </div>
</template>
<script lang="ts" setup>
  import Modal from './Modal.vue';

</script>
<style scoped>
.outer{
  background-color:#ddd;
  border-radius:10px;
  padding:5px;
  box-shadow:0 0 10px;
  width:400px;
  height:400px;
  /* 色彩饱和度，当写上该属性，弹窗就不参考屏幕了，所以有了 teleport */
  filter:saturate(0%);
}
</style>
```



Modal.vue
```html
<template>
  <button @click="isShow = true">展示弹窗</button>
  <teleport to="body">
    <div class="modal" v-show="isShow">
        <h2>我是弹窗的标题</h2>
        <p>我是弹窗的内容</p>
        <button @click="isShow = false">关闭弹窗</button>
    </div>
  </teleport>
</template>
<script lang="ts" setup>
  import {vue} from 'vue';
  let isShow = ref(false)
</script>
<style scoped>
.modal{
  width:200px;
  height:150px;
  background-color:skyblue;
  border-radius:10px;
  padding:5px;
  box-shadow:0 0 5px;
  text-align：center;
  position:fixed;
  left:50%;
  margin-left:-100px;
  top:20px;
}
</style>
```








## Suspense

> 该组件处于试验阶段

- 等待异步组件时渲染一些额外内容，获得更好的用户体验
- 使用步骤：
  - 引入异步组件
  ```js
  import {defineAsyncComponent,Suspense} from 'vue'
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


>在子组件中使用了异步任务，并且异步任务提供的数据还是你页面中需要的，想让其网速慢的时候也能呈现一些东西，这个时候就可以用到`Suspense`

eg：

父组件 App.vue
```html
<template>
    <div class="app">
      <h2>我是App组件</h2>
      <Suspense>
        <!-- 异步任务完成时出现 -->
        <template v-slot:default>
            <Child/>
        </template>
        <!-- 异步任务未完成时出现 -->
        <template v-slot:fallback>
            <Child/>
        </template>
      </Suspense>
    
    </div>
</template>
<script lang="ts" setup>
  import Child from './Child.vue'
  import {Suspense} from 'vue';

</script>
<style scoped>
.app{
  background-color:skyblue;
  border-radius:10px;
  padding:5px;
  box-shadow:0 0 10px;
}
</style>
```



子组件 Child.vue
```html
<template>
    <div class="child">
        <h2>我是Child组件</h2>
        <p>当前求和为：{{sum}}</p>
    </div>
</template>
<script lang="ts" setup>
  import {vue} from 'vue';
  import axios  from 'axios';
  let sum = ref(0);
  // 底层有async
  let {data:{content}} = await axios.get('https://api.uomg.com/api/rand.qinghua?format=json')
  console.log('content: ', content);

</script>
<style scoped>
.app{
  background-color:skyblue;
  border-radius:10px;
  padding:5px;
  box-shadow:0 0 10px;
}
</style>
```
