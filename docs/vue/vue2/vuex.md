# vuex

[[toc]]


![image](/imgs/vue/vuex1.png)
![image](/imgs/vue/vuex2.png)

## 定义

- 概念：专门在Vue中实现集中式状态（数据）管理的一个Vue插件，对Vue应用中多个组件的共享状态进行集中式的管理（读/写），也是一种组件间通信的方式，且适用于任意组件间通信。
- github地址：
- 什么时候使用vuex?
  - 多个组件依赖于同一状态
  - 来自不同组件的行为需要变更同一状态



## 工作原理图

![image](/imgs/vue/vuex3.png)

Actions（行为，{}）

Mutations（加工，{}）

State（状态数据对象，{}）


## 使用
- 安装 `npm i vuex`
- 使用插件 `Vue.use(Vuex)`
- 准备`store`

> 注意：
> vue2中，用vuex3版本
> vue3中，用vuex4版本

```js
// main.js
// 引入store
imprt store from './store/index'

// 创建vm
new Vue({
  el:"#app",
  render:h=>h(App),
  store,
})
```

创建store
```js
// store/index.js
// 该文件用于创建Vuex最为核心的store
import Vue from 'vue';
import Vuex from 'vuex';
// 使用插件
Vue.use(Vuex) //使用插件vuex后，创建vm实例就可以传入store


// 准备actions用于响应组件中的动作
const actions = {}
// 准备mutations用于操作数据state
const mutations = {}
// 准备state用于存储数据
const state = {}


const store = new Vuex.Store({
  actions,
  mutations,
  state
})

// 导出store
export default store;
```

举例：
- 组件中读取Vuex中的数据：`$store.state.sum`
- 组件中修改Vuex中的数据：`$store.dispatch('actions中的方法名',数据)` 或 `$store.commit('mutations中的方法名',数据)`
- 注意：若没有网络请求或其他业务逻辑，组件中也可以越过`actions`，即不写`dispatch`，直接写`commit`。
```js
// store/index.js
// 该文件用于创建Vuex最为核心的store
import Vue from 'vue';
import Vuex from 'vuex';
// 使用插件
Vue.use(Vuex) //使用插件vuex后，创建vm实例就可以传入store


// 准备actions用于响应组件中的动作
const actions = {
  // jia:function(){
  //   
  // }

  // 简写
  jiaOdd(context,value){
    
    if(context.state.sum %2){
       context.commit('JIAODD',value)
    }
   
  }
}
// 准备mutations用于操作数据state
const mutations = {
  JIA(state,value){
    
    state.sum += value;
  },
  JIAODD(state,value){
    
    state.sum += value;
  },
}
// 准备state用于存储数据
const state = {
  sum:0
}


const store = new Vuex.Store({
  actions,
  mutations,
  state
})

// 导出store
export default store;
```


```js
// 组件中
<div>求和：{{$store.state.sum}}</div>


methods:{
  increment(){
    this.$store.commit('JIA',2)
  },
  incrementOdd(){
    this.$store.dispatch('jiaOdd',2)
  }
}

```


## getters配置项
- 概念：当state中的数据需要经过加工后再使用时，可以使用getters加工。
- 类似于computed
- 在store中追加getters配置
```js
......
const getters = {
  bigSum(state){
    return state.sum * 10;
  }
}

export default new Vuex.Store({
  ......
  getters
})


```
- 组件中读取数据`$store.getters.bigSum`

举例：
```js
// store/index.js
// 该文件用于创建Vuex最为核心的store
import Vue from 'vue';
import Vuex from 'vuex';
// 使用插件
Vue.use(Vuex) //使用插件vuex后，创建vm实例就可以传入store


// 准备actions用于响应组件中的动作
const actions = {
  // jia:function(){
  //   
  // }

  // 简写
  jiaOdd(context,value){
    
    if(context.state.sum %2){
       context.commit('JIAODD',value)
    }
   
  }
}
// 准备mutations用于操作数据state
const mutations = {
  JIA(state,value){
    
    state.sum += value;
  },
  JIAODD(state,value){
    
    state.sum += value;
  },
}
// 准备state用于存储数据
const state = {
  sum:0
}

// 准备getters用于将state中的数据进行加工
const getters = {
  bigSum(state){
    return state.sum * 10;
  }
}


const store = new Vuex.Store({
  actions,
  mutations,
  state,
  getters
})

// 导出store
export default store;
```


```js
// 组件中
<div>求和：{{sum1}}</div>
<div>求和：{{sum2}}</div>


<div>求和放大10倍：{{bigSum}}</div>

methods:{
  increment(){
    this.$store.commit('JIA',2)
  },
  incrementOdd(){
    this.$store.dispatch('jiaOdd',2)
  }
}

```


## 四个map方法的使用

- `mapState`方法：用于帮助我们映射`state`中的数据为计算属性
```js
computed:{
  // 借助mapState生成计算属性：sum、school、subject（对象写法）
  ...mapState({sum:'sum',school:'school',subject:'subject'})

  // 借助mapState生成计算属性：sum、school、subject（数组写法）
  ...mapState(['sum','school','subject'])
}
```
- `mapGetters`方法：用于帮助我们映射`getters`中的数据为计算属性
```js
computed:{
  // 借助mapGetters生成计算属性：bigSum（对象写法）
  ...mapGetters({bigSum:'bigSum'})

  // 借助mapGetters生成计算属性：bigSum（数组写法）
  ...mapGetters(['bigSum'])
}
```
- `mapActions`方法：用于帮助我们生成与actions对话的方法，即：包含`$store.dispatch(xxx)`的函数。
```js
methods:{
  // 靠mapActions生成：incrementOdd、incrementWait（对象写法）
  ...mapActions({incrementOdd:'jiaOdd',incrementWait:'jiaWait'})

  // 靠mapActions生成：incrementOdd、incrementWait（数组写法）
  ...mapActions(['jiaOdd','jiaWait'])
}
```
- `mapMutations`方法：用于帮助我们生成与mutations对话的方法，即：包含`$store.commit(xxx)`的函数。
```js
methods:{
  // 靠mapMutations生成：incrementOdd、incrementWait（对象写法）
  ...mapMutations({increment:'JIA',decrement:'JIAN'})

  // 靠mapActions生成：incrementOdd、incrementWait（数组写法）
  ...mapMutations(['JIA','JIAN'])
}
```

> 备注：mapActions与mapMutations使用时，若需要传递参数需要在模板中绑定事件时传递好参数，否则参数是事件对象。


### mapState与mapGetters
```html
// 组件中
<div>求和：{{$store.state.sum1}}</div>
<div>求和：{{$store.state.sum2}}</div>
<div>求和放大10倍：{{$store.getters.bigSum}}</div>

<script>
import {mapState,mapGetters} from 'vuex'
export default{
  computed:{
    // 靠程序员自己亲自去写计算属性
    // he(){
    //   return this.$store.state.sum1
    // },
    // he2(){
    //   return this.$store.state.sum2
    // },

    // 借助mapState生成计算属性，从state中读取数据。（对象写法）
    // ...mapState({he:'sum1',he2:'sum2'})



    // sum1(){
    //   return this.$store.state.sum1
    // },
    // sum2(){
    //   return this.$store.state.sum2
    // },

    // 借助mapState生成计算属性，从state中读取数据。（数组写法）
    ...mapState(['sum1','sum2'])


    // 借助mapGetters生成计算属性，从getters中读取数据。（数组写法）
    ...mapGetters(['bigSum'])

  },
  mounted(){

  },
  methods:{
    increment(){
      this.$store.commit('JIA',2)
    },
    incrementOdd(){
      this.$store.dispatch('jiaOdd',2)
    }
  }
}
</script>
```

### mapActions与mapMutations
```html
// 组件中
<button @click="increment(n)">+</button>
<button @click="decrement(n)">-</button>

<script>
import {mapMutations,mapActions} from 'vuex'
export default{
  data(){
    return{
      n:1
    }
  }
  methods:{
    // increment(){
    //   this.$store.commit('JIA',2)
    // },
    // decrement(){
    //   this.$store.commit('JIAN',2)
    // },

    // 经过map生成的结构是
    // increment(value){
    //   this.$store.commit('JIA',value)
    // },
    // decrement(value){
    //   this.$store.commit('JIAN',value)
    // },

    // 借助mapMutations生成对应的方法，方法中会调用commit去联系mutations（对象写法）
    ...mapMutations({increment:'JIA',decrement:'JIAN'})
    // 借助mapMutations生成对应的方法，方法中会调用commit去联系mutations（数组写法）
    // ...mapMutations(['JIA','JIAN'])



    // incrementOdd(){
    //   this.$store.dispatch('jiaOdd',2)
    // },
    // incrementWait(){
    //   this.$store.dispatch('jiaWait',2)
    // }

    // 借助mapActions生成对应的方法，方法中会调用dispatch去联系actions（对象写法）
    ...mapActions({incrementOdd:'jiaOdd',incrementWait:'jiaWait'})
  }
}
</script>
```


## vuex模块化+命名空间
- 目的：让代码更好维护，让多种数据分类更加明确。
- 修改`store.js`
```js
// 求和功能相关配置
const countOptions = {
  namespaced:true,// 命名空间，为true,mapState才能认识countAbout
  actions:{},
  mutations:{},
  state:{},
  getters:{}
}

// 人员管理功能相关配置
const personsOptions = {
  namespaced:true,// 命名空间，为true,mapState才能认识personAbout
  actions:{},
  mutations:{},
  state:{},
  getters:{}
}

const store = new Vuex.Store({
  modules:{
    countAbout:countOptions,
    personAbout:personsOptions
  }
})
```
- 开启命名空间后，组件中读取`state`数据
```js
// 方式1：自己直接读取
this.$store.state.personAbout.list

// 方式2：借助mapState
...mapState('personAbout',['sum','school'])
```
- 开启命名空间后，组件中读取`getters`数据
```js
// 方式1：自己直接读取
this.$store.getters['personAbout/firstPersonName']

// 方式2：借助mapGetters
...mapGetters('personAbout',['bigSum'])
```
- 开启命名空间后，组件中调用`dispatch`
```js
// 方式1：自己直接dispatch
this.$store.dispatch('personAbout/addPerson',person)

// 方式2：借助mapActions
...mapActions('countAbout',{incrementOdd:'jiaOdd',incrementWait:'jiaWait'})
```
- 开启命名空间后，组件中调用`commit`
```js
// 方式1：自己直接commit
this.$store.commit('personAbout/ADD_PERSON',person)

// 方式2：借助mapMutations
...mapMutations('countAbout',{increment:'JIA',decrement:'JIAN'})
```

- 举例如下：



创建store
```js
// store/index.js
// 该文件用于创建Vuex最为核心的store
import Vue from 'vue';
import Vuex from 'vuex';
// 使用插件
Vue.use(Vuex) //使用插件vuex后，创建vm实例就可以传入store


// 求和功能相关配置
const countOptions = {
  namespaced:true,// 命名空间，为true,mapState才能认识countAbout
  actions:{},
  mutations:{},
  state:{},
  getters:{}
}

// 人员管理功能相关配置
const personsOptions = {
  namespaced:true,// 命名空间，为true,mapState才能认识personAbout
  actions:{
    addPersonWang(context,value){
      if(value.name.indexOf('王') === 0){
        context.commit('ADD_PERSON',value)
      }
    }
  },
  mutations:{
    ADD_PERSON(state,value){
      state.personList.unshift(value)
    }
  },
  state:{
    personList:[{id:'001',name:'ccc'}]
  },
  getters:{
    firstPersonName(state){
      return state.personList[0].name;
    }
  }
}



const store = new Vuex.Store({
  modules:{
    countAbout:countOptions,
    personAbout:personsOptions
  }
})

// 导出store
export default store;
```

```html
<h1>{{sum}}</h1>
```


```html
// 组件中
<div>求和：{{sum1}}</div>
<div>求和：{{sum2}}</div>
<div>求和放大10倍：{{bigSum}}</div>

<script>
import {mapState,mapGetters} from 'vuex'
export default{
  computed:{
    // 借助mapState生成计算属性，从state中读取数据。（数组写法）
    ...mapState('countAbout',['sum1','sum2'])
    ...mapState('personAbout',['personList'])

    // 借助mapGetters生成计算属性，从getters中读取数据。（数组写法）
    ...mapGetters('countAbout',['bigSum'])

  },
  mounted(){

  },
  methods:{
    // increment(){
    //   this.$store.commit('JIA',2)
    // },
    // incrementOdd(){
    //   this.$store.dispatch('jiaOdd',2)
    // }
    ...mapMutations('countAbout',{increment:'JIA',decrement:'JIAN'})
    ...mapActions('countAbout',{incrementOdd:'jiaOdd',incrementWait:'jiaWait'})
  }
}
</script>
```

不用map的写法
```js
computed:{
  personList(){
    return this.$store.state.personAbout.personList
  },
  sum(){
    return this.$store.state.countAbout.sum
  },
  firstPersonName(){
    return this.$store.getters[personAbout/firstPersonName]
  }
},
methods:{
  add(){
    const personObj = {}
    this.$store.commit('personAbout/ADD_PERSON',personObj)
  },
  addWang(){
     const personObj = {}
      this.$store.dispatch('personAbout/addPersonWang',personObj)
  }
}





```
