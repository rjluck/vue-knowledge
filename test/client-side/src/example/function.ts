

/** 函数类型 */
// 方式1 ES5
function add1(arg1: number, arg2: number): number {
    return arg1 + arg2;
}

// 方式2 ES6箭头函数
const add2 = (arg1: number, arg2: number) => arg1 + arg2

let add3: (x: number, y: number) => number // 定义一个变量 指定其函数类型

add3 = (arg1: number, arg2: number) => arg1 + arg2 // 给变量赋值一个函数

// 函数中如果使用函数体外的变量，变量的类型是不提现在函数的定义中的
let arg3 = 3;
add3 = (arg1: number, arg2: number) => arg1 + arg2 + arg3


// 使用接口定义函数类型
// interface Add {
//     (x: number, y: number): number
// }

// 上面采用 类型别名  的形式
type Add = (x: number, y: number) => number

type isString = string;// 此时isString等同于string

let addFunc: Add;
addFunc = (arg1: number, arg2: number) => arg1 + arg2



/** 函数参数 */
// addFunc = (arg1, arg2, arg3) => arg1 + arg2 + (arg3 ? arg3 : 0)

// 可选参数
type AddFunction = (arg1: number, arg2: number, arg3?: number) => number
let addFunction: AddFunction
addFunction = (x: number, y: number) => x + y
addFunction = (x: number, y: number, z: number) => x + y + z


// 默认参数
// js ES6之前
// const addFunctions = function (x, y) {
//     y = y || 0;
//     return x + y;
// }
// addFunctions(1, 2);// 3

// ts
// let addFunctions = (x: number, y: number = 3) => x + y
let addFunctions = (x: number, y = 3) => x + y
console.log('addFunctions(1): ', addFunctions(1));// 4
console.log('addFunctions(1): ', addFunctions(2, 1));// 3


// 剩余参数
// 当参数个数不一定的时候，js中ES6之前用arguments类数组对象
// function handleData() {
//     // 该函数实际传入的参数的个数 arguments.length
//     if (arguments.length) {
//         if (arguments.length === 1) return arguments[0] * 2
//         else if (arguments.length === 2) return arguments[0] * arguments[1]
//         // Array.prototype.slice.apply(arguments)  类数组arguments转为数组
//         else return Array.prototype.slice.apply(arguments).join('_')
//     }
// }
// console.log('99', handleData(2));// 4
// console.log('99', handleData(2, 3));// 6

// js中ES6用操作符...
// const handleData = (...args) => {
//     console.log('args', args);
// }
// console.log('99', handleData(2));// [2]
// console.log('99', handleData(2, 3));// [2,3]

// ...操作符可以拆解数组或对象

// ts中
// const handleData = (arg1: number, ...args: number[]) => {
//     //
// }


/** 函数重载 */
// ts中的定义：允许我们使用function 定义好几个函数,传入不同个数的不同参数，判断实际返回的结果
// 函数重载只能用function来定义，不用使用接口或类型别名等定义
// 函数的重载
function handleData(x: string): string[];
function handleData(x: number): number[];
// 函数的实体
function handleData(x: any): any {
    if (typeof x === 'string') {
        return x.split('');// 字符串转数组
    } else {
        return x.toString().split('').map((item) => Number(item));
    }
}

console.log(handleData('abc'));// ["a", "b", "c"]
console.log(handleData(123));// [1, 2, 3]
