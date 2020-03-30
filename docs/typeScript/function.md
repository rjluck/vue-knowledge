#  函数类型

[[toc]]

## 定义

和 JavaScript 一样，TypeScript 函数可以创建有名字的函数和匿名函数。你可以随意选择适合应用程序的方式，不论是定义一系列 API 函数还是只使用一次的函数。

- 声明式函数
- 匿名函数


```typescript
//js中
//函数声明
function add(x,y){
    return x+y;
}
//匿名函数
let add1 = function(x,y){
    return x+y;
}
```

```typescript
//ts中
//函数声明（命名函数）
function add(x,y):number{
    return x+y;
}

//匿名函数
let add1 = function(x,y):number{
    return x+y;
}

```

## 函数的参数

- 可选参数?
- 默认参数
- 剩余参数

参数必须一致
可选参数必须跟在必须参数的后面，用?表示
```typeScript
function buildName(firstName:string,lastName?:string):string{
    return firstName + ' ' + lastName
}

let result1 = buildName('zzz')
```
默认初始化参数
如果默认值参数放到必须参数前面，调用时必须传undefined 来获取默认值
```typeScript
function buildName(firstName:string,lastName =  'kkkk':string):string{
    return firstName + ' ' + lastName
}
let result1 = buildName('bbb')

function buildName(firstName='will',lastName :string):string{
    return firstName + ' ' + lastName
}
let result2 = buildName(undefined ,'bbb')
```
剩余参数
```typescript
function buildName(firstName:string,...restOfName:string[]):string{
    return firstName;
}

let buildNameFn:(fname:string,...rest:string[])=buildName
```

```typescript
function add(x:number,y:number):number{
    return x+y;
}

//可选参数，可选参数放在参数后面
function show(name:string,age?:number):void{
    console.log(name,age)
}

//默认参数
function show(name:string,age?:number=20):void{
    console.log(name,age)
}

//剩余参数
function add1(x1:number,y1:number,...x:number[]):number{
    var sum=0;
    for(var i=0;i<x.length;i++){
        sum+=x[i]
    }
    return x1+y1+sum;
}

var sum= add1(1,2,3,4,5,6)
console.log(sum)
```

## 函数的重载
```typescript
function getinfo(name:string):void;
function getinfo(age:number):void;
function getinfo(str:any):void{
    if(typeof str=="string"){
        console.log("名字:",str)
    }
     if(typeof str=="number"){
        console.log("年龄:",str)
    }
    
}

getinfo("张")
```

## this

### this和箭头函数
js中函数被调用的时候才会被指定this

箭头函数this指向函数创建时的对象

JavaScript里，this 的值在函数被调用的时候才会指定。 这是个既强大又灵活的特点，但是你需要花点时间弄清楚函数调用的上下文是什么。但众所周知，这不是一件很简单的事，尤其是在返回一个函数或将函数当做参数传递的时候。

JavaScript里，this 的值在函数被调用的时候才会指定。 这是个既强大又灵活的特点，但是你需要花点时间弄清楚函数调用的上下文是什么。但众所周知，这不是一件很简单的事，尤其是在返回一个函数或将函数当做参数传递的时候。

下面看一个例子：
```typescript
let deck = {
  suits: ['hearts', 'spades', 'clubs', 'diamonds'],
  cards: Array(52),
  createCardPicker: function() {
    return function() {
      let pickedCard = Math.floor(Math.random() * 52)
      let pickedSuit = Math.floor(pickedCard / 13)

      return {suit: this.suits[pickedSuit], card: pickedCard % 13}
    }
  }
}

let cardPicker = deck.createCardPicker()
let pickedCard = cardPicker()

console.log('card: ' + pickedCard.card + ' of ' + pickedCard.suit)
```

可以看到 `createCardPicker` 是个函数，并且它又返回了一个函数。如果我们尝试运行这个程序，会发现它并没有输出而是报错了。 因为 createCardPicker 返回的函数里的 `this` 被设置成了 `global` 而不是 `deck` 对象。 因为我们只是独立的调用了 `cardPicker()`。 顶级的非方法式调用会将 `this` 视为 `global`。

为了解决这个问题，我们可以在函数被返回时就绑好正确的`this`。 这样的话，无论之后怎么使用它，都会引用绑定的`deck` 对象。 我们需要改变函数表达式来使用 `ECMAScript 6` 箭头语法。 箭头函数能保存函数创建时的 `this` 值，而不是调用时的值：
```typescript
let deck = {
  suits: ['hearts', 'spades', 'clubs', 'diamonds'],
  cards: Array(52),
  createCardPicker: function() {
    // 注意：这里使用箭头函数
    return () => {
      let pickedCard = Math.floor(Math.random() * 52)
      let pickedSuit = Math.floor(pickedCard / 13)

      return {suit: this.suits[pickedSuit], card: pickedCard % 13}
    }
  }
}

let cardPicker = deck.createCardPicker()
let pickedCard = cardPicker()
console.log('card: ' + pickedCard.card + ' of ' + pickedCard.suit)
```
this参数在回调函数中

```typeScript
interface UIElement {
    addClickListener(onclick:(this:void,e:event) => void):void
}

class Handler {
    type:string,
    //onClickBad(this:Handler,e:Event){
    //    this.type = e.type
    //}
    onClickBad = (e:Event)=>{
        this.type = e.type
    }
}

let h = new Handler();
let uiElement:UIElement ={
    addClickListener(){
        
    }
}

uiElement.addClickListener(h.onClickBad)
```

## 函数类型

### 为函数定义类型

让我们为上面那个函数添加类型：

```typescript
function add(x: number, y: number): number {
  return x + y
}

let myAdd = function(x: number, y: number): number { 
  return x + y
}
```

我们可以给每个参数添加类型之后再为函数本身添加返回值类型。TypeScript 能够根据返回语句自动推断出返回值类型。

### 书写完整函数类型

现在我们已经为函数指定了类型，下面让我们写出函数的完整类型。

```typescript
let myAdd: (x: number, y: number) => number = 
function(x: number, y: number): number {
  return x + y
}

```

函数类型包含两部分：参数类型和返回值类型。 当写出完整函数类型的时候，这两部分都是需要的。 我们以参数列表的形式写出参数类型，为每个参数指定一个名字和类型。这个名字只是为了增加可读性。 我们也可以这么写：

```typescript
let myAdd: (baseValue: number, increment: number) => number = 
function(x: number, y: number): number {
  return x + y
}
```

只要参数类型是匹配的，那么就认为它是有效的函数类型，而不在乎参数名是否正确。

第二部分是返回值类型。 对于返回值，我们在函数和返回值类型之前使用(`=>`)符号，使之清晰明了。 如之前提到的，返回值类型是函数类型的必要部分，如果函数没有返回任何值，你也必须指定返回值类型为 `void` 而不能留空。

函数的类型只是由参数类型和返回值组成的。 函数中使用的捕获变量不会体现在类型里。 实际上，这些变量是函数的隐藏状态并不是组成 API 的一部分。

### 推断类型

尝试这个例子的时候，你会发现如果你在赋值语句的一边指定了类型但是另一边没有类型的话，TypeScript 编译器会自动识别出类型：

```typescript
let myAdd = function(x: number, y: number): number { 
  return x + y
}

let myAdd: (baseValue: number, increment: number) => number = 
function(x, y) {
  return x + y
}
```

这叫做“按上下文归类”，是类型推论的一种。它帮助我们更好地为程序指定类型。



## 函数约束
- 有函数本身的参数约束，返回值约束
- 函数本身赋值的变量的约束
- 可采用重载的方式才支持联合类型的函数关系

```typescript
//一、声明式类型的函数
function funcType(name:string,age:number):number{
    return age;
}

var ageNum:number = funcType("张三",18)

//函数参数不确定
function funcType2(name:string,age:number,sex?:string){
    return age;
}

var ageName2:number = funcType2("张三",18,"男")

//函数参数的默认值
function funcType3(name:string="张三",age:number=18){
    return age;
}

//二、表达式类型的函数
var funcType4 = function(name:string,age:number):number{
    return age;
}

//左边变量约束规范，右边函数规范
var funcType5:(name:string,age:number) => number = function(name:string,age:number):number{
    return age;
}

//接口方式约束
interface Iatate6 {
    (name:string,age:number):number
}

var funcType6:Iatate6 = function(name:string,age:number):number{
    return age;
}

//对于联合类型的函数，可以采用重载的方式

//function getValue(value:string|number):string|number{
//    return value;
//}

//let a:number|string = getValue(1);

上面方法不是很好，所以采用重载
function getValue(value:number):number;
function getValue(value:string):string;
function getValue(value:string|number):string|number{
   return value;
}

let a:number = getValue(1);
let b:string = getValue("1");
```