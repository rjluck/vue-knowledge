const s1 = Symbol()
console.log('s1: ', s1);//Symbol()

const s2 = Symbol()
console.log('s2: ', s2);//Symbol()

// console.log(s2 === s1);//false Symbol值是独一无二的

//可以传参,参数是字符串,就是一个标识
const s3 = Symbol('aaa')
console.log('s3: ', s3);//Symbol(aaa)

const s4 = Symbol('aaa')
console.log('s4: ', s4);//Symbol(aaa)

// console.log(s3 === s4);//false Symbol值是独一无二的

//Symbol值不可和其他类型的值进行运算
// s4+12  报错

//Symbol值可以转化为字符串或boolean类型的值
// console.log(s4.toString());
// console.log(Boolean(s4));//true
// console.log(!s4);//false


/**作为属性名 */
let prop = 'name';
const info = {
    // name: 'lison',
    [prop]: 'ppppp',
    [`my${prop}is`]: 'rj'
}
console.log('info', info);

const s5 = Symbol('name');
const info2 = {
    [s5]: 'fff',
    age: 18,
    sex: 'man'
}
//当用Symbol值作为属性名的时候，能保证属性不会被别的覆盖
console.log(info2);
info2[s5] = 'hhhhh';//修改Symbol值
console.log(info2);

/**属性名的遍历 */
//Symbol值作为属性名不遍历不出来
for (const key in info2) {
    console.log(key);//age sex
}

console.log('Object.keys(info2): ', Object.keys(info2));//[age,sex]

console.log('Object.getOwnPropertyNames(info2): ', Object.getOwnPropertyNames(info2));//[age,sex]

console.log('JSON.stringify(info2): ', JSON.stringify(info2));//{"age":18,"sex":"man"}

//以上4种方式都是获取不到Symbol值的属性名的
//以下可
console.log('Object.getOwnPropertyNames(info2): ', Object.getOwnPropertySymbols(info2));//[Symbol(name)]


console.log('Reflect.ownKeys(info2): ', Reflect.ownKeys(info2));//["age", "sex", Symbol(name)]


/**Symbol的两个静态方法 Symbol.for()  Symbol.keyFor()*/
const s6 = Symbol('pp')
const s7 = Symbol('pp')
// console.log('s6===s7: ', s6 === s7);//false
const s8 = Symbol.for('pp')
const s9 = Symbol.for('pp')
// console.log('s8===s9: ', s8 === s9);//true

//使用Symbol.for全局注册的值，可通过Symbol.keyFor获取其参数名称
console.log(Symbol.keyFor(s8));//p


/** 11个内置Symbol的值*/
//ES6提供了11个内置的Symbol值，指向了js内部的属性和方法

//1.Symbol.hasInstance
//当给一个对象设置了以其为属性名的方法后，当其他对象使用关键字instanceof判断是否为实例的时候，调用这个值指向的方法
const obj1 = {
    [Symbol.hasInstance](otherObj) {
        console.log('otherObj: ', otherObj);
    }
}

// {a:'a'} instanceof obj1  判断{a:'a'}是否为obj1的实例
console.log('1', { a: 'a' } instanceof <any>obj1);//false




//2.Symbol.isConcatSpreadable
let arr = [1, 2];
console.log('2', [].concat(arr, [3, 4]));//[1, 2, 3, 4] 拆开扁平化

arr[Symbol.isConcatSpreadable] = false;//通过将数组Symbol.isConcatSpreadable对应的属性设置为false,则数组在concat中不会被扁平化
console.log('3', [].concat(arr, [3, 4]));//[[1,2],3,4]

//3.Symbol.species

class C extends Array {
    constructor(...args) {
        console.log('...args: ', ...args);
        super(...args)
    }
    static get [Symbol.species]() {//该方法可以指定一个创造衍生对象的一个函数
        return Array
    }
    getName() {
        return '99'
    }
}
const c = new C(1, 2, 3)
console.log('c: ', c);// [1, 2, 3]
const a = c.map((item) => {
    return item + 1
})
console.log('a: ', a);//[2, 3, 4]
console.log('c: ', c instanceof C);//false
console.log('c: ', c instanceof Array);//true
console.log('a: ', a instanceof C);//false
console.log('a: ', a instanceof Array);//true


//4.Symbol.match

//
let obj3 = {
    [Symbol.match](string) {
        console.log('string: ', string.length);//5
    },
    [Symbol.split](string) {
        console.log('split: ', string.length);//5
    }
}

'abccd'.match(<RegExp>obj3)

//5.Symbol.replace
//6.Symbol.search
//7.Symbol.split
'abccd'.split(<any>obj3)

//8.Symbol.iterator
//数组的默认属性指向遍历器方法
const arrA = [1, 2, 3];
const iterator = arr[Symbol.iterator]();
console.log('iterator: ', iterator);
console.log('next: ', iterator.next());//{value: 1, done: false} done表示是否遍历结束

//9.Symbol.toPrimitive
let obj4: unknown = {
    [Symbol.toPrimitive](type) {
        console.log('type: ', type);
    }
}

// const res = (obj4 as number)++
// const res = `abc${obj4}`

//10.Symbol.toStringTag
//该值可以是字符串或函数
let obj5 = {
    // [Symbol.toStringTag]: 'dlkflk'
    get [Symbol.toStringTag]() {
        return 'dlkflk'
    }
}
console.log('obj5.toString(): ', obj5.toString());//[object dlkflk]
//正常普通的对象调用toString返回的是[object object]


//11.Symbol.unscopables
//
const obj6 = {
    a: '1',
    b: '2'
}

// with (obj6) {
//     console.log(a);//1
//     console.log(b);//2
// }

console.log(Array.prototype[Symbol.unscopables])



