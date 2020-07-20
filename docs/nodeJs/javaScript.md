# Node中的js

[[toc]]

- ECMAScript
    - 没有DOM和BOM
- 核心模块(具名的核心模块)
- 第三方模块
- 用户自定义模块

## 核心模块

`Node`为`JavaScript`提供了很多服务器级别的`API`,这些`API`绝大多数都被包装到了一个具名的核心模块中了

例如文件操作的`fs`核心模块,`http`服务构建的`http`,`path`路径操作模块,`os`操作系统信息模块……

如果想要使用核心模块，就必须引用。


```js
var fs = require('fs');//文件操作模块
var os = require('os');//获取操作系统信息
var path = require('path');//获取操作路径
var http = require('http');//网络服务构建模块
```

## 用户自定义模块

在`Node`中,模块有三种：

- 具名的核心模块,例如fs、http
- 用户自己编写的文件模块

**加载模块注意点：**

- 相对路径中的`./`不能省略。
- 可以省略后缀名
eg：

a.js
```js
console.log('a start');
require('./b.js');
console.log('a end');
```

b.js
```js
console.log('b.js文件被加载执行了');
```

![image](/imgs/nodeJs/package1.png)


## 模块作用域

在`Node`中,没有全局作用域,只有模块作用域

- 模块完全是封闭的
- 外部访问不到内部
- 内部也访问不到外部

模块作用域固然带来了一些好处,可以加载执行多个文件,可以完全避免变量命名冲突污染的问题。但是，某些情况下，模块与模块是需要进行通信的。

eg：

a.js
```js
var foo = 'aaa';
require('./b.js');
console.log('foo', foo);//aaa
```

b.js
```js
var foo = 'bbb';
```

node a.js ===>aaa

## 模块与模块之间通信

既然是模块作用域，那如何让模块与模块之间进行通信。

有时，我们加载文件模块的目的不是为了简简单单的执行里面的代码,更重要的是为了使用里面的方法。

`require`方法有两个作用:

- 加载文件模块并执行里面的代码
- 拿到被加载文件模块导出的接口对象

在每个文件模块中都提供了一个对象:`exports`

- `exports`默认是一个空对象。


a.js
```js
var ret = require('./b.js');
console.log('ret: ', ret);//{}
```

b.js
```js
var foo = 'bbb';
console.log('exports', exports);//{}
```

- 把需要外部访问的成员挂载到这个`exports`对象中
- 谁`require`这个模块,谁就可以得到模块内部的`exports`接口对象

eg：

a.js
```js
var ret = require('./b.js');
console.log('ret: ', ret);//{ foo: 'hello' }
console.log('ret: ', ret.foo);//hello
console.log('ret: ', ret.add(1, 2));//3
```

b.js
```js
var foo = 'bbb';
console.log('exports', exports);//{}
exports.foo = 'hello';
exports.add = function (x, y) {
    return x + y;
}
```








