# 数组

[[toc]]

### 定义

数组可以把一组相关的数据一起存放，并提供方便的访问(获取)方式。

数组是指**一组数据的集合**，其中的每个数据被称作为**元素**，在数组中可以**存放任意类型的元素**。数组是一种将**一组数据存储在单个变量名下**的优雅方式。

```js
//普通变量一次只能存储一个值
var num = 10;
//数组一次可以存储多个值
var arr = [1,2,3,4,5];
```

### 创建数组

JS中创建数组有两种方式：

- 利用`new`创建数组

```js
var 数组名 = new Array();
var arr = new Array(); //创建新的空数组
```
> 注意Array(),A要大写

- 利用数组字面量创建数组

```js
//1.使用数组字面量方式创建空的数组
var 数组名 = [];
var arr = [];
//2.使用数组字面量方式创建带初始值的数组
var arr = ['a','b','c'];
```

>数组中可以存放任意类型的数据，例如字符串，数字，布尔值等。

```js
var arrStus = ['小白',12,true,21.2]
```


### 获取数组元素

#### 数组的索引

索引(下标)：用来访问数组元素的序号(数组下标从0开始)

数组可以通过**索引**来访问、设置、修改对应的数组元素，我们可以通过"**数组名[索引]**"的形式来获取数组中的元素。

这里的**访问**就是获取得到的意思。

```js
//定义数组
var arrStus = [1,2,3];
//获取数组中的第二个元素
alert(arrStus[1]);
```


### 遍历数组

遍历：就是把数组中的每个元素从头到尾都访问一次。

```js
var arr = ['red','green','blue'];
for(var i = 0; i<3; i++){
    console.log(arr[i]);
}
```

### 数组的长度

使用 **数组名.length** 可以访问数组元素的数量(数组长度)

数组的长度是元素的个数，不要跟索引号混淆

```js
var arr = ['red','green','blue'];
for(var i = 0; i<arr.length; i++){
    console.log(arr[i]);
}
```

eg:数组求和及平均值
```js
var arr = [2,6,1,7,4];
var sum = 0;
var average = 0;
for(var i = 0; i<arr.length; i++){
    sum += arr[i];
}
average = sum/arr.length;
console.log(sum,average);
```
eg:求数组中最大值
```js
var arr = [2,6,1,7,4];
var max =arr[0];
for(var i = 1; i<arr.length; i++){
    if(arr[i]>max){
        max = arr[i];
    }
}
console.log(max);
```

eg:数组转换为分割字符串
```js
var arr = ['red','green','blue','pink'];
var str = '';
for(var i = 1; i<arr.length; i++){
    str += arr[i] +'|'
}
console.log(str);
```

### 数组中新增元素

**1.通过修改length长度新增数组元素**

- 可以通过修改`length`长度来实现数组扩容的目的

```js
var arr = ['red','green','blue'];
console.log(arr.length);//3
arr.length = 5;
console.log(arr);//['red','green','blue',undefined,undefined]
```

- length属性是可读写的

**1.通过修改数组索引新增数组元素**

- 可以通过修改数组索引的方式追加数组元素
```js
var arr = ['red','green','blue'];
arr[3] = 'pink';
console.log(arr);//['red','green','blue','pink']
```

- 不要直接给数组名赋值，否则会覆盖掉以前的数据

eg:筛选数组
```js
//方法1
var arr = [2,0,6,1,77,0,52,0,25,7];
var newArr = [];
var j = 0;
for(var i = 0;i< arr.length;i++){
    if(arr[i]>=10){
        newArr[j]=arr[i];
        j++;
    }
}
//方法2
var arr = [2,0,6,1,77,0,52,0,25,7];
var newArr = [];
for(var i = 0;i< arr.length;i++){
    if(arr[i]>=10){
        newArr[newArr.length]=arr[i];
    }
}
```


### 数组案例

eg:删除指定数组元素

要求：将数组[2,0,6,1,77,0,52,0,25,7]中的0去掉后，形成一个不包含0的新数组。
```js
var arr = [2,0,6,1,77,0,52,0,25,7];
var newArr = [];
for(var i = 0; i < arr.length;i++){
    if(arr[i] != 0){
        newArr[newArr.length] =arr[i];
    }
}
```

eg:翻转数组

要求：将数组['red','green','blue','pink','purple']

输出['purple','pink',,'blue','green','red']
```js
var arr = ['red','green','blue','pink','purple'];
var newArr = [];
for(var i = arr.length - 1; i >= 0;i--){
    newArr[newArr.length] = arr[i];
}
```

eg:数组排序(冒泡排序)

> 冒泡排序：是一种算法，把一系列的数据按照一定的顺序进行排列显示(从小到大或从大到小)

```js
var arr = [5,4,3,2,1];
for(var i = 0; i <= arr.length;i++){//外层循环控制趟数
    for(var j = 0;j<=arr.length -i-1; j++){//里层循环控制每一趟的交换次数
        //内部交换2个变量的值 前一个和后面一个数组元素相比较
        if(arr[j]>arr[j+1]){
            var temp = arr[j];
            arr[j] = arr[j+1];
            arr[j+1] = temp;
        }
    }
}
console.log(arr);//[1,2,3,4,5]
```