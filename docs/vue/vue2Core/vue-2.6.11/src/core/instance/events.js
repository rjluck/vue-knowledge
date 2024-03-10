/* @flow */

import {
  tip,
  toArray,
  hyphenate,
  formatComponentName,
  invokeWithErrorHandling
} from '../util/index'
import { updateListeners } from '../vdom/helpers/index'


/** 
 * initEvents。从函数名字上来看，这个初始化函数是初始化实例的事件系统。
 * 我们知道，在Vue中，当我们在父组件中使用子组件时可以给子组件上注册一些事件，这些事件即包括使用v-on或@注册的自定义事件，
 * 也包括注册的浏览器原生事件（需要加 .native 修饰符）
 * 
 */
export function initEvents(vm: Component) {
  vm._events = Object.create(null)  //首先在vm上新增_events属性并将其赋值为空对象，用来存储事件。
  vm._hasHookEvent = false

  // init parent attached events
  // 接着，获取父组件注册的事件赋给listeners，
  // 如果listeners不为空，则调用updateComponentListeners函数，将父组件向子组件注册的事件注册到子组件的实例中
  const listeners = vm.$options._parentListeners
  if (listeners) {
    updateComponentListeners(vm, listeners)
  }
}

let target: any

function add(event, fn) {
  target.$on(event, fn)
}

function remove(event, fn) {
  target.$off(event, fn)
}

function createOnceHandler(event, fn) {
  const _target = target
  return function onceHandler() {
    const res = fn.apply(null, arguments)
    if (res !== null) {
      _target.$off(event, onceHandler)
    }
  }
}

/** 
 * 将父组件向子组件注册的事件注册到子组件的实例中
 * 
 * updateComponentListeners函数其实也没有干什么，只是调用了updateListeners函数，并把listeners以及add和remove这两个函数传入。
 */
export function updateComponentListeners(
  vm: Component,
  listeners: Object,
  oldListeners: ?Object
) {
  target = vm
  updateListeners(listeners, oldListeners || {}, add, remove, createOnceHandler, vm)
  target = undefined
}


/**
 * 与事件相关的实例方法有4个，分别是vm.$on、vm.$emit、vm.$off和vm.$once。
 * 它们是在eventsMixin函数中挂载到Vue原型上的
 */
export function eventsMixin(Vue: Class<Component>) {
  const hookRE = /^hook:/
  /**
   * $on方法接收两个参数，
   * 第一个参数是订阅的事件名，可以是数组，表示订阅多个事件。
   * 第二个参数是回调函数，当触发所订阅的事件时会执行该回调函数。
   */
  Vue.prototype.$on = function (event: string | Array<string>, fn: Function): Component {
    const vm: Component = this
    // 首先，判断传入的事件名是否是一个数组，如果是数组，就表示需要一次性订阅多个事件，就遍历该数组，将数组中的每一个事件都递归调用$on方法将其作为单个事件订阅。
    if (Array.isArray(event)) {
      for (let i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn)
      }
    } else {
      // 如果不是数组，那就当做单个事件名来处理，以该事件名作为key，先尝试在当前实例的_events属性中获取其对应的事件列表，
      // 如果获取不到就给其赋空数组为默认值，并将第二个参数回调函数添加进去。
      /**
       * 当前实例的_events属性是干嘛的呢？
       * 介绍生命周期初始化阶段的初始化事件initEvents函数中，在该函数中，首先在当前实例上绑定了_events属性并给其赋值为空对象，
       * 这个_events属性就是用来作为当前实例的事件中心，所有绑定在这个实例上的事件都会存储在事件中心_events属性中。
       */
      (vm._events[event] || (vm._events[event] = [])).push(fn)
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true
      }
    }
    return vm
  }


  /** 
   * vm.$once( event, callback )
   * 监听一个自定义事件，但是只触发一次。一旦触发之后，监听器就会被移除。
   * 
   *该方法的作用是先订阅事件，但是该事件只能触发一次，也就是说当该事件被触发后会立即移除。
    要实现这个功能也不难，我们可以定义一个子函数，用这个子函数来替换原本订阅事件所对应的回调，
    也就是说当触发订阅事件时，其实执行的是这个子函数，然后再子函数内部先把该订阅移除，再执行原本的回调，以此来达到只触发一次的目的。

    被监听的事件是event，其原本对应的回调是fn，然后定义了一个子函数on。
    在该函数内部，先通过$on方法订阅事件，同时所使用的回调函数并不是原本的fn而是子函数on
   */
  Vue.prototype.$once = function (event: string, fn: Function): Component {
    const vm: Component = this
    function on() {
      // 然后在子函数内部先通过$off方法移除订阅的事件，这样确保该事件不会被再次触发，接着执行原本的回调fn
      vm.$off(event, on)
      fn.apply(vm, arguments)
    }

    /**
     * 还有一行代码on.fn = fn是干什么的呢？
     * 我们用子函数on替换了原本的订阅事件所对应的回调fn，那么在事件中心_events属性中存储的该事件名就会变成如下这个样子：
     *  vm._events = {
            'xxx':[on]
        }
     * 但是用户自己却不知道传入的fn被替换了，当用户在触发该事件之前想调用$off方法移除该事件时：
     * vm.$off('xxx',fn)
     * 此时就会出现问题，因为在_events属性中的事件名xxx对应的回调函数列表中没有fn，那么就会移除失败。
     * 这就让用户费解了，用户明明给xxx事件传入的回调函数是fn，现在反而找不到fn导致事件移除不了了。
     * 
     * 所以，为了解决这一问题，我们需要给on上绑定一个fn属性，属性值为用户传入的回调fn，
     * 这样在使用$off移除事件的时候，$off内部会判断如果回调函数列表中某一项的fn属性与fn相同时，就可以成功移除事件了。
     * 
     */
    on.fn = fn
    vm.$on(event, on) // 先通过$on方法订阅事件,也就是说，当事件event被触发时，会执行子函数on
    return vm
  }


  /**
   * vm.$off( [event, callback] )
   * 移除自定义事件监听器。
      - 如果没有提供参数，则移除所有的事件监听器；
      - 如果只提供了事件，则移除该事件所有的监听器；
      - 如果同时提供了事件与回调，则只移除这个回调的监听器。
   * 
   * 可以看到，在该方法内部就是通过不断判断所传参数的情况进而进行不同的逻辑处理
   * 
   * 
   */
  Vue.prototype.$off = function (event?: string | Array<string>, fn?: Function): Component {
    const vm: Component = this
    // all
    // 首先，判断如果没有传入任何参数（即arguments.length为0），这就是第一种情况：如果没有提供参数，则移除所有的事件监听器。
    // 我们知道，当前实例上的所有事件都存储在事件中心_events属性中，要想移除所有的事件，那么只需把_events属性重新置为空对象即可
    if (!arguments.length) {
      vm._events = Object.create(null)
      return vm
    }
    // array of events
    // 接着，判断如果传入的需要移除的事件名是一个数组，就表示需要一次性移除多个事件，那么我们只需同订阅多个事件一样，遍历该数组，
    // 然后将数组中的每一个事件都递归调用$off方法进行移除即可
    if (Array.isArray(event)) {
      for (let i = 0, l = event.length; i < l; i++) {
        vm.$off(event[i], fn)
      }
      return vm
    }
    // specific event
    // 接着，获取到需要移除的事件名在事件中心中对应的回调函数cbs
    const cbs = vm._events[event]
    // 接着，判断如果cbs不存在，那表明在事件中心从来没有订阅过该事件，那就谈不上移除该事件，直接返回，退出程序即可
    if (!cbs) {
      return vm
    }

    // 接着，如果cbs存在，但是没有传入回调函数fn，这就是第二种情况：如果只提供了事件，则移除该事件所有的监听器。
    if (!fn) {
      vm._events[event] = null
      return vm
    }
    // specific handler
    // 接着，如果既传入了事件名，又传入了回调函数，cbs也存在，那这就是第三种情况：如果同时提供了事件与回调，则只移除这个回调的监听器。
    // 那么我们只需遍历所有回调函数数组cbs，如果cbs中某一项与fn相同，或者某一项的fn属性与fn相同，那么就将其从数组中删除即可。
    let cb
    let i = cbs.length
    while (i--) {
      cb = cbs[i]
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1)
        break
      }
    }
    return vm
  }


  /**
   * 该方法接收的第一个参数是要触发的事件名，之后的附加参数都会传给被触发事件的回调函数。
   * 
   * 该方法的逻辑很简单，就是根据传入的事件名从当前实例的_events属性（即事件中心）中获取到该事件名所对应的回调函数cbs
   */
  Vue.prototype.$emit = function (event: string): Component {
    const vm: Component = this
    if (process.env.NODE_ENV !== 'production') {
      const lowerCaseEvent = event.toLowerCase()
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          `Event "${lowerCaseEvent}" is emitted in component ` +
          `${formatComponentName(vm)} but the handler is registered for "${event}". ` +
          `Note that HTML attributes are case-insensitive and you cannot use ` +
          `v-on to listen to camelCase events when using in-DOM templates. ` +
          `You should probably use "${hyphenate(event)}" instead of "${event}".`
        )
      }
    }
    let cbs = vm._events[event]  // 获取回调函数
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs
      const args = toArray(arguments, 1) // 然后再获取传入的附加参数args
      const info = `event handler for "${event}"`
      // 由于cbs是一个数组，所以遍历该数组，拿到每一个回调函数，执行回调函数并将附加参数args传给该回调。如下：
      for (let i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info)
      }
    }
    return vm
  }
}
