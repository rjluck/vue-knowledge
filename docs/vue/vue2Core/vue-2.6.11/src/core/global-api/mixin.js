/* @flow */

import { mergeOptions } from '../util/index'


/**
 * Vue.minxin 该API是用来向全局注册一个混入，即可以修改Vue.options属性，
 * 并且会影响之后的所有Vue实例，这个API虽然在日常的业务开发中几乎用不到，但是在编写Vue插件时用处非常大。
 * 
 * ，该API就是通过修改Vue.options属性进而影响之后的所有Vue实例。
 * 所以我们只需将传入的mixin对象与this.options合并即可，
 * 然后将合并后的新对象作为this.options传给之后的所有Vue实例，从而达到改变其原有特性的效果。
 */
export function initMixin(Vue: GlobalAPI) {
  Vue.mixin = function (mixin: Object) {
    this.options = mergeOptions(this.options, mixin)
    return this
  }
}
