# 面向对象

[[toc]]

## 面向对象编程介绍

### 1.两大编程思想

- 面向过程
- 面向对象

### 2.面向过程编程POP(Process Oriented Programming)

面向过程就是分析出解决问题所需要的步骤,然后用函数把这些步骤一步一步实现，使用的时候再一个一个依次调用就可以了。


举个栗子:将大象装进冰箱,面向过程做法。

打开冰箱->大象装进去->关上冰箱门

> 面向过程，就是按照我们分析好了的步骤，按照步骤解决问题。



### 2.面向对象编程OOP(Object Oriented Programming)

面向对象是把事务分解为一个个对象,然后由对象之间分工与合作。

举个栗子:将大象装进冰箱,面向对象做法。

先找出对象,并写出这些对象的功能。

1.大象对象

- 进去

2.冰箱对象

- 打开
- 关闭

3.使用大象和冰箱的功能

> 面向对象是以对象功能来划分问题,而不是问题


在面向对象程序开发思想中,每一个对象都是功能中心,具有明确分工。

面向对象编程具有灵活、代码可复用、容易维护和开发的优点,更适合多人合作的大型软件项目。

面向对象的特性

- 封装性
- 继承性
- 多态性

![image](/javaScript/object.png)



### 3.POP和OOP对比

**面向过程POP**

- 优点:性能比面向对象高,适合跟硬件联系很紧密的东西,利用单片机就采用面向过程编程。
- 缺点:没有面向对象易维护、易复用、易扩展。

**面向对象OOP**

- 优点:易维护、易复用、易扩展,由于面向对象有封装、继承、多态性的特性,可以设计出低耦合的系统,使系统更加灵活,更加易于维护。
- 缺点:性能比面向过程低


用面向过程的方法写出来的程序是一份蛋炒饭,而用面向对象的方法写出来的程序是一份盖浇饭。




## ES6中的类和对象


### 1.面向对象

面向对象更贴近我们的实际生活,可以使用面向对象描述现实世界事物,但是事物分为具体事物和抽象事物。

- 手机 - 抽象的(泛指的)
- 特指某部手机 - 具体的(特指的)

**面向对象的思维特点:**

- 抽取(抽象)对象共用的属性和行为组织(封装)成一个类(模板)
- 对类进行实例化,获取类的对象


面向对象编程我们考虑的是有哪些对象,按照面向对象的思维特点,不断的创建对象,使用对象,指挥对象做事情。



### 2.对象

现实生活中,万物皆对象。**对象是一个具体的事物**,看得见摸得着的实物。例如:一本书、一辆汽车、一个人可以是对象,一个数据库,一个网页,一个与远程服务器的连接也可以是对象。

在`javascript`中,**对象是一组无序的相关属性和方法的集合,所有的事物都是对象**,例如:字符串、数组、数值、函数等。

对象是由**属性**和**方法**组成的:

- 属性:事物的==特征==,在对象中用==属性==来表示(常用名词)
- 方法:事物的==行为==,在对象中用==方法==来表示(常用动词)



### 3.类 class

在`ES6`中新增加了类的概念,可以使用`class`关键字声明一个类,之后以这个类来实例化对象。

**类**抽象了对象的公共部分,它==泛指==某一大类(class)

**对象**==特指==某一个,通过类实例化一个具体的对象


### 4.创建类


语法:
```js
class name {
    //class body
}
```

创建实例:
```js
var xx = new name();
```

> 注意：类必须使用new实例化对象

eg:
```js
//1.创建类 class  创建一个  明星类
class Star {
}
//2.利用类创建对象
new Star();
```



### 5.类 constructor 构造函数

`constructor()`方法是类的构造函数(默认方法),**用于传递参数,返回实例对象**,通过`new`命令生成对象实例时,自动调用该方法。如果没有显示定义,类内部会自动给我们创建一个`constructor()`

eg:
```js
//1.创建类 class  创建一个  明星类
class Star {
    constructor(name, age) {
        //this指向的是创建的实例
        this.name = name;
        this.age = age;
    }
}
//2.利用类创建对象
var rxj1 = new Star('rxj1');
var rxj2 = new Star('rxj2', 18);
console.log('rxj1: ', rxj1.name);//rxj1
console.log('rxj2: ', rxj2.name);//rxj2
console.log('rxj2: ', rxj2.age);//18
```

注意点:

- 通过`class`关键字创建类,类名我们习惯定义首字母大写
- 类里面有个`constructor(){}`函数,可以接收传递过来的参数,同时返回给实例对象
- `constructor(){}`函数,只要`new`生成实例时,就会自动调用这个函数,如果我们不写这个函数,类也会自动生成这个函数
- 生成实例`new`不能省略
- 注意语法规范,创建类,类名后面不要加小括号,生成实例,类名后面加小括号,构造函数不需要加`function`


### 6.类添加方法

语法:
```js
class Person{
    constructor(name,age){//构造器或构造函数
        this.name = name;
        this.age = age;
    }
    say(){
        console.log(this.name+'你好')
    }
}
```

- 我们类里面的所有函数不需要写`function`
- 多个函数方法之间不需要添加逗号分隔

eg:
```js
//1.创建类 class  创建一个  明星类
class Star {
    constructor(name, age) {
        //this指向的是创建的实例
        this.name = name;
        this.age = age;
    }
    sing(song) {
        if (song) {
            console.log('唱歌' + song)
        } else {
            console.log('唱歌')
        }
    }
}
//2.利用类创建对象
var rxj1 = new Star('rxj1');
var rxj2 = new Star('rxj2', 18);
console.log('rxj1: ', rxj1.name);//rxj1
console.log('rxj2: ', rxj2.name);//rxj2
console.log('rxj2: ', rxj2.age);//18
//3.调用方法
rxj1.sing('爱笑的眼睛');//唱歌 爱笑的眼睛
rxj2.sing();//唱歌
```


## 类的继承

### 1.继承

现实中的继承:子承父业,比如我们都继承了父亲的姓

程序中的继承:子类可以继承父类的一些属性和方法。

语法:
```js
class Father{
    //父类
}

class Son extends Father{
    //子类继承父类
}
```

eg:
```js
class Father {
    constructor() {

    }
    money() {
        console.log(100)
    }
}

class Son extends Father {

}
var son = new Son();
son.money();//100
```


### 2.super关键字

**super关键字**用于访问和调用对象父类上的函数。可以调用父类的构造函数,也可以调用父类的普通函数。

eg:调用父类的构造函数
```js
class Father {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    sum() {
        console.log(this.x + this.y)
    }
}

class Son extends Father {
    constructor() {
        super(x, y);//调用了父类中的构造函数
    }
}

var son = new Son(1, 2);
son.sum();//3
```

eg:调用父类的普通函数
```js
class Father {
    say() {
        return '我是爸爸'
    }
}

class Son extends Father {
    say() {
        // super.say() + '的儿子'
        //调用父类中的普通函数
        console.log(super.say() + '的儿子');
    }
}

var son = new Son();
son.say();//我是爸爸的儿子    
```

继承中的属性或者方法查找原则:就近原则

- 继承中,如果实例化子类输出一个方法,先看子类有没有这个方法,如果有就先执行子类的方法
- 继承中,如果子类里面没有,就去查找父类有没有这个方法,如果有,就执行父类的这个方法(就近原则)

eg:
```js
 class Father {
    say() {
        return '我是爸爸'
    }
}

class Son extends Father {
    say() {
        return '我是儿子'
    }
}

var son = new Son();
son.say();//我是儿子     就近原则
```

eg：子类继承父类加法方法 同时  扩展减法方法
```js
 //父类有加法方法
class Father {
    constructor(x, y) {
        this.x = x;

    }
    sum() {
        console.log(this.x + this.y)
    }
}

//子类继承父类加法方法 同时  扩展减法方法
class Son extends Father {
    constructor(x, y) {
        super(x, y);//调用父类构造函数
        //super()必须在子类this之前调用
        this.x = x;
        this.y = y;
    }
    subtract() {
        console.log(this.x - this.y)
    }
}

var son = new Son(5, 3);
son.subtract();//2
son.sum();//8
```


**三个注意点**

- 在`ES6`中类没有变量提升,所以必须先定义类,才能通过类实例化对象
- 类里面的共有的属性和方法一定要加`this`使用
- `constructor`里面的`this`指向实例对象,方法里面的`this`指向这个方法的调用者

eg:
```js
var that;
class Father {
    constructor(x, y) {
        //constructor 里面的this指向的是我们创建的实例对象
        that = this;//指针修正
        this.x = x;
        this.sum();
    }
    sum() {
        //方法中的this指向的是调用者
        //sum方法里面的this 指向的是实例对象 因为实例调用了这个方法
        console.log(this.x + this.y)
    }
}

var father = new Father();
father.sum();
```


