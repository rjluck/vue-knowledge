/** 泛型 */

// const getArray = (value: any, times: number = 5): any[] => {
//     // ES6为Array增加了fill()函数，使用制定的元素填充数组，其实就是用默认内容初始化数组。
//     return new Array(times).fill(value)
// }

// console.log('getArray(2): ', getArray(2));// [2, 2, 2, 2, 2]
// console.log('getArray(2): ', getArray(2, 3));// [2, 2, 2]
// console.log('getArray(): ', getArray('abc', 4));//  ["abc", "abc", "abc", "abc"]

// 丢失了类型检测，所以使用泛型约束变量类型

// const getArray = <T>(value: T, times: number = 5): T[] => {
//     return new Array(times).fill(value)
// }
// getArray<number>(123, 4).map((item) => item.toFixed())
// console.log('111', getArray<number>(123, 4).map((item) => item.toFixed()));


/** 泛型变量 */
// // 两个泛型变量
// // [T, U][] 属于元组
// const getArray = <T, U>(param1: T, param2: U, times: number): [T, U][] => {
//     return new Array(times).fill([param1, param2])
// }

// getArray<number, string>(1, 'a', 3).forEach((item) => {
//     console.log('item: ', item);// [1, "a"]
// })
// // 当没有明确泛型变量的类型时，ts会根据传进去的值的类型自动进行判断，如下
// getArray(1, 'a', 3).forEach((item) => {
//     console.log('item: ', item);// [1, "a"]
// })



/** 泛型在类型定义中的使用 */
// 泛型定义函数类型
// let getArray: <T>(arg: T, times: number) => T[]
// getArray = (arg: any, times: number) => {
//     return new Array(times).fill(arg)
// }
// getArray(123, 3).map((item) => {
//     console.log('item: ', item);// 123
// })


// // 类型别名
// type GetArray = <T>(arg: T, times: number) => T[]
// let getArray: GetArray = (arg: any, times: number) => {
//     return new Array(times).fill(arg)
// }
// getArray(666, 3).map((item) => {
//     console.log('item: ', item);// 666
// })



// 泛型定义接口
// 方式1
// interface GetArray {
//     <T>(arg: T, times: number): T[]
// }
// 方式2-参考计数器
// interface GetArray<T> {
//     (arg: T, times: number): T[],
//     array: T[]
// }





/** 泛型约束 */

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







