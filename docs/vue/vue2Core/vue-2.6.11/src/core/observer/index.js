/* @flow */

import Dep from './dep'
import VNode from '../vdom/vnode'
import { arrayMethods } from './array' // 引入数组拦截器
import {
  def,
  warn,
  hasOwn,
  hasProto,
  isObject,
  isPlainObject,
  isPrimitive,
  isUndef,
  isValidArrayIndex,
  isServerRendering
} from '../util/index'

const arrayKeys = Object.getOwnPropertyNames(arrayMethods)

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
export let shouldObserve: boolean = true

export function toggleObserving(value: boolean) {
  shouldObserve = value
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 * 
 * Observer类它用来将一个正常的object转换成可观测的object
 * Observer类会通过递归的方式把一个对象的所有属性都转化成可观测对象
 * 
 * 
 */
export class Observer {
  value: any;
  dep: Dep;
  vmCount: number; // number of vms that have this object as root $data

  constructor(value: any) {
    this.value = value
    // 数组数据的依赖也在getter中收集，而给数组数据添加getter/setter都是在Observer类中完成的，所以我们也应该在Observer类中收集依赖，
    this.dep = new Dep()      // 实例化一个依赖管理器，用来收集数组依赖
    this.vmCount = 0

    // 给value新增一个__ob__属性，值为该value的Observer实例
    // 相当于为value打上标记，表示它已经被转化成响应式了，避免重复操作
    def(value, '__ob__', this)



    if (Array.isArray(value)) {

      // 把数组拦截器挂载到数组实例与Array.prototype之间，这样拦截器才能够生效。只需把数据的__proto__属性设置为拦截器arrayMethods即可

      // 当value为数组时的逻辑
      // 首先判断了浏览器是否支持__proto__，
      // 如果支持，则调用protoAugment函数把value.__proto__ = arrayMethods；
      // 如果不支持，则调用copyAugment函数把拦截器中重写的7个方法循环加入到value上。
      if (hasProto) {// 能力检测：判断__proto__是否可用，因为有的浏览器不支持该属性
        protoAugment(value, arrayMethods)
      } else {
        copyAugment(value, arrayMethods, arrayKeys)
      }
      this.observeArray(value)   // 将数组中的所有元素都转化为可被侦测的响应式
    } else {
      this.walk(value)
    }
  }

  /**
   * Walk through all properties and convert them into
   * getter/setters. This method should only be called when
   * value type is Object.
   */
  walk(obj: Object) {
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i]) //使一个对象转化成可观测对象
    }
  }

  /**
   * Observe a list of Array items.
   * 我们首先通过observe函数为被获取的数据arr尝试创建一个Observer实例，
   * 在observe函数内部，先判断当前传入的数据上是否有__ob__属性，因为在上篇文章中说了，
   * 如果数据有__ob__属性，表示它已经被转化成响应式的了，
   * 如果没有则表示该数据还不是响应式的，那么就调用new Observer(value)将其转化成响应式的，并把数据对应的Observer实例返回。
   */
  observeArray(items: Array<any>) {
    for (let i = 0, l = items.length; i < l; i++) {
      observe(items[i])
    }
  }
}

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment(target, src: Object) {
  /* eslint-disable no-proto */
  target.__proto__ = src
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment(target: Object, src: Object, keys: Array<string>) {
  for (let i = 0, l = keys.length; i < l; i++) {
    const key = keys[i]
    def(target, key, src[key])
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 * 尝试为value创建一个0bserver实例，如果创建成功，直接返回新创建的Observer实例。
 * 如果 Value 已经存在一个Observer实例，则直接返回它
 */
export function observe(value: any, asRootData: ?boolean): Observer | void {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  let ob: Observer | void
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value) //来递归子属性,它用来将一个正常的object转换成可观测的object
  }
  if (asRootData && ob) {
    ob.vmCount++
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 * 
 * 使一个对象转化成可观测对象
 * @param { Object } obj 对象
 * @param { String } key 对象的key
 * @param { Any } val 对象的某个key的值
 * 
 */
export function defineReactive(
  obj: Object,
  key: string,
  val: any,
  customSetter?: ?Function,
  shallow?: boolean
) {
  const dep = new Dep()  //实例化一个依赖管理器，生成一个依赖管理数组dep

  const property = Object.getOwnPropertyDescriptor(obj, key)
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  const getter = property && property.get
  const setter = property && property.set

  // 如果只传了obj和key，那么val = obj[key]
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key]
  }

  // 我们通过这个变量判断当前属性下面是否还有ob属性，如果有的话继续调用Dep.depend函数，没有的话则不处理
  // 在defineReactive函数中，首先获取数据对应的Observer实例childOb，然后在getter中调用Observer实例上依赖管理器，从而将依赖收集起来。
  let childOb = !shallow && observe(val)
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      console.log(`${key}属性被读取了`);
      const value = getter ? getter.call(obj) : val
      if (Dep.target) {
        dep.depend()  // 在getter中收集Object依赖
        if (childOb) {
          childOb.dep.depend() // 收集Array依赖
          if (Array.isArray(value)) {
            // 是数组属性的话则会调用dependArray收集数组依赖
            dependArray(value)
          }
        }
      }
      return value
    },
    set: function reactiveSetter(newVal) {
      console.log(`${key}属性被修改了`);
      const value = getter ? getter.call(obj) : val
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if (process.env.NODE_ENV !== 'production' && customSetter) {
        customSetter()
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) return
      if (setter) {
        setter.call(obj, newVal)
      } else {
        val = newVal
      }
      childOb = !shallow && observe(newVal)
      dep.notify()  // 在setter中通知依赖更新
    }
  })
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 * 
 * 可以看到，方法内部的逻辑并不复杂，就是根据不同的情况作出不同的处理。
 * 
 * 
 * 
 */
export function set(target: Array<any> | Object, key: any, val: any): any {
  // 首先判断在非生产环境下如果传入的target是否为undefined、null或是原始类型，如果是，则抛出警告
  if (process.env.NODE_ENV !== 'production' &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(`Cannot set reactive property on undefined, null, or primitive value: ${(target: any)}`)
  }
  /**
   * 接着判断如果传入的target是数组并且传入的key是有效索引的话，那么就取当前数组长度与key这两者的最大值作为数组的新长度，
   * 然后使用数组的splice方法将传入的索引key对应的val值添加进数组。
   * 
   * 为什么要用splice方法呢？
   * 还记得我们在介绍Array类型数据的变化侦测方式时说过，数组的splice方法已经被我们创建的拦截器重写了，
   * 也就是说，当使用splice方法向数组内添加元素时，该元素会自动被变成响应式的。
   */
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key)
    target.splice(key, 1, val)
    return val
  }
  // 如果传入的target不是数组，那就当做对象来处理。
  // 首先判断传入的key是否已经存在于target中，如果存在，表明这次操作不是新增属性，而是对已有的属性进行简单的修改值，那么就只修改属性值即可
  if (key in target && !(key in Object.prototype)) {
    target[key] = val
    return val
  }

  // 接下来获取到traget的__ob__属性，我们说过，该属性是否为true标志着target是否为响应式对象，
  // 接着判断如果tragte是 Vue 实例，或者是 Vue 实例的根数据对象，则抛出警告并退出程序
  const ob = (target: any).__ob__
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    )
    return val
  }

  // 接着判断如果ob属性为false，那么表明target不是一个响应式对象，那么我们只需简单给它添加上新的属性，不用将新属性转化成响应式
  if (!ob) {
    target[key] = val
    return val
  }

  // 最后，如果target是对象，并且是响应式，那么就调用defineReactive方法将新属性值添加到target上，
  // defineReactive方会将新属性添加完之后并将其转化成响应式，最后通知依赖更新
  defineReactive(ob.value, key, val)
  ob.dep.notify()
  return val
}

/**
 * Delete a property and trigger change if necessary.
 * 
 * 该方法的内部原理与set方法有几分相似，都是根据不同情况作出不同处理。
 * 
 * 
 * 
 */
export function del(target: Array<any> | Object, key: any) {
  // 首先判断在非生产环境下如果传入的target不存在，或者target是原始值，则抛出警告
  if (process.env.NODE_ENV !== 'production' &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(`Cannot delete reactive property on undefined, null, or primitive value: ${(target: any)}`)
  }

  // 接着判断如果传入的target是数组并且传入的key是有效索引的话，就使用数组的splice方法将索引key对应的值删掉
  // 为什么要用splice方法？
  // 就是因为数组的splice方法已经被我们创建的拦截器重写了，所以使用该方法会自动通知相关依赖。
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1)
    return
  }

  // 如果传入的target不是数组，那就当做对象来处理。
  const ob = (target: any).__ob__

  // 接下来获取到traget的__ob__属性，我们说过，该属性是否为true标志着target是否为响应式对象，接着判断如果tragte是 Vue 实例，或者是 Vue 实例的根数据对象，则抛出警告并退出程序
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    )
    return
  }

  // 接着判断传入的key是否存在于target中，如果key本来就不存在于target中，那就不用删除，直接退出程序即可
  if (!hasOwn(target, key)) {
    return
  }

  // 最后，如果target是对象，并且传入的key也存在于target中，那么就从target中将该属性删除，
  // 同时判断当前的target是否为响应式对象，如果是响应式对象，则通知依赖更新；如果不是，删除完后直接返回不通知更新
  delete target[key]
  if (!ob) {
    return
  }
  ob.dep.notify()
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray(value: Array<any>) {
  for (let e, i = 0, l = value.length; i < l; i++) {
    e = value[i]
    e && e.__ob__ && e.__ob__.dep.depend()
    if (Array.isArray(e)) {
      dependArray(e)
    }
  }
}
