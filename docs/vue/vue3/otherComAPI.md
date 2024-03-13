# other Composition API

[[toc]]

## shallowReactive 与 shallowRef

- `shallowRef`
  - 作用：创建一个响应式数据，但只对顶层属性进行响应式处理。
  - 用法：`let data = shallowRRef(initialValue)`
  - 特点：
    - 只跟踪引用值的变化，不关心值内部的属性变化。
    - 只处理基本数据类型的响应式，不进行对象的响应式处理（因为 `shallowRef`只处理第一层数据）。
- `shallowReactive`
  - 作用：创建一个浅层响应式对象，只会使对象的最顶层属性变成响应式的，对象内部的嵌套属性则不会变成响应式的。
  - 用法：`const myObj = shallowReactive({...}) `
  - 特点：
    - 对象的顶层属性是响应式的，但嵌套对象的属性不是。
    - 只处理对象最外层属性的响应式（浅响应式）。


- 什么时候使用？
  - 如果有一个对象数据，结构比较深，但变化时只是外层属性的变化 ====》用`shallowReactive`。
  - 如果有一个对象数据，后续功能不会修改该对象中的属性，而是生成新的对象来替换===》用`shallowRef`。
  


`shallowRef`举例说明
```html
<template>
 <h2>求和：{{sum}}</h2>
 <h2>姓名：{{name}}</h2>
 <h2>年龄：{{age}}</h2>
 <button @click="changeSum">sum+1</button>
 <button @click="changeName">修改名字</button>
 <button @click="changeAge">修改年龄</button>
 <button @click="changePerson">修改整个人</button>
</template>
<script setup lang="ts">
import { ref,shallowRef } from 'vue'

let sum = shallowRef(0)
let person = shallowRef({
  name:'小李',
  age:18
})


// ref 好用!!!
// shallowRef 好用!!!
function changeSum(){
  sum.value += 1
}

// ref 好用!!!
// shallowRef 不好用
function changeName(){
  person.name.value = '小赵'
}

// ref 好用!!!
// shallowRef 不好用
function changeAge(){
  person.age.value  +=1
}

// ref 好用!!!
// shallowRef 好用!!!
function changePerson(){
  person.value = {name:'小王',age:100}
}
</script>
```



`shallowReactive`举例说明
```html
<template>
 <h2>汽车为：{{car}}</h2>
 <button @click="changeBrand">修改品牌</button>
 <button @click="changeColor">修改颜色</button>
 <button @click="changeEngine">修改发动机</button>
 <button @click="changeCar">修改整个车</button>
</template>
<script setup lang="ts">
import { reactive,shallowReactive } from 'vue'

let car = shallowReactive({
 brand:'奔驰',
 options:{
  color:'红色',
  engine:'V8'
 }
})


// reactive 好用!!!
// shallowReactive 好用!!!
function changeBrand(){
  car.brand = '宝马'
}

// reactive 好用!!!
// shallowReactive 不好用
function changeColor(){
  car.options.color = '白色'
}

// reactive 好用!!!
// shallowReactive 不好用
function changeEngine(){
   car.options.engine = 'V12'
}

// reactive 好用!!!
function changeCar(){
  // car = {}   // reactive 定义的数据不能直接修改
  // 非要修改可以写成如下
  // Object.assign(car,{})
}
</script>
```


> 通过使用`shallowRef`和`shallowReactive`来绕开深度响应式，浅层式API创建的状态只在其顶层是响应式的，对所有深层的对象不会做任何处理，避免了对每一个内部属性做响应式所带来的性能成本，这使得属性的访问变得 更快，可提升性能。


```html
<template>
 <h2>姓名：{{name}}</h2>
 <h2>年龄：{{age}}</h2>
 <h2>薪资：{{job.j1.salary}}k</h2>
 <button @click="name+='~'">修改姓名</button>
 <button @click="age++">增长年龄</button>
 <button @click="job.j1.salary++">增长薪资</button>
</template>
<script>
import {reactive,toRef,toRefs,shallowReactive,shallowRef} from 'vue';
export default{
  name:"Demo",
  setup(){
    let person = shallowReactive({ // 只考虑第一层数据的响应式
      name:'张三',
      age:18,
      job:{
        j1:{
          salary:20
        }
      }
    })

    const x = shallowRef({ // 不处理对象类型的数据
      y:0
    })

    return {
     ...toRefs(person)
    }
  }
}
</script>
```


## readonly 与 shallowReadonly

- `readonly`
  - 作用：用于创建一个对象的深只读副本。
  - 用法：
```js
  const original = reactive({...});
  const readOnlyCopy = readonly(original)

  const original2 = ref(0)
  const readOnlyCopy2 = readonly(original2)
```
- 特点：
  - 对象的所有嵌套属性都将变为只读。
  - 任何尝试修改这个对象的操作都会被阻止（在开发模式下，还会再控制台中发出警告）。
  - 让一个响应式数据变为只读的（深只读）。
- 应用场景：
  - 创建不可变的状态快照。
  - 保护全局状态或配置不被修改。


- `shallowReadonly`
  - 作用：与`readonly`类似，但只作用于对象的顶层属性。
  - 用法：
```js
  const original = reactive({...});
  const readOnlyCopy = shallowReadonly(original)

  const original2 = ref(0)
  const readOnlyCopy2 = shallowReadonly  (original2)
```
  - 特点：
    - 只将对象的顶层属性设置为只读，对象内部的嵌套属性仍然是可变的。
    - 让一个响应式数据变为只读的（浅只读）。
  - 应用场景：
    - 适用于只需要保护对象顶层属性的数据。


```vue
<template>
 <h4>当前求和为：{{sum}}</h4>
 <button @click="sum++">点我++</button>
 <hr/>

 <h2>姓名：{{name}}</h2>
 <h2>年龄：{{age}}</h2>
 <h2>薪资：{{job.j1.salary}}k</h2>
 <button @click="name+='~'">修改姓名</button>
 <button @click="age++">增长年龄</button>
 <button @click="job.j1.salary++">增长薪资</button>
</template>
<script>
import {reactive,ref,toRefs,readonly,shallowReadonly} from 'vue';
export default{
  name:"Demo",
  setup(){
    let person = reactive({ // 只考虑第一层数据的响应式
      name:'张三',
      age:18,
      job:{
        j1:{
          salary:20
        }
      }
    })

    let sum = ref(0)

    // 不让person被改
    // person = readonly(person)
    person = shallowReadonly(person)

    return {
      sum,
     ...toRefs(person)
    }
  }
}
</script>
```




## toRaw 与 markRaw
- `toRaw`
  - 作用：
    - 将一个`reactive`生成的响应式对象转为普通对象。
    - 用于获取一个响应式对象的原始对象，`toRow`返回的对象不再是响应式的，不会触发视图更新。
  - 使用场景：用于读取响应式对象对应的普通对象，对这个普通对象的所有操作，不会引起页面更新。
  - 具体编码：
```ts
import {reactive,toRaw} from 'vue'

// 响应式对象
let person = reactive({name:'tony',age:18})

// 原始对象
let rowPerson = toRaw(person)
```

> 官方描述：这是一个可以用于临时读取而不引起代理访问/跟踪开销，或是写入而不触发更改的特殊方法。不建议保存对原始对象的持久引用，请谨慎使用。


> 何时使用？ 在需要响应式对象传递给非Vue的库或外部系统时，使用`toRaw`可以确保它们收到的是普通对象。



- `markRaw`
  - 作用：标记一个对象，使其永远不会再成为响应式对象。
> 例如使用 `mockjs` 时,为了防止误把`mockjs`变为响应式对象，可以使用`markRaw`去标记`mockjs`
  - 应用场景：
    - 有些值不应被设置为响应式，例如复杂的第三方类库等。
    - 当渲染具有不可变数据源的大列表时，跳过响应式转换可以提高性能。
   - 具体编码：
```ts
import {reactive,markRaw} from 'vue'

// 响应式对象
let person = {name:'tony',age:18}
let person1 = reactive(person) // 可以将person变为响应式对象

let car = markRaw({brand:'奔驰',price:180})
let car1 =  reactive(car) // 不起作用，car不会变成响应式对象了
```


```vue
<template>
 <h4>当前求和为：{{sum}}</h4>
 <button @click="sum++">点我++</button>
 <hr/>

 <h2>姓名：{{name}}</h2>
 <h2>年龄：{{age}}</h2>
 <h2>薪资：{{job.j1.salary}}k</h2>
 <h2>座驾信息：{{person.car}}k</h2>
 <button @click="name+='~'">修改姓名</button>
 <button @click="age++">增长年龄</button>
 <button @click="job.j1.salary++">增长薪资</button>

 <button @click="showRawPerson">输出最原始的person</button>
 <button @click="addCar">给人添加一台车</button>
</template>
<script>
import {reactive,ref,toRefs,toRaw,markRaw} from 'vue';
export default{
  name:"Demo",
  setup(){
    let person = reactive({ // 只考虑第一层数据的响应式
      name:'张三',
      age:18,
      job:{
        j1:{
          salary:20
        }
      }
    })

    let sum = ref(0)

    function showRawPerson(){
      
      const p = toRaw(person)
      
    }


    function addCar(){
      let car = {
        name:'奔驰',
        price:'40w'
      }

      // person.car = car; // car是响应式的
      person.car = markRaw(car);// car不是响应式的
    }


    return {
      sum,
      person,
     ...toRefs(person),
     showRawPerson,
     addCar
    }

  }
}
</script>
```



## customRef

使用Vue提供的默认`ref`定义响应式数据，数据一变，页面就更新。若想要等1s后页面再更新用`ref`就实现不了，所以有`customRef`。


- 作用：创建一个自定义的`ref`,并对其依赖项跟踪和更新触发进行逻辑控制。
- 具体编码：
```html
<template>
 <div class="app">
    <h2>{{msg}}</h2>
    <input type="text" v-model="msg">
 </div>
</template>
<script setup lang="ts">
import {ref,customRef} from 'vue';

// 使用Vue提供的默认`ref`定义响应式数据，数据一变，页面就更新
// let msg = ref('你好')


// 使用Vue提供的默认`customRef`定义响应式数据，数据一变，页面就更新
let initValue = '你好'
/**
 * track 跟踪
 * trigger 触发
*/
let msg = customRef((track,trigger)=>{
  return {
    // msg被读取时调用
    get(){
      track() // 告诉Vue数据msg很重要，你要对msg进行持续关注，一旦msg变化就去更新。
      return initValue
    },
    // msg被调用时调用
    set(value){
      initValue = value;
      trigger() // 通知Vue一下，数据msg变化了
    }
  }
})
</script>
```

- 需求1：等1s后，页面更新

app.vue
```html
<template>
 <div class="app">
    <h2>{{msg}}</h2>
    <input type="text" v-model="msg">
 </div>
</template>
<script setup lang="ts">
import {ref,customRef} from 'vue';
// 使用Vue提供的默认`customRef`定义响应式数据，数据一变，页面就更新
let initValue = '你好'
let timer:number;
/**
 * track 跟踪
 * trigger 触发
*/
let msg = customRef((track,trigger)=>{
  return {
    // msg被读取时调用
    get(){
      track() // 告诉Vue数据msg很重要，你要对msg进行持续关注，一旦msg变化就去更新。
      return initValue
    },
    // msg被调用时调用
    set(value){
      clearTimeout('timer')
      timer = setTimeOut(()=>{
        initValue = value;
        trigger() // 通知Vue一下，数据msg变化了
      },1000)
    }
  }
})
</script>
```

> 项目中用到customRef，通常会封装成hooks,所以下面简单封装成hooks

自定义`hooks`:useMsgRef.ts
```ts
import {customRef} from 'vue';
export default function(initValue:string,delay:number){
    // 使用Vue提供的默认`customRef`定义响应式数据，数据一变，页面就更新
    let timer:number;
    /**
     * track 跟踪
     * trigger 触发
    */
    let msg = customRef((track,trigger)=>{
      return {
        // msg被读取时调用
        get(){
          track() // 告诉Vue数据msg很重要，你要对msg进行持续关注，一旦msg变化就去更新。
          return initValue
        },
        // msg被调用时调用
        set(value){
          clearTimeout('timer')
          timer = setTimeOut(()=>{
            initValue = value;
            trigger() // 通知Vue一下，数据msg变化了
          },delay)
        }
      }
    })

    return { msg }
}
```

app.vue
```html
<template>
 <div class="app">
    <h2>{{msg}}</h2>
    <input type="text" v-model="msg">
 </div>
</template>
<script setup lang="ts">
  import {ref} from 'vue';
import useMsgRef from './useMsgRef.ts';
// 使用Vue提供的默认`customRef`定义响应式数据，数据一变，页面就更新
// let msg = ref('你好')
// 使用useMsgRef来定义一个响应式数据且有延迟效果
let {msg} = useMsgRef('你好',2000)
</script>
```




- 需求2：实现防抖效果：
```vue
<template>
  <input type="text" v-model="keyWord">
  <h3>{{keyWord}}</h3>
</template>
<script>
  import {ref,customRef} from 'vue';
  export default {
    name:'App',
    setup(){
      // 自定义一个ref，名为：myRef
      function myRef(value,delay){
        let timer;
        const x = customRef((track,trigger)=>{
          return {
            get(){
              track();// 通知vue追踪value的变化（提前和get商量一下，让他认为这个value是有用的）
              return value;
            },
            set(newValue){
              
              // 延迟变化
              clearTimeout(timer);
              timer = setTimeout(()=>{
                value =  newValue;
                trigger();// 通知vue去重新解析模板
              },delay)
            }
          }
        })

        return x;
      }

      // let keyWord = ref('hello') // 使用Vue提供的ref
      let keyWord = myRef('hello',1000) // 使用程序员自定义的

      return{
        keyWord
      }
    }
  }
</script>
```



##  provide 与 inject

- 作用：实现**祖与后代组件间**通信
- 套路：父组件有一个`provide`选项来提供数据，后代组件有一个`inject`选项来开始使用这些数据。
- 具体写法：
  - 祖组件中
  ```js
  import {provide} from 'vue'


  setup(){
    ...
    let car = reactive({name:'奔驰',price:'40万'})

    provide('car',car);// 给自己的后代组件传递数据

    return{
      ...toRefs(car)
    }
    ...
  }
  ```
  - 后代组件中
  ```js
  import {inject} from 'vue'

  setup(props,context){
    ...
    const car = inject('car')

    return{
      car
    }
    ...

  }
  ```




  ## 响应式数据的判断

  - `isRef`：检查一个值是否为一个`ref`对象
  - `isReactive`：检查一个对象是否是由`reactive`创建的响应式代理
  - `isReadonly`：检查一个对象是否是由`readonly`创建的只读代理
  - `isProxy`：检查一个对象是否是由`reactive`或者`readonly`方法创建的代理

  ```js
  import {ref,ractive,toRefs,readonly,isRef,isReactive,isReadonly,isProxy} from 'vue'

  setup(){
    let sum = ref(0);

    console.log(isRef(sum)) // true
  }
  ```