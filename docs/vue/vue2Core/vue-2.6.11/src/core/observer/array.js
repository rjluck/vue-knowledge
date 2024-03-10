/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

import { def } from '../util/index'

const arrayProto = Array.prototype

// 创建一个对象作为拦截器
// 创建了继承自Array原型的空对象arrayMethods
export const arrayMethods = Object.create(arrayProto)

// 改变数组自身内容的7个方法
const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]

/**
 * Intercept mutating methods and emit events
 * 接着在arrayMethods上使用object.defineProperty方法将那些可以改变数组自身的7个方法遍历逐个进行封装。
 * 
 * 最后，当我们使用push方法的时候，其实用的是arrayMethods.push，而arrayMethods.push就是封装的新函数mutator
 * 
 * 实标上执行的是函数mutator，而mutator函数内部执行了original函数，
 * 这个original函数就是Array.prototype上对应的原生方法。 那么，接下来我们就可以在mutator函数中做一些其他的事，比如说发送变化通知
 * 
 * 
 * 由于我们的拦截器是挂载到数组数据的原型上的，所以拦截器中的this就是数据value，
 * 拿到value上的Observer类实例，从而你就可以调用Observer类实例上面依赖管理器的dep.notify()方法，以达到通知依赖的目的。
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  const original = arrayProto[method] // 缓存原生方法
  def(arrayMethods, method, function mutator(...args) {
    const result = original.apply(this, args)
    const ob = this.__ob__
    // 如果向数组里新增一个元素的话，我们也需要将新增的这个元素转化成可侦测的响应式数据。
    // 这个实现起来也很容易，我们只需拿到新增的这个元素，然后调用observe函数将其转化即可。
    // 我们知道，可以向数组内新增元素的方法有3个，分别是：push、unshift、splice。我们只需对这3中方法分别处理，拿到新增的元素，再将其转化即可。
    let inserted
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args   /// 如果是push或unshift方法，那么传入参数就是新增的元素
        break
      case 'splice':
        inserted = args.slice(2) // 如果是splice方法，那么传入参数列表中下标为2的就是新增的元素
        break
    }
    if (inserted) ob.observeArray(inserted) // 调用observe函数将新增的元素转化成响应式
    // notify change
    ob.dep.notify()
    return result
  })
})
