/* @flow */

import { hasOwn } from 'shared/util'
import { warn, hasSymbol } from '../util/index'
import { defineReactive, toggleObserving } from '../observer/index'

export function initProvide(vm: Component) {
  const provide = vm.$options.provide
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide
  }
}

/**
 * 
 * 可以看到，initInjections函数的逻辑并不复杂，
 * 首先调用resolveInject把inject选项中的数据转化成键值对的形式赋给result
 * 
 * 如官方文档给出的例子，那么result应为如下样子：
 * // 父级组件提供 'foo'
    var Parent = {
      provide: {
        foo: 'bar'
      }
    }

    // 子组件注入 'foo'
    var Child = {
      inject: ['foo'],
    }

    // result
    result = {
        'foo':'bar'
    }
 * 
 * 然后遍历result中的每一对键值，调用defineReactive函数将其添加当前实例上，
 * 
 * 
 * 
 * 
 */
export function initInjections(vm: Component) {
  const result = resolveInject(vm.$options.inject, vm) //把inject选项中的数据转化成键值对的形式赋给result
  if (result) { // 然后遍历result中的每一对键值，调用defineReactive函数将其添加当前实例上
    // toggleObserving(false) 这个函数内部是把shouldObserve = false，这是为了告诉defineReactive函数仅仅是把键值添加到当前实例上而不需要将其转换成响应式
    toggleObserving(false)
    Object.keys(result).forEach(key => {
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production') {
        defineReactive(vm, key, result[key], () => {
          warn(
            `Avoid mutating an injected value directly since the changes will be ` +
            `overwritten whenever the provided component re-renders. ` +
            `injection being mutated: "${key}"`,
            vm
          )
        })
      } else {
        defineReactive(vm, key, result[key])
      }
    })
    toggleObserving(true)
  }
}

/** 
 * 把inject选项中的数据转化成键值对的形式赋给result
 * 
 * inject 选项中的每一个数据key都是由其上游父级组件提供的，
 * 所以我们应该把每一个数据key从当前组件起，不断的向上游父级组件中查找该数据key对应的值，直到找到为止。
 * 如果在上游所有父级组件中没找到，那么就看在inject 选项是否为该数据key设置了默认值，如果设置了就使用默认值，如果没有设置，则抛出异常。
 * 
 * var Parent = {
      provide: {
        foo: 'bar'
      },
      // ...
    }
    const Child = {
      inject: {
        foo: {
          from: 'bar',
          default: () => [1, 2, 3]
        }
      }
    }
 * 
 */
export function resolveInject(inject: any, vm: Component): ?Object {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    const result = Object.create(null) // 首先创建一个空对象result，用来存储inject 选项中的数据key及其对应的值，作为最后的返回结果。
    // 获取当前inject 选项中的所有key
    const keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject)

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      // #6574 in case the inject object is observed...
      if (key === '__ob__') continue
      const provideKey = inject[key].from   // 拿到每一个key的from属性记作provideKey，provideKey就是上游父级组件提供的源属性
      let source = vm
      // 开启一个while循环，从当前组件起，不断的向上游父级组件的_provided属性中
      // （父级组件使用provide选项注入数据时会将注入的数据存入自己的实例的_provided属性中）查找，直到查找到源属性的对应的值，将其存入result中
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey]
          break
        }
        source = source.$parent
      }

      // 如果没有找到，那么就看inject 选项中当前的数据key是否设置了默认值，即是否有default属性，如果有的话，则拿到这个默认值，
      // 官方文档示例中说了，默认值可以为一个工厂函数，所以当默认值是函数的时候，就去该函数的返回值，否则就取默认值本身。如果没有设置默认值，则抛出异常。
      if (!source) {
        if ('default' in inject[key]) {
          const provideDefault = inject[key].default
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault
        } else if (process.env.NODE_ENV !== 'production') {
          warn(`Injection "${key}" not found`, vm)
        }
      }
    }
    return result
  }
}

/** 
 * 此时你可能会有个疑问，官方文档中说inject 选项可以是一个字符串数组，也可以是一个对象，在上面的代码中只看见了处理当为对象的情况，那如果是字符串数组呢？怎么没有处理呢？
 * 
 * 其实在初始化阶段_init函数在合并属性的时候还调用了一个将inject 选项数据规范化的函数normalizeInject，该函数的作用是将以下这三种写法：

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
  *  这样做的目的是，不管用户使用了何种写法，统统将其转化成一种便于集中处理的写法。
  * 
  */