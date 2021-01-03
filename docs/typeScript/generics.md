#  泛型

[[toc]]

## 定义

泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。

类型变量，帮助我们捕获传入参数的类型

用于于返回类型和参数类型相同的场景

```typeScript
function identity(arg:any):any{
    return arg
}
//当我们使用any时，可以导致该函数可以接收任何类型的参数，当传入number时，经过函数处理arg+''，返回的可能是字符串,不符合我们本意
//所以用到类型变量
function identity<T>(arg:T):T{
    return arg
}
let output = identity<string>('myString')
//也可以通过类型推论，通过参数自动确定T类型
let output = identity('myString')
```

```typeScript
// const getArray = (value: any, times: number = 5): any[] => {
//     // ES6为Array增加了fill()函数，使用制定的元素填充数组，其实就是用默认内容初始化数组。
//     return new Array(times).fill(value)
// }
// 丢失了类型检测，所以使用泛型约束变量类型

const getArray = <T>(value: T, times: number = 5): T[] => {
    return new Array(times).fill(value)
}
// getArray<number>(123, 4).map((item) => item.toFixed())
console.log('111', getArray<number>(123, 4).map((item) => item.toFixed()));
```




## 使用泛型变量

```typeScript
function loggingIdentity<T>(arg:T[]):T[]{
    console.log(arg.length);
    return arg
}
```

```typeScript
// 两个泛型变量
// [T, U][] 属于元组
const getArray = <T, U>(param1: T, param2: U, times: number): [T, U][] => {
    return new Array(times).fill([param1, param2])
}

getArray<number, string>(1, 'a', 3).forEach((item) => {
    console.log('item: ', item);// [1, "a"]
})
// 当没有明确泛型变量的类型时，ts会根据传进去的值的类型自动进行判断，如下
getArray(1, 'a', 3).forEach((item) => {
    console.log('item: ', item);// [1, "a"]
})
```

## 泛型类型

泛型函数的类型与非泛型函数的类型没什么不同，只是有一个类型参数在最前面，像函数声明一样：
```typeScript
function identity<T>(arg:T):T{
    return arg
}

let myIdentity:<T>(arg:T) => T = identity
//对象字面量
let myIdentity:{<T>(arg:T):T} = identity
//泛型接口
interface GenericIdentityFn<T>{
    (arg:T):T
}

let myIdentity:GenericIdentityFn<number> = identity
```



## 泛型类

泛型类看上去与泛型接口差不多。 泛型类使用（ `<>`）括起泛型类型，跟在类名后面。

```typeScript
class GenericNumber<T> {
  zeroValue: T
  add: (x: T, y: T) => T
}

let myGenericNumber = new GenericNumber<number>()
myGenericNumber.zeroValue = 0
myGenericNumber.add = function(x, y) {
  return x + y 
}
```
```typeScript
class myArraylist<T>{
    public name:T;
    pubilc list:T[]=[];
    add(val:T):void{
        this.list.push(val)
    }
}

var arr = new myArraylist<number>();
arr.add(11)
```
泛型类仅仅实例属性可用，静态属性不可以用。

```typeScript
class GenericNumber<T>{
    zeroValue:T,
    add:(x:T,y:T) => T
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x,y){
    return x + y;
}

let stringNumeric = new GenericNumber<string>();
stringNumeric.zeroValue =''
stringNumeric.add = function(x,y){
    return x + y;
}
```
## 泛型函数

```typeScript
function printarr(arr:number[]):void{
    for(var item of arr){
        console.log(item)
    }
}

function printarr1(arr:string[]):void{
    for(var item of arr){
        console.log(item)
    }
}

printarr([11,22,33,44]);
printarr1(["aa","bb","cc"]);

//应用泛型
function printarr<T>(arr:T[]):void{
    for(var item of arr){
        console.log(item)
    }
}
printarr<number>([11,22,33,44]);
printarr1<string>(["aa","bb","cc"]);
```
```typeScript
// 泛型定义函数类型
let getArray: <T>(arg: T, times: number) => T[]
getArray = (arg: any, times: number) => {
    return new Array(times).fill(arg)
}
getArray(123, 3).map((item) => {
    console.log('item: ', item);// 123
})

```


```typeScript
// 类型别名
// type GetArray = <T>(arg: T, times: number) => T[]
let getArray: GetArray = (arg: any, times: number) => {
    return new Array(times).fill(arg)
}
getArray(666, 3).map((item) => {
    console.log('item: ', item);// 666
})
```


## 泛型接口

```typeScript
// 方式1
interface GetArray {
    <T>(arg: T, times: number): T[]
}
// 方式2-参考计数器
interface GetArray<T> {
    (arg: T, times: number): T[],
    array: T[]
}
```


```typeScript
interface Iadd<T>{
    (x:T,y:T):T;
}

var add:Iadd<number>
add = function(x:number,y:number){
    return x+y;
}

console.log(add(1,5))
```

```typeScript
//没有确切定义返回值类型，运行的数组每一项都可以是任意类型
function createArray(lenght:number,value:any):Array<any>{
    let arr = [];
    for(var i=0;i<length;i++){
        arr[i]=value
    }
    return arr;
}

createArray(3,1);
```


## 泛型约束
我们有时候想操作某类型的一组值，并且我们知道这组值具有什么样的属性。在 `loggingIdentity` 例子中，我们想访问 `arg` 的 `length` 属性，但是编译器并不能证明每种类型都有 `length` 属性，所以就报错了。

```typescript
function loggingIdentity<T>(arg: T): T {
  console.log(arg.length)
  return arg
}
```

相比于操作 `any` 所有类型，我们想要限制函数去处理任意带有 `.length` 属性的所有类型。 只要传入的类型有这个属性，我们就允许，就是说至少包含这一属性。为此，我们需要列出对于 `T` 的约束要求。

我们定义一个接口来描述约束条件，创建一个包含 `.length` 属性的接口，使用这个接口和 `extends` 关键字来实现约束：

```typescript
interface Lengthwise {
  length: number
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length) // OK
  return arg
}
```

现在这个泛型函数被定义了约束，因此它不再是适用于任意类型：

```typescript
loggingIdentity(3);  // Error
```

我们需要传入符合约束类型的值，必须包含必须的属性：

```typescript
loggingIdentity({length: 10, value: 3}) // OK
```


```typescript
// 约束T为具有length属性的变量
interface ValueWithLength {
    length: number
}

// 泛型变量继承接口
const getArray = <T extends ValueWithLength>(arg: T, times: number): T[] => {
    return new Array(times).fill(arg)
}

// 所以第一个参数必须有length属性
getArray([1, 2], 3)
// getArray(222, 3);//报错


const getProps = <T, K extends keyof T>(object: T, propName: K) => {
    return object[propName]
}

const objs = {
    a: 'a',
    b: 'b',
}
getProps(objs, 'a')
// getProps(objs, 'c')//报错
```
### 在泛型约束中使用类型参数

你可以声明一个类型参数，且它被另一个类型参数所约束。 比如，现在我们想要用属性名从对象里获取这个属性。 并且我们想要确保这个属性存在于对象 `obj` 上，因此我们需要在这两个类型之间使用约束。

```typescript
function getProperty<T, K extends keyof T> (obj: T, key: K ) {
  return obj[key]
}

let x = {a: 1, b: 2, c: 3, d: 4}

getProperty(x, 'a') // okay
getProperty(x, 'm') // error
```

### 泛型中使用类类型
```typescript
function create<T>(c:{new():T}):T{
    return new c()
}
```

```typescript
class BeeKeeper {
    hasMask:boolean
}

class LionKeeper{
    nametag:string
}

class Animal{
    numLengs:number
}

class Bee extends Animal{
    keeper:BeeKeeper
}

class Lion extends Animal{
    keeper:LionKeeper
}

//工厂函数
function createInstance<T extends Animal>(c:new() => T):T{
    return new c()
}

createInstance(Lion).keeper.nametag
createInstance(Bee).keeper.hasMask
```

### 使用泛型将其改造

```typeScript
function createArray<T>(lenght:number,value:T):Array<T>{
    let arr = [];
    for(var i=0;i<length;i++){
        arr[i]=value
    }
    return arr;
}

var strArry:string[]=createArray<string>(3,"1")

//不传的时候根据类型进行倒退
var numArray:number[]=createArray(3,1)
```