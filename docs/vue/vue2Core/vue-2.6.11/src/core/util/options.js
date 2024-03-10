/* @flow */

import config from '../config'
import { warn } from './debug'
import { set } from '../observer/index'
import { unicodeRegExp } from './lang'
import { nativeWatch, hasSymbol } from './env'

import {
  ASSET_TYPES,
  LIFECYCLE_HOOKS
} from 'shared/constants'

import {
  extend,
  hasOwn,
  camelize,
  toRawType,
  capitalize,
  isBuiltInTag,
  isPlainObject
} from 'shared/util'

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
const strats = config.optionMergeStrategies

/**
 * Options with restrictions
 */
if (process.env.NODE_ENV !== 'production') {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        `option "${key}" can only be used during instance ` +
        'creation with the `new` keyword.'
      )
    }
    return defaultStrat(parent, child)
  }
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData(to: Object, from: ?Object): Object {
  if (!from) return to
  let key, toVal, fromVal

  const keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from)

  for (let i = 0; i < keys.length; i++) {
    key = keys[i]
    // in case the object is already observed...
    if (key === '__ob__') continue
    toVal = to[key]
    fromVal = from[key]
    if (!hasOwn(to, key)) {
      set(to, key, fromVal)
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal)
    }
  }
  return to
}

/**
 * Data
 */
export function mergeDataOrFn(
  parentVal: any,
  childVal: any,
  vm?: Component
): ?Function {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn() {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn() {
      // instance merge
      const instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal
      const defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal: any,
  childVal: any,
  vm?: Component
): ?Function {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      process.env.NODE_ENV !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      )

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
}

/**
 * Hooks and props are merged as arrays.
 * 
 * 合并策略：
 * - 如果 childVal不存在，就返回 parentVal；
 * - 否则再判断是否存在 parentVal，如果存在就把 childVal 添加到 parentVal 后返回新数组
 * - 否则返回 childVal 的数组
 * 
 * 所以回到 mergeOptions 函数，一旦 parent 和 child 都定义了相同的钩子函数，那么它们会把 2 个钩子函数合并成一个数组
 * 
 * 为什么要把相同的钩子函数转换成数组呢？
 * 这是因为Vue允许用户使用Vue.mixin方法向实例混入自定义行为，Vue的一些插件通常都是这么做的。
 * 所以当Vue.mixin和用户在实例化Vue时，如果设置了同一个钩子函数，那么在触发钩子函数时，
 * 就需要同时触发这个两个函数，所以转换成数组就是为了能在同一个生命周期钩子列表中保存多个钩子函数
 * 
 *  
 */
function mergeHook(
  parentVal: ?Array<Function>,
  childVal: ?Function | ?Array<Function>
): ?Array<Function> {
  const res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
  return res
    ? dedupeHooks(res)
    : res
}

// function mergeHook (parentVal,childVal):  {
//   if (childVal) {
//     if (parentVal) {
//       return parentVal.concat(childVal)
//     } else {
//       if (Array.isArray(childVal)) {
//         return childVal
//       } else {
//         return [childVal]
//       }
//     }
//   } else {
//     return parentVal
//   }
//  }


function dedupeHooks(hooks) {
  const res = []
  for (let i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i])
    }
  }
  return res
}

/** 
 * 生命周期钩子函数的合并策略
 * 
 * 所以对于钩子函数的合并策略都是 mergeHook 函数
 */
LIFECYCLE_HOOKS.forEach(hook => {
  strats[hook] = mergeHook
})

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets(
  parentVal: ?Object,
  childVal: ?Object,
  vm?: Component,
  key: string
): Object {
  const res = Object.create(parentVal || null)
  if (childVal) {
    process.env.NODE_ENV !== 'production' && assertObjectType(key, childVal, vm)
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets
})

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal: ?Object,
  childVal: ?Object,
  vm?: Component,
  key: string
): ?Object {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) parentVal = undefined
  if (childVal === nativeWatch) childVal = undefined
  /* istanbul ignore if */
  if (!childVal) return Object.create(parentVal || null)
  if (process.env.NODE_ENV !== 'production') {
    assertObjectType(key, childVal, vm)
  }
  if (!parentVal) return childVal
  const ret = {}
  extend(ret, parentVal)
  for (const key in childVal) {
    let parent = ret[key]
    const child = childVal[key]
    if (parent && !Array.isArray(parent)) {
      parent = [parent]
    }
    ret[key] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child]
  }
  return ret
}

/**
 * Other object hashes.
 */
strats.props =
  strats.methods =
  strats.inject =
  strats.computed = function (
    parentVal: ?Object,
    childVal: ?Object,
    vm?: Component,
    key: string
  ): ?Object {
    if (childVal && process.env.NODE_ENV !== 'production') {
      assertObjectType(key, childVal, vm)
    }
    if (!parentVal) return childVal
    const ret = Object.create(null)
    extend(ret, parentVal)
    if (childVal) extend(ret, childVal)
    return ret
  }
strats.provide = mergeDataOrFn

/**
 * Default strategy.
 */
const defaultStrat = function (parentVal: any, childVal: any): any {
  return childVal === undefined
    ? parentVal
    : childVal
}

/**
 * Validate component names
 */
function checkComponents(options: Object) {
  for (const key in options.components) {
    validateComponentName(key)
  }
}

export function validateComponentName(name: string) {
  if (!new RegExp(`^[a-zA-Z][\\-\\.0-9_${unicodeRegExp.source}]*$`).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    )
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    )
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 * 
 * // 写法一
  props: ['name']

  // 写法二
  props: {
      name: String, // [String, Number]
  }

  // 写法三
  props: {
      name:{
      type: String
      }
  }
*
* 无论是三种写法的哪一种，最终都会被转化成如下写法：
* props: {
      name:{
          type: xxx
      }
  }
*
*
 */
function normalizeProps(options: Object, vm: ?Component) {
  // 首先拿到实例中的props选项，如果不存在，则直接返回。
  const props = options.props
  if (!props) return
  // 定义一个空对象res，用来存储最终的结果
  const res = {}
  let i, val, name
  // 判断如果props选项是一个数组（写法一），则遍历该数组中的每一项元素，
  // 如果该元素是字符串，那么先将该元素统一转化成驼峰式命名，然后将该元素作为key，将{type: null}作为value存入res中；
  // 如果该元素不是字符串，则抛出异常。
  if (Array.isArray(props)) {
    i = props.length
    while (i--) {
      val = props[i]
      if (typeof val === 'string') {
        name = camelize(val)
        res[name] = { type: null }
      } else if (process.env.NODE_ENV !== 'production') {
        warn('props must be strings when using array syntax.')
      }
    }
  }
  // 如果props选项不是数组那就继续判断是不是一个对象，
  // 如果是一个对象，那就遍历对象中的每一对键值，拿到每一对键值后，先将键名统一转化成驼峰式命名，然后判断值是否还是一个对象，
  // 如果值是对象（写法三），那么就将该键值对存入res中；
  // 如果值不是对象（写法二），那么就将键名作为key，将{type: null}作为value存入res中。

  else if (isPlainObject(props)) {
    for (const key in props) {
      val = props[key]
      name = camelize(key)
      res[name] = isPlainObject(val)
        ? val
        : { type: val }
    }
  }
  // 如果props选项既不是数组也不是对象，那么如果在非生产环境下就抛出异常，最后将res作为规范化后的结果重新赋值给实例的props选项。
  else if (process.env.NODE_ENV !== 'production') {
    warn(
      `Invalid value for option "props": expected an Array or an Object, ` +
      `but got ${toRawType(props)}.`,
      vm
    )
  }
  options.props = res
}

/**
 * Normalize all injections into Object-based format
 * 
 * 逻辑：
 * 如果用户给inject选项传入的是一个字符串数组（写法一），那么就遍历该数组，把数组的每一项变成
 * inject:{
    foo:{
      from:'foo'
    }
  }
 * 
 * 如果给inject选项传入的是一个对象，那就遍历对象中的每一个key，给写法二形式的key对应的值扩展{ from: key }，变成：
 * inject:{
    foo:{
      from: 'foo',
      default: 'xxx'
    }
  }
 * 
 * 将写法三形式的key对应的值变成：
 * inject:{
    foo:{
      from: 'foo'
    }
  }
 * 
 * 总之一句话就是把各种写法转换成一种规范化写法，便于集中处理。
 * 
 * 
 */
function normalizeInject(options: Object, vm: ?Component) {
  const inject = options.inject
  if (!inject) return
  const normalized = options.inject = {}
  if (Array.isArray(inject)) {
    for (let i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] }
    }
  } else if (isPlainObject(inject)) {
    for (const key in inject) {
      const val = inject[key]
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val }
    }
  } else if (process.env.NODE_ENV !== 'production') {
    warn(
      `Invalid value for option "inject": expected an Array or an Object, ` +
      `but got ${toRawType(inject)}.`,
      vm
    )
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives(options: Object) {
  const dirs = options.directives
  if (dirs) {
    for (const key in dirs) {
      const def = dirs[key]
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def }
      }
    }
  }
}

function assertObjectType(name: string, value: any, vm: ?Component) {
  if (!isPlainObject(value)) {
    warn(
      `Invalid value for option "${name}": expected an Object, ` +
      `but got ${toRawType(value)}.`,
      vm
    )
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 * 
 * mergeOptions函数的 主要功能是把 parent 和 child 这两个对象根据一些合并策略，合并成一个新对象并返回。
 * 
 */
export function mergeOptions(
  parent: Object,
  child: Object,
  vm?: Component
): Object {
  if (process.env.NODE_ENV !== 'production') {
    checkComponents(child)
  }

  if (typeof child === 'function') {
    child = child.options
  }

  /** 
   * props数据的规范化处理
   * 
   */
  normalizeProps(child, vm)

  /*
  *
  * normalizeInject 将inject的多种格式统统转换成以下规范化格式
  * 这样做的目的是，不管用户使用了何种写法，统统将其转化成一种便于集中处理的写法。
  * 
  * 该函数的作用是将以下这三种写法：
  * 
  * // 写法一
    var Child = {
      inject: ['foo']
    }

    // 写法二
    const Child = {
      inject: {
        foo: { default: 'xxx' }
      }
    }

    // 写法三
    const Child = {
      inject: {
        foo
      }
    }

  * 统统转换成以下规范化格式：
  * const Child = {
      inject: {
        foo: {
          from: 'foo',
          default: 'xxx'  //如果有默认的值就有default属性
        }
      }
    }
  * 
  * 
  */
  normalizeInject(child, vm)
  normalizeDirectives(child)

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  // 首先递归把 extends 和 mixins 合并到 parent 上
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm)
    }
    if (child.mixins) {
      for (let i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm)
      }
    }
  }

  // 然后创建一个空对象options，遍历 parent，把parent中的每一项通过调用 mergeField函数合并到空对象options里，
  const options = {}
  let key
  for (key in parent) {
    mergeField(key)
  }

  // 接着再遍历 child，把存在于child里但又不在 parent中 的属性继续调用 mergeField函数合并到空对象options里
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key)
    }
  }

  // mergeField 函数，它不是简单的把属性从一个对象里复制到另外一个对象里，而是根据被合并的不同的选项有着不同的合并策略。
  // 例如，对于data有data的合并策略，即该文件中的strats.data函数；对于watch有watch的合并策略，即该文件中的strats.watch函数等等。
  // 这就是设计模式中非常典型的策略模式。
  function mergeField(key) {
    const strat = strats[key] || defaultStrat
    options[key] = strat(parent[key], child[key], vm, key)
  }

  // 最后，options就是最终合并后得到的结果，将其返回。
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 * 
 * 调用该函数时传入了4个参数，分别是当前实例的$options属性，type为filters，id为当前过滤器的id。
 * 
 * 
 * 
 */
export function resolveAsset(
  options: Object,
  type: string,
  id: string,
  warnMissing?: boolean
): any {
  /* istanbul ignore if */
  // 在该函数内部，首先判断传入的参数id（即当前过滤器的名称id）是否为字符串类型，如果不是，则直接退出程序。
  if (typeof id !== 'string') {
    return
  }

  // 获取到当前实例的$options属性中所有的过滤器，赋给变量assets
  /**
   * 上篇文章中说过，定义过滤器有两种方式，一种是定义在组件的选项中，一种是使用Vue.filter定义。
   * 在之前的文章中我们说过，组件中的所有选项都会被合并到当前实例的$options属性中，
   * 并且使用Vue.filter定义的过滤器也会被添加到$options中的filters属性中，
   * 所以不管是以何种方式定义的过滤器，我们都可以从$options中的filters属性中获取到
   */
  const assets = options[type]

  // check local registration variations first
  // 获取到所有的过滤器后，接下来我们只需根据过滤器id取出对应的过滤器函数即可

  // 先从本地注册中查找
  /**
   * 根据过滤器id查找过滤器首先先从本地注册中查找，
   * 先通过hasOwn函数检查assets自身中是否存在，如果存在则直接返回；
   * 如果不存在，则将过滤器id转化成驼峰式后再次查找，如果存在则直接返回；
   * 如果也不存在，则将过滤器id转化成首字母大写后再次查找，如果存在则直接返回；
   * 如果还不存在，则再从原型链中查找，如果存在则直接返回；
   * 如果还不存在，则在非生产环境下抛出警告。
   */
  if (hasOwn(assets, id)) return assets[id]
  const camelizedId = camelize(id)
  if (hasOwn(assets, camelizedId)) return assets[camelizedId]
  const PascalCaseId = capitalize(camelizedId)
  if (hasOwn(assets, PascalCaseId)) return assets[PascalCaseId]
  // fallback to prototype chain
  // 再从原型链中查找
  const res = assets[id] || assets[camelizedId] || assets[PascalCaseId]
  if (process.env.NODE_ENV !== 'production' && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    )
  }
  return res
}

/**
 * 对于多个过滤器串联一起使用其原理也是相同的，还是先根据过滤器id获取到对应的过滤器函数，然后传入参数调用即可，
 * 唯一有所区别的是：对于多个串联过滤器，在调用过滤器函数传递参数时，后一个过滤器的输入参数是前一个过滤器的输出结果。
 * 
 * 需要注意的就是：过滤器的第一个参数永远是表达式的值，或者是前一个过滤器处理后的结果，后续其余的参数可以被用于过滤器内部的过滤规则中。
 */
