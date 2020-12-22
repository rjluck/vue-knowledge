// 使用tslint
// 初始化tslint  tslint --init

/*基本用法*/
// const getFullName = ({ firstName, lastName }) => {
//     return `${firstName}${lastName}`
// }

// getFullName({
//     firstName: 'hhhh',
//     lastName: 'uuuu'
// })

// 定义接口
interface NameInfo {
    firstName: string,
    lastName: string,
}

const getFullName = ({ firstName, lastName }: NameInfo): string => {
    return `${firstName}${lastName}`
}

getFullName({
    firstName: 'hhhh',
    lastName: 'uuuu'
})

interface Vegetable {
    color?: string,// 可选属性？
    readonly type: string,// 只读属性
    [prop: string]: any // 索引签名
}

const getVegetables = ({ color, type }: Vegetable) => {
    return `A ${color ? (color + ' ') : ' '}${type}`
}

let vegetables = getVegetables({
    color: 'red',
    type: 'tomato',
    size: 2
} as Vegetable)// 类型断言
console.log('vegetables: ', vegetables);





/*可选属性 ?*/

/*多余属性检查*/

/*绕开多余属性检查*/
// 方式1：类型断言 as
// 方式2：索引签名
// 方式3：类型兼容性

/*只读属性 readonly*/

let vegObj: Vegetable = {
    type: 'tomato'
}
// console.log('00', vegObj.type = 'iiii'); 报错 type为只读属性

interface ArrInter {
    0: number,
    readonly 1: string
}

let arrQ: ArrInter = [1, '2']
// arrQ[1] = 'b'; //报错



/*函数类型*/

// interface AddFunc {
//     (num1: number, num2: number): number
// }

// 类型别名的形式
type AddFunc = (num1: number, num2: number) => number

const add: AddFunc = (n1, n2) => n1 + n2

/*索引类型*/
// interface RoleDic {
//     [id: number]: string
// }

// const rolel: RoleDic = {
//     0: 'super_admin'
// }

interface RoleDic {
    [id: string]: string
}

// 当限定属性名为字符串的时候,js中会会自动把数字转为字符串
const rolel: RoleDic = {
    a: 'super_admin',
    1: 'admin'
}



/*继承接口*/
// 接口的继承 类似于 类的继承  都可以提高接口的可复用性
interface Vegetables {
    color: string
}

// interface Tomato {
//     color: string,
//     radius: number
// }
interface Tomato extends Vegetables {
    radius: number
}


// interface carrot {
//     color: string,
//     length: number
// }
interface Carrot extends Vegetables {
    length: number
}

// 定义对象
const tomato: Tomato = {
    radius: 1,
    color: 'red'
}

const carrot: Carrot = {
    length: 2,
    color: 'orange'
}


/*混合类型接口 ts3.1才支持混合类型接口*/
// js计数器(方式1需要全局定义变量，有时变量可能会污染，所以该方式不是最好)
// let count = 0;
// const countUp = () => count++
// countUp();

// js闭包（方式2）
// const countUp = (() => {
//     let count = 0;
//     return () => {
//         count++
//     }
// })()
// countUp();

// js直接给函数添加属性（方式3）
// let countUp = () => {
//     countUp.count++
// }
// countUp.count = 0;
// countUp();

//
interface Counter {
    (): void,// 定义函数，无返回值
    count: number
}

const getCounter = (): Counter => {
    const c = () => { c.count++ }
    c.count = 0;
    return c;
}

const counter: Counter = getCounter();
counter();
console.log('2', counter.count);
