/* @flow */
/**    
 * 将一堆字符串模板解析成抽象语法树AST后，我们就可以对其进行各种操作处理了，处理完后用处理后的AST来生成render函数。其具体流程可大致分为三个阶段：
   - 模板解析阶段：将一堆模板字符串用正则等方式解析成抽象语法树AST；
   - 优化阶段：遍历AST，找出其中的静态节点，并打上标记；
   - 代码生成阶段：将AST转换成渲染函数；
 * 这三个阶段在源码中分别对应三个模块，下面给出三个模块的源代码在源码中的路径：
   - 模板解析阶段——解析器——源码路径：src/compiler/parser/index.js;
   - 优化阶段——优化器——源码路径：src/compiler/optimizer.js;
   - 代码生成阶段——代码生成器——源码路径：src/compiler/codegen/index.js
 */


/** 
 * 模板编译的最终目的是用模板生成一个render函数，而用render函数就可以生成与模板对应的VNode，之后再进行patch算法，最后完成视图渲染。
 * 这中间的patch算法又是用来对比新旧VNode之间存在的差异。
 * 在上面我们还说了，静态节点不管状态怎么变化它是不会变的，基于此，那我们就可以在patch过程中不用去对比这些静态节点了，这样不就又可以提高一些性能了吗？ 
 * 
 * 所以我们在模板编译的时候就先找出模板中所有的静态节点和静态根节点，然后给它们打上标记，
 * 用于告诉后面patch过程打了标记的这些节点是不需要对比的，你只要把它们克隆一份去用就好啦。这就是优化阶段存在的意义。
 * 
 * 
 * 优化阶段其实就干了两件事：
    - 在AST中找出所有静态节点并打上标记；
    - 在AST中找出所有静态根节点并打上标记；
 * 
 */

/** 
 * 所谓代码生成阶段，到底是要生成什么代码？
 * 答：要生成render函数字符串。
 * 
 * Vue实例在挂载的时候会调用其自身的render函数来生成实例上的template选项所对应的VNode，简单的来说就是Vue只要调用了render函数，就可以把模板转换成对应的虚拟DOM。
 * 
 * 那么Vue要想调用render函数，那必须要先有这个render函数，那这个render函数又是从哪来的呢？是用户手写的还是Vue自己生成的？答案是都有可能。
 * 
 * 我们知道，我们在日常开发中是可以在Vue组件选项中手写一个render选项，其值对应一个函数，那这个函数就是render函数，
 * 当用户手写了render函数时，那么Vue在挂载该组件的时候就会调用用户手写的这个render函数。
 * 那如果用户没有写呢？
 * 那这个时候Vue就要自己根据模板内容生成一个render函数供组件挂载的时候调用。而Vue自己根据模板内容生成render函数的过程就是本篇文章所要介绍的代码生成阶段。
 * 
 * 
 * 现在我们知道了，所谓代码生成其实就是根据模板对应的抽象语法树AST生成一个函数，通过调用这个函数就可以得到模板对应的虚拟DOM
 * 
 * 代码生成阶段主要的工作就是根据已有的AST生成对应的render函数供组件挂载时调用，组件只要调用的这个render函数就可以得到AST对应的虚拟DOM的VNode。
 * 
  */

/*** 
 * 我们需要搞清楚模板编译的最终目的是什么，
 * 它的最终目的就是：把用户所写的模板转化成供Vue实例在挂载时可调用的render函数。
 * 或者你可以这样简单的理解为：模板编译就是一台机器，给它输入模板字符串，它就输出对应的render函数。
 * 
 * 
 * 模板编译就是把模板转化成供Vue实例在挂载时可调用的render函数。
 * 那么我们就从Vue实例挂载时入手，一步一步从后往前推。我们知道，Vue实例在挂载时会调用全局实例方法——$mount方法
 * 
 */
import { parse } from './parser/index'
import { optimize } from './optimizer'
import { generate } from './codegen/index'
import { createCompilerCreator } from './create-compiler'

// `createCompilerCreator` allows creating compilers that use alternative
// parser/optimizer/codegen, e.g the SSR optimizing compiler.
// Here we just export a default compiler using the default parts.
// 这个baseCompile函数就是我们所说的模板编译三大阶段的主函数
export const createCompiler = createCompilerCreator(function baseCompile(
  template: string,
  options: CompilerOptions
): CompiledResult {
  // 模板解析阶段：用正则等方式解析 template 模板中的指令、class、style等数据，形成AST
  const ast = parse(template.trim(), options)
  if (options.optimize !== false) {
    // 优化阶段：遍历AST，找出其中的静态节点，并打上标记；
    // 这是 Vue 在编译过程中的一处优化，挡在进行patch 的过程中， DOM-Diff 算法会直接跳过静态节点，从而减少了比较的过程，优化了 patch 的性能。
    optimize(ast, options)
  }

  // 代码生成阶段：将AST转换成渲染函数；
  // 得到结果是 render函数 的字符串以及 staticRenderFns 字符串。
  // 调用generate函数并传入优化后得到的ast
  const code = generate(ast, options)

  // 最终返回了抽象语法树( ast )，渲染函数( render )，静态渲染函数( staticRenderFns )，
  // 且render 的值为code.render，staticRenderFns 的值为code.staticRenderFns，也就是说通过 generate处理 ast之后得到的返回值 code 是一个对象。
  return {
    ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
})
