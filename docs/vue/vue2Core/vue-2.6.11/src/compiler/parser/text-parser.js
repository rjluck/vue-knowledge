/* @flow */
/**      
 * * 在我们就可以知道文本解析器内部就干了三件事：
        - 判断传入的文本是否包含变量
        - 构造expression
        - 构造tokens
        */
import { cached } from 'shared/util'
import { parseFilters } from './filter-parser'

const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g
const regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g

const buildRegex = cached(delimiters => {
  const open = delimiters[0].replace(regexEscapeRE, '\\$&')
  const close = delimiters[1].replace(regexEscapeRE, '\\$&')
  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
})

type TextParseResult = {
  expression: string,
  tokens: Array<string | { '@binding': string }>
}


/** 
 * parseText函数接收两个参数，一个是传入的待解析的文本内容text，一个包裹变量的符号delimiters
 * 
 * 
 * 文本解析器的作用就是将HTML解析器解析得到的文本内容进行二次解析，解析文本内容中是否包含变量，如果包含变量，则将变量提取出来进行加工，为后续生产render函数做准备。
 * 
 * 
 * 
 * 
 */
export function parseText(
  text: string,
  delimiters?: [string, string]
): TextParseResult | void {
  // 函数体内首先定义了变量tagRE，表示一个正则表达式。这个正则表达式是用来检查文本中是否包含变量的。
  const tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE
  // tagRE是用来检测文本内是否有{{}}。而tagRE又是可变的，它是根据是否传入了delimiters参数从而又不同的值，
  // 也就是说如果没有传入delimiters参数，则是检测文本是否包含{{}}，如果传入了值，就会检测文本是否包含传入的值。
  if (!tagRE.test(text)) {
    // 接下来用tagRE去匹配传入的文本内容，判断是否包含变量，若不包含，则直接返回，
    return
  }

  // 如果包含变量，那就继续往下看：
  const tokens = []
  const rawTokens = []


  /**
  * let lastIndex = tagRE.lastIndex = 0
  * 上面这行代码等同于下面这两行代码:
  * tagRE.lastIndex = 0
  * let lastIndex = tagRE.lastIndex
  */
  //  tagRE.lastIndex就是第一个包裹变量最后一个}所在字符串中的位置。lastIndex初始值为0。
  let lastIndex = tagRE.lastIndex = 0
  let match, index, tokenValue
  // 接下来会开启一个while循环，循环结束条件是tagRE.exec(text)的结果match是否为null，
  // exec( )方法是在一个字符串中执行匹配检索，如果它没有找到任何匹配就返回null，但如果它找到了一个匹配就返回一个数组。
  /*** 
   * tagRE.exec("hello {{name}}，I am {{age}}")
   * 返回：["{{name}}", "name", index: 6, input: "hello {{name}}，I am {{age}}", groups: undefined]
   * tagRE.exec("hello")
   * 返回：null
   * 
   * 
   * 可以看到，当匹配上时，匹配结果的
   * 第一个元素是字符串中第一个完整的带有包裹的变量，
   * 第二个元素是第一个被包裹的变量名，
   * 第三个元素是第一个变量在字符串中的起始位置。
 */

  // exec调用多次会自动查找下一次出现的位置和内容
  while ((match = tagRE.exec(text))) {
    index = match.index
    // push text token
    if (index > lastIndex) {
      // 先把'{{'前面的文本放入tokens中
      // 当index>lastIndex时，表示变量前面有纯文本，那么就把这段纯文本截取出来，存入rawTokens中，同时再调用JSON.stringify给这段文本包裹上双引号，存入tokens中
      rawTokens.push(tokenValue = text.slice(lastIndex, index))
      tokens.push(JSON.stringify(tokenValue))
    }
    // 如果index不大于lastIndex，那说明index也为0，即该文本一开始就是变量
    // tag token
    // 取出'{{ }}'中间的变量exp
    const exp = parseFilters(match[1].trim())
    // 把变量exp改成_s(exp)形式也放入tokens中
    tokens.push(`_s(${exp})`)
    rawTokens.push({ '@binding': exp })

    // 设置lastIndex 以保证下一轮循环时，只从'}}'后面再开始匹配正则
    lastIndex = index + match[0].length
  }

  // 当剩下的text不再被正则匹配上时，表示所有变量已经处理完毕
  // 此时如果lastIndex < text.length，表示在最后一个变量后面还有文本
  // 最后将后面的文本再加入到tokens中
  if (lastIndex < text.length) {
    rawTokens.push(tokenValue = text.slice(lastIndex))
    tokens.push(JSON.stringify(tokenValue))
  }

  // 最后把数组tokens中的所有元素用'+'拼接起来
  return {
    expression: tokens.join('+'),
    tokens: rawTokens
  }
}
