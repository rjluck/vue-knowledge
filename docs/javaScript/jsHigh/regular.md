# 正则表达式

[[toc]]

## 正则表达式概述

### 1.什么是正则表达式

正则表达式(Regular Expression)是用于匹配字符串中字符组合的模式。在`JavaScript`中,正则表达式也是对象。

正则表达式通常被用来检索、替换那些符合某个模式(规则)的文本,例如验证表单:用户名表单只能输入英文字母、数字或者下划线，昵称输入框中可以输入中文(**匹配**)。此外,正则表达式还常用于过滤掉页面内容中的一些敏感词(**替换**),或从字符串中获取我们想要的特定部分(**提取**)等。

其他语言也会使用正则表达式


### 2.正则表达式的特点

- 灵活性、逻辑性和功能性非常的强
- 可以迅速地用极简单的方式达到字符串的复杂控制
- 对于刚接触的人来说,比较晦涩难懂。比如`^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$`
- 实际开发，一般都是直接复制写好的正则表达式。但是要求会使用正则表达式并且根据实际情况修改正则表达式。比如用户名:`/^[a-z0-9_-]{3,16}$/`


## 正则表达式在JavaScript种的使用

### 1.创建正则表达式

在`JavaScript`中,可以通过两种方式创建一个正则表达式。

#### 通过调用RegExp对象的构造函数创建

`var 变量名 = new RegExp(/表达式/)`

eg：
```js
var regexp = new RegExp(/123/);
console.log('regexp: ', regexp);
```

#### 通过字面量创建

`var 变量名 = /表达式/`
eg：
```js
var rg = /123/;
```

### 2.测试正则表达式 test

`test()`正则对象方法,用于检测字符串是否符合该规则,该对象会返回`true`或`false`,其参数是测试字符串。

语法格式：`regxObj.test(str)`

- `regxObj`是写的正则表达式
- `str` 我们要测试的文本
- 就是检测`str`文本是否符合我们写的正则表达式规范


eg:
```js
var rg = /123/;
console.log(rg.test(123));//true
console.log(rg.test('abc'));//false
```


## 正则表达式中的特殊字符

### 1.组成

一个正则表达式**可以由简单的字符构成**，比如`/abc/`，也可以是**简单和特殊字符的组合**,比如`/ab*c/`.其中特殊字符也被称为**元字符**，在正则表达式中是具有**特殊**意义的专用**符号**，如`^、$、+`等。

特殊字符非常多,可以参考:

- MDN:https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions
- jQuery手册:正则表达式部分
- 正则测试工具:http://tool.oschina.net/regex


### 2.边界符

正则表达式中的边界符(位置符)用来**提示字符所处的位置**，主要有两个字符。


边界符 | 说明
---|---
^ | 表示匹配行首的文本(以谁开始)
$ | 表示匹配行尾的文本(以谁结束)

> 如果^和$在一起,表示必须是精确匹配

eg:
```js
var rg = /abc/;//正则表达式里面不需要加引号,不管是数字还是字符串型
//   /abc/ 只要包含有abc这个字符串返回的都是true
console.log(rg.test('abc'));//true
console.log(rg.test('abcd'));//true
console.log(rg.test('aabcd'));//true

var reg = /^abc/;
console.log(reg.test('abc'));//true
console.log(reg.test('abcd'));//true
console.log(reg.test('aabcd'));//false


var reg1 = /^abc$/;  //精确匹配,要求必须是abc字符串才符合规范
console.log(reg1.test('abc'));//true
console.log(reg1.test('abcd'));//false
console.log(reg1.test('aabcd'));//false
console.log(reg1.test('aabcdc'));//false
```

### 3.字符类

字符类表示有一系列字符可供选择,只要匹配其中一个就可以了。**所有可供选择的字符都放在方括号内**

eg:
```js
//字符类：[] 表示有一系列字符可供选择,只要匹配其中一个就可以了

var rg = /[abc]/;//只要包含有a或者有b或者包含c，都会返回true
console.log(rg.test('andy'));//true
console.log(rg.test('baby'));//true
console.log(rg.test('color'));//true
console.log(rg.test('red'));//false

var reg = /^[abc]$/;//三选一  只有是a 或者是b 或者是c 这三个字母才返回true
console.log(reg.test('aa'));//false
console.log(reg.test('b'));//true
```


**`[-]` 方括号内部,范围符`-`**

eg:
```js
var rg = /^[a-z]$/;//26个英文字母任何一个字母都返回true
console.log(rg.test('a'));//true
console.log(rg.test('A'));//false
```

**字符组合**

`/^[a-z0-9]$/.test('a') //true`

eg:
```js
var rg = /^[a-zA-Z]$/;//26个英文字母(大小写都可以)任何一个字母都返回true
var rg1 = /^[a-zA-Z0-9]$/;//
var rg1 = /^[a-zA-Z0-9_]$/;//
```


**`[^]`方括号内部,取反符`^`**

`/^[^abc]$/.test('a')  //false`

如果中括号里面有^ ,表示取反的意思。千万别和边界符^混淆



### 4.量词符

量词符用来**设定某个模式出现的次数**

量词 | 说明
---|---
* | 重复零次或更多次
+ | 重复一次或更多次
? | 重复零次或一次
{n} | 重复n次
{n,} | 重复n次或更多次
{n,m} | 重复n到m次

eg:
```js
var reg = /^a$/;
var reg1 = /^a*$/;//>=0
console.log(reg1.test(''));//true
console.log(reg1.test('a'));//true
console.log(reg1.test('aaaaaaa'));//true

var reg2 = /^a+$/;// >=1
console.log(reg2.test(''));//false
console.log(reg2.test('a'));//true
console.log(reg2.test('aaaaaaa'));//true

var reg3 = /^a?$/;//重复1次或0次
console.log(reg3.test(''));//true
console.log(reg3.test('a'));//true
console.log(reg3.test('aaaaaaa'));//false

var reg4 = /^a{3}$/;//重复3次 
console.log(reg4.test(''));//false
console.log(reg4.test('a'));//false
console.log(reg4.test('aaa'));//true

var reg5 = /^a{3,}$/;//大于等于3 
console.log(reg5.test(''));//false
console.log(reg5.test('a'));//false
console.log(reg5.test('aaa'));//true
console.log(reg5.test('aaaa'));//true


var reg6 = /^a{3,5}$/;//大于等于3  并且 小于等于16
console.log(reg6.test(''));//false
console.log(reg6.test('a'));//false
console.log(reg6.test('aaa'));//true
console.log(reg6.test('aaaa'));//true
```


eg：
```js
//只能输入6-16位的字母、数字、下划线、短横线
var reg = /^[a-zA-Z0-9_-]{6,16}$/;
```


### 5.括号总结

- 大括号  量词符，里面表示重复次数
- 中括号  字符集合,匹配方括号中的任意字符
- 小括号  表示优先级

eg：
```js
//中括号
var reg = /^[abc]$/;//a 或 b 或 c

//大括号
var reg1 = /^abc{3}$/;//让c重复三次

//小括号
var reg2 = /^(abc){3}$/;//让abc重复三次
```

可以在线测试:https://c.runoob.com/front-end/854


### 6.预定义类

预定义类指的是**某些常见模式的简写方式**。

预定义类 | 说明
---|---
\d | 匹配所有0-9之间的任一数字,相当于`[0-9]`
\D | 匹配所有0-9以外的字符,相当于`[^0-9]`
\w | 匹配任意的字母、数字和下划线,相当于`[A-Za-z0-9_]`
\W | 除所有字母、数字和下划线 以外的字符,相当于`[^A-Za-z0-9_]`
\s | 匹配空格(包含换行符、制表符、空格符等)，相当于`[\t\r\n\v\f]`
\S | 匹配非空格的字符，相当于`[^\t\r\n\v\f]`

eg:
```js
//座机号码验证:全局座机号码  两种格式: 010-12345678 或者 0530-1234567
//正则里面的或者符合 |
var reg1 = /^\d{3}-\d{8}|\d{4}-\d{7}$/;
```



## 正则表达式中的替换

### 1.replace替换

`replace()`方法可以实现替换字符串操作,用来替换的参数可以是一个字符串或是一个正则表达式。

`stringObject.replace(regexp/substr,replacement)`

- 第一个参数：被替换的字符串或者正则表达式
- 第二个参数:替换为的字符串
- 返回值是一个替换完毕的新字符串

eg:
```js
var str = 'andy和red';
var newStr = str.replace('andy', 'baby');
console.log('newStr: ', newStr);//baby和red
```

eg:
```js
var str = 'andy和red';
var newStr = str.replace(/andy/, 'baby')
console.log('newStr: ', newStr);//baby和red
```

### 2.正则表达式参数

`/表达式/[switch]`

`switch`也称为修饰符,按照什么样式的模式来匹配,有三种值:

- `g`:全局匹配
- `i`:忽略大小写
- `gi`:全局匹配+忽略大小写

eg：敏感词过滤
```html
<body>
    <textarea name="" id="message" cols="30" rows="10"></textarea>
    <button>提交</button>
    <div></div>
    <script>
        var text = document.querySelector("textarea");
        var btn = document.querySelector("button");
        var div = document.querySelector("div");
        btn.onclick = function () {
            div.innerHTML = text.value.replace(/小学生|gay/g, '**')
        }
    </script>
</body>
```


