
# Composition API

[[toc]]


## OptionsAPI VS CompositionAPI

- vue2的API设计是Options(配置)风格的
- vue3的API设计是Composition(组合)风格的

### Options API的弊端

OptionsAPI，数据、方法、计算属性等，是分散在：`data`、`methods`、`computed`中的，若想新增或者修改一个需求，就需要分别修改`data`、`methods`、`computed`，不便于维护和复用。

### Composition API的优势

可以用函数的方式，更加优雅的组织代码，让相关功能的代码更加有序的组织在一起。

> 说明：网上有个动图很形象，查看的话，可以关注掘金作者：大帅老猿

## setup

### 初识setup

`vue3`中的一个新的配置，值为一个函数。`setup`是所有`Composition API（组合API）`“表演的舞台”。组件中所用到的：数据、方法等等，均要配置在`setup`中。

- `setup`特点：
  - `setup`函数返回的对象中的内容，可直接在模板中使用。
  - `setup`中访问`this`是`undefined`。
  - `setup`函数会在`beforeCreate`之前调用，它是“领先”所有钩子执行的。
- `setup`函数的两种返回值：
  - 若返回一个对象，则对象中的属性、方法，在模板中均可以直接使用（重点关注）。
  - 若返回一个渲染函数：则可以自定义渲染内容（了解）。
- 注意点
  - 尽量不要与`vue2`配置混用
    - `vue2`配置(data、methods、computed...)中可以访问到setup中的属性、方法。
    - 但在setup中不能访问到`vue2`配置(data、methods、computed...)。
    - 如果有重名，`setup`优先。
  - `setup`不能是一个`async`函数，因为返回值不再是`return`的对象，而是`promise`，模板看不到`return`对象中的属性。（setup也可以返回一个Promise实例，但是需要Suspense和异步组件的配合）


> vue2中的OptionsAPI中可以读取到setup中的数据，但是setup中无法获取data即vue2OptionsAPI写法中的数据。


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

> 组合式 API 提供了一种更加灵活和可组合的方式来定义组件逻辑并且更好地处理组件间通信的问题,而setup函数就是组合式API的入口。vue3.0是通过setup()函数来定义组合式api；从vue3.2起则是通过`<script setup>`来实现。

### vue3.0 setup()
```js
// model模型
<script>
import { lowercase } from '@/utils/lowercase.js'
import Home from '@/components/Home'
import { ref } from 'vue'
export default{
	name: "Home",
	// 注册组件
	components: {
    	Home
  	},
  	// props对象的定义
  	props: {
    	num: {
     		type: Number,
      		default: 1
    	}
  	},
	setup (props, context) {
		// 定义变量
    	const numb = ref(1)
    	// 使用外部文件
    	const lowercase1 = lowercase
    	const name = ref('MYNAME')
    	console.log(props)
    	// 接收父组件传递而来的值
    	const prop = toRefs(props)
    	// 事件的定义和向父组件发送事件信号
    	const sendNum = () => {
      		context.emit('sendNum', 1200)
    	}
    return { 
    	numb,
    	lowercase1,
    	name,
    	prop,
    	sendNum,
    }
  }
}
</script>

// view页面
<template>
  <div>
    <h1>使用了setup()</h1>
    <p>numb：{{ numb }}</p>
    <p> {{lowercase1(name)}}</p>
    <p>渲染父组件传递的值：{{ prop }}</p>
    <button @click='sendNum'>向父组件发送触发信号</button>
    // 使用组件
    <Home>我是Home组件</Home>
  </div>
</template>

```

### vue3.2 `script setup`

```html
// model模型
<script setup>
import { lowercase } from '@/utils/lowercase.js'
import Home from '@/components/Home'
import { ref, defineProps, defineEmits, defineExpose } from 'vue'
// 变量的定义
const numb = ref(1)
const name = ref('MYNAME')
// 使用defineProps接口定义props对象
const prop = defineProps({
  num: {
    type: Number,
    default: 1
  }
})
// 使用defineEmits接口定义emits对象
const emit = defineEmits(['submit'])
const sendNum = () => {
  emit('submit', 1000)
}
// 主动向父组件暴露本组件的响应式数据等
defineExpose({
  numb,
  name
})
</script>

// view页面
<template>
  <div>
    <h1>使用了<script setup></h1>
    <p>numb：{{ numb }}</p>
    <p> {{lowercase1(name)}}</p>
    <p>渲染父组件传递的值：{{ prop }}</p>
    <button @click='sendNum'>向父组件发送触发信号</button>
    <Home>我是Home组件</Home>
  </div>
</template>
```


### 区别

可以看出，setup()函数和script setup在使用上还是有较大的差别：
（1）变量的定义与使用
`setup()`函数需要繁琐将声明的变量、函数及`import`引入的内容通过`return`一个对象、向外暴露。才能在`<template/>`使用的问题；而`script setup`不需要。
（2）组件使用
使用`setup()`函数需要在引入组件后，通过 `components:{ }`注册组件才能使用，但`<script setup>`引入组件后将自动注册，可直接使用
（3）组件通信
- 在`<script setup>`中必须使用 `defineProps` 和 `defineEmits`接口来替代 `props` 和 `emits`
- 使用 `<script setup>`的组件，父组件是无法通过 `ref` 或者 `$parent` 获取到子组件的`ref`等响应数据，需要通过`defineExpose` 主动暴露；相反`setup()`函数可以通过`ref`属性获取子组件的响应式数据

可以看出， `<script setup>`相比`setup()`函数更简单明了也更有优势，具体的请参照 官网(https://cn.vuejs.org/api/sfc-script-setup.html)

> 注意：
> 其实并非所有`<script>`都可改为`script setup`语法，比如：
> -（1）无法在 `<script setup>` 中声明的选项，例如 `inheritAttrs` 或插件的自定义选项。
> -（2）声明模块的具名导出 (named exports)。
> -（3）运行只需要在模块作用域执行一次的副作用，或是创建单例对象。
> -故需要和`<script>`一起使用



### script setup中组件名的写法

#### 写法1

多定义一个`<script lang="ts">`标签，用来定义组件name,如下：

```html
<template></template>

<script lang="ts">
    export  default {
        name:'Person234',
    }
</script>
<script lang="ts" setup>

</script>


<style scoped></style>
```

#### 写法2

上诉代码，还需要编写一个不写`setup`的`script`标签，去指定组件名字，比较麻烦，我们可以借助`vite`中的插件简化

基于构建工具Vite，需要插件支持
- 安装`npm install vite-plugin-vue-setup-extend -D`
- 在`vite.config.ts`中配置插件

```ts
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 1.引入
import VueSetupExtend from 'vite-plugin-vue-setup-extend'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueSetupExtend() // 2.配置
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})

```
  
```html
<script lang="ts" setup name="Person234">
    // 数据
    let name = '张三';
    let age = 18;
    let tel = '111222333';

    // 方法
    function changeName(){
        name='rrr'
    }
    function showTel(){
        console.log(tel);
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
- 返回值：一个`RefImpl`的实例对象，简称`ref对象`或`ref`,`ref对象`的`value`属性是响应式的。
- 备注
  - 接收的数据可以是：基本类型，也可以是对象类型。
  - 基本类型的数据：响应式依然是靠`Object.defineProperty()`的`get`和`set`完成的。
  - 对象类型的数据：内部"求助"了Vue3中的一个新函数——`reactive`函数。
- 注意
  - 对于`let name = ref('张三')`来说，`name`不是响应式的，`name.value`是响应式的。



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

```vue
<template>
  <h1>我是App组件</h1>
  <h2>姓名{{name}}</h2>
  <h2>年龄{{age}}</h2>
  <h2>工作种类{{job.type}}</h2>
  <h2>工作薪水{{job.salary}}</h2>
  <button @click="changeInfo">修改人的信息</button>
</template>
<script setup>
    import {ref} from 'vue';
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

      //  age = ref(19); // 错误，重新赋值必须 .value
      age.value = 48;

      console.log(job.value);// Proxy{} 实例对象，通过Object.proxy实现
      job.value.type = 'UI设计师'
    }

</script>
```


## reactive函数

- 作用：定义一个**对象类型**的响应式数据（基本类型别用它，用`ref`函数）
- 语法：`const 代理对象 = reactive(源对象)`接收一个对象（或数组），返回一个**代理对象（Proxy的实例对象，简称Proxy对象）**
- `reactive`定义的响应式数据是“深层次的”。
- 内部基于`ES6`的`Proxy`实现，通过代理对象操作源对象内部数据进行操作。

> reactive函数 只能定义对象类型的响应式数据
> ref函数 可以定义基本类型、对象类型的响应式数据

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


```vue
<template>
  <h1>我是App组件</h1>
  <h2>姓名{{name}}</h2>
  <h2>年龄{{age}}</h2>
  <h2>工作种类{{job.type}}</h2>
  <h2>工作薪水{{job.salary}}</h2>
  <button @click="changeInfo">修改人的信息</button>
</template>
<script setup>
import {ref,reactive} from 'vue';
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
</script>
```


## ref VS reactive

宏观角度看：
> - ref用来定义：基本类型数据、对象类型数据；
> - reactive用来定义： 对象类型数据；

区别：
> - ref创建的变量必须使用`.value`(可以使用`volar`插件自动添加`.value`)
![image](/imgs/vue3/plugin1.png)

![image](/imgs/vue3/plugin2.png)


> - ref重新分配一个新对象，不会失去响应式


```html
<script lang="ts" setup name="Person234">
    import { ref,reactive} from 'vue'
    // 数据
    let name = ref('张三');
    let age = 18;
    let tel = '111222333';
    let car = ref({brand:'奔驰',price:100})

    // 方法
    function changeName(){
        name.value='rrr'
    }
    function showTel(){
        console.log(tel);
    }
    function changePrice(){
        car.value.price += 10
    }
    function changeBrand(){
        car.value.brand = '宝马'
    }
    function changeCar(){
        // 下面这个写法页面可以更新
        car.value = {brand:'奥迪',price:10}
    }

</script>
```

> - reactive重新分配一个新对象，会失去响应式（可以使用`Object.assign`去整体替换）

```html
<script lang="ts" setup name="Person234">
    import { ref,reactive} from 'vue'
    // 数据
    let name = ref('张三');
    let age = 18;
    let tel = '111222333';
    let car = reactive({brand:'奔驰',price:100})

    // 方法
    function changeName(){
        name.value='rrr'
    }
    function showTel(){
        console.log(tel);
    }
    function changePrice(){
        car.price += 10
    }
    function changeBrand(){
        car.brand = '宝马'
    }
    function changeCar(){
        // car = {brand:'奥迪',price:10}  // 这么写页面是不更新的
        // car = reactive({brand:'奥迪',price:10}) // 这么写页面是不更新的

        // 下面这个写法页面可以更新
        Object.assign(car,{brand:'奥迪',price:10})
    }

</script>
```





使用原则：
> - 若需要一个基本类型的响应式数据，必须使用`ref`。
> - 若需要一个响应式对象，层级不深，`ref`、`reactive`都可以。
> - 若需要一个响应式对象，且层级较深，推荐使用`reactive`。






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
- 与`vue2`中`computed`配置功能一致
- 写法如下：

```html
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

```html
<template>
    <div class="person">
        姓：<input type="text" v-model="firstName"> <br>
        名：<input type="text"  v-model="lastName"> <br>
        <!-- 全名：<span>{{firstName}}-{{ lastName }}</span> <br> -->
        全名：<span>{{fullName}}</span> <br>

        <button @click="changeFullName">将全名改为li-si</button>
    </div>
</template>
<script lang="ts" setup name="Person">
import { ref,computed,reactive,toRefs,toRef} from 'vue'
    let firstName = ref('rong')
    let lastName = ref('xixi')

    // 这么定义的fullName是一个计算属性，且是只读的。
    // let fullName = computed(()=>{
    //     return firstName.value.slice(0,1).toUpperCase()+firstName.value.slice(1) + '-' + lastName.value;
    // })

    // 这么定义的fullName是一个计算属性，可读可写。
    let fullName = computed({
        get(){
            return firstName.value.slice(0,1).toUpperCase()+firstName.value.slice(1) + '-' + lastName.value;
        },
        set(val){
            console.log('val: ', val);
            const [str1,str2] = val.split('-')
            firstName.value = str1;
            lastName.value = str2;
        }
    })

    function changeFullName(){
        fullName.value ='li-si'
    }

</script>


<style scoped>
.person{
    background-color:skyblue;
    box-shadow: 0 0 10px;
    border-radius:10px;
    padding:20px;
}
</style>
```


###  watch函数

- 作用：见识数据的变化（与`vue2`中`watch`配置功能一致）
- 特点：`vue3`中的`watch`只能监视以下四种数据
  - `ref`定义的数据
  - `reactive`定义的数据
  - 函数返回一个值
  - 一个包含上述内容的数组
- 两个小坑
  - 监视`reactive`定义的响应式数据时：`oldValue`无法正确获取、强制开启的深度监视（`deep`配置失效）
  - 监视`reactive`定义的响应式数据中某个属性时：`deep`配置有效。

我们在`vue3`中使用`watch`的时候，通常会遇到以下几种情况：

#### 情况一

监视`ref`定义的【基本类型】数据：直接写数据名即可，监视的是其`value`值的变化

```html
<template>
    <div class="person">
       <h2>当前求和为：{{ sum }}</h2>
       <button @click="changeSum">点击sum+1</button>
    </div>
</template>
<script lang="ts" setup name="Person">
    import { ref,watch } from 'vue'
    // 数据
    let sum = ref(0)
    
    // 方法
    function changeSum(){
       sum.value +=1
    }

    // 监听
    // 参数1：监听对象
    // 参数2：监听回调
    watch(sum,(newValue,oldValue)=>{
        console.log('oldValue: ', oldValue);
        console.log('newValue: ', newValue);
        if(newValue>=10){

        }
    })

    // 取消监听
    // const stopWatch = watch(sum,(newValue,oldValue)=>{
    //     console.log('oldValue: ', oldValue);
    //     console.log('newValue: ', newValue);
    //     if(newValue>=10){
    //         stopWatch() // 取消监听
    //     }
    // })
</script>
<style scoped>
.person{
    background-color:skyblue;
    box-shadow: 0 0 10px;
    border-radius:10px;
    padding:20px;
}
</style>
```



#### 情况二

监视`ref`定义的【对象类型】数据：直接写数据名，监视的是对象的【地址值】，若想监视对象内部的数据，要手动开启深度监视。

> 注意：
> - 若修改是`ref`定义的对象中的属性，`newValue`和`oldValue`都是新值，因为它们是同一个对象。
> - 若修改整个`ref`定义的对象，`newValue`是新值，`oldValue`是旧值，因为不是同一个对象了。

```html
<template>
    <div class="person">
       <h2>姓名：{{ person.name }}</h2>
       <h2>年龄：{{ person.age }}</h2>
       <button @click="changeName">修改名字</button>
       <button @click="changeAge">修改年龄</button>
       <button @click="changePerson">修改整个人</button>
    </div>
</template>
<script lang="ts" setup name="Person">
    import { ref,watch } from 'vue'
    // 数据
    let person = ref({
        name:'张三',
        age:18
    })
    
    // 方法
    function changeName(){
        person.value.name +='~'
    }
    function changeAge(){
        person.value.age +=1
    }
    function changePerson(){
        person.value = {name:'丽丽',age:20}
    }

    // 监听
    // 参数1：监听对象
    // 参数2：监听回调
    // 参数3：配置对象

    // 监视的是对象的地址值
    // watch(person,(newValue,oldValue)=>{
    //     console.log('oldValue: ', oldValue);
    //     console.log('newValue: ', newValue);  
    // })

    // 若想监视对象内部属性的变化，需要手动开启深度监视
    watch(person,(newValue,oldValue)=>{
        console.log('oldValue: ', oldValue);
        console.log('newValue: ', newValue);  
    },{deep:true,immediate:true})

    // 取消监听
    // const stopWatch = watch(person,(newValue,oldValue)=>{
    //     console.log('oldValue: ', oldValue);
    //     console.log('newValue: ', newValue);
    //     if(newValue>=10){
    //         stopWatch() // 取消监听
    //     }
    // })
</script>

<style scoped>
.person{
    background-color:skyblue;
    box-shadow: 0 0 10px;
    border-radius:10px;
    padding:20px;
}
</style>
```



#### 情况三

监视`reactive`定义的【对象类型】数据，且默认开启了深度监视。

```html
<template>
    <div class="person">
       <h2>姓名：{{ person.name }}</h2>
       <h2>年龄：{{ person.age }}</h2>
       <button @click="changeName">修改名字</button>
       <button @click="changeAge">修改年龄</button>
       <button @click="changePerson">修改整个人</button>
    </div>
</template>
<script lang="ts" setup name="Person">
    import { reactive,watch } from 'vue'
    // 数据
    let person = reactive({
        name:'张三',
        age:18
    })
    
    // 方法
    function changeName(){
        person.name +='~'
    }
    function changeAge(){
        person.age +=1
    }
    function changePerson(){
        // person = {name:'丽丽',age:20} // reactive不支持整体更改对象
        Object.assign(person,{name:'丽丽',age:20})
    }

    // 监听
    // 参数1：监听对象
    // 参数2：监听回调
    // 参数3：配置对象

    // 监视的是对象的地址值
    // watch(person,(newValue,oldValue)=>{
    //     console.log('oldValue: ', oldValue);
    //     console.log('newValue: ', newValue);  
    // })

    // 监视reactive定义的对象类型数据，默认底层开启深度监视，这个深度监视是不可关闭的。
    // 因为对象地址不变，所以 newValue 和 oldValue 始终相同
    watch(person,(newValue,oldValue)=>{
        console.log('oldValue: ', oldValue);
        console.log('newValue: ', newValue);  
    })
</script>

<style scoped>
.person{
    background-color:skyblue;
    box-shadow: 0 0 10px;
    border-radius:10px;
    padding:20px;
}
</style>
```



#### 情况四

监视`ref`或`reactive`定义的【对象类型】数据中的某个属性，注意点如下：
- 若该属性值不是【对象类型】，需要写成函数形式。
- 若该属性值依然是【对象类型】，可直接编辑，也可写成函数，不过建议写成函数。

结论：监视的要是对象里的属性，那么最好写成函数式。注意点：若是对象监视的是地址值，若要关注对象内部，需要手动关注深度监视。

```html
<template>
    <div class="person">
       <h2>姓名：{{ person.name }}</h2>
       <h2>年龄：{{ person.age }}</h2>
       <h2>汽车：{{ person.car.c1 }} 、{{ person.car.c2 }}</h2>
       <button @click="changeName">修改名字</button>
       <button @click="changeAge">修改年龄</button>
       <button @click="changeC1">修改第一台车</button>
       <button @click="changeC2">修改第二台车</button>
       <button @click="changeCar">修改整个车</button>
    </div>
</template>
<script lang="ts" setup name="Person">
    import { reactive,watch } from 'vue'
    // 数据
    let person = reactive({
        name:'张三',
        age:18,
        car:{
            c1:'奔驰',
            c2:'宝马'
        }
    })
    
    // 方法
    function changeName(){
        person.name +='~'
    }
    function changeAge(){
        person.age +=1
    }
    function changeC1(){
       person.car.c1 = '奥迪'
    }
    function changeC2(){
        person.car.c2 = '大众'
    }
    function changeCar(){
        person.car = {
            c1:'雅迪',
            c2:'爱玛',
        }
    }

    // 监听
    // 参数1：监听对象
    // 参数2：监听回调
    // 参数3：配置对象


    // （1）监视的属性值不是【对象类型】，需要写成函数形式
    // getter函数：一个函数，返回一个值
    // watch(()=>{return person.name},(newValue,oldValue)=>{
    //     console.log('oldValue: ', oldValue);
    //     console.log('newValue: ', newValue);  
    // })

    // 简写
    watch(()=>person.name,(newValue,oldValue)=>{
        console.log('oldValue: ', oldValue);
        console.log('newValue: ', newValue);  
    })


    // (2)监视的数值是【对象类型】,
    // 可直接编辑（修改对象里面的属性，可监听到，修改整个对象就监听不到了）
    // 也可写成函数形式（修改对象里面的属性，不可监听到，修改整个对象可以监听到），但是加上deep:true就可以监听到对象属性的改变
    // watch(person.car,(newValue,oldValue)=>{
    //     console.log('oldValue: ', oldValue);
    //     console.log('newValue: ', newValue);  
    // })

    // 也可写成函数形式，
    // watch(()=>person.car,(newValue,oldValue)=>{
    //     console.log('oldValue1: ', oldValue);
    //     console.log('newValue1: ', newValue);  
    // })

    // 所以推荐写成函数形式
    watch(()=>person.car,(newValue,oldValue)=>{
        console.log('oldValue1: ', oldValue);
        console.log('newValue1: ', newValue);  
    },{deep:true})
</script>

<style scoped>
.person{
    background-color:skyblue;
    box-shadow: 0 0 10px;
    border-radius:10px;
    padding:20px;
}
</style>
```

#### 情况五

监视上诉的多个数据

```html
<template>
    <div class="person">
       <h2>姓名：{{ person.name }}</h2>
       <h2>年龄：{{ person.age }}</h2>
       <h2>汽车：{{ person.car.c1 }} 、{{ person.car.c2 }}</h2>
       <button @click="changeName">修改名字</button>
       <button @click="changeAge">修改年龄</button>
       <button @click="changeC1">修改第一台车</button>
       <button @click="changeC2">修改第二台车</button>
       <button @click="changeCar">修改整个车</button>
    </div>
</template>
<script lang="ts" setup name="Person">
    import { reactive,watch } from 'vue'
    // 数据
    let person = reactive({
        name:'张三',
        age:18,
        car:{
            c1:'奔驰',
            c2:'宝马'
        }
    })
    
    // 方法
    function changeName(){
        person.name +='~'
    }
    function changeAge(){
        person.age +=1
    }
    function changeC1(){
       person.car.c1 = '奥迪'
    }
    function changeC2(){
        person.car.c2 = '大众'
    }
    function changeCar(){
        person.car = {
            c1:'雅迪',
            c2:'爱玛',
        }
    }

    // 监听
    // 参数1：监听对象
    // 参数2：监听回调
    // 参数3：配置对象

    // 监听name和c1
    watch([()=>person.name,()=>person.car.c1],(newValue,oldValue)=>{
        console.log('oldValue: ', oldValue);
        console.log('newValue: ', newValue);
    })

    // 监听age和car
    watch([()=>person.age,person.car],(newValue,oldValue)=>{
        console.log('oldValue: ', oldValue);
        console.log('newValue: ', newValue);
    })

</script>

<style scoped>
.person{
    background-color:skyblue;
    box-shadow: 0 0 10px;
    border-radius:10px;
    padding:20px;
}
</style>
```



#### 汇总举例
```html
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

官网：立即运行一个函数，同时响应式地追踪其依赖，并在依赖更改是重新执行该函数。

`watch` 对比 `watchEffect`
- 都能监听响应式数据的变化，不同的是监听数据变化的方式不同。
- `watch`:要明确指出监视的数据
- `watchEffect`:不用明确指出监视的数据（函数中用到哪些属性,那就监视哪些属性）




```html
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



```html
<template>
    <div class="person">
     <h2>需求：当水温达到60 或 水位达到80，给服务器发请求</h2>
     <h2>当前水温：{{ temp }}</h2>
     <h2>当前水位：{{ height }}</h2>
     <button @click="changeTemp">水温+10</button>
     <button @click="changeHeight">水位+10</button>
    </div>
</template>
<script lang="ts" setup name="Person">
import { ref,watch,watchEffect } from 'vue'
    // 数据
    let temp = ref(0)
    let height = ref(0)

    // 方法
    function changeTemp(){
        temp.value+=10
    }
    function changeHeight(){
        height.value+=10
    }

    // watch监视
    // watch([temp,height],(newValue,oldValue)=>{
    //     console.log('newValue,oldValue: ', newValue,oldValue);
    //     let [newTemp,newHeight] = newValue;
    //     if(newTemp>=60 || newHeight>=80){
    //         console.log('发请求');
    //     }
    // })

    // 上面若是监听的属性很多，都写就很麻烦，所以引入watchEffect
    // watchEffect监视
    watchEffect(()=>{
        console.log('一上来就执行')
        if(temp.value>=60 || height.value>=80){
          console.log('发请求');
        }
    })
</script>

<style scoped>
.person{
    background-color:skyblue;
    box-shadow: 0 0 10px;
    border-radius:10px;
    padding:20px;
}
</style>
```


## 标签的ref属性

作用：用于注册模板引用
- 用在普通的`DOM`标签上，获取的是`DOM`节点
- 用在组件标签上，获取的是组件实例对象

> 当父组件要通过ref获取子组件中的内容，此时子组件必须借助 `defineExpose` 方法进行导出，否则父组件获取不到。

app.vue
```html
<template>
<div class="app">
    <h1>你好啊</h1>
    <button @click="showLog">www</button>
    <Person ref="ren"></Person>
</div>
</template>
<script lang="ts" setup name="App">
    import { ref } from 'vue'
    import Person from './components/Person.vue'

    let ren = ref()

    function showLog(){
        // 获取组件实例
        console.log('1111',ren.value);
    }

</script>
<style>
.app{
    background-color: aquamarine;
    box-shadow: 0 0 10px;
    border-radius:10px;
    padding: 20px;
}
</style>
```

person.vue
```html
<template>
    <div class="person">
        <h1>中国</h1>
        <h2 id="title2" ref="beijing">北京</h2>
        <h3>大连</h3>
        <button @click="showLog">点我输出h2这个元素</button>
    </div>
</template>
<script lang="ts" setup name="Person">
import { ref,defineExpose } from 'vue'

    // 数据
    // 创建一个beijing,用于存储ref标记的内容
    let beijing = ref()


    let a = ref(0)
    let b = ref(1)
    let c = ref(2)

    // 方法
    function showLog(){
        // 原生获取dom元素
        console.log(document.getElementById('title2')) // 
        // vue3中写法,获取dom元素
        console.log(beijing.value)
    }

    // 导出之后，可以让父组件看到变量a,b,c,都则父组件看不到
    defineExpose({a,b,c})
</script>


<style scoped>
.person{
    background-color:skyblue;
    box-shadow: 0 0 10px;
    border-radius:10px;
    padding:20px;
}
</style>
```

## props

- 一个组件需要显式声明它所接受的 props，这样 Vue 才能知道外部传入的哪些是 props，哪些是透传 attribute
- Vue3相较于Vue2，Props传递的变化很大，并且结合ts后，写法有些怪异。

### props声明

（1）在使用 `<script setup>` 的单文件组件中，`props` 可以使用 `defineProps()` 宏来声明：
```html
<script lang="ts" setup>
    const props = defineProps(['foo'])

    console.log(props.foo)
</script>
```
```html
<script lang="ts" setup>
    const props = defineProps({
      title:String,
      likes:Number
    })

    console.log(props.title)
</script>
```

（2）在没有使用 `<script setup>` 的组件中，`prop` 可以使用 `props` 选项来声明：
```js
export default{
  props:['foo'],
  setup(props){
    // setup() 接收props作为第一个参数
    console.log(props.foo)
  }
}
```

```js
export default{
  props:{
    title:String,
    likes:Number
  },
  setup(props){
    // setup() 接收props作为第一个参数
    console.log(props.title)
  }
}
```

注意：
- 注意传递给 `defineProps()` 的参数和提供给 `props` 选项的值是相同的，两种声明方式背后其实使用的都是 `prop` 选项。

（3）如果你正在搭配 `TypeScript` 使用 `<script setup>`，也可以使用类型标注来声明 `props`
```html
<script lang="ts" setup>
  defineProps<{
    title?:string,
    likes?:number
  }>
</script>
```

### props校验
- Vue 组件可以更细致地声明对传入的 props 的校验要求

（1）js版本
```js
defineProps({
  propA:Number,
  propB:[String,Number],
  propC:{
    type:String,
    required:true
  },
  propD:{
    type:String,
    default:100
  },
  propE:{
    type:Object,
    default:(rawProps){
      // 对象或数组的默认值,必须从一个工厂函数返回。
      // 该函数接收组件所接收到的原始 prop 作为参数。
      return {message:'222'}
    }
  }，
  // 自定义类型校验函数
  propsF:{
    validator(value){
      return ['success','warning','danger'].includes(value)
    }
  },
  // 函数类型的默认值
  propsG:{
    type:Function,
    // 不像对象或者数组的默认，这不是一个工厂函数。这会是一个用来作为默认值的函数。
    default(){
      return '111'
    }
  }
})
```

> defineProps() 宏中的参数不可以访问 `<script setup>` 中定义的其他变量，因为在编译时整个表达式都会被移到外部的函数中。



（2）`ts`版本
这个时候的写法可能就很不习惯了。

(2.1) 使用`ts`进行类型约束
```html
<script setup lang="ts">
defineProps<{
  title?: string
  likes?: number
}>()
</script>
```
拆分开来，其实等价于：
```html
<script setup lang="ts">
interface Props {
  title?: string
  likes?: number
}
 
const props = defineProps<Props>()
</script>
```
（2.2）使用`ts`时`props`的默认值

> 当使用基于类型的声明时，我们失去了为 `props` 声明默认值的能力。
> 
> 如果是对象写法，可以约定默认值，但是使用`ts`进行类型约束后，就做不到了。这个时候可以通过 `withDefaults` 来解决：

```ts
export interface Props {
  msg?: string
  labels?: string[]
}
 
const props = withDefaults(defineProps<Props>(), {
  msg: 'hello',
  labels: () => ['one', 'two']
})
```

相当于是将整个之前的`defineProps`作为参数传给了`withDefaults`。




注意：
- 所有`prop`默认都是可选的，除非声明了`required:true`
- 除了`Boolean`外的未传递的可选`prop`将会有一个默认值`undefined`
- `Boolean` 类型的未传递 `prop` 将被转换为 `false`。这可以通过为它设置 `default` 来更改——例如：设置为 `default: undefined` 将与非布尔类型的 `prop` 的行为保持一致。
- 如果声明了 `default` 值，那么在 `prop` 的值被解析为 `undefined` 时，无论 `prop` 是未被传递还是显式指明的 `undefined`，都会改为 `default` 值。
- 当 `prop` 的校验失败后，`Vue` 会抛出一个控制台警告 (在开发模式下)

### 结合ts的默认值及声明

父组件
```html
<template>
<div class="app">
    <Person a="哈哈哈" b="嘻嘻嘻" :list="personList"></Person>
</div>
</template>
<script lang="ts" setup name="App">
    import { reactive,ref } from 'vue'
    import Person from './components/Person.vue'
    import { type Persons } from './types';
    // 数据
    // reactive 直接传泛型
    let personList= reactive<Persons>([
        {id:'aa1',name:'红红',age:18},
        {id:'aa2',name:'丽丽',age:19},
        {id:'aa3',name:'欣欣',age:20,x:9},
    ])

</script>
<style>
.app{
    background-color: aquamarine;
    box-shadow: 0 0 10px;
    border-radius:10px;
    padding: 20px;
}
</style>
```


子组件
```html
<template>
    <div class="person">
        <ul>
            <li v-for="item in list"  :key="item.id">
                {{ item.name }}-{{ item.age }}
            </li>
        </ul>
    </div>
</template>
<script lang="ts" setup name="Person">
    import { defineProps,withDefaults } from 'vue'
    import { type Persons } from '../types';
    // 接收a
    // defineProps(['a'])

    // 接收a,同时将props保存起来
    // let x = defineProps(['a','b','list'])
    // console.log('x: ', x);
    // console.log('x.list: ', x.list);

    // 只接收list
    // defineProps(['list'])

    // 接收list + 限制类型
    // defineProps<{list:Persons}>()

    // 接收list + 限制类型 + 限制必要性 + 指定默认值
    withDefaults(defineProps<{list?:Persons}>(),{
        list:()=>{
            return [
                {id:'bbb1',name:'ww',age:23}
            ]
        }
    })
    
</script>


<style scoped>
.person{
    background-color:skyblue;
    box-shadow: 0 0 10px;
    border-radius:10px;
    padding:20px;
}
</style>
```



> define... 在vue3中属于宏函数，不用引入也不报错，eg:defineProps可直接使用，无需引入
> 
> Vue3中只要是define开头的api，不需要从vue中引入。






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
```
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
```
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

## toRefs与toRef



### toRefs
- 作用：将一个响应式对象中的每一个属性，转换为`ref`对象。
- 备注：`toRefs`与`toRef`功能一致，但`toRefs`可以批量转换

```html
<template>
    <div class="person">
        <!-- <h2>姓名：{{ person.name }}</h2>
        <h2>年龄：{{ person.age }}</h2> -->
        <h2>姓名：{{ name }}</h2>
        <h2>年龄：{{ age }}</h2>
        <button @click="changeName">修改名字</button>
        <button @click="changeAge">修改年龄</button>
    </div>
</template>
<script lang="ts" setup name="Person">
    import { ref,reactive,toRefs,toRef} from 'vue'
    // 数据
   let person = reactive({
    name:'张张',
    age:18,
   })

   // 解构
   // let {name,age} = person   // 此时解构出来的name，age 不是响应式的

   // toRefs 将解构出来的值转成ref定义的变量
   let {name,age} = toRefs(person)
   // toRef 只能拿出单个属性的
   let nl = toRef(person,'age')
   console.log(nl.value)

    // 方法
    function changeName(){
        // person.name='丽丽' 
        name.value = '丽丽' 
    }
    function changeAge(){
        // person.age =19
        age.value = 19
    }
  

</script>
```

### toRef
- 作用：创建一个`ref`对象，其`value`值指向另一个对象中的某个属性。
- 语法：`const name = toRef(person,'name')`
- 应用：要将响应式对象中的某个属性单独提供给外部使用时。
- 扩展：`toRefs`与`toRef`功能一致，但可以批量创建多个`ref`对象，语法：`toRefs(person)`


不用toRef
```html
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
```html
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
```html
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