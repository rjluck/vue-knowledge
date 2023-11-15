/* @flow */

import { toArray } from '../util/index'


/**
 * Vue.use该API是用来安装Vue.js插件的。并且我们知道了，
 * 该API内部会调用插件提供的install 方法，同时将Vue 作为参数传入。
 * 另外，由于插件只会被安装一次，所以该API内部还应该防止 install 方法被同一个插件多次调用。
 * 
 */
export function initUse(Vue: GlobalAPI) {
  Vue.use = function (plugin: Function | Object) {
    // 在该函数内部，首先定义了一个变量installedPlugins,该变量初始值是一个空数组，用来存储已安装过的插件。
    const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
    // 首先判断传入的插件是否存在于installedPlugins数组中（即已被安装过），如果存在的话，则直接返回，防止重复安装。
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    // 接下来获取到传入的其余参数，并且使用toArray方法将其转换成数组，
    // 同时将Vue插入到该数组的第一个位置，这是因为在后续调用install方法时，Vue必须作为第一个参数传入。
    const args = toArray(arguments, 1)
    args.unshift(this)
    /**
     * 传入的插件可以是一个提供了 install 方法的对象。
     * 也可以是一个函数，那么这个函数会被作为 install 方法。
     * 所以在接下来会根据这两种不同的情况分别处理。
     */

    //  判断传入的插件如果是一个提供了 install 方法的对象，那么就执行该对象中提供的 install 方法并传入参数完成插件安装。
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args)
    } else if (typeof plugin === 'function') {
      // 如果传入的插件是一个函数，那么就把这个函数当作install方法执行，同时传入参数完成插件安装。
      plugin.apply(null, args)
    }

    // 插件安装完成之后，将该插件添加进已安装插件列表中，防止重复安装。
    installedPlugins.push(plugin)
    return this
  }
}
