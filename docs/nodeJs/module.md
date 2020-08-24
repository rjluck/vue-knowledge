# 模块系统

## Node中的console.log

### REPL

- read
- eval
- print
- loop

在终端输入`node`命令直接敲回车

这个环境的作用只是用来帮助我们做一些辅助测试,例如在里面可以直接使用`node`中的核心模块，而不需要`require`加载。

## 模块系统

- npm
- package.json
- Express
   + 高度封装了http模块
   + 第三方Web开发框架
- 增删改查
    + 使用文件来保存数据(异步编码)
- MongoDB
    + 所有方法都封装好了


- markdown使用工具typora

在Node中,我们开启的Web服务是一个完全的黑盒子,它不像php,php中无论是代码还是网页，都可以直接通过web url路径来访问。

在Node中开启发的服务器,默认是黑盒子，所有资源都不允许用户来访问，用户可以访问哪些资源由具体的开发人员编写设计的代码为准。


使用Node编写应用程序主要就是在使用:

- ECMAScript语言
    + 和浏览器不一样，在Node中没有BOM、DOM
- 核心模块
    + 文件操作的fs
    + http服务的http
    + url路径操作模块
    + path路径处理模块
    + os操作系统信息
- 第三方模块
    + art-template,服务于客户端
    + 必须通过npm来下载才可以使用
- 自己写的模块
    + 自己创建的文件


### 什么是模块化

- 文件作用域
- 通信规则
    + 加载`require`
    + 导出`exports`

## CommonJS 模块规范

在Node中JavaScript还有一个很重要的概念，模块系统。

- 模块作用域
- 使用`require`方法用来加载模块
- 使用`exports`接口对象用来导出模块中的成员

### 1.加载`require`

语法：
```js
var 自定义变量名称 = require('模块')
```

两个作用：
- 执行被加载模块中的代码
- 得到被加载模块中的`exports`导出接口对象

### 2.导出`exports`

- Noode中是模块作用域，默认文件中所有的成员只在当前文件模块有效
- 对于希望可以被其他模块访问的成员，我们就需要把这些公开的成员挂载到`exports`接口对象中就可以了

导出多个成员(必须在对象中)
```js
exports.a = 123;
exports.b = 'hello';
exports.c = function(){
};
exports.d = {
    foo:''bar
};

```

导出单个成员()

```js
module.exports = 'hello';
module.exports = function(x+y){
    return x+y;
}
```

语法：
```js
var 自定义变量名称 = require('模块')
```

也可以这样来导出多个成员：
```js
module.exports = {
    add:function(){

    },
    str:'hello'
}
```

eg:
```js
//main.js
//默认得到的是对象
//使用对象中的成员必须.某个成员
var fooExports = require('./foo');

console.log(foo);//foo is not defined
console.log(fooExports);//add function

//有时
```

```js
//foo.js
var foo= 'bar';

function add(x,y){
    return x + y;
}
//只能得到我想要给你的成员
//这样做的目的是为了解决变量命名冲突问题
// exports.add = add;

//exports是一个对象
//我们可以通过多次为这个对象添加成员实现
// exports.str = 'hello';

//如果一个模块需要直接导出某个成员，而非挂载
//那这个时候必须使用module.exports
module.exports = add;
```


### 3.exports和module.exports区别

- 在Node中，每个模块内部都有一个自己的`module`对象
- 该`module`对象中，有一个成员叫：`exports`,默认是空对象
- 也就是说，如果你需要对外导出成员，只需要把导出的成员挂载到`module.exports`中

```js
var module = {
    exports:{

    }
}
```

默认在代码的最后有一句(底层)：
```js
return module.exports
```

谁require谁就得到`module.exports`

eg:
```js
var fooExports = require('./foo');

console.log(foo);//foo is not defined
console.log(fooExports);//add function

```

```js
//foo.js
module.exports.foo = 'bar';
module.exports.add = function(x,y){
    return x+y;
};
//这样每次导出都需要module.xxx比较麻烦。
//所以，Node为了简化操作，专门提供了一个变量 exports 等于 module.exports

//也就是说，在模块中还有这么一句代码
// var exports = module.exports
//两者一致，说明我们可以使用任意一方来导出成员。
```

`exports`是`module.exports`的一个引用

```js
console.log(exports === module.exports);//true
exports.foo = 'bar';
//等价于
module.exports.foo = 'bar';
```


## require方法加载规则

### 1.核心模块(模块名)

```js
//main.js
require('./a')
//优先从缓存加载
//由于 在a中已经加载过b,所以这里不会重复加载
//可以拿到其中的接口对象，但是不会重复执行里面的代码
//这样做的目的为了避免重复加载，提高加载效果
var fn = require('./b');//为了得到结果
console.log(fn)
```

```js
//a.js
console.log('a.js被加载')
require('./b')
console.log(fn)
```

```js
//b.js
console.log('b.js被加载')

module.exports = function(){
    console.log('hhhh')
}
```

> node main.js输出结果为
```js
console.log('a.js被加载')
console.log('b.js被加载')
```

- 核心模块的本质也是文件
- 核心模块文件已经被编译到了二进制文件中了，我们只需要按照名字来加载了
```js
require('fs');
require('http');
```




### 2.第三方模块(模块名node_modules)

- 凡是第三方模块都必须通过`npm`来下载
- 使用的时候就可以通过`require('包名')`的方式来进行加载才可以使用
- 不可能有任何一个第三方包和核心模块的名字是一样的
- 既不是核心模块,也不是路径形式的模块
- 先找到当前文件所处目录中的`node_modules`目录
- `node_modules/art-template/package.json`
- `node_modules/art-template/package.json`文件中`main`属性
- `main`属性中就记录了`art-template`的入口模块
- 然后加载使用这个第三方包
- 实际上最终加载的还是文件
  
```js
var template = require('art-template')
```

- 如果`package.json`文件不存在或者`main`指定的入口模块也没有
- 则`node`会自动找该目录下的`index.js`
- 也就是说`index.js`会作为一个默认被选项


- 如果以上所有任何一个条件都不成立，则会进入上一级目录中的`node_modules`目录查找
- 如果上一级还没有，则继续往上一级查找
- ......
- 如果直到当前磁盘根目录还找不到,最后报错。
- 不会到兄弟文件里面查找`node_modules`目录
  
> 注意：我们一个项目有且只有一个node_modules,放在项目根目录中，这样项目所有子文件都可以加载，不会有多个node_modules。




### 3.用户自己写的（路径）

- 优先从缓存加载




### 4.查找机制

- 优先从缓存加载
- 判断模块标识
    - 核心模块
    - 第三方模块
    - 自己写的模块

> 如果是非路径形式的模块标识
```js
require('./foo.js')
```
> 路径形式的模块
 - `./`
 - `../`
 - `/xxx`  绝对路径,用的很少
 - 首位的`/`在这里表示的是当前文件模块所属磁盘根路径


> 深入浅出Node.js(三)：深入Node.js的模块机制
> 更多底层可自行参考《深入浅出Node.js》中的模块系统章节




## npm

- node package manager
- 安装命令
    - `npm install art-template jQuery bootstrap`
    - `npm install art-template --save` / `npm install --save art-template `
    - `npm install` 就会自动把`package.json`中的`dependencies`中所有的依赖项都下载回来。

### 1.npm网站

https://www.npmjs.com/

### 2.npm命令行工具

- 只要安装了`node`就已经安装了`npm`
- `npm`也有版本这个概念，可以通过命令行中输入`npm --version`/`npm -v`查看版本号
- 升级`npm`（自己升级自己）:`npm install --global npm` 


### 3.常用命令

- `npm init` 生成`package.json`文件
    - `npm init -y` 可以跳过向导快速生成
- `npm install`   一次性把`dependencies`选项中的依赖全部安装
    - `npm i` 简写
- `npm install 包名`  只下载
   - `npm i 包名` 简写
- `npm install 包名 --save` 下载并保存依赖项(`package.json`文件中的`dependencies`选项)
   - `npm i 包名 -S` 简写
- `npm uninstall 包名`  只删除，如果有依赖项会依然保存
    - `npm un 包名` 简写
- `npm uninstall --save 包名` 删除的同时会把依赖信息去除
    - `npm un -S 包名` 简写
- `npm help` 查看使用帮助 
- `npm uninstall help` 查看`uninstall`使用帮助 


### 4.解决npm被墙问题

`npm`存储包文件的服务器在国外，有时候会被强，速度会很慢，所以需要解决这个问题。

- `cnpm` 淘宝镜像 
    - `http://npm.taobao.org/`  
    - `https://developer.aliyun.com/mirror/NPM?from=tnpm`

  安装淘宝的`cnpm`
  ```js
  npm install --global cnpm
  ```
  
使用：
- 这里走国外的npm服务器,速度比较慢 `npm install jquery`
- 使用cnpm 就会通过淘宝的服务器来下载 `cnpm install jquery`
- 若不想安装`cnpm`,又想使用淘宝服务器来下载，可以 `npm install jquery --registry=https://registry.npm.taobao.org`
- 手动加参数很麻烦，所以我们可以把这个选项加入到配置文件中 `npm config set registry  https://registry.npm.taobao.org`
- 只要经过了上面命令配置，则以后所有的`npm install` 都会默认通过宝淘的服务器来下载。
- 查看`npm`配置信息 `npm config list`






## package.json

- 产品的说明书
- 建议每个项目都要有一个`package.json`文件(包描述文件,就像产品的说明书一样),给人踏实的感觉。
- 这个文件可以通过`npm init`命令生成。
- 安装第三方包的命令,加上`-- save`,就会在`package.json`中生成`dependencies`对象包含所安装包的名称及版本号。
- 建议执行`npm i 包名`都加上`-- save`这个选项，目的是用来保存依赖信息。