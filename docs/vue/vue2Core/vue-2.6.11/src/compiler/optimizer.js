/* @flow */

import { makeMap, isBuiltInTag, cached, no } from 'shared/util'

let isStaticKey
let isPlatformReservedTag

const genStaticKeysCached = cached(genStaticKeys)

/**
 * Goal of the optimizer: walk the generated template AST tree
 * and detect sub-trees that are purely static, i.e. parts of
 * the DOM that never needs to change.
 *
 * Once we detect these sub-trees, we can:
 *
 * 1. Hoist them into constants, so that we no longer need to
 *    create fresh nodes for them on each re-render;
 * 2. Completely skip them in the patching process.
 * 
 * 为什么要有优化阶段?
 * 是为了提高虚拟DOM中patch过程的性能。在优化阶段将所有静态节点都打上标记，这样在patch过程中就可以跳过对比这些节点。
 * 
 *  * 优化阶段其实就干了两件事：
    - 在AST中找出所有静态节点并打上标记；
    - 在AST中找出所有静态根节点并打上标记；
 * 
 */
export function optimize(root: ?ASTElement, options: CompilerOptions) {
  if (!root) return
  isStaticKey = genStaticKeysCached(options.staticKeys || '')
  isPlatformReservedTag = options.isReservedTag || no
  // first pass: mark all non-static nodes.
  // 标记静态节点
  markStatic(root)
  // second pass: mark static roots.
  // 标记静态根节点
  markStaticRoots(root, false)
}

function genStaticKeys(keys: string): Function {
  return makeMap(
    'type,tag,attrsList,attrsMap,plain,parent,children,attrs,start,end,rawAttrsMap' +
    (keys ? ',' + keys : '')
  )
}

/** 
 * 标记静态节点
 * 
 * 从AST中找出所有静态节点并标记其实不难，
 * 我们只需从根节点开始，先标记根节点是否为静态节点，然后看根节点如果是元素节点，
 * 那么就去向下递归它的子节点，子节点如果还有子节点那就继续向下递归，直到标记完所有节点。
 */
function markStatic(node: ASTNode) {
  node.static = isStatic(node) // 标记是否为静态节点

  // 标记完当前节点是否为静态节点之后，如果该节点是元素节点，那么还要继续去递归判断它的子节点
  if (node.type === 1) {
    // do not make component slot content static. this avoids
    // 1. components not able to mutate slot nodes
    // 2. static slot content fails for hot-reloading
    if (
      !isPlatformReservedTag(node.tag) &&
      node.tag !== 'slot' &&
      node.attrsMap['inline-template'] == null
    ) {
      return
    }
    for (let i = 0, l = node.children.length; i < l; i++) {
      const child = node.children[i]
      markStatic(child)
      if (!child.static) {
        // 如果当前节点的子节点有一个不是静态节点，那就把当前节点也标记为非静态节点。

        /**
         * 这是因为我们在判断的时候是从上往下判断的，也就是说先判断当前节点，再判断当前节点的子节点，
         * 如果当前节点在一开始被标记为了静态节点，但是通过判断子节点的时候发现有一个子节点却不是静态节点，这就有问题了，我们之前说过一旦标记为静态节点，
         * 就说明这个节点首次渲染之后不会再发生任何变化，
         * 但是它的一个子节点却又是可以变化的，就出现了自相矛盾，所以我们需要当发现它的子节点中有一个不是静态节点的时候，就得把当前节点重新设置为非静态节点
         */
        node.static = false
      }
    }

    // 循环node.children后还不算把所有子节点都遍历完，因为如果当前节点的子节点中有标签带有v-if、v-else-if、v-else等指令时，
    // 这些子节点在每次渲染时都只渲染一个，所以其余没有被渲染的肯定不在node.children中，而是存在于node.ifConditions，所以我们还要把node.ifConditions循环一遍，
    if (node.ifConditions) {
      for (let i = 1, l = node.ifConditions.length; i < l; i++) {
        const block = node.ifConditions[i].block
        markStatic(block)
        if (!block.static) {
          // 同理，如果当前节点的node.ifConditions中有一个子节点不是静态节点也要将当前节点设置为非静态节点。
          node.static = false
        }
      }
    }
  }
}


/*** 
 * 标记静态根节点
 * 
 * 寻找静态根节点和寻找静态节点的逻辑类似，都是从AST根节点递归向下遍历寻找
 * 
 * 
 * markStaticRoots 第二个参数是 isInFor，对于已经是 static 的节点或者是 v-once 指令的节点，node.staticInFor = isInFor
 * 
 * 从代码和注释中我们可以看到，一个节点要想成为静态根节点，它必须满足以下要求：
    - 节点本身必须是静态节点；
    - 必须拥有子节点 children；
    - 子节点不能只是只有一个文本节点； 
 * 否则的话，对它的优化成本将大于优化后带来的收益。
 */
function markStaticRoots(node: ASTNode, isInFor: boolean) {
  if (node.type === 1) {
    // 对于已经是 static 的节点或者是 v-once 指令的节点，node.staticInFor = isInFor
    if (node.static || node.once) {
      node.staticInFor = isInFor
    }
    // For a node to qualify as a static root, it should have children that
    // are not just static text. Otherwise the cost of hoisting out will
    // outweigh the benefits and it's better off to just always render it fresh.
    // 接着判断该节点是否为静态根节点
    // 为了使节点有资格作为静态根节点，它应具有不只是静态文本的子节点。 否则，优化的成本将超过收益，最好始终将其更新。
    if (node.static && node.children.length && !(
      node.children.length === 1 &&
      node.children[0].type === 3
    )) {
      node.staticRoot = true
      return
    } else {
      node.staticRoot = false
    }

    // 如果当前节点不是静态根节点，那就继续递归遍历它的子节点node.children和node.ifConditions
    if (node.children) {
      for (let i = 0, l = node.children.length; i < l; i++) {
        markStaticRoots(node.children[i], isInFor || !!node.for)
      }
    }
    if (node.ifConditions) {
      for (let i = 1, l = node.ifConditions.length; i < l; i++) {
        markStaticRoots(node.ifConditions[i].block, isInFor)
      }
    }
  }
}

/** 
 * isStatic函数标记节点是否为静态节点
 * 该函数若返回true表示该节点是静态节点，若返回false表示该节点不是静态节点
 * 
 * 在HTML解析器在调用钩子函数创建AST节点时会根据节点类型的不同为节点加上不同的type属性，用type属性来标记AST节点的节点类型，其对应关系如下：
 * type 1 --- 元素节点
 * type 2 --- 包含变量的动态文本节点
 * type 3 --- 不包含变量的纯文本节点
 * 
 * 
 * 如果元素节点是静态节点，那就必须满足以下几点要求：
    - 如果节点使用了v-pre指令，那就断定它是静态节点；
    - 如果节点没有使用v-pre指令，那它要成为静态节点必须满足：
      - 不能使用动态绑定语法，即标签上不能有v-、@、:开头的属性；
      - 不能使用v-if、v-else、v-for指令；
      - 不能是内置组件，即标签名不能是slot和component；
      - 标签名必须是平台保留标签，即不能是组件；
      - 当前节点的父节点不能是带有 v-for 的 template 标签；
      - 节点的所有属性的 key 都必须是静态节点才有的 key，注：静态节点的key是有限的，它只能是type,tag,attrsList,attrsMap,plain,parent,children,attrs之一；
 */
function isStatic(node: ASTNode): boolean {
  if (node.type === 2) { // expression   // 包含变量的动态文本节点
    return false
  }
  if (node.type === 3) { // text  // 不包含变量的纯文本节点
    return true
  }
  return !!(node.pre || (
    !node.hasBindings && // no dynamic bindings
    !node.if && !node.for && // not v-if or v-for or v-else
    !isBuiltInTag(node.tag) && // not a built-in
    isPlatformReservedTag(node.tag) && // not a component
    !isDirectChildOfTemplateFor(node) &&
    Object.keys(node).every(isStaticKey)
  ))
}

function isDirectChildOfTemplateFor(node: ASTElement): boolean {
  while (node.parent) {
    node = node.parent
    if (node.tag !== 'template') {
      return false
    }
    if (node.for) {
      return true
    }
  }
  return false
}
