/**
 * Not type-checking this file because it's mostly vendor code.
 */

/*!
 * HTML Parser By John Resig (ejohn.org)
 * Modified by Juriy "kangax" Zaytsev
 * Original code by Erik Arvidsson (MPL-1.1 OR Apache-2.0 OR GPL-2.0-or-later)
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
 */

import { makeMap, no } from 'shared/util'
import { isNonPhrasingTag } from 'web/compiler/util'
import { unicodeRegExp } from 'core/util/lang'

// Regular Expressions for parsing tags and attributes
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/     // 标签属性的正则
const dynamicArgAttribute = /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z${unicodeRegExp.source}]*`
const qnameCapture = `((?:${ncname}\\:)?${ncname})`
const startTagOpen = new RegExp(`^<${qnameCapture}`)
const startTagClose = /^\s*(\/?)>/   // 开始标签的结束特征
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`)
const doctype = /^<!DOCTYPE [^>]+>/i
// #7298: escape - to avoid being passed as HTML comment when inlined in page
const comment = /^<!\--/
const conditionalComment = /^<!\[/

// Special Elements (can contain anything)
export const isPlainTextElement = makeMap('script,style,textarea', true)
const reCache = {}

const decodingMap = {
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&amp;': '&',
  '&#10;': '\n',
  '&#9;': '\t',
  '&#39;': "'"
}
const encodedAttr = /&(?:lt|gt|quot|amp|#39);/g
const encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#39|#10|#9);/g

// #5992
const isIgnoreNewlineTag = makeMap('pre,textarea', true)
const shouldIgnoreFirstNewline = (tag, html) => tag && isIgnoreNewlineTag(tag) && html[0] === '\n'

function decodeAttr(value, shouldDecodeNewlines) {
  const re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr
  return value.replace(re, match => decodingMap[match])
}

export function parseHTML(html, options) {
  const stack = []  // Vue在HTML解析器的开头定义了一个栈stack，这个栈的作用就是用来维护AST节点层级的
  /**    
   * HTML解析器在从前向后解析模板字符串时，
   * 每当遇到开始标签时就会调用start钩子函数，那么在start钩子函数内部我们可以将解析得到的开始标签推入栈中，
   * 而每当遇到结束标签时就会调用end钩子函数，那么我们也可以在end钩子函数内部将解析得到的结束标签所对应的开始标签从栈中弹出。
   */
  const expectHTML = options.expectHTML
  const isUnaryTag = options.isUnaryTag || no
  const canBeLeftOpenTag = options.canBeLeftOpenTag || no  //用来检测一个标签是否是可以省略闭合标签的非自闭合标签
  let index = 0  //解析游标，标识当前从何处开始解析模板字符串
  let last, lastTag  // last存储剩余还未解析的模板字符串  // lastTag存储着位于 stack 栈顶的元素

  // 开启一个 while 循环，循环结束的条件是 html 为空，即 html 被 parse 完毕
  while (html) {
    // 在每次while循环中， 先把 html的值赋给变量 last
    /**    
     * 这样做的目的是，如果经过上述所有处理逻辑处理过后，html字符串没有任何变化，
     * 即表示html字符串没有匹配上任何一条规则，那么就把html字符串当作纯文本对待，创建文本类型的AST节点并且如果抛出异常：模板字符串中标签格式有误。
     * 
     */
    last = html
    // Make sure we're not in a plaintext content element like script/style
    // 确保即将 parse 的内容不是在纯文本标签里 (script,style,textarea)
    // 因为在这三个标签里的内容肯定不会有HTML标签，所以我们可直接当作文本处理
    // lastTag为栈顶元素，!lastTag即表示当前html字符串没有父节点
    // isPlainTextElement(lastTag) 是检测 lastTag 是否为是那三个纯文本标签之一，是的话返回true，不是返回false。
    /** 
     * 也就是说当前html字符串要么没有父节点要么父节点不是纯文本标签，则接下来就可以依次解析那6种类型的内容了 
     * */
    if (!lastTag || !isPlainTextElement(lastTag)) {
      let textEnd = html.indexOf('<')
      /**
       * 如果html字符串是以'<'开头,则有以下几种可能
       * 开始标签:<div>
       * 结束标签:</div>
       * 注释:<!-- 我是注释 -->
       * 条件注释:<!-- [if !IE] --> <!-- [endif] -->
       * DOCTYPE:<!DOCTYPE html>
       * 需要一一去匹配尝试
       */

      //1. '<' 在第一个位置，说明模板字符串是以其它5种类型开始的
      if (textEnd === 0) {
        // （1）Comment:解析注释
        if (comment.test(html)) {
          // 若为注释，则继续查找是否存在'-->'
          const commentEnd = html.indexOf('-->')

          if (commentEnd >= 0) {
            // 若存在 '-->',继续判断options中是否保留注释
            if (options.shouldKeepComment) {
              // 若保留注释，则把注释截取出来传给options.comment，创建注释类型的AST节点
              options.comment(html.substring(4, commentEnd), index, index + commentEnd + 3)
            }
            // 若不保留注释，则将游标移动到'-->'之后，继续向后解析
            // advance函数是用来移动解析游标的，解析完一部分就把游标向后移动一部分，确保不会重复解析
            advance(commentEnd + 3)
            continue
          }
        }

        /**   
         * 上面代码中有一处值得注意的地方，那就是我们平常在模板中可以在<template></template>标签上配置comments选项来决定在渲染模板时是否保留注释，
         * 对应到上面代码中就是options.shouldKeepComment,
         * 如果用户配置了comments选项为true，则shouldKeepComment为true，则创建注释类型的AST节点，如不保留注释，则将游标移动到'-->'之后，继续向后解析。
         */


        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
        // （2）解析是否是条件注释
        if (conditionalComment.test(html)) {
          // 若为条件注释，则继续查找是否存在']>'
          const conditionalEnd = html.indexOf(']>')

          if (conditionalEnd >= 0) {
            // 若存在 ']>',则从原本的html字符串中把条件注释截掉，
            // 把剩下的内容重新赋给html，继续向后匹配
            advance(conditionalEnd + 2)
            continue
          }
        }

        // Doctype:
        // （3）解析DOCTYPE
        const doctypeMatch = html.match(doctype)
        if (doctypeMatch) {
          advance(doctypeMatch[0].length)
          continue
        }

        // End tag:
        // （4）解析结束标签
        // 结束标签的解析要比解析开始标签容易多了，
        // 因为它不需要解析什么属性，只需要判断剩下的模板字符串是否符合结束标签的特征，如果是，就将结束标签名提取出来，再调用4个钩子函数中的end函数就好了。
        // '</div>'.match(endTag)  // ["</div>", "div", index: 0, input: "</div>", groups: undefined]
        // '<div>'.match(endTag)  // null
        // 上面代码中，如果模板字符串符合结束标签的特征，则会获得匹配结果数组；如果不合符，则得到null。
        const endTagMatch = html.match(endTag)
        if (endTagMatch) {
          const curIndex = index
          advance(endTagMatch[0].length)
          // 没有直接去调用end函数，而是调用了parseEndTag函数
          // 暂时可以理解为该函数内部就是去调用了end钩子函数。
          parseEndTag(endTagMatch[1], curIndex, index)
          continue
        }

        // Start tag:
        // （5）解析开始标签
        // 调用parseStartTag函数，如果模板字符串符合开始标签的特征，则解析开始标签，并将解析结果返回，如果不符合开始标签的特征，则返回undefined。
        const startTagMatch = parseStartTag()
        if (startTagMatch) {
          // 解析完毕后，就可以用解析得到的结果去调用start钩子函数去创建元素型的AST节点了。
          // 因为虽然经过parseStartTag函数已经把创建AST节点必要信息提取出来了，但是提取出来的标签属性数组还是需要处理一下，
          handleStartTag(startTagMatch)
          if (shouldIgnoreFirstNewline(startTagMatch.tagName, html)) {
            advance(1)
          }
          continue
        }
      }

      //2. 如果第一个<不在第一个位置而在模板字符串中间某个位置，那么说明模板字符串是以文本开头的
      let text, rest, next
      if (textEnd >= 0) {
        // 如果html字符串不是以'<'开头,说明'<'前面的都是纯文本，无需处理
        // 那就把'<'以后的内容拿出来赋给rest
        rest = html.slice(textEnd)
        while (
          !endTag.test(rest) &&
          !startTagOpen.test(rest) &&
          !comment.test(rest) &&
          !conditionalComment.test(rest)
        ) {
          // < in plain text, be forgiving and treat it as text
          /**
         * 用'<'以后的内容rest去匹配endTag、startTagOpen、comment、conditionalComment
         * 如果都匹配不上，表示'<'是属于文本本身的内容
         */

          // 在'<'之后查找是否还有'<'
          next = rest.indexOf('<', 1)
          // 如果没有了，表示'<'后面也是文本
          if (next < 0) break
          // 如果还有，表示'<'是文本中的一个字符
          textEnd += next
          // 那就把next之后的内容截出来继续下一轮循环匹配
          rest = html.slice(textEnd)
        }

        // '<'是结束标签的开始 ,说明从开始到'<'都是文本，截取出来
        text = html.substring(0, textEnd)
      }

      //3. 如果在整个模板字符串里没有找到<，那说明整个模板字符串都是文本。
      if (textEnd < 0) {
        text = html
      }

      if (text) {
        advance(text.length)
      }

      // 把截取出来的text转化成textAST
      if (options.chars && text) {
        options.chars(text, index - text.length, index)
      }
    } else {
      // 父元素为script、style、textarea时，其内部的内容全部当做纯文本处理
      let endTagLength = 0
      const stackedTag = lastTag.toLowerCase()
      const reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'))
      const rest = html.replace(reStackedTag, function (all, text, endTag) {
        endTagLength = endTag.length
        if (!isPlainTextElement(stackedTag) && stackedTag !== 'noscript') {
          text = text
            .replace(/<!\--([\s\S]*?)-->/g, '$1') // #7298
            .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1')
        }
        if (shouldIgnoreFirstNewline(stackedTag, text)) {
          text = text.slice(1)
        }
        if (options.chars) {
          options.chars(text)
        }
        return ''
      })
      index += html.length - rest.length
      html = rest
      parseEndTag(stackedTag, index - endTagLength, index)
    }


    //将整个字符串作为文本对待
    if (html === last) {
      options.chars && options.chars(html)
      if (process.env.NODE_ENV !== 'production' && !stack.length && options.warn) {
        options.warn(`Mal-formatted tag at end of template: "${html}"`, { start: index + html.length })
      }
      break
    }
  }

  // Clean up any remaining tags
  /** 
   * 这行代码执行的时机是html === last，即html字符串中的标签格式有误时会跳出while循环，
   * 此时就会执行这行代码，这行代码是调用parseEndTag函数并不传递任何参数，前面我们说过如果parseEndTag函数不传递任何参数是用于处理栈中剩余未处理的标签。
   * 这是因为如果不传递任何函数，此时parseEndTag函数里的pos就为0，那么pos>=0就会恒成立，那么就会逐个警告缺少闭合标签，并调用 options.end将其闭合。 
   * 
   * */
  parseEndTag()

  /**   
   * advance函数是用来移动解析游标的，解析完一部分就把游标向后移动一部分，确保不会重复解析，
   */
  function advance(n) {
    index += n  // index为解析游标
    html = html.substring(n)
  }


  /**   
   * parseStartTag函数是用来匹配开始标签的正则
   * 
   * 以开始标签开始的模板：'<div></div>'.match(startTagOpen)  => ['<div','div',index:0,input:'<div></div>']
   * 以结束标签开始的模板：'</div><div></div>'.match(startTagOpen) => null
   * 以文本开始的模板：'我是文本</p>'.match(startTagOpen) => null
   * 我们用不同类型的内容去匹配开始标签的正则，发现只有<div></div>的字符串可以正确匹配，并且返回一个数组。
   * 
   * 
   * 标签属性的正则匹配
   *  let html = 'class="a" id="b"></div>'
      let attr = html.match(attribute)
      console.log(attr)
     ["class="a"", "class", "=", "a", undefined, undefined, index: 0, input: "class="a" id="b"></div>", groups: undefined]

     可以看到，第一个标签属性class="a"已经被拿到了。
     另外，标签属性有可能有多个也有可能没有，如果没有的话那好办，匹配标签属性的正则就会匹配失败，标签属性就为空数组；
     而如果标签属性有多个的话，那就需要循环匹配了，匹配出第一个标签属性后，就把该属性截掉，用剩下的字符串继续匹配，直到不再满足正则为止。
   * 
  */
  //parse 开始标签
  function parseStartTag() {
    const start = html.match(startTagOpen)
    if (start) {
      const match = {
        tagName: start[1],
        attrs: [],
        start: index
      }
      advance(start[0].length)
      let end, attr
      // 如果剩下的字符串不符合开始标签的结束特征（startTagClose）并且符合标签属性的特征的话，
      // 那就说明还有未提取出的标签属性，那就进入循环，继续提取，直到把所有标签属性都提取完毕。


      // 所谓不符合开始标签的结束特征是指当前剩下的字符串不是以开始标签结束符开头的，
      // 我们知道一个开始标签的结束符有可能是一个>（非自闭合标签），也有可能是/>（自闭合标签），如果剩下的字符串（如></div>）以开始标签的结束符开头，那么就表示标签属性已经被提取完毕了。


      /**
    * <div a=1 b=2 c=3></div>
    * 从<div之后到开始标签的结束符号'>'之前，一直匹配属性attrs
    * 所有属性匹配完之后，html字符串还剩下
    * 自闭合标签剩下：'/>'
    * 非自闭合标签剩下：'></div>'
    */
      while (!(end = html.match(startTagClose)) && (attr = html.match(dynamicArgAttribute) || html.match(attribute))) {
        attr.start = index
        advance(attr[0].length)
        attr.end = index
        match.attrs.push(attr)
      }


      /**
   * 这里判断了该标签是否为自闭合标签
   * 自闭合标签如:<input type='text' />
   * 非自闭合标签如:<div></div>
   * '></div>'.match(startTagClose) => [">", "", index: 0, input: "></div>", groups: undefined]
   * '/><div></div>'.match(startTagClose) => ["/>", "/", index: 0, input: "/><div></div>", groups: undefined]
   * 因此，我们可以通过end[1]是否是"/"来判断该标签是否是自闭合标签
   */
      if (end) {
        match.unarySlash = end[1]
        advance(end[0].length)
        match.end = index
        return match
      }
    }
  }


  /***  
   * Vue并没有直接去调start钩子函数去创建AST节点，而是调用了handleStartTag函数，
   * 在该函数内部才去调的start钩子函数，为什么要这样做呢？
   * 这是因为虽然经过parseStartTag函数已经把创建AST节点必要信息提取出来了，但是提取出来的标签属性数组还是需要处理一下。
   * 
   * handleStartTag函数用来对parseStartTag函数的解析结果进行进一步处理，它接收parseStartTag函数的返回值作为参数。
   */
  //处理 parseStartTag 的结果
  function handleStartTag(match) {
    const tagName = match.tagName  // 开始标签的标签名
    const unarySlash = match.unarySlash  // 是否为自闭合标签的标志，自闭合为"",非自闭合为"/"

    if (expectHTML) {
      if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
        parseEndTag(lastTag)
      }
      if (canBeLeftOpenTag(tagName) && lastTag === tagName) {
        parseEndTag(tagName)
      }
    }

    const unary = isUnaryTag(tagName) || !!unarySlash  // 布尔值，标志是否为自闭合标签

    const l = match.attrs.length  // match.attrs 数组的长度
    const attrs = new Array(l)  // 一个与match.attrs数组长度相等的数组
    // 接下来是循环处理提取出来的标签属性数组match.attrs
    for (let i = 0; i < l; i++) {
      // args 解析出来的标签属性数组中的每一个属性对象，
      // const args = ["class="a"", "class", "=", "a", undefined, undefined, index: 0, input: "class="a" id="b"></div>", groups: undefined]
      const args = match.attrs[i]
      const value = args[3] || args[4] || args[5] || ''
      // 这个常量主要是做一些兼容性处理， 如果 shouldDecodeNewlines 为 true，意味着 Vue 在编译模板的时候，
      // 要对属性值中的换行符或制表符做兼容处理。而shouldDecodeNewlinesForHref为true 意味着Vue在编译模板的时候，要对a标签的 href属性值中的换行符或制表符做兼容处理。
      const shouldDecodeNewlines = tagName === 'a' && args[1] === 'href'
        ? options.shouldDecodeNewlinesForHref
        : options.shouldDecodeNewlines

      // 最后将处理好的结果存入之前定义好的与match.attrs数组长度相等的attrs数组中
      attrs[i] = {
        name: args[1], // 标签属性的属性名，如class
        value: decodeAttr(value, shouldDecodeNewlines)  // 标签属性的属性值，如class对应的a
      }
      if (process.env.NODE_ENV !== 'production' && options.outputSourceRange) {
        attrs[i].start = args.start + args[0].match(/^\s*/).length
        attrs[i].end = args.end
      }
    }

    // 如果该标签是非自闭合标签，则将标签推入栈中
    if (!unary) {
      stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs, start: match.start, end: match.end })
      lastTag = tagName
    }

    // 如果该标签是自闭合标签，现在就可以调用start钩子函数并传入处理好的参数来创建AST节点了
    if (options.start) {
      options.start(tagName, attrs, unary, match.start, match.end)
    }
  }


  /**  
   * 该函数接收三个参数，分别是结束标签名tagName、结束标签在html字符串中的起始和结束位置start和end。
   * 
   * 这三个参数其实都是可选的，根据传参的不同其功能也不同。
      第一种是三个参数都传递，用于处理普通的结束标签
      第二种是只传递tagName
      第三种是三个参数都不传递，用于处理栈中剩余未处理的标签
   */
  //parse 结束标签
  function parseEndTag(tagName, start, end) {
    let pos, lowerCasedTagName  // pos当前结束标签所对应的开始标签，在栈中的位置
    if (start == null) start = index
    if (end == null) end = index

    // Find the closest opened tag of the same type
    // 如果tagName存在，那么就从后往前遍历栈，在栈中寻找与tagName相同的标签并记录其所在的位置pos，如果tagName不存在，则将pos置为0。
    if (tagName) {
      lowerCasedTagName = tagName.toLowerCase()
      for (pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos].lowerCasedTag === lowerCasedTagName) {
          break
        }
      }
    } else {
      // If no tag name is provided, clean shop
      pos = 0
    }


    /** 
     * 接着当pos>=0时，开启一个for循环，从栈顶位置从后向前遍历直到pos处，如果发现stack栈中存在索引大于pos的元素，那么该元素一定是缺少闭合标签的。
     * 这是因为在正常情况下，stack栈的栈顶元素应该和当前的结束标签tagName 匹配，也就是说正常的pos应该是栈顶位置，后面不应该再有元素，
     * 如果后面还有元素，那么后面的元素就都缺少闭合标签 那么这个时候如果是在非生产环境会抛出警告，告诉你缺少闭合标签。
     * 
     * 除此之外，还会调用 options.end(stack[i].tag, start, end)立即将其闭合，这是为了保证解析结果的正确性。
     */


    /** 
     * 接着，如果pos没有大于等于0，即当 tagName 没有在 stack 栈中找到对应的开始标签时，pos 为 -1 。
     * 那么此时再判断 tagName 是否为br 或p标签，为什么要单独判断这两个标签呢？这是因为在浏览器中如果我们写了如下HTML：
        <div>
            </br>
            </p>
        </div>
     * 浏览器会自动把</br>标签解析为正常的 <br>标签，而对于</p>浏览器则自动将其补全为<p></p>，
       所以Vue为了与浏览器对这两个标签的行为保持一致，故对这两个便签单独判断处理，如下：
     */
    if (pos >= 0) {
      // Close all the open elements, up the stack
      for (let i = stack.length - 1; i >= pos; i--) {
        if (process.env.NODE_ENV !== 'production' &&
          (i > pos || !tagName) &&
          options.warn
        ) {
          options.warn(
            `tag <${stack[i].tag}> has no matching end tag.`,
            { start: stack[i].start, end: stack[i].end }
          )
        }
        if (options.end) {
          options.end(stack[i].tag, start, end)
        }
      }

      // Remove the open elements from the stack
      // 最后把pos位置以后的元素都从stack栈中弹出，以及把lastTag更新为栈顶元素:
      stack.length = pos
      lastTag = pos && stack[pos - 1].tag
    } else if (lowerCasedTagName === 'br') {
      if (options.start) {
        options.start(tagName, [], true, start, end)  // 创建<br>AST节点
      }
    } else if (lowerCasedTagName === 'p') {
      // 补全p标签并创建AST节点
      if (options.start) {
        options.start(tagName, [], false, start, end)
      }
      if (options.end) {
        options.end(tagName, start, end)
      }
    }
  }
}
