#  联合类型

[[toc]]

## 定义

联合类型表示取值可以为多种类型种的一种

```typeScript
var  muchtype:string|number = "hello";
muchtype = 10;
```

如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成any类型而完全不被类型检查。

只能访问此联合类型内的所有类型里共有的属性或方法。
