# 其他

[[toc]]

## 全局API的转移
- `Vue2`有许多全局API和配置。
   - 例如：注册全局组件、注册全局指令等。
   ```js
   // 注册全局组件
   Vue.component('MyaButton',{
     data:()=>({
       count:0
     }),
     template:`<button @click="count++">Clicked {{count}} </button>`
   })


   // 注册全局指令
   Vue.directive('focus',{
     inserted:el => el.focus()
   })
   ```

- `Vue3`中对这些`API`做出了调整
  - 将全局的`API`，即`Vue.xxx`调整到应用实例`app`上


| `2.x`全局API（`Vue`）          |    `3.x`实例API（`app`）    |
| ------------------------------ | :-------------------------: |
| Vue.config.xxxx                |       app.config.xxxx       |
| Vue.config.productionTip       |            移除             |
| Vue.component（注册全局组件）  |        app.component        |
| Vue.directive （注册全局指令） |        app.directive        |
| Vue.mixin                      |          app.mixin          |
| Vue.use (全局注册插件)         |           app.use           |
| Vue.prototype                  | app.config.globalProperties |





- app.component
- app.config
- app.directive
- app.mount
- app.unmount
- app.use


main.ts
```ts
import {createApp} from 'vue'
import App from './App.vue'
import Hello from './Hello.vue'

//创建应用
const app = createApp(App)

// 注册全局组件
app.component('Hello')

// 注册全局指令
app.directive('beauty',(element,{value})=>{
  element.innerText += value
  element.style.color = 'green'
  element.style.backgroundColor = 'yellow'
})

// Vue.prototype.x =9
app.config.globalProperties.x =9
// 加以下配置，编辑器就不会爆红
declare module 'vue' {
  interface ComponentCustomProperties{
    x:number
  }
}




// 挂载应用
app.mount('#app')
```




## 非兼容性改变

官网说明：https://v3-migration.vuejs.org/zh/breaking-changes/


- data选项应始终被声明为一个函数。
- 过度类名的更改,`v-enter`修改为`v-enter-from`、`v-leave`修改为`v-leave-from`
  - vue2写法
  ```css
  .v-enter,
  .v-leave-to{
    opacity:0;
  }

  .v-leave,
  .v-enter-to{
    opacity:1;
  }
  ```
  - vue3写法
  ```css
  .v-enter-from,
  .v-leave-to{
    opacity:0;
  }

  .v-leave-from,
  .v-enter-to{
    opacity:1;
  }
  ```
- `v-if`和`v-for`在同一个元素身上使用时的优先级发生了变化。
  - vue2中，`v-if`和`v-for`不可以用在一个标签上，因为`v-for`比`v-if`优先级高
  - vue3中，`v-if`和`v-for`可以用在一个标签上，`v-for`比`v-if`优先级低
- `v-model`指令在组件上的使用已经被重新设计，替换掉了`v-bind.sync`
- 移除`keyCode`作为`v-on`的修饰符，同时也不再支持`config.keyCodes`(兼容性不好)
  - eg:`@keyup.13`
- 移除`v-on.native`修饰符
  - 父组件中绑定事件
```html
  <my-component
    v-on:close="handleComponentEvent"
    v-on:click="handleNativeClickEvent"
  />
```
  - 子组件中声明自定义事件
```js
 export default {
   emits:['close']  // 指定了就是自定义事件，否则默认就是原生事件
 }
```

- 移除了`$on`、`$off`、和`$once`实例方法。
- 移除了`$children`实例`propert`。
- 移除了过滤器（`filter`）

过滤器虽然看起来很方便，但它需要一个自定义语法，打破了大括号内表达式是“只是javascript”的假设，这不仅仅有学习成本，而且有实现成本！建议用方法调用或计算属性去替换过滤器。

- ......