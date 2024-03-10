/* @flow */

import { ASSET_TYPES } from 'shared/constants'
import { defineComputed, proxy } from '../instance/state'
import { extend, mergeOptions, validateComponentName } from '../util/index'

export function initExtend(Vue: GlobalAPI) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0
  let cid = 1

  /**
   * Class inheritance
   * Vue.extend的作用是创建一个继承自Vue类的子类，可接收的参数是一个包含组件选项的对象。
   * 
   * 既然是Vue类的子类，那么除了它本身独有的一些属性方法，还有一些是从Vue类中继承而来，
   * 所以创建子类的过程其实就是一边给子类上添加上独有的属性，一边将父类的公共属性复制到子类上。
   * 
   * 
   * 整个过程就是先创建一个类Sub，接着通过原型继承的方式将该类继承基础Vue类，然后给Sub类添加一些属性以及将父类的某些属性复制到Sub类上，最后将Sub类返回。
   */
  Vue.extend = function (extendOptions: Object): Function {
    extendOptions = extendOptions || {}  // extendOptions：用户传入的一个包含组件选项的对象参数；
    const Super = this //Super：指向父类，即基础 Vue类；
    // SuperId：父类的cid属性，无论是基础 Vue类还是从基础 Vue类继承而来的类，都有一个cid属性，作为该类的唯一标识；
    const SuperId = Super.cid
    // cachedCtors：缓存池，用于缓存创建出来的类；
    const cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {})
    /**
     * 在缓存池中先尝试获取是否之前已经创建过的该子类，如果之前创建过，则直接返回之前创建的。
     * 之所以有这一步，是因为Vue为了性能考虑，反复调用Vue.extend其实应该返回同一个结果，只要返回结果是固定的，就可以将结果缓存，再次调用时，只需从缓存中取出结果即可。
     * 在API方法定义的最后，当创建完子类后，会使用父类的cid作为key，创建好的子类作为value，存入缓存池cachedCtors中。
     */
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    // 获取到传入的选项参数中的name字段，并且在开发环境下校验name字段是否合法
    const name = extendOptions.name || Super.options.name
    if (process.env.NODE_ENV !== 'production' && name) {
      validateComponentName(name)
    }

    // 创建一个类Sub，这个类就是将要继承基础Vue类的子类
    const Sub = function VueComponent(options) {
      this._init(options)
    }

    // 首先，将父类的原型继承到子类中，并且为子类添加唯一标识cid
    Sub.prototype = Object.create(Super.prototype)
    Sub.prototype.constructor = Sub
    Sub.cid = cid++

    // 接着，将父类的options与子类的options进行合并，将合并结果赋给子类的options属性
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    )

    // 接着，将父类保存到子类的super属性中，以确保在子类中能够拿到父类
    Sub['super'] = Super

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    // 接着，如果选项中存在props属性，则初始化它
    // 初始化props属性其实就是把参数中传入的props选项代理到原型的_props中
    if (Sub.options.props) {
      initProps(Sub)
    }

    // 接着，如果选项中存在computed属性，则初始化它
    // 初始化computed,就是遍历参数中传入的computed选项，将每一项都调用defineComputed函数定义到子类原型上。
    // 此处的defineComputed函数与我们之前在生命周期初始化阶段initState中所介绍的defineComputed函数是一样的
    if (Sub.options.computed) {
      initComputed(Sub)
    }

    // allow further extension/mixin/plugin usage
    // 接着，将父类中的一些属性复制到子类中
    Sub.extend = Super.extend
    Sub.mixin = Super.mixin
    Sub.use = Super.use

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type]
    })
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    // 接着，给子类新增三个独有的属性
    Sub.superOptions = Super.options
    Sub.extendOptions = extendOptions
    Sub.sealedOptions = extend({}, Sub.options)

    // cache constructor
    // 最后，使用父类的cid作为key，创建好的子类Sub作为value，存入缓存池cachedCtors中
    cachedCtors[SuperId] = Sub

    // 最终将创建好的子类Sub返回。
    return Sub
  }
}

function initProps(Comp) {
  const props = Comp.options.props
  for (const key in props) {
    proxy(Comp.prototype, `_props`, key)
  }
}

function initComputed(Comp) {
  const computed = Comp.options.computed
  for (const key in computed) {
    defineComputed(Comp.prototype, key, computed[key])
  }
}
