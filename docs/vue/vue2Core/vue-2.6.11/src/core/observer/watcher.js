/* @flow */

import {
  warn,
  remove,
  isObject,
  parsePath,
  _Set as Set,
  handleError,
  noop
} from '../util/index'

import { traverse } from './traverse'
import { queueWatcher } from './scheduler'
import Dep, { pushTarget, popTarget } from './dep'

import type { SimpleSet } from '../util/index'

let uid = 0

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
export default class Watcher {
  vm: Component;
  expression: string;
  cb: Function;
  id: number;
  deep: boolean;
  user: boolean;
  lazy: boolean;
  sync: boolean;
  dirty: boolean;
  active: boolean;
  deps: Array<Dep>;
  newDeps: Array<Dep>;
  depIds: SimpleSet;
  newDepIds: SimpleSet;
  before: ?Function;
  getter: Function;
  value: any;

  constructor(
    vm: Component,
    expOrFn: string | Function,
    cb: Function,
    options?: ?Object,
    isRenderWatcher?: boolean
  ) {
    this.vm = vm
    if (isRenderWatcher) {
      vm._watcher = this
    }
    vm._watchers.push(this)
    // options
    if (options) {
      this.deep = !!options.deep
      this.user = !!options.user
      this.lazy = !!options.lazy
      this.sync = !!options.sync
      this.before = options.before
    } else {
      this.deep = this.user = this.lazy = this.sync = false
    }
    this.cb = cb
    this.id = ++uid // uid for batching
    this.active = true
    // this.dirty属性用于标志计算属性的返回值是否有变化，计算属性的缓存就是通过这个属性来判断的，
    // 每当计算属性依赖的数据发生变化时，会将this.dirty属性设置为true，这样下一次读取计算属性时，会重新计算结果返回，否则直接返回之前的计算结果。
    this.dirty = this.lazy // for lazy watchers
    this.deps = []
    this.newDeps = []
    this.depIds = new Set()
    this.newDepIds = new Set()
    this.expression = process.env.NODE_ENV !== 'production'
      ? expOrFn.toString()
      : ''
    // parse expression for getter
    if (typeof expOrFn === 'function') {
      this.getter = expOrFn
    } else {
      this.getter = parsePath(expOrFn) //把一个形如'data.a.b.c'的字符串路径所表示的值，从真实的data对象中取出来
      if (!this.getter) {
        this.getter = noop
        process.env.NODE_ENV !== 'production' && warn(
          `Failed watching path: "${expOrFn}" ` +
          'Watcher only accepts simple dot-delimited paths. ' +
          'For full control, use a function instead.',
          vm
        )
      }
    }
    this.value = this.lazy
      ? undefined
      : this.get()
  }

  /**
   * Evaluate the getter, and re-collect dependencies.
   * 
   * 在get方法中，如果传入的deep为true，则会调用traverse函数
   * 
   */
  get() {
    pushTarget(this) //把实例自身赋给了Dep.target
    let value
    const vm = this.vm
    try {
      value = this.getter.call(vm, vm) //获取一下被依赖的数据，获取被依赖数据的目的是触发该数据上面的getter
    } catch (e) {
      if (this.user) {
        handleError(e, vm, `getter for watcher "${this.expression}"`)
      } else {
        throw e
      }
    } finally {
      // "touch" every property so they are all tracked as
      // dependencies for deep watching
      // “触摸”每个属性，以便将它们全部作为深度监视的依赖项进行跟踪,
      // 所谓“触摸”每个属性，不就是将每个属性都读取一遍么
      if (this.deep) {
        traverse(value)
      }
      popTarget()// 最后将Dep.target释放掉。
      this.cleanupDeps()
    }
    return value
  }

  /**
   * Add a dependency to this directive.
   */
  addDep(dep: Dep) {
    const id = dep.id
    if (!this.newDepIds.has(id)) {
      this.newDepIds.add(id)
      this.newDeps.push(dep)
      if (!this.depIds.has(id)) {
        dep.addSub(this)
      }
    }
  }

  /**
   * Clean up for dependency collection.
   */
  cleanupDeps() {
    let i = this.deps.length
    while (i--) {
      const dep = this.deps[i]
      if (!this.newDepIds.has(dep.id)) {
        dep.removeSub(this)
      }
    }
    let tmp = this.depIds
    this.depIds = this.newDepIds
    this.newDepIds = tmp
    this.newDepIds.clear()
    tmp = this.deps
    this.deps = this.newDeps
    this.newDeps = tmp
    this.newDeps.length = 0
  }

  /**
   * Subscriber interface.
   * Will be called when a dependency changes.
   * 
   * watcher.update()方法，在update方法中会判断当前的watcher是不是计算属性的watcher，
   * 如果是则调用getAndInvoke去对比计算属性的返回值是否发生了变化，如果真的发生变化，则执行回调，通知那些读取计算属性的watcher重新执行渲染逻辑。
   */
  update() {
    /* istanbul ignore else */
    if (this.lazy) {
      this.dirty = true
    } else if (this.sync) {
      this.run()
    } else {
      queueWatcher(this)
    }
  }

  /**
   * Scheduler job interface.
   * Will be called by the scheduler.
   */
  run() {
    if (this.active) {
      const value = this.get()
      if (
        value !== this.value ||
        // Deep watchers and watchers on Object/Arrays should fire even
        // when the value is the same, because the value may
        // have mutated.
        isObject(value) ||
        this.deep
      ) {
        // set new value
        const oldValue = this.value
        this.value = value
        if (this.user) {
          try {
            this.cb.call(this.vm, value, oldValue)
          } catch (e) {
            handleError(e, this.vm, `callback for watcher "${this.expression}"`)
          }
        } else {
          this.cb.call(this.vm, value, oldValue)
        }
      }
    }
  }

  /**
   * Evaluate the value of the watcher.
   * This only gets called for lazy watchers.
   * 当调用watcher.evaluate()方法时，会先判断this.dirty是否为true，
   * 如果为true，则表明计算属性所依赖的数据发生了变化，则调用this.get()重新获取计算结果最后返回；如果为false，则直接返回之前的计算结果。
   * 
   */
  evaluate() {
    this.value = this.get()
    this.dirty = false
  }

  /**
   * Depend on all deps collected by this watcher.
   * 当调用watcher.depend()方法时，会将读取计算属性的那个watcher添加到计算属性的watcher实例的依赖列表中，当计算属性中用到的数据发生变化时，计算属性的watcher实例就会执行
   */
  depend() {
    let i = this.deps.length
    while (i--) {
      this.deps[i].depend()
    }
  }

  /**
   * Remove self from all dependencies' subscriber list.
   * 
   * 在之前介绍变化侦测篇的文章中我们说过，谁读取了数据，就表示谁依赖了这个数据，
   * 那么谁就会存在于这个数据的依赖列表中，当这个数据变化时，就会通知谁。
   * 也就是说，如果谁不想依赖这个数据了，那么只需从这个数据的依赖列表中把谁删掉即可。
   * 
   * 创建watcher实例的时候会读取被观察的数据，读取了数据就表示依赖了数据，所以watcher实例就会存在于数据的依赖列表中，
   * 同时watcher实例也记录了自己依赖了哪些数据，另外我们还说过，每个数据都有一个自己的依赖管理器dep，
   * watcher实例记录自己依赖了哪些数据其实就是把这些数据的依赖管理器dep存放在watcher实例的this.deps = []属性中，
   * 当取消观察时即watcher实例不想依赖这些数据了，那么就遍历自己记录的这些数据的依赖管理器，告诉这些数据可以从你们的依赖列表中把我删除了。
   */
  teardown() {
    if (this.active) {
      // remove self from vm's watcher list
      // this is a somewhat expensive operation so we skip it
      // if the vm is being destroyed.
      if (!this.vm._isBeingDestroyed) {
        remove(this.vm._watchers, this)
      }
      let i = this.deps.length
      while (i--) {
        this.deps[i].removeSub(this)
      }
      this.active = false
    }
  }
}
