/* @flow */

import { emptyNode } from 'core/vdom/patch'
import { resolveAsset, handleError } from 'core/util/index'
import { mergeVNodeHook } from 'core/vdom/helpers/index'

/**
 * Vue对于自定义指令定义对象提供了几个钩子函数，这几个钩子函数分别对应着指令的几种状态，一个指令从第一次被绑定到元素上到最终与被绑定的元素解绑，它会经过以下几种状态：
    bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
    inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
    update：所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。
    componentUpdated：指令所在组件的 VNode 及其子 VNode 全部更新后调用。
    unbind：只调用一次，指令与元素解绑时调用。

    有了每个状态的钩子函数，这样我们就可以让指令在不同状态下做不同的事情。
 * 
 */

/**
 * 在虚拟DOM渲染更新的create、update、destory阶段都得处理指令逻辑，所以我们需要监听这三个钩子函数来处理指令逻辑
 * 
 * 可以看到，分别监听了这三个钩子函数，当虚拟DOM渲染更新的时候会触发这三个钩子函数，
 * 从而就会执行updateDirectives函数，在该函数内部就会去处理指令的相关逻辑
 */
export default {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives(vnode: VNodeWithData) {
    updateDirectives(vnode, emptyNode)
  }
}


/**
 * 当虚拟DOM渲染更新的时候会触发create、update、destory这三个钩子函数，
 * 从而就会执行updateDirectives函数来处理指令的相关逻辑，执行指令函数，让指令生效。
 * 所以，探究指令如何生效的问题就是分析updateDirectives函数的内部逻辑。
 * 
 * 【所谓让指令生效，其实就是在合适的时机执行定义指令时所设置的钩子函数。】
 */
function updateDirectives(oldVnode: VNodeWithData, vnode: VNodeWithData) {
  // 判断了如果新旧VNode中只要有一方涉及到了指令，那就调用_update方法去处理指令逻辑。
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode)
  }
}

/**
 * _update方法去处理指令逻辑
 */
function _update(oldVnode, vnode) {
  /**
  isCreate:判断当前节点vnode对应的旧节点oldVnode是不是一个空节点，如果是的话，表明当前节点是一个新创建的节点。
  isDestroy:判断当前节点vnode是不是一个空节点，如果是的话，表明当前节点对应的旧节点将要被销毁。
  oldDirs:旧的指令集合，即oldVnode中保存的指令。
  newDirs:新的指令集合，即vnode中保存的指令。
  dirsWithInsert:保存需要触发inserted指令钩子函数的指令列表。
  dirsWithPostpatch:保存需要触发componentUpdated指令钩子函数的指令列表。
   */
  const isCreate = oldVnode === emptyNode
  const isDestroy = vnode === emptyNode
  // normalizeDirectives函数，是用来模板中使用到的指令从存放指令的地方取出来，并将其格式进行统一化
  // 获取到oldDirs和newDirs之后，接下来要做的事情就是对比这两个指令集合并触发对应的指令钩子函数。
  const oldDirs = normalizeDirectives(oldVnode.data.directives, oldVnode.context)
  const newDirs = normalizeDirectives(vnode.data.directives, vnode.context)

  const dirsWithInsert = []
  const dirsWithPostpatch = []

  let key, oldDir, dir
  for (key in newDirs) {
    oldDir = oldDirs[key]
    dir = newDirs[key]
    // 判断当前循环到的指令名key在旧的指令列表oldDirs中是否存在
    if (!oldDir) {
      // new directive, bind
      // 如果不存在，说明该指令是首次绑定到元素上的一个新指令，此时调用callHook触发指令中的bind钩子函数
      callHook(dir, 'bind', vnode, oldVnode)
      // 如果该新指令在定义时设置了inserted钩子函数，那么将该指令添加到dirsWithInsert中，
      // 以保证执行完所有指令的bind钩子函数后再执行指令的inserted钩子函数
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir)
      }
    } else {
      // existing directive, update
      //  如果存在，说明该指令在之前已经绑定过了，那么这一次的操作应该是update更新指令。
      dir.oldValue = oldDir.value
      dir.oldArg = oldDir.arg
      callHook(dir, 'update', vnode, oldVnode)
      // 如果该指令在定义时设置了componentUpdated钩子函数，那么将该指令添加到dirsWithPostpatch中，
      // 以保证让指令所在的组件的VNode及其子VNode全部更新完后再执行指令的componentUpdated钩子函数
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir)
      }
    }
  }


  // 判断dirsWithInsert数组中是否有元素，如果有，则循环dirsWithInsert数组，依次执行每一个指令的inserted钩子函数
  /**
   * 并没有直接去循环执行每一个指令的inserted钩子函数，而是新创建了一个callInsert函数，
   * 当执行该函数的时候才会去循环执行每一个指令的inserted钩子函数。
   * 这又是为什么呢？
   * 
   * 这是因为指令的inserted钩子函数必须在被绑定元素插入到父节点时调用，那么如果是一个新增的节点，如何保证它已经被插入到父节点了呢？
   * 我们之前说过，虚拟DOM在渲染更新的不同阶段会触发不同的钩子函数，比如当DOM节点在被插入到父节点时会触发insert函数，那么我们就知道了，
   * 当虚拟DOM渲染更新的insert钩子函数被调用的时候就标志着当前节点已经被插入到父节点了，
   * 所以我们要在虚拟DOM渲染更新的insert钩子函数内执行指令的inserted钩子函数。
   * 
   * 
   * 也就是说，当一个新创建的元素被插入到父节点中时虚拟DOM渲染更新的insert钩子函数和指令的inserted钩子函数都要被触发。
   * 既然如此，那就可以把这两个钩子函数通过调用mergeVNodeHook方法进行合并，然后统一在虚拟DOM渲染更新的insert钩子函数中触发，
   * 这样就保证了元素确实被插入到父节点中才执行的指令的inserted钩子函数
   * 
   */
  if (dirsWithInsert.length) {
    const callInsert = () => {
      for (let i = 0; i < dirsWithInsert.length; i++) {
        callHook(dirsWithInsert[i], 'inserted', vnode, oldVnode)
      }
    }
    if (isCreate) {// 新创建的
      mergeVNodeHook(vnode, 'insert', callInsert)
    } else {
      callInsert()
    }
  }

  /**
   * 同理，我们也需要保证指令所在的组件的VNode及其子VNode全部更新完后再执行指令的componentUpdated钩子函数，
   * 所以我们将虚拟DOM渲染更新的postpatch钩子函数和指令的componentUpdated钩子函数进行合并触发
   * 
   */
  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, 'postpatch', () => {
      for (let i = 0; i < dirsWithPostpatch.length; i++) {
        callHook(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode)
      }
    })
  }


  // 最后，当newDirs循环完毕后，再循环oldDirs，如果某个指令存在于旧的指令列表oldDirs而在新的指令列表newDirs中不存在，
  // 那说明该指令是被废弃的，所以则触发指令的unbind钩子函数对指令进行解绑
  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy)
      }
    }
  }
}

const emptyModifiers = Object.create(null)

/** 
 * normalizeDirectives函数，是用来模板中使用到的指令从存放指令的地方取出来，并将其格式进行统一化
 * v-focus指令为例，通过normalizeDirectives函数取出的指令会变成如下样子
 * 
 * {
    'v-focus':{
        name : 'focus' ,  // 指令的名称
        value : '',       // 指令的值
        arg:'',           // 指令的参数
        modifiers:{},     // 指令的修饰符
        def:{
            inserted:fn
        }
    }
  }
 * 
 */
function normalizeDirectives(
  dirs: ?Array<VNodeDirective>,
  vm: Component
): { [key: string]: VNodeDirective } {
  const res = Object.create(null)
  if (!dirs) {
    // $flow-disable-line
    return res
  }
  let i, dir
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i]
    if (!dir.modifiers) {
      // $flow-disable-line
      dir.modifiers = emptyModifiers
    }
    res[getRawDirName(dir)] = dir
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true)
  }
  // $flow-disable-line
  return res
}

function getRawDirName(dir: VNodeDirective): string {
  return dir.rawName || `${dir.name}.${Object.keys(dir.modifiers || {}).join('.')}`
}

function callHook(dir, hook, vnode, oldVnode, isDestroy) {
  const fn = dir.def && dir.def[hook]
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy)
    } catch (e) {
      handleError(e, vnode.context, `directive ${dir.name} ${hook} hook`)
    }
  }
}
