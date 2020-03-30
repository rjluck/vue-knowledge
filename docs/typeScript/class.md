#  类

[[toc]]

传统方法中，`JavaScript` 通过构造函数实现类的概念，通过原型链实现继承。而在 `ES6` 中，我们终于迎来了 `class`。
T`ypeScript` 除了实现了所有 `ES6` 中的类的功能以外，还添加了一些新的用法。

## 定义

定义了一件事物的抽象特点，包含它的属性和方法。

### ES6中类的用法

#### 属性和方法
使用 `class` 定义类，使用 `constructor` 定义构造函数。

通过 `new` 生成新实例的时候，会自动调用构造函数。

```typescript
class Animal {
    constructor(name) {
        this.name = name;
    }
    sayHi() {
        return `My name is ${this.name}`;
    }
}

let a = new Animal('Jack');
console.log(a.sayHi()); // My name is Jack
```

#### 类的继承

使用 `extends` 关键字实现继承，子类中使用 `super` 关键字来调用父类的构造函数和方法。
```typescript
class Cat extends Animal {
    constructor(name) {
        super(name); // 调用父类的 constructor(name)
        console.log(this.name);
    }
    sayHi() {
        return 'Meow, ' + super.sayHi(); // 调用父类的 sayHi()
    }
}

let c = new Cat('Tom'); // Tom
console.log(c.sayHi()); // Meow, My name is Tom
```

#### 存储器
使用 getter 和 setter 可以改变属性的赋值和读取行为：
```typeScript
class Animal {
    constructor(name) {
        this.name = name;
    }
    get name() {
        return 'Jack';
    }
    set name(value) {
        console.log('setter: ' + value);
    }
}

let a = new Animal('Kitty'); // setter: Kitty
a.name = 'Tom'; // setter: Tom
console.log(a.name); // Jack
```
```typeScript
let passcode = 'serect passcode';

class Employee{
    private _fullName:string,
    //访问_fullName时触发
    get fullName():string{
        return this._fullName
    }
    //修改_fullName时触发
    set fullName(newName:string){
        if(passcode && passcode === 'serect passcode'){
           this._fullName =  newName
        }else{
            console.log('Error: Unauthorized update of employee')
        }
    }
}

let employee = new Employee();
employee.fullName = 'Bob';
if(employee.fullName){
    console.log(employee.fullName )
}
```


#### 静态方法
使用 `static` 修饰符修饰的方法称为静态方法，它们不需要实例化，而是直接通过类来调用：

```typeScript
class Animal {
    static isAnimal(a) {
        return a instanceof Animal;
    }
}

let a = new Animal('Jack');
Animal.isAnimal(a); // true
a.isAnimal(a); // TypeError: a.isAnimal is not a function
```
### ES7中类的用法

#### 实例属性
ES6 中实例的属性只能通过构造函数中的 `this.xxx` 来定义，ES7 提案中可以直接在类里面定义：
```typeScript
class Animal {
    name = 'Jack';
    constructor() {
        // ...
    }
}

let a = new Animal();
console.log(a.name); // Jack
```
#### 静态属性
ES7 提案中，可以使用 `static` 定义一个静态属性：
```typeScript
class Animal {
    static num = 42;
    constructor() {
        // ...
    }
}
console.log(Animal.num); // 42
```

### ts中类的用法

#### 类的定义

```js
//js中定义Person类
function Person(name){
    this.name = name;
    this.print= function(){
        console.log(this.name)
    }
}
var p =new Person("aaa");
p.print();
```

```typeScript
//ts中定义Person类
class Person{
    name:string;
    age:number;
    constructor(name:string,age:number){
        this.name=name;
        this.age=age;
    }
    print(){
        return this.name+":"+this.age;
    }
}

var p = new Person("张三",18);
console.log(p.print())
```
```typeScript
class Greeter{
    //属性
    greeting:string    
    //构造函数
    constructor(message:string){
        this.greeting = message
    }
    //方法
    greet(){
        return 'Hello,' + this.greeting
    }
}

//构造一个实例，执行new实例的时候偶，调用类的构造函数constructor
let greeter = new Greeter('world')  //返回对象
greeter.greet()  //通过对象调用greet方法
```

## 类的修饰符

- public  公开
- private  私有
- protected 受保护

`public` 修饰的属性或者方法是共有的，可以在任何地方被访问到，默认所有的属性或者方法都是public的

`private`修饰的属性或者方法是私有的，不能在声明它的类外面访问

`protected` 修饰的属性或者方法是受保护的，它和private类似，外部及实例化后是不可访问的，但是在子类的内部是可以访问的，而private在哪都不可以访问


```typeScript
//创建Person类
class Person{
    name="张三",
    age=18,
    say(){
        console.log("我的名字是"+this.name +",我的年龄为："+this.age)
    }
}

//访问这些属性和方法就必须创建类的实例,相当于创建一个对象

//创建Person的实例
var  p = new Person();
//调用方法和访问属性
p.say()
console.log(p.name);
//当一个类成员变量没有修饰符的时候，外界是可以进行访问的

//private属性只能在类的内部进行访问
class Person{
    private name="张三",
    age=18,
    say(){
        console.log("我的名字是"+this.name +",我的年龄为："+this.age)
    }
}
```


```typeScript
//创建Child子类
class Child extends  Person{
    callParent(){
        super.say();//调用父类方法
    }
}

var c = new Child();
c.callParent();
//子类继承了父类，子类就可以访问到父类的公开的属性或者方法了
console.log(c.age);
console.log(c.say())

//一旦父类将属性定义成私有的之后，子类就不可以进行访问了
console.log(c.name);//报错

//父类的属性定义成受保护的protected之后，可以在子类里面进行访问
class Child extends  Person{
    callParent(){
        console.log(super.age);
        super.say();//调用父类方法
    }
}
```

```typeScript
class Child extends  Person{
    callParent(){
        console.log(super.age);
        super.say();//调用父类方法
    }
    static test(){
        console.log("test")
    }
}
console.log(Child.test());//类的静态方法里面，是不允许用this的
```
```typeScript
class Animal{
    private name:string,
    public constructor(name:string){
        this.name = name
    }
    public move(distance:number = 0){
        console.log(`${this.name} moved ${distance}m`)
    }
}

new Animal('Cat').name  //error
class Rhino extends Animal{
    constructor(){
        super('Rhino')
    }
}

class Employee{
    private name:string,
    constructor(name:string){
        this.name = name;
    }
}

let animal = new Animal('Goat')
let rhino = new Rhino()
let employee = new Employee('Bob')

animal = rhino;
animal = employee; //error
```
```typeScript
//受保护的类型，可在其子类中使用，外部不可调用
class  Person {
    protected name:string,
    protected constructor(name:string){
        this.name = name
    }
}

class Employee extends Person{
    private department:string,
    constructor(name:string,department:string){
        super(name);
        this.department = department
    }
    
    getElevatorPitch(){
        return `Hello,my name is ${this.name} and I work in ${this.department}`
    }
}

let howard = new Employee('Howard','Sales')
console.log(howard.getElevatorPitch())
console.log(howard.name); //error
```
## readonly修饰符

可以被外部访问，但是不可以被修改
```typeScript
class Person{
    readonly name:string
    constructor(name:string){
        this.name = name
    }
}

let john = new Person('john')
john.name = ''; //error
```

参数属性
```typeScript
class Person{
    constructor(readonly name:string){
        
    }
}

let john = new Person('john')
console.log(john.name);
john.name = '';//error
```


## 类的静态属性和静态方法

静态属性和静态方法存在于类的本身，而不是类的实例上
```typeScript
//js中的静态属性
function Person(){
    this.name = "zhang" //实例属性
    this.print = function(){} //实例方法
}

Person.age = 19; //静态属性
Person.print1= function(){}//静态方法
Person.print1(); //调用静态方法
console.log(Person.age); //调用静态属性
var p1=new Person();
p1.print(); //调用实例方法
```
```typeScript
//ts中的静态属性
class Person{
    name:string; //实例属性
    static age:number;  //静态属性
    constructor(name:string,age:number){
        this.name=name;
        //Person.age=age;
    }
    //实例方法
    print(){
        return this.name+":"+this.age;
    }
    //静态方法
    static show(){
        console.log("show 方法")
    }
    
}

//调用静态方法
Person.show();
//调用实例方法
var p = new Person("张三",18);
console.log(p.print());
```

```typeScript
class Grid {
    static origin = {x:0,y:0}
    scale:number
    constructor(scale:number){
        this.scale = scale
    }
    
    calculateDistanceFromOrigin(point:{x:number,y:number}){
        let xDist = point.x - Grid.origin.x
        let yDist = point.y - Grid.origin.y
        return Math.sqrt(xDist*xDist + yDist*yDist)* this.scale
    }
}

let grid1 = new Grid(1.0)
let grid2 = new Grid(5.0)

console.log(grid1.claculateDistanceFromOrigin({x:3,y:4})) //5

console.log(grid2.claculateDistanceFromOrigin({x:3,y:4}))  //25
```




## 类的多态
比如：同一个父类下面不同的子类有一个不同的实现
```typeScript
class Animal{
    eat(){
        console.log("animal eat")
    }
}

class Cat extends Animal{
    eat(){
        console.log('猫吃鱼')
    }
}

class Dog extends Animal{
    eat(){
        console.log('狗吃肉')
    }
}

var c1 = new Cat();
c1.eat();
```


### 抽象类/抽象方法 

关键词 `abstract`

抽象类是提供其他类继承的基类(父类),不能直接被实例化。
抽象类通常作为其他派生类的基类使用，一般不能被直接实例化

抽象类中可以有抽象方法，抽象方法不能直接被实现，必须在他的派生类中实现
抽象方法只能包含在抽象类中，抽象类中可以包含抽象方法和非抽象方法

子类继承抽象类，实现抽象方法

```typeScript
//定义
abstract class Animal{
    abstract eat();
    run(){
        console.log("run run run ")
    }
}

class Cat extends Animal{
    eat(){
        console.log('猫吃鱼')
    }
}

class Dog extends Animal{
    eat(){
        console.log('狗吃肉')
    }
}

var c1 = new Cat();
c1.eat();
var c2 = new Dog();
c2.eat();
```
```typeScript
abstract class Animal {
    abstract makeSound():void,
    move():void{
        console.log('roaming the earth ...')
    }
}
```

```typeScript
abstract class Department{
    name:string,
    constructor(name:string){
        this.name = name;
    }
    printName():void{
        console.log('Department name ' + this.name)
    }
    abstract printMeeting():void
}

class AccountingDepartment extends Department{
    constructor(){
        super('Accounting ad ')
    }
    printMeeting():void{
        console.log('The Accounting Department')
    }
    genterateReports():void{
        console.log('Generating accounting reports...')
    }
}

let department:Department
//抽象类不能被实例化
department = new Department()//error

//其派生类可以被实例化
department = new AccountingDepartment()
department.printName()
department.printMeeting()
//department被定义为Department类型，所以不能访问其genterateReports方法
department.genterateReports();//error
```

## 类的继承


> 如果子类和父类有相同的方法名或者属性，在调用的时候先调用自身，再调用父类

```typeScript
class Student extends Person{
    cardnumber:string;
    school:string;
    constructor(cardnumber:string,school:string){
        super("张三",20);//执行父类构造函数
        this.cardnumber=cardnumber;
        this.school=school;
    }
    dohomework(){
        return this.name+"今年"+this.age+"岁,就读于"+this.school
    }
}
//实例化
//var stu1 = new Student("张三",10)
var stu1 = new Student("1101","北京大学")
console.log(stu1.dohomework())
```
```typeScript
class Animal{
    move(distance:number = 0){
        console.log(`Animal moved ${distance}m`)
    }
}

class Dog extends Animal{
    bark(){
        console.log('Woof！Woof！')
    }
}

const dog = new Dog();
dog.back();
dog.move(10)
```

```typeScript
//基类
class Animal{
    name:string,
    constructor(name:string){
        this.name = name
    }
    move(distance:number = 0){
        console.log(`${this.name} moved ${distance}m`)
    }
}

//子类
class Snake extends Animal{
    constructor(name:string){
        super(name);//调用父类
    }
    move(distance:number = 5){
       console.log('Slithering...') 
       super.move(distance);//调用父类的方法
    }
}

//子类
class Horse extends Animal{
    constructor(name:string){
        super(name);//调用父类
    }
    move(distance:number = 45){
       console.log('Galloping...') 
       super.move(distance);//调用父类的方法
    }
}

//将类实例化
let sam = new Snake('Sammy');
let tom:Animal = new Horse('Tommy');

sam.move()
tom.move(34)
```

## 高级技巧
类当成接口使用(不推荐)
```
class Point {
    x:number
    y:number
}

interface Point3d extends Point {
    z:number
}

let point3d:Point3d = {x:1,y:2,z:3}
```
