/* @flow */

import { ASSET_TYPES } from 'shared/constants'
import { isPlainObject, validateComponentName } from '../util/index'

export function initAssetRegisters(Vue: GlobalAPI) {
  /**
   * Create asset registration methods.
   * 
   * 该API可以用来注册或获取全局指令，这两种功能的切换取决于是否传入了definition参数。
   * 如果没有传入definition参数，则表示为获取指令，那么就从存放指令的地方根据指令id来读取指令并返回
   * 
   * 如果传入了definition参数，则表示为注册指令，那么继续判断definition参数是否是一个函数，
   * 如果是函数，则默认监听bind和update两个事件，即将definition函数分别赋给bind和update两个属性。
   * 
   * 如果definition参数不是一个函数，那么即认为它是用户自定义的指令对象，直接将其保存在this.options['directives']中
   * 
   * Vue.directive、Vue.filter和Vue.component
   */
  ASSET_TYPES.forEach(type => {
    Vue[type] = function (
      id: string,
      definition: Function | Object
    ): Function | Object | void {
      if (!definition) {
        // 获取指令
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        // 注册指令/组件

        // 那么在非生产环境下首先会校验组件的name值是否合法
        if (process.env.NODE_ENV !== 'production' && type === 'component') {
          validateComponentName(id)
        }
        // 全局组件
        // 判断传入的definition参数是否是一个对象，如果是对象，则使用Vue.extend方法将其变为Vue的子类，
        // 同时如果definition对象中不存在name属性时，则使用组件id作为组件的name属性。
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id
          definition = this.options._base.extend(definition)
        }
        // 全局指令
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition }
        }

        // 如果definition参数不是一个函数，那么即认为它是用户自定义的指令对象，直接将其保存在this.options['directives']中
        this.options[type + 's'][id] = definition
        return definition
      }
    }
  })
}
