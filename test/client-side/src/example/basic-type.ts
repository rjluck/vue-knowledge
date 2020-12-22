//1.布尔类型
// let bool:boolean = false;
let bool: boolean;
bool = true;
// bool = 123;

//2.数值类型
let num: number = 123;
// num = 'abc';
num = 0b1111011;//2进制的123，0b表示2进制
num = 0O173;//8进制的123，0O表示8进制
num = 0x7b;//16进制的123，0x表示16进制

//3.字符串类型
let str: string;
str = 'abc';
//使用ES6新语法
str = `数值时${str}`
console.log('str', str)


//4.数组类型(两种写法)
//[1,2,3]
//第一种写法
let arr1: number[];//指定arr1变量是一个数组,并且数组元素都是数字型的
arr1 = [2, 5];
let arr2: (number | string)[];//指定arr2变量是一个数组,并且数组元素是数字型或字符串的

//第二种写法
let arr3: Array<number>
let arr4: Array<number | string>


//5.元组类型
let tuple: [string, number, boolean];
tuple = ['a', 1, true];//类型和顺序必须一一对应
//tuple = ['a', 1, true,66]
//66就是越界元素，在2.6版本之前可以是所定义类型种的任意一个，2.6版本之后长度必须是按规定类型的长度


//6.枚举类型enum
//默认序列号
enum Roles {
    SUPER_ADMIN,
    ADMIN,
    USER
}
//指定值
// enum Roles {
//     SUPER_ADMIN=1,
//     ADMIN=3,
//     USER=6
// }
//不指定值就会按指定的值顺序递加
console.log('Roles.SUPER_ADMIN', Roles.SUPER_ADMIN);//0
console.log('Roles.ADMIN', Roles.ADMIN);//1
console.log('Roles.USER', Roles.USER);//2
console.log('Roles[2]', Roles[2]);//USER    

//角色判断更直观
// if(roles == Roles.SUPER_ADMIN){
// }


//7.any类型(任何类型)
//有些情况变量的类型在运行的时候才知道，所以需要用到any类型
let value: any;//定义常量
value = 3;
value = 'fff';

let arr5: any[] = ['1', 'a'];//定义数组



//8.void类型（不是任何类型）
//一般我们定义函数，不返回任何值的情况下，我们要给函数指定返回值类型的话就可以指定void类型
//在js当中，一个函数没有返回值的时候，默认返回的是undefined
const consoleText = (text: string): void => {
    console.log(text)
}
consoleText('q');//传入参数不是字符串类型就会报错，这就提现了ts的优势

//undefined和null可以赋给void类型的值
let v: void;
v = undefined;
v = null;


//9.null/undefined
//js中null/undefined是基础数据类型
//ts中null/undefined即是数据类型也是值
//null和undefined是其他类型的子类型,可以将其赋值给其他类型的值
let u: undefined;
u = undefined; //这个变量只能赋值undefined
// u= 3;//报错

let n: null;
n = null;//这个变量只能赋值null
// u= 44;//报错


//10.never类型(永远不存在的类型)
//never类型是任一类型的子类型，也就是说该类型的值可以赋值给其他任何类
//never没有任何子类型
const errorFunc = (message: string): never => {
    throw new Error(message);//抛错的
}
errorFunc('aa')
const infiniteFunc = (): never => {
    while (true) { }//不可能有返回值的
}

let neverVariable = (() => {
    while (true) { }
})();//立即执行函数



//11.object类型（对象类型）
//js中其他类型存的都是值，而object存的是对象在内存中地址的引用
let obj = {
    name: 'qqq'
}
let obj2 = obj;//将obj在内存中的地址 赋值 给了obj2
obj2.name = '2222'
console.log('obj: ', obj.name);//2222

function getObject(obj: object): void {
    console.log(obj);
}
getObject(obj2);


//12.类型断言
//把某个值强行指定我们要的类型
//两种写法
//jsx只能用as写法

// const getLength = target => {
//     if (target.length || target.length === 0) {
//         return target.length;
//     } else {
//         return target.toString().length
//     }
// }

const getLength = (target: string | number): number => {
    if ((<string>target).length || (target as string).length === 0) {
        return (<string>target).length;
    } else {
        return target.toString().length
    }
}

// getLength(1)
// getLength('eee')


