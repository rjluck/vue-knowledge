#  接口

[[toc]]

## 定义

可描述类的一部分抽象行为，也可描述对象的结构形状

接口一般首字母大写，有的编程语言上面建议接口的名称加上I前缀

赋值的时候，变量的形状必须要跟接口的形状保持一致

接口中可定义可选属性、只读属性、任意属性

```typeScript
//定义接口
interface  Istate {
    name:string,
    age:nmber
}

var obj:Istate;
obj = {name:"张三",age:10}

//定义接口
interface LabelledValue {
    label:string
}

function printLabel(labelledObj:LabelledValue){
    console.log(labelledObj.label)
}
```

## 可选属性 ?

非必须属性

```typeScript
interface  Istate2 {
    name:string,
    age?:nmber //?代表可有可无
}

var obj2:Istate2;
obj2 = {name:"张三",age:10}
obj2 = {name:"李四",sex:"男"}


//属性个数不确定的时候 必须是any任意类型
interface  Istate3 {
    name:string|number,//此处可用联合类型
    age?:nmber,
    [propName:string]:any
}

var obj3:Istate3;
obj3 = {name:"李四",sex:"男",isMarry:true}
```

```typeScript
interface Square {
    color:string,
    area:number
}

interface SquareConfig {
    color?:string,
    width?:number
}

function createSquare(config:SquareConfig):Square{

    let newSquare = {color:'white',area:100};
    if(config.color){
       newSquare.color =   config.color;
    }
     if(config.width){
       newSquare.area =   config.width * config*width;
    }
    return newSquare;
}

let mySquare = createSquare({color:'black'})
```

## 只读属性 readonly
```typeScript
interface Istate4 {
    name:string,
    readonly age:number  //age变为了可读属性
}

var obj4:Istate4 = {name:"李四",age:12}
obj4.name="张三"

//age定义为可读属性，一旦赋予初始值之后，就不能再对其更改了
```
```typeScript
interface Point{
    readonly x:number,
    readonly y:number
}

let p1:Point = {x:10,y:20};

p1.x=3; //error
```

泛型只读数组类型ReadonlyArray
```typeScript
let a:number[]=[1,2,3,4];
let ro:ReadonlyArray<number> =a;
ro[0]=12;//error
```

变量用const
属性用readonly


## 额外属性检查

任意数量其他属性
```typeScript
interface SquareConfig{
    color?:string,
    width?:number,
    [propName:string]:any
}
```

## 对class类的约束

```typeScript
//接口定义
//定义接口的时候，只定义声明即可，不包含具体内容
interface Iprinter{
    Printing(msg:string):string;
}

interface Imessage{
    getmsg():string;
}

//实现接口/实现多个接口，要实现里面的内容
class colorprinter implements Iprinter,Imessage{
    Printing(msg:string):string{
        return "打印"+msg+"成功"
    }
    getmsg():string{
        return "惠普hp"
    }
}

//将类实例化
let p1 = new colorprinter();
let val = p1.Printing("简历");
console.log(p1.getmsg())
```


## 对函数的约束

```typeScript
interface Imyfunction{
    (a:string,b:number):boolean;
}

let fun1:Imyfunction;
fun1 = function(a:string,b:number):boolean{
    return fasle
}


interface SearchFunc{
    (source:string,subString:string):boolean
}
let mySearch:SearchFunc
mySearch = function(src:string,sub:string):boolean{
    let result = src.search(sub)
    return result >-1
}
```

## 对数组的约束

```typeScript
interface Istuarr{
    [index:number]:string;
}

let arr1:Istuarr;
arr1=["aaa","bbb"]
```

## 对json的约束

```typeScript
interface Idata{
    name:string,
    readonly age:number, //只读属性
    email?:string  //可选属性
}

function showdata(n:Idata){
    console.log(JSON.stringify(n))
}
showdata({name:"嘻哈",age:18})
```

## 接口的继承

和类一样，接口也可以相互继承。 这让我们能够从一个接口里复制成员到另一个接口里，可以更灵活地将接口分割到可重用的模块里。

```typeScript
interface Priter{
    getmsg();
}

interface ColorPriter extends Printer{
    printing();
}

class HPPrinter implements ColorPrinter{
    printing(){
        console.log('打印成功')
    }
    getmsg(){
        console.log('HP10022')
    }
}

var hp = new HPPrinter();
hp.getmsg();
hp.printing();
```


一个接口可以继承多个接口，创建出多个接口的合成接口。

```typeScript
interface Shape {
  color: string
}

interface PenStroke {
  penWidth: number
}
//可以继承多个接口
interface Square extends Shape, PenStroke {
  sideLength: number
}

let square = {} as Square; // //类型断言为Square
square.color = 'blue'
square.sideLength = 10
square.penWidth = 5.0
```