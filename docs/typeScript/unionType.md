#  联合类型

[[toc]]

## 定义

联合类型表示取值可以为多种类型种的一种

```typeScript
var  muchtype:string|number = "hello";
muchtype = 10;
```
```typeScript
function  padLeft(value:string,padding:number | string){
    if(typeof padding === 'number'){
        return Array(padding+1).join(' ') + value
    }
    
    if(typeof padding ==='string'){
        return padding + value
    }
    
    //抛出异常
    throw new Error('Expected string or number got ')
}

padLeft('hello',4)
```
如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成any类型而完全不被类型检查。

只能访问此联合类型内的所有类型里共有的属性或方法。
