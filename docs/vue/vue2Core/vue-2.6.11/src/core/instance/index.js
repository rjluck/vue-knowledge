import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'


/** 
 * Vue类的定义非常简单，其构造函数核心就一行代码：this._init(options)
 * 
 */
function Vue(options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  // 调用原型上的_init(options)方法并把用户所写的选项options传入
  this._init(options)
}

initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

/**
 * 与数据相关的实例方法有3个，分别是vm.$set、vm.$delete和vm.$watch。它们是在stateMixin函数中挂载到Vue原型上的
 */

/**
 * 与事件相关的实例方法有4个，分别是vm.$on、vm.$emit、vm.$off和vm.$once。它们是在eventsMixin函数中挂载到Vue原型上的
 */


/**
 * 与生命周期相关的实例方法有4个，分别是vm.$mount、vm.$forceUpdate、vm.$nextTick和vm.$destory。
 * 其中，$forceUpdate和$destroy方法是在lifecycleMixin函数中挂载到Vue原型上的，
 * $nextTick方法是在renderMixin函数中挂载到Vue原型上的，
 * 而$mount方法是在跨平台的代码中挂载到Vue原型上的。
 */

/**
 * 与实例方法不同，实例方法是将方法挂载到Vue的原型上，而全局API是直接在Vue上挂载方法。
 * 在Vue中，全局API一共有12个，
 * 分别是Vue.extend、Vue.nextTick、Vue.set、Vue.delete、Vue.directive、Vue.filter、Vue.component、Vue.use、Vue.mixin、Vue.observable、Vue.version。
 */
export default Vue
