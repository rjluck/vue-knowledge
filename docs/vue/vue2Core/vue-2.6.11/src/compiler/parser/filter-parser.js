/* @flow */

const validDivisionCharRE = /[\w).+\-_$\]]/

/**
 * 该函数的作用的是将传入的形如'message | capitalize'这样的过滤器字符串转化成_f("capitalize")(message)
 * 
 * 
 * 码中所涉及到的ASCII码与字符的对应关系，如下：
 *  0x22 ----- "
    0x27 ----- '
    0x28 ----- (
    0x29 ----- )
    0x2f ----- /
    0x5C ----- \
    0x5B ----- [
    0x5D ----- ]
    0x60 ----- `
    0x7C ----- |
    0x7B ----- {
    0x7D ----- }
 * 
 * 
 * 
 * 代码的逻辑就是将字符串exp的每一个字符都从前往后开始一个一个匹配，匹配出那些特殊字符，如',",`，{,},[,],(,),\,|
 * 
 * 如果匹配到',",`字符，说明当前字符在字符串中，那么直到匹配到下一个同样的字符才结束，
 * 同时， 匹配 (), {},[] 这些需要两边相等闭合, 那么匹配到的 | 才被认为是过滤器中的|
 * 
 * 
 * 当匹配到过滤器中的|符时，那么|符前面的字符串就认为是待处理的表达式，将其存储在 expression 中，后面继续匹配，
 * 如果再次匹配到过滤器中的 |符 ,并且此时expression有值， 那么说明后面还有第二个过滤器，
 * 那么此时两个|符之间的字符串就是第一个过滤器的id，此时调用 pushFilter函数将第一个过滤器添加进filters数组中。
 * 
 */
export function parseFilters(exp: string): string {
  let inSingle = false                                  // exp是否在 '' 中
  let inDouble = false                                  // exp是否在 "" 中
  let inTemplateString = false                          // exp是否在 `` 中
  let inRegex = false                                   // exp是否在 \\ 中
  let curly = 0                                         // 在exp中发现一个 { 则curly加1，发现一个 } 则curly减1，直到culy为0 说明 { ... }闭合
  let square = 0                                        // 在exp中发现一个 [ 则curly加1，发现一个 ] 则curly减1，直到culy为0 说明 [ ... ]闭合
  let paren = 0                                         // 在exp中发现一个 ( 则curly加1，发现一个 ) 则curly减1，直到culy为0 说明 ( ... )闭合
  let lastFilterIndex = 0  // 解析游标，每循环过一个字符串游标加1；
  let c, prev, i, expression, filters

  // 从头开始遍历传入的exp每一个字符，通过判断每一个字符是否是特殊字符（如',",{,},[,],(,),\,|）进而判断出exp字符串中哪些部分是表达式，哪些部分是过滤器id
  for (i = 0; i < exp.length; i++) {
    prev = c
    c = exp.charCodeAt(i)
    if (inSingle) {
      if (c === 0x27 && prev !== 0x5C) inSingle = false
    } else if (inDouble) {
      if (c === 0x22 && prev !== 0x5C) inDouble = false
    } else if (inTemplateString) {
      if (c === 0x60 && prev !== 0x5C) inTemplateString = false
    } else if (inRegex) {
      if (c === 0x2f && prev !== 0x5C) inRegex = false
    } else if (
      c === 0x7C && // pipe
      exp.charCodeAt(i + 1) !== 0x7C &&
      exp.charCodeAt(i - 1) !== 0x7C &&
      !curly && !square && !paren
    ) {
      if (expression === undefined) {
        // first filter, end of expression
        lastFilterIndex = i + 1
        expression = exp.slice(0, i).trim()
      } else {
        pushFilter()
      }
    } else {
      switch (c) {
        case 0x22: inDouble = true; break         // "
        case 0x27: inSingle = true; break         // '
        case 0x60: inTemplateString = true; break // `
        case 0x28: paren++; break                 // (
        case 0x29: paren--; break                 // )
        case 0x5B: square++; break                // [
        case 0x5D: square--; break                // ]
        case 0x7B: curly++; break                 // {
        case 0x7D: curly--; break                 // }
      }
      if (c === 0x2f) { // /
        let j = i - 1
        let p
        // find first non-whitespace prev char
        for (; j >= 0; j--) {
          p = exp.charAt(j)
          if (p !== ' ') break
        }
        if (!p || !validDivisionCharRE.test(p)) {
          inRegex = true
        }
      }
    }
  }

  if (expression === undefined) {
    expression = exp.slice(0, i).trim()
  } else if (lastFilterIndex !== 0) {
    pushFilter()
  }

  function pushFilter() {
    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim())
    lastFilterIndex = i + 1
  }

  /**
   * eg:message | filter1 | filter2(arg)
   * 经过上面 过滤器字符串都匹配完毕后，会得到如下结果：
   * expression = message
     filters = ['filter1','filter2(arg)']
   */

  //  接下来遍历得到的filters数组，并将数组的每一个元素及expression传给wrapFilter函数，用来生成最终的_f函数调用字符串
  if (filters) {
    for (i = 0; i < filters.length; i++) {
      expression = wrapFilter(expression, filters[i])
    }
  }

  return expression
}


/**
 * 可以看到， 在wrapFilter函数中，首先在解析得到的每个过滤器中查找是否有(，
 * 以此来判断过滤器中是否接收了参数，如果没有(，表示该过滤器没有接收参数，
 * 则直接构造_f函数调用字符串即_f("filter1")(message)并返回赋给expression
 * 
 * 将新的experssion与filters数组中下一个过滤器再调用wrapFilter函数,
 * 如果下一个过滤器有参数，那么先取出过滤器id，再取出其带有的参数，
 * 生成第二个过滤器的_f函数调用字符串，即_f("filter2")(_f("filter1")(message),arg)
 * 
 * 这样就最终生成了用户所写的过滤器的_f函数调用字符串。
 */
function wrapFilter(exp: string, filter: string): string {
  const i = filter.indexOf('(')
  if (i < 0) {
    // _f: resolveFilter
    return `_f("${filter}")(${exp})`
  } else {
    const name = filter.slice(0, i)
    const args = filter.slice(i + 1)
    return `_f("${name}")(${exp}${args !== ')' ? ',' + args : args}`
  }
}
