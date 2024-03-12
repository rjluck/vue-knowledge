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
  

> 通过使用`shallowRef`和`shallowReactive`来绕开深度响应式，浅层式API创建的状态只在其


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
import { shallowRef } from 'vue'

let sum = shallowRef(0)
let person = shallowRef({
  name:'小李',
  age:18
})


// 好用
function changeSum(){
  sum.value += 1
}

// 不好用
function changeName(){
  person.name.value = '小赵'
}

// 不好用
function changeAge(){
  person.age.value  +=1
}

// 好用
function changePerson(){
  person.value = {name:'小王',age:100}
}
</script>
```



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
- `readonly`：让一个响应式数据变为只读的（深只读）。
- `shallowReadonly`：让一个响应式数据变为只读的（浅只读）。
- 应用场景：不希望数据被修改时。

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
  - 作用：将一个`reactive`生成的响应式对象转为普通对象。
  - 使用场景：用于读取响应式对象对应的普通对象，对这个普通对象的所有操作，不会引起页面更新。
- `markRaw`
  - 作用：标记一个对象，使其永远不会再成为响应式对象。
  - 应用场景：
    - 有些值不应被设置为响应式，例如复杂的第三方类库等。
    - 当渲染具有不可变数据源的大列表时，跳过响应式转换可以提高性能。

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

- 作用：创建一个自定义的`ref`,并对其依赖项跟踪和更新触发进行显式控制。
- 实现防抖效果：

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