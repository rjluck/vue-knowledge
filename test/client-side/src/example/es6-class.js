
/** ES5和ES6实现创建实例 */

//ES5构造函数创建函数对象
// function Point(x, y) {
//     this.x = x;
//     this.y = y;
// }

// Point.prototype.getPosition = function () {
//     return '(' + this.x + ',' + this.y + ')'
// }

// var p1 = new Point(2, 3); // 使用构造函数创建实例,通过new创建
// var p1 = new Point(4, 5); // 使用构造函数创建实例,通过new创建

//实例上会有原型对象上的方法
// console.log('p1: ', p1);
// console.log('p1: ', p1.getPosition());//(2,3)
// console.log('p1: ', p2.getPosition());//(4,5)




//ES6类

class Point {
    constructor(x, y) {//构造函数，不写默认为空
        this.x = x;//this指向创建的实例
        this.y = y;
        // return { a: 'a' } //若return创建的实例对象，就不属于该类
    }
    getPosition() {
        return `(${this.x},${this.y})`
    }
}

const p1 = new Point(1, 2);//创建实例
console.log('p1: ', p1);
console.log('p1: ', p1.hasOwnProperty('x'));// true
console.log('p1: ', p1.hasOwnProperty('getPosition'));//false
console.log('p1: ', p1.__proto__.hasOwnProperty('getPosition')); //true

/** ES5和ES6实现创建实例 */