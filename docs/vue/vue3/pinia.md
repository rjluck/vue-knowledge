# pinia

[[toc]]

- 官网：https://pinia.vuejs.org

## 概念

  `Pinia` 是 `Vue` 的存储库，它允许跨组件/页面共享状态。实际上，`pinia`就是`Vuex`的升级版，官网也说过，为了尊重原作者，所以取名`pinia`，而没有取名`Vuex`，所以大家可以直接将`pinia`比作为`Vue3`的`Vuex`。


  - 集中式状态（数据）管理。


## 搭建pinia环境

- 安装包管理器pinia
```
yarn add pinia
# 或者使用 npm
npm install pinia
```

- 创建一个 pinia 实例 (根 store) 并将其传递给应用：
```ts
// 引入 createApp 用于创建应用
import { createApp } from 'vue'

// 引入App根组件
import App from './App.vue'

// 引入路由器
import router from './router'
// 引入pinia
import { createPinia } from 'pinia'


// 创建一个应用
const app = createApp(App)
// 使用路由器
app.use(router)


// 创建pinia
const pinia = createPinia()
// 安装pinia
app.use(pinia)


// 挂载整个应用到app容器中
app.mount('#app')
```


## 存储+读取数据

> 自己直接定义的ref数据，需要通过`.value`获取，被`reactive`包裹的对象里的值若是`ref`值,就不需要通过`.value`获取

- `Store`是一个保存：状态、业务逻辑的实体，每个组件都可以读取、写入它。
- 它有三个概念：`state`、`getter`、`action`,相当于组件中的`state`、`computed`、`methods`。

## 存储数据

具体编码：`src/store/count.ts`
```ts
// 引入defineStore用于创建Store
import { defineStore } from 'pinia';

// 定义并暴露一个Store
export const useCountStore = defineStore('count', {
    // 真正存储数据的地方
    // 状态
    state() {
        return {
            sum: 8
        }
    },
    // 计算
    getters:{},
    // 动作
    actions:{}
})
```

具体编码：`src/store/loveTalk.ts`
```ts
import { defineStore } from 'pinia';
import { reactive } from 'vue';

export const useTalkStore = defineStore('loveTalk', {
    // 真正存储数据的地方
    state() {
        return {
            talkList: reactive([{ id: 'www01', title: '111' }])
        }
    }
})
```

### 读取数据

具体编码：`src/components/Count.vue`
```html
<template>
  <div class="count">
    <h2>当前求和为：{{countStore.sum}}</h2>
    <select v-model.number="n">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <button @click="add">加</button>
    <button @click="sub">减</button>
  </div>
</template>
<script lang="ts" setup name="Count">
import { ref } from 'vue';
import { useCountStore } from '@/store/count';

const countStore = useCountStore();
// 以下两种方式都可以拿到数据
console.log('countStore: ', countStore.sum);
console.log('countStore: ', countStore.$state.sum);

</script>
<style scoped>
.count {
  background-color: skyblue;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 10px;
}

select,
button {
  height: 25px;
  margin: 0 5px;
}
</style>
```


具体编码：`src/components/LoveTalk.vue`
```html
<template>
  <div class="talk">
    <button @click="getLoveTalk">获取一句情话</button>
    <ul>
      <li
        v-for="item in talkStore.talkList"
        :key="item.id"
      >{{item.title}}</li>
    </ul>
  </div>
</template>
<script lang="ts" setup name="LoveTalk">
import { useTalkStore } from '@/store/loveTalk';
const talkStore = useTalkStore();

//
// 以下两种方式都可以拿到数据
console.log('countStore: ', talkStore.talkList);
console.log('countStore: ', talkStore.$state.talkList);
</script>
<style scoped>
.talk {
  background-color: orange;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 10px;
}
</style>
```








## 修改数据



### 直接修改
```js
countStore.sum = 666
```

eg:
```html
<template>
  <div class="count">
    <h2>当前求和为：{{countStore.sum}}</h2>
    <select v-model.number="n">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <button @click="add">加</button>
    <button @click="sub">减</button>
  </div>
</template>
<script lang="ts" setup name="Count">
import { ref } from 'vue';
import { useCountStore } from '@/store/count';

const countStore = useCountStore();
// 以下两种方式都可以拿到数据
console.log('countStore: ', countStore.sum);
console.log('countStore: ', countStore.$state.sum);

// 第一种方式：直接修改
function add() {
  countStore.sum += 1;
}
</script>
<style scoped>
.count {
  background-color: skyblue;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 10px;
}

select,
button {
  height: 25px;
  margin: 0 5px;
}
</style>
```



### 批量修改
```js
countStore.$patch = ({
    sum:999,
    school:'xixi'
})
```

eg:
```html
<template>
  <div class="count">
    <h2>当前求和为：{{countStore.sum}}</h2>
    <h2>学校：{{countStore.school}}</h2>
    <h2>地址：{{countStore.address}}</h2>
    <select v-model.number="n">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <button @click="add">加</button>
    <button @click="sub">减</button>
  </div>
</template>
<script lang="ts" setup name="Count">
import { ref } from 'vue';
import { useCountStore } from '@/store/count';
const countStore = useCountStore();

// 以下两种方式都可以拿到数据
console.log('countStore: ', countStore.sum);
console.log('countStore: ', countStore.$state.sum);

// 方法
function add() {
  countStore.$patch({
    sum: 888,
    school: '小学',
    address: '北京'
  });
}
</script>
<style scoped>
.count {
  background-color: skyblue;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 10px;
}

select,
button {
  height: 25px;
  margin: 0 5px;
}
</style>
```




### 借助action修改

- `actions`中可以编写一些业务逻辑

store/count.ts
```ts
import { defineStore } from 'pinia';
export const useCountStore = defineStore('count', {
    // 真正存储数据的地方
    state() {
        return {
            sum: 8,
            school: '大学',
            address: '地址'
        }
    },
    // 动作函数
    actions: {
        increment(value) {
            // 修改数据（this是当前的store）
            // this.sum += value

            if (this.sum < 10) {
                this.sum += value
            }
        }
    }
})
```

components/Count.vue
```html
<template>
  <div class="count">
    <h2>当前求和为：{{countStore.sum}}</h2>
    <h2>学校：{{countStore.school}}</h2>
    <h2>地址：{{countStore.address}}</h2>
    <select v-model.number="n">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <button @click="add">加</button>
    <button @click="sub">减</button>
  </div>
</template>
<script lang="ts" setup name="Count">
import { ref } from 'vue';
import { useCountStore } from '@/store/count';

// 数据
let n = ref(1);
const countStore = useCountStore();

// 以下两种方式都可以拿到数据
console.log('countStore: ', countStore.sum);
console.log('countStore: ', countStore.$state.sum);

// 方法
function add() {
  countStore.increment(n.value);
}
</script>
<style scoped>
</style>
```







## storeToRefs

- 作用：通过解构的语法，将获取到的`Store`中的数据，转换成响应式的`ref`数据
- 注意：
  - 用`toRefs`可以实现，但是代价有点大，它会把`Store`中的方法转换`ref`数据
  - 用`pinia`中的`storeToRefs`，只会将`Store`中的`state`转换成`ref`数据，不会对方法进行`ref`包裹,所以这个是合适的。

正常获取
```html
<template>
  <div class="count">
    <h2>当前求和为：{{countStore.sum}}</h2>
    <h2>学校：{{countStore.school}}</h2>
    <h2>地址：{{countStore.address}}</h2>
    <select v-model.number="n">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <button @click="add">加</button>
    <button @click="minus">减</button>
  </div>
</template>
<script lang="ts" setup name="Count">
import { ref, toRefs } from 'vue';
import { useCountStore } from '@/store/count';

// 数据
let n = ref(1);

const countStore = useCountStore();

// 方法
function add() {
  countStore.increment(n.value);
}

function minus() {
  countStore.sum -= n.value;
}

</script>
<style scoped>
</style>
```

解构获取
```html
<template>
  <div class="count">
    <h2>当前求和为：{{sum}}</h2>
    <h2>学校：{{school}}</h2>
    <h2>地址：{{address}}</h2>
    <select v-model.number="n">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <button @click="add">加</button>
    <button @click="minus">减</button>
  </div>
</template>
<script lang="ts" setup name="Count">
import { ref, toRefs } from 'vue';
import { useCountStore } from '@/store/count';
import { storeToRefs } from 'pinia';

// 数据
let n = ref(1);

const countStore = useCountStore();

// 以下两种方式都可以拿到数据
// console.log('countStore: ', countStore.sum);
// console.log('countStore: ', countStore.$state.sum);

// 这样解构出来不是响应式的
// const { sum, school, address } = countStore;

// 用toRefs可以实现，但是代价有点大，它会把Store中的方法转换ref数据
// const { sum, school, address } = toRefs(countStore);

// storeToRefs只会关注store中的数据，不会对方法进行ref包裹
// 用pinia中的storeToRefs，只会将Store中的state转换成ref数据，所以这个是合适的
const { sum, school, address } = storeToRefs(countStore);

// 方法
function add() {
  countStore.increment(n.value);
}

function minus() {
  countStore.sum -= n.value;
}
</script>
<style scoped>

</style>
```





## getters

- 概念：当`state`中的数据，需要经过处理后再使用时，可以使用`getters`配置。
  


store/count.ts
```ts
import { defineStore } from 'pinia';

export const useCountStore = defineStore('count', {
    // 真正存储数据的地方
    state() {
        return {
            sum: 8,
            school: '大学',
            address: '地址'
        }
    },
    // 动作函数
    actions: {
        increment(value: number) {
            // 修改数据（this是当前的store）
            // this.sum += value
            if (this.sum < 10) {
                this.sum += value
            }
        }
    },
    getters: {
        // this是当前的store
        // bigSum(state) {
        //     return state.sum * 10
        // },
        // 当不需要this的时候，可以写箭头函数
        bigSum: state => state.sum * 10,
        upperSchool(state) {
            // return state.school.toUpperCase()
            return this.school.toUpperCase()
        }
    }
})
```

components/Count.vue
```html
<template>
  <div class="count">
    <h2>当前求和为：{{sum}}</h2>
    <h2>当前求和放大10倍后：{{bigSum}}</h2>
    <h2>学校：{{school}}</h2>
    <h2>地址：{{address}}</h2>
    <select v-model.number="n">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <button @click="add">加</button>
    <button @click="minus">减</button>
  </div>
</template>
<script lang="ts" setup name="Count">
import { ref, toRefs } from 'vue';
import { useCountStore } from '@/store/count';
import { storeToRefs } from 'pinia';

// 数据
let n = ref(1);

const countStore = useCountStore();
const { sum, school, address, bigSum, upperSchool } = storeToRefs(countStore);

// 方法
function add() {
  countStore.increment(n.value);
}

function minus() {
  countStore.sum -= n.value;
}
</script>
<style scoped>
</style>
```






## $subscribe

- 监听`Store`中数据变化，类似于`watch`。
  
components/LoveTalk.vue
```html
<template>
  <div class="talk">
    <button @click="getLoveTalk">获取一句情话</button>
    <ul>
      <li
        v-for="item in talkStore.talkList"
        :key="item.id"
      >{{item.title}}</li>
    </ul>
  </div>
</template>
<script lang="ts" setup name="LoveTalk">
import { useTalkStore } from '@/store/loveTalk';
import { storeToRefs } from 'pinia';

const talkStore = useTalkStore();
const { talkList } = storeToRefs(talkStore);

// 订阅
// mutate 本次修改信息
// state 真正的数据
talkStore.$subscribe((mutate, state) => {
  // talkStore里面保存的数据发生的变化
  localStorage.setItem('talkList', JSON.stringify(state.talkList));
});

// 方法
function getLoveTalk() {
  talkStore.getATalk();
}
</script>
<style scoped>
.talk {
  background-color: orange;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 10px;
}
</style>
```


store/loveTalk.ts
```ts
import { defineStore } from 'pinia';
import { reactive } from 'vue';
import axios from 'axios';
import { nanoid } from 'nanoid';
export const useTalkStore = defineStore('loveTalk', {
    // 真正存储数据的地方
    state() {
        return {
            talkList: JSON.parse(localStorage.getItem('talkList') as string) || []
        }
    },
    actions: {
        async getATalk() {
            let result = await axios.get('https://api.uomg.com/api/rand.qinghua?format=%27json%27');
            console.log('result: ', result.data.content);
            this.talkList.unshift({ id: nanoid(), title: result.data.content });
        }
    }
})
```



## store写法

> actions和getters中的 this都是当前的store


### store选项式写法

store/count.ts
```ts
import { defineStore } from 'pinia';

export const useCountStore = defineStore('count', {
    // 真正存储数据的地方
    state() {
        return {
            sum: 8,
            school: '大学',
            address: '地址'
        }
    },
    // 动作函数
    actions: {
        increment(value: number) {
            console.log('increment: ', value);
            console.log('1', this.sum);
            // 修改数据（this是当前的store）
            // this.sum += value

            if (this.sum < 10) {
                this.sum += value
            }
        }
    },
    getters: {
        // this是当前的store
        bigSum: state => state.sum * 10,
        upperSchool(state) {
            // return state.school.toUpperCase()
            return this.school.toUpperCase()
        }
    }
})
```
store/count.ts


store/loveTalk.ts
```ts
import { defineStore } from 'pinia';
import { reactive } from 'vue';
import axios from 'axios';
import { nanoid } from 'nanoid';
export const useTalkStore = defineStore('loveTalk', {
    // 真正存储数据的地方
    state() {
        return {
            // talkList: reactive([{ id: 'www01', title: '111' }])
            talkList: JSON.parse(localStorage.getItem('talkList') as string) || []
        }
    },
    actions: {
        async getATalk() {
            let result = await axios.get('https://api.uomg.com/api/rand.qinghua?format=%27json%27');
            console.log('result: ', result.data.content);
            this.talkList.unshift({ id: nanoid(), title: result.data.content });
        }
    }
})
```


### store组合式写法

store/count.ts
```ts
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useCountStore = defineStore('count', () => {
    let sum: any = ref(8)
    let school: any = ref('zsdff')
    let address = ref('地址')

    function increment(value: number) {
        console.log('value: ', value);
        if (sum.value < 10) {
            sum.value += value
        }
    }

    let bigSum = computed(() => {
        return sum.value * 10
    })

    const upperSchool = computed(() => {
        console.log('school.value: ', school.value);
        return school.value.toUpperCase()
    })


    return {
        sum,
        school,
        address,
        increment,
        bigSum,
        upperSchool
    }
})
```

store/loveTalk.ts
```ts
import { defineStore } from 'pinia';
import { reactive } from 'vue';
import axios from 'axios';
import { nanoid } from 'nanoid';
export const useTalkStore = defineStore('loveTalk', () => {
    // 数据 相当于state
    const talkList = reactive(JSON.parse(localStorage.getItem('talkList') as string) || [])

    // getATalk函数相当于 action
    async function getATalk() {
        let result = await axios.get('https://api.uomg.com/api/rand.qinghua?format=%27json%27');
        console.log('result: ', result.data.content);
        talkList.unshift({ id: nanoid(), title: result.data.content });
    }

    // 需要暴露出去
    return {
        talkList,
        getATalk
    }
})
```