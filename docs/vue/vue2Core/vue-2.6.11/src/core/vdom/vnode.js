/* @flow */

/*
*VNode类中包含了描述一个真实DOM节点所需要的一系列属性，
如tag表示节点的标签名，text表示节点中包含的文本，children表示该节点包含的子节点等。
通过属性之间不同的搭配，就可以描述出各种类型的真实DOM节点。


VNode可以描述的多种节点类型，它们本质上都是VNode类的实例，只是在实例化的时候传入的属性参数不同而已。
*/


export default class VNode {
  tag: string | void;
  data: VNodeData | void;
  children: ?Array<VNode>;
  text: string | void;
  elm: Node | void;
  ns: string | void;
  context: Component | void; // rendered in this component's scope
  key: string | number | void;
  componentOptions: VNodeComponentOptions | void;
  componentInstance: Component | void; // component instance
  parent: VNode | void; // component placeholder node

  // strictly internal
  raw: boolean; // contains raw HTML? (server only)
  isStatic: boolean; // hoisted static node
  isRootInsert: boolean; // necessary for enter transition check
  isComment: boolean; // empty comment placeholder?
  isCloned: boolean; // is a cloned node?
  isOnce: boolean; // is a v-once node?
  asyncFactory: Function | void; // async component factory function
  asyncMeta: Object | void;
  isAsyncPlaceholder: boolean;
  ssrContext: Object | void;
  fnContext: Component | void; // real context vm for functional nodes
  fnOptions: ?ComponentOptions; // for SSR caching
  devtoolsMeta: ?Object; // used to store functional render context for devtools
  fnScopeId: ?string; // functional scope id support

  constructor(
    tag?: string,
    data?: VNodeData,
    children?: ?Array<VNode>,
    text?: string,
    elm?: Node,
    context?: Component,
    componentOptions?: VNodeComponentOptions,
    asyncFactory?: Function
  ) {
    this.tag = tag  /*当前节点的标签名*/
    this.data = data   /*当前节点对应的对象，包含了具体的一些数据信息，是一个VNodeData类型，可以参考VNodeData类型中的数据信息*/
    this.children = children /*当前节点的子节点，是一个数组*/
    this.text = text /*当前节点的文本*/
    this.elm = elm /*当前虚拟节点对应的真实dom节点*/
    this.ns = undefined   /*当前节点的名字空间*/
    this.context = context /*当前组件节点对应的Vue实例*/
    this.fnContext = undefined  /*函数式组件对应的Vue实例*/
    this.fnOptions = undefined
    this.fnScopeId = undefined
    this.key = data && data.key /*节点的key属性，被当作节点的标志，用以优化*/
    this.componentOptions = componentOptions /*组件的option选项*/
    this.componentInstance = undefined /*当前节点对应的组件的实例*/
    this.parent = undefined /*当前节点的父节点*/
    this.raw = false /*简而言之就是是否为原生HTML或只是普通文本，innerHTML的时候为true，textContent的时候为false*/
    this.isStatic = false /*静态节点标志*/
    this.isRootInsert = true /*是否作为跟节点插入*/
    this.isComment = false   /*是否为注释节点*/
    this.isCloned = false /*是否为克隆节点*/
    this.isOnce = false  /*是否有v-once指令*/
    this.asyncFactory = asyncFactory
    this.asyncMeta = undefined
    this.isAsyncPlaceholder = false
  }

  // DEPRECATED: alias for componentInstance for backwards compat.
  /* istanbul ignore next */
  get child(): Component | void {
    return this.componentInstance
  }
}

/**
 * 
 * VNode类可以描述出各种类型的真实DOM节点。那么它都可以描述出哪些类型的节点呢？通过阅读源码，可以发现通过不同属性的搭配，可以描述出以下几种类型的节点。
注释节点（可以被创建）
文本节点（可以被创建）
元素节点（可以被创建）
组件节点
函数式组件节点
克隆节点
 */

// 创建注释节点
// 注释节点描述起来相对就非常简单了，它只需两个属性就够了
// 分别是：text和isComment。其中text属性表示具体的注释信息，isComment是一个标志，用来标识一个节点是否是注释节点
export const createEmptyVNode = (text: string = '') => {
  const node = new VNode()
  node.text = text
  node.isComment = true
  return node
}

// 创建文本节点
// 文本节点描述起来比注释节点更简单，因为它只需要一个属性，那就是text属性，用来表示具体的文本信息。
export function createTextVNode(val: string | number) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
// 创建克隆节点
// 克隆节点就是把一个已经存在的节点复制一份出来，它主要是为了做模板编译优化时使用
export function cloneVNode(vnode: VNode): VNode {
  const cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  )
  cloned.ns = vnode.ns
  cloned.isStatic = vnode.isStatic
  cloned.key = vnode.key
  cloned.isComment = vnode.isComment
  cloned.fnContext = vnode.fnContext
  cloned.fnOptions = vnode.fnOptions
  cloned.fnScopeId = vnode.fnScopeId
  cloned.asyncMeta = vnode.asyncMeta
  cloned.isCloned = true //现有节点和新克隆得到的节点之间唯一的不同就是克隆得到的节点isCloned为true
  return cloned
}


/**
 * 
 * 说了这么多，那么VNode在Vue的整个虚拟DOM过程起了什么作用呢？
其实VNode的作用是相当大的。我们在视图渲染之前，把写好的template模板先编译成VNode并缓存下来，
等到数据发生变化页面需要重新渲染的时候，我们把数据发生变化后生成的VNode与前一次缓存下来的VNode进行对比，找出差异，
然后有差异的VNode对应的真实DOM节点就是需要重新渲染的节点，最后根据有差异的VNode创建出真实的DOM节点再插入到视图中，最终完成一次视图更新。



有了数据变化前后的VNode，我们才能进行后续的DOM-Diff找出差异，最终做到只更新有差异的视图，从而达到尽可能少的操作真实DOM的目的，以节省性能。
 * 
 * 
 * 虚拟DOM说白了就是以JS的计算性能来换取操作真实DOM所消耗的性能。
 */