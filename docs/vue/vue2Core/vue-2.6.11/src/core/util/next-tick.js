/* @flow */
/* globals MutationObserver */

import { noop } from 'shared/util'
import { handleError } from './error'
import { isIE, isIOS, isNative } from './env'

export let isUsingMicroTask = false

const callbacks = []   // 回调队列
let pending = false  // 异步锁


// 执行队列中的每一个回调
function flushCallbacks() {
  pending = false   // 重置异步锁
  //  防止出现nextTick中包含nextTick时出现问题，在执行回调函数队列前，提前复制备份并清空回调函数队列
  const copies = callbacks.slice(0)
  callbacks.length = 0
  // 执行回调函数队列
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
let timerFunc

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */

// 检测浏览器是否原生支持 Promise
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  const p = Promise.resolve()
  timerFunc = () => {
    p.then(flushCallbacks)
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) setTimeout(noop)
  }
  isUsingMicroTask = true
}
// 检测浏览器是否原生支持  MutationObserver
else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  let counter = 1
  const observer = new MutationObserver(flushCallbacks)
  const textNode = document.createTextNode(String(counter))
  observer.observe(textNode, {
    characterData: true
  })
  timerFunc = () => {
    counter = (counter + 1) % 2
    textNode.data = String(counter)
  }
  isUsingMicroTask = true
}
// 检测浏览器是否原生支持 setImmediate(高版本 IE 和 Edge 支持)
else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = () => {
    setImmediate(flushCallbacks)
  }
} else {
  // Fallback to setTimeout.
  // 都不支持的情况下，使用setTimeout
  timerFunc = () => {
    setTimeout(flushCallbacks, 0)
  }
}


/**
 * 大概可分为两大部分:
 * - 能力检测
 * - 根据能力检测以不同方式执行回调队列
 * 
 * (1) 能力检测
 * Vue 在内部对异步队列尝试使用原生的 Promise.then、MutationObserver 和 setImmediate，如果执行环境不支持，则会采用 setTimeout(fn, 0) 代替。
 * 
 * 宏任务耗费的时间是大于微任务的，所以在浏览器支持的情况下，优先使用微任务。
 * 如果浏览器不支持微任务，使用宏任务；但是，各种宏任务之间也有效率的不同，需要根据浏览器的支持情况，使用不同的宏任务。
 * 
 * 
 * 逻辑：
 * 首先，先来看 nextTick函数，该函数的主要逻辑是：先把传入的回调函数 cb 推入 回调队列callbacks 数组，
 * 同时在接收第一个回调函数时，执行能力检测中对应的异步方法（异步方法中调用了回调函数队列）。
 * 最后一次性地根据 useMacroTask 条件执行 macroTimerFunc 或者是 microTimerFunc，
 * 而它们都会在下一个 tick 执行 flushCallbacks，flushCallbacks 的逻辑非常简单，对 callbacks 遍历，然后执行相应的回调函数。
 * 
 * 
 */
export function nextTick(cb?: Function, ctx?: Object) {
  let _resolve
  // 将回调函数推入回调队列
  callbacks.push(() => {
    if (cb) {
      try {
        cb.call(ctx)
      } catch (e) {
        handleError(e, ctx, 'nextTick')
      }
    } else if (_resolve) {
      _resolve(ctx)
    }
  })

  // 如果异步锁未锁上，锁上异步锁，调用异步函数，准备等同步函数执行完后，就开始执行回调函数队列
  if (!pending) {
    pending = true
    timerFunc()
  }
  // $flow-disable-line
  // 如果没有提供回调，并且支持Promise，返回一个Promise
  // 这是当 nextTick 不传 cb 参数的时候，提供一个 Promise 化的调用，比如：
  // nextTick().then(() => {})
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(resolve => {
      _resolve = resolve
    })
  }
}


/**
 * 这里有两个问题需要注意：
 * (1) 如何保证只在接收第一个回调函数时执行异步方法？
 * nextTick源码中使用了一个异步锁的概念，即接收第一个回调函数时，先关上锁，执行异步方法。
 * 此时，浏览器处于等待执行完同步代码就执行异步代码的情况。
 * 
 * (2) 执行 flushCallbacks 函数时为什么需要备份回调函数队列？执行的也是备份的回调函数队列？
 * 因为，会出现这么一种情况：nextTick 的回调函数中还使用 nextTick。如果 flushCallbacks 不做特殊处理，
 * 直接循环执行回调函数，会导致里面nextTick 中的回调函数会进入回调队列。
 * 
 * 
 * 数据的变化到 DOM 的重新渲染是一个异步过程，发生在下一个 tick。当我们在实际开发中，
 * 比如从服务端接口去获取数据的时候，数据做了修改，
 * 如果我们的某些方法去依赖了数据修改后的 DOM 变化，我们就必须在 nextTick 后执行
 * 
 */