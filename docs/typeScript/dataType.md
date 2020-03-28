#  数据类型

[[toc]]


JavaScript 的类型分为两种：原始数据类型（Primitive data types）和对象类型（Object types）。

原始数据类型包括：布尔值、数值、字符串、null、undefined 以及 ES6 中的新类型 Symbol。

TypeScript支持与JavaScript几乎相同的数据类型，此外还提供了实用的枚举类型方便我们使用。

## 原始数据类型

### 布尔值 boolean

最基本的数据类型就是简单的true/false值，在JavaScript和TypeScript里叫做 boolean(其他语言中也一样)

```typescript
let isDone:boolean = false;
```


### 数值 number

和JavaScript一样，TypeScript里的所有数字都是浮点数。这些浮点数的类型是number。除了支持十进制和十六进制字面量，TypeScript还支持ECMAScript 2015中引入的二进制和八进制字面量。

```typescript
let decLiteral:number = 20; //十进制
let hexLiteral:number = 0x14; //十六进制
let binaryLiteral:number = 0b10100; //二进制
let octalLiteral:number = 0o24; //八进制
```

### 字符串 string

JavaScript 程序的另一项基本操作是处理网页或服务器端的文本数据。 像其它语言里一样，我们使用 `string` 表示文本数据类型。 和 JavaScript 一样，可以使用双引号（`"`）或单引号（`'`）表示字符串。

```typescript
let name:string = "张三"
let sentence = `hello,${name}`
```

### null和undefined

null 和 undefined本身是一个值，当做类型讲时，null和undefined是所有类型的子类型,子类型是可以赋值给父类型的。

null和undefined是其他类型的子类型

```typescript
let u: undefined = undefined;
let n: null = null;

let a:undefined = null;

let num:number | null = 3;//联合类型
num = null;
```

与 void 的区别是，undefined 和 null 是所有类型的子类型。也就是说 undefined 类型的变量，可以赋值给 number 类型的变量：
```typescript
// 这样不会报错
let num: number = undefined;

// 这样也不会报错
let u: undefined;
let num: number = u;
```
而 void 类型的变量不能赋值给 number 类型的变量：
```typescript
let u: void;
let num: number = u;
​
// Type 'void' is not assignable to type 'number'.
```






## 数组

TypeScript 像 JavaScript 一样可以操作数组元素。 有3种方式可以定义数组。 第一种，可以在元素类型后面接上 `[]`，表示由此类型元素组成的一个数组：

```typescript
let list: number[] = [1, 2, 3]
var arr:number[] =[1,2,3]
var arr1:string[]=["1","2"]
var arr2:any[] = [1,"2",true]
```

第二种方式是使用数组泛型，`Array<元素类型>`：

```typescript
let list: Array<number> = [1, 2, 3]
var arrType:Array<number> = [1,2,3]
var arrType2:Array<string> =["1","2"]
var arrType3:Array<any> =[1,"2",true]
```

第三种方式可采用接口表示法
```typescript
//接口表示
interface Istate {
    username:string,
    age:number
}
interface IArr {
    //[index:number]:number
    [index:number]:Istate
}

//var arrType4:IArr =[1,2,3]
var arrType4:IArr =[{username:"张三",age:10}]
//此时，强制约定数组里的每一项必须是符合Istate接口的约束规则

//同理
var arrType5:Array<Istate> = [{username:"张三",age:10}]

var arrType6:Istate[] = [{username:"张三",age:10}]
```




## 元组 Tuple

元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。 比如，你可以定义一对值分别为 `string` 和 `number` 类型的元组。

```typescript
let x: [string, number]
x = ['hello', 10] // OK
x = [10, 'hello'] // Error

let  arr:[string,number] = ["aaa",10]
```

当访问一个已知索引的元素，会得到正确的类型：

```typescript
console.log(x[0].substr(1)) // OK
console.log(x[1].substr(1)) // Error, 'number' 不存在 'substr' 方法
```

当访问一个越界的元素，会使用联合类型替代：

```typescript
x[3] = 'world' // OK, 字符串可以赋值给(string | number)类型

console.log(x[5].toString()) // OK, 'string' 和 'number' 都有 toString

x[6] = true // Error, 布尔不是(string | number)类型
```

**注意**：自从 TyeScript 3.1 版本之后，访问越界元素会报错，我们不应该再使用该特性。


## 任意值 any

有时候，我们会想要为那些在编程阶段还不清楚类型的变量指定一个类型。 这些值可能来自于动态的内容，比如来自用户输入或第三方代码库。 这种情况下，我们不希望类型检查器对这些值进行检查而是直接让它们通过编译阶段的检查。 那么我们可以使用 `any` 类型来标记这些变量：

任意值（Any）用来表示允许赋值为任意类型

声明一个变量为任意值之后，对它的任何操作，返回的内容的类型都是任意值。

```typescript
let notSure: any = 4
notSure = 'maybe a string instead'
notSure = false // 也可以是个 boolean
```

在对现有代码进行改写的时候，`any` 类型是十分有用的，它允许你在编译时可选择地包含或移除类型检查。并且当你只知道一部分数据的类型时，`any` 类型也是有用的。 比如，你有一个数组，它包含了不同的类型的数据：

```typescript
let list: any[] = [1, true, 'free']

list[1] = 100
```

变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型。

```typescript
var num2; //没有赋值操作，就会被认为任意值类型
num2 = true;
num2 = "3";
```

## 空值 void

某种程度上来说，`void` 类型像是与 `any` 类型相反，它表示没有任何类型。 当一个函数没有返回值时，你通常会见到其返回值类型是 `void`：

```typescript
function warnUser(): void {
  console.log('This is my warning message')
}

```

声明一个 `void` 类型的变量没有什么大用，因为你只能为它赋予 `undefined` 和 `null`：

```typescript
let unusable: void = undefined
```





## 枚举 enum

枚举（enum）类型用于取值被限定在一定范围内的场景

采用关键字enum定义
> 例如：enum Days{Sun, Mon,Tue}

枚举成员会被赋值为从0开始递增的数字，同时也会被枚举值到枚举名进行反向映射。

`enum` 类型是对 JavaScript 标准数据类型的一个补充。 像 C# 等其它语言一样，使用枚举类型可以为一组数值赋予友好的名字。



```typescript
enum Color {Red, Green, Blue}
let c: Color = Color.Green
```

默认情况下，从 `0` 开始为元素编号。 你也可以手动的指定成员的数值。 例如，我们将上面的例子改成从 `1` 开始编号：

```typescript
enum Color {Red = 1, Green, Blue}
let c: Color = Color.Green
```

或者，全部都采用手动赋值：

```typescript
enum Color {Red = 1, Green = 2, Blue = 4}
let c: Color = Color.Green
```

枚举类型提供的一个便利是你可以由枚举的值得到它的名字。 例如，我们知道数值为 2，但是不确定它映射到 Color 里的哪个名字，我们可以查找相应的名字：

```typescript
enum Color {Red = 1, Green, Blue}
let colorName: string = Color[2]

console.log(colorName)  // 显示'Green'因为上面代码里它的值是2
```

```typescript
//使用枚举可以定义一些有名字的数字常量
enum Days{
    Sun,
    Mon,
    Tue,
    Wed,
    Thu,
    Fri,
    Sat
}

console.log(Days.Sun)//0
console.log(Days.Sat)//6
//枚举类型会被编译成一个双向映射的对象
console.log(Days[0])//Sun

let day:Days= Days.Sun;
```



## 其他类型 never

`never` 类型表示的是那些永不存在的值的类型。 例如， `never` 类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型； 变量也可能是 `never` 类型，当它们被永不为真的类型保护所约束时。

`never` 类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是 `never` 的子类型或可以赋值给`never` 类型（除了 `never` 本身之外）。 即使 `any` 也不可以赋值给 `never`。

下面是一些返回 `never` 类型的函数：

```typescript
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
  throw new Error(message)
}

// 推断的返回值类型为never
function fail() {
  return error("Something failed")
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
  while (true) {
  }
}
```




## object

`object` 表示非原始类型，也就是除 `number`，`string`，`boolean`，`symbol`，`null`或`undefined` 之外的类型。

使用 `object` 类型，就可以更好的表示像 `Object.create` 这样的 `API`。例如：

```typescript
declare function create(o: object | null): void

create({ prop: 0 }) // OK
create(null) // OK

create(42) // Error
create('string') // Error
create(false) // Error
create(undefined) // Error
```





## 类型断言

有时候你会遇到这样的情况，你会比 TypeScript 更了解某个值的详细信息。 通常这会发生在你清楚地知道一个实体具有比它现有类型更确切的类型。

通过类型断言这种方式可以告诉编译器，“相信我，我知道自己在干什么”。 类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构。 它没有运行时的影响，只是在编译阶段起作用。 TypeScript 会假设你，程序员，已经进行了必须的检查。

在`tsx`语法（react的jsx语法的ts版）必须采用后面一种

类型断言不是类型转换，断言成一个联合类型种不存在的类型是不允许的
```typescript
let num:number|string = "10";
num = 20;
console.log(num.length);//报错
//类型断言  只能断言联合类型种存在的类型
function getAssert(name:string|number){
    //return (<string>name).length;
    return (name as string).length;
    //return (name as boolean).length;//报错
}
```

类型断言有两种形式。 其一是“尖括号”语法：

```typescript
let someValue: any = 'this is a string'

let strLength: number = (<string>someValue).length
```

另一个为 `as` 语法：

```typescript
let someValue: any = 'this is a string'

let strLength: number = (someValue as string).length
```

两种形式是等价的。 至于使用哪个大多数情况下是凭个人喜好；然而，当你在 TypeScript 里使用 JSX 时，只有 `as` 语法断言是被允许的。



## 类型别名

类型别名可以用来给一个类型起一个新名字

采用关键字`type`

> 例如:type Name = string | number

例子中的Name就表示可设置字符串和数值类型
```typescript
var str:string|number = "10";
//类型别名
type strType = string|number;
var str:strType ="10";
str = 10;

//可以对于接口也采用类型别名
interface muchType1{
    name:string
}

interface muchType2{
    age:number
}

type muchType = muchType1|muchType2;
var obj:muchType = {name:"张三"}
var obj2:muchType = {age:10}
var obj3:muchType = {name:"张三",age:10}
```

也可以采用type来约束取值只能是某些字符串中的一个

> 例如:type EventNames = "click"|"scroll"|"mousemove"
```typescript
//限制字符串的选择
type sex = "男"|"女";
function getSex(s:sex):string{
    return s;
}

getSex("1")//报错
getSex("男")
```
