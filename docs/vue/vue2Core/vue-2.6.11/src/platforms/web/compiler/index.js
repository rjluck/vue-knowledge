/* @flow */

import { baseOptions } from './options'
import { createCompiler } from 'compiler/index'

// compileToFunctions函数是 createCompiler 函数的返回值对象中的其中一个
const { compile, compileToFunctions } = createCompiler(baseOptions)

export { compile, compileToFunctions }
