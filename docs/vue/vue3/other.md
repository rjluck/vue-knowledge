# 其他

[[toc]]

## 全局API的转移
- Vue2有许多全局API和配置。
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

- Vue3中对这些API做出了调整
  - 将全局的API，即`Vue.xxx`调整到应用实例`app`上


2.x全局API（`Vue`）|3.x实例API（`app`）
---|:--:
Vue.config.xxxx|app..config.xxxx
Vue.config.productionTip|移除
Vue.component|app.component
Vue.directive|app.directive
Vue.mixin|app.mixin
Vue.use|app.use
Vue.prototype|app.config.globalProperties



## 其他改变
- data选项应始终被声明为一个函数。
- 过度类名的更改
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
- 移除keyCode作为`v-on`的修饰符，同时也不再支持`config.keyCodes`(兼容性不好)
  - eg:`@keyup.13`
- 移除`v-on.native`修饰符
  - 父组件中绑定事件
  ```js
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

- 移除过滤器（filter）

过滤器虽然看起来很方便，但它需要一个自定义语法，打破了大括号内表达式是“只是javascript”的假设，这不仅仅有学习成本，而且有实现成本！建议用方法调用或计算属性去替换过滤器。

- ......