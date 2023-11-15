/* @flow */

import config from '../config'
import Watcher from '../observer/watcher'
import Dep, { pushTarget, popTarget } from '../observer/dep'
import { isUpdatingChildComponent } from './lifecycle'

import {
  set,
  del,
  observe,
  defineReactive,
  toggleObserving
} from '../observer/index'

import {
  warn,
  bind,
  noop,
  hasOwn,
  hyphenate,
  isReserved,
  handleError,
  nativeWatch,
  validateProp,
  isPlainObject,
  isServerRendering,
  isReservedAttribute
} from '../util/index'

// 定义了变量sharedPropertyDefinition，它是一个默认的属性描述符。
const sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
}

export function proxy(target: Object, sourceKey: string, key: string) {
  sharedPropertyDefinition.get = function proxyGetter() {
    return this[sourceKey][key]
  }
  sharedPropertyDefinition.set = function proxySetter(val) {
    this[sourceKey][key] = val
  }
  Object.defineProperty(target, key, sharedPropertyDefinition)
}

/** 
 * 这个函数是用来初始化实例状态的
 * 
 * initState函数的所有逻辑，其实你会发现，在函数内部初始化这5个选项的时候它的顺序是有意安排的，不是毫无章法的。
 * 如果你在开发中有注意到我们在data中可以使用props，
 * 在watch中可以观察data和props，之所以可以这样做，就是因为在初始化的时候遵循了这种顺序，先初始化props，接着初始化data，最后初始化watch。
 * 
 */
export function initState(vm: Component) {
  // 给实例上新增了一个属性_watchers，用来存储当前实例中所有的watcher实例，
  // 无论是使用vm.$watch注册的watcher实例还是使用watch选项注册的watcher实例，都会被保存到该属性中。
  vm._watchers = []
  // 接下来就是判断实例中有哪些选项就调用对应的选项初始化子函数进行初始化
  const opts = vm.$options
  if (opts.props) initProps(vm, opts.props)
  if (opts.methods) initMethods(vm, opts.methods)
  // 判断实例中是否有data选项，如果有，就调用data选项初始化函数initData去初始化data选项；如果没有，就把data当作空对象并将其转换成响应式；
  if (opts.data) {
    initData(vm)
  } else {
    observe(vm._data = {}, true /* asRootData */)
  }

  // 计算属性有一个很大的特点就是： 计算属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算。
  if (opts.computed) initComputed(vm, opts.computed)
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch)
  }
}

/** 
 * 初始化props
 * 
 * props选项通常是由当前组件的父级组件传入的，当父组件在调用子组件的时候，通常会把props属性值作为标签属性添加在子组件的标签上，如下：
 * <Child prop1="xxx" prop2="yyy"></Child>
 * 
 * 初始化事件initEvents函数的时候我们说了，在模板编译的时候，当解析到组件标签时会将所有的标签属性都解析出来然后在子组件实例化的时候传给子组件，当然这里面就包括props数据。
 * 
 * 在子组件内部，通过props选项来接收父组件传来的数据，在接收的时候可以这样写：
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
 * 同样，在合并属性的时候也进行了props数据的规范化
 * props数据规范化函数的定义位于源码的src/core/util/options.js中
 * 
 * initProps函数接收两个参数：当前Vue实例和当前实例规范化后的props选项。
 * 
 * 在函数内部首先定义了4个变量，分别是：
 * - propsData:父组件传入的真实props数据。
   - props:指向vm._props的指针，所有设置到props变量中的属性都会保存到vm._props中。
   - keys:指向vm.$options._propKeys的指针，缓存props对象中的key，将来更新props时只需遍历vm.$options._propKeys数组即可得到所有props的key。
   - isRoot:当前组件是否为根组件。
 * 
 * 
 * 
 * 
 */
function initProps(vm: Component, propsOptions: Object) {
  const propsData = vm.$options.propsData || {}
  const props = vm._props = {}
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  const keys = vm.$options._propKeys = []
  const isRoot = !vm.$parent  // 当前组件是否为根组件。
  // root instance props should be converted
  // 接着，判断当前组件是否为根组件，如果不是，那么不需要将props数组转换为响应式的，toggleObserving(false)用来控制是否将数据转换成响应式。
  if (!isRoot) {
    toggleObserving(false)
  }

  // 遍历props选项拿到每一对键值，先将键名添加到keys中
  // 然后调用validateProp函数,校验父组件传入的props数据类型是否匹配并获取到传入的值value，然后将键和值通过defineReactive函数添加到props（即vm._props）中
  for (const key in propsOptions) {
    keys.push(key)
    const value = validateProp(key, propsOptions, propsData, vm)
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      const hyphenatedKey = hyphenate(key)
      if (isReservedAttribute(hyphenatedKey) ||
        config.isReservedAttr(hyphenatedKey)) {
        warn(
          `"${hyphenatedKey}" is a reserved attribute and cannot be used as component prop.`,
          vm
        )
      }
      defineReactive(props, key, value, () => {
        if (!isRoot && !isUpdatingChildComponent) {
          warn(
            `Avoid mutating a prop directly since the value will be ` +
            `overwritten whenever the parent component re-renders. ` +
            `Instead, use a data or computed property based on the prop's ` +
            `value. Prop being mutated: "${key}"`,
            vm
          )
        }
      })
    } else {
      defineReactive(props, key, value)
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    // 添加完之后再判断这个key在当前实例vm中是否存在，
    // 如果不存在，则调用proxy函数在vm上设置一个以key为属性的代码，当使用vm[key]访问数据时，其实访问的是vm._props[key]。
    if (!(key in vm)) {
      proxy(vm, `_props`, key)
    }
  }
  toggleObserving(true)
}

/** 
 * 初始化data 
 * 
 * 逻辑：通过一系列条件判断用户传入的data选项是否合法，最后将data转换成响应式并绑定到实例vm上
 * 
 * 
 * 
 * 
*/
function initData(vm: Component) {
  // 首先获取到用户传入的data选项，赋给变量data
  let data = vm.$options.data
  // 将变量data作为指针指向vm._data，然后判断data是不是一个函数，
  // 如果是就调用getData函数获取其返回值，将其保存到vm._data中。
  // 如果不是，就将其本身保存到vm._data中
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {}

  // 无论传入的data选项是不是一个函数，它最终的值都应该是一个对象，如果不是对象的话，就抛出警告：提示用户data应该是一个对象。
  if (!isPlainObject(data)) {
    data = {}
    process.env.NODE_ENV !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    )
  }
  // proxy data on instance
  // 接下来遍历data对象中的每一项
  const keys = Object.keys(data)
  const props = vm.$options.props
  const methods = vm.$options.methods
  let i = keys.length
  while (i--) {
    const key = keys[i]
    if (process.env.NODE_ENV !== 'production') {
      // 在非生产环境下判断data对象中是否存在某一项的key与methods中某个属性名重复，如果存在重复，就抛出警告：提示用户属性名重复。
      if (methods && hasOwn(methods, key)) {
        warn(
          `Method "${key}" has already been defined as a data property.`,
          vm
        )
      }
    }
    // 判断是否存在某一项的key与prop中某个属性名重复，如果存在重复，就抛出警告：提示用户属性名重复。
    if (props && hasOwn(props, key)) {
      process.env.NODE_ENV !== 'production' && warn(
        `The data property "${key}" is already declared as a prop. ` +
        `Use prop default value instead.`,
        vm
      )
    } else if (!isReserved(key)) {
      // 如果都没有重复，则调用proxy函数将data对象中key不以_或$开头的属性代理到实例vm上，
      // 这样，我们就可以通过this.xxx来访问data选项中的xxx数据了
      proxy(vm, `_data`, key)
    }
  }
  // observe data
  // 最后，调用observe函数将data中的数据转化成响应式
  observe(data, true /* asRootData */)
}

export function getData(data: Function, vm: Component): any {
  // #7573 disable dep collection when invoking data getters
  pushTarget()
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, `data()`)
    return {}
  } finally {
    popTarget()
  }
}

const computedWatcherOptions = { lazy: true }

/** 
 * 计算属性有一个很大的特点就是： 计算属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算。
 * 
 * 回顾一下计算属性的用法，如下
 * var vm = new Vue({
    data: { a: 1 },
    computed: {
      // 仅读取
      aDouble: function () {
        return this.a * 2
      },
      // 读取和设置
      aPlus: {
        get: function () {
          return this.a + 1
        },
        set: function (v) {
          this.a = v - 1
        }
      }
    }
  })
  vm.aPlus   // => 2
  vm.aPlus = 3
  vm.a       // => 2
  vm.aDouble // => 4
 * 
 * 可以看到，computed选项中的属性值可以是一个函数，那么该函数默认为取值器getter，用于仅读取数据；还可以是一个对象，对象里面有取值器getter和存值器setter，用于读取和设置数据。
 * 
 * 
 * 初始化函数initComputed
 * 
 */
function initComputed(vm: Component, computed: Object) {
  // $flow-disable-line
  // 在函数内部，首先定义了一个变量watchers并将其赋值为空对象，同时将其作为指针指向vm._computedWatchers
  const watchers = vm._computedWatchers = Object.create(null)
  // computed properties are just getters during SSR
  const isSSR = isServerRendering()

  // 遍历computed选项中的每一项属性
  for (const key in computed) {
    const userDef = computed[key] // 获取到每一项的属性值，记作userDef
    // userDef是不是一个函数，
    // 如果是函数，则该函数默认为取值器getter，将其赋值给变量getter；
    // 如果不是函数，则说明是一个对象，则取对象中的get属性作为取值器赋给变量getter。
    const getter = typeof userDef === 'function' ? userDef : userDef.get
    if (process.env.NODE_ENV !== 'production' && getter == null) {
      // 在非生产环境下如果上面两种情况取到的取值器不存在，则抛出警告：提示用户计算属性必须有取值器。
      warn(
        `Getter is missing for computed property "${key}".`,
        vm
      )
    }

    // 判断如果不是在服务端渲染环境下，则创建一个watcher实例，并将当前循环到的的属性名作为键，创建的watcher实例作为值存入watchers对象中。
    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      )
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    // 最后，判断当前循环到的的属性名是否存在于当前实例vm上，如果存在，则在非生产环境下抛出警告；如果不存在，则调用defineComputed函数为实例vm上设置计算属性。
    if (!(key in vm)) {
      // 不存在实例上
      defineComputed(vm, key, userDef)
    } else if (process.env.NODE_ENV !== 'production') {
      // 存在实例上
      if (key in vm.$data) {
        warn(`The computed property "${key}" is already defined in data.`, vm)
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(`The computed property "${key}" is already defined as a prop.`, vm)
      }
    }
  }
}


/** 
 * defineComputed
 * 
 * 该函数接受3个参数:target、key和userDef
 * 
 * 其作用是为target上定义一个属性key，并且属性key的getter和setter根据userDef的值来设置。
 * 
 * 定义了变量sharedPropertyDefinition，它是一个默认的属性描述符。
 * 
 */
export function defineComputed(
  target: any,
  key: string,
  userDef: Object | Function
) {
  // 在函数内部定义了变量shouldCache，用于标识计算属性是否应该有缓存。
  // 该变量的值是当前环境是否为非服务端渲染环境，如果是非服务端渲染环境则该变量为true。
  // 也就是说，只有在非服务端渲染环境下计算属性才应该有缓存
  const shouldCache = !isServerRendering()
  if (typeof userDef === 'function') {
    /** 
     * 判断如果userDef是一个函数，则该函数默认为取值器getter，此处在非服务端渲染环境下并没有直接使用userDef作为getter，
     * 而是调用createComputedGetter函数,创建了一个getter，这是因为userDef只是一个普通的getter，它并没有缓存功能，
     * 所以我们需要额外创建一个具有缓存功能的getter，
     * 而在服务端渲染环境下可以直接使用userDef作为getter，因为在服务端渲染环境下计算属性不需要缓存。
     * 由于用户没有设置setter函数，所以将sharedPropertyDefinition.set设置为noop
     * 
     */
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef)
    sharedPropertyDefinition.set = noop
  } else {
    /** 
     * 如果userDef不是一个函数，那么就将它当作对象处理。
     * 在设置sharedPropertyDefinition.get的时候先判断userDef.get是否存在，
     * 如果不存在，则将其设置为noop，
     * 如果存在，则同上面一样，在非服务端渲染环境下并且用户没有明确的将userDef.cache设置为false时调用createComputedGetter函数创建一个getter赋给sharedPropertyDefinition.get。
     * 然后设置sharedPropertyDefinition.set为userDef.set函数。
     * 
     */
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop
    sharedPropertyDefinition.set = userDef.set || noop
  }

  /**
   * 再判断在非生产环境下如果用户没有设置setter的话，那么就给setter一个默认函数，
   * 这是为了防止用户在没有设置setter的情况下修改计算属性，从而为其抛出警告
   */
  if (process.env.NODE_ENV !== 'production' &&
    sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        `Computed property "${key}" was assigned to but it has no setter.`,
        this
      )
    }
  }

  /**
   * 最后调用Object.defineProperty方法将属性key绑定到target上，其中的属性描述符就是上面设置的sharedPropertyDefinition。
   * 如此以来，就将计算属性绑定到实例vm上了。
   * 
   */
  Object.defineProperty(target, key, sharedPropertyDefinition)
}


/**
 * 计算属性有没有缓存及其响应式貌似主要在于是否将getter设置为createComputedGetter函数的返回结果。
 * 
 * 该函数是一个高阶函数，其内部返回了一个computedGetter函数,所以其实是将computedGetter函数赋给了sharedPropertyDefinition.get
 * 当获取计算属性的值时会执行属性的getter，而属性的getter就是 sharedPropertyDefinition.get，也就是说最终执行的 computedGetter函数。
 */
function createComputedGetter(key) {
  return function computedGetter() {
    // 首先存储在当前实例上_computedWatchers属性中key所对应的watcher实例，
    // 如果watcher存在，则调用watcher实例上的depend方法和evaluate方法，并且将evaluate方法的返回值作为计算属性的计算结果返回。
    const watcher = this._computedWatchers && this._computedWatchers[key]
    if (watcher) {
      if (watcher.dirty) {
        // 当调用watcher.evaluate()方法时，会先判断this.dirty是否为true，
        // 如果为true，则表明计算属性所依赖的数据发生了变化，则调用this.get()重新获取计算结果最后返回；如果为false，则直接返回之前的计算结果。
        watcher.evaluate()
      }
      if (Dep.target) {
        // 当调用watcher.depend()方法时，会将读取计算属性的那个watcher添加到计算属性的watcher实例的依赖列表中，当计算属性中用到的数据发生变化时，计算属性的watcher实例就会执行
        watcher.depend()
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter() {
    return fn.call(this, this)
  }
}

/** 
 * 初始化methods
 * 
 * 初始化methods无非就干了三件事：
 * 判断method有没有？
 * method的命名符不符合命名规范？
 * 如果method既有又符合规范那就把它挂载到vm实例上。
 * 
 * 
 */
function initMethods(vm: Component, methods: Object) {
  const props = vm.$options.props
  for (const key in methods) {
    // 遍历methods选项中的每一个对象
    if (process.env.NODE_ENV !== 'production') {
      // 在非生产环境下判断如果methods中某个方法不是函数类型，则抛出异常。
      if (typeof methods[key] !== 'function') {
        warn(
          `Method "${key}" has type "${typeof methods[key]}" in the component definition. ` +
          `Did you reference the function correctly?`,
          vm
        )
      }
      // 判断如果methods中某个方法名与props中某个属性名重复了，就抛出异常：提示用户方法名重复了。
      if (props && hasOwn(props, key)) {
        warn(
          `Method "${key}" has already been defined as a prop.`,
          vm
        )
      }
      // 判断如果methods中某个方法名如果在实例vm中已经存在并且方法名是以_或$开头的，就抛出异常：提示用户方法名命名不规范。
      // isReserved函数是用来判断字符串是否以_或$开头
      if ((key in vm) && isReserved(key)) {
        warn(
          `Method "${key}" conflicts with an existing Vue instance method. ` +
          `Avoid defining component methods that start with _ or $.`
        )
      }
    }

    // 最后，如果上述判断都没问题，那就method绑定到实例vm上，这样，我们就可以通过this.xxx来访问methods选项中的xxx方法了
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm)
  }
}

/** 
 * 初始化watch
 * 
 * 回顾一下watch选项的用法：
 */
// var vm = new Vue({
//       data: {
//       a: 1,
//       b: 2,
//       c: 3,
//       d: 4,
//       e: {
//         f: {
//           g: 5
//         }
//       }
//     },
//     watch: {
//       a: function (val, oldVal) {
//         console.log('new: %s, old: %s', val, oldVal)
//       },
//       // methods选项中的方法名
//       b: 'someMethod',
//       // 深度侦听，该回调会在任何被侦听的对象的 property 改变时被调用，不论其被嵌套多深
//       c: {
//         handler: function (val, oldVal) { /* ... */ },
//         deep: true
//       },
//       // 该回调将会在侦听开始之后被立即调用
//       d: {
//         handler: 'someMethod',
//         immediate: true
//       },
//       // 调用多个回调
//       e: [
//         'handle1',
//         function handle2 (val, oldVal) { /* ... */ },
//         {
//           handler: function handle3 (val, oldVal) { /* ... */ },
//         }
//       ],
//       // 侦听表达式
//       'e.f': function (val, oldVal) { /* ... */ }
//     }
//   })
//  vm.a = 2 // => new: 2, old: 1

/** 
 * 初始化watch
 * 
 watch选项的用法非常灵活。
 首先watch选项是一个对象，键是需要观察的表达式，值是对应回调函数。值也可以是方法名，或者包含选项的对象。
 既然给用户提供的用法灵活，那么在代码中就需要按条件来判断，根据不同的用法做相应的处理。
 */

function initWatch(vm: Component, watch: Object) {
  // 在函数内部会遍历watch选项，拿到每一项的key和对应的值handler。
  for (const key in watch) {
    const handler = watch[key]
    if (Array.isArray(handler)) {// 调用多个回调
      for (let i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i])
      }
    } else {
      createWatcher(vm, key, handler) // createWatcher函数来创建watcher
    }
  }
}

/**
 * 该函数接收4个参数
 * - vm:当前实例
 * - expOrFn:被侦听的属性表达式
 * - handler:watch选项中每一项的值
 * - options:用于传递给vm.$watch的选项对象
 * 
 * (1)在该函数内部，首先会判断传入的handler是否为一个对象，如果是一个对象，那么就认为用户使用的是这种写法:
 */

//  watch: {
//   c: {
//       handler: function (val, oldVal) { /* ... */ },
//   deep: true
//   }
// }

/**
 * 即带有侦听选项的写法，此时就将handler对象整体记作options，把handler对象中的handler属性作为真正的回调函数记作handler
 * 
 * (2)接着判断传入的handler是否为一个字符串，如果是一个字符串，那么就认为用户使用的是这种写法：
 */

//  watch: {
//   // methods选项中的方法名
//   b: 'someMethod',
// }

/**
 * 即回调函数是methods选项中的一个方法名，我们知道，在初始化methods选项的时候会将选项中的每一个方法都绑定到当前实例上，
 * 所以此时我们只需从当前实例上取出该方法作为真正的回调函数记作handler
 * 
 * （3）如果既不是对象又不是字符串，那么我们就认为它是一个函数，就不做任何处理。
 */
function createWatcher(
  vm: Component,
  expOrFn: string | Function,
  handler: any,
  options?: Object
) {
  if (isPlainObject(handler)) {
    options = handler
    handler = handler.handler
  }
  if (typeof handler === 'string') {
    handler = vm[handler]
  }

  // 针对不同类型的值处理完毕后，expOrFn是被侦听的属性表达式，handler变量是回调函数，options变量为侦听选项，最后，调用vm.$watcher方法，
  // 并传入以上三个参数完成初始化watch。
  return vm.$watch(expOrFn, handler, options)
}


/**
 * 与数据相关的实例方法有3个，分别是vm.$set、vm.$delete和vm.$watch。
 * 它们是在stateMixin函数中挂载到Vue原型上的
 */
export function stateMixin(Vue: Class<Component>) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  const dataDef = {}
  dataDef.get = function () { return this._data }
  const propsDef = {}
  propsDef.get = function () { return this._props }
  if (process.env.NODE_ENV !== 'production') {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      )
    }
    propsDef.set = function () {
      warn(`$props is readonly.`, this)
    }
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef)
  Object.defineProperty(Vue.prototype, '$props', propsDef)

  Vue.prototype.$set = set
  Vue.prototype.$delete = del

  Vue.prototype.$watch = function (
    expOrFn: string | Function,
    cb: any,
    options?: Object
  ): Function {
    const vm: Component = this
    // 在函数内部，首先判断传入的回调函数是否为一个对象，就像下面这种形式：
    //   vm.$watch(
    //       'a.b.c',
    //       {
    //           handler: function (val, oldVal) { /* ... */ },
    //           deep: true
    //         }
    //     )
    /** 
     * 如果传入的回调函数是个对象，那就表明用户是把第二个参数回调函数cb和第三个参数选项options合起来传入的，
     * 此时调用createWatcher函数
     */
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }

    // 接着获取到用户传入的options，如果用户没有传入则将其赋值为一个默认空对象
    options = options || {}

    // $watch方法内部会创建一个watcher实例，由于该实例是用户手动调用$watch方法创建而来的，
    // 所以给options添加user属性并赋值为true，用于区分用户创建的watcher实例和Vue内部创建的watcher实例
    options.user = true

    // 传入参数创建一个watcher实例
    const watcher = new Watcher(vm, expOrFn, cb, options)

    // 接着判断如果用户在选项参数options中指定的immediate为true，则立即用被观察数据当前的值触发回调
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value)
      } catch (error) {
        handleError(error, vm, `callback for immediate watcher "${watcher.expression}"`)
      }
    }

    // 最后返回一个取消观察函数unwatchFn，用来停止触发回调。
    return function unwatchFn() {
      watcher.teardown()
    }
  }
}
