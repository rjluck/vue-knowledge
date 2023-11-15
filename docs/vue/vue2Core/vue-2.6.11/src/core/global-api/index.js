/* @flow */

import config from '../config'
import { initUse } from './use'
import { initMixin } from './mixin'
import { initExtend } from './extend'
import { initAssetRegisters } from './assets'
import { set, del } from '../observer/index'
import { ASSET_TYPES } from 'shared/constants'
import builtInComponents from '../components/index'
import { observe } from 'core/observer/index'

import {
  warn,
  extend,
  nextTick,
  mergeOptions,
  defineReactive
} from '../util/index'

/**
 * 与实例方法不同，实例方法是将方法挂载到Vue的原型上，而全局API是直接在Vue上挂载方法。
 * 在Vue中，全局API一共有12个，
 * 分别是Vue.extend、Vue.nextTick、Vue.set、Vue.delete、Vue.directive、
 * Vue.filter、Vue.component、Vue.use、Vue.mixin、Vue.observable、Vue.version。
 * 
 * (1) Vue.extend
 * 位于源码的src/core/global-api/extend.js中
 * 
 */

export function initGlobalAPI(Vue: GlobalAPI) {
  // config
  const configDef = {}
  configDef.get = () => config
  if (process.env.NODE_ENV !== 'production') {
    configDef.set = () => {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      )
    }
  }
  Object.defineProperty(Vue, 'config', configDef)

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn,
    extend,
    mergeOptions,
    defineReactive
  }

  Vue.set = set
  Vue.delete = del
  Vue.nextTick = nextTick

  // 2.6 explicit observable API
  Vue.observable = <T>(obj: T): T => {
    observe(obj)
    return obj
  }
  </T>

  // 通过 Vue.options = Object.create(null) 创建一个空对象，然后遍历 ASSET_TYPES
  Vue.options = Object.create(null)
  ASSET_TYPES.forEach(type => {
    Vue.options[type + 's'] = Object.create(null)
  })

  // 所以上面遍历 ASSET_TYPES 后的代码相当于：
  // Vue.options.components = {}
  // Vue.options.directives = {}
  // Vue.options.filters = {}

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue


  // 最后通过 extend(Vue.options.components, builtInComponents) 把一些内置组件扩展到 Vue.options.components 上，
  // Vue 的内置组件目前 有<keep-alive>、<transition> 和<transition-group> 组件，这也就是为什么我们在其它组件中使用这些组件不需要注册的原因。
  extend(Vue.options.components, builtInComponents)

  initUse(Vue)
  initMixin(Vue)
  initExtend(Vue)

  // Vue.directive、Vue.filter和Vue.component
  initAssetRegisters(Vue)
}
