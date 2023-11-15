/* @flow */

import config from '../config'
import { initProxy } from './proxy'
import { initState } from './state'
import { initRender } from './render'
import { initEvents } from './events'
import { mark, measure } from '../util/perf'
// callHook函数触发钩子函数
import { initLifecycle, callHook } from './lifecycle'
import { initProvide, initInjections } from './inject'
import { extend, mergeOptions, formatComponentName } from '../util/index'

let uid = 0

/** 
 * 可以看到，在initMixin函数内部就只干了一件事，
 * 那就是给Vue类的原型上绑定_init方法，同时_init方法的定义也在该函数内部。
 * 
 * 
 * 现在我们知道new Vue()会执行Vue类的构造函数，构造函数内部会执行_init方法，
 * 所以new Vue()所干的事情其实就是_init方法所干的事情，那么我们着重来分析下_init方法都干了哪些事情。
 * 
 * 分析了new Vue()时其内部都干了些什么。
 * 其主要逻辑就是：合并配置，调用一些初始化函数，触发生命周期钩子函数，调用$mount开启下一个阶段。
 * 
 */
export function initMixin(Vue: Class<Component>) {
  Vue.prototype._init = function (options?: Object) {
    const vm: Component = this  // Vue实例赋值给变量vm
    // a uid
    vm._uid = uid++

    let startTag, endTag
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      startTag = `vue-perf-start:${vm._uid}`
      endTag = `vue-perf-end:${vm._uid}`
      mark(startTag)
    }

    // a flag to avoid this being observed
    vm._isVue = true
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options)
    } else {
      // 把用户传递的options选项与当前构造函数的options属性及其父级构造函数的options属性进行合并,
      // 得到一个新的options选项赋值给$options属性，并将$options属性挂载到Vue实例上
      // mergeOptions 实际上就是把 resolveConstructorOptions(vm.constructor) 的返回值和 options 做合并
      // resolveConstructorOptions(vm.constructor) 可简单理解为返回 vm.constructor.options，相当于 Vue.options
      // 那么这个 Vue.options又是什么呢，其实在 initGlobalAPI(Vue) 的时候定义了这个值，代码在 src/core/global-api/index.js 中
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      )
    }
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm)
    } else {
      vm._renderProxy = vm
    }


    // expose real self
    /**
     * 接着，通过调用一些初始化函数来为Vue实例初始化一些属性，事件，响应式数据等
     * 
     * 除了调用初始化函数来进行相关数据的初始化之外，还在合适的时机调用了callHook函数来触发生命周期的钩子
     */
    vm._self = vm
    /**  
     * 初始化生命周期，主要是给Vue实例上挂载了一些属性并设置了默认值
     */
    initLifecycle(vm)

    /** 
     * 在Vue中，当我们在父组件中使用子组件时可以给子组件上注册一些事件，这些事件即包括使用v-on或@注册的自定义事件，也包括注册的浏览器原生事件（需要加 .native 修饰符）
     * 不管是什么事件，当子组件（即实例）在初始化的时候都需要进行一定的初始化
     * 先从解析事件开始说起，回顾之前的模板编译解析中，当遇到开始标签的时候，除了会解析开始标签，
     * 还会调用processAttrs 方法解析标签中的属性，processAttrs 方法位于源码的 src/compiler/parser/index.js中
      *
      *
      * 父组件既可以给子组件上绑定自定义事件，也可以绑定浏览器原生事件。
      * 这两种事件有着不同的处理时机，浏览器原生事件是由父组件处理，而自定义事件是在子组件初始化的时候由父组件传给子组件，再由子组件注册到实例的事件系统中。
      * 
      * 也就是说：初始化事件函数initEvents实际上初始化的是父组件在模板中使用v-on或@注册的监听子组件内触发的事件。
      */
    initEvents(vm)  // 初始化事件，初始化实例的事件系统

    initRender(vm) // 初始化渲染
    callHook(vm, 'beforeCreate')  // 调用生命周期钩子函数

    /** 
     * initInjections。从函数名字上来看，该函数是用来初始化实例中的inject选项的。
     * 说到inject选项，那必然离不开provide选项，这两个选项都是成对出现的，
     * 它们的作用是：允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在起上下游关系成立的时间里始终生效。 
     * 并且provide 选项应该是一个对象或返回一个对象的函数。
     * 
     * 
     * 注意：provide 和 inject 选项绑定的数据不是响应式的。
     * 
     * 为什么在init函数中调用initInjections函数和initProvide函数之间穿插一个initState函数呢？
     * 
     * provide选项注入的值作为数据入口,如下：
     * var Parent = {
        provide: {
          foo: 'bar'
        },
        // ...
      }
     * 
     * const Child = {
        inject: ['foo'],
        data () {
          return {
            bar: this.foo
          }
        }
      }
     * 这里所说的数据就是我们通常所写data、props、watch、computed及method，所以inject选项接收到注入的值有可能被以上这些数据所使用到，
     * 所以在初始化完inject后需要先初始化这些数据，然后才能再初始化provide，
     * 所以在调用initInjections函数对inject初始化完之后需要先调用initState函数对数据进行初始化，最后再调用initProvide函数对provide进行初始化。
     * 
     * */
    initInjections(vm) // resolve injections before data/props 

    /**
     * initState。 从函数名字上来看，这个函数是用来初始化实例状态的，那么什么是实例的状态呢？
     * 
     * 在我们日常开发中，在Vue组件中会写一些如props、data、methods、computed、watch选项，我们把这些选项称为实例的状态选项。
     * 也就是说，initState函数就是用来初始化这些状态的
     * 
     * 这5个选项的初始化顺序不是任意的，而是经过精心安排的。
     * 只有按照这种顺序初始化我们才能在开发中在data中可以使用props，在watch中可以观察data和props。
     * 
     * 这5个选项中的所有属性最终都会被绑定到实例上，这也就是我们为什么可以使用this.xxx来访问任意属性。
     * 同时正是因为这一点，这5个选项中的所有属性名都不应该有所重复，这样会造成属性之间相互覆盖。
     */
    initState(vm)  // 该初始化函数内部总共初始化了5个选项，分别是：props、methods、data、computed和watch。
    initProvide(vm) // resolve provide after data/props  // 初始化 provide
    callHook(vm, 'created')  // 调用生命周期钩子函数

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false)
      mark(endTag)
      measure(`vue ${vm._name} init`, startTag, endTag)
    }

    /**  
     * 在所有的初始化工作都完成以后，最后，会判断用户是否传入了el选项，
     * 如果传入了则调用$mount函数进入模板编译与挂载阶段，
     * 如果没有传入el选项，则不进入下一个生命周期阶段，需要用户手动执行vm.$mount方法才进入下一个生命周期阶段。
     * 
     * vm.$mount方法，该方法的调用标志着初始化阶段的结束和进入下一个阶段，
     * 从官方文档给出的生命周期流程图中可以看到，下一个阶段就进入了模板编译阶段，
     * 该阶段所做的主要工作是获取到用户传入的模板内容并将其编译成渲染函数。
     */
    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
    /**
     * 模板编译阶段并不是存在于Vue的所有构建版本中，它只存在于完整版（即vue.js）中。
     * 在只包含运行时版本（即vue.runtime.js）中并不存在该阶段，
     * 这是因为当使用vue-loader或vueify时，*.vue文件内部的模板会在构建时预编译成渲染函数，所以是不需要编译的，
     * 从而不存在【模板编译阶段】，由上一步的【初始化阶段】直接进入下一阶段的【挂载阶段】。
     * 
     * 
     */
  }
}


/**
 * 
 */
export function initInternalComponent(vm: Component, options: InternalComponentOptions) {
  const opts = vm.$options = Object.create(vm.constructor.options)
  // doing this because it's faster than dynamic enumeration.
  const parentVnode = options._parentVnode
  opts.parent = options.parent
  opts._parentVnode = parentVnode

  const vnodeComponentOptions = parentVnode.componentOptions
  opts.propsData = vnodeComponentOptions.propsData
  opts._parentListeners = vnodeComponentOptions.listeners
  opts._renderChildren = vnodeComponentOptions.children
  opts._componentTag = vnodeComponentOptions.tag

  if (options.render) {
    opts.render = options.render
    opts.staticRenderFns = options.staticRenderFns
  }
}

export function resolveConstructorOptions(Ctor: Class<Component>) {
  let options = Ctor.options
  if (Ctor.super) {
    const superOptions = resolveConstructorOptions(Ctor.super)
    const cachedSuperOptions = Ctor.superOptions
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions
      // check if there are any late-modified/attached options (#4976)
      const modifiedOptions = resolveModifiedOptions(Ctor)
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions)
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions)
      if (options.name) {
        options.components[options.name] = Ctor
      }
    }
  }
  return options
}

function resolveModifiedOptions(Ctor: Class<Component>): ?Object {
  let modified
  const latest = Ctor.options
  const sealed = Ctor.sealedOptions
  for (const key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) modified = {}
      modified[key] = latest[key]
    }
  }
  return modified
}
