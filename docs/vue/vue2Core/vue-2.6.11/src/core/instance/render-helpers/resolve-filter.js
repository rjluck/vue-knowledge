/* @flow */

import { identity, resolveAsset } from 'core/util/index'

/**
 * Runtime helper for resolving filters
 * 
 * resolveFilter函数内部只有一行代码，就是调用resolveAsset函数并获取其返回值，
 * 如果返回值不存在，则返回identity，而identity是一个返回同参数一样的值
 * 
 * resolveAsset函数位于源码的src/core/util/options.js
 * 
 * 过滤器的内部工作原理，就是将用户写在模板中的过滤器通过模板编译，编译成_f函数的调用字符串，之后在执行渲染函数的时候会执行_f函数，从而使过滤器生效。
    所谓_f函数其实就是resolveFilter函数的别名，
    在resolveFilter函数内部是根据过滤器id从当前实例的$options中的filters属性中获取到对应的过滤器函数，
    在之后执行渲染函数的时候就会执行获取到的过滤器函数。
 * 
 */
export function resolveFilter(id: string): Function {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}


/** 解析过滤器说明
 * （1） 写在 v-bind 表达式中
 * v-bind 表达式中的过滤器它属于存在于标签属性中，那么写在该处的过滤器就需要在处理标签属性时进行解析。
 * 我们知道，在HTML解析器parseHTML函数中负责处理标签属性的函数是processAttrs，
 * 所以会在processAttrs函数中调用过滤器解析器parseFilters函数对写在该处的过滤器进行解析
 * 
 * 
 * （2）写在双花括号中
 * 在双花括号中的过滤器它属于存在于标签文本中，那么写在该处的过滤器就需要在处理标签文本时进行解析。
 * 我们知道，在HTML解析器parseHTML函数中，当遇到文本信息时会调用parseHTML函数的chars钩子函数，
 * 在chars钩子函数内部又会调用文本解析器parseText函数对文本进行解析，而写在该处的过滤器它就是存在于文本中，
 * 所以会在文本解析器parseText函数中调用过滤器解析器parseFilters函数对写在该处的过滤器进行解析
 * 
 * 
 * parseFilters函数的定义位于源码的src/complier/parser/filter-parser.js文件中
 * 
 */