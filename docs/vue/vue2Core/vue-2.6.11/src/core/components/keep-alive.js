/* @flow */

import { isRegExp, remove } from 'shared/util'
import { getFirstComponentChild } from 'core/vdom/helpers/index'

type VNodeCache = { [key: string]: ?VNode };

/**
 * 优先获取组件的name字段，如果name不存在则获取组件的tag
 */
function getComponentName(opts: ?VNodeComponentOptions): ?string {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches(pattern: string | RegExp | Array<string>, name: string): boolean {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}


/**
 * 需要缓存的组件的规则或者不需要缓存的组件的规则发生了变化，那么就执行pruneCache函数
 * 
 * 在该函数内对this.cache对象进行遍历，取出每一项的name值，用其与新的缓存规则进行匹配，如果匹配不上，
 * 则表示在新的缓存规则下该组件已经不需要被缓存，则调用pruneCacheEntry函数将这个已经不需要缓存的组件实例先销毁掉，
 * 然后再将其从this.cache对象中剔除。
 */
function pruneCache(keepAliveInstance: any, filter: Function) {
  const { cache, keys, _vnode } = keepAliveInstance
  for (const key in cache) {
    const cachedNode: ?VNode = cache[key]
    if (cachedNode) {
      const name: ?string = getComponentName(cachedNode.componentOptions)
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode)
      }
    }
  }
}

/**
 * 将那些被缓存的并且当前没有处于被渲染状态的组件都销毁掉并将其从this.cache对象中剔除。
 */
function pruneCacheEntry(
  cache: VNodeCache,
  key: string,
  keys: Array<string>,
  current?: VNode
) {
  const cached = cache[key]
  // 判断当前没有处于被渲染状态的组件，将其销毁
  if (cached && (!current || cached.tag !== current.tag)) {
    cached.componentInstance.$destroy()
  }
  cache[key] = null
  remove(keys, key)
}

const patternTypes: Array<Function> = [String, RegExp, Array]

/**
 * 可以看到，该组件内没有常规的<template></template>标签，取而代之的是它内部多了一个叫做render的函数，
 * 所以它不是一个常规的模板组件，而是一个函数式组件。
 * 执行 <keep-alive> 组件渲染的时候，就会执行到这个 render 函数
 * 
 * 
 */
export default {
  name: 'keep-alive',
  abstract: true,

  // 在props选项内接收传进来的三个属性：include、exclude和max。
  /**
   * include:表示只有匹配到的组件会被缓存
   * exclude：表示任何匹配到的组件都不会被缓存
   * max:表示缓存组件的数量，因为我们是缓存的vnode对象，它也会持有DOM，当我们缓存的组件很多的时候，
   * 会比较占用内存，所以该配置允许我们指定缓存组件的数量。
   */
  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  /**
   * 在 created 钩子函数里定义并初始化了两个属性： this.cache 和 this.keys。
   * 
   * (1) this.cache是一个对象，用来存储需要缓存的组件，它将以如下形式存储：
   * this.cache = {
      'key1':'组件1',
      'key2':'组件2',
      // ...
     }
   * 
   * (2) this.keys是一个数组，用来存储每个需要缓存的组件的key，即对应this.cache对象中的键值。
   * 
   */
  created() {
    this.cache = Object.create(null)
    this.keys = []
  },


  /**
   * 当<keep-alive>组件被销毁时，此时会调用destroyed钩子函数，在该钩子函数里会遍历this.cache对象，
   * 然后将那些被缓存的并且当前没有处于被渲染状态的组件都销毁掉并将其从this.cache对象中剔除。
   */
  destroyed() {
    for (const key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys)
    }
  },

  /**
   * 在mounted钩子函数中观测 include 和 exclude 的变化
   * 
   * 如果include 或exclude 发生了变化，即表示定义需要缓存的组件的规则或者不需要缓存的组件的规则发生了变化，那么就执行pruneCache函数
   */
  mounted() {
    this.$watch('include', val => {
      pruneCache(this, name => matches(val, name))
    })
    this.$watch('exclude', val => {
      pruneCache(this, name => !matches(val, name))
    })
  },

  /**
   * 接下来就是重头戏render函数，也是本篇文章中的重中之重。以上工作都是一些辅助工作，真正实现缓存功能的就在这个render函数里
   */
  render() {
    // （1）首先获取第一个子组件节点的 vnode
    /**
     * 获取默认插槽中的第一个组件节点
     * 由于我们也是在 <keep-alive> 标签内部写 DOM，所以可以先获取到它的默认插槽，
     * 然后再获取到它的第一个子节点。<keep-alive> 只处理第一个子元素，
     * 所以一般和它搭配使用的有 component 动态组件或者是 router-view。
     */
    const slot = this.$slots.default
    const vnode: VNode = getFirstComponentChild(slot)
    const componentOptions: ?VNodeComponentOptions = vnode && vnode.componentOptions
    if (componentOptions) {
      // check pattern
      // （2）获取该组件节点的名称
      const name: ?string = getComponentName(componentOptions)
      // （3）用组件名称跟 include、exclude 中的匹配规则去匹配
      // 如果组件名称与 include 规则不匹配或者与 exclude 规则匹配，则表示不缓存该组件，直接返回这个组件的 vnode，否则的话走下一步缓存
      const { include, exclude } = this
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      const { cache, keys } = this
      // 获取组件的key
      const key: ?string = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? `::${componentOptions.tag}` : '')
        : vnode.key

      /**
       * 拿到key值后去this.cache对象中去寻找是否有该值，如果有则表示该组件有缓存，即命中缓存
       */
      /* 如果命中缓存，则直接从缓存中拿 vnode 的组件实例 */
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance
        // make current key freshest

        // 调整该组件key的顺序，将其从原来的地方删掉并重新放在最后一个
        remove(keys, key)
        keys.push(key)
      }
      /* 如果没有命中缓存，则将其设置进缓存 */
      else {
        cache[key] = vnode
        keys.push(key)
        // prune oldest entry
        /* 如果配置了max并且缓存的长度超过了this.max，则从缓存中删除第一个 */
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode)
        }
      }

      /* 最后设置keepAlive标记位 */
      vnode.data.keepAlive = true
    }

    // 最后将vnode返回 
    return vnode || (slot && slot[0])
  }
}

/**
 * 那么问题来了：为什么要删除第一个缓存组件并且为什么命中缓存了还要调整组件key的顺序？
 * 
 * 这其实应用了一个缓存淘汰策略LRU：
 * LRU（Least recently used，最近最少使用）算法根据数据的历史访问记录来进行淘汰数据，
 * 其核心思想是“如果数据最近被访问过，那么将来被访问的几率也更高”。
 * 
 * 
 * 
 */
