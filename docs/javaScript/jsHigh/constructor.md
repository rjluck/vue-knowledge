# 构造函数和原型

[[toc]]

## 构造函数和原型

### 1.概述

在典型的`OOP`的语言中(如`Java`),都存在类的概念,类就是对象的模板,对象就是类的实例,但在`ES6`之前,`JS`中并没有引入类的概念。

`ES6`全称`ECMAScript6.0`,2015.06发版。但是 目前浏览器的`JavaScript`是`ES5`版本,大多数高版本的浏览器也支持`ES6`,不过只实现了`ES6`的部分特性和功能。

在`ES6`之前,对象不是基于类创建的,而是用一种称为**构造函数**的特殊函数来定义对象和它们的特征。


创建对象可以通过以下3种方式:

- 对象字面量 `var obj1 = {}`
- `new Object()`  `var obj2 = new Object()`
- 自定义构造函数

```js
//构造函数Star
function Star(name,age){
    this.name = name;
    this.age = age;
    this.sing = function(){
        console.log('唱歌')
    };
}

//实例化构造函数,创建对象
var hhh = new Star('xxx',18);
var zzz = new Star('zzz',20);
console.log('hhh',hhh);
hhh.sing();
zzz.sing();
```


### 2.构造函数

构造函数是一种特殊的函数,主要用来初始化对象,即为对象成员变量赋初始值,它总与`new`一起使用。我们可以把对象中一些公共的属性和方法抽取出来,然后封装到这个函数里面。

在`JS`中,使用构造函数时要注意以下两点:

- 构造函数用于创建某一类对象,其**首字母要大写**
- 构造函数要**和`new`一起使用**才有意义


**new 在执行时会做四件事情**

- 在内存中创建一个新的空对象
- 让`this`指向这个新的对象
- 执行构造函数里面的代码,给这个新对象添加属性和方法
- 返回这个新对象(所以构造函数里面不需要`return`)


`JavaScipt`的构造函数中可以添加一些成员,可以在构造函数本身上添加,也可以在构造函数内部的`this`上添加。通过这两种方式添加的成员,就分别称为**静态成员**和**实例成员**。

- 静态成员:在构造函数本身上添加的成员称为静态成员,只能由==构造函数本身==来访问 `Star.sex = '女'` `Star.sex`
- 实例成员:在构造函数内部创建的对象成员称为实例成员,只能由==实例化对象==来访问 `hhh.name`


### 3.构造函数的问题

构造函数方法很好用,但是存在浪费内存的问题。

复杂数据类型会开辟多个空间

![image](/javaScript/constructor.png)


```js
//比较的地址
console.log('hhh.sing === zzz.sing: ', hhh.sing === zzz.sing);//false
```

>我们希望所有的对象使用同一个函数,这样就比较节省内存,那么我们需要怎样做呢？


### 4.构造函数原型 prototype

构造函数通过原型分配的函数,是所有对象所**共享的**

`javascript`规定,**每一个构造函数都有一个`prototype`属性**,指向另一个对象。注意这个`prototype`就是一个对象,这个对象的所有属性和方法,就会被构造函数所拥有。

**我们可以把那些不变的方法,直接定义在prototype对象上,这样所有对象的实例就可以共享这些方法。**


eg:
```js
function Star(name, age) {
    this.name = name;
    this.age = age;
    // this.sing = function () {
    //     console.log('唱歌')
    // };
}
Star.prototype.sing = function () {
    console.log('唱歌')
};
//实例化构造函数,创建对象
var hhh = new Star('xxx', 18);
var zzz = new Star('zzz', 20);
hhh.sing();
zzz.sing();
console.dir(Star);
```

**原型是什么**

一个对象,我们也称为`prototype`为原型对象。


**原型主要作用**

共享方法


> 一般情况下,我们的公共属性定义到构造函数里面,公共的方法我们放到原型对象上。

```js
//比较的地址
console.log('hhh.sing === zzz.sing: ', hhh.sing === zzz.sing);//true
```


### 5.对象原型 __proto__

**对象都会有一个属性`__proto__`**指向构造函数的`prototype`原型对象,之所以我们对象可以使用构造函数`prototype`原型对象的属性和方法,就是因为对象有`__proto__`原型的存在。


- `__proto__`对象原型和原型对象`prototype`是等价的 `console.log(hhh.__proto__ === Star.prototype);//true`
- `__proto__`对象原型的意义就在于为对象的查找机制提供一个方向,或者说一条路线,但是它是一个非标准属性,因此实际开发中,不可以使用这个属性,t它只是内部指向原型对象`prototype`


**方法查找规则**

- 首先先看hhh对象身上是否有sing方法,如果有就执行这个对象上的`sing`方法
- 如果没有,因为有`__proto__`的存在,就去构造函数原型对象`prototype`身上去查找sing这个方法

eg：
```js
function Star(name, age) {
    this.name = name;
    this.age = age;
}
Star.prototype.sing = function () {
    console.log('唱歌')
};
//实例化构造函数,创建对象
var hhh = new Star('xxx', 18);
var zzz = new Star('zzz', 20);
hhh.sing();
zzz.sing();
console.log(hhh);//对象身上系统自己添加一个__proto__ 指向我们构造函数的原型对象prototype
console.dir(Star);
console.log(hhh.__proto__ === Star.prototype);//true
```


### 6.constructor 构造函数

**`__proto__`对象原型**和**构造函数(`prototype`)原型对象**里面都有一个属性**`constructor`**属性,**`constructor`**我们称为它指回构造函数本身。

`constructor`主要用于记录该对象引用于哪个构造函数,它可以让原型对象重新指向原来的构造函数。



eg:
```js
function Star(name, age) {
    this.name = name;
    this.age = age;
}

Star.prototype.sing = function () {
    console.log('唱歌')
};
Star.prototype.movie = function () {
    console.log('电影')
};


//实例化构造函数,创建对象
var hhh = new Star('xxx', 18);
var zzz = new Star('zzz', 20);
hhh.sing();
zzz.sing();

console.log(hhh.__proto__);
console.log(Star.prototype);
console.log(hhh.__proto__ === Star.prototype);//true

console.log('hhh.__proto__.constructor', hhh.__proto__.constructor);//Star
console.log('Star.prototype.constructor', Star.prototype.constructor);//Star
```

很多情况下,我们需要手动的利用constructor这个属性指回 原来的构造函数

```js
function Star(name, age) {
    this.name = name;
    this.age = age;
}
// Star.prototype.sing = function () {
//     console.log('唱歌')
// };
// Star.prototype.movie = function () {
//     console.log('电影')
// };

Star.prototype = {
    //很多情况下,我们需要手动的利用constructor这个属性指回 原来的构造函数
    constructor: Star,
    sing: function () {
        console.log('唱歌')
    },
    movie: function () {
        console.log('电影')
    }
}
//实例化构造函数,创建对象
var hhh = new Star('xxx', 18);
var zzz = new Star('zzz', 20);
hhh.sing();
zzz.sing();
console.log(hhh);//对象身上系统自己添加一个__proto__ 指向我们构造函数的原型对象
console.dir(Star);
console.log(hhh.__proto__ === Star.prototype);//true
console.log(hhh.__proto__);//此时无constructor这个属性了,所以需要手动指回
console.log(Star.prototype);//此时无constructor这个属性了,所以就没有办法指回原来的构造函数了，,所以需要手动指回
console.log('hhh.__proto__.constructor', hhh.__proto__.constructor);//Star
console.log('Star.prototype.constructor', Star.prototype.constructor);//Star

```





### 7.构造函数、实例、原型对象三者之间的关系


![image](/javaScript/relation.png)


### 8.原型链

- 只要有对象就有 `__proto__` 原型,指向原型对象
- `hhh`实例对象中的`__proto__`指向`Star`原型对象的`prototype`
- `Star`原型对象中的`__proto__`指向`Object`原型对象的`prototype`
- `Object`原型对象中的`__proto__`指向`null`
- 链式查找,找不到最后返回`null`

![image](/javaScript/proto.png)

eg:
```js
function Star(name, age) {
    this.name = name;
    this.age = age;
}
Star.prototype.sing = function () {
    console.log('唱歌')
};
Star.prototype.movie = function () {
    console.log('电影')
};

//实例化构造函数,创建对象
var hhh = new Star('xxx', 18);
var zzz = new Star('zzz', 20);
hhh.sing();
zzz.sing();

console.log(hhh.__proto__ === Star.prototype);//true
console.log(hhh.__proto__);
//1.只要有对象就有 __proto__ 原型,指向原型对象
console.log(Star.prototype);
//2.我们 Star原型对象里面的__proto__ 原型指向的是Object.prototype
console.log(Star.prototype.__proto__ === Object.prototype);//true
//3.我们Object.prototype原型对象里面的__proto__原型,指向为null
console.log(Object.prototype.__proto__);//null

```


### 9.JavaScript 的成员查找机制(规则)

- 当访问一个对象的属性(包括方法)时,首先查找这个**对象自身**有没有该属性
- 如果没有就查找它的原型(也就是`__proto__`指向的 **`prototype`原型对象**)
- 如果还没有就查找原型对象的原型(**`Object`的原型对象**)
- 依此类推一直找到`Object`为止( **`null`**)
- `__proto__`对象原型的意义就在于为对象成员查找提供一个方向,或者说一条路线


eg：
```js
function Star(name, age) {
    this.name = name;
    this.age = age;
}
Star.prototype.sing = function () {
    console.log('唱歌')
};
//2.
// Star.prototype.sex = '女';

//3.
// Object.prototype.sex = '女';

var ldh = new Star('佳佳佳', 18);
//1.
// ldh.sex = '女';
console.log(ldh.sex);//女
console.log(Object.prototype);//有toString属性
console.log(ldh);//无toString属性
console.log(Star.prototype);//无toString属性
console.log(ldh.toString());//可以使用该方法，链式查找

```

### 10.原型对象this指向

- 在构造函数中,里面的this指向的是对象实例 ldh
- 原型对象函数里面的this 指向的是  实例对象 ldh

eg：
```js
function Star(name, age) {
    this.name = name;
    this.age = age;
}
var that;
Star.prototype.sing = function () {
    console.log('唱歌');
    that = this;
};

var ldh = new Star('佳佳佳', 18);
//1. 在构造函数中,里面的this指向的是对象实例 ldh

ldh.sing();
console.log(that === ldh);//true
//2.原型对象函数里面的this 指向的是  实例对象 ldh
```


### 11.扩展内置对象

可以通过原型对象,对原来的内置对象进行扩展自定义的方法。比如给数组增加自定义求偶数和的功能。


**注意**

数组和字符串内置对象不能给原型对象覆盖操作 `Array.protorype = {}`,只能是`Array.prototype.xxx = function(){}`的方式。

eg:
```js
//原型对象的应用  扩展内置对象方法
console.log(Array.prototype);//打印出内置对象
//追加方法
Array.prototype.sum = function () {
    var sum = 0;
    for (var i = 0; i < this.length; i++) {
        sum += this[i];
    }
    return sum;
}

//使用
var arr = [1, 2, 3];//由构造函数Array实例得来的
console.log(arr.sum());//6
//使用
var arr1 = new Array(11, 22, 33);
console.log(arr1.sum());//66

//
console.log(Array.prototype);//打印最新对象
```





## 继承

`ES6`之前并没有给我们提供`extends`继承。我们可以通过**构造函数+原型对象**模拟实现继承,被称为**组合继承**。

### 1.call()

调用这个函数,并且修改函数运行时的`this`指向。

`fun.call(thiaArg,arg1,arg2,...)`

- `thisArg`:当前调用函数`this`的指向函数
- `arg1,arg2...`:传递的其他参数

eg：
```js
// call方法
function fn(x, y) {
    console.log(11);
    console.log('this', this);
    console.log('x', x);//1
    console.log('y', y);//2

}

var o = {
    name: 'andy'
}
// fn();//此时fn函数里面的this指向window

//1.call() 可以调用函数
// fn.call(); //此时fn函数里面的this指向window

//2.call() 可以改变这个函数的this指向
fn.call(o, 1, 2); //此时fn函数里面的this指向o这个对象,1和2是普通参数
```

### 2.借用构造函数继承父类型属性

**核心原理**:通过`call()`把父类型的`this`指向子类型的`this`，这样就可以实现子类型继承父类型的属性。


eg:
```js
//借用父构造函数继承属性
//1.父构造函数
function Father(name, age) {
    //this指向父构造函数的实例对象
    this.name = name;
    this.age = age;
}
//2.子构造函数
function Son(sname, sage, score) {
    //this指向子构造函数的实例对象
    Father.call(this, sname, sage, score);//调用了父构造函数,同时指针改为子类型的实例对象
    this.score = score;//子构造函数自身的属性
}

//对子构造函数进行实例化
var son = new Son('ldh', 18, 100)
console.log('son: ', son);
```


### 3.借用构造函数继承父类型方法

一些共有的方法写在`prototype`上

`Son.prototype = new Father()`

eg:
```js
//借用父构造函数继承属性
//1.父构造函数
function Father(name, age) {
    //this指向父构造函数的实例对象
    this.name = name;
    this.age = age;
}
Father.prototype.money = function () {
    console.log(66666666666);
}


//2.子构造函数
function Son(sname, sage, score) {
    //this指向子构造函数的实例对象
    Father.call(this, sname, sage, score);//调用了父构造函数,同时指针改为子类型的实例对象
    this.score = score;//子构造函数自身的属性
}

//方法1：父原型对象的地址给了子原型对象，此时修改子构造函数的原型对象,父构造函数的原型对象也会被修改的,所以这么赋值是不科学的
// Son.prototype = Father.prototype;

//方法2:实例化new Father()相当于{}
Son.prototype = new Father();
//如果利用对象的形式修改了原型对象,别忘了利用constructor 指回原来的构造函数
Son.prototype.constructor = Son;


//这个是子构造函数专门的方法
Son.prototype.exam = function () {
    console.log('考试');
}

//对子构造函数进行实例化
var son = new Son('ldh', 18, 100)
console.log('son: ', son);

console.log('Father.prototype: ', Father.prototype);
console.log('Son.prototype: ', Son.prototype);
```










## ES5中的新增方法

`ES5`给我们新增了一些方法,可以很方便的操作数组或字符串,这些方法主要包括:

- 数组方法
- 字符串方法
- 对象方法


### 1.数组方法

遍历(迭代)方法:

#### `forEach()`

`array.forEach(function(currentValue,index,arr){})`

- `currentValue`数组当前项的值
- `index`数组当前项的索引
- `arr`数组对象本身

eg:
```js
var arr = [1, 2, 3];
arr.forEach(function (value, index, array) {
    console.log('value: ', value);//1 2 3
    console.log('index: ', index);//0 1 2
    console.log('array: ', array);//[1, 2, 3]
})
```


#### `map()`

相似于 forEach

#### `filter()`

`array.filter(function(currentValue,index,arr){})`

- `filter()`方法创建一个新的数组,新数组中的元素是通过检查指定数组中符合条件的所有元素,主要用于**筛选数组**
- `currentValue`数组当前项的值
- `index`数组当前项的索引
- `arr`数组对象本身

> 返回的是新数组，不会影响原来的数组

> 查找满足条件的元素,返回的是一个数组,而且是吧所以满足条件的元素返回回来

eg：
```js
var arr = [12, 88, 66];
var newArr = arr.filter(function (value, index, array) {
    console.log('value: ', value);//12 88 66
    console.log('index: ', index);//0 1 2
    console.log('array: ', array);//[12,88,66]
    return value >= 20;
})

console.log('newArr: ', newArr);//[88, 66]
```

#### `some()`

`array.some(function(currentValue,index,arr){})`

- `some()`方法用于检测数组中的元素是否满足指定条件,通俗点,查找数组中是否有满足条件的元素
- 注意它返回值是布尔值,如果查到这个元素,就返回`true`,如果查不到就返回`false`
- 如果找到第一个满足条件的的元素，则终止循环,不在继续查找
- `currentValue`数组当前项的值
- `index`数组当前项的索引
- `arr`数组对象本身

eg:
```js
var arr = [12, 88, 66];
var flag = arr.some(function (value, index, array) {
    console.log('value: ', value);//12 88 66
    console.log('index: ', index);//0 1 2
    console.log('array: ', array);//[12,88,66]
    return value >= 20;
})

console.log('flag: ', flag);//true
```

> 查找满足条件的元素是否存在,返回的是一个布尔值,如果查找到第一满足条件的元素就终止


#### `every()`

相似于 some